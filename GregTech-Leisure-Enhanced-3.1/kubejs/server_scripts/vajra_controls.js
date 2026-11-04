// 金刚杵控制：按键调节挖掘速度，潜行左键切换掉落物磁力吸引。
;(() => {
    const toolHelper = Java.loadClass("com.gregtechceu.gtceu.api.item.tool.ToolHelper")
    NetworkEvents.dataReceived("global.vajraKey.consumeClick", event => {
        const player = event.player, item = player.getHeldItem("main_hand")
        if (item != "gtceu:echoite_vajra") return
        const step = player.isSteppingCarefully() ? 10 : 1
        const tool = toolHelper.getToolTag(item), speed = tool.getFloat("ToolSpeed")
        const next = speed < 100 ? speed + step : speed < 1000 ? speed + step * 10 : 10
        tool.putFloat("ToolSpeed", next)
        player.setStatusMessage("速度：" + next)
    })
    ItemEvents.firstLeftClicked("gtceu:echoite_vajra", event => {
        if (event.player.isSteppingCarefully() && !event.player.isMiningBlock()) {
            let behaviours = toolHelper.getBehaviorsTag(event.item)
            if (behaviours.getByte("RelocateMinedBlocks") == 1) {
                behaviours.remove("RelocateMinedBlocks")
                event.player.setStatusMessage("磁力吸引：关闭")
            } else {
                behaviours.putByte("RelocateMinedBlocks", 1)
                event.player.setStatusMessage("磁力吸引：打开")
            }
        }
    })
})()
