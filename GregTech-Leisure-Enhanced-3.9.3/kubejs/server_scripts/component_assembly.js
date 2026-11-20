// priority: 95
// 部件装配线外壳和各电压阶段的部件批量装配。
// 由 gtceu.js 按既有阶段顺序执行，本文件只登记配方，不依赖文件名排序。
global.gtlPack.register("component_assembly", event => {
    const gtr = event.recipes.gtceu;
    const batch = global.gtlPack.batch;

    // 部件装配线外壳
    batch(gtr, "assembler", ["itemInputs", "inputFluids", "itemOutputs", "EUt", ["duration", 320]], [
        ["gtlcore:component_assembly_line_casing_lv",
            ["gtceu:steel_frame", "4x gtceu:dense_steel_plate", "4x gtceu:lv_robot_arm", "8x gtceu:lv_electric_piston", "10x gtceu:lv_electric_motor",
                "4x gtceu:steel_gear", "3x gtceu:manganese_phosphide_octal_wire", "16x #gtceu:circuits/lv"], ["gtceu:soldering_alloy 288"],
            ["gtlcore:component_assembly_line_casing_lv"], [GTValues.VA[GTValues.LV]]],
        ["gtlcore:component_assembly_line_casing_mv",
            ["gtceu:aluminium_frame", "16x gtceu:double_aluminium_plate", "4x gtceu:mv_robot_arm", "8x gtceu:mv_electric_piston",
                "10x gtceu:mv_electric_motor", "4x gtceu:aluminium_gear", "3x gtceu:magnesium_diboride_octal_wire", "8x #gtceu:circuits/mv",
                "16x #gtceu:circuits/lv"], ["gtceu:soldering_alloy 432"], ["gtlcore:component_assembly_line_casing_mv"], [GTValues.VA[GTValues.MV]]],
        ["gtlcore:component_assembly_line_casing_hv",
            ["gtceu:stainless_steel_frame", "16x gtceu:double_stainless_steel_plate", "4x gtceu:hv_robot_arm", "8x gtceu:hv_electric_piston",
                "10x gtceu:hv_electric_motor", "4x gtceu:stainless_steel_gear", "3x gtceu:mercury_barium_calcium_cuprate_octal_wire",
                "8x #gtceu:circuits/hv", "16x #gtceu:circuits/mv"], ["gtceu:soldering_alloy 576"], ["gtlcore:component_assembly_line_casing_hv"],
            [GTValues.VA[GTValues.HV]]],
        ["gtlcore:component_assembly_line_casing_ev",
            ["gtceu:titanium_frame", "16x gtceu:double_titanium_plate", "4x gtceu:ev_robot_arm", "8x gtceu:ev_electric_piston",
                "10x gtceu:ev_electric_motor", "4x gtceu:titanium_gear", "3x gtceu:uranium_triplatinum_octal_wire", "8x #gtceu:circuits/ev",
                "16x #gtceu:circuits/hv"], ["gtceu:soldering_alloy 720"], ["gtlcore:component_assembly_line_casing_ev"], [GTValues.VA[GTValues.EV]]],
        ["gtlcore:component_assembly_line_casing_iv",
            ["gtceu:tungsten_steel_frame", "16x gtceu:double_tungsten_steel_plate", "4x gtceu:iv_robot_arm", "8x gtceu:iv_electric_piston",
                "10x gtceu:iv_electric_motor", "4x gtceu:tungsten_steel_gear", "3x gtceu:samarium_iron_arsenic_oxide_octal_wire",
                "8x #gtceu:circuits/iv", "16x #gtceu:circuits/ev"], ["gtceu:soldering_alloy 864"], ["gtlcore:component_assembly_line_casing_iv"],
            [GTValues.VA[GTValues.IV]]]
    ]);

    gtr.assembly_line("gtlcore:component_assembly_line_casing_luv")
        .itemInputs("gtceu:europium_frame", "6x gtceu:dense_rhodium_plated_palladium_plate", "4x gtceu:luv_field_generator", "6x gtceu:luv_electric_pump",
            "8x gtceu:luv_robot_arm", "10x gtceu:luv_sensor", "16x gtceu:luv_conveyor_module", "4x gtceu:osmiridium_gear",
            "16x gtceu:small_rhodium_plated_palladium_gear", "4x gtceu:indium_tin_barium_titanium_cuprate_octal_wire", "8x #gtceu:circuits/luv",
            "16x #gtceu:circuits/iv")
        .inputFluids("gtceu:indalloy_140 3456", "gtceu:zeron_100 1728", "gtceu:soldering_alloy 1152", "gtceu:lubricant 4000")
        .itemOutputs("gtlcore:component_assembly_line_casing_luv").EUt(GTValues.VA[GTValues.LuV]).duration(600)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtlcore:component_assembly_line_casing_iv")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(GTValues.VA[GTValues.LuV]).CWUt(128))

    gtr.assembly_line("gtlcore:component_assembly_line_casing_zpm")
        .itemInputs("gtceu:naquadah_alloy_frame", "6x gtceu:dense_naquadah_alloy_plate", "4x gtceu:zpm_field_generator", "6x gtceu:zpm_electric_pump",
            "8x gtceu:zpm_robot_arm", "10x gtceu:zpm_sensor", "16x gtceu:zpm_conveyor_module", "4x gtceu:naquadah_alloy_gear",
            "16x gtceu:small_naquadah_alloy_gear", "4x gtceu:indium_tin_barium_titanium_cuprate_octal_wire", "8x #gtceu:circuits/zpm",
            "16x #gtceu:circuits/luv")
        .inputFluids("gtceu:indalloy_140 4032", "gtceu:pikyonium 2016", "gtceu:neutronium 1008", "gtceu:lubricant 5000")
        .itemOutputs("gtlcore:component_assembly_line_casing_zpm").EUt(GTValues.VA[GTValues.ZPM]).duration(600)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtlcore:component_assembly_line_casing_luv")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(GTValues.VA[GTValues.ZPM]).CWUt(192))

    gtr.assembly_line("gtlcore:component_assembly_line_casing_uv")
        .itemInputs("gtceu:tritanium_frame", "24x gtceu:double_tritanium_plate", "4x gtceu:uv_field_generator", "6x gtceu:uv_electric_pump",
            "8x gtceu:uv_robot_arm", "10x gtceu:uv_sensor", "16x gtceu:uv_conveyor_module", "4x gtceu:tritanium_gear",
            "16x gtceu:small_tritanium_gear", "4x gtceu:indium_tin_barium_titanium_cuprate_octal_wire", "8x #gtceu:circuits/uv",
            "16x #gtceu:circuits/zpm")
        .inputFluids("gtceu:indalloy_140 4608", "gtceu:artherium_sn 2304", "gtceu:abyssalalloy 1152", "gtceu:lubricant 6000")
        .itemOutputs("gtlcore:component_assembly_line_casing_uv").EUt(GTValues.VA[GTValues.UV]).duration(600)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtlcore:component_assembly_line_casing_zpm")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(GTValues.VA[GTValues.UV]).CWUt(256))

    gtr.assembly_line("gtlcore:component_assembly_line_casing_uhv")
        .itemInputs("gtceu:mithril_frame", "24x gtceu:double_mithril_plate", "4x gtceu:uhv_field_generator", "6x gtceu:uhv_electric_pump",
            "8x gtceu:uhv_robot_arm", "10x gtceu:uhv_sensor", "16x gtceu:uhv_conveyor_module", "4x gtceu:orichalcum_gear",
            "16x gtceu:small_orichalcum_gear", "4x gtceu:ruthenium_trinium_americium_neutronate_octal_wire", "8x #gtceu:circuits/uhv",
            "16x #gtceu:circuits/uv")
        .inputFluids("gtceu:indalloy_140 5184", "gtceu:tairitsu 2592", "gtceu:titansteel 1296", "gtceu:lubricant 7000")
        .itemOutputs("gtlcore:component_assembly_line_casing_uhv").EUt(GTValues.VA[GTValues.UHV]).duration(600)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtlcore:component_assembly_line_casing_uv")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(GTValues.VA[GTValues.UHV]).CWUt(384))

    gtr.assembly_line("gtlcore:component_assembly_line_casing_uev")
        .itemInputs("gtceu:quantanium_frame", "24x gtceu:double_echoite_plate", "4x gtceu:uev_field_generator", "6x gtceu:uev_electric_pump",
            "8x gtceu:uev_robot_arm", "10x gtceu:uev_sensor", "16x gtceu:uev_conveyor_module", "4x gtceu:infuscolium_gear",
            "16x gtceu:small_infuscolium_gear", "4x gtceu:enderite_octal_wire", "8x #gtceu:circuits/uev", "16x #gtceu:circuits/uhv")
        .inputFluids("gtceu:mutated_living_solder 5760", "gtceu:quantum 2880", "gtceu:adamantine 1440", "gtceu:lubricant 8000")
        .itemOutputs("gtlcore:component_assembly_line_casing_uev").EUt(GTValues.VA[GTValues.UEV]).duration(600)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtlcore:component_assembly_line_casing_uhv")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(GTValues.VA[GTValues.UEV]).CWUt(512))

    gtr.assembly_line("gtlcore:component_assembly_line_casing_uiv")
        .itemInputs("gtceu:vibranium_frame", "24x gtceu:double_vibranium_plate", "4x gtceu:uiv_field_generator", "6x gtceu:uiv_electric_pump",
            "8x gtceu:uiv_robot_arm", "10x gtceu:uiv_sensor", "16x gtceu:uiv_conveyor_module", "4x gtceu:hastelloyx_78_gear",
            "16x gtceu:small_hastelloyx_78_gear", "4x gtceu:echoite_octal_wire", "8x #gtceu:circuits/uiv", "16x #gtceu:circuits/uev")
        .inputFluids("gtceu:mutated_living_solder 6336", "gtceu:naquadriatictaranium 3168", "gtceu:flerovium 1584", "gtceu:lubricant 9000")
        .itemOutputs("gtlcore:component_assembly_line_casing_uiv").EUt(GTValues.VA[GTValues.UIV]).duration(600)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtlcore:component_assembly_line_casing_uev")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(GTValues.VA[GTValues.UIV]).CWUt(1024))

    gtr.assembly_line("gtlcore:component_assembly_line_casing_uxv")
        .itemInputs("gtceu:draconium_frame", "24x gtceu:double_draconiumawakened_plate", "4x gtceu:uxv_field_generator", "6x gtceu:uxv_electric_pump",
            "8x gtceu:uxv_robot_arm", "10x gtceu:uxv_sensor", "16x gtceu:uxv_conveyor_module", "4x gtceu:vibramantium_gear",
            "16x gtceu:small_vibramantium_gear", "4x gtceu:legendarium_octal_wire", "8x #gtceu:circuits/uxv", "16x #gtceu:circuits/uiv")
        .inputFluids("gtceu:super_mutated_living_solder 6912", "gtceu:crystalmatrix 3456", "gtceu:quantumchromodynamically_confined_matter 1782",
            "gtceu:lubricant 10000")
        .itemOutputs("gtlcore:component_assembly_line_casing_uxv").EUt(GTValues.VA[GTValues.UXV]).duration(600)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtlcore:component_assembly_line_casing_uiv")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(GTValues.VA[GTValues.UXV]).CWUt(2048))

    gtr.assembly_line("gtlcore:component_assembly_line_casing_opv")
        .itemInputs("gtceu:infinity_frame", "24x gtceu:double_hypogen_plate", "4x gtceu:opv_field_generator", "6x gtceu:opv_electric_pump",
            "8x gtceu:opv_robot_arm", "10x gtceu:opv_sensor", "16x gtceu:opv_conveyor_module", "12x gtceu:celestialtungsten_gear",
            "24x gtceu:astraltitanium_gear", "4x gtceu:draconiumawakened_octal_wire", "8x #gtceu:circuits/opv", "16x #gtceu:circuits/uxv")
        .inputFluids("gtceu:super_mutated_living_solder 7488", "gtceu:white_dwarf_mtter 3744", "gtceu:chaos 1872", "gtceu:lubricant 20000")
        .itemOutputs("gtlcore:component_assembly_line_casing_opv").EUt(GTValues.VA[GTValues.OpV]).duration(600)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtlcore:component_assembly_line_casing_uxv")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(GTValues.VA[GTValues.OpV]).CWUt(8192))

    gtr.assembly_line("gtlcore:component_assembly_line_casing_max")
        .itemInputs("gtceu:eternity_frame", "24x gtceu:double_transcendentmetal_plate", "4x gtlcore:max_field_generator", "6x gtlcore:max_electric_pump",
            "8x gtlcore:max_robot_arm", "10x gtlcore:max_sensor", "16x gtlcore:max_conveyor_module", "8x gtceu:transcendentmetal_gear",
            "4x gtceu:hypogen_octal_wire", "8x #gtceu:circuits/max", "16x #gtceu:circuits/opv")
        .inputFluids("gtceu:spacetime 9216", "gtceu:black_dwarf_mtter 4608", "gtceu:magnetohydrodynamicallyconstrainedstarmatter 1872",
            "gtceu:lubricant 30000")
        .itemOutputs("gtlcore:component_assembly_line_casing_max").EUt(GTValues.VA[GTValues.MAX]).duration(600)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtlcore:component_assembly_line_casing_opv")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(GTValues.VA[GTValues.MAX]).CWUt(16384))

    gtr.assembler("gtlcore:hsss_reinforced_borosilicate_glass")
        .itemInputs("4x gtceu:laminated_glass", "4x gtceu:double_hsss_plate", "32x gtceu:fine_borosilicate_glass_wire")
        .itemOutputs("2x gtlcore:hsss_reinforced_borosilicate_glass").EUt(GTValues.VA[GTValues.LuV]).duration(600)

    gtr.assembly_line("gtceu:component_assembly_line")
        .itemInputs("16x gtceu:advanced_assembly_line", "16x gtceu:assembly_line_casing", "32x gtlcore:advanced_assembly_line_unit",
            "16x gtceu:uv_robot_arm", "32x gtceu:uv_conveyor_module", "32x gtceu:uhv_electric_motor",
            "16x gtceu:polybenzimidazole_huge_fluid_pipe", "64x gtceu:double_mithril_plate", "16x gtceu:uhv_fluid_solidifier",
            "16x #gtceu:circuits/uev", "20x #gtceu:circuits/uhv", "24x #gtceu:circuits/uv")
        .inputFluids("gtceu:indalloy_140 1296", "gtceu:soldering_alloy 1728", "gtceu:naquadria 2304", "gtceu:lubricant 16000")
        .itemOutputs("gtceu:component_assembly_line").EUt(GTValues.VA[GTValues.UHV]).duration(4200)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtlcore:component_assembly_line_casing_ev")).dataStack(Registries.getItemStack("gtceu:data_module")).EUt(GTValues.VA[GTValues.UHV]).CWUt(512))

    batch(gtr, "component_assembly_line", ["itemInputs", ["itemOutputs", "64x gtceu:lv_electric_motor"], ["EUt", GTValues.VA[GTValues.LV]], ["duration", 96], ["addData", "CATier", 1]], [
        ["gtceu:lv_electric_motor_ic",
            ["6x gtceu:tin_hex_cable", "12x gtceu:copper_hex_wire", "48x gtceu:long_iron_rod", "48x gtceu:magnetic_iron_rod"]],
        ["gtceu:lv_electric_motor_sc",
            ["6x gtceu:tin_hex_cable", "12x gtceu:copper_hex_wire", "48x gtceu:long_steel_rod", "48x gtceu:magnetic_steel_rod"]],
        ["gtceu:lv_electric_motor_sac",
            ["6x gtceu:tin_hex_cable", "12x gtceu:annealed_copper_hex_wire", "48x gtceu:long_steel_rod", "48x gtceu:magnetic_steel_rod"]],
        ["gtceu:lv_electric_motor_iac",
            ["6x gtceu:tin_hex_cable", "12x gtceu:annealed_copper_hex_wire", "48x gtceu:long_iron_rod", "48x gtceu:magnetic_iron_rod"]]
    ]);

    batch(gtr, "component_assembly_line", [
        ["itemInputs", "48x gtceu:tin_rotor", "48x gtceu:tin_screw", "48x gtceu:bronze_normal_fluid_pipe", "48x gtceu:lv_electric_motor",
            "3x gtceu:tin_hex_cable"], "inputFluids", ["itemOutputs", "64x gtceu:lv_electric_pump"], ["EUt", GTValues.VA[GTValues.LV]],
        ["duration", 96], ["addData", "CATier", 1]], [
        ["gtceu:lv_electric_pump_sr", ["gtceu:silicone_rubber 3456"]],
        ["gtceu:lv_electric_pump_sbr", ["gtceu:styrene_butadiene_rubber 3456"]],
        ["gtceu:lv_electric_pump_rubber", ["gtceu:rubber 3456"]]
    ]);

    batch(gtr, "component_assembly_line", ["itemInputs", "itemOutputs", ["EUt", GTValues.VA[GTValues.LV]], ["duration", 96], ["addData", "CATier", 1]], [
        ["gtceu:lv_conveyor_module_rubber", ["288x gtceu:rubber_plate", "96x gtceu:lv_electric_motor", "3x gtceu:tin_hex_cable"],
            ["64x gtceu:lv_conveyor_module"]],
        ["gtceu:lv_conveyor_module_sbr", ["288x gtceu:styrene_butadiene_rubber_plate", "96x gtceu:lv_electric_motor", "3x gtceu:tin_hex_cable"],
            ["64x gtceu:lv_conveyor_module"]],
        ["gtceu:lv_conveyor_module_sr", ["288x gtceu:silicone_rubber_plate", "96x gtceu:lv_electric_motor", "3x gtceu:tin_hex_cable"],
            ["64x gtceu:lv_conveyor_module"]],
        ["gtceu:lv_electric_piston",
            ["48x gtceu:lv_electric_motor", "48x gtceu:long_steel_rod", "16x gtceu:dense_steel_plate", "12x gtceu:steel_gear",
                "6x gtceu:tin_hex_cable"], ["64x gtceu:lv_electric_piston"]],
        ["gtceu:lv_robot_arm",
            ["96x gtceu:lv_electric_motor", "48x gtceu:lv_electric_piston", "48x gtceu:long_steel_rod", "48x #gtceu:circuits/lv",
                "9x gtceu:tin_hex_cable"], ["64x gtceu:lv_robot_arm"]]
    ]);

    batch(gtr, "component_assembly_line", ["itemInputs", "inputFluids", "itemOutputs", ["EUt", GTValues.VA[GTValues.LV]], ["duration", 96], ["addData", "CATier", 1]], [
        ["gtceu:lv_field_generator", ["96x #gtceu:circuits/lv", "96x gtceu:steel_plate", "48x minecraft:ender_pearl"],
            ["gtceu:manganese_phosphide 55296"], ["64x gtceu:lv_field_generator"]],
        ["gtceu:lv_emitter", ["96x #gtceu:circuits/lv", "48x gtceu:quartzite_gem", "6x gtceu:tin_hex_cable"], ["gtceu:brass 13824"],
            ["64x gtceu:lv_emitter"]]
    ]);

    batch(gtr, "component_assembly_line", ["itemInputs", "itemOutputs", "EUt", ["duration", 96], "addData"], [
        ["gtceu:lv_sensor", ["48x #gtceu:circuits/lv", "48x gtceu:quartzite_gem", "24x gtceu:long_brass_rod", "21x gtceu:dense_steel_plate"],
            ["64x gtceu:lv_sensor"], [GTValues.VA[GTValues.LV]], ["CATier", 1]],
        ["gtceu:mv_electric_motor_ac",
            ["48x gtceu:long_aluminium_rod", "24x gtceu:cupronickel_hex_wire", "48x gtceu:magnetic_steel_rod", "6x gtceu:copper_hex_cable"],
            ["64x gtceu:mv_electric_motor"], [GTValues.VA[GTValues.MV]], ["CATier", 2]],
        ["gtceu:mv_electric_motor_c",
            ["48x gtceu:long_aluminium_rod", "24x gtceu:cupronickel_hex_wire", "48x gtceu:magnetic_steel_rod", "6x gtceu:annealed_copper_hex_cable"],
            ["64x gtceu:mv_electric_motor"], [GTValues.VA[GTValues.MV]], ["CATier", 2]]
    ]);

    batch(gtr, "component_assembly_line", [
        ["itemInputs", "48x gtceu:bronze_rotor", "48x gtceu:bronze_screw", "48x gtceu:steel_normal_fluid_pipe", "48x gtceu:mv_electric_motor",
            "3x gtceu:copper_hex_cable"], "inputFluids", ["itemOutputs", "64x gtceu:mv_electric_pump"], ["EUt", GTValues.VA[GTValues.MV]],
        ["duration", 96], ["addData", "CATier", 2]], [
        ["gtceu:mv_electric_pump_sr", ["gtceu:silicone_rubber 3456"]],
        ["gtceu:mv_electric_pump_sbr", ["gtceu:styrene_butadiene_rubber 3456"]],
        ["gtceu:mv_electric_pump_rubber", ["gtceu:rubber 3456"]]
    ]);

    batch(gtr, "component_assembly_line", ["itemInputs", "itemOutputs", ["EUt", GTValues.VA[GTValues.MV]], ["duration", 96], ["addData", "CATier", 2]], [
        ["gtceu:mv_conveyor_module_rubber", ["288x gtceu:rubber_plate", "96x gtceu:mv_electric_motor", "3x gtceu:copper_hex_cable"],
            ["64x gtceu:mv_conveyor_module"]],
        ["gtceu:mv_conveyor_module_sbr", ["288x gtceu:styrene_butadiene_rubber_plate", "96x gtceu:mv_electric_motor", "3x gtceu:copper_hex_cable"],
            ["64x gtceu:mv_conveyor_module"]],
        ["gtceu:mv_conveyor_module_sr", ["288x gtceu:silicone_rubber_plate", "96x gtceu:mv_electric_motor", "3x gtceu:copper_hex_cable"],
            ["64x gtceu:mv_conveyor_module"]],
        ["gtceu:mv_electric_piston",
            ["72x gtceu:double_aluminium_plate", "48x gtceu:mv_electric_motor", "48x gtceu:long_aluminium_rod", "12x gtceu:aluminium_gear",
                "6x gtceu:copper_hex_cable"], ["64x gtceu:mv_electric_piston"]],
        ["gtceu:mv_robot_arm",
            ["96x gtceu:mv_electric_motor", "48x gtceu:mv_electric_piston", "48x gtceu:long_aluminium_rod", "48x #gtceu:circuits/mv",
                "9x gtceu:copper_hex_cable"], ["64x gtceu:mv_robot_arm"]]
    ]);

    batch(gtr, "component_assembly_line", ["itemInputs", "inputFluids", "itemOutputs", ["EUt", GTValues.VA[GTValues.MV]], ["duration", 96], ["addData", "CATier", 2]], [
        ["gtceu:mv_field_generator", ["96x #gtceu:circuits/mv", "96x gtceu:aluminium_plate", "48x minecraft:ender_eye"],
            ["gtceu:magnesium_diboride 55296"], ["64x gtceu:mv_field_generator"]],
        ["gtceu:mv_emitter", ["96x #gtceu:circuits/mv", "48x gtceu:flawless_emerald_gem", "6x gtceu:copper_hex_cable"], ["gtceu:electrum 13824"],
            ["64x gtceu:mv_emitter"]]
    ]);

    batch(gtr, "component_assembly_line", ["itemInputs", "itemOutputs", "EUt", ["duration", 96], "addData"], [
        ["gtceu:mv_sensor",
            ["96x gtceu:double_aluminium_plate", "48x #gtceu:circuits/mv", "48x gtceu:flawless_emerald_gem", "24x gtceu:long_electrum_rod"],
            ["64x gtceu:mv_sensor"], [GTValues.VA[GTValues.MV]], ["CATier", 2]],
        ["gtceu:hv_electric_motor",
            ["48x gtceu:long_stainless_steel_rod", "24x gtceu:electrum_hex_wire", "48x gtceu:magnetic_steel_rod", "12x gtceu:silver_hex_cable"],
            ["64x gtceu:hv_electric_motor"], [GTValues.VA[GTValues.HV]], ["CATier", 3]]
    ]);

    batch(gtr, "component_assembly_line", [
        ["itemInputs", "48x gtceu:steel_rotor", "48x gtceu:steel_screw", "48x gtceu:stainless_steel_normal_fluid_pipe", "48x gtceu:hv_electric_motor",
            "3x gtceu:gold_hex_cable"], "inputFluids", ["itemOutputs", "64x gtceu:hv_electric_pump"], ["EUt", GTValues.VA[GTValues.HV]],
        ["duration", 96], ["addData", "CATier", 3]], [
        ["gtceu:hv_electric_pump_sr", ["gtceu:silicone_rubber 3456"]],
        ["gtceu:hv_electric_pump_sbr", ["gtceu:styrene_butadiene_rubber 3456"]],
        ["gtceu:hv_electric_pump_rubber", ["gtceu:rubber 3456"]]
    ]);

    batch(gtr, "component_assembly_line", ["itemInputs", "itemOutputs", ["EUt", GTValues.VA[GTValues.HV]], ["duration", 96], ["addData", "CATier", 3]], [
        ["gtceu:hv_conveyor_module_rubber", ["288x gtceu:rubber_plate", "96x gtceu:hv_electric_motor", "3x gtceu:gold_hex_cable"],
            ["64x gtceu:hv_conveyor_module"]],
        ["gtceu:hv_conveyor_module_sbr", ["288x gtceu:styrene_butadiene_rubber_plate", "96x gtceu:hv_electric_motor", "3x gtceu:gold_hex_cable"],
            ["64x gtceu:hv_conveyor_module"]],
        ["gtceu:hv_conveyor_module_sr", ["288x gtceu:silicone_rubber_plate", "96x gtceu:hv_electric_motor", "3x gtceu:gold_hex_cable"],
            ["64x gtceu:hv_conveyor_module"]],
        ["gtceu:hv_electric_piston",
            ["72x gtceu:double_stainless_steel_plate", "48x gtceu:hv_electric_motor", "48x gtceu:long_stainless_steel_rod",
                "12x gtceu:stainless_steel_gear", "6x gtceu:gold_hex_cable"], ["64x gtceu:hv_electric_piston"]],
        ["gtceu:hv_robot_arm",
            ["96x gtceu:hv_electric_motor", "48x gtceu:hv_electric_piston", "48x gtceu:long_stainless_steel_rod", "48x #gtceu:circuits/hv",
                "9x gtceu:gold_hex_cable"], ["64x gtceu:hv_robot_arm"]]
    ]);

    batch(gtr, "component_assembly_line", ["itemInputs", "inputFluids", "itemOutputs", ["EUt", GTValues.VA[GTValues.HV]], ["duration", 96], ["addData", "CATier", 3]], [
        ["gtceu:hv_field_generator", ["96x #gtceu:circuits/hv", "96x gtceu:stainless_steel_plate", "48x gtceu:quantum_eye"],
            ["gtceu:mercury_barium_calcium_cuprate 55296"], ["64x gtceu:hv_field_generator"]],
        ["gtceu:hv_emitter", ["96x #gtceu:circuits/hv", "48x minecraft:ender_eye", "6x gtceu:gold_hex_cable"], ["gtceu:chromium 13824"],
            ["64x gtceu:hv_emitter"]]
    ]);

    batch(gtr, "component_assembly_line", ["itemInputs", "itemOutputs", "EUt", ["duration", 96], "addData"], [
        ["gtceu:hv_sensor", ["96x gtceu:double_stainless_steel_plate", "48x #gtceu:circuits/hv", "48x minecraft:ender_eye", "48x gtceu:chromium_rod"],
            ["64x gtceu:hv_sensor"], [GTValues.VA[GTValues.HV]], ["CATier", 3]],
        ["gtceu:ev_electric_motor",
            ["48x gtceu:long_titanium_rod", "24x gtceu:kanthal_hex_wire", "48x gtceu:magnetic_neodymium_rod", "12x gtceu:aluminium_hex_cable"],
            ["64x gtceu:ev_electric_motor"], [GTValues.VA[GTValues.EV]], ["CATier", 4]]
    ]);

    batch(gtr, "component_assembly_line", [
        ["itemInputs", "48x gtceu:stainless_steel_rotor", "48x gtceu:stainless_steel_screw", "48x gtceu:titanium_normal_fluid_pipe",
            "48x gtceu:ev_electric_motor", "3x gtceu:aluminium_hex_cable"], "inputFluids", ["itemOutputs", "64x gtceu:ev_electric_pump"],
        ["EUt", GTValues.VA[GTValues.EV]], ["duration", 96], ["addData", "CATier", 4]], [
        ["gtceu:ev_electric_pump_sr", ["gtceu:silicone_rubber 3456"]],
        ["gtceu:ev_electric_pump_sbr", ["gtceu:styrene_butadiene_rubber 3456"]],
        ["gtceu:ev_electric_pump_rubber", ["gtceu:rubber 3456"]]
    ]);

    batch(gtr, "component_assembly_line", ["itemInputs", "itemOutputs", ["EUt", GTValues.VA[GTValues.EV]], ["duration", 96], ["addData", "CATier", 4]], [
        ["gtceu:ev_conveyor_module_rubber", ["288x gtceu:rubber_plate", "96x gtceu:ev_electric_motor", "3x gtceu:aluminium_hex_cable"],
            ["64x gtceu:ev_conveyor_module"]],
        ["gtceu:ev_conveyor_module_sbr", ["288x gtceu:styrene_butadiene_rubber_plate", "96x gtceu:ev_electric_motor", "3x gtceu:aluminium_hex_cable"],
            ["64x gtceu:ev_conveyor_module"]],
        ["gtceu:ev_conveyor_module_sr", ["288x gtceu:silicone_rubber_plate", "96x gtceu:ev_electric_motor", "3x gtceu:aluminium_hex_cable"],
            ["64x gtceu:ev_conveyor_module"]],
        ["gtceu:ev_electric_piston",
            ["72x gtceu:double_titanium_plate", "48x gtceu:ev_electric_motor", "48x gtceu:long_titanium_rod", "12x gtceu:titanium_gear",
                "6x gtceu:aluminium_hex_cable"], ["64x gtceu:ev_electric_piston"]],
        ["gtceu:ev_robot_arm",
            ["96x gtceu:ev_electric_motor", "48x gtceu:ev_electric_piston", "48x gtceu:long_titanium_rod", "48x #gtceu:circuits/ev",
                "9x gtceu:aluminium_hex_cable"], ["64x gtceu:ev_robot_arm"]]
    ]);

    batch(gtr, "component_assembly_line", ["itemInputs", "inputFluids", "itemOutputs", ["EUt", GTValues.VA[GTValues.EV]], ["duration", 96], ["addData", "CATier", 4]], [
        ["gtceu:ev_field_generator", ["96x #gtceu:circuits/ev", "96x gtceu:double_titanium_plate", "48x minecraft:nether_star"],
            ["gtceu:uranium_triplatinum 55296"], ["64x gtceu:ev_field_generator"]],
        ["gtceu:ev_emitter", ["96x #gtceu:circuits/ev", "48x gtceu:quantum_eye", "6x gtceu:aluminium_hex_cable"], ["gtceu:platinum 13824"],
            ["64x gtceu:ev_emitter"]]
    ]);

    batch(gtr, "component_assembly_line", ["itemInputs", "itemOutputs", "EUt", ["duration", 96], "addData"], [
        ["gtceu:ev_sensor", ["96x gtceu:double_titanium_plate", "48x #gtceu:circuits/ev", "48x gtceu:quantum_eye", "24x gtceu:long_platinum_rod"],
            ["64x gtceu:ev_sensor"], [GTValues.VA[GTValues.EV]], ["CATier", 4]],
        ["gtceu:iv_electric_motor",
            ["48x gtceu:long_tungsten_steel_rod", "24x gtceu:graphene_hex_wire", "48x gtceu:magnetic_neodymium_rod", "12x gtceu:tungsten_hex_cable"],
            ["64x gtceu:iv_electric_motor"], [GTValues.VA[GTValues.IV]], ["CATier", 5]]
    ]);

    batch(gtr, "component_assembly_line", [
        ["itemInputs", "48x gtceu:tungsten_steel_rotor", "48x gtceu:tungsten_steel_screw", "48x gtceu:tungsten_steel_normal_fluid_pipe",
            "48x gtceu:iv_electric_motor", "3x gtceu:tungsten_hex_cable"], "inputFluids", ["itemOutputs", "64x gtceu:iv_electric_pump"],
        ["EUt", GTValues.VA[GTValues.IV]], ["duration", 96], ["addData", "CATier", 5]], [
        ["gtceu:iv_electric_pump_sr", ["gtceu:silicone_rubber 3456"]],
        ["gtceu:iv_electric_pump_sbr", ["gtceu:styrene_butadiene_rubber 3456"]]
    ]);

    batch(gtr, "component_assembly_line", ["itemInputs", "itemOutputs", ["EUt", GTValues.VA[GTValues.IV]], ["duration", 96], ["addData", "CATier", 5]], [
        ["gtceu:iv_conveyor_module_sbr", ["288x gtceu:styrene_butadiene_rubber_plate", "96x gtceu:iv_electric_motor", "3x gtceu:tungsten_hex_cable"],
            ["64x gtceu:iv_conveyor_module"]],
        ["gtceu:iv_conveyor_module_sr", ["288x gtceu:silicone_rubber_plate", "96x gtceu:iv_electric_motor", "3x gtceu:tungsten_hex_cable"],
            ["64x gtceu:iv_conveyor_module"]],
        ["gtceu:iv_electric_piston",
            ["48x gtceu:iv_electric_motor", "48x gtceu:long_tungsten_steel_rod", "16x gtceu:dense_tungsten_steel_plate",
                "12x gtceu:tungsten_steel_gear", "6x gtceu:tungsten_hex_cable"], ["64x gtceu:iv_electric_piston"]],
        ["gtceu:iv_robot_arm",
            ["96x gtceu:iv_electric_motor", "48x gtceu:iv_electric_piston", "48x gtceu:long_tungsten_steel_rod", "48x #gtceu:circuits/iv",
                "9x gtceu:tungsten_hex_cable"], ["64x gtceu:iv_robot_arm"]]
    ]);

    batch(gtr, "component_assembly_line", ["itemInputs", "inputFluids", "itemOutputs", ["EUt", GTValues.VA[GTValues.IV]], ["duration", 96], ["addData", "CATier", 5]], [
        ["gtceu:iv_field_generator", ["96x #gtceu:circuits/iv", "96x gtceu:double_tungsten_steel_plate", "48x gtceu:quantum_star"],
            ["gtceu:samarium_iron_arsenic_oxide 55296"], ["64x gtceu:iv_field_generator"]],
        ["gtceu:iv_emitter", ["96x #gtceu:circuits/iv", "48x gtceu:quantum_star", "6x gtceu:tungsten_hex_cable"], ["gtceu:iridium 13824"],
            ["64x gtceu:iv_emitter"]]
    ]);

    gtr.component_assembly_line("gtceu:iv_sensor")
        .itemInputs("48x #gtceu:circuits/iv", "48x gtceu:quantum_star", "24x gtceu:long_iridium_rod", "21x gtceu:dense_tungsten_steel_plate")
        .itemOutputs("64x gtceu:iv_sensor").EUt(GTValues.VA[GTValues.IV]).duration(96).addData("CATier", 5)

    batch(gtr, "component_assembly_line", ["circuit", "itemInputs", "inputFluids", "itemOutputs", ["EUt", GTValues.VA[GTValues.LuV]], ["duration", 720], ["addData", "CATier", 6]], [
        ["gtceu:luv_electric_motor", [1], ["48x gtceu:long_magnetic_samarium_rod", "6x gtceu:niobium_titanium_hex_cable"],
            ["gtceu:soldering_alloy 6912", "gtceu:lubricant 12000", "gtceu:hsss 20352", "gtceu:ruthenium 36864", "gtceu:iridium 18432"],
            ["64x gtceu:luv_electric_motor"]],
        ["gtceu:luv_electric_pump", [3], ["48x gtceu:double_hsss_plate", "48x gtceu:luv_electric_motor", "6x gtceu:niobium_titanium_hex_cable"],
            ["gtceu:soldering_alloy 6912", "gtceu:lubricant 12000", "gtceu:silicone_rubber 6912", "gtceu:niobium_titanium 6912", "gtceu:hsss 34560"],
            ["64x gtceu:luv_electric_pump"]],
        ["gtceu:luv_conveyor_module", [5], ["96x gtceu:luv_electric_motor", "48x gtceu:double_hsss_plate", "6x gtceu:niobium_titanium_hex_cable"],
            ["gtceu:soldering_alloy 6912", "gtceu:lubricant 12000", "gtceu:styrene_butadiene_rubber 55296", "gtceu:hsss 22272"],
            ["64x gtceu:luv_conveyor_module"]],
        ["gtceu:luv_electric_piston", [2], ["48x gtceu:luv_electric_motor", "96x gtceu:double_hsss_plate", "6x gtceu:niobium_titanium_hex_cable"],
            ["gtceu:soldering_alloy 6912", "gtceu:lubricant 12000", "gtceu:hsss 74496"], ["64x gtceu:luv_electric_piston"]],
        ["gtceu:luv_robot_arm", [4],
            ["192x #gtceu:circuits/ev", "96x #gtceu:circuits/iv", "96x gtceu:luv_electric_motor", "48x gtceu:luv_electric_piston",
                "48x #gtceu:circuits/luv", "12x gtceu:niobium_titanium_hex_cable"],
            ["gtceu:soldering_alloy 27648", "gtceu:lubricant 12000", "gtceu:hsss 76032"], ["64x gtceu:luv_robot_arm"]]
    ]);

    gtr.component_assembly_line("gtceu:luv_field_generator")
        .itemInputs("144x gtceu:double_hsss_plate", "96x #gtceu:circuits/luv", "96x gtceu:luv_emitter", "48x gtceu:quantum_star", "48x gtceu:hsss_frame",
            "12x gtceu:niobium_titanium_hex_cable")
        .inputFluids("gtceu:soldering_alloy 27648", "gtceu:indium_tin_barium_titanium_cuprate 110592")
        .itemOutputs("64x gtceu:luv_field_generator").EUt(GTValues.VA[GTValues.LuV]).duration(720).addData("CATier", 6)

    batch(gtr, "component_assembly_line", ["circuit", "itemInputs", "inputFluids", "itemOutputs", "EUt", ["duration", 720], "addData"], [
        ["gtceu:luv_emitter", [6],
            ["96x #gtceu:circuits/luv", "48x gtceu:luv_electric_motor", "48x gtceu:quantum_star", "48x gtceu:hsss_frame",
                "12x gtceu:niobium_titanium_hex_cable"],
            ["gtceu:soldering_alloy 13824", "gtceu:palladium 165888", "gtceu:ruthenium 18432", "gtceu:iridium 9216"], ["64x gtceu:luv_emitter"],
            [GTValues.VA[GTValues.LuV]], ["CATier", 6]],
        ["gtceu:luv_sensor", [7],
            ["96x #gtceu:circuits/luv", "96x gtceu:double_ruridit_plate", "48x gtceu:luv_electric_motor", "48x gtceu:quantum_star",
                "48x gtceu:hsss_frame", "12x gtceu:niobium_titanium_hex_cable"], ["gtceu:soldering_alloy 13824", "gtceu:palladium 165888"],
            ["64x gtceu:luv_sensor"], [GTValues.VA[GTValues.LuV]], ["CATier", 6]],
        ["gtceu:zpm_electric_motor", [1], ["48x gtceu:long_magnetic_samarium_rod", "6x gtceu:vanadium_gallium_hex_cable"],
            ["gtceu:soldering_alloy 13824", "gtceu:lubricant 24000", "gtceu:europium 82944", "gtceu:osmiridium 40704"],
            ["64x gtceu:zpm_electric_motor"], [GTValues.VA[GTValues.ZPM]], ["CATier", 7]],
        ["gtceu:zpm_electric_pump", [3], ["48x gtceu:double_osmiridium_plate", "48x gtceu:zpm_electric_motor", "6x gtceu:vanadium_gallium_hex_cable"],
            ["gtceu:soldering_alloy 13824", "gtceu:lubricant 24000", "gtceu:silicone_rubber 13824", "gtceu:polybenzimidazole 20736",
                "gtceu:osmiridium 33792"], ["64x gtceu:zpm_electric_pump"], [GTValues.VA[GTValues.ZPM]], ["CATier", 7]],
        ["gtceu:zpm_conveyor_module", [5],
            ["96x gtceu:zpm_electric_motor", "48x gtceu:double_osmiridium_plate", "6x gtceu:vanadium_gallium_hex_cable"],
            ["gtceu:soldering_alloy 13824", "gtceu:lubricant 24000", "gtceu:styrene_butadiene_rubber 110592", "gtceu:osmiridium 22272"],
            ["64x gtceu:zpm_conveyor_module"], [GTValues.VA[GTValues.ZPM]], ["CATier", 7]],
        ["gtceu:zpm_electric_piston", [2],
            ["48x gtceu:zpm_electric_motor", "96x gtceu:double_osmiridium_plate", "6x gtceu:vanadium_gallium_hex_cable"],
            ["gtceu:soldering_alloy 13824", "gtceu:lubricant 24000", "gtceu:osmiridium 74496"], ["64x gtceu:zpm_electric_piston"],
            [GTValues.VA[GTValues.ZPM]], ["CATier", 7]],
        ["gtceu:zpm_robot_arm", [4],
            ["192x #gtceu:circuits/iv", "96x #gtceu:circuits/luv", "96x gtceu:zpm_electric_motor", "48x gtceu:zpm_electric_piston",
                "48x #gtceu:circuits/zpm", "12x gtceu:vanadium_gallium_hex_cable"],
            ["gtceu:soldering_alloy 55296", "gtceu:lubricant 24000", "gtceu:osmiridium 76032"], ["64x gtceu:zpm_robot_arm"],
            [GTValues.VA[GTValues.ZPM]], ["CATier", 7]]
    ]);

    gtr.component_assembly_line("gtceu:zpm_field_generator")
        .itemInputs("144x gtceu:double_naquadah_alloy_plate", "96x #gtceu:circuits/zpm", "96x gtceu:zpm_emitter", "48x gtceu:quantum_star",
            "48x gtceu:naquadah_alloy_frame", "12x gtceu:vanadium_gallium_hex_cable")
        .inputFluids("gtceu:soldering_alloy 55296", "gtceu:uranium_rhodium_dinaquadide 110592").itemOutputs("64x gtceu:zpm_field_generator")
        .EUt(GTValues.VA[GTValues.ZPM]).duration(720).addData("CATier", 7)

    batch(gtr, "component_assembly_line", ["circuit", "itemInputs", "inputFluids", "itemOutputs", "EUt", ["duration", 720], "addData"], [
        ["gtceu:zpm_emitter", [6],
            ["96x #gtceu:circuits/zpm", "48x gtceu:zpm_electric_motor", "96x gtceu:quantum_star", "48x gtceu:naquadah_alloy_frame",
                "12x gtceu:vanadium_gallium_hex_cable"], ["gtceu:soldering_alloy 27648", "gtceu:trinium 165888", "gtceu:osmiridium 27648"],
            ["64x gtceu:zpm_emitter"], [GTValues.VA[GTValues.ZPM]], ["CATier", 7]],
        ["gtceu:zpm_sensor", [7],
            ["96x #gtceu:circuits/zpm", "96x gtceu:double_osmiridium_plate", "48x gtceu:zpm_electric_motor", "96x gtceu:quantum_star",
                "48x gtceu:naquadah_alloy_frame", "12x gtceu:vanadium_gallium_hex_cable"], ["gtceu:soldering_alloy 27648", "gtceu:trinium 165888"],
            ["64x gtceu:zpm_sensor"], [GTValues.VA[GTValues.ZPM]], ["CATier", 7]],
        ["gtceu:uv_electric_motor", [1], ["6x gtceu:yttrium_barium_cuprate_hex_cable"],
            ["gtceu:soldering_alloy 27648", "gtceu:lubricant 32000", "gtceu:americium 110592", "gtceu:tritanium 40704", "gtceu:naquadria 27648",
                "gtceu:samarium 6912"], ["64x gtceu:uv_electric_motor"], [GTValues.VA[GTValues.UV]], ["CATier", 8]],
        ["gtceu:uv_electric_pump", [3],
            ["288x gtceu:naquadah_plate", "48x gtceu:double_tritanium_plate", "48x gtceu:uv_electric_motor",
                "6x gtceu:yttrium_barium_cuprate_hex_cable"],
            ["gtceu:soldering_alloy 27648", "gtceu:lubricant 32000", "gtceu:silicone_rubber 27648", "gtceu:tritanium 6144", "gtceu:naquadria 27648",
                "gtceu:naquadah_alloy 27648"], ["64x gtceu:uv_electric_pump"], [GTValues.VA[GTValues.UV]], ["CATier", 8]],
        ["gtceu:uv_conveyor_module", [5],
            ["96x gtceu:uv_electric_motor", "48x gtceu:double_tritanium_plate", "6x gtceu:yttrium_barium_cuprate_hex_cable"],
            ["gtceu:soldering_alloy 27648", "gtceu:lubricant 32000", "gtceu:styrene_butadiene_rubber 165888", "gtceu:tritanium 22272",
                "gtceu:naquadria 27648"], ["64x gtceu:uv_conveyor_module"], [GTValues.VA[GTValues.UV]], ["CATier", 8]],
        ["gtceu:uv_electric_piston", [2],
            ["48x gtceu:uv_electric_motor", "96x gtceu:double_tritanium_plate", "6x gtceu:yttrium_barium_cuprate_hex_cable"],
            ["gtceu:soldering_alloy 27648", "gtceu:lubricant 32000", "gtceu:tritanium 33024", "gtceu:naquadah_alloy 41472", "gtceu:naquadria 27648"],
            ["64x gtceu:uv_electric_piston"], [GTValues.VA[GTValues.UV]], ["CATier", 8]],
        ["gtceu:uv_robot_arm", [4],
            ["192x #gtceu:circuits/luv", "96x #gtceu:circuits/zpm", "96x gtceu:uv_electric_motor", "48x gtceu:uv_electric_piston",
                "48x #gtceu:circuits/uv", "12x gtceu:yttrium_barium_cuprate_hex_cable"],
            ["gtceu:soldering_alloy 82944", "gtceu:lubricant 32000", "gtceu:tritanium 76032", "gtceu:naquadria 27648"], ["64x gtceu:uv_robot_arm"],
            [GTValues.VA[GTValues.UV]], ["CATier", 8]]
    ]);

    gtr.component_assembly_line("gtceu:uv_field_generator")
        .itemInputs("144x gtceu:double_tritanium_plate", "96x #gtceu:circuits/uv", "96x gtceu:uv_emitter", "48x gtceu:gravi_star",
            "48x gtceu:tritanium_frame", "12x gtceu:yttrium_barium_cuprate_hex_cable")
        .inputFluids("gtceu:soldering_alloy 82944", "gtceu:enriched_naquadah_trinium_europium_duranide 110592", "gtceu:naquadria 27648")
        .itemOutputs("64x gtceu:uv_field_generator").EUt(GTValues.VA[GTValues.UV]).duration(720).addData("CATier", 8)

    batch(gtr, "component_assembly_line", ["circuit", "itemInputs", "inputFluids", "itemOutputs", "EUt", "duration", "addData"], [
        ["gtceu:uv_emitter", [6],
            ["96x #gtceu:circuits/uv", "48x gtceu:uv_electric_motor", "48x gtceu:gravi_star", "48x gtceu:tritanium_frame",
                "12x gtceu:yttrium_barium_cuprate_hex_cable"], ["gtceu:soldering_alloy 55296", "gtceu:tritanium 27648", "gtceu:naquadria 193536"],
            ["64x gtceu:uv_emitter"], [GTValues.VA[GTValues.UV]], [720], ["CATier", 8]],
        ["gtceu:uv_sensor", [7],
            ["96x #gtceu:circuits/uv", "96x gtceu:double_tritanium_plate", "48x gtceu:uv_electric_motor", "48x gtceu:gravi_star",
                "48x gtceu:tritanium_frame", "12x gtceu:yttrium_barium_cuprate_hex_cable"], ["gtceu:soldering_alloy 55296", "gtceu:naquadria 193536"],
            ["64x gtceu:uv_sensor"], [GTValues.VA[GTValues.UV]], [720], ["CATier", 8]],
        ["gtceu:uhv_electric_motor", [1], ["48x kubejs:magnetic_long_netherite_rod", "6x gtceu:europium_hex_cable"],
            ["gtceu:mutated_living_solder 24000", "gtceu:soldering_alloy 48000", "gtceu:lubricant 96000", "gtceu:abyssalalloy 110592",
                "gtceu:highurabilityompoundteel 27648", "gtceu:orichalcum 40704"], ["64x gtceu:uhv_electric_motor"], [GTValues.VA[GTValues.UHV]],
            [1200], ["CATier", 9]],
        ["gtceu:uhv_electric_pump", [3], ["48x gtceu:double_orichalcum_plate", "48x gtceu:uhv_electric_motor", "6x gtceu:europium_hex_cable"],
            ["gtceu:mutated_living_solder 27648", "gtceu:soldering_alloy 55296", "gtceu:lubricant 96000", "gtceu:styrene_butadiene_rubber 6912",
                "gtceu:orichalcum 33792", "gtceu:highurabilityompoundteel 27648", "gtceu:neutronium 6912"], ["64x gtceu:uhv_electric_pump"],
            [GTValues.VA[GTValues.UHV]], [1200], ["CATier", 9]],
        ["gtceu:uhv_conveyor_module", [5], ["96x gtceu:uhv_electric_motor", "48x gtceu:double_orichalcum_plate", "6x gtceu:europium_hex_cable"],
            ["gtceu:mutated_living_solder 27648", "gtceu:lubricant 96000", "gtceu:styrene_butadiene_rubber 221184", "gtceu:orichalcum 22272",
                "gtceu:highurabilityompoundteel 27648", "gtceu:fluxed_electrum 13824"], ["64x gtceu:uhv_conveyor_module"], [GTValues.VA[GTValues.UHV]],
            [1200], ["CATier", 9]],
        ["gtceu:uhv_electric_piston", [2], ["48x gtceu:uhv_electric_motor", "96x gtceu:double_orichalcum_plate", "6x gtceu:europium_hex_cable"],
            ["gtceu:mutated_living_solder 27648", "gtceu:soldering_alloy 55296", "gtceu:lubricant 96000", "gtceu:orichalcum 74496",
                "gtceu:highurabilityompoundteel 27648"], ["64x gtceu:uhv_electric_piston"], [GTValues.VA[GTValues.UHV]], [1200], ["CATier", 9]],
        ["gtceu:uhv_robot_arm", [4],
            ["192x #gtceu:circuits/zpm", "96x #gtceu:circuits/uv", "96x gtceu:uhv_electric_motor", "48x gtceu:uhv_electric_piston",
                "48x #gtceu:circuits/uhv", "12x gtceu:europium_hex_cable"],
            ["gtceu:mutated_living_solder 27648", "gtceu:soldering_alloy 55296", "gtceu:lubricant 96000", "gtceu:orichalcum 76032",
                "gtceu:highurabilityompoundteel 27648"], ["64x gtceu:uhv_robot_arm"], [GTValues.VA[GTValues.UHV]], [1200], ["CATier", 9]]
    ]);

    gtr.component_assembly_line("gtceu:uhv_field_generator")
        .itemInputs("144x gtceu:double_neutronium_plate", "96x #gtceu:circuits/uhv", "96x gtceu:uhv_emitter", "96x gtceu:gravi_star",
            "48x gtceu:neutronium_frame", "12x gtceu:europium_hex_cable")
        .inputFluids("gtceu:mutated_living_solder 55296", "gtceu:ruthenium_trinium_americium_neutronate 110592", "gtceu:highurabilityompoundteel 27648")
        .itemOutputs("64x gtceu:uhv_field_generator").EUt(GTValues.VA[GTValues.UHV]).duration(1200).addData("CATier", 9)

    batch(gtr, "component_assembly_line", ["circuit", "itemInputs", "inputFluids", "itemOutputs", "EUt", ["duration", 1200], "addData"], [
        ["gtceu:uhv_emitter", [6],
            ["96x #gtceu:circuits/uhv", "48x gtceu:uhv_electric_motor", "96x gtceu:gravi_star", "48x gtceu:neutronium_frame",
                "12x gtceu:europium_hex_cable"],
            ["gtceu:mutated_living_solder 55296", "gtceu:soldering_alloy 110592", "gtceu:orichalcum 27648", "gtceu:abyssalalloy 110492",
                "gtceu:fluxed_electrum 110592", "gtceu:highurabilityompoundteel 27648"], ["64x gtceu:uhv_emitter"], [GTValues.VA[GTValues.UHV]],
            ["CATier", 9]],
        ["gtceu:uhv_sensor", [7],
            ["96x #gtceu:circuits/uhv", "96x gtceu:double_orichalcum_plate", "48x gtceu:uhv_electric_motor", "96x gtceu:gravi_star",
                "48x gtceu:neutronium_frame", "12x gtceu:europium_hex_cable"],
            ["gtceu:mutated_living_solder 55296", "gtceu:soldering_alloy 11092", "gtceu:abyssalalloy 110492", "gtceu:fluxed_electrum 110592",
                "gtceu:highurabilityompoundteel 27648"], ["64x gtceu:uhv_sensor"], [GTValues.VA[GTValues.UHV]], ["CATier", 9]],
        ["gtceu:uev_electric_motor", [1], ["48x kubejs:magnetic_long_netherite_rod", "6x gtceu:mithril_hex_cable"],
            ["gtceu:mutated_living_solder 48000", "gtceu:soldering_alloy 96000", "gtceu:lubricant 192000", "gtceu:titansteel 110592",
                "gtceu:bohrium 27648", "gtceu:hastelloyx_78 40704"], ["64x gtceu:uev_electric_motor"], [GTValues.VA[GTValues.UEV]], ["CATier", 10]],
        ["gtceu:uev_electric_pump", [3], ["48x gtceu:double_hastelloyx_78_plate", "48x gtceu:uev_electric_motor", "6x gtceu:mithril_hex_cable"],
            ["gtceu:mutated_living_solder 55296", "gtceu:soldering_alloy 110592", "gtceu:lubricant 192000", "gtceu:styrene_butadiene_rubber 13824",
                "gtceu:hastelloyx_78 33792", "gtceu:bohrium 27648", "gtceu:neutronium 6912"], ["64x gtceu:uev_electric_pump"],
            [GTValues.VA[GTValues.UEV]], ["CATier", 10]],
        ["gtceu:uev_conveyor_module", [5], ["96x gtceu:uev_electric_motor", "48x gtceu:double_hastelloyx_78_plate", "6x gtceu:mithril_hex_cable"],
            ["gtceu:mutated_living_solder 55296", "gtceu:lubricant 192000", "gtceu:styrene_butadiene_rubber 276480", "gtceu:hastelloyx_78 22272",
                "gtceu:bohrium 27648", "gtceu:dalisenite 13824"], ["64x gtceu:uev_conveyor_module"], [GTValues.VA[GTValues.UEV]], ["CATier", 10]],
        ["gtceu:uev_electric_piston", [2], ["48x gtceu:uev_electric_motor", "96x gtceu:double_hastelloyx_78_plate", "6x gtceu:mithril_hex_cable"],
            ["gtceu:mutated_living_solder 55296", "gtceu:soldering_alloy 110592", "gtceu:lubricant 192000", "gtceu:hastelloyx_78 74496",
                "gtceu:bohrium 27648"], ["64x gtceu:uev_electric_piston"], [GTValues.VA[GTValues.UEV]], ["CATier", 10]],
        ["gtceu:uev_robot_arm", [4],
            ["192x #gtceu:circuits/uv", "96x #gtceu:circuits/uhv", "96x gtceu:uev_electric_motor", "48x gtceu:uev_electric_piston",
                "48x #gtceu:circuits/uev", "12x gtceu:mithril_hex_cable"],
            ["gtceu:mutated_living_solder 55296", "gtceu:soldering_alloy 110592", "gtceu:lubricant 192000", "gtceu:hastelloyx_78 76032",
                "gtceu:bohrium 27648"], ["64x gtceu:uev_robot_arm"], [GTValues.VA[GTValues.UEV]], ["CATier", 10]]
    ]);

    gtr.component_assembly_line("gtceu:uev_field_generator")
        .itemInputs("144x gtceu:double_quantanium_plate", "96x #gtceu:circuits/uev", "96x gtceu:uev_emitter", "192x gtceu:gravi_star",
            "48x gtceu:quantanium_frame", "12x gtceu:mithril_hex_cable")
        .inputFluids("gtceu:mutated_living_solder 110592", "gtceu:soldering_alloy 221184", "gtceu:enderite 110592", "gtceu:bohrium 27648")
        .itemOutputs("64x gtceu:uev_field_generator").EUt(GTValues.VA[GTValues.UEV]).duration(1200).addData("CATier", 10)

    batch(gtr, "component_assembly_line", ["circuit", "itemInputs", "inputFluids", "itemOutputs", "EUt", ["duration", 1200], "addData"], [
        ["gtceu:uev_emitter", [6],
            ["96x #gtceu:circuits/uev", "48x gtceu:uev_electric_motor", "192x gtceu:gravi_star", "48x gtceu:quantanium_frame",
                "12x gtceu:mithril_hex_cable"],
            ["gtceu:mutated_living_solder 110592", "gtceu:soldering_alloy 221184", "gtceu:hastelloyx_78 27648", "gtceu:titansteel 110492",
                "gtceu:dalisenite 110592", "gtceu:bohrium 27648"], ["64x gtceu:uev_emitter"], [GTValues.VA[GTValues.UEV]], ["CATier", 10]],
        ["gtceu:uev_sensor", [7],
            ["96x #gtceu:circuits/uev", "96x gtceu:double_hastelloyx_78_plate", "48x gtceu:uev_electric_motor", "192x gtceu:gravi_star",
                "48x gtceu:quantanium_frame", "12x gtceu:mithril_hex_cable"],
            ["gtceu:mutated_living_solder 110592", "gtceu:soldering_alloy 221184", "gtceu:titansteel 110592", "gtceu:dalisenite 110592",
                "gtceu:bohrium 27648"], ["64x gtceu:uev_sensor"], [GTValues.VA[GTValues.UEV]], ["CATier", 10]],
        ["gtceu:uiv_electric_motor", [1], ["48x gtceu:long_attuned_tengam_rod", "6x gtceu:neutronium_hex_cable"],
            ["gtceu:super_mutated_living_solder 96000", "gtceu:soldering_alloy 192000", "gtceu:lubricant 384000", "gtceu:adamantine 110592",
                "gtceu:taranium 27648", "gtceu:infuscolium 40704"], ["64x gtceu:uiv_electric_motor"], [GTValues.VA[GTValues.UIV]], ["CATier", 11]],
        ["gtceu:uiv_electric_pump", [3], ["48x gtceu:double_infuscolium_plate", "48x gtceu:uiv_electric_motor", "6x gtceu:neutronium_hex_cable"],
            ["gtceu:super_mutated_living_solder 110592", "gtceu:soldering_alloy 221184", "gtceu:lubricant 384000",
                "gtceu:styrene_butadiene_rubber 27648", "gtceu:infuscolium 33792", "gtceu:taranium 27648", "gtceu:neutronium 6912"],
            ["64x gtceu:uiv_electric_pump"], [GTValues.VA[GTValues.UIV]], ["CATier", 11]],
        ["gtceu:uiv_conveyor_module", [5], ["96x gtceu:uiv_electric_motor", "48x gtceu:double_infuscolium_plate", "6x gtceu:neutronium_hex_cable"],
            ["gtceu:super_mutated_living_solder 110592", "gtceu:lubricant 384000", "gtceu:styrene_butadiene_rubber 387072", "gtceu:infuscolium 22272",
                "gtceu:taranium 27648", "gtceu:arceusalloy2b 13824"], ["64x gtceu:uiv_conveyor_module"], [GTValues.VA[GTValues.UIV]], ["CATier", 11]],
        ["gtceu:uiv_electric_piston", [2], ["48x gtceu:uiv_electric_motor", "96x gtceu:double_infuscolium_plate", "6x gtceu:neutronium_hex_cable"],
            ["gtceu:super_mutated_living_solder 110592", "gtceu:soldering_alloy 221184", "gtceu:lubricant 384000", "gtceu:infuscolium 74496",
                "gtceu:taranium 27648"], ["64x gtceu:uiv_electric_piston"], [GTValues.VA[GTValues.UIV]], ["CATier", 11]],
        ["gtceu:uiv_robot_arm", [4],
            ["192x #gtceu:circuits/uhv", "96x #gtceu:circuits/uev", "96x gtceu:uiv_electric_motor", "48x gtceu:uiv_electric_piston",
                "48x #gtceu:circuits/uiv", "12x gtceu:neutronium_hex_cable"],
            ["gtceu:super_mutated_living_solder 110592", "gtceu:soldering_alloy 221184", "gtceu:lubricant 384000", "gtceu:infuscolium 76032",
                "gtceu:taranium 27648"], ["64x gtceu:uiv_robot_arm"], [GTValues.VA[GTValues.UIV]], ["CATier", 11]]
    ]);

    gtr.component_assembly_line("gtceu:uiv_field_generator")
        .itemInputs("144x gtceu:double_adamantium_plate", "96x #gtceu:circuits/uiv", "96x gtceu:uiv_emitter", "48x kubejs:unstable_star",
            "48x gtceu:adamantium_frame", "12x gtceu:neutronium_hex_cable")
        .inputFluids("gtceu:super_mutated_living_solder 221184", "gtceu:soldering_alloy 442368", "gtceu:echoite 110592", "gtceu:taranium 27648")
        .itemOutputs("64x gtceu:uiv_field_generator").EUt(GTValues.VA[GTValues.UIV]).duration(1200).addData("CATier", 11)

    batch(gtr, "component_assembly_line", ["circuit", "itemInputs", "inputFluids", "itemOutputs", "EUt", ["duration", 1200], "addData"], [
        ["gtceu:uiv_emitter", [6],
            ["96x #gtceu:circuits/uiv", "48x gtceu:uiv_electric_motor", "48x kubejs:unstable_star", "48x gtceu:adamantium_frame",
                "12x gtceu:neutronium_hex_cable"],
            ["gtceu:super_mutated_living_solder 221184", "gtceu:soldering_alloy 442368", "gtceu:infuscolium 27648", "gtceu:adamantine 110492",
                "gtceu:arceusalloy2b 110592", "gtceu:taranium 27648"], ["64x gtceu:uiv_emitter"], [GTValues.VA[GTValues.UIV]], ["CATier", 11]],
        ["gtceu:uiv_sensor", [7],
            ["96x #gtceu:circuits/uiv", "96x gtceu:double_infuscolium_plate", "48x gtceu:uiv_electric_motor", "48x kubejs:unstable_star",
                "48x gtceu:adamantium_frame", "12x gtceu:neutronium_hex_cable"],
            ["gtceu:super_mutated_living_solder 221184", "gtceu:soldering_alloy 442368", "gtceu:adamantine 110592", "gtceu:arceusalloy2b 110592",
                "gtceu:taranium 27648"], ["64x gtceu:uiv_sensor"], [GTValues.VA[GTValues.UIV]], ["CATier", 11]],
        ["gtceu:uxv_electric_motor", [1], ["48x gtceu:long_attuned_tengam_rod", "6x gtceu:taranium_hex_cable"],
            ["gtceu:super_mutated_living_solder 192000", "gtceu:soldering_alloy 384000", "gtceu:lubricant 768000", "gtceu:naquadriatictaranium 110592",
                "gtceu:astraltitanium 27648", "gtceu:hastelloyk_243 40704"], ["64x gtceu:uxv_electric_motor"], [GTValues.VA[GTValues.UXV]],
            ["CATier", 12]],
        ["gtceu:uxv_electric_pump", [3], ["48x gtceu:double_hastelloyk_243_plate", "48x gtceu:uxv_electric_motor", "6x gtceu:taranium_hex_cable"],
            ["gtceu:super_mutated_living_solder 221184", "gtceu:soldering_alloy 442368", "gtceu:lubricant 768000",
                "gtceu:styrene_butadiene_rubber 55296", "gtceu:hastelloyk_243 33792", "gtceu:astraltitanium 27648", "gtceu:neutronium 6912"],
            ["64x gtceu:uxv_electric_pump"], [GTValues.VA[GTValues.UXV]], ["CATier", 12]],
        ["gtceu:uxv_conveyor_module", [5], ["96x gtceu:uxv_electric_motor", "48x gtceu:double_hastelloyk_243_plate", "6x gtceu:taranium_hex_cable"],
            ["gtceu:super_mutated_living_solder 221184", "gtceu:lubricant 768000", "gtceu:styrene_butadiene_rubber 608256",
                "gtceu:hastelloyk_243 22272", "gtceu:astraltitanium 27648", "gtceu:titan_precision_steel 13824"], ["64x gtceu:uxv_conveyor_module"],
            [GTValues.VA[GTValues.UXV]], ["CATier", 12]],
        ["gtceu:uxv_electric_piston", [2], ["48x gtceu:uxv_electric_motor", "96x gtceu:double_hastelloyk_243_plate", "6x gtceu:taranium_hex_cable"],
            ["gtceu:super_mutated_living_solder 221184", "gtceu:soldering_alloy 442368", "gtceu:lubricant 768000", "gtceu:hastelloyk_243 74496",
                "gtceu:astraltitanium 27648"], ["64x gtceu:uxv_electric_piston"], [GTValues.VA[GTValues.UXV]], ["CATier", 12]],
        ["gtceu:uxv_robot_arm", [4],
            ["192x #gtceu:circuits/uev", "96x #gtceu:circuits/uiv", "96x gtceu:uxv_electric_motor", "48x gtceu:uxv_electric_piston",
                "48x #gtceu:circuits/uxv", "12x gtceu:taranium_hex_cable"],
            ["gtceu:super_mutated_living_solder 221184", "gtceu:soldering_alloy 442368", "gtceu:lubricant 768000", "gtceu:hastelloyk_243 76032",
                "gtceu:astraltitanium 27648"], ["64x gtceu:uxv_robot_arm"], [GTValues.VA[GTValues.UXV]], ["CATier", 12]]
    ]);

    gtr.component_assembly_line("gtceu:uxv_field_generator")
        .itemInputs("144x gtceu:double_vibranium_plate", "96x #gtceu:circuits/uxv", "96x gtceu:uxv_emitter", "96x kubejs:unstable_star",
            "48x gtceu:vibranium_frame", "12x gtceu:taranium_hex_cable")
        .inputFluids("gtceu:super_mutated_living_solder 442368", "gtceu:soldering_alloy 884736", "gtceu:legendarium 110592", "gtceu:astraltitanium 27648")
        .itemOutputs("64x gtceu:uxv_field_generator").EUt(GTValues.VA[GTValues.UXV]).duration(1200).addData("CATier", 12)

    batch(gtr, "component_assembly_line", ["circuit", "itemInputs", "inputFluids", "itemOutputs", "EUt", ["duration", 1200], "addData"], [
        ["gtceu:uxv_emitter", [6],
            ["96x #gtceu:circuits/uxv", "48x gtceu:uxv_electric_motor", "96x kubejs:unstable_star", "48x gtceu:vibranium_frame",
                "12x gtceu:taranium_hex_cable"],
            ["gtceu:super_mutated_living_solder 442368", "gtceu:soldering_alloy 884736", "gtceu:hastelloyk_243 27648",
                "gtceu:naquadriatictaranium 110492", "gtceu:titan_precision_steel 110592", "gtceu:astraltitanium 27648"], ["64x gtceu:uxv_emitter"],
            [GTValues.VA[GTValues.UXV]], ["CATier", 12]],
        ["gtceu:uxv_sensor", [7],
            ["96x #gtceu:circuits/uxv", "96x gtceu:double_hastelloyk_243_plate", "48x gtceu:uxv_electric_motor", "96x kubejs:unstable_star",
                "48x gtceu:vibranium_frame", "12x gtceu:taranium_hex_cable"],
            ["gtceu:super_mutated_living_solder 442368", "gtceu:soldering_alloy 884736", "gtceu:naquadriatictaranium 110592",
                "gtceu:titan_precision_steel 110592", "gtceu:astraltitanium 27648"], ["64x gtceu:uxv_sensor"], [GTValues.VA[GTValues.UXV]],
            ["CATier", 12]],
        ["gtceu:opv_electric_motor", [1], ["48x gtceu:long_attuned_tengam_rod", "6x gtceu:crystalmatrix_hex_cable"],
            ["gtceu:super_mutated_living_solder 384000", "gtceu:soldering_alloy 768000", "gtceu:lubricant 1536000", "gtceu:starmetal 110592",
                "gtceu:celestialtungsten 27648", "gtceu:vibramantium 40704"], ["64x gtceu:opv_electric_motor"], [GTValues.VA[GTValues.OpV]],
            ["CATier", 13]],
        ["gtceu:opv_electric_pump", [3], ["48x gtceu:double_vibramantium_plate", "48x gtceu:opv_electric_motor", "6x gtceu:crystalmatrix_hex_cable"],
            ["gtceu:super_mutated_living_solder 442368", "gtceu:soldering_alloy 884736", "gtceu:lubricant 1536000",
                "gtceu:styrene_butadiene_rubber 110592", "gtceu:vibramantium 33792", "gtceu:celestialtungsten 27648", "gtceu:neutronium 6912"],
            ["64x gtceu:opv_electric_pump"], [GTValues.VA[GTValues.OpV]], ["CATier", 13]],
        ["gtceu:opv_conveyor_module", [5], ["96x gtceu:opv_electric_motor", "48x gtceu:double_vibramantium_plate", "6x gtceu:crystalmatrix_hex_cable"],
            ["gtceu:super_mutated_living_solder 442368", "gtceu:lubricant 1536000", "gtceu:styrene_butadiene_rubber 1050624",
                "gtceu:vibramantium 22272", "gtceu:celestialtungsten 27648", "gtceu:hikarium 13824"], ["64x gtceu:opv_conveyor_module"],
            [GTValues.VA[GTValues.OpV]], ["CATier", 13]],
        ["gtceu:opv_electric_piston", [2], ["48x gtceu:opv_electric_motor", "96x gtceu:double_vibramantium_plate", "6x gtceu:crystalmatrix_hex_cable"],
            ["gtceu:super_mutated_living_solder 442368", "gtceu:soldering_alloy 884736", "gtceu:lubricant 1536000", "gtceu:vibramantium 74496",
                "gtceu:celestialtungsten 27648"], ["64x gtceu:opv_electric_piston"], [GTValues.VA[GTValues.OpV]], ["CATier", 13]],
        ["gtceu:opv_robot_arm", [4],
            ["192x #gtceu:circuits/uiv", "96x #gtceu:circuits/uxv", "96x gtceu:opv_electric_motor", "48x gtceu:opv_electric_piston",
                "48x #gtceu:circuits/opv", "12x gtceu:crystalmatrix_hex_cable"],
            ["gtceu:super_mutated_living_solder 442368", "gtceu:soldering_alloy 884736", "gtceu:lubricant 1536000", "gtceu:vibramantium 76032",
                "gtceu:celestialtungsten 27648"], ["64x gtceu:opv_robot_arm"], [GTValues.VA[GTValues.OpV]], ["CATier", 13]]
    ]);

    gtr.component_assembly_line("gtceu:opv_field_generator")
        .itemInputs("144x gtceu:double_draconium_plate", "96x #gtceu:circuits/opv", "96x gtceu:opv_emitter", "192x kubejs:unstable_star",
            "48x gtceu:draconium_frame", "12x gtceu:crystalmatrix_hex_cable")
        .inputFluids("gtceu:super_mutated_living_solder 884736", "gtceu:soldering_alloy 1769472", "gtceu:draconiumawakened 110592",
            "gtceu:celestialtungsten 27648")
        .itemOutputs("64x gtceu:opv_field_generator").EUt(GTValues.VA[GTValues.OpV]).duration(1200).addData("CATier", 13)

    batch(gtr, "component_assembly_line", ["circuit", "itemInputs", "inputFluids", "itemOutputs", "EUt", ["duration", 1200], "addData"], [
        ["gtceu:opv_emitter", [6],
            ["96x #gtceu:circuits/opv", "48x gtceu:opv_electric_motor", "192x kubejs:unstable_star", "48x gtceu:draconium_frame",
                "12x gtceu:crystalmatrix_hex_cable"],
            ["gtceu:super_mutated_living_solder 884736", "gtceu:soldering_alloy 1769472", "gtceu:vibramantium 27648", "gtceu:starmetal 110492",
                "gtceu:hikarium 110592", "gtceu:celestialtungsten 27648"], ["64x gtceu:opv_emitter"], [GTValues.VA[GTValues.OpV]], ["CATier", 13]],
        ["gtceu:opv_sensor", [7],
            ["96x #gtceu:circuits/opv", "96x gtceu:double_vibramantium_plate", "48x gtceu:opv_electric_motor", "192x kubejs:unstable_star",
                "48x gtceu:draconium_frame", "12x gtceu:crystalmatrix_hex_cable"],
            ["gtceu:super_mutated_living_solder 884736", "gtceu:soldering_alloy 1769472", "gtceu:starmetal 110592", "gtceu:hikarium 110592",
                "gtceu:celestialtungsten 27648"], ["64x gtceu:opv_sensor"], [GTValues.VA[GTValues.OpV]], ["CATier", 13]],
        ["gtlcore:max_electric_motor", [1], ["48x gtceu:long_magmatter_rod", "48x gtceu:cosmicneutronium_hex_cable"],
            ["gtceu:super_mutated_living_solder 768000", "gtceu:soldering_alloy 1536000", "gtceu:lubricant 3072000", "gtceu:black_dwarf_mtter 110592",
                "gtceu:white_dwarf_mtter 110592", "gtceu:infinity 27648", "gtceu:transcendentmetal 81408"], ["64x gtlcore:max_electric_motor"],
            [GTValues.VA[GTValues.MAX]], ["CATier", 14]],
        ["gtlcore:max_electric_pump", [3],
            ["96x gtceu:double_transcendentmetal_plate", "48x gtlcore:max_electric_motor", "48x gtceu:cosmicneutronium_hex_cable"],
            ["gtceu:super_mutated_living_solder 884736", "gtceu:soldering_alloy 1769472", "gtceu:lubricant 3072000",
                "gtceu:styrene_butadiene_rubber 110592", "gtceu:transcendentmetal 33792", "gtceu:black_dwarf_mtter 110592",
                "gtceu:white_dwarf_mtter 110592", "gtceu:infinity 41472", "gtceu:neutronium 442368"], ["64x gtlcore:max_electric_pump"],
            [GTValues.VA[GTValues.MAX]], ["CATier", 14]],
        ["gtlcore:max_conveyor_module", [5],
            ["96x gtlcore:max_electric_motor", "96x gtceu:double_transcendentmetal_plate", "48x gtceu:cosmicneutronium_hex_cable"],
            ["gtceu:super_mutated_living_solder 884736", "gtceu:lubricant 3072000", "gtceu:styrene_butadiene_rubber 1050624",
                "gtceu:transcendentmetal 44544", "gtceu:black_dwarf_mtter 110592", "gtceu:white_dwarf_mtter 110592", "gtceu:infinity 27648"],
            ["64x gtlcore:max_conveyor_module"], [GTValues.VA[GTValues.MAX]], ["CATier", 14]],
        ["gtlcore:max_electric_piston", [2],
            ["48x gtlcore:max_electric_motor", "192x gtceu:double_transcendentmetal_plate", "48x gtceu:cosmicneutronium_hex_cable"],
            ["gtceu:super_mutated_living_solder 884736", "gtceu:soldering_alloy 1769472", "gtceu:lubricant 3072000", "gtceu:transcendentmetal 148992",
                "gtceu:infinity 27648"], ["64x gtlcore:max_electric_piston"], [GTValues.VA[GTValues.MAX]], ["CATier", 14]],
        ["gtlcore:max_robot_arm", [4],
            ["192x #gtceu:circuits/uxv", "96x #gtceu:circuits/opv", "192x gtlcore:max_electric_motor", "48x gtlcore:max_electric_piston",
                "48x #gtceu:circuits/max", "96x gtceu:cosmicneutronium_hex_cable"],
            ["gtceu:super_mutated_living_solder 884736", "gtceu:soldering_alloy 1769472", "gtceu:lubricant 3072000", "gtceu:transcendentmetal 152064",
                "gtceu:infinity 27648"], ["64x gtlcore:max_robot_arm"], [GTValues.VA[GTValues.MAX]], ["CATier", 14]]
    ]);

    gtr.component_assembly_line("gtlcore:max_field_generator")
        .itemInputs("288x gtceu:double_chaos_plate", "96x #gtceu:circuits/max", "96x gtlcore:max_emitter", "192x kubejs:nuclear_star",
            "48x gtceu:infinity_frame", "3072x gtceu:fine_cosmic_wire", "96x gtceu:cosmicneutronium_hex_cable")
        .inputFluids("gtceu:super_mutated_living_solder 1769472", "gtceu:soldering_alloy 3538944", "gtceu:black_dwarf_mtter 110592",
            "gtceu:white_dwarf_mtter 110592", "gtceu:shirabon 110592", "gtceu:infinity 27648")
        .itemOutputs("64x gtlcore:max_field_generator").EUt(GTValues.VA[GTValues.MAX]).duration(1200).addData("CATier", 14)

    batch(gtr, "component_assembly_line", ["circuit", "itemInputs", "inputFluids", "itemOutputs", ["EUt", GTValues.VA[GTValues.MAX]], ["duration", 1200], ["addData", "CATier", 14]], [
        ["gtlcore:max_emitter", [6],
            ["96x #gtceu:circuits/max", "48x gtlcore:max_electric_motor", "192x kubejs:nuclear_star", "48x gtceu:infinity_frame",
                "3072x gtceu:cosmic_foil", "96x gtceu:cosmicneutronium_hex_cable"],
            ["gtceu:super_mutated_living_solder 1769472", "gtceu:soldering_alloy 3538944", "gtceu:transcendentmetal 55296",
                "gtceu:black_dwarf_mtter 110592", "gtceu:white_dwarf_mtter 110592", "gtceu:shirabon 110592", "gtceu:infinity 27648"],
            ["64x gtlcore:max_emitter"]],
        ["gtlcore:max_sensor", [7],
            ["96x #gtceu:circuits/max", "192x gtceu:transcendentmetal_plate", "48x gtlcore:max_electric_motor", "192x kubejs:nuclear_star",
                "48x gtceu:infinity_frame", "96x gtceu:cosmicneutronium_hex_cable"],
            ["gtceu:super_mutated_living_solder 1769472", "gtceu:soldering_alloy 3538944", "gtceu:black_dwarf_mtter 110592",
                "gtceu:white_dwarf_mtter 110592", "gtceu:shirabon 110592", "gtceu:infinity 27648"], ["64x gtlcore:max_sensor"]]
    ]);
});
