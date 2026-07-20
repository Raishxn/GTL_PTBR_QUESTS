(function() {
    let GTLsupb = global.GTLsupb = global.GTLsupb || {};

    let config;
    try {
        config = JsonIO.read('kubejs/config/[config]Special for production line twisters.json');
        if (config === null || typeof config !== 'object') {
            console.warn('[GTLsupb] Configuration file is invalid or missing, use default configuration');
            throw new Error();
        }
    } catch(e) {
        config = {};
    }
    const enableBlastScript = config.enableBlastScript !== undefined ? config.enableBlastScript : true;
    const enableModule = config.enableGTLsupbRecipes !== undefined ? config.enableGTLsupbRecipes : true;
    const enableLogReport = config.enableLogReport !== undefined ? config.enableLogReport : false;
    GTLsupb.enableAll = enableBlastScript && enableModule;

    function log(msg) { if (enableLogReport) console.log(`[GTLsupb] ${msg}`); }
    log(`全局主开关: ${enableBlastScript} | 模块开关: ${enableModule} | 最终状态: ${GTLsupb.enableAll}`);
    if (!GTLsupb.enableAll) {
        if (!enableBlastScript) log('Because the global master switch is turned off, recipe registration is skipped.');
        else log('Recipe registration is skipped because the module switch is turned off.');
        return;
    }

    ServerEvents.recipes(event => {
        let totalShaped = 0;
        let totalShapeless = 0;
        let totalVoid = 0;
        let totalGt = 0;
        let totalSupra = 0;
        const addedRecipeIds = new Set();

        const safeShaped = (id, pattern, ingredients) => {
            if (addedRecipeIds.has(id)) { log(`⚠️ 跳过已存在的有序配方: ${id}`); return false; }
            event.shaped(id, pattern, ingredients);
            addedRecipeIds.add(id);
            return true;
        };
        const safeShapeless = (id, ingredients) => {
            if (addedRecipeIds.has(id)) { log(`⚠️ 跳过已存在的无序配方: ${id}`); return false; }
            event.shapeless(id, ingredients);
            addedRecipeIds.add(id);
            return true;
        };
        const safeGt = (builderFunc, recipeId) => {
            if (addedRecipeIds.has(recipeId)) {
                log(`⚠️ 跳过已存在的 GT 配方: ${recipeId}`);
                return {
                    itemInputs() { return this; },
                    itemOutputs() { return this; },
                    circuit() { return this; },
                    inputFluids() { return this; },
                    outputFluids() { return this; },
                    EUt() { return this; },
                    duration() { return this; },
                    notConsumable() { return this; },
                    blastFurnaceTemp() { return this; },
                    cleanroom() { return this; },
                    addData() { return this; }
                };
            }
            addedRecipeIds.add(recipeId);
            return builderFunc(recipeId);
        };

        const gtr = event.recipes.gtceu;

        const shapedRecipes = [
            { id: "gtlsupb:steam_universal_module", pattern: ["PPP","GCP","PPP"], ingredients: { P: "gtceu:bronze_plate", G: "gtceu:bronze_gear", C: "kubejs:precision_steam_mechanism" } },
            { id: "gtlsupb:steam_modular_factory", pattern: ["MBM","BUB","MBM"], ingredients: { M: "kubejs:precision_steam_mechanism", B: "gtceu:bronze_block", U: "gtlsupb:steam_universal_module" } },
            { id: "gtlsupb:steam_ore_integrated_hub", pattern: ["ABC","DEF","GHI"], ingredients: {
                A: "gtceu:large_steam_thermal_centrifuge", B: "kubejs:precision_steam_mechanism", C: "gtceu:large_steam_ore_washer",
                D: "kubejs:precision_steam_mechanism", E: "gtlsupb:ultimate_steam_boost_hatch", F: "kubejs:precision_steam_mechanism",
                G: "gtceu:large_steam_centrifuge", H: "kubejs:precision_steam_mechanism", I: "gtceu:large_steam_macerator"
            } },
            { id: "gtlsupb:universal_factory", pattern: ["ABC","DEF","GHI"], ingredients: {
                A: "gtceu:mv_electric_motor", B: "gtceu:mv_robot_arm", C: "gtceu:mv_electric_piston",
                D: "gtceu:mv_electric_pump", E: "gtlcore:multi_functional_casing", F: "gtceu:mv_emitter",
                G: "gtceu:mv_conveyor_module", H: "gtceu:mv_sensor", I: "gtceu:mv_fluid_regulator"
            } },
            { id: "gtlsupb:ultimate_steam_boost_hatch", pattern: ["AAA","AAA","AAA"], ingredients: { A: "gtceu:large_steam_input_hatch" } },
            { id: "gtlsupb:primitive_stone_furnace", pattern: ["SSS","SFS","SSS"], ingredients: { S: "minecraft:stone", F: "minecraft:furnace" } },
            { id: "gtlsupb:fragment_world_collector", pattern: ["DDD","DCD","DDD"], ingredients: { D: "minecraft:dirt", C: "gtceu:ulv_fragment_world_collection_machine" } },
            { id: "gtlsupb:mo_wan", pattern: ["III","IEI","III"], ingredients: { I: "gtceu:heatproof_machine_casing", E: "gtceu:electric_blast_furnace" } },
            { id: "gtlsupb:ling_zhu", pattern: ["AAA","AFA","AAA"], ingredients: { A: "gtceu:frostproof_machine_casing", F: "gtceu:vacuum_freezer" } }
        ];
        shapedRecipes.forEach(r => { if (safeShaped(r.id, r.pattern, r.ingredients)) totalShaped++; });

        if (safeShapeless("gtlsupb:dimensional_energy_stabilization_hub", ["minecraft:cobblestone"])) totalShapeless++;
        if (safeShapeless("gtlsupb:pattern_modifier", ["gtlcore:pattern_modifier"])) totalShapeless++;
        if (safeShapeless("gtlsupb:me_drive", ["expatternprovider:ex_drive"])) totalShapeless++;
        if (safeShapeless("gtlsupb:pattern_assembly", ["9x expatternprovider:ex_pattern_provider"])) totalShapeless++;

        const qwNbt = "{ RepairCost:0,amts:[L;8L,8L,1L,28L,8L,396L,270L,16L,91L,16L,203L,1L,44L,4L,444L,8L,17L,68L],display:{Name:'{\"text\":\"Quantum weaving main component package\"}'}, ic:1631L, internalCurrentPower:20000.0d,keys:[{\"#c\":\" ae2:i \",id:\" gtceu:trinium_frame \"},{\"#c\":\" ae2:i \",id:\" gtceu:superconducting_coil \"},{\"#c\":\" ae2:i \",id:\" gtceu:me_molecular_assembler_io \"},{\"#c\":\" ae2:i \",id:\" gtceu:advanced_computer_casing \"},{\"#c\":\" ae2:i \",id:\" gtlcore:molecular_casing \"},{\"#c\":\" ae2:i \",id:\" gtlcore:iridium_casing \"},{\"#c\":\" ae2:i \",id:\" gtceu:fusion_glass \"},{\"#c\":\" ae2:i \",id:\" gtceu:naquadah_alloy_frame \"},{\"#c\":\" ae2:i \",id:\" gtceu:high_power_casing \"},{\"#c\":\" ae2:i \",id:\" gtceu:hsse_frame \"},{\"#c\":\" ae2:i \",id:\" gtceu:me_craft_pattern_container \"},{\"#c\":\" ae2:i \",id:\" gtlsupb:quantum_weaver \"},{\"#c\":\" ae2:i \",id:\" gtceu:assembly_line_grating \"},{\"#c\":\" ae2:i \",id:\" gtlcore:hyper_mechanical_casing \"},{\"#c\":\" ae2:i \",id:\" gtceu:assembly_line_casing \"},{\"#c\":\" ae2:i \",id:\" gtlcore:advanced_assembly_line_unit \"},{\"#c\":\" ae2:i \",id:\" gtceu:europium_frame \"},{\"#c\":\" ae2:i \",id:\" gtceu:large_scale_assembler_casing \"}]}";
        const qwOutput = Item.of('gtlcore:super_portable_item_storage_cell', qwNbt);
        const qwId = "gtlsupb:quantum_weaving_master_package";
        if (!addedRecipeIds.has(qwId)) {
            event.shapeless(qwOutput, ["minecraft:crafting_table"]);
            addedRecipeIds.add(qwId);
            totalShapeless++;
            log(`已添加量子编织主元件包配方 (材料: 工作台)`);
        }

        const voidAbsorbers = [
            ["lv", "gtceu:steel_plate", "gtceu:lv_energy_input_hatch"],
            ["mv", "gtceu:aluminium_plate", "gtceu:mv_energy_input_hatch"],
            ["hv", "gtceu:stainless_steel_plate", "gtceu:hv_energy_input_hatch"],
            ["ev", "gtceu:titanium_plate", "gtceu:ev_energy_input_hatch"],
            ["iv", "gtceu:tungsten_steel_plate", "gtceu:iv_energy_input_hatch"],
            ["luv", "gtceu:rhodium_plated_palladium_plate", "gtceu:luv_energy_input_hatch"],
            ["zpm", "gtceu:naquadah_alloy_plate", "gtceu:zpm_energy_input_hatch"],
            ["uv", "gtceu:darmstadtium_plate", "gtceu:uv_energy_input_hatch"],
            ["uhv", "gtceu:neutronium_plate", "gtceu:uhv_energy_input_hatch"],
            ["uev", "gtceu:quantanium_plate", "gtceu:uev_energy_input_hatch"],
            ["uiv", "gtceu:adamantium_plate", "gtceu:uiv_energy_input_hatch"],
            ["uxv", "gtceu:vibranium_plate", "gtceu:uxv_energy_input_hatch"],
            ["opv", "gtceu:draconium_plate", "gtceu:opv_energy_input_hatch"],
            ["max", "gtceu:chaos_plate", "gtceu:max_energy_input_hatch"]
        ];
        voidAbsorbers.forEach(([tier, plate, hatch]) => {
            if (safeShaped(`gtlsupb:${tier}_void_energy_absorber`, ["PPP","PEP","PPP"], { P: plate, E: hatch })) totalVoid++;
        });

        const gtRecipes = [
            { machine: "assembly_line", id: "gtlsupb:abyssal_chemicaleroder", inputs: ["4x gtceu:large_chemical_plant","4x gtceu:decay_hastener","4x gtceu:chemical_distort","4x gtceu:advanced_neutron_activator","4x gtceu:a_mass_fabricator"], circuit: 32, output: "gtlsupb:abyssal_chemical_eroder", euTier: "UXV" },
            { machine: "assembler", id: "gtlsupb:computation_maintenance_hatch", inputs: ["gtceu:computation_receiver_hatch","gtceu:computation_transmitter_hatch","gtceu:normal_optical_pipe"], circuit: 31, output: "gtlsupb:computation_maintenance_hatch", euTier: "IV" },
            { machine: "assembler", id: "gtlsupb:data_maintenance_hatch", inputs: ["gtceu:data_receiver_hatch","gtceu:data_transmitter_hatch","gtceu:normal_optical_pipe"], circuit: 30, output: "gtlsupb:data_maintenance_hatch", euTier: "IV" },
            { machine: "assembly_line", id: "gtlsupb:rank_derivation_assembly_matrix", inputs: ["4x gtceu:suprachronal_assembly_line","4x gtceu:mage_assembler","4x gtceu:component_assembly_line","4x gtceu:assembler_module"], circuit: 29, output: "gtlsupb:rank_derivation_assembly_matrix", euTier: "UXV" },
            { machine: "assembly_line", id: "gtlsupb:quantum_weaver", inputs: ["gtceu:molecular_assembler_matrix","64x gtceu:me_craft_parallel_core","64x gtceu:me_craft_speed_core"], circuit: 28, output: "gtlsupb:quantum_weaver", euTier: "UV" },
            { machine: "assembly_line", id: "gtlsupb:omniversal_eye", inputs: ["4x gtceu:eye_of_harmony"], circuit: 27, output: "gtlsupb:omniversal_eye", euTier: "MAX" },
            { machine: "assembly_line", id: "gtlsupb:electric_assembly_line", inputs: ["1024x gtlcore:advanced_assembly_line_unit","1024x kubejs:machine_casing_circuit_assembly_line","gtceu:advanced_assembly_line","gtceu:circuit_assembly_line"], circuit: 26, output: "gtlsupb:electric_assembly_line", euTier: "UV" },
            { machine: "assembly_line", id: "gtlsupb:hypercube_core_tower", inputs: ["assembly_line_distorter:assembly_line_distorter_eye_of_harmony_core","4x gtladditions:astral_array","4x gtladditions:thread_modifier_hatch","4x gtceu:dimensionally_transcendent_mixer","4x gtceu:advanced_sps_crafting"], circuit: 25, inputFluids: ["gtceu:magmatter 1600000","gtceu:magnetohydrodynamicallyconstrainedstarmatter 1600000","gtceu:spacetime 1600000","gtceu:cosmic 1600000"], output: "gtlsupb:hypercube_core_tower", euTier: "MAX" }
        ];
        gtRecipes.forEach(r => {
            let builder = safeGt(gtr[r.machine], r.id);
            builder.itemInputs(r.inputs).circuit(r.circuit).itemOutputs(r.output).duration(1);
            if (r.inputFluids) builder.inputFluids(r.inputFluids);
            builder.EUt(GTValues.VA[GTValues[r.euTier]]);
            totalGt++;
        });

        let alchBuilder = safeGt(gtr.assembler, "gtlsupb:alchemical_forge");
        alchBuilder.itemInputs(["4x gtceu:tantalum_carbide_plate", "2x #gtceu:circuits/ev", "2x gtceu:aluminium_single_cable", "gtceu:ev_alloy_smelter"]);
        alchBuilder.circuit(1);
        alchBuilder.itemOutputs("gtlsupb:alchemical_forge");
        alchBuilder.duration(1);
        alchBuilder.EUt(GTValues.VA[GTValues.EV]);
        totalGt++;

        const supraRecipes = [
            { id: "gtlsupb:microcosm_foundry", inputs: ["64x kubejs:space_drone_mk5","64x kubejs:space_drone_mk4","64x kubejs:space_drone_mk3","64x kubejs:space_drone_mk2","64x kubejs:space_drone_mk1","64x gtceu:dense_attuned_tengam_plate","64x gtlcore:extremely_max_battery","64x #gtceu:circuits/uxv","64x gtceu:double_taranium_plate","64x kubejs:space_probe_mk1","64x kubejs:space_probe_mk2","64x kubejs:space_probe_mk3","64x gtceu:space_elevator","64x gtceu:space_probe_surface_reception","64x gtceu:qft","64x gtceu:a_mass_fabricator"], inputFluids: ["gtceu:super_mutated_living_solder 1600000","gtceu:uu_matter 1600000","gtceu:heavy_lepton_mixture 1600000","gtceu:cosmic_element 1600000"], output: "gtlsupb:microcosm_foundry", euTier: "UXV" },
            { id: "gtlsupb:genesis_module", inputs: ["4x assembly_line_distorter:assembly_line_distorter_eye_of_harmony_core","4x gtladditions:arcanic_astrograph","4x gtladditions:thread_modifier_hatch","4x assembly_line_distorter:assembly_line_distorter_material","4x gtceu:magic_manufacturer","4x gtladditions:nebula_reaper","4x gtceu:space_cosmic_probe_receivers","1024x gtladditions:wireless_energy_network_input_terminal","1024x gtladditions:wireless_energy_network_output_terminal"], inputFluids: ["gtceu:magmatter 1600000","gtceu:magnetohydrodynamicallyconstrainedstarmatter 1600000","gtceu:spacetime 1600000","gtceu:cosmic 1600000"], output: "gtlsupb:genesis_module", euTier: "MAX" },
            { id: "gtlsupb:creation_module", inputs: ["4x assembly_line_distorter:assembly_line_distorter_eye_of_harmony_core","4x gtladditions:draconic_collapse_core","4x gtladditions:thread_modifier_hatch","4x assembly_line_distorter:assembly_line_distorter_material","4x gtceu:door_of_create","4x gtceu:create_aggregation","4x gtceu:nano_core","4x gtceu:pcb_factory","4x gtladditions:apocalyptic_torsion_quantum_matrix","1024x gtladditions:wireless_energy_network_input_terminal","1024x gtladditions:wireless_energy_network_output_terminal"], inputFluids: ["gtceu:magmatter 1600000","gtceu:magnetohydrodynamicallyconstrainedstarmatter 1600000","gtceu:spacetime 1600000","gtceu:cosmic 1600000"], output: "gtlsupb:creation_module", euTier: "MAX" },
            { id: "gtlsupb:void_module", inputs: ["4x assembly_line_distorter:assembly_line_distorter_eye_of_harmony_core","4x gtladditions:forge_of_the_antichrist","4x gtladditions:thread_modifier_hatch","4x assembly_line_distorter:assembly_line_distorter_material","4x gtceu:gravitation_shockburst","1024x gtladditions:wireless_energy_network_input_terminal","1024x gtladditions:wireless_energy_network_output_terminal"], inputFluids: ["gtceu:magmatter 1600000","gtceu:magnetohydrodynamicallyconstrainedstarmatter 1600000","gtceu:spacetime 1600000","gtceu:cosmic 1600000"], output: "gtlsupb:void_module", euTier: "MAX" },
            { id: "gtlsupb:eternity_module", inputs: ["gtlsupb:void_module","gtlsupb:creation_module","gtlsupb:genesis_module","gtlsupb:microcosm_foundry","4x gtladditions:forge_of_the_antichrist","1024x gtladditions:wireless_energy_network_input_terminal","1024x gtladditions:wireless_energy_network_output_terminal"], inputFluids: ["gtceu:magmatter 1600000","gtceu:magnetohydrodynamicallyconstrainedstarmatter 1600000","gtceu:spacetime 1600000","gtceu:cosmic 1600000"], output: "gtlsupb:eternity_module", euTier: "MAX" },
            { id: "gtlsupb:singularity_module", inputs: ["32x gtceu:super_blast_smelter"], circuit: 1, output: "gtlsupb:singularity_module", euTier: "MAX" },
            { id: "gtlsupb:world_module", inputs: ["32x gtceu:super_blast_smelter"], circuit: 2, output: "gtlsupb:world_module", euTier: "MAX" },
            { id: "gtlsupb:celestial_module", inputs: ["32x gtceu:super_blast_smelter"], circuit: 3, output: "gtlsupb:celestial_module", euTier: "MAX" },
            { id: "gtlsupb:star_forge_module", inputs: ["32x gtceu:super_blast_smelter"], circuit: 4, output: "gtlsupb:star_forge_module", euTier: "MAX" },
            { id: "gtlsupb:forging_heaven_ship", inputs: ["gtlsupb:singularity_module","gtlsupb:world_module","gtlsupb:celestial_module","gtlsupb:star_forge_module"], circuit: 5, output: "gtlsupb:forging_heaven_ship", euTier: "MAX" }
        ];
        supraRecipes.forEach(r => {
            let builder = safeGt(gtr.suprachronal_assembly_line, r.id);
            builder.itemInputs(r.inputs);
            if (r.circuit !== undefined) builder.circuit(r.circuit);
            if (r.inputFluids) builder.inputFluids(r.inputFluids);
            builder.itemOutputs(r.output).duration(1);
            builder.EUt(GTValues.VA[GTValues[r.euTier]]);
            totalSupra++;
        });

        let totalRecipes = totalShaped + totalShapeless + totalVoid + totalGt + totalSupra;
        log(`配方添加完成: 有序配方 ${totalShaped} 个, 无序配方 ${totalShapeless} 个, 虚空吸收器 ${totalVoid} 个, GT机器配方 ${totalGt} 个, 超时空装配线配方 ${totalSupra} 个, 总计 ${totalRecipes} 个`);
    });
})();