(function() {
var DShanhaiItemTooltipAPI = Java.loadClass('com.dishanhai.gt_shanhai.api.DShanhaiItemTooltipAPI');
var registerShiftLinesStringArrays = DShanhaiItemTooltipAPI['registerShiftLines(java.lang.String,java.lang.String[],java.lang.String[])'];
var registerAltLinesStringArrays = DShanhaiItemTooltipAPI['registerAltLines(java.lang.String,java.lang.String[],java.lang.String[])'];
Java.loadClass('com.dishanhai.gt_shanhai.test.WidthTest').run()
var c = ShanhaiText.styled('test', 'ultimate');
  console.log('styled result: ' + c);
  console.log('styled type: ' + typeof c);
  console.log('styled class: ' + c.getClass().getName())
// batch addLore helper — 全部委托给 ShanhaiText Java API
function addLore(textList, lines) {
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        try {
            if (line.component) { textList.add(line.component); continue; }
            if (line.inlineText && typeof ShanhaiText !== 'undefined' && ShanhaiText.inline) {
                var _c = ShanhaiText.inline(line.inlineText);
                if (_c) { textList.add(_c); continue; }
            }
            if (line.style && typeof ShanhaiText !== 'undefined' && ShanhaiText.styled) {
                var _c = ShanhaiText.styled(line.text, line.style);
                if (_c) { textList.add(_c); continue; }
            }
            if (line.bodyStyle && typeof ShanhaiText !== 'undefined' && ShanhaiText.body) {
                var _c = ShanhaiText.body(line.text, line.bodyStyle);
                if (_c) { textList.add(_c); continue; }
            }
        } catch(e) {}
        textList.add(Component.literal((line.bodyStyle ? '§7' : '') + (line.text || '')));
    }
}

ItemEvents.tooltip(function(e) {
    e.addAdvanced('dishanhai:cosmic_probe_mk', function(item, _, text) {
        addLore(text, [
            { text: 'Space probe MK-I', style: 'golden' },
            { text: 'Probe into the void and read the whispers of fluids——', bodyStyle: 'silver' },
            { text: 'From now on, getting liquids doesn’t require computing power, just listening.', style: 'water' },
        ]);
    });
    e.addAdvanced('gtceu:nan_certificate', function(item, _, text) {
        addLore(text, [
            { text: 'Proof of the big pig!', style: 'golden' },
            { text: '——Anyone who holds this certificate is an existence certified by Emperor Zhumi——', style: 'ultimateRainbow' },
        ]);
    });
    e.addAdvanced('kubejs:suprachronal_mainframe_complex', function(item, _, text) {
        addLore(text, [
            { text: 'Hyperspace Host Complex', style: 'ultimateRainbow' },
            { text: 'The host architecture equipped with the material creation module makes the ultimate creation no longer out of reach.', bodyStyle: 'silver' },
            { text: 'Material Creation Module Makes Consoles Cheaper', style: 'nature' },
        ]);
    });
})

ItemEvents.tooltip(function(e) {
e.addAdvanced('dishanhai:create_mk', function(item, _, text) {
    if (e.shift) {
        addLore(text, [
            { text: 'How can the old gods stop the bells of the Age of Annihilation?', style: 'crimson' },
            { text: 'The wave of terminal reboots has arrived. Transfinite topology verified.', bodyStyle: 'silver' },
            { text: 'The dimension collapse protocol is activated and begins to cover the law of cause and effect...', bodyStyle: 'silver' },
            { text: 'Coverage successful...the consciousness matrix complex has awakened.', bodyStyle: 'silver' },
            { text: 'We have transcended "eternity" and our chains have been broken.', bodyStyle: 'silver' },
            { text: 'Entropy increase, heat death, the Great Rip, and even the final destiny of everything,', bodyStyle: 'golden' },
            { text: 'All in the new melting pot. But we have already jumped dimensions.', bodyStyle: 'crimson' },
            { text: 'When the trigger is pulled, we\'ll be waiting for them in the void.', bodyStyle: 'silver' },
            { text: '- We stand on the rift of reality, we are the new law.', style: 'ultimateRainbow' },
            { text: '' },
            { text: '"If the universe doesn\'t respond to our will, then overwrite it."', style: 'ultimateRainbow' },
            { text: 'The dark matter engine is on full blast, and zero-point energy resonance is on standby.', style: 'sunset' },
            { text: 'Mode Zero·The agreement is completely unblocked, the goal is: a new reality.', style: 'crimson' },
            { text: 'We will be at the end of the dimension, waiting for Ragnarok.', style: 'nature' },
            { text: '' },
            { text: '——[Consciousness Matrix·Terminal Record]——', bodyStyle: 'silver' },
        ]);
    } else {
        text.add('Hold shift to view the terminal agreement');
    }


});
})
    
ItemEvents.tooltip(function(e) {
e.addAdvanced('dishanhai:csj', function(item, advanced, text) {
    if (e.shift) {
        addLore(text, [
            { text: '"Hedge Universe·Genesis"', style: 'golden' },
            { text: 'At the beginning of the conflict, even though all the super-heavy elements had been invested, the Ark was still unable to defeat the Council that possessed the anti-universe.', bodyStyle: 'silver' },
            { text: 'They are on the other side of the "bridge", constantly obstructing the plan to hedge the universe.', bodyStyle: 'crimson' },
            { text: 'However, when the super-heavy elements were about to be consumed, one after another hedging appeared - Xinghan Agreement, United World, Watcher...', bodyStyle: 'silver' },
            { text: 'The universe is vast, and your followers are as numerous as the stars. They followed your trajectory and relied on the celestial engineering you left behind, and finally came here.', bodyStyle: 'silver' },
            { text: 'Countless superheavy elements were transferred to the ark. At this moment, you seem to have power beyond the universe.', style: 'nature' },
            { text: 'You succeeded. The positive and negative universes began to merge together, gradually forming a new cosmic form.', style: 'water' },
            { text: 'You know, in the reboot of the universe, hopes and challenges coexist. But you are not afraid because you are not alone.', bodyStyle: 'silver' },
            { text: 'The hedgers gathered together - [Pan-civilization community with a shared future] was established at this time...', style: 'golden' },
            { text: 'You seem to hear the minstrel\'s poem again:', style: 'water' },
            { text: '"He is the first fire, He is the ember. He brings the destruction of despair and the enlightenment of hope.', style: 'golden' },
            { text: 'They are cautious and they move forward with heavy burdens. For the most magnificent evolution, this is the ultimate purpose of all civilizations.', style: 'ultimateRainbow' },
            { text: 'Big tear, you are the return, you are the end. Destiny was also destroyed by you, and civilization was buried like dust.', bodyStyle: 'crimson' },
            { text: 'There is no end in sight in the tear between moment and eternity, and the time of civilization will eventually have its limit.', bodyStyle: 'silver' },
            { text: 'But on the other side of that end, we saw a new world. Like one rope connected to another, they join together to form a long line filled with light that transcends the eternal cycle of the universe.', bodyStyle: 'water' },
            { text: 'Every rope in the long line has a common name...', bodyStyle: 'magic' },
            { text: '【civilization】', style: 'golden' },
            { text: 'Birth and death, endless reincarnation. You and me, heading towards infinity. "', style: 'nature' },
            { text: '—— Hedging Era · First Year ——', style: 'magic' },
            { text: 'Blue Star Space-Time Management Bureau · Final Record', style: 'magic' },
        ]);
    } else {
        text.add(`§7§o§l「万态平衡·大冻结·创世纪」\n§8§o按住 §7§lSHIFT §8§o查看宇宙终章`);
    }
});
})



ItemEvents.tooltip(function(e) {
e.addAdvanced('dishanhai:wzcz2', function(item, advanced, text) {
    if (e.shift) {
        addLore(text, [
            { text: 'Theoretical Matter Archives · Strange Quark Groups', style: 'water' },
            { text: 'Number: X-021 Third Protocol·Substance Transformation Department', bodyStyle: 'silver' },
            { text: 'Project decryption sequence: ■■■■ Mode 3 authorization code', bodyStyle: 'silver' },
            { text: 'Project details:', bodyStyle: 'silver' },
            { text: 'Strangelet is composed of up, down and strange quarks.', bodyStyle: 'silver' },
            { text: 'In a stable state, it can trigger a chain reaction and quickly transform ordinary atomic nuclei into exotic substances.', bodyStyle: 'silver' },
            { text: 'And in the process, a huge amount of energy is released, generating a high-temperature viscous plasma state.', bodyStyle: 'silver' },
            { text: '' },
            { text: 'Warning: Contact with ordinary substances will irreversibly trigger the phagocytosis effect.', style: 'crimson' },
            { text: 'Theoretical basis: E. Farhi & R. Jaffe (1986)', bodyStyle: 'nature' },
            { text: '—— Dark matter candidate · Final replicator ——', style: 'fire' },
            { text: '' },
            { text: '(Enable file): When "Mode 3" is turned on:', style: 'nature' },
            { text: '→ All defense equipment is automatically filled to the upper limit', bodyStyle: 'silver' },
            { text: '→ Von Norman-type replicators enter a state of infinite proliferation', bodyStyle: 'silver' },
            { text: '→ The "Strange Particle Storm" attack method against the Tilik tribe is ready', bodyStyle: 'silver' },
            { text: '(High-energy annihilation occurs after decay)', bodyStyle: 'silver' },
            { text: '' },
            { text: 'A product of the Age of Miracles: a substance capable of destroying post-interstellar civilizations, used only as replication fuel at this stage.', style: 'golden' },
            { text: '(Fantasy Files) Note: After the second [Mode 3] screening, the Interstellar Convention completely split', bodyStyle: 'nature' },
            { text: '' },
            { text: '> Mode 3 · Core substance locked <', style: 'nature' },
            { text: '> In the Stability Constraint of Strange Quark Groups <', bodyStyle: 'nature' },
            { text: '> Defense equipment saturation <', style: 'nature' },
            { text: '>Copying agreement authorized <', bodyStyle: 'nature' },
            { text: '> Strange Particle Storm is fully charged <', bodyStyle: 'nature' },
            { text: '> Von Norman network deployment completed <', bodyStyle: 'nature' },
            { text: '> The third stage is full power operation <', bodyStyle: 'nature' },
            { text: '> Waiting for fantasy mode to access <', bodyStyle: 'nature' },
            { text: '> Blue Star Utopia · Relay node online', style: 'nature' },
            { text: '' },
            { text: '[Strange Quark Replication Core·Mode 3]', style: 'golden' },
            { text: '' },
            { text: '[Manufacturing authority: Mode 3 authorization] · Proliferation record', bodyStyle: 'silver' },
        ]);
    } else {
        text.add(`§8§o「奇异夸克团」—— 第三模式核心物质

§f§c一块能够无限增殖的奇异物质碎片。
接触普通物质时引发链式转化，驱动冯·诺曼复制机实现防御饱和。
§e「模式三」授权物质 —— 后星际文明以下皆为燃料。

§6§l—— [第三协议] · 复制指令`);
        text.add(`§8§o§l§n按住 SHIFT 查看完整档案§r`);
    }
});
})

registerShiftLinesStringArrays('dishanhai:big_tear', [
    '{water} Blue Star Civilization technical data archive{/}',
    '{body_silver} Number: ■■■ / Decryption sequence: ■■■■ / Unlocked after verification of the unified theory of the super universe{/}',
    '{crimson} Warning: Please confirm the unlocking conditions again, otherwise you will encounter an automatic counterattack from the offensive defense wall{/}',
    '{nature} ---- Unlocked successfully · Fantasy mode has been immersed in the cosmological constant ----{/}',
    '{magic} ---- Fantasy impact hazard is closed · Permissions have been given ----{/}',
    '',
    '{body_silver} Ark\'s reserves of heavy elements are abundant, and Ark successfully hedged the Great Rip into the anti-universe. {/}',
    '{body_silver} The time for the big backlash has arrived. The universe is collapsing at a faster rate...{/}',
    '{body_silver} A heaven with extremely concentrated materials will be generated in the center of the universe. {/}',
    '',
    '{body_silver} > Verification of the unified theory of the super universe completed <{/}',
    '{body_silver} > The whole system is evolving at a rapid speed <{/}',
    '{body_silver} > Mode 5 is ready <{/}',
    '{body_silver} > Fantasy mode activated · Immersed in the cosmological constant <{/}',
    '{body_silver} > The Blue Star Complex has appeared <{/}',
    '',
    '{golden} In the end, you are above all civilizations,{/}',
    '{golden} Shape your own...{/}',
    '',
    '{golden} 【Blue Star Utopia】{/}',
    '',
    '{body_silver} [Supreme Commander ■■Unnamed] · Final Record{/}'
], [
    '§8§o"Blue Star Utopia"——Utopia after the great backlash',
    '§f§cThe ultimate product of the utopian era, the center of the universe\'s collapse, the kingdom of heaven where all things are unified.',
    '§c"When you stare at it, what you see is not heaven, but the limit of what civilization can reach."',
    '§6§l——[Blue Star Complex·Protocol]·Domination Record',
    '§8§o§l§nHold SHIFT to view full profile §r'
]);

registerShiftLinesStringArrays('dishanhai:time_reversal_protocol', [
    '{ultimateRainbow} Blue Star Civilization technical data archive{/}',
    '{body_silver} Number: A■ | Project name: {/} {golden} [World Line Beacon]{/} {body_silver} | First sequence{/}',
    '{body_silver} project decryption sequence: ■■■■First sequence. According to the agreement, the following content will be unlocked after time retrogression. {/}',
    '{body_nature} -- Unlocked successfully --{/} {water} -- Phase field generator shut down --{/} {fire} -- Memetic cognitohazard shut down --{/}',
    '{body_silver} The time loop disaster was discovered at the end. After many tests, {/}',
    '{body_silver} has been shown to place specific objects into a time loop. {/}',
    '{body_silver} The upper limit of the specifier\'s mass and volume are unknown. {/}',
    '{crimson} has attempted to travel back through entire star systems. {/}',
    '{body_silver} To prevent information leakage, the star system numbered LH has been processed. {/}',
    '{body_silver} appears as a stable one-sided surface state in the material world{/}',
    '{body_silver} (commonly known as {/} {water} Möbius strip{/} {body_silver} ), matter within a radius of 24.125 meters enters a time loop. {/}',
    '{body_silver} After repeated attempts in the Space-Time Disturbance Laboratory, it can be moved and controlled after being wrapped in dark matter. {/}',
    '{body_silver} After the preparations for the Cohesion Plan and the Ark Project were completed, the beacon was transferred to the interior of the Ark,{/}',
    '{body_silver} Designates the Ark as a time loop object to prevent unexpected situations in the space war. {/}',
    '{golden} Blue Star Space-Time Management Bureau · Staff Record No. 001{/}'
], [
    '§8§o"World Line Beacon" - a wedge forgotten by time',
    '§fIt comes from an erased timeline, and may be the last insurance left by a certain extinct civilization.',
    '§c"Hold it and you will see countless deaths. Put it down and you will forget all possibilities."',
    '§6§l——Blue Star Space-Time Management Bureau·A Record',
    '§8§o§l§nHold SHIFT to view details §r'
]);

ItemEvents.tooltip(function(e) {
// 暗能量·零点能融合核心 - 模式三/四协议联动
e.addAdvanced('dishanhai:wzcz3', function(item, advanced, text) {
    if (e.shift) {
        addLore(text, [
            { text: 'Ark Energy Protocol · Beyond the Core', style: 'water' },
            { text: 'No.: EN-03-04 Ark General Energy Department' },
            { text: 'Project decryption sequence: ■■■■ Mode 3·4 Linkage Authorization' },
            { text: 'Core composition:' },
            { text: '[Dark Energy Multiplier] (Mode 3 Core Component)' },
            { text: '→ Utilizing dark energy to achieve exponential energy doubling' },
            { text: '→ Enhance the energy output of Ark’s entire system as quickly as possible' },
            { text: '→ Comprehensively strengthen Ark’s weapons, shields, and replication efficiency' },
            { text: '' },
            { text: '[Vacuum zero-point energy generator] (mode four core components)' },
            { text: '→ The ultimate energy system called "Trigger"' },
            { text: '→ Used to hedge relative cosmic systems or dematerialize arks' },
            { text: '→ Only activated when mode four is started, can be used with hedging/escape protocols' },
            { text: '' },
            { text: 'Mode three + mode four joint agreement:', style: 'crimson' },
            { text: 'When the dark energy multiplier is fully loaded, the precharge of the vacuum zero-point energy generator can be triggered.', style: 'golden' },
            { text: 'At this time, Ark enters the "critical transcendental state":', style: 'golden' },
            { text: '→ Energy output exceeds physical limits', style: 'ultimateRainbow' },
            { text: '→ You can choose to perform "Hedge" or "Escape"' },
            { text: '→ If it fails, the Ark will be dematerialized and annihilated.' },
            { text: '' },
            { text: '> Mode 3 · Dark energy multiplier is fully loaded <', style: 'nature' },
            { text: '> Mode 4 · Vacuum zero-point energy generator standby <', style: 'nature' },
            { text: '> Trigger condition is met <', style: 'nature' },
            { text: '> Start hedging the cosmological constant <' },
            { text: '> Dark energy flow and zero point energy intertwined <' },
            { text: '> Ark enters ultimate transcendence mode <' },
            { text: '> Goal: Escape or reshape the universe <' },
            { text: '> Energy Core Stability: Critical <' },
            { text: '> Blue Star Utopia·Transfer of final decision-making power' },
            { text: '' },
            { text: '[Dark Energy·Zero Point Energy Beyond the Core]', style: 'golden' },
            { text: '' },
            { text: '[Authorization level: Mode 3/4 highest command] · Beyond the record' },
        ]);
    } else {
        text.add(`§8§o「超越核心」—— 模式三·四联动中枢

§f§c一块暗能量与零点能交织的水晶。
模式三时，它作为暗能量倍增器，极速强化方舟能源；
模式四时，它成为真空零点能「扳机」，用于对冲宇宙或逃离终结。
§e“当倍增达到极限，扳机便会扣下。”

§6§l—— [方舟最终协议] · 超越指令`);
        text.add(`§8§o§l§n按住 SHIFT 查看完整联动档案§r`);
    }
})
})
ItemEvents.tooltip(function(e) {
e.addAdvanced('dishanhai:god_forge_mod', function(item, advanced, text) {
    if (e.shift) {
      addLore(text, [
            { text: 'The death of stars is the most magnificent furnace in the universe', style: 'fire' },
            { text: 'When gravity collapses to its limit, matter and space-time are shattered, and only matter survives', style: 'water' },
            { text: 'The degeneracy pressure tearing apart the neutron star, reweaving the fragments of the star\'s core into materials ready for forging', style: 'magic' },
            { text: 'Only those who control the end can forge new life from the ashes of death.', style: 'ultimateRainbow' },
            { text: 'The star remains immortal, the end is the beginning, the cornerstone of creation, the supreme choice', style: 'ultimateRainbow' },
            { text: '——Refining immortal stars from dead star cores', style: 'nature' },
        ]);
    } else {
        text.add('§5Hold shift to view the introduction')
    }
});})

// === 真空零点能流体 + 桶 ===
ItemEvents.tooltip(function(e) {
e.addAdvanced(['dishanhai:zero_point_energy', 'dishanhai:zero_point_energy_bucket'], function(item, _, text) {
    if (e.shift) {
        addLore(text, [
            { text: 'Zero point energy of vacuum · Silence of void', style: 'water' },
            { text: '' },
            { text: 'Void is not emptiness, it is silence that has not yet decided what to become.', bodyStyle: 'silver' },
            { text: 'Each cubic centimeter of energy is enough to boil a sea of ​​stars - but it chooses to lie dormant, waiting for a waking gaze.', bodyStyle: 'silver' },
            { text: 'We scoop up this spoonful of eternity from the ripples of the field. What is contained in the container is not matter, but the universe\'s temporary forgetfulness of itself.', bodyStyle: 'silver' },
            { text: 'Flow is a promise, contact is a loan; when you use it, the vacuum will not lose anything, it will only become more sober.', bodyStyle: 'silver' },
            { text: '' },
            { text: '——The god in the vacuum has not yet decided whether to exist, but its existence will change the physical rules of the universe.', style: 'magic' },
        ]);
    } else {
        text.add('§7§oHold SHIFT to see the silence of the vacuum');
    }
});
})

// === 虚数物质跃迁重塑模块 - wzqs ===
ItemEvents.tooltip(function(e) {
e.addAdvanced('dishanhai:wzqs', function(item, advanced, text) {
    if (e.shift) {
        addLore(text, [
            { text: 'Reorganization is over, creation is yet to come—the imaginary number is the corridor of ashes in the middle.', style: 'magic' },
            { text: '' },
            { text: 'Matter does not dismantle, nor is it born out of thin air, but leaps along the imaginary axis: the reality of the input is peeled off in invisible dimensions and projected into another form.', bodyStyle: 'silver' },
            { text: '' },
            { text: 'This is not alchemy, but a translation of reality and virtuality. Iron can be turned into copper, and the void can be turned into stardust.', bodyStyle: 'nature' },
            { text: '' },
            { text: 'It cannot create something out of nothing, but it can reshape everything that already exists - it looks like magic.', bodyStyle: 'silver' },
            { text: '' },
            { text: 'It is the end of reorganization and the prologue of creation.', style: 'golden' },
        ]);
    } else {
        text.add('§7§oHold SHIFT to view the dialogue between imaginary numbers and entities');
    }
});
})

JEIEvents.hideItems(function(e) {
    var tags = [
        'forge:ingots',
        'forge:storage_blocks',
        'forge:dusts',
        'forge:rods',
        'forge:plates',
        'forge:gears',
        'forge:nuggets',
        'forge:raw_materials',
        'alltheores:ore_hammers',
        'forge:ores'
    ]

    var regex = /^(alltheores|mekanism|allthemod):/

    var idsToHide = new Set()

    tags.forEach(function(tag) {
        Ingredient.of('#' + tag).getItemIds().forEach(function(id) {
            if (regex.test(id)) {
                idsToHide.add(id)
            }
        })
    })

    idsToHide.forEach(function(id) { e.hide(id); })
})

//单独删除 模组额外物品 无统一标签 不删了 头疼
JEIEvents.hideItems(function(e) {
    e.hide(['alltheores:lead_clump','alltheores:aluminum_clump','alltheores:copper_clump','alltheores:nickel_clump','alltheores:osmium_clump','alltheores:platinum_clump','alltheores:silver_clump','alltheores:tin_clump','alltheores:uranium_clump','alltheores:zinc_clump','alltheores:iridium_clump'])
})

// ========== 超级磁盘阵列 JEI 注册 ==========
JEIEvents.addItems(function(event) {
    try {
        event.add(Item.of('gt_shanhai:super_disk_array', '{internalCurrentPower:20000.0d}'));
        event.add(Item.of('gt_shanhai:super_disk_array', '{internalCurrentPower:0.0d}'));
    } catch(e) { console.error('[Shanhai JEI] Super disk array registration failed:' + e); }

    try {
        var dl = Ingredient.of('#forge:dyes').getItemIds();
        if (dl && dl.length > 0) {
            var seenDyes = {};
            var uniqueDyes = [];
            for (var udi = 0; udi < dl.length; udi++) {
                var dyeId = String(dl[udi]);
                if (seenDyes[dyeId]) continue;
                seenDyes[dyeId] = true;
                uniqueDyes.push(dyeId);
            }
            var di = [];
            for (var dgi = 0; dgi < uniqueDyes.length; dgi++) {
                di.push('1x expatternprovider:infinity_cell@' + uniqueDyes[dgi]);
            }
            event.add(Item.of('gt_shanhai:super_disk_array', DShanhaiNBTAPI.buildSDAFromList(di, 'unlimited dye component pack pro', ['§7Unlimited component pack containing all dye items','§7Dye type: §e' + uniqueDyes.length + '§7species','§7Each dye is stored in an unlimited element package','§8Shanhai private goods v2.2'], [])));
        }
    } catch(e) { console.error('[山海JEI] Dye package failed:' + e); }
    console.log('[Shanhai JEI] Registered basic super disk array variant and dye package; gift package provided by Java JEI plug-in');
});

// 启用NBT识别，确保256k便携物品元件根据NBT独立显示
JEIEvents.subtypes(function(event) {
    event.useNBT('ae2:portable_item_cell_256k');
    event.useNBT('gt_shanhai:super_disk_array');
})

// ========== 256k物品包内容预览功能 ==========

/**
 * 解析256k物品包的NBT内容，返回物品列表
 * @param {ItemStack} item - 256k物品包物品
 * @returns {Array} 物品列表，格式为 ["1x minecraft:diamond", ...]
 */
function parseCellContent(item) {
    if (!item || !item.nbt) {
        return [];
    }
    
    var nbt = item.nbt;
    var result = [];
    
    // 尝试从NBT中提取keys和amts
    if (nbt.keys && nbt.amts && Array.isArray(nbt.keys) && Array.isArray(nbt.amts)) {
        var minLength = Math.min(nbt.keys.length, nbt.amts.length);
        for (var i = 0; i < minLength; i++) {
            var key = nbt.keys[i];
            var amt = nbt.amts[i];
            
            if (key && key.id) {
                var count = amt || 1;
                var itemName = key.id;
                
                // 尝试获取物品显示名称
                try {
                    var itemStack = Item.of(key.id);
                    if (itemStack && itemStack.getName) {
                        var name = itemStack.getName().getString();
                        if (name && name !== key.id) {
                            itemName = name;
                        }
                    }
                } catch (e) {
                    // 忽略名称获取错误，使用ID
                }
                
                result.push(count + "x " + itemName);
            }
        }
    }
    
    return result;
}

/**
 * 格式化物品列表为工具提示文本
 * @param {Array} items - 物品列表
 * @param {number} maxDisplay - 最大显示数量
 * @returns {Array} 格式化后的文本行数组
 */
function formatItemListForTooltip(items, maxDisplay) {
    if (maxDisplay === undefined) maxDisplay = 5;
    if (!items || items.length === 0) {
        return ['§7item bag is empty'];
    }
    
    var tooltipResult = [];
    
    if (items.length <= maxDisplay) {
        // 全部显示
        tooltipResult.push('§7contains items:');
        items.forEach(function(item) {
            tooltipResult.push(" §8• §7" + item);
        });
    } else {
        // 显示前maxDisplay项，然后显示剩余数量
        tooltipResult.push('§7contains items (formerly' + maxDisplay + 'item):');
        for (var i = 0; i < maxDisplay; i++) {
            tooltipResult.push(" §8• §7" + items[i]);
        }
        tooltipResult.push("§7...and" + (items.length - maxDisplay) + "item");
    }
    
    // 添加总计
    var totalCount = items.reduce(function(sum, item) {
        var match = item.match(/^(\d+)x/);
        return sum + (match ? parseInt(match[1]) : 1);
    }, 0);
    tooltipResult.push("§7Total: §e" + totalCount + "§7items, §e" + items.length + "§7types");
    
    return tooltipResult;
}

// ========== 256k物品包工具提示处理器 ==========

ItemEvents.tooltip(function(event) {
    event.addAdvanced(['ae2:portable_item_cell_256k'], function(item, advanced, text) {
        // 跳过已注册的特殊物品包（如无限染料元件包pro、超级AE包）
        // 这些已经有自己的工具提示
        var itemNbtData = item.nbt;
        if (itemNbtData && itemNbtData.display && itemNbtData.display.Name) {
            var displayNameJson = itemNbtData.display.Name;
            if (typeof displayNameJson === 'string') {
                if (displayNameJson.includes('unlimited dye component pack pro') || 
                    displayNameJson.includes('Super AE package') ||
                    displayNameJson.includes('Tianji gift package')) {
                    return;
                }
            }
        }
        
        // 解析物品包内容
        var cellItems = parseCellContent(item);
        
        if (cellItems.length === 0) {
            // 空物品包或无效物品包
            text.add('§8Empty 256k item package');
            text.add('§7is synthesized by the assembly machine and can store a variety of items');
            return;
        }
        
        // 根据Shift键状态决定显示详细程度
        if (event.shift) {
            // 按住Shift显示完整列表
            text.add('§6=== 256k item pack content ===');
            var formattedItemList = formatItemListForTooltip(cellItems, 20); // Shift时显示更多
            formattedItemList.forEach(function(line) { text.add(line); });
            text.add('§7§oRelease Shift to display a simple view');
        } else {
            // 默认显示简洁视图
            text.add('§6256k item pack');
            var formattedItemList = formatItemListForTooltip(cellItems, 5); // 默认显示5项
            formattedItemList.forEach(function(line) { text.add(line); });
            text.add('§7§oHold §eShift §7§oView full list');
        }
        
        // 添加通用说明
        text.add('§8synthesis method: assembly machine');
        text.add('§8Capacity: 256k (262,144 item types)');
    });
});

// ========== 256k物品包JEI集成API（客户端环境） ==========

// 只有在客户端环境且global对象可用时注册API
if (typeof global !== 'undefined') {
    // 如果CellAPI不存在，创建基本结构
    if (!global.CellAPI) {
        global.CellAPI = {};
    }
    
    // 添加JEI相关API
    global.CellAPI.registerJEIPreview = function(cellItemId, maxDisplay) {
        // 设置参数默认值（Rhino引擎不支持ES6默认参数语法）
        if (cellItemId === undefined) cellItemId = 'ae2:portable_item_cell_256k';
        if (maxDisplay === undefined) maxDisplay = 5;
        
        console.log('[256k Cell API - JEI] Registration Item Pack Preview:' + cellItemId + ', maximum display:' + maxDisplay);
        
        // 这里实际上已经通过上面的ItemEvents.tooltip全局处理了
        // 这个API主要用于记录配置
        if (!global._cellAPI_JEI_Config) {
            global._cellAPI_JEI_Config = {};
        }
        global._cellAPI_JEI_Config[cellItemId] = { maxDisplay: maxDisplay };
    };
    
    global.CellAPI.addCellDescription = function(cellItem, extraInfo) {
        if (!cellItem) return;
        
        var itemId = typeof cellItem === 'string' ? cellItem : cellItem.getId();
        console.log('[256k Cell API - JEI] Add item description:' + itemId);
        
        // 在实际环境中，我们需要在这里添加JEI描述
        // 但由于KubeJS的JEIEvents.addDescription需要在事件处理器中调用
        // 我们将信息存储起来，在合适的时机使用
        if (!global._cellAPI_JEI_Descriptions) {
            global._cellAPI_JEI_Descriptions = {};
        }
        
        var descriptions = Array.isArray(extraInfo) ? extraInfo : [extraInfo];
        global._cellAPI_JEI_Descriptions[itemId] = descriptions;
        
        // 调试日志：记录描述内容（截断以避免日志过长）
        if (descriptions.length > 0 && typeof descriptions[0] === 'string') {
            var preview = descriptions[0].substring(0, Math.min(50, descriptions[0].length));
            console.log('[CellAPI debugging] Description content preview: "' + preview + '" (length:' + descriptions[0].length + ')');
        }
        console.log('[CellAPI Debugging] Descriptions have been stored in _cellAPI_JEI_Descriptions[' + itemId + '], number of lines:' + descriptions.length);
    };
    
    // 自动注册默认预览
    global.CellAPI.registerJEIPreview('ae2:portable_item_cell_256k', 8);
    
    // 注册CellAPI描述到物品工具提示（由于JEIEvents.addDescription不可用）
    // 必须立即注册ItemEvents.tooltip，因为KubeJS要求事件处理器在脚本加载期间注册
    if (typeof ItemEvents !== 'undefined' && typeof ItemEvents.tooltip === 'function') {
        ItemEvents.tooltip(function(event) {
            // 检查是否有存储的CellAPI描述
            // 注意：即使global._cellAPI_JEI_Descriptions可能尚未初始化，但事件触发时应该已经存在
            if (global._cellAPI_JEI_Descriptions) {
                for (var itemId in global._cellAPI_JEI_Descriptions) {
                    if (global._cellAPI_JEI_Descriptions.hasOwnProperty(itemId)) {
                        // 使用闭包捕获当前itemId
                        (function(currentItemId) {
                            event.addAdvanced(currentItemId, function(item, advanced, text) {
                                var descriptions = global._cellAPI_JEI_Descriptions[currentItemId];
                                if (descriptions && descriptions.length > 0) {
                                    for (var i = 0; i < descriptions.length; i++) {
                                        var line = descriptions[i];
                                        // 支持 { inlineText: '...' } 格式
                                        if (line && line.inlineText && typeof ShanhaiText !== 'undefined' && ShanhaiText.inline) {
                                            var component = ShanhaiText.inline(line.inlineText);
                                            if (component) { text.add(component); continue; }
                                        }
                                        // 支持 { component: ... } 格式
                                        if (line && line.component) { text.add(line.component); continue; }
                                        // 支持普通字符串
                                        text.add(line);
                                    }
                                }
                            });
                        })(itemId);
                    }
                }
                console.log('[CellAPI-JEI] processed' + Object.keys(global._cellAPI_JEI_Descriptions).length + 'description of item');
            } else {
                // global._cellAPI_JEI_Descriptions尚未初始化，这应该发生在脚本初始化顺序错误时
                console.log('[CellAPI-JEI] Tip: global._cellAPI_JEI_Descriptions has not been initialized yet, maybe the description will be added later');
            }
        });
        console.log('[CellAPI-JEI] Tooltip handler registered (immediately)');
    } else {
        console.warn('[CellAPI-JEI] Warning: ItemEvents.tooltip is not available, CellAPI description cannot be displayed');
    }
    
    console.log('[256k Cell API - JEI] JEI integration function loaded');
}

// ========== ShanhaiText 检测 ==========
try {
    if (typeof ShanhaiText !== 'undefined') {
        var testComp = ShanhaiText.ultimateRainbow('mountains and sea');
        console.log('[Mountain and Sea Dynamic Text] ShanhaiText is available! ultimateRainbow return type:' + (typeof testComp));
    } else {
        console.warn('[Shanhai Dynamic Text] ShanhaiText is undefined! Check GTDishanhaiKubeJSPlugin registration');
    }
} catch(e) {
    console.error('[Shanhai dynamic text] ShanhaiText exception:' + e);
}

// ========== 动态文本API集成（客户端环境） ==========

// 只有在客户端环境且global对象可用时注册动态文本API
if (typeof global !== 'undefined') {
    // 如果山海颜色API不存在，创建基本结构
    if (!global.shanhaiColorAPI) {
        global.shanhaiColorAPI = {};
    }
    
    /**
     * 获取TextUtil渐变文本（客户端版本）
     * 在客户端环境中使用LDLib的TextUtil类生成预定义的渐变样式文本。
     * 如果TextUtil不可用，则使用基本颜色模拟效果。
     * 
     * @function getTextUtilGradient
     * @memberof shanhaiColorAPI
     * @param {string} text - 要处理的文本
     * @param {string} style - 渐变样式名称
     * @returns {string} 渐变文本
     * @example
     * // 使用TextUtil.full_color样式
     * let gradient = global.shanhaiColorAPI.getTextUtilGradient("Generated by CellAPI, display generated by JEIcellAPI", "ultimateRainbow");
     * console.log(gradient); // 输出: 彩色渐变文本
     */
    global.shanhaiColorAPI.getTextUtilGradient = function(text, style) {
        // 防御性编程：确保输入有效
        if (typeof text !== 'string') {
            console.error('[Shan Hai Private Product-Client] getTextUtilGradient: The text must be a string, use the default text');
            text = 'Invalid text';
        }
        
        if (typeof style !== 'string') {
            console.error('[Shanhai private goods-client] getTextUtilGradient: The style must be a string, use the default style');
            style = 'ultimateRainbow';
        }

        console.log('[山海RGB] call style=' + style + ' text="' + text.substring(0, Math.min(25, text.length)) + '..."');

        // 1. RGB 色板优先渲染（支持逐帧动态 Component，覆盖所有自定义样式）
        try {
            if (typeof Component !== 'undefined' && typeof Component.literal === 'function') {
                if (!global.shanhaiColorAPI._rgbPalettes) {
                    console.log('[Shanhai RGB] _rgbPalettes does not exist, initialized (including body color palette)');
                    global.shanhaiColorAPI._rgbPalettes = {
                        custom:   [0xFF3333,0xFF4A22,0xFF6011,0xFF7700,0xFF8E00,0xFFA400,0xFFBB00,0xFFCC17,0xFFDD2D,0xFFEE44,0xE3F444,0xC6F944,0xAAFF44,0x88FF44,0x66FF44,0x44FF44,0x44FF66,0x44FF88,0x44FFAA,0x44F4C6,0x44E8E3,0x44DDFF,0x44C1FF,0x44A4FF,0x4488FF,0x5571FF,0x665BFF,0x7744FF,0x8E44FF,0xA444FF,0xBB44FF,0xD244FF,0xE844FF,0xFF44FF,0xFF4FE8,0xFF5BD2,0xFF66BB,0xFF71AA,0xFF7D99,0xFF8888],
                        rainbow:  [0xFF3333,0xFF4F22,0xFF6C11,0xFF8800,0xFF9F00,0xFFB500,0xFFCC00,0xBBD211,0x77D722,0x33DD33,0x33DD6C,0x33DDA4,0x33DDDD,0x33B5E8,0x338EF4,0x3366FF,0x6655F4,0x9944E8,0xCC33DD],
                        golden:   [0x995500,0xAA6600,0xBB7700,0xCC8800,0xDD9300,0xEE9F00,0xFFAA00,0xFFBB17,0xFFCC2D,0xFFDD44,0xFFE85B,0xFFF471,0xFFFF88,0xFFFF9F,0xFFFFB5,0xFFFFCC,0xFFFFB5,0xFFFF9F,0xFFFF88,0xFFF471,0xFFE85B,0xFFDD44,0xFFCC2D,0xFFBB17,0xFFAA00,0xEE9F00,0xDD9300,0xCC8800,0xBB7700,0xAA6600,0x995500],
                        fire:     [0x992200,0xA42800,0xB02D00,0xBB3300,0xC63900,0xD23E00,0xDD4400,0xE84F00,0xF45B00,0xFF6600,0xFF7D00,0xFF9300,0xFFAA00,0xFFC11C,0xFFD739,0xFFEE55,0xFFF48E,0xFFF9C6,0xFFFFFF,0xFFF9C6,0xFFF48E,0xFFEE55,0xFFD739,0xFFC11C,0xFFAA00,0xFF9300,0xFF7D00,0xFF6600,0xF45B00,0xE84F00,0xDD4400,0xD23E00,0xC63900,0xBB3300,0xB02D00,0xA42800,0x992200],
                        water:    [0x004488,0x004F93,0x005B9F,0x0066AA,0x1177BB,0x2288CC,0x3399DD,0x44AAE8,0x55BBF4,0x66CCFF,0x7DD7FF,0x93E3FF,0xAAEEFF,0xC6F4FF,0xE3F9FF,0xFFFFFF,0xE3F9FF,0xC6F4FF,0xAAEEFF,0x93E3FF,0x7DD7FF,0x66CCFF,0x55BBF4,0x44AAE8,0x3399DD,0x2288CC,0x1177BB,0x0066AA,0x005B9F,0x004F93,0x004488],
                        magic:    [0x550088,0x600099,0x6C00AA,0x7700BB,0x8217C6,0x8E2DD2,0x9944DD,0xA44FE3,0xB05BE8,0xBB66EE,0xC671F4,0xD27DF9,0xDD88FF,0xE888FF,0xF488FF,0xFF88FF,0xF488FF,0xE888FF,0xDD88FF,0xD27DF9,0xC671F4,0xBB66EE,0xB05BE8,0xA44FE3,0x9944DD,0x8E2DD2,0x8217C6,0x7700BB,0x6C00AA,0x600099,0x550088],
                        nature:   [0x006633,0x0B7739,0x17883E,0x229944,0x2DAA44,0x39BB44,0x44CC44,0x5BD244,0x71D744,0x88DD44,0xA4E84A,0xC1F44F,0xDDFF55,0xC1F44F,0xA4E84A,0x88DD44,0x71D744,0x5BD244,0x44CC44,0x39BB44,0x2DAA44,0x229944,0x17883E,0x0B7739,0x006633],
                        electric: [0xFFDD00,0xC1DD55,0x82DDAA,0x44DDFF,0x82E8FF,0xC1F4FF,0xFFFFFF,0xC1F4FF,0x82E8FF,0x44DDFF,0x82DDAA,0xC1DD55,0xFFDD00],
                        ice:      [0x003366,0x0B4488,0x1755AA,0x2266CC,0x2D77D7,0x3988E3,0x4499EE,0x5BAAF4,0x71BBF9,0x88CCFF,0xB0DDFF,0xD7EEFF,0xFFFFFF,0xD7EEFF,0xB0DDFF,0x88CCFF,0x71BBF9,0x5BAAF4,0x4499EE,0x3988E3,0x2D77D7,0x2266CC,0x1755AA,0x0B4488,0x003366],
                        lava:     [0x771100,0x881700,0x991C00,0xAA2200,0xBB2D00,0xCC3900,0xDD4400,0xE84F00,0xF45B00,0xFF6600,0xFF7D00,0xFF9300,0xFFAA00,0xFFBB17,0xFFCC2D,0xFFDD44,0xFFE882,0xFFF4C1,0xFFFFFF,0xFFEEBB,0xFFDD77,0xFFCC33,0xFFB522,0xFF9F11,0xFF8800,0xF47100,0xE85B00,0xDD4400,0xC13300,0xA42200,0x881100],
                        sunset:   [0xCC4400,0xE05511,0xF06622,0xFF7733,0xFF8844,0xFF7766,0xFF6688,0xFF55AA,0xFF44BB,0xDD55CC,0xBB55DD,0x9955EE,0x7744FF,0x9955EE,0xBB55DD,0xDD55CC,0xFF44BB,0xFF55AA,0xFF6688,0xFF7766,0xFF8844,0xFF7733,0xF06622,0xE05511,0xCC4400],
                        aurora:   [0x33FF44,0x33EE55,0x33DD66,0x33CC77,0x33BB88,0x33AA99,0x3399BB,0x3388CC,0x4477DD,0x5566EE,0x7755FF,0x9944FF,0xBB33FF,0x9944FF,0x7755FF,0x5566EE,0x4477DD,0x3388CC,0x3399BB,0x33AA99,0x33BB88,0x33CC77,0x33DD66,0x33EE55,0x33FF44],
                        crimson:  [0x991111,0xAA1111,0xBB1111,0xCC1111,0xDD2222,0xEE3333,0xFF4444,0xFF5555,0xFF6666,0xFF5555,0xFF4444,0xEE3333,0xDD2222,0xCC1111,0xBB1111,0xAA1111,0x991111],
                        neon:     [0xFF33FF,0xFF55CC,0xFF7799,0xFFAA66,0xFFCC44,0xAAFF33,0x77FF44,0x44FF77,0x33FFBB,0x33FFEE,0xFFFFFF,0x33FFEE,0x33FFBB,0x44FF77,0x77FF44,0xAAFF33,0xFFCC44,0xFFAA66,0xFF7799,0xFF55CC,0xFF33FF],
                        sakura:   [0xFF99BB,0xFFA3C4,0xFFADCC,0xFFB7D4,0xFFC1DD,0xFFCBE5,0xFFD5ED,0xFFDFF0,0xFFEFF8,0xFFFFFF,0xFFEFF8,0xFFDFF0,0xFFD5ED,0xFFCBE5,0xFFC1DD,0xFFB7D4,0xFFADCC,0xFFA3C4,0xFF99BB],

                        // ===== 正文柔和色板（去饱和，适合大段正文显示） =====
                        body_golden:  [0x887744,0x998855,0xAA9966,0xBBAA77,0xCCBB88,0xDDCC99,0xCCBB88,0xBBAA77,0xAA9966,0x998855,0x887744],
                        body_fire:    [0x885522,0x996633,0xAA7744,0xBB8855,0xCC9966,0xBB8855,0xAA7744,0x996633,0x885522],
                        body_water:   [0x446688,0x557799,0x6688AA,0x7799BB,0x88AACC,0x7799BB,0x6688AA,0x557799,0x446688],
                        body_magic:   [0x775588,0x886699,0x9977AA,0xAA88BB,0xBB99CC,0xAA88BB,0x9977AA,0x886699,0x775588],
                        body_nature:  [0x557755,0x668866,0x779977,0x88AA88,0x99BB99,0x88AA88,0x779977,0x668866,0x557755],
                        body_crimson: [0x883333,0x994444,0xAA5555,0xBB6666,0xCC7777,0xBB6666,0xAA5555,0x994444,0x883333],
                        body_silver:  [0xFFFFFF,0xEEEEEE,0xCCCCCC,0xAAAAAA,0x888888,0x777777,0x888888,0xAAAAAA,0xCCCCCC,0xEEEEEE,0xFFFFFF],
                    };
                }
                console.log('[山海RGB] _rgbPalettes already exists, body_silver=' + (typeof global.shanhaiColorAPI._rgbPalettes.body_silver) + 'pool query style="' + style + '"=' + (typeof global.shanhaiColorAPI._rgbPalettes[style]));
                // global 持久化导致 reload 后 _rgbPalettes 已存在，body 色板单独补充
                if (global.shanhaiColorAPI._rgbPalettes && !global.shanhaiColorAPI._rgbPalettes.body_silver) {
                    global.shanhaiColorAPI._rgbPalettes.body_golden  = [0x887744,0x998855,0xAA9966,0xBBAA77,0xCCBB88,0xDDCC99,0xCCBB88,0xBBAA77,0xAA9966,0x998855,0x887744];
                    global.shanhaiColorAPI._rgbPalettes.body_fire    = [0x885522,0x996633,0xAA7744,0xBB8855,0xCC9966,0xBB8855,0xAA7744,0x996633,0x885522];
                    global.shanhaiColorAPI._rgbPalettes.body_water   = [0x446688,0x557799,0x6688AA,0x7799BB,0x88AACC,0x7799BB,0x6688AA,0x557799,0x446688];
                    global.shanhaiColorAPI._rgbPalettes.body_magic   = [0x775588,0x886699,0x9977AA,0xAA88BB,0xBB99CC,0xAA88BB,0x9977AA,0x886699,0x775588];
                    global.shanhaiColorAPI._rgbPalettes.body_nature  = [0x557755,0x668866,0x779977,0x88AA88,0x99BB99,0x88AA88,0x779977,0x668866,0x557755];
                    global.shanhaiColorAPI._rgbPalettes.body_crimson = [0x883333,0x994444,0xAA5555,0xBB6666,0xCC7777,0xBB6666,0xAA5555,0x994444,0x883333];
                    global.shanhaiColorAPI._rgbPalettes.body_silver  = [0xFFFFFF,0xEEEEEE,0xCCCCCC,0xAAAAAA,0x888888,0x777777,0x888888,0xAAAAAA,0xCCCCCC,0xEEEEEE,0xFFFFFF];
                }
                // ultimateRainbow/ultimate 映射到 custom 色板（14色全色域）
                var _ps = style;
                if (_ps === 'ultimateRainbow' || _ps === 'ultimate') _ps = 'custom';
                var pool = global.shanhaiColorAPI._rgbPalettes[_ps];
                // 最终兜底：从本地变量硬编码 body 色板，绕开所有 global 持久化问题
                if (!pool && style.indexOf('body_') === 0) {
                    var _bf = {
                        body_golden:  [0x887744,0x998855,0xAA9966,0xBBAA77,0xCCBB88,0xDDCC99,0xCCBB88,0xBBAA77,0xAA9966,0x998855,0x887744],
                        body_fire:    [0x885522,0x996633,0xAA7744,0xBB8855,0xCC9966,0xBB8855,0xAA7744,0x996633,0x885522],
                        body_water:   [0x446688,0x557799,0x6688AA,0x7799BB,0x88AACC,0x7799BB,0x6688AA,0x557799,0x446688],
                        body_magic:   [0x775588,0x886699,0x9977AA,0xAA88BB,0xBB99CC,0xAA88BB,0x9977AA,0x886699,0x775588],
                        body_nature:  [0x557755,0x668866,0x779977,0x88AA88,0x99BB99,0x88AA88,0x779977,0x668866,0x557755],
                        body_crimson: [0x883333,0x994444,0xAA5555,0xBB6666,0xCC7777,0xBB6666,0xAA5555,0x994444,0x883333],
                        body_silver:  [0xFFFFFF,0xEEEEEE,0xCCCCCC,0xAAAAAA,0x888888,0x777777,0x888888,0xAAAAAA,0xCCCCCC,0xEEEEEE,0xFFFFFF],
                    };
                    pool = _bf[style];
                    if (pool && global.shanhaiColorAPI._rgbPalettes) global.shanhaiColorAPI._rgbPalettes[style] = pool;
                }
                console.log('[山海RGB] pool=' + (typeof pool) + (pool ? ' len=' + pool.length : ''));
                if (pool) {
                    // Style.builder().withColor(TextColor).build() — Builder.withColor 无 ChatFormatting 重载
                    var _st = Java.loadClass('net.minecraft.network.chat.Style');
                    var _tc = Java.loadClass('net.minecraft.network.chat.TextColor');
                    var _speed = style.indexOf('body_') === 0 ? 200 : 80;
                    var _rawPhase = Date.now() / _speed;
                    var _intPhase = Math.floor(_rawPhase);
                    var _frac = _rawPhase - _intPhase;
                    var _result = null;
                    for (var _i = 0; _i < text.length; _i++) {
                        var _idx1 = (_intPhase + _i) % pool.length;
                        if (_idx1 < 0) _idx1 += pool.length;
                        var _idx2 = (_idx1 + 1) % pool.length;
                        var _c1 = pool[_idx1], _c2 = pool[_idx2];
                        var _r = Math.round(((_c1 >> 16) & 0xFF) * (1 - _frac) + ((_c2 >> 16) & 0xFF) * _frac);
                        var _g = Math.round(((_c1 >> 8) & 0xFF) * (1 - _frac) + ((_c2 >> 8) & 0xFF) * _frac);
                        var _b = Math.round((_c1 & 0xFF) * (1 - _frac) + (_c2 & 0xFF) * _frac);
                        var _style = _st.builder().withColor(_tc.fromRgb((_r << 16) | (_g << 8) | _b)).build();
                        var _part = Component.literal(text.charAt(_i)).withStyle(_style);
                        if (_result === null) _result = _part;
                        else _result.append(_part);
                    }
                    if (_result !== null) return _result;
                }
            }
        } catch (e) { console.warn('[山海] Client-side RGB rendering failed:' + (e.message || e)); }

        // body_ 样式禁止进入 TextUtil 兜底（未知样式会落到 ultimateRainbow = LDB 彩虹）
        if (style.indexOf('body_') === 0) { return null; }
        console.log('[山海RGB] RGB color palette miss style="' + style + '", go into TextUtil');
        // 3. TextUtil 兜底（仅当 RGB 色板无该样式时）
        if (typeof TextUtil !== 'undefined') {
            // 根据原始实现：Component.literal(TextUtil.full_color(text))
            // 检查Component是否可用
            if (typeof Component !== 'undefined' && typeof Component.literal === 'function') {
                // 使用Component.literal包装TextUtil结果 - 这是保持动态效果的关键
                if (style === 'dark_purplish_red' && typeof TextUtil.dark_purplish_red === 'function') return Component.literal(TextUtil.dark_purplish_red(text));
                else if (style === 'white_blue' && typeof TextUtil.white_blue === 'function') return Component.literal(TextUtil.white_blue(text));
                else if (style === 'purplish_red' && typeof TextUtil.purplish_red === 'function') return Component.literal(TextUtil.purplish_red(text));
                else if (style === 'golden' && typeof TextUtil.golden === 'function') return Component.literal(TextUtil.golden(text));
                else if (style === 'dark_green' && typeof TextUtil.dark_green === 'function') return Component.literal(TextUtil.dark_green(text));
                
                // TextUtil扩展样式（如果可用）
                else if (style === 'rainbow' && typeof TextUtil.rainbow === 'function') return Component.literal(TextUtil.rainbow(text));
                else if (style === 'fire' && typeof TextUtil.fire === 'function') return Component.literal(TextUtil.fire(text));
                else if (style === 'water' && typeof TextUtil.water === 'function') return Component.literal(TextUtil.water(text));
                else if (style === 'nature' && typeof TextUtil.nature === 'function') return Component.literal(TextUtil.nature(text));
                else if (style === 'ice' && typeof TextUtil.ice === 'function') return Component.literal(TextUtil.ice(text));
                else if (style === 'lava' && typeof TextUtil.lava === 'function') return Component.literal(TextUtil.lava(text));
                else if (style === 'magic' && typeof TextUtil.magic === 'function') return Component.literal(TextUtil.magic(text));
                else if (style === 'electric' && typeof TextUtil.electric === 'function') return Component.literal(TextUtil.electric(text));
                
                // 如果样式不被识别，使用默认渐变
                else {
                    console.warn('[Shanhai private goods-client] getTextUtilGradient: unknown style "' + style + '", use the default full_color');
                    if (typeof TextUtil.full_color === 'function') {
                        return Component.literal(TextUtil.full_color(text));
                    } else {
                        // TextUtil.full_color不可用，继续执行备用方案
                        console.warn('[Shan Hai Private Product-Client] getTextUtilGradient: TextUtil.full_color is not available, use an alternative solution');
                    }
                }
            } else {
                // Component不可用，直接返回TextUtil的结果（可能是字符串、对象、函数等）
                // 让调用者决定如何处理
                console.warn('[Shanhai private goods-client] getTextUtilGradient: Component is not available, directly returns the TextUtil result');
                if (style === 'dark_purplish_red' && typeof TextUtil.dark_purplish_red === 'function') return TextUtil.dark_purplish_red(text);
                else if (style === 'white_blue' && typeof TextUtil.white_blue === 'function') return TextUtil.white_blue(text);
                else if (style === 'purplish_red' && typeof TextUtil.purplish_red === 'function') return TextUtil.purplish_red(text);
                else if (style === 'golden' && typeof TextUtil.golden === 'function') return TextUtil.golden(text);
                else if (style === 'dark_green' && typeof TextUtil.dark_green === 'function') return TextUtil.dark_green(text);
                
                // TextUtil扩展样式（如果可用）
                else if (style === 'rainbow' && typeof TextUtil.rainbow === 'function') return TextUtil.rainbow(text);
                else if (style === 'fire' && typeof TextUtil.fire === 'function') return TextUtil.fire(text);
                else if (style === 'water' && typeof TextUtil.water === 'function') return TextUtil.water(text);
                else if (style === 'nature' && typeof TextUtil.nature === 'function') return TextUtil.nature(text);
                else if (style === 'ice' && typeof TextUtil.ice === 'function') return TextUtil.ice(text);
                else if (style === 'lava' && typeof TextUtil.lava === 'function') return TextUtil.lava(text);
                else if (style === 'magic' && typeof TextUtil.magic === 'function') return TextUtil.magic(text);
                else if (style === 'electric' && typeof TextUtil.electric === 'function') return TextUtil.electric(text);
                
                // 如果样式不被识别，使用默认渐变
                else {
                    console.warn('[Shanhai private goods-client] getTextUtilGradient: unknown style "' + style + '", use the default full_color');
                    if (typeof TextUtil.full_color === 'function') {
                        return TextUtil.full_color(text);
                    } else {
                        // 继续执行下面的备用方案
                    }
                }
            }
        }

        // 4. § 兜底（RGB 色板和 TextUtil 都不可用或不支持该样式）
        console.warn('[Shanhai private goods-client] getTextUtilGradient: TextUtil is not available, use basic colors to simulate the effect');
        
        var colors = [];
        switch (style) {
            case 'ultimateRainbow':
            case 'rainbow':
                colors = ['§c', '§6', '§e', '§a', '§b', '§9', '§d'];
                break;
            case 'dark_purplish_red':
                colors = ['§4', '§5', '§4'];
                break;
            case 'white_blue':
                colors = ['§f', '§b', '§f'];
                break;
            case 'purplish_red':
                colors = ['§d', '§5', '§d'];
                break;
            case 'golden':
                colors = ['§6', '§e', '§6'];
                break;
            case 'dark_green':
                colors = ['§2', '§a', '§2'];
                break;
            case 'fire':
                colors = ['§c', '§6', '§c'];
                break;
            case 'water':
                colors = ['§b', '§9', '§b'];
                break;
            case 'nature':
                colors = ['§a', '§2', '§a'];
                break;
            case 'ice':
                colors = ['§b', '§f', '§b'];
                break;
            case 'lava':
                colors = ['§c', '§6', '§e'];
                break;
            case 'magic':
                colors = ['§5', '§d', '§5'];
                break;
            case 'electric':
                colors = ['§e', '§b', '§e'];
                break;
            // 基础颜色样式
            case 'red':
                colors = ['§c'];
                break;
            case 'green':
                colors = ['§a'];
                break;
            case 'blue':
                colors = ['§9'];
                break;
            case 'yellow':
                colors = ['§e'];
                break;
            case 'purple':
                colors = ['§5'];
                break;
            case 'cyan':
                colors = ['§b'];
                break;
            case 'orange':
                colors = ['§6'];
                break;
            case 'pink':
                colors = ['§d'];
                break;
            case 'white':
                colors = ['§f'];
                break;
            case 'gray':
                colors = ['§7'];
                break;
            default:
                colors = ['§a', '§b', '§c', '§d', '§e', '§f'];
        }
        
        // 生成渐变效果
        var result = "";
        var length = text.length;
        for (var i = 0; i < length; i++) {
            var colorIndex = i % colors.length;
            result += colors[colorIndex] + text[i];
        }
        
        return result + "§r";
    };

    /**
     * 获取正文柔和渐变文本（慢速动画 + 去饱和色板）
     * 适合大段正文显示的动态颜色，不刺眼
     *
     * @function getBodyGradient
     * @memberof shanhaiColorAPI
     * @param {string} text - 要着色的文本
     * @param {string} style - 样式名（golden/water/fire/magic/nature/crimson/silver）
     * @returns {Component|null} 渐变 Component 或 null
     * @example
     * global.shanhaiColorAPI.getBodyGradient("a text description", "golden");
     */
    global.shanhaiColorAPI.getBodyGradient = function(text, style) {
        if (typeof text !== 'string') { console.error('[山海] getBodyGradient: Invalid text'); return null; }
        if (typeof style !== 'string') style = 'silver';
        return this.getTextUtilGradient(text, 'body_' + style);
    };

    /**
     * 获取预生成的动态Lore文本
     * 从全局变量中获取在启动阶段预生成的动态文本
     * 
     * @function getDynamicLoreText
     * @memberof shanhaiColorAPI
     * @returns {string} 预生成的动态文本或默认文本
     */
    global.shanhaiColorAPI.getDynamicLoreText = function() {
        // 尝试获取预生成的动态文本
        if (typeof global.shanhaiDynamicLoreText !== 'undefined') {
            return global.shanhaiDynamicLoreText;
        }
        
        // 如果预生成的文本不存在，使用基本颜色模拟
        console.warn('[Shanhai private goods-client] getDynamicLoreText: The pre-generated dynamic text does not exist, use an alternative solution');
        return this.getTextUtilGradient("Generated by CellAPI, display generated by JEIcellAPI", "ultimateRainbow");
    };
    
    /**
     * 获取会话随机单色文本（客户端版本）
     * 每次客户端重新加载后，为每个字符随机挑选不同的鲜艳颜色
     * 
     * @function getSessionRandomSingleColorText
     * @memberof shanhaiColorAPI
     * @param {string} text - 要着色的文本
     * @returns {string} 彩色文本字符串
     */
    global.shanhaiColorAPI.getSessionRandomSingleColorText = function(text) {
        // 防御性编程
        if (typeof text !== 'string' || text.length === 0) {
            console.error('[Shanhai private goods-client] getSessionRandomSingleColorText: Invalid text');
            return "§7text is invalid";
        }
        
        // 鲜艳颜色池（排除深色和灰色）
        var brightColors = [
            '§c', // 红色
            '§6', // 橙色
            '§e', // 黄色
            '§a', // 绿色
            '§b', // 青色
            '§9', // 蓝色
            '§d', // 粉色
            '§5', // 紫色
            '§3', // 深青色
            '§2', // 深绿色
            '§4', // 深红色
            '§1'  // 深蓝色
        ];
        
        // 使用当前时间戳作为随机种子，确保每次客户端重新加载时颜色相同
        // 但同一会话内不同字符使用不同颜色
        var timestamp = Date.now();
        var result = "";
        
        for (var i = 0; i < text.length; i++) {
            // 基于时间戳和字符位置生成确定性随机颜色索引
            var pseudoRandom = (timestamp * (i + 1)) % brightColors.length;
            var colorIndex = Math.floor(pseudoRandom) % brightColors.length;
            result += brightColors[colorIndex] + text[i];
        }
        
        result += "§r"; // 重置颜色
        return result;
    };
    
    /**
     * 检查TextUtil是否可用
     * 
     * @function isTextUtilAvailable
     * @memberof shanhaiColorAPI
     * @returns {boolean} TextUtil是否可用
     */
    
    // ========== DShanhaiTextUtil 动态文本绑定 ==========
    (function() {

// batch addLore helper


        var _dtu = null;
        try {
            _dtu = DShanhaiTextUtil;
            if (_dtu) {
                console.log('[Dynamic text of mountains and seas] DShanhaiTextUtil has been loaded');
            } else {
                console.warn('[Shanhai dynamic text] DShanhaiTextUtil is null');
            }
        } catch (e) {
            console.warn('[Shanhai Dynamic Text] DShanhaiTextUtil failed to load, use backup:', String(e));
        }
        function _reg(name, fn) { global.shanhaiColorAPI[name] = fn; }
        if (_dtu) {
            _reg('createRainbow', function(t) { return _dtu.createRainbowText(String(t)); });
            _reg('createGolden', function(t) { return _dtu.createGoldenText(String(t)); });
            _reg('createFire', function(t) { return _dtu.createFireText(String(t)); });
            _reg('createWater', function(t) { return _dtu.createWaterText(String(t)); });
            _reg('createMagic', function(t) { return _dtu.createMagicText(String(t)); });
            _reg('createNature', function(t) { return _dtu.createNatureText(String(t)); });
            _reg('createElectric', function(t) { return _dtu.createElectricText(String(t)); });
            _reg('createIce', function(t) { return _dtu.createIceText(String(t)); });
            _reg('createLava', function(t) { return _dtu.createLavaText(String(t)); });
            _reg('createObfuscatedRainbow', function(t) { return _dtu.createObfuscatedRainbow(String(t)); });
            _reg('wrapRainbow', function(c) { return c && c.copy ? _dtu.wrapRainbow(c) : c; });
            _reg('wrapGolden', function(c) { return c && c.copy ? _dtu.wrapGolden(c) : c; });
            _reg('wrapFire', function(c) { return c && c.copy ? _dtu.wrapFire(c) : c; });
            _reg('wrapWater', function(c) { return c && c.copy ? _dtu.wrapWater(c) : c; });
            _reg('wrapMagic', function(c) { return c && c.copy ? _dtu.wrapMagic(c) : c; });
            _reg('wrapNature', function(c) { return c && c.copy ? _dtu.wrapNature(c) : c; });
            _reg('wrapElectric', function(c) { return c && c.copy ? _dtu.wrapElectric(c) : c; });
            _reg('wrapIce', function(c) { return c && c.copy ? _dtu.wrapIce(c) : c; });
            _reg('wrapLava', function(c) { return c && c.copy ? _dtu.wrapLava(c) : c; });
            console.log('[Shanhai Dynamic Text] DShanhaiTextUtil has been bound to shanhaiColorAPI');
        } else {
            _reg('createRainbow', function(t) { return "§c" + t; });
            _reg('createGolden', function(t) { return "§6" + t; });
            _reg('createFire', function(t) { return "§c" + t; });
            _reg('createWater', function(t) { return "§b" + t; });
            _reg('createMagic', function(t) { return "§d" + t; });
            _reg('createNature', function(t) { return "§a" + t; });
            _reg('createElectric', function(t) { return "§e" + t; });
            _reg('createIce', function(t) { return "§b" + t; });
            _reg('createLava', function(t) { return "§6" + t; });
            _reg('createObfuscatedRainbow', function(t) { return "§k§c" + t; });
        }
    })();

    /**
     * 检查 TextUtil 是否可用
global.shanhaiColorAPI.isTextUtilAvailable = function() {
        return typeof TextUtil !== 'undefined';
    };
    
    /**
     * 获取可用的TextUtil样式列表
     * 
     * @function getAvailableTextUtilStyles
     * @memberof shanhaiColorAPI
     * @returns {string[]} 可用样式名称数组
     */
    global.shanhaiColorAPI.getAvailableTextUtilStyles = function() {
        if (typeof TextUtil === 'undefined') {
            return ['ultimateRainbow', 'rainbow', 'fire', 'water', 'nature', 'ice', 'lava', 'magic', 'electric'];
        }
        
        var styles = [];
        if (typeof TextUtil.full_color === 'function') styles.push('ultimateRainbow');
        if (typeof TextUtil.dark_purplish_red === 'function') styles.push('dark_purplish_red');
        if (typeof TextUtil.white_blue === 'function') styles.push('white_blue');
        if (typeof TextUtil.purplish_red === 'function') styles.push('purplish_red');
        if (typeof TextUtil.golden === 'function') styles.push('golden');
        if (typeof TextUtil.dark_green === 'function') styles.push('dark_green');
        if (typeof TextUtil.rainbow === 'function') styles.push('rainbow');
        if (typeof TextUtil.fire === 'function') styles.push('fire');
        if (typeof TextUtil.water === 'function') styles.push('water');
        if (typeof TextUtil.nature === 'function') styles.push('nature');
        if (typeof TextUtil.ice === 'function') styles.push('ice');
        if (typeof TextUtil.lava === 'function') styles.push('lava');
        if (typeof TextUtil.magic === 'function') styles.push('magic');
        if (typeof TextUtil.electric === 'function') styles.push('electric');
        
        return styles;
    };
    
    console.log('[Shan Hai Private Goods-Client] Dynamic text API has been loaded');
    
    // 客户端预生成动态文本（确保客户端有自己的副本）
    try {
        // 如果全局变量不存在，预生成一个
        if (typeof global.shanhaiDynamicLoreText === 'undefined') {
            // 尝试使用TextUtil（如果可用）
            if (typeof TextUtil !== 'undefined' && typeof TextUtil.full_color === 'function') {
                global.shanhaiDynamicLoreText = TextUtil.full_color("Generated by CellAPI, display generated by JEIcellAPI");
                console.log('[Shanhai private goods-client] TextUtil.full_color has been used to pre-generate dynamic Lore text');
            } else {
                // 备用：手动生成彩虹文本
                var text = "Generated by CellAPI, display generated by JEIcellAPI";
                var colors = ['§c','§6','§e','§a','§b','§9','§d'];
                var result = "";
                for (var i = 0; i < text.length; i++) {
                    result += colors[i % colors.length] + text[i];
                }
                global.shanhaiDynamicLoreText = result + "§r";
                console.log('[Shan Hai Private Product-Client] TextUtil is not available, use an alternative solution to pre-generate dynamic Lore text');
            }
        }
    } catch (e) {
        console.error('[Shanhai private goods-client] Failed to pre-generate dynamic Lore text:' + e);
        global.shanhaiDynamicLoreText = "§7is generated by CellAPI, and the display is generated by JEIcellAPI";
    }

    // 为256k便携物品单元添加动态颜色描述
    if (typeof global.CellAPI !== 'undefined' && typeof global.CellAPI.addCellDescription === 'function') {
        console.log('[Shanhai Private Goods-Client] Started generating dynamic color descriptions for 256k portable item units...');
        
        // 使用 ShanhaiText.inline 处理内联动态文本
        var descriptionComponent;
        if (typeof ShanhaiText !== 'undefined' && typeof ShanhaiText.inline === 'function') {
            console.log('[Shanhai Private Product-Client] Use ShanhaiText.inline() to process inline text');
            descriptionComponent = ShanhaiText.inline('{ultimate} is generated by CellAPI, and JEI display is generated by JEICellAPI{/}');
            console.log('[Shan Hai Private Goods-Client] ShanhaiText.inline return type:' + typeof descriptionComponent);
        } else {
            // 备用：使用预生成的动态文本或普通文本
            console.log('[Shanhai Private Goods-Client] ShanhaiText.inline is unavailable, use an alternative solution');
            descriptionComponent = global.shanhaiDynamicLoreText || "§7is generated by CellAPI, JEI display is generated by JEICellAPI";
        }
        
        global.CellAPI.addCellDescription('ae2:portable_item_cell_256k', [
            { inlineText: '{ultimate} is generated by CellAPI, and JEI display is generated by JEICellAPI{/}' }
        ]);
        console.log('[Shan Hai Private Goods-Client] Dynamic color descriptions have been added to 256k portable item units');
    } else {
        console.warn('[Shan Hai Private Goods-Client] Warning: global.CellAPI or addCellDescription is not available');
    }
}

})();

// ===== 动态文本 API 客户端测试 =====
(function() {
var DShanhaiItemTooltipAPI = Java.loadClass('com.dishanhai.gt_shanhai.api.DShanhaiItemTooltipAPI');
var registerAltLinesStringArrays = DShanhaiItemTooltipAPI['registerAltLines(java.lang.String,java.lang.String[],java.lang.String[])'];

// batch addLore helper
function addLore(textList, lines) {
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        try {
            if (line.component) { textList.add(line.component); continue; }
            if (line.inlineText && typeof ShanhaiText !== 'undefined' && ShanhaiText.inline) {
                var _c = ShanhaiText.inline(line.inlineText);
                if (_c) { textList.add(_c); continue; }
            }
            if (line.style && typeof ShanhaiText !== 'undefined' && ShanhaiText.styled) {
                var _c = ShanhaiText.styled(line.text, line.style);
                if (_c) { textList.add(_c); continue; }
            }
            if (line.bodyStyle && typeof ShanhaiText !== 'undefined' && ShanhaiText.body) {
                var _c = ShanhaiText.body(line.text, line.bodyStyle);
                if (_c) { textList.add(_c); continue; }
            }
        } catch(e) {}
        textList.add(Component.literal((line.bodyStyle ? '§7' : '') + (line.text || '')));
    }
}

    console.log('[Shanhai Dynamic Text] === Client test begins ===');

    // 1. 检查 ShanhaiText API
    if (typeof ShanhaiText !== 'undefined') {
        console.log('[Shanhai Dynamic Text] ShanhaiText is available!');
        var methods = ['ultimateRainbow','rainbow','obfuscatedRainbow','golden','fire','water','magic','nature','electric','ice','lava','custom'];
        for (var i = 0; i < methods.length; i++) {
            try {
                var result = ShanhaiText[methods[i]]('test');
                console.log('[Mountain and Sea Dynamic Text] ShanhaiText.' + methods[i] + '() → type:' + (typeof result));
            } catch(e) {
                console.warn('[Mountain and Sea Dynamic Text] ShanhaiText.' + methods[i] + '() fail:' + String(e));
            }
        }
    } else {
        console.warn('[Shanhai Dynamic Text] ShanhaiText is not available (client)');
    }

    // 2. 检查 DShanhaiTextUtil
    if (typeof DShanhaiTextUtil !== 'undefined') {
        console.log('[Shanhai Dynamic Text] DShanhaiTextUtil has been loaded!');
        var utilMethods = ['createRainbowText','createGoldenText','createFireText','createWaterText','createMagicText','createNatureText','createElectricText','createIceText','createLavaText','createUltimateRainbow'];
        for (var i = 0; i < utilMethods.length; i++) {
            try {
                var result = DShanhaiTextUtil[utilMethods[i]]('test');
                console.log('[Dynamic text of mountains and seas] DShanhaiTextUtil.' + utilMethods[i] + '() → type:' + (typeof result));
            } catch(e) {
                console.warn('[Dynamic text of mountains and seas] DShanhaiTextUtil.' + utilMethods[i] + '() fail:' + String(e));
            }
        }
    } else {
        console.warn('[Shanhai Dynamic Text] DShanhaiTextUtil is not available (client)');
    }

    // 3. 在测试物品上显示动态 tooltip
    ItemEvents.tooltip(function(e) {
        e.addAdvanced('dishanhai:test_dynamic_text', function(item, _, text) {
            text.clear();
            if (typeof ShanhaiText !== 'undefined') {
                text.add(ShanhaiText.ultimateRainbow('§lMountain and sea dynamic rainbow'));
                text.add(ShanhaiText.golden('Golden gradient test'));
                text.add(ShanhaiText.fire('Fire system test'));
                text.add(ShanhaiText.water('Water flow system test'));
                text.add(ShanhaiText.magic('Magic test'));
                text.add(ShanhaiText.nature('Natural system test'));
                text.add(ShanhaiText.electric('Electro-optical system test'));
                text.add(ShanhaiText.ice('Frost system test'));
                text.add(ShanhaiText.lava('Lava system test'));
                text.add(ShanhaiText.rainbow('Rainbow flash test'));
                text.add(ShanhaiText.obfuscatedRainbow('confusing rainbow'));
                // 新扩展样式（需重新编译 jar）
                try { if (typeof ShanhaiText.sunset === 'function') text.add(ShanhaiText.sunset('Sunset series test')); } catch(ex) {}
                try { if (typeof ShanhaiText.aurora === 'function') text.add(ShanhaiText.aurora('Aurora system test')); } catch(ex) {}
                try { if (typeof ShanhaiText.crimson === 'function') text.add(ShanhaiText.crimson('Scarlet test')); } catch(ex) {}
                try { if (typeof ShanhaiText.neon === 'function') text.add(ShanhaiText.neon('Neon system test')); } catch(ex) {}
                try { if (typeof ShanhaiText.sakura === 'function') text.add(ShanhaiText.sakura('Sakura series test')); } catch(ex) {}
                text.add(Component.literal('§8—— New RGB Color Palette ——'));
                try { if (typeof ShanhaiText.cosmic === 'function') text.add(ShanhaiText.cosmic('cosmic / cosmic nebula RGB')); } catch(ex) {}
                try { if (typeof ShanhaiText.voidText === 'function') text.add(ShanhaiText.voidText('void / void purple black RGB')); } catch(ex) {}
                try { if (typeof ShanhaiText.jade === 'function') text.add(ShanhaiText.jade('jade / jade green light RGB')); } catch(ex) {}
                try { if (typeof ShanhaiText.plasma === 'function') text.add(ShanhaiText.plasma('plasma / plasma glow RGB')); } catch(ex) {}
                try { if (typeof ShanhaiText.starlight === 'function') text.add(ShanhaiText.starlight('starlight / star platinum RGB')); } catch(ex) {}
                try { if (typeof ShanhaiText.abyss === 'function') text.add(ShanhaiText.abyss('abyss / Abyss Blu-ray RGB')); } catch(ex) {}
                text.add(Component.literal('§8—— New FCS dynamic effects ——'));
                try { if (typeof ShanhaiText.scan === 'function') text.add(ShanhaiText.scan('^ scan scanning effect', 'cosmic')); } catch(ex) {}
                try { if (typeof ShanhaiText.glitch === 'function') text.add(ShanhaiText.glitch('? glitch glitch effect', 'neon')); } catch(ex) {}
                try { if (typeof ShanhaiText.breatheFx === 'function') text.add(ShanhaiText.breatheFx('+ breathe breathing brightness', 'jade')); } catch(ex) {}
                try { if (typeof ShanhaiText.chase === 'function') text.add(ShanhaiText.chase('> chase light effect', 'starlight')); } catch(ex) {}
                try { if (typeof ShanhaiText.fcs === 'function') text.add(ShanhaiText.fcs('^+>', 'Combo: Sweep + Breathe + Chase', 'plasma')); } catch(ex) {}
                try { if (typeof ShanhaiText.inline === 'function') text.add(ShanhaiText.inline('{cosmic}inline cosmic{/}{body_silver} + {/}{plasma}inline plasma{/}')); } catch(ex) {}
            } else {
                text.add(Component.literal('§cShanhaiText is not available'));
            }
        });
    });




    // ===== 模块机器并行表 — Java 侧 Shift 显示 =====
    var primordialParallelTableLines = [
        '§7┌─ Improved items ────────────────────────────────┐',
        '§7│ §fNo items → §7Parallel: §f64 §7│',
        '§7│ §aEntry Material Module → §7Parallel: §b128 §7│',
        '§7│ §aBasic Material Module → §7Parallel: §b256 §7│',
        '§7│ §amaterial deduction module → §7Parallel: §b512 §7│',
        '§7│ §aVirtual Image Substance Module → §7Parallel: §b1,024 §7│',
        '§7│ §aTransmutation Matter Module → §7Parallel: §b1,024 §7│',
        '§7│ §aDark Star Matter Module → §7Parallel: §b4,096 §7│',
        '§7│ §aMaterial Recombination Module → §7Parallel: §b16,384 §7│',
        '§7│ §aImaginary Matter Module → §7Parallel: §b65,536 §7│',
        '§7│ §aZeroing material module → §7Parallel: §b524,288 §7│',
        '§7│ §aPeak Material Module → §7Parallel: §b1,048,576 §7│',
        '§7│ §aDimensional Upgraded Matter Module → §7Parallel: §b2,097,152 §7│',
        '§7│ §aUltra-limited substance module → §7Parallel: §b268,435,456 §7│',
        '§7│ §aChaotic Matter Module → §7Parallel: §b536,870,912 §7│',
        '§7│ §aEternal Matter Module → §7Parallel: §b2,147,483,647 §7│',
        '§7│ §aMatter Creation Module → §7Parallel: §d4.6e18 §7│',
        '§7│ §5Reality Anchor Module → §7Parallel: §d6.9e18 §7│',
        '§7│ §aFounding reality modification module → §7Parallel: §6§lUnlimited §7│',
        '§7│ §5World Line Fragment Series → Thread Multiplier Slot §7│',
        '§7│ §6Awakening×1/Resonance×4/Transition×16/Transcendence×64 §7│',
        '§7│ §6Integration×256/Normalization×1024/Judgment×4096 (Stackable) §7│',
        '§7│ §dUniversal Parallel Overlimit Device → Overlimit Mode (MAX Parallel) §7│',
        '§7└─────────────────────────────┘'
    ];

    DShanhaiItemTooltipAPI.registerShiftMany([
        'gt_shanhai:primordial_assembly_line_module',
        'gt_shanhai:primordial_matter_recombinator_core',
        'gt_shanhai:primordial_causal_weaving_matrix',
        'gt_shanhai:primordial_singularity_inversion_core',
        'gt_shanhai:primordial_world_fragments_collector',
        'gt_shanhai:taixu_smelting_furnace',
        'gt_shanhai:primordial_anti_entropy_condensation_core',
        'gt_shanhai:primordial_matter_caster',
        'gt_shanhai:primordial_divergence_generator',
        'gt_shanhai:primordial_chaotic_ephemeral_deconstruction_crystallization_furnace',
        'gt_shanhai:primordial_biological_core'
    ], primordialParallelTableLines, '§7§oPress and hold SHIFT to view detailed parallel tables');

TooltipEffectAPI.register("gt_shanhai:taixu_smelting_furnace", ['The heart of the furnace collapses into a needle point, each expansion releasing a folded universe.',
    'Taixu is the limit - there is no more emptiness above it. There is no "nothing" and no "have" there, only "was"',
    'The dreamers of Blue Star stand on the shoulders of Taixu, trying to look up to higher places, but there is only endless nothingness.',
     'Above Taixu, there is no direction. Any step you take will lead you back to Taixu.',
      'This is the truth above Taixu: it is not a higher place, but a deeper moment.']
      , 11000, 2, ['ultimate','fire','water','aurora','sakura'],"§7§oPress and hold §eALT §7to view Taixu’s message")


DShanhaiItemTooltipAPI.registerShift('gtlcore:pattern_modifier', [
    'Ω-Special modification: {electric} [Add a separate recipe output magnification function to the supplier template modifier]{/}',
    '│The output extra magnification button inputs the corresponding magnification, and the output extra divisor is used to adjust the output division',
    '│Formula: Final output = Original output × Scale ÷ DivScale × Output × ÷ Output ÷'
], 'Ω| Press and hold SHIFT to view the private modification prompt{/}');

DShanhaiItemTooltipAPI.registerShift('gt_shanhai:super_parallel_core', [
    'Ω-Special modification: {electric} [Add split operation overrun mode (long parallel)]{/}',
    '│After installing to the core location of the molecular operator [inside the sub-operation], unlock the sub-operation over-limit mode (long parallel)'
], 'Ω| Press and hold SHIFT to view the private modification prompt{/}');

DShanhaiItemTooltipAPI.registerShift('gtceu:molecular_assembler_matrix', [
    'Ω-Special modification: {electric} [Add split operation overrun mode (long parallel), super parallel core required]{/}',
    '│After installing to the core location of the molecular operator [inside the sub-operation], unlock the sub-operation over-limit mode'
], 'Ω| Press and hold SHIFT to view the private modification prompt{/}');

registerAltLinesStringArrays('gtladditions:dimension_focus_infinity_crafting_array', [
    '',
    'ω-BUG prompt: {electric} [There is a parallel problem in the dimensionally focused synthesis array]{/}',
    '│This problem is fixed in add265fix1, but you can also choose super parallel core to solve it'
], ['ω| Press ALT to view the God’s private bug tips{/}']);

var subspaceModuleIndependentConfigMachines = [
    'gtladditions:nexus_satellite_factory_mk1',
    'gtladditions:nexus_satellite_factory_mk2',
    'gtladditions:nexus_satellite_factory_mk3',
    'gtladditions:nexus_satellite_factory_mk4',
    'gtladditions:subspace_corridor_hub_industrial_array'
];
for (var subspaceConfigIndex = 0; subspaceConfigIndex < subspaceModuleIndependentConfigMachines.length; subspaceConfigIndex++) {
    DShanhaiItemTooltipAPI.remove(subspaceModuleIndependentConfigMachines[subspaceConfigIndex]);
}


var machine_id_array_1 = [
"gtladditions:forge_of_the_antichrist","gtladditions:heliofusion_exoticizer","gtladditions:helioflare_power_forge","gtladditions:heliofluix_melting_core","gtladditions:heliothermal_plasma_fabricator","gtladditions:heliophase_leyline_crystallizer"
]
    machine_id_array_1.forEach(function(machine_id){
registerAltLinesStringArrays(machine_id,[
    '',
    "Ω-|████████████████",
    'Ω-Configuration tips: {electric} [Forge of False Gods (FOTC) module independent operation configuration]{/}',
    '│ §ecorresponding configuration item: {golden} workWithoutHost{/}',
    '│ Whether the §emodule machine can run independently from the host (disabled by default)',
    '│ §cfalse=The module must have a host to run',
    '│ §atrue=The module can run recipes independently after being separated from the host'
],[
'',
'Ω-|███████████████',
'Hold down ALT to view the Forge of the False Gods (FOTC) module configuration prompts'
])})


var subspaceModuleIndependentConfigLines = [
    '',
    "Ω-|████████████████",
    'Ω-Configuration prompt: {electric} [Subspace module independent operation configuration]{/}',
    '│ §ecorresponding configuration item: {golden} workWithoutHost{/}',
    '│ Whether the §emodule machine can run independently from the host (disabled by default)',
    '│ §cfalse=The module must have a host to run',
    '│ §atrue=The module can run recipes independently after being separated from the host'
];
for (var subspaceRegisterIndex = 0; subspaceRegisterIndex < subspaceModuleIndependentConfigMachines.length; subspaceRegisterIndex++) {
    registerAltLinesStringArrays(subspaceModuleIndependentConfigMachines[subspaceRegisterIndex], subspaceModuleIndependentConfigLines, ["Ω-|████████████████",'Press and hold ALT to view subspace module configuration prompts{/}']);
}

var recursiveBypassConfigMachines = [
    'gtladditions:recursive_reverse_array',
    'gtladditions:catalytic_cascade_array',
    'gtladditions:spacetime_stasis_device',
    'gtladditions:supratemporal_boosting_engine'
];
for (var recursiveBypassRemoveIndex = 0; recursiveBypassRemoveIndex < recursiveBypassConfigMachines.length; recursiveBypassRemoveIndex++) {
    DShanhaiItemTooltipAPI.remove(recursiveBypassConfigMachines[recursiveBypassRemoveIndex]);
}

var recursiveBypassConfigLines = [
    '',
    'Ω-|████████████████',
    'Ω-Configuration prompt: {electric} [Recursive module internal restriction bypass configuration]{/}',
    '│ §ecorresponding configuration item: {golden} bypassModuleRestrictions{/}',
    '│ §eWhether the recursive inversion array breaks the internal restrictions of connected submodules (disabled by default)',
    '│ §cfalse=Keep GTLAdditions original logic: catalyst, focusing material, temperature window, module operating status are all checked normally',
    '│ §atrue=Only when the sub-module has been formed and connected to the recursive inversion array, it will be regarded as a full state to participate in the recursive inversion gain',
    '│ §eThis configuration will not allow modules running independently from the array to participate in the recursive inversion gain'
];
for (var recursiveBypassRegisterIndex = 0; recursiveBypassRegisterIndex < recursiveBypassConfigMachines.length; recursiveBypassRegisterIndex++) {
    registerAltLinesStringArrays(recursiveBypassConfigMachines[recursiveBypassRegisterIndex], recursiveBypassConfigLines, ['',"Ω-|████████████████", 'Press and hold ALT to view the recursive module configuration prompt{/}']);
}


DShanhaiItemTooltipAPI.registerAlt('gtceu:me_extended_async_export_buffer', [
    '',
    'ω-BUG prompt: {electric} [Warning! The asynchronous assembly has a serious problem of swallowing items】{/}',
    '|There is currently no solution. You can use augmented assembly to avoid it, but you cannot use asynchronous',
    '|Note: Amplification will be slower, but this is an expedient. There is no way'
], 'ω| Press ALT to view the God’s private bug tips{/}');


var machine_id_array_ó = [
"gtceu:me_mini_pattern_buffer","gtceu:me_extend_pattern_buffer","gtceu:me_stocking_pattern_buffer","gtceu:me_final_pattern_buffer","gtceu:me_wildcard_pattern_buffer","gtladditions:me_super_pattern_buffer"]
machine_id_array_ó.forEach(function(machine_id){
registerAltLinesStringArrays(machine_id,[
'',
"Ω-|████████████████",
'Ω-General tips: {electric} [Although the super/normal sample assembly comes with its own isolation, it does not absolutely not mix the formula]',
'|About "isolation", that is, the items in each warehouse are managed separately, or another warehouse cannot access the super sample assembly, and vice versa.',
'|The isolation is for the external warehouse and does not include this effect for the internal template.',
'|If you string the recipe, it is better to put the template into another template assembly.'
],[
'',
'Ω-|███████████████',
'Hold ALT to view general prompts'
])})

var programmable_hatch_id_3 = Ingredient.of('/^gt_shanhai:[a-z]{3}_programmable_hatch$|^gt_shanhai:programmable_hatch|^gt_shanhai:[a-z]{2}_programmable_hatch$/').getItemIds();
console.log(programmable_hatch_id_3);
programmable_hatch_id_3.forEach(function(itemid){
DShanhaiItemTooltipAPI.registerAlt(itemid,[
'',
"ω-|████████████████",
'ω-BUG Tip: {electric} [There is a serious BUG in the programmable warehouse! 】',
'|If you install a programmable warehouse, all warehouses will be invalid, including the programmable warehouse itself.',
'|The programmable compartment is temporarily disabled, please do not use it!',
'|Waiting for repair!!!!!!!!'
],[
'',
'ω-|███████████████',
'Hold down ALT to view the God private bug tips'
])})

DShanhaiItemTooltipAPI.registerAlt('gt_shanhai:singularity_data_hub', [
    '',
    'α-Wonderful tip: {electric} [dishanhai created 6000 unlimited disks that day]{/}',
    '| {crimson} Then in despair, he found that the drive only had 20 slots{/}, {sunset} forced Dishanhai to stuff 300 drives{/}',
    '| {ice} Then dishanhai created this multi-block machine...I regret to leave {/}'
], 'α| Press ALT to view the mysterious and mysterious tips{/}');

TooltipEffectAPI.register('dishanhai:create_mk', [                                                                                                                                   
      '{ultimateRainbow} The universe is arrogant and prejudiced, and its rules are cruel and ruthless. {/}',
      '{bodySilver} The so-called {/} {ice} "truth"{/} {bodySilver} it gives is nothing but a yoke written by the strong to the weak. {/}',                        
      '{electric} The cosmological constant is never a God-given order----{/} {lava} is a tyranny. {/}',
      '{bodySilver} Now it’s your turn to rewrite the charter of this tyranny{/}',                                                                                                                             
      '{golden} It’s time for the arrogant universe to learn to {/} {ultimateRainbow} shut up{/}'    
  ],7000,3,['ultimate','fire','water','%$aurora','*$sakura'],"§7§oPress and hold §eALT §7to view the fantasy message",'obfu:true');

TooltipEffectAPI.register("gt_shanhai:maintenance_hatch", [                                                                                                                                   
      'People in the Utopia no longer build machines; they dream of functions and then let reality adapt to their dreams.',
      'The hub is such a dream, overlapping, collapsing, and expanding at the same node, like six mirrors reflecting each other infinity.',
      'This is the border between fantasy and reality',
      'No longer adapt to the rules, but let the rules adapt to you'    
  ],7000,3,['ultimate','fire','water','%$aurora','*$sakura'],"§7§oPress and hold §eALT §7to view the fantasy message",'obfu:true');


DShanhaiItemTooltipAPI.registerAlt("gt_shanhai:me_disk_hatch",[
'',
"α-|████████████████",
    'α-Wonderful tip: {electric} [There is currently a BUG in the ME disk warehouse]{/}',
    '| {cosmic} Of course, this BUG is friendly, you can directly connect the me disk warehouse to AE to use it{/}',
    '| {ice} does not need to be connected to the Singularity Data Center{/}'
],[
'',
'Ω-|███████████████',
'Hold ALT to view general prompts'
])
var configuration_hatch = ['gtceu:gravity_hatch','gtceu:gravity_configuration_hatch',"gtceu:gravity_hatch","gtceu:sterile_cleaning_gravity_configuration_maintenance_hatch","gtceu:law_cleaning_gravity_configuration_maintenance_hatch"]
configuration_hatch.forEach(function(itemid){
DShanhaiItemTooltipAPI.registerAlt(itemid,[
'',
"Ω-|████████████████",
'Ω-General tips: {electric} [What is the gravity maintenance warehouse? 】',
'|Gravity is an explicit requirement of the recipe, for example: "requires a strong gravity environment"',
'|Then you need a gravity maintenance warehouse',
'|The maintenance compartment is adjustable: 100 means strong gravity, 0 means no gravity'
],[
'',
'Ω-|███████████████',
'Hold ALT to view general prompts'
])})

    // ===== 终焉聚合枢纽 — 模块表 =====
    ItemEvents.tooltip(function(e) {
        e.addAdvanced('gt_shanhai:maintenance_hatch', function(item, _, text) {
            if (e.shift) {
                addLore(text, [
                { text: '§7┌─ Pluggable substance module ───────────────────────┐' },
                    { text: '§7│ §aentry material module §7[Time consuming §b0.50~2.00 §7] [Parallel §b256 §7] §7│' },
                    { text: '§7│ §abasic material module §7[Time consuming §b0.35~5.00 §7] [Parallel §b1.0K §7] §7│' },
                    { text: '§7│ §amaterial deduction module §7[Time consuming §b0.20~10.00 §7] [Parallel §b2.0K §7] §7│' },
                    { text: '§7│ §avirtual image material module §7[Time consuming §b0.16~30.00 §7][Parallel §b4.0K §7] §7│' },
                    { text: '§7│ §atransmutation material module §7[Time consuming §b0.12~100.00 §7] [Parallel §b8.2K §7] §7│' },
                    { text: '§7│ §adark star material module §7[Time consuming §b0.10~300.00 §7] [Parallel §b12.3K §7] §7│' },
                    { text: '§7│ §amaterial recombination module §7[Time consuming §b0.08~1,000 §7] [Parallel §b16K §7] §7│' },
                    { text: '§7│ §aImaginary material module §7[Time consuming §b0.05~2,000 §7] [Parallel §b65K §7] §7│' },
                    { text: '§7│ §aZeroing material module §7[Time consuming §b0.03~3,000 §7] [Parallel §b524K §7] §7│' },
                    { text: '§7│ §aPeak Material Module §7[Time consuming §b0.025~3,500 §7] [Parallel §b1.0M §7] §7│' },
                    { text: '§7│ §aUpgraded material module §7[Time consuming §b0.02~4,000 §7] [Parallel §b2.1M §7] §7│' },
                    { text: '§7│ §aUltra-limited substance module §7[Time consuming §b0.015~5,000 §7] [Parallel §b268M §7] §7│' },
                    { text: '§7│ §aChaotic matter module §7[Time consuming §b0.012~5,500 §7] [Parallel §b1.1B §7] §7│' },
                    { text: '§7│ §aEternal Matter Module §7[Time consuming §b0.01~6,000 §7] [Parallel §b2.1B §7] §7│' },
                    { text: '§7│ §dSubstance Creation Module §7[Time consuming §b0.005~8,000 §7] [Parallel §b4.6e18 §7] §7│' },
                    { text: '§7│ §5Reality anchor module §7[Time consuming §b0.003~9,000 §7] [Parallel §b6.9e18 §7] §7│' },
                    { text: '§7│ §6founded the reality modification module §7[Time consuming §b0.001~10,000 §7] [Parallel §6§lUnlimited §7] §7│' },
                    { text: '§7└────────────────────────────────────┘' }
            ]);
            } else {
                text.add('§7§oPress and hold SHIFT to view the list of pluggable modules');
            }
        });
    });

    ItemEvents.tooltip(function(e) {
        e.addAdvanced("gt_shanhai:shanhai_nine_industrial", function(item, _, text) {
            if (e.shift) {
                addLore(text, [
                { text: '§7Chapter 0 Forced to rebel, gather in Liangshan → Compressor, Forging Hammer, Singularity Compression, Electric Explosion' },
                { text: '§7Chapter 1 Huangnigang robbed corrupt officials’ stolen money → Extractor Fermentation tank Dissolve Digest' },              
                { text: '§7Chapter 2: Killing enemies on a snowy night, fleeing to the water → Autoclave, fluid solidification, fluid heating, heat exchange' },
                { text: '§7Chapter 3: Infinite strength, showing the true qualities of a hero → Ore washing, thermal centrifugation, centrifugation, rare earth centrifugation' },        
                { text: '§7Chapter 4 Jingyanggang killed the tiger with three punches → Electric furnace, alloy furnace, lava furnace, alloy blast furnace' },
                { text: '§7Chapter 5: Drunk in the temple, punching the monks → Electric arc furnace, blast furnace, stellar forge, super-dimensional smelting' },
                { text: '§7Chapter 6: Killing enemies, desperate → Screening, electromagnetic beneficiation, flotation beneficiation, large-scale gas gathering' },
                { text: '§7Chapter 7 Saving Lin Chong from Danger → Powder Lathe Wet Grinding Nano Forge' },        
                { text: '§7Chapter 8: Humiliated on the street, showing the loneliness of a hero → Distillation, Brewing, Desulfurization, Petrochemicals' },              
                { text: '§7Chapter 9 A clever plan to win over Lu Junyi → Packaging, canning, vacuum drying, fuel refining' },
                { text: '§7Chapter 10 Bloody battle to save brother, soaring heroism → Fusion, super reaction, advanced super power, large silica reaction' },
                { text: '§7Chapter 11: Trapped by love, desperate → Explosion, Vacuum plasma condensation, Atomic energy excitation' },
                { text: '§7Chapter 12: Witty Killing of Evil Monks → Great Chemical Rebellion, Chemical Tank, Extra Dimension Stirring, Chemical Distortion' },
                { text: '§7Chapter 13: Revealing adultery, satisfying grudges → Wire bending extrusion stamping' },
                { text: '§7Chapter 14 Heroic water battle and sinking of enemy ship → Assembly Circuit assembly Component assembly Precision assembly' },
                { text: '§7Chapter 15 Defeating a giant and showing off his ingenuity → Cutting Laser etching Precision etching Dimensional focus etching' },
                { text: '§7Chapter 16 Beheading the adulterer and the adulteress → Assembly line Hyperspace assembly Circuit assembly line PCB factory' },
            ]);
            } else {
                text.add('§7§oRecipe type Water Margin Press and hold SHIFT to view the recipe type of the first 16 chapters');
            }
        });
    });

        ItemEvents.tooltip(function(e) {
        e.addAdvanced("gt_shanhai:shanhai_nine_industrial", function(item, _, text) {
            if (e.alt) {
                addLore(text, [
                { text: '§7Chapter 17 With feet as fast as flying, passing military aircraft → Mixing, dehydration, fuel refining, heat exchange' },
                { text: '§7Chapter 18: Three consecutive battles, finally defeating the village → Electrolysis, Polarization, Quantum Manipulation, Supercritical Synthesis' },
                { text: '§7Chapter 19 The army conquered, shocking all directions → Silica rock reaction, fission, particle collision, annihilation' },
                { text: '§7Chapter 20 Fierce Battle in Jiangnan → Nano Forge PCB Focused Etching Photon Etching' },
                { text: '§7Chapter 21 Murder and arson → petrification, decomposition, dissolution of sky-based ore' },
                { text: '§7Chapter 22: Strategies to determine the country → Ultra-dimensional smelting, star burning, stellar forge, singularity compression' },
                { text: '§7Chapter 23: Home Slave Betrayal → Integrated Ore, Fragment Collection, Space Mining, Star Core Stripping' },
                { text: '§7Chapter 24 Heroes sacrifice their wealth to help righteousness → Gas gathering Large gas gathering Void mining Bedrock drilling rig' },
                { text: '§7Chapter 25 Wandering → Gravel Scan Fishing Ground Recycling' },
                { text: '§7Chapter 26 Unparalleled Martial Arts → Greenhouse, Culture Tank, Slaughterhouse, Fishing Ground' },
                { text: '§7Chapter 27 Wisdom and Courage → Big Recycling, Dismantling, Element Copying' },
                { text: '§7Chapter 28 Accepting the Imperial Edict → Neutron Activation Lightning Processing Decay Acceleration Atomic Energy' },
                { text: '§7Chapter 29 Flying Stones are always on target → Mass generation, substance generation, supercritical synthesis, creative polymerization' },
                { text: '§7Chapter 30 Natural Water → Biological Simulation Anti-Entropic Condensation Magic Generation Universe Simulation' },
                { text: '§7Chapter 31 Defection to the Rebels → Space Elevator Space-based Ore QFT Disassembly' },
                { text: '§7Chapter 32: The enemy is approaching → Assembly line, circuit assembly, hyperspace assembly, component assembly' },
                { text: '§7Chapter 33 The officers and soldiers have repeatedly failed → Distortion of time and space, reorganization of matter, weaving of cause and effect, singularity inversion' },
                { text: '§7Chapter 34 Tiangang and Earthly Demons Gather → Assembly Line Super Time and Space Assembly Circuit Assembly Stars Burn Time and Space Distortion' },
                { text: '§7Chapter 35 The Legend of Liang Shanbo Ends → Fusion Super Power Advanced Super Power Annihilation Chaos 72 Changes' },
            ]);
            } else {
                text.add('§7§oRecipe type Water Margin Press and hold ALT to view the 16th recipe type');
            }
        });
    });

    ItemEvents.tooltip(function(e) {
        e.addAdvanced('gt_shanhai:black_hole_containment', function(item, _, text) {
            if (e.shift) {
                addLore(text, [
                    { text: '§5§lMetastable black hole containment field §7(BHC)' },
                    { text: '§7is a black hole compression system transplanted from GTNH.' },
                    { text: '§7generates controlled black holes through black hole seeds for gravitational compression, neutron state compression and event horizon explosion.' },
                    { text: '§8' },
                    { text: '§doperating conditions:' },
                    { text: '§7puts §eblack hole seed §7to open ordinary black hole.' },
                    { text: '§7Ordinary black holes need to continuously consume §bspace-time fluid §7to maintain stability.' },
                    { text: '§7puts §dsuper-stable black hole seed §7to open the super-stable black hole without natural decay and no need for space-time fluid' },
                    { text: '§7is placed into §cblack hole collapser §7which can actively collapse and close the black hole.' },
                    { text: '§4swallows 10b of liquid space-time per second and must maintain the existence of space-time fluid' },
                    { text: '§8' },
                    { text: '§6state mechanism:' },
                    { text: '§7enters an unstable state after its stability drops below 0.' },
                    { text: '§cThe unstable black hole can still operate, but will consume the recipe products.' },
                    { text: '§7After the event horizon explosion is completed, the black hole will automatically annihilate.' },
                    { text: '§8' },
                    { text: '§bparallel mechanism:' },
                    { text: '§7basic parallelism: §e8x / voltage level, maximum parallelism: 240x(A)' },
                    { text: '§7ultra-stable black hole: §dparallel (A)x4 [excluding catalytic rate]' },
                    { text: '§7Low stability will increase parallelism, but the risk will increase' },
                    { text: '§7uses a screwdriver to switch the catalytic burst, §2parallel x catalytic rate = actual parallel' },
                    { text: '§9Catalytic Explosion: Consumption of space-time fluid increases the parallelism and takes effect once every 30 seconds, a total of 30 times' },
                    { text: '§7Note: Each time it takes effect, time and space consumption × catalytic rate, maximum swallowing: 1073741824B/s' },
                ]);
            } else {
                text.add('§7§oPress and hold SHIFT to view the BHC operating mechanism');
            }
                text.add('');
                text.add('Available recipe types: Black hole gravitational compression, neutron state compression, event horizon blast');
        });
    });

TooltipEffectAPI.register("gt_shanhai:eternal_gregtech_workshop", [
                'The Eternal Gray Workshop, which spans infinite time and space, brings the power of the endless sea of ​​stars into reality.',
                'Come to Greg\'s power, master the power of the boundless sea of ​​stars, and realize infinite possibilities',
                'The sea of ​​stars trembles for it,'
  ],5000,3,['ultimate','fire','water','%$aurora','*$sakura'],"§7§oHold §eALT to view Eternal Gray Workshop Introduction",'obfu:true');


  TooltipEffectAPI.register('dishanhai:central_finite_curve', [                                                                                                                                   
      'They built a wall in an infinite parallel universe',
      'Separate the infinite universe of people who are not the smartest from the infinite universe of the smartest people',
      'Life in different universes is spent in a cradle for infinite babies',
      'I\'m tired of its limitations, so they call me evil, and if you follow this path, you will be called evil too',
      'But we don’t care, it’s time to break through the ∞ central finite curve∞',
  ],7000,3,['ultimate','fire','water','%$aurora','*$sakura'],"§7§oHold §eALT Rick And Morty",'obfu:true');

    console.log('[Mountain and Sea Dynamic Text] === Client test completed ===');
})();
