// priority: 95
// 艾萨磨矿石处理、后期设备与奇点加工。
// 由 gtceu.js 按既有阶段顺序执行，本文件只登记配方，不依赖文件名排序。
global.gtlPack.register("ore_processing", event => {
    const gtr = event.recipes.gtceu;
    const batch = global.gtlPack.batch;

    // 艾萨磨矿石处理
    const isa_mill_ores = [["gtceu:milled_almandine", "gtceu:raw_almandine", "#forge:ores/almandine"],
        ["gtceu:milled_chalcopyrite", "gtceu:raw_chalcopyrite", "#forge:ores/chalcopyrite"],
        ["gtceu:milled_grossular", "gtceu:raw_grossular", "#forge:ores/grossular"],
        ["gtceu:milled_monazite", "gtceu:raw_monazite", "#forge:ores/monazite"], ["gtceu:milled_nickel", "gtceu:raw_nickel", "#forge:ores/nickel"],
        ["gtceu:milled_pentlandite", "gtceu:raw_pentlandite", "#forge:ores/pentlandite"],
        ["gtceu:milled_platinum", "gtceu:raw_platinum", "#forge:ores/platinum"], ["gtceu:milled_pyrope", "gtceu:raw_pyrope", "#forge:ores/pyrope"],
        ["gtceu:milled_redstone", "gtceu:raw_redstone", "#forge:ores/redstone"],
        ["gtceu:milled_spessartine", "gtceu:raw_spessartine", "#forge:ores/spessartine"],
        ["gtceu:milled_sphalerite", "gtceu:raw_sphalerite", "#forge:ores/sphalerite"],
        ["gtceu:milled_enriched_naquadah", "gtceu:raw_enriched_naquadah", "#forge:ores/enriched_naquadah"]]
    isa_mill_ores.forEach((isa_mill_ore) => {
        batch(gtr, "isa_mill", ["circuit", "itemInputs", "inputFluids", "itemOutputs", ["EUt", GTValues.VA[GTValues.EV]], "duration", "addData"], [
            [isa_mill_ore[0] + "_rgs", [1], ["16x " + isa_mill_ore[1]], ["gtceu:distilled_water 50"], ["48x " + isa_mill_ore[0]], [2400],
                ["grindball", 1]],
            [isa_mill_ore[0] + "_ral", [10], ["16x " + isa_mill_ore[1]], ["gtceu:distilled_water 50"], ["36x " + isa_mill_ore[0]], [1200],
                ["grindball", 2]],
            [isa_mill_ore[0] + "_bgs", [1], ["16x " + isa_mill_ore[2]], ["gtceu:distilled_water 100"], ["96x " + isa_mill_ore[0]], [4800],
                ["grindball", 1]],
            [isa_mill_ore[0] + "_bal", [10], ["16x " + isa_mill_ore[2]], ["gtceu:distilled_water 100"], ["72x " + isa_mill_ore[0]], [2400],
                ["grindball", 2]]
        ]);
    })

    batch(gtr, "flotating_beneficiation", ["itemInputs", "inputFluids", "outputFluids", "EUt", "duration"], [
        ["gtceu:almandine_front", ["32x gtceu:sodium_ethylxanthate_dust", "64x gtceu:milled_almandine"], ["gtceu:turpentine 18000"],
            ["gtceu:almandine_front 1000"], [GTValues.VA[GTValues.IV]], [4800]],
        ["gtceu:chalcopyrite_front", ["32x gtceu:potassium_ethylxanthate_dust", "64x gtceu:milled_chalcopyrite"], ["gtceu:turpentine 12000"],
            ["gtceu:chalcopyrite_front 1000"], [GTValues.VA[GTValues.IV]], [4800]],
        ["gtceu:grossular_front", ["32x gtceu:potassium_ethylxanthate_dust", "64x gtceu:milled_grossular"], ["gtceu:turpentine 28000"],
            ["gtceu:grossular_front 1000"], [GTValues.VA[GTValues.LuV]], [4800]],
        ["gtceu:monazite_front", ["32x gtceu:sodium_ethylxanthate_dust", "64x gtceu:milled_monazite"], ["gtceu:turpentine 30000"],
            ["gtceu:monazite_front 1000"], [GTValues.VA[GTValues.LuV]], [4800]],
        ["gtceu:nickel_front", ["32x gtceu:potassium_ethylxanthate_dust", "64x gtceu:milled_nickel"], ["gtceu:turpentine 25000"],
            ["gtceu:nickel_front 1000"], [GTValues.VA[GTValues.IV]], [4800]],
        ["gtceu:platinum_front", ["32x gtceu:sodium_ethylxanthate_dust", "64x gtceu:milled_platinum"], ["gtceu:turpentine 35000"],
            ["gtceu:platinum_front 1000"], [GTValues.VA[GTValues.LuV]], [4800]],
        ["gtceu:pyrope_front", ["32x gtceu:sodium_ethylxanthate_dust", "64x gtceu:milled_pyrope"], ["gtceu:turpentine 8000"],
            ["gtceu:pyrope_front 1000"], [GTValues.VA[GTValues.IV]], [4800]],
        ["gtceu:redstone_front", ["32x gtceu:sodium_ethylxanthate_dust", "64x gtceu:milled_redstone"], ["gtceu:turpentine 13000"],
            ["gtceu:redstone_front 1000"], [GTValues.VA[GTValues.IV]], [4800]],
        ["gtceu:spessartine_front", ["32x gtceu:potassium_ethylxanthate_dust", "64x gtceu:milled_spessartine"], ["gtceu:turpentine 35000"],
            ["gtceu:spessartine_front 1000"], [GTValues.VA[GTValues.LuV]], [4800]],
        ["gtceu:sphalerite_front", ["32x gtceu:sodium_ethylxanthate_dust", "64x gtceu:milled_sphalerite"], ["gtceu:turpentine 14000"],
            ["gtceu:sphalerite_front 1000"], [GTValues.VA[GTValues.LuV]], [4800]],
        ["gtceu:pentlandite_front", ["32x gtceu:potassium_ethylxanthate_dust", "64x gtceu:milled_pentlandite"], ["gtceu:turpentine 14000"],
            ["gtceu:pentlandite_front 1000"], [GTValues.VA[GTValues.LuV]], [4800]],
        ["gtceu:enriched_naquadah_front", ["64x gtceu:potassium_ethylxanthate_dust", "64x gtceu:milled_enriched_naquadah"],
            ["gtceu:turpentine 140000"], ["gtceu:enriched_naquadah_front 1000"], [GTValues.VA[GTValues.LuV]], [9600]]
    ]);

    gtr.chemical_reactor("gtceu:sodium_ethylxanthate_dust")
        .itemInputs("9x gtceu:sodium_ethylate_dust").inputFluids("gtceu:ethanol 1000", "gtceu:carbon_disulfide 1000")
        .itemOutputs("12x gtceu:sodium_ethylxanthate_dust").outputFluids("minecraft:water 1000").EUt(GTValues.VA[GTValues.HV]).duration(40)

    gtr.chemical_reactor("gtceu:potassium_ethylxanthate_dust")
        .itemInputs("3x gtceu:potassium_ethylate_dust").inputFluids("gtceu:carbon_disulfide 1000")
        .itemOutputs("12x gtceu:potassium_ethylxanthate_dust").EUt(GTValues.VA[GTValues.HV]).duration(40)

    gtr.large_chemical_reactor("gtceu:potassium_ethylate_dust")
        .circuit(2).itemInputs("3x gtceu:potash_dust", "5x gtceu:quicklime_dust")
        .inputFluids("gtceu:carbon_dioxide 1000", "minecraft:water 5000")
        .itemOutputs("6x gtceu:potassium_ethylate_dust", "5x gtceu:high_purity_calcium_carbonate_dust").EUt(GTValues.VA[GTValues.MV])
        .duration(100)

    gtr.mixer("gtceu:sodium_ethylate_dust")
        .itemInputs("1x gtceu:sodium_dust").inputFluids("gtceu:ethanol 1000").itemOutputs("9x gtceu:sodium_ethylate_dust")
        .outputFluids("gtceu:hydrogen 1000").EUt(GTValues.VA[GTValues.MV]).duration(100)

    gtr.alloy_blast_smelter("gtceu:carbon_disulfide")
        .circuit(8).itemInputs("1x gtceu:carbon_dust", "2x gtceu:sulfur_dust").outputFluids("gtceu:carbon_disulfide 1000")
        .EUt(GTValues.VA[GTValues.MV]).duration(350).blastFurnaceTemp(1200)

    batch(gtr, "vacuum_drying", ["circuit", "inputFluids", "itemOutputs", ["outputFluids", "gtceu:red_mud 200", "minecraft:water 2000"], "EUt", ["duration", 2400],
        "blastFurnaceTemp"], [
        ["gtceu:almandine_front_pro", [1], ["gtceu:almandine_front 4000"],
            ["64x gtceu:aluminium_dust", "64x gtceu:aluminium_dust", "64x gtceu:manganese_dust", "24x gtceu:manganese_dust", "24x gtceu:yttrium_dust",
                "16x gtceu:ytterbium_dust"], [GTValues.VA[GTValues.IV]], [5500]],
        ["gtceu:chalcopyrite_front_pro", [2], ["gtceu:chalcopyrite_front 4000"],
            ["64x gtceu:copper_dust", "64x gtceu:copper_dust", "64x gtceu:iron_dust", "48x gtceu:iron_dust", "48x gtceu:cadmium_dust",
                "32x gtceu:indium_dust"], [GTValues.VA[GTValues.IV]], [4500]],
        ["gtceu:grossular_front_pro", [3], ["gtceu:grossular_front 4000"],
            ["64x gtceu:calcium_dust", "64x gtceu:calcium_dust", "64x gtceu:aluminium_dust", "64x gtceu:aluminium_dust", "64x gtceu:tungsten_dust",
                "16x gtceu:thallium_dust"], [GTValues.VA[GTValues.LuV]], [5500]],
        ["gtceu:monazite_front_pro", [4], ["gtceu:monazite_front 4000"],
            ["64x gtceu:erbium_dust", "64x gtceu:neodymium_dust", "48x gtceu:thorium_dust", "32x gtceu:lanthanum_dust", "16x gtceu:lutetium_dust",
                "8x gtceu:europium_dust"], [GTValues.VA[GTValues.ZPM]], [5500]],
        ["gtceu:nickel_front_pro", [5], ["gtceu:nickel_front 4000"],
            ["64x gtceu:nickel_dust", "64x gtceu:nickel_dust", "64x gtceu:cobalt_dust", "64x gtceu:cobalt_dust", "32x gtceu:iron_dust",
                "32x gtceu:rhodium_dust"], [GTValues.VA[GTValues.IV]], [4500]],
        ["gtceu:platinum_front_pro", [6], ["gtceu:platinum_front 4000"],
            ["64x gtceu:platinum_dust", "48x gtceu:nickel_dust", "32x gtceu:iridium_dust", "32x gtceu:osmium_dust", "32x gtceu:palladium_dust",
                "32x gtceu:cobalt_dust"], [GTValues.VA[GTValues.LuV]], [5500]],
        ["gtceu:pyrope_front_pro", [7], ["gtceu:pyrope_front 4000"],
            ["64x gtceu:magnesium_dust", "64x gtceu:magnesium_dust", "64x gtceu:aluminium_dust", "64x gtceu:manganese_dust", "64x gtceu:boron_dust",
                "48x gtceu:silicon_dust"], [GTValues.VA[GTValues.EV]], [3500]],
        ["gtceu:redstone_front_pro", [8], ["gtceu:redstone_front 4000"],
            ["64x minecraft:redstone", "64x minecraft:redstone", "64x gtceu:manganese_dust", "64x gtceu:manganese_dust", "32x gtceu:yttrium_dust",
                "16x gtceu:ytterbium_dust"], [GTValues.VA[GTValues.IV]], [4500]],
        ["gtceu:spessartine_front_pro", [9], ["gtceu:spessartine_front 4000"],
            ["64x gtceu:manganese_dust", "64x gtceu:manganese_dust", "64x gtceu:aluminium_dust", "32x gtceu:aluminium_dust",
                "32x gtceu:palladium_dust", "16x gtceu:strontium_dust"], [GTValues.VA[GTValues.LuV]], [5500]],
        ["gtceu:sphalerite_front_pro", [10], ["gtceu:sphalerite_front 4000"],
            ["64x gtceu:zinc_dust", "64x gtceu:zinc_dust", "64x gtceu:iron_dust", "32x gtceu:iron_dust", "64x gtceu:indium_dust",
                "64x gtceu:gallium_dust"], [GTValues.VA[GTValues.LuV]], [5500]],
        ["gtceu:pentlandite_front_pro", [11], ["gtceu:pentlandite_front 4000"],
            ["64x gtceu:iron_dust", "64x gtceu:iron_dust", "64x gtceu:nickel_dust", "64x gtceu:nickel_dust", "64x gtceu:bismuth_dust",
                "48x gtceu:ruthenium_dust"], [GTValues.VA[GTValues.LuV]], [5500]],
        ["gtceu:enriched_naquadah_front_pro", [12], ["gtceu:enriched_naquadah_front 4000"],
            ["64x gtceu:enriched_naquadah_dust", "64x gtceu:enriched_naquadah_dust", "64x gtceu:naquadah_dust", "32x gtceu:naquadah_dust",
                "64x gtceu:naquadria_dust", "32x gtceu:trinium_dust"], [GTValues.VA[GTValues.ZPM]], [9500]]
    ]);

    gtr.assembly_line("gtceu:isa_mill")
        .itemInputs("gtceu:luv_machine_hull", "2x kubejs:inconel_625_gearbox", "8x gtceu:double_inconel_625_plate", "8x #gtceu:circuits/luv",
            "4x gtceu:luv_conveyor_module", "4x gtceu:inconel_792_gear", "16x gtceu:small_inconel_625_gear", "32x gtceu:tantalloy_61_screw",
            "8x gtceu:titanium_plate", "4x gtceu:niobium_titanium_quadruple_cable")
        .inputFluids("gtceu:soldering_alloy 5760", "gtceu:lubricant 6000", "gtceu:zeron_100 1152").itemOutputs("gtceu:isa_mill")
        .EUt(GTValues.VA[GTValues.LuV]).duration(2400)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:iv_macerator")).dataStack(Registries.getItemStack("gtceu:data_orb")).EUt(GTValues.VA[GTValues.IV]).CWUt(96))

    gtr.assembly_line("gtceu:flotation_cell_regulator")
        .itemInputs("gtceu:luv_machine_hull", "2x kubejs:flotation_cell", "8x gtceu:double_hastelloy_n_75_plate", "8x gtceu:double_incoloy_ma_956_plate",
            "8x #gtceu:circuits/luv", "2x gtceu:luv_electric_pump", "4x gtceu:stellite_gear", "16x gtceu:small_hastelloy_n_75_gear",
            "32x gtceu:tungsten_steel_foil", "4x gtceu:vanadium_gallium_quadruple_cable")
        .inputFluids("gtceu:soldering_alloy 5760", "gtceu:lubricant 6000", "gtceu:watertight_steel 1152")
        .itemOutputs("gtceu:flotation_cell_regulator").EUt(GTValues.VA[GTValues.LuV]).duration(2400)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:iv_ore_washer")).dataStack(Registries.getItemStack("gtceu:data_orb")).EUt(GTValues.VA[GTValues.IV]).CWUt(96))

    batch(gtr, "assembler", ["itemInputs", "inputFluids", "itemOutputs", "EUt", "duration"], [
        ["kubejs:inconel_625_casing",
            ["2x gtceu:ev_machine_hull", "4x gtceu:double_inconel_625_plate", "8x gtceu:double_hsse_plate", "16x gtceu:inconel_625_bolt"],
            ["gtceu:titanium 1152"], ["2x kubejs:inconel_625_casing"], [GTValues.VA[GTValues.EV]], [480]],
        ["kubejs:inconel_625_pipe",
            ["2x gtceu:hsss_frame", "4x gtceu:double_inconel_625_plate", "8x gtceu:double_hsse_plate", "16x gtceu:inconel_625_bolt"],
            ["gtceu:soldering_alloy 1152"], ["2x kubejs:inconel_625_pipe"], [GTValues.VA[GTValues.EV]], [480]],
        ["kubejs:inconel_625_gearbox",
            ["gtceu:hsse_frame", "3x gtceu:inconel_625_gear", "6x gtceu:small_hsss_gear", "16x gtceu:hssg_bolt", "2x gtceu:tungsten_grinding_head"],
            ["gtceu:zeron_100 576"], ["2x kubejs:inconel_625_gearbox"], [GTValues.VA[GTValues.LuV]], [600]],
        ["kubejs:hastelloy_n_75_casing",
            ["2x gtceu:ev_machine_hull", "4x gtceu:double_nichrome_plate", "4x gtceu:double_watertight_steel_plate", "2x gtceu:long_hssg_rod",
                "16x gtceu:hastelloy_n_75_bolt"], ["gtceu:stainless_steel 1152"], ["2x kubejs:hastelloy_n_75_casing"], [GTValues.VA[GTValues.IV]],
            [500]],
        ["kubejs:hastelloy_n_75_gearbox",
            ["gtceu:hssg_frame", "4x gtceu:double_hssg_plate", "3x gtceu:hastelloy_n_75_gear", "6x gtceu:hastelloy_n_75_gear",
                "16x gtceu:tungsten_carbide_bolt"], ["gtceu:hastelloy_x 576"], ["2x kubejs:hastelloy_n_75_gearbox"], [GTValues.VA[GTValues.LuV]],
            [280]],
        ["kubejs:hastelloy_n_75_pipe",
            ["gtceu:watertight_steel_frame", "6x gtceu:double_hastelloy_n_75_plate", "4x gtceu:tungsten_steel_small_fluid_pipe"],
            ["gtceu:soldering_alloy 1152"], ["2x kubejs:hastelloy_n_75_pipe"], [GTValues.VA[GTValues.EV]], [480]]
    ]);

    gtr.assembler("kubejs:flotation_cell")
        .itemInputs("7x gtceu:hastelloy_n_75_plate", "gtceu:assembly_line_grating", "gtceu:iv_electric_pump")
        .itemOutputs("kubejs:flotation_cell").EUt(GTValues.VA[GTValues.IV]).duration(400)

    gtr.assembler("kubejs:red_steel_casing")
        .circuit(6).itemInputs("gtceu:hsla_steel_frame", "2x gtceu:titanium_carbide_plate", "4x gtceu:double_red_steel_plate")
        .itemOutputs("2x kubejs:red_steel_casing").EUt(GTValues.VA[GTValues.HV]).duration(600)

    gtr.assembler("gtceu:vacuum_drying_furnace")
        .itemInputs("gtceu:hsse_frame", "4x gtceu:iv_dehydrator", "2x gtceu:double_titanium_tungsten_carbide_plate", "4x #gtceu:circuits/iv",
            "2x gtceu:iv_electric_piston", "3x gtceu:iridium_gear", "6x gtceu:small_titanium_gear", "24x gtceu:tantalloy_61_screw")
        .inputFluids("gtceu:platinum 1152").itemOutputs("gtceu:vacuum_drying_furnace").EUt(GTValues.VA[GTValues.HV]).duration(600)

    batch(gtr, "forming_press", [["notConsumable", "gtceu:ball_casting_mold"], "itemInputs", "itemOutputs", ["EUt", GTValues.VA[GTValues.IV]], ["duration", 800]], [
        ["kubejs:grindball_soapstone", ["16x gtceu:soapstone_dust", "2x gtceu:soldering_alloy_ingot"], ["kubejs:grindball_soapstone"]],
        ["kubejs:grindball_aluminium", ["16x gtceu:aluminium_dust", "2x gtceu:soldering_alloy_ingot"], ["kubejs:grindball_aluminium"]]
    ]);

    gtr.distillation_tower("gtceu:turpentine")
        .inputFluids("gtceu:steam_cracked_turpentine 1000").outputFluids("gtceu:turpentine 1000", "gtceu:naphtha 900")
        .EUt(GTValues.VA[GTValues.EV]).duration(400)

    gtr.cracker("gtceu:steam_cracked_turpentine")
        .circuit(1).inputFluids("gtceu:leached_turpentine 1000", "gtceu:steam 1000").outputFluids("gtceu:steam_cracked_turpentine 1000")
        .EUt(GTValues.VA[GTValues.HV]).duration(200)

    gtr.chemical_bath("gtceu:leached_turpentine")
        .itemInputs("#minecraft:logs").inputFluids("gtceu:naphtha 1000").outputFluids("gtceu:leached_turpentine 1000")
        .EUt(GTValues.VA[GTValues.HV]).duration(80)

    batch(gtr, "chemical_reactor", [["circuit", 1], "itemInputs", "inputFluids", "itemOutputs", "EUt", "duration"], [
        ["gtceu:potash_dust", ["2x gtceu:potassium_dust"], ["gtceu:oxygen 1000"], ["3x gtceu:potash_dust"], [7], [120]],
        ["gtceu:calcite_dust", ["2x gtceu:quicklime_dust"], ["gtceu:carbon_dioxide 1000"], ["5x gtceu:calcite_dust"], [30], [80]],
        ["gtceu:calcium_hydroxide_dust", ["2x gtceu:quicklime_dust"], ["minecraft:water 1000"], ["5x gtceu:calcium_hydroxide_dust"], [120], [100]]
    ]);

    gtr.forge_hammer("gtceu:special_ceramics_dust")
        .itemInputs("minecraft:brown_glazed_terracotta").itemOutputs("gtceu:special_ceramics_dust").EUt(GTValues.VA[GTValues.IV]).duration(20)

    gtr.extruder("kubejs:special_ceramics")
        .itemInputs("2x gtceu:special_ceramics_dust").notConsumable("gtceu:plate_extruder_mold").itemOutputs("kubejs:special_ceramics")
        .EUt(GTValues.VA[GTValues.HV]).duration(20)

    gtr.circuit_assembler("kubejs:hui_circuit_1")
        .itemInputs("gtceu:fiber_reinforced_printed_circuit_board", "16x gtceu:yellow_garnet_plate", "8x gtceu:soc", "32x gtceu:nor_memory_chip",
            "8x gtceu:aluminium_single_wire", "gtceu:aluminium_rotor")
        .itemOutputs("kubejs:hui_circuit_1").EUt(GTValues.VA[GTValues.IV]).duration(320).cleanroom(CleanroomType.CLEANROOM)

    batch(gtr, "precision_assembler", ["itemInputs", "inputFluids", "itemOutputs", "EUt", "duration", ["cleanroom", CleanroomType.CLEANROOM]], [
        ["kubejs:hui_circuit_2", ["kubejs:hui_circuit_1", "8x gtceu:blue_topaz_plate", "16x gtceu:nand_memory_chip", "8x gtceu:platinum_single_wire"],
            ["gtceu:polyethylene 288", "gtceu:vanadium 288", "gtceu:bronze 144", "gtceu:annealed_copper 144"], ["kubejs:hui_circuit_2"],
            [GTValues.VA[GTValues.LuV]], [200]],
        ["kubejs:hui_circuit_3",
            ["kubejs:hui_circuit_2", "8x gtceu:sodalite_plate", "gtceu:raw_crystal_chip", "8x gtceu:niobium_titanium_single_wire"],
            ["gtceu:polyvinyl_chloride 288", "gtceu:yttrium 288", "gtceu:black_steel 144", "gtceu:eglin_steel 144"], ["kubejs:hui_circuit_3"],
            [GTValues.VA[GTValues.LuV]], [200]],
        ["kubejs:hui_circuit_4",
            ["kubejs:hui_circuit_3", "8x gtceu:red_garnet_plate", "16x gtceu:qbit_cpu_chip", "8x gtceu:vanadium_gallium_single_wire"],
            ["gtceu:polytetrafluoroethylene 288", "gtceu:lutetium 288", "gtceu:tantalloy_61 144", "gtceu:hastelloy_n 144"], ["kubejs:hui_circuit_4"],
            [GTValues.VA[GTValues.ZPM]], [200]],
        ["kubejs:hui_circuit_5",
            ["kubejs:hui_circuit_4", "8x gtceu:opal_plate", "gtceu:neuro_processing_unit", "8x gtceu:yttrium_barium_cuprate_single_wire"],
            ["gtceu:polybenzimidazole 288", "gtceu:cerium 288", "gtceu:indalloy_140 144", "gtceu:lafium 144"], ["kubejs:hui_circuit_5"],
            [GTValues.VA[GTValues.UV]], [200]],
        ["gtlcore:improved_superconductor_coil", ["gtceu:superconducting_coil", "2x kubejs:special_ceramics", "kubejs:hui_circuit_1"],
            ["gtceu:mar_m_200_steel 1152", "gtceu:europium 144"], ["gtlcore:improved_superconductor_coil"], [GTValues.VA[GTValues.LuV]], [200]],
        ["gtlcore:compressed_fusion_coil", ["gtceu:fusion_coil", "kubejs:inverter", "kubejs:hui_circuit_2"],
            ["gtceu:tanmolyium 1152", "gtceu:americium 144"], ["gtlcore:compressed_fusion_coil"], [GTValues.VA[GTValues.ZPM]], [200]],
        ["gtlcore:advanced_compressed_fusion_coil", ["gtlcore:compressed_fusion_coil", "gtceu:quantum_star", "kubejs:hui_circuit_3"],
            ["gtceu:artherium_sn 1152", "gtceu:mithril 144"], ["gtlcore:advanced_compressed_fusion_coil"], [GTValues.VA[GTValues.UV]], [200]],
        ["gtlcore:compressed_fusion_coil_mk2_prototype", ["gtlcore:advanced_fusion_coil", "gtceu:gravi_star", "kubejs:hui_circuit_4"],
            ["gtceu:dalisenite 1152", "gtceu:bohrium 144"], ["gtlcore:compressed_fusion_coil_mk2_prototype"], [GTValues.VA[GTValues.UHV]], [200]],
        ["gtlcore:compressed_fusion_coil_mk2", ["gtlcore:fusion_coil_mk2", "kubejs:unstable_star", "kubejs:hui_circuit_5"],
            ["gtceu:cinobite 1152", "gtceu:vibranium 144"], ["gtlcore:compressed_fusion_coil_mk2"], [GTValues.VA[GTValues.UEV]], [200]],
        ["gtceu:luv_compressed_fusion_reactor",
            ["gtceu:luv_fusion_reactor", "gtlcore:improved_superconductor_coil", "16x kubejs:hui_circuit_1", "16x gtceu:double_osmiridium_plate"],
            ["gtceu:niobium_titanium 864", "gtceu:indalloy_140 1152", "gtceu:soldering_alloy 2304", "gtceu:polybenzimidazole 2304"],
            ["gtceu:luv_compressed_fusion_reactor"], [GTValues.VA[GTValues.LuV]], [400]],
        ["gtceu:zpm_compressed_fusion_reactor",
            ["gtceu:zpm_fusion_reactor", "gtlcore:compressed_fusion_coil", "16x kubejs:hui_circuit_2", "16x gtceu:double_europium_plate"],
            ["gtceu:vanadium_gallium 864", "gtceu:indalloy_140 1152", "gtceu:soldering_alloy 2304", "gtceu:polybenzimidazole 2304"],
            ["gtceu:zpm_compressed_fusion_reactor"], [GTValues.VA[GTValues.ZPM]], [400]],
        ["gtceu:uv_compressed_fusion_reactor",
            ["gtceu:uv_fusion_reactor", "gtlcore:advanced_compressed_fusion_coil", "16x kubejs:hui_circuit_3", "16x gtceu:double_americium_plate"],
            ["gtceu:yttrium_barium_cuprate 864", "gtceu:indalloy_140 1152", "gtceu:soldering_alloy 2304", "gtceu:polybenzimidazole 2304"],
            ["gtceu:uv_compressed_fusion_reactor"], [GTValues.VA[GTValues.UV]], [400]],
        ["gtceu:uhv_compressed_fusion_reactor",
            ["gtceu:uhv_fusion_reactor", "gtlcore:compressed_fusion_coil_mk2_prototype", "16x kubejs:hui_circuit_4",
                "16x gtceu:double_orichalcum_plate"],
            ["gtceu:europium 864", "gtceu:indalloy_140 1152", "gtceu:soldering_alloy 2304", "gtceu:polybenzimidazole 2304"],
            ["gtceu:uhv_compressed_fusion_reactor"], [GTValues.VA[GTValues.UHV]], [400]],
        ["gtceu:uev_compressed_fusion_reactor",
            ["gtceu:uev_fusion_reactor", "gtlcore:compressed_fusion_coil_mk2", "16x kubejs:hui_circuit_5", "16x gtceu:double_seaborgium_plate"],
            ["gtceu:mithril 864", "gtceu:indalloy_140 1152", "gtceu:soldering_alloy 2304", "gtceu:polybenzimidazole 2304"],
            ["gtceu:uev_compressed_fusion_reactor"], [GTValues.VA[GTValues.UEV]], [400]]
    ]);

    batch(gtr, "assembler", ["itemInputs", "inputFluids", "itemOutputs", "EUt", ["duration", 100], ["cleanroom", CleanroomType.CLEANROOM]], [
        ["gtlcore:advanced_fusion_coil",
            ["gtlcore:improved_superconductor_coil", "2x gtceu:luv_field_generator", "gtceu:iv_electric_pump", "4x gtceu:neutron_reflector",
                "kubejs:hui_circuit_2", "4x #gtceu:circuits/luv", "gtceu:naquadah_normal_fluid_pipe", "4x gtceu:duranium_plate"],
            ["gtceu:yttrium_barium_cuprate 576"], ["gtlcore:advanced_fusion_coil"], [GTValues.VA[GTValues.UV]]],
        ["gtlcore:fusion_coil_mk2",
            ["gtlcore:compressed_fusion_coil_mk2_prototype", "2x gtceu:zpm_field_generator", "gtceu:luv_electric_pump", "4x gtceu:neutron_reflector",
                "kubejs:hui_circuit_3", "4x #gtceu:circuits/zpm", "gtceu:naquadah_large_fluid_pipe", "4x gtceu:dubnium_plate"],
            ["gtceu:yttrium_barium_cuprate 576"], ["gtlcore:fusion_coil_mk2"], [GTValues.VA[GTValues.UHV]]],
        ["gtlcore:fusion_casing_mk4",
            ["gtceu:uhv_machine_casing", "gtlcore:advanced_fusion_coil", "2x kubejs:uhv_voltage_coil", "2x kubejs:hui_circuit_4",
                "gtceu:uv_field_generator", "6x gtceu:orichalcum_plate"], ["gtceu:polybenzimidazole 1152"], ["2x gtlcore:fusion_casing_mk4"],
            [GTValues.VA[GTValues.UHV]]],
        ["gtlcore:fusion_casing_mk5",
            ["gtceu:uev_machine_casing", "gtlcore:fusion_coil_mk2", "2x kubejs:uev_voltage_coil", "2x kubejs:hui_circuit_5",
                "gtceu:uhv_field_generator", "6x gtceu:seaborgium_plate"], ["gtceu:polybenzimidazole 2304"], ["2x gtlcore:fusion_casing_mk5"],
            [GTValues.VA[GTValues.UEV]]]
    ]);

    gtr.assembly_line("gtceu:uhv_fusion_reactor")
        .itemInputs("gtlcore:advanced_fusion_coil", "4x #gtceu:circuits/uev", "gtceu:gravi_star", "gtceu:double_orichalcum_plate",
            "2x gtceu:uv_field_generator", "64x kubejs:nm_chip", "32x gtceu:ruthenium_trinium_americium_neutronate_single_wire")
        .inputFluids("gtceu:soldering_alloy 1152", "gtceu:europium 1152").itemOutputs("gtceu:uhv_fusion_reactor").EUt(GTValues.VA[GTValues.UV])
        .duration(1000)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:uv_fusion_reactor")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(GTValues.VA[GTValues.UHV]).CWUt(240))

    gtr.assembly_line("gtceu:uev_fusion_reactor")
        .itemInputs("gtlcore:fusion_coil_mk2", "4x #gtceu:circuits/uiv", "kubejs:unstable_star", "gtceu:double_seaborgium_plate",
            "2x gtceu:uhv_field_generator", "64x kubejs:nm_chip", "64x kubejs:nm_chip", "32x gtceu:enderite_single_wire")
        .inputFluids("gtceu:soldering_alloy 1152", "gtceu:mithril 1152").itemOutputs("gtceu:uev_fusion_reactor").EUt(GTValues.VA[GTValues.UHV])
        .duration(1000)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:uhv_fusion_reactor")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(GTValues.VA[GTValues.UEV]).CWUt(600))

    gtr.assembly_line("gtceu:mega_distillery")
        .itemInputs("16x gtceu:distillation_tower", "16x gtceu:evaporation_plant", "8x gtceu:tungsten_steel_huge_fluid_pipe", "16x gtceu:uhv_electric_pump",
            "4x gtceu:uev_sensor", "4x #gtceu:circuits/uiv", "32x gtceu:annealed_copper_hex_wire", "32x gtceu:watertight_steel_plate")
        .inputFluids("gtceu:soldering_alloy 1152", "gtceu:indalloy_140 1152", "gtceu:stainless_steel 2304", "gtceu:polyvinyl_chloride 2880")
        .itemOutputs("gtceu:mega_distillery").EUt(GTValues.VA[GTValues.UHV]).duration(800)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:large_distillery")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(GTValues.VA[GTValues.UHV]).CWUt(600))

    gtr.assembly_line("gtceu:nano_core")
        .itemInputs("16x gtceu:opv_buffer", "16x gtceu:cosmicneutronium_nanoswarm", "16x gtceu:suprachronal_assembly_line",
            "8x gtlcore:component_assembly_line_casing_opv", "32x #gtceu:circuits/opv", "16x gtceu:cosmicneutronium_plate")
        .inputFluids("gtceu:super_mutated_living_solder 4608", "gtceu:indalloy_140 4608", "gtceu:naquadria 4608", "gtceu:hastelloyk_243 4608")
        .itemOutputs("gtceu:nano_core").EUt(GTValues.VA[GTValues.UXV]).duration(800)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:nano_forge_3")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(GTValues.VA[GTValues.OpV]).CWUt(1200))

    gtr.compressor("gtceu:graphite_ingot")
        .itemInputs("gtceu:graphite_dust").itemOutputs("gtceu:graphite_ingot").EUt(GTValues.VA[GTValues.LV]).duration(300)

    gtr.laser_engraver("avaritia:singularity")
        .itemInputs("16x gtceu:magmatter_block").itemInputs(Item.of("avaritia:singularity", `{Id:"avaritia:spacetime"}`).weakNBT())
        .itemOutputs("avaritia:singularity").EUt(GTValues.VA[GTValues.MAX] * 262144).duration(1600)
});
