// priority: 95
// 本文件按功能保存配方阶段，实际执行顺序统一由配方入口管理。

// 移除被整合包替代的合成、拆解、回收和材料冲突配方。
global.gtlPack.register("recipe_removals", event => {
    [
        "gtceu:extractor/seed_oil_from_beetroot",
        "gtceu:extractor/seed_oil_from_melon",
        "gtceu:extractor/seed_oil_from_pumpkin",
        "gtceu:extractor/seed_oil_from_torchflower",
        // 原版标签通用配方（每颗 10mB），已被上述批量配方取代
        "gtceu:extractor/seed_oil_from_tag_seeds"
    ].forEach(id => event.remove({ id: id }))
    event.remove({ id: "minecraft:double_compressed_crafting_table" })
    event.remove({ id: "minecraft:compressed_crafting_table" })
    event.remove({ id: "minecraft:crystal_matrix" })
    event.remove({ id: "minecraft:neutron_pile" })
    event.remove({ id: "minecraft:neutron_pile_from_ingots" })
    event.remove({ id: "minecraft:neutron_ingot_from_nuggets" })
    event.remove({ id: "minecraft:neutron_ingot_from_neutron_block" })
    event.remove({ id: "minecraft:neutron_nugget" })
    event.remove({ id: "minecraft:neutron" })
    event.remove({ id: "avaritia:diamond_lattice" })
    event.remove({ id: "avaritia:extreme_crafting_table" })
    const adAstraIds = [
        "ad_astra:compressor",
        "ad_astra:coal_generator",
        "ad_astra:etrionic_blast_furnace",
        "ad_astra:fuel_refinery",
        "ad_astra:solar_panel",
        "ad_astra:water_pump",
        "ad_astra:cryo_freezer",
        "ad_astra:fan",
        "ad_astra:engine_frame",
        "ad_astra:steel_engine",
        "ad_astra:desh_engine",
        "ad_astra:ostrum_engine",
        "ad_astra:calorite_engine",
        "ad_astra:calorite_tank",
        "ad_astra:ostrum_tank",
        "ad_astra:desh_tank",
        "ad_astra:steel_tank",
        "ad_astra:rocket_fin",
        "ad_astra:rocket_nose_cone",
        "ad_astra:smelting/desh_ingot_from_smelting_deepslate_desh_ore",
        "ad_astra:smelting/desh_ingot_from_smelting_moon_desh_ore",
        "ad_astra:smelting/desh_ingot_from_smelting_raw_desh",
        "ad_astra:smelting/ostrum_ingot_from_smelting_deepslate_ostrum_ore",
        "ad_astra:smelting/ostrum_ingot_from_smelting_mars_ostrum_ore",
        "ad_astra:smelting/ostrum_ingot_from_smelting_raw_ostrum",
        "ad_astra:smelting/calorite_ingot_from_smelting_deepslate_calorite_ore",
        "ad_astra:smelting/calorite_ingot_from_smelting_venus_calorite_ore",
        "ad_astra:smelting/calorite_ingot_from_smelting_raw_calorite",
        "ad_astra:smelting/ice_shard_from_smelting_deepslate_ice_shard_ore",
        "ad_astra:smelting/ice_shard_from_smelting_glacio_ice_shard_ore",
        "ad_astra:smelting/ice_shard_from_smelting_mars_ice_shard_ore",
        "ad_astra:smelting/ice_shard_from_smelting_moon_ice_shard_ore",
        "ad_astra:blasting/desh_ingot_from_blasting_deepslate_desh_ore",
        "ad_astra:blasting/desh_ingot_from_blasting_moon_desh_ore",
        "ad_astra:blasting/desh_ingot_from_blasting_raw_desh",
        "ad_astra:blasting/ostrum_ingot_from_blasting_deepslate_ostrum_ore",
        "ad_astra:blasting/ostrum_ingot_from_blasting_mars_ostrum_ore",
        "ad_astra:blasting/ostrum_ingot_from_blasting_raw_ostrum",
        "ad_astra:blasting/calorite_ingot_from_blasting_deepslate_calorite_ore",
        "ad_astra:blasting/calorite_ingot_from_blasting_venus_calorite_ore",
        "ad_astra:blasting/calorite_ingot_from_blasting_raw_calorite",
        "ad_astra:blasting/ice_shard_from_blasting_deepslate_ice_shard_ore",
        "ad_astra:blasting/ice_shard_from_blasting_glacio_ice_shard_ore",
        "ad_astra:blasting/ice_shard_from_blasting_mars_ice_shard_ore",
        "ad_astra:blasting/ice_shard_from_blasting_moon_ice_shard_ore",
        "ad_astra:steel_block",
        "ad_astra:energizer",
        "ad_astra:steel_cable",
        "ad_astra:desh_cable",
        "ad_astra:cable_duct",
        "ad_astra:steel_ingot",
        "ad_astra:nasa_workbench"
    ]
    adAstraIds.forEach(id => event.remove({ id: id }))
    event.remove({ type: "ad_astra:compressing" })
    event.remove({ type: "ad_astra:alloying" })
    event.remove({ type: "ad_astra:cryo_freezing" })
    event.remove({ type: "ad_astra:nasa_workbench" })
    event.remove({ type: "ad_astra:oxygen_loading" })
    event.remove({ type: "ad_astra:refining" })
    event.remove({ id: "ae2:misc/deconstruction_certus_quartz_block" })
    event.remove({ id: "ae2:misc/fluixpearl" })
    event.remove({ id: "ae2:network/blocks/controller" })
    event.remove({ id: "ae2:network/crafting/patterns_blank" })
    event.remove({ id: "ae2:network/parts/export_bus" })
    event.remove({ id: "ae2:network/parts/import_bus" })
    event.remove({ id: "ae2:network/wireless_part" })
    event.remove({ id: "ae2:materials/annihilationcore" })
    event.remove({ id: "ae2:materials/formationcore" })
    event.remove({ id: "ae2:materials/advancedcard" })
    event.remove({ id: "ae2:materials/basiccard" })
    event.remove({ id: "ae2:network/crafting/cpu_crafting_unit" })
    event.remove({ id: "expatternprovider:fishbig" })
    event.remove({ id: "expatternprovider:silicon_block" })
    event.remove({ id: "expatternprovider:silicon_block_disassembler" })
    event.remove({ input: "expatternprovider:silicon_block" })
    event.remove({ output: "expatternprovider:silicon_block" })
    event.remove({ id: "minecraft:netherite_ingot" })
    event.remove({ id: "minecraft:ender_eye" })
    event.remove({ id: "minecraft:netherite_scrap" })
    event.remove({ id: "minecraft:netherite_scrap_from_blasting" })
    event.remove({ mod: 'useless_mod' })
    const laserTiers = ['low', 'medium', 'high']
    laserTiers.forEach(type => event.remove({ id: `kubejs:assembler/${type}_frequency_laser` }))
    const worldDims = ['overworld', 'nether', 'end']
    worldDims.forEach(dim => event.remove({ id: `kubejs:world_data_scanner/${dim}_data` }))
    event.remove({ type: 'gtceu:forge_hammer', output: '#forge:plates' })
    event.remove({ id: /gtceu:forge_hammer\/ingot_to_dust\/.*/ })
    const REMOVE_TYPES = ['gtceu:disassembly', 'gtceu:disassembler', 'gtceu:scrap', 'gtceu:recycling']
    REMOVE_TYPES.forEach(type => event.remove({ type: type }))
    ;
    [/.*disassembly.*/, /.*disassembler.*/, /.*disassemble.*/].forEach(regex => event.remove({ id: regex }))
    const REMOVE_OUTPUTS = [
        'extendedae_plus:virtual_crafting_card',
        'extendedae_plus:entity_speed_ticker',
        'extendedae_plus:entity_speed_card',
        'mae2:64x_crafting_accelerator',
        'mae2:16x_crafting_accelerator',
        'gtceu:disassembly',
        'mae2:4x_crafting_accelerator',
        'extendedae_plus:1024x_crafting_accelerator',
        'extendedae_plus:256x_crafting_accelerator',
        'extendedae_plus:64x_crafting_accelerator',
        'extendedae_plus:16x_crafting_accelerator',
        'extendedae_plus:4x_crafting_accelerator',
        'gtladditions:suprachronal_assembly_line/infinity_input_dual_hatch',
        'gtceu:research_station/1_x_gtladditions_super_input_dual_hatch',
        // 旧处理厂系列（已由 gtl_enhancedcore:xxx_plus 替代，JEI 同步隐藏）
        'gtceu:processing_plant',
        'gtceu:assemble_plant',
        'gtceu:separated_plant',
        'gtceu:mixed_plant'
    ]
    REMOVE_OUTPUTS.forEach(output => event.remove({ output: output }))
    const REMOVE_SPECIFIC_IDS = [
        'gtceu:research_station/1_x_gtceu_dissolving_tank',
        'gtladditions:barnarda_data'
        // gtladditions 内置光子矩阵刻蚀透镜配方，已在 KJS 重建为电路版
        ,'gtladditions:photon_matrix_etch/raw_photon_carrying_wafer'
        ,'gtladditions:photon_matrix_etch/nm_wafer'
        ,'gtladditions:photon_matrix_etch/pm_wafer'
        ,'gtladditions:photon_matrix_etch/fm_wafer'
        ,'gtladditions:photon_matrix_etch/prepared_cosmic_soc_wafer'
        ,'gtladditions:photon_matrix_etch/high_precision_crystal_soc'
        ,'gtladditions:photon_matrix_etch/fullerene_dust'
        ,'gtladditions:photon_matrix_etch/lanthanum_embedded_fullerene_dust'
        ,'avaritia:bedrock_from_deepslate'
        ,'gtladditions:distort/polycyclic_aromatic_mixture_dust'
        ,'gtceu:centrifuge/heavy_paramagnetic_residues_input'
        ,'gtceu:distillation_tower/distill_water_large'
    ]
    REMOVE_SPECIFIC_IDS.forEach(id => event.remove({ id: id }))
    event.remove({ id: 'gtceu:shaped/generator_array' })
    event.remove({ type: "gtceu:electrolyzer", input: "gtceu:platinum_group_sludge_dust" })
    const BAD_PARTS = ['_plate', '_double_plate', '_dense_plate', '_rod', '_long_rod', '_bolt', '_screw', '_ring', '_spring', '_gear', '_small_gear', '_wire', '_fine_wire', '_cable', '_rotor', '_turbine_blade', '_frame', '_pipe', '_fluid_pipe', '_item_pipe', '_foil', '_block', '_nugget']
    const WHITELIST = ['ingot', 'dust', 'gem', 'raw', 'ore', 'gtceu:kevlar_plate', 'gtceu:reinforced_epoxy_resin_plate']
    const BAD_PART_REGEX = new RegExp(`(${BAD_PARTS.join('|')})$`)
    Ingredient.all.getItemIds().forEach(id => {
        const item = id.toString()
        if (WHITELIST.some(w => item.includes(w))) return
        if (BAD_PART_REGEX.test(item)) {
            event.remove({ type: 'gtceu:extractor', input: item })
        }
    })
})
