//Version:2.1.0-私货版特供版
//防止一些奇异搞笑的变量名重复
;(function() {
	'use strict'
	const KIRIN_CONFIG = JsonIO.read('kubejs/config/kirin.json')
	if (!KIRIN_CONFIG) {
		console.error("Produto pessoal da Kirin - o servidor não detectou o arquivo de configuração, verifique a instalação!")
		return
	}
	//其它私货是否加载
	const loadedAddons = {
		thetornproductionline: !Ingredient.of('thetornproductionline:circult_process_module_1').isEmpty(),
		gtladd: Platform.isLoaded('gtladditions'),
		gtladd3: !Ingredient.of('gtladditions:vientiane_transcription_node').isEmpty(),
		dist_savior: !Ingredient.of('disksavior:steam_1').isEmpty(),
	}
	console.log('私货加载状态:')
	console.log(loadedAddons)
	//批处理倍数
	const Multiple = {
		blockConversionMultiple: (KIRIN_CONFIG.Multiple && KIRIN_CONFIG.Multiple.blockConversionMultiple) || 64,
		aggregationDeviceMultiple: (KIRIN_CONFIG.Multiple && KIRIN_CONFIG.Multiple.aggregationDeviceMultiple) || 64,
		fusionMultiple: (KIRIN_CONFIG.Multiple && KIRIN_CONFIG.Multiple.fusionMultiple) || 128,
		isaMultiple: (KIRIN_CONFIG.Multiple && KIRIN_CONFIG.Multiple.isaMultiple) || 256,
	}

	//所有流体
	const allFluids = ['kubejs:gelid_cryotheum', 'ad_astra:cryo_fuel']
	ServerEvents.tags('fluid', (event) => {
		let liquidsObject = event.get('forge:liquids').getObjectIds()
		liquidsObject.forEach((element) => {
			allFluids.push(element)
		})
	})
	//并行控制仓最大并行数
	const maxParallelMap = {
		iv: 64,
		luv: 256,
		zpm: 1024,
		uv: 4096,
		uhv: 16384,
		uev: 65536,
		uiv: 262144,
		uxv: 1048576,
		opv: 4194304,
		max: 16777216,
	}
	// 移除无用宝石筛选标签
	// 注:无用宝石的界定标准为精准、无瑕版本无特殊用途
	if (global.kirin.enableSafeFixes) {
		ServerEvents.tags('item', (event) => {
			let uselessGems = [
				'yellow_garnet',
				'monazite',
				'red_garnet',
				'apatite',
				'opal',
				'pyrope',
				'rock_salt',
				'sodalite',
				'spessartine',
				'malachite',
				'nether_quartz',
				'realgar',
				'uvarovite',
				'topaz',
				'rutile',
				'lazurite',
				'grossular',
				'green_sapphire',
				'coal',
				'cinnabar',
				'blue_topaz',
				'andradite',
				'almandine',
			]
			uselessGems.forEach((gem) => {
				event.remove('forge:siftables', `gtceu:purified_${gem}_ore`)
			})
		})

	}
	ServerEvents.recipes((event) => {
		const gtr = event.recipes.gtceu

		//==============================修复版块==============================
		if (global.kirin.enableSafeFixes) {
			//世界加速器进组装机
			if (!loadedAddons.thetornproductionline) {
				//让位于爆破，因无法检测爆破的安装所以直接让位于撕裂
				for (let index = 1; index < 9; index++) {
					let tierName = GTValues.VN[index].toLowerCase()
					gtr.assembler(`kirin:${tierName}_world_accelerator`)
						.itemInputs(
							`4x gtceu:${tierName}_field_generator`,
							`2x gtceu:${tierName}_emitter`,
							`2x gtceu:${tierName}_sensor`,
							`gtceu:${tierName}_machine_hull`
						)
						.circuit(20)
						.itemOutputs(`gtceu:${tierName}_world_accelerator`)
						.EUt(GTValues.VA[index])
						.duration(200)
				}
			}

			//并行控制仓进组装机
			let levelCable = [
				'',
				'',
				'',
				'',
				'',
				'gtceu:platinum_double_cable',
				'gtceu:niobium_titanium_double_cable',
				'gtceu:vanadium_gallium_double_cable',
				'gtceu:yttrium_barium_cuprate_double_cable',
				'gtceu:europium_double_cable',
				'gtceu:mithril_double_cable',
				'gtceu:neutronium_double_cable',
				'gtceu:taranium_double_cable',
				'gtceu:crystalmatrix_double_cable',
				'gtceu:cosmicneutronium_double_cable',
			]
			for (let index = 5; index < 14; index++) {
				let tierName = GTValues.VN[index].toLowerCase()
				let circuitsName = GTValues.VN[index + 1].toLowerCase()
				gtr.assembler(`kirin:${tierName}_parallel_hatch`)
					.itemInputs(
						`4x #gtceu:circuits/${circuitsName}`,
						`gtceu:${tierName}_emitter`,
						`gtceu:${tierName}_sensor`,
						`gtceu:${tierName}_machine_hull`,
						`2x ${levelCable[index]}`
					)
					.circuit(23)
					.itemOutputs(`gtceu:${tierName}_parallel_hatch`)
					.EUt(GTValues.VA[index])
					.duration(200)
			}

			//单独处理max并行控制仓
			gtr.assembler('kirin:max_parallel_hatch')
				.itemInputs(
					'4x kubejs:suprachronal_max',
					'gtlcore:max_emitter',
					'gtlcore:max_sensor',
					'gtceu:max_machine_hull',
					'2x gtceu:cosmicneutronium_double_cable'
				)
				.circuit(23)
				.itemOutputs('gtceu:max_parallel_hatch')
				.EUt(GTValues.VA[GTValues.MAX])
				.duration(200)

			//太空电梯无算力
			gtr.space_elevator('kirin:space_elevator')
				.circuit(2)
				.duration(400)
				.EUt(GTValues.VA[GTValues.UV])

			//虚空聚流反应抽巴纳德C空气
			if (loadedAddons.gtladd) {
				gtr.voidflux_reaction('kirin:barnada_air/uev')
					.notConsumable('gtceu:space_elevator')
					.notConsumable('gtceu:uev_fluid_regulator')
					.circuit(1)
					.outputFluids('gtceu:barnarda_air 160000')
					.EUt(GTValues.VA[GTValues.ZPM])
					.duration(200)
				gtr.voidflux_reaction('kirin:barnada_air/uiv')
					.notConsumable('gtceu:space_elevator')
					.notConsumable('gtceu:uiv_fluid_regulator')
					.circuit(1)
					.outputFluids('gtceu:barnarda_air 640000')
					.EUt(GTValues.VA[GTValues.UV])
					.duration(20)
				gtr.voidflux_reaction('kirin:barnada_air/uxv')
					.notConsumable('gtceu:space_elevator')
					.notConsumable('gtceu:uxv_fluid_regulator')
					.circuit(1)
					.outputFluids('gtceu:barnarda_air 2560000')
					.EUt(GTValues.VA[GTValues.UEV])
					.duration(200)
			}

			//预制维护仓
			let autoConfigurationParallelHatchList = [
				'gtceu:auto_configuration_maintenance_hatch',
				'gtceu:cleaning_configuration_maintenance_hatch',
				'gtceu:sterile_configuration_cleaning_maintenance_hatch',
				'gtceu:law_configuration_cleaning_maintenance_hatch',
				'gtceu:cleaning_gravity_configuration_maintenance_hatch',
				'gtceu:sterile_cleaning_gravity_configuration_maintenance_hatch',
				'gtceu:law_cleaning_gravity_configuration_maintenance_hatch',
				'gtceu:gravity_configuration_hatch',
			]
			autoConfigurationParallelHatchList.forEach((item) => {
				event.shapeless(Item.of(item, '{BlockEntityTag:{durationMultiplier:0.2f}}'), item)
				gtr.assembler(`kirin:${item.slice(6)}_0020`)
					.circuit(2)
					.itemInputs(item)
					.itemOutputs(Item.of(item, '{BlockEntityTag:{durationMultiplier:0.2f}}'))
					.EUt(1)
					.duration(20)
				gtr.assembler(`kirin:${item.slice(6)}_0120`)
					.circuit(10)
					.itemInputs(item)
					.itemOutputs(Item.of(item, '{BlockEntityTag:{durationMultiplier:1.2f}}'))
					.EUt(1)
					.duration(20)
				if (loadedAddons.gtladd) {
					event.shapeless(
						Item.of(
							item,
							'{BlockEntityTag:{durationMultiplier:0.15f,"gtladditions$max":{isDistinct:0b,storage:{Items:[{Count:1b,Slot:0,id:"kubejs:bioware_mainframe"}],Size:1}}}}'
						),
						[item, 'kubejs:bioware_mainframe']
					)
					event.shapeless(
						Item.of(
							item,
							'{BlockEntityTag:{durationMultiplier:0.1f,"gtladditions$max":{isDistinct:0b,storage:{Items:[{Count:1b,Slot:0,id:"kubejs:cosmic_mainframe"}],Size:1}}}}'
						),
						[item, 'kubejs:cosmic_mainframe']
					)
					event.shapeless(
						Item.of(
							item,
							'{BlockEntityTag:{durationMultiplier:0.05f,"gtladditions$max":{isDistinct:0b,storage:{Items:[{Count:1b,Slot:0,id:"kubejs:suprachronal_mainframe_complex"}],Size:1}}}}'
						),
						[item, 'kubejs:suprachronal_mainframe_complex']
					)
					gtr.assembler(`kirin:${item.slice(6)}_0015`)
						.circuit(15)
						.itemInputs(item, 'kubejs:bioware_mainframe')
						.itemOutputs(Item.of(item, '{BlockEntityTag:{durationMultiplier:0.15f,"gtladditions$max":{isDistinct:0b,storage:{Items:[{Count:1b,Slot:0,id:"kubejs:bioware_mainframe"}],Size:1}}}}'))
						.EUt(1)
						.duration(20)
					gtr.assembler(`kirin:${item.slice(6)}_0300`)
						.circuit(10)
						.itemInputs(item, 'kubejs:bioware_mainframe')
						.itemOutputs(Item.of(item, '{BlockEntityTag:{durationMultiplier:3.0f,"gtladditions$max":{isDistinct:0b,storage:{Items:[{Count:1b,Slot:0,id:"kubejs:bioware_mainframe"}],Size:1}}}}'))
						.EUt(1)
						.duration(20)
					gtr.assembler(`kirin:${item.slice(6)}_0010`)
						.circuit(1)
						.itemInputs(item, 'kubejs:cosmic_mainframe')
						.itemOutputs(Item.of(item, '{BlockEntityTag:{durationMultiplier:0.1f,"gtladditions$max":{isDistinct:0b,storage:{Items:[{Count:1b,Slot:0,id:"kubejs:cosmic_mainframe"}],Size:1}}}}'))
						.EUt(1)
						.duration(20)
					gtr.assembler(`kirin:${item.slice(6)}_0750`)
						.circuit(10)
						.itemInputs(item, 'kubejs:cosmic_mainframe')
						.itemOutputs(Item.of(item, '{BlockEntityTag:{durationMultiplier:7.5f,"gtladditions$max":{isDistinct:0b,storage:{Items:[{Count:1b,Slot:0,id:"kubejs:cosmic_mainframe"}],Size:1}}}}'))
						.EUt(1)
						.duration(20)
					gtr.assembler(`kirin:${item.slice(6)}_0050`)
						.circuit(15)
						.itemInputs(item, 'kubejs:suprachronal_mainframe_complex')
						.itemOutputs(Item.of(item, '{BlockEntityTag:{durationMultiplier:0.05f,"gtladditions$max":{isDistinct:0b,storage:{Items:[{Count:1b,Slot:0,id:"kubejs:suprachronal_mainframe_complex"}],Size:1}}}}'))
						.EUt(1)
						.duration(20)
					gtr.assembler(`kirin:${item.slice(6)}_2500`)
						.circuit(10)
						.itemInputs(item, 'kubejs:suprachronal_mainframe_complex')
						.itemOutputs(Item.of(item, '{BlockEntityTag:{durationMultiplier:25.0f,"gtladditions$max":{isDistinct:0b,storage:{Items:[{Count:1b,Slot:0,id:"kubejs:suprachronal_mainframe_complex"}],Size:1}}}}'))
						.EUt(1)
						.duration(20)
				}
			})
		}

		//==============================一般板块==============================
		if (global.kirin.enableSignificantBalanceChanges) {
			//认准24号电路
			//多功能机械方块组装降价
			gtr.assembler('kirin:multi_functional_casing')
				.itemInputs(
					'gtceu:solid_machine_casing',
					'4x gtceu:double_aluminium_plate',
					'2x gtceu:mv_electric_motor',
					'2x gtceu:mv_electric_piston'
				)
				.itemOutputs('8x gtlcore:multi_functional_casing')
				.circuit(24)
				.duration(40)
				.EUt(7)

			//大型蒸汽输入仓降价降阶段
			gtr.assembler('kirin:large_steam_input_hatch')
				.itemInputs('gtceu:steam_machine_casing', '4x gtceu:steel_gear', '2x gtceu:steel_tiny_fluid_pipe', '2x gtceu:steel_rotor')
				.itemOutputs('2x gtceu:large_steam_input_hatch')
				.circuit(24)
				.duration(40)
				.EUt(7)

			//进阶探板降阶段
			gtr.assembler('kirin:advanced_energy_detector_cover')
				.itemInputs('gtceu:energy_detector_cover', '4x gtceu:lv_sensor')
				.inputFluids('gtceu:soldering_alloy 144')
				.itemOutputs('gtceu:advanced_energy_detector_cover')
				.circuit(24)
				.duration(40)
				.EUt(7)
			if (loadedAddons.gtladd) {
				//无限原始恒星混合物元件
				gtr.assembler('kirin:infinity_raw_star_matter_plasma_matter')
					.itemInputs(
						'gtlcore:eschericia_petri_dish',
						'4x gtladditions:nexus_satellite_factory_mk3',
						'4x gtmthings:creative_laser_hatch',
						'4x gtceu:opv_field_generator',
						'gtlcore:cell_component_256m'
					)
					.itemOutputs(Item.of('expatternprovider:infinity_cell', '{record:{"#c":"ae2:f",id:"gtceu:raw_star_matter_plasma"}}'))
					.EUt(GTValues.VA[GTValues.MAX])
					.duration(20)

				//无限灭菌生物培养基原液元件
				gtr.assembler('kirin:infinity_biohmediumsterilized_matter')
					.itemInputs(
						'gtlcore:cupriavidus_petri_dish',
						'4x gtladditions:nexus_satellite_factory_mk3',
						'4x gtmthings:creative_laser_hatch',
						'4x gtceu:uev_field_generator',
						'gtlcore:cell_component_256m'
					)
					.itemOutputs(Item.of('expatternprovider:infinity_cell', '{record:{"#c":"ae2:f",id:"gtceu:biohmediumsterilized"}}'))
					.EUt(GTValues.VA[GTValues.MAX])
					.duration(20)

				//无限无菌培养基元件
				gtr.assembler('kirin:infinity_sterilized_growth_medium_matter')
					.itemInputs(
						'gtlcore:shewanella_petri_dish',
						'4x gtladditions:nexus_satellite_factory_mk3',
						'4x gtmthings:creative_laser_hatch',
						'4x gtceu:uev_field_generator',
						'gtlcore:cell_component_256m'
					)
					.itemOutputs(Item.of('expatternprovider:infinity_cell', '{record:{"#c":"ae2:f",id:"gtceu:sterilized_growth_medium"}}'))
					.EUt(GTValues.VA[GTValues.MAX])
					.duration(20)

				//无限培养基原液元件
				gtr.assembler('kirin:infinity_raw_growth_medium_matter')
					.itemInputs(
						'gtlcore:streptococcus_petri_dish',
						'gtmthings:creative_energy_hatch',
						'gtceu:distillation_tower',
						'gtceu:incubator',
						'gtceu:slaughterhouse',
						'gtceu:greenhouse',
						Item.of('expatternprovider:infinity_cell', '{record:{"#c":"ae2:f",id:"minecraft:water"}}')
					)
					.itemOutputs(Item.of('expatternprovider:infinity_cell', '{record:{"#c":"ae2:f",id:"gtceu:raw_growth_medium"}}'))
					.EUt(GTValues.VA[GTValues.MAX])
					.duration(20)

				//无限牛奶元件
				gtr.assembler('kirin:infinity_milk')
					.itemInputs(
						'4x minecraft:cow_spawn_egg',
						'4x gtladditions:nexus_satellite_factory_mk3',
						'4x gtmthings:creative_laser_hatch',
						'gtlcore:cell_component_256m'
					)
					.inputFluids('gtceu:milk 2147483648')
					.itemOutputs(Item.of('expatternprovider:infinity_cell', '{record:{"#c":"ae2:f",id:"gtceu:milk"}}'))
					.EUt(GTValues.VA[GTValues.MAX])
					.duration(20)
			}
			//超级天球
			if (loadedAddons.gtladd) {
				gtr.assembler('kirin:super_thread_modifier_hatch') //超级天球
					.notConsumable('gtladditions:arcanic_astrograph')
					.itemInputs('gtladditions:thread_modifier_hatch', '127x gtladditions:astral_array')
					.itemOutputs(
						Item.of(
							'gtladditions:thread_modifier_hatch',
							'{BlockEntityTag:{astralArrayInventory:{Items:[{Count:127b,Slot:0,id:"gtladditions:astral_array"}]}}}'
						)
					)
					.circuit(24)
					.EUt(GTValues.VA[GTValues.MAX])
					.duration(20)
			}

			//时空奇点聚爆
			gtr.electric_implosion_compressor('kirin:spacetime_singularity')
				.circuit(24)
				.itemInputs('1000x gtceu:spacetime_ingot')
				.itemOutputs(Item.of('avaritia:singularity', '{Id:"avaritia:spacetime"}'))
				.EUt(20 * GTValues.VA[GTValues.MAX])
				.duration(20)

			//聚合装置64倍批处理
			let aggregation_device_list = [{
					input: ['kubejs:draconium_dust', 'gtceu:zpm_field_generator', 'gtceu:lapotronic_energy_orb', 'gtceu:mithril_block', 'gtceu:hexanitrohexaaxaisowurtzitane_dust', 'gtceu:uv_field_generator', 'minecraft:nether_star', 'gtceu:enderium_block'],
					output: 'kubejs:draconic_core',
					volt: GTValues.UEV
				},
				{
					input: ['kubejs:draconium_dust', 'gtceu:uhv_field_generator', 'gtceu:quantum_eye', 'gtceu:adamantine_block', 'kubejs:draconic_core', 'gtceu:uev_field_generator', 'gtceu:quantum_star', 'gtceu:orichalcum_block'],
					output: 'kubejs:wyvern_core',
					volt: GTValues.UIV
				},
				{
					input: ['gtceu:draconium_dust', 'gtceu:uiv_field_generator', 'kubejs:dragon_heart', 'gtceu:vibranium_block', 'kubejs:wyvern_core', 'gtceu:uxv_field_generator', 'gtceu:gravi_star', 'gtceu:taranium_block'],
					output: 'kubejs:awakened_core',
					volt: GTValues.UXV
				},
				{
					input: ['gtceu:draconium_nanoswarm', 'gtceu:opv_field_generator', 'kubejs:chaos_shard', 'gtceu:legendarium_block', 'kubejs:awakened_core', 'gtlcore:max_field_generator', 'kubejs:unstable_star', 'gtceu:draconiumawakened_block'],
					output: 'kubejs:chaotic_core',
					volt: GTValues.OpV
				}
			]
			aggregation_device_list.forEach((item) => {
				let aggregation_device_inputs = []
				item.input.forEach((inputitem) => {
					aggregation_device_inputs.push(`${Multiple.aggregationDeviceMultiple}x ${inputitem}`)
				})
				gtr.aggregation_device(`kirin:${item.output.slice(7)}`)
					.circuit(24)
					.itemInputs(aggregation_device_inputs)
					.itemOutputs(`${Multiple.aggregationDeviceMultiple * 2}x ${item.output}`)
					.EUt(GTValues.VA[item.volt])
					.duration(800 * Multiple.aggregationDeviceMultiple)
					.fusionStartEU(2400000000)
			})
			//新物质异化移植，比撕裂便宜(超时空金属除外)
			if (loadedAddons.gtladd) {
				//调律和宇宙奇点
				gtr.matter_exotic('kirin:shirabon')
					.notConsumable('64x kubejs:eternity_catalyst')
					.itemInputs('4x gtceu:eternity_nanoswarm')
					.inputFluids('gtceu:magnetohydrodynamicallyconstrainedstarmatter 9341', 'gtceu:spacetime 125', 'gtceu:chaos 1440')
					.itemOutputs('kubejs:cosmic_singularity')
					.outputFluids('gtceu:shirabon 9216')
					.EUt(GTValues.V[GTValues.MAX] * 240)
					.duration(9600)

				//超时空金属
				gtr.matter_exotic('kirin:transcendentmetal')
					.itemInputs('gtceu:tennessine_block', '8x kubejs:quantum_anomaly')
					.inputFluids('gtceu:spatialfluid 1000', 'gtceu:spacetime 8800', 'gtceu:exciteddtec 8000')
					.outputFluids('gtceu:transcendentmetal 4608')
					.EUt(GTValues.V[GTValues.MAX] * 60)
					.duration(5600)

				//液态回响
				gtr.matter_exotic('kirin:echo_shard')
					.notConsumable('64x minecraft:sculk_shrieker')
					.notConsumable('64x minecraft:sculk')
					.inputFluids('gtceu:barnarda_air 144000', 'gtceu:unknowwater 1000', 'gtceu:mana 51200')
					.outputFluids('gtceu:echo_shard 10000')
					.EUt(GTValues.V[GTValues.MAX] * 60)
					.duration(3200)

				//龙血
				gtr.matter_exotic('kirin:dragon_blood')
					.itemInputs('32x gtceu:naquadria_dust', '256x gtceu:stem_cells')
					.inputFluids('gtceu:mutagen 10000', 'gtceu:mana 64000', 'gtceu:xpjuice 1280')
					.outputFluids('gtceu:dragon_blood 64000')
					.EUt(GTValues.VA[GTValues.UXV])
					.duration(4000)

				//宇宙中子素
				gtr.matter_exotic('kirin:cosmicneutronium')
					.notConsumable('64x kubejs:extremely_durable_plasma_cell')
					.itemInputs('5x kubejs:quantum_chromodynamic_charge')
					.inputFluids('gtceu:heavy_quark_degenerate_matter 10000', 'gtceu:periodicium 1000', 'gtceu:uu_matter 10000000')
					.outputFluids('gtceu:cosmicneutronium 50000')
					.EUt(GTValues.V[GTValues.MAX] * 60)
					.duration(6000)

				//拉多X聚合物
				gtr.matter_exotic('kirin:radox')
					.notConsumable('64x gtceu:eternity_nanoswarm')
					.itemInputs('256x kubejs:variation_wood')
					.inputFluids('gtceu:periodicium 163840', 'gtceu:unknowwater 2048000', 'gtceu:exciteddtsc 16384', 'gtceu:titanium_50 2304')
					.outputFluids('gtceu:radox 10800')
					.EUt(GTValues.V[GTValues.MAX] * 360)
					.duration(6000)

				//高能夸克饺子去寰宇超导
				gtr.matter_exotic('kirin:high_energy_quark_gluon_plasma')
					.notConsumable('4x kubejs:eternity_catalyst')
					.notConsumable('64x kubejs:quantum_chromodynamic_charge')
					.inputFluids(
						'gtceu:heavy_quark_degenerate_matter 3160',
						'gtceu:starmetal 1440',
						'gtceu:antimatter 5600',
						'gtceu:periodicium 16384'
					)
					.outputFluids('gtceu:high_energy_quark_gluon_plasma 49152')
					.EUt(GTValues.V[GTValues.MAX] * 15)
					.duration(3200)
			}

			//炖屎炉炖聚变
			if (loadedAddons.thetornproductionline) {
				let fusionRecipesData = [
					//秘银等离子体
					{
						inputFluids: ['gtceu:berkelium 144', 'gtceu:potassium 1152'],
						outputFluids: 'gtceu:mithril_plasma 144',
						EUt: 122880,
						duration: 200,
						mainframe: 'uv'
					},
					//山铜等离子体
					{
						inputFluids: ['gtceu:einsteinium 144', 'gtceu:sodium 1152'],
						outputFluids: 'gtceu:orichalcum_plasma 144',
						EUt: 122880,
						duration: 200,
						mainframe: 'uv'
					},
					//银等离子体
					{
						inputFluids: ['gtceu:europium 16', 'gtceu:arsenic 16'],
						outputFluids: 'gtceu:silver_plasma 16',
						EUt: 65536,
						duration: 18,
						mainframe: 'uv'
					},
					//液态镆
					{
						inputFluids: ['gtceu:calcium 32', 'gtceu:curium 32'],
						outputFluids: 'gtceu:moscovium 32',
						EUt: 122880,
						duration: 128,
						mainframe: 'uhv'
					},
					//液态𫟷
					{
						inputFluids: ['gtceu:thorium 32', 'gtceu:iron 32'],
						outputFluids: 'gtceu:livermorium 32',
						EUt: 122880,
						duration: 128,
						mainframe: 'uhv'
					},
					//液态𬭊
					{
						inputFluids: ['gtceu:europium 64', 'gtceu:neon 250'],
						outputFluids: 'gtceu:dubnium 64',
						EUt: 65536,
						duration: 128,
						mainframe: 'uhv'
					},
					//液态𬭳
					{
						inputFluids: ['gtceu:calcium 64', 'gtceu:plutonium 64'],
						outputFluids: 'gtceu:seaborgium 64',
						EUt: 65536,
						duration: 128,
						mainframe: 'uhv'
					},
					//液态鿬
					{
						inputFluids: ['gtceu:lead 16', 'gtceu:bromine 16'],
						outputFluids: 'gtceu:tennessine 16',
						EUt: 262144,
						duration: 64,
						mainframe: 'uhv'
					},
					//富塔兰金属的氦-4等离子体
					{
						inputFluids: ['gtceu:taranium_enriched_liquid_helium_3 125', 'gtceu:hydrogen 125'],
						outputFluids: 'gtceu:taranium_rich_liquid_helium_4_plasma 125',
						EUt: 1048576,
						duration: 128,
						mainframe: 'uhv'
					},
					//振金等离子体
					{
						inputFluids: ['gtceu:vibranium_unstable 16', 'gtceu:adamantium 16'],
						outputFluids: 'gtceu:vibranium_plasma 16',
						EUt: 1966080,
						duration: 200,
						mainframe: 'uev'
					},
					//亚稳态𬭶
					{
						inputFluids: ['gtceu:scandium_titanium_50_mixture 32', 'gtceu:radon 250'],
						outputFluids: 'gtceu:metastable_hassium_plasma 32',
						EUt: 491520,
						duration: 64,
						mainframe: 'uhv'
					},
					//热鿫
					{
						inputFluids: ['gtceu:oganesson_breeding_base 16', 'gtceu:dysprosium 16'],
						outputFluids: 'gtceu:hot_oganesson 125',
						EUt: 491520,
						duration: 64,
						mainframe: 'uhv'
					},
					//觉醒龙等离子体
					{
						inputFluids: ['gtceu:draconium 125', 'gtceu:quantumchromodynamically_confined_matter 125'],
						outputFluids: 'gtceu:draconiumawakened_plasma 125',
						EUt: 7864320,
						duration: 800,
						mainframe: 'uev'
					},
					//液态无尽
					{
						inputFluids: ['gtceu:crystalmatrix 2000', 'gtceu:cosmicneutronium 1000'],
						outputFluids: 'gtceu:infinity 64',
						EUt: 7864320,
						duration: 4800,
						mainframe: 'uev'
					},
					//液态铕
					{
						inputFluids: ['gtceu:neodymium 16', 'gtceu:hydrogen 375'],
						outputFluids: 'gtceu:europium 16',
						EUt: 24576,
						duration: 64,
						mainframe: 'luv'
					},
					//液态铀
					{
						inputFluids: ['gtceu:gold 16', 'gtceu:aluminium 16'],
						outputFluids: 'gtceu:uranium 16',
						EUt: 24576,
						duration: 128,
						mainframe: 'luv'
					},
					//铁等离子体
					{
						inputFluids: ['gtceu:silicon 16', 'gtceu:magnesium 16'],
						outputFluids: 'gtceu:iron_plasma 16',
						EUt: 7680,
						duration: 32,
						mainframe: 'uv'
					},
					//液态钚
					{
						inputFluids: ['gtceu:xenon 125', 'gtceu:zinc 16'],
						outputFluids: 'gtceu:plutonium 16',
						EUt: 49152,
						duration: 128,
						mainframe: 'luv'
					},
					//氦等离子体
					{
						inputFluids: ['gtceu:deuterium 125', 'gtceu:tritium 125'],
						outputFluids: 'gtceu:helium_plasma 125',
						EUt: 4096,
						duration: 16,
						mainframe: 'luv'
					},
					//氮等离子体
					{
						inputFluids: ['gtceu:beryllium 16', 'gtceu:deuterium 375'],
						outputFluids: 'gtceu:nitrogen_plasma 125',
						EUt: 16384,
						duration: 16,
						mainframe: 'zpm'
					},
					//钚241等离子体
					{
						inputFluids: ['gtceu:lutetium 16', 'gtceu:vanadium 16'],
						outputFluids: 'gtceu:plutonium_241_plasma 16',
						EUt: 1966080,
						duration: 64,
						mainframe: 'uv'
					},
					//氧等离子体
					{
						inputFluids: ['gtceu:carbon 16', 'gtceu:helium_3 125'],
						outputFluids: 'gtceu:oxygen_plasma 125',
						EUt: 4096,
						duration: 32,
						mainframe: 'zpm'
					},
					//液态铀235
					{
						inputFluids: ['gtceu:mercury 125', 'gtceu:magnesium 16'],
						outputFluids: 'gtceu:uranium_235 16',
						EUt: 24576,
						duration: 128,
						mainframe: 'luv'
					},
					//液态三钛
					{
						inputFluids: ['gtceu:titanium 32', 'gtceu:duranium 32'],
						outputFluids: 'gtceu:tritanium 16',
						EUt: 30720,
						duration: 64,
						mainframe: 'zpm'
					},
					//液态钚241
					{
						inputFluids: ['gtceu:krypton 125', 'gtceu:cerium 16'],
						outputFluids: 'gtceu:plutonium_241 16',
						EUt: 49152,
						duration: 128,
						mainframe: 'zpm'
					},
					//液态锇
					{
						inputFluids: ['gtceu:silver 16', 'gtceu:copper 16'],
						outputFluids: 'gtceu:osmium 16',
						EUt: 24578,
						duration: 64,
						mainframe: 'luv'
					},
					//液态超能硅岩
					{
						inputFluids: ['gtceu:enriched_naquadah 16', 'gtceu:radon 125'],
						outputFluids: 'gtceu:naquadria 4',
						EUt: 49152,
						duration: 64,
						mainframe: 'uv'
					},
					//液态镅
					{
						inputFluids: ['gtceu:lutetium 32', 'gtceu:chromium 32'],
						outputFluids: 'gtceu:americium 32',
						EUt: 49152,
						duration: 64,
						mainframe: 'zpm'
					},
					//液态𫟼
					{
						inputFluids: ['gtceu:arsenic 32', 'gtceu:ruthenium 16'],
						outputFluids: 'gtceu:darmstadtium 16',
						EUt: 30720,
						duration: 32,
						mainframe: 'zpm'
					},
					//液态铿铀
					{
						inputFluids: ['gtceu:gallium 16', 'gtceu:radon 125'],
						outputFluids: 'gtceu:duranium 16',
						EUt: 16384,
						duration: 64,
						mainframe: 'luv'
					},
					//液态铬
					{
						inputFluids: ['gtceu:hydrogen 125', 'gtceu:vanadium 16'],
						outputFluids: 'gtceu:chromium 16',
						EUt: 24576,
						duration: 64,
						mainframe: 'luv'
					},
					//液态鲁
					{
						inputFluids: ['gtceu:lanthanum 16', 'gtceu:silicon 16'],
						outputFluids: 'gtceu:lutetium 16',
						EUt: 7680,
						duration: 16,
						mainframe: 'luv'
					},
					//气态氡
					{
						inputFluids: ['gtceu:gold 16', 'gtceu:mercury 16'],
						outputFluids: 'gtceu:radon 125',
						EUt: 30720,
						duration: 64,
						mainframe: 'zpm'
					},
					//镍等离子体
					{
						inputFluids: ['gtceu:potassium 16', 'gtceu:fluorine 125'],
						outputFluids: 'gtceu:nickel_plasma 16',
						EUt: 30720,
						duration: 16,
						mainframe: 'uv'
					},
					//氩等离子体
					{
						inputFluids: ['gtceu:carbon 16', 'gtceu:magnesium 16'],
						outputFluids: 'gtceu:argon_plasma 125',
						EUt: 24576,
						duration: 32,
						mainframe: 'zpm'
					},
					//液态铟
					{
						inputFluids: ['gtceu:silver 144', 'gtceu:lithium 144'],
						outputFluids: 'gtceu:indium 144',
						EUt: 24576,
						duration: 16,
						mainframe: 'zpm'
					},
					//液态中子素
					{
						inputFluids: ['gtceu:americium 128', 'gtceu:naquadria 128'],
						outputFluids: 'gtceu:neutronium 32',
						EUt: 98304,
						duration: 200,
						mainframe: 'uv'
					}
				]
				let getDurationFactor = (mainframe) => mainframe === 'luv' ? 4 : 16

				fusionRecipesData.forEach((recipe) => {
					const [outName, outAmountStr] = recipe.outputFluids.split(' ')
					const [in1Name, in1AmountStr] = recipe.inputFluids[0].split(' ')
					const [in2Name, in2AmountStr] = recipe.inputFluids[1].split(' ')
					const outAmount = parseInt(outAmountStr, 10) * Multiple.fusionMultiple
					const in1Amount = parseInt(in1AmountStr, 10) * Multiple.fusionMultiple
					const in2Amount = parseInt(in2AmountStr, 10) * Multiple.fusionMultiple
					const recipeId = outName.replace('gtceu:', '')
					const duration = recipe.duration * getDurationFactor(recipe.mainframe) * Multiple.fusionMultiple

					gtr.alloy_blast_smelter(`kirin:${recipeId}`)
						.notConsumable(`gtceu:${recipe.mainframe}_fusion_reactor`)
						.notConsumable('thetornproductionline:fusion_process_module')
						.inputFluids(`${in1Name} ${in1Amount}`, `${in2Name} ${in2Amount}`)
						.outputFluids(`${outName} ${outAmount}`)
						.EUt(recipe.EUt)
						.duration(duration)
						.blastFurnaceTemp(800)
				})
			}

			//超维度搅拌证明
			gtr.dimensionally_transcendent_mixer('kirin:nan_certificate')
				.itemInputs(
					'gtceu:uranium_235_dust',
					'gtceu:copper76_dust',
					'gtceu:plutonium_241_dust',
					'gtceu:superheavy_l_alloy_ingot',
					'gtceu:superheavy_h_alloy_ingot',
					'gtceu:periodicium_ingot'
				)
				.inputFluids(
					'gtceu:helium_3 1000',
					'gtceu:tritium 1000',
					'gtceu:deuterium 1000',
					'gtceu:ytterbium_178 1000',
					'gtceu:titanium_50 1000'
				)
				.itemOutputs('gtceu:nan_certificate')
				.duration(400)
				.EUt(GTValues.VA[GTValues.UIV])

			//等离子冷凝进真空冷冻机
			//实际上是从原代码直接搬的，只是改了机器类型，所以没有注释
			let fluids = [
				'argon',
				'helium',
				'nickel',
				'iron',
				'nitrogen',
				'oxygen',
				'mithril',
				'orichalcum',
				'enderium',
				'adamantium',
				'infuscolium',
				'echoite',
				'vibranium',
				'taranium_rich_liquid_helium_4',
				'legendarium',
				'heavy_quark_degenerate_matter',
				'starmetal',
				'quantumchromodynamically_confined_matter',
				'astraltitanium',
				'celestialtungsten',
			]
			fluids.forEach((fluid) => {
				gtr.vacuum_freezer('kirin:' + fluid + '_freezer')
					.inputFluids('gtceu:' + fluid + '_plasma 1000', 'gtceu:liquid_helium 100000')
					.outputFluids('gtceu:' + fluid + ' 1000', 'gtceu:helium 100000')
					.circuit(1)
					.EUt(GTValues.VA[GTValues.UHV])
					.duration(600)
				event.remove({
					id: `gtceu:antientropy_condensation/${fluid}_freezer`
				})
			})
			let ingots = [
				'mithril',
				'orichalcum',
				'enderium',
				'adamantium',
				'infuscolium',
				'echoite',
				'vibranium',
				'legendarium',
				'heavy_quark_degenerate_matter',
				'starmetal',
				'quantumchromodynamically_confined_matter',
				'iron',
				'nickel',
			]
			ingots.forEach((ingot) => {
				gtr.vacuum_freezer('kirin:' + ingot + '_ingot_freezer')
					.notConsumable('kubejs:ingot_field_shape')
					.inputFluids('gtceu:' + ingot + '_plasma 144', 'gtceu:liquid_helium 14400')
					.outputFluids('gtceu:helium 14400')
					.itemOutputs('gtceu:hot_' + ingot + '_ingot')
					.EUt(GTValues.VA[GTValues.UHV])
					.duration(60)
			})

			gtr.vacuum_freezer('kirin:cosmic_mesh')
				.itemInputs('kubejs:cosmic_mesh_containment_unit')
				.inputFluids('gtceu:liquid_helium 100000')
				.itemOutputs('kubejs:time_dilation_containment_unit')
				.outputFluids('gtceu:liquid_cosmic_mesh 1000')
				.EUt(GTValues.VA[GTValues.OpV])
				.duration(800)

			gtr.vacuum_freezer('kirin:degenerate_rhenium')
				.itemInputs('kubejs:rhenium_plasma_containment_cell')
				.inputFluids('gtceu:liquid_helium 100000')
				.outputFluids('gtceu:liquid_degenerate_rhenium 1000', 'gtceu:helium 100000')
				.itemOutputs('kubejs:plasma_containment_cell')
				.EUt(GTValues.VA[GTValues.UEV])
				.duration(1200)

			gtr.vacuum_freezer('kirin:draconiumawakened')
				.itemInputs('kubejs:draconiumawakened_plasma_containment_cell')
				.inputFluids('gtceu:liquid_helium 100000')
				.outputFluids('gtceu:draconiumawakened 1000', 'gtceu:helium 100000')
				.itemOutputs('kubejs:plasma_containment_cell')
				.EUt(GTValues.VA[GTValues.UXV])
				.duration(1200)

			gtr.vacuum_freezer('kirin:neutronium_sphere')
				.notConsumable('kubejs:ball_field_shape')
				.inputFluids('gtceu:liquid_helium 32000')
				.outputFluids('gtceu:helium 32000')
				.itemInputs('kubejs:neutron_plasma_containment_cell')
				.itemOutputs('4x kubejs:neutronium_sphere', 'kubejs:plasma_containment_cell')
				.EUt(GTValues.VA[GTValues.UHV])
				.duration(800)

			gtr.vacuum_freezer('kirin:quantumchromodynamic_protective_plating')
				.notConsumable('gtceu:vibranium_nanoswarm')
				.notConsumable('gtceu:infuscolium_nanoswarm')
				.inputFluids('gtceu:liquid_helium 10000', 'gtceu:high_energy_quark_gluon_plasma 100')
				.outputFluids('gtceu:helium 10000')
				.itemOutputs('kubejs:quantumchromodynamic_protective_plating')
				.EUt(GTValues.VA[GTValues.UXV])
				.duration(300)

			gtr.vacuum_freezer('kirin:cosmicneutronium')
				.itemInputs('kubejs:cosmic_neutron_plasma_cell')
				.inputFluids('gtceu:liquid_helium 100000')
				.outputFluids('gtceu:cosmicneutronium 1000', 'gtceu:helium 100000')
				.itemOutputs('kubejs:extremely_durable_plasma_cell')
				.EUt(GTValues.VA[GTValues.OpV])
				.duration(1200)

			gtr.vacuum_freezer('kirin:crystalmatrix')
				.itemInputs('kubejs:crystalmatrix_plasma_containment_cell')
				.inputFluids('gtceu:liquid_helium 100000')
				.outputFluids('gtceu:crystalmatrix 1000', 'gtceu:helium 100000')
				.itemOutputs('kubejs:plasma_containment_cell')
				.EUt(GTValues.VA[GTValues.OpV])
				.duration(1000)

			gtr.vacuum_freezer('kirin:chaos')
				.itemInputs('kubejs:chaos_containment_unit')
				.inputFluids('gtceu:liquid_helium 100000')
				.outputFluids('gtceu:chaos 1000', 'gtceu:helium 100000')
				.itemOutputs('kubejs:time_dilation_containment_unit')
				.EUt(GTValues.VA[GTValues.OpV])
				.duration(1600)

			gtr.vacuum_freezer('kirin:hassium')
				.inputFluids('gtceu:metastable_hassium_plasma 1000', 'gtceu:liquid_helium 100000')
				.outputFluids('gtceu:liquid_metastable_hassium 1000', 'gtceu:helium 100000')
				.EUt(GTValues.VA[GTValues.UHV])
				.duration(1200)

			gtr.vacuum_freezer('kirin:actinium_superhydride_dust')
				.itemInputs('kubejs:actinium_superhydride_plasma_containment_cell')
				.inputFluids('gtceu:liquid_helium 24000')
				.itemOutputs('13x gtceu:actinium_superhydride_dust', 'kubejs:plasma_containment_cell')
				.outputFluids('gtceu:helium 24000')
				.EUt(GTValues.VA[GTValues.UIV])
				.duration(340)

			gtr.vacuum_freezer('kirin:grade_14_purified_water')
				.notConsumable('gtceu:uhv_fluid_regulator')
				.inputFluids('gtceu:grade_13_purified_water 10000', 'gtceu:mithril_plasma 1000')
				.itemOutputs('60x gtceu:tiny_mithril_dust')
				.outputFluids('gtceu:grade_14_purified_water 9900')
				.EUt(GTValues.VA[GTValues.UHV])
				.duration(800)

			gtr.vacuum_freezer('kirin:grade_15_purified_water')
				.notConsumable('gtceu:uev_fluid_regulator')
				.inputFluids('gtceu:grade_14_purified_water 10000', 'gtceu:enderium_plasma 1000')
				.itemOutputs('61x gtceu:tiny_enderium_dust')
				.outputFluids('gtceu:grade_15_purified_water 9990')
				.EUt(GTValues.VA[GTValues.UEV])
				.duration(800)

			gtr.vacuum_freezer('kirin:grade_16_purified_water')
				.notConsumable('gtceu:uiv_fluid_regulator')
				.inputFluids('gtceu:grade_15_purified_water 10000', 'gtceu:echoite_plasma 1000')
				.itemOutputs('62x gtceu:tiny_echoite_dust')
				.outputFluids('gtceu:grade_16_purified_water 9999')
				.EUt(GTValues.VA[GTValues.UIV])
				.duration(800)

			if (loadedAddons.gtladd) {
				gtr.vacuum_freezer('kirin:creon')
					.circuit(1)
					.inputFluids('gtladditions:creon_plasma 1000', 'gtceu:liquid_helium 100000')
					.outputFluids('gtladditions:creon 1000', 'gtceu:helium 100000')
					.EUt(GTValues.VA[GTValues.UEV])
					.duration(1200)

				//反熵已经加强，亿万人必须用反熵冷却等离子体
				let needtocooldown = ['chaos', 'crystalmatrix', 'draconiumawakened']
				for (let i = 0; i < needtocooldown.length; i++) {
					gtr.antientropy_condensation('kirin:' + needtocooldown[i] + '_antientropy_condensation')
						.inputFluids('gtceu:' + needtocooldown[i] + '_plasma 1000', 'kubejs:gelid_cryotheum 250')
						.outputFluids('gtceu:' + needtocooldown[i] + ' 1000', 'gtceu:blaze 250')
						.EUt(GTValues.VA[GTValues.UIV])
						.duration(10)
				}

				gtr.antientropy_condensation('kirin:cosmic_mesh_plasma_antientropy_condensation')
					.inputFluids('gtceu:cosmic_mesh_plasma 1000', 'kubejs:gelid_cryotheum 250')
					.outputFluids('gtceu:liquid_cosmic_mesh 1000', 'gtceu:blaze 250')
					.EUt(GTValues.VA[GTValues.UIV])
					.duration(10)

				gtr.antientropy_condensation('kirin:liquid_degenerate_rhenium_antientropy_condensation')
					.inputFluids('gtceu:degenerate_rhenium_plasma 1000', 'kubejs:gelid_cryotheum 250')
					.outputFluids('gtceu:liquid_degenerate_rhenium 1000', 'gtceu:blaze 250')
					.EUt(GTValues.VA[GTValues.UIV])
					.duration(10)

				//另类反熵加强
				gtr.qft('kirin:cosmicneutronium_qft__antientropy_condensation')
					.notConsumable('gtladditions:antientropy_condensation_center')
					.notConsumable('gtceu:dimensionally_transcendent_plasma_forge')
					.notConsumable('64x kubejs:extremely_durable_plasma_cell')
					.itemInputs('kubejs:dust_cryotheum')
					.inputFluids('gtceu:uu_matter 1000000', 'gtceu:dense_neutron_plasma 1000', 'kubejs:gelid_cryotheum 250')
					.outputFluids('gtceu:cosmicneutronium 5000', 'gtceu:blaze 250')
					.EUt(GTValues.VA[GTValues.UIV])
					.duration(20)

				gtr.qft('kirin:neutronium_sphere_qft__antientropy_condensation')
					.notConsumable('kubejs:ball_field_shape')
					.notConsumable('gtladditions:antientropy_condensation_center')
					.notConsumable('gtceu:dimensionally_transcendent_plasma_forge')
					.itemInputs('kubejs:dust_cryotheum')
					.inputFluids('gtceu:neutronium 250', 'gtceu:ice 250')
					.itemOutputs('kubejs:neutronium_sphere')
					.outputFluids('gtceu:steam 40000')
					.EUt(GTValues.VA[GTValues.UIV])
					.duration(20)

				//艾德曼合金等高级合金混沌炼金配方
				//艾德曼合金
				gtr.chaotic_alchemy('kirin:adamantium')
					.itemInputs('4x gtceu:orichalcum_dust', '6x gtceu:antimony_dust', '8x gtceu:iron_dust', '24x gtceu:bloodstone_dust')
					.inputFluids('gtceu:mercury 1000', 'gtceu:tin 1024')
					.circuit(6)
					.outputFluids('gtceu:adamantium 2304')
					.EUt(GTValues.VA[GTValues.UIV])
					.duration(200)
					.blastFurnaceTemp(800)
				//天体钨
				gtr.chaotic_alchemy('kirin:celestialtungsten')
					.itemInputs('gtceu:titan_precision_steel_dust', '2x gtceu:americium_dust', '4x gtceu:tartarite_dust', '4x gtceu:tungsten_dust')
					.inputFluids('gtceu:astraltitanium 144', 'gtceu:xenon 1000')
					.circuit(6)
					.outputFluids('gtceu:celestialtungsten 1000')
					.EUt(GTValues.VA[GTValues.UIV])
					.duration(200)
					.blastFurnaceTemp(800)
				//星体钛
				gtr.chaotic_alchemy('kirin:astraltitanium')
					.itemInputs('4x gtceu:force_dust', '4x gtceu:titanium_dust', '2x gtceu:cobalt_dust', '2x gtceu:copper_dust')
					.inputFluids('gtceu:tritium 1000')
					.circuit(5)
					.outputFluids('gtceu:astraltitanium 1000')
					.EUt(GTValues.VA[GTValues.UIV])
					.duration(200)
					.blastFurnaceTemp(800)
				//创律合金
				gtr.chaotic_alchemy('kirin:creon')
					.itemInputs('40x gtceu:fermium_dust', '40x gtceu:thorium_dust', '40x gtceu:calcium_dust')
					.inputFluids('gtceu:celestialtungsten 2304', 'gtceu:dimensionallytranscendentresidue 2736')
					.circuit(5)
					.outputFluids('gtladditions:creon 1000')
					.EUt(GTValues.VA[GTValues.MAX])
					.duration(200)
					.blastFurnaceTemp(800)
				//传奇合金
				gtr.chaotic_alchemy('kirin:legendarium')
					.itemInputs(
						'4x gtceu:naquadriatictaranium_dust',
						'2x gtceu:trinium_dust',
						'2x gtceu:duranium_dust',
						'2x gtceu:orichalcum_dust',
						'2x gtceu:mithril_dust',
						'2x gtceu:tritanium_dust',
						'2x gtceu:adamantine_dust',
						'2x gtceu:vibranium_dust'
					)
					.inputFluids('gtceu:neutronium 1000', 'gtceu:heavy_lepton_mixture 1000', 'gtceu:adamantium 288')
					.circuit(11)
					.outputFluids('gtceu:legendarium 2304')
					.EUt(GTValues.VA[GTValues.UXV])
					.duration(200)
					.blastFurnaceTemp(800)
				if (loadedAddons.thetornproductionline) {
					//液态天机
					gtr.chaotic_alchemy('kirin:celestial_secret')
						.itemInputs(
							'64x thetornproductionline:celestial_secret_deducing_module_uev',
							'64x thetornproductionline:celestial_secret_deducing_module_uiv',
							'64x thetornproductionline:celestial_secret_deducing_module_uxv'
						)
						.outputFluids('gtceu:celestial_secret 327680')
						.EUt(GTValues.VA[GTValues.MAX])
						.duration(1000)
					//液态撕裂
					gtr.chaotic_alchemy('kirin:tear')
						.itemInputs(
							'64x thetornproductionline:fission_reactor_module',
							'64x thetornproductionline:fusion_process_module',
							'thetornproductionline:neutron_activator_module'
						)
						.outputFluids('gtceu:tear 327680')
						.EUt(GTValues.VA[GTValues.MAX])
						.duration(1000)
				}
				//觉醒龙混沌炼金
				gtr.chaotic_alchemy('kirin:easier_draconiumawakened_plasma')
					.itemInputs('kubejs:quantum_chromodynamic_charge')
					.inputFluids('gtceu:draconium 1000')
					.outputFluids('gtceu:draconiumawakened 1000')
					.blastFurnaceTemp(800)
					.duration(100)
					.EUt(GTValues.VA[GTValues.MAX])

				//龙脉结晶结晶龙尘
				gtr.leyline_crystallize('kirin:draconium_dust')
					.circuit(24)
					.notConsumable('64x kubejs:draconium_block_charged')
					.itemInputs('85x minecraft:glowstone_dust', '10x gtceu:gold_dust', '5x minecraft:redstone')
					.notConsumable('48x minecraft:dragon_egg')
					.itemInputs('10x gtceu:ender_pearl_dust', '1728x ae2:matter_ball', '20x minecraft:obsidian')
					.itemOutputs('2700x kubejs:draconium_dust')
					.EUt(GTValues.VA[GTValues.UXV] * 20)
					.duration(2000)
			}

			//宇宙精华简化
			gtr.incubator('kirin:space_essence')
				.notConsumable('minecraft:cow_spawn_egg')
				.notConsumable('gtceu:large_void_miner')
				.itemInputs('kubejs:essence', 'gtceu:tiny_nether_star_dust', 'ae2:sky_dust')
				.inputFluids('gtceu:sterilized_growth_medium 100', 'gtceu:biomass 200')
				.itemOutputs('kubejs:space_essence')
				.EUt(GTValues.VA[GTValues.IV])
				.duration(1600)

			//龙蛋复制反循环
			gtr.dragon_egg_copier('kirin:dragon_egg')
				.notConsumable('minecraft:dragon_egg')
				.inputFluids('gtceu:biohmediumsterilized 100')
				.chancedOutput('minecraft:dragon_egg', 2000, 1000)
				.EUt(GTValues.VA[GTValues.ZPM])
				.duration(200)

			//部件装配线组装无线覆盖版
			let kirin_wireless_tiers = [
				[1, 'lv', 'steel', 'tin', 'gtceu:tin_spring', '192x gtceu:inductor'],
				[2, 'mv', 'aluminium', 'copper', 'gtceu:ulpic_chip', '384x gtceu:inductor'],
				[3, 'hv', 'stainless_steel', 'gold', 'gtceu:lpic_chip', '192x gtceu:smd_inductor'],
				[4, 'ev', 'titanium', 'aluminium', 'gtceu:mpic_chip', '384x gtceu:smd_inductor'],
				[5, 'iv', 'tungsten_steel', 'platinum', 'gtceu:hpic_chip', '192x gtceu:advanced_smd_inductor'],
				[6, 'luv', 'rhodium_plated_palladium', 'niobium_titanium', 'gtceu:hpic_chip', '384x gtceu:advanced_smd_inductor'],
				[7, 'zpm', 'naquadah_alloy', 'vanadium_gallium', 'gtceu:uhpic_chip', '768x gtceu:advanced_smd_inductor'],
				[8, 'uv', 'darmstadtium', 'yttrium_barium_cuprate', 'gtceu:uhpic_chip', '1536x gtceu:advanced_smd_inductor'],
				[9, 'uhv', 'neutronium', 'europium', 'kubejs:nm_chip', '384x kubejs:smd_inductor_bioware'],
				[10, 'uev', 'quantanium', 'mithril', 'kubejs:nm_chip', '384x kubejs:smd_inductor_optical'],
				[11, 'uiv', 'adamantium', 'neutronium', 'kubejs:pm_chip', '384x kubejs:smd_inductor_exotic'],
				[12, 'uxv', 'vibranium', 'taranium', 'kubejs:pm_chip', '384x kubejs:smd_inductor_cosmic'],
				[13, 'opv', 'draconium', 'crystalmatrix', 'kubejs:fm_chip', '384x kubejs:smd_inductor_supracausal'],
				[14, 'max', 'chaos', 'cosmicneutronium', 'kubejs:fm_chip', '384x gtceu:shirabon_foil'],
			]
			kirin_wireless_tiers.forEach((tier) => {
				let soldering =
					tier[0] < 9 ?
					'gtceu:soldering_alloy 6912' :
					tier[0] < 12 ?
					'gtceu:mutated_living_solder 6912' :
					'gtceu:super_mutated_living_solder 6912'
				let voltageCoilFrom = tier[0] < 9 ? 'gtceu' : 'kubejs'
				let voltageComponentFrom = tier[0] < 14 ? 'gtceu' : 'gtlcore'
				let voltage4ACoilFrom = tier[0] < 9 ? tier[3] : 'niobium_titanium'
				gtr.component_assembly_line(`kirin:${tier[1]}_wireless_energy_receive_cover`)
					.itemInputs(
						`48x ${voltageComponentFrom}:${tier[1]}_sensor`,
						`48x ${voltageComponentFrom}:${tier[1]}_emitter`,
						'96x #gtceu:circuits/' + tier[1],
						`48x ${voltageCoilFrom}:${tier[1]}_voltage_coil`,
						`48x ${tier[4]}`,
						`6x gtceu:${tier[3]}_hex_cable`,
						'6x gtceu:red_alloy_hex_cable'
					)
					.inputFluids(soldering, `gtceu:${tier[2]} 20736`, 'gtceu:ender_pearl 6912')
					.itemOutputs(`64x gtmthings:${tier[1]}_wireless_energy_receive_cover`)
					.addData('CATier', tier[0])
					.EUt(GTValues.VA[tier[0]])
					.duration(200)
				gtr.component_assembly_line(`gtmthings:${tier[1]}_4a_wireless_energy_receive_cover`)
					.itemInputs(
						`96x gtmthings:${tier[1]}_wireless_energy_receive_cover`,
						tier[5],
						`48x gtceu:${voltage4ACoilFrom}_hex_cable`,
						`96x ${voltageCoilFrom}:${tier[1]}_voltage_coil`
					)
					.inputFluids(soldering, 'gtceu:battery_alloy 55296')
					.itemOutputs(`64x gtmthings:${tier[1]}_4a_wireless_energy_receive_cover`)
					.addData('CATier', tier[0])
					.EUt(GTValues.VA[tier[0]])
					.duration(200)
			})

			//部件装配线组装太阳能
			//劣级太阳能
			gtr.component_assembly_line('kirin:solar_panel')
				.itemInputs('96x gtceu:carbon_fibers', '96x gtceu:silicon_wafer', '96x #gtceu:circuits/lv', '16x minecraft:glass')
				.itemOutputs('64x gtceu:solar_panel')
				.addData('CATier', 0)
				.EUt(GTValues.VA[GTValues.ULV])
				.duration(80)
			//ulv
			gtr.component_assembly_line('kirin:ulv_solar_panel')
				.itemInputs(
					'96x gtceu:gallium_arsenide_plate',
					'96x gtceu:phosphorus_wafer',
					'96x #gtceu:circuits/hv',
					'16x minecraft:glass',
					'12x gtceu:graphene_hex_wire'
				)
				.itemOutputs('64x gtceu:ulv_solar_panel')
				.addData('CATier', 0)
				.EUt(GTValues.V[GTValues.ULV])
				.duration(80)
			//lv
			gtr.component_assembly_line('kirin:lv_solar_panel')
				.itemInputs(
					'96x gtceu:indium_gallium_phosphide_plate',
					'96x gtceu:naquadah_wafer',
					'96x #gtceu:circuits/luv',
					'48x gtceu:tempered_glass',
					'48x gtceu:graphene_hex_wire'
				)
				.itemOutputs('64x gtceu:lv_solar_panel')
				.addData('CATier', 1)
				.EUt(GTValues.VA[GTValues.LV])
				.duration(80)
			//mv
			gtr.component_assembly_line('kirin:mv_solar_panel')
				.itemInputs(
					'96x gtceu:double_indium_gallium_phosphide_plate',
					'96x gtceu:neutronium_wafer',
					'96x #gtceu:circuits/uv',
					'48x gtceu:laminated_glass',
					'12x gtceu:mithril_hex_wire'
				)
				.itemOutputs('64x gtceu:mv_solar_panel')
				.addData('CATier', 2)
				.EUt(GTValues.VA[GTValues.MV])
				.duration(80)
			//hv
			gtr.component_assembly_line('kirin:hv_solar_panel')
				.itemInputs(
					'96x gtceu:double_germaniumtungstennitride_plate',
					'96x kubejs:rutherfordium_neutronium_wafer',
					'96x #gtceu:circuits/uev',
					'48x gtceu:laminated_glass',
					'48x gtceu:mithril_hex_wire'
				)
				.itemOutputs('64x gtceu:hv_solar_panel')
				.addData('CATier', 3)
				.EUt(GTValues.VA[GTValues.HV])
				.duration(80)
			//ev
			gtr.component_assembly_line('kirin:ev_solar_panel')
				.itemInputs(
					'96x gtceu:double_uruium_plate',
					'96x kubejs:taranium_wafer',
					'96x #gtceu:circuits/uxv',
					'48x gtceu:laminated_glass',
					'12x gtceu:taranium_hex_wire'
				)
				.itemOutputs('64x gtceu:ev_solar_panel')
				.addData('CATier', 4)
				.EUt(GTValues.VA[GTValues.EV])
				.duration(80)
			//iv
			gtr.component_assembly_line('kirin:iv_solar_panel')
				.itemInputs(
					'96x gtceu:double_oganesson_plate',
					'96x kubejs:pm_wafer',
					'96x #gtceu:circuits/max',
					'48x gtceu:fusion_glass',
					'48x gtceu:taranium_hex_wire'
				)
				.itemOutputs('64x gtceu:iv_solar_panel')
				.addData('CATier', 5)
				.EUt(GTValues.VA[GTValues.IV])
				.duration(80)
			//luv
			gtr.component_assembly_line('kirin:luv_solar_panel')
				.itemInputs(
					'192x kubejs:pm_wafer',
					'1024x gtceu:lv_solar_panel',
					'48x gtceu:cosmicneutronium_hex_wire',
					'192x gtceu:fusion_glass',
					'192x gtceu:double_hastelloyk_243_plate'
				)
				.itemOutputs('64x gtceu:luv_solar_panel')
				.inputFluids('gtceu:mutated_living_solder 27648')
				.addData('CATier', 6)
				.EUt(GTValues.VA[GTValues.LuV])
				.duration(1200)
			//zpm
			gtr.component_assembly_line('kirin:zpm_solar_panel')
				.itemInputs(
					'192x kubejs:fm_wafer',
					'1024x gtceu:ev_solar_panel',
					'96x gtceu:cosmicneutronium_hex_wire',
					'768x gtceu:fusion_glass',
					'768x gtceu:double_vibranium_plate'
				)
				.itemOutputs('64x gtceu:zpm_solar_panel')
				.inputFluids('gtceu:mutated_living_solder 62208')
				.addData('CATier', 7)
				.EUt(GTValues.VA[GTValues.ZPM])
				.duration(1200)
			//uv
			gtr.component_assembly_line('kirin:uv_solar_panel')
				.itemInputs(
					'768x kubejs:fm_wafer',
					'4096x gtceu:iv_solar_panel',
					'96x gtceu:infinity_hex_wire',
					'768x gtceu:fusion_glass',
					'3072x gtceu:double_neutronium_plate'
				)
				.itemOutputs('64x gtceu:uv_solar_panel')
				.inputFluids('gtceu:super_mutated_living_solder 27648')
				.addData('CATier', 8)
				.EUt(GTValues.VA[GTValues.UV])
				.duration(1200)

			//高利用率的稀土氯化物搅拌
			gtr.mixer('kirin:rare_earth_chlorides')
				.itemInputs('64x gtceu:monazite_dust', '288x gtceu:samarium_refined_powder_dust', '360x gtceu:cerium_rich_mixture_powder_dust')
				.inputFluids('gtceu:hydrochloric_acid 1440000')
				.outputFluids('gtceu:rare_earth_chlorides 1440000')
				.EUt(GTValues.VA[GTValues.LuV])
				.duration(32768)

			//创罐直接出所有流体
			//作者的吐槽:ME无限流体盘能标记物品简直是世界上最伟大的发明,撕裂的创罐配方一个个换又太繁琐,因此才有这个配方
			//我们至今难以知道AE作者为什么要分这俩盘出来
			//顶级智斗
			gtr.chemical_bath('kirin:creative_tank_to_all_fluids')
				.notConsumable('gtceu:creative_tank')
				.circuit(24)
				.outputFluids(allFluids)
				.EUt(1)
				.duration(1145)


			//艾萨线直接出稀土金属粉
			gtr.vacuum_drying('kirin:monazite_front_plas')
				.notConsumable('gtceu:rare_earth_centrifugal')
				.inputFluids(`gtceu:monazite_front ${4000 * Multiple.isaMultiple}`)
				.itemOutputs(
					`${Multiple.isaMultiple * 64}x gtceu:rare_earth_metal_dust`,
					`${Multiple.isaMultiple * 64}x gtceu:rare_earth_metal_dust`,
					`${Multiple.isaMultiple * 64}x gtceu:rare_earth_metal_dust`,
					`${Multiple.isaMultiple * 64}x gtceu:rare_earth_metal_dust`,
					`${Multiple.isaMultiple * 64}x gtceu:rare_earth_metal_dust`,
					`${Multiple.isaMultiple * 64}x gtceu:rare_earth_metal_dust`
				)
				.outputFluids(
					`gtceu:enriched_rare_earth_chloride_solution ${64000 * Multiple.isaMultiple}`,
					`gtceu:diluted_rare_earth_chloride_solution ${64000 * Multiple.isaMultiple}`
				)
				.EUt(GTValues.VA[GTValues.ZPM])
				.duration(200 * Multiple.isaMultiple)
				.blastFurnaceTemp(800)
			if (loadedAddons.thetornproductionline) {
				//创造主机后期配方
				gtr.assembly_line('kirin:suprachronal_mainframe_complex')
					.itemInputs(
						'2x gtceu:eternity_frame',
						'kubejs:chaotic_core',
						'1024x thetornproductionline:celestial_secret_deducing_module_iv',
						'1024x thetornproductionline:celestial_secret_deducing_module_luv',
						'1024x thetornproductionline:celestial_secret_deducing_module_zpm',
						'1024x thetornproductionline:celestial_secret_deducing_module_uv',
						'1024x thetornproductionline:celestial_secret_deducing_module_uhv',
						'1024x thetornproductionline:celestial_secret_deducing_module_uev',
						'1024x thetornproductionline:celestial_secret_deducing_module_uiv',
						'1024x thetornproductionline:celestial_secret_deducing_module_uxv',
						'1024x thetornproductionline:celestial_secret_deducing_module_opv',
						'1024x thetornproductionline:celestial_secret_deducing_module_max',
						'kubejs:eternity_catalyst',
						'16x kubejs:nuclear_star',
						'16x gtceu:eternity_foil',
						'4x gtceu:eternity_plate'
					)
					.itemOutputs('kubejs:suprachronal_mainframe_complex')
					.inputFluids(
						'gtceu:infinity 1000',
						'gtceu:spacetime 1000',
						'gtceu:eternity 1000',
						'gtceu:magnetohydrodynamicallyconstrainedstarmatter 1000'
					)
					.EUt(64 * GTValues.VA[GTValues.MAX])
					.duration(8000)
					.stationResearch((b) =>
						b
						.researchStack(Registries.getItemStack('kubejs:suprachronal_max'))
						.dataStack(Registries.getItemStack('gtceu:data_module'))
						.EUt(GTValues.VA[GTValues.MAX])
						.CWUt(8192)
					)
			}
			//铝矿、钕矿直接烧成粉
			event.smelting('2x gtceu:aluminium_dust', 'gtceu:raw_aluminium')
			event.smelting('2x gtceu:neodymium_dust', 'gtceu:raw_neodymium')
			event.smelting('4x gtceu:neodymium_dust', Ingredient.of('#forge:ores/neodymium'))
			event.smelting('4x gtceu:aluminium_dust', Ingredient.of('#forge:ores/aluminium'))

		}
	})
})();
