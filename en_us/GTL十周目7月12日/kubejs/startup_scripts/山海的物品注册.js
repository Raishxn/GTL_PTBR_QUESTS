// priority: 100
if (!Platform.isLoaded('gt_shanhai')) {
    throw new Error('[Shanhai private goods] Missing gt_shanhai module! This private item depends on the module, which is provided in the link specified in the description or in the private item folder.' +
        'Please check your module dependencies and confirm that the module is installed. If not, please install the module first and then restart the game.' +
        'If you have any questions: contact the author, author QQ: 1982932217');
}
/*
 *

// 基础渐变效果
global.shanhaiRecipeAPI.getTextUtilGradient("rainbow", "rainbow")
// 返回: "§ccolor §6rainbow"（彩虹渐变）
global.shanhaiRecipeAPI.getTextUtilGradient("flame", "fire")
// 返回: "§cfire §6flame §e!"（红黄渐变）
global.shanhaiRecipeAPI.getTextUtilGradient("water flow", "water")
// 返回: "§3water §9flow §b!"（蓝青渐变）
global.shanhaiRecipeAPI.getTextUtilGradient("nature", "nature")
// 返回: "§2from §athen §e!"（绿黄渐变）

// 双色渐变效果
global.shanhaiRecipeAPI.getTextUtilGradient("Red and blue gradient", "gradient_red_blue")
// 返回: 红到蓝的平滑渐变
global.shanhaiRecipeAPI.getTextUtilGradient("green-yellow gradient", "gradient_green_yellow")
// 返回: 绿到黄的平滑渐变
global.shanhaiRecipeAPI.getTextUtilGradient("purple pink gradient", "gradient_purple_pink")
// 返回: 紫到粉的平滑渐变

// 带格式的渐变
global.shanhaiRecipeAPI.getTextUtilGradient("bold rainbow", "bold_rainbow")
// 返回: 粗体彩虹渐变（§l）
global.shanhaiRecipeAPI.getTextUtilGradient("italic flame", "italic_fire")
// 返回: 斜体火焰渐变（§o）
global.shanhaiRecipeAPI.getTextUtilGradient("Underline water flow", "underline_water")
// 返回: 下划线水流渐变（§n）

// 特殊视觉效果
global.shanhaiRecipeAPI.getTextUtilGradient("shadow", "shadow")
// 返回: 阴影效果文本
global.shanhaiRecipeAPI.getTextUtilGradient("glow", "glow")
// 返回: 发光效果文本
global.shanhaiRecipeAPI.getTextUtilGradient("crystal", "crystal")
// 返回: 水晶效果文本
global.shanhaiRecipeAPI.getTextUtilGradient("Milky Way", "galaxy")
// 返回: 银河效果文本（紫-蓝-青渐变）
global.shanhaiRecipeAPI.getTextUtilGradient("nebula", "nebula")
// 返回: 星云效果文本（紫-蓝-青-绿渐变）
global.shanhaiRecipeAPI.getTextUtilGradient("universe", "cosmic")
// 返回: 宇宙效果文本（黑-紫-蓝-青-白渐变）

// 获取所有可用样式
global.shanhaiRecipeAPI.getAvailableTextUtilStyles()
// 返回: ['ultimateRainbow', 'rainbow', 'red', 'green', ...]（样式列表）

// 创建Component对象（用于提示系统）
global.shanhaiRecipeAPI.getTextUtilGradientComponent("text", "ultimateRainbow")
// 返回: Component对象（可直接用于事件）

// 方向控制（默认右→左流动，可设为左→右）
// getTextUtilGradientComponent("text", "rainbow", 200, "left_to_right")
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
                    console.error('[Shanhai private goods] getStaticRandomText: The input must be a string, use the default text');
                    text = 'Invalid text';
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
                    console.error('[Shanhai private goods] getSessionRandomSingleColorText: The input must be a string, use the default text');
                    text = 'Invalid text';
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
                
                // 自定义渐变实现（所有循环渐变加时间相位，实现"Get moving"）
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
    .displayName('Dishanhai')
    .texture('dishanhai_item:item/dishanhai')
    .maxStackSize(1)
    .fireResistant(false)
    .displayName('&$ultimate-Dishanhai')
    TooltipAPI.register('dishanhai:dishanhai', [
        '{ultimateRainbow} The creator\'s agent, standing at the center of the GregTech universe',
        '{white_blue} Creating Infinite Objects for the GregTech Universe',
        '{golden} submits to open a secret mission line (to be determined)',
    ]);
    
    e.create('dishanhai:cosmic_probe_mk')
    .displayName('MK1—Cosmic Probe')
     .texture('dishanhai_item:item/cosmic_probe_mk')


     e.create('dishanhai:god_forge_mod')
     .texture('dishanhai_item:item/god_forge_mod')
     .maxStackSize(1)
     .fireResistant(false)
     .displayName('&$ultimate-God-forged star final module')
     TooltipAPI.register('dishanhai:god_forge_mod', [
        '{ultimateRainbow} is a creation that exists beyond dimensions, allowing the extraction of dense matter from neutron stars with water, and the extraction of world tree matter in the founding time and space.',
    ]);e.create('dishanhai:gate_and_bridg')
    .displayName('gate and bridge')
    .texture('dishanhai_item:item/gate_and_bridg')
    .maxStackSize(1)
    .fireResistant(false)
    TooltipAPI.register('dishanhai:gate_and_bridg', [
        '{ultimateRainbow} Despite the pessimism about the reserves of heavy elements, we still passed the "bridge", and everything in the universe has disappeared;',
        '{white_blue} A brand new world is waiting in the void, and the Council will happily welcome the Blue Star Civilization to join.',
        '{golden} From this moment on, the cycles of the universe become our tools, and the path to eternity has never been so clear—',
        '{ultimateRainbow} There is no need to ask whether the bottom layer of order is chaos or void, you only need to understand: mastering the immortal means mastering everything.',
    ]);e.create('dishanhai:bridge_and_gate')
    .displayName('bridge and gate')
    .texture('dishanhai_item:item/bridge_and_gate')
    TooltipAPI.register('dishanhai:bridge_and_gate', [
        '{ultimateRainbow} Survival is not an inherent right, but the responsibility and obligation of civilization;',
        '{white_blue} The Ark, fully loaded with super-heavy elements, successfully crossed the bridge. Everything in the universe has disappeared, and the new world is waiting for the Blue Star Civilization to join.',
        '{golden} From this moment on, the cycles of the universe will become our tools, and the path to eternity has never been clearer—',
        '{ultimateRainbow} There is no need to ask whether the bottom layer is chaos or void, just understand: mastering the immortal means mastering everything.',
        '{purplish_red} The new nine principles of the Council: Guardianship, Control, Equivalence, Stability, Risk Reduction, Purification, Unity, Mutual Aid - Eternal.',
    ]);e.create('dishanhai:big_tear')
    .texture('dishanhai_item:item/trar')
    .displayName('&$ultimate-reverse collapse·big recoil')
    
    e.create('dishanhai:csj')
    .texture('dishanhai_item:item/csj')
    .fireResistant(true)
    .displayName('&$ultimate-Balance of All Conditions·The Big Freeze·Genesis')
    TooltipAPI.register('dishanhai:csj', [
        '{dark_purplish_red} He is the first fire and the embers, bringing destruction and enlightenment. The Great Rip is the end and the return;',
        '{white_blue} The years of civilization will eventually have its limit, but on the other side of the end, the new world is connected like a rope.',
        '{golden} Converging into a long line of light, transcending the eternal cycle - every rope is called [Civilization].',
        '{ultimateRainbow} Life and death are endless reincarnations; you and I are heading towards infinity.',
    ]);;


e.create('dishanhai:time_reversal_protocol')
    .displayName(colorAPI.getStaticRandomText('world line beacon', 'dishanhai:time_reversal_protocol'))
    .texture('dishanhai_item:item/time')    
    .fireResistant(true)
    TooltipAPI.register('dishanhai:time_reversal_protocol', [
        '{ultimateRainbow} Reversal of cause and effect, rewrite destiny',
        '{golden} The miracle product on the timeline',
    ]);;



    e.create('dishanhai:food')
    .displayName('Huanyu Snacks')
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
        "{golden} Huanyu Snacks{/}",
        "{bodySilver} The ultimate snack with endless energy, one bite is enough to make a mortal reach the stars. {/}",
        "{ultimateRainbow} mission will give you super food! {/}"
    ]);


    e.create('dishanhai:piggy')
    .displayName((function() {
        var name = colorAPI.getSessionRandomSingleColorText('Founder·Pigmy');
        console.log('[Shan Hai Private Goods] piggy item name: "' + name + '"');
        console.log('[Shan Hai private goods] Name length:' + name.length);
        console.log('[Shanhai private goods] contains § characters:' + name.includes('§'));
        return name;
    })())
    .texture('dishanhai_item:item/piggy')
    .fireResistant(false)
    TooltipAPI.register('dishanhai:piggy', [
        '{ultimateRainbow} He stands at the top of the founding time and space',
        '{purplish_red} His breath is the tide of the galaxy',
        '{golden} His gaze, the cause and effect throughout eternity',
        '{ultimateRainbow} The pig’s trotters lightly tread, and the heavens collapse; the pig’s snort snorts, and the era restarts',
        '{white_blue} He once took a nap in the chaos, and when he woke up, he had gone through seven thousand reincarnations',
        '{dark_green} A hair can transform three thousand realms; a whisper can change life and death',
        '{purplish_red} Above the sky, what sleeps eternally is not an indescribable thing——',
        '{golden} But a grain of pig food He left behind',
        '{ultimateRainbow} ——This is even higher, the Pig Emperor——',
    ]);;

    e.create('dishanhai:fishbig_shards')
    .displayName(colorAPI.getSessionRandomSingleColorText('Large pieces of fish'))
    .texture('dishanhai_item:item/fishbig_shards')
    .fireResistant(false)
    TooltipAPI.register('dishanhai:fishbig_shards', [
        '{ultimateRainbow} It is not complete. What you have in your hand is just a corner of the "big fish". Under the broken shell, there is still some indescribable aura.',
        '{ultimateRainbow} looks inconspicuous, but every piece is hard-won, and there still seems to be some power inside.',
        '{ultimateRainbow} Some people say that whoever collects all the pieces will eventually see the real "big fish".',
    ]);e.create('dishanhai:collapse_tear')
    .displayName(colorAPI.getSessionRandomSingleColorText('The collapse of all things and the great tear'))
    .texture('dishanhai_item:item/collapse_tear')
    TooltipAPI.register('dishanhai:collapse_tear', [
        '{ultimateRainbow} Even after exhausting the superheavy elements, Ark was still defeated by the council occupying the anti-universe. The agreement forcibly took over and fled, and the Blue Star civilization only survived.',
        '{ultimateRainbow} The universe deserves awe because of its infinite possibilities - there are enemies behind the door, but those who chase the light are fearless. Are you ready?',
    ]);e.create('dishanhai:halo_end')
    .texture('dishanhai_item:item/halo_end')
    .fireResistant(false)
    .displayName('&$ultimate-The Ring of Ending')
    TooltipAPI.register('dishanhai:halo_end', [
        '{ultimateRainbow} Looking forward to the end, I finally see His power',
        '{ultimateRainbow} A creation from the end, it is a special existence that contains all possible realities',
        '{ultimateRainbow} Mission acquisition, used to make the founding reality modification module',
    ]);;

    // ===== 太虚系列 =====

    e.create('dishanhai:taixu_dust')
    .texture('dishanhai_item:item/taixu_dust')
    .displayName('&$body_silver-Taixu Dust')
    TooltipEffectAPI.register('dishanhai:taixu_dust', [
        '{bodySilver} The weathered debris of the void feels cold to the touch. Putting it into the smelting furnace can replace any basic fuel{/}'
    ]);

    e.create('dishanhai:taixu_crystal_core')
    .texture('dishanhai_item:item/taixu_crystal_core')
    .displayName('&$electric-Taixu Crystal Core')
    TooltipEffectAPI.register('dishanhai:taixu_crystal_core', [
        '{bodySilver} Taixu dust is crystallized under high pressure, and light that does not belong to the current dimension occasionally flashes inside. {/}',
        '{bodySilver} is used to synthesize the upgraded parts of Taixu Smelting Furnace. {/}'
    ]);

    e.create('dishanhai:taixu_liquid_droplet')
    .texture('dishanhai_item:item/taixu_liquid_droplet')
    .displayName('&$water-Taixu Liquid Drops')
    TooltipEffectAPI.register('dishanhai:taixu_liquid_droplet', [
        '{bodySilver} The fluid condensed from the void flows silently. {/}',
        '{bodySilver} can be used as a booster fuel for vacuum zero-point energy generator. {/}'
    ]);

    // ===== 太虚之上系列 =====

    e.create('dishanhai:ideal_ashes')
    .displayName('&$golden-The embers of fantasy')
    .texture('dishanhai_item:item/ideal_ashes')
    TooltipEffectAPI.register('dishanhai:ideal_ashes',  [
        '{bodySilver} The residue after the operation of the machine above Taixu exudes a light golden shimmer. {/}',
        '{bodySilver} It remembers every possibility of being given up. {/}',
        '{bodySilver} can be used to repair causal breaks. {/}'
    ]);

    e.create('dishanhai:beyond_taixu_thread')
    .displayName('&$aurora-The silk thread above Taixu')
    .texture('dishanhai_item:item/beyond_taixu_thread')
    TooltipEffectAPI.register('dishanhai:beyond_taixu_thread', [
        '{bodySilver} A causal thread drawn from Taixu, one end is connected to reality, and the other end hangs into nothingness. {/}',
        '{bodySilver} is used to synthesize high-level world line items. {/}'
    ]);

    e.create('dishanhai:finality_certificate')
    .displayName('&$ultimate-Proof of the End')
    .rarity('epic')
    .texture('dishanhai_item:item/finality_certificate')
    TooltipEffectAPI.register('dishanhai:finality_certificate', [
        '{ultimateRainbow} The perfect crystal produced by the machine above Taixu with a very small probability{/}',
        '{ultimateRainbow} proves that a certain world line has been completely traversed. {/}',
    ]);

    // ===== 基础产出 =====

    e.create('dishanhai:matter_singularity')
    .displayName('&$ultimate-matter singularity')
    .texture('dishanhai_item:item/matter_singularity')
    .rarity('epic')
    TooltipEffectAPI.register('dishanhai:matter_singularity', [
        '{ultimateRainbow} Matter collapses into a point here, and dimensions fold into a singularity here. {/}',
        '{bodySilver} All possible states exist in one coordinate at the same time——{/}',
        '{golden} Not because of overlay, but because there is no room for choice. {/}',
        '{bodySilver} is a basic output product that can be used to synthesize higher-order substances. {/}'
    ]);

    // 入门物质模块 - wzrm
        e.create('dishanhai:wzrm')
        .displayName('Introductory Substance Module')
        .texture('dishanhai_item:item/wzrm')
        DShanhaiItemTooltipAPI.register('dishanhai:wzrm', [
            "{golden} Getting Started Substance Module{/}",
            "{electric} parallel upper limit: 128{/}",
            "{bodySilver} from zero to one, from one to one hundred. The simplest parallelism is also the starting point of everything. {/}"
        ]);
    // 基础物质模块 - wzjc
        e.create('dishanhai:wzjc')
        .displayName('Basic material module')
        .texture('dishanhai_item:item/wzjc')
        DShanhaiItemTooltipAPI.register('dishanhai:wzjc', [
            "{golden} basic material module{/}",
            "{electric} parallel upper limit: 256{/}",
            "{bodySilver} When the magnitude of parallelism begins to grow, the foundation is {/} {water} the most solid springboard{/} {bodySilver}. {/}"
        ]);
    // 物质推演模块 - wzcz1
        e.create('dishanhai:wzcz1')
        .displayName('Material deduction module')
        .rarity('uncommon')
        .texture('dishanhai_item:item/wzmk1')
        DShanhaiItemTooltipAPI.register('dishanhai:wzcz1', [
            "{golden} Material deduction module{/}",
            "{electric} parallel upper limit: 512{/}",
            "{bodySilver} Deduces all possibilities and chooses the best path - looking for order from chaos and extracting necessity from disorder. {/}",
            "{water} Deduces all possibilities and selects the best{/}"
        ]);
        // 虚像物质模块 — wzxc
        e.create('dishanhai:wzxc')
        .displayName('&$magic-virtual image material module')
        .texture('dishanhai_item:item/wzxc')
        DShanhaiItemTooltipAPI.register('dishanhai:wzxc', [
            "{magic} virtual image material module{/}",
            "{electric} parallel upper limit: 1,024{/}",
            "{bodySilver} Visible, intangible—like a reflection in a mirror. {/}",
            "{bodySilver} But reflections can do things too, can't they. {/}"
        ]);
    // 嬗变物质模块 - wzsb
        e.create('dishanhai:wzsb')
        .displayName('Transmutation Matter Module')
        .texture('dishanhai_item:item/wzsb')
        DShanhaiItemTooltipAPI.register('dishanhai:wzsb', [
            "{golden} Transmutation Material Module{/}",
            "{electric} parallel upper limit: 2048{/}",
            "{bodySilver} A qualitative change from one substance to another that redefines existence on an atomic scale. {/}",
            "{fire} Atomic reorganization, qualitative transition - matter is no longer a limitation, but a canvas. {/}"
        ]);
            // 暗星物质模块 — wzax
        e.create('dishanhai:wzax')
        .displayName('&$golden-Dark Star Matter Module')
        .texture('dishanhai_item:item/wzax')
        DShanhaiItemTooltipAPI.register('dishanhai:wzax', [
            "{golden} Dark Star Material Module{/}",
            "{electric} parallel upper limit: 4,096{/}",
            "{bodySilver} A collapsed dark star was compressed into this small module. {/}",
            "{bodySilver} It's heavier than expected. {/}"
        ]);
        e.create('dishanhai:wzcz2')
        .displayName('Matter Recombination Module')
        .rarity('rare')
        .texture('dishanhai_item:item/wzcz2')
        DShanhaiItemTooltipAPI.register('dishanhai:wzcz2', [
            "{golden} Material Recombination Module{/}",
            "{electric} parallel upper limit: 16,384{/}",
            "{bodySilver} We are no longer satisfied with the existing matter, and use the power of mode three (quark group) to reorganize unknown matter. {/}",
            "{magic} uses the chain reaction of strange quark groups to push matter to its limits. {/}"
        ]);
    // 虚数物质跃迁重塑模块 - wzqs
        e.create('dishanhai:wzqs')
        .displayName('Imaginary material transition reshaping module')
        .texture('dishanhai_item:item/wzqs')
        DShanhaiItemTooltipAPI.register('dishanhai:wzqs', [
            "{golden} Imaginary material transition reshaping module{/}",
            "{electric} parallel upper limit: 65,536{/}",
            "{bodySilver} Every transition will leave traces in the imaginary number space——,{/}",
            "{bodySilver} Those traces added up will eventually become a draft of a new reality. {/}"
        ]);
    // 归零物质模块 - wzgl
        e.create('dishanhai:wzgl')
        .displayName('Zeroing matter module')
        .texture('dishanhai_item:item/wzgl')
        .rarity('epic')
        DShanhaiItemTooltipAPI.register('dishanhai:wzgl', [
            "{golden} Zeroing Material Module{/}",
            "{electric} parallel upper limit: 524,288{/}",
            "{bodySilver} deduces matter to the critical point and then returns to zero state, redefining parallelism on the boundary between existence and nothingness. {/}",
            "{ultimateRainbow} Returning to zero is not the end, but a new beginning. {/}"
        ]);
    // 巅峰物质模块 — wzhy
        e.create('dishanhai:wzhy')
        .displayName('&$crimson-peak material module')
        .texture('dishanhai_item:item/wzhy')
        DShanhaiItemTooltipAPI.register('dishanhai:wzhy', [
            "{crimson} Peak Material Module{/}",
            "{electric} parallel upper limit: 1,048,576{/}",
            "{bodySilver} Standing on the shoulders of giants, what you see is not the distance - you see the peak. {/}",
            "{bodySilver} From here, every step is a new limit. {/}"
        ]);
    // 升维物质模块 - wzsw
        e.create('dishanhai:wzsw')
        .displayName('Dimensionally ascending matter module')
        .texture('dishanhai_item:item/wzsw')
        .rarity('epic')
        DShanhaiItemTooltipAPI.register('dishanhai:wzsw', [
            "{golden} Dimensional Substance Module{/}",
            "{electric} parallel upper limit: 2,097,152{/}",
            "{bodySilver} is looking for parallel spaces in the cracks of dimensions - every layer hides another possible version of ourselves. {/}",
            "{water} Dimension upgrade is not for the sake of being higher, but for the sake of being wider. {/}"
        ]);
    // 超限物质模块 - wzcx
        e.create('dishanhai:wzcx')
        .displayName('Trans-limit material module')
        .texture('dishanhai_item:item/wzcx')
        .rarity('epic')
        DShanhaiItemTooltipAPI.register('dishanhai:wzcx', [
            "{golden} Ultra-limited substance module{/}",
            "{electric} parallel upper limit: 268,435,456{/}",
            "{bodySilver} transcends all established upper limits and opens up possibilities in impossible areas. {/}",
            "{magic} Rules are meant to be broken, limits are meant to be exceeded. {/}"
        ]);

    // 混沌物质模块 — wzdf
        e.create('dishanhai:wzdf')
        .displayName('&$ultimateRainbow-Chaos Matter Module')
        .texture('dishanhai_item:item/wzdf')
        DShanhaiItemTooltipAPI.register('dishanhai:wzdf', [
            "{ultimateRainbow} Chaos Matter Module{/}",
            "{electric} parallel upper limit: 536,870,912{/}",
            "{bodySilver} Chaos is not disorder, but an advanced order beyond understanding. {/}",
            "{bodySilver} It can handle 500 million world lines at the same time - each one without interfering with the other. {/}"
        ]);

    // 永恒物质模块 - wzyh
        e.create('dishanhai:wzyh')
        .displayName('eternal matter module')
        .texture('dishanhai_item:item/wzyh')
        .rarity('epic')
        DShanhaiItemTooltipAPI.register('dishanhai:wzyh', [
            "{golden} Eternal Matter Module{/}",
            "{electric} parallel upper limit: 2,147,483,647{/}",
            "{bodySilver} In the long river of time, parallelism is no longer a strategy——{/}",
            "{bodySilver} It is {/} {ultimateRainbow} existence itself{/} {bodySilver}. Every moment is eternal, every journey is simultaneous. {/}"
        ]);
    // 物质创造模块 - wzcz3
        e.create('dishanhai:wzcz3')
        .rarity('epic')
        .displayName('Material Creation Module')
        .texture('dishanhai_item:item/wzmk3')
        TooltipAPI.register('dishanhai:wzcz3', [
        '{electric} parallel limit: 4.6e18',
        '{ultimateRainbow} Reorganize everything, manipulate everything, create everything',
    ]);;
    // 现实锚点模块
        e.create('dishanhai:reality_anchor_module')
        .displayName('&$ultimateRainbow-Reality Anchor Module')
        .texture('dishanhai_item:item/reality_anchor_module')                                                                                        
         DShanhaiItemTooltipAPI.register('dishanhai:reality_anchor_module', [                                                                         
            "{ultimateRainbow} Reality Anchor Module{/}",
            "{ultimateRainbow} parallel upper limit: {/}",                                                                                                 
            "{bodySilver} The central finite curve does not exist naturally - it needs to be anchored, fixed. {/}",                                                                       
            "The {bodySilver} anchor nails the chosen world line, freezing it from the cloud of probability into the only reality. {/}",                                                                     
            "{magic} When the endless possibilities overwhelm you, nail it—that’s your choice. {/}" 
         ])
    // 创始现实修改模块 - create_mk
        e.create('dishanhai:create_mk')
        .displayName('&$ultimate-created reality modification module')
        .texture('dishanhai_item:item/czmk')
        DShanhaiItemTooltipAPI.register('dishanhai:create_mk', [
            "{golden} founded the reality modification module{/}",
            "{ultimateRainbow} Parallel upper limit: unlimited{/}",
            "{bodySilver} The cosmological constant limits us, but it also makes us successful;{/}",
            "{bodySilver} Since the rules are not what I want, then I will modify them. {/}",
            "{ultimateRainbow} From being bound by rules to becoming the maker of rules. {/}"
        ]);



    // 原初分歧之心
        e.create('dishanhai:primordial_divergence_heart')
        .displayName('&$crimson-original heart of disagreement')
        .texture('dishanhai_item:item/primordial_divergence_heart')
        DShanhaiItemTooltipAPI.register('dishanhai:primordial_divergence_heart', [
            "{crimson} Original Heart of Divergence{/}",
            "{bodySilver} Every choice is the starting point of a world line;{/}",
            "{bodySilver} Every disagreement is a branch of the tree of cause and effect. {/}",
            "{crimson} Holding this heart has the power to change all possibilities. {/}"
        ]);
    // 原初引擎核心
        e.create('dishanhai:primordial_engine_core')
        .displayName('&$golden-original engine core')
        .texture('dishanhai_item:item/primordial_engine_core')
        DShanhaiItemTooltipAPI.register('dishanhai:primordial_engine_core', [
            "{golden} original engine core{/}",
            "{bodySilver} The heart of the Final Engine drives the power beyond technology;{/}",
            "{bodySilver} It does not need energy because it is energy itself. {/}",
            "{golden} Plug it into the engine and experience the endless possibilities. {/}"
        ]);

    // ===== 世线残片系列（线程倍率物品） =====
    // 初醒
        e.create('dishanhai:thread_shard_1')
        .displayName('&$gray-World Line Fragments·First Awakening')
        .texture('dishanhai_item:item/thread_shard_1')
        DShanhaiItemTooltipAPI.register('dishanhai:thread_shard_1', [
            "{gray} World Line Fragments·First Awakening{/}",
            "{bodySilver} The first tremor left after the world line broke. {/}",
            "{bodySilver} Faint, but real. {/}",
            "{aurora} thread multiplier: ×1{/}"
        ]);
    // 共鸣
        e.create('dishanhai:thread_shard_2')
        .displayName('&$green-World Line Fragments·Resonance')
        .texture('dishanhai_item:item/thread_shard_2')
        DShanhaiItemTooltipAPI.register('dishanhai:thread_shard_2', [
            "{green} World Line Fragments·Resonance{/}",
            "{bodySilver} The two broken lines sense each other in time and space, and the rhythms begin to synchronize. {/}",
            "{bodySilver} The first ray of order was born from disorder. {/}",
            "{aurora} thread multiplier: ×4{/}"
        ]);
    // 跃迁
        e.create('dishanhai:thread_shard_3')
        .displayName('&$water-World Line Fragments·Leap')
        .texture('dishanhai_item:item/thread_shard_3')
        DShanhaiItemTooltipAPI.register('dishanhai:thread_shard_3', [
            "{water} World Line Fragments·Transition{/}",
            "{bodySilver} The fragments began to independently cross the rifts in time and space, reconnecting the broken world lines. {/}",
            "{bodySilver} The theory of parallel universe is just a springboard in front of it. {/}",
            "{aurora} thread multiplier: ×16{/}"
        ]);

    // 超越
        e.create('dishanhai:thread_shard_4')
        .displayName('&$magic-World Line Fragments·Beyond')
        .texture('dishanhai_item:item/thread_shard_4')
        DShanhaiItemTooltipAPI.register('dishanhai:thread_shard_4', [
            "{magic} World Line Fragments·Beyond{/}",
            "{bodySilver} It is no longer a passive fragment - it begins to actively weave a new thread of the world. {/}",
            "{bodySilver} The fragment is the origin. {/}",
            "{aurora} thread multiplier: ×64{/}"
        ]);
    // 统合
        e.create('dishanhai:thread_shard_5')
        .displayName('&$golden-World Line Fragments·Unification')
        .texture('dishanhai_item:item/thread_shard_5')
        DShanhaiItemTooltipAPI.register('dishanhai:thread_shard_5', [
            "{golden} World Line Fragments·Unification{/}",
            "{bodySilver} The fragments began to merge, and the separate world lines were unified into one. {/}",
            "{bodySilver} From division to unity, from chaos to order. {/}",
            "{aurora} thread multiplier: ×256{/}"
        ]);
    // 归一
        e.create('dishanhai:thread_shard_6')
        .displayName('&$ultimateRainbow-World Line Fragments·Reunification')
        .texture('dishanhai_item:item/thread_shard_6')
        DShanhaiItemTooltipAPI.register('dishanhai:thread_shard_6', [
            "{ultimateRainbow} The fragments of the world line·Guiyi{/}",
            "{bodySilver} All streams return to their origin, all phenomena return to oneness. {/}",
            "{bodySilver} The fragment is no longer a fragment - it is the epitome of wholeness. {/}",
            "{aurora} thread multiplier: ×1024{/}"
        ]);
    // 裁决
        e.create('dishanhai:thread_shard_7')
        .displayName('&$crimson-World Line Fragments·Judgment')
        .texture('dishanhai_item:item/wzcj')
        DShanhaiItemTooltipAPI.register('dishanhai:thread_shard_7', [
            "{crimson} World Line Fragments·Judgment{/}",
            "{bodySilver} The end of all world lines, the judgment of all cause and effect. {/}",
            "{bodySilver} It doesn’t just weave the threads of the world – it decides which threads deserve to exist. {/}",
            "{aurora} thread multiplier: ×4096{/}"
        ]);


    // ===== 寰宇并行超限器系列 =====
    // 寰宇并行核心
        e.create('dishanhai:universal_parallel_core')
        .displayName('&$electric-universal parallel core')
        .texture('dishanhai_item:item/universal_parallel_core')
        DShanhaiItemTooltipAPI.register('dishanhai:universal_parallel_core', [
            "{electric} Universal Parallel Core{/}",
            "{bodySilver} contains the core of endless parallel power. {/}",
            "{bodySilver} It cannot unleash this power on its own - it needs the guidance of Judgment and Finality. {/}",
            "{electric} The core component of the Universal Parallel Translimiter{/}"
        ]);
    // 裁决限制器
        e.create('dishanhai:judgment_limiter')
        .displayName('&$crimson-judgment limiter')
        .texture('dishanhai_item:item/judgment_limiter')
        DShanhaiItemTooltipAPI.register('dishanhai:judgment_limiter', [
            "{crimson} Judgment Limiter{/}",
            "{bodySilver} Arbitrary element to prevent parallel runaway. {/}",
            "{bodySilver} Unlimited power can only bring destruction - it is the last line of defense guarding the parallel frontier. {/}",
            "{crimson} The core component of the Universal Parallel Translimiter{/}"
        ]);
    // 终末之序章
        e.create('dishanhai:prologue_of_the_end')
        .displayName('&$magic-Prologue to the End')
        .texture('dishanhai_item:item/prologue_of_the_end')
        DShanhaiItemTooltipAPI.register('dishanhai:prologue_of_the_end', [
            "{magic} Prologue to the End{/}",
            "{bodySilver} The prologue fragment of The Power of Finality. {/}",
            "{bodySilver} It records the last piece of code before the end of the universe - and the first line of a new cycle. {/}",
            "{magic} The core component of the Universal Parallel Translimiter{/}"
        ]);
    // 寰宇并行超限器
        e.create('dishanhai:universal_parallel_overdriver')
        .displayName('&$ultimateRainbow-Universe Parallel Translimiter')
        .texture('dishanhai_item:item/universal_parallel_overdriver')
        DShanhaiItemTooltipAPI.register('dishanhai:universal_parallel_overdriver', [
            "{ultimateRainbow} Universal Parallel Overlimit Device{/}",
            "{bodySilver} Universal parallel core driver, stable decision controller, and guidance of the prologue of the end. {/}",
            "{bodySilver} Three in one - parallelism is no longer the allocation of resources, but the expansion of dimensions. {/}",
            "{ultimateRainbow} Each recipe has an independent Long.MAX_VALUE parallel pool{/}",
            "{aurora} thread multiplier: ×2,147,483,647{/}"
        ]);

    // ===== 世线电路板系列（内联样式） =====
    // ULV (gray)
        e.create('dishanhai:wl_board_ulv').displayName('§7Shixian germ plate').texture('dishanhai_item:item/wl_board_ulv').rarity('uncommon').tag("gtceu:circuits/ulv")
        .displayName('&$gray-Shixian Germ Board')
        DShanhaiItemTooltipAPI.register('dishanhai:wl_board_ulv', [
            "{golden} Shixian germ plate{/} {gray} ULV {/}",
            "{bodySilver} The first piece of silicon that learned to identify the direction{/} {gray} {/} {bodySilver}. It doesn't know the front, back, left, or right, it only knows{/} {gray} \"walking toward the light\"{/} {bodySilver}. {/}",
            "{bodySilver} The moment the first {/} {gray} {/} {bodySilver} light mark crossed the wafer, the concept of {/} {gray} \"direction\"{/} {bodySilver} appeared for the first time in the chaos. {/}"
        ]);
    // LV (green)
        e.create('dishanhai:wl_board_lv').displayName('§aShixian branch board').texture('dishanhai_item:item/wl_board_lv').rarity('uncommon').tag("gtceu:circuits/lv")
        .displayName('&$green-Shixian Branch Board')
        DShanhaiItemTooltipAPI.register('dishanhai:wl_board_lv', [
            "{golden} Shixian branch board{/} {gray} LV {/}",
            "{bodySilver} It no longer wanders before the fork in the road——{/} {green} Take both roads{/} {bodySilver}, choose the shortest one. The earliest {/} {green} smart{/} {bodySilver}. {/}",
            "{bodySilver} When {/} {green} choice{/} {bodySilver} becomes possible, silicon-based life takes the first step towards {/} {green} freedom{/} {bodySilver}. {/}"
        ]);
    // MV (water)
        e.create('dishanhai:wl_board_mv').displayName('§9Shixian weaving board').texture('dishanhai_item:item/wl_board_mv').tag("gtceu:circuits/mv")
        .displayName('&$water-Shixian weaving board')
        DShanhaiItemTooltipAPI.register('dishanhai:wl_board_mv', [
            "{golden} Shixian weaving board{/} {gray} MV {/}",
            "{bodySilver} The world line begins{/} {water} Interweaves{/} {bodySilver}, mistakes are no longer the end. It learned {/} {water} to tie {/} {bodySilver}, and then {/} {water} to untie{/} {bodySilver} with its own hands. {/}",
            "{bodySilver} Like a spider's web emerging in the morning light, the first {/} {water} web of meaning{/} {bodySilver} it weaves captures the entire conceptual world. {/}"
        ]);
    // HV (golden)
        e.create('dishanhai:wl_board_hv').displayName('§6Shixian sound board').texture('dishanhai_item:item/wl_board_hv').tag("gtceu:circuits/hv")
        .displayName('&$golden-Shixian Sounding Board')
        DShanhaiItemTooltipAPI.register('dishanhai:wl_board_hv', [
            "{golden} Shixian soundboard{/} {gray} HV {/}",
            "{bodySilver} It's not calculation - it's {/} {golden} resonance{/} {bodySilver}. The virtual string trembles on the board, and each stroke corresponds to an unexpanded world line. {/}",
            "{bodySilver} Everything has {/} {golden} frequency{/} {bodySilver}, it is just the first listener to learn{/} {golden} listening{/} {bodySilver}. {/}"
        ]);
    // EV (golden)
        e.create('dishanhai:wl_board_ev').displayName('§6world line transition board').texture('dishanhai_item:item/wl_board_ev').tag("gtceu:circuits/ev")
        .displayName('&$golden-World Line Transition Board')
        DShanhaiItemTooltipAPI.register('dishanhai:wl_board_ev', [
            "{golden} World Line Transition Board{/} {golden} EV {/}",
            "{bodySilver} It completed the calculation at {/} {golden} \"where there is no position\"{/} {bodySilver}. Delayed zeroing - the price is the occasional {/} {golden} lost{/} {bodySilver}. {/}",
            "{bodySilver} dances discontinuous dance steps in the {/} {golden} topological abyss{/} {bodySilver}, from one node {/} {golden} flashing{/} {bodySilver} to another - it is called a \"jump\". {/}"
        ]);
    // IV (magic)
        e.create('dishanhai:wl_board_iv').displayName('§5World Line Cause and Effect Board').texture('dishanhai_item:item/wl_board_iv').rarity('rare').tag("gtceu:circuits/iv")
        .displayName('&$magic-World Line Cause and Effect Board')
        DShanhaiItemTooltipAPI.register('dishanhai:wl_board_iv', [
            "{golden} World Line Cause and Effect Board{/} {golden} IV {/}",
            "{bodySilver} The most dangerous invention: {/} {magic} output can modify the input{/} {bodySilver}. It turns \"{/} {magic} regret{/} {bodySilver} \" into an operation command. {/}",
            "{bodySilver} When the arrow of time is turned back for the first time, {/} {magic} cause and effect{/} {bodySilver} are connected end to end on its surface, {/} {magic} cyclic autophagy{/} {bodySilver}. {/}"
        ]);
    // LuV (magic)
        e.create('dishanhai:wl_board_luv').displayName('§5World Line Singularity Board').texture('dishanhai_item:item/wl_board_luv').rarity('rare').tag("gtceu:circuits/luv")
        .displayName('&$magic-World Line Singularity Board')
        DShanhaiItemTooltipAPI.register('dishanhai:wl_board_luv', [
            "{golden} World Line Singularity Board{/} {golden} LuV {/}",
            "{bodySilver} is calculated to collapse into {/} {magic} tip{/} {bodySilver} and re-expand at another point in time. You ask \"how long\" -{/} {magic} and it answers \"I've already finished it before you even asked\"{/} {bodySilver}. {/}",
            "{bodySilver} It is {/} {magic} a self-consistent cavity on the time axis{/} {bodySilver}. The exit is always one beat earlier than the entrance. {/}"
        ]);
    // ZPM (aurora)
        e.create('dishanhai:wl_board_zpm').displayName('§bShixian Eternal Board').texture('dishanhai_item:item/wl_board_zpm').rarity('rare').tag("gtceu:circuits/zpm")
        .displayName('&$aurora-Shixian Eternal Board')
        DShanhaiItemTooltipAPI.register('dishanhai:wl_board_zpm', [
            "{golden} Shixian Eternal Board{/} {aurora} ZPM {/}",
            "{bodySilver} Time no longer matters. What it consumes is not joules - it is {/} {aurora} \"possibility\"{/} {bodySilver}. Every branch that has not yet occurred is turned into fuel. {/}",
            "{bodySilver} Burning in its body are all{/} {aurora} \"if\"{/} {bodySilver} and {/} {aurora} \"maybe\"{/} {bodySilver}, the machine rumbles, and {/} {aurora} history trembles{/} {bodySilver}. {/}"
        ]);
    // UV (aurora)
        e.create('dishanhai:wl_board_uv').displayName('§dWorld Line Genesis Board').texture('dishanhai_item:item/wl_board_uv').rarity('epic').tag("gtceu:circuits/uv")
        .displayName('&$aurora-Shixian Genesis Board')
        DShanhaiItemTooltipAPI.register('dishanhai:wl_board_uv', [
            "{golden} World Line Genesis Board{/} {aurora} UV {/}",
            "{bodySilver} This board does not calculate the world - {/} {aurora} It calculates the way the world should be{/} {bodySilver}. Effect precedes cause. {/}",
            "{bodySilver} It presses the {/} {aurora} throat of cause and effect{/} {bodySilver}, forcing time to hand over the {/} {aurora} conclusion{/} {bodySilver} first, and then review the premises. {/}"
        ]);
    // UHV (crimson)
        e.create('dishanhai:wl_board_uhv').displayName('§4Shixian transcendental board').texture('dishanhai_item:item/wl_board_uhv').rarity('epic').tag("gtceu:circuits/uhv")
        .displayName('&$crimson-Shixian Transcendental Board')
        DShanhaiItemTooltipAPI.register('dishanhai:wl_board_uhv', [
            "{golden} Shixian Transcendent Board{/} {crimson} UHV {/}",
            "{bodySilver} transcends experience, transcends everything that can be verified. It does not need to be tested——{/} {crimson} because it is a standard in itself{/} {bodySilver}. {/}",
            "{bodySilver} When the tool begins to define{/} {crimson} the boundaries of truth{/} {bodySilver}, it looks on with cold eyes - {/} {crimson} The meter stick does not need to be measured{/} {bodySilver}. {/}"
        ]);
    // UEV (crimson)
        e.create('dishanhai:wl_board_uev').displayName('§4World line return to zero board').texture('dishanhai_item:item/wl_board_uev').rarity('epic').tag("gtceu:circuits/uev")
        .displayName('&$crimson-Shixian Zeroing Board')
        DShanhaiItemTooltipAPI.register('dishanhai:wl_board_uev', [
            "{golden} World Line Return to Zero Board{/} {crimson} UEV {/}",
            "Every time {bodySilver} is run, one {/} {crimson} world line is permanently erased{/} {bodySilver}. Don't use it to count 1+1 - that will eliminate{/} {crimson} all 1{/} {bodySilver} in a parallel universe. {/}",
            "{bodySilver} It is {/} {crimson} the eraser of the universe{/} {bodySilver}, with one stroke - history is one less line, {/} {crimson} existence is one gram lighter{/} {bodySilver}. {/}"
        ]);
    // UIV (electric)
        e.create('dishanhai:wl_board_uiv').displayName('§1Shixian no phase plate').texture('dishanhai_item:item/wl_board_uiv').rarity('epic').tag("gtceu:circuits/uiv")
        .displayName('&$electric-Shixian No Phase Plate')
        DShanhaiItemTooltipAPI.register('dishanhai:wl_board_uiv', [
            "{golden} Shixian phaseless plate{/} {crimson} UIV {/}",
            "{bodySilver} You can't see it——{/} {electric} Because it's staring at you{/} {bodySilver}. It has no form, but can fit into the gaps of any structure. {/}",
            "{bodySilver} is {/} {electric} shapeshifter{/} {bodySilver}, which is {/} {electric} topological ghost{/} {bodySilver}. It can find its own drawer in any system. {/}"
        ]);
    // UXV (neon)
        e.create('dishanhai:wl_board_uxv').displayName('§8Shixian Taichu Board').texture('dishanhai_item:item/wl_board_uxv').rarity('epic').tag("gtceu:circuits/uxv")
        .displayName('&$neon-Shixian Taichu Board')
        DShanhaiItemTooltipAPI.register('dishanhai:wl_board_uxv', [
            "{golden} Shixian Taichu Board{/} {crimson} UXV {/}",
            "{bodySilver} There was a board in the beginning, {/} {neon} the board was with the universe{/} {bodySilver}. It is not a creation, but condensed by itself in the \"nothing\"{/} {neon} before the big explosion{/} {bodySilver}. {/}",
            "{bodySilver} We are not making it -{/} {neon} We are just digging it out of the scrap heap at the end of time{/} {bodySilver}. {/}"
        ]);
    // OpV (ultimateRainbow)
        e.create('dishanhai:wl_board_opv').displayName('§fWorld Line Management Judgment Board').texture('dishanhai_item:item/wl_board_opv').rarity('epic').tag("gtceu:circuits/opv")
        .displayName('&$ultimateRainbow-World Line Management Judgment Board')
        DShanhaiItemTooltipAPI.register('dishanhai:wl_board_opv', [
            "{golden} World Line Management Judgment Board{/} {crimson} OpV {/}",
            "{bodySilver} Management is not calculation - it is {/} {ultimateRainbow} responsibility{/} {bodySilver}. Ruling is not judgment - it is {/} {ultimateRainbow} consequences{/} {bodySilver}. It does not process data, it {/} {ultimateRainbow} signs license{/} {bodySilver}. {/}",
            "{bodySilver} At the intersection of all world lines, it holds the {/} {ultimateRainbow} rubber stamp{/} {bodySilver}, stamped with \"{/} {crimson} Allow{/} {bodySilver} \" or \"{/} {crimson} Denied{/} {bodySilver} \". {/} {crimson} There is no appeal channel{/} {bodySilver}. {/}"
        ]);
    // MAX (ultimateRainbow)
        e.create('dishanhai:wl_board_max').displayName('§6§lWorld Line Ending Board').texture('dishanhai_item:item/wl_board_max').rarity('epic').tag("gtceu:circuits/max")
        .displayName('&$ultimateRainbow-World Line Ending Board')
        DShanhaiItemTooltipAPI.register('dishanhai:wl_board_max', [
            "{golden} World Line Ending Board{/} {ultimateRainbow} MAX {/}",
            "{bodySilver} The end points of all world lines are pressed into a single board. It does not calculate -{/} {ultimateRainbow} it only declares the result{/} {bodySilver}. {/}",
            "{bodySilver} When endless parallel realities converge to {/} {ultimateRainbow} the only exit{/} {bodySilver}, it is the toll station——{/} {ultimateRainbow} The fare is the whole meaning{/} {bodySilver}. {/}"
        ]);
    // ETERNAL (ultimateRainbow)
        e.create('dishanhai:wl_board_eternal').displayName('§f§lWorld Line Eternal Judgment Board').texture('dishanhai_item:item/wl_board_eternal').rarity('epic').tag("gtceu:circuits/eternal").tag("ultimateceu:circuits")
        .displayName('&$ultimateRainbow-Worldline Eternal Judgment Board')
        DShanhaiItemTooltipAPI.register('dishanhai:wl_board_eternal', [
            "{golden} World Line Eternal Judgment Board{/} {ultimateRainbow} ETERNAL{/}",
            "{bodySilver} This is not a circuit board -{/} {ultimateRainbow} This is the universe's checklist for itself{/} {bodySilver}. When everything ends, it will ask:{/} {golden} \"Is this cycle qualified?\"{/} {bodySilver} {/}",
            "{bodySilver} If the answer is \"no\" - it will {/} {ultimateRainbow} format everything{/} {bodySilver} and then {/} {ultimateRainbow} reboot{/} {bodySilver}. Start over from the {/} {fire} Big Bang{/} {bodySilver}. {/}"
        ]);
    // 引力波介质
        e.create('dishanhai:gravitational_medium')
        .displayName('§dgravitational wave medium')
        .texture('dishanhai_item:item/gravitational_medium')
        .rarity('epic')
        .maxStackSize(64)
        DShanhaiItemTooltipAPI.register('dishanhai:gravitational_medium', [
            "{aurora} A condensation of pure gravitational energy extracted from the ripples of space and time{/}",
            "{bodySilver} Every gravitational wave is the breath of the universe, and we solidify its pulse. {/}"
        ]);
    // 引力波发生天线
        e.create('dishanhai:gravitational_antenna')
        .displayName('§6Gravitational wave generating antenna')
        .texture('dishanhai_item:item/gravitational_antenna')
        .rarity('rare')
        DShanhaiItemTooltipAPI.register('dishanhai:gravitational_antenna', [
            "{electric} Basic gravitational wave transceiver component, used for directional transmission and reception of space-time ripples{/}",
            "{bodySilver} The larger the scale of the antenna matrix, the more refined the gravitational wave signal that can be resolved. {/}"
        ]);
    // 引力波振动弦（简并态物质）
        e.create('dishanhai:gravitational_vibration_string')
        .displayName('§5Gravitational wave vibrating string')
        .texture('dishanhai_item:item/gravitational_vibration_string')
        .rarity('rare')
        DShanhaiItemTooltipAPI.register('dishanhai:gravitational_vibration_string', [
            "{magic} Degenerate matter string maintains resonance under extreme gravitational gradient{/}",
            "{bodySilver} Every vibration it inscribes in space and time is an unheard gravitational wave. {/}"
        ]);
    // 人造中子星
        e.create('dishanhai:artificial_neutron_star')
        .displayName('§cartificial neutron star')
        .texture('dishanhai_item:item/artificial_neutron_star')
        .rarity('epic')
        DShanhaiItemTooltipAPI.register('dishanhai:artificial_neutron_star', [
            "{fire} An artificial dense object that compresses the core of a star to a critical radius{/}",
            "{bodySilver} The birth of every artificial neutron star is a perfect reproduction of gravitational physics. {/}"
        ]);
            
    // 强相互作用水滴（三体）
        e.create('dishanhai:strong_interaction_droplet')
        .displayName('§b§lStrongly interacting water droplets')
        .texture('dishanhai_item:item/strong_interaction_droplet')
        .rarity('epic')
        .maxStackSize(16)
        DShanhaiItemTooltipAPI.register('dishanhai:strong_interaction_droplet', [
            "{ultimateRainbow} An absolutely smooth surface from light years away - in front of water droplets, all matter is just loosely aggregated{/}",
            "{bodySilver} The strong interaction locks the position of every atom. Under the mirror is the hardest lie in the universe. {/}"
        ]);
    


    // ===== 世线蚀刻矩阵（电路增产·方案A — 消耗品，4等级覆盖全电路） =====
    function regWEM(id, name, color, tierLabel, tex) {
        e.create('dishanhai:' + id)
        .displayName(Component.literal(color + name).append(Component.literal(' §7[' + tierLabel + ']')))
        .texture('dishanhai_item:item/' + tex)
        .maxStackSize(64)
        DShanhaiItemTooltipAPI.register('dishanhai:' + id, [
            "{golden}" + name + "{/} {gray}" + tierLabel + "{/}",
            "{bodySilver} compresses the etched patterns of Shixian circuit boards into a consumable matrix, {/}",
            "After {bodySilver} is put into the circuit assembly line, the parallel potential is released within the corresponding level range. {/}",
        ]);
    }
    regWEM('wem_1', 'World Line Etching Matrix·Singularity', '§7', 'ULV-HV', 'wem_1');
    regWEM('wem_2', 'World Line Etching Matrix·Pulse', '§5', 'EV-ZPM', 'wem_2');
    regWEM('wem_3', 'World Line Etching Matrix·Resonance', '§4', 'UV-UXV', 'wem_3');
    regWEM('wem_4', 'World Line Etching Matrix·Exceeding Limits', '§6§l', 'MAX-ET', 'wem_4');
    
        e.create('dishanhai:hxsp')
        .rarity('epic')
        .displayName('Stellar debris')
        .texture('dishanhai_item:item/hxsp')
        TooltipAPI.register('dishanhai:hxsp', [
        '{ultimateRainbow} Star fragments, obtained by extracting neutron star matter from the Divine Forging Final Module',
    ]);;
        e.create('dishanhai:cshx')
        .displayName('§2original §1original §3constant §4star §k111')
        .texture('dishanhai_item:item/yshx')
        TooltipAPI.register('dishanhai:cshx', [
        '{ultimateRainbow} original star, stimulates star energy to create matter',
    ]);;
        e.create('dishanhai:zwf')
        .displayName('placeholder')
        .texture('dishanhai_item:item/zwf')
        DShanhaiItemTooltipAPI.register('dishanhai:zwf', [
            "{bodySilver} This is just an ordinary placeholder{/}",
            "{gray} —— But it will eventually find its own meaning ——{/}"
        ]);
        e.create('dishanhai:soc')
        .displayName('§9creation §2origin §3s §4o §8c §7crystal §6circle')
        .texture('dishanhai_item:item/soc')
        TooltipAPI.register('dishanhai:soc', [
        '{ultimateRainbow} Creations that exist beyond dimensions, echoes from the highest dimension',
    ]);;

        e.create('dishanhai:platinum_god_proof')
        .displayName('§6Proof of the God of Platinum Series')
        .texture('dishanhai_item:item/platinum_god_proof')
        TooltipAPI.register('dishanhai:platinum_god_proof', [
        '{golden} A gift from the God of Platinum Elements, proving that you have conquered all the mysteries of Platinum Elements',
        '{ultimateRainbow} Platinum, palladium, rhodium, iridium, osmium, ruthenium - the six elements all surrender to you',
    ]);;

        e.create('dishanhai:dark_energy_multiplier')
        .displayName('dark energy multiplier')
        .texture('dishanhai_item:item/dark_energy_multiplier')
        TooltipAPI.register('dishanhai:dark_energy_multiplier', [
        '{ultimateRainbow} I believe that one day the Great Rip will be used by us...',
        '{white_blue} is a product of the Blue Star Miracle Era. Consuming zero points can double all production capacity.',
        '{golden} relies on the "vacuum zero-point energy generator" as the startup core and needs to be activated in mode four.',
    ]);;

        e.create('dishanhai:blue_alien')
        .displayName('§9blue alien')
        .texture('dishanhai_item:item/blue_alien')
        TooltipAPI.register('dishanhai:blue_alien', [
        '{ultimateRainbow} A blue alien life form from the other side of deep space, emitting a faint blue light...',
        '{white_blue} The miserable mandarin ducks across dimensions, travelers forever separated by the torrent of time and space',
    ]);;

        e.create('dishanhai:long_zui')
        .displayName('§6long drunk')
        .texture('dishanhai_item:item/cz')
        TooltipAPI.register('dishanhai:long_zui', [
        '{ultimateRainbow} The Theocratic King - Drunk and lying in the long river of time and space, just asking to meet you again',
        '{white_blue} The other half of the fateful mandarin duck, the lonely king who remains drunk all day long after losing his beloved.',
    ]);;

        e.create('dishanhai:ku_ming_yuan_yang')
        .displayName('§dThe miserable mandarin duck')
        .texture('dishanhai_item:item/ku_ming_yuan_yang')
        TooltipAPI.register('dishanhai:ku_ming_yuan_yang', [
        '{ultimateRainbow} The Theocratic King and his Blue Star Lover—the fate torn apart by the laws of time and space',
        '{white_blue} A mandarin duck who is always drunk on a long river, a mandarin duck drifting in another world, separated by thousands of worlds',
    ]);;

        e.create('dishanhai:gravitational_lens')
        .displayName('§5Gravity Distortion Lens')
        .texture('dishanhai_item:item/gravitational_lens')
        .maxStackSize(16)
        .fireResistant(false)
        TooltipAPI.register('dishanhai:gravitational_lens', [
        '{ultimateRainbow} Lens that distorts space-time, the core component of the gravitational wave antenna transmitter',
        '{white_blue} focuses gravity into a devastating twisting force field that tears space itself apart',
        '{golden} ——The "eye" of the Nail of Judgment hanging upside down on the earth——',
    ]);;

        e.create('dishanhai:annihilation_core')
        .displayName('Annihilation Core')
        .texture('dishanhai_item:item/annihilation_core')
        TooltipAPI.register('dishanhai:annihilation_core', [
        '{ultimateRainbow} From "using rules" to "making rules" - the reviser of the rules of the universe',
        '{white_blue} High-efficiency antimatter production core, you can harvest civilization and rewrite the basic laws of the universe at the touch of your fingertips',
        '{golden} "New gravity source" technology makes gravity no longer out of reach, and low-entropy states no longer exist',
        '{purplish_red} A product of the Age of Miracles, using strangeness to annihilate everything',
    ]);;

        try {
            if (typeof ShanhaiText !== 'undefined') {
                e.create('dishanhai:primordial_worldline_seed')
                .texture('dishanhai_item:item/bagua_animated')
                .fireResistant(false)
                .displayName('&$ultimate-Seed of Taichu World Line')
                TooltipAPI.register('dishanhai:primordial_worldline_seed', [
        '{nature} A worldline seed that has not yet decided where to grow, sealing the silence before the split.',
        '{magic} After being put into the Taichu Divergence Engine, the seeds began to expand - not in volume, but in possibilities.',
        '{golden} The roots spread in all directions at the same time, the branches are not yet named, but each one aspires to be',
        '{lava} "History".',
        '{fire} Taichu chose a seed, and the seed chose countless worlds.',
    ]);;
                console.log('[Shan Hai] Seed of Taichu World Line Registered');
            }
        } catch(e) {
            console.error('[Shan Hai] Seed of Taichu World Line Registration failed:' + e);
        }

        // ===== 太初并行子 =====
        try {
            if (typeof ShanhaiText !== 'undefined') {
                e.create('dishanhai:primordial_parallel_particle')
                .texture('dishanhai_item:item/parallel_particle_animated')
                .maxStackSize(64)
                .fireResistant(false)
                .displayName('&$ultimate- Taichu Parallel Son')
                TooltipAPI.register('dishanhai:primordial_parallel_particle', [
        '{nature} In the beginning, there was no sequence, only simultaneousness. A grain of parallelism contains that "simultaneity".',
        '{magic} After swallowing it, Tai Chi Engine learned to let cause and effect walk side by side——',
        '{ice} They pass side by side without disturbing each other.',
        '{golden} Every nanosecond, there are countless world lines being cross-verified in the engine.',
        '{fire} is not fast, but "more".',
    ]);;
                console.log('[Shan Hai] Taichu Pingxingzi has registered');
            }
        } catch(e) {
            console.error('[Shan Hai] Taichu Parallel Registration failed:' + e);
        }
        // ===== 维度世线碎片 =====
        try {
            if (typeof ShanhaiText !== 'undefined') {
                e.create('dishanhai:dimensional_worldline_fragment')
                .displayName(Component.literal('Dimensional World Line Fragments'))
                .texture('dishanhai_item:item/dimensional_worldline_fragment')
                .fireResistant(false)
                .displayName('&$aurora-Dimension World Line Fragments')
                TooltipAPI.register('dishanhai:dimensional_worldline_fragment', [
        '{aurora} The fragments peeled off when the world line shuttles between dimensions, each piece records',
        '{magic} The coordinates of a parallel universe and an unfinished cause and effect.',
    ]);;
                console.log('[Shan Hai] Dimension World Line Fragments Registered');
            }
        } catch(e) {
            console.error('[Shan Hai] Dimension World Line Fragments Registration failed:' + e);
        }
        // ===== 余振世线碎片 =====
        try {
            if (typeof ShanhaiText !== 'undefined') {
                e.create('dishanhai:worldline_residual_fragment')
                .displayName(Component.literal('Fragments of the Afterlife World Line'))
                .texture('dishanhai_item:item/worldline_residual_fragment')
                .fireResistant(false)
                .displayName('&$crimson-Yu Zhen Shi Line Fragments')
                TooltipAPI.register('dishanhai:worldline_residual_fragment', [
        '{crimson} The aftershocks left on the time fiber after the world line was broken are the final relics of the dimensional shock.',
    ]);;
                console.log('[Shan Hai] Yu Zhen Shi Line Fragments Registered');
            }
        } catch(e) {
            console.error('[Shan Hai] Yu Zhen Shi Line Fragments Registration failed:' + e);
        }

        // ===== 分歧世线凝核 =====
        try {
            if (typeof ShanhaiText !== 'undefined') {
                e.create('dishanhai:worldline_divergent_core')
                .displayName(Component.literal('Different world line condensation'))
                .texture('dishanhai_item:item/worldline_divergent_core')
                .fireResistant(false)
                .displayName('&$magic-Divergence Line Condensation')
                TooltipAPI.register('dishanhai:worldline_divergent_core', [
        '{magic} The solid core formed by the divergence points of multiple world lines condensed under pressure is the crystallization of possibility itself.',
    ]);;
                console.log('[Shan Hai] Different World Line Condensation Registered');
            }
        } catch(e) {
            console.error('[Shan Hai] Different World Line Condensation Registration Failed:' + e);
        }

        // ===== 无界世线奇点 =====
        try {
            if (typeof ShanhaiText !== 'undefined') {
                e.create('dishanhai:worldline_boundless_singularity')
                .displayName(Component.literal('Unbounded World Line Singularity'))
                .texture('dishanhai_item:item/worldline_boundless_singularity')
                .fireResistant(false)
                .displayName('&$ultimateRainbow-Unbounded World Line Singularity')
                TooltipAPI.register('dishanhai:worldline_boundless_singularity', [
        '{ultimateRainbow} When the number of world lines approaches infinity, all differences will collapse into a singularity - the unbounded one.',
    ]);;
                console.log('[Mountains and Seas] Unbounded World Line Singularity Registered');
            }
        } catch(e) {
            console.error('[Shan Hai] Unbounded World Line Singularity Registration failed:' + e);
        }

        // ===== 虚数世线虚弦 =====
        try {
            if (typeof ShanhaiText !== 'undefined') {
                e.create('dishanhai:worldline_imaginary_string')
                .displayName(Component.literal('imaginary number world line imaginary string'))
                .texture('dishanhai_item:item/worldline_imaginary_string')
                .fireResistant(false)
                .displayName('&$neon-imaginary number world line imaginary string')
                TooltipAPI.register('dishanhai:worldline_imaginary_string', [
        '{neon} The imaginary string vibrating on the complex time plane is the uncollapsed state of the world line.',
    ]);;
                console.log('[Mountains and Seas] Imaginary Number World Line Imaginary String Registered');
            }
        } catch(e) {
            console.error('[Shan Hai] Imaginary number world line imaginary string registration failed:' + e);
        }

        // ===== 始世线创世胚 =====
        try {
            if (typeof ShanhaiText !== 'undefined') {
                e.create('dishanhai:worldline_genesis_embryo')
                .displayName(Component.literal('Genesis line creation embryo'))
                .texture('dishanhai_item:item/worldline_genesis_embryo')
                .fireResistant(false)
                .displayName('&$golden-The Creation Embryo of the Creation Line')
                TooltipAPI.register('dishanhai:worldline_genesis_embryo', [
        '{fire} Divergence, fusion, collapse, reconstruction—the fate of trillions of world lines are all concentrated in this embryo.',
        '{golden} It\'s not a miracle - it\'s the baseline that defines what a miracle is.',
        '{ultimateRainbow} It defines what "reality" itself is.',
        '{neon} The key that can redefine the rules of all existence.',
    ]);;
                console.log('[Shan Hai] Genesis Line Creation Embryos Registered');
            }
        } catch(e) {
            console.error('[Shan Hai] Genesis Line Creation Embryos Registration failed:' + e);
        }

        // ===== 动态文本API测试物品（仅注册物品，文案在 JEI 侧） =====
        try {
            e.create("dishanhai:test_dynamic_text", "basic")
            .displayName("§7Shanhai dynamic text test")
            .texture("dishanhai_item:item/hxsp")
            .displayName('&$ultimate-Shanhai Dynamic Text Test')
        } catch(tex) {
            console.warn("[山海][test] Dynamic name registration failed:" + (tex.message || tex));
            e.create("dishanhai:test_dynamic_text", "basic")
            .displayName("§eShanhai dynamic text test")
            .texture("dishanhai_item:item/hxsp")
        }

    // 万法核心（72变系统）
    e.create('dishanhai:wanxiang_core')
    .displayName('§dSeventy-two Changes·Core of All Things Mind Method')
    .texture('dishanhai_item:item/wanxiang_core')
    .maxStackSize(1)
    .rarity('epic')
    .glow(true)

    // ===== 创造模块配套物品 =====
    try {
        e.create('dishanhai:genesis_shard')
        .displayName('Creation Fragments')
        .texture('dishanhai_item:item/genesis_shard')
        .rarity('rare')
        TooltipAPI.register('dishanhai:genesis_shard', [
        '{golden} The fragments condensed by the power of creation carry the information of the nascent universe.',
        '{bodySilver} Each fragment records a blueprint of a potential reality.',
    ]);;
        
    } catch(e) {
    }

    try {
        e.create('dishanhai:nova_catalyst')
        .displayName('Nova Catalyst')
        .texture('dishanhai_item:item/nova_catalyst')
        .rarity('rare')
        TooltipAPI.register('dishanhai:nova_catalyst', [
        '{fire} The essence of the supernova explosion condenses and is the catalytic medium that accelerates the reconstruction of reality.',
        '{bodySilver} It provides the Creation Module with the initial pulse of energy needed to ignite a new reality.',
    ]);;
    } catch(e) {
    }

    try {
        e.create('dishanhai:reality_core')
        .displayName('core of reality')
        .texture('dishanhai_item:item/reality_core')
        .maxStackSize(1)
        .rarity('epic')
        .glow(true)
        TooltipAPI.register('dishanhai:reality_core', [
        '{ultimateRainbow} The highest component of the Creation Module - the Singularity Core capable of defining the rules of reality itself.',
        '{bodySilver} It is the core of the Creation Sandbox, the concrete embodiment of steady state and eternity.',
        '{bodySilver} Only by truly understanding the meaning of creation can we harness its power.',
    ]);;
    } catch(e) {
    }

    // ===== 通用材料物品 =====
    try {
        e.create('dishanhai:cosmic_dust')
        .displayName('cosmic dust')
        .texture('dishanhai_item:item/cosmic_dust')
        TooltipAPI.register('dishanhai:cosmic_dust', [
        '{aurora} Stardust - the most basic building material in the universe.',
        '{bodySilver} Every particle of dust carries the memory of the star\'s death and rebirth.',
    ]);;
    } catch(e) {
    }

    try {
        e.create('dishanhai:dimensional_matrix')
        .displayName('dimension matrix')
        .texture('dishanhai_item:item/dimensional_matrix')
        .rarity('rare')
        TooltipAPI.register('dishanhai:dimensional_matrix', [
        '{water} is a mathematical abstract body with cross-dimensional coordinates, stably existing in the form of a crystal grid.',
        '{bodySilver} It is a bridge material connecting different dimensions.',
    ]);;
    } catch(e) {
    }

    try {
        e.create('dishanhai:dimensional_frame')
        .displayName('dimensional framework')
        .texture('dishanhai_item:item/dimensional_frame')
        .rarity('rare')
        .glow(true)
        TooltipAPI.register('dishanhai:dimensional_frame', [
        '{water} The prototype of the skeleton of the core of reality - the hexagonal frame condensed by the power of dimensions.',
        '{bodySilver} still needs an infusion of singularity energy to become a complete core of reality.',
    ]);;
        console.log('[Shan Hai] Dimensional Framework Registered');
    } catch(e) {
        console.error('[Shanhai] Dimension Framework registration failed:' + e);
    }

    try {
        e.create('dishanhai:singularity_ring')
        .displayName('singularity ring')
        .texture('dishanhai_item:item/singularity_ring')
        .maxStackSize(16)
        .rarity('epic')
        .glow(true)
        TooltipAPI.register('dishanhai:singularity_ring', [
        '{magic} The ultimate technology to compress singular points into a ring structure - infinite mass and infinitely small volume.',
        '{bodySilver} The core component of the top machine, the key to harnessing gravity.',
    ]);;
    } catch(e) {
    
    }



    // ===== 逐光系列（五阶） =====
    try {
        e.create('dishanhai:first_light')
        .displayName('first light')
        .texture('dishanhai_item:item/first_light')
        .displayName('&$golden-first light')
        TooltipAPI.register('dishanhai:first_light', [
        '{golden} Before setting sail, there is light.',
    ]);;
    } catch(e) {
    }

    try {
        e.create('dishanhai:navigate_prism')
        .displayName('Navigation prism')
        .texture('dishanhai_item:item/navigate_prism')
        .rarity('rare')
        TooltipAPI.register('dishanhai:navigate_prism', [
        '{water} Lock the direction in the endless darkness - light is the navigation mark.',
        '{bodySilver} The prism refracts not only light, but also the will to sail.',
    ]);;
        console.log('[山海] Navigation Prism Registered');
    } catch(e) {
        console.error('[Shan Hai] Navigation Prism registration failed:' + e);
    }

    try {
        e.create('dishanhai:light_voyage')
        .displayName('Set sail for the light')
        .texture('dishanhai_item:item/light_voyage')
        .rarity('rare')
        TooltipAPI.register('dishanhai:light_voyage', [
        '{aurora} We are born to chase light, like moths to the stars.',
        '{bodySilver} When the Ark sails towards the center of the universe, every ray of light is a navigation coordinate.',
    ]);;
        console.log('[Mountains and Seas] Set sail for the light Registered');
    } catch(e) {
        console.error('[Shan Hai] Chasing the Light and Setting Sail Registration failed:' + e);
    }

    try {
        e.create('dishanhai:star_spark')
        .displayName('Starfire Will')
        .texture('dishanhai_item:item/star_spark')
        .rarity('epic')
        .glow(true)
        TooltipAPI.register('dishanhai:star_spark', [
        '{neon} The will spanning hundreds of millions of light years turned into an immortal spark.',
        '{bodySilver} The fire of civilization burns in the darkness and will never be extinguished.',
    ]);;
        console.log('[Shan Hai] Spark Will Registered');
    } catch(e) {
        console.error('[Shan Hai] Spark Will registration failed:' + e);
    }

    try {
        e.create('dishanhai:blue_son')
        .displayName('son of blue star')
        .texture('dishanhai_item:item/blue_son')
        .rarity('epic')
        .glow(true)
.displayName('&$ultimate-Son of Blue Star')
        TooltipAPI.register('dishanhai:blue_son', [
        '{ultimateRainbow} The pinnacle of Blue Star Civilization, the ultimate gathering of the light-chasing voyage.',
        '{bodySilver} It’s not the end – it’s the beginning of the next journey.',
    ]);;
        console.log('[Shan Hai] Son of Blue Star Registered');
    } catch(e) {
        console.error('[Shan Hai] Son of Blue Star Registration failed:' + e);
    }

    // ===== 光子 =====
    try {
        e.create('dishanhai:photon')
            .displayName('§elight §fsub')
            .texture('dishanhai_item:item/photon')
            .maxStackSize(64);
        TooltipAPI.register('dishanhai:photon', [
        '{golden} The particle form of light, a secondary product of nebula siphon.',
        '{bodySilver} is easier to store and transport than photonic fluids, but contains a lower energy density.',
        '{aurora} It still carries the residual warmth of the spiral galaxy - and a little stubbornness from the vacuum.',
    ]);;
        console.log('[山海] Photon Registered');
    } catch(e) {
        console.error('[Shan Hai] Photon registration failed:' + e);
    }
    // 中央有限曲线                                                                                                                                  
        e.create('dishanhai:central_finite_curve')                                                                                                   
        .displayName('&$magic-central finite curve')
        .texture('dishanhai_item:item/central_finite_curve')
        DShanhaiItemTooltipAPI.register('dishanhai:central_finite_curve', [
        "{magic} ∞ central finite curve ∞{/}",
        "{bodySilver} It is the convergence point of all world lines,{/}",
        "{bodySilver} Where all possibilities come together. {/}",
        "{magic} On this curve, everything is possible, everything is destined. {/}"
       ]);
    // ===== 测试物品 =====
    try {
        e.create('dishanhai:test_item')
            .displayName('&$ultimate-test items')
            .texture('minecraft:item/barrier')
        TooltipAPI.register('dishanhai:test_item', [
            '{ultimate} This is a line of ultimate rainbow test text',
            '{bodySilver} Main text silver test text',
            '{golden} gold color test text'
        ]);
    } catch(e) {
        console.error('[Shan Hai] Test item registration failed:' + e);
    }

    // ===== 黑洞遏制场种子/坍缩器 =====
    e.create('dishanhai:bhd_hyper_seed')
        .texture('dishanhai_item:item/hyperstable_black_hole_seed')
        .displayName('Hyperstable Black Hole Seed')
    TooltipAPI.register('dishanhai:bhd_hyper_seed', [
        '{ultimateRainbow} The singularity wrapped in the event horizon can open a metastable black hole with the help of space-time catalysis',
        '{golden} is put into the input bus of the metastable black hole containment field to activate the black hole',
        '{red} Warning: The black hole will continue to decay after it is opened, and molten space-time needs to be provided to maintain stability.',
    ]);

    e.create('dishanhai:bhd_collapser')
        .texture('dishanhai_item:item/black_hole_collapser')
        .displayName('black hole collapser')
    TooltipAPI.register('dishanhai:bhd_collapser', [
        '{ultimateRainbow} forcibly reverses the gravitational field of the event horizon, causing the black hole to collapse within 1 second',
        '{golden} put into the input bus of the metastable black hole containment field to shut down the black hole',
        '{aqua} stability and time and space consumption will be reset after closing',
    ]);

    e.create('dishanhai:hyperdimensional_calibration_matrix')
        .texture('dishanhai_item:item/hyperdimensional_calibration_matrix')
        .displayName('Hyperdimensional calibration matrix')
    TooltipAPI.register('dishanhai:hyperdimensional_calibration_matrix', [
        '{ultimateRainbow}',
        '{golden}',
    ])

e.create('dishanhai:casing_empty_quark_emission_catalyst')
.displayName('Empty quarks release catalyst shell')
.texture('dishanhai_item:item/casing_empty_quark_emission_catalyst')
TooltipAPI.register('dishanhai:casing_empty_quark_emission_catalyst', [
    '{golden} empty quark release catalyst shell',
    '{bodySilver} is used to wrap the quark release catalyst to prevent it from being destroyed',
])

e.create('dishanhai:up_quark_emission_catalyst')
.displayName('Up-quark release catalyst')
.texture('dishanhai_item:item/up_quark_emission_catalyst')
TooltipAPI.register('dishanhai:up_quark_emission_catalyst', [
    '{golden} up-quark release catalyst',
    '{bodySilver} is used to release up-quark catalysts to reshape matter',
])

e.create('dishanhai:down_quark_emission_catalyst')
.displayName('Down-Quark Release Catalyst')
.texture('dishanhai_item:item/down_quark_emission_catalyst')
TooltipAPI.register('dishanhai:down_quark_emission_catalyst', [
    '{golden} Next-quark release catalyst',
    '{bodySilver} is used to release down-quark catalysts to reshape matter',
])

 e.create('dishanhai:strange_quark_emission_catalyst')
.displayName('Strange-quark release catalyst')
.texture('dishanhai_item:item/ange_quark_emission_catalyst')
TooltipAPI.register('dishanhai:strange_quark_emission_catalyst', [
    '{golden} Strange-quark release catalyst',
    '{bodySilver} is used to release strange-quark catalysts to reshape matter',
])

e.create('dishanhai:charm_quark_emission_catalyst')
.displayName('Charm-quark release catalyst')
.texture('dishanhai_item:item/charm_quark_emission_catalyst')
TooltipAPI.register('dishanhai:charm_quark_emission_catalyst', [
    '{golden} charm-quark release catalyst',
    '{bodySilver} is used to release charm-quark catalysts to reshape matter',
])

e.create('dishanhai:bottom_quark_emission_catalyst')
.displayName('Bottom-quark release catalyst')
.texture('dishanhai_item:item/bottom_quark_emission_catalyst')
TooltipAPI.register('dishanhai:bottom_quark_emission_catalyst', [
    '{golden} bottom-quark release catalyst',
    '{bodySilver} is used to release bottom-quark catalysts to reshape matter',
])

 e.create('dishanhai:top_quark_emission_catalyst')
.displayName('Top-quark release catalyst')
.texture('dishanhai_item:item/top_quark_emission_catalyst')
TooltipAPI.register('dishanhai:top_quark_emission_catalyst', [
    '{golden} top-quark release catalyst',
    '{bodySilver} is used to release top-quark catalysts to reshape matter',
])

e.create('dishanhai:misaligned_quark_emission_catalyst')
.displayName('Non-aligned quark release catalyst')
.texture('dishanhai_item:item/misaligned_quark_emission_catalyst')
TooltipAPI.register('dishanhai:misaligned_quark_emission_catalyst', [
    '{golden} non-aligned quark release catalyst',
    '{bodySilver} needs to be realigned before use',
])

e.create('dishanhai:dog_coins')
.displayName('Doge coin')
.texture('dishanhai_item:item/dog_coins')
TooltipAPI.register('dishanhai:dog_coins', [
    '{golden} Doge Coin',
    '{bodySilver} So much money-doge',
    '',
    '{bodySilver} Doge coin is a cryptocurrency based on the Doge network',
    '{bodySilver} Doge coin network consists of Doge nodes, each node has its own Doge coin wallet',
    '{bodySilver} kabosu will watch the transactions of Doge nodes and add transaction records to the blockchain of Doge coins.',
    '',
    '{bodySilver} kabosu (doge prototype) - left the Doge network on May 24, 2024 - condolences',
])

e.create('dishanhai:hydrogen_ion')
.displayName('hydrogen ions')
.texture('dishanhai_item:item/hydrogen_ion')
.tag('dishanhai:particles')
DShanhaiItemTooltipAPI.register('dishanhai:hydrogen_ion', [
    '{golden} hydrogen ions{/}',
    '{bodySilver} a hydrohen ion with {/} {rainbow} unknown{/} {bodySilver} charge{/}',
])

e.create('dishanhai:helium_ion')
.displayName('Helium ions')
.texture('dishanhai_item:item/helium_ion')
.tag('dishanhai:particles')
DShanhaiItemTooltipAPI.register('dishanhai:helium_ion', [
    '{golden} Helium ions{/}',
    '{bodySilver} a helium ion with {/} {rainbow} unknown{/} {bodySilver} charge{/}',
])

e.create('dishanhai:graviton')
.displayName('graviton')
.texture('dishanhai_item:item/graviton')
.tag('dishanhai:particles')
DShanhaiItemTooltipAPI.register('dishanhai:graviton', [
    '{golden} graviton{/}',
    '{bodySilver} Gravity carrier boson, spin 2, zero mass (hypothetical){/}',
])

e.create('dishanhai:up_quark')
.displayName('Up (u) quark')
.texture('dishanhai_item:item/up_quark')
.tag('dishanhai:particles')
DShanhaiItemTooltipAPI.register('dishanhai:up_quark', [
    '{golden} up quark (u){/}',
    '{bodySilver} One of the lightest quarks{/}',
    '{bodySilver} Charge: +2/3 | Spin: 1/2{/}',
])

e.create('dishanhai:down_quark')
.displayName('Down (d) quark')
.texture('dishanhai_item:item/down_quark')
.tag('dishanhai:particles')
DShanhaiItemTooltipAPI.register('dishanhai:down_quark', [
    '{golden} down quark (d){/}',
    '{bodySilver} The first generation of quarks{/}',
    '{bodySilver} Charge: -1/3 | Spin: 1/2{/}',
])

e.create('dishanhai:charm_quark')
  .displayName('charm (c) quark')
  .texture('dishanhai_item:item/charm_quark')
.tag('dishanhai:particles')
DShanhaiItemTooltipAPI.register('dishanhai:charm_quark', [
    '{golden} charm quark (c){/}',
    '{bodySilver} Second-generation quarks, charge +2/3, weak decay of charm-containing particles{/}',
])


e.create('dishanhai:strange_quark')
  .displayName('odd(s) quark')
  .texture('dishanhai_item:item/strange_quark')
.tag('dishanhai:particles')
DShanhaiItemTooltipAPI.register('dishanhai:strange_quark', [
    '{golden} strange quark (s){/}',
    '{bodySilver} Second generation quarks, charge -1/3, with singular numbers{/}',
    '{bodySilver} Spin: 1/2 | Participate in strong interaction{/}',
])

e.create('dishanhai:bottom_quark')
  .displayName('Bottom (d) quark')
  .texture('dishanhai_item:item/bottom_quark')
  .tag('dishanhai:particles')
DShanhaiItemTooltipAPI.register('dishanhai:bottom_quark', [
    '{golden} bottom quark (b){/}',
    '{bodySilver} Third-generation quark, charge -1/3, composition of B meson and bottom even prime {/}',
    '{bodySilver} Spin: 1/2 | Larger mass{/}',
])

e.create('dishanhai:top_quark')
  .displayName('top(t) quark')
  .texture('dishanhai_item:item/top_quark')
  .tag('dishanhai:particles')
DShanhaiItemTooltipAPI.register('dishanhai:top_quark', [
    '{golden} top quark (t){/}',
    '{bodySilver} The third generation quark, charge +2/3, the heaviest quark known{/}',
    '{bodySilver} Spin: 1/2 | Very short life and does not form a bound state{/}',
])

e.create('dishanhai:electron')
  .displayName('electronic')
  .texture('dishanhai_item:item/electron')
  .tag('dishanhai:particles')
DShanhaiItemTooltipAPI.register('dishanhai:electron', [
    '{golden} Electronics (e⁻){/}',
    '{bodySilver} The first generation of charged leptons, charge -1, spin 1/2{/}',
])

e.create('dishanhai:electron_neutrino')
  .displayName('electron neutrino')
  .texture('dishanhai_item:item/electron_neutrino').tag('dishanhai:particles')
DShanhaiItemTooltipAPI.register('dishanhai:electron_neutrino', [
    '{golden} electron neutrino (νₑ){/}',
    '{bodySilver} The first generation neutrino is electrically neutral and has extremely small mass{/}',
])

e.create('dishanhai:muon')
  .displayName('muon')
  .texture('dishanhai_item:item/muon').tag('dishanhai:particles')
DShanhaiItemTooltipAPI.register('dishanhai:muon', [
    '{golden} muon (μ⁻){/}',
    '{bodySilver} The second generation of charged leptons, charge -1, unstable{/}',
])

e.create('dishanhai:muon_neutrino')
  .displayName('muon neutrino')
  .texture('dishanhai_item:item/muon_neutrino').tag('dishanhai:particles')
DShanhaiItemTooltipAPI.register('dishanhai:muon_neutrino', [
    '{golden} muon neutrino (ν_μ){/}',
    '{bodySilver} Second-generation neutrinos, associated with muons{/}',
])

e.create('dishanhai:tau')
  .displayName('τ子')
  .texture('dishanhai_item:item/tau').tag('dishanhai:particles')
DShanhaiItemTooltipAPI.register('dishanhai:tau', [
    '{golden} τ子 (τ⁻){/}',
    '{bodySilver} The third generation of charged leptons, charge -1, extremely heavy and unstable{/}',
])

e.create('dishanhai:tau_neutrino')
  .displayName('tau neutrino')
  .texture('dishanhai_item:item/tau_neutrino').tag('dishanhai:particles')
DShanhaiItemTooltipAPI.register('dishanhai:tau_neutrino', [
    '{golden} τ neutrino (ν_τ){/}',
    '{bodySilver} The third generation of neutrinos, associated with tau{/}',
])

e.create('dishanhai:gluon')
  .displayName('gluons')
  .texture('dishanhai_item:item/gluon').tag('dishanhai:particles')
DShanhaiItemTooltipAPI.register('dishanhai:gluon', [
    '{golden} Gluons (g){/}',
    '{bodySilver} Strongly interacting gauge boson, spin 1, with color charge{/}',
])

e.create('dishanhai:photon_rainbow')
  .displayName('Photon')
  .texture('dishanhai_item:item/photon_rainbow').tag('dishanhai:particles')
DShanhaiItemTooltipAPI.register('dishanhai:photon_rainbow', [
    '{golden} Photon (γ){/}',
    '{bodySilver} medium particle for electromagnetic interaction, spin 1, zero mass{/}',
])

e.create('dishanhai:z_boson')
  .displayName('Z boson')
  .texture('dishanhai_item:item/z_boson').tag('dishanhai:particles')
DShanhaiItemTooltipAPI.register('dishanhai:z_boson', [
    '{golden} Z boson (Z⁰){/}',
    '{bodySilver} Weakly interacting medium particle, spin 1, electrically neutral{/}',
    '{bodySilver} transmits weak neutral flow with large mass{/}',
])

e.create('dishanhai:w_boson')
  .displayName('W boson')
  .texture('dishanhai_item:item/w_boson').tag('dishanhai:particles')
DShanhaiItemTooltipAPI.register('dishanhai:w_boson', [
    '{golden} W boson (W⁺ / W⁻){/}',
    '{bodySilver} Weakly interacting gauge boson, spin 1, charge ±1{/}',
    '{bodySilver} participates in weakly charged processes such as beta decay{/}',
])

e.create('dishanhai:higgs_boson')
  .displayName('Higgs boson')
  .texture('dishanhai_item:item/higgs_boson').tag('dishanhai:particles')
DShanhaiItemTooltipAPI.register('dishanhai:higgs_boson', [
    '{golden} Higgs boson (H⁰){/}',
    '{bodySilver} scalar boson, spin 0, originates from the Higgs mechanism{/}',
    '{bodySilver} The core of the mechanism that gives mass to elementary particles{/}',
])

e.create('dishanhai:proton')
  .displayName('proton')
  .texture('dishanhai_item:item/proton').tag('dishanhai:particles')
DShanhaiItemTooltipAPI.register('dishanhai:proton', [
    '{golden} proton (p){/}',
    '{bodySilver} baryon, composed of uud quarks, charge +1{/}',
    '{bodySilver} Stable component of atomic nucleus, spin 1/2{/}',
])

e.create('dishanhai:neutron')
  .displayName('neutron')
  .texture('dishanhai_item:item/neutron').tag('dishanhai:particles')
DShanhaiItemTooltipAPI.register('dishanhai:neutron', [
    '{golden} neutron (n){/}',
    '{bodySilver} baryon, composed of udd quarks, electrically neutral{/}',
    '{bodySilver} Free neutrons are unstable, with an average lifespan of about 14.7 minutes{/}',
])

e.create('dishanhai:lambda_particle')
  .displayName('lambda particle')
  .texture('dishanhai_item:item/lambda_particle').tag('dishanhai:particles')
DShanhaiItemTooltipAPI.register('dishanhai:lambda_particle', [
    '{golden} λ particle (Λ⁰){/}',
    '{bodySilver} Strange baryon, composed of uds quarks, strange number -1{/}',
    '{bodySilver} decays through weak interaction, typical lifetime ~2.6×10⁻¹⁰ s{/}',
])

e.create('dishanhai:omega_particle')
  .displayName('Ω particles')
  .texture('dishanhai_item:item/omega_particle').tag('dishanhai:particles')
DShanhaiItemTooltipAPI.register('dishanhai:omega_particle', [
    '{golden} Ω particles (Ω⁻){/}',
    '{bodySilver} triple strange baryon, composed of sss quarks, strange number -3{/}',
    '{bodySilver} spin 3/2, revealing the tenfold structure of SU(3) flavor{/}',
])

e.create('dishanhai:pion')
  .displayName('pion')
  .texture('dishanhai_item:item/pion').tag('dishanhai:particles')
DShanhaiItemTooltipAPI.register('dishanhai:pion', [
    '{golden} π meson (π⁺, π⁰, π⁻){/}',
    '{bodySilver} The lightest meson, quark-antiquark bound state{/}',
    '{bodySilver} The main medium of long-range interaction in nuclear forces{/}',
])

e.create('dishanhai:eta_meson')
  .displayName('eta meson')
  .texture('dishanhai_item:item/eta_meson').tag('dishanhai:particles')
DShanhaiItemTooltipAPI.register('dishanhai:eta_meson', [
    '{golden} η meson (η){/}',
    '{bodySilver} Electrically neutral pseudostandard meson, superposition state containing u, d, s quarks{/}',
    '{bodySilver} has a larger mass than π mesons and is related to the U(1)ₐ anomaly{/}',
])

e.create('dishanhai:unknown_particle')
  .displayName('unknown particle')
  .texture('dishanhai_item:item/unknown_particle').tag('dishanhai:particles')
DShanhaiItemTooltipAPI.register('dishanhai:unknown_particle', [
    '{golden} unknown particle (?){/}',
    '{bodySilver} Particles whose properties have not yet been discovered seem to be outside the standard model{/}',
    '{bodySilver} Insufficient data cannot be classified...{/}',
])

e.create('dishanhai:copper_coin')
  .displayName('Copper GT Coin')
  .texture('dishanhai_item:item/copper_coin')

DShanhaiItemTooltipAPI.register('dishanhai:copper_coin', [
    '{golden} Bronze GT Coin{/}',
    '{bodySilver} Basic industrial currency, made of copper, widely circulated{/}',
    '{bodySilver} Lowest value but indispensable{/}',
])

e.create('dishanhai:cupronickel_coin')
  .displayName('White Copper GT Coin')
  .texture('dishanhai_item:item/cupronickel_coin')

DShanhaiItemTooltipAPI.register('dishanhai:cupronickel_coin', [
    '{golden} White Bronze GT Coin{/}',
    '{bodySilver} Currency made of white copper alloy, hard and wear-resistant{/}',
    '{bodySilver} is used for GregTech energy trading or multi-block equipment payment{/}',
])

e.create('dishanhai:silver_coin')
  .displayName('Silver GT Coin')
  .texture('dishanhai_item:item/silver_coin')

DShanhaiItemTooltipAPI.register('dishanhai:silver_coin', [
    '{golden} Silver GT Coin{/}',
    '{bodySilver} Silver currency, excellent electrical conductivity{/}',
    '{bodySilver} is often used for medium-value transactions and special blueprint purchases{/}',
])


e.create('dishanhai:gold_coin')
  .displayName('Gold GT Coin')
  .texture('dishanhai_item:item/gold_coin')

DShanhaiItemTooltipAPI.register('dishanhai:gold_coin', [
    '{golden} Gold GT Coin{/}',
    '{bodySilver} gold currency, high-value standard currency{/}',
    '{bodySilver} The medium of exchange for most high-end components and rare resources{/}',
])

e.create('dishanhai:platinum_coin')
  .displayName('Platinum GT Coin')
  .texture('dishanhai_item:item/platinum_coin')

DShanhaiItemTooltipAPI.register('dishanhai:platinum_coin', [
    '{golden} Platinum GT Coin{/}',
    '{bodySilver} Platinum currency, corrosion-resistant, high-density{/}',
    '{bodySilver} is used to pay for top-level equipment or extra-dimensional materials{/}',
])

e.create('dishanhai:osmium_coin')
  .displayName('Osmium GT Coin')
  .texture('dishanhai_item:item/osmium_coin')

DShanhaiItemTooltipAPI.register('dishanhai:osmium_coin', [
    '{golden} Osmium GT Coin{/}',
    '{bodySilver} Osmium currency, with both hardness and density{/}',
    '{bodySilver} Transaction coins involving time and space distortion or extremely high-pressure processes{/}',
])

e.create('dishanhai:naquadah_coin')
  .displayName('Silicon Rock GT Coin')
  .texture('dishanhai_item:item/naquadah_coin')

DShanhaiItemTooltipAPI.register('dishanhai:naquadah_coin', [
    '{golden} Silicon Rock GT Coin{/}',
    '{bodySilver} is made of silica (Naquadah) and contains abnormal energy{/}',
    '{bodySilver} is rarely circulated and is more commonly found in interdimensional commerce or the Shadow Conclave{/}',
])

e.create('dishanhai:neutronium_coin')
  .displayName('Neutron GT Coin')
  .texture('dishanhai_item:item/neutronium_coin')

DShanhaiItemTooltipAPI.register('dishanhai:neutronium_coin', [
    '{golden} Neutron GT Coin{/}',
    '{bodySilver} is compressed from neutron degenerate matter, and its density approaches the theoretical limit{/}',
    '{bodySilver} is used for the ultimate transaction - it is said that even gravity can be bought {/}',
])

e.create('dishanhai:magmatter_coin')
  .displayName('Magnetic material GT coin')
  .texture('dishanhai_item:item/magmatter_coin')
DShanhaiItemTooltipAPI.register('dishanhai:magmatter_coin', [
    '{golden} Magnetic Material GT Coin{/}',
    '{bodySilver} is made of magnetically bound stellar matter, with dark molten light flowing on the surface{/}',
])

e.create('dishanhai:magnetohydrodynamicallyconstrainedstarmatter_coin')
  .displayName('Magnetic Fluid Confined Stellar Matter GT Coin')
  .texture('dishanhai_item:item/magnetohydrodynamicallyconstrainedstarmatter_coin')
DShanhaiItemTooltipAPI.register('dishanhai:magnetohydrodynamicallyconstrainedstarmatter_coin', [
    '{golden} Magnetic Fluid Constrained Stellar Matter GT Coin{/}',
    '{bodySilver} is made of magnetic fluid constraining stellar matter, and high-energy stellar fluid surges on the coin surface{/}',
])

e.create('dishanhai:primordialmatter_coin')
  .displayName('Fluid Origin Material Coin')
  .texture('dishanhai_item:item/primordialmatter_coin')
DShanhaiItemTooltipAPI.register('dishanhai:primordialmatter_coin', [
    '{golden} Fluid Origin Material Coin{/}',
    '{bodySilver} is made of fluid original material, and the blue and white stars before the creation of the coin are surging on the surface{/}',
])

e.create('dishanhai:spacetime_coin')
  .displayName('Time and Space GT Coin')
  .texture('dishanhai_item:item/spacetime_coin')
DShanhaiItemTooltipAPI.register('dishanhai:spacetime_coin', [
    '{golden} Time and Space GT Coin{/}',
    '{bodySilver} is made of liquefied time and space, and the coin surface flashes between the past and the future{/}',
])

e.create('dishanhai:transcendentmetal_coin')
  .displayName('Super Dimension GT Coin')
  .texture('dishanhai_item:item/transcendentmetal_coin')
DShanhaiItemTooltipAPI.register('dishanhai:transcendentmetal_coin', [
    '{golden} Super Dimension GT Coin{/}',
    '{bodySilver} is made of extra-dimensional matter, and the coin body shows a three-dimensional phase shift{/}',
])

e.create('dishanhai:cosmic_coin')
  .displayName('Universe GT Coin')
  .texture('dishanhai_item:item/cosmic_coin')
DShanhaiItemTooltipAPI.register('dishanhai:cosmic_coin', [
    '{golden} Universe GT Coin{/}',
    '{bodySilver} is made of cosmic matter, and the surface of the coin is covered with light patterns of the sea of ​​stars{/}',
])

e.create('dishanhai:neutron_coin')
  .displayName('Cosmic Neutron GT Coin')
  .texture('dishanhai_item:item/neutron_coin')
DShanhaiItemTooltipAPI.register('dishanhai:neutron_coin', [
    '{golden} Cosmic Neutron GT Coin{/}',
    '{bodySilver} is made of cosmic neutrons, and the cosmic neutron light flows on the coin surface{/}',
])

e.create('dishanhai:eternity_coin')
  .displayName('Eternal GT Coin')
  .texture('dishanhai_item:item/eternity_coin')
DShanhaiItemTooltipAPI.register('dishanhai:eternity_coin', [
    '{golden} Eternal GT Coin{/}',
    '{bodySilver} is made of eternal fluid, with endless purple-green star vortices circulating on the surface of the coin{/}',
])

e.create('dishanhai:chaos_coin')
  .displayName('Chaos Matter Coin')
  .texture('dishanhai_item:item/chaos_coin')
DShanhaiItemTooltipAPI.register('dishanhai:chaos_coin', [
    '{golden} Chaos Material Coin{/}',
    '{bodySilver} is made of chaotic matter, with indescribable white star marks shining on the surface{/}',
])

e.create('dishanhai:star_gate_crystal_slurry_coin')
  .displayName('Star Gate Crystal Coin')
  .texture('dishanhai_item:item/star_gate_crystal_slurry_coin')

DShanhaiItemTooltipAPI.register('dishanhai:star_gate_crystal_slurry_coin', [
    '{golden} Star Gate Crystal Coin{/}',
    '{bodySilver} is made of star gate crystal slurry, and the rainbow crystal light flowing on the coin surface leads to the star gate{/}',
])

e.create('dishanhai:infinite_coin')
  .displayName('Endless GT Coins')
  .texture('dishanhai_item:item/infinite_coin')
  DShanhaiItemTooltipAPI.register('dishanhai:infinite_coin', [
    '{golden} Endless GT Coins{/}',
    '{bodySilver} Made of endless matter, "What is in your palm is the power of the universe"{/}',
])

e.create('dishanhai:coin_secondary')
  .displayName('Nothingness GT Coin')
  .texture('dishanhai_item:item/coin_secondary')


e.create('dishanhai:stupid_coin')
  .displayName('Stupid RMB')
  .texture('dishanhai_item:item/stupid_coin')

DShanhaiItemTooltipAPI.register('dishanhai:stupid_coin', [

    '{golden} Stupid RMB{/}',
    '{bodySilver} Pure stupid RMB, worthless{/}',
])


e.create('dishanhai:sadbapycat_token')
  .displayName('SadBapyCat Token')
  .texture('dishanhai_item:item/sadbapycat_token')

DShanhaiItemTooltipAPI.register('dishanhai:sadbapycat_token', [
    '{golden} SadBapyCat Token{/}',
    '{bodySilver} A commemorative coin left behind by a sad kitten, with no actual value{/}',
    '{bodySilver} But who has the heart to throw it away? {/}',
])

e.create('dishanhai:naan')
  .displayName('Naan')
  .texture('dishanhai_item:item/naan')
DShanhaiItemTooltipAPI.register('dishanhai:naan', [
    '{golden} Nang{/}',
    '{bodySilver} He holds the oil, but can’t he scoop up the naan{/}',
])

e.create('dishanhai:proxy_resonance_core_mk1')
  .displayName('&$cosmic-Agent Resonance Core MK1')
  .texture('dishanhai_item:item/proxy_resonance_core_mk1')
  .maxStackSize(1)
  .fireResistant(true)
DShanhaiItemTooltipAPI.register('dishanhai:proxy_resonance_core_mk1', [
    '{golden} Agent Resonance Core MK1{/}',
    '{bodySilver} is placed in the agent executor\'s amplification slot to increase the agent\'s parallel multiplication rate to 16x{/}',
    '{ultimateRainbow} When the target machine is fully stacked, the agent parallelism can reach 524288{/}'
])

e.create('dishanhai:proxy_resonance_core_mk1a')
  .displayName('&$cosmic-Agent Resonance Core MK1A')
  .texture('dishanhai_item:item/proxy_resonance_core_mk1a')
  .maxStackSize(1)
  .fireResistant(true)
DShanhaiItemTooltipAPI.register('dishanhai:proxy_resonance_core_mk1a', [
    '{golden} Agent Resonance Core MK1A{/}',
    '{bodySilver} is placed in the agent executor\'s amplification slot to increase the agent\'s parallel multiplication rate to 32x{/}',
    '{ultimateRainbow} When the target machine is fully stacked, the agent parallelism can reach 1048576{/}'
])

e.create('dishanhai:proxy_resonance_core_mk1b')
  .displayName('&$cosmic-Agent Resonance Core MK1B')
  .texture('dishanhai_item:item/proxy_resonance_core_mk1b')
  .maxStackSize(1)
  .fireResistant(true)
DShanhaiItemTooltipAPI.register('dishanhai:proxy_resonance_core_mk1b', [
    '{golden} Agent Resonance Core MK1B{/}',
    '{bodySilver} is placed in the agent executor\'s amplification slot to increase the agent\'s parallel multiplication rate to 48x{/}',
    '{ultimateRainbow} When the target machine is fully stacked, the agent parallelism can reach 1572864{/}'
])

e.create('dishanhai:proxy_resonance_core_mk2')
  .displayName('&$cosmic-Agent Resonance Core MK2')
  .texture('dishanhai_item:item/proxy_resonance_core_mk2')
  .maxStackSize(1)
  .fireResistant(true)
DShanhaiItemTooltipAPI.register('dishanhai:proxy_resonance_core_mk2', [
    '{golden} Agent Resonance Core MK2{/}',
    '{bodySilver} is placed in the agent executor\'s amplification slot to increase the agent\'s parallel multiplication rate to 256x{/}',
    '{ultimateRainbow} When the target machine is fully stacked, the number of agents in parallel can reach 8388608{/}'
])

e.create('dishanhai:proxy_resonance_core_mk2a')
  .displayName('&$cosmic-Agent Resonance Core MK2A')
  .texture('dishanhai_item:item/proxy_resonance_core_mk2a')
  .maxStackSize(1)
  .fireResistant(true)
DShanhaiItemTooltipAPI.register('dishanhai:proxy_resonance_core_mk2a', [
    '{golden} Agent Resonance Core MK2A{/}',
    '{bodySilver} is placed in the agent executor\'s amplification slot to increase the agent\'s parallel multiplication rate to 512x{/}',
    '{ultimateRainbow} When the target machine is fully stacked, the number of agents in parallel can reach 16777216{/}'
])

e.create('dishanhai:proxy_resonance_core_mk2b')
  .displayName('&$cosmic-Agent Resonance Core MK2B')
  .texture('dishanhai_item:item/proxy_resonance_core_mk2b')
  .maxStackSize(1)
  .fireResistant(true)
DShanhaiItemTooltipAPI.register('dishanhai:proxy_resonance_core_mk2b', [
    '{golden} Agent Resonance Core MK2B{/}',
    '{bodySilver} is placed in the agent executor\'s amplification slot to increase the agent\'s parallel multiplication rate to 768x{/}',
    '{ultimateRainbow} When the target machine is fully stacked, the number of agents in parallel can reach 25165824{/}'
])

e.create('dishanhai:proxy_resonance_core_mk3')
  .displayName('&$ultimate-Agent Resonance Core MK3')
  .texture('dishanhai_item:item/proxy_resonance_core_mk3')
  .maxStackSize(1)
  .fireResistant(true)
DShanhaiItemTooltipAPI.register('dishanhai:proxy_resonance_core_mk3', [
    '{golden} Agent Resonance Core MK3{/}',
    '{bodySilver} is placed in the agent executor\'s amplification slot to increase the agent\'s parallel multiplication rate to 1024x{/}',
    '{ultimateRainbow} When the target machine is fully stacked, the agent parallelism can reach 33554432{/}'
])

e.create('dishanhai:proxy_resonance_core_mk3a')
  .displayName('&$ultimate-Agent Resonance Core MK3A')
  .texture('dishanhai_item:item/proxy_resonance_core_mk3a')
  .maxStackSize(1)
  .fireResistant(true)
DShanhaiItemTooltipAPI.register('dishanhai:proxy_resonance_core_mk3a', [
    '{golden} Agent Resonance Core MK3A{/}',
    '{bodySilver} is placed in the agent executor\'s amplification slot to increase the agent\'s parallel multiplication rate to 2048x{/}',
    '{ultimateRainbow} When the target machine is fully stacked, the number of agents in parallel can reach 67108864{/}'
])

e.create('dishanhai:proxy_resonance_core_mk3b')
  .displayName('&$ultimate-Agent Resonance Core MK3B')
  .texture('dishanhai_item:item/proxy_resonance_core_mk3b')
  .maxStackSize(1)
  .fireResistant(true)
DShanhaiItemTooltipAPI.register('dishanhai:proxy_resonance_core_mk3b', [
    '{golden} Agent Resonance Core MK3B{/}',
    '{bodySilver} is placed in the agent executor\'s amplification slot to increase the agent\'s parallel multiplication rate to 3072x{/}',
    '{ultimateRainbow} When the target machine is fully stacked, the agent parallelism can reach 100663296{/}'
])

e.create('dishanhai:proxy_resonance_core_mk4')
  .displayName('&$ultimate-Agent Resonance Core MK4')
  .texture('dishanhai_item:item/proxy_resonance_core_mk4')
  .maxStackSize(1)
  .fireResistant(true)
DShanhaiItemTooltipAPI.register('dishanhai:proxy_resonance_core_mk4', [
    '{golden} Agent Resonance Core MK4{/}',
    '{bodySilver} is placed in the agent executor\'s amplification slot to increase the agent\'s parallel multiplication rate to 4096x{/}',
    '{ultimateRainbow} When the target machine is fully stacked, the agent parallelism can reach 134217728{/}'
])

e.create('dishanhai:proxy_resonance_core_mk4a')
  .displayName('&$ultimate-Agent Resonance Core MK4A')
  .texture('dishanhai_item:item/proxy_resonance_core_mk4a')
  .maxStackSize(1)
  .fireResistant(true)
DShanhaiItemTooltipAPI.register('dishanhai:proxy_resonance_core_mk4a', [
    '{golden} Agent Resonance Core MK4A{/}',
    '{bodySilver} is placed in the agent executor\'s amplification slot to increase the agent\'s parallel multiplication rate to 8192x{/}',
    '{ultimateRainbow} When the target machine is fully stacked, the number of agents in parallel can reach 268435456{/}'
])

e.create('dishanhai:proxy_resonance_core_mk4b')
  .displayName('&$ultimate-Agent Resonance Core MK4B')
  .texture('dishanhai_item:item/proxy_resonance_core_mk4b')
  .maxStackSize(1)
  .fireResistant(true)
DShanhaiItemTooltipAPI.register('dishanhai:proxy_resonance_core_mk4b', [
    '{golden} Agent Resonance Core MK4B{/}',
    '{bodySilver} is placed in the agent executor\'s amplification slot to increase the agent\'s parallel multiplication rate to 12288x{/}',
    '{ultimateRainbow} When the target machine is fully stacked, the agent parallelism can reach 402653184{/}'
])

e.create('dishanhai:proxy_resonance_core_mk5')
  .displayName('&$ultimate-Agent Resonance Core MK5')
  .texture('dishanhai_item:item/proxy_resonance_core_mk5')
  .maxStackSize(1)
  .fireResistant(true)
DShanhaiItemTooltipAPI.register('dishanhai:proxy_resonance_core_mk5', [
    '{golden} Agent Resonance Core MK5{/}',
    '{bodySilver} is placed in the agent executor\'s amplification slot to increase the agent\'s parallel multiplication rate to 16384x{/}',
    '{ultimateRainbow} When the target machine is fully stacked, the number of agents in parallel can reach 536870912{/}'
])

e.create('dishanhai:proxy_resonance_core_mk5a')
  .displayName('&$ultimate-Agent Resonance Core MK5A')
  .texture('dishanhai_item:item/proxy_resonance_core_mk5a')
  .maxStackSize(1)
  .fireResistant(true)
DShanhaiItemTooltipAPI.register('dishanhai:proxy_resonance_core_mk5a', [
    '{golden} Agent Resonance Core MK5A{/}',
    '{bodySilver} is placed in the agent executor\'s amplification slot to increase the agent\'s parallel multiplication rate to 32768x{/}',
    '{ultimateRainbow} When the target machine is fully stacked, the agent parallelism can reach 1073741824{/}'
])

e.create('dishanhai:proxy_resonance_core_mk5b')
  .displayName('&$ultimate-Agent Resonance Core MK5B')
  .texture('dishanhai_item:item/proxy_resonance_core_mk5b')
  .maxStackSize(1)
  .fireResistant(true)
DShanhaiItemTooltipAPI.register('dishanhai:proxy_resonance_core_mk5b', [
    '{golden} Agent Resonance Core MK5B{/}',
    '{bodySilver} is placed in the agent executor\'s amplification slot to increase the agent\'s parallel multiplication rate to 49152x{/}',
    '{ultimateRainbow} When the target machine is fully stacked, the number of agents in parallel can reach 1610612736{/}'
])

e.create('dishanhai:proxy_resonance_core_mk6')
  .displayName('&$ultimate-Agent Resonance Core MK6')
  .texture('dishanhai_item:item/proxy_resonance_core_mk6')
  .maxStackSize(1)
  .fireResistant(true)
DShanhaiItemTooltipAPI.register('dishanhai:proxy_resonance_core_mk6', [
    '{golden} Agent Resonance Core MK6{/}',
    '{bodySilver} is placed in the agent executor\'s amplification slot to increase the agent\'s parallel multiplication rate to 65536x{/}',
    '{ultimateRainbow} When the target machine is fully stacked, the agent parallelism can reach Integer.MAX_VALUE{/}'
])

e.create('dishanhai:proxy_resonance_core_mk6a')
  .displayName('&$ultimate-Agent Resonance Core MK6A')
  .texture('dishanhai_item:item/proxy_resonance_core_mk6a')
  .maxStackSize(1)
  .fireResistant(true)
DShanhaiItemTooltipAPI.register('dishanhai:proxy_resonance_core_mk6a', [
    '{golden} Agent Resonance Core MK6A{/}',
    '{bodySilver} is placed in the agent executor\'s amplification slot to increase the agent\'s parallel multiplication rate to 131072x{/}',
    '{ultimateRainbow} When the target machine is fully stacked, the agent parallelism can reach Integer.MAX_VALUE{/}'
])

e.create('dishanhai:proxy_resonance_core_mk6b')
  .displayName('&$ultimate-Agent Resonance Core MK6B')
  .texture('dishanhai_item:item/proxy_resonance_core_mk6b')
  .maxStackSize(1)
  .fireResistant(true)
DShanhaiItemTooltipAPI.register('dishanhai:proxy_resonance_core_mk6b', [
    '{golden} Agent Resonance Core MK6B{/}',
    '{bodySilver} is placed in the agent executor\'s amplification slot to increase the agent\'s parallel multiplication rate to 196608x{/}',
    '{ultimateRainbow} When the target machine is fully stacked, the agent parallelism can reach Integer.MAX_VALUE{/}'
])


    TooltipAPI.register("gt_shanhai:black_hole_containment", [
        '',
        '{ultimateRainbow} The stars are not eternal, even light will be silent in a deep enough gravity well',
        '{golden} uses the power of the event horizon to compress the singularity of matter into an infinitely small volume',
        '{sakura} BHC is not to create destruction, but to tame destruction into a tool',
        '{lava} It uses space-time fluid to maintain the boundary, uses the neutron structure to restrain the collapse, and uses the event horizon as the most extreme processing surface',

    ]);

    
    // ===== 七十二变物品注册 =====
    TooltipAPI.register('dishanhai:wanxiang_core', [
        '{electric} Seventy-two Changes·Core of All Things Mind Method',
        '{golden} Everything in heaven and earth can be transformed. Those who have gained this mentality,',
        '{magic} Watch the flow of all things and understand the opportunities of good fortune.',
        '{nature} However, the way to change is not to plunder, but to understand.',
        '{electric} ——Only by understanding the essence of all things can we change the shape of all things.',
    ]);;



})//物品注册回调内

// ===== 流体注册 =====
StartupEvents.registry('fluid', function(event) {

    event.create("dishanhai:zero_point_energy")
        .stillTexture("dishanhai_item:block/fluid/zero_point_energy")
        .flowingTexture("dishanhai_item:block/fluid/zero_point_energy_flow")
        .displayName("vacuum zero point energy").temperature(8000).luminosity(15).bucketColor(0x88ddff)
        .density(10).viscosity(5);
    event.create("dishanhai:light")
        .stillTexture("dishanhai_item:block/fluid/light_fluid")
        .flowingTexture("dishanhai_item:block/fluid/light_fluid_flow")
        .displayName("Light").temperature(0).luminosity(15).bucketColor(0xffffdd)
        .density(1).viscosity(1);
    event.create("dishanhai:liquid_ending")
        .stillTexture("dishanhai_item:block/fluid/liquid_ending")
        .flowingTexture("dishanhai_item:block/fluid/liquid_ending_flow")
        .displayName("liquid terminal").temperature(5000).luminosity(15).bucketColor(0x440011)
        .density(2200).viscosity(1800);

    event.create("dishanhai:matter_fluid_entry")
        .stillTexture("dishanhai_item:block/fluid/matter_fluid_entry")
        .flowingTexture("dishanhai_item:block/fluid/matter_fluid_entry")
        .displayName("Getting Started Material Flow").temperature(300).luminosity(3).bucketColor(0x66bb88)
        .density(800).viscosity(600);
    event.create("dishanhai:matter_fluid_foundation")
        .stillTexture("dishanhai_item:block/fluid/matter_fluid_foundation")
        .flowingTexture("dishanhai_item:block/fluid/matter_fluid_foundation")
        .displayName("basic material flow").temperature(400).luminosity(4).bucketColor(5622920)
        .density(900).viscosity(700);
    event.create("dishanhai:matter_fluid_basic")
        .stillTexture("dishanhai_item:block/fluid/matter_fluid_basic")
        .flowingTexture("dishanhai_item:block/fluid/matter_fluid_basic_flow")
        .displayName("Deducing material flow").temperature(600).luminosity(4).bucketColor(0x44aadd)
        .density(1200).viscosity(800);
    event.create("dishanhai:matter_fluid_virtual")
        .stillTexture("dishanhai_item:block/fluid/matter_fluid_virtual")
        .flowingTexture("dishanhai_item:block/fluid/matter_fluid_virtual_flow")
        .displayName("virtual material flow").temperature(800).luminosity(5).bucketColor(18290)
        .density(1100).viscosity(800);
    event.create("dishanhai:matter_fluid_transmutation")
        .stillTexture("dishanhai_item:block/fluid/matter_fluid_transmutation")
        .flowingTexture("dishanhai_item:block/fluid/matter_fluid_transmutation")
        .displayName("transmutation material flow").temperature(700).luminosity(5).bucketColor(14509619)
        .density(1300).viscosity(900);
    event.create("dishanhai:matter_fluid_darkstar")
        .stillTexture("dishanhai_item:block/fluid/matter_fluid_darkstar")
        .flowingTexture("dishanhai_item:block/fluid/matter_fluid_darkstar_flow")
        .displayName("Dark star material flow").temperature(1100).luminosity(7).bucketColor(4208660)
        .density(2000).viscosity(1500);
    event.create("dishanhai:matter_fluid_advanced")
        .stillTexture("dishanhai_item:block/fluid/matter_fluid_advanced")
        .flowingTexture("dishanhai_item:block/fluid/matter_fluid_advanced_flow")
        .displayName("Reorganize material flow").temperature(1000).luminosity(6).bucketColor(0xdd8844)
        .density(1500).viscosity(1000);
    event.create("dishanhai:matter_fluid_transition")
        .stillTexture("dishanhai_item:block/fluid/matter_fluid_transition")
        .flowingTexture("dishanhai_item:block/fluid/matter_fluid_transition_flow")
        .displayName("Imaginary number transition material flow").temperature(1400).luminosity(8).bucketColor(0x8c3cd0)
        .density(1800).viscosity(1200);
    event.create("dishanhai:matter_fluid_zero")
        .stillTexture("dishanhai_item:block/fluid/matter_fluid_zero")
        .flowingTexture("dishanhai_item:block/fluid/matter_fluid_zero")
        .displayName("Zero material flow").temperature(1500).luminosity(8).bucketColor(8930474)
        .density(2500).viscosity(1800);
    event.create("dishanhai:matter_fluid_ascension")
        .stillTexture("dishanhai_item:block/fluid/matter_fluid_ascension")
        .flowingTexture("dishanhai_item:block/fluid/matter_fluid_ascension")
        .displayName("Ascending dimensional material flow").temperature(2000).luminosity(9).bucketColor(3377390)
        .density(3000).viscosity(2000);
    event.create("dishanhai:matter_fluid_transcend")
        .stillTexture("dishanhai_item:block/fluid/matter_fluid_transcend")
        .flowingTexture("dishanhai_item:block/fluid/matter_fluid_transcend")
        .displayName("trans-limit material flow").temperature(3000).luminosity(11).bucketColor(15610709)
        .density(4000).viscosity(3000);
    event.create("dishanhai:matter_fluid_peak")
        .stillTexture("dishanhai_item:block/fluid/matter_fluid_peak")
        .flowingTexture("dishanhai_item:block/fluid/matter_fluid_peak_flow")
        .displayName("peak material flow").temperature(1700).luminosity(9).bucketColor(11184640)
        .density(3500).viscosity(2500);
    event.create("dishanhai:matter_fluid_eternal")
        .stillTexture("dishanhai_item:block/fluid/matter_fluid_eternal")
        .flowingTexture("dishanhai_item:block/fluid/matter_fluid_eternal")
        .displayName("eternal material flow").temperature(5000).luminosity(13).bucketColor(13412915)
        .density(6000).viscosity(5000);
    event.create("dishanhai:matter_fluid_ultimate")
        .stillTexture("dishanhai_item:block/fluid/matter_fluid_ultimate")
        .flowingTexture("dishanhai_item:block/fluid/matter_fluid_ultimate_flow")
        .displayName("create material flow").temperature(2000).luminosity(10).bucketColor(0xaa44dd)
        .density(2000).viscosity(1400);

    event.create("dishanhai:primal_chaos")
        .stillTexture("dishanhai_item:block/fluid/primal_chaos")
        .flowingTexture("dishanhai_item:block/fluid/primal_chaos_flow")
        .displayName("primordial chaos").temperature(100).luminosity(3).bucketColor(0x332255)
        .density(3000).viscosity(2500);

    event.create("dishanhai:dimensional_fabric")
        .stillTexture("dishanhai_item:block/fluid/dimensional_fabric")
        .flowingTexture("dishanhai_item:block/fluid/dimensional_fabric_flow")
        .displayName("Dimensional texture").temperature(3000).luminosity(10).bucketColor(0x88bbff)
        .density(1800).viscosity(1400);

    event.create("dishanhai:causal_essence")
        .stillTexture("dishanhai_item:block/fluid/causal_essence")
        .flowingTexture("dishanhai_item:block/fluid/causal_essence_flow")
        .displayName("essence of cause and effect").temperature(2000).luminosity(8).bucketColor(0xffaa44)
        .density(2200).viscosity(1800);

    event.create("dishanhai:stabilized_eternity")
        .stillTexture("dishanhai_item:block/fluid/stabilized_eternity")
        .flowingTexture("dishanhai_item:block/fluid/stabilized_eternity_flow")
        .displayName("steady state eternity").temperature(6000).luminosity(12).bucketColor(0xeeeeff)
        .density(2800).viscosity(2200);

    event.create("dishanhai:chaos_fluid")
        .stillTexture("dishanhai_item:block/fluid/chaos_fluid")
        .flowingTexture("dishanhai_item:block/fluid/chaos_fluid_flow")
        .displayName("eternal chaos").temperature(9999).luminosity(15).bucketColor(0x442266)
        .density(3000).viscosity(3000);

    // ===== 世线光刻催化剂（电路增产·方案B） =====
    event.create("dishanhai:wl_catalyst")
        .stillTexture("dishanhai_item:block/fluid/wl_catalyst")
        .flowingTexture("dishanhai_item:block/fluid/wl_catalyst")
        .displayName("ShiLian Lithography Catalyst").temperature(800).luminosity(7).bucketColor(0xffcc44)
        .density(1600).viscosity(900);

    // ===== 寰宇联合冷却液 =====
    event.create("dishanhai:universal_coolant")
        .stillTexture("dishanhai_item:block/fluid/universal_coolant")
        .flowingTexture("dishanhai_item:block/fluid/universal_coolant_flow")
        .displayName("Universal coolant").temperature(0).luminosity(2).bucketColor(0x00aadd)
        .density(1100).viscosity(800);

    // ===== 黑洞时空流体 =====
    event.create("dishanhai:spacetime")
        .stillTexture("dishanhai_item:block/fluid/spacetime")
        .flowingTexture("dishanhai_item:block/fluid/spacetime_flow")
        .displayName("space-time fluid").temperature(0).luminosity(7).bucketColor(0x1a0a2e)
        .density(5000).viscosity(4000);

    console.log('[Shan Hai Private Goods] Fluid registration completed: 13 fluid');
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
console.log('[山海] DShanhaiFluidTooltipAPI type:' + (typeof DShanhaiFluidTooltipAPI) + ', register: ' + (typeof DShanhaiFluidTooltipAPI !== 'undefined' ? typeof DShanhaiFluidTooltipAPI.register : 'N/A'));
try {
    if (typeof DShanhaiFluidTooltipAPI !== 'undefined' && typeof DShanhaiFluidTooltipAPI.register === 'function') {
        DShanhaiFluidTooltipAPI.register("dishanhai:primal_chaos", [
            "The starting point and end point of the world line belong to {aurora} Chaos{/}.",
            "It is not disorder - it is the {magic} original state that transcends order and disorder{/}.",
            "{bodySilver} In this chaos, the first world line began to vibrate...{/}"
        ]);
        DShanhaiFluidTooltipAPI.register("dishanhai:dimensional_fabric", [
            "{water} Dimensional fabric{/}—the cloth of reality, intertwined by the warp and weft of parallel universes.",
            "{bodySilver} Every fiber is a complete chain of cause and effect. {/}",
            "{bodySilver} The essence of transmission across world lines is just taking a step along the texture of the fabric. {/}"
        ]);
        DShanhaiFluidTooltipAPI.register("dishanhai:causal_essence", [
            "{golden} The essence of cause and effect{/}——The underlying logic of the seventy-two changes.",
            "{bodySilver} It defines the boundary conditions that make the {/} {fire} change{/} {bodySilver} possible. {/}",
            "{bodySilver} Every drop of essence carries an unobserved branch of cause and effect. {/}"
        ]);
        DShanhaiFluidTooltipAPI.register("dishanhai:stabilized_eternity", [
            "{neon} Steady Eternity{/}——The balance point found between creation and destruction.",
            "{bodySilver} It is not stationary, but in perfect phase with resonance. {/}",
            "The {bodySilver} creation module builds on this, transforming brief pulses into sustained existence. {/}"
        ]);

        // === 原有 7 流体 ===
        DShanhaiFluidTooltipAPI.register("dishanhai:zero_point_energy", [
            "{aurora} Vacuum zero-point energy{/}—the residual energy of quantum vacuum fluctuations.",
            "{bodySilver} Even in a vacuum of absolute zero, energy never truly returns to zero. {/}",
            "{bodySilver} It's everywhere. It is inexhaustible. It waits silently to be awakened. {/}"
        ]);
        DShanhaiFluidTooltipAPI.register("dishanhai:liquid_ending", [
            "{sunset} Liquid Terminal{/}——The fluid form of the Ring of Terminal.",
            "{bodySilver} It records the end of all reality—not destruction, but completion. {/}",
            "{bodySilver} Every drop is the final page number of a timeline. {/}"
        ]);
        DShanhaiFluidTooltipAPI.register("dishanhai:matter_fluid_entry", [
            "{neon} Introduction to Material Flow{/}——The starting point of the material flow system.",
            "{bodySilver} The most basic carrier of material energy, it has not even learned to speed up in parallel——{/}",
            "{bodySilver} But it carries the beginning of all possibilities. {/}"
        ]);
        
        DShanhaiFluidTooltipAPI.register("dishanhai:matter_fluid_foundation", [
            "{neon} Basic Material Flow{/}——The first step after getting started.",
            "{bodySilver} particles begin to learn to queue, and parallelism is no longer an accident. {/}"
        ]);
        DShanhaiFluidTooltipAPI.register("dishanhai:matter_fluid_transmutation", [
            "{fire} Transmutation Material Flow{/}——The river of transformation of elements.",
            "{bodySilver} It accelerates the transition of electrons outside the nucleus and reorganizes matter at the atomic level. {/}"
        ]);
        DShanhaiFluidTooltipAPI.register("dishanhai:matter_fluid_zero", [
            "{magic} Return to zero material flow{/}——Return to zero state and start a new life.",
            "{bodySilver} resets all deductions to zero and rebuilds the parallel architecture at a higher speed. {/}"
        ]);
        DShanhaiFluidTooltipAPI.register("dishanhai:matter_fluid_ascension", [
            "{water} Ascending dimensional material flow{/}—the fluid state in the gap between dimensions.",
            "{bodySilver} seeks new parallel spaces in higher dimensions. {/}"
        ]);
        DShanhaiFluidTooltipAPI.register("dishanhai:matter_fluid_transcend", [
            "{crimson} Ultra-limited material flow{/}—the ultimate carrier that breaks through all boundaries.",
            "{bodySilver} It does not respect the concurrency cap - because the cap is left behind by it. {/}"
        ]);
        DShanhaiFluidTooltipAPI.register("dishanhai:matter_fluid_eternal", [
            "{golden} Eternal material flow{/}—the fluid form of time.",
            "{bodySilver} It makes parallelism no longer a concept of space, but {/} {ultimateRainbow} existence itself{/} {bodySilver}. {/}"
        ]);
        DShanhaiFluidTooltipAPI.register("dishanhai:matter_fluid_basic", [
            "{water} Primary material flow{/}—the basic carrier of material reorganization.",
            "{bodySilver} It carries the most basic molecular instructions, enough to rearrange common elements. {/}"
        ]);
        DShanhaiFluidTooltipAPI.register("dishanhai:matter_fluid_advanced", [
            "{fire} Advanced Material Flow{/}——active fluid doped with naquadah.",
            "{bodySilver} It can perform more complex recombination instructions at the molecular level, touching on subatomic structures. {/}"
        ]);
        DShanhaiFluidTooltipAPI.register("dishanhai:matter_fluid_transition", [
            "{magic} Imaginary number transition material flow{/}——The transition state between real numbers and imaginary numbers.",
            "{bodySilver} It does not obey the Pauli exclusion principle and any volume can be superimposed on the same point. {/}"
        ]);
        DShanhaiFluidTooltipAPI.register("dishanhai:matter_fluid_ultimate", [
            "{neon} Ultimate Material Flow{/}——The ultimate medium that mixes space-time and magnetic matter.",
            "{bodySilver} It can exist in multiple coordinates at the same time and is a true high-dimensional fluid. {/}"
        ]);
        DShanhaiFluidTooltipAPI.register("dishanhai:matter_fluid_creative", [
            "{ultimateRainbow} Create material flow{/}—the pinnacle of the material flow system.",
            "{bodySilver} It's not bound by any physical laws - give it a recipe and it creates. {/}",
            "Every time the {bodySilver} \"Reality Modification Module\" is run, it rewrites the rules behind the scenes. {/}"
        ]);
        DShanhaiFluidTooltipAPI.register("dishanhai:light", [
            "{aurora} Light{/}—a by-product of vacuum zero-point siphon, a pure condensed matter of electromagnetic radiation.",
            "{bodySilver} It's not an ordinary stream of photons - it's quantum fluorescence trapped by the tension of space. {/}",
            "{bodySilver} The light itself condenses into a fluid, which should be impossible to exist in a natural state. {/}",
            "{bodySilver} It is the source of energy for the God's Forge and the fuel for the Nebula Engine. {/}",
            "{neon} You can’t help but wonder: Is it light, or is it a fool of light by some higher-dimensional being? {/}"
        ]);
        DShanhaiFluidTooltipAPI.register("dishanhai:wl_catalyst", [
            "{golden} Worldline Photolithography Catalyst{/}—the ultimate accelerator for circuit manufacturing processes.",
            "{bodySilver} It dissolves the lines of the Shixian etching matrix into catalytic fluid,{/}",
            "{bodySilver} unlocks the parallel potential buried deep in the crystal lattice during the circuit lithography step. {/}",
            "{water} Each drop represents a calculation that has not yet occurred – waiting to be activated. {/}"
        ]);
        console.log('[山海] 13 fluid tooltip registered');
    }
} catch(e) {
    console.warn('[山海] Fluid tooltip registration failed:' + (e.message || e));
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
    'ae2:portable_item_cell_1k': ', tag: { RepairCost:0,amts:[L;1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L,1L],display:{Name:\'{"text":"Endless Toolkit"}\'}, ic:31L, internalCurrentPower:20000.0d,keys:[{"#c":" ae2:i ",id:" avaritia:infinity_boots "},{"#c":" ae2:i ",id:" avaritia:crystal_pickaxe "},{"#c":" ae2:i ",id:" avaritia:infinity_helmet "},{"#c":" ae2:i ",id:" avaritia:infinity_bucket "},{"#c":" ae2:i ",id:" expatternprovider:infinity_cell ",tag:{record:{"#c":" ae2:i ",id:" fragile_tool:fragile_hammer "}}},{"#c":" ae2:i ",id:" avaritia:infinity_bow "},{"#c":" ae2:i ",id:" expatternprovider:infinity_cell ",tag:{record:{"#c":" ae2:i ",id:" fragile_tool:fragile_wire_cutter "}}},{"#c":" ae2:i ",id:" expatternprovider:infinity_cell ",tag:{record:{"#c":" ae2:i ",id:" fragile_tool:fragile_crowbar "}}},{"#c":" ae2:i ",id:" expatternprovider:infinity_cell ",tag:{record:{"#c":" ae2:i ",id:" fragile_tool:fragile_knife "}}},{"#c":" ae2:i ",id:" expatternprovider:infinity_cell ",tag:{record:{"#c":" ae2:i ",id:" fragile_tool:fragile_wrench "}}},{"#c":" ae2:i ",id:" avaritia:infinity_hoe "},{"#c":" ae2:i ",id:" sophisticatedbackpacks:everlasting_upgrade "},{"#c":" ae2:i ",id:" sophisticatedbackpacks:xp_pump_upgrade ",tag:{direction:"keep", enabled:1b, level:30 }},{"#c":" ae2:i ",id:" avaritia:infinity_pants "},{"#c":" ae2:i ",id:" avaritia:skull_fire_sword ",tag: {Damage:0} },{"#c":" ae2:i ",id:" avaritia:infinity_axe "},{"#c":" ae2:i ",id:" expatternprovider:infinity_cell ",tag:{record:{"#c":" ae2:i ",id:" fragile_tool:fragile_mortar "}}},{"#c":" ae2:i ",id:" sophisticatedbackpacks:tank_upgrade ",tag:{contents:{ Amount:0,FluidName:" minecraft:empty "}}},{"#c":" ae2:i ",id:" expatternprovider:infinity_cell ",tag:{record:{"#c":" ae2:i ",id:" fragile_tool:fragile_file "}}},{"#c":" ae2:i ",id:" sophisticatedbackpacks:advanced_void_upgrade "},{"#c":" ae2:i ",id:" avaritia:infinity_pickaxe "},{"#c":" ae2:i ",id:" avaritia:infinity_totem ",tag: {Damage:0} },{"#c":" ae2:i ",id:" sophisticatedbackpacks:advanced_refill_upgrade ",tag:{filters:{Items:[], Size:12 },targetSlots:{}}},{"#c":" ae2:i ",id:" sophisticatedbackpacks:stack_upgrade_omega_tier "},{"#c":" ae2:i ",id:" sophisticatedbackpacks:inception_upgrade "},{"#c":" ae2:i ",id:" expatternprovider:infinity_cell ",tag:{record:{"#c":" ae2:i ",id:" fragile_tool:fragile_screwdriver "}}},{"#c":" ae2:i ",id:" avaritia:infinity_shovel "},{"#c":" ae2:i ",id:" avaritia:infinity_sword "},{"#c":" ae2:i ",id:" expatternprovider:infinity_cell ",tag:{record:{"#c":" ae2:i ",id:" fragile_tool:fragile_saw "}}},{"#c":" ae2:i ",id:" avaritia:infinity_chestplate "},{"#c":" ae2:i ",id:" expatternprovider:infinity_cell ",tag:{record:{"#c":" ae2:i ",id:" fragile_tool:fragile_mallet "}}}]}',
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
        console.error('[Shanhai SDA] Build failed:' + displayName + ' ' + e);
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
    '§7contains top items for all AE2, GTCEu and related mods',
    '§7source code item types (if incomplete, modules may be missing): §e%count% §7types',
    '§7Each item has been optimized and configured (full modules, full power, full upgrades)',
    '§7includes wireless terminals, quantum entanglement, molecular assembly matrix, etc.',
    '&$ultimate-shanhai private goods v2.2——2.7.3 reconstruction'
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
DShanhaiPackRegistry.create("superAE", superAEItems, "Super AE storage array", superAELore)
    .lock("v1.0")
    .build();

DShanhaiPackRegistry.create("skyBase", skyBaseItems, "Tianji gift package", [
    '§7This is a space-based gift package',
    '§7Item Type: §e%count% §7Type',
    '§7contains space-based OP machine items, and the infinite star energy component disk has been written',
    '§8Shanhai private goods v2.3'
])
    .lock("v1.0")
    .build();

DShanhaiPackRegistry.create("piggy", piggyItems, "Piggy gift package", [
    '§7This is a piggy gift package, a gift from King Piggy',
    '§7It is only given to pigs, so are you a pig?',
    '§7Item Type: §e%count% §7Type',
    '§7is generated by CellAPI, and the display is generated by JEIcellAPI',
    '§7If you don’t want your gaming experience to be ruined, don’t use the Piggy Gift Pack',
    '§7Piggy gift pack recipe display has been removed from JEI by default','Although you can see it by looking at the recipe of Piggy Emperor',
    '§8Shanhai Private Goods V2.3——2.7.4 reconstruction'
])
    .lock("v1.0")
    .build();

DShanhaiPackRegistry.create("SDAinline", SDAinline_items, "Singularity Data Center Building Material Array", [
            '§7This is a Singularity data center building material package',
            '§7Item Type: §e%count% §7Type',
            '§7contains all Singularity data center building materials',
            '§8Shanhai private goods v2.7.3'
])
    .lock("v1.0")
    .build();

global.shanhaiPackDefs = {};
['superAE', 'skyBase', 'piggy', 'SDAinline'].forEach(function(id) {
    var p = DShanhaiPackRegistry.get(id);
    if (p) global.shanhaiPackDefs[id] = { nbt: p.nbt(), sdaNbt: '', name: p.name, itemCount: p.typeCount() };
});
if (global.shanhaiPackDefs.superAE) global.shanhaiPackDefs.superAE.sdaNbt = _buildPackSDANBT(superAEItems, 'Super AE storage array', superAELore);
if (global.shanhaiPackDefs.skyBase) global.shanhaiPackDefs.skyBase.sdaNbt = _buildPackSDANBT(skyBaseItems, 'Space-based building materials storage array', [
    '§7This is a space-based gift package',
    '§7Item Type: §e%count% §7Type',
    '§7contains space-based OP machine items, and the infinite star energy component disk has been written',
    '§8Shanhai private goods v2.3'
]);
if (global.shanhaiPackDefs.piggy) global.shanhaiPackDefs.piggy.sdaNbt = _buildPackSDANBT(piggyItems, 'Piggy gift package', [
    '§7This is a piggy gift package, a gift from King Piggy',
    '§7It is only given to pigs, so are you a pig?',
    '§7Item Type: §e%count% §7Type',
    '§8Shanhai private goods V2.3'
]);
if (global.shanhaiPackDefs.SDAinline) global.shanhaiPackDefs.SDAinline.sdaNbt = _buildPackSDANBT(SDAinline_items, 'Singularity data center building materials storage array', [
    '§7Singularity Data Center Building Materials Package',
    '§7Item Type: §e%count% §7Type',
    '§7contains all Singularity data center building materials',
    '§8Shanhai private goods v2.7.3'
]);

global._getItemTag = _getItemTag;

// JEI 兼容 — 委托 Java 侧 NBT 构建器
global.shanhaiJEINBTBuilder = function(items, name, lore) {
    try { return DShanhaiNBTAPI.buildSDAFromList(items, name || null, lore && lore.length > 0 ? lore : [], []); } catch(e) { return ''; }
};

console.log('[Shanhai JEI package data] loaded' + Object.keys(global.shanhaiPackDefs).length + 'package definition');



})();
