---
navigation:
  parent: items-blocks-machines/items-blocks-machines-index.md
title: charger
  icon: charger
  position: 310
categories:
- machines
item_ids:
- ae2:charger
---

#charger

<BlockImage id="charger" scale="8" />

A charger can charge its supported tools and <ItemLink id="certus_quartz_crystal" />.

It needs to supply energy to its top or bottom surface, either AE2[cables](cables.md) or energy cables from other modules can be used. The charger can accept AE2 energy (AE) and Forge energy (FE). It allows items to be imported and exported from all sides. Only the product is extracted, so there is no need to set up filtration. Can be rotated with <ItemLink id="certus_quartz_wrench" /> for automation.

You can charge <ItemLink id="certus_quartz_crystal" /> into <ItemLink id="charged_certus_quartz_crystal" />, or change <ItemLink id="minecraft:compass" /> into <ItemLink id="meteorite_compass" />.

Place <ItemLink id="crank" /> on the top or bottom and right-click the handshake to manually charge items.

It is also the work site of [Fluix Researcher](fluix_researcher.md).

## Simple automation

As in the example below, the rotatability of the charger allows it to be semi-automated as follows:

<GameScene zoom="4" background="transparent">
  <ImportStructure src="../assets/assemblies/charger_hopper.snbt" />
  <IsometricCamera yaw="195" pitch="30" />
</GameScene>

## Recipe

<RecipeFor id="charger" />
