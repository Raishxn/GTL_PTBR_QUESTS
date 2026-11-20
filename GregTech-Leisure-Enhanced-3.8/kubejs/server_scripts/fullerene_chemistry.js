// priority: 95
// 富勒烯、超重元素、芳纶、星辉与混沌材料。
// 由 gtceu.js 按既有阶段顺序执行，本文件只登记配方，不依赖文件名排序。
global.gtlPack.register("fullerene_chemistry", event => {
    const gtr = event.recipes.gtceu;
    const batch = global.gtlPack.batch;

    // 富勒烯
    gtr.large_chemical_reactor("gtceu:methylbenzophenanthrene_dust")
        .notConsumable("gtceu:iodine_dust")
        .inputFluids("gtceu:naphthalene 1000", "gtceu:formaldehyde 1000", "gtceu:oxygen 1000", "gtceu:ethylbenzene 1000")
        .itemOutputs("33x gtceu:methylbenzophenanthrene_dust").EUt(1920).duration(600)

    gtr.large_chemical_reactor("gtceu:unfolded_fullerene_dust")
        .notConsumable("gtceu:titanium_dust").notConsumable("gtceu:aluminium_dust").notConsumableFluid("gtceu:chlorine 1000")
        .itemInputs("102x gtceu:benzophenanthrenylacetonitrile_dust").itemOutputs("gtceu:unfolded_fullerene_dust").EUt(7680).duration(250)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.large_chemical_reactor("gtceu:benzophenanthrenylacetonitrile_dust")
        .itemInputs("33x gtceu:methylbenzophenanthrene_dust", "12x gtceu:bromo_succinimide_dust", "3x gtceu:potassium_cyanide_dust")
        .itemOutputs("34x gtceu:benzophenanthrenylacetonitrile_dust", "12x gtceu:succinimide_dust", "2x gtceu:potassium_bromide_dust").EUt(1920)
        .duration(100)

    gtr.chemical_reactor("gtceu:bromo_succinimide_dust")
        .itemInputs("12x gtceu:succinimide_dust").inputFluids("gtceu:bromine 2000").outputFluids("gtceu:hydrobromic_acid 1000")
        .itemOutputs("12x gtceu:bromo_succinimide_dust").EUt(120).duration(100)

    gtr.chemical_reactor("gtceu:succinimide_dust")
        .inputFluids("gtceu:ammonia 1000").itemInputs("14x gtceu:succinic_acid_dust").outputFluids("minecraft:water 1000")
        .itemOutputs("12x gtceu:succinimide_dust").EUt(120).duration(100)

    gtr.laser_engraver("gtceu:fullerene_dust")
        .itemInputs("gtceu:unfolded_fullerene_dust").notConsumable("gtceu:ruby_lens").inputFluids("gtceu:nitrogen 10000")
        .itemOutputs("gtceu:fullerene_dust").outputFluids("gtceu:ammonia 10000").EUt(2000000).duration(400).addDataBool("special", true)

    gtr.large_chemical_reactor("gtceu:phenylpentanoic_acid")
        .notConsumableFluid("gtceu:trimethyltin_chloride 1000")
        .inputFluids("minecraft:water 2000", "gtceu:hydroiodic_acid 1000", "gtceu:acrylonitrile 1000", "gtceu:styrene 1000")
        .outputFluids("gtceu:phenylpentanoic_acid 1000", "gtceu:ammonia 1000")
        .itemOutputs("4x gtceu:aluminium_hydride_dust", "2x gtceu:lithium_iodide_dust").EUt(8000000).duration(200)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.chemical_reactor("gtceu:hydroiodic_acid")
        .inputFluids("gtceu:monomethylhydrazine 1000").itemInputs("4x gtceu:iodine_dust")
        .outputFluids("gtceu:nitrogen 2000", "gtceu:hydroiodic_acid 4000").EUt(500).duration(210)

    gtr.chemical_reactor("gtceu:acrylonitrile")
        .notConsumable("gtceu:platinum_dust").inputFluids("gtceu:oxygen 3000", "gtceu:ammonia 1000", "gtceu:propene 1000")
        .outputFluids("gtceu:acrylonitrile 2000", "minecraft:water 3000").EUt(120).duration(100)

    // 鿫
    gtr.chemical_reactor("gtceu:titanium_tetrachloride_1")
        .inputFluids("gtceu:hydrochloric_acid 4000").itemInputs("gtceu:titanium_dust")
        .outputFluids("gtceu:hydrogen 4000", "gtceu:titanium_tetrachloride 1000").EUt(480).duration(400)

    gtr.chemical_reactor("gtceu:titanium_tetrafluoride")
        .inputFluids("gtceu:titanium_tetrachloride 1000", "gtceu:fluorine 4000")
        .outputFluids("gtceu:chlorine 4000", "gtceu:titanium_tetrafluoride 1000").EUt(1920).duration(800)

    gtr.centrifuge("gtceu:titanium_50_tetrafluoride")
        .inputFluids("gtceu:titanium_tetrafluoride 1000").outputFluids("gtceu:titanium_50_tetrafluoride 10", "gtceu:titanium_tetrafluoride 990")
        .EUt(480).duration(200)

    gtr.chemical_reactor("gtceu:titanium_50_tetrachloride")
        .inputFluids("gtceu:titanium_50_tetrafluoride 1000", "gtceu:hydrochloric_acid 4000")
        .outputFluids("gtceu:hydrofluoric_acid 4000", "gtceu:titanium_50_tetrachloride 1000").EUt(480).duration(400)

    gtr.electric_blast_furnace("gtceu:hot_titanium_50_ingot_1")
        .itemInputs("2x gtceu:magnesium_dust").inputFluids("gtceu:titanium_50_tetrachloride 1000")
        .itemOutputs("gtceu:hot_titanium_50_ingot", "6x gtceu:magnesium_chloride_dust").EUt(480).duration(800).blastFurnaceTemp(2142)

    gtr.mixer("gtceu:oganesson_breeding_base")
        .inputFluids("gtceu:titanium_50 1440", "gtceu:californium 576").outputFluids("gtceu:oganesson_breeding_base 2016").EUt(7680)
        .duration(480)

    // 𬭶
    gtr.mixer("gtceu:scandium_titanium_50_mixture")
        .inputFluids("gtceu:titanium_50 144", "gtceu:scandium 144").outputFluids("gtceu:scandium_titanium_50_mixture 288").EUt(7680)
        .duration(120)

    // 芳纶
    gtr.chemical_bath("gtceu:kevlar_plate")
        .itemInputs("kubejs:woven_kevlar").inputFluids("gtceu:polyurethaneresin 1000").itemOutputs("gtceu:kevlar_plate").EUt(480).duration(400)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.assembler("kubejs:woven_kevlar")
        .itemInputs("8x kubejs:kevlar_fiber").itemOutputs("kubejs:woven_kevlar").circuit(8).EUt(120).duration(200)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.fluid_solidifier("kubejs:kevlar_fiber")
        .notConsumable("gtceu:nugget_casting_mold").inputFluids("gtceu:liquidcrystalkevlar 72").itemOutputs("kubejs:kevlar_fiber").EUt(30)
        .duration(800).cleanroom(CleanroomType.CLEANROOM)

    gtr.large_chemical_reactor("gtceu:polyurethaneresin")
        .itemInputs("gtceu:pentaerythritol_dust", "5x gtceu:diphenylmethane_diisocyanate_dust")
        .inputFluids("gtceu:ethyleneglycol 4000", "gtceu:siliconoil 1000").outputFluids("gtceu:polyurethaneresin 1000").EUt(7680).duration(600)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.distillation_tower("gtceu:diphenylmethane_diisocyanate_dust")
        .inputFluids("gtceu:diphenylmethanediisocyanatemixture 1000").itemOutputs("29x gtceu:diphenylmethane_diisocyanate_dust")
        .outputFluids("gtceu:hydrochloric_acid 5000").EUt(1920).duration(700)

    gtr.large_chemical_reactor("gtceu:diphenylmethanediisocyanatemixture")
        .inputFluids("gtceu:diaminodiphenylmethanmixture 1000", "gtceu:phosgene 2000")
        .outputFluids("gtceu:diphenylmethanediisocyanatemixture 1000").EUt(7680).duration(600)

    gtr.chemical_reactor("gtceu:phosgene")
        .inputFluids("gtceu:carbon_monoxide 1000", "gtceu:chlorine 2000").outputFluids("gtceu:phosgene 1000").EUt(1920).duration(400)

    gtr.large_chemical_reactor("gtceu:diaminodiphenylmethanmixture")
        .inputFluids("gtceu:formaldehyde 1000", "gtceu:aniline 2000", "gtceu:hydrochloric_acid 1000")
        .outputFluids("gtceu:diaminodiphenylmethanmixture 1000").EUt(122880).duration(200).cleanroom(CleanroomType.CLEANROOM)

    gtr.large_chemical_reactor("gtceu:siliconoil")
        .inputFluids("gtceu:ethylene_oxide 1000", "gtceu:dimethyldichlorosilane 4000", "gtceu:distilled_water 5000")
        .outputFluids("gtceu:siliconoil 5000").EUt(480).duration(1000)

    gtr.chemical_reactor("gtceu:ethyleneglycol")
        .circuit(1).inputFluids("gtceu:ethylene_oxide 1000", "minecraft:water 1000").outputFluids("gtceu:ethyleneglycol 1000").EUt(480)
        .duration(300)

    gtr.large_chemical_reactor("gtceu:pentaerythritol_dust")
        .notConsumable("gtceu:sodium_hydroxide_dust").inputFluids("gtceu:formaldehyde 4000", "gtceu:acetaldehyde 1000")
        .itemOutputs("21x gtceu:pentaerythritol_dust").outputFluids("gtceu:carbon_monoxide 1000").EUt(1920).duration(1200)

    // 富勒烯聚合物基质
    gtr.large_chemical_reactor("gtceu:sarcosine_dust")
        .inputFluids("gtceu:acetic_acid 1000", "gtceu:chlorine 2000", "gtceu:methanol 1000", "gtceu:ammonia 1000")
        .outputFluids("gtceu:diluted_hydrochloric_acid 3000").itemOutputs("13x gtceu:sarcosine_dust").EUt(7680).duration(200)

    gtr.mixer("gtceu:silica_alumina_gel_dust")
        .itemInputs("5x gtceu:alumina_dust", "3x gtceu:silica_gel_dust").itemOutputs("gtceu:silica_alumina_gel_dust").EUt(120).duration(60)

    gtr.dehydrator("gtceu:zeolite_sieving_pellets_dust")
        .itemInputs("gtceu:wet_zeolite_sieving_pellets_dust").itemOutputs("gtceu:zeolite_sieving_pellets_dust").EUt(120).duration(50)

    gtr.electric_blast_furnace("gtceu:zeolite_sieving_pellets_dust")
        .itemInputs("gtceu:silica_alumina_gel_dust", "gtceu:zeolite_dust").itemOutputs("gtceu:zeolite_sieving_pellets_dust")
        .blastFurnaceTemp(4500).EUt(120).duration(400)

    gtr.chemical_reactor("gtceu:ferrocene")
        .itemInputs("gtceu:zeolite_sieving_pellets_dust").inputFluids("gtceu:iron_ii_chloride 1000", "gtceu:cyclopentadiene 2000")
        .outputFluids("gtceu:diluted_hydrochloric_acid 2000", "gtceu:ferrocene 1000").itemOutputs("gtceu:wet_zeolite_sieving_pellets_dust")
        .EUt(30720).duration(200)

    gtr.large_chemical_reactor("gtceu:palladium_fullerene_matrix_dust")
        .itemInputs("13x gtceu:sarcosine_dust", "gtceu:fullerene_dust", "gtceu:palladium_dust").inputFluids("gtceu:ferrocene 1000")
        .itemOutputs("gtceu:palladium_fullerene_matrix_dust").EUt(GTValues.VA[GTValues.UIV]).duration(100).cleanroom(CleanroomType.CLEANROOM)

    gtr.chemical_bath("gtceu:fullerene_polymer_matrix_pulp_dust")
        .itemInputs("gtceu:palladium_fullerene_matrix_dust").inputFluids("gtceu:pcbs 1000")
        .itemOutputs("2x gtceu:fullerene_polymer_matrix_pulp_dust").EUt(8000000).duration(40).cleanroom(CleanroomType.CLEANROOM)

    gtr.large_chemical_reactor("gtceu:pcbs")
        .itemInputs("8x gtceu:fullerene_dust").notConsumable("gtceu:dmap_dust")
        .inputFluids("gtceu:phenylpentanoic_acid 8000", "gtceu:dichloromethane 8000", "gtceu:styrene 7000", "gtceu:chlorobenzene 8000",
            "gtceu:dimethyl_sulfide 8000")
        .outputFluids("gtceu:toluene 8000", "gtceu:hydrogen_sulfide 8000", "gtceu:hydrochloric_acid 24000", "gtceu:pcbs 8000")
        .EUt(GTValues.VA[GTValues.UIV]).duration(80).cleanroom(CleanroomType.CLEANROOM)

    gtr.chemical_reactor("gtceu:dmap_dust")
        .inputFluids("gtceu:pyridine 1000", "gtceu:dimethylamine 1000").itemOutputs("gtceu:dmap_dust").outputFluids("gtceu:hydrogen 2000")
        .EUt(7680).duration(200)

    batch(gtr, "chemical_reactor", ["inputFluids", "outputFluids", "EUt", "duration"], [
        ["gtceu:dichloromethane", ["gtceu:chloromethane 1000", "gtceu:chlorine 2000"], ["gtceu:dichloromethane 1000", "gtceu:hydrochloric_acid 1000"],
            [30], [80]],
        ["gtceu:dimethyl_sulfide", ["gtceu:methanol 2000", "gtceu:hydrogen_sulfide 1000"], ["gtceu:dimethyl_sulfide 1000", "minecraft:water 2000"],
            [1920], [100]]
    ]);

    // 星辉
    gtr.sps_crafting("gtceu:liquid_starlight")
        .inputFluids("gtceu:mana 10000", "gtceu:starlight 10000").itemInputs("64x minecraft:blue_ice", "64x minecraft:blue_ice")
        .outputFluids("gtceu:liquid_starlight 10000").EUt(GTValues.VA[GTValues.UEV]).duration(9600)

    gtr.chemical_bath("kubejs:resonating_gem")
        .itemInputs("gtceu:exquisite_sapphire_gem").inputFluids("gtceu:liquid_starlight 1000").itemOutputs("kubejs:resonating_gem")
        .EUt(GTValues.VA[GTValues.UIV]).duration(400).cleanroom(CleanroomType.CLEANROOM)

    // 混沌
    gtr.large_chemical_reactor("gtceu:neutronium_doped_nanotubes")
        .itemInputs("gtceu:neutronium_dust").notConsumable("gtceu:rhenium_plate")
        .inputFluids("gtceu:methane 800", "gtceu:cycloparaphenylene 200").outputFluids("gtceu:neutronium_doped_nanotubes 1000")
        .EUt(GTValues.VA[GTValues.UV]).duration(500).cleanroom(CleanroomType.CLEANROOM)

    gtr.assembler("kubejs:highly_dense_polymer_plate")
        .itemInputs("gtceu:carbon_nanotubes_plate", "gtceu:double_cosmicneutronium_plate", "gtceu:fullerene_polymer_matrix_pulp_plate")
        .inputFluids("gtceu:neutronium_doped_nanotubes 2000").itemOutputs("kubejs:highly_dense_polymer_plate").EUt(GTValues.VA[GTValues.UXV])
        .duration(350).cleanroom(CleanroomType.CLEANROOM)

    gtr.stellar_forge("gtceu:cosmic_mesh_plasma")
        .itemInputs("kubejs:quantum_chromodynamic_charge", "kubejs:highly_dense_polymer_plate").outputFluids("gtceu:cosmic_mesh_plasma 1000")
        .EUt(GTValues.VA[GTValues.OpV]).duration(200).addData("SCTier", 3)

    gtr.dimensionally_transcendent_plasma_forge("gtceu:chaos_plasma")
        .itemInputs("kubejs:chaos_shard").inputFluids("gtceu:dimensionallytranscendentresplendentcatalyst 1000", "gtceu:cosmic_mesh_plasma 1000")
        .outputFluids("gtceu:chaos_plasma 1000", "gtceu:dimensionallytranscendentresidue 100").EUt(GTValues.VA[GTValues.MAX]).duration(1600)
        .blastFurnaceTemp(32000)

    gtr.canner("kubejs:cosmic_mesh_containment_unit")
        .notConsumable("gtceu:uruium_nanoswarm").itemInputs("kubejs:time_dilation_containment_unit").inputFluids("gtceu:cosmic_mesh_plasma 1000")
        .itemOutputs("kubejs:cosmic_mesh_containment_unit").EUt(GTValues.VA[GTValues.OpV]).duration(20)

    gtr.plasma_condenser("gtceu:cosmic_mesh")
        .itemInputs("kubejs:cosmic_mesh_containment_unit").inputFluids("gtceu:liquid_helium 100000")
        .itemOutputs("kubejs:time_dilation_containment_unit").outputFluids("gtceu:liquid_cosmic_mesh 1000").EUt(GTValues.VA[GTValues.OpV])
        .duration(800)

    gtr.sps_crafting("kubejs:cosmic_fabric")
        .notConsumable("gtceu:cosmicneutronium_nanoswarm")
        .inputFluids("gtceu:mana 1000", "gtceu:enriched_xenoxene 1000", "gtceu:liquid_cosmic_mesh 100")
        .itemInputs("gtceu:rubber_foil", "kubejs:amorphous_matter").itemOutputs("kubejs:cosmic_fabric").EUt(GTValues.VA[GTValues.OpV])
        .duration(200)
});
