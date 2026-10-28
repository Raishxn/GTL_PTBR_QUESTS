// priority: 1
// 玩家状态：高级套装飞行、夜视、创世维度检查、伤害防护和扭曲器次数恢复。
// 秒级状态先处理，随后由回血奖励模块统计同一刻的生命变化。
;(() => {
    const helpers = global.gtlPlayer, armor = helpers.armorStrings
    const flyingSpeeds = [["magneto", 0.4], ["fermium", 0.2], ["spaceFermium", 0.2], ["infinity", 0.3]]
    PlayerEvents.tick(event => {
        const player = event.player
        if (player.age % 20 != 0) return
        player.onUpdateAbilities()
        const armorStr = player.getArmorSlots().toString()
        const hfa = armorStr == armor.spaceFermium, fa = armorStr == armor.fermium, ma = armorStr == armor.magneto
        const name = player.getName().getString()
        // 创世维度只允许磁流体星物质套装；仍按原顺序传送、击杀并清理周围实体。
        if (player.getLevel().getDimension() == "kubejs:create") {
            if (!ma) {
                player.getServer().runCommandSilent(`execute in minecraft:overworld as ${name} run tp 0 100 0`)
                player.kill()
            }
            event.getServer().runCommandSilent(`execute at ${name} run kill @e[distance=..100,name=!${name},type=!item]`)
        }
        if (ma || fa || hfa) {
            player.potionEffects.add("minecraft:saturation", 200, 0, false, false)
            if (player.persistentData.getBoolean("nv")) player.potionEffects.add("minecraft:night_vision", 300, 0, false, false)
            if (!player.abilities.mayfly) {
                player.abilities.mayfly = true
                player.persistentData.putInt("fly", 1)
                player.persistentData.putInt("fspeed", 1)
                player.onUpdateAbilities()
            }
        } else if (player.persistentData.getInt("fly") == 1) {
            player.abilities.mayfly = false
            player.persistentData.putInt("fly", 0)
            player.abilities.setFlyingSpeed(0.05)
            player.persistentData.putInt("fspeed", 1)
            player.onUpdateAbilities()
        }
        // 保留原次数判断：每秒加一；超过二十时仅将提示显示为二十。
        const uses = player.persistentData.getInt("tt")
        const held = player.getHeldItem("main_hand") == "kubejs:time_twister"
        if (uses > 20) {
            if (held) player.setStatusMessage("Usos restantes: " + 20)
        } else {
            player.persistentData.putInt("tt", uses + 1)
            if (held) player.setStatusMessage("Usos restantes: " + (uses + 1))
        }
    })
    function flyingSpeed(player, max) {
        if (player.isSteppingCarefully()) {
            player.abilities.setFlyingSpeed(0.05)
            player.setStatusMessage("Velocidade de voo redefinida")
            player.persistentData.putInt("fspeed", 1)
            player.onUpdateAbilities()
        } else {
            let speed = player.abilities.getFlyingSpeed(), multiplier = player.persistentData.getInt("fspeed")
            if (speed < max) {
                player.abilities.setFlyingSpeed(0.05 * multiplier)
                player.persistentData.putInt("fspeed", multiplier + 1)
                player.setStatusMessage("Velocidade de voo x" + multiplier)
                player.onUpdateAbilities()
            } else player.setStatusMessage("Limite atingido")
        }
    }
    NetworkEvents.dataReceived("global.flyingspeedKey.consumeClick", event => {
        const armorStr = event.player.getArmorSlots().toString()
        // 按原顺序检查四种套装，保持各自速度上限。
        flyingSpeeds.forEach(entry => {
            if (armorStr == armor[entry[0]]) flyingSpeed(event.player, entry[1])
        })
    })
    NetworkEvents.dataReceived("global.nightvisionKey.consumeClick", event => {
        const player = event.player, armorStr = player.getArmorSlots().toString()
        if (armorStr == armor.fermium || armorStr == armor.magneto || armorStr == armor.spaceFermium) {
            if (player.persistentData.getBoolean("nv")) {
                player.persistentData.putBoolean("nv", false)
                player.removeEffect("minecraft:night_vision")
                player.setStatusMessage("Visão noturna desativada")
            } else {
                player.persistentData.putBoolean("nv", true)
                player.setStatusMessage("Visão noturna ativada")
            }
        }
    })
    EntityEvents.hurt("player", event => {
        if (helpers.isWearing(event.entity, helpers.armorSets.magneto)) event.cancel()
        // 太空服和空间镄保留氧气、溺水免伤条件及原事件对象。
        if ((event.getSource().type().msgId() == "oxygen" || event.getSource().type().msgId() == "drown") &&
            (helpers.isWearing(event.entity, helpers.armorSets.quarktech) || helpers.isWearing(event.entity, helpers.armorSets.quarktechAdv) || helpers.isWearing(event.player, helpers.armorSets.spaceFermium))) event.cancel()
    })
})()
