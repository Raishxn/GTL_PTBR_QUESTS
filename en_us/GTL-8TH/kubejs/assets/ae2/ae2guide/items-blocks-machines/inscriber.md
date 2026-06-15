---
navigation:
  parent: items-blocks-machines/items-blocks-machines-index.md
title: imprinter
  icon: inscriber
  position: 310
categories:
- machines
item_ids:
- ae2:inscriber
---

# imprinter

<BlockImage id="inscriber" scale="8" />

The imprinter can use [Impression Template](presses.md) to imprint circuit boards and [Processors](processors.md), and it can also grind several items into powder. It can accept AE2 energy (AE) and Fabric/Forge energy (E/FE). It can be set to be face-sensitive, so items imported from different faces will go into different slots. You can use <ItemLink id="certus_quartz_wrench" /> rotation to take advantage of this feature. It can also be set up to eject product into an adjacent container.

The size of the input buffer can be adjusted. If you need to feed many stampers with material from a single container, you can use small buffers to more efficiently distribute the material (rather than filling up the first stamper to 64 and leaving the rest empty).

4 types of circuit board stamping templates can be used to make [processors](processors.md).

<Row>
  <ItemImage id="silicon_press" scale="4" />

  <ItemImage id="logic_processor_press" scale="4" />

  <ItemImage id="calculation_processor_press" scale="4" />

  <ItemImage id="engineering_processor_press" scale="4" />
</Row>

The name stamp template can be used to name items like an anvil, making it easy to mark things in <ItemLink id="pattern_access_terminal" />.

<ItemImage id="name_press" scale="4" />

## set up

* The imprinter can be set up to be face-sensitive (explained below), or allow input from all faces and let internal filtering determine the target slot. Items cannot be drawn from their top and bottom slots in non-surface-sensitive mode.
* Imprinters can be set to eject items into adjacent containers.
* The input buffer of the imprinter is adjustable. The large buffer is suitable for independent imprinters with manual feeding materials, while the small buffer is suitable for a large number of parallel imprinters.


## GUI and surface sensitivity

When in face-sensitive mode, the imprinter determines its target slot based on the face of the item's input and output.

![Inscriber GUI](../assets/diagrams/inscriber_gui.png) ![Inscriber sides](../assets/diagrams/inscriber_sides.png)

A. **Top input** needs to be accessed from the top (allows input and output)

B. **Central input** needs to be accessed from the left, right, front, and back (input is allowed, output is not allowed)

C. **Bottom input** needs to be accessed from the bottom (allows input and output)

D. **Output** can be extracted from the left, right, front, and back (output is allowed, input is not allowed)

## Simple automation

As in the example below, the surface sensitivity and rotatability of the stamp enable it to be semi-automated as follows:

<GameScene zoom="4" background="transparent">
  <ImportStructure src="../assets/assemblies/inscriber_hopper_automation.snbt" />
  <IsometricCamera yaw="195" pitch="30" />
</GameScene>

You can also directly import and export items in a non-surface-sensitive state.

## upgrade

The imprinter supports the following [upgrades](upgrade_cards.md):

*   <ItemLink id="speed_card" />

## Recipe

<RecipeFor id="inscriber" />
