// ==================================================
// 透镜替换与高级晶圆/纳米锻造板块
// 内部开关：ENABLE_MODULE = true
// ==================================================

(function() {
    const ENABLE_MODULE = true;   // 设为 false 禁用

    if (!ENABLE_MODULE) {
        console.log('[透镜替换] 模块已禁用');
        return;
    }

    const LENS_COLORS = ['glass','black','red','green','brown','blue','purple','cyan','light_gray','gray','pink','lime','yellow','light_blue','magenta','orange'];

    ServerEvents.recipes(event => {
        const gtr = event.recipes.gtceu;
        let added = 0;

        // 1. 透镜替换为编程电路（递减配置）
        for (let i = 1; i <= LENS_COLORS.length; i++) {
            event.replaceInput(
                r => r.getType() !== 'gtceu:assembly_line' && r.getType() !== 'gtceu:extractor',
                `#kubejs:laser_${i}`,
                Item.of('gtceu:programmed_circuit', `{Configuration:${33-i}}`).strongNBT()
            );
        }
        console.log('[透镜替换] 透镜已替换为编程电路');

        // 2. 维度聚焦刻蚀阵列
        gtr.dimensional_focus_engraving_array("tl_raw_photon_carrying_wafer")
            .itemInputs("kubejs:rutherfordium_neutronium_wafer").circuit(32)
            .inputFluids("gtceu:photoresist 100").itemOutputs("kubejs:raw_photon_carrying_wafer")
            .EUt(GTValues.VA[GTValues.UHV]).duration(1);
        added++;

        gtr.dimensional_focus_engraving_array("tl_prepared_cosmic_soc_wafer")
            .itemInputs("kubejs:taranium_wafer").circuit(31)
            .inputFluids("gtceu:gamma_rays_photoresist 100").itemOutputs("kubejs:prepared_cosmic_soc_wafer")
            .EUt(GTValues.VA[GTValues.UIV]).duration(1);
        added++;

        gtr.dimensional_focus_engraving_array("tl_high_precision_crystal_soc")
            .itemInputs("gtceu:crystal_soc").circuit(30)
            .inputFluids("gtceu:euv_photoresist 100").itemOutputs("kubejs:high_precision_crystal_soc")
            .EUt(GTValues.VA[GTValues.UEV]).duration(1);
        added++;

        gtr.dimensional_focus_engraving_array("tl_nm_wafer")
            .itemInputs("kubejs:rutherfordium_neutronium_wafer").circuit(29)
            .inputFluids("gtceu:photoresist 100").itemOutputs("kubejs:nm_wafer")
            .EUt(GTValues.VA[GTValues.UV]).duration(1);
        added++;

        gtr.dimensional_focus_engraving_array("tl_pm_wafer")
            .itemInputs("kubejs:taranium_wafer").circuit(28)
            .inputFluids("gtceu:euv_photoresist 100").itemOutputs("kubejs:pm_wafer")
            .EUt(GTValues.VA[GTValues.UHV]).duration(1);
        added++;

        gtr.dimensional_focus_engraving_array("tl_fm_wafer")
            .itemInputs("kubejs:pm_wafer").circuit(27)
            .inputFluids("gtceu:gamma_rays_photoresist 100").itemOutputs("kubejs:fm_wafer")
            .EUt(GTValues.VA[GTValues.UEV]).duration(1);
        added++;

        gtr.dimensional_focus_engraving_array("tl_fullerene_dust2")
            .itemInputs("gtceu:unfolded_fullerene_dust").circuit(26)
            .inputFluids("gtceu:euv_photoresist 5").itemOutputs("gtceu:fullerene_dust")
            .duration(1).EUt(7864320);
        added++;

        gtr.dimensional_focus_engraving_array("tl_lanthanum_embedded_fullerene_dust2")
            .itemInputs("2x gtceu:lanthanum_fullerene_mix_dust").circuit(25)
            .inputFluids("gtceu:euv_photoresist 5").itemOutputs("2x gtceu:lanthanum_embedded_fullerene_dust")
            .duration(1).EUt(7864320);
        added++;

        // 3. 精密激光蚀刻机
        gtr.precision_laser_engraver("tl_prepared_cosmic_soc_wafer_ple")
            .itemInputs("kubejs:taranium_wafer").circuit(32)
            .inputFluids("gtceu:gamma_rays_photoresist 1000").itemOutputs("kubejs:prepared_cosmic_soc_wafer")
            .EUt(GTValues.VA[GTValues.UIV]).duration(1);
        added++;

        gtr.precision_laser_engraver("tl_high_precision_crystal_soc_ple")
            .itemInputs("gtceu:crystal_soc").circuit(31)
            .inputFluids("gtceu:euv_photoresist 1000").itemOutputs("kubejs:high_precision_crystal_soc")
            .EUt(GTValues.VA[GTValues.UEV]).duration(1);
        added++;

        gtr.precision_laser_engraver("tl_nm_wafer_ple")
            .itemInputs("kubejs:rutherfordium_neutronium_wafer").circuit(30)
            .inputFluids("gtceu:photoresist 1000").itemOutputs("kubejs:nm_wafer")
            .EUt(GTValues.VA[GTValues.UV]).duration(1);
        added++;

        gtr.precision_laser_engraver("tl_pm_wafer_ple")
            .itemInputs("kubejs:taranium_wafer").circuit(29)
            .inputFluids("gtceu:euv_photoresist 1000").itemOutputs("kubejs:pm_wafer")
            .EUt(GTValues.VA[GTValues.UHV]).duration(1);
        added++;

        gtr.precision_laser_engraver("tl_fm_wafer_ple")
            .itemInputs("kubejs:pm_wafer").circuit(28)
            .itemOutputs("kubejs:fm_wafer")
            .EUt(GTValues.VA[GTValues.UEV]).duration(1);
        added++;

        gtr.precision_laser_engraver("tl_raw_photon_carrying_wafer_ple")
            .itemInputs("kubejs:rutherfordium_neutronium_wafer").circuit(27)
            .inputFluids("gtceu:photoresist 1000").itemOutputs("kubejs:raw_photon_carrying_wafer")
            .EUt(GTValues.VA[GTValues.UHV]).duration(1);
        added++;

        // 4. 普通激光蚀刻机（批量晶圆）
        const waferTypes = ["ilc","ram","lpic","simple_soc","ulpic","cpu","soc","nor_memory","mpic","nand_memory","advanced_soc","highly_advanced_soc"];
        waferTypes.forEach((type, idx) => {
            let circuit = 29 - idx;
            let outputCount = 64;
            if (type === "soc" || type === "nor_memory" || type === "mpic" || type === "nand_memory") outputCount = 32;
            if (type === "advanced_soc") outputCount = 8;
            if (type === "highly_advanced_soc") outputCount = 4;
            gtr.laser_engraver(`tl_${type}_wafer`)
                .itemInputs("kubejs:taranium_wafer").circuit(circuit)
                .itemOutputs(`${outputCount}x gtceu:${type}_wafer`).EUt(122880).duration(1);
            added++;
        });

        gtr.laser_engraver("tl_fullerene_dust")
            .itemInputs("gtceu:unfolded_fullerene_dust").circuit(32)
            .inputFluids("gtceu:nitrogen 10000").itemOutputs("gtceu:fullerene_dust")
            .outputFluids("gtceu:ammonia 10000").EUt(2000000).duration(1);
        added++;

        gtr.laser_engraver("tl_exotic_wafer")
            .circuit(31).itemInputs("gtceu:highly_advanced_soc_wafer")
            .itemOutputs("kubejs:exotic_wafer").EUt(GTValues.VA[GTValues.UHV]).duration(1);
        added++;

        gtr.laser_engraver("tl_diffractor_grating_mirror")
            .itemInputs("kubejs:photocoated_hassium_wafer").circuit(30)
            .itemOutputs("kubejs:diffractor_grating_mirror")
            .EUt(GTValues.VA[GTValues.UIV]).duration(1);
        added++;

        gtr.laser_engraver("tl_lanthanum_embedded_fullerene_dust")
            .itemInputs("2x gtceu:lanthanum_fullerene_mix_dust").circuit(17)
            .inputFluids("gtceu:nitrogen 10000").itemOutputs("2x gtceu:lanthanum_embedded_fullerene_dust")
            .outputFluids("gtceu:ammonia 10000").EUt(1966080).duration(1);
        added++;

        // 5. 纳米锻造
        const nanoSwarmRecipes = [
            { name: "carbon_nanoswarm", circuit: 32, inputs: ["64x gtceu:carbon_block", "64x gtceu:soc"], fluids: ["gtceu:soldering_alloy 20000", "gtceu:lubricant 20000"], tier: 1 },
            { name: "glowstone_nanoswarm", circuit: 31, inputs: ["64x minecraft:glowstone", "64x gtceu:advanced_soc"], fluids: ["gtceu:uu_amplifier 10000", "gtceu:soldering_alloy 20000", "gtceu:lubricant 20000"], tier: 1 },
            { name: "copper_nanoswarm", circuit: 30, inputs: ["8x minecraft:copper_block", "8x gtceu:soc"], fluids: ["gtceu:naquadah 2000", "gtceu:soldering_alloy 10000", "gtceu:bismuth 10000"], tier: 1 },
            { name: "iron_nanoswarm", circuit: 29, inputs: ["8x minecraft:iron_block", "8x gtceu:soc"], fluids: ["gtceu:naquadah 2000", "gtceu:soldering_alloy 10000", "gtceu:bismuth 10000"], tier: 1 },
            { name: "gold_nanoswarm", circuit: 28, inputs: ["8x minecraft:gold_block", "16x gtceu:soc"], fluids: ["gtceu:enriched_naquadah 2000", "gtceu:soldering_alloy 20000", "gtceu:bismuth 20000"], tier: 1 },
            { name: "silver_nanoswarm", circuit: 27, inputs: ["8x gtceu:silver_block", "16x gtceu:soc"], fluids: ["gtceu:enriched_naquadah 2000", "gtceu:soldering_alloy 20000", "gtceu:bismuth 20000"], tier: 1 },
            { name: "iridium_nanoswarm", circuit: 26, inputs: ["8x gtceu:iridium_block", "32x gtceu:soc"], fluids: ["gtceu:naquadria 2000", "gtceu:hafnium 8000", "gtceu:soldering_alloy 20000"], tier: 1 },
            { name: "osmium_nanoswarm", circuit: 25, inputs: ["8x gtceu:osmium_block", "32x gtceu:soc"], fluids: ["gtceu:naquadria 2000", "gtceu:hafnium 8000", "gtceu:soldering_alloy 20000"], tier: 1 },
            { name: "rhenium_nanoswarm", circuit: 24, inputs: ["8x gtceu:rhenium_block", "64x gtceu:soc"], fluids: ["gtceu:naquadria 2000", "gtceu:uu_amplifier 2000", "gtceu:soldering_alloy 20000"], tier: 1 },
            { name: "naquadah_nanoswarm", circuit: 23, inputs: ["8x gtceu:naquadah_block", "16x gtceu:advanced_soc"], fluids: ["gtceu:naquadria 8000", "gtceu:uu_amplifier 2000", "gtceu:mutated_living_solder 20000"], tier: 1 },
            { name: "neutronium_nanoswarm", circuit: 22, inputs: ["8x gtceu:neutronium_block", "64x gtceu:soc", "32x gtceu:advanced_soc"], fluids: ["gtceu:neutronium 4000", "gtceu:uu_amplifier 2000", "gtceu:mutated_living_solder 20000"], tier: 1 },
            { name: "orichalcum_nanoswarm", circuit: 21, inputs: ["8x gtceu:orichalcum_block", "64x gtceu:advanced_soc", "64x gtceu:advanced_soc"], fluids: ["gtceu:neutronium 8000", "gtceu:uu_amplifier 4000", "gtceu:mutated_living_solder 40000"], tier: 1 },
            { name: "enderium_nanoswarm", circuit: 20, inputs: ["8x gtceu:enderium_block", "64x gtceu:advanced_soc", "64x gtceu:advanced_soc"], fluids: ["gtceu:neutronium 8000", "gtceu:uu_amplifier 4000", "gtceu:mutated_living_solder 40000"], tier: 2 },
            { name: "infuscolium_nanoswarm", circuit: 19, inputs: ["8x gtceu:infuscolium_block", "64x gtceu:advanced_soc", "32x gtceu:highly_advanced_soc"], fluids: ["gtceu:neutronium 8000", "gtceu:uu_amplifier 4000", "gtceu:mutated_living_solder 40000"], tier: 2 },
            { name: "uruium_nanoswarm", circuit: 18, inputs: ["8x gtceu:uruium_block", "64x gtceu:advanced_soc", "64x gtceu:highly_advanced_soc"], fluids: ["gtceu:uu_matter 20000", "gtceu:mutated_living_solder 40000", "gtceu:super_mutated_living_solder 40000"], tier: 2 },
            { name: "vibranium_nanoswarm", circuit: 17, inputs: ["8x gtceu:vibranium_block", "64x gtceu:highly_advanced_soc", "64x gtceu:highly_advanced_soc"], fluids: ["gtceu:uu_matter 20000", "gtceu:mutated_living_solder 40000", "gtceu:super_mutated_living_solder 40000"], tier: 2 },
            { name: "starmetal_nanoswarm", circuit: 16, inputs: ["8x gtceu:starmetal_block", "64x gtceu:highly_advanced_soc", "64x gtceu:highly_advanced_soc", "64x gtceu:exquisite_glass_gem", "64x gtceu:exquisite_amethyst_gem"], fluids: ["gtceu:uu_matter 40000", "gtceu:mutated_living_solder 80000", "gtceu:super_mutated_living_solder 80000"], tier: 2 },
            { name: "draconium_nanoswarm", circuit: 15, inputs: ["8x gtceu:draconium_block", "32x gtceu:highly_advanced_soc_wafer", "32x kubejs:optical_ram_wafer", "32x kubejs:optical_soc", "8x kubejs:exotic_processing_core"], fluids: ["gtceu:uu_matter 40000", "gtceu:mutated_living_solder 80000", "gtceu:super_mutated_living_solder 80000"], tier: 2 },
            { name: "cosmicneutronium_nanoswarm", circuit: 14, inputs: ["8x gtceu:cosmicneutronium_block", "32x kubejs:optical_soc", "32x kubejs:exotic_wafer", "16x kubejs:cosmic_ram_wafer", "8x kubejs:cosmic_processing_unit_core"], fluids: ["gtceu:uu_matter 40000", "gtceu:crystalmatrix 40000", "gtceu:liquid_cosmic_mesh 40000"], tier: 3 },
            { name: "white_dwarf_mtter_nanoswarm", circuit: 13, inputs: ["8x gtceu:white_dwarf_mtter_block", "8x kubejs:cosmic_processing_unit_core"], fluids: ["gtceu:uu_matter 40000", "gtceu:neutronium 40000", "gtceu:cosmic_element 40000"], tier: 3 },
            { name: "black_dwarf_mtter_nanoswarm", circuit: 12, inputs: ["8x gtceu:black_dwarf_mtter_block", "8x kubejs:cosmic_processing_unit_core"], fluids: ["gtceu:uu_matter 40000", "gtceu:neutronium 40000", "gtceu:cosmic_element 40000"], tier: 3 },
            { name: "spacetime_nanoswarm", circuit: 11, inputs: ["8x gtceu:spacetime_block", "4x kubejs:eigenfolded_kerr_manifold", "16x kubejs:supracausal_ram_wafer", "8x kubejs:supracausal_processing_core"], fluids: ["gtceu:uu_matter 80000", "gtceu:infinity 40000", "gtceu:temporalfluid 40000"], tier: 3 },
            { name: "transcendentmetal_nanoswarm", circuit: 10, inputs: ["gtceu:rhenium_nanoswarm", "8x gtceu:transcendentmetal_block", "8x kubejs:recursively_folded_negative_space", "#gtceu:circuits/max"], fluids: ["gtceu:uu_matter 80000", "gtceu:raw_star_matter_plasma 40000", "gtceu:spatialfluid 20000"], tier: 3 },
            { name: "eternity_nanoswarm", circuit: 9, inputs: ["gtceu:neutronium_nanoswarm", "8x gtceu:eternity_block", "8x kubejs:ctc_computational_unit"], fluids: ["gtceu:spatialfluid 80000", "gtceu:exciteddtsc 80000", "gtceu:primordialmatter 80000"], tier: 3 }
        ];

        nanoSwarmRecipes.forEach(rec => {
            let builder = gtr.nano_forge(`tl_${rec.name}`).circuit(rec.circuit);
            rec.inputs.forEach(inp => builder.itemInputs(inp));
            rec.fluids.forEach(fl => builder.inputFluids(fl));
            builder.itemOutputs(`gtceu:${rec.name}`).duration(1).EUt(GTValues.VA[GTValues.UV]).addData("nano_forge_tier", rec.tier);
            added++;
        });

        console.log(`[透镜替换] 加载完成，共添加 ${added} 个配方`);
    });

    // 为透镜创建物品标签
    ServerEvents.tags('item', event => {
        LENS_COLORS.forEach((c, i) => {
            let itemId = c === 'glass' ? 'gtceu:glass_lens' : `gtceu:${c}_glass_lens`;
            event.add(`kubejs:laser_${i+1}`, itemId);
        });
        event.add('kubejs:laser_17', 'gtceu:nether_star_lens');
    });
})();