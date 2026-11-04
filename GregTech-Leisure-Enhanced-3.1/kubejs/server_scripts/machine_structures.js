// priority: 95
// 机壳材料、世界数据扫描与机器结构部件。
// 由 gtceu.js 按既有阶段顺序执行，本文件只登记配方，不依赖文件名排序。
global.gtlPack.register("machine_structures", event => {
    const gtr = event.recipes.gtceu;
    const batch = global.gtlPack.batch;
    const craft = global.gtlPack.crafting;

    const machine_materials = [["uhv", "neutronium", "europium", "abyssalalloy", "uev", "1966080", "uv", "128", "kubejs:smd_diode_bioware"],
        ["uev", "quantanium", "mithril", "titansteel", "uiv", "7864320", "uhv", "256", "kubejs:smd_diode_optical"],
        ["uiv", "adamantium", "neutronium", "adamantine", "uxv", "31457280", "uev", "512", "kubejs:smd_diode_exotic"],
        ["uxv", "vibranium", "taranium", "naquadriatictaranium", "opv", "125829120", "uiv", "1024", "kubejs:smd_diode_cosmic"],
        ["opv", "draconium", "crystalmatrix", "starmetal", "max", "503316480", "uxv", "2048", "kubejs:smd_diode_supracausal"]]
    machine_materials.forEach((machine_material) => {
        event.shaped("gtceu:" + machine_material[0] + "_circuit_assembler", [
            "ECF",
            "DAD",
            "BCB"
        ], {
            A: "gtceu:" + machine_material[0] + "_machine_hull",
            B: "gtceu:" + machine_material[2] + "_single_cable",
            C: "#gtceu:circuits/" + machine_material[4],
            D: "gtceu:" + machine_material[0] + "_conveyor_module",
            E: "gtceu:" + machine_material[0] + "_robot_arm",
            F: "gtceu:" + machine_material[0] + "_emitter"
        })

        event.shaped("gtceu:" + machine_material[0] + "_scanner", [
            "CEC",
            "BAB",
            "CDC"
        ], {
            A: "gtceu:" + machine_material[0] + "_machine_hull",
            B: "gtceu:" + machine_material[2] + "_single_cable",
            D: "gtceu:" + machine_material[0] + "_sensor",
            C: "#gtceu:circuits/" + machine_material[0],
            E: "gtceu:" + machine_material[0] + "_emitter"
        })
    })

    gtr.assembler("gtceu:large_recycler")
        .itemInputs("4x gtceu:double_vanadium_steel_plate", "4x gtceu:black_bronze_gear", "8x gtceu:eglin_steel_rod", "4x gtceu:hv_electric_motor",
            "4x gtceu:hv_emitter", "4x #gtceu:circuits/ev", "4x gtceu:double_eglin_steel_plate", "8x gtceu:double_brass_plate",
            "8x gtceu:double_tin_plate")
        .inputFluids("gtceu:soldering_alloy 864").itemOutputs("gtceu:large_recycler").EUt(1920).duration(400)

    batch(gtr, "large_recycler", ["itemInputs", "itemOutputs", "EUt", "duration"], [
        ["kubejs:scrap_1", ["#forge:ingots"], ["kubejs:scrap"], [480], [200]],
        ["kubejs:scrap_2", ["#forge:dusts"], ["kubejs:scrap"], [120], [200]],
        ["kubejs:scrap_3", ["4x #forge:small_dusts"], ["kubejs:scrap"], [120], [200]],
        ["kubejs:scrap_4", ["9x #forge:tiny_dusts"], ["kubejs:scrap"], [120], [200]],
        ["kubejs:scrap_5", ["#forge:storage_blocks"], ["9x kubejs:scrap"], [1920], [400]],
        ["kubejs:scrap_6", ["9x #forge:nuggets"], ["kubejs:scrap"], [480], [200]],
        ["kubejs:scrap_7", ["#forge:gems"], ["kubejs:scrap"], [480], [200]],
        ["kubejs:scrap_8", ["#minecraft:logs"], ["kubejs:scrap"], [120], [200]]
    ]);

    gtr.mixer("gtceu:fertilizer_")
        .itemInputs("gtceu:fertilizer", "2x kubejs:scrap").itemOutputs("2x gtceu:fertilizer").EUt(480).duration(40)

    gtr.packer("kubejs:scrap_box")
        .itemInputs("9x kubejs:scrap").itemOutputs("kubejs:scrap_box").EUt(12).duration(200)

    gtr.assembler("gtlcore:space_elevator_mechanical_casing")
        .itemInputs("gtceu:hssg_frame", "6x gtceu:inconel_792_plate", "6x gtceu:double_pikyonium_plate")
        .itemOutputs("2x gtlcore:space_elevator_mechanical_casing").EUt(16).duration(50).circuit(6)

    gtr.chemical_bath("kubejs:high_strength_concrete")
        .itemInputs("#forge:concretes").inputFluids("gtceu:concrete 1152").itemOutputs("kubejs:high_strength_concrete").EUt(480).duration(200)

    batch(gtr, "assembler", ["itemInputs", ["inputFluids", "gtceu:concrete 1152"], "itemOutputs", ["EUt", 480], ["duration", 400]], [
        ["gtlcore:space_elevator_support", ["gtceu:naquadah_frame", "4x gtceu:red_steel_rod", "6x gtceu:black_steel_plate"],
            ["2x gtlcore:space_elevator_support"]],
        ["kubejs:space_elevator_internal_support",
            ["gtceu:naquadah_frame", "2x gtceu:niobium_titanium_single_wire", "16x gtceu:fine_annealed_copper_wire", "#gtceu:circuits/luv",
                "6x gtceu:double_iridium_plate"], ["2x kubejs:space_elevator_internal_support"]]
    ]);

    gtr.mass_fabricator("gtceu:uu_matter")
        .itemInputs("ae2:matter_ball").inputFluids("gtceu:uu_amplifier 10").outputFluids("gtceu:uu_matter 10").EUt(GTValues.VA[GTValues.UIV])
        .duration(20)

    const world_data_scanner = [["lv", "gtceu:tin_single_cable"], ["mv", "gtceu:copper_single_cable"], ["hv", "gtceu:gold_single_cable"], ["ev", "gtceu:aluminium_single_cable"],
        ["iv", "gtceu:platinum_single_cable"], ["luv", "gtceu:niobium_titanium_single_cable"], ["zpm", "gtceu:vanadium_gallium_single_cable"],
        ["uv", "gtceu:yttrium_barium_cuprate_single_cable"], ["uhv", "gtceu:europium_single_cable"], ["uev", "gtceu:mithril_single_cable"],
        ["uiv", "gtceu:neutronium_single_cable"], ["uxv", "gtceu:taranium_single_cable"], ["opv", "gtceu:crystalmatrix_single_cable"]]
    world_data_scanner.forEach((scanner) => {
        event.shaped("gtceu:" + scanner[0] + "_world_data_scanner", [
            "CDC",
            "BAB",
            "CDC"
        ], {
            A: "gtceu:" + scanner[0] + "_machine_hull",
            B: scanner[1],
            C: "gtceu:" + scanner[0] + "_sensor",
            D: "#gtceu:circuits/" + scanner[0]
        })
    })

    craft(event, "shaped", [
        ["2x kubejs:neutronium_pipe_casing", ["CBC", "BAB", "CBC"],
            {A : "gtceu:neutronium_frame", B : "gtceu:neutronium_normal_fluid_pipe", C : "gtceu:neutronium_plate"}],
        ["2x kubejs:neutronium_gearbox", ["CEC", "BAB", "CFC"],
            {A : "gtceu:neutronium_frame", B : "gtceu:neutronium_gear", C : "gtceu:neutronium_plate", E : "#forge:tools/hammers", F : "#forge:tools/wrench"}],
        ["gtlcore:advanced_assembly_line_unit", ["CEC", "BAB", "CEC"],
            {A : "gtceu:assembly_line_unit", B : "#gtceu:circuits/uv", C : "gtceu:hssg_plate", E : "gtceu:rhodium_gear"}]
    ]);

    gtr.assembler("gtceu:void_miner")
        .itemInputs("gtceu:lv_miner", "gtceu:mv_miner", "gtceu:hv_miner", "4x gtceu:lv_field_generator", "4x gtceu:mv_field_generator",
            "4x gtceu:hv_field_generator", "4x #gtceu:circuits/ev", "gtceu:long_titanium_rod", "4x gtceu:titanium_plate")
        .inputFluids("gtceu:soldering_alloy 1440").itemOutputs("gtceu:void_miner").EUt(GTValues.VA[GTValues.HV]).duration(800)

    event.shaped("minecraft:netherite_upgrade_smithing_template", [
        "ABA",
        "ACA",
        "AAA"
    ], {
        A: "minecraft:diamond",
        B: "minecraft:netherite_block",
        C: "minecraft:netherrack"
    })

    gtr.forming_press("kubejs:netherite_rod")
        .itemInputs("minecraft:netherite_upgrade_smithing_template", "2x gtceu:neodymium_rod", "minecraft:netherite_ingot")
        .itemOutputs("2x kubejs:netherite_rod").EUt(480).duration(400)

    batch(gtr, "forge_hammer", ["itemInputs", "itemOutputs", ["EUt", 30], ["duration", 200]], [
        ["kubejs:long_netherite_rod", ["2x kubejs:netherite_rod"], ["kubejs:long_netherite_rod"]],
        ["kubejs:magnetic_long_netherite_rod", ["2x kubejs:magnetic_netherite_rod"], ["kubejs:magnetic_long_netherite_rod"]]
    ]);

    batch(gtr, "polarizer", ["itemInputs", "itemOutputs", ["EUt", GTValues.VA[GTValues.UHV]], "duration"], [
        ["kubejs:magnetic_netherite_rod", ["kubejs:netherite_rod"], ["kubejs:magnetic_netherite_rod"], [200]],
        ["kubejs:magnetic_long_netherite_rod", ["kubejs:long_netherite_rod"], ["kubejs:magnetic_long_netherite_rod"], [400]]
    ]);
});
