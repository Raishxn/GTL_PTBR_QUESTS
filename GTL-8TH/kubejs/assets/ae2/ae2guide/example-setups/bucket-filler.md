---
navigation:
  parent: example-setups/example-setups-index.md
title: Iron drum filler
  icon: minecraft:water_bucket
---

# Iron barrel filler

See [Bucket Empty](bucket-emptier.md).

Please note that this facility uses <ItemLink id="pattern_provider" />, which means it needs to be used in conjunction with your [Automatic Synthesis](../ae2-mechanics/autocrafting.md) facility.

Life gets rough, and sometimes you need a bucket of fluid rather than the fluid itself. Sometimes there is a machine to help you complete these tasks (such as the fluid transposer in Thermal Expansion), but this module is not always available. Fortunately, the original version also has a slightly less convenient way to deal with it, and that is <ItemLink id="minecraft:dispenser" />.

**Note that this facility is usually not necessary, the fluid substitution option in the [Pattern Encoding Terminal](../items-blocks-machines/terminals.md#pattern-encoding-terminal) allows you to use the fluid itself in crafting recipes, rather than the barreled fluid. **

<GameScene zoom="6" interactive={true}>
  <ImportStructure src="../assets/assemblies/bucket_filler.snbt" />

<BoxAnnotation color="#dddddd" min="2 1 0" max="3 2 1">
(1) Template provider: Set to lock synthesis "when there is a redstone signal" and equipped with corresponding processing templates.

        <Row>
![Fill pattern](../assets/diagrams/water_fill_pattern_small.png)
![Fill pattern](../assets/diagrams/lava_fill_pattern_small.png)
        </Row>
  </BoxAnnotation>

<BoxAnnotation color="#dddddd" min="3 1.1 0.1" max="3.2 1.9 0.9">
(2) Interface: Default configuration.
  </BoxAnnotation>

<BoxAnnotation color="#dddddd" min="3.1 1.1 0.8" max="3.9 1.9 1">
(3) Storage bus #1: Default configuration.
  </BoxAnnotation>

<BoxAnnotation color="#dddddd" min="4.05 1.05 0.8" max="4.95 1.95 1">
(4) Forming panel: Set to exclude iron barrels through the reverse card.
        <Row><ItemImage id="minecraft:bucket" scale="2" /><ItemImage id="inverter_card" scale="2" /></Row>
  </BoxAnnotation>

<BoxAnnotation color="#dddddd" min="3.2 2 1.2" max="3.8 2.2 1.8">
(5) Input bus: Set to exclude iron barrels through the inverter card.
        <Row><ItemImage id="minecraft:bucket" scale="2" /><ItemImage id="inverter_card" scale="2" /></Row>
  </BoxAnnotation>

<BoxAnnotation color="#dddddd" min="2.1 2 0.1" max="2.9 2.2 0.9">
(6) Storage bus #2: Default configuration.
  </BoxAnnotation>

<DiamondAnnotation pos="0 1.5 0.5" color="#00ff00">
to main network
    </DiamondAnnotation>

  <IsometricCamera yaw="225" pitch="45" />
</GameScene>

## Configuration

* <ItemLink id="pattern_provider" />(1) is set to "when there is a redstone signal" locked synthesis, and the corresponding <ItemLink id="processing_pattern" /> is installed.

![Charger Sample](../assets/diagrams/water_fill_pattern.png)
![Charger Sample](../assets/diagrams/lava_fill_pattern.png)

* <ItemLink id="interface" />(2) is in default configuration.
* The first <ItemLink id="storage_bus" />(3) is in default configuration.
* <ItemLink id="formation_plane" /> (4) is set to exclude iron barrels through the reverse phase card.
  <Row><ItemImage id="minecraft:bucket" scale="2" /><ItemImage id="inverter_card" scale="2" /></Row>
* <ItemLink id="import_bus" /> (5) is set to exclude iron barrels through the reverse phase card.
  <Row><ItemImage id="minecraft:bucket" scale="2" /><ItemImage id="inverter_card" scale="2" /></Row>
* The second <ItemLink id="storage_bus" />(6) is in default configuration.

## Working principle

1. <ItemLink id="pattern_provider" /> feeds the materials into <ItemLink id="interface" />.
(As an optimization, it actually outputs directly to storage buses, which are similar to the output side of the provider itself. The items don't actually go into the interface.)
2. Through the facilities described in [Pipe Subnet](pipe-subnet.md#providing-to-multiple-places), the iron barrel will arrive at <ItemLink id="minecraft:dispenser" />, and the fluid will be placed using the forming panel.
3. <ItemLink id="minecraft:comparator" /> detects the iron barrel in the launcher, thereby simultaneously activating the launcher and locking the <ItemLink id="pattern_provider" />.
4. The launcher is filled with fluid in an iron bucket. At this time, there is a bucket filled with fluid inside the launcher.
5. <ItemLink id="import_bus" /> extracts the empty bucket from the transmitter, stores it into the sample provider through <ItemLink id="storage_bus" />, and returns it to the main network.
6. The comparator detects that the transmitter is empty, thus unlocking the supplier.