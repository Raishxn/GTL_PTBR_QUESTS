// priority: 95
// 碎片培养、纳米蜂群及特殊材料处理。
// 由 gtceu.js 按既有阶段顺序执行，本文件只登记配方，不依赖文件名排序。
global.gtlPack.register("nanotechnology", event => {
    const gtr = event.recipes.gtceu;
    const tiers = global.gtlPack.tiers;
    const batch = global.gtlPack.batch;

    // 霜原碎片培育（培养缸）：64 霜原碎片（不消耗）+ 16 天青石粉 + 1 精华 + 900mb 冰 → 64 霜原碎片
    // 原为 chancedInput 1% 概率消耗 4 碎片 + 低温燃料 100，按用户要求改为固定不消耗 64 碎片、去掉低温燃料
    // 不加失重条件；电压/时长沿用原值，可随时调整
    gtr.incubator("kubejs:glacio_spirit")
        .notConsumable("64x kubejs:glacio_spirit").itemInputs("16x gtceu:celestine_dust", "kubejs:essence").inputFluids("gtceu:ice 900")
        .itemOutputs("64x kubejs:glacio_spirit").EUt(30720).duration(2000)

    gtr.assembly_line("gtceu:carbon_nanoswarm")
        .itemInputs("16x #gtceu:circuits/uv", "16x gtceu:uv_robot_arm", "32x gtceu:stem_cells", "32x gtceu:naquadah_alloy_ring",
            "16x gtceu:naquadah_alloy_rod", "64x gtceu:carbon_dust")
        .inputFluids("gtceu:soldering_alloy 4608", "gtceu:polytetrafluoroethylene 4608", "gtceu:glowstone 4608", "gtceu:rubber 4608")
        .itemOutputs("2x gtceu:carbon_nanoswarm").EUt(122880).duration(1200)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:activated_carbon_dust")).dataStack(Registries.getItemStack("gtceu:data_orb")).EUt(GTValues.VA[GTValues.ZPM]).CWUt(32))

    gtr.assembly_line("gtceu:nano_forge_1")
        .itemInputs("16x gtceu:uv_machine_hull", "16x gtceu:carbon_nanoswarm", "16x gtceu:zpm_field_generator", "16x gtceu:uv_robot_arm",
            "16x gtceu:uv_conveyor_module", "32x gtceu:uv_electric_motor", "16x #gtceu:circuits/uv", "16x gtceu:naquadah_octal_wire")
        .inputFluids("gtceu:soldering_alloy 4608", "gtceu:hsss 4608", "gtceu:osmiridium 4608", "gtceu:enriched_naquadah 4608")
        .itemOutputs("gtceu:nano_forge_1").EUt(GTValues.VA[GTValues.UV]).duration(2400)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:carbon_nanoswarm")).dataStack(Registries.getItemStack("gtceu:data_orb")).EUt(GTValues.VA[GTValues.UV]).CWUt(64))

    gtr.assembly_line("gtceu:nano_forge_2")
        .itemInputs("16x gtceu:uev_machine_hull", "16x gtceu:neutronium_nanoswarm", "16x kubejs:draconic_core", "16x gtceu:uev_robot_arm",
            "16x gtceu:uev_conveyor_module", "32x gtceu:uev_electric_motor", "16x #gtceu:circuits/uev", "16x gtceu:mithril_octal_wire")
        .inputFluids("gtceu:soldering_alloy 4608", "gtceu:hsss 4608", "gtceu:osmiridium 4608", "gtceu:enriched_naquadah 4608")
        .itemOutputs("gtceu:nano_forge_2").EUt(GTValues.VA[GTValues.UEV]).duration(2400)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:nano_forge_1")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(GTValues.VA[GTValues.UEV]).CWUt(256))

    gtr.assembly_line("gtceu:nano_forge_3")
        .itemInputs("16x gtceu:uxv_machine_hull", "16x gtceu:draconium_nanoswarm", "16x kubejs:awakened_core", "16x gtceu:uxv_robot_arm",
            "16x gtceu:uxv_conveyor_module", "32x gtceu:uxv_electric_motor", "16x #gtceu:circuits/uxv", "16x gtceu:taranium_octal_wire",
            "kubejs:wyvern_energy_core", "16x gtceu:double_celestialtungsten_plate")
        .inputFluids("gtceu:soldering_alloy 4608", "gtceu:hsss 4608", "gtceu:osmiridium 4608", "gtceu:enriched_naquadah 4608")
        .itemOutputs("gtceu:nano_forge_3").EUt(GTValues.VA[GTValues.UXV]).duration(2400)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:nano_forge_2")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(GTValues.VA[GTValues.UXV]).CWUt(2048))

    gtr.assembly_line("gtceu:field_extruder_factory")
        .itemInputs("4x gtceu:uhv_extruder", "4x gtceu:uhv_compressor", "8x gtceu:uev_field_generator", "4x gtceu:uev_emitter", "4x #gtceu:circuits/uiv",
            "4x gtceu:rhenium_nanoswarm", "64x gtceu:stress_proof_casing", "64x gtceu:dalisenite_plate")
        .inputFluids("gtceu:mutated_living_solder 2304", "gtceu:platinum 4608", "gtceu:reinforced_epoxy_resin 4608", "gtceu:uranium_rhodium_dinaquadide 4608")
        .itemOutputs("gtceu:field_extruder_factory").EUt(GTValues.VA[GTValues.UEV]).duration(800)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:large_extruder")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(GTValues.VA[GTValues.UEV]).CWUt(256))

    gtr.assembly_line("gtceu:mega_presser")
        .itemInputs("4x gtceu:uhv_forming_press", "4x gtceu:uhv_forge_hammer", "4x gtceu:uhv_bender", "32x gtceu:uev_electric_piston",
            "4x gtceu:uev_robot_arm", "4x #gtceu:circuits/uiv", "64x gtceu:stress_proof_casing", "64x gtceu:dalisenite_plate")
        .inputFluids("gtceu:mutated_living_solder 2304", "gtceu:palladium 4608", "gtceu:reinforced_epoxy_resin 4608",
            "gtceu:uranium_rhodium_dinaquadide 4608")
        .itemOutputs("gtceu:mega_presser").EUt(GTValues.VA[GTValues.UEV]).duration(800)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:large_material_press")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(GTValues.VA[GTValues.UEV]).CWUt(256))

    gtr.assembly_line("gtceu:mega_wiremill")
        .itemInputs("16x gtceu:uhv_wiremill", "64x gtceu:uev_electric_motor", "4x gtceu:uev_robot_arm", "4x #gtceu:circuits/uiv",
            "8x gtceu:abyssalalloy_hex_wire", "32x gtceu:double_germanium_plate", "16x gtceu:double_maraging_steel_300_plate")
        .inputFluids("gtceu:mutated_living_solder 2304", "gtceu:niobium 4608", "gtceu:tantalum_carbide 4608",
            "gtceu:ruthenium_trinium_americium_neutronate 4608")
        .itemOutputs("gtceu:mega_wiremill").EUt(GTValues.VA[GTValues.UEV]).duration(800)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:large_wiremill")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(GTValues.VA[GTValues.UEV]).CWUt(256))

    gtr.assembly_line("gtceu:dimensional_focus_engraving_array")
        .itemInputs("8x gtceu:uhv_laser_engraver", "16x gtceu:neutronium_nanoswarm", "64x gtceu:normal_laser_pipe", "8x gtceu:uev_field_generator",
            "4x gtceu:uev_emitter", "16x #gtceu:circuits/uiv", "16x gtceu:quantanium_rod", "32x gtceu:double_dubnium_plate")
        .inputFluids("gtceu:mutated_living_solder 28800", "gtceu:polyetheretherketone 28800", "gtceu:pikyonium 4608", "gtceu:abyssalalloy 4608")
        .itemOutputs("gtceu:dimensional_focus_engraving_array").EUt(GTValues.VA[GTValues.UEV]).duration(1600)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:engraving_laser_plant")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(GTValues.VA[GTValues.UEV]).CWUt(256))

    gtr.assembler("gtlcore:naquadah_alloy_casing")
        .itemInputs("gtceu:naquadah_alloy_frame", "6x gtceu:naquadah_alloy_plate").circuit(6).itemOutputs("gtlcore:naquadah_alloy_casing")
        .EUt(16).duration(50)

    gtr.nano_forge("gtceu:carbon_nanoswarm")
        .notConsumable(Item.of('gtceu:programmed_circuit', '{Configuration:21}').strongNBT())
        .itemInputs("64x gtceu:carbon_block", "64x gtceu:soc").itemOutputs("64x gtceu:carbon_nanoswarm")
        .inputFluids("gtceu:soldering_alloy 20000", "gtceu:lubricant 20000").duration(40000).EUt(GTValues.VA[GTValues.UV])
        .addData("nano_forge_tier", 1)

    gtr.nano_forge("gtceu:glowstone_nanoswarm")
        .notConsumable(Item.of('gtceu:programmed_circuit', '{Configuration:17}').strongNBT())
        .itemInputs("64x minecraft:glowstone", "64x gtceu:advanced_soc").itemOutputs("64x gtceu:glowstone_nanoswarm")
        .inputFluids("gtceu:uu_amplifier 10000", "gtceu:soldering_alloy 20000", "gtceu:lubricant 20000").duration(160000)
        .EUt(GTValues.VA[GTValues.UV]).addData("nano_forge_tier", 1)

    gtr.nano_forge("gtceu:copper_nanoswarm")
        .notConsumable(Item.of('gtceu:programmed_circuit', '{Configuration:28}').strongNBT())
        .itemInputs("8x minecraft:copper_block", "8x gtceu:soc").itemOutputs("gtceu:copper_nanoswarm")
        .inputFluids("gtceu:naquadah 2000", "gtceu:soldering_alloy 10000", "gtceu:bismuth 10000").duration(20000).EUt(GTValues.VA[GTValues.UV])
        .addData("nano_forge_tier", 1)

    gtr.nano_forge("gtceu:iron_nanoswarm")
        .notConsumable(Item.of('gtceu:programmed_circuit', '{Configuration:23}').strongNBT())
        .itemInputs("8x minecraft:iron_block", "8x gtceu:soc").itemOutputs("gtceu:iron_nanoswarm")
        .inputFluids("gtceu:naquadah 2000", "gtceu:soldering_alloy 10000", "gtceu:bismuth 10000").duration(20000).EUt(GTValues.VA[GTValues.UV])
        .addData("nano_forge_tier", 1)

    gtr.nano_forge("gtceu:gold_nanoswarm")
        .notConsumable(Item.of('gtceu:programmed_circuit', '{Configuration:20}').strongNBT())
        .itemInputs("8x minecraft:gold_block", "16x gtceu:soc").itemOutputs("gtceu:gold_nanoswarm")
        .inputFluids("gtceu:enriched_naquadah 2000", "gtceu:soldering_alloy 20000", "gtceu:bismuth 20000").duration(20000)
        .EUt(GTValues.VA[GTValues.UV]).addData("nano_forge_tier", 1)

    gtr.nano_forge("gtceu:silver_nanoswarm")
        .notConsumable(Item.of('gtceu:programmed_circuit', '{Configuration:24}').strongNBT())
        .itemInputs("8x gtceu:silver_block", "16x gtceu:soc").itemOutputs("gtceu:silver_nanoswarm")
        .inputFluids("gtceu:enriched_naquadah 2000", "gtceu:soldering_alloy 20000", "gtceu:bismuth 20000").duration(20000)
        .EUt(GTValues.VA[GTValues.UV]).addData("nano_forge_tier", 1)

    gtr.nano_forge("gtceu:iridium_nanoswarm")
        .notConsumable(Item.of('gtceu:programmed_circuit', '{Configuration:32}').strongNBT())
        .itemInputs("8x gtceu:iridium_block", "32x gtceu:soc").itemOutputs("gtceu:iridium_nanoswarm")
        .inputFluids("gtceu:naquadria 2000", "gtceu:hafnium 8000", "gtceu:soldering_alloy 20000").duration(40000).EUt(GTValues.VA[GTValues.UV])
        .addData("nano_forge_tier", 1)

    gtr.nano_forge("gtceu:osmium_nanoswarm")
        .notConsumable(Item.of('gtceu:programmed_circuit', '{Configuration:19}').strongNBT())
        .itemInputs("8x gtceu:osmium_block", "32x gtceu:soc").itemOutputs("gtceu:osmium_nanoswarm")
        .inputFluids("gtceu:naquadria 2000", "gtceu:hafnium 8000", "gtceu:soldering_alloy 20000").duration(40000).EUt(GTValues.VA[GTValues.UV])
        .addData("nano_forge_tier", 1)

    gtr.nano_forge("gtceu:rhenium_nanoswarm")
        .notConsumable(Item.of('gtceu:programmed_circuit', '{Configuration:25}').strongNBT())
        .itemInputs("8x gtceu:rhenium_block", "64x gtceu:soc").itemOutputs("gtceu:rhenium_nanoswarm")
        .inputFluids("gtceu:naquadria 2000", "gtceu:uu_amplifier 2000", "gtceu:soldering_alloy 20000").duration(80000)
        .EUt(GTValues.VA[GTValues.UV]).addData("nano_forge_tier", 1)

    gtr.nano_forge("gtceu:naquadah_nanoswarm")
        .notConsumable(Item.of('gtceu:programmed_circuit', '{Configuration:29}').strongNBT())
        .itemInputs("8x gtceu:naquadah_block", "16x gtceu:advanced_soc").itemOutputs("gtceu:naquadah_nanoswarm")
        .inputFluids("gtceu:naquadria 8000", "gtceu:uu_amplifier 2000", "gtceu:mutated_living_solder 20000").duration(160000)
        .EUt(GTValues.VA[GTValues.UV]).addData("nano_forge_tier", 1)

    gtr.nano_forge("gtceu:neutronium_nanoswarm")
        .notConsumable(Item.of('gtceu:programmed_circuit', '{Configuration:32}').strongNBT())
        .itemInputs("8x gtceu:neutronium_block", "64x gtceu:soc", "32x gtceu:advanced_soc").itemOutputs("gtceu:neutronium_nanoswarm")
        .inputFluids("gtceu:neutronium 4000", "gtceu:uu_amplifier 2000", "gtceu:mutated_living_solder 20000").duration(320000)
        .EUt(GTValues.VA[GTValues.UV]).addData("nano_forge_tier", 1)

    gtr.nano_forge("gtceu:orichalcum_nanoswarm")
        .notConsumable(Item.of('gtceu:programmed_circuit', '{Configuration:18}').strongNBT())
        .itemInputs("8x gtceu:orichalcum_block", "64x gtceu:advanced_soc", "64x gtceu:advanced_soc").itemOutputs("gtceu:orichalcum_nanoswarm")
        .inputFluids("gtceu:neutronium 8000", "gtceu:uu_amplifier 4000", "gtceu:mutated_living_solder 40000").duration(320000)
        .EUt(GTValues.VA[GTValues.UV]).addData("nano_forge_tier", 1)

    gtr.nano_forge("gtceu:enderium_nanoswarm")
        .notConsumable(Item.of('gtceu:programmed_circuit', '{Configuration:29}').strongNBT())
        .itemInputs("8x gtceu:enderium_block", "64x gtceu:advanced_soc", "64x gtceu:advanced_soc").itemOutputs("gtceu:enderium_nanoswarm")
        .inputFluids("gtceu:neutronium 8000", "gtceu:uu_amplifier 4000", "gtceu:mutated_living_solder 40000").duration(20000)
        .EUt(GTValues.VA[GTValues.UEV]).addData("nano_forge_tier", 2)

    gtr.nano_forge("gtceu:infuscolium_nanoswarm")
        .notConsumable(Item.of('gtceu:programmed_circuit', '{Configuration:22}').strongNBT())
        .itemInputs("8x gtceu:infuscolium_block", "64x gtceu:advanced_soc", "32x gtceu:highly_advanced_soc")
        .itemOutputs("gtceu:infuscolium_nanoswarm")
        .inputFluids("gtceu:neutronium 8000", "gtceu:uu_amplifier 4000", "gtceu:mutated_living_solder 40000").duration(20000)
        .EUt(GTValues.VA[GTValues.UEV]).addData("nano_forge_tier", 2)

    gtr.nano_forge("gtceu:uruium_nanoswarm")
        .notConsumable(Item.of('gtceu:programmed_circuit', '{Configuration:19}').strongNBT())
        .itemInputs("8x gtceu:uruium_block", "64x gtceu:advanced_soc", "64x gtceu:highly_advanced_soc").itemOutputs("gtceu:uruium_nanoswarm")
        .inputFluids("gtceu:uu_matter 20000", "gtceu:mutated_living_solder 40000", "gtceu:super_mutated_living_solder 40000").duration(40000)
        .EUt(GTValues.VA[GTValues.UEV]).addData("nano_forge_tier", 2)

    gtr.nano_forge("gtceu:vibranium_nanoswarm")
        .notConsumable(Item.of('gtceu:programmed_circuit', '{Configuration:19}').strongNBT())
        .itemInputs("8x gtceu:vibranium_block", "64x gtceu:highly_advanced_soc", "64x gtceu:highly_advanced_soc")
        .itemOutputs("gtceu:vibranium_nanoswarm")
        .inputFluids("gtceu:uu_matter 20000", "gtceu:mutated_living_solder 40000", "gtceu:super_mutated_living_solder 40000").duration(40000)
        .EUt(GTValues.VA[GTValues.UEV]).addData("nano_forge_tier", 2)

    gtr.nano_forge("gtceu:starmetal_nanoswarm")
        .notConsumable(Item.of('gtceu:programmed_circuit', '{Configuration:30}').strongNBT())
        .itemInputs("8x gtceu:starmetal_block", "64x gtceu:highly_advanced_soc", "64x gtceu:highly_advanced_soc", "64x gtceu:exquisite_glass_gem",
            "64x gtceu:exquisite_amethyst_gem")
        .itemOutputs("gtceu:starmetal_nanoswarm")
        .inputFluids("gtceu:uu_matter 40000", "gtceu:mutated_living_solder 80000", "gtceu:super_mutated_living_solder 80000").duration(80000)
        .EUt(GTValues.VA[GTValues.UEV]).addData("nano_forge_tier", 2)

    gtr.nano_forge("gtceu:draconium_nanoswarm")
        .notConsumable(Item.of('gtceu:programmed_circuit', '{Configuration:26}').strongNBT())
        .itemInputs("8x gtceu:draconium_block", "32x gtceu:highly_advanced_soc_wafer", "32x kubejs:optical_ram_wafer", "32x kubejs:optical_soc",
            "8x kubejs:exotic_processing_core")
        .itemOutputs("gtceu:draconium_nanoswarm")
        .inputFluids("gtceu:uu_matter 40000", "gtceu:mutated_living_solder 80000", "gtceu:super_mutated_living_solder 80000").duration(160000)
        .EUt(GTValues.VA[GTValues.UEV]).addData("nano_forge_tier", 2)

    gtr.nano_forge("gtceu:cosmicneutronium_nanoswarm")
        .notConsumable(Item.of('gtceu:programmed_circuit', '{Configuration:31}').strongNBT())
        .itemInputs("8x gtceu:cosmicneutronium_block", "32x kubejs:optical_soc", "32x kubejs:exotic_wafer", "16x kubejs:cosmic_ram_wafer",
            "8x kubejs:cosmic_processing_unit_core")
        .itemOutputs("gtceu:cosmicneutronium_nanoswarm")
        .inputFluids("gtceu:uu_matter 40000", "gtceu:crystalmatrix 40000", "gtceu:liquid_cosmic_mesh 40000").duration(20000)
        .EUt(GTValues.VA[GTValues.UXV]).addData("nano_forge_tier", 3)

    gtr.nano_forge("gtceu:white_dwarf_mtter_nanoswarm")
        .notConsumable(Item.of('gtceu:programmed_circuit', '{Configuration:30}').strongNBT())
        .itemInputs("8x gtceu:white_dwarf_mtter_block", "8x kubejs:cosmic_processing_unit_core").itemOutputs("gtceu:white_dwarf_mtter_nanoswarm")
        .inputFluids("gtceu:uu_matter 40000", "gtceu:neutronium 40000", "gtceu:cosmic_element 40000").duration(10000)
        .EUt(GTValues.VA[GTValues.UXV]).addData("nano_forge_tier", 3)

    gtr.nano_forge("gtceu:black_dwarf_mtter_nanoswarm")
        .notConsumable(Item.of('gtceu:programmed_circuit', '{Configuration:30}').strongNBT())
        .itemInputs("8x gtceu:black_dwarf_mtter_block", "8x kubejs:cosmic_processing_unit_core").itemOutputs("gtceu:black_dwarf_mtter_nanoswarm")
        .inputFluids("gtceu:uu_matter 40000", "gtceu:neutronium 40000", "gtceu:cosmic_element 40000").duration(10000)
        .EUt(GTValues.VA[GTValues.UXV]).addData("nano_forge_tier", 3)

    gtr.nano_forge("gtceu:spacetime_nanoswarm")
        .notConsumable(Item.of('gtceu:programmed_circuit', '{Configuration:27}').strongNBT()).notConsumable("kubejs:quantum_anomaly")
        .itemInputs("8x gtceu:spacetime_block", "4x kubejs:eigenfolded_kerr_manifold", "16x kubejs:supracausal_ram_wafer",
            "8x kubejs:supracausal_processing_core")
        .itemOutputs("gtceu:spacetime_nanoswarm").inputFluids("gtceu:uu_matter 80000", "gtceu:infinity 40000", "gtceu:temporalfluid 40000")
        .duration(40000).EUt(GTValues.VA[GTValues.UXV]).addData("nano_forge_tier", 3)

    gtr.nano_forge("gtceu:transcendentmetal_nanoswarm")
        .notConsumable("kubejs:non_linear_optical_lens").notConsumable("kubejs:hypercube")
        .itemInputs("gtceu:rhenium_nanoswarm", "8x gtceu:transcendentmetal_block", "8x kubejs:recursively_folded_negative_space", "#gtceu:circuits/max")
        .itemOutputs("gtceu:transcendentmetal_nanoswarm")
        .inputFluids("gtceu:uu_matter 80000", "gtceu:raw_star_matter_plasma 40000", "gtceu:spatialfluid 20000").duration(80000)
        .EUt(GTValues.VA[GTValues.UXV]).addData("nano_forge_tier", 3)

    gtr.nano_forge("gtceu:eternity_nanoswarm")
        .notConsumable(Item.of('gtceu:programmed_circuit', '{Configuration:27}').strongNBT()).notConsumable("kubejs:quantum_anomaly")
        .notConsumable("kubejs:eternity_catalyst")
        .itemInputs("gtceu:neutronium_nanoswarm", "8x gtceu:eternity_block", "8x kubejs:ctc_computational_unit")
        .itemOutputs("gtceu:eternity_nanoswarm")
        .inputFluids("gtceu:spatialfluid 80000", "gtceu:exciteddtsc 80000", "gtceu:primordialmatter 80000").duration(160000)
        .EUt(GTValues.VA[GTValues.UXV]).addData("nano_forge_tier", 3)

    gtr.electric_blast_furnace("gtceu:tellurium_oxide_dust")
        .itemInputs("gtceu:tellurium_dust").inputFluids("gtceu:oxygen 2000").itemOutputs("3x gtceu:tellurium_oxide_dust").EUt(128).duration(100)
        .blastFurnaceTemp(1760)

    gtr.chemical_reactor("gtceu:butane_1_4_diol")
        .notConsumable("gtceu:molybdenum_trioxide_dust").itemInputs("3x gtceu:tellurium_oxide_dust").inputFluids("gtceu:butane 1000")
        .outputFluids("gtceu:butane_1_4_diol 1000").itemOutputs("gtceu:tellurium_dust").EUt(1920).duration(20)

    gtr.chemical_reactor("gtceu:gammabutyrolactone")
        .notConsumable("gtceu:copper_dust").inputFluids("gtceu:butane_1_4_diol 1000")
        .outputFluids("gtceu:gammabutyrolactone 1000", "gtceu:hydrogen 4000").EUt(1920).duration(80)

    gtr.chemical_reactor("gtceu:methylamine")
        .circuit(1).inputFluids("gtceu:ammonia 1000", "gtceu:methanol 1000").outputFluids("gtceu:methylamine 1000", "minecraft:water 1000")
        .EUt(1920).duration(80)

    gtr.chemical_reactor("gtceu:nmethylpyrolidone")
        .inputFluids("gtceu:gammabutyrolactone 1000", "gtceu:methylamine 1000")
        .outputFluids("gtceu:nmethylpyrolidone 1000", "minecraft:water 1000").EUt(7680).duration(120)

    gtr.chemical_reactor("gtceu:p_nitroaniline")
        .notConsumableFluid("gtceu:acetic_anhydride 1000").inputFluids("gtceu:aniline 1000", "gtceu:nitration_mixture 2000")
        .outputFluids("gtceu:p_nitroaniline 1000", "gtceu:diluted_sulfuric_acid 1000").EUt(1920).duration(150)

    gtr.large_chemical_reactor("gtceu:p_phenylenediamine_dust")
        .notConsumable("gtceu:palladium_dust").inputFluids("gtceu:nitrogen_dioxide 100", "gtceu:hydrogen 6000", "gtceu:p_nitroaniline 1000")
        .outputFluids("minecraft:water 2000").itemOutputs("16x gtceu:p_phenylenediamine_dust").EUt(122880).duration(60)

    gtr.chemical_reactor("gtceu:terephthalicacid")
        .notConsumable("gtceu:cadmium_dust").notConsumable("gtceu:sodium_bisulfate_dust").notConsumableFluid("gtceu:sulfuric_acid 1000")
        .inputFluids("gtceu:phthalic_acid 1000").outputFluids("gtceu:terephthalicacid 1000").EUt(480).duration(800)

    gtr.chemical_reactor("gtceu:dimethylterephthalate")
        .inputFluids("gtceu:terephthalicacid 1000", "gtceu:methanol 2000", "gtceu:sulfuric_acid 2000")
        .outputFluids("gtceu:dimethylterephthalate 1000", "gtceu:diluted_sulfuric_acid 2000").EUt(480).duration(210)

    gtr.large_chemical_reactor("gtceu:terephthaloyl_chloride_dust")
        .inputFluids("gtceu:thionyl_chloride 20000", "gtceu:dimethylterephthalate 5000", "gtceu:carbon_dioxide 6000")
        .itemOutputs("64x gtceu:terephthaloyl_chloride_dust", "48x gtceu:terephthaloyl_chloride_dust")
        .outputFluids("gtceu:diluted_hydrochloric_acid 20000", "gtceu:sulfur_dioxide 20000").EUt(1920).duration(240)

    gtr.large_chemical_reactor("gtceu:liquidcrystalkevlar")
        .itemInputs("gtceu:calcium_chloride_dust", "9x gtceu:terephthaloyl_chloride_dust", "9x gtceu:p_phenylenediamine_dust")
        .inputFluids("gtceu:nmethylpyrolidone 1000").outputFluids("gtceu:liquidcrystalkevlar 9000").EUt(524288).duration(160)

    gtr.assembler("gtceu:chemical_distort")
        .itemInputs("gtceu:chemical_plant", "16x gtceu:carbon_nanoswarm", "8x gtceu:uv_electric_pump", "8x gtceu:uv_emitter", "8x #gtceu:circuits/uv",
            "8x gtceu:naquadria_plate")
        .inputFluids("gtceu:soldering_alloy 1296").itemOutputs("gtceu:chemical_distort").EUt(524288).duration(400)

    gtr.distort("gtceu:epoxy")
        .notConsumable("gtceu:copper_nanoswarm").itemInputs("1x gtceu:phosphorus_dust", "16x gtceu:salt_dust")
        .inputFluids("minecraft:water 21500", "gtceu:oxygen 10500", "gtceu:propene 4000", "gtceu:benzene 6000")
        .itemOutputs("86x gtceu:sodium_hydroxide_dust").outputFluids("gtceu:epoxy 4000", "gtceu:hydrogen 16000", "gtceu:hydrochloric_acid 4000")
        .EUt(GTValues.VA[GTValues.ZPM]).duration(24).blastFurnaceTemp(5600)

    gtr.distort("gtceu:polybenzimidazole")
        .notConsumable("gtceu:iridium_nanoswarm").notConsumable("gtceu:potassium_dichromate_dust")
        .itemInputs("1152x gtceu:carbon_dust", "16x gtceu:copper_dust", "144x gtceu:zinc_dust")
        .inputFluids("gtceu:chlorobenzene 28800", "gtceu:sulfuric_acid 14400", "gtceu:hydrogen 316800", "gtceu:nitrogen 57600", "gtceu:oxygen 201600")
        .outputFluids("gtceu:polybenzimidazole 21600").EUt(GTValues.VA[GTValues.UHV]).duration(200).blastFurnaceTemp(6000)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.distort("gtceu:polyphenylene_sulfide")
        .notConsumable("gtceu:silver_nanoswarm").itemInputs("16x gtceu:sulfur_dust").inputFluids("gtceu:benzene 16000")
        .outputFluids("gtceu:polyphenylene_sulfide 24000", "gtceu:hydrogen 32000").EUt(GTValues.VA[GTValues.UV]).duration(12)
        .blastFurnaceTemp(800).cleanroom(CleanroomType.CLEANROOM)

    gtr.distort("gtceu:platinum_dust")
        .notConsumable("gtceu:iridium_nanoswarm").itemInputs("576x gtceu:platinum_group_sludge_dust", "16x gtceu:sulfur_dust")
        .inputFluids("gtceu:hydrogen 72000", "gtceu:oxygen 128000", "gtceu:chlorine 14400")
        .itemOutputs("64x gtceu:platinum_dust", "64x gtceu:palladium_dust", "60x gtceu:ruthenium_dust", "32x gtceu:iridium_dust", "48x gtceu:rhodium_dust",
            "32x gtceu:osmium_dust")
        .outputFluids("gtceu:hydrogen 2800", "minecraft:water 7200", "gtceu:chlorine 6400").EUt(GTValues.VA[GTValues.UV]).duration(240)
        .blastFurnaceTemp(9000)

    gtr.distort("gtceu:polyvinyl_chloride")
        .notConsumable("gtceu:glowstone_nanoswarm").inputFluids("gtceu:oxygen 10000", "gtceu:chlorine 1440", "gtceu:ethylene 1440")
        .outputFluids("gtceu:polyvinyl_chloride 2160", "gtceu:hydrogen 1440").EUt(GTValues.VA[GTValues.IV]).duration(16).blastFurnaceTemp(800)

    batch(gtr, "distort", ["notConsumable", "itemInputs", "inputFluids", "outputFluids", "EUt", "duration", "blastFurnaceTemp"], [
        ["gtceu:silicone_rubber", ["gtceu:carbon_nanoswarm"], ["3x gtceu:silicon_dust", "gtceu:sulfur_dust"],
            ["minecraft:water 2000", "gtceu:methane 4000"], ["gtceu:silicone_rubber 1296", "gtceu:hydrogen 4000"], [GTValues.VA[GTValues.LuV]], [32],
            [1200]],
        ["gtceu:styrene_butadiene_rubber", ["gtceu:iron_nanoswarm"], ["5x gtceu:sulfur_dust"],
            ["gtceu:butadiene 3000", "gtceu:benzene 1000", "gtceu:ethylene 1000", "gtceu:oxygen 15000"],
            ["gtceu:styrene_butadiene_rubber 6480", "gtceu:hydrogen 2000"], [GTValues.VA[GTValues.ZPM]], [12], [1800]]
    ]);

    gtr.distort("gtceu:polytetrafluoroethylene")
        .notConsumable("gtceu:copper_nanoswarm").inputFluids("gtceu:oxygen 5000", "gtceu:methane 1440", "gtceu:fluorine 2880")
        .outputFluids("gtceu:polytetrafluoroethylene 1080", "gtceu:hydrogen 5760").EUt(GTValues.VA[GTValues.ZPM]).duration(24)
        .blastFurnaceTemp(2600)

    gtr.distort("gtceu:naquadria_dust")
        .notConsumable("gtceu:naquadah_nanoswarm").itemInputs("128x gtceu:naquadah_dust", "16x gtceu:caesium_dust")
        .inputFluids("gtceu:fluorine 32000", "gtceu:fluoroantimonic_acid 64000", "gtceu:sulfuric_acid 12000", "gtceu:radon 8000",
            "gtceu:nitrogen_dioxide 4000", "gtceu:xenon 4000")
        .itemOutputs("64x gtceu:naquadria_dust", "64x gtceu:trinium_dust", "256x gtceu:antimony_trifluoride_dust")
        .outputFluids("gtceu:hydrofluoric_acid 272000", "gtceu:radon_trioxide 8000", "gtceu:xenon_trioxide 4000", "gtceu:caesium_fluoride 16000")
        .EUt(GTValues.VA[GTValues.UHV]).duration(360).blastFurnaceTemp(12600).cleanroom(CleanroomType.CLEANROOM)

    gtr.distort("gtceu:stem_cells")
        .notConsumable("gtceu:naquadah_nanoswarm").chancedInput("kubejs:glacio_spirit", 8000, 100)
        .itemInputs("gtceu:tiny_naquadah_dust", "gtceu:osmiridium_dust", "gtceu:salt_dust", "gtceu:calcium_dust", "4x gtceu:meat_dust", "4x gtceu:bio_chaff",
            "2x minecraft:bone")
        .inputFluids("gtceu:phosphoric_acid 1000", "minecraft:water 3000", "gtceu:distilled_water 2000", "gtceu:biomass 1000")
        .itemOutputs("64x gtceu:stem_cells", "gtceu:phosphorus_dust").EUt(GTValues.VA[GTValues.UHV]).duration(60).blastFurnaceTemp(12200)
        .cleanroom(CleanroomType.STERILE_CLEANROOM)

    gtr.distort("gtceu:photoresist")
        .notConsumable("gtceu:uruium_nanoswarm").itemInputs("91x gtceu:rutile_dust", "60x gtceu:carbon_dust", "42x gtceu:sodium_hydroxide_dust")
        .inputFluids("gtceu:sulfuric_acid 80000", "gtceu:ethanol 7000", "gtceu:chlorine 81000", "gtceu:propene 15000", "gtceu:benzene 39000",
            "gtceu:ethylene 47000")
        .outputFluids("gtceu:photoresist 16000").EUt(GTValues.VA[GTValues.UEV]).duration(960).blastFurnaceTemp(16200)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.distort("gtceu:zylon_dust")
        .notConsumable("gtceu:black_dwarf_mtter_nanoswarm").itemInputs("1762x gtceu:sulfur_dust", "41x gtceu:sodium_dust")
        .inputFluids("gtceu:bromine 15200", "gtceu:toluene 432000", "gtceu:hydrogen 412000", "gtceu:ethane 6000", "gtceu:propene 50000",
            "gtceu:nitric_acid 67000", "gtceu:oxygen 40000", "gtceu:benzene 70000")
        .itemOutputs("115x gtceu:zylon_dust").EUt(GTValues.VA[GTValues.UXV]).duration(320).blastFurnaceTemp(18900)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.distort("gtceu:mutagen")
        .notConsumable("gtceu:silver_nanoswarm").itemInputs("256x gtceu:bio_chaff", "gtceu:naquadria_dust")
        .inputFluids("gtceu:distilled_water 10000").outputFluids("gtceu:mutagen 10000").EUt(GTValues.VA[GTValues.UV]).duration(200)
        .blastFurnaceTemp(12600).cleanroom(CleanroomType.STERILE_CLEANROOM)

    gtr.distort("kubejs:biological_cells")
        .notConsumable("gtceu:neutronium_nanoswarm")
        .itemInputs("256x gtceu:stem_cells", "64x gtceu:meat_dust", "64x gtceu:salt_dust", "64x gtceu:calcium_dust", "64x gtceu:agar_dust",
            "4x kubejs:tcetieseaweedextract", "2x gtceu:enriched_naquadah_dust", "gtceu:tritanium_dust")
        .inputFluids("gtceu:mutagen 10000").itemOutputs("64x kubejs:biological_cells").EUt(GTValues.VA[GTValues.UV]).duration(400)
        .blastFurnaceTemp(16200).cleanroom(CleanroomType.STERILE_CLEANROOM)

    gtr.distort("gtceu:polyvinyl_butyral")
        .notConsumable("gtceu:carbon_nanoswarm").itemInputs("96x gtceu:carbon_dust", "4x gtceu:rutile_dust")
        .inputFluids("gtceu:hydrogen 52000", "gtceu:oxygen 32000", "gtceu:chlorine 4000", "gtceu:propene 16000 ", "gtceu:ethylene 10000")
        .outputFluids("gtceu:polyvinyl_butyral 36864").EUt(GTValues.VA[GTValues.UV]).duration(240).blastFurnaceTemp(6000)

    batch(gtr, "distort", [["notConsumable", "gtceu:carbon_nanoswarm"], "itemInputs", ["inputFluids", "gtceu:sulfuric_acid 2000"], "outputFluids",
        ["EUt", GTValues.VA[GTValues.UV]], ["blastFurnaceTemp", 9000], ["duration", 20]], [
        ["gtceu:acidic_naquadria_solution", ["gtceu:enriched_naquadah_dust"], ["gtceu:acidic_naquadria_solution 3000"]],
        ["gtceu:acidic_enriched_naquadah_solution", ["gtceu:naquadria_dust"], ["gtceu:acidic_enriched_naquadah_solution 3000"]]
    ]);

    gtr.qft("gtceu:taranium_dust")
        .notConsumable("avaritia:infinity_catalyst").itemInputs("176x gtceu:bedrock_dust", "64x gtceu:carbon_dust", "640x gtceu:deepslate_dust")
        .inputFluids("gtceu:helium 37000", "gtceu:hydrogen 73000", "gtceu:xenon 3000").itemOutputs("64x gtceu:taranium_dust")
        .EUt(GTValues.VA[GTValues.MAX]).duration(1600)

    gtr.chemical_reactor("gtceu:calcium_chloride_dust")
        .itemInputs("gtceu:calcium_dust").inputFluids("gtceu:chlorine 2000").itemOutputs("3x gtceu:calcium_chloride_dust").EUt(30).duration(80)

    batch(gtr, "large_chemical_reactor", [["circuit", 24], "itemInputs", "inputFluids", "itemOutputs", ["EUt", 30720], "duration"], [
        ["gtceu:iridium_chloride_dust", ["gtceu:iridium_dust"], ["gtceu:chlorine 3000"], ["4x gtceu:iridium_chloride_dust"], [800]],
        ["gtceu:titanium_trifluoride_dust", ["gtceu:titanium_dust"], ["gtceu:fluorine 3000"], ["4x gtceu:titanium_trifluoride_dust"], [600]]
    ]);

    batch(gtr, "large_chemical_reactor", [["circuit", 24], "itemInputs", "inputFluids", "itemOutputs", "outputFluids", ["EUt", 30720], ["duration", 400]], [
        ["gtceu:barium_sulfide_dust", ["6x gtceu:barite_dust"], ["gtceu:hydrogen 4000"], ["2x gtceu:barium_sulfide_dust"], ["minecraft:water 4000"]],
        ["gtceu:aluminium_sulfite_dust", ["2x gtceu:aluminium_dust"], ["gtceu:sulfuric_acid 3000"], ["14x gtceu:aluminium_sulfite_dust"],
            ["minecraft:water 3000"]]
    ]);

    gtr.chemical_reactor("gtceu:potassium_bromide_dust")
        .itemInputs("gtceu:potassium_dust").inputFluids("gtceu:bromine 1000").itemOutputs("2x gtceu:potassium_bromide_dust").EUt(120)
        .duration(160)

    gtr.qft("kubejs:timepiece")
        .notConsumable("gtceu:white_dwarf_mtter_nanoswarm").notConsumable("gtceu:black_dwarf_mtter_nanoswarm")
        .chancedInput("gtceu:spacetime_hex_wire", 1, 0).chancedOutput("kubejs:timepiece", 2500, 0).inputFluids("gtceu:cosmic_element 100")
        .EUt(GTValues.VA[GTValues.MAX]).duration(200)

    gtr.packer("gtceu:tiny_degenerate_rhenium_dust")
        .itemInputs("gtceu:degenerate_rhenium_dust").itemOutputs("9x gtceu:tiny_degenerate_rhenium_dust").EUt(1920).duration(20)

    gtr.lightning_processor("gtceu:thaumium_dust")
        .itemInputs("8x gtceu:infused_gold_dust", "8x gtceu:iron_dust", "16x gtceu:lapis_dust").inputFluids("gtceu:distilled_water 1000")
        .itemOutputs("16x gtceu:thaumium_dust").EUt(7680).duration(480)

    gtr.mixer("gtceu:astral_silver_dust")
        .itemInputs("2x gtceu:silver_dust", "gtceu:thaumium_dust").itemOutputs("3x gtceu:astral_silver_dust").EUt(1920).duration(400)

    gtr.mixer("gtceu:highenergymixture_dust")
        .itemInputs("4x minecraft:glowstone_dust", "2x minecraft:redstone", "1x gtceu:aluminium_dust").circuit(3)
        .itemOutputs("4x gtceu:highenergymixture_dust").EUt(480).duration(600)

    gtr.fluid_solidifier("gtceu:luminessence_dust")
        .itemInputs("2x gtceu:highenergymixture_dust").inputFluids("gtceu:phosphoric_acid 2000").itemOutputs("gtceu:luminessence_dust").EUt(480)
        .duration(200)

    gtr.mixer("gtceu:sunnarium")
        .notConsumable("gtceu:uxv_field_generator").inputFluids("gtceu:helium_plasma 1000", "gtceu:glowstone 1000")
        .outputFluids("gtceu:sunnarium 1000").EUt(GTValues.VA[GTValues.UXV]).duration(400)

    batch(gtr, "stellar_forge", [["itemInputs", "kubejs:naquadria_charge"], "inputFluids", "outputFluids", ["EUt", GTValues.VA[GTValues.UIV]], ["duration", 200],
        ["addData", "SCTier", 1]], [
        ["gtceu:astraltitanium_plasma", ["gtceu:force 576", "gtceu:titanium 576", "gtceu:cobalt 288", "gtceu:copper 288", "gtceu:tritium 1000"],
            ["gtceu:astraltitanium_plasma 1000"]],
        ["gtceu:celestialtungsten_plasma",
            ["gtceu:tartarite 576", "gtceu:tungsten 576", "gtceu:americium 288", "gtceu:titan_precision_steel 144", "gtceu:astraltitanium 144",
                "gtceu:xenon 1000"], ["gtceu:celestialtungsten_plasma 1000"]]
    ]);

    gtr.arc_furnace("kubejs:cosmic_singularity")
        .itemInputs("avaritia:eternal_singularity").inputFluids("gtceu:magnetohydrodynamicallyconstrainedstarmatter 9216")
        .itemOutputs("kubejs:cosmic_singularity", "64x gtceu:shirabon_dust").outputFluids("gtceu:helium_plasma 1000")
        .EUt(GTValues.VA[GTValues.MAX]).duration(200)

    gtr.qft("gtceu:cosmic_ingot")
        .notConsumable("gtceu:cosmicneutronium_nanoswarm").chancedInput("kubejs:cosmic_singularity", 1000, 0)
        .itemInputs("kubejs:hypercube", "avaritia:infinity_ingot")
        .inputFluids("gtceu:white_dwarf_mtter 576", "gtceu:black_dwarf_mtter 576", "gtceu:primordialmatter 500")
        .itemOutputs("gtceu:cosmic_ingot").EUt(64 * GTValues.VA[GTValues.MAX]).duration(200)

    gtr.qft("gtceu:magmatter")
        .notConsumable("kubejs:spacetime_catalyst").inputFluids("gtceu:chaos 1000", "gtceu:spatialfluid 1000", "gtceu:exciteddtsc 1000")
        .itemInputs("gtceu:attuned_tengam_block").outputFluids("gtceu:magmatter 1000").EUt(16 * GTValues.VA[GTValues.MAX]).duration(800)

    gtr.sps_crafting("gtceu:magmatter_ingot")
        .circuit(1).notConsumable("kubejs:ingot_field_shape").inputFluids("gtceu:mana 100000", "gtceu:magmatter 100")
        .itemInputs("minecraft:netherite_ingot").itemOutputs("gtceu:magmatter_ingot").EUt(4 * GTValues.VA[GTValues.MAX]).duration(400)

    gtr.sps_crafting("gtceu:magmatter_ingot_d")
        .inputFluids("gtceu:mana 10000", "gtceu:magmatter 10").notConsumable("kubejs:ingot_field_shape")
        .itemInputs("gtceu:magmatter_dust", "minecraft:netherite_ingot").itemOutputs("gtceu:magmatter_ingot").EUt(4 * GTValues.VA[GTValues.MAX])
        .duration(200)

    gtr.lathe("gtceu:magmatter_rod")
        .itemInputs("gtceu:magmatter_ingot").itemOutputs("gtceu:magmatter_rod").itemOutputs("gtceu:small_magmatter_dust")
        .EUt(GTValues.VA[GTValues.MAX]).duration(200)

    gtr.packer("gtceu:magmatter_dust")
        .notConsumable("gtceu:transcendentmetal_nanoswarm").itemInputs("4x gtceu:small_magmatter_dust").itemOutputs("gtceu:magmatter_dust")
        .EUt(30).duration(20)

    gtr.forge_hammer("gtceu:long_magmatter_rod")
        .itemInputs("2x gtceu:magmatter_rod").itemOutputs("gtceu:long_magmatter_rod").EUt(GTValues.VA[GTValues.MAX]).duration(300)

    gtr.assembly_line("gtceu:mega_extractor")
        .itemInputs("16x gtceu:uhv_extractor", "16x gtceu:uhv_fluid_solidifier", "32x gtceu:uev_electric_piston", "8x gtceu:uev_electric_pump",
            "4x #gtceu:circuits/uiv", "16x gtceu:titansteel_hex_wire", "16x gtceu:double_quantum_plate", "32x gtceu:double_hastelloy_x_plate")
        .inputFluids("gtceu:mutated_living_solder 2304", "gtceu:naquadria 4608", "gtceu:plutonium 4608", "gtceu:mithril 4608")
        .itemOutputs("gtceu:mega_extractor").EUt(GTValues.VA[GTValues.UEV]).duration(800)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:large_extractor")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(GTValues.VA[GTValues.UEV]).CWUt(256))

    gtr.assembly_line("gtceu:mega_fluid_heater")
        .itemInputs("16x gtceu:uev_fluid_heater", "8x #gtceu:circuits/uxv", "16x gtceu:uiv_fluid_heater", "16x gtceu:uiv_fluid_regulator",
            "16x gtceu:titansteel_hex_wire", "16x gtceu:double_mithril_plate", "16x gtceu:double_quantum_plate")
        .inputFluids("gtceu:taranium 2304", "gtceu:vibranium 2304", "gtceu:astraltitanium_plasma 4608", "gtceu:degenerate_rhenium_plasma 4608")
        .itemOutputs("gtceu:mega_fluid_heater").EUt(GTValues.VA[GTValues.UIV]).duration(1600)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:uiv_fluid_heater")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(GTValues.VA[GTValues.UIV]).CWUt(512))

    gtr.assembly_line("gtceu:mega_canner")
        .itemInputs("16x gtceu:uev_canner", "16x gtceu:uev_robot_arm", "32x gtceu:uev_electric_piston", "16x gtceu:uev_electric_pump",
            "32x gtceu:double_lafium_plate", "32x gtceu:double_naquadria_plate", "4x #gtceu:circuits/uiv")
        .inputFluids("gtceu:naquadria 4608", "gtceu:orichalcum_plasma 2304", "gtceu:mithril_plasma 2304", "gtceu:darmstadtium 4608")
        .itemOutputs("gtceu:mega_canner").EUt(GTValues.VA[GTValues.UEV]).duration(800)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:uev_canner")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(GTValues.VA[GTValues.UEV]).CWUt(256))

    batch(gtr, "chemical_reactor", ["itemInputs", ["inputFluids", "minecraft:water 1000"], "itemOutputs", ["outputFluids", "gtceu:hydrogen 1000"], ["EUt", 30], ["duration", 60]], [
        ["gtceu:sodium_hydroxide_dust", ["gtceu:sodium_dust"], ["3x gtceu:sodium_hydroxide_dust"]],
        ["gtceu:potassium_hydroxide_dust", ["gtceu:potassium_dust"], ["3x gtceu:potassium_hydroxide_dust"]]
    ]);

    gtr.assembler("kubejs:inverter")
        .itemInputs("4x gtceu:polyethylene_plate", "4x gtceu:ilc_chip", "2x gtceu:exquisite_quartzite_gem", "gtceu:computer_monitor_cover",
            "#gtceu:circuits/ev", "4x gtceu:diode", "8x gtceu:aluminium_single_wire")
        .inputFluids("gtceu:soldering_alloy 144").itemOutputs("kubejs:inverter").EUt(120).duration(200)

    tiers.forEach(i => {
        gtr.assembler("gtceu:" + i[0] + "_neutron_accelerator")
            .itemInputs("gtceu:" + i[0] + "_machine_hull", "kubejs:inverter",
                i[1] == 0 ? "2x gtceu:lead_rotor" : "2x " + i[2] + ":" + i[0] + "_electric_motor", "gtceu:double_beryllium_plate",
                "2x gtceu:polyvinyl_chloride_plate")
            .itemOutputs("gtceu:" + i[0] + "_neutron_accelerator").inputFluids("gtceu:polonium 288").EUt(30).duration(400)
    })

    batch(gtr, "assembler", ["itemInputs", "inputFluids", "itemOutputs", "EUt", ["duration", 200]], [
        ["gtceu:neutron_sensor",
            ["gtceu:iv_machine_hull", "gtceu:advanced_activity_detector_cover", "gtceu:computer_monitor_cover", "gtceu:vibrant_alloy_hex_wire",
                "#gtceu:circuits/ev", "2x gtceu:hv_sensor"], ["gtceu:helium 1000"], ["gtceu:neutron_sensor"], [1920]],
        ["gtceu:neutron_activator",
            ["gtceu:iv_machine_hull", "4x kubejs:hui_circuit_1", "#gtceu:circuits/iv", "2x gtceu:data_stick", "gtceu:ev_sensor", "2x gtceu:ev_emitter",
                "gtceu:uranium_235_block", "gtceu:polonium_block", "2x gtceu:neutron_reflector"], ["gtceu:stainless_steel 1296"],
            ["gtceu:neutron_activator"], [7680]]
    ]);

    gtr.assembler("kubejs:speeding_pipe")
        .itemInputs("ad_astra:fluid_pipe_duct", "gtceu:stainless_steel_huge_fluid_pipe", "16x gtceu:blue_alloy_rod", "#gtceu:circuits/ev",
            "32x gtceu:mercury_barium_calcium_cuprate_single_wire", "32x gtceu:beryllium_plate")
        .itemOutputs("kubejs:speeding_pipe").inputFluids("gtceu:mar_m_200_steel 576").EUt(1920).duration(200)

    batch(gtr, "assembler", ["itemInputs", "inputFluids", "itemOutputs", ["EUt", 7680], "duration"], [
        ["gtlcore:process_machine_casing",
            ["gtceu:solid_machine_casing", "2x #gtceu:circuits/iv", "2x gtceu:double_stainless_steel_plate", "4x gtceu:double_mar_m_200_steel_plate"],
            ["gtceu:fall_king 576"], ["gtlcore:process_machine_casing"], [200]],
        ["gtceu:disassembly",
            ["gtceu:assembly_line", "4x gtceu:naquadah_alloy_gear", "16x gtceu:luv_robot_arm", "8x gtceu:luv_conveyor_module", "8x gtceu:luv_emitter",
                "4x gtceu:double_naquadah_alloy_plate"], ["gtceu:naquadah 1440"], ["gtceu:disassembly"], [800]]
    ]);

    gtr.vacuum_freezer("gtceu:metastable_oganesson")
        .inputFluids("gtceu:hot_oganesson 1000", "kubejs:gelid_cryotheum 144").outputFluids("gtceu:metastable_oganesson 144")
        .itemOutputs("2x gtceu:small_enderium_dust").EUt(GTValues.VA[GTValues.UV]).duration(280)

    batch(gtr, "neutron_activator", ["inputFluids", "outputFluids", "addData", "addData", "addData", ["duration", 200], ["cleanroom", CleanroomType.CLEANROOM]], [
        ["gtceu:hassium", ["gtceu:liquid_metastable_hassium 1000"], ["gtceu:hassium 1000"], ["ev_min", 340], ["ev_max", 380], ["evt", 480]],
        ["gtceu:oganesson", ["gtceu:metastable_oganesson 1000"], ["gtceu:oganesson 1000"], ["ev_min", 720], ["ev_max", 800], ["evt", 1200]]
    ]);

    gtr.neutron_activator("gtceu:quantanium")
        .inputFluids("gtceu:neon 10000")
        .itemInputs("4x gtceu:quantum_star", "8x gtceu:quantum_eye", "16x gtceu:mithril_dust", "16x gtceu:gadolinium_dust", "64x minecraft:netherite_scrap",
            "64x ae2:fluix_dust")
        .outputFluids("gtceu:quantanium 10000").addData("ev_min", 1020).addData("ev_max", 1200).addData("evt", 3840).duration(1200)

    gtr.neutron_activator("kubejs:draconium_dust")
        .inputFluids("gtceu:uu_amplifier 1000").notConsumable("gtceu:degenerate_rhenium_plate").itemInputs("minecraft:dragon_egg")
        .itemOutputs("8x gtceu:ender_eye_dust", "4x gtceu:ender_pearl_dust").chancedOutput("kubejs:draconium_dust", 4000, 0)
        .addData("ev_min", 800).addData("ev_max", 900).addData("evt", 5760).duration(800)

    gtr.assembly_line("gtceu:auto_configuration_maintenance_hatch")
        .itemInputs("gtceu:iv_machine_hull", "4x gtceu:configurable_maintenance_hatch", "8x gtceu:iv_conveyor_module", "8x gtceu:iv_robot_arm", "16x #gtceu:circuits/iv", "4x gtceu:iv_emitter", "4x gtceu:iv_sensor", "gtceu:rad_away_pill", "gtceu:paracetamol_pill", "16x gtceu:stainless_steel_foil")
        .inputFluids("gtceu:lubricant 1000", "gtceu:soldering_alloy 576", "gtceu:cupronickel 576", "gtceu:brass 576")
        .itemOutputs("gtceu:auto_configuration_maintenance_hatch")
        .EUt(GTValues.VA[GTValues.LuV])
        .duration(800)
    ["scannerResearch(java.util.function.UnaryOperator)"](b => b.researchStack(Registries.getItemStack("gtceu:auto_maintenance_hatch")).dataStack(Registries.getItemStack("gtceu:data_orb")).EUt(GTValues.VA[GTValues.IV]).duration(8000))

    batch(gtr, "plasma_generator", ["inputFluids", "outputFluids", "duration", ["EUt", - GTValues.V[GTValues.EV]]], [
        ["gtceu:orichalcum", ["gtceu:orichalcum_plasma 1"], ["gtceu:orichalcum 1"], [384]],
        ["gtceu:mithril", ["gtceu:mithril_plasma 1"], ["gtceu:mithril 1"], [422]],
        ["gtceu:silver", ["gtceu:silver_plasma 1"], ["gtceu:silver 1"], [256]]
    ]);

    gtr.assembler("gtceu:heat_exchanger")
        .itemInputs("gtceu:iv_machine_hull", "8x gtceu:tungsten_carbide_huge_fluid_pipe", "16x gtceu:mar_m_200_steel_gear", "16x gtceu:lapis_plate",
            "16x gtceu:diamond_plate", "16x gtceu:obsidian_plate", "8x gtceu:double_mar_m_200_steel_plate",
            "16x gtceu:double_tungsten_steel_plate", "16x gtceu:double_tungsten_steel_plate")
        .inputFluids("gtceu:redstone 5760").itemOutputs("gtceu:heat_exchanger").EUt(GTValues.VA[GTValues.EV]).duration(400)

    batch(gtr, "assembler", ["itemInputs", "itemOutputs", "EUt", "duration"], [
        ["gtlcore:supercritical_turbine_casing",
            ["gtceu:tungstensteel_turbine_casing", "2x gtceu:mar_m_200_steel_rod", "gtceu:mar_m_200_steel_gear", "6x gtceu:mar_m_200_steel_plate"],
            ["gtlcore:supercritical_turbine_casing"], [16], [50]],
        ["gtceu:supercritical_steam_turbine",
            ["gtceu:luv_machine_hull", "4x #gtceu:circuits/luv", "2x gtceu:luv_electric_motor", "2x gtceu:mar_m_200_steel_gear",
                "2x gtceu:tungsten_carbide_large_fluid_pipe", "8x gtceu:mar_m_200_steel_plate"], ["gtceu:supercritical_steam_turbine"],
            [GTValues.VA[GTValues.LuV]], [200]],
        ["gtceu:supercritical_mega_steam_turbine",
            ["8x gtceu:supercritical_steam_turbine", "8x #gtceu:circuits/uv", "8x gtceu:luv_electric_piston", "16x gtceu:luv_electric_pump",
                "8x gtceu:naquadah_turbine_blade", "8x gtceu:double_hsss_plate", "32x gtceu:double_mar_m_200_steel_plate"],
            ["gtceu:supercritical_mega_steam_turbine"], [GTValues.VA[GTValues.ZPM]], [1200]]
    ]);

    gtr.extractor("gtceu:antimatter")
        .itemInputs("kubejs:pellet_antimatter").outputFluids("gtceu:antimatter 1000").duration(2000).EUt(480)

    gtr.assembly_line("gtceu:element_copying")
        .itemInputs("4x gtceu:uxv_scanner", "4x gtceu:uxv_canner", "4x gtceu:uxv_packer", "4x gtceu:uxv_extractor", "16x #gtceu:circuits/uxv",
            "8x gtceu:uxv_fluid_regulator", "16x gtceu:heavy_quark_degenerate_matter_small_fluid_pipe", "4x gtceu:uruium_nanoswarm",
            "32x gtceu:molybdenum_disilicide_rod", "32x gtceu:titanium_tungsten_carbide_rod", "32x gtceu:double_silicon_carbide_plate",
            "32x gtceu:double_heavy_quark_degenerate_matter_plate")
        .inputFluids("gtceu:mutated_living_solder 2304", "gtceu:periodicium 2304", "gtceu:sunnarium 4608", "gtceu:vibramantium 4608")
        .itemOutputs("gtceu:element_copying").EUt(GTValues.VA[GTValues.UXV]).duration(800)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:star_ultimate_material_forge_factory")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(GTValues.VA[GTValues.UXV]).CWUt(2048))

    gtr.electric_blast_furnace("kubejs:giga_chad")
        .itemInputs("64x gtceu:uiv_field_generator", "64x gtceu:uxv_field_generator", "64x gtceu:opv_field_generator")
        .inputFluids("gtceu:exciteddtec 10000000").itemOutputs("kubejs:giga_chad").EUt(GTValues.VA[GTValues.MAX]).duration(4000)
        .blastFurnaceTemp(36000)

    gtr.heat_exchanger("gtceu:hot_sodium_potassium")
        .inputFluids("gtceu:hot_sodium_potassium 1").inputFluids("minecraft:water 160").outputFluids("gtceu:sodium_potassium 1")
        .outputFluids("gtceu:steam 25600").duration(200)

    gtr.heat_exchanger("gtceu:supercritical_sodium_potassium")
        .inputFluids("gtceu:supercritical_sodium_potassium 1").inputFluids("gtceu:distilled_water 80").outputFluids("gtceu:sodium_potassium 1")
        .outputFluids("gtceu:supercritical_steam 12800").duration(200).addData("eu", 12800)

    gtr.assembler("gtlcore:fission_reactor_casing")
        .itemInputs("gtceu:vanadium_steel_frame", "6x gtceu:lead_plate", "6x gtceu:reactor_steel_plate")
        .itemOutputs("2x gtlcore:fission_reactor_casing").EUt(30).duration(50)

    batch(gtr, "assembler", ["itemInputs", ["inputFluids", "gtceu:soldering_alloy 288"], "itemOutputs", "EUt", ["duration", 200]], [
        ["gtlcore:cooler",
            ["gtlcore:fission_reactor_casing", "2x gtceu:annealed_copper_hex_wire", "8x gtceu:vanadium_steel_tiny_fluid_pipe",
                "4x gtceu:stainless_steel_plate"], ["gtlcore:cooler"], [120]],
        ["gtlcore:fission_fuel_assembly", ["gtceu:graphite_block", "4x gtceu:long_stainless_steel_rod", "4x gtceu:double_reactor_steel_plate"],
            ["gtlcore:fission_fuel_assembly"], [120]],
        ["gtceu:fission_reactor",
            ["gtceu:iv_machine_hull", "4x #gtceu:circuits/iv", "gtceu:computer_monitor_cover", "4x gtceu:neutron_reflector",
                "8x gtceu:dense_reactor_steel_plate"], ["gtceu:fission_reactor"], [480]]
    ]);

    gtr.centrifuge("gtceu:neutronium_block")
        .notConsumable("gtceu:neutronium_nanoswarm").itemInputs("avaritia:neutron")
        .itemOutputs("9x gtceu:naquadah_dust", "9x gtceu:neutronium_dust").EUt(GTValues.VA[GTValues.UIV]).duration(800)

    batch(gtr, "forming_press", [["notConsumable", "gtceu:cell_extruder_mold"], "itemInputs", "itemOutputs", "EUt", ["duration", 200]], [
        ["kubejs:reactor_fuel_rod", ["gtceu:magnetic_steel_ingot"], ["kubejs:reactor_fuel_rod"], [30]],
        ["kubejs:tungsten_carbide_reactor_fuel_rod", ["gtceu:magnetic_neodymium_ingot", "gtceu:tungsten_carbide_ingot"],
            ["kubejs:tungsten_carbide_reactor_fuel_rod"], [120]]
    ]);

    gtr.canner("kubejs:reactor_uranium_simple")
        .itemInputs("kubejs:reactor_fuel_rod", "16x gtceu:uranium_dust").inputFluids("gtceu:uranium_235 96")
        .itemOutputs("kubejs:reactor_uranium_simple").EUt(1920).duration(120)

    gtr.canner("kubejs:reactor_thorium_simple")
        .itemInputs("kubejs:reactor_fuel_rod", "12x gtceu:thorium_dust").itemOutputs("kubejs:reactor_thorium_simple").EUt(480).duration(120)

    batch(gtr, "canner", ["itemInputs", "inputFluids", "itemOutputs", "EUt", ["duration", 120]], [
        ["kubejs:reactor_mox_simple", ["kubejs:reactor_fuel_rod", "18x gtceu:uranium_dust"], ["gtceu:plutonium 432"], ["kubejs:reactor_mox_simple"],
            [7680]],
        ["kubejs:reactor_naquadah_simple", ["kubejs:tungsten_carbide_reactor_fuel_rod", "4x gtceu:naquadah_dust"], ["gtceu:thorium 144"],
            ["kubejs:reactor_naquadah_simple"], [30720]]
    ]);
});
