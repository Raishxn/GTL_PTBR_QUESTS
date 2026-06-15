---
navigation:
  parent: example-setups/example-setups-index.md
title: Simple Seth Quartz Farm
  icon: certus_quartz_crystal
  position: 110
---

# SIMPLE SETES QUARTZ FARM

As mentioned in [Growth of Certus Quartz](../ae2-mechanics/certus-growth.md), automated collection of <ItemLink id="certus_quartz_crystal" /> requires <ItemLink id="annihilation_plane" /> and <ItemLink id="storage_bus" />. <ItemLink id="growth_accelerator" /> can be used to greatly accelerate the growth of Setus Quartz Buds, and then destroy the grown <ItemLink id="quartz_cluster" /> by destroying the panel. Different Quartz Buds and Quartz Clusters can be distinguished by the convenient and intentional property that ungrown Setus Quartz Buds drop <ItemLink id="certus_quartz_dust" /> instead of nothing at all.

This farm can be run fully automatically on <ItemLink id="flawless_budding_quartz" />, using defective, cracked, or broken Sethus quartz parent rock requires manual replacement of the parent rock. Or it can be automated using the methods mentioned in [Semiauto-certus-farm.md] and [Advanced Certus Quartz Farm](advanced-certus-farm.md).

<GameScene zoom="6" interactive={true}>
  <ImportStructure src="../assets/assemblies/simple_certus_farm.snbt" />

  <BoxAnnotation color="#dddddd" min="3.7 1 1" max="4 2 2">
(1) Destruction panel: No GUI available, but luck can be attached.
  </BoxAnnotation>

  <BoxAnnotation color="#dddddd" min="3 1 1" max="3.3 2 2">
(2) Storage Bus #1: Filtered Seth Quartz Crystal.
        <ItemImage id="certus_quartz_crystal" scale="2" />
  </BoxAnnotation>

  <BoxAnnotation color="#dddddd" min="3 1 .7" max="2 2 1">
(3) Storage Bus #2: Filtered Seth Quartz Crystal. Priority is higher than main network storage.
        <ItemImage id="certus_quartz_crystal" scale="2" />
  </BoxAnnotation>

<DiamondAnnotation pos="1 0.5 0.5" color="#00ff00">
to main network
    </DiamondAnnotation>

  <IsometricCamera yaw="195" pitch="30" />
</GameScene>

## Configuration

* The first <ItemLink id="annihilation_plane" />(1) has no GUI and cannot be configured, but can be attached with fortune.
* The first <ItemLink id="storage_bus" />(2) is set to filter <ItemLink id="certus_quartz_crystal" />.
* The second <ItemLink id="storage_bus" />(3) is set to filter <ItemLink id="certus_quartz_crystal" />, and the [priority](../ae2-mechanics/import-export-storage.md#storage-priority) is higher than the main network storage.

## Working principle

1. <ItemLink id="annihilation_plane" /> tries to destroy things in front of it, but since the only storage location in the subnet is <ItemLink id="storage_bus" /> that filters <ItemLink id="certus_quartz_crystal" />, it will only destroy <ItemLink id="quartz_cluster" />.
2. The first <ItemLink id="storage_bus" /> deposits the Setus Quartz Crystal into the barrel.
3. The second <ItemLink id="storage_bus" /> enables the main network to access the Sethus quartz crystal in the barrel. Its [priority](../ae2-mechanics/import-export-storage.md#storage-priority) is higher, so the Sethus Quartz Crystal will be stored in the barrel instead of the main network storage.
