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
        addtooltip("Ordinary devices cannot use it")
        event.getToolTip().add(Component.literal("§2level-").append(Component.literal(TextUtil.white_blue("unknown"))))
    }
    var tiers = ["ulv", "lv", "mv", "hv", "ev", "iv", "luv", "zpm", "uv", "uhv", "uev", "uiv", "uxv", "opv", "max"]
    tiers.forEach((suprachronal) => {
        if (event.getItemStack().getId() == "kubejs:suprachronal_" + suprachronal) {
            addtooltip("Operating outside known space and time")
            addwhite_bluetooltip(suprachronal.toUpperCase() + "level circuit")
        }
    })
    tiers.slice(0, 12).forEach((magneto_resonatic) => {
        if (event.getItemStack().getId() == "kubejs:circuit_resonatic_" + magneto_resonatic) {
            addtooltip("§d" + magneto_resonatic.toUpperCase() + "level circuit")
        }
    })
    switch (event.getItemStack().getId()) {
        case "gtceu:dimensionally_transcendent_dirt_forge":
            addfull_colortooltip("The first great structure of primitive man")
            break
        case "gtceu:door_of_create":
            addwhite_bluetooltip("The road to ascending to God is open for you")
            break
        case "kubejs:create_ultimate_battery":
            addtooltip("Can produce energy out of thin air")
            unknown()
            break
        case "kubejs:suprachronal_mainframe_complex":
            addtooltip("Can generate computing power out of thin air")
            unknown()
            break
        case "kubejs:supracausal_mainframe":
            addtooltip("The one who unites all things, the original miracle")
            addfull_colortooltip("MAX level circuit")
            break
        case "kubejs:supracausal_computer":
            addtooltip("Shadow beyond time")
            addfull_colortooltip("OpV level circuit")
            break
        case "kubejs:supracausal_assembly":
            addtooltip("Crossing the great barrier before the door of truth")
            addfull_colortooltip("UXV level circuit")
            break
        case "kubejs:supracausal_processor":
            addtooltip("The laws of the universe emerge here")
            addfull_colortooltip("UIV level circuit")
            break
        case "kubejs:cosmic_assembly":
            addtooltip("Turn the handle slightly")
            adddark_purplish_redtooltip("UIV level circuit")
            break
        case "kubejs:cosmic_computer":
            addtooltip("Small things whose density approaches a singularity")
            adddark_purplish_redtooltip("UXV level circuit")
            break
        case "kubejs:cosmic_mainframe":
            addtooltip("Simulate everything, analyze everything, understand everything")
            adddark_purplish_redtooltip("OpV level circuit")
            break
        case "kubejs:cosmic_processor":
            addtooltip("Holding the stars")
            adddark_purplish_redtooltip("UEV level circuit")
            break
        case "kubejs:exotic_assembly":
            addtooltip("Quantum Random Walk")
            addpurplish_redtooltip("UEV level circuit")
            break
        case "kubejs:exotic_computer":
            addtooltip("Control everything with spin")
            addpurplish_redtooltip("UIV level circuit")
            break
        case "kubejs:exotic_mainframe":
            addtooltip("Circuits from the future")
            addpurplish_redtooltip("UXV level circuit")
            break
        case "kubejs:exotic_processor":
            addtooltip("Super magnetic semiconductor circuit")
            addpurplish_redtooltip("UHV grade circuit")
            break
        case "kubejs:optical_assembly":
            addtooltip("photon surge")
            addgoldentooltip("UHV grade circuit")
            break
        case "kubejs:optical_computer":
            addtooltip("Ultra-large-scale computing data support")
            addgoldentooltip("UEV level circuit")
            break
        case "kubejs:optical_mainframe":
            addtooltip("The calculation speed is infinitely close to the speed of light")
            addgoldentooltip("UIV level circuit")
            break
        case "kubejs:optical_processor":
            addtooltip("Ultra-efficient photoelectron transport")
            addgoldentooltip("UV grade circuit")
            break
        case "kubejs:bioware_assembly":
            addtooltip("It seems like you can hear whispers")
            adddark_greentooltip("UV grade circuit")
            break
        case "kubejs:bioware_computer":
            addtooltip("The metal is covered with slime mold")
            adddark_greentooltip("UHV grade circuit")
            break
        case "kubejs:bioware_mainframe":
            addtooltip("Microbiota Awareness Network")
            adddark_greentooltip("UEV level circuit")
            break
        case "kubejs:bioware_processor":
            addtooltip("A thick organic slurry adheres to the surface")
            adddark_greentooltip("ZPM level circuit")
    }
})