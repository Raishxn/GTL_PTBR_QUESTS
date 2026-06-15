ServerEvents.recipes((event) => {
    const grtr = event.recipes.gtceu;

    event.remove({ id: "gtceu:dimensional_focus_engraving_array/crystal_cpu" });

    // P2P 通道配方生成
    const p2pRecipes = {
        'ae2:redstone_p2p_tunnel': '#forge:dusts/redstone',
        'ae2:item_p2p_tunnel': '#forge:chests',
        'ae2:fluid_p2p_tunnel': 'minecraft:bucket',
        'ae2:fe_p2p_tunnel': 'ae2:energy_acceptor',
        'ae2:light_p2p_tunnel': 'minecraft:torch',
        'mae2:pattern_p2p_tunnel': 'ae2:blank_pattern',
        'mae2:eu_p2p_tunnel': 'gtceu:battery_alloy_ingot'
    };
    Object.entries(p2pRecipes).forEach(([output, centerItem]) => {
        event.shaped(`8x ${output}`, ["AAA", "ADA", "AAA"], { A: "ae2:me_p2p_tunnel", D: centerItem });
    });

    grtr.large_chemical_reactor("cxbp:uranium_235_dust")
        .itemInputs("30x gtceu:impure_uraninite_dust")
        .inputFluids("gtceu:sulfuric_acid 15000", "gtceu:hydrogen 40000")
        .notConsumableFluid("gtceu:fluorine 5000")
        .outputFluids("gtceu:uranium_sulfate_waste_solution 30000")
        .itemOutputs("gtceu:uranium_235_dust", "9x gtceu:uranium_dust")
        .circuit(23).EUt(1920).duration(640).cleanroom(CleanroomType.CLEANROOM);

    grtr.large_chemical_reactor("cxbp:uranium_dust")
        .itemInputs("30x gtceu:uraninite_dust")
        .inputFluids("gtceu:hydrogen 40000").notConsumableFluid("gtceu:fluorine 5000")
        .itemOutputs("gtceu:uranium_235_dust", "9x gtceu:uranium_dust")
        .circuit(23).EUt(1920).duration(640).cleanroom(CleanroomType.CLEANROOM);

    grtr.large_chemical_reactor("cxbp:alumina_dust")
        .itemInputs("2x gtceu:aluminium_dust").inputFluids("gtceu:oxygen 3000")
        .itemOutputs("5x gtceu:alumina_dust").circuit(24).EUt(1920).duration(64);

    grtr.large_chemical_reactor("cxbp:bromine")
        .inputFluids("minecraft:water 3000", "gtceu:chlorine 1500", "gtceu:salt_water 60000")
        .outputFluids("gtceu:bromine 1000").circuit(24).EUt(7680).duration(512);

    grtr.large_chemical_reactor("cxbp:rare_earth_metal_dust")
        .itemInputs("4x gtceu:monazite_dust")
        .inputFluids("gtceu:hydrogen 10000", "gtceu:hydrochloric_acid 1000", "gtceu:oxygen 1000")
        .itemOutputs("gtceu:rare_earth_metal_dust")
        .circuit(24).cleanroom(CleanroomType.CLEANROOM).EUt(7680).duration(2048);

    grtr.large_chemical_reactor("cxbp:indium_dust")
        .itemInputs("4x gtceu:purified_sphalerite_ore", "4x gtceu:purified_galena_ore")
        .inputFluids("gtceu:sulfuric_acid 16000").itemOutputs("gtceu:indium_dust")
        .outputFluids("gtceu:lead_zinc_solution 16000").circuit(4).EUt(7680).duration(128);

    grtr.large_chemical_reactor("cxbp:formic_acid")
        .inputFluids("gtceu:carbon_monoxide 1000", "minecraft:water 1000")
        .outputFluids("gtceu:formic_acid 1000").EUt(480).duration(256);

    grtr.large_chemical_reactor("cxbp:agar_dust")
        .itemInputs("12x gtceu:calcium_dust", "12x gtceu:meat_dust")
        .inputFluids("gtceu:sulfuric_acid 3000", "gtceu:distilled_water 17000", "gtceu:phosphoric_acid 3000")
        .itemOutputs("2x gtceu:phosphorus_dust", "8x gtceu:agar_dust")
        .circuit(23).EUt(30720).duration(512).cleanroom(CleanroomType.STERILE_CLEANROOM);

    grtr.extruder("cxbp:nan_certificate_rebirth")
        .notConsumable('gtceu:nan_certificate').itemInputs("128x gtceu:neutronium_block")
        .itemOutputs("gtceu:nan_certificate").EUt(7680).duration(2147483647);

    grtr.incubator("cxbp:biomediumraw2")
        .notConsumable("64x kubejs:bioware_mainframe")
        .itemInputs("gtceu:tritanium_dust", "16x kubejs:tcetieseaweedextract")
        .inputFluids("gtceu:raw_growth_medium 16000")
        .outputFluids("gtceu:biomediumraw 16000")
        .EUt(1920).duration(1200).addCondition(new GravityCondition(true));

    grtr.large_chemical_reactor("cxbp:purified_tengam_dust_fast")
        .itemInputs("gtceu:raw_tengam_dust").inputFluids("gtceu:distilled_water 1000")
        .itemOutputs("gtceu:purified_tengam_dust").EUt(7864320).duration(512);

    grtr.greenhouse("cxbp:apple_oak")
        .notConsumable("minecraft:oak_sapling").itemInputs("4x gtceu:fertilizer")
        .inputFluids("minecraft:water 1000").itemOutputs("12x minecraft:apple")
        .circuit(3).EUt(480).duration(600);

    grtr.greenhouse("cxbp:apple_dark_oak")
        .notConsumable("minecraft:dark_oak_sapling").itemInputs("8x gtceu:fertilizer")
        .inputFluids("minecraft:water 1000").itemOutputs("24x minecraft:apple")
        .circuit(3).EUt(120).duration(300);

    grtr.large_chemical_reactor("cxbp:bedrock_soot_solution_ch")
        .notConsumable('1x gtceu:dissolving_tank').itemInputs("gtceu:naquadah_dust")
        .inputFluids("gtceu:bedrock_smoke 1000", "gtceu:distilled_water 1000")
        .outputFluids("gtceu:bedrock_soot_solution 1000").EUt(7680).duration(512);

    grtr.large_chemical_reactor("cxbp:rhenium_sulfuric_solution_ch")
        .notConsumable('1x gtceu:dissolving_tank')
        .inputFluids("gtceu:molybdenum_flue 3000", "minecraft:water 250")
        .outputFluids("gtceu:rhenium_sulfuric_solution 3000").EUt(491520).duration(32);

    grtr.large_chemical_reactor("cxbp:rare_earth_hydroxides_ch")
        .notConsumable('1x gtceu:dissolving_tank').itemInputs("gtceu:rare_earth_dust", "3x gtceu:sodium_hydroxide_dust")
        .inputFluids("gtceu:phosphoric_acid 100", "minecraft:water 900")
        .outputFluids("gtceu:rare_earth_hydroxides 1000").EUt(480).duration(64);

    grtr.large_chemical_reactor("cxbp:actinium_radium_hydroxide_solution_ch")
        .notConsumable('1x gtceu:dissolving_tank')
        .inputFluids("gtceu:actinium_radium_hydroxide_solution 1000", "gtceu:nitric_acid 12000")
        .outputFluids("gtceu:actinium_radium_nitrate_solution 13000").EUt(3840).duration(256);

    grtr.large_chemical_reactor("cxbp:absolute_ethanol_ch")
        .notConsumable("64x gtceu:zeolite_sieving_pellets_dust")
        .inputFluids("gtceu:ethanol 1000", "gtceu:blaze 100").outputFluids("gtceu:absolute_ethanol 1000")
        .EUt(1920).duration(64);

    grtr.large_chemical_reactor("cxbp:ferrocene_ch")
        .notConsumable("64x gtceu:zeolite_sieving_pellets_dust")
        .inputFluids("gtceu:blaze 100", "gtceu:cyclopentadiene 2000", "gtceu:iron_ii_chloride 1000")
        .outputFluids("gtceu:ferrocene 1000", "gtceu:diluted_hydrochloric_acid 2000").EUt(30720).duration(256);

    grtr.large_chemical_reactor("cxbp:tert_butanol_ch")
        .notConsumable("64x gtceu:zeolite_sieving_pellets_dust").notConsumable("gtceu:magnesium_chloride_dust")
        .inputFluids("gtceu:acetone 1000", "gtceu:methane 1000", "gtceu:blaze 100")
        .outputFluids("gtceu:tert_butanol 1000").EUt(480).duration(128);

    grtr.distort("cxbp:liquid_starlight_di")
        .notConsumable('gtceu:cooling_tower').notConsumable("gtceu:infuscolium_block")
        .inputFluids("minecraft:water 100000", "gtceu:starlight 10000", "gtceu:mana 10000")
        .outputFluids("gtceu:liquid_starlight 10000")
        .blastFurnaceTemp(800).EUt(7864320).duration(256).cleanroom(GTLCleanroomType.LAW_CLEANROOM);

    grtr.lightning_processor("cxbp:easier_germanium_dust_2")
        .itemInputs('48x gtceu:dark_ash_dust', '720x minecraft:nether_wart')
        .inputFluids('gtceu:sulfuric_acid 4000', 'gtceu:hydrogen 8000')
        .itemOutputs('1x gtceu:germanium_dust').outputFluids('gtceu:carbon 5760').EUt(120).duration(1500);

    const simpleConversions = [
        ['cxbp:warped_stem', 'minecraft:birch_log', 'minecraft:warped_stem', 'gtlcore:conversion_simulate_card'],
        ['cxbp:essence_block', 'minecraft:bone_block', 'kubejs:essence_block', 'gtlcore:fast_conversion_simulate_card'],
        ['cxbp:crimson_stem', 'minecraft:oak_log', 'minecraft:crimson_stem', 'gtlcore:conversion_simulate_card'],
        ['cxbp:draconium_block_charged', 'kubejs:infused_obsidian', 'kubejs:draconium_block_charged', 'gtlcore:fast_conversion_simulate_card']
    ];
    simpleConversions.forEach(([id, input, output, card]) => {
        grtr.large_chemical_reactor(id)
            .notConsumable(card).itemInputs(`64x ${input}`).itemOutputs(`64x ${output}`)
            .EUt(16).duration(20).circuit(32).cleanroom(CleanroomType.CLEANROOM);
    });

    grtr.large_chemical_reactor("cxbp:special_ceramics_dust_clay_ch")
        .itemInputs("#forge:dyes/brown", "32x gtceu:clay_dust").inputFluids("minecraft:water 8000")
        .itemOutputs("8x gtceu:special_ceramics_dust").EUt(7680).duration(64).circuit(23);

    grtr.large_chemical_reactor("cxbp:special_ceramics_dust_dirt_ch")
        .itemInputs("#forge:dyes/brown", "8x minecraft:dirt").inputFluids("minecraft:water 1152")
        .itemOutputs("8x gtceu:special_ceramics_dust").EUt(7680).duration(64).circuit(23);

    grtr.decay_hastener("cxbp:neptunium_dust_de")
        .inputFluids("gtceu:americium 144").itemOutputs("gtceu:neptunium_dust").EUt(480).duration(8000);

    grtr.distort("cxbp:polycaprolactam_di")
        .notConsumable("minecraft:copper_block").itemInputs("6x gtceu:carbon_dust")
        .inputFluids("gtceu:hydrogen 11000", "gtceu:oxygen 1000", "gtceu:nitrogen 1000")
        .outputFluids("gtceu:polycaprolactam 2736")
        .EUt(7680).duration(256).blastFurnaceTemp(800).cleanroom(CleanroomType.CLEANROOM);

    grtr.large_chemical_reactor("cxbp:fire_charge_ch")
        .itemInputs("minecraft:gunpowder", "gtceu:carbon_dust", "minecraft:blaze_powder")
        .itemOutputs("3x minecraft:fire_charge").EUt(120).duration(64);

    grtr.assembler("cxbp:lubricant_cell")
        .itemInputs("gtlcore:cell_component_256m", "64x gtceu:large_distillery")
        .inputFluids("gtceu:lubricant 2147483647")
        .itemOutputs(Item.of("expatternprovider:infinity_cell", '{record:{"#c":"ae2:f",id:"gtceu:lubricant"}}'))
        .EUt(122880).duration(10000);

    grtr.assembler("cxbp:oil_medium_cell")
        .itemInputs("gtlcore:cell_component_256m", "64x gtceu:zpm_fluid_drilling_rig")
        .inputFluids("gtceu:oil_medium 2147483647")
        .itemOutputs(Item.of("expatternprovider:infinity_cell", '{record:{"#c":"ae2:f",id:"gtceu:oil_medium"}}'))
        .EUt(122880).duration(10000);

    grtr.distort("cxbp:easier_sodium_ethylxanthate_dust_di")
        .notConsumable("minecraft:glowstone")
        .itemInputs("3x gtceu:carbon_dust", "2x gtceu:sulfur_dust", "gtceu:sodium_dust")
        .inputFluids("gtceu:hydrogen 5000", "gtceu:oxygen 1000")
        .itemOutputs("12x gtceu:sodium_ethylxanthate_dust").EUt(30720).duration(256).blastFurnaceTemp(800);

    grtr.distort("cxbp:easier_potassium_ethylxanthate_dust_di")
        .notConsumable("minecraft:glowstone")
        .itemInputs("3x gtceu:carbon_dust", "2x gtceu:sulfur_dust", "gtceu:potassium_dust")
        .inputFluids("gtceu:hydrogen 5000", "gtceu:oxygen 1000")
        .itemOutputs("12x gtceu:potassium_ethylxanthate_dust").EUt(30720).duration(256).blastFurnaceTemp(800);

    grtr.distort('cxbp:fullerene_dust_di')
        .notConsumable('gtceu:black_dwarf_mtter_nanoswarm')
        .itemInputs("60x gtceu:carbon_dust").itemOutputs("60x gtceu:fullerene_dust")
        .EUt(503316480).duration(128).blastFurnaceTemp(21600);

    grtr.distort("cxbp:tcetieseaweedextract")
      .notConsumable("gtceu:vibranium_nanoswarm") 
      .itemInputs("256x minecraft:kelp", "128x gtceu:alien_algae_dust", "64x gtceu:energium_dust", "64x gtceu:mithril_dust", "64x gtceu:salt_dust", "64x gtceu:meat_dust", "64x gtceu:agar_dust")
      .inputFluids("gtceu:unknowwater 16000", "gtceu:phthalic_acid 16000", "gtceu:methane 50000")
      .itemOutputs("256x kubejs:tcetieseaweedextract")
      .blastFurnaceTemp(16800).cleanroom(CleanroomType.CLEANROOM).EUt(GTValues.VA[GTValues.UIV]).duration(2400);

    grtr.incubator("cxbp:shaped/raw_growth_medium")
        .notConsumable('gtlcore:streptococcus_petri_dish')
        .itemInputs("16x minecraft:kelp", "8x gtceu:meat_dust")
        .inputFluids("gtceu:distilled_water 4000").outputFluids("gtceu:raw_growth_medium 4000")
        .EUt(30720).duration(128).cleanroom(CleanroomType.STERILE_CLEANROOM);

    grtr.incubator('cxbp:streptococcus_petri_dish')
        .itemInputs("gtlcore:sterilized_petri_dish", "8x gtceu:meat_dust")
        .inputFluids("gtceu:sterilized_growth_medium 1000")
        .chancedOutput('gtlcore:streptococcus_petri_dish', 250, 0)
        .EUt(122880).duration(2048).cleanroom(CleanroomType.STERILE_CLEANROOM);

    grtr.assembly_line("cxbp:max_battery_easier")
        .itemInputs("16x gtceu:double_darmstadtium_plate", "4x #gtceu:circuits/uhv", "4x gtceu:uv_field_generator", "64x gtceu:uhpic_wafer", "64x gtceu:uhpic_wafer", "64x gtceu:advanced_smd_diode", "64x gtceu:advanced_smd_capacitor", "64x gtceu:advanced_smd_resistor", "64x gtceu:advanced_smd_transistor", "64x gtceu:advanced_smd_inductor", "64x gtceu:enriched_naquadah_trinium_europium_duranide_single_wire", "64x gtceu:neutronium_bolt")
        .inputFluids("gtceu:soldering_alloy 5760", "gtceu:polybenzimidazole 2304", "gtceu:naquadria 2592", "gtceu:raw_star_matter_plasma 1296")
        .itemOutputs("gtceu:max_battery").EUt(491520).duration(2048)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:energy_cluster")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(491520).CWUt(128));

    ['emerald', 'olivine'].forEach(gem => {
        grtr.laser_engraver(`cxbp:crystal_cpu/${gem}`)
            .notConsumable("gtceu:nether_star_lens").itemInputs(`4x gtceu:exquisite_${gem}_gem`)
            .itemOutputs("64x gtceu:crystal_cpu")
            .EUt(122880).duration(128).cleanroom(GTLCleanroomType.LAW_CLEANROOM);
    });
});