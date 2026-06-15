---
navigation:
  parent: example-setups/example-setups-index.md
title: "Main Network" example
  icon: controller
---

# "Main network" example

Many other facilities will refer to "main network". You may also be wondering how to combine all [devices](../ae2-mechanics/devices.md) into a runnable system. See examples below:

<GameScene zoom="2.5" interactive={true}>
  <ImportStructure src="../assets/assemblies/small_base_network.snbt" />

    <BoxAnnotation color="#33dd33" min="5 1 10" max="9 7 14" thickness="0.05">
A large number of template suppliers and assembly rooms provide a large amount of crafting, stone cutting, and forging template space.
The checkerboard format allows suppliers to use multiple assembly rooms in parallel while maintaining a compact design.
The design of a group of 8 avoids errors in channel path finding.
    </BoxAnnotation>

    <BoxAnnotation color="#33dd33" min="13 10 12" max="14 11 14" thickness="0.05">
You don't really need a controller that big; those huge rings and cubes you see in other people's bases are mostly just for looks.
    </BoxAnnotation>

    <BoxAnnotation color="#33dd33" min="13 12 13" max="14 13 14" thickness="0.05">
Energy units are a standard feature of a good network. They can increase the energy input per game tick and reduce the impact of energy fluctuations.
    </BoxAnnotation>

    <BoxAnnotation color="#33dd33" min="2 1 10" max="4 4 13" thickness="0.05">
It is recommended to use energy sources from other modules, such as reactors, solar panels, generators, etc. The resonance chamber is also sufficient, but AE2 is designed for the integrated package, so it is best to use the main energy source of the base.
    </BoxAnnotation>

    <BoxAnnotation color="#33dd33" min="15 1 9" max="16 3 14" thickness="0.05">
Camouflage panels hide things behind walls.
    </BoxAnnotation>
    <BoxAnnotation color="#33dd33" min="15 3 12" max="16 10 14" thickness="0.05">
Camouflage panels hide things behind walls.
    </BoxAnnotation>

    <BoxAnnotation color="#33dd33" min="13 9 7" max="14 10 9" thickness="0.05">
In fact, there is no need to prepare so many drive slots and storage units for general-purpose storage. A 4k or 16k storage unit that can fill 2 to 4 drives is enough.
    </BoxAnnotation>

    <BoxAnnotation color="#33dd33" min="13 9 10" max="14 11 11" thickness="0.05">
Large storage units filtered for specific items are best suited for bulk storage and need to be placed in a separate high-priority drive group.
    </BoxAnnotation>

    <BoxAnnotation color="#33dd33" min="10 9 13" max="11.7 13 14" thickness="0.05">
Interface-based automatic maintenance of item quantity facilities.
    </BoxAnnotation>

    <BoxAnnotation color="#33dd33" min="6 10 12" max="9 12 15" thickness="0.05">
A logical extension of the charger automation facility to include multiple chargers.
    </BoxAnnotation>

    <BoxAnnotation color="#33dd33" min="2 10 12" max="5 11 15" thickness="0.05">
Another way to automate the processor, this is because the imprinter in 1.20 can automatically eject the product.
    </BoxAnnotation>

    <BoxAnnotation color="#33dd33" min="3 10 10" max="4 12 11" thickness="0.05">
Another way to automate the processor, this is because the imprinter in 1.20 can automatically eject the product.
    </BoxAnnotation>

    <BoxAnnotation color="#33dd33" min="7.2 9.2 8.2" max="7.8 10 8.8" thickness="0.05">
The wireless access point is located in the center due to its spherical range.
    </BoxAnnotation>

    <BoxAnnotation color="#33dd33" min="14 1 2" max="16 5 7" thickness="0.05">
Typically, 1 or 2 high-capacity synthetic CPUs are used for large tasks, and smaller CPUs are used to handle secondary tasks while the high-capacity CPU is working.
    </BoxAnnotation>

    <BoxAnnotation color="#33dd33" min="5 3 6" max="6 4 7" thickness="0.05">
Sometimes subnetworks require more than 8 devices (such as distribution to more than 8 locations), in which case they require separate controllers.
    </BoxAnnotation>

    <BoxAnnotation color="#33dd33" min="7.3 1 3.3" max="9.7 4 6" thickness="0.05">
Seth Quartz Farm.
    </BoxAnnotation>

    <BoxAnnotation color="#33dd33" min="10.3 1 2.3" max="12.7 3.7 5" thickness="0.05">
Water pouring automation.
    </BoxAnnotation>

  <IsometricCamera yaw="135" pitch="15" />
</GameScene>
