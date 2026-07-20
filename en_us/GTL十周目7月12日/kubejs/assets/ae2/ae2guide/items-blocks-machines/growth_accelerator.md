---
navigation:
  parent: items-blocks-machines/items-blocks-machines-index.md
title: crystal generator
  icon: growth_accelerator
  position: 310
categories:
- machines
item_ids:
- ae2:growth_accelerator
---

#crystal generator

<BlockImage id="growth_accelerator" p:powered="true" scale="8"/>

When placed adjacent to parent rock, the Crystal Growth Device will greatly accelerate the [growth] of Certus Quartz and Amethyst (../ae2-mechanics/certus-growth.md).

Oddly enough, it *also* speeds up the growth of a variety of plants.

<GameScene zoom="6" interactive={true}>
  <ImportStructure src="../assets/assemblies/growth_accelerator.snbt" />
  <IsometricCamera yaw="195" pitch="30" />
</GameScene>

Place <ItemLink id="crank" /> on the top or bottom surface and right-click to manually supply energy.

It only connects to the cable from the side where its pink Fruix bead is located.

<GameScene zoom="6" background="transparent">
<ImportStructure src="../assets/assemblies/accelerator_connections.snbt" />
<IsometricCamera yaw="195" pitch="30" />
</GameScene>

## Recipe

<RecipeFor id="growth_accelerator" />
