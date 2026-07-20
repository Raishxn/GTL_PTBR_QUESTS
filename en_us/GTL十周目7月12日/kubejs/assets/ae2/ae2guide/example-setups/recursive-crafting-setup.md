---
navigation:
  parent: example-setups/example-setups-index.md
title: Recursive synthesis
  icon: minecraft:netherite_upgrade_smithing_template
---

# Recursive composition facility

As mentioned in [Autocrafting](../ae2-mechanics/autocrafting.md), the automatic crafting planning algorithm cannot handle recipes whose primary output is also an input. For example, it cannot handle recipes that copy <ItemLink id="minecraft:netherite_upgrade_smithing_template" />.

One solution is to use <ItemLink id="level_emitter" /> as a [boilerplate](../items-blocks-machines/patterns.md).

After that, you can use the standard transmitter to start a small continuous synthesis facility. In this section, we mainly take the facility of copying <ItemLink id="minecraft:netherite_upgrade_smithing_template" /> as an example.

<RecipeFor id="minecraft:netherite_upgrade_smithing_template" />

***

<GameScene zoom="6" interactive={true}>
  <ImportStructure src="../assets/assemblies/recursive_recipe_setup.snbt" />

  <BoxAnnotation color="#dddddd" min="1 0 0" max="2 1 1">
(1) Interface: Set up to store the additional materials required: diamond and netherite.
        <Row><ItemImage id="minecraft:diamond" scale="2" /> <ItemImage id="minecraft:netherrack" scale="2" /></Row>
  </BoxAnnotation>

  <BoxAnnotation color="#dddddd" min="2.3 1 0.3" max="2.7 1.3 0.7">
(2) Standard transmitter: configured as "Netherite upgrade forging template" and set to "emit redstone signal to synthesize items".
        <Row><ItemImage id="minecraft:netherite_upgrade_smithing_template" scale="2" /> <ItemImage id="crafting_card" scale="2" /></Row>
  </BoxAnnotation>

  <BoxAnnotation color="#dddddd" min="2 0 0" max="2.3 1 1">
(3) Input bus #1: Filter the items stored in the interface. Contains a redstone card. Redstone mode is set to "Activate on redstone signal".
        <Row>
        <ItemImage id="minecraft:diamond" scale="2" />
        <ItemImage id="minecraft:netherrack" scale="2" />
        <ItemImage id="redstone_card" scale="2" />
        </Row>
  </BoxAnnotation>

  <BoxAnnotation color="#dddddd" min="3 1 1" max="4 1.3 2">
(4) Storage bus #1: Has a higher priority than another storage bus. Very important.
  </BoxAnnotation>

  <BoxAnnotation color="#dddddd" min="3 0 1" max="4 1 2">
(5) Molecular assembly room: equipped with a replica forging template.

![Template](../assets/diagrams/smithing_template_pattern_small.png)

During construction, a forging template needs to be manually placed into it.
  </BoxAnnotation>

  <BoxAnnotation color="#dddddd" min="2.7 0 1" max="3 1 2">
(6) Input bus #2: Default configuration.
  </BoxAnnotation>

  <BoxAnnotation color="#dddddd" min="1 0 1" max="2 1 1.3">
(7) Storage Bus #2: Filter "Netherite Upgrade Forging Template". Has a lower priority than another memory bus.
        <ItemImage id="minecraft:netherite_upgrade_smithing_template" scale="2" />
  </BoxAnnotation>

<DiamondAnnotation pos="0 0.5 0.5" color="#00ff00">
to main network
    </DiamondAnnotation>

  <IsometricCamera yaw="15" pitch="30" />
</GameScene>

## Configuration

* <ItemLink id="interface" />(1) is set up to store the additional materials required: diamond and netherite.
* <ItemLink id="level_emitter" />(2) configured as "Netherite Upgrade Forging Template", set to "Emit redstone signal to craft items".
* The first <ItemLink id="import_bus" />(3) is set to filter the items stored in the interface. Contains a redstone card. Redstone mode is set to "Activate on redstone signal".
* The [priority](../ae2-mechanics/import-export-storage.md#storage-priority) of the first <ItemLink id="storage_bus" />(4) needs to be *higher* than the second storage bus.
* <ItemLink id="molecular_assembler" /> (5) A template containing a duplicate forging template, and a manually placed forging template.

![Template](../assets/diagrams/smithing_template_pattern.png)

* The second <ItemLink id="import_bus" />(6) is in default configuration.
* The second <ItemLink id="storage_bus" />(7) is set to filter "Netherite upgrade forging template". Its [priority](../ae2-mechanics/import-export-storage.md#storage-priority) is *lower* than the first storage bus.

## Working principle

1. Since it contains <ItemLink id="crafting_card" /> and is set to "emit a redstone signal to craft items", <ItemLink id="level_emitter" /> is equivalent to a [template](../items-blocks-machines/patterns.md). The "Netherite Upgrade Forging Template" will appear in [Terminals](../items-blocks-machines/terminals.md) as an [Automatically Craftable](../ae2-mechanics/autocrafting.md) item.
2. The standard transmitter will be opened when a synthesis request is received from the player or the system.
3. The first <ItemLink id="import_bus" /> is activated by the standard transmitter and extracts material from <ItemLink id="interface" />.
4. The only <ItemLink id="storage_bus" /> in the network that can store these materials is the assembly room.
5. <ItemLink id="molecular_assembler" /> receives the materials (including 1 forging template), starts synthesis, and produces 2 forging templates.
6. The second <ItemLink id="import_bus" /> draws out 1 forging template.
7. The first storage bus has higher priority, so the forge template is returned to the assembly room.
8. The second <ItemLink id="import_bus" /> draws out 1 forging template.
9. The assembly room cannot accept any more forged templates, so a second forged template goes to the low-priority storage bus and is fed into the interface.
10. <ItemLink id="interface" /> (storage forging template not set) will send it back to the network.