// priority: 95
// 本文件按功能保存配方阶段，实际执行顺序统一由配方入口管理。

// 整合星际探索机器、行星材料、火箭部件和七级火箭研究。
global.gtlPack.register("integration_space", event => {
    const gtr = event.recipes.gtceu
    event.shapeless("ad_astra:energizer", "gtceu:ulv_charger_4x")
    event.shaped("ad_astra:nasa_workbench", ["ABA", "CDC", "FEF"], {
        A: "gtceu:hv_robot_arm",
        B: "gtceu:hv_emitter",
        C: "minecraft:redstone_torch",
        D: "avaritia:compressed_crafting_table",
        E: "gtceu:steel_block",
        F: "gtceu:double_steel_plate"
    })
    gtr.lightning_processor("ad_astra:ice_shard")
        .itemInputs("minecraft:blue_ice")
        .itemOutputs("ad_astra:ice_shard")
        .EUt(30).duration(200)
    gtr.assembler("ad_astra:rocket_nose_cone")
        .itemInputs("gtceu:stainless_steel_frame", "minecraft:lightning_rod", "kubejs:ultimate_control_circuit", "gtceu:exquisite_glass_gem", "gtceu:computer_monitor_cover", "2x gtceu:double_aluminium_plate")
        .inputFluids("gtceu:soldering_alloy 576")
        .itemOutputs("ad_astra:rocket_nose_cone")
        .EUt(120).duration(200)
    gtr.electric_blast_furnace("ad_astra:iron_plate")
        .itemInputs("gtceu:conductive_alloy_block", "gtceu:double_wrought_iron_plate", "16x gtceu:wrought_iron_dust")
        .inputFluids("gtceu:iron 1296")
        .itemOutputs("ad_astra:iron_plate")
        .chancedOutput("gtceu:steel_ingot", 5000, 0)
        .outputFluids("gtceu:wrought_iron 864")
        .EUt(480).duration(800)
        .blastFurnaceTemp(2400)
    const nasaRecipes = [
        { result: "ad_astra:tier_1_rocket", body: "ad_astra:iron_plate", tank: "ad_astra:steel_tank", engine: "ad_astra:steel_engine" },
        { result: "ad_astra:tier_2_rocket", body: "ad_astra:steel_plate", tank: "ad_astra:steel_tank", engine: "ad_astra:steel_engine" },
        { result: "ad_astra:tier_3_rocket", body: "ad_astra:steel_block", tank: "ad_astra:steel_tank", engine: "ad_astra:steel_engine" },
        { result: "ad_astra:tier_4_rocket", body: "ad_astra:desh_plate", tank: "ad_astra:desh_tank", engine: "ad_astra:desh_engine" },
        { result: "ad_astra_rocketed:tier_5_rocket", body: "ad_astra:ostrum_plate", tank: "ad_astra:ostrum_tank", engine: "ad_astra:ostrum_engine" },
        { result: "ad_astra_rocketed:tier_6_rocket", body: "ad_astra:calorite_plate", tank: "ad_astra:calorite_tank", engine: "ad_astra:calorite_engine" }
    ]
    nasaRecipes.forEach(r => {
        event.custom({
            "type": "ad_astra:nasa_workbench",
            "ingredients": [
                { "item": "ad_astra:rocket_nose_cone" },
                { "item": r.body }, { "item": r.body }, { "item": r.body }, { "item": r.body }, { "item": r.body }, { "item": r.body },
                { "item": "ad_astra:rocket_fin" },
                { "item": r.tank }, { "item": r.tank },
                { "item": "ad_astra:rocket_fin" }, { "item": "ad_astra:rocket_fin" },
                { "item": r.engine }, { "item": "ad_astra:rocket_fin" }
            ],
            "result": { "count": 1, "id": r.result }
        })
    })
    global.gtlPack.batch(gtr, "assembler", ["itemInputs", "inputFluids", "itemOutputs", ["EUt", 120], ["duration", 200]], [
        ["ad_astra:fan", ["2x ad_astra:steel_rod", "4x gtceu:stainless_steel_turbine_blade", "4x gtceu:stainless_steel_screw"], ["gtceu:soldering_alloy 576"], ["ad_astra:fan"]],
        ["ad_astra:steel_tank", ["gtceu:stainless_steel_fluid_cell", "gtceu:stainless_steel_small_fluid_pipe", "gtceu:hv_electric_pump", "16x gtceu:stainless_steel_foil"], ["gtceu:soldering_alloy 288"], ["ad_astra:steel_tank"]]
    ]);
    gtr.assembler("ad_astra:engine_frame")
        .itemInputs("gtceu:black_steel_frame", "2x gtceu:cobalt_normal_restrictive_item_pipe", "32x gtceu:steel_foil")
        .itemOutputs("ad_astra:engine_frame")
        .EUt(120).duration(400)
    global.gtlPack.batch(gtr, "assembler", ["itemInputs", "inputFluids", "itemOutputs", "EUt", "duration"], [
        ["ad_astra:steel_engine", ["ad_astra:engine_frame", "gtceu:steel_pipe_casing", "ad_astra:fan", "ad_astra:steel_tank", "gtceu:hv_fluid_regulator", "16x #gtceu:circuits/ev", "gtceu:liquid_fuel_jetpack", "8x gtceu:stainless_steel_plate"], ["gtceu:steel 1296"], ["ad_astra:steel_engine"], [480], [400]],
        ["ad_astra:rocket_fin", ["2x ad_astra:iron_plate", "gtceu:double_aluminium_bronze_plate", "gtceu:double_aluminium_plate", "gtceu:double_stainless_steel_plate"], ["gtceu:magnalium 1296"], ["ad_astra:rocket_fin"], [120], [200]]
    ]);
    gtr.electric_blast_furnace("ad_astra:steel_plate")
        .itemInputs("gtceu:magnetic_steel_block", "ad_astra:iron_plate", "16x gtceu:damascus_steel_dust")
        .inputFluids("gtceu:titanium 1296")
        .itemOutputs("ad_astra:steel_plate")
        .chancedOutput("gtceu:titanium_ingot", 5000, 0)
        .EUt(480).duration(1600)
        .blastFurnaceTemp(3200)
    global.gtlPack.batch(gtr, "electric_blast_furnace", ["itemInputs", "inputFluids", "itemOutputs", ["EUt", 1920], "duration", "blastFurnaceTemp"], [
        ["ad_astra:desh_ingot", ["gtceu:desh_dust", "gtceu:rhodium_dust"], ["gtceu:bismuth_bronze 144"], ["ad_astra:desh_ingot"], [1600], [4300]],
        ["ad_astra:ostrum_ingot", ["gtceu:ostrum_dust", "gtceu:titanium_carbide_dust"], ["gtceu:samarium_iron_arsenic_oxide 144"], ["ad_astra:ostrum_ingot"], [2400], [5200]]
    ]);
    gtr.alloy_smelter("ad_astra:calorite_ingot")
        .itemInputs("gtceu:naquadah_ingot", "gtceu:calorite_dust")
        .itemOutputs("ad_astra:calorite_ingot")
        .EUt(30720).duration(1200)
    global.gtlPack.batch(gtr, "compressor", ["itemInputs", "itemOutputs", "EUt", ["duration", 200]], [
        ["ad_astra:desh_plate", ["9x ad_astra:desh_ingot"], ["ad_astra:desh_plate"], [1920]],
        ["ad_astra:ostrum_plate", ["9x ad_astra:ostrum_ingot"], ["ad_astra:ostrum_plate"], [7680]],
        ["ad_astra:calorite_plate", ["9x ad_astra:calorite_ingot"], ["ad_astra:calorite_plate"], [7680]]
    ]);
    global.gtlPack.batch(gtr, "assembler", ["itemInputs", "inputFluids", "itemOutputs", "EUt", "duration"], [
        ["ad_astra:desh_engine", ["gtceu:blue_steel_frame", "ad_astra:steel_engine", "2x gtceu:ev_field_generator", "16x #gtceu:circuits/iv", "gtceu:ev_fluid_regulator", "16x ad_astra:desh_fluid_pipe", "8x ad_astra:desh_plate"], ["gtceu:tungsten_steel 1296"], ["ad_astra:desh_engine"], [1920], [400]],
        ["ad_astra:desh_tank", ["gtceu:titanium_fluid_cell", "8x ad_astra:desh_fluid_pipe", "gtceu:ev_electric_pump", "8x gtceu:titanium_plate", "4x ad_astra:desh_plate"], ["gtceu:soldering_alloy 288"], ["ad_astra:desh_tank"], [480], [200]],
        ["ad_astra:ostrum_tank", ["gtceu:tungstensteel_fluid_cell", "8x ad_astra:ostrum_fluid_pipe", "gtceu:iv_electric_pump", "8x gtceu:double_palladium_plate", "4x ad_astra:ostrum_plate"], ["gtceu:soldering_alloy 288"], ["ad_astra:ostrum_tank"], [7680], [200]],
        ["ad_astra:ostrum_engine", ["gtceu:hsse_frame", "ad_astra:steel_engine", "2x gtceu:iv_field_generator", "16x #gtceu:circuits/luv", "gtceu:iv_fluid_regulator", "16x ad_astra:ostrum_fluid_pipe", "8x ad_astra:ostrum_plate"], ["gtceu:rhodium_plated_palladium 1296"], ["ad_astra:ostrum_engine"], [7680], [400]],
        ["ad_astra:calorite_tank", ["gtceu:tungstensteel_fluid_cell", "8x gtceu:naquadah_normal_fluid_pipe", "gtceu:luv_electric_pump", "8x gtceu:enriched_naquadah_plate", "4x ad_astra:calorite_plate"], ["gtceu:soldering_alloy 288"], ["ad_astra:calorite_tank"], [30720], [200]],
        ["ad_astra:calorite_engine", ["gtceu:naquadah_frame", "ad_astra:steel_engine", "2x gtceu:luv_field_generator", "16x #gtceu:circuits/zpm", "gtceu:luv_fluid_regulator", "16x gtceu:naquadah_normal_fluid_pipe", "8x ad_astra:calorite_plate"], ["gtceu:naquadah_alloy 1296"], ["ad_astra:calorite_engine"], [30720], [400]]
    ]);
    gtr.assembly_line("ad_astra_rocketed:tier_7_rocket")
        .itemInputs("ad_astra:rocket_nose_cone", "gtceu:zpm_field_generator", "16x #gtceu:circuits/uv", "4x gtceu:zpm_emitter", "4x gtceu:zpm_fluid_regulator", "4x ad_astra:calorite_tank", "ad_astra:calorite_engine", "8x ad_astra:ostrum_block", "32x gtceu:fall_king_block", "64x ad_astra:calorite_plate", "4x ad_astra:rocket_fin")
        .inputFluids("gtceu:soldering_alloy 5760", "gtceu:lubricant 4000", "gtceu:pcb_coolant 4000", "gtceu:indium_tin_barium_titanium_cuprate 1296")
        .itemOutputs("ad_astra_rocketed:tier_7_rocket")
        .EUt(122880).duration(2400)
        .stationResearch(b => b.researchStack(Registries.getItemStack("ad_astra_rocketed:tier_6_rocket"))
            .dataStack(Registries.getItemStack("gtceu:data_orb"))
            .EUt(GTValues.VA[GTValues.ZPM])
            .CWUt(48))
})
