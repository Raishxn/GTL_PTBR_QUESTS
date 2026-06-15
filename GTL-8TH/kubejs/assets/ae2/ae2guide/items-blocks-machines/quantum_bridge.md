---
navigation:
  parent: items-blocks-machines/items-blocks-machines-index.md
title: Quantum Bridge
  icon: quantum_ring
  position: 110
categories:
- network infrastructure
item_ids:
- ae2:quantum_link
- ae2:quantum_ring
---

# Quantum Bridge

![Completed quantum bridge](../assets/diagrams/quantum_bridge_demonstration.png)

Quantum bridges can extend [network](../ae2-mechanics/me-network-connections.md) infinitely and even connect across dimensions. They can transmit a total of 32 channels (regardless of how the cable is connected) and can be considered wireless "dense cables" (cables.md#dense-cable).

<GameScene zoom="4" background="transparent">
  <ImportStructure src="../assets/assemblies/quantum_bridge_internal_structure_1.snbt" />
  <IsometricCamera yaw="195" pitch="30" />
</GameScene>

<GameScene zoom="4" background="transparent">
  <ImportStructure src="../assets/assemblies/quantum_bridge_internal_structure_2.snbt" />

  <BoxAnnotation color="#33dd33" min="1 1 1" max="6 2 3">
Dotted cable between ends
  </BoxAnnotation>

  <IsometricCamera yaw="195" pitch="30" />
</GameScene>

It should be noted that both endpoints of the quantum bridge require block loading. If the two ends are far apart, you must use <ItemLink id="spatial_anchor" /> or add a block loader.

# Quantum Ring

<BlockImage id="quantum_ring" scale="8" />

Place 8 of these blocks around <ItemLink id="quantum_link" /> to create a quantum bridge. Only the 4 quantum bridges adjacent to <ItemLink id="quantum_ring" /> will accept network connections, and the 4 squares in the corners cannot be connected to cables.

## Recipe

<RecipeFor id="quantum_ring" />

# Quantum link warehouse

<BlockImage id="quantum_link" scale="8" />

Place 1 of this block in the center of <ItemLink id="quantum_ring" /> to create a quantum bridge. This block is not connected to a cable and only counts as a network component once the Quantum Bridge is built.

This block has storage space for one <ItemLink id="quantum_entangled_singularity" />, and this storage space can be accessed by automated facilities.

## Recipe

<RecipeFor id="quantum_link" />
