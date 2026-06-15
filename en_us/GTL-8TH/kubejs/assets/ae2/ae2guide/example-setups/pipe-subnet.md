---
navigation:
  parent: example-setups/example-setups-index.md
title: Item/Fluid "Pipeline" Subnetwork
  icon: storage_bus
---

# Item/fluid "pipeline" subnetwork

The following is a simple way to simulate items and fluid pipelines through AE2 [Devices](../ae2-mechanics/devices.md). It is applicable to the design of all available items or fluid pipelines, naturally including the case of sending synthesis products back to <ItemLink id="pattern_provider" />.

There are usually two ways to achieve this effect:

## Input bus -> Storage bus

<GameScene zoom="6" background="transparent">
  <ImportStructure src="../assets/assemblies/import_storage_pipe.snbt" />

<BoxAnnotation color="#dddddd" min="3.7 0 0" max="4 1 1">
(1) Input bus: filterable.
  </BoxAnnotation>

<BoxAnnotation color="#dddddd" min="1 0 0" max="1.3 1 1">
(2) Storage bus: filterable. This bus (and the other storage buses to which the transfer is destined) must be the only storage location on the network.
  </BoxAnnotation>

<DiamondAnnotation pos="4.5 0.5 0.5" color="#00ff00">
starting point
    </DiamondAnnotation>

<DiamondAnnotation pos="0.5 0.5 0.5" color="#00ff00">
end
    </DiamondAnnotation>

  <IsometricCamera yaw="195" pitch="30" />
</GameScene>

<ItemLink id="import_bus" />(1) connected to the starting container will import items and fluids and attempt to store them into [Network Storage](../ae2-mechanics/import-export-storage.md). The only storage location in the network is <ItemLink id="storage_bus" />(2) (which also explains why this facility needs to be a subnetwork rather than the main network). Items and fluids will be stored in the terminal container, which is equivalent to transmission. Energy is supplied through <ItemLink id="quartz_fiber" />. Both the input bus and the storage bus can be filtered, but without filtering the facility will transmit everything it can access. This facility allows multiple input buses and multiple storage buses to exist.

## Storage bus -> Output bus

<GameScene zoom="6" background="transparent">
  <ImportStructure src="../assets/assemblies/storage_export_pipe.snbt" />

<BoxAnnotation color="#dddddd" min="3.7 0 0" max="4 1 1">
(1) Storage bus: filterable. This bus (and other memory buses to be the origin of the transfer) must be the only memory location on the network.
  </BoxAnnotation>

<BoxAnnotation color="#dddddd" min="1 0 0" max="1.3 1 1">
(2) Output bus: must be filtered.
  </BoxAnnotation>

<DiamondAnnotation pos="4.5 0.5 0.5" color="#00ff00">
starting point
    </DiamondAnnotation>

<DiamondAnnotation pos="0.5 0.5 0.5" color="#00ff00">
end
    </DiamondAnnotation>

  <IsometricCamera yaw="195" pitch="30" />
</GameScene>

<ItemLink id="export_bus" /> connected to the end container will try to extract the filtered items from [Network Storage](../ae2-mechanics/import-export-storage.md). The only storage location in the network is <ItemLink id="storage_bus" /> (which also explains why this facility needs to be a subnetwork rather than the main network). Items and fluids will be drawn from the starting container, which is equivalent to transmission. Energy is supplied through <ItemLink id="quartz_fiber" />. The output bus will only work if it has filtering, so this facility will only work if the output bus has filtering. This facility allows multiple storage buses and multiple output buses to exist.

## Not working design (input bus -> output bus)

<GameScene zoom="6" background="transparent">
  <ImportStructure src="../assets/assemblies/import_export_pipe.snbt" />

<BoxAnnotation color="#dd3333" min="3.7 0 0" max="4 1 1">
(1) Input bus: Since there is no storage space in the network, the input target of the input bus does not exist.
  </BoxAnnotation>

<BoxAnnotation color="#dd3333" min="1 0 0" max="1.3 1 1">
(2) Output bus: Since there is no storage space in the network, the output source of the output bus does not exist.
  </BoxAnnotation>

<DiamondAnnotation pos="4.5 0.5 0.5" color="#ff0000">
starting point
    </DiamondAnnotation>

<DiamondAnnotation pos="0.5 0.5 0.5" color="#ff0000">
end
    </DiamondAnnotation>

  <IsometricCamera yaw="195" pitch="30" />
</GameScene>

A facility consisting only of input and output buses will not operate. The input bus attempts to extract items and fluids from the origin container and store them in network storage. The output bus attempts to extract items and fluids from network storage and output them to the destination container. But this network has no storage locations, the input bus cannot input, the output bus cannot output, and the facility will not work.

## Input and output on the same side

If you have a machine that can receive input and eject output on a single face at the same time (such as <ItemLink id="charger" />), you can combine 2 pipe subnetworks to input material and extract product on the same face:

<GameScene zoom="6" background="transparent">
  <ImportStructure src="../assets/assemblies/import_storage_export_pipe.snbt" />

<BoxAnnotation color="#dddddd" min="4 1 1" max="5 1.3 2">
(1) Input bus: filterable.
  </BoxAnnotation>

<BoxAnnotation color="#dddddd" min="2 1 1" max="3 1.3 2">
(2) Storage bus: filterable. This memory bus (and other memory buses used for input and output) must be the only memory location on the network.
  </BoxAnnotation>

<BoxAnnotation color="#dddddd" min="2 0 1" max="3 1 2">
(3) Equipment that requires input and output: here is the charger.
  </BoxAnnotation>

<BoxAnnotation color="#dddddd" min="0 1 1" max="1 1.3 2">
(4) Output bus: must be filtered.
  </BoxAnnotation>

<DiamondAnnotation pos="4.5 0.5 1.5" color="#00ff00">
starting point
    </DiamondAnnotation>

<DiamondAnnotation pos="0.5 0.5 1.5" color="#00ff00">
end
    </DiamondAnnotation>

  <IsometricCamera yaw="195" pitch="30" />
</GameScene>

## Interface

It seems that in addition to the input bus and output bus, there are other [devices](../ae2-mechanics/devices.md) that can store or take out items from [network storage](../ae2-mechanics/import-export-storage.md)! The device referred to here is <ItemLink id="interface" />. If an interface receives an item and is not set up to store the item, it will store the item in network storage, similar to the input bus -> storage bus pipe. Setting the interface to store an item will draw it from network storage, similar to the Storage Bus -> Output Bus pipe. If desired, the interface can also be configured to store certain items but not others, allowing remote input and output via the storage bus.

<GameScene zoom="6" background="transparent">
<ImportStructure src="../assets/assemblies/interface_pipes.snbt" />

<BoxAnnotation color="#dddddd" min="3.7 0 0" max="4 1 1">
interface
  </BoxAnnotation>

<BoxAnnotation color="#dddddd" min="1 0 0" max="1.3 1 1">
memory bus
  </BoxAnnotation>

<BoxAnnotation color="#dddddd" min="3.7 0 2" max="4 1 3">
memory bus
  </BoxAnnotation>

<BoxAnnotation color="#dddddd" min="0 1 2" max="1 1.3 3">
interface
  </BoxAnnotation>

<IsometricCamera yaw="195" pitch="30" />
</GameScene>

## One-to-many and many-to-one (and many-to-many)

Of course, not only one of <ItemLink id="import_bus" />, <ItemLink id="export_bus" />, and <ItemLink id="storage_bus" /> can be used.

<GameScene zoom="3" background="transparent">
<ImportStructure src="../assets/assemblies/many_to_many_pipe.snbt" />

<IsometricCamera yaw="185" pitch="30" />
</GameScene>

## Provide materials to multiple places

Based on the above design, it can be concluded that the method of transporting materials from a single <ItemLink id="pattern_provider" /> to multiple faces is suitable for machine arrays or multiple faces of a single machine.

The input -> storage pipe and the storage -> output pipe are not used because <ItemLink id="pattern_provider" /> cannot store material, but will *output* the material to an adjacent container. So we need some kind of adjacent container into which items can be imported.

The device that meets the conditions... is <ItemLink id="interface" />! And the provider must be directional or panel type, or the interface must be panel type, or both conditions must be met to avoid the two from forming a network connection.

<GameScene zoom="6" background="transparent">
<ImportStructure src="../assets/assemblies/provider_interface_storage.snbt" />

<BoxAnnotation color="#dddddd" min="2.7 0 1" max="3 1 2">
Interface (must be panel type, not block type)
  </BoxAnnotation>

<BoxAnnotation color="#dddddd" min="1 0 0" max="1.3 1 4">
memory bus
  </BoxAnnotation>

<BoxAnnotation color="#dddddd" min="0 0 0" max="1 1 4">
Sample supply destination (multiple machines, or multiple sides of a single machine)
  </BoxAnnotation>

<IsometricCamera yaw="185" pitch="30" />
</GameScene>