// priority: 95
// 大型流体仓、星体材料及最高阶段机械部件。
// 由 gtceu.js 按既有阶段顺序执行，本文件只登记配方，不依赖文件名排序。
global.gtlPack.register("max_components", event => {
    const gtr = event.recipes.gtceu;

    for (let tier = 1; tier < GTValues.MAX; tier++) {
        gtr.assembler(GTCEu.id("huge_input_hatch_" + GTValues.VN[tier].toLowerCase()))
            .itemInputs(GTMachines.FLUID_IMPORT_HATCH[tier].asStack())
            .itemInputs(tier > GTValues.EV ? GTMachines.QUANTUM_TANK[tier].asStack() : GTMachines.SUPER_TANK[tier].asStack())
            .inputFluids("gtceu:soldering_alloy 144").itemOutputs(GTLMachines.HUGE_FLUID_IMPORT_HATCH[tier].asStack()).duration(200)
            .EUt(GTValues.VA[tier])

        gtr.assembler(GTCEu.id("huge_output_hatch_" + GTValues.VN[tier].toLowerCase()))
            .itemInputs(GTMachines.FLUID_EXPORT_HATCH[tier].asStack())
            .itemInputs(tier > GTValues.EV ? GTMachines.QUANTUM_TANK[tier].asStack() : GTMachines.SUPER_TANK[tier].asStack())
            .inputFluids("gtceu:soldering_alloy 144").itemOutputs(GTLMachines.HUGE_FLUID_EXPORT_HATCH[tier].asStack()).duration(200)
            .EUt(GTValues.VA[tier])
    }

    gtr.autoclave("kubejs:unstable_star")
        .notConsumable("gtceu:orichalcum_nanoswarm").itemInputs("gtceu:gravi_star").inputFluids("gtceu:adamantine 288")
        .itemOutputs("kubejs:unstable_star").EUt(GTValues.VA[GTValues.UV]).duration(480).addCondition(new GravityCondition(true))

    gtr.autoclave("kubejs:nuclear_star")
        .notConsumable("gtceu:cosmicneutronium_nanoswarm").itemInputs("kubejs:unstable_star").inputFluids("gtceu:infinity 288")
        .itemOutputs("kubejs:nuclear_star").EUt(GTValues.VA[GTValues.UIV]).duration(480).addCondition(new GravityCondition(true))

    gtr.suprachronal_assembly_line("gtlcore:max_electric_motor")
        .itemInputs("gtceu:long_magmatter_rod", "8x gtceu:long_transcendentmetal_rod", "8x gtceu:transcendentmetal_ring",
            "16x gtceu:transcendentmetal_round", "64x gtceu:fine_black_dwarf_mtter_wire", "64x gtceu:fine_black_dwarf_mtter_wire",
            "64x gtceu:fine_white_dwarf_mtter_wire", "64x gtceu:fine_white_dwarf_mtter_wire", "16x gtceu:cosmicneutronium_single_cable")
        .inputFluids("gtceu:super_mutated_living_solder " + 500 * 32, "gtceu:soldering_alloy " + 1000 * 32, "gtceu:lubricant " + 2000 * 32,
            "gtceu:infinity 576")
        .itemOutputs("gtlcore:max_electric_motor").EUt(GTValues.VA[GTValues.MAX]).duration(1200)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:opv_electric_motor")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(GTValues.VA[GTValues.MAX]).CWUt(4096))

    gtr.suprachronal_assembly_line("gtlcore:max_electric_pump")
        .itemInputs("gtlcore:max_electric_motor", "64x gtceu:neutronium_small_fluid_pipe", "4x gtceu:transcendentmetal_plate",
            "16x gtceu:transcendentmetal_screw", "4x gtceu:double_black_dwarf_mtter_plate", "4x gtceu:double_white_dwarf_mtter_plate",
            "gtceu:transcendentmetal_rotor", "16x gtceu:cosmicneutronium_single_cable")
        .inputFluids("gtceu:super_mutated_living_solder " + 576 * 32, "gtceu:soldering_alloy " + 1152 * 32, "gtceu:lubricant " + 2000 * 32,
            "gtceu:infinity 576")
        .itemOutputs("gtlcore:max_electric_pump").EUt(GTValues.VA[GTValues.MAX]).duration(1200)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:opv_electric_pump")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(GTValues.VA[GTValues.MAX]).CWUt(4096))

    gtr.suprachronal_assembly_line("gtlcore:max_conveyor_module")
        .itemInputs("2x gtlcore:max_electric_motor", "4x gtceu:transcendentmetal_plate", "8x gtceu:transcendentmetal_ring",
            "32x gtceu:transcendentmetal_round", "8x gtceu:transcendentmetal_screw", "8x gtceu:white_dwarf_mtter_plate",
            "8x gtceu:black_dwarf_mtter_plate", "16x gtceu:cosmicneutronium_single_cable")
        .inputFluids("gtceu:super_mutated_living_solder " + 576 * 32, "gtceu:lubricant " + 2000 * 32, "gtceu:styrene_butadiene_rubber " + 1152 * (3 + 32),
            "gtceu:infinity 576")
        .itemOutputs("gtlcore:max_conveyor_module").EUt(GTValues.VA[GTValues.MAX]).duration(1200)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:opv_conveyor_module")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(GTValues.VA[GTValues.MAX]).CWUt(4096))

    gtr.suprachronal_assembly_line("gtlcore:max_electric_piston")
        .itemInputs("gtlcore:max_electric_motor", "8x gtceu:transcendentmetal_plate", "8x gtceu:transcendentmetal_ring", "32x gtceu:transcendentmetal_round",
            "8x gtceu:transcendentmetal_rod", "2x gtceu:transcendentmetal_gear", "4x gtceu:small_transcendentmetal_gear",
            "16x gtceu:cosmicneutronium_single_cable")
        .inputFluids("gtceu:super_mutated_living_solder " + 576 * 32, "gtceu:soldering_alloy " + 1152 * 32, "gtceu:lubricant " + 2000 * 32,
            "gtceu:infinity 576")
        .itemOutputs("gtlcore:max_electric_piston").EUt(GTValues.VA[GTValues.MAX]).duration(1200)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:opv_electric_piston")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(GTValues.VA[GTValues.MAX]).CWUt(4096))

    gtr.suprachronal_assembly_line("gtlcore:max_robot_arm")
        .itemInputs("8x gtceu:long_transcendentmetal_rod", "2x gtceu:transcendentmetal_gear", "6x gtceu:small_transcendentmetal_gear",
            "4x gtlcore:max_electric_motor", "gtlcore:max_electric_piston", "#gtceu:circuits/max", "2x #gtceu:circuits/opv",
            "4x #gtceu:circuits/uxv", "16x gtceu:cosmicneutronium_single_cable")
        .inputFluids("gtceu:super_mutated_living_solder " + 576 * 32, "gtceu:soldering_alloy " + 1152 * 32, "gtceu:lubricant " + 2000 * 32,
            "gtceu:infinity 576")
        .itemOutputs("gtlcore:max_robot_arm").EUt(GTValues.VA[GTValues.MAX]).duration(1200)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:opv_robot_arm")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(GTValues.VA[GTValues.MAX]).CWUt(4096))

    gtr.suprachronal_assembly_line("gtlcore:max_emitter")
        .itemInputs("gtceu:infinity_frame", "gtlcore:max_electric_motor", "8x gtceu:long_transcendentmetal_rod", "4x kubejs:nuclear_star",
            "2x #gtceu:circuits/max", "64x gtceu:white_dwarf_mtter_foil", "64x gtceu:black_dwarf_mtter_foil", "64x gtceu:shirabon_foil",
            "64x gtceu:cosmic_foil", "32x gtceu:cosmicneutronium_single_cable")
        .inputFluids("gtceu:super_mutated_living_solder " + 1152 * 32, "gtceu:soldering_alloy " + 2304 * 32, "gtceu:infinity 576")
        .itemOutputs("gtlcore:max_emitter").EUt(GTValues.VA[GTValues.MAX]).duration(1200)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:opv_emitter")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(GTValues.VA[GTValues.MAX]).CWUt(6114))

    gtr.suprachronal_assembly_line("gtlcore:max_sensor")
        .itemInputs("gtceu:infinity_frame", "gtlcore:max_electric_motor", "8x gtceu:transcendentmetal_plate", "4x kubejs:nuclear_star",
            "2x #gtceu:circuits/max", "64x gtceu:white_dwarf_mtter_foil", "64x gtceu:black_dwarf_mtter_foil", "64x gtceu:shirabon_foil",
            "64x gtceu:cosmic_foil", "32x gtceu:cosmicneutronium_single_cable")
        .inputFluids("gtceu:super_mutated_living_solder " + 1152 * 32, "gtceu:soldering_alloy " + 2304 * 32, "gtceu:infinity 576")
        .itemOutputs("gtlcore:max_sensor").EUt(GTValues.VA[GTValues.MAX]).duration(1200)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:opv_sensor")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(GTValues.VA[GTValues.MAX]).CWUt(6114))

    gtr.suprachronal_assembly_line("gtlcore:max_field_generator")
        .itemInputs("gtceu:infinity_frame", "12x gtceu:chaos_plate", "4x kubejs:nuclear_star", "2x gtlcore:max_emitter", "2x #gtceu:circuits/max",
            "64x gtceu:fine_white_dwarf_mtter_wire", "64x gtceu:fine_black_dwarf_mtter_wire", "64x gtceu:fine_shirabon_wire",
            "64x gtceu:fine_cosmic_wire", "32x gtceu:cosmicneutronium_single_cable")
        .inputFluids("gtceu:super_mutated_living_solder " + 1152 * 32, "gtceu:soldering_alloy " + 2304 * 32, "gtceu:infinity 576")
        .itemOutputs("gtlcore:max_field_generator").EUt(GTValues.VA[GTValues.MAX]).duration(1200)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:opv_field_generator")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(GTValues.VA[GTValues.MAX]).CWUt(6114))
});
