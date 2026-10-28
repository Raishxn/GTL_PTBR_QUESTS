// 个人传送：变异末影珍珠保存和读取坐标，按键切换零至十号槽位，登录保留原初始化条件。
;(() => {
    ItemEvents.firstRightClicked("kubejs:warped_ender_pearl", event => {
        const player = event.player, data = player.persistentData
        const name = player.getName().getString(), slot = data.getInt("pearl").toString()
        if (player.isSteppingCarefully()) {
            data.putDouble("posx" + slot, player.x)
            data.putDouble("posy" + slot, player.y)
            data.putDouble("posz" + slot, player.z)
            data.putString("dim_b" + slot, event.getLevel().getDimension())
            event.getServer().runCommandSilent(`playsound minecraft:entity.enderman.ambient ambient ${name} ${player.x} ${player.y} ${player.z}`)
            player.setStatusMessage("Coordenadas salvas neste slot")
        } else if (data.getDouble("posx" + slot) != null) {
            event.getServer().runCommandSilent(`execute in ${data.getString("dim_b" + slot)} run tp ${name} ${data.getDouble("posx" + slot)} ${data.getDouble("posy" + slot)} ${data.getDouble("posz" + slot)}`)
            event.getServer().runCommandSilent(`playsound minecraft:entity.enderman.teleport ambient ${name} ${player.x} ${player.y} ${player.z}`)
        }
    })
    NetworkEvents.dataReceived("global.pearlKey.consumeClick", event => {
        const player = event.player
        if (player.getHeldItem("main_hand") != "kubejs:warped_ender_pearl") return
        let slot = player.persistentData.getInt("pearl")
        slot = player.isSteppingCarefully() ? (slot == 0 ? 10 : slot - 1) : (slot == 10 ? 0 : slot + 1)
        player.persistentData.putInt("pearl", slot)
        player.setStatusMessage("Slot de coordenadas: " + slot)
    })
    PlayerEvents.loggedIn(event => {
        if (event.player.persistentData.getInt("pearl") == null) event.player.persistentData.putInt("pearl", 0)
    })
})()
