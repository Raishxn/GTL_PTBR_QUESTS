// 钢铁意志：每治愈两点生命赠送一枚钢锭，累计治疗按阈值发放一次奖励。
;(() => {
    // 每行依次为治疗阈值、物品、数量、提示；数值和提示原文全部保留。
    const rewards = [
        [20, 'gtceu:gold_credit', 10, '§a钢铁意志的起点！你累计治愈了 §e10颗心§a，钢铁正在你的手中缓缓成型！'],
        [200, 'gtceu:ancient_gold_coin', 128, '§a你的意志愈发坚韧！累计治愈 §e100颗心§a，钢铁的温度已经开始灼烧你的双手！'],
        [2000, 'gtladditions:super_parallel_hatch', 5, '§e钢铁的意志已经刻入你的灵魂！累计治愈 §b1000颗心§e，量子的力量为你所用！'],
        [20000, 'gtladditions:astral_array', 64, '§d传说级的钢铁意志！你累计治愈了 §b10000颗心§d，中子的坚不可摧，正是你的写照！'],
        [200000, 'expatternprovider:fishbig', 1, '§6🌟 真正的钢铁意志！你用十万颗心的治愈，铸就了不朽的生命传奇！无尽的力量，属于真正的生命之神！']
    ]
    PlayerEvents.tick(event => {
        const player = event.entity, data = player.persistentData
        // 只重置原本会判定为损坏的数据；首次记录生命值时不计算治疗。
        if (typeof data.totalHealed === 'number' && isNaN(data.totalHealed)) {
            delete data.lastHealth
            delete data.healOverflow
            delete data.totalHealed
            rewards.forEach(reward => { delete data['has_reward_' + reward[0]] })
        }
        if (data.lastHealth == null) {
            data.lastHealth = player.health
            data.healOverflow = 0
            data.totalHealed = 0
            return
        }
        const currentHealth = player.health, maxHealth = player.maxHealth
        if (currentHealth > data.lastHealth) {
            let actualHeal = Math.min(currentHealth - data.lastHealth, maxHealth - data.lastHealth)
            if (actualHeal <= 0) { data.lastHealth = currentHealth; return }
            data.healOverflow += actualHeal
            let steelCount = Math.floor(data.healOverflow / 2)
            if (steelCount > 0) {
                player.give(Item.of('gtceu:steel_ingot', steelCount))
                data.healOverflow %= 2
            }
            data.totalHealed += actualHeal
            rewards.forEach(reward => {
                const key = 'has_reward_' + reward[0]
                if (data[key] === undefined) data[key] = false
                if (data.totalHealed >= reward[0] && !data[key]) {
                    player.give(Item.of(reward[1], reward[2] || 1))
                    data[key] = true
                    player.tell(reward[3])
                }
            })
        }
        data.lastHealth = currentHealth
    })
})()
