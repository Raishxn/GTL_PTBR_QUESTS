ServerEvents.recipes(event => {
    var config = JsonIO.read('kubejs/config/godpath.json');
    var enabled = config && config.enabled === true;
    console.log('[普通配方] 事件触发，伪神模式：' + enabled);
    // 不跳过普通配方，保持共存
    const gtr = event.recipes.gtceu;
    const CONSTANTS = {
        DEFAULT_DURATION: 200,
        LOW_EUT: 8,
        MEDIUM_EUT: 30,
        HIGH_EUT: 8192,
        ULTRA_EUT: 524288,
        SULFURIC_ACID: 'gtceu:sulfuric_acid',
        NITRIC_ACID: 'gtceu:nitric_acid',
        HYDROCHLORIC_ACID: 'gtceu:hydrochloric_acid',
        PCB_COOLANT: 'gtceu:pcb_coolant'
    };
    // -------------------------- 配方移除模块 --------------------------
    ['low', 'medium', 'high'].forEach(type => event.remove({ id: `kubejs:assembler/${type}_frequency_laser` }));
    ['overworld', 'nether', 'end'].forEach(dim => event.remove({ id: `kubejs:world_data_scanner/${dim}_data` }));
    event.remove({ type: 'gtceu:forge_hammer', output: '#forge:plates' });
    event.remove({ id: /gtceu:forge_hammer\/ingot_to_dust\/.*/ });
    event.remove({ output: 'gtl_extend:quantum_computer', type: 'gtceu:assembly_line' });
    const REMOVE_TYPES = ['gtceu:disassembly', 'gtceu:disassembler', 'gtceu:scrap', 'gtceu:recycling'];
    REMOVE_TYPES.forEach(type => event.remove({ type: type }));
    const REMOVE_ID_REGEXES = [/.*disassembly.*/, /.*disassembler.*/, /.*disassemble.*/];
    REMOVE_ID_REGEXES.forEach(regex => event.remove({ id: regex }));
    const REMOVE_OUTPUTS = [
        'merequester:requester',
        'merequester:requester_terminal',
        'extendedae_plus:virtual_crafting_card',
        'extendedae_plus:entity_speed_ticker',
        'extendedae_plus:entity_speed_card',
        'mae2:64x_crafting_accelerator',
        'mae2:16x_crafting_accelerator',
		'gtceu:disassembly',
        'mae2:4x_crafting_accelerator',
        'extendedae_plus:1024x_crafting_accelerator',
        'extendedae_plus:256x_crafting_accelerator',
        'extendedae_plus:64x_crafting_accelerator',
        'extendedae_plus:16x_crafting_accelerator',
        'extendedae_plus:4x_crafting_accelerator',
		'gtladditions:suprachronal_assembly_line/infinity_input_dual_hatch', 
		'gtceu:research_station/1_x_gtladditions_super_input_dual_hatch',
        'mae2:256x_crafting_accelerator'
    ];
    REMOVE_OUTPUTS.forEach(output => event.remove({ output: output }));
    const REMOVE_SPECIFIC_IDS = [
        'gtl_extend:assembly_line/cattle_cattle_machine',
        'gtceu:research_station/1_x_gtceu_dissolving_tank',
        'gtl_extend:cattle_cattle_machine/liquidstarlight',
        'gtl_extend:cattle_cattle_machine/milk'
    ];
    REMOVE_SPECIFIC_IDS.forEach(id => event.remove({ id: id }));
    event.remove({ id: 'gtl_extend:suprachronal_assembly_line/dimensionalpower' });
    event.remove({ id: 'gtceu:shaped/generator_array' });

    // -------------------------- 配方修改模块 --------------------------
    gtr.large_chemical_reactor('kubejs:indium_dust_from_lead_zinc')
        .itemInputs('8x gtceu:lead_dust', '8x gtceu:zinc_dust')
        .inputFluids(`${CONSTANTS.SULFURIC_ACID} 8000`)
        .itemOutputs('gtceu:indium_dust')
        .outputFluids('gtceu:lead_zinc_solution 8000')
        .EUt(CONSTANTS.HIGH_EUT).duration(CONSTANTS.DEFAULT_DURATION).circuit(4);
    const simpleCentrifuges = [
        { input: 'gtceu:raw_sphalerite', output: 'gtceu:gallium_dust', id: 'kubejs:gallium_from_sphalerite' },
        { input: 'gtceu:raw_realgar', output: 'gtceu:arsenic_dust', id: 'kubejs:arsenic_from_realgar' },
        { input: 'gtceu:raw_pyrolusite', output: 'gtceu:manganese_dust', id: 'kubejs:manganese_from_pyrolusite' },
        { input: 'gtceu:raw_tricalcium_phosphate', output: 'gtceu:phosphorus_dust', id: 'kubejs:phosphorus_from_tricalcium_phosphate' }
    ];
    simpleCentrifuges.forEach(recipe => {
        gtr.centrifuge(recipe.id)
            .itemInputs(recipe.input)
            .itemOutputs(recipe.output)
            .EUt(CONSTANTS.LOW_EUT)
            .duration(CONSTANTS.DEFAULT_DURATION)
            .circuit(3);
    });
    event.smelting('minecraft:coal', 'gtceu:coal_dust', 0.1).id('kubejs:coal_from_dust');
    ['cooperite_dust', 'bornite_dust'].forEach(dust => {
        const baseName = dust.split('_')[0];
        gtr.chemical_reactor(`kubejs:platinum_sludge_from_${baseName}`)
            .itemInputs(`gtceu:${dust}`)
            .inputFluids(`${CONSTANTS.NITRIC_ACID} 100`)
            .itemOutputs('gtceu:platinum_group_sludge_dust')
            .outputFluids('gtceu:sulfuric_copper_solution 100')
            .EUt(CONSTANTS.MEDIUM_EUT)
            .duration(CONSTANTS.DEFAULT_DURATION);
    });
    gtr.chemical_reactor('kubejs:uranium_sulfate_from_uraninite')
        .itemInputs('gtceu:uraninite_dust')
        .inputFluids(`${CONSTANTS.SULFURIC_ACID} 1000`)
        .outputFluids('gtceu:uranium_sulfate_waste_solution 1000')
        .EUt(2048)
        .duration(CONSTANTS.DEFAULT_DURATION)
        .circuit(24);
    gtr.chemical_reactor('kubejs:boron_fluoride_synthesis')
        .itemInputs('gtceu:boron_dust')
        .inputFluids('gtceu:fluorine 100')
        .outputFluids('gtceu:boron_fluoride 1000')
        .duration(200)
        .EUt(30);
    gtr.chemical_reactor('kubejs:trifluoroacetic_phosphate_ester_from_sodium_ethylate')
        .itemInputs('gtceu:sodium_ethylate_dust')
        .inputFluids(`${CONSTANTS.HYDROCHLORIC_ACID} 100`)
        .itemOutputs('gtceu:trifluoroacetic_phosphate_ester_dust')
        .EUt(CONSTANTS.MEDIUM_EUT)
        .duration(CONSTANTS.DEFAULT_DURATION);
    gtr.chemical_reactor('kubejs:actinium_radium_nitrate_from_trinium')
        .itemInputs('gtceu:trinium_dust', 'gtceu:carbon_nanotubes_dust')
        .inputFluids(`${CONSTANTS.NITRIC_ACID} 1000`)
        .outputFluids('gtceu:actinium_radium_nitrate_solution 10')
        .EUt(CONSTANTS.MEDIUM_EUT)
        .duration(CONSTANTS.DEFAULT_DURATION);
    gtr.mixer('kubejs:taranium_rich_liquid_helium_from_stone_dust')
        .inputFluids('gtceu:sodium_hydroxide_solution 1000', 'gtceu:tritium_hydride 1000')
        .itemInputs('gtceu:stone_dust')
        .outputFluids('gtceu:taranium_rich_liquid_helium_4 60')
        .duration(CONSTANTS.DEFAULT_DURATION)
        .EUt(CONSTANTS.MEDIUM_EUT)
        .circuit(3);
    gtr.electrolyzer('kubejs:mox_quad_depletion')
        .itemInputs('kubejs:reactor_mox_quad')
        .itemOutputs('kubejs:depleted_reactor_mox_quad')
        .duration(200)
        .EUt(30);
    gtr.assembler('kubejs:temporal_matter_synthesis')
        .itemInputs('kubejs:kinetic_matter', 'kubejs:corporeal_matter', 'gtceu:tritanium_block')
        .itemOutputs('kubejs:temporal_matter')
        .duration(1200)
        .EUt(GTValues.V[13])
        .circuit(24);
    gtr.forming_press('kubejs:copper_credit_press')
        .itemInputs('minecraft:copper_ingot')
        .itemOutputs('gtceu:copper_credit')
        .duration(200)
        .EUt(30)
        .circuit(5);
    gtr.assembler('kubejs:infinity_input_dual_hatch')
        .itemInputs('gtladditions:me_super_pattern_buffer')
        .itemOutputs('gtladditions:infinity_input_dual_hatch')
        .duration(CONSTANTS.DEFAULT_DURATION)
        .EUt(CONSTANTS.MEDIUM_EUT)
        .circuit(32);
    const lasers = [
        { id: 'kubejs:laser_low_red_garnet', input: 'gtceu:red_garnet_rod', output: 'kubejs:low_frequency_laser', circuit: 1 },
        { id: 'kubejs:laser_medium_lazurite', input: 'gtceu:lazurite_rod', output: 'kubejs:medium_frequency_laser', circuit: 2 },
        { id: 'kubejs:laser_high_amethyst', input: 'gtceu:amethyst_rod', output: 'kubejs:high_frequency_laser', circuit: 3 }
    ];
    lasers.forEach(recipe => {
        gtr.assembler(recipe.id)
            .itemInputs(recipe.input, 'kubejs:highly_reflective_mirror', 'kubejs:smd_diode_optical')
            .itemOutputs(recipe.output)
            .EUt(CONSTANTS.ULTRA_EUT)
            .duration(600)
            .circuit(recipe.circuit)
            .cleanroom(CleanroomType.CLEANROOM);
    });
    const rocketUpgrades = [
        { input: 'ad_astra:tier_1_rocket', output: 'ad_astra:tier_2_rocket' },
        { input: 'ad_astra:tier_2_rocket', output: 'ad_astra:tier_3_rocket' },
        { input: 'ad_astra:tier_3_rocket', output: 'ad_astra:tier_4_rocket' },
        { input: 'ad_astra:tier_4_rocket', output: 'ad_astra_rocketed:tier_5_rocket' },
        { input: 'ad_astra_rocketed:tier_5_rocket', output: 'ad_astra_rocketed:tier_6_rocket' },
        { input: 'ad_astra_rocketed:tier_6_rocket', output: 'ad_astra_rocketed:tier_7_rocket' }
    ];
    rocketUpgrades.forEach((upgrade, index) => {
        const id = `kubejs:rocket_upgrade_t${index+1}_to_t${index+2}`;
        event.shapeless(upgrade.output, [upgrade.input]).id(id);
    });
    const VARIANT_PREFIXES = [
        'moon_stone', 'mars_stone', 'venus_stone', 'mercury_stone', 'glacio_stone',
        'titanstone', 'plutostone', 'iostone', 'ganymedestone', 'enceladusstone',
        'ceresstone', 'granite', 'diorite', 'andesite', 'red_granite', 'marble',
        'deepslate', 'tuff', 'sand', 'red_sand', 'gravel', 'basalt', 'netherrack',
        'blackstone', 'endstone', 'basaltic', 'granitic', 'mars', 'glacio', 'venus', 'moon'
    ].map(p => p + '_');
    const baseOreMap = new Map();
    Ingredient.of('#forge:ores').getItemIds().forEach(oreId => {
        const oreStr = String(oreId);
        const [namespace, path] = oreId.split(':');
        if (!namespace || !path) return;
        let basePath = path;
        if (path.endsWith('_ore')) basePath = path.slice(0, -4);
        if (!VARIANT_PREFIXES.some(prefix => basePath.startsWith(prefix))) {
            baseOreMap.set(`${namespace}:${basePath}`, oreStr);
        }
    });
    baseOreMap.forEach((oreStr, key) => {
        const infinityCell = Item.of('expatternprovider:infinity_cell', `{record:{"#c":"ae2:i",id:"${oreStr}"}}`);
        const safeId = key.replace(/[:\/]/g, '_');
        gtr.electric_implosion_compressor(`kubejs:infinity_ore_${safeId}`)
            .notConsumable('kubejs:cosmic_fragment')
            .itemInputs(`64x ${oreStr}`)
            .itemOutputs(infinityCell)
            .EUt(CONSTANTS.HIGH_EUT)
            .duration(CONSTANTS.DEFAULT_DURATION);
    });
    const worldData = [
        { id: 'kubejs:overworld_data_from_assembler', fragment: 'gtlcore:world_fragments_overworld', dust: 'gtceu:stone_dust', output: 'kubejs:overworld_data', eu: 2048, circuit: 1 },
        { id: 'kubejs:nether_data_from_assembler', fragment: 'gtlcore:world_fragments_nether', dust: 'gtceu:netherrack_dust', output: 'kubejs:nether_data', eu: 2048, circuit: 2 },
        { id: 'kubejs:end_data_from_assembler', fragment: 'gtlcore:world_fragments_end', dust: 'gtceu:endstone_dust', output: 'kubejs:end_data', eu: 32768, circuit: 3 }
    ];
    worldData.forEach(recipe => {
        gtr.assembler(recipe.id)
            .itemInputs(`64x ${recipe.fragment}`, `64x ${recipe.dust}`)
            .inputFluids(`${CONSTANTS.PCB_COOLANT} 1000`)
            .itemOutputs(recipe.output)
            .EUt(recipe.eu)
            .duration(600)
            .circuit(recipe.circuit);
    });
    gtr.assembly_line('kubejs:quantum_computer_custom')
        .itemInputs(
            '10x gtlcore:max_storage',
            '1x ae2:condenser',
            '10x gtceu:hpca_bridge_component',
            '64x gtceu:quantum_processor_mainframe',
            '64x ae2:creative_energy_cell',
            '10x gtceu:qbit_cpu_chip',
            '64x gtceu:quantum_eye',
            '1x gtceu:quantum_star',
            '64x gtceu:neutronium_nanoswarm',
            '64x gtceu:hpca_advanced_computation_component',
            '10x gtceu:high_performance_computation_array',
            '64x gtceu:hpca_active_cooler_component'
        )
        .inputFluids(
            'gtceu:naquadria 10000',
            'gtceu:orichalcum_plasma 6000',
            'gtceu:lawrencium 1000',
            'gtceu:nobelium 3000'
        )
        .itemOutputs('gtl_extend:quantum_computer')
        .duration(1200)
        .EUt(CONSTANTS.ULTRA_EUT);
    gtr.nightmare_crafting('kubejs:pegasus_dhd_from_nightmare')
        .itemInputs(
            '21x gtceu:chaos_block',
            '14x gtladditions:stargate_frame_part',
            '4x gtladditions:stargate_chevron_upgrade',
            '6x expatternprovider:fishbig',
            '3x sgjourney:crystal_base',
            '6x gtladditions:stargate_shielding_foil',
            '5x sgjourney:reaction_chamber'
        )
        .itemOutputs('sgjourney:pegasus_dhd')
        .duration(20000)
        .EUt(999999999);
    gtr.nightmare_crafting('kubejs:cosmic_fragment_duplication')
        .notConsumable('kubejs:cosmic_fragment')
        .itemInputs('16x sgjourney:classic_stargate_base_block', '16x sgjourney:pegasus_dhd')
        .itemOutputs('kubejs:cosmic_fragment')
        .duration(60000)
        .EUt(2147483647);
    
    gtr.extractor('kubejs:rubber_plate_to_rubber')
        .itemInputs('gtceu:rubber_plate')
        .outputFluids('gtceu:rubber 144')
        .duration(100)
        .EUt(30);
    event.shapeless('gtladditions:me_super_pattern_buffer_proxy', ['gtladditions:me_super_pattern_buffer']);
    event.shapeless('gtladditions:me_super_pattern_buffer', ['gtladditions:me_super_pattern_buffer_proxy']);
    Ingredient.of('#forge:ingots').getItemIds().forEach(ingotId => {
        const ingotIdStr = ingotId.toString();
        const [mod, path] = ingotIdStr.split(':');
        if (!mod || !path) return;
        const materialName = path.replace(/_ingot$/, '');
        let dustId = mod === 'minecraft' ? `gtceu:${materialName}_dust` : `${mod}:${materialName}_dust`;
        if (!Item.exists(dustId)) {
            const tagDust = Ingredient.of(`#forge:dusts/${materialName}`).getFirst();
            if (!tagDust) return;
            dustId = tagDust.getId();
        }
        const safeMaterial = materialName.replace(/[^a-z0-9/._-]/g, '_');
        gtr.forge_hammer(`gtceu:forge_hammer/ingot_to_dust/${mod}_${safeMaterial}`)
            .itemInputs(`64x ${ingotIdStr}`)
            .itemOutputs(`64x ${dustId}`)
            .duration(CONSTANTS.DEFAULT_DURATION)
            .EUt(2);
    });
    const BAD_PARTS = ['_plate', '_double_plate', '_dense_plate', '_rod', '_long_rod', '_bolt', '_screw', '_ring', '_spring', '_gear', '_small_gear', '_wire', '_fine_wire', '_cable', '_rotor', '_turbine_blade', '_frame', '_pipe', '_fluid_pipe', '_item_pipe', '_foil', '_block', '_nugget'];
    const WHITELIST = ['ingot', 'dust', 'gem', 'raw', 'ore', 'gtceu:kevlar_plate', 'gtceu:reinforced_epoxy_resin_plate'];
    const BAD_PART_REGEX = new RegExp(`(${BAD_PARTS.join('|')})$`);
    Ingredient.all.getItemIds().forEach(id => {
        const item = id.toString();
        if (WHITELIST.some(w => item.includes(w))) return;
        if (BAD_PART_REGEX.test(item)) {
            event.remove({
                type: 'gtceu:extractor',
                input: item
            });
        }
    });
    event.forEachRecipe({ type: 'minecraft:smelting' }, recipe => {
        let input = recipe.originalRecipeIngredients
        let output = recipe.originalRecipeResult
        let oldId = recipe.getId()
        event.remove({ id: oldId })
        event.smelting(output, input)
        .cookingTime(1)
        .xp(0.7)
        .id(`fastsmelting:${oldId.replace(':', '/')}`)
    })
    event.forEachRecipe({ type: 'minecraft:blasting' }, recipe => {
        let input = recipe.originalRecipeIngredients
        let output = recipe.originalRecipeResult
        let oldId = recipe.getId()
        event.remove({ id: oldId })
        event.blasting(output, input)
        .cookingTime(1)
        .xp(0.7)
        .id(`fastblasting:${oldId.replace(':', '/')}`)
    })
    const nightmareInputItems = [
        'gtceu:annihilate_generator',
        'gtceu:dyson_sphere',
        'gtceu:advanced_hyper_reactor',
        'gtceu:hyper_reactor',
        'gtlcore:max_electric_motor',
        'kubejs:suprachronal_mainframe_complex',
        'gtceu:large_naquadah_reactor',
        'gtlcore:max_electric_pump',
        'gtlcore:max_conveyor_module',
        'gtlcore:max_robot_arm',
        'gtlcore:max_electric_piston',
        'avaritia:singularity',
        'gtlcore:max_sensor',
        'gtlcore:max_emitter',
        'gtlcore:max_field_generator',
        'gtladditions:heart_of_the_universe'
    ];
    const nightmareInputFluids = [
        'gtceu:dimensionallytranscendentcrudecatalyst 5250000',
    ];
    gtr.nightmare_crafting('kubejs:dimensionalpower_nightmare')
        .itemInputs(nightmareInputItems.map(item => `256x ${item}`))
        .inputFluids(nightmareInputFluids)
        .itemOutputs('gtl_extend:dimensionalpower')
        .duration(1200)
        .EUt(CONSTANTS.ULTRA_EUT * 3000);

    // ---- 压缩星阵 ----
    gtr.qft('kubejs:compressed_astral_array_1')
        .itemInputs(
            '144x gtladditions:black_hole_seed',
            '64x gtceu:eternity_nanoswarm',
            '64x gtceu:spacetime_nanoswarm',
            '64x minecraft:repeating_command_block'
        )
        .inputFluids('gtceu:miracle 576')
        .chancedOutput('gtladditions:compressed_astral_array', 500, 0)
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(24000);

    // 压缩星阵 · 超时空装配线（100%产出，材料×5，宇宙碎片不消耗催化剂）
    gtr.suprachronal_assembly_line('kubejs:compressed_astral_array_2')
        .notConsumable('2x kubejs:cosmic_fragment')
        .itemInputs(
            '720x gtladditions:black_hole_seed',
            '320x gtceu:eternity_nanoswarm',
            '320x gtceu:spacetime_nanoswarm',
            '320x minecraft:repeating_command_block'
        )
        .inputFluids('gtceu:miracle 2880')
        .itemOutputs('gtladditions:compressed_astral_array')
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(24000);
});

// -------------------------- tags移除 --------------------------
ServerEvents.tags('item', event => {
    event.removeAllTagsFrom('sgjourney:naquadah_rod')
    event.removeAllTagsFrom('sgjourney:naquadah_alloy')
    event.removeAllTagsFrom('sgjourney:naquadah')
    event.removeAllTagsFrom('sgjourney:raw_naquadah')
})

// -------------------------- 钢铁般的意志 --------------------------
const THRESHOLD_REWARDS = [
    { threshold: 20, item: 'gtceu:gold_credit', count: 10, message: '§a钢铁意志的起点！你累计治愈了 §e10颗心§a，钢铁正在你的手中缓缓成型！' },
    { threshold: 200, item: 'gtceu:ancient_gold_coin', count: 128, message: '§a你的意志愈发坚韧！累计治愈 §e100颗心§a，钢铁的温度已经开始灼烧你的双手！' },
    { threshold: 2000, item: 'gtladditions:super_parallel_hatch', count: 128, message: '§e钢铁的意志已经刻入你的灵魂！累计治愈 §b1000颗心§e，量子的力量为你所用！' },
    { threshold: 20000, item: 'gtladditions:astral_array', count: 2560, message: '§d传说级的钢铁意志！你累计治愈了 §b10000颗心§d，中子的坚不可摧，正是你的写照！' },
    { threshold: 200000, item: 'expatternprovider:fishbig', count: 1, message: '§6🌟 真正的钢铁意志！你用十万颗心的治愈，铸就了不朽的生命传奇！无尽的力量，属于真正的生命之神！' }
];

PlayerEvents.tick(event => {
    let player = event.entity;
    let data = player.persistentData;
    if (typeof data.totalHealed === 'number' && isNaN(data.totalHealed)) {
        delete data.lastHealth;
        delete data.healOverflow;
        delete data.totalHealed;
        THRESHOLD_REWARDS.forEach(reward => { delete data['has_reward_' + reward.threshold]; });
    }
    if (data.lastHealth == null) {
        data.lastHealth = player.health;
        data.healOverflow = 0;
        data.totalHealed = 0;
        return;
    }
    let currentHealth = player.health;
    let maxHealth = player.maxHealth;
    if (currentHealth > data.lastHealth) {
        let healAmount = currentHealth - data.lastHealth;
        let actualHeal = Math.min(healAmount, maxHealth - data.lastHealth);
        if (actualHeal <= 0) { data.lastHealth = currentHealth; return; }
        data.healOverflow += actualHeal;
        let steelCount = Math.floor(data.healOverflow / 2);
        if (steelCount > 0) {
            player.give(Item.of('gtceu:steel_ingot', steelCount));
            data.healOverflow = data.healOverflow % 2;
        }
        data.totalHealed += actualHeal;
        THRESHOLD_REWARDS.forEach(reward => {
            let rewardKey = 'has_reward_' + reward.threshold;
            if (data[rewardKey] === undefined) data[rewardKey] = false;
            if (data.totalHealed >= reward.threshold && !data[rewardKey]) {
                player.give(Item.of(reward.item, reward.count || 1));
                data[rewardKey] = true;
                player.tell(reward.message);
            }
        });
    }
    data.lastHealth = currentHealth;
});