// priority: 95
// 本文件按功能保存配方阶段，实际执行顺序统一由配方入口管理。

// 修正黑曜石粉碎，重建极速烧炼和锭转粉配方；保持原有移除与新增时序。
global.gtlPack.register("recipe_overrides", event => {
    const gtr = event.recipes.gtceu
    gtr.macerator('gtceu:obsidian_dust')
        .itemInputs("minecraft:obsidian")
        .itemOutputs("gtceu:obsidian_dust")
        .EUt(2)
        .duration(100)
    const AD_ASTRA_RAW_SMELT_SKIP = /^ad_astra:smelting\/(ostrum|desh)_ingot_from_smelting_raw_(ostrum|desh)$/
    const AD_ASTRA_RAW_BLAST_SKIP = /^ad_astra:blasting\/(ostrum|desh)_ingot_from_blasting_raw_(ostrum|desh)$/
    event.forEachRecipe({ type: 'minecraft:smelting' }, recipe => {
        let input = recipe.originalRecipeIngredients
        let output = recipe.originalRecipeResult
        let oldId = String(recipe.getId())
        event.remove({ id: oldId })
        if (AD_ASTRA_RAW_SMELT_SKIP.test(oldId)) return
        event.smelting(output, input)
            .cookingTime(1)
            .xp(0.7)
            .id(`fastsmelting:${oldId.replace(':', '/')}`)
    })
    event.forEachRecipe({ type: 'minecraft:blasting' }, recipe => {
        let input = recipe.originalRecipeIngredients
        let output = recipe.originalRecipeResult
        let oldId = String(recipe.getId())
        event.remove({ id: oldId })
        if (AD_ASTRA_RAW_BLAST_SKIP.test(oldId)) return
        event.blasting(output, input)
            .cookingTime(1)
            .xp(0.7)
            .id(`fastblasting:${oldId.replace(':', '/')}`)
    })
    Ingredient.of('#forge:ingots').getItemIds().forEach(ingotId => {
        const ingotIdStr = ingotId.toString()
        const [mod, path] = ingotIdStr.split(':')
        if (!mod || !path) return
        const materialName = path.replace(/_ingot$/, '')
        let dustId = mod === 'minecraft' ? `gtceu:${materialName}_dust` : `${mod}:${materialName}_dust`
        if (!Item.exists(dustId)) {
            let tagDust = Ingredient.of(`#forge:dusts/${materialName}`).getFirst()
            if (!tagDust) return
            dustId = tagDust.getId()
        }
        const safeMaterial = materialName.replace(/[^a-z0-9/._-]/g, '_')
        gtr.forge_hammer(`gtceu:forge_hammer/ingot_to_dust/${mod}_${safeMaterial}`)
            .itemInputs(`64x ${ingotIdStr}`)
            .itemOutputs(`64x ${dustId}`)
            .duration(200)
            .EUt(2)
    })
})
