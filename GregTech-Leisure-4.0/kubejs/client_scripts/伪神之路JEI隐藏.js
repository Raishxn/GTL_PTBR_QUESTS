// 伪神之路·JEI物品隐藏（客户端启动时执行一次）
// 注意：仅启动时生效，/reload 不会重新触发。动态切换 JEI 可见性需重启客户端。

JEIEvents.hideItems(function(event) {
    var config = JsonIO.read("kubejs/config/godpath.json");
    var enabled = config && config.enabled === true;
    if (enabled) {
        console.log("[Caminho do Falso Deus·JEI] foi aberto, nenhum item escondido");
        return;
    }

    var godItems = [
        "gtlsupb:steam_ore_integrated_hub",
        "gtlsupb:universal_factory",
        "gtlsupb:dimensional_energy_stabilization_hub",
        "gtlsupb:abyssal_chemical_eroder",
        "gtlsupb:rank_derivation_assembly_matrix",
        "gtlsupb:quantum_weaver",
        "gtlsupb:omniversal_eye",
		"gtlsupb:data_maintenance_hatch",
		"gtlsupb:computation_maintenance_hatch",
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
        event.hide(id);
    });
    console.log("[Caminho do Falso Deus·JEI] Itens foram escondidos de JEI");
});