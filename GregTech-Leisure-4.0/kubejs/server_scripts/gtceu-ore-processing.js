//priority: 96
ServerEvents.recipes((event) => {
    const gtr = event.recipes.gtceu

    const overworld_fluids = [
        ["gtceu:oil_medium 20000", "1"],
        ["gtceu:oil 20000", "2"],
        ["gtceu:oil_heavy 15000", "3"],
        ["gtceu:oil_light 25000", "4"],
        ["gtceu:natural_gas 15000", "5"],
        ["gtceu:salt_water 40000", "6"]
    ]

    overworld_fluids.forEach((overworld_fluid) => {
        gtr.void_fluid_drilling_rig("overworld_fluid_" + overworld_fluid[1])
            .notConsumable("kubejs:overworld_data")
            .outputFluids(overworld_fluid[0])
            .circuit(overworld_fluid[1])
            .EUt(GTValues.VA[GTValues.LuV])
            .duration(20)
    })

    const nether_fluids = [
        ["minecraft:lava 65000", "1"],
        ["gtceu:natural_gas 35000", "2"]
    ]

    nether_fluids.forEach((nether_fluid) => {
        gtr.void_fluid_drilling_rig("nether_fluid_" + nether_fluid[1])
            .notConsumable("2x kubejs:nether_data")
            .outputFluids(nether_fluid[0])
            .circuit(nether_fluid[1])
            .EUt(GTValues.VA[GTValues.LuV])
            .duration(20)
    })

    const overworld_raw_ores =
        [[["3x gtceu:raw_bentonite",
            "2x gtceu:raw_magnetite",
            "2x gtceu:raw_olivine",
            "1x gtceu:raw_glauconite_sand"], "1"],

        [["9x gtceu:raw_almandine",
            "6x gtceu:raw_pyrope",
            "3x gtceu:raw_sapphire",
            "3x gtceu:raw_green_sapphire"], "2"],

        [["3x gtceu:raw_goethite",
            "12x gtceu:raw_yellow_limonite",
            "12x gtceu:raw_hematite",
            "6x gtceu:raw_malachite"], "3"],

        [["6x gtceu:raw_soapstone",
            "4x gtceu:raw_talc",
            "4x gtceu:raw_glauconite_sand",
            "2x gtceu:raw_pentlandite"], "4"],

        [["3x gtceu:raw_grossular",
            "2x gtceu:raw_spessartine",
            "2x gtceu:raw_pyrolusite",
            "1x gtceu:raw_tantalite"], "5"],

        [["13x gtceu:raw_chalcopyrite",
            "1x gtceu:raw_zeolite",
            "1x gtceu:raw_cassiterite",
            "3x gtceu:raw_realgar"], "6"],

        [["12x gtceu:raw_coal"], "7"],

        [["2x gtceu:raw_chalcopyrite",
            "8x minecraft:raw_iron",
            "8x gtceu:raw_pyrite",
            "8x minecraft:raw_copper"], "8"],

        [["12x gtceu:raw_magnetite",
            "8x gtceu:raw_vanadium_magnetite",
            "4x minecraft:raw_gold"], "9"],

        [["6x gtceu:raw_lazurite",
            "4x gtceu:raw_sodalite",
            "4x gtceu:raw_lapis",
            "2x gtceu:raw_calcite"], "10"],

        [["6x gtceu:raw_galena",
            "4x gtceu:raw_silver",
            "2x gtceu:raw_lead"], "11"],

        [["3x gtceu:raw_kyanite",
            "2x gtceu:raw_mica",
            "1x gtceu:raw_pollucite"], "12"],

        [["16x gtceu:raw_tin",
            "8x gtceu:raw_cassiterite"], "13"],

        [["6x gtceu:raw_red_garnet",
            "4x gtceu:raw_yellow_garnet",
            "4x gtceu:raw_amethyst",
            "2x gtceu:raw_opal"], "14"],

        [["12x gtceu:raw_basaltic_mineral_sand",
            "8x gtceu:raw_granitic_mineral_sand",
            "8x gtceu:raw_fullers_earth",
            "4x gtceu:raw_gypsum"], "15"],

        [["8x gtceu:raw_rock_salt",
            "1x gtceu:raw_salt",
            "3x gtceu:raw_lepidolite",
            "3x gtceu:raw_spodumene"], "16"],

        [["9x gtceu:raw_redstone",
            "6x gtceu:raw_ruby",
            "3x gtceu:raw_cinnabar"], "17"],

        [["6x gtceu:raw_apatite",
            "4x gtceu:raw_tricalcium_phosphate"], "18"],

        [["12x gtceu:raw_cassiterite_sand",
            "8x gtceu:raw_garnet_sand",
            "8x gtceu:raw_asbestos",
            "4x gtceu:raw_diatomite"], "19"],

        [["12x gtceu:raw_oilsands"], "20"],

        [["6x gtceu:raw_graphite",
            "4x gtceu:raw_diamond",
            "2x gtceu:raw_coal"], "21"],

        [["6x gtceu:raw_garnierite",
            "4x gtceu:raw_nickel",
            "4x gtceu:raw_cobaltite",
            "2x gtceu:raw_pentlandite"], "22"]]

    overworld_raw_ores.forEach((overworld_ore) => {
        let recipe = gtr.void_miner("overworld_void_ore_" + overworld_ore[1])
            .inputFluids("gtceu:drilling_fluid 1000", "gtceu:sapphire_slurry 20")
            .notConsumable("kubejs:overworld_data")
            .circuit(overworld_ore[1])
            .EUt(GTValues.VA[GTValues.EV])
            .duration(20)
        let output = overworld_ore[0]
        output.forEach(item => {
            recipe.chancedOutput(item, 2000, 0)
        })
    })
    const nether_raw_ores =
        [[["14x gtceu:raw_tetrahedrite",
            "7x minecraft:raw_copper",
            "4x gtceu:raw_stibnite"], "1"],

        [["5x gtceu:raw_bastnasite",
            "2x gtceu:raw_molybdenum",
            "2x gtceu:raw_neodymium",
            "2x gtceu:raw_monazite"], "2"],

        [["9x gtceu:raw_redstone",
            "6x gtceu:raw_ruby",
            "3x gtceu:raw_cinnabar"], "3"],

        [["6x gtceu:raw_saltpeter",
            "4x gtceu:raw_diatomite",
            "4x gtceu:raw_electrotine",
            "2x gtceu:raw_alunite"], "4"],

        [["5x gtceu:raw_beryllium",
            "6x gtceu:raw_emerald"], "5"],

        [["3x gtceu:raw_grossular",
            "2x gtceu:raw_pyrolusite",
            "1x gtceu:raw_tantalite"], "6"],

        [["8x gtceu:raw_wulfenite",
            "5x gtceu:raw_molybdenite",
            "3x gtceu:raw_molybdenum",
            "3x gtceu:raw_powellite"], "7"],

        [["5x gtceu:raw_goethite",
            "3x gtceu:raw_yellow_limonite",
            "3x gtceu:raw_hematite",
            "2x minecraft:raw_gold"], "8"],

        [["6x gtceu:raw_quartzite",
            "4x gtceu:raw_certus_quartz",
            "2x gtceu:raw_barite"], "9"],

        [["11x gtceu:raw_blue_topaz",
            "7x gtceu:raw_topaz",
            "7x gtceu:raw_chalcocite",
            "4x gtceu:raw_bornite"], "10"],

        [["12x gtceu:raw_nether_quartz",
            "4x gtceu:raw_quartzite"], "11"],

        [["15x gtceu:raw_sulfur",
            "10x gtceu:raw_pyrite",
            "5x gtceu:raw_sphalerite"], "12"]]

    nether_raw_ores.forEach((nether_ore) => {
        let recipe = gtr.void_miner("nether_void_ore_" + nether_ore[1])
            .inputFluids("gtceu:drilling_fluid 1000", "gtceu:green_sapphire_slurry 20")
            .notConsumable("2x kubejs:nether_data")
            .circuit(nether_ore[1])
            .EUt(2 * GTValues.VA[GTValues.EV])
            .duration(20)
        let output = nether_ore[0]
        output.forEach(item => {
            recipe.chancedOutput(item, 2000, 0)
        })
    })

    const end_raw_ores =
        [[["9x gtceu:raw_magnetite",
            "6x gtceu:raw_vanadium_magnetite",
            "6x gtceu:raw_chromite",
            "3x minecraft:raw_gold"], "1"],

        [["8x gtceu:raw_bauxite",
            "4x gtceu:raw_ilmenite",
            "4x gtceu:raw_aluminium"], "2"],

        [["3x gtceu:raw_bornite",
            "2x gtceu:raw_cooperite",
            "2x gtceu:raw_platinum",
            "1x gtceu:raw_palladium"], "3"],

        [["6x gtceu:raw_scheelite",
            "4x gtceu:raw_tungstate",
            "2x gtceu:raw_lithium"], "4"],

        [["9x gtceu:raw_pitchblende",
            "6x gtceu:raw_uraninite"], "5"],

        [["9x gtceu:raw_naquadah",
            "3x gtceu:raw_plutonium"], "6"]]

    end_raw_ores.forEach((end_ore) => {
        let recipe = gtr.void_miner("end_void_ore_" + end_ore[1])
            .inputFluids("gtceu:drilling_fluid 1000", "gtceu:ruby_slurry 20")
            .notConsumable("4x kubejs:end_data")
            .circuit(end_ore[1])
            .EUt(GTValues.VA[GTValues.IV])
            .duration(20)
        let output = end_ore[0]
        output.forEach(item => {
            recipe.chancedOutput(item, 2000, 0)
        })
    })

    const overworld_vs =
        [[["6x #forge:ores/bentonite",
            "4x #forge:ores/magnetite",
            "4x #forge:ores/olivine",
            "2x #forge:ores/glauconite_sand"], "kubejs:olivine_vein_essence"],

        [["18x #forge:ores/almandine",
            "12x #forge:ores/pyrope",
            "6x #forge:ores/sapphire",
            "6x #forge:ores/green_sapphire"], "kubejs:sapphire_vein_essence"],

        [["6x #forge:ores/goethite",
            "24x #forge:ores/yellow_limonite",
            "24x #forge:ores/hematite",
            "12x #forge:ores/malachite"], "kubejs:iron_vein_essence"],

        [["12x #forge:ores/soapstone",
            "8x #forge:ores/talc",
            "8x #forge:ores/glauconite_sand",
            "4x #forge:ores/pentlandite"], "kubejs:lubricant_vein_essence"],

        [["6x #forge:ores/grossular",
            "4x #forge:ores/spessartine",
            "4x #forge:ores/pyrolusite",
            "2x #forge:ores/tantalite"], "kubejs:manganese_vein_ow_essence"],

        [["25x #forge:ores/chalcopyrite",
            "1x #forge:ores/zeolite",
            "1x #forge:ores/cassiterite",
            "5x #forge:ores/realgar"], "kubejs:copper_tin_vein_essence"],

        [["24x #forge:ores/coal"], "kubejs:coal_vein_essence"],

        [["4x #forge:ores/chalcopyrite",
            "16x #forge:ores/iron",
            "16x #forge:ores/pyrite",
            "16x #forge:ores/copper"], "kubejs:copper_vein_essence"],

        [["24x #forge:ores/magnetite",
            "16x #forge:ores/vanadium_magnetite",
            "8x #forge:ores/gold"], "kubejs:magnetite_vein_ow_essence"],

        [["12x #forge:ores/lazurite",
            "8x #forge:ores/sodalite",
            "8x #forge:ores/lapis",
            "4x #forge:ores/calcite"], "kubejs:lapis_vein_essence"],

        [["12x #forge:ores/galena",
            "8x #forge:ores/silver",
            "4x #forge:ores/lead"], "kubejs:galena_vein_essence"],

        [["6x #forge:ores/kyanite",
            "4x #forge:ores/mica",
            "4x #forge:ores/bauxite",
            "2x #forge:ores/pollucite"], "kubejs:mica_vein_essence"],

        [["32x #forge:ores/tin",
            "16x #forge:ores/cassiterite"], "kubejs:cassiterite_vein_essence"],

        [["12x #forge:ores/red_garnet",
            "8x #forge:ores/yellow_garnet",
            "8x #forge:ores/amethyst",
            "4x #forge:ores/opal"], "kubejs:garnet_vein_essence"],

        [["24x #forge:ores/basaltic_mineral_sand",
            "16x #forge:ores/granitic_mineral_sand",
            "16x #forge:ores/fullers_earth",
            "8x #forge:ores/gypsum"], "kubejs:mineral_sand_vein_essence"],

        [["15x #forge:ores/rock_salt",
            "1x #forge:ores/salt",
            "5x #forge:ores/lepidolite",
            "5x #forge:ores/spodumene"], "kubejs:salts_vein_essence"],

        [["18x #forge:ores/redstone",
            "12x #forge:ores/ruby",
            "6x #forge:ores/cinnabar"], "kubejs:redstone_vein_ow_essence"],

        [["12x #forge:ores/apatite",
            "8x #forge:ores/tricalcium_phosphate",
            "4x #forge:ores/pyrochlore"], "kubejs:apatite_vein_essence"],

        [["24x #forge:ores/cassiterite_sand",
            "16x #forge:ores/garnet_sand",
            "16x #forge:ores/asbestos",
            "8x #forge:ores/diatomite"], "kubejs:garnet_tin_vein_essence"],

        [["24x #forge:ores/oilsands"], "kubejs:oilsands_vein_essence"],

        [["12x #forge:ores/graphite",
            "8x #forge:ores/diamond"], "kubejs:diamond_vein_essence"],

        [["12x #forge:ores/garnierite",
            "8x #forge:ores/nickel",
            "8x #forge:ores/cobaltite",
            "4x #forge:ores/pentlandite"], "kubejs:nickel_vein_essence"]]

    overworld_vs.forEach((overworld_v) => {
        gtr.incubator("overworld_e_" + overworld_v[1])
            .notConsumable("16x kubejs:overworld_data")
            .itemInputs("kubejs:essence_seed")
            .inputFluids("gtceu:biomass 10000", "gtceu:milk 10000")
            .itemInputs(overworld_v[0])
            .itemOutputs("64x " + overworld_v[1])
            .EUt(GTValues.VA[GTValues.HV])
            .duration(12000)
    })

    const nether_vs =
        [[["28x #forge:ores/tetrahedrite",
            "14x #forge:ores/copper",
            "7x #forge:ores/stibnite"], "kubejs:tetrahedrite_vein_essence"],

        [["9x #forge:ores/bastnasite",
            "3x #forge:ores/molybdenum",
            "3x #forge:ores/neodymium"], "kubejs:monazite_vein_essence"],

        [["18x #forge:ores/redstone",
            "12x #forge:ores/ruby",
            "6x #forge:ores/cinnabar"], "kubejs:redstone_vein_essence"],

        [["12x #forge:ores/saltpeter",
            "8x #forge:ores/diatomite",
            "8x #forge:ores/electrotine",
            "4x #forge:ores/alunite"], "kubejs:saltpeter_vein_essence"],

        [["9x #forge:ores/beryllium",
            "12x #forge:ores/emerald"], "kubejs:beryllium_vein_essence"],

        [["6x #forge:ores/grossular",
            "4x #forge:ores/pyrolusite",
            "2x #forge:ores/tantalite"], "kubejs:manganese_vein_essence"],

        [["15x #forge:ores/wulfenite",
            "1x #forge:ores/molybdenite",
            "5x #forge:ores/molybdenum",
            "5x #forge:ores/powellite"], "kubejs:molybdenum_vein_essence"],

        [["9x #forge:ores/goethite",
            "6x #forge:ores/yellow_limonite",
            "6x #forge:ores/hematite",
            "3x #forge:ores/gold"], "kubejs:banded_iron_vein_essence"],

        [["12x #forge:ores/quartzite",
            "8x #forge:ores/certus_quartz",
            "4x #forge:ores/barite"], "kubejs:certus_quartz_essence"],

        [["21x #forge:ores/blue_topaz",
            "14x #forge:ores/topaz",
            "14x #forge:ores/chalcocite",
            "7x #forge:ores/bornite"], "kubejs:topaz_vein_essence"],

        [["24x #forge:ores/nether_quartz",
            "8x #forge:ores/quartzite",
            "5x minecraft:ancient_debris"], "kubejs:nether_quartz_vein_essence"],

        [["3x #forge:ores/sulfur",
            "2x #forge:ores/pyrite",
            "1x #forge:ores/sphalerite"], "kubejs:sulfur_vein_essence"]]

    nether_vs.forEach((nether_v) => {
        gtr.incubator("nether_e_" + nether_v[1])
            .notConsumable("32x kubejs:nether_data")
            .itemInputs("kubejs:essence_seed")
            .inputFluids("gtceu:biomass 10000", "gtceu:milk 10000")
            .itemInputs(nether_v[0])
            .itemOutputs("64x " + nether_v[1])
            .EUt(GTValues.VA[GTValues.HV])
            .duration(12000)

    })

    const end_vs =
        [[["18x #forge:ores/magnetite",
            "12x #forge:ores/vanadium_magnetite",
            "12x #forge:ores/chromite",
            "6x #forge:ores/gold"], "kubejs:magnetite_vein_end_essence"],

        [["16x #forge:ores/bauxite",
            "8x #forge:ores/ilmenite",
            "8x #forge:ores/aluminium"], "kubejs:bauxite_vein_end_essence"],

        [["6x #forge:ores/bornite",
            "4x #forge:ores/cooperite",
            "4x #forge:ores/platinum",
            "2x #forge:ores/palladium"], "kubejs:sheldonite_vein_essence"],

        [["12x #forge:ores/scheelite",
            "8x #forge:ores/tungstate",
            "4x #forge:ores/lithium"], "kubejs:scheelite_vein_essence"],

        [["18x #forge:ores/pitchblende",
            "12x #forge:ores/uraninite"], "kubejs:pitchblende_vein_end_essence"],

        [["18x #forge:ores/naquadah",
            "6x #forge:ores/plutonium"], "kubejs:naquadah_vein_essence"]]

    end_vs.forEach((end_v) => {
        gtr.incubator("end_e_" + end_v[1])
            .notConsumable("64x kubejs:end_data")
            .itemInputs("kubejs:essence_seed")
            .inputFluids("gtceu:biomass 10000", "gtceu:milk 10000")
            .itemInputs(end_v[0])
            .itemOutputs("64x " + end_v[1])
            .EUt(GTValues.VA[GTValues.HV])
            .duration(12000)

    })

    gtr.macerator("kubejs:essence")
        .itemInputs("kubejs:essence_block")
        .itemOutputs("kubejs:essence")
        .chancedOutput("kubejs:essence", 5000, 400)
        .chancedOutput("kubejs:essence", 5000, 200)
        .chancedOutput("kubejs:essence", 5000, 100)
        .EUt(30)
        .duration(200)

    gtr.mixer("kubejs:essence_seed")
        .itemInputs("16x #forge:seeds", "kubejs:essence")
        .inputFluids("gtceu:distilled_water 1000", "gtceu:carbon_dioxide 1000")
        .itemOutputs("16x kubejs:essence_seed")
        .EUt(120)
        .duration(400)

    gtr.incubator("kubejs:space_essence")
        .itemInputs("#kubjes:vein_essence", "ae2:sky_dust", "gtceu:tiny_nether_star_dust")
        .inputFluids("gtceu:biomass 100", "gtceu:sterilized_growth_medium 100")
        .itemOutputs("kubejs:space_essence")
        .EUt(480)
        .duration(1200)

    gtr.incubator("minecraft:cow_spawn_egg")
        .itemInputs("4x minecraft:beef", "4x minecraft:bone", "4x minecraft:leather")
        .inputFluids("gtceu:milk 1000")
        .itemOutputs("minecraft:cow_spawn_egg")
        .EUt(480)
        .duration(1200)

    gtr.extractor("gtceu:milk")
        .itemInputs("minecraft:milk_bucket")
        .itemOutputs("minecraft:bucket")
        .outputFluids("gtceu:milk 1000")
        .EUt(16)
        .duration(60)

    gtr.extractor("gtceu:milk1")
        .notConsumable("minecraft:cow_spawn_egg")
        .outputFluids("gtceu:milk 100")
        .EUt(30)
        .duration(20)

    const overworld_ores =
        [[["60x gtceu:bentonite_ore",
            "40x gtceu:magnetite_ore",
            "40x gtceu:olivine_ore",
            "20x gtceu:glauconite_sand_ore"], "kubejs:olivine_vein_essence"],

        [["180x gtceu:almandine_ore",
            "120x gtceu:pyrope_ore",
            "60x gtceu:sapphire_ore",
            "60x gtceu:green_sapphire_ore"], "kubejs:sapphire_vein_essence"],

        [["60x gtceu:goethite_ore",
            "240x gtceu:yellow_limonite_ore",
            "240x gtceu:hematite_ore",
            "120x gtceu:malachite_ore"], "kubejs:iron_vein_essence"],

        [["120x gtceu:soapstone_ore",
            "80x gtceu:talc_ore",
            "80x gtceu:glauconite_sand_ore",
            "40x gtceu:pentlandite_ore"], "kubejs:lubricant_vein_essence"],

        [["60x gtceu:grossular_ore",
            "40x gtceu:spessartine_ore",
            "40x gtceu:pyrolusite_ore",
            "20x gtceu:tantalite_ore"], "kubejs:manganese_vein_ow_essence"],

        [["250x gtceu:chalcopyrite_ore",
            "10x gtceu:zeolite_ore",
            "10x gtceu:cassiterite_ore",
            "50x gtceu:realgar_ore"], "kubejs:copper_tin_vein_essence"],

        [["240x gtceu:coal_ore"], "kubejs:coal_vein_essence"],

        [["40x gtceu:chalcopyrite_ore",
            "160x gtceu:iron_ore",
            "160x gtceu:pyrite_ore",
            "160x gtceu:copper_ore"], "kubejs:copper_vein_essence"],

        [["240x gtceu:magnetite_ore",
            "160x gtceu:vanadium_magnetite_ore",
            "80x gtceu:gold_ore"], "kubejs:magnetite_vein_ow_essence"],

        [["120x gtceu:lazurite_ore",
            "80x gtceu:sodalite_ore",
            "80x gtceu:lapis_ore",
            "40x gtceu:calcite_ore"], "kubejs:lapis_vein_essence"],

        [["120x gtceu:galena_ore",
            "80x gtceu:silver_ore",
            "40x gtceu:lead_ore"], "kubejs:galena_vein_essence"],

        [["60x gtceu:kyanite_ore",
            "40x gtceu:mica_ore",
            "40x gtceu:bauxite_ore",
            "20x gtceu:pollucite_ore"], "kubejs:mica_vein_essence"],

        [["320x gtceu:tin_ore",
            "160x gtceu:cassiterite_ore"], "kubejs:cassiterite_vein_essence"],

        [["120x gtceu:red_garnet_ore",
            "80x gtceu:yellow_garnet_ore",
            "80x gtceu:amethyst_ore",
            "40x gtceu:opal_ore"], "kubejs:garnet_vein_essence"],

        [["240x gtceu:basaltic_mineral_sand_ore",
            "160x gtceu:granitic_mineral_sand_ore",
            "160x gtceu:fullers_earth_ore",
            "80x gtceu:gypsum_ore"], "kubejs:mineral_sand_vein_essence"],

        [["150x gtceu:rock_salt_ore",
            "10x gtceu:salt_ore",
            "50x gtceu:lepidolite_ore",
            "50x gtceu:spodumene_ore"], "kubejs:salts_vein_essence"],

        [["180x gtceu:redstone_ore",
            "120x gtceu:ruby_ore",
            "60x gtceu:cinnabar_ore"], "kubejs:redstone_vein_ow_essence"],

        [["120x gtceu:apatite_ore",
            "80x gtceu:tricalcium_phosphate_ore",
            "40x gtceu:pyrochlore_ore"], "kubejs:apatite_vein_essence"],

        [["240x gtceu:cassiterite_sand_ore",
            "160x gtceu:garnet_sand_ore",
            "160x gtceu:asbestos_ore",
            "80x gtceu:diatomite_ore"], "kubejs:garnet_tin_vein_essence"],

        [["240x gtceu:oilsands_ore"], "kubejs:oilsands_vein_essence"],

        [["120x gtceu:graphite_ore",
            "80x gtceu:diamond_ore",
            "40x gtceu:coal_ore"], "kubejs:diamond_vein_essence"],

        [["120x gtceu:garnierite_ore",
            "80x gtceu:nickel_ore",
            "80x gtceu:cobaltite_ore",
            "40x gtceu:pentlandite_ore"], "kubejs:nickel_vein_essence"]]

    overworld_ores.forEach((overworld_ore) => {
        gtr.large_void_miner("overworld_void_ore_" + overworld_ore[1])
            .inputFluids("gtceu:drilling_fluid 1000000")
            .itemInputs(overworld_ore[1])
            .itemOutputs(overworld_ore[0])
            .EUt(GTValues.VA[GTValues.LuV])
            .duration(200)
    })

    const nether_ores =
        [[["280x gtceu:netherrack_tetrahedrite_ore",
            "140x gtceu:netherrack_copper_ore",
            "70x gtceu:netherrack_stibnite_ore"], "kubejs:tetrahedrite_vein_essence"],

        [["90x gtceu:netherrack_bastnasite_ore",
            "30x gtceu:netherrack_molybdenum_ore",
            "30x gtceu:netherrack_neodymium_ore",
            "30x gtceu:netherrack_monazite_ore"], "kubejs:monazite_vein_essence"],

        [["180x gtceu:netherrack_redstone_ore",
            "120x gtceu:netherrack_ruby_ore",
            "60x gtceu:netherrack_cinnabar_ore",
            "20x gtceu:netherrack_rubidium_ore"], "kubejs:redstone_vein_essence"],

        [["120x gtceu:netherrack_saltpeter_ore",
            "80x gtceu:netherrack_diatomite_ore",
            "80x gtceu:netherrack_electrotine_ore",
            "40x gtceu:netherrack_alunite_ore"], "kubejs:saltpeter_vein_essence"],

        [["90x gtceu:netherrack_beryllium_ore",
            "120x gtceu:netherrack_emerald_ore",
            "20x gtceu:netherrack_celestine_ore"], "kubejs:beryllium_vein_essence"],

        [["60x gtceu:netherrack_grossular_ore",
            "40x gtceu:netherrack_pyrolusite_ore",
            "20x gtceu:netherrack_tantalite_ore",
            "20x gtceu:netherrack_zircon_ore"], "kubejs:manganese_vein_essence"],

        [["150x gtceu:netherrack_wulfenite_ore",
            "100x gtceu:netherrack_molybdenite_ore",
            "50x gtceu:netherrack_molybdenum_ore",
            "50x gtceu:netherrack_powellite_ore"], "kubejs:molybdenum_vein_essence"],

        [["90x gtceu:netherrack_goethite_ore",
            "60x gtceu:netherrack_yellow_limonite_ore",
            "60x gtceu:netherrack_hematite_ore",
            "30x gtceu:netherrack_gold_ore"], "kubejs:banded_iron_vein_essence"],

        [["120x gtceu:netherrack_quartzite_ore",
            "80x gtceu:netherrack_certus_quartz_ore",
            "40x gtceu:netherrack_barite_ore"], "kubejs:certus_quartz_essence"],

        [["210x gtceu:netherrack_blue_topaz_ore",
            "140x gtceu:netherrack_topaz_ore",
            "140x gtceu:netherrack_chalcocite_ore",
            "70x gtceu:netherrack_bornite_ore"], "kubejs:topaz_vein_essence"],

        [["240x gtceu:netherrack_nether_quartz_ore",
            "80x gtceu:netherrack_quartzite_ore",
            "50x minecraft:ancient_debris"], "kubejs:nether_quartz_vein_essence"],

        [["300x gtceu:netherrack_sulfur_ore",
            "200x gtceu:netherrack_pyrite_ore",
            "100x gtceu:netherrack_sphalerite_ore",
            "20x gtceu:netherrack_indium_ore"], "kubejs:sulfur_vein_essence"]]

    nether_ores.forEach((nether_ore) => {
        gtr.large_void_miner("nether_void_ore_" + nether_ore[1])
            .inputFluids("gtceu:drilling_fluid 1000000")
            .itemInputs(nether_ore[1])
            .itemOutputs(nether_ore[0])
            .EUt(GTValues.VA[GTValues.LuV] * 2)
            .duration(200)
    })

    const end_ores =
        [[["180x gtceu:endstone_magnetite_ore",
            "120x gtceu:endstone_vanadium_magnetite_ore",
            "120x gtceu:endstone_chromite_ore",
            "60x gtceu:endstone_gold_ore"], "kubejs:magnetite_vein_end_essence"],

        [["160x gtceu:endstone_bauxite_ore",
            "80x gtceu:endstone_ilmenite_ore",
            "80x gtceu:endstone_aluminium_ore",
            "30x gtceu:endstone_titanium_ore"], "kubejs:bauxite_vein_end_essence"],

        [["60x gtceu:endstone_bornite_ore",
            "40x gtceu:endstone_cooperite_ore",
            "40x gtceu:endstone_platinum_ore",
            "20x gtceu:endstone_palladium_ore"], "kubejs:sheldonite_vein_essence"],

        [["120x gtceu:endstone_scheelite_ore",
            "80x gtceu:endstone_tungstate_ore",
            "40x gtceu:endstone_lithium_ore",
            "20x gtceu:endstone_tellurium_ore"], "kubejs:scheelite_vein_essence"],

        [["180x gtceu:endstone_pitchblende_ore",
            "120x gtceu:endstone_uraninite_ore",
            "30x gtceu:endstone_tungsten_ore"], "kubejs:pitchblende_vein_end_essence"],

        [["180x gtceu:endstone_naquadah_ore",
            "80x gtceu:endstone_enriched_naquadah_ore",
            "60x gtceu:endstone_plutonium_ore",
            "40x gtceu:endstone_trinium_compound_ore"], "kubejs:naquadah_vein_essence"]]

    const all_ores = overworld_ores.concat(nether_ores, end_ores)

    let recipe = gtr.random_ore("random_ore")
        .inputFluids("gtceu:drilling_fluid 10000000")
        .EUt(GTValues.VA[GTValues.ZPM])
        .duration(1200)
    all_ores.forEach(ore => {
        ore[0].forEach(item => {
            recipe.chancedOutput(item, 200, 20)
        })
    })

    end_ores.forEach((end_ore) => {
        gtr.large_void_miner("end_void_ore_" + end_ore[1])
            .inputFluids("gtceu:drilling_fluid 1000000")
            .itemInputs(end_ore[1])
            .itemOutputs(end_ore[0])
            .EUt(GTValues.VA[GTValues.ZPM])
            .duration(200)
    })
})
