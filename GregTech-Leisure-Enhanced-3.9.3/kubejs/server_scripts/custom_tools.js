// priority: 95
// 本文件按功能保存配方阶段，实际执行顺序统一由配方入口管理。

// 根据材料批量合成钻头，并保留钢钻头的独立电路。
global.gtlPack.register("custom_drill_heads", event => {
    const gtr = event.recipes.gtceu
    const drillMaterials = ["titanium", "neutronium", "ultimet", "hsse", "vibranium", "naquadah_alloy", "duranium"]
    drillMaterials.forEach((m, i) => {
        gtr.assembler(`greythings:${m}_drill_head_custom`)
            .circuit(15)
            .itemInputs(`4x gtceu:${m}_plate`, "4x gtceu:steel_plate")
            .itemOutputs(`gtceu:${m}_drill_head`)
            .EUt(2 * GTValues.VA[GTValues.LV]).duration(200)
    })
    gtr.assembler("greythings:steel_drill_head_custom")
        .circuit(16)
        .itemInputs("8x gtceu:steel_plate")
        .itemOutputs("gtceu:steel_drill_head")
        .EUt(2 * GTValues.VA[GTValues.LV]).duration(200)
})

// 组装三叉戟并用闪电处理赋予引雷附魔。
global.gtlPack.register("custom_tridents", event => {
    const gtr = event.recipes.gtceu
    gtr.assembler("greythings:trident")
        .circuit(24)
        .itemInputs("16x minecraft:prismarine_shard", "4x gtceu:ruthenium_rod", "2x gtceu:double_osmium_plate", "gtceu:exquisite_diamond_gem")
        .inputFluids("gtceu:glue 1440")
        .itemOutputs("minecraft:trident")
        .EUt(GTValues.VA[GTValues.EV]).duration(300)
    gtr.lightning_processor("greythings:channeling_trident")
        .itemInputs("minecraft:trident", "4x minecraft:end_crystal")
        .itemOutputs(Item.of('minecraft:trident', '{Damage:230}').enchant('minecraft:channeling', 1))
        .EUt(GTValues.VA[GTValues.EV]).duration(800)
})

// 制作传送珍珠、命令魔杖、无线扭曲器和极限工作台。
global.gtlPack.register("custom_utility_tools", event => {
    event.shaped("kubejs:warped_ender_pearl", ["ABA", "BDB", "ABA"], {
        A: "minecraft:bone_meal",
        B: "minecraft:blaze_powder",
        D: "minecraft:ender_pearl"
    })
    event.shaped("kubejs:command_wand", ["  A", " B ", "B  "], {
        A: "kubejs:command_block_core",
        B: "gtceu:eternity_rod"
    })
    event.shaped("kubejs:time_twister_wireless", ["CDC", "BAB", "CDC"], {
        A: "kubejs:time_twister",
        D: "gtmthings:wireless_energy_monitor",
        C: "gtmthings:lv_wireless_energy_receive_cover",
        B: "minecraft:clock"
    })
    event.shaped("avaritia:extreme_crafting_table", ["ABA", "BCB", "ABA"], {
        A: "gtceu:exquisite_lapis_gem",
        B: "avaritia:crystal_matrix",
        C: "avaritia:double_compressed_crafting_table"
    })
})
