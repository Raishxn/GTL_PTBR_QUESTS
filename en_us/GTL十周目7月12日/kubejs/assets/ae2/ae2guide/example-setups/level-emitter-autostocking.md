---
navigation:
  parent: example-setups/example-setups-index.md
title: Automatic maintenance of inventory based on standard transmitters
  icon: level_emitter
---

# Automatically maintain inventory based on standard senders

One might ask: "How do I maintain a certain number of items in inventory and automatically replenish them when they are lacking?"

One solution is to use <ItemLink id="export_bus" />, <ItemLink id="level_emitter" />, and <ItemLink id="crafting_card" /> to automatically send requests to the network's [Autocrafting](../ae2-mechanics/autocrafting.md) system. This facility is more suitable for maintaining large quantities of a single item.

It is also possible to make the network continuously synthesized, omitting the standard transmitter and redstone card.

<GameScene zoom="6" interactive={true}>
  <ImportStructure src="../assets/assemblies/level_emitter_autostocking.snbt" />

  <BoxAnnotation color="#dddddd" min="1 1 0" max="2 1.3 1">
(1) Output bus: Set to filter the required items. Contains redstone cards and crafting cards. Redstone mode is set to "Activate on redstone signal" and crafting behavior is set to "Do not use stored items".
        <Row><ItemImage id="redstone_card" scale="2" /> <ItemImage id="crafting_card" scale="2" /></Row>
  </BoxAnnotation>

  <BoxAnnotation color="#dddddd" min="0.7 1 0" max="1 2 1">
(2) Standard transmitter: Configure the required number of required items, and set it to "send a redstone signal when the quantity is less than the set value".
  </BoxAnnotation>

  <BoxAnnotation color="#dddddd" min="1 0 0" max="2 1 1">
(3) Interface: Default configuration.
  </BoxAnnotation>

<DiamondAnnotation pos="4 0.5 0.5" color="#00ff00">
to main network
    </DiamondAnnotation>

  <IsometricCamera yaw="195" pitch="30" />
</GameScene>

## Configuration

* <ItemLink id="export_bus" />(1) is set to filter required items. Equipped with <ItemLink id="redstone_card" /> and <ItemLink id="crafting_card" />. "Redstone Mode" is set to "Activate when there is a redstone signal", and "Composition Behavior" is set to "Do not use stored items".
* <ItemLink id="level_emitter" />(2) is configured with the required number of required items, and is set to "emit a redstone signal when the quantity is less than the set value".
* <ItemLink id="interface" />(3) is in default configuration.

## Working principle

1. If the number of items required in [Network Storage](../ae2-mechanics/import-export-storage.md) is less than the value set in <ItemLink id="level_emitter" />, the transmitter will emit a redstone signal.
2. When receiving a redstone signal, <ItemLink id="export_bus" /> (installed with <ItemLink id="crafting_card" /> and set to not use stored items) will send a request to synthesize the item to the network's [Automatic Synthesis](../ae2-mechanics/autocrafting.md) system, and output the product.
3. When an item is received, <ItemLink id="interface" /> (not set up to store anything) will send it to network storage.