// =============================================================================
// 原初生物演化协议（gtceu:primordial_biological_core）两条配方
// 移植自 origin-Integrate/.../[server_scripts]shanhai_recipes.js
//
// 口径与源脚本一致：
//   · 类型改为 primordial_biological_core
//   · 删掉全部流体输入
//   · 只留模块，且 .notConsumable
//   · EUt / duration / 概率产出照源表
//
// 本整合包没有 thetornproductionline 模组，催化剂改为山海的物品注册.js 里的：
//   dishanhai:greenhouse_speed_cultivation_module
//   dishanhai:high_speed_bio_data_module
// 类型物品出上限 = 72（DShanhaiRecipeTypes，配套 primordial_biological_core.rtui）。
// 峰值 57 <= 72。
// =============================================================================
;(function () {
    var greenhouseOut = [
        ['64x minecraft:oak_log', 10000],
        ['64x gtceu:rubber_log', 10000],
        ['64x minecraft:birch_log', 10000],
        ['64x minecraft:jungle_log', 10000],
        ['64x minecraft:acacia_log', 10000],
        ['64x minecraft:dark_oak_log', 10000],
        ['64x minecraft:mangrove_log', 10000],
        ['64x minecraft:cherry_log', 10000],
        ['64x minecraft:spruce_log', 10000],
        ['2x minecraft:oak_sapling', 10000],
        ['2x gtceu:rubber_sapling', 10000],
        ['2x minecraft:birch_sapling', 10000],
        ['2x minecraft:jungle_sapling', 10000],
        ['2x minecraft:acacia_sapling', 10000],
        ['2x minecraft:dark_oak_sapling', 10000],
        ['2x minecraft:mangrove_propagule', 10000],
        ['2x minecraft:cherry_sapling', 10000],
        ['2x minecraft:spruce_sapling', 10000],
        ['64x gtceu:sticky_resin', 10000],
        ['64x minecraft:apple', 10000],
        ['64x gtceu:plant_ball', 10000],
        ['64x minecraft:pumpkin', 10000],
        ['64x minecraft:beetroot', 10000],
        ['64x minecraft:melon', 10000],
        ['64x minecraft:sweet_berries', 10000],
        ['64x minecraft:glow_berries', 10000],
        ['64x minecraft:wheat', 10000],
        ['64x minecraft:carrot', 10000],
        ['64x minecraft:sugar_cane', 10000],
        ['64x minecraft:kelp', 10000],
        ['64x minecraft:cactus', 10000],
        ['64x minecraft:potato', 10000],
        ['64x minecraft:cocoa_beans', 10000],
        ['64x minecraft:brown_mushroom', 10000],
        ['64x minecraft:red_mushroom', 10000],
        ['64x minecraft:nether_wart', 10000],
        ['64x minecraft:bamboo', 10000],
        ['64x minecraft:vine', 10000],
        ['64x minecraft:sea_pickle', 10000]
    ]

    var bioDataOut = [
        ['40x minecraft:beef', 7500],
        ['40x minecraft:leather', 2500],
        ['40x minecraft:mutton', 8000],
        ['40x minecraft:white_wool', 5000],
        ['40x minecraft:porkchop', 8000],
        ['40x minecraft:chicken', 7500],
        ['40x minecraft:feather', 4000],
        ['40x minecraft:egg', 1000],
        ['40x minecraft:rabbit', 7000],
        ['40x minecraft:rabbit_hide', 1000],
        ['40x minecraft:rabbit_foot', 500],
        ['40x minecraft:leather', 5000],
        ['40x minecraft:leather', 5000],
        ['40x minecraft:bamboo', 5000],
        ['40x minecraft:cod', 5000],
        ['40x minecraft:salmon', 5000],
        ['40x minecraft:string', 5000],
        ['40x minecraft:string', 7000],
        ['40x minecraft:spider_eye', 2000],
        ['40x minecraft:bone', 7500],
        ['40x minecraft:arrow', 6500],
        ['40x minecraft:rotten_flesh', 7500],
        ['40x minecraft:iron_ingot', 600],
        ['40x minecraft:carrot', 1500],
        ['40x minecraft:potato', 1500],
        ['40x minecraft:rotten_flesh', 7500],
        ['40x minecraft:iron_ingot', 600],
        ['40x minecraft:carrot', 1500],
        ['40x minecraft:potato', 1500],
        ['40x minecraft:rotten_flesh', 7500],
        ['40x minecraft:copper_ingot', 600],
        ['40x minecraft:rotten_flesh', 7500],
        ['40x minecraft:iron_ingot', 600],
        ['40x minecraft:carrot', 1500],
        ['40x minecraft:potato', 1500],
        ['40x minecraft:gunpowder', 8000],
        ['40x minecraft:slime_ball', 5000],
        ['40x minecraft:ender_pearl', 500],
        ['40x minecraft:stick', 5000],
        ['40x minecraft:gunpowder', 3500],
        ['40x minecraft:sugar', 3500],
        ['40x minecraft:glass_bottle', 3500],
        ['40x minecraft:redstone', 600],
        ['40x minecraft:glowstone_dust', 600],
        ['40x minecraft:spider_eye', 600],
        ['40x minecraft:emerald', 1000],
        ['40x minecraft:rotten_flesh', 7500],
        ['40x minecraft:gold_ingot', 600],
        ['40x minecraft:gold_nugget', 1000],
        ['40x minecraft:blaze_rod', 500],
        ['40x minecraft:gunpowder', 6000],
        ['40x minecraft:ghast_tear', 600],
        ['40x minecraft:bone', 7500],
        ['40x minecraft:coal', 6500],
        ['40x minecraft:wither_skeleton_skull', 500],
        ['1x minecraft:nether_star', 1500],
        ['1x minecraft:dragon_egg', 10000]
    ]

    function registerBio(event, id, catalyst, eut, duration, rows, tag) {
        var gtr = event.recipes.gtceu
        try {
            var b = gtr['primordial_biological_core'](id)
                .notConsumable(catalyst)
                .EUt(eut)
                .duration(duration)
            var j
            for (j = 0; j < rows.length; j++) {
                b.chancedOutput(rows[j][0], rows[j][1], 0)
            }
            console.info('[SHANHAI-BIO] ok ' + tag
                + ' id=' + id
                + ' catalyst=' + catalyst
                + ' EUt=' + eut
                + ' duration=' + duration
                + ' itemOuts=' + rows.length)
        } catch (e) {
            console.error('[SHANHAI-BIO] FAILED ' + tag + ' ' + id + ' => ' + e)
        }
    }

    ServerEvents.recipes(function (event) {
        registerBio(event,
            'shanhai:primordial_bio/greenhouse_speed_cultivation_use',
            'dishanhai:greenhouse_speed_cultivation_module',
            30, 200, greenhouseOut, 'greenhouse')
        registerBio(event,
            'shanhai:primordial_bio/high_speed_bio_data_use',
            'dishanhai:high_speed_bio_data_module',
            491520, 20, bioDataOut, 'bioData')
    })
})()
