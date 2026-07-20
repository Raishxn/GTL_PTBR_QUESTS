---
navigation:
  parent: example-setups/example-setups-index.md
title: Advanced Setus Quartz Farm
  icon: certus_quartz_crystal
  position: 120
---

#Advanced Setus Quartz Farm

This facility is not much different from [semiauto-certus-farm.md], the only difference is that this facility can be fully integrated into the ME system.

This facility does not require extensive caching or manual replacement of parent rocks, it utilizes Charger Automation (charger-automation.md) and Throw-in-water-automation.md to automate the above tasks.

**This is a complex building with occlusion, and the viewing angle can be rotated to observe from all directions**

<GameScene zoom="6" interactive={true}>
  <ImportStructure src="../assets/assemblies/advanced_certus_farm.snbt" />

  <BoxAnnotation color="#ddaaaa" min="3.7 2 1" max="4 3 2">
(1) Destruction Panel #1: No GUI available, but luck can be attached.
  </BoxAnnotation>

  <BoxAnnotation color="#ddaaaa" min="2 2 1.7" max="3 3 2">
(2) Storage Bus #1: Filtered Seth Quartz Crystal.
        <ItemImage id="certus_quartz_crystal" scale="2" />
  </BoxAnnotation>

  <DiamondAnnotation pos="3 2.5 1.5" color="#ff0000">
Quartz Cluster Destroyer Subnetwork
  </DiamondAnnotation>

  <BoxAnnotation color="#aaddaa" min="3.7 1 1" max="4 2 2">
(3) Destruction Panel #2: No GUI available, with precision collection.
  </BoxAnnotation>

  <BoxAnnotation color="#aaddaa" min="2 1 1.7" max="3 2 2">
(4) Storage Bus #2: Filter Seth Quartz Block.
        <BlockImage id="quartz_block" scale="2" />
  </BoxAnnotation>

  <DiamondAnnotation pos="3 1.5 1.5" color="#00ff00">
Sethus Quartz Block Destroyer Subnetwork
  </DiamondAnnotation>

  <BoxAnnotation color="#ffddaa" min="4 0.7 1" max="5 1 2">
(5) Molding panel: default configuration.
  </BoxAnnotation>

  <BoxAnnotation color="#ffddaa" min="2 0.7 2" max="3 1 3">
(6) Input bus: Filtered flawless Sethus quartz parent rock.
        <BlockImage id="flawed_budding_quartz" scale="2" />
  </BoxAnnotation>

  <DiamondAnnotation pos="3 0.5 1.5" color="#ddcc00">
Parent rock placer subnetwork
  </DiamondAnnotation>

  <BoxAnnotation color="#aaaadd" min="1.7 2 2" max="2 3 3">
(7) Storage Bus #3: Filtered Setus Quartz Crystal. Priority is higher than the main network.
        <ItemImage id="certus_quartz_crystal" scale="2" />
  </BoxAnnotation>

  <BoxAnnotation color="#aaaadd" min="2 1 2" max="3 2 3">
(8) Interface: Set to store 1 Flawed Setus Quartz Mother Rock in itself, equipped with a synthesis card.
        <Row><BlockImage id="flawed_budding_quartz" scale="2" /> <ItemImage id="crafting_card" scale="2" /></Row>
  </BoxAnnotation>

<DiamondAnnotation pos="1.5 0.5 0" color="#00ff00">
to the main network, charger automation facilities, and water drop automation facilities
        <Row>
        <GameScene zoom="3" background="transparent">
          <ImportStructure src="../assets/assemblies/charger_automation.snbt" />
          <IsometricCamera yaw="195" pitch="30" />
        </GameScene>
        <GameScene zoom="3" background="transparent">
          <ImportStructure src="../assets/assemblies/throw_in_water.snbt" />
          <IsometricCamera yaw="195" pitch="30" />
        </GameScene>
        </Row>
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
* <ItemLink id="import_bus" />(6) is set to filter <ItemLink id="flawed_budding_quartz" />.

### Main network:

* The third <ItemLink id="storage_bus" /> (7) is set to filter <ItemLink id="certus_quartz_crystal" />, and its [priority](../ae2-mechanics/import-export-storage.md#storage-priority) is higher than the main network storage.
* <ItemLink id="interface" />(8) is set to store 1 Flawed Cetus Quartz Mother Rock in itself, equipped with <ItemLink id="crafting_card" />.

## Working principle

### Quartz Cluster Destroyer:

The Quartz Cluster Destroyer subnetwork functions very similarly to the subnetwork in [simple-certus-farm.md].

1. <ItemLink id="annihilation_plane" /> tries to destroy things in front of it, but since the only storage location in the subnet is <ItemLink id="storage_bus" /> that filters <ItemLink id="certus_quartz_crystal" />, it will only destroy <ItemLink id="quartz_cluster" />.
2. <ItemLink id="storage_bus" /> Store the Setus Quartz Crystal in the barrel.

### Cetus Quartz Block Destroyer:

The function of the Setus Quartz Block Destroyer is to destroy the parent rock when it becomes exhausted and becomes <ItemLink id="quartz_block" />. The principle of this facility is similar to that of the quartz cluster destroyer.

1. <ItemLink id="annihilation_plane" /> tries to destroy things in front of it, but since the only storage location in the subnet is <ItemLink id="storage_bus" /> that filters <ItemLink id="quartz_block" />, it will only destroy <ItemLink id="quartz_block" />. This panel needs to be accompanied by accurate collection to avoid degradation caused by the act of destroying the parent rock itself.
2. <ItemLink id="storage_bus" /> deposits the Sethus quartz block into <ItemLink id="interface" /> and gives it to the [throw-in-water-automation.md] facility to use it to make new <ItemLink id="flawed_budding_quartz" />.

### Parent rock placer:

The function of the parent rock placer is to place new <ItemLink id="flawed_budding_quartz" /> when the depleted parent rock is destroyed by the destroyer sub-network.

1. <ItemLink id="import_bus" /> extracts the parent rock from <ItemLink id="interface" /> and stores it in [network storage](../ae2-mechanics/import-export-storage.md).
2. The only storage location in the sub-network is <ItemLink id="formation_plane" />, which will place the parent rock.

### Main network:

* <ItemLink id="storage_bus" /> enables the main network (and the [charger-automation.md] facility) to access the Sethus Quartz Crystal in the barrel. Its [priority](../ae2-mechanics/import-export-storage.md#storage-priority) is higher, so the Sethus Quartz Crystal will go to the barrel instead of the main network storage.
* <ItemLink id="interface" /> enables the placer subnetwork to access 1 <ItemLink id="flawed_budding_quartz" />, and enables the Sethus Quartz Block Breaker subnetwork to transfer depleted parent rock back to the main network. <ItemLink id="crafting_card" /> allows the interface to send a request to create parent rock to the [Automatic Synthesis](../ae2-mechanics/autocrafting.md) system of the main network.