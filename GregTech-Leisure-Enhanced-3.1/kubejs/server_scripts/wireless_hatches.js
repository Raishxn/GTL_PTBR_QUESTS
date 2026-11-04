// priority: 95
// 无线能源仓、激光仓和连接部件的合成。
// 由 gtceu.js 按既有阶段顺序执行，本文件只登记配方，不依赖文件名排序。
global.gtlPack.register("wireless_hatches", event => {
    const gtr = event.recipes.gtceu;
    const batch = global.gtlPack.batch;

    const wireless_tiers = [[0, "uhv", "neutronium", "europium", "kubejs:nm_chip", "8x kubejs:smd_inductor_bioware", "gtceu"],
        [1, "uev", "quantanium", "mithril", "kubejs:nm_chip", "8x kubejs:smd_inductor_optical", "gtceu"],
        [2, "uiv", "adamantium", "neutronium", "kubejs:pm_chip", "8x kubejs:smd_inductor_exotic", "gtceu"],
        [3, "uxv", "vibranium", "taranium", "kubejs:pm_chip", "8x kubejs:smd_inductor_cosmic", "gtceu"],
        [4, "opv", "draconium", "crystalmatrix", "kubejs:fm_chip", "8x kubejs:smd_inductor_supracausal", "gtceu"],
        [5, "max", "chaos", "cosmicneutronium", "kubejs:fm_chip", "8x gtceu:shirabon_foil", "gtlcore"]]
    wireless_tiers.forEach((tier) => {
        let soldering = tier[0] < 3 ? "gtceu:mutated_living_solder 144" : "gtceu:super_mutated_living_solder 144"
        batch(gtr, "assembler", ["itemInputs", ["inputFluids", soldering], "itemOutputs", ["EUt", GTValues.VA[tier[0] + 9]], ["duration", 200]], [
            [`gtmthings:${tier[1]}_wireless_energy_receive_cover`,
                [`${tier[6]}:${tier[1]}_sensor`, `${tier[6]}:${tier[1]}_emitter`, "4x gtceu:ender_pearl_plate", "2x #gtceu:circuits/" + tier[1],
                    `kubejs:${tier[1]}_voltage_coil`, tier[4], `2x gtceu:${tier[3]}_single_cable`, "2x gtceu:red_alloy_single_cable",
                    `4x gtceu:${tier[2]}_plate`], [`gtmthings:${tier[1]}_wireless_energy_receive_cover`]],
            [`gtmthings:${tier[1]}_4a_wireless_energy_receive_cover`,
                [`2x gtmthings:${tier[1]}_wireless_energy_receive_cover`, tier[5], `4x gtceu:niobium_titanium_quadruple_cable`,
                    `2x kubejs:${tier[1]}_voltage_coil`, "2x gtceu:double_battery_alloy_plate"],
                [`gtmthings:${tier[1]}_4a_wireless_energy_receive_cover`]]
        ]);
    })

    for (let index = 5; index < 15; index++) {
        let tierName = GTValues.VN[index].toLowerCase()
        batch(gtr, "assembler", ["itemInputs", ["inputFluids", "gtceu:soldering_alloy 144"], "itemOutputs", ["EUt", GTValues.VA[index]], ["duration", 200]], [
            [`gtmthings:${tierName}_16384a_wireless_laser_target_hatch`,
                [`gtceu:${tierName}_16384a_laser_target_hatch`, `16x gtmthings:${tierName}_4a_wireless_energy_receive_cover`,
                    "gtceu:active_transformer", "gtceu:superconducting_coil", "2x gtceu:high_power_casing", "4x gtceu:normal_laser_pipe",
                    "gtceu:advanced_energy_detector_cover"], [`gtmthings:${tierName}_16384a_wireless_laser_target_hatch`]],
            [`gtmthings:${tierName}_16384a_wireless_laser_source_hatch`,
                [`gtceu:${tierName}_16384a_laser_source_hatch`, `16x gtmthings:${tierName}_4a_wireless_energy_receive_cover`,
                    "gtceu:active_transformer", "gtceu:superconducting_coil", "2x gtceu:high_power_casing", "4x gtceu:normal_laser_pipe",
                    "gtceu:advanced_energy_detector_cover"], [`gtmthings:${tierName}_16384a_wireless_laser_source_hatch`]],
            [`gtmthings:${tierName}_65536a_wireless_laser_target_hatch`,
                [`gtceu:${tierName}_65536a_laser_target_hatch`, `16x gtmthings:${tierName}_4a_wireless_energy_receive_cover`,
                    "gtceu:active_transformer", "2x gtceu:superconducting_coil", "2x gtceu:high_power_casing", "8x gtceu:normal_laser_pipe",
                    "gtceu:advanced_energy_detector_cover"], [`gtmthings:${tierName}_65536a_wireless_laser_target_hatch`]],
            [`gtmthings:${tierName}_65536a_wireless_laser_source_hatch`,
                [`gtceu:${tierName}_65536a_laser_source_hatch`, `16x gtmthings:${tierName}_4a_wireless_energy_receive_cover`,
                    "gtceu:active_transformer", "2x gtceu:superconducting_coil", "2x gtceu:high_power_casing", "8x gtceu:normal_laser_pipe",
                    "gtceu:advanced_energy_detector_cover"], [`gtmthings:${tierName}_65536a_wireless_laser_source_hatch`]],
            [`gtmthings:${tierName}_262144a_wireless_laser_target_hatch`,
                [`gtceu:${tierName}_262144a_laser_target_hatch`, `16x gtmthings:${tierName}_4a_wireless_energy_receive_cover`,
                    "2x gtceu:active_transformer", "2x gtceu:superconducting_coil", "2x gtceu:high_power_casing", "16x gtceu:normal_laser_pipe",
                    "gtceu:advanced_energy_detector_cover"], [`gtmthings:${tierName}_262144a_wireless_laser_target_hatch`]],
            [`gtmthings:${tierName}_262144a_wireless_laser_source_hatch`,
                [`gtceu:${tierName}_262144a_laser_source_hatch`, `16x gtmthings:${tierName}_4a_wireless_energy_receive_cover`,
                    "2x gtceu:active_transformer", "2x gtceu:superconducting_coil", "2x gtceu:high_power_casing", "16x gtceu:normal_laser_pipe",
                    "gtceu:advanced_energy_detector_cover"], [`gtmthings:${tierName}_262144a_wireless_laser_source_hatch`]],
            [`gtmthings:${tierName}_1048576a_wireless_laser_target_hatch`,
                [`gtceu:${tierName}_1048576a_laser_target_hatch`, `16x gtmthings:${tierName}_4a_wireless_energy_receive_cover`,
                    "2x gtceu:active_transformer", "4x gtceu:superconducting_coil", "2x gtceu:high_power_casing", "32x gtceu:normal_laser_pipe",
                    "4x kubejs:molecular_coil", "gtceu:advanced_energy_detector_cover"],
                [`gtmthings:${tierName}_1048576a_wireless_laser_target_hatch`]],
            [`gtmthings:${tierName}_1048576a_wireless_laser_source_hatch`,
                [`gtceu:${tierName}_1048576a_laser_source_hatch`, `16x gtmthings:${tierName}_4a_wireless_energy_receive_cover`,
                    "2x gtceu:active_transformer", "4x gtceu:superconducting_coil", "2x gtceu:high_power_casing", "32x gtceu:normal_laser_pipe",
                    "4x kubejs:molecular_coil", "gtceu:advanced_energy_detector_cover"],
                [`gtmthings:${tierName}_1048576a_wireless_laser_source_hatch`]],
            [`gtmthings:${tierName}_4194304a_wireless_laser_target_hatch`,
                [`gtceu:${tierName}_4194304a_laser_target_hatch`, `16x gtmthings:${tierName}_4a_wireless_energy_receive_cover`,
                    "2x gtceu:active_transformer", "8x gtceu:superconducting_coil", "2x gtceu:high_power_casing", "32x gtceu:normal_laser_pipe",
                    "8x kubejs:molecular_coil", "gtceu:advanced_energy_detector_cover"],
                [`gtmthings:${tierName}_4194304a_wireless_laser_target_hatch`]],
            [`gtmthings:${tierName}_4194304a_wireless_laser_source_hatch`,
                [`gtceu:${tierName}_4194304a_laser_source_hatch`, `16x gtmthings:${tierName}_4a_wireless_energy_receive_cover`,
                    "2x gtceu:active_transformer", "8x gtceu:superconducting_coil", "2x gtceu:high_power_casing", "32x gtceu:normal_laser_pipe",
                    "8x kubejs:molecular_coil", "gtceu:advanced_energy_detector_cover"],
                [`gtmthings:${tierName}_4194304a_wireless_laser_source_hatch`]]
        ]);
    }
});
