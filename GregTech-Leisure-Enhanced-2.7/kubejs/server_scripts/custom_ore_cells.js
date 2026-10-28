// priority: 95
// 本文件按功能保存配方阶段，实际执行顺序统一由配方入口管理。

// 根据矿石标签生成无限矿石盘，排除重复岩石变体。
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
    baseOreMap.forEach((oreStr, key) => {
        const infinityCell = Item.of('expatternprovider:infinity_cell', `{record:{"#c":"ae2:i",id:"${oreStr}"}}`)
        const safeId = key.replace(/[:\/]/g, '_')
        gtr.electric_implosion_compressor(`kubejs:infinity_ore_${safeId}`)
            .notConsumable('kubejs:cosmic_fragment')
            .itemInputs(`64x ${oreStr}`)
            .itemOutputs(infinityCell)
            .EUt(8192).duration(200)
    })
})
