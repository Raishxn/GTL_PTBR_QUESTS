// priority: 95
// 太空探针、无人机、探测配方和渔场等设备。
// 由 gtceu.js 按既有阶段顺序执行，本文件只登记配方，不依赖文件名排序。
global.gtlPack.register("space_equipment", event => {
    const gtr = event.recipes.gtceu;
    const batch = global.gtlPack.batch;

    batch(gtr, "assembler_module", ["itemInputs", "inputFluids", "itemOutputs", "EUt", "duration", "addData"], [
        ["kubejs:space_probe_mk1",
            ["gtceu:energy_module", "4x gtceu:data_module", "2x gtceu:uiv_emitter", "2x gtceu:uiv_sensor", "gtceu:uiv_field_generator",
                "4x gtceu:adamantium_plate"],
            ["gtceu:mutated_living_solder 1296", "gtceu:soldering_alloy 2880", "gtceu:lubricant 5760", "gtceu:neutronium 1296"],
            ["kubejs:space_probe_mk1"], [GTValues.VA[GTValues.UIV]], [400], ["SEPMTier", 3]],
        ["kubejs:space_probe_mk2",
            ["gtceu:energy_cluster", "16x gtceu:data_module", "2x gtceu:uxv_emitter", "2x gtceu:uxv_sensor", "gtceu:uxv_field_generator",
                "4x gtceu:vibranium_plate", "8x gtceu:celestialtungsten_plate"],
            ["gtceu:mutated_living_solder 1296", "gtceu:soldering_alloy 2880", "gtceu:lubricant 5760", "gtceu:neutronium 1296"],
            ["kubejs:space_probe_mk2"], [GTValues.VA[GTValues.UXV]], [400], ["SEPMTier", 4]],
        ["kubejs:space_probe_mk3",
            ["gtceu:max_battery", "64x gtceu:data_module", "2x gtceu:opv_emitter", "2x gtceu:opv_sensor", "gtceu:opv_field_generator",
                "gtceu:cosmicneutronium_nanoswarm", "4x gtceu:draconium_plate"],
            ["gtceu:super_mutated_living_solder 1296", "gtceu:mutated_living_solder 2880", "gtceu:lubricant 5760", "gtceu:cosmicneutronium 1296"],
            ["kubejs:space_probe_mk3"], [GTValues.VA[GTValues.OpV]], [400], ["SEPMTier", 5]],
        ["kubejs:space_drone_mk1",
            ["gtceu:titanium_drill_head", "4x gtceu:ev_vanadium_battery", "4x #gtceu:circuits/uv", "ae2:wireless_receiver", "gtceu:uv_electric_pump",
                "gtceu:uv_electric_piston", "2x gtceu:uv_electric_motor", "2x gtceu:uv_conveyor_module", "2x gtceu:uv_robot_arm", "gtceu:uv_sensor",
                "gtceu:uv_emitter", "4x gtceu:tritanium_quadruple_wire", "4x gtceu:power_thruster", "2x gtceu:steel_minecart_wheels",
                "4x gtceu:steel_spring", "8x gtceu:darmstadtium_plate"],
            ["gtceu:soldering_alloy 2880", "gtceu:manganese 2880", "gtceu:potin 2880", "gtceu:ultimet 2880"], ["kubejs:space_drone_mk1"],
            [GTValues.VA[GTValues.UV]], [600], ["SEPMTier", 1]],
        ["kubejs:space_drone_mk2",
            ["gtceu:ultimet_drill_head", "16x gtceu:ev_vanadium_battery", "4x #gtceu:circuits/uhv", "ae2:wireless_receiver", "gtceu:uhv_electric_pump",
                "gtceu:uhv_electric_piston", "2x gtceu:uhv_electric_motor", "2x gtceu:uhv_conveyor_module", "2x gtceu:uhv_robot_arm",
                "gtceu:uhv_sensor", "gtceu:uhv_emitter", "4x gtceu:abyssalalloy_quadruple_wire", "4x gtceu:power_thruster",
                "2x gtceu:steel_minecart_wheels", "4x gtceu:steel_spring", "8x gtceu:neutronium_plate"],
            ["gtceu:soldering_alloy 2880", "gtceu:steel 2880", "gtceu:electrum 2880", "gtceu:vanadium_steel 2880"], ["kubejs:space_drone_mk2"],
            [GTValues.VA[GTValues.UHV]], [600], ["SEPMTier", 1]],
        ["kubejs:space_drone_mk3",
            ["gtceu:hsse_drill_head", "4x gtceu:iv_vanadium_battery", "4x #gtceu:circuits/uev", "ae2:wireless_receiver", "gtceu:uev_electric_pump",
                "gtceu:uev_electric_piston", "2x gtceu:uev_electric_motor", "2x gtceu:uev_conveyor_module", "2x gtceu:uev_robot_arm",
                "gtceu:uev_sensor", "gtceu:uev_emitter", "4x gtceu:titansteel_quadruple_wire", "4x gtceu:power_thruster",
                "2x gtceu:steel_minecart_wheels", "4x gtceu:steel_spring", "8x gtceu:quantanium_plate"],
            ["gtceu:soldering_alloy 2880", "gtceu:yttrium 2880", "gtceu:blue_alloy 2880", "gtceu:rtm_alloy 2880"], ["kubejs:space_drone_mk3"],
            [GTValues.VA[GTValues.UEV]], [600], ["SEPMTier", 2]],
        ["kubejs:space_drone_mk4",
            ["gtceu:naquadah_alloy_drill_head", "16x gtceu:iv_vanadium_battery", "4x #gtceu:circuits/uiv", "ae2:wireless_receiver",
                "gtceu:uiv_electric_pump", "gtceu:uiv_electric_piston", "2x gtceu:uiv_electric_motor", "2x gtceu:uiv_conveyor_module",
                "2x gtceu:uiv_robot_arm", "gtceu:uiv_sensor", "gtceu:uiv_emitter", "4x gtceu:adamantine_quadruple_wire", "4x gtceu:power_thruster",
                "2x gtceu:steel_minecart_wheels", "4x gtceu:steel_spring", "8x gtceu:adamantium_plate"],
            ["gtceu:soldering_alloy 2880", "gtceu:bohrium 2880", "gtceu:tungsten_carbide 2880", "gtceu:rhodium_plated_palladium 2880e"],
            ["kubejs:space_drone_mk4"], [GTValues.VA[GTValues.UIV]], [600], ["SEPMTier", 3]],
        ["kubejs:space_drone_mk5",
            ["gtceu:duranium_drill_head", "4x gtceu:luv_vanadium_battery", "4x #gtceu:circuits/uxv", "ae2:wireless_receiver",
                "gtceu:uxv_electric_pump", "gtceu:uxv_electric_piston", "2x gtceu:uxv_electric_motor", "2x gtceu:uxv_conveyor_module",
                "2x gtceu:uxv_robot_arm", "gtceu:uxv_sensor", "gtceu:uxv_emitter", "4x gtceu:naquadriatictaranium_quadruple_wire",
                "4x gtceu:power_thruster", "2x gtceu:steel_minecart_wheels", "4x gtceu:steel_spring", "8x gtceu:vibranium_plate"],
            ["gtceu:soldering_alloy 2880", "gtceu:meitnerium 2880", "gtceu:black_bronze 2880", "gtceu:hssg 2880"], ["kubejs:space_drone_mk5"],
            [GTValues.VA[GTValues.UXV]], [600], ["SEPMTier", 4]],
        ["kubejs:space_drone_mk6",
            ["gtceu:neutronium_drill_head", "16x gtceu:luv_vanadium_battery", "4x #gtceu:circuits/opv", "ae2:wireless_receiver",
                "gtceu:opv_electric_pump", "gtceu:opv_electric_piston", "2x gtceu:opv_electric_motor", "2x gtceu:opv_conveyor_module",
                "2x gtceu:opv_robot_arm", "gtceu:opv_sensor", "gtceu:opv_emitter", "4x gtceu:starmetal_quadruple_wire", "4x gtceu:power_thruster",
                "2x gtceu:steel_minecart_wheels", "4x gtceu:steel_spring", "8x gtceu:draconium_plate"],
            ["gtceu:soldering_alloy 2880", "gtceu:livermorium 2880", "gtceu:sterling_silver 2880", "gtceu:titanium_tungsten_carbide 2880"],
            ["kubejs:space_drone_mk6"], [GTValues.VA[GTValues.OpV]], [600], ["SEPMTier", 5]]
    ]);

    function space_probe(material, grade, amount, circuit) {
        gtr.space_probe_surface_reception(material + grade)
            .notConsumable("kubejs:space_probe_mk" + grade).outputFluids(material + " " + amount).EUt(GTValues.VA[GTValues.UEV] * (4 ** grade))
            .duration(200).circuit(circuit).CWUt(64 * (2 ** circuit))
    }
    space_probe("gtceu:starlight", 2, 1000, 2)
    space_probe("gtceu:starlight", 3, 10000, 2)
    space_probe("gtceu:heavy_lepton_mixture", 1, 100, 1)
    space_probe("gtceu:heavy_lepton_mixture", 2, 1000, 1)
    space_probe("gtceu:heavy_lepton_mixture", 3, 10000, 1)
    space_probe("gtceu:cosmic_element", 3, 10000, 3)

    const fishing = [
        ["minecraft:cod", 51],
        ["minecraft:salmon", 21.3],
        ["minecraft:tropical_fish", 1.7],
        ["minecraft:pufferfish", 11.1],
        [Item.of("minecraft:bow", "{Damage:100}").weakNBT(), 0.8],
        ["minecraft:experience_bottle", 0.8],
        ["minecraft:name_tag", 0.8],
        ["minecraft:nautilus_shell", 0.8],
        ["minecraft:saddle", 0.8],
        ["minecraft:lily_pad", 1.7],
        ["minecraft:bowl", 1],
        [Item.of("minecraft:fishing_rod", "{Damage:30,RepairCost:3}").enchant("minecraft:luck_of_the_sea", 2).enchant("minecraft:lure", 2).weakNBT(), 0.2],
        ["minecraft:leather", 1],
        ["minecraft:rotten_flesh", 1],
        ["minecraft:stick", 0.5],
        ["minecraft:string", 0.5],
        ["minecraft:potion", 1],
        ["minecraft:bone", 1],
        ["gtceu:damascus_steel_nugget", 0.05],
        ["minecraft:ink_sac", 0.1],
        ["minecraft:tripwire_hook", 1],
        ["gtceu:ancient_gold_coin", 0.024],
        ["avaritia:neutron_pile", 0.019],
        ["kubejs:zero_point_module_fragments", 0.012]
    ]
    const a = [[1, 1], [2, 1.1], [3, 1.2], [4, 1.8]]
    a.forEach((fish) => {
        let recipe = gtr.fishing_ground("fishing" + fish[0])
            .notConsumable((4 ** fish[0]) / 4 + "x minecraft:fishing_rod").circuit(fish[0]).EUt(30).duration(200)
        fishing.forEach(item => {
            recipe.chancedOutput(item[0], (100 * item[1]) * fish[1], 0)
        })
    })
    gtr.packer("gtceu:zero_point_module")
        .itemInputs("64x kubejs:zero_point_module_fragments")
        .itemOutputs(Item.of("gtceu:zero_point_module", "{Charge:2000000000000L}").weakNBT()).EUt(120).duration(2000)

    batch(gtr, "fishing_ground", ["notConsumable", ["itemInputs", "64x gtceu:tiny_meat_dust"], "itemOutputs", ["EUt", 1], ["duration", 2000]], [
        ["fishing_ground1", ["64x minecraft:cod"], ["32x minecraft:cod"]],
        ["fishing_ground2", ["64x minecraft:salmon"], ["32x minecraft:salmon"]],
        ["fishing_ground3", ["64x minecraft:tropical_fish"], ["32x minecraft:tropical_fish"]],
        ["fishing_ground4", ["64x minecraft:pufferfish"], ["32x minecraft:pufferfish"]]
    ]);

    batch(gtr, "gas_collector", ["outputFluids", "EUt", "circuit", ["duration", 200], "dimension"], [
        ["void", ["gtceu:air 10000"], [16], [4], ["kubejs:void"]],
        ["flat", ["gtceu:air 10000"], [16], [5], ["kubejs:flat"]],
        ["barnarda", ["gtceu:barnarda_air 10000"], [1024], [6], ["kubejs:barnarda"]]
    ]);

    gtr.mixer("gtceu:aluminium_bronze_dust")
        .itemInputs("gtceu:aluminium_dust", "6x gtceu:bronze_dust").itemOutputs("7x gtceu:aluminium_bronze_dust").EUt(30).circuit(1)
        .duration(400)

    gtr.cosmos_simulation("cosmos_simulation1")
        .itemInputs("kubejs:quantum_chromodynamic_charge")
        .itemOutputs("131072x gtceu:carbon_dust", "131072x gtceu:phosphorus_dust", "131072x gtceu:sulfur_dust", "131072x gtceu:selenium_dust",
            "131072x gtceu:iodine_dust", "131072x gtceu:boron_dust", "131072x gtceu:silicon_dust", "131072x gtceu:germanium_dust",
            "131072x gtceu:arsenic_dust", "131072x gtceu:antimony_dust", "131072x gtceu:tellurium_dust", "131072x gtceu:astatine_dust",
            "131072x gtceu:aluminium_dust", "131072x gtceu:gallium_dust", "131072x gtceu:indium_dust", "131072x gtceu:tin_dust",
            "131072x gtceu:thallium_dust", "131072x gtceu:lead_dust", "131072x gtceu:bismuth_dust", "131072x gtceu:polonium_dust",
            "131072x gtceu:titanium_dust", "131072x gtceu:vanadium_dust", "131072x gtceu:chromium_dust", "131072x gtceu:manganese_dust",
            "131072x gtceu:iron_dust", "131072x gtceu:cobalt_dust", "131072x gtceu:nickel_dust", "131072x gtceu:copper_dust",
            "131072x gtceu:zinc_dust", "131072x gtceu:zirconium_dust", "131072x gtceu:niobium_dust", "131072x gtceu:molybdenum_dust",
            "131072x gtceu:technetium_dust", "131072x gtceu:ruthenium_dust", "131072x gtceu:rhodium_dust", "131072x gtceu:palladium_dust",
            "131072x gtceu:silver_dust", "131072x gtceu:cadmium_dust", "131072x gtceu:hafnium_dust", "131072x gtceu:tantalum_dust",
            "131072x gtceu:tungsten_dust", "131072x gtceu:rhenium_dust", "131072x gtceu:osmium_dust", "131072x gtceu:iridium_dust",
            "131072x gtceu:platinum_dust", "131072x gtceu:gold_dust", "131072x gtceu:beryllium_dust", "131072x gtceu:magnesium_dust",
            "131072x gtceu:calcium_dust", "131072x gtceu:strontium_dust", "131072x gtceu:barium_dust", "131072x gtceu:radium_dust",
            "131072x gtceu:yttrium_dust", "131072x gtceu:lithium_dust", "131072x gtceu:sodium_dust", "131072x gtceu:potassium_dust",
            "131072x gtceu:rubidium_dust", "131072x gtceu:caesium_dust", "131072x gtceu:francium_dust", "131072x gtceu:scandium_dust",
            "131072x gtceu:actinium_dust", "131072x gtceu:thorium_dust", "131072x gtceu:protactinium_dust", "131072x gtceu:uranium_dust",
            "131072x gtceu:neptunium_dust", "131072x gtceu:plutonium_dust", "131072x gtceu:americium_dust", "131072x gtceu:curium_dust",
            "131072x gtceu:berkelium_dust", "131072x gtceu:californium_dust", "131072x gtceu:einsteinium_dust", "131072x gtceu:fermium_dust",
            "131072x gtceu:mendelevium_dust", "131072x gtceu:nobelium_dust", "131072x gtceu:lawrencium_dust", "131072x gtceu:lanthanum_dust",
            "131072x gtceu:cerium_dust", "131072x gtceu:praseodymium_dust", "131072x gtceu:neodymium_dust", "131072x gtceu:promethium_dust",
            "131072x gtceu:samarium_dust", "131072x gtceu:europium_dust", "131072x gtceu:gadolinium_dust", "131072x gtceu:terbium_dust",
            "131072x gtceu:dysprosium_dust", "131072x gtceu:holmium_dust", "131072x gtceu:erbium_dust", "131072x gtceu:thulium_dust",
            "131072x gtceu:ytterbium_dust", "131072x gtceu:lutetium_dust", "131072x gtceu:rutherfordium_dust", "131072x gtceu:dubnium_dust",
            "131072x gtceu:seaborgium_dust", "131072x gtceu:bohrium_dust", "131072x gtceu:hassium_dust", "131072x gtceu:meitnerium_dust",
            "131072x gtceu:darmstadtium_dust", "131072x gtceu:roentgenium_dust", "131072x gtceu:copernicium_dust", "131072x gtceu:nihonium_dust",
            "131072x gtceu:flerovium_dust", "131072x gtceu:moscovium_dust", "131072x gtceu:livermorium_dust", "131072x gtceu:tennessine_dust",
            "131072x gtceu:oganesson_dust", "131072x gtceu:jasper_dust", "131072x gtceu:naquadah_dust", "131072x gtceu:enriched_naquadah_dust",
            "131072x gtceu:naquadria_dust", "131072x gtceu:duranium_dust", "131072x gtceu:tritanium_dust", "131072x gtceu:mithril_dust",
            "131072x gtceu:orichalcum_dust", "131072x gtceu:enderium_dust", "131072x gtceu:adamantine_dust", "131072x gtceu:vibranium_dust",
            "131072x gtceu:infuscolium_dust", "131072x gtceu:taranium_dust", "131072x gtceu:draconium_dust", "131072x gtceu:starmetal_dust")
        .outputFluids("gtceu:spacetime 256", "gtceu:raw_star_matter_plasma 1310720", "gtceu:quark_gluon_plasma 1310720",
            "gtceu:heavy_quark_degenerate_matter_plasma 1310720", "gtceu:neutronium 13107200", "gtceu:heavy_lepton_mixture 13107200",
            "gtceu:hydrogen 131072000", "gtceu:nitrogen 131072000", "gtceu:oxygen 131072000", "gtceu:fluorine 131072000",
            "gtceu:chlorine 131072000", "gtceu:bromine 131072000", "gtceu:helium 131072000", "gtceu:neon 131072000", "gtceu:argon 131072000",
            "gtceu:krypton 131072000", "gtceu:xenon 131072000", "gtceu:radon 131072000", "gtceu:mercury 131072000", "gtceu:deuterium 131072000",
            "gtceu:tritium 131072000", "gtceu:helium_3 131072000", "gtceu:unknowwater 131072000", "gtceu:uu_matter 131072000")
        .duration(1200).inputFluids("gtceu:cosmic_element 1024000")
});
