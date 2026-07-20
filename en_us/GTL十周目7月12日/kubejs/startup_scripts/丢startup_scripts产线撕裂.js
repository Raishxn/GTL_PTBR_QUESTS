StartupEvents.registry('item', event =>{
    //脆弱工具
    const tools = [{tool:'crowbar',name:'crowbar',tag:'crowbars'},
                    {tool:'hammer',name:'forging hammer',tag:'hammers'},
                    {tool:'mallet',name:'Soft hammer',tag:'mallets'},
                    {tool:'saw',name:'saw',tag:'saws'},
                    {tool:'screwdriver',name:'screwdriver',tag:'screwdrivers'},
                    {tool:'wire_cutter',name:'Cord cutters',tag:'wire_cutters'},
                    {tool:'wrench',name:'wrench',tag:'wrenches'},
                    {tool:'file',name:'file',tag:'files'},
                    {tool:'knife',name:'knife',tag:'knives'}, 
                    {tool:'mortar',name:'Mortar',tag:'mortars'} ]
    tools.forEach(i=>{
        event.create('fragile_tool:fragile_'+i.tool)
        .texture('thetornproductionline:item/fragile_'+i.tool)
        .tag("forge:tools/"+i.tag)
        .displayName('fragile'+i.name)
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
        '§7fake secret module',
        '§7The first time I came into contact with Tianji, I finally failed.',
        '§7This fragile single-material shell cannot fit it',
        '§7Although you still can\'t bear the secret, you know that you are very close to success.',
        '§7Yes, the high-strength titanium withstood the bombardment of this space machine.',
        '§2Electronic extension, one step further',
        '§2High-precision electronic components have reached a realistic level',
        '§2Quantum ghost has restrained some secrets of heaven',
        '§2Use ordinary crystals to make a shelled body',
        '§dBeyond ordinary, more powerful than the mere fusion of flesh and electronics',
        '§dPut the ecology into the module and empower it with the secret',
        '§dphoton is 01. Deelectrify to check objects',
        Component.gold('Beyond technology, into magic energy'),
        Component.gold('Not just physics, but integrated into the universe'),
        Component.literal(TextUtil.full_color('Liberate the power of cause and effect, completely liberate the secrets of heaven'))
    ]
    for(let i = 0;i<tiers.length;i++)
    {
        event.create('thetornproductionline:celestial_secret_deducing_module_'+tiers[i])
        .texture('thetornproductionline:item/celestial_secret_deducing_module')
        .tag("gtceu:circuits/"+tiers[i])
        .displayName('Tianji deduction module['+tiers[i].toUpperCase()+']')
        .tooltip(Component.green(moduletip[i]))
    }
    event.create('thetornproductionline:celestial_secret_deducing_module_advanced_max')
        .texture('thetornproductionline:item/celestial_secret_deducing_module')
        .displayName('Tianji deduction module [ MAX +]')
        .tooltip(Component.literal(TextUtil.full_color('Three-dimensional expansion, breaking the limit of dimensionality expansion')))
    event.create('thetornproductionline:celestial_secret_deducing_creative_module')
        .texture('thetornproductionline:item/celestial_secret_deducing_module')
        .displayName('Tianji Deduction Module[Creation]')
        .tooltip(Component.literal(TextUtil.white_blue('I am God, God is me')))
    event.create('thetornproductionline:fusion_process_module')
        .texture('thetornproductionline:item/celestial_secret_deducing_module')
        .displayName('Fusion Processing Module')
        .tooltip(`§2LUV级模块 §7聚变伪批处理模块
            在搅拌机合成装有正常聚变配方1024倍的原料的1k流体盘
            将合出来的盘放入聚变堆 2048倍于正常聚变配方的耗时 输出正常聚变配方1024倍的产物
            可以在任务里领到样板包 请将样板包中的样板放在指定位置`)
    const moremodule=[
        {path:'hyper_excitation_module_1',name:'Super energy excitation module MK1',tip:'§2UV grade module §7only executes silica fuel + oxygen plasma formula and has 3 modes\n Circuit No. 1: Unconditionally provides 4 parallel\n Circuit 2: Provides 16 parallels but cuts fuel efficiency to 80%\n Circuit 3: Provides 64 parallels but cuts fuel efficiency to 64%\n Usage: Place the assembly of a large silica reactor (you can also pull it from stock), configure the circuit, reshape the structure, and pass in the fuel.'},
        {path:'hyper_excitation_module_2',name:'Super energy excitation module MK2',tip:'§dUEV-level module §7only executes super fuel 3 and 4 formulas. It is mandatory to consume magic gold and metastable 𬭶 plasma. It has 3 modes.\n Circuit No. 1: Unconditionally provides 4 parallel\n Circuit 2: Provides 16 parallels but cuts fuel efficiency to 80%\n Circuit 3: Provides 64 parallels but cuts fuel efficiency to 64%\n Usage: Place the super reactor assembly (you can also pull it from the inventory), configure the circuit, reshape the structure, and pass in the fuel.'},
        {path:'hyper_excitation_module_3',name:'Super energy excitation module MK3',tip:'§7OpV level module can execute any fuel recipe\n Adjusted to circuit No. 1 to provide 64 parallels unconditionally and can be used with plasma\n Usage: Place the advanced super reactor assembly (you can also pull it from the inventory), configure the circuit, reshape the structure, and pass in the fuel.'},
        {path:'black_hole_engine_module',name:'Black hole engine module',tip:'§7??? level module uses E=mc^2 as the formula to consume water and generate electricity.\n Usage: Put in the assembly of the artificial star or the heart of the universe (you can also pull it from the inventory) and pass it into the water.\n Tip: The power generated by the Heart of the Universe at one time must be less than the total power storage capacity of the grid, otherwise it will run empty. The minimum power of the black hole engine requires you to prepare 19.8B of grid power storage capacity, which is 29 digits.'},
        {path:'circult_process_module_1',name:'Circuit batch production module MK1',tip:'§2ZPM-level module §7Cheaper mass production of low-level Tianji modules'},
        {path:'circult_process_module_2',name:'Circuit batch production module MK2',tip:'§dUEV-level module §7Cheaper mass production of low-level Tianji modules'},
        {path:'circult_process_module_3',name:'Circuit batch production module MK3',tip:'§7OpV-level module §7Cheaper mass production of low-level Tianji modules'},
        {path:'circult_process_module_4',name:'Circuit batch production module MK4',tip:'§7???-level module §7Cheaper mass production of low-level Tianji modules'},
        {path:'fishbig_process_module',name:Component.literal(TextUtil.full_color('Fish building blocks')),tip:
            '§7Super??? level module I realized that Yu Da is just material.'},
        {path:'fishbig_process_module_p1',name:'Fish building block-matter engine',tip:'§7??? level module used to create large fish components'},
        {path:'fishbig_process_module_p2',name:'Fish building block-energy engine',tip:'§7??? level module used to create large fish components'},
        {path:'fishbig_process_module_p3',name:'Fish major building block-entropy change engine',tip:'§7??? level module used to create large fish components'},
        {path:'fishbig_process_module_p4',name:'Fish building block-Unknown engine',tip:'§7??? level module used to create large fish components'},
        {path:'fishbig_process_module_base',name:'Fish component module-model base',tip:'§7??? level module used to create large fish components'},
        {path:'fishbig_process_module_p5',name:'Yuda building block-overclocking engine',tip:'§7??? level module used to create large fish components'},
        {path:'fishbig_process_module_p6',name:'Fish building block-probability engine',tip:'§7??? level module used to create large fish components'},
        {path:'fishbig_process_module_p7',name:'Fish big building block-circuit engine',tip:'§7??? level module used to create large fish components'},
        {path:'fishbig_process_module_p8',name:'Big Fish Building Block-Endless Engine',tip:'§7??? level module used to create large fish components'},
        {path:'matter_refactoring_module',name:'Matter reconstruction module',tip:'§7???-level module can change the physical form at will---in the testing stage...'},
        {path:'matter_refactoring_module_2',name:'Matter reconstruction module type 2',tip:'§7???-level module can change the physical form at will---in the testing stage...'},
        {path:'fission_reactor_module',name:'High speed fission module',tip:'§2Level IV module executes fission recipes at high speed'},
        {path:'neutron_activator_module',name:'High speed neutron activation module',tip:'§2LUV level module executes neutron activation formula at high speed'}]

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
