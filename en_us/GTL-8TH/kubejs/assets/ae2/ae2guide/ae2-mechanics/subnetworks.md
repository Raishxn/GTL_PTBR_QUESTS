---
navigation:
  parent: ae2-mechanics/ae2-mechanics-index.md
title: subnetwork
---

# subnetwork

<GameScene zoom="4" interactive={true}>
<ImportStructure src="../assets/assemblies/subnet_demonstration.snbt" />

<DiamondAnnotation pos="6.5 2.5 0.5" color="#00ff00">
Item pipeline subnetwork
    </DiamondAnnotation>

<DiamondAnnotation pos="5.5 2.5 0.5" color="#00ff00">
Fluid Pipeline Subnetwork
    </DiamondAnnotation>

<DiamondAnnotation pos="4.5 2.5 0.5" color="#00ff00">
Filtered destruction panel
    </DiamondAnnotation>

<DiamondAnnotation pos="3.5 2.5 0.5" color="#00ff00">
Forming panel subnetwork
    </DiamondAnnotation>

<DiamondAnnotation pos="2.5 2.5 0.5" color="#00ff00">
Use ports to interact with the storage bus as a local substorage network accessible to the main network
    </DiamondAnnotation>

<DiamondAnnotation pos="1.5 1.5 0.5" color="#00ff00">
Another subnetwork of item pipes that returns charged items to the sample provider
    </DiamondAnnotation>

<IsometricCamera yaw="195" pitch="30" />
</GameScene>

"Subnetwork" is a loosely defined term and can be thought of as any network that assists the main network or performs small tasks. These networks are usually small, so no controller is needed. Subnets usually serve 2 purposes:

* Limit the storage locations that each [device](../ae2-mechanics/devices.md) can access (you definitely don't want the input bus on the "pipeline" subnet to be able to access the main network storage, nor do you want it to put items directly into the storage element instead of the target container)
* Save channels on the main network; for example, if a sample provider is placed adjacent to the interfaces of several machines with storage buses, only one channel will be occupied; if a sample provider is placed on each machine, multiple channels will be occupied

An extremely important point in building a subnetwork is to track [network connections](../ae2-mechanics/me-network-connections.md). People usually stack many interfaces, buses and the like together, and then think that these devices can form sub-networks, but in fact they are still connected to the main network through various block-type devices.

Different colored cables have nothing to do with the creation of subnets; they are only used to avoid cable connections.

Subnetworks can be:

* Input bus and storage bus that can transfer items or fluids between containers, similar to items or fluid pipes
* Destroy the panel and the storage bus, where the destruction panel can only send the destroyed things to the storage bus; you can set filters for the destruction panel in this way
* Interface and forming panel, where things input into the interface are sent to the forming panel to be placed or thrown
* Facilities for automatically collecting Seth quartz, controlled by the <ItemLink id="level_emitter" /> regulation of the main network
* Dedicated storage system accessible to the main network, constructed from a storage bus and interface; can store large amounts of farm output while avoiding overloading the main storage
*   etc

<ItemLink id="quartz_fiber" /> is very useful in building subnetworks. It can transfer energy between networks without providing a connection, so that energy can be transferred to sub-networks without having to place energy receivers and power supply cables everywhere.
