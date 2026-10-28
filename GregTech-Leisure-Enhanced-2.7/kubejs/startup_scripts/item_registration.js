// priority: 94
// 注册电路、材料、脆弱工具、功能物品和盔甲；各列表保留原注册顺序。
StartupEvents.registry("item", event => {
    // 批量创建只使用默认属性的物品；数组顺序就是注册顺序。
    const createItems = names => names.forEach(name => event.create(name))
    // 5 系高级电路：每系 处理器/组装/计算机/主机/电路板/印刷电路板 + 5 种贴片元件
    const circuits = ["bioware", "optical", "exotic", "cosmic", "supracausal"]
    circuits.forEach(circuit => {
        ;["processor", "assembly", "computer", "mainframe", "circuit_board", "printed_circuit_board"]
            .forEach(part => event.create(circuit + "_" + part))
        ;["capacitor", "diode", "resistor", "transistor", "inductor"]
            .forEach(part => event.create("smd_" + part + "_" + circuit))
    })
    // 后 4 系额外带 RAM 晶圆/芯片
    circuits.slice(1, 5).forEach((circuit) => {
        event.create(circuit + "_ram_wafer")
        event.create(circuit + "_ram_chip")
    })

    // UHV~MAX 电压线圈
    const voltageCoilTiers = ["uhv", "uev", "uiv", "uxv", "opv", "max"]
    voltageCoilTiers.forEach((grade) => {
        event.create(grade + "_voltage_coil")
    })

    // 超时电路 ULV~MAX（全部挂 GT 电路标签）
    var tiers = ["ulv", "lv", "mv", "hv", "ev", "iv", "luv", "zpm", "uv", "uhv", "uev", "uiv", "uxv", "opv", "max"]
    tiers.forEach((suprachronal) => {
        event.create("suprachronal_" + suprachronal).tag("gtceu:circuits/" + suprachronal)
    })
    // 谐振电路 ULV~UIV，保留原十二个等级
    tiers.slice(0, 12).forEach((magneto_resonatic) => {
        event.create("circuit_resonatic_" + magneto_resonatic).tag("gtceu:circuits/" + magneto_resonatic)
    })
    // 通用电路板 ULV~MAX（中文名+提示）
    tiers.forEach((universal_circuit) => {
        event.create(universal_circuit + "_universal_circuit")
            .tag("gtceu:circuits/" + universal_circuit)
            .displayName("Placa de Circuito Universal " + universal_circuit.toUpperCase())
            .tooltip("§7Uma placa de circuito universal")
    })

    // 太空无人机 MK1-6
    for (let i = 1; i <= 6; i++) event.create("space_drone_mk" + i)

    // 矿脉精华（每矿脉一个，统一挂 kubejs:vein_essence 标签）
    const veins = [
        "apatite_vein", "banded_iron_vein", "bauxite_vein_end", "beryllium_vein", "cassiterite_vein",
        "certus_quartz", "coal_vein", "copper_tin_vein", "copper_vein", "diamond_vein", "galena_vein",
        "garnet_tin_vein", "garnet_vein", "iron_vein", "lapis_vein", "lubricant_vein", "magnetite_vein_end",
        "magnetite_vein_ow", "manganese_vein", "manganese_vein_ow", "mica_vein", "mineral_sand_vein",
        "molybdenum_vein", "monazite_vein", "naquadah_vein", "nether_quartz_vein", "nickel_vein", "oilsands_vein",
        "olivine_vein", "pitchblende_vein_end", "redstone_vein", "redstone_vein_ow", "saltpeter_vein", "salts_vein",
        "sapphire_vein", "scheelite_vein", "sheldonite_vein", "sulfur_vein", "tetrahedrite_vein", "topaz_vein"
    ]
    veins.forEach((vein) => {
        event.create(vein + "_essence").texture("kubejs:item/" + vein).tag("kubejs:vein_essence")
    })
    event.create("space_essence")

    // 脆弱工具（产线撕裂遗留功能，保留：无配方，创造/任务获取）
    const fragileTools = [
        { tool: 'crowbar', name: 'Pé de Cabra', tag: 'crowbars' },
        { tool: 'hammer', name: 'Martelo de Forja', tag: 'hammers' },
        { tool: 'mallet', name: 'Malho Macio', tag: 'mallets' },
        { tool: 'saw', name: 'Serra', tag: 'saws' },
        { tool: 'screwdriver', name: 'Chave de Fenda', tag: 'screwdrivers' },
        { tool: 'wire_cutter', name: 'Alicate Corta-Fio', tag: 'wire_cutters' },
        { tool: 'wrench', name: 'Chave Inglesa', tag: 'wrenches' },
        { tool: 'file', name: 'Lima', tag: 'files' },
        { tool: 'knife', name: 'Faca', tag: 'knives' },
        { tool: 'mortar', name: 'Almofariz', tag: 'mortars' }
    ]
    fragileTools.forEach(i => {
        event.create('fragile_tool:fragile_' + i.tool)
            .texture('thetornproductionline:item/fragile_' + i.tool)
            .tag("forge:tools/" + i.tag)
            .displayName(i.name + ' Frágil')
            // 附带食物属性：随时可吃，回满饥饿/饱和并给 10 分钟饱和效果
            .food(food => {
                food.hunger(20).saturation(20.0).alwaysEdible()
                    .effect('minecraft:saturation', 6000, 0, 1.0)
            })
    })

    // 宇宙碎片（私货版物品：奇点裂解残留物）
    event.create('cosmic_fragment')
        .displayName('§cFrag§emento §aCós§bmico')
        .tooltip(`§d✦ §eO brilho remanescente da fissão da singularidade §d✦
§7O universo explodiu do vazio absoluto,
§7este fragmento é a testemunha do §cinício§7.
§8Contendo os segredos anteriores ao nascimento de todas as coisas`)
        .modelJson({
            parent: 'minecraft:item/generated',
            textures: { layer0: 'sihuobancaizhi:item/yuzhousuipian' }
        });

    // 工具与高阶加工材料
    event.create("bedrock_destroyer", "pickaxe")
    createItems([
        "lepton_trap_crystal", "charged_lepton_trap_crystal", "quantum_anomaly", "hassium_seed_crystal",
        "raw_imprinted_resonatic_circuit_board", "imprinted_resonatic_circuit_board", "rotating_transparent_surface",
        "electron_source", "essence", "essence_seed", "nuclear_star", "unstable_star"
    ])
    event.create("hyperdimensional_drone").unstackable()
    for (let i = 1; i <= 5; i++) event.create("precision_circuit_assembly_robot_mk" + i)
    createItems([
        "scrap", "scrap_box", "nuclear_waste", "resonating_gem", "echobone", "netherite_rod", "long_netherite_rod",
        "magnetic_netherite_rod", "magnetic_long_netherite_rod"
    ])
    // 场形状（锭/球）：压模用，不可堆叠
    event.create("ingot_field_shape").texture("gtceu:item/ingot_casting_mold").unstackable()
    event.create("ball_field_shape").texture("gtceu:item/ball_casting_mold").unstackable()
    // 等离子约束单元系列
    createItems([
        "plasma_containment_cell", "rhenium_plasma_containment_cell", "actinium_superhydride_plasma_containment_cell"
    ])
    // 三维世界数据（数据棒贴图）
    event.create("overworld_data").texture("gtceu:item/data_stick")
    event.create("nether_data").texture("gtceu:item/data_stick")
    event.create("end_data").texture("gtceu:item/data_stick")
    // 生物/光学路线原料
    createItems([
        "dragon_stem_cells", "dragon_cells", "bioware_boule", "bioware_chip", "bioware_processing_core",
        "biological_cells", "optical_soc", "optical_soc_containment_housing", "optical_slice",
        "optical_processing_core", "optical_wafer", "photon_carrying_wafer", "raw_photon_carrying_wafer",
        "exotic_processing_core", "cosmic_processing_core", "supracausal_processing_core"
    ])
    event.create("non_linear_optical_lens").texture("gtceu:item/yellow_glass_lens")
    createItems([
        "periodically_poled_lithium_niobate_boule", "highly_reflective_mirror", "low_frequency_laser",
        "medium_frequency_laser", "high_frequency_laser", "red_halide_lamp", "green_halide_lamp", "blue_halide_lamp",
        "ballast", "empty_laser_cooling_container", "high_precision_crystal_soc", "bose_einstein_cooling_container",
        "laser_cooling_unit", "laser_diode", "magnetic_trap", "rydberg_spinorial_assembly", "x_ray_laser",
        "cryogenic_interface", "exotic_wafer", "exotic_chip", "x_ray_waveguide", "x_ray_mirror_plate",
        "cosmic_processing_unit_core", "ultrashort_pulse_laser", "diffractor_grating_mirror",
        "grating_lithography_mask", "lithography_mask", "photocoated_hassium_boule", "photocoated_hassium_wafer",
        "time_dilation_containment_unit", "neutron_plasma_containment_cell", "neutronium_sphere",
        "charged_triplet_neutronium_sphere", "triplet_neutronium_sphere", "contained_high_density_protonic_matter",
        "extremely_durable_plasma_cell", "dense_neutron_plasma_cell", "cosmic_neutron_plasma_cell",
        "crystalmatrix_plasma_containment_cell", "quantumchromodynamic_protective_plating",
        "draconiumawakened_plasma_containment_cell", "chaos_containment_unit", "cosmic_mesh_containment_unit",
        "microwormhole_generator", "graviton_transducer", "contained_reissner_nordstrom_singularity",
        "contained_kerr_newmann_singularity", "contained_kerr_singularity", "contained_exotic_matter",
        "macrowormhole_generator", "stabilized_wormhole_generator", "topological_manipulator_unit",
        "relativistic_spinorial_memory_system", "nuclear_clock", "scintillator", "scintillator_crystal",
        "manifold_oscillatory_power_cell", "recursively_folded_negative_space", "eigenfolded_kerr_manifold",
        "ctc_computational_unit_container", "ctc_computational_unit", "ctc_guidance_unit",
        "highly_dense_polymer_plate", "space_probe_mk1", "space_probe_mk2", "space_probe_mk3", "hypercube",
        "annihilation_constrainer"
    ])
    // 反物质燃料棒（4 种，共用贴图）
    ;["neutronium", "draconium", "cosmicneutronium", "infinity"].forEach(material => {
        event.create(material + "_antimatter_fuel_rod").texture("kubejs:item/antimatter_fuel_rod")
    })
    createItems([
        "solar_light_splitter", "create_ultimate_battery", "suprachronal_mainframe_complex",
        "zero_point_module_fragments"
    ])
    // 控制电路（ULV~EV 五级）
    createItems([
        "basic_control_circuit", "advanced_control_circuit", "elite_control_circuit", "ultimate_control_circuit",
        "ultima_control_circuit"
    ])
    // 海藻/蒲公英提取物、凯夫拉
    createItems([
        "tcetieseaweedextract", "tcetiedandelions", "woven_kevlar", "kevlar_fiber", "infused_breath",
        "warped_ender_pearl", "chaos_shard", "cosmic_fabric"
    ])
    // 龙系核心
    createItems([
        "draconic_core", "wyvern_core"
    ])
    event.create("awakened_core").glow(true)
    event.create("chaotic_core").glow(true)
    event.create("wyvern_energy_core")
    event.create("draconic_energy_core").glow(true)
    event.create("chaotic_energy_core").glow(true)
    createItems([
        "draconium_dust", "dragon_heart"
    ])
    event.create("stabilizer_core").glow(true)
    event.create("dragon_stabilizer_core").glow(true)
    // 晶圆系列
    createItems([
        "rutherfordium_neutronium_boule", "rutherfordium_neutronium_wafer", "taranium_boule", "taranium_wafer",
        "prepared_cosmic_soc_wafer", "cosmic_soc_wafer", "cosmic_soc"
    ])
    // 时间扭曲器（耐久 2000，不可堆叠，发光）
    event.create("time_twister").maxDamage(2000).unstackable().glow(true)
    event.create("time_twister_wireless").rarity("epic").unstackable().glow(true).texture("kubejs:item/time_twister")
    // nm/pm/fm 晶圆与芯片
    createItems([
        "nm_wafer", "nm_chip", "pm_wafer", "pm_chip", "fm_wafer", "fm_chip", "fullerene_polymer_matrix_soft_tubing",
        "fullerene_polymer_matrix_fine_tubing", "dust_blizz", "dust_cryotheum"
    ])
    // 三套高级盔甲（头盔/胸甲/护腿/靴子）
    ;["magnetohydrodynamicallyconstrainedstarmatter", "fermium", "space_fermium"].forEach(material => {
        ["helmet", "chestplate", "leggings", "boots"].forEach(part => {
            const armor = event.create(material + "_" + part, part).tier(material)
            if (material === "magnetohydrodynamicallyconstrainedstarmatter") armor.tag("gtceu:ppe_armor")
        })
    })
    // 其他功能物品
    createItems([
        "reinforced_echo_shard", "bedrock_drill", "memory_foam_block", "graphene_iron_plate",
        "insulation_wire_assembly", "aerographene"
    ])
    // 命令方块核心三件 + 命令魔杖
    createItems([
        "command_block_core", "chain_command_block_core", "repeating_command_block_core"
    ])
    event.create("command_wand").unstackable()
    createItems([
        "two_way_foil", "hyper_stable_self_healing_adhesive", "black_body_naquadria_supersolid", "heartofthesmogus"
    ])
    // 9 种物质
    createItems([
        "void_matter", "temporal_matter", "proto_matter", "omni_matter", "kinetic_matter", "essentia_matter",
        "dark_matter", "corporeal_matter", "amorphous_matter", "pellet_antimatter", "dyson_swarm_module",
        "glacio_spirit", "timepiece", "entangled_singularity", "cosmic_singularity", "spacetime_catalyst",
        "eternity_catalyst", "precision_steam_mechanism"
    ])
    // 16 个聚合奇点
    for (let i = 0; i < 16; i++) event.create("combined_singularity_" + i)
    createItems([
        "inverter", "giga_chad", "reactor_fuel_rod", "tungsten_carbide_reactor_fuel_rod"
    ])
    // 反应堆燃料棒：简单/双/四 + 耗尽版（铀/钍/MOX/硅岩）
    ;["uranium", "thorium", "mox", "naquadah"].forEach(material => {
        ;["simple", "dual", "quad"].forEach(size => event.create("reactor_" + material + "_" + size))
        ;["simple", "dual", "quad"].forEach(size => event.create("depleted_reactor_" + material + "_" + size))
    })
    // 研磨球（耐久消耗品）
    event.create("grindball_soapstone").unstackable().maxDamage(50)
    event.create("grindball_aluminium").unstackable().maxDamage(100)
    // 辉电路（彩蛋物品）
    event.create("hui_circuit_1").tooltip(Component.literal("§793015-T FLOPS"))
    event.create("hui_circuit_2").tooltip(Component.literal("§776M Unidades de Processamento"))
    event.create("hui_circuit_3").tooltip(Component.literal("§7Algoritmo RSA Inválido"))
    event.create("hui_circuit_4").tooltip(Component.literal("§756º Primo de Mersenne"))
    event.create("hui_circuit_5").tooltip(Component.literal("§7Paradoxo"))
    event.create("special_ceramics")
    // 鱼大 9 部件
    createItems([
        "fishbig_body", "fishbig_hade", "fishbig_hair", "fishbig_lhand", "fishbig_lleg", "fishbig_rhand",
        "fishbig_rleg", "fishbig_fabric", "fishbig_frame"
    ])
})
