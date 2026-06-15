// 禁掉创造模式箱子GUI
BlockEvents.rightClicked('gtceu:creative_chest', event => {
    event.cancel();
});