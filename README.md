# Traduções do GregTech Leisure

Este repositório reúne traduções de quests do FTB Quests e arquivos KubeJS para GregTech Leisure/GTL.

## Idiomas

- As pastas no topo do repositório são a versão **Português do Brasil**.
- A pasta `en_us/` contém as mesmas versões em **inglês**.

## Versões disponíveis

### Português do Brasil

- `GregTech-Leisure-4.0/`
- `GTL-Shanhai-6.13/`
- `GregTech-Leisure-1.4.5.0/`
- `GTL-8TH/`
- `GregTech-Leisure-3.7/`
- `GTL-7TH/`

### Inglês

- `en_us/GregTech-Leisure-4.0/`
- `en_us/GregTech-Leisure-1.4.5.0/`
- `en_us/GTL-8TH/`

## Como instalar

1. Feche o Minecraft e o launcher.
2. Faça backup das pastas originais da instância.
3. Copie a pasta da versão desejada deste repositório para a raiz `minecraft` da instância.
4. Substitua pelo menos:
   - `minecraft/config/ftbquests`
   - `minecraft/kubejs`
5. Abra o modpack novamente.

No Prism Launcher, o caminho normalmente fica parecido com:

```text
PrismLauncher/instances/NOME_DA_INSTANCIA/minecraft
```

## Observações

- As traduções preservam IDs de quests, itens, receitas, recompensas, dependências e scripts.
- Os diretórios `kubejs/assets/**/lang/pt_br.json` e `kubejs/assets/**/lang/en_us.json` foram criados a partir dos assets traduzidos quando a fonte só tinha `zh_cn`.
- Alguns símbolos técnicos/custom glyphs de materiais foram preservados de propósito, por exemplo `鿫`, `鿏` e `鿭`.
- A tradução bulk foi gerada por pipeline automático com proteção de tokens; os scripts usados ficam em `tools/`.
