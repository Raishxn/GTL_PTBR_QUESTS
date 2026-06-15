(function() {
    let TwistedLine = global.TwistedLine = global.TwistedLine || {};
    let config;
    try {
        config = JsonIO.read('kubejs/config/[config]Special for production line twisters.json');
        if (config == null || typeof config !== 'object') throw new Error();
    } catch(e) {
        console.warn('[Special for production line twisters] startup configuration file not found, using default configuration');
        config = { enableBlastScript: true, enableTimeAcceleration: true, enableExclusiveContent: true };
    }
    TwistedLine.enableBlastScript = config.enableBlastScript ?? true;
    TwistedLine.enableTimeAcceleration = config.enableTimeAcceleration ?? true;
    TwistedLine.enableExclusiveContent = config.enableExclusiveContent ?? true;

    const LDLib = Java.loadClass("com.lowdragmc.lowdraglib.LDLib");
    if (TwistedLine.enableBlastScript && TwistedLine.enableTimeAcceleration && LDLib.isClient()) {
        try {
            TwistedLine.ttwToggleKey = new (Java.loadClass("net.minecraft.client.KeyMapping"))("key.kubejs.ttw_toggle", Java.loadClass("org.lwjgl.glfw.GLFW").GLFW_KEY_K, "key.category.kubejs.accelerator");
            ClientEvents.init(() => Java.loadClass("dev.architectury.registry.client.keymappings.KeyMappingRegistry").register(TwistedLine.ttwToggleKey));
            console.log('[Special for production line twisters] The time acceleration button has been successfully registered (K key)');
        } catch(e) { console.error('[Special for production line twisters] Button registration failed:' + e); }
    }

    if (TwistedLine.enableExclusiveContent) {
        StartupEvents.registry('item', event => {
            event.create('assembly_line_distorter:assembly_line_distorter_material').texture('assembly_line_distorter:item/assembly_line_distorter_material').displayName('§7The Emperor\'s Dust').maxStackSize(64).fireResistant();
            event.create('assembly_line_distorter:assembly_line_distorter_catalyst').displayName('§7The source of world destruction').maxStackSize(64).fireResistant();
            event.create('assembly_line_distorter:assembly_line_distorter_eye_of_harmony_core').texture('assembly_line_distorter:item/assembly_line_distorter_eye_of_harmony_core').displayName('§7 Hongmeng module core').maxStackSize(64).fireResistant();
            ["ulv","lv","mv","hv","ev","iv","luv","zpm","uv","uhv","uev","uiv","uxv","opv","max"].forEach(tier => {
                event.create(`assembly_line_distorter:assembly_line_distorter_circuits_${tier}`).texture('assembly_line_distorter:item/assembly_line_distorter_circuits').displayName(`§7万古算筹 [${tier.toUpperCase()}]`).maxStackSize(64).fireResistant().tag(`gtceu:circuits/${tier}`);
            });
        });
        ForgeEvents.onEvent("net.minecraftforge.event.entity.player.ItemTooltipEvent", event => {
            if (!LDLib.isClient()) return;
            const id = event.getItemStack().getId();
            if (id === "assembly_line_distorter:assembly_line_distorter_material") {
                event.getToolTip().add(Component.literal(TextUtil.full_color("✜ The dust of the fallen emperor · Eternity is empty ✜")));
                event.getToolTip().add(Component.literal(TextUtil.full_color("He was once the master of the era, but after his death he turned into a speck of dust.")));
                event.getToolTip().add(Component.literal(TextUtil.full_color("This speck of dust crushed the long river of time and crushed all the heavens and worlds.")));
                event.getToolTip().add(Component.literal(TextUtil.full_color("\"Those who hold this dust can make the emperors bow their heads and the great road collapse.\"")));
            } else if (id === "assembly_line_distorter:assembly_line_distorter_catalyst") {
                event.getToolTip().add(Component.literal(TextUtil.full_color("✜ ✜ The source of world destruction · One drop reverses cause and effect ✜")));
                event.getToolTip().add(Component.literal(TextUtil.full_color("Above the sky, in the place of eternal rest, a drop of origin quietly drips")));
                event.getToolTip().add(Component.literal(TextUtil.full_color("It does not involve cause and effect, does not fall into reincarnation, and can reverse all predetermined endings.")));
                event.getToolTip().add(Component.literal(TextUtil.full_color("\"Whoever holds it will be the only immortal variable in countless destructions.\"")));
            } else if (id === "assembly_line_distorter:assembly_line_distorter_eye_of_harmony_core") {
                event.getToolTip().add(Component.literal(TextUtil.full_color("✜ The first creation of Hongmeng · The return of all things ✜")));
                event.getToolTip().add(Component.literal(TextUtil.full_color("A wisp of Tao turns into the latitude and longitude of heaven and earth, and a thought flows to set the tripod in the sky for eternity.")));
                event.getToolTip().add(Component.literal(TextUtil.full_color("Those who hold on to this core can recast the avenue or destroy the era.")));
                event.getToolTip().add(Component.literal(TextUtil.full_color("\"The long river of time and space flows here, and all ending points are its starting points.\"")));
            } else if (id.startsWith("assembly_line_distorter:assembly_line_distorter_circuits_")) {
                event.getToolTip().add(Component.literal(TextUtil.full_color("✜ Eternal calculation · Calculation of secrets ✜")));
                event.getToolTip().add(Component.literal(TextUtil.full_color("Each calculation chip is a solidified era, with lightning as the pattern and star skeleton as the material.")));
                event.getToolTip().add(Component.literal(TextUtil.full_color("When they move at the same time, even Heaven will miscalculate his own destiny.")));
                event.getToolTip().add(Component.literal(TextUtil.full_color("\"The end of calculation is not the answer, but the power to rewrite eternity.\"")));
            }
        });
        console.log('[Special for Line Twisters] Exclusive content item registration completed');
    }
})();
