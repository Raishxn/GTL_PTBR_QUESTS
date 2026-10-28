// priority: 90
// 玩家机制共用工具：加载接口、套装定义和五格视线查询；每次重载重新建立。
;(() => {
    const capability = Java.loadClass("com.gregtechceu.gtceu.api.capability.GTCapabilityHelper")
    const wireless = Java.loadClass("com.hepdd.gtmthings.api.misc.WirelessEnergyManager")
    const bigInteger = Java.loadClass("java.math.BigInteger")
    const recipes = Java.loadClass("com.gregtechceu.gtceu.api.recipe.RecipeHelper")
    const formatting = Java.loadClass("com.gregtechceu.gtceu.utils.FormattingUtil")
    const clipContext = Java.loadClass("net.minecraft.world.level.ClipContext")
    const slots = ["boots", "leggings", "chestplate", "helmet"]
    const armorSets = {
        magneto: slots.map(slot => "magnetohydrodynamicallyconstrainedstarmatter_" + slot),
        fermium: slots.map(slot => "fermium_" + slot),
        spaceFermium: slots.map(slot => "space_fermium_" + slot),
        quarktech: slots.map(slot => "quarktech_" + slot),
        quarktechAdv: slots.map(slot => (slot == "chestplate" ? "advanced_" : "") + "quarktech_" + slot),
        infinity: ["infinity_boots", "infinity_pants", "infinity_chestplate", "infinity_helmet"]
    }
    // 飞行和夜视保留原先的整串比较；伤害防护单独按四件物品检查。
    const armorStrings = {}
    Object.keys(armorSets).forEach(key => {
        armorStrings[key] = "[" + armorSets[key].map(id => "1 " + id).join(", ") + "]"
    })
    function isWearing(player, ids) {
        const iterator = player.getArmorSlots().iterator()
        for (let i = 0; i < 4; i++) {
            if (!iterator.hasNext()) return false
            let stack = iterator.next()
            if (stack.isEmpty()) return false
            let id = stack.getId()
            let shortId = id.indexOf(":") == -1 ? id : id.substring(id.indexOf(":") + 1)
            if (shortId !== ids[i]) return false
        }
        return true
    }
    function eyePosition(level, player) {
        return level.clip(new clipContext(player.getEyePosition(1), player.getEyePosition(1).add(player.getViewVector(1).scale(5)), clipContext.Block.OUTLINE, clipContext.Fluid.NONE, player)).getBlockPos()
    }
    global.gtlPlayer = {
        armorSets: armorSets, armorStrings: armorStrings, isWearing: isWearing,
        wireless: wireless, bigInteger: bigInteger, recipes: recipes, formatting: formatting,
        commandBlocks: ["minecraft:command_block", "minecraft:chain_command_block", "minecraft:repeating_command_block"],
        eyePosition: eyePosition,
        recipeLogic: (level, player) => capability.getRecipeLogic(level, eyePosition(level, player), null)
    }
})()
