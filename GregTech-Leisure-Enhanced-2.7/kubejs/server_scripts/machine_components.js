// priority: 95
// 常规机械部件的材料表与阶段升级配方。
// 由 gtceu.js 按既有阶段顺序执行，本文件只登记配方，不依赖文件名排序。
global.gtlPack.register("machine_components", event => {
    const gtr = event.recipes.gtceu;

    const parts_materialas = [
        ["uhv", "1", "europium", "abyssalalloy", "uv", "zpm", "400000", "neutronium", "ruthenium_trinium_americium_neutronate", "orichalcum",
            "2x gtceu:gravi_star", "1", "fluxed_electrum", "gtceu:highurabilityompoundteel 576"],
        ["uev", "2", "mithril", "titansteel", "uhv", "uv", "1600000", "quantanium", "enderite", "hastelloyx_78", "4x gtceu:gravi_star", "2",
            "dalisenite", "gtceu:bohrium 576"]]
    parts_materialas.forEach((parts_material) => {
        gtr.assembly_line("gtceu:" + parts_material[0] + "_electric_motor")
            .itemInputs("kubejs:magnetic_long_netherite_rod", "4x gtceu:long_" + parts_material[9] + "_rod", "4x gtceu:" + parts_material[9] + "_ring",
                "8x gtceu:" + parts_material[9] + "_round", "64x #forge:fine_wires/" + parts_material[3],
                "64x #forge:fine_wires/" + parts_material[3], "2x gtceu:" + parts_material[2] + "_single_cable")
            .inputFluids("gtceu:mutated_living_solder " + 500 * parts_material[1], "gtceu:soldering_alloy " + 1000 * parts_material[1],
                "gtceu:lubricant " + 2000 * parts_material[1], parts_material[13])
            .itemOutputs("gtceu:" + parts_material[0] + "_electric_motor").EUt(parts_material[6]).duration(600)
            .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:" + parts_material[4] + "_electric_motor")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(parts_material[6]).CWUt(64 * parts_material[1]))

        gtr.assembly_line("gtceu:" + parts_material[0] + "_electric_pump")
            .itemInputs("gtceu:" + parts_material[0] + "_electric_motor", "gtceu:neutronium_small_fluid_pipe", "2x gtceu:" + parts_material[9] + "_plate",
                "8x gtceu:" + parts_material[9] + "_screw", parts_material[1] * 4 + "x gtceu:styrene_butadiene_rubber_ring",
                "gtceu:" + parts_material[9] + "_rotor", "2x gtceu:" + parts_material[2] + "_single_cable")
            .inputFluids("gtceu:mutated_living_solder " + 576 * parts_material[1], "gtceu:soldering_alloy " + 1152 * parts_material[1],
                "gtceu:lubricant " + 2000 * parts_material[1], parts_material[13])
            .itemOutputs("gtceu:" + parts_material[0] + "_electric_pump").EUt(parts_material[6]).duration(600)
            .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:" + parts_material[4] + "_electric_pump")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(parts_material[6]).CWUt(64 * parts_material[1]))

        gtr.assembly_line("gtceu:" + parts_material[0] + "_conveyor_module")
            .itemInputs("2x gtceu:" + parts_material[0] + "_electric_motor", "2x gtceu:" + parts_material[9] + "_plate",
                "4x gtceu:" + parts_material[9] + "_ring", "16x gtceu:" + parts_material[9] + "_round",
                "4x gtceu:" + parts_material[9] + "_screw", "2x gtceu:" + parts_material[12] + "_plate",
                "2x gtceu:" + parts_material[2] + "_single_cable")
            .inputFluids("gtceu:mutated_living_solder " + 576 * parts_material[1], "gtceu:lubricant " + 2000 * parts_material[1],
                "gtceu:styrene_butadiene_rubber " + (3456 + 1152 * parts_material[1]), parts_material[13])
            .itemOutputs("gtceu:" + parts_material[0] + "_conveyor_module").EUt(parts_material[6]).duration(600)
            .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:" + parts_material[4] + "_conveyor_module")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(parts_material[6]).CWUt(64 * parts_material[1]))

        gtr.assembly_line("gtceu:" + parts_material[0] + "_electric_piston")
            .itemInputs("gtceu:" + parts_material[0] + "_electric_motor", "4x gtceu:" + parts_material[9] + "_plate",
                "4x gtceu:" + parts_material[9] + "_ring", "16x gtceu:" + parts_material[9] + "_round", "4x gtceu:" + parts_material[9] + "_rod",
                "gtceu:" + parts_material[9] + "_gear", "2x gtceu:small_" + parts_material[9] + "_gear",
                "2x gtceu:" + parts_material[2] + "_single_cable")
            .inputFluids("gtceu:mutated_living_solder " + 576 * parts_material[1], "gtceu:soldering_alloy " + 1152 * parts_material[1],
                "gtceu:lubricant " + 2000 * parts_material[1], parts_material[13])
            .itemOutputs("gtceu:" + parts_material[0] + "_electric_piston").EUt(parts_material[6]).duration(600)
            .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:" + parts_material[4] + "_electric_piston")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(parts_material[6]).CWUt(64 * parts_material[1]))

        gtr.assembly_line("gtceu:" + parts_material[0] + "_robot_arm")
            .itemInputs("4x gtceu:long_" + parts_material[9] + "_rod", "gtceu:" + parts_material[9] + "_gear",
                "3x gtceu:small_" + parts_material[9] + "_gear", "2x gtceu:" + parts_material[0] + "_electric_motor",
                "gtceu:" + parts_material[0] + "_electric_piston", "#gtceu:circuits/" + parts_material[0],
                "2x #gtceu:circuits/" + parts_material[4], "4x #gtceu:circuits/" + parts_material[5],
                "4x gtceu:" + parts_material[2] + "_single_cable")
            .inputFluids("gtceu:mutated_living_solder " + 576 * parts_material[1], "gtceu:soldering_alloy " + 1152 * parts_material[1],
                "gtceu:lubricant " + 2000 * parts_material[1], parts_material[13])
            .itemOutputs("gtceu:" + parts_material[0] + "_robot_arm").EUt(parts_material[6]).duration(600)
            .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:" + parts_material[4] + "_robot_arm")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(parts_material[6]).CWUt(64 * parts_material[1]))

        gtr.assembly_line("gtceu:" + parts_material[0] + "_emitter")
            .itemInputs("gtceu:" + parts_material[7] + "_frame", "gtceu:" + parts_material[0] + "_electric_motor",
                "4x gtceu:long_" + parts_material[9] + "_rod", parts_material[10], "2x #gtceu:circuits/" + parts_material[0],
                "64x #forge:foils/" + parts_material[3], "64x #forge:foils/" + parts_material[12],
                "4x gtceu:" + parts_material[2] + "_single_cable")
            .inputFluids("gtceu:mutated_living_solder " + 1152 * parts_material[1], "gtceu:soldering_alloy " + 2304 * parts_material[1], parts_material[13])
            .itemOutputs("gtceu:" + parts_material[0] + "_emitter").EUt(parts_material[6]).duration(600)
            .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:" + parts_material[4] + "_emitter")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(parts_material[6]).CWUt(96 * parts_material[1]))

        gtr.assembly_line("gtceu:" + parts_material[0] + "_sensor")
            .itemInputs("gtceu:" + parts_material[7] + "_frame", "gtceu:" + parts_material[0] + "_electric_motor",
                "4x gtceu:" + parts_material[9] + "_plate", parts_material[10], "2x #gtceu:circuits/" + parts_material[0],
                "64x #forge:foils/" + parts_material[3], "64x #forge:foils/" + parts_material[12],
                "4x gtceu:" + parts_material[2] + "_single_cable")
            .inputFluids("gtceu:mutated_living_solder " + 1152 * parts_material[1], "gtceu:soldering_alloy " + 2304 * parts_material[1], parts_material[13])
            .itemOutputs("gtceu:" + parts_material[0] + "_sensor").EUt(parts_material[6]).duration(600)
            .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:" + parts_material[4] + "_sensor")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(parts_material[6]).CWUt(96 * parts_material[1]))

        gtr.assembly_line("gtceu:" + parts_material[0] + "_field_generator")
            .itemInputs("gtceu:" + parts_material[7] + "_frame", "6x gtceu:" + parts_material[7] + "_plate", parts_material[10],
                "2x gtceu:" + parts_material[0] + "_emitter", "2x #gtceu:circuits/" + parts_material[0],
                "64x #forge:fine_wires/" + parts_material[8], "64x #forge:fine_wires/" + parts_material[8],
                "4x gtceu:" + parts_material[2] + "_single_cable")
            .inputFluids("gtceu:mutated_living_solder " + 1152 * parts_material[1], "gtceu:soldering_alloy " + 2304 * parts_material[1], parts_material[13])
            .itemOutputs("gtceu:" + parts_material[0] + "_field_generator").EUt(parts_material[6]).duration(600)
            .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:" + parts_material[4] + "_field_generator")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(parts_material[6]).CWUt(96 * parts_material[1]))

        gtr.assembler("gtceu:" + parts_material[0] + "_fluid_regulator")
            .itemInputs("gtceu:" + parts_material[0] + "_electric_pump", "2x #gtceu:circuits/" + parts_material[0])
            .itemOutputs("gtceu:" + parts_material[0] + "_fluid_regulator").EUt(parts_material[6]).circuit(1).duration(100)
    })

    const parts_materials = [
        ["uiv", "4", "neutronium", "adamantine", "uev", "uhv", "6400000", "adamantium", "echoite", "infuscolium", "kubejs:unstable_star", "3",
            "arceusalloy2b", "gtceu:taranium 576"],
        ["uxv", "8", "taranium", "naquadriatictaranium", "uiv", "uev", "25600000", "vibranium", "legendarium", "hastelloyk_243",
            "2x kubejs:unstable_star", "4", "titan_precision_steel", "gtceu:astraltitanium 576"],
        ["opv", "16", "crystalmatrix", "starmetal", "uxv", "uev", "102400000", "draconium", "draconiumawakened", "vibramantium",
            "4x kubejs:unstable_star", "5", "hikarium", "gtceu:celestialtungsten 576"]]
    parts_materials.forEach((parts_material) => {
        gtr.assembly_line("gtceu:" + parts_material[0] + "_electric_motor")
            .itemInputs("gtceu:long_attuned_tengam_rod", "4x gtceu:long_" + parts_material[9] + "_rod", "4x gtceu:" + parts_material[9] + "_ring",
                "8x gtceu:" + parts_material[9] + "_round", "64x #forge:fine_wires/" + parts_material[3],
                "64x #forge:fine_wires/" + parts_material[3], "2x gtceu:" + parts_material[2] + "_single_cable")
            .inputFluids("gtceu:super_mutated_living_solder " + 500 * parts_material[1], "gtceu:soldering_alloy " + 1000 * parts_material[1],
                "gtceu:lubricant " + 2000 * parts_material[1], parts_material[13])
            .itemOutputs("gtceu:" + parts_material[0] + "_electric_motor").EUt(parts_material[6]).duration(600)
            .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:" + parts_material[4] + "_electric_motor")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(parts_material[6]).CWUt(64 * parts_material[1]))

        gtr.assembly_line("gtceu:" + parts_material[0] + "_electric_pump")
            .itemInputs("gtceu:" + parts_material[0] + "_electric_motor", "gtceu:neutronium_small_fluid_pipe", "2x gtceu:" + parts_material[9] + "_plate",
                "8x gtceu:" + parts_material[9] + "_screw", parts_material[1] * 4 + "x gtceu:styrene_butadiene_rubber_ring",
                "gtceu:" + parts_material[9] + "_rotor", "2x gtceu:" + parts_material[2] + "_single_cable")
            .inputFluids("gtceu:super_mutated_living_solder " + 576 * parts_material[1], "gtceu:soldering_alloy " + 1152 * parts_material[1],
                "gtceu:lubricant " + 2000 * parts_material[1], parts_material[13])
            .itemOutputs("gtceu:" + parts_material[0] + "_electric_pump").EUt(parts_material[6]).duration(600)
            .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:" + parts_material[4] + "_electric_pump")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(parts_material[6]).CWUt(64 * parts_material[1]))

        gtr.assembly_line("gtceu:" + parts_material[0] + "_conveyor_module")
            .itemInputs("2x gtceu:" + parts_material[0] + "_electric_motor", "2x gtceu:" + parts_material[9] + "_plate",
                "4x gtceu:" + parts_material[9] + "_ring", "16x gtceu:" + parts_material[9] + "_round",
                "4x gtceu:" + parts_material[9] + "_screw", "2x gtceu:" + parts_material[12] + "_plate",
                "2x gtceu:" + parts_material[2] + "_single_cable")
            .inputFluids("gtceu:super_mutated_living_solder " + 576 * parts_material[1], "gtceu:lubricant " + 2000 * parts_material[1],
                "gtceu:styrene_butadiene_rubber " + (3456 + 1152 * parts_material[1]), parts_material[13])
            .itemOutputs("gtceu:" + parts_material[0] + "_conveyor_module").EUt(parts_material[6]).duration(600)
            .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:" + parts_material[4] + "_conveyor_module")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(parts_material[6]).CWUt(64 * parts_material[1]))

        gtr.assembly_line("gtceu:" + parts_material[0] + "_electric_piston")
            .itemInputs("gtceu:" + parts_material[0] + "_electric_motor", "4x gtceu:" + parts_material[9] + "_plate",
                "4x gtceu:" + parts_material[9] + "_ring", "16x gtceu:" + parts_material[9] + "_round", "4x gtceu:" + parts_material[9] + "_rod",
                "gtceu:" + parts_material[9] + "_gear", "2x gtceu:small_" + parts_material[9] + "_gear",
                "2x gtceu:" + parts_material[2] + "_single_cable")
            .inputFluids("gtceu:super_mutated_living_solder " + 576 * parts_material[1], "gtceu:soldering_alloy " + 1152 * parts_material[1],
                "gtceu:lubricant " + 2000 * parts_material[1], parts_material[13])
            .itemOutputs("gtceu:" + parts_material[0] + "_electric_piston").EUt(parts_material[6]).duration(600)
            .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:" + parts_material[4] + "_electric_piston")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(parts_material[6]).CWUt(64 * parts_material[1]))

        gtr.assembly_line("gtceu:" + parts_material[0] + "_robot_arm")
            .itemInputs("4x gtceu:long_" + parts_material[9] + "_rod", "gtceu:" + parts_material[9] + "_gear",
                "3x gtceu:small_" + parts_material[9] + "_gear", "2x gtceu:" + parts_material[0] + "_electric_motor",
                "gtceu:" + parts_material[0] + "_electric_piston", "#gtceu:circuits/" + parts_material[0],
                "2x #gtceu:circuits/" + parts_material[4], "4x #gtceu:circuits/" + parts_material[5],
                "4x gtceu:" + parts_material[2] + "_single_cable")
            .inputFluids("gtceu:super_mutated_living_solder " + 576 * parts_material[1], "gtceu:soldering_alloy " + 1152 * parts_material[1],
                "gtceu:lubricant " + 2000 * parts_material[1], parts_material[13])
            .itemOutputs("gtceu:" + parts_material[0] + "_robot_arm").EUt(parts_material[6]).duration(600)
            .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:" + parts_material[4] + "_robot_arm")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(parts_material[6]).CWUt(64 * parts_material[1]))

        gtr.assembly_line("gtceu:" + parts_material[0] + "_emitter")
            .itemInputs("gtceu:" + parts_material[7] + "_frame", "gtceu:" + parts_material[0] + "_electric_motor",
                "4x gtceu:long_" + parts_material[9] + "_rod", parts_material[10], "2x #gtceu:circuits/" + parts_material[0],
                "64x #forge:foils/" + parts_material[3], "64x #forge:foils/" + parts_material[12],
                "4x gtceu:" + parts_material[2] + "_single_cable")
            .inputFluids("gtceu:super_mutated_living_solder " + 1152 * parts_material[1], "gtceu:soldering_alloy " + 2304 * parts_material[1],
                parts_material[13])
            .itemOutputs("gtceu:" + parts_material[0] + "_emitter").EUt(parts_material[6]).duration(600)
            .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:" + parts_material[4] + "_emitter")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(parts_material[6]).CWUt(96 * parts_material[1]))

        gtr.assembly_line("gtceu:" + parts_material[0] + "_sensor")
            .itemInputs("gtceu:" + parts_material[7] + "_frame", "gtceu:" + parts_material[0] + "_electric_motor",
                "4x gtceu:" + parts_material[9] + "_plate", parts_material[10], "2x #gtceu:circuits/" + parts_material[0],
                "64x #forge:foils/" + parts_material[3], "64x #forge:foils/" + parts_material[12],
                "4x gtceu:" + parts_material[2] + "_single_cable")
            .inputFluids("gtceu:super_mutated_living_solder " + 1152 * parts_material[1], "gtceu:soldering_alloy " + 2304 * parts_material[1],
                parts_material[13])
            .itemOutputs("gtceu:" + parts_material[0] + "_sensor").EUt(parts_material[6]).duration(600)
            .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:" + parts_material[4] + "_sensor")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(parts_material[6]).CWUt(96 * parts_material[1]))

        gtr.assembly_line("gtceu:" + parts_material[0] + "_field_generator")
            .itemInputs("gtceu:" + parts_material[7] + "_frame", "6x gtceu:" + parts_material[7] + "_plate", parts_material[10],
                "2x gtceu:" + parts_material[0] + "_emitter", "2x #gtceu:circuits/" + parts_material[0],
                "64x #forge:fine_wires/" + parts_material[8], "64x #forge:fine_wires/" + parts_material[8],
                "4x gtceu:" + parts_material[2] + "_single_cable")
            .inputFluids("gtceu:super_mutated_living_solder " + 1152 * parts_material[1], "gtceu:soldering_alloy " + 2304 * parts_material[1],
                parts_material[13])
            .itemOutputs("gtceu:" + parts_material[0] + "_field_generator").EUt(parts_material[6]).duration(600)
            .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:" + parts_material[4] + "_field_generator")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(parts_material[6]).CWUt(96 * parts_material[1]))

        gtr.assembler("gtceu:" + parts_material[0] + "_fluid_regulator")
            .itemInputs("gtceu:" + parts_material[0] + "_electric_pump", "2x #gtceu:circuits/" + parts_material[0])
            .itemOutputs("gtceu:" + parts_material[0] + "_fluid_regulator").EUt(parts_material[6]).circuit(1).duration(100)
    })

    gtr.assembly_line("kubejs:dimensional_stability_casing")
        .itemInputs("kubejs:containment_field_generator", "4x kubejs:dyson_control_casing", "4x kubejs:dyson_control_toroid", "gtceu:uxv_field_generator",
            "4x gtceu:uiv_field_generator", "2x gtceu:opv_electric_pump", "2x gtceu:rtm_alloy_spring", "#gtceu:circuits/uev",
            "2x gtceu:crystalmatrix_rod", "gtceu:double_crystalmatrix_plate")
        .inputFluids("gtceu:super_mutated_living_solder 288", "gtceu:liquid_degenerate_rhenium 200", "gtceu:pikyonium 288", "gtceu:periodicium 288")
        .itemOutputs("kubejs:dimensional_stability_casing").EUt(GTValues.VA[GTValues.UXV]).duration(800)
        .stationResearch(b => b.researchStack(Registries.getItemStack("kubejs:dimensional_bridge_casing")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(GTValues.VA[GTValues.UXV]).CWUt(1024))

    gtr.assembly_line("gtceu:pcb_factory")
        .itemInputs("4x gtceu:neutronium_frame", "4x gtceu:uv_circuit_assembler", "4x gtceu:chemical_plant", "4x #gtceu:circuits/uev",
            "4x gtceu:uhv_robot_arm", "4x gtceu:uhv_electric_pump", "2x gtceu:uhv_sensor", "2x gtceu:uhv_emitter", "gtceu:uhv_field_generator",
            "2x gtceu:iridium_nanoswarm", "2x gtceu:silver_nanoswarm", "16x gtceu:double_grisium_plate")
        .inputFluids("gtceu:soldering_alloy 2592", "gtceu:bismuth_bronze 2582", "gtceu:indalloy_140 1440", "gtceu:enriched_naquadah 1296")
        .itemOutputs("gtceu:pcb_factory").EUt(GTValues.VA[GTValues.UHV]).duration(600)
        .stationResearch(b => b.researchStack(Registries.getItemStack("kubejs:bioware_circuit_board")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(GTValues.VA[GTValues.UHV]).CWUt(128))

    gtr.assembly_line("gtceu:large_naquadah_reactor")
        .itemInputs("64x gtceu:hpic_chip", "64x gtceu:uhpic_chip", "32x gtceu:uranium_rhodium_dinaquadide_single_wire", "24x gtceu:enriched_naquadah_foil",
            "16x gtceu:duranium_gear", "8x gtceu:double_duranium_plate", "8x gtceu:double_naquadria_plate", "2x gtceu:uv_electric_piston",
            "gtceu:uv_field_generator", "gtceu:uv_electric_pump", "4x #gtceu:circuits/uhv")
        .inputFluids("gtceu:soldering_alloy 5760", "gtceu:indalloy_140 2304", "gtceu:trinium 2304").itemOutputs("gtceu:large_naquadah_reactor")
        .EUt(90000).duration(1000)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:zpm_naquadah_reactor")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(GTValues.VA[GTValues.UV]).CWUt(64))

    gtr.assembly_line("gtceu:aggregation_device")
        .itemInputs("4x kubejs:draconium_block_charged", "64x kubejs:pm_chip", "64x kubejs:pm_chip", "8x kubejs:reinforced_echo_shard",
            "4x gtceu:enderite_hex_wire", "4x gtceu:uev_field_generator", "gtlcore:really_max_battery", "64x gtceu:quantanium_screw",
            "8x gtceu:double_dalisenite_plate", "8x gtceu:double_seaborgium_plate")
        .itemOutputs("gtceu:aggregation_device")
        .inputFluids("gtceu:mutated_living_solder 1296", "gtceu:neutronium 576", "gtceu:mana 1000", "gtceu:enriched_dragon_breath 100")
        .EUt(GTValues.VA[GTValues.UEV]).duration(1600)
        .stationResearch(b => b.researchStack(Registries.getItemStack("kubejs:aggregatione_core")).EUt(GTValues.VA[GTValues.UEV]).dataStack(Registries.getItemStack("gtceu:data_module")).CWUt(128))

    gtr.assembly_line("gtceu:super_particle_collider")
        .itemInputs("16x gtceu:zpm_field_generator", "16x gtceu:zpm_electric_pump", "64x gtceu:uhpic_chip", "64x gtceu:uhpic_chip", "64x gtceu:uhpic_chip",
            "64x gtceu:uhpic_chip", "16x gtceu:uranium_rhodium_dinaquadide_hex_wire", "32x #gtceu:circuits/uv", "16x gtceu:neutron_reflector",
            "8x gtceu:double_lafium_plate")
        .itemOutputs("gtceu:super_particle_collider")
        .inputFluids("gtceu:soldering_alloy 1152", "gtceu:protactinium 1152", "gtceu:uranium 1152", "gtceu:neptunium 1152")
        .EUt(GTValues.VA[GTValues.ZPM]).duration(800)
        .stationResearch(b => b.researchStack(Registries.getItemStack("kubejs:accelerated_pipeline")).EUt(GTValues.VA[GTValues.ZPM]).dataStack(Registries.getItemStack("gtceu:data_module")).CWUt(32))

    gtr.assembly_line("gtceu:space_elevator")
        .itemInputs("16x gtceu:gravitation_engine_unit", "8x gtceu:uv_field_generator", "8x #gtceu:circuits/uhv", "16x #gtceu:circuits/uv",
            "32x #gtceu:circuits/zpm", "64x #gtceu:circuits/luv", "4x kubejs:module_connector",
            "32x gtceu:indium_tin_barium_titanium_cuprate_hex_wire", "16x gtceu:uranium_rhodium_dinaquadide_hex_wire",
            "8x gtceu:enriched_naquadah_trinium_europium_duranide_hex_wire", "48x gtceu:americium_huge_restrictive_item_pipe",
            "48x gtceu:duranium_huge_fluid_pipe", "64x gtceu:carbon_nanoswarm", "64x gtceu:carbon_nanoswarm", "32x gtceu:double_pikyonium_plate",
            "16x gtceu:double_orichalcum_plate")
        .itemOutputs("gtceu:space_elevator")
        .inputFluids("gtceu:soldering_alloy 4096", "gtceu:mendelevium 4096", "gtceu:nobelium 4096", "gtceu:lawrencium 4096")
        .EUt(GTValues.VA[GTValues.UV]).duration(1600)
        .stationResearch(b => b.researchStack(Registries.getItemStack("ad_astra_rocketed:tier_7_rocket")).EUt(GTValues.VA[GTValues.UV]).dataStack(Registries.getItemStack("gtceu:data_module")).CWUt(64))

    gtr.assembly_line("gtceu:engraving_laser_plant")
        .itemInputs("8x gtceu:uv_laser_engraver", "8x gtceu:uhv_emitter", "8x gtceu:uhv_electric_piston", "8x gtceu:uhv_sensor", "8x gtceu:uhv_robot_arm",
            "8x gtceu:uhv_electric_pump", "32x gtceu:stellite_rod", "8x #gtceu:circuits/uev", "32x gtceu:fluxed_electrum_plate",
            "32x gtceu:grisium_plate", "16x gtceu:double_titanium_carbide_plate", "16x gtceu:double_titanium_tungsten_carbide_plate")
        .itemOutputs("gtceu:engraving_laser_plant")
        .inputFluids("gtceu:indalloy_140 2592", "gtceu:artherium_sn 1296", "gtceu:mutated_living_solder 1296", "gtceu:soldering_alloy 2880")
        .EUt(GTValues.VA[GTValues.UV]).duration(1200)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:large_engraving_laser")).EUt(GTValues.VA[GTValues.UV]).dataStack(Registries.getItemStack("gtceu:data_module")).CWUt(64))

    gtr.assembly_line("gtceu:qft")
        .itemInputs("8x gtceu:vibranium_frame", "4x gtlcore:spacetimecontinuumripper", "4x gtlcore:spacetimebendingcore",
            "8x kubejs:precision_circuit_assembly_robot_mk4", "8x gtceu:uxv_sensor", "8x gtceu:uxv_robot_arm", "8x gtceu:uxv_electric_pump",
            "8x gtceu:uxv_field_generator", "8x #gtceu:circuits/opv", "gtlcore:extremely_max_battery", "64x gtceu:double_lafium_plate",
            "64x gtceu:double_titan_precision_steel_plate")
        .itemOutputs("gtceu:qft")
        .inputFluids("gtceu:super_mutated_living_solder 1296", "gtceu:tairitsu 2880", "gtceu:soldering_alloy 2880", "gtceu:periodicium 2880")
        .EUt(GTValues.VA[GTValues.UXV]).duration(2400)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtlcore:spacetimebendingcore")).EUt(GTValues.VA[GTValues.UXV]).dataStack(Registries.getItemStack("gtceu:data_module")).CWUt(2048))
});
