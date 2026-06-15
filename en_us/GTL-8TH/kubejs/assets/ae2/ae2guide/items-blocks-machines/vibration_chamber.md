---
navigation:
  parent: items-blocks-machines/items-blocks-machines-index.md
title: Resonance Chamber
  icon: vibration_chamber
  position: 110
categories:
- network infrastructure
item_ids:
- ae2:vibration_chamber
---

# resonant bin

<BlockImage id="vibration_chamber" p:active="true" scale="8" />

The basic method of supplying [energy](../ae2-mechanics/energy.md) to the network is <ItemLink id="energy_acceptor" />, and the resonant bin can directly generate a small to medium amount of AE.

By default (without [upgrade](upgrade_cards.md) and in default configuration), it will produce 40AE/t.

When the network's [Energy](../ae2-mechanics/energy.md) is full, the resonator will slow down to reduce fuel consumption, but it will not stop working completely.

## set up

* The resonance bin provides settings for adjusting global energy units (AE, E/FE)

## upgrade

The resonance chamber supports the following [upgrades](upgrade_cards.md):

* Each <ItemLink id="energy_card" /> will increase the efficiency of the resonance chamber by 50%, with a maximum of +150%, which is 250% of the basic efficiency.
* Each <ItemLink id="speed_card" /> will increase the burning rate of the resonance chamber by 50%, with a maximum of +150%, which is 250% of the basic energy output.

## Configuration

The properties of the resonance chamber can be modified in.minecraft/config/ae2/common.json.

* baseEnergyPerFuelTick sets the base efficiency of the resonant bin without upgrades.
* minEnergyPerGameTick sets the minimum capacity level (even if the network does not require energy, the resonator will slowly consume fuel).
* maxEnergyPerGameTick sets the output limit (and speed) of the resonant chamber without upgrades.

## Recipe

<RecipeFor id="vibration_chamber" />
