---
navigation:
  parent: example-setups/example-setups-index.md
title: Private local storage
  icon: drive
---

# Dedicated local storage

By applying [Special Behaviors of Interfaces](../items-blocks-machines/interface.md#special-interactions), [Subnetwork](../ae2-mechanics/subnetworks.md) cannot access the main network storage, but its storage content is visible in the main network and will only occupy up to 1 [Channel](../ae2-mechanics/channels.md).

Local storage for some farms to avoid overloading the main network with storage items.

<GameScene zoom="6" interactive={true}>
  <ImportStructure src="../assets/assemblies/local_storage.snbt" />

<BoxAnnotation color="#dddddd" min="4 0 0" max="5 2 1">
(1) Item input part (interface in this example).
  </BoxAnnotation>

<BoxAnnotation color="#dddddd" min="3 0 0" max="4 1 1">
(2) Driver: equipped with several components. Elements should filter farm output. Can be equipped with equalizing cards and overflow destruction cards.
        <Row><ItemImage id="item_storage_cell_4k" scale="2" /> <ItemImage id="equal_distribution_card" scale="2" /> <ItemImage id="void_card" scale="2" /></Row>
  </BoxAnnotation>

<BoxAnnotation color="#dddddd" min="3 1 0" max="4 2 0.3">
(3) Synthetic terminal: This terminal can view the contents of the subnetwork drive, but cannot view the main network storage.
  </BoxAnnotation>

<BoxAnnotation color="#dddddd" min="2 0 0" max="2.3 1 1">
(4) Terminal #2: Default configuration.
  </BoxAnnotation>

<BoxAnnotation color="#dddddd" min="1.7 0 0" max="2 1 1">
(5) Storage bus: has a higher priority than main storage and can filter farm output products.
  </BoxAnnotation>

<BoxAnnotation color="#dddddd" min="1 1 0" max="2 2 0.3">
Synthetic Terminal: This terminal can view both the main network storage *and* the sub-network storage.
  </BoxAnnotation>

<DiamondAnnotation pos="0 0.5 0.5" color="#00ff00">
to main network
    </DiamondAnnotation>

  <IsometricCamera yaw="195" pitch="30" />
</GameScene>

## Configuration

* The first <ItemLink id="interface" />(1) will only accept farm products and send them to the subnetwork.
* <ItemLink id="drive" />(2) contains several [components](../items-blocks-machines/storage_cells.md). Components should be [partitioned](../items-blocks-machines/cell_workbench.md) as farm products. Components can be equipped with <ItemLink id="equal_distribution_card" /> and <ItemLink id="void_card" />.
* The second <ItemLink id="interface" />(4) is in default configuration.
* The [priority](../ae2-mechanics/import-export-storage.md#storage-priority) of <ItemLink id="storage_bus" /> is higher than primary storage. Can be set to filter farm produce.

## Working principle

* <ItemLink id="interface" /> on the subnetwork will display the contents of <ItemLink id="drive" /> to <ItemLink id="storage_bus" /> on the main network. That is, the memory bus can directly provide input and output to the components in the driver.
* The [priority](../ae2-mechanics/import-export-storage.md#storage-priority) of the storage bus is higher, so items will be put into the subnet first instead of the main network.
* Importantly, if the subnet's components are filled, the extra items will not overflow to the main network. If the farm will become inoperable due to blockage, <ItemLink id="void_card" /> can be loaded to remove excess items.
* If the farm produces multiple items, <ItemLink id="equal_distribution_card" /> avoids the situation where one of the products fills all the components and the remaining products cannot be stored.