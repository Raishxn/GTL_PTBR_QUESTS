// priority: 95
// 核废料、回响材料、碘、锗和铼的提取加工。
// 由 gtceu.js 按既有阶段顺序执行，本文件只登记配方，不依赖文件名排序。
global.gtlPack.register("trace_metals", event => {
    const gtr = event.recipes.gtceu;

    // 核废料
    gtr.centrifuge("nuclear_waste")
        .itemInputs("kubejs:nuclear_waste")
        .itemOutputs("gtceu:tiny_plutonium_dust", "gtceu:tiny_polonium_dust", "gtceu:tiny_uranium_dust", "gtceu:tiny_thorium_dust",
            "gtceu:tiny_protactinium_dust", "gtceu:tiny_neptunium_dust")
        .EUt(2048).duration(200)

    // 回响材料
    const echos = ["minecraft:echo_shard", "minecraft:sculk_catalyst", "minecraft:sculk_shrieker", "minecraft:sculk_sensor"]
    echos.forEach((echo) => {
        gtr.macerator("echodust" + echo)
            .itemInputs(echo).itemOutputs("gtceu:echo_shard_dust").EUt(7).duration(100)
    })
    // 碘
    gtr.mixer("gtceu:kelp_slurry")
        .itemInputs("8x minecraft:dried_kelp").inputFluids("minecraft:water 1000").outputFluids("gtceu:kelp_slurry 1000").EUt(30).duration(600)

    gtr.distillery("gtceu:enriched_potassium_iodide_slurry")
        .inputFluids("gtceu:kelp_slurry 1000").outputFluids("gtceu:enriched_potassium_iodide_slurry 100").EUt(30).duration(200)

    gtr.chemical_reactor("gtceu:iodine_containing_slurry")
        .inputFluids("gtceu:chlorine 1000", "gtceu:enriched_potassium_iodide_slurry 1000").outputFluids("gtceu:iodine_containing_slurry 1000")
        .EUt(120).duration(100)

    gtr.centrifuge("gtceu:iodine_dust")
        .inputFluids("gtceu:iodine_containing_slurry 1000").itemOutputs("gtceu:iodine_dust", "2x gtceu:rock_salt_dust").EUt(120).duration(200)

    // 锗
    gtr.extractor("gtceu:tannic")
        .itemInputs("minecraft:nether_wart_block").outputFluids("gtceu:tannic 50").EUt(30).duration(200)

    gtr.chemical_bath("gtceu:ash_leaching_solution")
        .itemInputs("12x #forge:dusts/ash").inputFluids("gtceu:sulfuric_acid 1000").outputFluids("gtceu:ash_leaching_solution 1000").EUt(120)
        .duration(400)

    gtr.mixer("gtceu:germanium_containing_precipitate_dust")
        .inputFluids("gtceu:ash_leaching_solution 1000", "gtceu:tannic 1000").itemOutputs("gtceu:germanium_containing_precipitate_dust").EUt(120)
        .duration(200)

    gtr.arc_furnace("gtceu:germanium_ash_dust")
        .itemInputs("2x gtceu:germanium_containing_precipitate_dust").itemOutputs("gtceu:germanium_ash_dust").EUt(30).duration(120)

    gtr.chemical_reactor("gtceu:germanium_tetrachloride_solution")
        .itemInputs("2x gtceu:germanium_ash_dust").inputFluids("gtceu:hydrochloric_acid 4000")
        .outputFluids("gtceu:germanium_tetrachloride_solution 1000").EUt(120).duration(200)

    gtr.dehydrator("gtceu:germanium_dioxide_dust")
        .inputFluids("gtceu:germanium_tetrachloride_solution 1000", "gtceu:hydrogen 4000").itemOutputs("3x gtceu:germanium_dioxide_dust")
        .outputFluids("gtceu:hydrochloric_acid 4000").EUt(30).duration(800)

    gtr.electric_blast_furnace("gtceu:germanium_dust")
        .itemInputs("3x gtceu:germanium_dioxide_dust").inputFluids("gtceu:hydrogen 4000").itemOutputs("gtceu:germanium_dust").EUt(120)
        .duration(200).blastFurnaceTemp(680)

    // 铼
    gtr.chemical_reactor("gtceu:rhenium_dust")
        .inputFluids("gtceu:ammonium_perrhenate 1000", "gtceu:hydrogen 7000").itemOutputs("gtceu:rhenium_dust")
        .outputFluids("gtceu:ammonia 1000", "minecraft:water 4000").EUt(1920).duration(80)

    gtr.chemical_reactor("gtceu:ammonium_perrhenate")
        .inputFluids("gtceu:rhenium_sulfuric_solution 1000", "gtceu:ammonia 1000")
        .outputFluids("gtceu:ammonium_perrhenate 1000", "gtceu:hydrogen_sulfide 1000").EUt(480).duration(150)

    gtr.dissolution_treatment("gtceu:rhenium_sulfuric_solution")
        .inputFluids("gtceu:molybdenum_flue 3000").inputFluids("minecraft:water 250").outputFluids("gtceu:rhenium_sulfuric_solution 3000")
        .EUt(491520).duration(30)

    gtr.electric_blast_furnace("gtceu:molybdenum_flue")
        .itemInputs("4x gtceu:molybdenum_concentrate_dust").inputFluids("gtceu:oxygen 7250").itemOutputs("4x gtceu:molybdenum_trioxide_dust")
        .outputFluids("gtceu:molybdenum_flue 3000").EUt(120).duration(340).blastFurnaceTemp(2400)

    gtr.chemical_reactor("gtceu:molybdenum_concentrate_dust")
        .itemInputs("3x gtceu:gold_depleted_molybdenite_dust").inputFluids("gtceu:iron_iii_chloride 250")
        .itemOutputs("4x gtceu:molybdenum_concentrate_dust").EUt(1920).duration(10)

    gtr.chemical_reactor("gtceu:gold_depleted_molybdenite_dust")
        .itemInputs("3x gtceu:molybdenite_dust").inputFluids("gtceu:sodium_cyanide 1000").itemOutputs("3x gtceu:gold_depleted_molybdenite_dust")
        .outputFluids("gtceu:gold_cyanide 1000").EUt(7680).duration(100)

    gtr.chemical_reactor("gtceu:sodium_cyanide")
        .itemInputs("2x gtceu:sodium_dust").inputFluids("gtceu:hydrogen_cyanide 2000", "gtceu:oxygen 1000")
        .outputFluids("gtceu:sodium_cyanide 2000", "minecraft:water 1000").EUt(1920).duration(12)

    gtr.chemical_reactor("gtceu:gold_cyanide")
        .itemInputs("gtceu:sodium_dust").inputFluids("gtceu:gold_cyanide 1000").itemOutputs("gtceu:gold_dust")
        .outputFluids("gtceu:sodium_cyanide 1000").EUt(1920).duration(140)
});
