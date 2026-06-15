---
navigation:
  parent: items-blocks-machines/items-blocks-machines-index.md
title: Energy Receiver
  icon: energy_acceptor
  position: 110
categories:
- network infrastructure
item_ids:
- ae2:energy_acceptor
---

# energy receiver

<Row gap="20">
<BlockImage id="energy_acceptor" scale="8" /> 

<GameScene zoom="8" background="transparent">
  <ImportStructure src="../assets/blocks/cable_energy_acceptor.snbt" />
</GameScene>
</Row>

Energy Receivers will convert common energy systems from other technology modules into [Energy](../ae2-mechanics/energy.md) used internally by AE2, AE. Although <ItemLink id="controller" /> can also do this, the controller surface is very precious, and it is generally recommended to use an energy receiver.

The conversion ratio of Forge Energy to Techreborn Energy is

*   2 FE = 1 AE（Forge）
*   1 E  = 2 AE（Fabric）

The conversion speed is entirely determined by the energy capacity of the network, see [this page](../ae2-mechanics/energy.md) for the specific reasons.

## Variants

Energy receivers are available in 2 variants: normal, panel/[subparts](../ae2-mechanics/cable-subparts.md), to facilitate the design of compact installations.

The Energy Receiver's normal and panel forms can be switched between the crafting grids.

## Recipe

<RecipeFor id="energy_acceptor" />

<RecipeFor id="cable_energy_acceptor" />