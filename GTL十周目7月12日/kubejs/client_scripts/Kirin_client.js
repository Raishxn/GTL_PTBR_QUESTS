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
            let nbtString = `{RepairCost:0,amts:[L;${amtsList}],display:{Name:'{"text":"Pacote de componentes de circuito de programação infinita §r"}'},ic:${size}L,internalCurrentPower:20000.0d,keys:[${keysList.join(',')}]}`
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
                            text.add(Text.green('▌Mudanças de Kirin – seção de reparos'))
                            text.add(Text.green('✨Pode ser feito em máquina de montagem, economizando muitos bytes!'))
                        } else {
                            let currentParallel = item.nbt?.BlockEntityTag?.currentParallel
                            let tier = item.id.toString().split(':')[1].split('_')[0]
                            text.clear()
                            const maxAllowed = maxParallelMap[tier]
                            if (loadedAddons.thetornproductionline) {
                                if (currentParallel === maxAllowed * 4) text.add(Text.of('Uma camada de compressão').append(autoTierColor(tier)).append(Text.white('Caixa de controle paralelo')))
                                else if (currentParallel === maxAllowed * 16) text.add(Text.of('Compressão dupla').append(autoTierColor(tier)).append(Text.white('Caixa de controle paralelo')))
                                else if (currentParallel === maxAllowed * 64) text.add(Text.of('compressão tripla').append(autoTierColor(tier)).append(Text.white('Caixa de controle paralelo')))
                                else text.add(autoTierColor(tier).append(Text.white('Caixa de controle paralelo')))
                            } else {
                                text.add(autoTierColor(tier).append(Text.white('Caixa de controle paralelo')))
                            }
                            text.add(Text.of('Permitir processamento simultâneo de até').append(Text.red(currentParallel.toString()).bold()).append(Text.of('Uma receita.')))
                            text.add(rainbowComponent('Modificado por GregTech Leisure'))
                            text.add(Text.darkGray(item.getId()))
                            text.add(Text.green('▌Mudanças de Kirin – seção de reparos'))
                            text.add(Text.red('✨O número de paralelos nesta caixa de controle paralelo excede o limite superior!'))
                            text.add(Text.green('✨Agora evita automaticamente a abertura de caixas de controle paralelas que excedem o limite paralelo!'))
                            text.add(Text.green('✨O número paralelo também será salvo ao destruir'))
                            text.add(Text.gray('Não há mais medo de que os números paralelos sejam eliminados!'))
                        }
                    })
                    // 太空电梯
                    event.addAdvanced('gtceu:space_elevator', (item, advanced, text) => {
                        text.add(Text.green('▌Mudanças de Kirin – seção de reparos'))
                        text.add(Text.green('✨Inserir o circuito nº 2 pode cancelar o requisito de potência de computação, que é adequado para uso quando há um problema com o switch!'))
                        text.add(Text.gray('Existem realmente muitos bugs no poder da computação...'))
                    })
                    // 火箭
                    event.addAdvanced(Ingredient.of(/ad_astra:tier_.*_rocket/).or(/ad_astra_rocketed:tier_(?!7_)[^_]+_rocket/), (item, advanced, text) => {
                        text.add(Text.green('▌Mudanças de Kirin – seção de reparos'))
                        text.add(Text.green('✨Pode ser feito diretamente na máquina de montagem, sem necessidade de sintetizá-lo manualmente na bancada da NASA!'))
                    })
                    // 巴纳德C空气
                    event.addAdvanced(['gtlcore:world_fragments_barnarda', 'gtladditions:quantum_syphon_matrix', 'gtceu:barnarda_air_bucket'], (item, advanced, text) => {
                        text.add(Text.green('▌Mudanças de Kirin – seção de reparos'))
                        text.add(Text.green('✨O ar Barnard C agora pode ser extraído diretamente da Matriz Sifão Quântica!'))
                    })
                    // 铁锭 -> 锻铁锭
                    event.addAdvanced(['minecraft:iron_ingot', 'gtceu:wrought_iron_ingot'], (item, advanced, text) => {
                        text.add(Text.green('▌Mudanças de Kirin – seção de reparos'))
                        text.add(Text.green('✨Lingotes de ferro agora podem ser fundidos diretamente em lingotes de ferro forjado, sem necessidade de desmontagem!'))
                    })
                    // 无用宝石筛选
                    event.addAdvanced('gtceu:large_sifting_funnel', (item, advanced, text) => {
                        text.add(Text.green('▌Mudanças de Kirin – seção de reparos'))
                        text.add(Text.green('✨Algumas gemas inúteis (como a monazita) tiveram seus rótulos filtráveis ​​removidos!'))
                        text.add(Text.gray('Não haverá mais uma situação em que uma pilha de monazita requintada saia da mina.'))
                    })
                    // 无限编程电路
                    event.addAdvanced('gtceu:programmed_circuit', (item, advanced, text) => {
                        text.add(Text.green('▌Mudanças de Kirin – seção de reparos'))
                        text.add(Text.green('✨Você pode criar diretamente pacotes ilimitados de componentes de circuitos de programação, sem necessidade de sintetizar componentes de circuitos de programação sem fio um por um!'))
                    })
                    // 预制维护仓
                    event.addAdvanced(autoConfigurationParallelHatchList, (item, advanced, text) => {
                        text.add(Text.green('▌Mudanças de Kirin – seção de reparos'))
                        if (item.nbt) {
                            let durationMultiplier = item.nbt?.BlockEntityTag?.durationMultiplier.toFixed(2).toString()
                            text.add(Text.green('Este é um múltiplo pré-fabricado de').append(Text.gold(durationMultiplier).append(Text.green('Armazém de manutenção pré-fabricado!'))))
                        } else {
                            text.add(Text.green('✨As caixas pré-fabricadas de manutenção do multiplicador podem ser feitas na barra de síntese ou na máquina de montagem, eliminando o problema de ajuste manual!'))
                            text.add(Text.green('✨O que é sintetizado na coluna de síntese é o limite inferior; o circuito nº 2 da máquina de montagem é o limite inferior e o circuito nº 10 é o limite superior.'))
                        }
                    })
                }

                // ============================== 一般板块 ==============================
                if (KIRIN_CONFIG.enableSignificantBalanceChanges) {
                    // 超级天球 (add)
                    if (loadedAddons.gtladd) {
                        event.addAdvanced('gtladditions:thread_modifier_hatch', (item, advanced, text) => {
                            if (item.nbt && item.nbt.toString().includes('astralArrayInventory')) {
                                text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
                                text.add(Text.gold('✨O método de compactar 127 arranjos estelares em uma esfera celeste foi coletado de infinitas possibilidades pelos mestres do Mapa Estelar Olímpico.'))
                                text.add(Text.gray('Não há necessidade de posicionamento cuidadoso...'))
                            }
                        })
                    }

                    // ----- ULV 超低压 -----
                    event.addAdvanced('gtceu:primitive_pump', (item, advanced, text) => {
                        text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
                        text.add(Text.gold('✨Agora você pode criar painéis de cobertura de água ilimitados diretamente usando a bomba d\'água original e seus componentes multibloco!'))
                    })
                    event.addAdvanced('gtceu:infinite_water_cover', (item, advanced, text) => {
                        text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
                        text.add(Text.gold('✨Pode ser feito diretamente da bomba d’água original e seus componentes!'))
                        text.add(Text.gray('A eficiência real depende dos vasos cobertos, pode encher diretamente um único tanque de fluido, exceto alguns vasos'))
                        text.add(Text.gray('Pode ser conectado diretamente a uma caldeira a vapor de bloco único'))
                    })
                    event.addAdvanced('ae2:portable_item_cell_256k', (item, advanced, text) => {
                        text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
                        text.add(Text.gold('✨Você pode sintetizar 16 componentes de 16k diretamente na bancada! Faça vários componentes ilimitados diretamente!'))
                    })
                    event.addAdvanced(Ingredient.of(/(gtmthings|gtceu|gtlcore):.*terminal/), (item, advanced, text) => {
                        text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
                        text.add(Text.gold('✨O terminal branco pode ser sintetizado diretamente no terminal definitivo!'))
                    })
                    event.addAdvanced(Ingredient.of(/gtceu:.*_rotor/), (item, advanced, text) => {
                        if (item.id.includes('turbine') || item.id.includes('holder')) return
                        text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
                        text.add(Text.gold('✨Você pode usar diretamente um martelo + 8 lingotes para sintetizar o rotor correspondente, reduzindo o tédio de esfregar as mãos!'))
                    })


                    // ----- LV 低压 -----
                    event.addAdvanced('gtceu:large_steam_input_hatch', (item, advanced, text) => {
                        text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
                        text.add(Text.gold('✨A receita da máquina de montagem é mais barata! Estágio reduzido').append(autoTierColor('lv')))
                    })
                    event.addAdvanced('gtceu:advanced_energy_detector_cover', (item, advanced, text) => {
                        text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
                        text.add(Text.gold('✨Palco reduzido para').append(autoTierColor('lv')))
                    })

                    // ----- MV 中压 -----
                    event.addAdvanced('gtlcore:multi_functional_casing', (item, advanced, text) => {
                        text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
                        text.add(Text.gold('✨A receita da máquina de montagem é mais barata!'))
                    })
                    event.addAdvanced('gtceu:mv_distillery', (item, advanced, text) => {
                        text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
                        text.add(Text.gold('✨O circuito nº 24 pode destilar diretamente óleo pesado em etileno em uma única etapa!'))
                        text.add(Text.red('⚠️A perda é enorme e a taxa de conversão é de apenas 7%!'))
                    })
                    event.addAdvanced('expatternprovider:infinity_cell', (item, advanced, text) => {
                        if (item.nbt == '{record:{"#c":"ae2:f",id:"minecraft:water"}}') {
                            text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
                            text.add(Text.gold('✨Pode ser eletrolisado junto com pó de potássio em um eletrolisador para produzir passivamente hidrogênio gasoso e oxigênio gasoso!'))
                            text.add(Text.gold('✨A eficiência é quase a mesma do ciclo de eletrólise do hidróxido de potássio e vem com processamento em lote 256 vezes!'))
                        }
                    })

                    // ----- HV 高压 -----
                    event.addAdvanced('gtceu:nitric_acid_bucket', (item, advanced, text) => {
                        text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
                        text.add(Text.gold('✨Dahua Anti-No. O circuito 5 pode ser sintetizado diretamente por reconstrução molecular ou pode ser sintetizado diretamente com água e nitrogênio!'))
                    })
                    if (!loadedAddons.dist_savior) {
                        event.addAdvanced('gtceu:distilled_water_bucket', (item, advanced, text) => {
                            text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
                            text.add(Text.gold('✨Água destilada congelada a vácuo a vapor!'))
                        })
                    }
                    event.addAdvanced(['gtceu:raw_aluminium', 'gtceu:raw_neodymium', '#forge:ores/neodymium', '#forge:ores/aluminium'], (item, advanced, text) => {
                        text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
                        text.add(Text.gold('✨Pode ser queimado diretamente em pó na fornalha!'))
                    })
                    event.addAdvanced('gtceu:salt_dust', (item, advanced, text) => {
                        text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
                        text.add(Text.gold('✨Pode reagir com a água diretamente na reação química para obter ácido clorídrico e hidróxido de sódio!'))
                        text.add(Text.gray('Existe uma fórmula para cloreto de potássio combinado com ácido clorídrico e hidróxido de potássio, você não pode me culpar)'))
                    })

                    // ----- EV 超高压 -----
                    event.addAdvanced('gtceu:impure_uraninite_dust', (item, advanced, text) => {
                        text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
                        text.add(Text.gold('✨Dahua Anti-No. 23 circuitos podem ser processados ​​em uma única etapa!'))
                    })

                    // ----- IV 强导压 -----
                    event.addAdvanced('gtceu:fission_reactor', (item, advanced, text) => {
                        text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
                        text.add(Text.gold('✨Circuito de entrada nº 3 e pó de tório para realizar fissão nuclear controlável sem aquecer ou consumir eletricidade.'))
                    })
                    event.addAdvanced('gtceu:indium_dust', (item, advanced, text) => {
                        text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
                        text.add(Text.gold('✨Versão em pó de minério de índio de etapa única!'))
                    })
                    event.addAdvanced(Ingredient.of(/^gtceu:(small_|tiny_)?rare_earth_dust$/), (item, advanced, text) => {
                        text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
                        text.add(Text.gold('✨Monazita, essência de samário, mistura rica em cério e ácido clorídrico agora podem ser misturados no misturador para obter uma grande quantidade de cloreto de terras raras!'))
                        text.add(Text.gray('É como se houvesse uma reviravolta embutida nisso'))
                    })

                    // ----- LuV 剧差压 -----
                    event.addAdvanced('gtceu:raw_crystal_chip', (item, advanced, text) => {
                        text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
                        text.add(Text.gold('✨Você pode usar uma matéria-prima de componente de cristal como catalisador e inserir 144 MB ​​de európio líquido para crescimento de circulação reversa.'))
                    })
                    event.addAdvanced('ad_astra:glacian_ram_spawn_egg', (item, advanced, text) => {
                        text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
                        text.add(Text.gold('✨O palco está chegando').append(autoTierColor('zpm')))
                        text.add(Text.gray('Muito caro...'))
                        if (loadedAddons.gtladd)
                            text.add(Text.gold('✨em').append(autoTierColor('max')).append(Text.gold('estágio, você pode produzir diretamente componentes infinitos correspondentes!')))
                    })
                    if (loadedAddons.thetornproductionline) {
                        event.addAdvanced(Ingredient.of(/gtceu:(?!compressed_)[^_]+_fusion_reactor/).or('thetornproductionline:fusion_process_module'), (item, advanced, text) => {
                            text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
                            text.add(Text.gold('✨Você pode usar o forno de fundição de liga para realizar operações de fusão!'))
                            text.add(Text.gold('✨O forno de fundição de liga possui overclock, que é muito mais forte que o pequeno reator de fusão!'))
                            text.add(Text.red('⚠️Para equilíbrio, usar um forno de fundição de liga para executar receitas de fusão terá uma penalidade de tempo de 4 vezes (somente Fusão I)/16 vezes o tempo!'))
                        })
                    }
                    // 艾萨全套加强
                    event.addAdvanced(['gtceu:isa_mill', 'gtceu:flotation_cell_regulator', 'gtceu:vacuum_drying_furnace'], (item, advanced, text) => {
                        text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
                        text.add(Text.gold('✨Lembra do conjunto de três peças Aisa? Eles ganharam um buff enorme!'))
                        text.add(Text.gold('✨O consumo geral de tempo é bastante reduzido! É como voar!'))
                        text.add(Text.gold('✨Todas as tensões da receita (exceto pó de metal de terras raras secas) são reduzidas para EV, obtendo 256 vezes o processamento em lote!'))
                        text.add(Text.darkGreen('✨Não é mais necessária água destilada para o ISA Grinder!'))
                        text.add(Text.yellow('✨O etil xantato de sódio/potássio necessário para a máquina de flotação industrial é substituído pelo pó elementar correspondente, e o óleo de pinho é substituído por petróleo bruto, e a produção é quadruplicada!'))
                        text.add(Text.darkRed('✨O forno de secagem a vácuo não precisa mais trocar os circuitos com frequência, a temperatura da bobina é alterada para cobre branco e também pode ser inserido em uma centrífuga de terras raras para produzir diretamente pó de metal de terras raras!'))
                        text.add(Text.gray('Mesmo que seja tanto fortalecido, só fortalece Aisa de uma distração a uma opção...'))
                    })
                    event.addAdvanced('gtceu:rare_earth_metal_dust', (item, advanced, text) => {
                        text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
                        text.add(Text.gold('✨A espuma de monazita seca a vácuo produz diretamente pó de metal de terras raras!'))
                    })

                    // ----- ZPM 零点压 -----
                    if (!KIRIN_CONFIG.enableGameBreakingRecipes) { // 一般板块的重力控制仓，如果核爆未开启才显示
                        event.addAdvanced('gtceu:gravity_hatch', (item, advanced, text) => {
                            text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
                            text.add(Text.gold('✨A receita da máquina de montagem é mais barata! Estágio reduzido').append(autoTierColor('zpm')))
                        })
                    }
                    event.addAdvanced(Ingredient.of(/gtceu:.*block_conversion_room/), (item, advanced, text) => {
                        text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
                        text.add(Text.gold('✨Você pode usar diretamente o *Model Assembly* para inserir os blocos a serem convertidos para conversão!'))
                        text.add(Text.red('⚠️Como a sala de transformação de bloco não suporta nativamente o barramento de saída, você deve usar um conjunto de amostra com *função de saída independente* para saída!'))
                        text.add(Text.gray('Parece que não há necessidade de construir uma grande sala de transformação...'))
                    })
                    event.addAdvanced('gtmthings:zpm_2a_wireless_energy_input_hatch', (item, advanced, text) => {
                        text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
                        text.add(Text.gold('✨Um armazém de energia sem fio 16A LuV pode ser compactado em um armazém de energia sem fio ZPM, que pode permitir diretamente que seu alto-forno de chama de bobina Caijin queime pó de európio em lingotes quentes!'))
                    })

                    // ----- UHV 极高压 -----
                    if (loadedAddons.thetornproductionline) {
                        event.addAdvanced(['gtceu:neutron_activator', 'thetornproductionline:neutron_activator_module'], (item, advanced, text) => {
                            text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
                            text.add(Text.gold('✨O módulo de ativação de nêutrons de alta velocidade pode fornecer processamento em lote de 64x, demanda de nêutrons de 0,1x, múltiplo demorado total de 0,5x e a demanda mínima de nêutrons é reduzida a 1 para o ativador de nêutrons'))
                            text.add(Text.red('⚠️O módulo de ativação de nêutrons de alta velocidade não pode ser usado para acelerar o processamento de sílica e processar ovos de dragão'))
                        })
                    }
                    event.addAdvanced('gtceu:charcoal_pile_igniter', (item, advanced, text) => {
                        text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
                        text.add(Text.gold('✨O acendedor de pilha de carvão pode ser combinado com qualquer componente de tora infinito para sintetizar componentes de carvão ilimitados'))
                        text.add(Text.gray('O acendedor de pilha de carvão foi reforçado e centenas de milhões de pessoas cinzentas devem usar acendedores de pilha de carvão.'))
                    })

                    // ----- UEV 极超压 -----
                    event.addAdvanced('gtceu:aggregation_device', (item, advanced, text) => {
                        text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
                        text.add(Text.gold('✨Circuito 24 remove o catalisador e tem processamento em lote de 64x'))
                        text.add(Text.gray('Apesar disso, ainda é muito lento devido ao barramento de entrada ULV...'))
                    })
                    if (loadedAddons.gtladd) {
                        event.addAdvanced('gtladditions:antientropy_condensation_center', (item, advanced, text) => {
                            text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
                            if (event.shift) {
                                text.add(Text.lightPurple('✨Pode ser resfriado diretamente:'))
                                text.add(Text.lightPurple('Plasma de tecelagem do universo, plasma de matriz cristalina, plasma de matéria caótica, plasma de dragão do despertar, plasma de rênio degenerado'))
                            } else {
                                text.add(Text.gold('✨Adicionadas 5 novas receitas exclusivas, pressione').append(Text.lightPurple('[shift]')).append(Text.gold('para ver!')))
                            }
                            text.add(Text.gold('✨Além disso, esferas de nêutrons e nêutrons cósmicos podem ser resfriados dentro do espaçador!'))
                        })
                    }
                    event.addAdvanced('kubejs:space_essence', (item, advanced, text) => {
                        text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
                        text.add(Text.gold('✨Você pode usar a receita usando o ovo de desova Wagyu da Daxu Mining como catalisador, não é necessário mais minério!'))
                    })

                    // ----- UIV 极巨压 -----
                    event.addAdvanced(['gtceu:aggregation_device', 'gtceu:dimensionally_transcendent_mixer'], (item, advanced, text) => {
                        if (item.id !== 'gtceu:aggregation_device') text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
                        text.add(Text.gold('✨em').append(autoTierColor('uiv')).append('estágio, você pode usar o Hyper Dimension Blender para a receita da Unidade de Agregação'))
                        text.add(Text.red('⚠️Para equilíbrio, usar um liquidificador hiperdimensional para executar receitas de agregação terá uma penalidade de tempo de 16 vezes!'))
                    })
                    event.addAdvanced('gtceu:dyson_sphere', (item, advanced, text) => {
                        text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
                        text.add(Text.gold('✨O Dyson Sphere adicionou três novas fórmulas de geração de energia, permitindo que você aproveite grandes quantidades de geração de energia sem a necessidade de um módulo de lançamento!'))
                        text.add(Text.gold('✨Disponível').append(autoTierColor('opv')).append(Text.gold('!')))
                        if (loadedAddons.thetornproductionline) {
                            text.add(Text.gold('✨Se você instalar o rasgo da linha de produção, poderá fazer overclock adicional uma vez, e a geração de energia pode chegar até 4194304A.').append(autoTierColor('max')).append(Text.gold('!')))
                        }
                        text.add(Text.gray('A bola Dyson foi fortalecida e centenas de milhões de pessoas cinzentas devem usar Dyson'))
                    })
                    event.addAdvanced('gtceu:nan_certificate', (item, advanced, text) => {
                        text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
                        text.add(Text.gold('✨Você pode usar mistura ultradimensional para fazer várias porções!'))
                        text.add(Text.gray('Prova de que você não é mais um porco').strikethrough())
                    })
                    if (loadedAddons.gtladd) {
                        event.addAdvanced('gtceu:cosmicneutronium_bucket', (item, advanced, text) => {
                            text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
                            text.add(Text.gold('✨Nêutrons cósmicos e esferas de nêutrons com resfriamento de quantidade tiveram seu preço reduzido e o tempo avançou!'))
                        })
                    }

                    // ----- UXV 极顶压 -----
                    event.addAdvanced('gtceu:dragon_egg_copier', (item, advanced, text) => {
                        text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
                        text.add(Text.gold('✨Ovos de dragão podem ser usados ​​como catalisadores e não precisam mais ser reciclados'))
                        text.add(Text.red('⚠️Se você usar um armazém de manutenção absolutamente ultralimpo, a fórmula original poderá ser executada'))
                        if (loadedAddons.gtladd)
                            text.add(Text.gold('✨em').append(autoTierColor('max')).append(Text.gold('estágio, você pode produzir diretamente componentes infinitos correspondentes!')))
                    })

                    // ----- MAX 终压 -----
                    if (loadedAddons.gtladd) {
                        let petriDishes = ['gtlcore:eschericia_petri_dish', 'gtlcore:streptococcus_petri_dish', 'gtlcore:cupriavidus_petri_dish', 'gtlcore:shewanella_petri_dish']
                        event.addAdvanced(petriDishes, (item, advanced, text) => {
                            text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
                            text.add(Text.gold('✨em').append(autoTierColor('max')).append(Text.gold('estágio, você pode criar diretamente componentes infinitos correspondentes!')))
                        })
                        event.addAdvanced('minecraft:cow_spawn_egg', (item, advanced, text) => {
                            text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
                            text.add(Text.gold('✨em').append(autoTierColor('max')).append(Text.gold('estágio, você pode criar diretamente componentes infinitos correspondentes!')))
                        })
                        event.addAdvanced('kubejs:glacio_spirit', (item, advanced, text) => {
                            text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
                            text.add(Text.gold('✨Componentes do fragmento original do gelo infinito!'))
                        })
                        event.addAdvanced(['kubejs:leptonic_charge', 'kubejs:quantumchromodynamic_protective_plating'], (item, advanced, text) => {
                            text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
                            text.add(Text.gold('✨A bomba cromodinâmica quântica infinita original pode ser desmontada na máquina de montagem para obter os componentes infinitos correspondentes!'))
                            text.add(Text.gray('A máquina de desmontagem foi usada, é realmente ótima para você😡————G Soniden'))
                        })
                        event.addAdvanced('minecraft:dragon_egg', (item, advanced, text) => {
                            text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
                            text.add(Text.gold('✨em').append(autoTierColor('max')).append(Text.gold('estágio, você pode criar diretamente componentes infinitos correspondentes!')))
                        })
                    }
                    event.addAdvanced('avaritia:singularity', (item, advanced, text) => {
                        if (item.nbt == '{Id:"avaritia:spacetime"}') {
                            text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
                            text.add(Text.gold('✨Você pode usar um compressor de detonação elétrico para compressão direta!'))
                        }
                    })
                    if (loadedAddons.gtladd) {
                        event.addAdvanced('gtladditions:heliophase_leyline_crystallizer', (item, advanced, text) => {
                            text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
                            text.add(Text.gold('✨Nova fórmula de pó de dragão para cristais de veias de dragão'))
                        })
                        event.addAdvanced('gtladditions:heliofusion_exoticizer', (item, advanced, text) => {
                            text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
                            if (event.shift) {
                                text.add(Text.lightPurple('✨Metal líquido do hiperespaço, plasma quark-glúon de alta energia (nenhuma versão de líquido supercondutor universal), sangue de dragão, fragmentos de eco líquido, polímero Lado X líquido, elemento de nêutrons cósmicos líquidos, singularidade cósmica/fonte de sintonia líquida ouro'))
                            } else {
                                text.add(Text.gold('✨Sete novas fórmulas exclusivas foram adicionadas à alienação material. Imprensa').append(Text.lightPurple('[shift]')).append(Text.gold('para ver!')))
                            }
                            text.add(Text.gray('A maioria dessas receitas é movida do mecanismo de controle de tipo add3.0, com alguns ajustes numéricos.'))
                            if (loadedAddons.thetornproductionline) text.add(Text.gray('Se você tiver o Tear instalado, a receita do Chrono Metal pode parecer um pouco deficiente?'))
                            text.add(Text.gray('Talvez você devesse fazer dois falsos deuses?'))
                        })
                        event.addAdvanced('gtladditions:fuxi_bagua_heaven_forging_furnace', (item, advanced, text) => {
                            text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
                            let chaoticAlchemyRecipes = ''
                            let chaoticAlchemyCount = ''
                            if (loadedAddons.thetornproductionline) {
                                chaoticAlchemyRecipes = '✨Liga de Adamantium Líquido, Titânio Astral Líquido, Tungstênio Celestial Líquido, Liga de Criação Líquida, Liga Lendária Líquida, Dragão do Despertar Líquido, Segredo Celestial Líquido, Lágrima Líquida'
                                chaoticAlchemyCount = 8
                            } else {
                                chaoticAlchemyRecipes = '✨Liga de Adamantium Líquida, Titânio Astrótico Líquido, Tungstênio Celestial Líquido, Liga de Criação Líquida, Liga Lendária Líquida, Dragão Despertar Líquido'
                                chaoticAlchemyCount = 6
                            }
                            if (event.shift) {
                                text.add(Text.lightPurple(chaoticAlchemyRecipes))
                            } else {
                                text.add(Text.gold(`✨混沌炼金添加了${chaoticAlchemyCount}种新的专属配方,按`).append(Text.lightPurple('[shift]')).append(Text.gold('para ver!')))
                            }
                        })
                        if (loadedAddons.thetornproductionline) {
                            event.addAdvanced('kubejs:suprachronal_mainframe_complex', (item, advanced, text) => {
                                text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
                                text.add(Text.gold('✨Pode ser sintetizado com o módulo de dedução Tianji rasgado!'))
                                text.add(Text.gray('É recomendável que você dê uma olhada no módulo de produção em lote de circuitos mk4.'))
                            })
                            event.addAdvanced(['gtceu:lava_furnace', 'thetornproductionline:celestial_secret_deducing_creative_module'], (item, advanced, text) => {
                                text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
								text.add(Text.gold('✨A fornalha de lava agora pode usar vapor em vez de receita de lava elétrica'))
								text.add(Text.red('⚠️O conjunto de entrada deve ser usado para entrada de vapor, e o compartimento de entrada de vapor e o compartimento de entrada não podem ser usados'))
								text.add(Text.gray('Não posso correr em paralelo, não faz muito sentido'))
                                text.add(Text.gray('lenda').append(rainbowComponent('Módulo de Dedução Tianji[Criação]', 'slow')).append(Text.gray('Jogá-lo na montagem de entrada da fornalha de lava irá')).append(rainbowComponent('algo de bom acontece', 'fast')))
                            })
                        }
                    }
                    // 奇迹相关
                    event.addAdvanced('gtlcore:miracle_crystal', (item, advanced, text) => {
                        text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
                        text.add(Text.gold('✨Pode extrair diretamente milagre líquido!'))
                    })
                    event.addAdvanced('gtladditions:macro_atomic_resonant_fragment_stripper', (item, advanced, text) => {
                        text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
                        text.add(Text.gold('✨O circuito nº 24 tem uma fórmula para produzir milagres passivamente sem entrada!'))
                        text.add(Text.gray('Eu acho que você faz isso apenas pelo milagre)'))
                    })
                    event.addAdvanced('gtceu:creative_tank', (item, advanced, text) => {
                        text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
                        text.add(Text.gold('✨O circuito nº 24 pode ser usado em agentes de imersão químicos para remover todos os fluidos em uma única etapa!'))
                        text.add(Text.red('⚠️Como o fluido de saída é muito grande, ele só pode ser totalmente retirado quando a máquina estiver desligada.'))
                        text.add(Text.gray('Componentes fluidos Infinite ME podem marcar itens é realmente uma grande invenção'))
                    })

                    // ----- 泛用 适用于多个阶段 -----
                    event.addAdvanced(autoConfigurationParallelHatchList, (item, advanced, text) => {
                        text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
                        text.add(Text.gold('✨A fórmula da máquina de montagem é mais barata! O palco é mais baixo!'))
                        text.add(Text.gold('✨Você pode criar diretamente a versão configurável correspondente ao usar um novo tipo de armazém de manutenção!'))
                    })
                    if (!Ingredient.of('gtceu:large_fragment_world_collection_machine').isEmpty()) {
                        event.addAdvanced(Ingredient.of(/ad_astra:tier_.*_rocket/).or(/ad_astra_rocketed:tier_(?!7_)[^_]+_rocket/), (item, advanced, text) => {
                            text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
                            text.add(Text.gold('✨[Exclusivo para o modo Ilha] Todos os tipos de detritos podem ser disparados de uma só vez na máquina de imersão química!'))
                            text.add(blinkComponent('⚠️Você não pode usar a montagem de amostra para esta receita', 'red'))
                            text.add(Text.gray('Pode ser mais conveniente, mas é improvável que seja conveniente'))
                        })
                    }
                    event.addAdvanced(Ingredient.of('gtceu:plasma_condenser').or('gtceu:mega_vacuum_freezer').or('gtceu:cooling_tower').or('gtceu:cold_ice_freezer'), (item, advanced, text) => {
                        text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
                        text.add(Text.gold('✨Todas as receitas de condensação de plasma agora podem ser realizadas usando um freezer a vácuo!'))
                        text.add(Text.gray('Não há necessidade de construir mais duas torres de resfriamento'))
                    })
                    event.addAdvanced('gtceu:void_fluid_drilling_rig', (item, advanced, text) => {
                        text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
                        text.add(Text.gold('✨Lembra do exercício Void Fluid? Agora oferece um excelente ambiente para a furadeira!'))
                        text.add(Text.gold('✨Você só precisa inserir dados e uma plataforma de perfuração para produzir vários fluidos ao mesmo tempo com a saída de (multiplicador de plataforma * multiplicador de base de produção)!'))
                        text.add(Text.gold('✨Especialmente, a furadeira de fluido sem fim avançada não requer dados de entrada, ela pode produzir toda a saída da perfuratriz rochosa!'))
                        if (event.shift) {
                            text.add(Text.gold('--------------------Multiplicador de plataforma --------------------'))
                            text.add(Text.gold('Broca de fluido avançada: 1,5x'))
                            text.add(Text.gold('Broca Fluida Avançada II: 24x'))
                            text.add(Text.gold('Broca Fluida Avançada III: 192x'))
                            text.add(Text.gold('Plataforma de fluido infinito: 6144x'))
                            text.add(Text.gold('Equipamento infinito avançado: 447400x'))
                        } else {
                            text.add(Text.gold('✨Pressione').append(Text.lightPurple('[shift]')).append(Text.gold('Para visualizar o multiplicador da plataforma de perfuração correspondente à plataforma de perfuração!')))
                        }
                        if (event.ctrl) {
                            text.add(Text.gold('--------------------Principais dados mundiais--------------------'))
                            text.add(Text.gold('Petróleo bruto: 250\nGás: 150\nÓleo pesado: 150\nÓleo leve: 250\nÓleo: 250\nLava: 200'))
                            text.add(Text.gold('--------------------Dados de limite inferior--------------------'))
                            text.add(Text.gold('Hélio gasoso: 250\nHélio-3: 150\nRadônio gasoso: 70\nÁcido sulfúrico: 200\nDeutério gasoso: 250'))
                            text.add(Text.gold('--------------------Dados finais --------------------'))
                            text.add(Text.gold('Criptônio: 200\nNéon gasoso: 200\nRadônio gasoso: 200\nXenônio gasoso: 200\nGás: 250\nÁcido clorídrico: 250\nÁcido nítrico: 250\nFlúor gasoso: 250\nCloro gasoso: 350\nMetano gasoso: 200\nBenzeno: 100\nSubproduto de carvão: 150'))
                        } else {
                            text.add(Text.gold('✨Pressione').append(Text.yellow('[ctrl]')).append(Text.gold('para visualizar os multiplicadores de fluido e base de produção correspondentes aos dados!')))
                        }
                    })
                    event.addAdvanced(Ingredient.of(/gtmthings:.*_wireless_energy_receive_cover/).or(/gtceu:.*solar_panel/), (item, advanced, text) => {
                        text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
                        text.add(Text.gold('✨Agora pode ser produzido na linha de montagem de componentes, economizando 25% de materiais e muitos bytes!'))
                    })
                    event.addAdvanced(Ingredient.of(/gtceu:.*_laser_engraver/).or('gtceu:large_engraving_laser').or('gtceu:dimensional_focus_engraving_array').or('gtceu:engraving_laser_plant').or('gtladditions:lucid_etchdreamer'), (item, advanced, text) => {
						text.add(Text.gold('▌Mudanças de Kirin – Seção geral:'))
						text.add(Text.gold('✨A maioria das fórmulas da série de gravação a laser, exceto a gravação de gemas, agora são diferenciadas por circuitos em vez de lentes.'))
						text.add(Text.gold('✨A matriz de gravação a laser com foco dimensional não requer mais fotorresiste para gravar wafers de baixo nível e não requer mais poder de computação e pesquisa para gravar wafers de alto nível'))
						text.add(Text.gold('✨Agora, três fórmulas de gravação a laser são comuns, para que você possa mover o modelo sem dor'))
                        if(item === 'gtceu:dimensional_focus_engraving_array')text.add(Text.red('⚠️A matriz de gravação a laser com foco dimensional precisa ser vinculada ao banco de dados, independentemente de precisar ser estudada. O banco de dados vinculado deve ter qualquer compartimento de acesso a dados (pode estar vazio)'))
					})
                }

                // ============================== 核爆板块 ==============================
                if (KIRIN_CONFIG.enableGameBreakingRecipes) {
                    event.addAdvanced('gtceu:polytetrafluoroethylene_ingot', (item, advanced, text) => {
                        text.add(Text.yellow('▌Mudanças de Kirin – seção Explosão Nuclear'))
                        text.add(Text.yellow('✨1B etileno + 4B flúor gasoso = 1B tetrafluoroetileno + 4B hidrogênio gasoso'))
                    })
                    event.addAdvanced('gtceu:fission_reactor', (item, advanced, text) => {
                        text.add(Text.yellow('▌Mudanças de Kirin – seção Explosão Nuclear'))
                        text.add(Text.yellow('✨Circuito de entrada 1/2 e, em seguida, insira pó de tório e água para realizar fusão nuclear controlável sem aquecimento'))
                        text.add(Text.yellow('✨A eficiência da produção de lixo nuclear é reduzida, mas vapor/vapor supercrítico pode ser produzido'))
                        text.add(Text.yellow('✨Circuitos 1/2 correspondem a vapor/supercrítico respectivamente'))
                        text.add(Text.gray('Embora a saída tenha sido reduzida muitas vezes, o efeito especial de não aquecer e consumir energia permite que ele funcione em alto paralelismo, e a saída é, na verdade, extremamente alta.'))
                        text.add(Text.gray('O Steam realmente vai assumir o controle'))
                    })
                    event.addAdvanced('gtceu:turbine_rotor', (item, advanced, text) => {
                        if (item.nbt && item.nbt.toString().includes('neutronium')) {
                            text.add(Text.yellow('▌Mudanças de Kirin – seção Explosão Nuclear'))
                            text.add(Text.yellow('✨O rotor mais forte —— O rotor da turbina de nêutrons tem preço super reduzido e é estampado com pó de nêutrons 114.'))
                        }
                    })
                    event.addAdvanced('gtceu:gravity_hatch', (item, advanced, text) => {
                        text.add(Text.yellow('▌Mudanças de Kirin – seção Explosão Nuclear'))
                        text.add(Text.yellow('✨Monte a receita mais barata! Fazer downgrade para').append(autoTierColor('hv')))
                    })
                    event.addAdvanced(['gtceu:steel_ingot', 'gtceu:wrought_iron_ingot'], (item, advanced, text) => {
                        text.add(Text.yellow('▌Mudanças de Kirin – seção Explosão Nuclear'))
                        text.add(Text.yellow('✨Lingotes de ferro forjado agora podem ser fundidos diretamente em lingotes de aço na fornalha!'))
                    })
                    event.addAdvanced('gtceu:auto_configuration_maintenance_hatch', (item, advanced, text) => {
                        text.add(Text.yellow('▌Mudanças de Kirin – seção Explosão Nuclear'))
                        text.add(Text.yellow('✨Monte a receita mais barata! Fazer downgrade para').append(autoTierColor('hv')))
                    })
                    event.addAdvanced('gtceu:chemical_distort', (item, advanced, text) => {
                        text.add(Text.yellow('▌Mudanças de Kirin – seção Explosão Nuclear'))
                        text.add(Text.yellow('✨Quatro reviravoltas integradas adicionadas pela Gtladditions chegaram antecipadamente').append(autoTierColor('uv')).append(Text.yellow('!')))
                        text.add(Text.yellow('✨Eles são torção de borracha, torção de plástico, torção biológica, torção óptica'))
                        text.add(Text.gray('Na verdade, não há necessidade de instalar add para ter esta receita...'))
                    })
                    event.addAdvanced(['kubejs:extremely_durable_plasma_cell', 'kubejs:dense_neutron_plasma_cell', 'kubejs:cosmic_neutron_plasma_cell'], (item, advanced, text) => {
                        text.add(Text.yellow('▌Mudanças de Kirin – seção Explosão Nuclear'))
                        text.add(Text.yellow('✨Nêutrons cósmicos podem ser produzidos usando agitação ultradimensional, o que é extremamente barato!'))
                    })
                    event.addAdvanced('avaritia:crystal_matrix', (item, advanced, text) => {
                        text.add(Text.yellow('▌Mudanças de Kirin – seção Explosão Nuclear'))
                        text.add(Text.yellow('✨Pode ser extraído diretamente na matriz de cristal líquido!'))
                        text.add(Text.gray('É natural, não é?'))
                    })
                    event.addAdvanced(['gtceu:creative_data_access_hatch', 'gtceu:research_station'], (item, advanced, text) => {
                        text.add(Text.yellow('▌Mudanças de Kirin – seção Explosão Nuclear'))
                        text.add(Text.yellow('✨O preço do armazém de acesso a dados do modelo criativo foi reduzido para').append(autoTierColor('luv')))
                        text.add(Text.gray('Esta receita deve ser usada por jogadores que tenham problemas com a estação de pesquisa. Não recomendo que você use esta receita para matar aula.'))
                        text.add(Text.gray('Mas devo dizer que se divertir é o mais importante'))
                    })
                    event.addAdvanced(['avaritia:neutron_pile', 'avaritia:neutron_ingot', 'gtceu:neutronium_ingot'], (item, advanced, text) => {
                        text.add(Text.yellow('▌Mudanças de Kirin – seção Explosão Nuclear'))
                        text.add(Text.yellow('Lingotes de nêutrons pretos podem ser transformados em lingotes de nêutrons brancos usando corante branco!'))
                    })
                }
            })
        }
    } else {
        ClientEvents.loggedIn((event) => {
            let { player } = event
            player.tell(Text.red('Produto pessoal da Kirin - o script do cliente não detectou o arquivo de configuração!'))
            player.tell(Text.red('Por favor, verifique o status da instalação!'))
        })
    }
})()