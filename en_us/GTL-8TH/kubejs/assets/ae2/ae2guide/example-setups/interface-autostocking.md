---
navigation:
  parent: example-setups/example-setups-index.md
title: Automatically maintain item quantity based on interface
  icon: interface
---

# Automatically maintain item quantity based on interface

One might ask: "How do I maintain a certain number of items in inventory and automatically replenish them when they are lacking?"

One solution is to use <ItemLink id="interface" /> with <ItemLink id="crafting_card" /> installed to automatically send requests to the network's [Autocrafting](../ae2-mechanics/autocrafting.md) system. This facility is more suitable for maintaining small quantities of a variety of items.

This demo facility has been truncated to reduce width and should be most efficient using 4 <ItemLink id="interface" /> and 4 <ItemLink id="storage_bus" />, fully occupying all 8 [channels](../ae2-mechanics/channels.md) of a normal [cable](../items-blocks-machines/cables.md).

<GameScene zoom="6" interactive={true}>
  <ImportStructure src="../assets/assemblies/interface_autostocking.snbt" />

<BoxAnnotation color="#dddddd" min="0 0 0" max="2 1 1">
(1) Interface: Set up to store required items on itself. Contains synthesis cards.
        <ItemImage id="crafting_card" scale="2" />
  </BoxAnnotation>

<BoxAnnotation color="#dddddd" min="0 1 0" max="2 1.3 1">
(2) Storage bus: "Input/Output Mode" is set to "Retrieve Only".
  </BoxAnnotation>

<DiamondAnnotation pos="4 0.5 0.5" color="#00ff00">
to main network
    </DiamondAnnotation>

  <IsometricCamera yaw="195" pitch="30" />
</GameScene>

## Configuration

* <ItemLink id="interface" /> (1) is set to store the required items on itself, put the items directly into or drag them from JEI into the upper row slot, and then click the wrench icon above the slot to set the quantity. Equipped with <ItemLink id="crafting_card" />.
* "Input/Output Mode" of <ItemLink id="storage_bus" />(2) is set to "Fetch Only".

## Working principle

1. If <ItemLink id="interface" /> cannot obtain sufficient configured items from [Network Storage](../ae2-mechanics/import-export-storage.md) (and it is equipped with <ItemLink id="crafting_card" />), it will send a request to synthesize the item to the network's [Automatic Synthesis](../ae2-mechanics/autocrafting.md) system.
2. <ItemLink id="storage_bus" /> allows network access to the contents of the interface.