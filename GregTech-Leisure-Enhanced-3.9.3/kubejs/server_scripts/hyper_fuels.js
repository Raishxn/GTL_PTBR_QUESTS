// priority: 95
// 超能燃料的混合、富集和反应处理。
// 由 gtceu.js 按既有阶段顺序执行，本文件只登记配方，不依赖文件名排序。
global.gtlPack.register("hyper_fuels", event => {
    const gtr = event.recipes.gtceu;
    const batch = global.gtlPack.batch;

    // 超能燃料
    gtr.chemical_reactor("gtceu:ammonium_nitrate_solution")
        .inputFluids("gtceu:ammonia 1000", "gtceu:nitric_acid 1000").outputFluids("gtceu:ammonium_nitrate_solution 1000").EUt(120).duration(60)

    gtr.mixer("gtceu:naquadah_solution")
        .itemInputs("2x gtceu:naquadah_dust").inputFluids("gtceu:ammonium_nitrate_solution 1000").outputFluids("gtceu:naquadah_solution 1000")
        .EUt(GTValues.VA[GTValues.LuV]).duration(400)

    batch(gtr, "cracker", ["inputFluids", "outputFluids", ["circuit", 1], "EUt", "duration"], [
        ["gtceu:fluorine_cracked_aquadah", ["gtceu:naquadah_solution 1000", "gtceu:fluorine 1000"], ["gtceu:fluorine_cracked_aquadah 1000"],
            [GTValues.VA[GTValues.UV]], [120]],
        ["gtceu:radon_cracked_enriched_aquadah", ["gtceu:enriched_naquadah_solution 1000", "gtceu:radon 1000"],
            ["gtceu:radon_cracked_enriched_aquadah 1000"], [GTValues.VA[GTValues.UHV]], [160]]
    ]);

    batch(gtr, "distillation_tower", ["inputFluids", "outputFluids", "EUt", ["duration", 600]], [
        ["gtceu:naquadah_fuel", ["gtceu:fluorine_cracked_aquadah 1000"],
            ["gtceu:naquadah_fuel 800", "gtceu:nitric_acid 200", "gtceu:enriched_naquadah_waste 100", "gtceu:ammonia 200", "gtceu:fluorine 200"],
            [GTValues.VA[GTValues.ZPM]]],
        ["gtceu:enriched_naquadah_fuel", ["gtceu:radon_cracked_enriched_aquadah 1000"],
            ["gtceu:enriched_naquadah_fuel 800", "gtceu:naquadria_waste 100", "gtceu:radon 200", "gtceu:fluorine 200"], [GTValues.VA[GTValues.LuV]]]
    ]);

    gtr.large_chemical_reactor("gtceu:hyper_fuel_1")
        .inputFluids("gtceu:naquadria_solution 1000", "gtceu:naquadah_fuel 1000", "gtceu:enriched_naquadah_fuel 1000", "gtceu:thorium 2304")
        .outputFluids("gtceu:hyper_fuel_1 3000").EUt(GTValues.VA[GTValues.UV]).duration(400)

    gtr.dimensionally_transcendent_plasma_forge("avaritia:infinity_catalyst")
        .itemInputs("64x kubejs:contained_exotic_matter", "64x kubejs:essentia_matter")
        .inputFluids("gtceu:infinity 1000", "gtceu:high_energy_quark_gluon_plasma 100000")
        .itemOutputs("avaritia:infinity_catalyst", "64x kubejs:time_dilation_containment_unit")
        .outputFluids("gtceu:dimensionallytranscendentresidue 100").EUt(GTValues.VA[GTValues.MAX]).duration(4800).blastFurnaceTemp(32000)

    gtr.dimensionally_transcendent_plasma_forge("gtceu:transcendentmetal")
        .notConsumable("kubejs:spacetime_catalyst").itemInputs("kubejs:hypercube").inputFluids("gtceu:spacetime 100", "gtceu:tennessine 144")
        .outputFluids("gtceu:transcendentmetal 144", "gtceu:dimensionallytranscendentresidue 100").EUt(GTValues.VA[GTValues.MAX]).duration(3200)
        .blastFurnaceTemp(36000)

    gtr.autoclave("kubejs:spacetime_catalyst")
        .itemInputs("avaritia:infinity_catalyst").inputFluids("gtceu:spacetime 1000").itemOutputs("kubejs:spacetime_catalyst")
        .EUt(4 * GTValues.VA[GTValues.MAX]).duration(1200)

    gtr.chemical_bath("kubejs:eternity_catalyst")
        .itemInputs("kubejs:spacetime_catalyst").inputFluids("gtceu:eternity 1000").itemOutputs("kubejs:eternity_catalyst")
        .EUt(4 * GTValues.VA[GTValues.MAX]).duration(1600)

    gtr.chemical_reactor("gtceu:aniline")
        .notConsumable("#forge:dusts/zinc").inputFluids("gtceu:nitrobenzene 1000", "gtceu:hydrogen 3000")
        .outputFluids("gtceu:aniline 1000", "minecraft:water 2000").EUt(1920).duration(160)

    gtr.chemical_reactor("gtceu:durene_dust")
        .inputFluids("gtceu:chloromethane 2000", "gtceu:dimethylbenzene 1000").outputFluids("gtceu:hydrochloric_acid 2000")
        .itemOutputs("24x gtceu:durene_dust").EUt(120).duration(150)

    gtr.chemical_reactor("gtceu:pyromellitic_dianhydride_dust")
        .itemInputs("24x gtceu:durene_dust").inputFluids("gtceu:oxygen 12000").outputFluids("minecraft:water 6000")
        .itemOutputs("18x gtceu:pyromellitic_dianhydride_dust").EUt(120).duration(150)

    gtr.chemical_reactor("gtceu:oxydianiline")
        .inputFluids("gtceu:aniline 2000", "gtceu:phenol 1000").notConsumable("#forge:dusts/tin")
        .outputFluids("gtceu:oxydianiline 1000", "gtceu:methane 2000").EUt(120).duration(150)

    gtr.large_chemical_reactor("gtceu:paa")
        .itemInputs("18x gtceu:pyromellitic_dianhydride_dust").inputFluids("gtceu:oxydianiline 1000").outputFluids("gtceu:paa 1000")
        .EUt(GTValues.VA[GTValues.ZPM]).duration(400).cleanroom(CleanroomType.CLEANROOM)
});
