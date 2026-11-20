// priority: 95
// 本文件按功能保存配方阶段，实际执行顺序统一由配方入口管理。

// 汇集十六种世界碎片，合成奇珍与采掘结晶。
global.gtlPack.register("custom_world_crystals", event => {
    const gtr = event.recipes.gtceu
    const crystalRecipes = [
        { id: "greythings:treasures_crystal_1_custom", cat: "kubejs:heartofthesmogus", out: "8x gtlcore:treasures_crystal", chanced: "gtlcore:treasures_crystal", chance: 2500, small: true },
        { id: "greythings:treasures_crystal_0_custom", cat: "8x gtlcore:super_glue", out: "2x gtlcore:treasures_crystal", chanced: "gtlcore:treasures_crystal", chance: 7500, small: false },
        { id: "greythings:mining_crystal_0_custom", cat: "8x gtlcore:super_glue", out: "2x gtlcore:mining_crystal", chanced: "gtlcore:mining_crystal", chance: 7500, small: false },
        { id: "greythings:mining_crystal_1_custom", cat: "gtlcore:ultimate_tea", out: "8x gtlcore:mining_crystal", chanced: "gtlcore:mining_crystal", chance: 2500, small: true }
    ]
    const worldFragments = ["overworld", "nether", "end", "reactor", "moon", "mars", "venus", "mercury", "ceres", "io", "ganymede", "pluto", "enceladus", "titan", "glacio", "barnarda"]
    crystalRecipes.forEach(r => {
        let builder = gtr.qft(r.id)
            .notConsumable(r.cat)
            .chancedInput(r.chanced, r.chance, 0)
            .itemInputs(worldFragments.map(f => `${r.small ? 16 : 64}x gtlcore:world_fragments_${f}`))
            .inputFluids("gtceu:uu_matter 100000000", "gtceu:eternity " + (r.small ? 250000 : 2500000), "gtceu:magmatter " + (r.small ? 250000 : 2500000))
            .itemOutputs(r.out)
            .EUt(1024 * GTValues.VA[GTValues.MAX])
            .duration(200)
    })
})
