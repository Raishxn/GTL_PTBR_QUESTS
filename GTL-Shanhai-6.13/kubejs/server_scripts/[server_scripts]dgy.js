// priority: 1001


ServerEvents.tags('item', event => {
    const mk1 = 'kubejs:portable_chem_distort_module_mk1'
    const mk2 = 'kubejs:portable_chem_distort_module_mk2'
    const mk3 = 'kubejs:portable_chem_distort_module_mk3'
    const mk4 = 'kubejs:portable_chem_distort_module_mk4'

    event.add('kubejs:portable_distort_module_mk1', mk1)
    event.add('kubejs:portable_distort_module_mk1', mk2)
    event.add('kubejs:portable_distort_module_mk1', mk3)
    event.add('kubejs:portable_distort_module_mk1', mk4)

    event.add('kubejs:portable_distort_module_mk2', mk2)
    event.add('kubejs:portable_distort_module_mk2', mk3)
    event.add('kubejs:portable_distort_module_mk2', mk4)

    event.add('kubejs:portable_distort_module_mk3', mk3)
    event.add('kubejs:portable_distort_module_mk3', mk4)

    event.add('kubejs:portable_distort_module_mk4', mk4)
})

// ============================================================
// [来源: 产线扭曲者] 全局配置 — 扭曲加速系统
// ============================================================
if (!global.twisted) global.twisted = {}
global.twisted.MASTER_ENABLED = true

global.twisted.SPEED_TIER = [
    { name: "Iniciante torcido", range: 3, tip: "⚡ Luz persistente, ressonância primária do espaço-tempo" },
    { name: "Intermediário Torcido", range: 5, tip: "⚡ A nebulosa flui e as dimensões intermediárias se dobram" },
    { name: "Torcido Avançado", range: 7, tip: "⚡ Surtos de galáxias, saltos de alto nível no tempo e no espaço" },
    { name: "Final Torcido", range: 10, tip: "⚡ O céu estrelado explode e o tempo final é aniquilado" }
]

// [来源: 产线扭曲者] 辅助函数 — 机器加速
function initOffsets(range) {
    let offsets = []
    for (let x = -range; x <= range; x++) {
        for (let y = -range; y <= range; y++) {
            for (let z = -range; z <= range; z++) {
                offsets.push([x, y, z])
            }
        }
    }
    return offsets
}

function getRecipeLogicAt(level, pos) {
    try {
        return $GTCapabilityHelper.getRecipeLogic(level, pos, null)
    } catch (e) {
        return null
    }
}

function finishMachine(recipeLogic) {
    if (recipeLogic && recipeLogic.isWorking()) {
        recipeLogic.setProgress(recipeLogic.getDuration())
        return true
    }
    return false
}

function getPlayerData(player) {
    let data = player.persistentData
    if (data.get("ttw_enabled") == null) data.putBoolean("ttw_enabled", false)
    if (data.get("ttw_tier") == null) data.putInt("ttw_tier", 0)
    return {
        enabled: data.getBoolean("ttw_enabled"),
        tier: data.getInt("ttw_tier")
    }
}

function setPlayerEnabled(player, enabled) {
    player.persistentData.putBoolean("ttw_enabled", enabled)
}

function setPlayerTier(player, tier) {
    let maxTier = global.twisted.SPEED_TIER.length - 1
    let newTier = Math.min(Math.max(0, tier), maxTier)
    player.persistentData.putInt("ttw_tier", newTier)
}

function cycleMold(event, cycleArray) {
    let { player, hand, item } = event
    let currentId = item.getId()
    let index = cycleArray.indexOf(currentId)
    if (index === -1) return
    let direction = player.crouching ? -1 : 1
    let nextIndex = (index + direction + cycleArray.length) % cycleArray.length
    let nextId = cycleArray[nextIndex]
    let nextItem = Item.of(nextId, item.getCount())
    player.setItemInHand(hand, nextItem)
    player.playSound("minecraft:ui.button.click", 1.0, 1.0)
    player.tell(Component.green("§acomutado: §e" + nextItem.getDisplayName().getString()))
}

// [来源: 产线扭曲者] NBT辅助函数
function buildCellNBT(cellname, type, list) {
    let keysNBT = list.map(id => `{"#c":"ae2:i","id":"expatternprovider:infinity_cell","tag":{"record":{"#c":"ae2:${type}","id":"${id}"}}}`).join(",")
    let amtsNBT = list.map(() => "1L").join(",")
    let nameJson = JSON.stringify({ text: cellname })
    return `{RepairCost:0,amts:[L;${amtsNBT}],display:{Name:'${nameJson}'},ic:${list.length}L,internalCurrentPower:20000.0d,keys:[${keysNBT}]}`
}
function buildCellNBTForItems(cellname, items) { return buildCellNBT(cellname, 'i', items) }
function buildCellNBTForFluids(cellname, fluids) { return buildCellNBT(cellname, 'f', fluids) }

// [来源: 产线扭曲者] 数据列表
const CASTING_MOLD_CYCLE = ["gtceu:ingot_casting_mold","gtceu:plate_casting_mold","gtceu:gear_casting_mold","gtceu:small_gear_casting_mold","gtceu:credit_casting_mold","gtceu:bottle_casting_mold","gtceu:nugget_casting_mold","gtceu:ball_casting_mold","gtceu:cylinder_casting_mold","gtceu:block_casting_mold","gtceu:anvil_casting_mold","gtceu:name_casting_mold","gtceu:rotor_casting_mold","gtceu:pill_casting_mold"]
const EXTRUDER_MOLD_CYCLE = ["gtceu:plate_extruder_mold","gtceu:rod_extruder_mold","gtceu:ingot_extruder_mold","gtceu:block_extruder_mold","gtceu:gear_extruder_mold","gtceu:small_gear_extruder_mold","gtceu:ring_extruder_mold","gtceu:bolt_extruder_mold","gtceu:wire_extruder_mold","gtceu:cell_extruder_mold","gtceu:tiny_pipe_extruder_mold","gtceu:small_pipe_extruder_mold","gtceu:normal_pipe_extruder_mold","gtceu:large_pipe_extruder_mold","gtceu:huge_pipe_extruder_mold","gtceu:bottle_extruder_mold","gtceu:foil_extruder_mold","gtceu:long_rod_extruder_mold","gtceu:rotor_extruder_mold"]
const FIELD_SHAPE_CYCLE = ["kubejs:ingot_field_shape","kubejs:ball_field_shape"]

const TWISTED_COSMOS_ITEM_OUTPUTS = ["2147483647x gtceu:carbon_dust","2147483647x gtceu:phosphorus_dust","2147483647x ae2:fluix_dust","2147483647x gtceu:certus_quartz_dust","2147483647x avaritia:neutron_pile","2147483647x gtceu:damascus_steel_dust","2147483647x gtceu:bedrock_dust","2147483647x gtceu:quantanium_dust","2147483647x gtceu:purified_tengam_dust","2147483647x minecraft:netherite_scrap","2147483647x gtceu:bloodstone_dust","2147483647x gtceu:alien_algae_dust","2147483647x gtceu:force_dust","2147483647x gtceu:uruium_dust","2147483647x gtceu:tartarite_dust","2147483647x gtceu:ignis_crystal_dust","2147483647x gtceu:earth_crystal_dust","2147483647x gtceu:perditio_crystal_dust","2147483647x gtceu:uranium_235_dust","2147483647x gtceu:copper76_dust","2147483647x gtceu:titanium_50_dust","2147483647x gtceu:plutonium_241_dust","2147483647x gtceu:trinium_dust","2147483647x ae2:sky_dust","2147483647x gtceu:black_dwarf_mtter_dust","2147483647x gtceu:white_dwarf_mtter_dust","2147483647x gtceu:sulfur_dust","2147483647x gtceu:selenium_dust","2147483647x gtceu:iodine_dust","2147483647x gtceu:boron_dust","2147483647x gtceu:silicon_dust","2147483647x gtceu:germanium_dust","2147483647x gtceu:arsenic_dust","2147483647x gtceu:antimony_dust","2147483647x gtceu:tellurium_dust","2147483647x gtceu:astatine_dust","2147483647x gtceu:aluminium_dust","2147483647x gtceu:gallium_dust","2147483647x gtceu:indium_dust","2147483647x gtceu:tin_dust","2147483647x gtceu:thallium_dust","2147483647x gtceu:lead_dust","2147483647x gtceu:bismuth_dust","2147483647x gtceu:polonium_dust","2147483647x gtceu:titanium_dust","2147483647x gtceu:vanadium_dust","2147483647x gtceu:chromium_dust","2147483647x gtceu:manganese_dust","2147483647x gtceu:iron_dust","2147483647x gtceu:cobalt_dust","2147483647x gtceu:nickel_dust","2147483647x gtceu:copper_dust","2147483647x gtceu:zinc_dust","2147483647x gtceu:zirconium_dust","2147483647x gtceu:niobium_dust","2147483647x gtceu:molybdenum_dust","2147483647x gtceu:technetium_dust","2147483647x gtceu:ruthenium_dust","2147483647x gtceu:rhodium_dust","2147483647x gtceu:palladium_dust","2147483647x gtceu:silver_dust","2147483647x gtceu:cadmium_dust","2147483647x gtceu:hafnium_dust","2147483647x gtceu:tantalum_dust","2147483647x gtceu:tungsten_dust","2147483647x gtceu:rhenium_dust","2147483647x gtceu:osmium_dust","2147483647x gtceu:iridium_dust","2147483647x gtceu:platinum_dust","2147483647x gtceu:gold_dust","2147483647x gtceu:beryllium_dust","2147483647x gtceu:magnesium_dust","2147483647x gtceu:calcium_dust","2147483647x gtceu:strontium_dust","2147483647x gtceu:barium_dust","2147483647x gtceu:radium_dust","2147483647x gtceu:yttrium_dust","2147483647x gtceu:lithium_dust","2147483647x gtceu:sodium_dust","2147483647x gtceu:potassium_dust","2147483647x gtceu:rubidium_dust","2147483647x gtceu:caesium_dust","2147483647x gtceu:francium_dust","2147483647x gtceu:scandium_dust","2147483647x gtceu:actinium_dust","2147483647x gtceu:thorium_dust","2147483647x gtceu:protactinium_dust","2147483647x gtceu:uranium_dust","2147483647x gtceu:neptunium_dust","2147483647x gtceu:plutonium_dust","2147483647x gtceu:americium_dust","2147483647x gtceu:curium_dust","2147483647x gtceu:berkelium_dust","2147483647x gtceu:californium_dust","2147483647x gtceu:einsteinium_dust","2147483647x gtceu:fermium_dust","2147483647x gtceu:mendelevium_dust","2147483647x gtceu:nobelium_dust","2147483647x gtceu:lawrencium_dust","2147483647x gtceu:lanthanum_dust","2147483647x gtceu:cerium_dust","2147483647x gtceu:praseodymium_dust","2147483647x gtceu:neodymium_dust","2147483647x gtceu:promethium_dust","2147483647x gtceu:samarium_dust","2147483647x gtceu:europium_dust","2147483647x gtceu:gadolinium_dust","2147483647x gtceu:terbium_dust","2147483647x gtceu:dysprosium_dust","2147483647x gtceu:holmium_dust","2147483647x gtceu:erbium_dust","2147483647x gtceu:thulium_dust","2147483647x gtceu:ytterbium_dust","2147483647x gtceu:lutetium_dust","2147483647x gtceu:rutherfordium_dust","2147483647x gtceu:dubnium_dust","2147483647x gtceu:seaborgium_dust","2147483647x gtceu:bohrium_dust","2147483647x gtceu:hassium_dust","2147483647x gtceu:meitnerium_dust","2147483647x gtceu:darmstadtium_dust","2147483647x gtceu:roentgenium_dust","2147483647x gtceu:copernicium_dust","2147483647x gtceu:nihonium_dust","2147483647x gtceu:flerovium_dust","2147483647x gtceu:moscovium_dust","2147483647x gtceu:livermorium_dust","2147483647x gtceu:tennessine_dust","2147483647x gtceu:oganesson_dust","2147483647x gtceu:jasper_dust","2147483647x gtceu:naquadah_dust","2147483647x gtceu:enriched_naquadah_dust","2147483647x gtceu:naquadria_dust","2147483647x gtceu:duranium_dust","2147483647x gtceu:tritanium_dust","2147483647x gtceu:mithril_dust","2147483647x gtceu:orichalcum_dust","2147483647x gtceu:enderium_dust","2147483647x gtceu:adamantine_dust","2147483647x gtceu:vibranium_dust","2147483647x gtceu:infuscolium_dust","2147483647x gtceu:taranium_dust","2147483647x gtceu:draconium_dust","2147483647x gtceu:starmetal_dust","2147483647x gtceu:exquisite_red_garnet_gem","2147483647x gtceu:exquisite_blue_topaz_gem","2147483647x gtceu:exquisite_emerald_gem","2147483647x gtceu:exquisite_olivine_gem","2147483647x gtceu:exquisite_yellow_garnet_gem","2147483647x gtceu:exquisite_certus_quartz_gem","2147483647x gtceu:exquisite_coal_gem","2147483647x gtceu:exquisite_quartzite_gem","2147483647x gtceu:exquisite_grossular_gem","2147483647x gtceu:exquisite_sodalite_gem","2147483647x gtceu:exquisite_lazurite_gem","2147483647x gtceu:exquisite_rock_salt_gem","2147483647x gtceu:exquisite_lapis_gem","2147483647x gtceu:exquisite_almandine_gem","2147483647x gtceu:exquisite_salt_gem","2147483647x gtceu:exquisite_nether_quartz_gem","2147483647x gtceu:exquisite_monazite_gem","2147483647x gtceu:exquisite_pyrope_gem","2147483647x gtceu:exquisite_spessartine_gem","2147483647x gtceu:exquisite_apatite_gem","2147483647x gtceu:exquisite_opal_gem","2147483647x gtceu:exquisite_ruby_gem","2147483647x gtceu:exquisite_green_sapphire_gem","2147483647x gtceu:exquisite_realgar_gem","2147483647x gtceu:exquisite_cinnabar_gem","2147483647x gtceu:exquisite_jasper_gem","2147483647x gtceu:exquisite_malachite_gem","2147483647x gtceu:exquisite_diamond_gem","2147483647x gtceu:exquisite_sapphire_gem","2147483647x gtceu:exquisite_amethyst_gem","2147483647x gtceu:exquisite_topaz_gem","2147483647x gtceu:flawless_spessartine_gem","2147483647x gtceu:flawless_quartzite_gem","2147483647x gtceu:flawless_nether_quartz_gem","2147483647x gtceu:flawless_certus_quartz_gem","2147483647x gtceu:flawless_red_garnet_gem","2147483647x gtceu:flawless_sodalite_gem","2147483647x gtceu:flawless_monazite_gem","2147483647x gtceu:flawless_salt_gem","2147483647x gtceu:flawless_apatite_gem","2147483647x gtceu:flawless_almandine_gem","2147483647x gtceu:flawless_coal_gem","2147483647x gtceu:flawless_lazurite_gem","2147483647x gtceu:flawless_pyrope_gem","2147483647x gtceu:flawless_rock_salt_gem","2147483647x gtceu:flawless_grossular_gem","2147483647x gtceu:flawless_opal_gem","2147483647x gtceu:flawless_amethyst_gem","2147483647x gtceu:flawless_topaz_gem","2147483647x gtceu:flawless_jasper_gem","2147483647x gtceu:flawless_malachite_gem","2147483647x gtceu:flawless_cinnabar_gem","2147483647x gtceu:flawless_ruby_gem","2147483647x gtceu:flawless_green_sapphire_gem","2147483647x gtceu:flawless_sapphire_gem","2147483647x gtceu:flawless_diamond_gem","2147483647x gtceu:flawless_realgar_gem","2147483647x gtceu:flawless_lapis_gem","2147483647x gtceu:flawless_yellow_garnet_gem","2147483647x gtceu:flawless_olivine_gem","2147483647x gtceu:flawless_emerald_gem","2147483647x gtceu:flawless_blue_topaz_gem","2147483647x gtceu:pyrope_gem","2147483647x gtceu:realgar_gem","2147483647x minecraft:lapis_lazuli","2147483647x gtceu:topaz_gem","2147483647x gtceu:yellow_garnet_gem","2147483647x minecraft:quartz","2147483647x gtceu:malachite_gem","2147483647x gtceu:rock_salt_gem","2147483647x gtceu:sodalite_gem","2147483647x gtceu:cinnabar_gem","2147483647x gtceu:olivine_gem","2147483647x minecraft:coal","2147483647x gtceu:monazite_gem","2147483647x gtceu:opal_gem","2147483647x gtceu:salt_gem","2147483647x gtceu:quartzite_gem","2147483647x gtceu:jasper_gem","2147483647x gtceu:apatite_gem","2147483647x minecraft:amethyst_shard","2147483647x gtceu:ruby_gem","2147483647x gtceu:red_garnet_gem","2147483647x minecraft:emerald","2147483647x gtceu:green_sapphire_gem","2147483647x gtceu:sapphire_gem","2147483647x gtceu:lazurite_gem","2147483647x gtceu:blue_topaz_gem","2147483647x gtceu:certus_quartz_gem","2147483647x gtceu:andradite_gem","2147483647x gtceu:grossular_gem","2147483647x minecraft:diamond","2147483647x gtceu:almandine_gem","2147483647x gtceu:spessartine_gem","2147483647x gtceu:silicon_dioxide_dust","2147483647x gtceu:mica_dust","2147483647x gtceu:trinium_compound_dust","2147483647x gtceu:trona_dust","2147483647x gtceu:celestine_dust","2147483647x gtceu:malachite_dust","2147483647x gtceu:endstone_dust","2147483647x gtceu:ender_pearl_dust","2147483647x gtceu:cinnabar_dust","2147483647x gtceu:olivine_dust","2147483647x gtceu:bastnasite_dust","2147483647x gtceu:cobalt_oxide_dust","2147483647x gtceu:pitchblende_dust","2147483647x gtceu:zeolite_dust","2147483647x gtceu:oilsands_dust","2147483647x gtceu:infused_gold_dust","2147483647x gtceu:uraninite_dust","2147483647x gtceu:alunite_dust","2147483647x gtceu:galena_dust","2147483647x gtceu:sodalite_dust","2147483647x gtceu:calcite_dust","2147483647x gtceu:bornite_dust","2147483647x gtceu:desh_dust","2147483647x gtceu:rock_salt_dust","2147483647x gtceu:antimony_trioxide_dust","2147483647x gtceu:nether_quartz_dust","2147483647x gtceu:rare_earth_dust","2147483647x gtceu:rare_earth_metal_dust","2147483647x gtceu:adamantine_compounds_dust","2147483647x gtceu:amethyst_dust","2147483647x gtceu:ostrum_dust","2147483647x gtceu:ruby_dust","2147483647x gtceu:red_garnet_dust","2147483647x minecraft:redstone","2147483647x gtceu:electrotine_dust","2147483647x gtceu:lazurite_dust","2147483647x gtceu:blue_topaz_dust","2147483647x gtceu:cooperite_dust","2147483647x gtceu:hematite_dust","2147483647x gtceu:pyrolusite_dust","2147483647x gtceu:cobaltite_dust","2147483647x gtceu:molybdenite_dust","2147483647x gtceu:chalcocite_dust","2147483647x gtceu:stibnite_dust","2147483647x gtceu:kyanite_dust","2147483647x gtceu:sapphire_dust","2147483647x gtceu:magnesite_dust","2147483647x minecraft:glowstone_dust","2147483647x gtceu:granitic_mineral_sand_dust","2147483647x gtceu:bentonite_dust","2147483647x gtceu:calorite_dust","2147483647x gtceu:green_sapphire_dust","2147483647x gtceu:emerald_dust","2147483647x gtceu:paper_dust","2147483647x gtceu:soda_ash_dust","2147483647x gtceu:zincite_dust","2147483647x gtceu:apatite_dust","2147483647x gtceu:tricalcium_phosphate_dust","2147483647x gtceu:phosphate_dust","2147483647x gtceu:goethite_dust","2147483647x gtceu:samarium_refined_powder_dust","2147483647x gtceu:vanadium_magnetite_dust","2147483647x gtceu:andradite_dust","2147483647x gtceu:powellite_dust","2147483647x gtceu:wulfenite_dust","2147483647x gtceu:tantalite_dust","2147483647x gtceu:massicot_dust","2147483647x gtceu:diamond_dust","2147483647x gtceu:tungstate_dust","2147483647x gtceu:ilmenite_dust","2147483647x gtceu:uvarovite_dust","2147483647x gtceu:grossular_dust","2147483647x gtceu:barite_dust","2147483647x gtceu:rutile_dust","2147483647x gtceu:bauxite_dust","2147483647x gtceu:chromite_dust","2147483647x gtceu:pollucite_dust","2147483647x gtceu:spessartine_dust","2147483647x gtceu:pyrope_dust","2147483647x gtceu:pentlandite_dust","2147483647x gtceu:sphalerite_dust","2147483647x gtceu:realgar_dust","2147483647x gtceu:cassiterite_dust","2147483647x gtceu:cassiterite_sand_dust","2147483647x gtceu:spodumene_dust","2147483647x gtceu:lepidolite_dust","2147483647x gtceu:lapis_dust","2147483647x gtceu:topaz_dust","2147483647x gtceu:yellow_garnet_dust","2147483647x gtceu:yellow_limonite_dust","2147483647x gtceu:pyrite_dust","2147483647x gtceu:chalcopyrite_dust","2147483647x gtceu:clay_dust","2147483647x gtceu:tetrahedrite_dust","2147483647x gtceu:raw_tengam_dust","2147483647x gtceu:platinum_group_sludge_dust"]

const TWISTED_COSMOS_FLUID_OUTPUTS = ["gtceu:spacetime 2147483647","gtceu:raw_star_matter_plasma 2147483647","gtceu:quark_gluon_plasma 2147483647","gtceu:heavy_quark_degenerate_matter_plasma 2147483647","gtceu:neutronium 2147483647","gtceu:heavy_lepton_mixture 2147483647","gtceu:hydrogen 2147483647","gtceu:nitrogen 2147483647","gtceu:oxygen 2147483647","gtceu:fluorine 2147483647","gtceu:chlorine 2147483647","gtceu:bromine 2147483647","gtceu:helium 2147483647","gtceu:neon 2147483647","gtceu:argon 2147483647","gtceu:krypton 2147483647","gtceu:xenon 2147483647","gtceu:radon 2147483647","gtceu:mercury 2147483647","gtceu:deuterium 2147483647","gtceu:tritium 2147483647","gtceu:helium_3 2147483647","gtceu:unknowwater 2147483647","gtceu:uu_matter 2147483647","gtceu:argon_plasma 2147483647","gtceu:echoite_plasma 2147483647","gtceu:legendarium_plasma 2147483647","gtceu:metastable_hassium_plasma 2147483647","gtceu:degenerate_rhenium_plasma 2147483647","gtceu:celestialtungsten_plasma 2147483647","gtceu:chaos_plasma 2147483647","gtceu:starmetal_plasma 2147483647","gtceu:enderium_plasma 2147483647","gtceu:oxygen_plasma 2147483647","gtceu:nitrogen_plasma 2147483647","gtceu:orichalcum_plasma 2147483647","gtceu:quasifissioning_plasma 2147483647","gtceu:vibranium_plasma 2147483647","gtceu:astraltitanium_plasma 2147483647","gtceu:cosmic_mesh_plasma 2147483647","gtceu:taranium_rich_liquid_helium_4_plasma 2147483647","gtceu:dense_neutron_plasma 2147483647","gtceu:draconiumawakened_plasma 2147483647","gtceu:nickel_plasma 2147483647","gtceu:infuscolium_plasma 2147483647","gtceu:flyb_plasma 2147483647","gtceu:high_energy_quark_gluon_plasma 2147483647","gtceu:quantumchromodynamically_confined_matter_plasma 2147483647","gtceu:plutonium_241_plasma 2147483647","gtceu:iron_plasma 2147483647","gtceu:silver_plasma 2147483647","gtceu:actinium_superhydride_plasma 2147483647","gtceu:crystalmatrix_plasma 2147483647","gtceu:mithril_plasma 2147483647","gtceu:adamantium_plasma 2147483647","gtceu:helium_plasma 2147483647","gtceu:mana 2147483647"]

const TWISTED_PLASMA_FLUIDS = ["gtceu:argon_plasma","gtceu:heavy_quark_degenerate_matter_plasma","gtceu:echoite_plasma","gtceu:raw_star_matter_plasma","gtceu:legendarium_plasma","gtceu:metastable_hassium_plasma","gtceu:degenerate_rhenium_plasma","gtceu:quark_gluon_plasma","gtceu:celestialtungsten_plasma","gtceu:chaos_plasma","gtceu:starmetal_plasma","gtceu:enderium_plasma","gtceu:oxygen_plasma","gtceu:nitrogen_plasma","gtceu:orichalcum_plasma","gtceu:quasifissioning_plasma","gtceu:vibranium_plasma","gtceu:astraltitanium_plasma","gtceu:cosmic_mesh_plasma","gtceu:taranium_rich_liquid_helium_4_plasma","gtceu:dense_neutron_plasma","gtceu:draconiumawakened_plasma","gtceu:nickel_plasma","gtceu:infuscolium_plasma","gtceu:flyb_plasma","gtceu:high_energy_quark_gluon_plasma","gtceu:quantumchromodynamically_confined_matter_plasma","gtceu:plutonium_241_plasma","gtceu:iron_plasma","gtceu:silver_plasma","gtceu:actinium_superhydride_plasma","gtceu:crystalmatrix_plasma","gtceu:mithril_plasma","gtceu:adamantium_plasma","gtceu:helium_plasma"]

const TWISTED_HONGMENG_ITEMS = ["gtceu:white_dwarf_mtter_dust","gtceu:black_dwarf_mtter_dust","ae2:sky_dust","gtceu:trinium_dust","gtceu:plutonium_241_dust","gtceu:titanium_50_dust","gtceu:copper76_dust","gtceu:uranium_235_dust","gtceu:perditio_crystal_dust","gtceu:earth_crystal_dust","gtceu:ignis_crystal_dust","gtceu:tartarite_dust","gtceu:uruium_dust","gtceu:force_dust","gtceu:alien_algae_dust","gtceu:bloodstone_dust","minecraft:netherite_scrap","gtceu:purified_tengam_dust","gtceu:quantanium_dust","gtceu:bedrock_dust","gtceu:damascus_steel_dust","avaritia:neutron_pile","gtceu:certus_quartz_dust","ae2:fluix_dust"]

const TWISTED_COMPONENT_ITEMS = ["gtceu:lv_electric_motor","gtceu:lv_electric_pump","gtceu:lv_conveyor_module","gtceu:lv_robot_arm","gtceu:lv_electric_piston","gtceu:lv_emitter","gtceu:lv_sensor","gtceu:lv_field_generator","gtceu:mv_electric_motor","gtceu:mv_electric_pump","gtceu:mv_conveyor_module","gtceu:mv_robot_arm","gtceu:mv_electric_piston","gtceu:mv_emitter","gtceu:mv_sensor","gtceu:mv_field_generator","gtceu:hv_electric_motor","gtceu:hv_electric_pump","gtceu:hv_conveyor_module","gtceu:hv_robot_arm","gtceu:hv_electric_piston","gtceu:hv_emitter","gtceu:hv_sensor","gtceu:hv_field_generator","gtceu:ev_electric_motor","gtceu:ev_electric_pump","gtceu:ev_conveyor_module","gtceu:ev_robot_arm","gtceu:ev_electric_piston","gtceu:ev_emitter","gtceu:ev_sensor","gtceu:ev_field_generator","gtceu:iv_electric_motor","gtceu:iv_electric_pump","gtceu:iv_conveyor_module","gtceu:iv_robot_arm","gtceu:iv_electric_piston","gtceu:iv_emitter","gtceu:iv_sensor","gtceu:iv_field_generator","gtceu:luv_electric_motor","gtceu:luv_electric_pump","gtceu:luv_conveyor_module","gtceu:luv_robot_arm","gtceu:luv_electric_piston","gtceu:luv_emitter","gtceu:luv_sensor","gtceu:luv_field_generator","gtceu:zpm_electric_motor","gtceu:zpm_electric_pump","gtceu:zpm_conveyor_module","gtceu:zpm_robot_arm","gtceu:zpm_electric_piston","gtceu:zpm_emitter","gtceu:zpm_sensor","gtceu:zpm_field_generator","gtceu:uv_electric_motor","gtceu:uv_electric_pump","gtceu:uv_conveyor_module","gtceu:uv_robot_arm","gtceu:uv_electric_piston","gtceu:uv_emitter","gtceu:uv_sensor","gtceu:uv_field_generator","gtceu:uhv_electric_motor","gtceu:uhv_electric_pump","gtceu:uhv_conveyor_module","gtceu:uhv_robot_arm","gtceu:uhv_electric_piston","gtceu:uhv_emitter","gtceu:uhv_sensor","gtceu:uhv_field_generator","gtceu:uev_electric_motor","gtceu:uev_electric_pump","gtceu:uev_conveyor_module","gtceu:uev_robot_arm","gtceu:uev_electric_piston","gtceu:uev_emitter","gtceu:uev_sensor","gtceu:uev_field_generator","gtceu:uiv_electric_motor","gtceu:uiv_electric_pump","gtceu:uiv_conveyor_module","gtceu:uiv_robot_arm","gtceu:uiv_electric_piston","gtceu:uiv_emitter","gtceu:uiv_sensor","gtceu:uiv_field_generator","gtceu:uxv_electric_motor","gtceu:uxv_electric_pump","gtceu:uxv_conveyor_module","gtceu:uxv_robot_arm","gtceu:uxv_electric_piston","gtceu:uxv_emitter","gtceu:uxv_sensor","gtceu:uxv_field_generator","gtceu:opv_electric_motor","gtceu:opv_electric_pump","gtceu:opv_conveyor_module","gtceu:opv_robot_arm","gtceu:opv_electric_piston","gtceu:opv_emitter","gtceu:opv_sensor","gtceu:opv_field_generator","gtlcore:max_electric_motor","gtlcore:max_electric_pump","gtlcore:max_conveyor_module","gtlcore:max_robot_arm","gtlcore:max_electric_piston","gtlcore:max_emitter","gtlcore:max_sensor","gtlcore:max_field_generator"]

// ============================================================
// [来源: dgy + 产线扭曲者] 原有helper + JsonObject
// ============================================================
const JsonObject_dgy = Java.loadClass('com.google.gson.JsonObject')
const GTItemof_dgy = (item,nbt,count,chance,maxChance,tierChanceBoost)=>{
        let result = new JsonObject_dgy()
        result.add("item",[
    {
      "content": {
        "type": "gtceu:sized",
        "count": count||1,
        "ingredient": {
          "type": "forge:nbt",
          "item": item,
          "count": count||1,
          "nbt": nbt
        }
      },
      "chance": chance||10000,
      "maxChance": maxChance||10000,
      "tierChanceBoost": tierChanceBoost||0
    }
  ])
  return result
}

// ============================================================
// [来源: 产线扭曲者] 事件系统 — 命令/玩家tick/网络/模具轮换
// ============================================================

ServerEvents.commandRegistry(event => {
    const { commands } = event
    event.register(
        commands.literal('twisted')
            .then(commands.literal('enable').executes(ctx => {
                global.twisted.MASTER_ENABLED = true
                ctx.getSource().sendSuccess('§a产线扭曲者全局功能已启用', true)
                return 1
            }))
            .then(commands.literal('disable').executes(ctx => {
                global.twisted.MASTER_ENABLED = false
                ctx.getSource().sendSuccess('§c产线扭曲者全局功能已禁用', true)
                return 1
            }))
            .then(commands.literal('status').executes(ctx => {
                let status = global.twisted.MASTER_ENABLED ? "§aativado" : "§cdesativado"
                ctx.getSource().sendSuccess(`§b产线扭曲者全局状态: ${status}`, false)
                return 1
            }))
    )
})

let currentOffsets = initOffsets(global.twisted.SPEED_TIER[0].range)

PlayerEvents.tick(event => {
    if (!global.twisted.MASTER_ENABLED) return
    let player = event.player
    let data = getPlayerData(player)
    if (!data.enabled) return
    let level = player.level
    let baseX = player.blockX, baseY = player.blockY, baseZ = player.blockZ
    for (let offset of currentOffsets) {
        let pos = new BlockPos(baseX + offset[0], baseY + offset[1], baseZ + offset[2])
        if (!level.isLoaded(pos)) continue
        let blockId = level.getBlock(pos).id
        if (blockId.startsWith('gtceu:') || blockId.startsWith('gtladditions:')) {
            let recipeLogic = getRecipeLogicAt(level, pos)
            if (recipeLogic && recipeLogic.isWorking()) finishMachine(recipeLogic)
        }
    }
})

PlayerEvents.loggedIn(event => {
    if (!global.twisted.MASTER_ENABLED) return
    let player = event.player
    let data = getPlayerData(player)
    let status = data.enabled ? "§a▸▸▸ Reino ativado ◂◂◂" : "§c▹▹▹ O campo não está ativado ◃◃◃"
    let current = global.twisted.SPEED_TIER[data.tier]
    player.tell("§d=====================================")
    player.tell("§6\"Production Line Twister\" §eO motor central de aceleração Twisted GT foi carregado!")
    player.tell("§bStatus atual: §f" + status)
    player.tell("Faixa atual §b: §f" + current.name + " §7(" + current.range + "campo de grade)")
    player.tell("Efeitos especiais exclusivos §b: §f" + current.tip)
    player.tell("§e⚡ Guia de operação: §fPressione a tecla K para alternar o interruptor da área de aceleração GT | §fShift+K muda o intervalo | Você pode alterar a chave na ligação de teclas")
    player.tell("§d=====================================")
})

NetworkEvents.dataReceived('ttw_toggle_pressed', event => {
    if (!global.twisted.MASTER_ENABLED) return
    let player = event.player
    if (!player) return
    let data = getPlayerData(player)
    setPlayerEnabled(player, !data.enabled)
    if (!data.enabled) {
        player.setStatusMessage('§6『扭曲GT加速科技』§a⚡ GT加速领域启动')
        player.playSound('minecraft:item.nether_star.use')
    } else {
        player.setStatusMessage('§6『扭曲GT加速科技』§c⚡ GT加速领域关闭')
        player.playSound('minecraft:item.nether_star.break')
    }
})

NetworkEvents.dataReceived('ttw_tier_cycle', event => {
    if (!global.twisted.MASTER_ENABLED) return
    let player = event.player
    if (!player) return
    let data = getPlayerData(player)
    let newTier = (data.tier + 1) % global.twisted.SPEED_TIER.length
    setPlayerTier(player, newTier)
    currentOffsets = initOffsets(global.twisted.SPEED_TIER[newTier].range)
    let oldInfo = global.twisted.SPEED_TIER[data.tier]
    let newInfo = global.twisted.SPEED_TIER[newTier]
    player.setStatusMessage(`§d『扭曲∞次元领域跃迁』§f从${oldInfo.name}§f跃迁至§6${newInfo.name}§f！${newInfo.tip} §7(${newInfo.range}格领域)`)
    player.playSound('minecraft:block.ender_chest.open')
    player.playSound('minecraft:entity.ender_dragon.flap', 0.8, 1.5)
})

// [来源: 产线扭曲者] 模具轮换
CASTING_MOLD_CYCLE.forEach(id => {
    ItemEvents.rightClicked(id, event => cycleMold(event, CASTING_MOLD_CYCLE))
})
EXTRUDER_MOLD_CYCLE.forEach(id => {
    ItemEvents.rightClicked(id, event => cycleMold(event, EXTRUDER_MOLD_CYCLE))
})
FIELD_SHAPE_CYCLE.forEach(id => {
    ItemEvents.rightClicked(id, event => cycleMold(event, FIELD_SHAPE_CYCLE))
})

// ============================================================
// [来源: dgy] 主配方区块
// ============================================================

ServerEvents.recipes(event => {
    const gtr = event.recipes.gtceu

    const tierVoltageMap = [8, 9, 10, 11, 12, 13]
    const drones = [
        'kubejs:space_drone_mk1',
        'kubejs:space_drone_mk2',
        'kubejs:space_drone_mk3',
        'kubejs:space_drone_mk4',
        'kubejs:space_drone_mk5',
        'kubejs:space_drone_mk6'
    ]
    const modules = [
        'thetornproductionline:space_elevator_miner_module_mk1',
        'thetornproductionline:space_elevator_miner_module_mk2',
        'thetornproductionline:space_elevator_miner_module_mk3',
        'thetornproductionline:space_elevator_miner_module_mk4',
        'thetornproductionline:space_elevator_miner_module_mk5',
        'thetornproductionline:space_elevator_miner_module_mk6'
    ]
    const celestials = [
        'thetornproductionline:celestial_secret_deducing_module_uv',
        'thetornproductionline:celestial_secret_deducing_module_uhv',
        'thetornproductionline:celestial_secret_deducing_module_uev',
        'thetornproductionline:celestial_secret_deducing_module_uiv',
        'thetornproductionline:celestial_secret_deducing_module_uxv',
        'thetornproductionline:celestial_secret_deducing_module_opv'
    ]

    // =================== 矿石数据 ===================
    const ores1 = [
        [["280x gtceu:tetrahedrite_ore","140x gtceu:copper_ore","60x gtceu:bentonite_ore","40x gtceu:magnetite_ore","40x gtceu:olivine_ore","20x gtceu:glauconite_sand_ore"], "1"],
        [["180x gtceu:almandine_ore","120x gtceu:pyrope_ore","60x gtceu:sapphire_ore","60x gtceu:green_sapphire_ore","70x gtceu:stibnite_ore","120x gtceu:uraninite_ore"], "2"],
        [["90x gtceu:bastnasite_ore","30x gtceu:molybdenum_ore","60x gtceu:goethite_ore","240x gtceu:yellow_limonite_ore","240x gtceu:hematite_ore","120x gtceu:malachite_ore"], "3"],
        [["120x gtceu:soapstone_ore","80x gtceu:talc_ore","80x gtceu:glauconite_sand_ore","40x gtceu:pentlandite_ore","30x gtceu:neodymium_ore","60x gtceu:monazite_ore"], "4"],
        [["180x gtceu:redstone_ore","120x gtceu:ruby_ore","60x gtceu:grossular_ore","40x gtceu:spessartine_ore","40x gtceu:pyrolusite_ore","20x gtceu:tantalite_ore"], "5"],
        [["250x gtceu:chalcopyrite_ore","10x gtceu:zeolite_ore","10x gtceu:cassiterite_ore","50x gtceu:realgar_ore","60x gtceu:cinnabar_ore","80x ae2:sky_stone_block"], "6"],
        [["120x gtceu:saltpeter_ore","80x gtceu:diatomite_ore","80x gtceu:electrotine_ore","40x gtceu:alunite_ore","240x gtceu:coal_ore","40x gtceu:rubidium_ore"], "7"],
        [["90x gtceu:beryllium_ore","120x gtceu:emerald_ore","40x gtceu:chalcopyrite_ore","160x gtceu:iron_ore","160x gtceu:pyrite_ore","160x gtceu:copper_ore"], "8"],
        [["60x gtceu:grossular_ore","40x gtceu:pyrolusite_ore","20x gtceu:tantalite_ore","240x gtceu:magnetite_ore","160x gtceu:vanadium_magnetite_ore","80x gtceu:gold_ore"], "9"],
        [["120x gtceu:lazurite_ore","80x gtceu:sodalite_ore","80x gtceu:lapis_ore","40x gtceu:calcite_ore","150x gtceu:wulfenite_ore","30x gtceu:calorite_ore"], "10"],
        [["120x gtceu:galena_ore","80x gtceu:silver_ore","40x gtceu:lead_ore","100x gtceu:molybdenite_ore","50x gtceu:molybdenum_ore","50x gtceu:powellite_ore"], "11"],
        [["90x gtceu:goethite_ore","60x gtceu:yellow_limonite_ore","60x gtceu:kyanite_ore","40x gtceu:mica_ore","40x gtceu:bauxite_ore","20x gtceu:pollucite_ore"], "12"],
        [["120x gtceu:quartzite_ore","80x gtceu:certus_quartz_ore","140x gtceu:zircon_ore","160x gtceu:cassiterite_ore","60x gtceu:hematite_ore","30x gtceu:gold_ore"], "13"],
        [["40x gtceu:barite_ore","120x gtceu:red_garnet_ore","80x gtceu:yellow_garnet_ore","80x gtceu:amethyst_ore","40x gtceu:opal_ore","20x gtceu:alien_algae_ore"], "14"],
        [["210x gtceu:blue_topaz_ore","140x gtceu:topaz_ore","240x gtceu:basaltic_mineral_sand_ore","160x gtceu:granitic_mineral_sand_ore","160x gtceu:fullers_earth_ore","80x gtceu:gypsum_ore"], "15"],
        [["150x gtceu:rock_salt_ore","10x gtceu:salt_ore","50x gtceu:lepidolite_ore","50x gtceu:spodumene_ore","140x gtceu:chalcocite_ore","70x gtceu:bornite_ore"], "16"],
        [["180x gtceu:redstone_ore","120x gtceu:ruby_ore","60x gtceu:cinnabar_ore","240x gtceu:nether_quartz_ore","80x gtceu:quartzite_ore","50x minecraft:ancient_debris"], "17"],
        [["120x gtceu:apatite_ore","80x gtceu:tricalcium_phosphate_ore","40x gtceu:pyrochlore_ore","300x gtceu:sulfur_ore","200x gtceu:pyrite_ore","100x gtceu:sphalerite_ore"], "18"],
        [["180x gtceu:magnetite_ore","120x gtceu:vanadium_magnetite_ore","240x gtceu:cassiterite_sand_ore","160x gtceu:garnet_sand_ore","160x gtceu:asbestos_ore","80x gtceu:diatomite_ore"], "19"],
        [["240x gtceu:oilsands_ore","60x gtceu:gold_ore","80x gtceu:infused_gold_ore","160x gtceu:bauxite_ore","80x gtceu:ilmenite_ore","80x gtceu:aluminium_ore"], "20"],
        [["60x gtceu:bornite_ore","40x gtceu:cooperite_ore","120x gtceu:graphite_ore","80x gtceu:diamond_ore","40x gtceu:coal_ore","40x gtceu:titanium_ore"], "21"],
        [["120x gtceu:garnierite_ore","80x gtceu:nickel_ore","80x gtceu:cobaltite_ore","40x gtceu:pentlandite_ore","40x gtceu:platinum_ore","20x gtceu:palladium_ore"], "22"],
        [["120x gtceu:scheelite_ore","80x gtceu:tungstate_ore","40x gtceu:lithium_ore","20x gtceu:tellurium_ore","30x gtceu:tungsten_ore","180x gtceu:pitchblende_ore"], "23"],
        [["180x gtceu:naquadah_ore","120x gtceu:chromite_ore","60x gtceu:plutonium_ore","30x gtceu:enriched_naquadah_ore","90x gtceu:trinium_compound_ore","30x gtceu:indium_ore"], "24"]
    ]
    const ores2 = [
        [["20x gtceu:jasper_ore","140x gtceu:red_garnet_ore","60x gtceu:topaz_ore","40x gtceu:emerald_ore","40x gtceu:amethyst_ore","20x gtceu:celestine_ore"], "25"]
    ]
    const ores3 = [
        [["140x gtceu:iron_ore","140x gtceu:tin_ore","60x gtceu:nickel_ore","60x gtceu:uruium_ore","40x gtceu:force_ore","20x gtceu:cobalt_ore"], "26"],
        [["120x gtceu:bloodstone_ore","80x gtceu:redstone_ore","120x gtceu:red_garnet_ore","40x gtceu:gravel_ruby_ore","40x gtceu:almandine_ore","40x gtceu:pyrope_ore"], "27"]
    ]
    const ores4 = [
        [["80x gtceu:naquadah_ore","40x gtceu:adamantine_compounds_ore","60x gtceu:rare_earth_metal_ore","40x gtceu:monazite_ore","40x gtceu:bastnasite_ore","20x gtceu:enriched_naquadah_ore"], "28"],
        [["40x gtceu:earth_crystal_ore","40x gtceu:ignis_crystal_ore","80x gtceu:uraninite_ore","40x gtceu:orichalcum_ore","60x gtceu:mithril_ore","80x gtceu:salt_ore"], "29"]
    ]
    const ores5 = [
        [["80x gtceu:enderium_ore","120x gtceu:sodalite_ore","60x gtceu:celestine_ore","80x gtceu:lapis_ore","60x gtceu:bauxite_ore","40x gtceu:pitchblende_ore"], "30"],
        [["40x gtceu:silver_ore","60x gtceu:andesite_platinum_ore","60x gtceu:tartarite_ore","80x gtceu:vibranium_ore","120x gtceu:aluminium_ore","120x gtceu:iron_ore"], "31"]
    ]
    const ores6 = [
        [["12x gtceu:lazurite_ore","80x gtceu:sapphire_ore","60x gtceu:starmetal_ore","80x gtceu:green_sapphire_ore","120x gtceu:yellow_garnet_ore","80x gtceu:pollucite_ore"], "32"]
    ]

    // =================== 流体数据 ===================
    const space_fluids = [
        ["gtceu:hydrogen 1000000", 1],
        ["gtceu:helium 1000000", 2],
        ["gtceu:nitrogen 1000000", 3],
        ["gtceu:methane 1000000", 4],
        ["gtceu:sulfur_dioxide 1000000", 5],
        ["gtceu:carbon_dioxide 1000000", 6],
        ["gtceu:nitrogen_dioxide 1000000", 7],
        ["gtceu:ammonia 1000000", 8],
        ["gtceu:chlorine 1000000", 9],
        ["gtceu:fluorine 1000000", 10],
        ["gtceu:carbon_monoxide 1000000", 11],
        ["gtceu:oxygen 1000000", 12]
    ]
    const space_fluid1s = [
        ["gtceu:unknowwater 10000", 13],
        ["gtceu:neon 100000", 14],
        ["gtceu:argon 100000", 15],
        ["gtceu:krypton 100000", 16],
        ["gtceu:xenon 100000", 17],
        ["gtceu:radon 100000", 18],
        ["gtceu:helium_3 100000", 19]
    ]
    const space_fluid2s = [
        ["gtceu:deuterium 100000", 20],
        ["gtceu:tritium 100000", 21],
        ["gtceu:heavy_fuel 100000", 22],
        ["gtceu:light_fuel 100000", 23],
        ["gtceu:naphtha 100000", 24],
        ["gtceu:refinery_gas 100000", 25],
        ["gtceu:coal_gas 100000", 26],
        ["gtceu:bromine 100000", 27],
        ["gtceu:barnarda_air 100000", 28]
    ]
    const space_fluid5s = [
        ["gtceu:white_dwarf_mtter 100000", 29],
        ["gtceu:black_dwarf_mtter 100000", 30]
    ]

    function getOreOutputsForLevel(level) {
        let list = []
        ores1.forEach(e => list = list.concat(e[0]))
        if (level >= 2) ores2.forEach(e => list = list.concat(e[0]))
        if (level >= 3) ores3.forEach(e => list = list.concat(e[0]))
        if (level >= 4) ores4.forEach(e => list = list.concat(e[0]))
        if (level >= 5) ores5.forEach(e => list = list.concat(e[0]))
        if (level >= 6) ores6.forEach(e => list = list.concat(e[0]))
        return list
    }

    function getFluidOutputsForLevel(level) {
        let list = []
        space_fluids.forEach(e => list.push(e[0]))
        if (level >= 2) space_fluid1s.forEach(e => list.push(e[0]))
        if (level >= 3) space_fluid2s.forEach(e => list.push(e[0]))
        if (level >= 6) space_fluid5s.forEach(e => list.push(e[0]))
        return list
    }

    function registerModule(mk) {
        const i = mk - 1
        const drone = drones[i]
        const module = modules[i]
        const celestial = celestials[i]
        const voltageIndex = tierVoltageMap[i]
        const EUt = GTValues.VA[voltageIndex]

        // 制造配方
        gtr.assembler(`thetornproductionline:space_elevator_miner_module_mk${mk}_craft`)
            .itemInputs(`256x ${drone}`, celestial)
            .itemOutputs(module)
            .EUt(EUt)
            .duration(200)

        // 采矿配方
        const oreOutputs = getOreOutputsForLevel(mk)
        var minerBuilder = gtr.miner_module(`thetornproductionline:space_elevator_miner_module_mk${mk}_mine`)
            .notConsumable(module)
            .inputFluids('gtceu:rocket_fuel_h8n4c2o4 160000')
            .EUt(EUt)
            .duration(200)
            .circuit(32)
        oreOutputs.forEach(o => minerBuilder.itemOutputs(o))

        // 钻井配方
        const fluidOutputs = getFluidOutputsForLevel(mk)
        if (fluidOutputs.length > 0) {
            var drillBuilder = gtr.drilling_module(`thetornproductionline:space_elevator_miner_module_mk${mk}_drill`)
                .notConsumable(module)
                .inputFluids('gtceu:rocket_fuel_h8n4c2o4 160000')
                .EUt(EUt)
                .duration(200)
                .circuit(32)
            fluidOutputs.forEach(f => drillBuilder.outputFluids(f))
        }
    }

    for (let mk = 1; mk <= 6; mk++) {
        registerModule(mk)
    }

    // =================== 天机推演模块[创造] ===================
    gtr.suprachronal_assembly_line('thetornproductionline:celestial_secret_deducing_creative_module')
        .inputFluids(
            'gtladditions:star_gate_crystal_slurry 32767000',
            'gtceu:instability_plasma 32767000',
            'gtceu:miracle 32767000',
            'gtladditions:phonon_medium 32767000'
        )
        .itemInputs(
            '64x thetornproductionline:celestial_secret_deducing_module_advanced_max',
            '1024x gtladditions:thread_modifier_hatch',
            '32767x gtladditions:astral_array',
            '64x expatternprovider:fishbig',
            '256x gtladditions:heliophase_leyline_crystallizer',
            '64x gtladditions:forge_of_the_antichrist',
            '64x gtladditions:apocalyptic_torsion_quantum_matrix',
            '64x gtladditions:heart_of_the_universe',
            '1048576x gtladditions:mellion_plate',    // 原灿茶合金板 → 梅里昂板
            '1048576x gtladditions:creon_plate',      // 原创律合金板 → 克瑞翁板
            '64x gtladditions:wireless_energy_network_output_terminal',
            '64x gtladditions:wireless_energy_network_input_terminal',
            '1x gtlcore:ultimate_tea'
        )
        .itemOutputs('thetornproductionline:celestial_secret_deducing_creative_module')
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(200)

    // =================== 星门构成模块 ===================
    gtr.suprachronal_assembly_line('thetornproductionline:stargate_constitution_module')
        .itemInputs(
            '64x thetornproductionline:celestial_secret_deducing_creative_module',
            '64x thetornproductionline:black_hole_engine_module',
            '16x thetornproductionline:fishbig_process_module',
            '1x gtceu:creative_tank',
            '1x kubejs:command_wand',
            '64x thetornproductionline:matter_refactoring_module',
            '2097152x minecraft:command_block',
            '4x sgjourney:classic_stargate_base_block'
        )
        .itemOutputs('thetornproductionline:stargate_constitution_module')
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(200)

    // 星门构成模块量子操纵配方
    gtr.qft('thetornproductionline:stargate_ring_from_water')
        .notConsumable('thetornproductionline:stargate_constitution_module')
        .circuit(11)
        .inputFluids('minecraft:water 1')
        .itemOutputs('sgjourney:classic_stargate_ring_block')
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(20)

    gtr.qft('thetornproductionline:stargate_chevron_from_ring')
        .notConsumable('thetornproductionline:stargate_constitution_module')
        .circuit(1)
        .itemInputs('sgjourney:classic_stargate_ring_block')
        .itemOutputs('sgjourney:classic_stargate_chevron_block')
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(20)

    gtr.qft('thetornproductionline:stargate_base_from_chevron')
        .notConsumable('thetornproductionline:stargate_constitution_module')
        .circuit(1)
        .itemInputs('sgjourney:classic_stargate_chevron_block')
        .itemOutputs('sgjourney:classic_stargate_base_block')
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(20)

    gtr.qft('thetornproductionline:pegasus_dhd_from_base')
        .notConsumable('thetornproductionline:stargate_constitution_module')
        .circuit(1)
        .itemInputs('sgjourney:classic_stargate_base_block')
        .itemOutputs('sgjourney:pegasus_dhd')
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(20)

    gtr.qft('thetornproductionline:creative_chest_from_cobblestone')
        .notConsumable('thetornproductionline:stargate_constitution_module')
        .circuit(2)
        .itemInputs('minecraft:cobblestone')
        .itemOutputs('gtceu:creative_chest')
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(20)

    // =================== 无限星能火箭燃料元件 ===================
    gtr.autoclave('thetornproductionline:infinity_stellar_energy_rocket_fuel_cell')
        .itemInputs(
            'gtlcore:cell_component_256m',
            '1024x gtceu:atomic_energy_excitation_plant'        // 原子能激发工厂
        )
        .inputFluids('gtceu:stellar_energy_rocket_fuel 2147483647')
        .itemOutputs(Item.of('expatternprovider:infinity_cell', '{record:{"#c":"ae2:f",id:"gtceu:stellar_energy_rocket_fuel"}}'))
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(200)

    // =================== 无限凛冰粉元件 ===================
    gtr.suprachronal_assembly_line('thetornproductionline:infinity_dust_cryotheum_cell')
        .itemInputs(
            'gtlcore:cell_component_256m',
            '1024x gtceu:advanced_sps_crafting',               // 进阶超临界合成机
            '2097152x kubejs:dust_cryotheum'                   // 凛冰粉
        )
        .itemOutputs(Item.of('expatternprovider:infinity_cell', '{record:{"#c":"ae2:i",id:"kubejs:dust_cryotheum"}}'))
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(200)

    // =================== 组装机全物品生成（创造箱子催化） ===================
    // 使用 Minecraft 原生物品注册表获取所有物品
    const $ItemRegistry = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries').ITEM
    let allItems = []
    for (let item of $ItemRegistry) {
        let itemId = String($ItemRegistry.getKey(item))
        if (itemId && itemId !== 'minecraft:air') {
            allItems.push(itemId)
        }
    }

    if (allItems.length > 0) {
        let recipe = gtr.assembler('thetornproductionline:creative_all_items_gen')
            .notConsumable('gtceu:creative_chest')        // 创造模式箱子作为催化剂
            .itemInputs('minecraft:cobblestone')          // 1个圆石
            .circuit(32)                                  // 32号电路
            .EUt(GTValues.VA[GTValues.MAX])               // MAX电压 1A
            .duration(200)                                // 10秒

        allItems.forEach(itemId => {
            recipe.itemOutputs(`1x ${itemId}`)
        })
    }

    // =================== 温室高速培养模块 ===================
    // 制造配方
    gtr.assembler('thetornproductionline:greenhouse_speed_cultivation_module_craft')
        .itemInputs(
            '64x gtceu:iv_parallel_hatch',
            '256x gtceu:large_greenhouse',
            '4x thetornproductionline:celestial_secret_deducing_module_iv'
        )
        .itemOutputs('thetornproductionline:greenhouse_speed_cultivation_module')
        .EUt(GTValues.VA[GTValues.IV])
        .duration(200)

    // 使用配方（温室）
    var greenhouseOutputs = [
        // 原木
        "64x minecraft:oak_log", "64x gtceu:rubber_log", "64x minecraft:birch_log",
        "64x minecraft:jungle_log", "64x minecraft:acacia_log", "64x minecraft:dark_oak_log",
        "64x minecraft:mangrove_log", "64x minecraft:cherry_log", "64x minecraft:spruce_log",
        // 树苗
        "2x minecraft:oak_sapling", "2x gtceu:rubber_sapling", "2x minecraft:birch_sapling",
        "2x minecraft:jungle_sapling", "2x minecraft:acacia_sapling", "2x minecraft:dark_oak_sapling",
        "2x minecraft:mangrove_propagule", "2x minecraft:cherry_sapling", "2x minecraft:spruce_sapling",
        // 树脂与果实
        "64x gtceu:sticky_resin", "64x minecraft:apple", "64x gtceu:plant_ball",
        // 作物
        "64x minecraft:pumpkin", "64x minecraft:beetroot", "64x minecraft:melon",
        "64x minecraft:sweet_berries", "64x minecraft:glow_berries", "64x minecraft:wheat",
        "64x minecraft:carrot", "64x minecraft:sugar_cane", "64x minecraft:kelp",
        "64x minecraft:cactus", "64x minecraft:potato", "64x minecraft:cocoa_beans",
        "64x minecraft:brown_mushroom", "64x minecraft:red_mushroom", "64x minecraft:nether_wart",
        "64x minecraft:bamboo", "64x minecraft:vine", "64x minecraft:sea_pickle"
    ]

    var greenhouseRecipe = gtr.greenhouse('thetornproductionline:greenhouse_speed_cultivation_use')
        .notConsumable('thetornproductionline:greenhouse_speed_cultivation_module')
        .inputFluids('minecraft:water 16000')
        .EUt(30)        // 与原版温室相同
        .duration(200)

    greenhouseOutputs.forEach(o => greenhouseRecipe.itemOutputs(o))

    // =================== 时间扭曲者 ===================
    gtr.assembler('thetornproductionline:time_twister_craft')
        .itemInputs(
            'gtceu:ancient_gold_coin',
            'minecraft:glass_bottle'
        )
        .itemOutputs(Item.of('kubejs:time_twister', '{Damage:0,Unbreakable:1b}'))
        .EUt(GTValues.VA[GTValues.LV])   // LV 电压 1A
        .duration(20)                    // 1 秒

    // =================== 火箭组装机配方（LV，1秒） ===================
    const rocketRecipes = [
        {
            id: "ad_astra:tier_1_rocket",
            inputs: [
                "ad_astra:rocket_nose_cone",
                "6x ad_astra:iron_plate",
                "4x ad_astra:rocket_fin",
                "2x ad_astra:steel_tank",
                "ad_astra:steel_engine"
            ]
        },
        {
            id: "ad_astra:tier_2_rocket",
            inputs: [
                "ad_astra:rocket_nose_cone",
                "6x ad_astra:steel_plate",
                "4x ad_astra:rocket_fin",
                "2x ad_astra:steel_tank",
                "ad_astra:steel_engine"
            ]
        },
        {
            id: "ad_astra:tier_3_rocket",
            inputs: [
                "ad_astra:rocket_nose_cone",
                "6x ad_astra:steel_block",
                "4x ad_astra:rocket_fin",
                "2x ad_astra:steel_tank",
                "ad_astra:steel_engine"
            ]
        },
        {
            id: "ad_astra:tier_4_rocket",
            inputs: [
                "ad_astra:rocket_nose_cone",
                "6x ad_astra:desh_plate",
                "4x ad_astra:rocket_fin",
                "2x ad_astra:desh_tank",
                "ad_astra:desh_engine"
            ]
        },
        {
            id: "ad_astra_rocketed:tier_5_rocket",
            inputs: [
                "ad_astra:rocket_nose_cone",
                "6x ad_astra:ostrum_plate",
                "4x ad_astra:rocket_fin",
                "2x ad_astra:ostrum_tank",
                "ad_astra:ostrum_engine"
            ]
        },
        {
            id: "ad_astra_rocketed:tier_6_rocket",
            inputs: [
                "ad_astra:rocket_nose_cone",
                "6x ad_astra:calorite_plate",
                "4x ad_astra:rocket_fin",
                "2x ad_astra:calorite_tank",
                "ad_astra:calorite_engine"
            ]
        }
    ]

    rocketRecipes.forEach(r => {
        gtr.assembler(`thetornproductionline:rocket_assembler_${r.id.replace(':', '_')}`)
            .itemInputs(r.inputs)
            .itemOutputs(r.id)
            .EUt(GTValues.VA[GTValues.LV])
            .duration(20)
    })


    // ================== 世界碎片高速采集模块 ==================

    // 制造配方
    gtr.assembler('thetornproductionline:easy_miner_module_craft')
        .itemInputs('4x gtceu:ulv_fragment_world_collection_machine', 'thetornproductionline:celestial_secret_deducing_module_lv')
        .itemOutputs('thetornproductionline:easy_world_fragment_miner_module')
        .EUt(GTValues.VA[GTValues.LV]).duration(200)

    gtr.assembler('thetornproductionline:advanced_miner_module_craft')
        .itemInputs('4x gtceu:large_fragment_world_collection_machine', 'thetornproductionline:celestial_secret_deducing_module_ev')
        .itemOutputs('thetornproductionline:advanced_world_fragment_miner_module')
        .EUt(GTValues.VA[GTValues.EV]).duration(200)

    gtr.assembler('thetornproductionline:ultimate_miner_module_craft')
        .itemInputs('16x gtceu:ulv_fragment_world_collection_machine', 'thetornproductionline:celestial_secret_deducing_module_iv', '1024x gtceu:titanium_drill_head')
        .itemOutputs('thetornproductionline:ultimate_world_fragment_miner_module')
        .EUt(GTValues.VA[GTValues.IV]).duration(200)

    // 所有世界碎片的数据（直接来自原整合包）
    const allWorldFragmentData = [
        {
            world: 'overworld',
            ore_outputs: [
                "64x gtceu:raw_bentonite", "32x gtceu:raw_magnetite", "32x gtceu:raw_olivine", "16x gtceu:raw_glauconite_sand",
                "48x gtceu:raw_almandine", "32x gtceu:raw_pyrope", "32x gtceu:raw_sapphire", "16x gtceu:raw_green_sapphire",
                "64x gtceu:raw_goethite", "24x gtceu:raw_yellow_limonite", "24x gtceu:raw_hematite", "16x gtceu:raw_malachite",
                "48x gtceu:raw_soapstone", "32x gtceu:raw_talc", "32x gtceu:raw_glauconite_sand", "16x gtceu:raw_pentlandite",
                "48x gtceu:raw_grossular", "32x gtceu:raw_spessartine", "32x gtceu:raw_pyrolusite", "16x gtceu:raw_tantalite",
                "64x gtceu:raw_chalcopyrite", "24x gtceu:raw_zeolite", "24x gtceu:raw_cassiterite", "16x gtceu:raw_realgar",
                "64x gtceu:raw_chalcopyrite", "24x minecraft:raw_iron", "24x gtceu:raw_pyrite", "16x minecraft:raw_copper",
                "64x gtceu:raw_galena", "48x gtceu:raw_silver", "8x gtceu:raw_lead", "8x gtceu:raw_lead",
                "64x gtceu:raw_tin", "16x gtceu:raw_tin", "32x gtceu:raw_cassiterite", "16x gtceu:raw_cassiterite",
                "64x gtceu:raw_redstone", "48x gtceu:raw_ruby", "8x gtceu:raw_cinnabar", "8x gtceu:raw_cinnabar",
                "64x gtceu:raw_graphite", "48x gtceu:raw_diamond", "8x gtceu:raw_coal", "8x gtceu:raw_coal",
                "48x gtceu:raw_garnierite", "32x gtceu:raw_nickel", "32x gtceu:raw_cobaltite", "16x gtceu:raw_pentlandite",
                "48x gtceu:raw_cassiterite_sand", "32x gtceu:raw_garnet_sand", "32x gtceu:raw_asbestos", "16x gtceu:raw_diatomite",
                "64x gtceu:raw_oilsands", "48x gtceu:raw_oilsands", "8x gtceu:raw_oilsands", "8x gtceu:raw_oilsands",
                "48x gtceu:raw_rock_salt", "32x gtceu:raw_salt", "32x gtceu:raw_lepidolite", "16x gtceu:raw_spodumene",
                "64x gtceu:raw_apatite", "16x gtceu:raw_apatite", "32x gtceu:raw_tricalcium_phosphate", "16x gtceu:raw_tricalcium_phosphate",
                "64x gtceu:raw_magnetite", "48x gtceu:raw_vanadium_magnetite", "8x minecraft:raw_gold", "8x minecraft:raw_gold",
                "48x gtceu:raw_red_garnet", "32x gtceu:raw_yellow_garnet", "32x gtceu:raw_amethyst", "16x gtceu:raw_opal",
                "48x gtceu:raw_basaltic_mineral_sand", "32x gtceu:raw_granitic_mineral_sand", "32x gtceu:raw_fullers_earth", "16x gtceu:raw_gypsum",
                "64x gtceu:raw_lazurite", "32x gtceu:raw_sodalite", "32x gtceu:raw_lapis", "16x gtceu:raw_calcite",
                "64x gtceu:raw_kyanite", "48x gtceu:raw_mica", "8x gtceu:raw_pollucite", "8x gtceu:raw_pollucite",
                "64x gtceu:raw_coal", "64x gtceu:raw_coal", "64x gtceu:raw_coal", "64x gtceu:raw_coal"
            ],
            fluid_outputs: ["gtceu:oil_medium 32000", "gtceu:oil 32000", "gtceu:oil_heavy 32000",
                            "gtceu:oil_light 32000", "gtceu:natural_gas 28000", "gtceu:salt_water 16000"]
        },
        {
            world: 'nether',
            ore_outputs: [
                "36x gtceu:raw_bastnasite", "36x gtceu:raw_bastnasite", "28x gtceu:raw_monazite", "28x gtceu:raw_neodymium",
                "64x gtceu:raw_redstone", "48x gtceu:raw_ruby", "8x gtceu:raw_cinnabar", "8x gtceu:raw_cinnabar",
                "36x gtceu:raw_saltpeter", "36x gtceu:raw_diatomite", "36x gtceu:raw_electrotine", "20x gtceu:raw_alunite",
                "38x gtceu:raw_beryllium", "38x gtceu:raw_beryllium", "26x gtceu:raw_emerald", "26x gtceu:raw_emerald",
                "64x gtceu:raw_grossular", "48x gtceu:raw_pyrolusite", "8x gtceu:raw_tantalite", "8x gtceu:raw_tantalite",
                "64x gtceu:raw_wulfenite", "32x gtceu:raw_molybdenite", "16x gtceu:raw_molybdenum", "16x gtceu:raw_powellite",
                "48x gtceu:raw_goethite", "32x gtceu:raw_yellow_limonite", "32x gtceu:raw_hematite", "16x minecraft:raw_gold",
                "64x gtceu:raw_quartzite", "48x gtceu:raw_certus_quartz", "8x gtceu:raw_barite", "8x gtceu:raw_barite",
                "48x gtceu:raw_nether_quartz", "48x gtceu:raw_nether_quartz", "16x gtceu:raw_quartzite", "16x gtceu:raw_quartzite",
                "64x gtceu:raw_sulfur", "48x gtceu:raw_pyrite", "8x gtceu:raw_sphalerite", "8x gtceu:raw_sphalerite",
                "48x gtceu:raw_blue_topaz", "32x gtceu:raw_topaz", "32x gtceu:raw_chalcocite", "16x gtceu:raw_bornite",
                "36x gtceu:raw_tetrahedrite", "36x gtceu:raw_tetrahedrite", "36x minecraft:raw_copper", "20x gtceu:raw_stibnite"
            ],
            fluid_outputs: ["gtceu:natural_gas 48000", "minecraft:lava 40000"]
        },
        {
            world: 'end',
            ore_outputs: [
                "48x gtceu:raw_naquadah", "48x gtceu:raw_naquadah", "16x gtceu:raw_plutonium", "16x gtceu:raw_plutonium",
                "64x gtceu:raw_magnetite", "48x gtceu:raw_vanadium_magnetite", "8x minecraft:raw_gold", "8x minecraft:raw_gold",
                "64x gtceu:raw_scheelite", "48x gtceu:raw_tungstate", "8x gtceu:raw_lithium", "8x gtceu:raw_lithium",
                "48x gtceu:raw_bauxite", "48x gtceu:raw_ilmenite", "16x gtceu:raw_aluminium", "16x gtceu:raw_aluminium",
                "48x gtceu:raw_bornite", "32x gtceu:raw_cooperite", "32x gtceu:raw_platinum", "16x gtceu:raw_palladium",
                "64x gtceu:raw_pitchblende", "16x gtceu:raw_pitchblende", "32x gtceu:raw_uraninite", "16x gtceu:raw_uraninite"
            ],
            fluid_outputs: []
        },
        {
            world: 'moon',
            ore_outputs: [
                "64x gtceu:raw_uraninite", "48x gtceu:raw_thorium", "8x gtceu:raw_plutonium", "8x gtceu:raw_plutonium",
                "48x gtceu:raw_bauxite", "48x gtceu:raw_ilmenite", "16x gtceu:raw_aluminium", "16x gtceu:raw_aluminium",
                "36x gtceu:raw_bastnasite", "36x gtceu:raw_bastnasite", "28x gtceu:raw_monazite", "28x gtceu:raw_neodymium",
                "64x gtceu:raw_uraninite", "48x gtceu:raw_pitchblende", "8x gtceu:raw_thorium", "8x gtceu:raw_thorium"
            ],
            fluid_outputs: ["gtceu:helium 48000", "gtceu:helium_3 28800"]
        },
        {
            world: 'mars',
            ore_outputs: [
                "48x gtceu:raw_bornite", "32x gtceu:raw_cooperite", "32x gtceu:raw_platinum", "16x gtceu:raw_palladium",
                "64x gtceu:raw_scheelite", "48x gtceu:raw_tungstate", "8x gtceu:raw_lithium", "8x gtceu:raw_lithium",
                "54x gtceu:raw_apatite", "54x gtceu:raw_tricalcium_phosphate", "8x gtceu:raw_pyrochlore", "8x gtceu:raw_pyrochlore"
            ],
            fluid_outputs: ["gtceu:radon 12800"]
        },
        {
            world: 'venus',
            ore_outputs: [
                "42x gtceu:raw_magnesite", "22x gtceu:raw_magnesite", "42x gtceu:raw_desh", "22x gtceu:raw_desh",
                "26x gtceu:raw_bentonite", "26x gtceu:raw_magnetite", "50x gtceu:raw_olivine", "26x gtceu:raw_glauconite_sand",
                "64x gtceu:raw_sulfur", "48x gtceu:raw_pyrite", "8x gtceu:raw_sphalerite", "8x gtceu:raw_sphalerite"
            ],
            fluid_outputs: ["gtceu:sulfuric_acid 40000"]
        },
        {
            world: 'mercury',
            ore_outputs: [
                "48x gtceu:raw_garnierite", "32x gtceu:raw_nickel", "32x gtceu:raw_cobaltite", "16x gtceu:raw_pentlandite",
                "32x gtceu:raw_cobalt", "32x gtceu:raw_cobalt", "32x gtceu:raw_calorite", "32x gtceu:raw_magnesite"
            ],
            fluid_outputs: ["gtceu:deuterium 48000"]
        },
        {
            world: 'ceres',
            ore_outputs: [
                "64x gtceu:raw_quartzite", "48x gtceu:raw_certus_quartz", "8x gtceu:raw_barite", "8x gtceu:raw_barite",
                "64x gtceu:raw_wulfenite", "32x gtceu:raw_molybdenite", "16x gtceu:raw_molybdenum", "16x gtceu:raw_powellite",
                "36x gtceu:raw_bastnasite", "36x gtceu:raw_bastnasite", "28x gtceu:raw_monazite", "28x gtceu:raw_neodymium",
                "42x minecraft:raw_gold", "22x minecraft:raw_gold", "42x gtceu:raw_ostrum", "22x gtceu:raw_ostrum"
            ],
            fluid_outputs: ["gtceu:neon 40000", "gtceu:krypton 40000", "gtceu:xenon 40000", "gtceu:radon 40000"]
        },
        {
            world: 'io',
            ore_outputs: [
                "26x gtceu:raw_bentonite", "26x gtceu:raw_magnetite", "50x gtceu:raw_olivine", "26x gtceu:raw_glauconite_sand",
                "48x gtceu:raw_naquadah", "48x gtceu:raw_naquadah", "16x gtceu:raw_plutonium", "16x gtceu:raw_plutonium",
                "64x gtceu:raw_sulfur", "48x gtceu:raw_pyrite", "8x gtceu:raw_sphalerite", "8x gtceu:raw_sphalerite",
                "32x gtceu:raw_trona", "32x gtceu:raw_trona", "32x gtceu:raw_cooperite", "32x gtceu:raw_celestine"
            ],
            fluid_outputs: ["gtceu:coal_gas 48000"]
        },
        {
            world: 'ganymede',
            ore_outputs: [
                "48x gtceu:raw_bauxite", "48x gtceu:raw_ilmenite", "16x gtceu:raw_aluminium", "16x gtceu:raw_aluminium",
                "52x gtceu:raw_nether_quartz", "38x gtceu:raw_barite", "22x gtceu:raw_quartzite", "16x gtceu:raw_quartzite",
                "64x gtceu:raw_sulfur", "48x gtceu:raw_pyrite", "8x gtceu:raw_sphalerite", "8x gtceu:raw_sphalerite",
                "48x gtceu:raw_zircon", "32x gtceu:raw_grossular", "24x gtceu:raw_pyrolusite", "24x gtceu:raw_tantalite",
                "32x gtceu:raw_blue_topaz", "32x gtceu:raw_blue_topaz", "32x gtceu:raw_topaz", "32x gtceu:raw_topaz"
            ],
            fluid_outputs: ["gtceu:hydrochloric_acid 56000"]
        },
        {
            world: 'pluto',
            ore_outputs: [
                "64x gtceu:raw_uraninite", "48x gtceu:raw_thorium", "8x gtceu:raw_plutonium", "8x gtceu:raw_plutonium",
                "48x gtceu:raw_naquadah", "48x gtceu:raw_naquadah", "16x gtceu:raw_plutonium", "16x gtceu:raw_plutonium",
                "48x gtceu:raw_garnierite", "32x gtceu:raw_nickel", "32x gtceu:raw_cobaltite", "16x gtceu:raw_pentlandite",
                "32x minecraft:raw_copper", "32x minecraft:raw_copper", "32x gtceu:raw_stibnite", "32x gtceu:raw_stibnite",
                "64x gtceu:raw_uraninite", "48x gtceu:raw_pitchblende", "8x gtceu:raw_thorium", "8x gtceu:raw_thorium"
            ],
            fluid_outputs: ["gtceu:nitric_acid 48000"]
        },
        {
            world: 'titan',
            ore_outputs: [
                "64x gtceu:raw_uraninite", "48x gtceu:raw_pitchblende", "8x gtceu:raw_thorium", "8x gtceu:raw_thorium",
                "42x gtceu:raw_magnesite", "22x gtceu:raw_magnesite", "42x gtceu:raw_desh", "22x gtceu:raw_desh",
                "48x gtceu:raw_zircon", "32x gtceu:raw_grossular", "24x gtceu:raw_pyrolusite", "24x gtceu:raw_tantalite",
                "36x gtceu:raw_saltpeter", "36x gtceu:raw_diatomite", "36x gtceu:raw_electrotine", "20x gtceu:raw_alunite"
            ],
            fluid_outputs: ["gtceu:methane 40000", "gtceu:benzene 25600", "gtceu:charcoal_byproducts 41600"]
        },
        {
            world: 'enceladus',
            ore_outputs: [
                "48x gtceu:raw_bornite", "32x gtceu:raw_cooperite", "32x gtceu:raw_platinum", "16x gtceu:raw_palladium",
                "26x gtceu:raw_bentonite", "26x gtceu:raw_magnetite", "50x gtceu:raw_olivine", "26x gtceu:raw_glauconite_sand",
                "54x gtceu:raw_apatite", "54x gtceu:raw_tricalcium_phosphate", "8x gtceu:raw_pyrochlore", "8x gtceu:raw_pyrochlore"
            ],
            fluid_outputs: ["gtceu:chlorine 67200", "gtceu:fluorine 51200"]
        },
        {
            world: 'glacio',
            ore_outputs: [
                "64x gtceu:raw_scheelite", "48x gtceu:raw_tungstate", "8x gtceu:raw_lithium", "8x gtceu:raw_lithium",
                "48x gtceu:raw_bornite", "32x gtceu:raw_cooperite", "32x gtceu:raw_platinum", "16x gtceu:raw_palladium",
                "64x gtceu:raw_sulfur", "48x gtceu:raw_pyrite", "8x gtceu:raw_sphalerite", "8x gtceu:raw_sphalerite",
                "64x gtceu:raw_wulfenite", "32x gtceu:raw_molybdenite", "16x gtceu:raw_molybdenum", "16x gtceu:raw_powellite",
                "42x minecraft:raw_gold", "22x minecraft:raw_gold", "42x gtceu:raw_ostrum", "22x gtceu:raw_ostrum",
                "36x gtceu:raw_saltpeter", "36x gtceu:raw_diatomite", "36x gtceu:raw_electrotine", "20x gtceu:raw_alunite",
                "36x gtceu:raw_bastnasite", "36x gtceu:raw_bastnasite", "28x gtceu:raw_monazite", "28x gtceu:raw_neodymium",
                "32x gtceu:raw_trona", "32x gtceu:raw_trona", "32x gtceu:raw_cooperite", "32x gtceu:raw_celestine",
                "32x gtceu:raw_cobalt", "32x gtceu:raw_cobalt", "32x gtceu:raw_calorite", "32x gtceu:raw_magnesite"
            ],
            fluid_outputs: []
        },
        {
            world: 'barnarda',
            ore_outputs: [
                "64x gtceu:raw_uraninite", "48x gtceu:raw_thorium", "8x gtceu:raw_plutonium", "8x gtceu:raw_plutonium",
                "64x gtceu:raw_sulfur", "48x gtceu:raw_pyrite", "8x gtceu:raw_sphalerite", "8x gtceu:raw_sphalerite",
                "64x gtceu:raw_scheelite", "48x gtceu:raw_tungstate", "8x gtceu:raw_lithium", "8x gtceu:raw_lithium",
                "54x gtceu:raw_apatite", "54x gtceu:raw_tricalcium_phosphate", "8x gtceu:raw_pyrochlore", "8x gtceu:raw_pyrochlore",
                "32x gtceu:raw_blue_topaz", "32x gtceu:raw_blue_topaz", "32x gtceu:raw_topaz", "32x gtceu:raw_topaz",
                "64x gtceu:raw_quartzite", "48x gtceu:raw_certus_quartz", "8x gtceu:raw_barite", "8x gtceu:raw_barite",
                "48x gtceu:raw_naquadah", "48x gtceu:raw_naquadah", "16x gtceu:raw_plutonium", "16x gtceu:raw_plutonium"
            ],
            fluid_outputs: ["gtceu:unknowwater 9600"]
        },
        {
            world: 'reactor',
            ore_outputs: [
                "52x gtceu:raw_nether_quartz", "38x gtceu:raw_barite", "22x gtceu:raw_quartzite", "16x gtceu:raw_quartzite",
                "38x gtceu:raw_beryllium", "38x gtceu:raw_beryllium", "26x gtceu:raw_emerald", "26x gtceu:raw_emerald",
                "32x gtceu:raw_blue_topaz", "32x gtceu:raw_blue_topaz", "32x gtceu:raw_topaz", "32x gtceu:raw_topaz",
                "64x gtceu:raw_sulfur", "48x gtceu:raw_pyrite", "8x gtceu:raw_sphalerite", "8x gtceu:raw_sphalerite",
                "32x minecraft:raw_copper", "32x minecraft:raw_copper", "32x gtceu:raw_stibnite", "32x gtceu:raw_stibnite",
                "36x gtceu:raw_saltpeter", "36x gtceu:raw_diatomite", "36x gtceu:raw_electrotine", "20x gtceu:raw_alunite",
                "64x gtceu:raw_quartzite", "48x gtceu:raw_certus_quartz", "8x gtceu:raw_barite", "8x gtceu:raw_barite",
                "64x gtceu:raw_wulfenite", "32x gtceu:raw_molybdenite", "16x gtceu:raw_molybdenum", "16x gtceu:raw_powellite"
            ],
            fluid_outputs: []
        }
    ]

    // 通用配方注册函数
    function addFragmentRecipes(prefix, moduleId, circuit, fragmentId, ores, fluids) {
        let recipe = gtr.fragment_world_collection(`${prefix}_${fragmentId.replace(':', '_')}`)
            .notConsumable(moduleId)
            .notConsumable(fragmentId)
            .circuit(circuit)
            .EUt(8)          // 与原版碎片采集相同的 EU/t
            .duration(1);    // 原版为 1 tick

        // 矿物输出（原版概率 10000）
        ores.forEach(o => {
            let parts = o.split('x ');
            recipe.chancedOutput(`${parts[0]}x ${parts[1]}`, 10000, 0);
        });

        // 碎片自回（50% 概率）
        recipe.chancedOutput(`1x ${fragmentId}`, 5000, 0);

        // 采掘结晶（5% 概率，tier boost 5）
        recipe.chancedOutput('1x gtlcore:mining_crystal', 500, 5);

        // 奇珍结晶（5% 概率）
        recipe.chancedOutput('1x gtlcore:treasures_crystal', 500, 5);

        // 流体输出（仅终极模块有）
        fluids.forEach(f => {
            let [id, amount] = f.split(' ');
            recipe.outputFluids(`${id} ${amount}`);
        });
    }

    // 简易模块（仅主世界，32号电路，无流体）
    addFragmentRecipes(
        'thetornproductionline:easy_world_fragment',
        'thetornproductionline:easy_world_fragment_miner_module', 32,
        'gtlcore:world_fragments_overworld',
        allWorldFragmentData[0].ore_outputs, []
    );

    // 高级模块（所有世界，31号电路，仅矿物）
    allWorldFragmentData.forEach(data => {
        addFragmentRecipes(
            'thetornproductionline:advanced_world_fragment',
            'thetornproductionline:advanced_world_fragment_miner_module', 31,
            `gtlcore:world_fragments_${data.world}`,
            data.ore_outputs, []
        );
    });

    // 终极模块（所有世界，30号电路，矿物+流体）
    allWorldFragmentData.forEach(data => {
        addFragmentRecipes(
            'thetornproductionline:ultimate_world_fragment',
            'thetornproductionline:ultimate_world_fragment_miner_module', 30,
            `gtlcore:world_fragments_${data.world}`,
            data.ore_outputs, data.fluid_outputs
        );
    });

    // =================== ME 无限生物质元件 ===================
    gtr.assembly_line('thetornproductionline:infinity_biomass_cell')
        .inputs(GTItemof_dgy('expatternprovider:infinity_cell', '{record:{"#c":"ae2:i",id:"gtceu:plant_ball"}}'))
        .itemInputs(
            '16x gtladditions:inferno_cleft_smelting_vault',      // 炽隙裂炼穹
            '16x gtladditions:nexus_satellite_factory_mk2',       // 枢纽卫星工厂MK-2
            'thetornproductionline:celestial_secret_deducing_module_uxv', // 天机推演模块UXV
            'gtlcore:cell_component_256m'                         // 256M存储元件
        )
        .itemOutputs(Item.of('expatternprovider:infinity_cell', '{record:{"#c":"ae2:f",id:"gtceu:biomass"}}'))
        .EUt(GTValues.VA[GTValues.UXV])   // UXV 电压 1A
        .duration(200)                    // 10 秒

    // =================== 基岩流体无限元件包 ===================
    const bedrockFluids = [
        "gtceu:oil_heavy", "gtceu:coal_gas", "gtceu:krypton", "gtceu:helium_3",
        "gtceu:methane", "gtceu:chlorine", "gtceu:helium", "gtceu:oil",
        "gtceu:oil_light", "gtceu:unknowwater", "gtceu:benzene", "gtceu:natural_gas",
        "gtceu:charcoal_byproducts", "gtceu:neon", "gtceu:deuterium", "gtceu:xenon",
        "gtceu:radon", "gtceu:hydrochloric_acid", "gtceu:nitric_acid", "gtceu:fluorine",
        "gtceu:sulfuric_acid", "minecraft:lava"
    ]

    let nbtKeys = bedrockFluids.map(id =>
        `{"#c":"ae2:i",id:"expatternprovider:infinity_cell",tag:{record:{"#c":"ae2:f",id:"${id}"}}}`
    ).join(",")

    let nbtAmts = Array(bedrockFluids.length).fill("1L").join(",")
    let cellNBT = `{RepairCost:0,amts:[L;${nbtAmts}],display:{Name:'{"text":"Pacote de componentes ilimitados do Bedrock Fluid"}'},ic:${bedrockFluids.length}L,internalCurrentPower:20000.0d,keys:[${nbtKeys}]}`

    gtr.assembly_line('thetornproductionline:bedrock_fluid_infinity_cell_pack')
        .itemInputs(
            '10240x gtceu:advanced_infinite_driller',
            '40960x kubejs:bedrock_drill',
            '40960x kubejs:opv_universal_circuit',
            '500000x kubejs:machine_casing_grinding_head'
        )
        .itemOutputs(Item.of('ae2:portable_item_cell_16k', cellNBT))
        .EUt(GTValues.VA[GTValues.OpV])   // OPV 电压 1A
        .duration(200)                    // 10 秒

    // =================== 温室元件包 ===================
    const greenhouseItems = [
        "gtceu:sticky_resin", "gtceu:plant_ball",
        "minecraft:spruce_log", "minecraft:cherry_log", "minecraft:mangrove_log",
        "minecraft:birch_log", "gtceu:rubber_log", "minecraft:acacia_log",
        "minecraft:oak_log", "minecraft:jungle_log", "minecraft:dark_oak_log",
        "minecraft:potato", "minecraft:sweet_berries", "minecraft:carrot",
        "minecraft:wheat", "minecraft:kelp", "minecraft:cocoa_beans",
        "minecraft:melon", "minecraft:beetroot", "minecraft:red_mushroom",
        "minecraft:nether_wart", "minecraft:sugar_cane", "minecraft:vine",
        "minecraft:brown_mushroom"
    ]

    let gKeys = greenhouseItems.map(id =>
        `{"#c":"ae2:i",id:"expatternprovider:infinity_cell",tag:{record:{"#c":"ae2:i",id:"${id}"}}}`
    ).join(",")
    let gAmts = Array(greenhouseItems.length).fill("1L").join(",")
    let gCellNBT = `{RepairCost:0,amts:[L;${gAmts}],display:{Name:'{"text":"Pacote de elementos ilimitados de estufa"}'},ic:${greenhouseItems.length}L,internalCurrentPower:20000.0d,keys:[${gKeys}]}`

    gtr.assembler('thetornproductionline:greenhouse_infinity_cell_pack')
        .itemInputs(
            '10240x gtceu:large_extruder',
            '20480x gtceu:uv_parallel_hatch',
            '20480x gtmthings:uv_64a_wireless_energy_input_hatch',   // 64安UV无线能源仓
            '10240x gtceu:large_greenhouse',
            '1x thetornproductionline:greenhouse_speed_cultivation_module'
        )
        .itemOutputs(Item.of('ae2:portable_item_cell_16k', gCellNBT))
        .EUt(GTValues.VA[GTValues.UHV])   // UHV 电压 1A
        .duration(200)                    // 10 秒

    // =================== 高速生物数据模拟模块 ===================
    // 制造配方
    gtr.assembler('thetornproductionline:high_speed_bio_data_module_craft')
        .itemInputs(
            '64x gtladditions:biological_simulation_laboratory',
            'thetornproductionline:celestial_secret_deducing_module_uv',
            'avaritia:infinity_sword',
            '64x kubejs:overworld_data',
            '64x kubejs:nether_data',
            '64x kubejs:end_data'
        )
        .inputFluids('gtceu:biomass 32768000')
        .itemOutputs('thetornproductionline:high_speed_bio_data_module')
        .EUt(GTValues.VA[GTValues.UV])
        .duration(200)

    // 使用配方：列出所有带寰宇支配之剑的配方产物（原版概率）
    const bioOutputs = [
        // 牛 (cow_3)
        { item: "40x minecraft:beef", chance: 7500 },
        { item: "40x minecraft:leather", chance: 2500 },
        // 羊 (sheep_3)
        { item: "40x minecraft:mutton", chance: 8000 },
        { item: "40x minecraft:white_wool", chance: 5000 },
        // 猪 (pig_3)
        { item: "40x minecraft:porkchop", chance: 8000 },
        // 鸡 (chicken_3)
        { item: "40x minecraft:chicken", chance: 7500 },
        { item: "40x minecraft:feather", chance: 4000 },
        { item: "40x minecraft:egg", chance: 1000 },
        // 兔 (rabbit_3)
        { item: "40x minecraft:rabbit", chance: 7000 },
        { item: "40x minecraft:rabbit_hide", chance: 1000 },
        { item: "40x minecraft:rabbit_foot", chance: 500 },
        // 马 (donkey_3)
        { item: "40x minecraft:leather", chance: 5000 },
        // 羊驼 (llama_3)
        { item: "40x minecraft:leather", chance: 5000 },
        // 熊猫 (panda_3)
        { item: "40x minecraft:bamboo", chance: 5000 },
        // 北极熊 (polar_bear_3)
        { item: "40x minecraft:cod", chance: 5000 },
        { item: "40x minecraft:salmon", chance: 5000 },
        // 猫 (cat_3)
        { item: "40x minecraft:string", chance: 5000 },
        // 狼 (wolf 未出现，跳过)
        // 蜘蛛 (spider_3)
        { item: "40x minecraft:string", chance: 7000 },
        { item: "40x minecraft:spider_eye", chance: 2000 },
        // 骷髅 (skeleton_3)
        { item: "40x minecraft:bone", chance: 7500 },
        { item: "40x minecraft:arrow", chance: 6500 },
        // 僵尸 (zombie_3)
        { item: "40x minecraft:rotten_flesh", chance: 7500 },
        { item: "40x minecraft:iron_ingot", chance: 600 },
        { item: "40x minecraft:carrot", chance: 1500 },
        { item: "40x minecraft:potato", chance: 1500 },
        // 尸壳 (husk_3)
        { item: "40x minecraft:rotten_flesh", chance: 7500 },
        { item: "40x minecraft:iron_ingot", chance: 600 },
        { item: "40x minecraft:carrot", chance: 1500 },
        { item: "40x minecraft:potato", chance: 1500 },
        // 溺尸 (drowned_3)
        { item: "40x minecraft:rotten_flesh", chance: 7500 },
        { item: "40x minecraft:copper_ingot", chance: 600 },
        // 僵尸村民 (zombie_villager_3)
        { item: "40x minecraft:rotten_flesh", chance: 7500 },
        { item: "40x minecraft:iron_ingot", chance: 600 },
        { item: "40x minecraft:carrot", chance: 1500 },
        { item: "40x minecraft:potato", chance: 1500 },
        // 苦力怕 (creeper_3)
        { item: "40x minecraft:gunpowder", chance: 8000 },
        // 史莱姆 (slime_3)
        { item: "40x minecraft:slime_ball", chance: 5000 },
        // 末影人 (enderman_3)
        { item: "40x minecraft:ender_pearl", chance: 500 },
        // 女巫 (witch_3)
        { item: "40x minecraft:stick", chance: 5000 },
        { item: "40x minecraft:gunpowder", chance: 3500 },
        { item: "40x minecraft:sugar", chance: 3500 },
        { item: "40x minecraft:glass_bottle", chance: 3500 },
        { item: "40x minecraft:redstone", chance: 600 },
        { item: "40x minecraft:glowstone_dust", chance: 600 },
        { item: "40x minecraft:spider_eye", chance: 600 },
        // 卫道士 (vindicator_3)
        { item: "40x minecraft:emerald", chance: 1000 },
        // 僵尸猪灵 (zombified_piglin_3)
        { item: "40x minecraft:rotten_flesh", chance: 7500 },
        { item: "40x minecraft:gold_ingot", chance: 600 },
        { item: "40x minecraft:gold_nugget", chance: 1000 },
        // 烈焰人 (blaze_3)
        { item: "40x minecraft:blaze_rod", chance: 500 },
        // 恶魂 (ghast_3)
        { item: "40x minecraft:gunpowder", chance: 6000 },
        { item: "40x minecraft:ghast_tear", chance: 600 },
        // 凋灵骷髅 (wither_skeleton_3)
        { item: "40x minecraft:bone", chance: 7500 },
        { item: "40x minecraft:coal", chance: 6500 },
        { item: "40x minecraft:wither_skeleton_skull", chance: 500 },
        // 下界之星 (nether_star)
        { item: "1x minecraft:nether_star", chance: 1500 },
        // 龙蛋 (dragon_egg)
        { item: "1x minecraft:dragon_egg", chance: 10000 }
    ]

    let bioRecipe = gtr.biological_simulation('thetornproductionline:high_speed_bio_data_use')
        .notConsumable('thetornproductionline:high_speed_bio_data_module')
        .inputFluids('gtceu:biomass 16000', 'gtceu:biohmediumsterilized 1000')
        .EUt(GTValues.VA[GTValues.UV])   // UV
        .duration(20)                         // 1 秒

    bioOutputs.forEach(o => {
        bioRecipe.chancedOutput(o.item, o.chance, 0)
    })


    // =================== 太阳能板 LV 组装机配方（18号电路） ===================
    // 基础太阳能板
    gtr.assembler('thetornproductionline:solar_solar_panel_lv18')
        .itemInputs(
            'minecraft:glass_pane',          // 玻璃板
            'gtceu:carbon_fiber_plate',      // 碳板
            '2x kubejs:lv_universal_circuit',// LV通用电路板
            '2x gtceu:silicon_wafer'         // 硅晶圆
        )
        .itemOutputs('gtceu:solar_panel')
        .circuit(18).EUt(GTValues.VA[GTValues.LV]).duration(20)

    // 超低压太阳能板 (ULV)
    gtr.assembler('thetornproductionline:solar_ulv_solar_panel_lv18')
        .itemInputs(
            'minecraft:glass_pane',
            'gtceu:graphene_quadruple_wire',   // 4x 石墨烯导线
            '2x kubejs:hv_universal_circuit',  // HV通用电路板
            '2x gtceu:phosphorus_wafer',       // 磷掺杂的晶圆
            '2x gtceu:gallium_arsenide_plate'  // 砷化镓板
        )
        .itemOutputs('gtceu:ulv_solar_panel')
        .circuit(18).EUt(GTValues.VA[GTValues.LV]).duration(20)

    // 低压太阳能板 (LV)
    gtr.assembler('thetornproductionline:solar_lv_solar_panel_lv18')
        .itemInputs(
            'gtceu:graphene_hex_wire',             // 16x 石墨烯导线（hex wire 即为16倍）
            'gtceu:tempered_glass',                // 钢化玻璃
            '2x gtceu:naquadah_wafer',             // 硅岩掺杂的晶圆
            '2x kubejs:luv_universal_circuit',     // LUV通用电路板
            '2x gtceu:indium_gallium_phosphide_plate' // 磷化铟镓板
        )
        .itemOutputs('gtceu:lv_solar_panel')
        .circuit(18).EUt(GTValues.VA[GTValues.LV]).duration(20)

    // 中压太阳能板 (MV)
    gtr.assembler('thetornproductionline:solar_mv_solar_panel_lv18')
        .itemInputs(
            '4x gtceu:neutronium_wafer',
            'gtceu:laminated_glass',
            '2x #gtceu:circuits/uv',
            'gtceu:mithril_quadruple_wire',
            '2x gtceu:double_indium_gallium_phosphide_plate'
        )
        .itemOutputs('gtceu:mv_solar_panel')
        .circuit(18).EUt(GTValues.VA[GTValues.LV]).duration(20)

    // 高压太阳能板 (HV)
    gtr.assembler('thetornproductionline:solar_hv_solar_panel_lv18')
        .itemInputs(
            '4x kubejs:rutherfordium_neutronium_wafer',
            'gtceu:laminated_glass',
            '2x #gtceu:circuits/uev',
            'gtceu:mithril_hex_wire',
            '2x gtceu:double_germaniumtungstennitride_plate'
        )
        .itemOutputs('gtceu:hv_solar_panel')
        .circuit(18).EUt(GTValues.VA[GTValues.LV]).duration(20)

    // 超高压太阳能板 (EV)
    gtr.assembler('thetornproductionline:solar_ev_solar_panel_lv18')
        .itemInputs(
            '4x kubejs:taranium_wafer',
            'gtceu:laminated_glass',
            '2x #gtceu:circuits/uxv',
            'gtceu:taranium_quadruple_wire',
            '2x gtceu:double_uruium_plate'
        )
        .itemOutputs('gtceu:ev_solar_panel')
        .circuit(18).EUt(GTValues.VA[GTValues.LV]).duration(20)

    // 强导压太阳能板 (IV)
    gtr.assembler('thetornproductionline:solar_iv_solar_panel_lv18')
        .itemInputs(
            '4x kubejs:pm_wafer',
            'gtceu:fusion_glass',
            '2x #gtceu:circuits/max',
            'gtceu:taranium_hex_wire',
            '2x gtceu:double_oganesson_plate'
        )
        .itemOutputs('gtceu:iv_solar_panel')
        .circuit(18).EUt(GTValues.VA[GTValues.LV]).duration(20)

    // 注意：luv/zpm/uv 太阳能板已有配方，不需重复添加

    // =================== 1k ME 存储组件组装机配方 ===================
    gtr.assembler('thetornproductionline:ae_cell_component_1k_lv18')
        .itemInputs(
            '4x minecraft:redstone',
            'ae2:logic_processor',
            '4x gtceu:certus_quartz_gem'
        )
        .itemOutputs('ae2:cell_component_1k')
        .circuit(18)
        .EUt(GTValues.VA[GTValues.LV])
        .duration(20)

    // =================== 便携化学扭曲模块 ===================
    const V = GTValues.VA

    // ---------- 制造配方 ----------
    gtr.assembly_line('portable_distort/mk1')
        .itemInputs(
            '64x gtceu:carbon_nanoswarm', '64x gtceu:glowstone_nanoswarm',
            '64x gtceu:copper_nanoswarm', '64x gtceu:iron_nanoswarm',
            '64x gtceu:gold_nanoswarm', '64x gtceu:silver_nanoswarm',
            '64x gtceu:iridium_nanoswarm', '64x gtceu:osmium_nanoswarm',
            '64x gtceu:rhenium_nanoswarm', '64x gtceu:naquadah_nanoswarm',
            '64x gtceu:neutronium_nanoswarm', '64x gtceu:orichalcum_nanoswarm',
            '16x thetornproductionline:celestial_secret_deducing_module_uv'
        )
        .itemOutputs('kubejs:portable_chem_distort_module_mk1')
        .EUt(V[GTValues.UV]).duration(64 * 20)

    gtr.assembly_line('portable_distort/mk2')
        .itemInputs(
            '64x gtceu:enderium_nanoswarm', '64x gtceu:infuscolium_nanoswarm',
            '64x gtceu:uruium_nanoswarm', '64x gtceu:vibranium_nanoswarm',
            '64x gtceu:starmetal_nanoswarm', '64x gtceu:draconium_nanoswarm',
            '16x thetornproductionline:celestial_secret_deducing_module_uev',
            '1x kubejs:portable_chem_distort_module_mk1'
        )
        .itemOutputs('kubejs:portable_chem_distort_module_mk2')
        .EUt(V[GTValues.UEV]).duration(64 * 20)

    gtr.assembly_line('portable_distort/mk3')
        .itemInputs(
            '64x gtceu:cosmicneutronium_nanoswarm', '64x gtceu:white_dwarf_mtter_nanoswarm',
            '64x gtceu:black_dwarf_mtter_nanoswarm', '64x gtceu:spacetime_nanoswarm',
            '64x gtceu:transcendentmetal_nanoswarm', '64x gtceu:eternity_nanoswarm',
            '16x thetornproductionline:celestial_secret_deducing_module_uxv',
            '1x kubejs:portable_chem_distort_module_mk2'
        )
        .itemOutputs('kubejs:portable_chem_distort_module_mk3')
        .EUt(V[GTValues.UXV]).duration(64 * 20)

    gtr.assembly_line('portable_distort/mk4')
        .itemInputs(
            '4x avaritia:infinity_catalyst', '4x kubejs:spacetime_catalyst',
            '4x kubejs:eternity_catalyst',
            '4x thetornproductionline:celestial_secret_deducing_module_opv',
            '1x kubejs:portable_chem_distort_module_mk3'
        )
        .itemOutputs('kubejs:portable_chem_distort_module_mk4')
        .EUt(V[GTValues.OpV]).duration(64 * 20)

    // ---------- 通用配方注册函数（已去除额外催化剂） ----------
    function addPortableDistort(id, circuit, level, items, fluidsIn, itemsOut, fluidsOut, eu, dur, cleanroom, blastTemp) {
        let builder = gtr.distort(`portable_distort/${id}`)
            .notConsumable(`#kubejs:portable_distort_module_mk${level}`)
            .circuit(circuit)
        items.forEach(i => builder.itemInputs(i))
        fluidsIn.forEach(f => builder.inputFluids(f))
        itemsOut.forEach(o => builder.itemOutputs(o))
        fluidsOut.forEach(f => builder.outputFluids(f))
        builder.EUt(eu).duration(dur).blastFurnaceTemp(blastTemp)
        if (cleanroom) {
            let cr = cleanroom === 'cleanroom' ? CleanroomType.CLEANROOM
                    : cleanroom === 'sterile_cleanroom' ? CleanroomType.STERILE_CLEANROOM
                    : cleanroom === 'law_cleanroom' ? GTLCleanroomType.LAW_CLEANROOM
                    : null
            if (cr) builder.cleanroom(cr)
        }
    }

    // ============== 按蜂群合并配方（已全部简化为撕裂者条件） ==============

    // ---- carbon_nanoswarm (1) ----
    addPortableDistort('epoxy', 1, 1,  ['1x gtceu:phosphorus_dust','16x gtceu:salt_dust'], ['minecraft:water 21500','gtceu:oxygen 10500','gtceu:propene 4000','gtceu:benzene 6000'], ['86x gtceu:sodium_hydroxide_dust'], ['gtceu:epoxy 4000','gtceu:hydrogen 16000','gtceu:hydrochloric_acid 4000'], 122880,24, null,800)
    addPortableDistort('polytetrafluoroethylene', 1,1, [], ['gtceu:oxygen 5000','gtceu:methane 1440','gtceu:fluorine 2880'], [], ['gtceu:polytetrafluoroethylene 1080','gtceu:hydrogen 5760'], 122880,24, null,800)
    addPortableDistort('polyvinyl_butyral', 1,1, ['96x gtceu:carbon_dust','4x gtceu:rutile_dust'], ['gtceu:hydrogen 52000','gtceu:oxygen 32000','gtceu:chlorine 4000','gtceu:propene 16000','gtceu:ethylene 10000'], [], ['gtceu:polyvinyl_butyral 36864'], 491520,240, null,800)
    addPortableDistort('acidic_naquadria_solution', 1,1, ['1x gtceu:enriched_naquadah_dust'], ['gtceu:sulfuric_acid 2000'], [], ['gtceu:acidic_naquadria_solution 3000'], 491520,20, null,800)
    addPortableDistort('acidic_enriched_naquadah_solution', 1,1, ['1x gtceu:naquadria_dust'], ['gtceu:sulfuric_acid 2000'], [], ['gtceu:acidic_enriched_naquadah_solution 3000'], 491520,20, null,800)

    // ---- glowstone_nanoswarm (2) ----
    addPortableDistort('polyimide', 2,1, ['486x gtceu:carbon_dust'], ['gtceu:hydrogen 256000','gtceu:nitrogen_dioxide 64000'], [], ['gtceu:polyimide 21000','gtceu:hydrogen 12800','gtceu:nitrogen 6400'], 1966080,400, 'cleanroom',800)
    addPortableDistort('polyvinyl_chloride', 2,1, [], ['gtceu:oxygen 10000','gtceu:chlorine 1440','gtceu:ethylene 1440'], [], ['gtceu:polyvinyl_chloride 2160','gtceu:hydrogen 1440'], 7680,16, null,800)

    // ---- copper_nanoswarm (3) ----
    addPortableDistort('silicone_rubber', 3,1, ['3x gtceu:silicon_dust','1x gtceu:sulfur_dust'], ['minecraft:water 2000','gtceu:methane 4000'], [], ['gtceu:silicone_rubber 1296','gtceu:hydrogen 4000'], 30720,32, null,800)
    // 液态聚己内酰胺 (原 cxbp:polycaprolactam_di，催化剂铜块 → 电路3)
    addPortableDistort('polycaprolactam', 3, 1,['6x gtceu:carbon_dust'],['gtceu:hydrogen 11000', 'gtceu:oxygen 1000', 'gtceu:nitrogen 1000'],[],['gtceu:polycaprolactam 2736'],7680, 256, 'cleanroom', 800);

    // ---- iron_nanoswarm (4) ----
    addPortableDistort('styrene_butadiene_rubber', 4,1, ['5x gtceu:sulfur_dust'], ['gtceu:butadiene 3000','gtceu:benzene 1000','gtceu:ethylene 1000','gtceu:oxygen 15000'], [], ['gtceu:styrene_butadiene_rubber 6480','gtceu:hydrogen 2000'], 122880,12, null,800)

    // ---- gold_nanoswarm (5) ----
    addPortableDistort('polyurethaneresin', 5,1, ['45x gtceu:tin_dust','64x gtceu:carbon_dust','5x gtceu:nickel_dust','5x gtceu:palladium_dust','5x gtceu:iron_dust','36x gtceu:silicon_dust'], ['gtceu:oxygen 1964000','gtceu:hydrogen 529000','gtceu:chlorine 870000','gtceu:nitrogen 45000'], [], ['gtceu:polyurethaneresin 45000'], 1966080,270, 'cleanroom',800)
    addPortableDistort('photoresist', 15,1, ['91x gtceu:rutile_dust','60x gtceu:carbon_dust','42x gtceu:sodium_hydroxide_dust'], ['gtceu:sulfuric_acid 80000','gtceu:ethanol 7000','gtceu:chlorine 81000','gtceu:propene 15000','gtceu:benzene 39000','gtceu:ethylene 47000'], [], ['gtceu:photoresist 16000'], 1966080,1920, 'cleanroom',800)
    addPortableDistort('bedrock_gas', 15,1, ['72x gtceu:bedrock_dust','63x gtceu:naquadah_dust'], ['gtceu:distilled_water 72000','gtceu:xenon 7200'], ['4x gtceu:naquadria_dust','4x gtceu:enriched_naquadah_dust'], ['gtceu:bedrock_gas 36000'], 1966080,2560, 'law_cleanroom',800)

    // ---- silver_nanoswarm (6) ----
    addPortableDistort('polyphenylene_sulfide', 6,1, ['16x gtceu:sulfur_dust'], ['gtceu:benzene 16000'], [], ['gtceu:polyphenylene_sulfide 24000','gtceu:hydrogen 32000'], 491520,12, 'cleanroom',800)
    addPortableDistort('mutagen', 6,1, ['256x gtceu:bio_chaff','1x gtceu:naquadria_dust'], ['gtceu:distilled_water 10000'], [], ['gtceu:mutagen 10000'], 491520,200, 'sterile_cleanroom',800)

    // ---- iridium_nanoswarm (7) ----
    addPortableDistort('polybenzimidazole', 7,1, ['1152x gtceu:carbon_dust','16x gtceu:copper_dust','144x gtceu:zinc_dust'], ['gtceu:chlorobenzene 28800','gtceu:sulfuric_acid 14400','gtceu:hydrogen 316800','gtceu:nitrogen 57600','gtceu:oxygen 201600'], [], ['gtceu:polybenzimidazole 21600'], 1966080,200, 'cleanroom',800)
    addPortableDistort('platinum_dust', 7,1, ['576x gtceu:platinum_group_sludge_dust','16x gtceu:sulfur_dust'], ['gtceu:hydrogen 72000','gtceu:oxygen 128000','gtceu:chlorine 14400'], ['64x gtceu:platinum_dust','64x gtceu:palladium_dust','60x gtceu:ruthenium_dust','32x gtceu:iridium_dust','48x gtceu:rhodium_dust','32x gtceu:osmium_dust'], ['gtceu:hydrogen 2800','minecraft:water 7200','gtceu:chlorine 6400'], 491520,20, null,800)

    // ---- osmium_nanoswarm (8) ----
    addPortableDistort('cycloparaphenylene', 8,1, ['1920x gtceu:carbon_dust','64x gtceu:iodine_dust'], ['gtceu:hydrogen 640000','gtceu:oxygen 96000','gtceu:chlorine 96000','gtceu:fluorine 96000'], [], ['gtceu:cycloparaphenylene 32000','gtceu:fluorine 4800','gtceu:chlorine 3200'], 1966080,200, 'cleanroom',800)
    addPortableDistort('zirconium_dust', 8,1, ['1152x gtceu:zircon_dust','64x gtceu:potassium_dust'], ['gtceu:chlorine 512000','gtceu:hydrogen 256000','gtceu:hydrogen_peroxide 128000','gtceu:sulfur_trioxide 64000'], ['64x gtceu:zirconium_dust','48x gtceu:hafnium_dust','448x gtceu:potassium_sulfate_dust'], ['gtceu:hydrochloric_acid 512000'], 1966080,1280, 'cleanroom',800)
    addPortableDistort('unfolded_fullerene_dust', 13,1, ['3780x gtceu:carbon_dust'], ['gtceu:methane 60000','gtceu:bromine 60000','gtceu:nitrogen 60000'], ['64x gtceu:unfolded_fullerene_dust'], ['gtceu:hydrobromic_acid 60000'], 1966080,3200, 'cleanroom',800)

    // ---- rhenium_nanoswarm (9) ----
    addPortableDistort('liquidcrystalkevlar', 9,1, ['64x gtceu:carbon_dust','2x gtceu:calcium_dust'], ['gtceu:hydrogen 100000','gtceu:chlorine 16000','gtceu:oxygen 18000','gtceu:nitrogen 18000'], [], ['gtceu:liquidcrystalkevlar 45000'], 1966080,400, 'cleanroom',800)
    addPortableDistort('rare_earth_dust_monazite', 9,1, ['64x gtceu:monazite_dust','288x gtceu:cerium_rich_mixture_powder_dust','360x gtceu:samarium_refined_powder_dust'], ['gtceu:nitric_acid 120000','gtceu:chlorine 160000','gtceu:acetone 160000'], ['1440x gtceu:rare_earth_dust','512x gtceu:uranium_235_dust','480x gtceu:samarium_dust','384x gtceu:phosphorus_dust'], ['gtceu:hydrogen 96000','gtceu:diluted_hydrochloric_acid 96000','gtceu:nitrogen 90000'], 1966080,1, 'cleanroom',800)
    addPortableDistort('rhenium_dust', 9,1, ['48x gtceu:molybdenite_dust','3x gtceu:iron_dust'], ['gtceu:hydrogen 112000','gtceu:oxygen 68000','gtceu:chlorine 12000'], ['48x gtceu:rhenium_dust','16x gtceu:gold_dust','16x gtceu:molybdenum_dust'], ['gtceu:hydrogen_sulfide 48000'], 1966080,1, 'cleanroom',800)

    // ---- naquadah_nanoswarm (10) ----
    addPortableDistort('naquadria_dust', 10,1, ['128x gtceu:naquadah_dust','16x gtceu:caesium_dust'], ['gtceu:fluorine 32000','gtceu:fluoroantimonic_acid 64000','gtceu:sulfuric_acid 12000','gtceu:radon 8000','gtceu:nitrogen_dioxide 4000','gtceu:xenon 4000'], ['64x gtceu:naquadria_dust','64x gtceu:trinium_dust','256x gtceu:antimony_trifluoride_dust'], ['gtceu:hydrofluoric_acid 272000','gtceu:radon_trioxide 8000','gtceu:xenon_trioxide 4000','gtceu:caesium_fluoride 16000'], 1966080,360, 'cleanroom',800)
    gtr.distort('portable_distort/stem_cells')
        .notConsumable('#kubejs:portable_distort_module_mk1')
        .circuit(10)
        .itemInputs('gtceu:tiny_naquadah_dust','gtceu:osmiridium_dust','gtceu:salt_dust','gtceu:calcium_dust','4x gtceu:meat_dust','4x gtceu:bio_chaff','2x minecraft:bone')
        .chancedInput('kubejs:glacio_spirit', 8000, -100)
        .inputFluids('gtceu:phosphoric_acid 1000','minecraft:water 3000','gtceu:distilled_water 2000','gtceu:biomass 1000')
        .itemOutputs('64x gtceu:stem_cells','gtceu:phosphorus_dust')
        .EUt(1966080).duration(60).blastFurnaceTemp(800).cleanroom(CleanroomType.STERILE_CLEANROOM)

    // ---- neutronium_nanoswarm (11) ----
    addPortableDistort('agar_dust', 11,1, ['256x gtceu:meat_dust','256x minecraft:bone','64x gtceu:sulfur_dust','16x gtceu:phosphorus_dust'], ['gtceu:distilled_water 128000','gtceu:oxygen 128000'], ['384x gtceu:agar_dust'], [], 1966080,1, 'sterile_cleanroom',800)
    addPortableDistort('biological_cells', 11,1, ['256x gtceu:stem_cells','64x gtceu:meat_dust','64x gtceu:salt_dust','64x gtceu:calcium_dust','64x gtceu:agar_dust','4x kubejs:tcetieseaweedextract','2x gtceu:enriched_naquadah_dust'], ['gtceu:mutagen 10000','gtceu:tritanium 144'], ['64x kubejs:biological_cells'], [], 491520,400, 'sterile_cleanroom',800)
    addPortableDistort('tcetieseaweedextract', 14,1, ['450x gtceu:salt_dust','450x gtceu:agar_dust','450x gtceu:meat_dust','228x minecraft:kelp','90x gtceu:alien_algae_dust','36x gtceu:energium_dust','4x gtceu:mithril_dust'], ['gtceu:unknowwater 112000','gtceu:methane 225000','gtceu:naphthalene 90000','gtceu:oxygen 180000'], ['256x kubejs:tcetieseaweedextract'], [], 1966080,1920, 'sterile_cleanroom',800)
    addPortableDistort('polyetheretherketone', 16,1, ['16x gtceu:sodium_dust'], ['gtceu:chlorine 48000','gtceu:benzene 16000','gtceu:oxygen 60000','gtceu:propene 8000','gtceu:nitric_acid 8000'], ['32x gtceu:sodium_fluoride_dust'], ['gtceu:polyetheretherketone 20736','minecraft:water 8000','gtceu:carbon_dioxide 8000'], 1966080,6560, 'cleanroom',800)

    // ---- orichalcum_nanoswarm (12) ----
    addPortableDistort('hexanitrohexaaxaisowurtzitane_dust', 12,1, ['191x gtceu:silica_gel_dust','76x gtceu:succinic_acid_dust','144x gtceu:activated_carbon_dust','216x gtceu:sodium_dust','47x gtceu:boron_trioxide_dust','39x gtceu:potassium_carbonate_dust','101x gtceu:barium_chloride_dust'], ['gtceu:hydrogen 470000','gtceu:hydrofluoric_acid 12000','gtceu:methanol 62000','gtceu:nitric_acid 15000','gtceu:ammonia 39000','gtceu:glyoxal 47000','gtceu:oxygen_plasma 11000','gtceu:acetic_anhydride 9000','gtceu:nitrogen_plasma 7000'], ['288x gtceu:hexanitrohexaaxaisowurtzitane_dust'], [], 1966080,20480, 'cleanroom',800)
    addPortableDistort('liquid_starlight', 12, 1,[],['minecraft:water 100000', 'gtceu:starlight 10000', 'gtceu:mana 10000'],[],['gtceu:liquid_starlight 10000'],7864320, 256, 'law_cleanroom', 800);
    addPortableDistort('zylon_dust', 20,1, ['1762x gtceu:sulfur_dust','41x gtceu:sodium_dust'], ['gtceu:bromine 15200','gtceu:toluene 432000','gtceu:hydrogen 412000','gtceu:ethane 6000','gtceu:propene 50000','gtceu:nitric_acid 67000','gtceu:oxygen 40000','gtceu:benzene 70000'], ['115x gtceu:zylon_dust'], [], 1966080,640, 'cleanroom',800)

    // ---- 产线撕裂补全 (26~32) ----
    addPortableDistort('trinium_compound', 17,1, ['360x gtceu:trinium_compound_dust','512x gtceu:sodium_hydroxide_dust','16x gtceu:fullerene_dust','16x gtceu:carbon_nanotubes_dust'], ['gtceu:nitric_acid 300000','gtceu:hydrogen_peroxide 12000','gtceu:sulfur_dioxide 64000','gtceu:chlorine 64000'], ['360x gtceu:trinium_dust','360x gtceu:actinium_dust','320x gtceu:selenium_dust','320x gtceu:astatine_dust','64x gtceu:salt_dust'], ['gtceu:residual_triniite_solution 128000','gtceu:actinium_radium_nitrate_solution 320000'], 1966080,2000, 'cleanroom',800)
    addPortableDistort('grade_5_purified_water', 26,1, [], ['minecraft:water 1000','gtceu:nitrogen 128000'], [], ['gtceu:grade_5_purified_water 685'], 491520,100, null,800)
    addPortableDistort('grade_8_purified_water', 26,1, [], ['gtceu:grade_5_purified_water 1000'], [], ['gtceu:grade_8_purified_water 810'], 491520,60, null,800)
    addPortableDistort('grade_13_purified_water', 26,1, [], ['gtceu:grade_8_purified_water 1000','gtceu:liquid_oxygen 1000'], [], ['gtceu:grade_13_purified_water 728'], 31457280,600, null,800)
    addPortableDistort('grade_16_purified_water', 26, 1,[],['gtceu:enderium_plasma 1000', 'gtceu:grade_13_purified_water 10000', 'gtceu:echoite_plasma 1000', 'gtceu:mithril_plasma 1000'],['61x gtceu:tiny_enderium_dust', '62x gtceu:tiny_echoite_dust', '60x gtceu:tiny_mithril_dust'],['gtceu:grade_16_purified_water 10000'],31457280, 600, null, 800);
    addPortableDistort('naquadah_contain_rare_earth_dust', 27,1, ['12x #forge:ores/enriched_naquadah','12x gtceu:sulfur_dust','9x gtceu:quicklime_dust','9x gtceu:potash_dust','6x gtceu:rare_earth_dust','6x gtceu:carbon_dust','gtceu:alunite_dust','140x #minecraft:logs'], ['gtceu:steam 140000','minecraft:water 15000','gtceu:naphtha 14000','gtceu:sulfuric_acid 4000','gtceu:hydrogen 2000'], ['gtceu:naquadah_contain_rare_earth_dust'], [], 31457280,80, null,800)
    addPortableDistort('naquadah_processing', 28, 1,['320x gtceu:naquadah_ore', '320x gtceu:enriched_naquadah_ore', '128x gtceu:gold_dust'],['gtceu:sulfuric_acid 64000', 'gtceu:nitric_acid 128000', 'gtceu:hydrochloric_acid 96000'],['16x gtceu:adamantine_dust', '64x gtceu:naquadah_dust', '32x gtceu:enriched_naquadah_dust', '8x gtceu:naquadria_dust'],[],3638400, 1, null, 14400)
    addPortableDistort('aerographene', 29, 1,['2x gtceu:sugar_gem'],['gtceu:oxygen 4000', 'gtceu:chlorine 3000', 'gtceu:propene 1000', 'minecraft:water 1000', 'gtceu:benzene 1000', 'gtceu:acetone 1000', 'gtceu:methanol 1000', 'gtceu:carbon_dioxide 1000'],['kubejs:aerographene'],[],491520, 200, null, 800);
    addPortableDistort('polycyclic_aromatic_mixture', 30, 1,['12x gtceu:carbon_dust'],['gtceu:naphthalene 32000', 'gtceu:hydrogen 12000', 'gtceu:chlorine 6000', 'gtceu:methanol 4000', 'minecraft:water 1000', 'gtceu:propene 1000'],['90x gtceu:polycyclic_aromatic_mixture_dust'],[],491520, 200, null, 800);
    addPortableDistort('viscoelastic_polyurethane_foam', 31, 1,['1x gtceu:calcium_dust', '3x gtceu:carbon_dust'],['gtceu:oxygen 11000', 'minecraft:water 5000', 'gtceu:ethylene 5000', 'gtceu:air 2000', 'gtceu:nitric_acid 2000', 'gtceu:hydrogen 1000', 'gtceu:toluene 1000'],[],['gtceu:viscoelastic_polyurethane_foam 4000'],491520, 200, null, 800);
    addPortableDistort('fullerene_polymer_matrix_pulp', 31, 1,['32x gtceu:carbon_dust', '16x gtceu:fullerene_dust', '8x gtceu:palladium_dust', '8x gtceu:iron_dust'],['gtceu:hydrogen 176000', 'gtceu:chlorine 88000', 'gtceu:oxygen 48000', 'gtceu:benzene 23000', 'gtceu:cyclopentadiene 16000', 'gtceu:ethylene 15000', 'gtceu:nitrogen 8000', 'gtceu:propene 8000', 'gtceu:acetic_acid 8000'],['16x gtceu:fullerene_polymer_matrix_pulp_dust'],[],31457280, 3600, 'cleanroom', 800);
    addPortableDistort('azafullerene', 32, 1,['1x gtceu:fullerene_dust'],['gtceu:nitrogen 12000', 'gtceu:hydrogen 8000'],[],['gtceu:azafullerene 1000'],491520, 200, null, 800);
    addPortableDistort('thallium_dust', 32, 1,['28x gtceu:rubber_log', '11x gtceu:grossular_ore', '6x gtceu:sulfur_dust', '3x gtceu:carbon_dust', '2x gtceu:potassium_dust'],['gtceu:steam 28000', 'gtceu:naphtha 2800', 'gtceu:ethanol 2000'],['4x gtceu:thallium_dust', '32x gtceu:calcium_dust', '32x gtceu:aluminium_dust', '16x gtceu:tungsten_dust'],[],491520, 200, null, 800);
    addPortableDistort('super_mutated_living_solder', 32, 1,['1152x kubejs:draconium_dust', '1152x ae2:sky_dust', '144x gtceu:nether_star_dust', '432x gtceu:coal_ore', '288x minecraft:wheat_seeds'],['gtceu:biomass 295200', 'gtceu:milk 180000', 'gtceu:sterilized_growth_medium 115200', 'gtceu:mutated_living_solder 180000', 'gtceu:distilled_water 18000', 'gtceu:carbon_dioxide 18000'],[],['gtceu:super_mutated_living_solder 180000'],GTValues.VA[GTValues.UEV], 1200, null, 800)

    //二级模块
    // ---- enderium_nanoswarm (13) ----

    // ---- infuscolium_nanoswarm (14) ----
    addPortableDistort('euv_photoresist', 14,2, ['30x gtceu:rhenium_dust','56x gtceu:lithium_dust','40x gtceu:selenium_dust','50x gtceu:activated_carbon_dust','60x gtceu:rutile_dust','55x gtceu:quicklime_dust'], ['gtceu:ethane 12000','gtceu:chlorine 75000','gtceu:photoresist 8000','gtceu:hydrogen 4700','gtceu:oxygen 89000','gtceu:nitrogen 40000','gtceu:butane 57000'], [], ['gtceu:euv_photoresist 21600'], 31457280,5120, 'cleanroom',800)

    // ---- uruium_nanoswarm (15) ----
    addPortableDistort('photopolymer', 21,2, ['768x gtceu:carbon_dust','50x gtceu:rutile_dust','70x gtceu:succinic_acid_dust','32x gtceu:ice_dust','20x gtceu:silver_dust','25x gtceu:quicklime_dust','40x gtceu:boron_dust'], ['gtceu:benzene 40000','gtceu:bromine 25000','gtceu:oxygen 21600','gtceu:chlorine 5600','gtceu:propene 16000','gtceu:butene 80000','gtceu:sodium 17280'], [], ['gtceu:photopolymer 16000'], 125829120,10240, 'cleanroom',800)

    // ---- vibranium_nanoswarm (16) ----

    // ---- starmetal_nanoswarm (17) ----

    // ---- draconium_nanoswarm (18) ----
    addPortableDistort('cosmic_superconductor', 18,2, ['18x gtceu:sulfur_dust','6x gtceu:sodium_dust','1x gtceu:thallium_dust','6x gtceu:rhenium_chloride_dust','5x gtceu:hassium_chloride_dust','36x gtceu:atinium_hydride_dust','14x gtceu:charged_caesium_cerium_cobalt_indium_dust'], ['gtceu:chlorine 34000','gtceu:fluorine 3000','gtceu:ethylene 12000','gtceu:oxygen 46000','gtceu:hydrogen 102000','gtceu:uu_matter 2000','gtceu:quark_gluon_plasma 17000','gtceu:benzene 3000','gtceu:acetone 6000'], [], ['gtceu:cosmic_superconductor 10000'], 125829120,16000, 'law_cleanroom',800)

    //三级模块
    // ---- transcendentmetal_nanoswarm (19) ----
    addPortableDistort('composite_3', 19,3, ['5828x gtceu:carbon_dust','64x gtceu:iodine_dust','45x gtceu:tin_dust','36x gtceu:silicon_dust','5x gtceu:palladium_dust','5x gtceu:nickel_dust','5x gtceu:iron_dust','2x gtceu:calcium_dust'], ['gtceu:oxygen 2078000','gtceu:hydrogen 1269000','gtceu:chlorine 982000','gtceu:nitrogen 123000','gtceu:fluorine 96000','gtceu:methane 60000','gtceu:bromine 60000'], ['64x gtceu:unfolded_fullerene_dust'], ['gtceu:cycloparaphenylene 32000','gtceu:polyurethaneresin 45000','gtceu:liquidcrystalkevlar 45000','gtceu:hydrobromic_acid 60000','gtceu:fluorine 4800','gtceu:chlorine 3200'], 2013265920,1, 'law_cleanroom',800)

    // ---- black_dwarf_mtter_nanoswarm (20) ----
    // 富勒烯粉 (原 cxbp:fullerene_dust_di，催化剂黑矮星物质纳米蜂群 → 电路20)
    addPortableDistort('fullerene_dust', 20, 3,['60x gtceu:carbon_dust'],[],['60x gtceu:fullerene_dust'],[],503316480, 128, null, 21600);

    // ---- white_dwarf_mtter_nanoswarm (21) ----

    // ---- cosmicneutronium_nanoswarm (22) ----
    addPortableDistort('composite_1', 22,3, ['1440x gtceu:carbon_dust','36x gtceu:sulfur_dust','36x gtceu:silicon_dust'], ['gtceu:hydrogen 1908000','gtceu:oxygen 144000','gtceu:fluorine 144000','gtceu:chlorine 36000'], [], ['gtceu:polyvinyl_chloride 36000','gtceu:polytetrafluoroethylene 36000','gtceu:silicone_rubber 36000','gtceu:polyphenylene_sulfide 36000','gtceu:styrene_butadiene_rubber 36000','gtceu:polyvinyl_butyral 36000'], 125829120,1, 'law_cleanroom',800)

    // ---- spacetime_nanoswarm (23) ----
    addPortableDistort('composite_2', 23,3, ['1440x gtceu:carbon_dust'], ['gtceu:hydrogen 440000','gtceu:oxygen 88000','gtceu:nitrogen 40000','gtceu:chlorine 8000'], [], ['gtceu:epoxy 8000','gtceu:polyetheretherketone 8000','gtceu:polybenzimidazole 8000','gtceu:polyimide 8000'], 503316480,1, 'law_cleanroom',800)

    //四级模块
    // ---- infinity_catalyst (MK4) (24,25) ----
    addPortableDistort('biology_process', 24,4, ['256x gtceu:stem_cells','256x gtceu:agar_dust','256x kubejs:tcetieseaweedextract'], [], ['8192x kubejs:biological_cells'], ['gtceu:mutated_living_solder 73728','gtceu:biohmediumsterilized 1024000','gtceu:sterilized_growth_medium 1024000'], 503316480,1, 'sterile_cleanroom',800)

    addPortableDistort('hexanitrohexaaxaisowurtzitane_dust_twisted', 25, 4,['6x gtceu:carbon_dust'],['gtceu:hydrogen 6000', 'gtceu:nitrogen 12000', 'gtceu:oxygen 12000'],['36x gtceu:hexanitrohexaaxaisowurtzitane_dust'],[],2013265920, 256, 'law_cleanroom', 800)

    // =================== 基岩粉反循环 ===================
    gtr.distort('portable_distort/bedrock_dust_loop')
        .notConsumable('64x gtceu:bedrock_drilling_rig')
        .circuit(2)
        .itemInputs(
            '64x kubejs:reinforced_echo_shard',
            '64x gtceu:neutronium_buzz_saw_blade',
            '256x gtceu:double_neutronium_plate'
        )
        .inputFluids(
            'gtceu:rhodium 36864',
            'gtceu:hastelloy_x 36864',
            'gtceu:hsss 36864',
            'gtceu:hsse 36864',
            'gtceu:mana 1024000'
        )
        .itemOutputs('32512x gtceu:bedrock_dust')
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(96000)

    // =================== 搅拌机配方 (删除重力条件) ===================
    // 量子之眼 (HV, 200 ticks)
    gtr.mixer('thetornproductionline:quantum_eye_mixer')
        .itemInputs('minecraft:ender_eye')
        .inputFluids('gtceu:radon 250')
        .itemOutputs('gtceu:quantum_eye')
        .EUt(GTValues.VA[GTValues.HV])
        .duration(200)

    // 下界之星粉 (HV, 200 ticks)
    gtr.mixer('thetornproductionline:nether_star_dust_mixer')
        .itemInputs('gtceu:diamond_dust', 'gtceu:iridium_dust')
        .inputFluids('gtceu:rocket_fuel 1000', 'gtceu:nether_air 8000')
        .itemOutputs('gtceu:nether_star_dust')
        .EUt(GTValues.VA[GTValues.HV])
        .duration(200)

    // 量子之星 (HV, 200 ticks)
    gtr.mixer('thetornproductionline:quantum_star_mixer')
        .itemInputs('minecraft:nether_star')
        .inputFluids('gtceu:radon 1250')
        .itemOutputs('gtceu:quantum_star')
        .EUt(GTValues.VA[GTValues.HV])
        .duration(200)

    // 重力之星 (IV, 200 ticks)
    gtr.mixer('thetornproductionline:gravi_star_mixer')
        .itemInputs('gtceu:quantum_star')
        .inputFluids('gtceu:neutronium 288')
        .itemOutputs('gtceu:gravi_star')
        .EUt(GTValues.VA[GTValues.IV])
        .duration(200)

    // 刻蚀水晶芯片 (HV, 200 ticks)
    gtr.mixer('thetornproductionline:engraved_crystal_chip_mixer')
        .itemInputs('gtceu:emerald_plate', 'gtceu:raw_crystal_chip')
        .inputFluids('gtceu:helium 1000')
        .itemOutputs('gtceu:engraved_crystal_chip')
        .EUt(GTValues.VA[GTValues.HV])
        .duration(200)

    // 干细胞 (LuV, 300 ticks, 删除细菌浆液)
    gtr.mixer('thetornproductionline:stem_cells_mixer')
        .itemInputs('kubejs:glacio_spirit', 'gtceu:osmiridium_dust')
        .inputFluids('gtceu:sterilized_growth_medium 500', 'gtceu:bacteria 500')
        .itemOutputs('32x gtceu:stem_cells')
        .EUt(GTValues.VA[GTValues.LuV])
        .duration(300)

    // 注入龙力的黑曜石 → 充能龙块（需要转换模拟卡，31号电路，UEV）
    gtr.large_chemical_reactor('thetornproductionline:infused_obsidian_to_draconium_block')
        .notConsumable('gtlcore:conversion_simulate_card')
        .itemInputs('1x kubejs:infused_obsidian')
        .itemOutputs('1x kubejs:draconium_block_charged')
        .circuit(31)
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(200)          // 200 tick = 10秒

    // =================== 天机聚合龙脉结晶模块 ===================
    // 装配线合成模块
    gtr.assembly_line('thetornproductionline:celestial_aggregate_dragon_vein_module_craft')
        .itemInputs(
            '16x gtceu:aggregation_device',
            '1x thetornproductionline:celestial_secret_deducing_module_uiv'
        )
        .itemOutputs('thetornproductionline:celestial_aggregate_dragon_vein_module')
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(2000)   // 100 秒

    const dragonModule = 'thetornproductionline:celestial_aggregate_dragon_vein_module'

    // 1. 龙芯 (draconic_core) | 需要稳定核心 | UEV, 20s
    gtr.assembly_line('thetornproductionline:draconic_core_assembly')
        .notConsumable(dragonModule)
        .notConsumable('kubejs:stabilizer_core')
        .itemInputs(
            '1x gtceu:hexanitrohexaaxaisowurtzitane_dust',
            '1x kubejs:draconium_dust',
            '1x gtceu:zpm_field_generator',
            '1x gtceu:uv_field_generator',
            '1x gtceu:lapotronic_energy_orb',
            '1x minecraft:nether_star',
            '1x gtceu:mithril_block',
            '1x gtceu:enderium_block'
        )
        .itemOutputs('2x kubejs:draconic_core')
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(400)   // 20 秒

    // 2. 双足飞龙核心 (wyvern_core) | 需要稳定核心 | UIV, 20s
    gtr.assembly_line('thetornproductionline:wyvern_core_assembly')
        .notConsumable(dragonModule)
        .notConsumable('kubejs:stabilizer_core')
        .itemInputs(
            '1x kubejs:draconic_core',
            '1x kubejs:draconium_dust',
            '1x gtceu:uhv_field_generator',
            '1x gtceu:uev_field_generator',
            '1x gtceu:quantum_eye',
            '1x gtceu:quantum_star',
            '1x gtceu:adamantine_block',
            '1x gtceu:orichalcum_block'
        )
        .itemOutputs('2x kubejs:wyvern_core')
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(400)

    // 3. 觉醒核心 (awakened_core) | 需要龙之稳定核心 | UXV, 20s
    gtr.assembly_line('thetornproductionline:awakened_core_assembly')
        .notConsumable(dragonModule)
        .notConsumable('kubejs:dragon_stabilizer_core')
        .itemInputs(
            '1x kubejs:wyvern_core',
            '1x gtceu:draconium_dust',
            '1x gtceu:uiv_field_generator',
            '1x gtceu:uxv_field_generator',
            '1x kubejs:dragon_heart',
            '1x gtceu:gravi_star',
            '1x gtceu:vibranium_block',
            '1x gtceu:taranium_block'
        )
        .itemOutputs('2x kubejs:awakened_core')
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(400)

    // 4. 混沌核心 (chaotic_core) | 需要龙之稳定核心 | OpV, 20s
    gtr.assembly_line('thetornproductionline:chaotic_core_assembly')
        .notConsumable(dragonModule)
        .notConsumable('kubejs:dragon_stabilizer_core')
        .itemInputs(
            '1x kubejs:awakened_core',
            '1x gtceu:draconium_nanoswarm',
            '1x gtceu:opv_field_generator',
            '1x gtlcore:max_field_generator',
            '1x kubejs:chaos_shard',
            '1x kubejs:unstable_star',
            '1x gtceu:legendarium_block',
            '1x gtceu:draconiumawakened_block'
        )
        .itemOutputs('2x kubejs:chaotic_core')
        .EUt(GTValues.VA[GTValues.OpV])
        .duration(400)

    // 5. 反应室 (reaction_chamber) | 需要龙之稳定核心 | MAX 电压, 16777216A, 40000秒
    const maxVoltage1A = GTValues.VA[GTValues.MAX]
    const reactionChamberEu = maxVoltage1A * 16777216
    gtr.assembly_line('thetornproductionline:reaction_chamber_assembly')
        .notConsumable(dragonModule)
        .notConsumable('kubejs:dragon_stabilizer_core')
        .itemInputs(
            '64x gtladditions:stargate_shielding_foil',
            '64x gtceu:cosmic_nanoswarm',
            '64x gtlcore:super_glue',
            '4x kubejs:heartofthesmogus',
            '64x gtladditions:black_hole_seed',
            '64x kubejs:nuclear_star',
            '64x gtceu:magmatter_block',
            '64x gtceu:spacetime_block'
        )
        .itemOutputs('2x sgjourney:reaction_chamber')
        .EUt(reactionChamberEu)
        .duration(800000)   // 40000 秒 = 800000 tick

    // 遏制奇异物质单步 | 恒星热能熔炼 | UXV 10s
    gtr.stellar_forge('thetornproductionline:contained_exotic_matter_plus')
        .itemInputs(
            '2x kubejs:leptonic_charge',
            '1x kubejs:time_dilation_containment_unit'
        )
        .inputFluids(
            'gtceu:liquid_degenerate_rhenium 144',
            'gtceu:neutronium 250',
            'gtceu:free_alpha_gas 1000'
        )
        .itemOutputs('1x kubejs:contained_exotic_matter')
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(200)           // 10 秒 (200 tick)
        .addData('SCTier', 2)    // 恒星等级 2（参考原版高级配方）

    // 创造主机简化 | 超时空装配线 | MAX电压
    gtr.suprachronal_assembly_line('thetornproductionline:suprachronal_mainframe_complex_plus')
        .itemInputs(
            '2x gtceu:eternity_frame',
            '1x kubejs:chaotic_core',
            '1x thetornproductionline:celestial_secret_deducing_module_iv',      // 原 micro_processor_mainframe
            '1x thetornproductionline:celestial_secret_deducing_module_luv',     // 原 nano_processor_mainframe
            '1x thetornproductionline:celestial_secret_deducing_module_zpm',     // 原 quantum_processor_mainframe
            '1x thetornproductionline:celestial_secret_deducing_module_uv',      // 原 crystal_processor_mainframe
            '1x thetornproductionline:celestial_secret_deducing_module_uhv',     // 原 wetware_processor_mainframe
            '1x thetornproductionline:celestial_secret_deducing_module_uev',     // 原 bioware_mainframe
            '1x thetornproductionline:celestial_secret_deducing_module_uiv',     // 原 optical_mainframe
            '1x thetornproductionline:celestial_secret_deducing_module_uxv',     // 原 exotic_mainframe
            '1x thetornproductionline:celestial_secret_deducing_module_opv',     // 原 cosmic_mainframe
            '1x thetornproductionline:celestial_secret_deducing_module_max',     // 原 supracausal_mainframe
            '1x kubejs:eternity_catalyst',
            '16x kubejs:nuclear_star',
            '16x gtceu:eternity_foil',
            '4x gtceu:eternity_plate'
        )
        .inputFluids(
            'gtceu:infinity 1000',
            'gtceu:spacetime 1000',
            'gtceu:eternity 1000',
            'gtceu:magnetohydrodynamicallyconstrainedstarmatter 1000'
        )
        .itemOutputs('1x kubejs:suprachronal_mainframe_complex')
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(7200)   // 6 分钟（可根据需要调整）

    // =================== 无限共振宝石（物品无限元件） ===================
    gtr.suprachronal_assembly_line('thetornproductionline:infinity_resonating_gem')
        .itemInputs(
            '1024x gtladditions:apocalyptic_torsion_quantum_matrix',
            '2100000x kubejs:resonating_gem',
            '1x thetornproductionline:black_hole_engine_module',
            '1x gtlcore:cell_component_256m',
            '1x kubejs:eternity_catalyst'
        )
        .inputFluids(
            'gtceu:starlight 2100000000',
            'gtceu:mana 2100000000',
            'minecraft:water 2100000000'
        )
        .itemInputs('2100000x gtceu:sapphire_dust')
        .itemOutputs(Item.of('expatternprovider:infinity_cell', '{record:{"#c":"ae2:i",id:"kubejs:resonating_gem"}}'))
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(2000)   // 100 秒

    // =================== 无限液态宇宙中子素（流体无限元件） ===================
    gtr.suprachronal_assembly_line('thetornproductionline:infinity_liquid_cosmic_neutronium')
        .inputs(
        GTItemof_dgy('ae2:item_storage_cell_1k', '{"RepairCost":0,"amts":[L;1024L,1024L,655360L],"ic":3L,"internalCurrentPower":2000000.0d,"keys":[{"#c":"ae2:i","id":"gtceu:eternity_nanoswarm"},{"#c":"ae2:i","id":"gtceu:cooling_tower"},{"#c":"ae2:i","id":"kubejs:extremely_durable_plasma_cell"}]}')
        )
        .itemInputs(
            '1024x gtladditions:apocalyptic_torsion_quantum_matrix',
            '1x thetornproductionline:black_hole_engine_module',
            '1x gtlcore:cell_component_256m',
        )
        .inputFluids(
            'gtceu:uu_matter 2100000000',
            'gtceu:dense_neutron_plasma 2100000000',
            'gtceu:cosmicneutronium 2100000000'
        )
        .itemOutputs(Item.of('expatternprovider:infinity_cell', '{record:{"#c":"ae2:f",id:"gtceu:cosmicneutronium"}}'))
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(2000)   // 100 秒
})

// =================== 枢纽卫星工厂全流体生成（单配方，无限输出槽） ===================
ServerEvents.recipes(event => {
    const gtr = event.recipes.gtceu
    if (!global.__dgyAllFluids) return

    // 构建配方，使用创造储罐作为催化剂，32号电路，消耗 1 mB 水
    let recipe = gtr.chemical_bath('thetornproductionline:creative_all_fluids_gen')
        .notConsumable('gtceu:creative_tank')        // 创造储罐作为催化剂
        .inputFluids('minecraft:water 1')            // 输入 1 mB 水
        .circuit(32)                                 // 32号电路
        .EUt(GTValues.VA[GTValues.MAX])              // MAX电压 1A
        .duration(200)                               // 10秒

    // 将所有流体逐一添加为输出（每份 1000 mB）
    global.__dgyAllFluids.forEach(fluidId => {
        recipe.outputFluids(`${fluidId} 1000`)
    })
})


// =================== 透镜再见！ ===================
ServerEvents.recipes(event => {
    const gtr = event.recipes.gtceu

    // ---------- 激光刻蚀机 ----------
    const laserEngraverRecipes = [
        { id: 'fullerene_dust', circuit: 1, inputItem: 'gtceu:unfolded_fullerene_dust', inputFluid: 'gtceu:nitrogen 10000', outputItem: 'gtceu:fullerene_dust', outputFluid: 'gtceu:ammonia 10000', addSpecial: true },
        { id: 'lanthanum_embedded_fullerene_dust', circuit: 2, inputItem: '2x gtceu:lanthanum_fullerene_mix_dust', inputFluid: 'gtceu:nitrogen 10000', outputItem: '2x gtceu:lanthanum_embedded_fullerene_dust', outputFluid: 'gtceu:ammonia 10000', addSpecial: true },
        { id: 'ilc_wafer', circuit: 3, output: '64x gtceu:ilc_wafer' },
        { id: 'ram_wafer', circuit: 4, output: '64x gtceu:ram_wafer' },
        { id: 'lpic_wafer', circuit: 5, output: '64x gtceu:lpic_wafer' },
        { id: 'simple_soc_wafer', circuit: 6, output: '64x gtceu:simple_soc_wafer' },
        { id: 'ulpic_wafer', circuit: 7, output: '64x gtceu:ulpic_wafer' },
        { id: 'cpu_wafer', circuit: 8, output: '64x gtceu:cpu_wafer' },
        { id: 'soc_wafer', circuit: 9, output: '32x gtceu:soc_wafer' },
        { id: 'nor_memory_wafer', circuit: 10, output: '32x gtceu:nor_memory_wafer' },
        { id: 'mpic_wafer', circuit: 11, output: '32x gtceu:mpic_wafer' },
        { id: 'nand_memory_wafer', circuit: 12, output: '32x gtceu:nand_memory_wafer' },
        { id: 'advanced_soc_wafer', circuit: 13, output: '8x gtceu:advanced_soc_wafer' },
        { id: 'highly_advanced_soc_wafer', circuit: 14, output: '4x gtceu:highly_advanced_soc_wafer' }
    ]
    laserEngraverRecipes.forEach(r => {
        let builder = gtr.laser_engraver(`thetornproductionline:laser_${r.id}_circuit`)
            .itemInputs(r.inputItem || 'kubejs:taranium_wafer')
            .circuit(r.circuit)
        if (r.inputFluid) builder.inputFluids(r.inputFluid)
        if (r.outputItem) builder.itemOutputs(r.outputItem)
        if (r.output) builder.itemOutputs(r.output)
        if (r.outputFluid) builder.outputFluids(r.outputFluid)
        builder.EUt(r.EUt || (r.id.includes('fullerene') ? 2000000 : 122880))
               .duration(r.duration || (r.id.includes('fullerene') ? 400 : (r.id.includes('lanthanum') ? 320 : 13)))
        if (r.addSpecial) builder.addDataBool('special', true)
    })

    // 奇异晶圆（品红色玻璃透镜，电路15）
    gtr.laser_engraver('thetornproductionline:exotic_wafer_circuit')
        .itemInputs('gtceu:highly_advanced_soc_wafer')
        .circuit(15)
        .itemOutputs('kubejs:exotic_wafer')
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(600)
        .cleanroom(CleanroomType.CLEANROOM)

    // 特殊芯片蚀刻（独立电路号）
    gtr.laser_engraver('thetornproductionline:crystal_cpu_circuit')
        .itemInputs('gtceu:engraved_crystal_chip')
        .circuit(16)
        .itemOutputs('gtceu:crystal_cpu')
        .EUt(10000)
        .duration(1)
    gtr.laser_engraver('thetornproductionline:crystal_soc_circuit')
        .itemInputs('gtceu:crystal_cpu')
        .circuit(17)
        .itemOutputs('gtceu:crystal_soc')
        .EUt(40000)
        .duration(1)
    gtr.laser_engraver('thetornproductionline:engraved_lapotron_crystal_chip_circuit')
        .itemInputs('gtceu:lapotron_crystal')
        .circuit(18)
        .itemOutputs('3x gtceu:engraved_lapotron_crystal_chip')
        .EUt(480)
        .duration(1)

    // 白色透镜宝石打磨统一替代（电路24）
    const whiteLensRecipes = [
        { input: 'gtceu:malachite_gem', output: 'gtceu:flawless_malachite_gem', eu: 240 },
        { input: 'gtceu:flawless_spessartine_gem', output: 'gtceu:exquisite_spessartine_gem', eu: 240 },
        { input: 'gtceu:chipped_monazite_gem', output: 'gtceu:flawed_monazite_gem', eu: 240 },
        { input: 'gtceu:yellow_garnet_gem', output: 'gtceu:flawless_yellow_garnet_gem', eu: 240 },
        { input: 'gtceu:flawed_rock_salt_gem', output: 'gtceu:rock_salt_gem', eu: 240 },
        { input: 'gtceu:cinnabar_gem', output: 'gtceu:flawless_cinnabar_gem', eu: 240 },
        { input: 'gtceu:chipped_apatite_gem', output: 'gtceu:flawed_apatite_gem', eu: 240 },
        { input: 'gtceu:topaz_gem', output: 'gtceu:flawless_topaz_gem', eu: 240 },
        { input: 'gtceu:flawed_ruby_gem', output: 'gtceu:ruby_gem', eu: 240 },
        { input: 'gtceu:flawless_monazite_gem', output: 'gtceu:exquisite_monazite_gem', eu: 240 },
        { input: 'gtceu:flawed_uvarovite_gem', output: 'gtceu:uvarovite_gem', eu: 240 },
        { input: 'minecraft:emerald', output: 'gtceu:flawless_emerald_gem', eu: 240 },
        { input: 'minecraft:echo_shard', output: 'gtceu:flawless_echo_shard_gem', eu: 240 },
        { input: 'gtceu:flawed_coal_gem', output: 'minecraft:coal', eu: 240 },
        { input: 'gtceu:chipped_rock_salt_gem', output: 'gtceu:flawed_rock_salt_gem', eu: 240 },
        { input: 'gtceu:flawless_amethyst_gem', output: 'gtceu:exquisite_amethyst_gem', eu: 240 },
        { input: 'gtceu:flawless_salt_gem', output: 'gtceu:exquisite_salt_gem', eu: 240 },
        { input: 'minecraft:diamond', output: 'gtceu:flawless_diamond_gem', eu: 240 },
        { input: 'gtceu:flawless_pyrope_gem', output: 'gtceu:exquisite_pyrope_gem', eu: 240 },
        { input: 'gtceu:flawless_diamond_gem', output: 'gtceu:exquisite_diamond_gem', eu: 240 },
        { input: 'gtceu:grossular_gem', output: 'gtceu:flawless_grossular_gem', eu: 240 },
        { input: 'gtceu:chipped_magneto_resonatic_gem', output: 'gtceu:flawed_magneto_resonatic_gem', eu: 240 },
        { input: 'gtceu:flawless_opal_gem', output: 'gtceu:exquisite_opal_gem', eu: 240 },
        { input: 'gtceu:flawless_echo_shard_gem', output: 'gtceu:exquisite_echo_shard_gem', eu: 240 },
        { input: 'gtceu:chipped_topaz_gem', output: 'gtceu:flawed_topaz_gem', eu: 240 },
        { input: 'gtceu:flawless_malachite_gem', output: 'gtceu:exquisite_malachite_gem', eu: 240 },
        { input: 'gtceu:chipped_andradite_gem', output: 'gtceu:flawed_andradite_gem', eu: 240 },
        { input: 'gtceu:flawless_quartzite_gem', output: 'gtceu:exquisite_quartzite_gem', eu: 240 },
        { input: 'gtceu:sapphire_gem', output: 'gtceu:flawless_sapphire_gem', eu: 240 },
        { input: 'gtceu:jasper_gem', output: 'gtceu:flawless_jasper_gem', eu: 240 },
        { input: 'gtceu:flawless_nether_quartz_gem', output: 'gtceu:exquisite_nether_quartz_gem', eu: 240 },
        { input: 'gtceu:flawed_apatite_gem', output: 'gtceu:apatite_gem', eu: 240 },
        { input: 'gtceu:flawed_topaz_gem', output: 'gtceu:topaz_gem', eu: 240 },
        { input: 'gtceu:chipped_coke_gem', output: 'gtceu:flawed_coke_gem', eu: 240 },
        { input: 'gtceu:chipped_almandine_gem', output: 'gtceu:flawed_almandine_gem', eu: 240 },
        { input: 'gtceu:flawless_ruby_gem', output: 'gtceu:exquisite_ruby_gem', eu: 240 },
        { input: 'gtceu:realgar_gem', output: 'gtceu:flawless_realgar_gem', eu: 240 },
        { input: 'gtceu:flawed_cinnabar_gem', output: 'gtceu:cinnabar_gem', eu: 240 },
        { input: 'gtceu:flawed_grossular_gem', output: 'gtceu:grossular_gem', eu: 240 },
        { input: 'gtceu:flawed_almandine_gem', output: 'gtceu:almandine_gem', eu: 240 },
        { input: 'gtceu:flawless_coke_gem', output: 'gtceu:exquisite_coke_gem', eu: 240 },
        { input: 'gtceu:flawed_monazite_gem', output: 'gtceu:monazite_gem', eu: 240 },
        { input: 'gtceu:quartzite_gem', output: 'gtceu:flawless_quartzite_gem', eu: 240 },
        { input: 'gtceu:flawed_spessartine_gem', output: 'gtceu:spessartine_gem', eu: 240 },
        { input: 'gtceu:flawless_olivine_gem', output: 'gtceu:exquisite_olivine_gem', eu: 240 },
        { input: 'gtceu:flawless_rock_salt_gem', output: 'gtceu:exquisite_rock_salt_gem', eu: 240 },
        { input: 'gtceu:olivine_gem', output: 'gtceu:flawless_olivine_gem', eu: 240 },
        { input: 'gtceu:chipped_certus_quartz_gem', output: 'gtceu:flawed_certus_quartz_gem', eu: 240 },
        { input: 'gtceu:flawed_yellow_garnet_gem', output: 'gtceu:yellow_garnet_gem', eu: 240 },
        { input: 'gtceu:flawless_topaz_gem', output: 'gtceu:exquisite_topaz_gem', eu: 240 },
        { input: 'gtceu:flawed_rutile_gem', output: 'gtceu:rutile_gem', eu: 240 },
        { input: 'gtceu:chipped_echo_shard_gem', output: 'gtceu:flawed_echo_shard_gem', eu: 240 },
        { input: 'gtceu:chipped_coal_gem', output: 'gtceu:flawed_coal_gem', eu: 240 },
        { input: 'gtceu:flawed_lazurite_gem', output: 'gtceu:lazurite_gem', eu: 240 },
        { input: 'gtceu:flawed_cubic_zirconia_gem', output: 'gtceu:cubic_zirconia_gem', eu: 240 },
        { input: 'gtceu:flawed_glass_gem', output: 'gtceu:glass_gem', eu: 240 },
        { input: 'gtceu:blue_topaz_gem', output: 'gtceu:flawless_blue_topaz_gem', eu: 240 },
        { input: 'gtceu:flawed_sapphire_gem', output: 'gtceu:sapphire_gem', eu: 240 },
        { input: 'gtceu:chipped_jasper_gem', output: 'gtceu:flawed_jasper_gem', eu: 240 },
        { input: 'gtceu:chipped_salt_gem', output: 'gtceu:flawed_salt_gem', eu: 240 },
        { input: 'gtceu:chipped_nether_quartz_gem', output: 'gtceu:flawed_nether_quartz_gem', eu: 240 },
        { input: 'gtceu:flawed_amethyst_gem', output: 'minecraft:amethyst_shard', eu: 240 },
        { input: 'gtceu:flawless_andradite_gem', output: 'gtceu:exquisite_andradite_gem', eu: 240 },
        { input: 'gtceu:flawed_opal_gem', output: 'gtceu:opal_gem', eu: 240 },
        { input: 'gtceu:flawless_green_sapphire_gem', output: 'gtceu:exquisite_green_sapphire_gem', eu: 240 },
        { input: 'gtceu:flawless_emerald_gem', output: 'gtceu:exquisite_emerald_gem', eu: 240 },
        { input: 'gtceu:chipped_glass_gem', output: 'gtceu:flawed_glass_gem', eu: 240 },
        { input: 'gtceu:salt_gem', output: 'gtceu:flawless_salt_gem', eu: 240 },
        { input: 'gtceu:flawless_grossular_gem', output: 'gtceu:exquisite_grossular_gem', eu: 240 },
        { input: 'gtceu:chipped_ruby_gem', output: 'gtceu:flawed_ruby_gem', eu: 240 },
        { input: 'gtceu:sodalite_gem', output: 'gtceu:flawless_sodalite_gem', eu: 240 },
        { input: 'gtceu:flawless_lazurite_gem', output: 'gtceu:exquisite_lazurite_gem', eu: 240 },
        { input: 'gtceu:flawed_coke_gem', output: 'gtceu:coke_gem', eu: 240 },
        { input: 'gtceu:flawless_jasper_gem', output: 'gtceu:exquisite_jasper_gem', eu: 240 },
        { input: 'gtceu:glass_gem', output: 'gtceu:flawless_glass_gem', eu: 240 },
        { input: 'gtceu:ruby_gem', output: 'gtceu:flawless_ruby_gem', eu: 240 },
        { input: 'gtceu:green_sapphire_gem', output: 'gtceu:flawless_green_sapphire_gem', eu: 240 },
        { input: 'gtceu:certus_quartz_gem', output: 'gtceu:flawless_certus_quartz_gem', eu: 240 },
        { input: 'gtceu:chipped_opal_gem', output: 'gtceu:flawed_opal_gem', eu: 240 },
        { input: 'gtceu:flawed_olivine_gem', output: 'gtceu:olivine_gem', eu: 240 },
        { input: 'gtceu:chipped_rutile_gem', output: 'gtceu:flawed_rutile_gem', eu: 240 },
        { input: 'gtceu:flawless_rutile_gem', output: 'gtceu:exquisite_rutile_gem', eu: 240 },
        { input: 'gtceu:almandine_gem', output: 'gtceu:flawless_almandine_gem', eu: 240 },
        { input: 'gtceu:chipped_sugar_gem', output: 'gtceu:flawed_sugar_gem', eu: 240 },
        { input: 'gtceu:chipped_emerald_gem', output: 'gtceu:flawed_emerald_gem', eu: 240 },
        { input: 'minecraft:coal', output: 'gtceu:flawless_coal_gem', eu: 240 },
        { input: 'gtceu:flawless_cinnabar_gem', output: 'gtceu:exquisite_cinnabar_gem', eu: 240 },
        { input: 'gtceu:chipped_malachite_gem', output: 'gtceu:flawed_malachite_gem', eu: 240 },
        { input: 'gtceu:chipped_grossular_gem', output: 'gtceu:flawed_grossular_gem', eu: 240 },
        { input: 'gtceu:andradite_gem', output: 'gtceu:flawless_andradite_gem', eu: 240 },
        { input: 'gtceu:chipped_realgar_gem', output: 'gtceu:flawed_realgar_gem', eu: 240 },
        { input: 'gtceu:chipped_red_garnet_gem', output: 'gtceu:flawed_red_garnet_gem', eu: 240 },
        { input: 'gtceu:flawless_sapphire_gem', output: 'gtceu:exquisite_sapphire_gem', eu: 240 },
        { input: 'gtceu:flawed_sugar_gem', output: 'gtceu:sugar_gem', eu: 240 },
        { input: 'gtceu:flawed_lapis_gem', output: 'minecraft:lapis_lazuli', eu: 240 },
        { input: 'gtceu:flawless_certus_quartz_gem', output: 'gtceu:exquisite_certus_quartz_gem', eu: 240 },
        { input: 'gtceu:opal_gem', output: 'gtceu:flawless_opal_gem', eu: 240 },
        { input: 'gtceu:chipped_diamond_gem', output: 'gtceu:flawed_diamond_gem', eu: 240 },
        { input: 'gtceu:flawed_realgar_gem', output: 'gtceu:realgar_gem', eu: 240 },
        { input: 'gtceu:flawless_realgar_gem', output: 'gtceu:exquisite_realgar_gem', eu: 240 },
        { input: 'minecraft:amethyst_shard', output: 'gtceu:flawless_amethyst_gem', eu: 240 },
        { input: 'gtceu:flawless_cubic_zirconia_gem', output: 'gtceu:exquisite_cubic_zirconia_gem', eu: 240 },
        { input: 'gtceu:chipped_spessartine_gem', output: 'gtceu:flawed_spessartine_gem', eu: 240 },
        { input: 'gtceu:pyrope_gem', output: 'gtceu:flawless_pyrope_gem', eu: 240 },
        { input: 'gtceu:rutile_gem', output: 'gtceu:flawless_rutile_gem', eu: 240 },
        { input: 'gtceu:flawless_red_garnet_gem', output: 'gtceu:exquisite_red_garnet_gem', eu: 240 },
        { input: 'gtceu:flawless_apatite_gem', output: 'gtceu:exquisite_apatite_gem', eu: 240 },
        { input: 'gtceu:flawless_lapis_gem', output: 'gtceu:exquisite_lapis_gem', eu: 240 },
        { input: 'gtceu:flawless_yellow_garnet_gem', output: 'gtceu:exquisite_yellow_garnet_gem', eu: 240 },
        { input: 'gtceu:flawless_blue_topaz_gem', output: 'gtceu:exquisite_blue_topaz_gem', eu: 240 },
        { input: 'gtceu:chipped_green_sapphire_gem', output: 'gtceu:flawed_green_sapphire_gem', eu: 240 },
        { input: 'gtceu:chipped_sapphire_gem', output: 'gtceu:flawed_sapphire_gem', eu: 240 },
        { input: 'gtceu:flawless_sodalite_gem', output: 'gtceu:exquisite_sodalite_gem', eu: 240 },
        { input: 'gtceu:red_garnet_gem', output: 'gtceu:flawless_red_garnet_gem', eu: 240 },
        { input: 'gtceu:coke_gem', output: 'gtceu:flawless_coke_gem', eu: 240 },
        { input: 'gtceu:flawed_pyrope_gem', output: 'gtceu:pyrope_gem', eu: 240 },
        { input: 'gtceu:flawed_quartzite_gem', output: 'gtceu:quartzite_gem', eu: 240 },
        { input: 'gtceu:chipped_cubic_zirconia_gem', output: 'gtceu:flawed_cubic_zirconia_gem', eu: 240 },
        { input: 'minecraft:quartz', output: 'gtceu:flawless_nether_quartz_gem', eu: 240 },
        { input: 'gtceu:flawed_diamond_gem', output: 'minecraft:diamond', eu: 240 },
        { input: 'gtceu:cubic_zirconia_gem', output: 'gtceu:flawless_cubic_zirconia_gem', eu: 240 },
        { input: 'gtceu:flawless_glass_gem', output: 'gtceu:exquisite_glass_gem', eu: 240 },
        { input: 'gtceu:flawed_magneto_resonatic_gem', output: 'gtceu:magneto_resonatic_gem', eu: 240 },
        { input: 'gtceu:chipped_lazurite_gem', output: 'gtceu:flawed_lazurite_gem', eu: 240 },
        { input: 'gtceu:magneto_resonatic_gem', output: 'gtceu:flawless_magneto_resonatic_gem', eu: 240 },
        { input: 'gtceu:flawed_red_garnet_gem', output: 'gtceu:red_garnet_gem', eu: 240 },
        { input: 'gtceu:apatite_gem', output: 'gtceu:flawless_apatite_gem', eu: 240 },
        { input: 'gtceu:chipped_yellow_garnet_gem', output: 'gtceu:flawed_yellow_garnet_gem', eu: 240 },
        { input: 'gtceu:flawless_magneto_resonatic_gem', output: 'gtceu:exquisite_magneto_resonatic_gem', eu: 240 },
        { input: 'gtceu:flawless_coal_gem', output: 'gtceu:exquisite_coal_gem', eu: 240 },
        { input: 'gtceu:chipped_amethyst_gem', output: 'gtceu:flawed_amethyst_gem', eu: 240 },
        { input: 'gtceu:flawless_almandine_gem', output: 'gtceu:exquisite_almandine_gem', eu: 240 },
        { input: 'gtceu:uvarovite_gem', output: 'gtceu:flawless_uvarovite_gem', eu: 240 },
        { input: 'gtceu:lazurite_gem', output: 'gtceu:flawless_lazurite_gem', eu: 240 },
        { input: 'gtceu:flawed_nether_quartz_gem', output: 'minecraft:quartz', eu: 240 },
        { input: 'gtceu:monazite_gem', output: 'gtceu:flawless_monazite_gem', eu: 240 },
        { input: 'gtceu:flawed_emerald_gem', output: 'minecraft:emerald', eu: 240 },
        { input: 'gtceu:flawed_certus_quartz_gem', output: 'gtceu:certus_quartz_gem', eu: 240 },
        { input: 'gtceu:chipped_uvarovite_gem', output: 'gtceu:flawed_uvarovite_gem', eu: 240 },
        { input: 'minecraft:lapis_lazuli', output: 'gtceu:flawless_lapis_gem', eu: 240 },
        { input: 'gtceu:chipped_sodalite_gem', output: 'gtceu:flawed_sodalite_gem', eu: 240 },
        { input: 'gtceu:flawed_salt_gem', output: 'gtceu:salt_gem', eu: 240 },
        { input: 'gtceu:flawed_blue_topaz_gem', output: 'gtceu:blue_topaz_gem', eu: 240 },
        { input: 'gtceu:flawed_green_sapphire_gem', output: 'gtceu:green_sapphire_gem', eu: 240 },
        { input: 'gtceu:chipped_quartzite_gem', output: 'gtceu:flawed_quartzite_gem', eu: 240 },
        { input: 'gtceu:flawed_andradite_gem', output: 'gtceu:andradite_gem', eu: 240 },
        { input: 'gtceu:flawless_uvarovite_gem', output: 'gtceu:exquisite_uvarovite_gem', eu: 240 },
        { input: 'gtceu:flawed_echo_shard_gem', output: 'minecraft:echo_shard', eu: 240 }
    ]
    whiteLensRecipes.forEach(r => {
        gtr.laser_engraver('thetornproductionline:white_' + r.input.replace(':', '_') + '_to_' + r.output.replace(':', '_'))
            .itemInputs(`2x ${r.input}`)
            .circuit(24)
            .itemOutputs(`1x ${r.output}`)
            .EUt(r.eu)
            .duration(1)
    })

    // 彩色透镜晶圆蚀刻扩展（硅、磷、硅岩、中子素、周期表）
    const waferInputs = {
        silicon: 'gtceu:silicon_wafer',
        phosphorus: 'gtceu:phosphorus_wafer',
        naquadah: 'gtceu:naquadah_wafer',
        neutronium: 'gtceu:neutronium_wafer',
        periodicium: 'gtladditions:periodicium_wafer'
    }
    const waferRecipes = [
        { circuit: 3, output: 'ilc_wafer', counts: { silicon: 1, phosphorus: 4, naquadah: 8, neutronium: 16, periodicium: 256 }, eu: { silicon: 120, phosphorus: 480, naquadah: 1920, neutronium: 7680, periodicium: 1966080 } },
        { circuit: 4, output: 'ram_wafer', counts: { silicon: 1, phosphorus: 4, naquadah: 8, neutronium: 16, periodicium: 256 }, eu: { silicon: 120, phosphorus: 480, naquadah: 1920, neutronium: 7680, periodicium: 1966080 } },
        { circuit: 5, output: 'lpic_wafer', counts: { silicon: 1, phosphorus: 4, naquadah: 8, neutronium: 16, periodicium: 256 }, eu: { silicon: 120, phosphorus: 480, naquadah: 1920, neutronium: 7680, periodicium: 1966080 } },
        { circuit: 6, output: 'simple_soc_wafer', counts: { silicon: 1, phosphorus: 4, naquadah: 8, neutronium: 16, periodicium: 256 }, eu: { silicon: 120, phosphorus: 480, naquadah: 1920, neutronium: 7680, periodicium: 1966080 } },
        { circuit: 7, output: 'ulpic_wafer', counts: { silicon: 1, phosphorus: 4, naquadah: 8, neutronium: 16, periodicium: 256 }, eu: { silicon: 120, phosphorus: 480, naquadah: 1920, neutronium: 7680, periodicium: 1966080 } },
        { circuit: 8, output: 'cpu_wafer', counts: { silicon: 1, phosphorus: 4, naquadah: 8, neutronium: 16, periodicium: 256 }, eu: { silicon: 120, phosphorus: 480, naquadah: 1920, neutronium: 7680, periodicium: 1966080 } },
        { circuit: 9, output: 'soc_wafer', counts: { silicon: 1, phosphorus: 1, naquadah: 4, neutronium: 8, periodicium: 128 }, eu: { silicon: 120, phosphorus: 480, naquadah: 1920, neutronium: 7680, periodicium: 1966080 } },
        { circuit: 10, output: 'nor_memory_wafer', counts: { phosphorus: 1, naquadah: 4, neutronium: 8, periodicium: 128 }, eu: { phosphorus: 480, naquadah: 1920, neutronium: 7680, periodicium: 1966080 } },
        { circuit: 11, output: 'mpic_wafer', counts: { phosphorus: 1, naquadah: 4, neutronium: 8, periodicium: 128 }, eu: { phosphorus: 480, naquadah: 1920, neutronium: 7680, periodicium: 1966080 } },
        { circuit: 12, output: 'nand_memory_wafer', counts: { phosphorus: 1, naquadah: 4, neutronium: 8, periodicium: 128 }, eu: { phosphorus: 480, naquadah: 1920, neutronium: 7680, periodicium: 1966080 } },
        { circuit: 13, output: 'advanced_soc_wafer', counts: { naquadah: 1, neutronium: 2, periodicium: 32 }, eu: { naquadah: 1920, neutronium: 7680, periodicium: 1966080 } },
        { circuit: 14, output: 'highly_advanced_soc_wafer', counts: { neutronium: 1, periodicium: 16 }, eu: { neutronium: 7680, periodicium: 1966080 } }
    ]
    for (let recipe of waferRecipes) {
        for (let type in waferInputs) {
            if (!recipe.counts[type]) continue
            let count = recipe.counts[type]
            let outputItem = `gtceu:${recipe.output}`
            let inputItem = waferInputs[type]
            let eu = recipe.eu[type]
            gtr.laser_engraver(`thetornproductionline:laser_${recipe.output}_${type}_circuit`)
                .itemInputs(`1x ${inputItem}`)
                .circuit(recipe.circuit)
                .itemOutputs(`${count}x ${outputItem}`)
                .EUt(eu)
                .duration(1)
        }
    }

    // ---------- 精密激光刻蚀机 ----------
    const precisionLaserRecipes = [
        { id: 'prepared_cosmic_soc_wafer', circuit: 1, input: 'kubejs:taranium_wafer', fluid: 'gtceu:gamma_rays_photoresist 1000', output: 'kubejs:prepared_cosmic_soc_wafer' },
        { id: 'high_precision_crystal_soc', circuit: 2, input: 'gtceu:crystal_soc', fluid: 'gtceu:euv_photoresist 1000', output: 'kubejs:high_precision_crystal_soc' },
        { id: 'nm_wafer', circuit: 3, input: 'kubejs:rutherfordium_neutronium_wafer', fluid: 'gtceu:photoresist 1000', output: 'kubejs:nm_wafer' },
        { id: 'pm_wafer', circuit: 4, input: 'kubejs:taranium_wafer', fluid: 'gtceu:euv_photoresist 1000', output: 'kubejs:pm_wafer' },
        { id: 'fm_wafer', circuit: 5, input: 'kubejs:pm_wafer', fluid: 'gtceu:gamma_rays_photoresist 1000', output: 'kubejs:fm_wafer' },
        { id: 'raw_photon_carrying_wafer', circuit: 6, input: 'kubejs:rutherfordium_neutronium_wafer', fluid: 'gtceu:photoresist 1000', output: 'kubejs:raw_photon_carrying_wafer' }
    ]
    precisionLaserRecipes.forEach(r => {
        let pEu, pDur
        if (r.id.includes('cosmic')) pEu = GTValues.VA[GTValues.UIV]
        else if (r.id.includes('pm')) pEu = GTValues.VA[GTValues.UHV]
        else if (r.id.includes('fm')) pEu = GTValues.VA[GTValues.UEV]
        else if (r.id.includes('photon')) pEu = GTValues.VA[GTValues.UHV]
        else pEu = GTValues.VA[GTValues.UV]

        if (r.id.includes('prepared')) pDur = 4800
        else if (r.id.includes('high_precision')) pDur = 2400
        else if (r.id.includes('nm')) pDur = 900
        else if (r.id.includes('pm')) pDur = 1800
        else if (r.id.includes('fm')) pDur = 2700
        else pDur = 600

        gtr.precision_laser_engraver(`thetornproductionline:precision_${r.id}_circuit`)
            .itemInputs(r.input)
            .inputFluids(r.fluid)
            .itemOutputs(r.output)
            .circuit(r.circuit)
            .EUt(pEu)
            .duration(pDur)
            .cleanroom(CleanroomType.CLEANROOM)
    })

    // ---------- 维度聚焦蚀刻阵列 ----------
    const dimFocusRecipes = [
        { id: 'raw_photon_carrying_wafer', circuit: 1, input: 'kubejs:rutherfordium_neutronium_wafer', fluid: 'gtceu:photoresist 100', output: 'kubejs:raw_photon_carrying_wafer' },
        { id: 'prepared_cosmic_soc_wafer', circuit: 2, input: 'kubejs:taranium_wafer', fluid: 'gtceu:gamma_rays_photoresist 100', output: 'kubejs:prepared_cosmic_soc_wafer' },
        { id: 'high_precision_crystal_soc', circuit: 3, input: 'gtceu:crystal_soc', fluid: 'gtceu:euv_photoresist 100', output: 'kubejs:high_precision_crystal_soc' },
        { id: 'nm_wafer', circuit: 4, input: 'kubejs:rutherfordium_neutronium_wafer', fluid: 'gtceu:photoresist 100', output: 'kubejs:nm_wafer' },
        { id: 'pm_wafer', circuit: 5, input: 'kubejs:taranium_wafer', fluid: 'gtceu:euv_photoresist 100', output: 'kubejs:pm_wafer' },
        { id: 'fm_wafer', circuit: 6, input: 'kubejs:pm_wafer', fluid: 'gtceu:gamma_rays_photoresist 100', output: 'kubejs:fm_wafer' },
        { id: 'spacetime_soc_wafer', circuit: 7, input: 'gtladditions:prepare_spacetime_soc_wafer', fluid: 'gtceu:gamma_rays_photoresist 100', output: 'gtladditions:spacetime_soc_wafer', eut: 125829120 },
        { id: 'primary_soc_wafer', circuit: 8, input: 'gtladditions:prepare_primary_soc_wafer', fluid: 'gtceu:gamma_rays_photoresist 100', output: 'gtladditions:primary_soc_wafer', eut: 503316480 }
    ]
    dimFocusRecipes.forEach(r => {
        let dEu, dDur
        if (r.id.includes('spacetime')) { dEu = 125829120; dDur = 1 }
        else if (r.id.includes('primary')) { dEu = 503316480; dDur = 1 }
        else if (r.id.includes('cosmic')) dEu = GTValues.VA[GTValues.UIV]
        else if (r.id.includes('pm')) dEu = GTValues.VA[GTValues.UHV]
        else if (r.id.includes('fm')) dEu = GTValues.VA[GTValues.UEV]
        else if (r.id.includes('photon')) dEu = GTValues.VA[GTValues.UHV]
        else dEu = GTValues.VA[GTValues.UV]
        if (!dDur) {
            if (r.id.includes('prepared')) dDur = 4800
            else if (r.id.includes('high_precision')) dDur = 2400
            else if (r.id.includes('nm')) dDur = 900
            else if (r.id.includes('pm')) dDur = 1800
            else if (r.id.includes('fm')) dDur = 2700
            else dDur = 600
        }
        gtr.dimensional_focus_engraving_array(`thetornproductionline:dimfocus_${r.id}_circuit`)
            .itemInputs(r.input)
            .inputFluids(r.fluid)
            .itemOutputs(r.output)
            .circuit(r.circuit)
            .EUt(r.eut || dEu)
            .duration(r.duration || dDur)
    })

    // ---------- 纳米锻造机 ----------
    const nanoForgeRecipes = [
        ['carbon_nanoswarm', 1, ['64x gtceu:carbon_block', '64x gtceu:soc'], ['gtceu:soldering_alloy 20000', 'gtceu:lubricant 20000'], '64x gtceu:carbon_nanoswarm', 1, GTValues.VA[GTValues.UV]],
        ['glowstone_nanoswarm', 2, ['64x minecraft:glowstone', '64x gtceu:advanced_soc'], ['gtceu:uu_amplifier 10000', 'gtceu:soldering_alloy 20000', 'gtceu:lubricant 20000'], '64x gtceu:glowstone_nanoswarm', 1, GTValues.VA[GTValues.UV]],
        ['copper_nanoswarm', 3, ['8x minecraft:copper_block', '8x gtceu:soc'], ['gtceu:naquadah 2000', 'gtceu:soldering_alloy 10000', 'gtceu:bismuth 10000'], 'gtceu:copper_nanoswarm', 1, GTValues.VA[GTValues.UV]],
        ['iron_nanoswarm', 4, ['8x minecraft:iron_block', '8x gtceu:soc'], ['gtceu:naquadah 2000', 'gtceu:soldering_alloy 10000', 'gtceu:bismuth 10000'], 'gtceu:iron_nanoswarm', 1, GTValues.VA[GTValues.UV]],
        ['gold_nanoswarm', 5, ['8x minecraft:gold_block', '16x gtceu:soc'], ['gtceu:enriched_naquadah 2000', 'gtceu:soldering_alloy 20000', 'gtceu:bismuth 20000'], 'gtceu:gold_nanoswarm', 1, GTValues.VA[GTValues.UV]],
        ['silver_nanoswarm', 6, ['8x gtceu:silver_block', '16x gtceu:soc'], ['gtceu:enriched_naquadah 2000', 'gtceu:soldering_alloy 20000', 'gtceu:bismuth 20000'], 'gtceu:silver_nanoswarm', 1, GTValues.VA[GTValues.UV]],
        ['iridium_nanoswarm', 7, ['8x gtceu:iridium_block', '32x gtceu:soc'], ['gtceu:naquadria 2000', 'gtceu:hafnium 8000', 'gtceu:soldering_alloy 20000'], 'gtceu:iridium_nanoswarm', 1, GTValues.VA[GTValues.UV]],
        ['osmium_nanoswarm', 8, ['8x gtceu:osmium_block', '32x gtceu:soc'], ['gtceu:naquadria 2000', 'gtceu:hafnium 8000', 'gtceu:soldering_alloy 20000'], 'gtceu:osmium_nanoswarm', 1, GTValues.VA[GTValues.UV]],
        ['rhenium_nanoswarm', 9, ['8x gtceu:rhenium_block', '64x gtceu:soc'], ['gtceu:naquadria 2000', 'gtceu:uu_amplifier 2000', 'gtceu:soldering_alloy 20000'], 'gtceu:rhenium_nanoswarm', 1, GTValues.VA[GTValues.UV]],
        ['naquadah_nanoswarm', 10, ['8x gtceu:naquadah_block', '16x gtceu:advanced_soc'], ['gtceu:naquadria 8000', 'gtceu:uu_amplifier 2000', 'gtceu:mutated_living_solder 20000'], 'gtceu:naquadah_nanoswarm', 1, GTValues.VA[GTValues.UV]],
        ['neutronium_nanoswarm', 11, ['8x gtceu:neutronium_block', '64x gtceu:soc', '32x gtceu:advanced_soc'], ['gtceu:neutronium 4000', 'gtceu:uu_amplifier 2000', 'gtceu:mutated_living_solder 20000'], 'gtceu:neutronium_nanoswarm', 1, GTValues.VA[GTValues.UV]],
        ['orichalcum_nanoswarm', 12, ['8x gtceu:orichalcum_block', '64x gtceu:advanced_soc', '64x gtceu:advanced_soc'], ['gtceu:neutronium 8000', 'gtceu:uu_amplifier 4000', 'gtceu:mutated_living_solder 40000'], 'gtceu:orichalcum_nanoswarm', 1, GTValues.VA[GTValues.UV]],
        ['enderium_nanoswarm', 13, ['8x gtceu:enderium_block', '64x gtceu:advanced_soc', '64x gtceu:advanced_soc'], ['gtceu:neutronium 8000', 'gtceu:uu_amplifier 4000', 'gtceu:mutated_living_solder 40000'], 'gtceu:enderium_nanoswarm', 2, GTValues.VA[GTValues.UEV]],
        ['infuscolium_nanoswarm', 14, ['8x gtceu:infuscolium_block', '64x gtceu:advanced_soc', '32x gtceu:highly_advanced_soc'], ['gtceu:neutronium 8000', 'gtceu:uu_amplifier 4000', 'gtceu:mutated_living_solder 40000'], 'gtceu:infuscolium_nanoswarm', 2, GTValues.VA[GTValues.UEV]],
        ['uruium_nanoswarm', 15, ['8x gtceu:uruium_block', '64x gtceu:advanced_soc', '64x gtceu:highly_advanced_soc'], ['gtceu:uu_matter 20000', 'gtceu:mutated_living_solder 40000', 'gtceu:super_mutated_living_solder 40000'], 'gtceu:uruium_nanoswarm', 2, GTValues.VA[GTValues.UEV]],
        ['vibranium_nanoswarm', 16, ['8x gtceu:vibranium_block', '64x gtceu:highly_advanced_soc', '64x gtceu:highly_advanced_soc'], ['gtceu:uu_matter 20000', 'gtceu:mutated_living_solder 40000', 'gtceu:super_mutated_living_solder 40000'], 'gtceu:vibranium_nanoswarm', 2, GTValues.VA[GTValues.UEV]],
        ['starmetal_nanoswarm', 17, ['8x gtceu:starmetal_block', '64x gtceu:highly_advanced_soc', '64x gtceu:highly_advanced_soc', '64x gtceu:exquisite_glass_gem', '64x gtceu:exquisite_amethyst_gem'], ['gtceu:uu_matter 40000', 'gtceu:mutated_living_solder 80000', 'gtceu:super_mutated_living_solder 80000'], 'gtceu:starmetal_nanoswarm', 2, GTValues.VA[GTValues.UEV]],
        ['draconium_nanoswarm', 18, ['8x gtceu:draconium_block', '32x gtceu:highly_advanced_soc_wafer', '32x kubejs:optical_ram_wafer', '32x kubejs:optical_soc', '8x kubejs:exotic_processing_core'], ['gtceu:uu_matter 40000', 'gtceu:mutated_living_solder 80000', 'gtceu:super_mutated_living_solder 80000'], 'gtceu:draconium_nanoswarm', 2, GTValues.VA[GTValues.UEV]],
        ['cosmicneutronium_nanoswarm', 19, ['8x gtceu:cosmicneutronium_block', '32x kubejs:optical_soc', '32x kubejs:exotic_wafer', '16x kubejs:cosmic_ram_wafer', '8x kubejs:cosmic_processing_unit_core'], ['gtceu:uu_matter 40000', 'gtceu:crystalmatrix 40000', 'gtceu:liquid_cosmic_mesh 40000'], 'gtceu:cosmicneutronium_nanoswarm', 3, GTValues.VA[GTValues.UXV]],
        ['white_dwarf_mtter_nanoswarm', 20, ['8x gtceu:white_dwarf_mtter_block', '8x kubejs:cosmic_processing_unit_core'], ['gtceu:uu_matter 40000', 'gtceu:neutronium 40000', 'gtceu:cosmic_element 40000'], 'gtceu:white_dwarf_mtter_nanoswarm', 3, GTValues.VA[GTValues.UXV]],
        ['black_dwarf_mtter_nanoswarm', 21, ['8x gtceu:black_dwarf_mtter_block', '8x kubejs:cosmic_processing_unit_core'], ['gtceu:uu_matter 40000', 'gtceu:neutronium 40000', 'gtceu:cosmic_element 40000'], 'gtceu:black_dwarf_mtter_nanoswarm', 3, GTValues.VA[GTValues.UXV]],
        ['spacetime_nanoswarm', 22, ['8x gtceu:spacetime_block', '4x kubejs:eigenfolded_kerr_manifold', '16x kubejs:supracausal_ram_wafer', '8x kubejs:supracausal_processing_core'], ['gtceu:uu_matter 80000', 'gtceu:infinity 40000', 'gtceu:temporalfluid 40000'], 'gtceu:spacetime_nanoswarm', 3, GTValues.VA[GTValues.UXV]],
        ['transcendentmetal_nanoswarm', 23, ['gtceu:rhenium_nanoswarm', '8x gtceu:transcendentmetal_block', '8x kubejs:recursively_folded_negative_space', '#gtceu:circuits/max'], ['gtceu:uu_matter 80000', 'gtceu:raw_star_matter_plasma 40000', 'gtceu:spatialfluid 20000'], 'gtceu:transcendentmetal_nanoswarm', 3, GTValues.VA[GTValues.UXV]],
        ['eternity_nanoswarm', 24, ['gtceu:neutronium_nanoswarm', '8x gtceu:eternity_block', '8x kubejs:ctc_computational_unit'], ['gtceu:spatialfluid 80000', 'gtceu:exciteddtsc 80000', 'gtceu:primordialmatter 80000'], 'gtceu:eternity_nanoswarm', 3, GTValues.VA[GTValues.UXV]]
    ]
    nanoForgeRecipes.forEach(r => {
        let builder = gtr.nano_forge(`thetornproductionline:nano_${r[0]}_circuit`)
            .itemInputs(r[2])
            .circuit(r[1])
            .itemOutputs(r[4])
            .EUt(r[6])
            .addData('nano_forge_tier', r[5])
        r[3].forEach(f => builder.inputFluids(f))
        const durationMap = {
            carbon_nanoswarm: 40000, glowstone_nanoswarm: 160000, copper_nanoswarm: 20000, iron_nanoswarm: 20000,
            gold_nanoswarm: 20000, silver_nanoswarm: 20000, iridium_nanoswarm: 40000, osmium_nanoswarm: 40000,
            rhenium_nanoswarm: 80000, naquadah_nanoswarm: 160000, neutronium_nanoswarm: 320000, orichalcum_nanoswarm: 320000,
            enderium_nanoswarm: 20000, infuscolium_nanoswarm: 20000, uruium_nanoswarm: 40000, vibranium_nanoswarm: 40000,
            starmetal_nanoswarm: 80000, draconium_nanoswarm: 160000, cosmicneutronium_nanoswarm: 20000,
            white_dwarf_mtter_nanoswarm: 10000, black_dwarf_mtter_nanoswarm: 10000, spacetime_nanoswarm: 40000,
            transcendentmetal_nanoswarm: 80000, eternity_nanoswarm: 160000
        }
        builder.duration(durationMap[r[0]] || 20000)
    })
    gtr.nano_forge('thetornproductionline:nano_cosmic_nanoswarm_circuit')
        .itemInputs('64x #forge:storage_blocks/cosmic', '64x gtladditions:infinity_wafer', '32x gtladditions:spacetime_soc_wafer', '32x gtladditions:primary_soc_wafer', '16x kubejs:cosmic_singularity')
        .circuit(25)
        .inputFluids('gtceu:cosmic 144000', 'gtceu:spacetime 576000', 'gtceu:primordialmatter 64000000')
        .itemOutputs('gtceu:cosmic_nanoswarm')
        .EUt(2013265920)
        .duration(32)
        .addData('nano_forge_tier', 3)

    // ---------- 光子矩阵蚀刻机 ----------
    const photonMatrixEtchRecipes = [
        { id: 'spacetime_soc_wafer', circuit: 1, input: 'gtladditions:prepare_spacetime_soc_wafer', fluid: 'gtceu:gamma_rays_photoresist 75', output: 'gtladditions:spacetime_soc_wafer', eut: 31457280 },
        { id: 'nm_wafer', circuit: 2, input: 'kubejs:rutherfordium_neutronium_wafer', fluid: 'gtceu:photoresist 50', notConsumable: 'kubejs:lithography_mask', output: 'kubejs:nm_wafer', eut: 122880 },
        { id: 'pm_wafer', circuit: 3, input: 'kubejs:taranium_wafer', fluid: 'gtceu:euv_photoresist 50', notConsumable: 'kubejs:lithography_mask', output: 'kubejs:pm_wafer', eut: 491520 },
        { id: 'primary_soc_wafer', circuit: 4, input: 'gtladditions:prepare_primary_soc_wafer', fluid: 'gtceu:gamma_rays_photoresist 75', output: 'gtladditions:primary_soc_wafer', eut: 125829120 },
        { id: 'raw_photon_carrying_wafer', circuit: 5, input: 'kubejs:rutherfordium_neutronium_wafer', fluid: 'gtceu:photoresist 50', notConsumable: 'kubejs:lithography_mask', output: 'kubejs:raw_photon_carrying_wafer', eut: 491520 },
        { id: 'fm_wafer', circuit: 6, input: 'kubejs:pm_wafer', fluid: 'gtceu:gamma_rays_photoresist 50', notConsumable: 'kubejs:grating_lithography_mask', output: 'kubejs:fm_wafer', eut: 1966080 },
        { id: 'high_precision_crystal_soc', circuit: 7, input: 'gtceu:crystal_soc', fluid: 'gtceu:euv_photoresist 50', notConsumable: 'kubejs:lithography_mask', output: 'kubejs:high_precision_crystal_soc', eut: 1966080 },
        { id: 'prepared_cosmic_soc_wafer', circuit: 8, input: 'kubejs:taranium_wafer', fluid: 'gtceu:gamma_rays_photoresist 50', notConsumable: 'kubejs:lithography_mask', output: 'kubejs:prepared_cosmic_soc_wafer', eut: 7864320 }
    ]
    photonMatrixEtchRecipes.forEach(r => {
        let builder = gtr.photon_matrix_etch(`thetornproductionline:photon_${r.id}_circuit`)
            .itemInputs(r.input)
            .circuit(r.circuit)
            .inputFluids(r.fluid)
            .itemOutputs(r.output)
            .EUt(r.eut)
            .duration(1)
        if (r.notConsumable) builder.notConsumable(r.notConsumable)
    })

    // 卓越/超凡/混沌 SoC 晶圆
    const advancedSocRecipes = [
        { id: 'outstanding_soc_wafer', circuit: 9, input: 'gtladditions:bioware_echo_shard_wafer', fluid: 'gtceu:photoresist 75', eutPhoton: 491520, eutDimFocus: 1966080 },
        { id: 'extraordinary_soc_wafer', circuit: 10, input: 'gtladditions:prepare_extraordinary_soc_wafer', fluid: 'gtceu:photoresist 75', eutPhoton: 1966080, eutDimFocus: 7864320 },
        { id: 'chaos_soc_wafer', circuit: 11, input: 'gtladditions:dragon_element_starmetal_wafer', fluid: 'gtceu:euv_photoresist 75', eutPhoton: 7864320, eutDimFocus: 31457280 }
    ]
    advancedSocRecipes.forEach(r => {
        gtr.photon_matrix_etch(`thetornproductionline:photon_${r.id}_circuit`)
            .itemInputs(r.input)
            .notConsumable('kubejs:grating_lithography_mask')
            .circuit(r.circuit)
            .inputFluids(r.fluid)
            .itemOutputs(`gtladditions:${r.id}`)
            .EUt(r.eutPhoton)
            .duration(1)
        gtr.dimensional_focus_engraving_array(`thetornproductionline:dimfocus_${r.id}_circuit`)
            .itemInputs(r.input)
            .notConsumable('kubejs:grating_lithography_mask')
            .circuit(r.circuit)
            .inputFluids(r.fluid)
            .itemOutputs(`gtladditions:${r.id}`)
            .EUt(r.eutDimFocus)
            .duration(1)
    })
})
// ========== 简化JEI配方显示 ==========
// 反向白名单：先移除所有非锭非粉的提取机/研磨机配方
// 方式1: not过滤器（如果KubeJS支持），方式2: 标签+ID模式兜底

ServerEvents.recipes(event => {
    // === 方案A：not过滤器 ===
    // 提取机：保留锭、粉、末影珍珠、下界之星等特殊物品
    event.remove({ type: 'gtceu:extractor', not: { input: [
        '#forge:ingots', '#forge:dusts',
        'minecraft:ender_pearl', 'minecraft:nether_star',
        'minecraft:blaze_rod', 'minecraft:blaze_powder',
        'minecraft:ghast_tear', 'minecraft:slime_ball',
        'minecraft:gunpowder', 'minecraft:glowstone_dust',
        'minecraft:redstone', 'minecraft:glowstone',
        'minecraft:sugar_cane', 'minecraft:cactus',
    ] } })
    // 研磨机：保留锭 + 玻璃/沙子 + 煤炭/宝石
    event.remove({ type: 'gtceu:macerator', not: { input: ['#forge:ingots', '#forge:gems', '#forge:glass', '#forge:sand', '#minecraft:coals', 'minecraft:coal'] } })

    // === 方案B：兜底 — 如果not不支持，标签法补刀 ===
    const formTags = [
        'forge:plates', 'forge:double_plates', 'forge:dense_plates',
        'forge:rods', 'forge:long_rods',
        'forge:gears', 'forge:small_gears',
        'forge:nuggets', 'forge:storage_blocks',
        'forge:raw_materials', 'forge:ores',
        'forge:screws', 'forge:rings', 'forge:bolts',
        'forge:wires', 'forge:fine_wires',
        'forge:springs', 'forge:small_springs',
        'forge:foils', 'forge:thin_foils',
        'forge:frames', 'forge:rotors', 'forge:rounds',
    ]
    formTags.forEach(t => {
        event.remove({ type: 'gtceu:extractor', input: '#' + t })
        event.remove({ type: 'gtceu:macerator', input: '#' + t })
    })

    console.log('[dgy配方简化] 已清理提取机和研磨机多余配方')
})

// ============================================================
// [来源: 产线扭曲者] 高速熔炉 + 配方重写
// ============================================================

ServerEvents.recipes(event => {
    // 高速熔炼
    event.forEachRecipe({ type: 'minecraft:smelting' }, recipe => {
        let input = recipe.originalRecipeIngredients
        let output = recipe.originalRecipeResult
        let oldId = recipe.getId()
        event.remove({ id: oldId })
        event.smelting(output, input).cookingTime(1).xp(0.7).id(`fastsmelting:${oldId.replace(':', '/')}`)
    })
    // 高速高炉
    event.forEachRecipe({ type: 'minecraft:blasting' }, recipe => {
        let input = recipe.originalRecipeIngredients
        let output = recipe.originalRecipeResult
        let oldId = recipe.getId()
        event.remove({ id: oldId })
        event.blasting(output, input).cookingTime(1).xp(0.7).id(`fastblasting:${oldId.replace(':', '/')}`)
    })
})

// ============================================================
// [来源: 产线扭曲者] 扭曲配方集
// ============================================================

ServerEvents.recipes(event => {
    const gtr = event.recipes.gtceu

    // ---------- 时空线缆 ----------
    function addSpacetimeWire(recipeEvent, factor, ingotCount, wireSuffix) {
        const { wiremill } = recipeEvent.recipes.gtceu
        wiremill(`spacetime_wire_${factor}x`)
            .itemInputs(`${ingotCount}x gtceu:spacetime_ingot`)
            .itemOutputs(`gtceu:spacetime_${wireSuffix}_wire`)
            .circuit(factor)
            .EUt(GTValues.VA[GTValues.MAX])
            .duration(1)
    }
    addSpacetimeWire(event, 1, 1, "single")
    addSpacetimeWire(event, 2, 1, "double")
    addSpacetimeWire(event, 4, 2, "quadruple")
    addSpacetimeWire(event, 8, 4, "octal")
    addSpacetimeWire(event, 16, 8, "hex")

    // ---------- 混沌炼金 ----------
    gtr.chaotic_alchemy("any:hundunyuanchuhenjiangang")
        .itemInputs("4x gtceu:transcendentmetal_dust","4x gtceu:tairitsu_dust","4x gtceu:tartarite_dust","2x gtceu:titan_precision_steel_dust","2x gtceu:eternity_dust")
        .inputFluids("gtceu:dimensionallytranscendentresidue 576")
        .outputFluids("gtladditions:proto_halkonite 1152")
        .EUt(GTValues.VA[GTValues.OpV])
        .duration(1)
        .blastFurnaceTemp(48000)

    // ---------- 任意机器配方 (any:) ----------
    gtr.extruder("any:shikongchanggan")
        .itemInputs('gtceu:spacetime_ingot')
        .notConsumable("gtceu:long_rod_extruder_mold")
        .itemOutputs("gtceu:long_spacetime_rod")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(1)

    gtr.fluid_solidifier("any:shikongding")
        .notConsumable("gtceu:ingot_casting_mold")
        .inputFluids("gtceu:spacetime 125")
        .itemOutputs("gtceu:spacetime_ingot")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(1)

    gtr.dimensionally_transcendent_plasma_forge("any:fanbeishikong")
        .notConsumable("gtceu:ingot_casting_mold")
        .inputFluids("gtceu:spacetime 125")
        .itemOutputs("gtceu:spacetime_ingot")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(1)
        .blastFurnaceTemp(96000)

    gtr.dimensionally_transcendent_plasma_forge("any:yuzhoufen")
        .itemInputs("10x gtceu:eternity_dust", "kubejs:cosmic_singularity")
        .inputFluids("gtceu:primordialmatter 1000")
        .itemOutputs("10x gtceu:cosmic_dust")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(1)
        .blastFurnaceTemp(96000)

    // ---------- 空间探测 ----------
    function registerSpaceProbe(machineType) {
        gtr[machineType](`any:${machineType}`).circuit(32)
            .outputFluids("gtceu:heavy_lepton_mixture 2147483647","gtceu:cosmic_element 2147483647","gtceu:starlight 2147483647")
            .duration(1)
    }
    registerSpaceProbe('space_cosmic_probe_receivers')
    registerSpaceProbe('space_probe_surface_reception')

    // ---------- 超粒子对撞 ----------
    function registerSuperParticleColliderFast(recipes) {
        recipes.forEach(recipe => {
            const { id, inputFluids, outputFluids, EUt } = recipe
            let builder = gtr.large_chemical_reactor(id)
            inputFluids.forEach(fluid => builder.inputFluids(fluid))
            outputFluids.forEach(fluid => builder.outputFluids(fluid))
            builder.EUt(EUt).duration(1)
        })
    }
    const particleColliderRecipes = [
        {id:"any:curiuma",inputFluids:["gtceu:plutonium 4096","gtceu:helium_plasma 4096"],outputFluids:["gtceu:curium 4000"],EUt:GTValues.VA[GTValues.UV]},
        {id:"any:uraniuma",inputFluids:["gtceu:thorium 4096","gtceu:helium_plasma 4096"],outputFluids:["gtceu:uranium 4000"],EUt:GTValues.VA[GTValues.UV]},
        {id:"any:plutoniuma",inputFluids:["gtceu:uranium 4096","gtceu:helium_plasma 4096"],outputFluids:["gtceu:plutonium 4000"],EUt:GTValues.VA[GTValues.UV]},
        {id:"any:neptuniuma",inputFluids:["gtceu:protactinium 4096","gtceu:helium_plasma 4096"],outputFluids:["gtceu:neptunium 4000"],EUt:GTValues.VA[GTValues.UV]},
        {id:"any:berkeliuma",inputFluids:["gtceu:americium 4096","gtceu:helium_plasma 4096"],outputFluids:["gtceu:berkelium 4000"],EUt:GTValues.VA[GTValues.UV]},
        {id:"any:einsteiniuma",inputFluids:["gtceu:curium 4096","gtceu:helium_plasma 4096"],outputFluids:["gtceu:einsteinium 4000"],EUt:GTValues.VA[GTValues.UV]},
        {id:"any:californiuma",inputFluids:["gtceu:berkelium 4096","gtceu:helium_plasma 4096"],outputFluids:["gtceu:californium 4000"],EUt:GTValues.VA[GTValues.UV]},
        {id:"any:mendeleviuma",inputFluids:["gtceu:einsteinium 4096","gtceu:helium_plasma 4096"],outputFluids:["gtceu:mendelevium 4000"],EUt:GTValues.VA[GTValues.UV]},
        {id:"any:nobeliuma",inputFluids:["gtceu:fermium 4096","gtceu:helium_plasma 4096"],outputFluids:["gtceu:nobelium 4000"],EUt:GTValues.VA[GTValues.UV]},
        {id:"any:lawrenciuma",inputFluids:["gtceu:mendelevium 4096","gtceu:helium_plasma 4096"],outputFluids:["gtceu:lawrencium 4000"],EUt:GTValues.VA[GTValues.UV]},
        {id:"any:fermiuma",inputFluids:["gtceu:californium 4096","gtceu:helium_plasma 4096"],outputFluids:["gtceu:fermium 4000"],EUt:GTValues.VA[GTValues.UV]},
        {id:"any:astatinea",inputFluids:["gtceu:bismuth 4096","gtceu:helium_plasma 4096"],outputFluids:["gtceu:astatine 4000"],EUt:GTValues.VA[GTValues.UV]},
        {id:"any:roentgeniuma",inputFluids:["gtceu:meitnerium 4096","gtceu:helium_plasma 4096"],outputFluids:["gtceu:roentgenium 4000"],EUt:GTValues.VA[GTValues.UV]},
        {id:"any:coperniciuma",inputFluids:["gtceu:darmstadtium 4096","gtceu:helium_plasma 4096"],outputFluids:["gtceu:copernicium 4000"],EUt:GTValues.VA[GTValues.UV]},
        {id:"any:nihoniuma",inputFluids:["gtceu:roentgenium 4096","gtceu:helium_plasma 4096"],outputFluids:["gtceu:nihonium 4000"],EUt:GTValues.VA[GTValues.UV]},
        {id:"any:bohriuma",inputFluids:["gtceu:dubnium 4096","gtceu:helium_plasma 4096"],outputFluids:["gtceu:bohrium 4000"],EUt:GTValues.VA[GTValues.UV]},
        {id:"any:positive_electron",inputFluids:["gtceu:phosphorus 200","gtceu:lithium 200"],outputFluids:["gtceu:positive_electron 100"],EUt:GTValues.VA[GTValues.UV]},
        {id:"any:antiproton",inputFluids:["gtceu:liquid_hydrogen 1000","gtceu:helium_plasma 200"],outputFluids:["gtceu:antiproton 100"],EUt:GTValues.VA[GTValues.UV]},
        {id:"any:antineutron",inputFluids:["gtceu:positive_electron 100","gtceu:antiproton 100"],outputFluids:["gtceu:antineutron 2"],EUt:GTValues.VA[GTValues.UV]},
        {id:"any:antimatter",inputFluids:["gtceu:antihydrogen 2000","gtceu:antineutron 2000"],outputFluids:["gtceu:antimatter 100"],EUt:GTValues.VA[GTValues.UV]}
    ]
    registerSuperParticleColliderFast(particleColliderRecipes)

    // ---------- 聚变简化配方 ----------
    function addFusionRecipe(gtr, id, inputs, outputs, eu) {
        let recipe = gtr.large_chemical_reactor(`any:fusion/${id}`)
        inputs.forEach(inp => recipe.inputFluids(inp))
        outputs.forEach(out => recipe.outputFluids(out))
        recipe.EUt(eu).duration(1)
    }
    const fusionRecipes = [
        {id:0,inputs:['gtceu:berkelium 144','gtceu:potassium 1152'],outputs:['gtceu:mithril_plasma 144'],eu:122880},
        {id:1,inputs:['gtceu:einsteinium 144','gtceu:sodium 1152'],outputs:['gtceu:orichalcum_plasma 144'],eu:122880},
        {id:2,inputs:['gtceu:europium 16','gtceu:arsenic 16'],outputs:['gtceu:silver_plasma 16'],eu:65536},
        {id:3,inputs:['gtceu:calcium 32','gtceu:curium 32'],outputs:['gtceu:moscovium 32'],eu:122880},
        {id:4,inputs:['gtceu:thorium 32','gtceu:iron 32'],outputs:['gtceu:livermorium 32'],eu:122880},
        {id:5,inputs:['gtceu:europium 64','gtceu:neon 250'],outputs:['gtceu:dubnium 64'],eu:65536},
        {id:6,inputs:['gtceu:calcium 64','gtceu:plutonium 64'],outputs:['gtceu:seaborgium 64'],eu:65536},
        {id:7,inputs:['gtceu:lead 16','gtceu:bromine 16'],outputs:['gtceu:tennessine 16'],eu:262144},
        {id:8,inputs:['gtceu:taranium_enriched_liquid_helium_3 125','gtceu:hydrogen 125'],outputs:['gtceu:taranium_rich_liquid_helium_4_plasma 125'],eu:1048576},
        {id:9,inputs:['gtceu:vibranium_unstable 16','gtceu:adamantium 16'],outputs:['gtceu:vibranium_plasma 16'],eu:1966080},
        {id:10,inputs:['gtceu:scandium_titanium_50_mixture 32','gtceu:radon 250'],outputs:['gtceu:metastable_hassium_plasma 32'],eu:491520},
        {id:11,inputs:['gtceu:oganesson_breeding_base 16','gtceu:dysprosium 16'],outputs:['gtceu:hot_oganesson 125'],eu:491520},
        {id:12,inputs:['gtceu:draconium 125','gtceu:quantumchromodynamically_confined_matter 125'],outputs:['gtceu:draconiumawakened_plasma 125'],eu:7864320},
        {id:13,inputs:['gtceu:crystalmatrix 2000','gtceu:cosmicneutronium 1000'],outputs:['gtceu:infinity 64'],eu:7864320},
        {id:14,inputs:['gtceu:neodymium 16','gtceu:hydrogen 375'],outputs:['gtceu:europium 16'],eu:24576},
        {id:15,inputs:['gtceu:gold 16','gtceu:aluminium 16'],outputs:['gtceu:uranium 16'],eu:24576},
        {id:16,inputs:['gtceu:silicon 16','gtceu:magnesium 16'],outputs:['gtceu:iron_plasma 16'],eu:7680},
        {id:17,inputs:['gtceu:xenon 125','gtceu:zinc 16'],outputs:['gtceu:plutonium 16'],eu:49152},
        {id:18,inputs:['gtceu:deuterium 125','gtceu:tritium 125'],outputs:['gtceu:helium_plasma 125'],eu:4096},
        {id:19,inputs:['gtceu:beryllium 16','gtceu:deuterium 375'],outputs:['gtceu:nitrogen_plasma 125'],eu:16384},
        {id:20,inputs:['gtceu:lutetium 16','gtceu:vanadium 16'],outputs:['gtceu:plutonium_241_plasma 16'],eu:1966080},
        {id:21,inputs:['gtceu:carbon 16','gtceu:helium_3 125'],outputs:['gtceu:oxygen_plasma 125'],eu:4096},
        {id:22,inputs:['gtceu:mercury 125','gtceu:magnesium 16'],outputs:['gtceu:uranium_235 16'],eu:24576},
        {id:23,inputs:['gtceu:titanium 32','gtceu:duranium 32'],outputs:['gtceu:tritanium 16'],eu:30720},
        {id:24,inputs:['gtceu:krypton 125','gtceu:cerium 16'],outputs:['gtceu:plutonium_241 16'],eu:49152},
        {id:25,inputs:['gtceu:silver 16','gtceu:copper 16'],outputs:['gtceu:osmium 16'],eu:24578},
        {id:26,inputs:['gtceu:enriched_naquadah 16','gtceu:radon 125'],outputs:['gtceu:naquadria 4'],eu:49152},
        {id:27,inputs:['gtceu:lutetium 32','gtceu:chromium 32'],outputs:['gtceu:americium 32'],eu:49152},
        {id:28,inputs:['gtceu:arsenic 32','gtceu:ruthenium 16'],outputs:['gtceu:darmstadtium 16'],eu:30720},
        {id:29,inputs:['gtceu:gallium 16','gtceu:radon 125'],outputs:['gtceu:duranium 16'],eu:16384},
        {id:30,inputs:['gtceu:hydrogen 125','gtceu:vanadium 16'],outputs:['gtceu:chromium 16'],eu:24576},
        {id:31,inputs:['gtceu:lanthanum 16','gtceu:silicon 16'],outputs:['gtceu:lutetium 16'],eu:7680},
        {id:32,inputs:['gtceu:gold 16','gtceu:mercury 16'],outputs:['gtceu:radon 125'],eu:30720},
        {id:33,inputs:['gtceu:potassium 16','gtceu:fluorine 125'],outputs:['gtceu:nickel_plasma 16'],eu:30720},
        {id:34,inputs:['gtceu:carbon 16','gtceu:magnesium 16'],outputs:['gtceu:argon_plasma 125'],eu:24576},
        {id:35,inputs:['gtceu:silver 144','gtceu:lithium 144'],outputs:['gtceu:indium 144'],eu:24576},
        {id:36,inputs:['gtceu:americium 128','gtceu:naquadria 128'],outputs:['gtceu:neutronium 32'],eu:98304}
    ]
    fusionRecipes.forEach(recipe => {
        addFusionRecipe(gtr, recipe.id, recipe.inputs, recipe.outputs, recipe.eu)
    })

    // ---------- 穹宇系统 ----------

    // 超级天球引擎
    let nbtString = `{BlockEntityTag:{astralArrayInventory:{Items:[{Count:127,Slot:0,id:"gtladditions:astral_array"}]}},display:{Name:'{"text":"Motor de esfera superceleste","color":"#AAFFAA","bold":true}',Lore:['"§7━━━━━━━━━━━━━━━━"','"§6incorporado §ematriz de calibre estrela 127 §6","italic":false','"Saída de energia estrela §b: §3+∞ §b/ tick"','"§7━━━━━━━━━━━━━━━━"','"§d§o\"A batida dos corações das estrelas\" §d"']}}`
    gtr.qft("any:tianqiuxingzhen")
        .itemInputs("gtladditions:thread_modifier_hatch","127x gtladditions:astral_array")
        .itemOutputs(Item.of('gtladditions:thread_modifier_hatch', nbtString))
        .EUt(GTValues.VA[GTValues.MAX])
        .circuit(32)
        .duration(1)
        .cleanroom(CleanroomType.CLEANROOM)

    // 终焉伪神之锻炉
    nbtString = `{BlockEntityTag:{runningSecs:72000L},display:{Name:'{"text":"A Forja do Falso Deus Final","color":"#FF4500","bold":true,"italic":true}',Lore:['"§6§lA Forja do Falso Deus·Forma Definitiva"','"§e§nApós as intermináveis ​​​​voltas e reviravoltas da matriz de flutuação quântica, o poder infinito criou a base do falso deus"','"§7§mTudo na UE que engoliu 9.2E em um segundo chega ao fim"','"§5§ocarrega todas as coisas e rompe as algemas do mundo mundano"','"§c§kQueime tudo no mundo..."']}}`
    gtr.qft("any:weishen4h")
        .itemInputs('gtladditions:forge_of_the_antichrist')
        .itemOutputs(Item.of('gtladditions:forge_of_the_antichrist', nbtString))
        .EUt(-9221474836470000000)
        .circuit(32)
        .duration(1)
        .cleanroom(CleanroomType.CLEANROOM)

    // 元件包
    gtr.qft('any:homoadd')
        .inputFluids("gtceu:cosmic_element 2147483647")
        .itemInputs("16384x kubejs:leptonic_charge","128x gtladditions:arcanic_astrograph","16384x gtladditions:astral_array")
        .itemOutputs(Item.of('ae2:portable_item_cell_16k', buildCellNBTForItems('鸿蒙+元件包', TWISTED_HONGMENG_ITEMS)))
        .circuit(32).duration(1).EUt(GTValues.VA[GTValues.MAX])

    gtr.qft('any:denglizi')
        .inputFluids("gtceu:cosmic_element 2147483647")
        .itemInputs("16384x kubejs:quantum_chromodynamic_charge","128x gtladditions:fuxi_bagua_heaven_forging_furnace","16384x gtladditions:astral_array")
        .itemOutputs(Item.of('ae2:portable_item_cell_16k', buildCellNBTForFluids('等离子元件包', TWISTED_PLASMA_FLUIDS)))
        .circuit(32).duration(1).EUt(GTValues.VA[GTValues.MAX])

    gtr.qft('any:bujain')
        .inputFluids("gtceu:cosmic_element 2147483647")
        .itemInputs("2048x gtlcore:component_assembly_line_casing_max","1024x gtceu:component_assembly_line","16384x gtladditions:astral_array","16384x gtlcore:max_electric_motor","16384x gtlcore:max_electric_pump","16384x gtlcore:max_conveyor_module","16384x gtlcore:max_robot_arm","16384x gtlcore:max_electric_piston","16384x gtlcore:max_emitter","16384x gtlcore:max_sensor","16384x gtlcore:max_field_generator")
        .itemOutputs(Item.of('ae2:portable_item_cell_16k', buildCellNBTForItems('部件元件包', TWISTED_COMPONENT_ITEMS)))
        .duration(1).EUt(GTValues.VA[GTValues.MAX])

    // ---------- 基础工具配方 ----------
    gtr.alloy_smelter("any:steel_ingot_from_iron_and_coal")
        .itemInputs("minecraft:iron_ingot","2x minecraft:coal")
        .itemOutputs("gtceu:steel_ingot")
        .EUt(GTValues.VA[GTValues.ULV]).duration(1)

    event.shapeless('extendedae_plus:infinity_biginteger_cell', ['gtlcore:mining_crystal'])
    event.shapeless('gtceu:large_steam_input_hatch', ['gtceu:steam_input_hatch'])
    event.shapeless('gtladditions:huge_steam_input_hatch', ['gtceu:large_steam_input_hatch'])
    event.shapeless('3x gtceu:bronze_ingot', ['minecraft:copper_ingot','minecraft:copper_ingot','minecraft:copper_ingot','gtceu:tin_ingot'])
    event.shapeless('gtceu:infinite_water_cover', ['minecraft:iron_ingot','minecraft:iron_ingot','minecraft:iron_ingot','minecraft:water_bucket','minecraft:iron_ingot','minecraft:water_bucket','minecraft:iron_ingot','minecraft:iron_ingot','minecraft:iron_ingot'])
    event.shapeless('kubejs:nether_data', Array(9).fill('gtlcore:world_fragments_nether').fill('gtlcore:mining_crystal', 4, 5))
    event.shapeless('kubejs:overworld_data', Array(9).fill('gtlcore:world_fragments_overworld').fill('gtlcore:mining_crystal', 4, 5))
    event.shapeless('kubejs:end_data', Array(9).fill('gtlcore:world_fragments_end').fill('gtlcore:mining_crystal', 4, 5))
    event.smelting("gtceu:wrought_iron_ingot", "minecraft:iron_ingot").xp(0.1).cookingTime(1)

    // 无限催化剂提取
    gtr.extractor('cxhmz:infinity_catalyst_extract_twisted')
        .notConsumable('#kubejs:infinity_catalysts')
        .chancedFluidOutput('gtceu:infinity 1024', 500, 0)
        .duration(1)
        .EUt(8192000000)
})

// ============================================================
// [来源: 产线毁灭者] 简化毁灭配方
// ============================================================

ServerEvents.recipes(event => {
    event.remove({ type: 'gtceu:electrolyzer', input: 'gtceu:monazite_dust' })
    event.recipes.gtceu.electrolyzer('cxhmz:monazite')
        .itemInputs('16384x gtceu:monazite_dust')
        .itemOutputs('1024x gtceu:europium_dust')
        .itemOutputs('1024x gtceu:samarium_dust')
        .itemOutputs('1024x gtceu:dysprosium_dust')
        .itemOutputs('1024x gtceu:erbium_dust')
        .itemOutputs('1024x gtceu:holmium_dust')
        .itemOutputs('1024x gtceu:gadolinium_dust')
        .itemOutputs('1024x gtceu:lanthanum_dust')
        .itemOutputs('1024x gtceu:yttrium_dust')
        .itemOutputs('1024x gtceu:thulium_dust')
        .itemOutputs('1024x gtceu:promethium_dust')
        .itemOutputs('1024x gtceu:praseodymium_dust')
        .itemOutputs('1024x gtceu:ytterbium_dust')
        .itemOutputs('1024x gtceu:terbium_dust')
        .itemOutputs('1024x gtceu:scandium_dust')
        .itemOutputs('1024x gtceu:neodymium_dust')
        .itemOutputs('1024x gtceu:lutetium_dust')
        .duration(1)
        .EUt(32768)

    event.remove({ type: 'gtceu:large_chemical_reactor', input: 'gtceu:cooperite_dust' })
    event.recipes.gtceu.large_chemical_reactor('cxhmz:cooperite')
        .itemInputs('1024x gtceu:cooperite_dust')
        .inputFluids('minecraft:water 160000', 'gtceu:oxygen 64000')
        .itemOutputs('320x gtceu:rhodium_dust')
        .itemOutputs('320x gtceu:platinum_dust')
        .itemOutputs('320x gtceu:palladium_dust')
        .itemOutputs('320x gtceu:ruthenium_dust')
        .itemOutputs('320x gtceu:osmium_dust')
        .itemOutputs('320x gtceu:iridium_dust')
        .itemOutputs('320x gtceu:nickel_dust')
        .outputFluids('gtceu:sulfuric_acid 128000')
        .duration(1)
        .EUt(2048)

})

ServerEvents.recipes(event => {
    event.recipes.gtceu.distort('cxhmz:actinium_solution')
        .itemInputs('64x gtceu:actinium_trinium_hydroxides_dust', '2x gtceu:fullerene_dust', '32x gtceu:radium_dust', '64x gtceu:sodium_hydroxide_dust')
        .inputFluids('minecraft:water 160000')
        .outputFluids('gtceu:actinium_radium_hydroxide_solution 2000')
        .blastFurnaceTemp(14400)
        .duration(1)
        .EUt(1638400)
})

ServerEvents.recipes(event => {
    event.recipes.gtceu.distort('cxhmz:naquadah_processing')
        .itemInputs('320x gtceu:naquadah_ore', '320x gtceu:enriched_naquadah_ore','128x gtceu:gold_dust')
        .inputFluids('gtceu:sulfuric_acid 64000', 'gtceu:nitric_acid 128000', 'gtceu:hydrochloric_acid 96000')
        .notConsumable('gtlcore:shewanella_petri_dish')
        .itemOutputs('16x gtceu:adamantine_dust', '64x gtceu:naquadah_dust', '32x gtceu:enriched_naquadah_dust', '8x gtceu:naquadria_dust')
        .blastFurnaceTemp(14400)
        .duration(1)
        .EUt(3638400)
})

ServerEvents.recipes(event => {
    event.smelting('gtceu:annealed_copper_ingot', 'minecraft:copper_ingot')
})

ServerEvents.recipes(event => {
    event.recipes.gtceu.centrifuge('cxhmz:air_to_infinity_cells')
        .inputFluids('gtceu:air 2147483647')
        .itemOutputs(
            Item.of('expatternprovider:infinity_cell', '{record:{"#c":"ae2:f",id:"gtceu:nitrogen"}}'),
            Item.of('expatternprovider:infinity_cell', '{record:{"#c":"ae2:f",id:"gtceu:oxygen"}}')
        )
        .duration(1)
        .EUt(8192)
})

ServerEvents.recipes(event => {
    event.recipes.gtceu.centrifuge('cxhmz:crushed_emerald_ore_to_exquisite_emerald_gem')
        .itemInputs('32x gtceu:crushed_emerald_ore')
        .itemOutputs('16x gtceu:exquisite_emerald_gem')
        .duration(1)
        .EUt(128)
})

ServerEvents.recipes(event => {
    event.recipes.gtceu.extractor('cxhmz:extractor_machine_blastfurnace_to_resources')
        .notConsumable('64x gtceu:ulv_fragment_world_collection_machine')
        .itemOutputs(
            '64x minecraft:diamond','64x gtceu:lead_ingot','64x gtceu:chromium_ingot',
            '64x gtceu:nickel_ingot','64x gtceu:silver_ingot','64x gtceu:tin_ingot',
            '64x minecraft:gold_ingot','64x minecraft:copper_ingot','64x minecraft:iron_ingot',
            '64x gtceu:aluminium_ingot','64x minecraft:redstone','64x gtceu:gallium_ingot',
            '64x gtceu:zinc_ingot','64x minecraft:coal','64x gtceu:sulfur_dust',
            '64x gtceu:damascus_steel_ingot','64x gtceu:bronze_ingot','64x gtceu:tungsten_ingot',
            '64x gtceu:steel_ingot'
        )
        .duration(1)
        .EUt(256)
})

ServerEvents.recipes(event => {
    event.shapeless('gtladditions:dimensionally_transcendent_chemical_plant', ['gtceu:chemical_plant', 'minecraft:bone_meal'])
})

ServerEvents.recipes(event => {
    event.recipes.gtceu.chemical_reactor('cxhmz:water_lava_to_steam')
        .inputFluids('minecraft:water 2147483647', 'minecraft:lava 1024000')
        .outputFluids('gtceu:steam 2147483647')
        .itemOutputs('1024x minecraft:obsidian')
        .duration(1)
        .EUt(480)
})

ServerEvents.recipes(event => {
    event.shapeless('gtceu:super_blast_smelter', ['gtceu:alloy_blast_smelter', 'minecraft:bone_meal'])
        .id('cxhmz:super_blast_smelter_upgrade')
})

ServerEvents.recipes(event => {
    event.recipes.gtceu.fragment_world_collection('cxhmz:fragment_world_collection')
        .notConsumable('minecraft:furnace')
        .circuit(32)
        .chancedOutput('minecraft:iron_ingot', 500, 0)
        .chancedOutput('minecraft:copper_ingot', 500, 0)
        .chancedOutput('gtceu:tin_ingot', 500, 0)
        .chancedOutput('gtceu:nickel_ingot', 500, 0)
        .chancedOutput('gtceu:silver_ingot', 500, 0)
        .chancedOutput('minecraft:gold_ingot', 500, 0)
        .chancedOutput('gtceu:lead_ingot', 500, 0)
        .chancedOutput('minecraft:coal', 500, 0)
        .chancedOutput('minecraft:diamond', 500, 0)
        .duration(1)
        .EUt(8)
})

ServerEvents.recipes(event => {
    event.recipes.gtceu.extractor('cxhmz:infinity_catalyst_extract')
        .notConsumable('avaritia:infinity_catalyst')
        .chancedFluidOutput('gtceu:infinity 1024', 500, 0)
        .duration(1)
        .EUt(8192000000)
})

ServerEvents.recipes(event => {
    event.recipes.gtceu.assembler('cxhmz:extremely_durable_plasma_cell')
        .itemInputs('64x minecraft:glass_bottle', '64x minecraft:green_dye', '64x gtceu:infinity_plate')
        .itemOutputs('16x kubejs:extremely_durable_plasma_cell')
        .duration(1)
        .EUt(8120000000000)
})

// [来源: 产线毁灭者] NBT辅助函数
const my_packed_cell_nbt = (list) => {
    let spiltedlist = list.map(id => id.split('x '))
    let keysNBT = spiltedlist.map(parts => {
        let id = parts[1]
        return `{"#c":"ae2:i","id":"${id}"}`
    }).join(",")
    let amtsNBT = spiltedlist.map(parts => `${parts[0]}L`).join(",")
    return `{RepairCost:0,amts:[L;${amtsNBT}],ic:${list.length}L,internalCurrentPower:20000.0d,keys:[${keysNBT}]}`
}

ServerEvents.recipes(event => {
    let nbt = my_packed_cell_nbt([
        '7553x gtlcore:molecular_casing','2352x kubejs:spacetime_assembly_line_casing',
        '1216x gtlcore:law_filter_casing','672x kubejs:spacetime_assembly_line_unit',
        '224x gtlcore:dimension_injection_casing','297x gtceu:high_power_casing',
        '704x gtlcore:dimensionally_transcendent_casing','32x kubejs:molecular_coil',
        '1968x gtceu:fusion_glass','280x kubejs:hollow_casing',
        '16x kubejs:dimensional_bridge_casing','1x gtceu:suprachronal_assembly_line'
    ])
    event.shapeless(Item.of('ae2:portable_item_cell_16k', nbt), ['gtceu:assembly_line'])
})

ServerEvents.recipes(event => {
    event.recipes.gtceu.extractor('cxhmz:eternity_from_catalyst')
        .notConsumable('kubejs:eternity_catalyst')
        .chancedFluidOutput('gtceu:eternity 1000', 500, 0)
        .duration(1)
        .EUt(480000000000)
})
