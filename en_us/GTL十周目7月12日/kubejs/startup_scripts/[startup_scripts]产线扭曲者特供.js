(function() {
    let TwistedLine = global.TwistedLine = global.TwistedLine || {};
    let config;
    try {
        config = JsonIO.read('kubejs/config/[config]Special for production line twisters.json');
        if (typeof config !== 'object') throw new Error();
    } catch(e) {
        console.warn('[Special for production line twisters] startup configuration file not found, using default configuration');
        config = {};
    }
    TwistedLine.enableBlastScript = config.enableBlastScript ?? true;
    TwistedLine.enableTimeAcceleration = config.enableTimeAcceleration ?? true;
    TwistedLine.enableExclusiveContent = config.enableExclusiveContent ?? true;
    TwistedLine.enableLogReport = config.enableLogReport ?? false;
    TwistedLine.enableGTCEUElementCompletion = config.enableGTCEUElementCompletion ?? true;

    function log(msg) { if (TwistedLine.enableLogReport) console.log(`[产线扭曲者特供] ${msg}`); }

    const LDLib = Java.loadClass("com.lowdragmc.lowdraglib.LDLib");
    if (TwistedLine.enableBlastScript && TwistedLine.enableTimeAcceleration && LDLib.isClient()) {
        try {
            TwistedLine.ttwToggleKey = new (Java.loadClass("net.minecraft.client.KeyMapping"))("key.kubejs.ttw_toggle", Java.loadClass("org.lwjgl.glfw.GLFW").GLFW_KEY_K, "key.category.kubejs.accelerator");
            ClientEvents.init(() => Java.loadClass("dev.architectury.registry.client.keymappings.KeyMappingRegistry").register(TwistedLine.ttwToggleKey));
            log('Time acceleration button registration successful (K key)');
        } catch(e) { console.error('[Special for production line twisters] Button registration failed:' + e); }
    }

    function addFluidToMaterial(material, key, FluidPropertyClass, FluidBuilderClass, PropertyKeyClass) {
        if (!material) return;
        let prop = new FluidPropertyClass();
        prop.getStorage().enqueueRegistration(key, new FluidBuilderClass());
        material.setProperty(PropertyKeyClass.FLUID, prop);
    }

    if (TwistedLine.enableBlastScript && TwistedLine.enableGTCEUElementCompletion) {
        try {
            var FluidPropertyClass = Java.loadClass('com.gregtechceu.gtceu.api.data.chemical.material.properties.FluidProperty');
            var FluidBuilderClass = Java.loadClass('com.gregtechceu.gtceu.api.fluids.FluidBuilder');
            var FluidStorageKeysClass = Java.loadClass('com.gregtechceu.gtceu.api.fluids.store.FluidStorageKeys');
            var PropertyKeyClass = Java.loadClass('com.gregtechceu.gtceu.api.data.chemical.material.properties.PropertyKey');

            GTCEuStartupEvents.registry("gtceu:material", event => {
                const materialsToFix = [
                    GTMaterials.Technetium,
                    GTMaterials.Rhenium,
                    GTMaterials.Germanium,
                    GTMaterials.Ruridit,
                    GTMaterials.Graphene,
                ];
                for (let mat of materialsToFix) {
                    if (mat && !mat.hasProperty(PropertyKeyClass.FLUID)) {
                        addFluidToMaterial(mat, FluidStorageKeysClass.LIQUID, FluidPropertyClass, FluidBuilderClass, PropertyKeyClass);
                        log(`已为 ${mat.getName()} 添加液态属性`);
                    }
                }
            });
            log('GTCEu element completion module is enabled');
        } catch(e) {
            console.error('[Special for Line Twisters] GTCEu element completion module failed to load:' + e);
        }
    }

    if (TwistedLine.enableBlastScript && TwistedLine.enableExclusiveContent) {
        StartupEvents.registry('item', event => {
            let itemCount = 0;
            event.create('assembly_line_distorter:assembly_line_distorter_material').texture('assembly_line_distorter:item/assembly_line_distorter_material').displayName('§7Emperor\'s Dust').maxStackSize(64).fireResistant();
            itemCount++;
            event.create('assembly_line_distorter:assembly_line_distorter_catalyst').texture('assembly_line_distorter:item/assembly_line_distorter_catalyst').displayName('§7The source of world destruction').maxStackSize(64).fireResistant();
            itemCount++;
            event.create('assembly_line_distorter:assembly_line_distorter_eye_of_harmony_core').texture('assembly_line_distorter:item/assembly_line_distorter_eye_of_harmony_core').displayName('§7Hongmeng module core').maxStackSize(64).fireResistant();
            itemCount++;
            event.create('assembly_line_distorter:assembly_line_distorter_fragments_of_the_world').texture('assembly_line_distorter:item/assembly_line_distorter_fragments_of_the_world').displayName('§7World Fragments').maxStackSize(64).fireResistant();
            itemCount++;
            event.create('assembly_line_distorter:assembly_line_distorter_drill_bit').texture('assembly_line_distorter:item/assembly_line_distorter_drill_bit').displayName('§7world drill bit').maxStackSize(64).fireResistant();
            itemCount++;
            ["ulv","lv","mv","hv","ev","iv","luv","zpm","uv","uhv","uev","uiv","uxv","opv","max"].forEach(tier => {
                event.create(`assembly_line_distorter:assembly_line_distorter_circuits_${tier}`).texture('assembly_line_distorter:item/assembly_line_distorter_circuits').displayName(`§7万古算筹 [${tier.toUpperCase()}]`).maxStackSize(64).fireResistant().tag(`gtceu:circuits/${tier}`);
                itemCount++;
            });
            let tool = event.create('assembly_line_distorter:assembly_line_distorter_all_in_one_tool').texture('assembly_line_distorter:item/assembly_line_distorter_all_in_one_tool').displayName('§7All-round synthesis tool').maxStackSize(64).fireResistant();
            ["crowbars","hammers","mallets","saws","screwdrivers","wire_cutters","wrenches","files","knives","mortars","pickaxes","axes","shovels","swords","hoes","shears"].forEach(t => {
                tool.tag(`forge:tools/${t}`);
            });
            itemCount++;
            log(`已注册 ${itemCount} 个专属内容物品`);
        });
        ForgeEvents.onEvent("net.minecraftforge.event.entity.player.ItemTooltipEvent", event => {
            if (!LDLib.isClient()) return;
            const id = event.getItemStack().getId();
            if (id === "assembly_line_distorter:assembly_line_distorter_material") {
                event.getToolTip().add(Component.literal(TextUtil.full_color("He was once the master of the era, but after his death he turned into a speck of dust.")));
                event.getToolTip().add(Component.literal(TextUtil.full_color("This speck of dust crushed the long river of time and crushed all the heavens and worlds.")));
                event.getToolTip().add(Component.literal(TextUtil.full_color("\"Those who hold this dust can make the emperors bow their heads and the great road collapse.\"")));
            } else if (id === "assembly_line_distorter:assembly_line_distorter_catalyst") {
                event.getToolTip().add(Component.literal(TextUtil.full_color("Above the sky, in the place of eternal rest, a drop of origin quietly drips")));
                event.getToolTip().add(Component.literal(TextUtil.full_color("It does not involve cause and effect, does not fall into reincarnation, and can reverse all predetermined endings.")));
                event.getToolTip().add(Component.literal(TextUtil.full_color("\"Whoever holds it will be the only immortal variable in countless destructions.\"")));
            } else if (id === "assembly_line_distorter:assembly_line_distorter_fragments_of_the_world") {
                event.getToolTip().add(Component.literal(TextUtil.full_color("Each fragment is a forgotten parallel world, whining softly in the cracks of the void")));
                event.getToolTip().add(Component.literal(TextUtil.full_color("Holding it in the palm of your hand, you can glimpse the end and rebirth of thousands of time and space")));
                event.getToolTip().add(Component.literal(TextUtil.full_color("\"Use the fragment as the key to open the narrow door to any destruction.\"")));
            } else if (id === "assembly_line_distorter:assembly_line_distorter_drill_bit") {
                event.getToolTip().add(Component.literal(TextUtil.full_color("It drills through the membrane of the world and extracts the original fluid from the depths of the river of time.")));
                event.getToolTip().add(Component.literal(TextUtil.full_color("Every rotation cuts an unhealable wound in the law of cause and effect.")));
                event.getToolTip().add(Component.literal(TextUtil.full_color("\"Wherever the drill reaches, infinity is the only answer.\"")));
            } else if (id === "assembly_line_distorter:assembly_line_distorter_eye_of_harmony_core") {
                event.getToolTip().add(Component.literal(TextUtil.full_color("A wisp of Tao turns into the latitude and longitude of heaven and earth, and a thought flows to set the tripod in the sky for eternity.")));
                event.getToolTip().add(Component.literal(TextUtil.full_color("Those who hold on to this core can recast the avenue or destroy the era.")));
                event.getToolTip().add(Component.literal(TextUtil.full_color("\"The long river of time and space flows here, and all ending points are its starting points.\"")));
            } else if (id.startsWith("assembly_line_distorter:assembly_line_distorter_circuits_")) {
                event.getToolTip().add(Component.literal(TextUtil.full_color("Each calculation chip is a solidified era, with lightning as the pattern and star skeleton as the material.")));
                event.getToolTip().add(Component.literal(TextUtil.full_color("When they move at the same time, even Heaven will miscalculate his own destiny.")));
                event.getToolTip().add(Component.literal(TextUtil.full_color("\"The end of calculation is not the answer, but the power to rewrite eternity.\"")));
            } else if (id === "assembly_line_distorter:assembly_line_distorter_all_in_one_tool") {
                event.getToolTip().add(Component.literal(TextUtil.full_color("It carries the power of all tools, but appears as a mortal thing")));
                event.getToolTip().add(Component.literal(TextUtil.full_color("One weapon breaks all laws, one thought breaks the world")));
                event.getToolTip().add(Component.literal(TextUtil.full_color("\"All weapons are unified and eternal.\"")));
            }
        });
        log('Exclusive content item registration completed');
    }

    GTCEuStartupEvents.registry("gtceu:element", event => {
        if (!GTElements.get("attuned_tengam")) {
            event.create("attuned_tengam", 1, 1, -1, null, "At", false);
        }
    });
    GTCEuStartupEvents.registry("gtceu:material", event => {
        let material = GTMaterials.get("attuned_tengam");
        if (!material) {
            event.create('attuned_tengam')
                .color(0x00FF00)
                .secondaryColor(0x00FF00)
                .element(GTElements.get("attuned_tengam"))
                .iconSet(GTMaterialIconSet.METALLIC)
                .ingot()
                .fluid();
        } else {
            let PropertyKey = Java.loadClass('com.gregtechceu.gtceu.api.data.chemical.material.properties.PropertyKey');
            if (!material.hasProperty(PropertyKey.FLUID)) {
                let FluidProperty = Java.loadClass('com.gregtechceu.gtceu.api.data.chemical.material.properties.FluidProperty');
                let FluidBuilder = Java.loadClass('com.gregtechceu.gtceu.api.fluids.FluidBuilder');
                let FluidStorageKeys = Java.loadClass('com.gregtechceu.gtceu.api.fluids.store.FluidStorageKeys');
                let prop = new FluidProperty();
                prop.getStorage().enqueueRegistration(FluidStorageKeys.LIQUID, new FluidBuilder());
                material.setProperty(PropertyKey.FLUID, prop);
            }
        }
    });
})();