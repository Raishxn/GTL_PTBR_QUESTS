// priority: 95
// 本文件按功能保存配方阶段，实际执行顺序统一由配方入口管理。

// 登记铸模电路的凝固、冷凝和等离子锻造特殊配方。
global.gtlPack.register("custom_mold_recipes", event => {
    const gtr = event.recipes.gtceu
    const specialRecipes = [
        { machine: "dimensionally_transcendent_plasma_forge", id: "fanbeishikong", notConsumable: 1, inputFluids: ["gtceu:spacetime 144"], outputs: ["1x gtceu:spacetime_ingot"], outputFluids: ["gtceu:dimensionallytranscendentresidue 144"], euTier: "MAX", duration: 1, blastTemp: 96000 },
        { machine: "sps_crafting", id: "magmatter_ingot", circuit: 32, inputFluids: ["gtceu:mana 100000", "gtceu:magmatter 100"], inputs: ["minecraft:netherite_ingot"], outputs: ["gtceu:magmatter_ingot"], eu: 4 * 1000000000, duration: 1 },
        { machine: "sps_crafting", id: "magmatter_ingot_d", circuit: 32, inputFluids: ["gtceu:mana 10000", "gtceu:magmatter 10"], inputs: ["gtceu:magmatter_dust", "minecraft:netherite_ingot"], outputs: ["gtceu:magmatter_ingot"], eu: 4 * 1000000000, duration: 1 },
        { machine: "dimensionally_transcendent_plasma_forge", id: "spacetime_ingot", circuit: 32, inputFluids: ["gtceu:spacetime 1000", "gtceu:raw_star_matter_plasma 1000"], outputFluids: ["gtceu:dimensionallytranscendentresidue 100"], outputs: ["8x gtceu:spacetime_ingot"], euTier: "MAX", duration: 1, blastTemp: 62000 },
        { machine: "sps_crafting", id: "attuned_tengam_ingot", circuit: 32, inputs: ["gtceu:attuned_tengam_dust"], inputFluids: ["gtceu:mana 1000"], outputs: ["gtceu:attuned_tengam_ingot"], euTier: "UIV", duration: 1 },
        { machine: "fluid_solidifier", id: "pellet_antimatter", circuit: 31, inputFluids: ["gtceu:antimatter 1000"], outputs: ["kubejs:pellet_antimatter"], euTier: "UV", duration: 1 },
        { machine: "plasma_condenser", id: "neutronium_sphere", circuit: 31, inputFluids: ["gtceu:liquid_helium 32000"], outputFluids: ["gtceu:helium 32000"], inputs: ["kubejs:neutron_plasma_containment_cell"], outputs: ["4x kubejs:neutronium_sphere", "kubejs:plasma_containment_cell"], euTier: "UHV", duration: 1 },
        { machine: "plasma_condenser", id: "iron_ingot", circuit: 32, inputFluids: ["gtceu:iron_plasma 144", "gtceu:liquid_helium 14400"], outputFluids: ["gtceu:helium 14400"], outputs: ["minecraft:iron_ingot"], euTier: "UHV", duration: 1 },
        { machine: "plasma_condenser", id: "nickel_ingot", circuit: 32, inputFluids: ["gtceu:nickel_plasma 144", "gtceu:liquid_helium 14400"], outputFluids: ["gtceu:helium 14400"], outputs: ["gtceu:nickel_ingot"], euTier: "UHV", duration: 1 },
        { machine: "fluid_solidifier", id: "degenerate_rhenium_plate", notConsumable: 2, inputFluids: ["gtceu:liquid_degenerate_rhenium 144"], outputs: ["1x gtceu:degenerate_rhenium_plate"], eu: 7, duration: 1 }
    ]
    for (let r of specialRecipes) {
        let builder = gtr[r.machine](`mold_module:${r.id}`)
        if (r.circuit !== undefined) builder.circuit(r.circuit)
        if (r.notConsumable) builder.notConsumable(Item.of('gtceu:programmed_circuit', `{Configuration:${r.notConsumable}}`).strongNBT())
        if (r.inputs) builder.itemInputs(r.inputs)
        if (r.inputFluids) builder.inputFluids(r.inputFluids)
        if (r.outputs) builder.itemOutputs(r.outputs)
        if (r.outputFluids) builder.outputFluids(r.outputFluids)
        if (r.eu !== undefined) builder.EUt(r.eu)
        else if (r.euTier) builder.EUt(GTValues.VA[GTValues[r.euTier]])
        if (r.blastTemp) builder.blastFurnaceTemp(r.blastTemp)
        builder.duration(r.duration || 1)
    }
})
