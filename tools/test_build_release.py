import contextlib
import io
import json
from pathlib import Path
from tempfile import TemporaryDirectory
from types import SimpleNamespace
import unittest
from unittest.mock import patch
from zipfile import ZipFile
import build_release

class ReleaseSafetyTests(unittest.TestCase):
    def test_importable_variants_preserve_source_mechanics_and_scripts(self):
        with TemporaryDirectory() as tmp:
            root = Path(tmp)
            raw = '{ id: "A" title: "原文" quests: [{id: "B" description: ["原文"] tasks: [{id: "C" count: 64}]}] }'
            source = root / 'source.mrpack'
            manifest = {'game': 'minecraft', 'formatVersion': 1, 'name': 'Pack', 'versionId': '1', 'files': [], 'dependencies': {'minecraft': '1.20.1', 'forge': '47.4.16'}}
            with ZipFile(source, 'w') as z:
                z.writestr('modrinth.index.json', json.dumps(manifest))
                z.writestr('overrides/config/ftbquests/quests/test.snbt', raw)
                z.writestr('overrides/kubejs/server_scripts/test.js', 'keep_this_recipe();')
                z.writestr('overrides/usercache.json', '["private runtime data"]')
            for lang, base in [('pt_br', root / 'Version'), ('en_us', root / 'en_us/Version')]:
                p = base / 'config/ftbquests/quests/test.snbt'
                p.parent.mkdir(parents=True)
                p.write_text(raw.replace('原文', lang).replace('count: 64', 'count: 999'))
            args = SimpleNamespace(source=str(source), version='Version', slug='Pack', source_url='https://example.com/source', out=str(root / 'out'), recovery_report=None)
            with patch.object(build_release, 'ROOT', root), contextlib.redirect_stdout(io.StringIO()):
                report = build_release.build(args)
            self.assertEqual(len(report['variants']), 3)
            with ZipFile(source) as z:
                self.assertEqual(z.read('overrides/config/ftbquests/quests/test.snbt').decode(), raw)
            for v in report['variants']:
                with ZipFile(root / 'out' / v['file']) as z:
                    self.assertIsNone(z.testzip())
                    text = z.read('overrides/config/ftbquests/quests/test.snbt').decode()
                    self.assertIn('count: 64', text)
                    self.assertNotIn('999', text)
                    self.assertEqual(z.read('overrides/kubejs/server_scripts/test.js'), b'keep_this_recipe();')
                    self.assertNotIn('overrides/usercache.json', z.namelist())
                    if v['language'] == 'zh_cn':
                        self.assertEqual(text, raw)
    def test_missing_translation_field_is_rejected(self):
        with self.assertRaises(ValueError):
            build_release.overlay_quest('{id:"A" title:"原文"}', '{id:"A"}')
    def test_unsafe_archive_paths_are_rejected(self):
        for path in ['../outside', '/absolute', 'overrides/../../outside', 'overrides\\outside']:
            with self.subTest(path=path), self.assertRaises(ValueError):
                build_release.local_path(path)

if __name__ == '__main__':
    unittest.main()
