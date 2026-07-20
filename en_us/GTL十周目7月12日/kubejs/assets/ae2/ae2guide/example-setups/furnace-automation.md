---
navigation:
  parent: example-setups/example-setups-index.md
title: Furnace Automation
  icon: minecraft:furnace
---

#furnaceautomation

Please note that this facility uses <ItemLink id="pattern_provider" />, which means it needs to be used in conjunction with your [Automatic Synthesis](../ae2-mechanics/autocrafting.md) facility. If a separate automated furnace is required, hoppers, boxes, etc. should be used.

Automation<ItemLink id="minecraft:furnace" /> is slightly more complex than simpler machines like Automation [Charger](../example-setups/charger-automation.md). The furnace requires input from two different sides and output from a third side. Items to be smelted must be input from the top, fuel must be input from the side, and products must be output from the bottom.

This can be solved by placing <ItemLink id="pattern_provider" /> on the top surface, <ItemLink id="export_bus" /> on the sides to continuously input fuel, and <ItemLink id="import_bus" /> on the bottom surface to return product to the network. However, doing so requires occupying 3 [channels](../ae2-mechanics/channels.md).

The following is a method that only takes up 1 channel:

<GameScene zoom="6" interactive={true}>
  <ImportStructure src="../assets/assemblies/furnace_automation.snbt" />

<BoxAnnotation color="#dddddd" min="1 0 0" max="2 1 1">
(1) Sample supplier: The Sethos quartz wrench is changed to a directional type, and the corresponding sample is installed.

![Iron Pattern](../assets/diagrams/furnace_pattern_small.png)
  </BoxAnnotation>

<BoxAnnotation color="#dddddd" min="1 1 0" max="2 1.3 1">
(2) Interface: Default configuration.
  </BoxAnnotation>

<BoxAnnotation color="#dddddd" min="1 1 0" max="1.3 2 1">
(3) Storage Bus #1: Filter Coal.
        <ItemImage id="minecraft:coal" scale="2" />
  </BoxAnnotation>

<BoxAnnotation color="#dddddd" min="0 2 0" max="1 2.3 1">
(4) Memory Bus #2: Set to exclude coal via the inverter card.
        <Row><ItemImage id="minecraft:coal" scale="2" /><ItemImage id="inverter_card" scale="2" /></Row>
  </BoxAnnotation>

<DiamondAnnotation pos="4 0.5 0.5" color="#00ff00">
to main network
    </DiamondAnnotation>

  <IsometricCamera yaw="195" pitch="30" />
</GameScene>

## Configuration

* <ItemLink id="pattern_provider" />(1) is in default configuration with corresponding <ItemLink id="processing_pattern" /> installed. Has been changed to directional type by <ItemLink id="certus_quartz_wrench" />.

![Iron Pattern](../assets/diagrams/furnace_pattern.png)

* <ItemLink id="interface" />(2) is in default configuration.
* The first <ItemLink id="storage_bus" />(3) is set to filter coal or other fuels.
* The second <ItemLink id="storage_bus" />(4) is set to exclude the used fuel via the inverter card with <ItemLink id="inverter_card" />.

## Working principle

1. <ItemLink id="pattern_provider" /> feeds the materials into <ItemLink id="interface" />.
(It actually outputs directly to storage buses, which are similar to the output side of the provider itself. Items don't actually enter the interface.)
2. The interface is set up not to store anything, so it will try to feed the material into [Network Storage](../ae2-mechanics/import-export-storage.md).
3. The only storage location on the green subnet is <ItemLink id="storage_bus" />. A bus that filters the coal feeds the coal through the side of the furnace into the fuel tank. The bus that filters non-coal sends the items to be smelted into the material slot through the top surface.
4. The furnace does its job.
5. The hopper directs the product out of the furnace floor and into the supplier's return tank, thereby returning it to the main network.
