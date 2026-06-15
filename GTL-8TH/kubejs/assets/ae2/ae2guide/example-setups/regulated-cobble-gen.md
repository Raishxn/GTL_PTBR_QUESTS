---
navigation:
  parent: example-setups/example-setups-index.md
title: Self-regulating stone making machine
  icon: minecraft:cobblestone
---

# Self-regulating stone making machine

The automated stone making machine is very simple, just point the <ItemLink id="annihilation_plane" /> towards a standard original manual stone making machine. However, doing so will result in the network becoming clogged with cobblestones, so some regulation is needed.

Due to the way the destruction panel works (similar to <ItemLink id="import_bus" />), you cannot directly face <ItemLink id="level_emitter" /> to <ItemLink id="export_bus" /> with <ItemLink id="redstone_card" /> installed (since direct input and output cannot be done without intermediate storage). A slight detour is required.

<ItemLink id="toggle_bus" /> can be controlled by redstone signals to connect or disconnect from the network, but its triggering will cause the network to restart. There is a simple solution to this: place a trigger bus on [subnetwork](../ae2-mechanics/subnetworks.md). Doing so will only restart the subnet.

A separate [subnetwork](../ae2-mechanics/subnetworks.md) consisting of <ItemLink id="annihilation_plane" /> and <ItemLink id="storage_bus" /> can be designed to feed items into <ItemLink id="interface" /> of the main network. The trigger bus is connected or disconnected with <ItemLink id="quartz_fiber" /> to provide or cut off the energy supply.

<GameScene zoom="4" interactive={true}>
  <ImportStructure src="../assets/assemblies/regulated_cobble_gen.snbt" />

<BoxAnnotation color="#dddddd" min="3 2 2" max="7 2.3 3">
(1) Destroy panel: no GUI available, can be equipped with efficiency and durability to reduce energy consumption.
  </BoxAnnotation>

  <BoxAnnotation color="#dddddd" min="2 2 2" max="2.3 3 3">
(2) Storage bus: default configuration.
  </BoxAnnotation>

  <BoxAnnotation color="#dddddd" min="2.3 2.3 2" max="2.7 2.7 2.3">
(3) Trigger bus: Note that it should be placed on the subnet, not the main network.
  </BoxAnnotation>

  <BoxAnnotation color="#dddddd" min="2.3 3 2.3" max="2.7 3.3 2.7">
(4) Standard transmitter: configured with the required number of cobblestones, and the redstone mode is "send a redstone signal when the number is less than the set value".
  </BoxAnnotation>

  <BoxAnnotation color="#dddddd" min="1 2 3" max="2 3 2">
(5) Interface: Default configuration.
  </BoxAnnotation>

<DiamondAnnotation pos="0 2.5 1.5" color="#00ff00">
to main network
    </DiamondAnnotation>

<DiamondAnnotation pos="5 1.5 3.5" color="#00ff00">
Stairs containing water prevent water from reaching the lava and turning it into obsidian.
    </DiamondAnnotation>

  <IsometricCamera yaw="195" pitch="30" />
</GameScene>

## Configuration

* <ItemLink id="annihilation_plane" /> (1) No GUI available, efficiency and durability can be attached to reduce energy consumption.
* <ItemLink id="storage_bus" />(2) is in default configuration.
* <ItemLink id="toggle_bus" />(3) must be on a subnet and connected to the quartz fiber, not the main network, otherwise the main network will restart when it is triggered.
* <ItemLink id="level_emitter" /> (4) is set to the required number of required items, and the redstone mode is "send a redstone signal when the quantity is less than the set value".
* <ItemLink id="interface" />(5) is in default configuration.

## Working principle

1. The stone machine produces cobblestone.
2. <ItemLink id="annihilation_plane" /> Destroy cobblestone.
3. T<ItemLink id="storage_bus" /> stores the cobblestones into <ItemLink id="interface" /> and transmits them back to the main network.
4. When the number of cobblestones in the main network is greater than the set number, <ItemLink id="level_emitter" /> stops sending redstone signals and closes <ItemLink id="toggle_bus" />.
5. The energy supply to the subnetwork is cut off, thus closing the destruction panel.
