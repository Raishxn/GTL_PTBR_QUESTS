;
(function() {
	JEIEvents.subtypes((event) => {
		event.useNBT('expatternprovider:infinity_cell')
		event.useNBT('gtladditions:thread_modifier_hatch')
	})
	JEIEvents.addItems((event) => {
		let infinityCellToAdd = [{
				type: 'f',
				id: 'gtceu:raw_growth_medium'
			},
			{
				type: 'f',
				id: 'gtceu:sterilized_growth_medium'
			},
			{
				type: 'f',
				id: 'gtceu:biohmediumsterilized'
			},
			{
				type: 'f',
				id: 'gtceu:raw_star_matter_plasma'
			},
			{
				type: 'f',
				id: 'gtceu:milk'
			},
		]
		infinityCellToAdd.forEach((element) => {
			event.add(Item.of('expatternprovider:infinity_cell', `{record:{"#c":"ae2:${element.type}",id:"${element.id}"}}`))
		})
	})
	ItemEvents.tooltip((event) => {
		event.addAdvanced('gtladditions:thread_modifier_hatch', (item, advanced, text) => {
			if (item.nbt == '{BlockEntityTag:{astralArrayInventory:{Items:[{Count:127b,Slot:0,id:"gtladditions:astral_array"}]}}}') {
				text.add(Text.green('✨经由奥数星图的大手，从无限的可能中收集到的，将127个星阵压缩进一个天球的方法'))
				text.add(Text.gray('    不需要谨慎放置...'))
			}
		})
		const autoConfigurationParallelHatchList = [
        'gtceu:auto_configuration_maintenance_hatch', 'gtceu:cleaning_configuration_maintenance_hatch',
        'gtceu:sterile_configuration_cleaning_maintenance_hatch', 'gtceu:law_configuration_cleaning_maintenance_hatch',
        'gtceu:cleaning_gravity_configuration_maintenance_hatch', 'gtceu:sterile_cleaning_gravity_configuration_maintenance_hatch',
        'gtceu:law_cleaning_gravity_configuration_maintenance_hatch', 'gtceu:gravity_configuration_hatch'
    	]
		event.addAdvanced(autoConfigurationParallelHatchList, (item, advanced, text) => {
			if (item.nbt) {
				let durationMultiplier = item.nbt?.BlockEntityTag?.durationMultiplier.toFixed(2).toString()
				text.add(Text.green('这是一个预制倍数为').append(Text.gold(durationMultiplier).append(Text.green('的预制维护仓!'))))
			}
		})
	})
})()