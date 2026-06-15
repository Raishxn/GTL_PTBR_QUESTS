---
navigation:
  parent: example-setups/example-setups-index.md
title: Iron barrel emptyer
  icon: minecraft:bucket
---

#Iron barrel emptyer

See [bucket filler](bucket-filler.md).

Please note that this facility uses <ItemLink id="pattern_provider" />, which means it needs to be used in conjunction with your [Automatic Synthesis](../ae2-mechanics/autocrafting.md) facility.

Life has its hard times, and sometimes you just need the fluid itself, but you can only make it in a barrel. Sometimes there is a machine to help you complete these tasks (such as the fluid transposer in Thermal Expansion), but this module is not always available. Fortunately, the original version also has a slightly less convenient way to deal with it, and that is <ItemLink id="minecraft:dispenser" />.

<GameScene zoom="6" interactive={true}>
  <ImportStructure src="../assets/assemblies/bucket_emptier.snbt" />

<BoxAnnotation color="#dddddd" min="2 1 0" max="3 2 1">
(1) Template provider: Set to "when there is a redstone signal" to lock the synthesis, the blocking mode is enabled, and the corresponding processing template is installed.

        <Row>
![Fill pattern](../assets/diagrams/water_empty_pattern_small.png)
![Fill pattern](../assets/diagrams/lava_empty_pattern_small.png)
        </Row>
  </BoxAnnotation>

<BoxAnnotation color="#dddddd" min="2.1 2 0.1" max="2.9 2.2 0.9">
(2) Interface: Default configuration.
  </BoxAnnotation>

<BoxAnnotation color="#dddddd" min="3.1 2 1.1" max="3.9 2.2 1.9">
(3) Storage bus #1: Default configuration.
  </BoxAnnotation>

<BoxAnnotation color="#dddddd" min="4.05 1.05 0.8" max="4.95 1.95 1">
(4) Destruction panel: No GUI available.
  </BoxAnnotation>

<BoxAnnotation color="#dddddd" min="3.2 1.2 0.8" max="3.8 1.8 1">
(5) Input bus: filter iron bucket.
        <ItemImage id="minecraft:bucket" scale="2" />
  </BoxAnnotation>

<BoxAnnotation color="#dddddd" min="3 1.1 0.1" max="3.2 1.9 0.9">
(6) Storage bus #2: Default configuration.
  </BoxAnnotation>

<DiamondAnnotation pos="0 1.5 0.5" color="#00ff00">
to main network
    </DiamondAnnotation>

  <IsometricCamera yaw="225" pitch="45" />
</GameScene>

## set up

* <ItemLink id="pattern_provider" />(1) is set to "on redstone signal" locked synthesis, blocking mode is enabled, and the corresponding <ItemLink id="processing_pattern" /> is equipped.

![Charger Sample](../assets/diagrams/water_empty_pattern.png)
![Charger template](../assets/diagrams/lava_empty_pattern.png)

* <ItemLink id="interface" />(2) is in default configuration.
* The first <ItemLink id="storage_bus" />(3) is in default configuration.
* <ItemLink id="annihilation_plane" />(4) has no GUI and cannot be configured.
* <ItemLink id="import_bus" /> (5) is set as a filter iron bucket.
  <ItemImage id="minecraft:bucket" scale="2" />
* The second <ItemLink id="storage_bus" />(6) is in default configuration.

## Working principle

1. <ItemLink id="pattern_provider" /> feeds the materials into <ItemLink id="interface" />.
(As an optimization, it actually outputs directly to storage buses, which are similar to the output side of the provider itself. The items don't actually go into the interface.)
2. After passing the facilities described in [pipe subnet](pipe-subnet.md#providing-to-multiple-places), the iron barrel will arrive at <ItemLink id="minecraft:dispenser" />.
3. <ItemLink id="minecraft:comparator" /> detects the iron barrel in the launcher, thereby activating the launcher and locking <ItemLink id="pattern_provider" /> at the same time.
4. The launcher pours out the fluid in the iron bucket. At this time, the launcher is empty.
5. <ItemLink id="import_bus" /> extracts the empty bucket from the transmitter, stores it into the sample provider through <ItemLink id="storage_bus" />, and returns it to the main network.
6. The comparator detects that the transmitter is empty, thus unlocking the supplier.