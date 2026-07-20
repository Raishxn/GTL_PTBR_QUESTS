---
navigation:
  parent: example-setups/example-setups-index.md
title: Charger Automation
  icon: charger
---

#chargerautomation

Please note that this facility uses <ItemLink id="pattern_provider" />, which means it needs to be used in conjunction with your [Automatic Synthesis](../ae2-mechanics/autocrafting.md) facility. If independent automation <ItemLink id="charger" /> is required, funnels, boxes, etc. should be used.

Automating <ItemLink id="charger" /> is relatively simple. <ItemLink id="pattern_provider" /> Send the material into the charger, and then send the product back to the supplier through [pipe subnet] (pipe-subnet.md) or other item pipes.

<GameScene zoom="6" interactive={true}>
  <ImportStructure src="../assets/assemblies/charger_automation.snbt" />

<BoxAnnotation color="#dddddd" min="1 0 0" max="2 1 1">
(1) Template provider: Default configuration, equipped with corresponding templates. Provides energy at the same time.

![Charger pattern](../assets/diagrams/charger_pattern_small.png)
  </BoxAnnotation>

<BoxAnnotation color="#dddddd" min="0 1 0" max="1 1.3 1">
(2) Input bus: default configuration.
  </BoxAnnotation>

<BoxAnnotation color="#dddddd" min="1 1 0" max="2 1.3 1">
(3) Storage bus: default configuration.
  </BoxAnnotation>

<DiamondAnnotation pos="4 0.5 0.5" color="#00ff00">
to main network
    </DiamondAnnotation>

  <IsometricCamera yaw="195" pitch="30" />
</GameScene>

## Configuration

* <ItemLink id="pattern_provider" />(1) is in default configuration and has the corresponding <ItemLink id="processing_pattern" /> installed. It also provides [Energy](../ae2-mechanics/energy.md) for <ItemLink id="charger" />, similar to [Cables](../items-blocks-machines/cables.md).
  
![Charger Pattern](../assets/diagrams/charger_pattern.png)

* <ItemLink id="import_bus" />(2) is in default configuration.
* <ItemLink id="storage_bus" />(3) is in default configuration.

## Working principle

1. <ItemLink id="pattern_provider" /> feeds the materials into <ItemLink id="charger" />.
2. The charger completes charging.
3. <ItemLink id="import_bus" /> on the green subnetwork extracts the charged product and tries to store it in [Network Storage](../ae2-mechanics/import-export-storage.md).
4. The only storage location on the green subnet is <ItemLink id="storage_bus" />, which feeds the product to the sample provider and returns it to the main network.
