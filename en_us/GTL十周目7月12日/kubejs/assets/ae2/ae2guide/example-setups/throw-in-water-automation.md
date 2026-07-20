---
navigation:
  parent: example-setups/example-setups-index.md
title: Water injection automation
  icon: fluix_crystal
---

# Automatic watering formula

Please note that this facility uses <ItemLink id="pattern_provider" />, which means it needs to be used in conjunction with your [Automatic Synthesis](../ae2-mechanics/autocrafting.md) facility.

Some recipes may require items to be dropped into water (although the same facility can be used to handle other requirements for items to be dropped somewhere). Such recipes can be automated using <ItemLink id="formation_plane" />, <ItemLink id="annihilation_plane" />, and the supporting infrastructure, namely 2 tuned [pipe subnets] (pipe-subnet.md).

This facility should be used in conjunction with [Charger Automation](charger-automation.md) to produce <ItemLink id="charged_certus_quartz_crystal" />.

<GameScene zoom="6" interactive={true}>
  <ImportStructure src="../assets/assemblies/throw_in_water.snbt" />

<BoxAnnotation color="#dddddd" min="2 0 1" max="3 1 2">
(1) Template provider: Default configuration, equipped with corresponding processing templates.

![Fluix sample](../assets/diagrams/fluix_pattern_small.png) ![Flawed parent rock sample](../assets/diagrams/flawed_budding_pattern_small.png)
  </BoxAnnotation>

<BoxAnnotation color="#dddddd" min="1.7 0 1" max="2 1 2">
(2) Interface: Default configuration.
  </BoxAnnotation>

<BoxAnnotation color="#dddddd" min="1 .7 1" max="2 1 2">
(3) Molding Panel: Set to drop as an item.
  </BoxAnnotation>

<BoxAnnotation color="#dddddd" min="1 2 1" max="2 2.3 2">
(4) Destruction panel: No GUI available.
  </BoxAnnotation>

<BoxAnnotation color="#dddddd" min="2 1 1" max="3 1.3 2">
(5) Storage bus: filter template output.
        <Row><ItemImage id="fluix_crystal" scale="2" /><BlockImage id="flawless_budding_quartz" scale="2" /></Row>
  </BoxAnnotation>

<DiamondAnnotation pos="3.9 0.5 1.5" color="#00ff00">
To main network or charger automation facility
        <GameScene zoom="3" background="transparent">
          <ImportStructure src="../assets/assemblies/charger_automation.snbt" />
          <IsometricCamera yaw="195" pitch="30" />
        </GameScene>
    </DiamondAnnotation>

  <IsometricCamera yaw="180" pitch="0" />
</GameScene>

## Configuration and templates

* <ItemLink id="pattern_provider" />(1) is in default configuration, with associated <ItemLink id="processing_pattern" /> installed.
* For <ItemLink id="fluix_crystal" />, JEI/REI's default recipe will do:

![Fluix Pattern](../assets/diagrams/fluix_pattern.png)

* For <ItemLink id="flawed_budding_quartz" />, it is better to use <ItemLink id="quartz_block" /> directly to manufacture, otherwise the input and output items may overlap, which is not conducive to configuration filtering:

![Flawed parent rock sample](../assets/diagrams/flawed_budding_pattern.png)

* <ItemLink id="interface" />(2) is in default configuration.
* <ItemLink id="formation_plane" />(3) is set to drop as an item.
* <ItemLink id="annihilation_plane" />(4) has no GUI and cannot be configured.
* <ItemLink id="storage_bus" />(5) is set to filter sample products.

## Working principle

1. <ItemLink id="pattern_provider" /> feeds the material into the adjacent <ItemLink id="interface" /> (located in the green sub-network).
2. The interface (default is set to not store anything) attempts to send the things in it to [network storage](../ae2-mechanics/import-export-storage.md).
3. The only storage location on the green subnet is <ItemLink id="formation_plane" />, which will drop the received items into the water.
4. <ItemLink id="annihilation_plane" /> on the orange subnetwork will try to pick up the items just thrown in, but since <ItemLink id="storage_bus" /> on the template supplier (the only storage location of the orange subnetwork) is set to filter synthesis products, the panel will not pick up the recipe materials.
5. Items change in the world.
6. Since the storage bus can store products, destroying the panel can now pick up the items in front of it.
7. The storage bus stores the product in the sample provider and returns it to the main network.
