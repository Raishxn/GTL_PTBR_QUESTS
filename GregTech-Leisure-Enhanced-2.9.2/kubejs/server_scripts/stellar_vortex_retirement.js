// priority: -20000
// 停用猎光号主站与四级模块，移除制作及以其作为材料的配方。
ServerEvents.recipes(event => {
    let retired = [
    "gtladditions:light_hunter_space_station",
    "gtladditions:nexus_satellite_factory_mk1",
    "gtladditions:nexus_satellite_factory_mk2",
    "gtladditions:nexus_satellite_factory_mk3",
    "gtladditions:nexus_satellite_factory_mk4"
]
    retired.forEach(id => {
        event.remove({ output: id })
        event.remove({ input: id })
    })
})
