// priority: 95
// 光刻胶、量子材料、高能物质及相关结构材料。
// 由 gtceu.js 按既有阶段顺序执行，本文件只登记配方，不依赖文件名排序。
global.gtlPack.register("quantum_materials", event => {
    const gtr = event.recipes.gtceu;
    const batch = global.gtlPack.batch;

    gtr.electric_blast_furnace("kubejs:rutherfordium_neutronium_boule")
        .itemInputs("gtceu:neutronium_boule", "4x gtceu:rutherfordium_dust").inputFluids("gtceu:radon 8000")
        .itemOutputs("kubejs:rutherfordium_neutronium_boule").EUt(30720).duration(21000).blastFurnaceTemp(8100)

    gtr.chemical_reactor("gtceu:acrylic_acid")
        .itemInputs("3x gtceu:sodium_hydroxide_dust").inputFluids("gtceu:allyl_chloride 1000", "minecraft:water 1000", "gtceu:oxygen 1000")
        .outputFluids("gtceu:acrylic_acid 1000").itemOutputs("2x gtceu:salt_dust").EUt(120).duration(200)

    gtr.chemical_reactor("gtceu:ethyl_acrylate")
        .inputFluids("gtceu:acrylic_acid 1000", "gtceu:ethanol 1000", "gtceu:sulfuric_acid 1000")
        .outputFluids("gtceu:ethyl_acrylate 1000", "gtceu:diluted_sulfuric_acid 1000").EUt(120).duration(600)

    gtr.large_chemical_reactor("gtceu:photoresist")
        .inputFluids("gtceu:ethyl_acrylate 1000", "gtceu:styrene 1000", "gtceu:titanium_tetrachloride 100")
        .outputFluids("gtceu:photoresist 1000").EUt(1920).duration(800).cleanroom(CleanroomType.CLEANROOM)

    gtr.large_chemical_reactor("gtceu:trichloroflerane")
        .notConsumable("gtceu:ferrosilite_dust").itemInputs("gtceu:flerovium_dust").inputFluids("gtceu:hydrochloric_acid 3000")
        .outputFluids("gtceu:trichloroflerane 1000", "gtceu:hydrogen 3000").EUt(7680).duration(150)

    gtr.mixer("gtceu:euv_photoresist")
        .inputFluids("gtceu:photoresist 1000", "gtceu:polyurethaneresin 1000")
        .itemInputs("31x gtceu:bisethylenedithiotetraselenafulvalene_perrhenate_dust").outputFluids("gtceu:euv_photoresist").EUt(524288)
        .duration(400).cleanroom(CleanroomType.CLEANROOM)

    gtr.electric_blast_furnace("gtceu:bisethylenedithiotetraselenafulvalene_perrhenate_dust")
        .itemInputs("26x gtceu:bisethylenedithiotetraselenafulvalene_dust").inputFluids("gtceu:ammonium_perrhenate 1000")
        .outputFluids("gtceu:ammonia 1000").itemOutputs("31x gtceu:bisethylenedithiotetraselenafulvalene_perrhenate_dust").EUt(120)
        .duration(9840).blastFurnaceTemp(5000)

    gtr.electric_blast_furnace("gtceu:bisethylenedithiotetraselenafulvalene_dust")
        .itemInputs("28x gtceu:lithiumthiinediselenide_dust", "gtceu:cyclopentadienyl_titanium_trichloride_dust")
        .inputFluids("gtceu:tetrafluoroethylene 1000")
        .itemOutputs("8x gtceu:lithium_fluoride_dust", "26x gtceu:bisethylenedithiotetraselenafulvalene_dust").EUt(120).duration(7680)
        .blastFurnaceTemp(4600)

    gtr.large_chemical_reactor("gtceu:cyclopentadienyl_titanium_trichloride_dust")
        .inputFluids("gtceu:titanium_tetrachloride 1000", "gtceu:propadiene 2000", "gtceu:acetylene 2000")
        .itemOutputs("23x gtceu:cyclopentadienyl_titanium_trichloride_dust").outputFluids("gtceu:hydrochloric_acid 2000").EUt(7680).duration(780)

    gtr.large_chemical_reactor("gtceu:propadiene")
        .inputFluids("gtceu:butene 1000", "gtceu:propene").outputFluids("gtceu:butane 1000", "gtceu:propadiene 1000").EUt(480).duration(2400)

    gtr.chemical_reactor("gtceu:lithiumthiinediselenide_dust")
        .inputFluids("gtceu:bromodihydrothiine 1000", "gtceu:butyl_lithium 2000").itemInputs("2x gtceu:selenium_dust")
        .outputFluids("gtceu:bromobutane 2000").itemOutputs("14x gtceu:lithiumthiinediselenide_dust").EUt(30720).duration(290)

    gtr.chemical_reactor("gtceu:butyl_lithium")
        .itemInputs("gtceu:lithium_dust").inputFluids("gtceu:butane 1000").outputFluids("gtceu:butyl_lithium 1000", "gtceu:hydrogen 1000")
        .EUt(480).duration(150)

    gtr.large_chemical_reactor("gtceu:bromodihydrothiine")
        .inputFluids("gtceu:ethane 1000", "gtceu:chlorine 1000", "gtceu:dibromoacrolein 1000").itemInputs("14x gtceu:sodium_thiosulfate_dust")
        .outputFluids("gtceu:bromodihydrothiine 1000", "gtceu:hydrogen 1000")
        .itemOutputs("4x gtceu:salt_dust", "14x gtceu:sodium_bisulfate_dust").EUt(7680).duration(400)

    gtr.large_chemical_reactor("gtceu:dibromoacrolein")
        .inputFluids("gtceu:formic_acid 2000", "minecraft:water 2000", "gtceu:bromine 2000")
        .outputFluids("gtceu:dibromoacrolein 1000", "gtceu:hydrogen 2000").itemOutputs("12x gtceu:sodium_hydroxide_dust").EUt(7680).duration(360)

    gtr.electric_blast_furnace("gtceu:sodium_thiosulfate_dust")
        .itemInputs("18x gtceu:sodium_hydroxide_dust", "4x gtceu:sulfur_dust")
        .itemOutputs("7x gtceu:sodium_thiosulfate_dust", "6x gtceu:sodium_sulfide_dust").outputFluids("gtceu:steam 3000").EUt(120).duration(210)
        .blastFurnaceTemp(4500)

    gtr.mixer("gtceu:gamma_rays_photoresist")
        .itemInputs("29x gtceu:borocarbide_dust", "4x gtceu:lanthanum_embedded_fullerene_dust")
        .inputFluids("gtceu:euv_photoresist 1000", "gtceu:trichloroflerane").outputFluids("gtceu:gamma_rays_photoresist 1000")
        .EUt(GTValues.VA[GTValues.UHV]).duration(800).cleanroom(CleanroomType.CLEANROOM)

    gtr.mixer("gtceu:astatide_solution")
        .inputFluids("gtceu:sulfuric_acid 1000").itemInputs("1x gtceu:astatine_dust").outputFluids("gtceu:astatide_solution 1000").EUt(1920)
        .duration(200)

    gtr.chemical_reactor("gtceu:francium_carbide_dust")
        .itemInputs("2x gtceu:francium_dust").inputFluids("gtceu:acetylene 1000").itemOutputs("4x gtceu:francium_carbide_dust")
        .outputFluids("gtceu:hydrogen 2000").EUt(480).duration(260)

    gtr.electric_blast_furnace("gtceu:boron_carbide_dust")
        .itemInputs("3x gtceu:carbon_dust", "4x gtceu:boron_dust").itemOutputs("7x gtceu:boron_carbide_dust").EUt(120).duration(550)
        .blastFurnaceTemp(4000)

    gtr.chemical_reactor("gtceu:boron_francium_carbide_dust")
        .itemInputs("8x gtceu:francium_carbide_dust", "7x gtceu:boron_carbide_dust").itemOutputs("15x gtceu:boron_francium_carbide_dust")
        .EUt(7680).duration(900)

    gtr.mixer("gtceu:mixed_astatide_salts_dust")
        .itemInputs("gtceu:holmium_dust", "gtceu:thulium_dust", "gtceu:copernicium_dust", "gtceu:flerovium_dust")
        .inputFluids("gtceu:astatide_solution 3000", "gtceu:distilled_water 3000").itemOutputs("7x gtceu:mixed_astatide_salts_dust")
        .outputFluids("gtceu:diluted_sulfuric_acid 6000").EUt(122880).duration(400)

    gtr.electric_blast_furnace("gtceu:borocarbide_dust")
        .itemInputs("15x gtceu:boron_francium_carbide_dust", "14x gtceu:mixed_astatide_salts_dust").itemOutputs("29x gtceu:borocarbide_dust")
        .EUt(120).duration(15000).blastFurnaceTemp(11300)

    gtr.mixer("gtceu:lanthanum_fullerene_mix_dust")
        .itemInputs("gtceu:lanthanum_dust", "gtceu:unfolded_fullerene_dust").itemOutputs("2x gtceu:lanthanum_fullerene_mix_dust").EUt(30720)
        .duration(200).cleanroom(CleanroomType.CLEANROOM)

    gtr.laser_engraver("gtceu:lanthanum_embedded_fullerene_dust")
        .itemInputs("2x gtceu:lanthanum_fullerene_mix_dust").notConsumable("gtceu:sapphire_lens").inputFluids("gtceu:nitrogen 10000")
        .itemOutputs("2x gtceu:lanthanum_embedded_fullerene_dust").outputFluids("gtceu:ammonia 10000").EUt(1966080).duration(320)
        .addDataBool("special", true)

    gtr.large_chemical_reactor("gtceu:fullerene_doped_nanotubes")
        .itemInputs("gtceu:fullerene_dust").notConsumable("gtceu:rhenium_plate")
        .inputFluids("gtceu:methane 14400", "gtceu:cycloparaphenylene 3600").outputFluids("gtceu:fullerene_doped_nanotubes 18000").EUt(320000)
        .duration(290).cleanroom(CleanroomType.CLEANROOM)

    gtr.distillery("gtceu:cyclopentadiene")
        .inputFluids("gtceu:severely_steam_cracked_naphtha 1000").outputFluids("gtceu:cyclopentadiene 150").circuit(12).EUt(30).duration(240)

    gtr.chemical_reactor("gtceu:dimethylether")
        .notConsumable("gtceu:silicon_dioxide_dust").inputFluids("gtceu:methanol 2000")
        .outputFluids("gtceu:dimethylether 1000", "minecraft:water 1000").EUt(8000).duration(160)

    batch(gtr, "chemical_reactor", ["inputFluids", "outputFluids", "EUt", "duration"], [
        ["gtceu:dimethoxyethane", ["gtceu:dimethylether 1000", "gtceu:ethylene_oxide 1000"], ["gtceu:dimethoxyethane 1000"], [2000], [160]],
        ["gtceu:lithium_cyclopentadienide", ["gtceu:butyl_lithium 1000", "gtceu:dimethoxyethane 500", "gtceu:cyclopentadiene 1000"],
            ["gtceu:lithium_cyclopentadienide 1000", "gtceu:butane 1000"], [10000], [460]]
    ]);

    gtr.large_chemical_reactor("gtceu:californium_trichloride_dust")
        .notConsumable("gtceu:ferrosilite_dust").itemInputs("gtceu:californium_dust").inputFluids("gtceu:hydrochloric_acid 6000")
        .outputFluids("gtceu:hydrogen 3000").itemOutputs("4x gtceu:californium_trichloride_dust").EUt(7680).duration(150)

    gtr.chemical_reactor("gtceu:californium_cyclopentadienide")
        .inputFluids("gtceu:lithium_cyclopentadienide 3000").itemInputs("4x gtceu:californium_trichloride_dust")
        .outputFluids("gtceu:californium_cyclopentadienide 1000").EUt(2000000).duration(160).cleanroom(CleanroomType.CLEANROOM)

    gtr.chemical_bath("kubejs:fullerene_polymer_matrix_soft_tubing")
        .itemInputs("gtceu:fine_polyetheretherketone_wire").inputFluids("gtceu:fullerene_polymer_matrix_pulp 18")
        .itemOutputs("kubejs:fullerene_polymer_matrix_soft_tubing").EUt(100).duration(80)

    gtr.vacuum_freezer("kubejs:fullerene_polymer_matrix_fine_tubing")
        .itemInputs("kubejs:fullerene_polymer_matrix_soft_tubing").itemOutputs("kubejs:fullerene_polymer_matrix_fine_tubing").EUt(500)
        .duration(240)

    gtr.dimensionally_transcendent_mixer("gtceu:not_found")
        .itemInputs("1x gtceu:carbon_dust", "1x gtceu:phosphorus_dust", "1x gtceu:sulfur_dust", "1x gtceu:selenium_dust", "1x gtceu:iodine_dust")
        .inputFluids("gtceu:hydrogen 1000", "gtceu:nitrogen 1000", "gtceu:oxygen 1000", "gtceu:fluorine 1000", "gtceu:chlorine 1000", "gtceu:bromine 1000")
        .outputFluids("gtceu:not_found 11000").EUt(GTValues.VA[GTValues.UIV]).duration(2200)

    gtr.dimensionally_transcendent_mixer("gtceu:noble_gas")
        .inputFluids("gtceu:helium 1000", "gtceu:neon 1000", "gtceu:argon 1000", "gtceu:krypton 1000", "gtceu:xenon 1000", "gtceu:radon 1000")
        .outputFluids("gtceu:noble_gas 6000").EUt(GTValues.VA[GTValues.UIV]).duration(1200)

    batch(gtr, "dimensionally_transcendent_mixer", ["itemInputs", "itemOutputs", ["EUt", GTValues.VA[GTValues.UIV]], "duration"], [
        ["gtceu:metalloid_dust",
            ["1x gtceu:boron_dust", "1x gtceu:silicon_dust", "1x gtceu:germanium_dust", "1x gtceu:arsenic_dust", "1x gtceu:antimony_dust",
                "1x gtceu:tellurium_dust", "1x gtceu:astatine_dust"], ["7x gtceu:metalloid_dust"], [1400]],
        ["gtceu:poor_dust",
            ["1x gtceu:aluminium_dust", "1x gtceu:gallium_dust", "1x gtceu:indium_dust", "1x gtceu:tin_dust", "1x gtceu:thallium_dust",
                "1x gtceu:lead_dust", "1x gtceu:bismuth_dust", "1x gtceu:polonium_dust"], ["8x gtceu:poor_dust"], [1600]],
        ["gtceu:transition_1_dust",
            ["1x gtceu:titanium_dust", "1x gtceu:vanadium_dust", "1x gtceu:chromium_dust", "1x gtceu:manganese_dust", "1x gtceu:iron_dust",
                "1x gtceu:cobalt_dust", "1x gtceu:nickel_dust", "1x gtceu:copper_dust", "1x gtceu:zinc_dust"], ["9x gtceu:transition_1_dust"], [1800]],
        ["gtceu:transition_2_dust",
            ["1x gtceu:zirconium_dust", "1x gtceu:niobium_dust", "1x gtceu:molybdenum_dust", "1x gtceu:technetium_dust", "1x gtceu:ruthenium_dust",
                "1x gtceu:rhodium_dust", "1x gtceu:palladium_dust", "1x gtceu:silver_dust", "1x gtceu:cadmium_dust"], ["9x gtceu:transition_2_dust"],
            [1800]]
    ]);

    gtr.dimensionally_transcendent_mixer("gtceu:transition_3_dust")
        .itemInputs("1x gtceu:hafnium_dust", "1x gtceu:tantalum_dust", "1x gtceu:tungsten_dust", "1x gtceu:rhenium_dust", "1x gtceu:osmium_dust",
            "1x gtceu:iridium_dust", "1x gtceu:platinum_dust", "1x gtceu:gold_dust")
        .inputFluids("gtceu:mercury 1000").itemOutputs("9x gtceu:transition_3_dust").EUt(GTValues.VA[GTValues.UIV]).duration(1800)

    batch(gtr, "dimensionally_transcendent_mixer", ["itemInputs", "itemOutputs", ["EUt", GTValues.VA[GTValues.UIV]], "duration"], [
        ["gtceu:alkaline_earth_dust",
            ["1x gtceu:beryllium_dust", "1x gtceu:magnesium_dust", "1x gtceu:calcium_dust", "1x gtceu:strontium_dust", "1x gtceu:barium_dust",
                "1x gtceu:radium_dust"], ["6x gtceu:alkaline_earth_dust"], [1200]],
        ["gtceu:alkaline_dust",
            ["1x gtceu:lithium_dust", "1x gtceu:sodium_dust", "1x gtceu:potassium_dust", "1x gtceu:rubidium_dust", "1x gtceu:caesium_dust",
                "1x gtceu:francium_dust"], ["6x gtceu:alkaline_dust"], [1200]],
        ["gtceu:actinoids_1_dust",
            ["1x gtceu:actinium_dust", "1x gtceu:thorium_dust", "1x gtceu:protactinium_dust", "1x gtceu:uranium_dust", "1x gtceu:neptunium_dust",
                "1x gtceu:plutonium_dust", "1x gtceu:americium_dust", "1x gtceu:curium_dust"], ["8x gtceu:actinoids_1_dust"], [1600]],
        ["gtceu:actinoids_2_dust",
            ["1x gtceu:berkelium_dust", "1x gtceu:californium_dust", "1x gtceu:einsteinium_dust", "1x gtceu:fermium_dust", "1x gtceu:mendelevium_dust",
                "1x gtceu:nobelium_dust", "1x gtceu:lawrencium_dust"], ["7x gtceu:actinoids_2_dust"], [1400]]
    ]);

    gtr.mixer("gtceu:actinoids_dust")
        .itemInputs("1x gtceu:actinoids_1_dust", "1x gtceu:actinoids_2_dust").itemOutputs("2x gtceu:actinoids_dust")
        .EUt(GTValues.VA[GTValues.UIV]).duration(400)

    batch(gtr, "dimensionally_transcendent_mixer", ["itemInputs", "itemOutputs", ["EUt", GTValues.VA[GTValues.UIV]], "duration"], [
        ["gtceu:lanthanoids_1_dust",
            ["1x gtceu:lanthanum_dust", "1x gtceu:cerium_dust", "1x gtceu:praseodymium_dust", "1x gtceu:neodymium_dust", "1x gtceu:promethium_dust",
                "1x gtceu:samarium_dust", "1x gtceu:europium_dust", "1x gtceu:gadolinium_dust"], ["8x gtceu:lanthanoids_1_dust"], [1600]],
        ["gtceu:lanthanoids_2_dust",
            ["1x gtceu:terbium_dust", "1x gtceu:dysprosium_dust", "1x gtceu:holmium_dust", "1x gtceu:erbium_dust", "1x gtceu:thulium_dust",
                "1x gtceu:ytterbium_dust", "1x gtceu:lutetium_dust"], ["7x gtceu:lanthanoids_2_dust"], [1400]]
    ]);

    batch(gtr, "dimensionally_transcendent_mixer", ["inputFluids", "outputFluids", "EUt", "duration"], [
        ["gtceu:dimensionallytranscendentprosaiccatalyst",
            ["gtceu:dimensionallytranscendentcrudecatalyst 1000", "gtceu:heavy_quark_enriched_mixture 1000", "gtceu:oxygen_plasma 1000",
                "gtceu:argon_plasma 1000", "gtceu:iron_plasma 1000", "gtceu:nickel_plasma 1000"],
            ["gtceu:dimensionallytranscendentprosaiccatalyst 1000"], [GTValues.VA[GTValues.OpV]], [400]],
        ["gtceu:dimensionallytranscendentresplendentcatalyst",
            ["gtceu:dimensionallytranscendentprosaiccatalyst 1000", "gtceu:heavy_quark_enriched_mixture 1000", "gtceu:mithril_plasma 1000",
                "gtceu:orichalcum_plasma 1000", "gtceu:enderium_plasma 1000", "gtceu:infuscolium_plasma 1000"],
            ["gtceu:dimensionallytranscendentresplendentcatalyst 1000"], [GTValues.VA[GTValues.OpV]], [800]],
        ["gtceu:dimensionallytranscendentexoticcatalyst",
            ["gtceu:dimensionallytranscendentresplendentcatalyst 1000", "gtceu:heavy_quark_enriched_mixture 1000", "gtceu:echoite_plasma 1000",
                "gtceu:adamantium_plasma 1000", "gtceu:vibranium_plasma 1000", "gtceu:starmetal_plasma 1000"],
            ["gtceu:dimensionallytranscendentexoticcatalyst 1000"], [GTValues.VA[GTValues.OpV]], [1600]],
        ["gtceu:dimensionallytranscendentstellarcatalyst",
            ["gtceu:dimensionallytranscendentexoticcatalyst 1000", "gtceu:heavy_quark_enriched_mixture 1000", "gtceu:legendarium_plasma 1000",
                "gtceu:crystalmatrix_plasma 1000", "gtceu:draconiumawakened_plasma 1000", "gtceu:raw_star_matter_plasma 1000"],
            ["gtceu:dimensionallytranscendentstellarcatalyst 1000"], [GTValues.VA[GTValues.OpV]], [3200]],
        ["gtceu:exciteddtsc",
            ["gtceu:dimensionallytranscendentstellarcatalyst 10000", "gtceu:concentration_mixing_hyper_fuel_2 1000",
                "gtceu:high_energy_quark_gluon_plasma 1000"], ["gtceu:exciteddtsc 10000"], [GTValues.VA[GTValues.OpV]], [12000]],
        ["gtceu:primordialmatter",
            ["gtceu:raw_star_matter_plasma 1000", "gtceu:spacetime 1000", "gtceu:spatialfluid 1000", "gtceu:dimensionallytranscendentresidue 1000"],
            ["gtceu:primordialmatter 1000"], [GTValues.VA[GTValues.MAX]], [1200]]
    ]);

    gtr.dimensionally_transcendent_mixer("gtceu:chaos_plasma")
        .itemInputs("kubejs:chaos_shard")
        .inputFluids("gtceu:uu_matter 4000", "gtceu:cosmicneutronium 2000", "gtceu:cosmic_mesh_plasma 2000", "gtceu:raw_star_matter_plasma 1000",
            "gtceu:dimensionallytranscendentexoticcatalyst 1000")
        .outputFluids("gtceu:chaos_plasma 10000").EUt(GTValues.VA[GTValues.MAX]).duration(1200)

    batch(gtr, "assembler", ["itemInputs", "itemOutputs", "inputFluids", "EUt", ["duration", 1200]], [
        ["gtceu:luv_solar_panel",
            ["4x kubejs:pm_wafer", "16x gtceu:solar_panel", "16x gtceu:ulv_solar_panel", "16x gtceu:lv_solar_panel",
                "2x gtceu:cosmicneutronium_quadruple_wire", "4x gtceu:fusion_glass", "4x gtceu:double_hastelloyk_243_plate"],
            ["gtceu:luv_solar_panel"], ["gtceu:mutated_living_solder 576"], [GTValues.VA[GTValues.LuV]]],
        ["gtceu:zpm_solar_panel",
            ["4x kubejs:fm_wafer", "16x gtceu:mv_solar_panel", "16x gtceu:hv_solar_panel", "16x gtceu:ev_solar_panel",
                "2x gtceu:cosmicneutronium_hex_wire", "16x gtceu:fusion_glass", "16x gtceu:double_vibranium_plate"], ["gtceu:zpm_solar_panel"],
            ["gtceu:mutated_living_solder 1296"], [GTValues.VA[GTValues.ZPM]]],
        ["gtceu:uv_solar_panel",
            ["16x kubejs:fm_wafer", "16x gtceu:iv_solar_panel", "16x gtceu:luv_solar_panel", "16x gtceu:zpm_solar_panel", "2x gtceu:infinity_hex_wire",
                "64x gtceu:fusion_glass", "64x gtceu:double_neutronium_plate"], ["gtceu:uv_solar_panel"], ["gtceu:super_mutated_living_solder 576"],
            [GTValues.VA[GTValues.UV]]]
    ]);

    batch(gtr, "neutron_compressor", ["itemInputs", "itemOutputs", ["EUt", GTValues.VA[GTValues.MAX]], ["duration", 200]], [
        ["kubejs:combined_singularity_0", ["64x gtceu:lafium_block", "64x gtceu:potin_block"], ["kubejs:combined_singularity_0"]],
        ["kubejs:combined_singularity_1", ["64x gtceu:enderite_block", "64x gtceu:indium_gallium_phosphide_block"], ["kubejs:combined_singularity_1"]],
        ["kubejs:combined_singularity_2", ["64x gtceu:ruthenium_trinium_americium_neutronate_block", "64x gtceu:yttrium_barium_cuprate_block"],
            ["kubejs:combined_singularity_2"]],
        ["kubejs:combined_singularity_3", ["64x gtceu:hastelloyk_243_block", "64x gtceu:cobalt_brass_block"], ["kubejs:combined_singularity_3"]],
        ["kubejs:combined_singularity_4", ["64x gtceu:titansteel_block", "64x gtceu:uranium_rhodium_dinaquadide_block"],
            ["kubejs:combined_singularity_4"]],
        ["kubejs:combined_singularity_5", ["64x gtceu:hastelloy_x_block", "64x gtceu:red_steel_block"], ["kubejs:combined_singularity_5"]],
        ["kubejs:combined_singularity_6", ["64x gtceu:highurabilityompoundteel_block", "64x gtceu:germaniumtungstennitride_block"],
            ["kubejs:combined_singularity_6"]],
        ["kubejs:combined_singularity_7", ["64x gtceu:hsse_block", "64x gtceu:watertight_steel_block"], ["kubejs:combined_singularity_7"]],
        ["kubejs:combined_singularity_8", ["64x gtceu:pikyonium_block", "64x gtceu:aluminium_bronze_block"], ["kubejs:combined_singularity_8"]],
        ["kubejs:combined_singularity_9", ["64x gtceu:abyssalalloy_block", "64x gtceu:soldering_alloy_block"], ["kubejs:combined_singularity_9"]],
        ["kubejs:combined_singularity_10", ["64x gtceu:black_titanium_block", "64x gtceu:nickel_zinc_ferrite_block"],
            ["kubejs:combined_singularity_10"]],
        ["kubejs:combined_singularity_11", ["64x gtceu:ultimet_block", "64x gtceu:hsla_steel_block"], ["kubejs:combined_singularity_11"]],
        ["kubejs:combined_singularity_12", ["64x gtceu:enriched_naquadah_trinium_europium_duranide_block", "64x gtceu:rtm_alloy_block"],
            ["kubejs:combined_singularity_12"]],
        ["kubejs:combined_singularity_13", ["64x gtceu:blue_steel_block", "64x gtceu:hastelloy_c_276_block"], ["kubejs:combined_singularity_13"]],
        ["kubejs:combined_singularity_14", ["64x gtceu:cinobite_block", "64x gtceu:stellite_100_block"], ["kubejs:combined_singularity_14"]],
        ["kubejs:combined_singularity_15", ["64x gtceu:maraging_steel_300_block", "64x gtceu:grisium_block"], ["kubejs:combined_singularity_15"]]
    ]);

    batch(gtr, "qft", ["notConsumable",
        ["itemInputs", "64x gtceu:neutronium_block", "kubejs:combined_singularity_0", "kubejs:combined_singularity_1", "kubejs:combined_singularity_2",
            "kubejs:combined_singularity_3", "kubejs:combined_singularity_4", "kubejs:combined_singularity_5", "kubejs:combined_singularity_6",
            "kubejs:combined_singularity_7", "kubejs:combined_singularity_8", "kubejs:combined_singularity_9", "kubejs:combined_singularity_10",
            "kubejs:combined_singularity_11", "kubejs:combined_singularity_12", "kubejs:combined_singularity_13", "kubejs:combined_singularity_14",
            "kubejs:combined_singularity_15"], "inputFluids", "itemOutputs", ["EUt", 16 * GTValues.VA[GTValues.MAX]], ["duration", 200]], [
        ["avaritia:eternal_singularity", ["avaritia:infinity_catalyst"],
            ["gtceu:draconiumawakened 1000", "gtceu:cosmicneutronium 1000", "gtceu:dimensionallytranscendentstellarcatalyst 1000"],
            ["avaritia:eternal_singularity"]],
        ["avaritia:eternal_singularity_1", ["kubejs:eternity_catalyst"],
            ["gtceu:cosmicneutronium 1000", "gtceu:exciteddtec 1000", "gtceu:spatialfluid 1000"], ["16x avaritia:eternal_singularity"]]
    ]);

    gtr.qft("gtceu:spatialfluid")
        .notConsumable("kubejs:hypercube").notConsumable("kubejs:quantum_anomaly").itemInputs("16x gtceu:cosmicneutronium_plate")
        .inputFluids("gtceu:temporalfluid 10000", "gtceu:exciteddtsc 10000").outputFluids("gtceu:spatialfluid 10000")
        .EUt(4 * GTValues.VA[GTValues.MAX]).duration(600)

    gtr.qft("kubejs:quantum_anomaly")
        .chancedInput("gtceu:draconium_nanoswarm", 100, 0).itemInputs("kubejs:entangled_singularity")
        .inputFluids("gtceu:duranium 144", "gtceu:exciteddtec 100").chancedOutput("kubejs:quantum_anomaly", 1000, 0)
        .EUt(GTValues.VA[GTValues.MAX]).duration(400)

    gtr.qft("gtceu:radox_gas")
        .notConsumable("kubejs:quantum_anomaly").itemInputs("64x kubejs:variation_wood")
        .inputFluids("gtceu:xenoxene 10000", "gtceu:unknowwater 90000", "gtceu:temporalfluid 100").outputFluids("gtceu:radox_gas 100000")
        .EUt(GTValues.VA[GTValues.MAX]).duration(400)

    batch(gtr, "qft", ["circuit", "inputFluids", "outputFluids", ["EUt", GTValues.VA[GTValues.UEV]], ["duration", 20]], [
        ["gtceu:grade_8_purified_water", [1], ["minecraft:water 8000"], ["gtceu:grade_8_purified_water 1000"]],
        ["gtceu:grade_16_purified_water", [2], ["minecraft:water 16000"], ["gtceu:grade_16_purified_water 1000"]]
    ]);

    gtr.dimensionally_transcendent_plasma_forge("kubejs:hypercube_1")
        .itemInputs("16x gtceu:transcendentmetal_rod", "kubejs:quantum_anomaly").inputFluids("gtceu:exciteddtec 1000", "gtceu:spatialfluid 1000")
        .itemOutputs("64x kubejs:hypercube").outputFluids("gtceu:dimensionallytranscendentresidue 100").EUt(16 * GTValues.VA[GTValues.MAX])
        .duration(6400).blastFurnaceTemp(62000)

    gtr.chemical_reactor("gtceu:sodium_hypochlorite_dust")
        .circuit(1).itemInputs("6x gtceu:sodium_hydroxide_dust").inputFluids("gtceu:chlorine 2000")
        .itemOutputs("3x gtceu:sodium_hypochlorite_dust", "2x gtceu:salt_dust").outputFluids("minecraft:water 1000").EUt(120).duration(80)

    gtr.electrolyzer("gtceu:sodium_chlorate_dust")
        .itemInputs("9x gtceu:sodium_hypochlorite_dust").itemOutputs("5x gtceu:sodium_chlorate_dust", "4x gtceu:salt_dust").EUt(120)
        .duration(210)

    gtr.dehydrator("gtceu:phthalic_anhydride_dust")
        .inputFluids("gtceu:phthalic_acid 1000").itemOutputs("15x gtceu:phthalic_anhydride_dust").EUt(480).duration(400)

    gtr.chemical_reactor("gtceu:ethylanthraquinone")
        .itemInputs("15x gtceu:phthalic_anhydride_dust").inputFluids("gtceu:ethylbenzene 1000")
        .outputFluids("gtceu:ethylanthraquinone 1000", "minecraft:water 1000").EUt(480).duration(800)

    gtr.chemical_reactor("gtceu:ethylanthrahydroquinone")
        .inputFluids("gtceu:ethylanthraquinone 1000", "gtceu:hydrogen 2000").outputFluids("gtceu:ethylanthrahydroquinone 1000").EUt(30)
        .duration(200)

    gtr.chemical_reactor("gtceu:hydrogen_peroxide")
        .notConsumableFluid("gtceu:anthracene 1000").inputFluids("gtceu:ethylanthrahydroquinone 1000", "gtceu:oxygen 2000")
        .outputFluids("gtceu:hydrogen_peroxide 1000", "gtceu:ethylanthraquinone 1000").EUt(480).duration(600)

    gtr.arc_furnace("gtceu:anthracene")
        .itemInputs("gtceu:coke_gem").outputFluids("gtceu:anthracene 100").EUt(120).duration(400)

    gtr.chemical_reactor("gtceu:sodium_perchlorate_dust")
        .inputFluids("gtceu:hydrogen_peroxide 1000").itemInputs("5x gtceu:sodium_chlorate_dust").itemOutputs("6x gtceu:sodium_perchlorate_dust")
        .outputFluids("minecraft:water 1000").EUt(120).duration(480)

    gtr.chemical_reactor("gtceu:silver_chloride_dust")
        .itemInputs("gtceu:silver_dust").inputFluids("gtceu:chlorine 1000").itemOutputs("2x gtceu:silver_chloride_dust").EUt(120).duration(80)

    gtr.chemical_reactor("gtceu:silver_oxide_dust")
        .notConsumable("gtceu:sodium_hydroxide_dust").itemInputs("4x gtceu:silver_chloride_dust").inputFluids("minecraft:water 1000")
        .itemOutputs("3x gtceu:silver_oxide_dust").outputFluids("gtceu:diluted_hydrochloric_acid 2000").EUt(30).duration(100)

    gtr.large_chemical_reactor("gtceu:silver_perchlorate_dust")
        .itemInputs("3x gtceu:silver_oxide_dust", "12x gtceu:sodium_perchlorate_dust").inputFluids("gtceu:hydrochloric_acid 1000")
        .itemOutputs("12x gtceu:silver_perchlorate_dust", "3x gtceu:sodium_oxide_dust").outputFluids("gtceu:diluted_hydrochloric_acid 1000")
        .EUt(480).duration(350)

    gtr.chemical_reactor("gtceu:phenylsodium")
        .itemInputs("2x gtceu:sodium_dust").inputFluids("gtceu:fluoro_benzene 1000").outputFluids("gtceu:phenylsodium 1000")
        .itemOutputs("2x gtceu:sodium_fluoride_dust").EUt(480).duration(210)

    gtr.chemical_reactor("gtceu:tetraethylammonium_bromide")
        .inputFluids("gtceu:ethylene 4000", "gtceu:ammonia 1000", "gtceu:hydrobromic_acid 1000")
        .outputFluids("gtceu:tetraethylammonium_bromide 1000").EUt(1920).duration(200)

    gtr.chemical_reactor("gtceu:difluoroaniline")
        .itemInputs("8x gtceu:sodium_fluoride_dust").inputFluids("gtceu:hydrogen 1000", "gtceu:dichlorobenzene 1000", "gtceu:nitrogen 1000")
        .outputFluids("gtceu:difluoroaniline 2000").itemOutputs("8x gtceu:salt_dust").EUt(7680).duration(200)

    gtr.large_chemical_reactor("gtceu:succinaldehyde")
        .itemInputs("14x gtceu:succinic_acid_dust", "4x gtceu:lithium_aluminium_hydride_dust")
        .outputFluids("gtceu:succinaldehyde 1000", "minecraft:water 2000").itemOutputs("1x gtceu:lithium_dust", "1x gtceu:aluminium_dust")
        .EUt(1920).duration(600)

    gtr.chemical_reactor("gtceu:n_difluorophenylpyrrole")
        .notConsumable("gtceu:phosphorus_pentoxide_dust").inputFluids("gtceu:succinaldehyde 1000", "gtceu:difluoroaniline 1000")
        .outputFluids("gtceu:n_difluorophenylpyrrole 1000", "minecraft:water 2000").EUt(480).duration(180)

    gtr.large_chemical_reactor("gtceu:photopolymer")
        .itemInputs("69x gtceu:cyclopentadienyl_titanium_trichloride_dust", "42x gtceu:ice_dust", "12x gtceu:silver_perchlorate_dust")
        .inputFluids("gtceu:phenylsodium 8000", "gtceu:silver_tetrafluoroborate 2000", "gtceu:hydrochloric_acid 2000", "gtceu:n_difluorophenylpyrrole 6000",
            "gtceu:tetraethylammonium_bromide 2000")
        .itemOutputs("8x gtceu:silver_chloride_dust", "4x gtceu:sodium_bromide_dust")
        .outputFluids("gtceu:salt_water 6000", "gtceu:photopolymer 8000").EUt(30720).duration(340).cleanroom(CleanroomType.CLEANROOM)

    gtr.autoclave("kubejs:hassium_seed_crystal")
        .itemInputs("gtceu:tiny_hassium_dust").inputFluids("gtceu:nitrogen 10000").itemOutputs("kubejs:hassium_seed_crystal")
        .EUt(GTValues.VA[GTValues.UIV]).duration(200).cleanroom(CleanroomType.CLEANROOM)

    gtr.assembler("gtlcore:manipulator")
        .itemInputs("2x gtceu:neutron_reflector", "4x #gtceu:circuits/uhv", "gtceu:uev_robot_arm", "32x gtceu:inconel_792_bolt", "16x gtceu:diamond_screw",
            "4x gtceu:double_iridium_plate", "8x gtceu:double_zeron_100_plate")
        .inputFluids("gtceu:mutated_living_solder 576").itemOutputs("gtlcore:manipulator").EUt(30720).duration(400)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.mixer("gtceu:rhodium_rhenium_naquadah_catalyst_dust")
        .itemInputs("gtceu:rhenium_dust", "gtceu:rhodium_dust", "gtceu:naquadah_dust")
        .itemOutputs("gtceu:rhodium_rhenium_naquadah_catalyst_dust").EUt(84500).duration(260)

    gtr.chemical_reactor("gtceu:iodine_monochloride")
        .itemInputs("gtceu:iodine_dust").inputFluids("gtceu:chlorine 1000").outputFluids("gtceu:iodine_monochloride 1000").EUt(120).duration(260)

    gtr.chemical_reactor("gtceu:dimethylnaphthalene")
        .inputFluids("gtceu:methanol 2000", "gtceu:naphthalene 1000").outputFluids("gtceu:dimethylnaphthalene 1000", "minecraft:water 2000")
        .EUt(120).duration(200)

    gtr.chemical_reactor("gtceu:dimethyldichlorosilane_a")
        .circuit(1).itemInputs("gtceu:silicon_dust").inputFluids("gtceu:chloromethane 2000").outputFluids("gtceu:dimethyldichlorosilane 1000")
        .EUt(96).duration(240)

    gtr.large_chemical_reactor("gtceu:acetylating_reagent")
        .itemInputs("6x gtceu:magnesium_chloride_dust")
        .inputFluids("gtceu:bromine 2000", "gtceu:trimethylchlorosilane 1000", "gtceu:acetylene 3000")
        .outputFluids("gtceu:hydrochloric_acid 3000", "gtceu:chlorine 2000", "gtceu:acetylating_reagent 1000").EUt(480).duration(350)

    gtr.large_chemical_reactor("gtceu:dihydroiodotetracene")
        .notConsumable("gtceu:rhodium_rhenium_naquadah_catalyst_dust").itemInputs("12x gtceu:bromo_succinimide_dust")
        .inputFluids("gtceu:iodine_monochloride 1000", "gtceu:acetylating_reagent 1000", "gtceu:dimethylnaphthalene 1000", "gtceu:chlorine 2000")
        .itemOutputs("6x gtceu:magnesium_chloride_bromide_dust", "12x gtceu:succinimide_dust")
        .outputFluids("gtceu:dihydroiodotetracene 1000", "gtceu:trimethylchlorosilane 1000", "gtceu:hydrobromic_acid 1000").EUt(122880)
        .duration(350)

    gtr.chemical_reactor("gtceu:isopropyl_alcohol")
        .notConsumable("gtceu:tungstate_dust").notConsumable("gtceu:sodium_seaborgate_dust")
        .inputFluids("gtceu:propene 1000", "minecraft:water 1000").outputFluids("gtceu:isopropyl_alcohol 1000").EUt(480).duration(400)

    gtr.large_chemical_reactor("gtceu:dichlorodicyanobenzoquinone")
        .inputFluids("gtceu:hydrogen_cyanide 2000", "gtceu:chlorine 10000", "gtceu:phenol 1000", "gtceu:oxygen 1000")
        .outputFluids("gtceu:diluted_hydrochloric_acid 8000", "gtceu:dichlorodicyanobenzoquinone 1000").EUt(30720).duration(250)

    gtr.chemical_reactor("gtceu:dichlorodicyanobenzoquinone_1")
        .inputFluids("gtceu:hydrogen_peroxide 1000", "gtceu:dichlorodicyanohydroquinone 1000")
        .outputFluids("minecraft:water 2000", "gtceu:dichlorodicyanobenzoquinone 1000").EUt(480).duration(250)

    gtr.large_chemical_reactor("gtceu:tetracene_dust")
        .notConsumable("gtceu:blacklight")
        .inputFluids("gtceu:isopropyl_alcohol 1000", "gtceu:dichlorodicyanobenzoquinone 2000", "gtceu:dihydroiodotetracene 2000")
        .itemOutputs("60x gtceu:tetracene_dust", "2x gtceu:iodine_dust")
        .outputFluids("gtceu:dichlorodicyanohydroquinone 2000", "gtceu:acetone 1000").EUt(491520).duration(260)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.mixer("gtceu:polycyclic_aromatic_mixture_dust")
        .itemInputs("2x gtceu:tetracene_dust").inputFluids("gtceu:naphthalene 1000").itemOutputs("3x gtceu:polycyclic_aromatic_mixture_dust")
        .EUt(7680).duration(240).cleanroom(CleanroomType.CLEANROOM)

    gtr.assembler("kubejs:wyvern_energy_core")
        .itemInputs("16x kubejs:wyvern_core", "64x kubejs:draconium_block_charged", "64x gtceu:iv_lapotronic_battery", "64x gtceu:luv_lapotronic_battery",
            "64x gtceu:double_draconium_plate")
        .inputFluids("gtceu:mutated_living_solder 5760").itemOutputs("kubejs:wyvern_energy_core").EUt(GTValues.VA[GTValues.UXV]).duration(2400)

    gtr.sps_crafting("kubejs:dust_blizz")
        .itemInputs("minecraft:blaze_powder", "gtceu:aluminium_sulfite_dust", "16x minecraft:snowball")
        .inputFluids("gtceu:mana 1000", "gtceu:ice 1000").itemOutputs("2x kubejs:dust_blizz").EUt(GTValues.VA[GTValues.UEV]).duration(200)

    gtr.alloy_smelter("kubejs:dust_cryotheum")
        .itemInputs("kubejs:dust_blizz", "gtceu:enderium_dust").itemOutputs("2x kubejs:dust_cryotheum").EUt(GTValues.VA[GTValues.UEV])
        .duration(160)

    gtr.extractor("kubejs:gelid_cryotheum")
        .itemInputs("kubejs:dust_cryotheum").outputFluids("kubejs:gelid_cryotheum 144").EUt(GTValues.VA[GTValues.UV]).duration(80)

    gtr.chemical_reactor("gtceu:nitrogen_pentoxide")
        .inputFluids("gtceu:ozone 1000", "gtceu:nitrogen_dioxide 6000").outputFluids("gtceu:nitrogen_pentoxide 3000").EUt(480).duration(240)

    batch(gtr, "chemical_reactor", ["itemInputs", "inputFluids", "outputFluids", "itemOutputs", "EUt", "duration"], [
        ["gtceu:sodium_azanide_dust", ["gtceu:sodium_dust"], ["gtceu:ammonia 1000"], ["gtceu:hydrogen 1000"], ["4x gtceu:sodium_azanide_dust"], [120],
            [110]],
        ["gtceu:sodium_azide_dust", ["8x gtceu:sodium_azanide_dust"], ["gtceu:nitrogen_dioxide 1000"], ["gtceu:ammonia 1000"],
            ["4x gtceu:sodium_azide_dust", "3x gtceu:sodium_hydroxide_dust"], [480], [170]]
    ]);

    gtr.chemical_reactor("gtceu:ethylamine")
        .inputFluids("gtceu:ammonia 1000", "gtceu:ethylene 1000").notConsumable("gtceu:sodium_azanide_dust")
        .outputFluids("gtceu:ethylamine 1000").EUt(480).duration(130)

    gtr.chemical_reactor("gtceu:isochloropropane")
        .inputFluids("gtceu:propane 1000", "gtceu:chlorine 2000").outputFluids("gtceu:isochloropropane 1000", "gtceu:hydrochloric_acid 1000")
        .EUt(30).duration(100)

    gtr.large_chemical_reactor("gtceu:rhenium_hassium_thallium_isophtaloylbisdiethylthiourea_hexaf_dust")
        .itemInputs("2x gtceu:thallium_chloride_dust", "5x gtceu:hassium_chloride_dust", "6x gtceu:rhenium_chloride_dust")
        .inputFluids("gtceu:hexafluorophosphoric_acid 1000", "gtceu:isophthaloylbis 3000")
        .itemOutputs("125x gtceu:rhenium_hassium_thallium_isophtaloylbisdiethylthiourea_hexaf_dust")
        .outputFluids("gtceu:hydrochloric_acid 7000", "gtceu:chlorine 3000").EUt(GTValues.VA[GTValues.UIV]).duration(200)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.chemical_reactor("gtceu:thallium_chloride_dust")
        .itemInputs("gtceu:thallium_dust").inputFluids("gtceu:hydrochloric_acid 1000").itemOutputs("2x gtceu:thallium_chloride_dust")
        .outputFluids("gtceu:hydrogen 1000").EUt(120).duration(100)

    batch(gtr, "electric_blast_furnace", ["itemInputs", "inputFluids", "itemOutputs", ["EUt", 120], ["duration", 930], "blastFurnaceTemp"], [
        ["gtceu:hassium_chloride_dust", ["gtceu:hassium_dust"], ["gtceu:chlorine 4000"], ["5x gtceu:hassium_chloride_dust"], [12000]],
        ["gtceu:rhenium_chloride_dust", ["gtceu:rhenium_dust"], ["gtceu:chlorine 5000"], ["6x gtceu:rhenium_chloride_dust"], [12500]]
    ]);

    gtr.large_chemical_reactor("gtceu:isophthaloylbis")
        .inputFluids("gtceu:phenylenedioxydiacetic_acid 1000", "gtceu:thionyl_chloride 2000", "gtceu:diethylthiourea 2000")
        .outputFluids("gtceu:isophthaloylbis 1000", "gtceu:sulfur_dioxide 2000", "gtceu:hydrochloric_acid 4000").EUt(122880).duration(250)

    gtr.large_chemical_reactor("gtceu:diethylthiourea")
        .inputFluids("gtceu:hydrochloric_acid 1000", "gtceu:ethylamine 2000", "gtceu:sodium_thiocyanate 1000")
        .outputFluids("gtceu:diethylthiourea 1000", "gtceu:ammonia 1000").itemOutputs("2x gtceu:salt_dust").EUt(30720).duration(210)

    batch(gtr, "chemical_reactor", [["itemInputs", "gtceu:sulfur_dust"], "inputFluids", "outputFluids", ["EUt", 120], ["duration", 100]], [
        ["gtceu:sodium_thiocyanate", ["gtceu:sodium_cyanide 1000"], ["gtceu:sodium_thiocyanate 1000"]],
        ["gtceu:thionyl_chloride", ["gtceu:sulfur_trioxide 1000", "gtceu:chlorine 2000"], ["gtceu:thionyl_chloride 1000", "gtceu:sulfur_dioxide 1000"]]
    ]);

    gtr.large_chemical_reactor("gtceu:phenylenedioxydiacetic_acid")
        .inputFluids("minecraft:water 1000", "gtceu:hydrogen_peroxide 1000", "gtceu:phenol 1000", "gtceu:ethenone 2000", "gtceu:chlorine 4000")
        .outputFluids("gtceu:phenylenedioxydiacetic_acid 1000", "gtceu:hydrochloric_acid 4000").EUt(122880).duration(320)

    gtr.large_chemical_reactor("gtceu:hexafluorophosphoric_acid")
        .inputFluids("gtceu:antimony_pentafluoride 1000", "gtceu:phosphorus_trichloride 1000", "gtceu:hydrofluoric_acid 1000")
        .outputFluids("gtceu:hexafluorophosphoric_acid 1000").itemOutputs("4x gtceu:antimony_trichloride_dust").EUt(30720).duration(280)

    batch(gtr, "chemical_reactor", ["itemInputs", "inputFluids", "outputFluids", "EUt", "duration"], [
        ["gtceu:phosphorus_trichloride", ["gtceu:phosphorus_dust"], ["gtceu:chlorine 3000"], ["gtceu:phosphorus_trichloride 1000"], [30], [60]],
        ["gtceu:antimony_pentafluoride", ["4x gtceu:antimony_trifluoride_dust"], ["gtceu:fluorine 2000"], ["gtceu:antimony_pentafluoride 1000"], [480],
            [100]]
    ]);

    gtr.chemical_reactor("gtceu:antimony_trifluoride_dust_a")
        .itemInputs("4x gtceu:antimony_trichloride_dust").inputFluids("gtceu:hydrofluoric_acid 3000")
        .outputFluids("gtceu:hydrochloric_acid 3000").itemOutputs("4x gtceu:antimony_trifluoride_dust").EUt(480).duration(210)

    gtr.chemical_reactor("gtceu:carbon_tetrachloride")
        .circuit(4).itemInputs("gtceu:carbon_dust").inputFluids("gtceu:chlorine 4000").outputFluids("gtceu:carbon_tetrachloride 1000").EUt(120)
        .duration(200)

    gtr.chemical_reactor("gtceu:actinium_oxalate_dust")
        .itemInputs("gtceu:actinium_dust").inputFluids("gtceu:oxalic_acid 4000").itemOutputs("13x gtceu:actinium_oxalate_dust").EUt(1920)
        .duration(200)

    gtr.electric_blast_furnace("gtceu:atinium_hydride_dust")
        .itemInputs("13x gtceu:actinium_oxalate_dust", "6x gtceu:sodium_hydride_dust", "gtceu:sodium_dust")
        .inputFluids("gtceu:carbon_tetrachloride 3000").itemOutputs("4x gtceu:atinium_hydride_dust", "8x gtceu:salt_dust")
        .outputFluids("gtceu:carbon_dioxide 5000").EUt(122880).duration(400).blastFurnaceTemp(10700)

    gtr.stellar_forge("gtceu:actinium_superhydride_plasma")
        .itemInputs("kubejs:naquadria_charge", "36x gtceu:atinium_hydride_dust").inputFluids("gtceu:hydrogen 81000")
        .outputFluids("gtceu:actinium_superhydride_plasma 36000").EUt(GTValues.VA[GTValues.UIV]).duration(200).addData("SCTier", 1)

    gtr.canner("kubejs:actinium_superhydride_plasma_containment_cell")
        .notConsumable("gtceu:infuscolium_nanoswarm").inputFluids("gtceu:actinium_superhydride_plasma 1000")
        .itemInputs("kubejs:plasma_containment_cell").itemOutputs("kubejs:actinium_superhydride_plasma_containment_cell")
        .EUt(GTValues.VA[GTValues.UIV]).duration(20).cleanroom(CleanroomType.CLEANROOM)

    gtr.plasma_condenser("gtceu:actinium_superhydride_dust")
        .itemInputs("kubejs:actinium_superhydride_plasma_containment_cell").inputFluids("gtceu:liquid_helium 24000")
        .itemOutputs("13x gtceu:actinium_superhydride_dust", "kubejs:plasma_containment_cell").outputFluids("gtceu:helium 24000")
        .EUt(GTValues.VA[GTValues.UIV]).duration(340)

    gtr.large_chemical_reactor("gtceu:cosmic_superconductor")
        .itemInputs("125x gtceu:rhenium_hassium_thallium_isophtaloylbisdiethylthiourea_hexaf_dust", "39x gtceu:actinium_superhydride_dust",
            "14x gtceu:charged_caesium_cerium_cobalt_indium_dust")
        .inputFluids("gtceu:light_quarks 10000", "gtceu:free_alpha_gas 1000").outputFluids("gtceu:cosmic_superconductor 10000")
        .EUt(GTValues.VA[GTValues.UXV]).duration(600).cleanroom(GTLCleanroomType.LAW_CLEANROOM)

    gtr.mixer("gtceu:charged_caesium_cerium_cobalt_indium_dust")
        .itemInputs("10x gtceu:indium_dust", "2x gtceu:cobalt_dust", "1x gtceu:cerium_dust", "1x gtceu:caesium_dust")
        .inputFluids("gtceu:cosmic_computing_mixture 1000").itemOutputs("14x gtceu:charged_caesium_cerium_cobalt_indium_dust")
        .EUt(GTValues.VA[GTValues.UIV]).duration(400).cleanroom(CleanroomType.CLEANROOM)

    gtr.large_chemical_reactor("kubejs:charged_lepton_trap_crystal")
        .notConsumable("gtceu:starmetal_nanoswarm").itemInputs("kubejs:lepton_trap_crystal", "2x gtceu:small_vibranium_dust")
        .inputFluids("gtceu:free_electron_gas 1000", "gtceu:heavy_lepton_mixture 1000").itemOutputs("kubejs:charged_lepton_trap_crystal")
        .EUt(491520).duration(240).cleanroom(GTLCleanroomType.LAW_CLEANROOM)

    gtr.electric_blast_furnace("kubejs:lepton_trap_crystal")
        .itemInputs("gtceu:meitnerium_dust", "gtceu:molybdenum_dust", "gtceu:rhenium_dust").inputFluids("gtceu:naquadah_alloy 288")
        .itemOutputs("kubejs:lepton_trap_crystal").EUt(3450000).duration(340).blastFurnaceTemp(10900)

    gtr.chemical_reactor("gtceu:styrene_a")
        .circuit(1).inputFluids("gtceu:ethylbenzene 1000").outputFluids("gtceu:styrene 1000", "gtceu:hydrogen 2000").EUt(30).duration(30)

    gtr.electric_blast_furnace("kubejs:taranium_boulea")
        .itemInputs("64x gtceu:silicon_block", "8x gtceu:taranium_ingot", "4x gtceu:gallium_arsenide_dust").inputFluids("gtceu:radon 16000")
        .itemOutputs("kubejs:taranium_boule").EUt(GTValues.VA[GTValues.ZPM]).duration(24000).blastFurnaceTemp(10500)

    gtr.assembler("gtceu:integrated_ore_processor")
        .itemInputs("gtceu:large_maceration_tower", "gtceu:large_centrifuge", "gtceu:large_sifting_funnel", "gtceu:large_chemical_bath",
            "8x gtceu:zpm_robot_arm", "8x gtceu:zpm_electric_pump", "8x gtceu:zpm_conveyor_module", "4x #gtceu:circuits/uhv",
            "16x gtceu:double_hsss_plate")
        .inputFluids("gtceu:duranium 2880").itemOutputs("gtceu:integrated_ore_processor").EUt(GTValues.VA[GTValues.ZPM]).duration(1000)

    gtr.alloy_smelter("gtlcore:dragon_strength_tritanium_casing")
        .itemInputs("16x gtlcore:extreme_strength_tritanium_casing", "16x kubejs:draconium_block_charged")
        .itemOutputs("gtlcore:dragon_strength_tritanium_casing").EUt(GTValues.VA[GTValues.UEV]).duration(2000)

    gtr.chemical_reactor("gtlcore:blaze_blast_furnace_casing")
        .itemInputs("gtceu:high_temperature_smelting_casing", "32x gtceu:tin_foil")
        .inputFluids("gtceu:blaze 1440", "gtceu:gallium_arsenide 576", "gtceu:vanadium_gallium 288")
        .itemOutputs("gtlcore:blaze_blast_furnace_casing").EUt(1920).duration(900).cleanroom(CleanroomType.CLEANROOM)

    gtr.chemical_reactor("gtceu:vinyl_chloride_a")
        .circuit(1).inputFluids("gtceu:chlorine 4000", "gtceu:ethane 1000")
        .outputFluids("gtceu:vinyl_chloride 1000", "gtceu:hydrochloric_acid 3000").EUt(30).duration(160)

    gtr.assembly_line("kubejs:dimension_creation_casing")
        .itemInputs("gtceu:infinity_frame", "64x gtceu:lv_world_accelerator", "64x gtceu:mv_world_accelerator", "64x gtceu:hv_world_accelerator",
            "64x gtceu:ev_world_accelerator", "64x gtceu:iv_world_accelerator", "64x gtceu:luv_world_accelerator",
            "64x gtceu:zpm_world_accelerator", "64x gtceu:uv_world_accelerator", "16x gtlcore:hyper_core", "4x gtlcore:spacetimebendingcore",
            "4x kubejs:dimensional_stability_casing", "4x kubejs:spacetime_compression_field_generator", "6x kubejs:topological_manipulator_unit",
            "gtlcore:max_field_generator", "4x gtceu:double_eternity_plate")
        .inputFluids("gtceu:infinity 576", "gtceu:super_mutated_living_solder 1000", "gtceu:liquid_cosmic_mesh 1000", "gtceu:spatialfluid 2000")
        .itemOutputs("kubejs:dimension_creation_casing").EUt(GTValues.VA[GTValues.MAX]).duration(1200)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtlcore:dimension_connection_casing")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(GTValues.VA[GTValues.MAX]).CWUt(8192))

    gtr.assembly_line("gtceu:door_of_create")
        .itemInputs("16x gtceu:infinity_frame", "16x gtceu:eye_of_harmony", "16x kubejs:dimension_creation_casing",
            "16x gtlcore:dimension_connection_casing", "8x kubejs:suprachronal_mainframe_complex", "8x kubejs:cosmic_singularity",
            "8x kubejs:chaotic_core", "64x kubejs:void_matter", "16x kubejs:quantum_anomaly", "16x gtlcore:max_robot_arm",
            "gtlcore:mega_max_battery", "64x gtceu:double_cosmic_plate")
        .inputFluids("gtceu:super_mutated_living_solder 288000", "gtceu:infinity 100000", "gtceu:liquid_cosmic_mesh 100000", "gtceu:spacetime 100000")
        .itemOutputs("gtceu:door_of_create").EUt(4 * GTValues.VA[GTValues.MAX]).duration(2400)
        .stationResearch(b => b.researchStack(Registries.getItemStack("kubejs:dimension_creation_casing")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(GTValues.VA[GTValues.MAX]).CWUt(16384))

    gtr.assembler("gtlcore:dimension_connection_casing")
        .itemInputs("gtceu:draconium_frame", "kubejs:dimensional_bridge_casing", "gtceu:periodicium_block", "8x gtceu:double_mithril_plate",
            "4x gtceu:cosmic_plate", "2x gtceu:double_shirabon_plate")
        .itemOutputs("gtlcore:dimension_connection_casing").EUt(GTValues.VA[GTValues.MAX]).duration(400)

    gtr.lightning_processor("gtceu:adamantine_compounds_dust_a")
        .notConsumable("kubejs:microwormhole_generator").itemInputs("4x gtceu:adamantine_compounds_dust").itemOutputs("gtceu:adamantine_dust")
        .inputFluids("gtceu:mana 1000").EUt(GTValues.VA[GTValues.UXV]).duration(20)

    batch(gtr, "assembler", [["notConsumable", "gtceu:spacetime_nanoswarm"], ["notConsumable", "gtceu:cosmicneutronium_nanoswarm"], "itemInputs", "itemOutputs",
        ["EUt", 65536 * GTValues.VA[GTValues.MAX]], "circuit", ["duration", 200]], [
        ["kubejs:magnetohydrodynamicallyconstrainedstarmatter_helmet",
            ["50x gtceu:magnetohydrodynamicallyconstrainedstarmatter_ingot", "kubejs:command_block_core"],
            ["kubejs:magnetohydrodynamicallyconstrainedstarmatter_helmet"], [1]],
        ["kubejs:magnetohydrodynamicallyconstrainedstarmatter_chestplate",
            ["80x gtceu:magnetohydrodynamicallyconstrainedstarmatter_ingot", "kubejs:command_block_core"],
            ["kubejs:magnetohydrodynamicallyconstrainedstarmatter_chestplate"], [2]],
        ["kubejs:magnetohydrodynamicallyconstrainedstarmatter_leggings",
            ["70x gtceu:magnetohydrodynamicallyconstrainedstarmatter_ingot", "kubejs:command_block_core"],
            ["kubejs:magnetohydrodynamicallyconstrainedstarmatter_leggings"], [3]],
        ["kubejs:magnetohydrodynamicallyconstrainedstarmatter_boots",
            ["40x gtceu:magnetohydrodynamicallyconstrainedstarmatter_ingot", "kubejs:command_block_core"],
            ["kubejs:magnetohydrodynamicallyconstrainedstarmatter_boots"], [4]]
    ]);

    gtr.large_chemical_reactor("gtceu:glycerol_a")
        .circuit(1).notConsumable("gtceu:soda_ash_dust").notConsumableFluid("gtceu:carbon_dioxide 10000")
        .itemInputs("3x gtceu:sodium_hydroxide_dust").inputFluids("gtceu:epichlorohydrin 1000", "minecraft:water 2000")
        .outputFluids("gtceu:glycerol 1000", "gtceu:salt_water 1000").EUt(7680).duration(150)

    gtr.assembler("gtlcore:echo_casing")
        .itemInputs("gtceu:europium_frame", "kubejs:reinforced_echo_shard", "6x gtceu:double_hsse_plate").itemOutputs("2x gtlcore:echo_casing")
        .circuit(6).EUt(30).duration(200)

    batch(gtr, "precision_assembler", ["itemInputs", "inputFluids", "itemOutputs", ["EUt", GTValues.VA[GTValues.UV]], ["duration", 1600], ["cleanroom", GTLCleanroomType.LAW_CLEANROOM]], [
        ["kubejs:machine_casing_grinding_head",
            ["gtceu:europium_frame", "8x kubejs:reinforced_echo_shard", "6x gtceu:tungsten_grinding_head", "36x gtceu:double_hsse_plate"],
            ["gtceu:annealed_copper 1440", "gtceu:invar 1440", "gtceu:nickel_zinc_ferrite 1440", "gtceu:osmiridium 1440"],
            ["kubejs:machine_casing_grinding_head"]],
        ["kubejs:bedrock_drill",
            ["kubejs:reinforced_echo_shard", "minecraft:bedrock", "gtceu:neutronium_buzz_saw_blade", "4x gtceu:double_neutronium_plate"],
            ["gtceu:rhodium 576", "gtceu:hastelloy_x 576", "gtceu:hsss 576", "gtceu:hsse 576"], ["kubejs:bedrock_drill"]]
    ]);

    gtr.large_chemical_reactor("gtceu:toluene_diisocyanate")
        .inputFluids("gtceu:nitric_acid 2000", "gtceu:phosgene 2000", "gtceu:toluene 1000", "gtceu:hydrogen 1000")
        .outputFluids("gtceu:toluene_diisocyanate 2000", "gtceu:hydrochloric_acid 4000", "minecraft:water 6000").EUt(480).duration(130)

    gtr.chemical_reactor("gtceu:polyurethane")
        .inputFluids("gtceu:oxygen 1000", "gtceu:ethyleneglycol 4000", "gtceu:toluene_diisocyanate 1000")
        .outputFluids("gtceu:polyurethane 1000", "minecraft:water 7000").EUt(480).duration(110)

    gtr.mixer("gtceu:viscoelastic_polyurethane")
        .itemInputs("5x gtceu:calcite_dust").inputFluids("gtceu:polyurethane 1000", "gtceu:ethyleneglycol 1000")
        .outputFluids("gtceu:viscoelastic_polyurethane 2000").EUt(120).duration(110)

    gtr.mixer("gtceu:viscoelastic_polyurethane_foam")
        .inputFluids("gtceu:viscoelastic_polyurethane 1000", "gtceu:air 1000").outputFluids("gtceu:viscoelastic_polyurethane_foam 2000").EUt(120)
        .duration(150)

    gtr.fluid_solidifier("kubejs:memory_foam_block")
        .notConsumable("gtceu:block_casting_mold").inputFluids("gtceu:viscoelastic_polyurethane_foam 1000")
        .itemOutputs("kubejs:memory_foam_block").EUt(30).duration(60)

    gtr.chemical_bath("gtceu:glucose")
        .itemInputs("2x gtceu:sugar_gem").inputFluids("minecraft:water 1000").itemOutputs("24x gtceu:glucose_dust").EUt(480).duration(300)

    gtr.mixer("gtceu:glucose_iron_solution")
        .itemInputs("24x gtceu:glucose_dust").inputFluids("gtceu:iron_iii_chloride 1000").outputFluids("gtceu:glucose_iron_solution 1000")
        .EUt(30).duration(80)

    gtr.dehydrator("kubejs:graphene_iron_plate")
        .notConsumable("gtceu:long_yttrium_barium_cuprate_rod").inputFluids("gtceu:glucose_iron_solution 1000")
        .itemOutputs("kubejs:graphene_iron_plate").EUt(120).duration(40)

    gtr.electromagnetic_separator("gtceu:graphene_oxide_dust")
        .itemInputs("kubejs:graphene_iron_plate").itemOutputs("3x gtceu:graphene_oxide_dust", "gtceu:iron_dust").EUt(30).duration(120)

    gtr.mixer("gtceu:graphene_gel_suspension_dust")
        .itemInputs("3x gtceu:graphene_oxide_dust").inputFluids("gtceu:resorcinol 1000", "gtceu:formaldehyde 1000")
        .itemOutputs("gtceu:graphene_gel_suspension_dust").EUt(120).duration(100)

    gtr.vacuum_freezer("gtlcore:cold_ice_casing")
        .itemInputs("gtceu:frostproof_machine_casing").inputFluids("gtceu:ice 10000", "gtceu:vanadium_gallium 576")
        .itemOutputs("gtlcore:cold_ice_casing").EUt(GTValues.VA[GTValues.EV]).duration(200)

    gtr.autoclave("gtceu:dry_graphene_gel_dust")
        .inputFluids("gtceu:acetone 1000").itemInputs("gtceu:graphene_gel_suspension_dust").itemOutputs("gtceu:dry_graphene_gel_dust").EUt(480)
        .duration(260)

    gtr.fluid_heater("gtceu:supercritical_carbon_dioxide")
        .inputFluids("gtceu:carbon_dioxide 1000").outputFluids("gtceu:supercritical_carbon_dioxide 1000").EUt(480).duration(200)

    gtr.electric_blast_furnace("kubejs:aerographene")
        .itemInputs("gtceu:dry_graphene_gel_dust").inputFluids("gtceu:supercritical_carbon_dioxide 1000").itemOutputs("kubejs:aerographene")
        .EUt(120).duration(400).blastFurnaceTemp(5000)

    gtr.assembler("kubejs:two_way_foil")
        .itemInputs("gtceu:chaos_foil", "kubejs:hyper_stable_self_healing_adhesive", "kubejs:cosmic_fabric").itemOutputs("kubejs:two_way_foil")
        .EUt(4 * GTValues.VA[GTValues.MAX]).duration(200)
});
