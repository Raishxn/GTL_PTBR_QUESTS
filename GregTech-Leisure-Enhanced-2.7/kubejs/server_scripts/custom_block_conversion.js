// priority: 95
// 本文件按功能保存配方阶段，实际执行顺序统一由配方入口管理。

// 加工发光黑曜石与末影黑曜石。
global.gtlPack.register("custom_obsidian_materials", event => {
    const gtr = event.recipes.gtceu
    gtr.electric_blast_furnace("kubejs:shining_obsidian")
        .itemInputs("minecraft:obsidian", "gtceu:vibrant_alloy_dust")
        .inputFluids("gtceu:glowstone 576")
        .itemOutputs("kubejs:shining_obsidian")
        .EUt(480).duration(600)
        .blastFurnaceTemp(2600)
    gtr.chemical_bath("kubejs:ender_obsidian")
        .itemInputs("kubejs:shining_obsidian")
        .inputFluids("gtceu:ender_eye 1152")
        .itemOutputs("kubejs:ender_obsidian")
        .EUt(480).duration(200)
})

// 转换卡催化的草、苔藓、菌柄、骨块与充能龙块加工。
global.gtlPack.register("custom_block_conversions", event => {
    const gtr = event.recipes.gtceu
    global.gtlPack.batch(gtr, "chemical_reactor", [["notConsumable", "gtlcore:conversion_simulate_card"], "itemInputs", "itemOutputs", ["EUt", 30], ["duration", 100]], [
        ["kubejs:grass_to_moss", ["minecraft:grass_block"], ["minecraft:moss_block"]],
        ["kubejs:moss_to_sculk", ["minecraft:moss_block"], ["minecraft:sculk"]],
        ["kubejs:oak_to_crimson", ["minecraft:oak_log"], ["minecraft:crimson_stem"]],
        ["kubejs:birch_to_warped", ["minecraft:birch_log"], ["minecraft:warped_stem"]],
        ["kubejs:calcium_to_bone", ["gtceu:calcium_block"], ["minecraft:bone_block"]],
        ["kubejs:bone_to_essence", ["minecraft:bone_block"], ["kubejs:essence_block"]],
        ["kubejs:infused_obsidian_to_draconium", ["kubejs:infused_obsidian"], ["kubejs:draconium_block_charged"]]
    ]);
})

// 用少量生物质将泥土转为草方块。
global.gtlPack.register("custom_dirt_fermentation", event => {
    const gtr = event.recipes.gtceu
    gtr.chemical_bath("kubejs:dirt_to_grass")
        .itemInputs("minecraft:dirt")
        .inputFluids("gtceu:biomass 10")
        .itemOutputs("minecraft:grass_block")
        .EUt(30).duration(400)
})

// 用下界疣块与生物质合成荧光菌光体。
global.gtlPack.register("custom_shroomlight", event => {
    const gtr = event.recipes.gtceu
    gtr.chemical_reactor("kubejs:shroomlight")
        .itemInputs("minecraft:nether_wart_block")
        .inputFluids("gtceu:biomass 1000")
        .itemOutputs("minecraft:shroomlight")
        .EUt(GTValues.VA[GTValues.MV])
        .duration(100)
})
