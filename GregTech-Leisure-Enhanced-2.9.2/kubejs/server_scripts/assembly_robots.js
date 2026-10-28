// priority: 95
// 电路组装机器人及其相关自动化部件。
// 由 gtceu.js 按既有阶段顺序执行，本文件只登记配方，不依赖文件名排序。
global.gtlPack.register("assembly_robots", event => {
    const gtr = event.recipes.gtceu;
    const batch = global.gtlPack.batch;
    const craft = global.gtlPack.crafting;

    const robots = [["uv", "1", "uhv", "1966080"], ["uhv", "2", "uev", "7864320"], ["uev", "3", "uiv", "31457280"], ["uiv", "4", "uxv", "125829120"], ["uxv", "5", "opv", "503316480"]]

    robots.forEach((robot) => {
        gtr.assembler("kubejs:precision_circuit_assembly_robot_mk" + robot[1])
            .itemInputs("2x gtceu:" + robot[0] + "_robot_arm", "gtceu:" + robot[0] + "_sensor", "4x #gtceu:circuits/" + robot[2], "gtceu:silver_nanoswarm",
                "2x gtceu:pikyonium_plate")
            .inputFluids("gtceu:soldering_alloy 1440").itemOutputs("kubejs:precision_circuit_assembly_robot_mk" + robot[1]).EUt(robot[3])
            .duration(400)
    })

    craft(event, "shaped", [
        ["kubejs:machine_casing_circuit_assembly_line", ["ABA", "CDC", "ABA"],
            {A : "gtceu:pikyonium_plate", B : "gtceu:hssg_gear", C : "gtceu:luv_robot_arm", D : "gtceu:ruridit_frame"}],
        ["kubejs:aggregatione_core", ["ABA", "BDB", "ABA"], {A : "gtceu:attuned_tengam_ingot", B : "kubejs:infused_obsidian", D : "kubejs:magic_core"}],
        ["kubejs:stabilizer_core", ["ABA", "BDB", "ABA"],
            {A : "gtceu:double_infuscolium_plate", B : "gtceu:long_neutronium_rod", D : "kubejs:time_dilation_containment_unit"}],
        ["kubejs:dragon_stabilizer_core", ["ABA", "BDB", "ABA"],
            {A : "gtceu:double_draconium_plate", B : "gtceu:long_cosmicneutronium_rod", D : "kubejs:stabilizer_core"}]
    ]);

    gtr.macerator("kubejs:draconium_dust")
        .itemInputs("kubejs:draconium_block_charged")
        .itemOutputs("9x kubejs:draconium_dust", "gtceu:obsidian_dust", "gtceu:ender_eye_dust", "minecraft:redstone").EUt(1920).duration(400)

    gtr.alloy_smelter("kubejs:infused_obsidian")
        .itemInputs("kubejs:ender_obsidian", "kubejs:draconium_dust").itemOutputs("kubejs:infused_obsidian").EUt(GTValues.VA[GTValues.UEV])
        .duration(200)

    gtr.sps_crafting("kubejs:draconium_dust")
        .itemInputs("gtceu:netherrack_dust", "gtceu:endstone_dust").inputFluids("gtceu:mana 1000", "gtceu:dragon_breath 10")
        .itemOutputs("kubejs:draconium_dust").EUt(GTValues.VA[GTValues.UEV]).duration(400)

    batch(gtr, "electromagnetic_separator", ["itemInputs", "itemOutputs", "chancedOutput", "chancedOutput", "EUt", ["duration", 200]], [
        ["gtceu:purified_tengam_dust", ["gtceu:clean_raw_tengam_dust"], ["gtceu:purified_tengam_dust"], ["gtceu:magnetic_neodymium_dust", 1000, 0],
            ["gtceu:magnetic_samarium_dust", 500, 0], [GTValues.VA[GTValues.UEV]]],
        ["gtceu:raw_tengam_dust", ["gtceu:pure_jasper_dust"], ["gtceu:jasper_dust"], ["gtceu:raw_tengam_dust", 1000, 0],
            ["gtceu:raw_tengam_dust", 500, 0], [24]]
    ]);

    batch(gtr, "polarizer", ["itemInputs", "itemOutputs", "EUt", ["duration", 400]], [
        ["gtceu:attuned_tengam_dust", ["gtceu:purified_tengam_dust"], ["gtceu:attuned_tengam_dust"], [GTValues.VA[GTValues.UXV]]],
        ["gtceu:small_attuned_tengam_dust", ["gtceu:small_purified_tengam_dust"], ["gtceu:small_attuned_tengam_dust"], [GTValues.VA[GTValues.UIV]]]
    ]);

    gtr.sps_crafting("gtceu:attuned_tengam_ingot")
        .notConsumable("kubejs:ingot_field_shape").itemInputs("gtceu:attuned_tengam_dust").inputFluids("gtceu:mana 1000")
        .itemOutputs("gtceu:attuned_tengam_ingot").EUt(GTValues.VA[GTValues.UIV]).duration(400)

    gtr.ore_washer("gtceu:clean_raw_tengam_dust")
        .itemInputs("gtceu:raw_tengam_dust").inputFluids("gtceu:distilled_water 1000").itemOutputs("gtceu:clean_raw_tengam_dust").EUt(480)
        .duration(800)

    gtr.chemical_reactor("gtceu:attuned_tengam_ingot")
        .itemInputs("gtceu:attuned_tengam_dust", "gtceu:magnetic_samarium_dust")
        .inputFluids("gtceu:infuscolium_plasma 144", "gtceu:nitrogen_plasma 1000").itemOutputs("gtceu:attuned_tengam_ingot")
        .EUt(GTValues.VA[GTValues.UEV]).duration(1600)
});
