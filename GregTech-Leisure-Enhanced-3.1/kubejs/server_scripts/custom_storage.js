// priority: 95
// 本文件按功能保存配方阶段，实际执行顺序统一由配方入口管理。

// 互换超级样板缓存与代理。
global.gtlPack.register("custom_pattern_buffer_conversion", event => {
    event.shapeless('gtladditions:me_super_pattern_buffer_proxy', ['gtladditions:me_super_pattern_buffer'])
    event.shapeless('gtladditions:me_super_pattern_buffer', ['gtladditions:me_super_pattern_buffer_proxy'])
})

// 组装青铜物品盘和流体盘。
global.gtlPack.register("custom_portable_cells", event => {
    const gtr = event.recipes.gtceu
    global.gtlPack.batch(gtr, "assembler", ["itemInputs", "itemOutputs", ["EUt", GTValues.VA[GTValues.MV]], ["duration", 200]], [
        ["greythings:super_portable_item_storage_cell_custom", ["64x gtceu:bronze_crate"], ["gtlcore:super_portable_item_storage_cell"]],
        ["greythings:super_portable_fluid_storage_cell_custom", ["64x gtceu:bronze_drum"], ["gtlcore:super_portable_fluid_storage_cell"]]
    ]);
})

// 批量合成不同类型的点对点通道与多合一通道。
global.gtlPack.register("custom_point_tunnels", event => {
    const gtr = event.recipes.gtceu
    const p2pBasic = ["redstone", "item", "fluid", "fe"]
    const p2pAdvanced = ["pattern", "eu"]
    const p2pMae2 = ["me", "light"]
    const makeP2P = (modId, type, multi) => {
        gtr.assembler(`greythings:${type}_${multi ? 'multi_' : ''}p2p_tunnel`)
            .notConsumable(`${modId}:${type}_${multi ? 'multi_' : ''}p2p_tunnel`)
            .itemInputs("3x minecraft:iron_ingot", multi ? "2x ae2:engineering_processor" : "ae2:engineering_processor", "3x ae2:fluix_crystal")
            .itemOutputs(`${modId}:${type}_${multi ? 'multi_' : ''}p2p_tunnel`)
            .EUt(GTValues.VA[GTValues.MV]).duration(200)
    }
    p2pBasic.forEach(t => { makeP2P('ae2', t, false); makeP2P('mae2', t, true) })
    p2pAdvanced.forEach(t => { makeP2P('mae2', t, false); makeP2P('mae2', t, true) })
    p2pMae2.forEach(t => makeP2P('ae2', t, false))
})

// 组装高速无限盘。
global.gtlPack.register("custom_fast_infinity_cell", event => {
    const gtr = event.recipes.gtceu
    gtr.precision_assembler("greythings:fast_infinity_cell")
        .itemInputs("64x kubejs:zero_point_module_fragments", "gtlcore:item_infinity_cell", "gtlcore:fluid_infinity_cell", "12x kubejs:entangled_singularity")
        .inputFluids("gtceu:mutated_living_solder 1440")
        .itemOutputs("gtlcore:fast_infinity_cell")
        .EUt(GTValues.VA[GTValues.UEV]).duration(400)
        .cleanroom(CleanroomType.CLEANROOM)
})
