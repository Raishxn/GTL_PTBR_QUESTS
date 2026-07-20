(function() {
    let TwistedLine = global.TwistedLine = global.TwistedLine || {};
    let scriptStartTime = Date.now();
    let config;
    try { config = JsonIO.read('kubejs/config/[config]Especial para linha de produção twisters.json'); if (typeof config !== 'object') throw new Error(); }
    catch(e) { config = { enableBlastScript: true, enableSimpleIngotProcessing: true, enableSimpleLineProcessing: true, enableFluidSolidifierAll: true, enableExtractorOverride: true, enableMoldAndSpecialRecipes: true, enableLensReplacement: true, enableTimeAcceleration: true, enableFusionRecipes: true, enableParticleColliderRecipes: true, enableGeneratorRecipes: true, enableCircuitPackRecipes: true, enableFurnaceBlastAcceleration: true, enableComponentPackRecipes: true, enableInfinityCellRecipes: true, enableGTLAdditionsUpgrade: true, enableDistortRecipes: true, enableStellarForgeRecipes: true, enableContentOptimizationRecipes: true, enableFlight: true, enableInvulnerable: true, enableExclusiveContent: true, enableAlloyBlastSmelterRecipes: true, enableSimpleAggregationRecipes: true, enablePlasmaCondenserRecipes: true, enableLogReport: true, enableRecipeStats: true }; }
    for (let k in config) TwistedLine[k] = config[k];
    TwistedLine.blast_config = config;

    function log(msg) { if (TwistedLine.enableLogReport) console.log(msg); }

    log('[Oferta especial para Line Twisters] ⚡ O script de receita especial está carregando...');
    log(`[产线扭曲者特供] 全局启用: ${TwistedLine.enableBlastScript} | 时间加速: ${TwistedLine.enableTimeAcceleration}`);

    const SPEED_TIER = [{name:"Star Core Iniciante",range:3,tip:"⚡ Luz persistente, ressonância primária do espaço-tempo"},{name:"Nebulosa Intermediária",range:6,tip:"⚡ Fluxos de nebulosas, dobras de dimensões intermediárias"},{name:"Galáxia Avançada",range:9,tip:"⚡ Surtos de galáxias, saltos de alto nível no tempo e no espaço"},{name:"Cúpula Estelar Final",range:12,tip:"⚡ O céu estrelado explode e o tempo final é aniquilado"}];
    let OFFSETS = [];
    function initOffsets(r) { OFFSETS = []; for(let x=-r;x<=r;x++) for(let y=-r;y<=r;y++) for(let z=-r;z<=r;z++) OFFSETS.push([x,y,z]); }
    initOffsets(SPEED_TIER[0].range);
    function getRecipeLogicAt(l,p) { try{ return $GTCapabilityHelper.getRecipeLogic(l,p,null); }catch(e){ return null; } }
    function finishMachine(rl) { if(rl && rl.isWorking()) { rl.setProgress(rl.getDuration()); return true; } return false; }
    function buildCellNBT(cn,t,list) { let keys=list.map(id=>`{"#c":"ae2:i",id:"expatternprovider:infinity_cell",tag:{record:{"#c":"ae2:${t}",id:"${id}"}}}`).join(","); return `{RepairCost:0,amts:[L;${list.map(()=>"1L").join(",")}],display:{Name:'${JSON.stringify({text:cn})}'},ic:${list.length}L,internalCurrentPower:20000.0d,keys:[${keys}]}`; }
    function buildCellNBTForItems(cn,items) { return buildCellNBT(cn,'i',items); }
    function buildCellNBTForFluids(cn,fluids) { return buildCellNBT(cn,'f',fluids); }
    var HONGMENG_ITEMS = ["gtceu:white_dwarf_mtter_dust","gtceu:black_dwarf_mtter_dust","ae2:sky_dust","gtceu:trinium_dust","gtceu:plutonium_241_dust","gtceu:titanium_50_dust","gtceu:copper76_dust","gtceu:uranium_235_dust","gtceu:perditio_crystal_dust","gtceu:earth_crystal_dust","gtceu:ignis_crystal_dust","gtceu:tartarite_dust","gtceu:uruium_dust","gtceu:force_dust","gtceu:alien_algae_dust","gtceu:bloodstone_dust","minecraft:netherite_scrap","gtceu:purified_tengam_dust","gtceu:quantanium_dust","gtceu:bedrock_dust","gtceu:damascus_steel_dust","avaritia:neutron_pile","gtceu:certus_quartz_dust","ae2:fluix_dust"];
    var PLASMA_FLUIDS = ["gtceu:argon_plasma","gtceu:heavy_quark_degenerate_matter_plasma","gtceu:echoite_plasma","gtceu:raw_star_matter_plasma","gtceu:legendarium_plasma","gtceu:metastable_hassium_plasma","gtceu:degenerate_rhenium_plasma","gtceu:quark_gluon_plasma","gtceu:celestialtungsten_plasma","gtceu:chaos_plasma","gtceu:starmetal_plasma","gtceu:enderium_plasma","gtceu:oxygen_plasma","gtceu:nitrogen_plasma","gtceu:orichalcum_plasma","gtceu:quasifissioning_plasma","gtceu:vibranium_plasma","gtceu:astraltitanium_plasma","gtceu:cosmic_mesh_plasma","gtceu:taranium_rich_liquid_helium_4_plasma","gtceu:dense_neutron_plasma","gtceu:draconiumawakened_plasma","gtceu:nickel_plasma","gtceu:infuscolium_plasma","gtceu:flyb_plasma","gtceu:high_energy_quark_gluon_plasma","gtceu:quantumchromodynamically_confined_matter_plasma","gtceu:plutonium_241_plasma","gtceu:iron_plasma","gtceu:silver_plasma","gtceu:actinium_superhydride_plasma","gtceu:crystalmatrix_plasma","gtceu:mithril_plasma","gtceu:adamantium_plasma","gtceu:helium_plasma","gtladditions:creon_plasma"];
    var COMPONENT_ITEMS = ["gtceu:lv_electric_motor","gtceu:lv_electric_pump","gtceu:lv_conveyor_module","gtceu:lv_robot_arm","gtceu:lv_electric_piston","gtceu:lv_emitter","gtceu:lv_sensor","gtceu:lv_field_generator","gtceu:mv_electric_motor","gtceu:mv_electric_pump","gtceu:mv_conveyor_module","gtceu:mv_robot_arm","gtceu:mv_electric_piston","gtceu:mv_emitter","gtceu:mv_sensor","gtceu:mv_field_generator","gtceu:hv_electric_motor","gtceu:hv_electric_pump","gtceu:hv_conveyor_module","gtceu:hv_robot_arm","gtceu:hv_electric_piston","gtceu:hv_emitter","gtceu:hv_sensor","gtceu:hv_field_generator","gtceu:ev_electric_motor","gtceu:ev_electric_pump","gtceu:ev_conveyor_module","gtceu:ev_robot_arm","gtceu:ev_electric_piston","gtceu:ev_emitter","gtceu:ev_sensor","gtceu:ev_field_generator","gtceu:iv_electric_motor","gtceu:iv_electric_pump","gtceu:iv_conveyor_module","gtceu:iv_robot_arm","gtceu:iv_electric_piston","gtceu:iv_emitter","gtceu:iv_sensor","gtceu:iv_field_generator","gtceu:luv_electric_motor","gtceu:luv_electric_pump","gtceu:luv_conveyor_module","gtceu:luv_robot_arm","gtceu:luv_electric_piston","gtceu:luv_emitter","gtceu:luv_sensor","gtceu:luv_field_generator","gtceu:zpm_electric_motor","gtceu:zpm_electric_pump","gtceu:zpm_conveyor_module","gtceu:zpm_robot_arm","gtceu:zpm_electric_piston","gtceu:zpm_emitter","gtceu:zpm_sensor","gtceu:zpm_field_generator","gtceu:uv_electric_motor","gtceu:uv_electric_pump","gtceu:uv_conveyor_module","gtceu:uv_robot_arm","gtceu:uv_electric_piston","gtceu:uv_emitter","gtceu:uv_sensor","gtceu:uv_field_generator","gtceu:uhv_electric_motor","gtceu:uhv_electric_pump","gtceu:uhv_conveyor_module","gtceu:uhv_robot_arm","gtceu:uhv_electric_piston","gtceu:uhv_emitter","gtceu:uhv_sensor","gtceu:uhv_field_generator","gtceu:uev_electric_motor","gtceu:uev_electric_pump","gtceu:uev_conveyor_module","gtceu:uev_robot_arm","gtceu:uev_electric_piston","gtceu:uev_emitter","gtceu:uev_sensor","gtceu:uev_field_generator","gtceu:uiv_electric_motor","gtceu:uiv_electric_pump","gtceu:uiv_conveyor_module","gtceu:uiv_robot_arm","gtceu:uiv_electric_piston","gtceu:uiv_emitter","gtceu:uiv_sensor","gtceu:uiv_field_generator","gtceu:uxv_electric_motor","gtceu:uxv_electric_pump","gtceu:uxv_conveyor_module","gtceu:uxv_robot_arm","gtceu:uxv_electric_piston","gtceu:uxv_emitter","gtceu:uxv_sensor","gtceu:uxv_field_generator","gtceu:opv_electric_motor","gtceu:opv_electric_pump","gtceu:opv_conveyor_module","gtceu:opv_robot_arm","gtceu:opv_electric_piston","gtceu:opv_emitter","gtceu:opv_sensor","gtceu:opv_field_generator","gtlcore:max_electric_motor","gtlcore:max_electric_pump","gtlcore:max_conveyor_module","gtlcore:max_robot_arm","gtlcore:max_electric_piston","gtlcore:max_emitter","gtlcore:max_sensor","gtlcore:max_field_generator"];
    const COSMOS_ITEM_IDS = ["gtceu:carbon_dust","gtceu:phosphorus_dust","ae2:fluix_dust","gtceu:certus_quartz_dust","avaritia:neutron_pile","gtceu:damascus_steel_dust","gtceu:bedrock_dust","gtceu:quantanium_dust","gtceu:purified_tengam_dust","minecraft:netherite_scrap","gtceu:bloodstone_dust","gtceu:alien_algae_dust","gtceu:force_dust","gtceu:uruium_dust","gtceu:tartarite_dust","gtceu:ignis_crystal_dust","gtceu:earth_crystal_dust","gtceu:perditio_crystal_dust","gtceu:uranium_235_dust","gtceu:copper76_dust","gtceu:titanium_50_dust","gtceu:plutonium_241_dust","gtceu:trinium_dust","ae2:sky_dust","gtceu:black_dwarf_mtter_dust","gtceu:white_dwarf_mtter_dust","gtceu:sulfur_dust","gtceu:selenium_dust","gtceu:iodine_dust","gtceu:boron_dust","gtceu:silicon_dust","gtceu:germanium_dust","gtceu:arsenic_dust","gtceu:antimony_dust","gtceu:tellurium_dust","gtceu:astatine_dust","gtceu:aluminium_dust","gtceu:gallium_dust","gtceu:indium_dust","gtceu:tin_dust","gtceu:thallium_dust","gtceu:lead_dust","gtceu:bismuth_dust","gtceu:polonium_dust","gtceu:titanium_dust","gtceu:vanadium_dust","gtceu:chromium_dust","gtceu:manganese_dust","gtceu:iron_dust","gtceu:cobalt_dust","gtceu:nickel_dust","gtceu:copper_dust","gtceu:zinc_dust","gtceu:zirconium_dust","gtceu:niobium_dust","gtceu:molybdenum_dust","gtceu:technetium_dust","gtceu:ruthenium_dust","gtceu:rhodium_dust","gtceu:palladium_dust","gtceu:silver_dust","gtceu:cadmium_dust","gtceu:hafnium_dust","gtceu:tantalum_dust","gtceu:tungsten_dust","gtceu:rhenium_dust","gtceu:osmium_dust","gtceu:iridium_dust","gtceu:platinum_dust","gtceu:gold_dust","gtceu:beryllium_dust","gtceu:magnesium_dust","gtceu:calcium_dust","gtceu:strontium_dust","gtceu:barium_dust","gtceu:radium_dust","gtceu:yttrium_dust","gtceu:lithium_dust","gtceu:sodium_dust","gtceu:potassium_dust","gtceu:rubidium_dust","gtceu:caesium_dust","gtceu:francium_dust","gtceu:scandium_dust","gtceu:actinium_dust","gtceu:thorium_dust","gtceu:protactinium_dust","gtceu:uranium_dust","gtceu:neptunium_dust","gtceu:plutonium_dust","gtceu:americium_dust","gtceu:curium_dust","gtceu:berkelium_dust","gtceu:californium_dust","gtceu:einsteinium_dust","gtceu:fermium_dust","gtceu:mendelevium_dust","gtceu:nobelium_dust","gtceu:lawrencium_dust","gtceu:lanthanum_dust","gtceu:cerium_dust","gtceu:praseodymium_dust","gtceu:neodymium_dust","gtceu:promethium_dust","gtceu:samarium_dust","gtceu:europium_dust","gtceu:gadolinium_dust","gtceu:terbium_dust","gtceu:dysprosium_dust","gtceu:holmium_dust","gtceu:erbium_dust","gtceu:thulium_dust","gtceu:ytterbium_dust","gtceu:lutetium_dust","gtceu:rutherfordium_dust","gtceu:dubnium_dust","gtceu:seaborgium_dust","gtceu:bohrium_dust","gtceu:hassium_dust","gtceu:meitnerium_dust","gtceu:darmstadtium_dust","gtceu:roentgenium_dust","gtceu:copernicium_dust","gtceu:nihonium_dust","gtceu:flerovium_dust","gtceu:moscovium_dust","gtceu:livermorium_dust","gtceu:tennessine_dust","gtceu:oganesson_dust","gtceu:jasper_dust","gtceu:naquadah_dust","gtceu:enriched_naquadah_dust","gtceu:naquadria_dust","gtceu:duranium_dust","gtceu:tritanium_dust","gtceu:mithril_dust","gtceu:orichalcum_dust","gtceu:enderium_dust","gtceu:adamantine_dust","gtceu:vibranium_dust","gtceu:infuscolium_dust","gtceu:taranium_dust","gtceu:draconium_dust","gtceu:starmetal_dust","gtceu:exquisite_red_garnet_gem","gtceu:exquisite_blue_topaz_gem","gtceu:exquisite_emerald_gem","gtceu:exquisite_olivine_gem","gtceu:exquisite_yellow_garnet_gem","gtceu:exquisite_certus_quartz_gem","gtceu:exquisite_coal_gem","gtceu:exquisite_quartzite_gem","gtceu:exquisite_grossular_gem","gtceu:exquisite_sodalite_gem","gtceu:exquisite_lazurite_gem","gtceu:exquisite_rock_salt_gem","gtceu:exquisite_lapis_gem","gtceu:exquisite_almandine_gem","gtceu:exquisite_salt_gem","gtceu:exquisite_nether_quartz_gem","gtceu:exquisite_monazite_gem","gtceu:exquisite_pyrope_gem","gtceu:exquisite_spessartine_gem","gtceu:exquisite_apatite_gem","gtceu:exquisite_opal_gem","gtceu:exquisite_ruby_gem","gtceu:exquisite_green_sapphire_gem","gtceu:exquisite_realgar_gem","gtceu:exquisite_cinnabar_gem","gtceu:exquisite_jasper_gem","gtceu:exquisite_malachite_gem","gtceu:exquisite_diamond_gem","gtceu:exquisite_sapphire_gem","gtceu:exquisite_amethyst_gem","gtceu:exquisite_topaz_gem","gtceu:flawless_spessartine_gem","gtceu:flawless_quartzite_gem","gtceu:flawless_nether_quartz_gem","gtceu:flawless_certus_quartz_gem","gtceu:flawless_red_garnet_gem","gtceu:flawless_sodalite_gem","gtceu:flawless_monazite_gem","gtceu:flawless_salt_gem","gtceu:flawless_apatite_gem","gtceu:flawless_almandine_gem","gtceu:flawless_coal_gem","gtceu:flawless_lazurite_gem","gtceu:flawless_pyrope_gem","gtceu:flawless_rock_salt_gem","gtceu:flawless_grossular_gem","gtceu:flawless_opal_gem","gtceu:flawless_amethyst_gem","gtceu:flawless_topaz_gem","gtceu:flawless_jasper_gem","gtceu:flawless_malachite_gem","gtceu:flawless_cinnabar_gem","gtceu:flawless_ruby_gem","gtceu:flawless_green_sapphire_gem","gtceu:flawless_sapphire_gem","gtceu:flawless_diamond_gem","gtceu:flawless_realgar_gem","gtceu:flawless_lapis_gem","gtceu:flawless_yellow_garnet_gem","gtceu:flawless_olivine_gem","gtceu:flawless_emerald_gem","gtceu:flawless_blue_topaz_gem","gtceu:pyrope_gem","gtceu:realgar_gem","minecraft:lapis_lazuli","gtceu:topaz_gem","gtceu:yellow_garnet_gem","minecraft:quartz","gtceu:malachite_gem","gtceu:rock_salt_gem","gtceu:sodalite_gem","gtceu:cinnabar_gem","gtceu:olivine_gem","minecraft:coal","gtceu:monazite_gem","gtceu:opal_gem","gtceu:salt_gem","gtceu:quartzite_gem","gtceu:jasper_gem","gtceu:apatite_gem","minecraft:amethyst_shard","gtceu:ruby_gem","gtceu:red_garnet_gem","minecraft:emerald","gtceu:green_sapphire_gem","gtceu:sapphire_gem","gtceu:lazurite_gem","gtceu:blue_topaz_gem","gtceu:certus_quartz_gem","gtceu:andradite_gem","gtceu:grossular_gem","minecraft:diamond","gtceu:almandine_gem","gtceu:spessartine_gem","gtceu:silicon_dioxide_dust","gtceu:mica_dust","gtceu:trinium_compound_dust","gtceu:trona_dust","gtceu:celestine_dust","gtceu:malachite_dust","gtceu:endstone_dust","gtceu:ender_pearl_dust","gtceu:cinnabar_dust","gtceu:olivine_dust","gtceu:bastnasite_dust","gtceu:cobalt_oxide_dust","gtceu:pitchblende_dust","gtceu:zeolite_dust","gtceu:oilsands_dust","gtceu:infused_gold_dust","gtceu:uraninite_dust","gtceu:alunite_dust","gtceu:galena_dust","gtceu:sodalite_dust","gtceu:calcite_dust","gtceu:bornite_dust","gtceu:desh_dust","gtceu:rock_salt_dust","gtceu:antimony_trioxide_dust","gtceu:nether_quartz_dust","gtceu:rare_earth_dust","gtceu:rare_earth_metal_dust","gtceu:adamantine_compounds_dust","gtceu:amethyst_dust","gtceu:ostrum_dust","gtceu:ruby_dust","gtceu:red_garnet_dust","minecraft:redstone","gtceu:electrotine_dust","gtceu:lazurite_dust","gtceu:blue_topaz_dust","gtceu:cooperite_dust","gtceu:hematite_dust","gtceu:pyrolusite_dust","gtceu:cobaltite_dust","gtceu:molybdenite_dust","gtceu:chalcocite_dust","gtceu:stibnite_dust","gtceu:kyanite_dust","gtceu:sapphire_dust","gtceu:magnesite_dust","minecraft:glowstone_dust","gtceu:granitic_mineral_sand_dust","gtceu:bentonite_dust","gtceu:calorite_dust","gtceu:green_sapphire_dust","gtceu:emerald_dust","gtceu:paper_dust","gtceu:soda_ash_dust","gtceu:zincite_dust","gtceu:apatite_dust","gtceu:tricalcium_phosphate_dust","gtceu:phosphate_dust","gtceu:goethite_dust","gtceu:samarium_refined_powder_dust","gtceu:vanadium_magnetite_dust","gtceu:andradite_dust","gtceu:powellite_dust","gtceu:wulfenite_dust","gtceu:tantalite_dust","gtceu:massicot_dust","gtceu:diamond_dust","gtceu:tungstate_dust","gtceu:ilmenite_dust","gtceu:uvarovite_dust","gtceu:grossular_dust","gtceu:barite_dust","gtceu:rutile_dust","gtceu:bauxite_dust","gtceu:chromite_dust","gtceu:pollucite_dust","gtceu:spessartine_dust","gtceu:pyrope_dust","gtceu:pentlandite_dust","gtceu:sphalerite_dust","gtceu:realgar_dust","gtceu:cassiterite_dust","gtceu:cassiterite_sand_dust","gtceu:spodumene_dust","gtceu:lepidolite_dust","gtceu:lapis_dust","gtceu:topaz_dust","gtceu:yellow_garnet_dust","gtceu:yellow_limonite_dust","gtceu:pyrite_dust","gtceu:chalcopyrite_dust","gtceu:clay_dust","gtceu:tetrahedrite_dust","gtceu:raw_tengam_dust","gtceu:platinum_group_sludge_dust","gtceu:echo_shard_dust","kubejs:dust_cryotheum"];
    const COSMOS_FLUID_IDS = ["gtceu:spacetime","gtceu:raw_star_matter_plasma","gtceu:quark_gluon_plasma","gtceu:heavy_quark_degenerate_matter_plasma","gtceu:neutronium","gtceu:heavy_lepton_mixture","gtceu:hydrogen","gtceu:nitrogen","gtceu:oxygen","gtceu:fluorine","gtceu:chlorine","gtceu:bromine","gtceu:helium","gtceu:neon","gtceu:argon","gtceu:krypton","gtceu:xenon","gtceu:radon","gtceu:mercury","gtceu:deuterium","gtceu:tritium","gtceu:helium_3","gtceu:unknowwater","gtceu:uu_matter","gtceu:argon_plasma","gtceu:echoite_plasma","gtceu:legendarium_plasma","gtceu:metastable_hassium_plasma","gtceu:degenerate_rhenium_plasma","gtceu:celestialtungsten_plasma","gtceu:chaos_plasma","gtceu:starmetal_plasma","gtceu:enderium_plasma","gtceu:oxygen_plasma","gtceu:nitrogen_plasma","gtceu:orichalcum_plasma","gtceu:quasifissioning_plasma","gtceu:vibranium_plasma","gtceu:astraltitanium_plasma","gtceu:cosmic_mesh_plasma","gtceu:taranium_rich_liquid_helium_4_plasma","gtceu:dense_neutron_plasma","gtceu:draconiumawakened_plasma","gtceu:nickel_plasma","gtceu:infuscolium_plasma","gtceu:flyb_plasma","gtceu:high_energy_quark_gluon_plasma","gtceu:quantumchromodynamically_confined_matter_plasma","gtceu:plutonium_241_plasma","gtceu:iron_plasma","gtceu:silver_plasma","gtceu:actinium_superhydride_plasma","gtceu:crystalmatrix_plasma","gtceu:mithril_plasma","gtceu:adamantium_plasma","gtceu:helium_plasma","gtceu:mana","gtceu:metastable_oganesson","gtceu:naphthalene","gtceu:hydrogen_sulfide","gtceu:creosote","gtceu:phenol","gtceu:carbon_dioxide","gtceu:ammonia","gtceu:ethylbenzene","gtceu:methane","gtceu:methanol","gtceu:acetic_acid","gtceu:ethanol","gtceu:mana"];
    const allDimensionFluids = ['gtceu:salt_water','gtceu:natural_gas','gtceu:oil_medium','gtceu:oil_light','gtceu:oil_heavy','gtceu:oil','gtceu:helium_3','gtceu:helium','gtceu:radon','minecraft:lava','gtceu:sulfuric_acid','gtceu:deuterium','gtceu:neon','gtceu:xenon','gtceu:krypton','gtceu:hydrochloric_acid','gtceu:coal_gas','gtceu:methane','gtceu:benzene','gtceu:charcoal_byproducts','gtceu:chlorine','gtceu:fluorine','gtceu:nitric_acid','gtceu:unknowwater','gtceu:air','gtceu:liquid_air','gtceu:nether_air','gtceu:liquid_nether_air','gtceu:ender_air','gtceu:liquid_ender_air','gtceu:hydrogen','gtceu:nitrogen','gtceu:oxygen','gtceu:bromine','gtceu:argon','gtceu:mercury','gtceu:tritium','gtceu:barnarda_air','gtceu:sulfur_dioxide','gtceu:carbon_dioxide','gtceu:nitrogen_dioxide','gtceu:ammonia','gtceu:carbon_monoxide','gtceu:steam','gtceu:heavy_fuel','gtceu:light_fuel','gtceu:naphtha','gtceu:refinery_gas'];
    const allRawOres = ['minecraft:raw_copper','minecraft:raw_gold','minecraft:raw_iron','gtceu:raw_almandine','gtceu:raw_aluminium','gtceu:raw_alunite','gtceu:raw_amethyst','gtceu:raw_apatite','gtceu:raw_asbestos','gtceu:raw_barite','gtceu:raw_basaltic_mineral_sand','gtceu:raw_bastnasite','gtceu:raw_bauxite','gtceu:raw_bentonite','gtceu:raw_beryllium','gtceu:raw_blue_topaz','gtceu:raw_bornite','gtceu:raw_calcite','gtceu:raw_calorite','gtceu:raw_cassiterite','gtceu:raw_cassiterite_sand','gtceu:raw_celestine','gtceu:raw_certus_quartz','gtceu:raw_chalcopyrite','gtceu:raw_chalcocite','gtceu:raw_chromite','gtceu:raw_cinnabar','gtceu:raw_coal','gtceu:raw_cobalt','gtceu:raw_cobaltite','gtceu:raw_cooperite','gtceu:raw_desh','gtceu:raw_diamond','gtceu:raw_diatomite','gtceu:raw_electrotine','gtceu:raw_emerald','gtceu:raw_fullers_earth','gtceu:raw_galena','gtceu:raw_garnet_sand','gtceu:raw_garnierite','gtceu:raw_glauconite_sand','gtceu:raw_goethite','gtceu:raw_granitic_mineral_sand','gtceu:raw_graphite','gtceu:raw_green_sapphire','gtceu:raw_grossular','gtceu:raw_gypsum','gtceu:raw_hematite','gtceu:raw_ilmenite','gtceu:raw_kyanite','gtceu:raw_lapis','gtceu:raw_lazurite','gtceu:raw_lead','gtceu:raw_lepidolite','gtceu:raw_lithium','gtceu:raw_magnesite','gtceu:raw_magnetite','gtceu:raw_malachite','gtceu:raw_mica','gtceu:raw_molybdenite','gtceu:raw_molybdenum','gtceu:raw_monazite','gtceu:raw_naquadah','gtceu:raw_neodymium','gtceu:raw_nether_quartz','gtceu:raw_nickel','gtceu:raw_oilsands','gtceu:raw_olivine','gtceu:raw_opal','gtceu:raw_ostrum','gtceu:raw_palladium','gtceu:raw_pentlandite','gtceu:raw_pitchblende','gtceu:raw_platinum','gtceu:raw_plutonium','gtceu:raw_pollucite','gtceu:raw_powellite','gtceu:raw_pyrite','gtceu:raw_pyrochlore','gtceu:raw_pyrolusite','gtceu:raw_pyrope','gtceu:raw_quartzite','gtceu:raw_realgar','gtceu:raw_red_garnet','gtceu:raw_redstone','gtceu:raw_rock_salt','gtceu:raw_ruby','gtceu:raw_salt','gtceu:raw_saltpeter','gtceu:raw_sapphire','gtceu:raw_scheelite','gtceu:raw_silver','gtceu:raw_soapstone','gtceu:raw_sodalite','gtceu:raw_spessartine','gtceu:raw_sphalerite','gtceu:raw_spodumene','gtceu:raw_stibnite','gtceu:raw_sulfur','gtceu:raw_talc','gtceu:raw_tantalite','gtceu:raw_tetrahedrite','gtceu:raw_thorium','gtceu:raw_tin','gtceu:raw_topaz','gtceu:raw_tricalcium_phosphate','gtceu:raw_trona','gtceu:raw_tungstate','gtceu:raw_uraninite','gtceu:raw_vanadium_magnetite','gtceu:raw_wulfenite','gtceu:raw_yellow_garnet','gtceu:raw_yellow_limonite','gtceu:raw_zeolite','gtceu:raw_zircon'];
    const QIONGYU_TIERS = ["ulv","lv","mv","hv","ev","iv","luv","zpm","uv","uhv","uev","uiv","uxv","opv","max"];
    const QIONGYU_CIRCUIT_OUTPUTS = QIONGYU_TIERS.map(t=>`2147483647x assembly_line_distorter:assembly_line_distorter_circuits_${t}`);
    const ALLOY_BLAST_RECIPES = [["converted_hastelloyk_243",["5x gtceu:hastelloyx_78_dust","2x gtceu:niobium_nitride_dust","4x gtceu:tritanium_dust","4x gtceu:tungsten_carbide_dust","1x gtceu:promethium_dust","1x gtceu:mendelevium_dust","1x gtceu:praseodymium_dust","1x gtceu:holmium_dust"],null,8,"gtceu:hastelloyk_243 2736",125829120,17200],["converted_naquadriatictaranium",["1x gtceu:naquadria_dust","1x gtceu:taranium_dust"],null,2,"gtceu:naquadriatictaranium 288",125829120,16200],["converted_titanium_tungsten_carbide",["2x gtceu:titanium_carbide_dust","1x gtceu:tungsten_carbide_dust"],null,2,"gtceu:titanium_tungsten_carbide 432",1920,3800],["converted_black_steel",["1x gtceu:nickel_dust","1x gtceu:black_bronze_dust","3x gtceu:steel_dust"],null,3,"gtceu:black_steel 720",120,1200],["converted_naquadah_alloy",["2x gtceu:naquadah_dust","1x gtceu:osmiridium_dust","1x gtceu:trinium_dust"],null,3,"gtceu:naquadah_alloy 576",30720,7200],["converted_fluxed_electrum",["1x gtceu:soldering_alloy_dust","1x gtceu:infused_gold_dust","1x gtceu:naquadah_dust","1x gtceu:astral_silver_dust","1x gtceu:red_steel_dust","1x gtceu:blue_steel_dust","1x gtceu:sterling_silver_dust","1x gtceu:rose_gold_dust"],null,8,"gtceu:fluxed_electrum 1152",1920,10400],["converted_molybdenum_disilicide",["1x gtceu:molybdenum_dust","2x gtceu:silicon_dust"],null,2,"gtceu:molybdenum_disilicide 432",1920,2300],["converted_vibramantium",["1x gtceu:vibranium_dust","3x gtceu:adamantium_dust"],null,2,"gtceu:vibramantium 576",125829120,18800],["converted_red_alloy",["1x gtceu:copper_dust","4x minecraft:redstone"],null,5,"gtceu:red_alloy 144",16,1400],["converted_niobium_nitride",["1x gtceu:niobium_dust"],["gtceu:nitrogen 1000"],1,"gtceu:niobium_nitride 288",120,2846],["converted_electrum",["1x gtceu:gold_dust","1x gtceu:silver_dust"],null,2,"gtceu:electrum 288",16,1285],["converted_lafium",["8x gtceu:hastelloy_n_dust","4x gtceu:naquadah_dust","2x gtceu:samarium_dust","4x gtceu:tungsten_dust","6x gtceu:aluminium_dust","2x gtceu:nickel_dust","2x gtceu:carbon_dust"],null,7,"gtceu:lafium 4032",1920,9865],["converted_bismuth_bronze",["1x gtceu:bismuth_dust","1x gtceu:zinc_dust","3x gtceu:copper_dust"],null,3,"gtceu:bismuth_bronze 720",120,1100],["converted_mercury_barium_calcium_cuprate",["2x gtceu:barium_dust","2x gtceu:calcium_dust","3x gtceu:copper_dust"],["gtceu:mercury 1000","gtceu:oxygen 8000"],5,"gtceu:mercury_barium_calcium_cuprate 2304",480,3300],["converted_ruthenium_trinium_americium_neutronate",["1x gtceu:ruthenium_dust","2x gtceu:trinium_dust","1x gtceu:americium_dust","2x gtceu:neutronium_dust"],["gtceu:oxygen 8000"],5,"gtceu:ruthenium_trinium_americium_neutronate 2016",120,10800],["converted_niobium_titanium",["1x gtceu:niobium_dust","1x gtceu:titanium_dust"],null,2,"gtceu:niobium_titanium 288",480,4500],["converted_magnesium_diboride",["1x gtceu:magnesium_dust","2x gtceu:boron_dust"],null,2,"gtceu:magnesium_diboride 432",480,2500],["converted_germaniumtungstennitride",["3x gtceu:germanium_dust","3x gtceu:tungsten_dust"],["gtceu:nitrogen 10000"],3,"gtceu:germaniumtungstennitride 2304",30720,8200],["converted_ultimet",["5x gtceu:cobalt_dust","2x gtceu:chromium_dust","1x gtceu:nickel_dust","1x gtceu:molybdenum_dust"],null,4,"gtceu:ultimet 1296",480,2700],["converted_hsla_steel",["2x gtceu:invar_dust","1x gtceu:vanadium_dust","1x gtceu:titanium_dust","1x gtceu:molybdenum_dust"],null,4,"gtceu:hsla_steel 720",480,1711],["converted_vanadium_steel",["1x gtceu:vanadium_dust","1x gtceu:chromium_dust","7x gtceu:steel_dust"],null,3,"gtceu:vanadium_steel 1296",120,1453],["converted_brass",["3x gtceu:copper_dust","1x gtceu:zinc_dust"],null,4,"gtceu:brass 576",16,1160],["converted_vibrant_alloy",["1x gtceu:energetic_alloy_dust","1x gtceu:ender_pearl_dust"],null,2,"gtceu:vibrant_alloy 288",480,2375],["converted_rtm_alloy",["4x gtceu:ruthenium_dust","2x gtceu:tungsten_dust","1x gtceu:molybdenum_dust"],null,3,"gtceu:rtm_alloy 1008",1920,3000],["converted_trinium_titanium",["2x gtceu:trinium_dust","1x gtceu:titanium_dust"],null,2,"gtceu:trinium_titanium 432",31457280,14400],["converted_superheavy_h_alloy",["1x gtceu:copernicium_dust","1x gtceu:nihonium_dust","1x gtceu:flerovium_dust","1x gtceu:moscovium_dust","1x gtceu:livermorium_dust","1x gtceu:tennessine_dust","1x gtceu:oganesson_dust"],null,7,"gtceu:superheavy_h_alloy 1008",120,10600],["converted_rose_gold",["1x gtceu:copper_dust","4x gtceu:gold_dust"],null,2,"gtceu:rose_gold 720",120,1600],["converted_potin",["6x gtceu:copper_dust","2x gtceu:tin_dust","1x gtceu:lead_dust"],null,9,"gtceu:potin 1296",16,1084],["converted_samarium_iron_arsenic_oxide",["1x gtceu:samarium_dust","1x gtceu:iron_dust","1x gtceu:arsenic_dust"],["gtceu:oxygen 1000"],4,"gtceu:samarium_iron_arsenic_oxide 576",1920,5200],["converted_hastelloyx_78",["10x gtceu:naquadah_alloy_dust","5x gtceu:rhenium_dust","4x gtceu:naquadria_dust","4x gtceu:tritanium_dust","1x gtceu:tungsten_carbide_dust","1x gtceu:promethium_dust","1x gtceu:mendelevium_dust","1x gtceu:praseodymium_dust"],null,8,"gtceu:hastelloyx_78 3888",7864320,14400],["converted_manganese_phosphide",["1x gtceu:manganese_dust","1x gtceu:phosphorus_dust"],null,2,"gtceu:manganese_phosphide 288",120,1200],["converted_hikarium",["18x gtceu:lumiium_dust","8x gtceu:silver_dust","4x gtceu:sunnarium_dust"],null,3,"gtceu:hikarium 4320",1966080,17800],["converted_rhodium_plated_palladium",["3x gtceu:palladium_dust","1x gtceu:rhodium_dust"],null,2,"gtceu:rhodium_plated_palladium 576",7680,4500],["converted_pikyonium",["8x gtceu:inconel_792_dust","5x gtceu:eglin_steel_dust","4x gtceu:enriched_naquadah_dust","3x gtceu:cerium_dust","2x gtceu:antimony_dust","2x gtceu:platinum_dust","1x gtceu:ytterbium_dust","4x gtceu:tungsten_steel_dust"],null,8,"gtceu:pikyonium 4176",122880,10400],["converted_gallium_arsenide",["1x gtceu:arsenic_dust","1x gtceu:gallium_dust"],null,2,"gtceu:gallium_arsenide 288",120,1200],["converted_hsss",["6x gtceu:hssg_dust","2x gtceu:iridium_dust","1x gtceu:osmium_dust"],null,3,"gtceu:hsss 1296",1920,5000],["converted_hsse",["6x gtceu:hssg_dust","1x gtceu:cobalt_dust","1x gtceu:manganese_dust","1x gtceu:silicon_dust"],null,4,"gtceu:hsse 1296",1920,5000],["converted_hssg",["5x gtceu:tungsten_steel_dust","1x gtceu:chromium_dust","2x gtceu:molybdenum_dust","1x gtceu:vanadium_dust"],null,4,"gtceu:hssg 1296",1920,4200],["converted_tin_alloy",["1x gtceu:iron_dust","1x gtceu:tin_dust"],null,2,"gtceu:tin_alloy 288",16,1258],["converted_blue_alloy",["1x gtceu:silver_dust","4x gtceu:electrotine_dust"],null,5,"gtceu:blue_alloy 144",16,1400],["converted_cobalt_brass",["7x gtceu:brass_dust","1x gtceu:aluminium_dust","1x gtceu:cobalt_dust"],null,9,"gtceu:cobalt_brass 1296",16,1202],["converted_stainless_steel",["6x gtceu:iron_dust","1x gtceu:chromium_dust","1x gtceu:manganese_dust","1x gtceu:nickel_dust"],null,4,"gtceu:stainless_steel 1296",480,1700],["converted_uranium_rhodium_dinaquadide",["1x gtceu:uranium_dust","1x gtceu:rhodium_dust","2x gtceu:naquadah_dust"],null,3,"gtceu:uranium_rhodium_dinaquadide 576",7680,9000],["converted_enriched_naquadah_trinium_europium_duranide",["4x gtceu:enriched_naquadah_dust","3x gtceu:trinium_dust","2x gtceu:europium_dust","1x gtceu:duranium_dust"],null,4,"gtceu:enriched_naquadah_trinium_europium_duranide 1440",30720,9900],["converted_tantalloy_61",["13x gtceu:tantalum_dust","12x gtceu:tungsten_dust","6x gtceu:titanium_dust","4x gtceu:yttrium_dust"],null,4,"gtceu:tantalloy_61 5040",30720,6900],["converted_woods_glass",["6x gtceu:soda_ash_dust","3x gtceu:silicon_dioxide_dust","3x gtceu:garnierite_dust","1x gtceu:barium_sulfide_dust"],null,4,"gtceu:woods_glass 1872",120,3600],["converted_highurabilityompoundteel",["12x gtceu:tungsten_steel_dust","9x gtceu:hsss_dust","6x gtceu:hssg_dust","3x gtceu:ruridit_dust","2x gtceu:magneto_resonatic_dust","1x gtceu:plutonium_dust"],null,6,"gtceu:highurabilityompoundteel 4752",491520,12600],["converted_borosilicate_glass",["7x gtceu:glass_dust","1x gtceu:boron_dust"],null,8,"gtceu:borosilicate_glass 1152",16,1921],["converted_sterling_silver",["1x gtceu:copper_dust","4x gtceu:silver_dust"],null,2,"gtceu:sterling_silver 720",120,1700],["converted_maraging_steel_300",["16x gtceu:iron_dust","1x gtceu:titanium_dust","1x gtceu:aluminium_dust","4x gtceu:nickel_dust","2x gtceu:cobalt_dust"],null,5,"gtceu:maraging_steel_300 3456",1920,4000],["converted_cupronickel",["1x gtceu:copper_dust","1x gtceu:nickel_dust"],null,2,"gtceu:cupronickel 288",16,1542],["converted_tantalum_carbide",["1x gtceu:tantalum_dust","1x gtceu:carbon_dust"],null,2,"gtceu:tantalum_carbide 288",1920,4120],["converted_indalloy_140",["47x gtceu:bismuth_dust","25x gtceu:lead_dust","13x gtceu:tin_dust","10x gtceu:cadmium_dust","5x gtceu:indium_dust"],null,5,"gtceu:indalloy_140 14400",1920,2600],["converted_fall_king",["1x gtceu:lithium_dust","1x gtceu:cobalt_dust","1x gtceu:platinum_dust","1x gtceu:erbium_dust"],["gtceu:helium 1000"],5,"gtceu:fall_king 720",120,5400],["converted_proto_halkonite",["4x gtceu:transcendentmetal_dust","4x gtceu:tairitsu_dust","4x gtceu:tartarite_dust","2x gtceu:titan_precision_steel_dust","2x gtceu:eternity_dust"],["gtceu:dimensionallytranscendentresidue 576"],null,"gtladditions:proto_halkonite 1152",503320000,48000],["converted_black_titanium",["26x gtceu:titanium_dust","6x gtceu:lanthanum_dust","4x gtceu:tungsten_dust","3x gtceu:cobalt_dust","2x gtceu:manganese_dust","2x gtceu:phosphorus_dust","2x gtceu:palladium_dust","1x gtceu:niobium_dust"],["gtceu:argon 5000"],9,"gtceu:black_titanium 7344",125829120,18900],["converted_red_steel",["1x gtceu:sterling_silver_dust","1x gtceu:bismuth_bronze_dust","2x gtceu:steel_dust","4x gtceu:black_steel_dust"],null,4,"gtceu:red_steel 1152",480,1300],["converted_hastelloy_c_276",["12x gtceu:nickel_dust","8x gtceu:molybdenum_dust","7x gtceu:chromium_dust","1x gtceu:tungsten_dust","1x gtceu:cobalt_dust","1x gtceu:copper_dust"],null,6,"gtceu:hastelloy_c_276 4320",1920,3800],["converted_titanium_carbide",["1x gtceu:titanium_dust","1x gtceu:carbon_dust"],null,2,"gtceu:titanium_carbide 288",1920,3430],["converted_mar_m_200_steel",["2x gtceu:niobium_dust","9x gtceu:chromium_dust","5x gtceu:aluminium_dust","2x gtceu:titanium_dust","10x gtceu:cobalt_dust","13x gtceu:tungsten_dust","18x gtceu:nickel_dust"],null,7,"gtceu:mar_m_200_steel 8496",7680,4600],["converted_bronze",["3x gtceu:copper_dust","1x gtceu:tin_dust"],null,4,"gtceu:bronze 576",16,1357],["converted_silicon_carbide",["1x gtceu:silicon_dust","1x gtceu:carbon_dust"],null,2,"gtceu:silicon_carbide 288",480,4800],["converted_tairitsu",["8x gtceu:tungsten_dust","7x gtceu:naquadria_dust","4x gtceu:trinium_dust","4x gtceu:carbon_dust","3x gtceu:vanadium_dust","1x gtceu:plutonium_dust"],null,6,"gtceu:tairitsu 3888",122880,12100],["converted_indium_tin_barium_titanium_cuprate",["4x gtceu:indium_dust","2x gtceu:tin_dust","2x gtceu:barium_dust","1x gtceu:titanium_dust","7x gtceu:copper_dust"],["gtceu:oxygen 14000"],6,"gtceu:indium_tin_barium_titanium_cuprate 2304",7680,6000],["converted_yttrium_barium_cuprate",["1x gtceu:yttrium_dust","2x gtceu:barium_dust","3x gtceu:copper_dust"],["gtceu:oxygen 7000"],4,"gtceu:yttrium_barium_cuprate 1872",120,4500],["converted_stellite",["9x gtceu:cobalt_dust","9x gtceu:chromium_dust","5x gtceu:manganese_dust","2x gtceu:titanium_dust"],null,4,"gtceu:stellite 3600",1920,4310],["converted_lumiium",["2x gtceu:sterling_silver_dust","4x gtceu:tin_alloy_dust","2x gtceu:luminessence_dust"],null,3,"gtceu:lumiium 1152",120,5400],["converted_artherium_sn",["12x gtceu:tin_dust","7x gtceu:actinium_dust","5x gtceu:enriched_naquadah_trinium_europium_duranide_dust","4x gtceu:caesium_dust","3x gtceu:osmiridium_dust"],null,5,"gtceu:artherium_sn 4464",7680,9800],["converted_energetic_alloy",["2x gtceu:gold_dust","1x minecraft:redstone","1x minecraft:glowstone_dust"],null,3,"gtceu:energetic_alloy 576",120,1650],["converted_soldering_alloy",["6x gtceu:tin_dust","3x gtceu:lead_dust","1x gtceu:antimony_dust"],null,10,"gtceu:soldering_alloy 1440",16,544],["converted_rareearth",["1x gtceu:scandium_dust","1x gtceu:yttrium_dust","1x gtceu:lanthanoids_1_dust","1x gtceu:lanthanoids_2_dust"],null,4,"gtceu:rareearth 576",1966080,12400],["converted_aluminium_bronze",["1x gtceu:aluminium_dust","6x gtceu:bronze_dust"],null,2,"gtceu:aluminium_bronze 1008",120,1200],["converted_tungsten_steel",["1x gtceu:steel_dust","1x gtceu:tungsten_dust"],null,2,"gtceu:tungsten_steel 288",1920,3000],["converted_zeron_100",["10x gtceu:iron_dust","2x gtceu:nickel_dust","2x gtceu:tungsten_dust","1x gtceu:niobium_dust","1x gtceu:cobalt_dust"],null,5,"gtceu:zeron_100 2304",1920,3693],["converted_dalisenite",["3x gtceu:erbium_dust","10x gtceu:tungsten_dust","1x gtceu:naquadah_dust","9x gtceu:niobium_titanium_dust","7x gtceu:quantanium_dust","14x gtceu:rhodium_plated_palladium_dust","1x gtceu:tanmolyium_dust"],null,7,"gtceu:dalisenite 6480",7680,12400],["converted_nickel_zinc_ferrite",["1x gtceu:nickel_dust","1x gtceu:zinc_dust","4x gtceu:iron_dust"],["gtceu:oxygen 8000"],6,"gtceu:nickel_zinc_ferrite 864",120,1500],["converted_incoloy_ma_956",["4x gtceu:vanadium_steel_dust","2x gtceu:manganese_dust","5x gtceu:aluminium_dust","2x gtceu:yttrium_dust"],null,4,"gtceu:incoloy_ma_956 1872",1920,3652],["converted_osmiridium",["3x gtceu:iridium_dust","1x gtceu:osmium_dust"],null,2,"gtceu:osmiridium 576",30720,4500],["converted_battery_alloy",["4x gtceu:lead_dust","1x gtceu:antimony_dust"],null,5,"gtceu:battery_alloy 720",16,660],["converted_eglin_steel",["4x gtceu:iron_dust","1x gtceu:kanthal_dust","5x gtceu:invar_dust","1x gtceu:sulfur_dust","1x gtceu:silicon_dust","1x gtceu:carbon_dust"],null,6,"gtceu:eglin_steel 1872",120,1048],["converted_superheavy_l_alloy",["1x gtceu:rutherfordium_dust","1x gtceu:dubnium_dust","1x gtceu:seaborgium_dust","1x gtceu:bohrium_dust","1x gtceu:hassium_dust","1x gtceu:meitnerium_dust","1x gtceu:darmstadtium_dust","1x gtceu:roentgenium_dust"],null,8,"gtceu:superheavy_l_alloy 1152",120,10600],["converted_abyssalalloy",["5x gtceu:stainless_steel_dust","5x gtceu:tungsten_carbide_dust","5x gtceu:nichrome_dust","5x gtceu:bronze_dust","5x gtceu:incoloy_ma_956_dust","1x gtceu:iodine_dust","1x gtceu:germanium_dust","1x gtceu:hafnium_dust"],["gtceu:radon 1000","gtceu:barnarda_air 1000"],10,"gtceu:abyssalalloy 4320",491520,10800],["converted_stellite_100",["4x gtceu:iron_dust","3x gtceu:chromium_dust","2x gtceu:tungsten_dust","1x gtceu:molybdenum_dust"],null,4,"gtceu:stellite_100 1440",1920,3790],["converted_titansteel",["4x gtceu:titanium_tungsten_carbide_dust","1x gtceu:plutonium_241_dust","2x gtceu:einsteinium_dust","1x gtceu:rhenium_dust","1x gtceu:erbium_dust","3x gtceu:jasper_dust"],["gtceu:uu_amplifier 1000"],7,"gtceu:titansteel 1872",1966080,12600],["converted_cinobite",["8x gtceu:zeron_100_dust","4x gtceu:naquadria_dust","3x gtceu:terbium_dust","2x gtceu:aluminium_dust","1x gtceu:tin_dust","6x gtceu:titanium_dust","1x gtceu:osmiridium_dust"],["gtceu:mercury 1000"],8,"gtceu:cinobite 3744",31457280,15400],["converted_nichrome",["4x gtceu:nickel_dust","1x gtceu:chromium_dust"],null,2,"gtceu:nichrome 720",480,2700],["converted_kanthal",["1x gtceu:iron_dust","1x gtceu:aluminium_dust","1x gtceu:chromium_dust"],null,3,"gtceu:kanthal 432",480,1800],["converted_periodicium",["1x gtceu:metalloid_dust","1x gtceu:poor_dust","1x gtceu:transition_dust","1x gtceu:alkaline_earth_dust","1x gtceu:rareearth_dust","1x gtceu:alkaline_dust","1x gtceu:actinoids_dust"],["gtceu:not_found 1000","gtceu:noble_gas 1000"],9,"gtceu:periodicium 1296",7864320,15200],["converted_blue_steel",["1x gtceu:rose_gold_dust","1x gtceu:brass_dust","2x gtceu:steel_dust","4x gtceu:black_steel_dust"],null,4,"gtceu:blue_steel 1152",480,1400],["converted_enderite",["3x gtceu:enderium_dust","2x gtceu:ender_pearl_dust","1x gtceu:manganese_phosphide_dust","1x gtceu:magnesium_diboride_dust","1x gtceu:mercury_barium_calcium_cuprate_dust","1x gtceu:uranium_triplatinum_dust","1x gtceu:samarium_iron_arsenic_oxide_dust","1x gtceu:indium_tin_barium_titanium_cuprate_dust"],null,8,"gtceu:enderite 1584",7864320,14400],["converted_hastelloy_n_75",["15x gtceu:nickel_dust","9x gtceu:molybdenum_dust","4x gtceu:chromium_dust","2x gtceu:titanium_dust","2x gtceu:erbium_dust"],null,5,"gtceu:hastelloy_n_75 4608",1920,4550],["converted_arceusalloy2b",["3x gtceu:trinium_dust","4x gtceu:maraging_steel_300_dust","1x gtceu:orichalcum_dust","2x gtceu:nether_star_dust","2x gtceu:tungsten_steel_dust","1x gtceu:osmiridium_dust","2x gtceu:strontium_dust"],null,7,"gtceu:arceusalloy2b 2160",122880,14200],["converted_uranium_triplatinum",["1x gtceu:uranium_dust","3x gtceu:platinum_dust"],null,2,"gtceu:uranium_triplatinum 576",1920,4400],["converted_invar",["2x gtceu:iron_dust","1x gtceu:nickel_dust"],null,3,"gtceu:invar 432",16,1916],["converted_titan_precision_steel",["3x gtceu:titansteel_dust","1x gtceu:ytterbium_dust","1x gtceu:perditio_crystal_dust","1x gtceu:earth_crystal_dust","1x gtceu:ignis_crystal_dust"],null,5,"gtceu:titan_precision_steel 1008",491520,16000],["converted_transition",["1x gtceu:transition_1_dust","1x gtceu:transition_2_dust","1x gtceu:transition_3_dust"],null,3,"gtceu:transition 432",1966080,13600],["converted_grisium",["9x gtceu:titanium_dust","9x gtceu:carbon_dust","9x gtceu:potassium_dust","9x gtceu:lithium_dust","9x gtceu:sulfur_dust"],["gtceu:hydrogen 5000"],6,"gtceu:grisium 7200",120,4850],["converted_zirconium_carbide",["1x gtceu:zirconium_dust","1x gtceu:carbon_dust"],null,2,"gtceu:zirconium_carbide 288",1920,6800],["converted_black_bronze",["1x gtceu:gold_dust","1x gtceu:silver_dust","3x gtceu:copper_dust"],null,3,"gtceu:black_bronze 720",120,2000],["converted_tungsten_carbide",["1x gtceu:tungsten_dust","1x gtceu:carbon_dust"],null,2,"gtceu:tungsten_carbide 288",480,3058],["converted_watertight_steel",["7x gtceu:iron_dust","4x gtceu:aluminium_dust","2x gtceu:nickel_dust","1x gtceu:chromium_dust","1x gtceu:sulfur_dust"],null,5,"gtceu:watertight_steel 2160",1920,3850],["converted_vanadium_gallium",["3x gtceu:vanadium_dust","1x gtceu:gallium_dust"],null,2,"gtceu:vanadium_gallium 576",1920,4500],["converted_magnalium",["1x gtceu:magnesium_dust","2x gtceu:aluminium_dust"],null,3,"gtceu:magnalium 432",16,929],["converted_quantum",["15x gtceu:stellite_dust","3x gtceu:quantanium_dust","2x gtceu:jasper_dust","5x gtceu:gallium_dust","5x gtceu:americium_dust","5x gtceu:palladium_dust","5x gtceu:germanium_dust","5x gtceu:silicon_carbide_dust"],null,8,"gtceu:quantum 6480",1920,11400],["converted_hastelloy_n",["2x gtceu:iridium_dust","4x gtceu:molybdenum_dust","2x gtceu:chromium_dust","2x gtceu:titanium_dust","15x gtceu:nickel_dust"],null,5,"gtceu:hastelloy_n 3600",1920,4350],["converted_hastelloy_x",["8x gtceu:nickel_dust","3x gtceu:iron_dust","4x gtceu:tungsten_dust","2x gtceu:molybdenum_dust","1x gtceu:chromium_dust","1x gtceu:niobium_dust"],null,6,"gtceu:hastelloy_x 2736",1920,4200],["converted_inconel_625",["8x gtceu:nickel_dust","6x gtceu:chromium_dust","4x gtceu:molybdenum_dust","4x gtceu:niobium_dust","3x gtceu:titanium_dust","2x gtceu:iron_dust","2x gtceu:aluminium_dust"],null,7,"gtceu:inconel_625 4176",7680,4850],["converted_tanmolyium",["5x gtceu:titanium_dust","5x gtceu:molybdenum_dust","2x gtceu:vanadium_dust","3x gtceu:chromium_dust","1x gtceu:aluminium_dust"],null,5,"gtceu:tanmolyium 2304",1920,4300],["converted_inconel_792",["2x gtceu:nickel_dust","1x gtceu:niobium_dust","2x gtceu:aluminium_dust","1x gtceu:nichrome_dust"],null,4,"gtceu:inconel_792 864",120,5200],["converted_reactor_steel",["15x gtceu:iron_dust","1x gtceu:niobium_dust","4x gtceu:vanadium_dust","2x gtceu:carbon_dust"],null,4,"gtceu:reactor_steel 3168",480,3800],["custom_draconiumawakened", ["kubejs:quantum_chromodynamic_charge"], ["gtceu:draconium 1000"], null, "gtceu:draconiumawakened 1000", 134217728, 800],["custom_adamantium", ["4x gtceu:orichalcum_dust","6x gtceu:antimony_dust","8x gtceu:iron_dust","24x gtceu:bloodstone_dust"], ["gtceu:mercury 1000","gtceu:tin 1024"], 6, "gtceu:adamantium 2304", 33554432, 800],["custom_celestialtungsten", ["gtceu:titan_precision_steel_dust","2x gtceu:americium_dust","4x gtceu:tartarite_dust","4x gtceu:tungsten_dust"], ["gtceu:astraltitanium 144","gtceu:xenon 1000"], 6, "gtceu:celestialtungsten 1000", 33554432, 800],["custom_astraltitanium", ["4x gtceu:force_dust","4x gtceu:titanium_dust","2x gtceu:cobalt_dust","2x gtceu:copper_dust"], ["gtceu:tritium 1000"], 5, "gtceu:astraltitanium 1000", 33554432, 800],["custom_creon", ["40x gtceu:fermium_dust","40x gtceu:thorium_dust","40x gtceu:calcium_dust"], ["gtceu:celestialtungsten 2304","gtceu:dimensionallytranscendentresidue 2736"], 5, "gtladditions:creon 1000", 2147483647, 800],["custom_liquid_ruridit", ["2x gtceu:ruthenium_dust","1x gtceu:iridium_dust"], null, 3, "gtladditions:liquid_ruridit 432", 960, 4500],["custom_ruridit", ["2x gtceu:ruthenium_dust","1x gtceu:iridium_dust"], null, 2, "gtceu:ruridit 432", 960, 4500],["custom_legendarium", ["4x gtceu:naquadriatictaranium_dust","2x gtceu:trinium_dust","2x gtceu:duranium_dust","2x gtceu:orichalcum_dust","2x gtceu:mithril_dust","2x gtceu:tritanium_dust","2x gtceu:adamantine_dust","2x gtceu:vibranium_dust"], ["gtceu:neutronium 1000","gtceu:heavy_lepton_mixture 1000","gtceu:adamantium 288"], 11, "gtceu:legendarium 2304", 134217728, 800],["custom_phonon_medium", ["15x gtceu:magneto_resonatic_dust","47x gtceu:metastable_oganesson_dust","35x gtceu:praseodymium_dust","60x gtceu:echoite_dust"], ["gtladditions:phonon_crystal_solution 4000"], 5, "gtladditions:phonon_medium 1000", 125829120, 800],["custom_mellion", ["11x gtceu:tritanium_dust","11x gtceu:rubidium_dust","7x gtceu:highurabilityompoundteel_dust","13x gtceu:tartarite_dust","8x gtceu:jasper_dust","13x avaritia:infinity_catalyst"], ["gtceu:dimensionallytranscendentresidue 5000"], null, "gtladditions:mellion 7200", 425829120, 800],["converted_indium_gallium_phosphide", ["1x gtceu:indium_dust","1x gtceu:gallium_dust","1x gtceu:phosphorus_dust"], null, 1, "gtceu:indium_gallium_phosphide 432", 7, 1000],["converted_astral_silver", ["32x gtceu:silver_dust", "8x gtceu:infused_gold_dust", "8x gtceu:iron_dust", "16x gtceu:lapis_dust"], ["gtceu:distilled_water 1000"], null, "gtceu:astral_silver 6912", 1920, 5000],["custom_graphene_from_carbon_silicon", ["1x gtceu:graphite_dust", "1x gtceu:silicon_dust", "4x gtceu:carbon_dust"], null, 1, "gtceu:graphene 144", 480, 1200]];
    const _simpleLineCooperiteDusts = ['rhodium','platinum','palladium','iridium','ruthenium','osmium'];
    const _simpleLineRareEarthDusts = ['yttrium','lutetium','scandium','ytterbium','thulium','erbium','holmium','dysprosium','terbium','gadolinium','praseodymium','europium','samarium','promethium','neodymium','cerium','lanthanum'];
    const EXTRACTOR_BAD_PARTS = ['_plate','_double_plate','_dense_plate','_rod','_long_rod','_bolt','_screw','_ring','_spring','_gear','_small_gear','_wire','_fine_wire','_cable','_rotor','_turbine_blade','_frame','_pipe','_fluid_pipe','_item_pipe','_foil','_block','_nugget','_round'];
    const EXTRACTOR_WHITELIST = ['ingot','dust','gem','raw','ore','gtceu:kevlar_plate','gtceu:reinforced_epoxy_resin_plate'];
    
 const isGTLAdditions31 = (function() {
    if (!Platform.isLoaded('gtladditions')) return false;
    return !Ingredient.of('gtladditions:compressed_astral_array').isEmpty();
})();

    ServerEvents.recipes(event => {
    if (!TwistedLine.enableBlastScript) {
        TwistedLine.blast_stats = { enabled: false, loadTimeMs: Date.now() - scriptStartTime };
        if (TwistedLine.enableLogReport) console.log('[Especial para Twisters de Linha de Produção] Modificação da receita ignorada devido ao desligamento do interruptor global.');
        return;
    }
    const addedRecipeIds = new Set();

    const safeGt = (builderFunc, recipeId) => {
        if (addedRecipeIds.has(recipeId)) {
            return {
                itemInputs: function() { return this; },
                itemOutputs: function() { return this; },
                circuit: function() { return this; },
                inputFluids: function() { return this; },
                outputFluids: function() { return this; },
                EUt: function() { return this; },
                duration: function() { return this; },
                notConsumable: function() { return this; },
                blastFurnaceTemp: function() { return this; },
                cleanroom: function() { return this; },
                addData: function() { return this; }
            };
        }
        addedRecipeIds.add(recipeId);
        return builderFunc(recipeId);
    };
        const gtr = event.recipes.gtceu;
        let stats = { enabled: true, addedRecipes: 0, loadTimeMs: 0 };

        const CASTING_MOLDS = ["ingot","plate","gear","small_gear","credit","bottle","nugget","ball","cylinder","block","anvil","name","rotor","pill"];
        const EXTRUDER_MOLDS = ["plate","rod","ingot","block","gear","small_gear","ring","bolt","wire","cell","tiny_pipe","small_pipe","normal_pipe","large_pipe","huge_pipe","bottle","foil","long_rod","rotor"];
        const FIELD_SHAPES = ["ingot","ball"];
        const LENS_COLORS = ['glass','black','red','green','brown','blue','purple','cyan','light_gray','gray','pink','lime','yellow','light_blue','magenta','orange'];

        function addSpacetimeWire(factor, ingotCount, wireSuffix) {
            safeGt(gtr.wiremill, `assembly_line_distorter:spacetime_wire_${factor}x`).itemInputs(`${ingotCount}x gtceu:spacetime_ingot`).itemOutputs(`gtceu:spacetime_${wireSuffix}_wire`).circuit(factor).EUt(GTValues.VA[GTValues.MAX]).duration(1);
        }
        function registerSpaceProbe(mt) { safeGt(gtr[mt], `assembly_line_distorter:${mt}`).circuit(32).outputFluids("gtceu:heavy_lepton_mixture 2147483648000","gtceu:cosmic_element 2147483648000","gtceu:starlight 2147483648000").duration(1); }

        if (TwistedLine.enableSimpleIngotProcessing) {
    (function() {
        const hotMachineTypes = ['vacuum_freezer', 'antientropy_condensation', 'electric_blast_furnace', 'chemical_bath'];
        const hotIngotPattern = /:hot_.*_ingot/;
        let hotCount = 0;
        hotMachineTypes.forEach(type => {
            hotCount += event.countRecipes({ type: `gtceu:${type}`, input: hotIngotPattern });
            hotCount += event.countRecipes({ type: `gtceu:${type}`, output: hotIngotPattern });
            event.remove({ type: `gtceu:${type}`, input: hotIngotPattern });
            event.remove({ type: `gtceu:${type}`, output: hotIngotPattern });
        });
        log(`[产线扭曲者特供] ① 已移除 ${hotCount} 个热锭相关配方`);

        const blastExceptions = ['nickel_zinc_ferrite_ingot', 'polycaprolactam_ingot'];
        const blastPattern = new RegExp(`^(?!.*(${blastExceptions.join('|')})$).*_ingot$`);
        let removedBlastCount = event.countRecipes({ type: 'gtceu:electric_blast_furnace', output: blastPattern });
        event.remove({ type: 'gtceu:electric_blast_furnace', output: blastPattern });
        log(`[产线扭曲者特供] ② 已移除 ${removedBlastCount} 个电力高炉粉→锭配方`);

        let addedCount = 0;
        function addIngotFromDust(ingotId, dustId) {
            try {
                let safeId = ingotId.replace(':', '_');
                safeGt(gtr.chemical_bath, `assembly_line_distorter:cb_${safeId}_to_ingot`).itemInputs(dustId).itemOutputs("1x " + ingotId).EUt(GTValues.VA[GTValues.LV]).duration(1);
                safeGt(gtr.vacuum_freezer, `assembly_line_distorter:vf_${safeId}_to_ingot`).itemInputs(dustId).itemOutputs("1x " + ingotId).EUt(GTValues.VA[GTValues.MV]).duration(1);
                stats.addedRecipes += 2;
                return 2;
            } catch(e) { return 0; }
        }
        Ingredient.of('#forge:ingots').getItemIds().forEach(ingotId => {
            let dustId = ingotId.replace('_ingot', '_dust');
            if (dustId === ingotId) dustId = ingotId + '_dust';
            if (!Ingredient.of(dustId).isEmpty()) {
                addedCount += addIngotFromDust(ingotId, dustId);
            }
        });
        addedCount += addIngotFromDust('avaritia:neutron_ingot', 'avaritia:neutron_pile');
        log(`[产线扭曲者特供] ③ 已添加 ${addedCount} 个粉→锭配方（计为 ${addedCount*2} 个配方）`);
    })();
}

        if (TwistedLine.enableMoldAndSpecialRecipes) {
    (function() {
        let moldImpact = 0;
        const CASTING_MOLDS = ["ingot","plate","gear","small_gear","credit","bottle","nugget","ball","cylinder","block","anvil","name","rotor","pill"];
        const EXTRUDER_MOLDS = ["plate","rod","ingot","block","gear","small_gear","ring","bolt","wire","cell","tiny_pipe","small_pipe","normal_pipe","large_pipe","huge_pipe","bottle","foil","long_rod","rotor"];
        const FIELD_SHAPES = ["ingot","ball"];
        CASTING_MOLDS.forEach(m=> moldImpact+=event.countRecipes({input:`gtceu:${m}_casting_mold`}));
        EXTRUDER_MOLDS.forEach(m=> moldImpact+=event.countRecipes({input:`gtceu:${m}_extruder_mold`}));
        FIELD_SHAPES.forEach(s=> moldImpact+=event.countRecipes({input:`kubejs:${s}_field_shape`}));
        CASTING_MOLDS.forEach((m,i)=> event.replaceInput({}, `gtceu:${m}_casting_mold`, Item.of('gtceu:programmed_circuit',`{Configuration:${i+1}}`).strongNBT()));
        EXTRUDER_MOLDS.forEach((m,i)=> event.replaceInput({}, `gtceu:${m}_extruder_mold`, Item.of('gtceu:programmed_circuit',`{Configuration:${i+1}}`).strongNBT()));
        FIELD_SHAPES.forEach((s,i)=> event.replaceInput({}, `kubejs:${s}_field_shape`, Item.of('gtceu:programmed_circuit',`{Configuration:${i+1}}`).strongNBT()));
        log('[Especial para aqueles com distorção na linha de produção] ④ O formato do molde/campo foi substituído por um circuito de programação, afetando aprox.'+moldImpact+'receitas');

        let specialCount = 0;
        const specialRecipes = [
            { machine: "dimensionally_transcendent_plasma_forge", id: "fanbeishikong", notConsumable: { circuit: 1 }, inputFluids: ["gtceu:spacetime 144"], outputs: ["1x gtceu:spacetime_ingot"], outputFluids: ["gtceu:dimensionallytranscendentresidue 144"], euTier: "MAX", duration: 1, blastTemp: 96000 },
            { machine: "sps_crafting", id: "magmatter_ingot", circuit: 32, inputFluids: ["gtceu:mana 100000", "gtceu:magmatter 100"], inputs: ["minecraft:netherite_ingot"], outputs: ["gtceu:magmatter_ingot"], eu: 4 * GTValues.VA[GTValues.MAX], duration: 1 },
            { machine: "sps_crafting", id: "magmatter_ingot_d", circuit: 32, inputFluids: ["gtceu:mana 10000", "gtceu:magmatter 10"], inputs: ["gtceu:magmatter_dust", "minecraft:netherite_ingot"], outputs: ["gtceu:magmatter_ingot"], eu: 4 * GTValues.VA[GTValues.MAX], duration: 1 },
            { machine: "dimensionally_transcendent_plasma_forge", id: "spacetime_ingot", circuit: 32, inputFluids: ["gtceu:spacetime 1000", "gtceu:raw_star_matter_plasma 1000"], outputFluids: ["gtceu:dimensionallytranscendentresidue 100"], outputs: ["8x gtceu:spacetime_ingot"], euTier: "MAX", duration: 1, blastTemp: 62000 },
            { machine: "sps_crafting", id: "attuned_tengam_ingot", circuit: 32, inputs: ["gtceu:attuned_tengam_dust"], inputFluids: ["gtceu:mana 1000"], outputs: ["gtceu:attuned_tengam_ingot"], euTier: "UIV", duration: 1 },
            { machine: "fluid_solidifier", id: "pellet_antimatter", circuit: 31, inputFluids: ["gtceu:antimatter 1000"], outputs: ["kubejs:pellet_antimatter"], euTier: "UV", duration: 1 },
            { machine: "plasma_condenser", id: "neutronium_sphere", circuit: 31, inputFluids: ["gtceu:liquid_helium 32000"], outputFluids: ["gtceu:helium 32000"], inputs: ["kubejs:neutron_plasma_containment_cell"], outputs: ["4x kubejs:neutronium_sphere", "kubejs:plasma_containment_cell"], euTier: "UHV", duration: 1 },
            { machine: "plasma_condenser", id: "iron_ingot", circuit: 32, inputFluids: ["gtceu:iron_plasma 144", "gtceu:liquid_helium 14400"], outputFluids: ["gtceu:helium 14400"], outputs: ["minecraft:iron_ingot"], euTier: "UHV", duration: 1 },
            { machine: "plasma_condenser", id: "nickel_ingot", circuit: 32, inputFluids: ["gtceu:nickel_plasma 144", "gtceu:liquid_helium 14400"], outputFluids: ["gtceu:helium 14400"], outputs: ["gtceu:nickel_ingot"], euTier: "UHV", duration: 1 },
            { machine: "fluid_solidifier", id: "degenerate_rhenium_plate", notConsumable: { circuit: 2 }, inputFluids: ["gtceu:liquid_degenerate_rhenium 144"], outputs: ["1x gtceu:degenerate_rhenium_plate"], eu: 7, duration: 1 }
        ];
        for (let r of specialRecipes) {
            let builder = safeGt(gtr[r.machine], `assembly_line_distorter:${r.id}`);
            if (r.circuit !== undefined) builder.circuit(r.circuit);
            if (r.notConsumable) builder.notConsumable(Item.of('gtceu:programmed_circuit', `{Configuration:${r.notConsumable.circuit}}`).strongNBT());
            if (r.inputs) builder.itemInputs(r.inputs);
            if (r.inputFluids) builder.inputFluids(r.inputFluids);
            if (r.outputs) builder.itemOutputs(r.outputs);
            if (r.outputFluids) builder.outputFluids(r.outputFluids);
            if (r.eu !== undefined) builder.EUt(r.eu);
            else if (r.euTier) builder.EUt(GTValues.VA[GTValues[r.euTier]]);
            if (r.blastTemp) builder.blastFurnaceTemp(r.blastTemp);
            builder.duration(r.duration || 1);
            stats.addedRecipes++;
            specialCount++;
        }
        log(`[产线扭曲者特供] 模具及特殊配方板块: 已添加 ${specialCount} 个特殊机器配方`);
    })();
}

        if (TwistedLine.enableLensReplacement) {
    (function() {
        let lensImpact = 0;
        const LENS_COLORS = ['glass', 'black', 'red', 'green', 'brown', 'blue', 'purple', 'cyan', 'light_gray', 'gray', 'pink', 'lime', 'yellow', 'light_blue', 'magenta', 'orange'];

        for (let i = 1; i <= LENS_COLORS.length; i++) {
            lensImpact += event.countRecipes({ input: `#kubejs:laser_${i}` });
        }
        for (let i = 1; i <= LENS_COLORS.length; i++) {
            let circuitConfig = 33 - i;
            event.replaceInput(
                r => { let t = r.getType(); return t !== 'gtceu:assembly_line' && t !== 'gtceu:extractor'; },
                `#kubejs:laser_${i}`,
                Item.of('gtceu:programmed_circuit', `{Configuration:${circuitConfig}}`).strongNBT()
            );
        }
        log('[Especialmente disponível para aqueles com distorção de linha de produção] ⑤ A lente foi substituída por um circuito de programação (de forma decrescente a partir de 32), afetando aproximadamente' + lensImpact + 'receitas');

        const sortByCircuitDesc = (a, b) => b.circuit - a.circuit;

        const focusEngravingRecipes = [
            { id: "raw_photon_carrying_wafer", circuit: 32, inputs: ["kubejs:rutherfordium_neutronium_wafer"], inputFluids: ["gtceu:photoresist 100"], outputs: ["kubejs:raw_photon_carrying_wafer"], euTier: "UHV" },
            { id: "prepared_cosmic_soc_wafer", circuit: 31, inputs: ["kubejs:taranium_wafer"], inputFluids: ["gtceu:gamma_rays_photoresist 100"], outputs: ["kubejs:prepared_cosmic_soc_wafer"], euTier: "UIV" },
            { id: "high_precision_crystal_soc", circuit: 30, inputs: ["gtceu:crystal_soc"], inputFluids: ["gtceu:euv_photoresist 100"], outputs: ["kubejs:high_precision_crystal_soc"], euTier: "UEV" },
            { id: "nm_wafer", circuit: 29, inputs: ["kubejs:rutherfordium_neutronium_wafer"], inputFluids: ["gtceu:photoresist 100"], outputs: ["kubejs:nm_wafer"], euTier: "UV" },
            { id: "pm_wafer", circuit: 28, inputs: ["kubejs:taranium_wafer"], inputFluids: ["gtceu:euv_photoresist 100"], outputs: ["kubejs:pm_wafer"], euTier: "UHV" },
            { id: "fm_wafer", circuit: 27, inputs: ["kubejs:pm_wafer"], inputFluids: ["gtceu:gamma_rays_photoresist 100"], outputs: ["kubejs:fm_wafer"], euTier: "UEV" },
            { id: "fullerene_dust2", circuit: 26, inputs: ["gtceu:unfolded_fullerene_dust"], inputFluids: ["gtceu:euv_photoresist 5"], outputs: ["gtceu:fullerene_dust"], euTier: null, eu: 7864320 },
            { id: "lanthanum_embedded_fullerene_dust2", circuit: 25, inputs: ["2x gtceu:lanthanum_fullerene_mix_dust"], inputFluids: ["gtceu:euv_photoresist 5"], outputs: ["2x gtceu:lanthanum_embedded_fullerene_dust"], euTier: null, eu: 7864320 },
            { id: "primary_soc_wafer_from_prepare", circuit: 24, inputs: ["gtladditions:prepare_primary_soc_wafer"], inputFluids: ["gtceu:gamma_rays_photoresist 100"], outputs: ["gtladditions:primary_soc_wafer"], euTier: "UEV" },
            { id: "spacetime_soc_wafer_from_prepare", circuit: 23, inputs: ["gtladditions:prepare_spacetime_soc_wafer"], inputFluids: ["gtceu:gamma_rays_photoresist 100"], outputs: ["gtladditions:spacetime_soc_wafer"], euTier: "UIV" },
            { id: "chaos_soc_wafer_from_dragon", circuit: 22, inputs: ["gtladditions:dragon_element_starmetal_wafer"], inputFluids: ["gtceu:euv_photoresist 100"], outputs: ["gtladditions:chaos_soc_wafer"], euTier: "UHV" },
            { id: "extraordinary_soc_wafer_from_prepare", circuit: 21, inputs: ["gtladditions:prepare_extraordinary_soc_wafer"], inputFluids: ["gtceu:photoresist 100"], outputs: ["gtladditions:extraordinary_soc_wafer"], euTier: "UV" }
        ];
        focusEngravingRecipes.sort(sortByCircuitDesc);
        let focusCount = 0;
        for (let r of focusEngravingRecipes) {
            let builder = safeGt(gtr.dimensional_focus_engraving_array, `assembly_line_distorter:${r.id}`);
            builder.circuit(r.circuit).itemInputs(r.inputs).inputFluids(r.inputFluids).itemOutputs(r.outputs).duration(1);
            if (r.euTier) builder.EUt(GTValues.VA[GTValues[r.euTier]]);
            else if (r.eu) builder.EUt(r.eu);
            stats.addedRecipes++;
            focusCount++;
        }

        const precisionLaserRecipes = [
            { id: "prepared_cosmic_soc_wafer1", circuit: 32, inputs: ["kubejs:taranium_wafer"], inputFluids: ["gtceu:gamma_rays_photoresist 1000"], outputs: ["kubejs:prepared_cosmic_soc_wafer"], euTier: "UIV" },
            { id: "high_precision_crystal_soc2", circuit: 31, inputs: ["gtceu:crystal_soc"], inputFluids: ["gtceu:euv_photoresist 1000"], outputs: ["kubejs:high_precision_crystal_soc"], euTier: "UEV" },
            { id: "nm_wafer3", circuit: 30, inputs: ["kubejs:rutherfordium_neutronium_wafer"], inputFluids: ["gtceu:photoresist 1000"], outputs: ["kubejs:nm_wafer"], euTier: "UV" },
            { id: "pm_wafer4", circuit: 29, inputs: ["kubejs:taranium_wafer"], inputFluids: ["gtceu:euv_photoresist    "], outputs: ["kubejs:pm_wafer"], euTier: "UHV" },
            { id: "fm_wafer5", circuit: 28, inputs: ["kubejs:pm_wafer"], outputs: ["kubejs:fm_wafer"], euTier: "UEV" },
            { id: "raw_photon_carrying_wafer6", circuit: 27, inputs: ["kubejs:rutherfordium_neutronium_wafer"], inputFluids: ["gtceu:photoresist 1000"], outputs: ["kubejs:raw_photon_carrying_wafer"], euTier: "UHV" }
        ];
        precisionLaserRecipes.sort(sortByCircuitDesc);
        let precisionCount = 0;
        for (let r of precisionLaserRecipes) {
            let builder = safeGt(gtr.precision_laser_engraver, `assembly_line_distorter:${r.id}`);
            builder.circuit(r.circuit).itemInputs(r.inputs).itemOutputs(r.outputs).duration(1);
            if (r.inputFluids) builder.inputFluids(r.inputFluids);
            if (r.euTier) builder.EUt(GTValues.VA[GTValues[r.euTier]]);
            stats.addedRecipes++;
            precisionCount++;
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
        ];
        laserEngraverRecipes.sort(sortByCircuitDesc);
        let laserCount = 0;
        for (let r of laserEngraverRecipes) {
            let builder = safeGt(gtr.laser_engraver, `assembly_line_distorter:${r.id}`);
            builder.circuit(r.circuit).itemInputs(r.inputs).itemOutputs(r.outputs).duration(1);
            if (r.inputFluids) builder.inputFluids(r.inputFluids);
            if (r.outputFluids) builder.outputFluids(r.outputFluids);
            if (r.euTier) builder.EUt(GTValues.VA[GTValues[r.euTier]]);
            else if (r.eu) builder.EUt(r.eu);
            stats.addedRecipes++;
            laserCount++;
        }

        const nanoForgeRecipes = [
            { id: "carbon_nanoswarm", circuit: 32, inputs: ["64x gtceu:carbon_block", "64x gtceu:soc"], outputs: ["64x gtceu:carbon_nanoswarm"], fluids: ["gtceu:soldering_alloy 20000", "gtceu:lubricant 20000"], tier: 1 },
            { id: "glowstone_nanoswarm", circuit: 31, inputs: ["64x minecraft:glowstone", "64x gtceu:advanced_soc"], outputs: ["64x gtceu:glowstone_nanoswarm"], fluids: ["gtceu:uu_amplifier 10000", "gtceu:soldering_alloy 20000", "gtceu:lubricant 20000"], tier: 1 },
            { id: "copper_nanoswarm", circuit: 30, inputs: ["8x minecraft:copper_block", "8x gtceu:soc"], outputs: ["gtceu:copper_nanoswarm"], fluids: ["gtceu:naquadah 2000", "gtceu:soldering_alloy 10000", "gtceu:bismuth 10000"], tier: 1 },
            { id: "iron_nanoswarm", circuit: 29, inputs: ["8x minecraft:iron_block", "8x gtceu:soc"], outputs: ["gtceu:iron_nanoswarm"], fluids: ["gtceu:naquadah 2000", "gtceu:soldering_alloy 10000", "gtceu:bismuth 10000"], tier: 1 },
            { id: "gold_nanoswarm", circuit: 28, inputs: ["8x minecraft:gold_block", "16x gtceu:soc"], outputs: ["gtceu:gold_nanoswarm"], fluids: ["gtceu:enriched_naquadah 2000", "gtceu:soldering_alloy 20000", "gtceu:bismuth 20000"], tier: 1 },
            { id: "silver_nanoswarm", circuit: 27, inputs: ["8x gtceu:silver_block", "16x gtceu:soc"], outputs: ["gtceu:silver_nanoswarm"], fluids: ["gtceu:enriched_naquadah 2000", "gtceu:soldering_alloy 20000", "gtceu:bismuth 20000"], tier: 1 },
            { id: "iridium_nanoswarm", circuit: 26, inputs: ["8x gtceu:iridium_block", "32x gtceu:soc"], outputs: ["gtceu:iridium_nanoswarm"], fluids: ["gtceu:naquadria 2000", "gtceu:hafnium 8000", "gtceu:soldering_alloy 20000"], tier: 1 },
            { id: "osmium_nanoswarm", circuit: 25, inputs: ["8x gtceu:osmium_block", "32x gtceu:soc"], outputs: ["gtceu:osmium_nanoswarm"], fluids: ["gtceu:naquadria 2000", "gtceu:hafnium 8000", "gtceu:soldering_alloy 20000"], tier: 1 },
            { id: "naquadah_nanoswarm", circuit: 24, inputs: ["8x gtceu:naquadah_block", "16x gtceu:advanced_soc"], outputs: ["gtceu:naquadah_nanoswarm"], fluids: ["gtceu:naquadria 8000", "gtceu:uu_amplifier 2000", "gtceu:mutated_living_solder 20000"], tier: 1 },
            { id: "rhenium_nanoswarm", circuit: 23, inputs: ["8x gtceu:rhenium_block", "64x gtceu:soc"], outputs: ["gtceu:rhenium_nanoswarm"], fluids: ["gtceu:naquadria 2000", "gtceu:uu_amplifier 2000", "gtceu:soldering_alloy 20000"], tier: 1 },
            { id: "neutronium_nanoswarm", circuit: 22, inputs: ["8x gtceu:neutronium_block", "64x gtceu:soc", "32x gtceu:advanced_soc"], outputs: ["gtceu:neutronium_nanoswarm"], fluids: ["gtceu:neutronium 4000", "gtceu:uu_amplifier 2000", "gtceu:mutated_living_solder 20000"], tier: 1 },
            { id: "orichalcum_nanoswarm", circuit: 21, inputs: ["8x gtceu:orichalcum_block", "64x gtceu:advanced_soc", "64x gtceu:advanced_soc"], outputs: ["gtceu:orichalcum_nanoswarm"], fluids: ["gtceu:neutronium 8000", "gtceu:uu_amplifier 4000", "gtceu:mutated_living_solder 40000"], tier: 1 },
            { id: "enderium_nanoswarm", circuit: 20, inputs: ["8x gtceu:enderium_block", "64x gtceu:advanced_soc", "64x gtceu:advanced_soc"], outputs: ["gtceu:enderium_nanoswarm"], fluids: ["gtceu:neutronium 8000", "gtceu:uu_amplifier 4000", "gtceu:mutated_living_solder 40000"], tier: 2 },
            { id: "infuscolium_nanoswarm", circuit: 19, inputs: ["8x gtceu:infuscolium_block", "64x gtceu:advanced_soc", "32x gtceu:highly_advanced_soc"], outputs: ["gtceu:infuscolium_nanoswarm"], fluids: ["gtceu:neutronium 8000", "gtceu:uu_amplifier 4000", "gtceu:mutated_living_solder 40000"], tier: 2 },
            { id: "uruium_nanoswarm", circuit: 18, inputs: ["8x gtceu:uruium_block", "64x gtceu:advanced_soc", "64x gtceu:highly_advanced_soc"], outputs: ["gtceu:uruium_nanoswarm"], fluids: ["gtceu:uu_matter 20000", "gtceu:mutated_living_solder 40000", "gtceu:super_mutated_living_solder 40000"], tier: 2 },
            { id: "vibranium_nanoswarm", circuit: 17, inputs: ["8x gtceu:vibranium_block", "64x gtceu:highly_advanced_soc", "64x gtceu:highly_advanced_soc"], outputs: ["gtceu:vibranium_nanoswarm"], fluids: ["gtceu:uu_matter 20000", "gtceu:mutated_living_solder 40000", "gtceu:super_mutated_living_solder 40000"], tier: 2 },
            { id: "starmetal_nanoswarm", circuit: 16, inputs: ["8x gtceu:starmetal_block", "64x gtceu:highly_advanced_soc", "64x gtceu:highly_advanced_soc", "64x gtceu:exquisite_glass_gem", "64x gtceu:exquisite_amethyst_gem"], outputs: ["gtceu:starmetal_nanoswarm"], fluids: ["gtceu:uu_matter 40000", "gtceu:mutated_living_solder 80000", "gtceu:super_mutated_living_solder 80000"], tier: 2 },
            { id: "draconium_nanoswarm", circuit: 15, inputs: ["8x gtceu:draconium_block", "32x gtceu:highly_advanced_soc_wafer", "32x kubejs:optical_ram_wafer", "32x kubejs:optical_soc", "8x kubejs:exotic_processing_core"], outputs: ["gtceu:draconium_nanoswarm"], fluids: ["gtceu:uu_matter 40000", "gtceu:mutated_living_solder 80000", "gtceu:super_mutated_living_solder 80000"], tier: 2 },
            { id: "cosmicneutronium_nanoswarm", circuit: 14, inputs: ["8x gtceu:cosmicneutronium_block", "32x kubejs:optical_soc", "32x kubejs:exotic_wafer", "16x kubejs:cosmic_ram_wafer", "8x kubejs:cosmic_processing_unit_core"], outputs: ["gtceu:cosmicneutronium_nanoswarm"], fluids: ["gtceu:uu_matter 40000", "gtceu:crystalmatrix 40000", "gtceu:liquid_cosmic_mesh 40000"], tier: 3 },
            { id: "white_dwarf_mtter_nanoswarm", circuit: 13, inputs: ["8x gtceu:white_dwarf_mtter_block", "8x kubejs:cosmic_processing_unit_core"], outputs: ["gtceu:white_dwarf_mtter_nanoswarm"], fluids: ["gtceu:uu_matter 40000", "gtceu:neutronium 40000", "gtceu:cosmic_element 40000"], tier: 3 },
            { id: "black_dwarf_mtter_nanoswarm", circuit: 12, inputs: ["8x gtceu:black_dwarf_mtter_block", "8x kubejs:cosmic_processing_unit_core"], outputs: ["gtceu:black_dwarf_mtter_nanoswarm"], fluids: ["gtceu:uu_matter 40000", "gtceu:neutronium 40000", "gtceu:cosmic_element 40000"], tier: 3 },
            { id: "spacetime_nanoswarm", circuit: 11, inputs: ["8x gtceu:spacetime_block", "4x kubejs:eigenfolded_kerr_manifold", "16x kubejs:supracausal_ram_wafer", "8x kubejs:supracausal_processing_core"], outputs: ["gtceu:spacetime_nanoswarm"], fluids: ["gtceu:uu_matter 80000", "gtceu:infinity 40000", "gtceu:temporalfluid 40000"], tier: 3 },
            { id: "transcendentmetal_nanoswarm", circuit: 10, inputs: ["gtceu:rhenium_nanoswarm", "8x gtceu:transcendentmetal_block", "8x kubejs:recursively_folded_negative_space", "#gtceu:circuits/max"], outputs: ["gtceu:transcendentmetal_nanoswarm"], fluids: ["gtceu:uu_matter 80000", "gtceu:raw_star_matter_plasma 40000", "gtceu:spatialfluid 20000"], tier: 3 },
            { id: "eternity_nanoswarm", circuit: 9, inputs: ["gtceu:neutronium_nanoswarm", "8x gtceu:eternity_block", "8x kubejs:ctc_computational_unit"], outputs: ["gtceu:eternity_nanoswarm"], fluids: ["gtceu:spatialfluid 80000", "gtceu:exciteddtsc 80000", "gtceu:primordialmatter 80000"], tier: 3 },
            { id: "cosmic_nanoswarm", circuit: 8, inputs: ["64x gtceu:cosmic_block", "64x gtladditions:infinity_wafer", "32x gtladditions:spacetime_soc_wafer", "32x gtladditions:primary_soc_wafer", "16x kubejs:cosmic_singularity"], outputs: ["gtceu:cosmic_nanoswarm"], fluids: ["gtceu:cosmic 144000", "gtceu:spacetime 576000", "gtceu:primordialmatter 64000000"], tier: 3, eu: 2013265920 }
        ];
        nanoForgeRecipes.sort(sortByCircuitDesc);
        let nanoCount = 0;
        for (let r of nanoForgeRecipes) {
            let builder = safeGt(gtr.nano_forge, `assembly_line_distorter:${r.id}`);
            builder.circuit(r.circuit).itemInputs(r.inputs).itemOutputs(r.outputs).inputFluids(r.fluids).duration(1);
            if (r.eu) builder.EUt(r.eu);
            else builder.EUt(GTValues.VA[GTValues.UV]);
            builder.addData("nano_forge_tier", r.tier);
            stats.addedRecipes++;
            nanoCount++;
        }

const photonMatrixRecipes = [
    { id: "chaos_soc_wafer_photon16", circuit: 16, inputs: ["gtladditions:dragon_element_starmetal_wafer"], inputFluids: ["gtceu:euv_photoresist 75"], outputs: ["gtladditions:chaos_soc_wafer"], euTier: "UV" },
    { id: "spacetime_soc_wafer_photon15", circuit: 15, inputs: ["gtladditions:prepare_spacetime_soc_wafer"], inputFluids: ["gtceu:gamma_rays_photoresist 75"], outputs: ["gtladditions:spacetime_soc_wafer"], euTier: "UHV" },
    { id: "primary_soc_wafer_photon14", circuit: 14, inputs: ["gtladditions:prepare_primary_soc_wafer"], inputFluids: ["gtceu:gamma_rays_photoresist 75"], outputs: ["gtladditions:primary_soc_wafer"], euTier: "UIV" },
    { id: "extraordinary_soc_wafer_photon13", circuit: 13, inputs: ["gtladditions:prepare_extraordinary_soc_wafer"], inputFluids: ["gtceu:photoresist 75"], outputs: ["gtladditions:extraordinary_soc_wafer"], euTier: "UV" },
    { id: "prepared_cosmic_soc_wafer12", circuit: 12, inputs: ["kubejs:taranium_wafer"], inputFluids: ["gtceu:gamma_rays_photoresist 50"], outputs: ["kubejs:prepared_cosmic_soc_wafer"], euTier: "UIV" },
    { id: "pm_wafer_to_fm_wafer", circuit: 11, inputs: ["kubejs:pm_wafer"], inputFluids: ["gtceu:gamma_rays_photoresist 50"], outputs: ["kubejs:fm_wafer"], euTier: "UEV" },
    { id: "taranium_wafer_to_pm_wafer", circuit: 10, inputs: ["kubejs:taranium_wafer"], inputFluids: ["gtceu:euv_photoresist 50"], outputs: ["kubejs:pm_wafer"], euTier: "UHV" },
    { id: "crystal_soc_to_high_precision", circuit: 9, inputs: ["gtceu:crystal_soc"], inputFluids: ["gtceu:euv_photoresist 50"], outputs: ["kubejs:high_precision_crystal_soc"], euTier: "UEV" },
    { id: "rutherfordium_wafer_to_nm_wafer", circuit: 8, inputs: ["kubejs:rutherfordium_neutronium_wafer"], inputFluids: ["gtceu:photoresist 50"], outputs: ["kubejs:nm_wafer"], euTier: "UV" },
    { id: "rutherfordium_wafer_to_raw_photon", circuit: 7, inputs: ["kubejs:rutherfordium_neutronium_wafer"], inputFluids: ["gtceu:photoresist 50"], outputs: ["kubejs:raw_photon_carrying_wafer"], euTier: "UHV" },
    { id: "bioware_wafer_to_outstanding_soc", circuit: 6, inputs: ["gtladditions:bioware_echo_shard_wafer"], inputFluids: ["gtceu:photoresist 75"], outputs: ["gtladditions:outstanding_soc_wafer"], euTier: "UHV" }
];
        photonMatrixRecipes.sort(sortByCircuitDesc);
        let photonCount = 0;
        for (let r of photonMatrixRecipes) {
            let builder = safeGt(gtr.photon_matrix_etch, `assembly_line_distorter:${r.id}`);
            builder.circuit(r.circuit).itemInputs(r.inputs).inputFluids(r.inputFluids).itemOutputs(r.outputs).duration(1);
            if (r.euTier) builder.EUt(GTValues.VA[GTValues[r.euTier]]);
            stats.addedRecipes++;
            photonCount++;
        }
        log(`[产线扭曲者特供] 透镜替换板块: 已添加 ${focusCount+precisionCount+laserCount+nanoCount+photonCount} 个机器配方（聚焦/精密/激光/纳米/光子）`);
    })();
}

if (TwistedLine.enableFluidSolidifierAll) {
    (function() {
        function getItemId(material, suffix, modid, isFine) {
            if (isFine === true) {
                var std = modid + ':' + material + '_' + suffix;
                if (!Ingredient.of(std).isEmpty()) return std;
                var special = modid + ':fine_' + material + '_wire';
                if (!Ingredient.of(special).isEmpty()) return special;
                var gtStd = 'gtceu:' + material + '_' + suffix;
                if (!Ingredient.of(gtStd).isEmpty()) return gtStd;
                var gtSpecial = 'gtceu:fine_' + material + '_wire';
                if (!Ingredient.of(gtSpecial).isEmpty()) return gtSpecial;
                return null;
            } else {
                var candidates = [
                    modid + ':' + material + '_' + suffix,
                    'gtceu:' + material + '_' + suffix
                ];
                if (suffix === 'double_plate') {
                    candidates.push(modid + ':double_' + material + '_plate');
                    candidates.push('gtceu:double_' + material + '_plate');
                }
                if (suffix === 'long_rod') {
                    candidates.push(modid + ':long_' + material + '_rod');
                    candidates.push('gtceu:long_' + material + '_rod');
                }
                if (suffix === 'dense_plate') {
                    candidates.push(modid + ':dense_' + material + '_plate');
                    candidates.push('gtceu:dense_' + material + '_plate');
                }
                for (var i = 0; i < candidates.length; i++) {
                    if (!Ingredient.of(candidates[i]).isEmpty()) return candidates[i];
                }
                return null;
            }
        }

        let processedRecipes = 0;
        const ALLOWED_MODS = ['gtceu', 'gtladditions'];

        const PIPE_SIZES = [
            { circuit: 19, fluid: 72,   suffix: 'tiny_fluid_pipe' },
            { circuit: 20, fluid: 144,  suffix: 'small_fluid_pipe' },
            { circuit: 21, fluid: 432,  suffix: 'normal_fluid_pipe' },
            { circuit: 22, fluid: 864,  suffix: 'large_fluid_pipe' },
            { circuit: 23, fluid: 1728, suffix: 'huge_fluid_pipe' }
        ];
        const ROUND_ITEMS = [
            { circuit: 24, fluid: 16, suffix: 'round' }
        ];
        const WIRE_ITEMS = [
            { circuit: 25, fluid: 72,  suffix: 'single_wire' },
            { circuit: 26, fluid: 144, suffix: 'double_wire' },
            { circuit: 27, fluid: 288, suffix: 'quadruple_wire' },
            { circuit: 28, fluid: 576, suffix: 'octal_wire' },
            { circuit: 29, fluid: 1152, suffix: 'hex_wire' },
            { circuit: 30, fluid: 18,  suffix: 'fine_wire' }
        ];
        const ROD_ITEMS = [
            { circuit: 15, fluid: 72, suffix: 'rod' }
        ];
        const LONG_ROD_ITEMS = [
            { circuit: 14, fluid: 144, suffix: 'long_rod' }
        ];
        const DOUBLE_PLATE_ITEMS = [
            { circuit: 16, fluid: 288, suffix: 'double_plate' }
        ];
        const FOIL_ITEMS = [
            { circuit: 17, fluid: 36, suffix: 'foil' }
        ];
        const RING_ITEMS = [
            { circuit: 18, fluid: 36, suffix: 'ring' }
        ];
        const BOLT_ITEMS = [
            { circuit: 32, fluid: 18, suffix: 'bolt' }
        ];
        const FRAME_ITEMS = [
            { circuit: 12, fluid: 576, suffix: 'frame' }
        ];
        const DENSE_PLATE_ITEMS = [
            { circuit: 5, fluid: 1296, suffix: 'dense_plate' }
        ];
        const BUZZ_SAW_BLADE_ITEMS = [
            { circuit: 0, fluid: 576, suffix: 'buzz_saw_blade' }
        ];

        Fluid.getTypes().forEach(fluid => {
            let fluidId;
            if (typeof fluid === 'string') fluidId = fluid;
            else if (fluid.getId) fluidId = fluid.getId();
            else if (fluid.getRegistryName) fluidId = fluid.getRegistryName().toString();
            else fluidId = fluid.toString();

            let parts = fluidId.split(':');
            let modid = parts[0];
            if (!ALLOWED_MODS.includes(modid)) return;

            let path = parts[1];
            let material = path.replace(/_fluid$/, '').replace(/_plasma$/, '').replace(/_ingot$/, '');
            if (!material) return;

            for (let size of PIPE_SIZES) {
                let itemId = getItemId(material, size.suffix, modid, false);
                if (!itemId) continue;
                safeGt(gtr.fluid_solidifier, 'assembly_line_distorter:pipe_' + material + '_' + size.suffix)
                    .notConsumable(Item.of('gtceu:programmed_circuit', '{Configuration:' + size.circuit + '}').strongNBT())
                    .inputFluids(Fluid.of(fluidId, size.fluid))
                    .itemOutputs('1x ' + itemId)
                    .duration(1).EUt(GTValues.VA[GTValues.LV]);
                processedRecipes++;
                stats.addedRecipes++;
            }
            for (let item of ROUND_ITEMS) {
                let itemId = getItemId(material, item.suffix, modid, false);
                if (!itemId) continue;
                safeGt(gtr.fluid_solidifier, 'assembly_line_distorter:' + material + '_' + item.suffix)
                    .notConsumable(Item.of('gtceu:programmed_circuit', '{Configuration:' + item.circuit + '}').strongNBT())
                    .inputFluids(Fluid.of(fluidId, item.fluid))
                    .itemOutputs('1x ' + itemId)
                    .duration(1).EUt(GTValues.VA[GTValues.LV]);
                processedRecipes++;
                stats.addedRecipes++;
            }
            for (let wire of WIRE_ITEMS) {
                let isFine = (wire.suffix === 'fine_wire');
                let itemId = getItemId(material, wire.suffix, modid, isFine);
                if (!itemId) continue;
                safeGt(gtr.fluid_solidifier, 'assembly_line_distorter:wire_' + material + '_' + wire.suffix)
                    .notConsumable(Item.of('gtceu:programmed_circuit', '{Configuration:' + wire.circuit + '}').strongNBT())
                    .inputFluids(Fluid.of(fluidId, wire.fluid))
                    .itemOutputs('1x ' + itemId)
                    .duration(1).EUt(GTValues.VA[GTValues.LV]);
                processedRecipes++;
                stats.addedRecipes++;
            }
            for (let rod of ROD_ITEMS) {
                let itemId = getItemId(material, rod.suffix, modid, false);
                if (!itemId) continue;
                safeGt(gtr.fluid_solidifier, 'assembly_line_distorter:rod_' + material)
                    .notConsumable(Item.of('gtceu:programmed_circuit', '{Configuration:' + rod.circuit + '}').strongNBT())
                    .inputFluids(Fluid.of(fluidId, rod.fluid))
                    .itemOutputs('1x ' + itemId)
                    .duration(1).EUt(GTValues.VA[GTValues.LV]);
                processedRecipes++;
                stats.addedRecipes++;
            }
            for (let longRod of LONG_ROD_ITEMS) {
                let itemId = getItemId(material, longRod.suffix, modid, false);
                if (!itemId) continue;
                safeGt(gtr.fluid_solidifier, 'assembly_line_distorter:long_rod_' + material)
                    .notConsumable(Item.of('gtceu:programmed_circuit', '{Configuration:' + longRod.circuit + '}').strongNBT())
                    .inputFluids(Fluid.of(fluidId, longRod.fluid))
                    .itemOutputs('1x ' + itemId)
                    .duration(1).EUt(GTValues.VA[GTValues.LV]);
                processedRecipes++;
                stats.addedRecipes++;
            }
            for (let doublePlate of DOUBLE_PLATE_ITEMS) {
                let itemId = getItemId(material, doublePlate.suffix, modid, false);
                if (!itemId) continue;
                safeGt(gtr.fluid_solidifier, 'assembly_line_distorter:double_plate_' + material)
                    .notConsumable(Item.of('gtceu:programmed_circuit', '{Configuration:' + doublePlate.circuit + '}').strongNBT())
                    .inputFluids(Fluid.of(fluidId, doublePlate.fluid))
                    .itemOutputs('1x ' + itemId)
                    .duration(1).EUt(GTValues.VA[GTValues.LV]);
                processedRecipes++;
                stats.addedRecipes++;
            }
            for (let foil of FOIL_ITEMS) {
                let itemId = getItemId(material, foil.suffix, modid, false);
                if (!itemId) continue;
                safeGt(gtr.fluid_solidifier, 'assembly_line_distorter:foil_' + material)
                    .notConsumable(Item.of('gtceu:programmed_circuit', '{Configuration:' + foil.circuit + '}').strongNBT())
                    .inputFluids(Fluid.of(fluidId, foil.fluid))
                    .itemOutputs('1x ' + itemId)
                    .duration(1).EUt(GTValues.VA[GTValues.LV]);
                processedRecipes++;
                stats.addedRecipes++;
            }
            for (let ring of RING_ITEMS) {
                let itemId = getItemId(material, ring.suffix, modid, false);
                if (!itemId) continue;
                safeGt(gtr.fluid_solidifier, 'assembly_line_distorter:ring_' + material)
                    .notConsumable(Item.of('gtceu:programmed_circuit', '{Configuration:' + ring.circuit + '}').strongNBT())
                    .inputFluids(Fluid.of(fluidId, ring.fluid))
                    .itemOutputs('1x ' + itemId)
                    .duration(1).EUt(GTValues.VA[GTValues.LV]);
                processedRecipes++;
                stats.addedRecipes++;
            }
            for (let bolt of BOLT_ITEMS) {
                let itemId = getItemId(material, bolt.suffix, modid, false);
                if (!itemId) continue;
                safeGt(gtr.fluid_solidifier, 'assembly_line_distorter:bolt_' + material)
                    .notConsumable(Item.of('gtceu:programmed_circuit', '{Configuration:' + bolt.circuit + '}').strongNBT())
                    .inputFluids(Fluid.of(fluidId, bolt.fluid))
                    .itemOutputs('1x ' + itemId)
                    .duration(1).EUt(GTValues.VA[GTValues.LV]);
                processedRecipes++;
                stats.addedRecipes++;
            }
            for (let frame of FRAME_ITEMS) {
                let itemId = getItemId(material, frame.suffix, modid, false);
                if (!itemId) continue;
                safeGt(gtr.fluid_solidifier, 'assembly_line_distorter:frame_' + material)
                    .notConsumable(Item.of('gtceu:programmed_circuit', '{Configuration:' + frame.circuit + '}').strongNBT())
                    .inputFluids(Fluid.of(fluidId, frame.fluid))
                    .itemOutputs('1x ' + itemId)
                    .duration(1).EUt(GTValues.VA[GTValues.LV]);
                processedRecipes++;
                stats.addedRecipes++;
            }
            for (let dense of DENSE_PLATE_ITEMS) {
                let itemId = getItemId(material, dense.suffix, modid, false);
                if (!itemId) continue;
                safeGt(gtr.fluid_solidifier, 'assembly_line_distorter:dense_plate_' + material)
                    .notConsumable(Item.of('gtceu:programmed_circuit', '{Configuration:' + dense.circuit + '}').strongNBT())
                    .inputFluids(Fluid.of(fluidId, dense.fluid))
                    .itemOutputs('1x ' + itemId)
                    .duration(1).EUt(GTValues.VA[GTValues.LV]);
                processedRecipes++;
                stats.addedRecipes++;
            }
            for (let saw of BUZZ_SAW_BLADE_ITEMS) {
                let itemId = getItemId(material, saw.suffix, modid, false);
                if (!itemId) continue;
                safeGt(gtr.fluid_solidifier, 'assembly_line_distorter:buzz_saw_blade_' + material)
                    .notConsumable(Item.of('gtceu:programmed_circuit', '{Configuration:' + saw.circuit + '}').strongNBT())
                    .inputFluids(Fluid.of(fluidId, saw.fluid))
                    .itemOutputs('1x ' + itemId)
                    .duration(1).EUt(GTValues.VA[GTValues.LV]);
                processedRecipes++;
                stats.addedRecipes++;
            }
            let dustId = getItemId(material, 'dust', modid, false);
            if (dustId) {
                safeGt(gtr.fluid_solidifier, 'assembly_line_distorter:dust_' + material)
                    .notConsumable(Item.of('gtceu:programmed_circuit', '{Configuration:31}').strongNBT())
                    .inputFluids(Fluid.of(fluidId, 144))
                    .itemOutputs('1x ' + dustId)
                    .duration(1).EUt(GTValues.VA[GTValues.LV]);
                processedRecipes++;
                stats.addedRecipes++;
            }
        });

        log(`[产线扭曲者特供] 流体固化器板块: 生成 ${processedRecipes} 个配方`);
    })();
}
        
        if (TwistedLine.enableExtractorOverride) {
            (function() {
                let removed=0;
                Ingredient.all.getItemIds().forEach(id=>{
                    if(EXTRACTOR_WHITELIST.some(w=>id.includes(w))) return;
                    if(new RegExp(`(${EXTRACTOR_BAD_PARTS.join('|')})$`).test(id)) { event.remove({type:'gtceu:extractor',input:id}); removed++; }
                });
                log(`[产线扭曲者特供] 提取机已移除 ${removed} 个部件配方`);
                let addedExtractor = 0;
                Ingredient.of('#forge:dusts').getItemIds().filter(id=>id.endsWith('_dust') && !id.includes('tiny_') && !id.includes('small_')).forEach(dustId=>{
                    let parts = dustId.split(':');
                    let modid = parts[0];
                    let materialName = parts[1].replace('_dust', '');
                    let foundFluid = null;
                    for(let fid of [`${modid}:${materialName}`, `${modid}:${materialName}_fluid`, `gtceu:${materialName}`, `gtceu:${materialName}_fluid`]) {
                        if(Fluid.exists(fid)) { foundFluid = fid; break; }
                    }
                    if(!foundFluid) return;
                    try {
                        safeGt(gtr.extractor, `assembly_line_distorter:extractor_dust_${materialName}`).itemInputs(dustId).outputFluids(Fluid.of(foundFluid,144)).duration(1).EUt(GTValues.VA[GTValues.LV]);
                        addedExtractor++;
                        stats.addedRecipes++;
                    } catch(e) {}
                });
                log(`[产线扭曲者特供] 提取机板块: 已添加 ${addedExtractor} 种粉→144mb流体（全局总数已累加）`);
            })();
        }

        if (TwistedLine.enableFusionRecipes) {
            (function() {
                let fusions = {"assembly_line_distorter:mithril_plasma_blast":{"i":["gtceu:berkelium 144","gtceu:potassium 1152"],"o":["gtceu:mithril_plasma 144"],"e":122880},"assembly_line_distorter:orichalcum_plasma_blast":{"i":["gtceu:einsteinium 144","gtceu:sodium 1152"],"o":["gtceu:orichalcum_plasma 144"],"e":122880},"assembly_line_distorter:silver_plasma_blast":{"i":["gtceu:europium 16","gtceu:arsenic 16"],"o":["gtceu:silver_plasma 16"],"e":65536},"assembly_line_distorter:moscovium_blast":{"i":["gtceu:calcium 32","gtceu:curium 32"],"o":["gtceu:moscovium 32"],"e":122880},"assembly_line_distorter:livermorium_blast":{"i":["gtceu:thorium 32","gtceu:iron 32"],"o":["gtceu:livermorium 32"],"e":122880},"assembly_line_distorter:dubnium_blast":{"i":["gtceu:europium 64","gtceu:neon 250"],"o":["gtceu:dubnium 64"],"e":65536},"assembly_line_distorter:seaborgium_blast":{"i":["gtceu:calcium 64","gtceu:plutonium 64"],"o":["gtceu:seaborgium 64"],"e":65536},"assembly_line_distorter:tennessine_blast":{"i":["gtceu:lead 16","gtceu:bromine 16"],"o":["gtceu:tennessine 16"],"e":262144},"assembly_line_distorter:taranium_rich_liquid_helium_4_plasma_blast":{"i":["gtceu:taranium_enriched_liquid_helium_3 125","gtceu:hydrogen 125"],"o":["gtceu:taranium_rich_liquid_helium_4_plasma 125"],"e":1048576},"assembly_line_distorter:vibranium_plasma_blast":{"i":["gtceu:vibranium_unstable 16","gtceu:adamantium 16"],"o":["gtceu:vibranium_plasma 16"],"e":1966080},"assembly_line_distorter:metastable_hassium_plasma_blast":{"i":["gtceu:scandium_titanium_50_mixture 32","gtceu:radon 250"],"o":["gtceu:metastable_hassium_plasma 32"],"e":491520},"assembly_line_distorter:hot_oganesson_blast":{"i":["gtceu:oganesson_breeding_base 16","gtceu:dysprosium 16"],"o":["gtceu:hot_oganesson 125"],"e":491520},"assembly_line_distorter:draconiumawakened_plasma_blast":{"i":["gtceu:draconium 125","gtceu:quantumchromodynamically_confined_matter 125"],"o":["gtceu:draconiumawakened_plasma 125"],"e":7864320},"assembly_line_distorter:infinity_blast":{"i":["gtceu:crystalmatrix 2000","gtceu:cosmicneutronium 1000"],"o":["gtceu:infinity 144"],"e":7864320},"assembly_line_distorter:europium_blast":{"i":["gtceu:neodymium 16","gtceu:hydrogen 375"],"o":["gtceu:europium 16"],"e":24576},"assembly_line_distorter:uranium_blast":{"i":["gtceu:gold 16","gtceu:aluminium 16"],"o":["gtceu:uranium 16"],"e":24576},"assembly_line_distorter:iron_plasma_blast":{"i":["gtceu:silicon 16","gtceu:magnesium 16"],"o":["gtceu:iron_plasma 16"],"e":7680},"assembly_line_distorter:plutonium_blast":{"i":["gtceu:xenon 125","gtceu:zinc 16"],"o":["gtceu:plutonium 16"],"e":49152},"assembly_line_distorter:helium_plasma_blast":{"i":["gtceu:deuterium 125","gtceu:tritium 125"],"o":["gtceu:helium_plasma 125"],"e":4096},"assembly_line_distorter:nitrogen_plasma_blast":{"i":["gtceu:beryllium 16","gtceu:deuterium 375"],"o":["gtceu:nitrogen_plasma 125"],"e":16384},"assembly_line_distorter:plutonium_241_plasma_blast":{"i":["gtceu:lutetium 16","gtceu:vanadium 16"],"o":["gtceu:plutonium_241_plasma 16"],"e":1966080},"assembly_line_distorter:oxygen_plasma_blast":{"i":["gtceu:carbon 16","gtceu:helium_3 125"],"o":["gtceu:oxygen_plasma 125"],"e":4096},"assembly_line_distorter:uranium_235_blast":{"i":["gtceu:mercury 125","gtceu:magnesium 16"],"o":["gtceu:uranium_235 16"],"e":24576},"assembly_line_distorter:tritanium_blast":{"i":["gtceu:titanium 32","gtceu:duranium 32"],"o":["gtceu:tritanium 16"],"e":30720},"assembly_line_distorter:plutonium_241_blast":{"i":["gtceu:krypton 125","gtceu:cerium 16"],"o":["gtceu:plutonium_241 16"],"e":49152},"assembly_line_distorter:osmium_blast":{"i":["gtceu:silver 16","gtceu:copper 16"],"o":["gtceu:osmium 16"],"e":24578},"assembly_line_distorter:naquadria_blast":{"i":["gtceu:enriched_naquadah 16","gtceu:radon 125"],"o":["gtceu:naquadria 4"],"e":49152},"assembly_line_distorter:americium_blast":{"i":["gtceu:lutetium 32","gtceu:chromium 32"],"o":["gtceu:americium 32"],"e":49152},"assembly_line_distorter:darmstadtium_blast":{"i":["gtceu:arsenic 32","gtceu:ruthenium 16"],"o":["gtceu:darmstadtium 16"],"e":30720},"assembly_line_distorter:duranium_blast":{"i":["gtceu:gallium 16","gtceu:radon 125"],"o":["gtceu:duranium 16"],"e":16384},"assembly_line_distorter:chromium_blast":{"i":["gtceu:hydrogen 125","gtceu:vanadium 16"],"o":["gtceu:chromium 16"],"e":24576},"assembly_line_distorter:lutetium_blast":{"i":["gtceu:lanthanum 16","gtceu:silicon 16"],"o":["gtceu:lutetium 16"],"e":7680},"assembly_line_distorter:radon_blast":{"i":["gtceu:gold 16","gtceu:mercury 16"],"o":["gtceu:radon 125"],"e":30720},"assembly_line_distorter:nickel_plasma_blast":{"i":["gtceu:potassium 16","gtceu:fluorine 125"],"o":["gtceu:nickel_plasma 16"],"e":30720},"assembly_line_distorter:argon_plasma_blast":{"i":["gtceu:carbon 16","gtceu:magnesium 16"],"o":["gtceu:argon_plasma 125"],"e":24576},"assembly_line_distorter:indium_blast":{"i":["gtceu:silver 144","gtceu:lithium 144"],"o":["gtceu:indium 144"],"e":24576},"assembly_line_distorter:neutronium_blast":{"i":["gtceu:americium 128","gtceu:naquadria 128"],"o":["gtceu:neutronium 32"],"e":98304}};
                let fusionCount = 0;
                Object.keys(fusions).forEach(id => {
                    let data = fusions[id];
                    event.remove({ id: id });
                    safeGt(gtr.large_chemical_reactor, id).inputFluids(data.i).outputFluids(data.o).EUt(data.e).duration(1);
                    stats.addedRecipes++;
                    fusionCount++;
                });
                log(`[产线扭曲者特供] 核聚变板块: 已添加 ${fusionCount} 个配方`);
            })();
        }

        if (TwistedLine.enableParticleColliderRecipes) {
            (function() {
                let particles = {"assembly_line_distorter:curium_blast":{"i":["gtceu:plutonium 4096","gtceu:helium_plasma 4096"],"o":["gtceu:curium 4000"],"e":524288},"assembly_line_distorter:uranium_blast_particle":{"i":["gtceu:thorium 4096","gtceu:helium_plasma 4096"],"o":["gtceu:uranium 4000"],"e":524288},"assembly_line_distorter:plutonium_blast_particle":{"i":["gtceu:uranium 4096","gtceu:helium_plasma 4096"],"o":["gtceu:plutonium 4000"],"e":524288},"assembly_line_distorter:neptunium_blast":{"i":["gtceu:protactinium 4096","gtceu:helium_plasma 4096"],"o":["gtceu:neptunium 4000"],"e":524288},"assembly_line_distorter:berkelium_blast":{"i":["gtceu:americium 4096","gtceu:helium_plasma 4096"],"o":["gtceu:berkelium 4000"],"e":524288},"assembly_line_distorter:einsteinium_blast":{"i":["gtceu:curium 4096","gtceu:helium_plasma 4096"],"o":["gtceu:einsteinium 4000"],"e":524288},"assembly_line_distorter:californium_blast":{"i":["gtceu:berkelium 4096","gtceu:helium_plasma 4096"],"o":["gtceu:californium 4000"],"e":524288},"assembly_line_distorter:mendelevium_blast":{"i":["gtceu:einsteinium 4096","gtceu:helium_plasma 4096"],"o":["gtceu:mendelevium 4000"],"e":524288},"assembly_line_distorter:nobelium_blast":{"i":["gtceu:fermium 4096","gtceu:helium_plasma 4096"],"o":["gtceu:nobelium 4000"],"e":524288},"assembly_line_distorter:lawrencium_blast":{"i":["gtceu:mendelevium 4096","gtceu:helium_plasma 4096"],"o":["gtceu:lawrencium 4000"],"e":524288},"assembly_line_distorter:fermium_blast":{"i":["gtceu:californium 4096","gtceu:helium_plasma 4096"],"o":["gtceu:fermium 4000"],"e":524288},"assembly_line_distorter:astatine_blast":{"i":["gtceu:bismuth 4096","gtceu:helium_plasma 4096"],"o":["gtceu:astatine 4000"],"e":524288},"assembly_line_distorter:roentgenium_blast":{"i":["gtceu:meitnerium 4096","gtceu:helium_plasma 4096"],"o":["gtceu:roentgenium 4000"],"e":524288},"assembly_line_distorter:copernicium_blast":{"i":["gtceu:darmstadtium 4096","gtceu:helium_plasma 4096"],"o":["gtceu:copernicium 4000"],"e":524288},"assembly_line_distorter:nihonium_blast":{"i":["gtceu:roentgenium 4096","gtceu:helium_plasma 4096"],"o":["gtceu:nihonium 4000"],"e":524288},"assembly_line_distorter:bohrium_blast":{"i":["gtceu:dubnium 4096","gtceu:helium_plasma 4096"],"o":["gtceu:bohrium 4000"],"e":524288},"assembly_line_distorter:positive_electron_blast":{"i":["gtceu:phosphorus 200","gtceu:lithium 200"],"o":["gtceu:positive_electron 100"],"e":524288},"assembly_line_distorter:antiproton_blast":{"i":["gtceu:liquid_hydrogen 1000","gtceu:helium_plasma 200"],"o":["gtceu:antiproton 100"],"e":524288},"assembly_line_distorter:antineutron_blast":{"i":["gtceu:positive_electron 100","gtceu:antiproton 100"],"o":["gtceu:antineutron 2"],"e":524288},"assembly_line_distorter:antimatter_blast":{"i":["gtceu:antihydrogen 2000","gtceu:antineutron 2000"],"o":["gtceu:antimatter 100"],"e":524288}};
                let particleCount = 0;
                Object.keys(particles).forEach(id => {
                    let data = particles[id];
                    event.remove({ id: id });
                    safeGt(gtr.large_chemical_reactor, id).inputFluids(data.i).outputFluids(data.o).EUt(data.e).duration(1);
                    stats.addedRecipes++;
                    particleCount++;
                });
                log(`[产线扭曲者特供] 粒子对撞板块: 已添加 ${particleCount} 个配方`);
            })();
        }

        if (TwistedLine.enableGeneratorRecipes) {
            (function() {
                let genTypes = ['advanced_hyper_reactor','hyper_reactor','large_naquadah_reactor','naquadah_reactor','semi_fluid_generator','rocket_engine','gas_turbine','combustion_generator','steam_turbine','supercritical_steam_turbine','dyson_sphere','genesis_engine','annihilate_generator'];
                let genCount = 0;
                genTypes.forEach(t=>{ event.remove({id:`assembly_line_distorter:${t}_blast`}); safeGt(gtr[t], `assembly_line_distorter:${t}_blast`).duration(1).circuit(32).EUt(-9221474836470000000); stats.addedRecipes++; genCount++; });
                log(`[产线扭曲者特供] 发电板块: 已添加 ${genCount} 个配方`);
            })();
        }

        if (TwistedLine.enableCircuitPackRecipes) {
            (function() {
                let circuitCount = 0;
                ["ulv","lv","mv","hv","ev","iv","luv","zpm","uv","uhv","uev","uiv","uxv","opv","max"].forEach(l=>{ event.remove({id:`kubejs:circuit_pack/${l}_universal_circuit`}); event.shapeless(`kubejs:${l}_universal_circuit`, [`#gtceu:circuits/${l}`]).id(`kubejs:circuit_pack/${l}_universal_circuit`); stats.addedRecipes++; circuitCount++; });
                log(`[产线扭曲者特供] 电路打包板块: 已添加 ${circuitCount} 个无序配方`);
            })();
        }

        if (TwistedLine.enableComponentPackRecipes) {
    (function() {
        const recipes = [
            { id: "hongmengitems", inputFluids: ["gtceu:cosmic_element 2147483647"], inputs: ["16384x kubejs:leptonic_charge","128x gtladditions:arcanic_astrograph","16384x gtladditions:astral_array"], cellNBT: buildCellNBTForItems('Pacote de componentes Hongmeng+', HONGMENG_ITEMS), circuit: 32, euTier: "MAX" },
            { id: "plasmafluids", inputFluids: ["gtceu:cosmic_element 2147483647"], inputs: ["16384x kubejs:quantum_chromodynamic_charge","128x gtladditions:fuxi_bagua_heaven_forging_furnace","16384x gtladditions:astral_array"], cellNBT: buildCellNBTForFluids('Pacote de componentes de plasma', PLASMA_FLUIDS), circuit: 32, euTier: "MAX" },
            { id: "componentitems", inputFluids: ["gtceu:cosmic_element 2147483647"], inputs: ["2048x gtlcore:component_assembly_line_casing_max","1024x gtceu:component_assembly_line","16384x gtladditions:astral_array","16384x gtlcore:max_electric_motor","16384x gtlcore:max_electric_pump","16384x gtlcore:max_conveyor_module","16384x gtlcore:max_robot_arm","16384x gtlcore:max_electric_piston","16384x gtlcore:max_emitter","16384x gtlcore:max_sensor","16384x gtlcore:max_field_generator"], cellNBT: buildCellNBTForItems('pacote de componentes', COMPONENT_ITEMS), circuit: 32, euTier: "MAX" }
        ];
        let componentCount = 0;
        for (let r of recipes) {
            safeGt(gtr.qft, `assembly_line_distorter:${r.id}`)
                .inputFluids(r.inputFluids)
                .itemInputs(r.inputs)
                .itemOutputs(Item.of('ae2:portable_item_cell_16k', r.cellNBT))
                .circuit(r.circuit)
                .duration(1)
                .EUt(GTValues.VA[GTValues[r.euTier]]);
            stats.addedRecipes++;
            componentCount++;
        }

        let nanoswarmItems = Ingredient.of('#forge:nanoswarms').getItemIds();
        if (nanoswarmItems.length > 0) {
            let nanoswarmCellNBT = buildCellNBTForItems('Pacote de componentes Nano Swarm', nanoswarmItems);
            safeGt(gtr.qft, `assembly_line_distorter:nanoswarmitems`)
                .inputFluids(["gtceu:cosmic_element 2147483647"])
                .itemInputs([
                    "16384x kubejs:quantum_chromodynamic_charge",
                    "16384x kubejs:leptonic_charge",
                    "16384x gtladditions:astral_array",
                    "256x gtceu:nano_core"
                ])
                .itemOutputs(Item.of('ae2:portable_item_cell_16k', nanoswarmCellNBT))
                .circuit(32)
                .duration(1)
                .EUt(GTValues.VA[GTValues.MAX]);
            stats.addedRecipes++;
            componentCount++;
            log(`[产线扭曲者特供] 已添加纳米蜂群元件包 QFT 配方，包含 ${nanoswarmItems.length} 种纳米蜂群`);
        } else {
            log(`[产线扭曲者特供] 未找到任何纳米蜂群，跳过纳米蜂群元件包 QFT 配方`);
        }

        if (TwistedLine.enableExclusiveContent) {
            let exquisiteGems = Ingredient.of('#forge:exquisite_gems').getItemIds();
            let flawlessGems = Ingredient.of('#forge:flawless_gems').getItemIds();
            let crystalGems = exquisiteGems.concat(flawlessGems);
            if (crystalGems.length > 0) {
                let crystalCellNBT = buildCellNBTForItems('Pacote de componentes de cristal', crystalGems);
                event.shapeless(
                    Item.of('ae2:portable_item_cell_16k', crystalCellNBT),
                    ['assembly_line_distorter:assembly_line_distorter_fragments_of_the_world']
                ).id('assembly_line_distorter:fragments_to_crystal_pack');
                stats.addedRecipes++;
                log(`[产线扭曲者特供] 元件包板块: 已添加世界碎片 → 晶体元件包工作台配方，包含 ${crystalGems.length} 种宝石`);
            } else {
                log(`[产线扭曲者特供] 元件包板块: 未找到精致/无瑕宝石，跳过晶体元件包工作台配方`);
            }
        }
        log(`[产线扭曲者特供] 元件包板块: 已添加 ${componentCount} 个QFT配方`);
    })();
}

        if (TwistedLine.enableInfinityCellRecipes) {
    (function() {
        var infinityCellList = [
            { id: 'mutagen', circuit: 32, fluid: 'minecraft:water 2147483647', items: ['2147483647x gtceu:naquadria_dust','2147483647x gtceu:bio_chaff'], record: 'gtceu:mutagen', eu: 'LuV', isFluid: true },
            { id: 'sodium_potassium', circuit: 31, fluid: 'minecraft:water 2147483647', items: ['2147483647x gtceu:sodium_dust','2147483647x gtceu:potassium_dust'], record: 'gtceu:sodium_potassium', eu: 'LuV', isFluid: true },
            { id: 'biomass', circuit: 30, fluid: 'minecraft:water 2147483647', items: ['2147483647x gtceu:bio_chaff'], record: 'gtceu:biomass', eu: 'IV', isFluid: true },
            { id: 'bedrock_dust', circuit: 29, fluid: null, items: ['16x gtceu:bedrock_drilling_rig','4096x kubejs:bedrock_drill'], record: 'gtceu:bedrock_dust', eu: 'UEV', isFluid: false },
            { id: 'activated_carbon_dust', circuit: 28, fluid: 'gtceu:nitrogen 2147483647', items: ['2147483647x gtceu:carbon_dust'], record: 'gtceu:activated_carbon_dust', eu: 'MV', isFluid: false },
            { id: 'bio_chaff', circuit: 27, fluid: 'minecraft:water 2147483647', items: ['2147483647x gtceu:plant_ball'], record: 'gtceu:bio_chaff', eu: 'HV', isFluid: false }
        ];
        let infinityCount = 0;
        infinityCellList.forEach(cell => {
            let builder = safeGt(gtr.assembler, `assembly_line_distorter:${cell.id}`)
                .circuit(cell.circuit)
                .itemInputs(cell.items)
                .duration(1)
                .EUt(GTValues.VA[GTValues[cell.eu]]);
            if (cell.fluid) builder.inputFluids(cell.fluid);
            let nbt = cell.isFluid ? `{record:{"#c":"ae2:f",id:"${cell.record}"}}` : `{record:{"#c":"ae2:i",id:"${cell.record}"}}`;
            builder.itemOutputs(Item.of('expatternprovider:infinity_cell', nbt));
            stats.addedRecipes++;
            infinityCount++;
        });
        safeGt(gtr.qft, 'assembly_line_distorter:star_gate_crystal_slurry')
            .inputFluids("gtladditions:star_gate_crystal_slurry 32768","gtceu:uu_matter 2147483647","gtceu:cosmic_element 2147483647")
            .itemInputs("1024x gtceu:dimensionally_transcendent_mixer","64x gtladditions:forge_of_the_antichrist","64x gtladditions:arcanic_astrograph","32768x gtladditions:astral_array","64x gtladditions:macro_atomic_resonant_fragment_stripper","1024x gtladditions:thread_modifier_hatch","1024x gtladditions:wireless_energy_network_input_terminal","1024x gtladditions:wireless_energy_network_output_terminal","2147483647x kubejs:quantum_chromodynamic_charge")
            .circuit(26)
            .itemOutputs(Item.of('expatternprovider:infinity_cell','{record:{"#c":"ae2:f",id:"gtladditions:star_gate_crystal_slurry"}}'))
            .duration(1)
            .EUt(GTValues.VA[GTValues.MAX]);
        stats.addedRecipes++;
        infinityCount++;
        safeGt(gtr.compressor, "assembly_line_distorter:dragon_egg").itemInputs("16x gtceu:dragon_egg_copier").itemOutputs(Item.of('expatternprovider:infinity_cell','{record:{"#c":"ae2:i",id:"minecraft:dragon_egg"}}')).duration(1).EUt(GTValues.VA[GTValues.UXV]); stats.addedRecipes++; infinityCount++;
        log(`[产线扭曲者特供] 无限元件板块: 已添加 ${infinityCount} 个配方`);
    })();
}

        if (TwistedLine.enableGTLAdditionsUpgrade) {
    (function() {
        const nbtThread = `{BlockEntityTag:{astralArrayInventory:{Items:[{Count:127,Slot:0,id:"gtladditions:astral_array"}]}},display:{Name:'{"text":"Motor Super Sky Sphere","color":"#AAFFAA","bold":true}',Lore:['{"text":"§7━━━━━━━━━━━━━━━━"}','{"text":" §6incorpora matriz de calibre estelar §e127 §6","italic":false}','{"text":" Produção de energia estelar §b: §3+∞ §b/ tick"}','{"text":"§7━━━━━━━━━━━━━━━━"}','{"text":" §d§o"A batida dos corações das estrelas" §d"}']}}`;
        const nbtForge = `{BlockEntityTag:{runningSecs:144000L},display:{Name:'{"text":"A Forja do Falso Deus Final","color":"#FF4500","bold":true,"italic":true}',Lore:['"§6§lForjamento do Falso Deus·Forma Definitiva"','“§e§nApós as intermináveis ​​​​reviravoltas da matriz de flutuação quântica, o poder infinito criou a base do falso deus”','"§7§mTodas as coisas na UE que engoliram 9.2E em um segundo estão chegando ao fim"','“§5§ocarrega todas as coisas e rompe as algemas do mundo”','"§c§kQueime tudo no mundo..."']}}`;
        const recipes = [
            { machine: "qft", id: "thread_modifier_hatch", inputs: ["gtladditions:thread_modifier_hatch","127x gtladditions:astral_array"], outputs: [Item.of('gtladditions:thread_modifier_hatch', nbtThread)], circuit: 32, euTier: "MAX", cleanroom: true },
            { machine: "qft", id: "forge_of_the_antichrist", inputs: ["gtladditions:forge_of_the_antichrist"], outputs: [Item.of('gtladditions:forge_of_the_antichrist', nbtForge)], circuit: 32, eu: -9221474836470000000, cleanroom: true },
            { machine: "ultimate_material_forge", id: "forge_of_the_antichristnull", circuit: 32, outputFluids: ['null'], duration: 1, noInput: true },
            { machine: "large_chemical_reactor", id: "bioware_echo_shard_wafer", inputFluids: ["gtceu:biohmediumsterilized 250"], inputs: ["gtladditions:echo_shard_wafer"], outputs: ["gtladditions:bioware_echo_shard_wafer"], euTier: "UHV", duration: 1 },
            { machine: "chaotic_alchemy", id: "proto_halkonite", inputs: ["4x gtceu:transcendentmetal_dust","4x gtceu:tairitsu_dust","4x gtceu:tartarite_dust","2x gtceu:titan_precision_steel_dust","2x gtceu:eternity_dust"], inputFluids: ["gtceu:dimensionallytranscendentresidue 576"], outputFluids: ["gtladditions:proto_halkonite 1152"], euTier: "OpV", blastTemp: 48000, duration: 1 }
        ];
        let upgradeCount = 0;
        for (let r of recipes) {
            let builder = safeGt(gtr[r.machine], `assembly_line_distorter:${r.id}`);
            if (r.circuit !== undefined) builder.circuit(r.circuit);
            if (!r.noInput) {
                if (r.inputs) builder.itemInputs(r.inputs);
                if (r.inputFluids) builder.inputFluids(r.inputFluids);
            }
            if (r.outputs) builder.itemOutputs(r.outputs);
            if (r.outputFluids) builder.outputFluids(r.outputFluids);
            if (r.eu !== undefined) builder.EUt(r.eu);
            else if (r.euTier) builder.EUt(GTValues.VA[GTValues[r.euTier]]);
            if (r.blastTemp) builder.blastFurnaceTemp(r.blastTemp);
            if (r.cleanroom) builder.cleanroom(CleanroomType.CLEANROOM);
            builder.duration(r.duration || 1);
            stats.addedRecipes++;
            upgradeCount++;
        }
        if (isGTLAdditions31) {
            safeGt(gtr.qft, 'assembly_line_distorter:compressed_astral_array')
                .itemInputs('1024x gtladditions:astral_array','64x gtceu:spacetime_nanoswarm','64x minecraft:repeating_command_block','64x gtceu:eternity_nanoswarm','144x gtladditions:black_hole_seed')
                .inputFluids('gtceu:miracle 576000')
                .circuit(32)
                .itemOutputs('gtladditions:compressed_astral_array')
                .EUt(-9221474836470000000)
                .duration(1);
            stats.addedRecipes++;
            upgradeCount++;
        }
        log(`[产线扭曲者特供] GTLAdditions升级板块: 已添加 ${upgradeCount} 个配方`);
    })();
}

        if (TwistedLine.enableDistortRecipes) {
    (function() {
        const distortRecipes = [
            {
                id: "quantanium",
                inputFluids: ["gtceu:neon 10000"],
                itemInputs: ["4x gtceu:quantum_star", "8x gtceu:quantum_eye", "16x gtceu:mithril_dust", "16x gtceu:gadolinium_dust", "64x minecraft:netherite_scrap", "64x ae2:fluix_dust"],
                outputFluids: ["gtceu:quantanium 10000"],
                eu: GTValues.VA[GTValues.UV],
                duration: 1
            },
            {
                id: "hassium",
                inputFluids: ["gtceu:scandium_titanium_50_mixture 3200", "gtceu:radon 25000", "gtceu:liquid_helium 100000"],
                outputFluids: ["gtceu:hassium 3200"],
                eu: GTValues.VA[GTValues.UV],
                duration: 1
            },
            {
                id: "oganesson",
                inputFluids: ["kubejs:gelid_cryotheum 1440", "gtceu:dysprosium 160", "gtceu:titanium_50 900", "gtceu:californium 360"],
                outputFluids: ["gtceu:oganesson 1250"],
                eu: GTValues.VA[GTValues.UV],
                duration: 1
            },
            {
                id: "uranium_to_quasifissioning_plasma",
                inputFluids: ["gtceu:uranium 144"],
                itemInputs: ["gtceu:uranium_ingot"],
                outputFluids: ["gtceu:quasifissioning_plasma 144"],
                eu: GTValues.VA[GTValues.UEV],
                duration: 1
            }
        ];

        let distortCount = 0;
        distortRecipes.forEach(recipe => {
            const builder = safeGt(gtr.distort, `assembly_line_distorter:${recipe.id}`);
            if (recipe.inputFluids) recipe.inputFluids.forEach(fluid => builder.inputFluids(fluid));
            if (recipe.itemInputs) builder.itemInputs(recipe.itemInputs);
            if (recipe.outputFluids) recipe.outputFluids.forEach(fluid => builder.outputFluids(fluid));
            builder.EUt(recipe.eu).duration(recipe.duration);
            stats.addedRecipes++;
            distortCount++;
        });

        log(`[产线扭曲者特供] 深度化学扭曲仪板块: 已添加 ${distortCount} 个配方`);
    })();
}

        if (TwistedLine.enableStellarForgeRecipes) {
    (function() {
        const recipes = [
            { machine: "stellar_forge", id: "contained_reissner_nordstrom_singularity", circuit: 1, inputs: ["2x kubejs:naquadria_charge","256x gtceu:degenerate_rhenium_plate"], inputFluids: ["gtceu:uu_matter 1000"], outputs: ["64x kubejs:contained_reissner_nordstrom_singularity"], euTier: "UIV", duration: 1, sctier: 1 },
            { machine: "stellar_forge", id: "contained_kerr_newmann_singularity", circuit: 2, inputs: ["4x gtceu:degenerate_rhenium_plate"], inputFluids: ["gtceu:uu_matter 64000"], outputs: ["kubejs:contained_kerr_newmann_singularity"], euTier: "UXV", duration: 1, sctier: 2 },
            { machine: "stellar_forge", id: "cosmic_neutron_plasma_cell", circuit: 3, inputs: ["kubejs:quantum_chromodynamic_charge"], inputFluids: ["gtceu:dense_neutron_plasma 2000","gtceu:uu_matter 2000"], outputs: ["kubejs:cosmic_neutron_plasma_cell"], euTier: "UXV", duration: 1, sctier: 3 },
            { machine: "stellar_forge", id: "contained_high_density_protonic_matter", circuit: 4, inputs: ["2x kubejs:leptonic_charge","4x gtceu:degenerate_rhenium_plate"], inputFluids: ["gtceu:uu_matter 1000"], outputs: ["kubejs:contained_high_density_protonic_matter"], euTier: "UXV", duration: 1, sctier: 2 },
            { machine: "stellar_forge", id: "contained_exotic_matter", circuit: 5, inputs: ["4x kubejs:leptonic_charge","8x gtceu:degenerate_rhenium_plate"], inputFluids: ["gtceu:uu_matter 1000"], outputs: ["kubejs:contained_exotic_matter"], euTier: "UXV", duration: 1, sctier: 2 },
            { machine: "alloy_smelter", id: "steel_ingot", inputs: ["minecraft:iron_ingot","2x minecraft:coal"], outputs: ["3x gtceu:steel_ingot"], euTier: "ULV", duration: 1 },
            { machine: "alloy_smelter", id: "firebricks", inputs: ["minecraft:coal","18x minecraft:clay_ball"], outputs: ["gtceu:firebricks"], euTier: "ULV", duration: 1 }
        ];
        let stellarCount = 0;
        for (let r of recipes) {
            let builder = safeGt(gtr[r.machine], `assembly_line_distorter:${r.id}`);
            if (r.circuit !== undefined) builder.circuit(r.circuit);
            builder.itemInputs(r.inputs).itemOutputs(r.outputs).duration(r.duration);
            if (r.inputFluids) builder.inputFluids(r.inputFluids);
            builder.EUt(r.euTier ? GTValues.VA[GTValues[r.euTier]] : GTValues.VA[GTValues.ULV]);
            if (r.sctier) builder.addData("SCTier", r.sctier);
            stats.addedRecipes++;
            stellarCount++;
        }
        log(`[产线扭曲者特供] 去除罐子板块: 已添加 ${stellarCount} 个配方`);
    })();
}

        if (TwistedLine.enableContentOptimizationRecipes) {
    (function() {
        let contentCount = 0;
        const addRecipe = (recipe) => {
            const { machine, id, circuit, inputs, inputFluids, outputs, outputFluids, eu, euTier, duration, blastTemp, cleanroom, addData, notConsumable, shapeless, smelting } = recipe;
            if (shapeless) {
                event.shapeless(outputs, inputs).id(`assembly_line_distorter:${id}`);
            } else if (smelting) {
                event.smelting(outputs, inputs).xp(smelting.xp).cookingTime(smelting.cookingTime);
            } else {
                let builder = safeGt(gtr[machine], `assembly_line_distorter:${id}`);
                if (circuit !== undefined) builder.circuit(circuit);
                if (inputs) builder.itemInputs(inputs);
                if (inputFluids) builder.inputFluids(inputFluids);
                if (outputs) builder.itemOutputs(outputs);
                if (outputFluids) builder.outputFluids(outputFluids);
                if (notConsumable) {
                    if (Array.isArray(notConsumable)) {
                        notConsumable.forEach(item => builder.notConsumable(item));
                    } else {
                        builder.notConsumable(notConsumable);
                    }
                }
                if (eu !== undefined) builder.EUt(eu);
                else if (euTier) builder.EUt(GTValues.VA[GTValues[euTier]]);
                if (blastTemp) builder.blastFurnaceTemp(blastTemp);
                if (cleanroom) builder.cleanroom(CleanroomType.CLEANROOM);
                if (addData) builder.addData(addData.key, addData.value);
                builder.duration(duration || 1);
            }
            stats.addedRecipes++;
            contentCount++;
        };
        const spacetimeWires = [
            { factor: 1, ingotCount: 1, wireSuffix: "single" },
            { factor: 2, ingotCount: 1, wireSuffix: "double" },
            { factor: 4, ingotCount: 2, wireSuffix: "quadruple" },
            { factor: 8, ingotCount: 4, wireSuffix: "octal" },
            { factor: 16, ingotCount: 8, wireSuffix: "hex" }
        ];
        spacetimeWires.forEach(w => {
            addRecipe({
                machine: "wiremill",
                id: `spacetime_wire_${w.factor}x`,
                circuit: w.factor,
                inputs: `${w.ingotCount}x gtceu:spacetime_ingot`,
                outputs: `gtceu:spacetime_${w.wireSuffix}_wire`,
                euTier: "MAX",
                duration: 1
            });
        });
        const airRecipes = [
            { id: 'air1', data: 'overworld_data', circuit: 1, outputFluids: 'gtceu:air 3200', euTier: 'LV' },
            { id: 'nether_air1', data: 'nether_data', circuit: 1, outputFluids: 'gtceu:nether_air 3200', euTier: 'LV' },
            { id: 'ender_air1', data: 'end_data', circuit: 1, outputFluids: 'gtceu:ender_air 3200', euTier: 'LV' },
            { id: 'air2', data: 'overworld_data', circuit: 2, outputFluids: 'gtceu:air 2147483648000', euTier: 'MV' },
            { id: 'nether_air2', data: 'nether_data', circuit: 2, outputFluids: 'gtceu:nether_air 2147483648000', euTier: 'MV' },
            { id: 'ender_air2', data: 'end_data', circuit: 2, outputFluids: 'gtceu:ender_air 2147483648000', euTier: 'MV' },
            { id: 'liquid_air1', data: 'overworld_data', circuit: 3, outputFluids: 'gtceu:liquid_air 3200', euTier: 'LV', extra: 'gtceu:vacuum_freezer' },
            { id: 'liquid_nether_air1', data: 'nether_data', circuit: 3, outputFluids: 'gtceu:liquid_nether_air 3200', euTier: 'LV', extra: 'gtceu:vacuum_freezer' },
            { id: 'liquid_ender_air1', data: 'end_data', circuit: 3, outputFluids: 'gtceu:liquid_ender_air 3200', euTier: 'LV', extra: 'gtceu:vacuum_freezer' },
            { id: 'liquid_air2', data: 'overworld_data', circuit: 4, outputFluids: 'gtceu:liquid_air 2147483648000', euTier: 'MV', extra: 'gtceu:vacuum_freezer' },
            { id: 'liquid_nether_air2', data: 'nether_data', circuit: 4, outputFluids: 'gtceu:liquid_nether_air 2147483648000', euTier: 'MV', extra: 'gtceu:vacuum_freezer' },
            { id: 'liquid_ender_air2', data: 'end_data', circuit: 4, outputFluids: 'gtceu:liquid_ender_air 2147483648000', euTier: 'MV', extra: 'gtceu:vacuum_freezer' }
        ];
        airRecipes.forEach(rec => {
            let notConsumableList = [`kubejs:${rec.data}`];
            if (rec.extra) notConsumableList.push(rec.extra);
            addRecipe({
                machine: "electrolyzer",
                id: rec.id,
                circuit: rec.circuit,
                notConsumable: notConsumableList,
                outputFluids: rec.outputFluids,
                euTier: rec.euTier,
                duration: 1
            });
        });
        const petroRecipes = [
            { circuit: 1, outputFluids: ["gtceu:toluene 60","gtceu:benzene 180","gtceu:octane 60","gtceu:butane 80","gtceu:butene 100","gtceu:butadiene 90","gtceu:propane 80","gtceu:propene 400","gtceu:ethane 80","gtceu:ethylene 400","gtceu:methane 400","gtceu:helium 20"] },
            { circuit: 2, outputFluids: ["gtceu:toluene 40","gtceu:benzene 200","gtceu:octane 30","gtceu:butane 70","gtceu:butene 100","gtceu:butadiene 100","gtceu:propane 30","gtceu:propene 600","gtceu:ethane 130","gtceu:ethylene 1000","gtceu:methane 1000","gtceu:helium 10"] },
            { circuit: 3, outputFluids: ["gtceu:toluene 240","gtceu:benzene 1200","gtceu:octane 20","gtceu:butane 60","gtceu:butene 240","gtceu:butadiene 150","gtceu:propane 30","gtceu:propene 300","gtceu:ethane 45","gtceu:ethylene 450","gtceu:methane 450","gtceu:helium 10"] },
            { circuit: 4, outputFluids: ["gtceu:toluene 20","gtceu:benzene 100","gtceu:octane 20","gtceu:butane 120","gtceu:butene 80","gtceu:butadiene 80","gtceu:propane 140","gtceu:propene 90","gtceu:ethane 200","gtceu:ethylene 250","gtceu:methane 2000","gtceu:helium 40"] }
        ];
        petroRecipes.forEach(rec => {
            addRecipe({
                machine: "electrolyzer",
                id: `petrochemical_plant_${rec.circuit}`,
                circuit: rec.circuit,
                inputFluids: "gtceu:oil_medium 1000",
                outputFluids: rec.outputFluids,
                euTier: "MV",
                duration: 1
            });
        });
        const woodRecipes = [
            { id: 'wood_distillation_plus_1', circuit: 1, inputFluid: "gtceu:steam 1000", outputFluids: ["gtceu:naphthalene 410","gtceu:hydrogen_sulfide 307","gtceu:creosote 205","gtceu:phenol 102","gtceu:carbon_dioxide 500","gtceu:ammonia 600","gtceu:ethylbenzene 500"], itemOutputs: ["4x gtceu:dark_ash_dust"] },
            { id: 'wood_distillation_plus_2', circuit: 2, inputFluid: "minecraft:water 6000", outputFluids: ["gtceu:methane 3300","gtceu:methanol 825","gtceu:acetic_acid 137","gtceu:ammonia 550","gtceu:carbon_dioxide 2200","gtceu:creosote 560","gtceu:ethanol 825"], itemOutputs: ["6x gtceu:fertilizer"] },
            { id: 'wood_distillation_nitrogen', circuit: 0, inputFluid: "gtceu:nitrogen 1000", outputFluids: ["minecraft:water 800","gtceu:carbon 490","gtceu:methanol 480","gtceu:benzene 350","gtceu:carbon_monoxide 340","gtceu:creosote 300","gtceu:dimethylbenzene 240","gtceu:acetic_acid 160","gtceu:methane 130","gtceu:acetone 80","gtceu:phenol 75","gtceu:toluene 75","gtceu:ethylene 20","gtceu:hydrogen 20","gtceu:methyl_acetate 16","gtceu:ethanol 16"], itemOutputs: ["8x gtceu:dark_ash_dust"] }
        ];
        woodRecipes.forEach(rec => {
            addRecipe({
                machine: "electrolyzer",
                id: rec.id,
                circuit: rec.circuit === 0 ? undefined : rec.circuit,
                inputs: "16x #minecraft:logs",
                inputFluids: rec.inputFluid,
                itemOutputs: rec.itemOutputs,
                outputFluids: rec.outputFluids,
                euTier: "MV",
                duration: 1
            });
        });
        const miscRecipes = [
            { machine: "slaughterhouse", id: "slaughterhouse", circuit: 3, outputs: ["2147483647x minecraft:ender_pearl","2147483647x minecraft:sculk_sensor","2147483647x minecraft:dragon_egg","2147483647x minecraft:dragon_breath","2147483647x minecraft:chorus_fruit","2147483647x minecraft:nether_star","2147483647x minecraft:sculk_catalyst","2147483647x minecraft:sculk_shrieker","2147483647x minecraft:echo_shard","2147483647x minecraft:sculk_vein"], duration: 1 },
            { machine: "dimensionally_transcendent_plasma_forge", id: "cosmic_dust", inputs: ["10x gtceu:eternity_dust", "kubejs:cosmic_singularity"], inputFluids: "gtceu:primordialmatter 1000", outputs: "10x gtceu:cosmic_dust", euTier: "MAX", duration: 1, blastTemp: 96000 },
            { machine: "space_elevator", id: "space_elevator", circuit: 32, duration: 400 },
            { machine: "inter_stellar", id: "inter_stellar", circuit: 32, duration: 400 },
            { machine: "create_aggregation", id: "create_aggregation", circuit: 32, duration: 10 },
            { machine: "create_aggregation", id: "chain_command_block", circuit: 16, inputs: "kubejs:chain_command_block_core", outputs: "minecraft:chain_command_block", euTier: "MAX", duration: 1 },
            { machine: "create_aggregation", id: "repeating_command_block", circuit: 16, inputs: "kubejs:repeating_command_block_core", outputs: "minecraft:repeating_command_block", euTier: "MAX", duration: 1 },
            { machine: "door_of_create", id: "door_of_create", circuit: 32, duration: 10 },
            { machine: "door_of_create", id: "magmatter_block", inputs: "64x gtceu:magmatter_ingot", outputs: "gtceu:magmatter_block", euTier: "MAX", duration: 1 },
            { machine: "assembler", id: "infinity_input_dual_hatch", inputs: "4x gtmadvancedhatch:max_configurable_dual_hatch_input_16p", outputs: "gtladditions:infinity_input_dual_hatch", euTier: "OpV", duration: 1 },
            { machine: "door_of_create", id: "command_block", inputs: "gtceu:magnetohydrodynamicallyconstrainedstarmatter_block", outputs: "minecraft:command_block", euTier: "MAX", duration: 1 },
            { machine: "magic_manufacturer", id: "mana", circuit: 32, outputFluids: "gtceu:mana 2147483648000", eu: 1, duration: 1 },
            { machine: "large_chemical_reactor", id: "titanium_50", inputs: ["gtceu:titanium_dust","2x gtceu:magnesium_dust"], inputFluids: ["gtceu:hydrochloric_acid 8000","gtceu:fluorine 4000"], outputs: "2x gtceu:magnesium_dust", outputFluids: ["gtceu:titanium_50 144","gtceu:chlorine 4000"], euTier: "HV", duration: 1 },
            { machine: "large_chemical_reactor", id: "raw_crystal_chip_1", inputs: ["gtceu:emerald_dust","8x gtceu:bio_chaff"], inputFluids: ["minecraft:water 1000","gtceu:distilled_water 1000"], outputs: "gtceu:raw_crystal_chip", euTier: "HV", duration: 1 },
            { machine: "large_chemical_reactor", id: "raw_crystal_chip_2", inputs: ["gtceu:olivine_dust","8x gtceu:bio_chaff"], inputFluids: ["minecraft:water 1000","gtceu:distilled_water 1000"], outputs: "gtceu:raw_crystal_chip", euTier: "HV", duration: 1 },
            { machine: "large_chemical_reactor", id: "prepare_spacetime_soc_wafer", inputs: ["4x gtladditions:periodicium_wafer","kubejs:charged_lepton_trap_crystal","4x kubejs:nuclear_star"], inputFluids: ["gtceu:cosmic_mesh_plasma 1000","gtceu:cosmic_element 10000","gtceu:spacetime 500"], outputs: "4x gtladditions:prepare_spacetime_soc_wafer", eu: 503316480, duration: 1 },
            { machine: "fluid_solidifier", id: "memory_foam_block", notConsumable: Item.of('gtceu:programmed_circuit','{Configuration:10}').strongNBT(), inputFluids: "gtceu:viscoelastic_polyurethane_foam 1000", outputs: "kubejs:memory_foam_block", euTier: "LV", duration: 1 },
            { machine: "extractor", id: "extractor_blaze_rod", inputs: "minecraft:blaze_rod", outputFluids: "gtceu:blaze 576", euTier: "LV", duration: 1 },
            { machine: "extruder", id: "long_netherite_rod", circuit: 18, inputs: "minecraft:netherite_ingot", outputs: "kubejs:long_netherite_rod", euTier: "LV", duration: 1 },
            { machine: "cutter", id: "netherite_rod", inputs: "minecraft:netherite_ingot", outputs: "2x kubejs:netherite_rod", euTier: "LV", duration: 1 },
            { machine: "fluid_solidifier", id: "kevlar_fiber", notConsumable: Item.of('gtceu:programmed_circuit','{Configuration:7}').strongNBT(), inputFluids: "gtceu:liquidcrystalkevlar 72", outputs: "kubejs:kevlar_fiber", euTier: "LV", duration: 1 },
            { machine: "extruder", id: "special_ceramics", notConsumable: Item.of('gtceu:programmed_circuit','{Configuration:1}').strongNBT(), inputs: "2x gtceu:special_ceramics_dust", outputs: "kubejs:special_ceramics", euTier: "LV", duration: 1 },
            { machine: "space_cosmic_probe_receivers", id: "space_cosmic_probe_receivers", circuit: 32, outputFluids: ["gtceu:heavy_lepton_mixture 2147483648000","gtceu:cosmic_element 2147483648000","gtceu:starlight 2147483648000"], duration: 1 },
            { machine: "space_probe_surface_reception", id: "space_probe_surface_reception", circuit: 32, outputFluids: ["gtceu:heavy_lepton_mixture 2147483648000","gtceu:cosmic_element 2147483648000","gtceu:starlight 2147483648000"], duration: 1 },
            { shapeless: true, id: "logic_processor", inputs: ['gtceu:gold_dust', 'gtceu:silicon_dust', 'minecraft:redstone'], outputs: 'ae2:logic_processor' },
            { shapeless: true, id: "calculation_processor", inputs: ['gtceu:certus_quartz_dust', 'gtceu:silicon_dust', 'minecraft:redstone'], outputs: 'ae2:calculation_processor' },
            { shapeless: true, id: "engineering_processor", inputs: ['gtceu:diamond_dust', 'gtceu:silicon_dust', 'minecraft:redstone'], outputs: 'ae2:engineering_processor' },
            { shapeless: true, id: "infinity_biginteger_cell", inputs: ['gtlcore:mining_crystal'], outputs: 'extendedae_plus:infinity_biginteger_cell' },
            { shapeless: true, id: "glass_tube", inputs: ['minecraft:glass', '#forge:tools/knives'], outputs: 'gtceu:glass_tube' },
            { shapeless: true, id: "paper", inputs: ['#forge:tools/mallets', 'minecraft:sugar_cane'], outputs: 'minecraft:paper' },
            { shapeless: true, id: "large_steam_input_hatch", inputs: ['gtceu:steam_input_hatch'], outputs: 'gtceu:large_steam_input_hatch' },
            { shapeless: true, id: "huge_steam_input_hatch", inputs: ['gtceu:large_steam_input_hatch'], outputs: 'gtladditions:huge_steam_input_hatch' },
            { shapeless: true, id: "bronze_ingot_1", inputs: ['minecraft:copper_ingot','minecraft:copper_ingot','minecraft:copper_ingot','gtceu:tin_ingot'], outputs: '4x gtceu:bronze_ingot' },
            { shapeless: true, id: "bronze_ingot_2", inputs: ['gtceu:copper_dust','gtceu:copper_dust','gtceu:copper_dust','gtceu:tin_dust'], outputs: '4x gtceu:bronze_ingot' },
            { shapeless: true, id: "steel_ingot", inputs: ['minecraft:coal','minecraft:coal','minecraft:iron_ingot'], outputs: '3x gtceu:steel_ingot' },
            { shapeless: true, id: "steel_ingot_dust", inputs: ['gtceu:coal_dust','gtceu:coal_dust','gtceu:iron_dust'], outputs: '3x gtceu:steel_ingot' },
            { shapeless: true, id: "infinite_water_cover", inputs: ['minecraft:iron_ingot','minecraft:iron_ingot','minecraft:iron_ingot','minecraft:water_bucket','minecraft:iron_ingot','minecraft:water_bucket','minecraft:iron_ingot','minecraft:iron_ingot','minecraft:iron_ingot'], outputs: 'gtceu:infinite_water_cover' },
            { shapeless: true, id: "nether_data", inputs: ['gtlcore:world_fragments_nether','gtlcore:world_fragments_nether','gtlcore:world_fragments_nether','gtlcore:world_fragments_nether','gtlcore:mining_crystal','gtlcore:world_fragments_nether','gtlcore:world_fragments_nether','gtlcore:world_fragments_nether','gtlcore:world_fragments_nether'], outputs: 'kubejs:nether_data' },
            { shapeless: true, id: "overworld_data", inputs: ['gtlcore:world_fragments_overworld','gtlcore:world_fragments_overworld','gtlcore:world_fragments_overworld','gtlcore:world_fragments_overworld','gtlcore:mining_crystal','gtlcore:world_fragments_overworld','gtlcore:world_fragments_overworld','gtlcore:world_fragments_overworld','gtlcore:world_fragments_overworld'], outputs: 'kubejs:overworld_data' },
            { shapeless: true, id: "end_data", inputs: ['gtlcore:world_fragments_end','gtlcore:world_fragments_end','gtlcore:world_fragments_end','gtlcore:world_fragments_end','gtlcore:mining_crystal','gtlcore:world_fragments_end','gtlcore:world_fragments_end','gtlcore:world_fragments_end','gtlcore:world_fragments_end'], outputs: 'kubejs:end_data' },
            { smelting: true, id: "wrought_iron_ingot", inputs: "minecraft:iron_ingot", outputs: "gtceu:wrought_iron_ingot", smelting: { xp: 0.1, cookingTime: 1 } },
            { smelting: true, id: "annealed_copper_ingot", inputs: "minecraft:copper_ingot", outputs: "gtceu:annealed_copper_ingot", smelting: { xp: 0.1, cookingTime: 1 } }
        ];
        miscRecipes.forEach(rec => {
            if (rec.shapeless) {
                event.shapeless(rec.outputs, rec.inputs).id(`assembly_line_distorter:${rec.id}`);
                stats.addedRecipes++;
                contentCount++;
            } else if (rec.smelting) {
                event.smelting(rec.outputs, rec.inputs).xp(rec.smelting.xp).cookingTime(rec.smelting.cookingTime);
                stats.addedRecipes++;
                contentCount++;
            } else {
                addRecipe(rec);
            }
        });
        event.remove({ id: "gtceu:shapeless/dust_bronze" });
        log(`[产线扭曲者特供] 内容优化板块: 已添加 ${contentCount} 个配方`);
    })();
}

        if (TwistedLine.enablePlasmaCondenserRecipes) {
    (function() {
        let plasmaCoolCount = 0;
        Fluid.getTypes().forEach(fluid => {
            let fluidId;
            if (typeof fluid === 'string') fluidId = fluid;
            else if (fluid.getId) fluidId = fluid.getId();
            else if (fluid.getRegistryName) fluidId = fluid.getRegistryName().toString();
            else fluidId = fluid.toString();
            if (fluidId.endsWith('_plasma')) {
                const liquidId = fluidId.slice(0, -7);
                if (Fluid.exists(liquidId)) {
                    safeGt(gtr.vacuum_freezer, `assembly_line_distorter:cool_${fluidId.replace(':', '_')}`)
                        .circuit(32)
                        .inputFluids(Fluid.of(fluidId, 144))
                        .outputFluids(Fluid.of(liquidId, 144))
                        .duration(1)
                        .EUt(GTValues.VA[GTValues.HV]);
                    plasmaCoolCount++;
                    stats.addedRecipes++;
                }
            }
        });

        Fluid.getTypes().forEach(fluid => {
            let fluidId;
            if (typeof fluid === 'string') fluidId = fluid;
            else if (fluid.getId) fluidId = fluid.getId();
            else if (fluid.getRegistryName) fluidId = fluid.getRegistryName().toString();
            else fluidId = fluid.toString();
            if (!fluidId.endsWith('_plasma')) {
                const plasmaId = fluidId + '_plasma';
                if (Fluid.exists(plasmaId)) {
                    safeGt(gtr.vacuum_freezer, `assembly_line_distorter:heat_${fluidId.replace(':', '_')}_to_plasma`)
                        .circuit(31)
                        .inputFluids(Fluid.of(fluidId, 144))
                        .outputFluids(Fluid.of(plasmaId, 144))
                        .duration(1)
                        .EUt(GTValues.VA[GTValues.HV]);
                    plasmaCoolCount++;
                    stats.addedRecipes++;
                }
            }
        });

        if (Fluid.exists('gtceu:degenerate_rhenium_plasma') && Fluid.exists('gtceu:liquid_degenerate_rhenium')) {
            safeGt(gtr.vacuum_freezer, 'assembly_line_distorter:degenerate_rhenium_condenser')
                .circuit(32)
                .inputFluids('gtceu:degenerate_rhenium_plasma 144')
                .outputFluids('gtceu:liquid_degenerate_rhenium 144')
                .duration(1)
                .EUt(GTValues.VA[GTValues.HV]);
            stats.addedRecipes++;
            plasmaCoolCount++;

            safeGt(gtr.vacuum_freezer, 'assembly_line_distorter:degenerate_rhenium_heater')
                .circuit(31)
                .inputFluids('gtceu:liquid_degenerate_rhenium 144')
                .outputFluids('gtceu:degenerate_rhenium_plasma 144')
                .duration(1)
                .EUt(GTValues.VA[GTValues.HV]);
            stats.addedRecipes++;
            plasmaCoolCount++;
        }

        log(`[产线扭曲者特供] 简易等离子冷凝板块: 已添加 ${plasmaCoolCount} 个配方（冷却32 + 加热31）`);
    })();
}

        const addEyeOfHarmonyRecipes = (gtr, stats, cosmosItems, cosmosFluids) => {
            const tiers = [
                { name: 'ulv', circuit: 1, ratio: 1 / 4096, gtConstant: 'ULV' },
                { name: 'lv',  circuit: 2, ratio: 1 / 2048, gtConstant: 'LV' },
                { name: 'mv',  circuit: 3, ratio: 1 / 1024, gtConstant: 'MV' },
                { name: 'hv',  circuit: 4, ratio: 1 / 512,  gtConstant: 'HV' },
                { name: 'ev',  circuit: 5, ratio: 1 / 256,  gtConstant: 'EV' },
                { name: 'iv',  circuit: 6, ratio: 1 / 128,  gtConstant: 'IV' },
                { name: 'luv', circuit: 7, ratio: 1 / 64,   gtConstant: 'LuV' },
                { name: 'zpm', circuit: 8, ratio: 1 / 32,   gtConstant: 'ZPM' },
                { name: 'uv',  circuit: 9, ratio: 1 / 16,   gtConstant: 'UV' },
                { name: 'uhv', circuit: 10, ratio: 1 / 8,   gtConstant: 'UHV' },
                { name: 'uev', circuit: 11, ratio: 1 / 4,   gtConstant: 'UEV' },
                { name: 'uiv', circuit: 12, ratio: 1 / 2,   gtConstant: 'UIV' },
                { name: 'uxv', circuit: 13, ratio: 2 / 3,   gtConstant: 'UXV' },
                { name: 'opv', circuit: 14, ratio: 5 / 6,   gtConstant: 'OpV' },
                { name: 'max', circuit: 15, ratio: 1,       gtConstant: 'MAX' }
            ];
            const scaleItems = (items, ratio) => {
                return items.map(s => {
                    let m = s.match(/^(\d+)x\s+(.+)$/);
                    if (!m) return s;
                    let amount = Math.max(1, Math.floor(parseInt(m[1]) * ratio));
                    return `${amount}x ${m[2]}`;
                });
            };
            const scaleFluids = (fluids, ratio) => {
                return fluids.map(s => {
                    let m = s.match(/^(.+)\s+(\d+)$/);
                    if (!m) return s;
                    let amount = Math.max(1, Math.floor(parseInt(m[2]) * ratio));
                    return `${m[1]} ${amount}`;
                });
            };
            let harmonyCount = 0;
            for (let tier of tiers) {
                let id = `assembly_line_distorter:assembly_line_distorter_eye_of_harmony_core_${tier.name}`;
                let eu = GTValues.VA[GTValues[tier.gtConstant]];
                let items = scaleItems(cosmosItems, tier.ratio);
                let fluids = scaleFluids(cosmosFluids, tier.ratio);
                safeGt(gtr.large_chemical_reactor, id)
                    .circuit(tier.circuit)
                    .notConsumable("assembly_line_distorter:assembly_line_distorter_eye_of_harmony_core")
                    .itemInputs("kubejs:quantum_chromodynamic_charge")
                    .itemOutputs(items)
                    .outputFluids(fluids)
                    .EUt(eu)
                    .duration(1);
                stats.addedRecipes++;
                harmonyCount++;
            }
            return harmonyCount;
        };

        if (TwistedLine.enableExclusiveContent) {
    (function() {
        let exclusiveCount = 0;
        safeGt(gtr.assembler, "assembly_line_distorter:assembly_line_distorter_eye_of_harmony_core").circuit(32).itemInputs("gtceu:eye_of_harmony","4096x kubejs:supracausal_mainframe").itemOutputs("assembly_line_distorter:assembly_line_distorter_eye_of_harmony_core").EUt(GTValues.VA[GTValues.OpV]).duration(1); stats.addedRecipes++; exclusiveCount++;
        let maxItems = COSMOS_ITEM_IDS.map(id => `2147483647x ${id}`);
        let maxFluids = COSMOS_FLUID_IDS.map(id => `${id} 2147483648000`);
        let harmonyAdded = addEyeOfHarmonyRecipes(gtr, stats, maxItems, maxFluids);
        exclusiveCount += harmonyAdded;
        safeGt(gtr.qft, "assembly_line_distorter:assembly_line_distorter_circuits").notConsumable("64x assembly_line_distorter:assembly_line_distorter_material").itemOutputs(QIONGYU_CIRCUIT_OUTPUTS).circuit(16).EUt(GTValues.VA[GTValues.MAX]).duration(1); stats.addedRecipes++; exclusiveCount++;
        safeGt(gtr.compressor, "assembly_line_distorter:assembly_line_distorter_material").itemInputs("256x gtladditions:astral_array").itemOutputs("assembly_line_distorter:assembly_line_distorter_material").EUt(GTValues.VA[GTValues.MAX]).duration(1); stats.addedRecipes++; exclusiveCount++;
        safeGt(gtr.cosmos_simulation, "assembly_line_distorter:assembly_line_distorter_eye_of_harmony_core_cosmos_simulation").notConsumable("assembly_line_distorter:assembly_line_distorter_eye_of_harmony_core").itemInputs("kubejs:quantum_chromodynamic_charge").itemOutputs(COSMOS_ITEM_IDS.map(id => `2147483647x ${id}`)).outputFluids(COSMOS_FLUID_IDS.map(id => `${id} 2147483648000`)).duration(1); stats.addedRecipes++; exclusiveCount++;
        safeGt(gtr.cosmos_simulation, "assembly_line_distorter:assembly_line_distorter_material_cosmos_simulation").notConsumable("assembly_line_distorter:assembly_line_distorter_material").itemOutputs(COSMOS_ITEM_IDS.map(id => `2147483647x ${id}`)).outputFluids(COSMOS_FLUID_IDS.map(id => `${id} 2147483648000`)).duration(1); stats.addedRecipes++; exclusiveCount++;
        safeGt(gtr.qft, "assembly_line_distorter:assembly_line_distorter_material_qft").notConsumable("64x assembly_line_distorter:assembly_line_distorter_material").itemOutputs(COSMOS_ITEM_IDS.map(id => `2147483647x ${id}`)).outputFluids(COSMOS_FLUID_IDS.map(id => `${id} 2147483648000`)).circuit(32).duration(1); stats.addedRecipes++; exclusiveCount++;
        
        safeGt(gtr.qft, 'assembly_line_distorter:assembly_line_distorter_catalyst')
            .itemInputs("sgjourney:classic_stargate_base_block","9x sgjourney:classic_stargate_chevron_block","14x sgjourney:classic_stargate_ring_block")
            .itemOutputs("assembly_line_distorter:assembly_line_distorter_catalyst")
            .EUt(-9221474836470000000).circuit(32).duration(1).cleanroom(CleanroomType.CLEANROOM);
        stats.addedRecipes++;
        exclusiveCount++;
        log(`[产线扭曲者特供] 已添加催化剂配方`);
        
        safeGt(gtr.fragment_world_collection, 'assembly_line_distorter:assembly_line_distorter_fragments_of_the_world').notConsumable('assembly_line_distorter:assembly_line_distorter_fragments_of_the_world').circuit(24).itemOutputs(allRawOres.map(ore => `2147483647x ${ore}`)).duration(1); stats.addedRecipes++; exclusiveCount++;
        safeGt(gtr.fragment_world_collection, 'assembly_line_distorter:drill_bit_fluid_collection').notConsumable('assembly_line_distorter:assembly_line_distorter_drill_bit').outputFluids(allDimensionFluids.map(fluid => `${fluid} 2147483648000`)).duration(1); stats.addedRecipes++; exclusiveCount++;
        event.shapeless('assembly_line_distorter:assembly_line_distorter_fragments_of_the_world', ['gtceu:ulv_fragment_world_collection_machine']); exclusiveCount++; stats.addedRecipes++;
        event.shapeless('assembly_line_distorter:assembly_line_distorter_drill_bit', ['gtlcore:treasures_crystal']); exclusiveCount++; stats.addedRecipes++;
        event.shapeless(Item.of('expatternprovider:infinity_cell', '{record:{"#c":"ae2:i",id:"assembly_line_distorter:assembly_line_distorter_all_in_one_tool"}}'), ['gtceu:echoite_vajra']); exclusiveCount++; stats.addedRecipes++;
        log(`[产线扭曲者特供] 专属内容板块: 已添加 ${exclusiveCount} 个配方`);
    })();
}
        if (TwistedLine.enableSimpleAggregationRecipes) {
    (function() {
        var coreList = [
            { id: 'wyvern_core', circuit: 32, inputs: ["kubejs:draconium_dust", "gtceu:uhv_field_generator", "gtceu:quantum_eye", "gtceu:adamantine_block", "kubejs:draconic_core", "gtceu:uev_field_generator", "gtceu:quantum_star", "gtceu:orichalcum_block"], outputs: ["2x kubejs:wyvern_core"], eu: 'UIV' },
            { id: 'awakened_core', circuit: 31, inputs: ["gtceu:draconium_dust", "gtceu:uiv_field_generator", "kubejs:dragon_heart", "gtceu:vibranium_block", "kubejs:wyvern_core", "gtceu:uxv_field_generator", "gtceu:gravi_star", "gtceu:taranium_block"], outputs: ["2x kubejs:awakened_core"], eu: 'UXV' },
            { id: 'chaotic_core', circuit: 30, inputs: ["gtceu:draconium_nanoswarm", "gtceu:opv_field_generator", "kubejs:chaos_shard", "gtceu:legendarium_block", "kubejs:awakened_core", "gtlcore:max_field_generator", "kubejs:unstable_star", "gtceu:draconiumawakened_block"], outputs: ["2x kubejs:chaotic_core"], eu: 'OpV' },
            { id: 'draconic_core', circuit: 29, inputs: ["kubejs:draconium_dust", "gtceu:zpm_field_generator", "gtceu:lapotronic_energy_orb", "gtceu:mithril_block", "gtceu:hexanitrohexaaxaisowurtzitane_dust", "gtceu:uv_field_generator", "minecraft:nether_star", "gtceu:enderium_block"], outputs: ["2x kubejs:draconic_core"], eu: 'UEV' }
        ];
        let aggregationCount = 0;
        coreList.forEach(rec => {
            let builder = safeGt(gtr.assembler, `assembly_line_distorter:${rec.id}`)
                .circuit(rec.circuit)
                .itemInputs(rec.inputs)
                .itemOutputs(rec.outputs)
                .duration(1);
            if (rec.specialEu) builder.EUt(rec.specialEu);
            else builder.EUt(GTValues.VA[GTValues[rec.eu]]);
            stats.addedRecipes++;
            aggregationCount++;
        });
        safeGt(gtr.assembler, "assembly_line_distorter:reaction_chamber")
            .circuit(28)
            .itemInputs(['64x gtceu:cosmic_nanoswarm','64x gtlcore:super_glue','64x gtladditions:black_hole_seed','64x gtceu:magmatter_block','64x gtladditions:stargate_shielding_foil','4x kubejs:heartofthesmogus','64x kubejs:nuclear_star','64x gtceu:spacetime_block'])
            .itemOutputs(['2x sgjourney:reaction_chamber'])
            .duration(1)
            .EUt(36028797018963968);
        stats.addedRecipes++;
        aggregationCount++;
        log(`[产线扭曲者特供] 简易聚合装置板块: 已添加 ${aggregationCount} 个组装机配方`);
    })();
}

        if (TwistedLine.enableSimpleLineProcessing) {
    (function() {
        let simpleCount = 0;
        _simpleLineCooperiteDusts.forEach((n,i)=> { safeGt(gtr.centrifuge, `assembly_line_distorter:${n}_${i+1}`).circuit(i+1).itemInputs('1x gtceu:cooperite_dust').itemOutputs(`12x gtceu:${n}_dust`).duration(1).EUt(GTValues.VA[GTValues.HV]); stats.addedRecipes++; simpleCount++; });
        _simpleLineRareEarthDusts.forEach((n,i)=> { safeGt(gtr.centrifuge, `assembly_line_distorter:${n}_${i+1}`).circuit(i+1).itemInputs('1x gtceu:monazite_dust').itemOutputs(`12x gtceu:${n}_dust`).duration(1).EUt(GTValues.VA[GTValues.EV]); stats.addedRecipes++; simpleCount++; });

        const thoriumProducts = [
            { name: 'plutonium', circuit: 1 },
            { name: 'polonium', circuit: 2 },
            { name: 'uranium', circuit: 3 },
            { name: 'protactinium', circuit: 4 },
            { name: 'radium', circuit: 5 },
            { name: 'lead', circuit: 6 },
            { name: 'barium', circuit: 7 },
            { name: 'strontium', circuit: 8 },
            { name: 'thorium', circuit: 9 },
            { name: 'neptunium', circuit: 10 }
        ];
        thoriumProducts.forEach(p => {
            safeGt(gtr.centrifuge, `assembly_line_distorter:thorium_${p.name}`)
                .circuit(p.circuit)
                .itemInputs('1x gtceu:uraninite_dust')
                .itemOutputs(`12x gtceu:${p.name}_dust`)
                .duration(1)
                .EUt(GTValues.VA[GTValues.IV]);
            stats.addedRecipes++;
            simpleCount++;
        });

        log(`[产线扭曲者特供] 产线简易处理板块: 已添加 ${simpleCount} 个离心配方`);
    })();
}

        if (TwistedLine.enableAlloyBlastSmelterRecipes) {
    (function() {
        event.remove({type:'gtceu:alloy_blast_smelter'});
        let alloyCount = 0;
        ALLOY_BLAST_RECIPES.forEach(recipe => { 
            let [id, items, fluids, circ, out, eu, temp] = recipe;
            
            if (id === 'custom_ruridit' && !TwistedLine.enableGTCEUElementCompletion) {
                return;
            }

            if (id === 'custom_liquid_ruridit') {
                if (TwistedLine.enableGTCEUElementCompletion) return;
                if (!isGTLAdditions31) return;
            }
            
            let builder = safeGt(gtr.alloy_blast_smelter, `assembly_line_distorter:${id}`);
            if (items) builder.itemInputs(items);
            if (fluids) fluids.forEach(f => builder.inputFluids(f));
            if (circ !== null) builder.circuit(circ);
            builder.outputFluids(out).duration(1).EUt(eu).blastFurnaceTemp(temp);
            stats.addedRecipes++;
            alloyCount++;
        });
        log(`[产线扭曲者特供] 合金冶炼炉板块: 已添加 ${alloyCount} 个配方`);
    })();
}

        if (TwistedLine.enableFurnaceBlastAcceleration) {
    (function() {
        let counts = { smelting: 0, blasting: 0 };
        ['minecraft:smelting', 'minecraft:blasting'].forEach(type => {
            event.forEachRecipe({ type: type }, r => {
                let i = r.originalRecipeIngredients, o = r.originalRecipeResult;
                event.remove({ id: r.getId() });
                if (type === 'minecraft:smelting') {
                    event.smelting(o, i).cookingTime(1).xp(0.7);
                } else {
                    event.blasting(o, i).cookingTime(1).xp(0.7);
                }
                counts[type.split(':')[1]]++;
            });
        });
        log(`[产线扭曲者特供] 熔炉高炉加速: 已修改 ${counts.smelting} 熔炉 + ${counts.blasting} 高炉配方`);
    })();
}

        let loadTime = Date.now() - scriptStartTime;
        stats.loadTimeMs = loadTime;
        log(`[产线扭曲者特供] 脚本加载耗时 ${loadTime} ms，总计新增配方 ${stats.addedRecipes} 个`);
        TwistedLine.blast_stats = stats;
    });

    ServerEvents.tags('item', event => {
        if (!TwistedLine.enableBlastScript) return;
        let lensColors = ['glass','black','red','green','brown','blue','purple','cyan','light_gray','gray','pink','lime','yellow','light_blue','magenta','orange','nether_star'];
        lensColors.forEach((c, i) => {
            let itemId = c === 'glass' ? 'gtceu:glass_lens' : (c === 'nether_star' ? 'gtceu:nether_star_lens' : `gtceu:${c}_glass_lens`);
            event.add(`kubejs:laser_${i+1}`, itemId);
        });
    });

    ServerEvents.loaded(event => { let stats=TwistedLine.blast_stats; if(!stats) return; event.server.getPlayers().forEach(p=>{ if(!stats.enabled) p.tell(Text.gold("§l[Especial para Line Twister] ⚡ Script de receita especial desativado")); else p.tell(Text.gold("§l[Especial para Line Twisters] ⚡ O script de receita especial entrou em vigor!\n → Tempo de carregamento:"+stats.loadTimeMs+"senhora\n → Nova receita:"+stats.addedRecipes)); }); });

    PlayerEvents.loggedIn(event => {
    let p = event.player, stats = TwistedLine.blast_stats, cfg = TwistedLine.blast_config || {};
    p.tell("§d======================================\n §l[Especial para quem tem linhas de produção torcidas] §eAutor: Ogawa §f| QQ de feedback §b: 2700644513");
    if (!stats || !stats.enabled) {
        p.tell("§l⚠ Nenhuma modificação especial de receita aplicada");
    } else {
        p.tell("§l⚡ Status de modificação de receita especial\n┌─────────────────── ────────────────────\n│▪ Tempo de carregamento: §a" + stats.loadTimeMs + "ms §7| Novo: §a" + stats.addedRecipes + "│▪ Global: §ahabilitado\n├─────────────────── ────────────────────");
        p.tell("└─────────────────────────────────────────");
        p.tell("§e⚡ Digite §6/assembly_line_distorter §epara visualizar todos os status da chave e comandos de comutação (permissão OP necessária)");
    }
    if (TwistedLine.enableBlastScript && TwistedLine.enableTimeAcceleration) {
        let d = p.persistentData;
        if (d.get("ttw_enabled") == null) d.putBoolean("ttw_enabled", false);
        if (d.get("ttw_tier") == null) d.putInt("ttw_tier", 0);
        let cur = SPEED_TIER[d.getInt("ttw_tier")];
        p.tell("§6\"Tempo e Espaço∞ Tecnologia de Overclocking\"" + (d.getBoolean("ttw_enabled") ? "§aestá ativado∞" : "§cnão está ativado∞") + "| Engrenagem:" + cur.name + " §7(" + cur.range + "grade)\n Operação §e: Chave K | Shift+K shift");
    } else if (!TwistedLine.enableBlastScript) {
        p.tell(Text.red("O recurso de aceleração de tempo foi desativado pela chave mestre"));
    } else if (!TwistedLine.enableTimeAcceleration) {
        p.tell(Text.red("A aceleração do tempo foi desativada"));
    }
    p.tell("§d=====================================");
});

    PlayerEvents.tick(event=>{
        let p=event.player;
        if(!p) return;
        if(TwistedLine.enableBlastScript && TwistedLine.enableFlight){
            if(!p.abilities.mayfly) { p.abilities.mayfly=true; p.onUpdateAbilities(); }
            if(p.abilities.flying!==true && !p.onGround) { p.abilities.flying=true; p.onUpdateAbilities(); }
        }
        if(TwistedLine.enableBlastScript && TwistedLine.enableInvulnerable) {
            if(!p.invulnerable) p.invulnerable=true;
        }
        if(!TwistedLine.enableBlastScript || !TwistedLine.enableTimeAcceleration) return;
        let d=p.persistentData;
        if(!d.getBoolean("ttw_enabled")) return;
        for(let off of OFFSETS){
            let pos=new BlockPos(p.blockX+off[0], p.blockY+off[1], p.blockZ+off[2]);
            if(!p.level.isLoaded(pos)) continue;
            let bid=p.level.getBlock(pos).id;
            if(bid.startsWith('gtceu:')||bid.startsWith('gtladditions:')){
                let rl=getRecipeLogicAt(p.level,pos);
                if(rl && rl.isWorking()) finishMachine(rl);
            }
        }
    });

    NetworkEvents.dataReceived('ttw_toggle_pressed', e=>{ if(!TwistedLine.enableBlastScript||!TwistedLine.enableTimeAcceleration) return; let p=e.player; if(!p) return; let d=p.persistentData; let cur=d.getBoolean('ttw_enabled'); d.putBoolean('ttw_enabled',!cur); p.setStatusMessage(!cur?'§6『Tecnologia de Overclocking do Espaço-Tempo』 §a⚡ O motor central foi acionado com sucesso∞ e a taxa de fluxo do espaço-tempo está cheia!':'§6"Tecnologia de overclocking do espaço-tempo∞" §c⚡ O motor central desliga em uma emergência e o espaço-tempo retorna à taxa de fluxo normal!'); p.playSound(!cur?'minecraft:item.nether_star.use':'minecraft:item.nether_star.break'); });
    NetworkEvents.dataReceived('ttw_tier_cycle', e=>{ if(!TwistedLine.enableBlastScript||!TwistedLine.enableTimeAcceleration) return; let p=e.player; if(!p) return; let d=p.persistentData; let newTier=(d.getInt("ttw_tier")+1)%SPEED_TIER.length; let old=SPEED_TIER[d.getInt("ttw_tier")], nw=SPEED_TIER[newTier]; d.putInt("ttw_tier",newTier); initOffsets(nw.range); p.setStatusMessage(`§d『∞次元档位跃迁』§f从${old.name}§f跃迁至§6${nw.name}§f！${nw.tip} §7(${nw.range}格领域解锁)`); p.playSound('minecraft:block.ender_chest.open'); p.playSound('minecraft:entity.ender_dragon.flap',0.8,1.5); });

    BlockEvents.rightClicked('expatternprovider:fishbig', e => {
        if (e.level.isClientSide()) return;
        if (e.hand !== 'MAIN_HAND') return;
        if (e.player.getMainHandItem().getId() !== 'assembly_line_distorter:assembly_line_distorter_catalyst') return;
        e.player.give('gtceu:creative_chest');
        e.player.tell('§5Você obteve §dCaixa de Criação §5Este é o presente do fim');
        e.cancel();
    });
})();

(function() {
    var SWITCHES = [
        { key: "enableBlastScript", name: "interruptor mestre global", cmd: "situação geral", desc: "Chave mestre global, false irá pular todas as modificações da receita" },
        { key: "enableSimpleIngotProcessing", name: "Fácil manuseio do tablet", cmd: "Lingote simples", desc: "Seção simples de processamento de lingotes" },
        { key: "enableSimpleLineProcessing", name: "Processamento simples da linha de produção", cmd: "Linha de produção simples", desc: "Seção de processamento simples da linha de produção" },
        { key: "enableFluidSolidifierAll", name: "solidificador fluido", cmd: "Dispositivo de cura", desc: "Seção de solidificador de fluido" },
        { key: "enableExtractorOverride", name: "Máquina de extração", cmd: "Máquina de extração", desc: "Seção da máquina de extração" },
        { key: "enableMoldAndSpecialRecipes", name: "Circuito de substituição de molde", cmd: "Mofo", desc: "Moldes substituídos por blocos de circuitos programados" },
        { key: "enableLensReplacement", name: "Circuito de substituição de lente", cmd: "lente", desc: "Lente substituída por bloco de circuito de programação" },
        { key: "enableTimeAcceleration", name: "aceleração do hiperespaço", cmd: "tempo e espaço", desc: "Seção de aceleração do hiperespaço" },
        { key: "enableFusionRecipes", name: "fusão nuclear", cmd: "fusão", desc: "Setor de reatores de fusão nuclear" },
        { key: "enableParticleColliderRecipes", name: "colisão de partículas", cmd: "Colisão", desc: "placa de colisão de superpartículas" },
        { key: "enableGeneratorRecipes", name: "Explosão para gerar eletricidade", cmd: "gerar eletricidade", desc: "Setor de geração de energia explosiva" },
        { key: "enableCircuitPackRecipes", name: "embalagem de circuito", cmd: "pacote de circuito", desc: "Seção de empacotamento de circuito de bancada" },
        { key: "enableFurnaceBlastAcceleration", name: "aceleração do forno", cmd: "aceleração do forno", desc: "Telhas de aceleração de forno e alto-forno" },
        { key: "enableComponentPackRecipes", name: "pacote de componentes", cmd: "pacote de componentes", desc: "Seção do pacote de componentes" },
        { key: "enableInfinityCellRecipes", name: "componentes infinitos", cmd: "componentes infinitos", desc: "Seção de componentes ilimitados" },
        { key: "enableGTLAdditionsUpgrade", name: "Atualização de Adições GTLA", cmd: "gtladd", desc: "Seção de atualização GTLAdditions" },
        { key: "enableDistortRecipes", name: "ativação de nêutrons", cmd: "nêutron", desc: "Seção de ativação de nêutrons" },
        { key: "enableStellarForgeRecipes", name: "remover jarro", cmd: "jarra", desc: "Remova o ladrilho do jarro" },
        { key: "enableContentOptimizationRecipes", name: "Otimização de conteúdo", cmd: "otimização", desc: "Seção de otimização de conteúdo" },
        { key: "enableFlight", name: "voo", cmd: "voo", desc: "Seção de vôo" },
        { key: "enableInvulnerable", name: "Invencível", cmd: "Invencível", desc: "Seção invencível" },
        { key: "enableExclusiveContent", name: "conteúdo exclusivo", cmd: "Exclusivo", desc: "Seção de conteúdo exclusivo para twisters de linha de produção" },
        { key: "enableAlloyBlastSmelterRecipes", name: "Forno de fundição de liga", cmd: "forno de liga", desc: "Seção de jateamento de forno de fundição de liga" },
        { key: "enableSimpleAggregationRecipes", name: "Dispositivo de polimerização simples", cmd: "polimerização", desc: "Seção de dispositivo de agregação simples" },
        { key: "enablePlasmaCondenserRecipes", name: "Condensação de plasma simples", cmd: "plasma", desc: "Placa de condensação de plasma simples" },
        { key: "enableGTCEUElementCompletion", name: "Conclusão do elemento GTCEu", cmd: "conclusão do elemento", desc: "Chave de conclusão de elemento GTCEu" },
        { key: "enableLogReport", name: "relatório de registro", cmd: "registro", desc: "Controle todas as estatísticas e registros da seção uniformemente com esta opção." },
        { key: "enableGtDistortedAePack", name: "Pacote de componentes GT Twisted AE", cmd: "gt torcido ae", desc: "Interruptor de módulo do pacote de componentes GT Twisted AE" },
        { key: "enableGTLsupbRecipes", name: "Síntese GTLsupb", cmd: "gtlsupb", desc: "Chave do módulo de receita de síntese da máquina GTLsupb" }
    ];

    function readConfig() {
        try {
            var config = JsonIO.read('kubejs/config/[config]Especial para linha de produção twisters.json');
            if (typeof config !== 'object') config = {};
            return config;
        } catch(e) {
            return {};
        }
    }

    function writeConfig(config) {
        JsonIO.write('kubejs/config/[config]Especial para linha de produção twisters.json', config);
    }

    ServerEvents.commandRegistry(function(event) {
        var Commands = event.commands;

        event.register(Commands.literal("assembly_line_distorter").then(Commands.literal("help").executes(function(ctx) {
            var player = ctx.getSource().getPlayer();
            if (!player) return 1;
            player.tell("§l=== Lista de comandos do Twister da linha de produção ===");
            player.tell("§e/assembly_line_distorter §7- Exibe todos os estados da chave");
            player.tell("§e/assembly_line_distorter help §7- Mostrar esta ajuda");
            for (var i = 0; i < SWITCHES.length; i++) {
                var sw = SWITCHES[i];
                player.tell("§e/assembly_line_distorter_" + sw.cmd + "§7- Trocar" + sw.name + "：" + sw.desc);
            }
            return 1;
        })));

        event.register(Commands.literal("assembly_line_distorter").executes(function(ctx) {
            var player = ctx.getSource().getPlayer();
            if (!player || !player.isOp()) {
                if (player) player.tell("§cVocê não tem permissão para usar este comando!");
                return 1;
            }
            var config = readConfig();
            player.tell("§l=== Status do módulo twister da linha de produção ===");
            var hasAny = false;
            for (var i = 0; i < SWITCHES.length; i++) {
                var sw = SWITCHES[i];
                var val = config[sw.key];
                if (val === undefined) continue;
                hasAny = true;
                var color = val ? "§a" : "§c";
                var status = val ? "✔ Ligue" : "✘ Fechar";
                var desc = config["_comment_" + sw.key] || sw.desc;
                player.tell(color + sw.key + " : " + status + " §7- " + desc);
            }
            if (!hasAny) player.tell("§7(sem itens de configuração)");
            player.tell("Arquivo de configuração §7: kubejs/config/[config]Especial para linha de produção twisters.json");
            player.tell("§eDigite /assembly_line_distorter help para visualizar todos os comandos disponíveis");
            return 1;
        }));

        for (var i = 0; i < SWITCHES.length; i++) {
            var sw = SWITCHES[i];
            var cmdName = "assembly_line_distorter_" + sw.cmd;
            (function(sw) {
                event.register(Commands.literal(cmdName).executes(function(ctx) {
                    var player = ctx.getSource().getPlayer();
                    if (!player || !player.isOp()) {
                        if (player) player.tell("§cVocê não tem permissão para usar este comando!");
                        return 1;
                    }
                    var config = readConfig();
                    var current = config[sw.key];
                    if (current === undefined) current = true;
                    var newVal = !current;
                    config[sw.key] = newVal;
                    writeConfig(config);
                    if (global.TwistedLine) global.TwistedLine[sw.key] = newVal;
                    player.tell("§acomutado" + sw.name + " : " + (newVal ? "ligar" : "encerramento") + " §7- " + sw.desc);
                    return 1;
                }));
            })(sw);
        }
    });
})();