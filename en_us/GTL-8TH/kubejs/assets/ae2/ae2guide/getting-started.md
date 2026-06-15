---
navigation:
title: Getting Started (1.20+)
  position: 10
---

<div class="notification is-info">
The following information only applies to App Energy 2 for Minecraft 1.20 or newer.
</div>

# Getting Started

## Get starting materials

<GameScene zoom="4" background="transparent">
  <ImportStructure src="assets/assemblies/meteor_interior.snbt" />
</GameScene>

AppEnergy 2 begins with a search for [meteorites](ae2-mechanics/meteorites.md). Meteorites are relatively common and often leave huge craters in the terrain, so you may have already encountered one during your travels.
If you haven't encountered it yet, you can synthesize a <ItemLink id="meteorite_compass" />, which will point to the nearest <ItemLink id="mysterious_cube" />.

Once a meteorite is discovered, it is necessary to dig toward its center. There you can find Certus Quartz Clusters, Certus Quartz Buds, various types of [Certus Quartz Mother Rock](items-blocks-machines/budding_certus.md), and a mysterious block.

Dig up any Sethus Quartz Clusters and Sethus Quartz Blocks you find. Sethos quartz parent rock can also be collected, but it will be downgraded by one level if it is not collected accurately.

Do not destroy any flawless Sethus Quartz matrix, as it will be degraded to defective Sethus Quartz matrix with accurate harvesting, and it will be impossible to repair it back.

And also dig out the mystery block in the middle to get all 4 embossed templates.

## Cultivate Sethus Quartz

<GameScene zoom="4" background="transparent">
<ImportStructure src="assets/assemblies/budding_certus_1.snbt" />
</GameScene>

Certus Quartz Buds will grow from [Certus Quartz Mother Rock](items-blocks-machines/budding_certus.md), similar to Amethyst. If you destroy an incomplete quartz bud, it will drop a <ItemLink id="certus_quartz_dust" />, which is not affected by luck. If the grown quartz cluster is destroyed, four <ItemLink id="certus_quartz_crystal" /> will be dropped, and the amount dropped will be increased by luck.

There are four grades of Sethos quartz parent rock: flawless, defective, cracked, and damaged.

<GameScene zoom="4" background="transparent">
<ImportStructure src="assets/assemblies/budding_blocks.snbt" />
<IsometricCamera yaw="195" pitch="30" />
</GameScene>

Each time a Quartz Bud grows, the parent rock has the potential to be downgraded by one level, eventually turning into a regular block of Sethus Quartz. Putting the Sethus Quartz parent rock or Sethus Quartz block into water together with several <ItemLink id="charged_certus_quartz_crystal" /> can repair it and create a new parent rock.

<RecipeFor id="damaged_budding_quartz" />

Flawless Sethus Quartz parent rock does not degrade, thus producing unlimited Sethus Quartz. However, they cannot be synthesized, nor can they be dug up and transported intact with a pickaxe, even with accurate collection. (However they *can* be moved by [Spatial Storage](ae2-mechanics/spatial-io.md).)

The Setus Quartz parent rock itself grows very slowly. Fortunately, placing <ItemLink id="growth_accelerator" /> next to the parent rock can greatly speed up this process. Your first order of business is to make some of this block.

<GameScene zoom="4" background="transparent">
<ImportStructure src="assets/assemblies/budding_certus_2.snbt" />
<IsometricCamera yaw="195" pitch="30" />
</GameScene>

If you don't have enough quartz to make <ItemLink id="energy_acceptor" /> or <ItemLink id="vibration_chamber" />, you can make a <ItemLink id="crank" /> and attach it to the incubator.

Design for automatic harvesting of Certus Quartz [see here](example-setups/simple-certus-farm.md).

## Brief description of Fruix

Another required material is Fluix, which you should have seen in the process of making the Crystal Spawner. Fruix can be made by throwing charged Sethus quartz crystal, redstone, and nether quartz into water. The automation of this process is "[left as an exercise to the reader](example-setups/processor-automation.md)".

<ItemLink id="charger" /> is necessary to produce <ItemLink id="charged_certus_quartz_crystal" />. If it has not been produced yet, please do so as soon as possible.

## Imprint some processors

The meteorite loot includes four embossed templates obtained by destroying the mysterious blocks. These can be used in <ItemLink id="inscriber" /> to make three processors.

<ItemGrid>
  <ItemIcon id="silicon_press" />

  <ItemIcon id="logic_processor_press" />

  <ItemIcon id="calculation_processor_press" />

  <ItemIcon id="engineering_processor_press" />
</ItemGrid>

The Imprinter is an area-sensitive machine, similar to the vanilla Forge. Items imported from the top or bottom will be placed in the top or bottom slots accordingly, and items entered from the side or back will be inserted into the middle slot. Product can be extracted from the side or back.

If a funnel is required for automation (perhaps also to reduce cable tangles), a <ItemLink id="certus_quartz_wrench" /> rotary stamper can be used.

Produce several processors of various types to prepare for the next step - building a very basic ME system. Processor automation is "left as an exercise to the reader."

## Material and Energy Technology: ME Network and Storage

### What is ME storage?

The thought is Emm-Eee, and the meaning is material energy.

Material energy is the main component of Applied Energy 2, similar to a mad scientist version of a multi-block chest, and can completely change your storage situation. The storage system in ME is very different from other Minecrafts, and may take a little out-of-the-box thinking to get used to. But after getting started, mass storage in a very small space, multiple management terminals, etc. are just the tip of the iceberg of possibilities.

### What do you need to know to get started?

First, ME stores items within other items. These items are called [storage components] (items-blocks-machines/storage_cells.md). There are 5 levels in total, and the storage capacity increases in sequence. Storage components must be placed in <ItemLink id="chest" /> or <ItemLink id="drive" /> before they can be used.

<ItemLink id="chest" /> will display its storage content immediately after placing the component, and items can be placed or removed from it, similar to <ItemLink id="minecraft:chest" />. The difference between the two is that the item is actually stored in the storage element, not <ItemLink id="chest" /> itself.

The use of <ItemLink id="chest" /> is relatively unstable and limited. To truly use AE2, you need to build a [ME network](ae2-mechanics/me-network-connections.md).

## Your first ME system

Now that the basic materials and machines of Applied Energy 2 are ready, you can start building your first ME (matter energy) system. This system is very basic, there is no automatic synthesis, no logistics, only simple and easy-to-use searchable storage.

<GameScene zoom="6" interactive={true}>
<ImportStructure src="assets/assemblies/tiny_me_system.snbt" />

</GameScene>

*Material list:
    * 1x <ItemLink id="drive" />
* 1x <ItemLink id="terminal" /> or <ItemLink id="crafting_terminal" />
    * 1x <ItemLink id="energy_acceptor" />
* Several [cables](items-blocks-machines/cables.md), glass, cladding, and smart are all acceptable, but dense is not.
* Several [storage components](items-blocks-machines/storage_cells.md), it is recommended to use 4k to maintain a balance between capacity and type (it is more convenient to mix 4k and 1k [Partition](items-blocks-machines/cell_workbench.md), but this knowledge is relatively complicated and will not be detailed yet)
---
1. Lower the drive.
2. The energy receiver (and several other AE2 [devices](ae2-mechanics/devices.md)) has 2 forms, block form and panel form. The two forms can be converted in the synthesis grid. If your energy receiver is a block, place it close to the driver. If it's a square panel, place the cable on the driver and the receiver on top of it.
3. Connect energy to the energy receiver using the cables/pipes/conduits from your favorite energy production module.
4. Place the cable above the drive (or at eye level) and place terminations or synthetic terminations on top of it.
5. Place the storage element into the drive.
6. Activate.
7. Tweak the terminal's settings as you like.
8. Bask in the glow of your superpowers.
9. Realize that at a macro level, this network is a little too small.

### Expand your network

You now have basic storage and the ability to access stored content, which is a good start, but you may also want to automate certain processes.

A great example of this is placing <ItemLink id="export_bus" /> on the top of a furnace to import ore, and placing <ItemLink id="import_bus" /> on the bottom of the furnace to extract smelted ore.

<ItemLink id="export_bus" /> can output items from the network to a matching container, while <ItemLink id="import_bus" /> can extract items from a matching container and input them into the network.

### Beyond Limits

At this point you may have almost put down 8 [devices] (ae2-mechanics/devices.md), and once you put down 9 devices, you will start to manage [channels] (ae2-mechanics/channels.md). Many devices (not all) need to occupy a channel in order to work.

By default, a network can support 8 channels. After this limit is exceeded, <ItemLink id="controller" /> needs to be added to the network. It can greatly expand your network. [Smart Cables](items-blocks-machines/cables.md) allows you to see how channels are distributed on the network. Use it broadly when starting to learn channel behavior, or if you have a lot of redstone and glowstone you can use it broadly.
