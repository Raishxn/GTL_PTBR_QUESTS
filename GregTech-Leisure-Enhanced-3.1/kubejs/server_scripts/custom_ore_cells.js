// priority: 95
// 本文件按功能保存配方阶段，实际执行顺序统一由配方入口管理。

// 根据矿石标签生成无限矿石元件包，排除重复岩石变体。
global.gtlPack.register("custom_ore_cells", event => {
    const gtr = event.recipes.gtceu
    const VARIANT_PREFIXES = [
        'moon_stone', 'mars_stone', 'venus_stone', 'mercury_stone', 'glacio_stone',
        'titanstone', 'plutostone', 'iostone', 'ganymedestone', 'enceladusstone',
        'ceresstone', 'granite', 'diorite', 'andesite', 'red_granite', 'marble',
        'deepslate', 'tuff', 'sand', 'red_sand', 'gravel', 'basalt', 'netherrack',
        'blackstone', 'endstone', 'basaltic', 'granitic', 'mars', 'glacio', 'venus', 'moon'
    ].map(p => p + '_')
    const baseOreMap = new Map()
    Ingredient.of('#forge:ores').getItemIds().forEach(oreId => {
        const oreStr = String(oreId)
        const [namespace, path] = oreId.split(':')
        if (!namespace || !path) return
        let basePath = path
        if (path.endsWith('_ore')) basePath = path.slice(0, -4)
        if (!VARIANT_PREFIXES.some(prefix => basePath.startsWith(prefix))) {
            baseOreMap.set(`${namespace}:${basePath}`, oreStr)
        }
    })
    // 全部基础矿石的无限元件放进同一个便携包，只注册一条配方。
    const oreIds = []
    baseOreMap.forEach(oreStr => oreIds.push(oreStr))
    oreIds.sort()
    const oreComponents = oreIds.map(oreStr => `{
        "#c": "ae2:i",
        id: "expatternprovider:infinity_cell",
        tag: {record: {"#c": "ae2:i", id: "${oreStr}"}}
    }`).join(',')
    const amounts = oreIds.map(() => '1L').join(',')
    const oreCellPack = Item.of('ae2:portable_item_cell_16k', `{
        RepairCost: 0,
        amts: [L;${amounts}],
        ic: ${oreIds.length}L,
        internalCurrentPower: 20000.0d,
        keys: [${oreComponents}]
    }`)
    gtr.electric_implosion_compressor('kubejs:infinity_ore_pack')
        .circuit(1)
        .notConsumable('kubejs:cosmic_fragment')
        .itemOutputs(oreCellPack)
        .EUt(8192).duration(200)
})
