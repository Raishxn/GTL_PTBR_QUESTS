// priority: 95
// 加热线圈、特殊外壳与多方块结构材料。
// 由 gtceu.js 按既有阶段顺序执行，本文件只登记配方，不依赖文件名排序。
global.gtlPack.register("coils_and_casings", event => {
    const gtr = event.recipes.gtceu;
    const batch = global.gtlPack.batch;

    // 加热线圈
    const coils = [["uhv", "1966080", "abyssalalloy", "europium", "tritanium"], ["uev", "7864320", "titansteel", "mithril", "abyssalalloy"]]
    coils.forEach((coil) => {
        gtr.assembler("kubejs:" + coil[0] + "_voltage_coil")
            .itemInputs("kubejs:magnetic_netherite_rod", "16x #forge:fine_wires/" + coil[2]).itemOutputs("kubejs:" + coil[0] + "_voltage_coil")
            .EUt(coil[1]).duration(200).circuit(1)
        gtr.assembler("kubejs:" + coil[2] + "_coil_block")
            .itemInputs("8x gtceu:" + coil[2] + "_double_wire", "8x gtceu:" + coil[3] + "_foil").inputFluids("gtceu:" + coil[4] + " 144")
            .itemOutputs("kubejs:" + coil[2] + "_coil_block").EUt(coil[1]).duration(800)
    })
    const coilas = [["uiv", "31457280", "adamantine", "neutronium", "titansteel"], ["uxv", "125829120", "naquadriatictaranium", "taranium", "adamantine"],
        ["opv", "503316480", "starmetal", "crystalmatrix", "naquadriatictaranium"]]
    coilas.forEach((coil) => {
        gtr.assembler("kubejs:" + coil[0] + "_voltage_coil")
            .itemInputs("gtceu:attuned_tengam_rod", "16x #forge:fine_wires/" + coil[2]).itemOutputs("kubejs:" + coil[0] + "_voltage_coil")
            .EUt(coil[1]).duration(200).circuit(1)
        gtr.assembler("kubejs:" + coil[2] + "_coil_block")
            .itemInputs("8x gtceu:" + coil[2] + "_double_wire", "8x gtceu:" + coil[3] + "_foil").inputFluids("gtceu:" + coil[4] + " 144")
            .itemOutputs("kubejs:" + coil[2] + "_coil_block").EUt(coil[1]).duration(800)
    })
    gtr.assembler("kubejs:max_voltage_coil")
        .itemInputs("gtceu:attuned_tengam_rod", "16x #forge:fine_wires/cosmicneutronium").itemOutputs("kubejs:max_voltage_coil").EUt(2013265920)
        .duration(200).circuit(1)

    gtr.assembly_line("kubejs:infinity_coil_block")
        .itemInputs("gtlcore:qft_coil", "8x gtceu:infinity_double_wire", "16x gtceu:draconium_screw", "64x gtceu:kevlar_foil", "32x gtceu:radox_foil")
        .inputFluids("gtceu:starmetal 576", "gtceu:crystalmatrix 576").itemOutputs("kubejs:infinity_coil_block").EUt(GTValues.VA[GTValues.MAX])
        .duration(800)
        .stationResearch(b => b.researchStack(Registries.getItemStack("kubejs:starmetal_coil_block")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(GTValues.VA[GTValues.MAX]).CWUt(2048))

    gtr.assembly_line("kubejs:hypogen_coil_block")
        .itemInputs("gtlcore:qft_coil", "8x gtceu:hypogen_double_wire", "16x gtceu:transcendentmetal_screw", "64x gtceu:radox_foil", "32x gtceu:chaos_foil")
        .inputFluids("gtceu:infinity 576", "gtceu:cosmicneutronium 576").itemOutputs("kubejs:hypogen_coil_block")
        .EUt(4 * GTValues.VA[GTValues.MAX]).duration(800)
        .stationResearch(b => b.researchStack(Registries.getItemStack("kubejs:infinity_coil_block")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(GTValues.VA[GTValues.MAX]).CWUt(4096))

    gtr.assembly_line("kubejs:eternity_coil_block")
        .itemInputs("gtlcore:qft_coil", "8x gtceu:spacetime_double_wire", "4x gtceu:eternity_rod", "avaritia:eternal_singularity",
            "64x kubejs:cosmic_fabric", "64x gtceu:radox_foil", "64x gtceu:radox_foil", "64x gtceu:chaos_foil")
        .inputFluids("gtceu:hypogen 576", "gtceu:spacetime 576").itemOutputs("kubejs:eternity_coil_block").EUt(16 * GTValues.VA[GTValues.MAX])
        .duration(800)
        .stationResearch(b => b.researchStack(Registries.getItemStack("kubejs:hypogen_coil_block")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(GTValues.VA[GTValues.MAX]).CWUt(8192))

    batch(gtr, "assembler", ["itemInputs", "itemOutputs", ["EUt", 30720], ["duration", 200]], [
        ["kubejs:ingot_field_shape",
            ["2x gtceu:polyphenylene_sulfide_plate", "2x gtceu:polybenzimidazole_plate", "gtceu:uv_field_generator", "gtceu:ingot_casting_mold"],
            ["kubejs:ingot_field_shape"]],
        ["kubejs:ball_field_shape",
            ["2x gtceu:polyphenylene_sulfide_plate", "2x gtceu:polybenzimidazole_plate", "gtceu:uv_field_generator", "gtceu:ball_casting_mold"],
            ["kubejs:ball_field_shape"]]
    ]);

    gtr.forming_press("kubejs:scintillator_crystal")
        .itemInputs("gtceu:vibranium_plate", "gtceu:thallium_thulium_doped_caesium_iodide_dust", "gtceu:polycyclic_aromatic_mixture_dust",
            "gtceu:cadmium_tungstate_dust", "gtceu:bismuth_germanate_dust", "2x gtceu:mithril_plate")
        .itemOutputs("kubejs:scintillator_crystal").EUt(GTValues.VA[GTValues.UHV]).duration(280).cleanroom(GTLCleanroomType.LAW_CLEANROOM)

    gtr.chemical_reactor("gtceu:caesium_iodide_dust")
        .itemInputs("gtceu:caesium_dust", "gtceu:iodine_dust").itemOutputs("2x gtceu:caesium_iodide_dust").EUt(30).duration(100)

    gtr.electric_blast_furnace("gtceu:thallium_thulium_doped_caesium_iodide_dust")
        .itemInputs("gtceu:caesium_iodide_dust", "gtceu:small_thulium_dust", "gtceu:small_thallium_dust")
        .itemOutputs("gtceu:thallium_thulium_doped_caesium_iodide_dust").EUt(120).duration(260).blastFurnaceTemp(2853)

    gtr.assembler_module("kubejs:scintillator")
        .itemInputs("12x gtceu:highurabilityompoundteel_screw", "12x gtceu:fine_cinobite_wire", "6x gtceu:zylon_foil", "4x gtceu:cinobite_plate",
            "4x gtceu:echoite_plate", "kubejs:scintillator_crystal", "gtlcore:separation_electromagnet", "gtceu:double_astraltitanium_plate")
        .itemOutputs("kubejs:scintillator")
        .inputFluids("gtceu:trinium_titanium 432", "gtceu:soldering_alloy 288", "gtceu:mutated_living_solder 144").EUt(GTValues.VA[GTValues.UEV])
        .duration(400).addData("SEPMTier", 2)

    gtr.assembler("gtceu:rare_earth_centrifugal")
        .itemInputs("8x gtceu:europium_plate", "16x gtceu:uhv_electric_motor", "16x gtceu:hsss_gear", "8x gtceu:long_mithril_rod", "16x gtceu:hsse_plate",
            "64x gtceu:fine_naquadria_wire", "4x #gtceu:circuits/uhv", "32x gtceu:stellite_plate")
        .itemOutputs("gtceu:rare_earth_centrifugal").inputFluids("gtceu:soldering_alloy 1296").EUt(GTValues.VA[GTValues.UEV]).duration(1000)

    batch(gtr, "magic_manufacturer", ["notConsumable", "circuit", "outputFluids", "EUt", "duration"], [
        ["gtceu:mana_0", ["gtceu:uev_field_generator"], [1], ["gtceu:mana 100"], [GTValues.VA[GTValues.UEV]], [20]],
        ["gtceu:mana_1", ["gtceu:uiv_field_generator"], [1], ["gtceu:mana 1000"], [GTValues.VA[GTValues.UIV]], [20]],
        ["gtceu:mana_2", ["gtceu:uxv_field_generator"], [1], ["gtceu:mana 10000"], [GTValues.VA[GTValues.UXV]], [20]],
        ["gtceu:mana_3", ["gtceu:opv_field_generator"], [1], ["gtceu:mana 100000"], [GTValues.VA[GTValues.OpV]], [20]],
        ["gtceu:mana_4", ["4x gtceu:uev_field_generator"], [2], ["gtceu:mana 400"], [GTValues.VA[GTValues.UEV]], [40]],
        ["gtceu:mana_5", ["4x gtceu:uiv_field_generator"], [2], ["gtceu:mana 4000"], [GTValues.VA[GTValues.UIV]], [40]],
        ["gtceu:mana_6", ["4x gtceu:uxv_field_generator"], [2], ["gtceu:mana 40000"], [GTValues.VA[GTValues.UXV]], [40]],
        ["gtceu:mana_7", ["4x gtceu:opv_field_generator"], [2], ["gtceu:mana 400000"], [GTValues.VA[GTValues.OpV]], [40]],
        ["gtceu:mana_8", ["16x gtceu:uev_field_generator"], [3], ["gtceu:mana 1600"], [GTValues.VA[GTValues.UEV]], [80]],
        ["gtceu:mana_9", ["16x gtceu:uiv_field_generator"], [3], ["gtceu:mana 16000"], [GTValues.VA[GTValues.UIV]], [80]],
        ["gtceu:mana_10", ["16x gtceu:uxv_field_generator"], [3], ["gtceu:mana 160000"], [GTValues.VA[GTValues.UXV]], [80]],
        ["gtceu:mana_11", ["16x gtceu:opv_field_generator"], [3], ["gtceu:mana 1600000"], [GTValues.VA[GTValues.OpV]], [80]],
        ["gtceu:mana_12", ["64x gtceu:uev_field_generator"], [4], ["gtceu:mana 6400"], [GTValues.VA[GTValues.UEV]], [160]],
        ["gtceu:mana_13", ["64x gtceu:uiv_field_generator"], [4], ["gtceu:mana 64000"], [GTValues.VA[GTValues.UIV]], [160]],
        ["gtceu:mana_14", ["64x gtceu:uxv_field_generator"], [4], ["gtceu:mana 640000"], [GTValues.VA[GTValues.UXV]], [160]],
        ["gtceu:mana_15", ["64x gtceu:opv_field_generator"], [4], ["gtceu:mana 6400000"], [GTValues.VA[GTValues.OpV]], [160]]
    ]);

    batch(gtr, "decay_hastener", ["inputFluids", "itemOutputs", ["EUt", 480], "duration"], [
        ["kubejs:rutherfordium_dust", ["gtceu:seaborgium 144"], ["gtceu:rutherfordium_dust"], [4000]],
        ["kubejs:rutherfordium_dust1", ["gtceu:actinium 144"], ["gtceu:rutherfordium_dust"], [8000]],
        ["kubejs:actinium_dust", ["gtceu:radium 144"], ["gtceu:actinium_dust"], [2000]]
    ]);

    gtr.assembler("kubejs:plasma_containment_cell")
        .itemInputs("4x gtceu:osmiridium_plate", "gtceu:uv_field_generator", "gtceu:long_naquadah_alloy_rod", "2x gtceu:fusion_glass",
            "8x gtceu:fluxed_electrum_foil")
        .itemOutputs("kubejs:plasma_containment_cell").inputFluids("gtceu:mutated_living_solder 576").EUt(GTValues.VA[GTValues.ZPM])
        .duration(400).cleanroom(CleanroomType.CLEANROOM)

    batch(gtr, "assembler", ["itemInputs", "itemOutputs", "inputFluids", "EUt", "duration"], [
        ["kubejs:magic_core",
            ["8x gtceu:double_stellite_100_plate", "kubejs:bose_einstein_cooling_container", "minecraft:conduit", "8x gtceu:double_enderium_plate"],
            ["kubejs:magic_core"], ["gtceu:mutated_living_solder 576"], [GTValues.VA[GTValues.UV]], [400]],
        ["gtlcore:separation_electromagnet",
            ["64x gtceu:fine_yttrium_barium_cuprate_wire", "64x gtceu:fine_niobium_titanium_wire", "16x gtceu:polybenzimidazole_foil",
                "8x gtceu:niobium_nitride_plate", "gtceu:long_vanadium_gallium_rod"], ["gtlcore:separation_electromagnet"],
            ["gtceu:soldering_alloy 288"], [GTValues.VA[GTValues.ZPM]], [600]]
    ]);

    gtr.canner("kubejs:rhenium_plasma_containment_cell")
        .notConsumable("gtceu:naquadah_nanoswarm").itemInputs("kubejs:plasma_containment_cell")
        .itemOutputs("kubejs:rhenium_plasma_containment_cell").inputFluids("gtceu:degenerate_rhenium_plasma 1000").EUt(GTValues.VA[GTValues.LuV])
        .duration(20).cleanroom(CleanroomType.CLEANROOM)

    gtr.sps_crafting("gtceu:echoite_plasma")
        .itemInputs("16x gtceu:exquisite_echo_shard_gem", "kubejs:rhenium_plasma_containment_cell")
        .inputFluids("gtceu:mana 16000", "gtceu:enderium 1152", "gtceu:infuscolium 1152").outputFluids("gtceu:echoite_plasma 2304")
        .itemOutputs("kubejs:plasma_containment_cell").EUt(GTValues.VA[GTValues.UIV]).duration(400)

    gtr.sps_crafting("gtceu:bedrock_dust")
        .itemInputs("64x gtceu:compressed_stone_dust", "64x gtceu:compressed_stone_dust")
        .inputFluids("gtceu:mana 100000", "gtceu:thulium 9216", "gtceu:copernicium 9216").itemOutputs("gtceu:bedrock_dust")
        .EUt(GTValues.VA[GTValues.UIV]).duration(1200)

    batch(gtr, "bedrock_drilling_rig", ["chancedInput", "itemOutputs", ["EUt", GTValues.VA[GTValues.UEV]], "circuit", "duration"], [
        ["gtceu:bedrock_dust_1", ["kubejs:bedrock_drill", 10, 0], ["gtceu:bedrock_dust"], [1], [200]],
        ["gtceu:bedrock_dust_2", ["4x kubejs:bedrock_drill", 10, 0], ["4x gtceu:bedrock_dust"], [2], [400]],
        ["gtceu:bedrock_dust_3", ["16x kubejs:bedrock_drill", 10, 0], ["16x gtceu:bedrock_dust"], [3], [800]],
        ["gtceu:bedrock_dust_4", ["64x kubejs:bedrock_drill", 10, 0], ["64x gtceu:bedrock_dust"], [4], [1600]]
    ]);

    gtr.vacuum_freezer("gtceu:liquid_hydrogen")
        .inputFluids("gtceu:hydrogen 1000").outputFluids("gtceu:liquid_hydrogen 1000").EUt(7680).duration(240)

    batch(gtr, "matter_fabricator", ["itemInputs", ["circuit", 1], "outputFluids", "EUt", ["duration", 200]], [
        ["gtceu:uu_amplifier", ["kubejs:scrap"], ["gtceu:uu_amplifier 1"], [GTValues.VA[GTValues.UV]]],
        ["gtceu:uu_amplifier_a", ["kubejs:scrap_box"], ["gtceu:uu_amplifier 9"], [GTValues.VA[GTValues.UHV]]]
    ]);

    batch(gtr, "matter_fabricator", ["itemInputs", ["circuit", 2], "itemOutputs", "EUt", ["duration", 1]], [
        ["gtceu:uu_amplifier_1", ["kubejs:scrap"], ["64x ae2:matter_ball"], [GTValues.VA[GTValues.UV]]],
        ["gtceu:uu_amplifier_2", ["kubejs:scrap_box"], ["576x ae2:matter_ball"], [GTValues.VA[GTValues.UHV]]]
    ]);

    gtr.centrifuge("gtceu:free_electron_gas")
        .notConsumable("gtlcore:separation_electromagnet").inputFluids("gtceu:uu_matter 1000")
        .outputFluids("gtceu:free_electron_gas 1000", "gtceu:free_alpha_gas 500").EUt(GTValues.VA[GTValues.UV]).duration(200)

    gtr.centrifuge("gtceu:quark_gluon")
        .notConsumable("gtlcore:separation_electromagnet").inputFluids("gtceu:quark_gluon_plasma 1000")
        .outputFluids("gtceu:heavy_quarks 200", "gtceu:light_quarks 600", "gtceu:gluons 200").cleanroom(CleanroomType.CLEANROOM)
        .EUt(GTValues.VA[GTValues.UEV]).duration(100)

    gtr.fluid_solidifier("gtceu:degenerate_rhenium_plate")
        .notConsumable("gtceu:plate_casting_mold").inputFluids("gtceu:liquid_degenerate_rhenium 144")
        .itemOutputs("gtceu:degenerate_rhenium_plate").EUt(7).duration(400)

    gtr.macerator("gtceu:degenerate_rhenium_dust")
        .itemInputs("gtceu:degenerate_rhenium_plate").itemOutputs("gtceu:degenerate_rhenium_dust").EUt(GTValues.VA[GTValues.UIV]).duration(100)

    gtr.polarizer("kubejs:triplet_neutronium_sphere")
        .itemInputs("kubejs:neutronium_sphere").itemOutputs("kubejs:triplet_neutronium_sphere").EUt(5000000).duration(200)

    gtr.canner("kubejs:charged_triplet_neutronium_sphere")
        .notConsumable("gtceu:neutronium_nanoswarm").itemInputs("kubejs:triplet_neutronium_sphere").inputFluids("gtceu:free_alpha_gas 1000")
        .itemOutputs("kubejs:charged_triplet_neutronium_sphere").EUt(500000).duration(200).cleanroom(CleanroomType.CLEANROOM)

    batch(gtr, "assembler", ["itemInputs", "inputFluids", "itemOutputs", "EUt", ["duration", 400], ["cleanroom", CleanroomType.CLEANROOM]], [
        ["gtlcore:hyper_core",
            ["16x gtceu:highurabilityompoundteel_screw", "4x gtceu:naquadria_frame", "4x gtceu:naquadria_plate", "2x gtceu:uev_field_generator",
                "gtceu:naquadah_nanoswarm", "gtceu:uev_sensor", "gtceu:uev_emitter", "#gtceu:circuits/uev"], ["gtceu:mutated_living_solder 288"],
            ["gtlcore:hyper_core"], [GTValues.VA[GTValues.UEV]]],
        ["kubejs:annihilate_core",
            ["gtceu:quantumchromodynamically_confined_matter_frame", "kubejs:graviton_transducer", "kubejs:topological_manipulator_unit",
                "gtceu:uxv_field_generator", "2x #gtceu:circuits/uxv", "4x gtceu:double_cinobite_plate"], ["gtceu:super_mutated_living_solder 1296"],
            ["kubejs:annihilate_core"], [GTValues.VA[GTValues.UXV]]]
    ]);

    batch(gtr, "canner", ["notConsumable", "inputFluids", "itemInputs", "itemOutputs", "EUt", ["duration", 20], ["cleanroom", CleanroomType.CLEANROOM]], [
        ["kubejs:draconiumawakened_plasma_containment_cell", ["gtceu:draconium_nanoswarm"], ["gtceu:draconiumawakened_plasma 1000"],
            ["kubejs:plasma_containment_cell"], ["kubejs:draconiumawakened_plasma_containment_cell"], [GTValues.VA[GTValues.UXV]]],
        ["kubejs:dense_neutron_plasma_cell", ["gtceu:neutronium_nanoswarm"], ["gtceu:dense_neutron_plasma 1000"],
            ["kubejs:extremely_durable_plasma_cell"], ["kubejs:dense_neutron_plasma_cell"], [GTValues.VA[GTValues.UXV]]],
        ["kubejs:chaos_containment_unit", ["gtceu:cosmicneutronium_nanoswarm"], ["gtceu:chaos_plasma 1000"], ["kubejs:time_dilation_containment_unit"],
            ["kubejs:chaos_containment_unit"], [GTValues.VA[GTValues.OpV]]]
    ]);

    gtr.assembler("kubejs:neutronium_gearbox")
        .itemInputs("4x gtceu:neutronium_plate", "2x gtceu:neutronium_gear", "gtceu:neutronium_frame")
        .itemOutputs("2x kubejs:neutronium_gearbox").EUt(16).duration(50).circuit(4)

    batch(gtr, "precision_assembler", ["itemInputs", "inputFluids", "itemOutputs", "EUt", "duration", "cleanroom"], [
        ["kubejs:annihilation_constrainer",
            ["kubejs:hypercube", "8x kubejs:contained_reissner_nordstrom_singularity", "4x #gtceu:circuits/uxv", "16x gtceu:cosmicneutronium_foil"],
            ["gtceu:cinobite 1152", "gtceu:neutronium_doped_nanotubes 2000"], ["kubejs:annihilation_constrainer"], [GTValues.VA[GTValues.UIV]], [800],
            [CleanroomType.CLEANROOM]],
        ["kubejs:neutronium_antimatter_fuel_rod", ["64x kubejs:pellet_antimatter", "kubejs:annihilation_constrainer"],
            ["gtceu:liquid_hydrogen 200000", "gtceu:zylon 100", "gtceu:neutronium 100"], ["kubejs:neutronium_antimatter_fuel_rod"],
            [GTValues.VA[GTValues.UIV]], [2000], [GTLCleanroomType.LAW_CLEANROOM]],
        ["kubejs:draconium_antimatter_fuel_rod", ["64x kubejs:pellet_antimatter", "64x kubejs:pellet_antimatter", "kubejs:annihilation_constrainer"],
            ["gtceu:liquid_hydrogen 200000", "gtceu:fullerene_polymer_matrix_pulp 100", "gtceu:draconium 100"],
            ["kubejs:draconium_antimatter_fuel_rod"], [GTValues.VA[GTValues.UXV]], [2000], [GTLCleanroomType.LAW_CLEANROOM]],
        ["kubejs:cosmicneutronium_antimatter_fuel_rod",
            ["64x kubejs:pellet_antimatter", "64x kubejs:pellet_antimatter", "64x kubejs:pellet_antimatter", "kubejs:annihilation_constrainer"],
            ["gtceu:liquid_hydrogen 200000", "gtceu:radox 100", "gtceu:cosmicneutronium 100"], ["kubejs:cosmicneutronium_antimatter_fuel_rod"],
            [GTValues.VA[GTValues.OpV]], [2000], [GTLCleanroomType.LAW_CLEANROOM]],
        ["kubejs:infinity_antimatter_fuel_rod",
            ["64x kubejs:pellet_antimatter", "64x kubejs:pellet_antimatter", "64x kubejs:pellet_antimatter", "kubejs:annihilation_constrainer"],
            ["gtceu:liquid_hydrogen 200000", "gtceu:heavy_quark_degenerate_matter_plasma 1000", "gtceu:liquid_cosmic_mesh 100", "gtceu:infinity 100"],
            ["kubejs:infinity_antimatter_fuel_rod"], [GTValues.VA[GTValues.MAX]], [2000], [GTLCleanroomType.LAW_CLEANROOM]],
        ["kubejs:reinforced_echo_shard",
            ["4x gtceu:echo_shard_plate", "4x kubejs:echobone", "2x minecraft:netherite_scrap", "gtceu:double_echoite_plate"],
            ["gtceu:liquid_hydrogen 8000", "gtceu:echoite_plasma 1000"], ["kubejs:reinforced_echo_shard"], [GTValues.VA[GTValues.UEV]], [200],
            [GTLCleanroomType.LAW_CLEANROOM]]
    ]);

    batch(gtr, "assembler", ["itemInputs", "inputFluids", "itemOutputs", "EUt", "duration"], [
        ["gtlcore:graviton_field_constraint_casing",
            ["gtceu:draconium_frame", "kubejs:annihilation_constrainer", "gtceu:neutronium_nanoswarm", "gtceu:celestialtungsten_gear",
                "4x gtceu:double_adamantium_plate"], ["gtceu:neutronium 288"], ["2x gtlcore:graviton_field_constraint_casing"],
            [GTValues.VA[GTValues.UIV]], [100]],
        ["kubejs:laser_cooling_casing",
            ["gtceu:hsse_frame", "kubejs:laser_cooling_unit", "2x kubejs:uhv_voltage_coil", "6x gtceu:zirconium_carbide_plate",
                "2x gtceu:double_fluxed_electrum_plate", "4x gtceu:double_zeron_100_plate"], ["gtceu:soldering_alloy 576"],
            ["kubejs:laser_cooling_casing"], [GTValues.VA[GTValues.UHV]], [200]]
    ]);

    gtr.dimensionally_transcendent_plasma_forge("kubejs:hypercube")
        .itemInputs("12x gtceu:cosmicneutronium_rod", "24x gtceu:celestialtungsten_rod").inputFluids("gtceu:exciteddtec 1000")
        .itemOutputs("kubejs:hypercube").outputFluids("gtceu:dimensionallytranscendentresidue 100").EUt(GTValues.VA[GTValues.MAX]).duration(2400)
        .blastFurnaceTemp(30000)

    gtr.mixer("gtceu:dimensionallytranscendentcrudecatalyst")
        .itemInputs("kubejs:resonating_gem").inputFluids("gtceu:nitrogen_plasma 1000", "gtceu:helium_plasma 1000")
        .outputFluids("gtceu:dimensionallytranscendentcrudecatalyst 1000").EUt(GTValues.VA[GTValues.OpV]).duration(200)

    gtr.stellar_forge("gtceu:exciteddtec")
        .itemInputs("kubejs:quantum_chromodynamic_charge").inputFluids("gtceu:dimensionallytranscendentexoticcatalyst 10000")
        .outputFluids("gtceu:exciteddtec 10000").EUt(GTValues.VA[GTValues.OpV]).duration(200).addData("SCTier", 3)

    batch(gtr, "annihilate_generator", ["itemInputs", "chancedOutput", ["duration", 200], "EUt"], [
        ["kubejs:neutronium_antimatter_fuel_rod", ["kubejs:neutronium_antimatter_fuel_rod"], ["kubejs:annihilation_constrainer", 9000, 0],
            [- GTValues.V[GTValues.MAX] * 256]],
        ["kubejs:draconium_antimatter_fuel_rod", ["kubejs:draconium_antimatter_fuel_rod"], ["kubejs:annihilation_constrainer", 8000, 0],
            [- GTValues.V[GTValues.MAX] * 4096]],
        ["kubejs:cosmicneutronium_antimatter_fuel_rod", ["kubejs:cosmicneutronium_antimatter_fuel_rod"], ["kubejs:annihilation_constrainer", 7000, 0],
            [- GTValues.V[GTValues.MAX] * 65536]],
        ["kubejs:infinity_antimatter_fuel_rod", ["kubejs:infinity_antimatter_fuel_rod"], ["kubejs:annihilation_constrainer", 6000, 0],
            [- GTValues.V[GTValues.MAX] * 1048576]]
    ]);

    gtr.assembler("gtceu:fishing_ground")
        .itemInputs("gtceu:lv_fisher", "gtceu:mv_fisher", "gtceu:hv_fisher", "gtceu:lv_sensor", "gtceu:mv_sensor", "gtceu:hv_sensor",
            "2x #gtceu:circuits/ev", "4x gtceu:eglin_steel_plate", "4x gtceu:double_aluminium_bronze_plate")
        .inputFluids("gtceu:soldering_alloy 576").itemOutputs("gtceu:fishing_ground").EUt(480).duration(400)

    batch(gtr, "assembler", ["itemInputs", "itemOutputs", ["circuit", 6], ["EUt", 16], ["duration", 50]], [
        ["gtlcore:extreme_strength_tritanium_casing", ["gtceu:tritanium_frame", "6x gtceu:tritanium_plate"],
            ["2x gtlcore:extreme_strength_tritanium_casing"]],
        ["gtlcore:aluminium_bronze_casing", ["gtceu:aluminium_bronze_frame", "6x gtceu:aluminium_bronze_plate"],
            ["2x gtlcore:aluminium_bronze_casing"]],
        ["gtlcore:hyper_mechanical_casing", ["gtceu:naquadah_alloy_frame", "6x gtceu:naquadria_plate"], ["2x gtlcore:hyper_mechanical_casing"]]
    ]);

    gtr.assembler("gtlcore:enhance_hyper_mechanical_casing")
        .itemInputs("gtceu:naquadria_frame", "2x gtceu:double_naquadah_alloy_plate", "2x gtceu:double_naquadah_plate",
            "2x gtceu:double_enriched_naquadah_plate")
        .itemOutputs("2x gtlcore:enhance_hyper_mechanical_casing").inputFluids("gtceu:naquadria 576").circuit(6).EUt(16).duration(50)

    batch(gtr, "assembler", ["itemInputs", "itemOutputs", "inputFluids", ["EUt", GTValues.VA[GTValues.UIV]], "duration"], [
        ["gtlcore:dimensionally_transcendent_casing",
            ["gtceu:mithril_frame", "2x gtlcore:dimension_injection_casing", "2x gtlcore:molecular_casing", "gtceu:iv_quantum_chest",
                "gtceu:iv_quantum_tank", "12x gtceu:adamantium_bolt", "gtceu:enderite_single_wire", "6x gtceu:palladium_plate",
                "6x gtceu:osmiridium_plate"], ["2x gtlcore:dimensionally_transcendent_casing"], ["gtceu:liquid_degenerate_rhenium 200"], [200]],
        ["kubejs:uruium_coil_block",
            ["64x gtceu:uruium_double_wire", "64x gtceu:uruium_double_wire", "16x gtceu:neutronium_ring", "32x gtceu:vibramantium_bolt",
                "64x gtceu:black_steel_foil", "64x gtceu:cupronickel_foil", "64x gtceu:ruthenium_trinium_americium_neutronate_foil",
                "64x gtceu:hssg_foil", "64x gtceu:styrene_butadiene_rubber_foil"], ["kubejs:uruium_coil_block"], ["gtceu:molybdenum 576"], [600]]
    ]);

    batch(gtr, "mixer", ["itemInputs", "inputFluids", "outputFluids", "EUt", ["duration", 800]], [
        ["gtceu:concentration_mixing_hyper_fuel_1", ["gtceu:hassium_dust", "gtceu:oganesson_dust"],
            ["gtceu:hyper_fuel_4 1000", "gtceu:dimensionallytranscendentcrudecatalyst 1000"], ["gtceu:concentration_mixing_hyper_fuel_1 1000"],
            [GTValues.V[GTValues.UXV]]],
        ["gtceu:concentration_mixing_hyper_fuel_2", ["gtceu:starmetal_dust", "gtceu:draconium_dust"],
            ["gtceu:concentration_mixing_hyper_fuel_1 1000", "gtceu:dimensionallytranscendentprosaiccatalyst 1000"],
            ["gtceu:concentration_mixing_hyper_fuel_2 1000"], [GTValues.V[GTValues.OpV]]]
    ]);

    gtr.compressor("gtceu:rubber_plate")
        .itemInputs("2x gtceu:sticky_resin").itemOutputs("gtceu:rubber_plate").EUt(2).duration(100)

    batch(gtr, "fusion_reactor", [["duration", 200], ["fusionStartEU", 600000000], ["EUt", GTValues.VA[GTValues.ZPM]], "inputFluids", "outputFluids"], [
        ["gtceu:mithril_plasma", ["gtceu:berkelium 144", "gtceu:potassium 1152"], ["gtceu:mithril_plasma 144"]],
        ["gtceu:orichalcum_plasma", ["gtceu:einsteinium 144", "gtceu:sodium 1152"], ["gtceu:orichalcum_plasma 144"]]
    ]);

    batch(gtr, "fusion_reactor", ["inputFluids", "outputFluids", "EUt", "duration", "fusionStartEU"], [
        ["gtceu:silver_plasma", ["gtceu:europium 16", "gtceu:arsenic 16"], ["gtceu:silver_plasma 16"], [GTValues.VH[GTValues.ZPM]], [18], [480000000]],
        ["gtceu:moscovium", ["gtceu:calcium 32", "gtceu:curium 32"], ["gtceu:moscovium 32"], [GTValues.VA[GTValues.ZPM]], [128], [800000000]],
        ["gtceu:livermorium", ["gtceu:thorium 32", "gtceu:iron 32"], ["gtceu:livermorium 32"], [GTValues.VA[GTValues.ZPM]], [128], [800000000]],
        ["gtceu:dubnium", ["gtceu:europium 64", "gtceu:neon 250"], ["gtceu:dubnium 64"], [GTValues.VH[GTValues.ZPM]], [128], [720000000]],
        ["gtceu:seaborgium", ["gtceu:calcium 64", "gtceu:plutonium 64"], ["gtceu:seaborgium 64"], [GTValues.VH[GTValues.ZPM]], [128], [720000000]],
        ["gtceu:tennessine", ["gtceu:lead 16", "gtceu:bromine 16"], ["gtceu:tennessine 16"], [GTValues.VH[GTValues.UV]], [64], [960000000]],
        ["gtceu:taranium_rich_liquid_helium_4_plasma", ["gtceu:taranium_enriched_liquid_helium_3 125", "gtceu:hydrogen 125"],
            ["gtceu:taranium_rich_liquid_helium_4_plasma 125"], [GTValues.VH[GTValues.UHV]], [128], [1200000000]],
        ["gtceu:vibranium_plasma", ["gtceu:vibranium_unstable 16", "gtceu:adamantium 16"], ["gtceu:vibranium_plasma 16"], [GTValues.VA[GTValues.UHV]],
            [200], [1800000000]],
        ["gtceu:hassium", ["gtceu:scandium_titanium_50_mixture 32", "gtceu:radon 250"], ["gtceu:metastable_hassium_plasma 32"],
            [GTValues.VA[GTValues.UV]], [64], [960000000]],
        ["gtceu:hot_oganesson", ["gtceu:oganesson_breeding_base 16", "gtceu:dysprosium 16"], ["gtceu:hot_oganesson 125"], [GTValues.VA[GTValues.UV]],
            [64], [960000000]],
        ["gtceu:draconiumawakened_plasma", ["gtceu:draconium 125", "gtceu:quantumchromodynamically_confined_matter 125"],
            ["gtceu:draconiumawakened_plasma 125"], [GTValues.VA[GTValues.UEV]], [800], [2100000000]],
        ["gtceu:infinity", ["gtceu:crystalmatrix 2000", "gtceu:cosmicneutronium 1000"], ["gtceu:infinity 64"], [GTValues.VA[GTValues.UEV]], [4800],
            [2100000000]]
    ]);
});
