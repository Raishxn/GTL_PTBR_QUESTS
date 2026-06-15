StartupEvents.registry('item', event => {
    // 太空电梯快速采集模块 MK1 ~ MK6
    for (let i = 1; i <= 6; i++) {
        event.create(`thetornproductionline:space_elevator_miner_module_mk${i}`)
            .texture('thetornproductionline:item/celestial_secret_deducing_module')
            .displayName(`太空电梯快速采集模块 MK${i}`)
            .tooltip([
                `§e放入太空电梯采矿/钻井模块，消耗 160B 偏二甲肼火箭燃料`,
                `§e一次性获取 MK${i} 可及的所有太空矿石与流体资源`
            ])
    }

    event.create('thetornproductionline:greenhouse_speed_cultivation_module')
        .texture('thetornproductionline:item/celestial_secret_deducing_module')
        .displayName('温室高速培养模块')
        .tooltip('§a放入温室，通入 16B 水，一次性获取所有温室产物')

    // 星门构成模块
    event.create('thetornproductionline:stargate_constitution_module')
        .texture('thetornproductionline:item/celestial_secret_deducing_module')
        .displayName('星门构成模块')
        .tooltip('§5借助命令方块的力量，物质重构模块能够用任意原料合成星门，这需要巨量的能量和算力，还需要4个星门作为模板')

    // 简易世界碎片高速采集模块
    event.create('thetornproductionline:easy_world_fragment_miner_module')
        .texture('thetornproductionline:item/celestial_secret_deducing_module')
        .displayName('简易世界碎片高速采集模块')
        .tooltip('§a放入碎片世界采集器，配合主世界碎片，32号电路，一次性获取所有主世界矿物')

    // 高级世界碎片高速采集模块
    event.create('thetornproductionline:advanced_world_fragment_miner_module')
        .texture('thetornproductionline:item/celestial_secret_deducing_module')
        .displayName('高级世界碎片高速采集模块')
        .tooltip('§a放入碎片世界采集器，配合任意世界碎片，31号电路，一次性获取对应世界所有矿物')

    // 终极世界碎片高速采集模块
    event.create('thetornproductionline:ultimate_world_fragment_miner_module')
        .texture('thetornproductionline:item/celestial_secret_deducing_module')
        .displayName('终极世界碎片高速采集模块')
        .tooltip('§a放入碎片世界采集器，配合任意世界碎片，30号电路，一次性获取矿物与流体（速率同钛钻头）')

    event.create('thetornproductionline:high_speed_bio_data_module')
        .texture('thetornproductionline:item/celestial_secret_deducing_module')
        .displayName('高速生物数据模拟模块')
        .tooltip('§a放入生物数据模拟室，输入 16B 生物质 + 1B 灭菌生物培养基原液，一次性获取所有生物模拟产物')

    // 天机聚合龙脉结晶模块
    event.create('thetornproductionline:celestial_aggregate_dragon_vein_module')
        .texture('thetornproductionline:item/celestial_secret_deducing_module')
        .displayName('天机聚合龙脉结晶模块')
        .tooltip('§d~~天机推演模块使你简化了龙脉结晶技术~~')
        .tooltip('§a作为装配线催化剂，合成各类龙族核心')

    // 便携化学扭曲模块 MK1 ~ MK4
    for (let mk = 1; mk <= 4; mk++) {
        event.create(`kubejs:portable_chem_distort_module_mk${mk}`)
            .displayName(`便携化学扭曲模块 [MK${mk}]`)
            .tooltip(mk === 4 ? '§d替代所有催化剂' : `§e替代 ${mk} 阶纳米蜂群`)
            .texture('thetornproductionline:item/celestial_secret_deducing_module')   // 复用天机模块贴图
    }
})

// 如果需要手动导入 KeyList，取消下面注释
// const KeyList = Java.loadClass("net.yxiao233.meinfinitycell.common.utils.KeyList")

StartupEvents.registry("item", event => {
    event.create("super_ae_infinite_cell", "meinfinitycell:infinities_cell")
        .setName(Text.literal("Componentes ilimitados Super AE"))
        .texture('thetornproductionline:item/celestial_secret_deducing_module')  // 使用天机推演模块贴图
        .setKeys(new KeyList().adds(keys => {
            // ===== 超级AE包物品 =====
            keys.add(AEKeyHelper.item("expatternprovider:ex_pattern_provider"))
            keys.add(AEKeyHelper.item("expatternprovider:ex_pattern_access_part"))
            keys.add(AEKeyHelper.item("expatternprovider:ex_import_bus_part"))
            keys.add(AEKeyHelper.item("expatternprovider:ex_export_bus_part"))
            keys.add(AEKeyHelper.item("expatternprovider:ex_drive"))
            keys.add(AEKeyHelper.item("ae2:wireless_access_point"))
            keys.add(AEKeyHelper.item("expatternprovider:wireless_connect"))
            keys.add(AEKeyHelper.item("ae2:pattern_encoding_terminal"))
            keys.add(AEKeyHelper.item("gtceu:me_input_hatch"))
            keys.add(AEKeyHelper.item("ae2:capacity_card"))
            keys.add(AEKeyHelper.item("ae2:wireless_crafting_terminal"))
            keys.add(AEKeyHelper.item("expatternprovider:wireless_ex_pat"))
            keys.add(AEKeyHelper.item("ae2wtlib:wireless_pattern_encoding_terminal"))
            keys.add(AEKeyHelper.item("ae2:fuzzy_card"))
            keys.add(AEKeyHelper.item("ae2:void_card"))
            keys.add(AEKeyHelper.item("ae2:singularity"))
            keys.add(AEKeyHelper.item("ae2:basic_card"))
            keys.add(AEKeyHelper.item("ae2:equal_distribution_card"))
            keys.add(AEKeyHelper.item("ae2:crafting_card"))
            keys.add(AEKeyHelper.item("ae2:inverter_card"))
            keys.add(AEKeyHelper.item("ae2:speed_card"))
            keys.add(AEKeyHelper.item("ae2:creative_energy_cell"))
            keys.add(AEKeyHelper.item("ae2:quantum_link"))
            keys.add(AEKeyHelper.item("ae2:quantum_ring"))
            keys.add(AEKeyHelper.item("gtceu:me_input_bus"))
            keys.add(AEKeyHelper.item("expatternprovider:assembler_matrix_glass"))
            keys.add(AEKeyHelper.item("ae2:crafting_terminal"))
            keys.add(AEKeyHelper.item("expatternprovider:ex_interface"))
            keys.add(AEKeyHelper.item("ae2:fluix_smart_cable"))
            keys.add(AEKeyHelper.item("ae2:fluix_glass_cable"))
            keys.add(AEKeyHelper.item("ae2:fluix_covered_dense_cable"))
            keys.add(AEKeyHelper.item("ae2:fluix_smart_dense_cable"))
            keys.add(AEKeyHelper.item("ae2:blank_pattern"))
            keys.add(AEKeyHelper.item("ae2:cable_anchor"))
            keys.add(AEKeyHelper.item("ae2:redstone_card"))
            keys.add(AEKeyHelper.item("ae2wtlib:quantum_bridge_card"))
            keys.add(AEKeyHelper.item("ae2:logic_processor"))
            keys.add(AEKeyHelper.item("ae2:calculation_processor"))
            keys.add(AEKeyHelper.item("ae2:engineering_processor"))
            keys.add(AEKeyHelper.item("expatternprovider:assembler_matrix_crafter"))
            keys.add(AEKeyHelper.item("expatternprovider:assembler_matrix_wall"))
            keys.add(AEKeyHelper.item("expatternprovider:assembler_matrix_pattern"))
            keys.add(AEKeyHelper.item("expatternprovider:assembler_matrix_frame"))
            keys.add(AEKeyHelper.item("expatternprovider:assembler_matrix_speed"))
            keys.add(AEKeyHelper.item("ae2:advanced_card"))
            keys.add(AEKeyHelper.item("ae2:quartz_fiber"))
            keys.add(AEKeyHelper.item("expatternprovider:ex_io_port"))
            keys.add(AEKeyHelper.item("ae2:level_emitter"))
            keys.add(AEKeyHelper.item("ae2:toggle_bus"))
            keys.add(AEKeyHelper.item("gtladditions:infinity_input_dual_hatch"))
            keys.add(AEKeyHelper.item("gtladditions:me_super_pattern_buffer"))
            keys.add(AEKeyHelper.item("gtladditions:me_super_pattern_buffer_proxy"))
            keys.add(AEKeyHelper.item("gtceu:uv_dual_output_hatch"))
            keys.add(AEKeyHelper.item("gtceu:uv_dual_input_hatch"))
            keys.add(AEKeyHelper.item("gtceu:me_extended_export_buffer"))
            keys.add(AEKeyHelper.item("gtceu:me_extended_async_export_buffer"))
            keys.add(AEKeyHelper.item("gtceu:tag_filter_me_stock_bus_part_machine"))
            keys.add(AEKeyHelper.item("gtceu:me_dual_hatch_stock_part_machine"))
            keys.add(AEKeyHelper.item("gtlcore:fast_infinity_cell"))
            keys.add(AEKeyHelper.item("gtlcore:debug_pattern_test"))
            keys.add(AEKeyHelper.item("gtlcore:pattern_modifier"))
            keys.add(AEKeyHelper.item("expatternprovider:pattern_modifier"))
            keys.add(AEKeyHelper.item("gtlcore:max_storage"))
            keys.add(AEKeyHelper.item("mae2:256x_crafting_accelerator"))
            keys.add(AEKeyHelper.item("expatternprovider:wireless_tool"))
            keys.add(AEKeyHelper.item("minecraft:flint_and_steel"))
            keys.add(AEKeyHelper.item("minecraft:tnt"))

            // ===== 额外列表物品 =====
            keys.add(AEKeyHelper.item("minecraft:yellow_concrete"))
            keys.add(AEKeyHelper.item("minecraft:green_dye"))
            keys.add(AEKeyHelper.item("extendedae_plus:labeled_wireless_transceiver"))
            keys.add(AEKeyHelper.item("minecraft:black_concrete"))
            keys.add(AEKeyHelper.item("minecraft:lime_dye"))
            keys.add(AEKeyHelper.item("minecraft:green_concrete"))
            keys.add(AEKeyHelper.item("minecraft:red_dye"))
            keys.add(AEKeyHelper.item("minecraft:red_concrete"))
            keys.add(AEKeyHelper.item("minecraft:orange_dye"))
            keys.add(AEKeyHelper.item("minecraft:light_blue_concrete"))
            keys.add(AEKeyHelper.item("minecraft:magenta_dye"))
            keys.add(AEKeyHelper.item("minecraft:purple_dye"))
            keys.add(AEKeyHelper.item("minecraft:lime_concrete"))
            keys.add(AEKeyHelper.item("minecraft:light_gray_dye"))
            keys.add(AEKeyHelper.item("minecraft:cyan_dye"))
            keys.add(AEKeyHelper.item("minecraft:magenta_concrete"))
            keys.add(AEKeyHelper.item("minecraft:orange_concrete"))
            keys.add(AEKeyHelper.item("minecraft:blue_dye"))
            keys.add(AEKeyHelper.item("minecraft:pink_dye"))
            keys.add(AEKeyHelper.item("minecraft:purple_concrete"))
            keys.add(AEKeyHelper.item("minecraft:light_blue_dye"))
            keys.add(AEKeyHelper.item("minecraft:gray_concrete"))
            keys.add(AEKeyHelper.item("minecraft:white_dye"))
            keys.add(AEKeyHelper.item("minecraft:light_gray_concrete"))
            keys.add(AEKeyHelper.item("minecraft:blue_concrete"))
            keys.add(AEKeyHelper.item("minecraft:gray_dye"))
            keys.add(AEKeyHelper.item("minecraft:white_concrete"))
            keys.add(AEKeyHelper.item("expatternprovider:ex_pattern_provider_part"))
            keys.add(AEKeyHelper.item("ae2:storage_bus"))
            keys.add(AEKeyHelper.item("minecraft:brown_concrete"))
            keys.add(AEKeyHelper.item("minecraft:black_dye"))
            keys.add(AEKeyHelper.item("minecraft:yellow_dye"))
            keys.add(AEKeyHelper.item("minecraft:pink_concrete"))
            keys.add(AEKeyHelper.item("minecraft:cyan_concrete"))
            keys.add(AEKeyHelper.item("minecraft:brown_dye"))
            keys.add(AEKeyHelper.item("expatternprovider:ex_interface_part"))

            //全新样板总成
            keys.add(AEKeyHelper.item("gtceu:me_stocking_pattern_buffer"))
            keys.add(AEKeyHelper.item("gtceu:me_wildcard_pattern_buffer"))
        }))
})

// ============================================================
// 来源: 产线扭曲者startup_scripts.js
// ============================================================

StartupEvents.registry('item', event => {
    event.create('assembly_line_distorter:qiong_yu_wu_zhi')
        .texture('assembly_line_distorter:item/qiong_yu_wu_zhi')
        .displayName('§d§m穹宇物质')
        .maxStackSize(64)
        .fireResistant();

    const tiers = ["ulv", "lv", "mv", "hv", "ev", "iv", "luv", "zpm", "uv", "uhv", "uev", "uiv", "uxv", "opv", "max"];
    tiers.forEach(tier => {
        event.create(`assembly_line_distorter:qiong_yu_dian_lu_${tier}`)
            .texture('assembly_line_distorter:item/qiong_yu_dian_lu')
            .displayName(`§d§m穹宇电路 (${tier.toUpperCase()})`)
            .maxStackSize(64)
            .fireResistant()
            .tag(`gtceu:circuits/${tier}`);
    });
});

// 来源: 产线扭曲者startup_scripts.js — 按键注册
const $KeyMapping = Java.loadClass("net.minecraft.client.KeyMapping");
const $GLFW = Java.loadClass("org.lwjgl.glfw.GLFW");
const $KeyMappingRegistry = Java.loadClass("dev.architectury.registry.client.keymappings.KeyMappingRegistry");

global.ttwToggleKey = new $KeyMapping(
    "key.kubejs.ttw_toggle",
    $GLFW.GLFW_KEY_K,
    "key.category.kubejs.accelerator"
);

ClientEvents.init(() => {
    $KeyMappingRegistry.register(global.ttwToggleKey);
});