# GregTech Leisure — Modpacks e quests em PT-BR / English

Downloads de versões do **GregTech Leisure (GTL)** e traduções de quests para quem quer jogar em **português do Brasil** ou **inglês**.

Os modpacks ficam no Google Drive. Aqui no GitHub estão os arquivos de tradução do FTB Quests e do KubeJS, organizados por versão e idioma, além das referências dos projetos para acompanhar atualizações.

## Baixar o modpack

| Download | Conteúdo |
| --- | --- |
| [GTL 11th — arquivo .mrpack](https://drive.google.com/file/d/1qu4uJSVFAO5iydHX0cOISaKedCj4jjP7/view?usp=drive_link) | Pacote `GTL 11th.mrpack` para importar em um launcher compatível. |
| [Coleção de versões do GTL](https://drive.google.com/drive/folders/1o0H2QLOpL8bkJ82MNBrow-KDSceQ_jYA?usp=drive_link) | Pasta compartilhada com versões do modpack. |

Escolha a versão que deseja jogar e confira o idioma das quests no pacote. Para aplicar ou trocar a tradução, use os arquivos da **mesma versão** na tabela abaixo. A presença de um modpack no Drive não significa que ele já tenha uma tradução correspondente neste repositório.

### Instalar um modpack

1. Baixe o pacote desejado pelo Google Drive.
2. Para arquivos `.mrpack`, use a opção de importar modpack do seu launcher. No Prism Launcher, use **Adicionar instância → Importar** e selecione o arquivo.
3. Se o download vier em outro formato, siga as instruções incluídas no pacote e use um launcher compatível.
4. Abra a instância e confira as quests. Se precisar mudar o idioma, siga as instruções de tradução abaixo.

## Quests em português ou inglês

As pastas na raiz contêm os arquivos em **português do Brasil (PT-BR)**. As traduções em **inglês (English)** ficam em `en_us/`.

| Versão | Português do Brasil | English |
| --- | --- | --- |
| GregTech Leisure 4.0 | [PT-BR](GregTech-Leisure-4.0/) | [English](en_us/GregTech-Leisure-4.0/) |
| GregTech Leisure 3.7 | [PT-BR](GregTech-Leisure-3.7/) | — |
| GregTech Leisure 1.4.5.0 | [PT-BR](GregTech-Leisure-1.4.5.0/) | [English](en_us/GregTech-Leisure-1.4.5.0/) |
| GTL Shanhai 6.13 | [PT-BR](GTL-Shanhai-6.13/) | — |
| GTL 8TH | [PT-BR](GTL-8TH/) | [English](en_us/GTL-8TH/) |
| GTL 7TH | [PT-BR](GTL-7TH/) | — |
| GTL十周目7月12日 | [PT-BR](GTL十周目7月12日/) | [English](en_us/GTL十周目7月12日/) |

**—** indica que não há uma pasta de tradução nesse idioma para a versão no repositório.

### Aplicar ou trocar a tradução

1. Feche o Minecraft e faça backup da instância, incluindo os mundos e as configurações.
2. [Baixe os arquivos deste repositório](https://github.com/Raishxn/GTL_PTBR_QUESTS/archive/refs/heads/main.zip) e extraia o ZIP.
3. Escolha a pasta da **versão exata do seu modpack** e do idioma desejado.
4. Copie o **conteúdo** dessa pasta para a pasta `minecraft` da instância, mesclando as pastas e substituindo os arquivos correspondentes:
   - `config/ftbquests`, quando presente;
   - `kubejs`, quando presente;
   - `defaultconfigs`, quando presente.
5. Abra o modpack novamente e confira as quests.

No Prism Launcher, o caminho normalmente fica parecido com:

```text
PrismLauncher/instances/NOME_DA_INSTANCIA/minecraft
```

Copie as pastas internas, como `config/` e `kubejs/`, diretamente para esse caminho. Algumas versões contêm apenas `config/`; copie somente o que existir na pasta escolhida. Mudar apenas o idioma do Minecraft não substitui os arquivos de quests.

## Addons e projetos relacionados

Para quem quiser acompanhar novidades ou atualizar os componentes do modpack, consulte os projetos abaixo e as instruções dos respectivos autores.

| Projeto | Repositório | Downloads e atualizações |
| --- | --- | --- |
| GTLAdditions | [Dragonators/GTLAdditions](https://github.com/Dragonators/GTLAdditions) | [Releases](https://github.com/Dragonators/GTLAdditions/releases) |
| GTLCore | [AaAdoniSsS/GTLCore — branch gtl-1431-skyblock](https://github.com/AaAdoniSsS/GTLCore/tree/gtl-1431-skyblock) | [Releases](https://github.com/AaAdoniSsS/GTLCore/releases) |
| GTL-Extend | [QiuYe-123/GTL-Extend](https://github.com/QiuYe-123/GTL-Extend) | [Releases](https://github.com/QiuYe-123/GTL-Extend/releases) |
| GTL Shanhai | [dishanhai/gtl_shanhai-dishanhai](https://github.com/dishanhai/gtl_shanhai-dishanhai) | [Releases](https://github.com/dishanhai/gtl_shanhai-dishanhai/releases) |

Antes de atualizar, faça backup da instância e confira a compatibilidade com a sua versão do GTL, as dependências e a branch indicada pelo projeto. A versão mais recente de um componente pode exigir mudanças em outros mods, scripts ou configurações. A disponibilidade de arquivos prontos depende de cada projeto; consulte também o README de cada repositório.

## Sobre as traduções

- As traduções preservam IDs de quests, itens, receitas, recompensas, dependências e scripts.
- Os arquivos `kubejs/assets/**/lang/pt_br.json` e `kubejs/assets/**/lang/en_us.json` foram criados a partir dos assets traduzidos quando a fonte só tinha `zh_cn`.
- Alguns símbolos técnicos e glifos de materiais foram preservados de propósito, por exemplo `鿫`, `鿏` e `鿭`.
- A tradução em lote foi gerada por um processo automático com proteção de tokens; os scripts usados ficam em [`tools/`](tools/).

## Créditos

Créditos aos autores do GregTech Leisure, dos mods e addons e aos responsáveis pelas versões compartilhadas. Este repositório reúne as traduções e os links de acesso aos projetos e modpacks.
