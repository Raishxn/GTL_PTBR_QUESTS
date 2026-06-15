const packed_cell_nbt = (list) => {
    let spiltedlist = list.map(id=>{return id.split('x ')})
    // 使用 Array.map 生成 key 字符串，避免手动循环拼接出错
    let keysNBT = spiltedlist.map(id => {
        return `{
            "#c": "ae2:i",
            id: "${id[1]}"
        }`
    }).join(",")

    // 生成 amounts 数组 [xL, xL, ...]
    let amtsNBT = spiltedlist.map(id => `${id[0]}L`).join(",")

    let finalNBT = `{
        RepairCost: 0,
        amts: [L;${amtsNBT}],
        ic: ${list.length}L,
        internalCurrentPower: 2000000.0d,
        keys: [${keysNBT}]
    }`
    
    return finalNBT
}
ServerEvents.recipes((event) => {
    event.shapeless(Item.of('ae2:portable_item_cell_16k',packed_cell_nbt([
        '16777216x expatternprovider:ex_pattern_provider',
         '1x expatternprovider:ex_pattern_access_part',
        '16777216x expatternprovider:ex_import_bus_part',
           '16777216x expatternprovider:ex_export_bus_part',
            '16x expatternprovider:ex_drive',
             '1x ae2:wireless_access_point',
              '16777216x expatternprovider:wireless_connect',
               '1x ae2:pattern_encoding_terminal',
                '16777216x gtceu:me_input_hatch',
                 '16777216x ae2:capacity_card', 
                 '1x minecraft:flint_and_steel',
                  '1x ae2:wireless_crafting_terminal', 
                  '1x expatternprovider:wireless_ex_pat',
                   '1x ae2wtlib:wireless_pattern_encoding_terminal', 
                   '32x gtceu:ender_pearl_dust', 
                   '16777216x ae2:fuzzy_card', 
                '16777216x minecraft:orange_dye', 
                '16777216x minecraft:light_gray_dye', 
                '16777216x minecraft:light_blue_dye', 
                '16777216x ae2:void_card', 
                '16777216x minecraft:gray_dye', 
                '32x ae2:singularity', 
                '16777216x ae2:basic_card', 
                '16777216x ae2:equal_distribution_card', 
                '16777216x minecraft:magenta_dye', 
                '16777216x ae2:crafting_card', 
                '16777216x ae2:inverter_card', 
                '16777216x ae2:speed_card', 
                '32x ae2:creative_energy_cell', 
                '16777216x ae2:quantum_link', 
                '16777216x ae2:quantum_ring', 
                '16777216x gtceu:me_input_bus', 
                '16777216x expatternprovider:assembler_matrix_glass', 
                '16777216x ae2:crafting_terminal', 
                '16777216x expatternprovider:ex_interface',
                '16777216x ae2:fluix_smart_cable',
                '16777216x ae2:fluix_glass_cable',
                '16777216x ae2:fluix_covered_dense_cable',
                '16777216x ae2:fluix_smart_dense_cable', 
                '16777216x ae2:blank_pattern', 
                '16777216x minecraft:pink_dye', 
                '16777216x minecraft:purple_dye', 
                '16777216x minecraft:red_dye', 
                '16777216x ae2:cable_anchor', 
                '16777216x ae2:redstone_card', 
                '16777216x ae2wtlib:quantum_bridge_card', 
                '16777216x ae2:logic_processor', 
                '16777216x ae2:calculation_processor', 
                '16777216x ae2:engineering_processor', 
                '16777216x minecraft:black_dye', 
                '16777216x minecraft:yellow_dye', 
                '16777216x minecraft:green_dye', 
                '16777216x minecraft:blue_dye', 
                '16777216x expatternprovider:assembler_matrix_crafter', 
                '16777216x expatternprovider:assembler_matrix_wall', 
                '16777216x expatternprovider:assembler_matrix_pattern', 
                '16777216x expatternprovider:assembler_matrix_frame', 
                '16777216x expatternprovider:assembler_matrix_speed', 
                '32x minecraft:tnt', 
                '16777216x minecraft:lime_dye', 
                '16777216x ae2:advanced_card', 
                '16777216x minecraft:cyan_dye', 
                '16777216x minecraft:white_dye', 
                '16777216x ae2:quartz_fiber',
                '16777216x expatternprovider:ex_io_port', 
                '16777216x ae2:level_emitter', 
                '16777216x ae2:toggle_bus', 
                '16777216x gtladditions:infinity_input_dual_hatch', 
                '16777216x gtladditions:me_super_pattern_buffer', 
                '16777216x gtladditions:me_super_pattern_buffer_proxy', 
                '16777216x gtceu:uv_dual_output_hatch', 
                '16777216x gtceu:uv_dual_input_hatch', 
                '16777216x gtceu:me_extended_export_buffer', 
                '16777216x gtceu:me_extended_async_export_buffer', 
                '16777216x gtceu:tag_filter_me_stock_bus_part_machine', 
                '16777216x gtceu:me_dual_hatch_stock_part_machine', 
                '1x gtlcore:fast_infinity_cell', 
                '1x gtlcore:debug_pattern_test', 
                '1x gtlcore:pattern_modifier', 
                '1x expatternprovider:pattern_modifier',
                '32x gtlcore:max_storage', 
                '32x mae2:256x_crafting_accelerator',
                '1x expatternprovider:wireless_tool'])),
    ['ae2:fluix_axe'])
    const bandisassemblyitem = ['me_super_pattern_buffer_proxy', 
        'me_super_pattern_buffer', 
        'infinity_input_dual_hatch']
    const bandisassemblyitem2 = ['me_extended_export_buffer', 
        'me_extended_async_export_buffer', 
        'uv_dual_output_hatch', 
        'uv_dual_input_hatch', 
        'me_dual_hatch_stock_part_machine', 
        'me_input_hatch', 'me_input_bus']
    bandisassemblyitem.forEach(i=>{
        event.remove({id:'gtladditions:disassembly/'+i})
    })
    bandisassemblyitem2.forEach(i=>{
        event.remove({id:'gtceu:disassembly/'+i})
    })
    event.remove({id:'ae2:tools/fluix_axe'})
})