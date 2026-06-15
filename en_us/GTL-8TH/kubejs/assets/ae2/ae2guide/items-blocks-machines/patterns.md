---
navigation:
  parent: items-blocks-machines/items-blocks-machines-index.md
title: template
  icon: crafting_pattern
  position: 410
categories:
- tools
item_ids:
- ae2:blank_pattern
- ae2:crafting_pattern
- ae2:processing_pattern
- ae2:smithing_table_pattern
- ae2:stonecutting_pattern
---

# Boilerplate

<ItemImage id="crafting_pattern" scale="4" />

Templates are made from blank templates in <ItemLink id="pattern_encoding_terminal" /> and can be loaded into <ItemLink id="pattern_provider" /> and <ItemLink id="molecular_assembler" />.

There are several different templates designed for different processing methods:

* <ItemLink id="crafting_pattern" /> can encode workbench recipes. Such templates can be placed directly into <ItemLink id="molecular_assembler" /> to have them automatically synthesized upon receipt of materials, but their primary use is in <ItemLink id="pattern_provider" /> adjacent to the molecular assembly room. The pattern supplier has special behavior in this case and will import the relevant pattern and material into the adjacent assembly room. Because the assembly chamber automatically pops product into adjacent containers, an adjacent assembly chamber and pattern feeder are all that is needed to automate pattern synthesis.

***

* <ItemLink id="smithing_table_pattern" /> is very similar to the crafting template, but encodes the forging table recipe. They can also be automated via template providers and molecular assembly chambers, with completely identical workflows. In fact, the facilities required for crafting, forging table, and stonecutter templates are all exactly the same.

***

* <ItemLink id="stonecutting_pattern" /> is very similar to the crafting template, but encodes the stonecutter recipe. They can also be automated via template providers and molecular assembly chambers, with completely identical workflows. In fact, the facilities required for crafting, forging table, and stonecutter templates are all exactly the same.

***

* <ItemLink id="processing_pattern" /> is where the flexibility of automatic synthesis lies. They are the most versatile type of template, and simply put, "if the template supplier outputs these materials to an adjacent container, the ME system will receive these items at some point in the future". They are automatically synthesized in conjunction with almost all other modular machines (or furnace-like machines). The reason is that they are very general and don't care about anything that happens between the output material and the input product. You can do very weird things, such as inputting materials into a complex factory production line for sorting, transporting other materials from a farm with unlimited production, and printing out an entire "Bee" script. As long as the ME system can get the product specified by the template, it will not care at all. In fact, it doesn't even care whether there is a connection between the material and the product. You can tell the system "1x Sakura Plank = 1x Nether Star" and then have the Wither Farm kill a wither every time it receives a Cherry Blossom Plank, and there won't be any problems at all.

Multiple <ItemLink id="pattern_provider" /> with the same template will work in parallel, and it is also possible to set a recipe such as "8x cobblestone = 8x stone" instead of "1x cobblestone = 1x stone". The template supplier will input 8 cobblestones to the smelting facility each time instead of 1 each time.

## Recipe

<RecipeFor id="blank_pattern" />
