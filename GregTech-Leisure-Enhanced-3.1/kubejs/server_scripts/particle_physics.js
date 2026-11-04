// priority: 95
// 物质转换、粒子对撞和等离子体处理。
// 由 gtceu.js 按既有阶段顺序执行，本文件只登记配方，不依赖文件名排序。
global.gtlPack.register("particle_physics", event => {
    const gtr = event.recipes.gtceu;
    const batch = global.gtlPack.batch;

    const mcsms = [["ingot", 144], ["dust", 144], ["nugget", 16], ["rod", 72], ["plate", 144], ["foil", 36], ["block", 1296], ["frame", 288]]
    mcsms.forEach((mcsm) => {
        gtr.sps_crafting("gtceu:magnetohydrodynamicallyconstrainedstarmatter" + mcsm[0])
            .itemInputs("gtceu:eternity_" + mcsm[0], "kubejs:solar_light_splitter")
            .inputFluids("gtceu:mana 10000", "gtceu:magnetohydrodynamicallyconstrainedstarmatter " + mcsm[1], "gtceu:dimensionallytranscendentresidue 1000")
            .itemOutputs("gtceu:magnetohydrodynamicallyconstrainedstarmatter_" + mcsm[0]).EUt(4 * GTValues.VA[GTValues.MAX]).duration(200)
    })

    batch(gtr, "sps_crafting", ["itemInputs", "inputFluids", "itemOutputs", ["EUt", 4 * GTValues.VA[GTValues.MAX]], ["duration", 200]], [
        ["gtceu:double_magnetohydrodynamicallyconstrainedstarmatter_plate", ["gtceu:double_eternity_plate", "kubejs:solar_light_splitter"],
            ["gtceu:mana 10000", "gtceu:magnetohydrodynamicallyconstrainedstarmatter 288", "gtceu:dimensionallytranscendentresidue 1000"],
            ["gtceu:double_magnetohydrodynamicallyconstrainedstarmatter_plate"]],
        ["gtceu:tiny_magnetohydrodynamicallyconstrainedstarmatter_dust", ["gtceu:tiny_eternity_dust", "kubejs:solar_light_splitter"],
            ["gtceu:mana 10000", "gtceu:magnetohydrodynamicallyconstrainedstarmatter 16", "gtceu:dimensionallytranscendentresidue 1000"],
            ["gtceu:tiny_magnetohydrodynamicallyconstrainedstarmatter_dust"]],
        ["gtceu:small_magnetohydrodynamicallyconstrainedstarmatter_dust", ["gtceu:small_eternity_dust", "kubejs:solar_light_splitter"],
            ["gtceu:mana 10000", "gtceu:magnetohydrodynamicallyconstrainedstarmatter 36", "gtceu:dimensionallytranscendentresidue 1000"],
            ["gtceu:small_magnetohydrodynamicallyconstrainedstarmatter_dust"]]
    ]);

    gtr.assembler("kubejs:solar_light_splitter")
        .itemInputs("gtceu:laminated_glass", "gtceu:ruby_lens", "gtceu:emerald_lens", "gtceu:sapphire_lens").inputFluids("gtceu:glowstone 576")
        .itemOutputs("kubejs:solar_light_splitter").EUt(480).duration(200)

    gtr.assembler("gtceu:atomic_casing")
        .itemInputs("gtceu:naquadah_alloy_frame", "2x gtceu:abyssalalloy_plate", "4x gtceu:enriched_naquadah_plate")
        .itemOutputs("2x gtceu:atomic_casing").circuit(6).EUt(16).duration(50)

    batch(gtr, "assembler", ["itemInputs", "inputFluids", "itemOutputs", "EUt", "duration"], [
        ["gtlcore:stellar_containment_casing",
            ["gtceu:trinium_frame", "16x gtceu:trinium_screw", "gtceu:uv_field_generator", "gtceu:yttrium_barium_cuprate_quadruple_wire",
                "4x gtceu:naquadah_alloy_rod", "4x gtceu:double_highurabilityompoundteel_plate"], ["gtceu:neutronium 144"],
            ["gtlcore:stellar_containment_casing"], [GTValues.VA[GTValues.UHV]], [140]],
        ["kubejs:naquadria_charge",
            ["gtceu:black_steel_frame", "4x gtceu:titanium_bolt", "gtceu:hmxexplosive_dust", "gtceu:naquadria_dust", "gtceu:uranium_plate",
                "gtceu:osmium_bolt", "gtceu:hexanitrohexaaxaisowurtzitane_dust", "gtceu:thorium_plate"], ["gtceu:glyceryl_trinitrate 1000"],
            ["kubejs:naquadria_charge"], [GTValues.VA[GTValues.UEV]], [100]]
    ]);

    gtr.mixer("gtceu:eglin_steel_dust")
        .itemInputs("4x gtceu:iron_dust", "1x gtceu:kanthal_dust", "5x gtceu:invar_dust", "1x gtceu:sulfur_dust", "1x gtceu:silicon_dust",
            "1x gtceu:carbon_dust")
        .itemOutputs("13x gtceu:eglin_steel_dust").EUt(120).duration(600)

    batch(gtr, "assembler", ["itemInputs", "itemOutputs", ["EUt", 16], ["duration", 50], ["circuit", 6]], [
        ["gtlcore:antifreeze_heatproof_machine_casing",
            ["gtceu:inconel_792_frame", "2x gtceu:double_hsse_plate", "4x gtceu:double_rhodium_plated_palladium_plate"],
            ["2x gtlcore:antifreeze_heatproof_machine_casing"]],
        ["gtlcore:pikyonium_machine_casing", ["gtceu:hastelloy_x_frame", "6x gtceu:pikyonium_plate"], ["2x gtlcore:pikyonium_machine_casing"]],
        ["gtlcore:oxidation_resistant_hastelloy_n_mechanical_casing", ["gtceu:hastelloy_n_frame", "6x gtceu:hastelloy_n_plate"],
            ["2x gtlcore:oxidation_resistant_hastelloy_n_mechanical_casing"]]
    ]);

    gtr.decay_hastener("gtceu:meitnerium_dust")
        .inputFluids("gtceu:hassium 144").itemOutputs("gtceu:meitnerium_dust").EUt(480).duration(8000)

    const particle_collider = [["gtceu:plutonium", "gtceu:curium"], ["gtceu:thorium", "gtceu:uranium"], ["gtceu:uranium", "gtceu:plutonium"],
        ["gtceu:protactinium", "gtceu:neptunium"], ["gtceu:americium", "gtceu:berkelium"], ["gtceu:curium", "gtceu:einsteinium"],
        ["gtceu:berkelium", "gtceu:californium"], ["gtceu:einsteinium", "gtceu:mendelevium"], ["gtceu:fermium", "gtceu:nobelium"],
        ["gtceu:mendelevium", "gtceu:lawrencium"], ["gtceu:californium", "gtceu:fermium"], ["gtceu:bismuth", "gtceu:astatine"],
        ["gtceu:meitnerium", "gtceu:roentgenium"], ["gtceu:darmstadtium", "gtceu:copernicium"], ["gtceu:roentgenium", "gtceu:nihonium"],
        ["gtceu:dubnium", "gtceu:bohrium"]]

    particle_collider.forEach((particle) => {
        gtr.super_particle_collider(particle[1] + "a")
            .inputFluids(particle[0] + " 4096", "gtceu:helium_plasma 4096").outputFluids(particle[1] + " 4000").EUt(GTValues.VA[GTValues.UV])
            .duration(200)
    })

    gtr.stellar_forge("kubejs:neutron_plasma_containment_cell")
        .inputFluids("gtceu:neutronium 1000", "gtceu:heavy_lepton_mixture 1000")
        .itemInputs("kubejs:naquadria_charge", "kubejs:plasma_containment_cell").itemOutputs("kubejs:neutron_plasma_containment_cell")
        .EUt(GTValues.VA[GTValues.UIV]).duration(200).addData("SCTier", 1)

    gtr.stellar_forge("gtceu:free_proton_gas")
        .itemInputs("kubejs:naquadria_charge", "kubejs:contained_high_density_protonic_matter").outputFluids("gtceu:free_proton_gas 10000")
        .itemOutputs("kubejs:time_dilation_containment_unit").EUt(GTValues.VA[GTValues.UIV]).duration(200).addData("SCTier", 1)

    batch(gtr, "stellar_forge", ["inputFluids", "itemInputs", "outputFluids", ["EUt", GTValues.VA[GTValues.UIV]], ["duration", 200], ["addData", "SCTier", 1]], [
        ["gtceu:enderium_plasma",
            ["gtceu:ender_eye 2304", "gtceu:lead 2304", "gtceu:bismuth 2304", "gtceu:platinum 1152", "gtceu:liquid_ender_air 100000"],
            ["kubejs:naquadria_charge", "kubejs:warped_ender_pearl"], ["gtceu:enderium_plasma 2304"]],
        ["gtceu:adamantium_plasma", ["gtceu:orichalcum 576", "gtceu:tin 1024", "gtceu:antimony 864", "gtceu:iron 1152", "gtceu:mercury 1000"],
            ["kubejs:naquadria_charge", "24x gtceu:bloodstone_dust"], ["gtceu:adamantium_plasma 2304"]]
    ]);

    gtr.stellar_forge("gtceu:degenerate_rhenium_plasma")
        .itemInputs("kubejs:naquadria_charge", "5x gtceu:double_rhenium_plate").outputFluids("gtceu:degenerate_rhenium_plasma 10000")
        .EUt(GTValues.VA[GTValues.UIV]).duration(200).addData("SCTier", 1)

    gtr.stellar_forge("gtceu:infuscolium_plasma")
        .inputFluids("gtceu:adamantine 2304", "gtceu:mana 10000")
        .itemInputs("kubejs:naquadria_charge", "16x minecraft:end_crystal", "16x minecraft:popped_chorus_fruit")
        .outputFluids("gtceu:infuscolium_plasma 2304").EUt(GTValues.VA[GTValues.UIV]).duration(200).addData("SCTier", 1)

    gtr.stellar_forge("gtceu:legendarium_plasma")
        .inputFluids("gtceu:naquadriatictaranium 576", "gtceu:trinium 288", "gtceu:duranium 288", "gtceu:tritanium 288", "gtceu:orichalcum 288",
            "gtceu:mithril 288", "gtceu:adamantium 288", "gtceu:adamantine 288", "gtceu:vibranium 288")
        .itemInputs("kubejs:leptonic_charge", "kubejs:neutron_plasma_containment_cell").outputFluids("gtceu:legendarium_plasma 2304")
        .itemOutputs("kubejs:plasma_containment_cell").EUt(GTValues.VA[GTValues.UXV]).duration(200).addData("SCTier", 2)

    gtr.stellar_forge("gtceu:quark_gluon_plasma")
        .itemInputs("kubejs:leptonic_charge", "10x gtceu:degenerate_rhenium_dust").outputFluids("gtceu:quark_gluon_plasma 10000")
        .EUt(GTValues.VA[GTValues.UXV]).duration(200).addData("SCTier", 2)

    gtr.stellar_forge("gtceu:heavy_quark_degenerate_matter_plasma")
        .inputFluids("gtceu:heavy_quark_enriched_mixture 1152", "gtceu:flerovium 144", "gtceu:oganesson 144", "gtceu:hassium 144", "gtceu:deuterium 1000")
        .itemInputs("kubejs:leptonic_charge").outputFluids("gtceu:heavy_quark_degenerate_matter_plasma 1152").EUt(GTValues.VA[GTValues.UXV])
        .duration(200).addData("SCTier", 2)

    gtr.stellar_forge("kubejs:contained_high_density_protonic_matter")
        .itemInputs("kubejs:leptonic_charge", "kubejs:time_dilation_containment_unit", "kubejs:charged_triplet_neutronium_sphere")
        .itemOutputs("kubejs:contained_high_density_protonic_matter").EUt(GTValues.VA[GTValues.UXV]).duration(200).addData("SCTier", 2)

    batch(gtr, "stellar_forge", ["itemInputs", "inputFluids", "outputFluids", ["EUt", GTValues.VA[GTValues.UXV]], ["duration", 200], ["addData", "SCTier", 2]], [
        ["gtceu:crystalmatrix_plasma", ["kubejs:leptonic_charge", "avaritia:crystal_matrix", "16x kubejs:corporeal_matter"],
            ["gtceu:free_proton_gas 20000"], ["gtceu:crystalmatrix_plasma 1000"]],
        ["gtceu:starmetal_plasma", ["kubejs:leptonic_charge", "10x kubejs:resonating_gem"],
            ["gtceu:free_proton_gas 1000", "gtceu:free_electron_gas 1000"], ["gtceu:starmetal_plasma 1000"]]
    ]);

    batch(gtr, "stellar_forge", ["itemInputs", "outputFluids", "EUt", ["duration", 200], "addData"], [
        ["gtceu:high_energy_quark_gluon_plasma", ["kubejs:quantum_chromodynamic_charge", "10x gtceu:double_heavy_quark_degenerate_matter_plate"],
            ["gtceu:high_energy_quark_gluon_plasma 2000"], [GTValues.VA[GTValues.UXV]], ["SCTier", 2]],
        ["gtceu:quantumchromodynamically_confined_matter_plasma",
            ["kubejs:quantum_chromodynamic_charge", "20x kubejs:quantumchromodynamic_protective_plating"],
            ["gtceu:quantumchromodynamically_confined_matter_plasma 2000"], [GTValues.VA[GTValues.OpV]], ["SCTier", 3]]
    ]);

    gtr.stellar_forge("gtceu:dense_neutron_plasma")
        .inputFluids("gtceu:periodicium 2736", "gtceu:gluons 6000", "gtceu:heavy_lepton_mixture 6000")
        .itemInputs("kubejs:quantum_chromodynamic_charge", "5x gtceu:neutronium_block", "5x gtceu:heavy_quark_degenerate_matter_block")
        .outputFluids("gtceu:dense_neutron_plasma 6000").EUt(GTValues.VA[GTValues.OpV]).duration(200).addData("SCTier", 3)

    gtr.stellar_forge("kubejs:extremely_durable_plasma_cell")
        .itemInputs("kubejs:quantum_chromodynamic_charge", "2x kubejs:dense_neutron_plasma_cell")
        .itemOutputs("kubejs:cosmic_neutron_plasma_cell", "kubejs:extremely_durable_plasma_cell").EUt(GTValues.VA[GTValues.OpV]).duration(200)
        .addData("SCTier", 3)

    gtr.stellar_forge("avaritia:infinity_ingot")
        .inputFluids("gtceu:crystalmatrix 2000", "gtceu:cosmicneutronium 1000").itemInputs("kubejs:quantum_chromodynamic_charge")
        .itemOutputs("gtceu:hot_infinity_ingot").outputFluids("gtceu:infinity 10").EUt(GTValues.VA[GTValues.OpV]).duration(200)
        .addData("SCTier", 3)

    batch(gtr, "stellar_forge", ["itemInputs", "itemOutputs", "EUt", ["duration", 200], "addData"], [
        ["kubejs:contained_reissner_nordstrom_singularity",
            ["kubejs:naquadria_charge", "64x kubejs:time_dilation_containment_unit", "64x kubejs:charged_triplet_neutronium_sphere"],
            ["64x kubejs:contained_reissner_nordstrom_singularity"], [GTValues.VA[GTValues.UIV]], ["SCTier", 1]],
        ["kubejs:contained_kerr_newmann_singularity", ["kubejs:leptonic_charge", "64x kubejs:contained_reissner_nordstrom_singularity"],
            ["kubejs:contained_kerr_newmann_singularity", "63x kubejs:time_dilation_containment_unit"], [GTValues.VA[GTValues.UXV]], ["SCTier", 2]],
        ["kubejs:contained_exotic_matter",
            ["kubejs:leptonic_charge", "kubejs:contained_high_density_protonic_matter", "9x gtceu:tiny_degenerate_rhenium_dust"],
            ["kubejs:contained_exotic_matter"], [GTValues.VA[GTValues.UXV]], ["SCTier", 2]],
        ["kubejs:recursively_folded_negative_space",
            ["kubejs:quantum_chromodynamic_charge", "2x kubejs:macrowormhole_generator", "2x kubejs:temporal_matter"],
            ["kubejs:recursively_folded_negative_space"], [GTValues.VA[GTValues.OpV]], ["SCTier", 3]],
        ["kubejs:eigenfolded_kerr_manifold",
            ["kubejs:quantum_chromodynamic_charge", "kubejs:stabilized_wormhole_generator", "kubejs:recursively_folded_negative_space"],
            ["kubejs:eigenfolded_kerr_manifold"], [GTValues.VA[GTValues.OpV]], ["SCTier", 3]],
        ["kubejs:ctc_computational_unit",
            ["kubejs:quantum_chromodynamic_charge", "kubejs:eigenfolded_kerr_manifold", "kubejs:ctc_computational_unit_container"],
            ["kubejs:ctc_computational_unit"], [GTValues.VA[GTValues.OpV]], ["SCTier", 3]]
    ]);

    const fluids = ["argon", "helium", "nickel", "iron", "nitrogen", "oxygen", "mithril", "orichalcum", "enderium", "adamantium", "infuscolium", "echoite", "vibranium", "taranium_rich_liquid_helium_4", "legendarium", "heavy_quark_degenerate_matter", "starmetal", "quantumchromodynamically_confined_matter", "astraltitanium", "celestialtungsten"]
    fluids.forEach((fluid) => {
        gtr.plasma_condenser("gtceu:" + fluid + "_condenser")
            .inputFluids("gtceu:" + fluid + "_plasma 1000", "gtceu:liquid_helium 100000")
            .outputFluids("gtceu:" + fluid + " 1000", "gtceu:helium 100000").circuit(1).EUt(GTValues.VA[GTValues.UHV]).duration(600)
    })

    batch(gtr, "plasma_condenser", [["notConsumable", "kubejs:ingot_field_shape"], "inputFluids", ["outputFluids", "gtceu:helium 14400"], "itemOutputs",
        ["EUt", GTValues.VA[GTValues.UHV]], ["duration", 50]], [
        ["minecraft:iron_ingot", ["gtceu:iron_plasma 144", "gtceu:liquid_helium 14400"], ["minecraft:iron_ingot"]],
        ["gtceu:nickel_ingot", ["gtceu:nickel_plasma 144", "gtceu:liquid_helium 14400"], ["gtceu:nickel_ingot"]]
    ]);

    const ingots = ["mithril", "orichalcum", "enderium", "adamantium", "infuscolium", "echoite", "vibranium", "legendarium", "heavy_quark_degenerate_matter", "starmetal", "quantumchromodynamically_confined_matter"]
    ingots.forEach((ingot) => {
        gtr.plasma_condenser("gtceu:" + ingot + "_ingot_condenser")
            .notConsumable("kubejs:ingot_field_shape").inputFluids("gtceu:" + ingot + "_plasma 144", "gtceu:liquid_helium 14400")
            .outputFluids("gtceu:helium 14400").itemOutputs("gtceu:hot_" + ingot + "_ingot").EUt(GTValues.VA[GTValues.UHV]).duration(60)
    })

    batch(gtr, "plasma_condenser", ["itemInputs", ["inputFluids", "gtceu:liquid_helium 100000"], "outputFluids", ["itemOutputs", "kubejs:plasma_containment_cell"], "EUt",
        ["duration", 1200]], [
        ["gtceu:degenerate_rhenium", ["kubejs:rhenium_plasma_containment_cell"], ["gtceu:helium 100000", "gtceu:liquid_degenerate_rhenium 1000"],
            [GTValues.VA[GTValues.UEV]]],
        ["gtceu:draconiumawakened", ["kubejs:draconiumawakened_plasma_containment_cell"], ["gtceu:helium 100000", "gtceu:draconiumawakened 1000"],
            [GTValues.VA[GTValues.UXV]]]
    ]);

    gtr.plasma_condenser("kubejs:neutronium_sphere")
        .notConsumable("kubejs:ball_field_shape").inputFluids("gtceu:liquid_helium 32000").outputFluids("gtceu:helium 32000")
        .itemInputs("kubejs:neutron_plasma_containment_cell").itemOutputs("4x kubejs:neutronium_sphere", "kubejs:plasma_containment_cell")
        .EUt(GTValues.VA[GTValues.UHV]).duration(800)

    gtr.plasma_condenser("kubejs:quantumchromodynamic_protective_plating")
        .notConsumable("gtceu:vibranium_nanoswarm").notConsumable("gtceu:infuscolium_nanoswarm")
        .inputFluids("gtceu:liquid_helium 10000", "gtceu:high_energy_quark_gluon_plasma 100").outputFluids("gtceu:helium 10000")
        .itemOutputs("kubejs:quantumchromodynamic_protective_plating").EUt(GTValues.VA[GTValues.UXV]).duration(300)

    batch(gtr, "plasma_condenser", ["itemInputs", ["inputFluids", "gtceu:liquid_helium 100000"], "outputFluids", "itemOutputs", ["EUt", GTValues.VA[GTValues.OpV]], "duration"], [
        ["gtceu:cosmicneutronium", ["kubejs:cosmic_neutron_plasma_cell"], ["gtceu:helium 100000", "gtceu:cosmicneutronium 1000"],
            ["kubejs:extremely_durable_plasma_cell"], [1200]],
        ["gtceu:crystalmatrix", ["kubejs:crystalmatrix_plasma_containment_cell"], ["gtceu:helium 100000", "gtceu:crystalmatrix 1000"],
            ["kubejs:plasma_containment_cell"], [1000]],
        ["gtceu:chaos", ["kubejs:chaos_containment_unit"], ["gtceu:helium 100000", "gtceu:chaos 1000"], ["kubejs:time_dilation_containment_unit"],
            [1600]]
    ]);

    gtr.plasma_condenser("gtceu:hassium")
        .inputFluids("gtceu:metastable_hassium_plasma 1000", "gtceu:liquid_helium 100000")
        .outputFluids("gtceu:helium 100000", "gtceu:liquid_metastable_hassium 1000").EUt(GTValues.VA[GTValues.UHV]).duration(1200)

    gtr.canner("kubejs:crystalmatrix_plasma_containment_cell")
        .notConsumable("gtceu:enderium_nanoswarm").inputFluids("gtceu:crystalmatrix_plasma 1000").itemInputs("kubejs:plasma_containment_cell")
        .itemOutputs("kubejs:crystalmatrix_plasma_containment_cell").EUt(GTValues.VA[GTValues.UXV]).duration(20)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.extractor("gtceu:xpjuice")
        .itemInputs("minecraft:sculk").outputFluids("gtceu:xpjuice 100").EUt(120).duration(20)
});
