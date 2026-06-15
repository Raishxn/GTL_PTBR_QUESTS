//priority: 96
ServerEvents.recipes((event) => {
    const gtr = event.recipes.gtceu

    const space_ores1 =
        [[["280x gtceu:tetrahedrite_ore",
            "140x gtceu:copper_ore",
            "60x gtceu:bentonite_ore",
            "40x gtceu:magnetite_ore",
            "40x gtceu:olivine_ore",
            "20x gtceu:glauconite_sand_ore"], "1"],

        [["180x gtceu:almandine_ore",
            "120x gtceu:pyrope_ore",
            "60x gtceu:sapphire_ore",
            "60x gtceu:green_sapphire_ore",
            "70x gtceu:stibnite_ore",
            "120x gtceu:uraninite_ore"], "2"],

        [["90x gtceu:bastnasite_ore",
            "30x gtceu:molybdenum_ore",
            "60x gtceu:goethite_ore",
            "240x gtceu:yellow_limonite_ore",
            "240x gtceu:hematite_ore",
            "120x gtceu:malachite_ore"], "3"],

        [["120x gtceu:soapstone_ore",
            "80x gtceu:talc_ore",
            "80x gtceu:glauconite_sand_ore",
            "40x gtceu:pentlandite_ore",
            "30x gtceu:neodymium_ore",
            "60x gtceu:monazite_ore"], "4"],

        [["180x gtceu:redstone_ore",
            "120x gtceu:ruby_ore",
            "60x gtceu:grossular_ore",
            "40x gtceu:spessartine_ore",
            "40x gtceu:pyrolusite_ore",
            "20x gtceu:tantalite_ore"], "5"],

        [["250x gtceu:chalcopyrite_ore",
            "10x gtceu:zeolite_ore",
            "10x gtceu:cassiterite_ore",
            "50x gtceu:realgar_ore",
            "60x gtceu:cinnabar_ore",
            "80x ae2:sky_stone_block"], "6"],

        [["120x gtceu:saltpeter_ore",
            "80x gtceu:diatomite_ore",
            "80x gtceu:electrotine_ore",
            "40x gtceu:alunite_ore",
            "240x gtceu:coal_ore",
            "40x gtceu:rubidium_ore"], "7"],

        [["90x gtceu:beryllium_ore",
            "120x gtceu:emerald_ore",
            "40x gtceu:chalcopyrite_ore",
            "160x gtceu:iron_ore",
            "160x gtceu:pyrite_ore",
            "160x gtceu:copper_ore"], "8"],

        [["60x gtceu:grossular_ore",
            "40x gtceu:pyrolusite_ore",
            "20x gtceu:tantalite_ore",
            "240x gtceu:magnetite_ore",
            "160x gtceu:vanadium_magnetite_ore",
            "80x gtceu:gold_ore"], "9"],

        [["120x gtceu:lazurite_ore",
            "80x gtceu:sodalite_ore",
            "80x gtceu:lapis_ore",
            "40x gtceu:calcite_ore",
            "150x gtceu:wulfenite_ore",
            "30x gtceu:calorite_ore"], "10"],

        [["120x gtceu:galena_ore",
            "80x gtceu:silver_ore",
            "40x gtceu:lead_ore",
            "100x gtceu:molybdenite_ore",
            "50x gtceu:molybdenum_ore",
            "50x gtceu:powellite_ore"], "11"],

        [["90x gtceu:goethite_ore",
            "60x gtceu:yellow_limonite_ore",
            "60x gtceu:kyanite_ore",
            "40x gtceu:mica_ore",
            "40x gtceu:bauxite_ore",
            "20x gtceu:pollucite_ore"], "12"],

        [["120x gtceu:quartzite_ore",
            "80x gtceu:certus_quartz_ore",
            "140x gtceu:zircon_ore",
            "160x gtceu:cassiterite_ore",
            "60x gtceu:hematite_ore",
            "30x gtceu:gold_ore"], "13"],

        [["40x gtceu:barite_ore",
            "120x gtceu:red_garnet_ore",
            "80x gtceu:yellow_garnet_ore",
            "80x gtceu:amethyst_ore",
            "40x gtceu:opal_ore",
            "20x gtceu:alien_algae_ore"], "14"],

        [["210x gtceu:blue_topaz_ore",
            "140x gtceu:topaz_ore",
            "240x gtceu:basaltic_mineral_sand_ore",
            "160x gtceu:granitic_mineral_sand_ore",
            "160x gtceu:fullers_earth_ore",
            "80x gtceu:gypsum_ore"], "15"],

        [["150x gtceu:rock_salt_ore",
            "10x gtceu:salt_ore",
            "50x gtceu:lepidolite_ore",
            "50x gtceu:spodumene_ore",
            "140x gtceu:chalcocite_ore",
            "70x gtceu:bornite_ore"], "16"],

        [["180x gtceu:redstone_ore",
            "120x gtceu:ruby_ore",
            "60x gtceu:cinnabar_ore",
            "240x gtceu:nether_quartz_ore",
            "80x gtceu:quartzite_ore",
            "50x minecraft:ancient_debris"], "17"],

        [["120x gtceu:apatite_ore",
            "80x gtceu:tricalcium_phosphate_ore",
            "40x gtceu:pyrochlore_ore",
            "300x gtceu:sulfur_ore",
            "200x gtceu:pyrite_ore",
            "100x gtceu:sphalerite_ore"], "18"],

        [["180x gtceu:magnetite_ore",
            "120x gtceu:vanadium_magnetite_ore",
            "240x gtceu:cassiterite_sand_ore",
            "160x gtceu:garnet_sand_ore",
            "160x gtceu:asbestos_ore",
            "80x gtceu:diatomite_ore"], "19"],

        [["240x gtceu:oilsands_ore",
            "60x gtceu:gold_ore",
            "80x gtceu:infused_gold_ore",
            "160x gtceu:bauxite_ore",
            "80x gtceu:ilmenite_ore",
            "80x gtceu:aluminium_ore"], "20"],

        [["60x gtceu:bornite_ore",
            "40x gtceu:cooperite_ore",
            "120x gtceu:graphite_ore",
            "80x gtceu:diamond_ore",
            "40x gtceu:coal_ore",
            "40x gtceu:titanium_ore"], "21"],

        [["120x gtceu:garnierite_ore",
            "80x gtceu:nickel_ore",
            "80x gtceu:cobaltite_ore",
            "40x gtceu:pentlandite_ore",
            "40x gtceu:platinum_ore",
            "20x gtceu:palladium_ore"], "22"],

        [["120x gtceu:scheelite_ore",
            "80x gtceu:tungstate_ore",
            "40x gtceu:lithium_ore",
            "20x gtceu:tellurium_ore",
            "30x gtceu:tungsten_ore",
            "180x gtceu:pitchblende_ore"], "23"],

        [["180x gtceu:naquadah_ore",
            "120x gtceu:chromite_ore",
            "60x gtceu:plutonium_ore",
            "30x gtceu:enriched_naquadah_ore",
            "90x gtceu:trinium_compound_ore",
            "30x gtceu:indium_ore"], "24"]
        ]

    const space_drones = [1, 2, 3, 4, 5, 6]

    space_drones.forEach((space_drone) => {
        space_ores1.forEach((space_ore) => {
            gtr.miner_module("space_ore_1_" + space_ore[1] + space_drone)
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_ore[1])
                .inputFluids("gtceu:rocket_fuel 20000")
                .itemOutputs(space_ore[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.miner_module("space_ore_2_" + space_ore[1] + space_drone)
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_ore[1])
                .inputFluids("gtceu:rocket_fuel_rp_1 16000")
                .itemOutputs(space_ore[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.miner_module("space_ore_3_" + space_ore[1] + space_drone)
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_ore[1])
                .inputFluids("gtceu:dense_hydrazine_fuel_mixture 12000")
                .itemOutputs(space_ore[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.miner_module("space_ore_4_" + space_ore[1] + space_drone)
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_ore[1])
                .inputFluids("gtceu:rocket_fuel_cn3h7o3 10000")
                .itemOutputs(space_ore[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.miner_module("space_ore_5_" + space_ore[1] + space_drone)
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_ore[1])
                .inputFluids("gtceu:rocket_fuel_cn3h7o3 8000")
                .itemOutputs(space_ore[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.miner_module("space_ore_6_" + space_ore[1] + space_drone)
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_ore[1])
                .inputFluids("gtceu:rocket_fuel_h8n4c2o4 6000")
                .itemOutputs(space_ore[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.miner_module("space_ore_7_" + space_ore[1] + space_drone)
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_ore[1])
                .inputFluids("ad_astra:cryo_fuel 4000")
                .itemOutputs(space_ore[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.miner_module("space_ore_8_" + space_ore[1] + space_drone)
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_ore[1])
                .inputFluids("gtceu:stellar_energy_rocket_fuel 2000")
                .itemOutputs(space_ore[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))
        })
    })

    const space_ores2 =
        [[["20x gtceu:jasper_ore",
            "140x gtceu:red_garnet_ore",
            "60x gtceu:topaz_ore",
            "40x gtceu:emerald_ore",
            "40x gtceu:amethyst_ore",
            "20x gtceu:celestine_ore"], "25"]
        ]

    space_drones.slice(1).forEach((space_drone) => {
        space_ores2.forEach((space_ore) => {
            gtr.miner_module("space_ore_1_" + space_ore[1] + space_drone)
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_ore[1])
                .inputFluids("gtceu:rocket_fuel 20000")
                .itemOutputs(space_ore[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.miner_module("space_ore_2_" + space_ore[1] + space_drone)
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_ore[1])
                .inputFluids("gtceu:rocket_fuel_rp_1 16000")
                .itemOutputs(space_ore[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.miner_module("space_ore_3_" + space_ore[1] + space_drone)
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_ore[1])
                .inputFluids("gtceu:dense_hydrazine_fuel_mixture 12000")
                .itemOutputs(space_ore[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.miner_module("space_ore_4_" + space_ore[1] + space_drone)
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_ore[1])
                .inputFluids("gtceu:rocket_fuel_cn3h7o3 10000")
                .itemOutputs(space_ore[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.miner_module("space_ore_5_" + space_ore[1] + space_drone)
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_ore[1])
                .inputFluids("gtceu:rocket_fuel_cn3h7o3 8000")
                .itemOutputs(space_ore[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.miner_module("space_ore_6_" + space_ore[1] + space_drone)
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_ore[1])
                .inputFluids("gtceu:rocket_fuel_h8n4c2o4 6000")
                .itemOutputs(space_ore[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.miner_module("space_ore_7_" + space_ore[1] + space_drone)
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_ore[1])
                .inputFluids("ad_astra:cryo_fuel 4000")
                .itemOutputs(space_ore[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.miner_module("space_ore_8_" + space_ore[1] + space_drone)
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_ore[1])
                .inputFluids("gtceu:stellar_energy_rocket_fuel 2000")
                .itemOutputs(space_ore[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))
        })
    })

    const space_ores3 =
        [[["140x gtceu:iron_ore",
            "140x gtceu:tin_ore",
            "60x gtceu:nickel_ore",
            "60x gtceu:uruium_ore",
            "40x gtceu:force_ore",
            "20x gtceu:cobalt_ore"], "26"],
        [["120x gtceu:bloodstone_ore",
            "80x gtceu:redstone_ore",
            "120x gtceu:red_garnet_ore",
            "40x gtceu:gravel_ruby_ore",
            "40x gtceu:almandine_ore",
            "40x gtceu:pyrope_ore"], "27"]
        ]

    space_drones.slice(2).forEach((space_drone) => {
        space_ores3.forEach((space_ore) => {
            gtr.miner_module("space_ore_1_" + space_ore[1] + space_drone)
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_ore[1])
                .inputFluids("gtceu:rocket_fuel 20000")
                .itemOutputs(space_ore[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.miner_module("space_ore_2_" + space_ore[1] + space_drone)
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_ore[1])
                .inputFluids("gtceu:rocket_fuel_rp_1 16000")
                .itemOutputs(space_ore[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.miner_module("space_ore_3_" + space_ore[1] + space_drone)
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_ore[1])
                .inputFluids("gtceu:dense_hydrazine_fuel_mixture 12000")
                .itemOutputs(space_ore[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.miner_module("space_ore_4_" + space_ore[1] + space_drone)
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_ore[1])
                .inputFluids("gtceu:rocket_fuel_cn3h7o3 10000")
                .itemOutputs(space_ore[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.miner_module("space_ore_5_" + space_ore[1] + space_drone)
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_ore[1])
                .inputFluids("gtceu:rocket_fuel_cn3h7o3 8000")
                .itemOutputs(space_ore[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.miner_module("space_ore_6_" + space_ore[1] + space_drone)
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_ore[1])
                .inputFluids("gtceu:rocket_fuel_h8n4c2o4 6000")
                .itemOutputs(space_ore[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.miner_module("space_ore_7_" + space_ore[1] + space_drone)
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_ore[1])
                .inputFluids("ad_astra:cryo_fuel 4000")
                .itemOutputs(space_ore[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.miner_module("space_ore_8_" + space_ore[1] + space_drone)
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_ore[1])
                .inputFluids("gtceu:stellar_energy_rocket_fuel 2000")
                .itemOutputs(space_ore[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))
        })
    })

    const space_ores4 =
        [[["80x gtceu:naquadah_ore",
            "40x gtceu:adamantine_compounds_ore",
            "60x gtceu:rare_earth_metal_ore",
            "40x gtceu:monazite_ore",
            "40x gtceu:bastnasite_ore",
            "20x gtceu:enriched_naquadah_ore"], "28"],
        [["40x gtceu:earth_crystal_ore",
            "40x gtceu:ignis_crystal_ore",
            "80x gtceu:uraninite_ore",
            "40x gtceu:orichalcum_ore",
            "60x gtceu:mithril_ore",
            "80x gtceu:salt_ore"], "29"]
        ]

    space_drones.slice(3).forEach((space_drone) => {
        space_ores4.forEach((space_ore) => {
            gtr.miner_module("space_ore_1_" + space_ore[1] + space_drone)
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_ore[1])
                .inputFluids("gtceu:rocket_fuel 20000")
                .itemOutputs(space_ore[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.miner_module("space_ore_2_" + space_ore[1] + space_drone)
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_ore[1])
                .inputFluids("gtceu:rocket_fuel_rp_1 16000")
                .itemOutputs(space_ore[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.miner_module("space_ore_3_" + space_ore[1] + space_drone)
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_ore[1])
                .inputFluids("gtceu:dense_hydrazine_fuel_mixture 12000")
                .itemOutputs(space_ore[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.miner_module("space_ore_4_" + space_ore[1] + space_drone)
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_ore[1])
                .inputFluids("gtceu:rocket_fuel_cn3h7o3 10000")
                .itemOutputs(space_ore[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.miner_module("space_ore_5_" + space_ore[1] + space_drone)
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_ore[1])
                .inputFluids("gtceu:rocket_fuel_cn3h7o3 8000")
                .itemOutputs(space_ore[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.miner_module("space_ore_6_" + space_ore[1] + space_drone)
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_ore[1])
                .inputFluids("gtceu:rocket_fuel_h8n4c2o4 6000")
                .itemOutputs(space_ore[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.miner_module("space_ore_7_" + space_ore[1] + space_drone)
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_ore[1])
                .inputFluids("ad_astra:cryo_fuel 4000")
                .itemOutputs(space_ore[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.miner_module("space_ore_8_" + space_ore[1] + space_drone)
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_ore[1])
                .inputFluids("gtceu:stellar_energy_rocket_fuel 2000")
                .itemOutputs(space_ore[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))
        })
    })

    const space_ores5 =
        [[["80x gtceu:enderium_ore",
            "120x gtceu:sodalite_ore",
            "60x gtceu:celestine_ore",
            "80x gtceu:lapis_ore",
            "60x gtceu:bauxite_ore",
            "40x gtceu:pitchblende_ore"], "30"],
        [["40x gtceu:silver_ore",
            "60x gtceu:andesite_platinum_ore",
            "60x gtceu:tartarite_ore",
            "80x gtceu:vibranium_ore",
            "120x gtceu:aluminium_ore",
            "120x gtceu:iron_ore"], "31"]
        ]

    space_drones.slice(4).forEach((space_drone) => {
        space_ores5.forEach((space_ore) => {
            gtr.miner_module("space_ore_1_" + space_ore[1] + space_drone)
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_ore[1])
                .inputFluids("gtceu:rocket_fuel 20000")
                .itemOutputs(space_ore[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.miner_module("space_ore_2_" + space_ore[1] + space_drone)
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_ore[1])
                .inputFluids("gtceu:rocket_fuel_rp_1 16000")
                .itemOutputs(space_ore[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.miner_module("space_ore_3_" + space_ore[1] + space_drone)
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_ore[1])
                .inputFluids("gtceu:dense_hydrazine_fuel_mixture 12000")
                .itemOutputs(space_ore[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.miner_module("space_ore_4_" + space_ore[1] + space_drone)
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_ore[1])
                .inputFluids("gtceu:rocket_fuel_cn3h7o3 10000")
                .itemOutputs(space_ore[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.miner_module("space_ore_5_" + space_ore[1] + space_drone)
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_ore[1])
                .inputFluids("gtceu:rocket_fuel_cn3h7o3 8000")
                .itemOutputs(space_ore[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.miner_module("space_ore_6_" + space_ore[1] + space_drone)
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_ore[1])
                .inputFluids("gtceu:rocket_fuel_h8n4c2o4 6000")
                .itemOutputs(space_ore[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.miner_module("space_ore_7_" + space_ore[1] + space_drone)
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_ore[1])
                .inputFluids("ad_astra:cryo_fuel 4000")
                .itemOutputs(space_ore[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.miner_module("space_ore_8_" + space_ore[1] + space_drone)
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_ore[1])
                .inputFluids("gtceu:stellar_energy_rocket_fuel 2000")
                .itemOutputs(space_ore[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))
        })
    })

    const space_ores6 =
        [[["12x gtceu:lazurite_ore",
            "80x gtceu:sapphire_ore",
            "60x gtceu:starmetal_ore",
            "80x gtceu:green_sapphire_ore",
            "120x gtceu:yellow_garnet_ore",
            "80x gtceu:pollucite_ore"], "32"]
        ]

    space_drones.slice(5).forEach((space_drone) => {
        space_ores6.forEach((space_ore) => {
            gtr.miner_module("space_ore_1_" + space_ore[1] + space_drone)
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_ore[1])
                .inputFluids("gtceu:rocket_fuel 20000")
                .itemOutputs(space_ore[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.miner_module("space_ore_2_" + space_ore[1] + space_drone)
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_ore[1])
                .inputFluids("gtceu:rocket_fuel_rp_1 16000")
                .itemOutputs(space_ore[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.miner_module("space_ore_3_" + space_ore[1] + space_drone)
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_ore[1])
                .inputFluids("gtceu:dense_hydrazine_fuel_mixture 12000")
                .itemOutputs(space_ore[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.miner_module("space_ore_4_" + space_ore[1] + space_drone)
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_ore[1])
                .inputFluids("gtceu:rocket_fuel_cn3h7o3 10000")
                .itemOutputs(space_ore[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.miner_module("space_ore_5_" + space_ore[1] + space_drone)
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_ore[1])
                .inputFluids("gtceu:rocket_fuel_cn3h7o3 8000")
                .itemOutputs(space_ore[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.miner_module("space_ore_6_" + space_ore[1] + space_drone)
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_ore[1])
                .inputFluids("gtceu:rocket_fuel_h8n4c2o4 6000")
                .itemOutputs(space_ore[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.miner_module("space_ore_7_" + space_ore[1] + space_drone)
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_ore[1])
                .inputFluids("ad_astra:cryo_fuel 4000")
                .itemOutputs(space_ore[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.miner_module("space_ore_8_" + space_ore[1] + space_drone)
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_ore[1])
                .inputFluids("gtceu:stellar_energy_rocket_fuel 2000")
                .itemOutputs(space_ore[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))
        })
    })

    const space_fluids = [
        ["gtceu:hydrogen 1000000", 1],
        ["gtceu:helium 1000000", 2],
        ["gtceu:nitrogen 1000000", 3],
        ["gtceu:methane 1000000", 4],
        ["gtceu:sulfur_dioxide 1000000", 5],
        ["gtceu:carbon_dioxide 1000000", 6],
        ["gtceu:nitrogen_dioxide 1000000", 7],
        ["gtceu:ammonia 1000000", 8],
        ["gtceu:chlorine 1000000", 9],
        ["gtceu:fluorine 1000000", 10],
        ["gtceu:carbon_monoxide 1000000", 11],
        ["gtceu:oxygen 1000000", 12]]

    space_drones.forEach((space_drone) => {
        space_fluids.forEach((space_fluid) => {
            gtr.drilling_module(space_drone + "1_space_fluid_" + space_fluid[1])
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_fluid[1])
                .inputFluids("gtceu:rocket_fuel 10000")
                .outputFluids(space_fluid[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.drilling_module(space_drone + "2_space_fluid_" + space_fluid[1])
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_fluid[1])
                .inputFluids("gtceu:rocket_fuel_rp_1 8000")
                .outputFluids(space_fluid[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.drilling_module(space_drone + "3_space_fluid_" + space_fluid[1])
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_fluid[1])
                .inputFluids("gtceu:dense_hydrazine_fuel_mixture 7000")
                .outputFluids(space_fluid[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.drilling_module(space_drone + "4_space_fluid_" + space_fluid[1])
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_fluid[1])
                .inputFluids("gtceu:rocket_fuel_cn3h7o3 6000")
                .outputFluids(space_fluid[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.drilling_module(space_drone + "5_space_fluid_" + space_fluid[1])
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_fluid[1])
                .inputFluids("gtceu:rocket_fuel_cn3h7o3 5000")
                .outputFluids(space_fluid[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.drilling_module(space_drone + "6_space_fluid_" + space_fluid[1])
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_fluid[1])
                .inputFluids("gtceu:rocket_fuel_h8n4c2o4 4000")
                .outputFluids(space_fluid[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.drilling_module(space_drone + "7_space_fluid_" + space_fluid[1])
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_fluid[1])
                .inputFluids("ad_astra:cryo_fuel 2000")
                .outputFluids(space_fluid[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.drilling_module(space_drone + "8_space_fluid_" + space_fluid[1])
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_fluid[1])
                .inputFluids("gtceu:stellar_energy_rocket_fuel 1000")
                .outputFluids(space_fluid[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))
        })
    })
    const space_fluid1s = [
        ["gtceu:unknowwater 10000", 13],
        ["gtceu:neon 100000", 14],
        ["gtceu:argon 100000", 15],
        ["gtceu:krypton 100000", 16],
        ["gtceu:xenon 100000", 17],
        ["gtceu:radon 100000", 18],
        ["gtceu:helium_3 100000", 19]]
    space_drones.slice(1).forEach((space_drone) => {
        space_fluid1s.forEach((space_fluid) => {
            gtr.drilling_module(space_drone + "1_space_fluid_" + space_fluid[1])
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_fluid[1])
                .inputFluids("gtceu:rocket_fuel 10000")
                .outputFluids(space_fluid[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.drilling_module(space_drone + "2_space_fluid_" + space_fluid[1])
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_fluid[1])
                .inputFluids("gtceu:rocket_fuel_rp_1 8000")
                .outputFluids(space_fluid[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.drilling_module(space_drone + "3_space_fluid_" + space_fluid[1])
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_fluid[1])
                .inputFluids("gtceu:dense_hydrazine_fuel_mixture 7000")
                .outputFluids(space_fluid[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.drilling_module(space_drone + "4_space_fluid_" + space_fluid[1])
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_fluid[1])
                .inputFluids("gtceu:rocket_fuel_cn3h7o3 6000")
                .outputFluids(space_fluid[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.drilling_module(space_drone + "5_space_fluid_" + space_fluid[1])
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_fluid[1])
                .inputFluids("gtceu:rocket_fuel_cn3h7o3 5000")
                .outputFluids(space_fluid[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.drilling_module(space_drone + "6_space_fluid_" + space_fluid[1])
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_fluid[1])
                .inputFluids("gtceu:rocket_fuel_h8n4c2o4 4000")
                .outputFluids(space_fluid[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.drilling_module(space_drone + "7_space_fluid_" + space_fluid[1])
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_fluid[1])
                .inputFluids("ad_astra:cryo_fuel 2000")
                .outputFluids(space_fluid[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.drilling_module(space_drone + "8_space_fluid_" + space_fluid[1])
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_fluid[1])
                .inputFluids("gtceu:stellar_energy_rocket_fuel 1000")
                .outputFluids(space_fluid[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))
        })
    })

    const space_fluid2s = [
        ["gtceu:deuterium 100000", 20],
        ["gtceu:tritium 100000", 21],
        ["gtceu:heavy_fuel 100000", 22],
        ["gtceu:light_fuel 100000", 23],
        ["gtceu:naphtha 100000", 24],
        ["gtceu:refinery_gas 100000", 25],
        ["gtceu:coal_gas 100000", 26],
        ["gtceu:bromine 100000", 27],
        ["gtceu:barnarda_air 100000", 28]]
    space_drones.slice(2).forEach((space_drone) => {
        space_fluid2s.forEach((space_fluid) => {
            gtr.drilling_module(space_drone + "1_space_fluid_" + space_fluid[1])
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_fluid[1])
                .inputFluids("gtceu:rocket_fuel 10000")
                .outputFluids(space_fluid[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.drilling_module(space_drone + "2_space_fluid_" + space_fluid[1])
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_fluid[1])
                .inputFluids("gtceu:rocket_fuel_rp_1 8000")
                .outputFluids(space_fluid[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.drilling_module(space_drone + "3_space_fluid_" + space_fluid[1])
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_fluid[1])
                .inputFluids("gtceu:dense_hydrazine_fuel_mixture 7000")
                .outputFluids(space_fluid[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.drilling_module(space_drone + "4_space_fluid_" + space_fluid[1])
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_fluid[1])
                .inputFluids("gtceu:rocket_fuel_cn3h7o3 6000")
                .outputFluids(space_fluid[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.drilling_module(space_drone + "5_space_fluid_" + space_fluid[1])
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_fluid[1])
                .inputFluids("gtceu:rocket_fuel_cn3h7o3 5000")
                .outputFluids(space_fluid[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.drilling_module(space_drone + "6_space_fluid_" + space_fluid[1])
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_fluid[1])
                .inputFluids("gtceu:rocket_fuel_h8n4c2o4 4000")
                .outputFluids(space_fluid[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.drilling_module(space_drone + "7_space_fluid_" + space_fluid[1])
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_fluid[1])
                .inputFluids("ad_astra:cryo_fuel 2000")
                .outputFluids(space_fluid[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))

            gtr.drilling_module(space_drone + "8_space_fluid_" + space_fluid[1])
                .notConsumable("16x kubejs:space_drone_mk" + space_drone)
                .circuit(space_fluid[1])
                .inputFluids("gtceu:stellar_energy_rocket_fuel 1000")
                .outputFluids(space_fluid[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(1200 / (2 ** space_drone))
        })
    })

    const space_fluid5s = [
        ["gtceu:white_dwarf_mtter 100000", 29],
        ["gtceu:black_dwarf_mtter 100000", 30]]
    space_drones.slice(5).forEach((space_drone) => {
        space_fluid5s.forEach((space_fluid) => {
            gtr.drilling_module(space_drone + "1_space_fluid_" + space_fluid[1])
                .notConsumable("64x kubejs:space_drone_mk" + space_drone)
                .circuit(space_fluid[1])
                .inputFluids("gtceu:rocket_fuel 100000")
                .outputFluids(space_fluid[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(48000 / (2 ** space_drone))

            gtr.drilling_module(space_drone + "2_space_fluid_" + space_fluid[1])
                .notConsumable("64x kubejs:space_drone_mk" + space_drone)
                .circuit(space_fluid[1])
                .inputFluids("gtceu:rocket_fuel_rp_1 80000")
                .outputFluids(space_fluid[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(48000 / (2 ** space_drone))

            gtr.drilling_module(space_drone + "3_space_fluid_" + space_fluid[1])
                .notConsumable("64x kubejs:space_drone_mk" + space_drone)
                .circuit(space_fluid[1])
                .inputFluids("gtceu:dense_hydrazine_fuel_mixture 70000")
                .outputFluids(space_fluid[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(48000 / (2 ** space_drone))

            gtr.drilling_module(space_drone + "4_space_fluid_" + space_fluid[1])
                .notConsumable("64x kubejs:space_drone_mk" + space_drone)
                .circuit(space_fluid[1])
                .inputFluids("gtceu:rocket_fuel_cn3h7o3 60000")
                .outputFluids(space_fluid[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(48000 / (2 ** space_drone))

            gtr.drilling_module(space_drone + "5_space_fluid_" + space_fluid[1])
                .notConsumable("64x kubejs:space_drone_mk" + space_drone)
                .circuit(space_fluid[1])
                .inputFluids("gtceu:rocket_fuel_cn3h7o3 50000")
                .outputFluids(space_fluid[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(48000 / (2 ** space_drone))

            gtr.drilling_module(space_drone + "6_space_fluid_" + space_fluid[1])
                .notConsumable("64x kubejs:space_drone_mk" + space_drone)
                .circuit(space_fluid[1])
                .inputFluids("gtceu:rocket_fuel_h8n4c2o4 40000")
                .outputFluids(space_fluid[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(48000 / (2 ** space_drone))

            gtr.drilling_module(space_drone + "7_space_fluid_" + space_fluid[1])
                .notConsumable("64x kubejs:space_drone_mk" + space_drone)
                .circuit(space_fluid[1])
                .inputFluids("ad_astra:cryo_fuel 20000")
                .outputFluids(space_fluid[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(48000 / (2 ** space_drone))

            gtr.drilling_module(space_drone + "8_space_fluid_" + space_fluid[1])
                .notConsumable("64x kubejs:space_drone_mk" + space_drone)
                .circuit(space_fluid[1])
                .inputFluids("gtceu:stellar_energy_rocket_fuel 10000")
                .outputFluids(space_fluid[0])
                .EUt(GTValues.VA[GTValues.ZPM] * (4 ** space_drone))
                .duration(48000 / (2 ** space_drone))
        })
    })

    event.shaped("gtceu:greenhouse", ["GGG", "CHC", "PUP"], {
        G: "gtceu:tempered_glass",
        C: "#gtceu:circuits/mv",
        H: "gtceu:mv_machine_hull",
        P: "gtceu:mv_electric_piston",
        U: "gtceu:mv_electric_pump",
    })

    const trees = [
        ["minecraft:oak_sapling", "minecraft:oak_log"],
        ["minecraft:spruce_sapling", "minecraft:spruce_log"],
        ["minecraft:birch_sapling", "minecraft:birch_log"],
        ["minecraft:jungle_sapling", "minecraft:jungle_log"],
        ["minecraft:acacia_sapling", "minecraft:acacia_log"],
        ["minecraft:dark_oak_sapling", "minecraft:dark_oak_log"],
        ["minecraft:mangrove_propagule", "minecraft:mangrove_log"],
        ["minecraft:cherry_sapling", "minecraft:cherry_log"],
    ]
    const plants = [
        ["minecraft:pumpkin_seeds", "minecraft:pumpkin", 6],
        ["minecraft:beetroot_seeds", "minecraft:beetroot", 16],
        ["minecraft:sweet_berries", "minecraft:sweet_berries", 16],
        ["minecraft:glow_berries", "minecraft:glow_berries", 8],
        ["minecraft:wheat_seeds", "minecraft:wheat", 16],
        ["minecraft:melon_seeds", "minecraft:melon", 6],
        ["minecraft:carrot", "minecraft:carrot", 12],
        ["minecraft:sugar_cane", "minecraft:sugar_cane", 12],
        ["minecraft:kelp", "minecraft:kelp", 12],
        ["minecraft:cactus", "minecraft:cactus", 12],
        ["minecraft:potato", "minecraft:potato", 12],
        ["minecraft:cocoa_beans", "minecraft:cocoa_beans", 12],
        ["minecraft:brown_mushroom", "minecraft:brown_mushroom", 12],
        ["minecraft:red_mushroom", "minecraft:red_mushroom", 12],
        ["minecraft:nether_wart", "minecraft:nether_wart", 12],
        ["minecraft:bamboo", "minecraft:bamboo", 16],
        ["minecraft:vine", "minecraft:vine", 16],
        ["minecraft:sea_pickle", "minecraft:sea_pickle", 16],
    ]

    trees.forEach((woodType) => {
        gtr.greenhouse(woodType[0])
            .notConsumable(woodType[0])
            .inputFluids("water 1000")
            .itemOutputs(`64x ${woodType[1]}`, `6x ${woodType[0]}`)
            .duration(600)
            .EUt(30)
            .circuit(1)

        gtr.greenhouse(`${woodType[0]}_fertiliser`)
            .notConsumable(woodType[0])
            .itemInputs("4x gtceu:fertilizer")
            .inputFluids("water 1000")
            .itemOutputs(
                `64x ${woodType[1]}`,
                `64x ${woodType[1]}`,
                `12x ${woodType[0]}`
            )
            .duration(200)
            .EUt(60)
            .circuit(2)
    })

    plants.forEach((seedType) => {
        gtr.greenhouse(seedType[0])
            .notConsumable(seedType[0])
            .inputFluids("water 1000")
            .itemOutputs(`${seedType[2]}x ${seedType[1]}`)
            .duration(600)
            .EUt(30)
            .circuit(1)
        gtr.greenhouse(seedType[0] + "_fertilizer")
            .notConsumable(seedType[0])
            .itemInputs("4x gtceu:fertilizer")
            .inputFluids("water 1000")
            .itemOutputs(`${2 * seedType[2]}x ${seedType[1]}`)
            .duration(200)
            .EUt(60)
            .circuit(2)
    })
    gtr.greenhouse("rubber_wood")
        .notConsumable("gtceu:rubber_sapling")
        .inputFluids("water 1000")
        .itemOutputs(
            "16x gtceu:rubber_log",
            "3x gtceu:rubber_sapling",
            "4x gtceu:sticky_resin"
        )
        .duration(600)
        .EUt(30)
        .circuit(1)

    gtr.greenhouse("rubber_wood_fertiliser")
        .notConsumable("gtceu:rubber_sapling")
        .itemInputs("4x gtceu:fertilizer")
        .inputFluids("water 1000")
        .itemOutputs(
            "32x gtceu:rubber_log",
            "6x gtceu:rubber_sapling",
            "8x gtceu:sticky_resin"
        )
        .duration(200)
        .EUt(60)
        .circuit(2)

    gtr.greenhouse("barnarda_log")
        .notConsumable("64x kubejs:barnarda_leaves")
        .itemInputs("4x gtceu:fertilizer")
        .inputFluids("gtceu:unknowwater 1000")
        .itemOutputs("16x kubejs:barnarda_log")
        .duration(600)
        .EUt(30)
        .circuit(1)

    gtr.greenhouse("barnarda_log_fertiliser")
        .notConsumable("64x kubejs:barnarda_leaves")
        .itemInputs("16x gtceu:fertilizer")
        .inputFluids("gtceu:unknowwater 1000")
        .itemOutputs("32x kubejs:barnarda_log")
        .duration(200)
        .EUt(60)
        .circuit(2)

    gtr.chemical_bath("minecraft:sculk_vein")
        .itemInputs("minecraft:vine")
        .inputFluids("gtceu:echo_shard 10")
        .itemOutputs("minecraft:sculk_vein")
        .EUt(120)
        .duration(200)

    gtr.incubator("minecraft:chorus_fruit")
        .notConsumable("64x minecraft:chorus_flower")
        .itemOutputs("64x minecraft:chorus_fruit")
        .inputFluids("gtceu:unknowwater 1000", "gtceu:ender_pearl 100")
        .EUt(120)
        .duration(1200)

    gtr.incubator("gtceu:echo")
        .notConsumable("64x minecraft:sculk_shrieker")
        .notConsumable("64x minecraft:sculk_sensor")
        .itemInputs("64x minecraft:dirt", "64x minecraft:sculk_vein")
        .itemOutputs("64x minecraft:sculk")
        .inputFluids("gtceu:unknowwater 1000", "gtceu:xpjuice 1000")
        .outputFluids("gtceu:echo_shard 10000")
        .EUt(1920)
        .duration(2400)

    gtr.canner("minecraft:sculk")
        .itemInputs("minecraft:dirt", "minecraft:sculk_vein")
        .inputFluids("gtceu:xpjuice 10")
        .itemOutputs("minecraft:sculk")
        .EUt(480)
        .duration(600)

    gtr.dimensionally_transcendent_plasma_forge("kubejs:cosmic_neutron_plasma_cell")
        .notConsumable("avaritia:infinity_catalyst")
        .itemInputs("5x kubejs:extremely_durable_plasma_cell")
        .inputFluids("gtceu:uu_matter 1000000", "gtceu:dense_neutron_plasma 1000")
        .itemOutputs("5x kubejs:cosmic_neutron_plasma_cell")
        .outputFluids("gtceu:dimensionallytranscendentresidue 100")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(800)
        .blastFurnaceTemp(28000)

    gtr.dimensionally_transcendent_plasma_forge("gtceu:crystalmatrix_plasma")
        .notConsumable("avaritia:infinity_catalyst")
        .itemInputs("avaritia:crystal_matrix")
        .inputFluids("gtceu:uu_matter 1000000", "gtceu:free_proton_gas 20000")
        .outputFluids("gtceu:crystalmatrix_plasma 10000", "gtceu:dimensionallytranscendentresidue 100")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(800)
        .blastFurnaceTemp(28000)

    gtr.dimensionally_transcendent_plasma_forge("kubejs:infinity")
        .notConsumable("kubejs:spacetime_catalyst")
        .inputFluids("gtceu:crystalmatrix_plasma 10000", "gtceu:cosmicneutronium 5000")
        .outputFluids("gtceu:infinity 1000", "gtceu:dimensionallytranscendentresidue 100")
        .EUt(4 * GTValues.VA[GTValues.MAX])
        .duration(1600)
        .blastFurnaceTemp(32000)

    gtr.stellar_forge("gtceu:eternity_dust")
        .itemInputs("4x kubejs:quantum_chromodynamic_charge", "avaritia:eternal_singularity")
        .inputFluids("gtceu:primordialmatter 1000", "gtceu:dimensionallytranscendentresidue 1000")
        .itemOutputs("gtceu:eternity_dust")
        .outputFluids("gtceu:temporalfluid 1000")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(800)
        .addData("SCTier", 3)

    gtr.stellar_forge("gtceu:temporalfluid")
        .itemInputs("4x kubejs:quantum_chromodynamic_charge", "kubejs:hypercube")
        .inputFluids("gtceu:spacetime 1000", "gtceu:dimensionallytranscendentresidue 100")
        .outputFluids("gtceu:temporalfluid 500", "gtceu:spatialfluid 500")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(800)
        .addData("SCTier", 3)

    gtr.dimensionally_transcendent_plasma_forge("gtceu:dimensionallytranscendentresidue")
        .inputFluids("gtceu:dimensionallytranscendentcrudecatalyst 100", "gtceu:raw_star_matter_plasma 100")
        .outputFluids("gtceu:dimensionallytranscendentresidue 100")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(400)
        .blastFurnaceTemp(36000)

    gtr.dimensionally_transcendent_plasma_forge("gtceu:spacetime_ingot")
        .notConsumable("64x kubejs:ingot_field_shape")
        .notConsumable("64x gtlcore:spacetimebendingcore")
        .inputFluids("gtceu:spacetime 1000", "gtceu:raw_star_matter_plasma 1000")
        .outputFluids("gtceu:dimensionallytranscendentresidue 100")
        .itemOutputs("8x gtceu:spacetime_ingot")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(6400)
        .blastFurnaceTemp(62000)

    gtr.dimensionally_transcendent_plasma_forge("gtceu:spacetime")
        .notConsumable("kubejs:spacetime_catalyst")
        .inputFluids("gtceu:infinity 100", "gtceu:hypogen 100")
        .outputFluids("gtceu:spacetime 200", "gtceu:dimensionallytranscendentresidue 100")
        .EUt(4 * GTValues.VA[GTValues.MAX])
        .duration(1600)
        .blastFurnaceTemp(36000)

    gtr.dimensionally_transcendent_plasma_forge("gtceu:magnetohydrodynamicallyconstrainedstarmatter")
        .notConsumable("kubejs:eternity_catalyst")
        .itemInputs("gtceu:eternity_nanoswarm")
        .inputFluids("gtceu:raw_star_matter_plasma 400000", "gtceu:exciteddtsc 100000")
        .outputFluids("gtceu:magnetohydrodynamicallyconstrainedstarmatter 400000", "gtceu:dimensionallytranscendentresidue 100")
        .EUt(1024 * GTValues.VA[GTValues.MAX])
        .duration(25600)
        .blastFurnaceTemp(81000)

    gtr.dimensionally_transcendent_plasma_forge("gtceu:dense_neutron_plasma")
        .notConsumable("avaritia:infinity_catalyst")
        .itemInputs("kubejs:neutron_plasma_containment_cell")
        .inputFluids("gtceu:heavy_quark_degenerate_matter_plasma 10000", "gtceu:periodicium 1000")
        .outputFluids("gtceu:dense_neutron_plasma 10000", "gtceu:dimensionallytranscendentresidue 100")
        .itemOutputs("kubejs:plasma_containment_cell")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(800)
        .blastFurnaceTemp(26000)

    gtr.dimensionally_transcendent_plasma_forge("gtceu:eternity")
        .notConsumable("kubejs:eternity_catalyst")
        .itemInputs("avaritia:eternal_singularity")
        .inputFluids("gtceu:primordialmatter 1000", "gtceu:raw_star_matter_plasma 9000")
        .outputFluids("gtceu:eternity 10000", "gtceu:dimensionallytranscendentresidue 100")
        .EUt(16 * GTValues.VA[GTValues.MAX])
        .duration(4800)
        .blastFurnaceTemp(56000)

    gtr.dimensionally_transcendent_plasma_forge("gtceu:rhugnor")
        .notConsumable("avaritia:infinity_catalyst")
        .itemInputs("64x gtceu:energy_crystal")
        .inputFluids("gtceu:infinity 10000", "gtceu:quantum 10000")
        .outputFluids("gtceu:rhugnor 10000", "gtceu:dimensionallytranscendentresidue 100")
        .EUt(4 * GTValues.VA[GTValues.MAX])
        .duration(3600)
        .blastFurnaceTemp(36000)

    gtr.dimensionally_transcendent_plasma_forge("gtceu:hypogen")
        .notConsumable("avaritia:infinity_catalyst")
        .itemInputs("gtceu:quantumchromodynamically_confined_matter_block")
        .inputFluids("gtceu:rhugnor 10000", "gtceu:dragon_blood 10000")
        .outputFluids("gtceu:hypogen 10000", "gtceu:dimensionallytranscendentresidue 100")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(1200)
        .blastFurnaceTemp(26000)

    gtr.macerator("gtceu:spacetime_dust")
        .itemInputs("gtceu:spacetime_ingot")
        .itemOutputs("gtceu:spacetime_dust")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(400)

    gtr.compressor("gtceu:spacetime_block")
        .itemInputs("9x gtceu:spacetime_ingot")
        .itemOutputs("gtceu:spacetime_block")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(3000)

    gtr.qft("gtceu:spacetime_single_wire")
        .notConsumable("gtceu:spacetime_nanoswarm")
        .notConsumable("gtceu:transcendentmetal_nanoswarm")
        .itemInputs("gtceu:infinity_single_wire")
        .inputFluids("gtceu:spacetime 100", "gtceu:rhugnor 100")
        .itemOutputs("gtceu:spacetime_single_wire")
        .EUt(16 * GTValues.VA[GTValues.MAX])
        .duration(400)

    gtr.qft("gtceu:spacetime_double_wire")
        .notConsumable("4x gtceu:spacetime_nanoswarm")
        .notConsumable("4x gtceu:transcendentmetal_nanoswarm")
        .itemInputs("2x gtceu:spacetime_single_wire")
        .inputFluids("gtceu:rhugnor 200")
        .itemOutputs("gtceu:spacetime_double_wire")
        .EUt(16 * GTValues.VA[GTValues.MAX])
        .duration(800)

    gtr.qft("gtceu:spacetime_quadruple_wire")
        .notConsumable("8x gtceu:spacetime_nanoswarm")
        .notConsumable("8x gtceu:transcendentmetal_nanoswarm")
        .itemInputs("2x gtceu:spacetime_double_wire")
        .inputFluids("gtceu:rhugnor 400")
        .itemOutputs("gtceu:spacetime_quadruple_wire")
        .EUt(16 * GTValues.VA[GTValues.MAX])
        .duration(1600)

    gtr.qft("gtceu:spacetime_octal_wire")
        .notConsumable("16x gtceu:spacetime_nanoswarm")
        .notConsumable("16x gtceu:transcendentmetal_nanoswarm")
        .itemInputs("2x gtceu:spacetime_quadruple_wire")
        .inputFluids("gtceu:rhugnor 800")
        .itemOutputs("gtceu:spacetime_octal_wire")
        .EUt(16 * GTValues.VA[GTValues.MAX])
        .duration(3200)

    gtr.qft("gtceu:spacetime_hex_wire")
        .notConsumable("32x gtceu:spacetime_nanoswarm")
        .notConsumable("32x gtceu:transcendentmetal_nanoswarm")
        .itemInputs("2x gtceu:spacetime_octal_wire")
        .inputFluids("gtceu:rhugnor 1600")
        .itemOutputs("gtceu:spacetime_hex_wire")
        .EUt(16 * GTValues.VA[GTValues.MAX])
        .duration(6400)

    const mcsms = [["ingot", 144], ["dust", 144], ["nugget", 16], ["rod", 72], ["plate", 144], ["foil", 36], ["block", 1296], ["frame", 288]]
    mcsms.forEach((mcsm) => {
        gtr.sps_crafting("gtceu:magnetohydrodynamicallyconstrainedstarmatter" + mcsm[0])
            .itemInputs("gtceu:eternity_" + mcsm[0], "kubejs:solar_light_splitter")
            .inputFluids("gtceu:mana 10000", "gtceu:magnetohydrodynamicallyconstrainedstarmatter " + mcsm[1], "gtceu:dimensionallytranscendentresidue 1000")
            .itemOutputs("gtceu:magnetohydrodynamicallyconstrainedstarmatter_" + mcsm[0])
            .EUt(4 * GTValues.VA[GTValues.MAX])
            .duration(200)
    })

    gtr.sps_crafting("gtceu:double_magnetohydrodynamicallyconstrainedstarmatter_plate")
        .itemInputs("gtceu:double_eternity_plate", "kubejs:solar_light_splitter")
        .inputFluids("gtceu:mana 10000", "gtceu:magnetohydrodynamicallyconstrainedstarmatter 288", "gtceu:dimensionallytranscendentresidue 1000")
        .itemOutputs("gtceu:double_magnetohydrodynamicallyconstrainedstarmatter_plate")
        .EUt(4 * GTValues.VA[GTValues.MAX])
        .duration(200)

    gtr.sps_crafting("gtceu:tiny_magnetohydrodynamicallyconstrainedstarmatter_dust")
        .itemInputs("gtceu:tiny_eternity_dust", "kubejs:solar_light_splitter")
        .inputFluids("gtceu:mana 10000", "gtceu:magnetohydrodynamicallyconstrainedstarmatter 16", "gtceu:dimensionallytranscendentresidue 1000")
        .itemOutputs("gtceu:tiny_magnetohydrodynamicallyconstrainedstarmatter_dust")
        .EUt(4 * GTValues.VA[GTValues.MAX])
        .duration(200)

    gtr.sps_crafting("gtceu:small_magnetohydrodynamicallyconstrainedstarmatter_dust")
        .itemInputs("gtceu:small_eternity_dust", "kubejs:solar_light_splitter")
        .inputFluids("gtceu:mana 10000", "gtceu:magnetohydrodynamicallyconstrainedstarmatter 36", "gtceu:dimensionallytranscendentresidue 1000")
        .itemOutputs("gtceu:small_magnetohydrodynamicallyconstrainedstarmatter_dust")
        .EUt(4 * GTValues.VA[GTValues.MAX])
        .duration(200)

    gtr.assembler("kubejs:solar_light_splitter")
        .itemInputs("gtceu:laminated_glass", "gtceu:ruby_lens", "gtceu:emerald_lens", "gtceu:sapphire_lens")
        .inputFluids("gtceu:glowstone 576")
        .itemOutputs("kubejs:solar_light_splitter")
        .EUt(480)
        .duration(200)

    gtr.assembler("gtceu:atomic_casing")
        .itemInputs("gtceu:naquadah_alloy_frame", "2x gtceu:abyssalalloy_plate", "4x gtceu:enriched_naquadah_plate")
        .itemOutputs("2x gtceu:atomic_casing")
        .circuit(6)
        .EUt(16)
        .duration(50)

    gtr.assembler("gtlcore:stellar_containment_casing")
        .itemInputs("gtceu:trinium_frame", "16x gtceu:trinium_screw", "gtceu:uv_field_generator", "gtceu:yttrium_barium_cuprate_quadruple_wire", "4x gtceu:naquadah_alloy_rod", "4x gtceu:double_highurabilityompoundteel_plate")
        .inputFluids("gtceu:neutronium 144")
        .itemOutputs("gtlcore:stellar_containment_casing")
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(140)

    gtr.assembler("kubejs:naquadria_charge")
        .itemInputs("gtceu:black_steel_frame", "4x gtceu:titanium_bolt", "gtceu:hmxexplosive_dust", "gtceu:naquadria_dust", "gtceu:uranium_plate", "gtceu:osmium_bolt", "gtceu:hexanitrohexaaxaisowurtzitane_dust", "gtceu:thorium_plate")
        .inputFluids("gtceu:glyceryl_trinitrate 1000")
        .itemOutputs("kubejs:naquadria_charge")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(100)

    gtr.mixer("gtceu:eglin_steel_dust")
        .itemInputs("4x gtceu:iron_dust", "1x gtceu:kanthal_dust", "5x gtceu:invar_dust", "1x gtceu:sulfur_dust", "1x gtceu:silicon_dust", "1x gtceu:carbon_dust")
        .itemOutputs("13x gtceu:eglin_steel_dust")
        .EUt(120)
        .duration(600)

    gtr.assembler("gtlcore:antifreeze_heatproof_machine_casing")
        .itemInputs("gtceu:inconel_792_frame", "2x gtceu:double_hsse_plate", "4x gtceu:double_rhodium_plated_palladium_plate")
        .itemOutputs("2x gtlcore:antifreeze_heatproof_machine_casing")
        .EUt(16)
        .duration(50)
        .circuit(6)

    gtr.assembler("gtlcore:pikyonium_machine_casing")
        .itemInputs("gtceu:hastelloy_x_frame", "6x gtceu:pikyonium_plate")
        .itemOutputs("2x gtlcore:pikyonium_machine_casing")
        .EUt(16)
        .duration(50)
        .circuit(6)

    gtr.assembler("gtlcore:oxidation_resistant_hastelloy_n_mechanical_casing")
        .itemInputs("gtceu:hastelloy_n_frame", "6x gtceu:hastelloy_n_plate")
        .itemOutputs("2x gtlcore:oxidation_resistant_hastelloy_n_mechanical_casing")
        .EUt(16)
        .duration(50)
        .circuit(6)

    gtr.decay_hastener("gtceu:meitnerium_dust")
        .inputFluids("gtceu:hassium 144")
        .itemOutputs("gtceu:meitnerium_dust")
        .EUt(480)
        .duration(8000)

    const particle_collider = [["gtceu:plutonium", "gtceu:curium"],
    ["gtceu:thorium", "gtceu:uranium"],
    ["gtceu:uranium", "gtceu:plutonium"],
    ["gtceu:protactinium", "gtceu:neptunium"],
    ["gtceu:americium", "gtceu:berkelium"],
    ["gtceu:curium", "gtceu:einsteinium"],
    ["gtceu:berkelium", "gtceu:californium"],
    ["gtceu:einsteinium", "gtceu:mendelevium"],
    ["gtceu:fermium", "gtceu:nobelium"],
    ["gtceu:mendelevium", "gtceu:lawrencium"],
    ["gtceu:californium", "gtceu:fermium"],
    ["gtceu:bismuth", "gtceu:astatine"],
    ["gtceu:meitnerium", "gtceu:roentgenium"],
    ["gtceu:darmstadtium", "gtceu:copernicium"],
    ["gtceu:roentgenium", "gtceu:nihonium"],
    ["gtceu:dubnium", "gtceu:bohrium"]]

    particle_collider.forEach((particle) => {
        gtr.super_particle_collider(particle[1] + "a")
            .inputFluids(particle[0] + " 4096", "gtceu:helium_plasma 4096")
            .outputFluids(particle[1] + " 4000")
            .EUt(GTValues.VA[GTValues.UV])
            .duration(200)
    })

    gtr.stellar_forge("kubejs:neutron_plasma_containment_cell")
        .inputFluids("gtceu:neutronium 1000", "gtceu:heavy_lepton_mixture 1000")
        .itemInputs("kubejs:naquadria_charge", "kubejs:plasma_containment_cell")
        .itemOutputs("kubejs:neutron_plasma_containment_cell")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(200)
        .addData("SCTier", 1)

    gtr.stellar_forge("gtceu:free_proton_gas")
        .itemInputs("kubejs:naquadria_charge", "kubejs:contained_high_density_protonic_matter")
        .outputFluids("gtceu:free_proton_gas 10000")
        .itemOutputs("kubejs:time_dilation_containment_unit")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(200)
        .addData("SCTier", 1)

    gtr.stellar_forge("gtceu:enderium_plasma")
        .inputFluids("gtceu:ender_eye 2304", "gtceu:lead 2304", "gtceu:bismuth 2304", "gtceu:platinum 1152", "gtceu:liquid_ender_air 100000")
        .itemInputs("kubejs:naquadria_charge", "kubejs:warped_ender_pearl")
        .outputFluids("gtceu:enderium_plasma 2304")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(200)
        .addData("SCTier", 1)

    gtr.stellar_forge("gtceu:adamantium_plasma")
        .inputFluids("gtceu:orichalcum 576", "gtceu:tin 1024", "gtceu:antimony 864", "gtceu:iron 1152", "gtceu:mercury 1000")
        .itemInputs("kubejs:naquadria_charge", "24x gtceu:bloodstone_dust")
        .outputFluids("gtceu:adamantium_plasma 2304")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(200)
        .addData("SCTier", 1)

    gtr.stellar_forge("gtceu:degenerate_rhenium_plasma")
        .itemInputs("kubejs:naquadria_charge", "5x gtceu:double_rhenium_plate")
        .outputFluids("gtceu:degenerate_rhenium_plasma 10000")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(200)
        .addData("SCTier", 1)

    gtr.stellar_forge("gtceu:infuscolium_plasma")
        .inputFluids("gtceu:adamantine 2304", "gtceu:mana 10000")
        .itemInputs("kubejs:naquadria_charge", "16x minecraft:end_crystal", "16x minecraft:popped_chorus_fruit")
        .outputFluids("gtceu:infuscolium_plasma 2304")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(200)
        .addData("SCTier", 1)

    gtr.stellar_forge("gtceu:legendarium_plasma")
        .inputFluids("gtceu:naquadriatictaranium 576", "gtceu:trinium 288", "gtceu:duranium 288", "gtceu:tritanium 288", "gtceu:orichalcum 288", "gtceu:mithril 288", "gtceu:adamantium 288", "gtceu:adamantine 288", "gtceu:vibranium 288")
        .itemInputs("kubejs:leptonic_charge", "kubejs:neutron_plasma_containment_cell")
        .outputFluids("gtceu:legendarium_plasma 2304")
        .itemOutputs("kubejs:plasma_containment_cell")
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(200)
        .addData("SCTier", 2)

    gtr.stellar_forge("gtceu:quark_gluon_plasma")
        .itemInputs("kubejs:leptonic_charge", "10x gtceu:degenerate_rhenium_dust")
        .outputFluids("gtceu:quark_gluon_plasma 10000")
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(200)
        .addData("SCTier", 2)

    gtr.stellar_forge("gtceu:heavy_quark_degenerate_matter_plasma")
        .inputFluids("gtceu:heavy_quark_enriched_mixture 1152", "gtceu:flerovium 144", "gtceu:oganesson 144", "gtceu:hassium 144", "gtceu:deuterium 1000")
        .itemInputs("kubejs:leptonic_charge")
        .outputFluids("gtceu:heavy_quark_degenerate_matter_plasma 1152")
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(200)
        .addData("SCTier", 2)

    gtr.stellar_forge("kubejs:contained_high_density_protonic_matter")
        .itemInputs("kubejs:leptonic_charge", "kubejs:time_dilation_containment_unit", "kubejs:charged_triplet_neutronium_sphere")
        .itemOutputs("kubejs:contained_high_density_protonic_matter")
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(200)
        .addData("SCTier", 2)

    gtr.stellar_forge("gtceu:crystalmatrix_plasma")
        .itemInputs("kubejs:leptonic_charge", "avaritia:crystal_matrix", "16x kubejs:corporeal_matter")
        .inputFluids("gtceu:free_proton_gas 20000")
        .outputFluids("gtceu:crystalmatrix_plasma 1000")
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(200)
        .addData("SCTier", 2)

    gtr.stellar_forge("gtceu:starmetal_plasma")
        .itemInputs("kubejs:leptonic_charge", "10x kubejs:resonating_gem")
        .inputFluids("gtceu:free_proton_gas 1000", "gtceu:free_electron_gas 1000")
        .outputFluids("gtceu:starmetal_plasma 1000")
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(200)
        .addData("SCTier", 2)

    gtr.stellar_forge("gtceu:high_energy_quark_gluon_plasma")
        .itemInputs("kubejs:quantum_chromodynamic_charge", "10x gtceu:double_heavy_quark_degenerate_matter_plate")
        .outputFluids("gtceu:high_energy_quark_gluon_plasma 2000")
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(200)
        .addData("SCTier", 2)

    gtr.stellar_forge("gtceu:quantumchromodynamically_confined_matter_plasma")
        .itemInputs("kubejs:quantum_chromodynamic_charge", "20x kubejs:quantumchromodynamic_protective_plating")
        .outputFluids("gtceu:quantumchromodynamically_confined_matter_plasma 2000")
        .EUt(GTValues.VA[GTValues.OpV])
        .duration(200)
        .addData("SCTier", 3)

    gtr.stellar_forge("gtceu:dense_neutron_plasma")
        .inputFluids("gtceu:periodicium 2736", "gtceu:gluons 6000", "gtceu:heavy_lepton_mixture 6000")
        .itemInputs("kubejs:quantum_chromodynamic_charge", "5x gtceu:neutronium_block", "5x gtceu:heavy_quark_degenerate_matter_block")
        .outputFluids("gtceu:dense_neutron_plasma 6000")
        .EUt(GTValues.VA[GTValues.OpV])
        .duration(200)
        .addData("SCTier", 3)

    gtr.stellar_forge("kubejs:extremely_durable_plasma_cell")
        .itemInputs("kubejs:quantum_chromodynamic_charge", "2x kubejs:dense_neutron_plasma_cell")
        .itemOutputs("kubejs:cosmic_neutron_plasma_cell", "kubejs:extremely_durable_plasma_cell")
        .EUt(GTValues.VA[GTValues.OpV])
        .duration(200)
        .addData("SCTier", 3)

    gtr.stellar_forge("avaritia:infinity_ingot")
        .inputFluids("gtceu:crystalmatrix 2000", "gtceu:cosmicneutronium 1000")
        .itemInputs("kubejs:quantum_chromodynamic_charge")
        .itemOutputs("gtceu:hot_infinity_ingot")
        .outputFluids("gtceu:infinity 10")
        .EUt(GTValues.VA[GTValues.OpV])
        .duration(200)
        .addData("SCTier", 3)

    gtr.stellar_forge("kubejs:contained_reissner_nordstrom_singularity")
        .itemInputs("kubejs:naquadria_charge", "64x kubejs:time_dilation_containment_unit", "64x kubejs:charged_triplet_neutronium_sphere")
        .itemOutputs("64x kubejs:contained_reissner_nordstrom_singularity")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(200)
        .addData("SCTier", 1)

    gtr.stellar_forge("kubejs:contained_kerr_newmann_singularity")
        .itemInputs("kubejs:leptonic_charge", "64x kubejs:contained_reissner_nordstrom_singularity")
        .itemOutputs("kubejs:contained_kerr_newmann_singularity", "63x kubejs:time_dilation_containment_unit")
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(200)
        .addData("SCTier", 2)

    gtr.stellar_forge("kubejs:contained_exotic_matter")
        .itemInputs("kubejs:leptonic_charge", "kubejs:contained_high_density_protonic_matter", "9x gtceu:tiny_degenerate_rhenium_dust")
        .itemOutputs("kubejs:contained_exotic_matter")
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(200)
        .addData("SCTier", 2)

    gtr.stellar_forge("kubejs:recursively_folded_negative_space")
        .itemInputs("kubejs:quantum_chromodynamic_charge", "2x kubejs:macrowormhole_generator", "2x kubejs:temporal_matter")
        .itemOutputs("kubejs:recursively_folded_negative_space")
        .EUt(GTValues.VA[GTValues.OpV])
        .duration(200)
        .addData("SCTier", 3)

    gtr.stellar_forge("kubejs:eigenfolded_kerr_manifold")
        .itemInputs("kubejs:quantum_chromodynamic_charge", "kubejs:stabilized_wormhole_generator", "kubejs:recursively_folded_negative_space")
        .itemOutputs("kubejs:eigenfolded_kerr_manifold")
        .EUt(GTValues.VA[GTValues.OpV])
        .duration(200)
        .addData("SCTier", 3)

    gtr.stellar_forge("kubejs:ctc_computational_unit")
        .itemInputs("kubejs:quantum_chromodynamic_charge", "kubejs:eigenfolded_kerr_manifold", "kubejs:ctc_computational_unit_container")
        .itemOutputs("kubejs:ctc_computational_unit")
        .EUt(GTValues.VA[GTValues.OpV])
        .duration(200)
        .addData("SCTier", 3)

    const fluids = ["argon", "helium", "nickel", "iron", "nitrogen", "oxygen", "mithril", "orichalcum", "enderium", "adamantium", "infuscolium", "echoite", "vibranium", "taranium_rich_liquid_helium_4", "legendarium", "heavy_quark_degenerate_matter", "starmetal", "quantumchromodynamically_confined_matter", "astraltitanium", "celestialtungsten"]
    fluids.forEach((fluid) => {
        gtr.plasma_condenser("gtceu:" + fluid + "_condenser")
            .inputFluids("gtceu:" + fluid + "_plasma 1000", "gtceu:liquid_helium 100000")
            .outputFluids("gtceu:" + fluid + " 1000", "gtceu:helium 100000")
            .circuit(1)
            .EUt(GTValues.VA[GTValues.UHV])
            .duration(600)
    })

    gtr.plasma_condenser("minecraft:iron_ingot")
        .notConsumable("kubejs:ingot_field_shape")
        .inputFluids("gtceu:iron_plasma 144", "gtceu:liquid_helium 14400")
        .outputFluids("gtceu:helium 14400")
        .itemOutputs("minecraft:iron_ingot")
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(50)

    gtr.plasma_condenser("gtceu:nickel_ingot")
        .notConsumable("kubejs:ingot_field_shape")
        .inputFluids("gtceu:nickel_plasma 144", "gtceu:liquid_helium 14400")
        .outputFluids("gtceu:helium 14400")
        .itemOutputs("gtceu:nickel_ingot")
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(50)

    const ingots = ["mithril", "orichalcum", "enderium", "adamantium", "infuscolium", "echoite", "vibranium", "legendarium", "heavy_quark_degenerate_matter", "starmetal", "quantumchromodynamically_confined_matter"]
    ingots.forEach((ingot) => {
        gtr.plasma_condenser("gtceu:" + ingot + "_ingot_condenser")
            .notConsumable("kubejs:ingot_field_shape")
            .inputFluids("gtceu:" + ingot + "_plasma 144", "gtceu:liquid_helium 14400")
            .outputFluids("gtceu:helium 14400")
            .itemOutputs("gtceu:hot_" + ingot + "_ingot")
            .EUt(GTValues.VA[GTValues.UHV])
            .duration(60)
    })

    gtr.plasma_condenser("gtceu:degenerate_rhenium")
        .itemInputs("kubejs:rhenium_plasma_containment_cell")
        .inputFluids("gtceu:liquid_helium 100000")
        .outputFluids("gtceu:helium 100000", "gtceu:liquid_degenerate_rhenium 1000")
        .itemOutputs("kubejs:plasma_containment_cell")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(1200)

    gtr.plasma_condenser("gtceu:draconiumawakened")
        .itemInputs("kubejs:draconiumawakened_plasma_containment_cell")
        .inputFluids("gtceu:liquid_helium 100000")
        .outputFluids("gtceu:helium 100000", "gtceu:draconiumawakened 1000")
        .itemOutputs("kubejs:plasma_containment_cell")
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(1200)

    gtr.plasma_condenser("kubejs:neutronium_sphere")
        .notConsumable("kubejs:ball_field_shape")
        .inputFluids("gtceu:liquid_helium 32000")
        .outputFluids("gtceu:helium 32000")
        .itemInputs("kubejs:neutron_plasma_containment_cell")
        .itemOutputs("4x kubejs:neutronium_sphere", "kubejs:plasma_containment_cell")
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(800)

    gtr.plasma_condenser("kubejs:quantumchromodynamic_protective_plating")
        .notConsumable("gtceu:vibranium_nanoswarm")
        .notConsumable("gtceu:infuscolium_nanoswarm")
        .inputFluids("gtceu:liquid_helium 10000", "gtceu:high_energy_quark_gluon_plasma 100")
        .outputFluids("gtceu:helium 10000")
        .itemOutputs("kubejs:quantumchromodynamic_protective_plating")
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(300)

    gtr.plasma_condenser("gtceu:cosmicneutronium")
        .itemInputs("kubejs:cosmic_neutron_plasma_cell")
        .inputFluids("gtceu:liquid_helium 100000")
        .outputFluids("gtceu:helium 100000", "gtceu:cosmicneutronium 1000")
        .itemOutputs("kubejs:extremely_durable_plasma_cell")
        .EUt(GTValues.VA[GTValues.OpV])
        .duration(1200)

    gtr.plasma_condenser("gtceu:crystalmatrix")
        .itemInputs("kubejs:crystalmatrix_plasma_containment_cell")
        .inputFluids("gtceu:liquid_helium 100000")
        .outputFluids("gtceu:helium 100000", "gtceu:crystalmatrix 1000")
        .itemOutputs("kubejs:plasma_containment_cell")
        .EUt(GTValues.VA[GTValues.OpV])
        .duration(1000)

    gtr.plasma_condenser("gtceu:chaos")
        .itemInputs("kubejs:chaos_containment_unit")
        .inputFluids("gtceu:liquid_helium 100000")
        .outputFluids("gtceu:helium 100000", "gtceu:chaos 1000")
        .itemOutputs("kubejs:time_dilation_containment_unit")
        .EUt(GTValues.VA[GTValues.OpV])
        .duration(1600)

    gtr.canner("kubejs:crystalmatrix_plasma_containment_cell")
        .notConsumable("gtceu:enderium_nanoswarm")
        .inputFluids("gtceu:crystalmatrix_plasma 1000")
        .itemInputs("kubejs:plasma_containment_cell")
        .itemOutputs("kubejs:crystalmatrix_plasma_containment_cell")
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(20)
        .cleanroom(CleanroomType.CLEANROOM)

    gtr.extractor("gtceu:xpjuice")
        .itemInputs("minecraft:sculk")
        .outputFluids("gtceu:xpjuice 100")
        .EUt(120)
        .duration(20)

    const robots = [["uv", "1", "uhv", "1966080"], ["uhv", "2", "uev", "7864320"], ["uev", "3", "uiv", "31457280"], ["uiv", "4", "uxv", "125829120"], ["uxv", "5", "opv", "503316480"]]

    robots.forEach((robot) => {
        gtr.assembler("kubejs:precision_circuit_assembly_robot_mk" + robot[1])
            .itemInputs("2x gtceu:" + robot[0] + "_robot_arm", "gtceu:" + robot[0] + "_sensor", "4x #gtceu:circuits/" + robot[2], "gtceu:silver_nanoswarm", "2x gtceu:pikyonium_plate")
            .inputFluids("gtceu:soldering_alloy 1440")
            .itemOutputs("kubejs:precision_circuit_assembly_robot_mk" + robot[1])
            .EUt(robot[3])
            .duration(400)
    })

    event.shaped("kubejs:machine_casing_circuit_assembly_line", [
        "ABA",
        "CDC",
        "ABA"
    ], {
        A: "gtceu:pikyonium_plate",
        B: "gtceu:hssg_gear",
        C: "gtceu:luv_robot_arm",
        D: "gtceu:ruridit_frame"
    })

    event.shaped("kubejs:aggregatione_core", [
        "ABA",
        "BDB",
        "ABA"
    ], {
        A: "gtceu:attuned_tengam_ingot",
        B: "kubejs:infused_obsidian",
        D: "kubejs:magic_core"
    })

    event.shaped("kubejs:stabilizer_core", [
        "ABA",
        "BDB",
        "ABA"
    ], {
        A: "gtceu:double_infuscolium_plate",
        B: "gtceu:long_neutronium_rod",
        D: "kubejs:time_dilation_containment_unit"
    })

    event.shaped("kubejs:dragon_stabilizer_core", [
        "ABA",
        "BDB",
        "ABA"
    ], {
        A: "gtceu:double_draconium_plate",
        B: "gtceu:long_cosmicneutronium_rod",
        D: "kubejs:stabilizer_core"
    })

    gtr.alloy_smelter("kubejs:infused_obsidian")
        .itemInputs("kubejs:ender_obsidian", "kubejs:draconium_dust")
        .itemOutputs("kubejs:infused_obsidian")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(200)

    gtr.electromagnetic_separator("gtceu:purified_tengam_dust")
        .itemInputs("gtceu:clean_raw_tengam_dust")
        .itemOutputs("gtceu:purified_tengam_dust")
        .chancedOutput("gtceu:magnetic_neodymium_dust", 1000, 0)
        .chancedOutput("gtceu:magnetic_samarium_dust", 500, 0)
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(200)

    gtr.electromagnetic_separator("gtceu:raw_tengam_dust")
        .itemInputs("gtceu:pure_jasper_dust")
        .itemOutputs("gtceu:jasper_dust")
        .chancedOutput("gtceu:raw_tengam_dust", 1000, 0)
        .chancedOutput("gtceu:raw_tengam_dust", 500, 0)
        .EUt(24)
        .duration(200)

    gtr.polarizer("gtceu:attuned_tengam_dust")
        .itemInputs("gtceu:purified_tengam_dust")
        .itemOutputs("gtceu:attuned_tengam_dust")
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(400)

    gtr.polarizer("gtceu:small_attuned_tengam_dust")
        .itemInputs("gtceu:small_purified_tengam_dust")
        .itemOutputs("gtceu:small_attuned_tengam_dust")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(400)

    gtr.sps_crafting("gtceu:attuned_tengam_ingot")
        .notConsumable("kubejs:ingot_field_shape")
        .itemInputs("gtceu:attuned_tengam_dust")
        .inputFluids("gtceu:mana 1000")
        .itemOutputs("gtceu:attuned_tengam_ingot")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(400)

    gtr.ore_washer("gtceu:clean_raw_tengam_dust")
        .itemInputs("gtceu:raw_tengam_dust")
        .inputFluids("gtceu:distilled_water 1000")
        .itemOutputs("gtceu:clean_raw_tengam_dust")
        .EUt(480)
        .duration(800)

    gtr.chemical_reactor("gtceu:attuned_tengam_ingot")
        .itemInputs("gtceu:attuned_tengam_dust", "gtceu:magnetic_samarium_dust")
        .inputFluids("gtceu:infuscolium_plasma 144", "gtceu:nitrogen_plasma 1000")
        .itemOutputs("gtceu:attuned_tengam_ingot")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(1600)
})
