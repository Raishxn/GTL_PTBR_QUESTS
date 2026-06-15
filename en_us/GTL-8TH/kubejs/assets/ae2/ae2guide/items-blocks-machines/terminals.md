---
navigation:
  parent: items-blocks-machines/items-blocks-machines-index.md
title: terminal
  icon: crafting_terminal
  position: 210
categories:
- devices
item_ids:
- ae2:terminal
- ae2:crafting_terminal
- ae2:pattern_encoding_terminal
- ae2:pattern_access_terminal
---

# terminal

<GameScene zoom="6" background="transparent">
  <ImportStructure src="../assets/assemblies/terminals.snbt" />
  <IsometricCamera yaw="195" pitch="30" />
</GameScene>

<ItemLink id="pattern_provider" />, <ItemLink id="import_bus" />, <ItemLink id="storage_bus" />, etc. are the basic ways for the AE2 network to interact with the world, and the terminal is the basic way for the AE2 network to interact with *you*. Terminals come in several variants with varying functionality.

The terminal will inherit the color of the [cables.md] that supports it.

They are [cable subparts](../ae2-mechanics/cable-subparts.md).

## Terminal placement

The terminal is usually the first [subpart] to be placed (../ae2-mechanics/cable-subparts.md), so it is normal to have placement issues or reverse placement. See examples of dos and don’ts below:

<GameScene zoom="6" background="transparent">
  <ImportStructure src="../assets/assemblies/terminal_placement.snbt" />
  <IsometricCamera yaw="195" pitch="30" />

  <LineAnnotation color="#ff3333" from="2.5 .5 .5" to="4.5 2.5 .5" alwaysOnTop={true} thickness="0.05"/>
  <LineAnnotation color="#ff3333" from="2.5 2.5 .5" to="4.5 .5 .5" alwaysOnTop={true} thickness="0.05"/>

  <LineAnnotation color="#33ff33" from="-.5 2.5 .5" to="1 .5 .5" alwaysOnTop={true} thickness="0.05"/>
  <LineAnnotation color="#33ff33" from="1 .5 .5" to="1.5 1 .5" alwaysOnTop={true} thickness="0.05"/>
</GameScene>

The terminal and energy receiver are still there, but the terminal is oriented correctly and connected to the network, and the overall space usage is better.

<a name="terminal-ui"></a>

# Terminal search

The search box accepts regular expressions, so you can enter "gtceu:.*ore" to search for all Gregtech's ores. The learning of regular expressions is left as an exercise to the reader.

# terminal

<GameScene zoom="6" background="transparent">
  <ImportStructure src="../assets/blocks/terminal.snbt" />
  <IsometricCamera yaw="180" />
</GameScene>

A basic terminal that allows you to access the contents of [Network Storage](../ae2-mechanics/import-export-storage.md) and send requests to the [Autocrafting](../ae2-mechanics/autocrafting.md) facility.

## interface

The base terminal's UI is divided into several parts.

The middle part is network storage, where items can be deposited or retrieved. This section supports several mouse/keyboard shortcuts:

* Left click to take out a group, right click to take out a half group
* If an item or fluid allows [autocrafting](../ae2-mechanics/autocrafting.md), the button bound to "Select Block" (usually the middle mouse button) will invoke the UI for setting the autocrafting amount. You can also enter a formula such as `3*64/2`, and you can also enter `=32` to fill in the missing quantity of 32 items in the network storage.
* Holding down Shift will pin the displayed items to prevent them from being reorganized when the quantity changes or the items enter the system
* Right-click on a bucket or other fluid container to store fluid, and left-click on an empty fluid container to remove fluid from the terminal.

There are the following setting buttons on the left side:

* Sort by item name, item quantity, module, etc.
* View stored, composable, or both
* View items, fluids, or both
* Change sort order
* Open the detailed terminal settings window
* Change the height of the terminal UI

The right part is the <ItemLink id="view_cell" /> slot.

The upper right corner of the middle part (hammer icon) will display the [Autocrafting](../ae2-mechanics/autocrafting.md) status UI, allowing you to view the progress of automatic crafting and the current tasks of each [Crafting CPU](crafting_cpu_multiblock.md).

## Recipe

<RecipeFor id="terminal" />

<a name="crafting-terminal-ui"></a>

# Synthetic terminal

<GameScene zoom="6" background="transparent">
  <ImportStructure src="../assets/blocks/crafting_terminal.snbt" />
  <IsometricCamera yaw="180" />
</GameScene>

The synthesis terminal is similar to the ordinary terminal. Their UI area and settings are the same, but the synthesis terminal has a new synthesis grid that can be automatically supplemented from [Network Storage](../ae2-mechanics/import-export-storage.md). Be careful when compositing while holding down Shift!

Ordinary terminals should be upgraded to synthetic terminals as soon as possible.

## interface

The UI of the synthesis terminal is the same as that of the ordinary terminal, with a synthesis square added in the middle.

Two new buttons have been added to clear the items in the synthesis grid to network storage or inventory.

## Recipe

<RecipeFor id="crafting_terminal" />

<a name="pattern-encoding-terminal-ui"></a>

# Sample coding terminal

<GameScene zoom="6" background="transparent">
  <ImportStructure src="../assets/blocks/pattern_encoding_terminal.snbt" />
  <IsometricCamera yaw="180" />
</GameScene>

The template coding terminal is similar to the ordinary terminal. Their UI area and settings are the same, but the template coding terminal has a new [template] (patterns.md) coding interface. The UI appearance is similar to that of the synthesis terminal, but the synthesis squares here cannot be truly synthesized.

You should have a boilerplate coding terminal after you have a synthetic terminal.

## interface

The UI of the template coding terminal is the same as that of the ordinary terminal, and a [template] (patterns.md) coding interface is added in the middle.

The boilerplate coding interface is divided into several areas:

* Can be placed in the slot of <ItemLink id="blank_pattern" />
* Large arrows for coding boilerplate
* A slot where coded templates can be placed; place coded templates here to modify and press the "Coding" arrow to save
* There are 4 option bars on the right for changing the template to the following types:
* Synthesis
*   deal with
* Forging table
* Stone cutter

The middle UI will change based on the selected encoding type:

*Composite mode:
* Left-click or drag from JEI/REI to add materials to the recipe; right-click to remove materials
* Allow alternative recipes to support recipes like crafting sticks from any plank; should only be enabled when absolutely necessary
* Fluid substitution allows the use of fluids in storage instead of barreled fluids
* You can also code the template directly from the JEI/REI recipe interface

* Processing mode:
* Left-click, right-click or drag from JEI/REI to set the input and output of the recipe
* When holding a group of items, left-click to add the entire group, and right-click to add an item; left-click on an existing material to remove the entire group, and right-click to reduce one item; the button bound to "Select Block" (usually the middle mouse button) can accurately set the required amount of items or fluids
* The output slot has a main product slot and several by-product slots to facilitate the automatic synthesis algorithm to obtain information
* Both input and output slots are scrollable, with a total of 81 material slots and 26 by-product slots
* You can also code the template directly from the JEI/REI recipe interface

* The UI of the forging table and stonecutter mode is similar to the actual forging table and stonecutter.

## Recipe

<RecipeFor id="pattern_encoding_terminal" />

<a name="pattern-access-terminal-ui"></a>

# Sample management terminal

<GameScene zoom="6" background="transparent">
  <ImportStructure src="../assets/blocks/pattern_access_terminal.snbt" />
  <IsometricCamera yaw="180" />
</GameScene>

The Pattern Management Terminal solves the problem of not being able to put patterns directly into a supplier in an entire compact <ItemLink id="pattern_provider" /> and <ItemLink id="molecular_assembler" /> array. In addition, it can also solve the problem of laziness of not wanting to go to other locations in the base to place [patterns](patterns.md). The template management terminal allows access to all template providers in the network.

## interface

The UI of the sample management terminal is different from other terminals.

This UI has settings for the UI height and what template providers are displayed.

Each line in the terminal corresponds to a template provider.

Each template provider is classified according to the block it is connected to and its name (anvil or <ItemLink id="name_press" /> given).

## Recipe

<RecipeFor id="pattern_access_terminal" />
