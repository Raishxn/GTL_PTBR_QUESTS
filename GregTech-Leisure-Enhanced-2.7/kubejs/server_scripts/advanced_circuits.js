// priority: 95
// 生物、光学、奇异、宇宙、超因果与超时电路。
// 由 gtceu.js 按既有阶段顺序执行，本文件只登记配方，不依赖文件名排序。
global.gtlPack.register("advanced_circuits", event => {
    const gtr = event.recipes.gtceu;
    const tiers = global.gtlPack.tiers;
    const batch = global.gtlPack.batch;

    // 生物电路路线
    gtr.circuit_assembler("kubejs:bioware_circuit_board")
        .itemInputs("32x gtceu:wetware_circuit_board", "8x gtlcore:electricaly_wired_petri_dish", "gtceu:uv_electric_pump", "2x gtceu:luv_sensor",
            "#gtceu:circuits/luv", "32x gtceu:vanadium_gallium_foil")
        .itemOutputs("32x kubejs:bioware_circuit_board").EUt(GTValues.VA[GTValues.ZPM]).duration(2400).cleanroom(CleanroomType.STERILE_CLEANROOM)

    batch(gtr, "chemical_reactor", [["itemInputs", "kubejs:bioware_circuit_board", "32x gtceu:vanadium_gallium_foil"], "inputFluids",
        ["itemOutputs", "kubejs:bioware_printed_circuit_board"], ["EUt", 1920], ["duration", 2100], ["cleanroom", CleanroomType.STERILE_CLEANROOM]], [
        ["kubejs:bioware_printed_circuit_board", ["gtceu:iron_iii_chloride 10000"]],
        ["kubejs:bioware_printed_circuit_board1", ["gtceu:sodium_persulfate 20000"]]
    ]);

    gtr.fluid_heater("gtceu:biohmediumsterilized")
        .inputFluids("gtceu:biomediumraw 100").outputFluids("gtceu:biohmediumsterilized 100").EUt(480).duration(400)
        .cleanroom(CleanroomType.STERILE_CLEANROOM)

    gtr.incubator("gtceu:biomediumraw")
        .itemInputs("64x gtceu:stem_cells", "16x kubejs:tcetieseaweedextract", "gtceu:tritanium_dust")
        .inputFluids("gtceu:raw_growth_medium 1000").outputFluids("gtceu:biomediumraw 1000").EUt(1920).duration(1200)
        .addCondition(new GravityCondition(true))

    gtr.incubator("gtceu:biomediumraw1")
        .itemInputs("64x kubejs:biological_cells", "16x kubejs:tcetieseaweedextract", "gtceu:tritanium_dust")
        .inputFluids("gtceu:raw_growth_medium 10000").outputFluids("gtceu:biomediumraw 10000").EUt(1920).duration(1200)
        .addCondition(new GravityCondition(true))

    gtr.extractor("kubejs:tcetieseaweedextract")
        .itemInputs("64x kubejs:tcetiedandelions").itemOutputs("kubejs:tcetieseaweedextract").EUt(16).duration(200)
        .addCondition(new GravityCondition(false))

    gtr.centrifuge("kubejs:tcetiedandelions")
        .inputFluids("gtceu:seaweedbroth 1000").itemOutputs("64x kubejs:tcetiedandelions").EUt(120).duration(200)
        .addCondition(new GravityCondition(false))

    gtr.incubator("gtceu:seaweedbroth")
        .itemInputs("64x minecraft:kelp", "20x gtceu:alien_algae_dust", "8x gtceu:energium_dust", "gtceu:mithril_dust")
        .inputFluids("gtceu:unknownnutrientagar 50000", "gtceu:methane 50000").outputFluids("gtceu:seaweedbroth 50000").EUt(7680).duration(4800)

    gtr.large_chemical_reactor("gtceu:unknownnutrientagar")
        .inputFluids("gtceu:unknowwater 4000", "gtceu:phthalic_acid 4000")
        .itemInputs("16x gtceu:salt_dust", "16x gtceu:meat_dust", "16x gtceu:agar_dust").outputFluids("gtceu:unknownnutrientagar 8000").EUt(1920)
        .duration(800).cleanroom(CleanroomType.STERILE_CLEANROOM)

    gtr.incubator("kubejs:biological_cells")
        .itemInputs("64x gtceu:stem_cells", "gtceu:enriched_naquadah_dust").inputFluids("gtceu:biohmediumsterilized 1000", "gtceu:mutagen 1000")
        .itemOutputs("64x kubejs:biological_cells").EUt(GTValues.VA[GTValues.ZPM]).duration(800)

    gtr.precision_assembler("kubejs:bioware_boule")
        .itemInputs("gtceu:neutronium_wafer", "16x kubejs:biological_cells", "gtceu:small_actinium_dust", "gtceu:small_strontium_dust")
        .inputFluids("gtceu:biohmediumsterilized 1000", "gtceu:lubricant 1000", "gtceu:nitrogen 10000").itemOutputs("kubejs:bioware_boule")
        .EUt(GTValues.VA[GTValues.UV]).duration(600).cleanroom(CleanroomType.STERILE_CLEANROOM)

    gtr.cutter("kubejs:bioware_chip")
        .itemInputs("kubejs:bioware_boule").itemOutputs("16x kubejs:bioware_chip", "8x kubejs:biological_cells").EUt(GTValues.VA[GTValues.UV])
        .duration(600).cleanroom(CleanroomType.STERILE_CLEANROOM)

    batch(gtr, "assembler", ["itemInputs", ["inputFluids", "gtceu:polyimide 288"], "itemOutputs", ["EUt", GTValues.VA[GTValues.UV]], ["duration", 100],
        ["cleanroom", CleanroomType.STERILE_CLEANROOM]], [
        ["kubejs:smd_transistor_bioware",
            ["8x gtceu:fine_naquadah_alloy_wire", "2x gtceu:germaniumtungstennitride_plate", "2x gtceu:silicon_carbide_plate"],
            ["16x kubejs:smd_transistor_bioware"]],
        ["kubejs:smd_capacitor_bioware", ["8x gtceu:fine_naquadah_alloy_wire", "8x gtceu:silicon_foil", "4x gtceu:naquadah_foil"],
            ["16x kubejs:smd_capacitor_bioware"]],
        ["kubejs:smd_resistor_bioware", ["8x gtceu:fine_naquadah_alloy_wire", "gtceu:naquadria_plate", "gtceu:tritanium_plate"],
            ["16x kubejs:smd_resistor_bioware"]],
        ["kubejs:smd_diode_bioware", ["8x gtceu:fine_naquadah_alloy_wire", "gtceu:lutetium_dust", "gtceu:tritanium_dust"],
            ["16x kubejs:smd_diode_bioware"]],
        ["kubejs:smd_inductor_bioware", ["8x gtceu:fine_naquadah_alloy_wire", "gtceu:naquadah_alloy_ring"], ["16x kubejs:smd_inductor_bioware"]]
    ]);

    gtr.circuit_assembler("kubejs:bioware_processor")
        .itemInputs("kubejs:bioware_processing_core", "4x gtceu:qbit_cpu_chip", "gtceu:highly_advanced_soc", "8x kubejs:smd_capacitor_bioware",
            "8x kubejs:smd_transistor_bioware", "8x gtceu:fine_naquadah_wire")
        .itemOutputs("4x kubejs:bioware_processor").EUt(GTValues.VA[GTValues.UV]).duration(200).cleanroom(CleanroomType.STERILE_CLEANROOM)

    const circuit_robots = [1, 2, 3, 4, 5]
    circuit_robots.forEach((circuit_robot) => {
        batch(gtr, "circuit_assembly_line", [["notConsumable", "kubejs:precision_circuit_assembly_robot_mk" + circuit_robot], "itemInputs", "inputFluids", "itemOutputs",
            ["EUt", GTValues.VA[GTValues.ZPM] * (4 ** circuit_robot)], "duration"], [
            ["kubejs:bioware_assembly" + circuit_robot,
                ["kubejs:bioware_printed_circuit_board", "2x kubejs:bioware_processor", "16x kubejs:smd_capacitor_bioware",
                    "16x kubejs:smd_diode_bioware", "16x kubejs:smd_resistor_bioware", "16x kubejs:smd_transistor_bioware",
                    "16x kubejs:smd_inductor_bioware", "16x gtceu:fine_naquadah_wire", "48x gtceu:ram_chip", "16x gtceu:polybenzimidazole_foil",
                    "2x gtceu:duranium_plate"],
                ["gtceu:biohmediumsterilized 1000", "gtceu:americium 576", "gtceu:polyethylene 2592", "gtceu:enriched_naquadah 1296"],
                ["2x kubejs:bioware_assembly"], [400 * 4 / (4 ** circuit_robot)]],
            ["kubejs:bioware_computer" + circuit_robot,
                ["kubejs:bioware_printed_circuit_board", "2x kubejs:bioware_assembly", "32x kubejs:smd_capacitor_bioware",
                    "32x kubejs:smd_diode_bioware", "32x kubejs:smd_resistor_bioware", "32x kubejs:smd_transistor_bioware",
                    "32x kubejs:smd_inductor_bioware", "32x gtceu:fine_naquadah_wire", "64x gtceu:ram_chip", "32x gtceu:nor_memory_chip",
                    "2x gtceu:uhpic_chip", "32x gtceu:polybenzimidazole_foil", "2x gtceu:neutronium_plate"],
                ["gtceu:biohmediumsterilized 1000", "gtceu:darmstadtium 576", "gtceu:polybenzimidazole 1296", "gtceu:enriched_naquadah 1296"],
                ["kubejs:bioware_computer"], [400 * 4 / (4 ** circuit_robot)]],
            ["kubejs:bioware_mainframe" + circuit_robot,
                ["2x gtceu:neutronium_frame", "2x kubejs:bioware_computer", "64x kubejs:smd_capacitor_bioware", "64x kubejs:smd_diode_bioware",
                    "64x kubejs:smd_resistor_bioware", "64x kubejs:smd_transistor_bioware", "64x kubejs:smd_inductor_bioware", "64x gtceu:ram_chip",
                    "4x gtceu:uhpic_chip", "16x gtceu:ruthenium_trinium_americium_neutronate_double_wire", "64x gtceu:polybenzimidazole_foil",
                    "gtceu:gravi_star", "2x gtceu:mithril_plate"],
                ["gtceu:biohmediumsterilized 1000", "gtceu:darmstadtium 1296", "gtceu:polybenzimidazole 2592", "gtceu:naquadria 1296"],
                ["kubejs:bioware_mainframe"], [800 * 4 / (4 ** circuit_robot)]]
        ]);
    })

    // 光学电路路线
    gtr.mass_fabricator("gtceu:quasifissioning_plasma")
        .inputFluids("gtceu:uranium 144").itemInputs("gtceu:uranium_ingot").outputFluids("gtceu:quasifissioning_plasma 144")
        .EUt(GTValues.VA[GTValues.UEV]).duration(200)

    batch(gtr, "decay_hastener", ["inputFluids", "outputFluids", "EUt", "duration"], [
        ["gtceu:flyb_plasma", ["gtceu:quasifissioning_plasma 1000"], ["gtceu:flyb_plasma 1000"], [122880], [160]],
        ["gtceu:hafnium", ["gtceu:ytterbium_178 144"], ["gtceu:hafnium 144"], [30720], [120]]
    ]);

    batch(gtr, "decay_hastener", ["inputFluids", "itemOutputs", "EUt", "duration"], [
        ["gtceu:polonium_dust", ["gtceu:bismuth 144"], ["gtceu:polonium_dust"], [480], [8000]],
        ["gtceu:copper76_dust", ["gtceu:copper 144"], ["gtceu:copper76_dust"], [1920], [4000]]
    ]);

    gtr.centrifuge("gtceu:flerovium")
        .inputFluids("gtceu:flyb_plasma 1000").outputFluids("gtceu:flerovium 288", "gtceu:ytterbium_178 288").EUt(1920).duration(290)

    batch(gtr, "assembler", ["itemInputs", ["inputFluids", "gtceu:polyimide 576"], "itemOutputs", ["EUt", GTValues.VA[GTValues.UHV]], ["duration", 100],
        ["cleanroom", CleanroomType.CLEANROOM]], [
        ["kubejs:smd_transistor_optical",
            ["8x gtceu:fine_dubnium_wire", "4x gtceu:polyetheretherketone_foil", "2x gtceu:nether_star_plate", "2x gtceu:molybdenum_disilicide_plate"],
            ["16x kubejs:smd_transistor_optical"]],
        ["kubejs:smd_capacitor_optical", ["8x gtceu:fine_dubnium_wire", "4x gtceu:polyetheretherketone_foil", "2x gtceu:tritanium_foil"],
            ["16x kubejs:smd_capacitor_optical"]],
        ["kubejs:smd_resistor_optical",
            ["8x gtceu:fine_dubnium_wire", "4x gtceu:polyetheretherketone_foil", "3x gtceu:sodium_seaborgate_dust", "2x gtceu:ender_eye_plate"],
            ["16x kubejs:smd_resistor_optical"]],
        ["kubejs:smd_diode_optical",
            ["8x gtceu:fine_dubnium_wire", "4x gtceu:polyetheretherketone_foil", "2x gtceu:vanadium_gallium_plate", "2x gtceu:beryllium_plate"],
            ["16x kubejs:smd_diode_optical"]],
        ["kubejs:smd_inductor_optical", ["8x gtceu:fine_dubnium_wire", "gtceu:quantanium_ring"], ["16x kubejs:smd_inductor_optical"]]
    ]);

    gtr.circuit_assembler("kubejs:optical_processor")
        .itemInputs("kubejs:optical_processing_core", "4x kubejs:optical_ram_chip", "gtceu:highly_advanced_soc", "8x kubejs:smd_capacitor_optical",
            "8x kubejs:smd_transistor_optical", "8x gtceu:fine_dubnium_wire")
        .itemOutputs("4x kubejs:optical_processor").EUt(GTValues.VA[GTValues.UHV]).duration(200).cleanroom(CleanroomType.CLEANROOM)

    circuit_robots.slice(1).forEach((circuit_robot) => {
        batch(gtr, "circuit_assembly_line", [["notConsumable", "kubejs:precision_circuit_assembly_robot_mk" + circuit_robot], "itemInputs", "inputFluids", "itemOutputs",
            ["EUt", GTValues.VA[GTValues.ZPM] * (4 ** circuit_robot)], "duration"], [
            ["kubejs:optical_assembly" + circuit_robot,
                ["kubejs:optical_printed_circuit_board", "2x kubejs:optical_processor", "16x kubejs:smd_capacitor_optical",
                    "16x kubejs:smd_diode_optical", "16x kubejs:smd_resistor_optical", "16x kubejs:smd_transistor_optical",
                    "16x kubejs:smd_inductor_optical", "16x gtceu:fine_dubnium_wire", "24x kubejs:optical_ram_chip",
                    "8x gtceu:polyetheretherketone_foil", "2x gtceu:highurabilityompoundteel_plate"],
                ["gtceu:duranium 576", "gtceu:polyvinyl_chloride 1296", "gtceu:enriched_naquadah 1296"], ["2x kubejs:optical_assembly"],
                [400 * 16 / (4 ** circuit_robot)]],
            ["kubejs:optical_computer" + circuit_robot,
                ["kubejs:optical_printed_circuit_board", "2x kubejs:optical_assembly", "32x kubejs:smd_capacitor_optical",
                    "32x kubejs:smd_diode_optical", "32x kubejs:smd_resistor_optical", "32x kubejs:smd_transistor_optical",
                    "32x kubejs:smd_inductor_optical", "32x gtceu:fine_dubnium_wire", "32x kubejs:optical_ram_chip", "64x gtceu:nor_memory_chip",
                    "64x gtceu:nand_memory_chip", "2x kubejs:nm_chip", "16x gtceu:polyetheretherketone_foil", "gtceu:gravi_star",
                    "2x gtceu:seaborgium_plate"], ["gtceu:tritanium 576", "gtceu:polyetheretherketone 576", "gtceu:naquadria 1296"],
                ["kubejs:optical_computer"], [400 * 16 / (4 ** circuit_robot)]],
            ["kubejs:optical_mainframe" + circuit_robot,
                ["2x gtceu:quantanium_frame", "2x kubejs:optical_computer", "64x kubejs:smd_capacitor_optical", "64x kubejs:smd_diode_optical",
                    "64x kubejs:smd_resistor_optical", "64x kubejs:smd_transistor_optical", "64x kubejs:smd_inductor_optical",
                    "64x kubejs:optical_ram_chip", "4x kubejs:nm_chip", "16x gtceu:enderite_double_wire", "32x gtceu:polyetheretherketone_foil",
                    "2x gtceu:gravi_star", "2x gtceu:titansteel_plate"],
                ["gtceu:tritanium 1296", "gtceu:polyetheretherketone 1296", "gtceu:neutronium 576"], ["kubejs:optical_mainframe"],
                [800 * 16 / (4 ** circuit_robot)]]
        ]);
    })

    // 奇异电路路线
    batch(gtr, "assembler", ["itemInputs", ["inputFluids", "gtceu:fullerene_polymer_matrix_pulp 72"], "itemOutputs", ["EUt", GTValues.VA[GTValues.UEV]], ["duration", 100],
        ["cleanroom", CleanroomType.CLEANROOM]], [
        ["kubejs:smd_transistor_exotic", ["gtceu:degenerate_rhenium_plate", "gtceu:dubnium_plate", "2x gtceu:duranium_foil"],
            ["16x kubejs:smd_transistor_exotic"]],
        ["kubejs:smd_capacitor_exotic", ["gtceu:glowstone_plate", "gtceu:quantum_plate", "2x gtceu:cinobite_foil", "2x gtceu:carbon_nanotubes_foil"],
            ["16x kubejs:smd_capacitor_exotic"]],
        ["kubejs:smd_resistor_exotic",
            ["4x gtceu:fine_cinobite_wire", "gtceu:quantum_dust", "2x gtceu:indium_tin_barium_titanium_cuprate_foil", "2x gtceu:enderite_foil"],
            ["16x kubejs:smd_resistor_exotic"]],
        ["kubejs:smd_diode_exotic", ["gtceu:enderite_plate", "gtceu:trinium_titanium_plate", "2x gtceu:dubnium_foil", "2x gtceu:quantum_foil"],
            ["16x kubejs:smd_diode_exotic"]],
        ["kubejs:smd_inductor_exotic", ["8x gtceu:fine_cinobite_wire", "gtceu:adamantium_ring"], ["16x kubejs:smd_inductor_exotic"]]
    ]);

    gtr.circuit_assembler("kubejs:exotic_processor")
        .itemInputs("kubejs:exotic_processing_core", "4x kubejs:exotic_ram_chip", "gtceu:highly_advanced_soc", "8x kubejs:smd_capacitor_exotic",
            "8x kubejs:smd_transistor_exotic", "8x gtceu:fine_cinobite_wire")
        .itemOutputs("4x kubejs:exotic_processor").EUt(GTValues.VA[GTValues.UEV]).duration(200).cleanroom(CleanroomType.CLEANROOM)

    circuit_robots.slice(2).forEach((circuit_robot) => {
        batch(gtr, "circuit_assembly_line", [["notConsumable", "kubejs:precision_circuit_assembly_robot_mk" + circuit_robot], "itemInputs", "inputFluids", "itemOutputs",
            ["EUt", GTValues.VA[GTValues.ZPM] * (4 ** circuit_robot)], "duration"], [
            ["kubejs:exotic_assembly" + circuit_robot,
                ["kubejs:exotic_printed_circuit_board", "2x kubejs:exotic_processor", "16x kubejs:smd_capacitor_exotic", "16x kubejs:smd_diode_exotic",
                    "16x kubejs:smd_resistor_exotic", "16x kubejs:smd_transistor_exotic", "16x kubejs:smd_inductor_exotic", "kubejs:draconic_core",
                    "16x gtceu:fine_cinobite_wire", "24x kubejs:exotic_ram_chip", "16x gtceu:polyetheretherketone_foil", "2x gtceu:infuscolium_plate"],
                ["gtceu:tritanium 576", "gtceu:zylon 288", "gtceu:quantanium 288", "gtceu:naquadria 1296"], ["2x kubejs:exotic_assembly"],
                [400 * 64 / (4 ** circuit_robot)]],
            ["kubejs:exotic_computer" + circuit_robot,
                ["kubejs:exotic_printed_circuit_board", "2x kubejs:exotic_assembly", "32x kubejs:smd_capacitor_exotic", "32x kubejs:smd_diode_exotic",
                    "32x kubejs:smd_resistor_exotic", "32x kubejs:smd_transistor_exotic", "32x kubejs:smd_inductor_exotic",
                    "32x gtceu:fine_cinobite_wire", "32x kubejs:exotic_ram_chip", "64x gtceu:nor_memory_chip", "64x gtceu:nor_memory_chip",
                    "2x kubejs:pm_chip", "32x gtceu:polyetheretherketone_foil", "kubejs:unstable_star", "2x gtceu:adamantine_plate"],
                ["gtceu:enderium 576", "gtceu:zylon 576", "gtceu:quantanium 576", "gtceu:orichalcum 1296"], ["kubejs:exotic_computer"],
                [400 * 64 / (4 ** circuit_robot)]],
            ["kubejs:exotic_mainframe" + circuit_robot,
                ["2x gtceu:adamantium_frame", "2x kubejs:exotic_computer", "64x kubejs:smd_capacitor_exotic", "64x kubejs:smd_diode_exotic",
                    "64x kubejs:smd_resistor_exotic", "64x kubejs:smd_transistor_exotic", "64x kubejs:smd_inductor_exotic",
                    "64x kubejs:exotic_ram_chip", "16x gtceu:data_stick", "4x kubejs:pm_chip", "16x gtceu:echoite_double_wire",
                    "64x gtceu:polyetheretherketone_foil", "2x kubejs:unstable_star", "2x gtceu:black_titanium_plate",
                    "4x gtceu:double_technetium_plate"], ["gtceu:enderium 1296", "gtceu:zylon 1296", "gtceu:quantanium 1296", "gtceu:seaborgium 1296"],
                ["kubejs:exotic_mainframe"], [800 * 64 / (4 ** circuit_robot)]]
        ]);
    })

    // 宇宙电路路线
    batch(gtr, "assembler", ["itemInputs", ["inputFluids", "gtceu:fullerene_polymer_matrix_pulp 144"], "itemOutputs", ["EUt", GTValues.VA[GTValues.UIV]], ["duration", 100],
        ["cleanroom", CleanroomType.CLEANROOM]], [
        ["kubejs:smd_transistor_cosmic",
            ["8x gtceu:fine_hastelloyx_78_wire", "4x gtceu:degenerate_rhenium_plate", "gtceu:hassium_plate", "2x gtceu:polytetrafluoroethylene_foil"],
            ["16x kubejs:smd_transistor_cosmic"]],
        ["kubejs:smd_capacitor_cosmic",
            ["8x gtceu:fine_hastelloyx_78_wire", "4x gtceu:graphene_plate", "4x gtceu:taranium_foil", "2x gtceu:polycaprolactam_foil"],
            ["16x kubejs:smd_capacitor_cosmic"]],
        ["kubejs:smd_resistor_cosmic",
            ["8x gtceu:fine_hastelloyx_78_wire", "4x gtceu:black_titanium_plate", "2x gtceu:superheavy_l_alloy_plate", "2x gtceu:naquadah_alloy_foil"],
            ["16x kubejs:smd_resistor_cosmic"]],
        ["kubejs:smd_diode_cosmic",
            ["8x gtceu:fine_hastelloyx_78_wire", "4x gtceu:abyssalalloy_plate", "2x gtceu:superheavy_h_alloy_plate", "2x gtceu:niobium_nitride_foil"],
            ["16x kubejs:smd_diode_cosmic"]],
        ["kubejs:smd_inductor_cosmic", ["8x gtceu:fine_hastelloyx_78_wire", "gtceu:vibranium_ring"], ["16x kubejs:smd_inductor_cosmic"]]
    ]);

    gtr.circuit_assembler("kubejs:cosmic_processor")
        .itemInputs("kubejs:cosmic_processing_core", "4x kubejs:cosmic_ram_chip", "gtceu:highly_advanced_soc", "16x kubejs:smd_capacitor_cosmic",
            "16x kubejs:smd_transistor_cosmic", "8x gtceu:fine_cinobite_wire")
        .itemOutputs("4x kubejs:cosmic_processor").EUt(GTValues.VA[GTValues.UIV]).duration(200).cleanroom(CleanroomType.CLEANROOM)

    circuit_robots.slice(3).forEach((circuit_robot) => {
        batch(gtr, "circuit_assembly_line", [["notConsumable", "kubejs:precision_circuit_assembly_robot_mk" + circuit_robot], "itemInputs", "inputFluids", "itemOutputs",
            ["EUt", GTValues.VA[GTValues.ZPM] * (4 ** circuit_robot)], "duration"], [
            ["kubejs:cosmic_assembly" + circuit_robot,
                ["kubejs:cosmic_printed_circuit_board", "2x kubejs:cosmic_processor", "32x kubejs:smd_capacitor_cosmic", "32x kubejs:smd_diode_cosmic",
                    "32x kubejs:smd_resistor_cosmic", "32x kubejs:smd_transistor_cosmic", "32x kubejs:smd_inductor_cosmic", "kubejs:wyvern_core",
                    "4x gtceu:enderite_single_wire", "24x kubejs:cosmic_ram_chip", "16x gtceu:zylon_foil", "2x gtceu:cinobite_plate"],
                ["gtceu:mithril 576", "gtceu:fullerene_polymer_matrix_pulp 288", "gtceu:enriched_naquadah 576", "gtceu:adamantine 288"],
                ["2x kubejs:cosmic_assembly"], [400 * 256 / (4 ** circuit_robot)]],
            ["kubejs:cosmic_computer" + circuit_robot,
                ["kubejs:cosmic_printed_circuit_board", "2x kubejs:cosmic_assembly", "64x kubejs:smd_capacitor_cosmic", "64x kubejs:smd_diode_cosmic",
                    "64x kubejs:smd_resistor_cosmic", "64x kubejs:smd_transistor_cosmic", "64x kubejs:smd_inductor_cosmic",
                    "8x gtceu:echoite_single_wire", "32x kubejs:cosmic_ram_chip", "32x kubejs:exotic_ram_chip", "64x gtceu:nor_memory_chip",
                    "2x kubejs:fm_chip", "12x gtceu:fullerene_polymer_matrix_pulp_foil", "2x kubejs:unstable_star",
                    "4x gtceu:double_trinium_titanium_plate"],
                ["gtceu:mithril 1296", "gtceu:fullerene_polymer_matrix_pulp 576", "gtceu:infuscolium 1296"], ["kubejs:cosmic_computer"],
                [400 * 256 / (4 ** circuit_robot)]],
            ["kubejs:cosmic_mainframe" + circuit_robot,
                ["2x gtceu:vibranium_frame", "2x kubejs:cosmic_computer", "64x kubejs:smd_capacitor_cosmic", "64x kubejs:smd_diode_cosmic",
                    "64x kubejs:smd_resistor_cosmic", "64x kubejs:smd_transistor_cosmic", "64x kubejs:smd_inductor_cosmic",
                    "64x kubejs:cosmic_ram_chip", "16x gtceu:data_orb", "4x kubejs:fm_chip", "16x gtceu:legendarium_double_wire",
                    "64x gtceu:fullerene_polymer_matrix_pulp_foil", "4x kubejs:unstable_star", "16x kubejs:proto_matter",
                    "8x gtceu:double_naquadriatictaranium_plate"],
                ["gtceu:taranium 576", "gtceu:trinium_titanium 1296", "gtceu:fullerene_polymer_matrix_pulp 1296", "gtceu:rareearth 1296"],
                ["kubejs:cosmic_mainframe"], [800 * 256 / (4 ** circuit_robot)]]
        ]);
    })

    // 超因果电路路线
    batch(gtr, "assembler", [["notConsumable", "kubejs:microwormhole_generator"], "itemInputs", "itemOutputs", ["inputFluids", "gtceu:radox 144"],
        ["EUt", GTValues.VA[GTValues.UXV]], ["duration", 400], ["cleanroom", CleanroomType.CLEANROOM]], [
        ["kubejs:smd_capacitor_supracausal", ["gtceu:adamantine_plate"], ["32x kubejs:smd_capacitor_supracausal"]],
        ["kubejs:smd_diode_supracausal", ["gtceu:vibramantium_plate"], ["32x kubejs:smd_diode_supracausal"]],
        ["kubejs:smd_transistor_supracausal", ["gtceu:neutronium_plate"], ["32x kubejs:smd_transistor_supracausal"]],
        ["kubejs:smd_resistor_supracausal", ["gtceu:fullerene_polymer_matrix_pulp_foil"], ["32x kubejs:smd_resistor_supracausal"]],
        ["kubejs:smd_inductor_supracausal", ["gtceu:draconium_ring"], ["32x kubejs:smd_inductor_supracausal"]]
    ]);

    gtr.circuit_assembler("kubejs:supracausal_processor")
        .itemInputs("kubejs:supracausal_processing_core", "4x kubejs:supracausal_ram_chip", "16x kubejs:cosmic_processing_unit_core",
            "kubejs:microwormhole_generator", "kubejs:manifold_oscillatory_power_cell", "gtceu:crystalmatrix_plate")
        .itemOutputs("2x kubejs:supracausal_processor").EUt(GTValues.VA[GTValues.UXV]).duration(100).cleanroom(CleanroomType.CLEANROOM)

    batch(gtr, "circuit_assembly_line", [["notConsumable", "kubejs:precision_circuit_assembly_robot_mk5"], "itemInputs", "inputFluids", ["EUt", GTValues.VA[GTValues.UXV]], "itemOutputs",
        "duration"], [
        ["kubejs:supracausal_assembly",
            ["kubejs:supracausal_printed_circuit_board", "2x kubejs:supracausal_processor", "16x kubejs:smd_capacitor_supracausal",
                "16x kubejs:smd_diode_supracausal", "16x kubejs:smd_resistor_supracausal", "16x kubejs:smd_transistor_supracausal",
                "16x kubejs:smd_inductor_supracausal", "kubejs:awakened_core", "64x gtceu:fine_heavy_quark_degenerate_matter_wire",
                "16x gtceu:radox_foil", "8x gtceu:legendarium_single_wire", "8x kubejs:optical_soc", "kubejs:recursively_folded_negative_space",
                "kubejs:contained_exotic_matter", "16x gtceu:trinium_titanium_plate"],
            ["gtceu:taranium 432", "gtceu:trinium_titanium 1296", "gtceu:adamantine 576", "gtceu:fullerene_polymer_matrix_pulp 2304"],
            ["kubejs:supracausal_assembly"], [200]],
        ["kubejs:supracausal_computer",
            ["kubejs:supracausal_printed_circuit_board", "2x kubejs:supracausal_assembly", "32x kubejs:smd_capacitor_supracausal",
                "32x kubejs:smd_diode_supracausal", "32x kubejs:smd_resistor_supracausal", "32x kubejs:smd_transistor_supracausal",
                "32x kubejs:smd_inductor_supracausal", "32x kubejs:supracausal_ram_chip", "16x gtceu:data_module", "32x gtceu:trinium_titanium_plate",
                "64x gtceu:legendarium_single_wire", "16x gtceu:starmetal_plate", "kubejs:nuclear_star", "kubejs:eigenfolded_kerr_manifold",
                "4x gtceu:cosmicneutronium_plate"],
            ["gtceu:taranium 288", "gtceu:trinium_titanium 1296", "gtceu:adamantine 432", "gtceu:fullerene_polymer_matrix_pulp 864"],
            ["kubejs:supracausal_computer"], [200]],
        ["kubejs:supracausal_mainframe",
            ["2x gtceu:infinity_frame", "2x kubejs:supracausal_computer", "64x kubejs:smd_capacitor_supracausal", "64x kubejs:smd_diode_supracausal",
                "64x kubejs:smd_resistor_supracausal", "64x kubejs:smd_transistor_supracausal", "64x kubejs:smd_inductor_supracausal",
                "64x gtceu:radox_plate", "64x gtceu:draconiumawakened_double_wire", "64x kubejs:cosmic_fabric",
                "32x kubejs:cosmic_processing_unit_core", "8x kubejs:ultrashort_pulse_laser", "2x kubejs:nuclear_star",
                "kubejs:ctc_computational_unit", "64x gtceu:quantumchromodynamically_confined_matter_plate"],
            ["gtceu:taranium 9216", "gtceu:adamantine 9216", "gtceu:fullerene_polymer_matrix_pulp 9216", "gtceu:periodicium 9216"],
            ["kubejs:supracausal_mainframe"], [400]]
    ]);

    tiers.forEach((c) => {
        gtr.packer("kubejs:" + c[0] + "_universal_circuit")
            .itemInputs("#gtceu:circuits/" + c[0]).itemOutputs("kubejs:" + c[0] + "_universal_circuit").EUt(7).duration(2 ** (c[1] + 1))
    })

    tiers.forEach((c) => {
        gtr.suprachronal_assembly_line("kubejs:suprachronal_" + c[0])
            .notConsumable("kubejs:hyperdimensional_drone").itemInputs("kubejs:timepiece")
            .inputFluids("gtceu:spacetime " + (c[1] + 1), "gtceu:raw_star_matter_plasma " + (c[1] + 1) * 10, "gtceu:uu_matter " + (c[1] + 1) * 100,
                "gtceu:periodicium " + (c[1] + 1) * 100)
            .itemOutputs("kubejs:suprachronal_" + c[0]).duration(2 * (c[1] + 1)).circuit(c[1] + 1).EUt(GTValues.VA[GTValues.MAX])
            .stationResearch(b => b.researchStack(Registries.getItemStack((c[1] + 1) == 1 ? "kubejs:supracausal_mainframe" : "kubejs:suprachronal_" + tiers[(c[1] + 1) - 2][0])).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(GTValues.VA[GTValues.MAX]).CWUt(8192))
    })
});
