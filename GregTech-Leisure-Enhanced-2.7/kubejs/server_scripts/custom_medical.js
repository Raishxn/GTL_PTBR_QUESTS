// priority: 95
// 本文件按功能保存配方阶段，实际执行顺序统一由配方入口管理。

// 以机械臂作催化剂合成抗辐射药粉与扑热息痛粉。
global.gtlPack.register("custom_medical_dusts", event => {
    const gtr = event.recipes.gtceu
    global.gtlPack.batch(gtr, "large_chemical_reactor", ["itemInputs", ["notConsumable", "8x gtceu:luv_robot_arm"], "inputFluids", "itemOutputs", ["EUt", GTValues.VA[GTValues.IV]], ["duration", 200]], [
        ["kubejs:easier_rad_away_dust", ["5x gtceu:iodine_dust", "25x gtceu:saltpeter_dust"], ["gtceu:iron 3024", "gtceu:carbon 17856", "gtceu:oxygen 35000", "gtceu:nitrogen 64000", "gtceu:hydrogen 115000"], ["gtceu:rad_away_dust"]],
        ["kubejs:easier_paracetamol_dust", ["384x gtceu:carbon_dust"], ["gtceu:nitrogen_dioxide 48000", "gtceu:hydrogen 432000"], ["gtceu:paracetamol_dust"]]
    ]);
})
