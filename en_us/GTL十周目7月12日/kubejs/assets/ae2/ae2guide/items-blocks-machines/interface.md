---
navigation:
  parent: items-blocks-machines/items-blocks-machines-index.md
title: interface
  icon: interface
  position: 210
categories:
- devices
item_ids:
- ae2:interface
- ae2:cable_interface
---

#Interface

<Row gap="20">
<BlockImage id="interface" scale="8" />
<GameScene zoom="8" background="transparent">
  <ImportStructure src="../assets/blocks/cable_interface.snbt" />
</GameScene>
</Row>

The interface can be regarded as a small box and fluid storage tank, and can input and output to [Network Storage](../ae2-mechanics/import-export-storage.md) according to its own settings. It will try to complete input and output within a single game moment, that is, up to 9 groups of items can be transferred in 1 game moment, which also makes it a fast input and output method, suitable for fast item pipelines.

The interface also has a useful feature. Most fluid tanks can only store 1 type of fluid, while the interface can store up to 9 types. The same is true for items. They are essentially boxes/multi-fluid tanks with several extra features and can be disconnected from the network to disable the extra features. Therefore, they are useful in certain situations where small amounts of a variety of things need to be stored.

## How the interface works internally

As mentioned before, ports are essentially boxes and tanks, with some super cool <ItemLink id="import_bus" /> and <ItemLink id="export_bus" /> and <ItemLink id="level_emitter" /> attached.

<GameScene zoom="3" interactive={true}>
  <ImportStructure src="../assets/assemblies/interface_internals.snbt" />

  <BoxAnnotation color="#dddddd" min="1.3 0.3 1.3" max="9.7 1 1.7">
A series of standard transmitters used to maintain set item quantities
        <GameScene zoom="4" background="transparent">
        <ImportStructure src="../assets/blocks/level_emitter.snbt" />
        </GameScene>
  </BoxAnnotation>

  <BoxAnnotation color="#dddddd" min="1.3 4 1.3" max="9.7 4.7 1.7">
A series of standard transmitters used to maintain set item quantities
        <GameScene zoom="4" background="transparent">
        <ImportStructure src="../assets/blocks/level_emitter.snbt" />
        </GameScene>
  </BoxAnnotation>

  <BoxAnnotation color="#dddddd" min="1.3 1.3 1.3" max="9.7 2 1.7">
A series of super cool input buses that can transmit one set of things per game tick
        <GameScene zoom="4" background="transparent">
        <ImportStructure src="../assets/blocks/import_bus.snbt" />
        </GameScene>
  </BoxAnnotation>

  <BoxAnnotation color="#dddddd" min="1.3 3 1.3" max="9.7 3.7 1.7">
A series of super cool output buses that can transmit one set of things per game moment
        <GameScene zoom="4" background="transparent">
        <ImportStructure src="../assets/blocks/export_bus.snbt" />
        </GameScene>
  </BoxAnnotation>

  <BoxAnnotation color="#dddddd" min="1 2 1" max="10 3 2">
9 independent internal slots
  </BoxAnnotation>

  <IsometricCamera yaw="195" pitch="15" />
</GameScene>

## Special interactions

There are several special interaction functions between the interface and other AE2 [devices] (../ae2-mechanics/devices.md):

An unmodified interface connected to <ItemLink id="storage_bus" /> will display the [Network Storage](../ae2-mechanics/import-export-storage.md) of the network where it is located to the network where the storage bus is located. At this time, the interface network is like a big box connected to the storage bus. Setting an item in the interface's filter slot disables this feature.

<GameScene zoom="6" interactive={true}>
  <ImportStructure src="../assets/assemblies/interface_storage.snbt" />
  <IsometricCamera yaw="195" pitch="30" />
</GameScene>

The sample provider and interface have a special interaction effect - [Subnetworks](../ae2-mechanics/subnetworks.md): If the interface is not modified (there is no content in the request slot), the provider will skip the interface and output directly to the subnetwork's [ Storage module](../ae2-mechanics/import-export-storage.md) instead of exporting to the storage slot of the interface; more importantly, as long as the corresponding storage module does not have enough space, the next batch of items will not be exported.

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

## Variants

There are 2 variants of the interface: normal, panel/[subparts](../ae2-mechanics/cable-subparts.md). This affects the ability of each side to output materials, receive items, and provide network connections.

* The ordinary interface will output materials to all sides, receive items from all sides, and, like most AE2 machines, provide network connections to all sides, similar to cables.

* The panel interface is a [cable subpart](../ae2-mechanics/cable-subparts.md) so multiple such suppliers can be placed on the same cable, making it easier to design compact facilities. They can output or receive items from their storage space, and give other things access to their storage space, but do not provide a network connection.

The normal and panel forms of the interface can be switched in the crafting grid.

## set up

The upper slot of the interface sets the items that need to be stored in itself. You can put it directly or drag it from JEI/REI. A wrench icon will appear above the slot with items, and you can use it to set the quantity.

Right-clicking on a fluid container (such as a drum or fluid tank) sets the fluid to filter instead of the drum and tank items.

## upgrade

The interface supports the following [upgrade](upgrade_cards.md):

* <ItemLink id="fuzzy_card" /> enables the interface to be filtered by durability or ignore items NBT
* <ItemLink id="crafting_card" /> enables the interface to send requests for required items to the [Automatic Synthesis](../ae2-mechanics/autocrafting.md) system; it will give priority to obtaining items from storage, and will only send synthesis requests if there are not enough items.

## Priority

You can click the wrench in the upper right corner of the GUI to set the priority. High-priority interfaces will obtain items before low-priority interfaces.

## Recipe

<Recipe id="network/blocks/interfaces_interface" />

<RecipeFor id="cable_interface" />
