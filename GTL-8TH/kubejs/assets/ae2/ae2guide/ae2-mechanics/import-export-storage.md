---
navigation:
  parent: ae2-mechanics/ae2-mechanics-index.md
title: input, output, and storage
---

# Input, output, and storage

**Your ME system and the world**

An important concept in AE2 is network storage, which is where network content is stored. It is usually a [storage element](../items-blocks-machines/storage_cells.md) or a container connected to <ItemLink id="storage_bus" />. Most AE2 [devices](../ae2-mechanics/devices.md) will interact with it in some way.

For example:

* <ItemLink id="import_bus" />Input things to network storage
* <ItemLink id="export_bus" /> outputs things from network storage
* <ItemLink id="interface" /> can input to or output from network storage
* [Terminals](../items-blocks-machines/terminals.md) imports and exports items when placing, taking, or filling crafting blocks within them
* <ItemLink id="storage_bus" /> does not input or output to network storage, but performs these operations on the connected containers, which is equivalent to treating these containers as network storage (that is, other devices input or output from *these buses*)

<GameScene zoom="4" interactive={true}>
  <ImportStructure src="../assets/assemblies/import_export_storage.snbt" />

  <BoxAnnotation color="#dddddd" min="8 1 1" max="9 1.3 2">
The input bus fetches items from the container it faces and inputs them into network storage
  </BoxAnnotation>

  <BoxAnnotation color="#dddddd" min="8 2 1" max="9 3 1.3">
Placing an item from the inventory into the terminal is treated as input to network storage.
  </BoxAnnotation>

  <BoxAnnotation color="#dddddd" min="7 0 1" max="8 1 2">
The interface will import items in its internal slots that are not stored, as well as items that exceed the set storage capacity of the slots, into network storage, through which things can be input into the network.
  </BoxAnnotation>

  <BoxAnnotation color="#dddddd" min="6 0 1" max="7 1 2">
Template providers will import items in the return column into network storage, and they can be used to import things into the network.
  </BoxAnnotation>

  <BoxAnnotation color="#dddddd" min="4 1 1" max="5 2 2">
The drive contains components that are considered network storage
  </BoxAnnotation>

  <BoxAnnotation color="#dddddd" min="3 1 1" max="4 1.3 2">
The storage bus treats the containers it is connected to as network storage
  </BoxAnnotation>

  <BoxAnnotation color="#dddddd" min="1 1 1" max="2 1.3 2">
The output bus outputs items from network storage to the container it faces
  </BoxAnnotation>

  <BoxAnnotation color="#dddddd" min="1 2 1" max="2 3 1.3">
Taking things from the terminal is treated as output from network storage
  </BoxAnnotation>

  <BoxAnnotation color="#dddddd" min="0 1 1" max="1 2 2">
The interface will output items in slots with internal storage from network storage, and things can be output from the network through them.
  </BoxAnnotation>

  <IsometricCamera yaw="195" pitch="30" />
</GameScene>

Behaviors/events that output and input things to and from network storage need to be considered when designing automation and logistics facilities.

## Storage priority

You can click the wrench in the upper right corner of the GUI to set the priority. Items input into the network will first enter the storage location with the highest priority. If there are two storage locations with the same priority, the one that already contains the item will be selected first. All whitelisted components with the same priority are deemed to already have the item. Items exported from storage will be exported first from the lowest priority location. This priority system allows high-priority storage locations to be filled while low-priority ones are emptied during the process of importing and exporting items.