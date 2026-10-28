// priority: 95
// 光学、奇异与宇宙电路路线的基础材料。
// 由 gtceu.js 按既有阶段顺序执行，本文件只登记配方，不依赖文件名排序。
global.gtlPack.register("circuit_materials", event => {
    const gtr = event.recipes.gtceu;
    const batch = global.gtlPack.batch;

    // 光学电路路线
    gtr.forming_press("kubejs:optical_soc_containment_housing")
        .itemInputs("gtceu:multilayer_fiber_reinforced_printed_circuit_board", "gtceu:titanium_foil", "gtceu:yttrium_barium_cuprate_foil",
            "gtceu:nickel_zinc_ferrite_foil", "gtceu:uranium_rhodium_dinaquadide_foil", "4x gtceu:darmstadtium_bolt")
        .itemOutputs("kubejs:optical_soc_containment_housing").EUt(GTValues.VA[GTValues.ZPM]).duration(290).cleanroom(CleanroomType.CLEANROOM)

    gtr.precision_assembler("kubejs:optical_soc")
        .itemInputs("kubejs:optical_soc_containment_housing", "kubejs:optical_slice", "8x gtceu:gold_bolt", "8x gtceu:fine_zinc_wire")
        .inputFluids("gtceu:lumiium 144", "gtceu:mutated_living_solder 144", "gtceu:soldering_alloy 288", "gtceu:helium 100")
        .itemOutputs("kubejs:optical_soc").EUt(GTValues.VA[GTValues.UHV]).duration(400).cleanroom(CleanroomType.CLEANROOM)

    gtr.canner("kubejs:bose_einstein_cooling_container")
        .notConsumable("gtceu:iridium_nanoswarm").inputFluids("gtceu:rubidium 288").itemInputs("kubejs:empty_laser_cooling_container")
        .itemOutputs("kubejs:bose_einstein_cooling_container").EUt(90000).duration(280).cleanroom(CleanroomType.CLEANROOM)

    gtr.electric_blast_furnace("gtceu:cubic_zirconia_dust")
        .itemInputs("gtceu:zirconium_dust").itemOutputs("3x gtceu:cubic_zirconia_dust").inputFluids("gtceu:oxygen 2000").EUt(480).duration(360)
        .blastFurnaceTemp(2600)

    gtr.assembler("kubejs:ballast")
        .itemInputs("2x gtceu:fine_annealed_copper_wire", "gtceu:resistor", "gtceu:inductor", "gtceu:double_annealed_copper_plate")
        .itemOutputs("kubejs:ballast").inputFluids("gtceu:soldering_alloy 144").EUt(1920).duration(290)

    batch(gtr, "assembler", ["itemInputs", "itemOutputs", "inputFluids", "EUt", "duration", ["cleanroom", CleanroomType.CLEANROOM]], [
        ["kubejs:laser_diode", ["2x gtceu:fine_gold_wire", "kubejs:smd_diode_bioware", "gtceu:amethyst_lens", "gtceu:double_nichrome_plate"],
            ["kubejs:laser_diode"], ["gtceu:soldering_alloy 288"], [980000], [260]],
        ["kubejs:laser_cooling_unit", ["4x gtceu:fine_gold_wire", "gtceu:frostproof_machine_casing", "kubejs:laser_diode", "#gtceu:circuits/hv"],
            ["kubejs:laser_cooling_unit"], ["gtceu:soldering_alloy 288"], [1200000], [300]],
        ["kubejs:empty_laser_cooling_container",
            ["8x gtceu:steel_plate", "kubejs:laser_cooling_unit", "kubejs:magnetic_trap", "2x gtceu:double_magnalium_plate"],
            ["kubejs:empty_laser_cooling_container"], ["gtceu:soldering_alloy 144"], [1150000], [380]],
        ["kubejs:magnetic_trap",
            ["2x gtceu:enriched_naquadah_trinium_europium_duranide_double_wire", "gtceu:frostproof_machine_casing", "gtceu:double_kanthal_plate"],
            ["kubejs:magnetic_trap"], ["gtceu:soldering_alloy 432"], [1000000], [480]]
    ]);

    batch(gtr, "assembler", ["itemInputs", "itemOutputs", ["inputFluids", "gtceu:nitrogen 1000"], ["EUt", 7680], ["duration", 110]], [
        ["kubejs:red_halide_lamp",
            ["2x gtceu:electrum_foil", "gtceu:potassium_bromide_dust", "4x gtceu:strontium_europium_aluminate_dust", "2x gtceu:cubic_zirconia_plate",
                "4x gtceu:maraging_steel_300_rod", "2x gtceu:borosilicate_glass_ingot", "kubejs:ballast", "gtceu:glass_tube",
                "2x gtceu:molybdenum_foil"], ["kubejs:red_halide_lamp"]],
        ["kubejs:green_halide_lamp",
            ["2x gtceu:electrum_foil", "gtceu:iridium_chloride_dust", "4x gtceu:strontium_europium_aluminate_dust", "2x gtceu:cubic_zirconia_plate",
                "4x gtceu:maraging_steel_300_rod", "2x gtceu:borosilicate_glass_ingot", "kubejs:ballast", "gtceu:glass_tube",
                "2x gtceu:molybdenum_foil"], ["kubejs:green_halide_lamp"]],
        ["kubejs:blue_halide_lamp",
            ["2x gtceu:electrum_foil", "gtceu:titanium_trifluoride_dust", "4x gtceu:strontium_europium_aluminate_dust",
                "2x gtceu:cubic_zirconia_plate", "4x gtceu:maraging_steel_300_rod", "2x gtceu:borosilicate_glass_ingot", "kubejs:ballast",
                "gtceu:glass_tube", "2x gtceu:molybdenum_foil"], ["kubejs:blue_halide_lamp"]]
    ]);

    gtr.electric_blast_furnace("gtceu:strontium_europium_aluminate_dust")
        .itemInputs("2x gtceu:aluminium_dust", "gtceu:europium_dust", "gtceu:strontium_dust").inputFluids("gtceu:oxygen 4000")
        .itemOutputs("8x gtceu:strontium_europium_aluminate_dust").EUt(120).duration(340).blastFurnaceTemp(1200)

    gtr.chemical_reactor("kubejs:highly_reflective_mirror")
        .itemInputs("gtceu:germanium_plate").inputFluids("gtceu:hydrogen_sulfide 1000", "gtceu:zinc 144")
        .itemOutputs("kubejs:highly_reflective_mirror").EUt(710000).duration(240).cleanroom(CleanroomType.CLEANROOM)

    gtr.large_chemical_reactor("gtceu:lithium_niobate_nanoparticles_dust")
        .notConsumable("gtceu:hafnium_dust").itemInputs("2x gtceu:lithium_dust", "gtceu:niobium_dust").inputFluids("gtceu:oxygen 3000")
        .itemOutputs("6x gtceu:lithium_niobate_nanoparticles_dust").EUt(GTValues.VA[GTValues.UHV]).duration(1200)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.autoclave("kubejs:periodically_poled_lithium_niobate_boule")
        .notConsumable("kubejs:electron_source").itemInputs("2x gtceu:lithium_niobate_nanoparticles_dust").inputFluids("gtceu:xenon 1000")
        .itemOutputs("kubejs:periodically_poled_lithium_niobate_boule").EUt(GTValues.VA[GTValues.UHV]).duration(600)
        .cleanroom(CleanroomType.CLEANROOM)

    batch(gtr, "assembler", ["itemInputs", ["inputFluids", "gtceu:soldering_alloy 144"], "itemOutputs", "EUt", ["duration", 200], ["cleanroom", CleanroomType.CLEANROOM]], [
        ["kubejs:electron_source",
            ["gtceu:mendelevium_plate", "gtceu:radium_dust", "6x gtceu:polyetheretherketone_plate", "4x gtceu:polybenzimidazole_plate",
                "4x gtceu:steel_plate"], ["kubejs:electron_source"], [750000]],
        ["kubejs:rotating_transparent_surface", ["4x gtceu:graphene_plate", "gtceu:uhv_electric_motor"], ["kubejs:rotating_transparent_surface"],
            [1250000]]
    ]);

    gtr.lathe("kubejs:non_linear_optical_lens")
        .itemInputs("kubejs:periodically_poled_lithium_niobate_boule").itemOutputs("kubejs:non_linear_optical_lens")
        .EUt(GTValues.VA[GTValues.UHV]).duration(360).cleanroom(CleanroomType.CLEANROOM)

    gtr.large_chemical_reactor("gtceu:sodium_seaborgate_dust")
        .itemInputs("gtceu:seaborgium_dust", "6x gtceu:sodium_hydroxide_dust").inputFluids("gtceu:fluorine 6000", "minecraft:water 1000")
        .outputFluids("gtceu:hydrofluoric_acid 6000").itemOutputs("7x gtceu:sodium_seaborgate_dust").EUt(GTValues.VA[GTValues.UHV]).duration(200)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.cutter("kubejs:optical_slice")
        .itemInputs("kubejs:optical_wafer").itemOutputs("16x kubejs:optical_slice").EUt(GTValues.VA[GTValues.UHV]).duration(560)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.large_chemical_reactor("kubejs:optical_wafer")
        .itemInputs("2x gtceu:francium_caesium_cadmium_bromide_dust", "kubejs:photon_carrying_wafer", "gtceu:glowstone_nanoswarm")
        .inputFluids("gtceu:seaborgium_doped_nanotubes 144", "gtceu:carbon_nanotubes 144").itemOutputs("kubejs:optical_wafer")
        .EUt(GTValues.VA[GTValues.UHV]).duration(400).cleanroom(CleanroomType.CLEANROOM)

    gtr.chemical_bath("kubejs:photon_carrying_wafer")
        .itemInputs("kubejs:raw_photon_carrying_wafer").inputFluids("gtceu:blaze 288").itemOutputs("kubejs:photon_carrying_wafer").EUt(1920)
        .duration(800).cleanroom(CleanroomType.CLEANROOM)

    gtr.electric_blast_furnace("gtceu:francium_caesium_cadmium_bromide_dust")
        .itemInputs("2x gtceu:cadmium_dust", "gtceu:francium_dust", "gtceu:caesium_dust").inputFluids("gtceu:bromine 6000")
        .itemOutputs("10x gtceu:francium_caesium_cadmium_bromide_dust").EUt(120).duration(250).blastFurnaceTemp(2200)

    gtr.large_chemical_reactor("gtceu:seaborgium_doped_nanotubes")
        .itemInputs("gtceu:seaborgium_dust").notConsumable("gtceu:rhenium_plate")
        .inputFluids("gtceu:methane 800", "gtceu:cycloparaphenylene 200").outputFluids("gtceu:seaborgium_doped_nanotubes 144").EUt(320000)
        .duration(390).cleanroom(CleanroomType.CLEANROOM)

    // 奇异电路路线
    gtr.laser_engraver("kubejs:exotic_wafer")
        .notConsumable("gtceu:magenta_glass_lens").itemInputs("gtceu:highly_advanced_soc_wafer").itemOutputs("kubejs:exotic_wafer")
        .EUt(GTValues.VA[GTValues.UHV]).duration(600).cleanroom(CleanroomType.CLEANROOM)

    gtr.cutter("kubejs:exotic_chip")
        .itemInputs("kubejs:exotic_wafer").itemOutputs("4x kubejs:exotic_chip").EUt(GTValues.VA[GTValues.UHV]).duration(900)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.precision_assembler("kubejs:x_ray_laser")
        .itemInputs("kubejs:x_ray_waveguide", "gtlcore:microfocus_x_ray_tube", "gtceu:exquisite_jasper_gem", "kubejs:x_ray_mirror_plate")
        .itemOutputs("kubejs:x_ray_laser")
        .inputFluids("gtceu:mutated_living_solder 144", "gtceu:soldering_alloy 288", "gtceu:iridium 144", "gtceu:californium_cyclopentadienide 10")
        .EUt(GTValues.VA[GTValues.UV]).duration(320).cleanroom(CleanroomType.CLEANROOM)

    gtr.assembler("gtlcore:microfocus_x_ray_tube")
        .itemInputs("4x gtceu:fine_enderium_wire", "gtceu:echoite_rod", "gtceu:glass_tube", "gtceu:double_palladium_plate")
        .itemOutputs("gtlcore:microfocus_x_ray_tube").EUt(8000).duration(160).cleanroom(CleanroomType.CLEANROOM)

    gtr.chemical_reactor("gtceu:acetic_acid_from_methanol")
        .circuit(3).inputFluids("gtceu:carbon_monoxide 1000", "gtceu:methanol 1000").outputFluids("gtceu:acetic_acid 1000")
        .EUt(GTValues.VA[GTValues.LV]).duration(300)

    gtr.chemical_bath("kubejs:x_ray_mirror_plate")
        .itemInputs("gtceu:graphene_plate").inputFluids("gtceu:iridium_trichloride_solution 100").itemOutputs("kubejs:x_ray_mirror_plate")
        .EUt(2000000).duration(240).cleanroom(CleanroomType.CLEANROOM)

    gtr.mixer("gtceu:iridium_trichloride_solution")
        .itemInputs("4x gtceu:iridium_chloride_dust").inputFluids("gtceu:hypochlorous_acid 1000", "gtceu:nitric_acid 1000")
        .outputFluids("gtceu:iridium_trichloride_solution 1000").EUt(1920).duration(360)

    gtr.chemical_bath("kubejs:x_ray_waveguide")
        .itemInputs("kubejs:fullerene_polymer_matrix_fine_tubing").inputFluids("gtceu:iridium_trichloride_solution 100")
        .itemOutputs("kubejs:x_ray_waveguide").EUt(8000000).duration(240).cleanroom(CleanroomType.CLEANROOM)

    gtr.precision_assembler("kubejs:rydberg_spinorial_assembly")
        .itemInputs("kubejs:cryogenic_interface", "kubejs:rotating_transparent_surface", "kubejs:exotic_chip", "kubejs:x_ray_waveguide")
        .notConsumableFluid("gtceu:xenon 10").inputFluids("gtceu:quantum_dots 10", "gtceu:zylon 144", "gtceu:liquid_hydrogen 10")
        .itemOutputs("kubejs:rydberg_spinorial_assembly").EUt(GTValues.VA[GTValues.UEV]).duration(560).cleanroom(CleanroomType.CLEANROOM)

    gtr.assembler("kubejs:cryogenic_interface")
        .itemInputs("gtceu:double_graphene_plate", "8x gtceu:graphene_foil", "gtceu:fine_trinium_titanium_wire", "8x gtceu:mendelevium_foil",
            "2x gtceu:zirconium_carbide_plate")
        .inputFluids("gtceu:zylon 72").itemOutputs("kubejs:cryogenic_interface").EUt(8000).duration(160).cleanroom(CleanroomType.CLEANROOM)

    gtr.chemical_reactor("gtceu:quantum_dots")
        .itemInputs("gtceu:selenium_dust", "gtceu:cadmium_dust").inputFluids("gtceu:stearic_acid 1000", "gtceu:tricotylphosphine 1000")
        .outputFluids("gtceu:quantum_dots 1000").EUt(5000000).duration(160).cleanroom(CleanroomType.CLEANROOM)

    gtr.chemical_reactor("gtceu:deglycerated_soap")
        .inputFluids("gtceu:soap 1000").itemInputs("gtceu:salt_dust").outputFluids("gtceu:deglycerated_soap 800", "gtceu:glycerol 200").EUt(2000)
        .duration(160)

    batch(gtr, "chemical_reactor", [["itemInputs", "3x gtceu:sodium_hydroxide_dust"], "inputFluids", ["outputFluids", "gtceu:soap 1000"], ["EUt", 2000], ["duration", 160]], [
        ["gtceu:soap_1", ["gtceu:steam 2000", "gtceu:fish_oil 100"]],
        ["gtceu:soap_2", ["gtceu:steam 2000", "gtceu:seed_oil 100"]]
    ]);

    gtr.chemical_reactor("gtceu:tricotylphosphine")
        .inputFluids("gtceu:octane 3000").itemInputs("gtceu:phosphorus_dust").outputFluids("gtceu:tricotylphosphine 1000").EUt(2000)
        .duration(160)

    // 宇宙电路路线
    gtr.sps_crafting("kubejs:photocoated_hassium_boule")
        .itemInputs("gtceu:silicon_boule", "2x gtceu:hassium_ingot", "kubejs:hassium_seed_crystal")
        .inputFluids("gtceu:mana 10000", "gtceu:woods_glass 2304", "gtceu:photopolymer 2000").itemOutputs("kubejs:photocoated_hassium_boule")
        .EUt(GTValues.VA[GTValues.UEV]).duration(1000)

    gtr.cutter("kubejs:photocoated_hassium_wafer")
        .itemInputs("kubejs:photocoated_hassium_boule").itemOutputs("4x kubejs:photocoated_hassium_wafer").EUt(GTValues.VA[GTValues.UIV])
        .duration(280).cleanroom(CleanroomType.CLEANROOM)

    gtr.precision_assembler("kubejs:lithography_mask")
        .itemInputs("64x gtceu:fine_borosilicate_glass_wire", "16x gtceu:polytetrafluoroethylene_foil")
        .inputFluids("gtceu:polyethylene 288", "gtceu:polytetrafluoroethylene 288", "gtceu:polycaprolactam 288", "gtceu:polyvinyl_butyral 288")
        .itemOutputs("kubejs:lithography_mask").EUt(GTValues.VA[GTValues.UV]).duration(1200).cleanroom(CleanroomType.STERILE_CLEANROOM)

    gtr.assembler("kubejs:grating_lithography_mask")
        .itemInputs("kubejs:lithography_mask", "gtceu:glass_lens").itemOutputs("kubejs:grating_lithography_mask").EUt(1920).duration(200)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.laser_engraver("kubejs:diffractor_grating_mirror")
        .itemInputs("kubejs:photocoated_hassium_wafer").notConsumable("kubejs:grating_lithography_mask")
        .itemOutputs("kubejs:diffractor_grating_mirror").EUt(GTValues.VA[GTValues.UIV]).duration(600).cleanroom(CleanroomType.CLEANROOM)

    gtr.large_chemical_reactor("gtceu:cosmic_computing_mixture")
        .notConsumable("gtceu:vibranium_nanoswarm")
        .inputFluids("gtceu:gluons 1000", "gtceu:heavy_quarks 1000", "gtceu:heavy_lepton_mixture 1000")
        .outputFluids("gtceu:cosmic_computing_mixture 3000").EUt(24000000).duration(100).cleanroom(CleanroomType.CLEANROOM)

    gtr.precision_assembler("kubejs:cosmic_processing_unit_core")
        .itemInputs("6x gtceu:fine_heavy_quark_degenerate_matter_wire", "4x kubejs:cosmic_soc", "3x gtceu:degenerate_rhenium_plate",
            "kubejs:empty_laser_cooling_container")
        .inputFluids("gtceu:cosmic_computing_mixture 1000", "gtceu:cosmic_superconductor 1000", "gtceu:fullerene_polymer_matrix_pulp 288",
            "gtceu:quantum_dots 100")
        .itemOutputs("kubejs:cosmic_processing_unit_core").EUt(GTValues.VA[GTValues.UIV]).duration(3500)
        .cleanroom(GTLCleanroomType.LAW_CLEANROOM)

    batch(gtr, "assembler", ["itemInputs", "inputFluids", "itemOutputs", "EUt", "duration", "cleanroom"], [
        ["kubejs:ultrashort_pulse_laser",
            ["4x kubejs:diffractor_grating_mirror", "8x gtceu:fine_borosilicate_glass_wire", "kubejs:high_frequency_laser",
                "2x kubejs:insulation_wire_assembly", "gtceu:yellow_garnet_rod", "gtceu:lapis_rod", "gtceu:exquisite_olivine_gem", "gtceu:ev_emitter",
                "gtceu:double_platinum_plate"], ["gtceu:soldering_alloy 288"], ["kubejs:ultrashort_pulse_laser"], [45000000], [270],
            [CleanroomType.CLEANROOM]],
        ["kubejs:insulation_wire_assembly",
            ["gtceu:reinforced_epoxy_resin_rod", "kubejs:aerographene", "gtlcore:highly_insulating_foil", "kubejs:memory_foam_block",
                "gtceu:fullerene_polymer_matrix_pulp_foil"], ["gtceu:polyimide 144"], ["kubejs:insulation_wire_assembly"], [480], [200],
            [GTLCleanroomType.LAW_CLEANROOM]]
    ]);

    gtr.chemical_bath("gtlcore:highly_insulating_foil")
        .itemInputs("gtceu:polyetheretherketone_foil").inputFluids("gtceu:azafullerene 10").itemOutputs("gtlcore:highly_insulating_foil")
        .EUt(7680).duration(70).cleanroom(CleanroomType.CLEANROOM)

    gtr.fluid_heater("gtceu:azafullerene")
        .notConsumable("36x gtceu:tiny_rhenium_dust").inputFluids("gtceu:aminated_fullerene 100").outputFluids("gtceu:azafullerene 100").EUt(480)
        .duration(120).cleanroom(CleanroomType.CLEANROOM)

    gtr.large_chemical_reactor("gtceu:aminated_fullerene")
        .itemInputs("gtceu:fullerene_dust")
        .inputFluids("gtceu:carbon_monoxide 4000", "minecraft:water 8000", "gtceu:tertbuthylcarbonylazide 4000")
        .outputFluids("gtceu:aminated_fullerene 1000", "gtceu:carbon_dioxide 8000", "gtceu:tert_butanol 4000").EUt(30720).duration(120)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.large_chemical_reactor("gtceu:tertbuthylcarbonylazide")
        .itemInputs("33x gtceu:ditertbutyl_dicarbonate_dust", "8x gtceu:sodium_azide_dust", "2x gtceu:potassium_dust")
        .itemOutputs("2x gtceu:sodium_dust", "6x gtceu:potash_dust").outputFluids("gtceu:tertbuthylcarbonylazide 2000").EUt(480).duration(110)

    gtr.chemical_reactor("gtceu:sodium_toluenesulfonate")
        .itemInputs("2x gtceu:salt_dust").inputFluids("gtceu:sulfuric_acid 1000", "gtceu:toluene 1000")
        .outputFluids("gtceu:sodium_toluenesulfonate 1000", "gtceu:diluted_hydrochloric_acid 1000").EUt(950).duration(220)

    gtr.chemical_reactor("gtceu:tert_butanol")
        .notConsumable("gtceu:magnesium_chloride_dust").itemInputs("gtceu:zeolite_sieving_pellets_dust")
        .inputFluids("gtceu:methane 1000", "gtceu:acetone 1000").outputFluids("gtceu:tert_butanol 1000")
        .itemOutputs("gtceu:wet_zeolite_sieving_pellets_dust").EUt(120).duration(126)

    gtr.chemical_reactor("gtceu:ditertbutyl_dicarbonate_dust")
        .notConsumableFluid("gtceu:sodium_toluenesulfonate 1000").inputFluids("gtceu:tert_butanol 2000", "gtceu:carbon_dioxide 2000")
        .outputFluids("minecraft:water 1000").itemOutputs("33x gtceu:ditertbutyl_dicarbonate_dust").EUt(480).duration(260)

    gtr.mixer("gtceu:heavy_quark_enriched_mixture")
        .inputFluids("gtceu:heavy_quarks 750", "gtceu:light_quarks 250").outputFluids("gtceu:heavy_quark_enriched_mixture 1000").EUt(32500000)
        .duration(100).cleanroom(CleanroomType.CLEANROOM)

    gtr.assembler("kubejs:graviton_transducer")
        .itemInputs("2x kubejs:quantumchromodynamic_protective_plating", "kubejs:contained_reissner_nordstrom_singularity", "kubejs:microwormhole_generator",
            "kubejs:dark_matter", "gtceu:uiv_sensor")
        .inputFluids("gtceu:neutronium 144").itemOutputs("kubejs:graviton_transducer").EUt(GTValues.VA[GTValues.UIV]).duration(600)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.precision_assembler("kubejs:topological_manipulator_unit")
        .itemInputs("2x kubejs:quantumchromodynamic_protective_plating", "kubejs:contained_kerr_newmann_singularity", "kubejs:microwormhole_generator",
            "gtceu:uhv_field_generator")
        .inputFluids("gtceu:antineutron 10", "gtceu:neutronium 144", "gtceu:arceusalloy2b 144", "gtceu:nitrogen 10000")
        .itemOutputs("kubejs:topological_manipulator_unit").EUt(GTValues.VA[GTValues.UIV]).duration(1800).cleanroom(CleanroomType.CLEANROOM)

    batch(gtr, "assembler_module", ["itemInputs", "inputFluids", "itemOutputs", "EUt", "duration", "addData"], [
        ["kubejs:relativistic_spinorial_memory_system",
            ["2x gtceu:neutron_reflector", "kubejs:rydberg_spinorial_assembly", "4x kubejs:charged_lepton_trap_crystal",
                "2x gtceu:legendarium_single_wire", "gtceu:uhv_field_generator", "gtceu:uiv_sensor", "gtceu:fusion_coil"],
            ["gtceu:uu_matter 10000", "gtceu:noble_gas 2000", "gtceu:cosmic_computing_mixture 1000", "gtceu:neutronium 1296"],
            ["kubejs:relativistic_spinorial_memory_system"], [GTValues.VA[GTValues.UXV]], [800], ["SEPMTier", 4]],
        ["kubejs:microwormhole_generator",
            ["2x gtceu:zpm_emitter", "2x gtceu:enriched_naquadah_trinium_europium_duranide_single_wire", "2x gtceu:neutronium_plate",
                "gtceu:zpm_field_generator", "kubejs:contained_kerr_singularity", "kubejs:void_matter", "gtceu:enderium_nanoswarm",
                "2x gtceu:celestialtungsten_plate"], ["gtceu:tritanium 576"], ["kubejs:microwormhole_generator"], [100000], [200], ["SEPMTier", 4]],
        ["kubejs:nuclear_clock",
            ["2x gtceu:uiv_sensor", "2x kubejs:ultrashort_pulse_laser", "2x gtceu:neutronium_plate", "kubejs:scintillator",
                "kubejs:bose_einstein_cooling_container", "gtceu:iron_nanoswarm", "gtceu:uv_naquadria_battery", "2x gtceu:double_rhodium_plate"],
            ["gtceu:thorium 144", "gtceu:black_titanium 1296"], ["kubejs:nuclear_clock"], [33550000], [1600], ["SEPMTier", 3]]
    ]);

    gtr.autoclave("kubejs:contained_kerr_singularity")
        .notConsumable("gtceu:vibranium_nanoswarm").itemInputs("kubejs:contained_kerr_newmann_singularity")
        .inputFluids("gtceu:free_electron_gas 1000").itemOutputs("kubejs:contained_kerr_singularity").EUt(GTValues.VA[GTValues.UHV])
        .duration(400).cleanroom(CleanroomType.CLEANROOM)

    batch(gtr, "assembler_module", ["itemInputs", ["inputFluids", "gtceu:naquadah_alloy 576"], "itemOutputs", "EUt", "duration", ["addData", "SEPMTier", 4]], [
        ["kubejs:macrowormhole_generator",
            ["4x gtceu:uv_emitter", "4x gtceu:uv_sensor", "2x gtceu:uv_field_generator", "kubejs:contained_high_density_protonic_matter",
                "kubejs:microwormhole_generator", "kubejs:contained_kerr_singularity", "gtceu:zpm_naquadria_battery", "kubejs:kinetic_matter"],
            ["kubejs:macrowormhole_generator"], [1000000], [400]],
        ["kubejs:stabilized_wormhole_generator",
            ["4x gtceu:uev_emitter", "4x gtceu:uev_sensor", "2x gtceu:uev_field_generator", "kubejs:contained_exotic_matter",
                "kubejs:macrowormhole_generator", "kubejs:contained_kerr_singularity", "gtceu:energy_cluster", "kubejs:omni_matter"],
            ["kubejs:stabilized_wormhole_generator"], [10000000], [800]]
    ]);

    gtr.precision_assembler("kubejs:ctc_guidance_unit")
        .itemInputs("64x kubejs:cosmic_ram_chip", "kubejs:supracausal_processing_core", "gtceu:data_module", "kubejs:nuclear_clock")
        .inputFluids("gtceu:arceusalloy2b 1296", "gtceu:super_mutated_living_solder 1296", "gtceu:trinium_titanium 1296", "gtceu:vibranium 1296")
        .itemOutputs("kubejs:ctc_guidance_unit").EUt(GTValues.VA[GTValues.UXV]).duration(1600).cleanroom(CleanroomType.CLEANROOM)

    gtr.assembler_module("kubejs:ctc_computational_unit_container")
        .itemInputs("36x gtceu:enriched_naquadah_plate", "36x gtceu:fullerene_polymer_matrix_pulp_plate", "6x gtceu:heavy_quark_degenerate_matter_plate",
            "3x gtceu:uhv_field_generator", "2x gtceu:taranium_plate", "kubejs:ctc_guidance_unit", "kubejs:manifold_oscillatory_power_cell",
            "4x gtceu:double_uranium_plate", "gtceu:dense_darmstadtium_plate", "gtceu:neutronium_frame", "kubejs:time_dilation_containment_unit",
            "kubejs:stabilized_wormhole_generator", "2x kubejs:dark_matter", "gtceu:starmetal_nanoswarm",
            "8x gtceu:double_black_dwarf_mtter_plate", "8x gtceu:double_trinium_plate")
        .inputFluids("gtceu:superheavy_l_alloy 1296", "gtceu:superheavy_h_alloy 1296", "gtceu:trinium_titanium 1296", "gtceu:adamantine 1296")
        .itemOutputs("kubejs:ctc_computational_unit_container").EUt(GTValues.VA[GTValues.UXV]).duration(800).addData("SEPMTier", 5)
});
