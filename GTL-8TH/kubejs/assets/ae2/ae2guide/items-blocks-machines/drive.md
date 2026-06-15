---
navigation:
  parent: items-blocks-machines/items-blocks-machines-index.md
title: ME drive
  icon: drive
  position: 210
categories:
- devices
item_ids:
- ae2:drive
---

# ME drive

<GameScene zoom="8" background="transparent">
  <ImportStructure src="../assets/blocks/drive.snbt" />
</GameScene>

A driver is a [device](../ae2-mechanics/devices.md) on which a [storage cell](storage_cells.md) is placed, where the cell is considered a [network storage](../ae2-mechanics/import-export-storage.md). It has 10 slots that accept individual components.

If required, components can be extracted or deposited using any logistics method (such as funnels and AE2 buses).

Can be rotated by <ItemLink id="certus_quartz_wrench" />.

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

<RecipeFor id="drive" />
