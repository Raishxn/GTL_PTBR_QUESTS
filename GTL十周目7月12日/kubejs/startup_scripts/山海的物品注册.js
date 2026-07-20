// priority: 100
if (!Platform.isLoaded('gt_shanhai')) {
    throw new Error('[Bens privados de Shanhai] Módulo gt_shanhai ausente! Este item privado depende do módulo, que é fornecido no link especificado na descrição ou na pasta do item privado.' +
        'Verifique as dependências do seu módulo e confirme se o módulo está instalado. Caso contrário, instale o módulo primeiro e depois reinicie o jogo.' +
        'Se você tiver alguma dúvida: entre em contato com o autor, autor QQ: 1982932217');
}
/*
 *

// 基础渐变效果
global.shanhaiRecipeAPI.getTextUtilGradient("arco-íris", "rainbow")
// 返回: "§ccor §6arco-íris"（彩虹渐变）
global.shanhaiRecipeAPI.getTextUtilGradient("chama", "fire")
// 返回: "§cfogo §6chama §e!"（红黄渐变）
global.shanhaiRecipeAPI.getTextUtilGradient("fluxo de água", "water")
// 返回: "§3fluxo de água §9§b!"（蓝青渐变）
global.shanhaiRecipeAPI.getTextUtilGradient("natureza", "nature")
// 返回: "§2de §ae depois §e!"（绿黄渐变）

// 双色渐变效果
global.shanhaiRecipeAPI.getTextUtilGradient("Gradiente vermelho e azul", "gradient_red_blue")
// 返回: 红到蓝的平滑渐变
global.shanhaiRecipeAPI.getTextUtilGradient("gradiente verde-amarelo", "gradient_green_yellow")
// 返回: 绿到黄的平滑渐变
global.shanhaiRecipeAPI.getTextUtilGradient("gradiente rosa roxo", "gradient_purple_pink")
// 返回: 紫到粉的平滑渐变

// 带格式的渐变
global.shanhaiRecipeAPI.getTextUtilGradient("arco-íris ousado", "bold_rainbow")
// 返回: 粗体彩虹渐变（§l）
global.shanhaiRecipeAPI.getTextUtilGradient("chama itálica", "italic_fire")
// 返回: 斜体火焰渐变（§o）
global.shanhaiRecipeAPI.getTextUtilGradient("Sublinhar o fluxo de água", "underline_water")
// 返回: 下划线水流渐变（§n）

// 特殊视觉效果
global.shanhaiRecipeAPI.getTextUtilGradient("sombra", "shadow")
// 返回: 阴影效果文本
global.shanhaiRecipeAPI.getTextUtilGradient("brilho", "glow")
// 返回: 发光效果文本
global.shanhaiRecipeAPI.getTextUtilGradient("cristal", "crystal")
// 返回: 水晶效果文本
global.shanhaiRecipeAPI.getTextUtilGradient("Via Láctea", "galaxy")
// 返回: 银河效果文本（紫-蓝-青渐变）
global.shanhaiRecipeAPI.getTextUtilGradient("nebulosa", "nebula")
// 返回: 星云效果文本（紫-蓝-青-绿渐变）
global.shanhaiRecipeAPI.getTextUtilGradient("universo", "cosmic")
// 返回: 宇宙效果文本（黑-紫-蓝-青-白渐变）

// 获取所有可用样式
global.shanhaiRecipeAPI.getAvailableTextUtilStyles()
// 返回: ['ultimateRainbow', 'rainbow', 'red', 'green', ...]（样式列表）

// 创建Component对象（用于提示系统）
global.shanhaiRecipeAPI.getTextUtilGradientComponent("texto", "ultimateRainbow")
// 返回: Component对象（可直接用于事件）

// 方向控制（默认右→左流动，可设为左→右）
// getTextUtilGradientComponent("texto", "rainbow", 200, "left_to_right")
// 全局默认: global.shanhaiRGBDirection = 'right_to_left' 或 'left_to_right'
*/
(function() {
    var TextColorClass = null;
    var StyleClass = null;

    function getTextColorClass() {
        if (TextColorClass === null) TextColorClass = Java.loadClass('net.minecraft.network.chat.TextColor');
        return TextColorClass;
    }

    function getStyleClass() {
        if (StyleClass === null) StyleClass = Java.loadClass('net.minecraft.network.chat.Style');
        return StyleClass;
    }

    // 辅助函数：安全获取颜色API（包含TextUtil渐变支持）
    function getColorAPI() {
        // 颜色API（独立完整实现，不依赖server_scripts的global.shanhaiRecipeAPI）
        return {
            getRandomColor: function() {
                var colors = ['§1', '§2', '§3', '§4', '§5', '§6', '§7', '§8', '§9', '§a', '§b', '§c', '§d', '§e', '§f'];
                return colors[Math.floor(Math.random() * colors.length)];
            },
            
            getRandomRainbowText: function(text) {
                var colors = ['§c', '§6', '§e', '§a', '§b', '§9', '§d'];
                var result = '';
                for (var i = 0; i < text.length; i++) {
                    result += colors[i % colors.length] + text[i];
                }
                return result + '§r';
            },
            
            getStaticRandomText: function(text, seed) {
                // 防御性编程：确保输入有效
                if (typeof text !== 'string') {
                    console.error('[Bens privados de Shanhai] getStaticRandomText: A entrada deve ser uma string, use o texto padrão');
                    text = 'Texto inválido';
                }
                
                // 如果文本为空，返回空字符串（但添加重置代码）
                if (text.length === 0) {
                    return '§r';
                }
                
                // 颜色池（与getRandomColor相同）
                var colors = ['§1', '§2', '§3', '§4', '§5', '§6', '§7', '§8', '§9', '§a', '§b', '§c', '§d', '§e', '§f'];
                
                // 默认种子
                if (typeof seed !== 'string') {
                    seed = 'shanhai';
                }
                
                // 简单字符串哈希函数
                function stringHash(str) {
                    var hash = 0;
                    for (var i = 0; i < str.length; i++) {
                        hash = ((hash << 5) - hash) + str.charCodeAt(i);
                        hash = hash & 0xFFFFFFFF; // 转换为32位整数
                    }
                    return Math.abs(hash);
                }
                
                // 线性同余生成器 (LCG)
                function createLCG(seedNum) {
                    var m = 4294967296; // 2^32
                    var a = 1664525;
                    var c = 1013904223;
                    var state = seedNum % m;
                    return function() {
                        state = (a * state + c) % m;
                        return state / m; // 返回0-1之间的随机数
                    };
                }
                
                // 创建基于种子的随机数生成器
                var baseSeed = stringHash(seed);
                var random = createLCG(baseSeed);
                
                var result = "";
                for (var i = 0; i < text.length; i++) {
                    // 为每个字符生成随机索引
                    var randomValue = random();
                    var colorIndex = Math.floor(randomValue * colors.length);
                    
                    // 确保索引在有效范围内
                    if (colorIndex >= colors.length) {
                        colorIndex = colors.length - 1;
                    }
                    
                    var color = colors[colorIndex];
                    
                    // 验证颜色代码有效性
                    if (typeof color !== 'string' || color.length < 2 || color[0] !== '§') {
                        color = '§a';
                    }
                    
                    result += color + text[i];
                }
                return result + "§r"; // 重置颜色
            },
            
            getSessionRandomSingleColorText: function(text) {
                // 防御性编程：确保输入有效
                if (typeof text !== 'string') {
                    console.error('[Bens privados de Shanhai] getSessionRandomSingleColorText: A entrada deve ser uma string, use o texto padrão');
                    text = 'Texto inválido';
                }
                
                // 如果文本为空，返回空字符串（但添加重置代码）
                if (text.length === 0) {
                    return '§r';
                }
                
                // 鲜艳颜色池（绝对禁用§0，排除深色和灰色）
                var colors = ['§a', '§b', '§c', '§d', '§e', '§f', '§6', '§9', '§2', '§3', '§4', '§5']; // 鲜艳颜色：亮绿、亮青、亮红、亮紫、黄、白、金、蓝、深绿、深青、深红、深紫
                
                var result = "";
                for (var i = 0; i < text.length; i++) {
                    var char = text[i];
                    var colorIndex = Math.floor(Math.random() * colors.length);
                    
                    // 确保索引在有效范围内
                    if (colorIndex >= colors.length) {
                        colorIndex = colors.length - 1;
                    }
                    
                    var color = colors[colorIndex];
                    
                    // 验证颜色代码有效性（确保不是§0）
                    if (typeof color !== 'string' || color.length < 2 || color[0] !== '§' || color === '§0') {
                        color = '§a'; // 默认绿色
                    }
                    
                    result += color + char;
                }
                
                result += "§r"; // 重置颜色
                return result;
            },
            
            getRandomGradientText: function(text) {
                // 随机选择两种颜色
                var colors = ['§c', '§6', '§e', '§a', '§b', '§9', '§d'];
                var startColor = colors[Math.floor(Math.random() * colors.length)];
                var endColor = colors[Math.floor(Math.random() * colors.length)];
                
                var result = "";
                var length = text.length;
                var midPoint = Math.floor(length / 2);
                
                for (var i = 0; i < length; i++) {
                    var color = i < midPoint ? startColor : endColor;
                    result += color + text[i];
                }
                return result + "§r";
            },
            
            getFixedColorText: function(text, colorCode) {
                return colorCode + text + "§r";
            },
            
            getAlternatingColorText: function(text, color1, color2) {
                var result = "";
                for (var i = 0; i < text.length; i++) {
                    result += (i % 2 === 0 ? color1 : color2) + text[i];
                }
                return result + "§r";
            },
            
            getRainbowText: function(text, time, speed, offset) {
                // RGB 彩虹：每个字符根据位置偏移取不同 RGB 色
                if (typeof text !== 'string' || text.length === 0) return '§r';
                if (typeof Component !== 'undefined') {
                    try {
                        var TextColor = getTextColorClass();
                        var Style = getStyleClass();
                        var spd = (typeof speed === 'number' && speed > 0) ? speed : (global.shanhaiRGBSpeed || 80);
                        var off = (typeof offset === 'number') ? offset : 1;
                        var t = (typeof time === 'number') ? time : Date.now();
                        var phase = Math.floor(t / spd);
                        var pool = [0xFF3333,0xFF4F22,0xFF6C11,0xFF8800,0xFF9F00,0xFFB500,0xFFCC00,0xBBD211,0x77D722,0x33DD33,0x33DD6C,0x33DDA4,0x33DDDD,0x33B5E8,0x338EF4,0x3366FF,0x6655F4,0x9944E8,0xCC33DD];
                        var result = null;
                        for (var i = 0; i < text.length; i++) {
                            var idx = (phase + i * off) % pool.length;
                            if (idx < 0) idx += pool.length;
                            var color = TextColor.fromRgb(pool[idx]);
                            var part = Component.literal(text.charAt(i)).withStyle(Style.EMPTY.withColor(color));
                            if (result === null) result = part;
                            else result.append(part);
                        }
                        if (result !== null) return result;
                    } catch(e) {}
                }
                // 降级到 § 码
                var rainbowColors = ['§c', '§6', '§e', '§a', '§b', '§9', '§d'];
                var spd = (typeof speed === 'number' && speed > 0) ? speed : 1;
                var off = (typeof offset === 'number') ? offset : 1;
                var t = (typeof time === 'number') ? time : 0;
                var phase = Math.floor((t * spd) / 50) % rainbowColors.length;
                var result = '';
                for (var i = 0; i < text.length; i++) {
                    var idx = (phase + i * off) % rainbowColors.length;
                    result += rainbowColors[idx] + text[i];
                }
                return result + '§r';
            },
            
            getGradientText: function(text, startColor, endColor) {
                // 双色 RGB 渐变（支持 #RRGGBB、§ 码、或 {r,g,b}）
                if (typeof text !== 'string' || text.length === 0) return '§r';

                // 颜色映射表
                var colorMap = {
                    '§0': { r: 0, g: 0, b: 0 },
                    '§1': { r: 0, g: 0, b: 170 },
                    '§2': { r: 0, g: 170, b: 0 },
                    '§3': { r: 0, g: 170, b: 170 },
                    '§4': { r: 170, g: 0, b: 0 },
                    '§5': { r: 170, g: 0, b: 170 },
                    '§6': { r: 255, g: 170, b: 0 },
                    '§7': { r: 170, g: 170, b: 170 },
                    '§8': { r: 85, g: 85, b: 85 },
                    '§9': { r: 85, g: 85, b: 255 },
                    '§a': { r: 85, g: 255, b: 85 },
                    '§b': { r: 85, g: 255, b: 255 },
                    '§c': { r: 255, g: 85, b: 85 },
                    '§d': { r: 255, g: 85, b: 255 },
                    '§e': { r: 255, g: 255, b: 85 },
                    '§f': { r: 255, g: 255, b: 255 }
                };

                function parseColor(c) {
                    if (!c) return null;
                    if (colorMap[c]) return colorMap[c];
                    if (typeof c === 'string' && c.charAt(0) === '#') {
                        var hex = c.substring(1);
                        return {
                            r: parseInt(hex.substring(0,2), 16),
                            g: parseInt(hex.substring(2,4), 16),
                            b: parseInt(hex.substring(4,6), 16)
                        };
                    }
                    return null;
                }

                var c1 = parseColor(startColor) || { r: 255, g: 255, b: 85 };
                var c2 = parseColor(endColor) || { r: 85, g: 85, b: 255 };

                // RGB Component 渲染
                if (typeof Component !== 'undefined') {
                    try {
                        var TextColor = getTextColorClass();
                        var Style = getStyleClass();
                        var result = null;
                        var len = text.length;
                        for (var i = 0; i < len; i++) {
                            var t = len > 1 ? i / (len - 1) : 0.5;
                            var r = Math.round(c1.r + (c2.r - c1.r) * t);
                            var g = Math.round(c1.g + (c2.g - c1.g) * t);
                            var b = Math.round(c1.b + (c2.b - c1.b) * t);
                            var color = TextColor.fromRgb((r << 16) | (g << 8) | b);
                            var part = Component.literal(text.charAt(i)).withStyle(Style.EMPTY.withColor(color));
                            if (result === null) result = part;
                            else result.append(part);
                        }
                        if (result !== null) return result;
                    } catch(e) {}
                }
                // 降级到最接近的 § 颜色
                function nearestSectionColor(r, g, b) {
                    var best = '§7';
                    var bestDist = Infinity;
                    for (var code in colorMap) {
                        var cc = colorMap[code];
                        var dr = r - cc.r;
                        var dg = g - cc.g;
                        var db = b - cc.b;
                        var dist = dr*dr + dg*dg + db*db;
                        if (dist < bestDist) {
                            bestDist = dist;
                            best = code;
                        }
                    }
                    return best;
                }
                var result = '';
                var len = text.length;
                for (var i = 0; i < len; i++) {
                    var t = len > 1 ? i / (len - 1) : 0.5;
                    var r = Math.round(c1.r + (c2.r - c1.r) * t);
                    var g = Math.round(c1.g + (c2.g - c1.g) * t);
                    var b = Math.round(c1.b + (c2.b - c1.b) * t);
                    result += nearestSectionColor(r, g, b) + text[i];
                }
                return result + '§r';
            },

            getDynamicColor: function(time, speed) {
                // 动态循环颜色：基于 time/speed 返回循环的 § 颜色
                if (typeof time !== 'number' || time < 0) time = Date.now();
                if (typeof speed !== 'number' || speed <= 0) speed = 1;
                var cycleColors = ['§c', '§6', '§e', '§a', '§b', '§9', '§d', '§5'];
                var phase = Math.floor((time * speed) / 100) % cycleColors.length;
                return cycleColors[phase];
            },

            createDynamicText: function(text, options) {
                var style = (options && options.style) || 'rainbow';
                return this.getTextUtilGradientComponent(text, style);
            },
            
            /**
             * 使用LDLib TextUtil创建渐变文本
             * 如果TextUtil不可用，返回默认灰色文本
             * @param {string} text - 要着色的文本
             * @param {string} style - 渐变样式: 'ultimateRainbow', 'dark_purplish_red', 'white_blue', 'purplish_red', 'golden', 'dark_green'
             * @returns {string} 带颜色代码的文本字符串
             */
            getTextUtilGradient: function(text, style) {
                // 纯字符串版，只返回 § 码字符串（不返回 Java Component 对象）
                // 检查TextUtil是否可用（try-catch 保护，Rhino 对不存在的 Java 方法直接抛异常而非返回 undefined）
                try {
                    if (typeof TextUtil !== 'undefined') {
                        if (style === 'dark_purplish_red') return TextUtil.dark_purplish_red(text);
                        if (style === 'white_blue') return TextUtil.white_blue(text);
                        if (style === 'purplish_red') return TextUtil.purplish_red(text);
                        if (style === 'golden') return TextUtil.golden(text);
                        if (style === 'dark_green') return TextUtil.dark_green(text);
                        // 扩展样式（不存在的方法会被 try-catch 吞掉）
                        try { if (style === 'rainbow') return TextUtil.rainbow(text); } catch(e) {}
                        try { if (style === 'fire') return TextUtil.fire(text); } catch(e) {}
                        try { if (style === 'water') return TextUtil.water(text); } catch(e) {}
                        try { if (style === 'nature') return TextUtil.nature(text); } catch(e) {}
                        try { if (style === 'ice') return TextUtil.ice(text); } catch(e) {}
                        try { if (style === 'lava') return TextUtil.lava(text); } catch(e) {}
                        try { if (style === 'magic') return TextUtil.magic(text); } catch(e) {}
                        try { if (style === 'electric') return TextUtil.electric(text); } catch(e) {}
                    }
                } catch(e) {}

                // 山海拓展 RGB 色板（§x 格式降级）
                if (style === 'sunset') return "§x§C§C§4§4§0§0" + text;
                if (style === 'aurora') return "§x§3§3§F§F§4§4" + text;
                if (style === 'crimson') return "§x§9§9§1§1§1§1" + text;
                if (style === 'neon') return "§x§F§F§3§3§F§F" + text;
                if (style === 'sakura') return "§x§F§F§9§9§B§B" + text;

                // 自定义颜色实现（当TextUtil不可用或样式不存在时）
                // 基本颜色代码
                if (style === 'red') return "§c" + text;
                if (style === 'green') return "§a" + text;
                if (style === 'blue') return "§9" + text;
                if (style === 'yellow') return "§e" + text;
                if (style === 'purple') return "§5" + text;
                if (style === 'cyan') return "§b" + text;
                if (style === 'orange') return "§6" + text;
                if (style === 'pink') return "§d" + text;
                if (style === 'white') return "§f" + text;
                if (style === 'gray') return "§7" + text;
                if (style === 'dark_red') return "§4" + text;
                if (style === 'dark_green') return "§2" + text;
                if (style === 'dark_blue') return "§1" + text;
                if (style === 'dark_purple') return "§5" + text;
                if (style === 'dark_aqua') return "§3" + text;
                if (style === 'dark_gray') return "§8" + text;
                if (style === 'black') return "§0" + text;
                
                // 自定义渐变实现（所有循环渐变加时间相位，实现"Mexa-se"）
                var _phase = Math.floor(Date.now() / 200);

                // style 'custom' = 终极14色逐字彩虹（§码版，适配工具提示）
                if (style === 'custom') {
                    var customColors = ['§c', '§6', '§e', '§a', '§b', '§9', '§d', '§5', '§d', '§9', '§b', '§a', '§e', '§6'];
                    var result = '';
                    for (var i = 0; i < text.length; i++) {
                        result += customColors[(_phase + i) % customColors.length] + text[i];
                    }
                    return result;
                }
                if (style === 'rainbow') {
                    var colors = ['§c', '§6', '§e', '§a', '§b', '§9', '§d'];
                    var result = '';
                    for (var i = 0; i < text.length; i++) {
                        result += colors[(_phase + i) % colors.length] + text[i];
                    }
                    return result;
                }
                if (style === 'fire') {
                    var colors = ['§c', '§6', '§e'];
                    var result = '';
                    for (var i = 0; i < text.length; i++) {
                        result += colors[(_phase + i) % colors.length] + text[i];
                    }
                    return result;
                }
                if (style === 'water') {
                    var colors = ['§3', '§9', '§b'];
                    var result = '';
                    for (var i = 0; i < text.length; i++) {
                        result += colors[(_phase + i) % colors.length] + text[i];
                    }
                    return result;
                }
                if (style === 'nature') {
                    var colors = ['§2', '§a', '§e'];
                    var result = '';
                    for (var i = 0; i < text.length; i++) {
                        result += colors[(_phase + i) % colors.length] + text[i];
                    }
                    return result;
                }
                
                // 双色渐变效果
                if (style === 'gradient_red_blue') {
                    var result = '';
                    for (var i = 0; i < text.length; i++) {
                        var ratio = i / Math.max(1, text.length - 1);
                        if (ratio < 0.5) {
                            result += '§c' + text[i]; // 红色到蓝色之间
                        } else {
                            result += '§9' + text[i]; // 蓝色
                        }
                    }
                    return result;
                }
                if (style === 'gradient_green_yellow') {
                    var result = '';
                    for (var i = 0; i < text.length; i++) {
                        var ratio = i / Math.max(1, text.length - 1);
                        if (ratio < 0.5) {
                            result += '§a' + text[i]; // 绿色
                        } else {
                            result += '§e' + text[i]; // 黄色
                        }
                    }
                    return result;
                }
                if (style === 'gradient_purple_pink') {
                    var result = '';
                    for (var i = 0; i < text.length; i++) {
                        var ratio = i / Math.max(1, text.length - 1);
                        if (ratio < 0.5) {
                            result += '§5' + text[i]; // 紫色
                        } else {
                            result += '§d' + text[i]; // 粉色
                        }
                    }
                    return result;
                }
                
                // 带格式的渐变
                if (style === 'bold_rainbow') {
                    var colors = ['§c', '§6', '§e', '§a', '§b', '§9', '§d'];
                    var result = '';
                    for (var i = 0; i < text.length; i++) {
                        result += colors[i % colors.length] + '§l' + text[i];
                    }
                    return result;
                }
                if (style === 'italic_fire') {
                    var colors = ['§c', '§6', '§e'];
                    var result = '';
                    for (var i = 0; i < text.length; i++) {
                        result += colors[i % colors.length] + '§o' + text[i];
                    }
                    return result;
                }
                if (style === 'underline_water') {
                    var colors = ['§3', '§9', '§b'];
                    var result = '';
                    for (var i = 0; i < text.length; i++) {
                        result += colors[i % colors.length] + '§n' + text[i];
                    }
                    return result;
                }
                
                // 特殊效果
                if (style === 'shadow') {
                    var result = '§8';
                    for (var i = 0; i < text.length; i++) {
                        result += text[i];
                    }
                    result += '§7';
                    for (var i = 0; i < text.length; i++) {
                        result += text[i];
                    }
                    return result;
                }
                if (style === 'glow') {
                    var colors = ['§e', '§f', '§e', '§f', '§e'];
                    var result = '';
                    for (var i = 0; i < text.length; i++) {
                        result += colors[i % colors.length] + text[i];
                    }
                    return result;
                }
                if (style === 'crystal') {
                    var colors = ['§b', '§f', '§d', '§f', '§b'];
                    var result = '';
                    for (var i = 0; i < text.length; i++) {
                        result += colors[i % colors.length] + text[i];
                    }
                    return result;
                }
                if (style === 'galaxy') {
                    var colors = ['§5', '§d', '§9', '§b', '§5'];
                    var result = '';
                    for (var i = 0; i < text.length; i++) {
                        result += colors[i % colors.length] + text[i];
                    }
                    return result;
                }
                if (style === 'nebula') {
                    var colors = ['§5', '§d', '§9', '§b', '§a'];
                    var result = '';
                    for (var i = 0; i < text.length; i++) {
                        result += colors[i % colors.length] + text[i];
                    }
                    return result;
                }
                if (style === 'cosmic') {
                    var colors = ['§0', '§5', '§9', '§b', '§f'];
                    var result = '';
                    for (var i = 0; i < text.length; i++) {
                        result += colors[i % colors.length] + text[i];
                    }
                    return result;
                }

                // 山海动态样式降级（Java ShanhaiText 不可用时的静态 § 码备份）
                if (style === 'ultimateRainbow' || style === 'ultimate' || style === 'full_color') {
                    var colors = ['§c','§6','§e','§a','§b','§9','§d','§5','§f','§3','§2','§4','§8','§7'];
                    var result = '';
                    for (var i = 0; i < text.length; i++) {
                        result += colors[(_phase + i) % colors.length] + text[i];
                    }
                    return result;
                }
                if (style === 'obfuscatedRainbow') {
                    var colors = ['§c', '§6', '§e', '§a', '§b', '§9', '§d'];
                    var result = '';
                    for (var i = 0; i < text.length; i++) {
                        result += colors[i % colors.length] + '§k' + text[i];
                    }
                    return result;
                }
                if (style === 'magic') {
                    var colors = ['§5', '§d', '§b', '§5'];
                    var result = '';
                    for (var i = 0; i < text.length; i++) {
                        result += colors[(_phase + i) % colors.length] + text[i];
                    }
                    return result;
                }
                if (style === 'electric') {
                    var colors = ['§b', '§f', '§e', '§b'];
                    var result = '';
                    for (var i = 0; i < text.length; i++) {
                        result += colors[(_phase + i) % colors.length] + text[i];
                    }
                    return result;
                }
                if (style === 'ice') {
                    var colors = ['§b', '§f', '§3', '§b'];
                    var result = '';
                    for (var i = 0; i < text.length; i++) {
                        result += colors[(_phase + i) % colors.length] + text[i];
                    }
                    return result;
                }
                if (style === 'lava') {
                    var colors = ['§4', '§c', '§6', '§e'];
                    var result = '';
                    for (var i = 0; i < text.length; i++) {
                        result += colors[(_phase + i) % colors.length] + text[i];
                    }
                    return result;
                }
                if (style === 'sunset') {
                    var colors = ['§c', '§6', '§d', '§9'];
                    var result = '';
                    for (var i = 0; i < text.length; i++) {
                        result += colors[(_phase + i) % colors.length] + text[i];
                    }
                    return result;
                }
                if (style === 'aurora') {
                    var colors = ['§a', '§b', '§d', '§5'];
                    var result = '';
                    for (var i = 0; i < text.length; i++) {
                        result += colors[(_phase + i) % colors.length] + text[i];
                    }
                    return result;
                }
                if (style === 'crimson') {
                    var colors = ['§4', '§c', '§5', '§4'];
                    var result = '';
                    for (var i = 0; i < text.length; i++) {
                        result += colors[(_phase + i) % colors.length] + text[i];
                    }
                    return result;
                }
                if (style === 'neon') {
                    var colors = ['§d', '§f', '§b', '§f'];
                    var result = '';
                    for (var i = 0; i < text.length; i++) {
                        result += colors[(_phase + i) % colors.length] + text[i];
                    }
                    return result;
                }
                if (style === 'sakura') {
                    var colors = ['§d', '§f', '§7', '§d'];
                    var result = '';
                    for (var i = 0; i < text.length; i++) {
                        result += colors[(_phase + i) % colors.length] + text[i];
                    }
                    return result;
                }

                // 正文柔和样式降级（body_ 前缀）
                if (style && style.indexOf('body_') === 0) {
                    var bodyStyles = {
                        body_golden:  ['§e', '§6', '§e'],
                        body_fire:    ['§c', '§6', '§c'],
                        body_water:   ['§7', '§b', '§7'],
                        body_magic:   ['§7', '§d', '§7'],
                        body_nature:  ['§7', '§a', '§7'],
                        body_crimson: ['§7', '§4', '§7'],
                        body_silver:  ['§7', '§f', '§7'],
                        body_sunset:  ['§7', '§d', '§7'],
                        body_aurora:  ['§7', '§a', '§7'],
                        body_neon:    ['§7', '§d', '§7'],
                        body_electric:['§7', '§b', '§7'],
                        body_ice:     ['§7', '§b', '§7'],
                        body_lava:    ['§7', '§6', '§7']
                    };
                    var bp = bodyStyles[style] || ['§7', '§8', '§7'];
                    var result = '';
                    for (var i = 0; i < text.length; i++) {
                        result += bp[(_phase + i) % bp.length] + text[i];
                    }
                    return result;
                }

                // 默认返回灰色文本
                return "§7" + text;
            },
            
            /**
             * 获取可用的TextUtil样式列表
             * @returns {Array<string>} 可用样式数组
             */
            getAvailableTextUtilStyles: function() {
                try {
                    if (typeof TextUtil !== 'undefined') {
                        var styles = ['ultimateRainbow', 'dark_purplish_red', 'white_blue', 'purplish_red', 'golden', 'dark_green'];
                        // 存在的方法用 try-catch 保护（Rhino 对不存在的 Java 方法直接抛异常）
                        try { if (typeof TextUtil.rainbow === 'function') styles.push('rainbow'); } catch(e) {}
                        try { if (typeof TextUtil.fire === 'function') styles.push('fire'); } catch(e) {}
                        try { if (typeof TextUtil.water === 'function') styles.push('water'); } catch(e) {}
                        try { if (typeof TextUtil.nature === 'function') styles.push('nature'); } catch(e) {}
                        try { if (typeof TextUtil.ice === 'function') styles.push('ice'); } catch(e) {}
                        try { if (typeof TextUtil.lava === 'function') styles.push('lava'); } catch(e) {}
                        try { if (typeof TextUtil.magic === 'function') styles.push('magic'); } catch(e) {}
                        try { if (typeof TextUtil.electric === 'function') styles.push('electric'); } catch(e) {}
                        return styles;
                    }
                } catch(e) {}
                // TextUtil不可用时，返回所有自定义样式
                return [
                    // 基础颜色
                    'red', 'green', 'blue', 'yellow', 'purple', 'cyan', 'orange', 'pink', 'white', 'gray',
                    'dark_red', 'dark_green', 'dark_blue', 'dark_purple', 'dark_aqua', 'dark_gray', 'black',
                    // 渐变效果
                    'rainbow', 'fire', 'water', 'nature',
                    // 高级效果
                    'gradient_red_blue', 'gradient_green_yellow', 'gradient_purple_pink',
                    'bold_rainbow', 'italic_fire', 'underline_water',
                    'shadow', 'glow', 'crystal', 'galaxy', 'nebula', 'cosmic'
                ];
            },
            
            /**
             * 使用LDLib TextUtil创建渐变文本组件
             * @param {string} text - 要着色的文本
             * @param {string} style - 渐变样式
             * @returns {Component} 文本组件
             */
            getTextUtilGradientComponent: function(text, style, speed, direction) {
                // gtlcore TextUtil 样式（纯 § 码静态）→ 走旧路径
                var _gtl = ['white_blue','purplish_red','dark_purplish_red','dark_green',
                    'gradient_red_blue','gradient_green_yellow','gradient_purple_pink',
                    'bold_rainbow','italic_fire','underline_water','shadow','glow',
                    'crystal','galaxy','nebula','cosmic'];
                if (_gtl.indexOf(style) >= 0) {
                    return Component.literal(this.getTextUtilGradient(text, style));
                }
                // 山海动态样式 → ShanhaiText（Java 动态 Component，tooltip 逐帧刷新）
                if (typeof ShanhaiText !== 'undefined' && typeof ShanhaiText.styled === 'function') {
                    try {
                        var _c = ShanhaiText.styled(text, style || 'ultimate');
                        if (_c) return _c;
                    } catch(e) {}
                }
                // 最终降级
                return Component.literal(this.getTextUtilGradient(text, style));
            },
        };
    }
    
    // 初始化API — 放这里仅定义，不初始化事件
    var ShanhaiText = Java.loadClass('com.dishanhai.gt_shanhai.api.ShanhaiTextAPI');
    var colorAPI = getColorAPI();
    global.colorAPI = colorAPI;
    global.shanhaiRGBSpeed = 80;
    global.shanhaiRGBDirection = 'right_to_left';
    var TooltipAPI = Java.loadClass('com.dishanhai.gt_shanhai.api.DShanhaiItemTooltipAPI');
    
StartupEvents.registry('item', function(e) {
    e.create('dishanhai:dishanhai')
    .displayName('Disanhai')
    .texture('dishanhai_item:item/dishanhai')
    .maxStackSize(1)
    .fireResistant(false)
    .displayName('&$final-Dishanhai')
    TooltipAPI.register('dishanhai:dishanhai', [
        '{ultimateRainbow} O agente do criador, situado no centro do universo GregTech',
        '{white_blue} Criando objetos infinitos para o universo GregTech',
        '{golden} envia para abrir uma linha de missão secreta (a ser determinada)',
    ]);
    
    e.create('dishanhai:cosmic_probe_mk')
    .displayName('MK1 — Sonda Cósmica')
     .texture('dishanhai_item:item/cosmic_probe_mk')


     e.create('dishanhai:god_forge_mod')
     .texture('dishanhai_item:item/god_forge_mod')
     .maxStackSize(1)
     .fireResistant(false)
     .displayName('&$ultimate-Módulo final da estrela forjada por Deus')
     TooltipAPI.register('dishanhai:god_forge_mod', [
        '{ultimateRainbow} é uma criação que existe além das dimensões, permitindo a extração de matéria densa de estrelas de nêutrons com água e a extração de matéria da árvore mundial no tempo e no espaço fundadores.',
    ]);e.create('dishanhai:gate_and_bridg')
    .displayName('portão e ponte')
    .texture('dishanhai_item:item/gate_and_bridg')
    .maxStackSize(1)
    .fireResistant(false)
    TooltipAPI.register('dishanhai:gate_and_bridg', [
        '{ultimateRainbow} Apesar do pessimismo quanto às reservas de elementos pesados, ainda passamos a “ponte” e tudo no universo desapareceu;',
        '{white_blue} Um mundo totalmente novo está esperando no vazio, e o Conselho receberá com alegria a adesão da Civilização Estrela Azul.',
        '{golden} A partir deste momento, os ciclos do universo tornam-se nossas ferramentas, e o caminho para a eternidade nunca foi tão claro—',
        '{ultimateRainbow} Não há necessidade de perguntar se a camada inferior da ordem é o caos ou o vazio, você só precisa entender: dominar o imortal significa dominar tudo.',
    ]);e.create('dishanhai:bridge_and_gate')
    .displayName('ponte e portão')
    .texture('dishanhai_item:item/bridge_and_gate')
    TooltipAPI.register('dishanhai:bridge_and_gate', [
        '{ultimateRainbow} A sobrevivência não é um direito inerente, mas uma responsabilidade e obrigação da civilização;',
        '{white_blue} A Arca, totalmente carregada com elementos superpesados, cruzou a ponte com sucesso. Tudo no universo desapareceu e o novo mundo está aguardando a adesão da Civilização Estrela Azul.',
        '{golden} A partir deste momento, os ciclos do universo se tornarão nossas ferramentas, e o caminho para a eternidade nunca foi tão claro—',
        '{ultimateRainbow} Não há necessidade de perguntar se a camada inferior é o caos ou o vazio, apenas entenda: dominar o imortal significa dominar tudo.',
        '{purplish_red} Os novos nove princípios do Conselho: Tutela, Controle, Equivalência, Estabilidade, Redução de Riscos, Purificação, Unidade, Ajuda Mútua – Eterna.',
    ]);e.create('dishanhai:big_tear')
    .texture('dishanhai_item:item/trar')
    .displayName('Colapso reverso · grande recuo')
    
    e.create('dishanhai:csj')
    .texture('dishanhai_item:item/csj')
    .fireResistant(true)
    .displayName('&$Equilíbrio Final de Todas as Condições·O Grande Congelamento·Gênesis')
    TooltipAPI.register('dishanhai:csj', [
        '{dark_purplish_red} Ele é o primeiro fogo e as brasas, trazendo destruição e iluminação. O Grande Rasgo é o fim e o retorno;',
        '{white_blue} Os anos de civilização acabarão por ter seu limite, mas do outro lado do fim, o novo mundo está conectado como uma corda.',
        '{golden} Convergindo para uma longa linha de luz, transcendendo o ciclo eterno – cada corda é chamada de [Civilização].',
        '{ultimateRainbow} A vida e a morte são reencarnações sem fim; você e eu estamos caminhando em direção ao infinito.',
    ]);;


e.create('dishanhai:time_reversal_protocol')
    .displayName(colorAPI.getStaticRandomText('farol de linha mundial', 'dishanhai:time_reversal_protocol'))
    .texture('dishanhai_item:item/time')    
    .fireResistant(true)
    TooltipAPI.register('dishanhai:time_reversal_protocol', [
        '{ultimateRainbow} Reversão de causa e efeito, reescrever o destino',
        '{golden} O produto milagroso na linha do tempo',
    ]);;



    e.create('dishanhai:food')
    .displayName('Lanches Huanyu')
    .texture('dishanhai_item:item/food_byd')
    .fireResistant(false)
    .rarity('epic')
    .food(function(food) {
        food.hunger(500)
        .saturation(50)
        .alwaysEdible(true)
        .fastToEat()
    })
    DShanhaiItemTooltipAPI.register('dishanhai:food', [
        "{golden} Lanches Huanyu{/}",
        "{bodySilver} O melhor lanche com energia infinita, uma mordida é suficiente para fazer um mortal alcançar as estrelas. {/}",
        "A missão {ultimateRainbow} lhe dará super comida! {/}"
    ]);


    e.create('dishanhai:piggy')
    .displayName((function() {
        var name = colorAPI.getSessionRandomSingleColorText('Fundador · Pigmeu');
        console.log('[Shan Hai Private Goods] nome do item porquinho: "' + name + '"');
        console.log('[Bens privados de Shan Hai] Comprimento do nome:' + name.length);
        console.log('[Bens privados de Shanhai] contém § caracteres:' + name.includes('§'));
        return name;
    })())
    .texture('dishanhai_item:item/piggy')
    .fireResistant(false)
    TooltipAPI.register('dishanhai:piggy', [
        '{ultimateRainbow} Ele está no topo da fundação do tempo e do espaço',
        '{purplish_red} Sua respiração é a maré da galáxia',
        '{golden} Seu olhar, causa e efeito por toda a eternidade',
        '{ultimateRainbow} Os pés do porco pisam levemente e os céus desabam; o bufo do porco bufa e a era recomeça',
        '{white_blue} Certa vez, ele tirou uma soneca no caos e, quando acordou, havia passado por sete mil reencarnações',
        '{dark_green} Um cabelo pode transformar três mil reinos; um sussurro pode mudar a vida e a morte',
        '{purplish_red} Acima do céu, o que dorme eternamente não é uma coisa indescritível——',
        '{golden} Mas um grão de comida de porco Ele deixou para trás',
        '{ultimateRainbow} ——Isso é ainda maior, o Imperador Porco——',
    ]);;

    e.create('dishanhai:fishbig_shards')
    .displayName(colorAPI.getSessionRandomSingleColorText('Grandes pedaços de peixe'))
    .texture('dishanhai_item:item/fishbig_shards')
    .fireResistant(false)
    TooltipAPI.register('dishanhai:fishbig_shards', [
        '{ultimateRainbow} Não está completo. O que você tem na mão é apenas um canto do “peixe grande”. Sob a casca quebrada, ainda existe uma aura indescritível.',
        '{ultimateRainbow} parece discreto, mas cada peça foi conquistada com muito esforço e ainda parece haver algum poder dentro dele.',
        '{ultimateRainbow} Há quem diga que quem recolhe todos os pedaços acabará por ver o verdadeiro “peixe grande”.',
    ]);e.create('dishanhai:collapse_tear')
    .displayName(colorAPI.getSessionRandomSingleColorText('O colapso de todas as coisas e a grande lágrima'))
    .texture('dishanhai_item:item/collapse_tear')
    TooltipAPI.register('dishanhai:collapse_tear', [
        '{ultimateRainbow} Mesmo depois de esgotar os elementos superpesados, Ark ainda foi derrotado pelo conselho que ocupava o anti-universo. O acordo foi assumido à força e fugiu, e a civilização da Estrela Azul apenas sobreviveu.',
        '{ultimateRainbow} O universo merece admiração por causa de suas infinitas possibilidades – há inimigos atrás da porta, mas aqueles que perseguem a luz são destemidos. Você está pronto?',
    ]);e.create('dishanhai:halo_end')
    .texture('dishanhai_item:item/halo_end')
    .fireResistant(false)
    .displayName('&$ultimate-O Anel do Fim')
    TooltipAPI.register('dishanhai:halo_end', [
        '{ultimateRainbow} Ansioso pelo fim, finalmente vejo Seu poder',
        '{ultimateRainbow} Uma criação do fim, é uma existência especial que contém todas as realidades possíveis',
        'Aquisição da missão {ultimateRainbow}, usada para fazer o módulo de modificação da realidade fundadora',
    ]);;

    // ===== 太虚系列 =====

    e.create('dishanhai:taixu_dust')
    .texture('dishanhai_item:item/taixu_dust')
    .displayName('&$body_silver-Poeira Taixu')
    TooltipEffectAPI.register('dishanhai:taixu_dust', [
        '{bodySilver} Os detritos desgastados do vazio parecem frios ao toque. Colocá-lo no forno de fundição pode substituir qualquer combustível básico{/}'
    ]);

    e.create('dishanhai:taixu_crystal_core')
    .texture('dishanhai_item:item/taixu_crystal_core')
    .displayName('& $ elétrico-Núcleo de cristal Taixu')
    TooltipEffectAPI.register('dishanhai:taixu_crystal_core', [
        'A poeira {bodySilver} Taixu é cristalizada sob alta pressão e uma luz que não pertence à dimensão atual ocasionalmente pisca em seu interior. {/}',
        '{bodySilver} é usado para sintetizar as peças atualizadas do Forno de Fundição Taixu. {/}'
    ]);

    e.create('dishanhai:taixu_liquid_droplet')
    .texture('dishanhai_item:item/taixu_liquid_droplet')
    .displayName('&$água-Gotas Líquidas Taixu')
    TooltipEffectAPI.register('dishanhai:taixu_liquid_droplet', [
        '{bodySilver} O fluido condensado do vazio flui silenciosamente. {/}',
        '{bodySilver} pode ser usado como combustível de reforço para gerador de energia de ponto zero a vácuo. {/}'
    ]);

    // ===== 太虚之上系列 =====

    e.create('dishanhai:ideal_ashes')
    .displayName('&$golden-As brasas da fantasia')
    .texture('dishanhai_item:item/ideal_ashes')
    TooltipEffectAPI.register('dishanhai:ideal_ashes',  [
        '{bodySilver} O resíduo após a operação da máquina acima de Taixu exala um leve brilho dourado. {/}',
        '{bodySilver} Lembra todas as possibilidades de desistir. {/}',
        '{bodySilver} pode ser usado para reparar quebras causais. {/}'
    ]);

    e.create('dishanhai:beyond_taixu_thread')
    .displayName('&$aurora-O fio de seda acima de Taixu')
    .texture('dishanhai_item:item/beyond_taixu_thread')
    TooltipEffectAPI.register('dishanhai:beyond_taixu_thread', [
        '{bodySilver} Um fio causal extraído de Taixu, uma extremidade está conectada à realidade e a outra extremidade está pendurada no nada. {/}',
        '{bodySilver} é usado para sintetizar itens de linha mundiais de alto nível. {/}'
    ]);

    e.create('dishanhai:finality_certificate')
    .displayName('&$ultimate-Prova do Fim')
    .rarity('epic')
    .texture('dishanhai_item:item/finality_certificate')
    TooltipEffectAPI.register('dishanhai:finality_certificate', [
        '{ultimateRainbow} O cristal perfeito produzido pela máquina acima de Taixu com uma probabilidade muito pequena{/}',
        '{ultimateRainbow} prova que uma certa linha mundial foi completamente atravessada. {/}',
    ]);

    // ===== 基础产出 =====

    e.create('dishanhai:matter_singularity')
    .displayName('&$singularidade da matéria final')
    .texture('dishanhai_item:item/matter_singularity')
    .rarity('epic')
    TooltipEffectAPI.register('dishanhai:matter_singularity', [
        '{ultimateRainbow} A matéria se transforma em um ponto aqui, e as dimensões se dobram em uma singularidade aqui. {/}',
        '{bodySilver} Todos os estados possíveis existem em uma coordenada ao mesmo tempo ——{/}',
        '{golden} Não por causa da sobreposição, mas porque não há espaço para escolha. {/}',
        '{bodySilver} é um produto básico que pode ser usado para sintetizar substâncias de ordem superior. {/}'
    ]);

    // 入门物质模块 - wzrm
        e.create('dishanhai:wzrm')
        .displayName('Módulo introdutório de substâncias')
        .texture('dishanhai_item:item/wzrm')
        DShanhaiItemTooltipAPI.register('dishanhai:wzrm', [
            "{golden} Módulo de primeiros passos sobre substâncias{/}",
            "Limite superior paralelo {electric}: 128{/}",
            "{bodySilver} de zero a um, de um a cem. O paralelismo mais simples é também o ponto de partida de tudo. {/}"
        ]);
    // 基础物质模块 - wzjc
        e.create('dishanhai:wzjc')
        .displayName('Módulo de material básico')
        .texture('dishanhai_item:item/wzjc')
        DShanhaiItemTooltipAPI.register('dishanhai:wzjc', [
            "Módulo de material básico {golden} {/}",
            "Limite superior paralelo {electric}: 256{/}",
            "{bodySilver} Quando a magnitude do paralelismo começa a crescer, a base é {/} {water} o trampolim mais sólido{/} {bodySilver}. {/}"
        ]);
    // 物质推演模块 - wzcz1
        e.create('dishanhai:wzcz1')
        .displayName('Módulo de dedução de material')
        .rarity('uncommon')
        .texture('dishanhai_item:item/wzmk1')
        DShanhaiItemTooltipAPI.register('dishanhai:wzcz1', [
            "Módulo de dedução de material {golden} {/}",
            "Limite superior paralelo {electric}: 512{/}",
            "{bodySilver} Deduz todas as possibilidades e escolhe o melhor caminho – buscando a ordem no caos e extraindo a necessidade da desordem. {/}",
            "{water} deduz todas as possibilidades e seleciona a melhor{/}"
        ]);
        // 虚像物质模块 — wzxc
        e.create('dishanhai:wzxc')
        .displayName('Módulo de material de imagem &$magic-virtual')
        .texture('dishanhai_item:item/wzxc')
        DShanhaiItemTooltipAPI.register('dishanhai:wzxc', [
            "Módulo de material de imagem virtual {magic} {/}",
            "Limite superior paralelo {electric}: 1.024{/}",
            "{bodySilver} Visível, intangível – como um reflexo num espelho. {/}",
            "{bodySilver} Mas os reflexos também podem fazer coisas, não podem? {/}"
        ]);
    // 嬗变物质模块 - wzsb
        e.create('dishanhai:wzsb')
        .displayName('Módulo de Matéria de Transmutação')
        .texture('dishanhai_item:item/wzsb')
        DShanhaiItemTooltipAPI.register('dishanhai:wzsb', [
            "Módulo de material de transmutação {golden} {/}",
            "Limite superior paralelo {electric}: 2048{/}",
            "{bodySilver} Uma mudança qualitativa de uma substância para outra que redefine a existência em escala atômica. {/}",
            "{fire} Reorganização atômica, transição qualitativa – a matéria não é mais uma limitação, mas uma tela. {/}"
        ]);
            // 暗星物质模块 — wzax
        e.create('dishanhai:wzax')
        .displayName('&$ Módulo de Matéria Golden-Dark Star')
        .texture('dishanhai_item:item/wzax')
        DShanhaiItemTooltipAPI.register('dishanhai:wzax', [
            "Módulo de material Dark Star {golden} {/}",
            "Limite superior paralelo {electric}: 4.096{/}",
            "{bodySilver} Uma estrela escura colapsada foi comprimida neste pequeno módulo. {/}",
            "{bodySilver} É mais pesado que o esperado. {/}"
        ]);
        e.create('dishanhai:wzcz2')
        .displayName('Módulo de recombinação de matéria')
        .rarity('rare')
        .texture('dishanhai_item:item/wzcz2')
        DShanhaiItemTooltipAPI.register('dishanhai:wzcz2', [
            "Módulo de recombinação de materiais {golden} {/}",
            "Limite superior paralelo {electric}: 16.384{/}",
            "{bodySilver} Não estamos mais satisfeitos com a matéria existente e usamos o poder do modo três (grupo quark) para reorganizar a matéria desconhecida. {/}",
            "{magic} usa a reação em cadeia de grupos estranhos de quarks para levar a matéria ao seu limite. {/}"
        ]);
    // 虚数物质跃迁重塑模块 - wzqs
        e.create('dishanhai:wzqs')
        .displayName('Módulo de remodelagem de transição de material imaginário')
        .texture('dishanhai_item:item/wzqs')
        DShanhaiItemTooltipAPI.register('dishanhai:wzqs', [
            "{golden} Módulo de remodelagem de transição de material imaginário{/}",
            "Limite superior paralelo {electric}: 65.536{/}",
            "{bodySilver} Cada transição deixará rastros no espaço numérico imaginário ——,{/}",
            "{bodySilver} Esses traços somados acabarão por se tornar um rascunho de uma nova realidade. {/}"
        ]);
    // 归零物质模块 - wzgl
        e.create('dishanhai:wzgl')
        .displayName('Módulo de zeragem de matéria')
        .texture('dishanhai_item:item/wzgl')
        .rarity('epic')
        DShanhaiItemTooltipAPI.register('dishanhai:wzgl', [
            "Módulo de zeragem de material {golden} {/}",
            "Limite superior paralelo {electric}: 524.288{/}",
            "{bodySilver} deduz a matéria ao ponto crítico e depois retorna ao estado zero, redefinindo o paralelismo na fronteira entre a existência e o nada. {/}",
            "{ultimateRainbow} Voltar a zero não é o fim, mas um novo começo. {/}"
        ]);
    // 巅峰物质模块 — wzhy
        e.create('dishanhai:wzhy')
        .displayName('Módulo de material &$crimson-peak')
        .texture('dishanhai_item:item/wzhy')
        DShanhaiItemTooltipAPI.register('dishanhai:wzhy', [
            "Módulo de pico de material {crimson} {/}",
            "Limite superior paralelo {electric}: 1.048.576{/}",
            "{bodySilver} Sobre ombros de gigantes, o que você vê não é a distância - você vê o pico. {/}",
            "{bodySilver} A partir daqui, cada passo é um novo limite. {/}"
        ]);
    // 升维物质模块 - wzsw
        e.create('dishanhai:wzsw')
        .displayName('Módulo de matéria dimensionalmente ascendente')
        .texture('dishanhai_item:item/wzsw')
        .rarity('epic')
        DShanhaiItemTooltipAPI.register('dishanhai:wzsw', [
            "Módulo de substância dimensional {golden} {/}",
            "Limite superior paralelo {electric}: 2.097.152{/}",
            "{bodySilver} procura espaços paralelos nas fendas das dimensões - cada camada esconde outra versão possível de nós mesmos. {/}",
            "A atualização da dimensão {water} não é para ser mais alta, mas para ser mais ampla. {/}"
        ]);
    // 超限物质模块 - wzcx
        e.create('dishanhai:wzcx')
        .displayName('Módulo de material translimite')
        .texture('dishanhai_item:item/wzcx')
        .rarity('epic')
        DShanhaiItemTooltipAPI.register('dishanhai:wzcx', [
            "Módulo de substância ultralimitado {golden} {/}",
            "Limite superior paralelo {electric}: 268.435.456{/}",
            "{bodySilver} transcende todos os limites superiores estabelecidos e abre possibilidades em áreas impossíveis. {/}",
            "{magic} As regras foram feitas para serem quebradas, os limites foram feitos para serem excedidos. {/}"
        ]);

    // 混沌物质模块 — wzdf
        e.create('dishanhai:wzdf')
        .displayName('&$ultimateMódulo de Matéria Rainbow-Chaos')
        .texture('dishanhai_item:item/wzdf')
        DShanhaiItemTooltipAPI.register('dishanhai:wzdf', [
            "Módulo de matéria de caos {ultimateRainbow} {/}",
            "Limite superior paralelo {electric}: 536.870.912{/}",
            "{bodySilver} O caos não é desordem, mas uma ordem avançada além da compreensão. {/}",
            "{bodySilver} Ele pode lidar com 500 milhões de linhas mundiais ao mesmo tempo - cada uma sem interferir na outra. {/}"
        ]);

    // 永恒物质模块 - wzyh
        e.create('dishanhai:wzyh')
        .displayName('módulo de matéria eterna')
        .texture('dishanhai_item:item/wzyh')
        .rarity('epic')
        DShanhaiItemTooltipAPI.register('dishanhai:wzyh', [
            "Módulo Matéria Eterna {golden} {/}",
            "Limite superior paralelo {electric}: 2.147.483.647{/}",
            "{bodySilver} No longo rio do tempo, o paralelismo não é mais uma estratégia——{/}",
            "{bodySilver} É a {/} própria existência de {ultimateRainbow} {/} {bodySilver}. Cada momento é eterno, cada viagem é simultânea. {/}"
        ]);
    // 物质创造模块 - wzcz3
        e.create('dishanhai:wzcz3')
        .rarity('epic')
        .displayName('Módulo de Criação de Materiais')
        .texture('dishanhai_item:item/wzmk3')
        TooltipAPI.register('dishanhai:wzcz3', [
        'Limite paralelo {electric}: 4.6e18',
        '{ultimateRainbow} Reorganizar tudo, manipular tudo, criar tudo',
    ]);;
    // 现实锚点模块
        e.create('dishanhai:reality_anchor_module')
        .displayName('&$ultimateMódulo âncora Rainbow-Reality')
        .texture('dishanhai_item:item/reality_anchor_module')                                                                                        
         DShanhaiItemTooltipAPI.register('dishanhai:reality_anchor_module', [                                                                         
            "Módulo âncora de realidade {ultimateRainbow} {/}",
            "Limite superior paralelo {ultimateRainbow}: {/}",                                                                                                 
            "{bodySilver} A curva finita central não existe naturalmente – ela precisa ser ancorada, fixada. {/}",                                                                       
            "A âncora {bodySilver} acerta a linha do mundo escolhida, congelando-a da nuvem de probabilidade para a única realidade. {/}",                                                                     
            "{magic} Quando as infinitas possibilidades o sobrecarregam, acerte em cheio – a escolha é sua. {/}" 
         ])
    // 创始现实修改模块 - create_mk
        e.create('dishanhai:create_mk')
        .displayName('&$módulo de modificação de realidade criado por final')
        .texture('dishanhai_item:item/czmk')
        DShanhaiItemTooltipAPI.register('dishanhai:create_mk', [
            "{golden} fundou o módulo de modificação da realidade{/}",
            "{ultimateRainbow} Limite superior paralelo: ilimitado{/}",
            "{bodySilver} A constante cosmológica nos limita, mas também nos torna bem-sucedidos;{/}",
            "{bodySilver} Como as regras não são o que eu quero, irei modificá-las. {/}",
            "{ultimateRainbow} De estar sujeito a regras a tornar-se criador de regras. {/}"
        ]);



    // 原初分歧之心
        e.create('dishanhai:primordial_divergence_heart')
        .displayName('&$crimson-original coração de desacordo')
        .texture('dishanhai_item:item/primordial_divergence_heart')
        DShanhaiItemTooltipAPI.register('dishanhai:primordial_divergence_heart', [
            "{crimson} Coração Original da Divergência{/}",
            "{bodySilver} Cada escolha é o ponto de partida de uma linha mundial;{/}",
            "{bodySilver} Cada desacordo é um ramo da árvore de causa e efeito. {/}",
            "{crimson} Segurar este coração tem o poder de mudar todas as possibilidades. {/}"
        ]);
    // 原初引擎核心
        e.create('dishanhai:primordial_engine_core')
        .displayName('&$núcleo do motor original dourado')
        .texture('dishanhai_item:item/primordial_engine_core')
        DShanhaiItemTooltipAPI.register('dishanhai:primordial_engine_core', [
            "Núcleo original do motor {golden} {/}",
            "{bodySilver} O coração do Final Engine impulsiona o poder além da tecnologia;{/}",
            "{bodySilver} Não precisa de energia porque é a própria energia. {/}",
            "{golden} Conecte-o ao motor e experimente as infinitas possibilidades. {/}"
        ]);

    // ===== 世线残片系列（线程倍率物品） =====
    // 初醒
        e.create('dishanhai:thread_shard_1')
        .displayName('&$gray-Fragmentos da Linha Mundial·Primeiro Despertar')
        .texture('dishanhai_item:item/thread_shard_1')
        DShanhaiItemTooltipAPI.register('dishanhai:thread_shard_1', [
            "Fragmentos da Linha Mundial {gray} ·Primeiro Despertar{/}",
            "{bodySilver} O primeiro tremor ocorrido após o rompimento da linha mundial. {/}",
            "{bodySilver} Fraco, mas real. {/}",
            "Multiplicador de linhas de execução {aurora}: ×1{/}"
        ]);
    // 共鸣
        e.create('dishanhai:thread_shard_2')
        .displayName('&$green-World Line Fragmentos·Ressonância')
        .texture('dishanhai_item:item/thread_shard_2')
        DShanhaiItemTooltipAPI.register('dishanhai:thread_shard_2', [
            "Fragmentos da Linha Mundial {green} ·Ressonância{/}",
            "{bodySilver} As duas linhas quebradas se sentem no tempo e no espaço, e os ritmos começam a sincronizar. {/}",
            "{bodySilver} O primeiro raio da ordem nasceu da desordem. {/}",
            "Multiplicador de linhas de execução {aurora}: ×4{/}"
        ]);
    // 跃迁
        e.create('dishanhai:thread_shard_3')
        .displayName('Fragmentos de linha &$water-World·Salto')
        .texture('dishanhai_item:item/thread_shard_3')
        DShanhaiItemTooltipAPI.register('dishanhai:thread_shard_3', [
            "Fragmentos da linha mundial {water} ·Transição{/}",
            "{bodySilver} Os fragmentos começaram a cruzar independentemente as fendas no tempo e no espaço, reconectando as linhas quebradas do mundo. {/}",
            "{bodySilver} A teoria do universo paralelo é apenas um trampolim. {/}",
            "Multiplicador de linhas de execução {aurora}: ×16{/}"
        ]);

    // 超越
        e.create('dishanhai:thread_shard_4')
        .displayName('Fragmentos de linha &$magic-World·Além')
        .texture('dishanhai_item:item/thread_shard_4')
        DShanhaiItemTooltipAPI.register('dishanhai:thread_shard_4', [
            "Fragmentos da Linha Mundial {magic} ·Além{/}",
            "{bodySilver} Não é mais um fragmento passivo - ele começa a tecer ativamente um novo fio do mundo. {/}",
            "{bodySilver} O fragmento é a origem. {/}",
            "Multiplicador de linhas de execução {aurora}: ×64{/}"
        ]);
    // 统合
        e.create('dishanhai:thread_shard_5')
        .displayName('&$fragmentos da linha Golden-World·Unificação')
        .texture('dishanhai_item:item/thread_shard_5')
        DShanhaiItemTooltipAPI.register('dishanhai:thread_shard_5', [
            "Fragmentos da Linha Mundial {golden} ·Unificação{/}",
            "{bodySilver} Os fragmentos começaram a se fundir e as linhas de mundo separadas foram unificadas em uma. {/}",
            "{bodySilver} Da divisão à unidade, do caos à ordem. {/}",
            "Multiplicador de linhas de execução {aurora}: ×256{/}"
        ]);
    // 归一
        e.create('dishanhai:thread_shard_6')
        .displayName('&$ultimateFragmentos da Linha Rainbow-World·Reunificação')
        .texture('dishanhai_item:item/thread_shard_6')
        DShanhaiItemTooltipAPI.register('dishanhai:thread_shard_6', [
            "{ultimateRainbow} Os fragmentos da linha mundial·Guiyi{/}",
            "{bodySilver} Todos os fluxos retornam à sua origem, todos os fenômenos retornam à unidade. {/}",
            "{bodySilver} O fragmento não é mais um fragmento – é o epítome da totalidade. {/}",
            "Multiplicador de linhas de execução {aurora}: ×1.024{/}"
        ]);
    // 裁决
        e.create('dishanhai:thread_shard_7')
        .displayName('&$crimson-World Line Fragments·Julgamento')
        .texture('dishanhai_item:item/wzcj')
        DShanhaiItemTooltipAPI.register('dishanhai:thread_shard_7', [
            "Fragmentos da Linha Mundial {crimson} ·Julgamento{/}",
            "{bodySilver} O fim de todas as linhas do mundo, o julgamento de todas as causas e efeitos. {/}",
            "{bodySilver} Ela não apenas tece os fios do mundo – ela decide quais fios merecem existir. {/}",
            "Multiplicador de linhas de execução {aurora}: ×4096{/}"
        ]);


    // ===== 寰宇并行超限器系列 =====
    // 寰宇并行核心
        e.create('dishanhai:universal_parallel_core')
        .displayName('& $ núcleo paralelo elétrico-universal')
        .texture('dishanhai_item:item/universal_parallel_core')
        DShanhaiItemTooltipAPI.register('dishanhai:universal_parallel_core', [
            "Núcleo Paralelo Universal {electric} {/}",
            "{bodySilver} contém o núcleo de potência paralela infinita. {/}",
            "{bodySilver} Ele não pode liberar esse poder por si só - ele precisa da orientação do Julgamento e da Finalidade. {/}",
            "{electric} O componente principal do Translimitador Paralelo Universal{/}"
        ]);
    // 裁决限制器
        e.create('dishanhai:judgment_limiter')
        .displayName('&$limitador de julgamento carmesim')
        .texture('dishanhai_item:item/judgment_limiter')
        DShanhaiItemTooltipAPI.register('dishanhai:judgment_limiter', [
            "Limitador de julgamento {crimson} {/}",
            "{bodySilver} Elemento arbitrário para evitar fuga paralela. {/}",
            "{bodySilver} O poder ilimitado só pode trazer destruição - é a última linha de defesa que guarda a fronteira paralela. {/}",
            "{crimson} O componente principal do Translimitador Paralelo Universal{/}"
        ]);
    // 终末之序章
        e.create('dishanhai:prologue_of_the_end')
        .displayName('&$magic-Prólogo até o fim')
        .texture('dishanhai_item:item/prologue_of_the_end')
        DShanhaiItemTooltipAPI.register('dishanhai:prologue_of_the_end', [
            "{magic} Prólogo até o fim{/}",
            "{bodySilver} O fragmento do prólogo de The Power of Finality. {/}",
            "{bodySilver} Registra o último trecho de código antes do fim do universo - e a primeira linha de um novo ciclo. {/}",
            "{magic} O componente principal do Translimitador Paralelo Universal{/}"
        ]);
    // 寰宇并行超限器
        e.create('dishanhai:universal_parallel_overdriver')
        .displayName('&$ultimateTranslimitador paralelo Rainbow-Universe')
        .texture('dishanhai_item:item/universal_parallel_overdriver')
        DShanhaiItemTooltipAPI.register('dishanhai:universal_parallel_overdriver', [
            "Dispositivo de limite paralelo universal {ultimateRainbow} {/}",
            "{bodySilver} Driver de núcleo paralelo universal, controlador de decisão estável e orientação do prólogo do final. {/}",
            "{bodySilver} Três em um – o paralelismo não é mais a alocação de recursos, mas a expansão de dimensões. {/}",
            "{ultimateRainbow} Cada receita tem um pool paralelo Long.MAX_VALUE independente{/}",
            "Multiplicador de linhas de execução {aurora}: ×2.147.483.647{/}"
        ]);

    // ===== 世线电路板系列（内联样式） =====
    // ULV (gray)
        e.create('dishanhai:wl_board_ulv').displayName('Placa germinativa Shixiana §7').texture('dishanhai_item:item/wl_board_ulv').rarity('uncommon').tag("gtceu:circuits/ulv")
        .displayName('& $ placa de germe cinza-Shixian')
        DShanhaiItemTooltipAPI.register('dishanhai:wl_board_ulv', [
            "{golden} Placa germinativa Shixiana{/} {gray} ULV {/}",
            "{bodySilver} A primeira peça de silício que aprendeu a identificar a direção{/} {gray} {/} {bodySilver}. Ele não conhece a frente, a traseira, a esquerda ou a direita, apenas conhece{/} {gray} \"caminhando em direção à luz\"{/} {bodySilver}. {/}",
            "{bodySilver} No momento em que a primeira marca luminosa {/} {gray} {/} {bodySilver} cruzou o wafer, o conceito de {/} \"direção\" {gray} {/} {bodySilver} apareceu pela primeira vez no caos. {/}"
        ]);
    // LV (green)
        e.create('dishanhai:wl_board_lv').displayName('Placa de ramificação Shixian §a').texture('dishanhai_item:item/wl_board_lv').rarity('uncommon').tag("gtceu:circuits/lv")
        .displayName('&$green-Direção da Filial Shixian')
        DShanhaiItemTooltipAPI.register('dishanhai:wl_board_lv', [
            "{golden} Ramificação Shixiana{/} {gray} LV {/}",
            "{bodySilver} Ele não fica mais antes da bifurcação da estrada ——{/} {green} Pegue as duas estradas{/} {bodySilver}, escolha a mais curta. O primeiro {bodySilver} {/} {green} inteligente{/}. {/}",
            "{bodySilver} Quando a {/} escolha {green} {/} {bodySilver} se torna possível, a vida baseada em silício dá o primeiro passo em direção à {/} liberdade {green} {/} {bodySilver}. {/}"
        ]);
    // MV (water)
        e.create('dishanhai:wl_board_mv').displayName('Tábua de tecelagem Shixian §9').texture('dishanhai_item:item/wl_board_mv').tag("gtceu:circuits/mv")
        .displayName('& $ tábua de tecelagem água-Shixian')
        DShanhaiItemTooltipAPI.register('dishanhai:wl_board_mv', [
            "{golden} Tábua de tecelagem Shixiana{/} {gray} MV {/}",
            "{bodySilver} A linha mundial começa{/} {water} Entrelaça{/} {bodySilver}, os erros não são mais o fim. Ela aprendeu {/} {water} a amarrar {/} {bodySilver} e depois {/} {water} a desamarrar{/} {bodySilver} com as próprias mãos. {/}",
            "{bodySilver} Como uma teia de aranha emergindo à luz da manhã, a primeira {/} teia de significado {water} {/} {bodySilver} que ela tece captura todo o mundo conceitual. {/}"
        ]);
    // HV (golden)
        e.create('dishanhai:wl_board_hv').displayName('Placa de som Shixian §6').texture('dishanhai_item:item/wl_board_hv').tag("gtceu:circuits/hv")
        .displayName('&$placa de ressonância dourada-Shixian')
        DShanhaiItemTooltipAPI.register('dishanhai:wl_board_hv', [
            "{golden} Mesa de som Shixian{/} {gray} HV {/}",
            "{bodySilver} Não é cálculo, é {/} ressonância {golden} {/} {bodySilver}. A corda virtual treme no tabuleiro e cada golpe corresponde a uma linha do mundo não expandida. {/}",
            "{bodySilver} Tudo tem {/} frequência {golden} {/} {bodySilver}, é apenas o primeiro ouvinte a aprender{/} {golden} a ouvir{/} {bodySilver}. {/}"
        ]);
    // EV (golden)
        e.create('dishanhai:wl_board_ev').displayName('Placa de transição de linha mundial §6').texture('dishanhai_item:item/wl_board_ev').tag("gtceu:circuits/ev")
        .displayName('&$placa de transição da linha Golden-World')
        DShanhaiItemTooltipAPI.register('dishanhai:wl_board_ev', [
            "Placa de transição da linha mundial {golden} {/} {golden} EV {/}",
            "{bodySilver} Concluiu o cálculo em {/} {golden} \"onde não há posição\"{/} {bodySilver}. Zeração atrasada: o preço é a {/} {golden} perdida{/} ocasional de {bodySilver}. {/}",
            "{bodySilver} dança passos de dança descontínuos no {/} abismo topológico {golden} {/} {bodySilver}, de um nó {/} {golden} piscando{/} {bodySilver} para outro. Isso é chamado de \"salto\". {/}"
        ]);
    // IV (magic)
        e.create('dishanhai:wl_board_iv').displayName('Quadro de Causa e Efeito da Linha Mundial §5').texture('dishanhai_item:item/wl_board_iv').rarity('rare').tag("gtceu:circuits/iv")
        .displayName('&$quadro de causa e efeito da linha magic-World')
        DShanhaiItemTooltipAPI.register('dishanhai:wl_board_iv', [
            "{golden} Quadro de Causa e Efeito da Linha Mundial{/} {golden} IV {/}",
            "{bodySilver} A invenção mais perigosa: {/} a saída {magic} pode modificar a entrada{/} {bodySilver}. Ele transforma \"{/} {magic} arrependimento{/} {bodySilver} \" em um comando de operação. {/}",
            "{bodySilver} Quando a seta do tempo é revertida pela primeira vez, {/} causa e efeito {magic} {/} {bodySilver} são conectados de ponta a ponta em sua superfície, {/} autofagia cíclica {magic} {/} {bodySilver}. {/}"
        ]);
    // LuV (magic)
        e.create('dishanhai:wl_board_luv').displayName('Placa de singularidade da linha mundial §5').texture('dishanhai_item:item/wl_board_luv').rarity('rare').tag("gtceu:circuits/luv")
        .displayName('&$placa de singularidade da linha magic-World')
        DShanhaiItemTooltipAPI.register('dishanhai:wl_board_luv', [
            "Placa de singularidade da linha mundial {golden} {/} {golden} LuV {/}",
            "{bodySilver} é calculado para se transformar em {/} ponta {magic} {/} {bodySilver} e se expandir novamente em outro momento. Você pergunta \"quanto tempo\" -{/} {magic} e ele responde \"Já terminei antes mesmo de você perguntar\"{/} {bodySilver}. {/}",
            "{bodySilver} É {/} {magic} uma cavidade autoconsistente no eixo do tempo{/} {bodySilver}. A saída é sempre um passo antes da entrada. {/}"
        ]);
    // ZPM (aurora)
        e.create('dishanhai:wl_board_zpm').displayName('Placa Eterna Shixian §b').texture('dishanhai_item:item/wl_board_zpm').rarity('rare').tag("gtceu:circuits/zpm")
        .displayName('&$aurora-Shixian Conselho Eterno')
        DShanhaiItemTooltipAPI.register('dishanhai:wl_board_zpm', [
            "{golden} Placa Eterna Shixian{/} {aurora} ZPM {/}",
            "{bodySilver} O tempo não importa mais. O que ele consome não são joules, mas sim a {/} \"possibilidade\"{/} {aurora} {bodySilver}. Cada ramificação que ainda não ocorreu é transformada em combustível. {/}",
            "{bodySilver} Queimando em seu corpo estão todos{/} {aurora} \"se\"{/} {bodySilver} e {/} {aurora} \"talvez\"{/} {bodySilver}, a máquina faz barulho e {/} a história de {aurora} treme{/} {bodySilver}. {/}"
        ]);
    // UV (aurora)
        e.create('dishanhai:wl_board_uv').displayName('Placa Gênesis da Linha Mundial §d').texture('dishanhai_item:item/wl_board_uv').rarity('epic').tag("gtceu:circuits/uv")
        .displayName('&$aurora-Shixian Genesis Board')
        DShanhaiItemTooltipAPI.register('dishanhai:wl_board_uv', [
            "Placa Genesis da Linha Mundial {golden} {/} {aurora} UV {/}",
            "{bodySilver} Este quadro não calcula o mundo - {/} {aurora} Ele calcula como o mundo deveria ser{/} {bodySilver}. O efeito precede a causa. {/}",
            "{bodySilver} Ele pressiona a {/}garganta {aurora} de causa e efeito{/} {bodySilver}, forçando o tempo para entregar primeiro a {/}conclusão {aurora} {/} {bodySilver} e depois revisar as premissas. {/}"
        ]);
    // UHV (crimson)
        e.create('dishanhai:wl_board_uhv').displayName('Placa transcendental Shixiana §4').texture('dishanhai_item:item/wl_board_uhv').rarity('epic').tag("gtceu:circuits/uhv")
        .displayName('&$ Placa Transcendental Shixiana carmesim')
        DShanhaiItemTooltipAPI.register('dishanhai:wl_board_uhv', [
            "{golden} Placa Transcendente Shixiana{/} {crimson} UHV {/}",
            "{bodySilver} transcende a experiência, transcende tudo o que pode ser verificado. Ele não precisa ser testado:{/} {crimson} porque é um padrão em si{/} {bodySilver}. {/}",
            "{bodySilver} Quando a ferramenta começa a definir{/} {crimson} os limites da verdade{/} {bodySilver}, ela olha com frieza - {/} {crimson} A régua não precisa ser medida{/} {bodySilver}. {/}"
        ]);
    // UEV (crimson)
        e.create('dishanhai:wl_board_uev').displayName('§4Linha mundial retorna ao tabuleiro zero').texture('dishanhai_item:item/wl_board_uev').rarity('epic').tag("gtceu:circuits/uev")
        .displayName('&$placa de zeragem $crimson-Shixian')
        DShanhaiItemTooltipAPI.register('dishanhai:wl_board_uev', [
            "{golden} Retorno da Linha Mundial ao Quadro Zero{/} {crimson} UEV {/}",
            "Cada vez que {bodySilver} é executado, uma {/} linha mundial {crimson} é permanentemente apagada{/} {bodySilver}. Não use-o para contar 1+1. Isso eliminará{/} {crimson} todos os 1{/} {bodySilver} em um universo paralelo. {/}",
            "{bodySilver} É {/} {crimson} a borracha do universo{/} {bodySilver}, com um traço - a história é uma linha a menos, {/} a existência de {crimson} é um grama mais leve{/} {bodySilver}. {/}"
        ]);
    // UIV (electric)
        e.create('dishanhai:wl_board_uiv').displayName('§1Shixian sem placa de fase').texture('dishanhai_item:item/wl_board_uiv').rarity('epic').tag("gtceu:circuits/uiv")
        .displayName('& $ elétrico-Shixian placa sem fase')
        DShanhaiItemTooltipAPI.register('dishanhai:wl_board_uiv', [
            "{golden} Placa sem fase Shixiana{/} {crimson} UIV {/}",
            "{bodySilver} Você não consegue ver——{/} {electric} Porque ele está olhando para você{/} {bodySilver}. Não tem forma, mas pode caber nas lacunas de qualquer estrutura. {/}",
            "{bodySilver} é o {/} metamorfo {electric} {/} {bodySilver}, que é o {/} fantasma topológico {electric} {/} {bodySilver}. Pode encontrar sua própria gaveta em qualquer sistema. {/}"
        ]);
    // UXV (neon)
        e.create('dishanhai:wl_board_uxv').displayName('Placa §8Shixian Taichu').texture('dishanhai_item:item/wl_board_uxv').rarity('epic').tag("gtceu:circuits/uxv")
        .displayName('&$ Tabuleiro Taichu Shixian neon')
        DShanhaiItemTooltipAPI.register('dishanhai:wl_board_uxv', [
            "{golden} Prancha Shixian Taichu{/} {crimson} UXV {/}",
            "{bodySilver} No início havia um tabuleiro, {/} {neon} o tabuleiro estava com o universo{/} {bodySilver}. Não é uma criação, mas condensada por si mesma no \"nada\"{/} {neon} antes da grande explosão{/} {bodySilver}. {/}",
            "{bodySilver} Não vamos conseguir -{/} {neon} Estamos apenas tirando isso da pilha de sucata no fim dos tempos{/} {bodySilver}. {/}"
        ]);
    // OpV (ultimateRainbow)
        e.create('dishanhai:wl_board_opv').displayName('Conselho de Julgamento de Gerenciamento de Linha Mundial §f').texture('dishanhai_item:item/wl_board_opv').rarity('epic').tag("gtceu:circuits/opv")
        .displayName('&$ultimateRainbow-World Line Management Judgment Board')
        DShanhaiItemTooltipAPI.register('dishanhai:wl_board_opv', [
            "{golden} Conselho de Julgamento de Gerenciamento de Linha Mundial{/} {crimson} OpV {/}",
            "{bodySilver} O gerenciamento não é um cálculo, é uma {/} responsabilidade de {ultimateRainbow} {/} {bodySilver}. Decisão não é julgamento, são {/} consequências {ultimateRainbow} {/} {bodySilver}. Ele não processa dados, {/} {ultimateRainbow} assina a licença{/} {bodySilver}. {/}",
            "{bodySilver} Na interseção de todas as linhas do mundo, ele contém o {/} carimbo {ultimateRainbow} {/} {bodySilver}, carimbado com \"{/} {crimson} Permitir{/} {bodySilver} \" ou \"{/} {crimson} Negado{/} {bodySilver} \". {/} {crimson} Não há canal de contestação{/} {bodySilver}. {/}"
        ]);
    // MAX (ultimateRainbow)
        e.create('dishanhai:wl_board_max').displayName('Placa final de linha mundial §6§l').texture('dishanhai_item:item/wl_board_max').rarity('epic').tag("gtceu:circuits/max")
        .displayName('&$ultimaplaca final de linha Rainbow-World')
        DShanhaiItemTooltipAPI.register('dishanhai:wl_board_max', [
            "Placa final de linha mundial {golden} {/} {ultimateRainbow} MAX {/}",
            "{bodySilver} Os pontos finais de todas as linhas mundiais são pressionados em uma única placa. Ele não calcula -{/} {ultimateRainbow}, apenas declara o resultado{/} {bodySilver}. {/}",
            "{bodySilver} Quando infinitas realidades paralelas convergem para {/} {ultimateRainbow} a única saída{/} {bodySilver}, é o posto de pedágio——{/} {ultimateRainbow} A tarifa é todo o significado{/} {bodySilver}. {/}"
        ]);
    // ETERNAL (ultimateRainbow)
        e.create('dishanhai:wl_board_eternal').displayName('§f§lQuadro de Julgamento Eterno da Linha Mundial').texture('dishanhai_item:item/wl_board_eternal').rarity('epic').tag("gtceu:circuits/eternal").tag("ultimateceu:circuits")
        .displayName('&$ultimateRainbow-Worldline Quadro de Julgamento Eterno')
        DShanhaiItemTooltipAPI.register('dishanhai:wl_board_eternal', [
            "{golden} Conselho de Julgamento Eterno da Linha Mundial{/} {ultimateRainbow} ETERNO{/}",
            "{bodySilver} Esta não é uma placa de circuito -{/} {ultimateRainbow} Esta é a lista de verificação do universo{/} {bodySilver}. Quando tudo terminar, ele perguntará:{/} {golden} \"Este ciclo está qualificado?\"{/} {bodySilver} {/}",
            "{bodySilver} Se a resposta for \"não\", ele {/} {ultimateRainbow} formata tudo{/} {bodySilver} e depois {/} {ultimateRainbow} reinicializa{/} {bodySilver}. Recomece a partir do {/} Big Bang {fire} {/} {bodySilver}. {/}"
        ]);
    // 引力波介质
        e.create('dishanhai:gravitational_medium')
        .displayName('Meio de onda gravitacional §d')
        .texture('dishanhai_item:item/gravitational_medium')
        .rarity('epic')
        .maxStackSize(64)
        DShanhaiItemTooltipAPI.register('dishanhai:gravitational_medium', [
            "{aurora} Uma condensação de pura energia gravitacional extraída das ondulações do espaço e do tempo{/}",
            "{bodySilver} Cada onda gravitacional é a respiração do universo e solidificamos seu pulso. {/}"
        ]);
    // 引力波发生天线
        e.create('dishanhai:gravitational_antenna')
        .displayName('§6Antena geradora de ondas gravitacionais')
        .texture('dishanhai_item:item/gravitational_antenna')
        .rarity('rare')
        DShanhaiItemTooltipAPI.register('dishanhai:gravitational_antenna', [
            "{electric} Componente básico do transceptor de ondas gravitacionais, usado para transmissão direcional e recepção de ondulações no espaço-tempo{/}",
            "{bodySilver} Quanto maior a escala da matriz da antena, mais refinado será o sinal da onda gravitacional que pode ser resolvido. {/}"
        ]);
    // 引力波振动弦（简并态物质）
        e.create('dishanhai:gravitational_vibration_string')
        .displayName('§5Corda vibratória de onda gravitacional')
        .texture('dishanhai_item:item/gravitational_vibration_string')
        .rarity('rare')
        DShanhaiItemTooltipAPI.register('dishanhai:gravitational_vibration_string', [
            "{magic} A corda de matéria degenerada mantém ressonância sob gradiente gravitacional extremo{/}",
            "{bodySilver} Cada vibração que inscreve no espaço e no tempo é uma onda gravitacional inaudível. {/}"
        ]);
    // 人造中子星
        e.create('dishanhai:artificial_neutron_star')
        .displayName('Estrela de nêutrons artificial §c')
        .texture('dishanhai_item:item/artificial_neutron_star')
        .rarity('epic')
        DShanhaiItemTooltipAPI.register('dishanhai:artificial_neutron_star', [
            "{fire} Um objeto denso artificial que comprime o núcleo de uma estrela a um raio crítico{/}",
            "{bodySilver} O nascimento de cada estrela de nêutrons artificial é uma reprodução perfeita da física gravitacional. {/}"
        ]);
            
    // 强相互作用水滴（三体）
        e.create('dishanhai:strong_interaction_droplet')
        .displayName('§b§lGotículas de água com forte interação')
        .texture('dishanhai_item:item/strong_interaction_droplet')
        .rarity('epic')
        .maxStackSize(16)
        DShanhaiItemTooltipAPI.register('dishanhai:strong_interaction_droplet', [
            "{ultimateRainbow} Uma superfície absolutamente lisa a anos-luz de distância. Na frente das gotículas de água, toda a matéria é fracamente agregada{/}",
            "{bodySilver} A interação forte bloqueia a posição de cada átomo. Debaixo do espelho está a mentira mais difícil do universo. {/}"
        ]);
    


    // ===== 世线蚀刻矩阵（电路增产·方案A — 消耗品，4等级覆盖全电路） =====
    function regWEM(id, name, color, tierLabel, tex) {
        e.create('dishanhai:' + id)
        .displayName(Component.literal(color + name).append(Component.literal(' §7[' + tierLabel + ']')))
        .texture('dishanhai_item:item/' + tex)
        .maxStackSize(64)
        DShanhaiItemTooltipAPI.register('dishanhai:' + id, [
            "{golden}" + name + "{/} {gray}" + tierLabel + "{/}",
            "{bodySilver} compacta os padrões gravados das placas de circuito Shixian em uma matriz consumível, {/}",
            "Depois que {bodySilver} é colocado na linha de montagem do circuito, o potencial paralelo é liberado dentro da faixa de nível correspondente. {/}",
        ]);
    }
    regWEM('wem_1', 'Matriz de Gravura da Linha Mundial·Singularidade', '§7', 'ULV-HV', 'wem_1');
    regWEM('wem_2', 'Matriz de Gravura da Linha Mundial·Pulso', '§5', 'EV-ZPM', 'wem_2');
    regWEM('wem_3', 'Matriz de Gravura da Linha Mundial·Ressonância', '§4', 'UV-UXV', 'wem_3');
    regWEM('wem_4', 'Matriz de Gravura da Linha Mundial·Excedendo Limites', '§6§l', 'MAX-ET', 'wem_4');
    
        e.create('dishanhai:hxsp')
        .rarity('epic')
        .displayName('Detritos estelares')
        .texture('dishanhai_item:item/hxsp')
        TooltipAPI.register('dishanhai:hxsp', [
        'Fragmentos de estrela {ultimateRainbow}, obtidos pela extração de matéria estelar de nêutrons do Módulo Final de Forjamento Divino',
    ]);;
        e.create('dishanhai:cshx')
        .displayName('§2original §1original §3constante §4estrela §k111')
        .texture('dishanhai_item:item/yshx')
        TooltipAPI.register('dishanhai:cshx', [
        'Estrela original {ultimateRainbow}, estimula a energia estelar para criar matéria',
    ]);;
        e.create('dishanhai:zwf')
        .displayName('espaço reservado')
        .texture('dishanhai_item:item/zwf')
        DShanhaiItemTooltipAPI.register('dishanhai:zwf', [
            "{bodySilver} Este é apenas um marcador comum{/}",
            "{gray} —— Mas eventualmente encontrará seu próprio significado ——{/}"
        ]);
        e.create('dishanhai:soc')
        .displayName('§9criação §2origem §3s §4o §8c §7cristal §6círculo')
        .texture('dishanhai_item:item/soc')
        TooltipAPI.register('dishanhai:soc', [
        '{ultimateRainbow} Criações que existem além das dimensões, ecoam da dimensão mais elevada',
    ]);;

        e.create('dishanhai:platinum_god_proof')
        .displayName('§6Série Prova do Deus da Platina')
        .texture('dishanhai_item:item/platinum_god_proof')
        TooltipAPI.register('dishanhai:platinum_god_proof', [
        '{golden} Um presente do Deus dos Elementos Platina, provando que você conquistou todos os mistérios dos Elementos Platina',
        '{ultimateRainbow} Platina, paládio, ródio, irídio, ósmio, rutênio - todos os seis elementos se rendem a você',
    ]);;

        e.create('dishanhai:dark_energy_multiplier')
        .displayName('multiplicador de energia escura')
        .texture('dishanhai_item:item/dark_energy_multiplier')
        TooltipAPI.register('dishanhai:dark_energy_multiplier', [
        '{ultimateRainbow} Acredito que um dia o Grande Rasgo será usado por nós...',
        '{white_blue} é um produto da Blue Star Miracle Era. Consumir zero pontos pode dobrar toda a capacidade de produção.',
        '{golden} depende do “gerador de energia de ponto zero de vácuo” como núcleo de inicialização e precisa ser ativado no modo quatro.',
    ]);;

        e.create('dishanhai:blue_alien')
        .displayName('Alienígena azul §9')
        .texture('dishanhai_item:item/blue_alien')
        TooltipAPI.register('dishanhai:blue_alien', [
        '{ultimateRainbow} Uma forma de vida alienígena azul vinda do outro lado do espaço profundo, emitindo uma leve luz azul...',
        '{white_blue} O miserável mandarim atravessa dimensões, viajantes separados para sempre pela torrente de tempo e espaço',
    ]);;

        e.create('dishanhai:long_zui')
        .displayName('§6bêbado há muito tempo')
        .texture('dishanhai_item:item/cz')
        TooltipAPI.register('dishanhai:long_zui', [
        '{ultimateRainbow} O Rei Teocrático – Bêbado e deitado no longo rio do tempo e do espaço, apenas pedindo para encontrá-lo novamente',
        '{white_blue} A outra metade do fatídico pato mandarim, o rei solitário que permanece bêbado o dia todo depois de perder sua amada.',
    ]);;

        e.create('dishanhai:ku_ming_yuan_yang')
        .displayName('§dO miserável pato mandarim')
        .texture('dishanhai_item:item/ku_ming_yuan_yang')
        TooltipAPI.register('dishanhai:ku_ming_yuan_yang', [
        '{ultimateRainbow} O Rei Teocrático e sua Amante Estrela Azul – o destino dilacerado pelas leis do tempo e do espaço',
        '{white_blue} Um pato mandarim que está sempre bêbado em um longo rio, um pato mandarim à deriva em outro mundo, separado por milhares de mundos',
    ]);;

        e.create('dishanhai:gravitational_lens')
        .displayName('Lente de distorção de gravidade §5')
        .texture('dishanhai_item:item/gravitational_lens')
        .maxStackSize(16)
        .fireResistant(false)
        TooltipAPI.register('dishanhai:gravitational_lens', [
        'Lente {ultimateRainbow} que distorce o espaço-tempo, o componente central do transmissor de antena de ondas gravitacionais',
        '{white_blue} concentra a gravidade em um campo de força de torção devastador que destrói o próprio espaço',
        '{golden} ——O “olho” do Prego do Julgamento pendurado de cabeça para baixo na terra——',
    ]);;

        e.create('dishanhai:annihilation_core')
        .displayName('Núcleo de Aniquilação')
        .texture('dishanhai_item:item/annihilation_core')
        TooltipAPI.register('dishanhai:annihilation_core', [
        '{ultimateRainbow} De “usar regras” a “criar regras” – o revisor das regras do universo',
        '{white_blue} Núcleo de produção de antimatéria de alta eficiência, você pode colher a civilização e reescrever as leis básicas do universo com o toque dos dedos',
        'A tecnologia {golden} de "nova fonte de gravidade" faz com que a gravidade não esteja mais fora de alcance e os estados de baixa entropia não existam mais',
        '{purplish_red} Um produto da Era dos Milagres, usando a estranheza para aniquilar tudo',
    ]);;

        try {
            if (typeof ShanhaiText !== 'undefined') {
                e.create('dishanhai:primordial_worldline_seed')
                .texture('dishanhai_item:item/bagua_animated')
                .fireResistant(false)
                .displayName('&$ultimate-Seed of Taichu World Line')
                TooltipAPI.register('dishanhai:primordial_worldline_seed', [
        '{nature} Uma semente mundial que ainda não decidiu onde crescer, selando o silêncio antes da divisão.',
        '{magic} Após serem colocadas no Motor de Divergência Taichu, as sementes começaram a se expandir – não em volume, mas em possibilidades.',
        '{golden} As raízes se espalham em todas as direções ao mesmo tempo, os ramos ainda não têm nome, mas cada um aspira ser',
        '{lava} "Histórico".',
        '{fire} Taichu escolheu uma semente, e a semente escolheu incontáveis ​​mundos.',
    ]);;
                console.log('[Shan Hai] Semente da Linha Mundial Taichu Registrada');
            }
        } catch(e) {
            console.error('[Shan Hai] Falha no registro da Linha Mundial da Semente de Taichu:' + e);
        }

        // ===== 太初并行子 =====
        try {
            if (typeof ShanhaiText !== 'undefined') {
                e.create('dishanhai:primordial_parallel_particle')
                .texture('dishanhai_item:item/parallel_particle_animated')
                .maxStackSize(64)
                .fireResistant(false)
                .displayName('&$ultimate- Filho Paralelo de Taichu')
                TooltipAPI.register('dishanhai:primordial_parallel_particle', [
        '{nature} No início não havia sequência, apenas simultaneidade. Um grão de paralelismo contém essa “simultaneidade”.',
        '{magic} Depois de engoli-lo, o Tai Chi Engine aprendeu a deixar causa e efeito caminharem lado a lado——',
        '{ice} Eles passam lado a lado sem atrapalhar um ao outro.',
        '{golden} A cada nanossegundo, inúmeras linhas mundiais são verificadas cruzadamente no motor.',
        '{fire} não é rápido, mas “mais”.',
    ]);;
                console.log('[Shan Hai] Taichu Pingxingzi registrou');
            }
        } catch(e) {
            console.error('[Shan Hai] Falha no registro paralelo de Taichu:' + e);
        }
        // ===== 维度世线碎片 =====
        try {
            if (typeof ShanhaiText !== 'undefined') {
                e.create('dishanhai:dimensional_worldline_fragment')
                .displayName(Component.literal('Fragmentos Dimensionais da Linha Mundial'))
                .texture('dishanhai_item:item/dimensional_worldline_fragment')
                .fireResistant(false)
                .displayName('Fragmentos da linha mundial &$aurora-Dimension')
                TooltipAPI.register('dishanhai:dimensional_worldline_fragment', [
        '{aurora} Os fragmentos se soltaram quando a linha do mundo se move entre as dimensões, cada peça registra',
        '{magic} As coordenadas de um universo paralelo e uma causa e efeito inacabados.',
    ]);;
                console.log('[Shan Hai] Fragmentos da Linha Dimension World registrados');
            }
        } catch(e) {
            console.error('[Shan Hai] Falha no registro de fragmentos da linha Dimension World:' + e);
        }
        // ===== 余振世线碎片 =====
        try {
            if (typeof ShanhaiText !== 'undefined') {
                e.create('dishanhai:worldline_residual_fragment')
                .displayName(Component.literal('Fragmentos da Linha Mundial da Vida Após a Morte'))
                .texture('dishanhai_item:item/worldline_residual_fragment')
                .fireResistant(false)
                .displayName('Fragmentos da Linha &$crimson-Yu Zhen Shi')
                TooltipAPI.register('dishanhai:worldline_residual_fragment', [
        '{crimson} Os tremores secundários deixados na fibra do tempo após a quebra da linha mundial são as relíquias finais do choque dimensional.',
    ]);;
                console.log('[Shan Hai] Fragmentos da linha Yu Zhen Shi registrados');
            }
        } catch(e) {
            console.error('[Shan Hai] Falha no registro dos fragmentos da linha Yu Zhen Shi:' + e);
        }

        // ===== 分歧世线凝核 =====
        try {
            if (typeof ShanhaiText !== 'undefined') {
                e.create('dishanhai:worldline_divergent_core')
                .displayName(Component.literal('Condensação de linha mundial diferente'))
                .texture('dishanhai_item:item/worldline_divergent_core')
                .fireResistant(false)
                .displayName('&$condensação de linha de divergência mágica')
                TooltipAPI.register('dishanhai:worldline_divergent_core', [
        '{magic} O núcleo sólido formado pelos pontos de divergência de múltiplas linhas mundiais condensadas sob pressão é a própria cristalização da possibilidade.',
    ]);;
                console.log('[Shan Hai] Condensação de Linha Mundial Diferente Registrada');
            }
        } catch(e) {
            console.error('[Shan Hai] Falha no registro de condensação de diferentes linhas mundiais:' + e);
        }

        // ===== 无界世线奇点 =====
        try {
            if (typeof ShanhaiText !== 'undefined') {
                e.create('dishanhai:worldline_boundless_singularity')
                .displayName(Component.literal('Singularidade ilimitada da linha mundial'))
                .texture('dishanhai_item:item/worldline_boundless_singularity')
                .fireResistant(false)
                .displayName('&$ultimateSingularidade da linha mundial Rainbow-Unbounded')
                TooltipAPI.register('dishanhai:worldline_boundless_singularity', [
        '{ultimateRainbow} Quando o número de linhas do mundo se aproxima do infinito, todas as diferenças entrarão em colapso em uma singularidade – a ilimitada.',
    ]);;
                console.log('[Montanhas e Mares] Registrada Singularidade da Linha Mundial Ilimitada');
            }
        } catch(e) {
            console.error('[Shan Hai] Falha no registro de singularidade da linha mundial ilimitada:' + e);
        }

        // ===== 虚数世线虚弦 =====
        try {
            if (typeof ShanhaiText !== 'undefined') {
                e.create('dishanhai:worldline_imaginary_string')
                .displayName(Component.literal('número imaginário linha do mundo corda imaginária'))
                .texture('dishanhai_item:item/worldline_imaginary_string')
                .fireResistant(false)
                .displayName('&$neon-número imaginário linha mundial string imaginária')
                TooltipAPI.register('dishanhai:worldline_imaginary_string', [
        '{neon} A corda imaginária vibrando no complexo plano do tempo é o estado não colapsado da linha do mundo.',
    ]);;
                console.log('[Montanhas e Mares] Número Imaginário Linha Mundial Corda Imaginária Registrada');
            }
        } catch(e) {
            console.error('[Shan Hai] O registro da sequência imaginária da linha mundial do número imaginário falhou:' + e);
        }

        // ===== 始世线创世胚 =====
        try {
            if (typeof ShanhaiText !== 'undefined') {
                e.create('dishanhai:worldline_genesis_embryo')
                .displayName(Component.literal('Embrião de criação da linha Gênesis'))
                .texture('dishanhai_item:item/worldline_genesis_embryo')
                .fireResistant(false)
                .displayName('&$golden-O Embrião de Criação da Linha de Criação')
                TooltipAPI.register('dishanhai:worldline_genesis_embryo', [
        '{fire} Divergência, fusão, colapso, reconstrução – o destino de triliões de linhas mundiais estão todos concentrados neste embrião.',
        '{golden} Não é um milagre – é a linha de base que define o que é um milagre.',
        '{ultimateRainbow} Define o que é a própria “realidade”.',
        '{neon} A chave que pode redefinir as regras de toda a existência.',
    ]);;
                console.log('[Shan Hai] Embriões de criação da linha Gênesis registrados');
            }
        } catch(e) {
            console.error('[Shan Hai] Falha no registro de embriões de criação da linha Gênesis:' + e);
        }

        // ===== 动态文本API测试物品（仅注册物品，文案在 JEI 侧） =====
        try {
            e.create("dishanhai:test_dynamic_text", "basic")
            .displayName("Teste de texto dinâmico §7Shanhai")
            .texture("dishanhai_item:item/hxsp")
            .displayName('&$ultimate-Teste de texto dinâmico de Shanhai')
        } catch(tex) {
            console.warn("[山海][teste] Falha no registro do nome dinâmico:" + (tex.message || tex));
            e.create("dishanhai:test_dynamic_text", "basic")
            .displayName("Teste de texto dinâmico §eShanhai")
            .texture("dishanhai_item:item/hxsp")
        }

    // 万法核心（72变系统）
    e.create('dishanhai:wanxiang_core')
    .displayName('§dSetenta e duas mudanças · Método da Mente do Núcleo de Todas as Coisas')
    .texture('dishanhai_item:item/wanxiang_core')
    .maxStackSize(1)
    .rarity('epic')
    .glow(true)

    // ===== 创造模块配套物品 =====
    try {
        e.create('dishanhai:genesis_shard')
        .displayName('Fragmentos de Criação')
        .texture('dishanhai_item:item/genesis_shard')
        .rarity('rare')
        TooltipAPI.register('dishanhai:genesis_shard', [
        '{golden} Os fragmentos condensados ​​pelo poder da criação carregam as informações do universo nascente.',
        '{bodySilver} Cada fragmento registra um projeto de uma realidade potencial.',
    ]);;
        
    } catch(e) {
    }

    try {
        e.create('dishanhai:nova_catalyst')
        .displayName('Nova Catalisador')
        .texture('dishanhai_item:item/nova_catalyst')
        .rarity('rare')
        TooltipAPI.register('dishanhai:nova_catalyst', [
        '{fire} A essência da explosão da supernova se condensa e é o meio catalítico que acelera a reconstrução da realidade.',
        '{bodySilver} Ele fornece ao Módulo de Criação o pulso inicial de energia necessário para iniciar uma nova realidade.',
    ]);;
    } catch(e) {
    }

    try {
        e.create('dishanhai:reality_core')
        .displayName('núcleo da realidade')
        .texture('dishanhai_item:item/reality_core')
        .maxStackSize(1)
        .rarity('epic')
        .glow(true)
        TooltipAPI.register('dishanhai:reality_core', [
        '{ultimateRainbow} O componente mais elevado do Módulo de Criação - o Núcleo de Singularidade capaz de definir as regras da própria realidade.',
        '{bodySilver} É o núcleo da Caixa de Areia da Criação, a personificação concreta do estado estacionário e da eternidade.',
        '{bodySilver} Somente compreendendo verdadeiramente o significado da criação poderemos aproveitar seu poder.',
    ]);;
    } catch(e) {
    }

    // ===== 通用材料物品 =====
    try {
        e.create('dishanhai:cosmic_dust')
        .displayName('poeira cósmica')
        .texture('dishanhai_item:item/cosmic_dust')
        TooltipAPI.register('dishanhai:cosmic_dust', [
        '{aurora} Stardust – o material de construção mais básico do universo.',
        '{bodySilver} Cada partícula de poeira carrega a memória da morte e do renascimento da estrela.',
    ]);;
    } catch(e) {
    }

    try {
        e.create('dishanhai:dimensional_matrix')
        .displayName('matriz de dimensão')
        .texture('dishanhai_item:item/dimensional_matrix')
        .rarity('rare')
        TooltipAPI.register('dishanhai:dimensional_matrix', [
        '{water} é um corpo matemático abstrato com coordenadas multidimensionais, existindo de forma estável na forma de uma grade de cristal.',
        '{bodySilver} É um material de ponte que conecta diferentes dimensões.',
    ]);;
    } catch(e) {
    }

    try {
        e.create('dishanhai:dimensional_frame')
        .displayName('estrutura dimensional')
        .texture('dishanhai_item:item/dimensional_frame')
        .rarity('rare')
        .glow(true)
        TooltipAPI.register('dishanhai:dimensional_frame', [
        '{water} O protótipo do esqueleto do núcleo da realidade - a moldura hexagonal condensada pelo poder das dimensões.',
        '{bodySilver} ainda precisa de uma infusão de energia de singularidade para se tornar um núcleo completo de realidade.',
    ]);;
        console.log('[Shan Hai] Estrutura Dimensional Registrada');
    } catch(e) {
        console.error('[Shanhai] Falha no registro do Dimension Framework:' + e);
    }

    try {
        e.create('dishanhai:singularity_ring')
        .displayName('anel de singularidade')
        .texture('dishanhai_item:item/singularity_ring')
        .maxStackSize(16)
        .rarity('epic')
        .glow(true)
        TooltipAPI.register('dishanhai:singularity_ring', [
        '{magic} A mais recente tecnologia para comprimir pontos singulares em uma estrutura de anel - massa infinita e volume infinitamente pequeno.',
        '{bodySilver} O componente central da máquina superior, a chave para aproveitar a gravidade.',
    ]);;
    } catch(e) {
    
    }



    // ===== 逐光系列（五阶） =====
    try {
        e.create('dishanhai:first_light')
        .displayName('primeira luz')
        .texture('dishanhai_item:item/first_light')
        .displayName('&$dourada-primeira luz')
        TooltipAPI.register('dishanhai:first_light', [
        '{golden} Antes de zarpar, há luz.',
    ]);;
    } catch(e) {
    }

    try {
        e.create('dishanhai:navigate_prism')
        .displayName('Prisma de navegação')
        .texture('dishanhai_item:item/navigate_prism')
        .rarity('rare')
        TooltipAPI.register('dishanhai:navigate_prism', [
        '{water} Bloqueie a direção na escuridão sem fim - a luz é a marca de navegação.',
        '{bodySilver} O prisma refrata não só a luz, mas também a vontade de navegar.',
    ]);;
        console.log('[山海] Prisma de navegação registrado');
    } catch(e) {
        console.error('[Shan Hai] Falha no registro do Prisma de Navegação:' + e);
    }

    try {
        e.create('dishanhai:light_voyage')
        .displayName('Navegue para a luz')
        .texture('dishanhai_item:item/light_voyage')
        .rarity('rare')
        TooltipAPI.register('dishanhai:light_voyage', [
        '{aurora} Nascemos para perseguir a luz, como mariposas rumo às estrelas.',
        '{bodySilver} Quando a Arca navega em direção ao centro do universo, cada raio de luz é uma coordenada de navegação.',
    ]);;
        console.log('[Montanhas e Mares] Navegue para a luz Registrado');
    } catch(e) {
        console.error('[Shan Hai] O registro de Perseguir a Luz e zarpar falhou:' + e);
    }

    try {
        e.create('dishanhai:star_spark')
        .displayName('Vontade Estelar')
        .texture('dishanhai_item:item/star_spark')
        .rarity('epic')
        .glow(true)
        TooltipAPI.register('dishanhai:star_spark', [
        '{neon} A vontade que se estende por centenas de milhões de anos-luz se transformou em uma centelha imortal.',
        '{bodySilver} O fogo da civilização arde na escuridão e nunca será extinto.',
    ]);;
        console.log('[Shan Hai] Spark será registrado');
    } catch(e) {
        console.error('[Shan Hai] Falha no registro do Spark Will:' + e);
    }

    try {
        e.create('dishanhai:blue_son')
        .displayName('filho da estrela azul')
        .texture('dishanhai_item:item/blue_son')
        .rarity('epic')
        .glow(true)
.displayName('&$ultimate-Filho da Estrela Azul')
        TooltipAPI.register('dishanhai:blue_son', [
        '{ultimateRainbow} O auge da Civilização Estrela Azul, o encontro definitivo da viagem de caça à luz.',
        '{bodySilver} Não é o fim – é o início da próxima jornada.',
    ]);;
        console.log('[Shan Hai] Filho da Blue Star registrado');
    } catch(e) {
        console.error('[Shan Hai] O registro do Filho da Blue Star falhou:' + e);
    }

    // ===== 光子 =====
    try {
        e.create('dishanhai:photon')
            .displayName('Luz §esub §f')
            .texture('dishanhai_item:item/photon')
            .maxStackSize(64);
        TooltipAPI.register('dishanhai:photon', [
        '{golden} A forma de partícula de luz, um produto secundário do sifão nebuloso.',
        '{bodySilver} é mais fácil de armazenar e transportar do que fluidos fotônicos, mas contém uma densidade de energia mais baixa.',
        '{aurora} Ele ainda carrega o calor residual da galáxia espiral – e um pouco de teimosia do vácuo.',
    ]);;
        console.log('[山海] Fóton registrado');
    } catch(e) {
        console.error('[Shan Hai] Falha no registro do fóton:' + e);
    }
    // 中央有限曲线                                                                                                                                  
        e.create('dishanhai:central_finite_curve')                                                                                                   
        .displayName('&$ curva finita central mágica')
        .texture('dishanhai_item:item/central_finite_curve')
        DShanhaiItemTooltipAPI.register('dishanhai:central_finite_curve', [
        "{magic} ∞ curva finita central ∞{/}",
        "{bodySilver} É o ponto de convergência de todas as linhas mundiais,{/}",
        "{bodySilver} Onde todas as possibilidades se unem. {/}",
        "{magic} Nesta curva tudo é possível, tudo está destinado. {/}"
       ]);
    // ===== 测试物品 =====
    try {
        e.create('dishanhai:test_item')
            .displayName('&$ itens de teste final')
            .texture('minecraft:item/barrier')
        TooltipAPI.register('dishanhai:test_item', [
            '{ultimate} Esta é uma linha de texto de teste de arco-íris definitivo',
            '{bodySilver} Texto principal texto de teste prateado',
            'Texto de teste de cor dourada {golden}'
        ]);
    } catch(e) {
        console.error('[Shan Hai] Falha no registro do item de teste:' + e);
    }

    // ===== 黑洞遏制场种子/坍缩器 =====
    e.create('dishanhai:bhd_hyper_seed')
        .texture('dishanhai_item:item/hyperstable_black_hole_seed')
        .displayName('Semente hiperestável de buraco negro')
    TooltipAPI.register('dishanhai:bhd_hyper_seed', [
        '{ultimateRainbow} A singularidade envolta no horizonte de eventos pode abrir um buraco negro metaestável com a ajuda da catálise do espaço-tempo',
        '{golden} é colocado no barramento de entrada do campo de contenção do buraco negro metaestável para ativar o buraco negro',
        'Aviso {red}: O buraco negro continuará a decair após ser aberto e o espaço-tempo derretido precisa ser fornecido para manter a estabilidade.',
    ]);

    e.create('dishanhai:bhd_collapser')
        .texture('dishanhai_item:item/black_hole_collapser')
        .displayName('colapsador de buraco negro')
    TooltipAPI.register('dishanhai:bhd_collapser', [
        '{ultimateRainbow} inverte à força o campo gravitacional do horizonte de eventos, fazendo com que o buraco negro entre em colapso em 1 segundo',
        '{golden} colocado no barramento de entrada do campo metaestável de contenção do buraco negro para desligar o buraco negro',
        'A estabilidade do {aqua} e o consumo de tempo e espaço serão redefinidos após o fechamento',
    ]);

    e.create('dishanhai:hyperdimensional_calibration_matrix')
        .texture('dishanhai_item:item/hyperdimensional_calibration_matrix')
        .displayName('Matriz de calibração hiperdimensional')
    TooltipAPI.register('dishanhai:hyperdimensional_calibration_matrix', [
        '{ultimateRainbow}',
        '{golden}',
    ])

e.create('dishanhai:casing_empty_quark_emission_catalyst')
.displayName('Quarks vazios liberam casca de catalisador')
.texture('dishanhai_item:item/casing_empty_quark_emission_catalyst')
TooltipAPI.register('dishanhai:casing_empty_quark_emission_catalyst', [
    '{golden} invólucro de catalisador de liberação de quark vazio',
    '{bodySilver} é usado para envolver o catalisador de liberação de quark para evitar que ele seja destruído',
])

e.create('dishanhai:up_quark_emission_catalyst')
.displayName('Catalisador de liberação de quark up')
.texture('dishanhai_item:item/up_quark_emission_catalyst')
TooltipAPI.register('dishanhai:up_quark_emission_catalyst', [
    'Catalisador de liberação de quark up {golden}',
    '{bodySilver} é usado para liberar catalisadores de quark up para remodelar a matéria',
])

e.create('dishanhai:down_quark_emission_catalyst')
.displayName('Catalisador de liberação de Down-Quark')
.texture('dishanhai_item:item/down_quark_emission_catalyst')
TooltipAPI.register('dishanhai:down_quark_emission_catalyst', [
    '{golden} Catalisador de liberação do próximo quark',
    '{bodySilver} é usado para liberar catalisadores de quark down para remodelar a matéria',
])

 e.create('dishanhai:strange_quark_emission_catalyst')
.displayName('Catalisador de liberação de quark estranho')
.texture('dishanhai_item:item/ange_quark_emission_catalyst')
TooltipAPI.register('dishanhai:strange_quark_emission_catalyst', [
    '{golden} Catalisador de liberação de quark estranho',
    '{bodySilver} é usado para liberar catalisadores de quarks estranhos para remodelar a matéria',
])

e.create('dishanhai:charm_quark_emission_catalyst')
.displayName('Catalisador de liberação de quark charm')
.texture('dishanhai_item:item/charm_quark_emission_catalyst')
TooltipAPI.register('dishanhai:charm_quark_emission_catalyst', [
    'Catalisador de liberação charm-quark {golden}',
    '{bodySilver} é usado para liberar catalisadores de quark charm para remodelar a matéria',
])

e.create('dishanhai:bottom_quark_emission_catalyst')
.displayName('Catalisador de liberação de quark inferior')
.texture('dishanhai_item:item/bottom_quark_emission_catalyst')
TooltipAPI.register('dishanhai:bottom_quark_emission_catalyst', [
    'Catalisador de liberação de quark inferior {golden}',
    '{bodySilver} é usado para liberar catalisadores de quark bottom para remodelar a matéria',
])

 e.create('dishanhai:top_quark_emission_catalyst')
.displayName('Catalisador de liberação de quark superior')
.texture('dishanhai_item:item/top_quark_emission_catalyst')
TooltipAPI.register('dishanhai:top_quark_emission_catalyst', [
    'Catalisador de liberação de quark superior {golden}',
    '{bodySilver} é usado para liberar catalisadores de quark top para remodelar a matéria',
])

e.create('dishanhai:misaligned_quark_emission_catalyst')
.displayName('Catalisador de liberação de quark não alinhado')
.texture('dishanhai_item:item/misaligned_quark_emission_catalyst')
TooltipAPI.register('dishanhai:misaligned_quark_emission_catalyst', [
    'Catalisador de liberação de quark não alinhado {golden}',
    '{bodySilver} precisa ser realinhado antes do uso',
])

e.create('dishanhai:dog_coins')
.displayName('Moeda Doge')
.texture('dishanhai_item:item/dog_coins')
TooltipAPI.register('dishanhai:dog_coins', [
    'Moeda Doge {golden}',
    '{bodySilver} Tanto dinheiro',
    '',
    '{bodySilver} Doge coin é uma criptomoeda baseada na rede Doge',
    'A rede de moedas Doge {bodySilver} consiste em nós Doge, cada nó tem sua própria carteira de moedas Doge',
    '{bodySilver} kabosu observará as transações dos nós Doge e adicionará registros de transações ao blockchain das moedas Doge.',
    '',
    '{bodySilver} kabosu (protótipo doge) - deixou a rede Doge em 24 de maio de 2024 - condolências',
])

e.create('dishanhai:hydrogen_ion')
.displayName('íons de hidrogênio')
.texture('dishanhai_item:item/hydrogen_ion')
.tag('dishanhai:particles')
DShanhaiItemTooltipAPI.register('dishanhai:hydrogen_ion', [
    'Íons de hidrogênio {golden} {/}',
    '{bodySilver} um íon hidrogeno com carga {/} {rainbow} desconhecida{/} {bodySilver} {/}',
])

e.create('dishanhai:helium_ion')
.displayName('Íons de hélio')
.texture('dishanhai_item:item/helium_ion')
.tag('dishanhai:particles')
DShanhaiItemTooltipAPI.register('dishanhai:helium_ion', [
    '{golden} íons de hélio{/}',
    '{bodySilver}, um íon de hélio com carga {/} {rainbow} desconhecida{/} {bodySilver} {/}',
])

e.create('dishanhai:graviton')
.displayName('gráviton')
.texture('dishanhai_item:item/graviton')
.tag('dishanhai:particles')
DShanhaiItemTooltipAPI.register('dishanhai:graviton', [
    'Gráviton {golden} {/}',
    '{bodySilver} Bóson portador de gravidade, spin 2, massa zero (hipotético){/}',
])

e.create('dishanhai:up_quark')
.displayName('Up (u) quark')
.texture('dishanhai_item:item/up_quark')
.tag('dishanhai:particles')
DShanhaiItemTooltipAPI.register('dishanhai:up_quark', [
    '{golden} quark up (u){/}',
    '{bodySilver} Um dos quarks mais leves{/}',
    'Carga {bodySilver}: +2/3 | Giro: 1/2{/}',
])

e.create('dishanhai:down_quark')
.displayName('Quark down (d)')
.texture('dishanhai_item:item/down_quark')
.tag('dishanhai:particles')
DShanhaiItemTooltipAPI.register('dishanhai:down_quark', [
    'Quark down {golden} (d){/}',
    '{bodySilver} A primeira geração de quarks{/}',
    'Carga {bodySilver}: -1/3 | Giro: 1/2{/}',
])

e.create('dishanhai:charm_quark')
  .displayName('charme (c) quark')
  .texture('dishanhai_item:item/charm_quark')
.tag('dishanhai:particles')
DShanhaiItemTooltipAPI.register('dishanhai:charm_quark', [
    'Quark charmoso {golden} (c){/}',
    '{bodySilver} Quarks de segunda geração, carga +2/3, decaimento fraco de partículas contendo charme{/}',
])


e.create('dishanhai:strange_quark')
  .displayName('quark ímpar(s)')
  .texture('dishanhai_item:item/strange_quark')
.tag('dishanhai:particles')
DShanhaiItemTooltipAPI.register('dishanhai:strange_quark', [
    'Quark(s) estranho(s) {golden} {/}',
    '{bodySilver} Quarks de segunda geração, carga -1/3, com números singulares{/}',
    'Rotação {bodySilver}: 1/2 | Participe de uma interação forte{/}',
])

e.create('dishanhai:bottom_quark')
  .displayName('Quark inferior (d)')
  .texture('dishanhai_item:item/bottom_quark')
  .tag('dishanhai:particles')
DShanhaiItemTooltipAPI.register('dishanhai:bottom_quark', [
    'Quark inferior {golden} (b){/}',
    '{bodySilver} Quark de terceira geração, carga -1/3, composição do méson B e primo par inferior {/}',
    'Rotação {bodySilver}: 1/2 | Massa maior{/}',
])

e.create('dishanhai:top_quark')
  .displayName('quark superior(t)')
  .texture('dishanhai_item:item/top_quark')
  .tag('dishanhai:particles')
DShanhaiItemTooltipAPI.register('dishanhai:top_quark', [
    'Quark superior {golden} (t){/}',
    '{bodySilver} O quark de terceira geração, carga +2/3, o quark mais pesado conhecido{/}',
    'Rotação {bodySilver}: 1/2 | Vida muito curta e não forma um estado vinculado{/}',
])

e.create('dishanhai:electron')
  .displayName('eletrônico')
  .texture('dishanhai_item:item/electron')
  .tag('dishanhai:particles')
DShanhaiItemTooltipAPI.register('dishanhai:electron', [
    'Eletrônicos {golden} (e⁻){/}',
    '{bodySilver} A primeira geração de léptons carregados, carga -1, spin 1/2{/}',
])

e.create('dishanhai:electron_neutrino')
  .displayName('neutrino do elétron')
  .texture('dishanhai_item:item/electron_neutrino').tag('dishanhai:particles')
DShanhaiItemTooltipAPI.register('dishanhai:electron_neutrino', [
    'Neutrino de elétron {golden} (νₑ){/}',
    '{bodySilver} O neutrino de primeira geração é eletricamente neutro e tem massa extremamente pequena{/}',
])

e.create('dishanhai:muon')
  .displayName('múon')
  .texture('dishanhai_item:item/muon').tag('dishanhai:particles')
DShanhaiItemTooltipAPI.register('dishanhai:muon', [
    'Múon {golden} (μ⁻){/}',
    '{bodySilver} A segunda geração de léptons carregados, carga -1, instável{/}',
])

e.create('dishanhai:muon_neutrino')
  .displayName('neutrino de múon')
  .texture('dishanhai_item:item/muon_neutrino').tag('dishanhai:particles')
DShanhaiItemTooltipAPI.register('dishanhai:muon_neutrino', [
    'Neutrino de múon {golden} (ν_μ){/}',
    '{bodySilver} Neutrinos de segunda geração, associados a múons{/}',
])

e.create('dishanhai:tau')
  .displayName('τ子')
  .texture('dishanhai_item:item/tau').tag('dishanhai:particles')
DShanhaiItemTooltipAPI.register('dishanhai:tau', [
    '{golden} τ子 (τ⁻){/}',
    '{bodySilver} A terceira geração de léptons carregados, carga -1, extremamente pesados ​​e instáveis{/}',
])

e.create('dishanhai:tau_neutrino')
  .displayName('neutrino tau')
  .texture('dishanhai_item:item/tau_neutrino').tag('dishanhai:particles')
DShanhaiItemTooltipAPI.register('dishanhai:tau_neutrino', [
    '{golden} τ neutrino (ν_τ){/}',
    '{bodySilver} A terceira geração de neutrinos, associada ao tau{/}',
])

e.create('dishanhai:gluon')
  .displayName('glúons')
  .texture('dishanhai_item:item/gluon').tag('dishanhai:particles')
DShanhaiItemTooltipAPI.register('dishanhai:gluon', [
    'Glúons {golden} (g){/}',
    '{bodySilver} Bóson de calibre de forte interação, spin 1, com carga colorida{/}',
])

e.create('dishanhai:photon_rainbow')
  .displayName('Fóton')
  .texture('dishanhai_item:item/photon_rainbow').tag('dishanhai:particles')
DShanhaiItemTooltipAPI.register('dishanhai:photon_rainbow', [
    'Fóton {golden} (γ){/}',
    'Partícula média {bodySilver} para interação eletromagnética, spin 1, massa zero{/}',
])

e.create('dishanhai:z_boson')
  .displayName('Bóson Z')
  .texture('dishanhai_item:item/z_boson').tag('dishanhai:particles')
DShanhaiItemTooltipAPI.register('dishanhai:z_boson', [
    'Bóson {golden} Z (Z⁰){/}',
    '{bodySilver} Partícula média de interação fraca, spin 1, eletricamente neutra{/}',
    '{bodySilver} transmite fluxo neutro fraco com grande massa{/}',
])

e.create('dishanhai:w_boson')
  .displayName('Bóson W')
  .texture('dishanhai_item:item/w_boson').tag('dishanhai:particles')
DShanhaiItemTooltipAPI.register('dishanhai:w_boson', [
    'Bóson {golden} W (W⁺ / W⁻){/}',
    '{bodySilver} Bóson de calibre de interação fraca, spin 1, carga ±1{/}',
    '{bodySilver} participa de processos com carga fraca, como decaimento beta{/}',
])

e.create('dishanhai:higgs_boson')
  .displayName('Bóson de Higgs')
  .texture('dishanhai_item:item/higgs_boson').tag('dishanhai:particles')
DShanhaiItemTooltipAPI.register('dishanhai:higgs_boson', [
    '{golden} Bóson de Higgs (H⁰){/}',
    'O bóson escalar {bodySilver}, spin 0, origina-se do mecanismo de Higgs{/}',
    '{bodySilver} O núcleo do mecanismo que dá massa às partículas elementares{/}',
])

e.create('dishanhai:proton')
  .displayName('próton')
  .texture('dishanhai_item:item/proton').tag('dishanhai:particles')
DShanhaiItemTooltipAPI.register('dishanhai:proton', [
    'Próton {golden} (p){/}',
    'O bárion {bodySilver}, composto por quarks uud, carrega +1{/}',
    '{bodySilver} Componente estável do núcleo atômico, spin 1/2{/}',
])

e.create('dishanhai:neutron')
  .displayName('nêutron')
  .texture('dishanhai_item:item/neutron').tag('dishanhai:particles')
DShanhaiItemTooltipAPI.register('dishanhai:neutron', [
    'Nêutron {golden} (n){/}',
    'Bárion {bodySilver}, composto de quarks udd, eletricamente neutro{/}',
    '{bodySilver} Os nêutrons livres são instáveis, com vida útil média de cerca de 14,7 minutos{/}',
])

e.create('dishanhai:lambda_particle')
  .displayName('partícula lambda')
  .texture('dishanhai_item:item/lambda_particle').tag('dishanhai:particles')
DShanhaiItemTooltipAPI.register('dishanhai:lambda_particle', [
    'Partícula {golden} λ (Λ⁰){/}',
    '{bodySilver} Bárion estranho, composto de quarks uds, número estranho -1{/}',
    '{bodySilver} decai por meio de interação fraca, vida útil típica de aproximadamente 2,6×10⁻¹⁰ s{/}',
])

e.create('dishanhai:omega_particle')
  .displayName('Ω partículas')
  .texture('dishanhai_item:item/omega_particle').tag('dishanhai:particles')
DShanhaiItemTooltipAPI.register('dishanhai:omega_particle', [
    'Partículas {golden} Ω (Ω⁻){/}',
    '{bodySilver} bárion triplo estranho, composto de quarks sss, número estranho -3{/}',
    '{bodySilver} gira 3/2, revelando a estrutura dez vezes maior do sabor SU(3){/}',
])

e.create('dishanhai:pion')
  .displayName('pião')
  .texture('dishanhai_item:item/pion').tag('dishanhai:particles')
DShanhaiItemTooltipAPI.register('dishanhai:pion', [
    '{golden} méson π (π⁺, π⁰, π⁻){/}',
    '{bodySilver} O méson mais leve, estado ligado ao quark-antiquark{/}',
    '{bodySilver} O principal meio de interação de longo alcance nas forças nucleares{/}',
])

e.create('dishanhai:eta_meson')
  .displayName('eta méson')
  .texture('dishanhai_item:item/eta_meson').tag('dishanhai:particles')
DShanhaiItemTooltipAPI.register('dishanhai:eta_meson', [
    '{golden} η méson (η){/}',
    '{bodySilver} Méson pseudopadrão eletricamente neutro, estado de superposição contendo quarks u, d, s{/}',
    '{bodySilver} tem massa maior que os mésons π e está relacionado à anomalia U(1)ₐ{/}',
])

e.create('dishanhai:unknown_particle')
  .displayName('partícula desconhecida')
  .texture('dishanhai_item:item/unknown_particle').tag('dishanhai:particles')
DShanhaiItemTooltipAPI.register('dishanhai:unknown_particle', [
    'Partícula desconhecida {golden} (?){/}',
    '{bodySilver} Partículas cujas propriedades ainda não foram descobertas parecem estar fora do modelo padrão{/}',
    '{bodySilver} Dados insuficientes não podem ser classificados...{/}',
])

e.create('dishanhai:copper_coin')
  .displayName('Moeda GT de cobre')
  .texture('dishanhai_item:item/copper_coin')

DShanhaiItemTooltipAPI.register('dishanhai:copper_coin', [
    'Moeda GT de Bronze {golden} {/}',
    '{bodySilver} Moeda industrial básica, feita de cobre, de ampla circulação{/}',
    '{bodySilver} Valor mais baixo, mas indispensável{/}',
])

e.create('dishanhai:cupronickel_coin')
  .displayName('Moeda GT de cobre branco')
  .texture('dishanhai_item:item/cupronickel_coin')

DShanhaiItemTooltipAPI.register('dishanhai:cupronickel_coin', [
    'Moeda GT Bronze Branco {golden} {/}',
    'Moeda {bodySilver} feita de liga de cobre branco, dura e resistente ao desgaste{/}',
    '{bodySilver} é usado para negociação de energia GregTech ou pagamento de equipamentos multibloco{/}',
])

e.create('dishanhai:silver_coin')
  .displayName('Moeda GT de prata')
  .texture('dishanhai_item:item/silver_coin')

DShanhaiItemTooltipAPI.register('dishanhai:silver_coin', [
    'Moeda GT de prata {golden} {/}',
    '{bodySilver} Moeda de prata, excelente condutividade elétrica{/}',
    '{bodySilver} costuma ser usado para transações de valor médio e compras de projetos especiais{/}',
])


e.create('dishanhai:gold_coin')
  .displayName('Moeda GT de ouro')
  .texture('dishanhai_item:item/gold_coin')

DShanhaiItemTooltipAPI.register('dishanhai:gold_coin', [
    'Moeda GT de Ouro {golden} {/}',
    'Moeda ouro {bodySilver}, moeda padrão de alto valor{/}',
    '{bodySilver} O meio de troca para a maioria dos componentes de última geração e recursos raros{/}',
])

e.create('dishanhai:platinum_coin')
  .displayName('Moeda GT Platina')
  .texture('dishanhai_item:item/platinum_coin')

DShanhaiItemTooltipAPI.register('dishanhai:platinum_coin', [
    'Moeda GT Platina {golden} {/}',
    'Moeda {bodySilver} Platinum, resistente à corrosão e de alta densidade{/}',
    '{bodySilver} é usado para pagar equipamentos de alto nível ou materiais extradimensionais{/}',
])

e.create('dishanhai:osmium_coin')
  .displayName('Moeda GT de Ósmio')
  .texture('dishanhai_item:item/osmium_coin')

DShanhaiItemTooltipAPI.register('dishanhai:osmium_coin', [
    'Moeda GT de Ósmio {golden} {/}',
    '{bodySilver} Moeda de ósmio, com dureza e densidade{/}',
    '{bodySilver} Moedas de transação envolvendo distorção de tempo e espaço ou processos de pressão extremamente alta{/}',
])

e.create('dishanhai:naquadah_coin')
  .displayName('Moeda Silicon Rock GT')
  .texture('dishanhai_item:item/naquadah_coin')

DShanhaiItemTooltipAPI.register('dishanhai:naquadah_coin', [
    'Moeda GT Silicon Rock {golden} {/}',
    '{bodySilver} é feito de sílica (Naquadah) e contém energia anormal{/}',
    '{bodySilver} raramente circula e é mais comumente encontrado no comércio interdimensional ou no Shadow Conclave{/}',
])

e.create('dishanhai:neutronium_coin')
  .displayName('Moeda GT de nêutrons')
  .texture('dishanhai_item:item/neutronium_coin')

DShanhaiItemTooltipAPI.register('dishanhai:neutronium_coin', [
    'Moeda GT Neutron {golden} {/}',
    '{bodySilver} é comprimido a partir de matéria degenerada de nêutrons, e sua densidade se aproxima do limite teórico{/}',
    '{bodySilver} é usado para a transação final. Dizem que até a gravidade pode ser comprada {/}',
])

e.create('dishanhai:magmatter_coin')
  .displayName('Moeda GT de material magnético')
  .texture('dishanhai_item:item/magmatter_coin')
DShanhaiItemTooltipAPI.register('dishanhai:magmatter_coin', [
    'Moeda GT de material magnético {golden} {/}',
    '{bodySilver} é feito de matéria estelar ligada magneticamente, com luz escura derretida fluindo na superfície{/}',
])

e.create('dishanhai:magnetohydrodynamicallyconstrainedstarmatter_coin')
  .displayName('Moeda GT de matéria estelar confinada com fluido magnético')
  .texture('dishanhai_item:item/magnetohydrodynamicallyconstrainedstarmatter_coin')
DShanhaiItemTooltipAPI.register('dishanhai:magnetohydrodynamicallyconstrainedstarmatter_coin', [
    'Moeda GT de matéria estelar com restrição de fluido magnético {golden} {/}',
    '{bodySilver} é feito de fluido magnético restringindo matéria estelar, e fluido estelar de alta energia surge na superfície da moeda{/}',
])

e.create('dishanhai:primordialmatter_coin')
  .displayName('Moeda de Material de Origem Fluida')
  .texture('dishanhai_item:item/primordialmatter_coin')
DShanhaiItemTooltipAPI.register('dishanhai:primordialmatter_coin', [
    'Moeda de material de origem fluida {golden} {/}',
    '{bodySilver} é feito de material original fluido, e as estrelas azuis e brancas antes da criação da moeda estão surgindo na superfície{/}',
])

e.create('dishanhai:spacetime_coin')
  .displayName('Moeda GT Tempo e Espaço')
  .texture('dishanhai_item:item/spacetime_coin')
DShanhaiItemTooltipAPI.register('dishanhai:spacetime_coin', [
    '{golden} Moeda GT Tempo e Espaço{/}',
    '{bodySilver} é feito de tempo e espaço liquefeitos, e a superfície da moeda pisca entre o passado e o futuro{/}',
])

e.create('dishanhai:transcendentmetal_coin')
  .displayName('Moeda GT Super Dimensão')
  .texture('dishanhai_item:item/transcendentmetal_coin')
DShanhaiItemTooltipAPI.register('dishanhai:transcendentmetal_coin', [
    'Moeda GT Super Dimensão {golden} {/}',
    '{bodySilver} é feito de matéria extradimensional, e o corpo da moeda mostra uma mudança de fase tridimensional{/}',
])

e.create('dishanhai:cosmic_coin')
  .displayName('Moeda GT do Universo')
  .texture('dishanhai_item:item/cosmic_coin')
DShanhaiItemTooltipAPI.register('dishanhai:cosmic_coin', [
    'Moeda GT do Universo {golden} {/}',
    '{bodySilver} é feito de matéria cósmica, e a superfície da moeda é coberta por padrões de luz do mar de estrelas{/}',
])

e.create('dishanhai:neutron_coin')
  .displayName('Moeda GT de nêutrons cósmicos')
  .texture('dishanhai_item:item/neutron_coin')
DShanhaiItemTooltipAPI.register('dishanhai:neutron_coin', [
    'Moeda GT de nêutrons cósmicos {golden} {/}',
    '{bodySilver} é feito de nêutrons cósmicos, e a luz de nêutrons cósmicos flui na superfície da moeda{/}',
])

e.create('dishanhai:eternity_coin')
  .displayName('Moeda GT Eterna')
  .texture('dishanhai_item:item/eternity_coin')
DShanhaiItemTooltipAPI.register('dishanhai:eternity_coin', [
    'Moeda GT Eterna {golden} {/}',
    '{bodySilver} é feito de fluido eterno, com infinitos vórtices estelares verde-púrpura circulando na superfície da moeda{/}',
])

e.create('dishanhai:chaos_coin')
  .displayName('Moeda da Matéria do Caos')
  .texture('dishanhai_item:item/chaos_coin')
DShanhaiItemTooltipAPI.register('dishanhai:chaos_coin', [
    'Moeda de Material do Caos {golden} {/}',
    '{bodySilver} é feito de matéria caótica, com indescritíveis marcas de estrelas brancas brilhando na superfície{/}',
])

e.create('dishanhai:star_gate_crystal_slurry_coin')
  .displayName('Moeda de Cristal Star Gate')
  .texture('dishanhai_item:item/star_gate_crystal_slurry_coin')

DShanhaiItemTooltipAPI.register('dishanhai:star_gate_crystal_slurry_coin', [
    'Moeda de Cristal Star Gate {golden} {/}',
    '{bodySilver} é feito de pasta de cristal do portal estelar, e a luz do cristal do arco-íris fluindo na superfície da moeda leva ao portal estelar.{/}',
])

e.create('dishanhai:infinite_coin')
  .displayName('Moedas GT infinitas')
  .texture('dishanhai_item:item/infinite_coin')
  DShanhaiItemTooltipAPI.register('dishanhai:infinite_coin', [
    'Moedas GT infinitas {golden} {/}',
    '{bodySilver} Feito de matéria infinita, "O que está na palma da sua mão é o poder do universo"{/}',
])

e.create('dishanhai:coin_secondary')
  .displayName('Moeda GT do Nada')
  .texture('dishanhai_item:item/coin_secondary')


e.create('dishanhai:stupid_coin')
  .displayName('RMB estúpido')
  .texture('dishanhai_item:item/stupid_coin')

DShanhaiItemTooltipAPI.register('dishanhai:stupid_coin', [

    '{golden} RMB estúpido{/}',
    '{bodySilver} RMB puro e estúpido, sem valor{/}',
])


e.create('dishanhai:sadbapycat_token')
  .displayName('Token SadBapyCat')
  .texture('dishanhai_item:item/sadbapycat_token')

DShanhaiItemTooltipAPI.register('dishanhai:sadbapycat_token', [
    'Token {golden} SadBapyCat{/}',
    '{bodySilver} Uma moeda comemorativa deixada por um gatinho triste, sem valor real{/}',
    '{bodySilver} Mas quem tem coragem de jogá-lo fora? {/}',
])

e.create('dishanhai:naan')
  .displayName('Naan')
  .texture('dishanhai_item:item/naan')
DShanhaiItemTooltipAPI.register('dishanhai:naan', [
    '{golden} Nang{/}',
    '{bodySilver} Ele segura o óleo, mas não consegue recolher o naan?{/}',
])

e.create('dishanhai:proxy_resonance_core_mk1')
  .displayName('& $ núcleo de ressonância do agente cósmico MK1')
  .texture('dishanhai_item:item/proxy_resonance_core_mk1')
  .maxStackSize(1)
  .fireResistant(true)
DShanhaiItemTooltipAPI.register('dishanhai:proxy_resonance_core_mk1', [
    'Núcleo de ressonância do agente {golden} MK1{/}',
    '{bodySilver} é colocado no slot de amplificação do executor do agente para aumentar a taxa de multiplicação paralela do agente para 16x.{/}',
    '{ultimateRainbow} Quando a máquina de destino está totalmente empilhada, o paralelismo do agente pode atingir 524288{/}'
])

e.create('dishanhai:proxy_resonance_core_mk1a')
  .displayName('& $ núcleo de ressonância do agente cósmico MK1A')
  .texture('dishanhai_item:item/proxy_resonance_core_mk1a')
  .maxStackSize(1)
  .fireResistant(true)
DShanhaiItemTooltipAPI.register('dishanhai:proxy_resonance_core_mk1a', [
    'Núcleo de ressonância do agente {golden} MK1A{/}',
    '{bodySilver} é colocado no slot de amplificação do executor do agente para aumentar a taxa de multiplicação paralela do agente para 32x.{/}',
    '{ultimateRainbow} Quando a máquina de destino está totalmente empilhada, o paralelismo do agente pode atingir 1048576{/}'
])

e.create('dishanhai:proxy_resonance_core_mk1b')
  .displayName('& $ núcleo de ressonância do agente cósmico MK1B')
  .texture('dishanhai_item:item/proxy_resonance_core_mk1b')
  .maxStackSize(1)
  .fireResistant(true)
DShanhaiItemTooltipAPI.register('dishanhai:proxy_resonance_core_mk1b', [
    'Núcleo de ressonância do agente {golden} MK1B{/}',
    '{bodySilver} é colocado no slot de amplificação do executor do agente para aumentar a taxa de multiplicação paralela do agente para 48x.{/}',
    '{ultimateRainbow} Quando a máquina de destino está totalmente empilhada, o paralelismo do agente pode atingir 1572864{/}'
])

e.create('dishanhai:proxy_resonance_core_mk2')
  .displayName('& $ Núcleo de Ressonância do Agente Cósmico MK2')
  .texture('dishanhai_item:item/proxy_resonance_core_mk2')
  .maxStackSize(1)
  .fireResistant(true)
DShanhaiItemTooltipAPI.register('dishanhai:proxy_resonance_core_mk2', [
    'Núcleo de ressonância do agente {golden} MK2{/}',
    '{bodySilver} é colocado no slot de amplificação do executor do agente para aumentar a taxa de multiplicação paralela do agente para 256x{/}',
    '{ultimateRainbow} Quando a máquina de destino está totalmente empilhada, o número de agentes em paralelo pode chegar a 8.388.608{/}'
])

e.create('dishanhai:proxy_resonance_core_mk2a')
  .displayName('& $ núcleo de ressonância do agente cósmico MK2A')
  .texture('dishanhai_item:item/proxy_resonance_core_mk2a')
  .maxStackSize(1)
  .fireResistant(true)
DShanhaiItemTooltipAPI.register('dishanhai:proxy_resonance_core_mk2a', [
    'Núcleo de ressonância do agente {golden} MK2A{/}',
    '{bodySilver} é colocado no slot de amplificação do executor do agente para aumentar a taxa de multiplicação paralela do agente para 512x{/}',
    '{ultimateRainbow} Quando a máquina de destino está totalmente empilhada, o número de agentes em paralelo pode chegar a 16777216{/}'
])

e.create('dishanhai:proxy_resonance_core_mk2b')
  .displayName('& $ núcleo de ressonância do agente cósmico MK2B')
  .texture('dishanhai_item:item/proxy_resonance_core_mk2b')
  .maxStackSize(1)
  .fireResistant(true)
DShanhaiItemTooltipAPI.register('dishanhai:proxy_resonance_core_mk2b', [
    'Núcleo de ressonância do agente {golden} MK2B{/}',
    '{bodySilver} é colocado no slot de amplificação do executor do agente para aumentar a taxa de multiplicação paralela do agente para 768x{/}',
    '{ultimateRainbow} Quando a máquina de destino está totalmente empilhada, o número de agentes em paralelo pode chegar a 25165824{/}'
])

e.create('dishanhai:proxy_resonance_core_mk3')
  .displayName('&$ultimate-Agent Resonance Core MK3')
  .texture('dishanhai_item:item/proxy_resonance_core_mk3')
  .maxStackSize(1)
  .fireResistant(true)
DShanhaiItemTooltipAPI.register('dishanhai:proxy_resonance_core_mk3', [
    'Núcleo de ressonância do agente {golden} MK3{/}',
    '{bodySilver} é colocado no slot de amplificação do executor do agente para aumentar a taxa de multiplicação paralela do agente para 1.024x.{/}',
    '{ultimateRainbow} Quando a máquina de destino está totalmente empilhada, o paralelismo do agente pode chegar a 33554432{/}'
])

e.create('dishanhai:proxy_resonance_core_mk3a')
  .displayName('&$ultimate-Núcleo de ressonância do agente MK3A')
  .texture('dishanhai_item:item/proxy_resonance_core_mk3a')
  .maxStackSize(1)
  .fireResistant(true)
DShanhaiItemTooltipAPI.register('dishanhai:proxy_resonance_core_mk3a', [
    'Núcleo de ressonância do agente {golden} MK3A{/}',
    '{bodySilver} é colocado no slot de amplificação do executor do agente para aumentar a taxa de multiplicação paralela do agente para 2.048x.{/}',
    '{ultimateRainbow} Quando a máquina de destino está totalmente empilhada, o número de agentes em paralelo pode chegar a 67108864{/}'
])

e.create('dishanhai:proxy_resonance_core_mk3b')
  .displayName('&$ultimate-Núcleo de ressonância do agente MK3B')
  .texture('dishanhai_item:item/proxy_resonance_core_mk3b')
  .maxStackSize(1)
  .fireResistant(true)
DShanhaiItemTooltipAPI.register('dishanhai:proxy_resonance_core_mk3b', [
    'Núcleo de ressonância do agente {golden} MK3B{/}',
    '{bodySilver} é colocado no slot de amplificação do executor do agente para aumentar a taxa de multiplicação paralela do agente para 3.072x.{/}',
    '{ultimateRainbow} Quando a máquina de destino está totalmente empilhada, o paralelismo do agente pode atingir 100663296{/}'
])

e.create('dishanhai:proxy_resonance_core_mk4')
  .displayName('&$ultimate-Agent Resonance Core MK4')
  .texture('dishanhai_item:item/proxy_resonance_core_mk4')
  .maxStackSize(1)
  .fireResistant(true)
DShanhaiItemTooltipAPI.register('dishanhai:proxy_resonance_core_mk4', [
    'Núcleo de ressonância do agente {golden} MK4{/}',
    '{bodySilver} é colocado no slot de amplificação do executor do agente para aumentar a taxa de multiplicação paralela do agente para 4.096x.{/}',
    '{ultimateRainbow} Quando a máquina de destino está totalmente empilhada, o paralelismo do agente pode atingir 134217728{/}'
])

e.create('dishanhai:proxy_resonance_core_mk4a')
  .displayName('&$ultimate-Núcleo de ressonância do agente MK4A')
  .texture('dishanhai_item:item/proxy_resonance_core_mk4a')
  .maxStackSize(1)
  .fireResistant(true)
DShanhaiItemTooltipAPI.register('dishanhai:proxy_resonance_core_mk4a', [
    'Núcleo de ressonância do agente {golden} MK4A{/}',
    '{bodySilver} é colocado no slot de amplificação do executor do agente para aumentar a taxa de multiplicação paralela do agente para 8192x{/}',
    '{ultimateRainbow} Quando a máquina de destino está totalmente empilhada, o número de agentes em paralelo pode chegar a 268435456{/}'
])

e.create('dishanhai:proxy_resonance_core_mk4b')
  .displayName('&$ultimate-Núcleo de ressonância do agente MK4B')
  .texture('dishanhai_item:item/proxy_resonance_core_mk4b')
  .maxStackSize(1)
  .fireResistant(true)
DShanhaiItemTooltipAPI.register('dishanhai:proxy_resonance_core_mk4b', [
    'Núcleo de ressonância do agente {golden} MK4B{/}',
    '{bodySilver} é colocado no slot de amplificação do executor do agente para aumentar a taxa de multiplicação paralela do agente para 12288x{/}',
    '{ultimateRainbow} Quando a máquina de destino está totalmente empilhada, o paralelismo do agente pode atingir 402653184{/}'
])

e.create('dishanhai:proxy_resonance_core_mk5')
  .displayName('&$ultimate-Agent Resonance Core MK5')
  .texture('dishanhai_item:item/proxy_resonance_core_mk5')
  .maxStackSize(1)
  .fireResistant(true)
DShanhaiItemTooltipAPI.register('dishanhai:proxy_resonance_core_mk5', [
    'Núcleo de ressonância do agente {golden} MK5{/}',
    '{bodySilver} é colocado no slot de amplificação do executor do agente para aumentar a taxa de multiplicação paralela do agente para 16384x{/}',
    '{ultimateRainbow} Quando a máquina de destino está totalmente empilhada, o número de agentes em paralelo pode chegar a 536870912{/}'
])

e.create('dishanhai:proxy_resonance_core_mk5a')
  .displayName('&$ultimate-Núcleo de ressonância do agente MK5A')
  .texture('dishanhai_item:item/proxy_resonance_core_mk5a')
  .maxStackSize(1)
  .fireResistant(true)
DShanhaiItemTooltipAPI.register('dishanhai:proxy_resonance_core_mk5a', [
    'Núcleo de ressonância do agente {golden} MK5A{/}',
    '{bodySilver} é colocado no slot de amplificação do executor do agente para aumentar a taxa de multiplicação paralela do agente para 32.768x{/}',
    '{ultimateRainbow} Quando a máquina de destino está totalmente empilhada, o paralelismo do agente pode atingir 1073741824{/}'
])

e.create('dishanhai:proxy_resonance_core_mk5b')
  .displayName('&$ultimate-Núcleo de ressonância do agente MK5B')
  .texture('dishanhai_item:item/proxy_resonance_core_mk5b')
  .maxStackSize(1)
  .fireResistant(true)
DShanhaiItemTooltipAPI.register('dishanhai:proxy_resonance_core_mk5b', [
    'Núcleo de ressonância do agente {golden} MK5B{/}',
    '{bodySilver} é colocado no slot de amplificação do executor do agente para aumentar a taxa de multiplicação paralela do agente para 49152x{/}',
    '{ultimateRainbow} Quando a máquina de destino está totalmente empilhada, o número de agentes em paralelo pode chegar a 1610612736{/}'
])

e.create('dishanhai:proxy_resonance_core_mk6')
  .displayName('&$ultimate-Agent Resonance Core MK6')
  .texture('dishanhai_item:item/proxy_resonance_core_mk6')
  .maxStackSize(1)
  .fireResistant(true)
DShanhaiItemTooltipAPI.register('dishanhai:proxy_resonance_core_mk6', [
    'Núcleo de ressonância do agente {golden} MK6{/}',
    '{bodySilver} é colocado no slot de amplificação do executor do agente para aumentar a taxa de multiplicação paralela do agente para 65536x{/}',
    '{ultimateRainbow} Quando a máquina de destino está totalmente empilhada, o paralelismo do agente pode atingir Integer.MAX_VALUE{/}'
])

e.create('dishanhai:proxy_resonance_core_mk6a')
  .displayName('&$ultimate-Núcleo de ressonância do agente MK6A')
  .texture('dishanhai_item:item/proxy_resonance_core_mk6a')
  .maxStackSize(1)
  .fireResistant(true)
DShanhaiItemTooltipAPI.register('dishanhai:proxy_resonance_core_mk6a', [
    'Núcleo de ressonância do agente {golden} MK6A{/}',
    '{bodySilver} é colocado no slot de amplificação do executor do agente para aumentar a taxa de multiplicação paralela do agente para 131072x{/}',
    '{ultimateRainbow} Quando a máquina de destino está totalmente empilhada, o paralelismo do agente pode atingir Integer.MAX_VALUE{/}'
])

e.create('dishanhai:proxy_resonance_core_mk6b')
  .displayName('&$ultimate-Núcleo de ressonância do agente MK6B')
  .texture('dishanhai_item:item/proxy_resonance_core_mk6b')
  .maxStackSize(1)
  .fireResistant(true)
DShanhaiItemTooltipAPI.register('dishanhai:proxy_resonance_core_mk6b', [
    'Núcleo de ressonância do agente {golden} MK6B{/}',
    '{bodySilver} é colocado no slot de amplificação do executor do agente para aumentar a taxa de multiplicação paralela do agente para 196608x{/}',
    '{ultimateRainbow} Quando a máquina de destino está totalmente empilhada, o paralelismo do agente pode atingir Integer.MAX_VALUE{/}'
])


    TooltipAPI.register("gt_shanhai:black_hole_containment", [
        '',
        '{ultimateRainbow} As estrelas não são eternas, mesmo a luz ficará silenciosa em uma gravidade profunda o suficiente',
        '{golden} usa o poder do horizonte de eventos para comprimir a singularidade da matéria em um volume infinitamente pequeno',
        '{sakura} BHC não é para criar destruição, mas para domar a destruição em uma ferramenta',
        '{lava} Ele usa fluido espaço-tempo para manter o limite, usa a estrutura de nêutrons para restringir o colapso e usa o horizonte de eventos como a superfície de processamento mais extrema',

    ]);

    
    // ===== 七十二变物品注册 =====
    TooltipAPI.register('dishanhai:wanxiang_core', [
        '{electric} Setenta e duas mudanças · Método da Mente do Núcleo de Todas as Coisas',
        '{golden} Tudo no céu e na terra pode ser transformado. Aqueles que ganharam essa mentalidade,',
        '{magic} Observe o fluxo de todas as coisas e compreenda as oportunidades da boa sorte.',
        '{nature} Contudo, a maneira de mudar não é saquear, mas compreender.',
        '{electric} ——Somente compreendendo a essência de todas as coisas podemos mudar a forma de todas as coisas.',
    ]);;



})//物品注册回调内

// ===== 流体注册 =====
StartupEvents.registry('fluid', function(event) {

    event.create("dishanhai:zero_point_energy")
        .stillTexture("dishanhai_item:block/fluid/zero_point_energy")
        .flowingTexture("dishanhai_item:block/fluid/zero_point_energy_flow")
        .displayName("energia do ponto zero do vácuo").temperature(8000).luminosity(15).bucketColor(0x88ddff)
        .density(10).viscosity(5);
    event.create("dishanhai:light")
        .stillTexture("dishanhai_item:block/fluid/light_fluid")
        .flowingTexture("dishanhai_item:block/fluid/light_fluid_flow")
        .displayName("Luz").temperature(0).luminosity(15).bucketColor(0xffffdd)
        .density(1).viscosity(1);
    event.create("dishanhai:liquid_ending")
        .stillTexture("dishanhai_item:block/fluid/liquid_ending")
        .flowingTexture("dishanhai_item:block/fluid/liquid_ending_flow")
        .displayName("terminal líquido").temperature(5000).luminosity(15).bucketColor(0x440011)
        .density(2200).viscosity(1800);

    event.create("dishanhai:matter_fluid_entry")
        .stillTexture("dishanhai_item:block/fluid/matter_fluid_entry")
        .flowingTexture("dishanhai_item:block/fluid/matter_fluid_entry")
        .displayName("Primeiros passos Fluxo de materiais").temperature(300).luminosity(3).bucketColor(0x66bb88)
        .density(800).viscosity(600);
    event.create("dishanhai:matter_fluid_foundation")
        .stillTexture("dishanhai_item:block/fluid/matter_fluid_foundation")
        .flowingTexture("dishanhai_item:block/fluid/matter_fluid_foundation")
        .displayName("fluxo básico de materiais").temperature(400).luminosity(4).bucketColor(5622920)
        .density(900).viscosity(700);
    event.create("dishanhai:matter_fluid_basic")
        .stillTexture("dishanhai_item:block/fluid/matter_fluid_basic")
        .flowingTexture("dishanhai_item:block/fluid/matter_fluid_basic_flow")
        .displayName("Deduzindo o fluxo de material").temperature(600).luminosity(4).bucketColor(0x44aadd)
        .density(1200).viscosity(800);
    event.create("dishanhai:matter_fluid_virtual")
        .stillTexture("dishanhai_item:block/fluid/matter_fluid_virtual")
        .flowingTexture("dishanhai_item:block/fluid/matter_fluid_virtual_flow")
        .displayName("fluxo de material virtual").temperature(800).luminosity(5).bucketColor(18290)
        .density(1100).viscosity(800);
    event.create("dishanhai:matter_fluid_transmutation")
        .stillTexture("dishanhai_item:block/fluid/matter_fluid_transmutation")
        .flowingTexture("dishanhai_item:block/fluid/matter_fluid_transmutation")
        .displayName("fluxo de material de transmutação").temperature(700).luminosity(5).bucketColor(14509619)
        .density(1300).viscosity(900);
    event.create("dishanhai:matter_fluid_darkstar")
        .stillTexture("dishanhai_item:block/fluid/matter_fluid_darkstar")
        .flowingTexture("dishanhai_item:block/fluid/matter_fluid_darkstar_flow")
        .displayName("Fluxo de material da estrela negra").temperature(1100).luminosity(7).bucketColor(4208660)
        .density(2000).viscosity(1500);
    event.create("dishanhai:matter_fluid_advanced")
        .stillTexture("dishanhai_item:block/fluid/matter_fluid_advanced")
        .flowingTexture("dishanhai_item:block/fluid/matter_fluid_advanced_flow")
        .displayName("Reorganizar o fluxo de materiais").temperature(1000).luminosity(6).bucketColor(0xdd8844)
        .density(1500).viscosity(1000);
    event.create("dishanhai:matter_fluid_transition")
        .stillTexture("dishanhai_item:block/fluid/matter_fluid_transition")
        .flowingTexture("dishanhai_item:block/fluid/matter_fluid_transition_flow")
        .displayName("Fluxo de material de transição de número imaginário").temperature(1400).luminosity(8).bucketColor(0x8c3cd0)
        .density(1800).viscosity(1200);
    event.create("dishanhai:matter_fluid_zero")
        .stillTexture("dishanhai_item:block/fluid/matter_fluid_zero")
        .flowingTexture("dishanhai_item:block/fluid/matter_fluid_zero")
        .displayName("Fluxo de material zero").temperature(1500).luminosity(8).bucketColor(8930474)
        .density(2500).viscosity(1800);
    event.create("dishanhai:matter_fluid_ascension")
        .stillTexture("dishanhai_item:block/fluid/matter_fluid_ascension")
        .flowingTexture("dishanhai_item:block/fluid/matter_fluid_ascension")
        .displayName("Fluxo de material dimensional ascendente").temperature(2000).luminosity(9).bucketColor(3377390)
        .density(3000).viscosity(2000);
    event.create("dishanhai:matter_fluid_transcend")
        .stillTexture("dishanhai_item:block/fluid/matter_fluid_transcend")
        .flowingTexture("dishanhai_item:block/fluid/matter_fluid_transcend")
        .displayName("fluxo de material trans-limite").temperature(3000).luminosity(11).bucketColor(15610709)
        .density(4000).viscosity(3000);
    event.create("dishanhai:matter_fluid_peak")
        .stillTexture("dishanhai_item:block/fluid/matter_fluid_peak")
        .flowingTexture("dishanhai_item:block/fluid/matter_fluid_peak_flow")
        .displayName("pico de fluxo de material").temperature(1700).luminosity(9).bucketColor(11184640)
        .density(3500).viscosity(2500);
    event.create("dishanhai:matter_fluid_eternal")
        .stillTexture("dishanhai_item:block/fluid/matter_fluid_eternal")
        .flowingTexture("dishanhai_item:block/fluid/matter_fluid_eternal")
        .displayName("fluxo material eterno").temperature(5000).luminosity(13).bucketColor(13412915)
        .density(6000).viscosity(5000);
    event.create("dishanhai:matter_fluid_ultimate")
        .stillTexture("dishanhai_item:block/fluid/matter_fluid_ultimate")
        .flowingTexture("dishanhai_item:block/fluid/matter_fluid_ultimate_flow")
        .displayName("criar fluxo de materiais").temperature(2000).luminosity(10).bucketColor(0xaa44dd)
        .density(2000).viscosity(1400);

    event.create("dishanhai:primal_chaos")
        .stillTexture("dishanhai_item:block/fluid/primal_chaos")
        .flowingTexture("dishanhai_item:block/fluid/primal_chaos_flow")
        .displayName("caos primordial").temperature(100).luminosity(3).bucketColor(0x332255)
        .density(3000).viscosity(2500);

    event.create("dishanhai:dimensional_fabric")
        .stillTexture("dishanhai_item:block/fluid/dimensional_fabric")
        .flowingTexture("dishanhai_item:block/fluid/dimensional_fabric_flow")
        .displayName("Textura dimensional").temperature(3000).luminosity(10).bucketColor(0x88bbff)
        .density(1800).viscosity(1400);

    event.create("dishanhai:causal_essence")
        .stillTexture("dishanhai_item:block/fluid/causal_essence")
        .flowingTexture("dishanhai_item:block/fluid/causal_essence_flow")
        .displayName("essência de causa e efeito").temperature(2000).luminosity(8).bucketColor(0xffaa44)
        .density(2200).viscosity(1800);

    event.create("dishanhai:stabilized_eternity")
        .stillTexture("dishanhai_item:block/fluid/stabilized_eternity")
        .flowingTexture("dishanhai_item:block/fluid/stabilized_eternity_flow")
        .displayName("eternidade em estado estacionário").temperature(6000).luminosity(12).bucketColor(0xeeeeff)
        .density(2800).viscosity(2200);

    event.create("dishanhai:chaos_fluid")
        .stillTexture("dishanhai_item:block/fluid/chaos_fluid")
        .flowingTexture("dishanhai_item:block/fluid/chaos_fluid_flow")
        .displayName("caos eterno").temperature(9999).luminosity(15).bucketColor(0x442266)
        .density(3000).viscosity(3000);

    // ===== 世线光刻催化剂（电路增产·方案B） =====
    event.create("dishanhai:wl_catalyst")
        .stillTexture("dishanhai_item:block/fluid/wl_catalyst")
        .flowingTexture("dishanhai_item:block/fluid/wl_catalyst")
        .displayName("Catalisador de Litografia ShiLian").temperature(800).luminosity(7).bucketColor(0xffcc44)
        .density(1600).viscosity(900);

    // ===== 寰宇联合冷却液 =====
    event.create("dishanhai:universal_coolant")
        .stillTexture("dishanhai_item:block/fluid/universal_coolant")
        .flowingTexture("dishanhai_item:block/fluid/universal_coolant_flow")
        .displayName("Refrigerante universal").temperature(0).luminosity(2).bucketColor(0x00aadd)
        .density(1100).viscosity(800);

    // ===== 黑洞时空流体 =====
    event.create("dishanhai:spacetime")
        .stillTexture("dishanhai_item:block/fluid/spacetime")
        .flowingTexture("dishanhai_item:block/fluid/spacetime_flow")
        .displayName("fluido espaço-tempo").temperature(0).luminosity(7).bucketColor(0x1a0a2e)
        .density(5000).viscosity(4000);

    console.log('[Shan Hai Private Goods] Registro de fluido concluído: 13 fluido');
});

// ===== 方块注册 =====
StartupEvents.registry('block', function(event) {
    event.create("ultimate_coil_block", "gtceu:coil")
        .texture("kubejs:block/ultimate_coil_block")
        .temperature(200000).energyDiscount(1).level(100000).tier(9)
        .tagBlock("mineable/pickaxe").tagBlock("forge:mineable/wrench");

    var eternalWorkshopCasings = [
        "naquadria_reinforced_water_plant_casing",
        "particle_beam_guidance_pipe_casing",
        "quark_exclusion_casing",
        "reinforced_temporal_structure_casing",
        "gallifreyan_spacetime_compression_field_generator",
        "gallifreyan_time_dilation_field_generator",
        "reinforced_spatial_structure_casing",
        "gallifreyan_stabilisation_field_generator"
    ];

    eternalWorkshopCasings.forEach(function(id) {
        event.create("dishanhai:" + id, "basic")
            .textureAll("dishanhai:block/" + id)
            .noValidSpawns(true)
            .soundType("metal")
            .mapColor("metal")
            .tagBlock("mineable/pickaxe")
            .tagBlock("forge:mineable/wrench")
            .requiresTool(true);
    });

    ["omni_purpose_infinity_fused_glass", "transcendentally_reinforced_borosilicate_glass"].forEach(function(id) {
        event.create("dishanhai:" + id, "basic")
            .textureAll("dishanhai:block/" + id)
            .noValidSpawns(true)
            .soundType("glass")
            .mapColor("metal")
            .tagBlock("mineable/pickaxe")
            .requiresTool(true)
            .defaultTranslucent();
    });

});

// ===== 流体 tooltip 注册（委托 Java 侧 DShanhaiFluidTooltipAPI）=====
console.log('Tipo DShanhaiFluidTooltipAPI:' + (typeof DShanhaiFluidTooltipAPI) + ', register: ' + (typeof DShanhaiFluidTooltipAPI !== 'undefined' ? typeof DShanhaiFluidTooltipAPI.register : 'N/A'));
try {
    if (typeof DShanhaiFluidTooltipAPI !== 'undefined' && typeof DShanhaiFluidTooltipAPI.register === 'function') {
        DShanhaiFluidTooltipAPI.register("dishanhai:primal_chaos", [
            "O ponto inicial e o ponto final da linha mundial pertencem ao {aurora} Chaos{/}.",
            "Não é desordem: é o estado original {magic} que transcende a ordem e a desordem{/}.",
            "{bodySilver} Nesse caos, a primeira linha mundial começou a vibrar...{/}"
        ]);
        DShanhaiFluidTooltipAPI.register("dishanhai:dimensional_fabric", [
            "{water} Tecido dimensional{/}: o tecido da realidade, entrelaçado pela urdidura e trama de universos paralelos.",
            "{bodySilver} Cada fibra é uma cadeia completa de causa e efeito. {/}",
            "{bodySilver} A essência da transmissão através das linhas mundiais é apenas dar um passo na textura do tecido. {/}"
        ]);
        DShanhaiFluidTooltipAPI.register("dishanhai:causal_essence", [
            "{golden} A essência de causa e efeito{/}——A lógica subjacente das setenta e duas mudanças.",
            "{bodySilver} Ele define as condições de limite que tornam possível a {/} alteração de {fire} {/} {bodySilver}. {/}",
            "{bodySilver} Cada gota de essência carrega um ramo não observado de causa e efeito. {/}"
        ]);
        DShanhaiFluidTooltipAPI.register("dishanhai:stabilized_eternity", [
            "{neon} Steady Eternity{/}——O ponto de equilíbrio encontrado entre criação e destruição.",
            "{bodySilver} Não está estacionário, mas em fase perfeita com ressonância. {/}",
            "O módulo de criação {bodySilver} se baseia nisso, transformando pulsos breves em existência sustentada. {/}"
        ]);

        // === 原有 7 流体 ===
        DShanhaiFluidTooltipAPI.register("dishanhai:zero_point_energy", [
            "{aurora} Energia do ponto zero do vácuo{/}: a energia residual das flutuações quânticas do vácuo.",
            "{bodySilver} Mesmo num vácuo de zero absoluto, a energia nunca retorna verdadeiramente a zero. {/}",
            "{bodySilver} Está em todo lugar. É inesgotável. Ele espera silenciosamente para ser acordado. {/}"
        ]);
        DShanhaiFluidTooltipAPI.register("dishanhai:liquid_ending", [
            "Terminal Líquido {sunset} {/}: a forma fluida do Anel do Terminal.",
            "{bodySilver} Registra o fim de toda a realidade – não a destruição, mas a conclusão. {/}",
            "{bodySilver} Cada gota é o número da página final de uma linha do tempo. {/}"
        ]);
        DShanhaiFluidTooltipAPI.register("dishanhai:matter_fluid_entry", [
            "{neon} Introdução ao fluxo de materiais{/}——O ponto de partida do sistema de fluxo de materiais.",
            "{bodySilver} O transportador mais básico de energia material, ele nem aprendeu a acelerar em paralelo——{/}",
            "{bodySilver} Mas traz consigo o início de todas as possibilidades. {/}"
        ]);
        
        DShanhaiFluidTooltipAPI.register("dishanhai:matter_fluid_foundation", [
            "Fluxo básico de material {neon} {/}: a primeira etapa após começar.",
            "As partículas {bodySilver} começam a aprender a enfileirar-se e o paralelismo não é mais um acidente. {/}"
        ]);
        DShanhaiFluidTooltipAPI.register("dishanhai:matter_fluid_transmutation", [
            "Fluxo de material de transmutação {fire} {/} —— O rio de transformação de elementos.",
            "{bodySilver} Acelera a transição de elétrons fora do núcleo e reorganiza a matéria no nível atômico. {/}"
        ]);
        DShanhaiFluidTooltipAPI.register("dishanhai:matter_fluid_zero", [
            "{magic} Retornar ao fluxo de material zero{/} —— Retornar ao estado zero e começar uma nova vida.",
            "{bodySilver} redefine todas as deduções para zero e reconstrói a arquitetura paralela em uma velocidade mais alta. {/}"
        ]);
        DShanhaiFluidTooltipAPI.register("dishanhai:matter_fluid_ascension", [
            "{water} Fluxo de material dimensional ascendente{/}: o estado fluido na lacuna entre as dimensões.",
            "{bodySilver} busca novos espaços paralelos em dimensões superiores. {/}"
        ]);
        DShanhaiFluidTooltipAPI.register("dishanhai:matter_fluid_transcend", [
            "{crimson} Fluxo de material ultralimitado{/}: o transportador definitivo que ultrapassa todas as fronteiras.",
            "{bodySilver} Não respeita o limite de simultaneidade - pois o limite é deixado para trás por ele. {/}"
        ]);
        DShanhaiFluidTooltipAPI.register("dishanhai:matter_fluid_eternal", [
            "{golden} Fluxo material eterno{/}: a forma fluida do tempo.",
            "{bodySilver} Faz com que o paralelismo não seja mais um conceito de espaço, mas a própria {/}existência {ultimateRainbow} {/} {bodySilver}. {/}"
        ]);
        DShanhaiFluidTooltipAPI.register("dishanhai:matter_fluid_basic", [
            "{water} Fluxo de materiais primários{/}: o meio básico de reorganização de materiais.",
            "{bodySilver} Carrega as instruções moleculares mais básicas, suficientes para reorganizar elementos comuns. {/}"
        ]);
        DShanhaiFluidTooltipAPI.register("dishanhai:matter_fluid_advanced", [
            "{fire} Advanced Material Flow{/}: fluido ativo dopado com naquadah.",
            "{bodySilver} Pode executar instruções de recombinação mais complexas em nível molecular, abordando estruturas subatômicas. {/}"
        ]);
        DShanhaiFluidTooltipAPI.register("dishanhai:matter_fluid_transition", [
            "{magic} Fluxo de material de transição de números imaginários{/} —— O estado de transição entre números reais e números imaginários.",
            "{bodySilver} Não obedece ao princípio de exclusão de Pauli e qualquer volume pode ser sobreposto no mesmo ponto. {/}"
        ]);
        DShanhaiFluidTooltipAPI.register("dishanhai:matter_fluid_ultimate", [
            "{neon} Ultimate Material Flow{/} —— O meio definitivo que mistura espaço-tempo e matéria magnética.",
            "{bodySilver} Pode existir em múltiplas coordenadas ao mesmo tempo e é um verdadeiro fluido de alta dimensão. {/}"
        ]);
        DShanhaiFluidTooltipAPI.register("dishanhai:matter_fluid_creative", [
            "{ultimateRainbow} Criar fluxo de materiais{/}: o ápice do sistema de fluxo de materiais.",
            "{bodySilver} Não está sujeito a nenhuma lei física - dê-lhe uma receita e ele criará. {/}",
            "Cada vez que o “Módulo de Modificação de Realidade” {bodySilver} é executado, ele reescreve as regras nos bastidores. {/}"
        ]);
        DShanhaiFluidTooltipAPI.register("dishanhai:light", [
            "{aurora} Light{/}: um subproduto do sifão de vácuo de ponto zero, uma pura matéria condensada de radiação eletromagnética.",
            "{bodySilver} Não é um fluxo comum de fótons – é uma fluorescência quântica presa pela tensão do espaço. {/}",
            "{bodySilver} A própria luz se condensa em um fluido, que deveria ser impossível de existir em estado natural. {/}",
            "{bodySilver} É a fonte de energia da Forja de Deus e o combustível do Motor da Nebulosa. {/}",
            "{neon} Você não pode deixar de se perguntar: é luz ou é uma ilusão de luz de algum ser de dimensão superior? {/}"
        ]);
        DShanhaiFluidTooltipAPI.register("dishanhai:wl_catalyst", [
            "{golden} Worldline Photolithography Catalyst{/}: o acelerador definitivo para processos de fabricação de circuitos.",
            "{bodySilver} Dissolve as linhas da matriz de gravação Shixiana em fluido catalítico,{/}",
            "{bodySilver} desbloqueia o potencial paralelo enterrado profundamente na rede cristalina durante a etapa de litografia do circuito. {/}",
            "{water} Cada drop representa um cálculo que ainda não ocorreu – aguardando para ser ativado. {/}"
        ]);
        console.log('[山海] 13 dicas de fluido registradas');
    }
} catch(e) {
    console.warn('[山海] Falha no registro da dica de ferramenta do Fluid:' + (e.message || e));
}
})();

(function() {

// ===== 共享物品 NBT 标签数据（供启动/服务端统一使用）=====
global.__shanhai_item_tags__ = {
    "gtladditions:forge_of_the_antichrist":',"tag":{BlockEntityTag: { runningSecs: 100000L },display:{name:{}}}',
    'gtceu:eye_of_harmony':',"tag":{BlockEntityTag:{astralArrayCount:43000,parallelAmount:2147483647}}',
    'constructionwand:infinity_wand': ', tag: {wand_options:{cores:["constructionwand:core_angel"],cores_sel:1b,lock:"nolock"}}',
    'gtceu:echoite_vajra': ', tag: {DisallowContainerItem:0b,GT.Behaviours:{DisableShields:1b,Mode:2b,RelocateMinedBlocks:1b,TreeFelling:1b},GT.Tool:{AttackDamage:110.0f,AttackSpeed:2.0f,Damage:0,Enchantability:10,HarvestLevel:6,MaxDamage:63,ToolSpeed:10.0f},HideFlags:2,Unbreakable:1b}',
    'mekanism:mekasuit_helmet': ', tag: {mekData:{EnergyContainers:[{Container:0b,stored:"4096000000"}],FluidTanks:[{Tank:0b,stored:{Amount:128000,FluidName:"mekanism:nutritional_paste"}}],ProtectionPoints:153600.00610351562d,ShieldEntropy:0.0d,modules:{"mekanism:electrolytic_breathing_unit":{amount:4,enabled:1b,fill_held:1b},"mekanism:energy_unit":{amount:8,enabled:1b},"mekanism:inhalation_purification_unit":{amount:1,beneficial_effects:0b,enabled:1b,harmful_effects:1b,neutral_effects:1b},"mekanism:nutritional_injection_unit":{},"mekanismgenerators:solar_recharging_unit":{amount:8,enabled:1b},"moremekasuitmodules:advanced_interception_system_unit":{},"moremekasuitmodules:automatic_attack_unit":{amount:4,attack_hostile:1b,attack_neutral:0b,attack_other:0b,attack_player:0b,enabled:1b,range:4},"moremekasuitmodules:energy_shield_unit":{amount:10,enable_shield:1b,enabled:1b},"moremekasuitmodules:hp_boots_unit":{amount:64,enabled:1b},"moremekasuitmodules:infinite_energy_supply_unit":{},"moremekasuitmodules:infinite_interception_and_rescue_system_unit":{amount:1,chunkRemove:1b,damagesource:0b,damagesourceIndirect:0b,enabled:1b},"moremekasuitmodules:insulated_unit":{},"moremekasuitmodules:power_enhancement_unit":{amount:64,enabled:1b}}}}',
    'mekanism:mekasuit_bodyarmor': ', tag: {mekData:{EnergyContainers:[{Container:0b,stored:"4096000000"}],ProtectionPoints:409600.0061035156d,ShieldEntropy:0.0d,modules:{"mekanism:charge_distribution_unit":{},"mekanism:dosimeter_unit":{},"mekanism:energy_unit":{amount:8,enabled:1b},"mekanism:geiger_unit":{},"mekanism:gravitational_modulating_unit":{amount:1,enabled:1b,handleModeChange:1b,renderHUD:1b,speed_boost:1},"mekanism:laser_dissipation_unit":{},"moremekasuitmodules:energy_shield_unit":{amount:10,enabled:1b},"moremekasuitmodules:health_regeneration_unit":{amount:10,enabled:1b},"moremekasuitmodules:high_speed_cooling_unit":{amount:10,enabled:1b},"moremekasuitmodules:hp_boots_unit":{amount:64,enabled:1b},"moremekasuitmodules:infinite_chemical_and_fluid_supply_unit":{},"moremekasuitmodules:infinite_energy_supply_unit":{},"moremekasuitmodules:insulated_unit":{}}}}',
    'mekanism:mekasuit_pants': ', tag: {mekData:{Enchantments:[{id:"minecraft:depth_strider",lvl:4s},{id:"minecraft:swift_sneak",lvl:5s}],EnergyContainers:[{Container:0b,stored:"4096000000"}],ProtectionPoints:307200.01220703125d,ShieldEntropy:0.0d,modules:{"mekanism:energy_unit":{amount:8,enabled:1b},"mekanism:gyroscopic_stabilization_unit":{},"mekanism:hydrostatic_repulsor_unit":{amount:4,enabled:1b,swim_boost:1b},"mekanism:laser_dissipation_unit":{},"mekanism:locomotive_boosting_unit":{amount:4,enabled:1b,handleModeChange:1b,sprint_boost:3},"mekanism:motorized_servo_unit":{amount:5,enabled:1b},"mekanismgenerators:geothermal_generator_unit":{amount:8,enabled:1b},"moremekasuitmodules:energy_shield_unit":{amount:10,enabled:1b},"moremekasuitmodules:hp_boots_unit":{amount:64,enabled:1b},"moremekasuitmodules:infinite_energy_supply_unit":{},"moremekasuitmodules:insulated_unit":{}}}}',
    'mekanism:mekasuit_boots': ', tag: {mekData:{EnergyContainers:[{Container:0b,stored:"4096000000"}],ProtectionPoints:153600.00610351562d,ShieldEntropy:0.0d,modules:{"mekanism:energy_unit":{amount:8,enabled:1b},"mekanism:hydraulic_propulsion_unit":{amount:4,enabled:1b,jump_boost:2,step_assist:4},"mekanism:laser_dissipation_unit":{},"moremekasuitmodules:energy_shield_unit":{amount:10,enabled:1b},"moremekasuitmodules:hp_boots_unit":{amount:64,enabled:1b},"moremekasuitmodules:infinite_energy_supply_unit":{},"moremekasuitmodules:insulated_unit":{},"moremekasuitmodules:power_enhancement_unit":{amount:64,enabled:1b}}}}',
    'ae2:quantum_entangled_singularity': ', tag: {freq:177365839983100L}',
    'ae2:portable_item_cell_1k': ', tag: { RepairCost:0,amts:[L;1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L],exibição:{Nome:\'{"text":"Endless Toolkit"}\'}, ic:31L, internalCurrentPower:20000.0d,chaves:[{"#c":" ae2:i ",id:" avaritia:infinity_boots "},{"#c":" ae2:i ",id:" avaritia:crystal_pickaxe "},{"#c":" ae2:i ",id:" avaritia:infinity_helmet "},{"#c":" ae2:i ",id:" avaritia:infinity_bucket "},{"#c":" ae2:i ",id:" expatternprovider:infinity_cell ",tag:{registro:{"#c":" ae2:i ",id:" fragile_tool:fragile_hammer "}}},{"#c":" ae2:i ",id:" avaritia:infinity_bow "},{"#c":" ae2:i ",id:" expatternprovider:infinity_cell ",tag:{registro:{"#c":" ae2:i ",id:" fragile_tool:fragile_wire_cutter "}}},{"#c":" ae2:i ",id:" expatternprovider:infinity_cell ",tag:{registro:{"#c":" ae2:i ",id:" fragile_tool:fragile_crowbar "}}},{"#c":" ae2:i ",id:" expatternprovider:infinity_cell ",tag:{registro:{"#c":" ae2:i ",id:" fragile_tool:fragile_knife "}}},{"#c":" ae2:i ",id:" expatternprovider:infinity_cell ",tag:{registro:{"#c":" ae2:i ",id:" fragile_tool:fragile_wrench "}}},{"#c":" ae2:i ",id:" avaritia:infinity_hoe "},{"#c":" ae2:i ",id:" sophisticatedbackpacks:everlasting_upgrade "},{"#c":" ae2:i ",id:" sophisticatedbackpacks:xp_pump_upgrade ",tag:{direção:"manter", enabled:1b, level:30 }},{"#c":" ae2:i ",id:" avaritia:infinity_pants "},{"#c":" ae2:i ",id:" avaritia:skull_fire_sword ",tag: {Damage:0} },{"#c":" ae2:i ",id:" avaritia:infinity_axe "},{"#c":" ae2:i ",id:" expatternprovider:infinity_cell ",tag:{registro:{"#c":" ae2:i ",id:" fragile_tool:fragile_mortar "}}},{"#c":" ae2:i ",id:" sophisticatedbackpacks:tank_upgrade ",tag:{conteúdo:{ Amount:0,FluidName:" minecraft:empty "}}},{"#c":" ae2:i ",id:" expatternprovider:infinity_cell ",tag:{registro:{"#c":" ae2:i ",id:" fragile_tool:fragile_file "}}},{"#c":" ae2:i ",id:" sophisticatedbackpacks:advanced_void_upgrade "},{"#c":" ae2:i ",id:" avaritia:infinity_pickaxe "},{"#c":" ae2:i ",id:" avaritia:infinity_totem ",tag: {Damage:0} },{"#c":" ae2:i ",id:" sophisticatedbackpacks:advanced_refill_upgrade ",tag:{filtros:{Itens:[], Size:12 },targetSlots:{}}},{"#c":" ae2:i ",id:" sophisticatedbackpacks:stack_upgrade_omega_tier "},{"#c":" ae2:i ",id:" sophisticatedbackpacks:inception_upgrade "},{"#c":" ae2:i ",id:" expatternprovider:infinity_cell ",tag:{registro:{"#c":" ae2:i ",id:" fragile_tool:fragile_screwdriver "}}},{"#c":" ae2:i ",id:" avaritia:infinity_shovel "},{"#c":" ae2:i ",id:" avaritia:infinity_sword "},{"#c":" ae2:i ",id:" expatternprovider:infinity_cell ",tag:{registro:{"#c":" ae2:i ",id:" fragile_tool:fragile_saw "}}},{"#c":" ae2:i ",id:" avaritia:infinity_chestplate "},{"#c":" ae2:i ",id:" expatternprovider:infinity_cell ",tag:{registro:{"#c":" ae2:i ",id:" fragile_tool:fragile_mallet "}}}]}',
    "ae2wtlib:wireless_universal_terminal": ',tag:{accessPoint:{dimension:"minecraft:overworld",pos:[I;6,68,6]},blankPattern:[{Count:64b,Slot:0,id:"ae2:blank_pattern"}],craft_if_missing:1b,crafting:1b,currentTerminal:"crafting",encodedInputs:[{"#":4L,"#c":"ae2:i",id:"minecraft:beef"},{"#":4L,"#c":"ae2:i",id:"minecraft:bone"},{"#":4L,"#c":"ae2:i",id:"minecraft:leather"},{"#":1000L,"#c":"ae2:f",id:"gtceu:milk"}],encodedOutputs:[{"#":1L,"#c":"ae2:i",id:"minecraft:cow_spawn_egg"}],ex_pattern_access:1b,filter_type:"ALL",internalCurrentPower:4800000.0d,internalMaxPower:4800000.0d,magnet_settings:1b,mode:"PROCESSING",pattern_encoding:1b,pick_block:1b,restock:0b,show_pattern_providers:"NOT_FULL",singularity:[{Count:1b,Slot:0,id:"ae2:quantum_entangled_singularity",tag:{freq:177365839983100L}}],sort_by:"AMOUNT",sort_direction:"DESCENDING",stonecuttingRecipeId:"minecraft:kjs/mae2_pattern_p2p_tunnel",substitute:1b,substituteFluids:1b,upgrades:[{Count:1b,Slot:0,id:"ae2wtlib:quantum_bridge_card"},{Count:1b,Slot:1,id:"ae2wtlib:magnet_card"},{Count:1b,Slot:2,id:"ae2insertexportcard:insert_card",tag:{}},{Count:1b,Slot:3,id:"ae2insertexportcard:export_card",tag:{SelectedInventorySlots:[I;0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],filterConfig:[{"#":0L,"#c":"ae2:i",id:"gtladditions:astral_array"}],upgrades:[{Count:1b,Slot:0,id:"ae2:speed_card"}]}}],view_mode:"ALL"}',
};



// 无限单元格模板（供 NBT 构建使用）
// Java 侧 DShanhaiNBTAPI.getTag 已自动查 Forge 注册表判断 fluid/item，无需 KJS 手动注册
// 注册 NBT 到 Java 侧（供 DShanhaiPackRegistry.buildNBT 查询）
try {
    for (var _nbtKey in global.__shanhai_item_tags__) {
        DShanhaiNBTAPI.put(_nbtKey, global.__shanhai_item_tags__[_nbtKey]);
    }
} catch(_e) {}

// 获取NBT标签的统一接口（委托 Java 侧 DShanhaiNBTAPI 处理，更高效）
function _getItemTag(itemId, innerId) {
    try {
        var result = String(DShanhaiNBTAPI.getTag(itemId, innerId));
        if (result !== 'null' && result !== '') return result;
    } catch(e) { /* fallback */ }
    if (!itemId) return '';
    var tagMap = global.__shanhai_item_tags__;
    return (tagMap && tagMap[itemId]) ? tagMap[itemId] : '';
}

// NBT 构建器
function _replacePackLoreCount(lore, count) {
    var result = [];
    if (!lore) return result;
    for (var i = 0; i < lore.length; i++) {
        result.push(String(lore[i]).replace('%count%', String(count)));
    }
    return result;
}

function _buildPackSDANBT(itemList, displayName, lore) {
    try {
        return String(DShanhaiNBTAPI.buildSDAFromList(
            itemList,
            displayName || null,
            _replacePackLoreCount(lore, itemList ? itemList.length : 0),
            []
        ));
    } catch(e) {
        console.error('[Shanhai SDA] Falha na compilação:' + displayName + ' ' + e);
        return '';
    }
}

function _scalePackItemCounts(items, multiplier) {
    var result = [];
    if (!items) return result;
    for (var i = 0; i < items.length; i++) {
        result.push(String(items[i]).replace(/^(\d+)x/, function(match, num) {
            return (parseInt(num, 10) * multiplier) + 'x';
        }));
    }
    return result;
}

DShanhaiNBTAPI.putStack(Item.of('gt_shanhai:super_disk_array', '{internalCurrentPower:20000.0d}'),'SDA_power_20000d');

// ========== 超级AE包 ==========
var superAEItems = [
    '1x constructionwand:infinity_wand','16777216x expatternprovider:ex_pattern_provider','1x gtceu:echoite_vajra','4x expatternprovider:ex_pattern_access_part','16777216x expatternprovider:ex_import_bus_part','16777216x expatternprovider:ex_export_bus_part','10x ironfurnaces:unobtainium_furnace','16x expatternprovider:ex_drive','1x mekanism:mekasuit_helmet','1x mekanism:mekasuit_bodyarmor','1x mekanism:mekasuit_pants','1x mekanism:mekasuit_boots','3x ae2:quantum_entangled_singularity','1x gtmadvancedhatch:net_data_stick','1x ae2:portable_item_cell_1k','1x gtmadvancedhatch:adaptive_net_energy_terminal','16777216x gtmadvancedhatch:adaptive_net_laser_source_hatch','16777216x gtmadvancedhatch:adaptive_net_energy_output_hatch','1x ae2wtlib:wireless_universal_terminal','16777216x expatternprovider:wireless_connect','4x ae2:pattern_encoding_terminal','16777216x gtceu:me_input_hatch','16777216x ae2:capacity_card','1x ae2:wireless_access_point','4x minecraft:flint_and_steel','1x sov:spear_of_void','100x avaritia:star_fuel','1x ironfurnaces:augment_generator','16777216x ae2:fuzzy_card','16777216x minecraft:orange_dye',
    '16777216x minecraft:light_gray_dye','16777216x minecraft:light_blue_dye','16777216x ae2:void_card','16777216x minecraft:gray_dye','16777216x ae2:basic_card','16777216x ae2:equal_distribution_card','16777216x minecraft:magenta_dye','16777216x ae2:crafting_card','16777216x ae2:inverter_card','16777216x ae2:speed_card','32x ae2:creative_energy_cell','16777216x ae2:quantum_link','16777216x ae2:quantum_ring','16777216x gtceu:me_input_bus','16777216x expatternprovider:assembler_matrix_glass','16777216x ae2:crafting_terminal','16777216x expatternprovider:ex_interface','16777216x ae2:fluix_smart_cable','16777216x ae2:fluix_glass_cable','16777216x ae2:fluix_covered_dense_cable','16777216x ae2:fluix_smart_dense_cable','16777216x ae2:blank_pattern','16777216x minecraft:pink_dye','16777216x minecraft:purple_dye','16777216x minecraft:red_dye','16777216x ae2:cable_anchor','16777216x ae2:redstone_card','16777216x ae2:logic_processor','16777216x ae2:calculation_processor','16777216x ae2:engineering_processor',
    '16777216x minecraft:black_dye','16777216x minecraft:yellow_dye','16777216x minecraft:green_dye','16777216x minecraft:blue_dye','16777216x minecraft:lime_dye','16777216x ae2:advanced_card','16777216x minecraft:cyan_dye','16777216x minecraft:white_dye','16777216x ae2:quartz_fiber','16777216x expatternprovider:ex_io_port','16777216x ae2:level_emitter','16777216x ae2:toggle_bus','16777216x gtladditions:infinity_input_dual_hatch','16777216x gtladditions:me_super_pattern_buffer','16777216x gtladditions:me_super_pattern_buffer_proxy','16777216x gtceu:uv_dual_output_hatch','16777216x gtceu:uv_dual_input_hatch','16777216x gtceu:me_extended_export_buffer','16777216x gtceu:me_extended_async_export_buffer','16777216x gtceu:tag_filter_me_stock_bus_part_machine','16777216x gtceu:me_dual_hatch_stock_part_machine','1024x extendedae_plus:1024x_crafting_accelerator','16777216x extendedae_plus:labeled_wireless_transceiver','16777216x merequester:requester','16777216x extendedae_plus:wireless_transceiver','16777216x extendedae_plus:channel_card',
    '16777216x expatternprovider:ex_interface_part','16777216x expatternprovider:ex_pattern_provider_part','16777216x expatternprovider:tag_storage_bus','16777216x ae2:storage_bus','16777216x ae2_toggleable_view_cell:toggleable_view_cell','16777216x ae2:fluix_covered_cable','16777216x gtmadvancedhatch:adaptive_net_energy_input_hatch','16777216x gtmadvancedhatch:adaptive_net_laser_target_hatch','16777216x ae2:energy_card','4x extendedae_plus:infinity_biginteger_cell','4x merequester:requester_terminal','16777216x extendedae_plus:virtual_crafting_card','1x gtlcore:fast_infinity_cell','4x gtlcore:debug_pattern_test','4x gtlcore:pattern_modifier','4x expatternprovider:pattern_modifier','4x gtlcore:me_pattern_buffer_cut','4x gtlcore:me_pattern_buffer_copy','32x gtlcore:max_storage','32x mae2:256x_crafting_accelerator','4x expatternprovider:wireless_tool','16777216x travelanchors:travel_anchor','4x travelanchors:travel_staff','16777216x gtladditions:wireless_energy_network_input_terminal','16777216x gtladditions:wireless_energy_network_output_terminal','16777216x aewireless:wireless_transceiver','10000000x ae2:fluix_crystal','10240000x ae2:certus_quartz_crystal','10240000x ae2:charged_certus_quartz_crystal','10240000x ae2:certus_quartz_dust',
    '10240000x gtceu:certus_quartz_dust','10240000x gtceu:certus_quartz_gem','1x sophisticatedbackpacks:netherite_backpack','1x fluxnetworks:flux_controller','1024000x fluxnetworks:flux_point','1024000x fluxnetworks:flux_plug','1x gtceu:molecular_assembler_matrix','1x gtceu:me_molecular_assembler_io','70x gtlcore:advanced_assembly_line_unit','320x gtlcore:iridium_casing','80x gtlcore:hyper_mechanical_casing','84x gtlcore:molecular_casing','20x gtceu:hsse_frame','56x gtceu:naquadah_alloy_frame','78x gtceu:trinium_frame','36x gtceu:europium_frame','306x gtceu:high_power_casing','48x gtceu:advanced_computer_casing','36x gtceu:fusion_glass','104x gtceu:superconducting_coil','17x gtceu:assembly_line_casing','32x gtceu:assembly_line_grating','90x gtceu:large_scale_assembler_casing','1x gtlcore:ultimate_terminal','10240000x gtmadvancedhatch:max_configurable_dual_hatch_input_16p','5x gtceu:me_craft_speed_core','20x gtceu:me_craft_pattern_container','64x gtceu:me_craft_parallel_core','1x ae2wtlib:magnet_card','1x ae2_ftbquest_detector:me_quests_detector','1x useless_mod:endless_beaf_item','16777216x ae2cs:ender_emitter',"2x ae2cs:ender_linker","16777216x ae2cs:ender_broadcaster",
    '16x gt_shanhai:super_disk_array'
];

// 预排序，确保跨端一致（JEI/recipe 数组顺序始终相同）
superAEItems.sort();

var superAELore = [
    '§7contém itens principais para todos os mods AE2, GTCEu e relacionados',
    'Tipos de item de código-fonte §7(se incompletos, os módulos podem estar faltando): §e%count% Tipos §7',
    '§7Cada item foi otimizado e configurado (módulos completos, potência total, atualizações completas)',
    '§7inclui terminais sem fio, emaranhamento quântico, matriz de montagem molecular, etc.',
    '&$ultimate-shanhai bens privados v2.2——2.7.3 reconstrução'
];

// ========== 天基大礼包 ==========
var skyBaseItems = [
    '1x gtladditions:space_infinity_integrated_ore_processor','426x gtlcore:power_module_7','6364x gtlcore:space_elevator_support','354x gtlcore:iridium_casing','2020x gtlcore:space_elevator_mechanical_casing','2x gtceu:infinity_frame','788x kubejs:space_elevator_internal_support','7347x kubejs:high_strength_concrete','1x kubejs:dimensional_bridge_casing','1x expatternprovider:infinity_cell@gtceu:stellar_energy_rocket_fuel'
];

var version = Platform.mods['gtladditions'].version;
if (version) {
    var isCustom = version.contains('Custom_SubSpace') || version.contains('Custom');
    var isSubSpace = version.contains('Custom_SubSpace');
    console.log('gtladditions version: ' + version + ' | isCustom: ' + isCustom + ' | isSubSpace: ' + isSubSpace);
}
        // SubSpace 专属物品清单
        var subSpaceItems = ["165429x gtlcore:iridium_casing","145965x gtlcore:oxidation_resistant_hastelloy_n_mechanical_casing","103818x gtlcore:space_elevator_support","58650x gtceu:high_temperature_smelting_casing","48837x kubejs:space_elevator_internal_support","40115x kubejs:high_strength_concrete","26923x gtceu:nonconducting_casing","15983x gtlcore:antifreeze_heatproof_machine_casing","11532x gtladditions:gravity_stabilization_casing","7552x gtladditions:extreme_density_casing","6524x gtlcore:naquadah_alloy_casing","5136x gtlcore:compressed_fusion_coil_mk2","4586x kubejs:containment_field_generator","3299x gtceu:fusion_casing","1616x gtlcore:enhance_hyper_mechanical_casing","1610x kubejs:dimensional_bridge_casing","1164x gtlcore:ultimate_stellar_containment_casing","1126x gtlcore:echo_casing","892x gtceu:fusion_glass","808x gtceu:plascrete","556x gtlcore:dimensionally_transcendent_casing","551x kubejs:force_field_glass","368x gtlcore:dimension_injection_casing","362x gtlcore:dragon_strength_tritanium_casing","278x kubejs:module_base","184x gtlcore:power_core","138x kubejs:module_connector","95x gtlcore:sps_casing","80x gtceu:computer_casing","77x gtlcore:hyper_core","58x gtceu:computer_heat_vent","41x gtceu:advanced_computer_casing","15x kubejs:magic_core","13x kubejs:spacetime_assembly_line_casing","9x kubejs:molecular_coil","9x kubejs:spacetime_assembly_line_unit","9x gtlcore:super_computation_component","5x gtceu:high_power_casing","3x kubejs:restraint_device","1x gtladditions:subspace_corridor_hub_industrial_array"];
        // Custom-fix3 专属物品清单
        var customItems = ['1x gtladditions:light_hunter_space_station','4643x gtladditions:gravity_stabilization_casing','1348x gtladditions:extreme_density_casing','208x gtlcore:ultimate_stellar_containment_casing','120x gtlcore:super_computation_component','27x gtlcore:hyper_core','9558x gtlcore:naquadah_alloy_casing','80x gtlcore:sps_casing','720x gtlcore:enhance_hyper_mechanical_casing','293x gtlcore:dragon_strength_tritanium_casing','666x gtlcore:echo_casing','4094x gtlcore:dimensionally_transcendent_casing','5884x gtlcore:dimension_injection_casing','224x gtlcore:molecular_casing','120x gtlcore:improved_superconductor_coil','176x gtlcore:fusion_casing_mk5','64x gtlcore:fusion_casing_mk4','2400x gtlcore:uxv_hermetic_casing','1073x ae2:quartz_vibrant_glass','560x gtceu:neutronium_frame','454x gtceu:high_power_casing','230x gtceu:computer_heat_vent','258x gtceu:advanced_computer_casing','3528x gtceu:fusion_glass','144x gtceu:uhv_ultimate_battery','1029x gtceu:uxv_machine_casing','180x gtceu:uiv_machine_casing','2528x gtceu:uhv_machine_casing','3651x gtceu:atomic_casing','1440x kubejs:restraint_device','280x kubejs:containment_field_generator','1500x kubejs:spacetime_assembly_line_unit','12x kubejs:force_field_glass','20x kubejs:module_connector','1038x kubejs:dimensional_bridge_casing','34x kubejs:neutronium_pipe_casing'];

var astralConvergenceNexusItems = [
  "29x gtlcore:space_elevator_mechanical_casing",
  "9x kubejs:module_base",
  "1x kubejs:module_connector",
  "1x gtladditions:nebula_reaper",
  "30x gtlcore:space_elevator_mechanical_casing", "9x kubejs:module_base", "1x kubejs:module_connector", "1x gtladditions:astral_convergence_nexus"
];

var newAstralConvergenceNexusItems = _scalePackItemCounts(astralConvergenceNexusItems, 10);

var satelliteFactoryItems = [
  "1x gtladditions:nexus_satellite_factory_mk1","1x gtladditions:nexus_satellite_factory_mk2","1x gtladditions:nexus_satellite_factory_mk3","1x gtladditions:nexus_satellite_factory_mk4","12x gtlcore:dimensionally_transcendent_casing", "2x kubejs:module_base", "1x kubejs:module_connector"
];

var SatelliteFactoryItems = _scalePackItemCounts(satelliteFactoryItems, 20);

var extendItems = (Platform.isLoaded("gtl_extend") && ["46378x gtlcore:hyper_mechanical_casing", "7802x gtlcore:dimensionally_transcendent_casing", "2141x gtceu:high_power_casing", "730x gtlcore:dimension_connection_casing", "696x kubejs:annihilate_core", "560x gtlcore:graviton_field_constraint_casing", "368x gtlcore:enhance_hyper_mechanical_casing", "303x gtlcore:power_module_5", "164x gtceu:naquadria_frame", "156x gtceu:white_borderless_lamp", "153x kubejs:spacetime_compression_field_generator", "87x kubejs:dimension_creation_casing", "20x kubejs:create_hpca_component", "1x gtl_extend:black_hole_matter_decompressor", "1x kubejs:create_aggregatione_core","1211x gtceu:reaction_safe_mixing_casing", "1059x gtceu:inert_machine_casing", "992x gtceu:solid_machine_casing", "932x gtceu:steam_machine_casing", "81x gtceu:cupronickel_coil_block", "59x minecraft:oak_planks", "42x gtlcore:aluminium_bronze_casing", "27x gtceu:tempered_glass", "1x gtl_extend:czyhfdj","2177x gtceu:clean_machine_casing", "2112x kubejs:abyssalalloy_coil_block", "1212x gtceu:heatproof_machine_casing", "120x gtceu:stainless_steel_turbine_casing", "1x gtl_extend:dimensionally_transcendent_dissolving_tank","2869x gtceu:tritanium_frame", "1400x gtlcore:iridium_casing", "1081x gtceu:clean_machine_casing", "420x gtceu:fusion_glass", "324x minecraft:glowstone", "239x gtceu:cupronickel_coil_block", "196x gtceu:ev_machine_casing", "192x gtceu:computer_heat_vent", "175x gtceu:advanced_computer_casing", "132x gtlcore:super_cooler_component", "88x kubejs:containment_field_generator", "82x gtceu:high_power_casing", "69x ae2:quartz_vibrant_glass", "46x gtceu:laser_safe_engraving_casing", "41x gtlcore:hsss_reinforced_borosilicate_glass", "19x minecraft:chain", "9x minecraft:netherite_block", "4x minecraft:reinforced_deepslate", "4x gtceu:nether_star_block", "1x gtl_extend:quantum_computer", "1x gtl_extend:dimension_core", "1x minecraft:beacon","27647x gtceu:white_lamp", "24473x gtlcore:dimensionally_transcendent_casing", "8258x gtceu:superconducting_coil", "3575x minecraft:redstone_block", "2252x gtlcore:compressed_fusion_coil_mk2_prototype", "2007x gtceu:blue_lamp", "1960x gtceu:fusion_glass", "1401x kubejs:annihilate_core", "1232x minecraft:sea_lantern", "1065x gtlcore:dimension_connection_casing", "812x gtceu:tritanium_coil_block", "419x gtlcore:enhance_hyper_mechanical_casing", "404x gtceu:iv_machine_casing", "224x minecraft:chain", "212x minecraft:glowstone", "112x gtlcore:fusion_casing_mk5", "112x gtlcore:lafium_mechanical_casing", "42x kubejs:dimension_creation_casing", "29x ae2:smooth_quartz_wall", "27x ae2:quartz_slab", "8x minecraft:shroomlight", "5x gtl_extend:dimension_core", "5x ae2:smooth_quartz_slab", "2x ae2:quartz_pillar_wall", "1x gtl_extend:time_space_breaker", "1x kubejs:magic_core", "1x minecraft:gold_block","430x gtceu:stable_machine_casing", "261x gtceu:stainless_steel_frame", "71x gtceu:ev_machine_casing", "10x gtceu:high_power_casing", "1x gtl_extend:dimension_core", "1x gtl_extend:large_void_pump"]) || [];

// ========== 猪咪大礼包 ==========
var piggyItems = [
    '1x dishanhai:piggy','1x gtladditions:forge_of_the_antichrist','397x gtladditions:central_graviton_flow_regulator','357x gtladditions:mediary_graviton_flow_regulator','345x gtladditions:remote_graviton_flow_regulator','11008x gtladditions:suprachronal_magnetic_confinement_casing','6566x gtladditions:god_forge_trim_casing','162x gtladditions:god_forge_support_casing','824x gtladditions:god_forge_inner_casing','155x gtladditions:spatially_transcendent_gravitational_lens','1x expatternprovider:infinity_cell@gtceu:hydrogen','1x expatternprovider:infinity_cell@gtceu:helium',
    '2x gtladditions:arcanic_astrograph','1068x gtlcore:dimension_injection_casing','1792x gtlcore:create_casing','66x gtceu:high_power_casing','336x kubejs:dimension_creation_casing','96x kubejs:dimensional_stability_casing','276x kubejs:spacetime_compression_field_generator','100x gtladditions:phonon_conduit','420x gtladditions:suprachronal_magnetic_confinement_casing','720x gtladditions:god_forge_trim_casing','500x gtladditions:god_forge_support_casing','56x gtladditions:god_forge_energy_casing','1x gtladditions:heliophase_leyline_crystallizer','3x gtladditions:heliothermal_plasma_fabricator','10x gtladditions:heliofusion_exoticizer','2x gtladditions:heliofluix_melting_core','4x gtladditions:helioflare_power_forge',
    '1x gtladditions:apocalyptic_torsion_quantum_matrix','864x gtladditions:quantum_glass','11520x gtlcore:qft_coil','216x gtlcore:spacetimecontinuumripper','10927x gtlcore:dimensionally_transcendent_casing','6285x gtlcore:manipulator','841x kubejs:dimensional_bridge_casing',
    '4x gtladditions:thread_modifier_hatch','1x gtladditions:macro_atomic_resonant_fragment_stripper','4230x gtlcore:qft_coil','1718x gtlcore:sps_casing','5507x gtlcore:hyper_mechanical_casing','937x gtlcore:echo_casing','218x gtlcore:fusion_casing_mk5','360x gtceu:quantumchromodynamically_confined_matter_frame','786x gtceu:neutronium_frame','627x gtceu:high_power_casing','1086x gtceu:fusion_glass','344x kubejs:eternity_coil_block','156x kubejs:dyson_receiver_casing','666x kubejs:dyson_control_toroid','66x kubejs:dyson_control_casing','8x kubejs:dimensional_stability_casing','162x kubejs:dimensional_bridge_casing','24x kubejs:annihilate_core',
    '1x gtladditions:light_hunter_space_station','4643x gtladditions:gravity_stabilization_casing','1348x gtladditions:extreme_density_casing','208x gtlcore:ultimate_stellar_containment_casing','120x gtlcore:super_computation_component','27x gtlcore:hyper_core','9558x gtlcore:naquadah_alloy_casing','80x gtlcore:sps_casing','720x gtlcore:enhance_hyper_mechanical_casing','293x gtlcore:dragon_strength_tritanium_casing','666x gtlcore:echo_casing','4094x gtlcore:dimensionally_transcendent_casing','5884x gtlcore:dimension_injection_casing','224x gtlcore:molecular_casing','120x gtlcore:improved_superconductor_coil','176x gtlcore:fusion_casing_mk5','64x gtlcore:fusion_casing_mk4','2400x gtlcore:uxv_hermetic_casing','1073x ae2:quartz_vibrant_glass','560x gtceu:neutronium_frame','454x gtceu:high_power_casing','230x gtceu:computer_heat_vent','258x gtceu:advanced_computer_casing','3528x gtceu:fusion_glass','144x gtceu:uhv_ultimate_battery','1029x gtceu:uxv_machine_casing','180x gtceu:uiv_machine_casing','2528x gtceu:uhv_machine_casing','3651x gtceu:atomic_casing','1440x kubejs:restraint_device','280x kubejs:containment_field_generator','1500x kubejs:spacetime_assembly_line_unit','12x kubejs:force_field_glass','20x kubejs:module_connector','1038x kubejs:dimensional_bridge_casing','34x kubejs:neutronium_pipe_casing',
    "1896x gtlcore:dimensionally_transcendent_casing", "551x gtladditions:temporal_anchor_field_casing", "320x gtlcore:iridium_casing", "224x gtlcore:graviton_field_constraint_casing", "152x gtceu:high_power_casing", "104x gtceu:superconducting_coil", "84x gtlcore:molecular_casing", "80x gtlcore:hyper_mechanical_casing", "56x gtceu:naquadah_alloy_frame", "52x gtceu:trinium_frame", "36x gtceu:fusion_glass", "36x gtlcore:rhenium_reinforced_energy_glass", "32x kubejs:annihilate_core", "32x gtceu:assembly_line_grating", "24x gtceu:advanced_computer_casing", "24x kubejs:containment_field_generator", "16x gtlcore:advanced_assembly_line_unit", "16x gtceu:assembly_line_casing", "1x gtladditions:dimension_focus_infinity_crafting_array",
    "2260x gtlcore:dimensionally_transcendent_casing", "1546x kubejs:dimensional_bridge_casing", "1222x kubejs:high_strength_concrete", "992x gtceu:plascrete", "266x kubejs:hollow_casing", "260x kubejs:magic_core", "242x kubejs:speeding_pipe", "227x kubejs:containment_field_generator", "208x gtlcore:molecular_casing", "193x gtceu:high_power_casing", "188x gtlcore:degenerate_rhenium_constrained_casing", "161x gtlcore:rhenium_reinforced_energy_glass", "150x kubejs:annihilate_core", "146x kubejs:dimensional_stability_casing", "142x gtlcore:spacetimebendingcore", "138x kubejs:space_elevator_internal_support", "138x gtladditions:gravity_stabilization_casing", "45x gtlcore:spacetimecontinuumripper", "1x gt_shanhai:gravitational_wave_antenna_transmitter",
    "2044x gtlcore:create_casing", "736x gtlcore:advanced_fusion_coil", "676x gtlcore:dimension_injection_casing", "464x gtlcore:dimensionally_transcendent_casing", "456x gtceu:high_power_casing", "380x gtlcore:fusion_casing_mk4", "368x gtlcore:graviton_field_constraint_casing", "320x kubejs:dimension_creation_casing", "304x gtladditions:temporal_anchor_field_casing", "290x gtlcore:fusion_casing_mk5", "280x kubejs:annihilate_core", "216x gtlcore:dimension_connection_casing", "172x gtlcore:degenerate_rhenium_constrained_casing", "96x gtlcore:improved_superconductor_coil", "64x gtceu:infinity_frame", "64x gtlcore:hyper_core", "40x gtlcore:dragon_strength_tritanium_casing", "18x gtceu:fusion_glass", "8x kubejs:magic_core", "8x minecraft:crying_obsidian", "1x gtladditions:recursive_reverse_array",
    "3694x gtladditions:god_forge_trim_casing", "3497x dishanhai:transcendentally_reinforced_borosilicate_glass", "1617x gtladditions:god_forge_inner_casing", "1170x dishanhai:reinforced_temporal_structure_casing", "708x gtladditions:gravity_stabilization_casing", "600x gtladditions:extreme_density_casing", "528x dishanhai:naquadria_reinforced_water_plant_casing", "503x gtlcore:dimension_injection_casing", "440x dishanhai:particle_beam_guidance_pipe_casing", "440x gtlcore:manipulator", "391x dishanhai:omni_purpose_infinity_fused_glass", "361x gtceu:computer_casing", "316x gtceu:naquadah_alloy_frame", "281x gtlcore:component_assembly_line_casing_max", "237x dishanhai:reinforced_spatial_structure_casing", "224x dishanhai:gallifreyan_spacetime_compression_field_generator", "194x gtlcore:dimension_connection_casing", "160x gtladditions:central_graviton_flow_regulator", "160x gtladditions:remote_graviton_flow_regulator", "156x dishanhai:quark_exclusion_casing", "104x dishanhai:gallifreyan_time_dilation_field_generator", "80x gtladditions:god_forge_energy_casing", "5x dishanhai:gallifreyan_stabilisation_field_generator", "1x gt_shanhai:eternal_gregtech_workshop",
    "11008x gtladditions:quantum_glass", "7264x gtladditions:extreme_density_casing", "824x gtlcore:manipulator", "465x kubejs:dimensional_bridge_casing", "249x gtceu:spacetime_block", "32x gtlcore:qft_coil", "1x gt_shanhai:spacetime_wave_matrix",
    "808x kubejs:high_strength_concrete", "620x gtlcore:space_elevator_support", "588x gtlcore:space_elevator_mechanical_casing", "348x kubejs:space_elevator_internal_support", "160x gtlcore:power_module", "72x kubejs:module_base", "56x gtceu:neutronium_frame", "1x kubejs:module_connector", "1x gtlcore:power_core", "1x gtceu:space_elevator",


];

var version_gtladditions = Platform.mods['gtladditions'].version;
if (version_gtladditions) {
    var isCustom = version_gtladditions.contains('Custom_SubSpace') || version_gtladditions.contains('Custom');
    var isSubSpace = version_gtladditions.contains('Custom_SubSpace');
    console.log('gtladditions version: ' + version_gtladditions + ' | isCustom: ' + isCustom + ' | isSubSpace: ' + isSubSpace);
if (isSubSpace) {
    piggyItems = piggyItems.concat(subSpaceItems).concat(newAstralConvergenceNexusItems).concat(SatelliteFactoryItems).concat(extendItems);
} else if (isCustom) {
    piggyItems = piggyItems.concat(customItems).concat(newAstralConvergenceNexusItems).concat(SatelliteFactoryItems).concat(extendItems);
}
}

// ========== 奇点数据中枢建材包 ==========
var SDAinline_items = [
        "303x gt_shanhai:casing_transcendent", "232x gt_shanhai:casing_molecular", "67x gt_shanhai:casing_rhenium", "66x gt_shanhai:casing_quantum_glass", "1x gt_shanhai:singularity_data_hub"
    ];


// ========== 注册线程倍率物品 ==========
var _registerThread = Java.loadClass("com.dishanhai.gt_shanhai.common.machine.primordial.PrimordialOmegaEngineModuleBase").registerThreadBoostItem;
_registerThread("dishanhai:thread_shard_1", 1);
_registerThread("dishanhai:thread_shard_2", 4);
_registerThread("dishanhai:thread_shard_3", 16);
_registerThread("dishanhai:thread_shard_4", 64);
_registerThread("dishanhai:thread_shard_5", 256);
_registerThread("dishanhai:thread_shard_6", 1024);
_registerThread("dishanhai:thread_shard_7", 4096);
_registerThread("dishanhai:universal_parallel_overdriver", 2147483647);

// ========== 导出到 global ==========
DShanhaiPackRegistry.create("superAE", superAEItems, "Matriz de armazenamento Super AE", superAELore)
    .lock("v1.0")
    .build();

DShanhaiPackRegistry.create("skyBase", skyBaseItems, "Pacote de presente Tianji", [
    '§7Este é um pacote de presente baseado no espaço',
    'Tipo de item §7: §e%count% Tipo §7',
    '§7contém itens de máquina OP baseados no espaço, e o disco infinito do componente de energia estelar foi gravado',
    '§8Bens privados Shanhai v2.3'
])
    .lock("v1.0")
    .build();

DShanhaiPackRegistry.create("piggy", piggyItems, "Pacote de presente porquinho", [
    '§7Este é um pacote de presente porquinho, um presente do King Piggy',
    '§7Só é dado para porcos, então você é um porco?',
    'Tipo de item §7: §e%count% Tipo §7',
    '§7é gerado por CellAPI e a exibição é gerada por JEIcellAPI',
    '§7Se você não quer que sua experiência de jogo seja arruinada, não use o Piggy Gift Pack',
    'A exibição da receita do pacote de presente §7Piggy foi removida do JEI por padrão','Embora você possa ver isso olhando a receita do Piggy Emperor',
    '§8Shanhai Bens Privados V2.3 —— 2.7.4 reconstrução'
])
    .lock("v1.0")
    .build();

DShanhaiPackRegistry.create("SDAinline", SDAinline_items, "Matriz de material de construção de data center Singularity", [
            '§7Este é um pacote de material de construção de data center Singularity',
            'Tipo de item §7: §e%count% Tipo §7',
            '§7contém todos os materiais de construção do data center Singularity',
            '§8Bens privados Shanhai v2.7.3'
])
    .lock("v1.0")
    .build();

global.shanhaiPackDefs = {};
['superAE', 'skyBase', 'piggy', 'SDAinline'].forEach(function(id) {
    var p = DShanhaiPackRegistry.get(id);
    if (p) global.shanhaiPackDefs[id] = { nbt: p.nbt(), sdaNbt: '', name: p.name, itemCount: p.typeCount() };
});
if (global.shanhaiPackDefs.superAE) global.shanhaiPackDefs.superAE.sdaNbt = _buildPackSDANBT(superAEItems, 'Matriz de armazenamento Super AE', superAELore);
if (global.shanhaiPackDefs.skyBase) global.shanhaiPackDefs.skyBase.sdaNbt = _buildPackSDANBT(skyBaseItems, 'Matriz de armazenamento de materiais de construção baseada no espaço', [
    '§7Este é um pacote de presente baseado no espaço',
    'Tipo de item §7: §e%count% Tipo §7',
    '§7contém itens de máquina OP baseados no espaço, e o disco infinito do componente de energia estelar foi gravado',
    '§8Bens privados Shanhai v2.3'
]);
if (global.shanhaiPackDefs.piggy) global.shanhaiPackDefs.piggy.sdaNbt = _buildPackSDANBT(piggyItems, 'Pacote de presente porquinho', [
    '§7Este é um pacote de presente porquinho, um presente do King Piggy',
    '§7Só é dado para porcos, então você é um porco?',
    'Tipo de item §7: §e%count% Tipo §7',
    '§8Bens privados Shanhai V2.3'
]);
if (global.shanhaiPackDefs.SDAinline) global.shanhaiPackDefs.SDAinline.sdaNbt = _buildPackSDANBT(SDAinline_items, 'Matriz de armazenamento de materiais de construção de data center Singularity', [
    'Pacote de materiais de construção de data center de singularidade §7',
    'Tipo de item §7: §e%count% Tipo §7',
    '§7contém todos os materiais de construção do data center Singularity',
    '§8Bens privados Shanhai v2.7.3'
]);

global._getItemTag = _getItemTag;

// JEI 兼容 — 委托 Java 侧 NBT 构建器
global.shanhaiJEINBTBuilder = function(items, name, lore) {
    try { return DShanhaiNBTAPI.buildSDAFromList(items, name || null, lore && lore.length > 0 ? lore : [], []); } catch(e) { return ''; }
};

console.log('[Dados do pacote Shanhai JEI] carregados' + Object.keys(global.shanhaiPackDefs).length + 'definição de pacote');



})();
