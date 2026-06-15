---
navigation:
  parent: items-blocks-machines/items-blocks-machines-index.md
title: Molded Panel
  icon: formation_plane
  position: 210
categories:
- devices
item_ids:
- ae2:formation_plane
---

# Molded Panel

<GameScene zoom="8" background="transparent">
  <ImportStructure src="../assets/blocks/formation_plane.snbt" />
</GameScene>

Molded panels can place blocks and throw items. It places or ejects items when [devices](../ae2-mechanics/devices.md) (such as <ItemLink id="import_bus" /> and <ItemLink id="interface" />) deposit them into [network storage](../ae2-mechanics/import-export-storage.md), similar to how the deposit-only <ItemLink id="storage_bus" /> works.

<GameScene zoom="8" interactive={true}>
  <ImportStructure src="../assets/assemblies/formation_plane_demonstration.snbt" />
  <IsometricCamera yaw="255" pitch="30" />
</GameScene>

Note that these devices are similar to Input Bus -> Storage Bus and Interface -> Storage Bus in [Pipe Subnet](../example-setups/pipe-subnet.md).

<GameScene zoom="6" interactive={true}>
  <ImportStructure src="../assets/assemblies/import_storage_pipe.snbt" />
  <IsometricCamera yaw="195" pitch="30" />
</GameScene>

<GameScene zoom="6" interactive={true}>
  <ImportStructure src="../assets/assemblies/interface_storage_pipe.snbt" />
  <IsometricCamera yaw="195" pitch="30" />
</GameScene>

In facilities such as [pipe subnets](../example-setups/pipe-subnet.md), this [device](../ae2-mechanics/devices.md) behaves like a storage bus; it can also be used as a replacement for the storage bus if blocks need to be placed or items thrown rather than transferred.

The molded panel is [cable subparts](../ae2-mechanics/cable-subparts.md).

**Remember to allow fake players to be placed in the block you claim**

## Filter

By default, molded panels will not place or throw anything. Items placed into its filter slot will be whitelisted, meaning only the things specified in it will be placed.

If the required item or fluid is not available, drag it from JEI/REI and place it into the filter tank.

Right-clicking on a fluid container (such as a drum or fluid tank) sets the fluid to filter instead of the drum and tank items.

## Priority

Click the wrench icon in the upper right corner of the GUI to set the priority. Items entering the network will be sent to the storage location with the highest priority first.

## set up

* Molding panels can be configured to place blocks or throw items.

## upgrade

The molded panel supports the following [upgrade](upgrade_cards.md):

* <ItemLink id="capacity_card" /> increases the number of filter slots
* <ItemLink id="fuzzy_card" /> enables panels to be filtered by durability or ignore items NBT
* <ItemLink id="inverter_card" /> changes whitelist to blacklist

## Recipe

<RecipeFor id="formation_plane" />
