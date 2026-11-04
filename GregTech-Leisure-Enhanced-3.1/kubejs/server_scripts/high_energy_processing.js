// priority: 95
// 高级结构外壳、内爆与激光材料加工。
// 由 gtceu.js 按既有阶段顺序执行，本文件只登记配方，不依赖文件名排序。
global.gtlPack.register("high_energy_processing", event => {
    const gtr = event.recipes.gtceu;
    const batch = global.gtlPack.batch;

    batch(gtr, "dimensionally_transcendent_plasma_forge", ["itemInputs", "inputFluids", "itemOutputs", "EUt", "duration", "blastFurnaceTemp"], [
        ["gtlcore:infinity_glass", ["kubejs:black_body_naquadria_supersolid", "2x gtceu:infinity_dust"],
            ["gtceu:dimensionallytranscendentexoticcatalyst 1000", "gtceu:woods_glass 9216"], ["gtlcore:infinity_glass"],
            [4096 * GTValues.VA[GTValues.MAX]], [1600], [88000]],
        ["gtlcore:create_casing", ["gtceu:eternity_frame", "kubejs:command_block_core"], ["gtceu:exciteddtsc 1000", "gtceu:primordialmatter 1000"],
            ["gtlcore:create_casing"], [16384 * GTValues.VA[GTValues.MAX]], [3200], [96000]]
    ]);

    batch(gtr, "gravitation_shockburst", ["itemInputs", "itemOutputs", ["EUt", 65536 * GTValues.VA[GTValues.MAX]], ["duration", 20]], [
        ["kubejs:chain_command_block_core", ["kubejs:command_block_core", "64x minecraft:observer"], ["kubejs:chain_command_block_core"]],
        ["kubejs:repeating_command_block_core", ["kubejs:chain_command_block_core", "64x minecraft:calibrated_sculk_sensor"],
            ["kubejs:repeating_command_block_core"]],
        ["kubejs:command_block_broken", ["minecraft:command_block", "gtceu:magnetohydrodynamicallyconstrainedstarmatter_dust"],
            ["kubejs:command_block_broken"]],
        ["kubejs:chain_command_block_broken", ["minecraft:chain_command_block", "gtceu:magnetohydrodynamicallyconstrainedstarmatter_dust"],
            ["kubejs:chain_command_block_broken"]]
    ]);

    gtr.assembly_line("kubejs:chaotic_energy_core")
        .itemInputs("kubejs:draconic_energy_core", "64x gtceu:uhv_ultimate_battery", "16x kubejs:chaotic_core", "32x #gtceu:circuits/max",
            "16x gtceu:white_dwarf_mtter_nanoswarm", "16x gtceu:black_dwarf_mtter_nanoswarm", "64x kubejs:smd_capacitor_supracausal",
            "64x kubejs:smd_diode_supracausal", "64x kubejs:smd_resistor_supracausal", "64x kubejs:smd_transistor_supracausal",
            "64x kubejs:smd_inductor_supracausal", "64x gtceu:chaos_block", "64x gtceu:magnetohydrodynamicallyconstrainedstarmatter_rod",
            "64x gtceu:magnetohydrodynamicallyconstrainedstarmatter_plate", "64x gtceu:shirabon_plate", "32x gtceu:double_cosmic_plate")
        .inputFluids("gtceu:super_mutated_living_solder 28800", "gtceu:chaos 28800", "gtceu:spacetime 10000", "gtceu:primordialmatter 10000")
        .itemOutputs("kubejs:chaotic_energy_core").EUt(64 * GTValues.VA[GTValues.MAX]).duration(2560)
        .stationResearch(b => b.researchStack(Registries.getItemStack("kubejs:create_ultimate_battery")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(GTValues.VA[GTValues.MAX]).CWUt(16384))

    gtr.assembly_line("kubejs:hollow_casing")
        .itemInputs("gtlcore:molecular_casing", "16x gtceu:magnalium_screw", "4x gtceu:europium_plate", "4x gtceu:apatite_rod",
            "2x gtceu:double_uranium_plate", "16x gtceu:molybdenum_screw", "4x gtceu:double_duranium_plate")
        .inputFluids("gtceu:stainless_steel 1296", "gtceu:indium_gallium_phosphide 1296", "gtceu:wrought_iron 1296",
            "gtceu:indium_tin_barium_titanium_cuprate 1296")
        .itemOutputs("2x kubejs:hollow_casing").EUt(GTValues.VA[GTValues.UV]).duration(200)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtlcore:molecular_casing")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(GTValues.VA[GTValues.UV]).CWUt(128))

    gtr.assembly_line("kubejs:spacetime_assembly_line_unit")
        .itemInputs("gtceu:adamantium_frame", "gtlcore:advanced_assembly_line_unit", "kubejs:machine_casing_circuit_assembly_line",
            "kubejs:precision_circuit_assembly_robot_mk2", "gtceu:osmium_nanoswarm", "6x kubejs:optical_processing_core",
            "2x #gtceu:circuits/uev", "4x gtceu:blue_steel_gear", "4x gtceu:red_steel_gear", "4x gtceu:zpm_robot_arm",
            "6x gtceu:double_pikyonium_plate")
        .inputFluids("gtceu:liquidcrystalkevlar 5760", "gtceu:enderite 1296", "gtceu:highurabilityompoundteel 1296", "gtceu:pikyonium 1296")
        .itemOutputs("kubejs:spacetime_assembly_line_unit").EUt(GTValues.VA[GTValues.UHV]).duration(400)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtlcore:advanced_assembly_line_unit")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(GTValues.VA[GTValues.UHV]).CWUt(256))

    gtr.assembly_line("kubejs:molecular_coil")
        .itemInputs("kubejs:hollow_casing", "2x gtceu:naquadah_coil_block", "2x gtceu:fusion_coil", "64x gtceu:fine_europium_wire",
            "32x gtceu:enriched_naquadah_trinium_europium_duranide_foil")
        .inputFluids("gtceu:borosilicate_glass 2304", "gtceu:silicone_rubber 5760", "gtceu:uranium_triplatinum 1296", "gtceu:stellite_100 1296")
        .itemOutputs("2x kubejs:molecular_coil").EUt(GTValues.VA[GTValues.UV]).duration(400)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:molybdenum_disilicide_coil_block")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(GTValues.VA[GTValues.UV]).CWUt(128))

    gtr.assembly_line("kubejs:containment_field_generator")
        .itemInputs("kubejs:hollow_casing", "4x gtceu:luv_field_generator", "6x gtceu:indium_tin_barium_titanium_cuprate_quadruple_wire",
            "4x #gtceu:circuits/uv", "gtceu:uv_transformer_16a", "6x gtceu:double_vanadium_gallium_plate",
            "4x gtceu:double_enriched_naquadah_trinium_europium_duranide_plate")
        .inputFluids("gtceu:lanthanum 2304", "gtceu:cobalt_brass 5760", "gtceu:battery_alloy 5760", "gtceu:molybdenum_disilicide 1296")
        .itemOutputs("kubejs:containment_field_generator").EUt(GTValues.VA[GTValues.UV]).duration(500)
        .stationResearch(b => b.researchStack(Registries.getItemStack("kubejs:force_field_glass")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(GTValues.VA[GTValues.UV]).CWUt(128))

    gtr.assembly_line("gtceu:crystalline_infinity")
        .itemInputs("4x gtceu:uev_autoclave", "4x gtceu:uev_chemical_bath", "4x gtceu:uev_ore_washer", "16x gtceu:uhv_emitter",
            "16x gtceu:uhv_electric_pump", "8x gtceu:adamantium_rotor", "4x gtceu:neutronium_nanoswarm", "32x #gtceu:circuits/uev",
            "16x gtceu:titansteel_octal_cable", "16x gtceu:double_indium_tin_barium_titanium_cuprate_plate", "32x gtceu:double_tritanium_plate")
        .inputFluids("gtceu:lanthanum 2304", "gtceu:cobalt_brass 5760", "gtceu:battery_alloy 5760", "gtceu:molybdenum_disilicide 1296")
        .itemOutputs("gtceu:crystalline_infinity").EUt(GTValues.VA[GTValues.UEV]).duration(600)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:large_autoclave")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(GTValues.VA[GTValues.UEV]).CWUt(256))

    gtr.assembly_line("gtceu:star_ultimate_material_forge_factory")
        .itemInputs("4x gtceu:stellar_forge", "4x gtceu:uiv_electric_furnace", "4x gtceu:uiv_arc_furnace", "4x gtceu:uiv_alloy_smelter",
            "16x gtceu:uiv_electric_pump", "gtlcore:transcendent_max_battery", "4x gtceu:uxv_sensor", "16x #gtceu:circuits/uxv",
            "8x kubejs:containment_field_generator", "8x gtlcore:hyper_core", "64x gtceu:vibranium_plate", "32x gtceu:double_vibramantium_plate")
        .inputFluids("gtceu:incoloy_ma_956 5760", "gtceu:germaniumtungstennitride 5760", "gtceu:abyssalalloy 5760", "gtceu:titanium_carbide 5760")
        .itemOutputs("gtceu:star_ultimate_material_forge_factory").EUt(GTValues.VA[GTValues.UIV]).duration(1200)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtlcore:ultimate_stellar_containment_casing")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(GTValues.VA[GTValues.UIV]).CWUt(1024))

    gtr.assembly_line("gtceu:suprachronal_assembly_line")
        .itemInputs("gtlcore:infinite_cell_component", "16x gtceu:advanced_assembly_line", "16x gtceu:circuit_assembly_line",
            "4x kubejs:spacetime_assembly_line_casing", "4x kubejs:spacetime_assembly_line_unit", "32x kubejs:molecular_coil",
            "16x gtceu:uev_emitter", "16x gtceu:uev_sensor", "16x kubejs:precision_circuit_assembly_robot_mk3", "16x #gtceu:circuits/uiv",
            "gtceu:max_battery", "32x gtceu:double_dalisenite_plate")
        .inputFluids("gtceu:borosilicate_glass 3204", "gtceu:silicone_rubber 5760", "gtceu:uranium_triplatinum 1296", "gtceu:stellite_100 1296")
        .itemOutputs("gtceu:suprachronal_assembly_line").EUt(GTValues.VA[GTValues.UEV]).duration(800)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:assembler_module")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(GTValues.VA[GTValues.UEV]).CWUt(256))

    batch(gtr, "assembler", ["itemInputs", "inputFluids", "itemOutputs", "EUt", ["duration", 400], ["cleanroom", CleanroomType.CLEANROOM]], [
        ["kubejs:force_field_glass",
            ["gtceu:laminated_glass", "gtceu:uhv_field_generator", "4x gtceu:long_naquadah_alloy_rod", "2x gtceu:long_mithril_rod",
                "4x gtceu:double_uranium_rhodium_dinaquadide_plate", "2x gtceu:double_naquadah_alloy_plate"], ["gtceu:mutated_living_solder 1296"],
            ["kubejs:force_field_glass"], [GTValues.VA[GTValues.UEV]]],
        ["gtlcore:molecular_casing",
            ["gtceu:high_power_casing", "4x gtceu:double_battery_alloy_plate", "gtceu:iv_emitter", "24x gtceu:darmstadtium_ring",
                "12x gtceu:tungsten_foil", "12x gtceu:ruridit_foil", "24x gtceu:tungsten_steel_foil", "6x gtceu:rhodium_plate",
                "4x gtceu:double_ruthenium_plate"], ["gtceu:niobium_nitride 864"], ["gtlcore:molecular_casing"], [GTValues.VA[GTValues.UV]]],
        ["kubejs:spacetime_assembly_line_casing",
            ["gtceu:assembly_line_casing", "gtceu:uhv_emitter", "4x gtceu:uev_electric_motor", "2x gtceu:uev_conveyor_module",
                "2x gtceu:uev_electric_piston", "2x #gtceu:circuits/uev", "8x gtceu:double_zinc_plate"], ["gtceu:liquid_degenerate_rhenium 200"],
            ["kubejs:spacetime_assembly_line_casing"], [GTValues.VA[GTValues.UEV]]]
    ]);

    gtr.assembler("gtceu:electric_implosion_compressor")
        .itemInputs("4x gtceu:implosion_compressor", "4x gtceu:luv_transformer_16a", "4x gtceu:luv_diode", "8x gtceu:luv_field_generator",
            "16x gtceu:tritanium_hex_cable", "4x gtceu:dense_obsidian_plate", "4x gtceu:dense_tungsten_steel_plate")
        .inputFluids("gtceu:soldering_alloy 1296").itemOutputs("gtceu:electric_implosion_compressor").EUt(GTValues.VA[GTValues.LuV])
        .duration(600)

    batch(gtr, "compressor", ["itemInputs", "itemOutputs", "EUt", ["duration", 1200]], [
        ["gtceu:dimensionally_transcendent_dirt_forge", ["16x gtceu:primitive_blast_furnace"], ["gtceu:dimensionally_transcendent_dirt_forge"], [8]],
        ["gtceu:dimensionally_transcendent_steam_boiler", ["16x gtceu:tungstensteel_large_boiler"], ["gtceu:dimensionally_transcendent_steam_boiler"],
            [GTValues.VA[GTValues.IV]]]
    ]);

    batch(gtr, "assembler", ["itemInputs", "itemOutputs", "EUt", ["duration", 1200]], [
        ["gtceu:steam_mega_turbine",
            ["8x gtceu:steam_large_turbine", "16x #gtceu:circuits/iv", "4x gtceu:ev_electric_pump", "8x gtceu:ev_electric_piston",
                "8x gtceu:black_bronze_turbine_blade", "8x gtceu:double_molybdenum_plate", "32x gtceu:double_steel_plate"],
            ["gtceu:steam_mega_turbine"], [GTValues.VA[GTValues.EV]]],
        ["gtceu:gas_mega_turbine",
            ["8x gtceu:gas_large_turbine", "16x #gtceu:circuits/luv", "8x gtceu:ev_electric_pump", "32x gtceu:ev_electric_piston",
                "8x gtceu:neodymium_turbine_blade", "8x gtceu:double_sterling_silver_plate", "32x gtceu:double_stainless_steel_plate"],
            ["gtceu:gas_mega_turbine"], [GTValues.VA[GTValues.IV]]],
        ["gtceu:rocket_mega_turbine",
            ["8x gtceu:rocket_large_turbine", "16x #gtceu:circuits/zpm", "4x gtceu:iv_electric_motor", "8x gtceu:iv_electric_piston",
                "8x gtceu:tungsten_turbine_blade", "8x gtceu:double_vanadium_steel_plate", "32x gtceu:double_titanium_plate"],
            ["gtceu:rocket_mega_turbine"], [GTValues.VA[GTValues.IV]]],
        ["gtceu:plasma_mega_turbine",
            ["8x gtceu:plasma_large_turbine", "16x #gtceu:circuits/uv", "8x gtceu:iv_electric_pump", "16x gtceu:iv_electric_piston",
                "8x gtceu:osmiridium_turbine_blade", "8x gtceu:double_ultimet_plate", "32x gtceu:double_tungsten_steel_plate"],
            ["gtceu:plasma_mega_turbine"], [GTValues.VA[GTValues.LuV]]]
    ]);

    gtr.assembler("gtceu:chemical_energy_devourer")
        .itemInputs("4x gtceu:extreme_combustion_engine", "4x gtceu:iv_field_generator", "8x gtceu:iv_emitter", "8x gtceu:iv_electric_pump",
            "16x gtceu:ev_fluid_regulator", "8x gtceu:small_tungsten_spring", "8x gtceu:small_vanadium_gallium_spring",
            "8x gtceu:luv_transformer_4a", "4x gtceu:dense_tungsten_steel_plate")
        .inputFluids("gtceu:lubricant 10000").itemOutputs("gtceu:chemical_energy_devourer").EUt(GTValues.VA[GTValues.IV]).duration(1200)

    gtr.assembler("gtlcore:degenerate_rhenium_constrained_casing")
        .circuit(6).itemInputs("gtceu:quantanium_frame", "6x gtceu:degenerate_rhenium_plate")
        .itemOutputs("2x gtlcore:degenerate_rhenium_constrained_casing").EUt(GTValues.VA[GTValues.UV]).duration(1200)

    gtr.assembler("gtlcore:rhenium_reinforced_energy_glass")
        .itemInputs("4x gtceu:fusion_glass", "6x gtceu:degenerate_rhenium_plate").itemOutputs("2x gtlcore:rhenium_reinforced_energy_glass")
        .EUt(GTValues.VA[GTValues.UV]).duration(1200)

    gtr.ultimate_material_forge("kubejs:proto_matter")
        .itemInputs("kubejs:triplet_neutronium_sphere").inputFluids("gtceu:uu_matter 1000").itemOutputs("kubejs:proto_matter")
        .chancedOutput("gtceu:neutronium_ingot", 6000, 0).EUt(GTValues.VA[GTValues.OpV]).duration(1600)

    function implosion_compressor_add(input, output, am) {
        batch(gtr, "implosion_compressor", [["itemInputs", input], "itemInputs", ["itemOutputs", am + "x " + output], ["chancedOutput", "gtceu:dark_ash_dust", 2500, 0], ["EUt", 30],
            ["duration", 20]], [
            [output + "_powderbarrel", ["8x gtceu:powderbarrel"]],
            [output + "_tnt", ["4x minecraft:tnt"]],
            [output + "_dynamite", ["2x gtceu:dynamite"]],
            [output + "_itnt", ["gtceu:industrial_tnt"]]
        ]);

        gtr.electric_implosion_compressor("e" + output)
            .itemInputs(input).itemOutputs(am + "x " + output).EUt(GTValues.VA[GTValues.UV]).duration(1)
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
        .itemInputs("64x minecraft:coal").itemInputs("64x minecraft:coal").itemOutputs("minecraft:diamond").EUt(GTValues.VA[GTValues.UV])
        .duration(1)

    gtr.electric_implosion_compressor("avaritia:eternal_singularity")
        .notConsumable("16x gtceu:eternity_nanoswarm").itemInputs("gtceu:spacetime_dust").itemOutputs("avaritia:eternal_singularity")
        .EUt(GTValues.VA[GTValues.MAX]).duration(20)

    gtr.chemical_reactor("gtceu:ethylene_f_ethanol")
        .circuit(1).inputFluids("gtceu:sulfuric_acid 1000", "gtceu:ethanol 1000")
        .outputFluids("gtceu:ethylene 1000", "gtceu:diluted_sulfuric_acid 1000").EUt(120).duration(1200)

    gtr.assembler("gtceu:petrochemical_plant")
        .itemInputs("16x gtceu:watertight_steel_frame", "8x gtceu:large_distillery", "4x gtceu:large_cracker", "gtceu:chemical_plant",
            "4x #gtceu:circuits/uhv", "4x gtceu:zpm_emitter", "16x gtceu:zpm_fluid_regulator", "16x gtceu:stainless_steel_nonuple_fluid_pipe",
            "32x gtceu:double_stainless_steel_plate")
        .itemOutputs("gtceu:petrochemical_plant").inputFluids("gtceu:soldering_alloy 1296").EUt(GTValues.VA[GTValues.ZPM]).duration(1000)

    const lasers = [["iv", "4x gtceu:platinum_single_cable", 7680], ["luv", "4x gtceu:niobium_titanium_single_cable", 30720],
        ["zpm", "4x gtceu:vanadium_gallium_single_cable", 122880], ["uv", "4x gtceu:yttrium_barium_cuprate_single_cable", 491520],
        ["uhv", "4x gtceu:europium_single_cable", 1966080], ["uev", "4x gtceu:mithril_single_cable", 7864320],
        ["uiv", "4x gtceu:neutronium_single_cable", 34257280], ["uxv", "4x gtceu:taranium_single_cable", 125829120],
        ["opv", "4x gtceu:crystalmatrix_single_cable", 503316480]]

    lasers.forEach(laser => {
        for (let index = 0; index < 5; index++) {
            batch(gtr, "assembler", ["itemInputs", "itemOutputs", ["circuit", 4 + index], ["EUt", laser[2]], ["duration", 2400 * (2 ** index)]], [
                ["gtceu:" + laser[0] + "_" + 16384 * (4 ** index) + "a_laser_target_hatch",
                    ["gtceu:" + laser[0] + "_machine_hull", 8 * (2 ** index) + "x gtceu:diamond_lens",
                        8 * (2 ** index) + "x gtceu:" + laser[0] + "_sensor", 8 * (2 ** index) + "x gtceu:" + laser[0] + "_electric_pump", laser[1]],
                    ["gtceu:" + laser[0] + "_" + 16384 * (4 ** index) + "a_laser_target_hatch"]],
                ["gtceu:" + laser[0] + "_" + 16384 * (4 ** index) + "a_laser_source_hatch",
                    ["gtceu:" + laser[0] + "_machine_hull", 8 * (2 ** index) + "x gtceu:diamond_lens",
                        8 * (2 ** index) + "x gtceu:" + laser[0] + "_emitter", 8 * (2 ** index) + "x gtceu:" + laser[0] + "_electric_pump", laser[1]],
                    ["gtceu:" + laser[0] + "_" + 16384 * (4 ** index) + "a_laser_source_hatch"]]
            ]);
        }
    })
    for (let index = 0; index < 8; index++) {
        batch(gtr, "assembler", ["itemInputs", "itemOutputs", ["circuit", 1 + index], ["EUt", GTValues.VA[GTValues.MAX]], ["duration", 300 * (2 ** index)]], [
            ["gtceu:max_" + 256 * (4 ** index) + "a_laser_target_hatch",
                ["gtceu:max_machine_hull", (2 ** index) + "x gtceu:diamond_lens", (2 ** index) + "x gtlcore:max_sensor",
                    (2 ** index) + "x gtlcore:max_electric_pump", "4x gtceu:cosmicneutronium_single_cable"],
                ["gtceu:max_" + 256 * (4 ** index) + "a_laser_target_hatch"]],
            ["gtceu:max_" + 256 * (4 ** index) + "a_laser_source_hatch",
                ["gtceu:max_machine_hull", (2 ** index) + "x gtceu:diamond_lens", (2 ** index) + "x gtlcore:max_emitter",
                    (2 ** index) + "x gtlcore:max_electric_pump", "4x gtceu:cosmicneutronium_single_cable"],
                ["gtceu:max_" + 256 * (4 ** index) + "a_laser_source_hatch"]]
        ]);
    }

    gtr.dyson_sphere("gtceu:dysonsphere")
        .inputFluids("kubejs:gelid_cryotheum 1").circuit(1).EUt(- GTValues.V[GTValues.MAX]).duration(20).CWUt(1)

    gtr.dyson_sphere("gtceu:dysonspherelaunch")
        .itemInputs("64x kubejs:dyson_swarm_module").EUt(GTValues.V[GTValues.UIV]).duration(200).CWUt(512)

    gtr.petrochemical_plant("gtceu:petrochemical_plant_1")
        .inputFluids("gtceu:oil 1000", "gtceu:steam 1000")
        .outputFluids("gtceu:toluene 60", "gtceu:benzene 180", "gtceu:octane 60", "gtceu:butane 80", "gtceu:butene 100", "gtceu:butadiene 90",
            "gtceu:propane 80", "gtceu:propene 400", "gtceu:ethane 80", "gtceu:ethylene 400", "gtceu:methane 400", "gtceu:helium 20")
        .EUt(1920).duration(200)
});
