// priority: 95
// 本文件按功能保存配方阶段，实际执行顺序统一由配方入口管理。

// 登记天气、转换、屠宰、电梯和创世模式；二号电梯明确使用零算力。
global.gtlPack.register("custom_machine_modes", event => {
    const gtr = event.recipes.gtceu
    global.gtlPack.batch(gtr, "weather_control", ["circuit", ["duration", 200], ["EUt", 30]], [
        ["1", [1]],
        ["2", [2]],
        ["3", [3]]
    ]);
    gtr.block_conversion("1").circuit(1).duration(400).EUt(128)
    gtr.slaughterhouse("1").circuit(1).duration(20).EUt(128)
    gtr.slaughterhouse("2").circuit(2).duration(20).EUt(128)
    global.gtlPack.batch(gtr, "space_elevator", ["circuit", ["duration", 400], "CWUt", ["EUt", GTValues.VA[GTValues.UV]]], [
        ["1", [1], [128]],
        ["kubejs:space_elevator_no_cwu", [2], ["0"]]
    ]);
    gtr.door_of_create("1").circuit(1).EUt(4 * GTValues.VA[GTValues.MAX]).duration(20).dimension("minecraft:overworld")
    gtr.create_aggregation("1")
        .circuit(1)
        .EUt(16 * GTValues.VA[GTValues.MAX]).duration(20)
        .CWUt(String(GTValues.VA[GTValues.MAX]))
        .dimension("kubejs:create")
})
