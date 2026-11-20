// 显示创造模式箱子的平衡调整说明。
ItemEvents.tooltip(event => {
    event.add('gtceu:creative_chest', [
        Text.of('⚠ 平衡性调整').red(),
        Text.of('禁止了右键交互').gray()
    ]);
});
