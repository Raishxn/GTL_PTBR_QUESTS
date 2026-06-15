---
navigation:
  parent: items-blocks-machines/items-blocks-machines-index.md
title: ME input bus
  icon: import_bus
  position: 220
categories:
- devices
item_ids:
- ae2:import_bus
---

# input bus

<GameScene zoom="8" background="transparent">
<ImportStructure src="../assets/blocks/import_bus.snbt" />
</GameScene>

The input bus will pull items and fluids (and other types as they are added) from the container it is connected to and store them in [Network Storage](../ae2-mechanics/import-export-storage.md).

To reduce lag, the input bus will enter a kind of "sleep mode" when no input has been made recently, at which point it will work at a slower speed, and will wake up when it inputs items and gradually enter its normal state (transmitting 4 times per second).

The input bus is [cable subparts](../ae2-mechanics/cable-subparts.md).

## Filter

By default, the input bus inputs everything it has access to. Items put into its filter slot are whitelisted, meaning only the things specified in it will be entered.

If the required item or fluid is not available, drag it from JEI/REI and place it into the filter tank.

Right-clicking on a fluid container (such as a drum or fluid tank) sets the fluid to filter instead of the drum and tank items.

## upgrade

The input bus supports the following [upgrades](upgrade_cards.md):

* <ItemLink id="capacity_card" /> increases the number of filter slots
* <ItemLink id="speed_card" /> increases the number of items moved per transfer
* <ItemLink id="fuzzy_card" /> enables the bus to be filtered by durability or ignore items NBT
* <ItemLink id="inverter_card" /> changes whitelist to blacklist
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

<RecipeFor id="import_bus" />
