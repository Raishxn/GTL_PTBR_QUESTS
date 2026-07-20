---
navigation:
  parent: items-blocks-machines/items-blocks-machines-index.md
title: cable
  icon: fluix_glass_cable
  position: 110
categories:
- network infrastructure
item_ids:
- ae2:white_glass_cable
- ae2:orange_glass_cable
- ae2:magenta_glass_cable
- ae2:light_blue_glass_cable
- ae2:yellow_glass_cable
- ae2:lime_glass_cable
- ae2:pink_glass_cable
- ae2:gray_glass_cable
- ae2:light_gray_glass_cable
- ae2:cyan_glass_cable
- ae2:purple_glass_cable
- ae2:blue_glass_cable
- ae2:brown_glass_cable
- ae2:green_glass_cable
- ae2:red_glass_cable
- ae2:black_glass_cable
- ae2:fluix_glass_cable
- ae2:white_covered_cable
- ae2:orange_covered_cable
- ae2:magenta_covered_cable
- ae2:light_blue_covered_cable
- ae2:yellow_covered_cable
- ae2:lime_covered_cable
- ae2:pink_covered_cable
- ae2:gray_covered_cable
- ae2:light_gray_covered_cable
- ae2:cyan_covered_cable
- ae2:purple_covered_cable
- ae2:blue_covered_cable
- ae2:brown_covered_cable
- ae2:green_covered_cable
- ae2:red_covered_cable
- ae2:black_covered_cable
- ae2:fluix_covered_cable
- ae2:white_covered_dense_cable
- ae2:orange_covered_dense_cable
- ae2:magenta_covered_dense_cable
- ae2:light_blue_covered_dense_cable
- ae2:yellow_covered_dense_cable
- ae2:lime_covered_dense_cable
- ae2:pink_covered_dense_cable
- ae2:gray_covered_dense_cable
- ae2:light_gray_covered_dense_cable
- ae2:cyan_covered_dense_cable
- ae2:purple_covered_dense_cable
- ae2:blue_covered_dense_cable
- ae2:brown_covered_dense_cable
- ae2:green_covered_dense_cable
- ae2:red_covered_dense_cable
- ae2:black_covered_dense_cable
- ae2:fluix_covered_dense_cable
- ae2:white_smart_cable
- ae2:orange_smart_cable
- ae2:magenta_smart_cable
- ae2:light_blue_smart_cable
- ae2:yellow_smart_cable
- ae2:lime_smart_cable
- ae2:pink_smart_cable
- ae2:gray_smart_cable
- ae2:light_gray_smart_cable
- ae2:cyan_smart_cable
- ae2:purple_smart_cable
- ae2:blue_smart_cable
- ae2:brown_smart_cable
- ae2:green_smart_cable
- ae2:red_smart_cable
- ae2:black_smart_cable
- ae2:fluix_smart_cable
- ae2:white_smart_dense_cable
- ae2:orange_smart_dense_cable
- ae2:magenta_smart_dense_cable
- ae2:light_blue_smart_dense_cable
- ae2:yellow_smart_dense_cable
- ae2:lime_smart_dense_cable
- ae2:pink_smart_dense_cable
- ae2:gray_smart_dense_cable
- ae2:light_gray_smart_dense_cable
- ae2:cyan_smart_dense_cable
- ae2:purple_smart_dense_cable
- ae2:blue_smart_dense_cable
- ae2:brown_smart_dense_cable
- ae2:green_smart_dense_cable
- ae2:red_smart_dense_cable
- ae2:black_smart_dense_cable
- ae2:fluix_smart_dense_cable
---

# Cable

<GameScene zoom="3" background="transparent">
  <ImportStructure src="../assets/assemblies/cables.snbt" />
  <IsometricCamera yaw="180" pitch="30" />
</GameScene>

Although adjacent ME machines can also create ME networks, the main way to expand ME networks over large areas is through cables.

Cable discoloration prevents adjacent cables from connecting, making [channels](../ae2-mechanics/channels.md) distribution more efficient. They also affect the color of the terminals above them, so you don't just have purple terminals. Fluix-colored cables can be connected to all cable colors.

Note that the channel and cable color have nothing to do with each other.

## Important remarks

**If you are new to AE2 and are not familiar with the channels, you can try to use smart cables and dense cables everywhere. They show the channel's path through the network, making it easy to understand the channel's behavior. **

## Another note

**Channels are not items/fluids/energy/other types of conduits. **Channels have no internal storage space. Sample providers and machines do not "input" items into the channel. The only thing the channel does is to connect AE2 [devices] (../ae2-mechanics/devices.md) into a network.

## Glass Cable

<GameScene zoom="6" background="transparent">
<ImportStructure src="../assets/assemblies/fluix_glass_cable.snbt" />
<IsometricCamera yaw="195" pitch="30" />
</GameScene>

<ItemLink id="fluix_glass_cable" /> is the simplest cable that can transmit energy and can transmit up to 8 [channels](../ae2-mechanics/channels.md). It has a total of 17 colors, the default color is Fluix, and can be dyed into the corresponding color with 16 dyes.

Surround the dye with 8 cables in the synthesis grid to synthesize dyed cables (the colors of the synthetic cables do not need to be the same, but they must be the same type of cables, such as glass, smart, etc.). You can also use any Forge-compatible paint brush to dye the cables in the world.

Any dyed cable can be crafted with a bucket to wash away the dye.

<ItemLink id="fluix_covered_cable" /> can be made by wrapping a cable in wool, or <ItemLink id="fluix_smart_cable" /> can be synthesized to better observe the behavior of [channel](../ae2-mechanics/channels.md).

<RecipeFor id="fluix_glass_cable" />

<RecipeFor id="blue_glass_cable" />

## Clad Cable

<GameScene zoom="6" background="transparent">
  <ImportStructure src="../assets/assemblies/fluix_covered_cable.snbt" />
  <IsometricCamera yaw="195" pitch="30" />
</GameScene>

Compared to <ItemLink id="fluix_glass_cable" />, the covered cable does not provide any additional gaming features. However, if you like the look of covered cables, they can also be used as practical decoration.

Clad cable can be dyed like <ItemLink id="fluix_glass_cable" />. Four <ItemLink id="fluix_covered_cable" /> plus redstone and glowstone can be combined into <ItemLink id="fluix_covered_dense_cable" />.

<Recipe id="network/cables/covered_fluix" />

<RecipeFor id="blue_covered_cable" />

## Dense Cable

<GameScene zoom="6" background="transparent">
  <ImportStructure src="../assets/assemblies/fluix_covered_dense_cable.snbt" />
  <IsometricCamera yaw="195" pitch="30" />
</GameScene>

The high-capacity cable can transmit 32 channels instead of the 8 of ordinary cables. However, dense cables do not support buses. The dense cables must be reduced to small cables (such as <ItemLink id="fluix_glass_cable" /> and <ItemLink id="fluix_smart_cable" />) before the bus and panel can be placed.

Dense cables slightly modify the "shortest path" behavior of the channel: the channel first takes the shortest path to the dense cable, and then follows the shortest path through the dense cable to the controller.

<Recipe id="network/cables/dense_covered_fluix" />

<RecipeFor id="blue_covered_dense_cable" />

## Smart Cable

<Row>
<GameScene zoom="6" background="transparent">
  <ImportStructure src="../assets/assemblies/fluix_smart_cable.snbt" />
  <IsometricCamera yaw="195" pitch="30" />
</GameScene>
<GameScene zoom="6" background="transparent">
  <ImportStructure src="../assets/assemblies/fluix_smart_dense_cable.snbt" />
  <IsometricCamera yaw="195" pitch="30" />
</GameScene>
</Row>

Although the appearance is similar to <ItemLink id="fluix_covered_cable" />, the smart cable can display channel usage and has diagnostic functions. Channels appear as thin colored lines on the black stripe of the cable, making it easier to understand channel usage within the network. The first four channels on an ordinary smart cable are the same color as the cable, and the last four are white. Each thin line of the dense cable represents 4 channels.

In a network with <ItemLink id="controller" />, the thin wires on the cable match the actual lines of the channel.

Smart cables in self-organizing networks will display the number of channels occupied by the entire network, rather than the number of channels passing through itself.

Smart cables can be dyed like <ItemLink id="fluix_glass_cable" />.

<Recipe id="network/cables/smart_fluix" />

<Recipe id="network/cables/dense_smart_fluix" />

<RecipeFor id="blue_smart_cable" />
