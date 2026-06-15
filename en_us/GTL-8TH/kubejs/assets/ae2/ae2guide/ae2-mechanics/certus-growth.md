---
navigation:
  parent: ae2-mechanics/ae2-mechanics-index.md
title: Growth of Setus Quartz
  icon: quartz_cluster
---

#Growth of Setus Quartz

## Basically copied from Start and Getting Started

<GameScene zoom="6" background="transparent">
<ImportStructure src="../assets/assemblies/budding_certus_1.snbt" />
</GameScene>

Certus Quartz Buds will grow from [Certus Quartz Mother Rock](../items-blocks-machines/budding_certus.md), similar to Amethyst. If you destroy an incomplete quartz bud, it will drop a <ItemLink id="certus_quartz_dust" />, which is not affected by luck. If the grown quartz cluster is destroyed, four <ItemLink id="certus_quartz_crystal" /> will be dropped, and the amount dropped will be increased by luck.

There are four grades of Sethos quartz parent rock: flawless, defective, cracked, and damaged.

<GameScene zoom="4" background="transparent">
  <ImportStructure src="../assets/assemblies/budding_blocks.snbt" />
  <IsometricCamera yaw="195" pitch="30" />
</GameScene>

Each time a Quartz Bud grows, the parent rock has the potential to be downgraded by one level, eventually turning into a regular block of Sethus Quartz. Putting the Sethus Quartz parent rock or Sethus Quartz block into water together with several <ItemLink id="charged_certus_quartz_crystal" /> can repair it and create a new parent rock.

<RecipeFor id="damaged_budding_quartz" />

Flawless Sethus Quartz parent rock does not degrade, thus producing unlimited Sethus Quartz. However, they cannot be synthesized and cannot be dug up and transported intact with a pickaxe, even with accurate collection. (However they *can* be moved by [Spatial Storage](../ae2-mechanics/spatial-io.md).)

The Setus Quartz parent rock itself grows very slowly. Fortunately, placing <ItemLink id="growth_accelerator" /> next to the parent rock can greatly speed up this process. Your first order of business is to make some of this block.

<GameScene zoom="4" background="transparent">
  <ImportStructure src="../assets/assemblies/budding_certus_2.snbt" />
  <IsometricCamera yaw="195" pitch="30" />
</GameScene>

If you don't have enough quartz to make <ItemLink id="energy_acceptor" /> or <ItemLink id="vibration_chamber" />, you can make a <ItemLink id="crank" /> and attach it to the incubator.

Design for automatic harvesting of Certus Quartz [see here](../example-setups/simple-certus-farm.md).