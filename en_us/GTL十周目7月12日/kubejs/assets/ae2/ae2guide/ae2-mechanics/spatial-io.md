---
navigation:
  parent: ae2-mechanics/ae2-mechanics-index.md
title: Space IO
  icon: spatial_storage_cell_2
---

# Space IO

<GameScene zoom="6" interactive={true}>
  <ImportStructure src="../assets/assemblies/spatial_storage_1x1x1.snbt" />

  <BoxAnnotation color="#33dd33" min="1 1 1" max="2 2 2">
area to be moved
  </BoxAnnotation>

  <IsometricCamera yaw="195" pitch="30" />

</GameScene>

Spatial IO is a way to cut and paste an area of ​​the world. You can use it to move <ItemLink id="flawless_budding_quartz" />, or create a multi-functional room in the base that can be changed, or even move the end portal!

The way it works is by *swapping* a defined area with an area of ​​equal size within the enclosed space dimension, sending everything in the space tower array into the enclosed space, and sending things in the enclosed space into the space tower array.

If you have a way to travel between dimensions (Spatial IO *could* be used to create teleporters, but it would be quite complex, not easy to use, and beyond the scope of this guide), you can use Spatial IO as a resizable compressed space or pocket dimension.

#Multi-block facilities

Spatial IO requires its components to be arranged in a specific way to work properly and define areas to be cut and pasted.

All components need to be in the same [network] (me-network-connections.md) to work properly, and only one spatial IO facility can exist in the same network. Therefore it is recommended to use [subnetworks](subnetworks.md).

## Space IO port

<BlockImage id="spatial_io_port" p:powered="true" scale="4" />

<ItemLink id="spatial_io_port" /> controls the operation of space IO. It displays data for multi-block facilities and is where [spatial cells](../items-blocks-machines/spatial_cells.md) is placed.

It can display:
- [Energy](energy.md) stored in the network and the upper limit of energy capacity
- The energy required to perform the operation; it may be large and consumed instantaneously, so make sure you have enough [Energy Cells](../items-blocks-machines/energy_cells.md)
- Efficiency of space tower array
- Dimensions of the defined area

Performing spatial IO operations requires placing a spatial storage element in it and giving the spatial IO port a redstone pulse. The areas within the Space Tower and the Enclosed Space will then be *swapped*. That is to say, if you store some blocks in a closed space, *then put some other blocks in the space tower*, then put the components into the input slot, and then trigger the space IO port again, then the second group of blocks will disappear, and the first group will reappear.

**Please note that any entity in the defined area, including you, will be moved together. If there is no way out, it is equivalent to being imprisoned in a closed space dimension, trapped in a featureless black box. **Use this to prank your friends!

## Space Tower

<BlockImage id="spatial_pylon" p:powered_on="true" scale="4" />

<ItemLink id="spatial_pylon" /> is the main part of the spatial IO facility and defines the size of the area that will be affected.

The area obtained by shrinking the circumscribed cuboids of all space towers by 1 square in all directions is the defined area.

The following rules need to be followed:
- The circumscribed cuboid is at least 3x3x3 (that is, the area defined as 1x1x1)
- All space towers must be inside an external cuboid
- All space towers must be on the same network
- All space towers must be at least 2 blocks long

For example, if you want to define a 3x3x3 area, then according to rule 2, all space towers should be placed in a 5x5x5 cuboid shell around the area to be defined. This is the only requirement - as long as this requirement is met, the space tower can be placed anywhere.

<GameScene zoom="4" interactive={true}>
<ImportStructure src="../assets/assemblies/spatial_storage_3x3x3_pylon_demonstration.snbt" />

<BoxAnnotation color="#33dd33" min="1 1 1" max="4 4 4">
area to be moved
  </BoxAnnotation>

<BoxAnnotation color="#3333ff" min="5 5 0" max="0 0 5">
  </BoxAnnotation>

<IsometricCamera yaw="195" pitch="30" />
</GameScene>

More reasonable facilities are as follows:

<GameScene zoom="4" interactive={true}>
<ImportStructure src="../assets/assemblies/better_spatial_storage_3x3x3.snbt" />

<BoxAnnotation color="#33dd33" min="1 1 1" max="4 4 4">
area to be moved
  </BoxAnnotation>

<BoxAnnotation color="#3333ff" min="5 5 0" max="0 0 5">
  </BoxAnnotation>

<IsometricCamera yaw="195" pitch="30" />
</GameScene>

## efficiency

The efficiency of a space tower array is determined by the shell filling volume. Defining large volumes with simple facilities is quite inefficient and can consume *billions* of AEs.

## Component dimensions

[Spatial components](../items-blocks-machines/spatial_cells.md) will be bound to a fixed size setting (such as 3x4x2) and a certain area within the closed space dimension after use. **Space components cannot be reset, reformatted, or resized after use. **If you need to change the size of the defined area, create a new component.

These sizes are different from the size specified in the component name, where a 16³ space component refers to an area that can store *maximum* 16x16x16.

Note that this area is direction sensitive and cannot be rotated. Even though the 2x2x3 region and the 3x2x2 region are equal in size, they are still considered different.

If the component's locale does not match the zone defined by the Space Tower (see the Space IO Ports paragraph), the port will not operate.