---
navigation:
  parent: ae2-mechanics/ae2-mechanics-index.md
title: network connection
  icon: fluix_glass_cable
---

#Network connection

## What does "network" mean?

A "network" is a set of connected [devices](../ae2-mechanics/devices.md) or block-shaped machines and [devices](../ae2-mechanics/devices.md) that carry [channels](../ae2-mechanics/channels.md) like [cables](../items-blocks-machines/cables.md). (<ItemLink id="charger" />, <ItemLink id="interface" />, <ItemLink id="drive" />, etc.) A single cable is theoretically a network.

## Brief description of device location

For [devices](../ae2-mechanics/devices.md) with special network functions (such as <ItemLink id="interface" /> for input and output to [network storage](../ae2-mechanics/import-export-storage.md), <ItemLink id="level_emitter" /> for reading network storage information, <ItemLink id="drive" /> for network storage, etc.), the physical location of the device itself is not important.

Again, the physical location of the device does not matter. What matters is that the device is connected to the network (and which network it is connected to).

## Network connection

<ItemLink id="network_tool" /> can be used to easily detect things connected in the network. It shows every component in the network, and if you see something that shouldn't be there or doesn't see something that should be there, you've got a problem.

For example, below are 2 independent networks.

<GameScene zoom="6" background="transparent">
  <ImportStructure src="../assets/assemblies/2_networks_1.snbt" />

  <BoxAnnotation color="#915dcd" min="0 0 0" max="1 2 2">
Network 1
  </BoxAnnotation>

<BoxAnnotation color="#915dcd" min="2 0 0" max="3 2 2">
Network 2
  </BoxAnnotation>

  <IsometricCamera yaw="195" pitch="30" />
</GameScene>

The following are also 2 independent networks, because <ItemLink id="quartz_fiber" /> only transmits [energy](../ae2-mechanics/energy.md) and does not provide a network connection.

<GameScene zoom="6" background="transparent">
  <ImportStructure src="../assets/assemblies/2_networks_2.snbt" />

  <BoxAnnotation color="#915dcd" min="0 0 0" max="1 2 2">
Network 1
  </BoxAnnotation>

  <BoxAnnotation color="#915dcd" min="1.3 0 0" max="3 2 2">
Network 2
  </BoxAnnotation>

  <IsometricCamera yaw="195" pitch="30" />
</GameScene>

And as shown below, there is only 1 network (not 2). [Quantum Bridge](../items-blocks-machines/quantum_bridge.md) is similar to wireless [Dense Cable](../items-blocks-machines/cables.md#dense-cable), so both ends are on the same network.

<GameScene zoom="4" background="transparent">
  <ImportStructure src="../assets/assemblies/actually_1_network.snbt" />

  <BoxAnnotation color="#915dcd" min="0 0 0" max="7 3 3">
only 1 network
  </BoxAnnotation>

  <IsometricCamera yaw="195" pitch="30" />
</GameScene>

There is only one network as shown below, because the color of [cables](../items-blocks-machines/cables.md) has nothing to do with network connections and will only block the connection of different colored cables. All colored cables will connect to Fluix-colored (or "uncolored") cables.

<GameScene zoom="6" background="transparent">
  <ImportStructure src="../assets/assemblies/actually_1_network_2.snbt" />

  <BoxAnnotation color="#915dcd" min="0 0 0" max="4 2 2">
only 1 network
  </BoxAnnotation>

  <IsometricCamera yaw="195" pitch="30" />
</GameScene>

## Relatively unintuitive connection

There is only 1 network in this case, because the block-shaped <ItemLink id="pattern_provider" /> has similar functions to the cable, as does <ItemLink id="inscriber" />. Because of this, network connections can be carried across providers and imprinters.

<GameScene zoom="6" background="transparent">
  <ImportStructure src="../assets/assemblies/pattern_provider_network_connection_1.snbt" />

  <BoxAnnotation color="#915dcd" min="0 0 0" max="4 2 2">
only 1 network
  </BoxAnnotation>

  <IsometricCamera yaw="195" pitch="30" />
</GameScene>

To avoid this (useful in automated installations related to [subnetworks](../ae2-mechanics/subnetworks.md)), you can right-click on the provider with handheld <ItemLink id="certus_quartz_wrench" /> to make it directional so that it will not transmit the channel in the selection.

<Row gap="40">
<GameScene zoom="6" background="transparent">
  <ImportStructure src="../assets/assemblies/pattern_provider_network_connection_2.snbt" />

  <BoxAnnotation color="#915dcd" min="0 0 0" max="2 2 2">
Network 1
  </BoxAnnotation>

  <BoxAnnotation color="#915dcd" min="2 0 0" max="4 2 2">
Network 2
  </BoxAnnotation>

  <IsometricCamera yaw="195" pitch="30" />
</GameScene>

<GameScene zoom="6" background="transparent">
  <ImportStructure src="../assets/assemblies/pattern_provider_directional_connection.snbt" />

  <BoxAnnotation color="#ee3333" min="1 .3 .3" max="1.3 .7 .7">
Note that the cable is not connected
  </BoxAnnotation>

  <IsometricCamera yaw="255" pitch="30" />
</GameScene>
</Row>

Others that do not provide directional network connections are mostly [subparts](../ae2-mechanics/cable-subparts.md)[devices](../ae2-mechanics/devices.md), such as <ItemLink id="import_bus" />, <ItemLink id="storage_bus" />, and <ItemLink id="cable_interface" />.

<GameScene zoom="6" background="transparent">
  <ImportStructure src="../assets/assemblies/subpart_no_connection.snbt" />
  <IsometricCamera yaw="195" pitch="30" />
</GameScene>