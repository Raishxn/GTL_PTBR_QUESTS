---
navigation:
  parent: items-blocks-machines/items-blocks-machines-index.md
title: wireless access point
  icon: wireless_access_point
  position: 210
categories:
- devices
item_ids:
- ae2:wireless_booster
- ae2:wireless_access_point
---

# Wireless access point

<BlockImage id="wireless_access_point" p:state="has_channel" scale="8" />

Allow wireless access to the network from <ItemLink id="wireless_terminal" />. Its operating range and energy consumption are determined by the number of <ItemLink id="wireless_booster" /> installed in it.

A single network can have any number of wireless access points, each with any number of <ItemLink id="wireless_booster" /> installed, and these can be changed to optimize operating range and energy consumption.

Requires 1 [channel](../ae2-mechanics/channels.md).

Also used to bind [wireless terminals](wireless_terminals.md).

# Wireless signal amplifier

<ItemImage id="wireless_booster" scale="2" />

Used to increase the operating range of wireless access points.

## Recipe

<RecipeFor id="wireless_access_point" />

<RecipeFor id="wireless_booster" />
