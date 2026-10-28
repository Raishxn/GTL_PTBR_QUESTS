// priority: 95
// 本文件按功能保存配方阶段，实际执行顺序统一由配方入口管理。

// 通过蒸汽与水两条工艺蒸馏木材，获取灰烬、肥料和化工流体。
global.gtlPack.register("custom_wood_distillation", event => {
    const gtr = event.recipes.gtceu
    global.gtlPack.batch(gtr, "wood_distillation", [["itemInputs", "16x #minecraft:logs"], "inputFluids", "itemOutputs", "outputFluids", ["EUt", GTValues.VA[GTValues.MV]], ["duration", 200]], [
        ["greythings_wood_distillation_plus:wood_distillation_plus_1", ["gtceu:steam 1000"], ["4x gtceu:dark_ash_dust"], ["gtceu:naphthalene 410", "gtceu:hydrogen_sulfide 307", "gtceu:creosote 205", "gtceu:phenol 102", "gtceu:carbon_dioxide 500", "gtceu:ammonia 600", "gtceu:ethylbenzene 500"]],
        ["greythings_wood_distillation_plus:wood_distillation_plus_2", ["minecraft:water 6000"], ["6x gtceu:fertilizer"], ["gtceu:methane 3300", "gtceu:methanol 825", "gtceu:acetic_acid 137", "gtceu:ammonia 550", "gtceu:carbon_dioxide 2200", "gtceu:creosote 560", "gtceu:ethanol 825"]]
    ]);
})
