---
navigation:
  parent: items-blocks-machines/items-blocks-machines-index.md
title: upgrade card
  icon: speed_card
  position: 410
categories:
- tools
item_ids:
- ae2:basic_card
- ae2:advanced_card
- ae2:redstone_card
- ae2:capacity_card
- ae2:void_card
- ae2:fuzzy_card
- ae2:speed_card
- ae2:inverter_card
- ae2:crafting_card
- ae2:equal_distribution_card
- ae2:energy_card
---

#Upgrade card

<Row>
  <ItemImage id="redstone_card" scale="2" />

  <ItemImage id="capacity_card" scale="2" />

  <ItemImage id="void_card" scale="2" />

  <ItemImage id="fuzzy_card" scale="2" />

  <ItemImage id="speed_card" scale="2" />

  <ItemImage id="inverter_card" scale="2" />

  <ItemImage id="crafting_card" scale="2" />

  <ItemImage id="equal_distribution_card" scale="2" />

  <ItemImage id="energy_card" scale="2" />
</Row>

Upgrade cards can change the behavior of AE2 [devices](../ae2-mechanics/devices.md) and mechanics, increase speed, enhance filtering, enable redstone control, and more.

## Upgrade card components

<Row>
  <ItemImage id="basic_card" scale="2" />

  <ItemImage id="advanced_card" scale="2" />
</Row>

Upgrade cards need to be synthesized with basic cards or advanced cards.

<Row>
  <RecipeFor id="basic_card" />

  <RecipeFor id="advanced_card" />
</Row>

## Redstone Card

<ItemImage id="redstone_card" scale="2" />

The redstone card gives the redstone control function and adds switch buttons corresponding to various redstone signal conditions to the device's GUI.

<RecipeFor id="redstone_card" />

## Capacity card

<ItemImage id="capacity_card" scale="2" />

Capacity cards can increase the number of filter slots for input buses, output buses, storage buses, and molded panels.

<RecipeFor id="capacity_card" />

## Overflow destroy card

<ItemImage id="void_card" scale="2" />

The overflow destruction card can be loaded with [storage cells] (storage_cells.md) in <ItemLink id="cell_workbench" />, which will destroy the input items when the cell is full. (Be sure to give the component [partition](cell_workbench.md)!) If an equalizing card is installed at the same time, the excess of a specific item will be destroyed when its sector is full, regardless of the fullness of other items.

<RecipeFor id="void_card" />

## Fuzzy card

<ItemImage id="fuzzy_card" scale="2" />

Obfuscated cards allow filterable devices and tools to be filtered by durability or by ignoring NBT, allowing output of iron axes regardless of durability and enchantments, or output of only diamond swords with insufficient durability.

Here is an example of how fuzzy durability is compared, with the bus configuration on the left side of the table and the items being compared at the top.

| 25% | Pickaxe with 10% durability remaining | Pickaxe with 30% durability remaining | Pickaxe with 80% durability remaining | Intact pickaxe |
| ------------ | ------------------- | ------------------- | ------------------- | ------------ |
| Nearly broken pickaxe | ✅ | \*\*\*\* | \*\*\*\* | \*\*\*\* |
| Intact pickaxe | \*\*\*\* | ✅ | ✅ | ✅ |

| 50% | A pickaxe with 10% durability remaining | A pickaxe with 30% durability remaining | A pickaxe with 80% durability remaining | An intact pickaxe |
| ------------ | ------------------- | ------------------- | ------------------- | ------------ |
| Nearly broken pickaxe | ✅ | ✅ | \*\*\*\* | \*\*\*\* |
| Intact pickaxe | \*\*\*\* | \*\*\*\* | ✅ | ✅ |

| 75% | Pickaxe with 10% durability remaining | Pickaxe with 30% durability remaining | Pickaxe with 80% durability remaining | Intact pickaxe |
| ------------ | ------------------- | ------------------- | ------------------- | ------------ |
| Nearly broken pickaxe | ✅ | ✅ | \*\*\*\* | \*\*\*\* |
| Intact pickaxe | \*\*\*\* | | ✅ | ✅ |

| 99% | Pickaxe with 10% durability remaining | Pickaxe with 30% durability remaining | Pickaxe with 80% durability remaining | Intact pickaxe |
| ------------ | ------------------- | ------------------- | ------------------- | ------------ |
| Nearly broken pickaxe | ✅ | ✅ | ✅ | \*\*\*\* |
| Intact pickaxe | \*\*\*\* | \*\*\*\* | \*\*\*\* | ✅ |

| Ignore | Pickaxe with 10% durability remaining | Pickaxe with 30% durability remaining | Pickaxe with 80% durability remaining | Intact pickaxe |
| ------------ | ------------------- | ------------------- | ------------------- | ------------ |
| Nearly Broken Pickaxe | ✅ | ✅ | ✅ | **✅** |
| In mint condition pickaxe | **✅** | **✅** | **✅** | ✅ |

<RecipeFor id="fuzzy_card" />

## Acceleration card

<ItemImage id="speed_card" scale="2" />

Accelerator cards make things run faster, input and output buses move more items per operation, and stampers and assembly rooms work faster.

<RecipeFor id="speed_card" />

## Reverse card

<ItemImage id="inverter_card" scale="2" />

The reverse card changes the filtering of devices and tools from whitelist to blacklist.

<RecipeFor id="inverter_card" />

## Synthetic Card

<ItemImage id="crafting_card" scale="2" />

Synthesis cards give equipment the ability to send relevant item synthesis requests to the [Automatic Synthesis](../ae2-mechanics/autocrafting.md) system.

<RecipeFor id="crafting_card" />

## Equally divide the card

<ItemImage id="equal_distribution_card" scale="2" />

The equalization card can load [storage cells] (storage_cells.md) in <ItemLink id="cell_workbench" />, which will divide the cells into equal-sized sectors according to its own [partition] (cell_workbench.md). This prevents something from filling up the component.

<RecipeFor id="equal_distribution_card" />

## Energy Card

<ItemImage id="energy_card" scale="2" />

Energy cards will increase the energy capacity of portable terminals and other tools, and also increase the efficiency of <ItemLink id="vibration_chamber" />.

<RecipeFor id="energy_card" />
