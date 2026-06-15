---
navigation:
  parent: items-blocks-machines/items-blocks-machines-index.md
title: trigger bus
  icon: toggle_bus
  position: 110
categories:
- network infrastructure
item_ids:
- ae2:toggle_bus
- ae2:inverted_toggle_bus
---

# trigger bus

<GameScene zoom="8" background="transparent">
<ImportStructure src="../assets/assemblies/toggle_bus.snbt" />
<IsometricCamera yaw="195" pitch="30" />
</GameScene>

The trigger bus is a bus with similar functions to <ItemLink id="fluix_glass_cable" /> and other cables. The difference is that its connection status is controlled by redstone signals. It can be used to connect or disconnect [ME Network](../ae2-mechanics/me-network-connections.md).

The trigger bus will be connected when it receives a redstone signal, while <ItemLink id="inverted_toggle_bus" /> will behave in the opposite direction and disconnect when it receives a redstone signal.

It should be noted that switching the connection status will cause the network to restart and re-count the connected devices.

They are [cable subparts](../ae2-mechanics/cable-subparts.md).

## Recipe

<RecipeFor id="toggle_bus" />

<RecipeFor id="inverted_toggle_bus" />
