---
navigation:
  parent: items-blocks-machines/items-blocks-machines-index.md
title: Cetes quartz parent rock
  icon: flawless_budding_quartz
  position: 010
categories:
- misc ingredients blocks
item_ids:
- ae2:flawless_budding_quartz
- ae2:flawed_budding_quartz
- ae2:chipped_budding_quartz
- ae2:damaged_budding_quartz
- ae2:small_quartz_bud
- ae2:medium_quartz_bud
- ae2:large_quartz_bud
- ae2:quartz_cluster
---

# Seth Quartz Parent Rock

(See [Growth of Certus Quartz](../ae2-mechanics/certus-growth.md))

<GameScene zoom="4" background="transparent">
  <ImportStructure src="../assets/assemblies/budding_blocks.snbt" />
  <IsometricCamera yaw="195" pitch="30" />
</GameScene>

Sethus Quartz Buds will grow from Sethus Quartz parent rock, similar to Amethyst. The parent rock can be found in [Meteorites](../ae2-mechanics/meteorites.md). There are four grades of Sethos quartz parent rock: flawless, defective, cracked, and damaged. It can be easily distinguished by modules such as HWYLA, Jade, and The One Probe. (F3 interface is also available.)

For defective, cracked, or damaged parent rock, each time a quartz bud grows, the parent rock may be downgraded by one level and eventually become ordinary <ItemLink id="quartz_block" />.

The flawless Setus Quartz parent rock is not degraded by the growth of quartz buds and can be used as an unlimited productive source.

If destroyed with an ordinary pickaxe, the Sethos quartz matrix will be reduced by one level. If destroyed with the Silk Touch pickaxe, it will not be downgraded except for the Flawless parent rock. **This also means that flawless Setus Quartz matrix cannot be destroyed or moved intact with a pickaxe**. However, you can use [Spatial Storage](../ae2-mechanics/spatial-io.md) to cut and paste the flawless parent rock.

## Recipe

Flawed, cracked, or damaged Sethos Quartz parent rock can be synthesized by putting the upper level parent rock (or <ItemLink id="quartz_block" />) and several <ItemLink id="charged_certus_quartz_crystal" /> into water.

Flawless Sethus quartz parent rock cannot be synthesized and can only be found in the world.

<Row>
  <RecipeFor id="damaged_budding_quartz" />

  <RecipeFor id="chipped_budding_quartz" />

  <RecipeFor id="flawed_budding_quartz" />
</Row>
