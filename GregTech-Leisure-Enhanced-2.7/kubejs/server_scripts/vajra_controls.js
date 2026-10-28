// 金刚杵控制：按键调节挖掘速度，潜行左键切换掉落物磁力吸引。
;(() => {
    NetworkEvents.dataReceived("global.vajraKey.consumeClick", event => {
        const player = event.player, item = player.getHeldItem("main_hand")
        if (item != "gtceu:echoite_vajra") return
        const step = player.isSteppingCarefully() ? 10 : 1
        const tool = item.getNbt().getCompound("GT.Tool"), speed = tool.getFloat("ToolSpeed")
        const next = speed < 100 ? speed + step : speed < 1000 ? speed + step * 10 : 10
        tool.putFloat("ToolSpeed", next)
        player.setStatusMessage("Velocidade: " + next)
    })
    ItemEvents.firstLeftClicked("gtceu:echoite_vajra", event => {
        if (event.player.isSteppingCarefully() && !event.player.isMiningBlock()) {
            let behaviours = event.item.getNbt().getCompound("GT.Behaviours")
            if (behaviours.getByte("RelocateMinedBlocks") == 1) {
                behaviours.remove("RelocateMinedBlocks")
                event.player.setStatusMessage("Atração Magnética: Desativada")
            } else {
                behaviours.putByte("RelocateMinedBlocks", 1)
                event.player.setStatusMessage("Atração Magnética: Ativada")
            }
        }
    })
})()
