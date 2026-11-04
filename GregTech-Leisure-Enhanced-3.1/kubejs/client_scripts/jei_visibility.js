// 隐藏不可用或重复的物品与机器，保持原有列表及匹配表达式。
JEIEvents.hideItems(event => {
    // useless_mod 模组全部隐藏
    event.hide(/^useless_mod:/)
    // 隐藏指定机器
    event.hide([
        'extendedae_plus:virtual_crafting_card',
        'extendedae_plus:entity_speed_ticker',
        'extendedae_plus:entity_speed_card',
        'mae2:64x_crafting_accelerator',
        'mae2:16x_crafting_accelerator',
        'mae2:4x_crafting_accelerator',
        'gtceu:generator_array',
        'gtceu:disassembly',
        'extendedae_plus:1024x_crafting_accelerator',
        'extendedae_plus:256x_crafting_accelerator',
        'extendedae_plus:64x_crafting_accelerator',
        'extendedae_plus:16x_crafting_accelerator',
        'extendedae_plus:4x_crafting_accelerator',
        'gtceu:processing_plant',
        'gtceu:assemble_plant',
        'gtceu:separated_plant',
        'gtceu:mixed_plant',
        // ExtendedAE 硅块：与 GT 硅块重复，保留 JEI 隐藏
        'expatternprovider:silicon_block'
    ])
})
