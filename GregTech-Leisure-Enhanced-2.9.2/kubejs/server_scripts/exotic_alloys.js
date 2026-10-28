// priority: 95
// 聚对苯撑苯并二噁唑、塔兰、拉多克斯与龙系材料。
// 由 gtceu.js 按既有阶段顺序执行，本文件只登记配方，不依赖文件名排序。
global.gtlPack.register("exotic_alloys", event => {
    const gtr = event.recipes.gtceu;
    const batch = global.gtlPack.batch;

    // 聚对苯撑苯并二噁唑
    gtr.electric_blast_furnace("gtceu:zylon_dust")
        .itemInputs("gtceu:pre_zylon_dust").outputFluids("gtceu:propane 2000").itemOutputs("gtceu:zylon_dust").EUt(120).duration(16000)
        .blastFurnaceTemp(10000)

    gtr.chemical_reactor("gtceu:pre_zylon_dust")
        .itemInputs("16x gtceu:terephthalaldehyde_dust").inputFluids("gtceu:dinitrodipropanyloxybenzene 1000")
        .itemOutputs("gtceu:pre_zylon_dust").outputFluids("gtceu:oxygen 6000").EUt(GTValues.VA[GTValues.UEV]).duration(50)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.large_chemical_reactor("gtceu:terephthalaldehyde_dust")
        .inputFluids("gtceu:sulfuric_acid 1000", "gtceu:dibromomethylbenzene 1000").itemOutputs("16x gtceu:terephthalaldehyde_dust")
        .outputFluids("gtceu:bromine 2000", "gtceu:hydrogen_sulfide 1000", "minecraft:water 1000", "gtceu:oxygen 1000").EUt(7680).duration(50)

    gtr.large_chemical_reactor("gtceu:dinitrodipropanyloxybenzene")
        .itemInputs("3x gtceu:sodium_oxide_dust")
        .inputFluids("gtceu:acetic_anhydride 1000", "gtceu:isochloropropane 1000", "gtceu:resorcinol 1000", "gtceu:propene 1000", "gtceu:nitric_acid 2000")
        .outputFluids("gtceu:dinitrodipropanyloxybenzene 1000", "minecraft:water 2000", "gtceu:acetic_acid 2000").EUt(7680).duration(50)

    gtr.chemical_reactor("gtceu:sodium_oxide_dust")
        .itemInputs("2x gtceu:sodium_dust").inputFluids("gtceu:oxygen 1000").circuit(1).itemOutputs("3x gtceu:sodium_oxide_dust").EUt(7)
        .duration(60)

    gtr.chemical_reactor("gtceu:dibromomethylbenzene")
        .inputFluids("gtceu:bromine 2000", "gtceu:toluene 1000").outputFluids("gtceu:dibromomethylbenzene 1000", "gtceu:hydrogen 2000").EUt(30)
        .duration(600)

    // 塔兰
    gtr.chemical_bath("gtceu:metal_residue_dust")
        .inputFluids("gtceu:bedrock_gas 100").itemInputs("gtceu:partially_oxidized_residues_dust").itemOutputs("gtceu:metal_residue_dust")
        .EUt(GTValues.VA[GTValues.ZPM]).duration(200)

    gtr.centrifuge("gtceu:inert_residues_dust")
        .notConsumable("gtlcore:separation_electromagnet").itemInputs("10x gtceu:metal_residue_dust").inputFluids("gtceu:distilled_water 10000")
        .itemOutputs("gtceu:inert_residues_dust").outputFluids("gtceu:oxidized_residual_solution 10000").EUt(GTValues.VA[GTValues.UV])
        .duration(200)

    gtr.ore_washer("gtceu:clean_inert_residues_dust")
        .itemInputs("gtceu:inert_residues_dust").inputFluids("gtceu:aqua_regia 1000").itemOutputs("gtceu:clean_inert_residues_dust").EUt(480)
        .duration(400)

    gtr.centrifuge("gtceu:taranium_enriched_liquid_helium_3")
        .notConsumable("gtlcore:separation_electromagnet").inputFluids("gtceu:dusty_liquid_helium_iii 1000")
        .outputFluids("gtceu:taranium_enriched_liquid_helium_3 500").EUt(3000).duration(400)

    gtr.fermenter("gtceu:taranium_dust")
        .inputFluids("gtceu:taranium_rich_liquid_helium_4 1000").itemInputs("gtceu:activated_carbon_dust").itemOutputs("gtceu:taranium_dust")
        .EUt(2).duration(200000)

    // 拉多克斯
    batch(gtr, "incubator", ["itemInputs", ["inputFluids", "gtceu:unknowwater 10000", "gtceu:biomass 1000"], ["itemOutputs", "64x kubejs:variation_wood"],
        ["EUt", GTValues.VA[GTValues.UHV]], ["duration", 2400]], [
        ["kubejs:variation_wood", ["64x kubejs:barnarda_log", "16x minecraft:crimson_stem", "64x #forge:dusts/wood", "gtceu:lapotron_dust"]],
        ["kubejs:variation_wood1", ["64x kubejs:barnarda_log", "16x minecraft:warped_stem", "64x #forge:dusts/wood", "gtceu:lapotron_dust"]]
    ]);

    gtr.qft("gtceu:radox")
        .inputFluids("gtceu:radox_gas 21600", "gtceu:oxygen_plasma 75000", "gtceu:titanium_50_tetrachloride 1000")
        .itemInputs("16x gtceu:molybdenum_trioxide_dust", "16x gtceu:chromium_trioxide_dust", "14x gtceu:phosphorus_pentoxide_dust",
            "12x gtceu:cubic_zirconia_dust", "12x gtceu:germanium_dioxide_dust", "12x gtceu:silicon_dioxide_dust",
            "10x gtceu:arsenic_trioxide_dust", "10x gtceu:antimony_trioxide_dust", "10x gtceu:boron_trioxide_dust", "8x gtceu:zincite_dust",
            "8x gtceu:magnesia_dust", "8x gtceu:cobalt_oxide_dust", "8x gtceu:massicot_dust", "8x gtceu:cupric_oxide_dust",
            "6x gtceu:potash_dust", "6x gtceu:silver_oxide_dust", "6x gtceu:sodium_oxide_dust", "4x gtceu:rare_earth_oxide_dust")
        .outputFluids("gtceu:radox 10800").EUt(GTValues.VA[GTValues.OpV]).duration(8000)

    gtr.distillation_tower("gtceu:radox_gas")
        .inputFluids("gtceu:crackedradox 1000").outputFluids("gtceu:radox_gas 100", "gtceu:lightradox 200").EUt(GTValues.VA[GTValues.UV])
        .itemOutputs("gtceu:ash_dust").duration(600)

    gtr.distillation_tower("gtceu:dilutedxenoxene")
        .inputFluids("gtceu:dilutedxenoxene 1000").outputFluids("gtceu:xenoxene 250", "gtceu:lightradox 300").itemOutputs("gtceu:ash_dust")
        .EUt(GTValues.VA[GTValues.UV]).duration(200)

    batch(gtr, "cracker", ["inputFluids", "outputFluids", ["circuit", 1], ["EUt", GTValues.VA[GTValues.UV]], "duration"], [
        ["gtceu:crackedradox", ["gtceu:superlightradox 100", "gtceu:silver_plasma 10"], ["gtceu:crackedradox 100"], [300]],
        ["gtceu:superlightradox", ["gtceu:lightradox 100", "gtceu:silver_plasma 10"], ["gtceu:superlightradox 50"], [300]],
        ["gtceu:lightradox", ["gtceu:heavyradox 100", "gtceu:silver_plasma 10"], ["gtceu:lightradox 20"], [200]]
    ]);

    gtr.distillation_tower("gtceu:rawradox")
        .inputFluids("gtceu:rawradox 5000")
        .outputFluids("gtceu:oil_heavy 600", "gtceu:oil 300", "gtceu:creosote 1000", "minecraft:water 1400", "gtceu:bacteria 50", "gtceu:fermented_biomass 50",
            "gtceu:superheavyradox 100", "gtceu:heavyradox 100", "gtceu:dilutedxenoxene 100", "gtceu:lightradox 100", "gtceu:superlightradox 100")
        .itemOutputs("5x gtceu:ash_dust").EUt(GTValues.VA[GTValues.UV]).duration(800)

    gtr.mixer("gtceu:xenoxene_mixture")
        .itemInputs("gtceu:tiny_radox_dust", "gtceu:antimony_dust", "gtceu:osmium_dust", "gtceu:ender_eye_dust")
        .inputFluids("gtceu:xenoxene 1000", "gtceu:xenon 9000").outputFluids("gtceu:xenoxene_mixture 10000").EUt(GTValues.VA[GTValues.UHV])
        .duration(800).cleanroom(CleanroomType.CLEANROOM)

    gtr.fluid_solidifier("gtceu:xenoxene_crystal_dust")
        .inputFluids("gtceu:xenoxene_mixture 1000").itemInputs("3x gtceu:perlite_dust").itemOutputs("3x gtceu:xenoxene_crystal_dust").EUt(1920)
        .duration(200)

    gtr.electrolyzer("gtceu:purified_xenoxene")
        .itemInputs("4x gtceu:xenoxene_crystal_dust").inputFluids("gtceu:oil 1000")
        .outputFluids("gtceu:purified_xenoxene 1000", "minecraft:water 1000").EUt(GTValues.VA[GTValues.LuV]).duration(900)

    gtr.mixer("gtceu:enriched_xenoxene")
        .itemInputs("gtceu:taranium_dust").inputFluids("gtceu:purified_xenoxene 10000", "gtceu:radox_gas 100")
        .outputFluids("gtceu:enriched_xenoxene 10000").EUt(GTValues.VA[GTValues.UV]).duration(600)

    gtr.mixer("gtceu:perlite_dust")
        .itemInputs("2x gtceu:obsidian_dust").inputFluids("minecraft:water 1000").itemOutputs("3x gtceu:perlite_dust").EUt(480).duration(300)

    batch(gtr, "pyrolyse_oven", ["inputFluids", ["itemInputs", "16x kubejs:variation_wood"], "outputFluids", ["itemOutputs", "gtceu:ash_dust"], ["circuit", 1], "EUt", "duration"], [
        ["gtceu:rawradox", ["gtceu:xenoxene 1000"], ["gtceu:rawradox 1000"], [GTValues.VA[GTValues.UV]], [900]],
        ["gtceu:rawradox1", ["gtceu:enriched_xenoxene 1000"], ["gtceu:rawradox 10000"], [GTValues.VA[GTValues.UEV]], [600]]
    ]);

    gtr.incubator("gtceu:xenoxene")
        .itemInputs("16x gtceu:antimony_trioxide_dust", "16x gtceu:osmium_dust").inputFluids("gtceu:oil 20000")
        .outputFluids("gtceu:xenoxene 20000").EUt(GTValues.VA[GTValues.UV]).duration(2400)

    gtr.centrifuge("gtceu:superheavyradox")
        .inputFluids("gtceu:superheavyradox 1000").outputFluids("gtceu:heavyradox 2000").EUt(GTValues.VA[GTValues.UHV]).duration(200)

    // 龙系材料
    batch(gtr, "electric_blast_furnace", [["itemInputs", "gtceu:draconium_dust"], "inputFluids", ["itemOutputs", "gtceu:hot_draconium_ingot"], ["EUt", GTValues.VA[GTValues.UXV]],
        ["blastFurnaceTemp", 21600], "duration"], [
        ["gtceu:hot_draconium_ingot_1", ["gtceu:cetane_boosted_diesel 2000"], [800]],
        ["gtceu:hot_draconium_ingot_2", ["gtceu:gasoline 1000"], [400]],
        ["gtceu:hot_draconium_ingot_3", ["gtceu:high_octane_gasoline 500"], [200]]
    ]);

    gtr.vacuum_freezer("gtceu:draconium_ingot")
        .itemInputs("gtceu:hot_draconium_ingot").inputFluids("gtceu:liquid_helium 1000").itemOutputs("gtceu:draconium_ingot")
        .outputFluids("gtceu:helium 500").duration(100).EUt(GTValues.VA[GTValues.UXV])

    gtr.sps_crafting("minecraft:dragon_breath")
        .itemInputs("minecraft:glass_bottle", "minecraft:dragon_egg").inputFluids("gtceu:mana 1000", "gtceu:dragon_blood 10")
        .itemOutputs("minecraft:dragon_breath").EUt(GTValues.VA[GTValues.UIV]).duration(80)

    gtr.canner("kubejs:infused_breath")
        .inputFluids("gtceu:xpjuice 1000").itemInputs("minecraft:dragon_breath").itemOutputs("kubejs:infused_breath").EUt(480).duration(400)
        .cleanroom(GTLCleanroomType.LAW_CLEANROOM)

    gtr.extractor("gtceu:dragon_breath")
        .itemInputs("kubejs:infused_breath").outputFluids("gtceu:dragon_breath 1000").itemOutputs("minecraft:glass_bottle").EUt(30).duration(200)
        .cleanroom(GTLCleanroomType.LAW_CLEANROOM)

    gtr.distillery("gtceu:enriched_dragon_breath")
        .inputFluids("gtceu:dragon_breath 10").outputFluids("gtceu:enriched_dragon_breath 5").EUt(120).duration(100)
        .cleanroom(GTLCleanroomType.LAW_CLEANROOM)

    gtr.sps_crafting("kubejs:dragon_stem_cells")
        .itemInputs("gtceu:stem_cells").inputFluids("gtceu:mana 1000", "gtceu:mutagen 100", "gtceu:enriched_dragon_breath 100")
        .itemOutputs("kubejs:dragon_stem_cells").EUt(GTValues.VA[GTValues.UEV]).duration(400)

    gtr.incubator("kubejs:dragon_cells")
        .itemInputs("64x kubejs:dragon_stem_cells", "16x gtceu:naquadria_dust")
        .inputFluids("gtceu:biohmediumsterilized 10000", "gtceu:mutagen 10000").itemOutputs("64x kubejs:dragon_cells")
        .EUt(GTValues.VA[GTValues.UV]).duration(1600)

    gtr.brewery("gtceu:dragon_blood")
        .itemInputs("kubejs:dragon_cells").inputFluids("gtceu:sterilized_growth_medium 1000").outputFluids("gtceu:dragon_blood 1000").EUt(480)
        .duration(6000).cleanroom(GTLCleanroomType.LAW_CLEANROOM)

    gtr.centrifuge("gtceu:dragon_element")
        .inputFluids("gtceu:turbid_dragon_blood 1000").outputFluids("gtceu:dragon_element 500").itemOutputs("gtceu:collagen_dust").EUt(7680)
        .duration(200).cleanroom(GTLCleanroomType.LAW_CLEANROOM)

    gtr.mixer("gtceu:turbid_dragon_blood")
        .inputFluids("gtceu:dragon_blood 1000", "gtceu:gelatin_mixture 1000").itemInputs("gtceu:silica_gel_dust")
        .outputFluids("gtceu:turbid_dragon_blood 1000").EUt(1920).duration(800).cleanroom(GTLCleanroomType.LAW_CLEANROOM)

    gtr.autoclave("gtceu:draconium_dust")
        .notConsumable("64x gtceu:enderium_nanoswarm").itemInputs("kubejs:draconium_dust").inputFluids("gtceu:dragon_element 1000")
        .itemOutputs("gtceu:draconium_dust").EUt(GTValues.VA[GTValues.UXV]).duration(200).cleanroom(GTLCleanroomType.LAW_CLEANROOM)
});
