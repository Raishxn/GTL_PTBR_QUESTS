StartupEvents.registry('item', event => {
    event.create('cosmic_fragment')
        .displayName('§c宇§e宙§a碎§b片')
        .tooltip(`§d✦ §e奇点裂解时残留的辉光 §d✦
§7宇宙从绝对虚无中炸裂，
§7这片碎片是§c最初§7的见证。
§8蕴含着万物诞生前的秘密`)
        .modelJson({
            parent: 'minecraft:item/generated',
            textures: {
                layer0: 'sihuobancaizhi:item/yuzhousuipian'
            }
        });
});