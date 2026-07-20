---
navigation:
  parent: items-blocks-machines/items-blocks-machines-index.md
title: Network Tools
  icon: network_tool
  position: 410
categories:
- tools
item_ids:
- ae2:network_tool
---

# Network tools

<ItemImage id="network_tool" scale="4" />

The network tool is a modified version of wrench (wrench.md) that displays network diagnostic information and stores upgrade cards (upgrade_cards.md). It still retains the wrench's ability to disassemble things like [subparts](../ae2-mechanics/cable-subparts.md), but can no longer rotate blocks.

The network tool has 9 [Upgrade Cards] (upgrade_cards.md) storage slots. These upgrade cards can be accessed directly in any AE2 device UI when they are in the inventory.

Similar to right-clicking <ItemLink id="controller" />, right-clicking anywhere on the network with the handheld network tool will display a diagnostic information window.
This window will display:

* Number of channels occupied in the network
* Globally switch network energy units (AE, E/FE)
* The current total amount and maximum capacity of [energy](../ae2-mechanics/energy.md) in the network
* Energy inflow and usage
* List of all [devices](../ae2-mechanics/devices.md) and components in the network

This window is very useful when building [subnetwork](../ae2-mechanics/subnetworks.md) and can be used to determine whether two sections of cables are on the same network.

## Recipe

<RecipeFor id="network_tool" />
