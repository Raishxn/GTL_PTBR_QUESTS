---
navigation:
  parent: example-setups/example-setups-index.md
title: Semi-automatic Seth Quartz Farm
  icon: certus_quartz_crystal
  position: 115
---

# Semi-Automatic Seth Quartz Farm

Unfortunately, [Simple Certus Quartz Farm](simple-certus-farm.md) requires <ItemLink id="flawless_budding_quartz" /> to be fully automated. This requires [Spatial IO](../ae2-mechanics/spatial-io.md) or building a farm directly at [Meteorite](../ae2-mechanics/meteorites.md).

However, AE2 is able to place and break blocks, so there might be some potential for a farm to replace the Sethus Quartz matrix for you. (You still need to periodically put <ItemLink id="flawed_budding_quartz" /> into the input barrel and remove <ItemLink id="quartz_block" /> from the depleted parent rock barrel.)

Full automation of this facility is available at Advanced Certus Quartz Farm (advanced-certus-farm.md).

This farm is much more complicated than [Simple Certus Quartz Farm](simple-certus-farm.md) because it is actually a stack of 3 separate facilities.

**This is a complex building with occlusion, and the viewing angle can be rotated to observe from all directions**

<GameScene zoom="6" interactive={true}>
  <ImportStructure src="../assets/assemblies/semiauto_certus_farm.snbt" />

  <BoxAnnotation color="#ddaaaa" min="3.7 2 1" max="4 3 2">
(1) Destruction Panel #1: No GUI available, but luck can be attached.
  </BoxAnnotation>

  <BoxAnnotation color="#ddaaaa" min="2 2 1" max="2.3 3 2">
(2) Storage Bus #1: Filtered Seth Quartz Crystal.
        <ItemImage id="certus_quartz_crystal" scale="2" />
  </BoxAnnotation>

  <DiamondAnnotation pos="3 2.5 1.5" color="#ff0000">
Quartz Cluster Destroyer Subnetwork
  </DiamondAnnotation>

  <BoxAnnotation color="#aaddaa" min="3.7 1 1" max="4 2 2">
(3) Destruction Panel #2: No GUI available, with precision collection.
  </BoxAnnotation>

  <BoxAnnotation color="#aaddaa" min="2 1 1" max="2.3 2 2">
(4) Storage Bus #2: Filter Seth Quartz Block.
        <BlockImage id="quartz_block" scale="2" />
  </BoxAnnotation>

  <DiamondAnnotation pos="3 1.5 1.5" color="#00ff00">
Sethus Quartz Block Destroyer Subnetwork
  </DiamondAnnotation>

  <BoxAnnotation color="#ffddaa" min="4 0.7 1" max="5 1 2">
(5) Molding panel: default configuration.
  </BoxAnnotation>

  <BoxAnnotation color="#ffddaa" min="2 0 1" max="2.3 1 2">
(6) Input bus: default configuration.
  </BoxAnnotation>

  <DiamondAnnotation pos="3 0.5 1.5" color="#ddcc00">
Parent rock placer subnetwork
  </DiamondAnnotation>

  <BoxAnnotation color="#aaaadd" min="0.7 2 1" max="1 3 2">
(7) Storage Bus #3: Filtered Setus Quartz Crystal. Priority is higher than the main network.
        <ItemImage id="certus_quartz_crystal" scale="2" />
  </BoxAnnotation>

    <DiamondAnnotation pos="1.5 0.5 1.5" color="#00ff00">
Hand-placed flawless Sethus quartz matrix.
        <BlockImage id="flawed_budding_quartz" scale="2" />
    </DiamondAnnotation>

    <DiamondAnnotation pos="1.5 1.5 1.5" color="#00ff00">
Manually remove the Sethus Quartz Block.
        <BlockImage id="quartz_block" scale="2" />
    </DiamondAnnotation>

<DiamondAnnotation pos="0.5 0.5 0" color="#00ff00">
to main network
    </DiamondAnnotation>

  <IsometricCamera yaw="165" pitch="5" />
</GameScene>

## set up

### Quartz Cluster Destroyer:

* The first <ItemLink id="annihilation_plane" /> (1) has no GUI and cannot be configured. It can be attached with fortune.
* The first <ItemLink id="storage_bus" />(2) is set to filter <ItemLink id="certus_quartz_crystal" />.

### Cetus Quartz Block Destroyer:

* The second <ItemLink id="annihilation_plane" />(3) has no GUI and cannot be configured, but must be accompanied by accurate collection.
* The second <ItemLink id="storage_bus" />(4) is set to filter <ItemLink id="quartz_block" />.

### Parent rock placer:

* <ItemLink id="formation_plane" />(5) is in default configuration.
* <ItemLink id="import_bus" />(6) is in default configuration.

### Main network:

* The third <ItemLink id="storage_bus" /> (7) is set to filter <ItemLink id="certus_quartz_crystal" />, and its [priority](../ae2-mechanics/import-export-storage.md#storage-priority) is higher than the main network storage.

## Working principle

### Quartz Cluster Destroyer:

The Quartz Cluster Destroyer subnetwork functions very similarly to the subnetwork in [simple-certus-farm.md].

1. <ItemLink id="annihilation_plane" /> tries to destroy things in front of it, but since the only storage location in the subnet is <ItemLink id="storage_bus" /> that filters <ItemLink id="certus_quartz_crystal" />, it will only destroy <ItemLink id="quartz_cluster" />.
2. <ItemLink id="storage_bus" /> Store the Setus Quartz Crystal in the barrel.

### Cetus Quartz Block Destroyer:

The function of the Setus Quartz Block Destroyer is to destroy the parent rock when it becomes exhausted and becomes <ItemLink id="quartz_block" />. The principle of this facility is similar to that of the quartz cluster destroyer.

1. <ItemLink id="annihilation_plane" /> tries to destroy things in front of it, but since the only storage location in the subnet is <ItemLink id="storage_bus" /> that filters <ItemLink id="quartz_block" />, it will only destroy <ItemLink id="quartz_block" />. This panel needs to be accompanied by accurate collection to avoid degradation caused by the act of destroying the parent rock itself.
2. <ItemLink id="storage_bus" /> Store the Sethus quartz block in the barrel used to store depleted parent rock. You need to manually put it and <ItemLink id="charged_certus_quartz_crystal" /> into the water to upgrade.

### Parent rock placer:

The function of the parent rock placer is to place new <ItemLink id="flawed_budding_quartz" /> when the depleted parent rock is destroyed by the destroyer sub-network.

1. <ItemLink id="import_bus" /> extracts parent rock from the input barrel.
2. The only storage location in the sub-network is <ItemLink id="formation_plane" />, which will place the parent rock.

### Main network:

* <ItemLink id="storage_bus" /> enables the main network (and the [charger-automation.md] facility) to access the Sethus Quartz Crystal in the barrel. Its [priority](../ae2-mechanics/import-export-storage.md#storage-priority) is higher, so the Sethus Quartz Crystal will go to the barrel instead of the main network storage.