---
navigation:
  parent: items-blocks-machines/items-blocks-machines-index.md
title: Synthesis CPU multi-block structure (synthesis memory, parallel processing unit, synthesis monitor, synthesis unit)
  icon: 1k_crafting_storage
  position: 210
categories:
- devices
item_ids:
- ae2:1k_crafting_storage
- ae2:4k_crafting_storage
- ae2:16k_crafting_storage
- ae2:64k_crafting_storage
- ae2:256k_crafting_storage
- ae2:crafting_accelerator
- ae2:crafting_monitor
- ae2:crafting_unit
---

# Synthesize CPU

<GameScene zoom="4" background="transparent">
  <ImportStructure src="../assets/assemblies/crafting_cpus.snbt" />
  <IsometricCamera yaw="195" pitch="30" />
</GameScene>

<Row>
  <BlockImage id="1k_crafting_storage" scale="4" />

  <BlockImage id="crafting_accelerator" scale="4" />

  <BlockImage id="crafting_monitor" scale="4" />

  <BlockImage id="crafting_unit" scale="4" />
</Row>

The composition CPU manages composition requests and composition tasks. They will store intermediate products in themselves when performing multi-step synthesis tasks, and affect the maximum size of synthesis tasks, and to some extent, the completion speed of these tasks. See [Autocrafting](../ae2-mechanics/autocrafting.md) for details.

Right-clicking the compositing CPU will open the compositing status UI, where you can check the progress of the compositing tasks being processed by the CPU.

## set up

* The crafting CPU can be set to accept only player requests, only automated system requests (such as <ItemLink id="export_bus" /> with <ItemLink id="crafting_card" /> installed), or both.

## put up

The synthetic CPU is a multi-block structure and must be a solid rectangular prism with no gaps. They consist of the following components:

Each CPU must contain at least 1 synthetic memory (the smallest CPU available is actually a single 1k synthetic memory).

# Synthetic unit

<BlockImage id="crafting_unit" scale="4" />

(Optional) The synthesis unit is only used to fill the gaps within the CPU to ensure that the shape of the CPU is a solid rectangular prism. This fill can be used when there are no other components. They are also composite materials for other components.

<RecipeFor id="crafting_unit" />

# Synthetic memory

<Row>
  <BlockImage id="1k_crafting_storage" scale="4" />

  <BlockImage id="4k_crafting_storage" scale="4" />

  <BlockImage id="16k_crafting_storage" scale="4" />

  <BlockImage id="64k_crafting_storage" scale="4" />

  <BlockImage id="256k_crafting_storage" scale="4" />
</Row>

(Required) Synthetic memory supports all standard element sizes (1k, 4k, 16k, 64k, 256k). They store synthesis-related materials and intermediate materials within themselves, so crafting tasks that require more materials require larger or more synthesis stores.

<Column>
  <Row>
    <RecipeFor id="1k_crafting_storage" />

    <RecipeFor id="4k_crafting_storage" />

    <RecipeFor id="16k_crafting_storage" />
  </Row>

  <Row>
    <RecipeFor id="64k_crafting_storage" />

    <RecipeFor id="256k_crafting_storage" />
  </Row>
</Column>

# Parallel processing unit

<BlockImage id="crafting_accelerator" scale="4" />

(Optional) The Parallel Processing Unit allows the system to send batches of materials from <ItemLink id="pattern_provider" /> more frequently by increasing the CPU speed, allowing the system to keep up with faster processing machines. For example, if a pattern supplier surrounded by <ItemLink id="molecular_assembler" /> delivers material faster than a single assembly room can process it, it will distribute batches of material among the assembly rooms.

Some complex recipes may contain multiple steps that can be done in parallel, such as making wooden boards and books in parallel when making a bookshelf. In the composition status UI (right-click on the CPU or right-click on the hammer icon in terminals.md), these steps are shown as "Planned composition". Each parallel processing unit can make an additional step of the above process run in parallel (that is, displayed as "compositing"). However, this is usually less important because the reason for adding a large number of parallel processing units is usually to increase the sending speed rather than to increase the number of parallel processing recipes.

<RecipeFor id="crafting_accelerator" />

#Composite monitor

<BlockImage id="crafting_monitor" scale="4" />

(Optional) The composition monitor displays the tasks currently being processed by the CPU. Its screen can be tinted with <ItemLink id="color_applicator" />.

<RecipeFor id="crafting_monitor" />
