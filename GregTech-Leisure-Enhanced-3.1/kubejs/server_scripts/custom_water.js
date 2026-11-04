// priority: 95
// 本文件按功能保存配方阶段，实际执行顺序统一由配方入口管理。

// 合成八级纯净水，保留流体调节器催化条件。
global.gtlPack.register("custom_purified_water", event => {
    const gtr = event.recipes.gtceu
    gtr.distort("kubejs:grade_8_purified_water")
        .itemInputs("12x gtceu:neutronium_dust", "gtceu:exquisite_cubic_zirconia_gem", "12x gtceu:activated_carbon_dust")
        .notConsumable("gtceu:luv_fluid_regulator")
        .inputFluids("minecraft:water 1000")
        .outputFluids("gtceu:grade_8_purified_water 1000")
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(2000)
        .blastFurnaceTemp(12600)
})

// 合成十六级纯净水，保留三个等级的流体调节器。
global.gtlPack.register("custom_advanced_purified_water", event => {
    const gtr = event.recipes.gtceu
    gtr.distort("kubejs:grade_16_purified_water")
        .itemInputs("minecraft:blaze_powder", "minecraft:echo_shard", "gtceu:carbon_nanotubes_dust", "gtceu:degenerate_rhenium_dust")
        .notConsumable("gtceu:uhv_fluid_regulator").notConsumable("gtceu:uev_fluid_regulator").notConsumable("gtceu:uiv_fluid_regulator")
        .inputFluids("gtceu:grade_8_purified_water 1000")
        .outputFluids("gtceu:grade_16_purified_water 1000")
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(800)
        .blastFurnaceTemp(1800)
})

// 以既定倍率批量蒸馏水。
global.gtlPack.register("custom_distilled_water", event => {
    const gtr = event.recipes.gtceu
    gtr.distillation_tower("kubejs:distill_water_large")
        .inputFluids("minecraft:water 100000")
        .outputFluids("gtceu:distilled_water 10000000")
        .EUt(GTValues.VA[GTValues.MV])
        .duration(100)
})
