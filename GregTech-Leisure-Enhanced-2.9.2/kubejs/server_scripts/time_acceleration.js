// 机器加速：无线扭曲器扣除电网能量，普通扭曲器消耗耐久和使用次数。
;(() => {
    const helpers = global.gtlPlayer
    function consumeTwister(player, hand) {
        player.damageHeldItem()
        const uses = player.persistentData.getInt("tt")
        player.persistentData.putInt("tt", uses - 1)
        if (uses > 0) player.setStatusMessage("Usos restantes: " + (uses - 1))
        else player.addItemCooldown(player.getHeldItem(hand), 20)
    }
    // 无线版只切换服务端唯一目标；松开右键或转开视线后继续原倍率加速。
    const wirelessAcceleration = Java.loadClass("com.gtl.enhancedcore.common.item.WirelessTimeAcceleration")
    ItemEvents.rightClicked("kubejs:time_twister_wireless", event => {
        const player = event.player
        if (player.isFake() || !player.isSteppingCarefully()) return
        wirelessAcceleration.toggle(player, helpers.recipeLogic(event.level, player))
    })
    ItemEvents.rightClicked("kubejs:time_twister", event => {
        const player = event.player
        if (player.isFake() || !player.isSteppingCarefully()) return
        const logic = helpers.recipeLogic(event.level, player)
        if (logic == null || !logic.isWorking()) return
        if (player.isCreative()) {
            logic.setProgress(logic.getDuration() - logic.getProgress() - 20)
        } else if (logic.getMachine().self().getRecipeType() == GTRecipeTypes.PRIMITIVE_BLAST_FURNACE_RECIPES) {
            logic.setProgress(logic.getProgress() + 100)
            consumeTwister(player, event.hand)
        } else if (logic.getMachine().self().getTier() < 4 && helpers.recipes.getInputEUt(logic.getLastRecipe()) > 0) {
            // 三档时长分别保留四十、二十、十的加速系数；短配方不消耗道具。
            let duration = logic.getDuration()
            let factor = duration > 400 ? 40 : duration > 200 ? 20 : duration > 40 ? 10 : 0
            if (factor) {
                logic.setProgress(logic.getProgress() + (4 - logic.getMachine().self().getTier()) * factor)
                consumeTwister(player, event.hand)
            }
        }
    })
})()
