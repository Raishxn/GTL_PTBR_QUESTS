"""Restore only Chinese quest text onto the owner's functional GTL 10th pack.

The older Drive ZIP is truncated inside the last bundled mod. Its preceding
quest entries are recovered only after their uncompressed size and CRC match.
No mod from that broken archive is used in the normalized pack.
"""
from __future__ import annotations
import argparse
import copy
import hashlib
import json
import struct
import zlib
from pathlib import Path
from zipfile import ZipFile, BadZipFile, ZIP_DEFLATED
from quest_text import fields
from build_release import mechanics

CUSTOM_GROUPS = {'55F6563FBB4902EC': 'GTLHonkai', '742018A032D152FC': '资源'}


def original_quests(path):
    try:
        with ZipFile(path) as archive:
            names = archive.namelist()
            if 'modpack.mrpack' in names:
                data = archive.read('modpack.mrpack')
            else:
                return {n.split('config/ftbquests/quests/')[1]: archive.read(n).decode('utf-8')
                        for n in names if '/config/ftbquests/quests/' in n and n.endswith('.snbt')}
    except BadZipFile:
        outer = path.read_bytes()
        header = struct.unpack_from('<IHHHHHIIIHH', outer)
        if header[0] != 0x04034b50 or header[3] != 8:
            raise ValueError('Unsupported truncated archive')
        name_size, extra_size = header[-2:]
        if outer[30:30 + name_size].decode('utf-8') != 'modpack.mrpack':
            raise ValueError('Expected nested modpack.mrpack')
        data = zlib.decompressobj(-15).decompress(outer[30 + name_size + extra_size:])
    offset, quests = 0, {}
    while data[offset:offset + 4] == b'PK\x03\x04':
        _, _, flags, method, _, _, crc, compressed, size, nl, xl = struct.unpack_from('<IHHHHHIIIHH', data, offset)
        if flags & 8:
            raise ValueError('Unsupported data descriptor in inner archive')
        name = data[offset + 30:offset + 30 + nl].decode('utf-8')
        start = offset + 30 + nl + xl
        if start + compressed > len(data):
            break
        if '/config/ftbquests/quests/' in name and name.endswith('.snbt'):
            payload = data[start:start + compressed]
            raw = zlib.decompress(payload, -15) if method == 8 else payload
            if len(raw) != size or zlib.crc32(raw) != crc:
                raise ValueError(f'Invalid original quest entry: {name}')
            quests[name.split('config/ftbquests/quests/')[1]] = raw.decode('utf-8')
        offset = start + compressed
    if not quests:
        raise ValueError('No intact original quests found')
    return quests


def prepare(functional, chinese, output, report_path):
    texts = original_quests(chinese)
    changed = 0
    with ZipFile(functional) as source, ZipFile(output, 'w', compression=ZIP_DEFLATED, compresslevel=6) as result:
        if source.testzip():
            raise ValueError('Functional source failed ZIP verification')
        for entry in source.infolist():
            raw = source.read(entry.filename)
            if '/config/ftbquests/quests/' in entry.filename and entry.filename.endswith('.snbt'):
                rel = entry.filename.split('config/ftbquests/quests/')[1]
                original = texts.get(rel, '')
                original_fields = fields(original)[1]
                current = raw.decode('utf-8')
                current_tree, current_fields = fields(current)
                edits = []
                for ident, node in current_fields.items():
                    if ident in original_fields:
                        other = original_fields[ident]
                        replacement = original[other.start:other.end]
                    elif ident[1] == 'title' and ident[0] in CUSTOM_GROUPS:
                        replacement = json.dumps(CUSTOM_GROUPS[ident[0]], ensure_ascii=False)
                    else:
                        raise ValueError(f'Missing original Chinese text: {rel}: {ident}')
                    edits.append((node.start, node.end, replacement))
                for start, end, value in sorted(edits, reverse=True):
                    current = current[:start] + value + current[end:]
                assert mechanics(current_tree) == mechanics(fields(current)[0])
                changed += len(edits)
                raw = current.encode('utf-8')
            result.writestr(copy.copy(entry), raw)
    with ZipFile(output) as result:
        assert result.testzip() is None
    report = {'status': 'functional_source_supplied_by_owner',
              'source_url': 'https://drive.google.com/file/d/1aOobLQkQRB0S6Ray7YF29h4ps8gr-pf6/view?usp=sharing',
              'downloaded_source_sha256': hashlib.sha256(functional.read_bytes()).hexdigest(),
              'normalized_source_sha256': hashlib.sha256(output.read_bytes()).hexdigest(),
              'quest_text_fields_restored_to_chinese': changed,
              'chinese_reference': 'https://drive.google.com/file/d/11t2CgEvz_uHDgFay-ZAxWbtGmFhg1p1i/view',
              'note': 'Only quest text was restored. Mods, scripts and quest mechanics come from the functional pack.'}
    report_path.write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(json.dumps(report, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--functional', type=Path, required=True)
    parser.add_argument('--chinese', type=Path, required=True)
    parser.add_argument('--out', type=Path, required=True)
    parser.add_argument('--report', type=Path, required=True)
    args = parser.parse_args()
    prepare(args.functional, args.chinese, args.out, args.report)
