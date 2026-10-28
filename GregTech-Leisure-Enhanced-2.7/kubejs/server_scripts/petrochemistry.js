// priority: 95
// 石油化工、水处理、稀土分离和配套材料。
// 由 gtceu.js 按既有阶段顺序执行，本文件只登记配方，不依赖文件名排序。
global.gtlPack.register("petrochemistry", event => {
    const gtr = event.recipes.gtceu;
    const batch = global.gtlPack.batch;

    batch(gtr, "petrochemical_plant", ["inputFluids", "outputFluids", ["EUt", 1920], ["duration", 200]], [
        ["gtceu:petrochemical_plant_2", ["gtceu:oil_medium 1000", "gtceu:steam 1000"],
            ["gtceu:toluene 40", "gtceu:benzene 200", "gtceu:octane 30", "gtceu:butane 70", "gtceu:butene 100", "gtceu:butadiene 100",
                "gtceu:propane 30", "gtceu:propene 600", "gtceu:ethane 130", "gtceu:ethylene 1000", "gtceu:methane 1000", "gtceu:helium 10"]],
        ["gtceu:petrochemical_plant_3", ["gtceu:oil_heavy 1000", "gtceu:steam 1000"],
            ["gtceu:toluene 240", "gtceu:benzene 1200", "gtceu:octane 20", "gtceu:butane 60", "gtceu:butene 240", "gtceu:butadiene 150",
                "gtceu:propane 30", "gtceu:propene 300", "gtceu:ethane 45", "gtceu:ethylene 450", "gtceu:methane 450", "gtceu:helium 10"]],
        ["gtceu:petrochemical_plant_4", ["gtceu:oil_light 1000", "gtceu:steam 1000"],
            ["gtceu:toluene 20", "gtceu:benzene 100", "gtceu:octane 20", "gtceu:butane 120", "gtceu:butene 80", "gtceu:butadiene 80",
                "gtceu:propane 140", "gtceu:propene 90", "gtceu:ethane 200", "gtceu:ethylene 250", "gtceu:methane 2000", "gtceu:helium 40"]]
    ]);

    gtr.chemical_bath("gtceu:naquadria_sulfate_dust")
        .itemInputs("6x gtceu:sodium_dust").inputFluids("gtceu:acidic_naquadria_caesiumfluoride 3000")
        .itemOutputs("6x gtceu:naquadria_sulfate_dust", "2x gtceu:trinium_sulfide_dust", "8x gtceu:sodium_fluoride_dust", "7x gtceu:sodium_sulfate_dust")
        .chancedOutput("gtceu:caesium_dust", 8000, 500).EUt(120).duration(200)

    gtr.compressor("gtceu:dimensionally_transcendent_steam_oven")
        .itemInputs("16x gtceu:steam_oven").itemOutputs("gtceu:dimensionally_transcendent_steam_oven").EUt(16).duration(1200)

    gtr.assembler("gtceu:slaughterhouse")
        .itemInputs("gtceu:steel_frame", "gtceu:lv_world_accelerator", "4x #gtceu:circuits/lv", "8x gtceu:lv_electric_motor", "4x gtceu:lv_robot_arm",
            "8x gtceu:invar_gear", "2x gtceu:diamond_grinding_head", "4x gtceu:double_steel_plate")
        .itemOutputs("gtceu:slaughterhouse").EUt(30).duration(400)

    gtr.assembly_line("gtceu:holy_separator")
        .itemInputs("4x gtceu:uhv_macerator", "4x gtceu:uhv_cutter", "4x gtceu:uhv_lathe", "4x gtceu:uhv_centrifuge", "16x gtceu:uev_robot_arm",
            "8x #gtceu:circuits/uiv", "8x gtceu:neutronium_gear", "64x gtceu:small_rhodium_plated_palladium_gear",
            "32x gtceu:long_orichalcum_rod", "16x gtceu:osmiridium_huge_restrictive_item_pipe", "16x gtceu:naquadria_plate")
        .inputFluids("gtceu:mutated_living_solder 1440", "gtceu:dysprosium 2880", "gtceu:rhodium 2880", "gtceu:moscovium 2880")
        .itemOutputs("gtceu:holy_separator").duration(1000).EUt(GTValues.VA[GTValues.UEV])
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:large_cutter")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(GTValues.VA[GTValues.UEV]).CWUt(256))

    gtr.large_chemical_reactor("gtceu:mutated_living_solder")
        .notConsumable("gtceu:gravi_star").itemInputs("16x kubejs:biological_cells", "gtceu:quantum_star")
        .inputFluids("gtceu:helium_plasma 2000", "gtceu:oxygen_plasma 2000", "gtceu:tin 2000", "gtceu:carbon 2000", "gtceu:beryllium 2000")
        .outputFluids("gtceu:mutated_living_solder 2000").itemOutputs("4x gtceu:tiny_nether_star_dust").EUt(GTValues.VA[GTValues.UV])
        .duration(1200)

    gtr.autoclave("gtceu:super_mutated_living_solder")
        .inputFluids("gtceu:mutated_living_solder 10000").itemInputs("64x kubejs:space_essence", "64x kubejs:draconium_dust")
        .outputFluids("gtceu:super_mutated_living_solder 10000").itemOutputs("kubejs:essence_block").EUt(GTValues.VA[GTValues.UEV])
        .duration(2400)

    gtr.evaporation("gtceu:salt_water")
        .inputFluids("minecraft:water 50000").outputFluids("gtceu:salt_water 1000").EUt(30).duration(600)

    gtr.centrifuge("gtceu:grade_1_purified_water")
        .inputFluids("minecraft:water 1000").chancedOutput("gtceu:small_stone_dust", 5000, 0).chancedOutput("gtceu:small_clay_dust", 2000, 0)
        .chancedOutput("gtceu:small_calcite_dust", 1000, 0).chancedOutput("gtceu:small_salt_dust", 1000, 0)
        .chancedOutput("gtceu:polyethylene_nugget", 100, 0).outputFluids("gtceu:grade_1_purified_water 900").EUt(1920).duration(200)

    gtr.fluid_heater("gtceu:grade_2_purified_water")
        .inputFluids("gtceu:grade_1_purified_water 1000").outputFluids("gtceu:grade_2_purified_water 900").EUt(7680).duration(200)

    gtr.distillation_tower("gtceu:grade_3_purified_water")
        .inputFluids("gtceu:grade_2_purified_water 1000").outputFluids("gtceu:grade_3_purified_water 900")
        .outputFluids("gtceu:grade_2_purified_water 50").outputFluids("gtceu:grade_1_purified_water 50").outputFluids("gtceu:oil 10")
        .outputFluids("gtceu:ammonia 10").EUt(1920).duration(200).disableDistilleryRecipes(true)

    gtr.chemical_bath("gtceu:grade_4_purified_water")
        .itemInputs("64x gtceu:activated_carbon_dust").inputFluids("gtceu:grade_3_purified_water 1000").itemOutputs("64x gtceu:carbon_dust")
        .outputFluids("gtceu:grade_4_purified_water 950").EUt(480).duration(600)

    gtr.chemical_reactor("gtceu:grade_5_purified_water")
        .inputFluids("gtceu:grade_4_purified_water 1000").notConsumable("gtceu:exquisite_cubic_zirconia_gem")
        .outputFluids("gtceu:grade_5_purified_water 990").outputFluids("gtceu:steam 1000").EUt(122880).duration(200)

    gtr.electric_blast_furnace("gtceu:grade_6_purified_water")
        .notConsumable("gtceu:luv_fluid_regulator").inputFluids("gtceu:grade_5_purified_water 1000")
        .outputFluids("gtceu:grade_6_purified_water 900").chancedOutput("gtceu:tiny_ammonium_chloride_dust", 500, 0).EUt(122880).duration(80)
        .blastFurnaceTemp(6740)

    gtr.evaporation("gtceu:grade_7_purified_water")
        .inputFluids("gtceu:grade_6_purified_water 1000000").outputFluids("gtceu:grade_7_purified_water 900000")
        .outputFluids("gtceu:grade_6_purified_water 50000").outputFluids("gtceu:grade_5_purified_water 20000")
        .outputFluids("gtceu:acetic_acid 20").outputFluids("gtceu:ethanol 40").EUt(524288).duration(4000)

    gtr.brewery("gtceu:grade_8_purified_water")
        .inputFluids("gtceu:grade_7_purified_water 1000").notConsumable("gtceu:neutronium_dust")
        .outputFluids("gtceu:grade_8_purified_water 1000").EUt(122880).duration(200)

    gtr.mixer("gtceu:grade_9_purified_water")
        .inputFluids("gtceu:grade_8_purified_water 1000", "gtceu:liquid_oxygen 1000").itemInputs("minecraft:blaze_powder")
        .outputFluids("gtceu:grade_9_purified_water 900").itemOutputs("gtceu:dark_ash_dust").EUt(524288).duration(600)

    gtr.distillery("gtceu:grade_10_purified_water")
        .inputFluids("gtceu:grade_9_purified_water 1000").itemInputs("minecraft:echo_shard").outputFluids("gtceu:grade_10_purified_water 900")
        .itemOutputs("9x gtceu:tiny_echo_shard_dust").EUt(GTValues.VA[GTValues.UHV]).duration(200)

    gtr.large_chemical_reactor("gtceu:grade_11_purified_water")
        .notConsumable("kubejs:fullerene_polymer_matrix_soft_tubing").notConsumable("kubejs:electron_source")
        .itemInputs("64x gtceu:carbon_nanotubes_dust").inputFluids("gtceu:grade_10_purified_water 1000")
        .itemOutputs("576x gtceu:carbon_nanotubes_nugget").outputFluids("gtceu:grade_11_purified_water 900").EUt(GTValues.VA[GTValues.UEV])
        .duration(200)

    gtr.evaporation("gtceu:grade_12_purified_water")
        .inputFluids("gtceu:grade_11_purified_water 10000000").itemOutputs("gtceu:tiny_neutronium_dust")
        .outputFluids("gtceu:grade_12_purified_water 9999000").outputFluids("gtceu:helium_3 100").EUt(GTValues.VA[GTValues.UHV]).duration(2000)

    gtr.arc_furnace("gtceu:grade_13_purified_water")
        .inputFluids("gtceu:grade_12_purified_water 10000").itemInputs("gtceu:degenerate_rhenium_dust")
        .itemOutputs("gtceu:degenerate_rhenium_plate").outputFluids("gtceu:grade_13_purified_water 9990").EUt(GTValues.VA[GTValues.UIV])
        .duration(60)

    batch(gtr, "plasma_condenser", ["notConsumable", "inputFluids", "itemOutputs", "outputFluids", "EUt", ["duration", 800]], [
        ["gtceu:grade_14_purified_water", ["gtceu:uhv_fluid_regulator"], ["gtceu:grade_13_purified_water 10000", "gtceu:mithril_plasma 1000"],
            ["60x gtceu:tiny_mithril_dust"], ["gtceu:grade_14_purified_water 9900"], [GTValues.VA[GTValues.UHV]]],
        ["gtceu:grade_15_purified_water", ["gtceu:uev_fluid_regulator"], ["gtceu:grade_14_purified_water 10000", "gtceu:enderium_plasma 1000"],
            ["61x gtceu:tiny_enderium_dust"], ["gtceu:grade_15_purified_water 9990"], [GTValues.VA[GTValues.UEV]]],
        ["gtceu:grade_16_purified_water", ["gtceu:uiv_fluid_regulator"], ["gtceu:grade_15_purified_water 10000", "gtceu:echoite_plasma 1000"],
            ["62x gtceu:tiny_echoite_dust"], ["gtceu:grade_16_purified_water 9999"], [GTValues.VA[GTValues.UIV]]]
    ]);

    batch(gtr, "precision_assembler", ["itemInputs", "inputFluids", "itemOutputs", "EUt", "duration", "cleanroom"], [
        ["gtlcore:power_core",
            ["4x gtlcore:power_module", "8x gtceu:uv_field_generator", "64x gtceu:gravitation_engine_unit", "16x gtceu:double_naquadria_plate"],
            ["gtceu:rhodium 2880", "gtceu:americium 2880", "gtceu:enriched_naquadah 2880", "gtceu:trinium 2880"], ["gtlcore:power_core"],
            [GTValues.VA[GTValues.UV]], [2400], [CleanroomType.CLEANROOM]],
        ["kubejs:dyson_swarm_module", ["16x gtceu:enriched_naquadah_frame", "64x gtceu:solar_panel", "gtceu:uev_sensor", "gtceu:uev_emitter"],
            ["gtceu:mutated_living_solder 20000", "kubejs:gelid_cryotheum 20000", "gtceu:neutronium 18432", "gtceu:orichalcum 18432"],
            ["64x kubejs:dyson_swarm_module"], [GTValues.VA[GTValues.UIV]], [800], [GTLCleanroomType.LAW_CLEANROOM]],
        ["kubejs:dyson_control_casing",
            ["gtceu:uiv_machine_hull", "kubejs:exotic_processing_core", "#gtceu:circuits/uiv", "gtceu:high_performance_computation_array"],
            ["gtceu:mutated_living_solder 576", "gtceu:pcb_coolant 2000", "gtceu:ruthenium 2304", "gtceu:naquadah 1296"],
            ["kubejs:dyson_control_casing"], [GTValues.VA[GTValues.UEV]], [400], [CleanroomType.CLEANROOM]],
        ["kubejs:dyson_receiver_casing", ["gtceu:uiv_charger_4x", "2x kubejs:pm_chip", "4x kubejs:uiv_voltage_coil", "gtceu:echoite_quadruple_wire"],
            ["gtceu:mutated_living_solder 1296", "kubejs:gelid_cryotheum 576", "gtceu:echo_shard 2304", "gtceu:infuscolium 1296"],
            ["kubejs:dyson_receiver_casing"], [GTValues.VA[GTValues.UEV]], [400], [CleanroomType.CLEANROOM]]
    ]);

    gtr.assembly_line("kubejs:dyson_deployment_core")
        .itemInputs("4x gtceu:uiv_machine_hull", "32x gtceu:uiv_conveyor_module", "32x gtceu:uiv_robot_arm", "32x gtceu:uiv_electric_piston",
            "64x minecraft:dispenser", "64x minecraft:dispenser", "64x minecraft:dispenser", "64x minecraft:dispenser")
        .inputFluids("gtceu:lubricant 48000", "gtceu:mutated_living_solder 12800", "kubejs:gelid_cryotheum 128000", "gtceu:copernicium 256000")
        .itemOutputs("kubejs:dyson_deployment_core").EUt(GTValues.VA[GTValues.UIV]).duration(1200)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtlcore:power_core")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(GTValues.VA[GTValues.UIV]).CWUt(512))

    gtr.assembly_line("gtceu:dyson_sphere")
        .itemInputs("4x gtceu:uiv_diode", "16x kubejs:pm_wafer", "16x gtceu:uiv_sensor", "4x kubejs:dyson_control_toroid", "64x gtceu:superconducting_coil",
            "16x #gtceu:circuits/uxv", "32x gtceu:echoite_hex_wire", "4x kubejs:uxv_voltage_coil", "16x gtceu:double_vibranium_plate")
        .inputFluids("gtceu:mutated_living_solder 12000", "kubejs:gelid_cryotheum 12800", "gtceu:scandium 576000",
            "gtceu:mercury_barium_calcium_cuprate 576000")
        .itemOutputs("gtceu:dyson_sphere").EUt(GTValues.VA[GTValues.UIV]).duration(1600)
        .stationResearch(b => b.researchStack(Registries.getItemStack("kubejs:dyson_receiver_casing")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(GTValues.VA[GTValues.UIV]).CWUt(512))

    gtr.assembly_line("kubejs:dyson_deployment_casing")
        .itemInputs("gtceu:uiv_diode", "4x gtceu:uiv_sensor", "2x gtceu:uiv_electric_pump", "gtceu:uhv_quantum_tank", "gtceu:uiv_conveyor_module",
            "4x gtceu:double_darmstadtium_plate")
        .inputFluids("gtceu:mutated_living_solder 1000", "kubejs:gelid_cryotheum 1000", "gtceu:lubricant 2000", "gtceu:copernicium 1296")
        .itemOutputs("kubejs:dyson_deployment_casing").EUt(GTValues.VA[GTValues.UIV]).duration(600)
        .stationResearch(b => b.researchStack(Registries.getItemStack("kubejs:module_connector")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(GTValues.VA[GTValues.UIV]).CWUt(512))

    gtr.assembly_line("kubejs:dyson_control_toroid")
        .itemInputs("gtceu:black_titanium_frame", "4x gtceu:uiv_emitter", "2x gtceu:uiv_electric_pump", "2x #gtceu:circuits/uiv",
            "kubejs:exotic_processing_core", "8x gtceu:infuscolium_bolt", "24x gtceu:neutronium_foil")
        .inputFluids("gtceu:mutated_living_solder 2000", "kubejs:gelid_cryotheum 1000", "gtceu:zylon 1296", "gtceu:kevlar 1296")
        .itemOutputs("kubejs:dyson_control_toroid").EUt(GTValues.VA[GTValues.UIV]).duration(800)
        .stationResearch(b => b.researchStack(Registries.getItemStack("kubejs:spacetime_assembly_line_unit")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(GTValues.VA[GTValues.UIV]).CWUt(512))

    gtr.assembly_line("kubejs:restraint_device")
        .itemInputs("2x kubejs:hollow_casing", "2x kubejs:force_field_glass", "6x kubejs:laser_cooling_unit", "8x gtceu:double_titansteel_plate",
            "24x gtceu:double_plutonium_241_plate", "16x gtceu:double_quantanium_plate")
        .inputFluids("gtceu:soldering_alloy 2304", "gtceu:lubricant 2000", "gtceu:mutated_living_solder 1000", "gtceu:highurabilityompoundteel 576")
        .itemOutputs("kubejs:restraint_device").EUt(GTValues.VA[GTValues.UHV]).duration(1600)
        .stationResearch(b => b.researchStack(Registries.getItemStack("kubejs:containment_field_generator")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(GTValues.VA[GTValues.UHV]).CWUt(512))

    gtr.assembly_line("gtceu:atomic_energy_excitation_plant")
        .itemInputs("8x gtceu:uev_mixer", "8x gtceu:uev_centrifuge", "16x gtceu:uev_chemical_reactor", "8x #gtceu:circuits/uiv",
            "12x gtceu:double_adamantine_plate", "16x gtceu:double_highurabilityompoundteel_plate", "16x gtceu:double_enderite_plate",
            "4x kubejs:reinforced_echo_shard")
        .inputFluids("gtceu:lubricant 8000", "gtceu:mutated_living_solder 2000", "gtceu:echoite 1152", "gtceu:mana 32000")
        .itemOutputs("gtceu:atomic_energy_excitation_plant").EUt(GTValues.VA[GTValues.UIV]).duration(4000)
        .stationResearch(b => b.researchStack(Registries.getItemStack("kubejs:restraint_device")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(GTValues.VA[GTValues.UIV]).CWUt(512))

    batch(gtr, "super_particle_collider", ["inputFluids", "outputFluids", ["EUt", GTValues.VA[GTValues.UV]], ["duration", 200]], [
        ["gtceu:positive_electron", ["gtceu:phosphorus 200", "gtceu:lithium 200"], ["gtceu:positive_electron 100"]],
        ["gtceu:antiproton", ["gtceu:liquid_hydrogen 1000", "gtceu:helium_plasma 200"], ["gtceu:antiproton 100"]],
        ["gtceu:antineutron", ["gtceu:positive_electron 100", "gtceu:antiproton 100"], ["gtceu:antineutron 2"]],
        ["gtceu:antimatter", ["gtceu:antihydrogen 2000", "gtceu:antineutron 2000"], ["gtceu:antimatter 100"]]
    ]);

    gtr.mixer("gtceu:antihydrogen")
        .inputFluids("gtceu:positive_electron 200", "gtceu:antiproton 200").notConsumable("gtceu:uv_field_generator")
        .outputFluids("gtceu:antihydrogen 200").EUt(GTValues.VA[GTValues.UV]).duration(400)

    gtr.fluid_solidifier("kubejs:pellet_antimatter")
        .inputFluids("gtceu:antimatter 1000").notConsumable("kubejs:ball_field_shape").itemOutputs("kubejs:pellet_antimatter")
        .EUt(GTValues.VA[GTValues.UV]).duration(800)

    gtr.ultimate_material_forge("kubejs:pellet_antimatter")
        .inputFluids("gtceu:uu_matter 1000", "gtceu:antihydrogen 10").itemInputs("64x ae2:matter_ball", "gtceu:neutronium_nugget")
        .itemOutputs("kubejs:pellet_antimatter").chancedOutput("kubejs:void_matter", 100, 0).EUt(GTValues.VA[GTValues.UXV]).duration(2000)

    batch(gtr, "ultimate_material_forge", ["itemInputs", "inputFluids", "itemOutputs", "chancedOutput", "EUt", "duration"], [
        ["kubejs:corporeal_matter", ["kubejs:proto_matter", "minecraft:iron_block"], ["gtceu:uu_matter 1000", "gtceu:nihonium 100"],
            ["kubejs:corporeal_matter"], ["gtceu:heavy_quark_degenerate_matter_nugget", 500, 0], [GTValues.VA[GTValues.OpV]], [800]],
        ["kubejs:kinetic_matter", ["kubejs:corporeal_matter", "gtceu:tritanium_block"], ["gtceu:uu_matter 1000", "gtceu:naquadria 1000"],
            ["kubejs:kinetic_matter"], ["kubejs:amorphous_matter", 200, 0], [GTValues.VA[GTValues.OpV]], [600]],
        ["kubejs:amorphous_matter", ["kubejs:corporeal_matter", "gtceu:carbon_nanotubes_block"], ["gtceu:uu_matter 1000", "gtceu:legendarium 1000"],
            ["kubejs:amorphous_matter"], ["kubejs:essentia_matter", 100, 0], [GTValues.VA[GTValues.OpV]], [800]],
        ["kubejs:essentia_matter", ["kubejs:amorphous_matter", "gtceu:heavy_quark_degenerate_matter_block"],
            ["gtceu:uu_matter 1000", "gtceu:quantumchromodynamically_confined_matter 1000"], ["kubejs:essentia_matter"],
            ["kubejs:dark_matter", 100, 0], [GTValues.VA[GTValues.OpV]], [1200]],
        ["kubejs:omni_matter", ["kubejs:essentia_matter", "kubejs:kinetic_matter"], ["gtceu:uu_matter 1000", "gtceu:dense_neutron_plasma 1000"],
            ["kubejs:omni_matter"], ["gtceu:tiny_cosmicneutronium_dust", 1000, 0], [GTValues.VA[GTValues.MAX]], [800]],
        ["kubejs:void_matter", ["kubejs:omni_matter", "kubejs:pellet_antimatter"], ["gtceu:uu_matter 2000", "gtceu:gluons 1000"],
            ["kubejs:void_matter"], ["kubejs:corporeal_matter", 2000, 0], [GTValues.VA[GTValues.MAX]], [400]]
    ]);

    gtr.ultimate_material_forge("kubejs:temporal_matter")
        .notConsumable("kubejs:quantum_anomaly").itemInputs("kubejs:kinetic_matter")
        .inputFluids("gtceu:uu_matter 1000", "gtceu:draconiumawakened_plasma 1000").itemOutputs("kubejs:temporal_matter")
        .chancedOutput("kubejs:omni_matter", 500, 0).EUt(GTValues.VA[GTValues.MAX]).duration(600)

    gtr.ultimate_material_forge("kubejs:dark_matter")
        .itemInputs("kubejs:temporal_matter", "kubejs:void_matter")
        .inputFluids("gtceu:uu_matter 3000", "gtceu:dimensionallytranscendentcrudecatalyst 1000").itemOutputs("kubejs:dark_matter")
        .chancedOutput("kubejs:kinetic_matter", 1000, 0).EUt(GTValues.VA[GTValues.MAX]).duration(1200)

    gtr.assembler("kubejs:dyson_deployment_magnet")
        .itemInputs("gtceu:uiv_energy_output_hatch", "4x gtceu:superconducting_coil", "8x kubejs:pm_chip", "4x #gtceu:circuits/uiv",
            "6x gtceu:neutronium_plate")
        .itemOutputs("kubejs:dyson_deployment_magnet").inputFluids("gtceu:mutated_living_solder 1296").EUt(GTValues.VA[GTValues.UIV])
        .duration(600)

    gtr.assembler("gtlcore:sps_casing")
        .itemInputs("gtceu:zylon_block", "kubejs:restraint_device", "4x #gtceu:circuits/uev", "4x gtceu:small_quantanium_gear", "gtceu:neutronium_hex_cable",
            "32x gtceu:polyetheretherketone_foil")
        .inputFluids("gtceu:mutated_living_solder 576").itemOutputs("gtlcore:sps_casing").EUt(GTValues.VA[GTValues.UEV]).duration(800)

    batch(gtr, "aggregation_device", ["notConsumable", "itemInputs", "itemOutputs", "EUt", ["duration", 400], ["fusionStartEU", 4800000000]], [
        ["kubejs:draconic_core", ["kubejs:stabilizer_core"],
            ["kubejs:draconium_dust", "gtceu:zpm_field_generator", "gtceu:lapotronic_energy_orb", "gtceu:mithril_block",
                "gtceu:hexanitrohexaaxaisowurtzitane_dust", "gtceu:uv_field_generator", "minecraft:nether_star", "gtceu:enderium_block"],
            ["2x kubejs:draconic_core"], [GTValues.VA[GTValues.UEV]]],
        ["kubejs:wyvern_core", ["kubejs:stabilizer_core"],
            ["kubejs:draconium_dust", "gtceu:uhv_field_generator", "gtceu:quantum_eye", "gtceu:adamantine_block", "kubejs:draconic_core",
                "gtceu:uev_field_generator", "gtceu:quantum_star", "gtceu:orichalcum_block"], ["2x kubejs:wyvern_core"], [GTValues.VA[GTValues.UIV]]],
        ["kubejs:awakened_core", ["kubejs:dragon_stabilizer_core"],
            ["gtceu:draconium_dust", "gtceu:uiv_field_generator", "kubejs:dragon_heart", "gtceu:vibranium_block", "kubejs:wyvern_core",
                "gtceu:uxv_field_generator", "gtceu:gravi_star", "gtceu:taranium_block"], ["2x kubejs:awakened_core"], [GTValues.VA[GTValues.UXV]]],
        ["kubejs:chaotic_core", ["kubejs:dragon_stabilizer_core"],
            ["gtceu:draconium_nanoswarm", "gtceu:opv_field_generator", "kubejs:chaos_shard", "gtceu:legendarium_block", "kubejs:awakened_core",
                "gtlcore:max_field_generator", "kubejs:unstable_star", "gtceu:draconiumawakened_block"], ["2x kubejs:chaotic_core"],
            [GTValues.VA[GTValues.OpV]]]
    ]);

    gtr.distillery("gtceu:kerosene")
        .itemInputs("gtceu:coke_dust").inputFluids("gtceu:coal_tar 200").outputFluids("gtceu:kerosene 100").itemOutputs("gtceu:dark_ash_dust")
        .EUt(120).duration(30)

    gtr.distillery("gtceu:rp_1")
        .circuit(1).inputFluids("gtceu:kerosene 50").outputFluids("gtceu:rp_1 25").EUt(120).duration(16)

    gtr.mixer("gtceu:rocket_fuel_rp_1")
        .inputFluids("gtceu:rp_1 1000", "gtceu:liquid_oxygen 1000").outputFluids("gtceu:rocket_fuel_rp_1 1000").EUt(1920).duration(16)

    gtr.large_chemical_reactor("gtceu:hydrazine")
        .inputFluids("gtceu:hydrogen_peroxide 1000", "gtceu:ammonia 2000").outputFluids("gtceu:hydrazine 1000", "minecraft:water 1000").EUt(30)
        .duration(320)

    batch(gtr, "mixer", ["inputFluids", "outputFluids", "EUt", "duration"], [
        ["gtceu:dense_hydrazine_fuel_mixture", ["gtceu:hydrazine 1000", "gtceu:methanol 1000"], ["gtceu:dense_hydrazine_fuel_mixture 1000"], [240],
            [320]],
        ["gtceu:rocket_fuel_h8n4c2o4", ["gtceu:dimethylhydrazine 1000", "gtceu:dinitrogen_tetroxide 1000"], ["gtceu:rocket_fuel_h8n4c2o4 1000"],
            [1920], [480]],
        ["gtceu:rocket_fuel_cn3h7o3", ["gtceu:monomethylhydrazine 1000", "gtceu:nitric_acid 1000"], ["gtceu:rocket_fuel_cn3h7o3 1000"], [1920], [200]]
    ]);

    gtr.dehydrator("gtceu:monomethylhydrazine")
        .inputFluids("gtceu:hydrazine 1000", "gtceu:hydrogen 2000").itemInputs("gtceu:carbon_dust")
        .outputFluids("gtceu:monomethylhydrazine 1000").EUt(240).duration(240)

    gtr.mixer("ad_astra:cryo_fuel")
        .itemInputs("16x ad_astra:ice_shard").inputFluids("gtceu:cetane_boosted_diesel 1000", "gtceu:explosivehydrazine 1000")
        .outputFluids("ad_astra:cryo_fuel 1000").EUt(7680).duration(320)

    gtr.mixer("gtceu:explosivehydrazine")
        .inputFluids("gtceu:glyceryl_trinitrate 1000", "gtceu:dense_hydrazine_fuel_mixture 3000").notConsumable("gtceu:luv_field_generator")
        .itemInputs("16x gtceu:gelled_toluene", "8x minecraft:fire_charge").outputFluids("gtceu:explosivehydrazine 4000").EUt(1920).duration(480)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.large_chemical_reactor("gtceu:stellar_energy_rocket_fuel")
        .itemInputs("gtceu:enriched_naquadah_dust")
        .inputFluids("gtceu:rocket_fuel_cn3h7o3 2000", "gtceu:explosivehydrazine 3000", "gtceu:nitrobenzene 8000", "gtceu:dinitrogen_tetroxide 6000",
            "gtceu:kerosene 4000")
        .itemInputs("2x gtceu:hmxexplosive_dust").itemOutputs("gtceu:naquadah_dust").outputFluids("gtceu:stellar_energy_rocket_fuel 5000")
        .EUt(122880).duration(120).cleanroom(CleanroomType.STERILE_CLEANROOM)

    gtr.chemical_reactor("gtceu:hmxexplosive_dust")
        .notConsumableFluid("gtceu:acetic_anhydride 1000").inputFluids("gtceu:fuming_nitric_acid 2000")
        .itemInputs("22x gtceu:hexamethylenetetramine_dust").itemOutputs("gtceu:hmxexplosive_dust").EUt(1024).duration(20)

    gtr.chemical_reactor("gtceu:fuming_nitric_acid")
        .inputFluids("gtceu:nitrogen_dioxide 1000", "gtceu:nitric_acid 1000").outputFluids("gtceu:fuming_nitric_acid 1000").EUt(120)
        .duration(200)

    batch(gtr, "lightning_processor", ["itemInputs", "inputFluids", "outputFluids", "EUt", "duration"], [
        ["gtceu:nether_air", ["64x minecraft:gunpowder"],
            ["gtceu:blaze 1000", "gtceu:hydrogen_sulfide 10000", "gtceu:sulfur_dioxide 10000", "gtceu:carbon_monoxide 10000", "gtceu:coal_gas 1000",
                "gtceu:helium 1000"], ["gtceu:nether_air 1000"], [120], [400]],
        ["gtceu:ender_air", ["64x gtceu:ender_pearl_dust"],
            ["gtceu:fuming_nitric_acid 1000", "gtceu:nitrogen_dioxide 10000", "gtceu:helium 10000", "gtceu:radon 1000", "gtceu:deuterium 1000",
                "gtceu:xenon 1000"], ["gtceu:ender_air 1000"], [480], [800]]
    ]);

    gtr.chemical_bath("gtceu:damascus_steel_dust")
        .itemInputs("gtceu:steel_dust").inputFluids("gtceu:lubricant 100").itemOutputs("gtceu:damascus_steel_dust").EUt(120).duration(200)
        .dimension("kubejs:ancient_world")

    gtr.chemical_reactor("gtceu:ammonium_chloride_dust")
        .inputFluids("gtceu:hydrochloric_acid 1000", "gtceu:ammonia 1000").itemOutputs("6x gtceu:ammonium_chloride_dust").EUt(30).duration(120)

    gtr.electric_blast_furnace("gtceu:iridium_dioxide_dust")
        .itemInputs("6x gtceu:iridium_metal_residue_dust", "5x gtceu:sodium_chlorate_dust").inputFluids("gtceu:hydrogen 6000")
        .itemOutputs("3x gtceu:iridium_dioxide_dust", "2x gtceu:salt_dust").chancedOutput("gtceu:platinum_sludge_residue_dust", 8000, 0)
        .outputFluids("gtceu:diluted_hydrochloric_acid 6000").EUt(120).duration(200).blastFurnaceTemp(790)

    gtr.mixer("gtceu:potassium_pyrosulfate_dust")
        .itemInputs("2x gtceu:potassium_dust", "2x gtceu:sulfur_dust").inputFluids("gtceu:oxygen 7000")
        .itemOutputs("11x gtceu:potassium_pyrosulfate_dust").EUt(120).duration(120)

    gtr.centrifuge("gtceu:rare_earth_chlorides")
        .notConsumable("gtceu:hv_item_magnet").inputFluids("gtceu:rare_earth_chlorides 2000")
        .outputFluids("gtceu:la_nd_oxides_solution 250", "gtceu:sm_gd_oxides_solution 250", "gtceu:tb_ho_oxides_solution 250",
            "gtceu:er_lu_oxides_solution 250", "gtceu:hydrochloric_acid 1000")
        .EUt(480).duration(200)

    batch(gtr, "dehydrator", ["inputFluids", "chancedOutput", "chancedOutput", "chancedOutput", "chancedOutput", ["EUt", 480], ["duration", 220]], [
        ["gtceu:la_nd_oxides_solution", ["gtceu:la_nd_oxides_solution 4000"], ["5x gtceu:lanthanum_oxide_dust", 4300, 275],
            ["5x gtceu:cerium_oxide_dust", 4300, 275], ["5x gtceu:praseodymium_oxide_dust", 4300, 275], ["5x gtceu:neodymium_oxide_dust", 4300, 275]],
        ["gtceu:sm_gd_oxides_solution", ["gtceu:sm_gd_oxides_solution 4000"], ["5x gtceu:scandium_oxide_dust", 4300, 275],
            ["5x gtceu:samarium_oxide_dust", 4300, 275], ["5x gtceu:europium_oxide_dust", 4300, 275], ["5x gtceu:gadolinium_oxide_dust", 4300, 275]],
        ["gtceu:tb_ho_oxides_solution", ["gtceu:tb_ho_oxides_solution 4000"], ["5x gtceu:yttrium_oxide_dust", 4300, 275],
            ["5x gtceu:terbium_oxide_dust", 4300, 275], ["5x gtceu:dysprosium_oxide_dust", 4300, 275], ["5x gtceu:holmium_oxide_dust", 4300, 275]],
        ["gtceu:er_lu_oxides_solution", ["gtceu:er_lu_oxides_solution 4000"], ["5x gtceu:erbium_oxide_dust", 4300, 275],
            ["5x gtceu:thulium_oxide_dust", 4300, 275], ["5x gtceu:ytterbium_oxide_dust", 4300, 275], ["5x gtceu:lutetium_oxide_dust", 4300, 275]]
    ]);

    const rare_earth_oxides = ["lanthanum", "praseodymium", "neodymium", "cerium", "scandium", "europium", "gadolinium", "samarium", "terbium", "dysprosium", "holmium",
        "erbium", "thulium", "ytterbium", "lutetium", "yttrium"]

    rare_earth_oxides.forEach((element) => {
        gtr.electric_blast_furnace("gtceu:" + element + "_dust")
            .itemInputs("10x gtceu:" + element + "_oxide_dust", "3x gtceu:carbon_dust").itemOutputs("4x gtceu:" + element + "_dust")
            .outputFluids("gtceu:carbon_dioxide 3000").EUt(480).duration(200).blastFurnaceTemp(2500)
    })

    gtr.chemical_reactor("gtceu:zirconium_hafnium_chloride")
        .itemInputs("6x gtceu:zircon_dust").inputFluids("gtceu:chlorine 8000")
        .outputFluids("gtceu:zirconium_hafnium_chloride 1000", "gtceu:zircon_chlorinating_residue 1000").EUt(120).duration(120)

    gtr.chemical_reactor("gtceu:zirconiu_hafnium_oxychloride")
        .inputFluids("gtceu:zirconium_hafnium_chloride 1000", "minecraft:water 1000")
        .outputFluids("gtceu:zirconiu_hafnium_oxychloride 1000", "gtceu:diluted_hydrochloric_acid 2000").EUt(480).duration(100)

    gtr.large_chemical_reactor("gtceu:zirconium_oxide_dust")
        .itemInputs("36x gtceu:ammonium_chloride_dust", "9x gtceu:potassium_hydroxide_dust", "10x gtceu:hematite_dust")
        .inputFluids("gtceu:zirconiu_hafnium_oxychloride 3000", "gtceu:sulfur_trioxide 3000", "gtceu:hydrogen_peroxide 6000")
        .itemOutputs("21x gtceu:potassium_sulfate_dust", "3x gtceu:zirconium_oxide_dust").chancedOutput("3x gtceu:hafnium_oxide_dust", 8000, 0)
        .outputFluids("gtceu:ammonia 6000", "gtceu:iron_iii_chloride 4000").EUt(1920).duration(100)

    gtr.chemical_reactor("gtceu:hafnium_chloride_dust")
        .itemInputs("3x gtceu:hafnium_oxide_dust", "gtceu:carbon_dust").inputFluids("gtceu:chlorine 4000")
        .itemOutputs("5x gtceu:hafnium_chloride_dust").outputFluids("gtceu:carbon_dioxide 1000").EUt(120).duration(150)

    gtr.electric_blast_furnace("gtceu:hafnium_dust")
        .itemInputs("5x gtceu:hafnium_chloride_dust", "2x gtceu:magnesium_dust")
        .itemOutputs("1x gtceu:hafnium_dust", "6x gtceu:magnesium_chloride_dust").EUt(120).duration(300).blastFurnaceTemp(3400)

    gtr.incubator("gtceu:stem_cells")
        .chancedInput("kubejs:glacio_spirit", 6000, 500).itemInputs("gtceu:osmiridium_dust")
        .inputFluids("gtceu:sterilized_growth_medium 500", "gtceu:bacteria 500").itemOutputs("32x gtceu:stem_cells")
        .outputFluids("gtceu:bacterial_sludge 500").EUt(30720).duration(300).addCondition(new GravityCondition(true))
});
