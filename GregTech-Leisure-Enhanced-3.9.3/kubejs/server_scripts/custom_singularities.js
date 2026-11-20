// priority: 95
// 本文件按功能保存配方阶段，实际执行顺序统一由配方入口管理。

// 合成量子纠缠奇点及各组双材料聚合奇点。
global.gtlPack.register("custom_singularities", event => {
    const gtr = event.recipes.gtceu
    global.gtlPack.batch(gtr, "electric_implosion_compressor", ["itemInputs", ["itemOutputs", "2x ae2:quantum_entangled_singularity"], ["EUt", GTValues.VA[GTValues.UV]], ["duration", 1]], [
        ["greythings:quantum_entangled_singularity_1", ["ae2:singularity", "gtceu:ender_pearl_dust"]],
        ["greythings:quantum_entangled_singularity_2", ["ae2:singularity", "minecraft:ender_pearl"]]
    ]);
    const singularityMaterials1 = ["lafium", "enderite", "ruthenium_trinium_americium_neutronate", "hastelloyk_243", "titansteel", "hastelloy_x", "highurabilityompoundteel", "hsse", "pikyonium", "abyssalalloy", "black_titanium", "ultimet", "enriched_naquadah_trinium_europium_duranide", "blue_steel", "cinobite", "maraging_steel_300"]
    const singularityMaterials2 = ["potin", "indium_gallium_phosphide", "yttrium_barium_cuprate", "cobalt_brass", "uranium_rhodium_dinaquadide", "red_steel", "germaniumtungstennitride", "watertight_steel", "aluminium_bronze", "soldering_alloy", "nickel_zinc_ferrite", "hsla_steel", "rtm_alloy", "hastelloy_c_276", "stellite_100", "grisium"]
    for (let i = 0; i < singularityMaterials1.length; i++) {
        gtr.electric_implosion_compressor(`greythings:combined_singularity_${singularityMaterials1[i]}`)
            .itemInputs(`64x gtceu:${singularityMaterials1[i]}_block`, `64x gtceu:${singularityMaterials2[i]}_block`)
            .itemOutputs(`kubejs:combined_singularity_${i}`)
            .EUt(64 * GTValues.VA[GTValues.MAX]).duration(800)
    }
})
