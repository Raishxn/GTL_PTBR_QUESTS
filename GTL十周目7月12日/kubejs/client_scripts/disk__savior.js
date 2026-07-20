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
        let nameJson = JSON.stringify({ text: cellname }) // 输出 '{"texto":"nome"}'

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
    console.log('DiskSavior-Hard Drive Salvador-Registrando pacote de componentes AE personalizados com JEI...')
    //单个物品无限元件
    const ds_simpleItems = ['gtceu:turbine_rotor', 'minecraft:tnt']
    ds_simpleItems.forEach(id => event.add(Item.of('expatternprovider:infinity_cell', '{record:{"#c":"ae2:i",id:"' + id + '"}}')))
    //元件包
    event.add(ds_packed_infinity_cell('Pacote de componentes de corante', 'f', ['gtceu:black_dye', 'gtceu:blue_dye', 'gtceu:brown_dye', 'gtceu:cyan_dye', 'gtceu:gray_dye', 'gtceu:green_dye', 'gtceu:light_blue_dye', 'gtceu:lime_dye', 'gtceu:magenta_dye', 'gtceu:orange_dye', 'gtceu:pink_dye', 'gtceu:purple_dye', 'gtceu:red_dye', 'gtceu:white_dye', 'gtceu:yellow_dye', 'gtceu:light_gray_dye']))
    event.add(ds_packed_infinity_cell('Pacote de elementos de lente', 'i', [
        //16色透镜
        'gtceu:glass_lens', 'gtceu:orange_glass_lens', 'gtceu:magenta_glass_lens', 'gtceu:light_blue_glass_lens', 'gtceu:yellow_glass_lens', 'gtceu:lime_glass_lens', 'gtceu:pink_glass_lens', 'gtceu:gray_glass_lens', 'gtceu:light_gray_glass_lens', 'gtceu:cyan_glass_lens', 'gtceu:purple_glass_lens', 'gtceu:blue_glass_lens', 'gtceu:brown_glass_lens', 'gtceu:green_glass_lens', 'gtceu:red_glass_lens', 'gtceu:black_glass_lens',
        //宝石透镜，没有非线性光学透镜
        'gtceu:diamond_lens', 'gtceu:nether_star_lens', 'gtceu:ruby_lens', 'gtceu:emerald_lens', 'gtceu:sapphire_lens', 'gtceu:amethyst_lens'
    ]))
    event.add(ds_packed_infinity_cell('Pacote de componentes para estufa e matadouro', 'i', [
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
        let nbtString = `{RepairCost:0,amts:[L;${amtsList}],display:{Name:'{"text":"Pacote de componentes de circuito de programação infinita §r"}'},ic:${size}L,internalCurrentPower:20000.0d,keys:[${keysList.join(',')}]}`
        event.add(Item.of('ae2:portable_item_cell_16k', nbtString))
    }
})

ItemEvents.tooltip(event => {
    event.add('disksavior:quantum_chromodynamic_charge_super', '§7§oPureza...')
    event.add('disksavior:lecb', '§b§oQueridos amigos...')
    event.add('disksavior:show', 'Não pode ser sintetizado, apenas para referência')
    event.add('disksavior:show', 'Clique com o botão direito no item para ver o conjunto de receitas da máquina do Olho de Hongmeng')
    event.add('disksavior:show', 'Serão exibidas algumas receitas que produzem muito para serem totalmente visíveis.')

    event.addAdvanced('disksavior:steam_1', (item, advanced, text) => {
        if (event.shift) {
            text.add('Ele finalmente chegou ao topo do vapor')
            text.add('Sob os pés estão incontáveis ​​​​geradores semilíquidos barulhentos')
            text.add('')
            text.add('§8§oMuito barulhento')
            text.add('')
            text.add('Para forjar tal milagre')
            text.add('Seu MSPT se esgotou')
            text.add('')
            text.add('O rugido da turbina durou muitos anos')
            text.add('No entanto, o consumo de energia das máquinas aumenta dia a dia.')
            text.add('')
            text.add('A capacidade de produção de geradores semilíquidos é limitada')
            text.add('Ontem consegui fazer isso com facilidade')
            text.add('Estou ficando sem dinheiro hoje')
            text.add('Dentro de alguns dias, não conseguiremos nem fornecer vapor para geração de energia.')
            text.add('')
            text.add('§4§m§n§oEntão por que não usar outros métodos de geração de energia?')
        } else {
            text.add('§bé colocado em um gerador semifluido')
            text.add('§bÁgua em vez de vapor')
            text.add('§boferece overclock de 32.768 vezes')
            text.add('§7§oI am the bone of my steam')
            text.add('§7§oSteel is my body, and water is my blood')
            text.add('§aPressione e segure §eSHIFT §r§aVer conselhos')
        }
    })

    event.addAdvanced('disksavior:steam_2', (item, advanced, text) => {
        if (event.shift) {
            text.add('Quando ele veio pela primeira vez a este mundo estranho')
            text.add('A vaga memória torna impossível para ele viver.')
            text.add('Mas ele ainda se lembra de algo')
            text.add('Parece que nunca poderei esquecer')
            text.add('')
            text.add('§8§oVapor')
            text.add('')
            text.add('Ele confiou nas memórias restantes em sua mente')
            text.add('Antes de perder a consciência, ele construiu uma caldeira rudimentar.')
            text.add('')
            text.add('É como se Deus estivesse com pena dele')
            text.add('Uma forte chuva caiu imediatamente')
            text.add('')
            text.add('A água da chuva entrou na máquina pelos buracos na parede')
            text.add('O vento sopra galhos quebrados e folhas na parte inferior da máquina')
            text.add('A pederneira misturada na pilha de folhas quebradas continuava roçando a parede da máquina.')
            text.add('Eles esfregam, esfregam, esfregam')
            text.add('Até que uma faísca caiu nas folhas quebradas...')
        } else {
            text.add('§bé colocado em um gerador semifluido')
            text.add('§bÁgua em vez de vapor')
            text.add('§bfornece overclock de 32768*256 vezes')
            text.add('§7§oI have created over a thousand turbines')
            text.add('§7§oUnknown to death')
            text.add('§7§oNor known to life')
            text.add('§aPressione e segure §eSHIFT §r§aVer conselhos')
        }
    })

    event.addAdvanced('disksavior:steam_3', (item, advanced, text) => {
        if (event.shift) {
            text.add('Já se passaram alguns anos desde que vim a este mundo')
            text.add('Máquinas estão nesta terra solitária')
            text.add('Ele se espremeu no espaço estreito onde o vapor subia')
            text.add('Agora, se você não entra em contato com vapor na pele todos os dias')
            text.add('A pele ficará vermelha e inchada no início, seguida de dor intensa')
            text.add('isso é estranho')
            text.add('mas ele não se importa')
            text.add('')
            text.add('Certa vez, ele pensou que até viver era um luxo.')
            text.add('Foi o vapor que salvou sua vida como uma vela ao vento')
            text.add('')
            text.add('Agora ele pode esmagar um crepúsculo inteiro com a ponta dos dedos')
            text.add('Ele gravou seu nome em cada gerador semifluido')
            text.add('em cada pedaço de aço quente')
            text.add('Gravura da prova de "estive aqui"')
            text.add('')
            text.add('Justamente quando ele estava lançando a turbina')
            text.add('As palavras §4MSPT §rem seu corpo estão ficando cada vez mais escuras.')
            text.add('Havia até um vestígio de sangue')
            text.add('Tal como a sua UE, que já registou um crescimento negativo')
            text.add('')
            text.add('Cada revolução adicional da turbina')
            text.add('A letra vermelha será estendida um pouco')
        } else {
            text.add('§bé colocado em um gerador semifluido')
            text.add('§bÁgua em vez de vapor')
            text.add('§bfornece overclock de 32768*256^2 vezes')
            text.add('§7§oHave withstood MSPT to create many mega steam turbine')
            text.add('§aPressione e segure §eSHIFT §r§aVer conselhos')
        }
    })

    event.addAdvanced('disksavior:steam_4', (item, advanced, text) => {
        if (event.shift) {
            text.add('Em resposta à crescente procura da UE')
            text.add('Ele teve que continuar a expandir o gerador semifluido')
            text.add('Pedaços de florestas de aço surgem desta terra')
            text.add('Quando ele finalmente transforma o déficit da rede em verde')
            text.add('A letra escarlate no meu corpo finalmente ultrapassou 50')
            text.add('')
            text.add('Quando ele quis pular daquela floresta')
            text.add('É como se o tempo tivesse sido deletado um pouco')
            text.add('ele caiu')
            text.add('Ao mesmo tempo, ele viu um número extra em seu corpo')
            text.add('§cTPS：19')
            text.add('')
            text.add('Nada de errado')
            text.add('')
            text.add('Sua origem é a origem de "§7Steam §r"')
            text.add('Sua força vital é baseada no vapor')
            text.add('No entanto, seu uso excessivo fez com que Origin enlouquecesse.')
            text.add('Seu tempo de circulação interna é um pouco mais lento devido à sua influência.')
            text.add('Se apenas um pouco')
            text.add('Ele não vai se importar muito')
            text.add('Mas no próximo segundo')
            text.add('§cEsse número mudou novamente')
        } else {
            text.add('§bé colocado em um gerador semifluido')
            text.add('§bÁgua em vez de vapor')
            text.add('§bfornece overclock de 32768*256^3 vezes')
            text.add('§7§oYet, those hands will never hold EU')
            text.add('§7§oSo as I pray......')
            text.add('§aPressione e segure §eSHIFT §r§aVer conselhos')
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
                text.add('§cPressione e segure §4SHIFT §r§c+ §r§4CTRL §r§c+ §r§4ALT §r§cVisualizar imagem mental')
            } else {
                text.add('Ele finalmente chegou ao topo do vapor')
                text.add('Sob os pés estão incontáveis ​​​​geradores semilíquidos barulhentos')
                text.add('')
                text.add('Então')
                text.add('Ele começou a destruir todos eles')
                text.add('O som do fogo e do corte do metal pode ser ouvido infinitamente')
                text.add('')
                text.add('A destruição durou vários dias')
                text.add('Então ele começou a derreter os restos')
                text.add('Isso é extremamente doloroso')
                text.add('Cada turbina é construída por ele mesmo.')
                text.add('Não existem outras criaturas inteligentes neste mundo')
                text.add('Acompanhando-o está apenas o rugido da máquina')
                text.add('Também há vapor inesgotável')
                text.add('')
                text.add('No entanto, ele não desistiu de si mesmo')
                text.add('Ele quer fundir esses inúmeros geradores semifluidos')
                text.add('No entanto, é impossível fazer isso com a tecnologia atrasada.')
                text.add('o que ele pode fazer')
                text.add('Somente queimando constantemente a própria origem')
                text.add('Somente forjando constantemente novas turbinas')
                text.add('Até que o metal em sua mão se tornou o título')
                text.add('§4§oAté seu coração derreter')
                text.add('§4......')
                text.add('§cSegure §4SHIFT §r§c+ §r§4CTRL §r§cVer canto')
            }
        } else {
            text.add('§cé colocado em um gerador semifluido')
            text.add('§cÁgua em vez de vapor')
            text.add('§cfornece §k2 ^ 57 §r§cvezes overclock')
            text.add('§4......')
            text.add('§4§o§kUnlimited Steam Works')
            text.add('§cPressione e segure §4SHIFT §r§cVer conselhos')
        }
    })
})