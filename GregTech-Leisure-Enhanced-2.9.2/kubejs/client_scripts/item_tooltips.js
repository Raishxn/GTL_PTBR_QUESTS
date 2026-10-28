// Exibe níveis de circuitos de controle, descrições de itens funcionais e origens de conversão de blocos.
ItemEvents.tooltip(event => {
    ;[
        ["kubejs:basic_control_circuit", "§aCircuito de nível ULV"],
        ["kubejs:advanced_control_circuit", "§cCircuito de nível LV"],
        ["kubejs:elite_control_circuit", "§bCircuito de nível MV"],
        ["kubejs:ultimate_control_circuit", "§5Circuito de nível HV"],
        ["kubejs:ultima_control_circuit", "§4Circuito de nível EV"],
        ["kubejs:warped_ender_pearl", "Agache e clique com o botão direito para definir um ponto de teletransporte pessoal; clique com o botão direito para teleportar ao ponto"],
        ["kubejs:hyper_stable_self_healing_adhesive", "§7Adesão total seletiva, eficaz mesmo quando rasgado ou danificado"],
        ["kubejs:black_body_naquadria_supersolid", "§7Flui como um líquido, não reflete nenhuma onda eletromagnética, absorvendo-a e transmitindo-a perfeitamente"],
        ["kubejs:command_wand", "Requer segurar um bloco de comando na mão secundária, e só pode ser colocado acima do Núcleo de Estabilização Criativo"],
        ["kubejs:uruium_coil_block", ["Pode fornecer temperatura de 32.000K para a Forja de Plasma Ultradimensional", "Apenas esta bobina pode ser usada no modo Forja Estelar"]],
        ["kubejs:essence_block", "Pode ser obtido convertendo Bloco de Ossos na Câmara de Conversão de Blocos"],
        ["kubejs:draconium_block_charged", "Pode ser obtido convertendo Obsidiana Imbuída de Poder Dracônico na Câmara de Conversão de Blocos"],
        ["minecraft:crimson_stem", "Pode ser obtido convertendo Tronco de Carvalho na Câmara de Conversão de Blocos"],
        ["minecraft:warped_stem", "Pode ser obtido convertendo Tronco de Bétula na Câmara de Conversão de Blocos"],
        ["minecraft:bone_block", "Pode ser obtido convertendo Bloco de Cálcio na Câmara de Conversão de Blocos"],
        ["minecraft:moss_block", "Pode ser obtido convertendo Bloco de Grama na Câmara de Conversão de Blocos"],
        ["minecraft:sculk", "Pode ser obtido convertendo Bloco de Musgo na Câmara de Conversão de Blocos"],
        ["gtceu:magmatter_block", "Obtido jogando um conjunto de Lingotes de Matéria Magnética no Portão da Criação"],
        ["minecraft:command_block", "Obtido jogando um Bloco de Matéria Estelar Confinada por Magneto-hidrodinâmica no Portão da Criação"],
        ["minecraft:chain_command_block", "Obtido pela fusão do Núcleo de Bloco de Comando em Cadeia com um Bloco de Comando prestes a quebrar"],
        ["minecraft:repeating_command_block", "Obtido pela fusão do Núcleo de Bloco de Comando de Repetição com um Bloco de Comando em Cadeia prestes a quebrar"],
        ["ad_astra:oxygen_loader", "§cApenas para síntese, não pode produzir oxigênio"],
    ].forEach(([item, lines]) => event.add(item, lines))
})
