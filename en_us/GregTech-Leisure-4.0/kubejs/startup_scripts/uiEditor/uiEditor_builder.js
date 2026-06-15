// priority: 114514
// Version:1.2.0
const modifyMachine = (function() {
	// 构建器原型
	const machineModifierPrototype = {
		source(src) {
			if (!src || typeof src !== 'string') {
				console.warn(`[uiEditor] source 参数应为字符串，已忽略`)
				return this
			}
			this._target.source = src
			return this
		},
		newItemInput(num) {
			if (!Number.isInteger(num) || num < 0) {
				console.warn(`[uiEditor] newItemInput 应为非负整数，已忽略`)
				return this
			}
			this._target.newItemInput = num
			return this
		},
		newItemOutput(num) {
			if (!Number.isInteger(num) || num < 0) {
				console.warn(`[uiEditor] newItemOutput 应为非负整数，已忽略`)
				return this
			}
			this._target.newItemOutput = num
			return this
		},
		newFluidInput(num) {
			if (!Number.isInteger(num) || num < 0) {
				console.warn(`[uiEditor] newFluidInput 应为非负整数，已忽略`)
				return this
			}
			this._target.newFluidInput = num
			return this
		},
		newFluidOutput(num) {
			if (!Number.isInteger(num) || num < 0) {
				console.warn(`[uiEditor] newFluidOutput 应为非负整数，已忽略`)
				return this
			}
			this._target.newFluidOutput = num
			return this
		},
		progressBar(barName, direction) {
			if (typeof barName !== 'string' || typeof direction !== 'string') {
				console.warn(`[uiEditor] progressBar 参数应为两个字符串，已忽略`)
				return this
			}
			this._target.progressBar = barName
			this._target.fillDirection = direction
			return this
		},
		progressBarPriority(priority) {
			if (!Number.isInteger(priority)) {
				console.warn(`[uiEditor] progressBarPriority 应为整数，已忽略`)
				return this
			}
			this._target.progressBarPriority = priority
			return this
		},
		sound(soundName) {
			if (typeof soundName !== 'string') {
				console.warn(`[uiEditor] sound 参数应为字符串，已忽略`)
				return this
			}
			this._target.sound = soundName
			return this
		},
		push() {
		    // push 已废弃，什么都不做
		}
	}

	/**
	 * 开始配置一台机器（立即在全局数组中创建占位配置）
	 * @param {string} fieldName - 配方类型字段名
	 * @returns {Object} 构建器对象，可直接链式调用配置方法
	 * 
	 * @example
	 * global.uiEditor.modify("BENDER_RECIPES")
	 *     .source("gtm")
	 *     .newItemInput(24)
	 *     .newFluidInput(6)
	 *     .progressBar("PROGRESS_BAR_ARROW", "LEFT_TO_RIGHT")
	 * //不需要push()
	 */
	function createMachineModifier(fieldName) {
		// 参数校验
		if (!fieldName || typeof fieldName !== 'string') {
			console.warn("[uiEditor] modify() parameter fieldName must be a string, the operation has been ignored")
			// 返回一个空操作的构建器，避免报错
			return {
				source: function() { return this },
				newItemInput: function() { return this },
				newItemOutput: function() { return this },
				newFluidInput: function() { return this },
				newFluidOutput: function() { return this },
				progressBar: function() { return this },
				progressBarPriority: function() { return this },
				sound: function() { return this }
			}
		}

		// 创建占位配置对象
		const placeholder = {
			fieldName: fieldName
		}
		// 直接推
		global.uiEditor.machinesToModify.push(placeholder)
		let builder = Object.create(machineModifierPrototype)
		builder._target = placeholder
		return builder
	}

	// 初始化
	global.uiEditor = global.uiEditor || {}
	global.uiEditor.machinesToModify = global.uiEditor.machinesToModify || []
	global.uiEditor.modify = createMachineModifier
	global.uiEditor.uiEditor_builder = { isLoaded: true }
	return createMachineModifier
})()