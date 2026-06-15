---
navigation:
  parent: ae2-mechanics/ae2-mechanics-index.md
title: Bytes and types
  icon: creative_item_cell
---

# Bytes and types

<Row>
    <ItemImage id="item_storage_cell_1k" scale="4" />

    <ItemImage id="item_storage_cell_4k" scale="4" />

    <ItemImage id="item_storage_cell_16k" scale="4" />

    <ItemImage id="item_storage_cell_64k" scale="4" />

    <ItemImage id="item_storage_cell_256k" scale="4" />
  </Row>

The two major attributes of [Storage Elements](../items-blocks-machines/storage_cells.md) are *bytes* and *type*. Bytes are a measure of the total number of things within a storage element, similar to real-life computers. Type is a measure of the number of different *types* of items stored in the component. Each type represents an item, so 4096 cobblestones are 1 type, and 16 swords with different enchantments are 16 types.

Each storage element can store a fixed amount of data. Each type will pre-occupy a number of bytes (depending on the type of component). Each item occupies 1 bit, that is, 8 items occupies 1 byte, and a group of 64 items occupies 8 bytes. It is not affected by the number of stacks of the item outside the ME network. For example, 64 identical saddles occupy the same space as 64 stones.

Again, each item takes up 1 bit, 8 items takes up 1 byte. For fluid components, 8 barrels of fluid occupy 1 byte.

Many people complain that there are too few types of component storage, but this is a necessary limitation. Components store data in the NBT tags of the items themselves, making them relatively stable. However, this also means that storing too much data in a single component will result in too much data being transmitted to the player in an instant, causing a phenomenon similar to the "forbidden book" in the original Minecraft. Additionally, having too many types in the network increases the load on sorting and item processing. However, this limitation does not affect daily use. The component-filled <ItemLink id="drive" /> station has a total of 630 types, which is a lot as long as it doesn't store a large number of unique, non-stackable items.

It is precisely for this reason that the existence of the type is to "resolutely prevent" behaviors such as directly dumping various damaged armors and tools from hundreds of biological farms into the ME system. Each piece of armor with unique durability and enchantments can only be stored in different entries, causing memory expansion. It is recommended to filter these items out before they enter the system.

It's generally not a good idea to directly target the most advanced storage elements: these consume more resources without increasing the number of types. This also shows that components of all sizes have a place in the late game due to the above trade-offs.

The capacity and consumption comparison table of storage components at each level is as follows.

## Storage element capacity vs. consumption

| Component | Bytes | Type | Bytes per type | Seth Quartz | Redstone | Gold | Glowstone |
| ---------------------------------------- | ------: | ----: | -------------: | -----: | -------: | ---: | --------: |
| <ItemLink id="item_storage_cell_1k" />   |   1,024 |    63 |              8 |      4 |        5 |    1 |         0 |
| <ItemLink id="item_storage_cell_4k" />   |   4,096 |    63 |             32 |  14.25 |       20 |    3 |         0 |
| <ItemLink id="item_storage_cell_16k" />  |  16,384 |    63 |            128 |     45 |       61 |    9 |         4 |
| <ItemLink id="item_storage_cell_64k" />  |  65,536 |    63 |            512 | 137.25 |      184 |   27 |        16 |
| <ItemLink id="item_storage_cell_256k" /> | 262,144 |    63 |           2048 |    414 |      553 |   81 |        48 |

## The relationship between storage capacity and number of types

The pre-occupancy capacity of each type is designed as follows: the capacity to store one type of components is twice the capacity to store 63 components.

| Component | Total capacity when using 1 type | Total capacity when using 63 types |
| ---------------------------------------- | ----------------------------------------: | ------------------------------------------: |
| <ItemLink id="item_storage_cell_1k" />   |                                     8,128 |                                       4,160 |
| <ItemLink id="item_storage_cell_4k" />   |                                    32,512 |                                      16,640 |
| <ItemLink id="item_storage_cell_16k" />  |                                   130,048 |                                      66,560 |
| <ItemLink id="item_storage_cell_64k" />  |                                   520,192 |                                     266,240 |
| <ItemLink id="item_storage_cell_256k" /> |                                 2,080,768 |                                   1,064,960 |

![Use 1 type of element](../assets/diagrams/1_type_cell.png)

![Use 63 types of components](../assets/diagrams/63_type_cell.png)