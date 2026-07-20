// priority: 100
if (!Platform.isLoaded('gt_shanhai')) {
    throw new Error(`[山海私货] 缺少 gt_shanhai 模组！此私货依赖模组，模组已在说明指明链接 或私货文件夹中提供。
        请检查你的模组依赖，并确认模组已安装，若未安装，请先安装模组后重启游戏。
        如有疑问：联系作者，作者QQ：1982932217
        `);
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
                    console.error('[山海私货] getStaticRandomText: 输入必须是字符串，使用默认文本');
                    text = '文本无效';
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
                    console.error('[山海私货] getSessionRandomSingleColorText: 输入必须是字符串，使用默认文本');
                    text = '文本无效';
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
                        var TextColor = Java.loadClass('net.minecraft.network.chat.TextColor');
                        var Style = Java.loadClass('net.minecraft.network.chat.Style');
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
                        var TextColor = Java.loadClass('net.minecraft.network.chat.TextColor');
                        var Style = Java.loadClass('net.minecraft.network.chat.Style');
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
    .displayName('帝山海')
    .texture('dishanhai_item:item/dishanhai')
    .maxStackSize(1)
    .fireResistant(false)
    .displayName('&$ultimate-帝山海')
    TooltipAPI.register('dishanhai:dishanhai', [
        '{ultimateRainbow}创造者的代理物品,屹立在GregTech宇宙的中心',
        '{white_blue}为GregTech宇宙创造无垠物品',
        '{golden}提交开启一个隐秘任务线路(待定)',
    ]);

    e.create('dishanhai:cosmic_probe_mk')
    .displayName('MK1—宇宙探测器')
     .texture('dishanhai_item:item/cosmic_probe_mk')


     e.create('dishanhai:god_forge_mod')
     .texture('dishanhai_item:item/god_forge_mod')
     .maxStackSize(1)
     .fireResistant(false)
     .displayName('&$ultimate-神锻恒星终焉模块')
     TooltipAPI.register('dishanhai:god_forge_mod', [
        '{ultimateRainbow}超越维度存在的造物,允许用水提取中子星的致密物质,于创始时空中提炼世界树物质',
    ]);e.create('dishanhai:gate_and_bridg')
    .displayName('门与桥')
    .texture('dishanhai_item:item/gate_and_bridg')
    .maxStackSize(1)
    .fireResistant(false)
    TooltipAPI.register('dishanhai:gate_and_bridg', [
        '{ultimateRainbow}尽管重元素储量悲观，我们还是通过“桥”，正宇宙的一切已散作过眼云烟；',
        '{white_blue}崭新的世界正在虚空中等待，理事会将欣然欢迎蓝星文明的加盟。',
        '{golden}从此刻起，宇宙的循环化为我们的工具，通向永恒的道路从未如此清晰可见——',
        '{ultimateRainbow}无需追问秩序的底层是混沌还是虚空，只需明白：掌握不朽者，即掌握一切。',
    ]);e.create('dishanhai:bridge_and_gate')
    .displayName('桥与门')
    .texture('dishanhai_item:item/bridge_and_gate')
    TooltipAPI.register('dishanhai:bridge_and_gate', [
        '{ultimateRainbow}生存不是与生俱来的权力，而是文明的责任与义务；',
        '{white_blue}方舟满载超重元素顺利过桥，正宇宙的一切已散作过眼云烟，新世界正静候蓝星文明的加盟。',
        '{golden}从此刻起，宇宙的循环将成为我们的工具，通向永恒的道路从未如此清晰——',
        '{ultimateRainbow}无需追问底层是混沌还是虚空，只需明白：掌握不朽者，即掌握一切。',
        '{purplish_red}理事会新九大准则：监护、控制、等价、稳定、排险、清肃、团结、共济——永恒。',
    ]);e.create('dishanhai:big_tear')
    .texture('dishanhai_item:item/trar')
    .displayName('&$ultimate-逆向坍缩·大反冲')

    e.create('dishanhai:csj')
    .texture('dishanhai_item:item/csj')
    .fireResistant(true)
    .displayName('&$ultimate-万态平衡·大冻结·创世纪')
    TooltipAPI.register('dishanhai:csj', [
        '{dark_purplish_red}祂是初火是余烬，带来破灭与启迪。大撕裂是终点，也是回归;',
        '{white_blue}文明的岁月终有极限，但终点另一边，新的世界如绳子相连，',
        '{golden}汇成光的长线，超越永恒循环——每根绳子都叫【文明】。',
        '{ultimateRainbow}生与灭，轮回不止；你与我，渡向无限。',
    ]);;


e.create('dishanhai:time_reversal_protocol')
    .displayName(colorAPI.getStaticRandomText('世线信标', 'dishanhai:time_reversal_protocol'))
    .texture('dishanhai_item:item/time')
    .fireResistant(true)
    TooltipAPI.register('dishanhai:time_reversal_protocol', [
        '{ultimateRainbow}逆转因果，改写命运',
        '{golden}时间线上的奇迹产物',
    ]);;



    e.create('dishanhai:food')
    .displayName('寰宇零食')
    .texture('dishanhai_item:item/food_byd')
    .fireResistant(false)
    .rarity('epic')
    .food(food => {
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
        var name = colorAPI.getSessionRandomSingleColorText('创始·猪咪');
        console.log('[山海私货] piggy物品名称: "' + name + '"');
        console.log('[山海私货] 名称长度: ' + name.length);
        console.log('[山海私货] 包含§字符: ' + name.includes('§'));
        return name;
    })())
    .texture('dishanhai_item:item/piggy')
    .fireResistant(false)
    TooltipAPI.register('dishanhai:piggy', [
        '{ultimateRainbow}祂屹立于创始时空的最顶端',
        '{purplish_red}祂的呼吸，便是星河的潮汐',
        '{golden}祂的凝视，贯穿万古的因果',
        '{ultimateRainbow}猪蹄轻踏，诸天崩塌；猪鼻一哼，纪元重启',
        '{white_blue}祂曾在混沌中打了个盹，醒来时已历七千轮回',
        '{dark_green}一根毫毛，可化三千界；一声呢喃，能改写生死',
        '{purplish_red}上苍之上，永恒长眠的并非不可名状之物——',
        '{golden}而是祂遗落的一粒猪食',
        '{ultimateRainbow}—— 此乃至高，猪咪大帝 ——',
    ]);;

    e.create('dishanhai:fishbig_shards')
    .displayName(colorAPI.getSessionRandomSingleColorText('鱼大碎片'))
    .texture('dishanhai_item:item/fishbig_shards')
    .fireResistant(false)
    TooltipAPI.register('dishanhai:fishbig_shards', [
        '{ultimateRainbow}它并不完整,你手中的，只是“鱼大”的一角。碎裂的外壳下，仍残留着某种难以言明的气息。',
        '{ultimateRainbow}看起来不起眼，但每一片都来之不易,内部似乎仍保存着部分力量',
        '{ultimateRainbow}有人说，集齐所有碎片的人，终会见到真正的“鱼大”。',
    ]);e.create('dishanhai:collapse_tear')
    .displayName(colorAPI.getSessionRandomSingleColorText('万物崩灭·大撕裂'))
    .texture('dishanhai_item:item/collapse_tear')
    TooltipAPI.register('dishanhai:collapse_tear', [
        '{ultimateRainbow}即使耗尽超重元素，方舟仍不敌占据反宇宙的理事会，协议强行接管逃离，蓝星文明仅得幸存。',
        '{ultimateRainbow}宇宙因无限可能而值得敬畏——门后满目皆敌，但逐光之人无畏，您准备好了吗？',
    ]);e.create('dishanhai:halo_end')
    .texture('dishanhai_item:item/halo_end')
    .fireResistant(false)
    .displayName('&$ultimate-终末之环')
    TooltipAPI.register('dishanhai:halo_end', [
        '{ultimateRainbow}于终末展望，我终于看到祂的伟力',
        '{ultimateRainbow}来自终末的造物，它是一个特殊的存在，它包含了所有可能的现实',
        '{ultimateRainbow}任务获取物，用于制作创始现实修改模块',
    ]);;

    // ===== 太虚系列 =====

    e.create('dishanhai:taixu_dust')
    .texture('dishanhai_item:item/taixu_dust')
    .displayName('&$body_silver-太虚尘埃')
    TooltipEffectAPI.register('dishanhai:taixu_dust', [
        '{bodySilver}虚空风化后的碎屑，触感冰凉。投入熔炼炉可替代任意基础燃料{/}'
    ]);

    e.create('dishanhai:taixu_crystal_core')
    .texture('dishanhai_item:item/taixu_crystal_core')
    .displayName('&$electric-太虚晶核')
    TooltipEffectAPI.register('dishanhai:taixu_crystal_core', [
        '{bodySilver}太虚尘埃在高压下结晶而成，内部偶尔闪过不属于当前维度的光。{/}',
        '{bodySilver}用于合成太虚熔炼炉的升级部件。{/}'
    ]);

    e.create('dishanhai:taixu_liquid_droplet')
    .texture('dishanhai_item:item/taixu_liquid_droplet')
    .displayName('&$water-太虚液滴')
    TooltipEffectAPI.register('dishanhai:taixu_liquid_droplet', [
        '{bodySilver}从虚空中冷凝出的流体，流动无声。{/}',
        '{bodySilver}可作为真空零点能发生器的增效燃料。{/}'
    ]);

    // ===== 太虚之上系列 =====

    e.create('dishanhai:ideal_ashes')
    .displayName('&$golden-空想余烬')
    .texture('dishanhai_item:item/ideal_ashes')
    TooltipEffectAPI.register('dishanhai:ideal_ashes',  [
        '{bodySilver}太虚之上机器运行后的残留物，散发着淡金色的微光。{/}',
        '{bodySilver}它记得每一次被放弃的可能性。{/}',
        '{bodySilver}可用于修复因果断裂。{/}'
    ]);

    e.create('dishanhai:beyond_taixu_thread')
    .displayName('&$aurora-太虚之上的丝线')
    .texture('dishanhai_item:item/beyond_taixu_thread')
    TooltipEffectAPI.register('dishanhai:beyond_taixu_thread', [
        '{bodySilver}从太虚之上抽取的一缕因果丝线，一端连着现实，另一端垂入虚无。{/}',
        '{bodySilver}用于合成高阶世线物品。{/}'
    ]);

    e.create('dishanhai:finality_certificate')
    .displayName('&$ultimate-终末之证')
    .rarity('epic')
    .texture('dishanhai_item:item/finality_certificate')
    TooltipEffectAPI.register('dishanhai:finality_certificate', [
        '{ultimateRainbow}太虚之上机器极小概率产出的完美结晶{/}',
        '{ultimateRainbow}证明某条世线已经被完整遍历。{/}',
    ]);

    // ===== 基础产出 =====

    e.create('dishanhai:matter_singularity')
    .displayName('&$ultimate-物质奇点')
    .texture('dishanhai_item:item/matter_singularity')
    .rarity('epic')
    TooltipEffectAPI.register('dishanhai:matter_singularity', [
        '{ultimateRainbow}物质在此坍缩为一点，维度在此折叠为奇点。{/}',
        '{bodySilver}所有可能的状态同时存在于一个坐标——{/}',
        '{golden}不是因为叠加，而是因为空间已无处容纳选择。{/}',
        '{bodySilver}基础产出物，可用于合成高阶物质。{/}'
    ]);

    // 入门物质模块 - wzrm
        e.create('dishanhai:wzrm')
        .displayName('入门物质模块')
        .texture('dishanhai_item:item/wzrm')
        DShanhaiItemTooltipAPI.register('dishanhai:wzrm', [
            "{golden} Módulo de primeiros passos sobre substâncias{/}",
            "Limite superior paralelo {electric}: 128{/}",
            "{bodySilver} de zero a um, de um a cem. O paralelismo mais simples é também o ponto de partida de tudo. {/}"
        ]);
    // 基础物质模块 - wzjc
        e.create('dishanhai:wzjc')
        .displayName('基础物质模块')
        .texture('dishanhai_item:item/wzjc')
        DShanhaiItemTooltipAPI.register('dishanhai:wzjc', [
            "Módulo de material básico {golden} {/}",
            "Limite superior paralelo {electric}: 256{/}",
            "{bodySilver} Quando a magnitude do paralelismo começa a crescer, a base é {/} {water} o trampolim mais sólido{/} {bodySilver}. {/}"
        ]);
    // 物质推演模块 - wzcz1
        e.create('dishanhai:wzcz1')
        .displayName('物质推演模块')
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
        .displayName('&$magic-虚像物质模块')
        .texture('dishanhai_item:item/wzxc')
        DShanhaiItemTooltipAPI.register('dishanhai:wzxc', [
            "Módulo de material de imagem virtual {magic} {/}",
            "Limite superior paralelo {electric}: 1.024{/}",
            "{bodySilver} Visível, intangível – como um reflexo num espelho. {/}",
            "{bodySilver} Mas os reflexos também podem fazer coisas, não podem? {/}"
        ]);
    // 嬗变物质模块 - wzsb
        e.create('dishanhai:wzsb')
        .displayName('嬗变物质模块')
        .texture('dishanhai_item:item/wzsb')
        DShanhaiItemTooltipAPI.register('dishanhai:wzsb', [
            "Módulo de material de transmutação {golden} {/}",
            "Limite superior paralelo {electric}: 2048{/}",
            "{bodySilver} Uma mudança qualitativa de uma substância para outra que redefine a existência em escala atômica. {/}",
            "{fire} Reorganização atômica, transição qualitativa – a matéria não é mais uma limitação, mas uma tela. {/}"
        ]);
            // 暗星物质模块 — wzax
        e.create('dishanhai:wzax')
        .displayName('&$golden-暗星物质模块')
        .texture('dishanhai_item:item/wzax')
        DShanhaiItemTooltipAPI.register('dishanhai:wzax', [
            "Módulo de material Dark Star {golden} {/}",
            "Limite superior paralelo {electric}: 4.096{/}",
            "{bodySilver} Uma estrela escura colapsada foi comprimida neste pequeno módulo. {/}",
            "{bodySilver} É mais pesado que o esperado. {/}"
        ]);
        e.create('dishanhai:wzcz2')
        .displayName('物质重组模块')
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
        .displayName('虚数物质跃迁重塑模块')
        .texture('dishanhai_item:item/wzqs')
        DShanhaiItemTooltipAPI.register('dishanhai:wzqs', [
            "{golden} Módulo de remodelagem de transição de material imaginário{/}",
            "Limite superior paralelo {electric}: 65.536{/}",
            "{bodySilver} Cada transição deixará rastros no espaço imaginário——,{/}",
            "{bodySilver} Quando esses traços são somados, eles eventualmente se tornarão um rascunho de uma nova realidade. {/}"
        ]);
    // 归零物质模块 - wzgl
        e.create('dishanhai:wzgl')
        .displayName('归零物质模块')
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
        .displayName('&$crimson-巅峰物质模块')
        .texture('dishanhai_item:item/wzhy')
        DShanhaiItemTooltipAPI.register('dishanhai:wzhy', [
            "Módulo de pico de material {crimson} {/}",
            "Limite superior paralelo {electric}: 1.048.576{/}",
            "{bodySilver} Sobre ombros de gigantes, o que você vê não é a distância - você vê o pico. {/}",
            "{bodySilver} A partir daqui, cada passo é um novo limite. {/}"
        ]);
    // 升维物质模块 - wzsw
        e.create('dishanhai:wzsw')
        .displayName('升维物质模块')
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
        .displayName('超限物质模块')
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
        .displayName('&$ultimateRainbow-混沌物质模块')
        .texture('dishanhai_item:item/wzdf')
        DShanhaiItemTooltipAPI.register('dishanhai:wzdf', [
            "Módulo de matéria de caos {ultimateRainbow} {/}",
            "Limite superior paralelo {electric}: 536.870.912{/}",
            "{bodySilver} O caos não é desordem, mas uma ordem avançada além da compreensão. {/}",
            "{bodySilver} Ele pode lidar com 500 milhões de linhas mundiais ao mesmo tempo - cada uma sem interferir na outra. {/}"
        ]);

    // 永恒物质模块 - wzyh
        e.create('dishanhai:wzyh')
        .displayName('永恒物质模块')
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
        .displayName('物质创造模块')
        .texture('dishanhai_item:item/wzmk3')
        TooltipAPI.register('dishanhai:wzcz3', [
        '{electric}并行上限: 4.6e18',
        '{ultimateRainbow}重组一切，操纵一切，创造一切',
    ]);;
     // 现实锚点模块
-        e.create('dishanhai:reality_anchor_module')
        .displayName('&$ultimateRainbow-现实锚点模块')
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
        .displayName('&$ultimate-创始现实修改模块')
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
        .displayName('&$crimson-原初分歧之心')
        .texture('dishanhai_item:item/primordial_divergence_heart')
        DShanhaiItemTooltipAPI.register('dishanhai:primordial_divergence_heart', [
            "{crimson} Coração Original da Divergência{/}",
            "{bodySilver} Cada escolha é o ponto de partida de uma linha mundial;{/}",
            "{bodySilver} Cada desacordo é um ramo da árvore de causa e efeito. {/}",
            "{crimson} Segurar este coração tem o poder de mudar todas as possibilidades. {/}"
        ]);
    // 原初引擎核心
        e.create('dishanhai:primordial_engine_core')
        .displayName('&$golden-原初引擎核心')
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
        .displayName('&$gray-世线残片·初醒')
        .texture('dishanhai_item:item/thread_shard_1')
        DShanhaiItemTooltipAPI.register('dishanhai:thread_shard_1', [
            "Fragmentos da Linha Mundial {gray} ·Primeiro Despertar{/}",
            "{bodySilver} O primeiro tremor ocorrido após o rompimento da linha mundial. {/}",
            "{bodySilver} Fraco, mas real. {/}",
            "Multiplicador de linhas de execução {aurora}: ×1{/}"
        ]);
    // 共鸣
        e.create('dishanhai:thread_shard_2')
        .displayName('&$green-世线残片·共鸣')
        .texture('dishanhai_item:item/thread_shard_2')
        DShanhaiItemTooltipAPI.register('dishanhai:thread_shard_2', [
            "Fragmentos da Linha Mundial {green} ·Ressonância{/}",
            "{bodySilver} As duas linhas quebradas se sentem no tempo e no espaço, e os ritmos começam a sincronizar. {/}",
            "{bodySilver} O primeiro raio da ordem nasceu da desordem. {/}",
            "Multiplicador de linhas de execução {aurora}: ×4{/}"
        ]);
    // 跃迁
        e.create('dishanhai:thread_shard_3')
        .displayName('&$water-世线残片·跃迁')
        .texture('dishanhai_item:item/thread_shard_3')
        DShanhaiItemTooltipAPI.register('dishanhai:thread_shard_3', [
            "Fragmentos da linha mundial {water} ·Transição{/}",
            "{bodySilver} Os fragmentos começaram a cruzar independentemente as fendas no tempo e no espaço, reconectando as linhas quebradas do mundo. {/}",
            "{bodySilver} A teoria do universo paralelo é apenas um trampolim. {/}",
            "Multiplicador de linhas de execução {aurora}: ×16{/}"
        ]);
    // 超越
        e.create('dishanhai:thread_shard_4')
        .displayName('&$magic-世线残片·超越')
        .texture('dishanhai_item:item/thread_shard_4')
        DShanhaiItemTooltipAPI.register('dishanhai:thread_shard_4', [
            "Fragmentos da Linha Mundial {magic} ·Além{/}",
            "{bodySilver} Não é mais um fragmento passivo - ele começa a tecer ativamente um novo fio do mundo. {/}",
            "{bodySilver} O fragmento é a origem. {/}",
            "Multiplicador de linhas de execução {aurora}: ×64{/}"
        ]);
    // 统合
        e.create('dishanhai:thread_shard_5')
        .displayName('&$golden-世线残片·统合')
        .texture('dishanhai_item:item/thread_shard_5')
        DShanhaiItemTooltipAPI.register('dishanhai:thread_shard_5', [
            "Fragmentos da Linha Mundial {golden} ·Unificação{/}",
            "{bodySilver} Os fragmentos começaram a se fundir e as linhas de mundo separadas foram unificadas em uma. {/}",
            "{bodySilver} Da divisão à unidade, do caos à ordem. {/}",
            "Multiplicador de linhas de execução {aurora}: ×256{/}"
        ]);
    // 归一
        e.create('dishanhai:thread_shard_6')
        .displayName('&$ultimateRainbow-世线残片·归一')
        .texture('dishanhai_item:item/thread_shard_6')
        DShanhaiItemTooltipAPI.register('dishanhai:thread_shard_6', [
            "Fragmentos da Linha Mundial {ultimateRainbow} ·Guiyi{/}",
            "{bodySilver} Todos os fluxos retornam à sua origem, todos os fenômenos retornam à unidade. {/}",
            "{bodySilver} O fragmento não é mais um fragmento – é o epítome da totalidade. {/}",
            "Multiplicador de linhas de execução {aurora}: ×1.024{/}"
        ]);
    // 裁决
        e.create('dishanhai:thread_shard_7')
        .displayName('&$crimson-世线残片·裁决')
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
        .displayName('&$electric-寰宇并行核心')
        .texture('dishanhai_item:item/universal_parallel_core')
        DShanhaiItemTooltipAPI.register('dishanhai:universal_parallel_core', [
            "Núcleo Paralelo Universal {electric} {/}",
            "{bodySilver} contém o núcleo de potência paralela infinita. {/}",
            "{bodySilver} Ele não pode liberar esse poder por si só - ele precisa da orientação do Julgamento e da Finalidade. {/}",
            "{electric} O componente principal do Translimitador Paralelo Universal{/}"
        ]);
    // 裁决限制器
        e.create('dishanhai:judgment_limiter')
        .displayName('&$crimson-裁决限制器')
        .texture('dishanhai_item:item/judgment_limiter')
        DShanhaiItemTooltipAPI.register('dishanhai:judgment_limiter', [
            "Limitador de julgamento {crimson} {/}",
            "{bodySilver} Elemento arbitrário para evitar fuga paralela. {/}",
            "{bodySilver} O poder ilimitado só pode trazer destruição - é a última linha de defesa que guarda a fronteira paralela. {/}",
            "{crimson} O componente principal do Translimitador Paralelo Universal{/}"
        ]);
    // 终末之序章
        e.create('dishanhai:prologue_of_the_end')
        .displayName('&$magic-终末之序章')
        .texture('dishanhai_item:item/prologue_of_the_end')
        DShanhaiItemTooltipAPI.register('dishanhai:prologue_of_the_end', [
            "{magic} Prólogo até o fim{/}",
            "{bodySilver} O fragmento do prólogo de O Poder do Fim. {/}",
            "{bodySilver} Registra o último trecho de código antes do fim do universo - e a primeira linha de um novo ciclo. {/}",
            "{magic} O componente principal do Translimitador Paralelo Universal{/}"
        ]);
    // 寰宇并行超限器
        e.create('dishanhai:universal_parallel_overdriver')
        .displayName('&$ultimateRainbow-寰宇并行超限器')
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
        e.create('dishanhai:wl_board_ulv').displayName('§7世线胚芽板').texture('dishanhai_item:item/wl_board_ulv').rarity('uncommon').tag("gtceu:circuits/ulv")
        .displayName('&$gray-世线胚芽板')
        DShanhaiItemTooltipAPI.register('dishanhai:wl_board_ulv', [
            "{golden} Placa germinativa Shixiana{/} {gray} ULV {/}",
            "{bodySilver} A primeira peça de silício que aprendeu a identificar a direção{/} {gray} {/} {bodySilver}. Ele não conhece a frente, a traseira, a esquerda ou a direita, apenas conhece{/} {gray} \"caminhando em direção à luz\"{/} {bodySilver}. {/}",
            "{bodySilver} No momento em que a primeira marca luminosa {/} {gray} {/} {bodySilver} cruzou o wafer, o conceito de {/} \"direção\" {gray} {/} {bodySilver} apareceu pela primeira vez no caos. {/}"
        ]);
    // LV (green)
        e.create('dishanhai:wl_board_lv').displayName('§a世线分枝板').texture('dishanhai_item:item/wl_board_lv').rarity('uncommon').tag("gtceu:circuits/lv")
        .displayName('&$green-世线分枝板')
        DShanhaiItemTooltipAPI.register('dishanhai:wl_board_lv', [
            "{golden} Ramificação Shixiana{/} {gray} LV {/}",
            "{bodySilver} Ele não fica mais antes da bifurcação da estrada ——{/} {green} Pegue as duas estradas{/} {bodySilver}, escolha a mais curta. O primeiro {bodySilver} {/} {green} inteligente{/}. {/}",
            "{bodySilver} Quando a {/} escolha {green} {/} {bodySilver} se torna possível, a vida baseada em silício dá o primeiro passo em direção à {/} liberdade {green} {/} {bodySilver}. {/}"
        ]);
    // MV (water)
        e.create('dishanhai:wl_board_mv').displayName('§9世线织络板').texture('dishanhai_item:item/wl_board_mv').tag("gtceu:circuits/mv")
        .displayName('&$water-世线织络板')
        DShanhaiItemTooltipAPI.register('dishanhai:wl_board_mv', [
            "{golden} Tábua de tecelagem Shixiana{/} {gray} MV {/}",
            "{bodySilver} A linha mundial começa{/} {water} Entrelaça{/} {bodySilver}, os erros não são mais o fim. Ela aprendeu {/} {water} a amarrar {/} {bodySilver} e depois {/} {water} a desamarrar{/} {bodySilver} com as próprias mãos. {/}",
            "{bodySilver} Como uma teia de aranha emergindo à luz da manhã, a primeira {/} teia de significado {water} {/} {bodySilver} que ela tece captura todo o mundo conceitual. {/}"
        ]);
    // HV (golden)
        e.create('dishanhai:wl_board_hv').displayName('§6世线共鸣板').texture('dishanhai_item:item/wl_board_hv').tag("gtceu:circuits/hv")
        .displayName('&$golden-世线共鸣板')
        DShanhaiItemTooltipAPI.register('dishanhai:wl_board_hv', [
            "{golden} Mesa de som Shixian{/} {gray} HV {/}",
            "{bodySilver} Não é cálculo, é {/} ressonância {golden} {/} {bodySilver}. A corda virtual treme no tabuleiro e cada golpe corresponde a uma linha do mundo não expandida. {/}",
            "{bodySilver} Tudo tem {/} frequência {golden} {/} {bodySilver}, é apenas o primeiro ouvinte a aprender{/} {golden} a ouvir{/} {bodySilver}. {/}"
        ]);
    // EV (golden)
        e.create('dishanhai:wl_board_ev').displayName('§6世线跃迁板').texture('dishanhai_item:item/wl_board_ev').tag("gtceu:circuits/ev")
        .displayName('&$golden-世线跃迁板')
        DShanhaiItemTooltipAPI.register('dishanhai:wl_board_ev', [
            "Placa de transição da linha mundial {golden} {/} {golden} EV {/}",
            "{bodySilver} Concluiu o cálculo em {/} {golden} \"onde não há posição\"{/} {bodySilver}. Zeração atrasada: o preço é a {/} {golden} perdida{/} ocasional de {bodySilver}. {/}",
            "{bodySilver} dança passos de dança descontínuos no {/} abismo topológico {golden} {/} {bodySilver}, de um nó {/} {golden} piscando{/} {bodySilver} para outro. Isso é chamado de \"salto\". {/}"
        ]);
    // IV (magic)
        e.create('dishanhai:wl_board_iv').displayName('§5世线因果板').texture('dishanhai_item:item/wl_board_iv').rarity('rare').tag("gtceu:circuits/iv")
        .displayName('&$magic-世线因果板')
        DShanhaiItemTooltipAPI.register('dishanhai:wl_board_iv', [
            "{golden} Quadro de Causa e Efeito da Linha Mundial{/} {golden} IV {/}",
            "{bodySilver} A invenção mais perigosa: {/} a saída {magic} pode modificar a entrada{/} {bodySilver}. Ele transforma \"{/} {magic} arrependimento{/} {bodySilver} \" em um comando de operação. {/}",
            "{bodySilver} Quando a seta do tempo é revertida pela primeira vez, {/} causa e efeito {magic} {/} {bodySilver} são conectados de ponta a ponta em sua superfície, {/} autofagia cíclica {magic} {/} {bodySilver}. {/}"
        ]);
    // LuV (magic)
        e.create('dishanhai:wl_board_luv').displayName('§5世线奇点板').texture('dishanhai_item:item/wl_board_luv').rarity('rare').tag("gtceu:circuits/luv")
        .displayName('&$magic-世线奇点板')
        DShanhaiItemTooltipAPI.register('dishanhai:wl_board_luv', [
            "Placa de singularidade da linha mundial {golden} {/} {golden} LuV {/}",
            "{bodySilver} é calculado para se transformar em {/} ponta {magic} {/} {bodySilver} e se expandir novamente em outro momento. Você pergunta \"quanto tempo\" -{/} {magic} e ele responde \"Já terminei antes mesmo de você perguntar\"{/} {bodySilver}. {/}",
            "{bodySilver} É {/} {magic} uma cavidade autoconsistente no eixo do tempo{/} {bodySilver}. A saída é sempre um passo antes da entrada. {/}"
        ]);
    // ZPM (aurora)
        e.create('dishanhai:wl_board_zpm').displayName('§b世线永恒板').texture('dishanhai_item:item/wl_board_zpm').rarity('rare').tag("gtceu:circuits/zpm")
        .displayName('&$aurora-世线永恒板')
        DShanhaiItemTooltipAPI.register('dishanhai:wl_board_zpm', [
            "{golden} Placa Eterna Shixian{/} {aurora} ZPM {/}",
            "{bodySilver} O tempo não importa mais. O que ele consome não são joules, mas sim a {/} \"possibilidade\"{/} {aurora} {bodySilver}. Cada ramificação que ainda não ocorreu é transformada em combustível. {/}",
            "{bodySilver} O que está queimando em seu corpo é tudo{/} {aurora} \"se\"{/} {bodySilver} e {/} {aurora} \"talvez\"{/} {bodySilver}, a máquina ronca e {/} {aurora} a história treme{/} {bodySilver}. {/}"
        ]);
    // UV (aurora)
        e.create('dishanhai:wl_board_uv').displayName('§d世线创世板').texture('dishanhai_item:item/wl_board_uv').rarity('epic').tag("gtceu:circuits/uv")
        .displayName('&$aurora-世线创世板')
        DShanhaiItemTooltipAPI.register('dishanhai:wl_board_uv', [
            "Placa Genesis da Linha Mundial {golden} {/} {aurora} UV {/}",
            "{bodySilver} Este quadro não calcula o mundo - {/} {aurora} Ele calcula como o mundo deveria ser{/} {bodySilver}. O efeito precede a causa. {/}",
            "{bodySilver} Ele pressiona a {/}garganta {aurora} de causa e efeito{/} {bodySilver}, forçando o tempo para entregar primeiro a {/}conclusão {aurora} {/} {bodySilver} e depois revisar as premissas. {/}"
        ]);
    // UHV (crimson)
        e.create('dishanhai:wl_board_uhv').displayName('§4世线超验板').texture('dishanhai_item:item/wl_board_uhv').rarity('epic').tag("gtceu:circuits/uhv")
        .displayName('&$crimson-世线超验板')
        DShanhaiItemTooltipAPI.register('dishanhai:wl_board_uhv', [
            "{golden} Placa Transcendente Shixiana{/} {crimson} UHV {/}",
            "{bodySilver} transcende a experiência, transcende tudo o que pode ser verificado. Ele não precisa ser testado:{/} {crimson} porque é um padrão em si{/} {bodySilver}. {/}",
            "{bodySilver} Quando a ferramenta começa a definir{/} {crimson} os limites da verdade{/} {bodySilver}, ela olha com frieza - {/} {crimson} A régua não precisa ser medida{/} {bodySilver}. {/}"
        ]);
    // UEV (crimson)
        e.create('dishanhai:wl_board_uev').displayName('§4世线归零板').texture('dishanhai_item:item/wl_board_uev').rarity('epic').tag("gtceu:circuits/uev")
        .displayName('&$crimson-世线归零板')
        DShanhaiItemTooltipAPI.register('dishanhai:wl_board_uev', [
            "{golden} Retorno da Linha Mundial ao Quadro Zero{/} {crimson} UEV {/}",
            "Cada vez que {bodySilver} é executado, uma {/} linha mundial {crimson} é permanentemente apagada{/} {bodySilver}. Não use-o para contar 1+1. Isso eliminará{/} {crimson} todos os 1{/} {bodySilver} em um universo paralelo. {/}",
            "{bodySilver} É {/} {crimson} a borracha do universo{/} {bodySilver}, com um traço - a história é uma linha a menos, {/} a existência de {crimson} é um grama mais leve{/} {bodySilver}. {/}"
        ]);
    // UIV (electric)
        e.create('dishanhai:wl_board_uiv').displayName('§1世线无相板').texture('dishanhai_item:item/wl_board_uiv').rarity('epic').tag("gtceu:circuits/uiv")
        .displayName('&$electric-世线无相板')
        DShanhaiItemTooltipAPI.register('dishanhai:wl_board_uiv', [
            "{golden} Placa sem fase Shixiana{/} {crimson} UIV {/}",
            "{bodySilver} Você não consegue ver——{/} {electric} Porque ele está olhando para você{/} {bodySilver}. Não tem forma, mas pode caber nas lacunas de qualquer estrutura. {/}",
            "{bodySilver} é o {/} metamorfo {electric} {/} {bodySilver}, que é o {/} fantasma topológico {electric} {/} {bodySilver}. Pode encontrar sua própria gaveta em qualquer sistema. {/}"
        ]);
    // UXV (neon)
        e.create('dishanhai:wl_board_uxv').displayName('§8世线太初板').texture('dishanhai_item:item/wl_board_uxv').rarity('epic').tag("gtceu:circuits/uxv")
        .displayName('&$neon-世线太初板')
        DShanhaiItemTooltipAPI.register('dishanhai:wl_board_uxv', [
            "{golden} Prancha Shixian Taichu{/} {crimson} UXV {/}",
            "{bodySilver} No início havia um tabuleiro, {/} {neon} o tabuleiro estava com o universo{/} {bodySilver}. Não é uma criação, mas condensada por si mesma no \"nada\"{/} {neon} antes da grande explosão{/} {bodySilver}. {/}",
            "{bodySilver} Não vamos conseguir -{/} {neon} Estamos apenas tirando isso da pilha de sucata no fim dos tempos{/} {bodySilver}. {/}"
        ]);
    // OpV (ultimateRainbow)
        e.create('dishanhai:wl_board_opv').displayName('§f世线管理裁决板').texture('dishanhai_item:item/wl_board_opv').rarity('epic').tag("gtceu:circuits/opv")
        .displayName('&$ultimateRainbow-世线管理裁决板')
        DShanhaiItemTooltipAPI.register('dishanhai:wl_board_opv', [
            "{golden} Conselho de Julgamento de Gerenciamento de Linha Mundial{/} {crimson} OpV {/}",
            "{bodySilver} O gerenciamento não é um cálculo, é uma {/} responsabilidade de {ultimateRainbow} {/} {bodySilver}. Decisão não é julgamento, são {/} consequências {ultimateRainbow} {/} {bodySilver}. Ele não processa dados, {/} {ultimateRainbow} assina a licença{/} {bodySilver}. {/}",
            "{bodySilver} Na interseção de todas as linhas do mundo, ele contém o {/} carimbo {ultimateRainbow} {/} {bodySilver}, carimbado com \"{/} {crimson} Permitir{/} {bodySilver} \" ou \"{/} {crimson} Negado{/} {bodySilver} \". {/} {crimson} Não há canal de contestação{/} {bodySilver}. {/}"
        ]);
    // MAX (ultimateRainbow)
        e.create('dishanhai:wl_board_max').displayName('§6§l世线终焉板').texture('dishanhai_item:item/wl_board_max').rarity('epic').tag("gtceu:circuits/max")
        .displayName('&$ultimateRainbow-世线终焉板')
        DShanhaiItemTooltipAPI.register('dishanhai:wl_board_max', [
            "Placa final de linha mundial {golden} {/} {ultimateRainbow} MAX {/}",
            "{bodySilver} Os pontos finais de todas as linhas mundiais são pressionados em uma única placa. Ele não calcula -{/} {ultimateRainbow}, apenas declara o resultado{/} {bodySilver}. {/}",
            "{bodySilver} Quando infinitas realidades paralelas convergem para {/} {ultimateRainbow} a única saída{/} {bodySilver}, é o posto de pedágio——{/} {ultimateRainbow} A tarifa é todo o significado{/} {bodySilver}. {/}"
        ]);
    // ETERNAL (ultimateRainbow)
        e.create('dishanhai:wl_board_eternal').displayName('§f§l世线永恒裁决板').texture('dishanhai_item:item/wl_board_eternal').rarity('epic').tag("gtceu:circuits/eternal")
        .displayName('&$ultimateRainbow-世线永恒裁决板')
        DShanhaiItemTooltipAPI.register('dishanhai:wl_board_eternal', [
            "{golden} Conselho de Julgamento Eterno da Linha Mundial{/} {ultimateRainbow} ETERNO{/}",
            "{bodySilver} Esta não é uma placa de circuito -{/} {ultimateRainbow} Esta é a lista de verificação do universo{/} {bodySilver}. Quando tudo terminar, ele perguntará:{/} {golden} \"Este ciclo está qualificado?\"{/} {bodySilver} {/}",
            "{bodySilver} Se a resposta for \"não\", ele {/} {ultimateRainbow} formata tudo{/} {bodySilver} e depois {/} {ultimateRainbow} reinicializa{/} {bodySilver}. Recomece a partir do {/} Big Bang {fire} {/} {bodySilver}. {/}"
        ]);
    // 引力波介质
        e.create('dishanhai:gravitational_medium')
        .displayName('§d引力波介质')
        .texture('dishanhai_item:item/gravitational_medium')
        .rarity('epic')
        .maxStackSize(64)
        DShanhaiItemTooltipAPI.register('dishanhai:gravitational_medium', [
            "{aurora} Uma condensação de pura energia gravitacional extraída das ondulações do espaço e do tempo{/}",
            "{bodySilver} Cada onda gravitacional é a respiração do universo e solidificamos seu pulso. {/}"
        ]);
    // 引力波发生天线
        e.create('dishanhai:gravitational_antenna')
        .displayName('§6引力波发生天线')
        .texture('dishanhai_item:item/gravitational_antenna')
        .rarity('rare')
        DShanhaiItemTooltipAPI.register('dishanhai:gravitational_antenna', [
            "{electric} Componente básico do transceptor de ondas gravitacionais, usado para transmissão direcional e recepção de ondulações no espaço-tempo{/}",
            "{bodySilver} Quanto maior a escala da matriz da antena, mais refinado será o sinal da onda gravitacional que pode ser resolvido. {/}"
        ]);
    // 引力波振动弦（简并态物质）
        e.create('dishanhai:gravitational_vibration_string')
        .displayName('§5引力波振动弦')
        .texture('dishanhai_item:item/gravitational_vibration_string')
        .rarity('rare')
        DShanhaiItemTooltipAPI.register('dishanhai:gravitational_vibration_string', [
            "{magic} A corda de matéria degenerada mantém ressonância sob gradiente gravitacional extremo{/}",
            "{bodySilver} Cada vibração que inscreve no espaço e no tempo é uma onda gravitacional inaudível. {/}"
        ]);
    // 人造中子星
        e.create('dishanhai:artificial_neutron_star')
        .displayName('§c人造中子星')
        .texture('dishanhai_item:item/artificial_neutron_star')
        .rarity('epic')
        DShanhaiItemTooltipAPI.register('dishanhai:artificial_neutron_star', [
            "{fire} Um objeto denso artificial que comprime o núcleo de uma estrela a um raio crítico{/}",
            "{bodySilver} O nascimento de cada estrela de nêutrons artificial é uma reprodução perfeita da física gravitacional. {/}"
        ]);

    // 强相互作用水滴（三体）
        e.create('dishanhai:strong_interaction_droplet')
        .displayName('§b§l强相互作用水滴')
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
    regWEM('wem_1', '世线蚀刻矩阵·奇点', '§7', 'ULV-HV', 'wem_1');
    regWEM('wem_2', '世线蚀刻矩阵·脉冲', '§5', 'EV-ZPM', 'wem_2');
    regWEM('wem_3', '世线蚀刻矩阵·共振', '§4', 'UV-UXV', 'wem_3');
    regWEM('wem_4', '世线蚀刻矩阵·超限', '§6§l', 'MAX-ET', 'wem_4');

        e.create('dishanhai:hxsp')
        .rarity('epic')
        .displayName('恒星碎片')
        .texture('dishanhai_item:item/hxsp')
        TooltipAPI.register('dishanhai:hxsp', [
        '{ultimateRainbow}恒星的碎片，由神锻终焉模块提取中子星物质获得',
    ]);;
        e.create('dishanhai:cshx')
        .displayName('§2原§1始§3恒§4星§k111')
        .texture('dishanhai_item:item/yshx')
        TooltipAPI.register('dishanhai:cshx', [
        '{ultimateRainbow}原始恒星，激发恒星能量创造物质',
    ]);;
        e.create('dishanhai:zwf')
        .displayName('占位符')
        .texture('dishanhai_item:item/zwf')
        DShanhaiItemTooltipAPI.register('dishanhai:zwf', [
            "{bodySilver} Este é apenas um marcador comum{/}",
            "{gray} —— Mas eventualmente encontrará seu próprio significado ——{/}"
        ]);
        e.create('dishanhai:soc')
        .displayName('§9创§2始§3s§4o§8c§7晶§6圆')
        .texture('dishanhai_item:item/soc')
        TooltipAPI.register('dishanhai:soc', [
        '{ultimateRainbow}超越维度存在的造物，来自至高维度的回响',
    ]);;

        e.create('dishanhai:platinum_god_proof')
        .displayName('§6铂系之神的证明')
        .texture('dishanhai_item:item/platinum_god_proof')
        TooltipAPI.register('dishanhai:platinum_god_proof', [
        '{golden}铂系之神的馈赠，证明你已征服铂系元素的一切奥秘',
        '{ultimateRainbow}铂、钯、铑、铱、锇、钌——六元素皆臣服于你',
    ]);;

        e.create('dishanhai:dark_energy_multiplier')
        .displayName('暗能量倍增器')
        .texture('dishanhai_item:item/dark_energy_multiplier')
        TooltipAPI.register('dishanhai:dark_energy_multiplier', [
        '{ultimateRainbow}相信终有一天大撕裂也要为我们所用...',
        '{white_blue}蓝星奇迹时代产物，消耗零点能使所有产能翻倍。',
        '{golden}依赖"Gerador de energia de ponto zero a vácuo"为启动核心,需在模式四下激活。',
    ]);;

        e.create('dishanhai:blue_alien')
        .displayName('§9蓝色外星人')
        .texture('dishanhai_item:item/blue_alien')
        TooltipAPI.register('dishanhai:blue_alien', [
        '{ultimateRainbow}来自深空彼端的蓝色外星生命体，散发着幽蓝光芒...',
        '{white_blue}跨越维度的苦命鸳鸯，被时空洪流永远分隔的旅人',
    ]);;

        e.create('dishanhai:long_zui')
        .displayName('§6长醉')
        .texture('dishanhai_item:item/cz')
        TooltipAPI.register('dishanhai:long_zui', [
        '{ultimateRainbow}神权王——醉卧时空长河，只求与君再度相逢',
        '{white_blue}苦命鸳鸯的另一半，失去挚爱后终日长醉不醒的孤王',
    ]);;

        e.create('dishanhai:ku_ming_yuan_yang')
        .displayName('§d苦命鸳鸯')
        .texture('dishanhai_item:item/ku_ming_yuan_yang')
        TooltipAPI.register('dishanhai:ku_ming_yuan_yang', [
        '{ultimateRainbow}神权王与他的蓝星爱人——被时空法则撕裂的命运之缘',
        '{white_blue}一个永醉长河，一个漂流异界，相隔万界的苦命鸳鸯',
    ]);;

        e.create('dishanhai:gravitational_lens')
        .displayName('§5引力扭曲透镜')
        .texture('dishanhai_item:item/gravitational_lens')
        .maxStackSize(16)
        .fireResistant(false)
        TooltipAPI.register('dishanhai:gravitational_lens', [
        '{ultimateRainbow}扭曲时空的透镜，引力波天线发射器的核心组件',
        '{white_blue}将引力聚焦为毁灭性的扭曲力场，撕裂空间本身',
        '{golden}——倒悬于大地之上的审判之钉的"Olho"——',
    ]);;

        e.create('dishanhai:annihilation_core')
        .displayName('湮灭核心')
        .texture('dishanhai_item:item/annihilation_core')
        TooltipAPI.register('dishanhai:annihilation_core', [
        '{ultimateRainbow}从"Utilize regras"到"Faça regras"——宇宙规则的订正者',
        '{white_blue}高效反物质产能核心，指尖一触即可收割文明，改写宇宙基本定律',
        '{golden}"Nova fonte de gravidade"技术让引力不再遥不可及，低熵态不复存在',
        '{purplish_red}奇迹时代的产物,利用奇异湮灭一切',
    ]);;

        try {
            if (typeof ShanhaiText !== 'undefined') {
                e.create('dishanhai:primordial_worldline_seed')
                .texture('dishanhai_item:item/bagua_animated')
                .fireResistant(false)
                .displayName('&$ultimate-太初世线之种')
                TooltipAPI.register('dishanhai:primordial_worldline_seed', [
        '{nature}一粒尚未决定向何处生长的世线种子，封存着分裂发生前的寂静。',
        '{magic}投入太初分歧引擎后，种子开始膨胀——不是体积，是可能性。',
        '{golden}根须向所有方向同时蔓延，枝杈尚未命名，但每一根都渴望成为',
        '{lava}"história"。',
        '{fire}太初选择了一粒种子，种子选择了无数个世界。',
    ]);;
                console.log('[山海] 太初世线之种 已注册');
            }
        } catch(e) {
            console.error('[山海] 太初世线之种 注册失败: ' + e);
        }

        // ===== 太初并行子 =====
        try {
            if (typeof ShanhaiText !== 'undefined') {
                e.create('dishanhai:primordial_parallel_particle')
                .texture('dishanhai_item:item/parallel_particle_animated')
                .maxStackSize(64)
                .fireResistant(false)
                .displayName('&$ultimate-太初并行子')
                TooltipAPI.register('dishanhai:primordial_parallel_particle', [
        '{nature}太初之时，没有先后，只有同时。一粒并行子装着那个"ao mesmo tempo"。',
        '{magic}太极引擎吞咽它后，学会了让因果并排行走——',
        '{ice}它们侧身而过，互不打扰。',
        '{golden}每一纳秒，都有无数条世线在引擎里交叉验证。',
        '{fire}不是快，是"muitos"。',
    ]);;
                console.log('[山海] 太初并行子 已注册');
            }
        } catch(e) {
            console.error('[山海] 太初并行子 注册失败: ' + e);
        }
        // ===== 维度世线碎片 =====
        try {
            if (typeof ShanhaiText !== 'undefined') {
                e.create('dishanhai:dimensional_worldline_fragment')
                .displayName(Component.literal('维度世线碎片'))
                .texture('dishanhai_item:item/dimensional_worldline_fragment')
                .fireResistant(false)
                .displayName('&$aurora-维度世线碎片')
                TooltipAPI.register('dishanhai:dimensional_worldline_fragment', [
        '{aurora}世线在维度间穿梭时剥落的碎片，每一片都记载着',
        '{magic}一个平行宇宙的坐标与一个未完成的因果。',
    ]);;
                console.log('[山海] 维度世线碎片 已注册');
            }
        } catch(e) {
            console.error('[山海] 维度世线碎片 注册失败: ' + e);
        }
        // ===== 余振世线碎片 =====
        try {
            if (typeof ShanhaiText !== 'undefined') {
                e.create('dishanhai:worldline_residual_fragment')
                .displayName(Component.literal('余振世线碎片'))
                .texture('dishanhai_item:item/worldline_residual_fragment')
                .fireResistant(false)
                .displayName('&$crimson-余振世线碎片')
                TooltipAPI.register('dishanhai:worldline_residual_fragment', [
        '{crimson}世线断裂后在时间纤维上残留的余振，是维度震荡的最终遗响。',
    ]);;
                console.log('[山海] 余振世线碎片 已注册');
            }
        } catch(e) {
            console.error('[山海] 余振世线碎片 注册失败: ' + e);
        }

        // ===== 分歧世线凝核 =====
        try {
            if (typeof ShanhaiText !== 'undefined') {
                e.create('dishanhai:worldline_divergent_core')
                .displayName(Component.literal('分歧世线凝核'))
                .texture('dishanhai_item:item/worldline_divergent_core')
                .fireResistant(false)
                .displayName('&$magic-分歧世线凝核')
                TooltipAPI.register('dishanhai:worldline_divergent_core', [
        '{magic}多股世线的分歧点在压力下凝聚成的固态核，是可能性本身的结晶。',
    ]);;
                console.log('[山海] 分歧世线凝核 已注册');
            }
        } catch(e) {
            console.error('[山海] 分歧世线凝核 注册失败: ' + e);
        }

        // ===== 无界世线奇点 =====
        try {
            if (typeof ShanhaiText !== 'undefined') {
                e.create('dishanhai:worldline_boundless_singularity')
                .displayName(Component.literal('无界世线奇点'))
                .texture('dishanhai_item:item/worldline_boundless_singularity')
                .fireResistant(false)
                .displayName('&$ultimateRainbow-无界世线奇点')
                TooltipAPI.register('dishanhai:worldline_boundless_singularity', [
        '{ultimateRainbow}当世线的数量逼近无穷，所有分歧会坍缩为一个奇点——无界者。',
    ]);;
                console.log('[山海] 无界世线奇点 已注册');
            }
        } catch(e) {
            console.error('[山海] 无界世线奇点 注册失败: ' + e);
        }

        // ===== 虚数世线虚弦 =====
        try {
            if (typeof ShanhaiText !== 'undefined') {
                e.create('dishanhai:worldline_imaginary_string')
                .displayName(Component.literal('虚数世线虚弦'))
                .texture('dishanhai_item:item/worldline_imaginary_string')
                .fireResistant(false)
                .displayName('&$neon-虚数世线虚弦')
                TooltipAPI.register('dishanhai:worldline_imaginary_string', [
        '{neon}在复时间平面上振动的虚数弦，是世线的未坍缩态。',
    ]);;
                console.log('[山海] 虚数世线虚弦 已注册');
            }
        } catch(e) {
            console.error('[山海] 虚数世线虚弦 注册失败: ' + e);
        }

        // ===== 始世线创世胚 =====
        try {
            if (typeof ShanhaiText !== 'undefined') {
                e.create('dishanhai:worldline_genesis_embryo')
                .displayName(Component.literal('始世线创世胚'))
                .texture('dishanhai_item:item/worldline_genesis_embryo')
                .fireResistant(false)
                .displayName('&$golden-始世线创世胚')
                TooltipAPI.register('dishanhai:worldline_genesis_embryo', [
        '{fire}分歧、融合、坍缩、重构——万亿世线的宿命皆浓缩于此胚中。',
        '{golden}它不是奇迹——它是定义奇迹为何物的基线。',
        '{ultimateRainbow}它定义何为\"现实\"本身。',
        '{neon}可以重新定义一切存在之规则的钥匙。',
    ]);;
                console.log('[山海] 始世线创世胚 已注册');
            }
        } catch(e) {
            console.error('[山海] 始世线创世胚 注册失败: ' + e);
        }

        // ===== 动态文本API测试物品（仅注册物品，文案在 JEI 侧） =====
        try {
            e.create("dishanhai:test_dynamic_text", "basic")
            .displayName("§7山海动态文本测试")
            .texture("dishanhai_item:item/hxsp")
            .displayName('&$ultimate-山海动态文本测试')
        } catch(tex) {
            console.warn("[山海][test] 动态名称注册失败: " + (tex.message || tex));
            e.create("dishanhai:test_dynamic_text", "basic")
            .displayName("§e山海动态文本测试")
            .texture("dishanhai_item:item/hxsp")
        }

    // 万法核心（72变系统）
    e.create('dishanhai:wanxiang_core')
    .displayName('§d七十二变·万象心法核心')
    .texture('dishanhai_item:item/wanxiang_core')
    .maxStackSize(1)
    .rarity('epic')
    .glow(true)

    // ===== 创造模块配套物品 =====
    try {
        e.create('dishanhai:genesis_shard')
        .displayName('创世碎片')
        .texture('dishanhai_item:item/genesis_shard')
        .rarity('rare')
        TooltipAPI.register('dishanhai:genesis_shard', [
        '{golden}创造之力凝聚的碎片，携带着初生宇宙的信息。',
        '{bodySilver}每一片碎片都记录着一个潜在现实的蓝图。',
    ]);;

    } catch(e) {
    }

    try {
        e.create('dishanhai:nova_catalyst')
        .displayName('新星催化剂')
        .texture('dishanhai_item:item/nova_catalyst')
        .rarity('rare')
        TooltipAPI.register('dishanhai:nova_catalyst', [
        '{fire}超新星爆发的精华凝聚，加速现实重构的催化介质。',
        '{bodySilver}它为创造模块提供点燃新现实所需的初始能量脉冲。',
    ]);;
    } catch(e) {
    }

    try {
        e.create('dishanhai:reality_core')
        .displayName('现实核心')
        .texture('dishanhai_item:item/reality_core')
        .maxStackSize(1)
        .rarity('epic')
        .glow(true)
        TooltipAPI.register('dishanhai:reality_core', [
        '{ultimateRainbow}创造模块的最高组件——能够定义现实本身规则的奇点核心。',
        '{bodySilver}它是创世沙盒的核心，稳态永恒的具象化体现。',
        '{bodySilver}只有真正理解了创造的意义，才能驾驭它的力量。',
    ]);;
    } catch(e) {
    }

    // ===== 通用材料物品 =====
    try {
        e.create('dishanhai:cosmic_dust')
        .displayName('宇宙尘埃')
        .texture('dishanhai_item:item/cosmic_dust')
        TooltipAPI.register('dishanhai:cosmic_dust', [
        '{aurora}星尘——宇宙中最基础的建设材料。',
        '{bodySilver}每一粒尘埃都携带者恒星死亡与新生的记忆。',
    ]);;
    } catch(e) {
    }

    try {
        e.create('dishanhai:dimensional_matrix')
        .displayName('维度矩阵')
        .texture('dishanhai_item:item/dimensional_matrix')
        .rarity('rare')
        TooltipAPI.register('dishanhai:dimensional_matrix', [
        '{water}跨维度坐标的数学抽象体，以晶体网格的形式稳定存在。',
        '{bodySilver}它是连接不同维度的桥梁材料。',
    ]);;
    } catch(e) {
    }

    try {
        e.create('dishanhai:dimensional_frame')
        .displayName('维度框架')
        .texture('dishanhai_item:item/dimensional_frame')
        .rarity('rare')
        .glow(true)
        TooltipAPI.register('dishanhai:dimensional_frame', [
        '{water}现实核心的骨架雏形——维度之力凝结的六边形框架。',
        '{bodySilver}仍需注入奇点能量才能成为完整的现实核心。',
    ]);;
        console.log('[山海] 维度框架 已注册');
    } catch(e) {
        console.error('[山海] 维度框架 注册失败: ' + e);
    }

    try {
        e.create('dishanhai:singularity_ring')
        .displayName('奇点环')
        .texture('dishanhai_item:item/singularity_ring')
        .maxStackSize(16)
        .rarity('epic')
        .glow(true)
        TooltipAPI.register('dishanhai:singularity_ring', [
        '{magic}将奇点压缩为环形结构的终极技术——质量无限大，体积无限小。',
        '{bodySilver}顶级机器的核心部件，驾驭引力的钥匙。',
    ]);;
    } catch(e) {

    }



    // ===== 逐光系列（五阶） =====
    try {
        e.create('dishanhai:first_light')
        .displayName('初光')
        .texture('dishanhai_item:item/first_light')
        .displayName('&$golden-初光')
        TooltipAPI.register('dishanhai:first_light', [
        '{golden}启航之前，先有光。',
    ]);;
    } catch(e) {
    }

    try {
        e.create('dishanhai:navigate_prism')
        .displayName('导航棱镜')
        .texture('dishanhai_item:item/navigate_prism')
        .rarity('rare')
        TooltipAPI.register('dishanhai:navigate_prism', [
        '{water}在无垠的黑暗中锁定方向——光即是航标。',
        '{bodySilver}棱镜折射的不只是光芒，还有航行的意志。',
    ]);;
        console.log('[山海] 导航棱镜 已注册');
    } catch(e) {
        console.error('[山海] 导航棱镜 注册失败: ' + e);
    }

    try {
        e.create('dishanhai:light_voyage')
        .displayName('逐光启航')
        .texture('dishanhai_item:item/light_voyage')
        .rarity('rare')
        TooltipAPI.register('dishanhai:light_voyage', [
        '{aurora}我们生来逐光，如同飞蛾扑向恒星。',
        '{bodySilver}当方舟驶向宇宙中心，每一缕光都是导航的坐标。',
    ]);;
        console.log('[山海] 逐光启航 已注册');
    } catch(e) {
        console.error('[山海] 逐光启航 注册失败: ' + e);
    }

    try {
        e.create('dishanhai:star_spark')
        .displayName('星火意志')
        .texture('dishanhai_item:item/star_spark')
        .rarity('epic')
        .glow(true)
        TooltipAPI.register('dishanhai:star_spark', [
        '{neon}跨越亿万光年的意志，化作一道不灭的星火。',
        '{bodySilver}文明的火种在黑暗中燃烧，永不熄灭。',
    ]);;
        console.log('[山海] 星火意志 已注册');
    } catch(e) {
        console.error('[山海] 星火意志 注册失败: ' + e);
    }

    try {
        e.create('dishanhai:blue_son')
        .displayName('蓝星之子')
        .texture('dishanhai_item:item/blue_son')
        .rarity('epic')
        .glow(true)
.displayName('&$ultimate-蓝星之子')
        TooltipAPI.register('dishanhai:blue_son', [
        '{ultimateRainbow}蓝星文明之巅，逐光航程的终极凝聚。',
        '{bodySilver}它并非终点——而是下一段旅程的起点。',
    ]);;
        console.log('[山海] 蓝星之子 已注册');
    } catch(e) {
        console.error('[山海] 蓝星之子 注册失败: ' + e);
    }

    // ===== 光子 =====
    try {
        e.create('dishanhai:photon')
            .displayName('§e光§f子')
            .texture('dishanhai_item:item/photon')
            .maxStackSize(64);
        TooltipAPI.register('dishanhai:photon', [
        '{golden}光的粒子形态，星云虹吸的次级产物。',
        '{bodySilver}比光子流体更易储存和运输，但蕴含的能量密度较低。',
        '{aurora}它仍带着螺旋星系的余温——和一点来自真空的倔强。',
    ]);;
        console.log('[山海] 光子 已注册');
    } catch(e) {
        console.error('[山海] 光子 注册失败: ' + e);
    }
    // 中央有限曲线
        e.create('dishanhai:central_finite_curve')
        .displayName('&$magic-中央有限曲线')
        .texture('dishanhai_item:item/central_finite_curve')
        DShanhaiItemTooltipAPI.register('dishanhai:central_finite_curve', [
        "{magic}∞ 中央有限曲线 ∞{/}",
        "{bodySilver}它是所有世线的收敛点，{/}",
        "{bodySilver}所有可能性的汇聚之处。{/}",
        "{magic}在这条曲线上，一切皆有可能，一切皆已注定。{/}"
       ]);
    // ===== 测试物品 =====
    try {
        e.create('dishanhai:test_item')
            .displayName('&$ultimate-测试物品')
            .texture('minecraft:item/barrier')
        TooltipAPI.register('dishanhai:test_item', [
            '{ultimate}这是一行终极彩虹测试文本',
            '{bodySilver}正文银色测试文本',
            '{golden}金色系测试文本'
        ]);
    } catch(e) {
        console.error('[山海] 测试物品注册失败: ' + e);
    }

    // ===== 黑洞遏制场种子/坍缩器 =====
    e.create('dishanhai:bhd_hyper_seed')
        .texture('dishanhai_item:item/hyperstable_black_hole_seed')
        .displayName('超稳态黑洞种子')
    TooltipAPI.register('dishanhai:bhd_hyper_seed', [
        '{ultimateRainbow}事件视界包裹的奇点，借助时空催化可打开亚稳态黑洞',
        '{golden}放入亚稳态黑洞遏制场的输入总线以启动黑洞',
        '{red}警告：黑洞打开后会持续衰变，需要提供熔融时空来维持稳定',
    ]);

    e.create('dishanhai:bhd_collapser')
        .texture('dishanhai_item:item/black_hole_collapser')
        .displayName('黑洞坍缩器')
    TooltipAPI.register('dishanhai:bhd_collapser', [
        '{ultimateRainbow}强制逆转事件视界的引力场，令黑洞在1秒内坍缩',
        '{golden}放入亚稳态黑洞遏制场的输入总线以关闭黑洞',
        '{aqua}关闭后稳定度和时空消耗会重置',
    ]);

    e.create('dishanhai:hyperdimensional_calibration_matrix')
        .texture('dishanhai_item:item/hyperdimensional_calibration_matrix')
        .displayName('超维校准矩阵')
    TooltipAPI.register('dishanhai:hyperdimensional_calibration_matrix', [
        '{ultimateRainbow}',
        '{golden}',
    ])

e.create('dishanhai:casing_empty_quark_emission_catalyst')
.displayName('空夸克释放催化剂外壳')
.texture('dishanhai_item:item/casing_empty_quark_emission_catalyst')
TooltipAPI.register('dishanhai:casing_empty_quark_emission_catalyst', [
    '{golden}空夸克释放催化剂外壳',
    '{bodySilver}用于包裹夸克释放催化剂，防止其被破坏',
])

e.create('dishanhai:up_quark_emission_catalyst')
.displayName('上-夸克释放催化剂')
.texture('dishanhai_item:item/up_quark_emission_catalyst')
TooltipAPI.register('dishanhai:up_quark_emission_catalyst', [
    '{golden}上-夸克释放催化剂',
    '{bodySilver}用于释放上-夸克催化剂，以重塑物质',
])

e.create('dishanhai:down_quark_emission_catalyst')
.displayName('下-夸克释放催化剂')
.texture('dishanhai_item:item/down_quark_emission_catalyst')
TooltipAPI.register('dishanhai:down_quark_emission_catalyst', [
    '{golden}下-夸克释放催化剂',
    '{bodySilver}用于释放下-夸克催化剂，以重塑物质',
])

 e.create('dishanhai:strange_quark_emission_catalyst')
.displayName('奇-夸克释放催化剂')
.texture('dishanhai_item:item/ange_quark_emission_catalyst')
TooltipAPI.register('dishanhai:strange_quark_emission_catalyst', [
    '{golden}奇-夸克释放催化剂',
    '{bodySilver}用于释放奇-夸克催化剂，以重塑物质',
])

e.create('dishanhai:charm_quark_emission_catalyst')
.displayName('粲-夸克释放催化剂')
.texture('dishanhai_item:item/charm_quark_emission_catalyst')
TooltipAPI.register('dishanhai:charm_quark_emission_catalyst', [
    '{golden}粲-夸克释放催化剂',
    '{bodySilver}用于释放粲-夸克催化剂，以重塑物质',
])

e.create('dishanhai:bottom_quark_emission_catalyst')
.displayName('底-夸克释放催化剂')
.texture('dishanhai_item:item/bottom_quark_emission_catalyst')
TooltipAPI.register('dishanhai:bottom_quark_emission_catalyst', [
    '{golden}底-夸克释放催化剂',
    '{bodySilver}用于释放底-夸克催化剂，以重塑物质',
])

 e.create('dishanhai:top_quark_emission_catalyst')
.displayName('顶-夸克释放催化剂')
.texture('dishanhai_item:item/top_quark_emission_catalyst')
TooltipAPI.register('dishanhai:top_quark_emission_catalyst', [
    '{golden}顶-夸克释放催化剂',
    '{bodySilver}用于释放顶-夸克催化剂，以重塑物质',
])

e.create('dishanhai:misaligned_quark_emission_catalyst')
.displayName('非对齐夸克释放催化剂')
.texture('dishanhai_item:item/misaligned_quark_emission_catalyst')
TooltipAPI.register('dishanhai:misaligned_quark_emission_catalyst', [
    '{golden}非对齐夸克释放催化剂',
    '{bodySilver}使用前需要重新对齐',
])

e.create('dishanhai:dog_coins')
.displayName('Doge币')
.texture('dishanhai_item:item/dog_coins')
TooltipAPI.register('dishanhai:dog_coins', [
    '{golden}Doge币',
    '{bodySilver}好多钱钱啊-doge',
    '',
    '{bodySilver}Doge币是一种基于Doge网络的加密货币',
    '{bodySilver}Doge币的网络由Doge节点组成，每个节点都有自己的Doge币钱包',
    '{bodySilver}kabosu会看着Doge节点的交易，将交易记录添加到Doge币的区块链中',
    '',
    '{bodySilver}kabosu(doge原型)-在2024年5月24日离开了Doge网络-致哀',
])

e.create('dishanhai:hydrogen_ion')
.displayName('氢离子')
.texture('dishanhai_item:item/hydrogen_ion')
DShanhaiItemTooltipAPI.register('dishanhai:hydrogen_ion', [
    '{golden}氢离子{/}',
    '{bodySilver}一个带有{/}{rainbow}未知{/}{bodySilver}电荷的hydrohen离子{/}',
])

e.create('dishanhai:helium_ion')
.displayName('氦离子')
.texture('dishanhai_item:item/helium_ion')
DShanhaiItemTooltipAPI.register('dishanhai:helium_ion', [
    '{golden}氦离子{/}',
    '{bodySilver}一个带有{/}{rainbow}未知{/}{bodySilver}电荷的helium离子{/}',
])

e.create('dishanhai:graviton')
.displayName('引力子')
.texture('dishanhai_item:item/graviton')
DShanhaiItemTooltipAPI.register('dishanhai:graviton', [
    '{golden}引力子{/}',
    '{bodySilver}引力的载体玻色子，自旋 2，零质量（假想）{/}',
])

e.create('dishanhai:up_quark')
.displayName('上(u)夸克')
.texture('dishanhai_item:item/up_quark')
DShanhaiItemTooltipAPI.register('dishanhai:up_quark', [
    '{golden}上夸克 (u){/}',
    '{bodySilver}最轻的夸克之一{/}',
    '{bodySilver}电荷：+2/3  |  自旋：1/2{/}',
])

e.create('dishanhai:down_quark')
.displayName('下(d)夸克')
.texture('dishanhai_item:item/down_quark')
DShanhaiItemTooltipAPI.register('dishanhai:down_quark', [
    '{golden}下夸克 (d){/}',
    '{bodySilver}第一代夸克{/}',
    '{bodySilver}电荷：-1/3  |  自旋：1/2{/}',
])

e.create('dishanhai:charm_quark')
  .displayName('粲(c)夸克')
  .texture('dishanhai_item:item/charm_quark')
DShanhaiItemTooltipAPI.register('dishanhai:charm_quark', [
    '{golden}粲夸克 (c){/}',
    '{bodySilver}第二代夸克，电荷 +2/3，含粲粒子的弱衰变较慢{/}',
])


e.create('dishanhai:strange_quark')
  .displayName('奇(s)夸克')
  .texture('dishanhai_item:item/strange_quark')
DShanhaiItemTooltipAPI.register('dishanhai:strange_quark', [
    '{golden}奇夸克 (s){/}',
    '{bodySilver}第二代夸克，电荷 -1/3，带有奇异数{/}',
    '{bodySilver}自旋：1/2  |  参与强相互作用{/}',
])

e.create('dishanhai:bottom_quark')
  .displayName('底(d)夸克')
  .texture('dishanhai_item:item/bottom_quark')
DShanhaiItemTooltipAPI.register('dishanhai:bottom_quark', [
    '{golden}底夸克 (b){/}',
    '{bodySilver}第三代夸克，电荷 -1/3，B 介子与底偶素的组分{/}',
    '{bodySilver}自旋：1/2  |  质量较大{/}',
])

e.create('dishanhai:top_quark')
  .displayName('顶(t)夸克')
  .texture('dishanhai_item:item/top_quark')
DShanhaiItemTooltipAPI.register('dishanhai:top_quark', [
    '{golden}顶夸克 (t){/}',
    '{bodySilver}第三代夸克，电荷 +2/3，已知最重的夸克{/}',
    '{bodySilver}自旋：1/2  |  寿命极短，不形成束缚态{/}',
])

e.create('dishanhai:electron')
  .displayName('电子')
  .texture('dishanhai_item:item/electron')
DShanhaiItemTooltipAPI.register('dishanhai:electron', [
    '{golden}电子 (e⁻){/}',
    '{bodySilver}第一代带电轻子，电荷 -1，自旋 1/2{/}',
])

e.create('dishanhai:electron_neutrino')
  .displayName('电子中微子')
  .texture('dishanhai_item:item/electron_neutrino')
DShanhaiItemTooltipAPI.register('dishanhai:electron_neutrino', [
    '{golden}电子中微子 (νₑ){/}',
    '{bodySilver}第一代中微子，电中性，质量极小{/}',
])

e.create('dishanhai:muon')
  .displayName('μ子')
  .texture('dishanhai_item:item/muon')
DShanhaiItemTooltipAPI.register('dishanhai:muon', [
    '{golden}μ子 (μ⁻){/}',
    '{bodySilver}第二代带电轻子，电荷 -1，不稳定{/}',
])

e.create('dishanhai:muon_neutrino')
  .displayName('μ子中微子')
  .texture('dishanhai_item:item/muon_neutrino')
DShanhaiItemTooltipAPI.register('dishanhai:muon_neutrino', [
    '{golden}μ子中微子 (ν_μ){/}',
    '{bodySilver}第二代中微子，与μ子伴生{/}',
])

e.create('dishanhai:tau')
  .displayName('τ子')
  .texture('dishanhai_item:item/tau')
DShanhaiItemTooltipAPI.register('dishanhai:tau', [
    '{golden}τ子 (τ⁻){/}',
    '{bodySilver}第三代带电轻子，电荷 -1，极重且不稳定{/}',
])

e.create('dishanhai:tau_neutrino')
  .displayName('τ子中微子')
  .texture('dishanhai_item:item/tau_neutrino')
DShanhaiItemTooltipAPI.register('dishanhai:tau_neutrino', [
    '{golden}τ子中微子 (ν_τ){/}',
    '{bodySilver}第三代中微子，与τ子伴生{/}',
])

e.create('dishanhai:gluon')
  .displayName('胶子')
  .texture('dishanhai_item:item/gluon')
DShanhaiItemTooltipAPI.register('dishanhai:gluon', [
    '{golden}胶子 (g){/}',
    '{bodySilver}强相互作用的规范玻色子，自旋 1，带色荷{/}',
])

e.create('dishanhai:photon_rainbow')
  .displayName('光子')
  .texture('dishanhai_item:item/photon_rainbow')
DShanhaiItemTooltipAPI.register('dishanhai:photon_rainbow', [
    '{golden}光子 (γ){/}',
    '{bodySilver}电磁相互作用的媒介粒子，自旋 1，零质量{/}',
])

e.create('dishanhai:z_boson')
  .displayName('Z玻色子')
  .texture('dishanhai_item:item/z_boson')
DShanhaiItemTooltipAPI.register('dishanhai:z_boson', [
    '{golden}Z玻色子 (Z⁰){/}',
    '{bodySilver}弱相互作用的媒介粒子，自旋 1，电中性{/}',
    '{bodySilver}传递弱中性流，质量较大{/}',
])

e.create('dishanhai:w_boson')
  .displayName('W玻色子')
  .texture('dishanhai_item:item/w_boson')
DShanhaiItemTooltipAPI.register('dishanhai:w_boson', [
    '{golden}W玻色子 (W⁺ / W⁻){/}',
    '{bodySilver}弱相互作用的规范玻色子，自旋 1，电荷 ±1{/}',
    '{bodySilver}参与β衰变等带电弱过程{/}',
])

e.create('dishanhai:higgs_boson')
  .displayName('希格斯玻色子')
  .texture('dishanhai_item:item/higgs_boson')
DShanhaiItemTooltipAPI.register('dishanhai:higgs_boson', [
    '{golden}希格斯玻色子 (H⁰){/}',
    '{bodySilver}标量玻色子，自旋 0，源于希格斯机制{/}',
    '{bodySilver}赋予基本粒子质量的机制核心{/}',
])

e.create('dishanhai:proton')
  .displayName('质子')
  .texture('dishanhai_item:item/proton')
DShanhaiItemTooltipAPI.register('dishanhai:proton', [
    '{golden}质子 (p){/}',
    '{bodySilver}重子，由 uud 夸克组成，电荷 +1{/}',
    '{bodySilver}原子核的稳定组分，自旋 1/2{/}',
])

e.create('dishanhai:neutron')
  .displayName('中子')
  .texture('dishanhai_item:item/neutron')
DShanhaiItemTooltipAPI.register('dishanhai:neutron', [
    '{golden}中子 (n){/}',
    '{bodySilver}重子，由 udd 夸克组成，电中性{/}',
    '{bodySilver}自由中子不稳定，平均寿命约 14.7 分钟{/}',
])

e.create('dishanhai:lambda_particle')
  .displayName('λ粒子')
  .texture('dishanhai_item:item/lambda_particle')
DShanhaiItemTooltipAPI.register('dishanhai:lambda_particle', [
    '{golden}λ粒子 (Λ⁰){/}',
    '{bodySilver}奇异重子，uds 夸克组成，奇异数 -1{/}',
    '{bodySilver}通过弱相互作用衰变，典型寿命 ~2.6×10⁻¹⁰ s{/}',
])

e.create('dishanhai:omega_particle')
  .displayName('Ω粒子')
  .texture('dishanhai_item:item/omega_particle')
DShanhaiItemTooltipAPI.register('dishanhai:omega_particle', [
    '{golden}Ω粒子 (Ω⁻){/}',
    '{bodySilver}三重奇异重子，sss 夸克组成，奇异数 -3{/}',
    '{bodySilver}自旋 3/2，揭示了 SU(3) 味的十重态结构{/}',
])

e.create('dishanhai:pion')
  .displayName('π介子')
  .texture('dishanhai_item:item/pion')
DShanhaiItemTooltipAPI.register('dishanhai:pion', [
    '{golden}π介子 (π⁺, π⁰, π⁻){/}',
    '{bodySilver}最轻的介子，夸克-反夸克束缚态{/}',
    '{bodySilver}核力中长程相互作用的主要媒介{/}',
])

e.create('dishanhai:eta_meson')
  .displayName('η介子')
  .texture('dishanhai_item:item/eta_meson')
DShanhaiItemTooltipAPI.register('dishanhai:eta_meson', [
    '{golden}η介子 (η){/}',
    '{bodySilver}电中性赝标介子，含 u、d、s 夸克的叠加态{/}',
    '{bodySilver}质量较π介子大，与 U(1)ₐ 反常有关{/}',
])

e.create('dishanhai:unknown_particle')
  .displayName('未知粒子')
  .texture('dishanhai_item:item/unknown_particle')
DShanhaiItemTooltipAPI.register('dishanhai:unknown_particle', [
    '{golden}未知粒子 (？){/}',
    '{bodySilver}性质尚未探明的粒子，似在标准模型之外{/}',
    '{bodySilver}数据不足，无法分类…{/}',
])

e.create('dishanhai:copper_coin')
  .displayName('铜GT币')
  .texture('dishanhai_item:item/copper_coin')

DShanhaiItemTooltipAPI.register('dishanhai:copper_coin', [
    '{golden}铜GT币{/}',
    '{bodySilver}基础工业货币，铜材质，广泛流通{/}',
    '{bodySilver}价值最低但不可或缺{/}',
])

e.create('dishanhai:cupronickel_coin')
  .displayName('白铜GT币')
  .texture('dishanhai_item:item/cupronickel_coin')

DShanhaiItemTooltipAPI.register('dishanhai:cupronickel_coin', [
    '{golden}白铜GT币{/}',
    '{bodySilver}以白铜合金铸造的货币，质地坚硬耐磨损{/}',
    '{bodySilver}用于格雷科技能量交易或多方块设备支付{/}',
])

e.create('dishanhai:silver_coin')
  .displayName('银GT币')
  .texture('dishanhai_item:item/silver_coin')

DShanhaiItemTooltipAPI.register('dishanhai:silver_coin', [
    '{golden}银GT币{/}',
    '{bodySilver}银质货币，导电性优良{/}',
    '{bodySilver}常用于中等价值交易与特殊蓝图购买{/}',
])


e.create('dishanhai:gold_coin')
  .displayName('金GT币')
  .texture('dishanhai_item:item/gold_coin')

DShanhaiItemTooltipAPI.register('dishanhai:gold_coin', [
    '{golden}金GT币{/}',
    '{bodySilver}金质货币，高价值标准通货{/}',
    '{bodySilver}多数高阶组件与稀有资源的交易媒介{/}',
])

e.create('dishanhai:platinum_coin')
  .displayName('铂GT币')
  .texture('dishanhai_item:item/platinum_coin')

DShanhaiItemTooltipAPI.register('dishanhai:platinum_coin', [
    '{golden}铂GT币{/}',
    '{bodySilver}铂系货币，耐腐蚀、高密度{/}',
    '{bodySilver}用于支付顶级设备或超维材料{/}',
])

e.create('dishanhai:osmium_coin')
  .displayName('锇GT币')
  .texture('dishanhai_item:item/osmium_coin')

DShanhaiItemTooltipAPI.register('dishanhai:osmium_coin', [
    '{golden}锇GT币{/}',
    '{bodySilver}锇质货币，硬度与密度兼具{/}',
    '{bodySilver}涉及时空扭曲或极高压工艺的交易用币{/}',
])

e.create('dishanhai:naquadah_coin')
  .displayName('硅岩GT币')
  .texture('dishanhai_item:item/naquadah_coin')

DShanhaiItemTooltipAPI.register('dishanhai:naquadah_coin', [
    '{golden}硅岩GT币{/}',
    '{bodySilver}以硅岩（Naquadah）铸成，蕴含异常能量{/}',
    '{bodySilver}极少流通，多见于跨维度商业或暗影秘会{/}',
])

e.create('dishanhai:neutronium_coin')
  .displayName('中子GT币')
  .texture('dishanhai_item:item/neutronium_coin')

DShanhaiItemTooltipAPI.register('dishanhai:neutronium_coin', [
    '{golden}中子GT币{/}',
    '{bodySilver}由中子简并态物质压缩而成，密度趋近理论极限{/}',
    '{bodySilver}用于终极交易——据说连重力都能买通{/}',
])

e.create('dishanhai:quantum_coin')
  .displayName('量子币')
  .texture('dishanhai_item:item/quantum_coin')
DShanhaiItemTooltipAPI.register('dishanhai:quantum_coin', [
    '{golden}量子币{/}',
    '{bodySilver}由量子态构成，文字无法描述其内核{/}',
])



e.create('dishanhai:stupid_coin')
  .displayName('蠢民币')
  .texture('dishanhai_item:item/stupid_coin')

DShanhaiItemTooltipAPI.register('dishanhai:stupid_coin', [

    '{golden}蠢民币{/}',
    '{bodySilver}纯纯的蠢民币，没有价值{/}',
])


e.create('dishanhai:sadbapycat_token')
  .displayName('SadBapyCat 代币')
  .texture('dishanhai_item:item/sadbapycat_token')

DShanhaiItemTooltipAPI.register('dishanhai:sadbapycat_token', [
    '{golden}SadBapyCat 代币{/}',
    '{bodySilver}一只悲伤小猫遗留的纪念币，没有实际价值{/}',
    '{bodySilver}但谁又忍心丢弃它呢？{/}',
])




    TooltipAPI.register("gt_shanhai:black_hole_containment", [
        '',
        '{ultimateRainbow}群星并非永恒，连光也会在足够深的引力井中沉默',
        '{golden}以事件视界之伟力，将物质奇点压缩到无限小的体积',
        '{sakura}BHC不是为了制造毁灭，而是为了把毁灭驯服成工具',
        '{lava}它以时空流体维持边界，以中子结构束缚坍缩，以事件视界作为最极端的加工面',

    ]);


    // ===== 七十二变物品注册 =====
    TooltipAPI.register('dishanhai:wanxiang_core', [
        '{electric}七十二变·万象心法核心',
        '{golden}天地万物，皆可一变化之。得此心法者，',
        '{magic}可观万象流转，通造化之机。',
        '{nature}然变化之道，非为掠夺，而为理解。',
        '{electric}——理解万物的本质，方能改变万物的形态。',
    ]);;



})//物品注册回调内

// ===== 流体注册 =====
StartupEvents.registry('fluid', function(event) {

    event.create("dishanhai:zero_point_energy")
        .stillTexture("dishanhai_item:block/fluid/zero_point_energy")
        .flowingTexture("dishanhai_item:block/fluid/zero_point_energy_flow")
        .displayName("真空零点能").temperature(8000).luminosity(15).bucketColor(0x88ddff)
        .density(10).viscosity(5);
    event.create("dishanhai:light")
        .stillTexture("dishanhai_item:block/fluid/light_fluid")
        .flowingTexture("dishanhai_item:block/fluid/light_fluid_flow")
        .displayName("光").temperature(0).luminosity(15).bucketColor(0xffffdd)
        .density(1).viscosity(1);
    event.create("dishanhai:liquid_ending")
        .stillTexture("dishanhai_item:block/fluid/liquid_ending")
        .flowingTexture("dishanhai_item:block/fluid/liquid_ending_flow")
        .displayName("液态终末").temperature(5000).luminosity(15).bucketColor(0x440011)
        .density(2200).viscosity(1800);

    event.create("dishanhai:matter_fluid_entry")
        .stillTexture("dishanhai_item:block/fluid/matter_fluid_entry")
        .flowingTexture("dishanhai_item:block/fluid/matter_fluid_entry")
        .displayName("入门物质流").temperature(300).luminosity(3).bucketColor(0x66bb88)
        .density(800).viscosity(600);
    event.create("dishanhai:matter_fluid_foundation")
        .stillTexture("dishanhai_item:block/fluid/matter_fluid_foundation")
        .flowingTexture("dishanhai_item:block/fluid/matter_fluid_foundation")
        .displayName("基础物质流").temperature(400).luminosity(4).bucketColor(5622920)
        .density(900).viscosity(700);
    event.create("dishanhai:matter_fluid_basic")
        .stillTexture("dishanhai_item:block/fluid/matter_fluid_basic")
        .flowingTexture("dishanhai_item:block/fluid/matter_fluid_basic_flow")
        .displayName("推演物质流").temperature(600).luminosity(4).bucketColor(0x44aadd)
        .density(1200).viscosity(800);
    event.create("dishanhai:matter_fluid_virtual")
        .stillTexture("dishanhai_item:block/fluid/matter_fluid_virtual")
        .flowingTexture("dishanhai_item:block/fluid/matter_fluid_virtual_flow")
        .displayName("虚像物质流").temperature(800).luminosity(5).bucketColor(18290)
        .density(1100).viscosity(800);
    event.create("dishanhai:matter_fluid_transmutation")
        .stillTexture("dishanhai_item:block/fluid/matter_fluid_transmutation")
        .flowingTexture("dishanhai_item:block/fluid/matter_fluid_transmutation")
        .displayName("嬗变物质流").temperature(700).luminosity(5).bucketColor(14509619)
        .density(1300).viscosity(900);
    event.create("dishanhai:matter_fluid_darkstar")
        .stillTexture("dishanhai_item:block/fluid/matter_fluid_darkstar")
        .flowingTexture("dishanhai_item:block/fluid/matter_fluid_darkstar_flow")
        .displayName("暗星物质流").temperature(1100).luminosity(7).bucketColor(4208660)
        .density(2000).viscosity(1500);
    event.create("dishanhai:matter_fluid_advanced")
        .stillTexture("dishanhai_item:block/fluid/matter_fluid_advanced")
        .flowingTexture("dishanhai_item:block/fluid/matter_fluid_advanced_flow")
        .displayName("重组物质流").temperature(1000).luminosity(6).bucketColor(0xdd8844)
        .density(1500).viscosity(1000);
    event.create("dishanhai:matter_fluid_transition")
        .stillTexture("dishanhai_item:block/fluid/matter_fluid_transition")
        .flowingTexture("dishanhai_item:block/fluid/matter_fluid_transition_flow")
        .displayName("虚数跃迁物质流").temperature(1400).luminosity(8).bucketColor(0x8c3cd0)
        .density(1800).viscosity(1200);
    event.create("dishanhai:matter_fluid_zero")
        .stillTexture("dishanhai_item:block/fluid/matter_fluid_zero")
        .flowingTexture("dishanhai_item:block/fluid/matter_fluid_zero")
        .displayName("归零物质流").temperature(1500).luminosity(8).bucketColor(8930474)
        .density(2500).viscosity(1800);
    event.create("dishanhai:matter_fluid_ascension")
        .stillTexture("dishanhai_item:block/fluid/matter_fluid_ascension")
        .flowingTexture("dishanhai_item:block/fluid/matter_fluid_ascension")
        .displayName("升维物质流").temperature(2000).luminosity(9).bucketColor(3377390)
        .density(3000).viscosity(2000);
    event.create("dishanhai:matter_fluid_transcend")
        .stillTexture("dishanhai_item:block/fluid/matter_fluid_transcend")
        .flowingTexture("dishanhai_item:block/fluid/matter_fluid_transcend")
        .displayName("超限物质流").temperature(3000).luminosity(11).bucketColor(15610709)
        .density(4000).viscosity(3000);
    event.create("dishanhai:matter_fluid_peak")
        .stillTexture("dishanhai_item:block/fluid/matter_fluid_peak")
        .flowingTexture("dishanhai_item:block/fluid/matter_fluid_peak_flow")
        .displayName("巅峰物质流").temperature(1700).luminosity(9).bucketColor(11184640)
        .density(3500).viscosity(2500);
    event.create("dishanhai:matter_fluid_eternal")
        .stillTexture("dishanhai_item:block/fluid/matter_fluid_eternal")
        .flowingTexture("dishanhai_item:block/fluid/matter_fluid_eternal")
        .displayName("永恒物质流").temperature(5000).luminosity(13).bucketColor(13412915)
        .density(6000).viscosity(5000);
    event.create("dishanhai:matter_fluid_ultimate")
        .stillTexture("dishanhai_item:block/fluid/matter_fluid_ultimate")
        .flowingTexture("dishanhai_item:block/fluid/matter_fluid_ultimate_flow")
        .displayName("创造物质流").temperature(2000).luminosity(10).bucketColor(0xaa44dd)
        .density(2000).viscosity(1400);

    event.create("dishanhai:primal_chaos")
        .stillTexture("dishanhai_item:block/fluid/primal_chaos")
        .flowingTexture("dishanhai_item:block/fluid/primal_chaos_flow")
        .displayName("原初混沌").temperature(100).luminosity(3).bucketColor(0x332255)
        .density(3000).viscosity(2500);

    event.create("dishanhai:dimensional_fabric")
        .stillTexture("dishanhai_item:block/fluid/dimensional_fabric")
        .flowingTexture("dishanhai_item:block/fluid/dimensional_fabric_flow")
        .displayName("维度织构").temperature(3000).luminosity(10).bucketColor(0x88bbff)
        .density(1800).viscosity(1400);

    event.create("dishanhai:causal_essence")
        .stillTexture("dishanhai_item:block/fluid/causal_essence")
        .flowingTexture("dishanhai_item:block/fluid/causal_essence_flow")
        .displayName("因果精髓").temperature(2000).luminosity(8).bucketColor(0xffaa44)
        .density(2200).viscosity(1800);

    event.create("dishanhai:stabilized_eternity")
        .stillTexture("dishanhai_item:block/fluid/stabilized_eternity")
        .flowingTexture("dishanhai_item:block/fluid/stabilized_eternity_flow")
        .displayName("稳态永恒").temperature(6000).luminosity(12).bucketColor(0xeeeeff)
        .density(2800).viscosity(2200);

    event.create("dishanhai:chaos_fluid")
        .stillTexture("dishanhai_item:block/fluid/chaos_fluid")
        .flowingTexture("dishanhai_item:block/fluid/chaos_fluid_flow")
        .displayName("永恒混沌").temperature(9999).luminosity(15).bucketColor(0x442266)
        .density(3000).viscosity(3000);

    // ===== 世线光刻催化剂（电路增产·方案B） =====
    event.create("dishanhai:wl_catalyst")
        .stillTexture("dishanhai_item:block/fluid/wl_catalyst")
        .flowingTexture("dishanhai_item:block/fluid/wl_catalyst")
        .displayName("世线光刻催化剂").temperature(800).luminosity(7).bucketColor(0xffcc44)
        .density(1600).viscosity(900);

    // ===== 寰宇联合冷却液 =====
    event.create("dishanhai:universal_coolant")
        .stillTexture("dishanhai_item:block/fluid/universal_coolant")
        .flowingTexture("dishanhai_item:block/fluid/universal_coolant_flow")
        .displayName("寰宇联合冷却液").temperature(0).luminosity(2).bucketColor(0x00aadd)
        .density(1100).viscosity(800);

    // ===== 黑洞时空流体 =====
    event.create("dishanhai:spacetime")
        .stillTexture("dishanhai_item:block/fluid/spacetime")
        .flowingTexture("dishanhai_item:block/fluid/spacetime_flow")
        .displayName("时空流体").temperature(0).luminosity(7).bucketColor(0x1a0a2e)
        .density(5000).viscosity(4000);

    console.log('[山海私货] 流体注册完毕: 13 fluid');
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
console.log('[山海] DShanhaiFluidTooltipAPI 类型: ' + (typeof DShanhaiFluidTooltipAPI) + ', register: ' + (typeof DShanhaiFluidTooltipAPI !== 'undefined' ? typeof DShanhaiFluidTooltipAPI.register : 'N/A'));
try {
    if (typeof DShanhaiFluidTooltipAPI !== 'undefined' && typeof DShanhaiFluidTooltipAPI.register === 'function') {
        DShanhaiFluidTooltipAPI.register("dishanhai:primal_chaos", [
            "世线的起点与终点，皆归于{aurora}混沌{/}。",
            "它并非无序——而是超越有序与无序的{magic}原初状态{/}。",
            "{bodySilver}在这片混沌中，第一条世线开始振动……{/}"
        ]);
        DShanhaiFluidTooltipAPI.register("dishanhai:dimensional_fabric", [
            "{water}维度织构{/}——现实之布，由平行宇宙的经纬交织而成。",
            "{bodySilver}每一根纤维都是一条完整的因果链。{/}",
            "{bodySilver}跨世线传送的本质，不过是顺着织物的纹理走了一步。{/}"
        ]);
        DShanhaiFluidTooltipAPI.register("dishanhai:causal_essence", [
            "{golden}因果精髓{/}——七十二变的底层逻辑。",
            "{bodySilver}它定义了{/}{fire}变化{/}{bodySilver}之所以可能的边界条件。{/}",
            "{bodySilver}每一滴精髓都承载着一条未被观测的因果分支。{/}"
        ]);
        DShanhaiFluidTooltipAPI.register("dishanhai:stabilized_eternity", [
            "{neon}稳态永恒{/}——在创造与毁灭之间找到的平衡点。",
            "{bodySilver}它不是静止，而是共振的完美相位。{/}",
            "{bodySilver}创造模块以此为基础，将短暂脉冲转化为持续存在。{/}"
        ]);

        // === 原有 7 流体 ===
        DShanhaiFluidTooltipAPI.register("dishanhai:zero_point_energy", [
            "{aurora}真空零点能{/}——量子真空涨落的残余能量。",
            "{bodySilver}即使在绝对零度的真空中，能量也从未真正归零。{/}",
            "{bodySilver}它无处不在。它取之不尽。它沉默地等待着被唤醒。{/}"
        ]);
        DShanhaiFluidTooltipAPI.register("dishanhai:liquid_ending", [
            "{sunset}液态终末{/}——终末之环的流体形态。",
            "{bodySilver}它记录了所有现实的终局——不是毁灭，而是完成。{/}",
            "{bodySilver}每一滴都是一条时间线的最终页码。{/}"
        ]);
        DShanhaiFluidTooltipAPI.register("dishanhai:matter_fluid_entry", [
            "{neon}入门物质流{/}——物质流体系的起点。",
            "{bodySilver}最基础的物质能量载体，连并行都还未学会提速——{/}",
            "{bodySilver}但它承载着一切可能的开端。{/}"
        ]);

        DShanhaiFluidTooltipAPI.register("dishanhai:matter_fluid_foundation", [
            "{neon}基础物质流{/}——入门之后的第一步。",
            "{bodySilver}粒子开始学会排队，并行不再是偶然。{/}"
        ]);
        DShanhaiFluidTooltipAPI.register("dishanhai:matter_fluid_transmutation", [
            "{fire}嬗变物质流{/}——元素的蜕变之河。",
            "{bodySilver}它加速核外电子的跃迁，让物质在原子层面重组。{/}"
        ]);
        DShanhaiFluidTooltipAPI.register("dishanhai:matter_fluid_zero", [
            "{magic}归零物质流{/}——归于零态，再启新生。",
            "{bodySilver}将一切推演归零后在更高速率上重建并行架构。{/}"
        ]);
        DShanhaiFluidTooltipAPI.register("dishanhai:matter_fluid_ascension", [
            "{water}升维物质流{/}——维度夹缝中的流体态。",
            "{bodySilver}在更高的维度上寻找新的并行空间。{/}"
        ]);
        DShanhaiFluidTooltipAPI.register("dishanhai:matter_fluid_transcend", [
            "{crimson}超限物质流{/}——突破一切界限的终极载体。",
            "{bodySilver}它不遵守并行上限——因为上限已被它抛在身后。{/}"
        ]);
        DShanhaiFluidTooltipAPI.register("dishanhai:matter_fluid_eternal", [
            "{golden}永恒物质流{/}——时间的流体形态。",
            "{bodySilver}它让并行不再是空间的概念，而是{/}{ultimateRainbow}存在本身{/}{bodySilver}。{/}"
        ]);
        DShanhaiFluidTooltipAPI.register("dishanhai:matter_fluid_basic", [
            "{water}初级物质流{/}——物质重组的基础载体。",
            "{bodySilver}它携带着最基础的分子指令，足以重新排列常见元素。{/}"
        ]);
        DShanhaiFluidTooltipAPI.register("dishanhai:matter_fluid_advanced", [
            "{fire}高级物质流{/}——掺杂了naquadah的活性流体。",
            "{bodySilver}它能在分子层面执行更复杂的重组指令，触及亚原子结构。{/}"
        ]);
        DShanhaiFluidTooltipAPI.register("dishanhai:matter_fluid_transition", [
            "{magic}虚数跃迁物质流{/}——介于实数与虚数之间的过渡态。",
            "{bodySilver}它不遵守泡利不相容原理，同一点可叠加任意体积。{/}"
        ]);
        DShanhaiFluidTooltipAPI.register("dishanhai:matter_fluid_ultimate", [
            "{neon}终极物质流{/}——混合了时空与磁物质的终极媒介。",
            "{bodySilver}它可以同时存在于多个坐标，是真正的高维流体。{/}"
        ]);
        DShanhaiFluidTooltipAPI.register("dishanhai:matter_fluid_creative", [
            "{ultimateRainbow}创造物质流{/}——物质流系统的顶点。",
            "{bodySilver}它不受任何物理定律约束——给它一个配方，它就能创造。{/}",
            "{bodySilver}\"Cada vez que o \"módulo de modificação da realidade\" é executado, ele reescreve as regras nos bastidores.{/}"
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
        console.log('[山海] 13 流体 tooltip 已注册');
    }
} catch(e) {
    console.warn('[山海] 流体 tooltip 注册失败: ' + (e.message || e));
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
    'ae2:portable_item_cell_1k': ', tag: {RepairCost:0,amts:[L;1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L],display:{Name:\'{"text":"Kit de ferramentas infinito"}\'},ic:31L,internalCurrentPower:20000.0d,keys:[{"#c":"ae2:i",id:"avaritia:infinity_boots"},{"#c":"ae2:i",id:"avaritia:crystal_pickaxe"},{"#c":"ae2:i",id:"avaritia:infinity_helmet"},{"#c":"ae2:i",id:"avaritia:infinity_bucket"},{"#c":"ae2:i",id:"expatternprovider:infinity_cell",tag:{record:{"#c":"ae2:i",id:"fragile_tool:fragile_hammer"}}},{"#c":"ae2:i",id:"avaritia:infinity_bow"},{"#c":"ae2:i",id:"expatternprovider:infinity_cell",tag:{record:{"#c":"ae2:i",id:"fragile_tool:fragile_wire_cutter"}}},{"#c":"ae2:i",id:"expatternprovider:infinity_cell",tag:{record:{"#c":"ae2:i",id:"fragile_tool:fragile_crowbar"}}},{"#c":"ae2:i",id:"expatternprovider:infinity_cell",tag:{record:{"#c":"ae2:i",id:"fragile_tool:fragile_knife"}}},{"#c":"ae2:i",id:"expatternprovider:infinity_cell",tag:{record:{"#c":"ae2:i",id:"fragile_tool:fragile_wrench"}}},{"#c":"ae2:i",id:"avaritia:infinity_hoe"},{"#c":"ae2:i",id:"sophisticatedbackpacks:everlasting_upgrade"},{"#c":"ae2:i",id:"sophisticatedbackpacks:xp_pump_upgrade",tag:{direction:"keep",enabled:1b,level:30}},{"#c":"ae2:i",id:"avaritia:infinity_pants"},{"#c":"ae2:i",id:"avaritia:skull_fire_sword",tag:{Damage:0}},{"#c":"ae2:i",id:"avaritia:infinity_axe"},{"#c":"ae2:i",id:"expatternprovider:infinity_cell",tag:{record:{"#c":"ae2:i",id:"fragile_tool:fragile_mortar"}}},{"#c":"ae2:i",id:"sophisticatedbackpacks:tank_upgrade",tag:{contents:{Amount:0,FluidName:"minecraft:empty"}}},{"#c":"ae2:i",id:"expatternprovider:infinity_cell",tag:{record:{"#c":"ae2:i",id:"fragile_tool:fragile_file"}}},{"#c":"ae2:i",id:"sophisticatedbackpacks:advanced_void_upgrade"},{"#c":"ae2:i",id:"avaritia:infinity_pickaxe"},{"#c":"ae2:i",id:"avaritia:infinity_totem",tag:{Damage:0}},{"#c":"ae2:i",id:"sophisticatedbackpacks:advanced_refill_upgrade",tag:{filters:{Items:[],Size:12},targetSlots:{}}},{"#c":"ae2:i",id:"sophisticatedbackpacks:stack_upgrade_omega_tier"},{"#c":"ae2:i",id:"sophisticatedbackpacks:inception_upgrade"},{"#c":"ae2:i",id:"expatternprovider:infinity_cell",tag:{record:{"#c":"ae2:i",id:"fragile_tool:fragile_screwdriver"}}},{"#c":"ae2:i",id:"avaritia:infinity_shovel"},{"#c":"ae2:i",id:"avaritia:infinity_sword"},{"#c":"ae2:i",id:"expatternprovider:infinity_cell",tag:{record:{"#c":"ae2:i",id:"fragile_tool:fragile_saw"}}},{"#c":"ae2:i",id:"avaritia:infinity_chestplate"},{"#c":"ae2:i",id:"expatternprovider:infinity_cell",tag:{record:{"#c":"ae2:i",id:"fragile_tool:fragile_mallet"}}}]}',
    "ae2wtlib:wireless_universal_terminal": ',tag:{accessPoint:{dimension:"minecraft:overworld",pos:[I;6,68,6]},blankPattern:[{Count:64b,Slot:0,id:"ae2:blank_pattern"}],craft_if_missing:1b,crafting:1b,craftingGrid:[{Count:1b,Slot:4,id:"ae2:fluix_axe",tag:{Damage:0}}],currentTerminal:"crafting",encodedInputs:[{"#":4L,"#c":"ae2:i",id:"minecraft:beef"},{"#":4L,"#c":"ae2:i",id:"minecraft:bone"},{"#":4L,"#c":"ae2:i",id:"minecraft:leather"},{"#":1000L,"#c":"ae2:f",id:"gtceu:milk"}],encodedOutputs:[{"#":1L,"#c":"ae2:i",id:"minecraft:cow_spawn_egg"}],ex_pattern_access:1b,filter_type:"ALL",internalCurrentPower:4800000.0d,internalMaxPower:4800000.0d,magnet_settings:1b,mode:"PROCESSING",pattern_encoding:1b,pick_block:1b,restock:0b,show_pattern_providers:"NOT_FULL",singularity:[{Count:1b,Slot:0,id:"ae2:quantum_entangled_singularity",tag:{freq:177365839983100L}}],sort_by:"AMOUNT",sort_direction:"DESCENDING",stonecuttingRecipeId:"minecraft:kjs/mae2_pattern_p2p_tunnel",substitute:1b,substituteFluids:1b,upgrades:[{Count:1b,Slot:0,id:"ae2wtlib:quantum_bridge_card"},{Count:1b,Slot:1,id:"ae2wtlib:magnet_card"},{Count:1b,Slot:2,id:"ae2insertexportcard:insert_card",tag:{}},{Count:1b,Slot:3,id:"ae2insertexportcard:export_card",tag:{SelectedInventorySlots:[I;0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],filterConfig:[{"#":0L,"#c":"ae2:i",id:"gtladditions:astral_array"}],upgrades:[{Count:1b,Slot:0,id:"ae2:speed_card"}]}}],view_mode:"ALL"}',
};

// 无限单元格模板（供 NBT 构建使用）
function _infinityCell(innerId, type) {
    var itemType = type || 'i';
    if (innerId === 'gtceu:stellar_energy_rocket_fuel' || innerId === 'gtceu:hydrogen' || innerId === 'gtceu:helium') itemType = 'f';
    return ',"tag":{"record":{"#c":"ae2:' + itemType + '","id":"' + innerId + '"}}';
}

// 注册 NBT 到 Java 侧（供 DShanhaiPackRegistry.buildNBT 查询）
try { for (var _nbtKey in global.__shanhai_item_tags__) { DShanhaiNBTAPI.put(_nbtKey, global.__shanhai_item_tags__[_nbtKey]); } } catch(_e) {}

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
function _jeiNBTBuilder(itemList, displayName, lore) {
    try {
        var result = DShanhaiNBTAPI.buildAECellNBT(
            itemList,
            displayName || null,
            lore && lore.length > 0 ? lore : null
        );
        if (displayName === '超级AE包') {
            console.log('[山海NBT][STARTUP] len=' + result.length + ' items=' + itemList.length);
        }
        return result;
    } catch(e) {
        console.error('[山海NBT] 构建失败: ' + e);
        return '';
    }
}

// ========== 超级AE包 ==========
var superAEItems = [
    '1x constructionwand:infinity_wand','16777216x expatternprovider:ex_pattern_provider','1x gtceu:echoite_vajra','4x expatternprovider:ex_pattern_access_part','16777216x expatternprovider:ex_import_bus_part','16777216x expatternprovider:ex_export_bus_part','10x ironfurnaces:unobtainium_furnace','16x expatternprovider:ex_drive','1x mekanism:mekasuit_helmet','1x mekanism:mekasuit_bodyarmor','1x mekanism:mekasuit_pants','1x mekanism:mekasuit_boots','3x ae2:quantum_entangled_singularity','1x gtmadvancedhatch:net_data_stick','1x ae2:portable_item_cell_1k','1x gtmadvancedhatch:adaptive_net_energy_terminal','16777216x gtmadvancedhatch:adaptive_net_laser_source_hatch','16777216x gtmadvancedhatch:adaptive_net_energy_output_hatch','1x ae2wtlib:wireless_universal_terminal','16777216x expatternprovider:wireless_connect','4x ae2:pattern_encoding_terminal','16777216x gtceu:me_input_hatch','16777216x ae2:capacity_card','1x ae2:wireless_access_point','4x minecraft:flint_and_steel','1x sov:spear_of_void','100x avaritia:star_fuel','1x ironfurnaces:augment_generator','16777216x ae2:fuzzy_card','16777216x minecraft:orange_dye',
    '16777216x minecraft:light_gray_dye','16777216x minecraft:light_blue_dye','16777216x ae2:void_card','16777216x minecraft:gray_dye','16777216x ae2:basic_card','16777216x ae2:equal_distribution_card','16777216x minecraft:magenta_dye','16777216x ae2:crafting_card','16777216x ae2:inverter_card','16777216x ae2:speed_card','32x ae2:creative_energy_cell','16777216x ae2:quantum_link','16777216x ae2:quantum_ring','16777216x gtceu:me_input_bus','16777216x expatternprovider:assembler_matrix_glass','16777216x ae2:crafting_terminal','16777216x expatternprovider:ex_interface','16777216x ae2:fluix_smart_cable','16777216x ae2:fluix_glass_cable','16777216x ae2:fluix_covered_dense_cable','16777216x ae2:fluix_smart_dense_cable','16777216x ae2:blank_pattern','16777216x minecraft:pink_dye','16777216x minecraft:purple_dye','16777216x minecraft:red_dye','16777216x ae2:cable_anchor','16777216x ae2:redstone_card','16777216x ae2:logic_processor','16777216x ae2:calculation_processor','16777216x ae2:engineering_processor',
    '16777216x minecraft:black_dye','16777216x minecraft:yellow_dye','16777216x minecraft:green_dye','16777216x minecraft:blue_dye','16777216x minecraft:lime_dye','16777216x ae2:advanced_card','16777216x minecraft:cyan_dye','16777216x minecraft:white_dye','16777216x ae2:quartz_fiber','16777216x expatternprovider:ex_io_port','16777216x ae2:level_emitter','16777216x ae2:toggle_bus','16777216x gtladditions:infinity_input_dual_hatch','16777216x gtladditions:me_super_pattern_buffer','16777216x gtladditions:me_super_pattern_buffer_proxy','16777216x gtceu:uv_dual_output_hatch','16777216x gtceu:uv_dual_input_hatch','16777216x gtceu:me_extended_export_buffer','16777216x gtceu:me_extended_async_export_buffer','16777216x gtceu:tag_filter_me_stock_bus_part_machine','16777216x gtceu:me_dual_hatch_stock_part_machine','1024x extendedae_plus:1024x_crafting_accelerator','16777216x extendedae_plus:labeled_wireless_transceiver','16777216x merequester:requester','16777216x extendedae_plus:wireless_transceiver','16777216x extendedae_plus:channel_card',
    '16777216x expatternprovider:ex_interface_part','16777216x expatternprovider:ex_pattern_provider_part','16777216x expatternprovider:tag_storage_bus','16777216x ae2:storage_bus','16777216x ae2_toggleable_view_cell:toggleable_view_cell','16777216x ae2:fluix_covered_cable','16777216x gtmadvancedhatch:adaptive_net_energy_input_hatch','16777216x gtmadvancedhatch:adaptive_net_laser_target_hatch','16777216x ae2:energy_card','4x extendedae_plus:infinity_biginteger_cell','4x merequester:requester_terminal','16777216x extendedae_plus:virtual_crafting_card','1x gtlcore:fast_infinity_cell','4x gtlcore:debug_pattern_test','4x gtlcore:pattern_modifier','4x expatternprovider:pattern_modifier','4x gtlcore:me_pattern_buffer_cut','4x gtlcore:me_pattern_buffer_copy','32x gtlcore:max_storage','32x mae2:256x_crafting_accelerator','4x expatternprovider:wireless_tool','16777216x travelanchors:travel_anchor','4x travelanchors:travel_staff','16777216x gtladditions:wireless_energy_network_input_terminal','16777216x gtladditions:wireless_energy_network_output_terminal','16777216x aewireless:wireless_transceiver','10000000x ae2:fluix_crystal','10240000x ae2:certus_quartz_crystal','10240000x ae2:charged_certus_quartz_crystal','10240000x ae2:certus_quartz_dust',
    '10240000x gtceu:certus_quartz_dust','10240000x gtceu:certus_quartz_gem','1x sophisticatedbackpacks:netherite_backpack','1x fluxnetworks:flux_controller','1024000x fluxnetworks:flux_point','1024000x fluxnetworks:flux_plug','1x gtceu:molecular_assembler_matrix','1x gtceu:me_molecular_assembler_io','70x gtlcore:advanced_assembly_line_unit','320x gtlcore:iridium_casing','80x gtlcore:hyper_mechanical_casing','84x gtlcore:molecular_casing','20x gtceu:hsse_frame','56x gtceu:naquadah_alloy_frame','78x gtceu:trinium_frame','36x gtceu:europium_frame','306x gtceu:high_power_casing','48x gtceu:advanced_computer_casing','36x gtceu:fusion_glass','104x gtceu:superconducting_coil','17x gtceu:assembly_line_casing','32x gtceu:assembly_line_grating','90x gtceu:large_scale_assembler_casing','1x gtlcore:ultimate_terminal','10240000x gtmadvancedhatch:max_configurable_dual_hatch_input_16p','5x gtceu:me_craft_speed_core','20x gtceu:me_craft_pattern_container','64x gtceu:me_craft_parallel_core','1x ae2wtlib:magnet_card','1x ae2_ftbquest_detector:me_quests_detector','1x useless_mod:endless_beaf_item','16777216x ae2cs:ender_emitter',"2x ae2cs:ender_linker","16777216x ae2cs:ender_broadcaster"
];

// 预排序，确保跨端一致（JEI/recipe 数组顺序始终相同）
superAEItems.sort();

var superAELore = [
    '§7包含所有AE2、GTCEu和相关模组的顶级物品',
    '§7物品种类: §e%count%§7 种',
    '§7每个物品都经过优化配置（满模块、满电力、满升级）',
    '§7包含无线终端、量子纠缠、分子装配矩阵等',
    '§8山海私货 v2.2'
];

// ========== 天基大礼包 ==========
var skyBaseItems = [
    '1x gtladditions:space_infinity_integrated_ore_processor','426x gtlcore:power_module_7','6364x gtlcore:space_elevator_support','354x gtlcore:iridium_casing','2020x gtlcore:space_elevator_mechanical_casing','2x gtceu:infinity_frame','788x kubejs:space_elevator_internal_support','7347x kubejs:high_strength_concrete','1x kubejs:dimensional_bridge_casing','1x expatternprovider:infinity_cell@gtceu:stellar_energy_rocket_fuel'
];

// ========== 猪咪大礼包 ==========
var piggyItems = [
    '1x dishanhai:piggy','1x gtladditions:forge_of_the_antichrist','397x gtladditions:central_graviton_flow_regulator','357x gtladditions:mediary_graviton_flow_regulator','345x gtladditions:remote_graviton_flow_regulator','11008x gtladditions:suprachronal_magnetic_confinement_casing','6566x gtladditions:god_forge_trim_casing','162x gtladditions:god_forge_support_casing','824x gtladditions:god_forge_inner_casing','155x gtladditions:spatially_transcendent_gravitational_lens','1x expatternprovider:infinity_cell@gtceu:hydrogen','1x expatternprovider:infinity_cell@gtceu:helium',
    '2x gtladditions:arcanic_astrograph','1068x gtlcore:dimension_injection_casing','1792x gtlcore:create_casing','66x gtceu:high_power_casing','336x kubejs:dimension_creation_casing','96x kubejs:dimensional_stability_casing','276x kubejs:spacetime_compression_field_generator','100x gtladditions:phonon_conduit','420x gtladditions:suprachronal_magnetic_confinement_casing','720x gtladditions:god_forge_trim_casing','500x gtladditions:god_forge_support_casing','56x gtladditions:god_forge_energy_casing','1x gtladditions:heliophase_leyline_crystallizer','3x gtladditions:heliothermal_plasma_fabricator','10x gtladditions:heliofusion_exoticizer','2x gtladditions:heliofluix_melting_core','4x gtladditions:helioflare_power_forge',
    '1x gtladditions:apocalyptic_torsion_quantum_matrix','864x gtladditions:quantum_glass','11520x gtlcore:qft_coil','216x gtlcore:spacetimecontinuumripper','10927x gtlcore:dimensionally_transcendent_casing','6285x gtlcore:manipulator','841x kubejs:dimensional_bridge_casing',
    '4x gtladditions:thread_modifier_hatch','1x gtladditions:macro_atomic_resonant_fragment_stripper','4230x gtlcore:qft_coil','1718x gtlcore:sps_casing','5507x gtlcore:hyper_mechanical_casing','937x gtlcore:echo_casing','218x gtlcore:fusion_casing_mk5','360x gtceu:quantumchromodynamically_confined_matter_frame','786x gtceu:neutronium_frame','627x gtceu:high_power_casing','1086x gtceu:fusion_glass','344x kubejs:eternity_coil_block','156x kubejs:dyson_receiver_casing','666x kubejs:dyson_control_toroid','66x kubejs:dyson_control_casing','8x kubejs:dimensional_stability_casing','162x kubejs:dimensional_bridge_casing','24x kubejs:annihilate_core',
    '1x gtladditions:light_hunter_space_station','4643x gtladditions:gravity_stabilization_casing','1348x gtladditions:extreme_density_casing','208x gtlcore:ultimate_stellar_containment_casing','120x gtlcore:super_computation_component','27x gtlcore:hyper_core','9558x gtlcore:naquadah_alloy_casing','80x gtlcore:sps_casing','720x gtlcore:enhance_hyper_mechanical_casing','293x gtlcore:dragon_strength_tritanium_casing','666x gtlcore:echo_casing','4094x gtlcore:dimensionally_transcendent_casing','5884x gtlcore:dimension_injection_casing','224x gtlcore:molecular_casing','120x gtlcore:improved_superconductor_coil','176x gtlcore:fusion_casing_mk5','64x gtlcore:fusion_casing_mk4','2400x gtlcore:uxv_hermetic_casing','1073x ae2:quartz_vibrant_glass','560x gtceu:neutronium_frame','454x gtceu:high_power_casing','230x gtceu:computer_heat_vent','258x gtceu:advanced_computer_casing','3528x gtceu:fusion_glass','144x gtceu:uhv_ultimate_battery','1029x gtceu:uxv_machine_casing','180x gtceu:uiv_machine_casing','2528x gtceu:uhv_machine_casing','3651x gtceu:atomic_casing','1440x kubejs:restraint_device','280x kubejs:containment_field_generator','1500x kubejs:spacetime_assembly_line_unit','12x kubejs:force_field_glass','20x kubejs:module_connector','1038x kubejs:dimensional_bridge_casing','34x kubejs:neutronium_pipe_casing'
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
DShanhaiPackRegistry.create("superAE", superAEItems, "Pacote Super AE", superAELore)
    .lock("v1.0")
    .build();

DShanhaiPackRegistry.create("skyBase", skyBaseItems, "Pacote de presente Tianji", [
    '§7这是一个天基大礼包',
    '§7物品种类: §e%count%§7 种',
    '§7包含天基op机器物品,无限星能元件盘已写入',
    '§8山海私货 v2.3'
])
    .lock("v1.0")
    .build();

DShanhaiPackRegistry.create("piggy", piggyItems, "Pacote de presente porquinho", [
    '§7这是一个猪咪大礼包,猪咪大王的馈赠',
    '§7它只被授予给猪咪们,所以你是猪咪吗',
    '§7物品种类: §e%count%§7 种',
    '§7由CellAPI生成,显示由JEIcellAPI生成',
    '§8山海私货V2.3'
])
    .lock("v1.0")
    .build();

// 兼容旧引用 — 保持 .nbt 属性访问
global.shanhaiPackDefs = {};
['superAE', 'skyBase', 'piggy'].forEach(function(id) {
    var p = DShanhaiPackRegistry.get(id);
    if (p) global.shanhaiPackDefs[id] = { nbt: p.nbt(), name: p.name, itemCount: p.typeCount() };
});

global._getItemTag = _getItemTag;

// JEI 兼容 — 委托 Java 侧 NBT 构建器
global.shanhaiJEINBTBuilder = function(items, name, lore) {
    try { return DShanhaiNBTAPI.buildAECellNBT(items, name || null, lore && lore.length > 0 ? lore : null); } catch(e) { return ''; }
};

console.log('[山海JEI包数据] 已加载 ' + Object.keys(global.shanhaiPackDefs).length + ' 个包定义');


})();
