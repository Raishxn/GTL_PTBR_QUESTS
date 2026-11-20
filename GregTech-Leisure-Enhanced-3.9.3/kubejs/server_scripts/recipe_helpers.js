// priority: 1000
// 配方公共入口：每次加载重新建立模块目录，供各功能文件登记自己的配方阶段。
// 批量表保留 setter 顺序、实参数量和重复 setter；不要把单数组参数展开成多个参数。
global.gtlPack = {
    recipes: Object.create(null),
    tiers: ["ulv", "lv", "mv", "hv", "ev", "iv", "luv", "zpm", "uv", "uhv", "uev", "uiv", "uxv", "opv", "max"]
        .map((name, index) => [name, index, index === 14 ? "gtlcore" : "gtceu"]),

    // 登记一个功能阶段；名称重复属于整理错误，立即报错以免静默覆盖。
    register(name, loader) {
        if (this.recipes[name]) throw new Error("重复的配方模块：" + name);
        this.recipes[name] = loader;
    },

    // 按入口中列出的顺序执行，配方删除、研究、替换与新增的先后不依赖文件名。
    run(event, order) {
        order.forEach(name => {
            const loader = this.recipes[name];
            if (!loader) throw new Error("缺少配方模块：" + name);
            loader(event);
        });
    },

    // 工作台表中每行直接保存原调用的实参，按原顺序注册有序/无序合成。
    crafting(event, method, rows) {
        // 直接调用 KubeJS 的两种工作台接口，保留实参数量和重载选择。
        if (method === "shaped") rows.forEach(args => event.shaped(args[0], args[1], args[2]));
        else if (method === "shapeless") rows.forEach(args => event.shapeless(args[0], args[1]));
        else throw new Error("未知的工作台配方类型：" + method);
    },

    // 行首是配方编号，其余每格均为一个 setter 的实参数组。
    // 字符串列名读取下一格；数组列 [方法名, ...实参] 是本组共同的固定参数。
    // 例如：列 ["itemInputs", ["duration", 200], "EUt"]，行 ["编号", ["材料"], [30]]。
    batch(gtr, type, columns, rows) {
        const width = 1 + columns.filter(column => typeof column === "string").length;
        rows.forEach(row => {
            if (row.length !== width) throw new Error("配方表列数错误：" + type + "/" + row[0]);
            let recipe = gtr[type](row[0]);
            let index = 1;
            columns.forEach(column => {
                const fixed = Array.isArray(column);
                const method = fixed ? column[0] : column;
                const args = fixed ? column.slice(1) : row[index++];
                if (!Array.isArray(args)) throw new Error("配方参数必须是数组：" + row[0] + "/" + method);
                // KubeJS 的字段 setter 没有标准函数原型；借用标准 apply 保留实参数组。
                recipe = Function.prototype.apply.call(recipe[method], recipe, args);
            });
        });
    }
};
