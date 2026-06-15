---
navigation:
  parent: items-blocks-machines/items-blocks-machines-index.md
title: storage element
  icon: item_storage_cell_1k
  position: 410
categories:
- tools
item_ids:
- ae2:item_cell_housing
- ae2:fluid_cell_housing
- ae2:cell_component_1k
- ae2:cell_component_4k
- ae2:cell_component_16k
- ae2:cell_component_64k
- ae2:cell_component_256k
- ae2:item_storage_cell_1k
- ae2:item_storage_cell_4k
- ae2:item_storage_cell_16k
- ae2:item_storage_cell_64k
- ae2:item_storage_cell_256k
- ae2:fluid_storage_cell_1k
- ae2:fluid_storage_cell_4k
- ae2:fluid_storage_cell_16k
- ae2:fluid_storage_cell_64k
- ae2:fluid_storage_cell_256k
---

# storage element

<Column>
  <Row>
    <ItemImage id="item_storage_cell_1k" scale="4" />

    <ItemImage id="item_storage_cell_4k" scale="4" />

    <ItemImage id="item_storage_cell_16k" scale="4" />

    <ItemImage id="item_storage_cell_64k" scale="4" />

    <ItemImage id="item_storage_cell_256k" scale="4" />
  </Row>

  <Row>
    <ItemImage id="fluid_storage_cell_1k" scale="4" />

    <ItemImage id="fluid_storage_cell_4k" scale="4" />

    <ItemImage id="fluid_storage_cell_16k" scale="4" />

    <ItemImage id="fluid_storage_cell_64k" scale="4" />

    <ItemImage id="fluid_storage_cell_256k" scale="4" />
  </Row>
</Column>

Storage elements are one of the fundamental ways of applying energy storage. It needs to be loaded into <ItemLink id="drive" /> or <ItemLink id="chest" />.

For an introduction to its byte and type capacity, see [Bytes and Types](../ae2-mechanics/bytes-and-types.md).

If the storage component is empty, you can right-click with Shift to remove the storage component from the component casing.

## The relationship between storage capacity and number of types

[Pre-occupied amount per type](../ae2-mechanics/bytes-and-types.md) is designed such that the capacity to store one type of components is twice the capacity to store 63 components.

| Component | Total capacity when using 1 type | Total capacity when using 63 types |
| ---------------------------------------- | ----------------------------------------: | ------------------------------------------: |
| <ItemLink id="item_storage_cell_1k" />   |                                     8,128 |                                       4,160 |
| <ItemLink id="item_storage_cell_4k" />   |                                    32,512 |                                      16,640 |
| <ItemLink id="item_storage_cell_16k" />  |                                   130,048 |                                      66,560 |
| <ItemLink id="item_storage_cell_64k" />  |                                   520,192 |                                     266,240 |
| <ItemLink id="item_storage_cell_256k" /> |                                 2,080,768 |                                   1,064,960 |


## Partition

Similar to filtering <ItemLink id="storage_bus" />, components can be filtered to only accept specific items. This operation needs to be completed in <ItemLink id="cell_workbench" />.

If the required item is not available, drag it from JEI/REI and put it into the filter slot.

## upgrade

Storage components support the following [upgrade] (upgrade_cards.md), which needs to be loaded with <ItemLink id="cell_workbench" />:

* <ItemLink id="fuzzy_card" /> (fluid components not available) enables components to be partitioned by durability or ignore NBT
* <ItemLink id="inverter_card" /> changes whitelist to blacklist
* <ItemLink id="equal_distribution_card" /> will allocate equal-sized sectors for each type, that is, a single type cannot fill the component
* <ItemLink id="void_card" /> will destroy the input items when the element is full (or a certain type is full when the equalization card is installed), which can avoid the accumulation of farm products. Be careful when setting up partitions!
* Portable components also accept <ItemLink id="energy_card" />, which can increase their energy capacity

## Dyeing

Portable items and fluid components can be dyed just like leather armor, by crafting them with dyes.

# Shell

Components can be crafted from storage components and shells, or storage components can be placed in the center of the shell recipe:

<Row>
  <Recipe id="network/cells/item_storage_cell_1k" />

  <Recipe id="network/cells/item_storage_cell_1k_storage" />
</Row>

The recipe for the shell itself is as follows:

<Row>
  <RecipeFor id="item_cell_housing" />

  <RecipeFor id="fluid_cell_housing" />
</Row>

#Storage components

The storage component is the core of all AE2 components and determines the capacity of the component. The capacity of each level of components is 4 times that of the previous level, and the consumption is 3 times.

<Column>
  <Row>
    <RecipeFor id="cell_component_1k" />

    <RecipeFor id="cell_component_4k" />

    <RecipeFor id="cell_component_16k" />
  </Row>

  <Row>
    <RecipeFor id="cell_component_64k" />

    <RecipeFor id="cell_component_256k" />
  </Row>
</Column>

# Item storage component

The item storage unit can store up to 63 items and covers all standard capacities.

<Column>
  <Row>
    <Recipe id="network/cells/item_storage_cell_1k_storage" />

    <Recipe id="network/cells/item_storage_cell_4k_storage" />

    <Recipe id="network/cells/item_storage_cell_16k_storage" />
  </Row>

  <Row>
    <Recipe id="network/cells/item_storage_cell_64k_storage" />

    <Recipe id="network/cells/item_storage_cell_256k_storage" />
  </Row>
</Column>

## Portable Object Component

They are the pocket (or backpack) version of <ItemLink id="chest" />. It can be charged in <ItemLink id="charger" />.

Unlike standard storage elements, as the byte capacity increases, their type capacity *decreases*, with the byte capacity being half the standard.

In addition to the upgrade cards that other components accept, portable components also accept <ItemLink id="energy_card" /> to increase energy capacity.

<Column>
  <Row>
    <RecipeFor id="portable_item_cell_1k" />

    <RecipeFor id="portable_item_cell_4k" />

    <RecipeFor id="portable_item_cell_16k" />
  </Row>

  <Row>
    <RecipeFor id="portable_item_cell_64k" />

    <RecipeFor id="portable_item_cell_256k" />
  </Row>
</Column>

# Fluid Storage Element

Fluid storage elements can store up to 5 fluids and cover all standard capacities.

<Column>
  <Row>
    <Recipe id="network/cells/fluid_storage_cell_1k_storage" />

    <Recipe id="network/cells/fluid_storage_cell_4k_storage" />

    <Recipe id="network/cells/fluid_storage_cell_16k_storage" />
  </Row>

  <Row>
    <Recipe id="network/cells/fluid_storage_cell_64k_storage" />

    <Recipe id="network/cells/fluid_storage_cell_256k_storage" />
  </Row>
</Column>

## Portable Fluid Components

They are the pocket (or backpack) version of <ItemLink id="chest" />. It can be charged in <ItemLink id="charger" />.

Unlike standard storage elements, as the byte capacity increases, their type capacity *decreases*, with the byte capacity being half the standard.

In addition to the upgrade cards that other components accept, portable components also accept <ItemLink id="energy_card" /> to increase energy capacity.

<Column>
  <Row>
    <RecipeFor id="portable_fluid_cell_1k" />

    <RecipeFor id="portable_fluid_cell_4k" />

    <RecipeFor id="portable_fluid_cell_16k" />
  </Row>

  <Row>
    <RecipeFor id="portable_fluid_cell_64k" />

    <RecipeFor id="portable_fluid_cell_256k" />
  </Row>
</Column>

# Create item components and create fluid components

<Row>
  <ItemImage id="creative_item_cell" scale="2" />

  <ItemImage id="creative_fluid_cell" scale="2" />
</Row>

Creating item components and creating fluid components** do not provide unlimited storage**. They are infinite supply sources and destruction pools for all items or fluids.
