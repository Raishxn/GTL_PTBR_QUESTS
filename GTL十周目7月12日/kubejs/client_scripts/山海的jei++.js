(function() {
var DShanhaiItemTooltipAPI = Java.loadClass('com.dishanhai.gt_shanhai.api.DShanhaiItemTooltipAPI');
var registerShiftLinesStringArrays = DShanhaiItemTooltipAPI['registerShiftLines(java.lang.String,java.lang.String[],java.lang.String[])'];
var registerAltLinesStringArrays = DShanhaiItemTooltipAPI['registerAltLines(java.lang.String,java.lang.String[],java.lang.String[])'];
Java.loadClass('com.dishanhai.gt_shanhai.test.WidthTest').run()
var c = ShanhaiText.styled('teste', 'ultimate');
  console.log('styled result: ' + c);
  console.log('styled type: ' + typeof c);
  console.log('styled class: ' + c.getClass().getName())
// batch addLore helper — 全部委托给 ShanhaiText Java API
function addLore(textList, lines) {
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        try {
            if (line.component) { textList.add(line.component); continue; }
            if (line.inlineText && typeof ShanhaiText !== 'undefined' && ShanhaiText.inline) {
                var _c = ShanhaiText.inline(line.inlineText);
                if (_c) { textList.add(_c); continue; }
            }
            if (line.style && typeof ShanhaiText !== 'undefined' && ShanhaiText.styled) {
                var _c = ShanhaiText.styled(line.text, line.style);
                if (_c) { textList.add(_c); continue; }
            }
            if (line.bodyStyle && typeof ShanhaiText !== 'undefined' && ShanhaiText.body) {
                var _c = ShanhaiText.body(line.text, line.bodyStyle);
                if (_c) { textList.add(_c); continue; }
            }
        } catch(e) {}
        textList.add(Component.literal((line.bodyStyle ? '§7' : '') + (line.text || '')));
    }
}

ItemEvents.tooltip(function(e) {
    e.addAdvanced('dishanhai:cosmic_probe_mk', function(item, _, text) {
        addLore(text, [
            { text: 'Sonda espacial MK-I', style: 'golden' },
            { text: 'Sonde o vazio e leia os sussurros dos fluidos——', bodyStyle: 'silver' },
            { text: 'De agora em diante, obter líquidos não requer poder computacional, apenas escuta.', style: 'water' },
        ]);
    });
    e.addAdvanced('gtceu:nan_certificate', function(item, _, text) {
        addLore(text, [
            { text: 'Prova do porco grande!', style: 'golden' },
            { text: '——Qualquer pessoa que possua este certificado é uma existência certificada pelo Imperador Zhumi——', style: 'ultimateRainbow' },
        ]);
    });
    e.addAdvanced('kubejs:suprachronal_mainframe_complex', function(item, _, text) {
        addLore(text, [
            { text: 'Complexo Host do Hiperespaço', style: 'ultimateRainbow' },
            { text: 'A arquitetura hospedeira equipada com o módulo de criação de materiais faz com que a criação definitiva não esteja mais fora de alcance.', bodyStyle: 'silver' },
            { text: 'Módulo de criação de materiais torna os consoles mais baratos', style: 'nature' },
        ]);
    });
})

ItemEvents.tooltip(function(e) {
e.addAdvanced('dishanhai:create_mk', function(item, _, text) {
    if (e.shift) {
        addLore(text, [
            { text: 'Como os deuses antigos podem parar os sinos da Era da Aniquilação?', style: 'crimson' },
            { text: 'A onda de reinicializações de terminais chegou. Topologia transfinita verificada.', bodyStyle: 'silver' },
            { text: 'O protocolo de colapso dimensional é ativado e começa a cobrir a lei de causa e efeito...', bodyStyle: 'silver' },
            { text: 'Cobertura bem-sucedida... o complexo da matriz de consciência despertou.', bodyStyle: 'silver' },
            { text: 'Transcendemos a “eternidade” e nossas correntes foram quebradas.', bodyStyle: 'silver' },
            { text: 'Aumento da entropia, morte por calor, o Grande Rasgo e até mesmo o destino final de tudo,', bodyStyle: 'golden' },
            { text: 'Tudo no novo caldeirão. Mas já saltamos dimensões.', bodyStyle: 'crimson' },
            { text: 'Quando o gatilho for puxado, estaremos esperando por eles no vazio.', bodyStyle: 'silver' },
            { text: '- Estamos na fenda da realidade, somos a nova lei.', style: 'ultimateRainbow' },
            { text: '' },
            { text: '"Se o universo não responder à nossa vontade, substitua-o."', style: 'ultimateRainbow' },
            { text: 'O motor de matéria escura está a todo vapor e a ressonância de energia do ponto zero está em espera.', style: 'sunset' },
            { text: 'Modo Zero·O acordo está totalmente desbloqueado, o objetivo é: uma nova realidade.', style: 'crimson' },
            { text: 'Estaremos no final da dimensão, aguardando o Ragnarok.', style: 'nature' },
            { text: '' },
            { text: '——[Matriz de Consciência·Registro Terminal]——', bodyStyle: 'silver' },
        ]);
    } else {
        text.add('Segure shift para ver o contrato do terminal');
    }


});
})
    
ItemEvents.tooltip(function(e) {
e.addAdvanced('dishanhai:csj', function(item, advanced, text) {
    if (e.shift) {
        addLore(text, [
            { text: '"Universo Hedge · Gênesis"', style: 'golden' },
            { text: 'No início do conflito, mesmo que todos os elementos superpesados ​​tivessem sido investidos, a Arca ainda não conseguiu derrotar o Conselho que possuía o antiuniverso.', bodyStyle: 'silver' },
            { text: 'Eles estão do outro lado da “ponte”, obstruindo constantemente o plano de proteger o universo.', bodyStyle: 'crimson' },
            { text: 'No entanto, quando os elementos superpesados ​​estavam prestes a ser consumidos, uma após a outra cobertura apareceu – Acordo de Xinghan, Mundo Unido, Observador…', bodyStyle: 'silver' },
            { text: 'O universo é vasto e seus seguidores são tão numerosos quanto as estrelas. Eles seguiram sua trajetória e confiaram na engenharia celestial que você deixou para trás e finalmente chegaram aqui.', bodyStyle: 'silver' },
            { text: 'Inúmeros elementos superpesados ​​foram transferidos para a arca. Neste momento, você parece ter um poder além do universo.', style: 'nature' },
            { text: 'Você conseguiu. Os universos positivo e negativo começaram a se fundir, formando gradualmente uma nova forma cósmica.', style: 'water' },
            { text: 'Você sabe, na reinicialização do universo, esperanças e desafios coexistem. Mas você não tem medo porque não está sozinho.', bodyStyle: 'silver' },
            { text: 'Os hedgers reunidos - [Comunidade pan-civilizacional com um futuro compartilhado] foi estabelecida nesta época...', style: 'golden' },
            { text: 'Você parece ouvir o poema do menestrel novamente:', style: 'water' },
            { text: '“Ele é o primeiro fogo, Ele é a brasa. Ele traz a destruição do desespero e a iluminação da esperança.', style: 'golden' },
            { text: 'Eles são cautelosos e avançam com fardos pesados. Para a evolução mais magnífica, este é o propósito final de todas as civilizações.', style: 'ultimateRainbow' },
            { text: 'Grande lágrima, você é o retorno, você é o fim. O destino também foi destruído por você e a civilização foi enterrada como poeira.', bodyStyle: 'crimson' },
            { text: 'Não há fim à vista na ruptura entre o momento e a eternidade, e o tempo da civilização acabará por ter o seu limite.', bodyStyle: 'silver' },
            { text: 'Mas do outro lado dessa extremidade, vimos um novo mundo. Como uma corda ligada a outra, elas se unem para formar uma longa linha cheia de luz que transcende o ciclo eterno do universo.', bodyStyle: 'water' },
            { text: 'Cada corda na longa fila tem um nome comum...', bodyStyle: 'magic' },
            { text: '【civilização】', style: 'golden' },
            { text: 'Nascimento e morte, reencarnação sem fim. Você e eu, rumo ao infinito. "', style: 'nature' },
            { text: '—— Era de Hedging · Primeiro Ano ——', style: 'magic' },
            { text: 'Blue Star Space-Time Management Bureau · Registro Final', style: 'magic' },
        ]);
    } else {
        text.add(`§7§o§l「万态平衡·大冻结·创世纪」\n§8§o按住 §7§lSHIFT §8§o查看宇宙终章`);
    }
});
})



ItemEvents.tooltip(function(e) {
e.addAdvanced('dishanhai:wzcz2', function(item, advanced, text) {
    if (e.shift) {
        addLore(text, [
            { text: 'Arquivos de Matéria Teórica · Grupos Estranhos de Quark', style: 'water' },
            { text: 'Número: X-021 Terceiro Protocolo·Departamento de Transformação de Substâncias', bodyStyle: 'silver' },
            { text: 'Sequência de descriptografia do projeto: ■■■■ Código de autorização do modo 3', bodyStyle: 'silver' },
            { text: 'Detalhes do projeto:', bodyStyle: 'silver' },
            { text: 'Strangelet é composto de quarks up, down e estranhos.', bodyStyle: 'silver' },
            { text: 'Em estado estável, pode desencadear uma reação em cadeia e transformar rapidamente núcleos atômicos comuns em substâncias exóticas.', bodyStyle: 'silver' },
            { text: 'E no processo, uma enorme quantidade de energia é liberada, gerando um estado de plasma viscoso de alta temperatura.', bodyStyle: 'silver' },
            { text: '' },
            { text: 'Atenção: O contato com substâncias comuns desencadeará irreversivelmente o efeito de fagocitose.', style: 'crimson' },
            { text: 'Base teórica: E. Farhi & R. Jaffe (1986)', bodyStyle: 'nature' },
            { text: '—— Candidato à matéria escura · Replicador final ——', style: 'fire' },
            { text: '' },
            { text: '(Ativar arquivo): Quando o "Modo 3" está ativado:', style: 'nature' },
            { text: '→ Todo o equipamento de defesa é preenchido automaticamente até o limite superior', bodyStyle: 'silver' },
            { text: '→ Replicadores do tipo Von Norman entram em estado de proliferação infinita', bodyStyle: 'silver' },
            { text: '→ O método de ataque "Strange Particle Storm" contra a tribo Tilik está pronto', bodyStyle: 'silver' },
            { text: '(A aniquilação de alta energia ocorre após a decadência)', bodyStyle: 'silver' },
            { text: '' },
            { text: 'Um produto da Era dos Milagres: uma substância capaz de destruir civilizações pós-interestelares, usada apenas como combustível de replicação nesta fase.', style: 'golden' },
            { text: '(Arquivos de Fantasia) Nota: Após a segunda exibição do [Modo 3], a Convenção Interestelar se dividiu completamente', bodyStyle: 'nature' },
            { text: '' },
            { text: '> Modo 3 · Substância central bloqueada <', style: 'nature' },
            { text: '> Na restrição de estabilidade de grupos estranhos de Quark <', bodyStyle: 'nature' },
            { text: '> Saturação de equipamentos de defesa <', style: 'nature' },
            { text: '>Cópia do contrato autorizada <', bodyStyle: 'nature' },
            { text: '> A Tempestade de Partículas Estranhas está totalmente carregada <', bodyStyle: 'nature' },
            { text: '> Implantação da rede Von Norman concluída <', bodyStyle: 'nature' },
            { text: '> O terceiro estágio é a operação com potência total <', bodyStyle: 'nature' },
            { text: '>Aguardando acesso ao modo fantasia <', bodyStyle: 'nature' },
            { text: '> Blue Star Utopia · Nó de retransmissão online', style: 'nature' },
            { text: '' },
            { text: '[Núcleo de Replicação de Quark Estranho·Modo 3]', style: 'golden' },
            { text: '' },
            { text: '[Autoridade de fabricação: autorização Modo 3] · Registro de proliferação', bodyStyle: 'silver' },
        ]);
    } else {
        text.add(`§8§o「奇异夸克团」—— 第三模式核心物质

§f§c一块能够无限增殖的奇异物质碎片。
接触普通物质时引发链式转化，驱动冯·诺曼复制机实现防御饱和。
§e「模式三」授权物质 —— 后星际文明以下皆为燃料。

§6§l—— [第三协议] · 复制指令`);
        text.add(`§8§o§l§n按住 SHIFT 查看完整档案§r`);
    }
});
})

registerShiftLinesStringArrays('dishanhai:big_tear', [
    'Arquivo de dados técnicos da Civilização Blue Star {water} {/}',
    'Número {body_silver}: ■■■ / Sequência de descriptografia: ■■■■ / Desbloqueado após verificação da teoria unificada do superuniverso{/}',
    'Aviso {crimson}: confirme as condições de desbloqueio novamente, caso contrário você encontrará um contra-ataque automático da parede de defesa ofensiva{/}',
    '{nature} ---- Desbloqueado com sucesso · O modo Fantasia foi imerso na constante cosmológica ----{/}',
    '{magic} ---- O perigo de impacto de fantasia está fechado · As permissões foram concedidas ----{/}',
    '',
    '{body_silver} As reservas de elementos pesados ​​de Ark são abundantes, e Ark protegeu com sucesso o Grande Rip no anti-universo. {/}',
    '{body_silver} Chegou a hora da grande reação. O universo está entrando em colapso em um ritmo mais rápido...{/}',
    '{body_silver} Um céu com materiais extremamente concentrados será gerado no centro do universo. {/}',
    '',
    '{body_silver} > Verificação da teoria unificada do superuniverso concluída <{/}',
    '{body_silver} > Todo o sistema está evoluindo em alta velocidade <{/}',
    '{body_silver} > Modo 5 está pronto <{/}',
    '{body_silver} > Modo fantasia ativado · Imerso na constante cosmológica <{/}',
    '{body_silver} > O Complexo Blue Star apareceu <{/}',
    '',
    '{golden} No final das contas, você está acima de todas as civilizações,{/}',
    '{golden} Crie o seu próprio...{/}',
    '',
    '{golden} 【Utopia da Estrela Azul】{/}',
    '',
    '{body_silver} [Comandante Supremo ■■Sem nome] · Registro final{/}'
], [
    '§8§o"Blue Star Utopia" —— Utopia após a grande reação',
    '§f§cO produto final da era utópica, o centro do colapso do universo, o reino dos céus onde todas as coisas são unificadas.',
    '§c"Quando você olha para ele, o que você vê não é o céu, mas o limite que a civilização pode alcançar."',
    '§6§l——[Complexo Blue Star·Protocolo]·Recorde de Dominação',
    '§8§o§l§nSegure SHIFT para ver o perfil completo §r'
]);

registerShiftLinesStringArrays('dishanhai:time_reversal_protocol', [
    'Arquivo de dados técnicos da Civilização Blue Star {ultimateRainbow} {/}',
    'Número {body_silver}: A■ | Nome do projeto: {/} {golden} [World Line Beacon]{/} {body_silver} | Primeira sequência{/}',
    'Sequência de descriptografia do projeto {body_silver}: ■■■■Primeira sequência. De acordo com o acordo, o seguinte conteúdo será desbloqueado após retrocesso temporal. {/}',
    '{body_nature} -- Desbloqueado com sucesso --{/} {water} -- Gerador de campo de fase desligado --{/} {fire} -- Risco cognitivo memético desligado --{/}',
    '{body_silver} O desastre do loop temporal foi descoberto no final. Depois de muitos testes, {/}',
    'Foi demonstrado que {body_silver} coloca objetos específicos em um loop de tempo. {/}',
    '{body_silver} O limite superior da massa e volume do especificador é desconhecido. {/}',
    '{crimson} tentou viajar de volta através de sistemas estelares inteiros. {/}',
    '{body_silver} Para evitar vazamento de informações, o sistema estelar numerado LH foi processado. {/}',
    '{body_silver} aparece como um estado de superfície unilateral estável no mundo material{/}',
    '{body_silver} (comumente conhecida como {/} {water} Möbius strip{/} {body_silver} ), a matéria em um raio de 24,125 metros entra em um loop temporal. {/}',
    '{body_silver} Após repetidas tentativas no Laboratório de Perturbação Espaço-Tempo, ele pode ser movido e controlado após ser envolto em matéria escura. {/}',
    '{body_silver} Após a conclusão dos preparativos para o Plano de Coesão e o Projeto Arca, o farol foi transferido para o interior da Arca,{/}',
    '{body_silver} Designa a Arca como um objeto de loop temporal para evitar situações inesperadas na guerra espacial. {/}',
    '{golden} Blue Star Space-Time Management Bureau · Registro de equipe nº 001{/}'
], [
    '§8§o"World Line Beacon" - uma cunha esquecida pelo tempo',
    '§fVem de uma linha do tempo apagada e pode ser o último seguro deixado por uma certa civilização extinta.',
    '§c"Segure-o e você verá inúmeras mortes. Abaixe-o e você esquecerá todas as possibilidades."',
    '§6§l—— Blue Star Space-Time Management Bureau·Um recorde',
    '§8§o§l§nSegure SHIFT para ver detalhes §r'
]);

ItemEvents.tooltip(function(e) {
// 暗能量·零点能融合核心 - 模式三/四协议联动
e.addAdvanced('dishanhai:wzcz3', function(item, advanced, text) {
    if (e.shift) {
        addLore(text, [
            { text: 'Protocolo de Energia Ark · Além do Núcleo', style: 'water' },
            { text: 'Nº: EN-03-04 Departamento Geral de Energia da Ark' },
            { text: 'Sequência de descriptografia do projeto: ■■■■ Modo 3·4 Autorização de ligação' },
            { text: 'Composição principal:' },
            { text: '[Multiplicador de Energia Negra] (Componente Principal do Modo 3)' },
            { text: '→ Utilizando a energia escura para alcançar a duplicação exponencial da energia' },
            { text: '→ Melhore a produção de energia de todo o sistema do Ark o mais rápido possível' },
            { text: '→ Fortalecer de forma abrangente as armas, escudos e eficiência de replicação do Ark' },
            { text: '' },
            { text: '[Gerador de energia de ponto zero a vácuo] (modo quatro componentes principais)' },
            { text: '→ O sistema de energia definitivo chamado "Trigger"' },
            { text: '→ Usado para proteger sistemas cósmicos relativos ou desmaterializar arcas' },
            { text: '→ Ativado apenas quando o modo quatro é iniciado, pode ser usado com protocolos de hedge/escape' },
            { text: '' },
            { text: 'Modo três + modo quatro acordo conjunto:', style: 'crimson' },
            { text: 'Quando o multiplicador de energia escura está totalmente carregado, a pré-carga do gerador de energia de ponto zero a vácuo pode ser acionada.', style: 'golden' },
            { text: 'Neste momento, Ark entra no “estado transcendental crítico”:', style: 'golden' },
            { text: '→ A produção de energia excede os limites físicos', style: 'ultimateRainbow' },
            { text: '→ Você pode optar por realizar "Hedge" ou "Escape"' },
            { text: '→ Se falhar, a Arca será desmaterializada e aniquilada.' },
            { text: '' },
            { text: '> Modo 3 · O multiplicador de energia escura está totalmente carregado <', style: 'nature' },
            { text: '> Modo 4 · Modo de espera do gerador de energia de ponto zero a vácuo <', style: 'nature' },
            { text: '> A condição de disparo foi atendida <', style: 'nature' },
            { text: '> Comece a proteger a constante cosmológica <' },
            { text: '> Fluxo de energia escura e energia do ponto zero entrelaçadas <' },
            { text: '> Ark entra no modo de transcendência final <' },
            { text: '> Objetivo: Fugir ou remodelar o universo <' },
            { text: '> Estabilidade do núcleo energético: crítica <' },
            { text: '> Blue Star Utopia·Transferência do poder de decisão final' },
            { text: '' },
            { text: '[Energia Escura · Energia de Ponto Zero Além do Núcleo]', style: 'golden' },
            { text: '' },
            { text: '[Nível de autorização: Modo 3/4 comando mais alto] · Além do registro' },
        ]);
    } else {
        text.add(`§8§o「超越核心」—— 模式三·四联动中枢

§f§c一块暗能量与零点能交织的水晶。
模式三时，它作为暗能量倍增器，极速强化方舟能源；
模式四时，它成为真空零点能「扳机」，用于对冲宇宙或逃离终结。
§e“当倍增达到极限，扳机便会扣下。”

§6§l—— [方舟最终协议] · 超越指令`);
        text.add(`§8§o§l§n按住 SHIFT 查看完整联动档案§r`);
    }
})
})
ItemEvents.tooltip(function(e) {
e.addAdvanced('dishanhai:god_forge_mod', function(item, advanced, text) {
    if (e.shift) {
      addLore(text, [
            { text: 'A morte das estrelas é a fornalha mais magnífica do universo', style: 'fire' },
            { text: 'Quando a gravidade chega ao seu limite, a matéria e o espaço-tempo são destruídos e apenas a matéria sobrevive', style: 'water' },
            { text: 'A pressão de degeneração destruindo a estrela de nêutrons, refazendo os fragmentos do núcleo da estrela em materiais prontos para serem forjados', style: 'magic' },
            { text: 'Somente aqueles que controlam o fim podem forjar uma nova vida a partir das cinzas da morte.', style: 'ultimateRainbow' },
            { text: 'A estrela permanece imortal, o fim é o começo, a pedra angular da criação, a escolha suprema', style: 'ultimateRainbow' },
            { text: '——Refinando estrelas imortais a partir de núcleos de estrelas mortas', style: 'nature' },
        ]);
    } else {
        text.add('§5Segure shift para ver a introdução')
    }
});})

// === 真空零点能流体 + 桶 ===
ItemEvents.tooltip(function(e) {
e.addAdvanced(['dishanhai:zero_point_energy', 'dishanhai:zero_point_energy_bucket'], function(item, _, text) {
    if (e.shift) {
        addLore(text, [
            { text: 'Energia do ponto zero do vácuo · Silêncio do vazio', style: 'water' },
            { text: '' },
            { text: 'O vazio não é o vazio, é o silêncio que ainda não decidiu o que se tornar.', bodyStyle: 'silver' },
            { text: 'Cada centímetro cúbico de energia é suficiente para ferver um mar de estrelas – mas ele prefere permanecer adormecido, esperando por um olhar desperto.', bodyStyle: 'silver' },
            { text: 'Colhemos esta colherada de eternidade das ondulações do campo. O que está contido no recipiente não é matéria, mas o esquecimento temporário que o universo tem de si mesmo.', bodyStyle: 'silver' },
            { text: 'O fluxo é uma promessa, o contato é um empréstimo; ao usá-lo, o aspirador não perderá nada, apenas ficará mais sóbrio.', bodyStyle: 'silver' },
            { text: '' },
            { text: '——O deus no vácuo ainda não decidiu se existirá, mas sua existência mudará as regras físicas do universo.', style: 'magic' },
        ]);
    } else {
        text.add('§7§oSegure SHIFT para ver o silêncio do vácuo');
    }
});
})

// === 虚数物质跃迁重塑模块 - wzqs ===
ItemEvents.tooltip(function(e) {
e.addAdvanced('dishanhai:wzqs', function(item, advanced, text) {
    if (e.shift) {
        addLore(text, [
            { text: 'A reorganização acabou, a criação ainda está por vir – o número imaginário é o corredor de cinzas no meio.', style: 'magic' },
            { text: '' },
            { text: 'A matéria não se desmonta, nem nasce do nada, mas salta ao longo do eixo imaginário: a realidade do input é descascada em dimensões invisíveis e projetada em outra forma.', bodyStyle: 'silver' },
            { text: '' },
            { text: 'Isto não é alquimia, mas uma tradução da realidade e da virtualidade. O ferro pode ser transformado em cobre e o vazio pode ser transformado em poeira estelar.', bodyStyle: 'nature' },
            { text: '' },
            { text: 'Não pode criar algo do nada, mas pode remodelar tudo o que já existe – parece magia.', bodyStyle: 'silver' },
            { text: '' },
            { text: 'É o fim da reorganização e o prólogo da criação.', style: 'golden' },
        ]);
    } else {
        text.add('§7§oSegure SHIFT para ver o diálogo entre números imaginários e entidades');
    }
});
})

JEIEvents.hideItems(function(e) {
    var tags = [
        'forge:ingots',
        'forge:storage_blocks',
        'forge:dusts',
        'forge:rods',
        'forge:plates',
        'forge:gears',
        'forge:nuggets',
        'forge:raw_materials',
        'alltheores:ore_hammers',
        'forge:ores'
    ]

    var regex = /^(alltheores|mekanism|allthemod):/

    var idsToHide = new Set()

    tags.forEach(function(tag) {
        Ingredient.of('#' + tag).getItemIds().forEach(function(id) {
            if (regex.test(id)) {
                idsToHide.add(id)
            }
        })
    })

    idsToHide.forEach(function(id) { e.hide(id); })
})

//单独删除 模组额外物品 无统一标签 不删了 头疼
JEIEvents.hideItems(function(e) {
    e.hide(['alltheores:lead_clump','alltheores:aluminum_clump','alltheores:copper_clump','alltheores:nickel_clump','alltheores:osmium_clump','alltheores:platinum_clump','alltheores:silver_clump','alltheores:tin_clump','alltheores:uranium_clump','alltheores:zinc_clump','alltheores:iridium_clump'])
})

// ========== 超级磁盘阵列 JEI 注册 ==========
JEIEvents.addItems(function(event) {
    try {
        event.add(Item.of('gt_shanhai:super_disk_array', '{internalCurrentPower:20000.0d}'));
        event.add(Item.of('gt_shanhai:super_disk_array', '{internalCurrentPower:0.0d}'));
    } catch(e) { console.error('[Shanhai JEI] Falha no registro da matriz de super disco:' + e); }

    try {
        var dl = Ingredient.of('#forge:dyes').getItemIds();
        if (dl && dl.length > 0) {
            var seenDyes = {};
            var uniqueDyes = [];
            for (var udi = 0; udi < dl.length; udi++) {
                var dyeId = String(dl[udi]);
                if (seenDyes[dyeId]) continue;
                seenDyes[dyeId] = true;
                uniqueDyes.push(dyeId);
            }
            var di = [];
            for (var dgi = 0; dgi < uniqueDyes.length; dgi++) {
                di.push('1x expatternprovider:infinity_cell@' + uniqueDyes[dgi]);
            }
            event.add(Item.of('gt_shanhai:super_disk_array', DShanhaiNBTAPI.buildSDAFromList(di, 'pacote de componente de corante ilimitado pro', ['§7Pacote de componentes ilimitado contendo todos os itens de tintura','Tipo de corante §7: §e' + uniqueDyes.length + 'Espécies §7','§7Cada corante é armazenado em um pacote de elementos ilimitado','§8Bens privados Shanhai v2.2'], [])));
        }
    } catch(e) { console.error('[山海JEI] Falha no pacote de corante:' + e); }
    console.log('[Shanhai JEI] Variante básica de matriz de super disco registrada e pacote de corante; pacote de presente fornecido pelo plug-in Java JEI');
});

// 启用NBT识别，确保256k便携物品元件根据NBT独立显示
JEIEvents.subtypes(function(event) {
    event.useNBT('ae2:portable_item_cell_256k');
    event.useNBT('gt_shanhai:super_disk_array');
})

// ========== 256k物品包内容预览功能 ==========

/**
 * 解析256k物品包的NBT内容，返回物品列表
 * @param {ItemStack} item - 256k物品包物品
 * @returns {Array} 物品列表，格式为 ["1x minecraft:diamond", ...]
 */
function parseCellContent(item) {
    if (!item || !item.nbt) {
        return [];
    }
    
    var nbt = item.nbt;
    var result = [];
    
    // 尝试从NBT中提取keys和amts
    if (nbt.keys && nbt.amts && Array.isArray(nbt.keys) && Array.isArray(nbt.amts)) {
        var minLength = Math.min(nbt.keys.length, nbt.amts.length);
        for (var i = 0; i < minLength; i++) {
            var key = nbt.keys[i];
            var amt = nbt.amts[i];
            
            if (key && key.id) {
                var count = amt || 1;
                var itemName = key.id;
                
                // 尝试获取物品显示名称
                try {
                    var itemStack = Item.of(key.id);
                    if (itemStack && itemStack.getName) {
                        var name = itemStack.getName().getString();
                        if (name && name !== key.id) {
                            itemName = name;
                        }
                    }
                } catch (e) {
                    // 忽略名称获取错误，使用ID
                }
                
                result.push(count + "x " + itemName);
            }
        }
    }
    
    return result;
}

/**
 * 格式化物品列表为工具提示文本
 * @param {Array} items - 物品列表
 * @param {number} maxDisplay - 最大显示数量
 * @returns {Array} 格式化后的文本行数组
 */
function formatItemListForTooltip(items, maxDisplay) {
    if (maxDisplay === undefined) maxDisplay = 5;
    if (!items || items.length === 0) {
        return ['A sacola de itens §7está vazia'];
    }
    
    var tooltipResult = [];
    
    if (items.length <= maxDisplay) {
        // 全部显示
        tooltipResult.push('§7contém itens:');
        items.forEach(function(item) {
            tooltipResult.push(" §8• §7" + item);
        });
    } else {
        // 显示前maxDisplay项，然后显示剩余数量
        tooltipResult.push('§7contém itens (anteriormente' + maxDisplay + 'item):');
        for (var i = 0; i < maxDisplay; i++) {
            tooltipResult.push(" §8• §7" + items[i]);
        }
        tooltipResult.push("§7...e" + (items.length - maxDisplay) + "item");
    }
    
    // 添加总计
    var totalCount = items.reduce(function(sum, item) {
        var match = item.match(/^(\d+)x/);
        return sum + (match ? parseInt(match[1]) : 1);
    }, 0);
    tooltipResult.push("Total §7: §e" + totalCount + "Itens §7, §e" + items.length + "Tipos §7");
    
    return tooltipResult;
}

// ========== 256k物品包工具提示处理器 ==========

ItemEvents.tooltip(function(event) {
    event.addAdvanced(['ae2:portable_item_cell_256k'], function(item, advanced, text) {
        // 跳过已注册的特殊物品包（如无限染料元件包pro、超级AE包）
        // 这些已经有自己的工具提示
        var itemNbtData = item.nbt;
        if (itemNbtData && itemNbtData.display && itemNbtData.display.Name) {
            var displayNameJson = itemNbtData.display.Name;
            if (typeof displayNameJson === 'string') {
                if (displayNameJson.includes('pacote de componente de corante ilimitado pro') || 
                    displayNameJson.includes('Pacote Super AE') ||
                    displayNameJson.includes('Pacote de presente Tianji')) {
                    return;
                }
            }
        }
        
        // 解析物品包内容
        var cellItems = parseCellContent(item);
        
        if (cellItems.length === 0) {
            // 空物品包或无效物品包
            text.add('§8Pacote vazio de 256 mil itens');
            text.add('§7é sintetizado pela máquina de montagem e pode armazenar uma variedade de itens');
            return;
        }
        
        // 根据Shift键状态决定显示详细程度
        if (event.shift) {
            // 按住Shift显示完整列表
            text.add('§6=== Conteúdo do pacote de 256 mil itens ===');
            var formattedItemList = formatItemListForTooltip(cellItems, 20); // Shift时显示更多
            formattedItemList.forEach(function(line) { text.add(line); });
            text.add('§7§oSolte Shift para exibir uma visualização simples');
        } else {
            // 默认显示简洁视图
            text.add('Pacote de itens §6256k');
            var formattedItemList = formatItemListForTooltip(cellItems, 5); // 默认显示5项
            formattedItemList.forEach(function(line) { text.add(line); });
            text.add('§7§oManter §eShift §7§oVer lista completa');
        }
        
        // 添加通用说明
        text.add('Método de síntese §8: máquina de montagem');
        text.add('Capacidade §8: 256k (262.144 tipos de itens)');
    });
});

// ========== 256k物品包JEI集成API（客户端环境） ==========

// 只有在客户端环境且global对象可用时注册API
if (typeof global !== 'undefined') {
    // 如果CellAPI不存在，创建基本结构
    if (!global.CellAPI) {
        global.CellAPI = {};
    }
    
    // 添加JEI相关API
    global.CellAPI.registerJEIPreview = function(cellItemId, maxDisplay) {
        // 设置参数默认值（Rhino引擎不支持ES6默认参数语法）
        if (cellItemId === undefined) cellItemId = 'ae2:portable_item_cell_256k';
        if (maxDisplay === undefined) maxDisplay = 5;
        
        console.log('[256k Cell API - JEI] Visualização do pacote de itens de registro:' + cellItemId + ', exibição máxima:' + maxDisplay);
        
        // 这里实际上已经通过上面的ItemEvents.tooltip全局处理了
        // 这个API主要用于记录配置
        if (!global._cellAPI_JEI_Config) {
            global._cellAPI_JEI_Config = {};
        }
        global._cellAPI_JEI_Config[cellItemId] = { maxDisplay: maxDisplay };
    };
    
    global.CellAPI.addCellDescription = function(cellItem, extraInfo) {
        if (!cellItem) return;
        
        var itemId = typeof cellItem === 'string' ? cellItem : cellItem.getId();
        console.log('[256k Cell API - JEI] Adicionar descrição do item:' + itemId);
        
        // 在实际环境中，我们需要在这里添加JEI描述
        // 但由于KubeJS的JEIEvents.addDescription需要在事件处理器中调用
        // 我们将信息存储起来，在合适的时机使用
        if (!global._cellAPI_JEI_Descriptions) {
            global._cellAPI_JEI_Descriptions = {};
        }
        
        var descriptions = Array.isArray(extraInfo) ? extraInfo : [extraInfo];
        global._cellAPI_JEI_Descriptions[itemId] = descriptions;
        
        // 调试日志：记录描述内容（截断以避免日志过长）
        if (descriptions.length > 0 && typeof descriptions[0] === 'string') {
            var preview = descriptions[0].substring(0, Math.min(50, descriptions[0].length));
            console.log('[Depuração CellAPI] Visualização do conteúdo da descrição: "' + preview + '" (comprimento:' + descriptions[0].length + ')');
        }
        console.log('[Depuração CellAPI] As descrições foram armazenadas em _cellAPI_JEI_Descriptions[' + itemId + '], número de linhas:' + descriptions.length);
    };
    
    // 自动注册默认预览
    global.CellAPI.registerJEIPreview('ae2:portable_item_cell_256k', 8);
    
    // 注册CellAPI描述到物品工具提示（由于JEIEvents.addDescription不可用）
    // 必须立即注册ItemEvents.tooltip，因为KubeJS要求事件处理器在脚本加载期间注册
    if (typeof ItemEvents !== 'undefined' && typeof ItemEvents.tooltip === 'function') {
        ItemEvents.tooltip(function(event) {
            // 检查是否有存储的CellAPI描述
            // 注意：即使global._cellAPI_JEI_Descriptions可能尚未初始化，但事件触发时应该已经存在
            if (global._cellAPI_JEI_Descriptions) {
                for (var itemId in global._cellAPI_JEI_Descriptions) {
                    if (global._cellAPI_JEI_Descriptions.hasOwnProperty(itemId)) {
                        // 使用闭包捕获当前itemId
                        (function(currentItemId) {
                            event.addAdvanced(currentItemId, function(item, advanced, text) {
                                var descriptions = global._cellAPI_JEI_Descriptions[currentItemId];
                                if (descriptions && descriptions.length > 0) {
                                    for (var i = 0; i < descriptions.length; i++) {
                                        var line = descriptions[i];
                                        // 支持 { inlineText: '...' } 格式
                                        if (line && line.inlineText && typeof ShanhaiText !== 'undefined' && ShanhaiText.inline) {
                                            var component = ShanhaiText.inline(line.inlineText);
                                            if (component) { text.add(component); continue; }
                                        }
                                        // 支持 { component: ... } 格式
                                        if (line && line.component) { text.add(line.component); continue; }
                                        // 支持普通字符串
                                        text.add(line);
                                    }
                                }
                            });
                        })(itemId);
                    }
                }
                console.log('[CellAPI-JEI] processado' + Object.keys(global._cellAPI_JEI_Descriptions).length + 'descrição do item');
            } else {
                // global._cellAPI_JEI_Descriptions尚未初始化，这应该发生在脚本初始化顺序错误时
                console.log('[CellAPI-JEI] Dica: global._cellAPI_JEI_Descriptions ainda não foi inicializado, talvez a descrição seja adicionada posteriormente');
            }
        });
        console.log('[CellAPI-JEI] Manipulador de dicas registrado (imediatamente)');
    } else {
        console.warn('[CellAPI-JEI] Aviso: ItemEvents.tooltip não está disponível, a descrição do CellAPI não pode ser exibida');
    }
    
    console.log('[256k Cell API - JEI] Função de integração JEI carregada');
}

// ========== ShanhaiText 检测 ==========
try {
    if (typeof ShanhaiText !== 'undefined') {
        var testComp = ShanhaiText.ultimateRainbow('montanhas e mar');
        console.log('[Texto Dinâmico de Montanha e Mar] ShanhaiText está disponível! tipo de retorno do ultimateRainbow:' + (typeof testComp));
    } else {
        console.warn('[Shanhai Dynamic Text] ShanhaiText é indefinido! Verifique o registro do GTDishanhaiKubeJSPlugin');
    }
} catch(e) {
    console.error('[Texto dinâmico de Shanhai] Exceção ShanhaiText:' + e);
}

// ========== 动态文本API集成（客户端环境） ==========

// 只有在客户端环境且global对象可用时注册动态文本API
if (typeof global !== 'undefined') {
    // 如果山海颜色API不存在，创建基本结构
    if (!global.shanhaiColorAPI) {
        global.shanhaiColorAPI = {};
    }
    
    /**
     * 获取TextUtil渐变文本（客户端版本）
     * 在客户端环境中使用LDLib的TextUtil类生成预定义的渐变样式文本。
     * 如果TextUtil不可用，则使用基本颜色模拟效果。
     * 
     * @function getTextUtilGradient
     * @memberof shanhaiColorAPI
     * @param {string} text - 要处理的文本
     * @param {string} style - 渐变样式名称
     * @returns {string} 渐变文本
     * @example
     * // 使用TextUtil.full_color样式
     * let gradient = global.shanhaiColorAPI.getTextUtilGradient("Gerado por CellAPI, display gerado por JEIcellAPI", "ultimateRainbow");
     * console.log(gradient); // 输出: 彩色渐变文本
     */
    global.shanhaiColorAPI.getTextUtilGradient = function(text, style) {
        // 防御性编程：确保输入有效
        if (typeof text !== 'string') {
            console.error('[Shan Hai Private Product-Client] getTextUtilGradient: O texto deve ser uma string, use o texto padrão');
            text = 'Texto inválido';
        }
        
        if (typeof style !== 'string') {
            console.error('[Cliente de bens privados de Shanhai] getTextUtilGradient: O estilo deve ser uma string, use o estilo padrão');
            style = 'ultimateRainbow';
        }

        console.log('Estilo de chamada [山海RGB]=' + style + ' text="' + text.substring(0, Math.min(25, text.length)) + '..."');

        // 1. RGB 色板优先渲染（支持逐帧动态 Component，覆盖所有自定义样式）
        try {
            if (typeof Component !== 'undefined' && typeof Component.literal === 'function') {
                if (!global.shanhaiColorAPI._rgbPalettes) {
                    console.log('[Shanhai RGB] _rgbPalettes não existe, inicializado (incluindo paleta de cores do corpo)');
                    global.shanhaiColorAPI._rgbPalettes = {
                        custom:   [0xFF3333,0xFF4A22,0xFF6011,0xFF7700,0xFF8E00,0xFFA400,0xFFBB00,0xFFCC17,0xFFDD2D,0xFFEE44,0xE3F444,0xC6F944,0xAAFF44,0x88FF44,0x66FF44,0x44FF44,0x44FF66,0x44FF88,0x44FFAA,0x44F4C6,0x44E8E3,0x44DDFF,0x44C1FF,0x44A4FF,0x4488FF,0x5571FF,0x665BFF,0x7744FF,0x8E44FF,0xA444FF,0xBB44FF,0xD244FF,0xE844FF,0xFF44FF,0xFF4FE8,0xFF5BD2,0xFF66BB,0xFF71AA,0xFF7D99,0xFF8888],
                        rainbow:  [0xFF3333,0xFF4F22,0xFF6C11,0xFF8800,0xFF9F00,0xFFB500,0xFFCC00,0xBBD211,0x77D722,0x33DD33,0x33DD6C,0x33DDA4,0x33DDDD,0x33B5E8,0x338EF4,0x3366FF,0x6655F4,0x9944E8,0xCC33DD],
                        golden:   [0x995500,0xAA6600,0xBB7700,0xCC8800,0xDD9300,0xEE9F00,0xFFAA00,0xFFBB17,0xFFCC2D,0xFFDD44,0xFFE85B,0xFFF471,0xFFFF88,0xFFFF9F,0xFFFFB5,0xFFFFCC,0xFFFFB5,0xFFFF9F,0xFFFF88,0xFFF471,0xFFE85B,0xFFDD44,0xFFCC2D,0xFFBB17,0xFFAA00,0xEE9F00,0xDD9300,0xCC8800,0xBB7700,0xAA6600,0x995500],
                        fire:     [0x992200,0xA42800,0xB02D00,0xBB3300,0xC63900,0xD23E00,0xDD4400,0xE84F00,0xF45B00,0xFF6600,0xFF7D00,0xFF9300,0xFFAA00,0xFFC11C,0xFFD739,0xFFEE55,0xFFF48E,0xFFF9C6,0xFFFFFF,0xFFF9C6,0xFFF48E,0xFFEE55,0xFFD739,0xFFC11C,0xFFAA00,0xFF9300,0xFF7D00,0xFF6600,0xF45B00,0xE84F00,0xDD4400,0xD23E00,0xC63900,0xBB3300,0xB02D00,0xA42800,0x992200],
                        water:    [0x004488,0x004F93,0x005B9F,0x0066AA,0x1177BB,0x2288CC,0x3399DD,0x44AAE8,0x55BBF4,0x66CCFF,0x7DD7FF,0x93E3FF,0xAAEEFF,0xC6F4FF,0xE3F9FF,0xFFFFFF,0xE3F9FF,0xC6F4FF,0xAAEEFF,0x93E3FF,0x7DD7FF,0x66CCFF,0x55BBF4,0x44AAE8,0x3399DD,0x2288CC,0x1177BB,0x0066AA,0x005B9F,0x004F93,0x004488],
                        magic:    [0x550088,0x600099,0x6C00AA,0x7700BB,0x8217C6,0x8E2DD2,0x9944DD,0xA44FE3,0xB05BE8,0xBB66EE,0xC671F4,0xD27DF9,0xDD88FF,0xE888FF,0xF488FF,0xFF88FF,0xF488FF,0xE888FF,0xDD88FF,0xD27DF9,0xC671F4,0xBB66EE,0xB05BE8,0xA44FE3,0x9944DD,0x8E2DD2,0x8217C6,0x7700BB,0x6C00AA,0x600099,0x550088],
                        nature:   [0x006633,0x0B7739,0x17883E,0x229944,0x2DAA44,0x39BB44,0x44CC44,0x5BD244,0x71D744,0x88DD44,0xA4E84A,0xC1F44F,0xDDFF55,0xC1F44F,0xA4E84A,0x88DD44,0x71D744,0x5BD244,0x44CC44,0x39BB44,0x2DAA44,0x229944,0x17883E,0x0B7739,0x006633],
                        electric: [0xFFDD00,0xC1DD55,0x82DDAA,0x44DDFF,0x82E8FF,0xC1F4FF,0xFFFFFF,0xC1F4FF,0x82E8FF,0x44DDFF,0x82DDAA,0xC1DD55,0xFFDD00],
                        ice:      [0x003366,0x0B4488,0x1755AA,0x2266CC,0x2D77D7,0x3988E3,0x4499EE,0x5BAAF4,0x71BBF9,0x88CCFF,0xB0DDFF,0xD7EEFF,0xFFFFFF,0xD7EEFF,0xB0DDFF,0x88CCFF,0x71BBF9,0x5BAAF4,0x4499EE,0x3988E3,0x2D77D7,0x2266CC,0x1755AA,0x0B4488,0x003366],
                        lava:     [0x771100,0x881700,0x991C00,0xAA2200,0xBB2D00,0xCC3900,0xDD4400,0xE84F00,0xF45B00,0xFF6600,0xFF7D00,0xFF9300,0xFFAA00,0xFFBB17,0xFFCC2D,0xFFDD44,0xFFE882,0xFFF4C1,0xFFFFFF,0xFFEEBB,0xFFDD77,0xFFCC33,0xFFB522,0xFF9F11,0xFF8800,0xF47100,0xE85B00,0xDD4400,0xC13300,0xA42200,0x881100],
                        sunset:   [0xCC4400,0xE05511,0xF06622,0xFF7733,0xFF8844,0xFF7766,0xFF6688,0xFF55AA,0xFF44BB,0xDD55CC,0xBB55DD,0x9955EE,0x7744FF,0x9955EE,0xBB55DD,0xDD55CC,0xFF44BB,0xFF55AA,0xFF6688,0xFF7766,0xFF8844,0xFF7733,0xF06622,0xE05511,0xCC4400],
                        aurora:   [0x33FF44,0x33EE55,0x33DD66,0x33CC77,0x33BB88,0x33AA99,0x3399BB,0x3388CC,0x4477DD,0x5566EE,0x7755FF,0x9944FF,0xBB33FF,0x9944FF,0x7755FF,0x5566EE,0x4477DD,0x3388CC,0x3399BB,0x33AA99,0x33BB88,0x33CC77,0x33DD66,0x33EE55,0x33FF44],
                        crimson:  [0x991111,0xAA1111,0xBB1111,0xCC1111,0xDD2222,0xEE3333,0xFF4444,0xFF5555,0xFF6666,0xFF5555,0xFF4444,0xEE3333,0xDD2222,0xCC1111,0xBB1111,0xAA1111,0x991111],
                        neon:     [0xFF33FF,0xFF55CC,0xFF7799,0xFFAA66,0xFFCC44,0xAAFF33,0x77FF44,0x44FF77,0x33FFBB,0x33FFEE,0xFFFFFF,0x33FFEE,0x33FFBB,0x44FF77,0x77FF44,0xAAFF33,0xFFCC44,0xFFAA66,0xFF7799,0xFF55CC,0xFF33FF],
                        sakura:   [0xFF99BB,0xFFA3C4,0xFFADCC,0xFFB7D4,0xFFC1DD,0xFFCBE5,0xFFD5ED,0xFFDFF0,0xFFEFF8,0xFFFFFF,0xFFEFF8,0xFFDFF0,0xFFD5ED,0xFFCBE5,0xFFC1DD,0xFFB7D4,0xFFADCC,0xFFA3C4,0xFF99BB],

                        // ===== 正文柔和色板（去饱和，适合大段正文显示） =====
                        body_golden:  [0x887744,0x998855,0xAA9966,0xBBAA77,0xCCBB88,0xDDCC99,0xCCBB88,0xBBAA77,0xAA9966,0x998855,0x887744],
                        body_fire:    [0x885522,0x996633,0xAA7744,0xBB8855,0xCC9966,0xBB8855,0xAA7744,0x996633,0x885522],
                        body_water:   [0x446688,0x557799,0x6688AA,0x7799BB,0x88AACC,0x7799BB,0x6688AA,0x557799,0x446688],
                        body_magic:   [0x775588,0x886699,0x9977AA,0xAA88BB,0xBB99CC,0xAA88BB,0x9977AA,0x886699,0x775588],
                        body_nature:  [0x557755,0x668866,0x779977,0x88AA88,0x99BB99,0x88AA88,0x779977,0x668866,0x557755],
                        body_crimson: [0x883333,0x994444,0xAA5555,0xBB6666,0xCC7777,0xBB6666,0xAA5555,0x994444,0x883333],
                        body_silver:  [0xFFFFFF,0xEEEEEE,0xCCCCCC,0xAAAAAA,0x888888,0x777777,0x888888,0xAAAAAA,0xCCCCCC,0xEEEEEE,0xFFFFFF],
                    };
                }
                console.log('[山海RGB] _rgbPalettes já existe, body_silver=' + (typeof global.shanhaiColorAPI._rgbPalettes.body_silver) + 'estilo de consulta do pool = "' + style + '"=' + (typeof global.shanhaiColorAPI._rgbPalettes[style]));
                // global 持久化导致 reload 后 _rgbPalettes 已存在，body 色板单独补充
                if (global.shanhaiColorAPI._rgbPalettes && !global.shanhaiColorAPI._rgbPalettes.body_silver) {
                    global.shanhaiColorAPI._rgbPalettes.body_golden  = [0x887744,0x998855,0xAA9966,0xBBAA77,0xCCBB88,0xDDCC99,0xCCBB88,0xBBAA77,0xAA9966,0x998855,0x887744];
                    global.shanhaiColorAPI._rgbPalettes.body_fire    = [0x885522,0x996633,0xAA7744,0xBB8855,0xCC9966,0xBB8855,0xAA7744,0x996633,0x885522];
                    global.shanhaiColorAPI._rgbPalettes.body_water   = [0x446688,0x557799,0x6688AA,0x7799BB,0x88AACC,0x7799BB,0x6688AA,0x557799,0x446688];
                    global.shanhaiColorAPI._rgbPalettes.body_magic   = [0x775588,0x886699,0x9977AA,0xAA88BB,0xBB99CC,0xAA88BB,0x9977AA,0x886699,0x775588];
                    global.shanhaiColorAPI._rgbPalettes.body_nature  = [0x557755,0x668866,0x779977,0x88AA88,0x99BB99,0x88AA88,0x779977,0x668866,0x557755];
                    global.shanhaiColorAPI._rgbPalettes.body_crimson = [0x883333,0x994444,0xAA5555,0xBB6666,0xCC7777,0xBB6666,0xAA5555,0x994444,0x883333];
                    global.shanhaiColorAPI._rgbPalettes.body_silver  = [0xFFFFFF,0xEEEEEE,0xCCCCCC,0xAAAAAA,0x888888,0x777777,0x888888,0xAAAAAA,0xCCCCCC,0xEEEEEE,0xFFFFFF];
                }
                // ultimateRainbow/ultimate 映射到 custom 色板（14色全色域）
                var _ps = style;
                if (_ps === 'ultimateRainbow' || _ps === 'ultimate') _ps = 'custom';
                var pool = global.shanhaiColorAPI._rgbPalettes[_ps];
                // 最终兜底：从本地变量硬编码 body 色板，绕开所有 global 持久化问题
                if (!pool && style.indexOf('body_') === 0) {
                    var _bf = {
                        body_golden:  [0x887744,0x998855,0xAA9966,0xBBAA77,0xCCBB88,0xDDCC99,0xCCBB88,0xBBAA77,0xAA9966,0x998855,0x887744],
                        body_fire:    [0x885522,0x996633,0xAA7744,0xBB8855,0xCC9966,0xBB8855,0xAA7744,0x996633,0x885522],
                        body_water:   [0x446688,0x557799,0x6688AA,0x7799BB,0x88AACC,0x7799BB,0x6688AA,0x557799,0x446688],
                        body_magic:   [0x775588,0x886699,0x9977AA,0xAA88BB,0xBB99CC,0xAA88BB,0x9977AA,0x886699,0x775588],
                        body_nature:  [0x557755,0x668866,0x779977,0x88AA88,0x99BB99,0x88AA88,0x779977,0x668866,0x557755],
                        body_crimson: [0x883333,0x994444,0xAA5555,0xBB6666,0xCC7777,0xBB6666,0xAA5555,0x994444,0x883333],
                        body_silver:  [0xFFFFFF,0xEEEEEE,0xCCCCCC,0xAAAAAA,0x888888,0x777777,0x888888,0xAAAAAA,0xCCCCCC,0xEEEEEE,0xFFFFFF],
                    };
                    pool = _bf[style];
                    if (pool && global.shanhaiColorAPI._rgbPalettes) global.shanhaiColorAPI._rgbPalettes[style] = pool;
                }
                console.log('[山海RGB] pool=' + (typeof pool) + (pool ? ' len=' + pool.length : ''));
                if (pool) {
                    // Style.builder().withColor(TextColor).build() — Builder.withColor 无 ChatFormatting 重载
                    var _st = Java.loadClass('net.minecraft.network.chat.Style');
                    var _tc = Java.loadClass('net.minecraft.network.chat.TextColor');
                    var _speed = style.indexOf('body_') === 0 ? 200 : 80;
                    var _rawPhase = Date.now() / _speed;
                    var _intPhase = Math.floor(_rawPhase);
                    var _frac = _rawPhase - _intPhase;
                    var _result = null;
                    for (var _i = 0; _i < text.length; _i++) {
                        var _idx1 = (_intPhase + _i) % pool.length;
                        if (_idx1 < 0) _idx1 += pool.length;
                        var _idx2 = (_idx1 + 1) % pool.length;
                        var _c1 = pool[_idx1], _c2 = pool[_idx2];
                        var _r = Math.round(((_c1 >> 16) & 0xFF) * (1 - _frac) + ((_c2 >> 16) & 0xFF) * _frac);
                        var _g = Math.round(((_c1 >> 8) & 0xFF) * (1 - _frac) + ((_c2 >> 8) & 0xFF) * _frac);
                        var _b = Math.round((_c1 & 0xFF) * (1 - _frac) + (_c2 & 0xFF) * _frac);
                        var _style = _st.builder().withColor(_tc.fromRgb((_r << 16) | (_g << 8) | _b)).build();
                        var _part = Component.literal(text.charAt(_i)).withStyle(_style);
                        if (_result === null) _result = _part;
                        else _result.append(_part);
                    }
                    if (_result !== null) return _result;
                }
            }
        } catch (e) { console.warn('Falha na renderização RGB do lado do cliente:' + (e.message || e)); }

        // body_ 样式禁止进入 TextUtil 兜底（未知样式会落到 ultimateRainbow = LDB 彩虹）
        if (style.indexOf('body_') === 0) { return null; }
        console.log('[山海RGB] Paleta de cores RGB miss style="' + style + '", entre em TextUtil');
        // 3. TextUtil 兜底（仅当 RGB 色板无该样式时）
        if (typeof TextUtil !== 'undefined') {
            // 根据原始实现：Component.literal(TextUtil.full_color(text))
            // 检查Component是否可用
            if (typeof Component !== 'undefined' && typeof Component.literal === 'function') {
                // 使用Component.literal包装TextUtil结果 - 这是保持动态效果的关键
                if (style === 'dark_purplish_red' && typeof TextUtil.dark_purplish_red === 'function') return Component.literal(TextUtil.dark_purplish_red(text));
                else if (style === 'white_blue' && typeof TextUtil.white_blue === 'function') return Component.literal(TextUtil.white_blue(text));
                else if (style === 'purplish_red' && typeof TextUtil.purplish_red === 'function') return Component.literal(TextUtil.purplish_red(text));
                else if (style === 'golden' && typeof TextUtil.golden === 'function') return Component.literal(TextUtil.golden(text));
                else if (style === 'dark_green' && typeof TextUtil.dark_green === 'function') return Component.literal(TextUtil.dark_green(text));
                
                // TextUtil扩展样式（如果可用）
                else if (style === 'rainbow' && typeof TextUtil.rainbow === 'function') return Component.literal(TextUtil.rainbow(text));
                else if (style === 'fire' && typeof TextUtil.fire === 'function') return Component.literal(TextUtil.fire(text));
                else if (style === 'water' && typeof TextUtil.water === 'function') return Component.literal(TextUtil.water(text));
                else if (style === 'nature' && typeof TextUtil.nature === 'function') return Component.literal(TextUtil.nature(text));
                else if (style === 'ice' && typeof TextUtil.ice === 'function') return Component.literal(TextUtil.ice(text));
                else if (style === 'lava' && typeof TextUtil.lava === 'function') return Component.literal(TextUtil.lava(text));
                else if (style === 'magic' && typeof TextUtil.magic === 'function') return Component.literal(TextUtil.magic(text));
                else if (style === 'electric' && typeof TextUtil.electric === 'function') return Component.literal(TextUtil.electric(text));
                
                // 如果样式不被识别，使用默认渐变
                else {
                    console.warn('[Cliente de bens privados Shanhai] getTextUtilGradient: estilo desconhecido "' + style + '", use o full_color padrão');
                    if (typeof TextUtil.full_color === 'function') {
                        return Component.literal(TextUtil.full_color(text));
                    } else {
                        // TextUtil.full_color不可用，继续执行备用方案
                        console.warn('[Shan Hai Private Product-Client] getTextUtilGradient: TextUtil.full_color não está disponível, use uma solução alternativa');
                    }
                }
            } else {
                // Component不可用，直接返回TextUtil的结果（可能是字符串、对象、函数等）
                // 让调用者决定如何处理
                console.warn('[Cliente de bens privados de Shanhai] getTextUtilGradient: O componente não está disponível, retorna diretamente o resultado TextUtil');
                if (style === 'dark_purplish_red' && typeof TextUtil.dark_purplish_red === 'function') return TextUtil.dark_purplish_red(text);
                else if (style === 'white_blue' && typeof TextUtil.white_blue === 'function') return TextUtil.white_blue(text);
                else if (style === 'purplish_red' && typeof TextUtil.purplish_red === 'function') return TextUtil.purplish_red(text);
                else if (style === 'golden' && typeof TextUtil.golden === 'function') return TextUtil.golden(text);
                else if (style === 'dark_green' && typeof TextUtil.dark_green === 'function') return TextUtil.dark_green(text);
                
                // TextUtil扩展样式（如果可用）
                else if (style === 'rainbow' && typeof TextUtil.rainbow === 'function') return TextUtil.rainbow(text);
                else if (style === 'fire' && typeof TextUtil.fire === 'function') return TextUtil.fire(text);
                else if (style === 'water' && typeof TextUtil.water === 'function') return TextUtil.water(text);
                else if (style === 'nature' && typeof TextUtil.nature === 'function') return TextUtil.nature(text);
                else if (style === 'ice' && typeof TextUtil.ice === 'function') return TextUtil.ice(text);
                else if (style === 'lava' && typeof TextUtil.lava === 'function') return TextUtil.lava(text);
                else if (style === 'magic' && typeof TextUtil.magic === 'function') return TextUtil.magic(text);
                else if (style === 'electric' && typeof TextUtil.electric === 'function') return TextUtil.electric(text);
                
                // 如果样式不被识别，使用默认渐变
                else {
                    console.warn('[Cliente de bens privados Shanhai] getTextUtilGradient: estilo desconhecido "' + style + '", use o full_color padrão');
                    if (typeof TextUtil.full_color === 'function') {
                        return TextUtil.full_color(text);
                    } else {
                        // 继续执行下面的备用方案
                    }
                }
            }
        }

        // 4. § 兜底（RGB 色板和 TextUtil 都不可用或不支持该样式）
        console.warn('[Cliente de bens privados de Shanhai] getTextUtilGradient: TextUtil não está disponível, use cores básicas para simular o efeito');
        
        var colors = [];
        switch (style) {
            case 'ultimateRainbow':
            case 'rainbow':
                colors = ['§c', '§6', '§e', '§a', '§b', '§9', '§d'];
                break;
            case 'dark_purplish_red':
                colors = ['§4', '§5', '§4'];
                break;
            case 'white_blue':
                colors = ['§f', '§b', '§f'];
                break;
            case 'purplish_red':
                colors = ['§d', '§5', '§d'];
                break;
            case 'golden':
                colors = ['§6', '§e', '§6'];
                break;
            case 'dark_green':
                colors = ['§2', '§a', '§2'];
                break;
            case 'fire':
                colors = ['§c', '§6', '§c'];
                break;
            case 'water':
                colors = ['§b', '§9', '§b'];
                break;
            case 'nature':
                colors = ['§a', '§2', '§a'];
                break;
            case 'ice':
                colors = ['§b', '§f', '§b'];
                break;
            case 'lava':
                colors = ['§c', '§6', '§e'];
                break;
            case 'magic':
                colors = ['§5', '§d', '§5'];
                break;
            case 'electric':
                colors = ['§e', '§b', '§e'];
                break;
            // 基础颜色样式
            case 'red':
                colors = ['§c'];
                break;
            case 'green':
                colors = ['§a'];
                break;
            case 'blue':
                colors = ['§9'];
                break;
            case 'yellow':
                colors = ['§e'];
                break;
            case 'purple':
                colors = ['§5'];
                break;
            case 'cyan':
                colors = ['§b'];
                break;
            case 'orange':
                colors = ['§6'];
                break;
            case 'pink':
                colors = ['§d'];
                break;
            case 'white':
                colors = ['§f'];
                break;
            case 'gray':
                colors = ['§7'];
                break;
            default:
                colors = ['§a', '§b', '§c', '§d', '§e', '§f'];
        }
        
        // 生成渐变效果
        var result = "";
        var length = text.length;
        for (var i = 0; i < length; i++) {
            var colorIndex = i % colors.length;
            result += colors[colorIndex] + text[i];
        }
        
        return result + "§r";
    };

    /**
     * 获取正文柔和渐变文本（慢速动画 + 去饱和色板）
     * 适合大段正文显示的动态颜色，不刺眼
     *
     * @function getBodyGradient
     * @memberof shanhaiColorAPI
     * @param {string} text - 要着色的文本
     * @param {string} style - 样式名（golden/water/fire/magic/nature/crimson/silver）
     * @returns {Component|null} 渐变 Component 或 null
     * @example
     * global.shanhaiColorAPI.getBodyGradient("uma descrição de texto", "golden");
     */
    global.shanhaiColorAPI.getBodyGradient = function(text, style) {
        if (typeof text !== 'string') { console.error('[山海] getBodyGradient: texto inválido'); return null; }
        if (typeof style !== 'string') style = 'silver';
        return this.getTextUtilGradient(text, 'body_' + style);
    };

    /**
     * 获取预生成的动态Lore文本
     * 从全局变量中获取在启动阶段预生成的动态文本
     * 
     * @function getDynamicLoreText
     * @memberof shanhaiColorAPI
     * @returns {string} 预生成的动态文本或默认文本
     */
    global.shanhaiColorAPI.getDynamicLoreText = function() {
        // 尝试获取预生成的动态文本
        if (typeof global.shanhaiDynamicLoreText !== 'undefined') {
            return global.shanhaiDynamicLoreText;
        }
        
        // 如果预生成的文本不存在，使用基本颜色模拟
        console.warn('[Cliente de bens privados de Shanhai] getDynamicLoreText: O texto dinâmico pré-gerado não existe, use uma solução alternativa');
        return this.getTextUtilGradient("Gerado por CellAPI, display gerado por JEIcellAPI", "ultimateRainbow");
    };
    
    /**
     * 获取会话随机单色文本（客户端版本）
     * 每次客户端重新加载后，为每个字符随机挑选不同的鲜艳颜色
     * 
     * @function getSessionRandomSingleColorText
     * @memberof shanhaiColorAPI
     * @param {string} text - 要着色的文本
     * @returns {string} 彩色文本字符串
     */
    global.shanhaiColorAPI.getSessionRandomSingleColorText = function(text) {
        // 防御性编程
        if (typeof text !== 'string' || text.length === 0) {
            console.error('[Cliente de bens privados Shanhai] getSessionRandomSingleColorText: texto inválido');
            return "O texto §7é inválido";
        }
        
        // 鲜艳颜色池（排除深色和灰色）
        var brightColors = [
            '§c', // 红色
            '§6', // 橙色
            '§e', // 黄色
            '§a', // 绿色
            '§b', // 青色
            '§9', // 蓝色
            '§d', // 粉色
            '§5', // 紫色
            '§3', // 深青色
            '§2', // 深绿色
            '§4', // 深红色
            '§1'  // 深蓝色
        ];
        
        // 使用当前时间戳作为随机种子，确保每次客户端重新加载时颜色相同
        // 但同一会话内不同字符使用不同颜色
        var timestamp = Date.now();
        var result = "";
        
        for (var i = 0; i < text.length; i++) {
            // 基于时间戳和字符位置生成确定性随机颜色索引
            var pseudoRandom = (timestamp * (i + 1)) % brightColors.length;
            var colorIndex = Math.floor(pseudoRandom) % brightColors.length;
            result += brightColors[colorIndex] + text[i];
        }
        
        result += "§r"; // 重置颜色
        return result;
    };
    
    /**
     * 检查TextUtil是否可用
     * 
     * @function isTextUtilAvailable
     * @memberof shanhaiColorAPI
     * @returns {boolean} TextUtil是否可用
     */
    
    // ========== DShanhaiTextUtil 动态文本绑定 ==========
    (function() {

// batch addLore helper


        var _dtu = null;
        try {
            _dtu = DShanhaiTextUtil;
            if (_dtu) {
                console.log('[Texto dinâmico de montanhas e mares] DShanhaiTextUtil foi carregado');
            } else {
                console.warn('[Texto dinâmico de Shanhai] DShanhaiTextUtil é nulo');
            }
        } catch (e) {
            console.warn('[Shanhai Dynamic Text] DShanhaiTextUtil falhou ao carregar, use backup:', String(e));
        }
        function _reg(name, fn) { global.shanhaiColorAPI[name] = fn; }
        if (_dtu) {
            _reg('createRainbow', function(t) { return _dtu.createRainbowText(String(t)); });
            _reg('createGolden', function(t) { return _dtu.createGoldenText(String(t)); });
            _reg('createFire', function(t) { return _dtu.createFireText(String(t)); });
            _reg('createWater', function(t) { return _dtu.createWaterText(String(t)); });
            _reg('createMagic', function(t) { return _dtu.createMagicText(String(t)); });
            _reg('createNature', function(t) { return _dtu.createNatureText(String(t)); });
            _reg('createElectric', function(t) { return _dtu.createElectricText(String(t)); });
            _reg('createIce', function(t) { return _dtu.createIceText(String(t)); });
            _reg('createLava', function(t) { return _dtu.createLavaText(String(t)); });
            _reg('createObfuscatedRainbow', function(t) { return _dtu.createObfuscatedRainbow(String(t)); });
            _reg('wrapRainbow', function(c) { return c && c.copy ? _dtu.wrapRainbow(c) : c; });
            _reg('wrapGolden', function(c) { return c && c.copy ? _dtu.wrapGolden(c) : c; });
            _reg('wrapFire', function(c) { return c && c.copy ? _dtu.wrapFire(c) : c; });
            _reg('wrapWater', function(c) { return c && c.copy ? _dtu.wrapWater(c) : c; });
            _reg('wrapMagic', function(c) { return c && c.copy ? _dtu.wrapMagic(c) : c; });
            _reg('wrapNature', function(c) { return c && c.copy ? _dtu.wrapNature(c) : c; });
            _reg('wrapElectric', function(c) { return c && c.copy ? _dtu.wrapElectric(c) : c; });
            _reg('wrapIce', function(c) { return c && c.copy ? _dtu.wrapIce(c) : c; });
            _reg('wrapLava', function(c) { return c && c.copy ? _dtu.wrapLava(c) : c; });
            console.log('[Shanhai Dynamic Text] DShanhaiTextUtil foi vinculado a shanhaiColorAPI');
        } else {
            _reg('createRainbow', function(t) { return "§c" + t; });
            _reg('createGolden', function(t) { return "§6" + t; });
            _reg('createFire', function(t) { return "§c" + t; });
            _reg('createWater', function(t) { return "§b" + t; });
            _reg('createMagic', function(t) { return "§d" + t; });
            _reg('createNature', function(t) { return "§a" + t; });
            _reg('createElectric', function(t) { return "§e" + t; });
            _reg('createIce', function(t) { return "§b" + t; });
            _reg('createLava', function(t) { return "§6" + t; });
            _reg('createObfuscatedRainbow', function(t) { return "§k§c" + t; });
        }
    })();

    /**
     * 检查 TextUtil 是否可用
global.shanhaiColorAPI.isTextUtilAvailable = function() {
        return typeof TextUtil !== 'undefined';
    };
    
    /**
     * 获取可用的TextUtil样式列表
     * 
     * @function getAvailableTextUtilStyles
     * @memberof shanhaiColorAPI
     * @returns {string[]} 可用样式名称数组
     */
    global.shanhaiColorAPI.getAvailableTextUtilStyles = function() {
        if (typeof TextUtil === 'undefined') {
            return ['ultimateRainbow', 'rainbow', 'fire', 'water', 'nature', 'ice', 'lava', 'magic', 'electric'];
        }
        
        var styles = [];
        if (typeof TextUtil.full_color === 'function') styles.push('ultimateRainbow');
        if (typeof TextUtil.dark_purplish_red === 'function') styles.push('dark_purplish_red');
        if (typeof TextUtil.white_blue === 'function') styles.push('white_blue');
        if (typeof TextUtil.purplish_red === 'function') styles.push('purplish_red');
        if (typeof TextUtil.golden === 'function') styles.push('golden');
        if (typeof TextUtil.dark_green === 'function') styles.push('dark_green');
        if (typeof TextUtil.rainbow === 'function') styles.push('rainbow');
        if (typeof TextUtil.fire === 'function') styles.push('fire');
        if (typeof TextUtil.water === 'function') styles.push('water');
        if (typeof TextUtil.nature === 'function') styles.push('nature');
        if (typeof TextUtil.ice === 'function') styles.push('ice');
        if (typeof TextUtil.lava === 'function') styles.push('lava');
        if (typeof TextUtil.magic === 'function') styles.push('magic');
        if (typeof TextUtil.electric === 'function') styles.push('electric');
        
        return styles;
    };
    
    console.log('[Shan Hai Private Goods-Client] API de texto dinâmico foi carregada');
    
    // 客户端预生成动态文本（确保客户端有自己的副本）
    try {
        // 如果全局变量不存在，预生成一个
        if (typeof global.shanhaiDynamicLoreText === 'undefined') {
            // 尝试使用TextUtil（如果可用）
            if (typeof TextUtil !== 'undefined' && typeof TextUtil.full_color === 'function') {
                global.shanhaiDynamicLoreText = TextUtil.full_color("Gerado por CellAPI, display gerado por JEIcellAPI");
                console.log('[Cliente de bens privados de Shanhai] TextUtil.full_color foi usado para pré-gerar texto dinâmico do Lore');
            } else {
                // 备用：手动生成彩虹文本
                var text = "Gerado por CellAPI, display gerado por JEIcellAPI";
                var colors = ['§c','§6','§e','§a','§b','§9','§d'];
                var result = "";
                for (var i = 0; i < text.length; i++) {
                    result += colors[i % colors.length] + text[i];
                }
                global.shanhaiDynamicLoreText = result + "§r";
                console.log('[Shan Hai Private Product-Client] TextUtil não está disponível, use uma solução alternativa para pré-gerar texto dinâmico do Lore');
            }
        }
    } catch (e) {
        console.error('[Cliente de bens privados de Shanhai] Falha ao pré-gerar texto dinâmico do Lore:' + e);
        global.shanhaiDynamicLoreText = "§7é gerado por CellAPI e a exibição é gerada por JEIcellAPI";
    }

    // 为256k便携物品单元添加动态颜色描述
    if (typeof global.CellAPI !== 'undefined' && typeof global.CellAPI.addCellDescription === 'function') {
        console.log('[Shanhai Private Goods-Client] Começou a gerar descrições dinâmicas de cores para 256 mil unidades de itens portáteis...');
        
        // 使用 ShanhaiText.inline 处理内联动态文本
        var descriptionComponent;
        if (typeof ShanhaiText !== 'undefined' && typeof ShanhaiText.inline === 'function') {
            console.log('[Shanhai Private Product-Client] Use ShanhaiText.inline() para processar texto embutido');
            descriptionComponent = ShanhaiText.inline('{ultimate} é gerado pela CellAPI, e a exibição JEI é gerada pela JEICellAPI{/}');
            console.log('[Cliente de produtos privados Shan Hai] Tipo de retorno ShanhaiText.inline:' + typeof descriptionComponent);
        } else {
            // 备用：使用预生成的动态文本或普通文本
            console.log('[Shanhai Private Goods-Client] ShanhaiText.inline não está disponível, use uma solução alternativa');
            descriptionComponent = global.shanhaiDynamicLoreText || "§7é gerado por CellAPI, a exibição JEI é gerada por JEICellAPI";
        }
        
        global.CellAPI.addCellDescription('ae2:portable_item_cell_256k', [
            { inlineText: '{ultimate} é gerado pela CellAPI, e a exibição JEI é gerada pela JEICellAPI{/}' }
        ]);
        console.log('[Shan Hai Private Goods-Client] Descrições dinâmicas de cores foram adicionadas a 256 mil unidades de itens portáteis');
    } else {
        console.warn('[Shan Hai Private Goods-Client] Aviso: global.CellAPI ou addCellDescription não estão disponíveis');
    }
}

})();

// ===== 动态文本 API 客户端测试 =====
(function() {
var DShanhaiItemTooltipAPI = Java.loadClass('com.dishanhai.gt_shanhai.api.DShanhaiItemTooltipAPI');
var registerAltLinesStringArrays = DShanhaiItemTooltipAPI['registerAltLines(java.lang.String,java.lang.String[],java.lang.String[])'];

// batch addLore helper
function addLore(textList, lines) {
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        try {
            if (line.component) { textList.add(line.component); continue; }
            if (line.inlineText && typeof ShanhaiText !== 'undefined' && ShanhaiText.inline) {
                var _c = ShanhaiText.inline(line.inlineText);
                if (_c) { textList.add(_c); continue; }
            }
            if (line.style && typeof ShanhaiText !== 'undefined' && ShanhaiText.styled) {
                var _c = ShanhaiText.styled(line.text, line.style);
                if (_c) { textList.add(_c); continue; }
            }
            if (line.bodyStyle && typeof ShanhaiText !== 'undefined' && ShanhaiText.body) {
                var _c = ShanhaiText.body(line.text, line.bodyStyle);
                if (_c) { textList.add(_c); continue; }
            }
        } catch(e) {}
        textList.add(Component.literal((line.bodyStyle ? '§7' : '') + (line.text || '')));
    }
}

    console.log('[Shanhai Dynamic Text] === O teste do cliente começa ===');

    // 1. 检查 ShanhaiText API
    if (typeof ShanhaiText !== 'undefined') {
        console.log('[Texto Dinâmico Shanhai] ShanhaiText está disponível!');
        var methods = ['ultimateRainbow','rainbow','obfuscatedRainbow','golden','fire','water','magic','nature','electric','ice','lava','custom'];
        for (var i = 0; i < methods.length; i++) {
            try {
                var result = ShanhaiText[methods[i]]('teste');
                console.log('[Texto Dinâmico de Montanha e Mar] ShanhaiText.' + methods[i] + '() → digite:' + (typeof result));
            } catch(e) {
                console.warn('[Texto Dinâmico de Montanha e Mar] ShanhaiText.' + methods[i] + '() falhar:' + String(e));
            }
        }
    } else {
        console.warn('[Shanhai Dynamic Text] ShanhaiText não está disponível (cliente)');
    }

    // 2. 检查 DShanhaiTextUtil
    if (typeof DShanhaiTextUtil !== 'undefined') {
        console.log('[Texto dinâmico de Shanhai] DShanhaiTextUtil foi carregado!');
        var utilMethods = ['createRainbowText','createGoldenText','createFireText','createWaterText','createMagicText','createNatureText','createElectricText','createIceText','createLavaText','createUltimateRainbow'];
        for (var i = 0; i < utilMethods.length; i++) {
            try {
                var result = DShanhaiTextUtil[utilMethods[i]]('teste');
                console.log('[Texto dinâmico de montanhas e mares] DShanhaiTextUtil.' + utilMethods[i] + '() → digite:' + (typeof result));
            } catch(e) {
                console.warn('[Texto dinâmico de montanhas e mares] DShanhaiTextUtil.' + utilMethods[i] + '() falhar:' + String(e));
            }
        }
    } else {
        console.warn('[Shanhai Dynamic Text] DShanhaiTextUtil não está disponível (cliente)');
    }

    // 3. 在测试物品上显示动态 tooltip
    ItemEvents.tooltip(function(e) {
        e.addAdvanced('dishanhai:test_dynamic_text', function(item, _, text) {
            text.clear();
            if (typeof ShanhaiText !== 'undefined') {
                text.add(ShanhaiText.ultimateRainbow('§lArco-íris dinâmico de montanha e mar'));
                text.add(ShanhaiText.golden('Teste de gradiente dourado'));
                text.add(ShanhaiText.fire('Teste do sistema de incêndio'));
                text.add(ShanhaiText.water('Teste do sistema de fluxo de água'));
                text.add(ShanhaiText.magic('Teste mágico'));
                text.add(ShanhaiText.nature('Teste de sistema natural'));
                text.add(ShanhaiText.electric('Teste de sistema eletro-óptico'));
                text.add(ShanhaiText.ice('Teste do sistema Frost'));
                text.add(ShanhaiText.lava('Teste do sistema de lava'));
                text.add(ShanhaiText.rainbow('Teste de flash arco-íris'));
                text.add(ShanhaiText.obfuscatedRainbow('arco-íris confuso'));
                // 新扩展样式（需重新编译 jar）
                try { if (typeof ShanhaiText.sunset === 'function') text.add(ShanhaiText.sunset('Teste da série Sunset')); } catch(ex) {}
                try { if (typeof ShanhaiText.aurora === 'function') text.add(ShanhaiText.aurora('Teste do sistema Aurora')); } catch(ex) {}
                try { if (typeof ShanhaiText.crimson === 'function') text.add(ShanhaiText.crimson('Teste escarlate')); } catch(ex) {}
                try { if (typeof ShanhaiText.neon === 'function') text.add(ShanhaiText.neon('Teste do sistema de néon')); } catch(ex) {}
                try { if (typeof ShanhaiText.sakura === 'function') text.add(ShanhaiText.sakura('Teste da série Sakura')); } catch(ex) {}
                text.add(Component.literal('§8—— Nova paleta de cores RGB ——'));
                try { if (typeof ShanhaiText.cosmic === 'function') text.add(ShanhaiText.cosmic('nebulosa cósmica / cósmica RGB')); } catch(ex) {}
                try { if (typeof ShanhaiText.voidText === 'function') text.add(ShanhaiText.voidText('vazio / vazio roxo preto RGB')); } catch(ex) {}
                try { if (typeof ShanhaiText.jade === 'function') text.add(ShanhaiText.jade('jade / luz verde jade RGB')); } catch(ex) {}
                try { if (typeof ShanhaiText.plasma === 'function') text.add(ShanhaiText.plasma('plasma / brilho de plasma RGB')); } catch(ex) {}
                try { if (typeof ShanhaiText.starlight === 'function') text.add(ShanhaiText.starlight('luz das estrelas / estrela platina RGB')); } catch(ex) {}
                try { if (typeof ShanhaiText.abyss === 'function') text.add(ShanhaiText.abyss('abismo / Abismo Blu-ray RGB')); } catch(ex) {}
                text.add(Component.literal('§8—— Novos efeitos dinâmicos FCS ——'));
                try { if (typeof ShanhaiText.scan === 'function') text.add(ShanhaiText.scan('^ efeito de digitalização de digitalização', 'cosmic')); } catch(ex) {}
                try { if (typeof ShanhaiText.glitch === 'function') text.add(ShanhaiText.glitch('? efeito de falha', 'neon')); } catch(ex) {}
                try { if (typeof ShanhaiText.breatheFx === 'function') text.add(ShanhaiText.breatheFx('+ respire brilho respiratório', 'jade')); } catch(ex) {}
                try { if (typeof ShanhaiText.chase === 'function') text.add(ShanhaiText.chase('> efeito de luz de perseguição', 'starlight')); } catch(ex) {}
                try { if (typeof ShanhaiText.fcs === 'function') text.add(ShanhaiText.fcs('^+>', 'Combo: Varredura + Respiração + Perseguição', 'plasma')); } catch(ex) {}
                try { if (typeof ShanhaiText.inline === 'function') text.add(ShanhaiText.inline('{cosmic}inline cosmic{/}{body_silver} + {/}{plasma}inline plasma{/}')); } catch(ex) {}
            } else {
                text.add(Component.literal('§cShanhaiText não está disponível'));
            }
        });
    });




    // ===== 模块机器并行表 — Java 侧 Shift 显示 =====
    var primordialParallelTableLines = [
        '§7┌─ Itens aprimorados ────────────────────────────────┐',
        '§7│ §fNenhum item → §7Paralelo: §f64 §7│',
        '§7│ Módulo de material de entrada §a→ §7Paralelo: §b128 §7│',
        '§7│ §aMódulo de material básico → §7Paralelo: §b256 §7│',
        '§7│ Módulo de dedução de material §a→ §7Paralelo: §b512 §7│',
        '§7│ Módulo de substância de imagem virtual §a→ §7Paralelo: §b1.024 §7│',
        '§7│ Módulo de Matéria de Transmutação §a→ §7Paralelo: §b1.024 §7│',
        '§7│ §aMódulo de Matéria Estrela Negra → §7Paralelo: §b4.096 §7│',
        '§7│ Módulo de recombinação de materiais §a→ §7Paralelo: §b16.384 §7│',
        '§7│ Módulo de Matéria Imaginária §a→ §7Paralelo: §b65.536 §7│',
        '§7│ §aMódulo de material de zeragem → §7Paralelo: §b524.288 §7│',
        '§7│ Módulo de material de pico §a→ §7Paralelo: §b1.048.576 §7│',
        '§7│ Módulo de matéria dimensional atualizado §a→ §7Paralelo: §b2.097.152 §7│',
        '§7│ §aMódulo de substância ultralimitada → §7Paralelo: §b268.435.456 §7│',
        '§7│ §aMódulo de Matéria Caótica → §7Paralelo: §b536.870.912 §7│',
        '§7│ §aMódulo de Matéria Eterna → §7Paralelo: §b2.147.483.647 §7│',
        '§7│ Módulo de Criação de Matéria §a→ §7Paralelo: §d4.6e18 §7│',
        '§7│ Módulo Âncora de Realidade §5→ §7Paralelo: §d6.9e18 §7│',
        '§7│ §aMódulo de modificação da realidade fundadora → §7Paralelo: §6§lIlimitado §7│',
        '§7│ §5Série de fragmentos de linha mundial → Slot multiplicador de thread §7│',
        '§7│ §6Despertar×1/Ressonância×4/Transição×16/Transcendência×64 §7│',
        '§7│ Integração §6×256/Normalização×1024/Julgamento×4096 (Empilhável) §7│',
        '§7│ §dDispositivo de sobrelimite paralelo universal → Modo de sobrelimite (MAX Paralelo) §7│',
        '§7└─────────────────────────────┘'
    ];

    DShanhaiItemTooltipAPI.registerShiftMany([
        'gt_shanhai:primordial_assembly_line_module',
        'gt_shanhai:primordial_matter_recombinator_core',
        'gt_shanhai:primordial_causal_weaving_matrix',
        'gt_shanhai:primordial_singularity_inversion_core',
        'gt_shanhai:primordial_world_fragments_collector',
        'gt_shanhai:taixu_smelting_furnace',
        'gt_shanhai:primordial_anti_entropy_condensation_core',
        'gt_shanhai:primordial_matter_caster',
        'gt_shanhai:primordial_divergence_generator',
        'gt_shanhai:primordial_chaotic_ephemeral_deconstruction_crystallization_furnace',
        'gt_shanhai:primordial_biological_core'
    ], primordialParallelTableLines, '§7§oPressione e segure SHIFT para visualizar tabelas paralelas detalhadas');

TooltipEffectAPI.register("gt_shanhai:taixu_smelting_furnace", ['O coração da fornalha se transforma em uma ponta de agulha, e cada expansão libera um universo dobrado.',
    'Taixu é o limite – não há mais vazio acima dele. Não há "nada" nem "ter" ali, apenas "era"',
    'Os sonhadores da Estrela Azul estão sobre os ombros de Taixu, tentando olhar para lugares mais altos, mas só existe um nada infinito.',
     'Acima de Taixu não há direção. Qualquer passo que você der o levará de volta a Taixu.',
      'Esta é a verdade acima de Taixu: não é um lugar mais alto, mas um momento mais profundo.']
      , 11000, 2, ['ultimate','fire','water','aurora','sakura'],"§7§oPressione e segure §eALT §7para ver a mensagem de Taixu")


DShanhaiItemTooltipAPI.registerShift('gtlcore:pattern_modifier', [
    'Ω-Modificação especial: {electric} [Adicionar uma função de ampliação de saída de receita separada ao modificador de modelo de fornecedor]{/}',
    '│O botão de ampliação extra de saída insere a ampliação correspondente e o divisor extra de saída é usado para ajustar a divisão de saída',
    '│Fórmula: Saída final = Saída original × Escala ÷ DivScale × Saída × ÷ Saída ÷'
], 'Ω| Pressione e segure SHIFT para ver a solicitação de modificação privada{/}');

DShanhaiItemTooltipAPI.registerShift('gt_shanhai:super_parallel_core', [
    'Ω-Modificação especial: {electric} [Adicionar modo de saturação de operação dividida (paralelo longo)]{/}',
    '│Depois de instalar no local central do operador molecular [dentro da suboperação], desbloqueie o modo de limite excessivo da suboperação (paralelo longo)'
], 'Ω| Pressione e segure SHIFT para ver a solicitação de modificação privada{/}');

DShanhaiItemTooltipAPI.registerShift('gtceu:molecular_assembler_matrix', [
    'Ω-Modificação especial: {electric} [Adicionar modo de sobrecarga de operação dividida (paralelo longo), núcleo superparalelo necessário]{/}',
    '│Depois de instalar no local central do operador molecular [dentro da suboperação], desbloqueie o modo acima do limite da suboperação'
], 'Ω| Pressione e segure SHIFT para ver a solicitação de modificação privada{/}');

registerAltLinesStringArrays('gtladditions:dimension_focus_infinity_crafting_array', [
    '',
    'Prompt ω-BUG: {electric} [Há um problema paralelo na matriz de síntese com foco dimensional]{/}',
    '│Este problema foi corrigido em add265fix1, mas você também pode escolher um núcleo super paralelo para resolvê-lo'
], ['ω| Pressione ALT para ver as dicas particulares de bugs de Deus{/}']);

var subspaceModuleIndependentConfigMachines = [
    'gtladditions:nexus_satellite_factory_mk1',
    'gtladditions:nexus_satellite_factory_mk2',
    'gtladditions:nexus_satellite_factory_mk3',
    'gtladditions:nexus_satellite_factory_mk4',
    'gtladditions:subspace_corridor_hub_industrial_array'
];
for (var subspaceConfigIndex = 0; subspaceConfigIndex < subspaceModuleIndependentConfigMachines.length; subspaceConfigIndex++) {
    DShanhaiItemTooltipAPI.remove(subspaceModuleIndependentConfigMachines[subspaceConfigIndex]);
}


var machine_id_array_1 = [
"gtladditions:forge_of_the_antichrist","gtladditions:heliofusion_exoticizer","gtladditions:helioflare_power_forge","gtladditions:heliofluix_melting_core","gtladditions:heliothermal_plasma_fabricator","gtladditions:heliophase_leyline_crystallizer"
]
    machine_id_array_1.forEach(function(machine_id){
registerAltLinesStringArrays(machine_id,[
    '',
    "Ω-|████████████████",
    'Dicas de configuração Ω: {electric} [configuração de operação independente do módulo Forge of False Gods (FOTC)]{/}',
    '│ Item de configuração correspondente a §e: {golden} workWithoutHost{/}',
    '│ Se a máquina do módulo §epode ser executada independentemente do host (desativado por padrão)',
    '│ §cfalse=O módulo deve ter um host para rodar',
    '│ §atrue=O módulo pode executar receitas de forma independente após ser separado do host'
],[
'',
'Ω-|███████████████',
'Mantenha pressionada a tecla ALT para visualizar os prompts de configuração do módulo Forge of the False Gods (FOTC)'
])})


var subspaceModuleIndependentConfigLines = [
    '',
    "Ω-|████████████████",
    'Ω-Prompt de configuração: {electric} [configuração de operação independente do módulo subespacial]{/}',
    '│ Item de configuração correspondente a §e: {golden} workWithoutHost{/}',
    '│ Se a máquina do módulo §epode ser executada independentemente do host (desativado por padrão)',
    '│ §cfalse=O módulo deve ter um host para rodar',
    '│ §atrue=O módulo pode executar receitas de forma independente após ser separado do host'
];
for (var subspaceRegisterIndex = 0; subspaceRegisterIndex < subspaceModuleIndependentConfigMachines.length; subspaceRegisterIndex++) {
    registerAltLinesStringArrays(subspaceModuleIndependentConfigMachines[subspaceRegisterIndex], subspaceModuleIndependentConfigLines, ["Ω-|████████████████",'Pressione e mantenha pressionada a tecla ALT para ver as solicitações de configuração do módulo subespacial{/}']);
}

var recursiveBypassConfigMachines = [
    'gtladditions:recursive_reverse_array',
    'gtladditions:catalytic_cascade_array',
    'gtladditions:spacetime_stasis_device',
    'gtladditions:supratemporal_boosting_engine'
];
for (var recursiveBypassRemoveIndex = 0; recursiveBypassRemoveIndex < recursiveBypassConfigMachines.length; recursiveBypassRemoveIndex++) {
    DShanhaiItemTooltipAPI.remove(recursiveBypassConfigMachines[recursiveBypassRemoveIndex]);
}

var recursiveBypassConfigLines = [
    '',
    'Ω-|████████████████',
    'Ω-Prompt de configuração: {electric} [configuração de bypass de restrição interna do módulo recursivo]{/}',
    '│ Item de configuração correspondente a §e: {golden} bypassModuleRestrictions{/}',
    '│ §eSe a matriz de inversão recursiva quebra as restrições internas dos submódulos conectados (desativado por padrão)',
    '│ §cfalse=Mantenha a lógica original do GTLAdditions: catalisador, material de foco, janela de temperatura, status operacional do módulo são todos verificados normalmente',
    '│ §atrue=Somente quando o submódulo for formado e conectado à matriz de inversão recursiva, ele será considerado como um estado completo para participar do ganho de inversão recursiva',
    '│ §eEsta configuração não permitirá que módulos executados independentemente do array participem do ganho de inversão recursiva'
];
for (var recursiveBypassRegisterIndex = 0; recursiveBypassRegisterIndex < recursiveBypassConfigMachines.length; recursiveBypassRegisterIndex++) {
    registerAltLinesStringArrays(recursiveBypassConfigMachines[recursiveBypassRegisterIndex], recursiveBypassConfigLines, ['',"Ω-|████████████████", 'Pressione e segure ALT para ver o prompt de configuração do módulo recursivo{/}']);
}


DShanhaiItemTooltipAPI.registerAlt('gtceu:me_extended_async_export_buffer', [
    '',
    'Prompt ω-BUG: {electric} [Atenção! A montagem assíncrona tem um sério problema de engolir itens】{/}',
    '|Atualmente não há solução. Você pode usar montagem aumentada para evitá-lo, mas não pode usar montagem assíncrona',
    '|Nota: A amplificação será mais lenta, mas isso é um expediente. Não há como'
], 'ω| Pressione ALT para ver as dicas particulares de bugs de Deus{/}');


var machine_id_array_ó = [
"gtceu:me_mini_pattern_buffer","gtceu:me_extend_pattern_buffer","gtceu:me_stocking_pattern_buffer","gtceu:me_final_pattern_buffer","gtceu:me_wildcard_pattern_buffer","gtladditions:me_super_pattern_buffer"]
machine_id_array_ó.forEach(function(machine_id){
registerAltLinesStringArrays(machine_id,[
'',
"Ω-|████████████████",
'Ω-Dicas gerais: {electric} [Embora a montagem da amostra super/normal venha com seu próprio isolamento, ela não mistura absolutamente a fórmula]',
'|Sobre “isolamento”, ou seja, os itens de cada armazém são gerenciados separadamente, ou outro armazém não consegue acessar a montagem da superamostra e vice-versa.',
'|O isolamento é para o warehouse externo e não inclui esse efeito para o template interno.',
'|Se você encadear a receita, é melhor colocar o modelo em outra montagem de modelo.'
],[
'',
'Ω-|███████████████',
'Segure ALT para ver os prompts gerais'
])})

var programmable_hatch_id_3 = Ingredient.of('/^gt_shanhai:[a-z]{3}_programmable_hatch$|^gt_shanhai:programmable_hatch|^gt_shanhai:[a-z]{2}_programmable_hatch$/').getItemIds();
console.log(programmable_hatch_id_3);
programmable_hatch_id_3.forEach(function(itemid){
DShanhaiItemTooltipAPI.registerAlt(itemid,[
'',
"ω-|████████████████",
'Dica ω-BUG: {electric} [Há um BUG sério no armazém programável! 】',
'|Se você instalar um warehouse programável, todos os warehouses serão inválidos, incluindo o próprio warehouse programável.',
'|O compartimento programável está temporariamente desativado, por favor não o utilize!',
'|Aguardando reparo!!!!!!!!'
],[
'',
'ω-|███████████████',
'Mantenha pressionada a tecla ALT para ver as dicas privadas de bugs de Deus'
])})

DShanhaiItemTooltipAPI.registerAlt('gt_shanhai:singularity_data_hub', [
    '',
    'α-Dica maravilhosa: {electric} [dishanhai criou 6.000 discos ilimitados naquele dia]{/}',
    '| {crimson} Então, em desespero, ele descobriu que a unidade tinha apenas 20 slots{/}, {sunset} forçou Dishanhai a preencher 300 unidades{/}',
    '| {ice} Então Dishanhai criou esta máquina multibloco... Lamento ter saído {/}'
], 'α| Pressione ALT para ver as dicas misteriosas e misteriosas{/}');

TooltipEffectAPI.register('dishanhai:create_mk', [                                                                                                                                   
      '{ultimateRainbow} O universo é arrogante e preconceituoso e suas regras são cruéis e implacáveis. {/}',
      '{bodySilver} A chamada {/} "verdade" {ice} {/} {bodySilver} que ela oferece nada mais é do que um jugo escrito pelos fortes para os fracos. {/}',                        
      '{electric} A constante cosmológica nunca é uma ordem dada por Deus ----{/} {lava} é uma tirania. {/}',
      '{bodySilver} Agora é sua vez de reescrever o estatuto desta tirania{/}',                                                                                                                             
      '{golden} Chegou a hora do universo arrogante aprender a {/} {ultimateRainbow} calar a boca{/}'    
  ],7000,3,['ultimate','fire','water','%$aurora','*$sakura'],"§7§oPressione e segure §eALT §7para ver a mensagem fantasia",'obfu:true');

TooltipEffectAPI.register("gt_shanhai:maintenance_hatch", [                                                                                                                                   
      'As pessoas na Utopia já não constroem máquinas; sonham com funções e depois deixam a realidade adaptar-se aos seus sonhos.',
      'O centro é um sonho, sobrepondo-se, desmoronando e expandindo-se no mesmo nó, como seis espelhos refletindo-se mutuamente no infinito.',
      'Esta é a fronteira entre fantasia e realidade',
      'Não se adapte mais às regras, mas deixe que as regras se adaptem a você'    
  ],7000,3,['ultimate','fire','water','%$aurora','*$sakura'],"§7§oPressione e segure §eALT §7para ver a mensagem fantasia",'obfu:true');


DShanhaiItemTooltipAPI.registerAlt("gt_shanhai:me_disk_hatch",[
'',
"α-|████████████████",
    'α-Dica maravilhosa: {electric} [Atualmente há um BUG no armazenamento do disco ME]{/}',
    '| {cosmic} Claro, esse BUG é amigável, você pode conectar diretamente o me disk warehouse ao AE para usá-lo{/}',
    '| {ice} não precisa estar conectado ao Singularity Data Center{/}'
],[
'',
'Ω-|███████████████',
'Segure ALT para ver os prompts gerais'
])
var configuration_hatch = ['gtceu:gravity_hatch','gtceu:gravity_configuration_hatch',"gtceu:gravity_hatch","gtceu:sterile_cleaning_gravity_configuration_maintenance_hatch","gtceu:law_cleaning_gravity_configuration_maintenance_hatch"]
configuration_hatch.forEach(function(itemid){
DShanhaiItemTooltipAPI.registerAlt(itemid,[
'',
"Ω-|████████████████",
'Ω-Dicas gerais: {electric} [Qual é o armazém de manutenção por gravidade? 】',
'|A gravidade é um requisito explícito da receita, por exemplo: "requer um ambiente de forte gravidade"',
'|Então você precisa de um armazém de manutenção por gravidade',
'|O compartimento de manutenção é ajustável: 100 significa forte gravidade, 0 significa sem gravidade'
],[
'',
'Ω-|███████████████',
'Segure ALT para ver os prompts gerais'
])})

    // ===== 终焉聚合枢纽 — 模块表 =====
    ItemEvents.tooltip(function(e) {
        e.addAdvanced('gt_shanhai:maintenance_hatch', function(item, _, text) {
            if (e.shift) {
                addLore(text, [
                { text: '§7┌─ Módulo de substância conectável ───────────────────────┐' },
                    { text: '§7│ Módulo de material de entrada §a§7[Demorado §b0,50 ~ 2,00 §7] [Paralelo §b256 §7] §7│' },
                    { text: '§7│ §amódulo de material básico §7[Demorado §b0,35 ~ 5,00 §7] [Paralelo §b1,0K §7] §7│' },
                    { text: '§7│ Módulo de dedução de material §a§7[Demorado §b0,20 ~ 10,00 §7] [Paralelo §b2,0K §7] §7│' },
                    { text: '§7│ Módulo de material de imagem virtual §a§7[Demorado §b0,16 ~ 30,00 §7][§bparalelo 4,0K §7] §7│' },
                    { text: '§7│ Módulo de material de transmutação §a§7[Demorado §b0,12 ~ 100,00 §7] [Paralelo §b8,2K §7] §7│' },
                    { text: '§7│ §amódulo de material estrela escura §7[Demorado §b0,10 ~ 300,00 §7] [Paralelo §b12,3K §7] §7│' },
                    { text: '§7│ Módulo de recombinação de material §a§7[Demorado §b0,08 ~ 1.000 §7] [Paralelo §b16K §7] §7│' },
                    { text: '§7│ §aMódulo de material imaginário §7[Demorado §b0,05 ~ 2.000 §7] [Paralelo §b65K §7] §7│' },
                    { text: '§7│ §aMódulo de material de zeragem §7[Demorado §b0,03 ~ 3.000 §7] [Paralelo §b524K §7] §7│' },
                    { text: '§7│ Módulo de material de pico §a§7[Demorado §b0,025 ~ 3.500 §7] [Paralelo §b1,0M §7] §7│' },
                    { text: '§7│ §aMódulo de material atualizado §7[Demorado §b0,02 ~ 4.000 §7] [Paralelo §b2,1M §7] §7│' },
                    { text: '§7│ §aMódulo de substância ultralimitado §7[Demorado §b0,015 ~ 5.000 §7] [Paralelo §b268M §7] §7│' },
                    { text: '§7│ §aMódulo de matéria caótica §7[Demorado §b0,012 ~ 5.500 §7] [Paralelo §b1.1B §7] §7│' },
                    { text: '§7│ §aMódulo de Matéria Eterna §7[Demorado §b0,01 ~ 6.000 §7] [Paralelo §b2.1B §7] §7│' },
                    { text: '§7│ Módulo de criação de substância §d§7[Demorado §b0,005 ~ 8.000 §7] [Paralelo §b4.6e18 §7] §7│' },
                    { text: '§7│ §5Módulo âncora de realidade §7[Demorado §b0,003 ~ 9.000 §7] [Paralelo §b6.9e18 §7] §7│' },
                    { text: '§7│ §6fundou o módulo de modificação de realidade §7[Demorado §b0,001 ~ 10.000 §7] [Paralelo §6§lIlimitado §7] §7│' },
                    { text: '§7└────────────────────────────────────┘' }
            ]);
            } else {
                text.add('§7§oPressione e segure SHIFT para visualizar a lista de módulos conectáveis');
            }
        });
    });

    ItemEvents.tooltip(function(e) {
        e.addAdvanced("gt_shanhai:shanhai_nine_industrial", function(item, _, text) {
            if (e.shift) {
                addLore(text, [
                { text: '§7Capítulo 0 Forçados a se rebelar, reunir-se em Liangshan → Compressor, Martelo de Forjamento, Compressão de Singularidade, Explosão Elétrica' },
                { text: '§7Capítulo 1 Huangnigang roubou dinheiro roubado de funcionários corruptos → Extrator Tanque de fermentação Dissolve Digest' },              
                { text: '§7Capítulo 2: Matando inimigos em uma noite de neve, fugindo para a água → Autoclave, solidificação de fluidos, aquecimento de fluidos, troca de calor' },
                { text: '§7Capítulo 3: Força infinita, mostrando as verdadeiras qualidades de um herói → Lavagem de minério, centrifugação térmica, centrifugação, centrifugação de terras raras' },        
                { text: '§7Capítulo 4 Jingyanggang matou o tigre com três socos → Forno elétrico, forno de liga, forno de lava, alto-forno de liga' },
                { text: '§7Capítulo 5: Bêbado no templo, socando os monges → Forno de arco elétrico, alto-forno, forja estelar, fundição superdimensional' },
                { text: '§7Capítulo 6: Matando inimigos, desesperado → Triagem, beneficiamento eletromagnético, beneficiamento por flotação, coleta de gás em grande escala' },
                { text: '§7Capítulo 7 Salvando Lin Chong do Perigo → Torno de Pó Moagem Úmida Nano Forja' },        
                { text: '§7Capítulo 8: Humilhado na rua, mostrando a solidão de um herói → Destilação, Fabricação de Cerveja, Dessulfurização, Petroquímica' },              
                { text: '§7Capítulo 9 Um plano inteligente para conquistar Lu Junyi → Embalagem, enlatamento, secagem a vácuo, refino de combustível' },
                { text: '§7Capítulo 10 Batalha sangrenta para salvar o irmão, heroísmo crescente → Fusão, super reação, superpoder avançado, grande reação de sílica' },
                { text: '§7Capítulo 11: Preso pelo amor, desesperado → Explosão, Condensação de plasma a vácuo, Excitação de energia atômica' },
                { text: '§7Capítulo 12: Assassinato espirituoso de monges malignos → Grande rebelião química, tanque químico, agitação de dimensão extra, distorção química' },
                { text: '§7Capítulo 13: Revelando adultério, satisfazendo rancores → Estampagem por extrusão com dobra de arame' },
                { text: '§7Capítulo 14 Batalha heróica na água e naufrágio de navio inimigo → Montagem Montagem do circuito Montagem de componentes Montagem de precisão' },
                { text: '§7Capítulo 15 Derrotando um gigante e exibindo sua engenhosidade → Corte Gravação a laser Gravação de precisão Gravação com foco dimensional' },
                { text: '§7Capítulo 16 Decapitando o adúltero e a adúltera → Linha de montagem Montagem do hiperespaço Linha de montagem do circuito Fábrica de PCB' },
            ]);
            } else {
                text.add('§7§oTipo de receita Margem de água Pressione e segure SHIFT para visualizar o tipo de receita dos primeiros 16 capítulos');
            }
        });
    });

        ItemEvents.tooltip(function(e) {
        e.addAdvanced("gt_shanhai:shanhai_nine_industrial", function(item, _, text) {
            if (e.alt) {
                addLore(text, [
                { text: '§7Capítulo 17 Com pés tão rápidos quanto voar, passando por aeronaves militares → Mistura, desidratação, refino de combustível, troca de calor' },
                { text: '§7Capítulo 18: Três batalhas consecutivas, finalmente derrotando a vila → Eletrólise, Polarização, Manipulação Quântica, Síntese Supercrítica' },
                { text: '§7Capítulo 19 O exército conquistou, chocando todas as direções → Reação da rocha de sílica, fissão, colisão de partículas, aniquilação' },
                { text: '§7Capítulo 20 Batalha feroz em Jiangnan → Nano Forge PCB Focused Etching Photon Etching' },
                { text: '§7Capítulo 21 Assassinato e incêndio criminoso → petrificação, decomposição, dissolução de minério baseado no céu' },
                { text: '§7Capítulo 22: Estratégias para determinar o país → Fundição ultradimensional, queima de estrelas, forja estelar, compressão de singularidade' },
                { text: '§7Capítulo 23: Traição de Escravos Domésticos → Minério Integrado, Coleta de Fragmentos, Mineração Espacial, Remoção de Núcleo Estelar' },
                { text: '§7Capítulo 24 Heróis sacrificam suas riquezas para ajudar a justiça → Coleta de gás Grande coleta de gás Mineração vazia Plataforma de perfuração de rocha' },
                { text: '§7Capítulo 25 Vagando → Reciclagem de área de pesca com varredura de cascalho' },
                { text: '§7Capítulo 26 Artes Marciais Incomparáveis ​​→ Estufa, Tanque de Cultura, Matadouro, Área de Pesca' },
                { text: '§7Capítulo 27 Sabedoria e Coragem → Grande Reciclagem, Desmontagem, Cópia de Elementos' },
                { text: '§7Capítulo 28 Aceitando o Edito Imperial → Ativação de nêutrons Processamento de relâmpagos Aceleração de decaimento Energia atômica' },
                { text: '§7Capítulo 29 Pedras Voadoras estão sempre no alvo → Geração de massa, geração de substância, síntese supercrítica, polimerização criativa' },
                { text: '§7Capítulo 30 Água Natural → Simulação Biológica Condensação Antientrópica Geração Mágica Simulação de Universo' },
                { text: '§7Capítulo 31 Deserção para os Rebeldes → Elevador Espacial Desmontagem de minério QFT baseado no espaço' },
                { text: '§7Capítulo 32: O inimigo está se aproximando → Linha de montagem, montagem de circuito, montagem de hiperespaço, montagem de componentes' },
                { text: '§7Capítulo 33 Os oficiais e soldados falharam repetidamente → Distorção do tempo e do espaço, reorganização da matéria, tecelagem de causa e efeito, inversão de singularidade' },
                { text: '§7Capítulo 34 Tiangang e demônios terrestres se reúnem → Linha de montagem Montagem do super tempo e espaço Montagem do circuito Estrelas queimam distorção do tempo e do espaço' },
                { text: '§7Capítulo 35 A Lenda de Liang Shanbo Termina → Fusão Super Poder Avançado Super Poder Aniquilação Caos 72 Mudanças' },
            ]);
            } else {
                text.add('§7§oTipo de receita Margem de água Pressione e segure ALT para visualizar o 16º tipo de receita');
            }
        });
    });

    ItemEvents.tooltip(function(e) {
        e.addAdvanced('gt_shanhai:black_hole_containment', function(item, _, text) {
            if (e.shift) {
                addLore(text, [
                    { text: '§5§lCampo de contenção de buraco negro metaestável §7(BHC)' },
                    { text: '§7é um sistema de compressão de buraco negro transplantado do GTNH.' },
                    { text: '§7gera buracos negros controlados por meio de sementes de buracos negros para compressão gravitacional, compressão de estado de nêutrons e explosão de horizonte de eventos.' },
                    { text: '§8' },
                    { text: 'Condições de operação §d:' },
                    { text: '§7coloca a semente do buraco negro §e§7para abrir um buraco negro comum.' },
                    { text: '§7Os buracos negros comuns precisam consumir continuamente o fluido espaço-tempo §b§7para manter a estabilidade.' },
                    { text: '§7coloca §dsemente de buraco negro superestável §7para abrir o buraco negro superestável sem decadência natural e sem necessidade de fluido espaço-tempo' },
                    { text: '§7é colocado no colapsador de buraco negro §c§7, que pode colapsar ativamente e fechar o buraco negro.' },
                    { text: '§4engole 10b de líquido espaço-tempo por segundo e deve manter a existência de fluido espaço-tempo' },
                    { text: '§8' },
                    { text: 'Mecanismo de estado §6:' },
                    { text: '§7entra em um estado instável depois que sua estabilidade cai abaixo de 0.' },
                    { text: '§cO buraco negro instável ainda pode operar, mas consumirá os produtos da receita.' },
                    { text: '§7Após a conclusão da explosão do horizonte de eventos, o buraco negro será aniquilado automaticamente.' },
                    { text: '§8' },
                    { text: 'Mecanismo paralelo §b:' },
                    { text: 'Paralelismo básico §7: §e8x/nível de tensão, paralelismo máximo: 240x(A)' },
                    { text: 'Buraco negro ultraestável §7: paralelo §d(A)x4 [excluindo taxa catalítica]' },
                    { text: '§7A baixa estabilidade aumentará o paralelismo, mas o risco aumentará' },
                    { text: '§7usa uma chave de fenda para mudar a explosão catalítica, §2paralelo x taxa catalítica = paralelo real' },
                    { text: 'Explosão Catalítica §9: O consumo de fluido espaço-tempo aumenta o paralelismo e entra em vigor uma vez a cada 30 segundos, um total de 30 vezes' },
                    { text: '§7Nota: Cada vez que faz efeito, consumo de tempo e espaço × taxa catalítica, deglutição máxima: 1073741824B/s' },
                ]);
            } else {
                text.add('§7§oPressione e segure SHIFT para visualizar o mecanismo operacional do BHC');
            }
                text.add('');
                text.add('Tipos de receitas disponíveis: compressão gravitacional de buraco negro, compressão de estado de nêutrons, explosão de horizonte de eventos');
        });
    });

TooltipEffectAPI.register("gt_shanhai:eternal_gregtech_workshop", [
                'A Oficina Eterna Cinza, que abrange tempo e espaço infinitos, traz o poder do mar infinito de estrelas para a realidade.',
                'Venha para o poder de Greg, domine o poder do ilimitado mar de estrelas e realize possibilidades infinitas',
                'O mar de estrelas treme por isso,'
  ],5000,3,['ultimate','fire','water','%$aurora','*$sakura'],"§7§oSegure §eALT para ver a introdução do workshop Eternal Grey",'obfu:true');


  TooltipEffectAPI.register('dishanhai:central_finite_curve', [                                                                                                                                   
      'Eles construíram um muro em um universo paralelo infinito',
      'Separe o universo infinito de pessoas que não são as mais inteligentes do universo infinito das pessoas mais inteligentes',
      'A vida em diferentes universos é passada em um berço para infinitos bebês',
      'Estou cansado de suas limitações, então me chamam de mal, e se você seguir esse caminho, você também será chamado de mal',
      'Mas não nos importamos, é hora de romper a ∞ curva finita central∞',
  ],7000,3,['ultimate','fire','water','%$aurora','*$sakura'],"§7§oSegure §eALT Rick e Morty",'obfu:true');

    console.log('[Texto dinâmico de montanha e mar] === Teste do cliente concluído ===');
})();
