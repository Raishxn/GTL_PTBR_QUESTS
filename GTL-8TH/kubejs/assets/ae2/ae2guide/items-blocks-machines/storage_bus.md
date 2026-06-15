---
navigation:
  parent: items-blocks-machines/items-blocks-machines-index.md
title: ME Storage Bus
  icon: storage_bus
  position: 220
categories:
- devices
item_ids:
- ae2:storage_bus
---

# storage bus

<GameScene zoom="8" background="transparent">
<ImportStructure src="../assets/blocks/storage_bus.snbt" />
</GameScene>

Have you ever considered *not* replacing the box warehouse with another more reasonable facility? We introduced Storage Bus for this purpose!

The storage bus treats the containers it is connected to as [network storage](../ae2-mechanics/import-export-storage.md). It enables the network to view the contents of the container and to perform input and output to the container to meet the input and output needs of [device](../ae2-mechanics/devices.md).

Given AE2's philosophy of [device](../ae2-mechanics/devices.md) functionality interacting to produce emergent mechanisms, the storage bus *doesn't* only have *storage* functionality. If the *unique* storage location of [Subnetwork](../ae2-mechanics/subnetworks.md) is set to a number of storage buses, these buses can be considered as the starting or ending point of item transfer. (See ["pipe" subnet](../example-setups/pipe-subnet.md).)

The storage bus is [cable subparts](../ae2-mechanics/cable-subparts.md).

## Filter

By default, the storage bus stores everything. Items put into its filter slot are whitelisted, meaning only the things specified in it are stored.

If the required item or fluid is not available, drag it from JEI/REI and place it into the filter tank.

Right-clicking on a fluid container (such as a drum or fluid tank) sets the fluid to filter instead of the drum and tank items.

## Priority

You can click the wrench in the upper right corner of the GUI to set the priority. Items input into the network will first enter the storage location with the highest priority. If there are two storage locations with the same priority, the one that already contains the item will be selected first. All whitelisted components with the same priority are deemed to already have the item. Items exported from storage will be exported first from the lowest priority location. This priority system allows high-priority storage locations to be filled while low-priority ones are emptied during the process of importing and exporting items.

## set up

* The storage bus can be partitioned (filtered) by the current contents of adjacent containers.
* You can set whether items in adjacent containers that cannot be extracted by the bus are visible to the network (for example, the storage bus cannot extract items from the intermediate input slot of <ItemLink id="inscriber" />).
* The memory bus can be set up to filter in both directions or to filter only store operations.
* The memory bus can be bidirectional, store-only, or output-only.

## upgrade

The storage bus supports the following [upgrades](upgrade_cards.md):

* <ItemLink id="capacity_card" /> increases the number of filter slots
* <ItemLink id="fuzzy_card" /> enables the bus to be filtered by durability or ignore items NBT
* <ItemLink id="inverter_card" /> changes whitelist to blacklist
* <ItemLink id="void_card" /> will clear the input items when the corresponding container is full, which can avoid accumulation of farm products. Be careful when setting up partitions!

## Recipe

<RecipeFor id="storage_bus" />
