---
navigation:
  parent: items-blocks-machines/items-blocks-machines-index.md
title: controller
  icon: controller
  position: 110
categories:
- network infrastructure
item_ids:
- ae2:controller
---

# controller

<BlockImage id="controller" p:state="online" scale="8" />

The controller is the pathfinding center of [ME Network](../ae2-mechanics/me-network-connections.md). Without a controller, the network is "self-organizing" and can only contain a maximum of 8 [devices] occupying channels (../ae2-mechanics/devices.md).

Multiple sets of controllers are not allowed to exist in the same [ME network](../ae2-mechanics/me-network-connections.md).

The controller provides 32 [channels] per side (../ae2-mechanics/channels.md).

Each controller block requires 6AE/t to function properly. Each controller block can store 8000AE, larger networks may require additional energy storage capacity. See [Energy](../ae2-mechanics/energy.md) for details.

The structure of the multi-block controller is relatively free.

<GameScene zoom="2" background="transparent">
  <ImportStructure src="../assets/assemblies/controllers.snbt" />
  <IsometricCamera yaw="195" pitch="30" />
</GameScene>

However, there are still a few rules to follow:

1. All controller blocks of the same [ME network](../ae2-mechanics/me-network-connections.md) must be adjacent, otherwise all blocks will turn red.
2. The size of the controller needs to be less than or equal to 7x7x7, otherwise it will turn red.
3. A block in the controller can only have a maximum of 2 adjacent blocks in one axial direction. If any block violates this rule, the controller will fail and turn red.

<GameScene zoom="2" background="transparent">
  <ImportStructure src="../assets/assemblies/controller_rules.snbt" />
  <IsometricCamera yaw="195" pitch="30" />
</GameScene>

When all rules are followed and power is supplied, the controller will glow and cycle through colors.

Right-clicking the controller opens the same GUI as <ItemLink id="network_tool" />.

## Recipe

<RecipeFor id="controller" />
