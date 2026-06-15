//priority: 96
ServerEvents.recipes((event) => {

    event.remove({ id: "gtceu:chemical_reactor/styrene_from_ethylbenzene" })
    event.remove({ id: "gtceu:large_chemical_reactor/styrene_from_ethylbenzene" })
    event.remove({ id: "gtceu:chemical_reactor/vinyl_chloride_from_ethane" })
    event.remove({ id: "gtceu:large_chemical_reactor/vinyl_chloride_from_ethane" })
    event.remove({ id: "gtceu:chemical_reactor/dimethylchlorosilane_from_chloromethane" })
    event.remove({ id: "gtceu:large_chemical_reactor/dimethylchlorosilane_from_chloromethane" })
    event.remove({ id: "gtceu:chemical_reactor/formic_acid" })
    event.remove({ id: "gtceu:large_chemical_reactor/formic_acid" })
    event.remove({ id: "gtceu:chemical_reactor/ethylene_from_ethanol" })
    event.remove({ id: "gtceu:large_chemical_reactor/ethylene_from_ethanol" })
    event.remove({ id: "gtceu:chemical_reactor/stem_cells" })
    event.remove({ id: "gtceu:large_chemical_reactor/stem_cells" })
    event.remove({ id: "gtceu:chemical_reactor/calcite_from_quicklime" })
    event.remove({ id: "gtceu:large_chemical_reactor/calcite_from_quicklime" })
    event.remove({ id: "gtceu:chemical_reactor/calcium_hydroxide" })
    event.remove({ id: "gtceu:large_chemical_reactor/calcium_hydroxide" })
    event.remove({ id: "gtceu:electrolyzer/bone_meal_electrolysis" })
    event.remove({ id: "gtceu:mixer/rocket_fuel_from_dinitrogen_tetroxide" })
    event.remove({ id: "gtceu:centrifuge/rare_earth_separation" })
    event.remove({ id: "gtceu:extruder/nan_certificate" })
    event.remove({ id: "gtceu:shaped/maintenance_hatch_cleaning" })
    event.remove({ id: "gtceu:forming_press/credit_cupronickel" })
    event.remove({ id: "gtceu:electrolyzer/tungstic_acid_electrolysis" })
    event.remove({ id: "gtceu:chemical_reactor/acetic_acid_from_methanol" })
    event.remove({ id: "gtceu:shaped/treated_planks_saw" })
    event.remove({ id: "gtceu:shapeless/treated_planks" })
    event.remove({ id: "gtceu:cutter/treated_planks" })
    event.remove({ id: "gtceu:cutter/treated_planks_water" })
    event.remove({ id: "gtceu:cutter/treated_planks_8_water" })
    event.remove({ id: "gtceu:cutter/treated_planks_16_water" })
    event.remove({ id: "gtceu:cutter/treated_planks_distilled_water" })
    event.shapeless("gtlcore:cfg_copy", "minecraft:writable_book")
    event.shapeless("gtceu:advanced_multi_smelter", "gtceu:multi_smelter")
    event.shapeless("gtceu:suprachronal_assembly_line_module", "gtceu:suprachronal_assembly_line")
    event.shapeless("gtceu:suprachronal_assembly_line", "gtceu:suprachronal_assembly_line_module")
    event.shapeless("gtceu:spacetime_small_fluid_pipe", ["gtceu:spacetime_tiny_fluid_pipe", "gtceu:spacetime_tiny_fluid_pipe"])
    event.shapeless("gtceu:spacetime_normal_fluid_pipe", ["gtceu:spacetime_small_fluid_pipe", "gtceu:spacetime_small_fluid_pipe"])
    event.shapeless("gtceu:spacetime_quadruple_fluid_pipe", ["gtceu:spacetime_small_fluid_pipe", "gtceu:spacetime_small_fluid_pipe", "gtceu:spacetime_small_fluid_pipe", "gtceu:spacetime_small_fluid_pipe"])
    event.shapeless("gtceu:spacetime_nonuple_fluid_pipe", ["gtceu:spacetime_small_fluid_pipe", "gtceu:spacetime_small_fluid_pipe", "gtceu:spacetime_small_fluid_pipe", "gtceu:spacetime_small_fluid_pipe", "gtceu:spacetime_small_fluid_pipe", "gtceu:spacetime_small_fluid_pipe", "gtceu:spacetime_small_fluid_pipe", "gtceu:spacetime_small_fluid_pipe", "gtceu:spacetime_small_fluid_pipe"])
    event.shapeless("gtceu:spacetime_large_fluid_pipe", ["gtceu:spacetime_normal_fluid_pipe", "gtceu:spacetime_normal_fluid_pipe"])
    event.shapeless("gtceu:spacetime_huge_fluid_pipe", ["gtceu:spacetime_large_fluid_pipe", "gtceu:spacetime_large_fluid_pipe"])
    event.shaped(Registries.getItemStack("gtlcore:primitive_robot_arm", 64), [
        "AAA",
        "BEB",
        "CDE"
    ], {
        A: "gtceu:potin_tiny_fluid_pipe",
        B: "gtceu:bronze_gear",
        C: "kubejs:precision_steam_mechanism",
        D: "#gtceu:circuits/ulv",
        E: "gtceu:bronze_rod"
    })

    event.shaped(Registries.getItemStack("gtlcore:primitive_fluid_regulator", 64), [
        "BAE",
        "DFA",
        "ECB"
    ], {
        A: "gtceu:potin_tiny_fluid_pipe",
        B: "gtceu:bronze_rotor",
        C: "kubejs:precision_steam_mechanism",
        D: "#gtceu:circuits/ulv",
        E: "gtceu:bronze_bolt",
        F: "gtceu:copper_normal_fluid_pipe"
    })

    event.shaped("gtmthings:creative_laser_hatch", [
        "ABA",
        "BCB",
        "ABA"
    ], {
        A: "minecraft:chain_command_block",
        B: "kubejs:chaotic_energy_core",
        C: "gtmthings:max_4194304a_wireless_laser_target_hatch"
    })

     event.shaped("gtmthings:creative_energy_hatch", [
            "ABA",
            "BCB",
            "ABA"
        ], {
            A: "minecraft:chain_command_block",
            B: "kubejs:chaotic_energy_core",
            C: "gtmthings:max_64a_wireless_energy_input_hatch"
        })

    event.shaped("gtceu:large_steam_input_hatch", [
        "ACA",
        "BDB",
        "ACA"
    ], {
        A: "kubejs:precision_steam_mechanism",
        B: "gtceu:stainless_steel_tiny_fluid_pipe",
        C: "gtceu:iron_rotor",
        D: "gtceu:steam_input_hatch"
    })

    event.shaped("kubejs:reactor_core", [
        "ACA",
        "CDC",
        "ACA"
    ], {
        A: "gtceu:steel_plate",
        C: "gtceu:gold_plate",
        D: "gtceu:pulsating_alloy_block"
    })

    event.shaped("minecraft:heart_of_the_sea", [
        "ACA",
        "CDC",
        "ACA"
    ], {
        A: "gtceu:quantum_star",
        C: "kubejs:glacio_spirit",
        D: "kubejs:pellet_antimatter"
    })

    event.shaped("gtceu:large_rock_crusher", [
        "ABA",
        "CDC",
        "ABA"
    ], {
        A: "gtceu:iv_electric_piston",
        B: "#gtceu:circuits/iv",
        C: "gtceu:platinum_double_cable",
        D: "gtceu:iv_rock_crusher"
    })

    event.shaped("gtceu:incubator", [
        "ABA",
        "CDC",
        "ABA"
    ], {
        A: "gtceu:plascrete",
        B: "gtceu:hv_field_generator",
        C: "gtceu:filter_casing",
        D: "gtceu:greenhouse"
    })

    event.shaped("gtceu:block_conversion_room", [
        "ABA",
        "BDB",
        "ABA"
    ], {
        A: "gtceu:quantum_eye",
        B: "gtceu:lv_field_generator",
        D: "minecraft:netherite_block"
    })

    event.shaped("gtceu:lava_furnace", [
        "ABA",
        "CDC",
        "ABA"
    ], {
        A: "gtceu:double_copper_plate",
        B: "gtceu:double_wrought_iron_plate",
        C: "gtceu:tin_hex_cable",
        D: "gtceu:steam_oven"
    })

    event.shaped("gtceu:mega_alloy_blast_smelter", [
        "AFA",
        "CDC",
        "EBE"
    ], {
        A: "gtceu:naquadah_alloy_spring",
        B: "gtceu:enriched_naquadah_trinium_europium_duranide_hex_wire",
        C: "gtceu:zpm_field_generator",
        D: "gtceu:alloy_blast_smelter",
        E: "gtceu:dense_darmstadtium_plate",
        F: "#gtceu:circuits/zpm"
    })

    event.shaped("gtceu:mv_solar_panel", [
        "ABA",
        "CDC",
        "E E"
    ], {
        A: "gtceu:neutronium_wafer",
        B: "gtceu:laminated_glass",
        C: "#gtceu:circuits/uv",
        D: "gtceu:mithril_quadruple_wire",
        E: "gtceu:double_indium_gallium_phosphide_plate"
    })

    event.shaped("gtceu:hv_solar_panel", [
        "ABA",
        "CDC",
        "E E"
    ], {
        A: "kubejs:rutherfordium_neutronium_wafer",
        B: "gtceu:laminated_glass",
        C: "#gtceu:circuits/uev",
        D: "gtceu:mithril_hex_wire",
        E: "gtceu:double_germaniumtungstennitride_plate"
    })

    event.shaped("gtceu:ev_solar_panel", [
        "ABA",
        "CDC",
        "E E"
    ], {
        A: "kubejs:taranium_wafer",
        B: "gtceu:laminated_glass",
        C: "#gtceu:circuits/uxv",
        D: "gtceu:taranium_quadruple_wire",
        E: "gtceu:double_uruium_plate"
    })

    event.shaped("gtceu:iv_solar_panel", [
        "ABA",
        "CDC",
        "E E"
    ], {
        A: "kubejs:pm_wafer",
        B: "gtceu:fusion_glass",
        C: "#gtceu:circuits/max",
        D: "gtceu:taranium_hex_wire",
        E: "gtceu:double_oganesson_plate"
    })

    event.shaped("gtceu:max_neutron_compressor", [
        "ECE",
        "DAD",
        "BCB"
    ], {
        A: "gtceu:max_machine_hull",
        B: "gtceu:cosmicneutronium_single_cable",
        C: "#gtceu:circuits/max",
        D: "gtlcore:max_electric_piston",
        E: "gtlcore:max_electric_pump"
    })

    event.shaped("gtceu:uhv_parallel_hatch", [
        "DCE",
        "CAC",
        "BCB"
    ], {
        A: "gtceu:uhv_machine_hull",
        B: "gtceu:europium_double_cable",
        C: "#gtceu:circuits/uev",
        D: "gtceu:uhv_sensor",
        E: "gtceu:uhv_emitter"
    })

    event.shaped("gtceu:uev_parallel_hatch", [
        "DCE",
        "CAC",
        "BCB"
    ], {
        A: "gtceu:uev_machine_hull",
        B: "gtceu:mithril_double_cable",
        C: "#gtceu:circuits/uiv",
        D: "gtceu:uev_sensor",
        E: "gtceu:uev_emitter"
    })

    event.shaped("gtceu:uiv_parallel_hatch", [
        "DCE",
        "CAC",
        "BCB"
    ], {
        A: "gtceu:uiv_machine_hull",
        B: "gtceu:neutronium_double_cable",
        C: "#gtceu:circuits/uxv",
        D: "gtceu:uiv_sensor",
        E: "gtceu:uiv_emitter"
    })

    event.shaped("gtceu:uxv_parallel_hatch", [
        "DCE",
        "CAC",
        "BCB"
    ], {
        A: "gtceu:uxv_machine_hull",
        B: "gtceu:taranium_double_cable",
        C: "#gtceu:circuits/opv",
        D: "gtceu:uxv_sensor",
        E: "gtceu:uxv_emitter"
    })

    event.shaped("gtceu:opv_parallel_hatch", [
        "DCE",
        "CAC",
        "BCB"
    ], {
        A: "gtceu:opv_machine_hull",
        B: "gtceu:crystalmatrix_double_cable",
        C: "#gtceu:circuits/max",
        D: "gtceu:opv_sensor",
        E: "gtceu:opv_emitter"
    })

    event.shaped("gtceu:max_parallel_hatch", [
        "DCE",
        "CAC",
        "BCB"
    ], {
        A: "gtceu:max_machine_hull",
        B: "gtceu:cosmicneutronium_double_cable",
        C: "kubejs:suprachronal_max",
        D: "gtlcore:max_sensor",
        E: "gtlcore:max_emitter"
    })

    event.shaped("gtceu:sterile_cleaning_maintenance_hatch", [
        "DED",
        "CAC",
        "DED"
    ], {
        A: "gtceu:zpm_machine_hull",
        C: "gtceu:zpm_robot_arm",
        D: "gtceu:sterilizing_filter_casing",
        E: "gtceu:cleaning_maintenance_hatch"
    })

    event.shaped("gtceu:cleaning_maintenance_hatch", [
        "DED",
        "CAC",
        "DED"
    ], {
        A: "gtceu:hv_machine_hull",
        C: "gtceu:hv_emitter",
        D: "gtceu:filter_casing",
        E: "gtceu:auto_maintenance_hatch"
    })

    event.shaped("gtceu:law_cleaning_maintenance_hatch", [
        "DED",
        "CAC",
        "DED"
    ], {
        A: "gtceu:uev_machine_hull",
        C: "gtceu:uev_robot_arm",
        D: "gtlcore:law_filter_casing",
        E: "gtceu:sterile_cleaning_maintenance_hatch"
    })

    event.shaped("gtceu:cleaning_configuration_maintenance_hatch", [
        "DCD",
        "CAC",
        "DCD"
    ], {
        A: "gtceu:auto_configuration_maintenance_hatch",
        C: "#gtceu:circuits/luv",
        D: "gtceu:cleaning_maintenance_hatch"
    })

    event.shaped("gtceu:sterile_configuration_cleaning_maintenance_hatch", [
        "DCD",
        "BAB",
        "DCD"
    ], {
        A: "gtceu:uhv_machine_hull",
        B: "gtceu:uhv_field_generator",
        C: "gtceu:cleaning_configuration_maintenance_hatch",
        D: "gtceu:sterile_cleaning_maintenance_hatch"
    })

    event.shaped("gtceu:law_configuration_cleaning_maintenance_hatch", [
        "DCD",
        "BAB",
        "DCD"
    ], {
        A: "gtceu:uxv_machine_hull",
        B: "gtceu:uxv_field_generator",
        C: "gtceu:sterile_configuration_cleaning_maintenance_hatch",
        D: "gtceu:law_cleaning_maintenance_hatch"
    })

    event.shaped("gtceu:dragon_egg_copier", [
        "DED",
        "CAC",
        "DED"
    ], {
        A: "minecraft:dragon_egg",
        C: "gtceu:uxv_robot_arm",
        D: "gtlcore:dragon_strength_tritanium_casing",
        E: "gtceu:uxv_field_generator"
    })

    event.shaped("gtceu:blaze_blast_furnace", [
        "DCD",
        "CAC",
        "DCD"
    ], {
        A: "gtceu:electric_blast_furnace",
        C: "gtceu:iv_field_generator",
        D: "gtlcore:blaze_blast_furnace_casing"
    })

    event.shaped("gtceu:large_cracker", [
        "DCD",
        "BAB",
        "DCD"
    ], {
        A: "gtceu:cracker",
        B: "gtceu:naquadah_spring",
        C: "#gtceu:circuits/uv",
        D: "gtceu:luv_field_generator"
    })

    event.shaped("gtceu:large_greenhouse", [
        "DCD",
        "BAB",
        "DCD"
    ], {
        A: "gtceu:greenhouse",
        B: "gtceu:ev_sensor",
        C: "#gtceu:circuits/luv",
        D: "gtceu:ev_field_generator"
    })

    event.shaped("gtlcore:law_filter_casing", [
        "BCB",
        "DAD",
        "BCB"
    ], {
        A: "gtceu:mithril_frame",
        B: "gtceu:uev_emitter",
        C: "gtceu:sterilizing_filter_casing",
        D: "gtceu:uev_muffler_hatch"
    })

    event.shaped("gtceu:cold_ice_freezer", [
        "BCB",
        "CAC",
        "BCB"
    ], {
        A: "gtceu:vacuum_freezer",
        B: "gtlcore:cold_ice_casing",
        C: "gtceu:iv_emitter"
    })

    event.shaped("gtceu:gravitation_shockburst", [
        "BCB",
        "CAC",
        "BCB"
    ], {
        A: "kubejs:create_ultimate_battery",
        B: "gtlcore:create_casing",
        C: "kubejs:suprachronal_mainframe_complex"
    })

    event.shaped("gtceu:creative_data_access_hatch", [
        "BCB",
        "CAC",
        "BCB"
    ], {
        A: "gtceu:advanced_data_access_hatch",
        B: "gtceu:double_chaos_plate",
        C: "minecraft:repeating_command_block"
    })

    event.shaped(Registries.getItemStack("gtlcore:multi_functional_casing", 2), [
        "BCB",
        "DAD",
        "BCB"
    ], {
        A: "gtceu:solid_machine_casing",
        B: "gtceu:double_aluminium_plate",
        C: "gtceu:mv_electric_motor",
        D: "gtceu:mv_electric_piston"
    })

    event.shaped("gtceu:processing_plant", [
        "BCB",
        "DAD",
        "BEB"
    ], {
        A: "gtlcore:multi_functional_casing",
        B: "gtceu:aluminium_foil",
        C: "gtceu:mv_conveyor_module",
        D: "gtceu:mv_robot_arm",
        E: "gtceu:mv_fluid_regulator"
    })

    event.shaped("gtceu:steam_piston_hammer", [
        "BCB",
        "DAD",
        "BEB"
    ], {
        A: "gtceu:lp_steam_forge_hammer",
        B: "gtceu:bronze_plate",
        C: "gtceu:wrought_iron_ring",
        D: "gtceu:iron_spring",
        E: "gtceu:double_wrought_iron_plate"
    })

    event.shaped("gtceu:steam_pressor", [
        "BCB",
        "DAD",
        "BEB"
    ], {
        A: "gtceu:lp_steam_compressor",
        B: "gtceu:bronze_plate",
        C: "gtceu:small_bronze_gear",
        D: "gtceu:small_iron_spring",
        E: "gtceu:wrought_iron_gear"
    })

    event.shaped("gtceu:steam_foundry", [
        "BCB",
        "DAD",
        "BCB"
    ], {
        A: "gtceu:lp_steam_alloy_smelter",
        B: "gtceu:bronze_plate",
        C: "gtceu:potin_plate",
        D: "gtceu:long_tin_alloy_rod"
    })

    event.shaped("gtceu:assemble_plant", [
        "BCB",
        "DAF",
        "BEB"
    ], {
        A: "gtlcore:multi_functional_casing",
        B: "gtceu:aluminium_foil",
        C: "gtceu:mv_conveyor_module",
        D: "gtceu:mv_sensor",
        E: "gtceu:mv_fluid_regulator",
        F: "gtceu:mv_emitter"
    })

    event.shaped("gtceu:separated_plant", [
        "BCB",
        "DAF",
        "BEB"
    ], {
        A: "gtlcore:multi_functional_casing",
        B: "gtceu:aluminium_foil",
        C: "gtceu:mv_conveyor_module",
        D: "gtceu:mv_electric_motor",
        E: "gtceu:mv_fluid_regulator",
        F: "gtceu:mv_electric_pump"
    })

    event.shaped("gtceu:mixed_plant", [
        "BCB",
        "DAF",
        "BEB"
    ], {
        A: "gtlcore:multi_functional_casing",
        B: "gtceu:aluminium_foil",
        C: "gtceu:mv_conveyor_module",
        D: "gtceu:mv_electric_piston",
        E: "gtceu:mv_fluid_regulator",
        F: "gtceu:mv_electric_motor"
    })

    event.shaped("gtceu:ev_rocket_engine", [
        "BCB",
        "DAD",
        "WEW"
    ], {
        A: "gtceu:ev_machine_hull",
        B: "gtceu:lead_rotor",
        C: "#gtceu:circuits/ev",
        D: "gtceu:ev_electric_motor",
        E: "gtceu:ev_electric_pump",
        W: "gtceu:steel_double_cable"
    })

    event.shaped("gtceu:iv_rocket_engine", [
        "BCB",
        "DAD",
        "WEW"
    ], {
        A: "gtceu:iv_machine_hull",
        B: "gtceu:chromium_rotor",
        C: "#gtceu:circuits/iv",
        D: "gtceu:iv_electric_motor",
        E: "gtceu:iv_electric_pump",
        W: "gtceu:tungsten_steel_double_cable"
    })

    event.shaped("gtceu:luv_rocket_engine", [
        "BCB",
        "DAD",
        "WEW"
    ], {
        A: "gtceu:luv_machine_hull",
        B: "gtceu:rhodium_plated_palladium_rotor",
        C: "#gtceu:circuits/luv",
        D: "gtceu:luv_electric_motor",
        E: "gtceu:luv_electric_pump",
        W: "gtceu:osmium_double_cable"
    })

    event.shaped("gtceu:rocket_large_turbine", [
        "BCB",
        "DAD",
        "WPW"
    ], {
        A: "gtceu:ev_rocket_engine",
        W: "gtceu:black_steel_double_cable",
        C: "#gtceu:circuits/iv",
        D: "gtceu:ev_electric_motor",
        B: "gtceu:ev_electric_piston",
        P: "gtceu:dense_obsidian_plate"
    })

    event.shaped("gtceu:iv_naquadah_reactor", [
        "BCB",
        "DAD",
        "WCW"
    ], {
        A: "gtceu:iv_machine_hull",
        B: "gtceu:naquadah_rod",
        C: "#gtceu:circuits/iv",
        D: "gtceu:iv_field_generator",
        W: "gtceu:tungsten_quadruple_cable"
    })

    event.shaped("gtceu:luv_naquadah_reactor", [
        "BCB",
        "DAD",
        "WCW"
    ], {
        A: "gtceu:luv_machine_hull",
        B: "gtceu:enriched_naquadah_rod",
        C: "#gtceu:circuits/luv",
        D: "gtceu:luv_field_generator",
        W: "gtceu:niobium_nitride_quadruple_cable"
    })

    event.shaped("gtceu:zpm_naquadah_reactor", [
        "BCB",
        "DAD",
        "WCW"
    ], {
        A: "gtceu:zpm_machine_hull",
        B: "gtceu:naquadria_rod",
        C: "#gtceu:circuits/zpm",
        D: "gtceu:zpm_field_generator",
        W: "gtceu:naquadah_quadruple_cable"
    })

    event.shaped("gtceu:large_steam_macerator", [
        "BCB",
        "DAD",
        "BCB"
    ], {
        A: "gtceu:steam_grinder",
        B: "gtceu:bronze_block",
        C: "gtceu:diamond_grinding_head",
        D: "kubejs:precision_steam_mechanism"
    })

    event.shaped("gtceu:large_steam_centrifuge", [
        "BCB",
        "DAD",
        "BCB"
    ], {
        A: "gtceu:bronze_gearbox",
        B: "gtceu:bronze_block",
        C: "kubejs:precision_steam_mechanism",
        D: "gtceu:small_iron_gear"
    })

    event.shaped("gtceu:large_steam_bath", [
        "ECE",
        "DAD",
        "BCB"
    ], {
        A: "gtceu:steam_bath",
        B: "gtceu:bronze_block",
        C: "kubejs:precision_steam_mechanism",
        D: "gtceu:stone_gear",
        E: "gtceu:steel_foil"
    })

    event.shaped("gtceu:large_steam_circuit_assembler", [
        "BCB",
        "DAD",
        "BCB"
    ], {
        A: "ae2:molecular_assembler",
        B: "gtceu:bronze_plate",
        C: "minecraft:comparator",
        D: "#gtceu:circuits/ulv"
    })

    event.shaped("gtceu:large_steam_mixer", [
        "BCB",
        "DAD",
        "BCB"
    ], {
        A: "gtceu:steam_mixer",
        B: "gtceu:bronze_plate",
        C: "kubejs:precision_steam_mechanism",
        D: "gtceu:copper_huge_fluid_pipe"
    })

    event.shaped("gtceu:large_steam_thermal_centrifuge", [
        "BCB",
        "DAD",
        "BCB"
    ], {
        A: "gtceu:bronze_pipe_casing",
        B: "gtceu:bronze_plate",
        C: "kubejs:precision_steam_mechanism",
        D: "gtceu:long_copper_rod"
    })

    event.shaped("gtceu:large_steam_ore_washer", [
        "BCB",
        "DAD",
        "BCB"
    ], {
        A: "gtceu:steam_ore_washer",
        B: "gtceu:bronze_plate",
        C: "gtceu:double_bronze_plate",
        D: "kubejs:precision_steam_mechanism"
    })

    event.shaped("gtceu:steam_mixer", [
        "ABA",
        "BCB",
        "DBD"
    ], {
        A: "gtceu:bronze_normal_fluid_pipe",
        B: "gtceu:bronze_plate",
        C: "gtceu:bronze_pipe_casing",
        D: "gtceu:bronze_gear"
    })

    event.shaped("gtceu:steam_bath", [
        "ABA",
        "BCB",
        "DBD"
    ], {
        A: "gtceu:bronze_rod",
        B: "gtceu:bronze_plate",
        C: "gtceu:bronze_pipe_casing",
        D: "gtceu:bronze_gear"
    })

    event.shaped("gtceu:steam_ore_washer", [
        "ABA",
        "BCB",
        "DBD"
    ], {
        A: "gtceu:bronze_rod",
        B: "gtceu:steel_plate",
        C: "gtceu:bronze_pipe_casing",
        D: "gtceu:potin_gear"
    })

    event.shaped("gtceu:weather_control", [
        "BCB",
        "DAD",
        "BCB"
    ], {
        A: "minecraft:amethyst_block",
        B: "minecraft:lightning_rod",
        C: "gtceu:double_steel_plate",
        D: "minecraft:daylight_detector"
    })

    event.shaped("gtceu:large_pyrolyse_oven", [
        "BCB",
        "DAD",
        "BCB"
    ], {
        A: "gtceu:pyrolyse_oven",
        B: "gtceu:double_stainless_steel_plate",
        C: "gtceu:iv_field_generator",
        D: "gtceu:vanadium_steel_huge_fluid_pipe"
    })

    event.shaped("kubejs:precision_steam_mechanism", [
        "ABA",
        "CDC",
        "EBE"
    ], {
        A: "gtceu:bronze_rod",
        B: "gtceu:small_bronze_gear",
        C: "gtceu:bronze_plate",
        D: "gtceu:small_copper_spring",
        E: "gtceu:bronze_tiny_fluid_pipe"
    })

    event.shaped("kubejs:steam_assembly_block", [
        "ABA",
        "BCB",
        "ABA"
    ], {
        A: "gtceu:bronze_normal_fluid_pipe",
        B: "kubejs:precision_steam_mechanism",
        C: "gtceu:bronze_frame"
    })

    event.shaped("gtceu:ev_lightning_rod", [
        "ABA",
        "BCB",
        "ABA"
    ], {
        A: "gtceu:lapotron_crystal",
        B: "gtceu:ev_transformer_16a",
        C: "gtceu:ev_machine_hull"
    })

    event.shaped("gtceu:iv_lightning_rod", [
        "ABA",
        "BCB",
        "ABA"
    ], {
        A: "gtceu:lapotronic_energy_orb",
        B: "gtceu:iv_transformer_16a",
        C: "gtceu:iv_machine_hull"
    })

    event.shaped("gtceu:luv_lightning_rod", [
        "ABA",
        "BCB",
        "ABA"
    ], {
        A: "gtceu:lapotronic_energy_orb_cluster",
        B: "gtceu:luv_transformer_16a",
        C: "gtceu:luv_machine_hull"
    })

    event.shaped("gtceu:lv_semi_fluid", [
        "ADA",
        "BEB",
        "CFC"
    ], {
        A: "gtceu:lv_electric_piston",
        B: "gtceu:lv_electric_motor",
        C: "gtceu:potin_gear",
        D: "#gtceu:circuits/lv",
        E: "gtceu:lv_machine_hull",
        F: "gtceu:cobalt_double_cable"
    })

    event.shaped("gtceu:mv_semi_fluid", [
        "ADA",
        "BEB",
        "CFC"
    ], {
        A: "gtceu:mv_electric_piston",
        B: "gtceu:mv_electric_motor",
        C: "gtceu:eglin_steel_gear",
        D: "#gtceu:circuits/mv",
        E: "gtceu:mv_machine_hull",
        F: "gtceu:annealed_copper_double_cable"
    })

    event.shaped("gtceu:hv_semi_fluid", [
        "ADA",
        "BEB",
        "CFC"
    ], {
        A: "gtceu:hv_electric_piston",
        B: "gtceu:hv_electric_motor",
        C: "gtceu:chromium_gear",
        D: "#gtceu:circuits/hv",
        E: "gtceu:hv_machine_hull",
        F: "gtceu:electrum_double_cable"
    })

    event.shaped("gtceu:large_semi_fluid_generator", [
        "ADA",
        "BEB",
        "CFC"
    ], {
        A: "gtceu:ev_electric_piston",
        B: "gtceu:ev_electric_motor",
        C: "gtceu:inconel_792_gear",
        D: "#gtceu:circuits/ev",
        E: "gtceu:ev_machine_hull",
        F: "gtceu:nichrome_double_cable"
    })

    event.shaped("gtceu:gravity_hatch", [
        "CBC",
        "BAB",
        "DBD"
    ], {
        A: "gtceu:uv_machine_hull",
        B: "gtceu:gravi_star",
        C: "gtceu:uv_robot_arm",
        D: "gtceu:gravitation_engine_unit"
    })

    event.shaped("gtceu:desulfurizer", [
        "AEA",
        "CDC",
        "AEA",
    ], {
        E: "gtceu:hv_electric_motor",
        C: "#gtceu:circuits/ev",
        D: "gtceu:hv_machine_hull",
        A: "gtceu:hv_electric_pump",
    })

    event.smithing("kubejs:create_hpca_component", "kubejs:command_block_core", "gtlcore:super_computation_component", "kubejs:suprachronal_mainframe_complex")
    event.smithing("gtceu:create_computation", "kubejs:command_block_core", "gtceu:high_performance_computation_array", "kubejs:suprachronal_mainframe_complex")
    event.smithing("kubejs:space_fermium_helmet", "ad_astra:netherite_space_helmet", "kubejs:fermium_helmet", "ad_astra:oxygen_distributor")
    event.smithing("kubejs:space_fermium_chestplate", "ad_astra:netherite_space_suit", "kubejs:fermium_chestplate", "ad_astra:oxygen_distributor")
    event.smithing("kubejs:space_fermium_leggings", "ad_astra:netherite_space_pants", "kubejs:fermium_leggings", "ad_astra:oxygen_distributor")
    event.smithing("kubejs:space_fermium_boots", "ad_astra:netherite_space_boots", "kubejs:fermium_boots", "ad_astra:oxygen_distributor")
})
