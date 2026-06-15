ServerEvents.recipes(event => {
    event.shaped('gtlsupb:steam_ore_integrated_hub', [
        'ABC',
        'DEF',
        'GHI'
    ], {
        A: 'gtceu:large_steam_thermal_centrifuge',
        B: 'kubejs:precision_steam_mechanism',
        C: 'gtceu:large_steam_ore_washer',
        D: 'kubejs:precision_steam_mechanism',
        E: 'gtlsupb:ultimate_steam_boost_hatch',
        F: 'kubejs:precision_steam_mechanism',
        G: 'gtceu:large_steam_centrifuge',
        H: 'kubejs:precision_steam_mechanism',
        I: 'gtceu:large_steam_macerator'
    });
    
    event.shaped('gtlsupb:universal_factory', [
        'ABC',
        'DEF',
        'GHI'
    ], {
        A: 'gtceu:mv_electric_motor',
        B: 'gtceu:mv_robot_arm',
        C: 'gtceu:mv_electric_piston',
        D: 'gtceu:mv_electric_pump',
        E: 'gtlcore:multi_functional_casing',
        F: 'gtceu:mv_emitter',
        G: 'gtceu:mv_conveyor_module',
        H: 'gtceu:mv_sensor',
        I: 'gtceu:mv_fluid_regulator'
    });
    
    event.shapeless('gtlsupb:dimensional_energy_stabilization_hub', ['minecraft:cobblestone']);

    const gtr = event.recipes.gtceu;
    gtr.assembly_line("gtlsupb:abyssal_chemicaleroder")
        .itemInputs("4x gtceu:large_chemical_plant", "4x gtceu:decay_hastener", "4x gtceu:chemical_distort", "4x gtceu:advanced_neutron_activator", "4x gtceu:a_mass_fabricator")
        .itemOutputs("gtlsupb:abyssal_chemical_eroder")
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(1);
        
    gtr.assembler("gtlsupb:computation_maintenance_hatch")
        .itemInputs("gtceu:computation_receiver_hatch", "gtceu:computation_transmitter_hatch", "gtceu:normal_optical_pipe")
        .itemOutputs("gtlsupb:computation_maintenance_hatch")
        .EUt(GTValues.VA[GTValues.IV])
        .duration(1);
        
    gtr.assembler("gtlsupb:data_maintenance_hatch")
        .itemInputs("gtceu:data_receiver_hatch", "gtceu:data_transmitter_hatch", "gtceu:normal_optical_pipe")
        .itemOutputs("gtlsupb:data_maintenance_hatch")
        .EUt(GTValues.VA[GTValues.IV])
        .duration(1);
        
    gtr.assembly_line("gtlsupb:rank_derivation_assembly_matrix")
        .itemInputs("4x gtceu:suprachronal_assembly_line","4x gtceu:mage_assembler","4x gtceu:component_assembly_line","4x gtceu:assembler_module")
        .itemOutputs("gtlsupb:rank_derivation_assembly_matrix")
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(1);
        
    gtr.assembly_line("gtlsupb:quantum_weaver")
        .itemInputs("gtceu:molecular_assembler_matrix","64x gtceu:me_craft_parallel_core","64x gtceu:me_craft_speed_core")
        .itemOutputs("gtlsupb:quantum_weaver")
        .EUt(GTValues.VA[GTValues.UV])
        .duration(1);
        
    gtr.assembly_line("gtlsupb:omniversal_eye")
        .itemInputs("4x gtceu:eye_of_harmony")
        .itemOutputs("gtlsupb:omniversal_eye")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(1);
        
    gtr.suprachronal_assembly_line("gtlsupb:microcosm_foundry")
        .inputFluids("gtceu:super_mutated_living_solder 1600000","gtceu:uu_matter 1600000","gtceu:heavy_lepton_mixture 1600000","gtceu:cosmic_element 1600000")
        .itemInputs("64x kubejs:space_drone_mk5","64x kubejs:space_drone_mk4","64x kubejs:space_drone_mk3","64x kubejs:space_drone_mk2","64x kubejs:space_drone_mk1","64x gtceu:dense_attuned_tengam_plate","64x gtlcore:extremely_max_battery","64x #gtceu:circuits/uxv","64x gtceu:double_taranium_plate","64x kubejs:space_probe_mk1","64x kubejs:space_probe_mk2","64x kubejs:space_probe_mk3","64x gtceu:space_elevator","64x gtceu:space_probe_surface_reception","64x gtceu:qft","64x gtceu:a_mass_fabricator")
        .itemOutputs("gtlsupb:microcosm_foundry")
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(1);

    gtr.assembly_line("gtlsupb:electric_assembly_line")
        .itemInputs("1024x gtlcore:advanced_assembly_line_unit","1024x kubejs:machine_casing_circuit_assembly_line","gtceu:advanced_assembly_line","gtceu:circuit_assembly_line")
        .itemOutputs("gtlsupb:electric_assembly_line")
        .EUt(GTValues.VA[GTValues.UV])
        .duration(1);

    gtr.assembly_line("gtlsupb:hypercube_core_tower")
        .itemInputs("assembly_line_distorter:assembly_line_distorter_eye_of_harmony_core","4x gtladditions:astral_array","4x gtladditions:thread_modifier_hatch","4x gtceu:dimensionally_transcendent_mixer","4x gtceu:advanced_sps_crafting")
        .inputFluids("gtceu:magmatter 1600000","gtceu:magnetohydrodynamicallyconstrainedstarmatter 1600000","gtceu:spacetime 1600000","gtceu:cosmic 1600000")
        .itemOutputs("gtlsupb:hypercube_core_tower")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(1);

    gtr.suprachronal_assembly_line("gtlsupb:genesis_module")
        .itemInputs("4x assembly_line_distorter:assembly_line_distorter_eye_of_harmony_core","4x gtladditions:arcanic_astrograph","4x gtladditions:thread_modifier_hatch","4x assembly_line_distorter:assembly_line_distorter_material","4x gtceu:magic_manufacturer","4x gtladditions:nebula_reaper","4x gtceu:space_cosmic_probe_receivers","1024x gtladditions:wireless_energy_network_input_terminal","1024x gtladditions:wireless_energy_network_output_terminal")
        .inputFluids("gtceu:magmatter 1600000","gtceu:magnetohydrodynamicallyconstrainedstarmatter 1600000","gtceu:spacetime 1600000","gtceu:cosmic 1600000")
        .itemOutputs("gtlsupb:genesis_module")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(1);

    gtr.suprachronal_assembly_line("gtlsupb:creation_module")
        .itemInputs("4x assembly_line_distorter:assembly_line_distorter_eye_of_harmony_core","4x gtladditions:draconic_collapse_core","4x gtladditions:thread_modifier_hatch","4x assembly_line_distorter:assembly_line_distorter_material","4x gtceu:door_of_create","4x gtceu:create_aggregation","4x gtceu:nano_core","4x gtceu:pcb_factory","4x gtladditions:apocalyptic_torsion_quantum_matrix","1024x gtladditions:wireless_energy_network_input_terminal","1024x gtladditions:wireless_energy_network_output_terminal")
        .inputFluids("gtceu:magmatter 1600000","gtceu:magnetohydrodynamicallyconstrainedstarmatter 1600000","gtceu:spacetime 1600000","gtceu:cosmic 1600000")
        .itemOutputs("gtlsupb:creation_module")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(1);

    gtr.suprachronal_assembly_line("gtlsupb:void_module")
        .itemInputs("4x assembly_line_distorter:assembly_line_distorter_eye_of_harmony_core","4x gtladditions:forge_of_the_antichrist","4x gtladditions:thread_modifier_hatch","4x assembly_line_distorter:assembly_line_distorter_material","4x gtceu:gravitation_shockburst","1024x gtladditions:wireless_energy_network_input_terminal","1024x gtladditions:wireless_energy_network_output_terminal")
        .inputFluids("gtceu:magmatter 1600000","gtceu:magnetohydrodynamicallyconstrainedstarmatter 1600000","gtceu:spacetime 1600000","gtceu:cosmic 1600000")
        .itemOutputs("gtlsupb:void_module")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(1);

    gtr.suprachronal_assembly_line("gtlsupb:eternity_module")
        .itemInputs("gtlsupb:void_module","gtlsupb:creation_module","gtlsupb:genesis_module","gtlsupb:microcosm_foundry","4x gtladditions:forge_of_the_antichrist","1024x gtladditions:wireless_energy_network_input_terminal","1024x gtladditions:wireless_energy_network_output_terminal")
        .inputFluids("gtceu:magmatter 1600000","gtceu:magnetohydrodynamicallyconstrainedstarmatter 1600000","gtceu:spacetime 1600000","gtceu:cosmic 1600000")
        .itemOutputs("gtlsupb:eternity_module")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(1);

    event.shaped('gtlsupb:ultimate_steam_boost_hatch', [
        'AAA',
        'AAA',
        'AAA'
    ], {
        A: 'gtceu:large_steam_input_hatch'
    });

    event.shaped('gtlsupb:primitive_stone_furnace', [
        'SSS',
        'SFS',
        'SSS'
    ], {
        S: 'minecraft:stone',
        F: 'minecraft:furnace'
    });

    const voidAbsorbers = [
        ['lv', 'gtceu:steel_plate', 'gtceu:lv_energy_input_hatch'],
        ['mv', 'gtceu:aluminium_plate', 'gtceu:mv_energy_input_hatch'],
        ['hv', 'gtceu:stainless_steel_plate', 'gtceu:hv_energy_input_hatch'],
        ['ev', 'gtceu:titanium_plate', 'gtceu:ev_energy_input_hatch'],
        ['iv', 'gtceu:tungsten_steel_plate', 'gtceu:iv_energy_input_hatch'],
        ['luv', 'gtceu:rhodium_plated_palladium_plate', 'gtceu:luv_energy_input_hatch'],
        ['zpm', 'gtceu:naquadah_alloy_plate', 'gtceu:zpm_energy_input_hatch'],
        ['uv', 'gtceu:darmstadtium_plate', 'gtceu:uv_energy_input_hatch'],
        ['uhv', 'gtceu:neutronium_plate', 'gtceu:uhv_energy_input_hatch'],
        ['uev', 'gtceu:quantanium_plate', 'gtceu:uev_energy_input_hatch'],
        ['uiv', 'gtceu:adamantium_plate', 'gtceu:uiv_energy_input_hatch'],
        ['uxv', 'gtceu:vibranium_plate', 'gtceu:uxv_energy_input_hatch'],
        ['opv', 'gtceu:draconium_plate', 'gtceu:opv_energy_input_hatch'],
        ['max', 'gtceu:chaos_plate', 'gtceu:max_energy_input_hatch']
    ];

    voidAbsorbers.forEach(([tier, plate, hatch]) => {
        event.shaped(`gtlsupb:${tier}_void_energy_absorber`, [
            'PPP',
            'PEP',
            'PPP'
        ], {
            P: plate,
            E: hatch
        });
    });

    event.shaped('gtlsupb:fragment_world_collector', [
        'DDD',
        'DCD',
        'DDD'
    ], {
        D: 'minecraft:dirt',
        C: 'gtceu:ulv_fragment_world_collection_machine'
    });

    event.shaped('gtlsupb:mo_wan', [
        'III',
        'IEI',
        'III'
    ], {
        I: 'gtceu:heatproof_machine_casing',
        E: 'gtceu:electric_blast_furnace'
    });

    event.shaped('gtlsupb:ling_zhu', [
        'AAA',
        'AFA',
        'AAA'
    ], {
        A: 'gtceu:frostproof_machine_casing',
        F: 'gtceu:vacuum_freezer'
    });
});