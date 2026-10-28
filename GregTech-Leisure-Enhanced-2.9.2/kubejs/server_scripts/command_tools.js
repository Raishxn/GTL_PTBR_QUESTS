// 方块工具：命令魔杖放置和回收命令方块、聚合核心拆除联动、基岩破坏者和创造箱禁用。
;(() => {
    const helpers = global.gtlPlayer
    BlockEvents.broken("kubejs:create_aggregatione_core", event => {
        const block = event.getLevel().getBlock(event.block.x, event.block.y + 1, event.block.z)
        if (helpers.commandBlocks.some(id => block == id)) {
            event.getServer().runCommandSilent(`execute at ${event.player.getName().getString()} run fill ${event.block.x} ${event.block.y + 1} ${event.block.z} ${event.block.x} ${event.block.y + 1} ${event.block.z} minecraft:air`)
        }
    })
    // 普通右键放置副手的命令方块；潜行右键回收视线内的命令方块。
    ItemEvents.rightClicked("kubejs:command_wand", event => {
        const name = event.player.getName().getString()
        const pos = helpers.eyePosition(event.level, event.player)
        const block = event.level.getBlock(pos.x, pos.y, pos.z)
        if (block == "kubejs:create_aggregatione_core" && event.level.getBlock(pos.x, pos.y + 1, pos.z) == "minecraft:air") {
            helpers.commandBlocks.forEach(id => {
                if (event.player.getHeldItem("off_hand") == id) {
                    event.player.offHandItem.count--
                    event.getServer().runCommandSilent(`execute at ${name} run fill ${pos.x} ${pos.y + 1} ${pos.z} ${pos.x} ${pos.y + 1} ${pos.z} ${id}`)
                }
            })
        }
        if (event.player.isSteppingCarefully()) {
            helpers.commandBlocks.forEach(id => {
                if (block == id) {
                    block.set("minecraft:air")
                    event.getServer().runCommandSilent(`execute at ${name} run summon minecraft:item ${pos.x} ${block.y} ${pos.z} {PickupDelay:10,Motion:[0.0,0.2,0.0],Item:{id:"${id}",Count:1b}}`)
                }
            })
        }
    })
    BlockEvents.leftClicked("minecraft:bedrock", event => {
        if (event.player.getHeldItem("main_hand") == "kubejs:bedrock_destroyer") event.block.set("minecraft:air")
    })
    BlockEvents.rightClicked("gtceu:creative_chest", event => event.cancel())
})()
