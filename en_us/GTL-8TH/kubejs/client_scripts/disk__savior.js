JEIEvents.subtypes(event => {
    event.useNBT('expatternprovider:infinity_cell')
    event.useNBT('ae2:portable_item_cell_16k')
})

JEIEvents.addItems(event => {
    // 生成仅包含单一类型(Item或Fluid)的元件包
    const ds_packed_infinity_cell = (cellname, type, list) => {
        // 使用 Array.map 生成 key 字符串，避免手动循环拼接出错
        let keysNBT = list.map(id => {
            return `{
            "#c": "ae2:i",
            id: "expatternprovider:infinity_cell",
            tag: {
                record: {
                    "#c": "ae2:${type}",
                    id: "${id}"
                }
            }
        }`
        }).join(",")

        // 生成 amounts 数组 [1L, 1L, ...]
        let amtsNBT = list.map(() => "1L").join(",")
        // 手动转义 Name JSON，确保引号正确
        let nameJson = JSON.stringify({ text: cellname }) // 输出 '{"text":"name"}'

        let finalNBT = `{
        RepairCost: 0,
        amts: [L;${amtsNBT}],
        display: {Name: '${nameJson}'},
        ic: ${list.length}L,
        internalCurrentPower: 20000.0d,
        keys: [${keysNBT}]
    }`

        return Item.of('ae2:portable_item_cell_16k', finalNBT)
    }
    console.log('DiskSavior-Hard Drive Savior-Registering custom AE component package with JEI...')
    //单个物品无限元件
    const ds_simpleItems = ['gtceu:turbine_rotor', 'minecraft:tnt']
    ds_simpleItems.forEach(id => event.add(Item.of('expatternprovider:infinity_cell', '{record:{"#c":"ae2:i",id:"' + id + '"}}')))
    //元件包
    event.add(ds_packed_infinity_cell('Dye component package', 'f', ['gtceu:black_dye', 'gtceu:blue_dye', 'gtceu:brown_dye', 'gtceu:cyan_dye', 'gtceu:gray_dye', 'gtceu:green_dye', 'gtceu:light_blue_dye', 'gtceu:lime_dye', 'gtceu:magenta_dye', 'gtceu:orange_dye', 'gtceu:pink_dye', 'gtceu:purple_dye', 'gtceu:red_dye', 'gtceu:white_dye', 'gtceu:yellow_dye', 'gtceu:light_gray_dye']))
    event.add(ds_packed_infinity_cell('Lens element package', 'i', [
        //16色透镜
        'gtceu:glass_lens', 'gtceu:orange_glass_lens', 'gtceu:magenta_glass_lens', 'gtceu:light_blue_glass_lens', 'gtceu:yellow_glass_lens', 'gtceu:lime_glass_lens', 'gtceu:pink_glass_lens', 'gtceu:gray_glass_lens', 'gtceu:light_gray_glass_lens', 'gtceu:cyan_glass_lens', 'gtceu:purple_glass_lens', 'gtceu:blue_glass_lens', 'gtceu:brown_glass_lens', 'gtceu:green_glass_lens', 'gtceu:red_glass_lens', 'gtceu:black_glass_lens',
        //宝石透镜，没有非线性光学透镜
        'gtceu:diamond_lens', 'gtceu:nether_star_lens', 'gtceu:ruby_lens', 'gtceu:emerald_lens', 'gtceu:sapphire_lens', 'gtceu:amethyst_lens'
    ]))
    event.add(ds_packed_infinity_cell('Greenhouse & Slaughterhouse Component Package', 'i', [
        //温室
        'minecraft:apple', 'minecraft:oak_sapling', 'minecraft:oak_log', 'minecraft:spruce_sapling', 'minecraft:spruce_log', 'minecraft:birch_sapling', 'minecraft:birch_log', 'minecraft:jungle_sapling', 'minecraft:jungle_log', 'minecraft:acacia_sapling', 'minecraft:acacia_log', 'minecraft:dark_oak_sapling', 'minecraft:dark_oak_log', 'minecraft:mangrove_propagule', 'minecraft:mangrove_log', 'minecraft:cherry_sapling', 'minecraft:cherry_log', 'minecraft:pumpkin', 'minecraft:pumpkin_seeds', 'minecraft:beetroot', 'minecraft:beetroot_seeds', 'minecraft:sweet_berries', 'minecraft:glow_berries', 'minecraft:wheat', 'minecraft:wheat_seeds', 'minecraft:melon', 'minecraft:melon_seeds', 'minecraft:carrot', 'minecraft:sugar_cane', 'minecraft:kelp', 'minecraft:cactus', 'minecraft:potato', 'minecraft:cocoa_beans', 'minecraft:brown_mushroom', 'minecraft:red_mushroom', 'minecraft:nether_wart', 'minecraft:bamboo', 'minecraft:vine', 'minecraft:sea_pickle', 'gtceu:rubber_sapling', 'gtceu:rubber_log', 'gtceu:sticky_resin', 'minecraft:poisonous_potato', 'minecraft:grass', 'minecraft:melon_slice', 'minecraft:sunflower', 'minecraft:sponge', 'minecraft:honeycomb',
        //屠宰场重要的五个前置
        'minecraft:wither_skeleton_skull', 'minecraft:ghast_tear', 'minecraft:blaze_rod', 'minecraft:slime_ball', 'minecraft:ender_pearl',
        //回响系列
        'minecraft:echo_shard', 'minecraft:sculk_sensor', 'minecraft:sculk_catalyst', 'minecraft:sculk',
        //其他
        'minecraft:bone', 'minecraft:porkchop', 'minecraft:beef', 'minecraft:rabbit', 'minecraft:chicken', 'minecraft:mutton', 'minecraft:cod', 'minecraft:tropical_fish', 'minecraft:salmon', 'minecraft:poppy', 'minecraft:feather', 'minecraft:string', 'minecraft:leather', 'minecraft:rabbit_hide', 'minecraft:gunpowder', 'minecraft:rotten_flesh', 'minecraft:spider_eye', 'minecraft:rabbit_foot', 'minecraft:ink_sac', 'minecraft:glow_ink_sac', 'minecraft:nautilus_shell', 'minecraft:glowstone_dust', 'minecraft:stick', 'minecraft:sugar', 'minecraft:white_wool', 'minecraft:egg'
    ]))
    // 如果 kirin 完全不存在 → 执行你的配方
    if (typeof global.kirin === 'undefined') {
        // 无限编程电路元件包
        let size = 33
        let amtsList = Array(size).fill('1L').join(',')
        let keysList = []
        for (let i = 0; i < size; i++) {
            keysList.push(`{"#c":"ae2:i",id:"expatternprovider:infinity_cell",tag:{record:{"#c":"ae2:i",id:"gtceu:programmed_circuit",tag:{Configuration:${i}}}}}`)
        }
        let nbtString = `{RepairCost:0,amts:[L;${amtsList}],display:{Name:'{"text":"§rInfinitely Programmable Circuit Component Package"}'},ic:${size}L,internalCurrentPower:20000.0d,keys:[${keysList.join(',')}]}`
        event.add(Item.of('ae2:portable_item_cell_16k', nbtString))
    }
})

ItemEvents.tooltip(event => {
    event.add('disksavior:quantum_chromodynamic_charge_super', '§7§oPurity…')
    event.add('disksavior:lecb', '§b§oBest friend......')
    event.add('disksavior:show', 'Cannot be synthesized, for reference only')
    event.add('disksavior:show', 'Right-click the item to view the machine recipe pool of the Eye of Hongmeng')
    event.add('disksavior:show', 'Some recipes will be displayed that produce too much to be fully visible.')

    event.addAdvanced('disksavior:steam_1', (item, advanced, text) => {
        if (event.shift) {
            text.add('He finally stood at the top of the steam')
            text.add('Underfoot are countless roaring semi-liquid generators')
            text.add('')
            text.add('§8§o Very noisy')
            text.add('')
            text.add('In order to forge such a miracle')
            text.add('His MSPT has been exhausted')
            text.add('')
            text.add('The roar of the turbine lasted for many years')
            text.add('However, the energy consumption of machines is increasing day by day.')
            text.add('')
            text.add('The production capacity of semi-liquid generators is limited')
            text.add('Yesterday I was able to do it with ease')
            text.add('I\'m running out of money today')
            text.add('In a few days, we won’t even be able to supply steam for power generation.')
            text.add('')
            text.add('§4§m§n§oThen why not use other ways of generating electricity?')
        } else {
            text.add('§b placed in semi-liquid generator')
            text.add('§b Use water instead of steam')
            text.add('§b provides 32768 times overclocking')
            text.add('§7§oI am the bone of my steam')
            text.add('§7§oSteel is my body, and water is my blood')
            text.add('§a Press and hold §eSHIFT§r §a to view suggestions')
        }
    })

    event.addAdvanced('disksavior:steam_2', (item, advanced, text) => {
        if (event.shift) {
            text.add('When he first came to this strange world')
            text.add('The vague memory makes it impossible for him to even live.')
            text.add('But he still remembers something')
            text.add('It seems like I can never forget it')
            text.add('')
            text.add('§8§oSteam')
            text.add('')
            text.add('He relied on the remaining memories in his mind')
            text.add('Before losing consciousness, he built a crude boiler.')
            text.add('')
            text.add('It\'s like God is taking pity on him')
            text.add('A heavy rain fell immediately')
            text.add('')
            text.add('Rainwater entered the machine through the holes in the wall.')
            text.add('The wind blows broken branches and leaves into the bottom of the machine')
            text.add('The flint mixed in the pile of broken leaves kept rubbing against the wall of the machine.')
            text.add('They rub, rub, rub')
            text.add('Until a spark fell on the broken leaves...')
        } else {
            text.add('§b placed in semi-liquid generator')
            text.add('§b Use water instead of steam')
            text.add('§b provides 32768*256 times overclocking')
            text.add('§7§oI have created over a thousand turbines')
            text.add('§7§oUnknown to death')
            text.add('§7§oNor known to life')
            text.add('§a Press and hold §eSHIFT§r §a to view suggestions')
        }
    })

    event.addAdvanced('disksavior:steam_3', (item, advanced, text) => {
        if (event.shift) {
            text.add('It’s been a few years since I came to this world')
            text.add('Machines stand on this lonely land')
            text.add('He squeezed himself into the narrow space where the steam was rising')
            text.add('Now if you don’t come into contact with steam skin every day')
            text.add('The skin will be red and swollen at first, followed by severe pain')
            text.add('this is strange')
            text.add('but he doesn\'t care')
            text.add('')
            text.add('He once thought that even living was a luxury.')
            text.add('It was the steam that saved his life like a candle in the wind')
            text.add('')
            text.add('Now he can crush an entire dusk with his fingertips')
            text.add('He carved his name on every semifluid generator')
            text.add('on every piece of hot steel')
            text.add('Engraving proof of "I was here"')
            text.add('')
            text.add('Just when he was casting the turbine')
            text.add('The words §4 MSPT §r on him are getting deeper and deeper.')
            text.add('There was even a trace of blood')
            text.add('Just like his EU, which has already experienced negative growth')
            text.add('')
            text.add('Each additional revolution of the turbine')
            text.add('The red letter will be extended a little bit')
        } else {
            text.add('§b placed in semi-liquid generator')
            text.add('§b Use water instead of steam')
            text.add('§b provides 32768*256^2 times overclocking')
            text.add('§7§oHave withstood MSPT to create many mega steam turbine')
            text.add('§a Press and hold §eSHIFT§r §a to view suggestions')
        }
    })

    event.addAdvanced('disksavior:steam_4', (item, advanced, text) => {
        if (event.shift) {
            text.add('In response to growing EU demand')
            text.add('He had to continue to expand the semi-fluid generator')
            text.add('Pieces of steel forests rise from this land')
            text.add('When he finally turns the grid\'s deficit green')
            text.add('The scarlet letter on my body finally exceeded 50')
            text.add('')
            text.add('When he wanted to jump out of that forest')
            text.add('It\'s like time has been deleted a little bit')
            text.add('he fell')
            text.add('At the same time, he saw an extra number on his body')
            text.add('§cTPS：19')
            text.add('')
            text.add('Nothing wrong')
            text.add('')
            text.add('His origin is the origin of "§7Steam§r"')
            text.add('His life force is based on steam')
            text.add('However, his overuse caused Origin to go berserk.')
            text.add('Its internal circulation time is slightly slower due to its influence.')
            text.add('If only a little bit')
            text.add('He won\'t care too much')
            text.add('But the next second')
            text.add('§cThat number has changed again')
        } else {
            text.add('§b placed in semi-liquid generator')
            text.add('§b Use water instead of steam')
            text.add('§b provides 32768*256^3 times overclocking')
            text.add('§7§oYet, those hands will never hold EU')
            text.add('§7§oSo as I pray......')
            text.add('§a Press and hold §eSHIFT§r §a to view suggestions')
        }
    })

    event.addAdvanced('disksavior:steam_is_my_last_life', (item, advanced, text) => {
        if (event.shift) {
            if (event.ctrl && event.alt) {
                text.add('§b§oI am the bone of my steam')
                text.add('§b§oSteel is my body, and water is my blood')
                text.add('§b§oI have created over a thousand turbines')
                text.add('§b§oUnknown to death')
                text.add('§b§oNor known to life')
                text.add('§b§oHave withstood MSPT to create many mega steam turbine')
                text.add('§b§oYet, those hands will never hold EU')
                text.add('§b§oSo as I pray')
                text.add('§b§o§lUnlimited Steam Works')
            } else if (event.ctrl) {
                text.add('§7§o§mI am the bone of my steam')
                text.add('§7§o§mSteel is my body, and water is my blood')
                text.add('§7§o§mI have created over a thousand turbines')
                text.add('§7§o§mUnknown to death')
                text.add('§7§o§mNor known to life')
                text.add('§7§o§mHave withstood MSPT to create many mega steam turbine')
                text.add('§7§o§mYet, those hands will never hold EU')
                text.add('§7§o§mSo as I pray......')
                text.add('§8§o§m§kUnlimited Steam Works')
                text.add('§4......')
                text.add('§c Press and hold §4SHIFT§r §c+§r §4CTRL§r §c+§r §4ALT§r §c View mental image')
            } else {
                text.add('He finally stood at the top of the steam')
                text.add('Underfoot are countless roaring semi-liquid generators')
                text.add('')
                text.add('Then')
                text.add('He started destroying them all')
                text.add('The sound of metal fire and cutting can be heard endlessly')
                text.add('')
                text.add('The destruction lasted for several days')
                text.add('Then he began to melt the remains of his body')
                text.add('This is extremely painful')
                text.add('That every turbine is built by him himself')
                text.add('There are no other intelligent creatures in this world')
                text.add('Accompanying him is only the roar of the machine')
                text.add('There is also inexhaustible steam')
                text.add('')
                text.add('However, he did not give up on himself')
                text.add('He wants to fuse these countless semi-fluid generators')
                text.add('However, it is impossible to do it with the backward technology.')
                text.add('what he can do')
                text.add('Only keep burning your own origin')
                text.add('Only by constantly forging new turbines')
                text.add('Until the metal in his hand became the title')
                text.add('§4§oUntil his mental image melts away')
                text.add('§4......')
                text.add('§cHold §4SHIFT§r §c+§r §4CTRL§r §cView chant')
            }
        } else {
            text.add('§c placed in semi-liquid generator')
            text.add('§c Use water instead of steam')
            text.add('§c provides §k2^57§r§c times overclocking')
            text.add('§4......')
            text.add('§4§o§kUnlimited Steam Works')
            text.add('§c Press and hold §4SHIFT§r §c to view suggestions')
        }
    })
})