// priority: 95
// 本文件按功能保存配方阶段，实际执行顺序统一由配方入口管理。

// 整合应用能源控制器、处理器、线缆、样板和存储组件。
global.gtlPack.register("integration_storage", event => {
    const gtr = event.recipes.gtceu
    event.shapeless("gtlcore:item_infinity_cell", ["ae2:item_cell_housing", "gtlcore:infinite_cell_component"])
    event.shapeless("gtlcore:fluid_infinity_cell", ["ae2:fluid_cell_housing", "gtlcore:infinite_cell_component"])
    event.shapeless("gtlcore:pattern_modifier", "expatternprovider:pattern_modifier")
    event.shaped("ae2:creative_energy_cell", ["AAA", "ADA", "AAA"], {
        A: "ae2:dense_energy_cell",
        D: "gtceu:hv_field_generator"
    })
    event.shaped("ae2:crafting_unit", ["PCP", "KMK", "PLP"], {
        P: "gtceu:aluminium_plate",
        C: "ae2:calculation_processor",
        K: "ae2:fluix_glass_cable",
        M: "#gtceu:circuits/mv",
        L: "ae2:logic_processor"
    })
    event.shaped("2x ae2:advanced_card", ["WP ", "ACP", "SP "], {
        W: "#forge:fine_wires/red_alloy", P: "#forge:plates/stainless_steel",
        A: "ae2:engineering_processor", C: "#gtceu:circuits/hv", S: "#forge:fine_wires/silver"
    })
    event.shaped("2x ae2:basic_card", ["WP ", "ACP", "SP "], {
        W: "#forge:fine_wires/red_alloy", P: "#forge:plates/aluminium",
        A: "ae2:engineering_processor", C: "#gtceu:circuits/mv", S: "#forge:fine_wires/gold"
    })
    event.shaped("ae2:annihilation_core", ["CPB"], {
        C: "#gtceu:circuits/ulv", P: "ae2:logic_processor", B: "#forge:dusts/nether_quartz"
    })
    event.shaped("ae2:formation_core", ["CPB"], {
        C: "#gtceu:circuits/ulv", P: "ae2:logic_processor", B: "#forge:dusts/certus_quartz"
    })
    event.shaped("ae2:wireless_receiver", ["CPC", "RSR", "   "], {
        C: "#gtceu:circuits/ev", P: "ae2:fluix_pearl", R: "#forge:rods/titanium", S: "gtceu:hv_sensor"
    })
    event.shaped("ae2:import_bus", ["IPC"], {
        I: "ae2:annihilation_core", P: "gtceu:lv_robot_arm", C: "ae2:fluix_glass_cable"
    })
    event.shaped("ae2:export_bus", ["IPC"], {
        I: "ae2:formation_core", P: "gtceu:lv_robot_arm", C: "ae2:fluix_glass_cable"
    })
    global.gtlPack.batch(gtr, "forming_press", [["notConsumable", "ae2:silicon_press"], "notConsumable", "itemInputs", "itemOutputs", "duration", "EUt"], [
        ["ae2:logic_processor", ["ae2:logic_processor_press"], ["#forge:plates/gold", "ae2:silicon", "#forge:plates/redstone"], ["ae2:logic_processor"], [200], [30]],
        ["ae2:logic_processor1", ["ae2:logic_processor_press"], ["gtceu:gold_dust", "gtceu:silicon_dust", "minecraft:redstone"], ["ae2:logic_processor"], [20], [480]],
        ["ae2:calculation_processor", ["ae2:calculation_processor_press"], ["#forge:plates/certus_quartz", "ae2:silicon", "#forge:plates/redstone"], ["ae2:calculation_processor"], [200], [30]],
        ["ae2:calculation_processor1", ["ae2:calculation_processor_press"], ["gtceu:certus_quartz_dust", "gtceu:silicon_dust", "minecraft:redstone"], ["ae2:calculation_processor"], [20], [480]],
        ["ae2:engineering_processor1", ["ae2:engineering_processor_press"], ["#forge:plates/diamond", "ae2:silicon", "#forge:plates/redstone"], ["ae2:engineering_processor"], [200], [30]],
        ["ae2:engineering_processor", ["ae2:engineering_processor_press"], ["gtceu:diamond_dust", "gtceu:silicon_dust", "minecraft:redstone"], ["ae2:engineering_processor"], [20], [480]]
    ]);
    gtr.mixer("ae2:fluix_dust")
        .itemInputs("#forge:dusts/nether_quartz", "#forge:dusts/certus_quartz", "#forge:dusts/redstone")
        .itemOutputs("3x ae2:fluix_dust").duration(200).EUt(16)
    global.gtlPack.batch(gtr, "autoclave", [["itemInputs", "#forge:dusts/fluix"], "inputFluids", ["itemOutputs", "ae2:fluix_crystal"], "duration", ["EUt", 24]], [
        ["ae2:fluix_crystal_1", ["water 250"], [1200]],
        ["ae2:fluix_crystal_2", ["gtceu:distilled_water 50"], [600]]
    ]);
    global.gtlPack.batch(gtr, "macerator", ["itemInputs", "itemOutputs", "EUt", "duration"], [
        ["gtceu:silicon_dust", ["ae2:silicon"], ["gtceu:silicon_dust"], [16], [200]],
        ["ae2:fluix_dust", ["ae2:fluix_crystal"], ["ae2:fluix_dust"], [2], [240]],
        ["ae2:sky_dust", ["ae2:sky_stone_block"], ["ae2:sky_dust"], [2], [200]]
    ]);
    global.gtlPack.batch(gtr, "assembler", [["itemInputs", "ae2:fluix_glass_cable"], "inputFluids", ["itemOutputs", "ae2:fluix_covered_cable"], ["EUt", 30], ["duration", 20]], [
        ["ae2:fluix_covered_cable", ["gtceu:rubber 4"]],
        ["ae2:fluix_covered_cable1", ["gtceu:silicone_rubber 2"]],
        ["ae2:fluix_covered_cable2", ["gtceu:styrene_butadiene_rubber 1"]]
    ]);
    const blankPatterns = [
        { id: "gtceu:blank_pattern", plate: "#forge:plates/polyethylene", out: 1, glass: 144, eu: 120 },
        { id: "gtceu:blank_pattern_good", plate: "#forge:plates/polyvinyl_chloride", out: 4, glass: 288, eu: 120 },
        { id: "gtceu:blank_pattern_better", plate: "#forge:plates/polytetrafluoroethylene", out: 16, glass: 576, eu: 480 },
        { id: "gtceu:blank_pattern_best", plate: "#forge:plates/polybenzimidazole", out: 64, glass: 1152, eu: 480 }
    ]
    blankPatterns.forEach(p => {
        gtr.assembler(p.id)
            .itemInputs("3x #forge:plates/steel", "2x " + p.plate, "4x #forge:fine_wires/red_alloy", "#gtceu:circuits/mv")
            .itemOutputs(p.out + "x ae2:blank_pattern")
            .inputFluids("gtceu:glass " + p.glass)
            .duration(200).EUt(p.eu)
    })
    gtr.chemical_bath("ae2:flawless_budding_quartz")
        .itemInputs("ae2:flawed_budding_quartz")
        .inputFluids("minecraft:water 1000")
        .itemOutputs("ae2:flawless_budding_quartz")
        .EUt(30).duration(400)
    function getCellComponent(index) {
        return index > 4 ? `gtlcore:cell_component_${4 ** (index - 5)}m` : `ae2:cell_component_${4 ** index}k`
    }
    for (let index = 0; index < 5; index++) {
        event.shapeless(`gtlcore:${4 ** index}m_storage`, ["ae2:crafting_unit", getCellComponent(index + 5)])
        event.shapeless(`gtlcore:item_storage_cell_${4 ** index}m`, ["ae2:item_cell_housing", getCellComponent(index + 5)])
        event.shapeless(`gtlcore:fluid_storage_cell_${4 ** index}m`, ["ae2:fluid_cell_housing", getCellComponent(index + 5)])
        event.shaped(`gtlcore:item_storage_cell_${4 ** index}m`, ["ABA", "BDB", "CCC"], {
            A: "ae2:quartz_glass", B: "minecraft:redstone", C: "minecraft:iron_ingot", D: getCellComponent(index + 5)
        })
        event.shaped(`gtlcore:fluid_storage_cell_${4 ** index}m`, ["ABA", "BDB", "CCC"], {
            A: "ae2:quartz_glass", B: "minecraft:redstone", C: "minecraft:copper_ingot", D: getCellComponent(index + 5)
        })
    }
    const cellTiers = ["ulv", "lv", "mv", "hv", "ev", "iv", "luv", "zpm", "uv"]
    for (let index = 1; index < 10; index++) {
        gtr.assembler(getCellComponent(index))
            .itemInputs(getCellComponent(index - 1), "2x #gtceu:circuits/" + cellTiers[index - 1], "ae2:logic_processor", index > 4 ? "ae2:engineering_processor" : "gtceu:redstone_plate", "ae2:calculation_processor", "gtceu:quartzite_plate")
            .inputFluids("gtceu:soldering_alloy 72")
            .itemOutputs(getCellComponent(index))
            .EUt(GTValues.VA[index - 1] / 4)
            .duration(200)
    }
    gtr.assembly_line("gtlcore:max_storage")
        .itemInputs("ae2:crafting_unit", "16x gtlcore:cell_component_256m", "gtceu:data_bank", "16x gtceu:data_orb", "4x #gtceu:circuits/uhv", "4x gtceu:double_red_steel_plate")
        .inputFluids("gtceu:soldering_alloy 576", "gtceu:pcb_coolant 2000")
        .itemOutputs("gtlcore:max_storage")
        .EUt(GTValues.VA[GTValues.UV]).duration(400)
    ["scannerResearch(java.util.function.UnaryOperator)"](b => b.researchStack(Registries.getItemStack("gtlcore:256m_storage"))
        .dataStack(Registries.getItemStack("gtceu:data_stick"))
        .EUt(GTValues.VA[GTValues.LuV])
        .duration(1200))
    gtr.assembly_line("gtlcore:infinite_cell_component")
        .itemInputs("16x gtlcore:max_storage", "gtceu:data_bank", "16x gtceu:data_module", "64x ae2:creative_energy_cell", "64x #gtceu:circuits/uev", "64x gtceu:ruthenium_trinium_americium_neutronate_hex_wire", "4x gtceu:double_neutronium_plate")
        .inputFluids("gtceu:mutated_living_solder 20000", "gtceu:tairitsu 20000", "gtceu:pcb_coolant 100000")
        .itemOutputs("gtlcore:infinite_cell_component")
        .EUt(GTValues.VA[GTValues.UHV]).duration(2400)
    ["scannerResearch(java.util.function.UnaryOperator)"](b => b.researchStack(Registries.getItemStack("gtlcore:cell_component_256m"))
        .dataStack(Registries.getItemStack("gtceu:data_orb"))
        .EUt(GTValues.VA[GTValues.UV])
        .duration(2400))
    for (let index = 0; index < 33; index++) {
        event.shaped(Item.of("expatternprovider:infinity_cell", `{record:{"#c":"ae2:i",id:"gtceu:programmed_circuit",tag:{Configuration:${index}}}}`), [
            "BAB", "ADA", "CCC"
        ], {
            A: Item.of("gtceu:programmed_circuit", `{Configuration:${index}}`).weakNBT(),
            B: "ae2:quartz_glass",
            C: "minecraft:diamond",
            D: "ae2:cell_component_16k"
        })
    }
})

// 使用闪电处理器充能赛特斯水晶并合成福鲁伊克斯材料。
global.gtlPack.register("integration_storage_crystals", event => {
    const gtr = event.recipes.gtceu
    gtr.lightning_processor("ae2:charged_certus_quartz_crystal")
        .itemInputs("gtceu:certus_quartz_gem")
        .itemOutputs("ae2:charged_certus_quartz_crystal")
        .circuit(1).EUt(30).duration(60)
    gtr.lightning_processor("ae2:fluix_crystal")
        .itemInputs("minecraft:redstone", "minecraft:quartz", "gtceu:certus_quartz_gem")
        .inputFluids("minecraft:water 1000")
        .itemOutputs("2x ae2:fluix_crystal")
        .EUt(30).duration(80)
    gtr.lightning_processor("ae2:fluix_pearl")
        .itemInputs("minecraft:ender_pearl", "8x ae2:fluix_crystal")
        .itemOutputs("ae2:fluix_pearl")
        .EUt(30).duration(160)
})
