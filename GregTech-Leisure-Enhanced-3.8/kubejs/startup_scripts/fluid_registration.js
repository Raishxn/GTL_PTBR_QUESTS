// priority: 96
// 注册凝胶寒霜液的材质、温度、亮度与桶颜色。
StartupEvents.registry("fluid", event => {
    // 凝胶寒霜液：蓝色发光液体
    event.create("gelid_cryotheum")
        .flowingTexture("kubejs:block/fluid/gelid_cryotheum_flow")
        .stillTexture("kubejs:block/fluid/gelid_cryotheum")
        .temperature(10)
        .luminosity(8)
        .bucketColor(0x2ab0fa)
})
