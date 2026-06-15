//东西很多的配方放这
ServerEvents.recipes(event => {
    const gtr = event.recipes.gtceu
    const packed_infinity_cell = (cellname, type, list) => {//从产线撕裂里扒过来的,感谢@？(-5周目max小登) 
        const list_length = list.length
        let a = "1L,"
        a = a.repeat(list_length - 1) + '1L'
        let b = "{\"#c\":\"ae2:i\",id:\"expatternprovider:infinity_cell\",tag:{record:{\"#c\":\"ae2:" + type + "\",id:\"" + list[0] + "\"}}}"
        for (let i = 1; i < list_length; i++) {
            b = b + ",{\"#c\":\"ae2:i\",id:\"expatternprovider:infinity_cell\",tag:{record:{\"#c\":\"ae2:" + type + "\",id:\"" + list[i] + "\"}}}"
        }
        return Item.of('ae2:portable_item_cell_16k',
            "{RepairCost:0,amts:[L;" + a + "],display:{Name:'{\"text\":\"" + cellname + "\"}'},ic:" + list_length + "L,internalCurrentPower:20000.0d,keys:[" + b + "]}")
    }
    //温室&屠宰场元件包
    gtr.assembler('disksavior:greenhouse_slaughterhouse_pack')
        .circuit(1)
        .itemInputs('2147483647x gtceu:greenhouse', '21x minecraft:campfire', '185254x gtceu:large_greenhouse', '2147483647x gtceu:slaughterhouse', '22x minecraft:dirt', '14x minecraft:grass', '27x minecraft:iron_sword', '185254x minecraft:poisonous_potato')
        .inputFluids('gtceu:glue 185254000')
        .itemOutputs(packed_infinity_cell('Greenhouse & Slaughterhouse Component Package', 'i', [
            //温室
            'minecraft:apple', 'minecraft:oak_sapling', 'minecraft:oak_log', 'minecraft:spruce_sapling', 'minecraft:spruce_log', 'minecraft:birch_sapling', 'minecraft:birch_log', 'minecraft:jungle_sapling', 'minecraft:jungle_log', 'minecraft:acacia_sapling', 'minecraft:acacia_log', 'minecraft:dark_oak_sapling', 'minecraft:dark_oak_log', 'minecraft:mangrove_propagule', 'minecraft:mangrove_log', 'minecraft:cherry_sapling', 'minecraft:cherry_log', 'minecraft:pumpkin', 'minecraft:pumpkin_seeds', 'minecraft:beetroot', 'minecraft:beetroot_seeds', 'minecraft:sweet_berries', 'minecraft:glow_berries', 'minecraft:wheat', 'minecraft:wheat_seeds', 'minecraft:melon', 'minecraft:melon_seeds', 'minecraft:carrot', 'minecraft:sugar_cane', 'minecraft:kelp', 'minecraft:cactus', 'minecraft:potato', 'minecraft:cocoa_beans', 'minecraft:brown_mushroom', 'minecraft:red_mushroom', 'minecraft:nether_wart', 'minecraft:bamboo', 'minecraft:vine', 'minecraft:sea_pickle', 'gtceu:rubber_sapling', 'gtceu:rubber_log', 'gtceu:sticky_resin', 'minecraft:poisonous_potato', 'minecraft:grass', 'minecraft:melon_slice', 'minecraft:sunflower', 'minecraft:sponge', 'minecraft:honeycomb',
            //屠宰场重要的五个前置
            'minecraft:wither_skeleton_skull', 'minecraft:ghast_tear', 'minecraft:blaze_rod', 'minecraft:slime_ball', 'minecraft:ender_pearl',
            //回响系列
            'minecraft:echo_shard', 'minecraft:sculk_sensor', 'minecraft:sculk_catalyst', 'minecraft:sculk',
            //其他
            'minecraft:bone', 'minecraft:porkchop', 'minecraft:beef', 'minecraft:rabbit', 'minecraft:chicken', 'minecraft:mutton', 'minecraft:cod', 'minecraft:tropical_fish', 'minecraft:salmon', 'minecraft:poppy', 'minecraft:feather', 'minecraft:string', 'minecraft:leather', 'minecraft:rabbit_hide', 'minecraft:gunpowder', 'minecraft:rotten_flesh', 'minecraft:spider_eye', 'minecraft:rabbit_foot', 'minecraft:ink_sac', 'minecraft:glow_ink_sac', 'minecraft:nautilus_shell', 'minecraft:glowstone_dust', 'minecraft:stick', 'minecraft:sugar', 'minecraft:white_wool', 'minecraft:egg'
        ]))
        .EUt(GTValues.VA[GTValues.UV])
        .duration(185254)
    //压缩升阶
    const tiers = ["lv", "mv", "hv", "ev", "iv", "luv", "zpm", "uv", "uhv", "uev", "uiv", "uxv", "opv", "max"]
    //部件装配线外壳
    for (let i = 4; i < tiers.length - 1; i++) {
        let inTier = tiers[i];
        let outTier = tiers[i + 1];
        gtr.mixer(`disksavior:component_assembly_line_casing_stack_${i - 3}`)
            .itemInputs(`4x gtlcore:component_assembly_line_casing_${inTier}`)
            .itemOutputs(`gtlcore:component_assembly_line_casing_${outTier}`)
            .EUt(GTValues.VA[GTValues.IV])
            .duration(200)
    }
    //并行控制仓
    for (let i = 4; i < tiers.length - 1; i++) {
        let inTier = tiers[i];
        let outTier = tiers[i + 1];
        gtr.mixer(`disksavior:parallel_hatch_stack_${i - 3}`)
            .itemInputs(`4x gtceu:${inTier}_parallel_hatch`)
            .itemOutputs(`gtceu:${outTier}_parallel_hatch`)
            .EUt(GTValues.VA[GTValues.IV])
            .duration(200)
    }
    gtr.mixer('disksavior:parallel_hatch_stack_super')
        .itemInputs('4x gtceu:max_parallel_hatch')
        .itemOutputs('gtladditions:super_parallel_hatch')
        .EUt(GTValues.VA[GTValues.IV])
        .duration(20)
    //流体钻机电解
    const ds_fdr_data = [
        {
            tier: 0, notc: 'minecraft:dirt',
            outf: ['gtceu:salt_water 400', 'gtceu:natural_gas 150', 'gtceu:oil_medium 200', 'gtceu:oil_light 250', 'gtceu:oil_heavy 150', 'gtceu:oil 200']
        }, {
            tier: 1, notc: 'ad_astra:moon_stone',
            outf: ['gtceu:helium_3 100', 'gtceu:helium 200']
        }, {
            tier: 2, notc: 'ad_astra:mars_stone',
            outf: ['gtceu:radon 200']
        }, {
            tier: 3, notc: 'minecraft:netherrack',
            outf: ['minecraft:lava 650', 'gtceu:sulfuric_acid 200', 'gtceu:deuterium 150', 'gtceu:helium_3 100', 'gtceu:helium 200', 'gtceu:radon 200', 'gtceu:natural_gas 350']
        }, {
            tier: 4, notc: 'kubejs:ceresstone',
            outf: ['gtceu:neon 200', 'gtceu:radon 150', 'gtceu:xenon 200', 'gtceu:krypton 200']
        }, {
            tier: 5, notc: 'kubejs:ganymedestone',
            outf: ['gtceu:hydrochloric_acid 200', 'gtceu:coal_gas 200']
        }, {
            tier: 6, notc: 'minecraft:end_stone',
            outf: ['gtceu:methane 200', 'gtceu:benzene 150', 'gtceu:charcoal_byproducts 100', 'gtceu:chlorine 200', 'gtceu:fluorine 100', 'gtceu:nitric_acid 200', 'gtceu:neon 200', 'gtceu:radon 150', 'gtceu:xenon 200', 'gtceu:krypton 200', 'gtceu:hydrochloric_acid 200', 'gtceu:coal_gas 200']
        }
    ]
    const ds_fdr_machine = [
        { tier: 0, v: 'mv' },
        { tier: 1, v: 'hv' },
        { tier: 2, v: 'ev' },
        { tier: 5, v: 'zpm' }
    ]
    let ds_fdr_totaloutf = []
    ds_fdr_machine.forEach(m => {
        ds_fdr_data.forEach(r => {
            ds_fdr_totaloutf = ds_fdr_totaloutf.concat(r.outf)
            gtr.electrolyzer(`disksavior:fdr_t${r.tier}_${m.v}`)
                .notConsumable(`${global.disksavior.batch_multiplier.fdr}x gtceu:${m.v}_fluid_drilling_rig`)
                .notConsumable(r.notc)
                .outputFluids(ds_fdr_totaloutf.map(i => `${i.split(' ')[0]} ${Number(i.split(' ')[1]) * global.disksavior.batch_multiplier.fdr * (16 ** m.tier)}`))
                .EUt(GTValues.VA[GTValues.MV] * (4 ** m.tier))
                .duration(4 * ds_fdr_totaloutf.length * global.disksavior.batch_multiplier.fdr)
        })
    })
    //进阶无尽钻机钻全部维度流体
    const ds_fdr_uhv_data = ['gtceu:salt_water 400', 'gtceu:natural_gas 150', 'gtceu:oil_medium 200', 'gtceu:oil_light 250', 'gtceu:oil_heavy 150', 'gtceu:oil 200', 'gtceu:helium_3 100', 'gtceu:helium 200', 'gtceu:radon 200', 'minecraft:lava 650', 'gtceu:sulfuric_acid 200', 'gtceu:deuterium 150', 'gtceu:helium_3 100', 'gtceu:helium 200', 'gtceu:radon 200', 'gtceu:natural_gas 350', 'gtceu:neon 200', 'gtceu:radon 150', 'gtceu:xenon 200', 'gtceu:krypton 200', 'gtceu:hydrochloric_acid 200', 'gtceu:coal_gas 200', 'gtceu:methane 200', 'gtceu:benzene 150', 'gtceu:charcoal_byproducts 100', 'gtceu:chlorine 200', 'gtceu:fluorine 100', 'gtceu:nitric_acid 200', 'gtceu:neon 200', 'gtceu:radon 150', 'gtceu:xenon 200', 'gtceu:krypton 200', 'gtceu:hydrochloric_acid 200', 'gtceu:coal_gas 200', 'gtceu:unknowwater 200']
    gtr.electrolyzer('disksavior:uhv_all')
        .notConsumable('gtceu:advanced_infinite_driller')
        .outputFluids(ds_fdr_uhv_data.map(i => `${i.split(' ')[0]} ${Number(i.split(' ')[1]) * global.disksavior.batch_multiplier.fdr * (16 ** 7)}`))
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(ds_fdr_uhv_data.length * global.disksavior.batch_multiplier.fdr)
    //集气电解
    const ds_gc_data = [
        {
            dim: 0, notc: 'minecraft:dirt',
            outf: ['gtceu:air 10000', 'gtceu:liquid_air 625']
        }, {
            dim: 1, notc: 'minecraft:netherrack',
            outf: ['gtceu:nether_air 10000', 'gtceu:liquid_nether_air 625']
        }, {
            dim: 2, notc: 'minecraft:end_stone',
            outf: ['gtceu:ender_air 10000', 'gtceu:liquid_ender_air 625']
        }
    ]
    const ds_gc_machine = [
        { v: 'lv', value: 0 },
        //{ v: 'mv', value: 1 },
        //{ v: 'hv', value: 2 },
        //{ v: 'ev', value: 3 }
    ]
    ds_gc_data.forEach(data => {
        ds_gc_machine.forEach(machine => {
            gtr.electrolyzer(`disksavior:gc_${machine.v}_${data.dim}`)
                .notConsumable(`${global.disksavior.batch_multiplier.gc}x gtceu:${machine.v}_gas_collector`)
                .notConsumable(data.notc)
                .outputFluids(data.outf.map(i => `${i.split(' ')[0]} ${Number(i.split(' ')[1]) * global.disksavior.batch_multiplier.gc * (16 ** machine.value)}`))
                .EUt(GTValues.VA[GTValues.LV] * (4 ** data.dim))
                .duration(100 * data.outf.length * global.disksavior.batch_multiplier.gc)
        })
    })
    const ds_gc_iv_outf = ['gtceu:air 160000', 'gtceu:liquid_air 10000', 'gtceu:nether_air 40000', 'gtceu:liquid_nether_air 2500', 'gtceu:ender_air 10000', 'gtceu:liquid_ender_air 625']
    gtr.electrolyzer('disksavior:gc_iv')
        .notConsumable(`${global.disksavior.batch_multiplier.gc}x gtceu:large_gas_collector`)
        .outputFluids(ds_gc_iv_outf.map(i => `${i.split(' ')[0]} ${Number(i.split(' ')[1]) * global.disksavior.batch_multiplier.gc * (16 ** 5)}`))
        .EUt(GTValues.VA[GTValues.LuV])
        .duration(100 * ds_gc_iv_outf.length * global.disksavior.batch_multiplier.gc)
    //鸿蒙之眼集大成配方
    //集成了来自群友@aach.aic的鸿蒙之眼+，以及@山海恒长在 的添加物，有删改
    const ds_csi_addf = [
        '1x gtceu:spacetime_dust'
    ]
    const ds_csi_add = [
        '131072x gtceu:white_dwarf_mtter_dust', '131072x gtceu:infused_gold_dust', '131072x gtceu:black_dwarf_mtter_dust', '131072x ae2:sky_dust', '131072x gtceu:trinium_dust', '131072x gtceu:plutonium_241_dust', '131072x gtceu:titanium_50_dust', '131072x gtceu:copper76_dust', '131072x gtceu:uranium_235_dust', '131072x gtceu:perditio_crystal_dust', '131072x gtceu:earth_crystal_dust', '131072x gtceu:ignis_crystal_dust', '131072x gtceu:tartarite_dust', '131072x gtceu:uruium_dust', '131072x gtceu:force_dust', '131072x gtceu:alien_algae_dust', '131072x gtceu:bloodstone_dust', '131072x minecraft:netherite_scrap', '131072x gtceu:purified_tengam_dust', '131072x gtceu:quantanium_dust', '131072x gtceu:bedrock_dust', '131072x gtceu:damascus_steel_dust', '131072x avaritia:neutron_pile', '131072x gtceu:certus_quartz_dust', '131072x ae2:fluix_dust', '131072x gtceu:shirabon_dust', '131072x gtceu:rare_earth_metal_dust', '131072x gtceu:enderium_dust', '131072x gtceu:uraninite_dust', '131072x gtceu:diatomite_dust', '131072x gtceu:bentonite_dust', '131072x gtceu:endstone_dust', '131072x gtceu:cassiterite_dust', '131072x gtceu:bauxite_dust', '131072x gtceu:sapphire_dust', '131072x kubejs:dust_cryotheum', '131072x gtceu:rare_earth_dust', '131072x gtceu:echo_shard_dust', '131072x gtceu:stem_cells', '131072x kubejs:biological_cells'
    ]
    const ds_csi = [
        '131072x gtceu:carbon_dust', '131072x gtceu:phosphorus_dust', '131072x gtceu:sulfur_dust', '131072x gtceu:selenium_dust', '131072x gtceu:iodine_dust', '131072x gtceu:boron_dust', '131072x gtceu:silicon_dust', '131072x gtceu:germanium_dust', '131072x gtceu:arsenic_dust', '131072x gtceu:antimony_dust', '131072x gtceu:tellurium_dust', '131072x gtceu:astatine_dust', '131072x gtceu:aluminium_dust', '131072x gtceu:gallium_dust', '131072x gtceu:indium_dust', '131072x gtceu:tin_dust', '131072x gtceu:thallium_dust', '131072x gtceu:lead_dust', '131072x gtceu:bismuth_dust', '131072x gtceu:polonium_dust', '131072x gtceu:titanium_dust', '131072x gtceu:vanadium_dust', '131072x gtceu:chromium_dust', '131072x gtceu:manganese_dust', '131072x gtceu:iron_dust', '131072x gtceu:cobalt_dust', '131072x gtceu:nickel_dust', '131072x gtceu:copper_dust', '131072x gtceu:zinc_dust', '131072x gtceu:zirconium_dust', '131072x gtceu:niobium_dust', '131072x gtceu:molybdenum_dust', '131072x gtceu:technetium_dust', '131072x gtceu:ruthenium_dust', '131072x gtceu:rhodium_dust', '131072x gtceu:palladium_dust', '131072x gtceu:silver_dust', '131072x gtceu:cadmium_dust', '131072x gtceu:hafnium_dust', '131072x gtceu:tantalum_dust', '131072x gtceu:tungsten_dust', '131072x gtceu:rhenium_dust', '131072x gtceu:osmium_dust', '131072x gtceu:iridium_dust', '131072x gtceu:platinum_dust', '131072x gtceu:gold_dust', '131072x gtceu:beryllium_dust', '131072x gtceu:magnesium_dust', '131072x gtceu:calcium_dust', '131072x gtceu:strontium_dust', '131072x gtceu:barium_dust', '131072x gtceu:radium_dust', '131072x gtceu:yttrium_dust', '131072x gtceu:lithium_dust', '131072x gtceu:sodium_dust', '131072x gtceu:potassium_dust', '131072x gtceu:rubidium_dust', '131072x gtceu:caesium_dust', '131072x gtceu:francium_dust', '131072x gtceu:scandium_dust', '131072x gtceu:actinium_dust', '131072x gtceu:thorium_dust', '131072x gtceu:protactinium_dust', '131072x gtceu:uranium_dust', '131072x gtceu:neptunium_dust', '131072x gtceu:plutonium_dust', '131072x gtceu:americium_dust', '131072x gtceu:curium_dust', '131072x gtceu:berkelium_dust', '131072x gtceu:californium_dust', '131072x gtceu:einsteinium_dust', '131072x gtceu:fermium_dust', '131072x gtceu:mendelevium_dust', '131072x gtceu:nobelium_dust', '131072x gtceu:lawrencium_dust', '131072x gtceu:lanthanum_dust', '131072x gtceu:cerium_dust', '131072x gtceu:praseodymium_dust', '131072x gtceu:neodymium_dust', '131072x gtceu:promethium_dust', '131072x gtceu:samarium_dust', '131072x gtceu:europium_dust', '131072x gtceu:gadolinium_dust', '131072x gtceu:terbium_dust', '131072x gtceu:dysprosium_dust', '131072x gtceu:holmium_dust', '131072x gtceu:erbium_dust', '131072x gtceu:thulium_dust', '131072x gtceu:ytterbium_dust', '131072x gtceu:lutetium_dust', '131072x gtceu:rutherfordium_dust', '131072x gtceu:dubnium_dust', '131072x gtceu:seaborgium_dust', '131072x gtceu:bohrium_dust', '131072x gtceu:hassium_dust', '131072x gtceu:meitnerium_dust', '131072x gtceu:darmstadtium_dust', '131072x gtceu:roentgenium_dust', '131072x gtceu:copernicium_dust', '131072x gtceu:nihonium_dust', '131072x gtceu:flerovium_dust', '131072x gtceu:moscovium_dust', '131072x gtceu:livermorium_dust', '131072x gtceu:tennessine_dust', '131072x gtceu:oganesson_dust', '131072x gtceu:jasper_dust', '131072x gtceu:naquadah_dust', '131072x gtceu:enriched_naquadah_dust', '131072x gtceu:naquadria_dust', '131072x gtceu:duranium_dust', '131072x gtceu:tritanium_dust', '131072x gtceu:mithril_dust', '131072x gtceu:orichalcum_dust', '131072x gtceu:enderium_dust', '131072x gtceu:adamantine_dust', '131072x gtceu:vibranium_dust', '131072x gtceu:infuscolium_dust', '131072x gtceu:taranium_dust', '131072x gtceu:draconium_dust', '131072x gtceu:starmetal_dust'
    ]
    const ds_csf = ['gtceu:spacetime 256', 'gtceu:raw_star_matter_plasma 1310720', 'gtceu:quark_gluon_plasma 1310720', 'gtceu:heavy_quark_degenerate_matter_plasma 1310720', 'gtceu:neutronium 13107200', 'gtceu:heavy_lepton_mixture 13107200', 'gtceu:hydrogen 131072000', 'gtceu:nitrogen 131072000', 'gtceu:oxygen 131072000', 'gtceu:fluorine 131072000', 'gtceu:chlorine 131072000', 'gtceu:bromine 131072000', 'gtceu:helium 131072000', 'gtceu:neon 131072000', 'gtceu:argon 131072000', 'gtceu:krypton 131072000', 'gtceu:xenon 131072000', 'gtceu:radon 131072000', 'gtceu:mercury 131072000', 'gtceu:deuterium 131072000', 'gtceu:tritium 131072000', 'gtceu:helium_3 131072000', 'gtceu:unknowwater 131072000', 'gtceu:uu_matter 131072000']
    const ds_csif = ['gtceu:cosmic_element 1024000', 'gtceu:hydrogen 1024000000', 'gtceu:helium 1024000000']
    gtr.cosmos_simulation('disksavior:show_cs')
        .itemInputs('disksavior:show')
        .itemOutputs(ds_csi_addf)
        .itemOutputs(ds_csi_add)
        .duration(19660800)
    //化反鸿蒙
    //集成了来自群友@aach.aic的鸿蒙之眼+
    gtr.large_chemical_reactor('disksavior:cosmos_simulation_1')
        .notConsumable('gtceu:eye_of_harmony')
        .itemInputs('kubejs:quantum_chromodynamic_charge')
        .inputFluids(ds_csif)
        .itemOutputs(ds_csi_add)
        .itemOutputs(ds_csi)
        .outputFluids(ds_csf)
        .EUt(5277655810867200)
        .duration(1200)
    //化反鸿蒙16384倍
    //相比普通版不加耗电和耗时，因为鸿蒙之眼的耗电和耗时是锁死的，所以这个其实还挺还原 
    //极高密度量子色动力学爆弹
    gtr.compressor('disksavior:quantum_chromodynamic_charge_super')
        .itemInputs(`${global.disksavior.batch_multiplier.cs}x kubejs:quantum_chromodynamic_charge`)
        .itemOutputs('disksavior:quantum_chromodynamic_charge_super')
        .EUt(GTValues.VA[GTValues.OpV])
        .duration(420)
    gtr.large_chemical_reactor('disksavior:cosmos_simulation_super_pro_max_plus_glodversion_16384')
        .notConsumable('gtceu:eye_of_harmony')
        .itemInputs('disksavior:quantum_chromodynamic_charge_super')
        .inputFluids(ds_csif.map(i => `${i.split(' ')[0]} ${Number(i.split(' ')[1]) * global.disksavior.batch_multiplier.cs}`))
        .itemOutputs(ds_csi_addf.map(item => `${parseInt(item.split(' ')[0]) * global.disksavior.batch_multiplier.cs}x ${item.split(' ')[1]}`))
        .itemOutputs(ds_csi_add.map(item => `${parseInt(item.split(' ')[0]) * global.disksavior.batch_multiplier.cs - 1}x ${item.split(' ')[1]}`))
        .itemOutputs(ds_csi.map(item => `${parseInt(item.split(' ')[0]) * global.disksavior.batch_multiplier.cs - 1}x ${item.split(' ')[1]}`))
        .outputFluids(ds_csf.map(i => `${i.split(' ')[0]} ${Number(i.split(' ')[1]) * global.disksavior.batch_multiplier.cs}`))
        .EUt(5277655810867200 / global.disksavior.batch_multiplier.cs)
        .duration(1200)
    //太空电梯集大成
    const ds_se_ore = {
        1: [
            //巴纳德c原木
            '8192x kubejs:barnarda_log', '128x kubejs:glacio_spirit',
            '280x gtceu:tetrahedrite_ore', '140x gtceu:copper_ore', '60x gtceu:bentonite_ore', '40x gtceu:magnetite_ore', '40x gtceu:olivine_ore', '20x gtceu:glauconite_sand_ore', '180x gtceu:almandine_ore', '120x gtceu:pyrope_ore', '60x gtceu:sapphire_ore', '60x gtceu:green_sapphire_ore', '70x gtceu:stibnite_ore', '120x gtceu:uraninite_ore', '90x gtceu:bastnasite_ore', '30x gtceu:molybdenum_ore', '60x gtceu:goethite_ore', '240x gtceu:yellow_limonite_ore', '240x gtceu:hematite_ore', '120x gtceu:malachite_ore', '120x gtceu:soapstone_ore', '80x gtceu:talc_ore', '80x gtceu:glauconite_sand_ore', '40x gtceu:pentlandite_ore', '30x gtceu:neodymium_ore', '60x gtceu:monazite_ore', '180x gtceu:redstone_ore', '120x gtceu:ruby_ore', '60x gtceu:grossular_ore', '40x gtceu:spessartine_ore', '40x gtceu:pyrolusite_ore', '20x gtceu:tantalite_ore', '250x gtceu:chalcopyrite_ore', '10x gtceu:zeolite_ore', '10x gtceu:cassiterite_ore', '50x gtceu:realgar_ore', '60x gtceu:cinnabar_ore', '80x ae2:sky_stone_block', '120x gtceu:saltpeter_ore', '80x gtceu:diatomite_ore', '80x gtceu:electrotine_ore', '40x gtceu:alunite_ore', '240x gtceu:coal_ore', '40x gtceu:rubidium_ore', '90x gtceu:beryllium_ore', '120x gtceu:emerald_ore', '40x gtceu:chalcopyrite_ore', '160x gtceu:iron_ore', '160x gtceu:pyrite_ore', '160x gtceu:copper_ore', '60x gtceu:grossular_ore', '40x gtceu:pyrolusite_ore', '20x gtceu:tantalite_ore', '240x gtceu:magnetite_ore', '160x gtceu:vanadium_magnetite_ore', '80x gtceu:gold_ore', '120x gtceu:lazurite_ore', '80x gtceu:sodalite_ore', '80x gtceu:lapis_ore', '40x gtceu:calcite_ore', '150x gtceu:wulfenite_ore', '30x gtceu:calorite_ore', '120x gtceu:galena_ore', '80x gtceu:silver_ore', '40x gtceu:lead_ore', '100x gtceu:molybdenite_ore', '50x gtceu:molybdenum_ore', '50x gtceu:powellite_ore', '90x gtceu:goethite_ore', '60x gtceu:yellow_limonite_ore', '60x gtceu:kyanite_ore', '40x gtceu:mica_ore', '40x gtceu:bauxite_ore', '20x gtceu:pollucite_ore', '120x gtceu:quartzite_ore', '80x gtceu:certus_quartz_ore', '140x gtceu:zircon_ore', '160x gtceu:cassiterite_ore', '60x gtceu:hematite_ore', '30x gtceu:gold_ore', '40x gtceu:barite_ore', '120x gtceu:red_garnet_ore', '80x gtceu:yellow_garnet_ore', '80x gtceu:amethyst_ore', '40x gtceu:opal_ore', '20x gtceu:alien_algae_ore', '210x gtceu:blue_topaz_ore', '140x gtceu:topaz_ore', '240x gtceu:basaltic_mineral_sand_ore', '160x gtceu:granitic_mineral_sand_ore', '160x gtceu:fullers_earth_ore', '80x gtceu:gypsum_ore', '150x gtceu:rock_salt_ore', '10x gtceu:salt_ore', '50x gtceu:lepidolite_ore', '50x gtceu:spodumene_ore', '140x gtceu:chalcocite_ore', '70x gtceu:bornite_ore', '180x gtceu:redstone_ore', '120x gtceu:ruby_ore', '60x gtceu:cinnabar_ore', '240x gtceu:nether_quartz_ore', '80x gtceu:quartzite_ore', '50x minecraft:ancient_debris', '120x gtceu:apatite_ore', '80x gtceu:tricalcium_phosphate_ore', '40x gtceu:pyrochlore_ore', '300x gtceu:sulfur_ore', '200x gtceu:pyrite_ore', '100x gtceu:sphalerite_ore', '180x gtceu:magnetite_ore', '120x gtceu:vanadium_magnetite_ore', '240x gtceu:cassiterite_sand_ore', '160x gtceu:garnet_sand_ore', '160x gtceu:asbestos_ore', '80x gtceu:diatomite_ore', '240x gtceu:oilsands_ore', '60x gtceu:gold_ore', '80x gtceu:infused_gold_ore', '160x gtceu:bauxite_ore', '80x gtceu:ilmenite_ore', '80x gtceu:aluminium_ore', '60x gtceu:bornite_ore', '40x gtceu:cooperite_ore', '120x gtceu:graphite_ore', '80x gtceu:diamond_ore', '40x gtceu:coal_ore', '40x gtceu:titanium_ore', '120x gtceu:garnierite_ore', '80x gtceu:nickel_ore', '80x gtceu:cobaltite_ore', '40x gtceu:pentlandite_ore', '40x gtceu:platinum_ore', '20x gtceu:palladium_ore', '120x gtceu:scheelite_ore', '80x gtceu:tungstate_ore', '40x gtceu:lithium_ore', '20x gtceu:tellurium_ore', '30x gtceu:tungsten_ore', '180x gtceu:pitchblende_ore', '180x gtceu:naquadah_ore', '120x gtceu:chromite_ore', '60x gtceu:plutonium_ore', '30x gtceu:enriched_naquadah_ore', '90x gtceu:trinium_compound_ore', '30x gtceu:indium_ore'
        ],
        2: ['20x gtceu:jasper_ore', '140x gtceu:red_garnet_ore', '60x gtceu:topaz_ore', '40x gtceu:emerald_ore', '40x gtceu:amethyst_ore', '20x gtceu:celestine_ore'],
        3: ['140x gtceu:iron_ore', '140x gtceu:tin_ore', '60x gtceu:nickel_ore', '60x gtceu:uruium_ore', '40x gtceu:force_ore', '20x gtceu:cobalt_ore', '120x gtceu:bloodstone_ore', '80x gtceu:redstone_ore', '120x gtceu:red_garnet_ore', '40x gtceu:gravel_ruby_ore', '40x gtceu:almandine_ore', '40x gtceu:pyrope_ore'],
        4: ['80x gtceu:naquadah_ore', '40x gtceu:adamantine_compounds_ore', '60x gtceu:rare_earth_metal_ore', '40x gtceu:monazite_ore', '40x gtceu:bastnasite_ore', '20x gtceu:enriched_naquadah_ore', '40x gtceu:earth_crystal_ore', '40x gtceu:ignis_crystal_ore', '80x gtceu:uraninite_ore', '40x gtceu:orichalcum_ore', '60x gtceu:mithril_ore', '80x gtceu:salt_ore'],
        5: ['80x gtceu:enderium_ore', '120x gtceu:sodalite_ore', '60x gtceu:celestine_ore', '80x gtceu:lapis_ore', '60x gtceu:bauxite_ore', '40x gtceu:pitchblende_ore', '40x gtceu:silver_ore', '60x gtceu:andesite_platinum_ore', '60x gtceu:tartarite_ore', '80x gtceu:vibranium_ore', '120x gtceu:aluminium_ore', '120x gtceu:iron_ore'],
        6: ['12x gtceu:lazurite_ore', '80x gtceu:sapphire_ore', '60x gtceu:starmetal_ore', '80x gtceu:green_sapphire_ore', '120x gtceu:yellow_garnet_ore', '80x gtceu:pollucite_ore']
    }
    const ds_se_ore_data = [1, 2, 3, 4, 5, 6]
    let ds_se_totalouti = []
    ds_se_ore_data.forEach(r => {
        ds_se_totalouti = ds_se_totalouti.concat(ds_se_ore[r])
        //console.log(totalOutput)
        //console.log(totalOutput.length)
        gtr.miner_module(`disksavior:ds_se_ore_${r}`)
            .notConsumable(`64x kubejs:space_drone_mk${r}`)
            .notConsumable('gtceu:space_elevator')
            .inputFluids('gtceu:steam 185254')
            .itemOutputs(ds_se_totalouti.map(item => `${parseInt(item.split(' ')[0]) * (8 ** (r - 1))}x ${item.split(' ')[1]}`))
            .EUt(GTValues.VA[GTValues.ZPM] * (4 ** r))
            .duration(9600)
    })
    //此处的数组名的数字指的是该数字+1的级别太空无人机可采集
    const ds_se_fluids = ['gtceu:unknowwater 1000000', 'gtceu:barnarda_air 1000000', 'gtceu:hydrogen 1000000', 'gtceu:helium 1000000', 'gtceu:nitrogen 1000000', 'gtceu:methane 1000000', 'gtceu:sulfur_dioxide 1000000', 'gtceu:carbon_dioxide 1000000', 'gtceu:nitrogen_dioxide 1000000', 'gtceu:ammonia 1000000', 'gtceu:chlorine 1000000', 'gtceu:fluorine 1000000', 'gtceu:carbon_monoxide 1000000', 'gtceu:oxygen 1000000']
    const ds_se_fluid1s = ['gtceu:neon 100000', 'gtceu:argon 100000', 'gtceu:krypton 100000', 'gtceu:xenon 100000', 'gtceu:radon 100000', 'gtceu:helium_3 100000']
    const ds_se_fluid2s = ['gtceu:deuterium 100000', 'gtceu:tritium 100000', 'gtceu:heavy_fuel 100000', 'gtceu:light_fuel 100000', 'gtceu:naphtha 100000', 'gtceu:refinery_gas 100000', 'gtceu:coal_gas 100000', 'gtceu:bromine 100000']
    const ds_se_fluid5s = ['gtceu:white_dwarf_mtter 100000', 'gtceu:black_dwarf_mtter 100000']
    gtr.drilling_module('disksavior:ds_se_fluid_1')
        .notConsumable('64x kubejs:space_drone_mk1')
        .notConsumable('gtceu:space_elevator')
        .inputFluids('gtceu:steam 185254')
        .outputFluids(ds_se_fluids)
        .EUt(GTValues.VA[GTValues.ZPM] * 4)
        .duration(9600)
    gtr.drilling_module('disksavior:ds_se_fluid_2')
        .notConsumable('64x kubejs:space_drone_mk2')
        .notConsumable('gtceu:space_elevator')
        .inputFluids('gtceu:steam 185254')
        .outputFluids(ds_se_fluids.concat(ds_se_fluid1s).map(i => `${i.split(' ')[0]} ${Number(i.split(' ')[1]) * 8}`))
        .EUt(GTValues.VA[GTValues.ZPM] * 16)
        .duration(9600)
    gtr.drilling_module('disksavior:ds_se_fluid_3')
        .notConsumable('64x kubejs:space_drone_mk3')
        .notConsumable('gtceu:space_elevator')
        .inputFluids('gtceu:steam 185254')
        .outputFluids(ds_se_fluids.concat(ds_se_fluid1s, ds_se_fluid2s).map(i => `${i.split(' ')[0]} ${Number(i.split(' ')[1]) * 64}`))
        .EUt(GTValues.VA[GTValues.ZPM] * 64)
        .duration(9600)
    gtr.drilling_module('disksavior:ds_se_fluid_4')
        .notConsumable('64x kubejs:space_drone_mk4')
        .notConsumable('gtceu:space_elevator')
        .inputFluids('gtceu:steam 185254')
        .outputFluids(ds_se_fluids.concat(ds_se_fluid1s, ds_se_fluid2s).map(i => `${i.split(' ')[0]} ${Number(i.split(' ')[1]) * 512}`))
        .EUt(GTValues.VA[GTValues.ZPM] * 256)
        .duration(9600)
    gtr.drilling_module('disksavior:ds_se_fluid_5')
        .notConsumable('64x kubejs:space_drone_mk5')
        .notConsumable('gtceu:space_elevator')
        .inputFluids('gtceu:steam 185254')
        .outputFluids(ds_se_fluids.concat(ds_se_fluid1s, ds_se_fluid2s).map(i => `${i.split(' ')[0]} ${Number(i.split(' ')[1]) * 4096}`))
        .EUt(GTValues.VA[GTValues.ZPM] * 1024)
        .duration(9600)
    gtr.drilling_module('disksavior:ds_se_fluid_6')
        .notConsumable('64x kubejs:space_drone_mk6')
        .notConsumable('gtceu:space_elevator')
        .inputFluids('gtceu:steam 185254')
        .outputFluids(ds_se_fluids.concat(ds_se_fluid1s, ds_se_fluid2s, ds_se_fluid5s).map(i => `${i.split(' ')[0]} ${Number(i.split(' ')[1]) * 32768}`))
        .EUt(GTValues.VA[GTValues.ZPM] * 4096)
        .duration(9600)
    //原始虚空采矿机电解
    const ds_pv_t0 = ['64x gtceu:raw_pyrite', '64x gtceu:raw_lazurite', '64x gtceu:raw_lepidolite', '64x gtceu:raw_salt', '64x gtceu:raw_apatite', '64x gtceu:raw_oilsands', '64x gtceu:raw_silver', '64x gtceu:raw_hematite', '64x gtceu:raw_almandine', '64x gtceu:raw_fullers_earth', '64x gtceu:raw_lead', '64x gtceu:raw_lapis', '64x gtceu:raw_red_garnet', '64x gtceu:raw_mica', '64x gtceu:raw_vanadium_magnetite', '64x gtceu:raw_calcite', '64x gtceu:raw_amethyst', '64x gtceu:raw_malachite', '64x gtceu:raw_garnet_sand', '64x gtceu:raw_yellow_limonite', '64x gtceu:raw_magnetite', '64x gtceu:raw_galena', '64x gtceu:raw_diatomite', '64x gtceu:raw_spessartine', '64x gtceu:raw_glauconite_sand', '64x minecraft:raw_copper', '64x gtceu:raw_rock_salt', '64x gtceu:raw_graphite', '64x gtceu:raw_cinnabar', '64x gtceu:raw_diamond', '64x gtceu:raw_cassiterite_sand', '64x minecraft:raw_gold', '64x gtceu:raw_redstone', '64x gtceu:raw_chalcopyrite', '64x gtceu:raw_goethite', '64x gtceu:raw_tantalite', '64x gtceu:raw_coal', '64x gtceu:raw_yellow_garnet', '64x gtceu:raw_garnierite', '64x minecraft:raw_iron', '64x gtceu:raw_kyanite', '64x gtceu:raw_pollucite', '64x gtceu:raw_zeolite', '64x gtceu:raw_ruby', '64x gtceu:raw_asbestos', '64x gtceu:raw_cobaltite', '64x gtceu:raw_grossular', '64x gtceu:raw_cassiterite', '64x gtceu:raw_opal', '64x gtceu:raw_sapphire', '64x gtceu:raw_pyrope', '64x gtceu:raw_spodumene', '64x gtceu:raw_gypsum', '64x gtceu:raw_pentlandite', '64x gtceu:raw_olivine', '64x gtceu:raw_nickel', '64x gtceu:raw_bentonite', '64x gtceu:raw_tricalcium_phosphate', '64x gtceu:raw_granitic_mineral_sand', '64x gtceu:raw_basaltic_mineral_sand', '64x gtceu:raw_pyrolusite', '64x gtceu:raw_soapstone', '64x gtceu:raw_realgar', '64x gtceu:raw_sodalite', '64x gtceu:raw_talc', '64x gtceu:raw_tin', '64x gtceu:raw_green_sapphire', '64x gtceu:raw_quartzite', '64x gtceu:raw_barite', '64x gtceu:raw_nether_quartz', '64x gtceu:raw_saltpeter', '64x gtceu:raw_electrotine', '64x gtceu:raw_alunite', '64x gtceu:raw_blue_topaz', '64x gtceu:raw_topaz', '64x gtceu:raw_wulfenite', '64x gtceu:raw_molybdenite', '64x gtceu:raw_molybdenum', '64x gtceu:raw_powellite', '64x gtceu:raw_stibnite', '64x gtceu:raw_beryllium', '64x gtceu:raw_emerald', '64x gtceu:raw_certus_quartz', '64x gtceu:raw_sulfur', '64x gtceu:raw_sphalerite']
    const ds_pv_t1 = ['64x gtceu:raw_plutonium', '64x gtceu:raw_uraninite', '64x gtceu:raw_thorium', '64x gtceu:raw_pitchblende', '64x gtceu:raw_bastnasite', '64x gtceu:raw_monazite', '64x gtceu:raw_neodymium', '64x gtceu:raw_bauxite', '64x gtceu:raw_ilmenite', '64x gtceu:raw_aluminium']
    const ds_pv_t2 = ['64x gtceu:raw_apatite', '64x gtceu:raw_tricalcium_phosphate', '64x gtceu:raw_pyrochlore', '64x gtceu:raw_bornite', '64x gtceu:raw_cooperite', '64x gtceu:raw_platinum', '64x gtceu:raw_palladium', '64x gtceu:raw_scheelite', '64x gtceu:raw_tungstate', '64x gtceu:raw_lithium']
    const ds_pv_t3 = ['64x gtceu:raw_barite', '64x gtceu:raw_sulfur', '64x gtceu:raw_chalcocite', '64x gtceu:raw_powellite', '64x gtceu:raw_electrotine', '64x gtceu:raw_pyrite', '64x gtceu:raw_redstone', '64x gtceu:raw_certus_quartz', '64x gtceu:raw_cinnabar', '64x gtceu:raw_goethite', '64x gtceu:raw_tantalite', '64x gtceu:raw_hematite', '64x gtceu:raw_neodymium', '64x gtceu:raw_monazite', '64x gtceu:raw_wulfenite', '64x gtceu:raw_ruby', '64x gtceu:raw_bastnasite', '64x gtceu:raw_emerald', '64x gtceu:raw_grossular', '64x gtceu:raw_sphalerite', '64x gtceu:raw_stibnite', '64x gtceu:raw_molybdenum', '64x gtceu:raw_alunite', '64x gtceu:raw_blue_topaz', '64x gtceu:raw_bornite', '64x gtceu:raw_saltpeter', '64x gtceu:raw_yellow_limonite', '64x gtceu:raw_beryllium', '64x gtceu:raw_topaz', '64x gtceu:raw_quartzite', '64x gtceu:raw_nether_quartz', '64x gtceu:raw_diatomite', '64x gtceu:raw_molybdenite', '64x gtceu:raw_pyrolusite', '64x gtceu:raw_tetrahedrite', '64x gtceu:raw_garnierite', '64x gtceu:raw_nickel', '64x gtceu:raw_cobaltite', '64x gtceu:raw_pentlandite', '64x gtceu:raw_bentonite', '64x gtceu:raw_magnetite', '64x gtceu:raw_olivine', '64x gtceu:raw_glauconite_sand', '64x gtceu:raw_calorite', '64x gtceu:raw_cobalt', '64x gtceu:raw_magnesite', '64x gtceu:raw_desh',
        //远古残骸
        '1x minecraft:ancient_debris']
    const ds_pv_t4 = ['64x gtceu:raw_wulfenite', '64x gtceu:raw_molybdenite', '64x gtceu:raw_molybdenum', '64x gtceu:raw_powellite', '64x gtceu:raw_quartzite', '64x gtceu:raw_certus_quartz', '64x gtceu:raw_barite', '64x gtceu:raw_ostrum', '64x minecraft:raw_gold', '64x gtceu:raw_bastnasite', '64x gtceu:raw_monazite', '64x gtceu:raw_neodymium']
    const ds_pv_t5 = ['64x gtceu:raw_quartzite', '64x gtceu:raw_barite', '64x gtceu:raw_nether_quartz', '64x gtceu:raw_bentonite', '64x gtceu:raw_magnetite', '64x gtceu:raw_olivine', '64x gtceu:raw_glauconite_sand', '64x gtceu:raw_celestine', '64x gtceu:raw_cooperite', '64x gtceu:raw_trona', '64x gtceu:raw_sulfur', '64x gtceu:raw_pyrite', '64x gtceu:raw_sphalerite', '64x gtceu:raw_blue_topaz', '64x gtceu:raw_topaz', '64x gtceu:raw_zircon', '64x gtceu:raw_grossular', '64x gtceu:raw_pyrolusite', '64x gtceu:raw_tantalite', '64x gtceu:raw_bauxite', '64x gtceu:raw_ilmenite', '64x gtceu:raw_aluminium', '64x gtceu:raw_naquadah', '64x gtceu:raw_plutonium']
    const ds_pv_t6 = ['64x gtceu:raw_sulfur', '64x gtceu:raw_lithium', '64x gtceu:raw_pyrite', '64x gtceu:raw_hematite', '64x gtceu:raw_neodymium', '64x gtceu:raw_wulfenite', '64x gtceu:raw_bastnasite', '64x gtceu:raw_emerald', '64x gtceu:raw_sphalerite', '64x gtceu:raw_chromite', '64x gtceu:raw_vanadium_magnetite', '64x gtceu:raw_scheelite', '64x gtceu:raw_bornite', '64x gtceu:raw_saltpeter', '64x gtceu:raw_bauxite', '64x gtceu:raw_yellow_limonite', '64x gtceu:raw_naquadah', '64x gtceu:raw_beryllium', '64x gtceu:raw_quartzite', '64x gtceu:raw_magnetite', '64x gtceu:raw_uraninite', '64x gtceu:raw_diatomite', '64x gtceu:raw_pitchblende', '64x gtceu:raw_tetrahedrite', '64x gtceu:raw_platinum', '64x gtceu:raw_goethite', '64x gtceu:raw_powellite', '64x gtceu:raw_tantalite', '64x gtceu:raw_redstone', '64x gtceu:raw_barite', '64x gtceu:raw_ilmenite', '64x gtceu:raw_certus_quartz', '64x gtceu:raw_cinnabar', '64x gtceu:raw_electrotine', '64x gtceu:raw_chalcocite', '64x gtceu:raw_plutonium', '64x gtceu:raw_ruby', '64x gtceu:raw_monazite', '64x gtceu:raw_grossular', '64x gtceu:raw_cooperite', '64x gtceu:raw_stibnite', '64x gtceu:raw_palladium', '64x gtceu:raw_molybdenum', '64x gtceu:raw_blue_topaz', '64x gtceu:raw_alunite', '64x gtceu:raw_aluminium', '64x gtceu:raw_topaz', '64x gtceu:raw_nether_quartz', '64x gtceu:raw_molybdenite', '64x gtceu:raw_pyrolusite', '64x gtceu:raw_tungstate', '64x minecraft:raw_copper', '64x gtceu:raw_stibnite', '64x gtceu:raw_apatite', '64x gtceu:raw_tricalcium_phosphate', '64x gtceu:raw_pyrochlore', '64x gtceu:raw_desh', '64x gtceu:raw_magnesite', '64x gtceu:raw_bornite', '64x gtceu:raw_cooperite', '64x gtceu:raw_platinum', '64x gtceu:raw_palladium', '64x gtceu:raw_zircon', '64x gtceu:raw_grossular', '64x gtceu:raw_pyrolusite', '64x gtceu:raw_tantalite', '64x gtceu:raw_naquadah', '64x gtceu:raw_plutonium', '64x gtceu:raw_garnierite', '64x gtceu:raw_nickel', '64x gtceu:raw_cobaltite', '64x gtceu:raw_pentlandite', '64x gtceu:raw_bentonite', '64x gtceu:raw_magnetite', '64x gtceu:raw_olivine', '64x gtceu:raw_glauconite_sand', '64x gtceu:raw_pitchblende', '64x gtceu:raw_uraninite', '64x gtceu:raw_thorium', '64x gtceu:raw_saltpeter', '64x gtceu:raw_diatomite', '64x gtceu:raw_electrotine', '64x gtceu:raw_alunite']
    const ds_pv_rsc = ['64x minecraft:deepslate', '64x minecraft:dirt', '64x minecraft:sand', '64x minecraft:clay_ball', '64x minecraft:gravel', '64x minecraft:stone', '64x minecraft:oak_log', '64x gtceu:rubber_log', '64x gtceu:sticky_resin']
    //原始虚空矿机用水
    gtr.primitive_void_ore('disksavior:water')
        .inputFluids('minecraft:water 1')
        .outputFluids('gtceu:steam 1852050421271422', 'gtceu:air 185254')
        .itemOutputs(ds_pv_rsc.concat(ds_pv_t0).map(item => `${parseInt(item.split(' ')[0]) * 16}x ${item.split(' ')[1]}`))
        .duration(200)
    const ds_pv_data = [
        { value: 0, tier: 0, notc: 'minecraft:dirt', outi: ds_pv_t0 },
        { value: 1, tier: 1, notc: 'ad_astra:moon_stone', outi: ds_pv_t1 },
        { value: 1, tier: 2, notc: 'ad_astra:mars_stone', outi: ds_pv_t2 },
        { value: 2, tier: 3, notc: 'minecraft:netherrack', outi: ds_pv_t3 },
        { value: 2, tier: 4, notc: 'kubejs:ceresstone', outi: ds_pv_t4 },
        { value: 2, tier: 5, notc: 'kubejs:ganymedestone', outi: ds_pv_t5 },
        { value: 3, tier: 6, notc: 'minecraft:end_stone', outi: ds_pv_t6 }
    ]
    let ds_pv_totalouti = []
    ds_pv_data.forEach(r => {
        ds_pv_totalouti = ds_pv_totalouti.concat(r.outi)
        //console.log(totalOutput)
        //console.log(totalOutput.length)
        gtr.electrolyzer(`disksavior:primitive_void_t${r.tier}`)
            .notConsumable(`${global.disksavior.batch_multiplier.pv}x gtceu:primitive_void_ore`)
            .notConsumable(r.notc)
            .itemOutputs(ds_pv_totalouti.map(item => `${parseInt(item.split(' ')[0]) * global.disksavior.batch_multiplier.pv}x ${item.split(' ')[1]}`))
            .EUt(30 * (4 ** r.value))
            .duration(ds_pv_totalouti.length * global.disksavior.batch_multiplier.pv)
    })
    //屠宰场电解
    const ds_slaughterhouse = [
        //重要的前置
        'minecraft:wither_skeleton_skull', '8x minecraft:blaze_rod', '8x minecraft:ender_pearl',
        //回响系列
        'minecraft:echo_shard', 'minecraft:sculk_sensor', 'minecraft:sculk_catalyst', '4x minecraft:sculk',
        //其他
        '16x minecraft:slime_ball', '8x minecraft:ghast_tear', '32x minecraft:bone', '16x minecraft:porkchop', '16x minecraft:beef', '16x minecraft:rabbit', '16x minecraft:chicken', '16x minecraft:mutton', '16x minecraft:cod', '16x minecraft:tropical_fish', '16x minecraft:salmon', '64x minecraft:wheat', '32x minecraft:carrot', '32x minecraft:potato', '16x minecraft:poppy', '32x minecraft:feather', '32x minecraft:string', '16x minecraft:leather', '16x minecraft:rabbit_hide', '32x minecraft:gunpowder', '32x minecraft:rotten_flesh', '16x minecraft:spider_eye', '8x minecraft:rabbit_foot', '64x minecraft:ink_sac', '64x minecraft:glow_ink_sac', '8x minecraft:nautilus_shell', '16x minecraft:iron_ingot', '16x minecraft:gold_ingot', '16x minecraft:copper_ingot', '32x minecraft:gold_nugget', '16x minecraft:emerald', '32x minecraft:coal', '32x minecraft:redstone', '16x minecraft:glowstone_dust', '32x minecraft:bamboo', '32x minecraft:stick', '32x minecraft:arrow', '32x minecraft:sugar', '64x minecraft:white_wool', '32x minecraft:egg', '16x minecraft:glass_bottle']
    gtr.electrolyzer('disksavior:slaughterhouse')
        .notConsumable('64x gtceu:slaughterhouse')
        .chancedOutput('minecraft:dragon_egg', 1, 0)
        .chancedOutput('minecraft:nether_star', 100, 0)
        .itemOutputs(ds_slaughterhouse)
        .EUt(GTValues.VA[GTValues.MV])
        .duration(2560)
    //温室电解
    const ds_greenhouse = ['16x minecraft:apple', '12x gtceu:sticky_resin', '48x minecraft:vine', '64x minecraft:oak_log', '48x gtceu:rubber_log', '20x minecraft:oak_sapling', '9x gtceu:rubber_sapling', '20x minecraft:spruce_sapling', '64x minecraft:spruce_log', '20x minecraft:birch_sapling', '64x minecraft:birch_log', '20x minecraft:jungle_sapling', '64x minecraft:jungle_log', '20x minecraft:acacia_sapling', '64x minecraft:acacia_log', '20x minecraft:dark_oak_sapling', '64x minecraft:dark_oak_log', '20x minecraft:mangrove_propagule', '64x minecraft:mangrove_log', '20x minecraft:cherry_sapling', '64x minecraft:cherry_log', '18x minecraft:pumpkin', '2x minecraft:pumpkin_seeds', '48x minecraft:beetroot', '2x minecraft:beetroot_seeds', '48x minecraft:sweet_berries', '24x minecraft:glow_berries', '48x minecraft:wheat', '2x minecraft:wheat_seeds', '18x minecraft:melon', '2x minecraft:melon_seeds', '36x minecraft:carrot', '36x minecraft:sugar_cane', '36x minecraft:kelp', '36x minecraft:cactus', '36x minecraft:potato', '36x minecraft:cocoa_beans', '36x minecraft:brown_mushroom', '36x minecraft:red_mushroom', '36x minecraft:nether_wart', '48x minecraft:bamboo', '48x minecraft:sea_pickle', '64x minecraft:poisonous_potato', '64x minecraft:grass', '64x minecraft:melon_slice', '64x minecraft:sunflower', '64x minecraft:sponge', '64x minecraft:honeycomb']
    gtr.electrolyzer('disksavior:greenhouse')
        .notConsumable('64x gtceu:greenhouse')
        .itemOutputs(ds_greenhouse)
        .EUt(GTValues.VA[GTValues.MV])
        .duration(6400)
    //大型虚空采矿机电解
    const all_ores = [
        '180x gtceu:magnetite_ore', '120x gtceu:vanadium_magnetite_ore', '120x gtceu:chromite_ore', '60x gtceu:gold_ore',
        '160x gtceu:bauxite_ore', '80x gtceu:ilmenite_ore', '80x gtceu:aluminium_ore', '30x gtceu:titanium_ore',
        '60x gtceu:bornite_ore', '40x gtceu:cooperite_ore', '40x gtceu:platinum_ore', '20x gtceu:palladium_ore',
        '120x gtceu:scheelite_ore', '80x gtceu:tungstate_ore', '40x gtceu:lithium_ore', '20x gtceu:tellurium_ore',
        '180x gtceu:pitchblende_ore', '120x gtceu:uraninite_ore', '30x gtceu:tungsten_ore',
        '180x gtceu:naquadah_ore', '80x gtceu:enriched_naquadah_ore', '60x gtceu:plutonium_ore', '40x gtceu:trinium_compound_ore',
        '280x gtceu:tetrahedrite_ore', '140x gtceu:copper_ore', '70x gtceu:stibnite_ore',
        '90x gtceu:bastnasite_ore', '30x gtceu:molybdenum_ore', '30x gtceu:neodymium_ore', '30x gtceu:monazite_ore',
        '180x gtceu:redstone_ore', '120x gtceu:ruby_ore', '60x gtceu:cinnabar_ore', '20x gtceu:rubidium_ore',
        '120x gtceu:saltpeter_ore', '80x gtceu:diatomite_ore', '80x gtceu:electrotine_ore', '40x gtceu:alunite_ore',
        '90x gtceu:beryllium_ore', '120x gtceu:emerald_ore', '20x gtceu:celestine_ore',
        '60x gtceu:grossular_ore', '40x gtceu:pyrolusite_ore', '20x gtceu:tantalite_ore', '20x gtceu:zircon_ore',
        '150x gtceu:wulfenite_ore', '100x gtceu:molybdenite_ore', '50x gtceu:molybdenum_ore', '50x gtceu:powellite_ore',
        '90x gtceu:goethite_ore', '60x gtceu:yellow_limonite_ore', '60x gtceu:hematite_ore', '30x gtceu:gold_ore',
        '120x gtceu:quartzite_ore', '80x gtceu:certus_quartz_ore', '40x gtceu:barite_ore',
        '210x gtceu:blue_topaz_ore', '140x gtceu:topaz_ore', '140x gtceu:chalcocite_ore', '70x gtceu:bornite_ore',
        '240x gtceu:nether_quartz_ore', '80x gtceu:quartzite_ore', '50x minecraft:ancient_debris',
        '300x gtceu:sulfur_ore', '200x gtceu:pyrite_ore', '100x gtceu:sphalerite_ore', '20x gtceu:indium_ore',
        '60x gtceu:bentonite_ore', '40x gtceu:magnetite_ore', '40x gtceu:olivine_ore', '20x gtceu:glauconite_sand_ore',
        '180x gtceu:almandine_ore', '120x gtceu:pyrope_ore', '60x gtceu:sapphire_ore', '60x gtceu:green_sapphire_ore',
        '60x gtceu:goethite_ore', '240x gtceu:yellow_limonite_ore', '240x gtceu:hematite_ore', '120x gtceu:malachite_ore',
        '120x gtceu:soapstone_ore', '80x gtceu:talc_ore', '80x gtceu:glauconite_sand_ore', '40x gtceu:pentlandite_ore',
        '60x gtceu:grossular_ore', '40x gtceu:spessartine_ore', '40x gtceu:pyrolusite_ore', '20x gtceu:tantalite_ore',
        '250x gtceu:chalcopyrite_ore', '10x gtceu:zeolite_ore', '10x gtceu:cassiterite_ore', '50x gtceu:realgar_ore',
        '240x gtceu:coal_ore',
        '40x gtceu:chalcopyrite_ore', '160x gtceu:iron_ore', '160x gtceu:pyrite_ore', '160x gtceu:copper_ore',
        '240x gtceu:magnetite_ore', '160x gtceu:vanadium_magnetite_ore', '80x gtceu:gold_ore',
        '120x gtceu:lazurite_ore', '80x gtceu:sodalite_ore', '80x gtceu:lapis_ore', '40x gtceu:calcite_ore',
        '120x gtceu:galena_ore', '80x gtceu:silver_ore', '40x gtceu:lead_ore',
        '60x gtceu:kyanite_ore', '40x gtceu:mica_ore', '40x gtceu:bauxite_ore', '20x gtceu:pollucite_ore',
        '320x gtceu:tin_ore', '160x gtceu:cassiterite_ore',
        '120x gtceu:red_garnet_ore', '80x gtceu:yellow_garnet_ore', '80x gtceu:amethyst_ore', '40x gtceu:opal_ore',
        '240x gtceu:basaltic_mineral_sand_ore', '160x gtceu:granitic_mineral_sand_ore', '160x gtceu:fullers_earth_ore', '80x gtceu:gypsum_ore',
        '150x gtceu:rock_salt_ore', '10x gtceu:salt_ore', '50x gtceu:lepidolite_ore', '50x gtceu:spodumene_ore',
        '180x gtceu:redstone_ore', '120x gtceu:ruby_ore', '60x gtceu:cinnabar_ore',
        '120x gtceu:apatite_ore', '80x gtceu:tricalcium_phosphate_ore', '40x gtceu:pyrochlore_ore',
        '240x gtceu:cassiterite_sand_ore', '160x gtceu:garnet_sand_ore', '160x gtceu:asbestos_ore', '80x gtceu:diatomite_ore',
        '240x gtceu:oilsands_ore',
        '120x gtceu:graphite_ore', '80x gtceu:diamond_ore', '40x gtceu:coal_ore',
        '120x gtceu:garnierite_ore', '80x gtceu:nickel_ore', '80x gtceu:cobaltite_ore', '40x gtceu:pentlandite_ore'
    ]
    gtr.electrolyzer('disksavior:large_void_miner')
        .notConsumable('gtceu:large_void_miner')
        .inputFluids('gtceu:steam 185254')
        .itemOutputs(all_ores.map(item => `${parseInt(item.split(' ')[0]) * global.disksavior.batch_multiplier.lvm}x ${item.split(' ')[1]}`))
        .EUt(GTValues.VA[GTValues.ZPM])
        .duration((all_ores.length * global.disksavior.batch_multiplier.lvm))
})