// priority: 95
// 本文件按功能保存配方阶段，实际执行顺序统一由配方入口管理。

// 合成命令方块、磁物质、时空奇点、终望珍珠及终局消耗品。
global.gtlPack.register("custom_exotic_items", event => {
    const gtr = event.recipes.gtceu
    gtr.qft("greythings:command_block_custom")
        .notConsumable("expatternprovider:fishbig")
        .notConsumable("kubejs:command_wand")
        .itemInputs("gtceu:magnetohydrodynamicallyconstrainedstarmatter_block")
        .inputFluids("gtceu:miracle_gas 24000")
        .itemOutputs("minecraft:command_block")
        .EUt(128 * GTValues.VA[GTValues.MAX]).duration(240)
        .dimension("kubejs:ancient_world")
    gtr.qft("greythings:chain_command_block_custom")
        .notConsumable("expatternprovider:fishbig")
        .notConsumable("kubejs:command_wand")
        .itemInputs("kubejs:chain_command_block_core", "kubejs:command_block_broken")
        .inputFluids("gtceu:miracle_gas 24000")
        .itemOutputs("minecraft:chain_command_block")
        .EUt(256 * GTValues.VA[GTValues.MAX]).duration(240)
    global.gtlPack.batch(gtr, "qft", [["notConsumable", "expatternprovider:fishbig"], "notConsumable", "itemInputs", "inputFluids", "itemOutputs", "EUt", ["duration", 240], ["dimension", "kubejs:ancient_world"]], [
        ["greythings:repeating_command_block_custom", ["kubejs:command_wand"], ["kubejs:repeating_command_block_core", "kubejs:chain_command_block_broken"], ["gtceu:miracle_gas 24000"], ["minecraft:repeating_command_block"], [256 * GTValues.VA[GTValues.MAX]]],
        ["greythings:magmatter_block", ["16x gtlcore:compressed_pufferfish"], ["64x gtceu:magmatter_ingot"], ["gtceu:miracle_adhesive 10000"], ["gtceu:magmatter_block"], [128 * GTValues.VA[GTValues.MAX]]]
    ]);
    gtr.electric_implosion_compressor("greythings:spacetime_singularity_custom")
        .notConsumable("16x gtceu:transcendentmetal_nanoswarm")
        .itemInputs("1000x gtceu:spacetime_ingot")
        .itemOutputs(Item.of('avaritia:singularity', '{Id:"avaritia:spacetime"}'))
        .EUt(16 * GTValues.VA[GTValues.MAX]).duration(200)
        .addCondition(new GravityCondition(false))
    gtr.qft("greythings:endest_pearl_custom")
        .itemInputs("24x minecraft:end_stone", "32x minecraft:ender_pearl", "4x avaritia:neutron_ingot", "minecraft:nether_star")
        .inputFluids("gtceu:uu_matter 1000")
        .itemOutputs("avaritia:endest_pearl")
        .EUt(GTValues.VA[GTValues.UXV]).duration(300)
    gtr.qft("greythings:cosmic_meatballs_custom")
        .notConsumable("gtlcore:compressed_pufferfish")
        .itemInputs("minecraft:porkchop", "minecraft:beef", "minecraft:mutton", "minecraft:cod", "minecraft:salmon", "minecraft:tropical_fish", "minecraft:pufferfish", "minecraft:rabbit", "minecraft:chicken", "minecraft:rotten_flesh", "minecraft:spider_eye", "minecraft:egg", "avaritia:neutron_nugget")
        .inputFluids("gtceu:miracle_adhesive 1000")
        .itemOutputs("avaritia:cosmic_meatballs")
        .EUt(64 * GTValues.VA[GTValues.MAX]).duration(300)
    gtr.dimensionally_transcendent_mixer("greythings:miracle_adhesive_custom")
        .itemInputs("kubejs:hyper_stable_self_healing_adhesive")
        .inputFluids("gtceu:miracle_gas 100000")
        .outputFluids("gtceu:miracle_adhesive 100000")
        .EUt(4 * GTValues.VA[GTValues.MAX]).duration(300)
        .addCondition(new GravityCondition(false))
    gtr.qft("greythings:neutronium_credit")
        .notConsumable("kubejs:suprachronal_mainframe_complex")
        .notConsumable("gtceu:credit_casting_mold")
        .itemInputs("4096x avaritia:neutron")
        .inputFluids("gtceu:neutronium 589824")
        .itemOutputs("gtceu:neutronium_credit")
        .EUt(256 * GTValues.VA[GTValues.MAX]).duration(300)
        .addCondition(new GravityCondition(true))
})

// 保留菜鸟证明的双重重力条件与法务无尘室要求。
global.gtlPack.register("custom_certificate", event => {
    const gtr = event.recipes.gtceu
    gtr.precision_assembler("greythings:nan_certificate")
        .itemInputs("64x gtceu:periodicium_block", "64x gtceu:superheavy_l_alloy_block", "64x gtceu:superheavy_h_alloy_block", "576x gtceu:copper76_dust")
        .inputFluids("gtceu:ytterbium_178 82944", "gtceu:titanium_50 82944", "gtceu:uranium_235 82944", "gtceu:plutonium_241 82944")
        .itemOutputs("gtceu:nan_certificate")
        .EUt(2 * GTValues.VA[GTValues.UXV]).duration(20000)
        .cleanroom(GTLCleanroomType.LAW_CLEANROOM)
        .addCondition(new GravityCondition(true))
        .addCondition(new GravityCondition(false))
})

// 使用轻子电荷和宇宙元素批量获取终局材料。
global.gtlPack.register("custom_cosmos_simulation", event => {
    const gtr = event.recipes.gtceu
    gtr.cosmos_simulation("greythings_eoh_plus:cosmos_simulation_plus")
        .itemInputs("2048x kubejs:leptonic_charge")
        .itemOutputs("16384x gtceu:white_dwarf_mtter_dust", "16384x gtceu:black_dwarf_mtter_dust",
            "131072x ae2:sky_dust", "131072x gtceu:trinium_dust", "131072x gtceu:plutonium_241_dust",
            "131072x gtceu:titanium_50_dust", "131072x gtceu:copper76_dust", "131072x gtceu:uranium_235_dust",
            "131072x gtceu:perditio_crystal_dust", "131072x gtceu:earth_crystal_dust",
            "131072x gtceu:ignis_crystal_dust", "131072x gtceu:tartarite_dust", "131072x gtceu:uruium_dust",
            "131072x gtceu:force_dust", "131072x gtceu:alien_algae_dust", "131072x gtceu:bloodstone_dust",
            "131072x minecraft:netherite_scrap", "131072x gtceu:purified_tengam_dust",
            "131072x gtceu:quantanium_dust", "131072x gtceu:bedrock_dust", "131072x gtceu:damascus_steel_dust",
            "131072x avaritia:neutron_pile", "131072x gtceu:certus_quartz_dust", "131072x ae2:fluix_dust")
        .duration(1200)
        .inputFluids("gtceu:cosmic_element 1024000")
})
