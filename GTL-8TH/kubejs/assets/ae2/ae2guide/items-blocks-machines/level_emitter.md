---
navigation:
  parent: items-blocks-machines/items-blocks-machines-index.md
title: Standard sender
  icon: level_emitter
  position: 220
categories:
- devices
item_ids:
- ae2:level_emitter
- ae2:energy_level_emitter
---

# Standard sender

<GameScene zoom="8" background="transparent">
  <ImportStructure src="../assets/blocks/level_emitter.snbt" />
</GameScene>

The standard transmitter emits a redstone signal based on the number of items in [Network Storage](../ae2-mechanics/import-export-storage.md).

It has a variant that emits a redstone signal based on the level of [Energy](../ae2-mechanics/energy.md) in the network.

If the required item or fluid is not available, drag it from JEI/REI and place it into the filter tank.

Right-clicking on a fluid container (such as a drum or fluid tank) sets the fluid to filter instead of the drum and tank items.

They are [cable subparts](../ae2-mechanics/cable-subparts.md).

Unlike other [devices](../ae2-mechanics/devices.md), the standard transmitter *does not* require [channels](../ae2-mechanics/channels.md).

## set up

* The standard transmitter has two modes: "greater than or equal to" and "less than".
* When <ItemLink id="crafting_card" /> is installed, there are two modes: "Emit redstone signal when items are synthesized" and "Emit redstone signal to synthesize items".

## upgrade

The standard sender supports the following [upgrades](upgrade_cards.md):

* <ItemLink id="fuzzy_card" /> enables transmitters to be filtered by durability or ignore items NBT
* <ItemLink id="crafting_card" /> can enable the synthesis function

## Synthesis function

If <ItemLink id="crafting_card" /> is installed, the transmitter enters the synthesized state.

At this time it has two modes:

The first is to "emit a redstone signal when an item is synthesized". In this case, the transmitter will emit a redstone signal when a specific item is synthesized with <ItemLink id="pattern_provider" /> in the [Automatic Synthesis](../ae2-mechanics/autocrafting.md) system. This allows certain energy-intensive automation facilities to be activated only when they are actually needed.

The second is "Send a redstone signal to craft items". This mode is extremely useful in automated facilities that deal with infinite farms and probabilistic output products. The sender will also create a virtual [template](patterns.md) of the filtered items, which can be used by the [automatic synthesis](../ae2-mechanics/autocrafting.md) system. (For proper operation, the same recipe for the same item should not exist in <ItemLink id="pattern_provider" />.)

This "boilerplate" doesn't define or care about synthetic materials. In other words, "If a redstone signal is emitted from this standard transmitter, the ME system will receive these items at some point in the future." This is typically used to enable or disable infinite farms that do not require input materials, or to enable systems that handle [recursive recipes](../example-setups/recursive-crafting-setup.md) (which standard automatic crafting cannot handle), such as "1x cobblestone = 2x cobblestone" if there is a machine that can duplicate cobblestone.

## Recipe

<RecipeFor id="level_emitter" />

<RecipeFor id="energy_level_emitter" />
