// 统一材料、电路、盔甲与透镜的物品标签，并移除冲突的流体标签。
ServerEvents.tags("item", event => {
    // 移除冲突物品的全部标签（AE2/Ad Astra 材料与 GT 统一）
    const items = [
        "ae2:certus_quartz_crystal",
        "ae2:certus_quartz_dust",
        "ae2:ender_dust",
        "appflux:redstone_crystal",
        "ad_astra:iron_plate",
        "ad_astra:iron_rod",
        "ad_astra:steel_ingot",
        "ad_astra:steel_nugget",
        "ad_astra:steel_plate",
        "ad_astra:steel_rod",
        "ad_astra:steel_block",
        // ExtendedAE 的硅块：与 GT 硅块重复，移除其全部标签（含 forge:storage_blocks/silicon），
        // 否则写样板/转配方时会选中它而不是 gtceu:silicon_block
        "expatternprovider:silicon_block"
    ]
    items.forEach(item => event.removeAllTagsFrom(item))

    // 硅块统一用 GT：确保 forge:storage_blocks/silicon 里只剩 gtceu:silicon_block
    // （ExtendedAE 电路切割机的硅→9x 硅板 配方吃的是这个标签）
    ;[
        ["forge:storage_blocks/silicon", "gtceu:silicon_block"],
        ["gtceu:circuits/ulv", "kubejs:basic_control_circuit"],
        ["gtceu:circuits/lv", "kubejs:advanced_control_circuit"],
        ["gtceu:circuits/mv", "kubejs:elite_control_circuit"],
        ["gtceu:circuits/hv", "kubejs:ultimate_control_circuit"],
        ["gtceu:circuits/ev", "kubejs:ultima_control_circuit"]
    ].forEach(([tag, items]) => event.add(tag, items));

    // 原版矿石全部标签移除（矿由 GT 统一管理）
    const ores = [
        "minecraft:coal_ore", "minecraft:deepslate_coal_ore",
        "minecraft:iron_ore", "minecraft:deepslate_iron_ore",
        "minecraft:copper_ore", "minecraft:deepslate_copper_ore",
        "minecraft:gold_ore", "minecraft:deepslate_gold_ore",
        "minecraft:redstone_ore", "minecraft:deepslate_redstone_ore",
        "minecraft:emerald_ore", "minecraft:deepslate_emerald_ore",
        "minecraft:lapis_ore", "minecraft:deepslate_lapis_ore",
        "minecraft:diamond_ore", "minecraft:deepslate_diamond_ore",
        "minecraft:nether_gold_ore", "minecraft:nether_quartz_ore"
    ]
    ores.forEach(ore => event.removeAllTagsFrom(ore))

    // 处理木板标签冲突
    event.remove("minecraft:planks", "gtceu:treated_wood_planks")

    // 高级电路系列挂到 GT 电路标签（ZPM~MAX）
    ;[
        ["gtceu:circuits/zpm", "kubejs:bioware_processor"],
        ["gtceu:circuits/uv", ["kubejs:optical_processor", "kubejs:bioware_assembly"]],
        ["gtceu:circuits/uhv", ["kubejs:exotic_processor", "kubejs:optical_assembly", "kubejs:bioware_computer"]],
        ["gtceu:circuits/uev", ["kubejs:cosmic_processor", "kubejs:exotic_assembly", "kubejs:optical_computer", "kubejs:bioware_mainframe"]],
        ["gtceu:circuits/uiv", ["kubejs:supracausal_processor", "kubejs:cosmic_assembly", "kubejs:exotic_computer", "kubejs:optical_mainframe"]],
        ["gtceu:circuits/uxv", ["kubejs:supracausal_assembly", "kubejs:cosmic_computer", "kubejs:exotic_mainframe", "kubejs:cosmic_computer"]],
        ["gtceu:circuits/opv", ["kubejs:supracausal_computer", "kubejs:cosmic_mainframe"]],
        ["gtceu:circuits/max", "kubejs:supracausal_mainframe"]
    ].forEach(([tag, items]) => event.add(tag, items));

    // 高级盔甲视为太空服（可在外星球生存）
    const spaceSuitItems = ["ad_astra:netherite_space_suit_items",
        "ad_astra:freeze_resistant_armor",
        "ad_astra:heat_resistant_armor",
        "ad_astra:space_suit_items"]
    spaceSuitItems.forEach(ssitem => {
        event.add(ssitem, [
            "gtceu:quarktech_chestplate", "gtceu:quarktech_leggings", "gtceu:quarktech_boots",
            "gtceu:advanced_quarktech_chestplate", "gtceu:quarktech_helmet",
            "avaritia:infinity_helmet", "avaritia:infinity_chestplate", "avaritia:infinity_pants", "avaritia:infinity_boots",
            "kubejs:space_fermium_helmet", "kubejs:space_fermium_chestplate", "kubejs:space_fermium_leggings", "kubejs:space_fermium_boots",
            "kubejs:magnetohydrodynamicallyconstrainedstarmatter_helmet",
            "kubejs:magnetohydrodynamicallyconstrainedstarmatter_chestplate",
            "kubejs:magnetohydrodynamicallyconstrainedstarmatter_leggings",
            "kubejs:magnetohydrodynamicallyconstrainedstarmatter_boots"
        ])
    })

    // 星门物品移除全部标签（防止与 GT 硅岩冲突）
    ;[
        ['sgjourney:naquadah_rod'],
        ['sgjourney:naquadah_alloy'],
        ['sgjourney:naquadah'],
        ['sgjourney:raw_naquadah']
    ].forEach(([tag]) => event.removeAllTagsFrom(tag));

    // 透镜模块：16 色透镜 → kubejs:laser_1~16 标签（供电路替换阶段识别透镜使用）
    const LENS_COLORS = ['glass', 'black', 'red', 'green', 'brown', 'blue', 'purple', 'cyan', 'light_gray', 'gray', 'pink', 'lime', 'yellow', 'light_blue', 'magenta', 'orange']
    LENS_COLORS.forEach((color, i) => {
        const lensId = color === 'glass' ? 'gtceu:glass_lens' : `gtceu:${color}_glass_lens`
        event.add(`kubejs:laser_${i + 1}`, lensId)
    })
})

ServerEvents.tags("fluid", event => {
    // 移除 Ad Astra 流体标签（与 GT 氧气/氢气/油统一）
    ;[
        ["forge:oxygen", "ad_astra:oxygen"],
        ["forge:hydrogen", "ad_astra:hydrogen"],
        ["forge:oil", "ad_astra:oil"]
    ].forEach(([tag, items]) => event.remove(tag, items));
})
