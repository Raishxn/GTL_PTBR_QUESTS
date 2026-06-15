(function() {
    let TwistedLine = global.TwistedLine = global.TwistedLine || {};
    let scriptStartTime = Date.now();
    let config;
    try { config = JsonIO.read('kubejs/config/[config]Special for production line twisters.json'); if (config == null || typeof config !== 'object') throw new Error(); }
    catch(e) { config = { enableBlastScript: true, enableSimpleIngotProcessing: true, enableSimpleLineProcessing: true, enableFluidSolidifierAll: true, enableExtractorOverride: true, enableMoldAndSpecialRecipes: true, enableLensReplacement: true, enableTimeAcceleration: true, enableFusionRecipes: true, enableParticleColliderRecipes: true, enableGeneratorRecipes: true, enableCircuitPackRecipes: true, enableFurnaceBlastAcceleration: true, enableComponentPackRecipes: true, enableInfinityCellRecipes: true, enableGTLAdditionsUpgrade: true, enableDistortRecipes: true, enableStellarForgeRecipes: true, enableContentOptimizationRecipes: true, enableFlight: true, enableInvulnerable: true, enableExclusiveContent: true, enableAlloyBlastSmelterRecipes: true, enableSimpleAggregationRecipes: true }; }
    for (let k in config) TwistedLine[k] = config[k];
    TwistedLine.blast_config = config;

    console.log('[Special Offer for Line Twisters] ⚡ Special recipe script is loading...');
    console.log(`[产线扭曲者特供] 全局启用: ${TwistedLine.enableBlastScript} | 时间加速: ${TwistedLine.enableTimeAcceleration}`);

    const SPEED_TIER = [{name:"Star Core Beginner",range:3,tip:"⚡ Lingering light, primary space-time resonance"},{name:"Nebula Intermediate",range:6,tip:"⚡ The nebula flows and the intermediate dimensions fold"},{name:"Galaxy Advanced",range:9,tip:"⚡ Galaxy surges, high-level time and space jumps"},{name:"Star Dome Ultimate",range:12,tip:"⚡ The starry sky explodes and the ultimate time is annihilated"}];
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
    const QIONGYU_TIERS = ["ulv","lv","mv","hv","ev","iv","luv","zpm","uv","uhv","uev","uiv","uxv","opv","max"];
    const QIONGYU_CIRCUIT_OUTPUTS = QIONGYU_TIERS.map(t=>`2147483647x assembly_line_distorter:assembly_line_distorter_circuits_${t}`);
    const ALLOY_BLAST_RECIPES = [["converted_hastelloyk_243",["5x gtceu:hastelloyx_78_dust","2x gtceu:niobium_nitride_dust","4x gtceu:tritanium_dust","4x gtceu:tungsten_carbide_dust","1x gtceu:promethium_dust","1x gtceu:mendelevium_dust","1x gtceu:praseodymium_dust","1x gtceu:holmium_dust"],null,8,"gtceu:hastelloyk_243 2736",125829120,17200],["converted_naquadriatictaranium",["1x gtceu:naquadria_dust","1x gtceu:taranium_dust"],null,2,"gtceu:naquadriatictaranium 288",125829120,16200],["converted_titanium_tungsten_carbide",["2x gtceu:titanium_carbide_dust","1x gtceu:tungsten_carbide_dust"],null,2,"gtceu:titanium_tungsten_carbide 432",1920,3800],["converted_black_steel",["1x gtceu:nickel_dust","1x gtceu:black_bronze_dust","3x gtceu:steel_dust"],null,3,"gtceu:black_steel 720",120,1200],["converted_naquadah_alloy",["2x gtceu:naquadah_dust","1x gtceu:osmiridium_dust","1x gtceu:trinium_dust"],null,3,"gtceu:naquadah_alloy 576",30720,7200],["converted_fluxed_electrum",["1x gtceu:soldering_alloy_dust","1x gtceu:infused_gold_dust","1x gtceu:naquadah_dust","1x gtceu:astral_silver_dust","1x gtceu:red_steel_dust","1x gtceu:blue_steel_dust","1x gtceu:sterling_silver_dust","1x gtceu:rose_gold_dust"],null,8,"gtceu:fluxed_electrum 1152",1920,10400],["converted_molybdenum_disilicide",["1x gtceu:molybdenum_dust","2x gtceu:silicon_dust"],null,2,"gtceu:molybdenum_disilicide 432",1920,2300],["converted_vibramantium",["1x gtceu:vibranium_dust","3x gtceu:adamantium_dust"],null,2,"gtceu:vibramantium 576",125829120,18800],["converted_red_alloy",["1x gtceu:copper_dust","4x minecraft:redstone"],null,5,"gtceu:red_alloy 144",16,1400],["converted_niobium_nitride",["1x gtceu:niobium_dust"],["gtceu:nitrogen 1000"],1,"gtceu:niobium_nitride 288",120,2846],["converted_electrum",["1x gtceu:gold_dust","1x gtceu:silver_dust"],null,2,"gtceu:electrum 288",16,1285],["converted_lafium",["8x gtceu:hastelloy_n_dust","4x gtceu:naquadah_dust","2x gtceu:samarium_dust","4x gtceu:tungsten_dust","6x gtceu:aluminium_dust","2x gtceu:nickel_dust","2x gtceu:carbon_dust"],null,7,"gtceu:lafium 4032",1920,9865],["converted_bismuth_bronze",["1x gtceu:bismuth_dust","1x gtceu:zinc_dust","3x gtceu:copper_dust"],null,3,"gtceu:bismuth_bronze 720",120,1100],["converted_mercury_barium_calcium_cuprate",["2x gtceu:barium_dust","2x gtceu:calcium_dust","3x gtceu:copper_dust"],["gtceu:mercury 1000","gtceu:oxygen 8000"],5,"gtceu:mercury_barium_calcium_cuprate 2304",480,3300],["converted_ruthenium_trinium_americium_neutronate",["1x gtceu:ruthenium_dust","2x gtceu:trinium_dust","1x gtceu:americium_dust","2x gtceu:neutronium_dust"],["gtceu:oxygen 8000"],5,"gtceu:ruthenium_trinium_americium_neutronate 2016",120,10800],["converted_niobium_titanium",["1x gtceu:niobium_dust","1x gtceu:titanium_dust"],null,2,"gtceu:niobium_titanium 288",480,4500],["converted_magnesium_diboride",["1x gtceu:magnesium_dust","2x gtceu:boron_dust"],null,2,"gtceu:magnesium_diboride 432",480,2500],["converted_germaniumtungstennitride",["3x gtceu:germanium_dust","3x gtceu:tungsten_dust"],["gtceu:nitrogen 10000"],3,"gtceu:germaniumtungstennitride 2304",30720,8200],["converted_ultimet",["5x gtceu:cobalt_dust","2x gtceu:chromium_dust","1x gtceu:nickel_dust","1x gtceu:molybdenum_dust"],null,4,"gtceu:ultimet 1296",480,2700],["converted_hsla_steel",["2x gtceu:invar_dust","1x gtceu:vanadium_dust","1x gtceu:titanium_dust","1x gtceu:molybdenum_dust"],null,4,"gtceu:hsla_steel 720",480,1711],["converted_vanadium_steel",["1x gtceu:vanadium_dust","1x gtceu:chromium_dust","7x gtceu:steel_dust"],null,3,"gtceu:vanadium_steel 1296",120,1453],["converted_brass",["3x gtceu:copper_dust","1x gtceu:zinc_dust"],null,4,"gtceu:brass 576",16,1160],["converted_vibrant_alloy",["1x gtceu:energetic_alloy_dust","1x gtceu:ender_pearl_dust"],null,2,"gtceu:vibrant_alloy 288",480,2375],["converted_rtm_alloy",["4x gtceu:ruthenium_dust","2x gtceu:tungsten_dust","1x gtceu:molybdenum_dust"],null,3,"gtceu:rtm_alloy 1008",1920,3000],["converted_trinium_titanium",["2x gtceu:trinium_dust","1x gtceu:titanium_dust"],null,2,"gtceu:trinium_titanium 432",31457280,14400],["converted_superheavy_h_alloy",["1x gtceu:copernicium_dust","1x gtceu:nihonium_dust","1x gtceu:flerovium_dust","1x gtceu:moscovium_dust","1x gtceu:livermorium_dust","1x gtceu:tennessine_dust","1x gtceu:oganesson_dust"],null,7,"gtceu:superheavy_h_alloy 1008",120,10600],["converted_rose_gold",["1x gtceu:copper_dust","4x gtceu:gold_dust"],null,2,"gtceu:rose_gold 720",120,1600],["converted_potin",["6x gtceu:copper_dust","2x gtceu:tin_dust","1x gtceu:lead_dust"],null,9,"gtceu:potin 1296",16,1084],["converted_samarium_iron_arsenic_oxide",["1x gtceu:samarium_dust","1x gtceu:iron_dust","1x gtceu:arsenic_dust"],["gtceu:oxygen 1000"],4,"gtceu:samarium_iron_arsenic_oxide 576",1920,5200],["converted_hastelloyx_78",["10x gtceu:naquadah_alloy_dust","5x gtceu:rhenium_dust","4x gtceu:naquadria_dust","4x gtceu:tritanium_dust","1x gtceu:tungsten_carbide_dust","1x gtceu:promethium_dust","1x gtceu:mendelevium_dust","1x gtceu:praseodymium_dust"],null,8,"gtceu:hastelloyx_78 3888",7864320,14400],["converted_manganese_phosphide",["1x gtceu:manganese_dust","1x gtceu:phosphorus_dust"],null,2,"gtceu:manganese_phosphide 288",120,1200],["converted_hikarium",["18x gtceu:lumiium_dust","8x gtceu:silver_dust","4x gtceu:sunnarium_dust"],null,3,"gtceu:hikarium 4320",1966080,17800],["converted_rhodium_plated_palladium",["3x gtceu:palladium_dust","1x gtceu:rhodium_dust"],null,2,"gtceu:rhodium_plated_palladium 576",7680,4500],["converted_pikyonium",["8x gtceu:inconel_792_dust","5x gtceu:eglin_steel_dust","4x gtceu:enriched_naquadah_dust","3x gtceu:cerium_dust","2x gtceu:antimony_dust","2x gtceu:platinum_dust","1x gtceu:ytterbium_dust","4x gtceu:tungsten_steel_dust"],null,8,"gtceu:pikyonium 4176",122880,10400],["converted_gallium_arsenide",["1x gtceu:arsenic_dust","1x gtceu:gallium_dust"],null,2,"gtceu:gallium_arsenide 288",120,1200],["converted_hsss",["6x gtceu:hssg_dust","2x gtceu:iridium_dust","1x gtceu:osmium_dust"],null,3,"gtceu:hsss 1296",1920,5000],["converted_hsse",["6x gtceu:hssg_dust","1x gtceu:cobalt_dust","1x gtceu:manganese_dust","1x gtceu:silicon_dust"],null,4,"gtceu:hsse 1296",1920,5000],["converted_hssg",["5x gtceu:tungsten_steel_dust","1x gtceu:chromium_dust","2x gtceu:molybdenum_dust","1x gtceu:vanadium_dust"],null,4,"gtceu:hssg 1296",1920,4200],["converted_tin_alloy",["1x gtceu:iron_dust","1x gtceu:tin_dust"],null,2,"gtceu:tin_alloy 288",16,1258],["converted_blue_alloy",["1x gtceu:silver_dust","4x gtceu:electrotine_dust"],null,5,"gtceu:blue_alloy 144",16,1400],["converted_cobalt_brass",["7x gtceu:brass_dust","1x gtceu:aluminium_dust","1x gtceu:cobalt_dust"],null,9,"gtceu:cobalt_brass 1296",16,1202],["converted_stainless_steel",["6x gtceu:iron_dust","1x gtceu:chromium_dust","1x gtceu:manganese_dust","1x gtceu:nickel_dust"],null,4,"gtceu:stainless_steel 1296",480,1700],["converted_uranium_rhodium_dinaquadide",["1x gtceu:uranium_dust","1x gtceu:rhodium_dust","2x gtceu:naquadah_dust"],null,3,"gtceu:uranium_rhodium_dinaquadide 576",7680,9000],["converted_enriched_naquadah_trinium_europium_duranide",["4x gtceu:enriched_naquadah_dust","3x gtceu:trinium_dust","2x gtceu:europium_dust","1x gtceu:duranium_dust"],null,4,"gtceu:enriched_naquadah_trinium_europium_duranide 1440",30720,9900],["converted_tantalloy_61",["13x gtceu:tantalum_dust","12x gtceu:tungsten_dust","6x gtceu:titanium_dust","4x gtceu:yttrium_dust"],null,4,"gtceu:tantalloy_61 5040",30720,6900],["converted_woods_glass",["6x gtceu:soda_ash_dust","3x gtceu:silicon_dioxide_dust","3x gtceu:garnierite_dust","1x gtceu:barium_sulfide_dust"],null,4,"gtceu:woods_glass 1872",120,3600],["converted_highurabilityompoundteel",["12x gtceu:tungsten_steel_dust","9x gtceu:hsss_dust","6x gtceu:hssg_dust","3x gtceu:ruridit_dust","2x gtceu:magneto_resonatic_dust","1x gtceu:plutonium_dust"],null,6,"gtceu:highurabilityompoundteel 4752",491520,12600],["converted_borosilicate_glass",["7x gtceu:glass_dust","1x gtceu:boron_dust"],null,8,"gtceu:borosilicate_glass 1152",16,1921],["converted_sterling_silver",["1x gtceu:copper_dust","4x gtceu:silver_dust"],null,2,"gtceu:sterling_silver 720",120,1700],["converted_maraging_steel_300",["16x gtceu:iron_dust","1x gtceu:titanium_dust","1x gtceu:aluminium_dust","4x gtceu:nickel_dust","2x gtceu:cobalt_dust"],null,5,"gtceu:maraging_steel_300 3456",1920,4000],["converted_cupronickel",["1x gtceu:copper_dust","1x gtceu:nickel_dust"],null,2,"gtceu:cupronickel 288",16,1542],["converted_tantalum_carbide",["1x gtceu:tantalum_dust","1x gtceu:carbon_dust"],null,2,"gtceu:tantalum_carbide 288",1920,4120],["converted_indalloy_140",["47x gtceu:bismuth_dust","25x gtceu:lead_dust","13x gtceu:tin_dust","10x gtceu:cadmium_dust","5x gtceu:indium_dust"],null,5,"gtceu:indalloy_140 14400",1920,2600],["converted_fall_king",["1x gtceu:lithium_dust","1x gtceu:cobalt_dust","1x gtceu:platinum_dust","1x gtceu:erbium_dust"],["gtceu:helium 1000"],5,"gtceu:fall_king 720",120,5400],["converted_proto_halkonite",["4x gtceu:transcendentmetal_dust","4x gtceu:tairitsu_dust","4x gtceu:tartarite_dust","2x gtceu:titan_precision_steel_dust","2x gtceu:eternity_dust"],["gtceu:dimensionallytranscendentresidue 576"],null,"gtladditions:proto_halkonite 1152",503320000,48000],["converted_black_titanium",["26x gtceu:titanium_dust","6x gtceu:lanthanum_dust","4x gtceu:tungsten_dust","3x gtceu:cobalt_dust","2x gtceu:manganese_dust","2x gtceu:phosphorus_dust","2x gtceu:palladium_dust","1x gtceu:niobium_dust"],["gtceu:argon 5000"],9,"gtceu:black_titanium 7344",125829120,18900],["converted_red_steel",["1x gtceu:sterling_silver_dust","1x gtceu:bismuth_bronze_dust","2x gtceu:steel_dust","4x gtceu:black_steel_dust"],null,4,"gtceu:red_steel 1152",480,1300],["converted_hastelloy_c_276",["12x gtceu:nickel_dust","8x gtceu:molybdenum_dust","7x gtceu:chromium_dust","1x gtceu:tungsten_dust","1x gtceu:cobalt_dust","1x gtceu:copper_dust"],null,6,"gtceu:hastelloy_c_276 4320",1920,3800],["converted_titanium_carbide",["1x gtceu:titanium_dust","1x gtceu:carbon_dust"],null,2,"gtceu:titanium_carbide 288",1920,3430],["converted_mar_m_200_steel",["2x gtceu:niobium_dust","9x gtceu:chromium_dust","5x gtceu:aluminium_dust","2x gtceu:titanium_dust","10x gtceu:cobalt_dust","13x gtceu:tungsten_dust","18x gtceu:nickel_dust"],null,7,"gtceu:mar_m_200_steel 8496",7680,4600],["converted_bronze",["3x gtceu:copper_dust","1x gtceu:tin_dust"],null,4,"gtceu:bronze 576",16,1357],["converted_silicon_carbide",["1x gtceu:silicon_dust","1x gtceu:carbon_dust"],null,2,"gtceu:silicon_carbide 288",480,4800],["converted_tairitsu",["8x gtceu:tungsten_dust","7x gtceu:naquadria_dust","4x gtceu:trinium_dust","4x gtceu:carbon_dust","3x gtceu:vanadium_dust","1x gtceu:plutonium_dust"],null,6,"gtceu:tairitsu 3888",122880,12100],["converted_indium_tin_barium_titanium_cuprate",["4x gtceu:indium_dust","2x gtceu:tin_dust","2x gtceu:barium_dust","1x gtceu:titanium_dust","7x gtceu:copper_dust"],["gtceu:oxygen 14000"],6,"gtceu:indium_tin_barium_titanium_cuprate 2304",7680,6000],["converted_yttrium_barium_cuprate",["1x gtceu:yttrium_dust","2x gtceu:barium_dust","3x gtceu:copper_dust"],["gtceu:oxygen 7000"],4,"gtceu:yttrium_barium_cuprate 1872",120,4500],["converted_stellite",["9x gtceu:cobalt_dust","9x gtceu:chromium_dust","5x gtceu:manganese_dust","2x gtceu:titanium_dust"],null,4,"gtceu:stellite 3600",1920,4310],["converted_lumiium",["2x gtceu:sterling_silver_dust","4x gtceu:tin_alloy_dust","2x gtceu:luminessence_dust"],null,3,"gtceu:lumiium 1152",120,5400],["converted_artherium_sn",["12x gtceu:tin_dust","7x gtceu:actinium_dust","5x gtceu:enriched_naquadah_trinium_europium_duranide_dust","4x gtceu:caesium_dust","3x gtceu:osmiridium_dust"],null,5,"gtceu:artherium_sn 4464",7680,9800],["converted_energetic_alloy",["2x gtceu:gold_dust","1x minecraft:redstone","1x minecraft:glowstone_dust"],null,3,"gtceu:energetic_alloy 576",120,1650],["converted_soldering_alloy",["6x gtceu:tin_dust","3x gtceu:lead_dust","1x gtceu:antimony_dust"],null,10,"gtceu:soldering_alloy 1440",16,544],["converted_rareearth",["1x gtceu:scandium_dust","1x gtceu:yttrium_dust","1x gtceu:lanthanoids_1_dust","1x gtceu:lanthanoids_2_dust"],null,4,"gtceu:rareearth 576",1966080,12400],["converted_aluminium_bronze",["1x gtceu:aluminium_dust","6x gtceu:bronze_dust"],null,2,"gtceu:aluminium_bronze 1008",120,1200],["converted_tungsten_steel",["1x gtceu:steel_dust","1x gtceu:tungsten_dust"],null,2,"gtceu:tungsten_steel 288",1920,3000],["converted_zeron_100",["10x gtceu:iron_dust","2x gtceu:nickel_dust","2x gtceu:tungsten_dust","1x gtceu:niobium_dust","1x gtceu:cobalt_dust"],null,5,"gtceu:zeron_100 2304",1920,3693],["converted_dalisenite",["3x gtceu:erbium_dust","10x gtceu:tungsten_dust","1x gtceu:naquadah_dust","9x gtceu:niobium_titanium_dust","7x gtceu:quantanium_dust","14x gtceu:rhodium_plated_palladium_dust","1x gtceu:tanmolyium_dust"],null,7,"gtceu:dalisenite 6480",7680,12400],["converted_nickel_zinc_ferrite",["1x gtceu:nickel_dust","1x gtceu:zinc_dust","4x gtceu:iron_dust"],["gtceu:oxygen 8000"],6,"gtceu:nickel_zinc_ferrite 864",120,1500],["converted_incoloy_ma_956",["4x gtceu:vanadium_steel_dust","2x gtceu:manganese_dust","5x gtceu:aluminium_dust","2x gtceu:yttrium_dust"],null,4,"gtceu:incoloy_ma_956 1872",1920,3652],["converted_osmiridium",["3x gtceu:iridium_dust","1x gtceu:osmium_dust"],null,2,"gtceu:osmiridium 576",30720,4500],["converted_battery_alloy",["4x gtceu:lead_dust","1x gtceu:antimony_dust"],null,5,"gtceu:battery_alloy 720",16,660],["converted_eglin_steel",["4x gtceu:iron_dust","1x gtceu:kanthal_dust","5x gtceu:invar_dust","1x gtceu:sulfur_dust","1x gtceu:silicon_dust","1x gtceu:carbon_dust"],null,6,"gtceu:eglin_steel 1872",120,1048],["converted_superheavy_l_alloy",["1x gtceu:rutherfordium_dust","1x gtceu:dubnium_dust","1x gtceu:seaborgium_dust","1x gtceu:bohrium_dust","1x gtceu:hassium_dust","1x gtceu:meitnerium_dust","1x gtceu:darmstadtium_dust","1x gtceu:roentgenium_dust"],null,8,"gtceu:superheavy_l_alloy 1152",120,10600],["converted_abyssalalloy",["5x gtceu:stainless_steel_dust","5x gtceu:tungsten_carbide_dust","5x gtceu:nichrome_dust","5x gtceu:bronze_dust","5x gtceu:incoloy_ma_956_dust","1x gtceu:iodine_dust","1x gtceu:germanium_dust","1x gtceu:hafnium_dust"],["gtceu:radon 1000","gtceu:barnarda_air 1000"],10,"gtceu:abyssalalloy 4320",491520,10800],["converted_stellite_100",["4x gtceu:iron_dust","3x gtceu:chromium_dust","2x gtceu:tungsten_dust","1x gtceu:molybdenum_dust"],null,4,"gtceu:stellite_100 1440",1920,3790],["converted_titansteel",["4x gtceu:titanium_tungsten_carbide_dust","1x gtceu:plutonium_241_dust","2x gtceu:einsteinium_dust","1x gtceu:rhenium_dust","1x gtceu:erbium_dust","3x gtceu:jasper_dust"],["gtceu:uu_amplifier 1000"],7,"gtceu:titansteel 1872",1966080,12600],["converted_cinobite",["8x gtceu:zeron_100_dust","4x gtceu:naquadria_dust","3x gtceu:terbium_dust","2x gtceu:aluminium_dust","1x gtceu:tin_dust","6x gtceu:titanium_dust","1x gtceu:osmiridium_dust"],["gtceu:mercury 1000"],8,"gtceu:cinobite 3744",31457280,15400],["converted_nichrome",["4x gtceu:nickel_dust","1x gtceu:chromium_dust"],null,2,"gtceu:nichrome 720",480,2700],["converted_kanthal",["1x gtceu:iron_dust","1x gtceu:aluminium_dust","1x gtceu:chromium_dust"],null,3,"gtceu:kanthal 432",480,1800],["converted_periodicium",["1x gtceu:metalloid_dust","1x gtceu:poor_dust","1x gtceu:transition_dust","1x gtceu:alkaline_earth_dust","1x gtceu:rareearth_dust","1x gtceu:alkaline_dust","1x gtceu:actinoids_dust"],["gtceu:not_found 1000","gtceu:noble_gas 1000"],9,"gtceu:periodicium 1296",7864320,15200],["converted_blue_steel",["1x gtceu:rose_gold_dust","1x gtceu:brass_dust","2x gtceu:steel_dust","4x gtceu:black_steel_dust"],null,4,"gtceu:blue_steel 1152",480,1400],["converted_enderite",["3x gtceu:enderium_dust","2x gtceu:ender_pearl_dust","1x gtceu:manganese_phosphide_dust","1x gtceu:magnesium_diboride_dust","1x gtceu:mercury_barium_calcium_cuprate_dust","1x gtceu:uranium_triplatinum_dust","1x gtceu:samarium_iron_arsenic_oxide_dust","1x gtceu:indium_tin_barium_titanium_cuprate_dust"],null,8,"gtceu:enderite 1584",7864320,14400],["converted_hastelloy_n_75",["15x gtceu:nickel_dust","9x gtceu:molybdenum_dust","4x gtceu:chromium_dust","2x gtceu:titanium_dust","2x gtceu:erbium_dust"],null,5,"gtceu:hastelloy_n_75 4608",1920,4550],["converted_arceusalloy2b",["3x gtceu:trinium_dust","4x gtceu:maraging_steel_300_dust","1x gtceu:orichalcum_dust","2x gtceu:nether_star_dust","2x gtceu:tungsten_steel_dust","1x gtceu:osmiridium_dust","2x gtceu:strontium_dust"],null,7,"gtceu:arceusalloy2b 2160",122880,14200],["converted_uranium_triplatinum",["1x gtceu:uranium_dust","3x gtceu:platinum_dust"],null,2,"gtceu:uranium_triplatinum 576",1920,4400],["converted_invar",["2x gtceu:iron_dust","1x gtceu:nickel_dust"],null,3,"gtceu:invar 432",16,1916],["converted_titan_precision_steel",["3x gtceu:titansteel_dust","1x gtceu:ytterbium_dust","1x gtceu:perditio_crystal_dust","1x gtceu:earth_crystal_dust","1x gtceu:ignis_crystal_dust"],null,5,"gtceu:titan_precision_steel 1008",491520,16000],["converted_transition",["1x gtceu:transition_1_dust","1x gtceu:transition_2_dust","1x gtceu:transition_3_dust"],null,3,"gtceu:transition 432",1966080,13600],["converted_grisium",["9x gtceu:titanium_dust","9x gtceu:carbon_dust","9x gtceu:potassium_dust","9x gtceu:lithium_dust","9x gtceu:sulfur_dust"],["gtceu:hydrogen 5000"],6,"gtceu:grisium 7200",120,4850],["converted_zirconium_carbide",["1x gtceu:zirconium_dust","1x gtceu:carbon_dust"],null,2,"gtceu:zirconium_carbide 288",1920,6800],["converted_black_bronze",["1x gtceu:gold_dust","1x gtceu:silver_dust","3x gtceu:copper_dust"],null,3,"gtceu:black_bronze 720",120,2000],["converted_tungsten_carbide",["1x gtceu:tungsten_dust","1x gtceu:carbon_dust"],null,2,"gtceu:tungsten_carbide 288",480,3058],["converted_watertight_steel",["7x gtceu:iron_dust","4x gtceu:aluminium_dust","2x gtceu:nickel_dust","1x gtceu:chromium_dust","1x gtceu:sulfur_dust"],null,5,"gtceu:watertight_steel 2160",1920,3850],["converted_vanadium_gallium",["3x gtceu:vanadium_dust","1x gtceu:gallium_dust"],null,2,"gtceu:vanadium_gallium 576",1920,4500],["converted_magnalium",["1x gtceu:magnesium_dust","2x gtceu:aluminium_dust"],null,3,"gtceu:magnalium 432",16,929],["converted_quantum",["15x gtceu:stellite_dust","3x gtceu:quantanium_dust","2x gtceu:jasper_dust","5x gtceu:gallium_dust","5x gtceu:americium_dust","5x gtceu:palladium_dust","5x gtceu:germanium_dust","5x gtceu:silicon_carbide_dust"],null,8,"gtceu:quantum 6480",1920,11400],["converted_hastelloy_n",["2x gtceu:iridium_dust","4x gtceu:molybdenum_dust","2x gtceu:chromium_dust","2x gtceu:titanium_dust","15x gtceu:nickel_dust"],null,5,"gtceu:hastelloy_n 3600",1920,4350],["converted_hastelloy_x",["8x gtceu:nickel_dust","3x gtceu:iron_dust","4x gtceu:tungsten_dust","2x gtceu:molybdenum_dust","1x gtceu:chromium_dust","1x gtceu:niobium_dust"],null,6,"gtceu:hastelloy_x 2736",1920,4200],["converted_inconel_625",["8x gtceu:nickel_dust","6x gtceu:chromium_dust","4x gtceu:molybdenum_dust","4x gtceu:niobium_dust","3x gtceu:titanium_dust","2x gtceu:iron_dust","2x gtceu:aluminium_dust"],null,7,"gtceu:inconel_625 4176",7680,4850],["converted_tanmolyium",["5x gtceu:titanium_dust","5x gtceu:molybdenum_dust","2x gtceu:vanadium_dust","3x gtceu:chromium_dust","1x gtceu:aluminium_dust"],null,5,"gtceu:tanmolyium 2304",1920,4300],["converted_inconel_792",["2x gtceu:nickel_dust","1x gtceu:niobium_dust","2x gtceu:aluminium_dust","1x gtceu:nichrome_dust"],null,4,"gtceu:inconel_792 864",120,5200],["converted_reactor_steel",["15x gtceu:iron_dust","1x gtceu:niobium_dust","4x gtceu:vanadium_dust","2x gtceu:carbon_dust"],null,4,"gtceu:reactor_steel 3168",480,3800],["custom_draconiumawakened", ["kubejs:quantum_chromodynamic_charge"], ["gtceu:draconium 1000"], null, "gtceu:draconiumawakened 1000", 2147483647, 800],["custom_adamantium", ["4x gtceu:orichalcum_dust","6x gtceu:antimony_dust","8x gtceu:iron_dust","24x gtceu:bloodstone_dust"], ["gtceu:mercury 1000","gtceu:tin 1024"], 6, "gtceu:adamantium 2304", 33554432, 800],["custom_celestialtungsten", ["gtceu:titan_precision_steel_dust","2x gtceu:americium_dust","4x gtceu:tartarite_dust","4x gtceu:tungsten_dust"], ["gtceu:astraltitanium 144","gtceu:xenon 1000"], 6, "gtceu:celestialtungsten 1000", 33554432, 800],["custom_astraltitanium", ["4x gtceu:force_dust","4x gtceu:titanium_dust","2x gtceu:cobalt_dust","2x gtceu:copper_dust"], ["gtceu:tritium 1000"], 5, "gtceu:astraltitanium 1000", 33554432, 800],["custom_creon", ["40x gtceu:fermium_dust","40x gtceu:thorium_dust","40x gtceu:calcium_dust"], ["gtceu:celestialtungsten 2304","gtceu:dimensionallytranscendentresidue 2736"], 5, "gtladditions:creon 1000", 2147483647, 800],["custom_ruridit", ["2x gtceu:ruthenium_dust","1x gtceu:iridium_dust"], null, 2, "gtladditions:liquid_ruridit 432", 960, 4500],["custom_legendarium", ["4x gtceu:naquadriatictaranium_dust","2x gtceu:trinium_dust","2x gtceu:duranium_dust","2x gtceu:orichalcum_dust","2x gtceu:mithril_dust","2x gtceu:tritanium_dust","2x gtceu:adamantine_dust","2x gtceu:vibranium_dust"], ["gtceu:neutronium 1000","gtceu:heavy_lepton_mixture 1000","gtceu:adamantium 288"], 11, "gtceu:legendarium 2304", 134217728, 800],["custom_phonon_medium", ["15x gtceu:magneto_resonatic_dust","47x gtceu:metastable_oganesson_dust","35x gtceu:praseodymium_dust","60x gtceu:echoite_dust"], ["gtladditions:phonon_crystal_solution 4000"], 5, "gtladditions:phonon_medium 1000", 125829120, 800],["custom_mellion", ["11x gtceu:tritanium_dust","11x gtceu:rubidium_dust","7x gtceu:highurabilityompoundteel_dust","13x gtceu:tartarite_dust","8x gtceu:jasper_dust","13x avaritia:infinity_catalyst"], ["gtceu:dimensionallytranscendentresidue 5000"], null, "gtladditions:mellion 7200", 425829120, 800]];
    const _simpleLineCooperiteDusts = ['rhodium','platinum','palladium','iridium','ruthenium','osmium'];
    const _simpleLineRareEarthDusts = ['yttrium','lutetium','scandium','ytterbium','thulium','erbium','holmium','dysprosium','terbium','gadolinium','praseodymium','europium','samarium','promethium','neodymium','cerium','lanthanum'];
    const EXTRACTOR_BAD_PARTS = ['_plate','_double_plate','_dense_plate','_rod','_long_rod','_bolt','_screw','_ring','_spring','_gear','_small_gear','_wire','_fine_wire','_cable','_rotor','_turbine_blade','_frame','_pipe','_fluid_pipe','_item_pipe','_foil','_block','_nugget','_round'];
    const EXTRACTOR_WHITELIST = ['ingot','dust','gem','raw','ore','gtceu:kevlar_plate','gtceu:reinforced_epoxy_resin_plate'];

    ServerEvents.recipes(event => {
        if (!TwistedLine.enableBlastScript) {
            TwistedLine.blast_stats = { enabled: false, loadTimeMs: Date.now() - scriptStartTime };
            console.log('[Special for Production Line Twisters] Recipe modification skipped due to the global switch being turned off.');
            return;
        }
        const gtr = event.recipes.gtceu;
        let stats = { enabled: true, addedRecipes: 0, loadTimeMs: 0 };

        const CASTING_MOLDS = ["ingot","plate","gear","small_gear","credit","bottle","nugget","ball","cylinder","block","anvil","name","rotor","pill"];
        const EXTRUDER_MOLDS = ["plate","rod","ingot","block","gear","small_gear","ring","bolt","wire","cell","tiny_pipe","small_pipe","normal_pipe","large_pipe","huge_pipe","bottle","foil","long_rod","rotor"];
        const FIELD_SHAPES = ["ingot","ball"];
        const LENS_COLORS = ['glass','black','red','green','brown','blue','purple','cyan','light_gray','gray','pink','lime','yellow','light_blue','magenta','orange'];

        function addSpacetimeWire(factor, ingotCount, wireSuffix) {
            gtr.wiremill(`assembly_line_distorter:spacetime_wire_${factor}x`).itemInputs(`${ingotCount}x gtceu:spacetime_ingot`).itemOutputs(`gtceu:spacetime_${wireSuffix}_wire`).circuit(factor).EUt(GTValues.VA[GTValues.MAX]).duration(1);
        }
        function registerSpaceProbe(mt) { gtr[mt](`assembly_line_distorter:${mt}`).circuit(32).outputFluids("gtceu:heavy_lepton_mixture 2147483648000","gtceu:cosmic_element 2147483648000","gtceu:starlight 2147483648000").duration(1); }

        if (TwistedLine.enableSimpleIngotProcessing) {
            let hotCount = 0;
            hotCount += event.countRecipes({ type: 'gtceu:vacuum_freezer', input: /gtceu:hot_.*_ingot/ });
            hotCount += event.countRecipes({ type: 'gtceu:antientropy_condensation', input: /gtceu:hot_.*_ingot/ });
            hotCount += event.countRecipes({ type: 'gtceu:electric_blast_furnace', output: /gtceu:hot_.*_ingot/ });
            hotCount += event.countRecipes({ type: 'gtceu:chemical_bath', input: /gtceu:hot_.*_ingot/ });
            hotCount += event.countRecipes({ type: 'gtceu:chemical_bath', output: /gtceu:hot_.*_ingot/ });
            event.remove({ type: 'gtceu:vacuum_freezer', input: /gtceu:hot_.*_ingot/ });
            event.remove({ type: 'gtceu:antientropy_condensation', input: /gtceu:hot_.*_ingot/ });
            event.remove({ type: 'gtceu:electric_blast_furnace', output: /gtceu:hot_.*_ingot/ });
            event.remove({ type: 'gtceu:chemical_bath', input: /gtceu:hot_.*_ingot/ });
            event.remove({ type: 'gtceu:chemical_bath', output: /gtceu:hot_.*_ingot/ });
            console.log(`[产线扭曲者特供] ① 已移除 ${hotCount} 个热锭相关配方`);

            let removedBlastCount = event.countRecipes({ type: 'gtceu:electric_blast_furnace', output: /gtceu:(?!nickel_zinc_ferrite_ingot$).*_ingot/ });
            event.remove({ type: 'gtceu:electric_blast_furnace', output: /gtceu:(?!(?:nickel_zinc_ferrite_ingot|polycaprolactam_ingot)$).*_ingot/ });
            console.log(`[产线扭曲者特供] ② 已移除 ${removedBlastCount} 个电力高炉粉→锭配方`);

            let addedCount = 0;
            Ingredient.of('#forge:ingots').getItemIds().forEach(ingotId => {
                let dustId = ingotId.replace('_ingot', '_dust');
                if (dustId === ingotId) dustId = ingotId + '_dust';
                if (!Ingredient.of(dustId).isEmpty()) {
                    try {
                        let safeId = ingotId.replace(':', '_');
                        gtr.chemical_bath(`assembly_line_distorter:cb_${safeId}_to_ingot`).itemInputs(dustId).itemOutputs("1x "+ingotId).EUt(GTValues.VA[GTValues.LV]).duration(1);
                        gtr.vacuum_freezer(`assembly_line_distorter:vf_${safeId}_to_ingot`).itemInputs(dustId).itemOutputs("1x "+ingotId).EUt(GTValues.VA[GTValues.MV]).duration(1);
                        addedCount += 2; stats.addedRecipes += 2;
                    } catch(e) {}
                }
            });
            try {
                gtr.chemical_bath('assembly_line_distorter:cb_neutron_pile_to_ingot').itemInputs('avaritia:neutron_pile').itemOutputs("1x avaritia:neutron_ingot").EUt(GTValues.VA[GTValues.LV]).duration(1);
                gtr.vacuum_freezer('assembly_line_distorter:vf_neutron_pile_to_ingot').itemInputs('avaritia:neutron_pile').itemOutputs("1x avaritia:neutron_ingot").EUt(GTValues.VA[GTValues.MV]).duration(1);
                addedCount += 2; stats.addedRecipes += 2;
            } catch(e) {}
            console.log(`[产线扭曲者特供] ③ 已添加 ${addedCount} 个粉→锭配方`);
        }

        if (TwistedLine.enableMoldAndSpecialRecipes) {
            let moldImpact = 0;
            CASTING_MOLDS.forEach(m=> moldImpact+=event.countRecipes({input:`gtceu:${m}_casting_mold`}));
            EXTRUDER_MOLDS.forEach(m=> moldImpact+=event.countRecipes({input:`gtceu:${m}_extruder_mold`}));
            FIELD_SHAPES.forEach(s=> moldImpact+=event.countRecipes({input:`kubejs:${s}_field_shape`}));
            CASTING_MOLDS.forEach((m,i)=> event.replaceInput({}, `gtceu:${m}_casting_mold`, Item.of('gtceu:programmed_circuit',`{Configuration:${i+1}}`).strongNBT()));
            EXTRUDER_MOLDS.forEach((m,i)=> event.replaceInput({}, `gtceu:${m}_extruder_mold`, Item.of('gtceu:programmed_circuit',`{Configuration:${i+1}}`).strongNBT()));
            FIELD_SHAPES.forEach((s,i)=> event.replaceInput({}, `kubejs:${s}_field_shape`, Item.of('gtceu:programmed_circuit',`{Configuration:${i+1}}`).strongNBT()));
            console.log('[Special for those with production line distortion] ④ The mold/field shape has been replaced with a programming circuit, affecting approx.'+moldImpact+'recipes');

            gtr.dimensionally_transcendent_plasma_forge("assembly_line_distorter:fanbeishikong").notConsumable(Item.of('gtceu:programmed_circuit','{Configuration:1}').strongNBT()).inputFluids("gtceu:spacetime 144").itemOutputs("1x gtceu:spacetime_ingot").outputFluids("gtceu:dimensionallytranscendentresidue 144").EUt(GTValues.VA[GTValues.MAX]).duration(1).blastFurnaceTemp(96000); stats.addedRecipes++;
            gtr.sps_crafting("assembly_line_distorter:magmatter_ingot").circuit(32).inputFluids("gtceu:mana 100000", "gtceu:magmatter 100").itemInputs("minecraft:netherite_ingot").itemOutputs("gtceu:magmatter_ingot").EUt(4 * GTValues.VA[GTValues.MAX]).duration(1); stats.addedRecipes++;
            gtr.sps_crafting("assembly_line_distorter:magmatter_ingot_d").circuit(32).inputFluids("gtceu:mana 10000", "gtceu:magmatter 10").itemInputs("gtceu:magmatter_dust", "minecraft:netherite_ingot").itemOutputs("gtceu:magmatter_ingot").EUt(4 * GTValues.VA[GTValues.MAX]).duration(1); stats.addedRecipes++;
            gtr.dimensionally_transcendent_plasma_forge("assembly_line_distorter:spacetime_ingot").circuit(32).inputFluids("gtceu:spacetime 1000", "gtceu:raw_star_matter_plasma 1000").outputFluids("gtceu:dimensionallytranscendentresidue 100").itemOutputs("8x gtceu:spacetime_ingot").EUt(GTValues.VA[GTValues.MAX]).duration(1).blastFurnaceTemp(62000); stats.addedRecipes++;
            gtr.sps_crafting("assembly_line_distorter:attuned_tengam_ingot").circuit(32).itemInputs("gtceu:attuned_tengam_dust").inputFluids("gtceu:mana 1000").itemOutputs("gtceu:attuned_tengam_ingot").EUt(GTValues.VA[GTValues.UIV]).duration(1); stats.addedRecipes++;
            gtr.fluid_solidifier("assembly_line_distorter:pellet_antimatter").circuit(31).inputFluids("gtceu:antimatter 1000").itemOutputs("kubejs:pellet_antimatter").EUt(GTValues.VA[GTValues.UV]).duration(1); stats.addedRecipes++;
            gtr.plasma_condenser("assembly_line_distorter:neutronium_sphere").circuit(31).inputFluids("gtceu:liquid_helium 32000").outputFluids("gtceu:helium 32000").itemInputs("kubejs:neutron_plasma_containment_cell").itemOutputs("4x kubejs:neutronium_sphere", "kubejs:plasma_containment_cell").EUt(GTValues.VA[GTValues.UHV]).duration(1); stats.addedRecipes++;
            gtr.plasma_condenser("assembly_line_distorter:iron_ingot").circuit(32).inputFluids("gtceu:iron_plasma 144", "gtceu:liquid_helium 14400").outputFluids("gtceu:helium 14400").itemOutputs("minecraft:iron_ingot").EUt(GTValues.VA[GTValues.UHV]).duration(1); stats.addedRecipes++;
            gtr.plasma_condenser("assembly_line_distorter:nickel_ingot").circuit(32).inputFluids("gtceu:nickel_plasma 144", "gtceu:liquid_helium 14400").outputFluids("gtceu:helium 14400").itemOutputs("gtceu:nickel_ingot").EUt(GTValues.VA[GTValues.UHV]).duration(1); stats.addedRecipes++;
            gtr.fluid_solidifier("assembly_line_distorter:degenerate_rhenium_plate").notConsumable(Item.of('gtceu:programmed_circuit','{Configuration:2}').strongNBT()).inputFluids("gtceu:liquid_degenerate_rhenium 144").itemOutputs("1x gtceu:degenerate_rhenium_plate").EUt(7).duration(1); stats.addedRecipes++;
        }

        if (TwistedLine.enableLensReplacement) {
            let lensImpact = 0;
            for(let i = 1; i <= LENS_COLORS.length; i++) {
                lensImpact += event.countRecipes({input: `#kubejs:laser_${i}`});
            }
            for(let i = 1; i <= LENS_COLORS.length; i++) {
                let circuitConfig = 33 - i;
                event.replaceInput(
                    r => { let t = r.getType(); return t !== 'gtceu:assembly_line' && t !== 'gtceu:extractor'; },
                    `#kubejs:laser_${i}`,
                    Item.of('gtceu:programmed_circuit', `{Configuration:${circuitConfig}}`).strongNBT()
                );
            }

            gtr.dimensional_focus_engraving_array("assembly_line_distorter:raw_photon_carrying_wafer").itemInputs("kubejs:rutherfordium_neutronium_wafer").circuit(32).inputFluids("gtceu:photoresist 100").itemOutputs("kubejs:raw_photon_carrying_wafer").EUt(GTValues.VA[GTValues.UHV]).duration(1); stats.addedRecipes++;
            gtr.dimensional_focus_engraving_array("assembly_line_distorter:prepared_cosmic_soc_wafer").itemInputs("kubejs:taranium_wafer").circuit(31).inputFluids("gtceu:gamma_rays_photoresist 100").itemOutputs("kubejs:prepared_cosmic_soc_wafer").EUt(GTValues.VA[GTValues.UIV]).duration(1); stats.addedRecipes++;
            gtr.dimensional_focus_engraving_array("assembly_line_distorter:high_precision_crystal_soc").itemInputs("gtceu:crystal_soc").circuit(30).inputFluids("gtceu:euv_photoresist 100").itemOutputs("kubejs:high_precision_crystal_soc").EUt(GTValues.VA[GTValues.UEV]).duration(1); stats.addedRecipes++;
            gtr.dimensional_focus_engraving_array("assembly_line_distorter:nm_wafer").itemInputs("kubejs:rutherfordium_neutronium_wafer").circuit(29).inputFluids("gtceu:photoresist 100").itemOutputs("kubejs:nm_wafer").EUt(GTValues.VA[GTValues.UV]).duration(1); stats.addedRecipes++;
            gtr.dimensional_focus_engraving_array("assembly_line_distorter:pm_wafer").itemInputs("kubejs:taranium_wafer").circuit(28).inputFluids("gtceu:euv_photoresist 100").itemOutputs("kubejs:pm_wafer").EUt(GTValues.VA[GTValues.UHV]).duration(1); stats.addedRecipes++;
            gtr.dimensional_focus_engraving_array("assembly_line_distorter:fm_wafer").itemInputs("kubejs:pm_wafer").circuit(27).inputFluids("gtceu:gamma_rays_photoresist 100").itemOutputs("kubejs:fm_wafer").EUt(GTValues.VA[GTValues.UEV]).duration(1); stats.addedRecipes++;
            gtr.dimensional_focus_engraving_array("assembly_line_distorter:fullerene_dust2").itemInputs("gtceu:unfolded_fullerene_dust").circuit(26).inputFluids("gtceu:euv_photoresist 5").itemOutputs("gtceu:fullerene_dust").duration(1).EUt(7864320); stats.addedRecipes++;
            gtr.dimensional_focus_engraving_array("assembly_line_distorter:lanthanum_embedded_fullerene_dust2").itemInputs("2x gtceu:lanthanum_fullerene_mix_dust").circuit(25).inputFluids("gtceu:euv_photoresist 5").itemOutputs("2x gtceu:lanthanum_embedded_fullerene_dust").duration(1).EUt(7864320); stats.addedRecipes++;
            gtr.precision_laser_engraver("assembly_line_distorter:prepared_cosmic_soc_wafer").itemInputs("kubejs:taranium_wafer").circuit(32).inputFluids("gtceu:gamma_rays_photoresist 1000").itemOutputs("kubejs:prepared_cosmic_soc_wafer").EUt(GTValues.VA[GTValues.UIV]).duration(1); stats.addedRecipes++;
            gtr.precision_laser_engraver("assembly_line_distorter:high_precision_crystal_soc").itemInputs("gtceu:crystal_soc").circuit(31).inputFluids("gtceu:euv_photoresist 1000").itemOutputs("kubejs:high_precision_crystal_soc").EUt(GTValues.VA[GTValues.UEV]).duration(1); stats.addedRecipes++;
            gtr.precision_laser_engraver("assembly_line_distorter:nm_wafer").itemInputs("kubejs:rutherfordium_neutronium_wafer").circuit(30).inputFluids("gtceu:photoresist 1000").itemOutputs("kubejs:nm_wafer").EUt(GTValues.VA[GTValues.UV]).duration(1); stats.addedRecipes++;
            gtr.precision_laser_engraver("assembly_line_distorter:pm_wafer").itemInputs("kubejs:taranium_wafer").circuit(29).inputFluids("gtceu:euv_photoresist     ").itemOutputs("kubejs:pm_wafer").EUt(GTValues.VA[GTValues.UHV]).duration(1); stats.addedRecipes++;
            gtr.precision_laser_engraver("assembly_line_distorter:fm_wafer").itemInputs("kubejs:pm_wafer").circuit(28).itemOutputs("kubejs:fm_wafer").EUt(GTValues.VA[GTValues.UEV]).duration(1); stats.addedRecipes++;
            gtr.precision_laser_engraver("assembly_line_distorter:raw_photon_carrying_wafer").itemInputs("kubejs:rutherfordium_neutronium_wafer").circuit(27).itemOutputs("kubejs:raw_photon_carrying_wafer").inputFluids("gtceu:photoresist 1000").EUt(GTValues.VA[GTValues.UHV]).duration(1); stats.addedRecipes++;
            gtr.laser_engraver("assembly_line_distorter:fullerene_dust").itemInputs("gtceu:unfolded_fullerene_dust").circuit(32).inputFluids("gtceu:nitrogen 10000").itemOutputs("gtceu:fullerene_dust").outputFluids("gtceu:ammonia 10000").EUt(2000000).duration(1); stats.addedRecipes++;
            gtr.laser_engraver("assembly_line_distorter:exotic_wafer").circuit(31).itemInputs("gtceu:highly_advanced_soc_wafer").itemOutputs("kubejs:exotic_wafer").EUt(GTValues.VA[GTValues.UHV]).duration(1); stats.addedRecipes++;
            gtr.laser_engraver("assembly_line_distorter:diffractor_grating_mirror").itemInputs("kubejs:photocoated_hassium_wafer").circuit(30).itemOutputs("kubejs:diffractor_grating_mirror").EUt(GTValues.VA[GTValues.UIV]).duration(1); stats.addedRecipes++;
            gtr.laser_engraver("assembly_line_distorter:ilc_wafer").itemInputs("kubejs:taranium_wafer").circuit(29).itemOutputs("64x gtceu:ilc_wafer").EUt(122880).duration(1); stats.addedRecipes++;
            gtr.laser_engraver("assembly_line_distorter:ram_wafer").itemInputs("kubejs:taranium_wafer").circuit(28).itemOutputs("64x gtceu:ram_wafer").EUt(122880).duration(1); stats.addedRecipes++;
            gtr.laser_engraver("assembly_line_distorter:lpic_wafer").itemInputs("kubejs:taranium_wafer").circuit(27).itemOutputs("64x gtceu:lpic_wafer").EUt(122880).duration(1); stats.addedRecipes++;
            gtr.laser_engraver("assembly_line_distorter:simple_soc_wafer").itemInputs("kubejs:taranium_wafer").circuit(26).itemOutputs("64x gtceu:simple_soc_wafer").EUt(122880).duration(1); stats.addedRecipes++;
            gtr.laser_engraver("assembly_line_distorter:ulpic_wafer").itemInputs("kubejs:taranium_wafer").circuit(25).itemOutputs("64x gtceu:ulpic_wafer").EUt(122880).duration(1); stats.addedRecipes++;
            gtr.laser_engraver("assembly_line_distorter:cpu_wafer").itemInputs("kubejs:taranium_wafer").circuit(24).itemOutputs("64x gtceu:cpu_wafer").EUt(122880).duration(1); stats.addedRecipes++;
            gtr.laser_engraver("assembly_line_distorter:soc_wafer").itemInputs("kubejs:taranium_wafer").circuit(23).itemOutputs("32x gtceu:soc_wafer").EUt(122880).duration(1); stats.addedRecipes++;
            gtr.laser_engraver("assembly_line_distorter:nor_memory_wafer").itemInputs("kubejs:taranium_wafer").circuit(22).itemOutputs("32x gtceu:nor_memory_wafer").EUt(122880).duration(1); stats.addedRecipes++;
            gtr.laser_engraver("assembly_line_distorter:mpic_wafer").itemInputs("kubejs:taranium_wafer").circuit(21).itemOutputs("32x gtceu:mpic_wafer").EUt(122880).duration(1); stats.addedRecipes++;
            gtr.laser_engraver("assembly_line_distorter:nand_memory_wafer").itemInputs("kubejs:taranium_wafer").circuit(20).itemOutputs("32x gtceu:nand_memory_wafer").EUt(122880).duration(1); stats.addedRecipes++;
            gtr.laser_engraver("assembly_line_distorter:advanced_soc_wafer").itemInputs("kubejs:taranium_wafer").circuit(19).itemOutputs("8x gtceu:advanced_soc_wafer").EUt(122880).duration(1); stats.addedRecipes++;
            gtr.laser_engraver("assembly_line_distorter:highly_advanced_soc_wafer").itemInputs("kubejs:taranium_wafer").circuit(18).itemOutputs("4x gtceu:highly_advanced_soc_wafer").EUt(122880).duration(1); stats.addedRecipes++;
            gtr.laser_engraver("assembly_line_distorter:lanthanum_embedded_fullerene_dust").itemInputs("2x gtceu:lanthanum_fullerene_mix_dust").circuit(17).inputFluids("gtceu:nitrogen 10000").itemOutputs("2x gtceu:lanthanum_embedded_fullerene_dust").outputFluids("gtceu:ammonia 10000").EUt(1966080).duration(1); stats.addedRecipes++;
            gtr.nano_forge("assembly_line_distorter:carbon_nanoswarm").circuit(32).itemInputs("64x gtceu:carbon_block", "64x gtceu:soc").itemOutputs("64x gtceu:carbon_nanoswarm").inputFluids("gtceu:soldering_alloy 20000", "gtceu:lubricant 20000").duration(1).EUt(GTValues.VA[GTValues.UV]).addData("nano_forge_tier", 1); stats.addedRecipes++;
            gtr.nano_forge("assembly_line_distorter:glowstone_nanoswarm").circuit(31).itemInputs("64x minecraft:glowstone", "64x gtceu:advanced_soc").itemOutputs("64x gtceu:glowstone_nanoswarm").inputFluids("gtceu:uu_amplifier 10000", "gtceu:soldering_alloy 20000", "gtceu:lubricant 20000").duration(1).EUt(GTValues.VA[GTValues.UV]).addData("nano_forge_tier", 1); stats.addedRecipes++;
            gtr.nano_forge("assembly_line_distorter:copper_nanoswarm").circuit(30).itemInputs("8x minecraft:copper_block", "8x gtceu:soc").itemOutputs("gtceu:copper_nanoswarm").inputFluids("gtceu:naquadah 2000", "gtceu:soldering_alloy 10000", "gtceu:bismuth 10000").duration(1).EUt(GTValues.VA[GTValues.UV]).addData("nano_forge_tier", 1); stats.addedRecipes++;
            gtr.nano_forge("assembly_line_distorter:iron_nanoswarm").circuit(29).itemInputs("8x minecraft:iron_block", "8x gtceu:soc").itemOutputs("gtceu:iron_nanoswarm").inputFluids("gtceu:naquadah 2000", "gtceu:soldering_alloy 10000", "gtceu:bismuth 10000").duration(1).EUt(GTValues.VA[GTValues.UV]).addData("nano_forge_tier", 1); stats.addedRecipes++;
            gtr.nano_forge("assembly_line_distorter:gold_nanoswarm").circuit(28).itemInputs("8x minecraft:gold_block", "16x gtceu:soc").itemOutputs("gtceu:gold_nanoswarm").inputFluids("gtceu:enriched_naquadah 2000", "gtceu:soldering_alloy 20000", "gtceu:bismuth 20000").duration(1).EUt(GTValues.VA[GTValues.UV]).addData("nano_forge_tier", 1); stats.addedRecipes++;
            gtr.nano_forge("assembly_line_distorter:silver_nanoswarm").circuit(27).itemInputs("8x gtceu:silver_block", "16x gtceu:soc").itemOutputs("gtceu:silver_nanoswarm").inputFluids("gtceu:enriched_naquadah 2000", "gtceu:soldering_alloy 20000", "gtceu:bismuth 20000").duration(1).EUt(GTValues.VA[GTValues.UV]).addData("nano_forge_tier", 1); stats.addedRecipes++;
            gtr.nano_forge("assembly_line_distorter:iridium_nanoswarm").circuit(26).itemInputs("8x gtceu:iridium_block", "32x gtceu:soc").itemOutputs("gtceu:iridium_nanoswarm").inputFluids("gtceu:naquadria 2000", "gtceu:hafnium 8000", "gtceu:soldering_alloy 20000").duration(1).EUt(GTValues.VA[GTValues.UV]).addData("nano_forge_tier", 1); stats.addedRecipes++;
            gtr.nano_forge("assembly_line_distorter:osmium_nanoswarm").circuit(25).itemInputs("8x gtceu:osmium_block", "32x gtceu:soc").itemOutputs("gtceu:osmium_nanoswarm").inputFluids("gtceu:naquadria 2000", "gtceu:hafnium 8000", "gtceu:soldering_alloy 20000").duration(1).EUt(GTValues.VA[GTValues.UV]).addData("nano_forge_tier", 1); stats.addedRecipes++;
            gtr.nano_forge("assembly_line_distorter:rhenium_nanoswarm").circuit(24).itemInputs("8x gtceu:rhenium_block", "64x gtceu:soc").itemOutputs("gtceu:rhenium_nanoswarm").inputFluids("gtceu:naquadria 2000", "gtceu:uu_amplifier 2000", "gtceu:soldering_alloy 20000").duration(1).EUt(GTValues.VA[GTValues.UV]).addData("nano_forge_tier", 1); stats.addedRecipes++;
            gtr.nano_forge("assembly_line_distorter:naquadah_nanoswarm").circuit(23).itemInputs("8x gtceu:naquadah_block", "16x gtceu:advanced_soc").itemOutputs("gtceu:naquadah_nanoswarm").inputFluids("gtceu:naquadria 8000", "gtceu:uu_amplifier 2000", "gtceu:mutated_living_solder 20000").duration(1).EUt(GTValues.VA[GTValues.UV]).addData("nano_forge_tier", 1); stats.addedRecipes++;
            gtr.nano_forge("assembly_line_distorter:neutronium_nanoswarm").circuit(22).itemInputs("8x gtceu:neutronium_block", "64x gtceu:soc", "32x gtceu:advanced_soc").itemOutputs("gtceu:neutronium_nanoswarm").inputFluids("gtceu:neutronium 4000", "gtceu:uu_amplifier 2000", "gtceu:mutated_living_solder 20000").duration(1).EUt(GTValues.VA[GTValues.UV]).addData("nano_forge_tier", 1); stats.addedRecipes++;
            gtr.nano_forge("assembly_line_distorter:orichalcum_nanoswarm").circuit(21).itemInputs("8x gtceu:orichalcum_block", "64x gtceu:advanced_soc", "64x gtceu:advanced_soc").itemOutputs("gtceu:orichalcum_nanoswarm").inputFluids("gtceu:neutronium 8000", "gtceu:uu_amplifier 4000", "gtceu:mutated_living_solder 40000").duration(1).EUt(GTValues.VA[GTValues.UV]).addData("nano_forge_tier", 1); stats.addedRecipes++;
            gtr.nano_forge("assembly_line_distorter:enderium_nanoswarm").circuit(20).itemInputs("8x gtceu:enderium_block", "64x gtceu:advanced_soc", "64x gtceu:advanced_soc").itemOutputs("gtceu:enderium_nanoswarm").inputFluids("gtceu:neutronium 8000", "gtceu:uu_amplifier 4000", "gtceu:mutated_living_solder 40000").duration(1).EUt(GTValues.VA[GTValues.UEV]).addData("nano_forge_tier", 2); stats.addedRecipes++;
            gtr.nano_forge("assembly_line_distorter:infuscolium_nanoswarm").circuit(19).itemInputs("8x gtceu:infuscolium_block", "64x gtceu:advanced_soc", "32x gtceu:highly_advanced_soc").itemOutputs("gtceu:infuscolium_nanoswarm").inputFluids("gtceu:neutronium 8000", "gtceu:uu_amplifier 4000", "gtceu:mutated_living_solder 40000").duration(1).EUt(GTValues.VA[GTValues.UEV]).addData("nano_forge_tier", 2); stats.addedRecipes++;
            gtr.nano_forge("assembly_line_distorter:uruium_nanoswarm").circuit(18).itemInputs("8x gtceu:uruium_block", "64x gtceu:advanced_soc", "64x gtceu:highly_advanced_soc").itemOutputs("gtceu:uruium_nanoswarm").inputFluids("gtceu:uu_matter 20000", "gtceu:mutated_living_solder 40000", "gtceu:super_mutated_living_solder 40000").duration(1).EUt(GTValues.VA[GTValues.UEV]).addData("nano_forge_tier", 2); stats.addedRecipes++;
            gtr.nano_forge("assembly_line_distorter:vibranium_nanoswarm").circuit(17).itemInputs("8x gtceu:vibranium_block", "64x gtceu:highly_advanced_soc", "64x gtceu:highly_advanced_soc").itemOutputs("gtceu:vibranium_nanoswarm").inputFluids("gtceu:uu_matter 20000", "gtceu:mutated_living_solder 40000", "gtceu:super_mutated_living_solder 40000").duration(1).EUt(GTValues.VA[GTValues.UEV]).addData("nano_forge_tier", 2); stats.addedRecipes++;
            gtr.nano_forge("assembly_line_distorter:starmetal_nanoswarm").circuit(16).itemInputs("8x gtceu:starmetal_block", "64x gtceu:highly_advanced_soc", "64x gtceu:highly_advanced_soc", "64x gtceu:exquisite_glass_gem", "64x gtceu:exquisite_amethyst_gem").itemOutputs("gtceu:starmetal_nanoswarm").inputFluids("gtceu:uu_matter 40000", "gtceu:mutated_living_solder 80000", "gtceu:super_mutated_living_solder 80000").duration(1).EUt(GTValues.VA[GTValues.UEV]).addData("nano_forge_tier", 2); stats.addedRecipes++;
            gtr.nano_forge("assembly_line_distorter:draconium_nanoswarm").circuit(15).itemInputs("8x gtceu:draconium_block", "32x gtceu:highly_advanced_soc_wafer", "32x kubejs:optical_ram_wafer", "32x kubejs:optical_soc", "8x kubejs:exotic_processing_core").itemOutputs("gtceu:draconium_nanoswarm").inputFluids("gtceu:uu_matter 40000", "gtceu:mutated_living_solder 80000", "gtceu:super_mutated_living_solder 80000").duration(1).EUt(GTValues.VA[GTValues.UEV]).addData("nano_forge_tier", 2); stats.addedRecipes++;
            gtr.nano_forge("assembly_line_distorter:cosmicneutronium_nanoswarm").circuit(14).itemInputs("8x gtceu:cosmicneutronium_block", "32x kubejs:optical_soc", "32x kubejs:exotic_wafer", "16x kubejs:cosmic_ram_wafer", "8x kubejs:cosmic_processing_unit_core").itemOutputs("gtceu:cosmicneutronium_nanoswarm").inputFluids("gtceu:uu_matter 40000", "gtceu:crystalmatrix 40000", "gtceu:liquid_cosmic_mesh 40000").duration(1).EUt(GTValues.VA[GTValues.UXV]).addData("nano_forge_tier", 3); stats.addedRecipes++;
            gtr.nano_forge("assembly_line_distorter:white_dwarf_mtter_nanoswarm").circuit(13).itemInputs("8x gtceu:white_dwarf_mtter_block", "8x kubejs:cosmic_processing_unit_core").itemOutputs("gtceu:white_dwarf_mtter_nanoswarm").inputFluids("gtceu:uu_matter 40000", "gtceu:neutronium 40000", "gtceu:cosmic_element 40000").duration(1).EUt(GTValues.VA[GTValues.UXV]).addData("nano_forge_tier", 3); stats.addedRecipes++;
            gtr.nano_forge("assembly_line_distorter:black_dwarf_mtter_nanoswarm").circuit(12).itemInputs("8x gtceu:black_dwarf_mtter_block", "8x kubejs:cosmic_processing_unit_core").itemOutputs("gtceu:black_dwarf_mtter_nanoswarm").inputFluids("gtceu:uu_matter 40000", "gtceu:neutronium 40000", "gtceu:cosmic_element 40000").duration(1).EUt(GTValues.VA[GTValues.UXV]).addData("nano_forge_tier", 3); stats.addedRecipes++;
            gtr.nano_forge("assembly_line_distorter:spacetime_nanoswarm").circuit(11).itemInputs("8x gtceu:spacetime_block", "4x kubejs:eigenfolded_kerr_manifold", "16x kubejs:supracausal_ram_wafer", "8x kubejs:supracausal_processing_core").itemOutputs("gtceu:spacetime_nanoswarm").inputFluids("gtceu:uu_matter 80000", "gtceu:infinity 40000", "gtceu:temporalfluid 40000").duration(1).EUt(GTValues.VA[GTValues.UXV]).addData("nano_forge_tier", 3); stats.addedRecipes++;
            gtr.nano_forge("assembly_line_distorter:transcendentmetal_nanoswarm").circuit(10).itemInputs("gtceu:rhenium_nanoswarm", "8x gtceu:transcendentmetal_block", "8x kubejs:recursively_folded_negative_space", "#gtceu:circuits/max").itemOutputs("gtceu:transcendentmetal_nanoswarm").inputFluids("gtceu:uu_matter 80000", "gtceu:raw_star_matter_plasma 40000", "gtceu:spatialfluid 20000").duration(1).EUt(GTValues.VA[GTValues.UXV]).addData("nano_forge_tier", 3); stats.addedRecipes++;
            gtr.nano_forge("assembly_line_distorter:eternity_nanoswarm").circuit(9).itemInputs("gtceu:neutronium_nanoswarm", "8x gtceu:eternity_block", "8x kubejs:ctc_computational_unit").itemOutputs("gtceu:eternity_nanoswarm").inputFluids("gtceu:spatialfluid 80000", "gtceu:exciteddtsc 80000", "gtceu:primordialmatter 80000").duration(1).EUt(GTValues.VA[GTValues.UXV]).addData("nano_forge_tier", 3); stats.addedRecipes++;
            gtr.dimensional_focus_engraving_array("assembly_line_distorter:primary_soc_wafer_from_prepare").circuit(32).itemInputs("gtladditions:prepare_primary_soc_wafer").inputFluids("gtceu:gamma_rays_photoresist 100").itemOutputs("gtladditions:primary_soc_wafer").EUt(GTValues.VA[GTValues.UEV]).duration(1); stats.addedRecipes++;
            gtr.dimensional_focus_engraving_array("assembly_line_distorter:spacetime_soc_wafer_from_prepare").circuit(31).itemInputs("gtladditions:prepare_spacetime_soc_wafer").inputFluids("gtceu:gamma_rays_photoresist 100").itemOutputs("gtladditions:spacetime_soc_wafer").EUt(GTValues.VA[GTValues.UIV]).duration(1); stats.addedRecipes++;
            gtr.dimensional_focus_engraving_array("assembly_line_distorter:chaos_soc_wafer_from_dragon").circuit(30).itemInputs("gtladditions:dragon_element_starmetal_wafer").inputFluids("gtceu:euv_photoresist 100").itemOutputs("gtladditions:chaos_soc_wafer").EUt(GTValues.VA[GTValues.UHV]).duration(1); stats.addedRecipes++;
            gtr.dimensional_focus_engraving_array("assembly_line_distorter:extraordinary_soc_wafer_from_prepare").circuit(29).itemInputs("gtladditions:prepare_extraordinary_soc_wafer").inputFluids("gtceu:photoresist 100").itemOutputs("gtladditions:extraordinary_soc_wafer").EUt(GTValues.VA[GTValues.UV]).duration(1); stats.addedRecipes++;
            gtr.photon_matrix_etch("assembly_line_distorter:chaos_soc_wafer_photon").circuit(28).itemInputs("gtladditions:dragon_element_starmetal_wafer").inputFluids("gtceu:euv_photoresist 75").itemOutputs("gtladditions:chaos_soc_wafer").EUt(GTValues.VA[GTValues.UV]).duration(1); stats.addedRecipes++;
            gtr.photon_matrix_etch("assembly_line_distorter:spacetime_soc_wafer_photon").circuit(27).itemInputs("gtladditions:prepare_spacetime_soc_wafer").inputFluids("gtceu:gamma_rays_photoresist 75").itemOutputs("gtladditions:spacetime_soc_wafer").EUt(GTValues.VA[GTValues.UHV]).duration(1); stats.addedRecipes++;
            gtr.photon_matrix_etch("assembly_line_distorter:primary_soc_wafer_photon").circuit(26).itemInputs("gtladditions:prepare_primary_soc_wafer").inputFluids("gtceu:gamma_rays_photoresist 75").itemOutputs("gtladditions:primary_soc_wafer").EUt(GTValues.VA[GTValues.UIV]).duration(1); stats.addedRecipes++;
            gtr.photon_matrix_etch("assembly_line_distorter:extraordinary_soc_wafer_photon").circuit(25).itemInputs("gtladditions:prepare_extraordinary_soc_wafer").inputFluids("gtceu:photoresist 75").itemOutputs("gtladditions:extraordinary_soc_wafer").EUt(GTValues.VA[GTValues.UV]).duration(1); stats.addedRecipes++;

            console.log('[Specially available to those with production line distortion] ⑤ The lens has been replaced with a programming circuit (decreasingly starting from 32), affecting approximately'+lensImpact+'recipes');
        }

        if (TwistedLine.enableFluidSolidifierAll) {
            let addSolidifier = (tag, circuit, fluidMult, outputMult, idSuffix, transformFn) => {
                Ingredient.of(tag).getItemIds().forEach(id => {
                    let materialName = transformFn(id);
                    if (!materialName) return;
                    let parts = id.split(':');
                    let modid = parts[0];
                    let foundFluid = null;
                    for(let fid of [`${modid}:${materialName}`, `${modid}:${materialName}_fluid`, `gtceu:${materialName}`, `gtceu:${materialName}_fluid`]) {
                        if(Fluid.exists(fid)) { foundFluid = fid; break; }
                    }
                    if(!foundFluid) return;
                    gtr.fluid_solidifier(`assembly_line_distorter:fs_${idSuffix}_${materialName}`).notConsumable(Item.of('gtceu:programmed_circuit',`{Configuration:${circuit}}`).strongNBT()).inputFluids(Fluid.of(foundFluid,144*fluidMult)).itemOutputs(`${outputMult}x ${id}`).EUt(GTValues.VA[GTValues.LV]).duration(1);
                    stats.addedRecipes++;
                });
            };
            addSolidifier('#forge:rods/long', 14, 1, 1, 'long', id => {
                let path = id.split(':')[1];
                return path.replace(/^long_/, '').replace(/_rod$/, '');
            });
            addSolidifier('#forge:rods', 15, 1, 2, 'rod', id => {
                let path = id.split(':')[1];
                return path.replace(/_rod$/, '');
            });
            addSolidifier('#forge:double_plates', 16, 2, 1, 'double', id => {
                let path = id.split(':')[1];
                return path.replace(/^double_/, '').replace(/_plate$/, '');
            });
            addSolidifier('#forge:foils', 17, 1, 4, 'foil', id => {
                let path = id.split(':')[1];
                return path.replace(/_foil$/, '');
            });
            addSolidifier('#forge:rings', 18, 1, 4, 'ring', id => {
                let path = id.split(':')[1];
                return path.replace(/_ring$/, '');
            });
            console.log('[Special for Line Twisters] ⑥ Basic formula of fluid solidifier has been added (rod/plate/foil/ring)');

            (function() {
                let processedMaterials = new Set();
                var PIPE_SIZES = [
                    { circuit: 19, fluid: 72,   suffix: 'tiny_fluid_pipe' },
                    { circuit: 20, fluid: 144,  suffix: 'small_fluid_pipe' },
                    { circuit: 21, fluid: 432,  suffix: 'normal_fluid_pipe' },
                    { circuit: 22, fluid: 864,  suffix: 'large_fluid_pipe' },
                    { circuit: 23, fluid: 1728, suffix: 'huge_fluid_pipe' }
                ];
                var ROUND_ITEMS = [
                    { circuit: 24, fluid: 16, suffix: 'round' }
                ];
                var WIRE_ITEMS = [
                    { circuit: 25, fluid: 72,  suffix: 'single_wire' },
                    { circuit: 26, fluid: 144, suffix: 'double_wire' },
                    { circuit: 27, fluid: 288, suffix: 'quadruple_wire' },
                    { circuit: 28, fluid: 576, suffix: 'octal_wire' },
                    { circuit: 29, fluid: 1152, suffix: 'hex_wire' },
                    { circuit: 30, fluid: 18,  suffix: 'fine_wire' }
                ];

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
                        var candidates = [modid + ':' + material + '_' + suffix, 'gtceu:' + material + '_' + suffix];
                        for (var i = 0; i < candidates.length; i++) {
                            if (!Ingredient.of(candidates[i]).isEmpty()) return candidates[i];
                        }
                        return null;
                    }
                }

                Fluid.getTypes().forEach(fluid => {
                    var fluidId;
                    if (typeof fluid === 'string') fluidId = fluid;
                    else if (fluid.getId) fluidId = fluid.getId();
                    else if (fluid.getRegistryName) fluidId = fluid.getRegistryName().toString();
                    else fluidId = fluid.toString();
                    var parts = fluidId.split(':');
                    var modid = parts[0];
                    var path = parts[1] || parts[0];
                    var material = path.replace(/_fluid$/, '').replace(/_plasma$/, '').replace(/_ingot$/, '');
                    if (!material) return;
                    if (processedMaterials.has(material)) return;
                    processedMaterials.add(material);

                    for (var size of PIPE_SIZES) {
                        var itemId = getItemId(material, size.suffix, modid, false);
                        if (!itemId) continue;
                        gtr.fluid_solidifier('assembly_line_distorter:pipe_' + material + '_' + size.suffix)
                            .notConsumable(Item.of('gtceu:programmed_circuit', '{Configuration:' + size.circuit + '}').strongNBT())
                            .inputFluids(Fluid.of(fluidId, size.fluid))
                            .itemOutputs('1x ' + itemId)
                            .duration(1).EUt(GTValues.VA[GTValues.LV]);
                        stats.addedRecipes++;
                    }

                    for (var item of ROUND_ITEMS) {
                        var itemId = getItemId(material, item.suffix, modid, false);
                        if (!itemId) continue;
                        gtr.fluid_solidifier('assembly_line_distorter:' + material + '_' + item.suffix)
                            .notConsumable(Item.of('gtceu:programmed_circuit', '{Configuration:' + item.circuit + '}').strongNBT())
                            .inputFluids(Fluid.of(fluidId, item.fluid))
                            .itemOutputs('1x ' + itemId)
                            .duration(1).EUt(GTValues.VA[GTValues.LV]);
                        stats.addedRecipes++;
                    }

                    for (var wire of WIRE_ITEMS) {
                        var itemId = getItemId(material, wire.suffix, modid, (wire.suffix === 'fine_wire'));
                        if (!itemId) continue;
                        gtr.fluid_solidifier('assembly_line_distorter:wire_' + material + '_' + wire.suffix)
                            .notConsumable(Item.of('gtceu:programmed_circuit', '{Configuration:' + wire.circuit + '}').strongNBT())
                            .inputFluids(Fluid.of(fluidId, wire.fluid))
                            .itemOutputs('1x ' + itemId)
                            .duration(1).EUt(GTValues.VA[GTValues.LV]);
                        stats.addedRecipes++;
                    }

                    var dustId = getItemId(material, 'dust', modid, false);
                    if (dustId) {
                        gtr.fluid_solidifier('assembly_line_distorter:dust_' + material)
                            .notConsumable(Item.of('gtceu:programmed_circuit', '{Configuration:31}').strongNBT())
                            .inputFluids(Fluid.of(fluidId, 144))
                            .itemOutputs('1x ' + dustId)
                            .duration(1).EUt(GTValues.VA[GTValues.LV]);
                        stats.addedRecipes++;
                    }
                });
                console.log('[Special for those with production line twists] ⑦ The expanded formula of the fluid solidifier has been added (pipe/ball/wire/powder, circuit value 19~31)');
            })();
        }

        if (TwistedLine.enableExtractorOverride) {
            console.log('[Special for Line Twisters] Extractor: Remove component recipe and add powder → fluid');
            let removed=0;
            Ingredient.all.getItemIds().forEach(id=>{
                if(EXTRACTOR_WHITELIST.some(w=>id.includes(w))) return;
                if(new RegExp(`(${EXTRACTOR_BAD_PARTS.join('|')})$`).test(id)) { event.remove({type:'gtceu:extractor',input:id}); removed++; }
            });
            console.log(`[产线扭曲者特供] 提取机已移除 ${removed} 个部件配方`);
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
                    gtr.extractor(`assembly_line_distorter:extractor_dust_${materialName}`).itemInputs(dustId).outputFluids(Fluid.of(foundFluid,144)).duration(1).EUt(GTValues.VA[GTValues.LV]);
                    stats.addedRecipes++;
                } catch(e) {}
            });
            console.log(`[产线扭曲者特供] 已添加 ${stats.addedRecipes} 种粉→144mb流体（累计）`);
        }

        if (TwistedLine.enableFusionRecipes) {
            let fusions = {"assembly_line_distorter:mithril_plasma_blast":{"i":["gtceu:berkelium 144","gtceu:potassium 1152"],"o":["gtceu:mithril_plasma 144"],"e":122880},"assembly_line_distorter:orichalcum_plasma_blast":{"i":["gtceu:einsteinium 144","gtceu:sodium 1152"],"o":["gtceu:orichalcum_plasma 144"],"e":122880},"assembly_line_distorter:silver_plasma_blast":{"i":["gtceu:europium 16","gtceu:arsenic 16"],"o":["gtceu:silver_plasma 16"],"e":65536},"assembly_line_distorter:moscovium_blast":{"i":["gtceu:calcium 32","gtceu:curium 32"],"o":["gtceu:moscovium 32"],"e":122880},"assembly_line_distorter:livermorium_blast":{"i":["gtceu:thorium 32","gtceu:iron 32"],"o":["gtceu:livermorium 32"],"e":122880},"assembly_line_distorter:dubnium_blast":{"i":["gtceu:europium 64","gtceu:neon 250"],"o":["gtceu:dubnium 64"],"e":65536},"assembly_line_distorter:seaborgium_blast":{"i":["gtceu:calcium 64","gtceu:plutonium 64"],"o":["gtceu:seaborgium 64"],"e":65536},"assembly_line_distorter:tennessine_blast":{"i":["gtceu:lead 16","gtceu:bromine 16"],"o":["gtceu:tennessine 16"],"e":262144},"assembly_line_distorter:taranium_rich_liquid_helium_4_plasma_blast":{"i":["gtceu:taranium_enriched_liquid_helium_3 125","gtceu:hydrogen 125"],"o":["gtceu:taranium_rich_liquid_helium_4_plasma 125"],"e":1048576},"assembly_line_distorter:vibranium_plasma_blast":{"i":["gtceu:vibranium_unstable 16","gtceu:adamantium 16"],"o":["gtceu:vibranium_plasma 16"],"e":1966080},"assembly_line_distorter:metastable_hassium_plasma_blast":{"i":["gtceu:scandium_titanium_50_mixture 32","gtceu:radon 250"],"o":["gtceu:metastable_hassium_plasma 32"],"e":491520},"assembly_line_distorter:hot_oganesson_blast":{"i":["gtceu:oganesson_breeding_base 16","gtceu:dysprosium 16"],"o":["gtceu:hot_oganesson 125"],"e":491520},"assembly_line_distorter:draconiumawakened_plasma_blast":{"i":["gtceu:draconium 125","gtceu:quantumchromodynamically_confined_matter 125"],"o":["gtceu:draconiumawakened_plasma 125"],"e":7864320},"assembly_line_distorter:infinity_blast":{"i":["gtceu:crystalmatrix 2000","gtceu:cosmicneutronium 1000"],"o":["gtceu:infinity 144"],"e":7864320},"assembly_line_distorter:europium_blast":{"i":["gtceu:neodymium 16","gtceu:hydrogen 375"],"o":["gtceu:europium 16"],"e":24576},"assembly_line_distorter:uranium_blast":{"i":["gtceu:gold 16","gtceu:aluminium 16"],"o":["gtceu:uranium 16"],"e":24576},"assembly_line_distorter:iron_plasma_blast":{"i":["gtceu:silicon 16","gtceu:magnesium 16"],"o":["gtceu:iron_plasma 16"],"e":7680},"assembly_line_distorter:plutonium_blast":{"i":["gtceu:xenon 125","gtceu:zinc 16"],"o":["gtceu:plutonium 16"],"e":49152},"assembly_line_distorter:helium_plasma_blast":{"i":["gtceu:deuterium 125","gtceu:tritium 125"],"o":["gtceu:helium_plasma 125"],"e":4096},"assembly_line_distorter:nitrogen_plasma_blast":{"i":["gtceu:beryllium 16","gtceu:deuterium 375"],"o":["gtceu:nitrogen_plasma 125"],"e":16384},"assembly_line_distorter:plutonium_241_plasma_blast":{"i":["gtceu:lutetium 16","gtceu:vanadium 16"],"o":["gtceu:plutonium_241_plasma 16"],"e":1966080},"assembly_line_distorter:oxygen_plasma_blast":{"i":["gtceu:carbon 16","gtceu:helium_3 125"],"o":["gtceu:oxygen_plasma 125"],"e":4096},"assembly_line_distorter:uranium_235_blast":{"i":["gtceu:mercury 125","gtceu:magnesium 16"],"o":["gtceu:uranium_235 16"],"e":24576},"assembly_line_distorter:tritanium_blast":{"i":["gtceu:titanium 32","gtceu:duranium 32"],"o":["gtceu:tritanium 16"],"e":30720},"assembly_line_distorter:plutonium_241_blast":{"i":["gtceu:krypton 125","gtceu:cerium 16"],"o":["gtceu:plutonium_241 16"],"e":49152},"assembly_line_distorter:osmium_blast":{"i":["gtceu:silver 16","gtceu:copper 16"],"o":["gtceu:osmium 16"],"e":24578},"assembly_line_distorter:naquadria_blast":{"i":["gtceu:enriched_naquadah 16","gtceu:radon 125"],"o":["gtceu:naquadria 4"],"e":49152},"assembly_line_distorter:americium_blast":{"i":["gtceu:lutetium 32","gtceu:chromium 32"],"o":["gtceu:americium 32"],"e":49152},"assembly_line_distorter:darmstadtium_blast":{"i":["gtceu:arsenic 32","gtceu:ruthenium 16"],"o":["gtceu:darmstadtium 16"],"e":30720},"assembly_line_distorter:duranium_blast":{"i":["gtceu:gallium 16","gtceu:radon 125"],"o":["gtceu:duranium 16"],"e":16384},"assembly_line_distorter:chromium_blast":{"i":["gtceu:hydrogen 125","gtceu:vanadium 16"],"o":["gtceu:chromium 16"],"e":24576},"assembly_line_distorter:lutetium_blast":{"i":["gtceu:lanthanum 16","gtceu:silicon 16"],"o":["gtceu:lutetium 16"],"e":7680},"assembly_line_distorter:radon_blast":{"i":["gtceu:gold 16","gtceu:mercury 16"],"o":["gtceu:radon 125"],"e":30720},"assembly_line_distorter:nickel_plasma_blast":{"i":["gtceu:potassium 16","gtceu:fluorine 125"],"o":["gtceu:nickel_plasma 16"],"e":30720},"assembly_line_distorter:argon_plasma_blast":{"i":["gtceu:carbon 16","gtceu:magnesium 16"],"o":["gtceu:argon_plasma 125"],"e":24576},"assembly_line_distorter:indium_blast":{"i":["gtceu:silver 144","gtceu:lithium 144"],"o":["gtceu:indium 144"],"e":24576},"assembly_line_distorter:neutronium_blast":{"i":["gtceu:americium 128","gtceu:naquadria 128"],"o":["gtceu:neutronium 32"],"e":98304}};
            Object.keys(fusions).forEach(id => {
                let data = fusions[id];
                event.remove({ id: id });
                gtr.large_chemical_reactor(id).inputFluids(data.i).outputFluids(data.o).EUt(data.e).duration(1);
                stats.addedRecipes++;
            });
            console.log(`[产线扭曲者特供] 核聚变板块: 已添加 ${stats.addedRecipes} 个`);
        }

        if (TwistedLine.enableParticleColliderRecipes) {
            let particles = {"assembly_line_distorter:curium_blast":{"i":["gtceu:plutonium 4096","gtceu:helium_plasma 4096"],"o":["gtceu:curium 4000"],"e":524288},"assembly_line_distorter:uranium_blast_particle":{"i":["gtceu:thorium 4096","gtceu:helium_plasma 4096"],"o":["gtceu:uranium 4000"],"e":524288},"assembly_line_distorter:plutonium_blast_particle":{"i":["gtceu:uranium 4096","gtceu:helium_plasma 4096"],"o":["gtceu:plutonium 4000"],"e":524288},"assembly_line_distorter:neptunium_blast":{"i":["gtceu:protactinium 4096","gtceu:helium_plasma 4096"],"o":["gtceu:neptunium 4000"],"e":524288},"assembly_line_distorter:berkelium_blast":{"i":["gtceu:americium 4096","gtceu:helium_plasma 4096"],"o":["gtceu:berkelium 4000"],"e":524288},"assembly_line_distorter:einsteinium_blast":{"i":["gtceu:curium 4096","gtceu:helium_plasma 4096"],"o":["gtceu:einsteinium 4000"],"e":524288},"assembly_line_distorter:californium_blast":{"i":["gtceu:berkelium 4096","gtceu:helium_plasma 4096"],"o":["gtceu:californium 4000"],"e":524288},"assembly_line_distorter:mendelevium_blast":{"i":["gtceu:einsteinium 4096","gtceu:helium_plasma 4096"],"o":["gtceu:mendelevium 4000"],"e":524288},"assembly_line_distorter:nobelium_blast":{"i":["gtceu:fermium 4096","gtceu:helium_plasma 4096"],"o":["gtceu:nobelium 4000"],"e":524288},"assembly_line_distorter:lawrencium_blast":{"i":["gtceu:mendelevium 4096","gtceu:helium_plasma 4096"],"o":["gtceu:lawrencium 4000"],"e":524288},"assembly_line_distorter:fermium_blast":{"i":["gtceu:californium 4096","gtceu:helium_plasma 4096"],"o":["gtceu:fermium 4000"],"e":524288},"assembly_line_distorter:astatine_blast":{"i":["gtceu:bismuth 4096","gtceu:helium_plasma 4096"],"o":["gtceu:astatine 4000"],"e":524288},"assembly_line_distorter:roentgenium_blast":{"i":["gtceu:meitnerium 4096","gtceu:helium_plasma 4096"],"o":["gtceu:roentgenium 4000"],"e":524288},"assembly_line_distorter:copernicium_blast":{"i":["gtceu:darmstadtium 4096","gtceu:helium_plasma 4096"],"o":["gtceu:copernicium 4000"],"e":524288},"assembly_line_distorter:nihonium_blast":{"i":["gtceu:roentgenium 4096","gtceu:helium_plasma 4096"],"o":["gtceu:nihonium 4000"],"e":524288},"assembly_line_distorter:bohrium_blast":{"i":["gtceu:dubnium 4096","gtceu:helium_plasma 4096"],"o":["gtceu:bohrium 4000"],"e":524288},"assembly_line_distorter:positive_electron_blast":{"i":["gtceu:phosphorus 200","gtceu:lithium 200"],"o":["gtceu:positive_electron 100"],"e":524288},"assembly_line_distorter:antiproton_blast":{"i":["gtceu:liquid_hydrogen 1000","gtceu:helium_plasma 200"],"o":["gtceu:antiproton 100"],"e":524288},"assembly_line_distorter:antineutron_blast":{"i":["gtceu:positive_electron 100","gtceu:antiproton 100"],"o":["gtceu:antineutron 2"],"e":524288},"assembly_line_distorter:antimatter_blast":{"i":["gtceu:antihydrogen 2000","gtceu:antineutron 2000"],"o":["gtceu:antimatter 100"],"e":524288}};
            Object.keys(particles).forEach(id => {
                let data = particles[id];
                event.remove({ id: id });
                gtr.large_chemical_reactor(id).inputFluids(data.i).outputFluids(data.o).EUt(data.e).duration(1);
                stats.addedRecipes++;
            });
            console.log(`[产线扭曲者特供] 粒子对撞板块: 已添加 ${stats.addedRecipes} 个`);
        }

        if (TwistedLine.enableGeneratorRecipes) {
            let genTypes = ['advanced_hyper_reactor','hyper_reactor','large_naquadah_reactor','naquadah_reactor','semi_fluid_generator','rocket_engine','gas_turbine','combustion_generator','steam_turbine','supercritical_steam_turbine','dyson_sphere','genesis_engine','annihilate_generator'];
            genTypes.forEach(t=>{ event.remove({id:`assembly_line_distorter:${t}_blast`}); gtr[t](`assembly_line_distorter:${t}_blast`).duration(1).circuit(32).EUt(-9221474836470000000); stats.addedRecipes++; });
            console.log(`[产线扭曲者特供] 发电板块: 已添加 ${stats.addedRecipes} 个`);
        }

        if (TwistedLine.enableCircuitPackRecipes) {
            ["ulv","lv","mv","hv","ev","iv","luv","zpm","uv","uhv","uev","uiv","uxv","opv","max"].forEach(l=>{ event.remove({id:`kubejs:circuit_pack/${l}_universal_circuit`}); event.shapeless(`kubejs:${l}_universal_circuit`, [`#gtceu:circuits/${l}`]).id(`kubejs:circuit_pack/${l}_universal_circuit`); stats.addedRecipes++; });
            console.log(`[产线扭曲者特供] 电路打包板块: 已添加 ${stats.addedRecipes} 个`);
        }

        if (TwistedLine.enableComponentPackRecipes) {
            gtr.qft('assembly_line_distorter:hongmengitems').inputFluids("gtceu:cosmic_element 2147483647").itemInputs("16384x kubejs:leptonic_charge","128x gtladditions:arcanic_astrograph","16384x gtladditions:astral_array").itemOutputs(Item.of('ae2:portable_item_cell_16k', buildCellNBTForItems('Hongmeng+ component package', HONGMENG_ITEMS))).circuit(32).duration(1).EUt(GTValues.VA[GTValues.MAX]); stats.addedRecipes++;
            gtr.qft('assembly_line_distorter:plasmafluids').inputFluids("gtceu:cosmic_element 2147483647").itemInputs("16384x kubejs:quantum_chromodynamic_charge","128x gtladditions:fuxi_bagua_heaven_forging_furnace","16384x gtladditions:astral_array").itemOutputs(Item.of('ae2:portable_item_cell_16k', buildCellNBTForFluids('Plasma component package', PLASMA_FLUIDS))).circuit(32).duration(1).EUt(GTValues.VA[GTValues.MAX]); stats.addedRecipes++;
            gtr.qft('assembly_line_distorter:componentitems').inputFluids("gtceu:cosmic_element 2147483647").itemInputs("2048x gtlcore:component_assembly_line_casing_max","1024x gtceu:component_assembly_line","16384x gtladditions:astral_array","16384x gtlcore:max_electric_motor","16384x gtlcore:max_electric_pump","16384x gtlcore:max_conveyor_module","16384x gtlcore:max_robot_arm","16384x gtlcore:max_electric_piston","16384x gtlcore:max_emitter","16384x gtlcore:max_sensor","16384x gtlcore:max_field_generator").itemOutputs(Item.of('ae2:portable_item_cell_16k', buildCellNBTForItems('component package', COMPONENT_ITEMS))).duration(1).EUt(GTValues.VA[GTValues.MAX]); stats.addedRecipes++;
            console.log('[Special for production line twisters] Component package section: Recipe added');
        }

        if (TwistedLine.enableInfinityCellRecipes) {
            gtr.assembler('assembly_line_distorter:mutagen').inputFluids("minecraft:water 2147483647").itemInputs('2147483647x gtceu:naquadria_dust','2147483647x gtceu:bio_chaff').circuit(32).itemOutputs(Item.of('expatternprovider:infinity_cell','{record:{"#c":"ae2:f",id:"gtceu:mutagen"}}')).duration(1).EUt(GTValues.VA[GTValues.LuV]); stats.addedRecipes++;
            gtr.assembler('assembly_line_distorter:sodium_potassium').inputFluids("minecraft:water 2147483647").itemInputs('2147483647x gtceu:sodium_dust','2147483647x gtceu:potassium_dust').circuit(31).itemOutputs(Item.of('expatternprovider:infinity_cell','{record:{"#c":"ae2:f",id:"gtceu:sodium_potassium"}}')).duration(1).EUt(GTValues.VA[GTValues.LuV]); stats.addedRecipes++;
            gtr.assembler('assembly_line_distorter:biomass').inputFluids("minecraft:water 2147483647").itemInputs('2147483647x gtceu:bio_chaff').circuit(30).itemOutputs(Item.of('expatternprovider:infinity_cell','{record:{"#c":"ae2:f",id:"gtceu:biomass"}}')).duration(1).EUt(GTValues.VA[GTValues.IV]); stats.addedRecipes++;
            gtr.assembler('assembly_line_distorter:bedrock_dust').itemInputs("16x gtceu:bedrock_drilling_rig","4096x kubejs:bedrock_drill").circuit(29).itemOutputs(Item.of('expatternprovider:infinity_cell','{record:{"#c":"ae2:i",id:"gtceu:bedrock_dust"}}')).duration(1).EUt(GTValues.VA[GTValues.UEV]); stats.addedRecipes++;
            gtr.assembler('assembly_line_distorter:activated_carbon_dust').inputFluids("gtceu:nitrogen 2147483647").itemInputs("2147483647x gtceu:carbon_dust").circuit(28).itemOutputs(Item.of('expatternprovider:infinity_cell','{record:{"#c":"ae2:i",id:"gtceu:activated_carbon_dust"}}')).duration(1).EUt(GTValues.VA[GTValues.MV]); stats.addedRecipes++;
            gtr.assembler('assembly_line_distorter:bio_chaff').inputFluids("minecraft:water 2147483647").itemInputs("2147483647x gtceu:plant_ball").circuit(27).itemOutputs(Item.of('expatternprovider:infinity_cell','{record:{"#c":"ae2:i",id:"gtceu:bio_chaff"}}')).duration(1).EUt(GTValues.VA[GTValues.HV]); stats.addedRecipes++;
            gtr.qft('assembly_line_distorter:star_gate_crystal_slurry').inputFluids("gtladditions:star_gate_crystal_slurry 32768","gtceu:uu_matter 2147483647","gtceu:cosmic_element 2147483647").itemInputs("1024x gtceu:dimensionally_transcendent_mixer","64x gtladditions:forge_of_the_antichrist","64x gtladditions:arcanic_astrograph","32768x gtladditions:astral_array","64x gtladditions:macro_atomic_resonant_fragment_stripper","1024x gtladditions:thread_modifier_hatch","1024x gtladditions:wireless_energy_network_input_terminal","1024x gtladditions:wireless_energy_network_output_terminal","2147483647x kubejs:quantum_chromodynamic_charge").circuit(26).itemOutputs(Item.of('expatternprovider:infinity_cell','{record:{"#c":"ae2:f",id:"gtladditions:star_gate_crystal_slurry"}}')).duration(1).EUt(GTValues.VA[GTValues.MAX]); stats.addedRecipes++;
            gtr.compressor("assembly_line_distorter:dragon_egg").itemInputs("16x gtceu:dragon_egg_copier").itemOutputs(Item.of('expatternprovider:infinity_cell','{record:{"#c":"ae2:i",id:"minecraft:dragon_egg"}}')).duration(1).EUt(GTValues.VA[GTValues.UXV]); stats.addedRecipes++;
            console.log('[Special for Line Twisters] Unlimited Components Section: Recipe added');
        }

        if (TwistedLine.enableGTLAdditionsUpgrade) {
            let nbt1 = `{BlockEntityTag:{astralArrayInventory:{Items:[{Count:127,Slot:0,id:"gtladditions:astral_array"}]}},display:{Name:'{"text":"Super celestial sphere engine","color":"#AAFFAA","bold":true}',Lore:['{"text":"§7━━━━━━━━━━━━━━━━"}','{"text":"§6 embeds §e127 star gauge matrices §6","italic":false}','{"text":"§b Star energy output: §3+∞ §b/ tick"}','{"text":"§7━━━━━━━━━━━━━━━━"}','{"text":"§d§o \"The Beating of the Hearts of the Stars\"§d"}']}}`;
            gtr.qft('assembly_line_distorter:thread_modifier_hatch').itemInputs("gtladditions:thread_modifier_hatch","127x gtladditions:astral_array").itemOutputs(Item.of('gtladditions:thread_modifier_hatch', nbt1)).EUt(GTValues.VA[GTValues.MAX]).circuit(32).duration(1).cleanroom(CleanroomType.CLEANROOM); stats.addedRecipes++;
            let nbt2 = `{BlockEntityTag:{runningSecs:144000L},display:{Name:'{"text":"The Forge of the Final False God","color":"#FF4500","bold":true,"italic":true}',Lore:['"§6§lForging Furnace of False God·Ultimate Form"','"§e§nAfter the final twists and turns, the infinite power of the quantum wave matrix creates the foundation of the false god"','"§7§m Everything in the EU that swallowed 9.2E in one second has come to an end."','"§5§o Carrying all things, breaking through the shackles of the world"','"§c§kBurn everything in the world..."']}}`;
            gtr.qft('assembly_line_distorter:forge_of_the_antichrist').itemInputs('gtladditions:forge_of_the_antichrist').itemOutputs(Item.of('gtladditions:forge_of_the_antichrist', nbt2)).EUt(-9221474836470000000).circuit(32).duration(1).cleanroom(CleanroomType.CLEANROOM); stats.addedRecipes++;
            gtr.ultimate_material_forge("assembly_line_distorter:forge_of_the_antichristnull").circuit(32).outputFluids('null').duration(1); stats.addedRecipes++;
            gtr.large_chemical_reactor('assembly_line_distorter:bioware_echo_shard_wafer').inputFluids("gtceu:biohmediumsterilized 250").itemInputs("gtladditions:echo_shard_wafer").itemOutputs("gtladditions:bioware_echo_shard_wafer").duration(1).EUt(GTValues.VA[GTValues.UHV]); stats.addedRecipes++;
            gtr.chaotic_alchemy("assembly_line_distorter:proto_halkonite").itemInputs("4x gtceu:transcendentmetal_dust","4x gtceu:tairitsu_dust","4x gtceu:tartarite_dust","2x gtceu:titan_precision_steel_dust","2x gtceu:eternity_dust").inputFluids("gtceu:dimensionallytranscendentresidue 576").outputFluids("gtladditions:proto_halkonite 1152").EUt(GTValues.VA[GTValues.OpV]).duration(1).blastFurnaceTemp(48000); stats.addedRecipes++;
            console.log('[Special for Line Twisters] GTLAdditions upgrade section: Recipes have been added');
        }

        if (TwistedLine.enableDistortRecipes) {
            gtr.distort('assembly_line_distorter:quantanium').inputFluids('gtceu:neon 10000').itemInputs('4x gtceu:quantum_star','8x gtceu:quantum_eye','16x gtceu:mithril_dust','16x gtceu:gadolinium_dust','64x minecraft:netherite_scrap','64x ae2:fluix_dust').outputFluids('gtceu:quantanium 10000').EUt(GTValues.VA[GTValues.UV]).duration(1); stats.addedRecipes++;
            gtr.distort('assembly_line_distorter:hassium').inputFluids('gtceu:scandium_titanium_50_mixture 3200','gtceu:radon 25000','gtceu:liquid_helium 100000').outputFluids('gtceu:hassium 3200').EUt(GTValues.VA[GTValues.UV]).duration(1); stats.addedRecipes++;
            gtr.distort('assembly_line_distorter:oganesson').inputFluids('kubejs:gelid_cryotheum 1440','gtceu:dysprosium 160','gtceu:titanium_50 900','gtceu:californium 360').outputFluids('gtceu:oganesson 1250').EUt(GTValues.VA[GTValues.UV]).duration(1); stats.addedRecipes++;
            console.log('[Special for production line twisters] Deep Chemical Twister Section: Recipe added');
        }

        if (TwistedLine.enableStellarForgeRecipes) {
            gtr.stellar_forge("assembly_line_distorter:contained_reissner_nordstrom_singularity").itemInputs("2x kubejs:naquadria_charge","256x gtceu:degenerate_rhenium_plate").circuit(1).inputFluids("gtceu:uu_matter 1000").itemOutputs("64x kubejs:contained_reissner_nordstrom_singularity").EUt(GTValues.VA[GTValues.UIV]).duration(1).addData("SCTier",1); stats.addedRecipes++;
            gtr.stellar_forge("assembly_line_distorter:contained_kerr_newmann_singularity").itemInputs("4x gtceu:degenerate_rhenium_plate").circuit(2).inputFluids("gtceu:uu_matter 64000").itemOutputs("kubejs:contained_kerr_newmann_singularity").EUt(GTValues.VA[GTValues.UXV]).duration(1).addData("SCTier",2); stats.addedRecipes++;
            gtr.stellar_forge("assembly_line_distorter:cosmic_neutron_plasma_cell").itemInputs("kubejs:quantum_chromodynamic_charge").circuit(3).inputFluids("gtceu:dense_neutron_plasma 2000","gtceu:uu_matter 2000").itemOutputs("kubejs:cosmic_neutron_plasma_cell").EUt(GTValues.VA[GTValues.UXV]).duration(1).addData("SCTier",3); stats.addedRecipes++;
            gtr.stellar_forge("assembly_line_distorter:contained_high_density_protonic_matter").itemInputs("2x kubejs:leptonic_charge","4x gtceu:degenerate_rhenium_plate").circuit(4).inputFluids("gtceu:uu_matter 1000").itemOutputs("kubejs:contained_high_density_protonic_matter").EUt(GTValues.VA[GTValues.UXV]).duration(1).addData("SCTier",2); stats.addedRecipes++;
            gtr.stellar_forge("assembly_line_distorter:contained_exotic_matter").itemInputs("4x kubejs:leptonic_charge","8x gtceu:degenerate_rhenium_plate").circuit(5).inputFluids("gtceu:uu_matter 1000").itemOutputs("kubejs:contained_exotic_matter").EUt(GTValues.VA[GTValues.UXV]).duration(1).addData("SCTier",2); stats.addedRecipes++;
            gtr.alloy_smelter("assembly_line_distorter:steel_ingot").itemInputs("minecraft:iron_ingot","2x minecraft:coal").itemOutputs("3x gtceu:steel_ingot").EUt(GTValues.VA[GTValues.ULV]).duration(1); stats.addedRecipes++;
            gtr.alloy_smelter("assembly_line_distorter:firebricks").itemInputs("minecraft:coal","18x minecraft:clay_ball").itemOutputs("gtceu:firebricks").EUt(GTValues.VA[GTValues.ULV]).duration(1); stats.addedRecipes++;
            console.log('[Special for Line Twisters] Cans section removed: Recipe added');
        }

        if (TwistedLine.enableContentOptimizationRecipes) {
            addSpacetimeWire(1,1,"single"); addSpacetimeWire(2,1,"double"); addSpacetimeWire(4,2,"quadruple"); addSpacetimeWire(8,4,"octal"); addSpacetimeWire(16,8,"hex"); stats.addedRecipes+=5;
            gtr.extractor('assembly_line_distorter:air1').notConsumable('kubejs:overworld_data').circuit(1).outputFluids('gtceu:air 3200').EUt(GTValues.VA[GTValues.LV]).duration(1); stats.addedRecipes++;
            gtr.extractor('assembly_line_distorter:nether_air1').notConsumable('kubejs:nether_data').circuit(1).outputFluids('gtceu:nether_air 3200').EUt(GTValues.VA[GTValues.LV]).duration(1); stats.addedRecipes++;
            gtr.extractor('assembly_line_distorter:ender_air1').notConsumable('kubejs:end_data').circuit(1).outputFluids('gtceu:ender_air 3200').EUt(GTValues.VA[GTValues.LV]).duration(1); stats.addedRecipes++;
            gtr.extractor('assembly_line_distorter:air2').notConsumable('kubejs:overworld_data').circuit(2).outputFluids('gtceu:air 2147483648000').EUt(GTValues.VA[GTValues.MV]).duration(1); stats.addedRecipes++;
            gtr.extractor('assembly_line_distorter:nether_air2').notConsumable('kubejs:nether_data').circuit(2).outputFluids('gtceu:nether_air 2147483648000').EUt(GTValues.VA[GTValues.MV]).duration(1); stats.addedRecipes++;
            gtr.extractor('assembly_line_distorter:ender_air2').notConsumable('kubejs:end_data').circuit(2).outputFluids('gtceu:ender_air 2147483648000').EUt(GTValues.VA[GTValues.MV]).duration(1); stats.addedRecipes++;
            gtr.extractor('assembly_line_distorter:liquid_air1').notConsumable('kubejs:overworld_data').notConsumable('gtceu:vacuum_freezer').circuit(3).outputFluids('gtceu:liquid_air 3200').EUt(GTValues.VA[GTValues.LV]).duration(1); stats.addedRecipes++;
            gtr.extractor('assembly_line_distorter:liquid_nether_air1').notConsumable('kubejs:nether_data').notConsumable('gtceu:vacuum_freezer').circuit(3).outputFluids('gtceu:liquid_nether_air 3200').EUt(GTValues.VA[GTValues.LV]).duration(1); stats.addedRecipes++;
            gtr.extractor('assembly_line_distorter:liquid_ender_air1').notConsumable('kubejs:end_data').notConsumable('gtceu:vacuum_freezer').circuit(3).outputFluids('gtceu:liquid_ender_air 3200').EUt(GTValues.VA[GTValues.LV]).duration(1); stats.addedRecipes++;
            gtr.extractor('assembly_line_distorter:liquid_air2').notConsumable('kubejs:overworld_data').notConsumable('gtceu:vacuum_freezer').circuit(4).outputFluids('gtceu:liquid_air 2147483648000').EUt(GTValues.VA[GTValues.MV]).duration(1); stats.addedRecipes++;
            gtr.extractor('assembly_line_distorter:liquid_nether_air2').notConsumable('kubejs:nether_data').notConsumable('gtceu:vacuum_freezer').circuit(4).outputFluids('gtceu:liquid_nether_air 2147483648000').EUt(GTValues.VA[GTValues.MV]).duration(1); stats.addedRecipes++;
            gtr.extractor('assembly_line_distorter:liquid_ender_air2').notConsumable('kubejs:end_data').notConsumable('gtceu:vacuum_freezer').circuit(4).outputFluids('gtceu:liquid_ender_air 2147483648000').EUt(GTValues.VA[GTValues.MV]).duration(1); stats.addedRecipes++;
            gtr.slaughterhouse("assembly_line_distorter:slaughterhouse").circuit(3).itemOutputs("2147483647x minecraft:ender_pearl","2147483647x minecraft:sculk_sensor","2147483647x minecraft:dragon_egg","2147483647x minecraft:dragon_breath","2147483647x minecraft:chorus_fruit","2147483647x minecraft:nether_star","2147483647x minecraft:sculk_catalyst","2147483647x minecraft:sculk_shrieker","2147483647x minecraft:echo_shard","2147483647x minecraft:sculk_vein").duration(1); stats.addedRecipes++;
            gtr.dimensionally_transcendent_plasma_forge("assembly_line_distorter:cosmic_dust").itemInputs("10x gtceu:eternity_dust","kubejs:cosmic_singularity").inputFluids("gtceu:primordialmatter 1000").itemOutputs("10x gtceu:cosmic_dust").EUt(GTValues.VA[GTValues.MAX]).duration(1).blastFurnaceTemp(96000); stats.addedRecipes++;
            gtr.space_elevator('assembly_line_distorter:space_elevator').circuit(32).duration(400); stats.addedRecipes++;
            gtr.inter_stellar('assembly_line_distorter:inter_stellar').circuit(32).duration(400); stats.addedRecipes++;
            gtr.create_aggregation('assembly_line_distorter:create_aggregation').circuit(32).duration(10); stats.addedRecipes++;
            gtr.create_aggregation('assembly_line_distorter:chain_command_block').duration(1).itemInputs('kubejs:chain_command_block_core','kubejs:command_block_broken').itemOutputs("minecraft:chain_command_block").circuit(16).EUt(GTValues.VA[GTValues.MAX]); stats.addedRecipes++;
            gtr.create_aggregation('assembly_line_distorter:repeating_command_block').duration(1).itemInputs('kubejs:repeating_command_block_core','kubejs:chain_command_block_broken').itemOutputs("minecraft:repeating_command_block").circuit(16).EUt(GTValues.VA[GTValues.MAX]); stats.addedRecipes++;
            gtr.door_of_create('assembly_line_distorter:door_of_create').circuit(32).duration(10); stats.addedRecipes++;
            gtr.door_of_create('assembly_line_distorter:magmatter_block').duration(1).itemInputs('64x gtceu:magmatter_ingot').itemOutputs("gtceu:magmatter_block").EUt(GTValues.VA[GTValues.MAX]); stats.addedRecipes++;
            gtr.assembler('assembly_line_distorter:infinity_input_dual_hatch').itemInputs("4x gtmadvancedhatch:max_configurable_dual_hatch_input_16p").itemOutputs("gtladditions:infinity_input_dual_hatch").duration(1).EUt(GTValues.VA[GTValues.OpV]); stats.addedRecipes++;
            gtr.door_of_create('assembly_line_distorter:command_block').duration(1).itemInputs('gtceu:magnetohydrodynamicallyconstrainedstarmatter_block').itemOutputs("minecraft:command_block").EUt(GTValues.VA[GTValues.MAX]); stats.addedRecipes++;
            gtr.magic_manufacturer('assembly_line_distorter:mana').circuit(32).outputFluids("gtceu:mana 2147483648000").duration(1).EUt(1); stats.addedRecipes++;
            gtr.large_chemical_reactor('assembly_line_distorter:titanium_50').inputFluids("gtceu:hydrochloric_acid 8000","gtceu:fluorine 4000").itemInputs("gtceu:titanium_dust","2x gtceu:magnesium_dust").itemOutputs("2x gtceu:magnesium_dust").outputFluids("gtceu:titanium_50 144","gtceu:chlorine 4000").duration(1).EUt(GTValues.VA[GTValues.HV]); stats.addedRecipes++;
            gtr.large_chemical_reactor('assembly_line_distorter:raw_crystal_chip_1').inputFluids("minecraft:water 1000","gtceu:distilled_water 1000").itemInputs("gtceu:emerald_dust","8x gtceu:bio_chaff").itemOutputs("gtceu:raw_crystal_chip").duration(1).EUt(GTValues.VA[GTValues.HV]); stats.addedRecipes++;
            gtr.large_chemical_reactor('assembly_line_distorter:raw_crystal_chip_2').inputFluids("minecraft:water 1000","gtceu:distilled_water 1000").itemInputs("gtceu:olivine_dust","8x gtceu:bio_chaff").itemOutputs("gtceu:raw_crystal_chip").duration(1).EUt(GTValues.VA[GTValues.HV]); stats.addedRecipes++;
            gtr.large_chemical_reactor('assembly_line_distorter:prepare_spacetime_soc_wafer').inputFluids('gtceu:cosmic_mesh_plasma 1000','gtceu:cosmic_element 10000','gtceu:spacetime 500').itemInputs('4x gtladditions:periodicium_wafer','kubejs:charged_lepton_trap_crystal','4x kubejs:nuclear_star').itemOutputs('4x gtladditions:prepare_spacetime_soc_wafer').duration(1).EUt(503316480); stats.addedRecipes++;
            gtr.fluid_solidifier('assembly_line_distorter:memory_foam_block').notConsumable(Item.of('gtceu:programmed_circuit','{Configuration:10}').strongNBT()).inputFluids("gtceu:viscoelastic_polyurethane_foam 1000").itemOutputs("kubejs:memory_foam_block").duration(1).EUt(GTValues.VA[GTValues.LV]); stats.addedRecipes++;
            gtr.extractor("assembly_line_distorter:extractor_blaze_rod").itemInputs("minecraft:blaze_rod").outputFluids("gtceu:blaze 576").duration(1).EUt(GTValues.VA[GTValues.LV]); stats.addedRecipes++;
            gtr.extruder("assembly_line_distorter:long_netherite_rod").circuit(18).itemInputs("minecraft:netherite_ingot").itemOutputs("kubejs:long_netherite_rod").EUt(GTValues.VA[GTValues.LV]).duration(1).EUt(GTValues.VA[GTValues.LV]); stats.addedRecipes++;
            gtr.cutter("assembly_line_distorter:netherite_rod").itemInputs("minecraft:netherite_ingot").itemOutputs("2x kubejs:netherite_rod").EUt(GTValues.VA[GTValues.LV]).duration(1).EUt(GTValues.VA[GTValues.LV]); stats.addedRecipes++;
            gtr.electrolyzer("assembly_line_distorter:petrochemical_plant_1").circuit(1).inputFluids("gtceu:oil_medium 1000").outputFluids("gtceu:toluene 60","gtceu:benzene 180","gtceu:octane 60","gtceu:butane 80","gtceu:butene 100","gtceu:butadiene 90","gtceu:propane 80","gtceu:propene 400","gtceu:ethane 80","gtceu:ethylene 400","gtceu:methane 400","gtceu:helium 20").EUt(GTValues.VA[GTValues.MV]).duration(1); stats.addedRecipes++;
            gtr.electrolyzer("assembly_line_distorter:petrochemical_plant_2").circuit(2).inputFluids("gtceu:oil_medium 1000").outputFluids("gtceu:toluene 40","gtceu:benzene 200","gtceu:octane 30","gtceu:butane 70","gtceu:butene 100","gtceu:butadiene 100","gtceu:propane 30","gtceu:propene 600","gtceu:ethane 130","gtceu:ethylene 1000","gtceu:methane 1000","gtceu:helium 10").EUt(GTValues.VA[GTValues.MV]).duration(1); stats.addedRecipes++;
            gtr.electrolyzer("assembly_line_distorter:petrochemical_plant_3").circuit(3).inputFluids("gtceu:oil_medium 1000").outputFluids("gtceu:toluene 240","gtceu:benzene 1200","gtceu:octane 20","gtceu:butane 60","gtceu:butene 240","gtceu:butadiene 150","gtceu:propane 30","gtceu:propene 300","gtceu:ethane 45","gtceu:ethylene 450","gtceu:methane 450","gtceu:helium 10").EUt(GTValues.VA[GTValues.MV]).duration(1); stats.addedRecipes++;
            gtr.electrolyzer("assembly_line_distorter:petrochemical_plant_4").circuit(4).inputFluids("gtceu:oil_medium 1000").outputFluids("gtceu:toluene 20","gtceu:benzene 100","gtceu:octane 20","gtceu:butane 120","gtceu:butene 80","gtceu:butadiene 80","gtceu:propane 140","gtceu:propene 90","gtceu:ethane 200","gtceu:ethylene 250","gtceu:methane 2000","gtceu:helium 40").EUt(GTValues.VA[GTValues.MV]).duration(1); stats.addedRecipes++;
            gtr.electrolyzer("assembly_line_distorter:wood_distillation_plus_1").circuit(1).itemInputs("16x #minecraft:logs").inputFluids("gtceu:steam 1000").itemOutputs("4x gtceu:dark_ash_dust").outputFluids("gtceu:naphthalene 410","gtceu:hydrogen_sulfide 307","gtceu:creosote 205","gtceu:phenol 102","gtceu:carbon_dioxide 500","gtceu:ammonia 600","gtceu:ethylbenzene 500",).EUt(GTValues.VA[GTValues.MV]).duration(1); stats.addedRecipes++;
            gtr.electrolyzer("assembly_line_distorter:wood_distillation_plus_2").circuit(2).itemInputs("16x #minecraft:logs").inputFluids("minecraft:water 6000").itemOutputs("6x gtceu:fertilizer").outputFluids("gtceu:methane 3300","gtceu:methanol 825","gtceu:acetic_acid 137","gtceu:ammonia 550","gtceu:carbon_dioxide 2200","gtceu:creosote 560","gtceu:ethanol 825").EUt(GTValues.VA[GTValues.MV]).duration(1); stats.addedRecipes++;
            gtr.electrolyzer('assembly_line_distorter:wood_distillation_nitrogen').itemInputs('16x #minecraft:logs').inputFluids('gtceu:nitrogen 1000').itemOutputs('8x gtceu:dark_ash_dust').outputFluids('minecraft:water 800','gtceu:carbon 490','gtceu:methanol 480','gtceu:benzene 350','gtceu:carbon_monoxide 340','gtceu:creosote 300','gtceu:dimethylbenzene 240','gtceu:acetic_acid 160','gtceu:methane 130','gtceu:acetone 80','gtceu:phenol 75','gtceu:toluene 75','gtceu:ethylene 20','gtceu:hydrogen 20','gtceu:methyl_acetate 16','gtceu:ethanol 16').duration(1).EUt(GTValues.VA[GTValues.MV]); stats.addedRecipes++;
            gtr.fluid_solidifier('assembly_line_distorter:kevlar_fiber').notConsumable(Item.of('gtceu:programmed_circuit','{Configuration:7}').strongNBT()).inputFluids("gtceu:liquidcrystalkevlar 72").itemOutputs("kubejs:kevlar_fiber").duration(1).EUt(GTValues.VA[GTValues.LV]); stats.addedRecipes++;
            gtr.extruder('assembly_line_distorter:special_ceramics').notConsumable(Item.of('gtceu:programmed_circuit','{Configuration:1}').strongNBT()).itemInputs("2x gtceu:special_ceramics_dust").itemOutputs("kubejs:special_ceramics").duration(1).EUt(GTValues.VA[GTValues.LV]); stats.addedRecipes++;
            registerSpaceProbe('space_cosmic_probe_receivers'); registerSpaceProbe('space_probe_surface_reception'); stats.addedRecipes+=2;
            event.shapeless('ae2:logic_processor', ['gtceu:gold_dust', 'gtceu:silicon_dust', 'minecraft:redstone']);
            event.shapeless('ae2:calculation_processor', ['gtceu:certus_quartz_dust', 'gtceu:silicon_dust', 'minecraft:redstone']);
            event.shapeless('ae2:engineering_processor', ['gtceu:diamond_dust', 'gtceu:silicon_dust', 'minecraft:redstone']);
            event.shapeless('extendedae_plus:infinity_biginteger_cell', ['gtlcore:mining_crystal']);
            event.shapeless('gtceu:glass_tube', ['minecraft:glass', '#forge:tools/knives']);
            event.shapeless('minecraft:paper', ['#forge:tools/mallets', 'minecraft:sugar_cane']);
            event.shapeless('gtceu:large_steam_input_hatch', ['gtceu:steam_input_hatch']);
            event.shapeless('gtladditions:huge_steam_input_hatch', ['gtceu:large_steam_input_hatch']);
            event.shapeless('4x gtceu:bronze_ingot', ['minecraft:copper_ingot','minecraft:copper_ingot','minecraft:copper_ingot','gtceu:tin_ingot']);
            event.shapeless('4x gtceu:bronze_ingot', ['gtceu:copper_dust','gtceu:copper_dust','gtceu:copper_dust','gtceu:tin_dust']);
            event.shapeless('3x gtceu:steel_ingot', ['minecraft:coal','minecraft:coal','minecraft:iron_ingot']);
            event.shapeless('3x gtceu:steel_ingot', ['gtceu:coal_dust','gtceu:coal_dust','gtceu:iron_dust']);
            event.shapeless('gtceu:infinite_water_cover', ['minecraft:iron_ingot','minecraft:iron_ingot','minecraft:iron_ingot','minecraft:water_bucket','minecraft:iron_ingot','minecraft:water_bucket','minecraft:iron_ingot','minecraft:iron_ingot','minecraft:iron_ingot']);
            event.shapeless('kubejs:nether_data', Array(9).fill('gtlcore:world_fragments_nether').fill('gtlcore:mining_crystal',4,5));
            event.shapeless('kubejs:overworld_data', Array(9).fill('gtlcore:world_fragments_overworld').fill('gtlcore:mining_crystal',4,5));
            event.shapeless('kubejs:end_data', Array(9).fill('gtlcore:world_fragments_end').fill('gtlcore:mining_crystal',4,5));
            event.smelting("gtceu:wrought_iron_ingot", "minecraft:iron_ingot").xp(0.1).cookingTime(1);
            event.smelting("gtceu:annealed_copper_ingot", "minecraft:copper_ingot").xp(0.1).cookingTime(1);
            event.remove({id:"gtceu:shapeless/dust_bronze"});
            stats.addedRecipes += 15;

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
                        gtr.vacuum_freezer(`assembly_line_distorter:cool_${fluidId.replace(':', '_')}`).circuit(32).inputFluids(Fluid.of(fluidId, 144)).outputFluids(Fluid.of(liquidId, 144)).duration(1).EUt(GTValues.VA[GTValues.HV]); plasmaCoolCount++;
                    }
                }
            });
            stats.addedRecipes += plasmaCoolCount;
            console.log(`[产线扭曲者特供] 内容优化板块: 已添加 ${stats.addedRecipes} 个配方（含 ${plasmaCoolCount} 个等离子冷却）`);
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
            for (let tier of tiers) {
                let id = `assembly_line_distorter:assembly_line_distorter_eye_of_harmony_core_${tier.name}`;
                let eu = GTValues.VA[GTValues[tier.gtConstant]];
                let items = scaleItems(cosmosItems, tier.ratio);
                let fluids = scaleFluids(cosmosFluids, tier.ratio);
                gtr.large_chemical_reactor(id)
                    .circuit(tier.circuit)
                    .notConsumable("assembly_line_distorter:assembly_line_distorter_eye_of_harmony_core")
                    .itemInputs("kubejs:quantum_chromodynamic_charge")
                    .itemOutputs(items)
                    .outputFluids(fluids)
                    .EUt(eu)
                    .duration(1);
                stats.addedRecipes++;
            }
        };

        if (TwistedLine.enableExclusiveContent) {
            gtr.assembler("assembly_line_distorter:assembly_line_distorter_eye_of_harmony_core").circuit(32).itemInputs("gtceu:eye_of_harmony","4096x kubejs:supracausal_mainframe").itemOutputs("assembly_line_distorter:assembly_line_distorter_eye_of_harmony_core").EUt(GTValues.VA[GTValues.OpV]).duration(1); stats.addedRecipes++;
            let maxItems = COSMOS_ITEM_IDS.map(id => `2147483647x ${id}`);
            let maxFluids = COSMOS_FLUID_IDS.map(id => `${id} 2147483648000`);
            addEyeOfHarmonyRecipes(gtr, stats, maxItems, maxFluids);
            gtr.qft("assembly_line_distorter:assembly_line_distorter_circuits").notConsumable("64x assembly_line_distorter:assembly_line_distorter_material").itemOutputs(QIONGYU_CIRCUIT_OUTPUTS).circuit(16).EUt(GTValues.VA[GTValues.MAX]).duration(1); stats.addedRecipes++;
            gtr.compressor("assembly_line_distorter:assembly_line_distorter_material").itemInputs("256x gtladditions:astral_array").itemOutputs("assembly_line_distorter:assembly_line_distorter_material").EUt(GTValues.VA[GTValues.MAX]).duration(1); stats.addedRecipes++;
            gtr.cosmos_simulation("assembly_line_distorter:assembly_line_distorter_eye_of_harmony_core_cosmos_simulation").notConsumable("assembly_line_distorter:assembly_line_distorter_eye_of_harmony_core").itemInputs("kubejs:quantum_chromodynamic_charge").itemOutputs(COSMOS_ITEM_IDS.map(id => `2147483647x ${id}`)).outputFluids(COSMOS_FLUID_IDS.map(id => `${id} 2147483648000`)).duration(1); stats.addedRecipes++;
            gtr.cosmos_simulation("assembly_line_distorter:assembly_line_distorter_material_cosmos_simulation").notConsumable("assembly_line_distorter:assembly_line_distorter_material").itemOutputs(COSMOS_ITEM_IDS.map(id => `2147483647x ${id}`)).outputFluids(COSMOS_FLUID_IDS.map(id => `${id} 2147483648000`)).duration(1); stats.addedRecipes++;
            gtr.qft("assembly_line_distorter:assembly_line_distorter_material_qft").notConsumable("64x assembly_line_distorter:assembly_line_distorter_material").itemOutputs(COSMOS_ITEM_IDS.map(id => `2147483647x ${id}`)).outputFluids(COSMOS_FLUID_IDS.map(id => `${id} 2147483648000`)).circuit(32).duration(1); stats.addedRecipes++;
            gtr.qft('assembly_line_distorter:assembly_line_distorter_catalyst').itemInputs("sgjourney:classic_stargate_base_block","9x sgjourney:classic_stargate_chevron_block","14x sgjourney:classic_stargate_ring_block").itemOutputs("assembly_line_distorter:assembly_line_distorter_catalyst").EUt(-9221474836470000000).circuit(32).duration(1).cleanroom(CleanroomType.CLEANROOM); stats.addedRecipes++;
            console.log(`[产线扭曲者特供] 专属内容板块: 已添加 ${stats.addedRecipes} 个配方`);
        }

        if (TwistedLine.enableSimpleAggregationRecipes) {
            gtr.assembler("assembly_line_distorter:wyvern_core").circuit(32).itemInputs("kubejs:draconium_dust", "gtceu:uhv_field_generator", "gtceu:quantum_eye", "gtceu:adamantine_block", "kubejs:draconic_core", "gtceu:uev_field_generator", "gtceu:quantum_star", "gtceu:orichalcum_block").itemOutputs("2x kubejs:wyvern_core").EUt(GTValues.VA[GTValues.UIV]).duration(1); stats.addedRecipes++;
            gtr.assembler("assembly_line_distorter:awakened_core").circuit(31).itemInputs("gtceu:draconium_dust", "gtceu:uiv_field_generator", "kubejs:dragon_heart", "gtceu:vibranium_block", "kubejs:wyvern_core", "gtceu:uxv_field_generator", "gtceu:gravi_star", "gtceu:taranium_block").itemOutputs("2x kubejs:awakened_core").EUt(GTValues.VA[GTValues.UXV]).duration(1); stats.addedRecipes++;
            gtr.assembler("assembly_line_distorter:chaotic_core").circuit(30).itemInputs("gtceu:draconium_nanoswarm", "gtceu:opv_field_generator", "kubejs:chaos_shard", "gtceu:legendarium_block", "kubejs:awakened_core", "gtlcore:max_field_generator", "kubejs:unstable_star", "gtceu:draconiumawakened_block").itemOutputs("2x kubejs:chaotic_core").EUt(GTValues.VA[GTValues.OpV]).duration(1); stats.addedRecipes++;
            gtr.assembler("assembly_line_distorter:draconic_core").circuit(29).itemInputs("kubejs:draconium_dust", "gtceu:zpm_field_generator", "gtceu:lapotronic_energy_orb", "gtceu:mithril_block", "gtceu:hexanitrohexaaxaisowurtzitane_dust", "gtceu:uv_field_generator", "minecraft:nether_star", "gtceu:enderium_block").itemOutputs("2x kubejs:draconic_core").EUt(GTValues.VA[GTValues.UEV]).duration(1); stats.addedRecipes++;
            gtr.assembler('assembly_line_distorter:reaction_chamber').circuit(28).itemInputs('64x gtceu:cosmic_nanoswarm','64x gtlcore:super_glue','64x gtladditions:black_hole_seed','64x gtceu:magmatter_block','64x gtladditions:stargate_shielding_foil','4x kubejs:heartofthesmogus','64x kubejs:nuclear_star','64x gtceu:spacetime_block').itemOutputs('2x sgjourney:reaction_chamber').EUt(36028797018963968).duration(1); stats.addedRecipes++;
            console.log('[Special for those with production line twisters] Simple polymerization device section: The assembly machine recipe has been added');
        }

        if (TwistedLine.enableSimpleLineProcessing) {
            _simpleLineCooperiteDusts.forEach((n,i)=> { gtr.electrolyzer(`assembly_line_distorter:${n}_${i+1}`).itemInputs('1x gtceu:cooperite_dust').itemOutputs(`12x gtceu:${n}_dust`).circuit(i+1).duration(1).EUt(GTValues.VA[GTValues.HV]); stats.addedRecipes++; });
            _simpleLineRareEarthDusts.forEach((n,i)=> { gtr.electrolyzer(`assembly_line_distorter:${n}_${i+1}`).itemInputs('1x gtceu:monazite_dust').itemOutputs(`12x gtceu:${n}_dust`).circuit(i+1).duration(1).EUt(GTValues.VA[GTValues.EV]); stats.addedRecipes++; });
            console.log(`[产线扭曲者特供] 产线简易处理板块: 已添加 ${_simpleLineCooperiteDusts.length+_simpleLineRareEarthDusts.length} 个电解配方`);
        }

        if (TwistedLine.enableAlloyBlastSmelterRecipes) {
            event.remove({type:'gtceu:alloy_blast_smelter'});
            ALLOY_BLAST_RECIPES.forEach(recipe=>{ let [id,items,fluids,circ,out,eu,temp]=recipe; let builder=gtr.alloy_blast_smelter(`assembly_line_distorter:${id}`); if(items) builder.itemInputs(items); if(fluids) fluids.forEach(f=>builder.inputFluids(f)); if(circ!==null) builder.circuit(circ); builder.outputFluids(out).duration(1).EUt(eu).blastFurnaceTemp(temp); stats.addedRecipes++; });
            console.log(`[产线扭曲者特供] 合金冶炼炉板块: 已添加 ${ALLOY_BLAST_RECIPES.length} 个配方`);
        }

        if (TwistedLine.enableFurnaceBlastAcceleration) {
            let f=0,b=0;
            event.forEachRecipe({type:'minecraft:smelting'},r=>{ let i=r.originalRecipeIngredients,o=r.originalRecipeResult; event.remove({id:r.getId()}); event.smelting(o,i).cookingTime(1).xp(0.7); f++; });
            event.forEachRecipe({type:'minecraft:blasting'},r=>{ let i=r.originalRecipeIngredients,o=r.originalRecipeResult; event.remove({id:r.getId()}); event.blasting(o,i).cookingTime(1).xp(0.7); b++; });
            console.log(`[产线扭曲者特供] 熔炉高炉加速: 已修改 ${f} 熔炉 + ${b} 高炉配方`);
        }

        let loadTime = Date.now() - scriptStartTime;
        stats.loadTimeMs = loadTime;
        console.log(`[产线扭曲者特供] 脚本加载耗时 ${loadTime} ms，总计新增配方 ${stats.addedRecipes} 个`);
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

    ServerEvents.loaded(event => { let stats=TwistedLine.blast_stats; if(!stats) return; event.server.getPlayers().forEach(p=>{ if(!stats.enabled) p.tell(Text.gold("§l[Special for Line Twisters] ⚡ Special recipe script is disabled")); else p.tell(Text.gold("§l[Special for Line Twisters] ⚡ The special formula script has taken effect!\n  → Loading time:"+stats.loadTimeMs+"ms\n  → New recipe:"+stats.addedRecipes)); }); });

    PlayerEvents.loggedIn(event=>{
        let p=event.player, stats=TwistedLine.blast_stats, cfg=TwistedLine.blast_config||{};
        p.tell("§d======================================\n§l[Special for those with twisted production lines] §eAuthor: Ogawa §f| §bFeedback QQ: 2700644513");
        if(!stats||!stats.enabled) p.tell("§l⚠ Special formula modification not applied");
        else {
            p.tell("§l⚡ Special formula modification status\n┌───────────────────────────────────────\n│▪ Loading time: §a"+stats.loadTimeMs+"ms §7 | New: §a"+stats.addedRecipes+"│▪ Global: §a is enabled\n├───────────────────────────────────────");
            p.tell("│ §b function module:"+ (cfg.enableSimpleIngotProcessing?"§a✓":"§c✗")+"Simple ingot"+ (cfg.enableSimpleLineProcessing?"§a✓":"§c✗")+"Simple production line"+ (cfg.enableFluidSolidifierAll?"§a✓":"§c✗")+"curing device"+ (cfg.enableExtractorOverride?"§a✓":"§c✗")+"Extraction machine"+ (cfg.enableMoldAndSpecialRecipes?"§a✓":"§c✗")+"Mold"+ (cfg.enableLensReplacement?"§a✓":"§c✗")+"lens");
            p.tell("│  "+ (cfg.enableFusionRecipes?"§a✓":"§c✗")+"nuclear fusion"+ (cfg.enableParticleColliderRecipes?"§a✓":"§c✗")+"particle collision"+ (cfg.enableGeneratorRecipes?"§a✓":"§c✗")+"generate electricity"+ (cfg.enableCircuitPackRecipes?"§a✓":"§c✗")+"Circuit workbench packaging"+ (cfg.enableComponentPackRecipes?"§a✓":"§c✗")+"component package");
            p.tell("│  "+ (cfg.enableInfinityCellRecipes?"§a✓":"§c✗")+"infinite components"+ (cfg.enableGTLAdditionsUpgrade?"§a✓":"§c✗")+"GTL upgrade"+ (cfg.enableDistortRecipes?"§a✓":"§c✗")+"twistometer"+ (cfg.enableStellarForgeRecipes?"§a✓":"§c✗")+"forge"+ (cfg.enableContentOptimizationRecipes?"§a✓":"§c✗")+"Content optimization");
            p.tell("│  "+ (cfg.enableExclusiveContent?"§a✓":"§c✗")+"Exclusive"+ (cfg.enableAlloyBlastSmelterRecipes?"§a✓":"§c✗")+"alloy furnace"+ (cfg.enableFurnaceBlastAcceleration?"§a✓":"§c✗")+"furnace acceleration"+ (cfg.enableSimpleAggregationRecipes?"§a✓":"§c✗")+"aggregation device");
            p.tell("├───────────────────────────────────────\n│ §b Auxiliary: Overtime"+ (cfg.enableTimeAcceleration?"§a✓":"§c✗")+"flight"+ (cfg.enableFlight?"§a✓":"§c✗")+"Invincible"+ (cfg.enableInvulnerable?"§a✓":"§c✗")+"\n└─────────────────────────────────────────");
        }
        if(TwistedLine.enableBlastScript && TwistedLine.enableTimeAcceleration){
            let d=p.persistentData; if(d.get("ttw_enabled")==null) d.putBoolean("ttw_enabled",false); if(d.get("ttw_tier")==null) d.putInt("ttw_tier",0);
            let cur=SPEED_TIER[d.getInt("ttw_tier")];
            p.tell("§6『Space-Time∞ Overclocking Technology』"+(d.getBoolean("ttw_enabled")?"§a is activated∞":"§c is not activated∞")+"| Gear:"+cur.name+" §7("+cur.range+"grid)\n§e Operation: K key switch | Shift+K shift");
        } else if(!TwistedLine.enableBlastScript) p.tell(Text.red("The time acceleration feature has been disabled by the master switch"));
        else if(!TwistedLine.enableTimeAcceleration) p.tell(Text.red("Time acceleration has been disabled"));
        p.tell("§d=====================================");
    });

    PlayerEvents.tick(event=>{
        let p=event.player;
        if(!p) return;
        if(TwistedLine.enableBlastScript && TwistedLine.enableFlight){
            if(!p.abilities.mayfly) { p.abilities.mayfly=true; p.onUpdateAbilities(); }
            if(p.abilities.flying!==true && !p.onGround) { p.abilities.flying=true; p.onUpdateAbilities(); }
        } else if(p.abilities.mayfly && !p.isCreative() && !p.isSpectator()) { p.abilities.mayfly=false; p.abilities.flying=false; p.onUpdateAbilities(); }
        if(TwistedLine.enableBlastScript && TwistedLine.enableInvulnerable) { if(!p.invulnerable) p.invulnerable=true; } else if(p.invulnerable) p.invulnerable=false;
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

    NetworkEvents.dataReceived('ttw_toggle_pressed', e=>{ if(!TwistedLine.enableBlastScript||!TwistedLine.enableTimeAcceleration) return; let p=e.player; if(!p) return; let d=p.persistentData; let cur=d.getBoolean('ttw_enabled'); d.putBoolean('ttw_enabled',!cur); p.setStatusMessage(!cur?'§6『Space-time∞ Overclocking Technology』§a⚡ The core engine ignited successfully and the space-time flow rate was reached to full!':'§6『Space-time∞overclocking technology』§c⚡ The core engine shuts down in an emergency and time-space returns to normal flow rate!'); p.playSound(!cur?'minecraft:item.nether_star.use':'minecraft:item.nether_star.break'); });
    NetworkEvents.dataReceived('ttw_tier_cycle', e=>{ if(!TwistedLine.enableBlastScript||!TwistedLine.enableTimeAcceleration) return; let p=e.player; if(!p) return; let d=p.persistentData; let newTier=(d.getInt("ttw_tier")+1)%SPEED_TIER.length; let old=SPEED_TIER[d.getInt("ttw_tier")], nw=SPEED_TIER[newTier]; d.putInt("ttw_tier",newTier); initOffsets(nw.range); p.setStatusMessage(`§d『∞次元档位跃迁』§f从${old.name}§f跃迁至§6${nw.name}§f！${nw.tip} §7(${nw.range}格领域解锁)`); p.playSound('minecraft:block.ender_chest.open'); p.playSound('minecraft:entity.ender_dragon.flap',0.8,1.5); });

    BlockEvents.rightClicked('expatternprovider:fishbig', e=>{ if(e.level.isClientSide()) return; if(e.hand!=='MAIN_HAND') return; if(e.player.getMainHandItem().getId()!=='assembly_line_distorter:assembly_line_distorter_catalyst') return; e.player.give('gtceu:creative_chest'); e.player.tell('§aYou got a creative mode box!'); e.cancel(); });
})();
