//Version:2.1.1
;(function () {
    'use strict'
    const KIRIN_CONFIG = JsonIO.read('kubejs/config/kirin.json')
    const kirinClientTooltip = KIRIN_CONFIG?.enableClientTooltip ?? false

    const TooltipHelper = Java.loadClass('com.gregtechceu.gtceu.client.util.TooltipHelper')
    const RAINBOW_FAST = TooltipHelper.RAINBOW_FAST
    const RAINBOW = TooltipHelper.RAINBOW
    const RAINBOW_SLOW = TooltipHelper.RAINBOW_SLOW
    const BLINK_CYAN = TooltipHelper.BLINKING_CYAN
    const BLINK_RED = TooltipHelper.BLINKING_RED
    const BLINK_ORANGE = TooltipHelper.BLINKING_ORANGE
    const BLINK_GRAY = TooltipHelper.BLINKING_GRAY

    // 其它私货是否加载
    const loadedAddons = {
        thetornproductionline: !Ingredient.of('thetornproductionline:circult_process_module_1').isEmpty(),
        gtladd: Platform.isLoaded('gtladditions'),
        gtladd3: !Ingredient.of('gtladditions:vientiane_transcription_node').isEmpty(),
        dist_savior: !Ingredient.of('disksavior:steam_1').isEmpty(),
    }

    function dynamicComponent(text, code) {
        return Text.literal(code.toString() + text)
    }
    function rainbowComponent(text, speed) {
        if (!speed) speed = 'normal'
        let code
        switch (speed) {
            case 'fast': code = RAINBOW_FAST; break
            case 'slow': code = RAINBOW_SLOW; break
            default: code = RAINBOW
        }
        return dynamicComponent(text, code)
    }
    function blinkComponent(text, color) {
        if (!color) color = 'cyan'
        let code
        switch (color) {
            case 'red': code = BLINK_RED; break
            case 'orange': code = BLINK_ORANGE; break
            case 'gray': code = BLINK_GRAY; break
            default: code = BLINK_CYAN
        }
        return dynamicComponent(text, code)
    }
    function autoTierColor(tier) {
        const tierMap = {
            ulv: () => Text.darkGray('ULV'), lv: () => Text.gray('LV'), mv: () => Text.aqua('MV'),
            hv: () => Text.gold('HV'), ev: () => Text.darkPurple('EV'), iv: () => Text.blue('IV'),
            luv: () => Text.lightPurple('LuV'), zpm: () => Text.red('ZPM'), uv: () => Text.darkAqua('UV'),
            uhv: () => Text.darkRed('UHV'), uev: () => Text.green('UEV'), uiv: () => Text.darkGreen('UIV'),
            uxv: () => Text.yellow('UXV'), opv: () => Text.blue('OpV'), max: () => Text.red('MAX'),
        }
        const func = tierMap[tier.toLowerCase()]
        return func ? func() : undefined
    }

    const maxParallelMap = { iv: 64, luv: 256, zpm: 1024, uv: 4096, uhv: 16384, uev: 65536, uiv: 262144, uxv: 1048576, opv: 4194304, max: 16777216 }
    const autoConfigurationParallelHatchList = [
        'gtceu:auto_configuration_maintenance_hatch', 'gtceu:cleaning_configuration_maintenance_hatch',
        'gtceu:sterile_configuration_cleaning_maintenance_hatch', 'gtceu:law_configuration_cleaning_maintenance_hatch',
        'gtceu:cleaning_gravity_configuration_maintenance_hatch', 'gtceu:sterile_cleaning_gravity_configuration_maintenance_hatch',
        'gtceu:law_cleaning_gravity_configuration_maintenance_hatch', 'gtceu:gravity_configuration_hatch'
    ]

    // 顺手的事
    JEIEvents.removeCategories((event) => {
        if (Platform.isLoaded('jumbofurnace')) event.remove('jumbofurnace:jumbo_smelting')
    })

    if (KIRIN_CONFIG) {
        // JEI subtypes
        JEIEvents.subtypes((event) => {
            event.useNBT('expatternprovider:infinity_cell')
            event.useNBT('gtladditions:thread_modifier_hatch')
        })

        // JEI 添加物品
        JEIEvents.addItems((event) => {
            // 无限元件列表
            const infinityCellToAdd = [
                { type: 'f', id: 'gtceu:raw_growth_medium' }, { type: 'f', id: 'gtceu:sterilized_growth_medium' },
                { type: 'f', id: 'gtceu:biohmediumsterilized' }, { type: 'f', id: 'gtceu:raw_star_matter_plasma' },
                { type: 'f', id: 'gtceu:milk' }, { type: 'i', id: 'kubejs:leptonic_charge' },
                { type: 'i', id: 'kubejs:quantumchromodynamic_protective_plating' }, { type: 'i', id: 'kubejs:glacio_spirit' },
                { type: 'i', id: 'minecraft:charcoal' }
            ]
            infinityCellToAdd.forEach((element) => {
                event.add(Item.of('expatternprovider:infinity_cell', `{record:{"#c":"ae2:${element.type}",id:"${element.id}"}}`))
            })
            // 无限编程电路元件包
            let size = 33
            let amtsList = Array(size).fill('1L').join(',')
            let keysList = []
            for (let i = 0; i < size; i++) {
                keysList.push(`{"#c":"ae2:i",id:"expatternprovider:infinity_cell",tag:{record:{"#c":"ae2:i",id:"gtceu:programmed_circuit",tag:{Configuration:${i}}}}}`)
            }
            let nbtString = `{RepairCost:0,amts:[L;${amtsList}],display:{Name:'{"text":"§rInfinitely Programmable Circuit Component Package"}'},ic:${size}L,internalCurrentPower:20000.0d,keys:[${keysList.join(',')}]}`
            event.add(Item.of('ae2:portable_item_cell_16k', nbtString))
            // 超级天球
            event.add(Item.of('gtladditions:thread_modifier_hatch', '{BlockEntityTag:{astralArrayInventory:{Items:[{Count:127b,Slot:0,id:"gtladditions:astral_array"}]}}}'))
        })

        // 客户端提示 (按 README 顺序)
        if (kirinClientTooltip) {
            ItemEvents.tooltip((event) => {
                // ============================== 修复板块 ==============================
                if (KIRIN_CONFIG.enableSafeFixes) {
                    // 并行控制仓 / 世界加速器
                    event.addAdvanced(Ingredient.of(/gtceu:.*_parallel_hatch/).or(/gtceu:.*_world_accelerator/), (item, advanced, text) => {
                        if (!item.nbt) {
                            text.add(Text.green('▌Kirin\'s changes -- repair section'))
                            text.add(Text.green('✨Can be made using an assembly machine, saving a lot of bytes!'))
                        } else {
                            let currentParallel = item.nbt?.BlockEntityTag?.currentParallel
                            let tier = item.id.toString().split(':')[1].split('_')[0]
                            text.clear()
                            const maxAllowed = maxParallelMap[tier]
                            if (loadedAddons.thetornproductionline) {
                                if (currentParallel === maxAllowed * 4) text.add(Text.of('One layer of compression').append(autoTierColor(tier)).append(Text.white('Parallel control bin')))
                                else if (currentParallel === maxAllowed * 16) text.add(Text.of('Double compression').append(autoTierColor(tier)).append(Text.white('Parallel control bin')))
                                else if (currentParallel === maxAllowed * 64) text.add(Text.of('triple compression').append(autoTierColor(tier)).append(Text.white('Parallel control bin')))
                                else text.add(autoTierColor(tier).append(Text.white('Parallel control bin')))
                            } else {
                                text.add(autoTierColor(tier).append(Text.white('Parallel control bin')))
                            }
                            text.add(Text.of('Allow simultaneous processing of up to').append(Text.red(currentParallel.toString()).bold()).append(Text.of('A recipe.')))
                            text.add(rainbowComponent('Modified by GregTech Leisure'))
                            text.add(Text.darkGray(item.getId()))
                            text.add(Text.green('▌Kirin\'s changes -- repair section'))
                            text.add(Text.red('✨The number of parallels in this parallel control bin exceeds the upper limit!'))
                            text.add(Text.green('✨Now automatically prevents opening of parallel control bins that exceed the parallel limit!'))
                            text.add(Text.green('✨The parallel number will also be saved when destroying'))
                            text.add(Text.gray('No more fear of parallel numbers being washed away!'))
                        }
                    })
                    // 太空电梯
                    event.addAdvanced('gtceu:space_elevator', (item, advanced, text) => {
                        text.add(Text.green('▌Kirin\'s changes -- repair section'))
                        text.add(Text.green('✨Entering circuit No. 2 can cancel the computing power requirement, which is suitable for use when there is a problem with the switch!'))
                        text.add(Text.gray('There are really many bugs in computing power...'))
                    })
                    // 火箭
                    event.addAdvanced(Ingredient.of(/ad_astra:tier_.*_rocket/).or(/ad_astra_rocketed:tier_(?!7_)[^_]+_rocket/), (item, advanced, text) => {
                        text.add(Text.green('▌Kirin\'s changes -- repair section'))
                        text.add(Text.green('✨It can be made directly in the assembly machine, no need to manually synthesize it on the NASA workbench!'))
                    })
                    // 巴纳德C空气
                    event.addAdvanced(['gtlcore:world_fragments_barnarda', 'gtladditions:quantum_syphon_matrix', 'gtceu:barnarda_air_bucket'], (item, advanced, text) => {
                        text.add(Text.green('▌Kirin\'s changes -- repair section'))
                        text.add(Text.green('✨Barnard C air can now be extracted directly from within the Quantum Siphon Matrix!'))
                    })
                    // 铁锭 -> 锻铁锭
                    event.addAdvanced(['minecraft:iron_ingot', 'gtceu:wrought_iron_ingot'], (item, advanced, text) => {
                        text.add(Text.green('▌Kirin\'s changes -- repair section'))
                        text.add(Text.green('✨Iron ingots can now be directly smelted into wrought iron ingots, no more dismantling required!'))
                    })
                    // 无用宝石筛选
                    event.addAdvanced('gtceu:large_sifting_funnel', (item, advanced, text) => {
                        text.add(Text.green('▌Kirin\'s changes -- repair section'))
                        text.add(Text.green('✨Some useless gems (such as monazite) have had their filterable labels removed!'))
                        text.add(Text.gray('There will no longer be a situation where a pile of exquisite monazite comes out of the mine.'))
                    })
                    // 无限编程电路
                    event.addAdvanced('gtceu:programmed_circuit', (item, advanced, text) => {
                        text.add(Text.green('▌Kirin\'s changes -- repair section'))
                        text.add(Text.green('✨You can directly create unlimited programming circuit component packages, no need to synthesize wireless programming circuit components one by one!'))
                    })
                    // 预制维护仓
                    event.addAdvanced(autoConfigurationParallelHatchList, (item, advanced, text) => {
                        text.add(Text.green('▌Kirin\'s changes -- repair section'))
                        if (item.nbt) {
                            let durationMultiplier = item.nbt?.BlockEntityTag?.durationMultiplier.toFixed(2).toString()
                            text.add(Text.green('This is a premade multiple of').append(Text.gold(durationMultiplier).append(Text.green('Prefabricated maintenance warehouse!'))))
                        } else {
                            text.add(Text.green('✨You can make prefabricated multiplier maintenance warehouses in the synthesis bar or assembly machine, eliminating the trouble of manual adjustment!'))
                            text.add(Text.green('✨What is synthesized in the synthesis column is the lower limit; circuit No. 2 of the assembly machine is the lower limit, and circuit No. 10 is the upper limit.'))
                        }
                    })
                }

                // ============================== 一般板块 ==============================
                if (KIRIN_CONFIG.enableSignificantBalanceChanges) {
                    // 超级天球 (add)
                    if (loadedAddons.gtladd) {
                        event.addAdvanced('gtladditions:thread_modifier_hatch', (item, advanced, text) => {
                            if (item.nbt && item.nbt.toString().includes('astralArrayInventory')) {
                                text.add(Text.gold('▌Kirin’s changes -- General section:'))
                                text.add(Text.gold('✨The method of compressing 127 star arrays into one celestial sphere was collected from infinite possibilities by the masters of the Olympian Star Chart.'))
                                text.add(Text.gray('No need for careful placement...'))
                            }
                        })
                    }

                    // ----- ULV 超低压 -----
                    event.addAdvanced('gtceu:primitive_pump', (item, advanced, text) => {
                        text.add(Text.gold('▌Kirin’s changes -- General section:'))
                        text.add(Text.gold('✨Now you can craft unlimited water coverage panels directly using the original water pump and its multi-block components!'))
                    })
                    event.addAdvanced('gtceu:infinite_water_cover', (item, advanced, text) => {
                        text.add(Text.gold('▌Kirin’s changes -- General section:'))
                        text.add(Text.gold('✨Can be made directly from the original water pump and its components!'))
                        text.add(Text.gray('Actual efficiency depends on covered vessels, can directly fill a single fluid tank except for a few vessels'))
                        text.add(Text.gray('Can be directly attached to a single block steam boiler'))
                    })
                    event.addAdvanced('ae2:portable_item_cell_256k', (item, advanced, text) => {
                        text.add(Text.gold('▌Kirin’s changes -- General section:'))
                        text.add(Text.gold('✨You can synthesize 16 16k components directly in the workbench! Make various unlimited components directly!'))
                    })
                    event.addAdvanced(Ingredient.of(/(gtmthings|gtceu|gtlcore):.*terminal/), (item, advanced, text) => {
                        text.add(Text.gold('▌Kirin’s changes -- General section:'))
                        text.add(Text.gold('✨The white terminal can be directly synthesized into the ultimate terminal!'))
                    })
                    event.addAdvanced(Ingredient.of(/gtceu:.*_rotor/), (item, advanced, text) => {
                        if (item.id.includes('turbine') || item.id.includes('holder')) return
                        text.add(Text.gold('▌Kirin’s changes -- General section:'))
                        text.add(Text.gold('✨You can directly use a hammer + 8 ingots to synthesize the corresponding rotor, reducing the tediousness of hand rubbing!'))
                    })


                    // ----- LV 低压 -----
                    event.addAdvanced('gtceu:large_steam_input_hatch', (item, advanced, text) => {
                        text.add(Text.gold('▌Kirin’s changes -- General section:'))
                        text.add(Text.gold('✨The assembly machine recipe is cheaper! Stage reduced').append(autoTierColor('lv')))
                    })
                    event.addAdvanced('gtceu:advanced_energy_detector_cover', (item, advanced, text) => {
                        text.add(Text.gold('▌Kirin’s changes -- General section:'))
                        text.add(Text.gold('✨Stage reduced to').append(autoTierColor('lv')))
                    })

                    // ----- MV 中压 -----
                    event.addAdvanced('gtlcore:multi_functional_casing', (item, advanced, text) => {
                        text.add(Text.gold('▌Kirin’s changes -- General section:'))
                        text.add(Text.gold('✨The assembly machine recipe is cheaper!'))
                    })
                    event.addAdvanced('gtceu:mv_distillery', (item, advanced, text) => {
                        text.add(Text.gold('▌Kirin’s changes -- General section:'))
                        text.add(Text.gold('✨Circuit No. 24 can directly distill heavy oil into ethylene in one step!'))
                        text.add(Text.red('⚠️The loss is huge and the conversion rate is only 7%!'))
                    })
                    event.addAdvanced('expatternprovider:infinity_cell', (item, advanced, text) => {
                        if (item.nbt == '{record:{"#c":"ae2:f",id:"minecraft:water"}}') {
                            text.add(Text.gold('▌Kirin’s changes -- General section:'))
                            text.add(Text.gold('✨Can be electrolyzed together with potassium powder in an electrolyzer to passively produce gaseous hydrogen and gaseous oxygen!'))
                            text.add(Text.gold('✨The efficiency is almost the same as that of potassium hydroxide electrolysis cycle, and it comes with 256 times batch processing!'))
                        }
                    })

                    // ----- HV 高压 -----
                    event.addAdvanced('gtceu:nitric_acid_bucket', (item, advanced, text) => {
                        text.add(Text.gold('▌Kirin’s changes -- General section:'))
                        text.add(Text.gold('✨Dahua Anti-No. 5 circuit can be directly synthesized by molecular reconstruction, or can be synthesized directly with water and nitrogen!'))
                    })
                    if (!loadedAddons.dist_savior) {
                        event.addAdvanced('gtceu:distilled_water_bucket', (item, advanced, text) => {
                            text.add(Text.gold('▌Kirin’s changes -- General section:'))
                            text.add(Text.gold('✨Steam vacuum frozen distilled water!'))
                        })
                    }
                    event.addAdvanced(['gtceu:raw_aluminium', 'gtceu:raw_neodymium', '#forge:ores/neodymium', '#forge:ores/aluminium'], (item, advanced, text) => {
                        text.add(Text.gold('▌Kirin’s changes -- General section:'))
                        text.add(Text.gold('✨Can be burned directly into powder in the furnace!'))
                    })
                    event.addAdvanced('gtceu:salt_dust', (item, advanced, text) => {
                        text.add(Text.gold('▌Kirin’s changes -- General section:'))
                        text.add(Text.gold('✨Can react with water directly in the chemical reaction to obtain hydrochloric acid and sodium hydroxide!'))
                        text.add(Text.gray('There is a formula for potassium chloride combined with hydrochloric acid and potassium hydroxide, you can’t blame me)'))
                    })

                    // ----- EV 超高压 -----
                    event.addAdvanced('gtceu:impure_uraninite_dust', (item, advanced, text) => {
                        text.add(Text.gold('▌Kirin’s changes -- General section:'))
                        text.add(Text.gold('✨Dahua Anti-No. 23 circuit can be processed in one step!'))
                    })

                    // ----- IV 强导压 -----
                    event.addAdvanced('gtceu:fission_reactor', (item, advanced, text) => {
                        text.add(Text.gold('▌Kirin’s changes -- General section:'))
                        text.add(Text.gold('✨Input circuit No. 3 and thorium powder to perform controllable nuclear fission without heating up or consuming electricity.'))
                    })
                    event.addAdvanced('gtceu:indium_dust', (item, advanced, text) => {
                        text.add(Text.gold('▌Kirin’s changes -- General section:'))
                        text.add(Text.gold('✨Single-step indium ore powder version!'))
                    })
                    event.addAdvanced(Ingredient.of(/^gtceu:(small_|tiny_)?rare_earth_dust$/), (item, advanced, text) => {
                        text.add(Text.gold('▌Kirin’s changes -- General section:'))
                        text.add(Text.gold('✨Monazite, samarium essence, cerium-rich mixture and hydrochloric acid can now be mixed in the mixer to obtain a large amount of rare earth chloride!'))
                        text.add(Text.gray('It’s like there’s a twist built into it'))
                    })

                    // ----- LuV 剧差压 -----
                    event.addAdvanced('gtceu:raw_crystal_chip', (item, advanced, text) => {
                        text.add(Text.gold('▌Kirin’s changes -- General section:'))
                        text.add(Text.gold('✨You can use a crystal component raw material as a catalyst and input 144mb ​​of liquid europium for reverse circulation growth.'))
                    })
                    event.addAdvanced('ad_astra:glacian_ram_spawn_egg', (item, advanced, text) => {
                        text.add(Text.gold('▌Kirin’s changes -- General section:'))
                        text.add(Text.gold('✨The stage is coming').append(autoTierColor('zpm')))
                        text.add(Text.gray('really expensive...'))
                        if (loadedAddons.gtladd)
                            text.add(Text.gold('✨at').append(autoTierColor('max')).append(Text.gold('stage, you can directly produce corresponding infinite components!')))
                    })
                    if (loadedAddons.thetornproductionline) {
                        event.addAdvanced(Ingredient.of(/gtceu:(?!compressed_)[^_]+_fusion_reactor/).or('thetornproductionline:fusion_process_module'), (item, advanced, text) => {
                            text.add(Text.gold('▌Kirin’s changes -- General section:'))
                            text.add(Text.gold('✨You can use the alloy smelting furnace to perform fusion operations!'))
                            text.add(Text.gold('✨The alloy smelting furnace has overclocking, which is much stronger than the small fusion reactor!'))
                            text.add(Text.red('⚠️For balance, using an alloy smelting furnace to execute fusion recipes will have a time penalty of 4 times (only Fusion I)/16 times the time!'))
                        })
                    }
                    // 艾萨全套加强
                    event.addAdvanced(['gtceu:isa_mill', 'gtceu:flotation_cell_regulator', 'gtceu:vacuum_drying_furnace'], (item, advanced, text) => {
                        text.add(Text.gold('▌Kirin’s changes -- General section:'))
                        text.add(Text.gold('✨Remember the Aisa three-piece set? They got a huge buff!'))
                        text.add(Text.gold('✨The overall time consumption is greatly reduced! It feels like flying!'))
                        text.add(Text.gold('✨All recipe voltages (except dry rare earth metal powder) are reduced to EV, obtaining 256 times batch processing!'))
                        text.add(Text.darkGreen('✨No more distilled water required for the ISA Grinder!'))
                        text.add(Text.yellow('✨The sodium/potassium ethyl xanthate needed by the industrial flotation machine is replaced with the corresponding elemental powder, and the pine oil is replaced with crude oil, and the output is quadrupled!'))
                        text.add(Text.darkRed('✨The vacuum drying furnace no longer needs to switch circuits frequently, the coil temperature is changed to white copper, and it can also be inserted into a rare earth centrifuge to directly produce rare earth metal powder!'))
                        text.add(Text.gray('Even if it is strengthened so much, it only strengthens Aisa from a distraction to an option...'))
                    })
                    event.addAdvanced('gtceu:rare_earth_metal_dust', (item, advanced, text) => {
                        text.add(Text.gold('▌Kirin’s changes -- General section:'))
                        text.add(Text.gold('✨Vacuum dried monazite foam directly produces rare earth metal powder!'))
                    })

                    // ----- ZPM 零点压 -----
                    if (!KIRIN_CONFIG.enableGameBreakingRecipes) { // 一般板块的重力控制仓，如果核爆未开启才显示
                        event.addAdvanced('gtceu:gravity_hatch', (item, advanced, text) => {
                            text.add(Text.gold('▌Kirin’s changes -- General section:'))
                            text.add(Text.gold('✨The assembly machine recipe is cheaper! Stage reduced').append(autoTierColor('zpm')))
                        })
                    }
                    event.addAdvanced(Ingredient.of(/gtceu:.*block_conversion_room/), (item, advanced, text) => {
                        text.add(Text.gold('▌Kirin’s changes -- General section:'))
                        text.add(Text.gold('✨You can directly use the *Model Assembly* to input the blocks to be converted for conversion!'))
                        text.add(Text.red('⚠️Because the block transformation room does not natively support the output bus, you must use a sample assembly with *self-contained output function* for output!'))
                        text.add(Text.gray('It seems that there is no need to build a large transformation room...'))
                    })
                    event.addAdvanced('gtmthings:zpm_2a_wireless_energy_input_hatch', (item, advanced, text) => {
                        text.add(Text.gold('▌Kirin’s changes -- General section:'))
                        text.add(Text.gold('✨A 16A LuV wireless energy warehouse can be compressed into a ZPM wireless energy warehouse, which can directly allow your Caijin coil flame blast furnace to burn europium powder into hot ingots!'))
                    })

                    // ----- UHV 极高压 -----
                    if (loadedAddons.thetornproductionline) {
                        event.addAdvanced(['gtceu:neutron_activator', 'thetornproductionline:neutron_activator_module'], (item, advanced, text) => {
                            text.add(Text.gold('▌Kirin’s changes -- General section:'))
                            text.add(Text.gold('✨The high-speed neutron activation module can provide 64x batch processing, 0.1x tick neutron demand, 0.5x total time-consuming multiple, and the minimum neutron demand is reduced to 1 for the neutron activator'))
                            text.add(Text.red('⚠️The high-speed neutron activation module cannot be used to accelerate silica processing and to process dragon eggs'))
                        })
                    }
                    event.addAdvanced('gtceu:charcoal_pile_igniter', (item, advanced, text) => {
                        text.add(Text.gold('▌Kirin’s changes -- General section:'))
                        text.add(Text.gold('✨The charcoal pile igniter can be combined with any infinite log component to synthesize unlimited charcoal components'))
                        text.add(Text.gray('The charcoal pile igniter has been strengthened, and hundreds of millions of Gray people must use charcoal pile igniters.'))
                    })

                    // ----- UEV 极超压 -----
                    event.addAdvanced('gtceu:aggregation_device', (item, advanced, text) => {
                        text.add(Text.gold('▌Kirin’s changes -- General section:'))
                        text.add(Text.gold('✨Circuit 24 removes the catalyst and has 64x batch processing'))
                        text.add(Text.gray('Despite this, it is still very slow due to the ULV input bus...'))
                    })
                    if (loadedAddons.gtladd) {
                        event.addAdvanced('gtladditions:antientropy_condensation_center', (item, advanced, text) => {
                            text.add(Text.gold('▌Kirin’s changes -- General section:'))
                            if (event.shift) {
                                text.add(Text.lightPurple('✨Can be cooled directly:'))
                                text.add(Text.lightPurple('Universe weaving plasma, crystal matrix plasma, chaotic matter plasma, awakening dragon plasma, degenerate rhenium plasma'))
                            } else {
                                text.add(Text.gold('✨Added 5 new exclusive recipes, press').append(Text.lightPurple('[shift]')).append(Text.gold('to view!')))
                            }
                            text.add(Text.gold('✨In addition, neutron spheres and cosmic neutrons can be cooled inside the spacer!'))
                        })
                    }
                    event.addAdvanced('kubejs:space_essence', (item, advanced, text) => {
                        text.add(Text.gold('▌Kirin’s changes -- General section:'))
                        text.add(Text.gold('✨You can use the recipe using Daxu Mining Wagyu spawn egg as a catalyst, no more ore is needed!'))
                    })

                    // ----- UIV 极巨压 -----
                    event.addAdvanced(['gtceu:aggregation_device', 'gtceu:dimensionally_transcendent_mixer'], (item, advanced, text) => {
                        if (item.id !== 'gtceu:aggregation_device') text.add(Text.gold('▌Kirin’s changes -- General section:'))
                        text.add(Text.gold('✨at').append(autoTierColor('uiv')).append('stage, you can use the Hyper Dimension Blender for the Aggregation Unit recipe'))
                        text.add(Text.red('⚠️For balance, using a hyper-dimensional blender to execute aggregation recipes will have a 16 times time penalty!'))
                    })
                    event.addAdvanced('gtceu:dyson_sphere', (item, advanced, text) => {
                        text.add(Text.gold('▌Kirin’s changes -- General section:'))
                        text.add(Text.gold('✨The Dyson Sphere has added three new power generation formulas, allowing you to enjoy large amounts of power generation without the need for a launch module!'))
                        text.add(Text.gold('✨Available').append(autoTierColor('opv')).append(Text.gold('!')))
                        if (loadedAddons.thetornproductionline) {
                            text.add(Text.gold('✨If you install the production line tearing, you can overclock it once additionally, and the power generation can reach up to 4194304A.').append(autoTierColor('max')).append(Text.gold('!')))
                        }
                        text.add(Text.gray('The Dyson ball has been strengthened, and hundreds of millions of Gray people must use Dyson'))
                    })
                    event.addAdvanced('gtceu:nan_certificate', (item, advanced, text) => {
                        text.add(Text.gold('▌Kirin’s changes -- General section:'))
                        text.add(Text.gold('✨You can use ultra-dimensional mixing to make multiple servings!'))
                        text.add(Text.gray('Proof that you are no longer a pig').strikethrough())
                    })
                    if (loadedAddons.gtladd) {
                        event.addAdvanced('gtceu:cosmicneutronium_bucket', (item, advanced, text) => {
                            text.add(Text.gold('▌Kirin’s changes -- General section:'))
                            text.add(Text.gold('✨Quantity-cooling cosmic neutrons and neutron spheres have been reduced in price, and the time has moved forward!'))
                        })
                    }

                    // ----- UXV 极顶压 -----
                    event.addAdvanced('gtceu:dragon_egg_copier', (item, advanced, text) => {
                        text.add(Text.gold('▌Kirin’s changes -- General section:'))
                        text.add(Text.gold('✨Dragon eggs can be used as catalysts and no longer need to be recycled'))
                        text.add(Text.red('⚠️If you use an absolutely ultra-clean maintenance warehouse, the original formula may be run'))
                        if (loadedAddons.gtladd)
                            text.add(Text.gold('✨at').append(autoTierColor('max')).append(Text.gold('stage, you can directly produce corresponding infinite components!')))
                    })

                    // ----- MAX 终压 -----
                    if (loadedAddons.gtladd) {
                        let petriDishes = ['gtlcore:eschericia_petri_dish', 'gtlcore:streptococcus_petri_dish', 'gtlcore:cupriavidus_petri_dish', 'gtlcore:shewanella_petri_dish']
                        event.addAdvanced(petriDishes, (item, advanced, text) => {
                            text.add(Text.gold('▌Kirin’s changes -- General section:'))
                            text.add(Text.gold('✨at').append(autoTierColor('max')).append(Text.gold('stage, you can directly create corresponding infinite components!')))
                        })
                        event.addAdvanced('minecraft:cow_spawn_egg', (item, advanced, text) => {
                            text.add(Text.gold('▌Kirin’s changes -- General section:'))
                            text.add(Text.gold('✨at').append(autoTierColor('max')).append(Text.gold('stage, you can directly create corresponding infinite components!')))
                        })
                        event.addAdvanced('kubejs:glacio_spirit', (item, advanced, text) => {
                            text.add(Text.gold('▌Kirin’s changes -- General section:'))
                            text.add(Text.gold('✨Infinite frost original fragment components!'))
                        })
                        event.addAdvanced(['kubejs:leptonic_charge', 'kubejs:quantumchromodynamic_protective_plating'], (item, advanced, text) => {
                            text.add(Text.gold('▌Kirin’s changes -- General section:'))
                            text.add(Text.gold('✨The original infinite quantum chromodynamic bomb can be disassembled in the assembly machine to obtain the corresponding infinite components!'))
                            text.add(Text.gray('The dismantling machine has been used, it’s really great for you😡————G Soniden'))
                        })
                        event.addAdvanced('minecraft:dragon_egg', (item, advanced, text) => {
                            text.add(Text.gold('▌Kirin’s changes -- General section:'))
                            text.add(Text.gold('✨at').append(autoTierColor('max')).append(Text.gold('stage, you can directly create corresponding infinite components!')))
                        })
                    }
                    event.addAdvanced('avaritia:singularity', (item, advanced, text) => {
                        if (item.nbt == '{Id:"avaritia:spacetime"}') {
                            text.add(Text.gold('▌Kirin’s changes -- General section:'))
                            text.add(Text.gold('✨You can use an electric detonation compressor for direct compression!'))
                        }
                    })
                    if (loadedAddons.gtladd) {
                        event.addAdvanced('gtladditions:heliophase_leyline_crystallizer', (item, advanced, text) => {
                            text.add(Text.gold('▌Kirin’s changes -- General section:'))
                            text.add(Text.gold('✨New dragon dust formula for dragon vein crystals'))
                        })
                        event.addAdvanced('gtladditions:heliofusion_exoticizer', (item, advanced, text) => {
                            text.add(Text.gold('▌Kirin’s changes -- General section:'))
                            if (event.shift) {
                                text.add(Text.lightPurple('✨Liquid hyperspace metal, high-energy quark-gluon plasma (no version of universal superconducting liquid), dragon\'s blood, liquid echo fragments, liquid Lado X polymer, liquid cosmic neutron element, cosmic singularity/liquid tuning source gold'))
                            } else {
                                text.add(Text.gold('✨Seven new exclusive formulas have been added to material alienation. Press').append(Text.lightPurple('[shift]')).append(Text.gold('to view!')))
                            }
                            text.add(Text.gray('Most of these recipes are moved from the type control mechanism of add3.0, with a few numerical adjustments.'))
                            if (loadedAddons.thetornproductionline) text.add(Text.gray('If you have Tear installed, the Chrono Metal recipe might seem a bit lacking?'))
                            text.add(Text.gray('Maybe you should make two false gods?'))
                        })
                        event.addAdvanced('gtladditions:fuxi_bagua_heaven_forging_furnace', (item, advanced, text) => {
                            text.add(Text.gold('▌Kirin’s changes -- General section:'))
                            let chaoticAlchemyRecipes = ''
                            let chaoticAlchemyCount = ''
                            if (loadedAddons.thetornproductionline) {
                                chaoticAlchemyRecipes = '✨Liquid Adamantium Alloy, Liquid Astral Titanium, Liquid Celestial Tungsten, Liquid Creation Alloy, Liquid Legendary Alloy, Liquid Awakening Dragon, Liquid Celestial Secret, Liquid Tear'
                                chaoticAlchemyCount = 8
                            } else {
                                chaoticAlchemyRecipes = '✨Liquid Adamantium Alloy, Liquid Astrotic Titanium, Liquid Celestial Tungsten, Liquid Creation Alloy, Liquid Legendary Alloy, Liquid Awakening Dragon'
                                chaoticAlchemyCount = 6
                            }
                            if (event.shift) {
                                text.add(Text.lightPurple(chaoticAlchemyRecipes))
                            } else {
                                text.add(Text.gold(`✨混沌炼金添加了${chaoticAlchemyCount}种新的专属配方,按`).append(Text.lightPurple('[shift]')).append(Text.gold('to view!')))
                            }
                        })
                        if (loadedAddons.thetornproductionline) {
                            event.addAdvanced('kubejs:suprachronal_mainframe_complex', (item, advanced, text) => {
                                text.add(Text.gold('▌Kirin’s changes -- General section:'))
                                text.add(Text.gold('✨Can be synthesized with the torn Tianji deduction module!'))
                                text.add(Text.gray('It is recommended that you have a look at the circuit batch production module mk4.'))
                            })
                            event.addAdvanced(['gtceu:lava_furnace', 'thetornproductionline:celestial_secret_deducing_creative_module'], (item, advanced, text) => {
                                text.add(Text.gold('▌Kirin’s changes -- General section:'))
								text.add(Text.gold('✨The lava furnace can now use steam instead of electric lava recipe'))
								text.add(Text.red('⚠️The input assembly must be used to input steam, and the steam input bin and input bin cannot be used'))
								text.add(Text.gray('Can\'t run in parallel, it doesn\'t make much sense'))
                                text.add(Text.gray('legend').append(rainbowComponent('Tianji Deduction Module[Creation]', 'slow')).append(Text.gray('Throwing it into the input assembly of the lava furnace will')).append(rainbowComponent('something good happens', 'fast')))
                            })
                        }
                    }
                    // 奇迹相关
                    event.addAdvanced('gtlcore:miracle_crystal', (item, advanced, text) => {
                        text.add(Text.gold('▌Kirin’s changes -- General section:'))
                        text.add(Text.gold('✨Can directly extract liquid miracle!'))
                    })
                    event.addAdvanced('gtladditions:macro_atomic_resonant_fragment_stripper', (item, advanced, text) => {
                        text.add(Text.gold('▌Kirin’s changes -- General section:'))
                        text.add(Text.gold('✨Circuit No. 24 has a formula for passively producing miracles without input!'))
                        text.add(Text.gray('I guess you do this just for the miracle)'))
                    })
                    event.addAdvanced('gtceu:creative_tank', (item, advanced, text) => {
                        text.add(Text.gold('▌Kirin’s changes -- General section:'))
                        text.add(Text.gold('✨Circuit No. 24 can be used in chemical soaking agents to remove all fluids in one step!'))
                        text.add(Text.red('⚠️Because the output fluid is too huge, it can only be fully output when the machine is shut down.'))
                        text.add(Text.gray('Infinite ME fluid components can mark items is really a great invention'))
                    })

                    // ----- 泛用 适用于多个阶段 -----
                    event.addAdvanced(autoConfigurationParallelHatchList, (item, advanced, text) => {
                        text.add(Text.gold('▌Kirin’s changes -- General section:'))
                        text.add(Text.gold('✨The assembly machine formula is cheaper! The stage is lower!'))
                        text.add(Text.gold('✨You can directly create the corresponding configurable version when using a new type of maintenance warehouse!'))
                    })
                    if (!Ingredient.of('gtceu:large_fragment_world_collection_machine').isEmpty()) {
                        event.addAdvanced(Ingredient.of(/ad_astra:tier_.*_rocket/).or(/ad_astra_rocketed:tier_(?!7_)[^_]+_rocket/), (item, advanced, text) => {
                            text.add(Text.gold('▌Kirin’s changes -- General section:'))
                            text.add(Text.gold('✨[Exclusive to Island Mode] All types of debris can be fired at once in the chemical dipping machine!'))
                            text.add(blinkComponent('⚠️You cannot use the sample assembly for this recipe', 'red'))
                            text.add(Text.gray('It might be more convenient, but it’s unlikely to be convenient'))
                        })
                    }
                    event.addAdvanced(Ingredient.of('gtceu:plasma_condenser').or('gtceu:mega_vacuum_freezer').or('gtceu:cooling_tower').or('gtceu:cold_ice_freezer'), (item, advanced, text) => {
                        text.add(Text.gold('▌Kirin’s changes -- General section:'))
                        text.add(Text.gold('✨All plasma condensation recipes can now be performed using a vacuum freezer!'))
                        text.add(Text.gray('No need to build two more cooling towers'))
                    })
                    event.addAdvanced('gtceu:void_fluid_drilling_rig', (item, advanced, text) => {
                        text.add(Text.gold('▌Kirin’s changes -- General section:'))
                        text.add(Text.gold('✨Remember the Void Fluid Drill? It now provides an excellent environment for the drill!'))
                        text.add(Text.gold('✨You only need to input data and a drilling rig to produce several fluids at the same time with the output of (rig multiplier * production base multiplier)!'))
                        text.add(Text.gold('✨Specially, the advanced endless fluid drill does not require input data, it can produce all bedrock drill output!'))
                        if (event.shift) {
                            text.add(Text.gold('--------------------Rig Multiplier--------------------'))
                            text.add(Text.gold('Advanced Fluid Drill: 1.5x'))
                            text.add(Text.gold('Advanced Fluid Drill II: 24x'))
                            text.add(Text.gold('Advanced Fluid Drill III: 192x'))
                            text.add(Text.gold('Endless Fluid Drill: 6144x'))
                            text.add(Text.gold('Advanced Endless Rig: 447400x'))
                        } else {
                            text.add(Text.gold('✨Press').append(Text.lightPurple('[shift]')).append(Text.gold('To view the drilling rig multiplier corresponding to the drilling rig!')))
                        }
                        if (event.ctrl) {
                            text.add(Text.gold('--------------------Main world data--------------------'))
                            text.add(Text.gold('Crude oil: 250\nGas: 150\nHeavy oil: 150\nLight oil: 250\nOil: 250\nLava: 200'))
                            text.add(Text.gold('--------------------Lower bound data--------------------'))
                            text.add(Text.gold('Gaseous helium: 250\nHelium-3: 150\nGaseous radon: 70\nSulfuric acid: 200\nGaseous deuterium: 250'))
                            text.add(Text.gold('--------------------End data--------------------'))
                            text.add(Text.gold('Krypton: 200\nGaseous Neon: 200\nGaseous radon: 200\nGaseous xenon: 200\nGas: 250\nHydrochloric acid: 250\nNitric acid: 250\nGaseous fluorine: 250\nGaseous chlorine: 350\nGaseous methane: 200\nBenzene: 100\nCharcoal by-product: 150'))
                        } else {
                            text.add(Text.gold('✨Press').append(Text.yellow('[ctrl]')).append(Text.gold('to view the fluid and production base multipliers corresponding to the data!')))
                        }
                    })
                    event.addAdvanced(Ingredient.of(/gtmthings:.*_wireless_energy_receive_cover/).or(/gtceu:.*solar_panel/), (item, advanced, text) => {
                        text.add(Text.gold('▌Kirin’s changes -- General section:'))
                        text.add(Text.gold('✨Now it can be produced on the component assembly line, saving 25% of materials and a lot of bytes!'))
                    })
                    event.addAdvanced(Ingredient.of(/gtceu:.*_laser_engraver/).or('gtceu:large_engraving_laser').or('gtceu:dimensional_focus_engraving_array').or('gtceu:engraving_laser_plant').or('gtladditions:lucid_etchdreamer'), (item, advanced, text) => {
						text.add(Text.gold('▌Kirin’s changes -- General section:'))
						text.add(Text.gold('✨Most of the formulas in the laser etching series except gem engraving are now distinguished by circuits instead of lenses.'))
						text.add(Text.gold('✨Dimensional focused laser etching array no longer requires photoresist to engrave low-level wafers, and no longer requires computing power and research to engrave high-level wafers'))
						text.add(Text.gold('✨Now three laser etching formulas are common, so you can move the template painlessly'))
                        if(item === 'gtceu:dimensional_focus_engraving_array')text.add(Text.red('⚠️Dimensional focusing laser etching array needs to be bound to the database regardless of whether it needs to be studied. The bound database must have any data access bin (can be empty)'))
					})
                }

                // ============================== 核爆板块 ==============================
                if (KIRIN_CONFIG.enableGameBreakingRecipes) {
                    event.addAdvanced('gtceu:polytetrafluoroethylene_ingot', (item, advanced, text) => {
                        text.add(Text.yellow('▌Kirin\'s changes -- Nuclear Explosion Section'))
                        text.add(Text.yellow('✨1B ethylene + 4B gaseous fluorine = 1B tetrafluoroethylene + 4B gaseous hydrogen'))
                    })
                    event.addAdvanced('gtceu:fission_reactor', (item, advanced, text) => {
                        text.add(Text.yellow('▌Kirin\'s changes -- Nuclear Explosion Section'))
                        text.add(Text.yellow('✨Input circuit 1/2 and then input thorium powder and water to perform controllable nuclear fusion without heating up'))
                        text.add(Text.yellow('✨The efficiency of producing nuclear waste is reduced, but steam/supercritical steam can be produced'))
                        text.add(Text.yellow('✨Circuits 1/2 correspond to steam/supercritical respectively'))
                        text.add(Text.gray('Although the output has been reduced many times, the special effect of not heating up and consuming energy allows it to run at high parallelism, and the output is actually extremely high.'))
                        text.add(Text.gray('Steam is really going to take over'))
                    })
                    event.addAdvanced('gtceu:turbine_rotor', (item, advanced, text) => {
                        if (item.nbt && item.nbt.toString().includes('neutronium')) {
                            text.add(Text.yellow('▌Kirin\'s changes -- Nuclear Explosion Section'))
                            text.add(Text.yellow('✨The strongest rotor——Neutron turbine rotor is super reduced in price and is stamped with 114 neutron dust.'))
                        }
                    })
                    event.addAdvanced('gtceu:gravity_hatch', (item, advanced, text) => {
                        text.add(Text.yellow('▌Kirin\'s changes -- Nuclear Explosion Section'))
                        text.add(Text.yellow('✨Assemble the recipe cheaper! Downgrade to').append(autoTierColor('hv')))
                    })
                    event.addAdvanced(['gtceu:steel_ingot', 'gtceu:wrought_iron_ingot'], (item, advanced, text) => {
                        text.add(Text.yellow('▌Kirin\'s changes -- Nuclear Explosion Section'))
                        text.add(Text.yellow('✨Wrought iron ingots can now be smelted directly into steel ingots in the furnace!'))
                    })
                    event.addAdvanced('gtceu:auto_configuration_maintenance_hatch', (item, advanced, text) => {
                        text.add(Text.yellow('▌Kirin\'s changes -- Nuclear Explosion Section'))
                        text.add(Text.yellow('✨Assemble the recipe cheaper! Downgrade to').append(autoTierColor('hv')))
                    })
                    event.addAdvanced('gtceu:chemical_distort', (item, advanced, text) => {
                        text.add(Text.yellow('▌Kirin\'s changes -- Nuclear Explosion Section'))
                        text.add(Text.yellow('✨Four integrated twists added by Gtladditions have arrived in advance').append(autoTierColor('uv')).append(Text.yellow('!')))
                        text.add(Text.yellow('✨They are rubber twist, plastic twist, biological twist, optical twist'))
                        text.add(Text.gray('In fact, there is no need to install add to have this recipe...'))
                    })
                    event.addAdvanced(['kubejs:extremely_durable_plasma_cell', 'kubejs:dense_neutron_plasma_cell', 'kubejs:cosmic_neutron_plasma_cell'], (item, advanced, text) => {
                        text.add(Text.yellow('▌Kirin\'s changes -- Nuclear Explosion Section'))
                        text.add(Text.yellow('✨Cosmic neutrons can be produced using ultra-dimensional stirring, which is extremely cheap!'))
                    })
                    event.addAdvanced('avaritia:crystal_matrix', (item, advanced, text) => {
                        text.add(Text.yellow('▌Kirin\'s changes -- Nuclear Explosion Section'))
                        text.add(Text.yellow('✨Can be directly extracted into liquid crystal matrix!'))
                        text.add(Text.gray('It\'s natural, isn\'t it?'))
                    })
                    event.addAdvanced(['gtceu:creative_data_access_hatch', 'gtceu:research_station'], (item, advanced, text) => {
                        text.add(Text.yellow('▌Kirin\'s changes -- Nuclear Explosion Section'))
                        text.add(Text.yellow('✨Creative model data access warehouse has been reduced in price to').append(autoTierColor('luv')))
                        text.add(Text.gray('This recipe is supposed to be used by players who have problems with the research station. I don’t recommend that you use this recipe to skip class.'))
                        text.add(Text.gray('But I have to say, having fun is the most important thing'))
                    })
                    event.addAdvanced(['avaritia:neutron_pile', 'avaritia:neutron_ingot', 'gtceu:neutronium_ingot'], (item, advanced, text) => {
                        text.add(Text.yellow('▌Kirin\'s changes -- Nuclear Explosion Section'))
                        text.add(Text.yellow('Black neutron ingots can be washed into white neutron ingots using white dye!'))
                    })
                }
            })
        }
    } else {
        ClientEvents.loggedIn((event) => {
            let { player } = event
            player.tell(Text.red('Kirin\'s personal product - the client script did not detect the configuration file!'))
            player.tell(Text.red('Please check the installation status!'))
        })
    }
})()
