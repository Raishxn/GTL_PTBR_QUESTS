// ============================================
// 模具与特殊配方板块 
// 内部开关：ENABLE_MODULE = true
// ============================================

(function() {
    const ENABLE_MODULE = true;   // 设为 false 禁用

    if (!ENABLE_MODULE) {
        console.log('[模具特殊] 模块已禁用');
        return;
    }

    const CASTING_MOLDS = ["ingot","plate","gear","small_gear","credit","bottle","nugget","ball","cylinder","block","anvil","name","rotor","pill"];
    const EXTRUDER_MOLDS = ["plate","rod","ingot","block","gear","small_gear","ring","bolt","wire","cell","tiny_pipe","small_pipe","normal_pipe","large_pipe","huge_pipe","bottle","foil","long_rod","rotor"];
    const FIELD_SHAPES = ["ingot","ball"];

    ServerEvents.recipes(event => {
        const gtr = event.recipes.gtceu;
        let added = 0;

        // 替换模具为编程电路
        CASTING_MOLDS.forEach((m, i) => {
            event.replaceInput({}, `gtceu:${m}_casting_mold`, Item.of('gtceu:programmed_circuit', `{Configuration:${i+1}}`).strongNBT());
        });
        EXTRUDER_MOLDS.forEach((m, i) => {
            event.replaceInput({}, `gtceu:${m}_extruder_mold`, Item.of('gtceu:programmed_circuit', `{Configuration:${i+1}}`).strongNBT());
        });
        FIELD_SHAPES.forEach((s, i) => {
            event.replaceInput({}, `kubejs:${s}_field_shape`, Item.of('gtceu:programmed_circuit', `{Configuration:${i+1}}`).strongNBT());
        });
        console.log('[模具特殊] 模具/场形状已替换为编程电路');

        // 特殊配方（与之前相同，未改动）
        gtr.dimensionally_transcendent_plasma_forge("tl_fanbeishikong")
            .notConsumable(Item.of('gtceu:programmed_circuit','{Configuration:1}').strongNBT())
            .inputFluids("gtceu:spacetime 144")
            .itemOutputs("1x gtceu:spacetime_ingot")
            .outputFluids("gtceu:dimensionallytranscendentresidue 144")
            .EUt(GTValues.VA[GTValues.MAX]).duration(1).blastFurnaceTemp(96000);
        added++;

        gtr.sps_crafting("tl_magmatter_ingot")
            .circuit(32).inputFluids("gtceu:mana 100000", "gtceu:magmatter 100")
            .itemInputs("minecraft:netherite_ingot").itemOutputs("gtceu:magmatter_ingot")
            .EUt(4 * GTValues.VA[GTValues.MAX]).duration(1);
        added++;

        gtr.sps_crafting("tl_magmatter_ingot_d")
            .circuit(32).inputFluids("gtceu:mana 10000", "gtceu:magmatter 10")
            .itemInputs("gtceu:magmatter_dust", "minecraft:netherite_ingot").itemOutputs("gtceu:magmatter_ingot")
            .EUt(4 * GTValues.VA[GTValues.MAX]).duration(1);
        added++;

        gtr.dimensionally_transcendent_plasma_forge("tl_spacetime_ingot")
            .circuit(32).inputFluids("gtceu:spacetime 1000", "gtceu:raw_star_matter_plasma 1000")
            .outputFluids("gtceu:dimensionallytranscendentresidue 100").itemOutputs("8x gtceu:spacetime_ingot")
            .EUt(GTValues.VA[GTValues.MAX]).duration(1).blastFurnaceTemp(62000);
        added++;

        gtr.sps_crafting("tl_attuned_tengam_ingot")
            .circuit(32).itemInputs("gtceu:attuned_tengam_dust").inputFluids("gtceu:mana 1000")
            .itemOutputs("gtceu:attuned_tengam_ingot").EUt(GTValues.VA[GTValues.UIV]).duration(1);
        added++;

        gtr.fluid_solidifier("tl_pellet_antimatter")
            .circuit(31).inputFluids("gtceu:antimatter 1000").itemOutputs("kubejs:pellet_antimatter")
            .EUt(GTValues.VA[GTValues.UV]).duration(1);
        added++;

        gtr.plasma_condenser("tl_neutronium_sphere")
            .circuit(31).inputFluids("gtceu:liquid_helium 32000").outputFluids("gtceu:helium 32000")
            .itemInputs("kubejs:neutron_plasma_containment_cell")
            .itemOutputs("4x kubejs:neutronium_sphere", "kubejs:plasma_containment_cell")
            .EUt(GTValues.VA[GTValues.UHV]).duration(1);
        added++;

        gtr.plasma_condenser("tl_iron_ingot")
            .circuit(32).inputFluids("gtceu:iron_plasma 144", "gtceu:liquid_helium 14400")
            .outputFluids("gtceu:helium 14400").itemOutputs("minecraft:iron_ingot")
            .EUt(GTValues.VA[GTValues.UHV]).duration(1);
        added++;

        gtr.plasma_condenser("tl_nickel_ingot")
            .circuit(32).inputFluids("gtceu:nickel_plasma 144", "gtceu:liquid_helium 14400")
            .outputFluids("gtceu:helium 14400").itemOutputs("gtceu:nickel_ingot")
            .EUt(GTValues.VA[GTValues.UHV]).duration(1);
        added++;

        gtr.fluid_solidifier("tl_degenerate_rhenium_plate")
            .notConsumable(Item.of('gtceu:programmed_circuit','{Configuration:2}').strongNBT())
            .inputFluids("gtceu:liquid_degenerate_rhenium 144").itemOutputs("1x gtceu:degenerate_rhenium_plate")
            .EUt(7).duration(1);
        added++;

        console.log(`[模具特殊] 加载完成，添加 ${added} 个特殊配方`);
    });
})();