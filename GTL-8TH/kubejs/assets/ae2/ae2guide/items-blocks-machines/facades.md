---
navigation:
  parent: items-blocks-machines/items-blocks-machines-index.md
title: camouflage board
  icon: facade
  position: 110
categories:
- network infrastructure
item_ids:
- ae2:facade
---

# camouflage board

Camouflage panels can make the base look neater. They cover various shapes of cables and can be made from a variety of blocks.

<GameScene zoom="6" background="transparent">
  <ImportStructure src="../assets/assemblies/facades_1.snbt" />
  <IsometricCamera yaw="195" pitch="30" />
</GameScene>

They block each side of the cable, but the [subparts](../ae2-mechanics/cable-subparts.md) and cable connections are not blocked.

<GameScene zoom="6"  interactive={true}>
  <ImportStructure src="../assets/assemblies/facades_2.snbt" />
  <IsometricCamera yaw="195" pitch="30" />
</GameScene>

Use camouflage panels flexibly. Improve the look and feel of the base, create blocks with different materials on each side, and so on.

<GameScene zoom="4" interactive={true}>
  <ImportStructure src="../assets/assemblies/facades_3.snbt" />
  <IsometricCamera yaw="195" pitch="30" />
</GameScene>

## Recipe

Just place the block with the material you want to disguise it as between the 4 <ItemLink id="cable_anchor" />.

![Facade board recipe](../assets/diagrams/facade_recipe.png)
