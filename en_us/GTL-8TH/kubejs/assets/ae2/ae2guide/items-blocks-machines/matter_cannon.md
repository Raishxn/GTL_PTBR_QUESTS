---
navigation:
  parent: items-blocks-machines/items-blocks-machines-index.md
title: Matter Cannon
  icon: matter_cannon
  position: 410
categories:
- tools
item_ids:
- ae2:matter_cannon
---

#mattercannon

<ItemImage id="matter_cannon" scale="4" />

The material cannon is a portable rail gun that can eject small objects. Ammunition includes <ItemLink id="matter_ball" /> and metal particles. Damage is determined by the item fired, with "heavier" items like Gold Nuggets (10 damage) doing more damage than lighter items like Matter Balls (2 damage). Each launch consumes 1600 AE.

When configuring "matterCannonBlockDamage" to true, the material cannon will destroy blocks based on block hardness and ammunition damage.

It can be charged in <ItemLink id="charger" />.

The material cannon behaves similarly to [storage cells](storage_cells.md), which can be placed into the component slot of <ItemLink id="chest" /> to replenish the magazine.

## upgrade

The material cannon supports the following [upgrade](upgrade_cards.md), which needs to be loaded with <ItemLink id="cell_workbench" />:

* <ItemLink id="fuzzy_card" /> enables material cannons to be partitioned by durability or ignore NBT
* <ItemLink id="inverter_card" /> changes whitelist to blacklist
* <ItemLink id="speed_card" /> increases the energy consumption of each shot, and the fired bullets have greater energy
* <ItemLink id="void_card" /> will destroy the input items when the material cannon is full, be careful when setting up partitions!
* <ItemLink id="energy_card" /> can increase its energy capacity

## Recipe

<RecipeFor id="matter_cannon" />
