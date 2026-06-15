---
navigation:
  parent: items-blocks-machines/items-blocks-machines-index.md
title: ME box
  icon: chest
  position: 210
categories:
- devices
item_ids:
- ae2:chest
---

#MEBox

<GameScene zoom="8" background="transparent">
<ImportStructure src="../assets/blocks/chest.snbt" />
</GameScene>

ME boxes are similar to miniature networks with <ItemLink id="terminal" />, <ItemLink id="drive" />, and <ItemLink id="energy_acceptor" />. It can be used as small network storage, but its functionality is limited by its capacity to hold a single [storage cell](../items-blocks-machines/storage_cells.md).

It is very useful for interacting with components individually. The terminal integrated in it can only access the components in the box, while the [Device](../ae2-mechanics/devices.md) in the ordinary network can access any [Network Storage](../ae2-mechanics/import-export-storage.md) location, including the ME box.

It has 2 GUIs and is face sensitive. Interacting with the terminal on the top will open the terminal interface, and the logistics system can only input to it, but not extract items from it. Interacting with other faces opens the GUI for placing storage components and setting priorities. Item logistics systems can only output components via faces with component slots.

Can be rotated by <ItemLink id="certus_quartz_wrench" />.

It only has a small AE energy cache, so if it is not equipped with [Energy Components](../items-blocks-machines/energy_cells.md), inputting and outputting too many items to it at the same time may cause energy exhaustion.

The terminal can be dyed with <ItemLink id="color_applicator" />.

<GameScene zoom="6" background="transparent">
<ImportStructure src="../assets/assemblies/chest_color.snbt" />
<IsometricCamera yaw="195" pitch="30" />
</GameScene>

## set up

The settings for ME boxes are the same as for <ItemLink id="terminal" /> and <ItemLink id="crafting_terminal" />, but <ItemLink id="view_cell" /> is not supported.

## Component status LED

Components in the drive indicate their status via their LEDs:

| Color | Condition |
| :--- | :------------------------------------------------------------ |
| green | empty |
| blue | filled with things |
| Orange | [Type](../ae2-mechanics/bytes-and-types.md) is full, new types cannot be added |
| Red | [Bytes](../ae2-mechanics/bytes-and-types.md) is full, no new items can be added |
| Black | No power or drive missing [channel](../ae2-mechanics/channels.md) |

## Priority

You can click the wrench in the upper right corner of the GUI to set the priority. Items input into the network will first enter the storage location with the highest priority. If there are two storage locations with the same priority, the one that already contains the item will be selected first. Components that pass [Partition](cell_workbench.md) are deemed to already have the item if they have the same priority. Items exported from storage will be exported first from the lowest priority location. This priority system allows high-priority storage locations to be filled while low-priority ones are emptied during the process of importing and exporting items.

## Recipe

<RecipeFor id="chest" />
