// priority: 100
// 控制星球矿物生成，注册岩石矿石前缀与覆盖各维度的世界生成层。
;(() => {
    const BlockBehaviour = Java.loadClass("net.minecraft.world.level.block.state.BlockBehaviour")
    const BlockTags = Java.loadClass("net.minecraft.tags.BlockTags")

    // ---------- 1. 移除 Ad Astra 原版矿生成 ----------
    WorldgenEvents.remove(event => {
        event.removeFeatureById("underground_ores", [
            "ad_astra:moon_desh_ore", "ad_astra:moon_iron_ore", "ad_astra:moon_ice_shard_ore",
            "ad_astra:mars_iron_ore", "ad_astra:mars_diamond_ore", "ad_astra:mars_ostrum_ore", "ad_astra:mars_ice_shard_ore",
            "ad_astra:venus_coal_ore", "ad_astra:venus_gold_ore", "ad_astra:venus_diamond_ore", "ad_astra:venus_calorite_ore",
            "ad_astra:glacio_ice_shard_ore", "ad_astra:glacio_coal_ore", "ad_astra:glacio_copper_ore", "ad_astra:glacio_iron_ore",
            "ad_astra:mercury_iron_ore", "ad_astra:glacio_deepslate_lapis_ore", "ad_astra:glacio_deepslate_iron_ore",
            "ad_astra:glacio_lapis_ore", "ad_astra:glacio_deepslate_copper_ore", "ad_astra:glacio_deepslate_coal_ore"
        ])
    })

    // ---------- 2. 注册星球石头矿石前缀 ----------
    // 让 GT 矿石能生成在对应星球/自定义卫星的岩石上
    GTCEuStartupEvents.registry("gtceu:tag_prefix", event => {
        const registerStoneOre = (name, blockId, texture) => {
            TagPrefix.oreTagPrefix(name, BlockTags.MINEABLE_WITH_PICKAXE)
                .registerOre(() => Block.getBlock(blockId).defaultBlockState(), null,
                    BlockBehaviour.Properties.of().requiresCorrectToolForDrops().strength(3.0, 3.0),
                    texture)
        }
        ;[
            ["moon_stone", "ad_astra:moon_stone", "ad_astra:block/moon_stone"],
            ["mars_stone", "ad_astra:mars_stone", "ad_astra:block/mars_stone"],
            ["venus_stone", "ad_astra:venus_stone", "ad_astra:block/venus_stone"],
            ["mercury_stone", "ad_astra:mercury_stone", "ad_astra:block/mercury_stone"],
            ["glacio_stone", "ad_astra:glacio_stone", "ad_astra:block/glacio_stone"],
            ["titanstone", "kubejs:titanstone", "kubejs:block/titanstone"],
            ["plutostone", "kubejs:plutostone", "kubejs:block/plutostone"],
            ["iostone", "kubejs:iostone", "kubejs:block/iostone"],
            ["ganymedestone", "kubejs:ganymedestone", "kubejs:block/ganymedestone"],
            ["enceladusstone", "kubejs:enceladusstone", "kubejs:block/enceladusstone"],
            ["ceresstone", "kubejs:ceresstone", "kubejs:block/ceresstone"]
        ].forEach(([name, block, texture]) => registerStoneOre(name, block, texture))
    })

    // ---------- 3. 注册"全层"世界生成层 ----------
    // 该层可替换主世界/下界/末地/远古世界/各星球与自定义卫星的岩石
    GTCEuStartupEvents.registry("gtceu:world_gen_layer", event => {
        event.create("all_layer")
            .targets("#minecraft:stone_ore_replaceables",
                "minecraft:netherrack",
                "minecraft:endstone",
                "ad_astra:moon_stone",
                "ad_astra:mars_stone",
                "ad_astra:venus_stone",
                "ad_astra:mercury_stone",
                "ad_astra:glacio_stone",
                "kubejs:titanstone",
                "kubejs:plutostone",
                "kubejs:iostone",
                "kubejs:ganymedestone",
                "kubejs:enceladusstone",
                "kubejs:ceresstone")
            .dimensions("minecraft:overworld",
                "minecraft:the_nether",
                "minecraft:the_end",
                "kubejs:ancient_world",
                "ad_astra:moon",
                "ad_astra:mars",
                "ad_astra:venus",
                "ad_astra:mercury",
                "ad_astra:glacio",
                "kubejs:titan",
                "kubejs:pluto",
                "kubejs:io",
                "kubejs:ganymede",
                "kubejs:enceladus",
                "kubejs:ceres",
                "kubejs:barnarda")
    })
})()
