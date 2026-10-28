// priority: 95
// 本文件按功能保存配方阶段，实际执行顺序统一由配方入口管理。

// 逐级转换有线、无线与电网仓；仅为已存在的仓室注册配方。
global.gtlPack.register("custom_wireless_hatches", event => {
    const gtr = event.recipes.gtceu
    var tiers = ["ulv", "lv", "mv", "hv", "ev", "iv", "luv", "zpm", "uv", "uhv", "uev", "uiv", "uxv", "opv", "max"]
    const anya = ["4a", "16a", "64a"]
    const anya_laser = ['256a', '1024a', '4096a', '16384a', '65536a', '262144a', '1048576a', '4194304a', '16777216a', '67108864a']
    const isexisted = (item) => !Item.of(item).isEmpty()
    const addrecipeifexist = (input, output, tier) => {
        if (isexisted(input) && isexisted(output)) {
            event.shapeless(output, input)
            // 高级网络舱口不允许拆解回退
            if (output.split(':')[0] == 'gtmadvancedhatch')
                event.remove({ id: `gtmadvancedhatch:disassembly/${output.split(':')[1]}` })
        }
    }
    tiers.forEach(tier => {
        // 激光源：有线 → 无线 → 网络
        addrecipeifexist(`gtceu:${tier}_67108863a_laser_source_hatch`, `gtmthings:${tier}_67108863a_wireless_laser_source_hatch`, tier)
        addrecipeifexist(`gtmthings:${tier}_67108863a_wireless_laser_source_hatch`, `gtmadvancedhatch:${tier}_67108864a_net_laser_source_hatch`, tier)
        // 能量输入：普通仓/变电站 64A → 无线 → 网络
        addrecipeifexist(`gtceu:${tier}_energy_input_hatch`, `gtmthings:${tier}_2a_wireless_energy_input_hatch`, tier)
        addrecipeifexist(`gtceu:${tier}_substation_input_hatch_64a`, `gtmthings:${tier}_64a_wireless_energy_input_hatch`, tier)
        addrecipeifexist(`gtmthings:${tier}_2a_wireless_energy_input_hatch`, `gtmadvancedhatch:${tier}_2a_net_energy_input_hatch`, tier)
        // 能量输出同样一套
        addrecipeifexist(`gtceu:${tier}_energy_output_hatch`, `gtmthings:${tier}_2a_wireless_energy_output_hatch`, tier)
        addrecipeifexist(`gtceu:${tier}_substation_output_hatch_64a`, `gtmthings:${tier}_64a_wireless_energy_output_hatch`, tier)
        addrecipeifexist(`gtmthings:${tier}_2a_wireless_energy_output_hatch`, `gtmadvancedhatch:${tier}_2a_net_energy_output_hatch`, tier)
        // 4A/16A/64A 输入输出
        anya.forEach(a => {
            addrecipeifexist(`gtceu:${tier}_energy_input_hatch_${a}`, `gtmthings:${tier}_${a}_wireless_energy_input_hatch`, tier)
            addrecipeifexist(`gtmthings:${tier}_${a}_wireless_energy_input_hatch`, `gtmadvancedhatch:${tier}_${a}_net_energy_input_hatch`, tier)
            addrecipeifexist(`gtceu:${tier}_energy_output_hatch_${a}`, `gtmthings:${tier}_${a}_wireless_energy_output_hatch`, tier)
            addrecipeifexist(`gtmthings:${tier}_${a}_wireless_energy_output_hatch`, `gtmadvancedhatch:${tier}_${a}_net_energy_output_hatch`, tier)
        })
        // 激光靶/激光源（大电流档）
        anya_laser.forEach(a => {
            addrecipeifexist(`gtceu:${tier}_${a}_laser_target_hatch`, `gtmthings:${tier}_${a}_wireless_laser_target_hatch`, tier)
            addrecipeifexist(`gtmthings:${tier}_${a}_wireless_laser_target_hatch`, `gtmadvancedhatch:${tier}_${a}_net_laser_target_hatch`, tier)
            addrecipeifexist(`gtceu:${tier}_${a}_laser_source_hatch`, `gtmthings:${tier}_${a}_wireless_laser_source_hatch`, tier)
            addrecipeifexist(`gtmthings:${tier}_${a}_wireless_laser_source_hatch`, `gtmadvancedhatch:${tier}_${a}_net_laser_source_hatch`, tier)
        })
    })
    gtr.assembler('lasywireless:easier_advanced_energy_detector_cover')
        .itemInputs('gtceu:energy_detector_cover', 'gtceu:lv_sensor')
        .inputFluids('gtceu:soldering_alloy 72')
        .itemOutputs('gtceu:advanced_energy_detector_cover')
        .EUt(30).duration(100)
})
