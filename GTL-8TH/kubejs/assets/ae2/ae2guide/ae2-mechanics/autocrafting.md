---
navigation:
  parent: ae2-mechanics/ae2-mechanics-index.md
title: automatic synthesis
  icon: pattern_provider
---

# Automatic synthesis

### Let’s get a big one

<GameScene zoom="4" interactive={true}>
  <ImportStructure src="../assets/assemblies/autocraft_setup_greebles.snbt" />
  <IsometricCamera yaw="195" pitch="30" />
</GameScene>

Automatic synthesis is one of the basic functions of AE2. No longer need to be like some *commoners* who are tired of manually synthesizing the correct number of sub-materials, you can let the ME system synthesize it for you. Or automatically synthesize and output to other places. Or automatically maintain a certain number of items in inventory through intelligent emergent behavior. It also works on fluids, and if some attachments are installed that are compatible with more material types (such as Mekanism's gases), it will work on those types as well.确实非常不错。

This topic is quite complex, so without further ado, let’s get started.

The automatic synthesis facility consists of 3 parts:
- Transactions that send synthetic requests
- Synthetic CPU
- <ItemLink id="pattern_provider" />

The specific process is as follows:

1. Something issues a synthesis request. It can be something that can be automatically synthesized when you click on it in the terminal, or it can be an output bus or interface with a synthesis card that requests its settings to output or store items.

* (**Important:**Using a key bound to the "select block" (usually the middle mouse button) to request the synthesis of something already in the inventory may conflict with the inventory organizer mod)

2. The ME system calculates the requested materials and pre-synthesis steps and stores the materials in the selected synthesis CPU.

3. <ItemLink id="pattern_provider" /> installed with the relevant [template](../items-blocks-machines/patterns.md) will output the required materials in the template to any adjacent container.
In the case of a workbench recipe ("synthetic recipe"), the output destination is <ItemLink id="molecular_assembler" />.
If it is not a workbench recipe ("processing recipe"), the output destination is another block, machine, or complex redstone control facility.

4. The resulting product is returned to the system by some means, whether it is an input bus, an interface, or the product is fed into a template provider.
**Note that an "item input system" event must occur, and you cannot just input products into the box connected to <ItemLink id="storage_bus" />. **

5. If the synthesis process is a precursor to another synthesis process within the request, the product will be stored in the CPU and used later.

## Recursive recipe

<ItemImage id="minecraft:netherite_upgrade_smithing_template" scale="4" />

One of the things that automatic synthesis algorithms *can't* handle are recursive recipes. For example, throwing redstone into Botania's magic pool results in a copied recipe similar to "1x redstone powder = 2x redstone powder". Another example is the original forging template. However, there is indeed a way to handle these recipes (../example-setups/recursive-crafting-setup.md).

# Boilerplate

<ItemImage id="crafting_pattern" scale="4" />

Templates are made from blank templates in <ItemLink id="pattern_encoding_terminal" />.

There are several different templates designed for different processing methods:

* <ItemLink id="crafting_pattern" /> can encode workbench recipes. Such templates can be placed directly into <ItemLink id="molecular_assembler" /> to have them automatically synthesized upon receipt of materials, but their primary use is in <ItemLink id="pattern_provider" /> adjacent to the molecular assembly room. The pattern supplier has special behavior in this case and will import the relevant pattern and material into the adjacent assembly room. Because the assembly chamber automatically pops product into adjacent containers, an adjacent assembly chamber and pattern feeder are all that is needed to automate pattern synthesis.

***

* <ItemLink id="smithing_table_pattern" /> is very similar to the crafting template, but encodes the forging table recipe. They can also be automated via template providers and molecular assembly chambers, with completely identical workflows. In fact, the facilities required for crafting, forging table, and stonecutter templates are all exactly the same.

***

* <ItemLink id="stonecutting_pattern" /> is very similar to the crafting template, but encodes the stonecutter recipe. They can also be automated via template providers and molecular assembly chambers, with completely identical workflows. In fact, the facilities required for crafting, forging table, and stonecutter templates are all exactly the same.

***

* <ItemLink id="processing_pattern" /> is where the flexibility of automatic synthesis lies. They are the most versatile type of template, and simply put, "if the template supplier outputs these materials to an adjacent container, the ME system will receive these items at some point in the future". They are automatically synthesized in conjunction with almost all other modular machines (or furnace-like machines). The reason is that they are very general and don't care about anything that happens between the output material and the input product. You can do very weird things, such as inputting materials into a complex factory production line for sorting, transporting other materials from a farm with unlimited production, and printing out an entire "Bee" script. As long as the ME system can get the product specified by the template, it will not care at all. In fact, it doesn't even care whether there is a connection between the material and the product. You can tell the system "1x Sakura Plank = 1x Nether Star" and then have the Wither Farm kill a wither every time it receives a Cherry Blossom Plank, and there won't be any problems at all.

Multiple <ItemLink id="pattern_provider" /> with the same template will work in parallel; and it is also possible to set a recipe such as "8x cobblestone = 8x stone" instead of "1x cobblestone = 1x stone", so that the template supplier will input 8 cobblestones to the smelting facility each time instead of 1 each time.

## The most common "template"

There is also a kind of "boilerplate" that is more "general" than dealing with boilerplate. A <ItemLink id="level_emitter" /> containing a crafting card can be set up to emit a redstone signal to craft items. This "boilerplate" doesn't define or care about synthetic materials. In other words, "If a redstone signal is emitted from this standard transmitter, the ME system will receive these items at some point in the future." This is typically used to enable or disable infinite farms that do not require input materials, or to enable systems that handle recursive recipes (which standard automatic crafting cannot handle), such as "1x cobblestone = 2x cobblestone" if there is a machine that can duplicate cobblestone.

# Synthesize CPU

<GameScene zoom="4" background="transparent">
  <ImportStructure src="../assets/assemblies/crafting_cpus.snbt" />
  <IsometricCamera yaw="195" pitch="30" />
</GameScene>

The composition CPU manages composition requests and composition tasks. They will store intermediate products in themselves when performing multi-step synthesis tasks, and affect the maximum size of synthesis tasks, and to some extent, the completion speed of these tasks. They are multi-block structures, must be cuboid, and must contain at least 1 synthetic memory.

The composition of the synthetic CPU is as follows:

* (Required) [Crafting Memory](../items-blocks-machines/crafting_cpu_multiblock.md), supports all standard element sizes (1k, 4k, 16k, 64k, 256k); they will store crafting-related materials and intermediate materials within themselves, so crafting tasks that handle more materials required will require larger or more crafting memories
* (Optional) <ItemLink id="crafting_accelerator" />, which allow the system to send batches of material from a single pattern supplier more quickly; for example, this will cause the pattern supplier to send materials to six adjacent assembly rooms at the same time, rather than one at a time
* (optional) <ItemLink id="crafting_monitor" />, they will show the tasks currently being processed by the CPU; can be colored with <ItemLink id="color_applicator" />
* (optional) <ItemLink id="crafting_unit" />, they are only used to fill in the gaps so that the CPU is shaped like a cuboid

Each synthesis CPU can handle 1 synthesis request or task, so if you need to synthesize the operation processor and 256 smooth stones at the same time, you need to have 2 CPU multi-block structures.

They can be set up to accept only player requests, only automation system (output buses and interfaces) requests, or both.

# Template provider

<Row>
<BlockImage id="pattern_provider" scale="4" />

<BlockImage id="pattern_provider" p:push_direction="up" scale="4" />

<GameScene zoom="4" background="transparent">
  <ImportStructure src="../assets/blocks/cable_pattern_provider.snbt" />
</GameScene>
</Row>

<ItemLink id="pattern_provider" /> is the basic way for the automatic synthesis system to interact with the world. They will export the materials specified by [template](../items-blocks-machines/patterns.md) to adjacent containers, and can also import items into them for import into the network. It is often possible to save channels by transmitting the machine's output to a nearby sample supplier (usually the one that outputs the material), rather than letting <ItemLink id="import_bus" /> extract the output.

It should be noted that they will output items directly from the [crafting memory] (../items-blocks-machines/crafting_cpu_multiblock.md#crafting-storage) in the crafting CPU; therefore, the template provider itself does not store items, so items cannot be extracted directly from it: the items need to be output to another container (such as a barrel), and then extracted from there.

In addition, the supplier will output the entire material at the same time, not half of it. This feature is very useful.

The sample provider and interface have a special interaction effect - [Subnetworks](../ae2-mechanics/subnetworks.md): If the interface is not modified (there is no content in the request slot), the provider will skip the interface and output directly to the subnetwork's [ Storage module](../ae2-mechanics/import-export-storage.md) instead of exporting to the storage slot of the interface; more importantly, as long as the corresponding storage module does not have enough space, the next batch of items will not be exported.

Multiple template providers with the same template are allowed and will work in parallel.

The pattern supplier attempts to poll batches of material on all of its sides, thus using all adjacent machines in parallel.

## Variants

The template provider comes in 3 variants: normal, directional, and panel. This affects the ability of each side to output materials, receive items, and provide network connections.

* The normal pattern supplier will output materials to all sides, receive items from all sides, and, like most AE2 machines, provide network connections to all sides, similar to cables.

* Directional pattern providers can be generated by using <ItemLink id="certus_quartz_wrench" /> on a normal pattern provider. They only output materials to the selected side, receive items from all sides, and do not provide network connectivity only to the selected side. This allows them to output items to the AE2 machine without connecting to the network, which is very useful for building sub-networks.

* Panel type sample suppliers are [cable subparts](../ae2-mechanics/cable-subparts.md), so multiple such suppliers can be placed on the same cable to facilitate the design of compact facilities. They have similar functions to the directional supplier selection interface, outputting sample materials, receiving items, and do not provide a network connection.

The template provider's normal and panel forms can be switched between the crafting grid.

## set up

The template provider comes in several modes:

* **Block Mode** prevents the supplier from outputting new batches when there is already material in the machine
* **Locked synthesis** can lock the supplier under various redstone signal conditions, and can also lock the synthesis product of the previous batch of materials before it is returned to the supplier.
* Providers can be shown or hidden on <ItemLink id="pattern_access_terminal" />

## Priority

You can click the wrench in the upper right corner of the GUI to set the priority. When multiple [Patterns](../items-blocks-machines/patterns.md) correspond to the same item, the pattern in the high-priority provider will be used before the pattern in the low-priority provider, unless the network cannot supply the materials required for the high-priority pattern.

# molecular assembly room

<BlockImage id="molecular_assembler" scale="4" />

<ItemLink id="molecular_assembler" /> will receive the items input into it and perform the operations set by the adjacent <ItemLink id="pattern_provider" />, or perform the operations set by <ItemLink id="crafting_pattern" />, <ItemLink id="smithing_table_pattern" />, and <ItemLink id="stonecutting_pattern" />, and output the product to the adjacent container.

Their main purpose is to be placed adjacent to <ItemLink id="pattern_provider" />. The pattern supplier has special behavior in this case and will import the relevant pattern and material into the adjacent assembly room. Because the assembly chamber will automatically pop the product into an adjacent container (that is, into the return column of the pattern supplier), the adjacent assembly chamber and pattern supplier are all that is needed to automatically synthesize the pattern.

<GameScene zoom="4" background="transparent">
<ImportStructure src="../assets/assemblies/assembler_tower.snbt" />
<IsometricCamera yaw="195" pitch="30" />
</GameScene>