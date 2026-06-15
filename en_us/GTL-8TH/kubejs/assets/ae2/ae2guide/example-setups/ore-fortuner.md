---
navigation:
  parent: example-setups/example-setups-index.md
title: Automatic fortune ore machine
  icon: minecraft:raw_iron
---

#Automated fortune mining ore

<ItemLink id="annihilation_plane" /> accepts all pickaxe enchantments, including Fortune, so one of its common uses is to enchant several panels with Fortune and have <ItemLink id="formation_plane" /> and <ItemLink id="annihilation_plane" /> quickly place and destroy ores.

Note that the running speed of <ItemLink id="import_bus" /> "slowly increases": this facility is slow on startup and reaches maximum speed after a few seconds.

<GameScene zoom="6" interactive={true}>
  <ImportStructure src="../assets/assemblies/ore_fortuner.snbt" />

  <BoxAnnotation color="#dddddd" min="2.7 0 2" max="3 1 3">
(1) Input bus: equipped with several accelerator cards.
        <ItemImage id="speed_card" scale="2" />
  </BoxAnnotation>

  <BoxAnnotation color="#dddddd" min="0 0 2" max="2 1 2.3">
(2) Molding panel: default configuration.
  </BoxAnnotation>

  <BoxAnnotation color="#dddddd" min="0 0 0.7" max="2 1 1">
(3) Destruction panel: No GUI available, but luck can be attached.
  </BoxAnnotation>

  <BoxAnnotation color="#dddddd" min="2.7 0 0" max="3 1 1">
(4) Storage bus: default configuration.
  </BoxAnnotation>

<DiamondAnnotation pos="3.5 0.5 2.5" color="#00ff00">
enter
    </DiamondAnnotation>

<DiamondAnnotation pos="3.5 0.5 0.5" color="#00ff00">
output
    </DiamondAnnotation>

<DiamondAnnotation pos="4 0.5 1.5" color="#00ff00">
to main network
    </DiamondAnnotation>

  <IsometricCamera yaw="195" pitch="30" />
</GameScene>

## Configuration

* <ItemLink id="import_bus" />(1) contains several <ItemLink id="speed_card" />. The more molded panels in the array, the more accelerator cards are needed, allowing the bus to pick up more items at once.
* <ItemLink id="formation_plane" />(2) is in default configuration.
* <ItemLink id="annihilation_plane" /> (3) has no GUI and cannot be configured, with luck attached.
* <ItemLink id="storage_bus" />(4) is in default configuration.

## Working principle

1. <ItemLink id="import_bus" /> on the green subnet imports the block from the first barrel to [Network Storage](../ae2-mechanics/import-export-storage.md).
2. The only storage locations on the green subnet are <ItemLink id="formation_plane" />, which will place blocks.
3. <ItemLink id="annihilation_plane" /> on the orange sub-network is used to destroy blocks, and you need to give them luck.
4. <ItemLink id="storage_bus" /> on the orange subnetwork stores the destruction product into the second barrel.
