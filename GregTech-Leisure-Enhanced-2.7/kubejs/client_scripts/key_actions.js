// 检测已注册按键并向服务端发送原有数据包，空玩家或未就绪按键直接跳过。
ClientEvents.tick(event => {
    if (!event.player) return
    ["flyingspeed", "nightvision", "pearl", "vajra"].forEach(name => {
        const key = global[name + "Key"]
        if (key && key.consumeClick()) event.player.sendData("global." + name + "Key.consumeClick")
    })
})
