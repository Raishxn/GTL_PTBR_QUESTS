// priority: 93
// 设置原煤、钻石及钻石方块的燃烧时长，不修改其它物品属性。
ItemEvents.modification(event => {
    // 物品编号与燃烧时长，单位为游戏刻。
    ;[
        ["gtceu:raw_coal", 1600],
        ["minecraft:diamond", 1280000],
        ["minecraft:diamond_block", 12800000],
        ["kubejs:diamond_compressed_block", 120000000]
    ].forEach(([id, duration]) => event.modify(id, item => item.setBurnTime(duration)))
})
