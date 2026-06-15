---
navigation:
  parent: example-setups/example-setups-index.md
title: Amethyst Farm
  icon: minecraft:amethyst_shard
---

# Get amethyst

Although <ItemLink id="growth_accelerator" /> is effective on Amethyst, the common method of filtering [Certus Quartz Buds](../items-blocks-machines/budding_certus.md) with <ItemLink id="annihilation_plane" /> is not effective on Amethyst Buds. Unlike ungrown Setus Quartz Buds which drop <ItemLink id="certus_quartz_dust" />, ungrown Amethyst Buds drop nothing, and the Network can always hold "air", so destroying panels will always destroy them.

A way around this issue is to attach the destruction panel to Precision Acquisition. In this case, the ungrown amethyst buds *will* drop items (the amethyst buds themselves at each stage), which can be filtered.

<ItemLink id="minecraft:amethyst_cluster" /> needs to be placed again by <ItemLink id="formation_plane" /> and destroyed again by <ItemLink id="annihilation_plane" /> without precise collection to get <ItemLink id="minecraft:amethyst_shard" />.

Note that because the amethyst clusters are directional, there should be a full square face on the opposite side of the molded panel.

<GameScene zoom="6" interactive={true}>
  <ImportStructure src="../assets/assemblies/amethyst_farm.snbt" />

  <BoxAnnotation color="#dddddd" min="2.7 1 1" max="3 2 2">
(1) Destruction Panel #1: No GUI available, with precision collection attached.
  </BoxAnnotation>

  <BoxAnnotation color="#dddddd" min="2 1 1" max="2.3 2 2">
(2) Molded panel: filtering amethyst clusters.
        <ItemImage id="minecraft:amethyst_cluster" scale="2" />
  </BoxAnnotation>

  <BoxAnnotation color="#dddddd" min="1.3 0.7 1" max="2 1 2">
(3) Destruction Panel #2: No GUI available, luck can be attached.
  </BoxAnnotation>

  <BoxAnnotation color="#dddddd" min="1 0 1" max="1.3 1 2">
(4) Storage Bus #1: Filter the Amethyst Shards.
        <ItemImage id="minecraft:amethyst_shard" scale="2" />
  </BoxAnnotation>

  <BoxAnnotation color="#dddddd" min="0 0 .7" max="1 1 1">
(5) Storage Bus #2: Filter the Amethyst Shards. Priority is higher than main storage.
        <ItemImage id="minecraft:amethyst_shard" scale="2" />
  </BoxAnnotation>

<DiamondAnnotation pos="0 0.5 0.5" color="#00ff00">
to main network
    </DiamondAnnotation>

  <IsometricCamera yaw="195" pitch="30" />
</GameScene>

## Configuration

* The first <ItemLink id="annihilation_plane" /> (1) has no GUI and cannot be configured, but must be accompanied by accurate collection.
* <ItemLink id="formation_plane" />(2) is set to filter <ItemLink id="minecraft:amethyst_cluster" />.
* The second <ItemLink id="annihilation_plane" /> (3) has no GUI and cannot be configured. It can be attached with fortune.
* The first <ItemLink id="storage_bus" />(4) is set to filter <ItemLink id="minecraft:amethyst_shard" />.
* The second <ItemLink id="storage_bus" />(5) is set to filter <ItemLink id="minecraft:amethyst_shard" />, and the [priority](../ae2-mechanics/import-export-storage.md#storage-priority) is higher than the main storage.

## Working principle

1. The first <ItemLink id="annihilation_plane" /> will try to destroy things in front of it, but since the only storage location in the subnet is <ItemLink id="formation_plane" /> that is filtered into an amethyst cluster, it will only destroy <ItemLink id="minecraft:amethyst_cluster" />. It will only take effect when the panel is equipped with Precision Collection. If the panel is not equipped with this enchantment, it will also destroy the ungrown sprouts that will drop nothing.
2. <ItemLink id="formation_plane" />Place the amethyst cluster on the block opposite to it.
3. The second <ItemLink id="annihilation_plane" /> is obtained by destroying the amethyst cluster and getting <ItemLink id="minecraft:amethyst_shard" />.
4. The first <ItemLink id="storage_bus" /> deposits the amethyst fragments into the barrel. Since the second destroying panel will only destroy the growing amethyst cluster, there is no actual need to set up a filter for this bus.
5. The second <ItemLink id="storage_bus" /> enables the main network to access all amethyst clusters in the barrel. Its [priority](../ae2-mechanics/import-export-storage.md#storage-priority) should be higher than the main network, so the amethyst shards will be stored in the barrel instead of the main storage.
