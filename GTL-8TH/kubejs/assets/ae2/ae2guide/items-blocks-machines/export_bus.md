---
navigation:
  parent: items-blocks-machines/items-blocks-machines-index.md
title: ME output bus
  icon: export_bus
  position: 220
categories:
- devices
item_ids:
- ae2:export_bus
---

# Output bus

<GameScene zoom="8" background="transparent">
<ImportStructure src="../assets/blocks/export_bus.snbt" />
</GameScene>

The output bus pulls items and fluids (as well as other types as they are added) from [Network Storage](../ae2-mechanics/import-export-storage.md) and stores them into the container it is connected to.

In order to reduce lagging, the output bus will enter a certain "sleep mode" if it has not output recently. At this time, it works at a slower speed, and will be awakened when it outputs items and gradually enters a normal state (transmitting 4 times per second).

The output bus is [cable subparts](../ae2-mechanics/cable-subparts.md).

## Filter

By default, the output bus does not output anything. Items put into its filter slot will be whitelisted, meaning only the things specified in it will be output.

If the required item or fluid is not available, drag it from JEI/REI and place it into the filter tank.

Right-clicking on a fluid container (such as a drum or fluid tank) sets the fluid to filter instead of the drum and tank items.

## upgrade

The output bus supports the following [upgrades](upgrade_cards.md):

* <ItemLink id="capacity_card" /> increases the number of filter slots and gives the function of setting the output order
* <ItemLink id="speed_card" /> increases the number of items moved per transfer
* <ItemLink id="fuzzy_card" /> enables the bus to be filtered by durability or ignore items NBT
* <ItemLink id="crafting_card" /> enables the bus to send requests for required items to the [Automatic Crafting](../ae2-mechanics/autocrafting.md) system; can be set to use or not use stored items
* <ItemLink id="redstone_card" /> adds redstone control function so that it will start when there is high signal, low signal, or pulse.

## speed

| Number of accelerator cards | Number of items moved per transfer |
|:---------|:---------------------|
| 0        | 1                    |
| 1        | 8                    |
| 2        | 32                   |
| 3        | 64                   |
| 4        | 96                   |

## Recipe

<RecipeFor id="export_bus" />
