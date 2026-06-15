// 创造模式箱子添加物品描述
ItemEvents.tooltip(event => {
    event.add('gtceu:creative_chest', [
        Text.of('⚠ 平衡性调整').red(),
        Text.of('禁止了右键交互').gray()
    ]);
});