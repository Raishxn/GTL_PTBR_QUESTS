// priority: 95
// 本文件按功能保存配方阶段，实际执行顺序统一由配方入口管理。

// 登记透镜电路的晶圆、富勒烯和纳米蜂群工艺，保留塔兰晶圆修复及光刻掩膜。
global.gtlPack.register("custom_lens_recipes", event => {
    const gtr = event.recipes.gtceu
    const sortByCircuitDesc = (a, b) => b.circuit - a.circuit
    const focusEngravingRecipes = [
        { id: "raw_photon_carrying_wafer", circuit: 32, inputs: ["kubejs:rutherfordium_neutronium_wafer"], inputFluids: ["gtceu:photoresist 100"], outputs: ["kubejs:raw_photon_carrying_wafer"], euTier: "UHV" },
        { id: "prepared_cosmic_soc_wafer", circuit: 31, inputs: ["kubejs:taranium_wafer"], inputFluids: ["gtceu:gamma_rays_photoresist 100"], outputs: ["kubejs:prepared_cosmic_soc_wafer"], euTier: "UIV" },
        { id: "high_precision_crystal_soc", circuit: 30, inputs: ["gtceu:crystal_soc"], inputFluids: ["gtceu:euv_photoresist 100"], outputs: ["kubejs:high_precision_crystal_soc"], euTier: "UEV" },
        { id: "nm_wafer", circuit: 29, inputs: ["kubejs:rutherfordium_neutronium_wafer"], inputFluids: ["gtceu:photoresist 100"], outputs: ["kubejs:nm_wafer"], euTier: "UV" },
        { id: "pm_wafer", circuit: 28, inputs: ["kubejs:taranium_wafer"], inputFluids: ["gtceu:euv_photoresist 100"], outputs: ["kubejs:pm_wafer"], euTier: "UHV" },
        { id: "fm_wafer", circuit: 27, inputs: ["kubejs:pm_wafer"], inputFluids: ["gtceu:gamma_rays_photoresist 100"], outputs: ["kubejs:fm_wafer"], euTier: "UEV" },
        { id: "fullerene_dust2", circuit: 26, inputs: ["gtceu:unfolded_fullerene_dust"], inputFluids: ["gtceu:euv_photoresist 5"], outputs: ["gtceu:fullerene_dust"], eu: 7864320 },
        { id: "lanthanum_embedded_fullerene_dust2", circuit: 25, inputs: ["2x gtceu:lanthanum_fullerene_mix_dust"], inputFluids: ["gtceu:euv_photoresist 5"], outputs: ["2x gtceu:lanthanum_embedded_fullerene_dust"], eu: 7864320 },
        { id: "primary_soc_wafer_from_prepare", circuit: 24, inputs: ["gtladditions:prepare_primary_soc_wafer"], inputFluids: ["gtceu:gamma_rays_photoresist 100"], outputs: ["gtladditions:primary_soc_wafer"], euTier: "UEV" },
        { id: "spacetime_soc_wafer_from_prepare", circuit: 23, inputs: ["gtladditions:prepare_spacetime_soc_wafer"], inputFluids: ["gtceu:gamma_rays_photoresist 100"], outputs: ["gtladditions:spacetime_soc_wafer"], euTier: "UIV" },
        { id: "chaos_soc_wafer_from_dragon", circuit: 22, inputs: ["gtladditions:dragon_element_starmetal_wafer"], inputFluids: ["gtceu:euv_photoresist 100"], outputs: ["gtladditions:chaos_soc_wafer"], euTier: "UHV" },
        { id: "extraordinary_soc_wafer_from_prepare", circuit: 21, inputs: ["gtladditions:prepare_extraordinary_soc_wafer"], inputFluids: ["gtceu:photoresist 100"], outputs: ["gtladditions:extraordinary_soc_wafer"], euTier: "UV" }
    ]
    focusEngravingRecipes.sort(sortByCircuitDesc)
    for (let r of focusEngravingRecipes) {
        let builder = gtr.dimensional_focus_engraving_array(`lens_module:focus/${r.id}`)
        builder.circuit(r.circuit).itemInputs(r.inputs).inputFluids(r.inputFluids).itemOutputs(r.outputs).duration(1)
        if (r.euTier) builder.EUt(GTValues.VA[GTValues[r.euTier]])
        else if (r.eu) builder.EUt(r.eu)
    }
    const precisionLaserRecipes = [
        { id: "prepared_cosmic_soc_wafer1", circuit: 32, inputs: ["kubejs:taranium_wafer"], inputFluids: ["gtceu:gamma_rays_photoresist 1000"], outputs: ["kubejs:prepared_cosmic_soc_wafer"], euTier: "UIV" },
        { id: "high_precision_crystal_soc2", circuit: 31, inputs: ["gtceu:crystal_soc"], inputFluids: ["gtceu:euv_photoresist 1000"], outputs: ["kubejs:high_precision_crystal_soc"], euTier: "UEV" },
        { id: "nm_wafer3", circuit: 30, inputs: ["kubejs:rutherfordium_neutronium_wafer"], inputFluids: ["gtceu:photoresist 1000"], outputs: ["kubejs:nm_wafer"], euTier: "UV" },
        { id: "pm_wafer4", circuit: 29, inputs: ["kubejs:taranium_wafer"], inputFluids: ["gtceu:euv_photoresist 1000"], outputs: ["kubejs:pm_wafer"], euTier: "UHV" },
        { id: "fm_wafer5", circuit: 28, inputs: ["kubejs:pm_wafer"], outputs: ["kubejs:fm_wafer"], euTier: "UEV" },
        { id: "raw_photon_carrying_wafer6", circuit: 27, inputs: ["kubejs:rutherfordium_neutronium_wafer"], inputFluids: ["gtceu:photoresist 1000"], outputs: ["kubejs:raw_photon_carrying_wafer"], euTier: "UHV" }
    ]
    precisionLaserRecipes.sort(sortByCircuitDesc)
    for (let r of precisionLaserRecipes) {
        let builder = gtr.precision_laser_engraver(`lens_module:precision/${r.id}`)
        builder.circuit(r.circuit).itemInputs(r.inputs).itemOutputs(r.outputs).duration(1)
        if (r.inputFluids) builder.inputFluids(r.inputFluids)
        if (r.euTier) builder.EUt(GTValues.VA[GTValues[r.euTier]])
    }
    const laserEngraverRecipes = [
        { id: "fullerene_dust", circuit: 32, inputs: ["gtceu:unfolded_fullerene_dust"], inputFluids: ["gtceu:nitrogen 10000"], outputs: ["gtceu:fullerene_dust"], outputFluids: ["gtceu:ammonia 10000"], eu: 2000000 },
        { id: "exotic_wafer", circuit: 31, inputs: ["gtceu:highly_advanced_soc_wafer"], outputs: ["kubejs:exotic_wafer"], euTier: "UHV" },
        { id: "diffractor_grating_mirror", circuit: 30, inputs: ["kubejs:photocoated_hassium_wafer"], outputs: ["kubejs:diffractor_grating_mirror"], euTier: "UIV" },
        { id: "ilc_wafer", circuit: 29, inputs: ["kubejs:taranium_wafer"], outputs: ["64x gtceu:ilc_wafer"], eu: 122880 },
        { id: "ram_wafer", circuit: 28, inputs: ["kubejs:taranium_wafer"], outputs: ["64x gtceu:ram_wafer"], eu: 122880 },
        { id: "lpic_wafer", circuit: 27, inputs: ["kubejs:taranium_wafer"], outputs: ["64x gtceu:lpic_wafer"], eu: 122880 },
        { id: "simple_soc_wafer", circuit: 26, inputs: ["kubejs:taranium_wafer"], outputs: ["64x gtceu:simple_soc_wafer"], eu: 122880 },
        { id: "ulpic_wafer", circuit: 25, inputs: ["kubejs:taranium_wafer"], outputs: ["64x gtceu:ulpic_wafer"], eu: 122880 },
        { id: "cpu_wafer", circuit: 24, inputs: ["kubejs:taranium_wafer"], outputs: ["64x gtceu:cpu_wafer"], eu: 122880 },
        { id: "soc_wafer", circuit: 23, inputs: ["kubejs:taranium_wafer"], outputs: ["32x gtceu:soc_wafer"], eu: 122880 },
        { id: "nor_memory_wafer", circuit: 22, inputs: ["kubejs:taranium_wafer"], outputs: ["32x gtceu:nor_memory_wafer"], eu: 122880 },
        { id: "mpic_wafer", circuit: 21, inputs: ["kubejs:taranium_wafer"], outputs: ["32x gtceu:mpic_wafer"], eu: 122880 },
        { id: "nand_memory_wafer", circuit: 20, inputs: ["kubejs:taranium_wafer"], outputs: ["32x gtceu:nand_memory_wafer"], eu: 122880 },
        { id: "advanced_soc_wafer", circuit: 19, inputs: ["kubejs:taranium_wafer"], outputs: ["8x gtceu:advanced_soc_wafer"], eu: 122880 },
        { id: "highly_advanced_soc_wafer", circuit: 18, inputs: ["kubejs:taranium_wafer"], outputs: ["4x gtceu:highly_advanced_soc_wafer"], eu: 122880 },
        { id: "lanthanum_embedded_fullerene_dust", circuit: 17, inputs: ["2x gtceu:lanthanum_fullerene_mix_dust"], inputFluids: ["gtceu:nitrogen 10000"], outputs: ["2x gtceu:lanthanum_embedded_fullerene_dust"], outputFluids: ["gtceu:ammonia 10000"], eu: 1966080 }
    ]
    laserEngraverRecipes.sort(sortByCircuitDesc)
    for (let r of laserEngraverRecipes) {
        let builder = gtr.laser_engraver(`lens_module:laser/${r.id}`)
        builder.circuit(r.circuit).itemInputs(r.inputs).itemOutputs(r.outputs).duration(1)
        if (r.inputFluids) builder.inputFluids(r.inputFluids)
        if (r.outputFluids) builder.outputFluids(r.outputFluids)
        if (r.euTier) builder.EUt(GTValues.VA[GTValues[r.euTier]])
        else if (r.eu) builder.EUt(r.eu)
    }
    const nanoForgeRecipes = [
        { id: "carbon_nanoswarm", circuit: 32, inputs: ["64x gtceu:carbon_block", "64x gtceu:soc"], outputs: ["64x gtceu:carbon_nanoswarm"], fluids: ["gtceu:soldering_alloy 20000", "gtceu:lubricant 20000"], eu: GTValues.VA[GTValues.UV] },
        { id: "glowstone_nanoswarm", circuit: 31, inputs: ["64x minecraft:glowstone", "64x gtceu:advanced_soc"], outputs: ["64x gtceu:glowstone_nanoswarm"], fluids: ["gtceu:uu_amplifier 10000", "gtceu:soldering_alloy 20000", "gtceu:lubricant 20000"], eu: GTValues.VA[GTValues.UV] },
        { id: "copper_nanoswarm", circuit: 30, inputs: ["8x minecraft:copper_block", "8x gtceu:soc"], outputs: ["gtceu:copper_nanoswarm"], fluids: ["gtceu:naquadah 2000", "gtceu:soldering_alloy 10000", "gtceu:bismuth 10000"], eu: GTValues.VA[GTValues.UV] },
        { id: "iron_nanoswarm", circuit: 29, inputs: ["8x minecraft:iron_block", "8x gtceu:soc"], outputs: ["gtceu:iron_nanoswarm"], fluids: ["gtceu:naquadah 2000", "gtceu:soldering_alloy 10000", "gtceu:bismuth 10000"], eu: GTValues.VA[GTValues.UV] },
        { id: "gold_nanoswarm", circuit: 28, inputs: ["8x minecraft:gold_block", "16x gtceu:soc"], outputs: ["gtceu:gold_nanoswarm"], fluids: ["gtceu:enriched_naquadah 2000", "gtceu:soldering_alloy 20000", "gtceu:bismuth 20000"], eu: GTValues.VA[GTValues.UV] }
    ]
    nanoForgeRecipes.sort(sortByCircuitDesc)
    for (let r of nanoForgeRecipes) {
        gtr.nano_forge(`lens_module:nano/${r.id}`)
            .circuit(r.circuit).itemInputs(r.inputs).itemOutputs(r.outputs).inputFluids(r.fluids).duration(1)
            .EUt(r.eu)
            .addData("nano_forge_tier", 1)
    }
    const photonMatrixRecipes = [
        { id: "chaos_soc_wafer_photon", circuit: 32, inputs: ["gtladditions:dragon_element_starmetal_wafer"], inputFluids: ["gtceu:euv_photoresist 75"], outputs: ["gtladditions:chaos_soc_wafer"], euTier: "UV" },
        { id: "spacetime_soc_wafer_photon", circuit: 31, inputs: ["gtladditions:prepare_spacetime_soc_wafer"], inputFluids: ["gtceu:gamma_rays_photoresist 75"], outputs: ["gtladditions:spacetime_soc_wafer"], euTier: "UHV" },
        { id: "primary_soc_wafer_photon", circuit: 30, inputs: ["gtladditions:prepare_primary_soc_wafer"], inputFluids: ["gtceu:gamma_rays_photoresist 75"], outputs: ["gtladditions:primary_soc_wafer"], euTier: "UIV" },
        { id: "prepared_cosmic_soc_wafer", circuit: 29, inputs: ["kubejs:taranium_wafer"], inputFluids: ["gtceu:gamma_rays_photoresist 50"], outputs: ["kubejs:prepared_cosmic_soc_wafer"], euTier: "UIV" },
        { id: "extraordinary_soc_wafer_photon", circuit: 28, inputs: ["gtladditions:prepare_extraordinary_soc_wafer"], inputFluids: ["gtceu:photoresist 75"], outputs: ["gtladditions:extraordinary_soc_wafer"], euTier: "UV" }
    ]
    photonMatrixRecipes.sort(sortByCircuitDesc)
    for (let r of photonMatrixRecipes) {
        let builder = gtr.photon_matrix_etch(`lens_module:photon/${r.id}`)
        builder.circuit(r.circuit).itemInputs(r.inputs).inputFluids(r.inputFluids).itemOutputs(r.outputs).duration(1)
        if (r.euTier) builder.EUt(GTValues.VA[GTValues[r.euTier]])
    }
    const photonLensReplaceRecipes = [
        { id: "raw_photon_carrying_wafer", circuit: 20, masks: ["kubejs:lithography_mask"], inputs: ["kubejs:rutherfordium_neutronium_wafer"], inputFluids: ["gtceu:photoresist 50"], outputs: ["kubejs:raw_photon_carrying_wafer"], euTier: "UV", duration: 240 },
        { id: "nm_wafer", circuit: 17, masks: ["kubejs:lithography_mask"], inputs: ["kubejs:rutherfordium_neutronium_wafer"], inputFluids: ["gtceu:photoresist 50"], outputs: ["kubejs:nm_wafer"], euTier: "ZPM", duration: 400 },
        { id: "pm_wafer", circuit: 21, masks: ["kubejs:lithography_mask"], inputs: ["kubejs:taranium_wafer"], inputFluids: ["gtceu:euv_photoresist 50"], outputs: ["kubejs:pm_wafer"], euTier: "UV", duration: 800 },
        { id: "fm_wafer", circuit: 22, masks: ["kubejs:grating_lithography_mask"], inputs: ["kubejs:pm_wafer"], inputFluids: ["gtceu:gamma_rays_photoresist 50"], outputs: ["kubejs:fm_wafer"], euTier: "UHV", duration: 1080 },
        { id: "high_precision_crystal_soc", circuit: 25, masks: ["kubejs:lithography_mask"], inputs: ["gtceu:crystal_soc"], inputFluids: ["gtceu:euv_photoresist 50"], outputs: ["kubejs:high_precision_crystal_soc"], euTier: "UHV", duration: 960 },
        { id: "fullerene_dust", circuit: 30, masks: [], inputs: ["gtceu:unfolded_fullerene_dust"], inputFluids: ["gtceu:euv_photoresist 5"], outputs: ["gtceu:fullerene_dust"], eu: 7864320, duration: 100 },
        { id: "lanthanum_embedded_fullerene_dust", circuit: 27, masks: [], inputs: ["2x gtceu:lanthanum_fullerene_mix_dust"], inputFluids: ["gtceu:euv_photoresist 5"], outputs: ["2x gtceu:lanthanum_embedded_fullerene_dust"], eu: 7864320, duration: 80 }
    ]
    photonLensReplaceRecipes.forEach(r => {
        let builder = gtr.photon_matrix_etch(`lens_module:lens_replace/${r.id}`)
        builder.circuit(r.circuit)
        r.masks.forEach(m => builder.notConsumable(m))
        builder.itemInputs(r.inputs).inputFluids(r.inputFluids).itemOutputs(r.outputs).duration(r.duration)
        if (r.eu !== undefined) builder.EUt(r.eu)
        else if (r.euTier) builder.EUt(GTValues.VA[GTValues[r.euTier]])
        builder.cleanroom(CleanroomType.CLEANROOM)
    })
})
