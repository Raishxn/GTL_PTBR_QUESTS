# GregTech Leisure — Modpacks com quests em PT-BR, English e 中文

Baixe o **GregTech Leisure (GTL)** com o idioma das quests já aplicado. Cada versão tem uma release própria, com três opções: **português do Brasil**, **inglês** ou **chinês original**.

## Downloads prontos para importar

Escolha **um arquivo de idioma** da versão desejada. Os pacotes incluem as quests no idioma escolhido; o launcher instala as dependências declaradas pelo modpack durante a importação.

| Versão | Português do Brasil | English | Chinês original | Detalhes |
| --- | --- | --- | --- | --- |
| GregTech Leisure 增强版 2.7 | [PT-BR](https://github.com/Raishxn/GTL_PTBR_QUESTS/releases/download/gtl-enhanced-2.7/GregTech-Leisure-Enhanced-2.7-pt_br.mrpack) | [English](https://github.com/Raishxn/GTL_PTBR_QUESTS/releases/download/gtl-enhanced-2.7/GregTech-Leisure-Enhanced-2.7-en_us.mrpack) | [中文](https://github.com/Raishxn/GTL_PTBR_QUESTS/releases/download/gtl-enhanced-2.7/GregTech-Leisure-Enhanced-2.7-zh_cn.mrpack) | [Release](https://github.com/Raishxn/GTL_PTBR_QUESTS/releases/tag/gtl-enhanced-2.7) |
| GTL 11th | [PT-BR](https://github.com/Raishxn/GTL_PTBR_QUESTS/releases/download/gtl-11th/GTL-11TH-pt_br.mrpack) | [English](https://github.com/Raishxn/GTL_PTBR_QUESTS/releases/download/gtl-11th/GTL-11TH-en_us.mrpack) | [中文](https://github.com/Raishxn/GTL_PTBR_QUESTS/releases/download/gtl-11th/GTL-11TH-zh_cn.mrpack) | [Release](https://github.com/Raishxn/GTL_PTBR_QUESTS/releases/tag/gtl-11th) |
| GTL 10th — 12/07 | [PT-BR](https://github.com/Raishxn/GTL_PTBR_QUESTS/releases/download/gtl-10th-2026-07-12/GTL-10TH-2026-07-12-pt_br.mrpack) | [English](https://github.com/Raishxn/GTL_PTBR_QUESTS/releases/download/gtl-10th-2026-07-12/GTL-10TH-2026-07-12-en_us.mrpack) | [中文](https://github.com/Raishxn/GTL_PTBR_QUESTS/releases/download/gtl-10th-2026-07-12/GTL-10TH-2026-07-12-zh_cn.mrpack) | [Release](https://github.com/Raishxn/GTL_PTBR_QUESTS/releases/tag/gtl-10th-2026-07-12) |
| GregTech Leisure 3.7 | [PT-BR](https://github.com/Raishxn/GTL_PTBR_QUESTS/releases/download/gtl-3.7/GregTech-Leisure-3.7-pt_br.mrpack) | [English](https://github.com/Raishxn/GTL_PTBR_QUESTS/releases/download/gtl-3.7/GregTech-Leisure-3.7-en_us.mrpack) | [中文](https://github.com/Raishxn/GTL_PTBR_QUESTS/releases/download/gtl-3.7/GregTech-Leisure-3.7-zh_cn.mrpack) | [Release](https://github.com/Raishxn/GTL_PTBR_QUESTS/releases/tag/gtl-3.7) |
| GregTech Leisure 1.4.5.0 | [PT-BR](https://github.com/Raishxn/GTL_PTBR_QUESTS/releases/download/gtl-1.4.5.0/GregTech-Leisure-1.4.5.0-pt_br.zip) | [English](https://github.com/Raishxn/GTL_PTBR_QUESTS/releases/download/gtl-1.4.5.0/GregTech-Leisure-1.4.5.0-en_us.zip) | [中文](https://github.com/Raishxn/GTL_PTBR_QUESTS/releases/download/gtl-1.4.5.0/GregTech-Leisure-1.4.5.0-zh_cn.zip) | [Release](https://github.com/Raishxn/GTL_PTBR_QUESTS/releases/tag/gtl-1.4.5.0) |

[Ver todas as releases](https://github.com/Raishxn/GTL_PTBR_QUESTS/releases)

### Como instalar

1. Baixe o arquivo do idioma desejado na tabela acima.
2. No **Prism Launcher**, use **Adicionar instância → Importar** e selecione o `.mrpack` ou `.zip` baixado, sem extrair.
3. Aguarde o launcher baixar os mods e concluir a instalação.
4. Para o **GTL 11th, selecione Java 21** nas configurações de Java da instância. Alguns mods incluídos nessa versão exigem Java 21.
5. Inicie a instância. As quests e a opção de idioma do Minecraft já estarão configuradas para a variante escolhida.

Também é possível usar outro launcher compatível com o formato do pacote. As versões `.mrpack` usam o formato Modrinth; os arquivos `.zip` da versão 1.4.5.0 usam o formato CurseForge. A instalação exige acesso à internet para baixar as dependências.

Os arquivos **Source code** que o GitHub mostra automaticamente não são o modpack para importar. Use um dos arquivos `pt_br`, `en_us` ou `zh_cn` em **Assets**.

### O que muda entre os idiomas

- Os textos das quests e o idioma inicial do Minecraft são ajustados para a opção escolhida.
- IDs, tarefas, recompensas, dependências e comandos das quests são preservados em relação ao pacote-base de cada versão.
- Os mods, receitas e scripts do pacote-base são preservados. As variantes de idioma não atualizam os addons.
- As traduções são automáticas, com revisão de formatação, números e referências; podem existir termos que precisem de revisão editorial.
- As releases incluem `SHA256SUMS.txt` e `validation.json` com a verificação dos arquivos. A validação cobre integridade dos pacotes e preservação das quests; não representa um teste completo de progressão dentro do jogo.

O **10th** usa o [pacote funcional fornecido pelo mantenedor](https://drive.google.com/file/d/1aOobLQkQRB0S6Ray7YF29h4ps8gr-pf6/view?usp=sharing), que já continha quests em PT-BR. A opção chinesa recupera os textos das quests originais e mantém a estrutura e os scripts do pacote funcional. Os caches de nomes de jogadores foram removidos da distribuição.

## Arquivos de tradução

Para quem já tem uma instância e deseja aplicar a tradução manualmente, os arquivos continuam disponíveis no repositório. Use somente a pasta correspondente à versão exata do seu modpack.

| Versão | Português do Brasil | English |
| --- | --- | --- |
| GregTech Leisure 增强版 2.7 | [PT-BR](GregTech-Leisure-Enhanced-2.7/) | [English](en_us/GregTech-Leisure-Enhanced-2.7/) |
| GTL 11th | [PT-BR](GTL-11TH/) | [English](en_us/GTL-11TH/) |
| GTL 10th — 12/07 | [PT-BR](GTL十周目7月12日/) | [English](en_us/GTL十周目7月12日/) |
| GregTech Leisure 4.0 | [PT-BR](GregTech-Leisure-4.0/) | [English](en_us/GregTech-Leisure-4.0/) |
| GregTech Leisure 3.7 | [PT-BR](GregTech-Leisure-3.7/) | [English](en_us/GregTech-Leisure-3.7/) |
| GregTech Leisure 1.4.5.0 | [PT-BR](GregTech-Leisure-1.4.5.0/) | [English](en_us/GregTech-Leisure-1.4.5.0/) |
| GTL Shanhai 6.13 | [PT-BR](GTL-Shanhai-6.13/) | — |
| GTL 8TH | [PT-BR](GTL-8TH/) | [English](en_us/GTL-8TH/) |
| GTL 7TH | [PT-BR](GTL-7TH/) | — |

**—** indica que não há uma pasta de tradução nesse idioma para a versão no repositório. A disponibilidade de arquivos de tradução não significa que exista uma release do modpack completo para essa versão.

### Aplicar uma tradução manualmente

1. Feche o Minecraft e faça backup da instância, incluindo os mundos e as configurações.
2. [Baixe os arquivos deste repositório](https://github.com/Raishxn/GTL_PTBR_QUESTS/archive/refs/heads/main.zip) e extraia o ZIP.
3. Escolha a pasta da versão exata do modpack e do idioma desejado: PT-BR na raiz ou inglês dentro de `en_us/`.
4. Copie o **conteúdo** da pasta escolhida para a pasta `minecraft` da instância, mesclando as pastas e substituindo os arquivos correspondentes. Copie apenas as pastas presentes na versão escolhida, como `config/ftbquests`, `kubejs` e `defaultconfigs`.
5. Abra o modpack novamente e confira as quests.

No Prism Launcher, o caminho normalmente fica parecido com:

```text
PrismLauncher/instances/NOME_DA_INSTANCIA/minecraft
```

Mudar apenas o idioma do Minecraft não substitui os arquivos de quests. Para instalar uma instância nova com o idioma já aplicado, prefira os pacotes das releases.

## Addons e projetos relacionados

Para acompanhar novidades ou atualizar os componentes do modpack, consulte os projetos e as instruções dos respectivos autores.

| Projeto | Repositório | Downloads e atualizações |
| --- | --- | --- |
| GTLAdditions | [Dragonators/GTLAdditions](https://github.com/Dragonators/GTLAdditions) | [Releases](https://github.com/Dragonators/GTLAdditions/releases) |
| GTLCore | [AaAdoniSsS/GTLCore — branch gtl-1431-skyblock](https://github.com/AaAdoniSsS/GTLCore/tree/gtl-1431-skyblock) | [Releases](https://github.com/AaAdoniSsS/GTLCore/releases) |
| GTL-Extend | [QiuYe-123/GTL-Extend](https://github.com/QiuYe-123/GTL-Extend) | [Releases](https://github.com/QiuYe-123/GTL-Extend/releases) |
| GTL Shanhai | [dishanhai/gtl_shanhai-dishanhai](https://github.com/dishanhai/gtl_shanhai-dishanhai) | [Releases](https://github.com/dishanhai/gtl_shanhai-dishanhai/releases) |

Antes de atualizar, faça backup da instância e confira a compatibilidade com a versão do GTL, as dependências e a branch indicada pelo projeto. Um componente mais recente pode exigir mudanças em outros mods, scripts ou configurações. A disponibilidade de arquivos prontos depende de cada projeto.

## Fontes dos pacotes

- [GTL 11th original](https://drive.google.com/file/d/1qu4uJSVFAO5iydHX0cOISaKedCj4jjP7/view?usp=drive_link)
- [Coleção de versões do GTL](https://drive.google.com/drive/folders/1o0H2QLOpL8bkJ82MNBrow-KDSceQ_jYA?usp=drive_link)
- [GTL 10th — pacote funcional](https://drive.google.com/file/d/1aOobLQkQRB0S6Ray7YF29h4ps8gr-pf6/view?usp=sharing)

O ZIP antigo do 10th presente na coleção está truncado; as releases do 10th usam o novo pacote funcional informado acima. O arquivo de coleção também repete pacotes e inclui um addon avulso; esses itens não geram releases duplicadas.

## Créditos e manutenção

Créditos aos autores do GregTech Leisure, dos mods e addons e aos responsáveis pelas versões compartilhadas. Este repositório reúne as traduções e os pacotes organizados por versão e idioma.

Alguns símbolos técnicos e glifos de materiais, como `鿫`, `鿏` e `鿭`, são preservados. Os arquivos de idioma do KubeJS existentes no repositório foram criados a partir dos assets traduzidos quando a fonte só tinha `zh_cn`.

Os scripts de tradução e empacotamento ficam em [`tools/`](tools/). Consulte [`tools/RELEASES.md`](tools/RELEASES.md) para reproduzir a geração e as verificações das releases.
