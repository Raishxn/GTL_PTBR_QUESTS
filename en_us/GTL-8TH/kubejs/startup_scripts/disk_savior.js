//全局变量
if (!global.disksavior) global.disksavior = {}

if (!global.disksavior.enable) global.disksavior.enable = {}//功能开关

global.disksavior.enable.master = true//用于给其他脚本做检测
global.disksavior.enable.otherone = false//是否开启集成其他人脚本的脚本

if (!global.disksavior.batch_multiplier) global.disksavior.batch_multiplier = {}//批处理乘数
global.disksavior.batch_multiplier.fdr = 64//流体钻机电解
global.disksavior.batch_multiplier.pv = 1//虚空矿机电解
global.disksavior.batch_multiplier.lvm = 1//大型虚空矿机电解
global.disksavior.batch_multiplier.gc = 1//集气电解
global.disksavior.batch_multiplier.cs = 16384//化反鸿蒙







//注册
StartupEvents.registry('item', event => {
    event.create('disksavior:quantum_chromodynamic_charge_super')
        .displayName('Extremely High Density Quantum Chromodynamic Explosive Bomb')
        .texture('disksavior:item/quantum_chromodynamic_charge_super')
    event.create('disksavior:steam_1')
        .displayName('steam basics')
        .texture('disksavior:item/steam_is_my_last_life')
    event.create('disksavior:steam_2')
        .displayName('Steamboy')
        .texture('disksavior:item/steam_is_my_last_life')
    event.create('disksavior:steam_3')
        .displayName('steam hero')
        .texture('disksavior:item/steam_is_my_last_life')
    event.create('disksavior:steam_4')
        .displayName('steam giant')
        .texture('disksavior:item/steam_is_my_last_life')
    event.create('disksavior:steam_is_my_last_life')
        .displayName('This body is made of steam')
        .texture('disksavior:item/steam_is_my_last_life')
    event.create('disksavior:show')
        .displayName('Example items')
        .texture('disksavior:item/show')
    event.create('disksavior:lecb')
        .displayName('cyan brain')
        .texture('disksavior:item/lecb')
})