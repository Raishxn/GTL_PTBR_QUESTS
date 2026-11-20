// priority: 95
// 晶圆、电路板、流体管道与谐振电路加工。
// 由 gtceu.js 按既有阶段顺序执行，本文件只登记配方，不依赖文件名排序。
global.gtlPack.register("circuit_boards", event => {
    const gtr = event.recipes.gtceu;
    const batch = global.gtlPack.batch;

    const circuit_board = [["gtceu:polyethylene_plate", 1], ["gtceu:polyvinyl_chloride_plate", 2], ["gtceu:polytetrafluoroethylene_plate", 4], ["gtceu:polybenzimidazole_plate", 8]]
    circuit_board.forEach((board) => {
        batch(gtr, "pcb_factory", [["itemInputs", "8x " + board[0], (32 + 32 * board[1]) + "x gtceu:copper_foil"], "inputFluids",
            ["itemOutputs", 8 * board[1] + "x gtceu:plastic_printed_circuit_board"], ["EUt", 120], ["duration", 400 * board[1]]], [
            [board[0], ["gtceu:sulfuric_acid " + 1000 * board[1], "gtceu:iron_iii_chloride " + 500 * board[1]]],
            [board[0] + 1, ["gtceu:sulfuric_acid " + 1000 * board[1], "gtceu:sodium_persulfate " + 1000 * board[1]]]
        ]);
    })

    batch(gtr, "pcb_factory", ["itemInputs", "inputFluids", "itemOutputs", "EUt", "duration"], [
        ["gtceu:epoxy_printed_circuit_board", ["8x gtceu:epoxy_plate", "128x gtceu:electrum_foil"],
            ["gtceu:sulfuric_acid 2000", "gtceu:iron_iii_chloride 1000"], ["8x gtceu:epoxy_printed_circuit_board"], [120], [600]],
        ["gtceu:epoxy_printed_circuit_board1", ["8x gtceu:epoxy_plate", "128x gtceu:electrum_foil"],
            ["gtceu:sulfuric_acid 2000", "gtceu:sodium_persulfate 2000"], ["8x gtceu:epoxy_printed_circuit_board"], [120], [600]],
        ["gtceu:fiber_reinforced_printed_circuit_board", ["8x gtceu:reinforced_epoxy_resin_plate", "160x gtceu:annealed_copper_foil"],
            ["gtceu:sulfuric_acid 500", "gtceu:iron_iii_chloride 2000"], ["8x gtceu:fiber_reinforced_printed_circuit_board"], [120], [800]],
        ["gtceu:fiber_reinforced_printed_circuit_board1", ["8x gtceu:reinforced_epoxy_resin_plate", "160x gtceu:annealed_copper_foil"],
            ["gtceu:sulfuric_acid 500", "gtceu:sodium_persulfate 4000"], ["8x gtceu:fiber_reinforced_printed_circuit_board"], [120], [800]],
        ["gtceu:multilayer_fiber_reinforced_printed_circuit_board", ["16x gtceu:fiber_reinforced_circuit_board", "128x gtceu:platinum_foil"],
            ["gtceu:sulfuric_acid 2000", "gtceu:iron_iii_chloride 1000"], ["8x gtceu:multilayer_fiber_reinforced_printed_circuit_board"], [480], [800]],
        ["gtceu:multilayer_fiber_reinforced_printed_circuit_board1", ["16x gtceu:fiber_reinforced_circuit_board", "128x gtceu:platinum_foil"],
            ["gtceu:sulfuric_acid 2000", "gtceu:sodium_persulfate 8000"], ["8x gtceu:multilayer_fiber_reinforced_printed_circuit_board"], [480], [800]],
        ["gtceu:wetware_printed_circuit_board", ["gtceu:wetware_circuit_board", "32x gtceu:niobium_titanium_foil"],
            ["gtceu:sodium_persulfate 1000", "gtceu:iron_iii_chloride 500"], ["gtceu:wetware_printed_circuit_board"], [1920], [450]],
        ["kubejs:bioware_printed_circuit_board", ["kubejs:bioware_circuit_board", "32x gtceu:vanadium_gallium_foil"],
            ["gtceu:sodium_persulfate 2000", "gtceu:iron_iii_chloride 1000"], ["kubejs:bioware_printed_circuit_board"], [7680], [525]],
        ["kubejs:optical_circuit_board", ["gtceu:kevlar_plate", "32x gtceu:rhodium_foil"], ["gtceu:sulfuric_acid 1000", "gtceu:mithril_plasma 100"],
            ["kubejs:optical_circuit_board"], [7680 * 4], [600]],
        ["kubejs:optical_printed_circuit_board", ["kubejs:optical_circuit_board", "32x gtceu:ruthenium_foil"],
            ["gtceu:sodium_persulfate 4000", "gtceu:iron_iii_chloride 2000"], ["kubejs:optical_printed_circuit_board"], [7680 * 4], [600]],
        ["kubejs:exotic_circuit_board", ["2x gtceu:kevlar_plate", "32x gtceu:enderium_foil"],
            ["gtceu:sulfuric_acid 1000", "gtceu:vibranium_plasma 100"], ["kubejs:exotic_circuit_board"], [7680 * 16], [900]],
        ["kubejs:exotic_printed_circuit_board", ["kubejs:exotic_circuit_board", "32x gtceu:americium_foil"],
            ["gtceu:sodium_persulfate 8000", "gtceu:iron_iii_chloride 4000"], ["kubejs:exotic_printed_circuit_board"], [7680 * 16], [900]],
        ["kubejs:cosmic_circuit_board", ["4x gtceu:kevlar_plate", "32x gtceu:heavy_quark_degenerate_matter_foil"],
            ["gtceu:sulfuric_acid 1000", "gtceu:metastable_hassium_plasma 100"], ["kubejs:cosmic_circuit_board"], [7680 * 64], [1200]],
        ["kubejs:cosmic_printed_circuit_board", ["kubejs:cosmic_circuit_board", "32x gtceu:uruium_foil"],
            ["gtceu:sodium_persulfate 8000", "gtceu:iron_iii_chloride 4000"], ["kubejs:cosmic_printed_circuit_board"], [7680 * 64], [1200]],
        ["kubejs:supracausal_circuit_board", ["kubejs:cosmic_circuit_board", "32x gtceu:echoite_foil"],
            ["gtceu:dense_neutron_plasma 1000", "gtceu:quantumchromodynamically_confined_matter_plasma 100"], ["kubejs:supracausal_circuit_board"],
            [7680 * 256], [1500]],
        ["kubejs:supracausal_printed_circuit_board", ["kubejs:supracausal_circuit_board", "32x gtceu:legendarium_foil"],
            ["gtceu:sodium_persulfate 16000", "gtceu:iron_iii_chloride 8000"], ["kubejs:supracausal_printed_circuit_board"], [7680 * 256], [1500]]
    ]);

    batch(gtr, "large_gas_collector", ["notConsumable", "outputFluids", ["circuit", 1], "EUt", ["duration", 200]], [
        ["1", ["kubejs:overworld_data"], ["gtceu:air 100000"], [120]],
        ["2", ["2x kubejs:nether_data"], ["gtceu:nether_air 100000"], [480]],
        ["3", ["4x kubejs:end_data"], ["gtceu:ender_air 100000"], [1920]]
    ]);

    batch(gtr, "large_gas_collector", ["notConsumable", ["notConsumable", "gtceu:vacuum_freezer"], "outputFluids", "EUt", ["duration", 2000]], [
        ["4", ["kubejs:overworld_data"], ["gtceu:liquid_air 100000"], [480]],
        ["5", ["2x kubejs:nether_data"], ["gtceu:liquid_nether_air 100000"], [1920]],
        ["6", ["4x kubejs:end_data"], ["gtceu:liquid_ender_air 100000"], [7680]]
    ]);

    batch(gtr, "assembler", ["itemInputs", "itemOutputs", "inputFluids", "EUt", "duration"], [
        ["gtceu:large_gas_collector",
            ["gtceu:mv_gas_collector", "gtceu:hv_gas_collector", "gtceu:ev_gas_collector", "2x gtceu:mv_field_generator",
                "2x gtceu:hv_field_generator", "2x gtceu:ev_field_generator", "2x #gtceu:circuits/luv", "gtceu:iridium_huge_fluid_pipe",
                "4x gtceu:double_sterling_silver_plate"], ["gtceu:large_gas_collector"], ["gtceu:soldering_alloy 1296"], [1920], [400]],
        ["gtceu:large_incubator",
            ["gtceu:incubator", "4x gtceu:luv_field_generator", "4x gtceu:luv_sensor", "4x gtceu:luv_fluid_regulator",
                "4x gtceu:indium_tin_barium_titanium_cuprate_octal_wire", "16x gtceu:laminated_glass"], ["gtceu:large_incubator"],
            ["gtceu:polytetrafluoroethylene 1440"], [122880], [800]]
    ]);

    batch(gtr, "cutter", ["itemInputs", "itemOutputs", "EUt", "duration", ["cleanroom", CleanroomType.CLEANROOM]], [
        ["kubejs:taranium_wafer", ["kubejs:taranium_boule"], ["64x kubejs:taranium_wafer", "64x kubejs:taranium_wafer"], [122880], [3200]],
        ["kubejs:rutherfordium_neutronium_wafer", ["kubejs:rutherfordium_neutronium_boule"],
            ["64x kubejs:rutherfordium_neutronium_wafer", "32x kubejs:rutherfordium_neutronium_wafer"], [30720], [3200]],
        ["kubejs:nm_chip", ["kubejs:nm_wafer"], ["4x kubejs:nm_chip"], [30720], [1800]],
        ["kubejs:pm_chip", ["kubejs:pm_wafer"], ["4x kubejs:pm_chip"], [122880], [1800]],
        ["kubejs:fm_chip", ["kubejs:fm_wafer"], ["2x kubejs:fm_chip"], [524288], [2700]],
        ["kubejs:optical_ram_chip", ["kubejs:optical_ram_wafer"], ["32x kubejs:optical_ram_chip"], [122880], [900]],
        ["kubejs:exotic_ram_chip", ["kubejs:exotic_ram_wafer"], ["32x kubejs:exotic_ram_chip"], [524288], [900]],
        ["kubejs:cosmic_ram_chip", ["kubejs:cosmic_ram_wafer"], ["32x kubejs:cosmic_ram_chip"], [524288 * 4], [900]],
        ["kubejs:supracausal_ram_chip", ["kubejs:supracausal_ram_wafer"], ["4x kubejs:supracausal_ram_chip"], [524288 * 16], [900]]
    ]);

    batch(gtr, "forming_press", ["itemInputs", "itemOutputs", "EUt", "duration", "cleanroom"], [
        ["kubejs:optical_ram_wafer", ["kubejs:rutherfordium_neutronium_wafer", "gtceu:ram_wafer", "kubejs:photon_carrying_wafer"],
            ["kubejs:optical_ram_wafer"], [GTValues.VA[GTValues.UHV]], [150], [CleanroomType.CLEANROOM]],
        ["kubejs:exotic_ram_wafer",
            ["kubejs:optical_ram_wafer", "gtceu:nor_memory_wafer", "gtceu:nand_memory_wafer", "gtceu:amethyst_plate", "gtceu:technetium_plate"],
            ["kubejs:exotic_ram_wafer"], [GTValues.VA[GTValues.UEV]], [350], [CleanroomType.CLEANROOM]],
        ["kubejs:cosmic_ram_wafer", ["kubejs:taranium_wafer", "gtceu:ram_wafer", "kubejs:prepared_cosmic_soc_wafer"], ["kubejs:cosmic_ram_wafer"],
            [GTValues.VA[GTValues.UIV]], [550], [GTLCleanroomType.LAW_CLEANROOM]],
        ["kubejs:supracausal_ram_wafer",
            ["kubejs:cosmic_ram_wafer", "kubejs:exotic_ram_wafer", "kubejs:pellet_antimatter", "gtceu:legendarium_foil", "gtceu:double_hikarium_plate"],
            ["kubejs:supracausal_ram_wafer"], [GTValues.VA[GTValues.UXV]], [750], [GTLCleanroomType.LAW_CLEANROOM]]
    ]);

    batch(gtr, "laser_engraver", [["itemInputs", "kubejs:taranium_wafer"], "notConsumable", "itemOutputs", ["EUt", 122880], "duration", ["cleanroom", CleanroomType.CLEANROOM]], [
        ["gtceu:ilc_wafer", ["#forge:lenses/red"], ["64x gtceu:ilc_wafer"], [13]],
        ["gtceu:ram_wafer", ["#forge:lenses/green"], ["64x gtceu:ram_wafer"], [13]],
        ["gtceu:lpic_wafer", ["#forge:lenses/orange"], ["64x gtceu:lpic_wafer"], [13]],
        ["gtceu:simple_soc_wafer", ["#forge:lenses/cyan"], ["64x gtceu:simple_soc_wafer"], [13]],
        ["gtceu:ulpic_wafer", ["#forge:lenses/blue"], ["64x gtceu:ulpic_wafer"], [13]],
        ["gtceu:cpu_wafer", ["#forge:lenses/light_blue"], ["64x gtceu:cpu_wafer"], [13]],
        ["gtceu:soc_wafer", ["#forge:lenses/yellow"], ["32x gtceu:soc_wafer"], [50]],
        ["gtceu:nor_memory_wafer", ["#forge:lenses/pink"], ["32x gtceu:nor_memory_wafer"], [50]],
        ["gtceu:mpic_wafer", ["#forge:lenses/brown"], ["32x gtceu:mpic_wafer"], [50]],
        ["gtceu:nand_memory_wafer", ["#forge:lenses/gray"], ["32x gtceu:nand_memory_wafer"], [50]],
        ["gtceu:advanced_soc_wafer", ["#forge:lenses/purple"], ["8x gtceu:advanced_soc_wafer"], [125]],
        ["gtceu:highly_advanced_soc_wafer", ["#forge:lenses/black"], ["4x gtceu:highly_advanced_soc_wafer"], [225]]
    ]);

    batch(gtr, "precision_laser_engraver", ["itemInputs", "notConsumable", "notConsumable", "notConsumable", "notConsumable", "notConsumable", "notConsumable", "notConsumable",
        "notConsumable", "inputFluids", "itemOutputs", "EUt", "duration", "CWUt"], [
        ["kubejs:prepared_cosmic_soc_wafer", ["kubejs:taranium_wafer"], ["kubejs:lithography_mask"], ["#forge:lenses/yellow"], ["#forge:lenses/lime"],
            ["#forge:lenses/light_blue"], ["#forge:lenses/cyan"], ["#forge:lenses/purple"], ["#forge:lenses/black"], ["#forge:lenses/blue"],
            ["gtceu:gamma_rays_photoresist 1000"], ["kubejs:prepared_cosmic_soc_wafer"], [GTValues.VA[GTValues.UIV]], [4800], [1024]],
        ["kubejs:high_precision_crystal_soc", ["gtceu:crystal_soc"], ["kubejs:lithography_mask"], ["#forge:lenses/yellow"], ["#forge:lenses/lime"],
            ["#forge:lenses/light_blue"], ["#forge:lenses/cyan"], ["#forge:lenses/purple"], ["#forge:lenses/black"], ["#forge:lenses/blue"],
            ["gtceu:euv_photoresist 1000"], ["kubejs:high_precision_crystal_soc"], [GTValues.VA[GTValues.UEV]], [2400], [256]],
        ["kubejs:nm_wafer", ["kubejs:rutherfordium_neutronium_wafer"], ["kubejs:lithography_mask"], ["#forge:lenses/blue"], ["#forge:lenses/brown"],
            ["#forge:lenses/orange"], ["#forge:lenses/red"], ["gtceu:lime_glass_lens"], ["#forge:lenses/pink"], ["#forge:lenses/gray"],
            ["gtceu:photoresist 1000"], ["kubejs:nm_wafer"], [GTValues.VA[GTValues.UV]], [900], [128]],
        ["kubejs:pm_wafer", ["kubejs:taranium_wafer"], ["kubejs:lithography_mask"], ["#forge:lenses/blue"], ["#forge:lenses/brown"],
            ["#forge:lenses/orange"], ["#forge:lenses/red"], ["gtceu:lime_glass_lens"], ["#forge:lenses/pink"], ["#forge:lenses/gray"],
            ["gtceu:euv_photoresist 1000"], ["kubejs:pm_wafer"], [GTValues.VA[GTValues.UHV]], [1800], [256]],
        ["kubejs:fm_wafer", ["kubejs:pm_wafer"], ["kubejs:grating_lithography_mask"], ["#forge:lenses/blue"], ["#forge:lenses/brown"],
            ["#forge:lenses/orange"], ["#forge:lenses/red"], ["gtceu:lime_glass_lens"], ["#forge:lenses/pink"], ["#forge:lenses/gray"],
            ["gtceu:gamma_rays_photoresist 1000"], ["kubejs:fm_wafer"], [GTValues.VA[GTValues.UEV]], [2800], [512]]
    ]);

    gtr.precision_laser_engraver("kubejs:raw_photon_carrying_wafer")
        .itemInputs("kubejs:rutherfordium_neutronium_wafer").notConsumable("kubejs:lithography_mask").notConsumable("#forge:lenses/light_gray")
        .notConsumable("#forge:lenses/purple").notConsumable("#forge:lenses/yellow").notConsumable("#forge:lenses/magenta")
        .notConsumable("#forge:lenses/orange").notConsumable("#forge:lenses/light_blue").notConsumable("#forge:lenses/pink")
        .itemOutputs("kubejs:raw_photon_carrying_wafer").inputFluids("gtceu:photoresist 1000").EUt(GTValues.VA[GTValues.UHV]).duration(600)
        .CWUt(128)

    gtr.dimensional_focus_engraving_array("kubejs:raw_photon_carrying_wafer")
        .itemInputs("kubejs:rutherfordium_neutronium_wafer")
        .notConsumable(Item.of('gtceu:programmed_circuit', '{Configuration:20}').strongNBT())
        .inputFluids("gtceu:photoresist 100")
        .itemOutputs("kubejs:raw_photon_carrying_wafer")
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(600)
        .CWUt(1)
    ["scannerResearch(java.util.function.UnaryOperator)"](b => b.researchStack(Registries.getItemStack("kubejs:raw_photon_carrying_wafer"))
        .dataStack(Registries.getItemStack("gtceu:data_module"))
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(2400))

    gtr.dimensional_focus_engraving_array("kubejs:prepared_cosmic_soc_wafer")
        .itemInputs("kubejs:taranium_wafer")
        .notConsumable(Item.of('gtceu:programmed_circuit', '{Configuration:19}').strongNBT())
        .inputFluids("gtceu:gamma_rays_photoresist 100")
        .itemOutputs("kubejs:prepared_cosmic_soc_wafer")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(4800)
        .CWUt(8)
    ["scannerResearch(java.util.function.UnaryOperator)"](b => b.researchStack(Registries.getItemStack("kubejs:prepared_cosmic_soc_wafer"))
        .dataStack(Registries.getItemStack("gtceu:data_module"))
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(2400))

    gtr.dimensional_focus_engraving_array("kubejs:high_precision_crystal_soc")
        .itemInputs("gtceu:crystal_soc")
        .notConsumable(Item.of('gtceu:programmed_circuit', '{Configuration:21}').strongNBT())
        .inputFluids("gtceu:euv_photoresist 100")
        .itemOutputs("kubejs:high_precision_crystal_soc")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(2400)
        .CWUt(2)
    ["scannerResearch(java.util.function.UnaryOperator)"](b => b.researchStack(Registries.getItemStack("kubejs:high_precision_crystal_soc"))
        .dataStack(Registries.getItemStack("gtceu:data_module"))
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(2400))

    gtr.dimensional_focus_engraving_array("kubejs:nm_wafer")
        .itemInputs("kubejs:rutherfordium_neutronium_wafer")
        .notConsumable(Item.of('gtceu:programmed_circuit', '{Configuration:27}').strongNBT())
        .inputFluids("gtceu:photoresist 100")
        .itemOutputs("kubejs:nm_wafer")
        .EUt(GTValues.VA[GTValues.UV])
        .duration(900)
        .CWUt(1)
    ["scannerResearch(java.util.function.UnaryOperator)"](b => b.researchStack(Registries.getItemStack("kubejs:nm_wafer"))
        .dataStack(Registries.getItemStack("gtceu:data_module"))
        .EUt(GTValues.VA[GTValues.UV])
        .duration(2400))

    gtr.dimensional_focus_engraving_array("kubejs:pm_wafer")
        .itemInputs("kubejs:taranium_wafer")
        .notConsumable(Item.of('gtceu:programmed_circuit', '{Configuration:18}').strongNBT())
        .inputFluids("gtceu:euv_photoresist 100")
        .itemOutputs("kubejs:pm_wafer")
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(1800)
        .CWUt(2)
    ["scannerResearch(java.util.function.UnaryOperator)"](b => b.researchStack(Registries.getItemStack("kubejs:pm_wafer"))
        .dataStack(Registries.getItemStack("gtceu:data_module"))
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(2400))

    gtr.dimensional_focus_engraving_array("kubejs:fm_wafer")
        .itemInputs("kubejs:pm_wafer")
        .notConsumable(Item.of('gtceu:programmed_circuit', '{Configuration:17}').strongNBT())
        .inputFluids("gtceu:gamma_rays_photoresist 100")
        .itemOutputs("kubejs:fm_wafer")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(2700)
        .CWUt(4)
    ["scannerResearch(java.util.function.UnaryOperator)"](b => b.researchStack(Registries.getItemStack("kubejs:fm_wafer"))
        .dataStack(Registries.getItemStack("gtceu:data_module"))
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(2400))

    gtr.chemical_bath("kubejs:cosmic_soc_wafer")
        .itemInputs("kubejs:prepared_cosmic_soc_wafer").inputFluids("gtceu:argon_plasma 1000").itemOutputs("kubejs:cosmic_soc_wafer")
        .EUt(GTValues.VA[GTValues.UEV]).duration(600).cleanroom(CleanroomType.CLEANROOM)

    gtr.cutter("kubejs:cosmic_soc")
        .itemInputs("kubejs:cosmic_soc_wafer").itemOutputs("8x kubejs:cosmic_soc").EUt(GTValues.VA[GTValues.UEV]).duration(900)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.stellar_forge("kubejs:dragon_heart")
        .itemInputs("kubejs:naquadria_charge", "64x minecraft:dragon_egg", "gtceu:double_draconiumawakened_plate")
        .itemOutputs("kubejs:dragon_heart").EUt(GTValues.VA[GTValues.UIV]).duration(200).addData("SCTier", 1)

    gtr.stellar_forge("kubejs:chaos_shard")
        .itemInputs("kubejs:quantum_chromodynamic_charge", "kubejs:infused_obsidian", "minecraft:bedrock").inputFluids("gtceu:radox 1000")
        .itemOutputs("kubejs:chaos_shard").EUt(GTValues.VA[GTValues.OpV]).duration(200).addData("SCTier", 3)

    gtr.mixer("gtceu:hastelloy_n_dust")
        .itemInputs("2x gtceu:iridium_dust", "4x gtceu:molybdenum_dust", "2x gtceu:chromium_dust", "2x gtceu:titanium_dust", "15x gtceu:nickel_dust")
        .circuit(5).itemOutputs("25x gtceu:hastelloy_n_dust").duration(1000).EUt(GTValues.VA[GTValues.EV])

    gtr.assembler("kubejs:accelerated_pipeline")
        .itemInputs("gtceu:europium_quadruple_fluid_pipe", "2x gtceu:luv_voltage_coil", "#gtceu:circuits/luv", "gtceu:niobium_nitride_single_cable",
            "gtceu:copper76_dust", "gtceu:double_neodymium_plate")
        .itemOutputs("kubejs:accelerated_pipeline").inputFluids("gtceu:soldering_alloy 288").duration(400).EUt(GTValues.VA[GTValues.IV])
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.assembler("gtlcore:lafium_mechanical_casing")
        .itemInputs("gtceu:enriched_naquadah_frame", "6x gtceu:lafium_plate").itemOutputs("2x gtlcore:lafium_mechanical_casing").circuit(6)
        .EUt(16).duration(50)

    gtr.assembler("kubejs:module_connector")
        .itemInputs("64x gtceu:hv_item_passthrough_hatch", "64x gtceu:hv_fluid_passthrough_hatch", "2x #gtceu:circuits/zpm", "4x gtceu:trinium_single_cable",
            "16x gtceu:double_manganese_plate", "64x gtceu:double_technetium_plate")
        .itemOutputs("kubejs:module_connector").inputFluids("gtceu:soldering_alloy 2880").EUt(122880).duration(400)

    gtr.assembler("kubejs:module_base")
        .itemInputs("kubejs:high_strength_concrete", "4x gtceu:technetium_plate", "4x gtceu:osmium_plate")
        .inputFluids("gtceu:soldering_alloy 288").itemOutputs("kubejs:module_base").EUt(480).duration(400)

    gtr.electric_blast_furnace("gtceu:fissioned_uranium_235_dust")
        .itemInputs("gtceu:uranium_235_dust", "gtceu:tiny_neutronium_dust").itemOutputs("gtceu:fissioned_uranium_235_dust").EUt(1920)
        .duration(800).blastFurnaceTemp(3860)

    gtr.centrifuge("gtceu:fissioned_uranium_235_dust")
        .itemInputs("gtceu:fissioned_uranium_235_dust").itemOutputs("gtceu:tin_dust", "gtceu:technetium_dust").EUt(1920).duration(400)

    gtr.chemical_reactor("gtceu:uranium_sulfate_waste_solution")
        .itemInputs("gtceu:impure_uraninite_dust").inputFluids("gtceu:sulfuric_acid 1000").itemOutputs("gtceu:uraninite_dust")
        .outputFluids("gtceu:uranium_sulfate_waste_solution 1000").EUt(120).duration(200)

    gtr.centrifuge("gtceu:uranium_sulfate_waste_solution")
        .inputFluids("gtceu:uranium_sulfate_waste_solution 1000")
        .itemOutputs("gtceu:tiny_lead_dust", "gtceu:tiny_barium_dust", "gtceu:tiny_strontium_dust", "gtceu:tiny_radium_dust")
        .outputFluids("gtceu:diluted_sulfuric_acid 1000").EUt(480).duration(500)

    gtr.chemical_reactor("gtceu:bismuth_tellurite_dust")
        .itemInputs("2x gtceu:bismuth_dust", "3x gtceu:tellurium_dust").itemOutputs("5x gtceu:bismuth_tellurite_dust").EUt(120).duration(760)

    gtr.chemical_reactor("gtceu:prasiolite_dust")
        .itemInputs("5x gtceu:silicon_dust", "gtceu:iron_dust").inputFluids("gtceu:oxygen 10000").itemOutputs("gtceu:prasiolite_dust").EUt(480)
        .duration(270)

    gtr.mixer("gtceu:magneto_resonatic_dust")
        .itemInputs("3x gtceu:prasiolite_dust", "6x gtceu:bismuth_tellurite_dust", "1x gtceu:cubic_zirconia_dust", "1x gtceu:magnetic_steel_dust")
        .itemOutputs("9x gtceu:magneto_resonatic_dust").EUt(30).duration(80).addCondition(new GravityCondition(true))

    gtr.chemical_reactor("gtceu:dibismuthhydroborat_dust")
        .itemInputs("2x gtceu:bismuth_dust", "gtceu:boron_dust").inputFluids("gtceu:hydrogen 1000")
        .itemOutputs("4x gtceu:dibismuthhydroborat_dust").EUt(90).duration(590)

    gtr.mixer("gtceu:circuit_compound_dust")
        .itemInputs("3x gtceu:dibismuthhydroborat_dust", "2x gtceu:bismuth_tellurite_dust", "gtceu:indium_gallium_phosphide_dust")
        .itemOutputs("6x gtceu:circuit_compound_dust").EUt(15).duration(890)

    gtr.forming_press("kubejs:raw_imprinted_resonatic_circuit_board")
        .itemInputs("4x gtceu:circuit_compound_dust", "gtceu:magneto_resonatic_dust").itemOutputs("kubejs:raw_imprinted_resonatic_circuit_board")
        .EUt(480).duration(300).cleanroom(CleanroomType.CLEANROOM)

    gtr.autoclave("kubejs:imprinted_resonatic_circuit_board")
        .itemInputs("kubejs:raw_imprinted_resonatic_circuit_board").inputFluids("gtceu:soldering_alloy 432")
        .itemOutputs("kubejs:imprinted_resonatic_circuit_board").EUt(1920).duration(300).cleanroom(CleanroomType.CLEANROOM)

    batch(gtr, "circuit_assembler", ["itemInputs", "itemOutputs", "EUt", "duration"], [
        ["kubejs:circuit_resonatic_ulv",
            ["4x gtceu:tantalum_capacitor", "4x gtceu:resistor", "4x gtceu:inductor", "kubejs:imprinted_resonatic_circuit_board",
                "gtceu:magneto_resonatic_gem", "gtceu:vacuum_tube"], ["4x kubejs:circuit_resonatic_ulv"], [30], [50]],
        ["kubejs:circuit_resonatic_lv",
            ["4x gtceu:diode", "4x gtceu:capacitor", "4x gtceu:transistor", "kubejs:imprinted_resonatic_circuit_board", "gtceu:magneto_resonatic_gem",
                "kubejs:circuit_resonatic_ulv"], ["4x kubejs:circuit_resonatic_lv"], [120], [90]],
        ["kubejs:circuit_resonatic_mv",
            ["8x gtceu:diode", "8x gtceu:capacitor", "8x gtceu:transistor", "kubejs:imprinted_resonatic_circuit_board", "gtceu:magneto_resonatic_gem",
                "kubejs:circuit_resonatic_lv"], ["4x kubejs:circuit_resonatic_mv"], [480], [150]],
        ["kubejs:circuit_resonatic_hv",
            ["4x gtceu:smd_diode", "4x gtceu:smd_capacitor", "4x gtceu:smd_transistor", "2x kubejs:imprinted_resonatic_circuit_board",
                "gtceu:flawless_magneto_resonatic_gem", "kubejs:circuit_resonatic_mv"], ["4x kubejs:circuit_resonatic_hv"], [1920], [230]],
        ["kubejs:circuit_resonatic_ev",
            ["8x gtceu:smd_diode", "8x gtceu:smd_capacitor", "8x gtceu:smd_transistor", "4x kubejs:imprinted_resonatic_circuit_board",
                "gtceu:flawless_magneto_resonatic_gem", "kubejs:circuit_resonatic_hv"], ["4x kubejs:circuit_resonatic_ev"], [7680], [330]],
        ["kubejs:circuit_resonatic_iv",
            ["4x gtceu:advanced_smd_diode", "4x gtceu:advanced_smd_capacitor", "4x gtceu:advanced_smd_transistor",
                "4x kubejs:imprinted_resonatic_circuit_board", "gtceu:flawless_magneto_resonatic_gem", "kubejs:circuit_resonatic_ev"],
            ["4x kubejs:circuit_resonatic_iv"], [30720], [450]],
        ["kubejs:circuit_resonatic_luv",
            ["8x gtceu:advanced_smd_diode", "8x gtceu:advanced_smd_capacitor", "8x gtceu:advanced_smd_transistor",
                "4x kubejs:imprinted_resonatic_circuit_board", "gtceu:flawless_magneto_resonatic_gem", "kubejs:circuit_resonatic_iv"],
            ["4x kubejs:circuit_resonatic_luv"], [122880], [570]]
    ]);

    const circuits = [["bioware", "zpm", "luv", 1], ["optical", "uv", "zpm", 2], ["exotic", "uhv", "uv", 3], ["cosmic", "uev", "uhv", 4],
        ["supracausal", "uiv", "uev", 5]]

    circuits.forEach((circuit) => {
        gtr.circuit_assembler("kubejs:circuit_resonatic_" + circuit[1])
            .itemInputs("16x kubejs:smd_diode_" + circuit[0], "16x kubejs:smd_capacitor_" + circuit[0], "16x kubejs:smd_transistor_" + circuit[0],
                "8x kubejs:imprinted_resonatic_circuit_board", "gtceu:exquisite_magneto_resonatic_gem", "kubejs:circuit_resonatic_" + circuit[2])
            .itemOutputs("4x kubejs:circuit_resonatic_" + circuit[1]).EUt(122880 * (4 ** circuit[3])).duration(570 + (120 + (20 * circuit[3])))
    })
});
