// priority: 96
// GT 配方入口：只维护功能模块的执行顺序，具体配方在对应英文功能文件中。
// 保留原优先级，先执行 GT 配方，再执行整合包补丁，最后进行模具与透镜电路替换。
ServerEvents.recipes(event => {
    global.gtlPack.run(event, [
        "machine_crafting",
        "machine_progression",
        "machine_components",
        "wireless_hatches",
        "machine_structures",
        "coils_and_casings",
        "polymer_materials",
        "trace_metals",
        "advanced_chemistry",
        "exotic_alloys",
        "fullerene_chemistry",
        "hyper_fuels",
        "circuit_materials",
        "void_resources",
        "space_resources",
        "biological_processing",
        "particle_physics",
        "assembly_robots",
        "advanced_circuits",
        "max_components",
        "space_equipment",
        "circuit_boards",
        "quantum_materials",
        "high_energy_processing",
        "petrochemistry",
        "nanotechnology",
        "nuclear_rocket_fuels",
        "component_assembly",
        "ore_processing",
        "trinium_chemistry"
    ]);
});
