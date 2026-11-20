// priority: -3
// 在初始化后合并并应用界面配置；槽位取最大值，样式与音效按原优先级规则处理。
;(function() {
    "use strict"
    if (!global.uiEditor.machinesToModify) {
        console.warn('[uiEditor] 未能找到 global.uiEditor.machinesToModify，进程终止')
        global.uiEditor.isLoaded = false
        return -1
    }
    global.uiEditor.isLoaded = true

    let GuiTextures = Java.loadClass('com.gregtechceu.gtceu.api.gui.GuiTextures')
    let FillDirection = Java.loadClass('com.lowdragmc.lowdraglib.gui.texture.ProgressTexture$FillDirection')
    let ITEM_CAP = Java.loadClass('com.gregtechceu.gtceu.api.capability.recipe.ItemRecipeCapability').CAP
    let FLUID_CAP = Java.loadClass('com.gregtechceu.gtceu.api.capability.recipe.FluidRecipeCapability').CAP

    StartupEvents.postInit(() => {
        // 这些类必须等初始化完成后才能加载
        let GTSoundEntries = Java.loadClass('com.gregtechceu.gtceu.common.data.GTSoundEntries')
        let GTLSoundEntries = Java.loadClass('org.gtlcore.gtlcore.common.data.GTLSoundEntries')
        let GTLAddSoundEntries = Platform.isLoaded('gtladditions') ?
            Java.loadClass('com.gtladd.gtladditions.common.modify.GTLAddSoundEntries') :
            'gtladditionsIsNotLoaded'
        let GTRecipeTypes = Java.loadClass('com.gregtechceu.gtceu.common.data.GTRecipeTypes')
        let GTLRecipeTypes = Java.loadClass('org.gtlcore.gtlcore.common.data.GTLRecipeTypes')
        let GTLAddRecipeTypes = Platform.isLoaded('gtladditions') ?
            Java.loadClass('com.gtladd.gtladditions.common.recipe.GTLAddRecipesTypes') :
            'gtladditionsIsNotLoaded'

        let recipeTypes = [GTRecipeTypes, GTLRecipeTypes, GTLAddRecipeTypes]
        let availableRecipeTypes = recipeTypes.filter(element => typeof element !== 'string')

        // 配方类型类映射表
        let CLASS_MAP = {
            gtm: GTRecipeTypes,
            gtceu: GTRecipeTypes,
            gtl: GTLRecipeTypes,
            gtlcore: GTLRecipeTypes,
            gtladd: GTLAddRecipeTypes,
            gtladditions: GTLAddRecipeTypes
        }
        // 音效映射表
        let SOUND_MAP = {
            'DTPF': [GTLSoundEntries, 'GTLCore', 'GTLSoundEntries'],
            'FUSIONLOOP': [GTLSoundEntries, 'GTLCore', 'GTLSoundEntries'],
            'FORGE_OF_THE_ANTICHRIST': [GTLAddSoundEntries, 'GTLAdditions', 'GTLAddSoundEntries'],
            'QUANTUM_OSCILLATION': [GTLAddSoundEntries, 'GTLAdditions', 'GTLAddSoundEntries'],
            'GENESIS_ENGINE': [GTLAddSoundEntries, 'GTLAdditions', 'GTLAddSoundEntries'],
            'INTER_STELLAR': [GTLAddSoundEntries, 'GTLAdditions', 'GTLAddSoundEntries']
        }

        // 查询失败时回退到零；输入和输出使用相同的错误处理。
        function getMaxCount(recipeType, capability, input) {
            try {
                return input ? recipeType.getMaxInputs(capability) : recipeType.getMaxOutputs(capability)
            } catch (error) {
                console.warn(`[uiEditor] 槽位上限查询失败: ${error}`)
                return 0
            }
        }

        // 仍按首次出现的顺序处理；同字段沿用第一份配置对象与来源。
        let mergedConfigs = []
        let byField = Object.create(null)
        let slotProperties = ["newItemInput", "newItemOutput", "newFluidInput", "newFluidOutput"]
        for (let config of global.uiEditor.machinesToModify) {
            let { fieldName, source } = config
            if (!fieldName || typeof fieldName !== "string") {
                console.warn("[uiEditor] 配置项缺少 source 或 fieldName, 已跳过:", config)
                continue
            }
            if (!source || typeof source !== "string") config.source = undefined
            if (!byField[fieldName]) {
                byField[fieldName] = config
                mergedConfigs.push(config)
                continue
            }
            let target = byField[fieldName]
            slotProperties.forEach(property => {
                target[property] = Math.max(target[property] ?? 0, config[property] ?? 0)
            })
            // 保留原规则：同优先级时后写覆盖，比较基准仍为首份配置的优先级。
            if ((target.progressBarPriority ?? 0) <= (config.progressBarPriority ?? 0)) {
                target.progressBar = config.progressBar
                target.fillDirection = config.fillDirection
                target.sound = config.sound
            }
        }
        console.log("[uiEditor] 配置合并完成，共 " + mergedConfigs.length + " 台机器待修改")

        // 逐个应用修改
        for (let config of mergedConfigs) {
            let { source, fieldName, progressBar, fillDirection, sound } = config

            // 确定配方类型来源
            let recipeTypeClass
            if (source && typeof source === 'string') {
                let recipeType = CLASS_MAP[source.toLowerCase()]
                if (!recipeType) {
                    console.warn(`[uiEditor] ${source} 源不存在, 跳过`)
                    continue
                }
                if (typeof recipeType === 'string') {
                    console.warn(`[uiEditor] ${fieldName} 尝试使用未安装模组的配方类型, 跳过`)
                    continue
                }
                recipeTypeClass = recipeType
            } else {
                for (let recipeType of availableRecipeTypes) {
                    try {
                        if (recipeType[fieldName] !== undefined) {
                            recipeTypeClass = recipeType
                            break
                        }
                    } catch (e) { }
                }
                if (!recipeTypeClass) {
                    console.warn(`[uiEditor] ${fieldName} 不存在, 跳过`)
                    continue
                }
            }
            let recipeType = recipeTypeClass[fieldName]

            // 未指定或字符串槽位沿用原值；先完成缺省查询，再记录修改前的四种槽位。
            let slots = [
                ["newItemInput", ITEM_CAP, true], ["newItemOutput", ITEM_CAP, false],
                ["newFluidInput", FLUID_CAP, true], ["newFluidOutput", FLUID_CAP, false]
            ]
            let desired = slots.map(([property, capability, input]) => {
                let value = config[property]
                return value === undefined || typeof value === "string" ? getMaxCount(recipeType, capability, input) : value
            })
            let current = slots.map(([, capability, input]) => getMaxCount(recipeType, capability, input))
            recipeType.setMaxIOSize(desired[0], desired[1], desired[2], desired[3])
            console.log(`[uiEditor] 修改成功: ${fieldName} => II:${current[0]}->${desired[0]} IO:${current[1]}->${desired[1]}` +
                ` FI:${current[2]}->${desired[2]} FO:${current[3]}->${desired[3]}`)

            // 修改进度条样式
            if (progressBar && fillDirection) {
                try {
                    let texture = GuiTextures[progressBar]
                    let direction = FillDirection[fillDirection]
                    recipeType.setProgressBar(texture, direction)
                    console.log(`[uiEditor] 进度条样式修改成功: ${fieldName} -> ${progressBar}, ${fillDirection}`)
                } catch (error) {
                    console.warn(`[uiEditor] ${fieldName} 的进度条配置无效: ${progressBar}, ${fillDirection}, 跳过`)
                }
            }

            // 修改音效
            if (sound) {
                let modifySound = (entries, entriesDisplayName) => {
                    try {
                        let soundEntry = entries[sound]
                        recipeType.setSound(soundEntry)
                        console.log(`[uiEditor] 音效修改成功: ${fieldName} -> ${sound}`)
                    } catch (err) {
                        console.warn(`[uiEditor] ${fieldName} 的音效配置无效: ${entriesDisplayName}.${sound} 不存在, 跳过`)
                    }
                }
                if (SOUND_MAP[sound]) {
                    let [entries, modId, displayName] = SOUND_MAP[sound]
                    if (entries !== `${modId.toLowerCase()}IsNotLoaded`) {
                        modifySound(entries, displayName)
                    } else {
                        console.warn(`[uiEditor] ${fieldName} 尝试使用来自 ${modId} 的音效, 但模组未安装, 跳过`)
                    }
                } else {
                    modifySound(GTSoundEntries, "GTSoundEntries")
                }
            }
        }
        console.log('[uiEditor] 所有修改完成')
    })
})()
