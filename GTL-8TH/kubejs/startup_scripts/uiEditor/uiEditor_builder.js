// priority: 114514
// Version:1.1.1
(function() {
	// 无论你怎么臆想, JS就是没有真正的类, 因此避免使用class或者类似的语法
	const machineModifierPrototype = {
		//链式调用
		/**
		 * 设置配方类型来源模组
		 * @param {string} src - 来源模组标识, 如'gtm','gtlcore','gtladditions','gtlextend' 必填
		 * @returns {this} 支持链式调用
		 */
		source(src) {
			if (!src || typeof src !== 'string') {
				console.warn(`[uiEditor构造者] source 的参数应为字符串, 某个添加不符合规范, 跳过 source 的设置`)
				return this
			}
			this._config.source = src
			return this
		},
		/**
		 * 设置最大物品输入槽位数
		 * @param {number} num - 槽位数量, 应为非负整数
		 * @returns {this} 支持链式调用
		 */
		newItemInput(num) {
			// 防蠢
			if (!Number.isInteger(num) || num < 0) {
				console.warn(`[uiEditor构造者] newItemInput 应为非负整数, 某个添加不符合规范, 跳过newItemInput的设置`)
				return this
			}
			this._config.newItemInput = num
			return this
		},
		/**
		 * 设置最大物品输出槽位数
		 * @param {number} num - 槽位数量, 应为非负整数
		 * @returns {this} 支持链式调用
		 */
		newItemOutput(num) {
			if (!Number.isInteger(num) || num < 0) {
				console.warn(`[uiEditor构造者] newItemOutput 应为非负整数, 某个添加不符合规范, 跳过newItemOutput的设置`)
				return this
			}
			this._config.newItemOutput = num
			return this
		},
		/**
		 * 设置最大流体输入槽位数
		 * @param {number} num - 槽位数量, 应为非负整数
		 * @returns {this} 支持链式调用
		 */
		newFluidInput(num) {
			if (!Number.isInteger(num) || num < 0) {
				console.warn(`[uiEditor构造者] newFluidInput 应为非负整数, 某个添加不符合规范, 跳过newFluidInput的设置`)
				return this
			}
			this._config.newFluidInput = num
			return this
		},
		/**
		 * 设置最大流体输出槽位数
		 * @param {number} num - 槽位数量, 应为非负整数
		 * @returns {this} 支持链式调用
		 */
		newFluidOutput(num) {
			if (!Number.isInteger(num) || num < 0) {
				console.warn(`[uiEditor构造者] newFluidOutput 应为非负整数, 某个添加不符合规范, 跳过newFluidOutput的设置`)
				return this
			}
			this._config.newFluidOutput = num
			return this
		},
		/**
		 * 设置进度条纹理和填充方向
		 * @param {string} barName - 进度条纹理名称, 必须为 GuiTextures 中的静态字段名
		 * @param {string} direction - 填充方向, 必须为 FillDirection 枚举值
		 * @returns {this} 支持链式调用
		 */
		progressBar(barName, direction) {
			if (typeof barName !== 'string' || typeof direction !== 'string') {
				console.warn(`[uiEditor构造者] progressBar 的参数应为字符串, 但接收到 ${barName}, ${direction}, 不符合规范, 跳过progressBar的设置`)
				return this
			}
			this._config.progressBar = barName
			this._config.fillDirection = direction
			return this
		},
		/**
		 * 设置进度条样式优先级, 用于多配置合并时决策
		 * @param {number} priority - 优先级数值, 越大越优先, 默认为 0
		 * @returns {this} 支持链式调用
		 */
		progressBarPriority(priority) {
			if (!Number.isInteger(priority)) {
				console.warn(`[uiEditor构造者] progressBarPriority 应为整数, 某个添加不符合规范, 跳过progressBarPriority的设置`)
				return this
			}
			this._config.progressBarPriority = priority
			return this
		},
		/**
		 * 设置机器运行音效
		 * @param {string} soundName - GTSoundEntries 中的静态字段名，如 'ARC'、'ASSEMBLER'、'TURBINE'
		 * @returns {this} 支持链式调用
		 */
		sound(soundName) {
			if (typeof soundName !== 'string') {
				console.warn(`[uiEditor构造者] sound 参数应为字符串，已忽略此次设置`)
				return this
			}
			this._config.sound = soundName
			return this
		},
		/**
		 * 将当前配置推入 global.uiEditor.machinesToModify 数组
		 * @returns {Object} 当前配置对象的拷贝
		 */
		push() {
			let config = this._config
			// 防蠢
			if (!config.source) {
				console.warn('[uiEditor Constructor][Serious Error] source is required, a certain addition does not comply with the specification, and the entire setting is skipped!')
				return this
			}
			// 拷贝一次, 防蠢
			let copy = Object.assign({}, config)
			global.uiEditor.machinesToModify.push(copy)
			console.log(`[uiEditor构造者]${config.fieldName}构建完成! `)
			return config
		}
	}

	/**
	 * 入口函数：开始配置一台机器的 UI 修改
	 * @param {string} fieldName - 机器配方类型的字段名 必填
	 * @returns {Object} 构建器对象, 可链式调用配置方法并以`.push()`结束
	 * 
	 * @example
	 * global.uiEditor.modify("BENDER_RECIPES")
	 *     .source("gtm")
	 *     .newItemInput(24)
	 *     .newFluidInput(6)
	 *     .push()
	 */
	function createMachineModifier(fieldName) {
		// 真的有人不填字段名吗
		// 防蠢
		if (!fieldName || typeof fieldName !== 'string') {
			console.warn("[uiEditor Constructor][Serious Error] fieldName is required, a certain addition does not comply with the specification, and the entire setting is skipped!")
			return {
				source: function() {
					return this
				},
				newItemInput: function() {
					return this
				},
				newItemOutput: function() {
					return this
				},
				newFluidInput: function() {
					return this
				},
				newFluidOutput: function() {
					return this
				},
				progressBar: function() {
					return this
				},
				progressBarPriority: function() {
					return this
				},
				sound: function() {
					return this
				},
				push: function() {
					return this
				}
			}
		}
		let builder = Object.create(machineModifierPrototype)
		builder._config = {
			fieldName: fieldName
		}
		return builder
	}
	// 初始化
	global.uiEditor = global.uiEditor || {}
	global.uiEditor.machinesToModify = global.uiEditor.machinesToModify || []
	global.uiEditor.uiEditor_builder = {
		isLoaded: true
	}
	// 挂载到global
	global.uiEditor.modify = fieldName => createMachineModifier(fieldName)
})()