// priority: 95
// 本文件按功能保存配方阶段，实际执行顺序统一由配方入口管理。

// 原矿分离、铂泥浸出及常用化学原料合成。
global.gtlPack.register("custom_raw_materials", event => {
    const gtr = event.recipes.gtceu
    gtr.large_chemical_reactor('kubejs:indium_dust_from_lead_zinc')
        .itemInputs('8x gtceu:lead_dust', '8x gtceu:zinc_dust')
        .inputFluids("gtceu:sulfuric_acid 8000")
        .itemOutputs('gtceu:indium_dust')
        .outputFluids('gtceu:lead_zinc_solution 8000')
        .EUt(8192).duration(200).circuit(4)
    const simpleCentrifuges = [
        { input: 'gtceu:raw_sphalerite', output: 'gtceu:gallium_dust', id: 'kubejs:gallium_from_sphalerite' },
        { input: 'gtceu:raw_realgar', output: 'gtceu:arsenic_dust', id: 'kubejs:arsenic_from_realgar' },
        { input: 'gtceu:raw_pyrolusite', output: 'gtceu:manganese_dust', id: 'kubejs:manganese_from_pyrolusite' },
        { input: 'gtceu:raw_tricalcium_phosphate', output: 'gtceu:phosphorus_dust', id: 'kubejs:phosphorus_from_tricalcium_phosphate' }
    ]
    simpleCentrifuges.forEach(recipe => {
        gtr.centrifuge(recipe.id)
            .itemInputs(recipe.input)
            .itemOutputs(recipe.output)
            .EUt(8).duration(200).circuit(3)
    })
    event.smelting('minecraft:coal', 'gtceu:coal_dust', 0.1).id('kubejs:coal_from_dust')
    
    // 铂系污泥：两种矿粉硝酸浸出
    ;
    ['cooperite_dust', 'bornite_dust'].forEach(dust => {
        const baseName = dust.split('_')[0]
        gtr.chemical_reactor(`kubejs:platinum_sludge_from_${baseName}`)
            .itemInputs(`gtceu:${dust}`)
            .inputFluids("gtceu:nitric_acid 100")
            .itemOutputs('gtceu:platinum_group_sludge_dust')
            .outputFluids('gtceu:sulfuric_copper_solution 100')
            .EUt(30).duration(200)
    })
    gtr.chemical_reactor('kubejs:uranium_sulfate_from_uraninite')
        .itemInputs('gtceu:uraninite_dust')
        .inputFluids("gtceu:sulfuric_acid 1000")
        .outputFluids('gtceu:uranium_sulfate_waste_solution 1000')
        .EUt(2048).duration(200).circuit(24)
    gtr.chemical_reactor('kubejs:boron_fluoride_synthesis')
        .itemInputs('gtceu:boron_dust')
        .inputFluids('gtceu:fluorine 100')
        .outputFluids('gtceu:boron_fluoride 1000')
        .duration(200).EUt(30)
    gtr.chemical_reactor('kubejs:trifluoroacetic_phosphate_ester_from_sodium_ethylate')
        .itemInputs('gtceu:sodium_ethylate_dust')
        .inputFluids("gtceu:hydrochloric_acid 100")
        .itemOutputs('gtceu:trifluoroacetic_phosphate_ester_dust')
        .EUt(30).duration(200)
    gtr.chemical_reactor('kubejs:actinium_radium_nitrate_from_trinium')
        .itemInputs('gtceu:trinium_dust')
        .inputFluids("gtceu:nitric_acid 1000")
        .outputFluids('gtceu:actinium_radium_nitrate_solution 10')
        .EUt(30).duration(200)
    gtr.mixer('kubejs:taranium_rich_liquid_helium_from_stone_dust')
        .inputFluids('gtceu:sodium_hydroxide_solution 1000', 'gtceu:tritium_hydride 1000')
        .itemInputs('gtceu:stone_dust')
        .outputFluids('gtceu:taranium_rich_liquid_helium_4 60')
        .duration(200).EUt(30).circuit(3)
})

// 提取橡胶并以整组种子批量榨油。
global.gtlPack.register("custom_resource_extraction", event => {
    const gtr = event.recipes.gtceu
    gtr.extractor('kubejs:rubber_plate_to_rubber')
        .itemInputs('gtceu:rubber_plate')
        .outputFluids('gtceu:rubber 144')
        .duration(100).EUt(30)
    gtr.extractor('kubejs:seed_oil_from_tag_seeds_bulk')
        .itemInputs('640x #forge:seeds')
        .outputFluids('gtceu:seed_oil 6400')
        .EUt(GTValues.VA[GTValues.MV])
        .duration(200)
})

// 精炼金属中间体并合成高分子、碳材料与先进化学流体。
global.gtlPack.register("custom_chemical_materials", event => {
    const gtr = event.recipes.gtceu
    gtr.chemical_reactor("kubejs:trinium_sulfide_dust")
        .itemInputs("5x gtceu:sodium_dust")
        .inputFluids("gtceu:xenon_hexafluoro_enriched_naquadate 1000")
        .itemOutputs("gtceu:trinium_sulfide_dust")
        .EUt(GTValues.VA[GTValues.EV])
        .duration(400)
    gtr.chemical_bath("kubejs:naquadria_sulfate_dust")
        .itemInputs("12x gtceu:sodium_hydroxide_dust")
        .inputFluids("gtceu:impure_naquadria_solution 2000")
        .itemOutputs("gtceu:naquadria_sulfate_dust")
        .EUt(GTValues.VA[GTValues.EV])
        .duration(400)
    gtr.chemical_reactor("kubejs:hafnium_oxide_dust")
        .itemInputs("6x gtceu:ammonium_chloride_dust", "6x gtceu:potassium_hydroxide_dust", "15x gtceu:hematite_dust")
        .inputFluids("gtceu:sulfur_trioxide 6000", "gtceu:zirconiu_hafnium_oxychloride 3000")
        .itemOutputs("20x gtceu:hafnium_oxide_dust")
        .EUt(GTValues.VA[GTValues.EV])
        .duration(400)
    gtr.distort("kubejs:polyimide")
        .itemInputs("1x minecraft:glowstone", "486x gtceu:carbon_dust")
        .inputFluids("gtceu:hydrogen 256000", "gtceu:nitrogen_dioxide 64000")
        .outputFluids("gtceu:polyimide 21000", "gtceu:hydrogen 12800", "gtceu:nitrogen 6400")
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(800)
        .blastFurnaceTemp(1800)
        .cleanroom(CleanroomType.CLEANROOM)
    gtr.distort("kubejs:polyetheretherketone")
        .itemInputs("1x minecraft:redstone_block", "16x gtceu:sodium_dust")
        .inputFluids("gtceu:chlorine 48000", "gtceu:benzene 16000", "gtceu:oxygen 60000", "gtceu:propene 8000", "gtceu:nitric_acid 8000")
        .itemOutputs("32x gtceu:sodium_fluoride_dust")
        .outputFluids("gtceu:polyetheretherketone 20700", "minecraft:water 8000", "gtceu:carbon_dioxide 8000")
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(800)
        .blastFurnaceTemp(1800)
        .cleanroom(CleanroomType.CLEANROOM)
    gtr.chemical_reactor("kubejs:alumina_dust")
        .itemInputs("gtceu:aluminium_dust")
        .inputFluids("gtceu:oxygen 1000")
        .itemOutputs("gtceu:alumina_dust")
        .EUt(GTValues.VA[GTValues.EV])
        .duration(400)
    gtr.distort("kubejs:zirconium_dust")
        .itemInputs("1x gtceu:osmium_block", "1152x gtceu:zircon_dust", "64x gtceu:potassium_dust")
        .inputFluids("gtceu:chlorine 512000", "gtceu:hydrogen 256000", "gtceu:sulfur_trioxide 64000")
        .itemOutputs("64x gtceu:zirconium_dust", "48x gtceu:hafnium_dust", "448x gtceu:potassium_sulfate_dust")
        .outputFluids("gtceu:hydrochloric_acid 512000")
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(800)
        .blastFurnaceTemp(1800)
        .cleanroom(CleanroomType.CLEANROOM)
    gtr.distort("kubejs:cycloparaphenylene")
        .itemInputs("1x gtceu:osmium_block", "1920x gtceu:carbon_dust", "64x gtceu:iodine_dust")
        .inputFluids("gtceu:hydrogen 640000", "gtceu:oxygen 96000", "gtceu:chlorine 96000", "gtceu:fluorine 96000")
        .outputFluids("gtceu:cycloparaphenylene 32000", "gtceu:fluorine 4800", "gtceu:chlorine 3200")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(200)
        .blastFurnaceTemp(1800)
        .cleanroom(CleanroomType.CLEANROOM)
    gtr.distort("kubejs:unfolded_fullerene_dust")
        .itemInputs("256x minecraft:ender_pearl", "3780x gtceu:carbon_dust")
        .inputFluids("gtceu:methane 60000", "gtceu:bromine 60000", "gtceu:nitrogen 60000")
        .itemOutputs("64x gtceu:unfolded_fullerene_dust")
        .outputFluids("gtceu:hydrobromic_acid 60000")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(3200)
        .blastFurnaceTemp(1800)
        .cleanroom(CleanroomType.CLEANROOM)
    global.gtlPack.batch(gtr, "distort", ["itemInputs", "inputFluids", "outputFluids", ["EUt", GTValues.VA[GTValues.UIV]], "duration", ["blastFurnaceTemp", 1800], ["cleanroom", CleanroomType.CLEANROOM]], [
        ["kubejs:polyurethaneresin", ["1x minecraft:gold_block", "45x gtceu:tin_dust", "64x gtceu:carbon_dust", "5x gtceu:nickel_dust", "5x gtceu:palladium_dust", "5x gtceu:iron_dust", "36x gtceu:silicon_dust"], ["gtceu:oxygen 1964000", "gtceu:hydrogen 529000", "gtceu:chlorine 870000", "gtceu:nitrogen 45000"], ["gtceu:polyurethaneresin 45000"], [270]],
        ["kubejs:liquidcrystalkevlar", ["5x gtceu:rhenium_block", "1x gtceu:annealed_copper_block", "64x gtceu:carbon_dust", "2x gtceu:calcium_dust"], ["gtceu:hydrogen 100000", "gtceu:chlorine 16000", "gtceu:oxygen 18000", "gtceu:nitrogen 18000"], ["gtceu:liquidcrystalkevlar 45000"], [400]]
    ]);
})

// 合成高能炸药、含镓稀土氟化物和富勒烯聚合物浆。
global.gtlPack.register("custom_advanced_materials", event => {
    const gtr = event.recipes.gtceu
    gtr.distort("kubejs:hexanitrohexaaxaisowurtzitane_dust")
        .itemInputs("5x gtceu:orichalcum_block", "16x gtceu:gravi_star", "191x gtceu:silica_gel_dust", "76x gtceu:succinic_acid_dust", "144x gtceu:activated_carbon_dust", "216x gtceu:sodium_dust", "47x gtceu:boron_trioxide_dust", "39x gtceu:potassium_carbonate_dust", "101x gtceu:barium_chloride_dust")
        .inputFluids("gtceu:hydrogen 470000", "gtceu:hydrofluoric_acid 12000", "gtceu:methanol 62000", "gtceu:nitric_acid 15000", "gtceu:ammonia 39000", "gtceu:glyoxal 47000", "gtceu:oxygen_plasma 11000", "gtceu:acetic_anhydride 9000", "gtceu:nitrogen_plasma 7000")
        .itemOutputs("288x gtceu:hexanitrohexaaxaisowurtzitane_dust")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(5120)
        .blastFurnaceTemp(1800)
        .cleanroom(CleanroomType.CLEANROOM)
    gtr.lightning_processor("kubejs:naquadah_contain_rare_earth_fluoride_dust")
        .itemInputs("gtceu:alunite_dust")
        .inputFluids("gtceu:rare_earth_chlorides 60000", "gtceu:hydrofluoric_acid 2000")
        .itemOutputs("gtceu:naquadah_contain_rare_earth_fluoride_dust")
        .outputFluids("gtceu:hydrochloric_acid 2000")
        .EUt(GTValues.VA[GTValues.UV])
        .duration(400)
    gtr.distort("kubejs:fullerene_polymer_matrix_pulp_dust")
        .itemInputs("16x gtceu:fullerene_dust", "8x gtceu:palladium_dust")
        .inputFluids("gtceu:nitrogen 15000", "gtceu:hydrogen 73000", "gtceu:oxygen 13000")
        .itemOutputs("gtceu:fullerene_polymer_matrix_pulp_dust")
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(400)
        .blastFurnaceTemp(1800)
        .cleanroom(CleanroomType.CLEANROOM)
})

// 合成多环芳烃混合物。
global.gtlPack.register("custom_aromatic_mixture", event => {
    const gtr = event.recipes.gtceu
    gtr.distort("kubejs:polycyclic_aromatic_mixture_dust")
        .itemInputs("16x gtceu:magnesium_dust", "141x gtceu:carbon_dust", "120x gtceu:quicklime_dust")
        .inputFluids("gtceu:oxygen 8000", "gtceu:chlorine 68000", "gtceu:methanol 16000", "gtceu:naphthalene 12000", "gtceu:propene 4000", "minecraft:water 24000")
        .itemOutputs("12x gtceu:polycyclic_aromatic_mixture_dust")
        .outputFluids("gtceu:hydrogen 4000", "gtceu:acetone 4000")
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(800)
        .blastFurnaceTemp(1800)
        .cleanroom(CleanroomType.CLEANROOM)
})

// 合成宇宙超导体，保留法务无尘室条件。
global.gtlPack.register("custom_cosmic_superconductor", event => {
    const gtr = event.recipes.gtceu
    gtr.distort("kubejs:cosmic_superconductor")
        .itemInputs("gtceu:phosphorus_dust", "18x gtceu:sulfur_dust", "6x gtceu:sodium_dust", "gtceu:thallium_dust", "6x gtceu:rhenium_chloride_dust", "5x gtceu:hassium_chloride_dust", "36x gtceu:atinium_hydride_dust", "14x gtceu:charged_caesium_cerium_cobalt_indium_dust")
        .inputFluids("gtceu:chlorine 34000", "gtceu:fluorine 3000", "gtceu:ethylene 12000", "gtceu:oxygen 46000", "gtceu:hydrogen 102000", "gtceu:uu_matter 2000", "gtceu:quark_gluon_plasma 17000", "gtceu:benzene 3000", "gtceu:acetone 6000")
        .outputFluids("gtceu:cosmic_superconductor 10000")
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(4000)
        .blastFurnaceTemp(1800)
        .cleanroom(GTLCleanroomType.LAW_CLEANROOM)
})

// 将三钛粉与硝酸加工为钫粉。
global.gtlPack.register("custom_francium", event => {
    const gtr = event.recipes.gtceu
    gtr.distort("kubejs:francium_dust")
        .itemInputs("gtceu:trinium_dust")
        .inputFluids("gtceu:nitric_acid 1000")
        .itemOutputs("gtceu:francium_dust")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(800)
        .blastFurnaceTemp(1800)
})

// 离心重顺磁残留物，回收六种元素粉。
global.gtlPack.register("custom_heavy_residues", event => {
    const gtr = event.recipes.gtceu
    gtr.centrifuge("kubejs:heavy_paramagnetic_residues_input")
        .itemInputs("30x gtceu:heavy_paramagnetic_residues_dust")
        .itemOutputs("gtceu:thorium_dust", "gtceu:uranium_235_dust", "gtceu:tungsten_dust", "gtceu:hafnium_dust", "gtceu:tantalum_dust", "gtceu:thallium_dust")
        .EUt(GTValues.VA[GTValues.LV])
        .duration(800)
})

// 以固定消耗的铀蜂群合成超稳定自修复胶。
global.gtlPack.register("custom_self_healing_adhesive", event => {
    const gtr = event.recipes.gtceu
    gtr.qft("kubejs:hyper_stable_self_healing_adhesive")
        .itemInputs("gtceu:uruium_nanoswarm", "64x gtceu:activated_carbon_dust", "64x gtceu:bismuth_dust")
        .inputFluids("gtceu:oxygen 20000", "gtceu:hydrogen 20000")
        .itemOutputs("4x kubejs:hyper_stable_self_healing_adhesive")
        .EUt(4 * GTValues.VA[GTValues.MAX])
        .duration(20)
})

// 以固定消耗的铀蜂群合成黑体超固态材料。
global.gtlPack.register("custom_black_body_material", event => {
    const gtr = event.recipes.gtceu
    gtr.qft("kubejs:black_body_naquadria_supersolid")
        .itemInputs("gtceu:uruium_nanoswarm", "64x gtceu:naquadria_dust", "64x gtceu:magnesium_dust")
        .inputFluids("gtceu:phosphoric_acid 20000", "gtceu:sulfuric_acid 20000")
        .itemOutputs("4x kubejs:black_body_naquadria_supersolid")
        .EUt(4 * GTValues.VA[GTValues.MAX])
        .duration(20)
})
