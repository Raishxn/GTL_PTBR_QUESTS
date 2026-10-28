// priority: 95
// 碳纳米管、高能炸药、稀土与精金、振金加工。
// 由 gtceu.js 按既有阶段顺序执行，本文件只登记配方，不依赖文件名排序。
global.gtlPack.register("advanced_chemistry", event => {
    const gtr = event.recipes.gtceu;
    const batch = global.gtlPack.batch;

    // 碳纳米管
    gtr.chemical_reactor("gtceu:carbon_nanotubes_ingot")
        .notConsumable("gtceu:rhenium_plate").inputFluids("gtceu:methane 800", "gtceu:cycloparaphenylene 200")
        .itemOutputs("gtceu:carbon_nanotubes_ingot").circuit(1).EUt(320000).duration(290).cleanroom(CleanroomType.CLEANROOM)

    gtr.large_chemical_reactor("gtceu:cycloparaphenylene")
        .itemInputs("23x gtceu:dichlorocyclooctadieneplatinium_dust", "8x gtceu:carbon_dust", "4x gtceu:diiodobiphenyl_dust")
        .inputFluids("gtceu:trimethyltin_chloride 4000", "gtceu:silver_tetrafluoroborate 4000")
        .itemOutputs("3x gtceu:platinum_raw_dust", "4x gtceu:silver_dust")
        .outputFluids("gtceu:cycloparaphenylene 10000", "gtceu:boron_fluoride 4000", "gtceu:1_octene 3000", "gtceu:hydrofluoric_acid 4000")
        .EUt(GTValues.VA[GTValues.UHV]).duration(800).cleanroom(CleanroomType.CLEANROOM)

    gtr.large_chemical_reactor("gtceu:dichlorocyclooctadieneplatinium_dust")
        .itemInputs("gtceu:platinum_dust", "2x gtceu:potassium_dust")
        .inputFluids("gtceu:nitric_acid 4000", "gtceu:hydrochloric_acid 4000", "gtceu:cyclooctadiene 1000")
        .itemOutputs("23x gtceu:dichlorocyclooctadieneplatinium_dust", "4x gtceu:rock_salt_dust").EUt(GTValues.VA[GTValues.UV]).duration(400)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.chemical_reactor("gtceu:cyclooctadiene")
        .notConsumable("gtceu:nickel_dust").inputFluids("gtceu:butadiene 2000").outputFluids("gtceu:cyclooctadiene 1000")
        .EUt(GTValues.VA[GTValues.LuV]).duration(200)

    gtr.large_chemical_reactor("gtceu:diiodobiphenyl_dust")
        .notConsumable("gtceu:blacklight").itemInputs("2x gtceu:iodine_dust", "22x gtceu:biphenyl_dust").outputFluids("gtceu:hydrogen 2000")
        .itemOutputs("22x gtceu:diiodobiphenyl_dust").EUt(GTValues.VA[GTValues.ZPM]).duration(200)

    batch(gtr, "chemical_reactor", ["notConsumable", "inputFluids", "outputFluids", "EUt", "duration"], [
        ["gtceu:formaldehyde", ["gtceu:silver_dust"], ["gtceu:methanol 1000", "gtceu:oxygen 1000"], ["gtceu:formaldehyde 1000"],
            [GTValues.VA[GTValues.IV]], [200]],
        ["gtceu:acetaldehyde", ["gtceu:osmium_tetroxide_dust"], ["gtceu:acetone 1000", "gtceu:oxygen 1000"],
            ["gtceu:formaldehyde 1000", "gtceu:acetaldehyde 1000"], [GTValues.VA[GTValues.LuV]], [320]]
    ]);

    gtr.large_chemical_reactor("gtceu:trimethyltin_chloride")
        .notConsumable("gtceu:magnesium_dust").itemInputs("gtceu:tin_dust")
        .inputFluids("gtceu:methane 3000", "gtceu:oxygen 1000", "gtceu:chlorine 2000")
        .outputFluids("gtceu:trimethyltin_chloride 1000", "gtceu:diluted_hydrochloric_acid 2000").EUt(GTValues.VA[GTValues.LuV]).duration(320)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.chemical_reactor("gtceu:silver_tetrafluoroborate")
        .itemInputs("6x gtceu:silver_dust").inputFluids("gtceu:boron_fluoride 2000", "gtceu:oxygen 3000")
        .outputFluids("gtceu:silver_tetrafluoroborate 6000").itemOutputs("5x gtceu:boron_trioxide_dust").EUt(GTValues.VA[GTValues.ZPM])
        .duration(200)

    gtr.chemical_reactor("gtceu:boron_fluoride")
        .itemInputs("5x gtceu:boron_trioxide_dust").inputFluids("gtceu:hydrofluoric_acid 6000").outputFluids("gtceu:boron_fluoride 2000")
        .EUt(GTValues.VA[GTValues.HV]).duration(200)

    gtr.dehydrator("gtceu:boron_trioxide_dust")
        .inputFluids("gtceu:boric_acide 2000").itemOutputs("5x gtceu:boron_trioxide_dust").EUt(GTValues.VA[GTValues.HV]).duration(400)

    gtr.chemical_reactor("gtceu:pyridine")
        .inputFluids("gtceu:formaldehyde 2000", "gtceu:acetaldehyde 1000", "gtceu:ammonia 1000")
        .outputFluids("gtceu:pyridine 1000", "gtceu:hydrogen 2000").EUt(GTValues.VA[GTValues.EV]).duration(240)
        .cleanroom(CleanroomType.CLEANROOM)

    // 六硝基六氮杂异伍兹烷
    batch(gtr, "chemical_reactor", ["itemInputs", "inputFluids", "itemOutputs", "outputFluids", "EUt", "duration"], [
        ["gtceu:potassium_bisulfite_dust", ["6x gtceu:potassium_carbonate_dust"], ["gtceu:sulfur_dioxide 2000", "minecraft:water 1000"],
            ["12x gtceu:potassium_bisulfite_dust"], ["gtceu:carbon_dioxide 1000"], [GTValues.VA[GTValues.HV]], [160]],
        ["gtceu:potassium_hydroxylaminedisulfonate_dust", ["12x gtceu:potassium_bisulfite_dust"], ["gtceu:nitrous_acid 1000"],
            ["13x gtceu:potassium_hydroxylaminedisulfonate_dust"], ["minecraft:water 1000"], [GTValues.VA[GTValues.EV]], [200]],
        ["gtceu:hydroxylammonium_sulfate_dust", ["26x gtceu:potassium_hydroxylaminedisulfonate_dust"], ["minecraft:water 4000"],
            ["17x gtceu:hydroxylammonium_sulfate_dust", "14x gtceu:potassium_sulfate_dust"], ["gtceu:sulfuric_acid 1000"], [GTValues.VA[GTValues.EV]],
            [200]]
    ]);

    gtr.chemical_reactor("gtceu:hexanitrohexaaxaisowurtzitane_dust")
        .inputFluids("gtceu:ethylenediamine 1000").itemInputs("36x gtceu:crude_hexanitrohexaaxaisowurtzitane_dust", "3x gtceu:silica_gel_dust")
        .itemOutputs("36x gtceu:hexanitrohexaaxaisowurtzitane_dust").EUt(GTValues.VA[GTValues.EV]).duration(100)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.chemical_reactor("gtceu:ethylenediamine")
        .notConsumable("gtceu:palladium_dust").inputFluids("gtceu:ammonia 1000", "gtceu:ethanolamine 1000")
        .outputFluids("gtceu:ethylenediamine 1000", "minecraft:water 1000").EUt(120).duration(180)

    gtr.chemical_reactor("gtceu:ethanolamine")
        .inputFluids("gtceu:ammonia 1000", "gtceu:ethylene_oxide 1000").outputFluids("gtceu:ethanolamine 1000").EUt(7680).duration(60)

    gtr.chemical_reactor("gtceu:ethylene_oxide")
        .inputFluids("gtceu:oxygen 1000", "gtceu:ethylene 1000").outputFluids("gtceu:ethylene_oxide 1000").EUt(480).circuit(4).duration(80)

    gtr.mixer("gtceu:silica_gel_base")
        .itemInputs("3x gtceu:silicon_dioxide_dust", "3x gtceu:sodium_hydroxide_dust").inputFluids("gtceu:distilled_water 1000")
        .outputFluids("gtceu:silica_gel_base 1000").EUt(120).duration(80).cleanroom(CleanroomType.CLEANROOM)

    gtr.chemical_reactor("gtceu:crude_hexanitrohexaaxaisowurtzitane_dust")
        .inputFluids("minecraft:water 4000")
        .itemInputs("46x gtceu:tetraacetyldinitrosohexaazaisowurtzitane_dust", "48x gtceu:nitronium_tetrafluoroborate_dust")
        .itemOutputs("36x gtceu:crude_hexanitrohexaaxaisowurtzitane_dust", "14x gtceu:nitrosonium_tetrafluoroborate_dust")
        .outputFluids("gtceu:fluoroboric_acide 4000", "gtceu:acetic_acid 4000").EUt(GTValues.VA[GTValues.UV]).duration(200)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.chemical_reactor("gtceu:nitronium_tetrafluoroborate_dust")
        .inputFluids("gtceu:boron_fluoride 1000", "gtceu:hydrofluoric_acid 1000", "gtceu:nitric_acid 1000")
        .itemOutputs("8x gtceu:nitronium_tetrafluoroborate_dust").outputFluids("minecraft:water 1000").EUt(1920).duration(40)

    gtr.chemical_reactor("gtceu:tetraacetyldinitrosohexaazaisowurtzitane_dust")
        .inputFluids("minecraft:water 14000")
        .itemInputs("70x gtceu:dibenzyltetraacetylhexaazaisowurtzitane_dust", "42x gtceu:nitrosonium_tetrafluoroborate_dust")
        .itemOutputs("46x gtceu:tetraacetyldinitrosohexaazaisowurtzitane_dust")
        .outputFluids("gtceu:hydrofluoric_acid 24000", "gtceu:boric_acide 6000", "gtceu:nitric_oxide 4000", "gtceu:benzaldehyde 2000").EUt(7680)
        .duration(140)

    gtr.chemical_reactor("gtceu:nitrosonium_tetrafluoroborate_dust")
        .inputFluids("gtceu:boron_fluoride 2000", "gtceu:hydrofluoric_acid 2000", "gtceu:dinitrogen_tetroxide 2000")
        .itemOutputs("7x gtceu:nitrosonium_tetrafluoroborate_dust").outputFluids("gtceu:nitric_acid 1000").EUt(120).duration(120)

    gtr.large_chemical_reactor("gtceu:dibenzyltetraacetylhexaazaisowurtzitane_dust")
        .notConsumableFluid("gtceu:hydrobromic_acid 10000")
        .itemInputs("72x gtceu:succinimidyl_acetate_dust", "102x gtceu:hexabenzylhexaazaisowurtzitane_dust").inputFluids("gtceu:hydrogen 8000")
        .itemOutputs("70x gtceu:dibenzyltetraacetylhexaazaisowurtzitane_dust").outputFluids("gtceu:toluene 6000").EUt(122880).duration(120)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.chemical_reactor("gtceu:hydrobromic_acid")
        .inputFluids("gtceu:bromine 1000", "gtceu:hydrogen 1000").outputFluids("gtceu:hydrobromic_acid 1000").EUt(480).duration(300)

    gtr.chemical_reactor("gtceu:succinimidyl_acetate_dust")
        .inputFluids("gtceu:acetic_anhydride 1000").itemInputs("13x gtceu:n_hydroxysuccinimide_dust")
        .itemOutputs("18x gtceu:succinimidyl_acetate_dust").outputFluids("gtceu:acetic_acid 1000").EUt(7680).duration(80)

    gtr.chemical_reactor("gtceu:n_hydroxysuccinimide_dust")
        .inputFluids("gtceu:methanol 40000", "gtceu:toluene 6000", "gtceu:hydroxylamine_hydrochloride 6000")
        .itemInputs("6x gtceu:sodium_dust", "66x gtceu:succinic_anhydride_dust").outputFluids("minecraft:water 6000", "gtceu:hydrogen 6000")
        .itemOutputs("13x gtceu:n_hydroxysuccinimide_dust", "12x gtceu:salt_dust").EUt(1920).duration(220).cleanroom(CleanroomType.CLEANROOM)

    gtr.chemical_reactor("gtceu:succinic_anhydride_dust")
        .inputFluids("gtceu:acetic_anhydride 1000").itemInputs("14x gtceu:succinic_acid_dust").itemOutputs("11x gtceu:succinic_anhydride_dust")
        .outputFluids("gtceu:acetic_acid 2000").EUt(7680).duration(20)

    gtr.chemical_reactor("gtceu:succinic_acid_dust")
        .notConsumable("gtceu:rhodium_plated_palladium_dust")
        .inputFluids("minecraft:water 1000", "gtceu:hydrogen 1000", "gtceu:maleic_anhydride 2000").itemOutputs("14x gtceu:succinic_acid_dust")
        .EUt(1920).duration(200)

    gtr.chemical_reactor("gtceu:maleic_anhydride")
        .notConsumable("gtceu:bismuth_dust").inputFluids("gtceu:oxygen 7000", "gtceu:butane 1000")
        .outputFluids("minecraft:water 4000", "gtceu:maleic_anhydride 1000").EUt(480).duration(280)

    gtr.large_chemical_reactor("gtceu:hydroxylamine_hydrochloride")
        .itemInputs("17x gtceu:hydroxylammonium_sulfate_dust", "3x gtceu:barium_chloride_dust")
        .outputFluids("gtceu:hydroxylamine_hydrochloride 2000", "minecraft:water 1000").itemOutputs("6x gtceu:barite_dust")
        .EUt(GTValues.VA[GTValues.HV]).duration(100)

    gtr.chemical_reactor("gtceu:nitrous_acid")
        .itemInputs("4x gtceu:sodium_nitrite_dust").inputFluids("gtceu:sulfuric_acid 1000").itemOutputs("7x gtceu:sodium_bisulfate_dust")
        .outputFluids("gtceu:nitrous_acid 1000").EUt(30).duration(80)

    gtr.chemical_reactor("gtceu:barium_chloride_dust")
        .inputFluids("gtceu:hydrochloric_acid 2000").itemInputs("6x gtceu:barium_dust").outputFluids("gtceu:hydrogen 2000")
        .itemOutputs("3x gtceu:barium_chloride_dust").EUt(120).duration(60)

    gtr.chemical_reactor("gtceu:hexabenzylhexaazaisowurtzitane_dust")
        .inputFluids("gtceu:benzylamine 6000", "gtceu:glyoxal 3000").itemInputs("6x gtceu:acetonitrile_dust")
        .itemOutputs("102x gtceu:hexabenzylhexaazaisowurtzitane_dust").EUt(7680).duration(100)

    gtr.large_chemical_reactor("gtceu:acetonitrile_dust")
        .inputFluids("gtceu:ammonia 1000", "gtceu:carbon_monoxide 2000", "gtceu:hydrogen 4000").outputFluids("minecraft:water 2000")
        .itemOutputs("6x gtceu:acetonitrile_dust").EUt(GTValues.VA[GTValues.UHV]).duration(200).cleanroom(CleanroomType.CLEANROOM)

    gtr.large_chemical_reactor("gtceu:glyoxal")
        .inputFluids("gtceu:acetaldehyde 2000", "gtceu:nitric_acid 2000")
        .outputFluids("minecraft:water 3000", "gtceu:glyoxal 2000", "gtceu:nitrogen_dioxide 1000").EUt(60).duration(120)

    gtr.large_chemical_reactor("gtceu:benzylamine")
        .itemInputs("22x gtceu:hexamethylenetetramine_dust")
        .inputFluids("minecraft:water 6000", "gtceu:hydrochloric_acid 2000", "gtceu:benzyl_chloride 1000")
        .outputFluids("gtceu:benzylamine 1000", "gtceu:formaldehyde 6000").itemOutputs("18x gtceu:ammonium_chloride_dust").EUt(7680)
        .duration(200)

    gtr.chemical_reactor("gtceu:benzyl_chloride")
        .notConsumable("gtceu:blacklight").inputFluids("gtceu:toluene 1000", "gtceu:chlorine 2000")
        .outputFluids("gtceu:benzyl_chloride 1000", "gtceu:hydrochloric_acid 1000").EUt(480).duration(200)

    gtr.chemical_reactor("gtceu:hexamethylenetetramine_dust")
        .circuit(1).inputFluids("gtceu:formaldehyde 4000", "gtceu:ammonia 6000").itemOutputs("22x gtceu:hexamethylenetetramine_dust")
        .outputFluids("minecraft:water 6000").EUt(30).duration(160)

    // 稀土
    gtr.dissolution_treatment("gtceu:rare_earth_hydroxides")
        .itemInputs("gtceu:rare_earth_dust", "3x gtceu:sodium_hydroxide_dust").inputFluids("gtceu:phosphoric_acid 100")
        .inputFluids("minecraft:water 900").outputFluids("gtceu:rare_earth_hydroxides 1000").EUt(480).duration(50)

    gtr.chemical_reactor("gtceu:rare_earth_chlorides")
        .inputFluids("gtceu:rare_earth_hydroxides 1000", "gtceu:hydrochloric_acid 1000").outputFluids("gtceu:rare_earth_chlorides 1000")
        .itemOutputs("3x gtceu:sodium_hydroxide_dust").EUt(30).duration(120)

    gtr.digestion_treatment("gtceu:rare_earth_oxide_dust")
        .inputFluids("gtceu:rare_earth_chlorides 1000").itemInputs("3x gtceu:sodium_oxide_dust").outputFluids("gtceu:salt_water 1000")
        .itemOutputs("gtceu:rare_earth_oxide_dust").EUt(1920).duration(800).blastFurnaceTemp(2580)

    gtr.digestion_treatment("gtceu:rare_earth_metal_dust")
        .itemInputs("gtceu:rare_earth_oxide_dust").inputFluids("gtceu:hydrogen 1000").itemOutputs("gtceu:rare_earth_metal_dust")
        .outputFluids("minecraft:water 500").EUt(7680).duration(400).blastFurnaceTemp(1760)

    gtr.rare_earth_centrifugal("rare_earth_centrifugal")
        .itemInputs("gtceu:rare_earth_metal_dust")
        .itemOutputs("gtceu:small_lanthanum_dust", "gtceu:small_cerium_dust", "gtceu:small_neodymium_dust", "gtceu:small_promethium_dust",
            "gtceu:small_samarium_dust", "gtceu:small_europium_dust", "gtceu:small_praseodymium_dust", "gtceu:small_gadolinium_dust",
            "gtceu:small_terbium_dust", "gtceu:small_dysprosium_dust", "gtceu:small_holmium_dust", "gtceu:small_erbium_dust",
            "gtceu:small_thulium_dust", "gtceu:small_ytterbium_dust", "gtceu:small_scandium_dust", "gtceu:small_lutetium_dust",
            "gtceu:small_yttrium_dust")
        .EUt(GTValues.VA[GTValues.UV]).duration(200)

    // 精金
    gtr.large_chemical_reactor("gtceu:adamantine_dust")
        .itemInputs("2x gtceu:adamantine_compounds_dust", "17x gtceu:mirabilite_dust")
        .inputFluids("gtceu:nitration_mixture 1000", "gtceu:aqua_regia 2000", "gtceu:mana 100")
        .itemOutputs("gtceu:adamantine_dust", "5x gtceu:sodium_nitrate_dust", "7x gtceu:sodium_bisulfate_dust")
        .outputFluids("gtceu:rare_earth_chlorides 1000").EUt(GTValues.VA[GTValues.UEV]).duration(400)

    gtr.rare_earth_centrifugal("gtceu:raw_adamantine")
        .itemInputs("gtceu:naquadah_contain_rare_earth_dust").chancedOutput("gtceu:raw_adamantine_compounds", 5000, 1000)
        .itemOutputs("6x gtceu:enriched_naquadah_sulfate_dust", "6x gtceu:naquadria_sulfate_dust").EUt(GTValues.VA[GTValues.UEV]).duration(200)

    gtr.digestion_treatment("gtceu:naquadah_contain_rare_earth_dust")
        .itemInputs("gtceu:naquadah_contain_rare_earth_fluoride_dust").inputFluids("gtceu:hydrogen 2000")
        .outputFluids("gtceu:hydrofluoric_acid 2000").itemOutputs("gtceu:naquadah_contain_rare_earth_dust").EUt(491520).duration(800)
        .blastFurnaceTemp(6800)

    // 振金
    gtr.electric_blast_furnace("gtceu:bedrock_smoke")
        .itemInputs("gtceu:bedrock_dust").inputFluids("gtceu:xenon 100").outputFluids("gtceu:bedrock_smoke 1000").EUt(GTValues.VA[GTValues.UEV])
        .duration(400).blastFurnaceTemp(16200)

    gtr.dissolution_treatment("gtceu:bedrock_soot_solution")
        .inputFluids("gtceu:bedrock_smoke 1000").inputFluids("gtceu:distilled_water 1000").itemInputs("gtceu:naquadah_dust")
        .outputFluids("gtceu:bedrock_soot_solution 1000").EUt(7680).duration(400)

    gtr.centrifuge("gtceu:clean_bedrock_solution")
        .inputFluids("gtceu:bedrock_soot_solution 2000")
        .itemOutputs("gtceu:small_naquadah_dust", "gtceu:tiny_enriched_naquadah_dust", "gtceu:tiny_naquadria_dust")
        .outputFluids("gtceu:clean_bedrock_solution 1000").EUt(GTValues.VA[GTValues.UV]).duration(200)

    gtr.fluid_heater("gtceu:bedrock_gas")
        .inputFluids("gtceu:clean_bedrock_solution 1000").outputFluids("gtceu:bedrock_gas 1000").EUt(GTValues.VA[GTValues.UIV]).duration(100)

    gtr.large_chemical_reactor("gtceu:vibranium_unstable")
        .inputFluids("gtceu:bedrock_gas 1000", "gtceu:hydrochloric_acid 4000").itemInputs("2x gtceu:adamantine_dust")
        .outputFluids("gtceu:vibranium_unstable 500", "gtceu:rare_earth_chlorides 1000").itemOutputs("4x gtceu:iridium_chloride_dust")
        .EUt(GTValues.VA[GTValues.UEV]).duration(200)
});
