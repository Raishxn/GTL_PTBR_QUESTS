# Gerar os pacotes das releases

Cada release contém três pacotes importáveis, um para cada idioma das quests:

- `pt_br`: português do Brasil;
- `en_us`: inglês;
- `zh_cn`: textos chineses do pacote-base.

Use Python 3, sem bibliotecas adicionais, e execute a partir da raiz do repositório:

```sh
python tools/build_release.py \
  --source /caminho/GTL-11TH-original.mrpack \
  --version GTL-11TH \
  --slug GTL-11TH \
  --source-url 'https://drive.google.com/file/d/1qu4uJSVFAO5iydHX0cOISaKedCj4jjP7/view' \
  --out /caminho/pacotes/gtl-11th
```

`--version` é o nome da pasta de tradução: a variante PT-BR usa `<versão>/config/ftbquests/quests`; a inglesa usa `en_us/<versão>/config/ftbquests/quests`. O pacote-base deve ter os textos originais em chinês. O programa reconhece os formatos Modrinth (`.mrpack`) e CurseForge (`.zip`) pelo manifesto na raiz.

O empacotador lê as traduções por arquivo e ID de objeto. Apenas os valores de `title`, `subtitle`, `description` e `lock_message` são substituídos. Ele preserva o restante do arquivo de quests original, inclusive IDs, tarefas, dependências, recompensas e comandos. O nome e a versão exibidos no launcher recebem o sufixo do idioma, e `options.txt` recebe o idioma inicial correspondente.

Caches de jogadores (`usercache.json`, `usernamecache.json`) e arquivos de contas, quando presentes, são excluídos. Os demais arquivos originais são conferidos após a geração. Nenhum mod ou script é copiado das pastas de tradução durante o empacotamento.

## Verificações e arquivos produzidos

O programa interrompe a geração se faltar um arquivo ou campo de tradução, se um caminho do ZIP for inseguro, se houver entradas duplicadas ou se a verificação de integridade falhar. Ele também compara a estrutura das quests, desconsiderando somente os campos de texto, e confirma que os arquivos e as dependências do manifesto foram preservados.

Para cada versão, são produzidos:

- três pacotes de idioma;
- `SHA256SUMS.txt`, para conferir os arquivos baixados;
- `validation.json`, com hashes e resultados das verificações.

Cada pacote inclui `gtl-release.json` na raiz dos arquivos da instância, com o idioma, a origem e os dados da preparação do pacote. A validação não inicia o Minecraft e não garante uma campanha completa sem erros. O campo `game_launch_tested` registra essa limitação.

## Fontes e particularidades desta publicação

Consulte [`release-sources.json`](release-sources.json) para os endereços e hashes dos pacotes usados.

O pacote 10th funcional enviado pelo mantenedor já estava em português. Para preparar a base chinesa, foram reaplicados apenas os textos do arquivo original de 12/07: as entradas de quests desse arquivo antigo passaram pela verificação de CRC, apesar de o final do ZIP estar truncado. Os mods e scripts vieram integralmente do pacote funcional novo. Dois grupos adicionais usam os títulos `GTLHonkai` e `资源` (Recursos). O relatório [`gtl10-source-preparation.json`](gtl10-source-preparation.json) registra essa preparação.

Para reproduzir a base do 10th, baixe o pacote funcional e a referência chinesa dos links registrados e execute:

```sh
python tools/prepare_gtl10_source.py \
  --functional /caminho/GTL-10TH-funcional.mrpack \
  --chinese /caminho/GTL十周目7月12日.zip \
  --out /caminho/GTL-10TH-base-chinesa.mrpack \
  --report /caminho/gtl10-source-preparation.json
```

Depois use essa base no empacotador, com `--version GTL十周目7月12日`, `--slug GTL-10TH-2026-07-12` e `--recovery-report /caminho/gtl10-source-preparation.json`. Não use o ZIP antigo truncado como pacote de instalação. O addon oficial baixado durante a tentativa inicial de reparo não foi usado nas releases; o pacote funcional fornecido pelo mantenedor é a fonte dos mods do 10th.

A revisão das traduções preserva códigos de formatação, números, tiers, unidades, links de quests e referências técnicas. Símbolos de materiais e comandos que precisam permanecer em chinês são mantidos. As traduções ainda podem precisar de revisão editorial dos termos usados no jogo.
