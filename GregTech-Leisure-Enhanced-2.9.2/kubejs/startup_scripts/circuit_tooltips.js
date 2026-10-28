// priority: 98
// Adiciona tooltips dinâmicos e coloridos para circuitos avançados e máquinas especiais.
;(() => {
    const LDLib = Java.loadClass("com.lowdragmc.lowdraglib.LDLib")
    const tiers = ["ulv", "lv", "mv", "hv", "ev", "iv", "luv", "zpm", "uv", "uhv", "uev", "uiv", "uxv", "opv", "max"]
    const circuits = {
        supracausal_mainframe: ["Aquele que une todas as coisas, o milagre original", "full_color", "MAX"],
        supracausal_computer: ["Sombra além do tempo", "full_color", "OpV"],
        supracausal_assembly: ["Cruzando a grande barreira diante do Portão da Verdade", "full_color", "UXV"],
        supracausal_processor: ["As leis do universo emergem aqui", "full_color", "UIV"],
        cosmic_assembly: ["Girando levemente na palma da mão", "dark_purplish_red", "UIV"],
        cosmic_computer: ["Uma coisinha com densidade próxima à de uma singularidade", "dark_purplish_red", "UXV"],
        cosmic_mainframe: ["Simular tudo, analisar tudo, compreender tudo", "dark_purplish_red", "OpV"],
        cosmic_processor: ["Segurando as estrelas nas mãos", "dark_purplish_red", "UEV"],
        exotic_assembly: ["Passeio aleatório quântico", "purplish_red", "UEV"],
        exotic_computer: ["Controlando tudo com spin", "purplish_red", "UIV"],
        exotic_mainframe: ["Circuitos vindos do futuro", "purplish_red", "UXV"],
        exotic_processor: ["Circuito semicondutor supermagnético", "purplish_red", "UHV"],
        optical_assembly: ["Fluxo torrencial de fótons", "golden", "UHV"],
        optical_computer: ["Suporte a dados de computação em ultra-larga escala", "golden", "UEV"],
        optical_mainframe: ["Velocidade de cálculo infinitamente próxima à velocidade da luz", "golden", "UIV"],
        optical_processor: ["Transporte optoeletrônico de ultra-alta eficiência", "golden", "UV"],
        bioware_assembly: ["Parece possível ouvir sussurros sutis", "dark_green", "UV"],
        bioware_computer: ["Mofo limoso se espalha entre os metais", "dark_green", "UHV"],
        bioware_mainframe: ["Rede de consciência coletiva fúngica", "dark_green", "UEV"],
        bioware_processor: ["Plasma orgânico viscoso aderido à superfície", "dark_green", "ZPM"]
    }
    ForgeEvents.onEvent("net.minecraftforge.event.entity.player.ItemTooltipEvent", event => {
        if (!LDLib.isClient()) return
        const id = event.getItemStack().getId()
        const tooltip = event.getToolTip()
        const add = text => tooltip.add(Component.literal("§7" + text))
        const addColored = (text, color) => tooltip.add(Component.literal(TextUtil[color](text)))

        if (id.startsWith("kubejs:suprachronal_")) {
            let tier = id.substring("kubejs:suprachronal_".length)
            if (tiers.includes(tier)) {
                add("Opera fora do espaço e tempo conhecidos")
                addColored("Circuito de Nível " + tier.toUpperCase(), "white_blue")
            }
        }
        if (id.startsWith("kubejs:circuit_resonatic_")) {
            let tier = id.substring("kubejs:circuit_resonatic_".length)
            if (tiers.slice(0, 12).includes(tier)) add("§dCircuito de Nível " + tier.toUpperCase())
        }
        if (id === "gtceu:dimensionally_transcendent_dirt_forge") addColored("A primeira megaestrutura do homem primitivo", "full_color")
        if (id === "gtceu:door_of_create") addColored("O caminho da divindade se abre para você", "white_blue")
        if (id === "kubejs:create_ultimate_battery" || id === "kubejs:suprachronal_mainframe_complex") {
            add(id === "kubejs:create_ultimate_battery" ? "Capaz de gerar energia do nada" : "Capaz de gerar poder de computação do nada")
            add("Dispositivos comuns não podem usá-lo")
            tooltip.add(Component.literal("§2Nível - ").append(Component.literal(TextUtil.white_blue("Desconhecido"))))
        }
        if (id.startsWith("kubejs:")) {
            let name = id.substring(7)
            if (Object.prototype.hasOwnProperty.call(circuits, name)) {
                let entry = circuits[name]
                add(entry[0])
                addColored("Circuito de Nível " + entry[2], entry[1])
            }
        }
    })
})()
