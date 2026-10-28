// priority: 95
// 核燃料装配、燃料离心回收与火箭燃料。
// 由 gtceu.js 按既有阶段顺序执行，本文件只登记配方，不依赖文件名排序。
global.gtlPack.register("nuclear_rocket_fuels", event => {
    const gtr = event.recipes.gtceu;
    const batch = global.gtlPack.batch;

    function assemble_fuel(name, isnq) {
        let rod = isnq ? "4x gtceu:tungsten_carbide_rod" : "4x gtceu:steel_rod"
        batch(gtr, "assembler", ["itemInputs", "itemOutputs", ["EUt", 30], "duration"], [
            ["kubejs:reactor_" + name + "_dual", ["2x kubejs:reactor_" + name + "_simple", rod], ["kubejs:reactor_" + name + "_dual"], [40]],
            ["kubejs:reactor_" + name + "_quad", ["2x kubejs:reactor_" + name + "_dual", rod], ["kubejs:reactor_" + name + "_quad"], [80]]
        ]);
    }

    assemble_fuel("uranium", false)
    assemble_fuel("thorium", false)
    assemble_fuel("mox", false)
    assemble_fuel("naquadah", true)

    function centrifuge_fuel(name, isnq, product, output, chance, extra) {
        let rod = isnq ? "gtceu:tungsten_carbide_rod" : "gtceu:steel_rod"
        let fuel_rod = isnq ? "kubejs:tungsten_carbide_reactor_fuel_rod" : "kubejs:reactor_fuel_rod"
        batch(gtr, "centrifuge", ["itemInputs", "itemOutputs", "chancedOutput", "chancedOutput", ["EUt", 480], "duration"], [
            ["kubejs:depleted_reactor_" + name + "_simple", ["kubejs:depleted_reactor_" + name + "_simple"], [fuel_rod],
                [output + "x " + product, chance, extra], ["2x kubejs:nuclear_waste", 1600, 500], [40]],
            ["kubejs:depleted_reactor_" + name + "_dual", ["kubejs:depleted_reactor_" + name + "_dual"], ["2x " + fuel_rod, "4x " + rod],
                [2 * output + "x " + product, chance, extra], ["4x kubejs:nuclear_waste", 3600, 500], [80]],
            ["kubejs:depleted_reactor_" + name + "_quad", ["kubejs:depleted_reactor_" + name + "_quad"], ["4x " + fuel_rod, "12x " + rod],
                [4 * output + "x " + product, chance, extra], ["8x kubejs:nuclear_waste", 8000, 500], [160]]
        ]);
    }

    centrifuge_fuel("uranium", false, "gtceu:plutonium_dust", 6, 2500, 100)
    centrifuge_fuel("thorium", false, "gtceu:uranium_dust", 4, 4000, 500)
    centrifuge_fuel("mox", false, "kubejs:nuclear_waste", 8, 2000, 1000)
    centrifuge_fuel("naquadah", true, "gtceu:plutonium_dust", 2, 8000, 200)

    batch(gtr, "fission_reactor", ["itemInputs", "itemOutputs", "EUt", "duration", "addData"], [
        ["kubejs:reactor_thorium_simple", ["kubejs:reactor_thorium_simple"], ["kubejs:depleted_reactor_thorium_simple"], [6], [134400], ["FRheat", 1]],
        ["kubejs:reactor_thorium_dual", ["kubejs:reactor_thorium_dual"], ["kubejs:depleted_reactor_thorium_dual"], [8], [172800], ["FRheat", 2]],
        ["kubejs:reactor_thorium_quad", ["kubejs:reactor_thorium_quad"], ["kubejs:depleted_reactor_thorium_quad"], [10], [216000], ["FRheat", 3]],
        ["kubejs:reactor_uranium_simple", ["kubejs:reactor_uranium_simple"], ["kubejs:depleted_reactor_uranium_simple"], [3], [112000], ["FRheat", 4]],
        ["kubejs:reactor_uranium_dual", ["kubejs:reactor_uranium_dual"], ["kubejs:depleted_reactor_uranium_dual"], [4], [144000], ["FRheat", 5]],
        ["kubejs:reactor_uranium_quad", ["kubejs:reactor_uranium_quad"], ["kubejs:depleted_reactor_uranium_quad"], [5], [180000], ["FRheat", 6]],
        ["kubejs:reactor_mox_simple", ["kubejs:reactor_mox_simple"], ["kubejs:depleted_reactor_mox_simple"], [1], [78400], ["FRheat", 6]],
        ["kubejs:reactor_mox_dual", ["kubejs:reactor_mox_dual"], ["kubejs:depleted_reactor_mox_dual"], [2], [100800], ["FRheat", 7]],
        ["kubejs:reactor_mox_quad", ["kubejs:reactor_mox_quad"], ["kubejs:depleted_reactor_mox_quad"], [3], [128000], ["FRheat", 8]],
        ["kubejs:reactor_naquadah_simple", ["kubejs:reactor_naquadah_simple"], ["kubejs:depleted_reactor_naquadah_simple"], [3], [160000],
            ["FRheat", 7]],
        ["kubejs:reactor_naquadah_dual", ["kubejs:reactor_naquadah_dual"], ["kubejs:depleted_reactor_naquadah_dual"], [5], [240000], ["FRheat", 8]],
        ["kubejs:reactor_naquadah_quad", ["kubejs:reactor_naquadah_quad"], ["kubejs:depleted_reactor_naquadah_quad"], [7], [360000], ["FRheat", 9]]
    ]);

    batch(gtr, "assembler", [["inputFluids", "gtceu:soldering_alloy 144"], "itemInputs", "itemOutputs", ["EUt", 7], ["duration", 200]], [
        ["gtmthings:ulv_huge_item_import_bus",
            ["gtceu:ulv_input_bus", "gtlcore:primitive_robot_arm", "gtceu:bronze_crate", "4x #gtceu:circuits/ulv", "4x gtceu:wrought_iron_plate"],
            ["gtmthings:ulv_huge_item_import_bus"]],
        ["gtmthings:ulv_huge_item_export_bus",
            ["gtceu:ulv_output_bus", "gtlcore:primitive_robot_arm", "gtceu:bronze_crate", "4x #gtceu:circuits/ulv", "4x gtceu:wrought_iron_plate"],
            ["gtmthings:ulv_huge_item_export_bus"]]
    ]);

    batch(gtr, "fuel_refining", ["itemInputs", "inputFluids", "outputFluids", ["EUt", GTValues.VA[GTValues.EV]], "circuit", "duration", "blastFurnaceTemp"], [
        ["gtceu:cetane_boosted_diesel", ["16x gtceu:carbon_dust"],
            ["gtceu:hydrogen 10000", "gtceu:oxygen 5000", "gtceu:light_fuel 10000", "gtceu:heavy_fuel 2000", "gtceu:nitration_mixture 4000"],
            ["gtceu:cetane_boosted_diesel 18000"], [2], [400], [2200]],
        ["gtceu:cetane_boosted_diesel_b", ["12x gtceu:carbon_dust"],
            ["gtceu:hydrogen 10000", "gtceu:oxygen 5000", "gtceu:bio_diesel 16000", "gtceu:nitration_mixture 4000"],
            ["gtceu:cetane_boosted_diesel 14000"], [3], [600], [2500]]
    ]);

    gtr.fuel_refining("gtceu:high_octane_gasoline")
        .itemInputs("44x gtceu:carbon_dust")
        .inputFluids("gtceu:oxygen 12000", "gtceu:nitrogen 8000", "gtceu:naphtha 16000", "gtceu:refinery_gas 2000", "gtceu:toluene 4000", "gtceu:octane 3000")
        .outputFluids("gtceu:high_octane_gasoline 50000").circuit(4).EUt(GTValues.VA[GTValues.IV]).duration(1200).blastFurnaceTemp(4800)

    batch(gtr, "fuel_refining", ["itemInputs", "inputFluids", "outputFluids", ["EUt", GTValues.VA[GTValues.EV]], "circuit", "duration", "blastFurnaceTemp"], [
        ["gtceu:rocket_fuel", ["8x gtceu:carbon_dust"], ["gtceu:hydrogen 32000", "gtceu:oxygen 14000", "gtceu:nitrogen 12000", "gtceu:chlorine 10000"],
            ["gtceu:rocket_fuel 36000"], [5], [1600], [2600]],
        ["gtceu:rocket_fuel_rp_1", ["64x gtceu:carbon_dust"], ["gtceu:coal_gas 80000", "gtceu:oxygen 10000"], ["gtceu:rocket_fuel_rp_1 4000"], [6],
            [1200], [3800]],
        ["gtceu:dense_hydrazine_fuel_mixture", ["32x gtceu:carbon_dust"],
            ["gtceu:hydrogen 12000", "gtceu:oxygen 8000", "gtceu:nitrogen 10000", "gtceu:hydrogen_peroxide 4000"],
            ["gtceu:dense_hydrazine_fuel_mixture 8000"], [7], [800], [3200]]
    ]);

    gtr.fuel_refining("gtceu:rocket_fuel_cn3h7o3")
        .circuit(1).itemInputs("12x gtceu:carbon_dust")
        .inputFluids("gtceu:hydrogen 14000", "gtceu:nitrogen 6000", "gtceu:nitric_acid 3000", "gtceu:hydrogen_peroxide 2000")
        .outputFluids("gtceu:rocket_fuel_cn3h7o3 4000").EUt(GTValues.VA[GTValues.IV]).duration(1200).blastFurnaceTemp(3400)

    batch(gtr, "fuel_refining", ["itemInputs", "inputFluids", "outputFluids", "EUt", "circuit", "duration", "blastFurnaceTemp"], [
        ["gtceu:rocket_fuel_h8n4c2o4", ["18x gtceu:carbon_dust"], ["gtceu:hydrogen 30000", "gtceu:nitrogen 18000", "gtceu:oxygen 24000"],
            ["gtceu:rocket_fuel_h8n4c2o4 12000"], [GTValues.VA[GTValues.IV]], [8], [2000], [5000]],
        ["ad_astra:cryo_fuel", ["8x ad_astra:ice_shard", "60x gtceu:carbon_dust"],
            ["gtceu:hydrogen 42000", "gtceu:oxygen 20000", "gtceu:nitrogen 8000", "gtceu:heavy_fuel 1000", "gtceu:light_fuel 4000"],
            ["ad_astra:cryo_fuel 8000"], [GTValues.VA[GTValues.LuV]], [9], [6400], [10000]]
    ]);

    gtr.fuel_refining("gtceu:stellar_energy_rocket_fuel")
        .itemInputs("64x minecraft:fire_charge", "8x gtceu:hmxexplosive_dust", "4x gtceu:enriched_naquadah_dust")
        .inputFluids("gtceu:hydrogen_peroxide 8000", "gtceu:rocket_fuel_cn3h7o3 8000", "gtceu:dense_hydrazine_fuel_mixture 12000",
            "gtceu:rocket_fuel_rp_1 4000", "gtceu:nitration_mixture 4000", "gtceu:benzene 4000")
        .outputFluids("gtceu:stellar_energy_rocket_fuel 40000").EUt(GTValues.VA[GTValues.IV]).duration(7200).blastFurnaceTemp(14400)

    gtr.atomic_energy_excitation("gtceu:naquadah_fuel")
        .notConsumable("gtceu:orichalcum_nanoswarm").itemInputs("16x gtceu:naquadah_dust")
        .inputFluids("gtceu:hydrogen 30000", "gtceu:nitrogen 15000", "gtceu:fluorine 8000", "gtceu:nitric_acid 8000")
        .outputFluids("gtceu:naquadah_fuel 20000").EUt(GTValues.VA[GTValues.ZPM]).duration(4000).blastFurnaceTemp(12000)

    gtr.atomic_energy_excitation("gtceu:enriched_naquadah_fuel")
        .notConsumable("gtceu:vibranium_nanoswarm").notConsumableFluid("gtceu:caesium_fluoride 1000")
        .itemInputs("16x gtceu:enriched_naquadah_dust", "4x gtceu:antimony_dust")
        .inputFluids("gtceu:hydrogen 48000", "gtceu:nitrogen 30000", "gtceu:fluorine 12000", "gtceu:xenon 8000", "gtceu:radon 6000")
        .outputFluids("gtceu:enriched_naquadah_fuel 20000").EUt(GTValues.VA[GTValues.UV]).duration(4000).blastFurnaceTemp(12500)

    batch(gtr, "atomic_energy_excitation", ["itemInputs", "inputFluids", "outputFluids", "EUt", "duration", "blastFurnaceTemp"], [
        ["gtceu:hyper_fuel_1", ["14x gtceu:naquadria_dust", "20x gtceu:enriched_naquadah_dust", "40x gtceu:naquadah_dust"],
            ["gtceu:hydrogen 100000", "gtceu:nitrogen 76000", "gtceu:fluorine 10000", "gtceu:radon 2000", "gtceu:xenon 4000", "gtceu:thorium 4608"],
            ["gtceu:hyper_fuel_1 24000"], [GTValues.VA[GTValues.UHV]], [3800], [13200]],
        ["gtceu:hyper_fuel_2", ["4x gtceu:dubnium_dust", "6x gtceu:fermium_dust"],
            ["gtceu:hyper_fuel_1 6000", "gtceu:radon 40000", "gtceu:xenon 32000", "gtceu:thorium 3456", "gtceu:naquadria 864",
                "gtceu:uranium_235 2304"], ["gtceu:hyper_fuel_2 9600", "gtceu:hyper_fuel_1 500"], [GTValues.VA[GTValues.UEV]], [4000], [14000]],
        ["gtceu:hyper_fuel_3", ["6x gtceu:lawrencium_dust", "8x gtceu:adamantine_dust"],
            ["gtceu:hyper_fuel_2 6000", "gtceu:naquadria 864", "gtceu:thorium 1728", "gtceu:fermium 5184", "gtceu:uranium_235 2304",
                "gtceu:plutonium_241 4608"], ["gtceu:hyper_fuel_3 12000", "gtceu:hyper_fuel_2 750"], [GTValues.VA[GTValues.UIV]], [4000], [15200]],
        ["gtceu:hyper_fuel_4", ["8x gtceu:neutronium_dust", "12x gtceu:taranium_dust"],
            ["gtceu:hyper_fuel_3 6000", "gtceu:nobelium 8000", "gtceu:thorium 1728", "gtceu:fermium 2340", "gtceu:uranium_235 2304",
                "gtceu:plutonium_241 5184"], ["gtceu:hyper_fuel_4 16000", "gtceu:hyper_fuel_3 1000"], [GTValues.VA[GTValues.UIV]], [4200], [18000]]
    ]);

    batch(gtr, "atomic_energy_excitation", ["notConsumable", "itemInputs", "inputFluids", "outputFluids", "EUt", "duration", "blastFurnaceTemp"], [
        ["gtceu:concentration_mixing_hyper_fuel_1", ["gtceu:white_dwarf_mtter_nanoswarm"], ["4x kubejs:resonating_gem", "16x gtceu:hassium_dust"],
            ["gtceu:hyper_fuel_4 8000", "gtceu:helium_plasma 6000", "gtceu:nickel_plasma 6000", "gtceu:oganesson 1152",
                "gtceu:naquadriatictaranium 2304", "gtceu:plutonium_241 864"],
            ["gtceu:concentration_mixing_hyper_fuel_1 12000", "gtceu:hyper_fuel_4 1500"], [GTValues.VA[GTValues.UXV]], [1200], [18800]],
        ["gtceu:concentration_mixing_hyper_fuel_2", ["gtceu:black_dwarf_mtter_nanoswarm"], ["16x gtceu:draconium_dust", "18x gtceu:starmetal_dust"],
            ["gtceu:concentration_mixing_hyper_fuel_1 6000", "gtceu:cosmic_element 60000", "gtceu:oxygen_plasma 6000", "gtceu:argon_plasma 6000",
                "gtceu:iron_plasma 6000", "gtceu:nitrogen_plasma 6000"],
            ["gtceu:concentration_mixing_hyper_fuel_2 12000", "gtceu:concentration_mixing_hyper_fuel_1 2000"], [GTValues.VA[GTValues.OpV]], [2400],
            [21000]]
    ]);

    gtr.assembler("gtceu:advanced_integrated_ore_processor")
        .itemInputs("16x gtceu:integrated_ore_processor", "64x gtceu:crushing_wheels", "32x #gtceu:circuits/uiv", "16x gtceu:uiv_robot_arm",
            "32x gtceu:uiv_conveyor_module", "8x gtceu:uiv_electric_pump", "8x gtceu:uiv_emitter", "64x gtceu:double_dalisenite_plate",
            "64x gtceu:double_dalisenite_plate")
        .inputFluids("gtceu:inconel_792 82944").itemOutputs("gtceu:advanced_integrated_ore_processor").EUt(GTValues.VA[GTValues.UEV])
        .duration(800)

    gtr.dehydrator("gtceu:polyimide")
        .inputFluids("gtceu:paa 144").outputFluids("gtceu:polyimide 144").EUt(30).duration(270)

    gtr.dehydrator("gtceu:stearic_acid")
        .inputFluids("gtceu:deglycerated_soap 1000").outputFluids("gtceu:stearic_acid 800").itemOutputs("gtceu:salt_dust").EUt(2000)
        .duration(160)

    gtr.dehydrator("gtceu:tungsten_trioxide_dust")
        .itemInputs("7x gtceu:tungstic_acid_dust").itemOutputs("4x gtceu:tungsten_trioxide_dust").EUt(120).duration(150)

    gtr.dehydrator("gtceu:silica_gel_dust")
        .inputFluids("gtceu:silica_gel_base 1000").itemOutputs("3x gtceu:silica_gel_dust", "2x gtceu:salt_dust").EUt(480).duration(130)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.dehydrator("gtceu:salt_dust")
        .inputFluids("gtceu:salt_water 1000").itemOutputs("2x gtceu:salt_dust").EUt(30).duration(160)

    gtr.chemical_reactor("gtceu:tungsten_dust")
        .inputFluids("gtceu:hydrogen 6000").itemInputs("4x gtceu:tungsten_trioxide_dust").outputFluids("minecraft:water 3000")
        .itemOutputs("gtceu:tungsten_dust").EUt(120).duration(60)

    gtr.chemical_reactor("gtceu:tungsten_trioxide_dust")
        .itemInputs("2x gtceu:tungsten_carbide_dust").inputFluids("gtceu:oxygen 4000").itemOutputs("4x gtceu:tungsten_trioxide_dust")
        .outputFluids("gtceu:carbon_monoxide 1000").EUt(480).duration(200)

    gtr.electric_blast_furnace("gtceu:cadmium_tungstate_dust")
        .itemInputs("4x gtceu:tungsten_trioxide_dust", "2x gtceu:cadmium_sulfide_dust").inputFluids("gtceu:oxygen 3000")
        .itemOutputs("6x gtceu:cadmium_tungstate_dust").outputFluids("gtceu:sulfur_dioxide 1000").EUt(120).duration(320).blastFurnaceTemp(2800)

    gtr.alloy_smelter("gtceu:cadmium_sulfide_dust")
        .itemInputs("1x gtceu:cadmium_dust", "1x gtceu:sulfur_dust").itemOutputs("2x gtceu:cadmium_sulfide_dust").EUt(30).duration(2400)

    gtr.electric_blast_furnace("gtceu:bismuth_germanate_dust")
        .itemInputs("3x gtceu:germanium_dioxide_dust").inputFluids("gtceu:bismuth_nitrate_solution 4000")
        .itemOutputs("33x gtceu:bismuth_germanate_dust").outputFluids("gtceu:nitrogen_dioxide 12000").EUt(5000000).duration(80)
        .blastFurnaceTemp(7600)

    gtr.chemical_reactor("gtceu:germanium_dioxide_dust")
        .itemInputs("gtceu:germanium_dust").inputFluids("gtceu:oxygen 2000").itemOutputs("3x gtceu:germanium_dioxide_dust").EUt(120)
        .duration(400)

    gtr.large_chemical_reactor("gtceu:bismuth_nitrate_solution")
        .itemInputs("gtceu:bismuth_dust").inputFluids("gtceu:nitric_acid 6000")
        .outputFluids("gtceu:bismuth_nitrate_solution 1000", "gtceu:nitrogen_dioxide 3000", "minecraft:water 2000").EUt(30).duration(350)

    batch(gtr, "assembler", ["itemInputs", "itemOutputs", "inputFluids", "EUt", "duration"], [
        ["gtlcore:advanced_stellar_containment_casing",
            ["gtlcore:stellar_containment_casing", "gtceu:uhv_field_generator", "8x gtceu:vibranium_screw", "gtceu:enderite_octal_wire",
                "4x gtceu:taranium_plate"], ["gtlcore:advanced_stellar_containment_casing"], ["gtceu:astraltitanium 144"], [GTValues.VA[GTValues.UEV]],
            [280]],
        ["gtlcore:ultimate_stellar_containment_casing",
            ["gtlcore:advanced_stellar_containment_casing", "gtceu:uev_field_generator", "8x gtceu:vibramantium_screw",
                "gtceu:legendarium_quadruple_wire", "8x gtceu:heavy_quark_degenerate_matter_plate"], ["gtlcore:ultimate_stellar_containment_casing"],
            ["gtceu:celestialtungsten 144"], [GTValues.VA[GTValues.UIV]], [460]]
    ]);
});
