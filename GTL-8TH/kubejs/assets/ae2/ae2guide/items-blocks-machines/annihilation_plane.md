---
navigation:
  parent: items-blocks-machines/items-blocks-machines-index.md
title: Destroy panel
  icon: annihilation_plane
  position: 210
categories:
- devices
item_ids:
- ae2:annihilation_plane
---

# Destroy panel

<GameScene zoom="8" background="transparent">
<ImportStructure src="../assets/blocks/annihilation_plane.snbt" />
</GameScene>

Destroying panels breaks blocks and picks up items. It will import items into [Network Storage](../ae2-mechanics/import-export-storage.md), similar to how <ItemLink id="import_bus" /> works. It will only pick up items that collide with the panel, not all items in the area.

The Destruction Panel accepts all pickaxe enchantments, so it can be enchanted with a very high level of Fortune and then placed with [Automated Ore Processing] (../example-setups/ore-fortuner.md) as long as the modpack allows it. In addition, Accurate Collection behaves the same as tools with this enchantment. Efficiency can reduce the energy consumption of destroying blocks, and durability can increase the probability of destroying without using energy.

The broken panel is [cable subparts](../ae2-mechanics/cable-subparts.md).

**Remember to allow fake players to be placed in the block you claim**

## Filter

Breaking panels will only break blocks or pick up items if the drop or item can be stored in the network. That is, *needs to limit the types of items that can be stored in its network* in order to filter the destruction panel, which is usually placed in [Subnetwork](../ae2-mechanics/subnetworks.md). This can be achieved using <ItemLink id="storage_bus" /> or setting the [Component](../items-blocks-machines/storage_cells.md) of the [Partition](cell_workbench.md).

<GameScene zoom="6" interactive={true}>
  <ImportStructure src="../assets/assemblies/annihilation_filtering.snbt" />

  <DiamondAnnotation pos="1 0.5 0.5" color="#00ff00">
Filter drops for destroyed things
  </DiamondAnnotation>

  <DiamondAnnotation pos=".5 0.5 2.5" color="#00ff00">
Zoned for drops from destroyed things
  </DiamondAnnotation>

  <IsometricCamera yaw="195" pitch="30" />
</GameScene>

What breaks panel filtering is *drops*. Therefore, if you want to set up to destroy only <ItemLink id="minecraft:amethyst_cluster" />, the panel must be equipped with accurate collection. Ungrown Amethyst Buds drop nothing, and the network always holds "air", so normal destruction panels will always destroy them.

## Destroy panel

<RecipeFor id="annihilation_plane" />
