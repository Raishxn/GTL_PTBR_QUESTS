---
navigation:
title: Tips and Tricks
  position: 20
---

# Tips and Tricks

Lots of little recommendations.

* Remove Optifine.
* Can rotate or zoom the guide example diagram with zoom and hide annotation icons.
* Maintain the tree structure of the network and avoid constructing a ring structure.
* The maximum number of block-shaped [devices](ae2-mechanics/devices.md) in one area is 8, unless you have a deep understanding of the distribution of [channels](ae2-mechanics/channels.md) in the network.
* Use only one type of wood in all [Samples](items-blocks-machines/patterns.md). Allowing the sample to use alternative materials does occasionally help, but using the same type of wood everywhere can go a long way toward minimizing trouble.
* Arrange [patterns] vertically in <ItemLink id="pattern_access_terminal" /> (items-blocks-machines/patterns.md), or divide patterns into [providers] (items-blocks-machines/pattern_provider.md) to use recipes in parallel.
* Added [Energy Components](items-blocks-machines/energy_cells.md) to handle network energy spikes.
* Water can be input to <ItemLink id="condenser" />.
* The best way to keep the network open is not to include random drops from creatures such as swords and armor. Each combination of spells and durability belongs to a different [type] (ae2-mechanics/bytes-and-types.md).
* An "item input system" event must occur when transferring products back to [Processing Templates] (items-blocks-machines/patterns.md), such as through the return column of <ItemLink id="import_bus" />, <ItemLink id="interface" />, or <ItemLink id="pattern_provider" />. You cannot just input the product into the box connected to <ItemLink id="storage_bus" />.
* Remember that you can rotate or zoom the guide example image with zoom and hide annotation icons.
* <ItemLink id="pattern_provider" /> will only transfer complete batches of recipe materials and only from one side. This is useful to prevent the machine from getting only part of the material, but sometimes requires material to be fed into multiple locations. This can be accomplished with <ItemLink id="interface" />, used as a ["pipe" subnet](example-setups/pipe-subnet.md), or as a buffer box/tank taking advantage of its ability to store multiple different item sets, fluids, chemicals, etc. simultaneously.
* Can rotate or zoom the guide example diagram with zoom and hide annotation icons.