//Version:2.1.0
;(function(){
    const KIRIN_CONFIG = JsonIO.read('kubejs/config/kirin.json')
	if (KIRIN_CONFIG) {
		global.kirin = {
			isLoaded: KIRIN_CONFIG.isLoaded ?? false,
			enableSafeFixes: KIRIN_CONFIG.enableSafeFixes ?? false,
			enableSignificantBalanceChanges: KIRIN_CONFIG.enableSignificantBalanceChanges ?? false,
			enableGameBreakingRecipes: KIRIN_CONFIG.enableGameBreakingRecipes ?? false,
		}
	} else {
		console.error('Kirin的神人私货--启动脚本未检测到配置文件，请检查安装!')
		global.kirin = {
			isLoaded: false,
			enableSafeFixes: false,
			enableSignificantBalanceChanges: false,
			enableGameBreakingRecipes: false,
		}
		return
	}
})()