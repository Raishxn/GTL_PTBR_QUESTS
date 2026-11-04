// priority: 95
// 注册三种高级盔甲等级；装备物品由物品注册模块创建。
ItemEvents.armorTierRegistry(event => {
    // 名称、防护值、附魔能力、韧性、击退抗性、修复材料；空修复材料保持原默认。
    const tiers = [
        ["magnetohydrodynamicallyconstrainedstarmatter", [0, 0, 0, 0], 10, 0, 10,
            "#forge:ingots/magnetohydrodynamicallyconstrainedstarmatter"],
        ["fermium", [16, 24, 22, 14], 10, 10, 1],
        ["space_fermium", [16, 24, 22, 14], 14, 10, 2]
    ]
    tiers.forEach(([name, protections, enchantment, toughness, knockback, repair]) => {
        event.add(name, tier => {
            tier.durabilityMultiplier = 1
            tier.slotProtections = protections
            tier.enchantmentValue = enchantment
            tier.equipSound = "minecraft:item.armor.equip_iron"
            if (repair !== undefined) tier.repairIngredient = repair
            tier.toughness = toughness
            tier.knockbackResistance = knockback
        })
    })
})
