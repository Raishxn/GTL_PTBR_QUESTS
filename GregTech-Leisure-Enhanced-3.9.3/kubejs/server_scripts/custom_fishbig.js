// priority: 95
// 本文件按功能保存配方阶段，实际执行顺序统一由配方入口管理。

// 组装鱼大的布料、框架及身体部件。
global.gtlPack.register("custom_fishbig_materials", event => {
    const gtr = event.recipes.gtceu
    gtr.forming_press("kubejs:fishbig_fabric")
        .itemInputs("64x gtceu:magnetohydrodynamicallyconstrainedstarmatter_foil", "64x gtceu:shirabon_foil", "64x kubejs:two_way_foil", "64x gtceu:cosmic_foil", "64x gtceu:cosmicneutronium_foil", "64x gtceu:eternity_foil")
        .itemOutputs("kubejs:fishbig_fabric")
        .duration(200).EUt(GTValues.VA[GTValues.MAX] * 65536)
        .cleanroom(GTLCleanroomType.LAW_CLEANROOM)
    gtr.assembler("kubejs:fishbig_frame")
        .circuit(6)
        .itemInputs("64x gtceu:cosmic_plate", "64x gtceu:eternity_nanoswarm", "64x gtceu:long_cosmic_rod", "64x gtceu:infinity_frame", "64x gtceu:long_transcendentmetal_rod", "64x gtceu:long_cosmicneutronium_rod", "64x gtceu:magnetohydrodynamicallyconstrainedstarmatter_frame", "64x gtceu:long_magmatter_rod")
        .inputFluids("gtceu:shirabon 18432")
        .itemOutputs("kubejs:fishbig_frame")
        .duration(200).EUt(GTValues.VA[GTValues.MAX] * 65536)
        .cleanroom(GTLCleanroomType.LAW_CLEANROOM)
    global.gtlPack.batch(gtr, "assembler", ["itemInputs", "inputFluids", "itemOutputs", ["duration", 200], ["EUt", GTValues.VA[GTValues.MAX] * 65536], ["cleanroom", GTLCleanroomType.LAW_CLEANROOM]], [
        ["kubejs:fishbig_body", ["64x kubejs:fishbig_fabric", "64x kubejs:fishbig_frame", "64x kubejs:fishbig_fabric", "64x kubejs:fishbig_fabric", "64x gtceu:create_aggregation", "64x kubejs:fishbig_fabric", "64x kubejs:fishbig_fabric", "64x kubejs:fishbig_frame", "64x kubejs:fishbig_fabric"], ["gtceu:eternity 18432"], ["kubejs:fishbig_body"]],
        ["kubejs:fishbig_hade", ["64x gtceu:double_cosmic_plate", "64x gtceu:double_cosmic_plate", "64x gtceu:double_cosmic_plate", "64x gtlcore:max_sensor", "64x gtceu:create_computation", "64x gtlcore:max_sensor", "64x gtceu:double_cosmic_plate", "64x kubejs:fishbig_frame", "64x gtceu:double_cosmic_plate"], ["gtceu:transcendentmetal 18432"], ["kubejs:fishbig_hade"]],
        ["kubejs:fishbig_hair", ["64x kubejs:fishbig_fabric", "64x kubejs:fishbig_fabric", "64x kubejs:fishbig_fabric", "64x kubejs:fishbig_fabric", "64x kubejs:fishbig_frame", "64x kubejs:fishbig_fabric", "64x kubejs:fishbig_fabric", "64x gtlcore:infinity_glass", "64x kubejs:fishbig_fabric"], ["gtceu:eternity 18432"], ["kubejs:fishbig_hair"]],
        ["kubejs:fishbig_rleg", ["64x kubejs:fishbig_frame", "64x kubejs:fishbig_fabric", "64x kubejs:fishbig_fabric", "64x kubejs:fishbig_fabric", "64x gtceu:max_buffer", "64x kubejs:fishbig_fabric", "64x kubejs:fishbig_fabric", "4x gtmthings:creative_laser_hatch", "64x kubejs:fishbig_fabric"], ["gtceu:eternity 18432"], ["kubejs:fishbig_rleg"]],
        ["kubejs:fishbig_lleg", ["64x kubejs:fishbig_fabric", "64x kubejs:fishbig_fabric", "64x kubejs:fishbig_frame", "64x kubejs:fishbig_fabric", "64x gtceu:max_buffer", "64x kubejs:fishbig_fabric", "64x kubejs:fishbig_fabric", "4x gtceu:creative_data_access_hatch", "64x kubejs:fishbig_fabric"], ["gtceu:eternity 18432"], ["kubejs:fishbig_lleg"]],
        ["kubejs:fishbig_rhand", ["64x kubejs:fishbig_frame", "64x kubejs:fishbig_fabric", "64x kubejs:fishbig_fabric", "64x kubejs:fishbig_fabric", "64x gtlcore:component_assembly_line_casing_max", "64x kubejs:fishbig_fabric", "64x kubejs:fishbig_fabric", "4x gtmthings:creative_laser_hatch", "64x kubejs:fishbig_fabric"], ["gtceu:eternity 18432"], ["kubejs:fishbig_rhand"]],
        ["kubejs:fishbig_lhand", ["64x kubejs:fishbig_fabric", "64x kubejs:fishbig_fabric", "64x kubejs:fishbig_frame", "64x kubejs:fishbig_fabric", "64x gtlcore:component_assembly_line_casing_max", "64x kubejs:fishbig_fabric", "64x kubejs:fishbig_fabric", "4x gtceu:creative_data_access_hatch", "64x kubejs:fishbig_fabric"], ["gtceu:eternity 18432"], ["kubejs:fishbig_lhand"]]
    ]);
})

// 通过超时空装配线研究和复制鱼大及其部件。
global.gtlPack.register("custom_fishbig_research", event => {
    const gtr = event.recipes.gtceu
    gtr.suprachronal_assembly_line("greythings:fishbig_custom")
        .chancedInput("expatternprovider:fishbig", 7500, 0)
        .itemInputs("32x gtlcore:compressed_pufferfish",
            "16x gtlcore:super_glue",
            "8x gtlcore:super_glue",
            "15x kubejs:fishbig_fabric",
            "3x kubejs:fishbig_frame",
            "kubejs:fishbig_hade",
            "kubejs:fishbig_hair",
            "kubejs:fishbig_lhand",
            "kubejs:fishbig_rhand",
            "kubejs:fishbig_rleg",
            "kubejs:fishbig_lleg",
            "kubejs:fishbig_body")
        .inputFluids("gtceu:miracle_gas 240000000", "gtceu:uu_matter 2147483646")
        .itemOutputs("2x expatternprovider:fishbig")
        .EUt(131072 * GTValues.VA[GTValues.MAX])
        .duration(288000)
        .stationResearch(b => b.researchStack("ae2:controller")
            .dataStack("gtceu:data_module")
            .EUt(GTValues.VA[GTValues.MAX])
            .CWUt(524288))
    const fishParts = [
        { id: "greythings:fishbig_hade_custom", output: "kubejs:fishbig_hade", research: "minecraft:barrier",
          inputs: ["64x gtceu:double_cosmic_plate", "64x gtceu:double_cosmic_plate", "64x gtceu:double_cosmic_plate", "48x gtceu:double_cosmic_plate", "48x kubejs:fishbig_frame", "48x gtceu:create_computation", "64x gtlcore:max_sensor", "32x gtlcore:max_sensor"],
          fluid: "gtceu:transcendentmetal 13824" },
        { id: "greythings:fishbig_hair_custom", output: "kubejs:fishbig_hair", research: "minecraft:end_portal_frame",
          inputs: ["48x gtlcore:infinity_glass", "64x kubejs:fishbig_fabric", "64x kubejs:fishbig_fabric", "64x kubejs:fishbig_fabric", "64x kubejs:fishbig_fabric", "48x kubejs:fishbig_frame", "64x kubejs:fishbig_fabric", "32x kubejs:fishbig_fabric"],
          fluid: "gtceu:eternity 13824" },
        { id: "greythings:fishbig_body_custom", output: "kubejs:fishbig_body", research: "minecraft:structure_void",
          inputs: ["48x gtceu:create_aggregation", "64x kubejs:fishbig_fabric", "64x kubejs:fishbig_fabric", "64x kubejs:fishbig_fabric", "64x kubejs:fishbig_fabric", "64x kubejs:fishbig_frame", "32x kubejs:fishbig_frame", "32x kubejs:fishbig_fabric"],
          fluid: "gtceu:eternity 13824" },
        { id: "greythings:fishbig_lhand_custom", output: "kubejs:fishbig_lhand", research: "minecraft:jigsaw",
          inputs: ["3x gtceu:creative_data_access_hatch", "64x kubejs:fishbig_fabric", "64x kubejs:fishbig_fabric", "64x kubejs:fishbig_fabric", "64x kubejs:fishbig_fabric", "48x kubejs:fishbig_frame", "48x gtlcore:component_assembly_line_casing_max", "32x kubejs:fishbig_fabric"],
          fluid: "gtceu:eternity 13824" },
        { id: "greythings:fishbig_rhand_custom", output: "kubejs:fishbig_rhand", research: "minecraft:structure_block",
          inputs: ["3x gtmthings:creative_laser_hatch", "64x kubejs:fishbig_fabric", "64x kubejs:fishbig_fabric", "64x kubejs:fishbig_fabric", "64x kubejs:fishbig_fabric", "48x kubejs:fishbig_frame", "48x gtlcore:component_assembly_line_casing_max", "32x kubejs:fishbig_fabric"],
          fluid: "gtceu:eternity 13824" },
        { id: "greythings:fishbig_rleg_custom", output: "kubejs:fishbig_rleg", research: "minecraft:command_block_minecart",
          inputs: ["3x gtmthings:creative_laser_hatch", "64x kubejs:fishbig_fabric", "64x kubejs:fishbig_fabric", "64x kubejs:fishbig_fabric", "64x kubejs:fishbig_fabric", "48x kubejs:fishbig_frame", "48x gtceu:max_buffer", "32x kubejs:fishbig_fabric"],
          fluid: "gtceu:eternity 13824" },
        { id: "greythings:fishbig_lleg_custom", output: "kubejs:fishbig_lleg", research: "minecraft:debug_stick",
          inputs: ["3x gtceu:creative_data_access_hatch", "64x kubejs:fishbig_fabric", "64x kubejs:fishbig_fabric", "64x kubejs:fishbig_fabric", "64x kubejs:fishbig_fabric", "48x kubejs:fishbig_frame", "48x gtceu:max_buffer", "32x kubejs:fishbig_fabric"],
          fluid: "gtceu:eternity 13824" }
    ]
    fishParts.forEach(p => {
        gtr.suprachronal_assembly_line(p.id)
            .notConsumable("expatternprovider:fishbig")
            .itemInputs(p.inputs)
            .inputFluids(p.fluid)
            .itemOutputs(p.output)
            .EUt(65536 * GTValues.VA[GTValues.MAX])
            .duration(200)
            .stationResearch(b => b.researchStack(p.research)
                .dataStack("gtceu:data_module")
                .EUt(GTValues.VA[GTValues.MAX])
                .CWUt(524288))
    })
})
