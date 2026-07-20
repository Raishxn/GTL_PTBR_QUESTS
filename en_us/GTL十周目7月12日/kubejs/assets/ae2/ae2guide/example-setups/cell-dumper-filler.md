---
navigation:
  parent: example-setups/example-setups-index.md
title: Component Emptyers and Loaders
  icon: io_port
---

# Component Empty and Loader

Someone may ask: "How to quickly empty components into a box or drawer array or backpack, and how to fill components from these places?"

The answer is to use <ItemLink id="io_port" /> and a subnet that limits where it can empty or fill.

<GameScene zoom="6" interactive={true}>
  <ImportStructure src="../assets/assemblies/cell_dumper_filler.snbt" />

<BoxAnnotation color="#dddddd" min="1 1 0" max="2 2 1">
(1) IO port: You can use the arrow button in the middle of the GUI to set it to "Import network from component" or "Transfer data to storage component". Equipped with 3 accelerator cards.
        <ItemImage id="speed_card" scale="2" />
  </BoxAnnotation>

<BoxAnnotation color="#dddddd" min="0 0.7 0" max="1 1 1">
(2) Storage bus: default configuration.
  </BoxAnnotation>

<BoxAnnotation color="#33dd33" min="0 1 0" max="1 2 1">
Place things here for filling or emptying.
  </BoxAnnotation>

<BoxAnnotation color="#dddddd" min="2 0.35 0.35" max="2.3 0.65 0.65">
Quartz Fiber: Only necessary if the energy supply comes from another network.
  </BoxAnnotation>

<DiamondAnnotation pos="3 0.5 0.5" color="#00ff00">
to energy sources, such as another network and energy receivers.
    </DiamondAnnotation>

  <IsometricCamera yaw="195" pitch="30" />
</GameScene>

## Configuration

* <ItemLink id="io_port" /> (1) You can use the arrow buttons in the middle of the GUI to set it to "Import network from component" or "Transfer data to storage component". Equipped with 3 accelerator cards to achieve maximum speed.
* <ItemLink id="storage_bus" />(2) is in default configuration.

## Working principle

### "Transfer to network" mode

1. <ItemLink id="io_port" /> attempts to clear the things stored in [storage components] (../items-blocks-machines/storage_cells.md) to [network storage] (../ae2-mechanics/import-export-storage.md).
2. The only storage location in the sub-network is <ItemLink id="storage_bus" />, where items, fluids and other things can be stored in containers placed on it.
* <ItemLink id="energy_cell" /> provides a large enough [energy cache](../ae2-mechanics/energy.md) to avoid energy exhaustion caused by excessive transmission rate per game tick.

### "Transfer to component" mode

1. <ItemLink id="io_port" /> attempts to load the things stored in [Network Storage](../ae2-mechanics/import-export-storage.md) into [Storage Components](../items-blocks-machines/storage_cells.md).
2. The only storage location in the sub-network is <ItemLink id="storage_bus" />, which can extract items, fluids and other things from the containers placed on it.
* <ItemLink id="energy_cell" /> provides a large enough [energy cache](../ae2-mechanics/energy.md) to avoid energy exhaustion caused by excessive transmission rate per game tick.