// priority: 95
// 本文件按功能保存配方阶段，实际执行顺序统一由配方入口管理。

// 合成时间物质、铜币、无限双仓和三档频率激光。
global.gtlPack.register("custom_component_shortcuts", event => {
    const gtr = event.recipes.gtceu
    gtr.assembler('kubejs:temporal_matter_synthesis')
        .itemInputs('kubejs:kinetic_matter', 'kubejs:corporeal_matter', 'gtceu:tritanium_block')
        .itemOutputs('kubejs:temporal_matter')
        .duration(1200).EUt(GTValues.V[13]).circuit(24)
    gtr.forming_press('kubejs:copper_credit_press')
        .itemInputs('minecraft:copper_ingot')
        .itemOutputs('gtceu:copper_credit')
        .duration(200).EUt(30).circuit(5)
    gtr.assembler('kubejs:infinity_input_dual_hatch')
        .itemInputs('gtladditions:me_super_pattern_buffer')
        .itemOutputs('gtladditions:infinity_input_dual_hatch')
        .duration(200).EUt(30).circuit(32)
    const lasers = [
        { id: 'kubejs:laser_low_red_garnet', input: 'gtceu:red_garnet_rod', output: 'kubejs:low_frequency_laser', circuit: 1 },
        { id: 'kubejs:laser_medium_lazurite', input: 'gtceu:lazurite_rod', output: 'kubejs:medium_frequency_laser', circuit: 2 },
        { id: 'kubejs:laser_high_amethyst', input: 'gtceu:amethyst_rod', output: 'kubejs:high_frequency_laser', circuit: 3 }
    ]
    lasers.forEach(recipe => {
        gtr.assembler(recipe.id)
            .itemInputs(recipe.input, 'kubejs:highly_reflective_mirror', 'kubejs:smd_diode_optical')
            .itemOutputs(recipe.output)
            .EUt(524288).duration(600)
            .circuit(recipe.circuit)
            .cleanroom(CleanroomType.CLEANROOM)
    })
})

// 保留压缩星阵的概率工艺和确定产出工艺。
global.gtlPack.register("custom_astral_arrays", event => {
    const gtr = event.recipes.gtceu
    gtr.qft('kubejs:compressed_astral_array_1')
        .itemInputs(
            '144x gtladditions:black_hole_seed',
            '64x gtceu:eternity_nanoswarm',
            '64x gtceu:spacetime_nanoswarm',
            '64x minecraft:repeating_command_block'
        )
        .inputFluids('gtceu:miracle 576')
        .chancedOutput('gtladditions:compressed_astral_array', 500, 0)
        .EUt(GTValues.VA[GTValues.MAX]).duration(24000)
    gtr.suprachronal_assembly_line('kubejs:compressed_astral_array_2')
        .notConsumable('1x kubejs:cosmic_fragment')
        .itemInputs(
            '720x gtladditions:black_hole_seed',
            '320x gtceu:eternity_nanoswarm',
            '320x gtceu:spacetime_nanoswarm',
            '320x minecraft:repeating_command_block'
        )
        .inputFluids('gtceu:miracle 2880')
        .itemOutputs('gtladditions:compressed_astral_array')
        .EUt(GTValues.VA[GTValues.MAX]).duration(24000)
})

// 组装自适应网络并行仓。
global.gtlPack.register("custom_adaptive_hatch", event => {
    const gtr = event.recipes.gtceu
    gtr.assembler("kubejs:adaptive_net_parallel_hatch")
        .itemInputs("gtceu:iv_parallel_hatch", "4x gtceu:iv_sensor", "gtmthings:wireless_energy_interface", "gtceu:hssg_coil_block")
        .inputFluids("gtceu:soldering_alloy 576")
        .itemOutputs("gtmadvancedhatch:adaptive_net_parallel_hatch")
        .EUt(GTValues.VA[GTValues.IV])
        .duration(400)
})

// 用整组工作台压缩制作压缩工作台。
global.gtlPack.register("custom_compressed_workbench", event => {
    const gtr = event.recipes.gtceu
    gtr.compressor("avaritia:compressed_crafting_table")
        .itemInputs("64x minecraft:crafting_table")
        .itemOutputs("avaritia:compressed_crafting_table")
        .EUt(480).duration(200)
})
