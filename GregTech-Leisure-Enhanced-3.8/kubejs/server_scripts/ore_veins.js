// 修改基础矿脉，并在远古世界与各行星登记分层矿脉。
GTCEuServerEvents.oreVeins(event => {
    // 云母和磷灰石矿脉使用原有分层生成器。
    event.modify("gtceu:mica_vein", vein => {
        vein.layeredVeinGenerator(generator => generator
            .withLayerPattern(() => GTLayerPattern.builder(GTOres.OVERWORLD_RULES)
                .layer(l => l.weight(3).mat(GTMaterials.Kyanite).size(2, 4))
                .layer(l => l.weight(2).mat(GTMaterials.Mica).size(1, 1))
                .layer(l => l.weight(1).mat(GTMaterials.Pollucite).size(1, 1))
                .build()))
    })
    event.modify("gtceu:apatite_vein", vein => {
        vein.layeredVeinGenerator(generator => generator
            .withLayerPattern(() => GTLayerPattern.builder(GTOres.OVERWORLD_RULES)
                .layer(l => l.weight(3).mat(GTMaterials.Apatite).size(2, 4))
                .layer(l => l.weight(2).mat(GTMaterials.TricalciumPhosphate).size(1, 1))
                .build()))
    })

    // 矿脉表：编号、权重、矿簇大小、密度、维度、最低高度、最高高度、矿层。
    // 每个矿层依次填写材料、权重、最小厚度、最大厚度。
    const veins = [
        ["kubejs:quartzite_vein_aw", 20, 40, 0.3, ["kubejs:ancient_world", "kubejs:ganymede"], 30, 60, [[GTMaterials.Quartzite, 3, 2, 4], [GTMaterials.Barite, 3, 2, 4], [GTMaterials.NetherQuartz, 4, 2, 4]]],
        ["kubejs:sulfur_vein_aw", 100, 50, 0.2, ["kubejs:ancient_world", "kubejs:ganymede", "ad_astra:glacio"], 0, 30, [[GTMaterials.Sulfur, 3, 2, 4], [GTMaterials.Pyrite, 2, 1, 1], [GTMaterials.Sphalerite, 1, 1, 1]]],
        ["kubejs:stibnite_vein_aw", 70, 40, 0.25, ["kubejs:ancient_world", "kubejs:pluto"], 30, 60, [[GTMaterials.Copper, 1, 1, 2], [GTMaterials.Stibnite, 1, 1, 3]]],
        ["kubejs:topaz_vein_aw", 70, 40, 0.25, ["kubejs:ancient_world", "kubejs:ganymede", "kubejs:barnarda"], 20, 60, [[GTMaterials.BlueTopaz, 1, 2, 4], [GTMaterials.Topaz, 1, 1, 3]]],
        ["kubejs:certus_quartz_vein_aw", 40, 40, 0.25, ["kubejs:ancient_world", "kubejs:ceres", "kubejs:barnarda"], 10, 60, [[GTMaterials.Quartzite, 3, 2, 4], [GTMaterials.CertusQuartz, 2, 1, 4], [GTMaterials.Barite, 1, 1, 1]]],
        ["kubejs:beryllium_vein_aw", 30, 30, 0.75, ["kubejs:ancient_world"], -20, 20, [[GTMaterials.Beryllium, 3, 3, 4], [GTMaterials.Emerald, 4, 2, 4]]],
        ["kubejs:molybdenum_vein_aw", 10, 10, 0.5, ["kubejs:ancient_world", "kubejs:ceres", "ad_astra:glacio"], 20, 50, [[GTMaterials.Wulfenite, 3, 2, 4], [GTMaterials.Molybdenite, 2, 1, 1], [GTMaterials.Molybdenum, 1, 1, 1], [GTMaterials.Powellite, 1, 1, 1]]],
        ["kubejs:saltpeter_vein_aw", 10, 40, 0.75, ["kubejs:ancient_world", "kubejs:titan", "ad_astra:glacio"], 5, 45, [[GTMaterials.Saltpeter, 2, 2, 4], [GTMaterials.Diatomite, 2, 1, 1], [GTMaterials.Electrotine, 1, 1, 1], [GTMaterials.Alunite, 1, 1, 1]]],
        ["kubejs:bauxite_vein_ad", 40, 40, 0.3, ["ad_astra:moon", "kubejs:ganymede"], 10, 70, [[GTMaterials.Bauxite, 2, 2, 4], [GTMaterials.Ilmenite, 2, 1, 2], [GTMaterials.Aluminium, 1, 1, 1]]],
        ["kubejs:monazite_vein_ad", 30, 40, 0.25, ["ad_astra:moon", "kubejs:ceres", "ad_astra:glacio"], 20, 40, [[GTMaterials.Bastnasite, 3, 2, 4], [GTMaterials.Monazite, 1, 1, 1], [GTMaterials.Neodymium, 1, 1, 1]]],
        ["kubejs:pitchblende_vein_ad", 10, 40, 1, ["ad_astra:moon", "kubejs:titan", "kubejs:pluto"], 30, 60, [[GTMaterials.Pitchblende, 2, 2, 4], [GTMaterials.Uraninite, 3, 1, 1], [GTMaterials.Thorium, 1, 1, 1]]],
        ["kubejs:plutonium_vein_ad", 10, 40, 1, ["ad_astra:moon", "kubejs:pluto", "kubejs:barnarda"], 30, 40, [[GTMaterials.Plutonium239, 1, 1, 1], [GTMaterials.Uraninite, 3, 1, 1], [GTMaterials.Thorium, 2, 1, 1]]],
        ["kubejs:apatite_vein_ad", 30, 40, 0.25, ["ad_astra:mars", "kubejs:enceladus", "kubejs:barnarda"], 10, 80, [[GTMaterials.Apatite, 3, 2, 4], [GTMaterials.TricalciumPhosphate, 3, 1, 1], [GTMaterials.Pyrochlore, 1, 1, 1]]],
        ["kubejs:sheldonite_vein_ad", 10, 30, 0.2, ["ad_astra:mars", "kubejs:enceladus", "ad_astra:glacio"], 5, 50, [[GTMaterials.Bornite, 3, 2, 4], [GTMaterials.Cooperite, 2, 1, 1], [GTMaterials.Platinum, 2, 1, 1], [GTMaterials.Palladium, 1, 1, 1]]],
        ["kubejs:scheelite_vein_ad", 20, 30, 0.7, ["ad_astra:mars", "ad_astra:glacio", "kubejs:barnarda"], 20, 60, [[GTMaterials.Scheelite, 3, 2, 4], [GTMaterials.Tungstate, 2, 1, 4], [GTMaterials.Lithium, 1, 1, 1]]],
        ["kubejs:olivine_vein_ad", 20, 30, 0.25, ["ad_astra:venus", "kubejs:io", "kubejs:enceladus"], -20, 10, [[GTMaterials.Bentonite, 1, 2, 4], [GTMaterials.Magnetite, 1, 1, 1], [GTMaterials.Olivine, 2, 1, 1], [GTMaterials.GlauconiteSand, 1, 1, 1]]],
        ["kubejs:desh_vein_ad", 20, 30, 0.2, ["ad_astra:venus", "kubejs:titan"], 10, 30, [[GTMaterials.get("desh"), 1, 2, 4], [GTMaterials.Magnesite, 2, 1, 1]]],
        ["kubejs:sulfur_vein_ad", 40, 40, 0.3, ["ad_astra:venus", "kubejs:io", "kubejs:barnarda"], 10, 30, [[GTMaterials.Sulfur, 2, 2, 4], [GTMaterials.Pyrite, 1, 1, 2], [GTMaterials.Sphalerite, 3, 1, 1]]],
        ["kubejs:calorite_vein_ad", 20, 40, 0.3, ["ad_astra:mercury", "ad_astra:glacio"], 10, 30, [[GTMaterials.get("calorite"), 1, 2, 3], [GTMaterials.Cobalt, 2, 1, 2], [GTMaterials.Magnesite, 1, 1, 1]]],
        ["kubejs:nickel_vein_ad", 40, 40, 0.25, ["ad_astra:mercury", "kubejs:pluto"], -10, 60, [[GTMaterials.Garnierite, 1, 2, 4], [GTMaterials.Nickel, 2, 1, 1], [GTMaterials.Cobaltite, 1, 1, 1], [GTMaterials.Pentlandite, 1, 1, 1]]],
        ["kubejs:ostrum_vein_ad", 40, 40, 0.25, ["kubejs:ceres", "ad_astra:glacio"], 0, 60, [[GTMaterials.get("ostrum"), 1, 2, 4], [GTMaterials.Gold, 2, 1, 4]]],
        ["kubejs:naquadah_vein_ad", 20, 40, 0.25, ["kubejs:io", "kubejs:pluto", "kubejs:barnarda"], -10, 20, [[GTMaterials.Naquadah, 2, 2, 4], [GTMaterials.Plutonium239, 1, 2, 4]]],
        ["kubejs:zircon_vein_ad", 20, 40, 0.25, ["kubejs:ganymede", "kubejs:titan"], 0, 20, [[GTMaterials.get("zircon"), 2, 1, 4], [GTMaterials.Grossular, 1, 2, 4], [GTMaterials.Pyrolusite, 1, 2, 4], [GTMaterials.Tantalite, 1, 1, 2]]],
        ["kubejs:celestine_vein_ad", 40, 80, 0.25, ["kubejs:io", "ad_astra:glacio"], 10, 20, [[GTMaterials.get("celestine"), 1, 1, 4], [GTMaterials.Cooperite, 1, 2, 3], [GTMaterials.Trona, 2, 2, 4]]]
    ]
    veins.forEach(([id, weight, size, density, dimensions, minY, maxY, layers]) => {
        event.add(id, vein => {
            vein.weight(weight)
            vein.clusterSize(size)
            vein.density(density)
            vein.discardChanceOnAirExposure(0)
            vein.layer("all_layer")
            vein.dimensions(dimensions)
            vein.heightRangeUniform(minY, maxY)
            vein.layeredVeinGenerator(generator => generator.buildLayerPattern(pattern => {
                layers.forEach(([material, weight, min, max]) => {
                    pattern.layer(layer => layer.weight(weight).mat(material).size(min, max))
                })
            }))
        })
    })
})
