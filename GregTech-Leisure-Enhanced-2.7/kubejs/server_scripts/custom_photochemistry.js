// priority: 95
// 本文件按功能保存配方阶段，实际执行顺序统一由配方入口管理。

// 合成极紫外光刻胶。
global.gtlPack.register("custom_euv_photoresist", event => {
    const gtr = event.recipes.gtceu
    gtr.distort("kubejs:euv_photoresist")
        .itemInputs("6x gtceu:infuscolium_block", "30x gtceu:rhenium_dust", "56x gtceu:lithium_dust", "40x gtceu:selenium_dust", "50x gtceu:activated_carbon_dust", "60x gtceu:rutile_dust", "55x gtceu:quicklime_dust")
        .inputFluids("gtceu:ethane 12000", "gtceu:chlorine 75000", "gtceu:photoresist 8000", "gtceu:hydrogen 4700", "gtceu:oxygen 89000", "gtceu:nitrogen 40000", "gtceu:butane 57000")
        .outputFluids("gtceu:euv_photoresist 21600")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(1280)
        .blastFurnaceTemp(1800)
        .cleanroom(CleanroomType.CLEANROOM)
})

// 合成光刻聚合物。
global.gtlPack.register("custom_photopolymer", event => {
    const gtr = event.recipes.gtceu
    gtr.distort("kubejs:photopolymer")
        .itemInputs("64x gtceu:carbon_dust", "50x gtceu:rutile_dust", "70x gtceu:succinic_acid_dust", "32x gtceu:ice_dust", "20x gtceu:silver_dust", "25x gtceu:quicklime_dust", "40x gtceu:boron_dust", "120x gtceu:sodium_dust")
        .inputFluids("gtceu:benzene 40000", "gtceu:bromine 25000", "gtceu:oxygen 21600", "gtceu:chlorine 5600", "gtceu:propene 16000", "gtceu:butene 80000")
        .outputFluids("gtceu:photopolymer 16000")
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(2560)
        .blastFurnaceTemp(1800)
        .cleanroom(CleanroomType.CLEANROOM)
})

// 合成伽马射线光刻胶。
global.gtlPack.register("custom_gamma_photoresist", event => {
    const gtr = event.recipes.gtceu
    gtr.distort("kubejs:gamma_rays_photoresist")
        .itemInputs("16x gtceu:flerovium_dust", "16x gtceu:lanthanum_dust", "16x gtceu:unfolded_fullerene_dust", "16x gtceu:holmium_dust", "16x gtceu:thulium_dust", "16x gtceu:copernicium_dust", "16x gtceu:astatine_dust", "16x gtceu:francium_dust")
        .inputFluids("gtceu:euv_photoresist 10000", "gtceu:chlorine 16000", "gtceu:nitrogen 32000")
        .outputFluids("gtceu:gamma_rays_photoresist 16000")
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(800)
        .blastFurnaceTemp(1800)
})
