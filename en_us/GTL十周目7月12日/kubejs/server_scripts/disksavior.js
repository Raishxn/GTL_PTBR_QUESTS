/*
╱/(◕‿‿◕)\╲ 
如果你克隆了本仓库并进行了修改,那么下面的的git指令就能帮你打包一个zip文件
git ls-files --full-name | grep -vE '/$|^.gitignore$|^LICENSE$' > list.txt && 7z a -tzip 硬盘拯救者v.zip @list.txt && rm list.txt


神秘提示词
按下面这个固定格式,把我给的转成KubeJS组装机配方,不要注释、不要修改结构,若无对应输入输出则删除对应方法，注意同id合并，若只有一个则无需数量x，只写id即可
gtr.assembler('disksavior:custom ID')
    .itemInputs('Quantity x Item')
    .inputFluids('Fluid Quantity')
    .itemOutputs('Quantity x output items')
    .outputFluids('Fluid Quantity')
    .EUt(GTValues.VA[GTValues.电压])
    .duration(时间)
以下是待转换物品:


神秘正则
^[A-Za-z]+(\d+): (\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$

todo
新手大礼包
加点彩蛋
产物太多的jei警告
说到糖,让湿件和生物系列电路板能吃你们觉得怎么样
巨型橡胶树
蒸汽发电升级蒸汽太多jei拖不进去
碎岩机电解
样板大礼包
液态拉多x聚合物
小op加使用指导

加推荐模组
永昼，关天气
所以为什么要一个一个搅拌上去为什么不单个搅拌上去
唱片
主世界地板预设
默认关闭改默认开启，检测
学js
透镜扩展元件包




一路向东
向着你威光指向
获得胜利已毫无意义
知晓了不曾有过囚禁我的高墙
你本分之火不断涌动
我感受到 我能与在近处起舞的何物重逢
已然遗忘的大雨 改写着我的履历
就连那聚集在莲叶上的雨滴宇宙
亦能看到属于你的无限

第一挥 让雨之起源为之震颤
第二挥 令海之怒意尽数臣服
第三度恩泽降临时
暂借这方寸尘世栖身
以魔法之援手环抱四方
不休之王 劳作之王
直至人之庭园臻至完满
彻夜通明时洞悉世间星辰
再度拂晓际聆听太阳颂歌
三界原野上化身为万物之父
四柱擎天处支撑起苍穹寰宇

文无第一，武无第二







去非电路催化剂
重做样板大礼包
太空电梯压缩升阶
水与水热交换
渔场加强去概率
[文件]光污染
标签使用教程任务
鸿蒙转扭
蒸汽线圈
加tooltip，新东西加进去









*/
PlayerEvents.loggedIn(event => {
    const player = event.player;
    player.tell("§7================================================")
    player.tell("§aWelcome to use \"§r§eHard Drive Savior §r§a\"!")
    player.tell("The current version of §ais §r§ev21")
    player.tell("§cThe current version is not perfect and may have many bugs!")
    player.tell("§aThis private product comes with a mission statement, please read it carefully.")
    player.tell("§c⚠️Poor compatibility with GTL private version!")
    player.tell("§c⚠️If you don’t install GTL additions, you may get an error!")
    player.tell("§c⚠️This private product needs to enable the original void mining machine in GTL core, otherwise an error will be reported!!!")
    player.tell("§eI wish you a happy game!")
    player.tell("§7================================================")
})
ServerEvents.recipes(event => {
    const gtr = event.recipes.gtceu
    //铁锭烧锻铁锭
    // 如果 kirin 完全不存在 → 执行你的配方
    if (typeof global.kirin === 'undefined') {
        event.smelting('gtceu:wrought_iron_ingot', 'minecraft:iron_ingot', 0, 200)
    }
    //装配线压缩进阶装配线
    gtr.compressor('disksavior:advanced_assembly_line')
        .itemInputs('64x gtceu:assembly_line')
        .itemOutputs('gtceu:advanced_assembly_line')
        .EUt(GTValues.VA[GTValues.LuV])
        .duration(2000)
    gtr.compressor('disksavior:advanced_assembly_line_unit')
        .itemInputs('64x gtceu:assembly_line_unit')
        .itemOutputs('gtlcore:advanced_assembly_line_unit')
        .EUt(GTValues.VA[GTValues.LuV])
        .duration(2000)
    //无限中子素涡轮转子元件
    gtr.assembler('disksavior:neutronium_turbine_rotor_infinity_cell')
        .itemInputs(
            '185254x gtceu:tin_rotor',
            '185254x gtceu:lead_rotor',
            '185254x gtceu:iron_rotor',
            '185254x gtceu:bronze_rotor',
            '185254x gtceu:steel_rotor',
            '185254x gtceu:aluminium_rotor',
            '185254x gtceu:chromium_rotor',
            '185254x gtceu:stainless_steel_rotor',
            '185254x gtceu:titanium_rotor'
        )
        .inputFluids('gtceu:glue 185254000')
        .itemOutputs(Item.of('expatternprovider:infinity_cell', '{record:{"#c":"ae2:i",id:"gtceu:turbine_rotor"}}'))
        .duration(2000)
        .EUt(1)
    //无限tnt元件
    gtr.mixer('disksavior:infinity_tnt_cell')
        .itemInputs('185254x minecraft:tnt')
        .inputFluids('gtceu:glue 185254000')
        .itemOutputs(Item.of('expatternprovider:infinity_cell', '{record:{"#c":"ae2:i",id:"minecraft:tnt"}}'))
        .EUt(GTValues.VA[GTValues.LV])
        .duration(2987)
    //蒸汽产出
    gtr.dehydrator('disksavior:steam_is_my_last_life')
        .circuit(1)
        .inputFluids('minecraft:water 2147483648')
        .outputFluids('gtceu:steam 343597383680')
        .EUt(1)
        .duration(200)
    //蒸汽发电加强
    //每次功率提升4个电压,即256倍
    gtr.semi_fluid_generator('disksavior:steam_1')
        .notConsumable('disksavior:steam_1')
        .inputFluids('minecraft:water 163840')
        .EUt(-2147483648 * Math.pow(256, 0))
        .duration(10)
    gtr.semi_fluid_generator('disksavior:steam_2')
        .notConsumable('disksavior:steam_2')
        .inputFluids('minecraft:water 41943040')
        .EUt(-2147483648 * Math.pow(256, 1))
        .duration(10)
    gtr.semi_fluid_generator('disksavior:steam_3')
        .notConsumable('disksavior:steam_3')
        .inputFluids('minecraft:water 10737418240')
        .EUt(-2147483648 * Math.pow(256, 2))
        .duration(10)
    gtr.semi_fluid_generator('disksavior:steam_4')
        .notConsumable('disksavior:steam_4')
        .inputFluids('minecraft:water 2748779069440')
        .EUt(-2147483648 * Math.pow(256, 3))
        .duration(10)
    gtr.semi_fluid_generator('disksavior:steam_is_my_last_life')
        .notConsumable('disksavior:steam_is_my_last_life')
        .inputFluids('minecraft:water 703687441776640')
        .EUt(-9221474836470000000)//不知道为什么写Math.pow(256, 4)会溢出
        .duration(10)
    //蒸汽是我最后的生命……
    //蒸汽基础
    gtr.mixer('disksavior:steam_1')
        .itemInputs(
            '1024x gtceu:steam_mega_turbine',
            '4096x gtceu:double_stainless_steel_plate',
            '1024x gtceu:stainless_steel_huge_fluid_pipe',
            '1024x gtceu:titanium_rotor',
            'minecraft:stone_sword'
        )
        .inputFluids('gtceu:glue 185254', 'gtceu:steam 8192')
        .itemOutputs('disksavior:steam_1')
        .EUt(GTValues.VA[GTValues.IV])
        .duration(2000)
    //蒸汽少侠
    gtr.mixer('disksavior:steam_2')
        .itemInputs(
            '1024x gtceu:supercritical_steam_turbine',
            '4096x gtceu:double_tungsten_carbide_plate',
            '1024x gtceu:tungsten_carbide_huge_fluid_pipe',
            '1024x gtceu:tungsten_steel_rotor',
            'minecraft:shears'
        )
        .inputFluids('gtceu:glue 1852540', 'gtceu:steam 2097152')
        .itemOutputs('disksavior:steam_2')
        .EUt(GTValues.VA[GTValues.ZPM])
        .duration(2000)
    //蒸汽大侠
    gtr.mixer('disksavior:steam_3')
        .itemInputs(
            '1024x gtceu:large_naquadah_reactor',
            '4096x gtceu:double_duranium_plate',
            '1024x gtceu:duranium_huge_fluid_pipe',
            '1024x gtceu:neutronium_rotor',
            'gtceu:red_alloy_foil'
        )
        .inputFluids('gtceu:glue 18525400', 'gtceu:steam 536870912')
        .itemOutputs('disksavior:steam_3')
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(2000)
    //蒸汽巨侠
    gtr.mixer('disksavior:steam_4')
        .itemInputs(
            '64x gtceu:advanced_hyper_reactor',
            '64x gtceu:dyson_sphere',
            '4096x gtceu:double_seaborgium_plate',
            '1024x gtceu:enderium_huge_fluid_pipe',
            '1024x gtceu:quantanium_rotor',
            'minecraft:snow_block'
        )
        .inputFluids('gtceu:glue 185254000', 'gtceu:steam 137438953472')
        .itemOutputs('disksavior:steam_4')
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(2000)
    //此身定为蒸汽所天成
    gtr.mixer('disksavior:steam_is_my_last_life')
        .itemInputs(
            '1024x gtceu:annihilate_generator',
            '4096x gtceu:double_chaos_plate',
            '1024x gtceu:transcendentmetal_huge_fluid_pipe',
            '1024x gtceu:draconium_rotor',
            'minecraft:dirt'
        )
        .inputFluids('gtceu:glue 1852540000', 'gtceu:steam 35184372088832')
        .itemOutputs('disksavior:steam_is_my_last_life')
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(3705080)
    //圆石爆奇点
    gtr.electric_implosion_compressor('disksavior:singularity_cobblestone')
        .circuit(1)
        .itemInputs('256000x minecraft:cobblestone')
        .itemOutputs('ae2:singularity')
        .EUt(GTValues.VA[GTValues.LuV])
        .duration(200)
    //圆石爆物质球
    gtr.electric_implosion_compressor('disksavior:matter_ball')
        .circuit(2)
        .itemInputs('256000x minecraft:cobblestone')
        .itemOutputs('1000x ae2:matter_ball')
        .EUt(GTValues.VA[GTValues.LuV])
        .duration(200)
    //工作台合成带nbt的量子纠缠态奇点
    event.shaped(Item.of('ae2:quantum_entangled_singularity', 2, '{freq:177377961050100L}'), [
        "AB ",
        "   ",
        "   "
    ], {
        A: 'ae2:singularity',
        B: 'gtceu:ender_pearl_dust'
    })
    //灵魂沙
    gtr.mixer('disksavior:soul_sand')
        .itemInputs('minecraft:sand')
        .inputFluids('minecraft:lava 100')
        .itemOutputs('minecraft:soul_sand')
        .EUt(GTValues.VA[GTValues.ULV])
        .duration(10)
    //凋零骷髅头
    gtr.lightning_processor('disksavior:wither_skeleton_skull')
        .itemInputs(
            '4x gtceu:carbon_dust',
            'minecraft:skeleton_skull'
        )
        .itemOutputs('minecraft:wither_skeleton_skull')
        .EUt(GTValues.VA[GTValues.HV])
        .duration(200)
    //下界之星去无重力条件&转搅拌机
    gtr.mixer('disksavior:nether_star')
        .circuit(1)
        .itemInputs('4x minecraft:soul_sand', '3x minecraft:wither_skeleton_skull')
        .itemOutputs('minecraft:nether_star')
        .duration(100)
        .EUt(GTValues.VA[GTValues.MV])
    //草
    gtr.lightning_processor('disksavior:grass')
        .itemInputs('minecraft:wheat_seeds')
        .itemOutputs('minecraft:grass')
        .EUt(GTValues.VA[GTValues.ULV])
        .duration(10)
    //草方块
    gtr.mixer('disksavior:grass_block')
        .circuit(2)
        .itemInputs('minecraft:grass', 'minecraft:dirt')
        .inputFluids('minecraft:water 100')
        .itemOutputs('minecraft:grass_block')
        .EUt(GTValues.VA[GTValues.ULV])
        .duration(10)
    /*蒸汽冷冻蒸馏水(意义不明)
    gtr.vacuum_freezer('disksavior:steam_water')
        .inputFluids('gtceu:steam 160000')
        .outputFluids('gtceu:distilled_water 1000')
        .EUt(GTValues.VA[GTValues.ULV])
        .duration(1)*/
    //大op主机下调LuV
    gtr.assembler('disksavior:advanced_integrated_ore_processor')
        .circuit(30)
        .itemInputs('512x gtceu:integrated_ore_processor', '2048x gtceu:crushing_wheels', '1024x kubejs:luv_universal_circuit', '512x gtceu:luv_robot_arm', '1024x gtceu:luv_conveyor_module', '256x gtceu:luv_electric_pump', '256x gtceu:luv_emitter', '4096x gtceu:double_indium_tin_barium_titanium_cuprate_plate')
        .inputFluids('gtceu:glue 185254000')
        .itemOutputs('gtceu:advanced_integrated_ore_processor')
        .EUt(GTValues.VA[GTValues.LuV])
        .duration(2987)
    //小op主机下调IV
    gtr.assembler('disksavior:integrated_ore_processor')
        .itemInputs('8x gtceu:large_maceration_tower', '8x gtceu:large_centrifuge', '8x gtceu:large_sifting_funnel', '8x gtceu:large_chemical_bath', '64x gtceu:hssg_gear', '128x gtceu:double_iridium_plate', '128x gtceu:iv_conveyor_module', '128x gtceu:iv_robot_arm', '128x gtceu:iv_electric_pump')
        .inputFluids('gtceu:glue 185254000')
        .itemOutputs('gtceu:integrated_ore_processor')
        .EUt(GTValues.VA[GTValues.LuV])
        .duration(600)
    //MAX并行控制仓下调IV
    gtr.assembler('disksavior:max_parallel_hatch')
        .circuit(1)
        .itemInputs('64x gtceu:iv_parallel_hatch', '64x #gtceu:circuits/luv', '96x #gtceu:circuits/iv', '144x #gtceu:circuits/ev', '216x #gtceu:circuits/hv', '324x #gtceu:circuits/mv', '324x #gtceu:circuits/lv')
        .inputFluids('gtceu:glue 185254000')
        .itemOutputs('gtceu:max_parallel_hatch')
        .EUt(GTValues.VA[GTValues.IV])
        .duration(500)
    //超级并行控制仓下调IV
    gtr.assembler('disksavior:super_parallel_hatch')
        .circuit(2)
        .itemInputs('512x gtceu:iv_parallel_hatch', '512x #gtceu:circuits/luv', '768x #gtceu:circuits/iv', '1152x #gtceu:circuits/ev', '1728x #gtceu:circuits/hv', '2592x #gtceu:circuits/mv', '2592x #gtceu:circuits/lv')
        .inputFluids('gtceu:glue 185254000')
        .itemOutputs('gtladditions:super_parallel_hatch')
        .EUt(GTValues.VA[GTValues.LuV])
        .duration(2000)
    //部件装配线下调IV
    gtr.assembler('disksavior:component_assembly_line')
        .itemInputs('256x gtceu:assembly_line', '256x gtceu:assembly_line_casing', '512x gtceu:assembly_line_unit', '256x gtceu:iv_robot_arm', '512x gtceu:iv_conveyor_module', '512x gtceu:iv_electric_motor', '256x #gtceu:circuits/luv', '320x #gtceu:circuits/iv', '384x #gtceu:circuits/ev')
        .inputFluids('gtceu:glue 185254000')
        .itemOutputs('gtceu:component_assembly_line')
        .EUt(GTValues.VA[GTValues.LuV])
        .duration(2000)
    //无线电网输出终端下调IV
    gtr.assembler('disksavior:wireless_energy_network_output_terminal')
        .circuit(30)
        .itemInputs('185254x gtceu:ulv_voltage_coil', '18525x gtceu:lv_voltage_coil', '1852x gtceu:mv_voltage_coil', '185x gtceu:hv_voltage_coil', '18x gtceu:ev_voltage_coil', 'gtceu:iv_voltage_coil', '21x minecraft:grass', 'minecraft:dirt')
        .inputFluids('gtceu:glue 185254000')
        .itemOutputs('gtladditions:wireless_energy_network_output_terminal')
        .EUt(GTValues.VA[GTValues.IV])
        .duration(2000)
    //无线电网输入终端下调OpV
    gtr.assembler('disksavior:wireless_energy_network_input_terminal')
        .itemInputs(
            '256x gtmthings:opv_67108864a_wireless_laser_target_hatch',
            '1024x kubejs:starmetal_coil_block',
            '16384x gtceu:power_substation',
            '4096x gtceu:high_power_casing',
            '4096x gtceu:echoite_hex_wire',
            '4096x gtceu:legendarium_hex_wire',
            '4096x gtceu:draconiumawakened_hex_wire',
            '185254x gtceu:normal_laser_pipe',
            'minecraft:dirt'
        )
        .inputFluids('gtceu:glue 185254000')
        .itemOutputs('gtladditions:wireless_energy_network_input_terminal')
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(185254)
    //创造模式计算机下调到IV
    gtr.assembler('disksavior:creative_computation_provider')
        .itemInputs(
            '1024x gtceu:high_performance_computation_array',
            '4096x gtceu:hpca_computation_component',
            '4096x gtceu:hpca_active_cooler_component',
            '1024x gtceu:hpca_bridge_component',
            '64x gtceu:network_switch',
            '1024x gtceu:cold_ice_freezer',
            '185x minecraft:ice',
            '254x minecraft:packed_ice',
            '21x minecraft:blue_ice'
        )
        .inputFluids('gtceu:glue 185254000')
        .itemOutputs('gtceu:creative_computation_provider')
        .EUt(GTValues.VA[GTValues.LuV])
        .duration(2000)
    //创造数据访问仓下调到IV
    gtr.assembler('disksavior:creative_data_access_hatch')
        .itemInputs(
            '256x gtceu:iv_scanner',
            '256x gtceu:data_access_hatch',
            '4096x gtceu:data_stick',
            '4096x gtceu:data_orb',
            '256x gtceu:data_transmitter_hatch',
            '256x gtceu:data_receiver_hatch',
            '16384x gtceu:normal_optical_pipe'
        )
        .inputFluids('gtceu:glue 185254000')
        .itemOutputs('gtceu:creative_data_access_hatch')
        .EUt(GTValues.VA[GTValues.LuV])
        .duration(2000)
    //可配置重力绝对洁净维护仓下调LV
    gtr.assembler('disksavior:law_cleaning_gravity_configuration_maintenance_hatch')
        .itemInputs('4x gtceu:maintenance_hatch')
        .inputFluids('gtceu:glue 21')
        .itemOutputs('gtceu:law_cleaning_gravity_configuration_maintenance_hatch')
        .EUt(GTValues.VA[GTValues.ULV])
        .duration(200)
    //高分子爆破
    //单步乙烯
    gtr.chemical_reactor('disksavior:ethylene')
        .itemInputs('gtceu:sulfur_dust', '4x gtceu:bio_chaff')
        .inputFluids('minecraft:water 15000')
        .itemOutputs('5x gtceu:wood_dust')
        .outputFluids('gtceu:ethylene 3000')
        .EUt(GTValues.VA[GTValues.MV])
        .duration(4000)
    //基岩钻机电解 基岩粉
    gtr.electrolyzer('disksavior:bedrock_dust')
        .notConsumable('gtceu:bedrock_drilling_rig')
        .notConsumable('64x kubejs:bedrock_drill')
        .inputFluids('gtceu:steam 1')
        .itemOutputs('1024x gtceu:bedrock_dust')
        .EUt(GTValues.VA[GTValues.UV])
        .duration(6400)
    //特种陶瓷卷板机做
    gtr.bender('disksavior:special_ceramics')
        .circuit(1)
        .itemInputs('2x gtceu:special_ceramics_dust')
        .itemOutputs('kubejs:special_ceramics')
        .EUt(GTValues.VA[GTValues.LV])
        .duration(50)
    //液态量子炖屎
    gtr.alloy_blast_smelter('disksavior:quantanium')
        .circuit(30)
        .notConsumable('gtceu:neutron_activator')
        .inputFluids('gtceu:neon 10000')
        .itemInputs('4x gtceu:quantum_star', '8x gtceu:quantum_eye', '16x gtceu:mithril_dust', '16x gtceu:gadolinium_dust', '64x minecraft:netherite_scrap', '64x ae2:fluix_dust')
        .outputFluids('gtceu:quantanium 10000')
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(1200)
        .blastFurnaceTemp(12600)
    //中子活化转闪电处理
    gtr.lightning_processor('disksavior:hassium')
        .notConsumable('gtceu:neutron_activator')
        .inputFluids('gtceu:liquid_metastable_hassium 1000')
        .outputFluids('gtceu:hassium 1000')
        .EUt(GTValues.VA[GTValues.UV])
        .duration(200)
    gtr.lightning_processor('disksavior:oganesson')
        .notConsumable('gtceu:neutron_activator')
        .inputFluids('gtceu:metastable_oganesson 1000')
        .outputFluids('gtceu:oganesson 1000')
        .EUt(GTValues.VA[GTValues.UV])
        .duration(200)
    gtr.lightning_processor('disksavior:draconium_dust')//这个自带五倍压缩
        .notConsumable('gtceu:neutron_activator')
        .notConsumable('gtceu:degenerate_rhenium_plate')
        .itemInputs('5x minecraft:dragon_egg')
        .inputFluids('gtceu:uu_amplifier 5000')
        .itemOutputs('2x kubejs:draconium_dust', '40x gtceu:ender_eye_dust', '20x gtceu:ender_pearl_dust')//这两个jei里看不到
        .EUt(GTValues.VA[GTValues.UV])
        .duration(4000)
    //单步钛-50
    gtr.large_chemical_reactor('disksavior:titanium_50')
        .notConsumable('gtceu:decay_hastener')
        .itemInputs('gtceu:titanium_dust')
        .outputFluids('gtceu:titanium_50 144')
        .EUt(GTValues.VA[GTValues.UV])
        .duration(200)
    //扭,放得下的用三钛块+电路,放不下的用量子块
    //两步γ射线光刻胶
    gtr.distort('disksavior:gamma_rays_photoresist')
        .notConsumable('gtceu:tritanium_block')
        .itemInputs('29x gtceu:borocarbide_dust', '2x gtceu:lanthanum_dust', '2x gtceu:fullerene_dust', 'gtceu:flerovium_dust')
        .inputFluids('gtceu:chlorine 3000')
        .outputFluids('gtceu:gamma_rays_photoresist 1000')
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(2000)
        .blastFurnaceTemp(1)
    //单步碳化硼混合材料粉,给↑用的
    gtr.distort('disksavior:borocarbide_dust')
        .notConsumable('gtceu:tritanium_block')
        .itemInputs('2x gtceu:holmium_dust', '2x gtceu:thulium_dust', '2x gtceu:copernicium_dust', '2x gtceu:flerovium_dust', '6x gtceu:astatine_dust', '7x gtceu:carbon_dust', '4x gtceu:francium_dust', '4x gtceu:boron_dust')
        .itemOutputs('29x gtceu:borocarbide_dust')
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(1000)
        .blastFurnaceTemp(1)
    //单步量子点
    gtr.distort('disksavior:quantum_dots')
        .notConsumable('gtceu:tritanium_block')
        .circuit(1)
        .itemInputs('gtceu:selenium_dust', 'gtceu:cadmium_dust', '42x gtceu:carbon_dust', 'gtceu:phosphorus_dust')
        .inputFluids('gtceu:hydrogen 87000', 'gtceu:oxygen 2000')
        .outputFluids('gtceu:quantum_dots 1000')
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(2000)
        .blastFurnaceTemp(1)
    //单步硝酸锕镭线
    gtr.distort('disksavior:actinium_radium_nitrate_solution')
        .notConsumable('gtceu:tritanium_block')
        .notConsumable('gtceu:blacklight')
        .circuit(1)
        .itemInputs(
            '32x gtceu:trinium_compound_dust',
            '12x gtceu:fine_carbon_nanotubes_wire',
            '2x gtceu:fullerene_dust'
        )
        .inputFluids('gtceu:nitric_acid 48000')
        .itemOutputs(
            '4x gtceu:francium_dust',
            '16x gtceu:astatine_dust',
            '16x gtceu:selenium_dust',
            '2x gtceu:protactinium_dust',
            'gtceu:radium_dust',
            '4x gtceu:naquadria_dust',
            '2x gtceu:enriched_naquadah_dust',
            '8x gtceu:actinium_dust',
            '24x gtceu:trinium_dust',
            'gtceu:thorium_dust'
        )
        .outputFluids(
            'gtceu:nitrogen 48000',
            'gtceu:oxygen 136000'
        )
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(3000)
        .blastFurnaceTemp(1)
    //单步碳氟化合物
    gtr.large_chemical_reactor('disksavior:processing_pattern_fluorocarborane')
        .circuit(30)
        .itemInputs('gtceu:carbon_dust', '11x gtceu:boron_dust')
        .inputFluids('gtceu:hydrogen 2000', 'gtceu:fluorine 11000')
        .itemOutputs('gtceu:fluorocarborane_dust')
        .EUt(GTValues.VA[GTValues.IV])
        .duration(200)
    //单步石化脱硫
    gtr.large_chemical_reactor('disksavior:oil_medium_sulfuric')
        .notConsumable('gtceu:desulfurizer')
        .inputFluids('gtceu:oil_medium 120000')
        .itemOutputs('27x gtceu:sulfur_dust')
        .outputFluids('gtceu:heavy_fuel 12000', 'gtceu:light_fuel 60000', 'gtceu:naphtha 180000', 'gtceu:refinery_gas 72000')
        .EUt(GTValues.VA[GTValues.HV])
        .duration(20 * 1200 / 4)
    gtr.large_chemical_reactor('disksavior:oil_heavy_sulfuric')
        .notConsumable('gtceu:desulfurizer')
        .inputFluids('gtceu:oil_heavy 120000')
        .itemOutputs('37x gtceu:sulfur_dust')
        .outputFluids('gtceu:heavy_fuel 300000', 'gtceu:light_fuel 54000', 'gtceu:naphtha 18000', 'gtceu:refinery_gas 72000')
        .EUt(GTValues.VA[GTValues.HV])
        .duration(20 * 800 / 4)
    gtr.large_chemical_reactor('disksavior:oil_light_sulfuric')
        .notConsumable('gtceu:desulfurizer')
        .inputFluids('gtceu:oil_light 180000')
        .itemOutputs('30x gtceu:sulfur_dust')
        .outputFluids('gtceu:heavy_fuel 12000', 'gtceu:light_fuel 24000', 'gtceu:naphtha 36000', 'gtceu:refinery_gas 288000')
        .EUt(GTValues.VA[GTValues.HV])
        .duration(20 * 1200 / 4)
    gtr.large_chemical_reactor('disksavior:oil_sulfuric')
        .notConsumable('gtceu:desulfurizer')
        .inputFluids('gtceu:oil 60000')
        .itemOutputs('15x gtceu:sulfur_dust')
        .outputFluids('gtceu:heavy_fuel 18000', 'gtceu:light_fuel 60000', 'gtceu:naphtha 24000', 'gtceu:refinery_gas 72000')
        .EUt(GTValues.VA[GTValues.HV])
        .duration(20 * 800 / 4)
    //粉直出单步铊
    gtr.distort('disksavior:easier_thallium_dust')
        .notConsumable('gtceu:tritanium_block')
        .itemInputs('28x #minecraft:logs', '264x gtceu:grossular_dust', '6x gtceu:sulfur_dust', '3x gtceu:carbon_dust', '2x gtceu:potassium_dust')
        .inputFluids('gtceu:steam 28000', 'gtceu:naphtha 2800', 'gtceu:ethanol 2000')
        .itemOutputs('4x gtceu:thallium_dust', '32x gtceu:calcium_dust', '32x gtceu:aluminium_dust', '16x gtceu:tungsten_dust')
        .EUt(GTValues.VA[GTValues.UV])
        .duration(1000)
        .blastFurnaceTemp(1)
    //单步环戊二烯化锎
    gtr.distort('disksavior:californium_cyclopentadienide_assemble')
        .notConsumable('gtceu:tritanium_block')
        .itemInputs('gtceu:californium_dust', '15x gtceu:carbon_dust')
        .inputFluids('gtceu:hydrogen 15000')
        .outputFluids('gtceu:californium_cyclopentadienide 1000')
        .EUt(GTValues.VA[GTValues.UHV])
        .blastFurnaceTemp(1)
        .duration(2000)
    //蒸汽离心出16种净化水和蒸馏水 净化水终结者
    gtr.distillation_tower('disksavior:water_distillation_super')
        .inputFluids('gtceu:steam 18525400')
        .outputFluids(
            'gtceu:distilled_water 34319044516',
            'gtceu:grade_16_purified_water 160000',
            'gtceu:grade_8_purified_water 1440000',
            'gtceu:grade_15_purified_water 320000',
            'gtceu:grade_14_purified_water 480000',
            'gtceu:grade_13_purified_water 640000',
            'gtceu:grade_12_purified_water 800000',
            'gtceu:grade_11_purified_water 960000',
            'gtceu:grade_10_purified_water 1120000',
            'gtceu:grade_9_purified_water 1280000',
            'gtceu:grade_7_purified_water 1600000',
            'gtceu:grade_6_purified_water 1760000',
            'gtceu:grade_5_purified_water 1920000',
            'gtceu:grade_4_purified_water 2080000',
            'gtceu:grade_3_purified_water 2240000',
            'gtceu:grade_2_purified_water 2400000',
            'gtceu:grade_1_purified_water 2560000'
        )
        .EUt(GTValues.VA[GTValues.UV])
        .duration(2000)
    //回响系列电解
    gtr.electrolyzer('disksavior:echo')
        .notConsumable('kubejs:reactor_core')
        .itemOutputs('minecraft:echo_shard', 'minecraft:sculk_sensor', 'minecraft:sculk_catalyst', '4x minecraft:sculk')
        .EUt(GTValues.VA[GTValues.LV])
        .duration(200)
    //t7t8电解
    gtr.electrolyzer('disksavior:t7t8')
        .notConsumable('kubejs:barnarda_log')
        .itemOutputs('kubejs:glacio_spirit', '32x kubejs:barnarda_log')
        .outputFluids('gtceu:unknowwater 2897')
        .EUt(GTValues.VA[GTValues.MV])
        .duration(600)
    //单步稀土线
    gtr.large_chemical_reactor('disksavior:monazite_dust_processing')
        .itemInputs('144x gtceu:monazite_dust')
        .notConsumable('gtceu:magnetic_steel_rod')
        .circuit(30)
        .inputFluids(
            'minecraft:water 1600',
            'gtceu:phosphoric_acid 14400',
            'gtceu:hydrochloric_acid 8000'
        )
        .itemOutputs(
            'gtceu:lanthanum_dust',
            'gtceu:cerium_dust',
            'gtceu:neodymium_dust',
            'gtceu:samarium_dust',
            'gtceu:europium_dust',
            'gtceu:praseodymium_dust',
            'gtceu:gadolinium_dust',
            'gtceu:terbium_dust',
            'gtceu:dysprosium_dust',
            'gtceu:holmium_dust',
            'gtceu:erbium_dust',
            'gtceu:thulium_dust',
            'gtceu:ytterbium_dust',
            'gtceu:scandium_dust',
            'gtceu:lutetium_dust',
            'gtceu:yttrium_dust'
        )
        .outputFluids(
            'gtceu:oxygen 24000',
            'gtceu:helium 28800'
        )
        .EUt(GTValues.VA[GTValues.HV])
        .duration(2000)
    //粉直出单步铟
    gtr.large_chemical_reactor('disksavior:indium_dust_pattern')
        .circuit(5)
        .itemInputs('96x gtceu:aluminium_dust',)
        .inputFluids('gtceu:sulfuric_acid 112000')
        .itemOutputs(
            '7x gtceu:indium_dust',
            '24x gtceu:sulfur_dust',
        )
        .outputFluids('gtceu:oxygen 72000')
        .EUt(GTValues.VA[GTValues.IV])
        .duration(1400)
    //单步富勒烯
    gtr.distort('disksavior:fullerene_dust_pattern')
        .notConsumable('gtceu:tritanium_block')
        .circuit(1)
        .itemInputs(
            '3780x gtceu:carbon_dust'
        )
        .inputFluids(
            'gtceu:methane 60000',
            'gtceu:nitrogen 700000'
        )
        .itemOutputs(
            '64x gtceu:fullerene_dust'
        )
        .outputFluids(
            'gtceu:hydrogen 60000',
            'gtceu:ammonia 640000'
        )
        .EUt(GTValues.VA[GTValues.UIV])
        .blastFurnaceTemp(1)
        .duration(1280)
    //单步硫酸铀线
    gtr.electrolyzer('disksavior:uranium_sulfate_waste_solution')
        .circuit(1)
        .itemInputs('gtceu:uraninite_dust')
        .inputFluids('gtceu:sulfuric_acid 9000')
        .itemOutputs(
            'gtceu:radium_dust',
            'gtceu:lead_dust',
            'gtceu:barium_dust',
            'gtceu:strontium_dust'
        )
        .outputFluids('gtceu:diluted_sulfuric_acid 9000')
        .EUt(GTValues.VA[GTValues.HV])
        .duration(4500)
    //单步精金
    gtr.distort('disksavior:adamantine_compounds_dust')
        .notConsumable('gtceu:tritanium_block')
        .itemInputs(
            '32x gtceu:enriched_naquadah_dust',
            '9x gtceu:naquadah_dust',
            '8x gtceu:sulfur_dust',
            'gtceu:alunite_dust',
            '64x gtceu:potassium_ethylxanthate_dust',
            '140x #minecraft:logs'
        )
        .inputFluids(
            'minecraft:water 25',
            'gtceu:naphtha 14000',
            'gtceu:sulfuric_acid 2000',
            'gtceu:hydrogen 16000',
            'gtceu:nitration_mixture 6000',
            'gtceu:aqua_regia 12000',
            'gtceu:mana 600',
        )
        .itemOutputs(
            '6x gtceu:adamantine_dust',
            'gtceu:naquadria_dust'
        )
        .outputFluids(
            'gtceu:hydrochloric_acid 6000',
            'gtceu:nitrogen 6000',
            'gtceu:oxygen 8000',
        )
        .EUt(GTValues.VA[GTValues.UEV])
        .blastFurnaceTemp(1)
        .duration(2400)
    //单步硅岩燃料,不完美循环,我真的不想再配平了,递归循环是极为邪恶的
    //化反30电路
    gtr.large_chemical_reactor('disksavior:naquadah_fuel')
        .itemInputs('160x gtceu:naquadah_dust')
        .circuit(30)
        .inputFluids(
            'gtceu:ammonia 64000',
            'gtceu:nitric_acid 64000',
            'gtceu:fluorine 64000'
        )
        .outputFluids(
            'gtceu:naquadah_fuel 64000',
            'gtceu:enriched_naquadah_waste 8000'
        )
        .EUt(GTValues.VA[GTValues.UV])
        .duration(12800)
    //单步富集硅岩燃料,完美循环
    //化反30电路
    gtr.large_chemical_reactor('disksavior:enriched_naquadah_fuel')
        .circuit(30)
        .inputFluids(
            'minecraft:water 10800000',
            'gtceu:radon 432000',
            'gtceu:sulfuric_acid 7847000',
            'gtceu:naquadria_solution 4021650',
            'gtceu:hydrogen 398000'
        )
        .itemOutputs(
            '2700x gtceu:hot_trinium_ingot',
            '199x gtceu:hot_naquadria_ingot'
        )
        .outputFluids(
            'gtceu:enriched_naquadah_fuel 432000',
            'gtceu:fluorine 2794500'
        )
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(86400)
    //九倍压缩核废料电解,一号电路
    gtr.electrolyzer('disksavior:nuclear_waste_9')
        .itemInputs('9x kubejs:nuclear_waste')
        .circuit(1)
        .itemOutputs(
            'gtceu:plutonium_dust',
            'gtceu:polonium_dust',
            'gtceu:uranium_dust',
            'gtceu:thorium_dust',
            'gtceu:protactinium_dust',
            'gtceu:neptunium_dust'
        )
        .EUt(2048)
        .duration(1800)
    //四倍压缩稀有金属粉离心
    //因为会串,所以改离心机做
    //因未知原因,用编程电路无法正常工作,故改用新物品
    gtr.centrifuge('disksavior:rec_4x')
        .notConsumable('gtceu:rare_earth_centrifugal')
        .itemInputs('4x gtceu:rare_earth_metal_dust')
        .itemOutputs(
            'gtceu:promethium_dust',
            'gtceu:lanthanum_dust',
            'gtceu:cerium_dust',
            'gtceu:neodymium_dust',
            'gtceu:samarium_dust',
            'gtceu:europium_dust',
            'gtceu:praseodymium_dust',
            'gtceu:gadolinium_dust',
            'gtceu:terbium_dust',
            'gtceu:dysprosium_dust',
            'gtceu:holmium_dust',
            'gtceu:erbium_dust',
            'gtceu:thulium_dust',
            'gtceu:ytterbium_dust',
            'gtceu:scandium_dust',
            'gtceu:lutetium_dust',
            'gtceu:yttrium_dust'
        )
        .EUt(GTValues.VA[GTValues.UV])
        .duration(800)
    /*我写完了才发现爆破的比我的效率高,已哭泣
    //渔场集大成去概率
    gtr.packer('disksavior:packer_super')
        .notConsumable('64x gtceu:fishing_ground')
        .circuit(30)
        .itemOutputs('459000x minecraft:cod',
        '191700x minecraft:salmon',
        '15300x minecraft:tropical_fish',
        '99900x minecraft:pufferfish',
        '7200x minecraft:experience_bottle',
        '7200x minecraft:name_tag',
        '7200x minecraft:nautilus_shell',
        '7200x minecraft:saddle',
        '15300x minecraft:lily_pad',
        '9000x minecraft:leather',
        '9000x minecraft:rotten_flesh',
        '4500x minecraft:stick',
        '4500x minecraft:string',
        '9000x minecraft:bone',
        '50x gtceu:damascus_steel_ingot',
        '900x minecraft:ink_sac',
        '9000x minecraft:tripwire_hook',
        '216x gtceu:ancient_gold_coin',
        '17avaritia:neutron_pile',
        '108x kubejs:zero_point_module_fragments',
        'minecraft:heart_of_the_sea')
        .EUt(GTValues.VA[GTValues.EV])
        .duration(200*8192)*/
    const wood_distillation_super = [
        'gtceu:naphthalene 1640',
        'gtceu:methyl_acetate 16',
        'gtceu:ethanol 16',
        'gtceu:ethylene 20',
        'gtceu:toluene 75',
        'gtceu:acetone 80',
        'gtceu:methane 130',
        'gtceu:acetic_acid 160',
        'gtceu:dimethylbenzene 240',
        'gtceu:benzene 350',
        'gtceu:phenol 485',
        'gtceu:ethylbenzene 2000',
        'gtceu:ammonia 2400',
        'gtceu:methanol 480',
        'gtceu:carbon 490',
        'gtceu:creosote 1120',
        'gtceu:carbon_dioxide 2000',
        'gtceu:hydrogen_sulfide 300',
        'gtceu:carbon_monoxide 340',
        'gtceu:hydrogen 20',
        'minecraft:water 800',
        'gtceu:lubricant 1000',
    ]
    //木化集大成
    gtr.wood_distillation('disksavior:wood_distillation_super')
        .inputFluids('minecraft:lava 16000')//为什么是岩浆啊喂
        .outputFluids(wood_distillation_super)
        .itemOutputs(
            '8x gtceu:coke_dust',
            '8x gtceu:dark_ash_dust'
        )
        .EUt(GTValues.VA[GTValues.MV])
        .duration(400)
    //木化集大成下调蒸馏塔
    gtr.distillation_tower('disksavior:wood_distillation_super')
        .inputFluids('minecraft:lava 16000')
        .outputFluids(wood_distillation_super)
        .itemOutputs(
            '8x gtceu:coke_dust',
            '8x gtceu:dark_ash_dust'
        )
        .EUt(GTValues.VA[GTValues.MV])
        .duration(800)
    //石化工厂配方可用化反运行
    gtr.large_chemical_reactor('disksavior:petrochemical_plant_1')
        .circuit(1)
        .inputFluids('gtceu:oil 1000', 'gtceu:steam 1000')
        .outputFluids(
            'gtceu:lubricant 1000',
            'gtceu:toluene 60',
            'gtceu:benzene 180',
            'gtceu:octane 60',
            'gtceu:butane 80',
            'gtceu:butene 100',
            'gtceu:butadiene 90',
            'gtceu:propane 80',
            'gtceu:propene 400',
            'gtceu:ethane 80',
            'gtceu:ethylene 400',
            'gtceu:methane 400',
            'gtceu:helium 20')
        .EUt(GTValues.VA[GTValues.EV])
        .duration(200)
    gtr.large_chemical_reactor('disksavior:petrochemical_plant_2')
        .circuit(1)
        .inputFluids('gtceu:oil_medium 1000', 'gtceu:steam 1000')
        .outputFluids(
            'gtceu:lubricant 1000',
            'gtceu:toluene 40',
            'gtceu:benzene 200',
            'gtceu:octane 30',
            'gtceu:butane 70',
            'gtceu:butene 100',
            'gtceu:butadiene 100',
            'gtceu:propane 30',
            'gtceu:propene 600',
            'gtceu:ethane 130',
            'gtceu:ethylene 1000',
            'gtceu:methane 1000',
            'gtceu:helium 10')
        .EUt(GTValues.VA[GTValues.EV])
        .duration(200)
    gtr.large_chemical_reactor('disksavior:petrochemical_plant_3')
        .circuit(1)
        .inputFluids('gtceu:oil_heavy 1000', 'gtceu:steam 1000')
        .outputFluids(
            'gtceu:lubricant 1000',
            'gtceu:toluene 240',
            'gtceu:benzene 1200',
            'gtceu:octane 20',
            'gtceu:butane 60',
            'gtceu:butene 240',
            'gtceu:butadiene 150',
            'gtceu:propane 30',
            'gtceu:propene 300',
            'gtceu:ethane 45',
            'gtceu:ethylene 450',
            'gtceu:methane 450',
            'gtceu:helium 10')
        .EUt(GTValues.VA[GTValues.EV])
        .duration(200)
    gtr.large_chemical_reactor('disksavior:petrochemical_plant_4')
        .circuit(1)
        .inputFluids('gtceu:oil_light 1000', 'gtceu:steam 1000')
        .outputFluids(
            'gtceu:lubricant 1000',
            'gtceu:toluene 20',
            'gtceu:benzene 100',
            'gtceu:octane 20',
            'gtceu:butane 120',
            'gtceu:butene 80',
            'gtceu:butadiene 80',
            'gtceu:propane 140',
            'gtceu:propene 90',
            'gtceu:ethane 200',
            'gtceu:ethylene 250',
            'gtceu:methane 2000',
            'gtceu:helium 40')
        .EUt(GTValues.VA[GTValues.EV])
        .duration(200)
    //搅拌机科技
    //搅拌机合木化工厂,加点胶水粘起来就行了真是神奇啊
    gtr.mixer('disksavior:wood_distillation')
        .itemInputs(
            '64x gtceu:distillation_tower',
            '32x gtceu:pyrolyse_oven'
        )
        .inputFluids('gtceu:glue 185254')
        .itemOutputs('gtceu:wood_distillation')
        .EUt(GTValues.VA[GTValues.HV])
        .duration(200)
    //搅拌机合石化工厂
    gtr.mixer('disksavior:petrochemical_plant')
        .itemInputs(
            '128x gtceu:distillation_tower',
            '64x gtceu:cracker',
            '16x gtceu:large_chemical_reactor'
        )
        .inputFluids('gtceu:glue 185254')
        .itemOutputs('gtceu:petrochemical_plant')
        .EUt(GTValues.VA[GTValues.HV])
        .duration(200)
    //粉直出铂系矿泥
    //黝铜
    gtr.large_chemical_reactor('disksavior:boxi_1')
        .itemInputs('gtceu:tetrahedrite_dust')
        .inputFluids('gtceu:nitric_acid 100')
        .itemOutputs('8x gtceu:platinum_group_sludge_dust', 'gtceu:copper_dust')
        .outputFluids('gtceu:oxygen 1000', 'gtceu:sulfuric_acid 1000')
        .EUt(GTValues.VA[GTValues.LV])
        .duration(50)
    //斑铜
    gtr.large_chemical_reactor('disksavior:boxi_2')
        .itemInputs('gtceu:bornite_dust')
        .inputFluids('gtceu:nitric_acid 100')
        .itemOutputs('8x gtceu:platinum_group_sludge_dust', 'gtceu:copper_dust')
        .outputFluids('gtceu:oxygen 1000', 'gtceu:sulfuric_acid 1000')
        .EUt(GTValues.VA[GTValues.LV])
        .duration(50)
    //辉铜
    gtr.large_chemical_reactor('disksavior:boxi_3')
        .itemInputs('gtceu:chalcocite_dust')
        .inputFluids('gtceu:nitric_acid 100')
        .itemOutputs('8x gtceu:platinum_group_sludge_dust', 'gtceu:copper_dust')
        .outputFluids('gtceu:oxygen 1000', 'gtceu:sulfuric_acid 1000')
        .EUt(GTValues.VA[GTValues.LV])
        .duration(50)
    //谢尔顿
    gtr.large_chemical_reactor('disksavior:boxi_4')
        .itemInputs('gtceu:cooperite_dust')
        .inputFluids('gtceu:nitric_acid 100')
        .itemOutputs('16x gtceu:platinum_group_sludge_dust', 'gtceu:nickel_dust')
        .outputFluids('gtceu:oxygen 1000', 'gtceu:sulfuric_acid 1000')
        .EUt(GTValues.VA[GTValues.LV])
        .duration(50)
    //一些去除维度限制的配方
    //大马士革钢
    gtr.chemical_bath('disksavior:fd_dsd')
        .itemInputs('gtceu:steel_dust')
        .inputFluids('gtceu:steam 100')
        .itemOutputs('gtceu:damascus_steel_dust')
        .EUt(GTValues.VA[GTValues.MV])
        .duration(200)
    //主世界数据
    gtr.mixer('disksavior:fd_o')
        .itemInputs(
            'gtceu:data_stick',
            '64x gtceu:stone_dust'
        )
        .circuit(2)
        .inputFluids(
            'gtceu:pcb_coolant 100',
            'gtceu:air 64000'
        )
        .itemOutputs('kubejs:overworld_data')
        .EUt(GTValues.VA[GTValues.LV])
        .duration(20)
    //下界数据
    gtr.mixer('disksavior:fd_n')
        .itemInputs(
            '2x gtceu:data_stick',
            '64x gtceu:netherrack_dust'
        )
        .circuit(2)
        .inputFluids(
            'gtceu:pcb_coolant 100',
            'gtceu:nether_air 64000'
        )
        .itemOutputs('2x kubejs:nether_data')
        .EUt(GTValues.VA[GTValues.MV])
        .duration(20)
    //末地数据
    gtr.mixer('disksavior:fd_e')
        .itemInputs(
            '4x gtceu:data_stick',
            '64x gtceu:endstone_dust'
        )
        .circuit(2)
        .inputFluids(
            'gtceu:pcb_coolant 100',
            'gtceu:ender_air 64000'
        )
        .itemOutputs('4x kubejs:end_data')
        .EUt(GTValues.VA[GTValues.HV])
        .duration(20)
    //罐子爆破
    //单步去绿罐子液态宇宙中子素
    gtr.stellar_forge('disksavior:fkj_cosmicneutronium_1')
        .notConsumable('gtceu:neutronium_nanoswarm')
        .itemInputs('kubejs:quantum_chromodynamic_charge')
        .inputFluids('gtceu:dense_neutron_plasma 2000')
        .outputFluids('gtceu:cosmicneutronium 1000')
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(40)
    gtr.dimensionally_transcendent_plasma_forge('disksavior:fkj_cosmicneutronium_2')
        .notConsumable('avaritia:infinity_catalyst')
        .circuit(1)
        .inputFluids('gtceu:uu_matter 1000000', 'gtceu:dense_neutron_plasma 1000')
        .outputFluids('gtceu:cosmicneutronium 5000', 'gtceu:dimensionallytranscendentresidue 100')
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(800)
        .blastFurnaceTemp(28000)
    gtr.large_chemical_reactor('disksavior:fkj_cosmicneutronium')//混沌物质
        .notConsumable('gtceu:cosmicneutronium_nanoswarm')
        .inputFluids('gtceu:chaos_plasma 1000')
        .outputFluids('gtceu:chaos 1000')
        .EUt(GTValues.VA[GTValues.OpV])
        .duration(200)
    gtr.large_chemical_reactor('disksavior:fkj_uruium')//寰宇织网
        .notConsumable('gtceu:uruium_nanoswarm')
        .inputFluids('gtceu:cosmic_mesh_plasma 1000')
        .outputFluids('gtceu:liquid_cosmic_mesh 1000')
        .EUt(GTValues.VA[GTValues.OpV])
        .duration(200)
    gtr.distort('disksavior:fkj_infinity_catalyst')//无尽催化剂
        .itemInputs('128x kubejs:leptonic_charge', '64x kubejs:essentia_matter', '64x gtceu:degenerate_rhenium_dust', '64x kubejs:charged_triplet_neutronium_sphere')
        .inputFluids('gtceu:infinity 1000', 'gtceu:high_energy_quark_gluon_plasma 100000')
        .itemOutputs('avaritia:infinity_catalyst')
        .outputFluids('gtceu:dimensionallytranscendentresidue 100')
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(200)
        .blastFurnaceTemp(1)
    gtr.stellar_forge('disksavior:fkj_free_proton_gas')//气态高密度自由质子气
        .itemInputs('kubejs:naquadria_charge', 'kubejs:leptonic_charge', 'kubejs:charged_triplet_neutronium_sphere')
        .outputFluids('gtceu:free_proton_gas 10000')
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(200)
        .addData("SCTier", 1)
    gtr.large_chemical_reactor('disksavior:fkj_actinium_superhydride_dust')//超氢化锕粉
        .notConsumable('gtceu:infuscolium_nanoswarm')
        .inputFluids('gtceu:actinium_superhydride_plasma 1000')
        .itemOutputs('13x gtceu:actinium_superhydride_dust')
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(200)
    gtr.large_chemical_reactor('disksavior:fkj_draconiumawakened')//觉醒龙
        .notConsumable('gtceu:draconium_nanoswarm')
        .inputFluids('gtceu:draconiumawakened_plasma 1000')
        .outputFluids('gtceu:draconiumawakened 1000')
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(200)
    gtr.large_chemical_reactor('disksavior:fkj_crystalmatrix')//水晶矩阵
        .notConsumable('gtceu:enderium_nanoswarm')
        .inputFluids('gtceu:crystalmatrix_plasma 1000')
        .outputFluids('gtceu:crystalmatrix 1000')
        .EUt(GTValues.VA[GTValues.OpV])
        .duration(200)
    gtr.large_chemical_reactor('disksavior:fkj_echoite_plasma')//回响合金等离子体
        .notConsumable('gtceu:naquadah_nanoswarm')
        .itemInputs('16x gtceu:exquisite_echo_shard_gem')
        .inputFluids('gtceu:degenerate_rhenium_plasma 1000', 'gtceu:mana 16000', 'gtceu:enderium 1152', 'gtceu:infuscolium 1152')
        .outputFluids('gtceu:echoite_plasma 2304')
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(200)
    gtr.large_chemical_reactor('disksavior:fkj_liquid_degenerate_rhenium')//液态简并态铼
        .notConsumable('gtceu:naquadah_nanoswarm')
        .circuit(1)
        .inputFluids('gtceu:degenerate_rhenium_plasma 1000')
        .outputFluids('gtceu:liquid_degenerate_rhenium 1000')
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(200)
    gtr.large_chemical_reactor('disksavior:fkj_neutronium_sphere')//中子素球体
        .itemInputs('kubejs:naquadria_charge')
        .inputFluids('gtceu:neutronium 1000', 'gtceu:heavy_lepton_mixture 1000')
        .itemOutputs('4x kubejs:neutronium_sphere')
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(200)
    gtr.distort('disksavior:fkj_dense_neutron_plasma')//致密中子素等离子体
        .notConsumable('avaritia:infinity_catalyst')
        .itemInputs('kubejs:naquadria_charge')
        .inputFluids('gtceu:heavy_quark_degenerate_matter_plasma 10000', 'gtceu:periodicium 1000', 'gtceu:neutronium 1000', 'gtceu:heavy_lepton_mixture 1000')
        .outputFluids('gtceu:dense_neutron_plasma 10000', 'gtceu:dimensionallytranscendentresidue 100')
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(200)
        .blastFurnaceTemp(1)
    gtr.stellar_forge('disksavior:fkj_legendarium_plasma')//传奇合金等离子体
        .itemInputs('kubejs:leptonic_charge', '2x gtceu:trinium_dust', '2x gtceu:adamantine_dust')
        .inputFluids('gtceu:naquadriatictaranium 576', 'gtceu:duranium 288', 'gtceu:tritanium 288', 'gtceu:orichalcum 288', 'gtceu:mithril 288', 'gtceu:adamantium 288', 'gtceu:vibranium 288', 'gtceu:neutronium 1000', 'gtceu:heavy_lepton_mixture 1000')
        .outputFluids('gtceu:legendarium_plasma 2304')
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(200)
        .addData("SCTier", 2)
})