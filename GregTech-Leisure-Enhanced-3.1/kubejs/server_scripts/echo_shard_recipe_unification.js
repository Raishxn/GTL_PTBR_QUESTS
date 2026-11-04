// priority: -20001
// 回响碎片聚爆保留整合包手写配方，精确移除 GTLCore fix4 同字段的自动重复项。
// 电力路线仍为 4 粉 → 3 碎片、UV、1 tick；普通路线保留四种炸药、耗时、EU 和灰副产概率。
ServerEvents.recipes(event => {
    event.remove({ id: 'gtceu:electric_implosion_compressor/electric_implode_dust_echo_shard_' })
    ;['powderbarrel', 'tnt', 'dynamite', 'itnt'].forEach(explosive => {
        event.remove({ id: 'gtceu:implosion_compressor/implode_dust_echo_shard__' + explosive })
    })
})
