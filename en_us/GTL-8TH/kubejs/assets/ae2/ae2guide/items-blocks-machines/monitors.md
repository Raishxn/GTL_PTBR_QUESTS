---
navigation:
  parent: items-blocks-machines/items-blocks-machines-index.md
title: monitor
  icon: storage_monitor
  position: 210
categories:
- devices
item_ids:
- ae2:storage_monitor
- ae2:conversion_monitor
---

# monitor

<GameScene zoom="8" background="transparent">
<ImportStructure src="../assets/assemblies/monitors.snbt" />
<IsometricCamera yaw="195" pitch="30" />
</GameScene>

Monitors can display a single item or fluid and allow interaction with it without opening the GUI.

The monitor will inherit the color of the [cables.md] that supports it.

If the monitor is located on the top or bottom surface, it can be selected with <ItemLink id="certus_quartz_wrench" />.

They are [cable subparts](../ae2-mechanics/cable-subparts.md).

# storage monitor

Can display a single item or fluid, as well as its quantity. It’s better to put a few next to facilities like farms⋯⋯

It is *not* necessary to occupy [channel](../ae2-mechanics/channels.md).

Keybindings:

* Right-click on a handheld item or double-click on a handheld fluid container to set the monitor to that item/fluid
* Right-click with an empty hand to clear settings
* Shift-right click with an empty hand to lock the monitor

## Recipe

<RecipeFor id="storage_monitor" />

# Swap monitor

Exchange monitors are similar to storage monitors, allowing both the removal and deposit of displayed items.

If the set item can be [automatically synthesized](../ae2-mechanics/autocrafting.md) and there is no such item in the inventory, the monitor will open the UI for setting the synthesis quantity when the item is taken out.

*Requires* occupying [channel](../ae2-mechanics/channels.md).

Added key bindings:

* Left-click to take out a group of items. If there is no corresponding item, a synthesis request will be sent.
* Right-click on any item while holding it to store it
* Right-click with an empty hand to store all set items in the inventory

## Recipe

<RecipeFor id="conversion_monitor" />
