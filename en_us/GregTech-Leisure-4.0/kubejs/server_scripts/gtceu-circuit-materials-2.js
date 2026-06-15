//priority: 96
ServerEvents.recipes((event) => {
    const gtr = event.recipes.gtceu

    //bioware
    gtr.circuit_assembler("kubejs:bioware_circuit_board")
        .itemInputs("32x gtceu:wetware_circuit_board", "8x gtlcore:electricaly_wired_petri_dish", "gtceu:uv_electric_pump", "2x gtceu:luv_sensor", "#gtceu:circuits/luv", "32x gtceu:vanadium_gallium_foil")
        .itemOutputs("32x kubejs:bioware_circuit_board")
        .EUt(GTValues.VA[GTValues.ZPM])
        .duration(2400)
        .cleanroom(CleanroomType.STERILE_CLEANROOM)

    gtr.chemical_reactor("kubejs:bioware_printed_circuit_board1")
        .itemInputs("kubejs:bioware_circuit_board", "32x gtceu:vanadium_gallium_foil")
        .inputFluids("gtceu:sodium_persulfate 20000")
        .itemOutputs("kubejs:bioware_printed_circuit_board")
        .EUt(1920)
        .duration(2100)
        .cleanroom(CleanroomType.STERILE_CLEANROOM)

    gtr.fluid_heater("gtceu:biohmediumsterilized")
        .inputFluids("gtceu:biomediumraw 100")
        .outputFluids("gtceu:biohmediumsterilized 100")
        .EUt(480)
        .duration(400)
        .cleanroom(CleanroomType.STERILE_CLEANROOM)

    gtr.incubator("gtceu:biomediumraw")
        .itemInputs("64x gtceu:stem_cells", "16x kubejs:tcetieseaweedextract", "gtceu:tritanium_dust")
        .inputFluids("gtceu:raw_growth_medium 1000")
        .outputFluids("gtceu:biomediumraw 1000")
        .EUt(1920)
        .duration(1200)
        .addCondition(new GravityCondition(true))

    gtr.incubator("gtceu:biomediumraw1")
        .itemInputs("64x kubejs:biological_cells", "16x kubejs:tcetieseaweedextract", "gtceu:tritanium_dust")
        .inputFluids("gtceu:raw_growth_medium 10000")
        .outputFluids("gtceu:biomediumraw 10000")
        .EUt(1920)
        .duration(1200)
        .addCondition(new GravityCondition(true))

    gtr.extractor("kubejs:tcetieseaweedextract")
        .itemInputs("64x kubejs:tcetiedandelions")
        .itemOutputs("kubejs:tcetieseaweedextract")
        .EUt(16)
        .duration(200)
        .addCondition(new GravityCondition(false))

    gtr.centrifuge("kubejs:tcetiedandelions")
        .inputFluids("gtceu:seaweedbroth 1000")
        .itemOutputs("64x kubejs:tcetiedandelions")
        .EUt(120)
        .duration(200)
        .addCondition(new GravityCondition(false))

    gtr.incubator("gtceu:seaweedbroth")
        .itemInputs("64x minecraft:kelp", "20x gtceu:alien_algae_dust", "8x gtceu:energium_dust", "gtceu:mithril_dust")
        .inputFluids("gtceu:unknownnutrientagar 50000", "gtceu:methane 50000")
        .outputFluids("gtceu:seaweedbroth 50000")
        .EUt(7680)
        .duration(4800)

    gtr.large_chemical_reactor("gtceu:unknownnutrientagar")
        .inputFluids("gtceu:unknowwater 4000", "gtceu:phthalic_acid 4000")
        .itemInputs("16x gtceu:salt_dust", "16x gtceu:meat_dust", "16x gtceu:agar_dust")
        .outputFluids("gtceu:unknownnutrientagar 8000")
        .EUt(1920)
        .duration(800)
        .cleanroom(CleanroomType.STERILE_CLEANROOM)

    gtr.precision_assembler("kubejs:bioware_boule")
        .itemInputs("gtceu:neutronium_wafer", "16x kubejs:biological_cells", "gtceu:small_actinium_dust", "gtceu:small_strontium_dust")
        .inputFluids("gtceu:biohmediumsterilized 1000", "gtceu:lubricant 1000", "gtceu:nitrogen 10000")
        .itemOutputs("kubejs:bioware_boule")
        .EUt(GTValues.VA[GTValues.UV])
        .duration(600)
        .cleanroom(CleanroomType.STERILE_CLEANROOM)

    gtr.cutter("kubejs:bioware_chip")
        .itemInputs("kubejs:bioware_boule")
        .itemOutputs("16x kubejs:bioware_chip", "8x kubejs:biological_cells")
        .EUt(GTValues.VA[GTValues.UV])
        .duration(600)
        .cleanroom(CleanroomType.STERILE_CLEANROOM)

    gtr.assembler("kubejs:smd_transistor_bioware")
        .itemInputs("8x gtceu:fine_naquadah_alloy_wire", "2x gtceu:germaniumtungstennitride_plate", "2x gtceu:silicon_carbide_plate")
        .inputFluids("gtceu:polyimide 288")
        .itemOutputs("16x kubejs:smd_transistor_bioware")
        .EUt(GTValues.VA[GTValues.UV])
        .duration(100)
        .cleanroom(CleanroomType.STERILE_CLEANROOM)

    gtr.assembler("kubejs:smd_capacitor_bioware")
        .itemInputs("8x gtceu:fine_naquadah_alloy_wire", "8x gtceu:silicon_foil", "4x gtceu:naquadah_foil")
        .inputFluids("gtceu:polyimide 288")
        .itemOutputs("16x kubejs:smd_capacitor_bioware")
        .EUt(GTValues.VA[GTValues.UV])
        .duration(100)
        .cleanroom(CleanroomType.STERILE_CLEANROOM)

    gtr.assembler("kubejs:smd_resistor_bioware")
        .itemInputs("8x gtceu:fine_naquadah_alloy_wire", "gtceu:naquadria_plate", "gtceu:tritanium_plate")
        .inputFluids("gtceu:polyimide 288")
        .itemOutputs("16x kubejs:smd_resistor_bioware")
        .EUt(GTValues.VA[GTValues.UV])
        .duration(100)
        .cleanroom(CleanroomType.STERILE_CLEANROOM)

    gtr.assembler("kubejs:smd_diode_bioware")
        .itemInputs("8x gtceu:fine_naquadah_alloy_wire", "gtceu:lutetium_dust", "gtceu:tritanium_dust")
        .inputFluids("gtceu:polyimide 288")
        .itemOutputs("16x kubejs:smd_diode_bioware")
        .EUt(GTValues.VA[GTValues.UV])
        .duration(100)
        .cleanroom(CleanroomType.STERILE_CLEANROOM)

    gtr.assembler("kubejs:smd_inductor_bioware")
        .itemInputs("8x gtceu:fine_naquadah_alloy_wire", "gtceu:naquadah_alloy_ring")
        .inputFluids("gtceu:polyimide 288")
        .itemOutputs("16x kubejs:smd_inductor_bioware")
        .EUt(GTValues.VA[GTValues.UV])
        .duration(100)
        .cleanroom(CleanroomType.STERILE_CLEANROOM)

    gtr.circuit_assembler("kubejs:bioware_processor")
        .itemInputs("kubejs:bioware_processing_core",
            "4x gtceu:qbit_cpu_chip",
            "gtceu:highly_advanced_soc",
            "8x kubejs:smd_capacitor_bioware",
            "8x kubejs:smd_transistor_bioware",
            "8x gtceu:fine_naquadah_wire")
        .itemOutputs("4x kubejs:bioware_processor")
        .EUt(GTValues.VA[GTValues.UV])
        .duration(200)
        .cleanroom(CleanroomType.STERILE_CLEANROOM)

    const circuit_robots = [1, 2, 3, 4, 5]
    circuit_robots.forEach((circuit_robot) => {
        gtr.circuit_assembly_line("kubejs:bioware_assembly" + circuit_robot)
            .notConsumable("kubejs:precision_circuit_assembly_robot_mk" + circuit_robot)
            .itemInputs("kubejs:bioware_printed_circuit_board",
                "2x kubejs:bioware_processor",
                "16x kubejs:smd_capacitor_bioware",
                "16x kubejs:smd_diode_bioware",
                "16x kubejs:smd_resistor_bioware",
                "16x kubejs:smd_transistor_bioware",
                "16x kubejs:smd_inductor_bioware",
                "16x gtceu:fine_naquadah_wire",
                "48x gtceu:ram_chip",
                "16x gtceu:polybenzimidazole_foil",
                "2x gtceu:duranium_plate")
            .inputFluids("gtceu:biohmediumsterilized 1000", "gtceu:americium 576", "gtceu:polyethylene 2592", "gtceu:enriched_naquadah 1296")
            .itemOutputs("2x kubejs:bioware_assembly")
            .EUt(GTValues.VA[GTValues.ZPM] * (4 ** circuit_robot))
            .duration(400 * 4 / (4 ** circuit_robot))

        gtr.circuit_assembly_line("kubejs:bioware_computer" + circuit_robot)
            .notConsumable("kubejs:precision_circuit_assembly_robot_mk" + circuit_robot)
            .itemInputs("kubejs:bioware_printed_circuit_board",
                "2x kubejs:bioware_assembly",
                "32x kubejs:smd_capacitor_bioware",
                "32x kubejs:smd_diode_bioware",
                "32x kubejs:smd_resistor_bioware",
                "32x kubejs:smd_transistor_bioware",
                "32x kubejs:smd_inductor_bioware",
                "32x gtceu:fine_naquadah_wire",
                "64x gtceu:ram_chip",
                "32x gtceu:nor_memory_chip",
                "2x gtceu:uhpic_chip",
                "32x gtceu:polybenzimidazole_foil",
                "2x gtceu:neutronium_plate")
            .inputFluids("gtceu:biohmediumsterilized 1000", "gtceu:darmstadtium 576", "gtceu:polybenzimidazole 1296", "gtceu:enriched_naquadah 1296")
            .itemOutputs("kubejs:bioware_computer")
            .EUt(GTValues.VA[GTValues.ZPM] * (4 ** circuit_robot))
            .duration(400 * 4 / (4 ** circuit_robot))

        gtr.circuit_assembly_line("kubejs:bioware_mainframe" + circuit_robot)
            .notConsumable("kubejs:precision_circuit_assembly_robot_mk" + circuit_robot)
            .itemInputs("2x gtceu:neutronium_frame",
                "2x kubejs:bioware_computer",
                "64x kubejs:smd_capacitor_bioware",
                "64x kubejs:smd_diode_bioware",
                "64x kubejs:smd_resistor_bioware",
                "64x kubejs:smd_transistor_bioware",
                "64x kubejs:smd_inductor_bioware",
                "64x gtceu:ram_chip",
                "4x gtceu:uhpic_chip",
                "16x gtceu:ruthenium_trinium_americium_neutronate_double_wire",
                "64x gtceu:polybenzimidazole_foil",
                "gtceu:gravi_star",
                "2x gtceu:mithril_plate")
            .inputFluids("gtceu:biohmediumsterilized 1000", "gtceu:darmstadtium 1296", "gtceu:polybenzimidazole 2592", "gtceu:naquadria 1296")
            .itemOutputs("kubejs:bioware_mainframe")
            .EUt(GTValues.VA[GTValues.ZPM] * (4 ** circuit_robot))
            .duration(800 * 4 / (4 ** circuit_robot))
    })

    //optical
    gtr.mass_fabricator("gtceu:quasifissioning_plasma")
        .inputFluids("gtceu:uranium 144")
        .itemInputs("gtceu:uranium_ingot")
        .outputFluids("gtceu:quasifissioning_plasma 144")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(200)

    gtr.decay_hastener("gtceu:flyb_plasma")
        .inputFluids("gtceu:quasifissioning_plasma 1000")
        .outputFluids("gtceu:flyb_plasma 1000")
        .EUt(122880)
        .duration(160)

    gtr.decay_hastener("gtceu:hafnium")
        .inputFluids("gtceu:ytterbium_178 144")
        .outputFluids("gtceu:hafnium 144")
        .EUt(30720)
        .duration(120)

    gtr.decay_hastener("gtceu:polonium_dust")
        .inputFluids("gtceu:bismuth 144")
        .itemOutputs("gtceu:polonium_dust")
        .EUt(480)
        .duration(8000)

    gtr.decay_hastener("gtceu:copper76_dust")
        .inputFluids("gtceu:copper 144")
        .itemOutputs("gtceu:copper76_dust")
        .EUt(1920)
        .duration(4000)

    gtr.centrifuge("gtceu:flerovium")
        .inputFluids("gtceu:flyb_plasma 1000")
        .outputFluids("gtceu:flerovium 288", "gtceu:ytterbium_178 288")
        .EUt(1920)
        .duration(290)

    gtr.assembler("kubejs:smd_transistor_optical")
        .itemInputs("8x gtceu:fine_dubnium_wire", "4x gtceu:polyetheretherketone_foil", "2x gtceu:nether_star_plate", "2x gtceu:molybdenum_disilicide_plate")
        .inputFluids("gtceu:polyimide 576")
        .itemOutputs("16x kubejs:smd_transistor_optical")
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(100)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.assembler("kubejs:smd_capacitor_optical")
        .itemInputs("8x gtceu:fine_dubnium_wire", "4x gtceu:polyetheretherketone_foil", "2x gtceu:tritanium_foil")
        .inputFluids("gtceu:polyimide 576")
        .itemOutputs("16x kubejs:smd_capacitor_optical")
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(100)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.assembler("kubejs:smd_resistor_optical")
        .itemInputs("8x gtceu:fine_dubnium_wire", "4x gtceu:polyetheretherketone_foil", "3x gtceu:sodium_seaborgate_dust", "2x gtceu:ender_eye_plate")
        .inputFluids("gtceu:polyimide 576")
        .itemOutputs("16x kubejs:smd_resistor_optical")
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(100)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.assembler("kubejs:smd_diode_optical")
        .itemInputs("8x gtceu:fine_dubnium_wire", "4x gtceu:polyetheretherketone_foil", "2x gtceu:vanadium_gallium_plate", "2x gtceu:beryllium_plate")
        .inputFluids("gtceu:polyimide 576")
        .itemOutputs("16x kubejs:smd_diode_optical")
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(100)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.assembler("kubejs:smd_inductor_optical")
        .itemInputs("8x gtceu:fine_dubnium_wire", "gtceu:quantanium_ring")
        .inputFluids("gtceu:polyimide 576")
        .itemOutputs("16x kubejs:smd_inductor_optical")
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(100)
        .cleanroom(CleanroomType.CLEANROOM)


    gtr.circuit_assembler("kubejs:optical_processor")
        .itemInputs("kubejs:optical_processing_core",
            "4x kubejs:optical_ram_chip",
            "gtceu:highly_advanced_soc",
            "8x kubejs:smd_capacitor_optical",
            "8x kubejs:smd_transistor_optical",
            "8x gtceu:fine_dubnium_wire")
        .itemOutputs("4x kubejs:optical_processor")
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(200)
        .cleanroom(CleanroomType.CLEANROOM)

    circuit_robots.slice(1).forEach((circuit_robot) => {
        gtr.circuit_assembly_line("kubejs:optical_assembly" + circuit_robot)
            .notConsumable("kubejs:precision_circuit_assembly_robot_mk" + circuit_robot)
            .itemInputs("kubejs:optical_printed_circuit_board",
                "2x kubejs:optical_processor",
                "16x kubejs:smd_capacitor_optical",
                "16x kubejs:smd_diode_optical",
                "16x kubejs:smd_resistor_optical",
                "16x kubejs:smd_transistor_optical",
                "16x kubejs:smd_inductor_optical",
                "16x gtceu:fine_dubnium_wire",
                "24x kubejs:optical_ram_chip",
                "8x gtceu:polyetheretherketone_foil",
                "2x gtceu:highurabilityompoundteel_plate")
            .inputFluids("gtceu:duranium 576", "gtceu:polyvinyl_chloride 1296", "gtceu:enriched_naquadah 1296")
            .itemOutputs("2x kubejs:optical_assembly")
            .EUt(GTValues.VA[GTValues.ZPM] * (4 ** circuit_robot))
            .duration(400 * 16 / (4 ** circuit_robot))

        gtr.circuit_assembly_line("kubejs:optical_computer" + circuit_robot)
            .notConsumable("kubejs:precision_circuit_assembly_robot_mk" + circuit_robot)
            .itemInputs("kubejs:optical_printed_circuit_board",
                "2x kubejs:optical_assembly",
                "32x kubejs:smd_capacitor_optical",
                "32x kubejs:smd_diode_optical",
                "32x kubejs:smd_resistor_optical",
                "32x kubejs:smd_transistor_optical",
                "32x kubejs:smd_inductor_optical",
                "32x gtceu:fine_dubnium_wire",
                "32x kubejs:optical_ram_chip",
                "64x gtceu:nor_memory_chip",
                "64x gtceu:nand_memory_chip",
                "2x kubejs:nm_chip",
                "16x gtceu:polyetheretherketone_foil",
                "gtceu:gravi_star",
                "2x gtceu:seaborgium_plate")
            .inputFluids("gtceu:tritanium 576", "gtceu:polyetheretherketone 576", "gtceu:naquadria 1296")
            .itemOutputs("kubejs:optical_computer")
            .EUt(GTValues.VA[GTValues.ZPM] * (4 ** circuit_robot))
            .duration(400 * 16 / (4 ** circuit_robot))

        gtr.circuit_assembly_line("kubejs:optical_mainframe" + circuit_robot)
            .notConsumable("kubejs:precision_circuit_assembly_robot_mk" + circuit_robot)
            .itemInputs("2x gtceu:quantanium_frame",
                "2x kubejs:optical_computer",
                "64x kubejs:smd_capacitor_optical",
                "64x kubejs:smd_diode_optical",
                "64x kubejs:smd_resistor_optical",
                "64x kubejs:smd_transistor_optical",
                "64x kubejs:smd_inductor_optical",
                "64x kubejs:optical_ram_chip",
                "4x kubejs:nm_chip",
                "16x gtceu:enderite_double_wire",
                "32x gtceu:polyetheretherketone_foil",
                "2x gtceu:gravi_star",
                "2x gtceu:titansteel_plate")
            .inputFluids("gtceu:tritanium 1296", "gtceu:polyetheretherketone 1296", "gtceu:neutronium 576")
            .itemOutputs("kubejs:optical_mainframe")
            .EUt(GTValues.VA[GTValues.ZPM] * (4 ** circuit_robot))
            .duration(800 * 16 / (4 ** circuit_robot))
    })

    //exotic
    gtr.assembler("kubejs:smd_transistor_exotic")
        .itemInputs("gtceu:degenerate_rhenium_plate", "gtceu:dubnium_plate", "2x gtceu:duranium_foil")
        .inputFluids("gtceu:fullerene_polymer_matrix_pulp 72")
        .itemOutputs("16x kubejs:smd_transistor_exotic")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(100)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.assembler("kubejs:smd_capacitor_exotic")
        .itemInputs("gtceu:glowstone_plate", "gtceu:quantum_plate", "2x gtceu:cinobite_foil", "2x gtceu:carbon_nanotubes_foil")
        .inputFluids("gtceu:fullerene_polymer_matrix_pulp 72")
        .itemOutputs("16x kubejs:smd_capacitor_exotic")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(100)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.assembler("kubejs:smd_resistor_exotic")
        .itemInputs("4x gtceu:fine_cinobite_wire", "gtceu:quantum_dust", "2x gtceu:indium_tin_barium_titanium_cuprate_foil", "2x gtceu:enderite_foil")
        .inputFluids("gtceu:fullerene_polymer_matrix_pulp 72")
        .itemOutputs("16x kubejs:smd_resistor_exotic")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(100)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.assembler("kubejs:smd_diode_exotic")
        .itemInputs("gtceu:enderite_plate", "gtceu:trinium_titanium_plate", "2x gtceu:dubnium_foil", "2x gtceu:quantum_foil")
        .inputFluids("gtceu:fullerene_polymer_matrix_pulp 72")
        .itemOutputs("16x kubejs:smd_diode_exotic")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(100)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.assembler("kubejs:smd_inductor_exotic")
        .itemInputs("8x gtceu:fine_cinobite_wire", "gtceu:adamantium_ring")
        .inputFluids("gtceu:fullerene_polymer_matrix_pulp 72")
        .itemOutputs("16x kubejs:smd_inductor_exotic")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(100)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.circuit_assembler("kubejs:exotic_processor")
        .itemInputs("kubejs:exotic_processing_core",
            "4x kubejs:exotic_ram_chip",
            "gtceu:highly_advanced_soc",
            "8x kubejs:smd_capacitor_exotic",
            "8x kubejs:smd_transistor_exotic",
            "8x gtceu:fine_cinobite_wire")
        .itemOutputs("4x kubejs:exotic_processor")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(200)
        .cleanroom(CleanroomType.CLEANROOM)

    circuit_robots.slice(2).forEach((circuit_robot) => {
        gtr.circuit_assembly_line("kubejs:exotic_assembly" + circuit_robot)
            .notConsumable("kubejs:precision_circuit_assembly_robot_mk" + circuit_robot)
            .itemInputs("kubejs:exotic_printed_circuit_board",
                "2x kubejs:exotic_processor",
                "16x kubejs:smd_capacitor_exotic",
                "16x kubejs:smd_diode_exotic",
                "16x kubejs:smd_resistor_exotic",
                "16x kubejs:smd_transistor_exotic",
                "16x kubejs:smd_inductor_exotic",
                "kubejs:draconic_core",
                "16x gtceu:fine_cinobite_wire",
                "24x kubejs:exotic_ram_chip",
                "16x gtceu:polyetheretherketone_foil",
                "2x gtceu:infuscolium_plate")
            .inputFluids("gtceu:tritanium 576", "gtceu:zylon 288", "gtceu:quantanium 288", "gtceu:naquadria 1296")
            .itemOutputs("2x kubejs:exotic_assembly")
            .EUt(GTValues.VA[GTValues.ZPM] * (4 ** circuit_robot))
            .duration(400 * 64 / (4 ** circuit_robot))

        gtr.circuit_assembly_line("kubejs:exotic_computer" + circuit_robot)
            .notConsumable("kubejs:precision_circuit_assembly_robot_mk" + circuit_robot)
            .itemInputs("kubejs:exotic_printed_circuit_board",
                "2x kubejs:exotic_assembly",
                "32x kubejs:smd_capacitor_exotic",
                "32x kubejs:smd_diode_exotic",
                "32x kubejs:smd_resistor_exotic",
                "32x kubejs:smd_transistor_exotic",
                "32x kubejs:smd_inductor_exotic",
                "32x gtceu:fine_cinobite_wire",
                "32x kubejs:exotic_ram_chip",
                "64x gtceu:nor_memory_chip",
                "64x gtceu:nor_memory_chip",
                "2x kubejs:pm_chip",
                "32x gtceu:polyetheretherketone_foil",
                "kubejs:unstable_star",
                "2x gtceu:adamantine_plate")
            .inputFluids("gtceu:enderium 576", "gtceu:zylon 576", "gtceu:quantanium 576", "gtceu:orichalcum 1296")
            .itemOutputs("kubejs:exotic_computer")
            .EUt(GTValues.VA[GTValues.ZPM] * (4 ** circuit_robot))
            .duration(400 * 64 / (4 ** circuit_robot))

        gtr.circuit_assembly_line("kubejs:exotic_mainframe" + circuit_robot)
            .notConsumable("kubejs:precision_circuit_assembly_robot_mk" + circuit_robot)
            .itemInputs("2x gtceu:adamantium_frame",
                "2x kubejs:exotic_computer",
                "64x kubejs:smd_capacitor_exotic",
                "64x kubejs:smd_diode_exotic",
                "64x kubejs:smd_resistor_exotic",
                "64x kubejs:smd_transistor_exotic",
                "64x kubejs:smd_inductor_exotic",
                "64x kubejs:exotic_ram_chip",
                "16x gtceu:data_stick",
                "4x kubejs:pm_chip",
                "16x gtceu:echoite_double_wire",
                "64x gtceu:polyetheretherketone_foil",
                "2x kubejs:unstable_star",
                "2x gtceu:black_titanium_plate",
                "4x gtceu:double_technetium_plate")
            .inputFluids("gtceu:enderium 1296", "gtceu:zylon 1296", "gtceu:quantanium 1296", "gtceu:seaborgium 1296")
            .itemOutputs("kubejs:exotic_mainframe")
            .EUt(GTValues.VA[GTValues.ZPM] * (4 ** circuit_robot))
            .duration(800 * 64 / (4 ** circuit_robot))
    })

    //cosmic
    gtr.assembler("kubejs:smd_transistor_cosmic")
        .itemInputs("8x gtceu:fine_hastelloyx_78_wire", "4x gtceu:degenerate_rhenium_plate", "gtceu:hassium_plate", "2x gtceu:polytetrafluoroethylene_foil")
        .inputFluids("gtceu:fullerene_polymer_matrix_pulp 144")
        .itemOutputs("16x kubejs:smd_transistor_cosmic")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(100)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.assembler("kubejs:smd_capacitor_cosmic")
        .itemInputs("8x gtceu:fine_hastelloyx_78_wire", "4x gtceu:graphene_plate", "4x gtceu:taranium_foil", "2x gtceu:polycaprolactam_foil")
        .inputFluids("gtceu:fullerene_polymer_matrix_pulp 144")
        .itemOutputs("16x kubejs:smd_capacitor_cosmic")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(100)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.assembler("kubejs:smd_resistor_cosmic")
        .itemInputs("8x gtceu:fine_hastelloyx_78_wire", "4x gtceu:black_titanium_plate", "2x gtceu:superheavy_l_alloy_plate", "2x gtceu:naquadah_alloy_foil")
        .inputFluids("gtceu:fullerene_polymer_matrix_pulp 144")
        .itemOutputs("16x kubejs:smd_resistor_cosmic")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(100)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.assembler("kubejs:smd_diode_cosmic")
        .itemInputs("8x gtceu:fine_hastelloyx_78_wire", "4x gtceu:abyssalalloy_plate", "2x gtceu:superheavy_h_alloy_plate", "2x gtceu:niobium_nitride_foil")
        .inputFluids("gtceu:fullerene_polymer_matrix_pulp 144")
        .itemOutputs("16x kubejs:smd_diode_cosmic")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(100)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.assembler("kubejs:smd_inductor_cosmic")
        .itemInputs("8x gtceu:fine_hastelloyx_78_wire", "gtceu:vibranium_ring")
        .inputFluids("gtceu:fullerene_polymer_matrix_pulp 144")
        .itemOutputs("16x kubejs:smd_inductor_cosmic")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(100)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.circuit_assembler("kubejs:cosmic_processor")
        .itemInputs("kubejs:cosmic_processing_core",
            "4x kubejs:cosmic_ram_chip",
            "gtceu:highly_advanced_soc",
            "16x kubejs:smd_capacitor_cosmic",
            "16x kubejs:smd_transistor_cosmic",
            "8x gtceu:fine_cinobite_wire")
        .itemOutputs("4x kubejs:cosmic_processor")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(200)
        .cleanroom(CleanroomType.CLEANROOM)

    circuit_robots.slice(3).forEach((circuit_robot) => {
        gtr.circuit_assembly_line("kubejs:cosmic_assembly" + circuit_robot)
            .notConsumable("kubejs:precision_circuit_assembly_robot_mk" + circuit_robot)
            .itemInputs("kubejs:cosmic_printed_circuit_board",
                "2x kubejs:cosmic_processor",
                "32x kubejs:smd_capacitor_cosmic",
                "32x kubejs:smd_diode_cosmic",
                "32x kubejs:smd_resistor_cosmic",
                "32x kubejs:smd_transistor_cosmic",
                "32x kubejs:smd_inductor_cosmic",
                "kubejs:wyvern_core",
                "4x gtceu:enderite_single_wire",
                "24x kubejs:cosmic_ram_chip",
                "16x gtceu:zylon_foil",
                "2x gtceu:cinobite_plate")
            .inputFluids("gtceu:mithril 576", "gtceu:fullerene_polymer_matrix_pulp 288", "gtceu:enriched_naquadah 576", "gtceu:adamantine 288")
            .itemOutputs("2x kubejs:cosmic_assembly")
            .EUt(GTValues.VA[GTValues.ZPM] * (4 ** circuit_robot))
            .duration(400 * 256 / (4 ** circuit_robot))

        gtr.circuit_assembly_line("kubejs:cosmic_computer" + circuit_robot)
            .notConsumable("kubejs:precision_circuit_assembly_robot_mk" + circuit_robot)
            .itemInputs("kubejs:cosmic_printed_circuit_board",
                "2x kubejs:cosmic_assembly",
                "64x kubejs:smd_capacitor_cosmic",
                "64x kubejs:smd_diode_cosmic",
                "64x kubejs:smd_resistor_cosmic",
                "64x kubejs:smd_transistor_cosmic",
                "64x kubejs:smd_inductor_cosmic",
                "8x gtceu:echoite_single_wire",
                "32x kubejs:cosmic_ram_chip",
                "32x kubejs:exotic_ram_chip",
                "64x gtceu:nor_memory_chip",
                "2x kubejs:fm_chip",
                "12x gtceu:fullerene_polymer_matrix_pulp_foil",
                "2x kubejs:unstable_star",
                "4x gtceu:double_trinium_titanium_plate")
            .inputFluids("gtceu:mithril 1296", "gtceu:fullerene_polymer_matrix_pulp 576", "gtceu:infuscolium 1296")
            .itemOutputs("kubejs:cosmic_computer")
            .EUt(GTValues.VA[GTValues.ZPM] * (4 ** circuit_robot))
            .duration(400 * 256 / (4 ** circuit_robot))

        gtr.circuit_assembly_line("kubejs:cosmic_mainframe" + circuit_robot)
            .notConsumable("kubejs:precision_circuit_assembly_robot_mk" + circuit_robot)
            .itemInputs("2x gtceu:vibranium_frame",
                "2x kubejs:cosmic_computer",
                "64x kubejs:smd_capacitor_cosmic",
                "64x kubejs:smd_diode_cosmic",
                "64x kubejs:smd_resistor_cosmic",
                "64x kubejs:smd_transistor_cosmic",
                "64x kubejs:smd_inductor_cosmic",
                "64x kubejs:cosmic_ram_chip",
                "16x gtceu:data_orb",
                "4x kubejs:fm_chip",
                "16x gtceu:legendarium_double_wire",
                "64x gtceu:fullerene_polymer_matrix_pulp_foil",
                "4x kubejs:unstable_star",
                "16x kubejs:proto_matter",
                "8x gtceu:double_naquadriatictaranium_plate")
            .inputFluids("gtceu:taranium 576", "gtceu:trinium_titanium 1296", "gtceu:fullerene_polymer_matrix_pulp 1296", "gtceu:rareearth 1296")
            .itemOutputs("kubejs:cosmic_mainframe")
            .EUt(GTValues.VA[GTValues.ZPM] * (4 ** circuit_robot))
            .duration(800 * 256 / (4 ** circuit_robot))
    })
})
