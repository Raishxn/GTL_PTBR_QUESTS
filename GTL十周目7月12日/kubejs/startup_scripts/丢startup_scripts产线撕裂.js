StartupEvents.registry('item', event =>{
    //脆弱工具
    const tools = [{tool:'crowbar',name:'pé de cabra',tag:'crowbars'},
                    {tool:'hammer',name:'martelo de forjamento',tag:'hammers'},
                    {tool:'mallet',name:'Martelo macio',tag:'mallets'},
                    {tool:'saw',name:'serra',tag:'saws'},
                    {tool:'screwdriver',name:'chave de fenda',tag:'screwdrivers'},
                    {tool:'wire_cutter',name:'Cortadores de cabo',tag:'wire_cutters'},
                    {tool:'wrench',name:'chave inglesa',tag:'wrenches'},
                    {tool:'file',name:'arquivo',tag:'files'},
                    {tool:'knife',name:'faca',tag:'knives'}, 
                    {tool:'mortar',name:'Argamassa',tag:'mortars'} ]
    tools.forEach(i=>{
        event.create('fragile_tool:fragile_'+i.tool)
        .texture('thetornproductionline:item/fragile_'+i.tool)
        .tag("forge:tools/"+i.tag)
        .displayName('frágil'+i.name)
        .food(food => {
                   food.hunger(20)          // 回满20点饥饿值
                   .saturation(20.0)     // 回满20点饱和度
                   .alwaysEdible()       // 无视当前饱食度，随时能吃
                   // 附加10分钟饱和效果(等级0=基础饱和，无副作用)
                   .effect('minecraft:saturation', 6000, 0, 1.0);
            })
    })
    const tiers = ["ulv", "lv", "mv", "hv", "ev", "iv", "luv", "zpm", "uv", "uhv", "uev", "uiv", "uxv", "opv", "max"]
    const moduletip = 
    [
        'Módulo secreto falso §7',
        '§7A primeira vez que entrei em contato com Tianji, finalmente falhei.',
        '§7Este frágil invólucro de material único não cabe nele',
        '§7Embora ainda não consiga suportar o segredo, você sabe que está muito perto do sucesso.',
        '§7Sim, o titânio de alta resistência resistiu ao bombardeio desta máquina espacial.',
        'Extensão eletrônica §2, um passo adiante',
        '§2Componentes eletrônicos de alta precisão atingiram um nível realista',
        '§2O fantasma quântico restringiu alguns segredos do céu',
        '§2Use cristais comuns para fazer um corpo com casca',
        '§dAlém do comum, mais poderoso do que a mera fusão de carne e eletrônicos',
        '§dColoque a ecologia no módulo e capacite-o com o segredo',
        'O fóton §dé 01. Deseletrifique para verificar objetos',
        Component.gold('Além da tecnologia, em energia mágica'),
        Component.gold('Não apenas física, mas integrada ao universo'),
        Component.literal(TextUtil.full_color('Libere o poder de causa e efeito, libere completamente os segredos do céu'))
    ]
    for(let i = 0;i<tiers.length;i++)
    {
        event.create('thetornproductionline:celestial_secret_deducing_module_'+tiers[i])
        .texture('thetornproductionline:item/celestial_secret_deducing_module')
        .tag("gtceu:circuits/"+tiers[i])
        .displayName('Módulo de dedução Tianji['+tiers[i].toUpperCase()+']')
        .tooltip(Component.green(moduletip[i]))
    }
    event.create('thetornproductionline:celestial_secret_deducing_module_advanced_max')
        .texture('thetornproductionline:item/celestial_secret_deducing_module')
        .displayName('Módulo de dedução Tianji [ MAX +]')
        .tooltip(Component.literal(TextUtil.full_color('Expansão tridimensional, quebrando o limite da expansão da dimensionalidade')))
    event.create('thetornproductionline:celestial_secret_deducing_creative_module')
        .texture('thetornproductionline:item/celestial_secret_deducing_module')
        .displayName('Módulo de Dedução Tianji[Criação]')
        .tooltip(Component.literal(TextUtil.white_blue('Eu sou Deus, Deus sou eu')))
    event.create('thetornproductionline:fusion_process_module')
        .texture('thetornproductionline:item/celestial_secret_deducing_module')
        .displayName('Módulo de processamento de fusão')
        .tooltip(`§2LUV级模块 §7聚变伪批处理模块
            在搅拌机合成装有正常聚变配方1024倍的原料的1k流体盘
            将合出来的盘放入聚变堆 2048倍于正常聚变配方的耗时 输出正常聚变配方1024倍的产物
            可以在任务里领到样板包 请将样板包中的样板放在指定位置`)
    const moremodule=[
        {path:'hyper_excitation_module_1',name:'Módulo de excitação de superenergia MK1',tip:'O módulo de grau UV §2§7executa apenas a fórmula de combustível de sílica + plasma de oxigênio e possui 3 modos\n Circuito nº 1: fornece incondicionalmente 4 circuitos paralelos\n Circuito 2: Fornece 16 paralelos, mas reduz a eficiência de combustível para 80%\n Circuito 3: Fornece 64 paralelos, mas reduz a eficiência de combustível para 64%\n Utilização: Montar um grande reator de sílica (você também pode retirá-lo do estoque), configurar o circuito, remodelar a estrutura e passar o combustível.'},
        {path:'hyper_excitation_module_2',name:'Módulo de excitação de superenergia MK2',tip:'§dO módulo de nível UEV §7executa apenas fórmulas de supercombustível 3 e 4. É obrigatório consumir ouro mágico e plasma 𬭶 metaestável. Possui 3 modos.\n Circuito nº 1: fornece incondicionalmente 4 circuitos paralelos\n Circuito 2: Fornece 16 paralelos, mas reduz a eficiência de combustível para 80%\n Circuito 3: Fornece 64 paralelos, mas reduz a eficiência de combustível para 64%\n Uso: Coloque o conjunto do super reator (você também pode retirá-lo do inventário), configure o circuito, remodele a estrutura e passe o combustível.'},
        {path:'hyper_excitation_module_3',name:'Módulo de excitação de superenergia MK3',tip:'O módulo de nível §7OpV pode executar qualquer receita de combustível\n Ajustado ao circuito nº 1 para fornecer 64 paralelos incondicionalmente e pode ser usado com plasma\n Uso: Coloque o conjunto avançado do super reator (você também pode retirá-lo do inventário), configure o circuito, remodele a estrutura e passe o combustível.'},
        {path:'black_hole_engine_module',name:'Módulo do motor do buraco negro',tip:'§7??? O módulo de nível usa E = mc ^ 2 como fórmula para consumir água e gerar eletricidade.\n Uso: Coloque na montagem a estrela artificial ou o coração do universo (você também pode retirá-lo do inventário) e passe na água.\n Dica: A energia gerada pelo Coração do Universo de uma só vez deve ser menor que a capacidade total de armazenamento de energia da rede, caso contrário ela ficará vazia. A potência mínima do motor do buraco negro exige que você prepare 19,8B de capacidade de armazenamento de energia da rede, ou seja, 29 dígitos.'},
        {path:'circult_process_module_1',name:'Módulo de produção em lote de circuito MK1',tip:'§2Módulo de nível ZPM §7Produção em massa mais barata de módulos Tianji de baixo nível'},
        {path:'circult_process_module_2',name:'Módulo de produção em lote de circuito MK2',tip:'§dMódulo de nível UEV §7Produção em massa mais barata de módulos Tianji de baixo nível'},
        {path:'circult_process_module_3',name:'Módulo de produção em lote de circuito MK3',tip:'§7Módulo de nível OpV §7Produção em massa mais barata de módulos Tianji de baixo nível'},
        {path:'circult_process_module_4',name:'Módulo de produção em lote de circuito MK4',tip:'Módulo de nível §7??? §7Produção em massa mais barata de módulos Tianji de baixo nível'},
        {path:'fishbig_process_module',name:Component.literal(TextUtil.full_color('Blocos de construção de peixes')),tip:
            '§7Super??? módulo de nível, percebi que Yu Da é apenas material.'},
        {path:'fishbig_process_module_p1',name:'Motor de bloco de construção de peixes',tip:'§7??? módulo de nível usado para criar grandes componentes de peixe'},
        {path:'fishbig_process_module_p2',name:'Motor de energia de bloco de construção de peixes',tip:'§7??? módulo de nível usado para criar grandes componentes de peixe'},
        {path:'fishbig_process_module_p3',name:'Fish principal mecanismo de mudança de entropia de blocos de construção',tip:'§7??? módulo de nível usado para criar grandes componentes de peixe'},
        {path:'fishbig_process_module_p4',name:'Bloco de construção de peixe - motor desconhecido',tip:'§7??? módulo de nível usado para criar grandes componentes de peixe'},
        {path:'fishbig_process_module_base',name:'Base de modelo de módulo de componente de peixe',tip:'§7??? módulo de nível usado para criar grandes componentes de peixe'},
        {path:'fishbig_process_module_p5',name:'Motor de overclocking de bloco de construção Yuda',tip:'§7??? módulo de nível usado para criar grandes componentes de peixe'},
        {path:'fishbig_process_module_p6',name:'Mecanismo de probabilidade de blocos de construção de peixes',tip:'§7??? módulo de nível usado para criar grandes componentes de peixe'},
        {path:'fishbig_process_module_p7',name:'Motor de circuito de bloco de construção grande de peixe',tip:'§7??? módulo de nível usado para criar grandes componentes de peixe'},
        {path:'fishbig_process_module_p8',name:'Motor Big Fish Building Block-Endless',tip:'§7??? módulo de nível usado para criar grandes componentes de peixe'},
        {path:'matter_refactoring_module',name:'Módulo de reconstrução de matéria',tip:'O módulo de nível §7??? pode alterar a forma física à vontade --- na fase de teste...'},
        {path:'matter_refactoring_module_2',name:'Módulo de reconstrução de matéria tipo 2',tip:'O módulo de nível §7??? pode alterar a forma física à vontade --- na fase de teste...'},
        {path:'fission_reactor_module',name:'Módulo de fissão de alta velocidade',tip:'Módulo §2Nível IV executa receitas de fissão em alta velocidade'},
        {path:'neutron_activator_module',name:'Módulo de ativação de nêutrons de alta velocidade',tip:'O módulo de nível LUV §2executa fórmula de ativação de nêutrons em alta velocidade'}]

        moremodule.forEach(i => {event.create('thetornproductionline:'+i.path)
            .texture('thetornproductionline:item/celestial_secret_deducing_module')
            .displayName(i.name)
            .tooltip(i.tip)})

})
GTCEuStartupEvents.registry("gtceu:element", event => {
    event.create("tear", 7, 7, -1, null, "T", false)
    event.create("celestial_secret" , 9 , 9 , -1 , null, "Ct", false)
    event.create("instability" , 16 , 16 , -3 , null, "?", false)
})
GTCEuStartupEvents.registry("gtceu:material", event => {
    event.create('tear')
     .color(0x000000)
     .secondaryColor(0x888888)
     .element(GTElements.get("tear"))
     .iconSet(GTMaterialIconSet.METALLIC)
     .ingot()
      .flags(
            GTMaterialFlags.GENERATE_PLATE,
            GTMaterialFlags.GENERATE_BOLT_SCREW,
            GTMaterialFlags.GENERATE_FRAME,
            GTMaterialFlags.GENERATE_ROD,
            GTMaterialFlags.GENERATE_GEAR,
            GTMaterialFlags.GENERATE_SMALL_GEAR,
            GTMaterialFlags.GENERATE_FINE_WIRE,
            GTMaterialFlags.GENERATE_SPRING
        )
    .fluid()
    .plasma()
    
    event.create('instability')
     .color(0x000000)
     .secondaryColor(0xffffff)
     .element(GTElements.get("instability"))
     .iconSet(GTMaterialIconSet.DULL)
     .ingot()
      .flags(
            GTMaterialFlags.GENERATE_PLATE,
            GTMaterialFlags.GENERATE_BOLT_SCREW,
            GTMaterialFlags.GENERATE_FRAME,
            GTMaterialFlags.GENERATE_ROD,
            GTMaterialFlags.GENERATE_GEAR,
            GTMaterialFlags.GENERATE_SMALL_GEAR,
            GTMaterialFlags.GENERATE_FINE_WIRE,
            GTMaterialFlags.GENERATE_SPRING)
    .cableProperties(13, 2147483647, 0, true)
    .fluid()
    .plasma()
    event.create('celestial_secret')
     .color(0xffffff)
     .secondaryColor(0x888888)
     .element(GTElements.get("celestial_secret"))
     .iconSet(GTMaterialIconSet.METALLIC)
     .ingot()
      .flags(
            GTMaterialFlags.GENERATE_PLATE,
            GTMaterialFlags.GENERATE_BOLT_SCREW,
            GTMaterialFlags.GENERATE_FRAME,
            GTMaterialFlags.GENERATE_ROD,
            GTMaterialFlags.GENERATE_GEAR,
            GTMaterialFlags.GENERATE_SMALL_GEAR,
            GTMaterialFlags.GENERATE_FINE_WIRE,
            GTMaterialFlags.GENERATE_SPRING
        )
    .fluid()
    .plasma()
})
const $CoilWorkableElectricMultiblockMachine = Java.loadClass("com.gregtechceu.gtceu.api.machine.multiblock.CoilWorkableElectricMultiblockMachine")
const $NumberUtils = Java.loadClass("org.gtlcore.gtlcore.utils.NumberUtils")
GTCEuStartupEvents.registry('gtceu:machine',event=>{
     event.create("advanced_chemical_distort", "multiblock", (holder) => new $CoilWorkableElectricMultiblockMachine(holder))
        .rotationState(RotationState.ALL)
        .recipeType("distort")
        .recipeModifiers([(machine, recipe) => GTRecipeModifiers.accurateParallel(machine, recipe, 2147483647, false).getFirst(), GTRecipeModifiers.ELECTRIC_OVERCLOCK.apply(OverclockingLogic.PERFECT_OVERCLOCK)])
        .appearanceBlock(GTBlocks.CASING_PTFE_INERT)
        .pattern((definition) =>
        FactoryBlockPattern.start()
                .aisle('AAA','AAA','AAA')
                .aisle('AAA','AEA','AAA')
                .aisle('AAA','A~A','AAA')
                .where("~", Predicates.controller(Predicates.blocks(definition.get())))//控制中心
                .where("A", Predicates.blocks("gtceu:inert_machine_casing")
                    .or(Predicates.abilities(PartAbility.IMPORT_ITEMS).setPreviewCount(1))
                    .or(Predicates.abilities(PartAbility.EXPORT_ITEMS).setPreviewCount(1))
                    .or(Predicates.abilities(PartAbility.IMPORT_FLUIDS).setPreviewCount(1))
                    .or(Predicates.abilities(PartAbility.EXPORT_FLUIDS).setPreviewCount(1))
                    .or(Predicates.abilities(PartAbility.MAINTENANCE).setExactLimit(1))
                    .or(Predicates.abilities(PartAbility.INPUT_LASER).setPreviewCount(1)))
                .where("E", Predicates.heatingCoils())
                .build())
        .beforeWorking((machine, recipe) => {
            if (recipe.data.getInt("ebf_temp") <= machine.getCoilType().getCoilTemperature()) {
                return true
            }
            machine.getRecipeLogic().interruptRecipe()
            return false
        })
        .additionalDisplay((controller, components) => {
            if (controller.isFormed()) {
                components.add(Component.translatable("gtceu.multiblock.blast_furnace.max_temperature", Text.of($NumberUtils.formatLong(controller.getCoilType().getCoilTemperature()) + "K").red()))
            }
        })
        .workableCasingRenderer("gtceu:block/casings/solid/machine_casing_inert_ptfe", "gtceu:block/multiblock/fusion_reactor") 
        event.create("steel_plant", "multiblock")
        .rotationState(RotationState.ALL)
        .recipeType("bender")
        .recipeType("compressor")
        .recipeType("forge_hammer")
        .recipeType("cutter")
        .recipeType("extruder")
        .recipeType("lathe")
        .recipeType("wiremill")
        .recipeType("forming_press")
        .recipeType("polarizer")
        .recipeType("laser_engraver")
        .recipeType("fluid_solidifier")
        .recipeType("centrifuge")
        .recipeType("thermal_centrifuge")
        .recipeType("electrolyzer")
        .recipeType("sifter")
        .recipeType("macerator")
        .recipeType("extractor")
        .recipeType("chemical_reactor")
        .recipeType("mixer")
        .recipeType("chemical_bath")
        .recipeType("ore_washer")
        .recipeType("assembler")
        .recipeType("circuit_assembler")
        .recipeModifiers(GTRecipeModifiers.ELECTRIC_OVERCLOCK.apply(OverclockingLogic.PERFECT_OVERCLOCK))
        .appearanceBlock(GTBlocks.CASING_STEEL_SOLID)
            .pattern(definition => FactoryBlockPattern.start()
            .aisle("AAA", "AAA", "AAA")
            .aisle("AAA", "A A", "AAA")
            .aisle("AAA", "ABA", "AAA")
            .where("B", Predicates.controller(Predicates.blocks(definition.get())))
            .where("A", Predicates.blocks(Registries.getBlock("gtceu:solid_machine_casing"))
            .or(Predicates.autoAbilities(definition.getRecipeTypes()))
            .or(Predicates.abilities(PartAbility.MAINTENANCE).setExactLimit(1)))
            .where(" ", Predicates.air())
        .build())
        .workableCasingRenderer('gtceu:block/casings/solid/machine_casing_solid_steel',
        'gtceu:block/multiblock/electric_blast_furnace')
})
