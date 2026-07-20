(function() {
    let TwistedLine = global.TwistedLine = global.TwistedLine || {};
    let config;
    try {
        config = JsonIO.read('kubejs/config/[config]Especial para linha de produção twisters.json');
        if (typeof config !== 'object') throw new Error();
    } catch(e) {
        console.warn('Arquivo de configuração de inicialização [Especial para twisters de linha de produção] não encontrado, usando configuração padrão');
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
            log('Registro do botão de aceleração de tempo bem-sucedido (tecla K)');
        } catch(e) { console.error('[Especial para twisters de linha de produção] Falha no registro do botão:' + e); }
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
            log('O módulo de conclusão do elemento GTCEu está habilitado');
        } catch(e) {
            console.error('[Especial para Line Twisters] O módulo de conclusão do elemento GTCEu falhou ao carregar:' + e);
        }
    }

    if (TwistedLine.enableBlastScript && TwistedLine.enableExclusiveContent) {
        StartupEvents.registry('item', event => {
            let itemCount = 0;
            event.create('assembly_line_distorter:assembly_line_distorter_material').texture('assembly_line_distorter:item/assembly_line_distorter_material').displayName('§7Poeira do Imperador').maxStackSize(64).fireResistant();
            itemCount++;
            event.create('assembly_line_distorter:assembly_line_distorter_catalyst').texture('assembly_line_distorter:item/assembly_line_distorter_catalyst').displayName('§7A fonte da destruição mundial').maxStackSize(64).fireResistant();
            itemCount++;
            event.create('assembly_line_distorter:assembly_line_distorter_eye_of_harmony_core').texture('assembly_line_distorter:item/assembly_line_distorter_eye_of_harmony_core').displayName('Núcleo do módulo §7Hongmeng').maxStackSize(64).fireResistant();
            itemCount++;
            event.create('assembly_line_distorter:assembly_line_distorter_fragments_of_the_world').texture('assembly_line_distorter:item/assembly_line_distorter_fragments_of_the_world').displayName('Fragmentos do Mundo §7').maxStackSize(64).fireResistant();
            itemCount++;
            event.create('assembly_line_distorter:assembly_line_distorter_drill_bit').texture('assembly_line_distorter:item/assembly_line_distorter_drill_bit').displayName('Broca mundial §7').maxStackSize(64).fireResistant();
            itemCount++;
            ["ulv","lv","mv","hv","ev","iv","luv","zpm","uv","uhv","uev","uiv","uxv","opv","max"].forEach(tier => {
                event.create(`assembly_line_distorter:assembly_line_distorter_circuits_${tier}`).texture('assembly_line_distorter:item/assembly_line_distorter_circuits').displayName(`§7万古算筹 [${tier.toUpperCase()}]`).maxStackSize(64).fireResistant().tag(`gtceu:circuits/${tier}`);
                itemCount++;
            });
            let tool = event.create('assembly_line_distorter:assembly_line_distorter_all_in_one_tool').texture('assembly_line_distorter:item/assembly_line_distorter_all_in_one_tool').displayName('§7Ferramenta de síntese completa').maxStackSize(64).fireResistant();
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
                event.getToolTip().add(Component.literal(TextUtil.full_color("Ele já foi o mestre da época, mas depois de sua morte se transformou em um grão de poeira.")));
                event.getToolTip().add(Component.literal(TextUtil.full_color("Esta partícula de poeira esmagou o longo rio do tempo e esmagou todos os céus e mundos.")));
                event.getToolTip().add(Component.literal(TextUtil.full_color("“Aqueles que seguram esta poeira podem fazer os imperadores baixarem a cabeça e a grande estrada desabar.”")));
            } else if (id === "assembly_line_distorter:assembly_line_distorter_catalyst") {
                event.getToolTip().add(Component.literal(TextUtil.full_color("Acima do céu, no lugar de descanso eterno, uma gota de origem escorre silenciosamente")));
                event.getToolTip().add(Component.literal(TextUtil.full_color("Não envolve causa e efeito, não cai na reencarnação e pode reverter todos os finais predeterminados.")));
                event.getToolTip().add(Component.literal(TextUtil.full_color("\"Quem o possuir será a única variável imortal em inúmeras destruições.\"")));
            } else if (id === "assembly_line_distorter:assembly_line_distorter_fragments_of_the_world") {
                event.getToolTip().add(Component.literal(TextUtil.full_color("Cada fragmento é um mundo paralelo esquecido, gemendo suavemente nas fendas do vazio")));
                event.getToolTip().add(Component.literal(TextUtil.full_color("Segurando-o na palma da sua mão, você pode vislumbrar o fim e o renascimento de milhares de tempo e espaço")));
                event.getToolTip().add(Component.literal(TextUtil.full_color("\"Use o fragmento como chave para abrir a porta estreita para qualquer destruição.\"")));
            } else if (id === "assembly_line_distorter:assembly_line_distorter_drill_bit") {
                event.getToolTip().add(Component.literal(TextUtil.full_color("Ele perfura a membrana do mundo e extrai o fluido original das profundezas do rio do tempo.")));
                event.getToolTip().add(Component.literal(TextUtil.full_color("Cada rotação abre uma ferida incurável na lei de causa e efeito.")));
                event.getToolTip().add(Component.literal(TextUtil.full_color("\"Onde quer que a broca chegue, o infinito é a única resposta.\"")));
            } else if (id === "assembly_line_distorter:assembly_line_distorter_eye_of_harmony_core") {
                event.getToolTip().add(Component.literal(TextUtil.full_color("Um fio de Tao se transforma na latitude e longitude do céu e da terra, e um pensamento flui para estabelecer o tripé no céu para a eternidade.")));
                event.getToolTip().add(Component.literal(TextUtil.full_color("Aqueles que se apegam a este núcleo podem reformular o caminho ou destruir a era.")));
                event.getToolTip().add(Component.literal(TextUtil.full_color("\"O longo rio do tempo e do espaço flui aqui, e todos os pontos finais são seus pontos de partida.\"")));
            } else if (id.startsWith("assembly_line_distorter:assembly_line_distorter_circuits_")) {
                event.getToolTip().add(Component.literal(TextUtil.full_color("Cada chip de cálculo é uma era solidificada, com o relâmpago como padrão e o esqueleto estelar como material.")));
                event.getToolTip().add(Component.literal(TextUtil.full_color("Quando eles se movem ao mesmo tempo, até o Céu calculará mal o seu próprio destino.")));
                event.getToolTip().add(Component.literal(TextUtil.full_color("“O fim do cálculo não é a resposta, mas o poder de reescrever a eternidade.”")));
            } else if (id === "assembly_line_distorter:assembly_line_distorter_all_in_one_tool") {
                event.getToolTip().add(Component.literal(TextUtil.full_color("Carrega o poder de todas as ferramentas, mas aparece como algo mortal")));
                event.getToolTip().add(Component.literal(TextUtil.full_color("Uma arma quebra todas as leis, um pensamento quebra o mundo")));
                event.getToolTip().add(Component.literal(TextUtil.full_color("\"Todas as armas são unificadas e eternas.\"")));
            }
        });
        log('Registro de item de conteúdo exclusivo concluído');
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