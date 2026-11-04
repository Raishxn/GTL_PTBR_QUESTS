// 为Pacote de Célula de Ferramentas Frágeis启用按物品数据区分，并保留原预装工具与元件数据。
;(() => {
// 辅助函数只在本模块使用；不写入脚本共享作用域。
JEIEvents.subtypes(event => {
    // 便携元件带 NBT 数据，必须按 NBT 区分显示
    event.useNBT('ae2:portable_item_cell_16k')
})

// 创建预装脆弱工具的便携元件，并加入物品列表。
// 生成"预装指定物品的便携元件"NBT
const packed_infinity_cell = (cellname, type, list) => {
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
    let amtsNBT = list.map(() => "1L").join(",")
    let nameJson = JSON.stringify({ text: cellname })
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

JEIEvents.addItems(event => {
    // Pacote de Célula de Ferramentas Frágeis：预装 10 种脆弱工具
    const fragileTools = [
        'fragile_tool:fragile_file', 'fragile_tool:fragile_hammer', 'fragile_tool:fragile_mallet',
        'fragile_tool:fragile_wrench', 'fragile_tool:fragile_wire_cutter', 'fragile_tool:fragile_crowbar',
        'fragile_tool:fragile_saw', 'fragile_tool:fragile_screwdriver', 'fragile_tool:fragile_knife',
        'fragile_tool:fragile_mortar'
    ]
    event.add(packed_infinity_cell('Pacote de Célula de Ferramentas Frágeis', 'i', fragileTools))
})
})()
