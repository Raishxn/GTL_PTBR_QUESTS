---
navigation:
  parent: items-blocks-machines/items-blocks-machines-index.md
title: space element
  icon: spatial_storage_cell_128
  position: 410
categories:
- tools
item_ids:
- ae2:spatial_storage_cell_2
- ae2:spatial_storage_cell_16
- ae2:spatial_storage_cell_128
- ae2:spatial_cell_component_2
- ae2:spatial_cell_component_16
- ae2:spatial_cell_component_128
---

# Space storage element

  <Row>
    <ItemImage id="spatial_storage_cell_2" scale="4" />

    <ItemImage id="spatial_storage_cell_16" scale="4" />

    <ItemImage id="spatial_storage_cell_128" scale="4" />
  </Row>

Spatial storage elements can be used to [store an area in physical space](../ae2-mechanics/spatial-io.md). Available for <ItemLink id="spatial_io_port" />.

Unlike [Storage Cells](../items-blocks-machines/storage_cells.md), space cells cannot be reformatted.

**Space components cannot be reset, reformatted, or resized after use. ** If you need to change the size of the defined area, create a new component.


## Recipe

  <Row>
    <Recipe id="network/cells/spatial_storage_cell_2_cubed_storage" />

    <Recipe id="network/cells/spatial_storage_cell_16_cubed_storage" />

    <Recipe id="network/cells/spatial_storage_cell_128_cubed_storage" />
  </Row>

# Shell

Components can be synthesized from space components and shells, or space components can be placed in the center of the shell recipe:

<Row>
  <Recipe id="network/cells/spatial_storage_cell_2_cubed" />

  <Recipe id="network/cells/spatial_storage_cell_2_cubed_storage" />
</Row>

The recipe for the shell itself is as follows:

  <RecipeFor id="item_cell_housing" />

# Space component

The space component is the core of the space storage element. The side length of each level of component capacity is 8 times that of the previous level.

  <Row>
    <RecipeFor id="spatial_cell_component_2" />

    <RecipeFor id="spatial_cell_component_16" />

    <RecipeFor id="spatial_cell_component_128" />
  </Row>