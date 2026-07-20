(function() {
    let TwistedLine = global.TwistedLine = global.TwistedLine || {};
    let config;
    try {
        config = JsonIO.read('kubejs/config/[config]Special for production line twisters.json');
        if (typeof config !== 'object') throw new Error();
    } catch(e) {
        config = { enableBlastScript: true, enableInfinityCellRecipes: true, enableGTLAdditionsUpgrade: true, enableComponentPackRecipes: true, enableTimeAcceleration: true, enableExclusiveContent: true };
    }
    TwistedLine.clientConfig = config;

    const enableLogReport = config.enableLogReport !== undefined ? config.enableLogReport : false;
    function log(msg) { if (enableLogReport) console.log(`[产线扭曲者特供-客户端] ${msg}`); }

    const twisted_packed_infinity_cell = (cellname, type, list) => Item.of('ae2:portable_item_cell_16k', `{RepairCost:0,amts:[L;${list.map(()=>"1L").join(",")}],display:{Name:'${JSON.stringify({text:cellname})}'},ic:${list.length}L,internalCurrentPower:20000.0d,keys:[${list.map(id=>`{"#c":"ae2:i",id:"expatternprovider:infinity_cell",tag:{record:{"#c":"ae2:${type}",id:"${id}"}}}`).join(",")}]}`);

    JEIEvents.subtypes(event => { event.useNBT('gtladditions:forge_of_the_antichrist'); event.useNBT('gtladditions:thread_modifier_hatch'); });
    JEIEvents.addItems(event => {
        if (!config.enableBlastScript) return;
        let infinityCount = 0;
        let packCount = 0;
        if (config.enableInfinityCellRecipes) {
            ["gtceu:mutagen","gtceu:sodium_potassium","gtceu:biomass"].forEach(id => {
                event.add(Item.of('expatternprovider:infinity_cell', `{record:{"#c":"ae2:f",id:"${id}"}}`));
                infinityCount++;
            });
            ["gtceu:bedrock_dust","gtceu:activated_carbon_dust","gtceu:bio_chaff","minecraft:dragon_egg","assembly_line_distorter:assembly_line_distorter_all_in_one_tool"].forEach(id => {
                event.add(Item.of('expatternprovider:infinity_cell', `{record:{"#c":"ae2:i",id:"${id}"}}`));
                infinityCount++;
            });
            event.add(Item.of('expatternprovider:infinity_cell', `{record:{"#c":"ae2:f",id:"gtladditions:star_gate_crystal_slurry"}}`));
            infinityCount++;
            log('Added Stargate Crystal Slurry infinite component');
            log(`已添加 ${infinityCount} 个无限元件物品到 JEI`);
        }
        if (config.enableGTLAdditionsUpgrade) {
            event.add(Item.of('gtladditions:forge_of_the_antichrist', `{BlockEntityTag:{runningSecs:144000L},display:{Name:'{"text":"The Forge of the Final False God","color":"#FF4500","bold":true,"italic":true}',Lore:['"§6§lFalse God\'s Forging·Ultimate Form"','"§e§nAfter the endless twists and turns of the quantum fluctuation matrix, the endless power has created the foundation of the false god"','"§7§mAll things in the EU that swallowed 9.2E in one second are coming to an end"','"§5§ocarries all things and breaks through the shackles of the world"','"§c§kBurn everything in the world..."']}}`));
            event.add(Item.of('gtladditions:thread_modifier_hatch', `{BlockEntityTag:{astralArrayInventory:{Items:[{Count:127,Slot:0,id:"gtladditions:astral_array"}]}},display:{Name:'{"text":"Super Sky Sphere Engine","color":"#AAFFAA","bold":true}',Lore:['{"text":"§7━━━━━━━━━━━━━━━━"}','{"text":" §6embeds §e127 star gauge matrix §6","italic":false}','{"text":" §bstar energy output: §3+∞ §b/ tick"}','{"text":"§7━━━━━━━━━━━━━━━━"}','{"text":" §d§o"The beating of the hearts of the stars" §d"}']}}`));
            log('Added 2 GTLAdditions upgrade items to JEI');
        }
        if (config.enableComponentPackRecipes) {
            event.add(twisted_packed_infinity_cell('Plasma component package', 'f', ["gtceu:argon_plasma","gtceu:heavy_quark_degenerate_matter_plasma","gtceu:echoite_plasma","gtceu:raw_star_matter_plasma","gtceu:legendarium_plasma","gtceu:metastable_hassium_plasma","gtceu:degenerate_rhenium_plasma","gtceu:quark_gluon_plasma","gtceu:celestialtungsten_plasma","gtceu:chaos_plasma","gtceu:starmetal_plasma","gtceu:enderium_plasma","gtceu:oxygen_plasma","gtceu:nitrogen_plasma","gtceu:orichalcum_plasma","gtceu:quasifissioning_plasma","gtceu:vibranium_plasma","gtceu:astraltitanium_plasma","gtceu:cosmic_mesh_plasma","gtceu:taranium_rich_liquid_helium_4_plasma","gtceu:dense_neutron_plasma","gtceu:draconiumawakened_plasma","gtceu:nickel_plasma","gtceu:infuscolium_plasma","gtceu:flyb_plasma","gtceu:high_energy_quark_gluon_plasma","gtceu:quantumchromodynamically_confined_matter_plasma","gtceu:plutonium_241_plasma","gtceu:iron_plasma","gtceu:silver_plasma","gtceu:actinium_superhydride_plasma","gtceu:crystalmatrix_plasma","gtceu:mithril_plasma","gtceu:adamantium_plasma","gtceu:helium_plasma","gtladditions:creon_plasma"]));
            packCount++;
            log('Plasma component pack added');
            event.add(twisted_packed_infinity_cell('Hongmeng+ component package', 'i', ["gtceu:white_dwarf_mtter_dust","gtceu:black_dwarf_mtter_dust","ae2:sky_dust","gtceu:trinium_dust","gtceu:plutonium_241_dust","gtceu:titanium_50_dust","gtceu:copper76_dust","gtceu:uranium_235_dust","gtceu:perditio_crystal_dust","gtceu:earth_crystal_dust","gtceu:ignis_crystal_dust","gtceu:tartarite_dust","gtceu:uruium_dust","gtceu:force_dust","gtceu:alien_algae_dust","gtceu:bloodstone_dust","minecraft:netherite_scrap","gtceu:purified_tengam_dust","gtceu:quantanium_dust","gtceu:bedrock_dust","gtceu:damascus_steel_dust","avaritia:neutron_pile","gtceu:certus_quartz_dust","ae2:fluix_dust"]));
            packCount++;
            event.add(twisted_packed_infinity_cell('component package', 'i', ["gtceu:lv_electric_motor","gtceu:lv_electric_pump","gtceu:lv_conveyor_module","gtceu:lv_robot_arm","gtceu:lv_electric_piston","gtceu:lv_emitter","gtceu:lv_sensor","gtceu:lv_field_generator","gtceu:mv_electric_motor","gtceu:mv_electric_pump","gtceu:mv_conveyor_module","gtceu:mv_robot_arm","gtceu:mv_electric_piston","gtceu:mv_emitter","gtceu:mv_sensor","gtceu:mv_field_generator","gtceu:hv_electric_motor","gtceu:hv_electric_pump","gtceu:hv_conveyor_module","gtceu:hv_robot_arm","gtceu:hv_electric_piston","gtceu:hv_emitter","gtceu:hv_sensor","gtceu:hv_field_generator","gtceu:ev_electric_motor","gtceu:ev_electric_pump","gtceu:ev_conveyor_module","gtceu:ev_robot_arm","gtceu:ev_electric_piston","gtceu:ev_emitter","gtceu:ev_sensor","gtceu:ev_field_generator","gtceu:iv_electric_motor","gtceu:iv_electric_pump","gtceu:iv_conveyor_module","gtceu:iv_robot_arm","gtceu:iv_electric_piston","gtceu:iv_emitter","gtceu:iv_sensor","gtceu:iv_field_generator","gtceu:luv_electric_motor","gtceu:luv_electric_pump","gtceu:luv_conveyor_module","gtceu:luv_robot_arm","gtceu:luv_electric_piston","gtceu:luv_emitter","gtceu:luv_sensor","gtceu:luv_field_generator","gtceu:zpm_electric_motor","gtceu:zpm_electric_pump","gtceu:zpm_conveyor_module","gtceu:zpm_robot_arm","gtceu:zpm_electric_piston","gtceu:zpm_emitter","gtceu:zpm_sensor","gtceu:zpm_field_generator","gtceu:uv_electric_motor","gtceu:uv_electric_pump","gtceu:uv_conveyor_module","gtceu:uv_robot_arm","gtceu:uv_electric_piston","gtceu:uv_emitter","gtceu:uv_sensor","gtceu:uv_field_generator","gtceu:uhv_electric_motor","gtceu:uhv_electric_pump","gtceu:uhv_conveyor_module","gtceu:uhv_robot_arm","gtceu:uhv_electric_piston","gtceu:uhv_emitter","gtceu:uhv_sensor","gtceu:uhv_field_generator","gtceu:uev_electric_motor","gtceu:uev_electric_pump","gtceu:uev_conveyor_module","gtceu:uev_robot_arm","gtceu:uev_electric_piston","gtceu:uev_emitter","gtceu:uev_sensor","gtceu:uev_field_generator","gtceu:uiv_electric_motor","gtceu:uiv_electric_pump","gtceu:uiv_conveyor_module","gtceu:uiv_robot_arm","gtceu:uiv_electric_piston","gtceu:uiv_emitter","gtceu:uiv_sensor","gtceu:uiv_field_generator","gtceu:uxv_electric_motor","gtceu:uxv_electric_pump","gtceu:uxv_conveyor_module","gtceu:uxv_robot_arm","gtceu:uxv_electric_piston","gtceu:uxv_emitter","gtceu:uxv_sensor","gtceu:uxv_field_generator","gtceu:opv_electric_motor","gtceu:opv_electric_pump","gtceu:opv_conveyor_module","gtceu:opv_robot_arm","gtceu:opv_electric_piston","gtceu:opv_emitter","gtceu:opv_sensor","gtceu:opv_field_generator","gtlcore:max_electric_motor","gtlcore:max_electric_pump","gtlcore:max_conveyor_module","gtlcore:max_robot_arm","gtlcore:max_electric_piston","gtlcore:max_emitter","gtlcore:max_sensor","gtlcore:max_field_generator"]));
            packCount++;
            log(`已添加 ${packCount} 个元件包物品到 JEI（鸿蒙+、部件）`);
            
            if (config.enableExclusiveContent) {
                let exquisiteGems = Ingredient.of('#forge:exquisite_gems').getItemIds();
                let flawlessGems = Ingredient.of('#forge:flawless_gems').getItemIds();
                let crystalGems = exquisiteGems.concat(flawlessGems);
                if (crystalGems.length > 0) {
                    event.add(twisted_packed_infinity_cell('Crystal component package', 'i', crystalGems));
                    log(`已添加晶体元件包，包含 ${crystalGems.length} 种宝石`);
                } else {
                    log('No fine/flawless gemstones found, skipped crystal component pack');
                }
            }
            
            let nanoswarmItems = Ingredient.of('#forge:nanoswarms').getItemIds();
            if (nanoswarmItems.length > 0) {
                event.add(twisted_packed_infinity_cell('Nano Swarm Component Package', 'i', nanoswarmItems));
                log(`已添加纳米蜂群元件包，包含 ${nanoswarmItems.length} 种纳米蜂群`);
            } else {
                log('No nanoswarm found, skipping nanoswarm component package');
            }
        }
    });

    ClientEvents.tick(event => {
        if (!event.player) return;
        const key = TwistedLine.ttwToggleKey;
        if (key && key.consumeClick()) {
            event.player.sendData(event.player.isShiftKeyDown() ? 'ttw_tier_cycle' : 'ttw_toggle_pressed', {});
            event.player.playSound('minecraft:block.beacon.activate');
        }
    });
})();