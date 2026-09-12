//Version:2.1.1
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
		console.error('Kirin\'s personal product - the startup script did not detect the configuration file, please check the installation!')
		global.kirin = {
			isLoaded: false,
			enableSafeFixes: false,
			enableSignificantBalanceChanges: false,
			enableGameBreakingRecipes: false,
		}
		return
	}
    if(global.kirin.enableSafeFixes){
        let $FluidProperty = Java.loadClass('com.gregtechceu.gtceu.api.data.chemical.material.properties.FluidProperty')
        let $FluidBuilder = Java.loadClass('com.gregtechceu.gtceu.api.fluids.FluidBuilder')
        let $FluidStorageKeys = Java.loadClass('com.gregtechceu.gtceu.api.fluids.store.FluidStorageKeys')
        let addFluid = (mat, key) => {
            if (!mat) return
            try {
                let prop
                if (mat.hasProperty(PropertyKey.FLUID)) {
                    prop = mat.getProperty(PropertyKey.FLUID)
                } else {
                    prop = new $FluidProperty(key, new $FluidBuilder())
                    mat.setProperty(PropertyKey.FLUID, prop)
                    return
                }
                if (prop) {
                    if (prop.getPrimaryKey() == null) {
                        prop.setPrimaryKey(key)
                    }
                    try {
                        prop.enqueueRegistration(key, new $FluidBuilder())
                    } catch (ignored) {}
                }
            } catch (e) {
                console.warn(`[Kirin] Could not register fluid for ${mat}: ` + e)
            }
        }
        GTCEuStartupEvents.registry("gtceu:material", event => {
            addFluid(GTMaterials.Technetium, $FluidStorageKeys.LIQUID)
            addFluid(GTMaterials.Rhenium, $FluidStorageKeys.LIQUID)
            addFluid(GTMaterials.Germanium, $FluidStorageKeys.LIQUID)
            addFluid(GTMaterials.Ruridit, $FluidStorageKeys.LIQUID)
        })
    }
})()