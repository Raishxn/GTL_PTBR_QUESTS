// 伪神之路·物品隐藏（服务端配方移除，/reload 可动态切换）
// JEI物品隐藏请见 client_scripts/伪神之路JEI隐藏.js（仅启动时生效）
ServerEvents.recipes(function(event) {
    var config = JsonIO.read("kubejs/config/godpath.json");
    var enabled = config && config.enabled === true;
    if (enabled) {
        console.log("[Caminho do Falso Deus·Ocultar] foi ativado, a ocultação não será realizada");
        return;
    }
    console.log("[Caminho do Falso Deus Oculto] não foi aberto e a receita foi removida...");

    var godItems = [
        "gtlsupb:steam_ore_integrated_hub",
        "gtlsupb:universal_factory",
        "gtlsupb:dimensional_energy_stabilization_hub",
        "gtlsupb:abyssal_chemical_eroder",
        "gtlsupb:rank_derivation_assembly_matrix",
        "gtlsupb:quantum_weaver",
        "gtlsupb:omniversal_eye",
        "gtlsupb:microcosm_foundry",
        "gtlsupb:electric_assembly_line",
        "gtlsupb:hypercube_core_tower",
        "gtlsupb:genesis_module",
        "gtlsupb:creation_module",
        "gtlsupb:void_module",
        "gtlsupb:eternity_module",
        "gtlsupb:ultimate_steam_boost_hatch",
        "gtlsupb:primitive_stone_furnace",
        "gtlsupb:fragment_world_collector",
        "gtlsupb:mo_wan",
        "gtlsupb:ling_zhu"
    ];

    var voidTiers = ["lv","mv","hv","ev","iv","luv","zpm","uv","uhv","uev","uiv","uxv","opv","max"];
    voidTiers.forEach(function(tier) {
        godItems.push("gtlsupb:" + tier + "_void_energy_absorber");
    });

    godItems.forEach(function(id) {
        event.remove({ output: id });
        event.remove({ input: id });
    });
    console.log("[Caminho do Falso Deus·Oculto] Remoção da receita concluída");
});