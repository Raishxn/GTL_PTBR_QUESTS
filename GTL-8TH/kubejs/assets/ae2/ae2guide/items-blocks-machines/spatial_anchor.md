---
navigation:
  parent: items-blocks-machines/items-blocks-machines-index.md
title: space anchor
  icon: spatial_anchor
  position: 110
categories:
- network infrastructure
item_ids:
- ae2:spatial_anchor
---

# space anchor

<BlockImage id="spatial_anchor" p:powered="true" scale="8"/>

The AE2 network requires all [devices](../ae2-mechanics/devices.md) to be loaded in blocks to work. Only a part of them is loaded, which may cause abnormal operation. Spatial anchors solve this problem. It forces the loading of blocks occupied by the network it is on. Just a single cable crossing the block boundary is enough to load the new block.

Its "loading range" will cross the [Quantum Bridge](quantum_bridge.md), but will not load across dimensions, so if there is a quantum bridge connected to the Nether, it will need a spatial anchor at both the base and the Nether.

By default, it also enables random ticks for loading chunks, this feature can be turned off by AE2 configuration.

The spatial anchor can be rotated with <ItemLink id="certus_quartz_wrench" /> if necessary.

## set up

* Space Anchor provides settings for adjusting global energy units (AE, E/FE).
* Holograms of loaded blocks can be displayed in the world.

## energy

The [energy](../ae2-mechanics/energy.md) consumption of the space anchor follows the following equation:

e = 80 + (x\*(x+1))/2

x is the number of loaded blocks

## Recipe

<RecipeFor id="spatial_anchor" />
