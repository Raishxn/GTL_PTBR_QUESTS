// 维度传送：黑曜石门往返虚空、哭泣黑曜石门往返超平坦、反应堆核心往返古代世界和下界。
;(() => {
    // 门方块、目的地、存档字段后缀、落点高度；超平坦保持一比一，虚空按来源缩放。
    const portals = [
        ["minecraft:crying_obsidian", "kubejs:flat", "f", 0],
        ["minecraft:obsidian", "kubejs:void", "v", 64]
    ]
    portals.forEach(portal => {
        BlockEvents.rightClicked(portal[0], event => {
            const player = event.player
            if (player.getHeldItem("main_hand") != null || player.getHeldItem("off_hand") != null) return
            const name = player.getName().getString()
            const dim = event.getLevel().getDimension()
            const data = player.persistentData
            const server = event.getServer()
            if (dim != portal[1]) {
                let scale = portal[2] == "v" && dim != "kubejs:flat" ? 10 : 1
                data.putDouble("y_" + portal[2], player.y + 1)
                data.putString("dim_" + portal[2], dim)
                let x = event.block.x * scale, z = event.block.z * scale, y = portal[3]
                server.runCommandSilent(`execute in ${portal[1]} as ${name} run tp ${x} ${y} ${z}`)
                server.runCommandSilent(`execute in ${portal[1]} run fill ${x} ${y - 1} ${z} ${x} ${y - 1} ${z} ${portal[0]}`)
            } else {
                let source = data.getString("dim_" + portal[2])
                let scale = portal[2] == "v" && source != "kubejs:flat" ? 10 : 1
                server.runCommandSilent(`execute in ${source} as ${name} run tp ${event.block.x / scale} ${data.getDouble("y_" + portal[2])} ${event.block.z / scale}`)
            }
        })
    })

    const cross = [[1, 0], [-1, 0], [0, 1], [0, -1]]
    const corners = [[1, 1], [1, -1], [-1, 1], [-1, -1]]
    BlockEvents.rightClicked("kubejs:reactor_core", event => {
        const player = event.player
        if ((player.getHeldItem("main_hand") != null && player.getHeldItem("off_hand") != null) && player.getHeldItem("main_hand") != "kubejs:nether_data") return
        const pos = event.block.getPos(), dim = event.getLevel().getDimension(), data = player.persistentData
        function matches(edge, corner) {
            const matchesAt = (offset, id) => event.level.getBlockState(pos.offset(offset[0], 0, offset[1])).getBlock().getId() == id
            return cross.every(offset => matchesAt(offset, edge)) && corners.every(offset => matchesAt(offset, corner))
        }
        function travelTo(destination, key) {
            data.putDouble("pos_" + key + "_x", player.x)
            data.putDouble("pos_" + key + "_y", player.y)
            data.putDouble("pos_" + key + "_z", player.z)
            data.putString("dim_" + key, dim)
            event.server.runCommandSilent(`execute in ${destination} as ${player.getName().getString()} run tp 0 128 0`)
            event.server.runCommandSilent(`execute in ${destination} run fill 0 127 0 0 127 0 kubejs:reactor_core`)
        }
        if (dim == "kubejs:ancient_world" || dim == "minecraft:the_nether") {
            let key = dim == "kubejs:ancient_world" ? "aw" : "ne"
            event.server.runCommandSilent(`execute in ${data.getString("dim_" + key)} as ${player.getName().getString()} run tp ${data.getDouble("pos_" + key + "_x")} ${data.getDouble("pos_" + key + "_y")} ${data.getDouble("pos_" + key + "_z")}`)
        } else if (matches("gtceu:steel_block", "minecraft:diamond_block")) {
            travelTo("kubejs:ancient_world", "aw")
        } else if (matches("minecraft:gold_block", "minecraft:emerald_block")) {
            // 下界门仍要求主手持有下界数据；检查顺序和返回点字段不变。
            if (player.getHeldItem("main_hand") == "kubejs:nether_data") travelTo("minecraft:the_nether", "ne")
            else player.setStatusMessage("Requer segurar os dados na mão")
        } else {
            player.setStatusMessage("Estrutura incorreta")
        }
    })
})()
