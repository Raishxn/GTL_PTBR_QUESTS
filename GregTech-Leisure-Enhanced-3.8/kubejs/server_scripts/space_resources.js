// priority: 95
// 太空无人机的矿石、流体采集与燃料选择。
// 由 gtceu.js 按既有阶段顺序执行，本文件只登记配方，不依赖文件名排序。
global.gtlPack.register("space_resources", event => {
    const gtr = event.recipes.gtceu;
    const batch = global.gtlPack.batch;

    const space_ores1 =
        [
            [
                ["280x gtceu:tetrahedrite_ore", "140x gtceu:copper_ore", "60x gtceu:bentonite_ore", "40x gtceu:magnetite_ore", "40x gtceu:olivine_ore",
                    "20x gtceu:glauconite_sand_ore"], "1"],
            [
                ["180x gtceu:almandine_ore", "120x gtceu:pyrope_ore", "60x gtceu:sapphire_ore", "60x gtceu:green_sapphire_ore",
                    "70x gtceu:stibnite_ore", "120x gtceu:uraninite_ore"], "2"],
            [
                ["90x gtceu:bastnasite_ore", "30x gtceu:molybdenum_ore", "60x gtceu:goethite_ore", "240x gtceu:yellow_limonite_ore",
                    "240x gtceu:hematite_ore", "120x gtceu:malachite_ore"], "3"],
            [
                ["120x gtceu:soapstone_ore", "80x gtceu:talc_ore", "80x gtceu:glauconite_sand_ore", "40x gtceu:pentlandite_ore",
                    "30x gtceu:neodymium_ore", "60x gtceu:monazite_ore"], "4"],
            [
                ["180x gtceu:redstone_ore", "120x gtceu:ruby_ore", "60x gtceu:grossular_ore", "40x gtceu:spessartine_ore", "40x gtceu:pyrolusite_ore",
                    "20x gtceu:tantalite_ore"], "5"],
            [
                ["250x gtceu:chalcopyrite_ore", "10x gtceu:zeolite_ore", "10x gtceu:cassiterite_ore", "50x gtceu:realgar_ore",
                    "60x gtceu:cinnabar_ore", "80x ae2:sky_stone_block"], "6"],
            [
                ["120x gtceu:saltpeter_ore", "80x gtceu:diatomite_ore", "80x gtceu:electrotine_ore", "40x gtceu:alunite_ore", "240x gtceu:coal_ore",
                    "40x gtceu:rubidium_ore"], "7"],
            [
                ["90x gtceu:beryllium_ore", "120x gtceu:emerald_ore", "40x gtceu:chalcopyrite_ore", "160x gtceu:iron_ore", "160x gtceu:pyrite_ore",
                    "160x gtceu:copper_ore"], "8"],
            [
                ["60x gtceu:grossular_ore", "40x gtceu:pyrolusite_ore", "20x gtceu:tantalite_ore", "240x gtceu:magnetite_ore",
                    "160x gtceu:vanadium_magnetite_ore", "80x gtceu:gold_ore"], "9"],
            [
                ["120x gtceu:lazurite_ore", "80x gtceu:sodalite_ore", "80x gtceu:lapis_ore", "40x gtceu:calcite_ore", "150x gtceu:wulfenite_ore",
                    "30x gtceu:calorite_ore"], "10"],
            [
                ["120x gtceu:galena_ore", "80x gtceu:silver_ore", "40x gtceu:lead_ore", "100x gtceu:molybdenite_ore", "50x gtceu:molybdenum_ore",
                    "50x gtceu:powellite_ore"], "11"],
            [
                ["90x gtceu:goethite_ore", "60x gtceu:yellow_limonite_ore", "60x gtceu:kyanite_ore", "40x gtceu:mica_ore", "40x gtceu:bauxite_ore",
                    "20x gtceu:pollucite_ore"], "12"],
            [
                ["120x gtceu:quartzite_ore", "80x gtceu:certus_quartz_ore", "140x gtceu:zircon_ore", "160x gtceu:cassiterite_ore",
                    "60x gtceu:hematite_ore", "30x gtceu:gold_ore"], "13"],
            [
                ["40x gtceu:barite_ore", "120x gtceu:red_garnet_ore", "80x gtceu:yellow_garnet_ore", "80x gtceu:amethyst_ore", "40x gtceu:opal_ore",
                    "20x gtceu:alien_algae_ore"], "14"],
            [
                ["210x gtceu:blue_topaz_ore", "140x gtceu:topaz_ore", "240x gtceu:basaltic_mineral_sand_ore", "160x gtceu:granitic_mineral_sand_ore",
                    "160x gtceu:fullers_earth_ore", "80x gtceu:gypsum_ore"], "15"],
            [
                ["150x gtceu:rock_salt_ore", "10x gtceu:salt_ore", "50x gtceu:lepidolite_ore", "50x gtceu:spodumene_ore", "140x gtceu:chalcocite_ore",
                    "70x gtceu:bornite_ore"], "16"],
            [
                ["180x gtceu:redstone_ore", "120x gtceu:ruby_ore", "60x gtceu:cinnabar_ore", "240x gtceu:nether_quartz_ore", "80x gtceu:quartzite_ore",
                    "50x minecraft:ancient_debris"], "17"],
            [
                ["120x gtceu:apatite_ore", "80x gtceu:tricalcium_phosphate_ore", "40x gtceu:pyrochlore_ore", "300x gtceu:sulfur_ore",
                    "200x gtceu:pyrite_ore", "100x gtceu:sphalerite_ore"], "18"],
            [
                ["180x gtceu:magnetite_ore", "120x gtceu:vanadium_magnetite_ore", "240x gtceu:cassiterite_sand_ore", "160x gtceu:garnet_sand_ore",
                    "160x gtceu:asbestos_ore", "80x gtceu:diatomite_ore"], "19"],
            [
                ["240x gtceu:oilsands_ore", "60x gtceu:gold_ore", "80x gtceu:infused_gold_ore", "160x gtceu:bauxite_ore", "80x gtceu:ilmenite_ore",
                    "80x gtceu:aluminium_ore"], "20"],
            [
                ["60x gtceu:bornite_ore", "40x gtceu:cooperite_ore", "120x gtceu:graphite_ore", "80x gtceu:diamond_ore", "40x gtceu:coal_ore",
                    "40x gtceu:titanium_ore"], "21"],
            [
                ["120x gtceu:garnierite_ore", "80x gtceu:nickel_ore", "80x gtceu:cobaltite_ore", "40x gtceu:pentlandite_ore", "40x gtceu:platinum_ore",
                    "20x gtceu:palladium_ore"], "22"],
            [
                ["120x gtceu:scheelite_ore", "80x gtceu:tungstate_ore", "40x gtceu:lithium_ore", "20x gtceu:tellurium_ore", "30x gtceu:tungsten_ore",
                    "180x gtceu:pitchblende_ore"], "23"],
            [
                ["180x gtceu:naquadah_ore", "120x gtceu:chromite_ore", "60x gtceu:plutonium_ore", "30x gtceu:enriched_naquadah_ore",
                    "90x gtceu:trinium_compound_ore", "30x gtceu:indium_ore"], "24"]]

    const space_drones = [1, 2, 3, 4, 5, 6]

    space_drones.forEach((space_drone) => {
        space_ores1.forEach((space_ore) => {
            batch(gtr, "miner_module", [["notConsumable", "16x kubejs:space_drone_mk" + space_drone], ["circuit", space_ore[1]], "inputFluids", ["itemOutputs", space_ore[0]],
                ["EUt", GTValues.VA[GTValues.ZPM] * (4 ** space_drone)], ["duration", 1200 / (2 ** space_drone)]], [
                ["space_ore_1_" + space_ore[1] + space_drone, ["gtceu:rocket_fuel 20000"]],
                ["space_ore_2_" + space_ore[1] + space_drone, ["gtceu:rocket_fuel_rp_1 16000"]],
                ["space_ore_3_" + space_ore[1] + space_drone, ["gtceu:dense_hydrazine_fuel_mixture 12000"]],
                ["space_ore_4_" + space_ore[1] + space_drone, ["gtceu:rocket_fuel_cn3h7o3 8000"]],
                ["space_ore_5_" + space_ore[1] + space_drone, ["gtceu:rocket_fuel_h8n4c2o4 6000"]],
                ["space_ore_6_" + space_ore[1] + space_drone, ["ad_astra:cryo_fuel 4000"]],
                ["space_ore_7_" + space_ore[1] + space_drone, ["gtceu:stellar_energy_rocket_fuel 2000"]]
            ]);
        })
    })

    const space_ores2 =
        [
            [
                ["20x gtceu:jasper_ore", "140x gtceu:red_garnet_ore", "60x gtceu:topaz_ore", "40x gtceu:emerald_ore", "40x gtceu:amethyst_ore",
                    "20x gtceu:celestine_ore"], "25"]]

    space_drones.slice(1).forEach((space_drone) => {
        space_ores2.forEach((space_ore) => {
            batch(gtr, "miner_module", [["notConsumable", "16x kubejs:space_drone_mk" + space_drone], ["circuit", space_ore[1]], "inputFluids", ["itemOutputs", space_ore[0]],
                ["EUt", GTValues.VA[GTValues.ZPM] * (4 ** space_drone)], ["duration", 1200 / (2 ** space_drone)]], [
                ["space_ore_1_" + space_ore[1] + space_drone, ["gtceu:rocket_fuel 20000"]],
                ["space_ore_2_" + space_ore[1] + space_drone, ["gtceu:rocket_fuel_rp_1 16000"]],
                ["space_ore_3_" + space_ore[1] + space_drone, ["gtceu:dense_hydrazine_fuel_mixture 12000"]],
                ["space_ore_4_" + space_ore[1] + space_drone, ["gtceu:rocket_fuel_cn3h7o3 8000"]],
                ["space_ore_5_" + space_ore[1] + space_drone, ["gtceu:rocket_fuel_h8n4c2o4 6000"]],
                ["space_ore_6_" + space_ore[1] + space_drone, ["ad_astra:cryo_fuel 4000"]],
                ["space_ore_7_" + space_ore[1] + space_drone, ["gtceu:stellar_energy_rocket_fuel 2000"]]
            ]);
        })
    })

    const space_ores3 =
        [
            [
                ["140x gtceu:iron_ore", "140x gtceu:tin_ore", "60x gtceu:nickel_ore", "60x gtceu:uruium_ore", "40x gtceu:force_ore",
                    "20x gtceu:cobalt_ore"], "26"],
            [
                ["120x gtceu:bloodstone_ore", "80x gtceu:redstone_ore", "120x gtceu:red_garnet_ore", "40x gtceu:gravel_ruby_ore",
                    "40x gtceu:almandine_ore", "40x gtceu:pyrope_ore"], "27"]]

    space_drones.slice(2).forEach((space_drone) => {
        space_ores3.forEach((space_ore) => {
            batch(gtr, "miner_module", [["notConsumable", "16x kubejs:space_drone_mk" + space_drone], ["circuit", space_ore[1]], "inputFluids", ["itemOutputs", space_ore[0]],
                ["EUt", GTValues.VA[GTValues.ZPM] * (4 ** space_drone)], ["duration", 1200 / (2 ** space_drone)]], [
                ["space_ore_1_" + space_ore[1] + space_drone, ["gtceu:rocket_fuel 20000"]],
                ["space_ore_2_" + space_ore[1] + space_drone, ["gtceu:rocket_fuel_rp_1 16000"]],
                ["space_ore_3_" + space_ore[1] + space_drone, ["gtceu:dense_hydrazine_fuel_mixture 12000"]],
                ["space_ore_4_" + space_ore[1] + space_drone, ["gtceu:rocket_fuel_cn3h7o3 8000"]],
                ["space_ore_5_" + space_ore[1] + space_drone, ["gtceu:rocket_fuel_h8n4c2o4 6000"]],
                ["space_ore_6_" + space_ore[1] + space_drone, ["ad_astra:cryo_fuel 4000"]],
                ["space_ore_7_" + space_ore[1] + space_drone, ["gtceu:stellar_energy_rocket_fuel 2000"]]
            ]);
        })
    })

    const space_ores4 =
        [
            [
                ["80x gtceu:naquadah_ore", "40x gtceu:adamantine_compounds_ore", "60x gtceu:rare_earth_metal_ore", "40x gtceu:monazite_ore",
                    "40x gtceu:bastnasite_ore", "20x gtceu:enriched_naquadah_ore"], "28"],
            [
                ["40x gtceu:earth_crystal_ore", "40x gtceu:ignis_crystal_ore", "80x gtceu:uraninite_ore", "40x gtceu:orichalcum_ore",
                    "60x gtceu:mithril_ore", "80x gtceu:salt_ore"], "29"]]

    space_drones.slice(3).forEach((space_drone) => {
        space_ores4.forEach((space_ore) => {
            batch(gtr, "miner_module", [["notConsumable", "16x kubejs:space_drone_mk" + space_drone], ["circuit", space_ore[1]], "inputFluids", ["itemOutputs", space_ore[0]],
                ["EUt", GTValues.VA[GTValues.ZPM] * (4 ** space_drone)], ["duration", 1200 / (2 ** space_drone)]], [
                ["space_ore_1_" + space_ore[1] + space_drone, ["gtceu:rocket_fuel 20000"]],
                ["space_ore_2_" + space_ore[1] + space_drone, ["gtceu:rocket_fuel_rp_1 16000"]],
                ["space_ore_3_" + space_ore[1] + space_drone, ["gtceu:dense_hydrazine_fuel_mixture 12000"]],
                ["space_ore_4_" + space_ore[1] + space_drone, ["gtceu:rocket_fuel_cn3h7o3 8000"]],
                ["space_ore_5_" + space_ore[1] + space_drone, ["gtceu:rocket_fuel_h8n4c2o4 6000"]],
                ["space_ore_6_" + space_ore[1] + space_drone, ["ad_astra:cryo_fuel 4000"]],
                ["space_ore_7_" + space_ore[1] + space_drone, ["gtceu:stellar_energy_rocket_fuel 2000"]]
            ]);
        })
    })

    const space_ores5 =
        [
            [
                ["80x gtceu:enderium_ore", "120x gtceu:sodalite_ore", "60x gtceu:celestine_ore", "80x gtceu:lapis_ore", "60x gtceu:bauxite_ore",
                    "40x gtceu:pitchblende_ore"], "30"],
            [
                ["40x gtceu:silver_ore", "60x gtceu:andesite_platinum_ore", "60x gtceu:tartarite_ore", "80x gtceu:vibranium_ore",
                    "120x gtceu:aluminium_ore", "120x gtceu:iron_ore"], "31"]]

    space_drones.slice(4).forEach((space_drone) => {
        space_ores5.forEach((space_ore) => {
            batch(gtr, "miner_module", [["notConsumable", "16x kubejs:space_drone_mk" + space_drone], ["circuit", space_ore[1]], "inputFluids", ["itemOutputs", space_ore[0]],
                ["EUt", GTValues.VA[GTValues.ZPM] * (4 ** space_drone)], ["duration", 1200 / (2 ** space_drone)]], [
                ["space_ore_1_" + space_ore[1] + space_drone, ["gtceu:rocket_fuel 20000"]],
                ["space_ore_2_" + space_ore[1] + space_drone, ["gtceu:rocket_fuel_rp_1 16000"]],
                ["space_ore_3_" + space_ore[1] + space_drone, ["gtceu:dense_hydrazine_fuel_mixture 12000"]],
                ["space_ore_4_" + space_ore[1] + space_drone, ["gtceu:rocket_fuel_cn3h7o3 8000"]],
                ["space_ore_5_" + space_ore[1] + space_drone, ["gtceu:rocket_fuel_h8n4c2o4 6000"]],
                ["space_ore_6_" + space_ore[1] + space_drone, ["ad_astra:cryo_fuel 4000"]],
                ["space_ore_7_" + space_ore[1] + space_drone, ["gtceu:stellar_energy_rocket_fuel 2000"]]
            ]);
        })
    })

    const space_ores6 =
        [
            [
                ["12x gtceu:lazurite_ore", "80x gtceu:sapphire_ore", "60x gtceu:starmetal_ore", "80x gtceu:green_sapphire_ore",
                    "120x gtceu:yellow_garnet_ore", "80x gtceu:pollucite_ore"], "32"]]

    space_drones.slice(5).forEach((space_drone) => {
        space_ores6.forEach((space_ore) => {
            batch(gtr, "miner_module", [["notConsumable", "16x kubejs:space_drone_mk" + space_drone], ["circuit", space_ore[1]], "inputFluids", ["itemOutputs", space_ore[0]],
                ["EUt", GTValues.VA[GTValues.ZPM] * (4 ** space_drone)], ["duration", 1200 / (2 ** space_drone)]], [
                ["space_ore_1_" + space_ore[1] + space_drone, ["gtceu:rocket_fuel 20000"]],
                ["space_ore_2_" + space_ore[1] + space_drone, ["gtceu:rocket_fuel_rp_1 16000"]],
                ["space_ore_3_" + space_ore[1] + space_drone, ["gtceu:dense_hydrazine_fuel_mixture 12000"]],
                ["space_ore_4_" + space_ore[1] + space_drone, ["gtceu:rocket_fuel_cn3h7o3 8000"]],
                ["space_ore_5_" + space_ore[1] + space_drone, ["gtceu:rocket_fuel_h8n4c2o4 6000"]],
                ["space_ore_6_" + space_ore[1] + space_drone, ["ad_astra:cryo_fuel 4000"]],
                ["space_ore_7_" + space_ore[1] + space_drone, ["gtceu:stellar_energy_rocket_fuel 2000"]]
            ]);
        })
    })

    const space_fluids = [["gtceu:hydrogen 1000000", 1], ["gtceu:helium 1000000", 2], ["gtceu:nitrogen 1000000", 3], ["gtceu:methane 1000000", 4],
        ["gtceu:sulfur_dioxide 1000000", 5], ["gtceu:carbon_dioxide 1000000", 6], ["gtceu:nitrogen_dioxide 1000000", 7], ["gtceu:ammonia 1000000", 8],
        ["gtceu:chlorine 1000000", 9], ["gtceu:fluorine 1000000", 10], ["gtceu:carbon_monoxide 1000000", 11], ["gtceu:oxygen 1000000", 12]]

    space_drones.forEach((space_drone) => {
        space_fluids.forEach((space_fluid) => {
            batch(gtr, "drilling_module", [["notConsumable", "16x kubejs:space_drone_mk" + space_drone], ["circuit", space_fluid[1]], "inputFluids",
                ["outputFluids", space_fluid[0]], ["EUt", GTValues.VA[GTValues.ZPM] * (4 ** space_drone)], ["duration", 1200 / (2 ** space_drone)]], [
                [space_drone + "1_space_fluid_" + space_fluid[1], ["gtceu:rocket_fuel 10000"]],
                [space_drone + "2_space_fluid_" + space_fluid[1], ["gtceu:rocket_fuel_rp_1 8000"]],
                [space_drone + "3_space_fluid_" + space_fluid[1], ["gtceu:dense_hydrazine_fuel_mixture 7000"]],
                [space_drone + "4_space_fluid_" + space_fluid[1], ["gtceu:rocket_fuel_cn3h7o3 5000"]],
                [space_drone + "5_space_fluid_" + space_fluid[1], ["gtceu:rocket_fuel_h8n4c2o4 4000"]],
                [space_drone + "6_space_fluid_" + space_fluid[1], ["ad_astra:cryo_fuel 2000"]],
                [space_drone + "7_space_fluid_" + space_fluid[1], ["gtceu:stellar_energy_rocket_fuel 1000"]]
            ]);
        })
    })
    const space_fluid1s = [["gtceu:unknowwater 10000", 13], ["gtceu:neon 100000", 14], ["gtceu:argon 100000", 15], ["gtceu:krypton 100000", 16], ["gtceu:xenon 100000", 17],
        ["gtceu:radon 100000", 18], ["gtceu:helium_3 100000", 19]]
    space_drones.slice(1).forEach((space_drone) => {
        space_fluid1s.forEach((space_fluid) => {
            batch(gtr, "drilling_module", [["notConsumable", "16x kubejs:space_drone_mk" + space_drone], ["circuit", space_fluid[1]], "inputFluids",
                ["outputFluids", space_fluid[0]], ["EUt", GTValues.VA[GTValues.ZPM] * (4 ** space_drone)], ["duration", 1200 / (2 ** space_drone)]], [
                [space_drone + "1_space_fluid_" + space_fluid[1], ["gtceu:rocket_fuel 10000"]],
                [space_drone + "2_space_fluid_" + space_fluid[1], ["gtceu:rocket_fuel_rp_1 8000"]],
                [space_drone + "3_space_fluid_" + space_fluid[1], ["gtceu:dense_hydrazine_fuel_mixture 7000"]],
                [space_drone + "4_space_fluid_" + space_fluid[1], ["gtceu:rocket_fuel_cn3h7o3 5000"]],
                [space_drone + "5_space_fluid_" + space_fluid[1], ["gtceu:rocket_fuel_h8n4c2o4 4000"]],
                [space_drone + "6_space_fluid_" + space_fluid[1], ["ad_astra:cryo_fuel 2000"]],
                [space_drone + "7_space_fluid_" + space_fluid[1], ["gtceu:stellar_energy_rocket_fuel 1000"]]
            ]);
        })
    })

    const space_fluid2s = [["gtceu:deuterium 100000", 20], ["gtceu:tritium 100000", 21], ["gtceu:heavy_fuel 100000", 22], ["gtceu:light_fuel 100000", 23],
        ["gtceu:naphtha 100000", 24], ["gtceu:refinery_gas 100000", 25], ["gtceu:coal_gas 100000", 26], ["gtceu:bromine 100000", 27],
        ["gtceu:barnarda_air 100000", 28]]
    space_drones.slice(2).forEach((space_drone) => {
        space_fluid2s.forEach((space_fluid) => {
            batch(gtr, "drilling_module", [["notConsumable", "16x kubejs:space_drone_mk" + space_drone], ["circuit", space_fluid[1]], "inputFluids",
                ["outputFluids", space_fluid[0]], ["EUt", GTValues.VA[GTValues.ZPM] * (4 ** space_drone)], ["duration", 1200 / (2 ** space_drone)]], [
                [space_drone + "1_space_fluid_" + space_fluid[1], ["gtceu:rocket_fuel 10000"]],
                [space_drone + "2_space_fluid_" + space_fluid[1], ["gtceu:rocket_fuel_rp_1 8000"]],
                [space_drone + "3_space_fluid_" + space_fluid[1], ["gtceu:dense_hydrazine_fuel_mixture 7000"]],
                [space_drone + "4_space_fluid_" + space_fluid[1], ["gtceu:rocket_fuel_cn3h7o3 6000"]],
                [space_drone + "5_space_fluid_" + space_fluid[1], ["gtceu:rocket_fuel_h8n4c2o4 4000"]],
                [space_drone + "6_space_fluid_" + space_fluid[1], ["ad_astra:cryo_fuel 2000"]],
                [space_drone + "7_space_fluid_" + space_fluid[1], ["gtceu:stellar_energy_rocket_fuel 1000"]]
            ]);
        })
    })

    const space_fluid5s = [["gtceu:white_dwarf_mtter 100000", 29], ["gtceu:black_dwarf_mtter 100000", 30]]
    space_drones.slice(5).forEach((space_drone) => {
        space_fluid5s.forEach((space_fluid) => {
            batch(gtr, "drilling_module", [["notConsumable", "64x kubejs:space_drone_mk" + space_drone], ["circuit", space_fluid[1]], "inputFluids",
                ["outputFluids", space_fluid[0]], ["EUt", GTValues.VA[GTValues.ZPM] * (4 ** space_drone)], ["duration", 48000 / (2 ** space_drone)]], [
                [space_drone + "1_space_fluid_" + space_fluid[1], ["gtceu:rocket_fuel 100000"]],
                [space_drone + "2_space_fluid_" + space_fluid[1], ["gtceu:rocket_fuel_rp_1 80000"]],
                [space_drone + "3_space_fluid_" + space_fluid[1], ["gtceu:dense_hydrazine_fuel_mixture 70000"]],
                [space_drone + "4_space_fluid_" + space_fluid[1], ["gtceu:rocket_fuel_cn3h7o3 60000"]],
                [space_drone + "5_space_fluid_" + space_fluid[1], ["gtceu:rocket_fuel_h8n4c2o4 40000"]],
                [space_drone + "6_space_fluid_" + space_fluid[1], ["ad_astra:cryo_fuel 20000"]],
                [space_drone + "7_space_fluid_" + space_fluid[1], ["gtceu:stellar_energy_rocket_fuel 10000"]]
            ]);
        })
    })

    event.shaped("gtceu:greenhouse", ["GGG", "CHC", "PUP"], {
        G: "gtceu:tempered_glass",
        C: "#gtceu:circuits/mv",
        H: "gtceu:mv_machine_hull",
        P: "gtceu:mv_electric_piston",
        U: "gtceu:mv_electric_pump",
    })
});
