---
navigation:
  parent: items-blocks-machines/items-blocks-machines-index.md
title: Molecular Assembly Room
  icon: molecular_assembler
  position: 310
categories:
- machines
item_ids:
- ae2:molecular_assembler
---

# molecular assembly room

<BlockImage id="molecular_assembler" scale="8" />

The molecular assembly room will receive the items input into it and perform the operations set by adjacent <ItemLink id="pattern_provider" />, or perform the operations set by <ItemLink id="crafting_pattern" />, <ItemLink id="smithing_table_pattern" />, and <ItemLink id="stonecutting_pattern" />, and output the product to the adjacent container.

The assembly room below contains a sample "1x Oak Log = 4x Oak Plank". Put an oak log into the upper hopper and the molecular assembly chamber will start crafting and pop the oak plank into the lower hopper.

<GameScene zoom="6" background="transparent">
  <ImportStructure src="../assets/assemblies/standalone_assembler.snbt" />
  <IsometricCamera yaw="195" pitch="30" />
</GameScene>

## The main purpose of the molecular assembly chamber

Their main purpose is to be placed adjacent to <ItemLink id="pattern_provider" />. The pattern supplier has special behavior in this case and will import the relevant pattern and material into the adjacent assembly room. Because the assembly chamber will automatically pop the product into an adjacent container (that is, into the return column of the pattern supplier), the adjacent assembly chamber and pattern supplier are all that is needed to automatically synthesize the pattern.

<GameScene zoom="4" background="transparent">
  <ImportStructure src="../assets/assemblies/assembler_tower.snbt" />
  <IsometricCamera yaw="195" pitch="30" />
</GameScene>

## upgrade

The molecular assembly room supports the following [upgrades](upgrade_cards.md):

*   <ItemLink id="speed_card" />

## Recipe

<RecipeFor id="molecular_assembler" />

## Comments

Optifine breaks the "pop to adjacent container" functionality, causing most crafting facilities that require an assembly room to not work.