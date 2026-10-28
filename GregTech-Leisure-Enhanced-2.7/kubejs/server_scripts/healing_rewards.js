// 钢铁意志：每治愈两点生命赠送一枚钢锭，累计治疗按阈值发放一次奖励。
;(() => {
    // 每行依次为治疗阈值、物品、数量、提示；数值和提示原文全部保留。
    const rewards = [
        [20, 'gtceu:gold_credit', 10, '§aO ponto de partida de uma vontade de ferro! Você curou um total de §e10 corações§a, e o ferro está lentamente tomando forma em suas mãos!'],
        [200, 'gtceu:ancient_gold_coin', 128, '§aSua vontade está ficando mais forte! Curou um total de §e100 corações§a, a temperatura do aço já começou a queimar suas mãos!'],
        [2000, 'gtladditions:super_parallel_hatch', 5, '§eA vontade de ferro foi gravada em sua alma! Curou um total de §b1000 corações§e, o poder quântico está à sua disposição!'],
        [20000, 'gtladditions:astral_array', 64, '§dVontade de ferro lendária! Você curou um total de §b10000 corações§d, a indestrutibilidade dos nêutrons é o seu verdadeiro reflexo!'],
        [200000, 'expatternprovider:fishbig', 1, '§6🌟 Verdadeira Vontade de Ferro! Com a cura de 100.000 corações, você forjou uma lenda imortal da vida! O poder infinito pertence ao verdadeiro Deus da Vida!']
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
