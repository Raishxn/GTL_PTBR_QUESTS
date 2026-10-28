// priority: 95
// 本文件按功能保存配方阶段，实际执行顺序统一由配方入口管理。

// 逐级转换一至七级火箭，保留各级独立配方编号。
global.gtlPack.register("custom_rocket_upgrades", event => {
    const rocketUpgrades = [
        { input: 'ad_astra:tier_1_rocket', output: 'ad_astra:tier_2_rocket' },
        { input: 'ad_astra:tier_2_rocket', output: 'ad_astra:tier_3_rocket' },
        { input: 'ad_astra:tier_3_rocket', output: 'ad_astra:tier_4_rocket' },
        { input: 'ad_astra:tier_4_rocket', output: 'ad_astra_rocketed:tier_5_rocket' },
        { input: 'ad_astra_rocketed:tier_5_rocket', output: 'ad_astra_rocketed:tier_6_rocket' },
        { input: 'ad_astra_rocketed:tier_6_rocket', output: 'ad_astra_rocketed:tier_7_rocket' }
    ]
    rocketUpgrades.forEach((upgrade, index) => {
        event.shapeless(upgrade.output, [upgrade.input]).id(`kubejs:rocket_upgrade_t${index + 1}_to_t${index + 2}`)
    })
})

// 将三个维度的世界碎片和石粉加工为世界数据。
global.gtlPack.register("custom_world_data", event => {
    const gtr = event.recipes.gtceu
    const worldData = [
        { id: 'kubejs:overworld_data_from_assembler', fragment: 'gtlcore:world_fragments_overworld', dust: 'gtceu:stone_dust', output: 'kubejs:overworld_data', eu: 2048, circuit: 1 },
        { id: 'kubejs:nether_data_from_assembler', fragment: 'gtlcore:world_fragments_nether', dust: 'gtceu:netherrack_dust', output: 'kubejs:nether_data', eu: 2048, circuit: 2 },
        { id: 'kubejs:end_data_from_assembler', fragment: 'gtlcore:world_fragments_end', dust: 'gtceu:endstone_dust', output: 'kubejs:end_data', eu: 32768, circuit: 3 }
    ]
    worldData.forEach(recipe => {
        gtr.assembler(recipe.id)
            .itemInputs(`64x ${recipe.fragment}`, `64x ${recipe.dust}`)
            .inputFluids("gtceu:pcb_coolant 1000")
            .itemOutputs(recipe.output)
            .EUt(recipe.eu).duration(600).circuit(recipe.circuit)
    })
})

// 将巴纳德世界碎片、原木和树叶组装成巴纳德数据。
global.gtlPack.register("custom_barnarda_data", event => {
    const gtr = event.recipes.gtceu
    gtr.assembler("gtladditions:barnarda_data")
        .itemInputs("64x gtlcore:world_fragments_barnarda", "64x kubejs:barnarda_log", "64x kubejs:barnarda_leaves")
        .itemOutputs("gtladditions:barnarda_data")
        .EUt(2048)
        .duration(4000)
})
