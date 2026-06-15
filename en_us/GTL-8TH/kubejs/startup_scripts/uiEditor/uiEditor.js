//Version:1.1.1
;
(function() {
	"use strict"
	// 检测global.uiEditor.machinesToModify
	global.uiEditor = global.uiEditor || {}
	if (!global.uiEditor.machinesToModify) {
		console.warn('[uiEditor] Unable to find global.uiEditor.machinesToModify, the process terminated')
		global.uiEditor.isLoaded = false
		return -1
	}
	global.uiEditor.isLoaded = true
	// 预加载类
	const GuiTextures = Java.loadClass('com.gregtechceu.gtceu.api.gui.GuiTextures')
	const FillDirection = Java.loadClass('com.lowdragmc.lowdraglib.gui.texture.ProgressTexture$FillDirection')
	const ITEM_CAP = Java.loadClass('com.gregtechceu.gtceu.api.capability.recipe.ItemRecipeCapability').CAP
	const FLUID_CAP = Java.loadClass('com.gregtechceu.gtceu.api.capability.recipe.FluidRecipeCapability').CAP
	StartupEvents.postInit(() => {
		// 这几个贵物类必须在初始化完成之后才能加载
		// 我假定你加载了gtceu和gtlcore, 我不考虑过于诡异的环境
		const GTSoundEntries = Java.loadClass('com.gregtechceu.gtceu.common.data.GTSoundEntries')
		const GTLSoundEntries = Java.loadClass('org.gtlcore.gtlcore.common.data.GTLSoundEntries')
		const GTLAddSoundEntries = Platform.isLoaded('gtladditions') ?
			Java.loadClass('com.gtladd.gtladditions.common.modify.GTLAddSoundEntries') :
			'gtladditionsIsNotLoaded'
		const GTL_Extend_SoundEntries = Platform.isLoaded('gtlextend') ?
			Java.loadClass('cn.qiuye.gtlextend.common.data.GTL_Extend_SoundEntries') :
			'gtlextendIsNotLoaded'
		const GTRecipeTypes = Java.loadClass('com.gregtechceu.gtceu.common.data.GTRecipeTypes')
		const GTLRecipeTypes = Java.loadClass('org.gtlcore.gtlcore.common.data.GTLRecipeTypes')
		const GTLAddRecipeTypes = Platform.isLoaded('gtladditions') ?
			Java.loadClass('com.gtladd.gtladditions.common.recipe.GTLAddRecipesTypes') :
			'gtladditionsIsNotLoaded'
		const GTLEXrecipeTypes = Platform.isLoaded('gtlextend') ?
			Java.loadClass('cn.qiuye.gtlextend.common.data.GTL_Extend_RecipeTypes') :
			'gtlextendIsNotLoaded'

		//类映射表
		const CLASS_MAP = {
			gtm: GTRecipeTypes,
			gtceu: GTRecipeTypes,
			gtl: GTLRecipeTypes,
			gtlcore: GTLRecipeTypes,
			gtladd: GTLAddRecipeTypes,
			gtladditions: GTLAddRecipeTypes,
			gtlex: GTLEXrecipeTypes,
			gtlextend: GTLEXrecipeTypes
		}
		//音效映射表
		const SOUND_MAP = {
			'DTPF': [GTLSoundEntries, 'GTLCore', 'GTLSoundEntries'],
			'FUSIONLOOP': [GTLSoundEntries, 'GTLCore', 'GTLSoundEntries'],
			'FORGE_OF_THE_ANTICHRIST': [GTLAddSoundEntries, 'GTLAdditions', 'GTLAddSoundEntries'],
			'QUANTUM_OSCILLATION': [GTLAddSoundEntries, 'GTLAdditions', 'GTLAddSoundEntries'],
			'GENESIS_ENGINE': [GTLAddSoundEntries, 'GTLAdditions', 'GTLAddSoundEntries'],
			'INTER_STELLAR': [GTLAddSoundEntries, 'GTLAdditions', 'GTLAddSoundEntries'],
			'KMYY': [GTL_Extend_SoundEntries, 'GTLExtend', 'GTL_Extend_SoundEntries']
		}

		// 获取原有槽位
		function getMaxInputCount(recipeType, CAP) {
			try {
				return recipeType.getMaxInputs(CAP)
			} catch (err) {
				console.warn(`[uiEditor] 意外错误! getMaxInputs 调用失败: ${err}`)
				return 0
			}
		}

		function getMaxOutputCount(recipeType, CAP) {
			try {
				return recipeType.getMaxOutputs(CAP)
			} catch (err) {
				console.warn(`[uiEditor] 意外错误! getMaxOutputs 调用失败: ${err}`)
				return 0
			}
		}

		// 整理数组, 去重
		const rawConfigs = global.uiEditor.machinesToModify
		const compareProperty = ["newItemInput", "newItemOutput", "newFluidInput", "newFluidOutput"]
		let mergedConfigs = []
		let machineList = []

		for (let i = 0; i < rawConfigs.length; i++) {
			let config = rawConfigs[i]
			let {
				source,
				fieldName,
			} = config
			if (!source || typeof source !== 'string' || !fieldName || typeof fieldName !== 'string') {
				console.warn(`[uiEditor] 配置项缺少 source 或 fieldName, 已跳过:`, config)
				continue
			}
			let recipeTypeClass = CLASS_MAP[source.toLowerCase()]
			if (recipeTypeClass === 'gtladditionsIsNotLoaded') {
				console.warn(`[uiEditor] 字段 ${fieldName} 尝试修改 gtladditions 配方, 但模组未安装, 跳过`)
				continue
			}
			if (recipeTypeClass === 'gtlextendIsNotLoaded') {
				console.warn(`[uiEditor] 字段 ${fieldName} 尝试修改 gtlextend 配方, 但模组未安装, 跳过`)
				continue
			}
			if (!recipeTypeClass) {
				console.warn(`[uiEditor] 字段 ${fieldName} 中有未知的源: ${source}, 跳过`)
				continue
			}
			// 如果不存在相应字段直接赋值会报错
			let recipeType
			try {
				recipeType = recipeTypeClass[fieldName]
			} catch (err) {
				console.warn(`[uiEditor] 未找到配方类型字段 ${fieldName}, 来源: ${source}, 跳过`)
				continue
			}

			// 用原始值填充空值和非数字
			// 实际上还解决了0>默认值的问题
			if (config.newItemInput === undefined || typeof config.newItemInput === 'string') {
				config.newItemInput = getMaxInputCount(recipeType, ITEM_CAP)
			}
			if (config.newItemOutput === undefined || typeof config.newItemOutput === 'string') {
				config.newItemOutput = getMaxOutputCount(recipeType, ITEM_CAP)
			}
			if (config.newFluidInput === undefined || typeof config.newFluidInput === 'string') {
				config.newFluidInput = getMaxInputCount(recipeType, FLUID_CAP)
			}
			if (config.newFluidOutput === undefined || typeof config.newFluidOutput === 'string') {
				config.newFluidOutput = getMaxOutputCount(recipeType, FLUID_CAP)
			}

			if (!machineList.includes(fieldName)) {
				// 直接推
				machineList.push(fieldName)
				mergedConfigs.push(config)
			} else {
				// 比对大小覆写iosize
				let index = machineList.indexOf(fieldName)
				compareProperty.forEach(property => {
					let oldVal = mergedConfigs[index][property] ?? 0
					let newVal = config[property] ?? 0
					mergedConfigs[index][property] = Math.max(oldVal, newVal)
				})
				// 比对优先级
				if ((mergedConfigs[index]?.progressBarPriority ?? 0) <= (config?.progressBarPriority ?? 0)) {
					mergedConfigs[index].progressBar = config.progressBar
					mergedConfigs[index].fillDirection = config.fillDirection
					mergedConfigs[index].sound = config.sound
				}
			}
		}
		console.log('Array deduplication is completed, the content is as follows:')
		console.log(JSON.stringify(mergedConfigs, null, 2))

		// 开始添加
		for (let config of mergedConfigs) {
			let {
				source,
				fieldName,
				newItemInput,
				newItemOutput,
				newFluidInput,
				newFluidOutput,
				progressBar,
				fillDirection,
				sound
			} = config

			let recipeType = CLASS_MAP[source.toLowerCase()][fieldName]

			// 读取原始槽位
			// 现在仅用于日志记录了
			let currentII = getMaxInputCount(recipeType, ITEM_CAP)
			let currentIO = getMaxOutputCount(recipeType, ITEM_CAP)
			let currentFI = getMaxInputCount(recipeType, FLUID_CAP)
			let currentFO = getMaxOutputCount(recipeType, FLUID_CAP)

			// 修改槽位
			recipeType.setMaxIOSize(
				newItemInput,
				newItemOutput,
				newFluidInput,
				newFluidOutput
			)
			console.log(`[uiEditor] 修改成功: ${fieldName} => II:${currentII}->${newItemInput} IO:${currentIO}->${newItemOutput} FI:${currentFI}->${newFluidInput} FO:${currentFO}->${newFluidOutput}`)

			// 修改进度条样式
			if (progressBar && fillDirection) {
				let texture
				let direction
				try {
					texture = GuiTextures[progressBar]
					direction = FillDirection[fillDirection]
					recipeType.setProgressBar(texture, direction)
					console.log(`[uiEditor] 进度条样式修改成功: ${fieldName} -> ${progressBar}, ${fillDirection}`)
				} catch (error) {
					console.warn(`[uiEditor] ${fieldName} 的进度条配置无效: ${progressBar}, ${fillDirection}, 跳过`)
				}
			}

			// 修改音效
			if (sound) {
				// 不赋值给某个变量而直接使用函数声明表达式会出现奇异搞笑的问题
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
						modifySound(entries,displayName)
					} else {
						console.warn(`[uiEditor] ${fieldName} 尝试使用来自 ${modId} 的音效, 但模组未安装, 跳过`)
					}
				} else {
					modifySound(GTSoundEntries,"GTSoundEntries")
				}
			}
		}
		console.log('[uiEditor] All modifications completed')
	})
})()