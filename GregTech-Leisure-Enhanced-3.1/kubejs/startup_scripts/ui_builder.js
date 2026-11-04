// priority: -1
// 提供机器界面的链式配置接口，保留参数校验与占位配置语义。
;(() => {
    const prototype = {
        source(source) {
            if (!source || typeof source !== "string") {
                console.warn("[uiEditor] source 参数应为字符串，已忽略")
            } else this._target.source = source
            return this
        },
        progressBar(texture, direction) {
            if (typeof texture !== "string" || typeof direction !== "string") {
                console.warn("[uiEditor] progressBar 参数应为两个字符串，已忽略")
            } else {
                this._target.progressBar = texture
                this._target.fillDirection = direction
            }
            return this
        },
        sound(sound) {
            if (typeof sound !== "string") console.warn("[uiEditor] sound 参数应为字符串，已忽略")
            else this._target.sound = sound
            return this
        },
        // 保留原有终结方法；配置在调用修改入口时就已加入数组。
        push() {}
    }
    const slotProperties = ["newItemInput", "newItemOutput", "newFluidInput", "newFluidOutput"]
    slotProperties.concat(["progressBarPriority"]).forEach(property => {
        prototype[property] = function(value) {
            const isSlot = property !== "progressBarPriority"
            if (!Number.isInteger(value) || (isSlot && value < 0)) {
                console.warn("[uiEditor] " + property + " 应为" + (isSlot ? "非负" : "") + "整数，已忽略")
            } else this._target[property] = value
            return this
        }
    })
    global.uiEditor = global.uiEditor || {}
    global.uiEditor.machinesToModify = global.uiEditor.machinesToModify || []
    global.uiEditor.modify = function(fieldName) {
        if (!fieldName || typeof fieldName !== "string") {
            console.warn("[uiEditor] modify() 参数 fieldName 必须是字符串，操作已忽略")
            // 无效入口仍能继续链式调用；不创建配置，也不暴露终结方法。
            let ignored = {}
            ;["source", "progressBar", "sound", "progressBarPriority"].concat(slotProperties).forEach(method => {
                ignored[method] = function() { return this }
            })
            return ignored
        }
        const config = { fieldName: fieldName }
        global.uiEditor.machinesToModify.push(config)
        const builder = Object.create(prototype)
        builder._target = config
        return builder
    }
    global.uiEditor.uiEditor_builder = { isLoaded: true }
})()
