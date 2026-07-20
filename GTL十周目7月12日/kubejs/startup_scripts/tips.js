ForgeEvents.onEvent("net.minecraftforge.event.entity.player.ItemTooltipEvent", event => {
    if (!LDLib.isClient()) return
    function addfull_colortooltip(text) {
        event.getToolTip().add(Component.literal(TextUtil.full_color(text)))
    }
    function adddark_purplish_redtooltip(text) {
        event.getToolTip().add(Component.literal(TextUtil.dark_purplish_red(text)))
    }
    function addwhite_bluetooltip(text) {
        event.getToolTip().add(Component.literal(TextUtil.white_blue(text)))
    }
    function addpurplish_redtooltip(text) {
        event.getToolTip().add(Component.literal(TextUtil.purplish_red(text)))
    }
    function addgoldentooltip(text) {
        event.getToolTip().add(Component.literal(TextUtil.golden(text)))
    }
    function adddark_greentooltip(text) {
        event.getToolTip().add(Component.literal(TextUtil.dark_green(text)))
    }
    function addtooltip(text) {
        event.getToolTip().add(Component.literal("§7" + text))
    }
    function unknown() {
        addtooltip("Dispositivos comuns não podem usá-lo")
        event.getToolTip().add(Component.literal("Nível §2-").append(Component.literal(TextUtil.white_blue("desconhecido"))))
    }
    const tiers = ["ulv", "lv", "mv", "hv", "ev", "iv", "luv", "zpm", "uv", "uhv", "uev", "uiv", "uxv", "opv", "max"]
    tiers.forEach((suprachronal) => {
        if (event.getItemStack().getId() == "kubejs:suprachronal_" + suprachronal) {
            addtooltip("Operando fora do espaço e tempo conhecidos")
            addwhite_bluetooltip(suprachronal.toUpperCase() + "circuito de nível")
        }
    })
    tiers.slice(0, 12).forEach((magneto_resonatic) => {
        if (event.getItemStack().getId() == "kubejs:circuit_resonatic_" + magneto_resonatic) {
            addtooltip("§d" + magneto_resonatic.toUpperCase() + "circuito de nível")
        }
    })
    switch (event.getItemStack().getId()) {
        case "gtceu:dimensionally_transcendent_dirt_forge":
            addfull_colortooltip("A primeira grande estrutura do homem primitivo")
            break
        case "gtceu:door_of_create":
            addwhite_bluetooltip("O caminho para ascender a Deus está aberto para você")
            break
        case "kubejs:create_ultimate_battery":
            addtooltip("Pode produzir energia do nada")
            unknown()
            break
        case "kubejs:suprachronal_mainframe_complex":
            addtooltip("Pode gerar poder de computação do nada")
            unknown()
            break
        case "kubejs:supracausal_mainframe":
            addtooltip("Aquele que une todas as coisas, o milagre original")
            addfull_colortooltip("Circuito de nível MAX")
            break
        case "kubejs:supracausal_computer":
            addtooltip("Sombra além do tempo")
            addfull_colortooltip("Circuito de nível OpV")
            break
        case "kubejs:supracausal_assembly":
            addtooltip("Cruzando a grande barreira diante da porta da verdade")
            addfull_colortooltip("Circuito de nível UXV")
            break
        case "kubejs:supracausal_processor":
            addtooltip("As leis do universo emergem aqui")
            addfull_colortooltip("Circuito de nível UIV")
            break
        case "kubejs:cosmic_assembly":
            addtooltip("Gire a manivela ligeiramente")
            adddark_purplish_redtooltip("Circuito de nível UIV")
            break
        case "kubejs:cosmic_computer":
            addtooltip("Pequenas coisas cuja densidade se aproxima de uma singularidade")
            adddark_purplish_redtooltip("Circuito de nível UXV")
            break
        case "kubejs:cosmic_mainframe":
            addtooltip("Simule tudo, analise tudo, entenda tudo")
            adddark_purplish_redtooltip("Circuito de nível OpV")
            break
        case "kubejs:cosmic_processor":
            addtooltip("Segurando as estrelas")
            adddark_purplish_redtooltip("Circuito de nível UEV")
            break
        case "kubejs:exotic_assembly":
            addtooltip("Caminhada Aleatória Quântica")
            addpurplish_redtooltip("Circuito de nível UEV")
            break
        case "kubejs:exotic_computer":
            addtooltip("Controle tudo com giro")
            addpurplish_redtooltip("Circuito de nível UIV")
            break
        case "kubejs:exotic_mainframe":
            addtooltip("Circuitos do futuro")
            addpurplish_redtooltip("Circuito de nível UXV")
            break
        case "kubejs:exotic_processor":
            addtooltip("Circuito semicondutor supermagnético")
            addpurplish_redtooltip("Circuito de grau UHV")
            break
        case "kubejs:optical_assembly":
            addtooltip("onda de fótons")
            addgoldentooltip("Circuito de grau UHV")
            break
        case "kubejs:optical_computer":
            addtooltip("Suporte a dados de computação em escala ultralarga")
            addgoldentooltip("Circuito de nível UEV")
            break
        case "kubejs:optical_mainframe":
            addtooltip("A velocidade de cálculo é infinitamente próxima da velocidade da luz")
            addgoldentooltip("Circuito de nível UIV")
            break
        case "kubejs:optical_processor":
            addtooltip("Transporte de fotoelétrons ultraeficiente")
            addgoldentooltip("Circuito de grau UV")
            break
        case "kubejs:bioware_assembly":
            addtooltip("Parece que você pode ouvir sussurros")
            adddark_greentooltip("Circuito de grau UV")
            break
        case "kubejs:bioware_computer":
            addtooltip("O metal está coberto de bolor limoso")
            adddark_greentooltip("Circuito de grau UHV")
            break
        case "kubejs:bioware_mainframe":
            addtooltip("Rede de Conscientização sobre Microbiota")
            adddark_greentooltip("Circuito de nível UEV")
            break
        case "kubejs:bioware_processor":
            addtooltip("Uma pasta orgânica espessa adere à superfície")
            adddark_greentooltip("Circuito de nível ZPM")
    }
})