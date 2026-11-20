// 生物规则：禁止蝙蝠生成，为冰原羊驼和村民添加原有权重战利品。
;(() => {
    EntityEvents.spawned("minecraft:bat", event => event.cancel())
    // 每行依次为掉落物、权重、是否要求玩家击杀；保持原战利品池的条目顺序。
    const loot = {
        "ad_astra:glacian_ram": [["kubejs:glacio_spirit", 1], ["ad_astra:ice_shard", 9]],
        "minecraft:villager": [["minecraft:end_crystal", 1, true], ["gtceu:ulv_primitive_magic_energy", 2, true], ["usclb:inkandquill", 3]]
    }
    ServerEvents.entityLootTables(event => {
        Object.keys(loot).forEach(entity => event.addEntity(entity, table => {
            table.addPool(pool => loot[entity].forEach(entry => {
                const item = pool.addItem(entry[0]).weight(entry[1])
                if (entry[2]) item.killedByPlayer()
            }))
        }))
    })
})()
