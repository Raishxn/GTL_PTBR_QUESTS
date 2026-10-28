// priority: -2
// 声明需要扩展槽位、进度条或音效的机器界面；按原顺序加入配置。
;(() => {
    // 独立函数作用域避免脚本共享环境中的变量重名。
    if (!global?.uiEditor?.uiEditor_builder?.isLoaded) return
    // 每行依次为配方字段、来源、要调用的配置方法及参数。
    const settings = [
        ["VACUUM_RECIPES", "gtm", [["newItemInput", 2], ["newItemOutput", 2]]], // 真空机
        ["VOID_FLUID_DRILLING_RIG_RECIPES", "gtl", [["newFluidOutput", 24]]], // 虚空流体钻机
        ["BLOCK_CONVERSION_RECIPES", "gtl", [["newItemOutput", 1],
            ["progressBar", "PROGRESS_BAR_REPLICATOR", "LEFT_TO_RIGHT"]]], // 方块转换室
        ["LAVA_FURNACE_RECIPES", "gtl", [["newFluidInput", 1], ["newItemOutput", 1]]], // 熔岩炉
        ["DIMENSIONALLY_TRANSCENDENT_PLASMA_FORGE_RECIPES", "gtl", [["sound", "ARC"]]], // 超维等离子锻炉
        ["FISSION_REACTOR_RECIPES", "gtl", [["newItemInput", 2], ["newFluidInput", 2], ["newFluidOutput", 1],
            ["newItemOutput", 1], ["progressBar", "PROGRESS_BAR_FUSION", "LEFT_TO_RIGHT"]]], // 裂变堆
        ["NEUTRON_ACTIVATOR_RECIPES", "gtl", [["newItemInput", 9]]], // 中子活化机
        ["DYSON_SPHERE_RECIPES", "gtl", [["progressBar", "PROGRESS_BAR_FUSION", "LEFT_TO_RIGHT"]]], // 戴森球
        ["FUSION_RECIPES", "gtm", [["newItemInput", 2], ["newItemOutput", 2]]], // 聚变反应堆
        ["LARGE_NAQUADAH_REACTOR_RECIPES", "gtl", [["newItemInput", 2]]], // 大型硅岩反应堆
        ["HYPER_REACTOR_RECIPES", "gtl", [["newItemInput", 2], ["newFluidInput", 2]]], // 超能反应堆
        ["ADVANCED_HYPER_REACTOR_RECIPES", "gtl", [["newItemInput", 2]]], // 进阶超能反应堆
        ["ANNIHILATE_GENERATOR_RECIPES", "gtl", [["newFluidInput", 1]]], // 湮灭发电机
        ["GENESIS_ENGINE", "gtladd", [["newFluidInput", 1]]] // 创世引擎
    ]
    settings.forEach(([field, source, methods]) => {
        const builder = global.uiEditor.modify(field).source(source)
        methods.forEach(entry => builder[entry[0]].apply(builder, entry.slice(1)))
    })
})()
