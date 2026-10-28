// priority: 95
// 树木、植物、细胞和培养材料的处理。
// 由 gtceu.js 按既有阶段顺序执行，本文件只登记配方，不依赖文件名排序。
global.gtlPack.register("biological_processing", event => {
    const gtr = event.recipes.gtceu;
    const batch = global.gtlPack.batch;

    const trees = [["minecraft:oak_sapling", "minecraft:oak_log"], ["minecraft:spruce_sapling", "minecraft:spruce_log"],
        ["minecraft:birch_sapling", "minecraft:birch_log"], ["minecraft:jungle_sapling", "minecraft:jungle_log"],
        ["minecraft:acacia_sapling", "minecraft:acacia_log"], ["minecraft:dark_oak_sapling", "minecraft:dark_oak_log"],
        ["minecraft:mangrove_propagule", "minecraft:mangrove_log"], ["minecraft:cherry_sapling", "minecraft:cherry_log"]]
    const plants = [["minecraft:pumpkin_seeds", "minecraft:pumpkin", 6], ["minecraft:beetroot_seeds", "minecraft:beetroot", 16],
        ["minecraft:sweet_berries", "minecraft:sweet_berries", 16], ["minecraft:glow_berries", "minecraft:glow_berries", 8],
        ["minecraft:wheat_seeds", "minecraft:wheat", 16], ["minecraft:melon_seeds", "minecraft:melon", 6],
        ["minecraft:carrot", "minecraft:carrot", 12], ["minecraft:sugar_cane", "minecraft:sugar_cane", 12], ["minecraft:kelp", "minecraft:kelp", 12],
        ["minecraft:cactus", "minecraft:cactus", 12], ["minecraft:potato", "minecraft:potato", 12],
        ["minecraft:cocoa_beans", "minecraft:cocoa_beans", 12], ["minecraft:brown_mushroom", "minecraft:brown_mushroom", 12],
        ["minecraft:red_mushroom", "minecraft:red_mushroom", 12], ["minecraft:nether_wart", "minecraft:nether_wart", 12],
        ["minecraft:bamboo", "minecraft:bamboo", 16], ["minecraft:vine", "minecraft:vine", 16], ["minecraft:sea_pickle", "minecraft:sea_pickle", 16]]

    trees.forEach((woodType) => {
        gtr.greenhouse(woodType[0])
            .notConsumable(woodType[0]).inputFluids("water 1000").itemOutputs(`64x ${woodType[1]}`, `6x ${woodType[0]}`).duration(600).EUt(30)
            .circuit(1)

        gtr.greenhouse(`${woodType[0]}_fertiliser`)
            .notConsumable(woodType[0]).itemInputs("4x gtceu:fertilizer").inputFluids("water 1000")
            .itemOutputs(`64x ${woodType[1]}`, `64x ${woodType[1]}`, `12x ${woodType[0]}`).duration(200).EUt(60).circuit(2)
    })

    plants.forEach((seedType) => {
        gtr.greenhouse(seedType[0])
            .notConsumable(seedType[0]).inputFluids("water 1000").itemOutputs(`${seedType[2]}x ${seedType[1]}`).duration(600).EUt(30).circuit(1)
        gtr.greenhouse(seedType[0] + "_fertilizer")
            .notConsumable(seedType[0]).itemInputs("4x gtceu:fertilizer").inputFluids("water 1000")
            .itemOutputs(`${2 * seedType[2]}x ${seedType[1]}`).duration(200).EUt(60).circuit(2)
    })
    gtr.greenhouse("rubber_wood")
        .notConsumable("gtceu:rubber_sapling").inputFluids("water 1000")
        .itemOutputs("16x gtceu:rubber_log", "3x gtceu:rubber_sapling", "4x gtceu:sticky_resin").duration(600).EUt(30).circuit(1)

    batch(gtr, "greenhouse", ["notConsumable", "itemInputs", "inputFluids", "itemOutputs", "duration", "EUt", "circuit"], [
        ["rubber_wood_fertiliser", ["gtceu:rubber_sapling"], ["4x gtceu:fertilizer"], ["water 1000"],
            ["32x gtceu:rubber_log", "6x gtceu:rubber_sapling", "8x gtceu:sticky_resin"], [200], [60], [2]],
        ["barnarda_log", ["64x kubejs:barnarda_leaves"], ["4x gtceu:fertilizer"], ["gtceu:unknowwater 1000"], ["16x kubejs:barnarda_log"], [600], [30],
            [1]],
        ["barnarda_log_fertiliser", ["64x kubejs:barnarda_leaves"], ["16x gtceu:fertilizer"], ["gtceu:unknowwater 1000"], ["32x kubejs:barnarda_log"],
            [200], [60], [2]]
    ]);

    gtr.chemical_bath("minecraft:sculk_vein")
        .itemInputs("minecraft:vine").inputFluids("gtceu:echo_shard 10").itemOutputs("minecraft:sculk_vein").EUt(120).duration(200)

    gtr.incubator("minecraft:chorus_fruit")
        .notConsumable("64x minecraft:chorus_flower").itemOutputs("64x minecraft:chorus_fruit")
        .inputFluids("gtceu:unknowwater 1000", "gtceu:ender_pearl 100").EUt(120).duration(1200)

    gtr.incubator("gtceu:echo")
        .notConsumable("64x minecraft:sculk_shrieker").notConsumable("64x minecraft:sculk_sensor")
        .itemInputs("64x minecraft:dirt", "64x minecraft:sculk_vein").itemOutputs("64x minecraft:sculk")
        .inputFluids("gtceu:unknowwater 1000", "gtceu:xpjuice 1000").outputFluids("gtceu:echo_shard 10000").EUt(1920).duration(2400)

    gtr.canner("minecraft:sculk")
        .itemInputs("minecraft:dirt", "minecraft:sculk_vein").inputFluids("gtceu:xpjuice 10").itemOutputs("minecraft:sculk").EUt(480)
        .duration(600)

    gtr.dimensionally_transcendent_plasma_forge("kubejs:cosmic_neutron_plasma_cell")
        .notConsumable("avaritia:infinity_catalyst").itemInputs("5x kubejs:extremely_durable_plasma_cell")
        .inputFluids("gtceu:uu_matter 1000000", "gtceu:dense_neutron_plasma 1000").itemOutputs("5x kubejs:cosmic_neutron_plasma_cell")
        .outputFluids("gtceu:dimensionallytranscendentresidue 100").EUt(GTValues.VA[GTValues.MAX]).duration(800).blastFurnaceTemp(28000)

    gtr.dimensionally_transcendent_plasma_forge("gtceu:crystalmatrix_plasma")
        .notConsumable("avaritia:infinity_catalyst").itemInputs("avaritia:crystal_matrix")
        .inputFluids("gtceu:uu_matter 1000000", "gtceu:free_proton_gas 20000")
        .outputFluids("gtceu:crystalmatrix_plasma 10000", "gtceu:dimensionallytranscendentresidue 100").EUt(GTValues.VA[GTValues.MAX])
        .duration(800).blastFurnaceTemp(28000)

    gtr.dimensionally_transcendent_plasma_forge("kubejs:infinity")
        .notConsumable("kubejs:spacetime_catalyst").inputFluids("gtceu:crystalmatrix_plasma 10000", "gtceu:cosmicneutronium 5000")
        .outputFluids("gtceu:infinity 1000", "gtceu:dimensionallytranscendentresidue 100").EUt(4 * GTValues.VA[GTValues.MAX]).duration(1600)
        .blastFurnaceTemp(32000)

    gtr.stellar_forge("gtceu:eternity_dust")
        .itemInputs("4x kubejs:quantum_chromodynamic_charge", "avaritia:eternal_singularity")
        .inputFluids("gtceu:primordialmatter 1000", "gtceu:dimensionallytranscendentresidue 1000").itemOutputs("gtceu:eternity_dust")
        .outputFluids("gtceu:temporalfluid 1000").EUt(GTValues.VA[GTValues.MAX]).duration(800).addData("SCTier", 3)

    gtr.stellar_forge("gtceu:temporalfluid")
        .itemInputs("4x kubejs:quantum_chromodynamic_charge", "kubejs:hypercube")
        .inputFluids("gtceu:spacetime 1000", "gtceu:dimensionallytranscendentresidue 100")
        .outputFluids("gtceu:temporalfluid 500", "gtceu:spatialfluid 500").EUt(GTValues.VA[GTValues.MAX]).duration(800).addData("SCTier", 3)

    gtr.dimensionally_transcendent_plasma_forge("gtceu:dimensionallytranscendentresidue")
        .inputFluids("gtceu:dimensionallytranscendentcrudecatalyst 100", "gtceu:raw_star_matter_plasma 100")
        .outputFluids("gtceu:dimensionallytranscendentresidue 100").EUt(GTValues.VA[GTValues.MAX]).duration(400).blastFurnaceTemp(36000)

    gtr.dimensionally_transcendent_plasma_forge("gtceu:spacetime_ingot")
        .notConsumable("64x kubejs:ingot_field_shape").notConsumable("64x gtlcore:spacetimebendingcore")
        .inputFluids("gtceu:spacetime 1000", "gtceu:raw_star_matter_plasma 1000").outputFluids("gtceu:dimensionallytranscendentresidue 100")
        .itemOutputs("8x gtceu:spacetime_ingot").EUt(GTValues.VA[GTValues.MAX]).duration(6400).blastFurnaceTemp(62000)

    gtr.dimensionally_transcendent_plasma_forge("gtceu:spacetime")
        .notConsumable("kubejs:spacetime_catalyst").inputFluids("gtceu:infinity 100", "gtceu:hypogen 100")
        .outputFluids("gtceu:spacetime 200", "gtceu:dimensionallytranscendentresidue 100").EUt(4 * GTValues.VA[GTValues.MAX]).duration(1600)
        .blastFurnaceTemp(36000)

    gtr.dimensionally_transcendent_plasma_forge("gtceu:magnetohydrodynamicallyconstrainedstarmatter")
        .notConsumable("kubejs:eternity_catalyst").itemInputs("gtceu:eternity_nanoswarm")
        .inputFluids("gtceu:raw_star_matter_plasma 400000", "gtceu:exciteddtsc 100000")
        .outputFluids("gtceu:magnetohydrodynamicallyconstrainedstarmatter 400000", "gtceu:dimensionallytranscendentresidue 100")
        .EUt(1024 * GTValues.VA[GTValues.MAX]).duration(25600).blastFurnaceTemp(81000)

    gtr.dimensionally_transcendent_plasma_forge("gtceu:dense_neutron_plasma")
        .notConsumable("avaritia:infinity_catalyst").itemInputs("kubejs:neutron_plasma_containment_cell")
        .inputFluids("gtceu:heavy_quark_degenerate_matter_plasma 10000", "gtceu:periodicium 1000")
        .outputFluids("gtceu:dense_neutron_plasma 10000", "gtceu:dimensionallytranscendentresidue 100")
        .itemOutputs("kubejs:plasma_containment_cell").EUt(GTValues.VA[GTValues.MAX]).duration(800).blastFurnaceTemp(26000)

    batch(gtr, "dimensionally_transcendent_plasma_forge", ["notConsumable", "itemInputs", "inputFluids", "outputFluids", "EUt", "duration", "blastFurnaceTemp"], [
        ["gtceu:eternity", ["kubejs:eternity_catalyst"], ["avaritia:eternal_singularity"],
            ["gtceu:primordialmatter 1000", "gtceu:raw_star_matter_plasma 9000"],
            ["gtceu:eternity 10000", "gtceu:dimensionallytranscendentresidue 100"], [16 * GTValues.VA[GTValues.MAX]], [4800], [56000]],
        ["gtceu:rhugnor", ["avaritia:infinity_catalyst"], ["64x gtceu:energy_crystal"], ["gtceu:infinity 10000", "gtceu:quantum 10000"],
            ["gtceu:rhugnor 10000", "gtceu:dimensionallytranscendentresidue 100"], [4 * GTValues.VA[GTValues.MAX]], [3600], [36000]],
        ["gtceu:hypogen", ["avaritia:infinity_catalyst"], ["gtceu:quantumchromodynamically_confined_matter_block"],
            ["gtceu:rhugnor 10000", "gtceu:dragon_blood 10000"], ["gtceu:hypogen 10000", "gtceu:dimensionallytranscendentresidue 100"],
            [GTValues.VA[GTValues.MAX]], [1200], [26000]]
    ]);

    gtr.macerator("gtceu:spacetime_dust")
        .itemInputs("gtceu:spacetime_ingot").itemOutputs("gtceu:spacetime_dust").EUt(GTValues.VA[GTValues.MAX]).duration(400)

    gtr.compressor("gtceu:spacetime_block")
        .itemInputs("9x gtceu:spacetime_ingot").itemOutputs("gtceu:spacetime_block").EUt(GTValues.VA[GTValues.MAX]).duration(3000)

    batch(gtr, "qft", ["notConsumable", "notConsumable", "itemInputs", "inputFluids", "itemOutputs", ["EUt", 16 * GTValues.VA[GTValues.MAX]], "duration"], [
        ["gtceu:spacetime_single_wire", ["gtceu:spacetime_nanoswarm"], ["gtceu:transcendentmetal_nanoswarm"], ["gtceu:infinity_single_wire"],
            ["gtceu:spacetime 100", "gtceu:rhugnor 100"], ["gtceu:spacetime_single_wire"], [400]],
        ["gtceu:spacetime_double_wire", ["4x gtceu:spacetime_nanoswarm"], ["4x gtceu:transcendentmetal_nanoswarm"], ["2x gtceu:spacetime_single_wire"],
            ["gtceu:rhugnor 200"], ["gtceu:spacetime_double_wire"], [800]],
        ["gtceu:spacetime_quadruple_wire", ["8x gtceu:spacetime_nanoswarm"], ["8x gtceu:transcendentmetal_nanoswarm"],
            ["2x gtceu:spacetime_double_wire"], ["gtceu:rhugnor 400"], ["gtceu:spacetime_quadruple_wire"], [1600]],
        ["gtceu:spacetime_octal_wire", ["16x gtceu:spacetime_nanoswarm"], ["16x gtceu:transcendentmetal_nanoswarm"],
            ["2x gtceu:spacetime_quadruple_wire"], ["gtceu:rhugnor 800"], ["gtceu:spacetime_octal_wire"], [3200]],
        ["gtceu:spacetime_hex_wire", ["32x gtceu:spacetime_nanoswarm"], ["32x gtceu:transcendentmetal_nanoswarm"], ["2x gtceu:spacetime_octal_wire"],
            ["gtceu:rhugnor 1600"], ["gtceu:spacetime_hex_wire"], [6400]]
    ]);
});
