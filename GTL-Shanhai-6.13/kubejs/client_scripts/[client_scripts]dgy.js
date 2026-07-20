// priority: 1000
// ============================================================
// 整合来源:
//   1. [client_scripts]dgy.js (原dgy JEI注册)
//   2. 产线扭曲者client_scripts.js (时间扭曲者UI+JEI)
//   3. [可选][非原作]丢client_scripts产线撕裂.js (JEI扩展)
// ============================================================

// ============================================================
// §1 数据列表
// [来源: 产线扭曲者client + 可选client]
// ============================================================

const fluidVeinList = ['neon', 'radon', 'deuterium', 'helium', 'chlorine', 'fluorine', 'hydrochloric_acid', 'sulfuric_acid', 'nitric_acid', 'oil_light', 'oil_medium', 'oil_heavy', 'oil', 'methane', 'xenon', 'helium_3', 'krypton', 'charcoal_byproducts', 'coal_gas','natural_gas', 'unknowwater', 'benzene', 'salt_water']

const oakslist = ['minecraft:oak_log', 'gtceu:rubber_log', 'minecraft:birch_log', 'minecraft:jungle_log', 'minecraft:acacia_log', 'minecraft:dark_oak_log', 'minecraft:mangrove_log', 'minecraft:cherry_log', 'minecraft:spruce_log']

const homoitem = ["gtceu:carbon_dust","gtceu:phosphorus_dust","gtceu:sulfur_dust","gtceu:selenium_dust","gtceu:iodine_dust","gtceu:boron_dust","gtceu:silicon_dust","gtceu:germanium_dust","gtceu:arsenic_dust","gtceu:antimony_dust","gtceu:tellurium_dust","gtceu:astatine_dust","gtceu:aluminium_dust","gtceu:gallium_dust","gtceu:indium_dust","gtceu:tin_dust","gtceu:thallium_dust","gtceu:lead_dust","gtceu:bismuth_dust","gtceu:polonium_dust","gtceu:titanium_dust","gtceu:vanadium_dust","gtceu:chromium_dust","gtceu:manganese_dust","gtceu:iron_dust","gtceu:cobalt_dust","gtceu:nickel_dust","gtceu:copper_dust","gtceu:zinc_dust","gtceu:zirconium_dust","gtceu:niobium_dust","gtceu:molybdenum_dust","gtceu:technetium_dust","gtceu:ruthenium_dust","gtceu:rhodium_dust","gtceu:palladium_dust","gtceu:silver_dust","gtceu:cadmium_dust","gtceu:hafnium_dust","gtceu:tantalum_dust","gtceu:tungsten_dust","gtceu:rhenium_dust","gtceu:osmium_dust","gtceu:iridium_dust","gtceu:platinum_dust","gtceu:gold_dust","gtceu:beryllium_dust","gtceu:magnesium_dust","gtceu:calcium_dust","gtceu:strontium_dust","gtceu:barium_dust","gtceu:radium_dust","gtceu:yttrium_dust","gtceu:lithium_dust","gtceu:sodium_dust","gtceu:potassium_dust","gtceu:rubidium_dust","gtceu:caesium_dust","gtceu:francium_dust","gtceu:scandium_dust","gtceu:actinium_dust","gtceu:thorium_dust","gtceu:protactinium_dust","gtceu:uranium_dust","gtceu:neptunium_dust","gtceu:plutonium_dust","gtceu:americium_dust","gtceu:curium_dust","gtceu:berkelium_dust","gtceu:californium_dust","gtceu:einsteinium_dust","gtceu:fermium_dust","gtceu:mendelevium_dust","gtceu:nobelium_dust","gtceu:lawrencium_dust","gtceu:lanthanum_dust","gtceu:cerium_dust","gtceu:praseodymium_dust","gtceu:neodymium_dust","gtceu:promethium_dust","gtceu:samarium_dust","gtceu:europium_dust","gtceu:gadolinium_dust","gtceu:terbium_dust","gtceu:dysprosium_dust","gtceu:holmium_dust","gtceu:erbium_dust","gtceu:thulium_dust","gtceu:ytterbium_dust","gtceu:lutetium_dust","gtceu:rutherfordium_dust","gtceu:dubnium_dust","gtceu:seaborgium_dust","gtceu:bohrium_dust","gtceu:hassium_dust","gtceu:meitnerium_dust","gtceu:darmstadtium_dust","gtceu:roentgenium_dust","gtceu:copernicium_dust","gtceu:nihonium_dust","gtceu:flerovium_dust","gtceu:moscovium_dust","gtceu:livermorium_dust","gtceu:tennessine_dust","gtceu:oganesson_dust","gtceu:jasper_dust","gtceu:naquadah_dust","gtceu:enriched_naquadah_dust","gtceu:naquadria_dust","gtceu:duranium_dust","gtceu:tritanium_dust","gtceu:mithril_dust","gtceu:orichalcum_dust","gtceu:enderium_dust","gtceu:adamantine_dust","gtceu:vibranium_dust","gtceu:infuscolium_dust","gtceu:taranium_dust","gtceu:draconium_dust","gtceu:starmetal_dust"]

const homofluid = ["gtceu:spacetime","gtceu:raw_star_matter_plasma","gtceu:quark_gluon_plasma","gtceu:heavy_quark_degenerate_matter_plasma","gtceu:neutronium","gtceu:heavy_lepton_mixture","gtceu:hydrogen","gtceu:nitrogen","gtceu:oxygen","gtceu:fluorine","gtceu:chlorine","gtceu:bromine","gtceu:helium","gtceu:neon","gtceu:argon","gtceu:krypton","gtceu:xenon","gtceu:radon","gtceu:mercury","gtceu:deuterium","gtceu:tritium","gtceu:helium_3","gtceu:unknowwater","gtceu:uu_matter"]

const parallel_hatch_list = ['gtceu:iv_parallel_hatch', 'gtceu:luv_parallel_hatch', 'gtceu:zpm_parallel_hatch', 'gtceu:uv_parallel_hatch', 'gtceu:uhv_parallel_hatch', 'gtceu:uev_parallel_hatch', 'gtceu:uiv_parallel_hatch', 'gtceu:uxv_parallel_hatch', 'gtceu:opv_parallel_hatch', 'gtceu:max_parallel_hatch']

const fishing_ground_output = ['gtceu:damascus_steel_nugget', 'avaritia:neutron_pile', 'minecraft:pufferfish', 'minecraft:bone']

// ============================================================
// §2 辅助函数 (NBT 生成)
// [来源: 可选client (packed_infinity_cell系列) + 产线扭曲者client (twisted系列)]
// ============================================================

// 通用: 单一类型无限元件包
const packed_infinity_cell = (cellname, type, list) => {
    let keysNBT = list.map(id => {
        return `{"#c":"ae2:i","id":"expatternprovider:infinity_cell","tag":{"record":{"#c":"ae2:${type}","id":"${id}"}}}`
    }).join(",")
    let amtsNBT = list.map(() => "1L").join(",")
    let nameJson = JSON.stringify({text: cellname})
    return Item.of('ae2:portable_item_cell_16k', `{RepairCost:0,amts:[L;${amtsNBT}],display:{Name:'${nameJson}'},ic:${list.length}L,internalCurrentPower:20000.0d,keys:[${keysNBT}]}`)
}

// 通用: 混合类型 (Item+Fluid) 无限元件包
const packed_infinity_cell_if = (cellname, list1, list2) => {
    let totalLength = list1.length + list2.length
    let keys1 = list1.map(id => `{"#c":"ae2:i","id":"expatternprovider:infinity_cell","tag":{"record":{"#c":"ae2:i","id":"${id}"}}}`)
    let keys2 = list2.map(id => `{"#c":"ae2:i","id":"expatternprovider:infinity_cell","tag":{"record":{"#c":"ae2:f","id":"${id}"}}}`)
    let allKeys = keys1.concat(keys2).join(",")
    let amtsNBT = Array(totalLength).fill("1L").join(",")
    let nameJson = JSON.stringify({text: cellname})
    return Item.of('ae2:portable_item_cell_16k', `{RepairCost:0,amts:[L;${amtsNBT}],display:{Name:'${nameJson}'},ic:${totalLength}L,internalCurrentPower:20000.0d,keys:[${allKeys}]}`)
}

// 通用: 存储元件包 (带数量)
const packed_item_cell_nbt = (list) => {
    let spiltedlist = list.map(id => id.split('x '))
    let keysNBT = spiltedlist.map(id => `{"#c":"ae2:i","id":"${id[1]}"}`).join(",")
    let amtsNBT = spiltedlist.map(id => `${id[0]}L`).join(",")
    return `{RepairCost:0,amts:[L;${amtsNBT}],ic:${list.length}L,internalCurrentPower:2000000.0d,keys:[${keysNBT}]}`
}

// 产线扭曲者: 单一类型 (twisted_ 前缀避免与服务端全局函数冲突)
const twisted_packed_infinity_cell = (cellname, type, list) => packed_infinity_cell(cellname, type, list)

// 产线扭曲者: 混合类型
const twisted_packed_infinity_cell_if = (cellname, itemList, fluidList) => packed_infinity_cell_if(cellname, itemList, fluidList)

// ============================================================
// §3 JEI Subtypes 注册
// [来源: 可选client + 产线扭曲者client]
// ============================================================

JEIEvents.subtypes(event => {
    // [来源: 可选client] AE 硬盘 NBT 判定
    event.useNBT('ae2:portable_item_cell_16k')
    event.useNBT('expatternprovider:infinity_cell')
    parallel_hatch_list.forEach(i => { event.useNBT(i) })
    event.useNBT('gtceu:auto_configuration_maintenance_hatch')
    event.useNBT('gtceu:configurable_maintenance_hatch')
    event.useNBT('gtladditions:macro_atomic_resonant_fragment_stripper')
    event.useNBT('ae2:item_storage_cell_1k')

    // [来源: 产线扭曲者client] 伪神之锻炉 & 天球引擎 NBT
    event.useNBT('gtladditions:forge_of_the_antichrist')
    event.useNBT('gtladditions:thread_modifier_hatch')
})

// ============================================================
// §4 JEI 添加物品
// [来源: dgy (原) + 可选client + 产线扭曲者client]
// ============================================================

JEIEvents.addItems(event => {
    // ---------- [来源: dgy] 太空电梯快速采集模块 MK1 ~ MK6 ----------
    for (let i = 1; i <= 6; i++) {
        event.add(`thetornproductionline:space_elevator_miner_module_mk${i}`)
    }

    // [来源: dgy] 星门构成模块
    event.add('thetornproductionline:stargate_constitution_module')

    // [来源: dgy] 无限星能火箭燃料元件 / 无限凛冰粉元件
    event.add(Item.of('expatternprovider:infinity_cell', '{record:{"#c":"ae2:f",id:"gtceu:stellar_energy_rocket_fuel"}}'))
    event.add(Item.of('expatternprovider:infinity_cell', '{record:{"#c":"ae2:i",id:"kubejs:dust_cryotheum"}}'))

    // [来源: dgy] 温室/碎片/生物模块
    event.add('thetornproductionline:greenhouse_speed_cultivation_module')
    event.add('thetornproductionline:easy_world_fragment_miner_module')
    event.add('thetornproductionline:advanced_world_fragment_miner_module')
    event.add('thetornproductionline:ultimate_world_fragment_miner_module')
    event.add('thetornproductionline:high_speed_bio_data_module')
    event.add(Item.of('expatternprovider:infinity_cell', '{record:{"#c":"ae2:f",id:"gtceu:biomass"}}'))
    event.add(Item.of('expatternprovider:infinity_cell', '{record:{"#c":"ae2:i",id:"kubejs:resonating_gem"}}'))
    event.add(Item.of('expatternprovider:infinity_cell', '{record:{"#c":"ae2:i",id:"gtceu:cosmicneutronium"}}'))

    // [来源: dgy] 基岩流体无限元件包
    let bfNBT = (() => {
        const bedrockFluids = [
            "gtceu:oil_heavy", "gtceu:coal_gas", "gtceu:krypton", "gtceu:helium_3",
            "gtceu:methane", "gtceu:chlorine", "gtceu:helium", "gtceu:oil",
            "gtceu:oil_light", "gtceu:unknowwater", "gtceu:benzene", "gtceu:natural_gas",
            "gtceu:charcoal_byproducts", "gtceu:neon", "gtceu:deuterium", "gtceu:xenon",
            "gtceu:radon", "gtceu:hydrochloric_acid", "gtceu:nitric_acid", "gtceu:fluorine",
            "gtceu:sulfuric_acid", "minecraft:lava"
        ]
        let nbtKeys = bedrockFluids.map(id =>
            `{"#c":"ae2:i","id":"expatternprovider:infinity_cell","tag":{"record":{"#c":"ae2:f","id":"${id}"}}}`
        ).join(",")
        let nbtAmts = Array(bedrockFluids.length).fill("1L").join(",")
        return `{RepairCost:0,amts:[L;${nbtAmts}],display:{Name:'{"text":"Pacote de componentes ilimitados do Bedrock Fluid"}'},ic:${bedrockFluids.length}L,internalCurrentPower:20000.0d,keys:[${nbtKeys}]}`
    })()
    event.add(Item.of('ae2:portable_item_cell_16k', bfNBT))

    // [来源: dgy] 温室无限元件包
    let ghNBT = (() => {
        const greenhouseItems = [
            "gtceu:sticky_resin", "gtceu:plant_ball",
            "minecraft:spruce_log", "minecraft:cherry_log", "minecraft:mangrove_log",
            "minecraft:birch_log", "gtceu:rubber_log", "minecraft:acacia_log",
            "minecraft:oak_log", "minecraft:jungle_log", "minecraft:dark_oak_log",
            "minecraft:potato", "minecraft:sweet_berries", "minecraft:carrot",
            "minecraft:wheat", "minecraft:kelp", "minecraft:cocoa_beans",
            "minecraft:melon", "minecraft:beetroot", "minecraft:red_mushroom",
            "minecraft:nether_wart", "minecraft:sugar_cane", "minecraft:vine",
            "minecraft:brown_mushroom"
        ]
        let gKeys = greenhouseItems.map(id =>
            `{"#c":"ae2:i","id":"expatternprovider:infinity_cell","tag":{"record":{"#c":"ae2:i","id":"${id}"}}}`
        ).join(",")
        let gAmts = Array(greenhouseItems.length).fill("1L").join(",")
        return `{RepairCost:0,amts:[L;${gAmts}],display:{Name:'{"text":"Pacote de elementos ilimitados de estufa"}'},ic:${greenhouseItems.length}L,internalCurrentPower:20000.0d,keys:[${gKeys}]}`
    })()
    event.add(Item.of('ae2:portable_item_cell_16k', ghNBT))

    // [来源: dgy] 超维物品存储元件
    const superCellContent = ['2208x kubejs:spacetime_compression_field_generator', '16x gtceu:eye_of_harmony']
    event.add(Item.of('ae2:item_storage_cell_1k', packed_item_cell_nbt(superCellContent)))

    // [来源: dgy] 便携化学扭曲模块
    for (let mk = 1; mk <= 4; mk++) {
        event.add(`kubejs:portable_chem_distort_module_mk${mk}`)
    }

    // ---------- [来源: 可选client] 批量注册无限流体单元 ----------
    fluidVeinList.forEach(fluid => {
        event.add(Item.of('expatternprovider:infinity_cell', '{record:{"#c":"ae2:f",id:"gtceu:' + fluid + '"}}'))
    })
    fishing_ground_output.forEach(i => {
        event.add(Item.of('expatternprovider:infinity_cell', `{record:{"#c":"ae2:i",id:"${i}"}}`))
    })
    event.add(Item.of('expatternprovider:infinity_cell', '{record:{"#c":"ae2:f",id:"minecraft:lava"}}'))

    // [来源: 可选client] 并行仓压缩NBT
    for (let i = 0; i < parallel_hatch_list.length; i++) {
        event.add(Item.of(parallel_hatch_list[i], `{BlockEntityTag:{currentParallel:${4**(i+4)}},display:{Lore:['"Compressão de um estágio. Número real de paralelos: ${4**(i+4)}. Coloque com cuidado. O paralelismo será redefinido após a mineração/clique."']}}`))
        event.add(Item.of(parallel_hatch_list[i], `{BlockEntityTag:{currentParallel:${4**(i+5)}},display:{Lore:['"Compressão dupla. Número real de paralelos: ${4**(i+5)}. Coloque com cuidado. O paralelismo será redefinido após a mineração/clique."']}}`))
        event.add(Item.of(parallel_hatch_list[i], `{BlockEntityTag:{currentParallel:${4**(i+6)}},display:{Lore:['"Compressão tripla Número real de paralelos: ${4**(i+6)} Coloque com cuidado O paralelismo será redefinido após a mineração/clique"']}}`))
    }

    // [来源: 可选client] 宏原子 + 维护仓NBT
    event.add(Item.of('gtladditions:macro_atomic_resonant_fragment_stripper', '{BlockEntityTag:{astralArrayCount:382},display:{Lore:[\'"O macroátomo da teoria da realização do paradoxo foi desbloqueado e 382 arranjos estelares foram inseridos nele. Como host, você pode obter Long. MAX em paralelo, combinando-o com a Eternal Coil."\']}}'))
    event.add(Item.of('gtceu:configurable_maintenance_hatch', '{BlockEntityTag:{durationMultiplier:2.0f,maintenanceProblems:127b},display:{Lore:[\'"O multiplicador de tempo é 2,0x. Foi mantido uma vez. Coloque-o com cuidado. O status de manutenção e o multiplicador de tempo serão redefinidos após a mineração."\']}}'))
    event.add(Item.of('gtceu:auto_configuration_maintenance_hatch', '{BlockEntityTag:{durationMultiplier:2.0f},display:{Lore:[\'"O multiplicador de tempo é 2,0x. Coloque-o com cuidado. O multiplicador de tempo será zerado após a mineração."\']}}'))

    // [来源: 可选client] 批量注册无限原木单元
    oakslist.forEach(log => {
        event.add(Item.of('expatternprovider:infinity_cell', '{record:{"#c":"ae2:i",id:"' + log + '"}}'))
    })

    // [来源: 可选client] 单个无限单元
    const simpleItems = ['ae2:fluid_storage_cell_1k','minecraft:red_mushroom', 'minecraft:beetroot', 'minecraft:melon', 'minecraft:cocoa_beans', 'minecraft:kelp', 'minecraft:wheat', 'minecraft:carrot', 'minecraft:sweet_berries', 'minecraft:potato', 'minecraft:brown_mushroom', 'minecraft:vine', 'minecraft:sugar_cane', 'minecraft:nether_wart','gtceu:fertilizer','minecraft:dirt',"ae2:matter_ball","ae2:singularity","gtceu:sticky_resin", "gtceu:plant_ball", "gtceu:meat_dust", "kubejs:scrap", "kubejs:quantum_chromodynamic_charge", "kubejs:timepiece"]
    simpleItems.forEach(id => event.add(Item.of('expatternprovider:infinity_cell', '{record:{"#c":"ae2:i",id:"' + id + '"}}')))

    const simpleFluids = ["gtceu:steam","gtceu:rocket_fuel_h8n4c2o4", "gtceu:distilled_water", "gtceu:salt_water", "gtceu:ice", "gtceu:liquid_helium", "gtceu:fish_oil", "gtceu:lubricant", "gtceu:uu_matter", "gtceu:uu_amplifier", "gtceu:nitrogen", "gtceu:oxygen", "gtceu:hydrogen", "minecraft:water"]
    simpleFluids.forEach(id => event.add(Item.of('expatternprovider:infinity_cell', '{record:{"#c":"ae2:f",id:"' + id + '"}}')))

    // [来源: 可选client] 复杂元件包
    const packed_item_cell_items = [
        ['4194304x kubejs:plasma_containment_cell','1024x gtceu:eternity_nanoswarm','1024x gtceu:cooling_tower','1048576x kubejs:time_dilation_containment_unit'],
        ['1024x gtceu:eternity_nanoswarm','1024x gtceu:dimensionally_transcendent_plasma_forge','64x kubejs:eternity_catalyst'],
        ['1024x gtceu:eternity_nanoswarm','1024x gtceu:cooling_tower','655360x kubejs:extremely_durable_plasma_cell'],
        ['16384x gtceu:uruium_nanoswarm'],
        ['2208x kubejs:spacetime_compression_field_generator','16x gtceu:eye_of_harmony'],
        ['16x gtladditions:arcanic_astrograph','14336x gtlcore:create_casing','2352x kubejs:dimension_creation_casing']
    ]
    packed_item_cell_items.forEach(i => {
        event.add(Item.of('ae2:item_storage_cell_1k', packed_item_cell_nbt(i)))
    })

    // [来源: 可选client] 究极元件包
    event.add(packed_infinity_cell('宇宙探测元件包', 'f', ['gtceu:cosmic_element', 'gtceu:starlight', 'gtceu:heavy_lepton_mixture']))
    event.add(packed_infinity_cell('集气元件包', 'f', ['gtceu:air', 'gtceu:liquid_air', 'gtceu:nether_air', 'gtceu:liquid_nether_air', 'gtceu:ender_air', 'gtceu:liquid_ender_air']))
    event.add(packed_infinity_cell('木化石化元件包', 'f', ['gtceu:ethanol','gtceu:naphthalene', 'gtceu:octane', 'gtceu:ethane', 'gtceu:propane', 'gtceu:butane', 'gtceu:toluene', 'gtceu:benzene', 'gtceu:butadiene', 'gtceu:butene', 'gtceu:propene', 'gtceu:ethylene', 'gtceu:methanol', 'gtceu:absolute_ethanol', 'gtceu:methane', 'gtceu:methyl_acetate', 'gtceu:acetic_acid', 'gtceu:carbon', 'gtceu:creosote', 'gtceu:carbon_monoxide', 'gtceu:dimethylbenzene', 'gtceu:acetone', 'gtceu:phenol']))
    event.add(packed_infinity_cell_if('鸿蒙元件包', homoitem, homofluid))
    event.add(packed_infinity_cell('脆弱工具元件包','i',['fragile_tool:fragile_file', 'fragile_tool:fragile_hammer', 'fragile_tool:fragile_mallet', 'fragile_tool:fragile_wrench', 'fragile_tool:fragile_wire_cutter', 'fragile_tool:fragile_crowbar', 'fragile_tool:fragile_saw', 'fragile_tool:fragile_screwdriver','fragile_tool:fragile_knife','fragile_tool:fragile_mortar']))
    event.add(packed_infinity_cell('通用电路板元件包','i',['kubejs:ulv_universal_circuit', 'kubejs:lv_universal_circuit', 'kubejs:mv_universal_circuit', 'kubejs:hv_universal_circuit', 'kubejs:ev_universal_circuit', 'kubejs:iv_universal_circuit', 'kubejs:luv_universal_circuit', 'kubejs:zpm_universal_circuit', 'kubejs:uv_universal_circuit', 'kubejs:uhv_universal_circuit', 'kubejs:uev_universal_circuit', 'kubejs:uiv_universal_circuit', 'kubejs:uxv_universal_circuit', 'kubejs:opv_universal_circuit', 'kubejs:max_universal_circuit']))

    // [来源: 可选client] 黑洞元件包 (gtl_extend)
    if (Platform.isLoaded('gtl_extend')) {
        let bhmdo = homofluid.concat(['gtceu:taranium_rich_liquid_helium_4_plasma', 'gtceu:quark_gluon_plasma', 'gtceu:dense_neutron_plasma', 'gtceu:high_energy_quark_gluon_plasma', 'gtceu:eternity', 'gtceu:cosmic_mesh_plasma', 'gtceu:actinium_superhydride_plasma', 'gtceu:dimensionallytranscendentcrudecatalyst', 'gtceu:vibranium_plasma', 'gtceu:adamantium_plasma', 'gtceu:silver_plasma', 'gtceu:oxygen_plasma', 'gtceu:nitrogen_plasma', 'gtceu:iron_plasma', 'gtceu:helium_plasma', 'gtceu:argon_plasma', 'gtceu:nickel_plasma', 'gtceu:infuscolium_plasma', 'gtceu:orichalcum_plasma', 'gtceu:starmetal_plasma', 'gtceu:draconiumawakened_plasma', 'gtceu:legendarium_plasma', 'gtceu:echoite_plasma', 'gtceu:crystalmatrix_plasma', 'gtceu:mithril_plasma', 'gtceu:chaos_plasma', 'gtceu:flyb_plasma', 'gtceu:quasifissioning_plasma', 'gtceu:celestialtungsten_plasma', 'gtceu:astraltitanium_plasma', 'gtceu:quantumchromodynamically_confined_matter_plasma', 'gtceu:metastable_hassium_plasma', 'gtceu:degenerate_rhenium_plasma', 'gtceu:heavy_quark_degenerate_matter_plasma', 'gtceu:enderium_plasma'])
        event.add(packed_infinity_cell_if('黑洞元件包', homoitem, bhmdo))
    }

    // [来源: 可选client] 送AE硬盘 + 时空奇点
    event.add(Item.of('ae2:portable_item_cell_16k', '{amts:[L;128L,1L,16L,1L,5L,1L,1L,64L,1L,16L,128L,5L],ic:367L,internalCurrentPower:2000000.0d,keys:[{"#c":"ae2:i",id:"ae2:blank_pattern"},{"#c":"ae2:i",id:"expatternprovider:ex_pattern_access_part"},{"#c":"ae2:i",id:"ae2:molecular_assembler"},{"#c":"ae2:i",id:"gtceu:echoite_vajra",tag:{DisallowContainerItem:0b,GT.Behaviours:{DisableShields:1b,Mode:2b,RelocateMinedBlocks:1b,TreeFelling:1b},GT.Tool:{Damage:0,Enchantability:10,HarvestLevel:6,MaxDamage:63,ToolSpeed:10.0f},HideFlags:2,Unbreakable:1b}},{"#c":"ae2:i",id:"ae2:64k_crafting_storage"},{"#c":"ae2:i",id:"ae2:pattern_encoding_terminal"},{"#c":"ae2:i",id:"ae2:creative_energy_cell"},{"#c":"ae2:i",id:"ae2:speed_card"},{"#c":"ae2:i",id:"ae2:crafting_terminal"},{"#c":"ae2:i",id:"expatternprovider:ex_pattern_provider"},{"#c":"ae2:i",id:"ae2:fluix_glass_cable"},{"#c":"ae2:i",id:"mae2:64x_crafting_accelerator"}]}'))
    event.add(Item.of('avaritia:singularity', '{Id:"avaritia:spacetime"}'))

    // ---------- [来源: 产线扭曲者client] 伪神之锻炉 + 天球引擎 NBT ----------
    let nbtStringForge = `{BlockEntityTag:{runningSecs:72000L},display:{Name:'{"text":"A Forja do Falso Deus Final","color":"#FF4500","bold":true,"italic":true}',Lore:['"§6§lA Forja do Falso Deus·Forma Definitiva"','"§e§nApós as intermináveis ​​​​voltas e reviravoltas da matriz de flutuação quântica, o poder infinito criou a base do falso deus"','"§7§mTudo na UE que engoliu 9.2E em um segundo chega ao fim"','"§5§ocarrega todas as coisas e rompe as algemas do mundo mundano"','"§c§kQueime tudo no mundo..."']}}`
    event.add(Item.of('gtladditions:forge_of_the_antichrist', nbtStringForge))

    let nbtStringEngine = `{BlockEntityTag:{astralArrayInventory:{Items:[{Count:127,Slot:0,id:"gtladditions:astral_array"}]}},display:{Name:'{"text":"Motor de esfera superceleste","color":"#AAFFAA","bold":true}',Lore:['"§7━━━━━━━━━━━━━━━━"','"§6incorporado §ematriz de calibre estrela 127 §6","italic":false','"Saída de energia estrela §b: §3+∞ §b/ tick"','"§7━━━━━━━━━━━━━━━━"','"§d§o\"A batida dos corações das estrelas\" §d"']}}`
    event.add(Item.of('gtladditions:thread_modifier_hatch', nbtStringEngine))

    // [来源: 产线扭曲者client] 等离子/鸿蒙/部件元件包
    const plasmaFluids = ["gtceu:argon_plasma", "gtceu:heavy_quark_degenerate_matter_plasma","gtceu:echoite_plasma", "gtceu:raw_star_matter_plasma","gtceu:legendarium_plasma", "gtceu:metastable_hassium_plasma","gtceu:degenerate_rhenium_plasma", "gtceu:quark_gluon_plasma","gtceu:celestialtungsten_plasma", "gtceu:chaos_plasma","gtceu:starmetal_plasma", "gtceu:enderium_plasma","gtceu:oxygen_plasma", "gtceu:nitrogen_plasma","gtceu:orichalcum_plasma", "gtceu:quasifissioning_plasma","gtceu:vibranium_plasma", "gtceu:astraltitanium_plasma","gtceu:cosmic_mesh_plasma", "gtceu:taranium_rich_liquid_helium_4_plasma","gtceu:dense_neutron_plasma", "gtceu:draconiumawakened_plasma","gtceu:nickel_plasma", "gtceu:infuscolium_plasma","gtceu:flyb_plasma", "gtceu:high_energy_quark_gluon_plasma","gtceu:quantumchromodynamically_confined_matter_plasma","gtceu:plutonium_241_plasma", "gtceu:iron_plasma","gtceu:silver_plasma", "gtceu:actinium_superhydride_plasma","gtceu:crystalmatrix_plasma", "gtceu:mithril_plasma","gtceu:adamantium_plasma", "gtceu:helium_plasma"]
    event.add(twisted_packed_infinity_cell('等离子元件包', 'f', plasmaFluids))

    const hongmengItems = ["gtceu:white_dwarf_mtter_dust", "gtceu:black_dwarf_mtter_dust","ae2:sky_dust", "gtceu:trinium_dust","gtceu:plutonium_241_dust", "gtceu:titanium_50_dust","gtceu:copper76_dust", "gtceu:uranium_235_dust","gtceu:perditio_crystal_dust", "gtceu:earth_crystal_dust","gtceu:ignis_crystal_dust", "gtceu:tartarite_dust","gtceu:uruium_dust", "gtceu:force_dust","gtceu:alien_algae_dust", "gtceu:bloodstone_dust","minecraft:netherite_scrap", "gtceu:purified_tengam_dust","gtceu:quantanium_dust", "gtceu:bedrock_dust","gtceu:damascus_steel_dust", "avaritia:neutron_pile","gtceu:certus_quartz_dust", "ae2:fluix_dust"]
    event.add(twisted_packed_infinity_cell('鸿蒙+元件包', 'i', hongmengItems))

    const componentItems = ["gtceu:lv_electric_motor", "gtceu:lv_electric_pump", "gtceu:lv_conveyor_module", "gtceu:lv_robot_arm","gtceu:lv_electric_piston", "gtceu:lv_emitter", "gtceu:lv_sensor", "gtceu:lv_field_generator","gtceu:mv_electric_motor", "gtceu:mv_electric_pump", "gtceu:mv_conveyor_module", "gtceu:mv_robot_arm","gtceu:mv_electric_piston", "gtceu:mv_emitter", "gtceu:mv_sensor", "gtceu:mv_field_generator","gtceu:hv_electric_motor", "gtceu:hv_electric_pump", "gtceu:hv_conveyor_module", "gtceu:hv_robot_arm","gtceu:hv_electric_piston", "gtceu:hv_emitter", "gtceu:hv_sensor", "gtceu:hv_field_generator","gtceu:ev_electric_motor", "gtceu:ev_electric_pump", "gtceu:ev_conveyor_module", "gtceu:ev_robot_arm","gtceu:ev_electric_piston", "gtceu:ev_emitter", "gtceu:ev_sensor", "gtceu:ev_field_generator","gtceu:iv_electric_motor", "gtceu:iv_electric_pump", "gtceu:iv_conveyor_module", "gtceu:iv_robot_arm","gtceu:iv_electric_piston", "gtceu:iv_emitter", "gtceu:iv_sensor", "gtceu:iv_field_generator","gtceu:luv_electric_motor", "gtceu:luv_electric_pump", "gtceu:luv_conveyor_module", "gtceu:luv_robot_arm","gtceu:luv_electric_piston", "gtceu:luv_emitter", "gtceu:luv_sensor", "gtceu:luv_field_generator","gtceu:zpm_electric_motor", "gtceu:zpm_electric_pump", "gtceu:zpm_conveyor_module", "gtceu:zpm_robot_arm","gtceu:zpm_electric_piston", "gtceu:zpm_emitter", "gtceu:zpm_sensor", "gtceu:zpm_field_generator","gtceu:uv_electric_motor", "gtceu:uv_electric_pump", "gtceu:uv_conveyor_module", "gtceu:uv_robot_arm","gtceu:uv_electric_piston", "gtceu:uv_emitter", "gtceu:uv_sensor", "gtceu:uv_field_generator","gtceu:uhv_electric_motor", "gtceu:uhv_electric_pump", "gtceu:uhv_conveyor_module", "gtceu:uhv_robot_arm","gtceu:uhv_electric_piston", "gtceu:uhv_emitter", "gtceu:uhv_sensor", "gtceu:uhv_field_generator","gtceu:uev_electric_motor", "gtceu:uev_electric_pump", "gtceu:uev_conveyor_module", "gtceu:uev_robot_arm","gtceu:uev_electric_piston", "gtceu:uev_emitter", "gtceu:uev_sensor", "gtceu:uev_field_generator","gtceu:uiv_electric_motor", "gtceu:uiv_electric_pump", "gtceu:uiv_conveyor_module", "gtceu:uiv_robot_arm","gtceu:uiv_electric_piston", "gtceu:uiv_emitter", "gtceu:uiv_sensor", "gtceu:uiv_field_generator","gtceu:uxv_electric_motor", "gtceu:uxv_electric_pump", "gtceu:uxv_conveyor_module", "gtceu:uxv_robot_arm","gtceu:uxv_electric_piston", "gtceu:uxv_emitter", "gtceu:uxv_sensor", "gtceu:uxv_field_generator","gtceu:opv_electric_motor", "gtceu:opv_electric_pump", "gtceu:opv_conveyor_module", "gtceu:opv_robot_arm","gtceu:opv_electric_piston", "gtceu:opv_emitter", "gtceu:opv_sensor", "gtceu:opv_field_generator","gtlcore:max_electric_motor", "gtlcore:max_electric_pump", "gtlcore:max_conveyor_module", "gtlcore:max_robot_arm","gtlcore:max_electric_piston", "gtlcore:max_emitter", "gtlcore:max_sensor", "gtlcore:max_field_generator"]
    event.add(twisted_packed_infinity_cell('部件元件包', 'i', componentItems))
})

// ============================================================
// §5 物品 Tooltip
// [来源: 产线扭曲者client]
// ============================================================

ItemEvents.tooltip(event => {
    event.add("assembly_line_distorter:qiong_yu_wu_zhi", "§d§n[Material de nível final]");
    event.add("assembly_line_distorter:qiong_yu_wu_zhi", "§d§n[Função]");
    event.add("assembly_line_distorter:qiong_yu_wu_zhi", "§d§n[Simulação Espacial]");
    event.add("assembly_line_distorter:qiong_yu_wu_zhi", "§d§n[Simulação de universo de alta velocidade do manipulador quântico]");
    event.add("assembly_line_distorter:qiong_yu_wu_zhi", "§d§n[Produção em lote do circuito Qiongyu]");

    const tiers = ["ulv", "lv", "mv", "hv", "ev", "iv", "luv", "zpm", "uv", "uhv", "uev", "uiv", "uxv", "opv", "max"];
    tiers.forEach(tier => {
        const itemId = `assembly_line_distorter:qiong_yu_dian_lu_${tier}`;
        event.add(itemId, `§d§n[终焉级电路 · ${tier.toUpperCase()}]`);
        event.add(itemId, "§d§n[Função]");
        event.add(itemId, `§d§n[${tier.toUpperCase()}级电路配方]`);
    });
});

// ============================================================
// §6 客户端事件 (按键处理)
// [来源: 产线扭曲者client]
// ============================================================

ClientEvents.tick(event => {
    if (!event.player) return
    const key = global.ttwToggleKey
    if (key && key.consumeClick()) {
        const { player } = event
        if (player.isShiftKeyDown()) {
            player.sendData('ttw_tier_cycle', {})
        } else {
            player.sendData('ttw_toggle_pressed', {})
        }
        player.playSound('minecraft:block.beacon.activate')
    }
})