//priority: 96
ServerEvents.recipes((event) => {
    const gtr = event.recipes.gtceu

    const machine_materialas = [
        ["uhv", "europium", "1966080", "uv", "128", "kubejs:nm_chip"],
        ["uev", "mithril", "7864320", "uhv", "256", "kubejs:nm_chip"],
        ["uiv", "neutronium", "31457280", "uev", "512", "kubejs:pm_chip"],
        ["uxv", "taranium", "125829120", "uiv", "1024", "kubejs:pm_chip"],
        ["opv", "crystalmatrix", "503316480", "uxv", "2048", "kubejs:fm_chip"],
        ["max", "cosmicneutronium", "503316480", "opv", "4096", "kubejs:fm_chip"]
    ]
    machine_materialas.forEach((machine_material) => {
        gtr.assembly_line("gtceu:" + machine_material[0] + "_energy_input_hatch")
            .itemInputs("gtceu:" + machine_material[0] + "_machine_hull",
                "4x gtceu:" + machine_material[1] + "_single_cable",
                "2x " + machine_material[5],
                "#gtceu:circuits/" + machine_material[0],
                "2x kubejs:" + machine_material[0] + "_voltage_coil")
            .inputFluids("gtceu:sodium_potassium 10000", "gtceu:soldering_alloy 2880", "gtceu:mutated_living_solder 1296")
            .itemOutputs("gtceu:" + machine_material[0] + "_energy_input_hatch")
            .EUt(machine_material[2])
            .duration(800)
            .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:" + machine_material[3] + "_energy_input_hatch"))
                .dataStack(Registries.getItemStack("gtceu:data_module"))
                .EUt(machine_material[2])
                .CWUt(machine_material[4]))

        gtr.assembly_line("gtceu:" + machine_material[0] + "_energy_output_hatch")
            .itemInputs("gtceu:" + machine_material[0] + "_machine_hull",
                "4x #forge:springs/" + machine_material[1],
                "2x " + machine_material[5],
                "#gtceu:circuits/" + machine_material[0],
                "2x kubejs:" + machine_material[0] + "_voltage_coil")
            .inputFluids("gtceu:sodium_potassium 10000", "gtceu:soldering_alloy 2880", "gtceu:mutated_living_solder 1296")
            .itemOutputs("gtceu:" + machine_material[0] + "_energy_output_hatch")
            .EUt(machine_material[2])
            .duration(800)
            .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:" + machine_material[3] + "_energy_output_hatch"))
                .dataStack(Registries.getItemStack("gtceu:data_module"))
                .EUt(machine_material[2])
                .CWUt(machine_material[4]))
    })

    gtr.assembly_line("gtceu:magic_manufacturer")
        .itemInputs("8x gtceu:adamantium_plate",
            "16x gtceu:kanthal_rod",
            "16x gtceu:ultimet_screw",
            "16x minecraft:end_crystal",
            "16x kubejs:ballast",
            "gtceu:uev_electric_pump",
            "2x gtceu:uev_field_generator",
            "minecraft:dragon_egg",
            "4x #gtceu:circuits/uiv",
            "gtlcore:really_max_battery",
            "8x gtceu:dense_obsidian_plate",
            "16x gtceu:double_stellite_plate")
        .inputFluids("gtceu:soldering_alloy 2880", "gtceu:indalloy_140 2592", "gtceu:mutated_living_solder 1296", "gtceu:tairitsu 1296")
        .itemOutputs("gtceu:magic_manufacturer")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(600)
        .stationResearch(b => b.researchStack(Registries.getItemStack("kubejs:magic_core"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UEV])
            .CWUt(128))

    gtr.assembly_line("kubejs:draconic_energy_core")
        .itemInputs("kubejs:wyvern_energy_core",
            "64x gtceu:uv_lapotronic_battery",
            "16x kubejs:awakened_core",
            "16x kubejs:dragon_stabilizer_core",
            "8x #gtceu:circuits/opv",
            "gtceu:uv_solar_panel",
            "64x kubejs:smd_capacitor_cosmic",
            "64x kubejs:smd_diode_cosmic",
            "64x kubejs:smd_resistor_cosmic",
            "64x kubejs:smd_transistor_cosmic",
            "64x kubejs:smd_inductor_cosmic",
            "64x gtceu:draconiumawakened_block")
        .inputFluids("gtceu:super_mutated_living_solder 28800", "gtceu:draconiumawakened 28800", "gtceu:cosmicneutronium 14400", "gtceu:crystalmatrix 14400")
        .itemOutputs("kubejs:draconic_energy_core")
        .EUt(GTValues.VA[GTValues.OpV])
        .duration(2400)
        .stationResearch(b => b.researchStack(Registries.getItemStack("kubejs:wyvern_energy_core"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.OpV])
            .CWUt(1024))

    gtr.assembly_line("gtceu:super_computation")
        .itemInputs("16x gtceu:data_bank",
            "64x #gtceu:circuits/uev",
            "64x gtceu:uv_field_generator",
            "64x gtceu:uv_field_generator",
            "16x gtceu:data_module",
            "8x gtceu:gold_nanoswarm",
            "4x gtceu:hpca_bridge_component",
            "16x gtceu:computer_monitor_cover",
            "64x kubejs:optical_processing_core",
            "64x kubejs:high_precision_crystal_soc",
            "64x gtceu:enderite_quadruple_wire",
            "64x gtceu:normal_optical_pipe")
        .inputFluids("gtceu:mutated_living_solder 2880", "gtceu:vanadium_gallium 2880", "gtceu:pcb_coolant 16000", "kubejs:gelid_cryotheum 16000")
        .itemOutputs("gtceu:super_computation")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(600)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:high_performance_computation_array"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UEV])
            .CWUt(256))

    gtr.assembly_line("gtlcore:super_computation_component")
        .itemInputs("gtceu:hpca_advanced_computation_component",
            "gtceu:hpca_heat_sink_component",
            "4x #gtceu:circuits/uhv",
            "#gtceu:circuits/uev",
            "2x gtceu:zpm_field_generator",
            "gtceu:data_orb",
            "kubejs:high_precision_crystal_soc",
            "4x gtceu:normal_optical_pipe")
        .inputFluids("gtceu:soldering_alloy 576", "gtceu:vanadium_gallium 576", "gtceu:pcb_coolant 1000", "kubejs:gelid_cryotheum 1000")
        .itemOutputs("gtlcore:super_computation_component")
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(400)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:advanced_computer_casing"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UHV])
            .CWUt(128))

    gtr.assembly_line("gtceu:large_chemical_plant")
        .itemInputs("16x gtceu:large_chemical_reactor",
            "4x gtceu:neutronium_spring",
            "4x gtceu:uv_field_generator",
            "4x #gtceu:circuits/uev",
            "4x gtceu:polytetrafluoroethylene_nonuple_fluid_pipe",
            "8x gtceu:uhv_electric_motor",
            "16x gtceu:polytetrafluoroethylene_rod",
            "64x gtceu:polytetrafluoroethylene_foil",
            "16x gtceu:double_watertight_steel_plate")
        .inputFluids("gtceu:indalloy_140 2880", "gtceu:soldering_alloy 2880", "gtceu:polytetrafluoroethylene 2880")
        .itemOutputs("gtceu:large_chemical_plant")
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(400)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:chemical_plant"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UHV])
            .CWUt(64))

    gtr.assembly_line("gtceu:super_blast_smelter")
        .itemInputs("64x gtceu:tungsten_carbide_frame",
            "64x gtceu:mega_blast_furnace",
            "64x gtceu:mega_alloy_blast_smelter",
            "64x gtceu:uv_field_generator",
            "64x gtceu:iv_fluid_regulator",
            "64x #gtceu:circuits/uev",
            "64x gtceu:copper_nanoswarm",
            "64x gtceu:ruthenium_trinium_americium_neutronate_hex_wire",
            "14x gtceu:dense_tungsten_steel_plate",
            "14x gtceu:dense_rhodium_plated_palladium_plate",
            "14x gtceu:dense_naquadah_alloy_plate",
            "14x gtceu:dense_darmstadtium_plate",
            "64x gtceu:double_gallium_plate",
            "64x gtceu:double_chromium_plate",
            "64x gtceu:double_cobalt_plate",
            "64x gtceu:double_ruthenium_trinium_americium_neutronate_plate")
        .inputFluids("gtceu:cobalt 5760", "gtceu:niobium 5760", "gtceu:astatine 5760", "gtceu:actinium 5760")
        .itemOutputs("gtceu:super_blast_smelter")
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(1200)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:multi_smelter"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UHV])
            .CWUt(256))

    gtr.assembly_line("gtlcore:super_cooler_component")
        .itemInputs("gtceu:hpca_active_cooler_component",
            "gtceu:hpca_heat_sink_component",
            "4x gtceu:tungsten_large_fluid_pipe",
            "16x gtceu:naquadah_screw",
            "gtceu:zpm_fluid_regulator",
            "32x gtceu:fine_rhodium_wire")
        .inputFluids("gtceu:soldering_alloy 576", "gtceu:vanadium_gallium 576", "gtceu:pcb_coolant 1000", "kubejs:gelid_cryotheum 1000")
        .itemOutputs("gtlcore:super_cooler_component")
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(400)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:hpca_active_cooler_component"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UHV])
            .CWUt(128))

    gtr.assembly_line("gtceu:sps_crafting")
        .itemInputs("8x gtceu:double_americium_plate",
            "32x gtceu:uev_robot_arm",
            "8x gtceu:uev_fluid_regulator",
            "4x gtceu:long_rhodium_rod",
            "4x #gtceu:circuits/uiv",
            "4x gtceu:naquadah_nanoswarm",
            "kubejs:pellet_antimatter",
            "kubejs:rydberg_spinorial_assembly",
            "8x gtceu:degenerate_rhenium_plate",
            "16x gtceu:double_grisium_plate")
        .inputFluids("gtceu:mutated_living_solder 1296", "gtceu:artherium_sn 2880", "gtceu:soldering_alloy 2880", "gtceu:mana 10000")
        .itemOutputs("gtceu:sps_crafting")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(600)
        .stationResearch(b => b.researchStack(Registries.getItemStack("kubejs:pellet_antimatter"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UIV])
            .CWUt(256))

    gtr.assembly_line("gtceu:advanced_sps_crafting")
        .itemInputs("4x gtceu:uiv_emitter",
            "4x gtceu:uiv_sensor",
            "4x kubejs:rydberg_spinorial_assembly",
            "16x kubejs:pellet_antimatter",
            "16x minecraft:reinforced_deepslate",
            "64x minecraft:crying_obsidian",
            "64x minecraft:crying_obsidian",
            "4x #gtceu:circuits/uxv",
            "4x gtceu:uiv_field_generator",
            "gtlcore:really_max_battery",
            "16x gtceu:neutronium_nanoswarm",
            "16x gtceu:double_gold_plate")
        .inputFluids("gtceu:super_mutated_living_solder 864", "gtceu:mutated_living_solder 1296", "gtceu:soldering_alloy 2880", "gtceu:echoite 2880")
        .itemOutputs("gtceu:advanced_sps_crafting")
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(600)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:sps_crafting"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UXV])
            .CWUt(256))

    gtr.assembly_line("gtceu:mass_fabricator")
        .itemInputs("8x gtceu:double_black_titanium_plate",
            "4x gtceu:long_hsse_rod",
            "16x gtceu:adamantium_screw",
            "4x gtceu:uiv_field_generator",
            "gtceu:uiv_electric_pump",
            "4x gtceu:long_rhodium_rod",
            "4x #gtceu:circuits/uxv",
            "8x gtceu:enderium_nanoswarm",
            "8x gtceu:double_blue_alloy_plate",
            "32x gtceu:double_grisium_plate")
        .inputFluids("gtceu:soldering_alloy 2880", "gtceu:tairitsu 2880", "gtceu:indalloy_140 2592", "gtceu:mutated_living_solder 1296")
        .itemOutputs("gtceu:mass_fabricator")
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(600)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:matter_fabricator"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UXV])
            .CWUt(512))

    gtr.assembly_line("gtceu:matter_fabricator")
        .itemInputs("8x gtceu:double_tritanium_plate",
            "16x gtceu:long_bismuth_bronze_rod",
            "32x gtceu:sterling_silver_screw",
            "4x gtceu:ruthenium_trinium_americium_neutronate_octal_wire",
            "2x gtceu:uhv_field_generator",
            "4x #gtceu:circuits/uev",
            "16x gtceu:fluxed_electrum_plate",
            "16x gtceu:technetium_plate",
            "8x gtceu:double_abyssalalloy_plate",
            "16x gtceu:double_rose_gold_plate")
        .inputFluids("gtceu:soldering_alloy 1296", "gtceu:gold 1296", "gtceu:silicon_carbide 1296", "gtceu:aluminium_bronze 1296")
        .itemOutputs("gtceu:matter_fabricator")
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(800)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:large_recycler"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UHV])
            .CWUt(128))

    gtr.assembly_line("gtceu:assembler_module")
        .itemInputs("4x gtlcore:advanced_assembly_line_unit",
            "4x gtceu:uv_emitter",
            "4x gtceu:uv_sensor",
            "4x gtceu:uv_robot_arm",
            "4x gtceu:uv_conveyor_module",
            "4x #gtceu:circuits/uhv",
            "4x gtceu:enriched_naquadah_trinium_europium_duranide_hex_wire",
            "8x gtceu:double_pikyonium_plate")
        .inputFluids("gtceu:soldering_alloy 2880", "gtceu:artherium_sn 2880")
        .itemOutputs("gtceu:assembler_module")
        .EUt(GTValues.VA[GTValues.UV])
        .duration(1200)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:advanced_assembly_line"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UV])
            .CWUt(256))

    gtr.assembly_line("gtceu:resource_collection")
        .itemInputs("gtceu:large_void_miner",
            "gtceu:void_fluid_drilling_rig",
            "4x gtceu:uv_robot_arm",
            "16x gtceu:stellite_gear",
            "4x gtceu:uv_conveyor_module",
            "4x #gtceu:circuits/uhv",
            "4x gtceu:enriched_naquadah_trinium_europium_duranide_hex_wire",
            "8x gtceu:double_pikyonium_plate")
        .inputFluids("gtceu:soldering_alloy 2880", "gtceu:artherium_sn 2880")
        .itemOutputs("gtceu:resource_collection")
        .EUt(GTValues.VA[GTValues.UV])
        .duration(1200)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:luv_large_miner"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UV])
            .CWUt(256))

    gtr.assembly_line("gtlcore:power_module")
        .itemInputs("gtceu:hssg_frame", "2x gtceu:iv_field_generator", "4x gtceu:luv_conveyor_module", "gtceu:uv_electric_motor", "4x gtceu:battery_alloy_rod", "2x gtceu:small_darmstadtium_gear", "4x gtceu:advanced_power_thruster", "6x gtceu:double_blue_steel_plate")
        .inputFluids("gtceu:indalloy_140 864", "gtceu:soldering_alloy 1152", "gtceu:curium 1152", "gtceu:lubricant 2304")
        .itemOutputs("gtlcore:power_module")
        .EUt(GTValues.VA[GTValues.LuV])
        .duration(400)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:gravitation_engine_unit"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.LuV])
            .CWUt(64))

    gtr.assembly_line("gtlcore:power_module_2")
        .itemInputs("gtlcore:power_module", "2x gtceu:luv_field_generator", "4x gtceu:zpm_conveyor_module", "gtceu:uhv_electric_motor", "2x gtceu:small_neutronium_gear", "6x gtceu:double_fluxed_electrum_plate")
        .inputFluids("gtceu:indalloy_140 864", "gtceu:soldering_alloy 1152", "gtceu:berkelium 1152", "gtceu:lubricant 2304")
        .itemOutputs("gtlcore:power_module_2")
        .EUt(GTValues.VA[GTValues.ZPM])
        .duration(400)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtlcore:power_module"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.ZPM])
            .CWUt(128))

    gtr.assembly_line("gtlcore:power_module_3")
        .itemInputs("gtlcore:power_module_2", "2x gtceu:zpm_field_generator", "4x gtceu:uv_conveyor_module", "gtceu:uev_electric_motor", "2x gtceu:small_quantanium_gear", "6x gtceu:double_titansteel_plate")
        .inputFluids("gtceu:indalloy_140 864", "gtceu:soldering_alloy 1152", "gtceu:californium 1152", "gtceu:lubricant 2304")
        .itemOutputs("gtlcore:power_module_3")
        .EUt(GTValues.VA[GTValues.UV])
        .duration(400)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtlcore:power_module_2"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UV])
            .CWUt(256))

    gtr.assembly_line("gtlcore:power_module_4")
        .itemInputs("gtlcore:power_module_3", "2x gtceu:uv_field_generator", "4x gtceu:uhv_conveyor_module", "gtceu:uiv_electric_motor", "2x gtceu:small_infuscolium_gear", "6x gtceu:double_uruium_plate")
        .inputFluids("gtceu:indalloy_140 864", "gtceu:soldering_alloy 1152", "gtceu:fermium 1152", "gtceu:lubricant 2304")
        .itemOutputs("gtlcore:power_module_4")
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(400)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtlcore:power_module_3"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UHV])
            .CWUt(512))

    gtr.assembly_line("gtlcore:power_module_5")
        .itemInputs("gtlcore:power_module_4", "2x gtceu:uhv_field_generator", "4x gtceu:uev_conveyor_module", "gtceu:uxv_electric_motor", "gtceu:small_vibramantium_gear", "6x gtceu:double_celestialtungsten_plate")
        .inputFluids("gtceu:indalloy_140 864", "gtceu:soldering_alloy 1152", "gtceu:mendelevium 1152", "gtceu:lubricant 2304")
        .itemOutputs("gtlcore:power_module_5")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(400)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtlcore:power_module_4"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UEV])
            .CWUt(1024))

    gtr.assembly_line("gtceu:stellar_forge")
        .itemInputs("4x gtlcore:stellar_containment_casing",
            "64x gtceu:naquadah_alloy_bolt",
            "32x gtceu:trinium_plate",
            "64x gtceu:darmstadtium_screw",
            "64x gtceu:highurabilityompoundteel_rod",
            "32x gtceu:titanium_tungsten_carbide_gear",
            "32x kubejs:nm_chip",
            "8x #gtceu:circuits/uev",
            "8x gtceu:uhv_sensor",
            "8x gtceu:uhv_emitter",
            "4x gtceu:uhv_field_generator",
            "gtceu:max_battery")
        .inputFluids("gtceu:soldering_alloy 20736", "gtceu:neutronium 2880", "gtceu:protactinium 2880", "gtceu:fermium 2880")
        .itemOutputs("gtceu:stellar_forge")
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(600)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtlcore:stellar_containment_casing"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UHV])
            .CWUt(256))

    gtr.assembly_line("gtceu:plasma_condenser")
        .itemInputs("64x gtceu:inconel_792_screw",
            "16x gtceu:rhodium_plated_palladium_plate",
            "16x gtceu:small_neutronium_gear",
            "8x gtceu:tungsten_carbide_gear",
            "4x gtceu:uhv_electric_motor",
            "4x gtceu:uhv_electric_pump",
            "2x #gtceu:circuits/uev",
            "4x kubejs:magnetic_trap",
            "2x gtceu:copper_nanoswarm",
            "4x gtceu:uhv_sensor",
            "8x gtceu:double_tungsten_plate",
            "16x gtceu:double_zirconium_carbide_plate")
        .inputFluids("gtceu:soldering_alloy 5760", "gtceu:zirconium_carbide 5760", "gtceu:tungsten_carbide 5760", "gtceu:tantalum_carbide 5760")
        .itemOutputs("gtceu:plasma_condenser")
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(300)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:mega_vacuum_freezer"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UHV])
            .CWUt(64))

    gtr.assembly_line("gtceu:void_fluid_drilling_rig")
        .itemInputs("gtceu:mv_fluid_drilling_rig",
            "gtceu:hv_fluid_drilling_rig",
            "gtceu:ev_fluid_drilling_rig",
            "4x gtceu:mv_field_generator",
            "4x gtceu:hv_field_generator",
            "4x gtceu:ev_field_generator",
            "4x #gtceu:circuits/luv",
            "16x gtceu:hsse_screw",
            "4x gtceu:long_hssg_rod",
            "8x gtceu:hsse_plate")
        .inputFluids("gtceu:soldering_alloy 1440")
        .itemOutputs("gtceu:void_fluid_drilling_rig")
        .EUt(GTValues.VA[GTValues.LuV])
        .duration(600)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:ev_fluid_drilling_rig"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.LuV])
            .CWUt(64))

    gtr.assembly_line("gtceu:large_void_miner")
        .itemInputs("4x gtceu:ev_large_miner",
            "4x gtceu:iv_large_miner",
            "4x gtceu:luv_large_miner",
            "64x gtceu:uranium_triplatinum_single_wire",
            "64x gtceu:samarium_iron_arsenic_oxide_single_wire",
            "64x gtceu:indium_tin_barium_titanium_cuprate_single_wire",
            "8x gtceu:ev_field_generator",
            "8x gtceu:iv_field_generator",
            "8x gtceu:luv_field_generator",
            "8x gtceu:ev_sensor",
            "8x gtceu:iv_sensor",
            "8x gtceu:luv_sensor",
            "16x #gtceu:circuits/uv",
            "16x gtceu:double_osmium_plate",
            "16x gtceu:double_black_steel_plate",
            "16x gtceu:double_niobium_nitride_plate")
        .itemOutputs("gtceu:large_void_miner")
        .inputFluids("gtceu:soldering_alloy 5760", "gtceu:fall_king 5760", "gtceu:energetic_alloy 5760", "gtceu:tanmolyium 5760")
        .EUt(GTValues.VA[GTValues.ZPM])
        .duration(800)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:void_miner"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.ZPM])
            .CWUt(64))

    gtr.assembly_line("gtceu:annihilate_generator")
        .itemInputs("gtlcore:graviton_field_constraint_casing",
            "4x gtceu:uxv_emitter",
            "4x gtceu:uxv_sensor",
            "4x #gtceu:circuits/opv",
            "16x gtceu:uxv_field_generator",
            "4x kubejs:rydberg_spinorial_assembly",
            "16x kubejs:uxv_voltage_coil",
            "gtlcore:insanely_max_battery",
            "8x gtceu:double_draconium_plate",
            "8x gtceu:double_legendarium_plate")
        .itemOutputs("gtceu:annihilate_generator")
        .inputFluids("gtceu:super_mutated_living_solder 4000", "gtceu:neutronium_doped_nanotubes 4000", "gtceu:europium 8192", "gtceu:tairitsu 8192")
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(1800)
        .stationResearch(b => b.researchStack(Registries.getItemStack("kubejs:annihilation_constrainer"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UXV])
            .CWUt(4096))

    gtr.assembly_line("kubejs:suprachronal_mainframe_complex")
        .itemInputs("2x gtceu:eternity_frame",
            "kubejs:chaotic_core",
            "gtceu:micro_processor_mainframe",
            "gtceu:nano_processor_mainframe",
            "gtceu:quantum_processor_mainframe",
            "gtceu:crystal_processor_mainframe",
            "gtceu:wetware_processor_mainframe",
            "kubejs:bioware_mainframe",
            "kubejs:optical_mainframe",
            "kubejs:exotic_mainframe",
            "kubejs:cosmic_mainframe",
            "kubejs:supracausal_mainframe",
            "kubejs:eternity_catalyst",
            "16x kubejs:nuclear_star",
            "16x gtceu:eternity_foil",
            "4x gtceu:eternity_plate")
        .itemOutputs("kubejs:suprachronal_mainframe_complex")
        .inputFluids("gtceu:infinity 1000", "gtceu:spacetime 1000", "gtceu:eternity 1000", "gtceu:magnetohydrodynamicallyconstrainedstarmatter 1000")
        .EUt(4 * GTValues.VA[GTValues.MAX])
        .duration(8000)
        .stationResearch(b => b.researchStack(Registries.getItemStack("kubejs:suprachronal_max"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.MAX])
            .CWUt(8192))

    gtr.suprachronal_assembly_line("kubejs:create_ultimate_battery")
        .itemInputs("gtceu:magnetohydrodynamicallyconstrainedstarmatter_frame",
            "4x kubejs:suprachronal_mainframe_complex",
            "16x gtlcore:mega_max_battery",
            "16x gtlcore:max_field_generator",
            "64x kubejs:fm_wafer",
            "64x kubejs:fm_wafer",
            "64x kubejs:fm_wafer",
            "64x kubejs:fm_wafer",
            "64x kubejs:fm_wafer",
            "64x kubejs:fm_wafer",
            "64x kubejs:fm_wafer",
            "64x kubejs:fm_wafer",
            "16x gtceu:infinity_hex_wire",
            "64x gtceu:magnetohydrodynamicallyconstrainedstarmatter_foil",
            "32x gtceu:magnetohydrodynamicallyconstrainedstarmatter_plate",
            "32x gtceu:double_cosmic_plate")
        .itemOutputs("kubejs:create_ultimate_battery")
        .inputFluids("gtceu:infinity 1000", "gtceu:spacetime 1000", "gtceu:eternity 1000", "gtceu:magnetohydrodynamicallyconstrainedstarmatter 1000")
        .EUt(16 * GTValues.VA[GTValues.MAX])
        .duration(8000)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtlcore:mega_max_battery"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.MAX])
            .CWUt(16384))

    gtr.assembly_line("gtceu:chemical_plant")
        .itemInputs("32x gtceu:polybenzimidazole_foil",
            "32x gtceu:watertight_steel_plate",
            "32x gtceu:long_cupronickel_rod",
            "8x gtceu:polytetrafluoroethylene_large_fluid_pipe",
            "4x gtceu:ptfe_pipe_casing",
            "4x gtceu:inert_machine_casing",
            "4x #gtceu:circuits/luv",
            "4x gtceu:luv_electric_motor",
            "4x gtceu:double_watertight_steel_plate")
        .inputFluids("gtceu:soldering_alloy 2304", "gtceu:polytetrafluoroethylene 2304")
        .itemOutputs("gtceu:chemical_plant")
        .EUt(GTValues.VA[GTValues.LuV])
        .duration(600)
    ["scannerResearch(java.util.function.UnaryOperator)"](b => b.researchStack(Registries.getItemStack("gtceu:large_chemical_reactor"))
        .dataStack(Registries.getItemStack("gtceu:data_stick"))
        .EUt(GTValues.VA[GTValues.IV])
        .duration(2400))

    gtr.assembly_line("gtlcore:iridium_casing")
        .itemInputs("2x gtceu:iridium_frame",
            "gtceu:titanium_turbine_casing",
            "gtceu:stainless_steel_turbine_casing",
            "4x gtceu:osmiridium_foil",
            "4x gtceu:iridium_foil",
            "gtceu:tanmolyium_plate",
            "gtceu:double_iridium_plate",
            "gtceu:double_osmiridium_plate")
        .inputFluids("gtceu:soldering_alloy 1440", "gtceu:iridium 576")
        .itemOutputs("2x gtlcore:iridium_casing")
        .EUt(GTValues.VA[GTValues.LuV])
        .duration(200)
    ["scannerResearch(java.util.function.UnaryOperator)"](b => b.researchStack(Registries.getItemStack("gtceu:large_scale_assembler_casing"))
        .dataStack(Registries.getItemStack("gtceu:data_stick"))
        .EUt(GTValues.VA[GTValues.LuV])
        .duration(1200))

    gtr.assembly_line("gtceu:hyper_reactor")
        .itemInputs("64x gtceu:uhpic_chip",
            "64x kubejs:nm_chip",
            "4x #gtceu:circuits/uev",
            "2x gtceu:uev_electric_pump",
            "2x gtceu:uev_field_generator",
            "4x gtceu:double_orichalcum_plate",
            "4x gtceu:double_enderite_plate",
            "8x gtceu:naquadria_gear",
            "16x gtceu:naquadah_nanoswarm",
            "32x gtceu:naquadria_screw",
            "gtceu:max_battery")
        .inputFluids("gtceu:indalloy_140 1296", "gtceu:soldering_alloy 1296", "gtceu:mutated_living_solder 864", "gtceu:artherium_sn 864")
        .itemOutputs("gtceu:hyper_reactor")
        .EUt(2000000)
        .duration(500)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:large_naquadah_reactor"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UEV])
            .CWUt(128))

    gtr.assembly_line("gtceu:advanced_hyper_reactor")
        .itemInputs("64x kubejs:nm_chip",
            "64x kubejs:pm_chip",
            "4x #gtceu:circuits/uxv",
            "2x gtceu:uiv_electric_pump",
            "2x gtceu:uiv_field_generator",
            "8x gtceu:double_seaborgium_plate",
            "8x gtceu:double_taranium_plate",
            "16x gtceu:naquadria_gear",
            "64x gtceu:naquadria_screw",
            "64x gtceu:infuscolium_nanoswarm",
            "gtlcore:transcendent_max_battery")
        .inputFluids("gtceu:tairitsu 2304", "gtceu:soldering_alloy 1296", "gtceu:indalloy_140 1296", "gtceu:super_mutated_living_solder 864")
        .itemOutputs("gtceu:advanced_hyper_reactor")
        .EUt(32000000)
        .duration(600)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:hyper_reactor"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UIV])
            .CWUt(1024))

    gtr.assembly_line("gtlcore:really_max_battery")
        .itemInputs("16x gtceu:double_neutronium_plate",
            "16x #gtceu:circuits/uev",
            "gtceu:max_battery",
            "8x kubejs:bioware_processing_core",
            "64x kubejs:nm_wafer",
            "64x kubejs:nm_wafer",
            "64x kubejs:smd_diode_bioware",
            "64x kubejs:smd_capacitor_bioware",
            "64x kubejs:smd_resistor_bioware",
            "64x kubejs:smd_transistor_bioware",
            "64x kubejs:smd_inductor_bioware",
            "64x gtceu:enderite_double_wire",
            "64x gtceu:quantanium_bolt")
        .inputFluids("gtceu:mutated_living_solder 17280", "gtceu:polyetheretherketone 5760", "gtceu:neutronium 1296", "gtceu:duranium 2592")
        .itemOutputs("gtlcore:really_max_battery")
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(2400)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:max_battery"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UHV])
            .CWUt(288))

    gtr.assembly_line("gtlcore:transcendent_max_battery")
        .itemInputs("16x gtceu:double_quantanium_plate",
            "16x #gtceu:circuits/uiv",
            "gtlcore:really_max_battery",
            "8x kubejs:optical_processing_core",
            "64x kubejs:nm_wafer",
            "64x kubejs:nm_wafer",
            "64x kubejs:smd_diode_optical",
            "64x kubejs:smd_capacitor_optical",
            "64x kubejs:smd_resistor_optical",
            "64x kubejs:smd_transistor_optical",
            "64x kubejs:smd_inductor_optical",
            "64x gtceu:echoite_double_wire",
            "64x gtceu:adamantium_bolt")
        .inputFluids("gtceu:mutated_living_solder 17280", "gtceu:zylon 5760", "gtceu:adamantine 2592", "gtceu:adamantium 2592")
        .itemOutputs("gtlcore:transcendent_max_battery")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(2800)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtlcore:really_max_battery"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UEV])
            .CWUt(576))

    gtr.assembly_line("gtlcore:extremely_max_battery")
        .itemInputs("16x gtceu:double_adamantium_plate",
            "16x #gtceu:circuits/uxv",
            "gtlcore:transcendent_max_battery",
            "8x kubejs:exotic_processing_core",
            "64x kubejs:pm_wafer",
            "64x kubejs:pm_wafer",
            "64x kubejs:smd_diode_exotic",
            "64x kubejs:smd_capacitor_exotic",
            "64x kubejs:smd_resistor_exotic",
            "64x kubejs:smd_transistor_exotic",
            "64x kubejs:smd_inductor_exotic",
            "64x gtceu:legendarium_double_wire",
            "64x gtceu:vibranium_bolt")
        .inputFluids("gtceu:mutated_living_solder 17280", "gtceu:kevlar 5760", "gtceu:vibranium 2592", "gtceu:heavy_quark_degenerate_matter 2592")
        .itemOutputs("gtlcore:extremely_max_battery")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(3200)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtlcore:transcendent_max_battery"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UIV])
            .CWUt(1152))

    gtr.assembly_line("gtlcore:insanely_max_battery")
        .itemInputs("16x gtceu:double_vibranium_plate",
            "16x #gtceu:circuits/opv",
            "gtlcore:extremely_max_battery",
            "8x kubejs:cosmic_processing_core",
            "64x kubejs:pm_wafer",
            "64x kubejs:pm_wafer",
            "64x kubejs:smd_diode_cosmic",
            "64x kubejs:smd_capacitor_cosmic",
            "64x kubejs:smd_resistor_cosmic",
            "64x kubejs:smd_transistor_cosmic",
            "64x kubejs:smd_inductor_cosmic",
            "64x gtceu:draconiumawakened_double_wire",
            "64x gtceu:draconium_bolt")
        .inputFluids("gtceu:super_mutated_living_solder 17280", "gtceu:fullerene_polymer_matrix_pulp 5760", "gtceu:legendarium 2592", "gtceu:draconiumawakened 2592")
        .itemOutputs("gtlcore:insanely_max_battery")
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(3600)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtlcore:extremely_max_battery"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UXV])
            .CWUt(2304))

    gtr.assembly_line("gtlcore:mega_max_battery")
        .itemInputs("16x gtceu:double_draconium_plate",
            "16x #gtceu:circuits/max",
            "gtlcore:insanely_max_battery",
            "8x kubejs:supracausal_processing_core",
            "64x kubejs:fm_wafer",
            "64x kubejs:fm_wafer",
            "64x kubejs:smd_diode_supracausal",
            "64x kubejs:smd_capacitor_supracausal",
            "64x kubejs:smd_resistor_supracausal",
            "64x kubejs:smd_transistor_supracausal",
            "64x kubejs:smd_inductor_supracausal",
            "64x gtceu:infinity_quadruple_wire",
            "64x gtceu:transcendentmetal_bolt")
        .inputFluids("gtceu:super_mutated_living_solder 24560", "gtceu:radox 5760", "gtceu:infinity 2592", "gtceu:spacetime 2592")
        .itemOutputs("gtlcore:mega_max_battery")
        .EUt(GTValues.VA[GTValues.OpV])
        .duration(4000)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtlcore:insanely_max_battery"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.OpV])
            .CWUt(4608))

    gtr.assembly_line("gtceu:advanced_assembly_line")
        .itemInputs("4x gtceu:assembly_line_casing",
            "2x gtceu:uv_robot_arm",
            "2x gtceu:uv_emitter",
            "2x gtceu:uv_sensor",
            "4x #gtceu:circuits/uhv",
            "8x gtceu:stellite_gear",
            "8x gtceu:double_hssg_plate",
            "8x gtceu:double_tanmolyium_plate")
        .inputFluids("gtceu:soldering_alloy 5760", "gtceu:rose_gold 5760", "gtceu:osmiridium 5760", "gtceu:vanadium_gallium 5760")
        .itemOutputs("gtceu:advanced_assembly_line")
        .EUt(GTValues.VA[GTValues.UV])
        .duration(400)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:assembly_line"))
            .dataStack(Registries.getItemStack("gtceu:data_orb"))
            .EUt(GTValues.VA[GTValues.UV])
            .CWUt(32))

    gtr.assembly_line("gtceu:space_probe_surface_reception")
        .itemInputs("12x gtceu:double_adamantine_plate",
            "12x gtceu:neutronium_gear",
            "16x gtceu:double_titansteel_plate",
            "6x gtceu:fullerene_polymer_matrix_pulp_foil",
            "4x #gtceu:circuits/uxv",
            "4x gtceu:uxv_emitter",
            "4x gtceu:uxv_sensor",
            "16x gtceu:astraltitanium_rod",
            "8x kubejs:lepton_trap_crystal",
            "4x kubejs:scintillator",
            "2x gtceu:fusion_coil",
            "16x gtceu:double_arceusalloy2b_plate")
        .inputFluids("gtceu:mutated_living_solder 864", "gtceu:tairitsu 1296", "gtceu:soldering_alloy 1296", "gtceu:cinobite 864")
        .itemOutputs("gtceu:space_probe_surface_reception")
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(400)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:resource_collection"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UXV])
            .CWUt(512))

    gtr.assembly_line("gtceu:eye_of_harmony")
        .itemInputs("16x gtlcore:dimension_injection_casing",
            "16x kubejs:spacetime_compression_field_generator",
            "16x kubejs:dimensional_stability_casing",
            "64x gtceu:uv_world_accelerator",
            "64x gtceu:resource_collection",
            "64x gtceu:high_performance_computation_array",
            "32x kubejs:ctc_computational_unit",
            "32x kubejs:stabilized_wormhole_generator",
            "16x #gtceu:circuits/max",
            "16x gtceu:cosmicneutronium_nanoswarm",
            "64x gtceu:opv_emitter",
            "64x gtceu:opv_sensor",
            "64x gtceu:opv_robot_arm",
            "64x kubejs:time_dilation_containment_unit",
            "4x gtlcore:insanely_max_battery",
            "32x gtceu:double_chaos_plate")
        .inputFluids("gtceu:super_mutated_living_solder 480000", "gtceu:liquid_degenerate_rhenium 100000", "gtceu:neutronium 57600", "gtceu:infinity 16000")
        .itemOutputs("gtceu:eye_of_harmony")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(2400)
        .stationResearch(b => b.researchStack(Registries.getItemStack("kubejs:recursively_folded_negative_space"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.MAX])
            .CWUt(8192))

    gtr.assembly_line("gtceu:dimensionally_transcendent_plasma_forge")
        .itemInputs("16x gtceu:black_titanium_frame",
            "8x kubejs:dimensional_bridge_casing",
            "16x gtceu:super_blast_smelter",
            "4x gtceu:uiv_energy_input_hatch",
            "8x gtceu:echoite_hex_wire",
            "32x #gtceu:circuits/uiv",
            "16x gtceu:zpm_quantum_chest",
            "16x gtceu:zpm_quantum_tank",
            "16x gtceu:uiv_field_generator",
            "8x gtceu:uiv_electric_pump",
            "gtlcore:extremely_max_battery",
            "16x gtceu:uruium_nanoswarm",
            "64x gtceu:astraltitanium_plate",
            "64x gtceu:arceusalloy2b_plate",
            "32x gtceu:double_hassium_plate",
            "32x gtceu:double_hastelloyx_78_plate")
        .inputFluids("gtceu:mutated_living_solder 12960", "gtceu:transition 5760", "gtceu:hastelloyx_78 5760", "gtceu:hastelloyk_243 5760")
        .itemOutputs("gtceu:dimensionally_transcendent_plasma_forge")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(4000)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:stellar_forge"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UIV])
            .CWUt(4096))

    gtr.assembly_line("gtceu:dimensionally_transcendent_mixer")
        .itemInputs("16x gtceu:black_titanium_frame",
            "64x gtceu:luv_mixer",
            "48x gtceu:zpm_mixer",
            "32x gtceu:uv_mixer",
            "16x gtceu:uhv_mixer",
            "8x gtceu:uev_mixer",
            "4x gtceu:uiv_mixer",
            "16x gtceu:luv_quantum_chest",
            "16x gtceu:luv_quantum_tank",
            "4x gtceu:uiv_field_generator",
            "4x gtceu:uiv_electric_motor",
            "4x gtceu:long_taranium_rod",
            "16x gtceu:astraltitanium_gear",
            "gtlcore:transcendent_max_battery",
            "4x gtceu:vibranium_nanoswarm",
            "16x gtceu:double_hastelloyx_78_plate")
        .inputFluids("gtceu:mutated_living_solder 12960", "gtceu:niobium_titanium 5760", "gtceu:grisium 5760", "gtceu:black_titanium 5760")
        .itemOutputs("gtceu:dimensionally_transcendent_mixer")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(2000)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:large_mixer"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UIV])
            .CWUt(512))

    gtr.assembly_line("gtceu:precision_assembler")
        .itemInputs("4x gtceu:zpm_robot_arm",
            "4x gtceu:zpm_electric_piston",
            "4x gtceu:zpm_conveyor_module",
            "4x #gtceu:circuits/uv",
            "8x gtceu:platinum_screw",
            "8x gtceu:osmium_screw",
            "8x gtceu:niobium_titanium_screw",
            "8x gtceu:ruridit_screw",
            "8x gtceu:mar_m_200_steel_rod",
            "4x gtceu:trinium_gear",
            "8x gtceu:double_inconel_792_plate",
            "8x gtceu:double_hastelloy_n_plate")
        .inputFluids("gtceu:soldering_alloy 5760", "gtceu:tantalum 5760", "gtceu:manganese_phosphide 5760", "gtceu:magnesium_diboride 5760")
        .itemOutputs("gtceu:precision_assembler")
        .EUt(GTValues.VA[GTValues.ZPM])
        .duration(1000)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:large_assembler"))
            .dataStack(Registries.getItemStack("gtceu:data_orb"))
            .EUt(GTValues.VA[GTValues.ZPM])
            .CWUt(48))

    gtr.assembly_line("gtceu:decay_hastener")
        .itemInputs("8x gtceu:neutron_reflector", "4x gtceu:luv_field_generator", "4x #gtceu:circuits/zpm", "16x gtceu:fine_naquadria_wire", "8x gtceu:long_darmstadtium_rod", "4x gtceu:double_incoloy_ma_956_plate", "16x gtceu:double_thorium_plate")
        .itemOutputs("gtceu:decay_hastener")
        .inputFluids("gtceu:soldering_alloy 1296", "gtceu:indalloy_140 1296")
        .EUt(GTValues.VA[GTValues.UV])
        .duration(400)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:zpm_world_accelerator"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UV])
            .CWUt(32))

    gtr.assembly_line("gtceu:compressed_stone_dust")
        .itemInputs("64x gtceu:stone_dust", "64x gtceu:stone_dust", "64x gtceu:stone_dust", "64x gtceu:stone_dust", "64x gtceu:stone_dust", "64x gtceu:stone_dust", "64x gtceu:stone_dust", "64x gtceu:stone_dust", "64x gtceu:stone_dust", "64x gtceu:stone_dust", "64x gtceu:stone_dust", "64x gtceu:stone_dust", "64x gtceu:stone_dust", "64x gtceu:stone_dust", "64x gtceu:stone_dust", "64x gtceu:stone_dust")
        .itemOutputs("gtceu:compressed_stone_dust")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(20)
        .stationResearch(b => b.researchStack(Registries.getItemStack("minecraft:reinforced_deepslate"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UIV])
            .CWUt(128))

    gtr.assembly_line("kubejs:time_dilation_containment_unit")
        .itemInputs("4x gtceu:naquadah_alloy_rod", "4x gtceu:degenerate_rhenium_plate", "2x gtceu:gravi_star", "2x gtceu:ruthenium_trinium_americium_neutronate_single_wire", "gtceu:uhv_emitter")
        .inputFluids("gtceu:fluxed_electrum 288", "gtceu:mutated_living_solder 288", "gtceu:neutronium 288", "gtceu:tritanium 576")
        .itemOutputs("kubejs:time_dilation_containment_unit")
        .EUt(8000000)
        .duration(100)
        .stationResearch(b => b.researchStack(Registries.getItemStack("kubejs:empty_laser_cooling_container"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UIV])
            .CWUt(64))

    gtr.assembly_line("kubejs:extremely_durable_plasma_cell")
        .itemInputs("48x gtceu:neutronium_plate", "4x gtceu:heavy_quark_degenerate_matter_large_fluid_pipe", "2x gtceu:uxv_electric_pump", "2x gtceu:uxv_field_generator", "gtceu:infuscolium_nanoswarm", "2x gtceu:quantumchromodynamically_confined_matter_frame", "4x kubejs:force_field_glass", "8x gtceu:fusion_coil", "2x #gtceu:circuits/uiv", "4x gtceu:double_adamantine_plate", "4x gtceu:double_celestialtungsten_plate")
        .inputFluids("gtceu:super_mutated_living_solder 2304", "gtceu:dalisenite 2304", "gtceu:echoite 2592", "gtceu:taranium 1584")
        .itemOutputs("kubejs:extremely_durable_plasma_cell")
        .EUt(15000000)
        .duration(150)
        .stationResearch(b => b.researchStack(Registries.getItemStack("kubejs:plasma_containment_cell"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UXV])
            .CWUt(128))

    gtr.assembly_line("gtlcore:dimension_injection_casing")
        .itemInputs("6x gtceu:osmiridium_plate", "4x gtceu:lead_plate", "12x gtceu:adamantium_bolt", "2x #gtceu:circuits/iv", "2x gtceu:enderite_single_wire", "gtceu:ev_super_tank", "gtceu:ev_super_chest")
        .inputFluids("gtceu:liquid_degenerate_rhenium 200", "gtceu:vibrant_alloy 288", "gtceu:astral_silver 288", "gtceu:enriched_naquadah 288")
        .itemOutputs("2x gtlcore:dimension_injection_casing")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(400)
        .stationResearch(b => b.researchStack(Registries.getItemStack("kubejs:spacetime_assembly_line_casing"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UEV])
            .CWUt(512))

    gtr.assembly_line("kubejs:spacetime_compression_field_generator")
        .itemInputs("gtlcore:dimensionally_transcendent_casing", "kubejs:containment_field_generator", "4x kubejs:dyson_deployment_casing", "gtceu:opv_field_generator", "kubejs:microwormhole_generator", "4x gtceu:orichalcum_nanoswarm", "2x gtceu:infinity_rod", "gtceu:double_starmetal_plate", "gtceu:double_quantumchromodynamically_confined_matter_plate", "4x gtceu:double_titan_precision_steel_plate")
        .inputFluids("gtceu:super_mutated_living_solder 576", "gtceu:cosmicneutronium 288", "gtceu:crystalmatrix 576", "gtceu:heavy_quark_degenerate_matter 576")
        .itemOutputs("kubejs:spacetime_compression_field_generator")
        .EUt(GTValues.VA[GTValues.OpV])
        .duration(800)
        .stationResearch(b => b.researchStack(Registries.getItemStack("kubejs:time_dilation_containment_unit"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.OpV])
            .CWUt(1024))

    gtr.assembly_line("kubejs:dimensional_bridge_casing")
        .itemInputs("gtlcore:dimensionally_transcendent_casing", "gtceu:uv_quantum_chest", "gtceu:uv_quantum_tank", "2x gtceu:enderite_single_wire", "2x #gtceu:circuits/uv", "gtceu:uhv_field_generator")
        .itemOutputs("kubejs:dimensional_bridge_casing")
        .inputFluids("gtceu:mutated_living_solder 576", "gtceu:liquid_degenerate_rhenium 200", "gtceu:duranium 288", "gtceu:enriched_naquadah 288")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(400)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtlcore:dimension_injection_casing"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UIV])
            .CWUt(1024))

    gtr.assembly_line("kubejs:manifold_oscillatory_power_cell")
        .itemInputs("32x gtceu:titansteel_single_wire", "32x gtceu:magnetic_neodymium_rod", "16x gtceu:vibranium_plate", "8x gtceu:fine_legendarium_wire", "4x kubejs:amorphous_matter", "16x gtceu:double_red_alloy_plate", "2x gtceu:degenerate_rhenium_plate", "4x gtceu:double_quantum_plate")
        .inputFluids("gtceu:super_mutated_living_solder 144", "gtceu:taranium 72", "gtceu:naquadria 144", "gtceu:tritanium 288")
        .itemOutputs("kubejs:manifold_oscillatory_power_cell")
        .EUt(33550000)
        .duration(1800)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:luv_vanadium_battery"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UIV])
            .CWUt(128))

    gtr.assembly_line("kubejs:hyperdimensional_drone")
        .itemInputs("2x gtlcore:max_robot_arm", "2x gtlcore:max_conveyor_module", "2x gtlcore:max_emitter", "2x gtlcore:max_sensor", "gtlcore:max_field_generator", "kubejs:chaotic_core", "kubejs:draconic_energy_core", "kubejs:spacetime_catalyst", "kubejs:ctc_guidance_unit", "gtceu:black_dwarf_mtter_nanoswarm", "64x kubejs:dyson_swarm_module", "64x kubejs:dyson_swarm_module", "64x kubejs:dyson_swarm_module", "64x kubejs:dyson_swarm_module", "16x gtceu:double_transcendentmetal_plate", "16x gtceu:double_hypogen_plate")
        .inputFluids("gtceu:super_mutated_living_solder 28800", "gtceu:transcendentmetal 20000", "gtceu:rhugnor 20000", "gtceu:spacetime 10000")
        .itemOutputs("kubejs:hyperdimensional_drone")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(4800)
        .stationResearch(b => b.researchStack(Registries.getItemStack("kubejs:space_drone_mk6"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.MAX])
            .CWUt(8192))

    gtr.assembly_line("kubejs:leptonic_charge")
        .itemInputs("gtceu:enriched_naquadah_frame", "gtceu:naquadriatictaranium_rod", "gtceu:double_uranium_235_plate", "gtceu:hexanitrohexaaxaisowurtzitane_dust", "gtceu:degenerate_rhenium_dust", "gtceu:protactinium_dust", "gtceu:mendelevium_dust", "2x gtceu:mithril_foil", "6x gtceu:orichalcum_bolt", "gtceu:enderium_plate", "gtceu:vibranium_plate")
        .inputFluids("gtceu:mutated_living_solder 1000", "gtceu:glyceryl_trinitrate 1000", "gtceu:stellar_energy_rocket_fuel 1000", "gtceu:free_electron_gas 1000")
        .itemOutputs("kubejs:leptonic_charge")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(400)
        .stationResearch(b => b.researchStack(Registries.getItemStack("kubejs:naquadria_charge"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UIV])
            .CWUt(64))

    gtr.assembly_line("kubejs:quantum_chromodynamic_charge")
        .itemInputs("2x gtceu:double_infuscolium_plate", "2x gtceu:heavy_quark_degenerate_matter_plate", "kubejs:time_dilation_containment_unit", "kubejs:leptonic_charge", "gtceu:double_superheavy_l_alloy_plate", "gtceu:double_superheavy_h_alloy_plate")
        .inputFluids("gtceu:draconium 72", "gtceu:gluons 1296", "gtceu:legendarium 144", "gtceu:starmetal 144")
        .itemOutputs("kubejs:quantum_chromodynamic_charge")
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(800)
        .stationResearch(b => b.researchStack(Registries.getItemStack("kubejs:leptonic_charge"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UXV])
            .CWUt(128))

    gtr.assembly_line("gtceu:circuit_assembly_line")
        .itemInputs("4x kubejs:machine_casing_circuit_assembly_line",
            "4x #gtceu:circuits/uv",
            "8x gtceu:zpm_electric_pump",
            "8x gtceu:zpm_robot_arm",
            "8x gtceu:zpm_conveyor_module",
            "8x gtceu:zpm_sensor",
            "8x gtceu:zpm_emitter",
            "4x gtceu:long_mithril_rod",
            "4x gtceu:double_niobium_titanium_plate",
            "4x gtceu:double_vanadium_gallium_plate",
            "4x gtceu:double_mithril_plate",
            "4x gtceu:double_fluxed_electrum_plate")
        .inputFluids("gtceu:soldering_alloy 2880", "gtceu:rose_gold 2880", "gtceu:osmium 2880", "gtceu:stellite 2880")
        .itemOutputs("gtceu:circuit_assembly_line")
        .EUt(GTValues.VA[GTValues.UV])
        .duration(800)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:large_circuit_assembler"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UV])
            .CWUt(64))

    gtr.assembly_line("kubejs:bioware_processing_core")
        .itemInputs("kubejs:bioware_printed_circuit_board",
            "8x kubejs:smd_capacitor_bioware",
            "8x kubejs:smd_diode_bioware",
            "8x kubejs:smd_resistor_bioware",
            "8x kubejs:smd_transistor_bioware",
            "8x kubejs:smd_inductor_bioware",
            "2x gtceu:polyetheretherketone_foil",
            "8x kubejs:biological_cells",
            "8x kubejs:bioware_chip",
            "16x gtceu:fine_naquadah_wire",
            "4x gtceu:niobium_titanium_plate")
        .inputFluids("gtceu:biohmediumsterilized 1000", "gtceu:polyethylene 1296", "gtceu:polyvinyl_chloride 864", "gtceu:soldering_alloy 1296")
        .itemOutputs("8x kubejs:bioware_processing_core")
        .EUt(368640)
        .duration(320)
        .stationResearch(b => b.researchStack(Registries.getItemStack("kubejs:bioware_chip"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UV])
            .CWUt(64))

    gtr.assembly_line("kubejs:optical_processing_core")
        .itemInputs("kubejs:optical_printed_circuit_board",
            "8x kubejs:smd_capacitor_optical",
            "8x kubejs:smd_diode_optical",
            "8x kubejs:smd_resistor_optical",
            "8x kubejs:smd_transistor_optical",
            "8x kubejs:smd_inductor_optical",
            "2x gtceu:polyetheretherketone_foil",
            "2x kubejs:non_linear_optical_lens",
            "16x gtceu:normal_optical_pipe",
            "8x kubejs:optical_soc",
            "4x kubejs:solar_light_splitter",
            "kubejs:low_frequency_laser",
            "kubejs:medium_frequency_laser",
            "kubejs:high_frequency_laser",
            "kubejs:bose_einstein_cooling_container",
            "4x gtceu:graphene_plate")
        .inputFluids("gtceu:polytetrafluoroethylene 864", "gtceu:naquadah_alloy 432", "gtceu:soldering_alloy 1296", "gtceu:fullerene_doped_nanotubes 144")
        .itemOutputs("8x kubejs:optical_processing_core")
        .EUt(1474560)
        .duration(320)
        .stationResearch(b => b.researchStack(Registries.getItemStack("kubejs:optical_soc"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UHV])
            .CWUt(128))

    gtr.assembly_line("kubejs:exotic_processing_core")
        .itemInputs("kubejs:exotic_printed_circuit_board",
            "16x kubejs:smd_capacitor_exotic",
            "16x kubejs:smd_diode_exotic",
            "16x kubejs:smd_resistor_exotic",
            "16x kubejs:smd_transistor_exotic",
            "16x kubejs:smd_inductor_exotic",
            "8x gtceu:trinium_titanium_foil",
            "4x kubejs:high_precision_crystal_soc",
            "kubejs:rydberg_spinorial_assembly",
            "kubejs:x_ray_laser",
            "4x kubejs:non_linear_optical_lens",
            "8x gtceu:kevlar_foil",
            "4x gtceu:degenerate_rhenium_plate")
        .inputFluids("gtceu:mutated_living_solder 576", "gtceu:quantum_dots 80")
        .itemOutputs("8x kubejs:exotic_processing_core")
        .EUt(4000000)
        .duration(160)
        .stationResearch(b => b.researchStack(Registries.getItemStack("kubejs:exotic_chip"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UEV])
            .CWUt(256))

    gtr.assembly_line("kubejs:cosmic_processing_core")
        .itemInputs("kubejs:cosmic_printed_circuit_board",
            "24x kubejs:smd_capacitor_cosmic",
            "24x kubejs:smd_diode_cosmic",
            "24x kubejs:smd_resistor_cosmic",
            "24x kubejs:smd_transistor_cosmic",
            "24x kubejs:smd_inductor_cosmic",
            "kubejs:cosmic_processing_unit_core",
            "kubejs:ultrashort_pulse_laser",
            "16x gtceu:fine_cinobite_wire",
            "32x gtceu:fine_borosilicate_glass_wire",
            "4x kubejs:bose_einstein_cooling_container",
            "2x gtceu:fullerene_polymer_matrix_pulp_foil",
            "4x gtceu:black_titanium_plate")
        .inputFluids("gtceu:zylon 864", "gtceu:adamantium 432", "gtceu:mutated_living_solder 1296", "gtceu:echoite 432")
        .itemOutputs("8x kubejs:cosmic_processing_core")
        .EUt(11796480)
        .duration(320)
        .stationResearch(b => b.researchStack(Registries.getItemStack("kubejs:cosmic_processing_unit_core"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UIV])
            .CWUt(512))

    gtr.assembly_line("kubejs:supracausal_processing_core")
        .itemInputs("kubejs:supracausal_printed_circuit_board",
            "64x kubejs:smd_capacitor_supracausal",
            "64x kubejs:smd_diode_supracausal",
            "64x kubejs:smd_resistor_supracausal",
            "64x kubejs:smd_transistor_supracausal",
            "64x kubejs:smd_inductor_supracausal",
            "3x kubejs:quantumchromodynamic_protective_plating",
            "2x gtceu:legendarium_single_wire",
            "kubejs:nuclear_clock",
            "kubejs:topological_manipulator_unit",
            "kubejs:relativistic_spinorial_memory_system",
            "kubejs:graviton_transducer",
            "4x gtceu:neutronium_plate")
        .inputFluids("gtceu:polyimide 1296", "gtceu:zylon 1296", "gtceu:fullerene_polymer_matrix_pulp 1296", "gtceu:radox 1296")
        .itemOutputs("8x kubejs:supracausal_processing_core")
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(800)
        .stationResearch(b => b.researchStack(Registries.getItemStack("kubejs:relativistic_spinorial_memory_system"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UXV])
            .CWUt(1024))

    gtr.assembly_line("gtlcore:qft_coil")
        .itemInputs("gtceu:quantumchromodynamically_confined_matter_frame",
            "kubejs:uruium_coil_block",
            "gtceu:uev_field_generator",
            "kubejs:quantumchromodynamic_protective_plating",
            "gtceu:uv_fluid_regulator",
            "gtceu:uhv_fluid_regulator",
            "gtceu:uev_fluid_regulator",
            "gtceu:uiv_fluid_regulator",
            "gtceu:naquadah_huge_fluid_pipe",
            "gtceu:neutronium_huge_fluid_pipe",
            "gtceu:enderium_huge_fluid_pipe",
            "gtceu:heavy_quark_degenerate_matter_huge_fluid_pipe",
            "2x gtceu:ender_pearl_plate",
            "2x gtceu:nether_star_plate",
            "4x gtceu:legendarium_plate",
            "4x gtceu:crystalmatrix_plate")
        .inputFluids("gtceu:vanadium_gallium 1296", "gtceu:gallium_arsenide 1296", "gtceu:quantum 1296", "gtceu:hikarium 1296")
        .itemOutputs("gtlcore:qft_coil")
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(400)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:fusion_coil"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UXV])
            .CWUt(512))

    gtr.assembly_line("gtlcore:spacetimecontinuumripper")
        .itemInputs("gtlcore:manipulator",
            "4x gtceu:uiv_emitter",
            "gtceu:uiv_field_generator",
            "gtceu:uxv_emitter",
            "4x gtceu:echoite_octal_wire",
            "8x gtceu:neutron_reflector",
            "4x gtceu:double_dubnium_plate",
            "4x gtceu:double_superheavy_l_alloy_plate")
        .inputFluids("gtceu:dimensionallytranscendentprosaiccatalyst 1000", "gtceu:thulium 2880", "gtceu:neptunium 2880", "gtceu:fermium 2880")
        .itemOutputs("gtlcore:spacetimecontinuumripper")
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(800)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtlcore:manipulator"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UXV])
            .CWUt(512))

    gtr.assembly_line("gtlcore:spacetimebendingcore")
        .itemInputs("gtlcore:manipulator",
            "4x gtceu:uiv_field_generator",
            "4x gtceu:uxv_robot_arm",
            "gtceu:uxv_fluid_regulator",
            "4x gtceu:echoite_octal_wire",
            "8x gtceu:neutron_reflector",
            "4x gtceu:double_hassium_plate",
            "4x gtceu:double_superheavy_h_alloy_plate")
        .inputFluids("gtceu:dimensionallytranscendentresplendentcatalyst 1000", "gtceu:thulium 2880", "gtceu:nobelium 2880", "gtceu:lawrencium 2880")
        .itemOutputs("gtlcore:spacetimebendingcore")
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(800)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtlcore:spacetimecontinuumripper"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UXV])
            .CWUt(1024))

    gtr.assembly_line("gtceu:a_mass_fabricator")
        .itemInputs("16x gtceu:active_transformer",
            "4x gtceu:mass_fabricator",
            "4x kubejs:cosmic_processing_core",
            "16x kubejs:magnetic_trap",
            "32x kubejs:scintillator_crystal",
            "16x kubejs:electron_source",
            "8x kubejs:unstable_star",
            "4x gtceu:vibranium_nanoswarm",
            "16x kubejs:charged_lepton_trap_crystal",
            "4x #gtceu:circuits/opv",
            "gtlcore:extremely_max_battery",
            "16x gtceu:superheavy_h_alloy_plate",
            "32x gtceu:double_vibranium_plate",
            "32x gtceu:double_arceusalloy2b_plate")
        .inputFluids("gtceu:uruium 5760", "gtceu:zeron_100 2880", "gtceu:maraging_steel_300 2880", "gtceu:hastelloy_c_276 2880")
        .itemOutputs("gtceu:a_mass_fabricator")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(1800)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:mass_fabricator"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UIV])
            .CWUt(1024))

    gtr.assembly_line("gtceu:mage_assembler")
        .itemInputs("16x gtceu:large_assembler",
            "16x gtceu:large_circuit_assembler",
            "16x kubejs:precision_circuit_assembly_robot_mk1",
            "32x gtceu:uv_fluid_regulator",
            "64x gtceu:uv_robot_arm",
            "32x #gtceu:circuits/uhv",
            "64x gtceu:tungsten_carbide_screw",
            "64x gtceu:yttrium_barium_cuprate_screw",
            "64x gtceu:rhodium_plated_palladium_screw",
            "64x gtceu:naquadah_alloy_screw",
            "32x gtceu:long_rtm_alloy_rod",
            "32x gtceu:long_tungsten_carbide_rod",
            "32x gtceu:long_hsla_steel_rod",
            "32x gtceu:long_ultimet_rod",
            "16x gtceu:lafium_plate",
            "8x gtceu:double_iridium_plate")
        .inputFluids("gtceu:mutated_living_solder 5760", "gtceu:kanthal 5760", "gtceu:nobelium 2880", "gtceu:lawrencium 2880")
        .itemOutputs("gtceu:mage_assembler")
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(800)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:precision_assembler"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UHV])
            .CWUt(128))

    gtr.assembly_line("gtceu:cooling_tower")
        .itemInputs("64x gtceu:hsse_frame",
            "16x gtceu:plasma_condenser",
            "16x gtceu:mega_vacuum_freezer",
            "64x kubejs:empty_laser_cooling_container",
            "64x kubejs:high_frequency_laser",
            "64x kubejs:medium_frequency_laser",
            "64x kubejs:low_frequency_laser",
            "64x gtceu:uhv_fluid_regulator",
            "16x gtceu:uev_emitter",
            "16x #gtceu:circuits/uiv",
            "64x gtceu:double_invar_plate",
            "64x gtceu:double_germanium_plate",
            "64x gtceu:double_gallium_arsenide_plate",
            "64x gtceu:double_tin_alloy_plate",
            "64x gtceu:double_nickel_zinc_ferrite_plate",
            "64x gtceu:double_ruridit_plate")
        .inputFluids("gtceu:hafnium 5760", "gtceu:indium 5760", "gtceu:nobelium 5760", "gtceu:lawrencium 5760")
        .itemOutputs("gtceu:cooling_tower")
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(1200)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:vacuum_freezer"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UHV])
            .CWUt(256))

    gtr.assembly_line("gtceu:bedrock_drilling_rig")
        .itemInputs("16x gtceu:uev_rock_crusher",
            "16x gtceu:uev_cutter",
            "16x gtceu:uev_macerator",
            "4x kubejs:machine_casing_grinding_head",
            "4x kubejs:bedrock_drill",
            "8x gtceu:uev_sensor",
            "16x gtceu:uev_robot_arm",
            "16x gtceu:uev_conveyor_module",
            "64x gtceu:uhv_fluid_regulator",
            "16x gtceu:uev_emitter",
            "8x #gtceu:circuits/uiv",
            "4x gtceu:orichalcum_nanoswarm",
            "16x gtceu:double_red_steel_plate",
            "16x gtceu:double_hastelloy_x_plate",
            "16x gtceu:double_maraging_steel_300_plate",
            "16x gtceu:double_hastelloy_c_276_plate")
        .inputFluids("gtceu:nickel 5760", "gtceu:tantalum 5760", "gtceu:palladium 5760", "gtceu:samarium 5760")
        .itemOutputs("gtceu:bedrock_drilling_rig")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(1200)
        .stationResearch(b => b.researchStack(Registries.getItemStack("kubejs:bedrock_drill"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UEV])
            .CWUt(256))

    gtr.assembly_line("gtceu:superconducting_electromagnetism")
        .itemInputs("4x gtceu:large_electrolyzer",
            "4x gtceu:large_electromagnet",
            "16x gtceu:uv_emitter",
            "8x #gtceu:circuits/uev",
            "64x gtceu:fine_uranium_rhodium_dinaquadide_wire",
            "64x gtceu:fine_uranium_rhodium_dinaquadide_wire",
            "64x gtceu:fine_uranium_rhodium_dinaquadide_wire",
            "64x gtceu:fine_uranium_rhodium_dinaquadide_wire",
            "8x gtceu:double_tantalum_plate",
            "8x gtceu:double_silver_plate",
            "8x gtceu:double_silicon_plate",
            "8x gtceu:double_ruthenium_plate")
        .inputFluids("gtceu:indalloy_140 2880", "gtceu:mutated_living_solder 2880", "gtceu:soldering_alloy 5760", "gtceu:enriched_naquadah_trinium_europium_duranide 5760")
        .itemOutputs("gtceu:superconducting_electromagnetism")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(1200)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:superconducting_coil"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UEV])
            .CWUt(256))

    gtr.assembly_line("gtceu:create_aggregation")
        .itemInputs("32x gtceu:magnetohydrodynamicallyconstrainedstarmatter_frame",
            "16x kubejs:chain_command_block_core",
            "16x gtlcore:spacetimecontinuumripper",
            "8x kubejs:create_aggregatione_core",
            "32x gtlcore:max_robot_arm",
            "32x gtlcore:max_emitter",
            "16x gtlcore:max_field_generator",
            "64x gtceu:infinity_octal_wire",
            "2x gtlcore:mega_max_battery",
            "64x gtceu:cosmic_plate",
            "64x gtceu:double_shirabon_plate",
            "64x gtceu:double_magnetohydrodynamicallyconstrainedstarmatter_plate")
        .inputFluids("gtceu:magnetohydrodynamicallyconstrainedstarmatter 10000", "gtceu:primordialmatter 16000", "gtceu:temporalfluid 32000", "gtceu:spatialfluid 32000")
        .itemOutputs("gtceu:create_aggregation")
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(12000)
        .stationResearch(b => b.researchStack(Registries.getItemStack("kubejs:create_aggregatione_core"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UXV])
            .CWUt(16384))

    gtr.assembly_line("kubejs:create_aggregatione_core")
        .itemInputs("gtceu:magnetohydrodynamicallyconstrainedstarmatter_frame",
            "16x kubejs:dimension_creation_casing",
            "16x kubejs:two_way_foil",
            "16x gtceu:cosmic_foil",
            "64x kubejs:black_body_naquadria_supersolid",
            "16x gtlcore:max_field_generator",
            "32x gtceu:magmatter_rod",
            "8x kubejs:eigenfolded_kerr_manifold",
            "16x gtlcore:max_robot_arm",
            "gtlcore:insanely_max_battery",
            "16x gtceu:magnetohydrodynamicallyconstrainedstarmatter_foil",
            "64x gtceu:eternity_foil")
        .inputFluids("gtceu:magnetohydrodynamicallyconstrainedstarmatter 10000", "gtceu:chaos 10000", "gtceu:temporalfluid 10000", "gtceu:magmatter 10000")
        .itemOutputs("kubejs:create_aggregatione_core")
        .EUt(GTValues.VA[GTValues.UV])
        .duration(120000)
        .stationResearch(b => b.researchStack(Registries.getItemStack("kubejs:dragon_stabilizer_core"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UV])
            .CWUt(16384))

    const parts_materialas = [
        ["uhv", "1", "europium", "abyssalalloy", "uv", "zpm", "400000", "neutronium", "ruthenium_trinium_americium_neutronate", "orichalcum", "2x gtceu:gravi_star", "1", "fluxed_electrum", "gtceu:highurabilityompoundteel 576"],
        ["uev", "2", "mithril", "titansteel", "uhv", "uv", "1600000", "quantanium", "enderite", "hastelloyx_78", "4x gtceu:gravi_star", "2", "dalisenite", "gtceu:bohrium 576"]
    ]
    parts_materialas.forEach((parts_material) => {
        gtr.assembly_line("gtceu:" + parts_material[0] + "_electric_motor")
            .itemInputs("kubejs:magnetic_long_netherite_rod",
                "4x gtceu:long_" + parts_material[9] + "_rod",
                "4x gtceu:" + parts_material[9] + "_ring",
                "8x gtceu:" + parts_material[9] + "_round",
                "64x #forge:fine_wires/" + parts_material[3],
                "64x #forge:fine_wires/" + parts_material[3],
                "2x gtceu:" + parts_material[2] + "_single_cable")
            .inputFluids("gtceu:mutated_living_solder " + 500 * parts_material[1], "gtceu:soldering_alloy " + 1000 * parts_material[1], "gtceu:lubricant " + 2000 * parts_material[1], parts_material[13])
            .itemOutputs("gtceu:" + parts_material[0] + "_electric_motor")
            .EUt(parts_material[6])
            .duration(600)
            .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:" + parts_material[4] + "_electric_motor"))
                .dataStack(Registries.getItemStack("gtceu:data_module"))
                .EUt(parts_material[6])
                .CWUt(64 * parts_material[1]))

        gtr.assembly_line("gtceu:" + parts_material[0] + "_electric_pump")
            .itemInputs("gtceu:" + parts_material[0] + "_electric_motor",
                "gtceu:neutronium_small_fluid_pipe",
                "2x gtceu:" + parts_material[9] + "_plate",
                "8x gtceu:" + parts_material[9] + "_screw",
                parts_material[1] * 4 + "x gtceu:styrene_butadiene_rubber_ring",
                "gtceu:" + parts_material[9] + "_rotor",
                "2x gtceu:" + parts_material[2] + "_single_cable")
            .inputFluids("gtceu:mutated_living_solder " + 576 * parts_material[1], "gtceu:soldering_alloy " + 1152 * parts_material[1], "gtceu:lubricant " + 2000 * parts_material[1], parts_material[13])
            .itemOutputs("gtceu:" + parts_material[0] + "_electric_pump")
            .EUt(parts_material[6])
            .duration(600)
            .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:" + parts_material[4] + "_electric_pump"))
                .dataStack(Registries.getItemStack("gtceu:data_module"))
                .EUt(parts_material[6])
                .CWUt(64 * parts_material[1]))

        gtr.assembly_line("gtceu:" + parts_material[0] + "_conveyor_module")
            .itemInputs("2x gtceu:" + parts_material[0] + "_electric_motor",
                "2x gtceu:" + parts_material[9] + "_plate",
                "4x gtceu:" + parts_material[9] + "_ring",
                "16x gtceu:" + parts_material[9] + "_round",
                "4x gtceu:" + parts_material[9] + "_screw",
                "2x gtceu:" + parts_material[12] + "_plate",
                "2x gtceu:" + parts_material[2] + "_single_cable")
            .inputFluids("gtceu:mutated_living_solder " + 576 * parts_material[1], "gtceu:lubricant " + 2000 * parts_material[1], "gtceu:styrene_butadiene_rubber " + (3456 + 1152 * parts_material[1]), parts_material[13])
            .itemOutputs("gtceu:" + parts_material[0] + "_conveyor_module")
            .EUt(parts_material[6])
            .duration(600)
            .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:" + parts_material[4] + "_conveyor_module"))
                .dataStack(Registries.getItemStack("gtceu:data_module"))
                .EUt(parts_material[6])
                .CWUt(64 * parts_material[1]))

        gtr.assembly_line("gtceu:" + parts_material[0] + "_electric_piston")
            .itemInputs("gtceu:" + parts_material[0] + "_electric_motor",
                "4x gtceu:" + parts_material[9] + "_plate",
                "4x gtceu:" + parts_material[9] + "_ring",
                "16x gtceu:" + parts_material[9] + "_round",
                "4x gtceu:" + parts_material[9] + "_rod",
                "gtceu:" + parts_material[9] + "_gear",
                "2x gtceu:small_" + parts_material[9] + "_gear",
                "2x gtceu:" + parts_material[2] + "_single_cable")
            .inputFluids("gtceu:mutated_living_solder " + 576 * parts_material[1], "gtceu:soldering_alloy " + 1152 * parts_material[1], "gtceu:lubricant " + 2000 * parts_material[1], parts_material[13])
            .itemOutputs("gtceu:" + parts_material[0] + "_electric_piston")
            .EUt(parts_material[6])
            .duration(600)
            .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:" + parts_material[4] + "_electric_piston"))
                .dataStack(Registries.getItemStack("gtceu:data_module"))
                .EUt(parts_material[6])
                .CWUt(64 * parts_material[1]))

        gtr.assembly_line("gtceu:" + parts_material[0] + "_robot_arm")
            .itemInputs("4x gtceu:long_" + parts_material[9] + "_rod",
                "gtceu:" + parts_material[9] + "_gear",
                "3x gtceu:small_" + parts_material[9] + "_gear",
                "2x gtceu:" + parts_material[0] + "_electric_motor",
                "gtceu:" + parts_material[0] + "_electric_piston",
                "#gtceu:circuits/" + parts_material[0],
                "2x #gtceu:circuits/" + parts_material[4],
                "4x #gtceu:circuits/" + parts_material[5],
                "4x gtceu:" + parts_material[2] + "_single_cable")
            .inputFluids("gtceu:mutated_living_solder " + 576 * parts_material[1], "gtceu:soldering_alloy " + 1152 * parts_material[1], "gtceu:lubricant " + 2000 * parts_material[1], parts_material[13])
            .itemOutputs("gtceu:" + parts_material[0] + "_robot_arm")
            .EUt(parts_material[6])
            .duration(600)
            .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:" + parts_material[4] + "_robot_arm"))
                .dataStack(Registries.getItemStack("gtceu:data_module"))
                .EUt(parts_material[6])
                .CWUt(64 * parts_material[1]))

        gtr.assembly_line("gtceu:" + parts_material[0] + "_emitter")
            .itemInputs("gtceu:" + parts_material[7] + "_frame",
                "gtceu:" + parts_material[0] + "_electric_motor",
                "4x gtceu:long_" + parts_material[9] + "_rod",
                parts_material[10],
                "2x #gtceu:circuits/" + parts_material[0],
                "64x #forge:foils/" + parts_material[3],
                "64x #forge:foils/" + parts_material[12],
                "4x gtceu:" + parts_material[2] + "_single_cable")
            .inputFluids("gtceu:mutated_living_solder " + 1152 * parts_material[1], "gtceu:soldering_alloy " + 2304 * parts_material[1], parts_material[13])
            .itemOutputs("gtceu:" + parts_material[0] + "_emitter")
            .EUt(parts_material[6])
            .duration(600)
            .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:" + parts_material[4] + "_emitter"))
                .dataStack(Registries.getItemStack("gtceu:data_module"))
                .EUt(parts_material[6])
                .CWUt(96 * parts_material[1]))

        gtr.assembly_line("gtceu:" + parts_material[0] + "_sensor")
            .itemInputs("gtceu:" + parts_material[7] + "_frame",
                "gtceu:" + parts_material[0] + "_electric_motor",
                "4x gtceu:" + parts_material[9] + "_plate",
                parts_material[10],
                "2x #gtceu:circuits/" + parts_material[0],
                "64x #forge:foils/" + parts_material[3],
                "64x #forge:foils/" + parts_material[12],
                "4x gtceu:" + parts_material[2] + "_single_cable")
            .inputFluids("gtceu:mutated_living_solder " + 1152 * parts_material[1], "gtceu:soldering_alloy " + 2304 * parts_material[1], parts_material[13])
            .itemOutputs("gtceu:" + parts_material[0] + "_sensor")
            .EUt(parts_material[6])
            .duration(600)
            .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:" + parts_material[4] + "_sensor"))
                .dataStack(Registries.getItemStack("gtceu:data_module"))
                .EUt(parts_material[6])
                .CWUt(96 * parts_material[1]))

        gtr.assembly_line("gtceu:" + parts_material[0] + "_field_generator")
            .itemInputs("gtceu:" + parts_material[7] + "_frame",
                "6x gtceu:" + parts_material[7] + "_plate",
                parts_material[10],
                "2x gtceu:" + parts_material[0] + "_emitter",
                "2x #gtceu:circuits/" + parts_material[0],
                "64x #forge:fine_wires/" + parts_material[8],
                "64x #forge:fine_wires/" + parts_material[8],
                "4x gtceu:" + parts_material[2] + "_single_cable")
            .inputFluids("gtceu:mutated_living_solder " + 1152 * parts_material[1], "gtceu:soldering_alloy " + 2304 * parts_material[1], parts_material[13])
            .itemOutputs("gtceu:" + parts_material[0] + "_field_generator")
            .EUt(parts_material[6])
            .duration(600)
            .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:" + parts_material[4] + "_field_generator"))
                .dataStack(Registries.getItemStack("gtceu:data_module"))
                .EUt(parts_material[6])
                .CWUt(96 * parts_material[1]))

        gtr.assembler("gtceu:" + parts_material[0] + "_fluid_regulator")
            .itemInputs("gtceu:" + parts_material[0] + "_electric_pump", "2x #gtceu:circuits/" + parts_material[0])
            .itemOutputs("gtceu:" + parts_material[0] + "_fluid_regulator")
            .EUt(parts_material[6])
            .circuit(1)
            .duration(100)
    })

    const parts_materials = [
        ["uiv", "4", "neutronium", "adamantine", "uev", "uhv", "6400000", "adamantium", "echoite", "infuscolium", "kubejs:unstable_star", "3", "arceusalloy2b", "gtceu:taranium 576"],
        ["uxv", "8", "taranium", "naquadriatictaranium", "uiv", "uev", "25600000", "vibranium", "legendarium", "hastelloyk_243", "2x kubejs:unstable_star", "4", "titan_precision_steel", "gtceu:astraltitanium 576"],
        ["opv", "16", "crystalmatrix", "starmetal", "uxv", "uev", "102400000", "draconium", "draconiumawakened", "vibramantium", "4x kubejs:unstable_star", "5", "hikarium", "gtceu:celestialtungsten 576"]
    ]
    parts_materials.forEach((parts_material) => {
        gtr.assembly_line("gtceu:" + parts_material[0] + "_electric_motor")
            .itemInputs("gtceu:long_attuned_tengam_rod",
                "4x gtceu:long_" + parts_material[9] + "_rod",
                "4x gtceu:" + parts_material[9] + "_ring",
                "8x gtceu:" + parts_material[9] + "_round",
                "64x #forge:fine_wires/" + parts_material[3],
                "64x #forge:fine_wires/" + parts_material[3],
                "2x gtceu:" + parts_material[2] + "_single_cable")
            .inputFluids("gtceu:super_mutated_living_solder " + 500 * parts_material[1], "gtceu:soldering_alloy " + 1000 * parts_material[1], "gtceu:lubricant " + 2000 * parts_material[1], parts_material[13])
            .itemOutputs("gtceu:" + parts_material[0] + "_electric_motor")
            .EUt(parts_material[6])
            .duration(600)
            .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:" + parts_material[4] + "_electric_motor"))
                .dataStack(Registries.getItemStack("gtceu:data_module"))
                .EUt(parts_material[6])
                .CWUt(64 * parts_material[1]))

        gtr.assembly_line("gtceu:" + parts_material[0] + "_electric_pump")
            .itemInputs("gtceu:" + parts_material[0] + "_electric_motor",
                "gtceu:neutronium_small_fluid_pipe",
                "2x gtceu:" + parts_material[9] + "_plate",
                "8x gtceu:" + parts_material[9] + "_screw",
                parts_material[1] * 4 + "x gtceu:styrene_butadiene_rubber_ring",
                "gtceu:" + parts_material[9] + "_rotor",
                "2x gtceu:" + parts_material[2] + "_single_cable")
            .inputFluids("gtceu:super_mutated_living_solder " + 576 * parts_material[1], "gtceu:soldering_alloy " + 1152 * parts_material[1], "gtceu:lubricant " + 2000 * parts_material[1], parts_material[13])
            .itemOutputs("gtceu:" + parts_material[0] + "_electric_pump")
            .EUt(parts_material[6])
            .duration(600)
            .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:" + parts_material[4] + "_electric_pump"))
                .dataStack(Registries.getItemStack("gtceu:data_module"))
                .EUt(parts_material[6])
                .CWUt(64 * parts_material[1]))

        gtr.assembly_line("gtceu:" + parts_material[0] + "_conveyor_module")
            .itemInputs("2x gtceu:" + parts_material[0] + "_electric_motor",
                "2x gtceu:" + parts_material[9] + "_plate",
                "4x gtceu:" + parts_material[9] + "_ring",
                "16x gtceu:" + parts_material[9] + "_round",
                "4x gtceu:" + parts_material[9] + "_screw",
                "2x gtceu:" + parts_material[12] + "_plate",
                "2x gtceu:" + parts_material[2] + "_single_cable")
            .inputFluids("gtceu:super_mutated_living_solder " + 576 * parts_material[1], "gtceu:lubricant " + 2000 * parts_material[1], "gtceu:styrene_butadiene_rubber " + (3456 + 1152 * parts_material[1]), parts_material[13])
            .itemOutputs("gtceu:" + parts_material[0] + "_conveyor_module")
            .EUt(parts_material[6])
            .duration(600)
            .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:" + parts_material[4] + "_conveyor_module"))
                .dataStack(Registries.getItemStack("gtceu:data_module"))
                .EUt(parts_material[6])
                .CWUt(64 * parts_material[1]))

        gtr.assembly_line("gtceu:" + parts_material[0] + "_electric_piston")
            .itemInputs("gtceu:" + parts_material[0] + "_electric_motor",
                "4x gtceu:" + parts_material[9] + "_plate",
                "4x gtceu:" + parts_material[9] + "_ring",
                "16x gtceu:" + parts_material[9] + "_round",
                "4x gtceu:" + parts_material[9] + "_rod",
                "gtceu:" + parts_material[9] + "_gear",
                "2x gtceu:small_" + parts_material[9] + "_gear",
                "2x gtceu:" + parts_material[2] + "_single_cable")
            .inputFluids("gtceu:super_mutated_living_solder " + 576 * parts_material[1], "gtceu:soldering_alloy " + 1152 * parts_material[1], "gtceu:lubricant " + 2000 * parts_material[1], parts_material[13])
            .itemOutputs("gtceu:" + parts_material[0] + "_electric_piston")
            .EUt(parts_material[6])
            .duration(600)
            .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:" + parts_material[4] + "_electric_piston"))
                .dataStack(Registries.getItemStack("gtceu:data_module"))
                .EUt(parts_material[6])
                .CWUt(64 * parts_material[1]))

        gtr.assembly_line("gtceu:" + parts_material[0] + "_robot_arm")
            .itemInputs("4x gtceu:long_" + parts_material[9] + "_rod",
                "gtceu:" + parts_material[9] + "_gear",
                "3x gtceu:small_" + parts_material[9] + "_gear",
                "2x gtceu:" + parts_material[0] + "_electric_motor",
                "gtceu:" + parts_material[0] + "_electric_piston",
                "#gtceu:circuits/" + parts_material[0],
                "2x #gtceu:circuits/" + parts_material[4],
                "4x #gtceu:circuits/" + parts_material[5],
                "4x gtceu:" + parts_material[2] + "_single_cable")
            .inputFluids("gtceu:super_mutated_living_solder " + 576 * parts_material[1], "gtceu:soldering_alloy " + 1152 * parts_material[1], "gtceu:lubricant " + 2000 * parts_material[1], parts_material[13])
            .itemOutputs("gtceu:" + parts_material[0] + "_robot_arm")
            .EUt(parts_material[6])
            .duration(600)
            .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:" + parts_material[4] + "_robot_arm"))
                .dataStack(Registries.getItemStack("gtceu:data_module"))
                .EUt(parts_material[6])
                .CWUt(64 * parts_material[1]))

        gtr.assembly_line("gtceu:" + parts_material[0] + "_emitter")
            .itemInputs("gtceu:" + parts_material[7] + "_frame",
                "gtceu:" + parts_material[0] + "_electric_motor",
                "4x gtceu:long_" + parts_material[9] + "_rod",
                parts_material[10],
                "2x #gtceu:circuits/" + parts_material[0],
                "64x #forge:foils/" + parts_material[3],
                "64x #forge:foils/" + parts_material[12],
                "4x gtceu:" + parts_material[2] + "_single_cable")
            .inputFluids("gtceu:super_mutated_living_solder " + 1152 * parts_material[1], "gtceu:soldering_alloy " + 2304 * parts_material[1], parts_material[13])
            .itemOutputs("gtceu:" + parts_material[0] + "_emitter")
            .EUt(parts_material[6])
            .duration(600)
            .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:" + parts_material[4] + "_emitter"))
                .dataStack(Registries.getItemStack("gtceu:data_module"))
                .EUt(parts_material[6])
                .CWUt(96 * parts_material[1]))

        gtr.assembly_line("gtceu:" + parts_material[0] + "_sensor")
            .itemInputs("gtceu:" + parts_material[7] + "_frame",
                "gtceu:" + parts_material[0] + "_electric_motor",
                "4x gtceu:" + parts_material[9] + "_plate",
                parts_material[10],
                "2x #gtceu:circuits/" + parts_material[0],
                "64x #forge:foils/" + parts_material[3],
                "64x #forge:foils/" + parts_material[12],
                "4x gtceu:" + parts_material[2] + "_single_cable")
            .inputFluids("gtceu:super_mutated_living_solder " + 1152 * parts_material[1], "gtceu:soldering_alloy " + 2304 * parts_material[1], parts_material[13])
            .itemOutputs("gtceu:" + parts_material[0] + "_sensor")
            .EUt(parts_material[6])
            .duration(600)
            .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:" + parts_material[4] + "_sensor"))
                .dataStack(Registries.getItemStack("gtceu:data_module"))
                .EUt(parts_material[6])
                .CWUt(96 * parts_material[1]))

        gtr.assembly_line("gtceu:" + parts_material[0] + "_field_generator")
            .itemInputs("gtceu:" + parts_material[7] + "_frame",
                "6x gtceu:" + parts_material[7] + "_plate",
                parts_material[10],
                "2x gtceu:" + parts_material[0] + "_emitter",
                "2x #gtceu:circuits/" + parts_material[0],
                "64x #forge:fine_wires/" + parts_material[8],
                "64x #forge:fine_wires/" + parts_material[8],
                "4x gtceu:" + parts_material[2] + "_single_cable")
            .inputFluids("gtceu:super_mutated_living_solder " + 1152 * parts_material[1], "gtceu:soldering_alloy " + 2304 * parts_material[1], parts_material[13])
            .itemOutputs("gtceu:" + parts_material[0] + "_field_generator")
            .EUt(parts_material[6])
            .duration(600)
            .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:" + parts_material[4] + "_field_generator"))
                .dataStack(Registries.getItemStack("gtceu:data_module"))
                .EUt(parts_material[6])
                .CWUt(96 * parts_material[1]))

        gtr.assembler("gtceu:" + parts_material[0] + "_fluid_regulator")
            .itemInputs("gtceu:" + parts_material[0] + "_electric_pump", "2x #gtceu:circuits/" + parts_material[0])
            .itemOutputs("gtceu:" + parts_material[0] + "_fluid_regulator")
            .EUt(parts_material[6])
            .circuit(1)
            .duration(100)
    })

    gtr.assembly_line("kubejs:dimensional_stability_casing")
        .itemInputs("kubejs:containment_field_generator",
            "4x kubejs:dyson_control_casing",
            "4x kubejs:dyson_control_toroid",
            "gtceu:uxv_field_generator",
            "4x gtceu:uiv_field_generator",
            "2x gtceu:opv_electric_pump",
            "2x gtceu:rtm_alloy_spring",
            "#gtceu:circuits/uev",
            "2x gtceu:crystalmatrix_rod",
            "gtceu:double_crystalmatrix_plate")
        .inputFluids("gtceu:super_mutated_living_solder 288", "gtceu:liquid_degenerate_rhenium 200", "gtceu:pikyonium 288", "gtceu:periodicium 288")
        .itemOutputs("kubejs:dimensional_stability_casing")
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(800)
        .stationResearch(b => b.researchStack(Registries.getItemStack("kubejs:dimensional_bridge_casing"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UXV])
            .CWUt(1024))

    gtr.assembly_line("gtceu:pcb_factory")
        .itemInputs("4x gtceu:neutronium_frame",
            "4x gtceu:uv_circuit_assembler",
            "4x gtceu:chemical_plant",
            "4x #gtceu:circuits/uev",
            "4x gtceu:uhv_robot_arm",
            "4x gtceu:uhv_electric_pump",
            "2x gtceu:uhv_sensor",
            "2x gtceu:uhv_emitter",
            "gtceu:uhv_field_generator",
            "2x gtceu:iridium_nanoswarm",
            "2x gtceu:silver_nanoswarm",
            "16x gtceu:double_grisium_plate")
        .inputFluids("gtceu:soldering_alloy 2592", "gtceu:bismuth_bronze 2582", "gtceu:indalloy_140 1440", "gtceu:enriched_naquadah 1296")
        .itemOutputs("gtceu:pcb_factory")
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(600)
        .stationResearch(b => b.researchStack(Registries.getItemStack("kubejs:bioware_circuit_board"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UHV])
            .CWUt(128))

    gtr.assembly_line("gtceu:large_naquadah_reactor")
        .itemInputs("64x gtceu:hpic_chip",
            "64x gtceu:uhpic_chip",
            "32x gtceu:uranium_rhodium_dinaquadide_single_wire",
            "24x gtceu:enriched_naquadah_foil",
            "16x gtceu:duranium_gear",
            "8x gtceu:double_duranium_plate",
            "8x gtceu:double_naquadria_plate",
            "2x gtceu:uv_electric_piston",
            "gtceu:uv_field_generator",
            "gtceu:uv_electric_pump",
            "4x #gtceu:circuits/uhv")
        .inputFluids("gtceu:soldering_alloy 5760", "gtceu:indalloy_140 2304", "gtceu:trinium 2304")
        .itemOutputs("gtceu:large_naquadah_reactor")
        .EUt(90000)
        .duration(1000)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:zpm_naquadah_reactor"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UV])
            .CWUt(64))

    gtr.assembly_line("gtceu:aggregation_device")
        .itemInputs("4x kubejs:draconium_block_charged", "64x kubejs:pm_chip", "64x kubejs:pm_chip", "8x kubejs:reinforced_echo_shard", "4x gtceu:enderite_hex_wire", "4x gtceu:uev_field_generator", "gtlcore:really_max_battery", "64x gtceu:quantanium_screw", "8x gtceu:double_dalisenite_plate", "8x gtceu:double_seaborgium_plate")
        .itemOutputs("gtceu:aggregation_device")
        .inputFluids("gtceu:mutated_living_solder 1296", "gtceu:neutronium 576", "gtceu:mana 1000", "gtceu:enriched_dragon_breath 100")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(1600)
        .stationResearch(b => b.researchStack(Registries.getItemStack("kubejs:aggregatione_core"))
            .EUt(GTValues.VA[GTValues.UEV])
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .CWUt(128))

    gtr.assembly_line("gtceu:super_particle_collider")
        .itemInputs("16x gtceu:zpm_field_generator", "16x gtceu:zpm_electric_pump", "64x gtceu:uhpic_chip", "64x gtceu:uhpic_chip", "64x gtceu:uhpic_chip", "64x gtceu:uhpic_chip", "16x gtceu:uranium_rhodium_dinaquadide_hex_wire", "32x #gtceu:circuits/uv", "16x gtceu:neutron_reflector", "8x gtceu:double_lafium_plate")
        .itemOutputs("gtceu:super_particle_collider")
        .inputFluids("gtceu:soldering_alloy 1152", "gtceu:protactinium 1152", "gtceu:uranium 1152", "gtceu:neptunium 1152")
        .EUt(GTValues.VA[GTValues.ZPM])
        .duration(800)
        .stationResearch(b => b.researchStack(Registries.getItemStack("kubejs:accelerated_pipeline"))
            .EUt(GTValues.VA[GTValues.ZPM])
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .CWUt(32))

    gtr.assembly_line("gtceu:space_elevator")
        .itemInputs("16x gtceu:gravitation_engine_unit", "8x gtceu:uv_field_generator", "8x #gtceu:circuits/uhv", "16x #gtceu:circuits/uv", "32x #gtceu:circuits/zpm", "64x #gtceu:circuits/luv", "4x kubejs:module_connector", "32x gtceu:indium_tin_barium_titanium_cuprate_hex_wire", "16x gtceu:uranium_rhodium_dinaquadide_hex_wire", "8x gtceu:enriched_naquadah_trinium_europium_duranide_hex_wire", "48x gtceu:americium_huge_restrictive_item_pipe", "48x gtceu:duranium_huge_fluid_pipe", "64x gtceu:carbon_nanoswarm", "64x gtceu:carbon_nanoswarm", "32x gtceu:double_pikyonium_plate", "16x gtceu:double_orichalcum_plate")
        .itemOutputs("gtceu:space_elevator")
        .inputFluids("gtceu:soldering_alloy 4096", "gtceu:mendelevium 4096", "gtceu:nobelium 4096", "gtceu:lawrencium 4096")
        .EUt(GTValues.VA[GTValues.UV])
        .duration(1600)
        .stationResearch(b => b.researchStack(Registries.getItemStack("ad_astra_rocketed:tier_7_rocket"))
            .EUt(GTValues.VA[GTValues.UV])
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .CWUt(64))

    gtr.assembly_line("gtceu:engraving_laser_plant")
        .itemInputs("8x gtceu:uv_laser_engraver", "8x gtceu:uhv_emitter", "8x gtceu:uhv_electric_piston", "8x gtceu:uhv_sensor", "8x gtceu:uhv_robot_arm", "8x gtceu:uhv_electric_pump", "32x gtceu:stellite_rod", "8x #gtceu:circuits/uev", "32x gtceu:fluxed_electrum_plate", "32x gtceu:grisium_plate", "16x gtceu:double_titanium_carbide_plate", "16x gtceu:double_titanium_tungsten_carbide_plate")
        .itemOutputs("gtceu:engraving_laser_plant")
        .inputFluids("gtceu:indalloy_140 2592", "gtceu:artherium_sn 1296", "gtceu:mutated_living_solder 1296", "gtceu:soldering_alloy 2880")
        .EUt(GTValues.VA[GTValues.UV])
        .duration(1200)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:large_engraving_laser"))
            .EUt(GTValues.VA[GTValues.UV])
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .CWUt(64))

    gtr.assembly_line("gtceu:qft")
        .itemInputs("8x gtceu:vibranium_frame", "4x gtlcore:spacetimecontinuumripper", "4x gtlcore:spacetimebendingcore", "8x kubejs:precision_circuit_assembly_robot_mk4", "8x gtceu:uxv_sensor", "8x gtceu:uxv_robot_arm", "8x gtceu:uxv_electric_pump", "8x gtceu:uxv_field_generator", "8x #gtceu:circuits/opv", "gtlcore:extremely_max_battery", "64x gtceu:double_lafium_plate", "64x gtceu:double_titan_precision_steel_plate")
        .itemOutputs("gtceu:qft")
        .inputFluids("gtceu:super_mutated_living_solder 1296", "gtceu:tairitsu 2880", "gtceu:soldering_alloy 2880", "gtceu:periodicium 2880")
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(2400)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtlcore:spacetimebendingcore"))
            .EUt(GTValues.VA[GTValues.UXV])
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .CWUt(2048))

    const wireless_tiers = [
        [0, "uhv", "neutronium", "europium", "kubejs:nm_chip", "8x kubejs:smd_inductor_bioware", "gtceu"],
        [1, "uev", "quantanium", "mithril", "kubejs:nm_chip", "8x kubejs:smd_inductor_optical", "gtceu"],
        [2, "uiv", "adamantium", "neutronium", "kubejs:pm_chip", "8x kubejs:smd_inductor_exotic", "gtceu"],
        [3, "uxv", "vibranium", "taranium", "kubejs:pm_chip", "8x kubejs:smd_inductor_cosmic", "gtceu"],
        [4, "opv", "draconium", "crystalmatrix", "kubejs:fm_chip", "8x kubejs:smd_inductor_supracausal", "gtceu"],
        [5, "max", "chaos", "cosmicneutronium", "kubejs:fm_chip", "8x gtceu:shirabon_foil", "gtlcore"]
    ]
    wireless_tiers.forEach((tier) => {
        let soldering = tier[0] < 3 ? "gtceu:mutated_living_solder 144" : "gtceu:super_mutated_living_solder 144"
        gtr.assembler(`gtmthings:${tier[1]}_wireless_energy_receive_cover`)
            .itemInputs(`${tier[6]}:${tier[1]}_sensor`,
                `${tier[6]}:${tier[1]}_emitter`,
                "4x gtceu:ender_pearl_plate",
                "2x #gtceu:circuits/" + tier[1],
                `kubejs:${tier[1]}_voltage_coil`,
                tier[4],
                `2x gtceu:${tier[3]}_single_cable`,
                "2x gtceu:red_alloy_single_cable",
                `4x gtceu:${tier[2]}_plate`)
            .inputFluids(soldering)
            .itemOutputs(`gtmthings:${tier[1]}_wireless_energy_receive_cover`)
            .EUt(GTValues.VA[tier[0] + 9])
            .duration(200)
        gtr.assembler(`gtmthings:${tier[1]}_4a_wireless_energy_receive_cover`)
            .itemInputs(`2x gtmthings:${tier[1]}_wireless_energy_receive_cover`,
                tier[5],
                `4x gtceu:niobium_titanium_quadruple_cable`,
                `2x kubejs:${tier[1]}_voltage_coil`,
                "2x gtceu:double_battery_alloy_plate")
            .inputFluids(soldering)
            .itemOutputs(`gtmthings:${tier[1]}_4a_wireless_energy_receive_cover`)
            .EUt(GTValues.VA[tier[0] + 9])
            .duration(200)
    })

    for (let index = 5; index < 15; index++) {
        let tierName = GTValues.VN[index].toLowerCase()
        gtr.assembler(`gtmthings:${tierName}_16384a_wireless_laser_target_hatch`)
            .itemInputs(`gtceu:${tierName}_16384a_laser_target_hatch`,
                `16x gtmthings:${tierName}_4a_wireless_energy_receive_cover`,
                "gtceu:active_transformer",
                "gtceu:superconducting_coil",
                "2x gtceu:high_power_casing",
                "4x gtceu:normal_laser_pipe",
                "gtceu:advanced_energy_detector_cover")
            .inputFluids("gtceu:soldering_alloy 144")
            .itemOutputs(`gtmthings:${tierName}_16384a_wireless_laser_target_hatch`)
            .EUt(GTValues.VA[index])
            .duration(200)

        gtr.assembler(`gtmthings:${tierName}_16384a_wireless_laser_source_hatch`)
            .itemInputs(`gtceu:${tierName}_16384a_laser_source_hatch`,
                `16x gtmthings:${tierName}_4a_wireless_energy_receive_cover`,
                "gtceu:active_transformer",
                "gtceu:superconducting_coil",
                "2x gtceu:high_power_casing",
                "4x gtceu:normal_laser_pipe",
                "gtceu:advanced_energy_detector_cover")
            .inputFluids("gtceu:soldering_alloy 144")
            .itemOutputs(`gtmthings:${tierName}_16384a_wireless_laser_source_hatch`)
            .EUt(GTValues.VA[index])
            .duration(200)

        gtr.assembler(`gtmthings:${tierName}_65536a_wireless_laser_target_hatch`)
            .itemInputs(`gtceu:${tierName}_65536a_laser_target_hatch`,
                `16x gtmthings:${tierName}_4a_wireless_energy_receive_cover`,
                "gtceu:active_transformer",
                "2x gtceu:superconducting_coil",
                "2x gtceu:high_power_casing",
                "8x gtceu:normal_laser_pipe",
                "gtceu:advanced_energy_detector_cover")
            .inputFluids("gtceu:soldering_alloy 144")
            .itemOutputs(`gtmthings:${tierName}_65536a_wireless_laser_target_hatch`)
            .EUt(GTValues.VA[index])
            .duration(200)

        gtr.assembler(`gtmthings:${tierName}_65536a_wireless_laser_source_hatch`)
            .itemInputs(`gtceu:${tierName}_65536a_laser_source_hatch`,
                `16x gtmthings:${tierName}_4a_wireless_energy_receive_cover`,
                "gtceu:active_transformer",
                "2x gtceu:superconducting_coil",
                "2x gtceu:high_power_casing",
                "8x gtceu:normal_laser_pipe",
                "gtceu:advanced_energy_detector_cover")
            .inputFluids("gtceu:soldering_alloy 144")
            .itemOutputs(`gtmthings:${tierName}_65536a_wireless_laser_source_hatch`)
            .EUt(GTValues.VA[index])
            .duration(200)

        gtr.assembler(`gtmthings:${tierName}_262144a_wireless_laser_target_hatch`)
            .itemInputs(`gtceu:${tierName}_262144a_laser_target_hatch`,
                `16x gtmthings:${tierName}_4a_wireless_energy_receive_cover`,
                "2x gtceu:active_transformer",
                "2x gtceu:superconducting_coil",
                "2x gtceu:high_power_casing",
                "16x gtceu:normal_laser_pipe",
                "gtceu:advanced_energy_detector_cover")
            .inputFluids("gtceu:soldering_alloy 144")
            .itemOutputs(`gtmthings:${tierName}_262144a_wireless_laser_target_hatch`)
            .EUt(GTValues.VA[index])
            .duration(200)

        gtr.assembler(`gtmthings:${tierName}_262144a_wireless_laser_source_hatch`)
            .itemInputs(`gtceu:${tierName}_262144a_laser_source_hatch`,
                `16x gtmthings:${tierName}_4a_wireless_energy_receive_cover`,
                "2x gtceu:active_transformer",
                "2x gtceu:superconducting_coil",
                "2x gtceu:high_power_casing",
                "16x gtceu:normal_laser_pipe",
                "gtceu:advanced_energy_detector_cover")
            .inputFluids("gtceu:soldering_alloy 144")
            .itemOutputs(`gtmthings:${tierName}_262144a_wireless_laser_source_hatch`)
            .EUt(GTValues.VA[index])
            .duration(200)


        gtr.assembler(`gtmthings:${tierName}_1048576a_wireless_laser_target_hatch`)
            .itemInputs(`gtceu:${tierName}_1048576a_laser_target_hatch`,
                `16x gtmthings:${tierName}_4a_wireless_energy_receive_cover`,
                "2x gtceu:active_transformer",
                "4x gtceu:superconducting_coil",
                "2x gtceu:high_power_casing",
                "32x gtceu:normal_laser_pipe",
                "4x kubejs:molecular_coil",
                "gtceu:advanced_energy_detector_cover")
            .inputFluids("gtceu:soldering_alloy 144")
            .itemOutputs(`gtmthings:${tierName}_1048576a_wireless_laser_target_hatch`)
            .EUt(GTValues.VA[index])
            .duration(200)

        gtr.assembler(`gtmthings:${tierName}_1048576a_wireless_laser_source_hatch`)
            .itemInputs(`gtceu:${tierName}_1048576a_laser_source_hatch`,
                `16x gtmthings:${tierName}_4a_wireless_energy_receive_cover`,
                "2x gtceu:active_transformer",
                "4x gtceu:superconducting_coil",
                "2x gtceu:high_power_casing",
                "32x gtceu:normal_laser_pipe",
                "4x kubejs:molecular_coil",
                "gtceu:advanced_energy_detector_cover")
            .inputFluids("gtceu:soldering_alloy 144")
            .itemOutputs(`gtmthings:${tierName}_1048576a_wireless_laser_source_hatch`)
            .EUt(GTValues.VA[index])
            .duration(200)

        gtr.assembler(`gtmthings:${tierName}_4194304a_wireless_laser_target_hatch`)
            .itemInputs(`gtceu:${tierName}_4194304a_laser_target_hatch`,
                `16x gtmthings:${tierName}_4a_wireless_energy_receive_cover`,
                "2x gtceu:active_transformer",
                "8x gtceu:superconducting_coil",
                "2x gtceu:high_power_casing",
                "32x gtceu:normal_laser_pipe",
                "8x kubejs:molecular_coil",
                "gtceu:advanced_energy_detector_cover")
            .inputFluids("gtceu:soldering_alloy 144")
            .itemOutputs(`gtmthings:${tierName}_4194304a_wireless_laser_target_hatch`)
            .EUt(GTValues.VA[index])
            .duration(200)

        gtr.assembler(`gtmthings:${tierName}_4194304a_wireless_laser_source_hatch`)
            .itemInputs(`gtceu:${tierName}_4194304a_laser_source_hatch`,
                `16x gtmthings:${tierName}_4a_wireless_energy_receive_cover`,
                "2x gtceu:active_transformer",
                "8x gtceu:superconducting_coil",
                "2x gtceu:high_power_casing",
                "32x gtceu:normal_laser_pipe",
                "8x kubejs:molecular_coil",
                "gtceu:advanced_energy_detector_cover")
            .inputFluids("gtceu:soldering_alloy 144")
            .itemOutputs(`gtmthings:${tierName}_4194304a_wireless_laser_source_hatch`)
            .EUt(GTValues.VA[index])
            .duration(200)
    }
    const machine_materials = [
        ["uhv", "neutronium", "europium", "abyssalalloy", "uev", "1966080", "uv", "128", "kubejs:smd_diode_bioware"],
        ["uev", "quantanium", "mithril", "titansteel", "uiv", "7864320", "uhv", "256", "kubejs:smd_diode_optical"],
        ["uiv", "adamantium", "neutronium", "adamantine", "uxv", "31457280", "uev", "512", "kubejs:smd_diode_exotic"],
        ["uxv", "vibranium", "taranium", "naquadriatictaranium", "opv", "125829120", "uiv", "1024", "kubejs:smd_diode_cosmic"],
        ["opv", "draconium", "crystalmatrix", "starmetal", "max", "503316480", "uxv", "2048", "kubejs:smd_diode_supracausal"]
    ]
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
        .itemInputs("4x gtceu:double_vanadium_steel_plate",
            "4x gtceu:black_bronze_gear",
            "8x gtceu:eglin_steel_rod",
            "4x gtceu:hv_electric_motor",
            "4x gtceu:hv_emitter",
            "4x #gtceu:circuits/ev",
            "4x gtceu:double_eglin_steel_plate",
            "8x gtceu:double_brass_plate",
            "8x gtceu:double_tin_plate")
        .inputFluids("gtceu:soldering_alloy 864")
        .itemOutputs("gtceu:large_recycler")
        .EUt(1920)
        .duration(400)

    gtr.large_recycler("kubejs:scrap_1")
        .itemInputs("#forge:ingots")
        .itemOutputs("kubejs:scrap")
        .EUt(480)
        .duration(200)

    gtr.large_recycler("kubejs:scrap_2")
        .itemInputs("#forge:dusts")
        .itemOutputs("kubejs:scrap")
        .EUt(120)
        .duration(200)

    gtr.large_recycler("kubejs:scrap_3")
        .itemInputs("4x #forge:small_dusts")
        .itemOutputs("kubejs:scrap")
        .EUt(120)
        .duration(200)

    gtr.large_recycler("kubejs:scrap_4")
        .itemInputs("9x #forge:tiny_dusts")
        .itemOutputs("kubejs:scrap")
        .EUt(120)
        .duration(200)

    gtr.large_recycler("kubejs:scrap_5")
        .itemInputs("#forge:storage_blocks")
        .itemOutputs("9x kubejs:scrap")
        .EUt(1920)
        .duration(400)

    gtr.large_recycler("kubejs:scrap_6")
        .itemInputs("9x #forge:nuggets")
        .itemOutputs("kubejs:scrap")
        .EUt(480)
        .duration(200)

    gtr.large_recycler("kubejs:scrap_7")
        .itemInputs("#forge:gems")
        .itemOutputs("kubejs:scrap")
        .EUt(480)
        .duration(200)

    gtr.large_recycler("kubejs:scrap_8")
        .itemInputs("#minecraft:logs")
        .itemOutputs("kubejs:scrap")
        .EUt(120)
        .duration(200)

    gtr.mixer("gtceu:fertilizer_")
        .itemInputs("gtceu:fertilizer", "2x kubejs:scrap")
        .itemOutputs("2x gtceu:fertilizer")
        .EUt(480)
        .duration(40)

    gtr.packer("kubejs:scrap_box")
        .itemInputs("9x kubejs:scrap")
        .itemOutputs("kubejs:scrap_box")
        .EUt(12)
        .duration(200)

    gtr.assembler("gtlcore:space_elevator_mechanical_casing")
        .itemInputs("gtceu:hssg_frame", "6x gtceu:inconel_792_plate", "6x gtceu:double_pikyonium_plate")
        .itemOutputs("2x gtlcore:space_elevator_mechanical_casing")
        .EUt(16)
        .duration(50)
        .circuit(6)

    gtr.chemical_bath("kubejs:high_strength_concrete")
        .itemInputs("#forge:concretes")
        .inputFluids("gtceu:concrete 1152")
        .itemOutputs("kubejs:high_strength_concrete")
        .EUt(480)
        .duration(200)

    gtr.assembler("gtlcore:space_elevator_support")
        .itemInputs("gtceu:naquadah_frame", "4x gtceu:red_steel_rod", "6x gtceu:black_steel_plate")
        .inputFluids("gtceu:concrete 1152")
        .itemOutputs("2x gtlcore:space_elevator_support")
        .EUt(480)
        .duration(400)

    gtr.assembler("kubejs:space_elevator_internal_support")
        .itemInputs("gtceu:naquadah_frame", "2x gtceu:niobium_titanium_single_wire", "16x gtceu:fine_annealed_copper_wire", "#gtceu:circuits/luv", "6x gtceu:double_iridium_plate")
        .inputFluids("gtceu:concrete 1152")
        .itemOutputs("2x kubejs:space_elevator_internal_support")
        .EUt(480)
        .duration(400)

    gtr.mass_fabricator("gtceu:uu_matter")
        .itemInputs("ae2:matter_ball")
        .inputFluids("gtceu:uu_amplifier 10")
        .outputFluids("gtceu:uu_matter 10")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(20)

    const world_data_scanner = [
        ["lv", "gtceu:tin_single_cable"],
        ["mv", "gtceu:copper_single_cable"],
        ["hv", "gtceu:gold_single_cable"],
        ["ev", "gtceu:aluminium_single_cable"],
        ["iv", "gtceu:platinum_single_cable"],
        ["luv", "gtceu:niobium_titanium_single_cable"],
        ["zpm", "gtceu:vanadium_gallium_single_cable"],
        ["uv", "gtceu:yttrium_barium_cuprate_single_cable"],
        ["uhv", "gtceu:europium_single_cable"],
        ["uev", "gtceu:mithril_single_cable"],
        ["uiv", "gtceu:neutronium_single_cable"],
        ["uxv", "gtceu:taranium_single_cable"],
        ["opv", "gtceu:crystalmatrix_single_cable"]]
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

    event.shaped("2x kubejs:neutronium_pipe_casing", [
        "CBC",
        "BAB",
        "CBC"
    ], {
        A: "gtceu:neutronium_frame",
        B: "gtceu:neutronium_normal_fluid_pipe",
        C: "gtceu:neutronium_plate"
    })

    event.shaped("2x kubejs:neutronium_gearbox", [
        "CEC",
        "BAB",
        "CFC"
    ], {
        A: "gtceu:neutronium_frame",
        B: "gtceu:neutronium_gear",
        C: "gtceu:neutronium_plate",
        E: "#forge:tools/hammers",
        F: "#forge:tools/wrench"
    })

    event.shaped("gtlcore:advanced_assembly_line_unit", [
        "CEC",
        "BAB",
        "CEC"
    ], {
        A: "gtceu:assembly_line_unit",
        B: "#gtceu:circuits/uv",
        C: "gtceu:hssg_plate",
        E: "gtceu:rhodium_gear"
    })

    gtr.assembler("gtceu:void_miner")
        .itemInputs("gtceu:lv_miner",
            "gtceu:mv_miner",
            "gtceu:hv_miner",
            "4x gtceu:lv_field_generator",
            "4x gtceu:mv_field_generator",
            "4x gtceu:hv_field_generator",
            "4x #gtceu:circuits/ev",
            "gtceu:long_titanium_rod",
            "4x gtceu:titanium_plate")
        .inputFluids("gtceu:soldering_alloy 1440")
        .itemOutputs("gtceu:void_miner")
        .EUt(GTValues.VA[GTValues.HV])
        .duration(800)

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
        .itemOutputs("2x kubejs:netherite_rod")
        .EUt(480)
        .duration(400)

    gtr.forge_hammer("kubejs:long_netherite_rod")
        .itemInputs("2x kubejs:netherite_rod")
        .itemOutputs("kubejs:long_netherite_rod")
        .EUt(30)
        .duration(200)

    gtr.forge_hammer("kubejs:magnetic_long_netherite_rod")
        .itemInputs("2x kubejs:magnetic_netherite_rod")
        .itemOutputs("kubejs:magnetic_long_netherite_rod")
        .EUt(30)
        .duration(200)

    gtr.polarizer("kubejs:magnetic_netherite_rod")
        .itemInputs("kubejs:netherite_rod")
        .itemOutputs("kubejs:magnetic_netherite_rod")
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(200)

    gtr.polarizer("kubejs:magnetic_long_netherite_rod")
        .itemInputs("kubejs:long_netherite_rod")
        .itemOutputs("kubejs:magnetic_long_netherite_rod")
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(400)
})
