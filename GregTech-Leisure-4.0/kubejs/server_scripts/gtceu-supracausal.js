//priority: 96
ServerEvents.recipes((event) => {
    const gtr = event.recipes.gtceu

    //supracausal
    gtr.assembler("kubejs:smd_capacitor_supracausal")
        .notConsumable("kubejs:microwormhole_generator")
        .itemInputs("gtceu:adamantine_plate")
        .itemOutputs("32x kubejs:smd_capacitor_supracausal")
        .inputFluids("gtceu:radox 144")
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(400)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.assembler("kubejs:smd_diode_supracausal")
        .notConsumable("kubejs:microwormhole_generator")
        .itemInputs("gtceu:vibramantium_plate")
        .itemOutputs("32x kubejs:smd_diode_supracausal")
        .inputFluids("gtceu:radox 144")
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(400)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.assembler("kubejs:smd_transistor_supracausal")
        .notConsumable("kubejs:microwormhole_generator")
        .itemInputs("gtceu:neutronium_plate")
        .itemOutputs("32x kubejs:smd_transistor_supracausal")
        .inputFluids("gtceu:radox 144")
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(400)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.assembler("kubejs:smd_resistor_supracausal")
        .notConsumable("kubejs:microwormhole_generator")
        .itemInputs("gtceu:fullerene_polymer_matrix_pulp_foil")
        .itemOutputs("32x kubejs:smd_resistor_supracausal")
        .inputFluids("gtceu:radox 144")
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(400)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.assembler("kubejs:smd_inductor_supracausal")
        .notConsumable("kubejs:microwormhole_generator")
        .itemInputs("gtceu:draconium_ring")
        .itemOutputs("32x kubejs:smd_inductor_supracausal")
        .inputFluids("gtceu:radox 144")
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(400)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.circuit_assembler("kubejs:supracausal_processor")
        .itemInputs("kubejs:supracausal_processing_core", "4x kubejs:supracausal_ram_chip", "16x kubejs:cosmic_processing_unit_core", "kubejs:microwormhole_generator", "kubejs:manifold_oscillatory_power_cell", "gtceu:crystalmatrix_plate")
        .itemOutputs("2x kubejs:supracausal_processor")
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(100)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.circuit_assembly_line("kubejs:supracausal_assembly")
        .notConsumable("kubejs:precision_circuit_assembly_robot_mk5")
        .itemInputs("kubejs:supracausal_printed_circuit_board",
            "2x kubejs:supracausal_processor",
            "16x kubejs:smd_capacitor_supracausal",
            "16x kubejs:smd_diode_supracausal",
            "16x kubejs:smd_resistor_supracausal",
            "16x kubejs:smd_transistor_supracausal",
            "16x kubejs:smd_inductor_supracausal",
            "kubejs:awakened_core",
            "64x gtceu:fine_heavy_quark_degenerate_matter_wire",
            "16x gtceu:radox_foil",
            "8x gtceu:legendarium_single_wire",
            "8x kubejs:optical_soc",
            "kubejs:recursively_folded_negative_space",
            "kubejs:contained_exotic_matter",
            "16x gtceu:trinium_titanium_plate")
        .inputFluids("gtceu:taranium 432", "gtceu:trinium_titanium 1296", "gtceu:adamantine 576", "gtceu:fullerene_polymer_matrix_pulp 2304")
        .EUt(GTValues.VA[GTValues.UXV])
        .itemOutputs("kubejs:supracausal_assembly")
        .duration(200)

    gtr.circuit_assembly_line("kubejs:supracausal_computer")
        .notConsumable("kubejs:precision_circuit_assembly_robot_mk5")
        .itemInputs("kubejs:supracausal_printed_circuit_board",
            "2x kubejs:supracausal_assembly",
            "32x kubejs:smd_capacitor_supracausal",
            "32x kubejs:smd_diode_supracausal",
            "32x kubejs:smd_resistor_supracausal",
            "32x kubejs:smd_transistor_supracausal",
            "32x kubejs:smd_inductor_supracausal",
            "32x kubejs:supracausal_ram_chip",
            "16x gtceu:data_module",
            "32x gtceu:trinium_titanium_plate",
            "64x gtceu:legendarium_single_wire",
            "16x gtceu:starmetal_plate",
            "kubejs:nuclear_star",
            "kubejs:eigenfolded_kerr_manifold",
            "4x gtceu:cosmicneutronium_plate")
        .inputFluids("gtceu:taranium 288", "gtceu:trinium_titanium 1296", "gtceu:adamantine 432", "gtceu:fullerene_polymer_matrix_pulp 864")
        .EUt(GTValues.VA[GTValues.UXV])
        .itemOutputs("kubejs:supracausal_computer")
        .duration(200)

    gtr.circuit_assembly_line("kubejs:supracausal_mainframe")
        .notConsumable("kubejs:precision_circuit_assembly_robot_mk5")
        .itemInputs("2x gtceu:infinity_frame",
            "2x kubejs:supracausal_computer",
            "64x kubejs:smd_capacitor_supracausal",
            "64x kubejs:smd_diode_supracausal",
            "64x kubejs:smd_resistor_supracausal",
            "64x kubejs:smd_transistor_supracausal",
            "64x kubejs:smd_inductor_supracausal",
            "64x gtceu:radox_plate",
            "64x gtceu:draconiumawakened_double_wire",
            "64x kubejs:cosmic_fabric",
            "32x kubejs:cosmic_processing_unit_core",
            "8x kubejs:ultrashort_pulse_laser",
            "2x kubejs:nuclear_star",
            "kubejs:ctc_computational_unit",
            "64x gtceu:quantumchromodynamically_confined_matter_plate")
        .inputFluids("gtceu:taranium 9216", "gtceu:adamantine 9216", "gtceu:fullerene_polymer_matrix_pulp 9216", "gtceu:periodicium 9216")
        .EUt(GTValues.VA[GTValues.UXV])
        .itemOutputs("kubejs:supracausal_mainframe")
        .duration(400)

    tiers.forEach((c) => {
        gtr.packer("kubejs:" + c[0] + "_universal_circuit")
            .itemInputs("#gtceu:circuits/" + c[0])
            .itemOutputs("kubejs:" + c[0] + "_universal_circuit")
            .EUt(7)
            .duration(2 ** (c[1] + 1))
    })

    tiers.forEach((c) => {
        gtr.suprachronal_assembly_line("kubejs:suprachronal_" + c[0])
            .notConsumable("kubejs:hyperdimensional_drone")
            .itemInputs("kubejs:timepiece")
            .inputFluids("gtceu:spacetime " + (c[1] + 1), "gtceu:raw_star_matter_plasma " + (c[1] + 1) * 10, "gtceu:uu_matter " + (c[1] + 1) * 100, "gtceu:periodicium " + (c[1] + 1) * 100)
            .itemOutputs("kubejs:suprachronal_" + c[0])
            .duration(2 * (c[1] + 1))
            .circuit((c[1] + 1))
            .EUt(GTValues.VA[GTValues.MAX])
            .stationResearch(b => b.researchStack(Registries.getItemStack((c[1] + 1) == 1 ? "kubejs:supracausal_mainframe" : "kubejs:suprachronal_" + tiers[(c[1] + 1) - 2][0]))
                .dataStack(Registries.getItemStack("gtceu:data_module"))
                .EUt(GTValues.VA[GTValues.MAX])
                .CWUt(8192))
    })

    for (let tier = 1; tier < GTValues.MAX; tier++) {
        gtr.assembler(GTCEu.id("huge_input_hatch_" + GTValues.VN[tier].toLowerCase()))
            .itemInputs(GTMachines.FLUID_IMPORT_HATCH[tier].asStack())
            .itemInputs((tier > GTValues.EV ? GTMachines.QUANTUM_TANK[tier].asStack() : GTMachines.SUPER_TANK[tier].asStack()))
            .inputFluids("gtceu:soldering_alloy 144")
            .itemOutputs(GTLMachines.HUGE_FLUID_IMPORT_HATCH[tier].asStack())
            .duration(200)
            .EUt(GTValues.VA[tier])

        gtr.assembler(GTCEu.id("huge_output_hatch_" + GTValues.VN[tier].toLowerCase()))
            .itemInputs(GTMachines.FLUID_EXPORT_HATCH[tier].asStack())
            .itemInputs((tier > GTValues.EV ? GTMachines.QUANTUM_TANK[tier].asStack() : GTMachines.SUPER_TANK[tier].asStack()))
            .inputFluids("gtceu:soldering_alloy 144")
            .itemOutputs(GTLMachines.HUGE_FLUID_EXPORT_HATCH[tier].asStack())
            .duration(200)
            .EUt(GTValues.VA[tier])
    }

    gtr.autoclave("kubejs:unstable_star")
        .notConsumable("gtceu:orichalcum_nanoswarm")
        .itemInputs("gtceu:gravi_star")
        .inputFluids("gtceu:adamantine 288")
        .itemOutputs("kubejs:unstable_star")
        .EUt(GTValues.VA[GTValues.UV])
        .duration(480)
        .addCondition(new GravityCondition(true))

    gtr.autoclave("kubejs:nuclear_star")
        .notConsumable("gtceu:cosmicneutronium_nanoswarm")
        .itemInputs("kubejs:unstable_star")
        .inputFluids("gtceu:infinity 288")
        .itemOutputs("kubejs:nuclear_star")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(480)
        .addCondition(new GravityCondition(true))

    gtr.suprachronal_assembly_line("gtlcore:max_electric_motor")
        .itemInputs("gtceu:long_magmatter_rod",
            "8x gtceu:long_transcendentmetal_rod",
            "8x gtceu:transcendentmetal_ring",
            "16x gtceu:transcendentmetal_round",
            "64x gtceu:fine_black_dwarf_mtter_wire",
            "64x gtceu:fine_black_dwarf_mtter_wire",
            "64x gtceu:fine_white_dwarf_mtter_wire",
            "64x gtceu:fine_white_dwarf_mtter_wire",
            "16x gtceu:cosmicneutronium_single_cable")
        .inputFluids("gtceu:super_mutated_living_solder " + 500 * 32, "gtceu:soldering_alloy " + 1000 * 32, "gtceu:lubricant " + 2000 * 32, "gtceu:infinity 576")
        .itemOutputs("gtlcore:max_electric_motor")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(1200)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:opv_electric_motor"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.MAX])
            .CWUt(4096))

    gtr.suprachronal_assembly_line("gtlcore:max_electric_pump")
        .itemInputs("gtlcore:max_electric_motor",
            "64x gtceu:neutronium_small_fluid_pipe",
            "4x gtceu:transcendentmetal_plate",
            "16x gtceu:transcendentmetal_screw",
            "4x gtceu:double_black_dwarf_mtter_plate",
            "4x gtceu:double_white_dwarf_mtter_plate",
            "gtceu:transcendentmetal_rotor",
            "16x gtceu:cosmicneutronium_single_cable")
        .inputFluids("gtceu:super_mutated_living_solder " + 576 * 32, "gtceu:soldering_alloy " + 1152 * 32, "gtceu:lubricant " + 2000 * 32, "gtceu:infinity 576")
        .itemOutputs("gtlcore:max_electric_pump")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(1200)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:opv_electric_pump"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.MAX])
            .CWUt(4096))

    gtr.suprachronal_assembly_line("gtlcore:max_conveyor_module")
        .itemInputs("2x gtlcore:max_electric_motor",
            "4x gtceu:transcendentmetal_plate",
            "8x gtceu:transcendentmetal_ring",
            "32x gtceu:transcendentmetal_round",
            "8x gtceu:transcendentmetal_screw",
            "8x gtceu:white_dwarf_mtter_plate",
            "8x gtceu:black_dwarf_mtter_plate",
            "16x gtceu:cosmicneutronium_single_cable")
        .inputFluids("gtceu:super_mutated_living_solder " + 576 * 32, "gtceu:lubricant " + 2000 * 32, "gtceu:styrene_butadiene_rubber " + 1152 * (3 + 32), "gtceu:infinity 576")
        .itemOutputs("gtlcore:max_conveyor_module")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(1200)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:opv_conveyor_module"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.MAX])
            .CWUt(4096))

    gtr.suprachronal_assembly_line("gtlcore:max_electric_piston")
        .itemInputs("gtlcore:max_electric_motor",
            "8x gtceu:transcendentmetal_plate",
            "8x gtceu:transcendentmetal_ring",
            "32x gtceu:transcendentmetal_round",
            "8x gtceu:transcendentmetal_rod",
            "2x gtceu:transcendentmetal_gear",
            "4x gtceu:small_transcendentmetal_gear",
            "16x gtceu:cosmicneutronium_single_cable")
        .inputFluids("gtceu:super_mutated_living_solder " + 576 * 32, "gtceu:soldering_alloy " + 1152 * 32, "gtceu:lubricant " + 2000 * 32, "gtceu:infinity 576")
        .itemOutputs("gtlcore:max_electric_piston")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(1200)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:opv_electric_piston"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.MAX])
            .CWUt(4096))

    gtr.suprachronal_assembly_line("gtlcore:max_robot_arm")
        .itemInputs("8x gtceu:long_transcendentmetal_rod",
            "2x gtceu:transcendentmetal_gear",
            "6x gtceu:small_transcendentmetal_gear",
            "4x gtlcore:max_electric_motor",
            "gtlcore:max_electric_piston",
            "#gtceu:circuits/max",
            "2x #gtceu:circuits/opv",
            "4x #gtceu:circuits/uxv",
            "16x gtceu:cosmicneutronium_single_cable")
        .inputFluids("gtceu:super_mutated_living_solder " + 576 * 32, "gtceu:soldering_alloy " + 1152 * 32, "gtceu:lubricant " + 2000 * 32, "gtceu:infinity 576")
        .itemOutputs("gtlcore:max_robot_arm")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(1200)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:opv_robot_arm"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.MAX])
            .CWUt(4096))

    gtr.suprachronal_assembly_line("gtlcore:max_emitter")
        .itemInputs("gtceu:infinity_frame",
            "gtlcore:max_electric_motor",
            "8x gtceu:long_transcendentmetal_rod",
            "4x kubejs:nuclear_star",
            "2x #gtceu:circuits/max",
            "64x gtceu:white_dwarf_mtter_foil",
            "64x gtceu:black_dwarf_mtter_foil",
            "64x gtceu:shirabon_foil",
            "64x gtceu:cosmic_foil",
            "32x gtceu:cosmicneutronium_single_cable")
        .inputFluids("gtceu:super_mutated_living_solder " + 1152 * 32, "gtceu:soldering_alloy " + 2304 * 32, "gtceu:infinity 576")
        .itemOutputs("gtlcore:max_emitter")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(1200)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:opv_emitter"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.MAX])
            .CWUt(6114))

    gtr.suprachronal_assembly_line("gtlcore:max_sensor")
        .itemInputs("gtceu:infinity_frame",
            "gtlcore:max_electric_motor",
            "8x gtceu:transcendentmetal_plate",
            "4x kubejs:nuclear_star",
            "2x #gtceu:circuits/max",
            "64x gtceu:white_dwarf_mtter_foil",
            "64x gtceu:black_dwarf_mtter_foil",
            "64x gtceu:shirabon_foil",
            "64x gtceu:cosmic_foil",
            "32x gtceu:cosmicneutronium_single_cable")
        .inputFluids("gtceu:super_mutated_living_solder " + 1152 * 32, "gtceu:soldering_alloy " + 2304 * 32, "gtceu:infinity 576")
        .itemOutputs("gtlcore:max_sensor")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(1200)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:opv_sensor"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.MAX])
            .CWUt(6114))

    gtr.suprachronal_assembly_line("gtlcore:max_field_generator")
        .itemInputs("gtceu:infinity_frame",
            "12x gtceu:chaos_plate",
            "4x kubejs:nuclear_star",
            "2x gtlcore:max_emitter",
            "2x #gtceu:circuits/max",
            "64x gtceu:fine_white_dwarf_mtter_wire",
            "64x gtceu:fine_black_dwarf_mtter_wire",
            "64x gtceu:fine_shirabon_wire",
            "64x gtceu:fine_cosmic_wire",
            "32x gtceu:cosmicneutronium_single_cable")
        .inputFluids("gtceu:super_mutated_living_solder " + 1152 * 32, "gtceu:soldering_alloy " + 2304 * 32, "gtceu:infinity 576")
        .itemOutputs("gtlcore:max_field_generator")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(1200)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:opv_field_generator"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.MAX])
            .CWUt(6114))

    gtr.assembler_module("kubejs:space_probe_mk1")
        .itemInputs("gtceu:energy_module",
            "4x gtceu:data_module",
            "2x gtceu:uiv_emitter",
            "2x gtceu:uiv_sensor",
            "gtceu:uiv_field_generator",
            "4x gtceu:adamantium_plate")
        .inputFluids("gtceu:mutated_living_solder 1296", "gtceu:soldering_alloy 2880", "gtceu:lubricant 5760", "gtceu:neutronium 1296")
        .itemOutputs("kubejs:space_probe_mk1")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(400)
        .addData("SEPMTier", 3)

    gtr.assembler_module("kubejs:space_probe_mk2")
        .itemInputs("gtceu:energy_cluster",
            "16x gtceu:data_module",
            "2x gtceu:uxv_emitter",
            "2x gtceu:uxv_sensor",
            "gtceu:uxv_field_generator",
            "4x gtceu:vibranium_plate",
            "8x gtceu:celestialtungsten_plate")
        .inputFluids("gtceu:mutated_living_solder 1296", "gtceu:soldering_alloy 2880", "gtceu:lubricant 5760", "gtceu:neutronium 1296")
        .itemOutputs("kubejs:space_probe_mk2")
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(400)
        .addData("SEPMTier", 4)

    gtr.assembler_module("kubejs:space_probe_mk3")
        .itemInputs("gtceu:max_battery",
            "64x gtceu:data_module",
            "2x gtceu:opv_emitter",
            "2x gtceu:opv_sensor",
            "gtceu:opv_field_generator",
            "gtceu:cosmicneutronium_nanoswarm",
            "4x gtceu:draconium_plate")
        .inputFluids("gtceu:super_mutated_living_solder 1296", "gtceu:mutated_living_solder 2880", "gtceu:lubricant 5760", "gtceu:cosmicneutronium 1296")
        .itemOutputs("kubejs:space_probe_mk3")
        .EUt(GTValues.VA[GTValues.OpV])
        .duration(400)
        .addData("SEPMTier", 5)

    gtr.assembler_module("kubejs:space_drone_mk1")
        .itemInputs("gtceu:titanium_drill_head",
            "4x gtceu:ev_vanadium_battery",
            "4x #gtceu:circuits/uv",
            "ae2:wireless_receiver",
            "gtceu:uv_electric_pump",
            "gtceu:uv_electric_piston",
            "2x gtceu:uv_electric_motor",
            "2x gtceu:uv_conveyor_module",
            "2x gtceu:uv_robot_arm",
            "gtceu:uv_sensor",
            "gtceu:uv_emitter",
            "4x gtceu:tritanium_quadruple_wire",
            "4x gtceu:power_thruster",
            "2x gtceu:steel_minecart_wheels",
            "4x gtceu:steel_spring",
            "8x gtceu:darmstadtium_plate")
        .inputFluids("gtceu:soldering_alloy 2880", "gtceu:manganese 2880", "gtceu:potin 2880", "gtceu:ultimet 2880")
        .itemOutputs("kubejs:space_drone_mk1")
        .EUt(GTValues.VA[GTValues.UV])
        .duration(600)
        .addData("SEPMTier", 1)

    gtr.assembler_module("kubejs:space_drone_mk2")
        .itemInputs("gtceu:ultimet_drill_head",
            "16x gtceu:ev_vanadium_battery",
            "4x #gtceu:circuits/uhv",
            "ae2:wireless_receiver",
            "gtceu:uhv_electric_pump",
            "gtceu:uhv_electric_piston",
            "2x gtceu:uhv_electric_motor",
            "2x gtceu:uhv_conveyor_module",
            "2x gtceu:uhv_robot_arm",
            "gtceu:uhv_sensor",
            "gtceu:uhv_emitter",
            "4x gtceu:abyssalalloy_quadruple_wire",
            "4x gtceu:power_thruster",
            "2x gtceu:steel_minecart_wheels",
            "4x gtceu:steel_spring",
            "8x gtceu:neutronium_plate")
        .inputFluids("gtceu:soldering_alloy 2880", "gtceu:steel 2880", "gtceu:electrum 2880", "gtceu:vanadium_steel 2880")
        .itemOutputs("kubejs:space_drone_mk2")
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(600)
        .addData("SEPMTier", 1)

    gtr.assembler_module("kubejs:space_drone_mk3")
        .itemInputs("gtceu:hsse_drill_head",
            "4x gtceu:iv_vanadium_battery",
            "4x #gtceu:circuits/uev",
            "ae2:wireless_receiver",
            "gtceu:uev_electric_pump",
            "gtceu:uev_electric_piston",
            "2x gtceu:uev_electric_motor",
            "2x gtceu:uev_conveyor_module",
            "2x gtceu:uev_robot_arm",
            "gtceu:uev_sensor",
            "gtceu:uev_emitter",
            "4x gtceu:titansteel_quadruple_wire",
            "4x gtceu:power_thruster",
            "2x gtceu:steel_minecart_wheels",
            "4x gtceu:steel_spring",
            "8x gtceu:quantanium_plate")
        .inputFluids("gtceu:soldering_alloy 2880", "gtceu:yttrium 2880", "gtceu:blue_alloy 2880", "gtceu:rtm_alloy 2880")
        .itemOutputs("kubejs:space_drone_mk3")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(600)
        .addData("SEPMTier", 2)

    gtr.assembler_module("kubejs:space_drone_mk4")
        .itemInputs("gtceu:naquadah_alloy_drill_head",
            "16x gtceu:iv_vanadium_battery",
            "4x #gtceu:circuits/uiv",
            "ae2:wireless_receiver",
            "gtceu:uiv_electric_pump",
            "gtceu:uiv_electric_piston",
            "2x gtceu:uiv_electric_motor",
            "2x gtceu:uiv_conveyor_module",
            "2x gtceu:uiv_robot_arm",
            "gtceu:uiv_sensor",
            "gtceu:uiv_emitter",
            "4x gtceu:adamantine_quadruple_wire",
            "4x gtceu:power_thruster",
            "2x gtceu:steel_minecart_wheels",
            "4x gtceu:steel_spring",
            "8x gtceu:adamantium_plate")
        .inputFluids("gtceu:soldering_alloy 2880", "gtceu:bohrium 2880", "gtceu:tungsten_carbide 2880", "gtceu:rhodium_plated_palladium 2880e")
        .itemOutputs("kubejs:space_drone_mk4")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(600)
        .addData("SEPMTier", 3)

    gtr.assembler_module("kubejs:space_drone_mk5")
        .itemInputs("gtceu:duranium_drill_head",
            "4x gtceu:luv_vanadium_battery",
            "4x #gtceu:circuits/uxv",
            "ae2:wireless_receiver",
            "gtceu:uxv_electric_pump",
            "gtceu:uxv_electric_piston",
            "2x gtceu:uxv_electric_motor",
            "2x gtceu:uxv_conveyor_module",
            "2x gtceu:uxv_robot_arm",
            "gtceu:uxv_sensor",
            "gtceu:uxv_emitter",
            "4x gtceu:naquadriatictaranium_quadruple_wire",
            "4x gtceu:power_thruster",
            "2x gtceu:steel_minecart_wheels",
            "4x gtceu:steel_spring",
            "8x gtceu:vibranium_plate")
        .inputFluids("gtceu:soldering_alloy 2880", "gtceu:meitnerium 2880", "gtceu:black_bronze 2880", "gtceu:hssg 2880")
        .itemOutputs("kubejs:space_drone_mk5")
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(600)
        .addData("SEPMTier", 4)

    gtr.assembler_module("kubejs:space_drone_mk6")
        .itemInputs("gtceu:neutronium_drill_head",
            "16x gtceu:luv_vanadium_battery",
            "4x #gtceu:circuits/opv",
            "ae2:wireless_receiver",
            "gtceu:opv_electric_pump",
            "gtceu:opv_electric_piston",
            "2x gtceu:opv_electric_motor",
            "2x gtceu:opv_conveyor_module",
            "2x gtceu:opv_robot_arm",
            "gtceu:opv_sensor",
            "gtceu:opv_emitter",
            "4x gtceu:starmetal_quadruple_wire",
            "4x gtceu:power_thruster",
            "2x gtceu:steel_minecart_wheels",
            "4x gtceu:steel_spring",
            "8x gtceu:draconium_plate")
        .inputFluids("gtceu:soldering_alloy 2880", "gtceu:livermorium 2880", "gtceu:sterling_silver 2880", "gtceu:titanium_tungsten_carbide 2880")
        .itemOutputs("kubejs:space_drone_mk6")
        .EUt(GTValues.VA[GTValues.OpV])
        .duration(600)
        .addData("SEPMTier", 5)

    function space_probe(material, grade, amount, circuit) {
        gtr.space_probe_surface_reception(material + grade)
            .notConsumable("kubejs:space_probe_mk" + grade)
            .outputFluids(material + " " + amount)
            .EUt(GTValues.VA[GTValues.UEV] * (4 ** grade))
            .duration(200)
            .circuit(circuit)
            .CWUt(64 * (2 ** circuit))
    }
    space_probe("gtceu:starlight", 2, 1000, 2)
    space_probe("gtceu:starlight", 3, 10000, 2)
    space_probe("gtceu:heavy_lepton_mixture", 1, 100, 1)
    space_probe("gtceu:heavy_lepton_mixture", 2, 1000, 1)
    space_probe("gtceu:heavy_lepton_mixture", 3, 10000, 1)
    space_probe("gtceu:cosmic_element", 3, 10000, 3)

    const fishing = [
        ["minecraft:cod", 51],
        ["minecraft:salmon", 21.3],
        ["minecraft:tropical_fish", 1.7],
        ["minecraft:pufferfish", 11.1],
        [Item.of("minecraft:bow", "{Damage:100}").weakNBT(), 0.8],
        ["minecraft:experience_bottle", 0.8],
        ["minecraft:name_tag", 0.8],
        ["minecraft:nautilus_shell", 0.8],
        ["minecraft:saddle", 0.8],
        ["minecraft:lily_pad", 1.7],
        ["minecraft:bowl", 1],
        [Item.of("minecraft:fishing_rod", "{Damage:30,RepairCost:3}").enchant("minecraft:luck_of_the_sea", 2).enchant("minecraft:lure", 2).weakNBT(), 0.2],
        ["minecraft:leather", 1],
        ["minecraft:rotten_flesh", 1],
        ["minecraft:stick", 0.5],
        ["minecraft:string", 0.5],
        ["minecraft:potion", 1],
        ["minecraft:bone", 1],
        ["gtceu:damascus_steel_nugget", 0.05],
        ["minecraft:ink_sac", 0.1],
        ["minecraft:tripwire_hook", 1],
        ["gtceu:ancient_gold_coin", 0.024],
        ["avaritia:neutron_pile", 0.019],
        ["kubejs:zero_point_module_fragments", 0.012]
    ]
    const a = [[1, 1], [2, 1.1], [3, 1.2], [4, 1.8]]
    a.forEach((fish) => {
        let recipe = gtr.fishing_ground("fishing" + fish[0])
            .notConsumable((4 ** fish[0]) / 4 + "x minecraft:fishing_rod")
            .circuit(fish[0])
            .EUt(30)
            .duration(200)
        fishing.forEach(item => {
            recipe.chancedOutput(item[0], (100 * item[1]) * fish[1], 0)
        })
    })
    gtr.packer("gtceu:zero_point_module")
        .itemInputs("64x kubejs:zero_point_module_fragments")
        .itemOutputs(Item.of("gtceu:zero_point_module", "{Charge:2000000000000L}").weakNBT())
        .EUt(120)
        .duration(2000)

    gtr.fishing_ground("fishing_ground1")
        .notConsumable("64x minecraft:cod")
        .itemInputs("64x gtceu:tiny_meat_dust")
        .itemOutputs("32x minecraft:cod")
        .EUt(1)
        .duration(2000)

    gtr.fishing_ground("fishing_ground2")
        .notConsumable("64x minecraft:salmon")
        .itemInputs("64x gtceu:tiny_meat_dust")
        .itemOutputs("32x minecraft:salmon")
        .EUt(1)
        .duration(2000)

    gtr.fishing_ground("fishing_ground3")
        .notConsumable("64x minecraft:tropical_fish")
        .itemInputs("64x gtceu:tiny_meat_dust")
        .itemOutputs("32x minecraft:tropical_fish")
        .EUt(1)
        .duration(2000)

    gtr.fishing_ground("fishing_ground4")
        .notConsumable("64x minecraft:pufferfish")
        .itemInputs("64x gtceu:tiny_meat_dust")
        .itemOutputs("32x minecraft:pufferfish")
        .EUt(1)
        .duration(2000)

    gtr.gas_collector("void")
        .outputFluids("gtceu:air 10000")
        .EUt(16)
        .circuit(4)
        .duration(200)
        .dimension("kubejs:void")

    gtr.gas_collector("flat")
        .outputFluids("gtceu:air 10000")
        .EUt(16)
        .circuit(5)
        .duration(200)
        .dimension("kubejs:flat")

    gtr.gas_collector("barnarda")
        .outputFluids("gtceu:barnarda_air 10000")
        .EUt(1024)
        .circuit(6)
        .duration(200)
        .dimension("kubejs:barnarda")

    gtr.mixer("gtceu:aluminium_bronze_dust")
        .itemInputs("gtceu:aluminium_dust", "6x gtceu:bronze_dust")
        .itemOutputs("7x gtceu:aluminium_bronze_dust")
        .EUt(30)
        .circuit(1)
        .duration(400)

    gtr.cosmos_simulation("cosmos_simulation1")
        .itemInputs("kubejs:quantum_chromodynamic_charge")
        .itemOutputs("131072x gtceu:carbon_dust",
            "131072x gtceu:phosphorus_dust",
            "131072x gtceu:sulfur_dust",
            "131072x gtceu:selenium_dust",
            "131072x gtceu:iodine_dust",
            "131072x gtceu:boron_dust",
            "131072x gtceu:silicon_dust",
            "131072x gtceu:germanium_dust",
            "131072x gtceu:arsenic_dust",
            "131072x gtceu:antimony_dust",
            "131072x gtceu:tellurium_dust",
            "131072x gtceu:astatine_dust",
            "131072x gtceu:aluminium_dust",
            "131072x gtceu:gallium_dust",
            "131072x gtceu:indium_dust",
            "131072x gtceu:tin_dust",
            "131072x gtceu:thallium_dust",
            "131072x gtceu:lead_dust",
            "131072x gtceu:bismuth_dust",
            "131072x gtceu:polonium_dust",
            "131072x gtceu:titanium_dust",
            "131072x gtceu:vanadium_dust",
            "131072x gtceu:chromium_dust",
            "131072x gtceu:manganese_dust",
            "131072x gtceu:iron_dust",
            "131072x gtceu:cobalt_dust",
            "131072x gtceu:nickel_dust",
            "131072x gtceu:copper_dust",
            "131072x gtceu:zinc_dust",
            "131072x gtceu:zirconium_dust",
            "131072x gtceu:niobium_dust",
            "131072x gtceu:molybdenum_dust",
            "131072x gtceu:technetium_dust",
            "131072x gtceu:ruthenium_dust",
            "131072x gtceu:rhodium_dust",
            "131072x gtceu:palladium_dust",
            "131072x gtceu:silver_dust",
            "131072x gtceu:cadmium_dust",
            "131072x gtceu:hafnium_dust",
            "131072x gtceu:tantalum_dust",
            "131072x gtceu:tungsten_dust",
            "131072x gtceu:rhenium_dust",
            "131072x gtceu:osmium_dust",
            "131072x gtceu:iridium_dust",
            "131072x gtceu:platinum_dust",
            "131072x gtceu:gold_dust",
            "131072x gtceu:beryllium_dust",
            "131072x gtceu:magnesium_dust",
            "131072x gtceu:calcium_dust",
            "131072x gtceu:strontium_dust",
            "131072x gtceu:barium_dust",
            "131072x gtceu:radium_dust",
            "131072x gtceu:yttrium_dust",
            "131072x gtceu:lithium_dust",
            "131072x gtceu:sodium_dust",
            "131072x gtceu:potassium_dust",
            "131072x gtceu:rubidium_dust",
            "131072x gtceu:caesium_dust",
            "131072x gtceu:francium_dust",
            "131072x gtceu:scandium_dust",
            "131072x gtceu:actinium_dust",
            "131072x gtceu:thorium_dust",
            "131072x gtceu:protactinium_dust",
            "131072x gtceu:uranium_dust",
            "131072x gtceu:neptunium_dust",
            "131072x gtceu:plutonium_dust",
            "131072x gtceu:americium_dust",
            "131072x gtceu:curium_dust",
            "131072x gtceu:berkelium_dust",
            "131072x gtceu:californium_dust",
            "131072x gtceu:einsteinium_dust",
            "131072x gtceu:fermium_dust",
            "131072x gtceu:mendelevium_dust",
            "131072x gtceu:nobelium_dust",
            "131072x gtceu:lawrencium_dust",
            "131072x gtceu:lanthanum_dust",
            "131072x gtceu:cerium_dust",
            "131072x gtceu:praseodymium_dust",
            "131072x gtceu:neodymium_dust",
            "131072x gtceu:promethium_dust",
            "131072x gtceu:samarium_dust",
            "131072x gtceu:europium_dust",
            "131072x gtceu:gadolinium_dust",
            "131072x gtceu:terbium_dust",
            "131072x gtceu:dysprosium_dust",
            "131072x gtceu:holmium_dust",
            "131072x gtceu:erbium_dust",
            "131072x gtceu:thulium_dust",
            "131072x gtceu:ytterbium_dust",
            "131072x gtceu:lutetium_dust",
            "131072x gtceu:rutherfordium_dust",
            "131072x gtceu:dubnium_dust",
            "131072x gtceu:seaborgium_dust",
            "131072x gtceu:bohrium_dust",
            "131072x gtceu:hassium_dust",
            "131072x gtceu:meitnerium_dust",
            "131072x gtceu:darmstadtium_dust",
            "131072x gtceu:roentgenium_dust",
            "131072x gtceu:copernicium_dust",
            "131072x gtceu:nihonium_dust",
            "131072x gtceu:flerovium_dust",
            "131072x gtceu:moscovium_dust",
            "131072x gtceu:livermorium_dust",
            "131072x gtceu:tennessine_dust",
            "131072x gtceu:oganesson_dust",
            "131072x gtceu:jasper_dust",
            "131072x gtceu:naquadah_dust",
            "131072x gtceu:enriched_naquadah_dust",
            "131072x gtceu:naquadria_dust",
            "131072x gtceu:duranium_dust",
            "131072x gtceu:tritanium_dust",
            "131072x gtceu:mithril_dust",
            "131072x gtceu:orichalcum_dust",
            "131072x gtceu:enderium_dust",
            "131072x gtceu:adamantine_dust",
            "131072x gtceu:vibranium_dust",
            "131072x gtceu:infuscolium_dust",
            "131072x gtceu:taranium_dust",
            "131072x gtceu:draconium_dust",
            "131072x gtceu:starmetal_dust")
        .outputFluids("gtceu:spacetime 256",
            "gtceu:raw_star_matter_plasma 1310720",
            "gtceu:quark_gluon_plasma 1310720",
            "gtceu:heavy_quark_degenerate_matter_plasma 1310720",
            "gtceu:neutronium 13107200",
            "gtceu:heavy_lepton_mixture 13107200",
            "gtceu:hydrogen 131072000",
            "gtceu:nitrogen 131072000",
            "gtceu:oxygen 131072000",
            "gtceu:fluorine 131072000",
            "gtceu:chlorine 131072000",
            "gtceu:bromine 131072000",
            "gtceu:helium 131072000",
            "gtceu:neon 131072000",
            "gtceu:argon 131072000",
            "gtceu:krypton 131072000",
            "gtceu:xenon 131072000",
            "gtceu:radon 131072000",
            "gtceu:mercury 131072000",
            "gtceu:deuterium 131072000",
            "gtceu:tritium 131072000",
            "gtceu:helium_3 131072000",
            "gtceu:unknowwater 131072000",
            "gtceu:uu_matter 131072000")
        .duration(1200)
        .inputFluids("gtceu:cosmic_element 1024000")

    const circuit_board = [["gtceu:polyethylene_plate", 1], ["gtceu:polyvinyl_chloride_plate", 2], ["gtceu:polytetrafluoroethylene_plate", 4], ["gtceu:polybenzimidazole_plate", 8]]
    circuit_board.forEach((board) => {
        gtr.pcb_factory(board[0])
            .itemInputs("8x " + board[0], (32 + 32 * board[1]) + "x gtceu:copper_foil")
            .inputFluids("gtceu:sulfuric_acid " + 1000 * board[1], "gtceu:iron_iii_chloride " + 500 * board[1])
            .itemOutputs(8 * board[1] + "x gtceu:plastic_printed_circuit_board")
            .EUt(120)
            .duration(400 * board[1])

        gtr.pcb_factory(board[0] + 1)
            .itemInputs("8x " + board[0], (32 + 32 * board[1]) + "x gtceu:copper_foil")
            .inputFluids("gtceu:sulfuric_acid " + 1000 * board[1], "gtceu:sodium_persulfate " + 1000 * board[1])
            .itemOutputs(8 * board[1] + "x gtceu:plastic_printed_circuit_board")
            .EUt(120)
            .duration(400 * board[1])
    })

    gtr.pcb_factory("gtceu:epoxy_printed_circuit_board")
        .itemInputs("8x gtceu:epoxy_plate", "128x gtceu:electrum_foil")
        .inputFluids("gtceu:sulfuric_acid 2000", "gtceu:iron_iii_chloride 1000")
        .itemOutputs("8x gtceu:epoxy_printed_circuit_board")
        .EUt(120)
        .duration(600)

    gtr.pcb_factory("gtceu:epoxy_printed_circuit_board1")
        .itemInputs("8x gtceu:epoxy_plate", "128x gtceu:electrum_foil")
        .inputFluids("gtceu:sulfuric_acid 2000", "gtceu:sodium_persulfate 2000")
        .itemOutputs("8x gtceu:epoxy_printed_circuit_board")
        .EUt(120)
        .duration(600)

    gtr.pcb_factory("gtceu:fiber_reinforced_printed_circuit_board")
        .itemInputs("8x gtceu:reinforced_epoxy_resin_plate", "160x gtceu:annealed_copper_foil")
        .inputFluids("gtceu:sulfuric_acid 500", "gtceu:iron_iii_chloride 2000")
        .itemOutputs("8x gtceu:fiber_reinforced_printed_circuit_board")
        .EUt(120)
        .duration(800)

    gtr.pcb_factory("gtceu:fiber_reinforced_printed_circuit_board1")
        .itemInputs("8x gtceu:reinforced_epoxy_resin_plate", "160x gtceu:annealed_copper_foil")
        .inputFluids("gtceu:sulfuric_acid 500", "gtceu:sodium_persulfate 4000")
        .itemOutputs("8x gtceu:fiber_reinforced_printed_circuit_board")
        .EUt(120)
        .duration(800)

    gtr.pcb_factory("gtceu:multilayer_fiber_reinforced_printed_circuit_board")
        .itemInputs("16x gtceu:fiber_reinforced_circuit_board", "128x gtceu:platinum_foil")
        .inputFluids("gtceu:sulfuric_acid 2000", "gtceu:iron_iii_chloride 1000")
        .itemOutputs("8x gtceu:multilayer_fiber_reinforced_printed_circuit_board")
        .EUt(480)
        .duration(800)

    gtr.pcb_factory("gtceu:multilayer_fiber_reinforced_printed_circuit_board1")
        .itemInputs("16x gtceu:fiber_reinforced_circuit_board", "128x gtceu:platinum_foil")
        .inputFluids("gtceu:sulfuric_acid 2000", "gtceu:sodium_persulfate 8000")
        .itemOutputs("8x gtceu:multilayer_fiber_reinforced_printed_circuit_board")
        .EUt(480)
        .duration(800)

    gtr.pcb_factory("gtceu:wetware_printed_circuit_board")
        .itemInputs("gtceu:wetware_circuit_board", "32x gtceu:niobium_titanium_foil")
        .inputFluids("gtceu:sodium_persulfate 1000", "gtceu:iron_iii_chloride 500")
        .itemOutputs("gtceu:wetware_printed_circuit_board")
        .EUt(1920)
        .duration(450)

    gtr.pcb_factory("kubejs:bioware_printed_circuit_board")
        .itemInputs("kubejs:bioware_circuit_board", "32x gtceu:vanadium_gallium_foil")
        .inputFluids("gtceu:sodium_persulfate 2000", "gtceu:iron_iii_chloride 1000")
        .itemOutputs("kubejs:bioware_printed_circuit_board")
        .EUt(7680)
        .duration(525)

    gtr.pcb_factory("kubejs:optical_circuit_board")
        .itemInputs("gtceu:kevlar_plate", "32x gtceu:rhodium_foil")
        .inputFluids("gtceu:sulfuric_acid 1000", "gtceu:mithril_plasma 100")
        .itemOutputs("kubejs:optical_circuit_board")
        .EUt(7680 * 4)
        .duration(600)

    gtr.pcb_factory("kubejs:optical_printed_circuit_board")
        .itemInputs("kubejs:optical_circuit_board", "32x gtceu:ruthenium_foil")
        .inputFluids("gtceu:sodium_persulfate 4000", "gtceu:iron_iii_chloride 2000")
        .itemOutputs("kubejs:optical_printed_circuit_board")
        .EUt(7680 * 4)
        .duration(600)

    gtr.pcb_factory("kubejs:exotic_circuit_board")
        .itemInputs("2x gtceu:kevlar_plate", "32x gtceu:enderium_foil")
        .inputFluids("gtceu:sulfuric_acid 1000", "gtceu:vibranium_plasma 100")
        .itemOutputs("kubejs:exotic_circuit_board")
        .EUt(7680 * 16)
        .duration(900)

    gtr.pcb_factory("kubejs:exotic_printed_circuit_board")
        .itemInputs("kubejs:exotic_circuit_board", "32x gtceu:americium_foil")
        .inputFluids("gtceu:sodium_persulfate 8000", "gtceu:iron_iii_chloride 4000")
        .itemOutputs("kubejs:exotic_printed_circuit_board")
        .EUt(7680 * 16)
        .duration(900)

    gtr.pcb_factory("kubejs:cosmic_circuit_board")
        .itemInputs("4x gtceu:kevlar_plate", "32x gtceu:heavy_quark_degenerate_matter_foil")
        .inputFluids("gtceu:sulfuric_acid 1000", "gtceu:metastable_hassium_plasma 100")
        .itemOutputs("kubejs:cosmic_circuit_board")
        .EUt(7680 * 64)
        .duration(1200)

    gtr.pcb_factory("kubejs:cosmic_printed_circuit_board")
        .itemInputs("kubejs:cosmic_circuit_board", "32x gtceu:uruium_foil")
        .inputFluids("gtceu:sodium_persulfate 8000", "gtceu:iron_iii_chloride 4000")
        .itemOutputs("kubejs:cosmic_printed_circuit_board")
        .EUt(7680 * 64)
        .duration(1200)

    gtr.pcb_factory("kubejs:supracausal_circuit_board")
        .itemInputs("kubejs:cosmic_circuit_board", "32x gtceu:echoite_foil")
        .inputFluids("gtceu:dense_neutron_plasma 1000", "gtceu:quantumchromodynamically_confined_matter_plasma 100")
        .itemOutputs("kubejs:supracausal_circuit_board")
        .EUt(7680 * 256)
        .duration(1500)

    gtr.pcb_factory("kubejs:supracausal_printed_circuit_board")
        .itemInputs("kubejs:supracausal_circuit_board", "32x gtceu:legendarium_foil")
        .inputFluids("gtceu:sodium_persulfate 16000", "gtceu:iron_iii_chloride 8000")
        .itemOutputs("kubejs:supracausal_printed_circuit_board")
        .EUt(7680 * 256)
        .duration(1500)

    gtr.large_gas_collector("1")
        .notConsumable("kubejs:overworld_data")
        .outputFluids("gtceu:air 100000")
        .circuit(1)
        .EUt(120)
        .duration(200)

    gtr.large_gas_collector("2")
        .notConsumable("2x kubejs:nether_data")
        .outputFluids("gtceu:nether_air 100000")
        .circuit(1)
        .EUt(480)
        .duration(200)

    gtr.large_gas_collector("3")
        .notConsumable("4x kubejs:end_data")
        .outputFluids("gtceu:ender_air 100000")
        .circuit(1)
        .EUt(1920)
        .duration(200)

    gtr.large_gas_collector("4")
        .notConsumable("kubejs:overworld_data")
        .notConsumable("gtceu:vacuum_freezer")
        .outputFluids("gtceu:liquid_air 100000")
        .EUt(480)
        .duration(2000)

    gtr.large_gas_collector("5")
        .notConsumable("2x kubejs:nether_data")
        .notConsumable("gtceu:vacuum_freezer")
        .outputFluids("gtceu:liquid_nether_air 100000")
        .EUt(1920)
        .duration(2000)

    gtr.large_gas_collector("6")
        .notConsumable("4x kubejs:end_data")
        .notConsumable("gtceu:vacuum_freezer")
        .outputFluids("gtceu:liquid_ender_air 100000")
        .EUt(7680)
        .duration(2000)

    gtr.assembler("gtceu:large_gas_collector")
        .itemInputs("gtceu:mv_gas_collector", "gtceu:hv_gas_collector", "gtceu:ev_gas_collector", "2x gtceu:mv_field_generator", "2x gtceu:hv_field_generator", "2x gtceu:ev_field_generator", "2x #gtceu:circuits/luv", "gtceu:iridium_huge_fluid_pipe", "4x gtceu:double_sterling_silver_plate")
        .itemOutputs("gtceu:large_gas_collector")
        .inputFluids("gtceu:soldering_alloy 1296")
        .EUt(1920)
        .duration(400)

    gtr.assembler("gtceu:large_incubator")
        .itemInputs("gtceu:incubator", "4x gtceu:luv_field_generator", "4x gtceu:luv_sensor", "4x gtceu:luv_fluid_regulator", "4x gtceu:indium_tin_barium_titanium_cuprate_octal_wire", "16x gtceu:laminated_glass")
        .itemOutputs("gtceu:large_incubator")
        .inputFluids("gtceu:polytetrafluoroethylene 1440")
        .EUt(122880)
        .duration(800)

    gtr.cutter("kubejs:taranium_wafer")
        .itemInputs("kubejs:taranium_boule")
        .itemOutputs("64x kubejs:taranium_wafer", "64x kubejs:taranium_wafer")
        .EUt(122880)
        .duration(3200)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.cutter("kubejs:rutherfordium_neutronium_wafer")
        .itemInputs("kubejs:rutherfordium_neutronium_boule")
        .itemOutputs("64x kubejs:rutherfordium_neutronium_wafer", "32x kubejs:rutherfordium_neutronium_wafer")
        .EUt(30720)
        .duration(3200)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.cutter("kubejs:nm_chip")
        .itemInputs("kubejs:nm_wafer")
        .itemOutputs("4x kubejs:nm_chip")
        .EUt(30720)
        .duration(1800)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.cutter("kubejs:pm_chip")
        .itemInputs("kubejs:pm_wafer")
        .itemOutputs("4x kubejs:pm_chip")
        .EUt(122880)
        .duration(1800)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.cutter("kubejs:fm_chip")
        .itemInputs("kubejs:fm_wafer")
        .itemOutputs("2x kubejs:fm_chip")
        .EUt(524288)
        .duration(2700)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.cutter("kubejs:optical_ram_chip")
        .itemInputs("kubejs:optical_ram_wafer")
        .itemOutputs("32x kubejs:optical_ram_chip")
        .EUt(122880)
        .duration(900)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.cutter("kubejs:exotic_ram_chip")
        .itemInputs("kubejs:exotic_ram_wafer")
        .itemOutputs("32x kubejs:exotic_ram_chip")
        .EUt(524288)
        .duration(900)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.cutter("kubejs:cosmic_ram_chip")
        .itemInputs("kubejs:cosmic_ram_wafer")
        .itemOutputs("32x kubejs:cosmic_ram_chip")
        .EUt(524288 * 4)
        .duration(900)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.cutter("kubejs:supracausal_ram_chip")
        .itemInputs("kubejs:supracausal_ram_wafer")
        .itemOutputs("4x kubejs:supracausal_ram_chip")
        .EUt(524288 * 16)
        .duration(900)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.forming_press("kubejs:optical_ram_wafer")
        .itemInputs("kubejs:rutherfordium_neutronium_wafer", "gtceu:ram_wafer", "kubejs:photon_carrying_wafer")
        .itemOutputs("kubejs:optical_ram_wafer")
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(150)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.forming_press("kubejs:exotic_ram_wafer")
        .itemInputs("kubejs:optical_ram_wafer", "gtceu:nor_memory_wafer", "gtceu:nand_memory_wafer", "gtceu:amethyst_plate", "gtceu:technetium_plate")
        .itemOutputs("kubejs:exotic_ram_wafer")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(350)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.forming_press("kubejs:cosmic_ram_wafer")
        .itemInputs("kubejs:taranium_wafer", "gtceu:ram_wafer", "kubejs:prepared_cosmic_soc_wafer")
        .itemOutputs("kubejs:cosmic_ram_wafer")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(550)
        .cleanroom(GTLCleanroomType.LAW_CLEANROOM)

    gtr.forming_press("kubejs:supracausal_ram_wafer")
        .itemInputs("kubejs:cosmic_ram_wafer", "kubejs:exotic_ram_wafer", "kubejs:pellet_antimatter", "gtceu:legendarium_foil", "gtceu:double_hikarium_plate")
        .itemOutputs("kubejs:supracausal_ram_wafer")
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(750)
        .cleanroom(GTLCleanroomType.LAW_CLEANROOM)

    gtr.laser_engraver("gtceu:ilc_wafer")
        .itemInputs("kubejs:taranium_wafer")
        .notConsumable("#forge:lenses/red")
        .itemOutputs("64x gtceu:ilc_wafer")
        .EUt(122880)
        .duration(13)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.laser_engraver("gtceu:ram_wafer")
        .itemInputs("kubejs:taranium_wafer")
        .notConsumable("#forge:lenses/green")
        .itemOutputs("64x gtceu:ram_wafer")
        .EUt(122880)
        .duration(13)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.laser_engraver("gtceu:lpic_wafer")
        .itemInputs("kubejs:taranium_wafer")
        .notConsumable("#forge:lenses/orange")
        .itemOutputs("64x gtceu:lpic_wafer")
        .EUt(122880)
        .duration(13)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.laser_engraver("gtceu:simple_soc_wafer")
        .itemInputs("kubejs:taranium_wafer")
        .notConsumable("#forge:lenses/cyan")
        .itemOutputs("64x gtceu:simple_soc_wafer")
        .EUt(122880)
        .duration(13)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.laser_engraver("gtceu:ulpic_wafer")
        .itemInputs("kubejs:taranium_wafer")
        .notConsumable("#forge:lenses/blue")
        .itemOutputs("64x gtceu:ulpic_wafer")
        .EUt(122880)
        .duration(13)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.laser_engraver("gtceu:cpu_wafer")
        .itemInputs("kubejs:taranium_wafer")
        .notConsumable("#forge:lenses/light_blue")
        .itemOutputs("64x gtceu:cpu_wafer")
        .EUt(122880)
        .duration(13)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.laser_engraver("gtceu:soc_wafer")
        .itemInputs("kubejs:taranium_wafer")
        .notConsumable("#forge:lenses/yellow")
        .itemOutputs("32x gtceu:soc_wafer")
        .EUt(122880)
        .duration(50)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.laser_engraver("gtceu:nor_memory_wafer")
        .itemInputs("kubejs:taranium_wafer")
        .notConsumable("#forge:lenses/pink")
        .itemOutputs("32x gtceu:nor_memory_wafer")
        .EUt(122880)
        .duration(50)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.laser_engraver("gtceu:mpic_wafer")
        .itemInputs("kubejs:taranium_wafer")
        .notConsumable("#forge:lenses/brown")
        .itemOutputs("32x gtceu:mpic_wafer")
        .EUt(122880)
        .duration(50)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.laser_engraver("gtceu:nand_memory_wafer")
        .itemInputs("kubejs:taranium_wafer")
        .notConsumable("#forge:lenses/gray")
        .itemOutputs("32x gtceu:nand_memory_wafer")
        .EUt(122880)
        .duration(50)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.laser_engraver("gtceu:advanced_soc_wafer")
        .itemInputs("kubejs:taranium_wafer")
        .notConsumable("#forge:lenses/purple")
        .itemOutputs("8x gtceu:advanced_soc_wafer")
        .EUt(122880)
        .duration(125)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.laser_engraver("gtceu:highly_advanced_soc_wafer")
        .itemInputs("kubejs:taranium_wafer")
        .notConsumable("#forge:lenses/black")
        .itemOutputs("4x gtceu:highly_advanced_soc_wafer")
        .EUt(122880)
        .duration(225)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.precision_laser_engraver("kubejs:prepared_cosmic_soc_wafer")
        .itemInputs("kubejs:taranium_wafer")
        .notConsumable("kubejs:lithography_mask")
        .notConsumable("#forge:lenses/yellow")
        .notConsumable("#forge:lenses/lime")
        .notConsumable("#forge:lenses/light_blue")
        .notConsumable("#forge:lenses/cyan")
        .notConsumable("#forge:lenses/purple")
        .notConsumable("#forge:lenses/black")
        .notConsumable("#forge:lenses/blue")
        .inputFluids("gtceu:gamma_rays_photoresist 1000")
        .itemOutputs("kubejs:prepared_cosmic_soc_wafer")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(4800)
        .CWUt(1024)

    gtr.precision_laser_engraver("kubejs:high_precision_crystal_soc")
        .itemInputs("gtceu:crystal_soc")
        .notConsumable("kubejs:lithography_mask")
        .notConsumable("#forge:lenses/yellow")
        .notConsumable("#forge:lenses/lime")
        .notConsumable("#forge:lenses/light_blue")
        .notConsumable("#forge:lenses/cyan")
        .notConsumable("#forge:lenses/purple")
        .notConsumable("#forge:lenses/black")
        .notConsumable("#forge:lenses/blue")
        .inputFluids("gtceu:euv_photoresist 1000")
        .itemOutputs("kubejs:high_precision_crystal_soc")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(2400)
        .CWUt(256)

    gtr.precision_laser_engraver("kubejs:nm_wafer")
        .itemInputs("kubejs:rutherfordium_neutronium_wafer")
        .notConsumable("kubejs:lithography_mask")
        .notConsumable("#forge:lenses/blue")
        .notConsumable("#forge:lenses/brown")
        .notConsumable("#forge:lenses/orange")
        .notConsumable("#forge:lenses/red")
        .notConsumable("gtceu:lime_glass_lens")
        .notConsumable("#forge:lenses/pink")
        .notConsumable("#forge:lenses/gray")
        .inputFluids("gtceu:photoresist 1000")
        .itemOutputs("kubejs:nm_wafer")
        .EUt(GTValues.VA[GTValues.UV])
        .duration(900)
        .CWUt(128)

    gtr.precision_laser_engraver("kubejs:pm_wafer")
        .itemInputs("kubejs:taranium_wafer")
        .notConsumable("kubejs:lithography_mask")
        .notConsumable("#forge:lenses/blue")
        .notConsumable("#forge:lenses/brown")
        .notConsumable("#forge:lenses/orange")
        .notConsumable("#forge:lenses/red")
        .notConsumable("gtceu:lime_glass_lens")
        .notConsumable("#forge:lenses/pink")
        .notConsumable("#forge:lenses/gray")
        .inputFluids("gtceu:euv_photoresist 1000")
        .itemOutputs("kubejs:pm_wafer")
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(1800)
        .CWUt(256)

    gtr.precision_laser_engraver("kubejs:fm_wafer")
        .itemInputs("kubejs:pm_wafer")
        .notConsumable("kubejs:grating_lithography_mask")
        .notConsumable("#forge:lenses/blue")
        .notConsumable("#forge:lenses/brown")
        .notConsumable("#forge:lenses/orange")
        .notConsumable("#forge:lenses/red")
        .notConsumable("gtceu:lime_glass_lens")
        .notConsumable("#forge:lenses/pink")
        .notConsumable("#forge:lenses/gray")
        .inputFluids("gtceu:gamma_rays_photoresist 1000")
        .itemOutputs("kubejs:fm_wafer")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(2800)
        .CWUt(512)

    gtr.precision_laser_engraver("kubejs:raw_photon_carrying_wafer")
        .itemInputs("kubejs:rutherfordium_neutronium_wafer")
        .notConsumable("kubejs:lithography_mask")
        .notConsumable("#forge:lenses/light_gray")
        .notConsumable("#forge:lenses/purple")
        .notConsumable("#forge:lenses/yellow")
        .notConsumable("#forge:lenses/magenta")
        .notConsumable("#forge:lenses/orange")
        .notConsumable("#forge:lenses/light_blue")
        .notConsumable("#forge:lenses/pink")
        .itemOutputs("kubejs:raw_photon_carrying_wafer")
        .inputFluids("gtceu:photoresist 1000")
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(600)
        .CWUt(128)

    gtr.dimensional_focus_engraving_array("kubejs:raw_photon_carrying_wafer")
        .itemInputs("kubejs:rutherfordium_neutronium_wafer")
        .notConsumable("#forge:lenses/yellow")
        .inputFluids("gtceu:photoresist 100")
        .itemOutputs("kubejs:raw_photon_carrying_wafer")
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(600)
        .CWUt(1)
    ["scannerResearch(java.util.function.UnaryOperator)"](b => b.researchStack(Registries.getItemStack("kubejs:raw_photon_carrying_wafer"))
        .dataStack(Registries.getItemStack("gtceu:data_module"))
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(2400))

    gtr.dimensional_focus_engraving_array("kubejs:prepared_cosmic_soc_wafer")
        .itemInputs("kubejs:taranium_wafer")
        .notConsumable("#forge:lenses/light_blue")
        .inputFluids("gtceu:gamma_rays_photoresist 100")
        .itemOutputs("kubejs:prepared_cosmic_soc_wafer")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(4800)
        .CWUt(8)
    ["scannerResearch(java.util.function.UnaryOperator)"](b => b.researchStack(Registries.getItemStack("kubejs:prepared_cosmic_soc_wafer"))
        .dataStack(Registries.getItemStack("gtceu:data_module"))
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(2400))

    gtr.dimensional_focus_engraving_array("kubejs:high_precision_crystal_soc")
        .itemInputs("gtceu:crystal_soc")
        .notConsumable("#forge:lenses/lime")
        .inputFluids("gtceu:euv_photoresist 100")
        .itemOutputs("kubejs:high_precision_crystal_soc")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(2400)
        .CWUt(2)
    ["scannerResearch(java.util.function.UnaryOperator)"](b => b.researchStack(Registries.getItemStack("kubejs:high_precision_crystal_soc"))
        .dataStack(Registries.getItemStack("gtceu:data_module"))
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(2400))

    gtr.dimensional_focus_engraving_array("kubejs:nm_wafer")
        .itemInputs("kubejs:rutherfordium_neutronium_wafer")
        .notConsumable("#forge:lenses/blue")
        .inputFluids("gtceu:photoresist 100")
        .itemOutputs("kubejs:nm_wafer")
        .EUt(GTValues.VA[GTValues.UV])
        .duration(900)
        .CWUt(1)
    ["scannerResearch(java.util.function.UnaryOperator)"](b => b.researchStack(Registries.getItemStack("kubejs:nm_wafer"))
        .dataStack(Registries.getItemStack("gtceu:data_module"))
        .EUt(GTValues.VA[GTValues.UV])
        .duration(2400))

    gtr.dimensional_focus_engraving_array("kubejs:pm_wafer")
        .itemInputs("kubejs:taranium_wafer")
        .notConsumable("#forge:lenses/magenta")
        .inputFluids("gtceu:euv_photoresist 100")
        .itemOutputs("kubejs:pm_wafer")
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(1800)
        .CWUt(2)
    ["scannerResearch(java.util.function.UnaryOperator)"](b => b.researchStack(Registries.getItemStack("kubejs:pm_wafer"))
        .dataStack(Registries.getItemStack("gtceu:data_module"))
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(2400))

    gtr.dimensional_focus_engraving_array("kubejs:fm_wafer")
        .itemInputs("kubejs:pm_wafer")
        .notConsumable("#forge:lenses/orange")
        .inputFluids("gtceu:gamma_rays_photoresist 100")
        .itemOutputs("kubejs:fm_wafer")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(2700)
        .CWUt(4)
    ["scannerResearch(java.util.function.UnaryOperator)"](b => b.researchStack(Registries.getItemStack("kubejs:fm_wafer"))
        .dataStack(Registries.getItemStack("gtceu:data_module"))
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(2400))

    gtr.chemical_bath("kubejs:cosmic_soc_wafer")
        .itemInputs("kubejs:prepared_cosmic_soc_wafer")
        .inputFluids("gtceu:argon_plasma 1000")
        .itemOutputs("kubejs:cosmic_soc_wafer")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(600)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.cutter("kubejs:cosmic_soc")
        .itemInputs("kubejs:cosmic_soc_wafer")
        .itemOutputs("8x kubejs:cosmic_soc")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(900)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.stellar_forge("kubejs:dragon_heart")
        .itemInputs("kubejs:naquadria_charge", "64x minecraft:dragon_egg", "gtceu:double_draconiumawakened_plate")
        .itemOutputs("kubejs:dragon_heart")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(200)
        .addData("SCTier", 1)

    gtr.stellar_forge("kubejs:chaos_shard")
        .itemInputs("kubejs:quantum_chromodynamic_charge", "kubejs:infused_obsidian", "minecraft:bedrock")
        .inputFluids("gtceu:radox 1000")
        .itemOutputs("kubejs:chaos_shard")
        .EUt(GTValues.VA[GTValues.OpV])
        .duration(200)
        .addData("SCTier", 3)

    gtr.mixer("gtceu:hastelloy_n_dust")
        .itemInputs("2x gtceu:iridium_dust", "4x gtceu:molybdenum_dust", "2x gtceu:chromium_dust", "2x gtceu:titanium_dust", "15x gtceu:nickel_dust")
        .circuit(5)
        .itemOutputs("25x gtceu:hastelloy_n_dust")
        .duration(1000)
        .EUt(GTValues.VA[GTValues.EV])

    gtr.assembler("kubejs:accelerated_pipeline")
        .itemInputs("gtceu:europium_quadruple_fluid_pipe", "2x gtceu:luv_voltage_coil", "#gtceu:circuits/luv", "gtceu:niobium_nitride_single_cable", "gtceu:copper76_dust", "gtceu:double_neodymium_plate")
        .itemOutputs("kubejs:accelerated_pipeline")
        .inputFluids("gtceu:soldering_alloy 288")
        .duration(400)
        .EUt(GTValues.VA[GTValues.IV])
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.assembler("gtlcore:lafium_mechanical_casing")
        .itemInputs("gtceu:enriched_naquadah_frame", "6x gtceu:lafium_plate")
        .itemOutputs("2x gtlcore:lafium_mechanical_casing")
        .circuit(6)
        .EUt(16)
        .duration(50)

    gtr.assembler("kubejs:module_connector")
        .itemInputs("64x gtceu:hv_item_passthrough_hatch", "64x gtceu:hv_fluid_passthrough_hatch", "2x #gtceu:circuits/zpm", "4x gtceu:trinium_single_cable", "16x gtceu:double_manganese_plate", "64x gtceu:double_technetium_plate")
        .itemOutputs("kubejs:module_connector")
        .inputFluids("gtceu:soldering_alloy 2880")
        .EUt(122880)
        .duration(400)

    gtr.assembler("kubejs:module_base")
        .itemInputs("kubejs:high_strength_concrete", "4x gtceu:technetium_plate", "4x gtceu:osmium_plate")
        .inputFluids("gtceu:soldering_alloy 288")
        .itemOutputs("kubejs:module_base")
        .EUt(480)
        .duration(400)

    gtr.electric_blast_furnace("gtceu:fissioned_uranium_235_dust")
        .itemInputs("gtceu:uranium_235_dust", "gtceu:tiny_neutronium_dust")
        .itemOutputs("gtceu:fissioned_uranium_235_dust")
        .EUt(1920)
        .duration(800)
        .blastFurnaceTemp(3860)

    gtr.centrifuge("gtceu:fissioned_uranium_235_dust")
        .itemInputs("gtceu:fissioned_uranium_235_dust")
        .itemOutputs("gtceu:tin_dust", "gtceu:technetium_dust")
        .EUt(1920)
        .duration(400)

    gtr.chemical_reactor("gtceu:uranium_sulfate_waste_solution")
        .itemInputs("gtceu:impure_uraninite_dust")
        .inputFluids("gtceu:sulfuric_acid 1000")
        .itemOutputs("gtceu:uraninite_dust")
        .outputFluids("gtceu:uranium_sulfate_waste_solution 1000")
        .EUt(120)
        .duration(200)

    gtr.centrifuge("gtceu:uranium_sulfate_waste_solution")
        .inputFluids("gtceu:uranium_sulfate_waste_solution 1000")
        .itemOutputs("gtceu:tiny_lead_dust", "gtceu:tiny_barium_dust", "gtceu:tiny_strontium_dust", "gtceu:tiny_radium_dust")
        .outputFluids("gtceu:diluted_sulfuric_acid 1000")
        .EUt(480)
        .duration(500)

    gtr.chemical_reactor("gtceu:bismuth_tellurite_dust")
        .itemInputs("2x gtceu:bismuth_dust", "3x gtceu:tellurium_dust")
        .itemOutputs("5x gtceu:bismuth_tellurite_dust")
        .EUt(120)
        .duration(760)

    gtr.chemical_reactor("gtceu:prasiolite_dust")
        .itemInputs("5x gtceu:silicon_dust", "gtceu:iron_dust")
        .inputFluids("gtceu:oxygen 10000")
        .itemOutputs("gtceu:prasiolite_dust")
        .EUt(480)
        .duration(270)

    gtr.mixer("gtceu:magneto_resonatic_dust")
        .itemInputs("3x gtceu:prasiolite_dust", "6x gtceu:bismuth_tellurite_dust", "1x gtceu:cubic_zirconia_dust", "1x gtceu:magnetic_steel_dust")
        .itemOutputs("9x gtceu:magneto_resonatic_dust")
        .EUt(30)
        .duration(80)
        .addCondition(new GravityCondition(true))

    gtr.chemical_reactor("gtceu:dibismuthhydroborat_dust")
        .itemInputs("2x gtceu:bismuth_dust", "gtceu:boron_dust")
        .inputFluids("gtceu:hydrogen 1000")
        .itemOutputs("4x gtceu:dibismuthhydroborat_dust")
        .EUt(90)
        .duration(590)

    gtr.mixer("gtceu:circuit_compound_dust")
        .itemInputs("3x gtceu:dibismuthhydroborat_dust", "2x gtceu:bismuth_tellurite_dust", "gtceu:indium_gallium_phosphide_dust")
        .itemOutputs("6x gtceu:circuit_compound_dust")
        .EUt(15)
        .duration(890)

    gtr.forming_press("kubejs:raw_imprinted_resonatic_circuit_board")
        .itemInputs("4x gtceu:circuit_compound_dust", "gtceu:magneto_resonatic_dust")
        .itemOutputs("kubejs:raw_imprinted_resonatic_circuit_board")
        .EUt(480)
        .duration(300)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.autoclave("kubejs:imprinted_resonatic_circuit_board")
        .itemInputs("kubejs:raw_imprinted_resonatic_circuit_board")
        .inputFluids("gtceu:soldering_alloy 432")
        .itemOutputs("kubejs:imprinted_resonatic_circuit_board")
        .EUt(1920)
        .duration(300)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.circuit_assembler("kubejs:circuit_resonatic_ulv")
        .itemInputs("4x gtceu:tantalum_capacitor", "4x gtceu:resistor", "4x gtceu:inductor", "kubejs:imprinted_resonatic_circuit_board", "gtceu:magneto_resonatic_gem", "gtceu:vacuum_tube")
        .itemOutputs("4x kubejs:circuit_resonatic_ulv")
        .EUt(30)
        .duration(50)

    gtr.circuit_assembler("kubejs:circuit_resonatic_lv")
        .itemInputs("4x gtceu:diode", "4x gtceu:capacitor", "4x gtceu:transistor", "kubejs:imprinted_resonatic_circuit_board", "gtceu:magneto_resonatic_gem", "kubejs:circuit_resonatic_ulv")
        .itemOutputs("4x kubejs:circuit_resonatic_lv")
        .EUt(120)
        .duration(90)

    gtr.circuit_assembler("kubejs:circuit_resonatic_mv")
        .itemInputs("8x gtceu:diode", "8x gtceu:capacitor", "8x gtceu:transistor", "kubejs:imprinted_resonatic_circuit_board", "gtceu:magneto_resonatic_gem", "kubejs:circuit_resonatic_lv")
        .itemOutputs("4x kubejs:circuit_resonatic_mv")
        .EUt(480)
        .duration(150)

    gtr.circuit_assembler("kubejs:circuit_resonatic_hv")
        .itemInputs("4x gtceu:smd_diode", "4x gtceu:smd_capacitor", "4x gtceu:smd_transistor", "2x kubejs:imprinted_resonatic_circuit_board", "gtceu:flawless_magneto_resonatic_gem", "kubejs:circuit_resonatic_mv")
        .itemOutputs("4x kubejs:circuit_resonatic_hv")
        .EUt(1920)
        .duration(230)

    gtr.circuit_assembler("kubejs:circuit_resonatic_ev")
        .itemInputs("8x gtceu:smd_diode", "8x gtceu:smd_capacitor", "8x gtceu:smd_transistor", "4x kubejs:imprinted_resonatic_circuit_board", "gtceu:flawless_magneto_resonatic_gem", "kubejs:circuit_resonatic_hv")
        .itemOutputs("4x kubejs:circuit_resonatic_ev")
        .EUt(7680)
        .duration(330)

    gtr.circuit_assembler("kubejs:circuit_resonatic_iv")
        .itemInputs("4x gtceu:advanced_smd_diode", "4x gtceu:advanced_smd_capacitor", "4x gtceu:advanced_smd_transistor", "4x kubejs:imprinted_resonatic_circuit_board", "gtceu:flawless_magneto_resonatic_gem", "kubejs:circuit_resonatic_ev")
        .itemOutputs("4x kubejs:circuit_resonatic_iv")
        .EUt(30720)
        .duration(450)

    gtr.circuit_assembler("kubejs:circuit_resonatic_luv")
        .itemInputs("8x gtceu:advanced_smd_diode", "8x gtceu:advanced_smd_capacitor", "8x gtceu:advanced_smd_transistor", "4x kubejs:imprinted_resonatic_circuit_board", "gtceu:flawless_magneto_resonatic_gem", "kubejs:circuit_resonatic_iv")
        .itemOutputs("4x kubejs:circuit_resonatic_luv")
        .EUt(122880)
        .duration(570)

    const circuits = [
        ["bioware", "zpm", "luv", 1],
        ["optical", "uv", "zpm", 2],
        ["exotic", "uhv", "uv", 3],
        ["cosmic", "uev", "uhv", 4],
        ["supracausal", "uiv", "uev", 5]
    ]

    circuits.forEach((circuit) => {
        gtr.circuit_assembler("kubejs:circuit_resonatic_" + circuit[1])
            .itemInputs("16x kubejs:smd_diode_" + circuit[0], "16x kubejs:smd_capacitor_" + circuit[0], "16x kubejs:smd_transistor_" + circuit[0], "8x kubejs:imprinted_resonatic_circuit_board", "gtceu:exquisite_magneto_resonatic_gem", "kubejs:circuit_resonatic_" + circuit[2])
            .itemOutputs("4x kubejs:circuit_resonatic_" + circuit[1])
            .EUt(122880 * (4 ** circuit[3]))
            .duration(570 + (120 + (20 * circuit[3])))
    })

    gtr.electric_blast_furnace("kubejs:rutherfordium_neutronium_boule")
        .itemInputs("gtceu:neutronium_boule", "4x gtceu:rutherfordium_dust")
        .inputFluids("gtceu:radon 8000")
        .itemOutputs("kubejs:rutherfordium_neutronium_boule")
        .EUt(30720)
        .duration(21000)
        .blastFurnaceTemp(8100)

    gtr.chemical_reactor("gtceu:acrylic_acid")
        .itemInputs("3x gtceu:sodium_hydroxide_dust")
        .inputFluids("gtceu:allyl_chloride 1000", "minecraft:water 1000", "gtceu:oxygen 1000")
        .outputFluids("gtceu:acrylic_acid 1000")
        .itemOutputs("2x gtceu:salt_dust")
        .EUt(120)
        .duration(200)

    gtr.chemical_reactor("gtceu:ethyl_acrylate")
        .inputFluids("gtceu:acrylic_acid 1000", "gtceu:ethanol 1000", "gtceu:sulfuric_acid 1000")
        .outputFluids("gtceu:ethyl_acrylate 1000", "gtceu:diluted_sulfuric_acid 1000")
        .EUt(120)
        .duration(600)

    gtr.large_chemical_reactor("gtceu:photoresist")
        .inputFluids("gtceu:ethyl_acrylate 1000", "gtceu:styrene 1000", "gtceu:titanium_tetrachloride 100")
        .outputFluids("gtceu:photoresist 1000")
        .EUt(1920)
        .duration(800)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.large_chemical_reactor("gtceu:trichloroflerane")
        .notConsumable("gtceu:ferrosilite_dust")
        .itemInputs("gtceu:flerovium_dust")
        .inputFluids("gtceu:hydrochloric_acid 3000")
        .outputFluids("gtceu:trichloroflerane 1000", "gtceu:hydrogen 3000")
        .EUt(7680)
        .duration(150)

    gtr.mixer("gtceu:euv_photoresist")
        .inputFluids("gtceu:photoresist 1000", "gtceu:polyurethaneresin 1000")
        .itemInputs("31x gtceu:bisethylenedithiotetraselenafulvalene_perrhenate_dust")
        .outputFluids("gtceu:euv_photoresist")
        .EUt(524288)
        .duration(400)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.electric_blast_furnace("gtceu:bisethylenedithiotetraselenafulvalene_perrhenate_dust")
        .itemInputs("26x gtceu:bisethylenedithiotetraselenafulvalene_dust")
        .inputFluids("gtceu:ammonium_perrhenate 1000")
        .outputFluids("gtceu:ammonia 1000")
        .itemOutputs("31x gtceu:bisethylenedithiotetraselenafulvalene_perrhenate_dust")
        .EUt(120)
        .duration(9840)
        .blastFurnaceTemp(5000)

    gtr.electric_blast_furnace("gtceu:bisethylenedithiotetraselenafulvalene_dust")
        .itemInputs("28x gtceu:lithiumthiinediselenide_dust", "gtceu:cyclopentadienyl_titanium_trichloride_dust")
        .inputFluids("gtceu:tetrafluoroethylene 1000")
        .itemOutputs("8x gtceu:lithium_fluoride_dust", "26x gtceu:bisethylenedithiotetraselenafulvalene_dust")
        .EUt(120)
        .duration(7680)
        .blastFurnaceTemp(4600)

    gtr.large_chemical_reactor("gtceu:cyclopentadienyl_titanium_trichloride_dust")
        .inputFluids("gtceu:titanium_tetrachloride 1000", "gtceu:propadiene 2000", "gtceu:acetylene 2000")
        .itemOutputs("23x gtceu:cyclopentadienyl_titanium_trichloride_dust")
        .outputFluids("gtceu:hydrochloric_acid 2000")
        .EUt(7680)
        .duration(780)

    gtr.large_chemical_reactor("gtceu:propadiene")
        .inputFluids("gtceu:butene 1000", "gtceu:propene")
        .outputFluids("gtceu:butane 1000", "gtceu:propadiene 1000")
        .EUt(480)
        .duration(2400)

    gtr.chemical_reactor("gtceu:lithiumthiinediselenide_dust")
        .inputFluids("gtceu:bromodihydrothiine 1000", "gtceu:butyl_lithium 2000")
        .itemInputs("2x gtceu:selenium_dust")
        .outputFluids("gtceu:bromobutane 2000")
        .itemOutputs("14x gtceu:lithiumthiinediselenide_dust")
        .EUt(30720)
        .duration(290)

    gtr.chemical_reactor("gtceu:butyl_lithium")
        .itemInputs("gtceu:lithium_dust")
        .inputFluids("gtceu:butane 1000")
        .outputFluids("gtceu:butyl_lithium 1000", "gtceu:hydrogen 1000")
        .EUt(480)
        .duration(150)

    gtr.large_chemical_reactor("gtceu:bromodihydrothiine")
        .inputFluids("gtceu:ethane 1000", "gtceu:chlorine 1000", "gtceu:dibromoacrolein 1000")
        .itemInputs("14x gtceu:sodium_thiosulfate_dust")
        .outputFluids("gtceu:bromodihydrothiine 1000", "gtceu:hydrogen 1000")
        .itemOutputs("4x gtceu:salt_dust", "14x gtceu:sodium_bisulfate_dust")
        .EUt(7680)
        .duration(400)

    gtr.large_chemical_reactor("gtceu:dibromoacrolein")
        .inputFluids("gtceu:formic_acid 2000", "minecraft:water 2000", "gtceu:bromine 2000")
        .outputFluids("gtceu:dibromoacrolein 1000", "gtceu:hydrogen 2000")
        .itemOutputs("12x gtceu:sodium_hydroxide_dust")
        .EUt(7680)
        .duration(360)

    gtr.electric_blast_furnace("gtceu:sodium_thiosulfate_dust")
        .itemInputs("18x gtceu:sodium_hydroxide_dust", "4x gtceu:sulfur_dust")
        .itemOutputs("7x gtceu:sodium_thiosulfate_dust", "6x gtceu:sodium_sulfide_dust")
        .outputFluids("gtceu:steam 3000")
        .EUt(120)
        .duration(210)
        .blastFurnaceTemp(4500)

    gtr.mixer("gtceu:gamma_rays_photoresist")
        .itemInputs("29x gtceu:borocarbide_dust", "4x gtceu:lanthanum_embedded_fullerene_dust")
        .inputFluids("gtceu:euv_photoresist 1000", "gtceu:trichloroflerane")
        .outputFluids("gtceu:gamma_rays_photoresist 1000")
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(800)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.mixer("gtceu:astatide_solution")
        .inputFluids("gtceu:sulfuric_acid 1000")
        .itemInputs("1x gtceu:astatine_dust")
        .outputFluids("gtceu:astatide_solution 1000")
        .EUt(1920)
        .duration(200)

    gtr.chemical_reactor("gtceu:francium_carbide_dust")
        .itemInputs("2x gtceu:francium_dust")
        .inputFluids("gtceu:acetylene 1000")
        .itemOutputs("4x gtceu:francium_carbide_dust")
        .outputFluids("gtceu:hydrogen 2000")
        .EUt(480)
        .duration(260)

    gtr.electric_blast_furnace("gtceu:boron_carbide_dust")
        .itemInputs("3x gtceu:carbon_dust", "4x gtceu:boron_dust")
        .itemOutputs("7x gtceu:boron_carbide_dust")
        .EUt(120)
        .duration(550)
        .blastFurnaceTemp(4000)

    gtr.chemical_reactor("gtceu:boron_francium_carbide_dust")
        .itemInputs("8x gtceu:francium_carbide_dust", "7x gtceu:boron_carbide_dust")
        .itemOutputs("15x gtceu:boron_francium_carbide_dust")
        .EUt(7680)
        .duration(900)

    gtr.mixer("gtceu:mixed_astatide_salts_dust")
        .itemInputs("gtceu:holmium_dust", "gtceu:thulium_dust", "gtceu:copernicium_dust", "gtceu:flerovium_dust")
        .inputFluids("gtceu:astatide_solution 3000", "gtceu:distilled_water 3000")
        .itemOutputs("7x gtceu:mixed_astatide_salts_dust")
        .outputFluids("gtceu:diluted_sulfuric_acid 6000")
        .EUt(122880)
        .duration(400)

    gtr.electric_blast_furnace("gtceu:borocarbide_dust")
        .itemInputs("15x gtceu:boron_francium_carbide_dust", "14x gtceu:mixed_astatide_salts_dust")
        .itemOutputs("29x gtceu:borocarbide_dust")
        .EUt(120)
        .duration(15000)
        .blastFurnaceTemp(11300)

    gtr.mixer("gtceu:lanthanum_fullerene_mix_dust")
        .itemInputs("gtceu:lanthanum_dust", "gtceu:unfolded_fullerene_dust")
        .itemOutputs("2x gtceu:lanthanum_fullerene_mix_dust")
        .EUt(30720)
        .duration(200)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.laser_engraver("gtceu:lanthanum_embedded_fullerene_dust")
        .itemInputs("2x gtceu:lanthanum_fullerene_mix_dust")
        .notConsumable("gtceu:sapphire_lens")
        .inputFluids("gtceu:nitrogen 10000")
        .itemOutputs("2x gtceu:lanthanum_embedded_fullerene_dust")
        .outputFluids("gtceu:ammonia 10000")
        .EUt(1966080)
        .duration(320)
        .addDataBool("special", true)

    gtr.large_chemical_reactor("gtceu:fullerene_doped_nanotubes")
        .itemInputs("gtceu:fullerene_dust")
        .notConsumable("gtceu:rhenium_plate")
        .inputFluids("gtceu:methane 14400", "gtceu:cycloparaphenylene 3600")
        .outputFluids("gtceu:fullerene_doped_nanotubes 18000")
        .EUt(320000)
        .duration(290)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.distillery("gtceu:cyclopentadiene")
        .inputFluids("gtceu:severely_steam_cracked_naphtha 1000")
        .outputFluids("gtceu:cyclopentadiene 150")
        .circuit(12)
        .EUt(30)
        .duration(240)

    gtr.chemical_reactor("gtceu:dimethylether")
        .notConsumable("gtceu:silicon_dioxide_dust")
        .inputFluids("gtceu:methanol 2000")
        .outputFluids("gtceu:dimethylether 1000", "minecraft:water 1000")
        .EUt(8000)
        .duration(160)

    gtr.chemical_reactor("gtceu:dimethoxyethane")
        .inputFluids("gtceu:dimethylether 1000", "gtceu:ethylene_oxide 1000")
        .outputFluids("gtceu:dimethoxyethane 1000")
        .EUt(2000)
        .duration(160)

    gtr.chemical_reactor("gtceu:lithium_cyclopentadienide")
        .inputFluids("gtceu:butyl_lithium 1000", "gtceu:dimethoxyethane 500", "gtceu:cyclopentadiene 1000")
        .outputFluids("gtceu:lithium_cyclopentadienide 1000", "gtceu:butane 1000")
        .EUt(10000)
        .duration(460)

    gtr.large_chemical_reactor("gtceu:californium_trichloride_dust")
        .notConsumable("gtceu:ferrosilite_dust")
        .itemInputs("gtceu:californium_dust")
        .inputFluids("gtceu:hydrochloric_acid 6000")
        .outputFluids("gtceu:hydrogen 3000")
        .itemOutputs("4x gtceu:californium_trichloride_dust")
        .EUt(7680)
        .duration(150)

    gtr.chemical_reactor("gtceu:californium_cyclopentadienide")
        .inputFluids("gtceu:lithium_cyclopentadienide 3000")
        .itemInputs("4x gtceu:californium_trichloride_dust")
        .outputFluids("gtceu:californium_cyclopentadienide 1000")
        .EUt(2000000)
        .duration(160)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.chemical_bath("kubejs:fullerene_polymer_matrix_soft_tubing")
        .itemInputs("gtceu:fine_polyetheretherketone_wire")
        .inputFluids("gtceu:fullerene_polymer_matrix_pulp 18")
        .itemOutputs("kubejs:fullerene_polymer_matrix_soft_tubing")
        .EUt(100)
        .duration(80)

    gtr.vacuum_freezer("kubejs:fullerene_polymer_matrix_fine_tubing")
        .itemInputs("kubejs:fullerene_polymer_matrix_soft_tubing")
        .itemOutputs("kubejs:fullerene_polymer_matrix_fine_tubing")
        .EUt(500)
        .duration(240)

    gtr.dimensionally_transcendent_mixer("gtceu:not_found")
        .itemInputs("1x gtceu:carbon_dust", "1x gtceu:phosphorus_dust", "1x gtceu:sulfur_dust", "1x gtceu:selenium_dust", "1x gtceu:iodine_dust")
        .inputFluids("gtceu:hydrogen 1000", "gtceu:nitrogen 1000", "gtceu:oxygen 1000", "gtceu:fluorine 1000", "gtceu:chlorine 1000", "gtceu:bromine 1000")
        .outputFluids("gtceu:not_found 11000")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(2200)

    gtr.dimensionally_transcendent_mixer("gtceu:noble_gas")
        .inputFluids("gtceu:helium 1000", "gtceu:neon 1000", "gtceu:argon 1000", "gtceu:krypton 1000", "gtceu:xenon 1000", "gtceu:radon 1000")
        .outputFluids("gtceu:noble_gas 6000")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(1200)

    gtr.dimensionally_transcendent_mixer("gtceu:metalloid_dust")
        .itemInputs("1x gtceu:boron_dust", "1x gtceu:silicon_dust", "1x gtceu:germanium_dust", "1x gtceu:arsenic_dust", "1x gtceu:antimony_dust", "1x gtceu:tellurium_dust", "1x gtceu:astatine_dust")
        .itemOutputs("7x gtceu:metalloid_dust")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(1400)

    gtr.dimensionally_transcendent_mixer("gtceu:poor_dust")
        .itemInputs("1x gtceu:aluminium_dust", "1x gtceu:gallium_dust", "1x gtceu:indium_dust", "1x gtceu:tin_dust", "1x gtceu:thallium_dust", "1x gtceu:lead_dust", "1x gtceu:bismuth_dust", "1x gtceu:polonium_dust")
        .itemOutputs("8x gtceu:poor_dust")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(1600)

    gtr.dimensionally_transcendent_mixer("gtceu:transition_1_dust")
        .itemInputs("1x gtceu:titanium_dust", "1x gtceu:vanadium_dust", "1x gtceu:chromium_dust", "1x gtceu:manganese_dust", "1x gtceu:iron_dust", "1x gtceu:cobalt_dust", "1x gtceu:nickel_dust", "1x gtceu:copper_dust", "1x gtceu:zinc_dust")
        .itemOutputs("9x gtceu:transition_1_dust")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(1800)

    gtr.dimensionally_transcendent_mixer("gtceu:transition_2_dust")
        .itemInputs("1x gtceu:zirconium_dust", "1x gtceu:niobium_dust", "1x gtceu:molybdenum_dust", "1x gtceu:technetium_dust", "1x gtceu:ruthenium_dust", "1x gtceu:rhodium_dust", "1x gtceu:palladium_dust", "1x gtceu:silver_dust", "1x gtceu:cadmium_dust")
        .itemOutputs("9x gtceu:transition_2_dust")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(1800)

    gtr.dimensionally_transcendent_mixer("gtceu:transition_3_dust")
        .itemInputs("1x gtceu:hafnium_dust", "1x gtceu:tantalum_dust", "1x gtceu:tungsten_dust", "1x gtceu:rhenium_dust", "1x gtceu:osmium_dust", "1x gtceu:iridium_dust", "1x gtceu:platinum_dust", "1x gtceu:gold_dust")
        .inputFluids("gtceu:mercury 1000")
        .itemOutputs("9x gtceu:transition_3_dust")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(1800)

    gtr.dimensionally_transcendent_mixer("gtceu:alkaline_earth_dust")
        .itemInputs("1x gtceu:beryllium_dust", "1x gtceu:magnesium_dust", "1x gtceu:calcium_dust", "1x gtceu:strontium_dust", "1x gtceu:barium_dust", "1x gtceu:radium_dust")
        .itemOutputs("6x gtceu:alkaline_earth_dust")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(1200)

    gtr.dimensionally_transcendent_mixer("gtceu:alkaline_dust")
        .itemInputs("1x gtceu:lithium_dust", "1x gtceu:sodium_dust", "1x gtceu:potassium_dust", "1x gtceu:rubidium_dust", "1x gtceu:caesium_dust", "1x gtceu:francium_dust")
        .itemOutputs("6x gtceu:alkaline_dust")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(1200)

    gtr.dimensionally_transcendent_mixer("gtceu:actinoids_1_dust")
        .itemInputs("1x gtceu:actinium_dust", "1x gtceu:thorium_dust", "1x gtceu:protactinium_dust", "1x gtceu:uranium_dust", "1x gtceu:neptunium_dust", "1x gtceu:plutonium_dust", "1x gtceu:americium_dust", "1x gtceu:curium_dust")
        .itemOutputs("8x gtceu:actinoids_1_dust")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(1600)

    gtr.dimensionally_transcendent_mixer("gtceu:actinoids_2_dust")
        .itemInputs("1x gtceu:berkelium_dust", "1x gtceu:californium_dust", "1x gtceu:einsteinium_dust", "1x gtceu:fermium_dust", "1x gtceu:mendelevium_dust", "1x gtceu:nobelium_dust", "1x gtceu:lawrencium_dust")
        .itemOutputs("7x gtceu:actinoids_2_dust")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(1400)

    gtr.mixer("gtceu:actinoids_dust")
        .itemInputs("1x gtceu:actinoids_1_dust", "1x gtceu:actinoids_2_dust")
        .itemOutputs("2x gtceu:actinoids_dust")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(400)

    gtr.dimensionally_transcendent_mixer("gtceu:lanthanoids_1_dust")
        .itemInputs("1x gtceu:lanthanum_dust", "1x gtceu:cerium_dust", "1x gtceu:praseodymium_dust", "1x gtceu:neodymium_dust", "1x gtceu:promethium_dust", "1x gtceu:samarium_dust", "1x gtceu:europium_dust", "1x gtceu:gadolinium_dust")
        .itemOutputs("8x gtceu:lanthanoids_1_dust")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(1600)

    gtr.dimensionally_transcendent_mixer("gtceu:lanthanoids_2_dust")
        .itemInputs("1x gtceu:terbium_dust", "1x gtceu:dysprosium_dust", "1x gtceu:holmium_dust", "1x gtceu:erbium_dust", "1x gtceu:thulium_dust", "1x gtceu:ytterbium_dust", "1x gtceu:lutetium_dust")
        .itemOutputs("7x gtceu:lanthanoids_2_dust")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(1400)

    gtr.dimensionally_transcendent_mixer("gtceu:dimensionallytranscendentprosaiccatalyst")
        .inputFluids("gtceu:dimensionallytranscendentcrudecatalyst 1000", "gtceu:heavy_quark_enriched_mixture 1000", "gtceu:oxygen_plasma 1000", "gtceu:argon_plasma 1000", "gtceu:iron_plasma 1000", "gtceu:nickel_plasma 1000")
        .outputFluids("gtceu:dimensionallytranscendentprosaiccatalyst 1000")
        .EUt(GTValues.VA[GTValues.OpV])
        .duration(400)

    gtr.dimensionally_transcendent_mixer("gtceu:dimensionallytranscendentresplendentcatalyst")
        .inputFluids("gtceu:dimensionallytranscendentprosaiccatalyst 1000", "gtceu:heavy_quark_enriched_mixture 1000", "gtceu:mithril_plasma 1000", "gtceu:orichalcum_plasma 1000", "gtceu:enderium_plasma 1000", "gtceu:infuscolium_plasma 1000")
        .outputFluids("gtceu:dimensionallytranscendentresplendentcatalyst 1000")
        .EUt(GTValues.VA[GTValues.OpV])
        .duration(800)

    gtr.dimensionally_transcendent_mixer("gtceu:dimensionallytranscendentexoticcatalyst")
        .inputFluids("gtceu:dimensionallytranscendentresplendentcatalyst 1000", "gtceu:heavy_quark_enriched_mixture 1000", "gtceu:echoite_plasma 1000", "gtceu:adamantium_plasma 1000", "gtceu:vibranium_plasma 1000", "gtceu:starmetal_plasma 1000")
        .outputFluids("gtceu:dimensionallytranscendentexoticcatalyst 1000")
        .EUt(GTValues.VA[GTValues.OpV])
        .duration(1600)

    gtr.dimensionally_transcendent_mixer("gtceu:dimensionallytranscendentstellarcatalyst")
        .inputFluids("gtceu:dimensionallytranscendentexoticcatalyst 1000", "gtceu:heavy_quark_enriched_mixture 1000", "gtceu:legendarium_plasma 1000", "gtceu:crystalmatrix_plasma 1000", "gtceu:draconiumawakened_plasma 1000", "gtceu:raw_star_matter_plasma 1000")
        .outputFluids("gtceu:dimensionallytranscendentstellarcatalyst 1000")
        .EUt(GTValues.VA[GTValues.OpV])
        .duration(3200)

    gtr.dimensionally_transcendent_mixer("gtceu:exciteddtsc")
        .inputFluids("gtceu:dimensionallytranscendentstellarcatalyst 10000", "gtceu:concentration_mixing_hyper_fuel_2 1000", "gtceu:high_energy_quark_gluon_plasma 1000")
        .outputFluids("gtceu:exciteddtsc 10000")
        .EUt(GTValues.VA[GTValues.OpV])
        .duration(12000)

    gtr.dimensionally_transcendent_mixer("gtceu:primordialmatter")
        .inputFluids("gtceu:raw_star_matter_plasma 1000", "gtceu:spacetime 1000", "gtceu:spatialfluid 1000", "gtceu:dimensionallytranscendentresidue 1000")
        .outputFluids("gtceu:primordialmatter 1000")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(1200)

    gtr.dimensionally_transcendent_mixer("gtceu:chaos_plasma")
        .itemInputs("kubejs:chaos_shard")
        .inputFluids("gtceu:uu_matter 4000", "gtceu:cosmicneutronium 2000", "gtceu:cosmic_mesh_plasma 2000", "gtceu:raw_star_matter_plasma 1000", "gtceu:dimensionallytranscendentexoticcatalyst 1000")
        .outputFluids("gtceu:chaos_plasma 10000")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(1200)

    gtr.assembler("gtceu:luv_solar_panel")
        .itemInputs("4x kubejs:pm_wafer", "16x gtceu:solar_panel", "16x gtceu:ulv_solar_panel", "16x gtceu:lv_solar_panel", "2x gtceu:cosmicneutronium_quadruple_wire", "4x gtceu:fusion_glass", "4x gtceu:double_hastelloyk_243_plate")
        .itemOutputs("gtceu:luv_solar_panel")
        .inputFluids("gtceu:mutated_living_solder 576")
        .EUt(GTValues.VA[GTValues.LuV])
        .duration(1200)

    gtr.assembler("gtceu:zpm_solar_panel")
        .itemInputs("4x kubejs:fm_wafer", "16x gtceu:mv_solar_panel", "16x gtceu:hv_solar_panel", "16x gtceu:ev_solar_panel", "2x gtceu:cosmicneutronium_hex_wire", "16x gtceu:fusion_glass", "16x gtceu:double_vibranium_plate")
        .itemOutputs("gtceu:zpm_solar_panel")
        .inputFluids("gtceu:mutated_living_solder 1296")
        .EUt(GTValues.VA[GTValues.ZPM])
        .duration(1200)

    gtr.assembler("gtceu:uv_solar_panel")
        .itemInputs("16x kubejs:fm_wafer", "16x gtceu:iv_solar_panel", "16x gtceu:luv_solar_panel", "16x gtceu:zpm_solar_panel", "2x gtceu:infinity_hex_wire", "64x gtceu:fusion_glass", "64x gtceu:double_neutronium_plate")
        .itemOutputs("gtceu:uv_solar_panel")
        .inputFluids("gtceu:super_mutated_living_solder 576")
        .EUt(GTValues.VA[GTValues.UV])
        .duration(1200)

    gtr.neutron_compressor("kubejs:combined_singularity_0")
        .itemInputs("64x gtceu:lafium_block", "64x gtceu:potin_block")
        .itemOutputs("kubejs:combined_singularity_0")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(200)

    gtr.neutron_compressor("kubejs:combined_singularity_1")
        .itemInputs("64x gtceu:enderite_block", "64x gtceu:indium_gallium_phosphide_block")
        .itemOutputs("kubejs:combined_singularity_1")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(200)

    gtr.neutron_compressor("kubejs:combined_singularity_2")
        .itemInputs("64x gtceu:ruthenium_trinium_americium_neutronate_block", "64x gtceu:yttrium_barium_cuprate_block")
        .itemOutputs("kubejs:combined_singularity_2")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(200)

    gtr.neutron_compressor("kubejs:combined_singularity_3")
        .itemInputs("64x gtceu:hastelloyk_243_block", "64x gtceu:cobalt_brass_block")
        .itemOutputs("kubejs:combined_singularity_3")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(200)

    gtr.neutron_compressor("kubejs:combined_singularity_4")
        .itemInputs("64x gtceu:titansteel_block", "64x gtceu:uranium_rhodium_dinaquadide_block")
        .itemOutputs("kubejs:combined_singularity_4")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(200)

    gtr.neutron_compressor("kubejs:combined_singularity_5")
        .itemInputs("64x gtceu:hastelloy_x_block", "64x gtceu:red_steel_block")
        .itemOutputs("kubejs:combined_singularity_5")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(200)

    gtr.neutron_compressor("kubejs:combined_singularity_6")
        .itemInputs("64x gtceu:highurabilityompoundteel_block", "64x gtceu:germaniumtungstennitride_block")
        .itemOutputs("kubejs:combined_singularity_6")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(200)

    gtr.neutron_compressor("kubejs:combined_singularity_7")
        .itemInputs("64x gtceu:hsse_block", "64x gtceu:watertight_steel_block")
        .itemOutputs("kubejs:combined_singularity_7")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(200)

    gtr.neutron_compressor("kubejs:combined_singularity_8")
        .itemInputs("64x gtceu:pikyonium_block", "64x gtceu:aluminium_bronze_block")
        .itemOutputs("kubejs:combined_singularity_8")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(200)

    gtr.neutron_compressor("kubejs:combined_singularity_9")
        .itemInputs("64x gtceu:abyssalalloy_block", "64x gtceu:soldering_alloy_block")
        .itemOutputs("kubejs:combined_singularity_9")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(200)

    gtr.neutron_compressor("kubejs:combined_singularity_10")
        .itemInputs("64x gtceu:black_titanium_block", "64x gtceu:nickel_zinc_ferrite_block")
        .itemOutputs("kubejs:combined_singularity_10")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(200)

    gtr.neutron_compressor("kubejs:combined_singularity_11")
        .itemInputs("64x gtceu:ultimet_block", "64x gtceu:hsla_steel_block")
        .itemOutputs("kubejs:combined_singularity_11")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(200)

    gtr.neutron_compressor("kubejs:combined_singularity_12")
        .itemInputs("64x gtceu:enriched_naquadah_trinium_europium_duranide_block", "64x gtceu:rtm_alloy_block")
        .itemOutputs("kubejs:combined_singularity_12")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(200)

    gtr.neutron_compressor("kubejs:combined_singularity_13")
        .itemInputs("64x gtceu:blue_steel_block", "64x gtceu:hastelloy_c_276_block")
        .itemOutputs("kubejs:combined_singularity_13")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(200)

    gtr.neutron_compressor("kubejs:combined_singularity_14")
        .itemInputs("64x gtceu:cinobite_block", "64x gtceu:stellite_100_block")
        .itemOutputs("kubejs:combined_singularity_14")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(200)

    gtr.neutron_compressor("kubejs:combined_singularity_15")
        .itemInputs("64x gtceu:maraging_steel_300_block", "64x gtceu:grisium_block")
        .itemOutputs("kubejs:combined_singularity_15")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(200)

    gtr.qft("avaritia:eternal_singularity")
        .notConsumable("avaritia:infinity_catalyst")
        .itemInputs("64x gtceu:neutronium_block",
            "kubejs:combined_singularity_0",
            "kubejs:combined_singularity_1",
            "kubejs:combined_singularity_2",
            "kubejs:combined_singularity_3",
            "kubejs:combined_singularity_4",
            "kubejs:combined_singularity_5",
            "kubejs:combined_singularity_6",
            "kubejs:combined_singularity_7",
            "kubejs:combined_singularity_8",
            "kubejs:combined_singularity_9",
            "kubejs:combined_singularity_10",
            "kubejs:combined_singularity_11",
            "kubejs:combined_singularity_12",
            "kubejs:combined_singularity_13",
            "kubejs:combined_singularity_14",
            "kubejs:combined_singularity_15")
        .inputFluids("gtceu:draconiumawakened 1000", "gtceu:cosmicneutronium 1000", "gtceu:dimensionallytranscendentstellarcatalyst 1000")
        .itemOutputs("avaritia:eternal_singularity")
        .EUt(16 * GTValues.VA[GTValues.MAX])
        .duration(200)

    gtr.qft("avaritia:eternal_singularity_1")
        .notConsumable("kubejs:eternity_catalyst")
        .itemInputs("64x gtceu:neutronium_block",
            "kubejs:combined_singularity_0",
            "kubejs:combined_singularity_1",
            "kubejs:combined_singularity_2",
            "kubejs:combined_singularity_3",
            "kubejs:combined_singularity_4",
            "kubejs:combined_singularity_5",
            "kubejs:combined_singularity_6",
            "kubejs:combined_singularity_7",
            "kubejs:combined_singularity_8",
            "kubejs:combined_singularity_9",
            "kubejs:combined_singularity_10",
            "kubejs:combined_singularity_11",
            "kubejs:combined_singularity_12",
            "kubejs:combined_singularity_13",
            "kubejs:combined_singularity_14",
            "kubejs:combined_singularity_15")
        .inputFluids("gtceu:cosmicneutronium 1000", "gtceu:exciteddtec 1000", "gtceu:spatialfluid 1000")
        .itemOutputs("16x avaritia:eternal_singularity")
        .EUt(16 * GTValues.VA[GTValues.MAX])
        .duration(200)

    gtr.qft("gtceu:spatialfluid")
        .notConsumable("kubejs:hypercube")
        .notConsumable("kubejs:quantum_anomaly")
        .itemInputs("16x gtceu:cosmicneutronium_plate")
        .inputFluids("gtceu:temporalfluid 10000", "gtceu:exciteddtsc 10000")
        .outputFluids("gtceu:spatialfluid 10000")
        .EUt(4 * GTValues.VA[GTValues.MAX])
        .duration(600)

    gtr.qft("kubejs:quantum_anomaly")
        .chancedInput("gtceu:draconium_nanoswarm", 100, 0)
        .itemInputs("kubejs:entangled_singularity")
        .inputFluids("gtceu:duranium 144", "gtceu:exciteddtec 100")
        .chancedOutput("kubejs:quantum_anomaly", 1000, 0)
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(400)

    gtr.qft("gtceu:radox_gas")
        .notConsumable("kubejs:quantum_anomaly")
        .itemInputs("64x kubejs:variation_wood")
        .inputFluids("gtceu:xenoxene 10000", "gtceu:unknowwater 90000", "gtceu:temporalfluid 100")
        .outputFluids("gtceu:radox_gas 100000")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(400)

    gtr.qft("gtceu:grade_8_purified_water")
        .circuit(1)
        .inputFluids("minecraft:water 8000")
        .outputFluids("gtceu:grade_8_purified_water 1000")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(20)

    gtr.qft("gtceu:grade_16_purified_water")
        .circuit(2)
        .inputFluids("minecraft:water 16000")
        .outputFluids("gtceu:grade_16_purified_water 1000")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(20)

    gtr.dimensionally_transcendent_plasma_forge("kubejs:hypercube_1")
        .itemInputs("16x gtceu:transcendentmetal_rod", "kubejs:quantum_anomaly")
        .inputFluids("gtceu:exciteddtec 1000", "gtceu:spatialfluid 1000")
        .itemOutputs("64x kubejs:hypercube")
        .outputFluids("gtceu:dimensionallytranscendentresidue 100")
        .EUt(16 * GTValues.VA[GTValues.MAX])
        .duration(6400)
        .blastFurnaceTemp(62000)

    gtr.chemical_reactor("gtceu:sodium_hypochlorite_dust")
        .circuit(1)
        .itemInputs("6x gtceu:sodium_hydroxide_dust")
        .inputFluids("gtceu:chlorine 2000")
        .itemOutputs("3x gtceu:sodium_hypochlorite_dust", "2x gtceu:salt_dust")
        .outputFluids("minecraft:water 1000")
        .EUt(120)
        .duration(80)

    gtr.electrolyzer("gtceu:sodium_chlorate_dust")
        .itemInputs("9x gtceu:sodium_hypochlorite_dust")
        .itemOutputs("5x gtceu:sodium_chlorate_dust", "4x gtceu:salt_dust")
        .EUt(120)
        .duration(210)

    gtr.dehydrator("gtceu:phthalic_anhydride_dust")
        .inputFluids("gtceu:phthalic_acid 1000")
        .itemOutputs("15x gtceu:phthalic_anhydride_dust")
        .EUt(480)
        .duration(400)

    gtr.chemical_reactor("gtceu:ethylanthraquinone")
        .itemInputs("15x gtceu:phthalic_anhydride_dust")
        .inputFluids("gtceu:ethylbenzene 1000")
        .outputFluids("gtceu:ethylanthraquinone 1000", "minecraft:water 1000")
        .EUt(480)
        .duration(800)

    gtr.chemical_reactor("gtceu:ethylanthrahydroquinone")
        .inputFluids("gtceu:ethylanthraquinone 1000", "gtceu:hydrogen 2000")
        .outputFluids("gtceu:ethylanthrahydroquinone 1000")
        .EUt(30)
        .duration(200)

    gtr.chemical_reactor("gtceu:hydrogen_peroxide")
        .notConsumableFluid("gtceu:anthracene 1000")
        .inputFluids("gtceu:ethylanthrahydroquinone 1000", "gtceu:oxygen 2000")
        .outputFluids("gtceu:hydrogen_peroxide 1000", "gtceu:ethylanthraquinone 1000")
        .EUt(480)
        .duration(600)

    gtr.arc_furnace("gtceu:anthracene")
        .itemInputs("gtceu:coke_gem")
        .outputFluids("gtceu:anthracene 100")
        .EUt(120)
        .duration(400)

    gtr.chemical_reactor("gtceu:sodium_perchlorate_dust")
        .inputFluids("gtceu:hydrogen_peroxide 1000")
        .itemInputs("5x gtceu:sodium_chlorate_dust")
        .itemOutputs("6x gtceu:sodium_perchlorate_dust")
        .outputFluids("minecraft:water 1000")
        .EUt(120)
        .duration(480)

    gtr.chemical_reactor("gtceu:silver_chloride_dust")
        .itemInputs("gtceu:silver_dust")
        .inputFluids("gtceu:chlorine 1000")
        .itemOutputs("2x gtceu:silver_chloride_dust")
        .EUt(120)
        .duration(80)

    gtr.chemical_reactor("gtceu:silver_oxide_dust")
        .notConsumable("gtceu:sodium_hydroxide_dust")
        .itemInputs("4x gtceu:silver_chloride_dust")
        .inputFluids("minecraft:water 1000")
        .itemOutputs("3x gtceu:silver_oxide_dust")
        .outputFluids("gtceu:diluted_hydrochloric_acid 2000")
        .EUt(30)
        .duration(100)

    gtr.large_chemical_reactor("gtceu:silver_perchlorate_dust")
        .itemInputs("3x gtceu:silver_oxide_dust", "12x gtceu:sodium_perchlorate_dust")
        .inputFluids("gtceu:hydrochloric_acid 1000")
        .itemOutputs("12x gtceu:silver_perchlorate_dust", "3x gtceu:sodium_oxide_dust")
        .outputFluids("gtceu:diluted_hydrochloric_acid 1000")
        .EUt(480)
        .duration(350)

    gtr.chemical_reactor("gtceu:phenylsodium")
        .itemInputs("2x gtceu:sodium_dust")
        .inputFluids("gtceu:fluoro_benzene 1000")
        .outputFluids("gtceu:phenylsodium 1000")
        .itemOutputs("2x gtceu:sodium_fluoride_dust")
        .EUt(480)
        .duration(210)

    gtr.chemical_reactor("gtceu:tetraethylammonium_bromide")
        .inputFluids("gtceu:ethylene 4000", "gtceu:ammonia 1000", "gtceu:hydrobromic_acid 1000")
        .outputFluids("gtceu:tetraethylammonium_bromide 1000")
        .EUt(1920)
        .duration(200)

    gtr.chemical_reactor("gtceu:difluoroaniline")
        .itemInputs("8x gtceu:sodium_fluoride_dust")
        .inputFluids("gtceu:hydrogen 1000", "gtceu:dichlorobenzene 1000", "gtceu:nitrogen 1000")
        .outputFluids("gtceu:difluoroaniline 2000")
        .itemOutputs("8x gtceu:salt_dust")
        .EUt(7680)
        .duration(200)

    gtr.large_chemical_reactor("gtceu:succinaldehyde")
        .itemInputs("14x gtceu:succinic_acid_dust", "4x gtceu:lithium_aluminium_hydride_dust")
        .outputFluids("gtceu:succinaldehyde 1000", "minecraft:water 2000")
        .itemOutputs("1x gtceu:lithium_dust", "1x gtceu:aluminium_dust")
        .EUt(1920)
        .duration(600)

    gtr.chemical_reactor("gtceu:n_difluorophenylpyrrole")
        .notConsumable("gtceu:phosphorus_pentoxide_dust")
        .inputFluids("gtceu:succinaldehyde 1000", "gtceu:difluoroaniline 1000")
        .outputFluids("gtceu:n_difluorophenylpyrrole 1000", "minecraft:water 2000")
        .EUt(480)
        .duration(180)

    gtr.large_chemical_reactor("gtceu:photopolymer")
        .itemInputs("69x gtceu:cyclopentadienyl_titanium_trichloride_dust", "42x gtceu:ice_dust", "12x gtceu:silver_perchlorate_dust")
        .inputFluids("gtceu:phenylsodium 8000", "gtceu:silver_tetrafluoroborate 2000", "gtceu:hydrochloric_acid 2000", "gtceu:n_difluorophenylpyrrole 6000", "gtceu:tetraethylammonium_bromide 2000")
        .itemOutputs("8x gtceu:silver_chloride_dust", "4x gtceu:sodium_bromide_dust")
        .outputFluids("gtceu:salt_water 6000", "gtceu:photopolymer 8000")
        .EUt(30720)
        .duration(340)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.autoclave("kubejs:hassium_seed_crystal")
        .itemInputs("gtceu:tiny_hassium_dust")
        .inputFluids("gtceu:nitrogen 10000")
        .itemOutputs("kubejs:hassium_seed_crystal")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(200)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.assembler("gtlcore:manipulator")
        .itemInputs("2x gtceu:neutron_reflector", "4x #gtceu:circuits/uhv", "gtceu:uev_robot_arm", "32x gtceu:inconel_792_bolt", "16x gtceu:diamond_screw", "4x gtceu:double_iridium_plate", "8x gtceu:double_zeron_100_plate")
        .inputFluids("gtceu:mutated_living_solder 576")
        .itemOutputs("gtlcore:manipulator")
        .EUt(30720)
        .duration(400)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.mixer("gtceu:rhodium_rhenium_naquadah_catalyst_dust")
        .itemInputs("gtceu:rhenium_dust", "gtceu:rhodium_dust", "gtceu:naquadah_dust")
        .itemOutputs("gtceu:rhodium_rhenium_naquadah_catalyst_dust")
        .EUt(84500)
        .duration(260)

    gtr.chemical_reactor("gtceu:iodine_monochloride")
        .itemInputs("gtceu:iodine_dust")
        .inputFluids("gtceu:chlorine 1000")
        .outputFluids("gtceu:iodine_monochloride 1000")
        .EUt(120)
        .duration(260)

    gtr.chemical_reactor("gtceu:dimethylnaphthalene")
        .inputFluids("gtceu:methanol 2000", "gtceu:naphthalene 1000")
        .outputFluids("gtceu:dimethylnaphthalene 1000", "minecraft:water 2000")
        .EUt(120)
        .duration(200)

    gtr.chemical_reactor("gtceu:dimethyldichlorosilane_a")
        .circuit(1)
        .itemInputs("gtceu:silicon_dust")
        .inputFluids("gtceu:chloromethane 2000")
        .outputFluids("gtceu:dimethyldichlorosilane 1000")
        .EUt(96)
        .duration(240)

    gtr.large_chemical_reactor("gtceu:acetylating_reagent")
        .itemInputs("6x gtceu:magnesium_chloride_dust")
        .inputFluids("gtceu:bromine 2000", "gtceu:trimethylchlorosilane 1000", "gtceu:acetylene 3000")
        .outputFluids("gtceu:hydrochloric_acid 3000", "gtceu:chlorine 2000", "gtceu:acetylating_reagent 1000")
        .EUt(480)
        .duration(350)

    gtr.large_chemical_reactor("gtceu:dihydroiodotetracene")
        .notConsumable("gtceu:rhodium_rhenium_naquadah_catalyst_dust")
        .itemInputs("12x gtceu:bromo_succinimide_dust")
        .inputFluids("gtceu:iodine_monochloride 1000", "gtceu:acetylating_reagent 1000", "gtceu:dimethylnaphthalene 1000", "gtceu:chlorine 2000")
        .itemOutputs("6x gtceu:magnesium_chloride_bromide_dust", "12x gtceu:succinimide_dust")
        .outputFluids("gtceu:dihydroiodotetracene 1000", "gtceu:trimethylchlorosilane 1000", "gtceu:hydrobromic_acid 1000")
        .EUt(122880)
        .duration(350)

    gtr.chemical_reactor("gtceu:isopropyl_alcohol")
        .notConsumable("gtceu:tungstate_dust")
        .notConsumable("gtceu:sodium_seaborgate_dust")
        .inputFluids("gtceu:propene 1000", "minecraft:water 1000")
        .outputFluids("gtceu:isopropyl_alcohol 1000")
        .EUt(480)
        .duration(400)

    gtr.large_chemical_reactor("gtceu:dichlorodicyanobenzoquinone")
        .inputFluids("gtceu:hydrogen_cyanide 2000", "gtceu:chlorine 10000", "gtceu:phenol 1000", "gtceu:oxygen 1000")
        .outputFluids("gtceu:diluted_hydrochloric_acid 8000", "gtceu:dichlorodicyanobenzoquinone 1000")
        .EUt(30720)
        .duration(250)

    gtr.chemical_reactor("gtceu:dichlorodicyanobenzoquinone_1")
        .inputFluids("gtceu:hydrogen_peroxide 1000", "gtceu:dichlorodicyanohydroquinone 1000")
        .outputFluids("minecraft:water 2000", "gtceu:dichlorodicyanobenzoquinone 1000")
        .EUt(480)
        .duration(250)

    gtr.large_chemical_reactor("gtceu:tetracene_dust")
        .notConsumable("gtceu:blacklight")
        .inputFluids("gtceu:isopropyl_alcohol 1000", "gtceu:dichlorodicyanobenzoquinone 2000", "gtceu:dihydroiodotetracene 2000")
        .itemOutputs("60x gtceu:tetracene_dust", "2x gtceu:iodine_dust")
        .outputFluids("gtceu:dichlorodicyanohydroquinone 2000", "gtceu:acetone 1000")
        .EUt(491520)
        .duration(260)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.mixer("gtceu:polycyclic_aromatic_mixture_dust")
        .itemInputs("2x gtceu:tetracene_dust")
        .inputFluids("gtceu:naphthalene 1000")
        .itemOutputs("3x gtceu:polycyclic_aromatic_mixture_dust")
        .EUt(7680)
        .duration(240)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.assembler("kubejs:wyvern_energy_core")
        .itemInputs("16x kubejs:wyvern_core", "64x kubejs:draconium_block_charged", "64x gtceu:iv_lapotronic_battery", "64x gtceu:luv_lapotronic_battery", "64x gtceu:double_draconium_plate")
        .inputFluids("gtceu:mutated_living_solder 5760")
        .itemOutputs("kubejs:wyvern_energy_core")
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(2400)

    gtr.sps_crafting("kubejs:dust_blizz")
        .itemInputs("minecraft:blaze_powder", "gtceu:aluminium_sulfite_dust", "16x minecraft:snowball")
        .inputFluids("gtceu:mana 1000", "gtceu:ice 1000")
        .itemOutputs("2x kubejs:dust_blizz")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(200)

    gtr.alloy_smelter("kubejs:dust_cryotheum")
        .itemInputs("kubejs:dust_blizz", "gtceu:enderium_dust")
        .itemOutputs("2x kubejs:dust_cryotheum")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(160)

    gtr.extractor("kubejs:gelid_cryotheum")
        .itemInputs("kubejs:dust_cryotheum")
        .outputFluids("kubejs:gelid_cryotheum 144")
        .EUt(GTValues.VA[GTValues.UV])
        .duration(80)

    gtr.chemical_reactor("gtceu:nitrogen_pentoxide")
        .inputFluids("gtceu:ozone 1000", "gtceu:nitrogen_dioxide 6000")
        .outputFluids("gtceu:nitrogen_pentoxide 3000")
        .EUt(480)
        .duration(240)

    gtr.chemical_reactor("gtceu:sodium_azanide_dust")
        .itemInputs("gtceu:sodium_dust")
        .inputFluids("gtceu:ammonia 1000")
        .outputFluids("gtceu:hydrogen 1000")
        .itemOutputs("4x gtceu:sodium_azanide_dust")
        .EUt(120)
        .duration(110)

    gtr.chemical_reactor("gtceu:sodium_azide_dust")
        .itemInputs("8x gtceu:sodium_azanide_dust")
        .inputFluids("gtceu:nitrogen_dioxide 1000")
        .outputFluids("gtceu:ammonia 1000")
        .itemOutputs("4x gtceu:sodium_azide_dust", "3x gtceu:sodium_hydroxide_dust")
        .EUt(480)
        .duration(170)

    gtr.chemical_reactor("gtceu:ethylamine")
        .inputFluids("gtceu:ammonia 1000", "gtceu:ethylene 1000")
        .notConsumable("gtceu:sodium_azanide_dust")
        .outputFluids("gtceu:ethylamine 1000")
        .EUt(480)
        .duration(130)

    gtr.chemical_reactor("gtceu:isochloropropane")
        .inputFluids("gtceu:propane 1000", "gtceu:chlorine 2000")
        .outputFluids("gtceu:isochloropropane 1000", "gtceu:hydrochloric_acid 1000")
        .EUt(30)
        .duration(100)

    gtr.large_chemical_reactor("gtceu:rhenium_hassium_thallium_isophtaloylbisdiethylthiourea_hexaf_dust")
        .itemInputs("2x gtceu:thallium_chloride_dust", "5x gtceu:hassium_chloride_dust", "6x gtceu:rhenium_chloride_dust")
        .inputFluids("gtceu:hexafluorophosphoric_acid 1000", "gtceu:isophthaloylbis 3000")
        .itemOutputs("125x gtceu:rhenium_hassium_thallium_isophtaloylbisdiethylthiourea_hexaf_dust")
        .outputFluids("gtceu:hydrochloric_acid 7000", "gtceu:chlorine 3000")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(200)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.chemical_reactor("gtceu:thallium_chloride_dust")
        .itemInputs("gtceu:thallium_dust")
        .inputFluids("gtceu:hydrochloric_acid 1000")
        .itemOutputs("2x gtceu:thallium_chloride_dust")
        .outputFluids("gtceu:hydrogen 1000")
        .EUt(120)
        .duration(100)

    gtr.electric_blast_furnace("gtceu:hassium_chloride_dust")
        .itemInputs("gtceu:hassium_dust")
        .inputFluids("gtceu:chlorine 4000")
        .itemOutputs("5x gtceu:hassium_chloride_dust")
        .EUt(120)
        .duration(930)
        .blastFurnaceTemp(12000)

    gtr.electric_blast_furnace("gtceu:rhenium_chloride_dust")
        .itemInputs("gtceu:rhenium_dust")
        .inputFluids("gtceu:chlorine 5000")
        .itemOutputs("6x gtceu:rhenium_chloride_dust")
        .EUt(120)
        .duration(930)
        .blastFurnaceTemp(12500)

    gtr.large_chemical_reactor("gtceu:isophthaloylbis")
        .inputFluids("gtceu:phenylenedioxydiacetic_acid 1000", "gtceu:thionyl_chloride 2000", "gtceu:diethylthiourea 2000")
        .outputFluids("gtceu:isophthaloylbis 1000", "gtceu:sulfur_dioxide 2000", "gtceu:hydrochloric_acid 4000")
        .EUt(122880)
        .duration(250)

    gtr.large_chemical_reactor("gtceu:diethylthiourea")
        .inputFluids("gtceu:hydrochloric_acid 1000", "gtceu:ethylamine 2000", "gtceu:sodium_thiocyanate 1000")
        .outputFluids("gtceu:diethylthiourea 1000", "gtceu:ammonia 1000")
        .itemOutputs("2x gtceu:salt_dust")
        .EUt(30720)
        .duration(210)

    gtr.chemical_reactor("gtceu:sodium_thiocyanate")
        .itemInputs("gtceu:sulfur_dust")
        .inputFluids("gtceu:sodium_cyanide 1000")
        .outputFluids("gtceu:sodium_thiocyanate 1000")
        .EUt(120)
        .duration(100)

    gtr.chemical_reactor("gtceu:thionyl_chloride")
        .itemInputs("gtceu:sulfur_dust")
        .inputFluids("gtceu:sulfur_trioxide 1000", "gtceu:chlorine 2000")
        .outputFluids("gtceu:thionyl_chloride 1000", "gtceu:sulfur_dioxide 1000")
        .EUt(120)
        .duration(100)

    gtr.large_chemical_reactor("gtceu:phenylenedioxydiacetic_acid")
        .inputFluids("minecraft:water 1000", "gtceu:hydrogen_peroxide 1000", "gtceu:phenol 1000", "gtceu:ethenone 2000", "gtceu:chlorine 4000")
        .outputFluids("gtceu:phenylenedioxydiacetic_acid 1000", "gtceu:hydrochloric_acid 4000")
        .EUt(122880)
        .duration(320)

    gtr.large_chemical_reactor("gtceu:hexafluorophosphoric_acid")
        .inputFluids("gtceu:antimony_pentafluoride 1000", "gtceu:phosphorus_trichloride 1000", "gtceu:hydrofluoric_acid 1000")
        .outputFluids("gtceu:hexafluorophosphoric_acid 1000")
        .itemOutputs("4x gtceu:antimony_trichloride_dust")
        .EUt(30720)
        .duration(280)

    gtr.chemical_reactor("gtceu:phosphorus_trichloride")
        .itemInputs("gtceu:phosphorus_dust")
        .inputFluids("gtceu:chlorine 3000")
        .outputFluids("gtceu:phosphorus_trichloride 1000")
        .EUt(30)
        .duration(60)

    gtr.chemical_reactor("gtceu:antimony_pentafluoride")
        .itemInputs("4x gtceu:antimony_trifluoride_dust")
        .inputFluids("gtceu:fluorine 2000")
        .outputFluids("gtceu:antimony_pentafluoride 1000")
        .EUt(480)
        .duration(100)

    gtr.chemical_reactor("gtceu:antimony_trifluoride_dust_a")
        .itemInputs("4x gtceu:antimony_trichloride_dust")
        .inputFluids("gtceu:hydrofluoric_acid 3000")
        .outputFluids("gtceu:hydrochloric_acid 3000")
        .itemOutputs("4x gtceu:antimony_trifluoride_dust")
        .EUt(480)
        .duration(210)

    gtr.chemical_reactor("gtceu:carbon_tetrachloride")
        .circuit(4)
        .itemInputs("gtceu:carbon_dust")
        .inputFluids("gtceu:chlorine 4000")
        .outputFluids("gtceu:carbon_tetrachloride 1000")
        .EUt(120)
        .duration(200)

    gtr.chemical_reactor("gtceu:actinium_oxalate_dust")
        .itemInputs("gtceu:actinium_dust")
        .inputFluids("gtceu:oxalic_acid 4000")
        .itemOutputs("13x gtceu:actinium_oxalate_dust")
        .EUt(1920)
        .duration(200)

    gtr.electric_blast_furnace("gtceu:atinium_hydride_dust")
        .itemInputs("13x gtceu:actinium_oxalate_dust", "6x gtceu:sodium_hydride_dust", "gtceu:sodium_dust")
        .inputFluids("gtceu:carbon_tetrachloride 3000")
        .itemOutputs("4x gtceu:atinium_hydride_dust", "8x gtceu:salt_dust")
        .outputFluids("gtceu:carbon_dioxide 5000")
        .EUt(122880)
        .duration(400)
        .blastFurnaceTemp(10700)

    gtr.stellar_forge("gtceu:actinium_superhydride_plasma")
        .itemInputs("kubejs:naquadria_charge", "36x gtceu:atinium_hydride_dust")
        .inputFluids("gtceu:hydrogen 81000")
        .outputFluids("gtceu:actinium_superhydride_plasma 36000")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(200)
        .addData("SCTier", 1)

    gtr.canner("kubejs:actinium_superhydride_plasma_containment_cell")
        .notConsumable("gtceu:infuscolium_nanoswarm")
        .inputFluids("gtceu:actinium_superhydride_plasma 1000")
        .itemInputs("kubejs:plasma_containment_cell")
        .itemOutputs("kubejs:actinium_superhydride_plasma_containment_cell")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(20)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.plasma_condenser("gtceu:actinium_superhydride_dust")
        .itemInputs("kubejs:actinium_superhydride_plasma_containment_cell")
        .inputFluids("gtceu:liquid_helium 24000")
        .itemOutputs("13x gtceu:actinium_superhydride_dust", "kubejs:plasma_containment_cell")
        .outputFluids("gtceu:helium 24000")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(340)

    gtr.large_chemical_reactor("gtceu:cosmic_superconductor")
        .itemInputs("125x gtceu:rhenium_hassium_thallium_isophtaloylbisdiethylthiourea_hexaf_dust", "39x gtceu:actinium_superhydride_dust", "14x gtceu:charged_caesium_cerium_cobalt_indium_dust")
        .inputFluids("gtceu:light_quarks 10000", "gtceu:free_alpha_gas 1000")
        .outputFluids("gtceu:cosmic_superconductor 10000")
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(600)
        .cleanroom(GTLCleanroomType.LAW_CLEANROOM)

    gtr.mixer("gtceu:charged_caesium_cerium_cobalt_indium_dust")
        .itemInputs("10x gtceu:indium_dust", "2x gtceu:cobalt_dust", "1x gtceu:cerium_dust", "1x gtceu:caesium_dust")
        .inputFluids("gtceu:cosmic_computing_mixture 1000")
        .itemOutputs("14x gtceu:charged_caesium_cerium_cobalt_indium_dust")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(400)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.large_chemical_reactor("kubejs:charged_lepton_trap_crystal")
        .notConsumable("gtceu:starmetal_nanoswarm")
        .itemInputs("kubejs:lepton_trap_crystal", "2x gtceu:small_vibranium_dust")
        .inputFluids("gtceu:free_electron_gas 1000", "gtceu:heavy_lepton_mixture 1000")
        .itemOutputs("kubejs:charged_lepton_trap_crystal")
        .EUt(491520)
        .duration(240)
        .cleanroom(GTLCleanroomType.LAW_CLEANROOM)

    gtr.electric_blast_furnace("kubejs:lepton_trap_crystal")
        .itemInputs("gtceu:meitnerium_dust", "gtceu:molybdenum_dust", "gtceu:rhenium_dust")
        .inputFluids("gtceu:naquadah_alloy 288")
        .itemOutputs("kubejs:lepton_trap_crystal")
        .EUt(3450000)
        .duration(340)
        .blastFurnaceTemp(10900)

    gtr.chemical_reactor("gtceu:styrene_a")
        .circuit(1)
        .inputFluids("gtceu:ethylbenzene 1000")
        .outputFluids("gtceu:styrene 1000", "gtceu:hydrogen 2000")
        .EUt(30)
        .duration(30)

    gtr.electric_blast_furnace("kubejs:taranium_boulea")
        .itemInputs("64x gtceu:silicon_block", "8x gtceu:taranium_ingot", "4x gtceu:gallium_arsenide_dust")
        .inputFluids("gtceu:radon 16000")
        .itemOutputs("kubejs:taranium_boule")
        .EUt(GTValues.VA[GTValues.ZPM])
        .duration(24000)
        .blastFurnaceTemp(10500)

    gtr.assembler("gtceu:integrated_ore_processor")
        .itemInputs("gtceu:large_maceration_tower",
            "gtceu:large_centrifuge",
            "gtceu:large_sifting_funnel",
            "gtceu:large_chemical_bath",
            "8x gtceu:zpm_robot_arm",
            "8x gtceu:zpm_electric_pump",
            "8x gtceu:zpm_conveyor_module",
            "4x #gtceu:circuits/uhv",
            "16x gtceu:double_hsss_plate")
        .inputFluids("gtceu:duranium 2880")
        .itemOutputs("gtceu:integrated_ore_processor")
        .EUt(GTValues.VA[GTValues.ZPM])
        .duration(1000)

    gtr.alloy_smelter("gtlcore:dragon_strength_tritanium_casing")
        .itemInputs("16x gtlcore:extreme_strength_tritanium_casing", "16x kubejs:draconium_block_charged")
        .itemOutputs("gtlcore:dragon_strength_tritanium_casing")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(2000)

    gtr.chemical_reactor("gtlcore:blaze_blast_furnace_casing")
        .itemInputs("gtceu:high_temperature_smelting_casing", "32x gtceu:tin_foil")
        .inputFluids("gtceu:blaze 1440", "gtceu:gallium_arsenide 576", "gtceu:vanadium_gallium 288")
        .itemOutputs("gtlcore:blaze_blast_furnace_casing")
        .EUt(1920)
        .duration(900)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.chemical_reactor("gtceu:vinyl_chloride_a")
        .circuit(1)
        .inputFluids("gtceu:chlorine 4000", "gtceu:ethane 1000")
        .outputFluids("gtceu:vinyl_chloride 1000", "gtceu:hydrochloric_acid 3000")
        .EUt(30)
        .duration(160)

    gtr.assembly_line("kubejs:dimension_creation_casing")
        .itemInputs("gtceu:infinity_frame",
            "64x gtceu:lv_world_accelerator",
            "64x gtceu:mv_world_accelerator",
            "64x gtceu:hv_world_accelerator",
            "64x gtceu:ev_world_accelerator",
            "64x gtceu:iv_world_accelerator",
            "64x gtceu:luv_world_accelerator",
            "64x gtceu:zpm_world_accelerator",
            "64x gtceu:uv_world_accelerator",
            "16x gtlcore:hyper_core",
            "4x gtlcore:spacetimebendingcore",
            "4x kubejs:dimensional_stability_casing",
            "4x kubejs:spacetime_compression_field_generator",
            "6x kubejs:topological_manipulator_unit",
            "gtlcore:max_field_generator",
            "4x gtceu:double_eternity_plate")
        .inputFluids("gtceu:infinity 576", "gtceu:super_mutated_living_solder 1000", "gtceu:liquid_cosmic_mesh 1000", "gtceu:spatialfluid 2000")
        .itemOutputs("kubejs:dimension_creation_casing")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(1200)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtlcore:dimension_connection_casing"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.MAX])
            .CWUt(8192))

    gtr.assembly_line("gtceu:door_of_create")
        .itemInputs("16x gtceu:infinity_frame",
            "16x gtceu:eye_of_harmony",
            "16x kubejs:dimension_creation_casing",
            "16x gtlcore:dimension_connection_casing",
            "8x kubejs:suprachronal_mainframe_complex",
            "8x kubejs:cosmic_singularity",
            "8x kubejs:chaotic_core",
            "64x kubejs:void_matter",
            "16x kubejs:quantum_anomaly",
            "16x gtlcore:max_robot_arm",
            "gtlcore:mega_max_battery",
            "64x gtceu:double_cosmic_plate")
        .inputFluids("gtceu:super_mutated_living_solder 288000", "gtceu:infinity 100000", "gtceu:liquid_cosmic_mesh 100000", "gtceu:spacetime 100000")
        .itemOutputs("gtceu:door_of_create")
        .EUt(4 * GTValues.VA[GTValues.MAX])
        .duration(2400)
        .stationResearch(b => b.researchStack(Registries.getItemStack("kubejs:dimension_creation_casing"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.MAX])
            .CWUt(16384))

    gtr.assembler("gtlcore:dimension_connection_casing")
        .itemInputs("gtceu:draconium_frame", "kubejs:dimensional_bridge_casing", "gtceu:periodicium_block", "8x gtceu:double_mithril_plate", "4x gtceu:cosmic_plate", "2x gtceu:double_shirabon_plate")
        .itemOutputs("gtlcore:dimension_connection_casing")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(400)

    gtr.lightning_processor("gtceu:adamantine_compounds_dust_a")
        .notConsumable("kubejs:microwormhole_generator")
        .itemInputs("4x gtceu:adamantine_compounds_dust")
        .itemOutputs("gtceu:adamantine_dust")
        .inputFluids("gtceu:mana 1000")
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(20)

    gtr.assembler("kubejs:magnetohydrodynamicallyconstrainedstarmatter_helmet")
        .notConsumable("gtceu:spacetime_nanoswarm")
        .notConsumable("gtceu:cosmicneutronium_nanoswarm")
        .itemInputs("50x gtceu:magnetohydrodynamicallyconstrainedstarmatter_ingot", "kubejs:command_block_core")
        .itemOutputs("kubejs:magnetohydrodynamicallyconstrainedstarmatter_helmet")
        .EUt(65536 * GTValues.VA[GTValues.MAX])
        .circuit(1)
        .duration(200)

    gtr.assembler("kubejs:magnetohydrodynamicallyconstrainedstarmatter_chestplate")
        .notConsumable("gtceu:spacetime_nanoswarm")
        .notConsumable("gtceu:cosmicneutronium_nanoswarm")
        .itemInputs("80x gtceu:magnetohydrodynamicallyconstrainedstarmatter_ingot", "kubejs:command_block_core")
        .itemOutputs("kubejs:magnetohydrodynamicallyconstrainedstarmatter_chestplate")
        .EUt(65536 * GTValues.VA[GTValues.MAX])
        .circuit(2)
        .duration(200)

    gtr.assembler("kubejs:magnetohydrodynamicallyconstrainedstarmatter_leggings")
        .notConsumable("gtceu:spacetime_nanoswarm")
        .notConsumable("gtceu:cosmicneutronium_nanoswarm")
        .itemInputs("70x gtceu:magnetohydrodynamicallyconstrainedstarmatter_ingot", "kubejs:command_block_core")
        .itemOutputs("kubejs:magnetohydrodynamicallyconstrainedstarmatter_leggings")
        .EUt(65536 * GTValues.VA[GTValues.MAX])
        .circuit(3)
        .duration(200)

    gtr.assembler("kubejs:magnetohydrodynamicallyconstrainedstarmatter_boots")
        .notConsumable("gtceu:spacetime_nanoswarm")
        .notConsumable("gtceu:cosmicneutronium_nanoswarm")
        .itemInputs("40x gtceu:magnetohydrodynamicallyconstrainedstarmatter_ingot", "kubejs:command_block_core")
        .itemOutputs("kubejs:magnetohydrodynamicallyconstrainedstarmatter_boots")
        .EUt(65536 * GTValues.VA[GTValues.MAX])
        .circuit(4)
        .duration(200)

    gtr.large_chemical_reactor("gtceu:glycerol_a")
        .circuit(1)
        .notConsumable("gtceu:soda_ash_dust")
        .notConsumableFluid("gtceu:carbon_dioxide 10000")
        .itemInputs("3x gtceu:sodium_hydroxide_dust")
        .inputFluids("gtceu:epichlorohydrin 1000", "minecraft:water 2000")
        .outputFluids("gtceu:glycerol 1000", "gtceu:salt_water 1000")
        .EUt(7680)
        .duration(150)

    gtr.assembler("gtlcore:echo_casing")
        .itemInputs("gtceu:europium_frame", "kubejs:reinforced_echo_shard", "6x gtceu:double_hsse_plate")
        .itemOutputs("2x gtlcore:echo_casing")
        .circuit(6)
        .EUt(30)
        .duration(200)

    gtr.precision_assembler("kubejs:machine_casing_grinding_head")
        .itemInputs("gtceu:europium_frame", "8x kubejs:reinforced_echo_shard", "6x gtceu:tungsten_grinding_head", "36x gtceu:double_hsse_plate")
        .inputFluids("gtceu:annealed_copper 1440", "gtceu:invar 1440", "gtceu:nickel_zinc_ferrite 1440", "gtceu:osmiridium 1440")
        .itemOutputs("kubejs:machine_casing_grinding_head")
        .EUt(GTValues.VA[GTValues.UV])
        .duration(1600)
        .cleanroom(GTLCleanroomType.LAW_CLEANROOM)

    gtr.precision_assembler("kubejs:bedrock_drill")
        .itemInputs("kubejs:reinforced_echo_shard", "minecraft:bedrock", "gtceu:neutronium_buzz_saw_blade", "4x gtceu:double_neutronium_plate")
        .inputFluids("gtceu:rhodium 576", "gtceu:hastelloy_x 576", "gtceu:hsss 576", "gtceu:hsse 576")
        .itemOutputs("kubejs:bedrock_drill")
        .EUt(GTValues.VA[GTValues.UV])
        .duration(1600)
        .cleanroom(GTLCleanroomType.LAW_CLEANROOM)

    gtr.large_chemical_reactor("gtceu:toluene_diisocyanate")
        .inputFluids("gtceu:nitric_acid 2000", "gtceu:phosgene 2000", "gtceu:toluene 1000", "gtceu:hydrogen 1000")
        .outputFluids("gtceu:toluene_diisocyanate 2000", "gtceu:hydrochloric_acid 4000", "minecraft:water 6000")
        .EUt(480)
        .duration(130)

    gtr.chemical_reactor("gtceu:polyurethane")
        .inputFluids("gtceu:oxygen 1000", "gtceu:ethyleneglycol 4000", "gtceu:toluene_diisocyanate 1000")
        .outputFluids("gtceu:polyurethane 1000", "minecraft:water 7000")
        .EUt(480)
        .duration(110)

    gtr.mixer("gtceu:viscoelastic_polyurethane")
        .itemInputs("5x gtceu:calcite_dust")
        .inputFluids("gtceu:polyurethane 1000", "gtceu:ethyleneglycol 1000")
        .outputFluids("gtceu:viscoelastic_polyurethane 2000")
        .EUt(120)
        .duration(110)

    gtr.mixer("gtceu:viscoelastic_polyurethane_foam")
        .inputFluids("gtceu:viscoelastic_polyurethane 1000", "gtceu:air 1000")
        .outputFluids("gtceu:viscoelastic_polyurethane_foam 2000")
        .EUt(120)
        .duration(150)

    gtr.fluid_solidifier("kubejs:memory_foam_block")
        .notConsumable("gtceu:block_casting_mold")
        .inputFluids("gtceu:viscoelastic_polyurethane_foam 1000")
        .itemOutputs("kubejs:memory_foam_block")
        .EUt(30)
        .duration(60)

    gtr.chemical_bath("gtceu:glucose")
        .itemInputs("2x gtceu:sugar_gem")
        .inputFluids("minecraft:water 1000")
        .itemOutputs("24x gtceu:glucose_dust")
        .EUt(480)
        .duration(300)

    gtr.mixer("gtceu:glucose_iron_solution")
        .itemInputs("24x gtceu:glucose_dust")
        .inputFluids("gtceu:iron_iii_chloride 1000")
        .outputFluids("gtceu:glucose_iron_solution 1000")
        .EUt(30)
        .duration(80)

    gtr.dehydrator("kubejs:graphene_iron_plate")
        .notConsumable("gtceu:long_yttrium_barium_cuprate_rod")
        .inputFluids("gtceu:glucose_iron_solution 1000")
        .itemOutputs("kubejs:graphene_iron_plate")
        .EUt(120)
        .duration(40)

    gtr.electromagnetic_separator("gtceu:graphene_oxide_dust")
        .itemInputs("kubejs:graphene_iron_plate")
        .itemOutputs("3x gtceu:graphene_oxide_dust", "gtceu:iron_dust")
        .EUt(30)
        .duration(120)

    gtr.mixer("gtceu:graphene_gel_suspension_dust")
        .itemInputs("3x gtceu:graphene_oxide_dust")
        .inputFluids("gtceu:resorcinol 1000", "gtceu:formaldehyde 1000")
        .itemOutputs("gtceu:graphene_gel_suspension_dust")
        .EUt(120)
        .duration(100)

    gtr.vacuum_freezer("gtlcore:cold_ice_casing")
        .itemInputs("gtceu:frostproof_machine_casing")
        .inputFluids("gtceu:ice 10000", "gtceu:vanadium_gallium 576")
        .itemOutputs("gtlcore:cold_ice_casing")
        .EUt(GTValues.VA[GTValues.EV])
        .duration(200)

    gtr.autoclave("gtceu:dry_graphene_gel_dust")
        .inputFluids("gtceu:acetone 1000")
        .itemInputs("gtceu:graphene_gel_suspension_dust")
        .itemOutputs("gtceu:dry_graphene_gel_dust")
        .EUt(480)
        .duration(260)

    gtr.fluid_heater("gtceu:supercritical_carbon_dioxide")
        .inputFluids("gtceu:carbon_dioxide 1000")
        .outputFluids("gtceu:supercritical_carbon_dioxide 1000")
        .EUt(480)
        .duration(200)

    gtr.electric_blast_furnace("kubejs:aerographene")
        .itemInputs("gtceu:dry_graphene_gel_dust")
        .inputFluids("gtceu:supercritical_carbon_dioxide 1000")
        .itemOutputs("kubejs:aerographene")
        .EUt(120)
        .duration(400)
        .blastFurnaceTemp(5000)

    gtr.qft("kubejs:hyper_stable_self_healing_adhesive")
        .chancedInput("gtceu:uruium_nanoswarm", 500, 0)
        .itemInputs("64x gtceu:activated_carbon_dust", "64x gtceu:bismuth_dust")
        .inputFluids("gtceu:oxygen 20000", "gtceu:hydrogen 20000")
        .chancedOutput("kubejs:hyper_stable_self_healing_adhesive", 2000, 0)
        .EUt(4 * GTValues.VA[GTValues.MAX])
        .duration(20)

    gtr.qft("kubejs:black_body_naquadria_supersolid")
        .chancedInput("gtceu:uruium_nanoswarm", 500, 0)
        .itemInputs("64x gtceu:naquadria_dust", "64x gtceu:magnesium_dust")
        .inputFluids("gtceu:phosphoric_acid 20000", "gtceu:sulfuric_acid 20000")
        .chancedOutput("kubejs:black_body_naquadria_supersolid", 2000, 0)
        .EUt(4 * GTValues.VA[GTValues.MAX])
        .duration(20)

    gtr.assembler("kubejs:two_way_foil")
        .itemInputs("gtceu:chaos_foil", "kubejs:hyper_stable_self_healing_adhesive", "kubejs:cosmic_fabric")
        .itemOutputs("kubejs:two_way_foil")
        .EUt(4 * GTValues.VA[GTValues.MAX])
        .duration(200)

    gtr.dimensionally_transcendent_plasma_forge("gtlcore:infinity_glass")
        .itemInputs("kubejs:black_body_naquadria_supersolid", "2x gtceu:infinity_dust")
        .inputFluids("gtceu:dimensionallytranscendentexoticcatalyst 1000", "gtceu:woods_glass 9216")
        .itemOutputs("gtlcore:infinity_glass")
        .EUt(4096 * GTValues.VA[GTValues.MAX])
        .duration(1600)
        .blastFurnaceTemp(88000)

    gtr.dimensionally_transcendent_plasma_forge("gtlcore:create_casing")
        .itemInputs("gtceu:eternity_frame", "kubejs:command_block_core")
        .inputFluids("gtceu:exciteddtsc 1000", "gtceu:primordialmatter 1000")
        .itemOutputs("gtlcore:create_casing")
        .EUt(16384 * GTValues.VA[GTValues.MAX])
        .duration(3200)
        .blastFurnaceTemp(96000)

    gtr.gravitation_shockburst("kubejs:chain_command_block_core")
        .itemInputs("kubejs:command_block_core", "64x minecraft:observer")
        .itemOutputs("kubejs:chain_command_block_core")
        .EUt(65536 * GTValues.VA[GTValues.MAX])
        .duration(20)

    gtr.gravitation_shockburst("kubejs:repeating_command_block_core")
        .itemInputs("kubejs:chain_command_block_core", "64x minecraft:calibrated_sculk_sensor")
        .itemOutputs("kubejs:repeating_command_block_core")
        .EUt(65536 * GTValues.VA[GTValues.MAX])
        .duration(20)

    gtr.gravitation_shockburst("kubejs:command_block_broken")
        .itemInputs("minecraft:command_block", "gtceu:magnetohydrodynamicallyconstrainedstarmatter_dust")
        .itemOutputs("kubejs:command_block_broken")
        .EUt(65536 * GTValues.VA[GTValues.MAX])
        .duration(20)

    gtr.gravitation_shockburst("kubejs:chain_command_block_broken")
        .itemInputs("minecraft:chain_command_block", "gtceu:magnetohydrodynamicallyconstrainedstarmatter_dust")
        .itemOutputs("kubejs:chain_command_block_broken")
        .EUt(65536 * GTValues.VA[GTValues.MAX])
        .duration(20)

    gtr.assembly_line("kubejs:chaotic_energy_core")
        .itemInputs("kubejs:draconic_energy_core",
            "64x gtceu:uhv_ultimate_battery",
            "16x kubejs:chaotic_core",
            "32x #gtceu:circuits/max",
            "16x gtceu:white_dwarf_mtter_nanoswarm",
            "16x gtceu:black_dwarf_mtter_nanoswarm",
            "64x kubejs:smd_capacitor_supracausal",
            "64x kubejs:smd_diode_supracausal",
            "64x kubejs:smd_resistor_supracausal",
            "64x kubejs:smd_transistor_supracausal",
            "64x kubejs:smd_inductor_supracausal",
            "64x gtceu:chaos_block",
            "64x gtceu:magnetohydrodynamicallyconstrainedstarmatter_rod",
            "64x gtceu:magnetohydrodynamicallyconstrainedstarmatter_plate",
            "64x gtceu:shirabon_plate",
            "32x gtceu:double_cosmic_plate")
        .inputFluids("gtceu:super_mutated_living_solder 28800", "gtceu:chaos 28800", "gtceu:spacetime 10000", "gtceu:primordialmatter 10000")
        .itemOutputs("kubejs:chaotic_energy_core")
        .EUt(64 * GTValues.VA[GTValues.MAX])
        .duration(2560)
        .stationResearch(b => b.researchStack(Registries.getItemStack("kubejs:create_ultimate_battery"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.MAX])
            .CWUt(16384))

    gtr.assembly_line("kubejs:hollow_casing")
        .itemInputs("gtlcore:molecular_casing",
            "16x gtceu:magnalium_screw",
            "4x gtceu:europium_plate",
            "4x gtceu:apatite_rod",
            "2x gtceu:double_uranium_plate",
            "16x gtceu:molybdenum_screw",
            "4x gtceu:double_duranium_plate",)
        .inputFluids("gtceu:stainless_steel 1296", "gtceu:indium_gallium_phosphide 1296", "gtceu:wrought_iron 1296", "gtceu:indium_tin_barium_titanium_cuprate 1296")
        .itemOutputs("2x kubejs:hollow_casing")
        .EUt(GTValues.VA[GTValues.UV])
        .duration(200)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtlcore:molecular_casing"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UV])
            .CWUt(128))

    gtr.assembly_line("kubejs:spacetime_assembly_line_unit")
        .itemInputs("gtceu:adamantium_frame",
            "gtlcore:advanced_assembly_line_unit",
            "kubejs:machine_casing_circuit_assembly_line",
            "kubejs:precision_circuit_assembly_robot_mk2",
            "gtceu:osmium_nanoswarm",
            "6x kubejs:optical_processing_core",
            "2x #gtceu:circuits/uev",
            "4x gtceu:blue_steel_gear",
            "4x gtceu:red_steel_gear",
            "4x gtceu:zpm_robot_arm",
            "6x gtceu:double_pikyonium_plate")
        .inputFluids("gtceu:liquidcrystalkevlar 5760", "gtceu:enderite 1296", "gtceu:highurabilityompoundteel 1296", "gtceu:pikyonium 1296")
        .itemOutputs("kubejs:spacetime_assembly_line_unit")
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(400)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtlcore:advanced_assembly_line_unit"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UHV])
            .CWUt(256))

    gtr.assembly_line("kubejs:molecular_coil")
        .itemInputs("kubejs:hollow_casing",
            "2x gtceu:naquadah_coil_block",
            "2x gtceu:fusion_coil",
            "64x gtceu:fine_europium_wire",
            "32x gtceu:enriched_naquadah_trinium_europium_duranide_foil")
        .inputFluids("gtceu:borosilicate_glass 2304", "gtceu:silicone_rubber 5760", "gtceu:uranium_triplatinum 1296", "gtceu:stellite_100 1296")
        .itemOutputs("2x kubejs:molecular_coil")
        .EUt(GTValues.VA[GTValues.UV])
        .duration(400)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:molybdenum_disilicide_coil_block"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UV])
            .CWUt(128))

    gtr.assembly_line("kubejs:containment_field_generator")
        .itemInputs("kubejs:hollow_casing",
            "4x gtceu:luv_field_generator",
            "6x gtceu:indium_tin_barium_titanium_cuprate_quadruple_wire",
            "4x #gtceu:circuits/uv",
            "gtceu:uv_transformer_16a",
            "6x gtceu:double_vanadium_gallium_plate",
            "4x gtceu:double_enriched_naquadah_trinium_europium_duranide_plate")
        .inputFluids("gtceu:lanthanum 2304", "gtceu:cobalt_brass 5760", "gtceu:battery_alloy 5760", "gtceu:molybdenum_disilicide 1296")
        .itemOutputs("kubejs:containment_field_generator")
        .EUt(GTValues.VA[GTValues.UV])
        .duration(500)
        .stationResearch(b => b.researchStack(Registries.getItemStack("kubejs:force_field_glass"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UV])
            .CWUt(128))

    gtr.assembly_line("gtceu:crystalline_infinity")
        .itemInputs("4x gtceu:uev_autoclave",
            "4x gtceu:uev_chemical_bath",
            "16x gtceu:uhv_emitter",
            "16x gtceu:uhv_electric_pump",
            "8x gtceu:adamantium_rotor",
            "4x gtceu:neutronium_nanoswarm",
            "32x #gtceu:circuits/uev",
            "16x gtceu:titansteel_octal_cable",
            "16x gtceu:double_indium_tin_barium_titanium_cuprate_plate",
            "32x gtceu:double_tritanium_plate")
        .inputFluids("gtceu:lanthanum 2304", "gtceu:cobalt_brass 5760", "gtceu:battery_alloy 5760", "gtceu:molybdenum_disilicide 1296")
        .itemOutputs("gtceu:crystalline_infinity")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(600)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:large_autoclave"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UEV])
            .CWUt(256))

    gtr.assembly_line("gtceu:star_ultimate_material_forge_factory")
        .itemInputs("4x gtceu:stellar_forge",
            "4x gtceu:uiv_electric_furnace",
            "4x gtceu:uiv_arc_furnace",
            "4x gtceu:uiv_alloy_smelter",
            "16x gtceu:uiv_electric_pump",
            "gtlcore:transcendent_max_battery",
            "4x gtceu:uxv_sensor",
            "16x #gtceu:circuits/uxv",
            "8x kubejs:containment_field_generator",
            "8x gtlcore:hyper_core",
            "64x gtceu:vibranium_plate",
            "32x gtceu:double_vibramantium_plate")
        .inputFluids("gtceu:incoloy_ma_956 5760", "gtceu:germaniumtungstennitride 5760", "gtceu:abyssalalloy 5760", "gtceu:titanium_carbide 5760")
        .itemOutputs("gtceu:star_ultimate_material_forge_factory")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(1200)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtlcore:ultimate_stellar_containment_casing"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UIV])
            .CWUt(1024))

    gtr.assembly_line("gtceu:suprachronal_assembly_line")
        .itemInputs("gtlcore:infinite_cell_component",
            "16x gtceu:advanced_assembly_line",
            "16x gtceu:circuit_assembly_line",
            "4x kubejs:spacetime_assembly_line_casing",
            "4x kubejs:spacetime_assembly_line_unit",
            "32x kubejs:molecular_coil",
            "16x gtceu:uev_emitter",
            "16x gtceu:uev_sensor",
            "16x kubejs:precision_circuit_assembly_robot_mk3",
            "16x #gtceu:circuits/uiv",
            "gtceu:max_battery",
            "32x gtceu:double_dalisenite_plate")
        .inputFluids("gtceu:borosilicate_glass 3204", "gtceu:silicone_rubber 5760", "gtceu:uranium_triplatinum 1296", "gtceu:stellite_100 1296")
        .itemOutputs("gtceu:suprachronal_assembly_line")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(800)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:assembler_module"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UEV])
            .CWUt(256))

    gtr.assembler("kubejs:force_field_glass")
        .itemInputs("gtceu:laminated_glass", "gtceu:uhv_field_generator", "4x gtceu:long_naquadah_alloy_rod", "2x gtceu:long_mithril_rod", "4x gtceu:double_uranium_rhodium_dinaquadide_plate", "2x gtceu:double_naquadah_alloy_plate")
        .inputFluids("gtceu:mutated_living_solder 1296")
        .itemOutputs("kubejs:force_field_glass")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(400)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.assembler("gtlcore:molecular_casing")
        .itemInputs("gtceu:high_power_casing", "4x gtceu:double_battery_alloy_plate", "gtceu:iv_emitter", "24x gtceu:darmstadtium_ring", "12x gtceu:tungsten_foil", "12x gtceu:ruridit_foil", "24x gtceu:tungsten_steel_foil", "6x gtceu:rhodium_plate", "4x gtceu:double_ruthenium_plate")
        .inputFluids("gtceu:niobium_nitride 864")
        .itemOutputs("gtlcore:molecular_casing")
        .EUt(GTValues.VA[GTValues.UV])
        .duration(400)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.assembler("kubejs:spacetime_assembly_line_casing")
        .itemInputs("gtceu:assembly_line_casing", "gtceu:uhv_emitter", "4x gtceu:uev_electric_motor", "2x gtceu:uev_conveyor_module", "2x gtceu:uev_electric_piston", "2x #gtceu:circuits/uev", "8x gtceu:double_zinc_plate")
        .inputFluids("gtceu:liquid_degenerate_rhenium 200")
        .itemOutputs("kubejs:spacetime_assembly_line_casing")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(400)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.assembler("gtceu:electric_implosion_compressor")
        .itemInputs("4x gtceu:implosion_compressor", "4x gtceu:luv_transformer_16a", "4x gtceu:luv_diode", "8x gtceu:luv_field_generator", "16x gtceu:tritanium_hex_cable", "4x gtceu:dense_obsidian_plate", "4x gtceu:dense_tungsten_steel_plate")
        .inputFluids("gtceu:soldering_alloy 1296")
        .itemOutputs("gtceu:electric_implosion_compressor")
        .EUt(GTValues.VA[GTValues.LuV])
        .duration(600)

    gtr.compressor("gtceu:dimensionally_transcendent_dirt_forge")
        .itemInputs("16x gtceu:primitive_blast_furnace")
        .itemOutputs("gtceu:dimensionally_transcendent_dirt_forge")
        .EUt(8)
        .duration(1200)

    gtr.compressor("gtceu:dimensionally_transcendent_steam_boiler")
        .itemInputs("16x gtceu:tungstensteel_large_boiler")
        .itemOutputs("gtceu:dimensionally_transcendent_steam_boiler")
        .EUt(GTValues.VA[GTValues.IV])
        .duration(1200)

    gtr.assembler("gtceu:steam_mega_turbine")
        .itemInputs("8x gtceu:steam_large_turbine", "16x #gtceu:circuits/iv", "4x gtceu:ev_electric_pump", "8x gtceu:ev_electric_piston", "8x gtceu:black_bronze_turbine_blade", "8x gtceu:double_molybdenum_plate", "32x gtceu:double_steel_plate")
        .itemOutputs("gtceu:steam_mega_turbine")
        .EUt(GTValues.VA[GTValues.EV])
        .duration(1200)

    gtr.assembler("gtceu:gas_mega_turbine")
        .itemInputs("8x gtceu:gas_large_turbine", "16x #gtceu:circuits/luv", "8x gtceu:ev_electric_pump", "32x gtceu:ev_electric_piston", "8x gtceu:neodymium_turbine_blade", "8x gtceu:double_sterling_silver_plate", "32x gtceu:double_stainless_steel_plate")
        .itemOutputs("gtceu:gas_mega_turbine")
        .EUt(GTValues.VA[GTValues.IV])
        .duration(1200)

    gtr.assembler("gtceu:rocket_mega_turbine")
        .itemInputs("8x gtceu:rocket_large_turbine", "16x #gtceu:circuits/zpm", "4x gtceu:iv_electric_motor", "8x gtceu:iv_electric_piston", "8x gtceu:tungsten_turbine_blade", "8x gtceu:double_vanadium_steel_plate", "32x gtceu:double_titanium_plate")
        .itemOutputs("gtceu:rocket_mega_turbine")
        .EUt(GTValues.VA[GTValues.IV])
        .duration(1200)

    gtr.assembler("gtceu:plasma_mega_turbine")
        .itemInputs("8x gtceu:plasma_large_turbine", "16x #gtceu:circuits/uv", "8x gtceu:iv_electric_pump", "16x gtceu:iv_electric_piston", "8x gtceu:osmiridium_turbine_blade", "8x gtceu:double_ultimet_plate", "32x gtceu:double_tungsten_steel_plate")
        .itemOutputs("gtceu:plasma_mega_turbine")
        .EUt(GTValues.VA[GTValues.LuV])
        .duration(1200)

    gtr.assembler("gtceu:chemical_energy_devourer")
        .itemInputs("4x gtceu:extreme_combustion_engine", "4x gtceu:iv_field_generator", "8x gtceu:iv_emitter", "8x gtceu:iv_electric_pump", "16x gtceu:ev_fluid_regulator", "8x gtceu:small_tungsten_spring", "8x gtceu:small_vanadium_gallium_spring", "8x gtceu:luv_transformer_4a", "4x gtceu:dense_tungsten_steel_plate")
        .inputFluids("gtceu:lubricant 10000")
        .itemOutputs("gtceu:chemical_energy_devourer")
        .EUt(GTValues.VA[GTValues.IV])
        .duration(1200)

    gtr.assembler("gtlcore:degenerate_rhenium_constrained_casing")
        .circuit(6)
        .itemInputs("gtceu:quantanium_frame", "6x gtceu:degenerate_rhenium_plate")
        .itemOutputs("2x gtlcore:degenerate_rhenium_constrained_casing")
        .EUt(GTValues.VA[GTValues.UV])
        .duration(1200)

    gtr.assembler("gtlcore:rhenium_reinforced_energy_glass")
        .itemInputs("4x gtceu:fusion_glass", "6x gtceu:degenerate_rhenium_plate")
        .itemOutputs("2x gtlcore:rhenium_reinforced_energy_glass")
        .EUt(GTValues.VA[GTValues.UV])
        .duration(1200)

    gtr.ultimate_material_forge("kubejs:proto_matter")
        .itemInputs("kubejs:triplet_neutronium_sphere")
        .inputFluids("gtceu:uu_matter 1000")
        .itemOutputs("kubejs:proto_matter")
        .chancedOutput("gtceu:neutronium_ingot", 6000, 0)
        .EUt(GTValues.VA[GTValues.OpV])
        .duration(1600)

    function implosion_compressor_add(input, output, am) {
        gtr.implosion_compressor(output + "_powderbarrel")
            .itemInputs(input)
            .itemInputs("8x gtceu:powderbarrel")
            .itemOutputs(am + "x " + output)
            .chancedOutput("gtceu:dark_ash_dust", 2500, 0)
            .EUt(30)
            .duration(20)

        gtr.implosion_compressor(output + "_tnt")
            .itemInputs(input)
            .itemInputs("4x minecraft:tnt")
            .itemOutputs(am + "x " + output)
            .chancedOutput("gtceu:dark_ash_dust", 2500, 0)
            .EUt(30)
            .duration(20)

        gtr.implosion_compressor(output + "_dynamite")
            .itemInputs(input)
            .itemInputs("2x gtceu:dynamite")
            .itemOutputs(am + "x " + output)
            .chancedOutput("gtceu:dark_ash_dust", 2500, 0)
            .EUt(30)
            .duration(20)

        gtr.implosion_compressor(output + "_itnt")
            .itemInputs(input)
            .itemInputs("gtceu:industrial_tnt")
            .itemOutputs(am + "x " + output)
            .chancedOutput("gtceu:dark_ash_dust", 2500, 0)
            .EUt(30)
            .duration(20)

        gtr.electric_implosion_compressor("e" + output)
            .itemInputs(input)
            .itemOutputs(am + "x " + output)
            .EUt(GTValues.VA[GTValues.UV])
            .duration(1)
    }
    implosion_compressor_add("4x gtceu:echo_shard_dust", "minecraft:echo_shard", 3)
    implosion_compressor_add(["minecraft:command_block", "kubejs:two_way_foil"], "kubejs:command_block_core", 1)
    implosion_compressor_add(["ae2:singularity", "kubejs:warped_ender_pearl"], "kubejs:entangled_singularity", 1)
    implosion_compressor_add(["4x ad_astra:steel_plate", "2x gtceu:dense_tungsten_steel_plate"], "ad_astra:steel_block", 1)
    implosion_compressor_add(["64x avaritia:neutron_pile", "64x avaritia:neutron_pile"], "avaritia:neutron_nugget", 1)
    implosion_compressor_add("9x avaritia:neutron_nugget", "avaritia:neutron_ingot", 1)
    implosion_compressor_add("9x avaritia:neutron_ingot", "avaritia:neutron", 1)
    implosion_compressor_add(["64x avaritia:compressed_crafting_table", "64x avaritia:compressed_crafting_table"], "avaritia:double_compressed_crafting_table", 1)
    implosion_compressor_add(["4x gtceu:exquisite_diamond_gem", "minecraft:netherite_scrap"], "avaritia:diamond_lattice", 1)
    implosion_compressor_add(["8x avaritia:diamond_lattice", "minecraft:nether_star"], "avaritia:crystal_matrix", 1)
    implosion_compressor_add(["2x minecraft:chest", "2x ae2:smooth_sky_stone_chest"], "avaritia:compressed_chest", 1)

    gtr.electric_implosion_compressor("minecraft:diamond")
        .itemInputs("64x minecraft:coal")
        .itemInputs("64x minecraft:coal")
        .itemOutputs("minecraft:diamond")
        .EUt(GTValues.VA[GTValues.UV])
        .duration(1)

    gtr.electric_implosion_compressor("avaritia:eternal_singularity")
        .notConsumable("16x gtceu:eternity_nanoswarm")
        .itemInputs("gtceu:spacetime_dust")
        .itemOutputs("avaritia:eternal_singularity")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(20)

    gtr.chemical_reactor("gtceu:ethylene_f_ethanol")
        .circuit(1)
        .inputFluids("gtceu:sulfuric_acid 1000", "gtceu:ethanol 1000")
        .outputFluids("gtceu:ethylene 1000", "gtceu:diluted_sulfuric_acid 1000")
        .EUt(120)
        .duration(1200)

    gtr.assembler("gtceu:petrochemical_plant")
        .itemInputs("16x gtceu:watertight_steel_frame", "8x gtceu:large_distillery", "4x gtceu:large_cracker", "gtceu:chemical_plant", "4x #gtceu:circuits/uhv", "4x gtceu:zpm_emitter", "16x gtceu:zpm_fluid_regulator", "16x gtceu:stainless_steel_nonuple_fluid_pipe", "32x gtceu:double_stainless_steel_plate")
        .itemOutputs("gtceu:petrochemical_plant")
        .inputFluids("gtceu:soldering_alloy 1296")
        .EUt(GTValues.VA[GTValues.ZPM])
        .duration(1000)

    const lasers = [["iv", "4x gtceu:platinum_single_cable", 7680],
    ["luv", "4x gtceu:niobium_titanium_single_cable", 30720],
    ["zpm", "4x gtceu:vanadium_gallium_single_cable", 122880],
    ["uv", "4x gtceu:yttrium_barium_cuprate_single_cable", 491520],
    ["uhv", "4x gtceu:europium_single_cable", 1966080],
    ["uev", "4x gtceu:mithril_single_cable", 7864320],
    ["uiv", "4x gtceu:neutronium_single_cable", 34257280],
    ["uxv", "4x gtceu:taranium_single_cable", 125829120],
    ["opv", "4x gtceu:crystalmatrix_single_cable", 503316480]]

    lasers.forEach(laser => {
        for (let index = 0; index < 5; index++) {
            gtr.assembler("gtceu:" + laser[0] + "_" + 16384 * (4 ** index) + "a_laser_target_hatch")
                .itemInputs("gtceu:" + laser[0] + "_machine_hull",
                    8 * (2 ** index) + "x gtceu:diamond_lens",
                    8 * (2 ** index) + "x gtceu:" + laser[0] + "_sensor",
                    8 * (2 ** index) + "x gtceu:" + laser[0] + "_electric_pump",
                    laser[1])
                .itemOutputs("gtceu:" + laser[0] + "_" + 16384 * (4 ** index) + "a_laser_target_hatch")
                .circuit(4 + index)
                .EUt(laser[2])
                .duration(2400 * (2 ** index))

            gtr.assembler("gtceu:" + laser[0] + "_" + 16384 * (4 ** index) + "a_laser_source_hatch")
                .itemInputs("gtceu:" + laser[0] + "_machine_hull",
                    8 * (2 ** index) + "x gtceu:diamond_lens",
                    8 * (2 ** index) + "x gtceu:" + laser[0] + "_emitter",
                    8 * (2 ** index) + "x gtceu:" + laser[0] + "_electric_pump",
                    laser[1])
                .itemOutputs("gtceu:" + laser[0] + "_" + 16384 * (4 ** index) + "a_laser_source_hatch")
                .circuit(4 + index)
                .EUt(laser[2])
                .duration(2400 * (2 ** index))
        }
    })
    for (let index = 0; index < 8; index++) {
        gtr.assembler("gtceu:max_" + 256 * (4 ** index) + "a_laser_target_hatch")
            .itemInputs("gtceu:max_machine_hull",
                (2 ** index) + "x gtceu:diamond_lens",
                (2 ** index) + "x gtlcore:max_sensor",
                (2 ** index) + "x gtlcore:max_electric_pump",
                "4x gtceu:cosmicneutronium_single_cable")
            .itemOutputs("gtceu:max_" + 256 * (4 ** index) + "a_laser_target_hatch")
            .circuit(1 + index)
            .EUt(GTValues.VA[GTValues.MAX])
            .duration(300 * (2 ** index))

        gtr.assembler("gtceu:max_" + 256 * (4 ** index) + "a_laser_source_hatch")
            .itemInputs("gtceu:max_machine_hull",
                (2 ** index) + "x gtceu:diamond_lens",
                (2 ** index) + "x gtlcore:max_emitter",
                (2 ** index) + "x gtlcore:max_electric_pump",
                "4x gtceu:cosmicneutronium_single_cable")
            .itemOutputs("gtceu:max_" + 256 * (4 ** index) + "a_laser_source_hatch")
            .circuit(1 + index)
            .EUt(GTValues.VA[GTValues.MAX])
            .duration(300 * (2 ** index))
    }

    gtr.dyson_sphere("gtceu:dysonsphere")
        .inputFluids("kubejs:gelid_cryotheum 1")
        .circuit(1)
        .EUt(-GTValues.V[GTValues.MAX])
        .duration(20)
        .CWUt(1)

    gtr.dyson_sphere("gtceu:dysonspherelaunch")
        .itemInputs("64x kubejs:dyson_swarm_module")
        .EUt(GTValues.V[GTValues.UIV])
        .duration(200)
        .CWUt(512)

    gtr.petrochemical_plant("gtceu:petrochemical_plant_1")
        .inputFluids("gtceu:oil 1000", "gtceu:steam 1000")
        .outputFluids("gtceu:toluene 60",
            "gtceu:benzene 180",
            "gtceu:octane 60",
            "gtceu:butane 80",
            "gtceu:butene 100",
            "gtceu:butadiene 90",
            "gtceu:propane 80",
            "gtceu:propene 400",
            "gtceu:ethane 80",
            "gtceu:ethylene 400",
            "gtceu:methane 400",
            "gtceu:helium 20")
        .EUt(1920)
        .duration(200)

    gtr.petrochemical_plant("gtceu:petrochemical_plant_2")
        .inputFluids("gtceu:oil_medium 1000", "gtceu:steam 1000")
        .outputFluids("gtceu:toluene 40",
            "gtceu:benzene 200",
            "gtceu:octane 30",
            "gtceu:butane 70",
            "gtceu:butene 100",
            "gtceu:butadiene 100",
            "gtceu:propane 30",
            "gtceu:propene 600",
            "gtceu:ethane 130",
            "gtceu:ethylene 1000",
            "gtceu:methane 1000",
            "gtceu:helium 10")
        .EUt(1920)
        .duration(200)

    gtr.petrochemical_plant("gtceu:petrochemical_plant_3")
        .inputFluids("gtceu:oil_heavy 1000", "gtceu:steam 1000")
        .outputFluids("gtceu:toluene 240",
            "gtceu:benzene 1200",
            "gtceu:octane 20",
            "gtceu:butane 60",
            "gtceu:butene 240",
            "gtceu:butadiene 150",
            "gtceu:propane 30",
            "gtceu:propene 300",
            "gtceu:ethane 45",
            "gtceu:ethylene 450",
            "gtceu:methane 450",
            "gtceu:helium 10")
        .EUt(1920)
        .duration(200)

    gtr.petrochemical_plant("gtceu:petrochemical_plant_4")
        .inputFluids("gtceu:oil_light 1000", "gtceu:steam 1000")
        .outputFluids("gtceu:toluene 20",
            "gtceu:benzene 100",
            "gtceu:octane 20",
            "gtceu:butane 120",
            "gtceu:butene 80",
            "gtceu:butadiene 80",
            "gtceu:propane 140",
            "gtceu:propene 90",
            "gtceu:ethane 200",
            "gtceu:ethylene 250",
            "gtceu:methane 2000",
            "gtceu:helium 40")
        .EUt(1920)
        .duration(200)

    gtr.chemical_bath("gtceu:naquadria_sulfate_dust")
        .itemInputs("6x gtceu:sodium_dust")
        .inputFluids("gtceu:acidic_naquadria_caesiumfluoride 3000")
        .itemOutputs("6x gtceu:naquadria_sulfate_dust", "2x gtceu:trinium_sulfide_dust", "8x gtceu:sodium_fluoride_dust", "7x gtceu:sodium_sulfate_dust")
        .chancedOutput("gtceu:caesium_dust", 8000, 500)
        .EUt(120)
        .duration(200)

    gtr.compressor("gtceu:dimensionally_transcendent_steam_oven")
        .itemInputs("16x gtceu:steam_oven")
        .itemOutputs("gtceu:dimensionally_transcendent_steam_oven")
        .EUt(16)
        .duration(1200)

    gtr.assembler("gtceu:slaughterhouse")
        .itemInputs("gtceu:steel_frame", "gtceu:lv_world_accelerator", "4x #gtceu:circuits/lv", "8x gtceu:lv_electric_motor", "4x gtceu:lv_robot_arm", "8x gtceu:invar_gear", "2x gtceu:diamond_grinding_head", "4x gtceu:double_steel_plate")
        .itemOutputs("gtceu:slaughterhouse")
        .EUt(30)
        .duration(400)

    gtr.assembly_line("gtceu:holy_separator")
        .itemInputs("4x gtceu:uhv_macerator",
            "4x gtceu:uhv_cutter",
            "4x gtceu:uhv_lathe",
            "4x gtceu:uhv_centrifuge",
            "16x gtceu:uev_robot_arm",
            "8x #gtceu:circuits/uiv",
            "8x gtceu:neutronium_gear",
            "64x gtceu:small_rhodium_plated_palladium_gear",
            "32x gtceu:long_orichalcum_rod",
            "16x gtceu:osmiridium_huge_restrictive_item_pipe",
            "16x gtceu:naquadria_plate")
        .inputFluids("gtceu:mutated_living_solder 1440", "gtceu:dysprosium 2880", "gtceu:rhodium 2880", "gtceu:moscovium 2880")
        .itemOutputs("gtceu:holy_separator")
        .duration(1000)
        .EUt(GTValues.VA[GTValues.UEV])
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:large_cutter"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UEV])
            .CWUt(256))

    gtr.large_chemical_reactor("gtceu:mutated_living_solder")
        .notConsumable("gtceu:gravi_star")
        .itemInputs("16x kubejs:biological_cells", "gtceu:quantum_star")
        .inputFluids("gtceu:helium_plasma 2000", "gtceu:oxygen_plasma 2000", "gtceu:tin 2000", "gtceu:carbon 2000", "gtceu:beryllium 2000")
        .outputFluids("gtceu:mutated_living_solder 2000")
        .itemOutputs("4x gtceu:tiny_nether_star_dust")
        .EUt(GTValues.VA[GTValues.UV])
        .duration(1200)

    gtr.autoclave("gtceu:super_mutated_living_solder")
        .inputFluids("gtceu:mutated_living_solder 10000")
        .itemInputs("64x kubejs:space_essence", "64x kubejs:draconium_dust")
        .outputFluids("gtceu:super_mutated_living_solder 10000")
        .itemOutputs("kubejs:essence_block")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(2400)

    gtr.evaporation("gtceu:salt_water")
        .inputFluids("minecraft:water 50000")
        .outputFluids("gtceu:salt_water 1000")
        .EUt(30)
        .duration(600)

    gtr.centrifuge("gtceu:grade_1_purified_water")
        .inputFluids("minecraft:water 1000")
        .chancedOutput("gtceu:small_stone_dust", 5000, 0)
        .chancedOutput("gtceu:small_clay_dust", 2000, 0)
        .chancedOutput("gtceu:small_calcite_dust", 1000, 0)
        .chancedOutput("gtceu:small_salt_dust", 1000, 0)
        .chancedOutput("gtceu:polyethylene_nugget", 100, 0)
        .outputFluids("gtceu:grade_1_purified_water 900")
        .EUt(1920)
        .duration(200)

    gtr.fluid_heater("gtceu:grade_2_purified_water")
        .inputFluids("gtceu:grade_1_purified_water 1000")
        .outputFluids("gtceu:grade_2_purified_water 900")
        .EUt(7680)
        .duration(200)

    gtr.distillation_tower("gtceu:grade_3_purified_water")
        .inputFluids("gtceu:grade_2_purified_water 1000")
        .outputFluids("gtceu:grade_3_purified_water 900")
        .outputFluids("gtceu:grade_2_purified_water 50")
        .outputFluids("gtceu:grade_1_purified_water 50")
        .outputFluids("gtceu:oil 10")
        .outputFluids("gtceu:ammonia 10")
        .EUt(1920)
        .duration(200)
        .disableDistilleryRecipes(true)

    gtr.chemical_bath("gtceu:grade_4_purified_water")
        .itemInputs("64x gtceu:activated_carbon_dust")
        .inputFluids("gtceu:grade_3_purified_water 1000")
        .itemOutputs("64x gtceu:carbon_dust")
        .outputFluids("gtceu:grade_4_purified_water 950")
        .EUt(480)
        .duration(600)

    gtr.chemical_reactor("gtceu:grade_5_purified_water")
        .inputFluids("gtceu:grade_4_purified_water 1000")
        .notConsumable("gtceu:exquisite_cubic_zirconia_gem")
        .outputFluids("gtceu:grade_5_purified_water 990")
        .outputFluids("gtceu:steam 1000")
        .EUt(122880)
        .duration(200)

    gtr.electric_blast_furnace("gtceu:grade_6_purified_water")
        .notConsumable("gtceu:luv_fluid_regulator")
        .inputFluids("gtceu:grade_5_purified_water 1000")
        .outputFluids("gtceu:grade_6_purified_water 900")
        .chancedOutput("gtceu:tiny_ammonium_chloride_dust", 500, 0)
        .EUt(122880)
        .duration(80)
        .blastFurnaceTemp(6740)

    gtr.evaporation("gtceu:grade_7_purified_water")
        .inputFluids("gtceu:grade_6_purified_water 1000000")
        .outputFluids("gtceu:grade_7_purified_water 900000")
        .outputFluids("gtceu:grade_6_purified_water 50000")
        .outputFluids("gtceu:grade_5_purified_water 20000")
        .outputFluids("gtceu:acetic_acid 20")
        .outputFluids("gtceu:ethanol 40")
        .EUt(524288)
        .duration(4000)

    gtr.brewery("gtceu:grade_8_purified_water")
        .inputFluids("gtceu:grade_7_purified_water 1000")
        .notConsumable("gtceu:neutronium_dust")
        .outputFluids("gtceu:grade_8_purified_water 1000")
        .EUt(122880)
        .duration(200)

    gtr.mixer("gtceu:grade_9_purified_water")
        .inputFluids("gtceu:grade_8_purified_water 1000", "gtceu:liquid_oxygen 1000")
        .itemInputs("minecraft:blaze_powder")
        .outputFluids("gtceu:grade_9_purified_water 900")
        .itemOutputs("gtceu:dark_ash_dust")
        .EUt(524288)
        .duration(600)

    gtr.distillery("gtceu:grade_10_purified_water")
        .inputFluids("gtceu:grade_9_purified_water 1000")
        .itemInputs("minecraft:echo_shard")
        .outputFluids("gtceu:grade_10_purified_water 900")
        .itemOutputs("9x gtceu:tiny_echo_shard_dust")
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(200)

    gtr.large_chemical_reactor("gtceu:grade_11_purified_water")
        .notConsumable("kubejs:fullerene_polymer_matrix_soft_tubing")
        .notConsumable("kubejs:electron_source")
        .itemInputs("64x gtceu:carbon_nanotubes_dust")
        .inputFluids("gtceu:grade_10_purified_water 1000")
        .itemOutputs("576x gtceu:carbon_nanotubes_nugget")
        .outputFluids("gtceu:grade_11_purified_water 900")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(200)

    gtr.evaporation("gtceu:grade_12_purified_water")
        .inputFluids("gtceu:grade_11_purified_water 10000000")
        .itemOutputs("gtceu:tiny_neutronium_dust")
        .outputFluids("gtceu:grade_12_purified_water 9999000")
        .outputFluids("gtceu:helium_3 100")
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(2000)

    gtr.arc_furnace("gtceu:grade_13_purified_water")
        .inputFluids("gtceu:grade_12_purified_water 10000")
        .itemInputs("gtceu:degenerate_rhenium_dust")
        .itemOutputs("gtceu:degenerate_rhenium_plate")
        .outputFluids("gtceu:grade_13_purified_water 9990")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(60)

    gtr.plasma_condenser("gtceu:grade_14_purified_water")
        .notConsumable("gtceu:uhv_fluid_regulator")
        .inputFluids("gtceu:grade_13_purified_water 10000", "gtceu:mithril_plasma 1000")
        .itemOutputs("60x gtceu:tiny_mithril_dust")
        .outputFluids("gtceu:grade_14_purified_water 9900")
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(800)

    gtr.plasma_condenser("gtceu:grade_15_purified_water")
        .notConsumable("gtceu:uev_fluid_regulator")
        .inputFluids("gtceu:grade_14_purified_water 10000", "gtceu:enderium_plasma 1000")
        .itemOutputs("61x gtceu:tiny_enderium_dust")
        .outputFluids("gtceu:grade_15_purified_water 9990")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(800)

    gtr.plasma_condenser("gtceu:grade_16_purified_water")
        .notConsumable("gtceu:uiv_fluid_regulator")
        .inputFluids("gtceu:grade_15_purified_water 10000", "gtceu:echoite_plasma 1000")
        .itemOutputs("62x gtceu:tiny_echoite_dust")
        .outputFluids("gtceu:grade_16_purified_water 9999")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(800)

    gtr.precision_assembler("gtlcore:power_core")
        .itemInputs("4x gtlcore:power_module", "8x gtceu:uv_field_generator", "64x gtceu:gravitation_engine_unit", "16x gtceu:double_naquadria_plate")
        .inputFluids("gtceu:rhodium 2880", "gtceu:americium 2880", "gtceu:enriched_naquadah 2880", "gtceu:trinium 2880")
        .itemOutputs("gtlcore:power_core")
        .EUt(GTValues.VA[GTValues.UV])
        .duration(2400)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.precision_assembler("kubejs:dyson_swarm_module")
        .itemInputs("16x gtceu:enriched_naquadah_frame", "64x gtceu:solar_panel", "gtceu:uev_sensor", "gtceu:uev_emitter")
        .inputFluids("gtceu:mutated_living_solder 20000", "kubejs:gelid_cryotheum 20000", "gtceu:neutronium 18432", "gtceu:orichalcum 18432")
        .itemOutputs("64x kubejs:dyson_swarm_module")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(800)
        .cleanroom(GTLCleanroomType.LAW_CLEANROOM)

    gtr.precision_assembler("kubejs:dyson_control_casing")
        .itemInputs("gtceu:uiv_machine_hull", "kubejs:exotic_processing_core", "#gtceu:circuits/uiv", "gtceu:high_performance_computation_array")
        .inputFluids("gtceu:mutated_living_solder 576", "gtceu:pcb_coolant 2000", "gtceu:ruthenium 2304", "gtceu:naquadah 1296")
        .itemOutputs("kubejs:dyson_control_casing")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(400)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.precision_assembler("kubejs:dyson_receiver_casing")
        .itemInputs("gtceu:uiv_charger_4x", "2x kubejs:pm_chip", "4x kubejs:uiv_voltage_coil", "gtceu:echoite_quadruple_wire")
        .inputFluids("gtceu:mutated_living_solder 1296", "kubejs:gelid_cryotheum 576", "gtceu:echo_shard 2304", "gtceu:infuscolium 1296")
        .itemOutputs("kubejs:dyson_receiver_casing")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(400)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.assembly_line("kubejs:dyson_deployment_core")
        .itemInputs("4x gtceu:uiv_machine_hull",
            "32x gtceu:uiv_conveyor_module",
            "32x gtceu:uiv_robot_arm",
            "32x gtceu:uiv_electric_piston",
            "64x minecraft:dispenser",
            "64x minecraft:dispenser",
            "64x minecraft:dispenser",
            "64x minecraft:dispenser")
        .inputFluids("gtceu:lubricant 48000", "gtceu:mutated_living_solder 12800", "kubejs:gelid_cryotheum 128000", "gtceu:copernicium 256000")
        .itemOutputs("kubejs:dyson_deployment_core")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(1200)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtlcore:power_core"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UIV])
            .CWUt(512))

    gtr.assembly_line("gtceu:dyson_sphere")
        .itemInputs("4x gtceu:uiv_diode",
            "16x kubejs:pm_wafer",
            "16x gtceu:uiv_sensor",
            "4x kubejs:dyson_control_toroid",
            "64x gtceu:superconducting_coil",
            "16x #gtceu:circuits/uxv",
            "32x gtceu:echoite_hex_wire",
            "4x kubejs:uxv_voltage_coil",
            "16x gtceu:double_vibranium_plate")
        .inputFluids("gtceu:mutated_living_solder 12000", "kubejs:gelid_cryotheum 12800", "gtceu:scandium 576000", "gtceu:mercury_barium_calcium_cuprate 576000")
        .itemOutputs("gtceu:dyson_sphere")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(1600)
        .stationResearch(b => b.researchStack(Registries.getItemStack("kubejs:dyson_receiver_casing"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UIV])
            .CWUt(512))

    gtr.assembly_line("kubejs:dyson_deployment_casing")
        .itemInputs("gtceu:uiv_diode",
            "4x gtceu:uiv_sensor",
            "2x gtceu:uiv_electric_pump",
            "gtceu:uhv_quantum_tank",
            "gtceu:uiv_conveyor_module",
            "4x gtceu:double_darmstadtium_plate")
        .inputFluids("gtceu:mutated_living_solder 1000", "kubejs:gelid_cryotheum 1000", "gtceu:lubricant 2000", "gtceu:copernicium 1296")
        .itemOutputs("kubejs:dyson_deployment_casing")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(600)
        .stationResearch(b => b.researchStack(Registries.getItemStack("kubejs:module_connector"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UIV])
            .CWUt(512))

    gtr.assembly_line("kubejs:dyson_control_toroid")
        .itemInputs("gtceu:black_titanium_frame",
            "4x gtceu:uiv_emitter",
            "2x gtceu:uiv_electric_pump",
            "2x #gtceu:circuits/uiv",
            "kubejs:exotic_processing_core",
            "8x gtceu:infuscolium_bolt",
            "24x gtceu:neutronium_foil")
        .inputFluids("gtceu:mutated_living_solder 2000", "kubejs:gelid_cryotheum 1000", "gtceu:zylon 1296", "gtceu:kevlar 1296")
        .itemOutputs("kubejs:dyson_control_toroid")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(800)
        .stationResearch(b => b.researchStack(Registries.getItemStack("kubejs:spacetime_assembly_line_unit"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UIV])
            .CWUt(512))

    gtr.assembly_line("kubejs:restraint_device")
        .itemInputs("2x kubejs:hollow_casing",
            "2x kubejs:force_field_glass",
            "6x kubejs:laser_cooling_unit",
            "8x gtceu:double_titansteel_plate",
            "24x gtceu:double_plutonium_241_plate",
            "16x gtceu:double_quantanium_plate",)
        .inputFluids("gtceu:soldering_alloy 2304", "gtceu:lubricant 2000", "gtceu:mutated_living_solder 1000", "gtceu:highurabilityompoundteel 576")
        .itemOutputs("kubejs:restraint_device")
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(1600)
        .stationResearch(b => b.researchStack(Registries.getItemStack("kubejs:containment_field_generator"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UHV])
            .CWUt(512))

    gtr.assembly_line("gtceu:atomic_energy_excitation_plant")
        .itemInputs("8x gtceu:uev_mixer",
            "8x gtceu:uev_centrifuge",
            "16x gtceu:uev_chemical_reactor",
            "8x #gtceu:circuits/uiv",
            "12x gtceu:double_adamantine_plate",
            "16x gtceu:double_highurabilityompoundteel_plate",
            "16x gtceu:double_enderite_plate",
            "4x kubejs:reinforced_echo_shard")
        .inputFluids("gtceu:lubricant 8000", "gtceu:mutated_living_solder 2000", "gtceu:echoite 1152", "gtceu:mana 32000")
        .itemOutputs("gtceu:atomic_energy_excitation_plant")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(4000)
        .stationResearch(b => b.researchStack(Registries.getItemStack("kubejs:restraint_device"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UIV])
            .CWUt(512))

    gtr.super_particle_collider("gtceu:positive_electron")
        .inputFluids("gtceu:phosphorus 200", "gtceu:lithium 200")
        .outputFluids("gtceu:positive_electron 100")
        .EUt(GTValues.VA[GTValues.UV])
        .duration(200)

    gtr.super_particle_collider("gtceu:antiproton")
        .inputFluids("gtceu:liquid_hydrogen 1000", "gtceu:helium_plasma 200")
        .outputFluids("gtceu:antiproton 100")
        .EUt(GTValues.VA[GTValues.UV])
        .duration(200)

    gtr.super_particle_collider("gtceu:antineutron")
        .inputFluids("gtceu:positive_electron 100", "gtceu:antiproton 100")
        .outputFluids("gtceu:antineutron 2")
        .EUt(GTValues.VA[GTValues.UV])
        .duration(200)

    gtr.super_particle_collider("gtceu:antimatter")
        .inputFluids("gtceu:antihydrogen 2000", "gtceu:antineutron 2000")
        .outputFluids("gtceu:antimatter 100")
        .EUt(GTValues.VA[GTValues.UV])
        .duration(200)

    gtr.mixer("gtceu:antihydrogen")
        .inputFluids("gtceu:positive_electron 200", "gtceu:antiproton 200")
        .notConsumable("gtceu:uv_field_generator")
        .outputFluids("gtceu:antihydrogen 200")
        .EUt(GTValues.VA[GTValues.UV])
        .duration(400)

    gtr.fluid_solidifier("kubejs:pellet_antimatter")
        .inputFluids("gtceu:antimatter 1000")
        .notConsumable("kubejs:ball_field_shape")
        .itemOutputs("kubejs:pellet_antimatter")
        .EUt(GTValues.VA[GTValues.UV])
        .duration(800)

    gtr.ultimate_material_forge("kubejs:pellet_antimatter")
        .inputFluids("gtceu:uu_matter 1000", "gtceu:antihydrogen 10")
        .itemInputs("64x ae2:matter_ball", "gtceu:neutronium_nugget")
        .itemOutputs("kubejs:pellet_antimatter")
        .chancedOutput("kubejs:void_matter", 100, 0)
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(2000)

    gtr.ultimate_material_forge("kubejs:corporeal_matter")
        .itemInputs("kubejs:proto_matter", "minecraft:iron_block")
        .inputFluids("gtceu:uu_matter 1000", "gtceu:nihonium 100")
        .itemOutputs("kubejs:corporeal_matter")
        .chancedOutput("gtceu:heavy_quark_degenerate_matter_nugget", 500, 0)
        .EUt(GTValues.VA[GTValues.OpV])
        .duration(800)

    gtr.ultimate_material_forge("kubejs:kinetic_matter")
        .itemInputs("kubejs:corporeal_matter", "gtceu:tritanium_block")
        .inputFluids("gtceu:uu_matter 1000", "gtceu:naquadria 1000")
        .itemOutputs("kubejs:kinetic_matter")
        .chancedOutput("kubejs:amorphous_matter", 200, 0)
        .EUt(GTValues.VA[GTValues.OpV])
        .duration(600)

    gtr.ultimate_material_forge("kubejs:amorphous_matter")
        .itemInputs("kubejs:corporeal_matter", "gtceu:carbon_nanotubes_block")
        .inputFluids("gtceu:uu_matter 1000", "gtceu:legendarium 1000")
        .itemOutputs("kubejs:amorphous_matter")
        .chancedOutput("kubejs:essentia_matter", 100, 0)
        .EUt(GTValues.VA[GTValues.OpV])
        .duration(800)

    gtr.ultimate_material_forge("kubejs:essentia_matter")
        .itemInputs("kubejs:amorphous_matter", "gtceu:heavy_quark_degenerate_matter_block")
        .inputFluids("gtceu:uu_matter 1000", "gtceu:quantumchromodynamically_confined_matter 1000")
        .itemOutputs("kubejs:essentia_matter")
        .chancedOutput("kubejs:dark_matter", 100, 0)
        .EUt(GTValues.VA[GTValues.OpV])
        .duration(1200)

    gtr.ultimate_material_forge("kubejs:omni_matter")
        .itemInputs("kubejs:essentia_matter", "kubejs:kinetic_matter")
        .inputFluids("gtceu:uu_matter 1000", "gtceu:dense_neutron_plasma 1000")
        .itemOutputs("kubejs:omni_matter")
        .chancedOutput("gtceu:tiny_cosmicneutronium_dust", 1000, 0)
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(800)

    gtr.ultimate_material_forge("kubejs:void_matter")
        .itemInputs("kubejs:omni_matter", "kubejs:pellet_antimatter")
        .inputFluids("gtceu:uu_matter 2000", "gtceu:gluons 1000")
        .itemOutputs("kubejs:void_matter")
        .chancedOutput("kubejs:corporeal_matter", 2000, 0)
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(400)

    gtr.ultimate_material_forge("kubejs:temporal_matter")
        .notConsumable("kubejs:quantum_anomaly")
        .itemInputs("kubejs:kinetic_matter")
        .inputFluids("gtceu:uu_matter 1000", "gtceu:draconiumawakened_plasma 1000")
        .itemOutputs("kubejs:temporal_matter")
        .chancedOutput("kubejs:omni_matter", 500, 0)
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(600)

    gtr.ultimate_material_forge("kubejs:dark_matter")
        .itemInputs("kubejs:temporal_matter", "kubejs:void_matter")
        .inputFluids("gtceu:uu_matter 3000", "gtceu:dimensionallytranscendentcrudecatalyst 1000")
        .itemOutputs("kubejs:dark_matter")
        .chancedOutput("kubejs:kinetic_matter", 1000, 0)
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(1200)

    gtr.assembler("kubejs:dyson_deployment_magnet")
        .itemInputs("gtceu:uiv_energy_output_hatch", "4x gtceu:superconducting_coil", "8x kubejs:pm_chip", "4x #gtceu:circuits/uiv", "6x gtceu:neutronium_plate")
        .itemOutputs("kubejs:dyson_deployment_magnet")
        .inputFluids("gtceu:mutated_living_solder 1296")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(600)

    gtr.assembler("gtlcore:sps_casing")
        .itemInputs("gtceu:zylon_block", "kubejs:restraint_device", "4x #gtceu:circuits/uev", "4x gtceu:small_quantanium_gear", "gtceu:neutronium_hex_cable", "32x gtceu:polyetheretherketone_foil")
        .inputFluids("gtceu:mutated_living_solder 576")
        .itemOutputs("gtlcore:sps_casing")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(800)

    gtr.aggregation_device("kubejs:draconic_core")
        .notConsumable("kubejs:stabilizer_core")
        .itemInputs("kubejs:draconium_dust", "gtceu:zpm_field_generator", "gtceu:lapotronic_energy_orb", "gtceu:mithril_block", "gtceu:hexanitrohexaaxaisowurtzitane_dust", "gtceu:uv_field_generator", "minecraft:nether_star", "gtceu:enderium_block")
        .itemOutputs("2x kubejs:draconic_core")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(400)
        .fusionStartEU(4800000000)

    gtr.aggregation_device("kubejs:wyvern_core")
        .notConsumable("kubejs:stabilizer_core")
        .itemInputs("kubejs:draconium_dust", "gtceu:uhv_field_generator", "gtceu:quantum_eye", "gtceu:adamantine_block", "kubejs:draconic_core", "gtceu:uev_field_generator", "gtceu:quantum_star", "gtceu:orichalcum_block")
        .itemOutputs("2x kubejs:wyvern_core")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(400)
        .fusionStartEU(4800000000)

    gtr.aggregation_device("kubejs:awakened_core")
        .notConsumable("kubejs:dragon_stabilizer_core")
        .itemInputs("gtceu:draconium_dust", "gtceu:uiv_field_generator", "kubejs:dragon_heart", "gtceu:vibranium_block", "kubejs:wyvern_core", "gtceu:uxv_field_generator", "gtceu:gravi_star", "gtceu:taranium_block")
        .itemOutputs("2x kubejs:awakened_core")
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(400)
        .fusionStartEU(4800000000)

    gtr.aggregation_device("kubejs:chaotic_core")
        .notConsumable("kubejs:dragon_stabilizer_core")
        .itemInputs("gtceu:draconium_nanoswarm", "gtceu:opv_field_generator", "kubejs:chaos_shard", "gtceu:legendarium_block", "kubejs:awakened_core", "gtlcore:max_field_generator", "kubejs:unstable_star", "gtceu:draconiumawakened_block")
        .itemOutputs("2x kubejs:chaotic_core")
        .EUt(GTValues.VA[GTValues.OpV])
        .duration(400)
        .fusionStartEU(4800000000)

    gtr.distillery("gtceu:kerosene")
        .itemInputs("gtceu:coke_dust")
        .inputFluids("gtceu:coal_tar 200")
        .outputFluids("gtceu:kerosene 100")
        .itemOutputs("gtceu:dark_ash_dust")
        .EUt(120)
        .duration(30)

    gtr.distillery("gtceu:rp_1")
        .circuit(1)
        .inputFluids("gtceu:kerosene 50")
        .outputFluids("gtceu:rp_1 25")
        .EUt(120)
        .duration(16)

    gtr.mixer("gtceu:rocket_fuel_rp_1")
        .inputFluids("gtceu:rp_1 1000", "gtceu:liquid_oxygen 1000")
        .outputFluids("gtceu:rocket_fuel_rp_1 1000")
        .EUt(1920)
        .duration(16)

    gtr.large_chemical_reactor("gtceu:hydrazine")
        .inputFluids("gtceu:hydrogen_peroxide 1000", "gtceu:ammonia 2000")
        .outputFluids("gtceu:hydrazine 1000", "minecraft:water 1000")
        .EUt(30)
        .duration(320)

    gtr.mixer("gtceu:dense_hydrazine_fuel_mixture")
        .inputFluids("gtceu:hydrazine 1000", "gtceu:methanol 1000")
        .outputFluids("gtceu:dense_hydrazine_fuel_mixture 1000")
        .EUt(240)
        .duration(320)

    gtr.mixer("gtceu:rocket_fuel_h8n4c2o4")
        .inputFluids("gtceu:dimethylhydrazine 1000", "gtceu:dinitrogen_tetroxide 1000")
        .outputFluids("gtceu:rocket_fuel_h8n4c2o4 1000")
        .EUt(1920)
        .duration(480)

    gtr.mixer("gtceu:rocket_fuel_cn3h7o3")
        .inputFluids("gtceu:monomethylhydrazine 1000", "gtceu:nitric_acid 1000")
        .outputFluids("gtceu:rocket_fuel_cn3h7o3 1000")
        .EUt(1920)
        .duration(200)

    gtr.dehydrator("gtceu:monomethylhydrazine")
        .inputFluids("gtceu:hydrazine 1000", "gtceu:hydrogen 2000")
        .itemInputs("gtceu:carbon_dust")
        .outputFluids("gtceu:monomethylhydrazine 1000")
        .EUt(240)
        .duration(240)

    gtr.mixer("ad_astra:cryo_fuel")
        .itemInputs("16x ad_astra:ice_shard")
        .inputFluids("gtceu:cetane_boosted_diesel 1000", "gtceu:explosivehydrazine 1000")
        .outputFluids("ad_astra:cryo_fuel 1000")
        .EUt(7680)
        .duration(320)

    gtr.mixer("gtceu:explosivehydrazine")
        .inputFluids("gtceu:glyceryl_trinitrate 1000", "gtceu:dense_hydrazine_fuel_mixture 3000")
        .notConsumable("gtceu:luv_field_generator")
        .itemInputs("16x gtceu:gelled_toluene", "8x minecraft:fire_charge")
        .outputFluids("gtceu:explosivehydrazine 4000")
        .EUt(1920)
        .duration(480)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.large_chemical_reactor("gtceu:stellar_energy_rocket_fuel")
        .itemInputs("gtceu:enriched_naquadah_dust")
        .inputFluids("gtceu:rocket_fuel_cn3h7o3 2000", "gtceu:explosivehydrazine 3000", "gtceu:nitrobenzene 8000", "gtceu:dinitrogen_tetroxide 6000", "gtceu:kerosene 4000")
        .itemInputs("2x gtceu:hmxexplosive_dust")
        .itemOutputs("gtceu:naquadah_dust")
        .outputFluids("gtceu:stellar_energy_rocket_fuel 5000")
        .EUt(122880)
        .duration(120)
        .cleanroom(CleanroomType.STERILE_CLEANROOM)

    gtr.chemical_reactor("gtceu:hmxexplosive_dust")
        .notConsumableFluid("gtceu:acetic_anhydride 1000")
        .inputFluids("gtceu:fuming_nitric_acid 2000")
        .itemInputs("22x gtceu:hexamethylenetetramine_dust")
        .itemOutputs("gtceu:hmxexplosive_dust")
        .EUt(1024)
        .duration(20)

    gtr.chemical_reactor("gtceu:fuming_nitric_acid")
        .inputFluids("gtceu:nitrogen_dioxide 1000", "gtceu:nitric_acid 1000")
        .outputFluids("gtceu:fuming_nitric_acid 1000")
        .EUt(120)
        .duration(200)

    gtr.lightning_processor("gtceu:nether_air")
        .itemInputs("64x minecraft:gunpowder")
        .inputFluids("gtceu:blaze 1000", "gtceu:hydrogen_sulfide 10000", "gtceu:sulfur_dioxide 10000", "gtceu:carbon_monoxide 10000", "gtceu:coal_gas 1000", "gtceu:helium 1000")
        .outputFluids("gtceu:nether_air 1000")
        .EUt(120)
        .duration(400)

    gtr.lightning_processor("gtceu:ender_air")
        .itemInputs("64x gtceu:ender_pearl_dust")
        .inputFluids("gtceu:fuming_nitric_acid 1000", "gtceu:nitrogen_dioxide 10000", "gtceu:helium 10000", "gtceu:radon 1000", "gtceu:deuterium 1000", "gtceu:xenon 1000")
        .outputFluids("gtceu:ender_air 1000")
        .EUt(480)
        .duration(800)

    gtr.chemical_bath("gtceu:damascus_steel_dust")
        .itemInputs("gtceu:steel_dust")
        .inputFluids("gtceu:lubricant 100")
        .itemOutputs("gtceu:damascus_steel_dust")
        .EUt(120)
        .duration(200)
        .dimension("kubejs:ancient_world")

    gtr.chemical_reactor("gtceu:ammonium_chloride_dust")
        .inputFluids("gtceu:hydrochloric_acid 1000", "gtceu:ammonia 1000")
        .itemOutputs("6x gtceu:ammonium_chloride_dust")
        .EUt(30)
        .duration(120)

    gtr.electric_blast_furnace("gtceu:iridium_dioxide_dust")
        .itemInputs("6x gtceu:iridium_metal_residue_dust", "5x gtceu:sodium_chlorate_dust")
        .inputFluids("gtceu:hydrogen 6000")
        .itemOutputs("3x gtceu:iridium_dioxide_dust", "2x gtceu:salt_dust")
        .chancedOutput("gtceu:platinum_sludge_residue_dust", 8000, 0)
        .outputFluids("gtceu:diluted_hydrochloric_acid 6000")
        .EUt(120)
        .duration(200)
        .blastFurnaceTemp(790)

    gtr.mixer("gtceu:potassium_pyrosulfate_dust")
        .itemInputs("2x gtceu:potassium_dust", "2x gtceu:sulfur_dust")
        .inputFluids("gtceu:oxygen 7000")
        .itemOutputs("11x gtceu:potassium_pyrosulfate_dust")
        .EUt(120)
        .duration(120)

    gtr.centrifuge("gtceu:rare_earth_chlorides")
        .notConsumable("gtceu:hv_item_magnet")
        .inputFluids("gtceu:rare_earth_chlorides 2000")
        .outputFluids("gtceu:la_nd_oxides_solution 250",
            "gtceu:sm_gd_oxides_solution 250",
            "gtceu:tb_ho_oxides_solution 250",
            "gtceu:er_lu_oxides_solution 250",
            "gtceu:hydrochloric_acid 1000")
        .EUt(480)
        .duration(200)

    gtr.dehydrator("gtceu:la_nd_oxides_solution")
        .inputFluids("gtceu:la_nd_oxides_solution 4000")
        .chancedOutput("5x gtceu:lanthanum_oxide_dust", 4300, 275)
        .chancedOutput("5x gtceu:cerium_oxide_dust", 4300, 275)
        .chancedOutput("5x gtceu:praseodymium_oxide_dust", 4300, 275)
        .chancedOutput("5x gtceu:neodymium_oxide_dust", 4300, 275)
        .EUt(480)
        .duration(220)

    gtr.dehydrator("gtceu:sm_gd_oxides_solution")
        .inputFluids("gtceu:sm_gd_oxides_solution 4000")
        .chancedOutput("5x gtceu:scandium_oxide_dust", 4300, 275)
        .chancedOutput("5x gtceu:samarium_oxide_dust", 4300, 275)
        .chancedOutput("5x gtceu:europium_oxide_dust", 4300, 275)
        .chancedOutput("5x gtceu:gadolinium_oxide_dust", 4300, 275)
        .EUt(480)
        .duration(220)

    gtr.dehydrator("gtceu:tb_ho_oxides_solution")
        .inputFluids("gtceu:tb_ho_oxides_solution 4000")
        .chancedOutput("5x gtceu:yttrium_oxide_dust", 4300, 275)
        .chancedOutput("5x gtceu:terbium_oxide_dust", 4300, 275)
        .chancedOutput("5x gtceu:dysprosium_oxide_dust", 4300, 275)
        .chancedOutput("5x gtceu:holmium_oxide_dust", 4300, 275)
        .EUt(480)
        .duration(220)

    gtr.dehydrator("gtceu:er_lu_oxides_solution")
        .inputFluids("gtceu:er_lu_oxides_solution 4000")
        .chancedOutput("5x gtceu:erbium_oxide_dust", 4300, 275)
        .chancedOutput("5x gtceu:thulium_oxide_dust", 4300, 275)
        .chancedOutput("5x gtceu:ytterbium_oxide_dust", 4300, 275)
        .chancedOutput("5x gtceu:lutetium_oxide_dust", 4300, 275)
        .EUt(480)
        .duration(220)

    const rare_earth_oxides = ["lanthanum",
        "praseodymium",
        "neodymium",
        "cerium",
        "scandium",
        "europium",
        "gadolinium",
        "samarium",
        "terbium",
        "dysprosium",
        "holmium",
        "erbium",
        "thulium",
        "ytterbium",
        "lutetium",
        "yttrium"]

    rare_earth_oxides.forEach((element) => {
        gtr.electric_blast_furnace("gtceu:" + element + "_dust")
            .itemInputs("10x gtceu:" + element + "_oxide_dust", "3x gtceu:carbon_dust")
            .itemOutputs("4x gtceu:" + element + "_dust")
            .outputFluids("gtceu:carbon_dioxide 3000")
            .EUt(480)
            .duration(200)
            .blastFurnaceTemp(2500)
    })

    gtr.chemical_reactor("gtceu:zirconium_hafnium_chloride")
        .itemInputs("6x gtceu:zircon_dust")
        .inputFluids("gtceu:chlorine 8000")
        .outputFluids("gtceu:zirconium_hafnium_chloride 1000", "gtceu:zircon_chlorinating_residue 1000")
        .EUt(120)
        .duration(120)

    gtr.chemical_reactor("gtceu:zirconiu_hafnium_oxychloride")
        .inputFluids("gtceu:zirconium_hafnium_chloride 1000", "minecraft:water 1000")
        .outputFluids("gtceu:zirconiu_hafnium_oxychloride 1000", "gtceu:diluted_hydrochloric_acid 2000")
        .EUt(480)
        .duration(100)

    gtr.large_chemical_reactor("gtceu:zirconium_oxide_dust")
        .itemInputs("36x gtceu:ammonium_chloride_dust", "9x gtceu:potassium_hydroxide_dust", "10x gtceu:hematite_dust")
        .inputFluids("gtceu:zirconiu_hafnium_oxychloride 3000", "gtceu:sulfur_trioxide 3000", "gtceu:hydrogen_peroxide 6000")
        .itemOutputs("21x gtceu:potassium_sulfate_dust", "3x gtceu:zirconium_oxide_dust")
        .chancedOutput("3x gtceu:hafnium_oxide_dust", 8000, 0)
        .outputFluids("gtceu:ammonia 6000", "gtceu:iron_iii_chloride 4000")
        .EUt(1920)
        .duration(100)

    gtr.chemical_reactor("gtceu:hafnium_chloride_dust")
        .itemInputs("3x gtceu:hafnium_oxide_dust", "gtceu:carbon_dust")
        .inputFluids("gtceu:chlorine 4000")
        .itemOutputs("5x gtceu:hafnium_chloride_dust")
        .outputFluids("gtceu:carbon_dioxide 1000")
        .EUt(120)
        .duration(150)

    gtr.electric_blast_furnace("gtceu:hafnium_dust")
        .itemInputs("5x gtceu:hafnium_chloride_dust", "2x gtceu:magnesium_dust")
        .itemOutputs("1x gtceu:hafnium_dust", "6x gtceu:magnesium_chloride_dust")
        .EUt(120)
        .duration(300)
        .blastFurnaceTemp(3400)

    gtr.incubator("gtceu:stem_cells")
        .chancedInput("kubejs:glacio_spirit", 6000, 500)
        .itemInputs("gtceu:osmiridium_dust")
        .inputFluids("gtceu:sterilized_growth_medium 500", "gtceu:bacteria 500")
        .itemOutputs("32x gtceu:stem_cells")
        .outputFluids("gtceu:bacterial_sludge 500")
        .EUt(30720)
        .duration(300)
        .addCondition(new GravityCondition(true))

    gtr.incubator("kubejs:glacio_spirit")
        .chancedInput("4x kubejs:glacio_spirit", 1000, 100)
        .itemInputs("16x gtceu:celestine_dust", "kubejs:essence")
        .inputFluids("ad_astra:cryo_fuel 100", "gtceu:ice 900")
        .itemOutputs("64x kubejs:glacio_spirit")
        .EUt(30720)
        .duration(2000)

    gtr.assembly_line("gtceu:carbon_nanoswarm")
        .itemInputs("16x #gtceu:circuits/uv", "16x gtceu:uv_robot_arm", "32x gtceu:stem_cells", "32x gtceu:naquadah_alloy_ring", "16x gtceu:naquadah_alloy_rod", "64x gtceu:carbon_dust")
        .inputFluids("gtceu:soldering_alloy 4608", "gtceu:polytetrafluoroethylene 4608", "gtceu:glowstone 4608", "gtceu:rubber 4608")
        .itemOutputs("2x gtceu:carbon_nanoswarm")
        .EUt(122880)
        .duration(1200)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:activated_carbon_dust"))
            .dataStack(Registries.getItemStack("gtceu:data_orb"))
            .EUt(GTValues.VA[GTValues.ZPM])
            .CWUt(32))

    gtr.assembly_line("gtceu:nano_forge_1")
        .itemInputs("16x gtceu:uv_machine_hull", "16x gtceu:carbon_nanoswarm", "16x gtceu:zpm_field_generator", "16x gtceu:uv_robot_arm", "16x gtceu:uv_conveyor_module", "32x gtceu:uv_electric_motor", "16x #gtceu:circuits/uv", "16x gtceu:naquadah_octal_wire")
        .inputFluids("gtceu:soldering_alloy 4608", "gtceu:hsss 4608", "gtceu:osmiridium 4608", "gtceu:enriched_naquadah 4608")
        .itemOutputs("gtceu:nano_forge_1")
        .EUt(GTValues.VA[GTValues.UV])
        .duration(2400)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:carbon_nanoswarm"))
            .dataStack(Registries.getItemStack("gtceu:data_orb"))
            .EUt(GTValues.VA[GTValues.UV])
            .CWUt(64))

    gtr.assembly_line("gtceu:nano_forge_2")
        .itemInputs("16x gtceu:uev_machine_hull", "16x gtceu:neutronium_nanoswarm", "16x kubejs:draconic_core", "16x gtceu:uev_robot_arm", "16x gtceu:uev_conveyor_module", "32x gtceu:uev_electric_motor", "16x #gtceu:circuits/uev", "16x gtceu:mithril_octal_wire")
        .inputFluids("gtceu:soldering_alloy 4608", "gtceu:hsss 4608", "gtceu:osmiridium 4608", "gtceu:enriched_naquadah 4608")
        .itemOutputs("gtceu:nano_forge_2")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(2400)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:nano_forge_1"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UEV])
            .CWUt(256))

    gtr.assembly_line("gtceu:nano_forge_3")
        .itemInputs("16x gtceu:uxv_machine_hull", "16x gtceu:draconium_nanoswarm", "16x kubejs:awakened_core", "16x gtceu:uxv_robot_arm", "16x gtceu:uxv_conveyor_module", "32x gtceu:uxv_electric_motor", "16x #gtceu:circuits/uxv", "16x gtceu:taranium_octal_wire", "kubejs:wyvern_energy_core", "16x gtceu:double_celestialtungsten_plate")
        .inputFluids("gtceu:soldering_alloy 4608", "gtceu:hsss 4608", "gtceu:osmiridium 4608", "gtceu:enriched_naquadah 4608")
        .itemOutputs("gtceu:nano_forge_3")
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(2400)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:nano_forge_2"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UXV])
            .CWUt(2048))

    gtr.assembly_line("gtceu:field_extruder_factory")
        .itemInputs("4x gtceu:uhv_extruder", "4x gtceu:uhv_compressor", "8x gtceu:uev_field_generator", "4x gtceu:uev_emitter", "4x #gtceu:circuits/uiv", "4x gtceu:rhenium_nanoswarm", "64x gtceu:stress_proof_casing", "64x gtceu:dalisenite_plate")
        .inputFluids("gtceu:mutated_living_solder 2304", "gtceu:platinum 4608", "gtceu:reinforced_epoxy_resin 4608", "gtceu:uranium_rhodium_dinaquadide 4608")
        .itemOutputs("gtceu:field_extruder_factory")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(800)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:large_extruder"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UEV])
            .CWUt(256))

    gtr.assembly_line("gtceu:mega_presser")
        .itemInputs("4x gtceu:uhv_forming_press", "4x gtceu:uhv_forge_hammer", "4x gtceu:uhv_bender", "32x gtceu:uev_electric_piston", "4x gtceu:uev_robot_arm", "4x #gtceu:circuits/uiv", "64x gtceu:stress_proof_casing", "64x gtceu:dalisenite_plate")
        .inputFluids("gtceu:mutated_living_solder 2304", "gtceu:palladium 4608", "gtceu:reinforced_epoxy_resin 4608", "gtceu:uranium_rhodium_dinaquadide 4608")
        .itemOutputs("gtceu:mega_presser")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(800)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:large_material_press"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UEV])
            .CWUt(256))

    gtr.assembly_line("gtceu:mega_wiremill")
        .itemInputs("16x gtceu:uhv_wiremill", "64x gtceu:uev_electric_motor", "4x gtceu:uev_robot_arm", "4x #gtceu:circuits/uiv", "8x gtceu:abyssalalloy_hex_wire", "32x gtceu:double_germanium_plate", "16x gtceu:double_maraging_steel_300_plate")
        .inputFluids("gtceu:mutated_living_solder 2304", "gtceu:niobium 4608", "gtceu:tantalum_carbide 4608", "gtceu:ruthenium_trinium_americium_neutronate 4608")
        .itemOutputs("gtceu:mega_wiremill")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(800)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:large_wiremill"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UEV])
            .CWUt(256))

    gtr.assembly_line("gtceu:dimensional_focus_engraving_array")
        .itemInputs("8x gtceu:uhv_laser_engraver", "16x gtceu:neutronium_nanoswarm", "64x gtceu:normal_laser_pipe", "8x gtceu:uev_field_generator", "4x gtceu:uev_emitter", "16x #gtceu:circuits/uiv", "16x gtceu:quantanium_rod", "32x gtceu:double_dubnium_plate")
        .inputFluids("gtceu:mutated_living_solder 28800", "gtceu:polyetheretherketone 28800", "gtceu:pikyonium 4608", "gtceu:abyssalalloy 4608")
        .itemOutputs("gtceu:dimensional_focus_engraving_array")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(1600)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:engraving_laser_plant"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UEV])
            .CWUt(256))

    gtr.assembler("gtlcore:naquadah_alloy_casing")
        .itemInputs("gtceu:naquadah_alloy_frame", "6x gtceu:naquadah_alloy_plate")
        .circuit(6)
        .itemOutputs("gtlcore:naquadah_alloy_casing")
        .EUt(16)
        .duration(50)

    gtr.nano_forge("gtceu:carbon_nanoswarm")
        .notConsumable("gtceu:lime_glass_lens")
        .itemInputs("64x gtceu:carbon_block", "64x gtceu:soc")
        .itemOutputs("64x gtceu:carbon_nanoswarm")
        .inputFluids("gtceu:soldering_alloy 20000", "gtceu:lubricant 20000")
        .duration(40000)
        .EUt(GTValues.VA[GTValues.UV])
        .addData("nano_forge_tier", 1)

    gtr.nano_forge("gtceu:glowstone_nanoswarm")
        .notConsumable("gtceu:orange_glass_lens")
        .itemInputs("64x minecraft:glowstone", "64x gtceu:advanced_soc")
        .itemOutputs("64x gtceu:glowstone_nanoswarm")
        .inputFluids("gtceu:uu_amplifier 10000", "gtceu:soldering_alloy 20000", "gtceu:lubricant 20000")
        .duration(160000)
        .EUt(GTValues.VA[GTValues.UV])
        .addData("nano_forge_tier", 1)

    gtr.nano_forge("gtceu:copper_nanoswarm")
        .notConsumable("gtceu:brown_glass_lens")
        .itemInputs("8x minecraft:copper_block", "8x gtceu:soc")
        .itemOutputs("gtceu:copper_nanoswarm")
        .inputFluids("gtceu:naquadah 2000", "gtceu:soldering_alloy 10000", "gtceu:bismuth 10000")
        .duration(20000)
        .EUt(GTValues.VA[GTValues.UV])
        .addData("nano_forge_tier", 1)

    gtr.nano_forge("gtceu:iron_nanoswarm")
        .notConsumable("gtceu:gray_glass_lens")
        .itemInputs("8x minecraft:iron_block", "8x gtceu:soc")
        .itemOutputs("gtceu:iron_nanoswarm")
        .inputFluids("gtceu:naquadah 2000", "gtceu:soldering_alloy 10000", "gtceu:bismuth 10000")
        .duration(20000)
        .EUt(GTValues.VA[GTValues.UV])
        .addData("nano_forge_tier", 1)

    gtr.nano_forge("gtceu:gold_nanoswarm")
        .notConsumable("gtceu:yellow_glass_lens")
        .itemInputs("8x minecraft:gold_block", "16x gtceu:soc")
        .itemOutputs("gtceu:gold_nanoswarm")
        .inputFluids("gtceu:enriched_naquadah 2000", "gtceu:soldering_alloy 20000", "gtceu:bismuth 20000")
        .duration(20000)
        .EUt(GTValues.VA[GTValues.UV])
        .addData("nano_forge_tier", 1)

    gtr.nano_forge("gtceu:silver_nanoswarm")
        .notConsumable("gtceu:light_gray_glass_lens")
        .itemInputs("8x gtceu:silver_block", "16x gtceu:soc")
        .itemOutputs("gtceu:silver_nanoswarm")
        .inputFluids("gtceu:enriched_naquadah 2000", "gtceu:soldering_alloy 20000", "gtceu:bismuth 20000")
        .duration(20000)
        .EUt(GTValues.VA[GTValues.UV])
        .addData("nano_forge_tier", 1)

    gtr.nano_forge("gtceu:iridium_nanoswarm")
        .notConsumable("gtceu:glass_lens")
        .itemInputs("8x gtceu:iridium_block", "32x gtceu:soc")
        .itemOutputs("gtceu:iridium_nanoswarm")
        .inputFluids("gtceu:naquadria 2000", "gtceu:hafnium 8000", "gtceu:soldering_alloy 20000")
        .duration(40000)
        .EUt(GTValues.VA[GTValues.UV])
        .addData("nano_forge_tier", 1)

    gtr.nano_forge("gtceu:osmium_nanoswarm")
        .notConsumable("gtceu:diamond_lens")
        .itemInputs("8x gtceu:osmium_block", "32x gtceu:soc")
        .itemOutputs("gtceu:osmium_nanoswarm")
        .inputFluids("gtceu:naquadria 2000", "gtceu:hafnium 8000", "gtceu:soldering_alloy 20000")
        .duration(40000)
        .EUt(GTValues.VA[GTValues.UV])
        .addData("nano_forge_tier", 1)

    gtr.nano_forge("gtceu:rhenium_nanoswarm")
        .notConsumable("gtceu:cyan_glass_lens")
        .itemInputs("8x gtceu:rhenium_block", "64x gtceu:soc")
        .itemOutputs("gtceu:rhenium_nanoswarm")
        .inputFluids("gtceu:naquadria 2000", "gtceu:uu_amplifier 2000", "gtceu:soldering_alloy 20000")
        .duration(80000)
        .EUt(GTValues.VA[GTValues.UV])
        .addData("nano_forge_tier", 1)

    gtr.nano_forge("gtceu:naquadah_nanoswarm")
        .notConsumable("gtceu:emerald_lens")
        .itemInputs("8x gtceu:naquadah_block", "16x gtceu:advanced_soc")
        .itemOutputs("gtceu:naquadah_nanoswarm")
        .inputFluids("gtceu:naquadria 8000", "gtceu:uu_amplifier 2000", "gtceu:mutated_living_solder 20000")
        .duration(160000)
        .EUt(GTValues.VA[GTValues.UV])
        .addData("nano_forge_tier", 1)

    gtr.nano_forge("gtceu:neutronium_nanoswarm")
        .notConsumable("gtceu:nether_star_lens")
        .itemInputs("8x gtceu:neutronium_block", "64x gtceu:soc", "32x gtceu:advanced_soc")
        .itemOutputs("gtceu:neutronium_nanoswarm")
        .inputFluids("gtceu:neutronium 4000", "gtceu:uu_amplifier 2000", "gtceu:mutated_living_solder 20000")
        .duration(320000)
        .EUt(GTValues.VA[GTValues.UV])
        .addData("nano_forge_tier", 1)

    gtr.nano_forge("gtceu:orichalcum_nanoswarm")
        .notConsumable("gtceu:magenta_glass_lens")
        .itemInputs("8x gtceu:orichalcum_block", "64x gtceu:advanced_soc", "64x gtceu:advanced_soc")
        .itemOutputs("gtceu:orichalcum_nanoswarm")
        .inputFluids("gtceu:neutronium 8000", "gtceu:uu_amplifier 4000", "gtceu:mutated_living_solder 40000")
        .duration(320000)
        .EUt(GTValues.VA[GTValues.UV])
        .addData("nano_forge_tier", 1)

    gtr.nano_forge("gtceu:enderium_nanoswarm")
        .notConsumable("gtceu:green_glass_lens")
        .itemInputs("8x gtceu:enderium_block", "64x gtceu:advanced_soc", "64x gtceu:advanced_soc")
        .itemOutputs("gtceu:enderium_nanoswarm")
        .inputFluids("gtceu:neutronium 8000", "gtceu:uu_amplifier 4000", "gtceu:mutated_living_solder 40000")
        .duration(20000)
        .EUt(GTValues.VA[GTValues.UEV])
        .addData("nano_forge_tier", 2)

    gtr.nano_forge("gtceu:infuscolium_nanoswarm")
        .notConsumable("gtceu:pink_glass_lens")
        .itemInputs("8x gtceu:infuscolium_block", "64x gtceu:advanced_soc", "32x gtceu:highly_advanced_soc")
        .itemOutputs("gtceu:infuscolium_nanoswarm")
        .inputFluids("gtceu:neutronium 8000", "gtceu:uu_amplifier 4000", "gtceu:mutated_living_solder 40000")
        .duration(20000)
        .EUt(GTValues.VA[GTValues.UEV])
        .addData("nano_forge_tier", 2)

    gtr.nano_forge("gtceu:uruium_nanoswarm")
        .notConsumable("gtceu:light_blue_glass_lens")
        .itemInputs("8x gtceu:uruium_block", "64x gtceu:advanced_soc", "64x gtceu:highly_advanced_soc")
        .itemOutputs("gtceu:uruium_nanoswarm")
        .inputFluids("gtceu:uu_matter 20000", "gtceu:mutated_living_solder 40000", "gtceu:super_mutated_living_solder 40000")
        .duration(40000)
        .EUt(GTValues.VA[GTValues.UEV])
        .addData("nano_forge_tier", 2)

    gtr.nano_forge("gtceu:vibranium_nanoswarm")
        .notConsumable("gtceu:light_blue_glass_lens")
        .itemInputs("8x gtceu:vibranium_block", "64x gtceu:highly_advanced_soc", "64x gtceu:highly_advanced_soc")
        .itemOutputs("gtceu:vibranium_nanoswarm")
        .inputFluids("gtceu:uu_matter 20000", "gtceu:mutated_living_solder 40000", "gtceu:super_mutated_living_solder 40000")
        .duration(40000)
        .EUt(GTValues.VA[GTValues.UEV])
        .addData("nano_forge_tier", 2)

    gtr.nano_forge("gtceu:starmetal_nanoswarm")
        .notConsumable("gtceu:red_glass_lens")
        .itemInputs("8x gtceu:starmetal_block", "64x gtceu:highly_advanced_soc", "64x gtceu:highly_advanced_soc", "64x gtceu:exquisite_glass_gem", "64x gtceu:exquisite_amethyst_gem")
        .itemOutputs("gtceu:starmetal_nanoswarm")
        .inputFluids("gtceu:uu_matter 40000", "gtceu:mutated_living_solder 80000", "gtceu:super_mutated_living_solder 80000")
        .duration(80000)
        .EUt(GTValues.VA[GTValues.UEV])
        .addData("nano_forge_tier", 2)

    gtr.nano_forge("gtceu:draconium_nanoswarm")
        .notConsumable("gtceu:purple_glass_lens")
        .itemInputs("8x gtceu:draconium_block", "32x gtceu:highly_advanced_soc_wafer", "32x kubejs:optical_ram_wafer", "32x kubejs:optical_soc", "8x kubejs:exotic_processing_core")
        .itemOutputs("gtceu:draconium_nanoswarm")
        .inputFluids("gtceu:uu_matter 40000", "gtceu:mutated_living_solder 80000", "gtceu:super_mutated_living_solder 80000")
        .duration(160000)
        .EUt(GTValues.VA[GTValues.UEV])
        .addData("nano_forge_tier", 2)

    gtr.nano_forge("gtceu:cosmicneutronium_nanoswarm")
        .notConsumable("gtceu:black_glass_lens")
        .itemInputs("8x gtceu:cosmicneutronium_block", "32x kubejs:optical_soc", "32x kubejs:exotic_wafer", "16x kubejs:cosmic_ram_wafer", "8x kubejs:cosmic_processing_unit_core")
        .itemOutputs("gtceu:cosmicneutronium_nanoswarm")
        .inputFluids("gtceu:uu_matter 40000", "gtceu:crystalmatrix 40000", "gtceu:liquid_cosmic_mesh 40000")
        .duration(20000)
        .EUt(GTValues.VA[GTValues.UXV])
        .addData("nano_forge_tier", 3)

    gtr.nano_forge("gtceu:white_dwarf_mtter_nanoswarm")
        .notConsumable("gtceu:ruby_lens")
        .itemInputs("8x gtceu:white_dwarf_mtter_block", "8x kubejs:cosmic_processing_unit_core")
        .itemOutputs("gtceu:white_dwarf_mtter_nanoswarm")
        .inputFluids("gtceu:uu_matter 40000", "gtceu:neutronium 40000", "gtceu:cosmic_element 40000")
        .duration(10000)
        .EUt(GTValues.VA[GTValues.UXV])
        .addData("nano_forge_tier", 3)

    gtr.nano_forge("gtceu:black_dwarf_mtter_nanoswarm")
        .notConsumable("gtceu:ruby_lens")
        .itemInputs("8x gtceu:black_dwarf_mtter_block", "8x kubejs:cosmic_processing_unit_core")
        .itemOutputs("gtceu:black_dwarf_mtter_nanoswarm")
        .inputFluids("gtceu:uu_matter 40000", "gtceu:neutronium 40000", "gtceu:cosmic_element 40000")
        .duration(10000)
        .EUt(GTValues.VA[GTValues.UXV])
        .addData("nano_forge_tier", 3)

    gtr.nano_forge("gtceu:spacetime_nanoswarm")
        .notConsumable("gtceu:sapphire_lens")
        .notConsumable("kubejs:quantum_anomaly")
        .itemInputs("8x gtceu:spacetime_block", "4x kubejs:eigenfolded_kerr_manifold", "16x kubejs:supracausal_ram_wafer", "8x kubejs:supracausal_processing_core")
        .itemOutputs("gtceu:spacetime_nanoswarm")
        .inputFluids("gtceu:uu_matter 80000", "gtceu:infinity 40000", "gtceu:temporalfluid 40000")
        .duration(40000)
        .EUt(GTValues.VA[GTValues.UXV])
        .addData("nano_forge_tier", 3)

    gtr.nano_forge("gtceu:transcendentmetal_nanoswarm")
        .notConsumable("kubejs:non_linear_optical_lens")
        .notConsumable("kubejs:hypercube")
        .itemInputs("gtceu:rhenium_nanoswarm", "8x gtceu:transcendentmetal_block", "8x kubejs:recursively_folded_negative_space", "#gtceu:circuits/max")
        .itemOutputs("gtceu:transcendentmetal_nanoswarm")
        .inputFluids("gtceu:uu_matter 80000", "gtceu:raw_star_matter_plasma 40000", "gtceu:spatialfluid 20000")
        .duration(80000)
        .EUt(GTValues.VA[GTValues.UXV])
        .addData("nano_forge_tier", 3)

    gtr.nano_forge("gtceu:eternity_nanoswarm")
        .notConsumable("gtceu:blue_glass_lens")
        .notConsumable("kubejs:quantum_anomaly")
        .notConsumable("kubejs:eternity_catalyst")
        .itemInputs("gtceu:neutronium_nanoswarm", "8x gtceu:eternity_block", "8x kubejs:ctc_computational_unit")
        .itemOutputs("gtceu:eternity_nanoswarm")
        .inputFluids("gtceu:spatialfluid 80000", "gtceu:exciteddtsc 80000", "gtceu:primordialmatter 80000")
        .duration(160000)
        .EUt(GTValues.VA[GTValues.UXV])
        .addData("nano_forge_tier", 3)

    gtr.electric_blast_furnace("gtceu:tellurium_oxide_dust")
        .itemInputs("gtceu:tellurium_dust")
        .inputFluids("gtceu:oxygen 2000")
        .itemOutputs("3x gtceu:tellurium_oxide_dust")
        .EUt(128)
        .duration(100)
        .blastFurnaceTemp(1760)

    gtr.chemical_reactor("gtceu:butane_1_4_diol")
        .notConsumable("gtceu:molybdenum_trioxide_dust")
        .itemInputs("3x gtceu:tellurium_oxide_dust")
        .inputFluids("gtceu:butane 1000")
        .outputFluids("gtceu:butane_1_4_diol 1000")
        .itemOutputs("gtceu:tellurium_dust")
        .EUt(1920)
        .duration(20)

    gtr.chemical_reactor("gtceu:gammabutyrolactone")
        .notConsumable("gtceu:copper_dust")
        .inputFluids("gtceu:butane_1_4_diol 1000")
        .outputFluids("gtceu:gammabutyrolactone 1000", "gtceu:hydrogen 4000")
        .EUt(1920)
        .duration(80)

    gtr.chemical_reactor("gtceu:methylamine")
        .circuit(1)
        .inputFluids("gtceu:ammonia 1000", "gtceu:methanol 1000")
        .outputFluids("gtceu:methylamine 1000", "minecraft:water 1000")
        .EUt(1920)
        .duration(80)

    gtr.chemical_reactor("gtceu:nmethylpyrolidone")
        .inputFluids("gtceu:gammabutyrolactone 1000", "gtceu:methylamine 1000")
        .outputFluids("gtceu:nmethylpyrolidone 1000", "minecraft:water 1000")
        .EUt(7680)
        .duration(120)

    gtr.chemical_reactor("gtceu:p_nitroaniline")
        .notConsumableFluid("gtceu:acetic_anhydride 1000")
        .inputFluids("gtceu:aniline 1000", "gtceu:nitration_mixture 2000")
        .outputFluids("gtceu:p_nitroaniline 1000", "gtceu:diluted_sulfuric_acid 1000")
        .EUt(1920)
        .duration(150)

    gtr.large_chemical_reactor("gtceu:p_phenylenediamine_dust")
        .notConsumable("gtceu:palladium_dust")
        .inputFluids("gtceu:nitrogen_dioxide 100", "gtceu:hydrogen 6000", "gtceu:p_nitroaniline 1000")
        .outputFluids("minecraft:water 2000")
        .itemOutputs("16x gtceu:p_phenylenediamine_dust")
        .EUt(122880)
        .duration(60)

    gtr.chemical_reactor("gtceu:terephthalicacid")
        .notConsumable("gtceu:cadmium_dust")
        .notConsumable("gtceu:sodium_bisulfate_dust")
        .notConsumableFluid("gtceu:sulfuric_acid 1000")
        .inputFluids("gtceu:phthalic_acid 1000")
        .outputFluids("gtceu:terephthalicacid 1000")
        .EUt(480)
        .duration(800)

    gtr.chemical_reactor("gtceu:dimethylterephthalate")
        .inputFluids("gtceu:terephthalicacid 1000", "gtceu:methanol 2000", "gtceu:sulfuric_acid 2000")
        .outputFluids("gtceu:dimethylterephthalate 1000", "gtceu:diluted_sulfuric_acid 2000")
        .EUt(480)
        .duration(210)

    gtr.large_chemical_reactor("gtceu:terephthaloyl_chloride_dust")
        .inputFluids("gtceu:thionyl_chloride 20000", "gtceu:dimethylterephthalate 5000", "gtceu:carbon_dioxide 6000")
        .itemOutputs("64x gtceu:terephthaloyl_chloride_dust", "48x gtceu:terephthaloyl_chloride_dust")
        .outputFluids("gtceu:diluted_hydrochloric_acid 20000", "gtceu:sulfur_dioxide 20000")
        .EUt(1920)
        .duration(240)

    gtr.large_chemical_reactor("gtceu:liquidcrystalkevlar")
        .itemInputs("gtceu:calcium_chloride_dust", "9x gtceu:terephthaloyl_chloride_dust", "9x gtceu:p_phenylenediamine_dust")
        .inputFluids("gtceu:nmethylpyrolidone 1000")
        .outputFluids("gtceu:liquidcrystalkevlar 9000")
        .EUt(524288)
        .duration(160)

    gtr.assembler("gtceu:chemical_distort")
        .itemInputs("gtceu:chemical_plant", "16x gtceu:carbon_nanoswarm", "8x gtceu:uv_electric_pump", "8x gtceu:uv_emitter", "8x #gtceu:circuits/uv", "8x gtceu:naquadria_plate")
        .inputFluids("gtceu:soldering_alloy 1296")
        .itemOutputs("gtceu:chemical_distort")
        .EUt(524288)
        .duration(400)

    gtr.distort("gtceu:epoxy")
        .notConsumable("gtceu:copper_nanoswarm")
        .itemInputs("1x gtceu:phosphorus_dust", "16x gtceu:salt_dust")
        .inputFluids("minecraft:water 21500", "gtceu:oxygen 10500", "gtceu:propene 4000", "gtceu:benzene 6000")
        .itemOutputs("86x gtceu:sodium_hydroxide_dust")
        .outputFluids("gtceu:epoxy 4000", "gtceu:hydrogen 16000", "gtceu:hydrochloric_acid 4000")
        .EUt(GTValues.VA[GTValues.ZPM])
        .duration(24)
        .blastFurnaceTemp(5600)

    gtr.distort("gtceu:polybenzimidazole")
        .notConsumable("gtceu:iridium_nanoswarm")
        .notConsumable("gtceu:potassium_dichromate_dust")
        .itemInputs("1152x gtceu:carbon_dust", "16x gtceu:copper_dust", "144x gtceu:zinc_dust")
        .inputFluids("gtceu:chlorobenzene 28800", "gtceu:sulfuric_acid 14400", "gtceu:hydrogen 316800", "gtceu:nitrogen 57600", "gtceu:oxygen 201600")
        .outputFluids("gtceu:polybenzimidazole 21600")
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(200)
        .blastFurnaceTemp(6000)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.distort("gtceu:polyphenylene_sulfide")
        .notConsumable("gtceu:silver_nanoswarm")
        .itemInputs("16x gtceu:sulfur_dust")
        .inputFluids("gtceu:benzene 16000")
        .outputFluids("gtceu:polyphenylene_sulfide 24000", "gtceu:hydrogen 32000")
        .EUt(GTValues.VA[GTValues.UV])
        .duration(12)
        .blastFurnaceTemp(800)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.distort("gtceu:platinum_dust")
        .notConsumable("gtceu:iridium_nanoswarm")
        .itemInputs("576x gtceu:platinum_group_sludge_dust", "16x gtceu:sulfur_dust")
        .inputFluids("gtceu:hydrogen 72000", "gtceu:oxygen 128000", "gtceu:chlorine 14400")
        .itemOutputs("64x gtceu:platinum_dust", "64x gtceu:palladium_dust", "60x gtceu:ruthenium_dust", "32x gtceu:iridium_dust", "48x gtceu:rhodium_dust", "32x gtceu:osmium_dust")
        .outputFluids("gtceu:hydrogen 2800", "minecraft:water 7200", "gtceu:chlorine 6400")
        .EUt(GTValues.VA[GTValues.UV])
        .duration(240)
        .blastFurnaceTemp(9000)

    gtr.distort("gtceu:polyimide")
        .notConsumable("gtceu:glowstone_nanoswarm")
        .itemInputs("486x gtceu:carbon_dust")
        .inputFluids("gtceu:hydrogen 256000", "gtceu:nitrogen_dioxide 64000")
        .outputFluids("gtceu:polyimide 21000", "gtceu:hydrogen 12800", "gtceu:nitrogen 6400")
        .EUt(GTValues.V[GTValues.UEV])
        .duration(200)
        .blastFurnaceTemp(14400)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.distort("gtceu:cycloparaphenylene")
        .notConsumable("gtceu:osmium_nanoswarm")
        .itemInputs("1920x gtceu:carbon_dust", "64x gtceu:iodine_dust")
        .inputFluids("gtceu:hydrogen 640000", "gtceu:oxygen 96000", "gtceu:chlorine 96000", "gtceu:fluorine 96000")
        .outputFluids("gtceu:cycloparaphenylene 32000", "gtceu:fluorine 4800", "gtceu:chlorine 3200")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(200)
        .blastFurnaceTemp(16200)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.distort("gtceu:polyvinyl_chloride")
        .notConsumable("gtceu:glowstone_nanoswarm")
        .inputFluids("gtceu:oxygen 10000", "gtceu:chlorine 1440", "gtceu:ethylene 1440")
        .outputFluids("gtceu:polyvinyl_chloride 2160", "gtceu:hydrogen 1440")
        .EUt(GTValues.VA[GTValues.IV])
        .duration(16)
        .blastFurnaceTemp(800)

    gtr.distort("gtceu:silicone_rubber")
        .notConsumable("gtceu:carbon_nanoswarm")
        .itemInputs("3x gtceu:silicon_dust", "gtceu:sulfur_dust")
        .inputFluids("minecraft:water 2000", "gtceu:methane 4000")
        .outputFluids("gtceu:silicone_rubber 1296", "gtceu:hydrogen 4000")
        .EUt(GTValues.VA[GTValues.LuV])
        .duration(32)
        .blastFurnaceTemp(1200)

    gtr.distort("gtceu:styrene_butadiene_rubber")
        .notConsumable("gtceu:iron_nanoswarm")
        .itemInputs("5x gtceu:sulfur_dust")
        .inputFluids("gtceu:butadiene 3000", "gtceu:benzene 1000", "gtceu:ethylene 1000", "gtceu:oxygen 15000")
        .outputFluids("gtceu:styrene_butadiene_rubber 6480", "gtceu:hydrogen 2000")
        .EUt(GTValues.VA[GTValues.ZPM])
        .duration(12)
        .blastFurnaceTemp(1800)

    gtr.distort("gtceu:polytetrafluoroethylene")
        .notConsumable("gtceu:copper_nanoswarm")
        .inputFluids("gtceu:oxygen 5000", "gtceu:methane 1440", "gtceu:fluorine 2880")
        .outputFluids("gtceu:polytetrafluoroethylene 1080", "gtceu:hydrogen 5760")
        .EUt(GTValues.VA[GTValues.ZPM])
        .duration(24)
        .blastFurnaceTemp(2600)

    gtr.distort("gtceu:naquadria_dust")
        .notConsumable("gtceu:naquadah_nanoswarm")
        .itemInputs("128x gtceu:naquadah_dust", "16x gtceu:caesium_dust")
        .inputFluids("gtceu:fluorine 32000", "gtceu:fluoroantimonic_acid 64000", "gtceu:sulfuric_acid 12000", "gtceu:radon 8000", "gtceu:nitrogen_dioxide 4000", "gtceu:xenon 4000")
        .itemOutputs("64x gtceu:naquadria_dust", "64x gtceu:trinium_dust", "256x gtceu:antimony_trifluoride_dust")
        .outputFluids("gtceu:hydrofluoric_acid 272000", "gtceu:radon_trioxide 8000", "gtceu:xenon_trioxide 4000", "gtceu:caesium_fluoride 16000")
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(360)
        .blastFurnaceTemp(12600)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.distort("gtceu:unfolded_fullerene_dust")
        .notConsumable("gtceu:enderium_nanoswarm")
        .itemInputs("3780x gtceu:carbon_dust")
        .inputFluids("gtceu:methane 60000", "gtceu:bromine 60000", "gtceu:nitrogen 60000")
        .itemOutputs("64x gtceu:unfolded_fullerene_dust")
        .outputFluids("gtceu:hydrobromic_acid 60000")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(3200)
        .blastFurnaceTemp(16800)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.distort("gtceu:stem_cells")
        .notConsumable("gtceu:naquadah_nanoswarm")
        .chancedInput("kubejs:glacio_spirit", 8000, 100)
        .itemInputs("gtceu:tiny_naquadah_dust", "gtceu:osmiridium_dust", "gtceu:salt_dust", "gtceu:calcium_dust", "4x gtceu:meat_dust", "4x gtceu:bio_chaff", "2x minecraft:bone")
        .inputFluids("gtceu:phosphoric_acid 1000", "minecraft:water 3000", "gtceu:distilled_water 2000", "gtceu:biomass 1000")
        .itemOutputs("64x gtceu:stem_cells", "gtceu:phosphorus_dust")
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(60)
        .blastFurnaceTemp(12200)
        .cleanroom(CleanroomType.STERILE_CLEANROOM)

    gtr.distort("gtceu:polyurethaneresin")
        .notConsumable("gtceu:gold_nanoswarm")
        .itemInputs("45x gtceu:tin_dust", "64x gtceu:carbon_dust", "5x gtceu:nickel_dust", "5x gtceu:palladium_dust", "5x gtceu:iron_dust", "36x gtceu:silicon_dust")
        .inputFluids("gtceu:oxygen 1964000", "gtceu:hydrogen 529000", "gtceu:chlorine 870000", "gtceu:nitrogen 45000")
        .outputFluids("gtceu:polyurethaneresin 45000")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(270)
        .blastFurnaceTemp(16200)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.distort("gtceu:liquidcrystalkevlar")
        .notConsumable("gtceu:rhenium_nanoswarm")
        .notConsumable("gtceu:annealed_copper_dust")
        .itemInputs("64x gtceu:carbon_dust", "2x gtceu:calcium_dust")
        .inputFluids("gtceu:hydrogen 100000", "gtceu:chlorine 16000", "gtceu:oxygen 18000", "gtceu:nitrogen 18000")
        .outputFluids("gtceu:liquidcrystalkevlar 45000")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(400)
        .blastFurnaceTemp(17200)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.distort("gtceu:zirconium_dust")
        .notConsumable("gtceu:osmium_nanoswarm")
        .itemInputs("1152x gtceu:zircon_dust", "64x gtceu:potassium_dust")
        .inputFluids("gtceu:chlorine 512000", "gtceu:hydrogen 256000", "gtceu:hydrogen_peroxide 128000", "gtceu:sulfur_trioxide 64000")
        .itemOutputs("64x gtceu:zirconium_dust", "48x gtceu:hafnium_dust", "448x gtceu:potassium_sulfate_dust")
        .outputFluids("gtceu:hydrochloric_acid 512000")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(640)
        .blastFurnaceTemp(16200)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.distort("gtceu:hexanitrohexaaxaisowurtzitane_dust")
        .notConsumable("gtceu:orichalcum_nanoswarm")
        .notConsumable("16x kubejs:unstable_star")
        .itemInputs("191x gtceu:silica_gel_dust", "76x gtceu:succinic_acid_dust", "144x gtceu:activated_carbon_dust", "216x gtceu:sodium_dust", "47x gtceu:boron_trioxide_dust", "39x gtceu:potassium_carbonate_dust", "101x gtceu:barium_chloride_dust")
        .inputFluids("gtceu:hydrogen 470000", "gtceu:hydrofluoric_acid 12000", "gtceu:methanol 62000", "gtceu:nitric_acid 15000", "gtceu:ammonia 39000", "gtceu:glyoxal 47000", "gtceu:oxygen_plasma 11000", "gtceu:acetic_anhydride 9000", "gtceu:nitrogen_plasma 7000")
        .itemOutputs("288x gtceu:hexanitrohexaaxaisowurtzitane_dust")
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(5120)
        .blastFurnaceTemp(21600)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.distort("gtceu:photoresist")
        .notConsumable("gtceu:uruium_nanoswarm")
        .itemInputs("91x gtceu:rutile_dust", "60x gtceu:carbon_dust", "42x gtceu:sodium_hydroxide_dust")
        .inputFluids("gtceu:sulfuric_acid 80000", "gtceu:ethanol 7000", "gtceu:chlorine 81000", "gtceu:propene 15000", "gtceu:benzene 39000", "gtceu:ethylene 47000")
        .outputFluids("gtceu:photoresist 16000")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(960)
        .blastFurnaceTemp(16200)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.distort("gtceu:euv_photoresist")
        .notConsumable("gtceu:infuscolium_nanoswarm")
        .itemInputs("30x gtceu:rhenium_dust", "56x gtceu:lithium_dust", "40x gtceu:selenium_dust", "50x gtceu:activated_carbon_dust", "60x gtceu:rutile_dust", "55x gtceu:quicklime_dust")
        .inputFluids("gtceu:ethane 12000", "gtceu:chlorine 75000", "gtceu:photoresist 8000", "gtceu:hydrogen 4700", "gtceu:oxygen 89000", "gtceu:nitrogen 40000", "gtceu:butane 57000")
        .outputFluids("gtceu:euv_photoresist 21600")
        .EUt(GTValues.VA[GTValues.OpV])
        .duration(1280)
        .blastFurnaceTemp(21600)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.distort("gtceu:photopolymer")
        .notConsumable("gtceu:white_dwarf_mtter_nanoswarm")
        .itemInputs("768x gtceu:carbon_dust", "50x gtceu:rutile_dust", "70x gtceu:succinic_acid_dust", "32x gtceu:ice_dust", "20x gtceu:silver_dust", "25x gtceu:quicklime_dust", "40x gtceu:boron_dust", "120x gtceu:sodium_dust")
        .inputFluids("gtceu:benzene 40000", "gtceu:bromine 25000", "gtceu:oxygen 21600", "gtceu:chlorine 5600", "gtceu:propene 16000", "gtceu:butene 80000")
        .outputFluids("gtceu:photopolymer 16000")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(2560)
        .blastFurnaceTemp(21600)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.distort("gtceu:polyetheretherketone")
        .notConsumable("gtceu:vibranium_nanoswarm")
        .itemInputs("16x gtceu:sodium_dust")
        .inputFluids("gtceu:chlorine 48000", "gtceu:benzene 16000", "gtceu:oxygen 60000", "gtceu:propene 8000", "gtceu:nitric_acid 8000")
        .outputFluids("gtceu:polyetheretherketone 20736", "minecraft:water 8000", "gtceu:carbon_dioxide 8000")
        .itemOutputs("32x gtceu:sodium_fluoride_dust")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(1640)
        .blastFurnaceTemp(14400)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.distort("gtceu:zylon_dust")
        .notConsumable("gtceu:black_dwarf_mtter_nanoswarm")
        .itemInputs("1762x gtceu:sulfur_dust", "41x gtceu:sodium_dust")
        .inputFluids("gtceu:bromine 15200", "gtceu:toluene 432000", "gtceu:hydrogen 412000", "gtceu:ethane 6000", "gtceu:propene 50000", "gtceu:nitric_acid 67000", "gtceu:oxygen 40000", "gtceu:benzene 70000")
        .itemOutputs("115x gtceu:zylon_dust")
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(320)
        .blastFurnaceTemp(18900)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.distort("gtceu:mutagen")
        .notConsumable("gtceu:silver_nanoswarm")
        .itemInputs("256x gtceu:bio_chaff", "gtceu:naquadria_dust")
        .inputFluids("gtceu:distilled_water 10000")
        .outputFluids("gtceu:mutagen 10000")
        .EUt(GTValues.VA[GTValues.UV])
        .duration(200)
        .blastFurnaceTemp(12600)
        .cleanroom(CleanroomType.STERILE_CLEANROOM)

    gtr.distort("kubejs:biological_cells")
        .notConsumable("gtceu:neutronium_nanoswarm")
        .itemInputs("256x gtceu:stem_cells", "64x gtceu:meat_dust", "64x gtceu:salt_dust", "64x gtceu:calcium_dust", "64x gtceu:agar_dust", "4x kubejs:tcetieseaweedextract", "2x gtceu:enriched_naquadah_dust", "gtceu:tritanium_dust")
        .inputFluids("gtceu:mutagen 10000")
        .itemOutputs("64x kubejs:biological_cells")
        .EUt(GTValues.VA[GTValues.UV])
        .duration(400)
        .blastFurnaceTemp(16200)
        .cleanroom(CleanroomType.STERILE_CLEANROOM)

    gtr.distort("gtceu:polyvinyl_butyral")
        .notConsumable("gtceu:carbon_nanoswarm")
        .itemInputs("96x gtceu:carbon_dust", "4x gtceu:rutile_dust")
        .inputFluids("gtceu:hydrogen 52000", "gtceu:oxygen 32000", "gtceu:chlorine 4000", "gtceu:propene 16000 ", "gtceu:ethylene 10000")
        .outputFluids("gtceu:polyvinyl_butyral 36864")
        .EUt(GTValues.VA[GTValues.UV])
        .duration(240)
        .blastFurnaceTemp(6000)

    gtr.distort("gtceu:cosmic_superconductor")
        .notConsumable("gtceu:draconium_nanoswarm")
        .itemInputs("gtceu:phosphorus_dust", "18x gtceu:sulfur_dust", "6x gtceu:sodium_dust", "gtceu:thallium_dust", "6x gtceu:rhenium_chloride_dust", "5x gtceu:hassium_chloride_dust", "36x gtceu:atinium_hydride_dust", "14x gtceu:charged_caesium_cerium_cobalt_indium_dust")
        .inputFluids("gtceu:chlorine 34000", "gtceu:fluorine 3000", "gtceu:ethylene 12000", "gtceu:oxygen 46000", "gtceu:hydrogen 102000", "gtceu:uu_matter 2000", "gtceu:quark_gluon_plasma 17000", "gtceu:benzene 3000", "gtceu:acetone 6000")
        .outputFluids("gtceu:cosmic_superconductor 10000")
        .EUt(GTValues.VA[GTValues.MAX])
        .blastFurnaceTemp(36000)
        .duration(4000)
        .cleanroom(GTLCleanroomType.LAW_CLEANROOM)

    gtr.distort("gtceu:acidic_naquadria_solution")
        .notConsumable("gtceu:carbon_nanoswarm")
        .itemInputs("gtceu:enriched_naquadah_dust")
        .inputFluids("gtceu:sulfuric_acid 2000")
        .outputFluids("gtceu:acidic_naquadria_solution 3000")
        .EUt(GTValues.VA[GTValues.UV])
        .blastFurnaceTemp(9000)
        .duration(20)

    gtr.distort("gtceu:acidic_enriched_naquadah_solution")
        .notConsumable("gtceu:carbon_nanoswarm")
        .itemInputs("gtceu:naquadria_dust")
        .inputFluids("gtceu:sulfuric_acid 2000")
        .outputFluids("gtceu:acidic_enriched_naquadah_solution 3000")
        .EUt(GTValues.VA[GTValues.UV])
        .blastFurnaceTemp(9000)
        .duration(20)

    gtr.qft("gtceu:fullerene_polymer_matrix_pulp_dust")
        .notConsumable("gtceu:starmetal_nanoswarm")
        .itemInputs("16x gtceu:fullerene_dust", "8x gtceu:palladium_dust")
        .inputFluids("gtceu:nitrogen 15000", "gtceu:hydrogen 73000", "gtceu:oxygen 13000")
        .itemOutputs("16x gtceu:fullerene_polymer_matrix_pulp_dust")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(400)

    gtr.qft("gtceu:taranium_dust")
        .notConsumable("avaritia:infinity_catalyst")
        .itemInputs("176x gtceu:bedrock_dust", "64x gtceu:carbon_dust", "640x gtceu:deepslate_dust")
        .inputFluids("gtceu:helium 37000", "gtceu:hydrogen 73000", "gtceu:xenon 3000")
        .itemOutputs("64x gtceu:taranium_dust")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(1600)

    gtr.chemical_reactor("gtceu:calcium_chloride_dust")
        .itemInputs("gtceu:calcium_dust")
        .inputFluids("gtceu:chlorine 2000")
        .itemOutputs("3x gtceu:calcium_chloride_dust")
        .EUt(30)
        .duration(80)

    gtr.large_chemical_reactor("gtceu:iridium_chloride_dust")
        .circuit(24)
        .itemInputs("gtceu:iridium_dust")
        .inputFluids("gtceu:chlorine 3000")
        .itemOutputs("4x gtceu:iridium_chloride_dust")
        .EUt(30720)
        .duration(800)

    gtr.large_chemical_reactor("gtceu:titanium_trifluoride_dust")
        .circuit(24)
        .itemInputs("gtceu:titanium_dust")
        .inputFluids("gtceu:fluorine 3000")
        .itemOutputs("4x gtceu:titanium_trifluoride_dust")
        .EUt(30720)
        .duration(600)

    gtr.large_chemical_reactor("gtceu:barium_sulfide_dust")
        .circuit(24)
        .itemInputs("6x gtceu:barite_dust")
        .inputFluids("gtceu:hydrogen 4000")
        .itemOutputs("2x gtceu:barium_sulfide_dust")
        .outputFluids("minecraft:water 4000")
        .EUt(30720)
        .duration(400)

    gtr.large_chemical_reactor("gtceu:aluminium_sulfite_dust")
        .circuit(24)
        .itemInputs("2x gtceu:aluminium_dust")
        .inputFluids("gtceu:sulfuric_acid 3000")
        .itemOutputs("14x gtceu:aluminium_sulfite_dust")
        .outputFluids("minecraft:water 3000")
        .EUt(30720)
        .duration(400)

    gtr.chemical_reactor("gtceu:potassium_bromide_dust")
        .itemInputs("gtceu:potassium_dust")
        .inputFluids("gtceu:bromine 1000")
        .itemOutputs("2x gtceu:potassium_bromide_dust")
        .EUt(120)
        .duration(160)

    gtr.qft("kubejs:timepiece")
        .notConsumable("gtceu:white_dwarf_mtter_nanoswarm")
        .notConsumable("gtceu:black_dwarf_mtter_nanoswarm")
        .chancedInput("gtceu:spacetime_hex_wire", 1, 0)
        .chancedOutput("kubejs:timepiece", 2500, 0)
        .inputFluids("gtceu:cosmic_element 100")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(200)

    gtr.packer("gtceu:tiny_degenerate_rhenium_dust")
        .itemInputs("gtceu:degenerate_rhenium_dust")
        .itemOutputs("9x gtceu:tiny_degenerate_rhenium_dust")
        .EUt(1920)
        .duration(20)

    gtr.lightning_processor("gtceu:thaumium_dust")
        .itemInputs("8x gtceu:infused_gold_dust", "8x gtceu:iron_dust", "16x gtceu:lapis_dust")
        .inputFluids("gtceu:distilled_water 1000")
        .itemOutputs("16x gtceu:thaumium_dust")
        .EUt(7680)
        .duration(480)

    gtr.mixer("gtceu:astral_silver_dust")
        .itemInputs("2x gtceu:silver_dust", "gtceu:thaumium_dust")
        .itemOutputs("3x gtceu:astral_silver_dust")
        .EUt(1920)
        .duration(400)

    gtr.mixer("gtceu:highenergymixture_dust")
        .itemInputs("4x minecraft:glowstone_dust", "2x minecraft:redstone", "1x gtceu:aluminium_dust")
        .circuit(3)
        .itemOutputs("4x gtceu:highenergymixture_dust")
        .EUt(480)
        .duration(600)

    gtr.fluid_solidifier("gtceu:luminessence_dust")
        .itemInputs("2x gtceu:highenergymixture_dust")
        .inputFluids("gtceu:phosphoric_acid 2000")
        .itemOutputs("gtceu:luminessence_dust")
        .EUt(480)
        .duration(200)

    gtr.mixer("gtceu:sunnarium")
        .notConsumable("gtceu:uxv_field_generator")
        .inputFluids("gtceu:helium_plasma 1000", "gtceu:glowstone 1000")
        .outputFluids("gtceu:sunnarium 1000")
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(400)

    gtr.stellar_forge("gtceu:astraltitanium_plasma")
        .itemInputs("kubejs:naquadria_charge")
        .inputFluids("gtceu:force 576", "gtceu:titanium 576", "gtceu:cobalt 288", "gtceu:copper 288", "gtceu:tritium 1000")
        .outputFluids("gtceu:astraltitanium_plasma 1000")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(200)
        .addData("SCTier", 1)

    gtr.stellar_forge("gtceu:celestialtungsten_plasma")
        .itemInputs("kubejs:naquadria_charge")
        .inputFluids("gtceu:tartarite 576", "gtceu:tungsten 576", "gtceu:americium 288", "gtceu:titan_precision_steel 144", "gtceu:astraltitanium 144", "gtceu:xenon 1000")
        .outputFluids("gtceu:celestialtungsten_plasma 1000")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(200)
        .addData("SCTier", 1)

    gtr.arc_furnace("kubejs:cosmic_singularity")
        .itemInputs("avaritia:eternal_singularity")
        .inputFluids("gtceu:magnetohydrodynamicallyconstrainedstarmatter 9216")
        .itemOutputs("kubejs:cosmic_singularity", "64x gtceu:shirabon_dust")
        .outputFluids("gtceu:helium_plasma 1000")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(200)

    gtr.qft("gtceu:cosmic_ingot")
        .notConsumable("gtceu:cosmicneutronium_nanoswarm")
        .chancedInput("kubejs:cosmic_singularity", 1000, 0)
        .itemInputs("kubejs:hypercube", "avaritia:infinity_ingot")
        .inputFluids("gtceu:white_dwarf_mtter 576", "gtceu:black_dwarf_mtter 576", "gtceu:primordialmatter 500")
        .itemOutputs("gtceu:cosmic_ingot")
        .EUt(64 * GTValues.VA[GTValues.MAX])
        .duration(200)

    gtr.qft("gtceu:magmatter")
        .notConsumable("kubejs:spacetime_catalyst")
        .inputFluids("gtceu:chaos 1000", "gtceu:spatialfluid 1000", "gtceu:exciteddtsc 1000")
        .itemInputs("gtceu:attuned_tengam_block")
        .outputFluids("gtceu:magmatter 1000")
        .EUt(16 * GTValues.VA[GTValues.MAX])
        .duration(800)

    gtr.sps_crafting("gtceu:magmatter_ingot")
        .circuit(1)
        .notConsumable("kubejs:ingot_field_shape")
        .inputFluids("gtceu:mana 100000", "gtceu:magmatter 100")
        .itemInputs("minecraft:netherite_ingot")
        .itemOutputs("gtceu:magmatter_ingot")
        .EUt(4 * GTValues.VA[GTValues.MAX])
        .duration(400)

    gtr.sps_crafting("gtceu:magmatter_ingot_d")
        .inputFluids("gtceu:mana 10000", "gtceu:magmatter 10")
        .notConsumable("kubejs:ingot_field_shape")
        .itemInputs("gtceu:magmatter_dust", "minecraft:netherite_ingot")
        .itemOutputs("gtceu:magmatter_ingot")
        .EUt(4 * GTValues.VA[GTValues.MAX])
        .duration(200)

    gtr.lathe("gtceu:magmatter_rod")
        .itemInputs("gtceu:magmatter_ingot")
        .itemOutputs("gtceu:magmatter_rod")
        .itemOutputs("gtceu:small_magmatter_dust")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(200)

    gtr.packer("gtceu:magmatter_dust")
        .notConsumable("gtceu:transcendentmetal_nanoswarm")
        .itemInputs("4x gtceu:small_magmatter_dust")
        .itemOutputs("gtceu:magmatter_dust")
        .EUt(30)
        .duration(20)

    gtr.forge_hammer("gtceu:long_magmatter_rod")
        .itemInputs("2x gtceu:magmatter_rod")
        .itemOutputs("gtceu:long_magmatter_rod")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(300)

    gtr.assembly_line("gtceu:mega_extractor")
        .itemInputs("16x gtceu:uhv_extractor", "16x gtceu:uhv_fluid_solidifier", "32x gtceu:uev_electric_piston", "8x gtceu:uev_electric_pump", "4x #gtceu:circuits/uiv", "16x gtceu:titansteel_hex_wire", "16x gtceu:double_quantum_plate", "32x gtceu:double_hastelloy_x_plate")
        .inputFluids("gtceu:mutated_living_solder 2304", "gtceu:naquadria 4608", "gtceu:plutonium 4608", "gtceu:mithril 4608")
        .itemOutputs("gtceu:mega_extractor")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(800)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:large_extractor"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UEV])
            .CWUt(256))

    gtr.assembly_line("gtceu:mega_fluid_heater")
        .itemInputs("16x gtceu:uev_fluid_heater", "8x #gtceu:circuits/uxv", "16x gtceu:uiv_fluid_heater", "16x gtceu:uiv_fluid_regulator", "16x gtceu:titansteel_hex_wire", "16x gtceu:double_mithril_plate", "16x gtceu:double_quantum_plate")
        .inputFluids("gtceu:taranium 2304", "gtceu:vibranium 2304", "gtceu:astraltitanium_plasma 4608", "gtceu:degenerate_rhenium_plasma 4608")
        .itemOutputs("gtceu:mega_fluid_heater")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(1600)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:uiv_fluid_heater"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UIV])
            .CWUt(512))

    gtr.assembly_line("gtceu:mega_canner")
        .itemInputs("16x gtceu:uev_canner", "16x gtceu:uev_robot_arm", "32x gtceu:uev_electric_piston", "16x gtceu:uev_electric_pump", "32x gtceu:double_lafium_plate", "32x gtceu:double_naquadria_plate", "4x #gtceu:circuits/uiv")
        .inputFluids("gtceu:naquadria 4608", "gtceu:orichalcum_plasma 2304", "gtceu:mithril_plasma 2304", "gtceu:darmstadtium 4608")
        .itemOutputs("gtceu:mega_canner")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(800)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:uev_canner"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UEV])
            .CWUt(256))

    gtr.chemical_reactor("gtceu:sodium_hydroxide_dust")
        .itemInputs("gtceu:sodium_dust")
        .inputFluids("minecraft:water 1000")
        .itemOutputs("3x gtceu:sodium_hydroxide_dust")
        .outputFluids("gtceu:hydrogen 1000")
        .EUt(30)
        .duration(60)

    gtr.chemical_reactor("gtceu:potassium_hydroxide_dust")
        .itemInputs("gtceu:potassium_dust")
        .inputFluids("minecraft:water 1000")
        .itemOutputs("3x gtceu:potassium_hydroxide_dust")
        .outputFluids("gtceu:hydrogen 1000")
        .EUt(30)
        .duration(60)

    gtr.assembler("kubejs:inverter")
        .itemInputs("4x gtceu:polyethylene_plate", "4x gtceu:ilc_chip", "2x gtceu:exquisite_quartzite_gem", "gtceu:computer_monitor_cover", "#gtceu:circuits/ev", "4x gtceu:diode", "8x gtceu:aluminium_single_wire")
        .inputFluids("gtceu:soldering_alloy 144")
        .itemOutputs("kubejs:inverter")
        .EUt(120)
        .duration(200)

    tiers.forEach(i => {
        gtr.assembler("gtceu:" + i[0] + "_neutron_accelerator")
            .itemInputs("gtceu:" + i[0] + "_machine_hull", "kubejs:inverter", i[1] == 0 ? "2x gtceu:lead_rotor" : "2x " + i[2] + ":" + i[0] + "_electric_motor", "gtceu:double_beryllium_plate", "2x gtceu:polyvinyl_chloride_plate")
            .itemOutputs("gtceu:" + i[0] + "_neutron_accelerator")
            .inputFluids("gtceu:polonium 288")
            .EUt(30)
            .duration(400)
    })

    gtr.assembler("gtceu:neutron_sensor")
        .itemInputs("gtceu:iv_machine_hull", "gtceu:advanced_activity_detector_cover", "gtceu:computer_monitor_cover", "gtceu:vibrant_alloy_hex_wire", "#gtceu:circuits/ev", "2x gtceu:hv_sensor")
        .inputFluids("gtceu:helium 1000")
        .itemOutputs("gtceu:neutron_sensor")
        .EUt(1920)
        .duration(200)

    gtr.assembler("gtceu:neutron_activator")
        .itemInputs("gtceu:iv_machine_hull", "4x kubejs:hui_circuit_1", "#gtceu:circuits/iv", "2x gtceu:data_stick", "gtceu:ev_sensor", "2x gtceu:ev_emitter", "gtceu:uranium_235_block", "gtceu:polonium_block", "2x gtceu:neutron_reflector")
        .inputFluids("gtceu:stainless_steel 1296")
        .itemOutputs("gtceu:neutron_activator")
        .EUt(7680)
        .duration(200)

    gtr.assembler("kubejs:speeding_pipe")
        .itemInputs("ad_astra:fluid_pipe_duct", "gtceu:stainless_steel_huge_fluid_pipe", "16x gtceu:blue_alloy_rod", "#gtceu:circuits/ev", "32x gtceu:mercury_barium_calcium_cuprate_single_wire", "32x gtceu:beryllium_plate")
        .itemOutputs("kubejs:speeding_pipe")
        .inputFluids("gtceu:mar_m_200_steel 576")
        .EUt(1920)
        .duration(200)

    gtr.assembler("gtlcore:process_machine_casing")
        .itemInputs("gtceu:solid_machine_casing", "2x #gtceu:circuits/iv", "2x gtceu:double_stainless_steel_plate", "4x gtceu:double_mar_m_200_steel_plate")
        .inputFluids("gtceu:fall_king 576")
        .itemOutputs("gtlcore:process_machine_casing")
        .EUt(7680)
        .duration(200)

    gtr.assembler("gtceu:disassembly")
        .itemInputs("gtceu:assembly_line", "4x gtceu:naquadah_alloy_gear", "16x gtceu:luv_robot_arm", "8x gtceu:luv_conveyor_module", "8x gtceu:luv_emitter", "4x gtceu:double_naquadah_alloy_plate")
        .inputFluids("gtceu:naquadah 1440")
        .itemOutputs("gtceu:disassembly")
        .EUt(7680)
        .duration(800)

    gtr.vacuum_freezer("gtceu:metastable_oganesson")
        .inputFluids("gtceu:hot_oganesson 1000", "kubejs:gelid_cryotheum 144")
        .outputFluids("gtceu:metastable_oganesson 144")
        .itemOutputs("2x gtceu:small_enderium_dust")
        .EUt(GTValues.VA[GTValues.UV])
        .duration(280)

    gtr.neutron_activator("gtceu:hassium")
        .inputFluids("gtceu:liquid_metastable_hassium 1000")
        .outputFluids("gtceu:hassium 1000")
        .addData("ev_min", 340)
        .addData("ev_max", 380)
        .addData("evt", 480)
        .duration(200)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.neutron_activator("gtceu:oganesson")
        .inputFluids("gtceu:metastable_oganesson 1000")
        .outputFluids("gtceu:oganesson 1000")
        .addData("ev_min", 720)
        .addData("ev_max", 800)
        .addData("evt", 1200)
        .duration(200)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.neutron_activator("gtceu:quantanium")
        .inputFluids("gtceu:neon 10000")
        .itemInputs("4x gtceu:quantum_star", "8x gtceu:quantum_eye", "16x gtceu:mithril_dust", "16x gtceu:gadolinium_dust", "64x minecraft:netherite_scrap", "64x ae2:fluix_dust")
        .outputFluids("gtceu:quantanium 10000")
        .addData("ev_min", 1020)
        .addData("ev_max", 1200)
        .addData("evt", 3840)
        .duration(1200)

    gtr.neutron_activator("kubejs:draconium_dust")
        .inputFluids("gtceu:uu_amplifier 1000")
        .notConsumable("gtceu:degenerate_rhenium_plate")
        .itemInputs("minecraft:dragon_egg")
        .itemOutputs("8x gtceu:ender_eye_dust", "4x gtceu:ender_pearl_dust")
        .chancedOutput("kubejs:draconium_dust", 4000, 0)
        .addData("ev_min", 800)
        .addData("ev_max", 900)
        .addData("evt", 5760)
        .duration(800)

    gtr.assembly_line("gtceu:auto_configuration_maintenance_hatch")
        .itemInputs("gtceu:iv_machine_hull", "4x gtceu:configurable_maintenance_hatch", "8x gtceu:iv_conveyor_module", "8x gtceu:iv_robot_arm", "16x #gtceu:circuits/iv", "4x gtceu:iv_emitter", "4x gtceu:iv_sensor", "gtceu:rad_away_pill", "gtceu:paracetamol_pill", "16x gtceu:stainless_steel_foil")
        .inputFluids("gtceu:lubricant 1000", "gtceu:soldering_alloy 576", "gtceu:cupronickel 576", "gtceu:brass 576")
        .itemOutputs("gtceu:auto_configuration_maintenance_hatch")
        .EUt(GTValues.VA[GTValues.LuV])
        .duration(800)
    ["scannerResearch(java.util.function.UnaryOperator)"](b => b.researchStack(Registries.getItemStack("gtceu:auto_maintenance_hatch")).dataStack(Registries.getItemStack("gtceu:data_orb")).EUt(GTValues.VA[GTValues.IV]).duration(8000))

    gtr.plasma_generator("gtceu:orichalcum")
        .inputFluids("gtceu:orichalcum_plasma 1")
        .outputFluids("gtceu:orichalcum 1")
        .duration(384)
        .EUt(-GTValues.V[GTValues.EV])

    gtr.plasma_generator("gtceu:mithril")
        .inputFluids("gtceu:mithril_plasma 1")
        .outputFluids("gtceu:mithril 1")
        .duration(422)
        .EUt(-GTValues.V[GTValues.EV])

    gtr.plasma_generator("gtceu:silver")
        .inputFluids("gtceu:silver_plasma 1")
        .outputFluids("gtceu:silver 1")
        .duration(256)
        .EUt(-GTValues.V[GTValues.EV])

    gtr.assembler("gtceu:heat_exchanger")
        .itemInputs("gtceu:iv_machine_hull", "8x gtceu:tungsten_carbide_huge_fluid_pipe", "16x gtceu:mar_m_200_steel_gear", "16x gtceu:lapis_plate", "16x gtceu:diamond_plate", "16x gtceu:obsidian_plate", "8x gtceu:double_mar_m_200_steel_plate", "16x gtceu:double_tungsten_steel_plate", "16x gtceu:double_tungsten_steel_plate")
        .inputFluids("gtceu:redstone 5760")
        .itemOutputs("gtceu:heat_exchanger")
        .EUt(GTValues.VA[GTValues.EV])
        .duration(400)

    gtr.assembler("gtlcore:supercritical_turbine_casing")
        .itemInputs("gtceu:tungstensteel_turbine_casing", "2x gtceu:mar_m_200_steel_rod", "gtceu:mar_m_200_steel_gear", "6x gtceu:mar_m_200_steel_plate")
        .itemOutputs("gtlcore:supercritical_turbine_casing")
        .EUt(16)
        .duration(50)

    gtr.assembler("gtceu:supercritical_steam_turbine")
        .itemInputs("gtceu:luv_machine_hull", "4x #gtceu:circuits/luv", "2x gtceu:luv_electric_motor", "2x gtceu:mar_m_200_steel_gear", "2x gtceu:tungsten_carbide_large_fluid_pipe", "8x gtceu:mar_m_200_steel_plate")
        .itemOutputs("gtceu:supercritical_steam_turbine")
        .EUt(GTValues.VA[GTValues.LuV])
        .duration(200)

    gtr.assembler("gtceu:supercritical_mega_steam_turbine")
        .itemInputs("8x gtceu:supercritical_steam_turbine", "8x #gtceu:circuits/uv", "8x gtceu:luv_electric_piston", "16x gtceu:luv_electric_pump", "8x gtceu:naquadah_turbine_blade", "8x gtceu:double_hsss_plate", "32x gtceu:double_mar_m_200_steel_plate")
        .itemOutputs("gtceu:supercritical_mega_steam_turbine")
        .EUt(GTValues.VA[GTValues.ZPM])
        .duration(1200)

    gtr.extractor("gtceu:antimatter")
        .itemInputs("kubejs:pellet_antimatter")
        .outputFluids("gtceu:antimatter 1000")
        .duration(2000)
        .EUt(480)

    gtr.assembly_line("gtceu:element_copying")
        .itemInputs("4x gtceu:uxv_scanner", "4x gtceu:uxv_canner", "4x gtceu:uxv_packer", "4x gtceu:uxv_extractor", "16x #gtceu:circuits/uxv", "8x gtceu:uxv_fluid_regulator", "16x gtceu:heavy_quark_degenerate_matter_small_fluid_pipe", "4x gtceu:uruium_nanoswarm", "32x gtceu:molybdenum_disilicide_rod", "32x gtceu:titanium_tungsten_carbide_rod", "32x gtceu:double_silicon_carbide_plate", "32x gtceu:double_heavy_quark_degenerate_matter_plate")
        .inputFluids("gtceu:mutated_living_solder 2304", "gtceu:periodicium 2304", "gtceu:sunnarium 4608", "gtceu:vibramantium 4608")
        .itemOutputs("gtceu:element_copying")
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(800)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:star_ultimate_material_forge_factory"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UXV])
            .CWUt(2048))

    gtr.electric_blast_furnace("kubejs:giga_chad")
        .itemInputs("64x gtceu:uiv_field_generator", "64x gtceu:uxv_field_generator", "64x gtceu:opv_field_generator")
        .inputFluids("gtceu:exciteddtec 10000000")
        .itemOutputs("kubejs:giga_chad")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(4000)
        .blastFurnaceTemp(36000)

    gtr.heat_exchanger("gtceu:hot_sodium_potassium")
        .inputFluids("gtceu:hot_sodium_potassium 1")
        .inputFluids("minecraft:water 160")
        .outputFluids("gtceu:sodium_potassium 1")
        .outputFluids("gtceu:steam 25600")
        .duration(200)

    gtr.heat_exchanger("gtceu:supercritical_sodium_potassium")
        .inputFluids("gtceu:supercritical_sodium_potassium 1")
        .inputFluids("gtceu:distilled_water 80")
        .outputFluids("gtceu:sodium_potassium 1")
        .outputFluids("gtceu:supercritical_steam 12800")
        .duration(200)
        .addData("eu", 12800)

    gtr.assembler("gtlcore:fission_reactor_casing")
        .itemInputs("gtceu:vanadium_steel_frame", "6x gtceu:lead_plate", "6x gtceu:reactor_steel_plate")
        .itemOutputs("2x gtlcore:fission_reactor_casing")
        .EUt(30)
        .duration(50)

    gtr.assembler("gtlcore:cooler")
        .itemInputs("gtlcore:fission_reactor_casing", "2x gtceu:annealed_copper_hex_wire", "8x gtceu:vanadium_steel_tiny_fluid_pipe", "4x gtceu:stainless_steel_plate")
        .inputFluids("gtceu:soldering_alloy 288")
        .itemOutputs("gtlcore:cooler")
        .EUt(120)
        .duration(200)

    gtr.assembler("gtlcore:fission_fuel_assembly")
        .itemInputs("gtceu:graphite_block", "4x gtceu:long_stainless_steel_rod", "4x gtceu:double_reactor_steel_plate")
        .inputFluids("gtceu:soldering_alloy 288")
        .itemOutputs("gtlcore:fission_fuel_assembly")
        .EUt(120)
        .duration(200)

    gtr.assembler("gtceu:fission_reactor")
        .itemInputs("gtceu:iv_machine_hull", "4x #gtceu:circuits/iv", "gtceu:computer_monitor_cover", "4x gtceu:neutron_reflector", "8x gtceu:dense_reactor_steel_plate")
        .inputFluids("gtceu:soldering_alloy 288")
        .itemOutputs("gtceu:fission_reactor")
        .EUt(480)
        .duration(200)

    gtr.centrifuge("gtceu:neutronium_block")
        .notConsumable("gtceu:neutronium_nanoswarm")
        .itemInputs("avaritia:neutron")
        .itemOutputs("9x gtceu:naquadah_dust", "9x gtceu:neutronium_dust")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(800)

    gtr.forming_press("kubejs:reactor_fuel_rod")
        .notConsumable("gtceu:cell_extruder_mold")
        .itemInputs("gtceu:magnetic_steel_ingot")
        .itemOutputs("kubejs:reactor_fuel_rod")
        .EUt(30)
        .duration(200)

    gtr.forming_press("kubejs:tungsten_carbide_reactor_fuel_rod")
        .notConsumable("gtceu:cell_extruder_mold")
        .itemInputs("gtceu:magnetic_neodymium_ingot", "gtceu:tungsten_carbide_ingot")
        .itemOutputs("kubejs:tungsten_carbide_reactor_fuel_rod")
        .EUt(120)
        .duration(200)

    gtr.canner("kubejs:reactor_uranium_simple")
        .itemInputs("kubejs:reactor_fuel_rod", "16x gtceu:uranium_dust")
        .inputFluids("gtceu:uranium_235 96")
        .itemOutputs("kubejs:reactor_uranium_simple")
        .EUt(1920)
        .duration(120)

    gtr.canner("kubejs:reactor_thorium_simple")
        .itemInputs("kubejs:reactor_fuel_rod", "12x gtceu:thorium_dust")
        .itemOutputs("kubejs:reactor_thorium_simple")
        .EUt(480)
        .duration(120)

    gtr.canner("kubejs:reactor_mox_simple")
        .itemInputs("kubejs:reactor_fuel_rod", "18x gtceu:uranium_dust")
        .inputFluids("gtceu:plutonium 432")
        .itemOutputs("kubejs:reactor_mox_simple")
        .EUt(7680)
        .duration(120)

    gtr.canner("kubejs:reactor_naquadah_simple")
        .itemInputs("kubejs:tungsten_carbide_reactor_fuel_rod", "4x gtceu:naquadah_dust")
        .inputFluids("gtceu:thorium 144")
        .itemOutputs("kubejs:reactor_naquadah_simple")
        .EUt(30720)
        .duration(120)

    function assemble_fuel(name, isnq) {
        let rod = isnq ? "4x gtceu:tungsten_carbide_rod" : "4x gtceu:steel_rod"
        gtr.assembler("kubejs:reactor_" + name + "_dual")
            .itemInputs("2x kubejs:reactor_" + name + "_simple", rod)
            .itemOutputs("kubejs:reactor_" + name + "_dual")
            .EUt(30)
            .duration(40)

        gtr.assembler("kubejs:reactor_" + name + "_quad")
            .itemInputs("2x kubejs:reactor_" + name + "_dual", rod)
            .itemOutputs("kubejs:reactor_" + name + "_quad")
            .EUt(30)
            .duration(80)
    }

    assemble_fuel("uranium", false)
    assemble_fuel("thorium", false)
    assemble_fuel("mox", false)
    assemble_fuel("naquadah", true)

    function centrifuge_fuel(name, isnq, product, output, chance, extra) {
        let rod = isnq ? "gtceu:tungsten_carbide_rod" : "gtceu:steel_rod"
        let fuel_rod = isnq ? "kubejs:tungsten_carbide_reactor_fuel_rod" : "kubejs:reactor_fuel_rod"
        gtr.centrifuge("kubejs:depleted_reactor_" + name + "_simple")
            .itemInputs("kubejs:depleted_reactor_" + name + "_simple")
            .itemOutputs(fuel_rod)
            .chancedOutput(output + "x " + product, chance, extra)
            .chancedOutput("2x kubejs:nuclear_waste", 1600, 500)
            .EUt(480)
            .duration(40)

        gtr.centrifuge("kubejs:depleted_reactor_" + name + "_dual")
            .itemInputs("kubejs:depleted_reactor_" + name + "_dual")
            .itemOutputs("2x " + fuel_rod, "4x " + rod)
            .chancedOutput(2 * output + "x " + product, chance, extra)
            .chancedOutput("4x kubejs:nuclear_waste", 3600, 500)
            .EUt(480)
            .duration(80)

        gtr.centrifuge("kubejs:depleted_reactor_" + name + "_quad")
            .itemInputs("kubejs:depleted_reactor_" + name + "_quad")
            .itemOutputs("4x " + fuel_rod, "12x " + rod)
            .chancedOutput(4 * output + "x " + product, chance, extra)
            .chancedOutput("8x kubejs:nuclear_waste", 8000, 500)
            .EUt(480)
            .duration(160)
    }

    centrifuge_fuel("uranium", false, "gtceu:plutonium_dust", 6, 2500, 100)
    centrifuge_fuel("thorium", false, "gtceu:uranium_dust", 4, 4000, 500)
    centrifuge_fuel("mox", false, "kubejs:nuclear_waste", 8, 2000, 1000)
    centrifuge_fuel("naquadah", true, "gtceu:plutonium_dust", 2, 8000, 200)

    gtr.fission_reactor("kubejs:reactor_thorium_simple")
        .itemInputs("kubejs:reactor_thorium_simple")
        .itemOutputs("kubejs:depleted_reactor_thorium_simple")
        .EUt(6)
        .duration(134400)
        .addData("FRheat", 1)

    gtr.fission_reactor("kubejs:reactor_thorium_dual")
        .itemInputs("kubejs:reactor_thorium_dual")
        .itemOutputs("kubejs:depleted_reactor_thorium_dual")
        .EUt(8)
        .duration(172800)
        .addData("FRheat", 2)

    gtr.fission_reactor("kubejs:reactor_thorium_quad")
        .itemInputs("kubejs:reactor_thorium_quad")
        .itemOutputs("kubejs:depleted_reactor_thorium_quad")
        .EUt(10)
        .duration(216000)
        .addData("FRheat", 3)

    gtr.fission_reactor("kubejs:reactor_uranium_simple")
        .itemInputs("kubejs:reactor_uranium_simple")
        .itemOutputs("kubejs:depleted_reactor_uranium_simple")
        .EUt(3)
        .duration(112000)
        .addData("FRheat", 4)

    gtr.fission_reactor("kubejs:reactor_uranium_dual")
        .itemInputs("kubejs:reactor_uranium_dual")
        .itemOutputs("kubejs:depleted_reactor_uranium_dual")
        .EUt(4)
        .duration(144000)
        .addData("FRheat", 5)

    gtr.fission_reactor("kubejs:reactor_uranium_quad")
        .itemInputs("kubejs:reactor_uranium_quad")
        .itemOutputs("kubejs:depleted_reactor_uranium_quad")
        .EUt(5)
        .duration(180000)
        .addData("FRheat", 6)

    gtr.fission_reactor("kubejs:reactor_mox_simple")
        .itemInputs("kubejs:reactor_mox_simple")
        .itemOutputs("kubejs:depleted_reactor_mox_simple")
        .EUt(1)
        .duration(78400)
        .addData("FRheat", 6)

    gtr.fission_reactor("kubejs:reactor_mox_dual")
        .itemInputs("kubejs:reactor_mox_dual")
        .itemOutputs("kubejs:depleted_reactor_mox_dual")
        .EUt(2)
        .duration(100800)
        .addData("FRheat", 7)

    gtr.fission_reactor("kubejs:reactor_mox_quad")
        .itemInputs("kubejs:reactor_mox_quad")
        .itemOutputs("kubejs:depleted_reactor_mox_quad")
        .EUt(3)
        .duration(128000)
        .addData("FRheat", 8)

    gtr.fission_reactor("kubejs:reactor_naquadah_simple")
        .itemInputs("kubejs:reactor_naquadah_simple")
        .itemOutputs("kubejs:depleted_reactor_naquadah_simple")
        .EUt(3)
        .duration(160000)
        .addData("FRheat", 7)

    gtr.fission_reactor("kubejs:reactor_naquadah_dual")
        .itemInputs("kubejs:reactor_naquadah_dual")
        .itemOutputs("kubejs:depleted_reactor_naquadah_dual")
        .EUt(5)
        .duration(240000)
        .addData("FRheat", 8)

    gtr.fission_reactor("kubejs:reactor_naquadah_quad")
        .itemInputs("kubejs:reactor_naquadah_quad")
        .itemOutputs("kubejs:depleted_reactor_naquadah_quad")
        .EUt(7)
        .duration(360000)
        .addData("FRheat", 9)

    gtr.assembler("gtmthings:ulv_huge_item_import_bus")
        .inputFluids("gtceu:soldering_alloy 144")
        .itemInputs("gtceu:ulv_input_bus", "gtlcore:primitive_robot_arm", "gtceu:bronze_crate", "4x #gtceu:circuits/ulv", "4x gtceu:wrought_iron_plate")
        .itemOutputs("gtmthings:ulv_huge_item_import_bus")
        .EUt(7)
        .duration(200)

    gtr.assembler("gtmthings:ulv_huge_item_export_bus")
        .inputFluids("gtceu:soldering_alloy 144")
        .itemInputs("gtceu:ulv_output_bus", "gtlcore:primitive_robot_arm", "gtceu:bronze_crate", "4x #gtceu:circuits/ulv", "4x gtceu:wrought_iron_plate")
        .itemOutputs("gtmthings:ulv_huge_item_export_bus")
        .EUt(7)
        .duration(200)

    gtr.fuel_refining("gtceu:cetane_boosted_diesel")
        .itemInputs("16x gtceu:carbon_dust")
        .inputFluids("gtceu:hydrogen 10000", "gtceu:oxygen 5000", "gtceu:light_fuel 10000", "gtceu:heavy_fuel 2000", "gtceu:nitration_mixture 4000")
        .outputFluids("gtceu:cetane_boosted_diesel 18000")
        .EUt(GTValues.VA[GTValues.EV])
        .circuit(2)
        .duration(400)
        .blastFurnaceTemp(2200)

    gtr.fuel_refining("gtceu:cetane_boosted_diesel_b")
        .itemInputs("12x gtceu:carbon_dust")
        .inputFluids("gtceu:hydrogen 10000", "gtceu:oxygen 5000", "gtceu:bio_diesel 16000", "gtceu:nitration_mixture 4000")
        .outputFluids("gtceu:cetane_boosted_diesel 14000")
        .EUt(GTValues.VA[GTValues.EV])
        .circuit(3)
        .duration(600)
        .blastFurnaceTemp(2500)

    gtr.fuel_refining("gtceu:high_octane_gasoline")
        .itemInputs("44x gtceu:carbon_dust")
        .inputFluids("gtceu:oxygen 12000", "gtceu:nitrogen 8000", "gtceu:naphtha 16000", "gtceu:refinery_gas 2000", "gtceu:toluene 4000", "gtceu:octane 3000")
        .outputFluids("gtceu:high_octane_gasoline 50000")
        .circuit(4)
        .EUt(GTValues.VA[GTValues.IV])
        .duration(1200)
        .blastFurnaceTemp(4800)

    gtr.fuel_refining("gtceu:rocket_fuel")
        .itemInputs("8x gtceu:carbon_dust")
        .inputFluids("gtceu:hydrogen 32000", "gtceu:oxygen 14000", "gtceu:nitrogen 12000", "gtceu:chlorine 10000")
        .outputFluids("gtceu:rocket_fuel 36000")
        .EUt(GTValues.VA[GTValues.EV])
        .circuit(5)
        .duration(1600)
        .blastFurnaceTemp(2600)

    gtr.fuel_refining("gtceu:rocket_fuel_rp_1")
        .itemInputs("64x gtceu:carbon_dust")
        .inputFluids("gtceu:coal_gas 80000", "gtceu:oxygen 10000")
        .outputFluids("gtceu:rocket_fuel_rp_1 4000")
        .EUt(GTValues.VA[GTValues.EV])
        .circuit(6)
        .duration(1200)
        .blastFurnaceTemp(3800)

    gtr.fuel_refining("gtceu:dense_hydrazine_fuel_mixture")
        .itemInputs("32x gtceu:carbon_dust")
        .inputFluids("gtceu:hydrogen 12000", "gtceu:oxygen 8000", "gtceu:nitrogen 10000", "gtceu:hydrogen_peroxide 4000")
        .outputFluids("gtceu:dense_hydrazine_fuel_mixture 8000")
        .EUt(GTValues.VA[GTValues.EV])
        .circuit(7)
        .duration(800)
        .blastFurnaceTemp(3200)

    gtr.fuel_refining("gtceu:rocket_fuel_cn3h7o3")
        .circuit(1)
        .itemInputs("12x gtceu:carbon_dust")
        .inputFluids("gtceu:hydrogen 14000", "gtceu:nitrogen 6000", "gtceu:nitric_acid 3000", "gtceu:hydrogen_peroxide 2000")
        .outputFluids("gtceu:rocket_fuel_cn3h7o3 4000")
        .EUt(GTValues.VA[GTValues.IV])
        .duration(1200)
        .blastFurnaceTemp(3400)

    gtr.fuel_refining("gtceu:rocket_fuel_h8n4c2o4")
        .itemInputs("18x gtceu:carbon_dust")
        .inputFluids("gtceu:hydrogen 30000", "gtceu:nitrogen 18000", "gtceu:oxygen 24000")
        .outputFluids("gtceu:rocket_fuel_h8n4c2o4 12000")
        .EUt(GTValues.VA[GTValues.IV])
        .circuit(8)
        .duration(2000)
        .blastFurnaceTemp(5000)

    gtr.fuel_refining("ad_astra:cryo_fuel")
        .itemInputs("8x ad_astra:ice_shard", "60x gtceu:carbon_dust")
        .inputFluids("gtceu:hydrogen 42000", "gtceu:oxygen 20000", "gtceu:nitrogen 8000", "gtceu:heavy_fuel 1000", "gtceu:light_fuel 4000")
        .outputFluids("ad_astra:cryo_fuel 8000")
        .EUt(GTValues.VA[GTValues.LuV])
        .circuit(9)
        .duration(6400)
        .blastFurnaceTemp(10000)

    gtr.fuel_refining("gtceu:stellar_energy_rocket_fuel")
        .itemInputs("64x minecraft:fire_charge", "8x gtceu:hmxexplosive_dust", "4x gtceu:enriched_naquadah_dust")
        .inputFluids("gtceu:hydrogen_peroxide 8000", "gtceu:rocket_fuel_cn3h7o3 8000", "gtceu:dense_hydrazine_fuel_mixture 12000", "gtceu:rocket_fuel_rp_1 4000", "gtceu:nitration_mixture 4000", "gtceu:benzene 4000")
        .outputFluids("gtceu:stellar_energy_rocket_fuel 40000")
        .EUt(GTValues.VA[GTValues.IV])
        .duration(7200)
        .blastFurnaceTemp(14400)

    gtr.atomic_energy_excitation("gtceu:naquadah_fuel")
        .notConsumable("gtceu:orichalcum_nanoswarm")
        .itemInputs("16x gtceu:naquadah_dust")
        .inputFluids("gtceu:hydrogen 30000", "gtceu:nitrogen 15000", "gtceu:fluorine 8000", "gtceu:nitric_acid 8000")
        .outputFluids("gtceu:naquadah_fuel 20000")
        .EUt(GTValues.VA[GTValues.ZPM])
        .duration(4000)
        .blastFurnaceTemp(12000)

    gtr.atomic_energy_excitation("gtceu:enriched_naquadah_fuel")
        .notConsumable("gtceu:vibranium_nanoswarm")
        .notConsumableFluid("gtceu:caesium_fluoride 1000")
        .itemInputs("16x gtceu:enriched_naquadah_dust", "4x gtceu:antimony_dust")
        .inputFluids("gtceu:hydrogen 48000", "gtceu:nitrogen 30000", "gtceu:fluorine 12000", "gtceu:xenon 8000", "gtceu:radon 6000")
        .outputFluids("gtceu:enriched_naquadah_fuel 20000")
        .EUt(GTValues.VA[GTValues.UV])
        .duration(4000)
        .blastFurnaceTemp(12500)

    gtr.atomic_energy_excitation("gtceu:hyper_fuel_1")
        .itemInputs("14x gtceu:naquadria_dust", "20x gtceu:enriched_naquadah_dust", "40x gtceu:naquadah_dust")
        .inputFluids("gtceu:hydrogen 100000", "gtceu:nitrogen 76000", "gtceu:fluorine 10000", "gtceu:radon 2000", "gtceu:xenon 4000", "gtceu:thorium 4608")
        .outputFluids("gtceu:hyper_fuel_1 24000")
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(3800)
        .blastFurnaceTemp(13200)

    gtr.atomic_energy_excitation("gtceu:hyper_fuel_2")
        .itemInputs("4x gtceu:dubnium_dust", "6x gtceu:fermium_dust")
        .inputFluids("gtceu:hyper_fuel_1 6000", "gtceu:radon 40000", "gtceu:xenon 32000", "gtceu:thorium 3456", "gtceu:naquadria 864", "gtceu:uranium_235 2304")
        .outputFluids("gtceu:hyper_fuel_2 9600", "gtceu:hyper_fuel_1 500")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(4000)
        .blastFurnaceTemp(14000)

    gtr.atomic_energy_excitation("gtceu:hyper_fuel_3")
        .itemInputs("6x gtceu:lawrencium_dust", "8x gtceu:adamantine_dust")
        .inputFluids("gtceu:hyper_fuel_2 6000", "gtceu:naquadria 864", "gtceu:thorium 1728", "gtceu:fermium 5184", "gtceu:uranium_235 2304", "gtceu:plutonium_241 4608")
        .outputFluids("gtceu:hyper_fuel_3 12000", "gtceu:hyper_fuel_2 750")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(4000)
        .blastFurnaceTemp(15200)

    gtr.atomic_energy_excitation("gtceu:hyper_fuel_4")
        .itemInputs("8x gtceu:neutronium_dust", "12x gtceu:taranium_dust")
        .inputFluids("gtceu:hyper_fuel_3 6000", "gtceu:nobelium 8000", "gtceu:thorium 1728", "gtceu:fermium 2340", "gtceu:uranium_235 2304", "gtceu:plutonium_241 5184")
        .outputFluids("gtceu:hyper_fuel_4 16000", "gtceu:hyper_fuel_3 1000")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(4200)
        .blastFurnaceTemp(18000)

    gtr.atomic_energy_excitation("gtceu:concentration_mixing_hyper_fuel_1")
        .notConsumable("gtceu:white_dwarf_mtter_nanoswarm")
        .itemInputs("4x kubejs:resonating_gem", "16x gtceu:hassium_dust")
        .inputFluids("gtceu:hyper_fuel_4 8000", "gtceu:helium_plasma 6000", "gtceu:nickel_plasma 6000", "gtceu:oganesson 1152", "gtceu:naquadriatictaranium 2304", "gtceu:plutonium_241 864")
        .outputFluids("gtceu:concentration_mixing_hyper_fuel_1 12000", "gtceu:hyper_fuel_4 1500")
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(1200)
        .blastFurnaceTemp(18800)

    gtr.atomic_energy_excitation("gtceu:concentration_mixing_hyper_fuel_2")
        .notConsumable("gtceu:black_dwarf_mtter_nanoswarm")
        .itemInputs("16x gtceu:draconium_dust", "18x gtceu:starmetal_dust")
        .inputFluids("gtceu:concentration_mixing_hyper_fuel_1 6000", "gtceu:cosmic_element 60000", "gtceu:oxygen_plasma 6000", "gtceu:argon_plasma 6000", "gtceu:iron_plasma 6000", "gtceu:nitrogen_plasma 6000")
        .outputFluids("gtceu:concentration_mixing_hyper_fuel_2 12000", "gtceu:concentration_mixing_hyper_fuel_1 2000")
        .EUt(GTValues.VA[GTValues.OpV])
        .duration(2400)
        .blastFurnaceTemp(21000)

    gtr.assembler("gtceu:advanced_integrated_ore_processor")
        .itemInputs("16x gtceu:integrated_ore_processor", "64x gtceu:crushing_wheels", "32x #gtceu:circuits/uiv", "16x gtceu:uiv_robot_arm", "32x gtceu:uiv_conveyor_module", "8x gtceu:uiv_electric_pump", "8x gtceu:uiv_emitter", "64x gtceu:double_dalisenite_plate", "64x gtceu:double_dalisenite_plate")
        .inputFluids("gtceu:inconel_792 82944")
        .itemOutputs("gtceu:advanced_integrated_ore_processor")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(800)

    gtr.dehydrator("gtceu:polyimide")
        .inputFluids("gtceu:paa 144")
        .outputFluids("gtceu:polyimide 144")
        .EUt(30)
        .duration(270)

    gtr.dehydrator("gtceu:stearic_acid")
        .inputFluids("gtceu:deglycerated_soap 1000")
        .outputFluids("gtceu:stearic_acid 800")
        .itemOutputs("gtceu:salt_dust")
        .EUt(2000)
        .duration(160)

    gtr.dehydrator("gtceu:tungsten_trioxide_dust")
        .itemInputs("7x gtceu:tungstic_acid_dust")
        .itemOutputs("4x gtceu:tungsten_trioxide_dust")
        .EUt(120)
        .duration(150)

    gtr.dehydrator("gtceu:silica_gel_dust")
        .inputFluids("gtceu:silica_gel_base 1000")
        .itemOutputs("3x gtceu:silica_gel_dust", "2x gtceu:salt_dust")
        .EUt(480)
        .duration(130)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.dehydrator("gtceu:salt_dust")
        .inputFluids("gtceu:salt_water 1000")
        .itemOutputs("2x gtceu:salt_dust")
        .EUt(30)
        .duration(160)

    gtr.chemical_reactor("gtceu:tungsten_dust")
        .inputFluids("gtceu:hydrogen 6000")
        .itemInputs("4x gtceu:tungsten_trioxide_dust")
        .outputFluids("minecraft:water 3000")
        .itemOutputs("gtceu:tungsten_dust")
        .EUt(120)
        .duration(60)

    gtr.chemical_reactor("gtceu:tungsten_trioxide_dust")
        .itemInputs("2x gtceu:tungsten_carbide_dust")
        .inputFluids("gtceu:oxygen 4000")
        .itemOutputs("4x gtceu:tungsten_trioxide_dust")
        .outputFluids("gtceu:carbon_monoxide 1000")
        .EUt(480)
        .duration(200)

    gtr.electric_blast_furnace("gtceu:cadmium_tungstate_dust")
        .itemInputs("4x gtceu:tungsten_trioxide_dust", "2x gtceu:cadmium_sulfide_dust")
        .inputFluids("gtceu:oxygen 3000")
        .itemOutputs("6x gtceu:cadmium_tungstate_dust")
        .outputFluids("gtceu:sulfur_dioxide 1000")
        .EUt(120)
        .duration(320)
        .blastFurnaceTemp(2800)

    gtr.alloy_smelter("gtceu:cadmium_sulfide_dust")
        .itemInputs("1x gtceu:cadmium_dust", "1x gtceu:sulfur_dust")
        .itemOutputs("2x gtceu:cadmium_sulfide_dust")
        .EUt(30)
        .duration(2400)

    gtr.electric_blast_furnace("gtceu:bismuth_germanate_dust")
        .itemInputs("3x gtceu:germanium_dioxide_dust")
        .inputFluids("gtceu:bismuth_nitrate_solution 4000")
        .itemOutputs("33x gtceu:bismuth_germanate_dust")
        .outputFluids("gtceu:nitrogen_dioxide 12000")
        .EUt(5000000)
        .duration(80)
        .blastFurnaceTemp(7600)

    gtr.chemical_reactor("gtceu:germanium_dioxide_dust")
        .itemInputs("gtceu:germanium_dust")
        .inputFluids("gtceu:oxygen 2000")
        .itemOutputs("3x gtceu:germanium_dioxide_dust")
        .EUt(120)
        .duration(400)

    gtr.large_chemical_reactor("gtceu:bismuth_nitrate_solution")
        .itemInputs("gtceu:bismuth_dust")
        .inputFluids("gtceu:nitric_acid 6000")
        .outputFluids("gtceu:bismuth_nitrate_solution 1000", "gtceu:nitrogen_dioxide 3000", "minecraft:water 2000")
        .EUt(30)
        .duration(350)

    gtr.assembler("gtlcore:advanced_stellar_containment_casing")
        .itemInputs("gtlcore:stellar_containment_casing", "gtceu:uhv_field_generator", "8x gtceu:vibranium_screw", "gtceu:enderite_octal_wire", "4x gtceu:taranium_plate")
        .itemOutputs("gtlcore:advanced_stellar_containment_casing")
        .inputFluids("gtceu:astraltitanium 144")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(280)

    gtr.assembler("gtlcore:ultimate_stellar_containment_casing")
        .itemInputs("gtlcore:advanced_stellar_containment_casing", "gtceu:uev_field_generator", "8x gtceu:vibramantium_screw", "gtceu:legendarium_quadruple_wire", "8x gtceu:heavy_quark_degenerate_matter_plate")
        .itemOutputs("gtlcore:ultimate_stellar_containment_casing")
        .inputFluids("gtceu:celestialtungsten 144")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(460)
})
