---
navigation:
  parent: items-blocks-machines/items-blocks-machines-index.md
title: ME IO port
  icon: io_port
  position: 210
categories:
- devices
item_ids:
- ae2:io_port
---

# ME IO port

<BlockImage id="io_port" p:powered="true" scale="8" />

IO can quickly fill or empty [storage components] (../items-blocks-machines/storage_cells.md) with [network storage](../ae2-mechanics/import-export-storage.md).

Can be rotated by <ItemLink id="certus_quartz_wrench" />.

## set up

* The IO port can be set to move components to the output slot when the component is empty, when the component is full, or when the process is completed.
* If <ItemLink id="redstone_card" /> is installed, redstone signal related options will appear.
* There is an arrow in the center of the GUI indicating the transfer direction. The direction can be from the component to [Network Storage] (../ae2-mechanics/import-export-storage.md) and from the network storage to the component.

## upgrade

The IO port supports the following [upgrade](upgrade_cards.md):

* <ItemLink id="speed_card" /> increases the number of items moved per transfer
* <ItemLink id="redstone_card" /> adds redstone control function so that it will start when there is high signal, low signal, or pulse.

## Recipe

<RecipeFor id="io_port" />
