// priority: 97
// 注册高级线圈、星球岩石、机壳与功能方块；保留原属性、标签和纹理。
StartupEvents.registry("block", event => {
    // 8 种高级线圈方块：温度 / 等级 / 阶数依次递增
    const coils = [
        ["abyssalalloy", "12600", "16", "8"],
        ["titansteel", "14400", "32", "8"],
        ["adamantine", "16200", "32", "9"],
        ["naquadriatictaranium", "18900", "64", "9"],
        ["starmetal", "21600", "64", "9"],
        ["infinity", "36000", "128", "9"],
        ["hypogen", "62000", "256", "9"],
        ["eternity", "96000", "512", "9"]
    ]
    coils.forEach((coil) => {
        event.create(coil[0] + "_coil_block", "gtceu:coil")
            .texture("kubejs:block/" + coil[0] + "_coil_block")
            .temperature(coil[1])
            .energyDiscount(8)
            .level(coil[2])
            .tier(coil[3])
            .coilMaterial(() => GTMaterials.get(coil[0]))
            .tagBlock("mineable/pickaxe")
            .tagBlock("forge:mineable/wrench")
            .hardness(5)
            .requiresTool(true)
            .soundType("metal")
            .mapColor("metal")
            .noValidSpawns(true)
    })

    // 星球岩石方块（泰坦/冥王/埃欧/木卫三/土卫二/谷神星），供矿脉生成使用
    ;[
        "titanstone", "plutostone", "iostone", "ganymedestone", "enceladusstone", "ceresstone"
    ].forEach(name => {
        event.create(name, "basic")
            .noValidSpawns(true).soundType("stone").mapColor("stone")
            .tagBlock("mineable/pickaxe").requiresTool(true)
    })

    // 星球沙/灰（用锹挖，无需正确工具判定）
    ;[
        "titangrunt", "plutogrunt", "ioash", "ganymedegrunt", "ceresgrunt"
    ].forEach(name => {
        event.create(name, "basic")
            .noValidSpawns(true).soundType("sand").mapColor("sand")
            .tagBlock("mineable/shovel")
    })

    // 通用方块：金属质感、镐/扳手可挖（是否需要正确工具由调用处决定）
    const basicMetal = (name) => event.create(name, "basic")
        .noValidSpawns(true).soundType("metal").mapColor("metal")
        .tagBlock("mineable/pickaxe").tagBlock("forge:mineable/wrench")

    // 统一设置上下纹理与四个侧面；底面可单独覆盖。
    const faces = (block, top, side, bottom) => block
        .texture("up", top).texture("down", bottom === undefined ? top : bottom)
        .texture("north", side).texture("south", side)
        .texture("east", side).texture("west", side)

    // 能量/电荷类方块
    ;[
        "naquadria_charge", "leptonic_charge", "quantum_chromodynamic_charge"
    ].forEach(name => basicMetal(name).requiresTool(true))
    basicMetal("magic_core").requiresTool(true).lightLevel(2).textureAll("gtceu:block/casings/magic/absorber/active/side")
    basicMetal("annihilate_core").requiresTool(true).lightLevel(4)
    ;[
        "neutronium_pipe_casing", "neutronium_gearbox", "laser_cooling_casing",
        "spacetime_compression_field_generator", "dimensional_bridge_casing"
    ].forEach(name => basicMetal(name).requiresTool(true))

    // 特例：铀线圈（低温线圈，恒星锻炉用）
    event.create("uruium_coil_block", "gtceu:coil")
        .texture("kubejs:block/uruium_coil_block")
        .hardness(5).temperature(273).energyDiscount(1).level(1).tier(1)
        .coilMaterial(() => GTMaterials.get("uruium"))
        .tagBlock("mineable/pickaxe").tagBlock("forge:mineable/wrench").requiresTool(true)
        .soundType("metal").mapColor("metal").noValidSpawns(true)

    // 结构/机壳类方块
    ;[
        "dimensional_stability_casing", "machine_casing_circuit_assembly_line"
    ].forEach(name => basicMetal(name).requiresTool(true))
    basicMetal("high_strength_concrete").requiresTool(true).soundType("stone")
    faces(basicMetal("space_elevator_internal_support").requiresTool(true)
        .textureAll("gtlcore:block/structure"),
        "gtlcore:block/structure", "kubejs:block/internal_support")

    // 变异木（四面树皮纹理）
    faces(event.create("variation_wood", "basic")
        .noValidSpawns(true).soundType("wood").mapColor("wood")
        .textureAll("kubejs:block/variation_wood_top"),
        "kubejs:block/variation_wood_top", "kubejs:block/variation_wood")

    // 特殊功能方块
    basicMetal("essence_block").requiresTool(true)
    basicMetal("shining_obsidian").requiresTool(true).resistance(100).hardness(80).lightLevel(2)
    basicMetal("ender_obsidian").requiresTool(true).resistance(100).hardness(80).lightLevel(12)
    basicMetal("aggregatione_core").requiresTool(true)
    basicMetal("infused_obsidian").requiresTool(true).resistance(100).hardness(100).lightLevel(12)
    basicMetal("draconium_block_charged").requiresTool(true).resistance(100).hardness(100)
    basicMetal("accelerated_pipeline").requiresTool(true)
    faces(basicMetal("module_base").requiresTool(true)
        .textureAll("gtlcore:block/structure"),
        "gtlcore:block/structure", "kubejs:block/high_strength_concrete", "kubejs:block/high_strength_concrete")
    ;[
        "module_connector", "dimension_creation_casing", "machine_casing_grinding_head", "create_aggregatione_core",
        "command_block_broken", "chain_command_block_broken", "create_hpca_component"
    ].forEach(name => basicMetal(name).requiresTool(true))
    basicMetal("force_field_glass").requiresTool(true).defaultTranslucent()
    ;[
        "spacetime_assembly_line_unit", "spacetime_assembly_line_casing", "hollow_casing"
    ].forEach(name => basicMetal(name).requiresTool(true))
    // 分子线圈：原版未要求正确工具
    faces(basicMetal("molecular_coil")
        .textureAll("kubejs:block/molecular_coil_top"),
        "kubejs:block/molecular_coil_top", "kubejs:block/molecular_coil")
    basicMetal("containment_field_generator").requiresTool(true)
    basicMetal("dyson_control_casing").requiresTool(true).textureAll("gtlcore:block/space_elevator_mechanical_casing")
    ;[
        "dyson_control_toroid", "dyson_deployment_casing", "dyson_deployment_core"
    ].forEach(name => basicMetal(name).requiresTool(true))
    // 戴森球接收外壳/部署磁体：原版未要求正确工具
    faces(basicMetal("dyson_receiver_casing")
        .textureAll("kubejs:block/dyson_receiver_casing"),
        "kubejs:block/dyson_receiver_casing", "kubejs:block/dyson_receiver_casing_side")
    faces(basicMetal("dyson_deployment_magnet")
        .textureAll("kubejs:block/dyson_deployment_magnet"),
        "kubejs:block/dyson_deployment_magnet", "kubejs:block/dyson_deployment_magnet_side")
    ;[
        "reactor_core", "steam_assembly_block"
    ].forEach(name => basicMetal(name).requiresTool(true))

    // 巴纳德木全套（硬度 100；原版除树叶外均未要求正确工具）
    faces(event.create("barnarda_log", "basic")
        .noValidSpawns(true).hardness(100).soundType("wood").mapColor("wood").tagBlock("mineable/axe")
        .texture("particle", "kubejs:block/barnarda_log_side"),
        "kubejs:block/barnarda_log_top", "kubejs:block/barnarda_log_side")
    event.create("barnarda_leaves", "basic")
        .noValidSpawns(true).hardness(100).defaultTranslucent()
        .soundType("azalea_leaves").mapColor("leaves").tagBlock("mineable/hoe").requiresTool(true)
    event.create("barnarda_wood", "basic")
        .noValidSpawns(true).hardness(100).soundType("wood").mapColor("wood").tagBlock("mineable/axe")
        .textureAll("kubejs:block/barnarda_log_side")
    ;[
        ["planks", "basic"], ["stairs", "stairs"], ["slab", "slab"], ["fence", "fence"],
        ["fence_gate", "fence_gate"], ["pressure_plate", "pressure_plate"], ["button", "button"]
    ].forEach(([name, type]) => {
        event.create("barnarda_" + name, type)
            .noValidSpawns(true).soundType("wood").hardness(100).mapColor("wood").tagBlock("mineable/axe")
    })

    // 管道/机件类方块
    // 加速管道：原版未要求正确工具
    faces(basicMetal("speeding_pipe")
        .texture("particle", "kubejs:block/speeding_pipe_side"),
        "kubejs:block/speeding_pipe_top", "kubejs:block/speeding_pipe_side")
    ;[
        "restraint_device", "inconel_625_casing", "inconel_625_gearbox", "inconel_625_pipe", "hastelloy_n_75_casing",
        "hastelloy_n_75_gearbox", "hastelloy_n_75_pipe", "flotation_cell"
    ].forEach(name => basicMetal(name).requiresTool(true))
    faces(basicMetal("red_steel_casing").requiresTool(true)
        .texture("particle", "kubejs:block/red_steel_casing_side"),
        "kubejs:block/red_steel_casing_top", "kubejs:block/red_steel_casing_side")
    // 压缩钻石块：原版未要求正确工具
    event.create("diamond_compressed_block", "basic")
        .noValidSpawns(true).soundType("stone").mapColor("stone").tagBlock("mineable/pickaxe")
        .textureAll("minecraft:block/diamond_block")
})
