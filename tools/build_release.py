"""Build and validate three installable language variants from an original pack.

Usage: python tools/build_release.py --source original.mrpack --version GTL-11TH
       --slug GTL-11TH --source-url https://... --out /path/to/artifacts
Only quest text, the selected game language and pack display metadata change.
"""
from __future__ import annotations
import argparse
import copy
import hashlib
import json
import re
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
from quest_text import fields, canonical, TEXT

ROOT = Path(__file__).resolve().parents[1]
RUNTIME_FILES = {'usercache.json', 'usernamecache.json', 'accounts.json'}

LANGUAGES = {'pt_br': 'Português do Brasil', 'en_us': 'English', 'zh_cn': '中文（原版）'}
CJK = re.compile(r'[\u3400-\u9fff]')


def digest(data):
    return hashlib.sha256(data).hexdigest()


def mechanics(node):
    if node.kind == 'object':
        return {k: mechanics(v) for k, v in node.value.items() if k not in TEXT}
    if node.kind == 'list':
        return [mechanics(v) for v in node.value]
    return node.value


def local_path(name):
    p = Path(name)
    if p.is_absolute() or '..' in p.parts or '\\' in name:
        raise ValueError(f'Unsafe archive path: {name}')


def overlay_quest(source, translated):
    original_tree, original = fields(source)
    _, replacements = fields(translated)
    edits = []
    for ident, node in original.items():
        if ident not in replacements:
            raise ValueError(f'Missing translated text field: {ident}')
        other = replacements[ident]
        edits.append((node.start, node.end, translated[other.start:other.end]))
    result = source
    for start, end, value in sorted(edits, reverse=True):
        result = result[:start] + value + result[end:]
    result_tree, _ = fields(result)
    if mechanics(original_tree) != mechanics(result_tree):
        raise ValueError('A non-text quest value changed')
    return result.encode('utf-8'), len(edits)


def build(args):
    source = Path(args.source)
    out = Path(args.out)
    out.mkdir(parents=True, exist_ok=True)
    source_sha = digest(source.read_bytes())
    recovery = json.loads(Path(args.recovery_report).read_text()) if args.recovery_report else None
    with ZipFile(source) as original:
        corrupt = original.testzip()
        if corrupt:
            raise ValueError(f'Corrupt source entry: {corrupt}')
        for name in original.namelist():
            local_path(name)
        if len(set(original.namelist())) != len(original.namelist()):
            raise ValueError('Duplicate paths in the source archive')
        if 'modrinth.index.json' in original.namelist():
            manifest_name, prefix, extension = 'modrinth.index.json', 'overrides/', '.mrpack'
        elif 'manifest.json' in original.namelist():
            manifest_name, extension = 'manifest.json', '.zip'
            prefix = json.loads(original.read(manifest_name)).get('overrides', 'overrides').rstrip('/') + '/'
        else:
            raise ValueError('No supported pack manifest at archive root')
        source_manifest = json.loads(original.read(manifest_name))
        quest_prefix = prefix + 'config/ftbquests/quests/'
        quests = [n for n in original.namelist() if n.startswith(quest_prefix) and n.endswith('.snbt')]
        if not quests:
            raise ValueError('No FTB Quests files found')
        report = {'version': args.version, 'source_sha256': source_sha, 'source_url': args.source_url,
                  'source_format': manifest_name, 'quest_files': len(quests), 'variants': [], 'source_preparation': recovery,
                  'excluded_runtime_files': [n for n in original.namelist() if Path(n).name in RUNTIME_FILES]}
        for lang, label in LANGUAGES.items():
            changes = {}
            changed_fields = 0
            if lang != 'zh_cn':
                base = ROOT / args.version if lang == 'pt_br' else ROOT / 'en_us' / args.version
                if base.is_dir():
                    for target in base.rglob('*'):
                        if not target.is_file():
                            continue
                        rel = target.relative_to(base).as_posix()
                        if rel.startswith('config/ftbquests/quests/'):
                            continue
                        name = prefix + rel
                        changes[name] = target.read_bytes()
                for name in quests:
                    target = base / 'config/ftbquests/quests' / name[len(quest_prefix):]
                    if not target.is_file():
                        raise ValueError(f'Missing translation: {target}')
                    changes[name], count = overlay_quest(original.read(name).decode('utf-8'), target.read_text(encoding='utf-8'))
                    changed_fields += count
            manifest = dict(source_manifest)
            manifest['name'] = f"{source_manifest.get('name', args.version)} [{lang}]"
            version_key = 'versionId' if manifest_name == 'modrinth.index.json' else 'version'
            manifest[version_key] = str(source_manifest.get(version_key, args.version)) + '-' + lang
            changes[manifest_name] = json.dumps(manifest, ensure_ascii=False, indent=2).encode()
            option_path = prefix + 'options.txt'
            options = original.read(option_path).decode('utf-8') if option_path in original.namelist() else ''
            options = re.sub(r'^lang:.*(?:\n|$)', '', options, flags=re.MULTILINE)
            changes[option_path] = (options.rstrip('\n') + '\nlang:' + lang + '\n').encode()
            info = {'pack_version': args.version, 'quest_language': lang, 'language': label,
                    'source_url': args.source_url, 'source_sha256': source_sha,
                    'translation_repository': 'https://github.com/Raishxn/GTL_PTBR_QUESTS',
                    'translation': 'original' if lang == 'zh_cn' else 'automatic_with_token_checks',
                    'source_preparation': recovery}
            changes[prefix + 'gtl-release.json'] = json.dumps(info, ensure_ascii=False, indent=2).encode()
            target = out / f'{args.slug}-{lang}{extension}'
            expected_overlays = set(changes.keys())
            with ZipFile(target, 'w', compression=ZIP_DEFLATED, compresslevel=6) as result:
                for entry in original.infolist():
                    if Path(entry.filename).name in RUNTIME_FILES:
                        continue
                    result.writestr(copy.copy(entry), changes.pop(entry.filename, original.read(entry.filename)))
                for name, data in changes.items():
                    result.writestr(name, data)
            unchanged, verified_quests = 0, 0
            with ZipFile(target) as result:
                if result.testzip():
                    raise ValueError('Output failed ZIP integrity verification')
                actual = json.loads(result.read(manifest_name))
                for critical in ('files', 'dependencies', 'minecraft', 'manifestType', 'formatVersion', 'overrides'):
                    if actual.get(critical) != source_manifest.get(critical):
                        raise ValueError(f'Manifest changed: {critical}')
                for entry in original.infolist():
                    name = entry.filename
                    if Path(name).name in RUNTIME_FILES:
                        assert name not in result.namelist()
                        continue
                    before, after = original.read(name), result.read(name)
                    if name in quests:
                        if lang == 'zh_cn':
                            assert before == after, name
                        else:
                            assert mechanics(fields(before.decode())[0]) == mechanics(fields(after.decode())[0]), name
                        verified_quests += 1
                    elif name in expected_overlays:
                        pass
                    elif name not in (manifest_name, option_path):
                        assert before == after, name
                        unchanged += 1
            variant = {'language': lang, 'file': target.name, 'bytes': target.stat().st_size,
                       'sha256': digest(target.read_bytes()), 'quest_files_verified': verified_quests,
                       'text_fields': changed_fields, 'other_original_files_verified': unchanged,
                       'archive_integrity': 'passed', 'quest_mechanics_preserved': True,
                       'game_launch_tested': False}
            report['variants'].append(variant)
            print(json.dumps(variant, ensure_ascii=False), flush=True)
    (out / 'validation.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    (out / 'SHA256SUMS.txt').write_text(''.join(f"{v['sha256']}  {v['file']}\n" for v in report['variants']), encoding='utf-8')
    return report


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    for option in ('source', 'version', 'slug', 'source-url', 'out'):
        parser.add_argument('--' + option, required=True)
    parser.add_argument('--recovery-report')
    build(parser.parse_args())
