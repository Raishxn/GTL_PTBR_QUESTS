---
navigation:
  parent: ae2-mechanics/ae2-mechanics-index.md
title: channel
  icon: controller
---

# channel

App Energy 2's [ME Network](me-network-connections.md) requires channels to support [devices](../ae2-mechanics/devices.md) that use network storage functions or other network services. Think of channels as USB cables that connect all your devices. A single computer only has a limited number of USB ports and can therefore only support a limited number of devices connected to it. Most machines, box-shaped devices, and standard cables can only transmit up to 8 channels. The above equipment and cables can be regarded as a bundle of "8-channel wires". However, [Dense Cables](../items-blocks-machines/cables.md#dense-cable) can support up to 32 channels. Other devices capable of transmitting 32 channels are <ItemLink id="me_p2p_tunnel" /> and [Quantum Bridge](../items-blocks-machines/quantum_bridge.md). A device occupying a channel can be compared to using a channel from the USB "wire" bundle, that is, the "wire" is no longer available downstream of the bundle.

<GameScene zoom="7" interactive={true}>
  <ImportStructure src="../assets/assemblies/channel_demonstration_1.snbt" />

  <LineAnnotation color="#33ff33" from="1 .4 .7" to="2.4 .4 .7" alwaysOnTop={true}/>
  <LineAnnotation color="#33ff33" from="1 .6 .7" to="2.4 .6 .7" alwaysOnTop={true}/>
  <LineAnnotation color="#33ff33" from="1 .4 .6" to="2.6 .4 .6" alwaysOnTop={true}/>
  <LineAnnotation color="#33ff33" from="1 .6 .6" to="2.6 .6 .6" alwaysOnTop={true}/>
  <LineAnnotation color="#33ff33" from="1 .6 .6" to="2.6 .6 .6" alwaysOnTop={true}/>

  <LineAnnotation color="#33ff33" from="2.4 .6 .7" to="2.4 .6 1.5" alwaysOnTop={true}/>
  <LineAnnotation color="#33ff33" from="2.4 .4 .7" to="2.4 .4 1.5" alwaysOnTop={true}/>
  <LineAnnotation color="#33ff33" from="2.6 .6 .6" to="2.6 .6 1.5" alwaysOnTop={true}/>
  <LineAnnotation color="#33ff33" from="2.6 .4 .6" to="2.6 .4 1.5" alwaysOnTop={true}/>

  <LineAnnotation color="#33ff33" from="2.1 .6 1.5" to="2.4 .6 1.5" alwaysOnTop={true}/>
  <LineAnnotation color="#33ff33" from="2.6 .4 1.5" to="2.9 .4 1.5" alwaysOnTop={true}/>

  <LineAnnotation color="#33ff33" from="2.6 .6 1.5" to="2.6 .9 1.5" alwaysOnTop={true}/>
  <LineAnnotation color="#33ff33" from="2.4 .1 1.5" to="2.4 .4 1.5" alwaysOnTop={true}/>

  <LineAnnotation color="#33ff33" from="1 .6 .4" to="3.5 .6 .4" alwaysOnTop={true}/>
  <LineAnnotation color="#33ff33" from="1 .4 .4" to="3.5 .4 .4" alwaysOnTop={true}/>

  <LineAnnotation color="#33ff33" from="3.5 .6 .4" to="3.5 .9 .4" alwaysOnTop={true}/>
  <LineAnnotation color="#33ff33" from="3.5 .1 .4" to="3.5 .4 .4" alwaysOnTop={true}/>

  <LineAnnotation color="#33ff33" from="1 .6 .3" to="1.5 .6 .3" alwaysOnTop={true}/>
  <LineAnnotation color="#33ff33" from="1 .4 .3" to="1.5 .4 .3" alwaysOnTop={true}/>

  <LineAnnotation color="#33ff33" from="1.5 .6 .3" to="1.5 .9 .3" alwaysOnTop={true}/>
  <LineAnnotation color="#33ff33" from="1.5 .1 .3" to="1.5 .4 .3" alwaysOnTop={true}/>

  <LineAnnotation color="#ff3333" from="3.5 .5 .5" to="5.5 .5 .5" alwaysOnTop={true}>
All 8 channels in the cable are occupied, so the drive doesn't get a channel.
  </LineAnnotation>

  <LineAnnotation color="#993333" from="1 .5 .5" to="1.25 .5 .5" alwaysOnTop={true}/>
  <LineAnnotation color="#993333" from="1.5 .5 .5" to="1.75 .5 .5" alwaysOnTop={true}/>
  <LineAnnotation color="#993333" from="2 .5 .5" to="2.25 .5 .5" alwaysOnTop={true}/>
  <LineAnnotation color="#993333" from="2.5 .5 .5" to="2.75 .5 .5" alwaysOnTop={true}/>
  <LineAnnotation color="#993333" from="3 .5 .5" to="3.25 .5 .5" alwaysOnTop={true}/>

  <DiamondAnnotation pos="3.6 0.5 0.5" color="#ff0000">
All 8 channels in the cable are occupied, so the drive doesn't get a channel.
  </DiamondAnnotation>

  <IsometricCamera yaw="15" pitch="30" />
</GameScene>

A good way to check channel occupancy and routing is to use [Smart Cables](../items-blocks-machines/cables.md), which display this information directly.

Each node transmitted by the channel consumes 1/128 AE/t, that is, adding <ItemLink id="controller" /> to a network with 8 devices and 96 nodes can actually reduce energy consumption because the channel allocation method changes.

Note that channel and cable color have nothing to do with each other, cable color only prevents cable connections.

## Channel pathfinding

When using <ItemLink id="controller" />, channel pathfinding is divided into 3 steps. In the first step, follow the shortest path through adjacent machines to the nearest [normal cable](../items-blocks-machines/cables.md) (glass, cladding, smart). The second step is to follow the shortest path through the ordinary cable to the nearest [dense cable](../items-blocks-machines/cables.md) (dense, dense cladding). The third step is to reach <ItemLink id="controller" /> along the shortest path through the dense cable. If the shortest path is fully occupied, some [devices](devices.md) may not be able to obtain the channel normally. You can use dyed cables, cable anchors, P2P channels, etc. to ensure that channel pathfinding meets expectations.

For example, in the example below where some drives are unable to acquire channels due to insufficient cable capacity, the channels will try to follow the shortest path, causing some cables to be overloaded and others left empty.

<GameScene zoom="4" interactive={true}>
  <ImportStructure src="../assets/assemblies/channel_path_length_issue.snbt" />

  <LineAnnotation color="#33ff33" from="3 .5 1.4" to="0.4 0.5 1.4" alwaysOnTop={true} thickness="0.05"/>
  <LineAnnotation color="#33ff33" from="0.4 .5 1.4" to="0.4 0.5 3.6" alwaysOnTop={true} thickness="0.05"/>
  <LineAnnotation color="#33ff33" from="0.4 0.5 3.6" to="1.4 0.5 3.6" alwaysOnTop={true} thickness="0.05"/>
  <LineAnnotation color="#33ff33" from="1.4 0.5 3.6" to="1.4 0.5 5" alwaysOnTop={true} thickness="0.05"/>

  <LineAnnotation color="#33ff33" from="3 0.5 3.6" to="1.6 0.5 3.6" alwaysOnTop={true} thickness="0.05"/>
  <LineAnnotation color="#33ff33" from="1.6 0.5 3.6" to="1.6 0.5 5" alwaysOnTop={true} thickness="0.05"/>

  <LineAnnotation color="#ff3333" from="3 .5 1.6" to="0.6 .5 1.6" alwaysOnTop={true} thickness="0.05"/>
  <LineAnnotation color="#ff3333" from="0.6 .5 1.6" to="0.6 .5 3.4" alwaysOnTop={true} thickness="0.05"/>
  <LineAnnotation color="#ff3333" from="0.6 .5 3.4" to="1.4 .5 3.4" alwaysOnTop={true} thickness="0.05"/>

  <LineAnnotation color="#ff3333" from="3 .5 3.4" to="1.6 .5 3.4" alwaysOnTop={true} thickness="0.05"/>

  <BoxAnnotation color="#dddddd" min="1.2 0.2 3.2" max="1.8 0.8 3.8" alwaysOnTop={true} thickness="0.05">
Trying to transmit more than 8 channels here, so some channel paths are truncated.
  </BoxAnnotation>

  <IsometricCamera yaw="90" pitch="90" />

</GameScene>

This problem can be solved by limiting the channel path. The shape of the network should be tree-shaped (or shrub-shaped). Loops and unclear paths should be avoided.

<GameScene zoom="4" interactive={true}>
  <ImportStructure src="../assets/assemblies/channel_path_length_issue_fix.snbt" />

  <LineAnnotation color="#33ff33" from="3 .5 1.4" to="0.4 0.5 1.4" alwaysOnTop={true} thickness="0.05"/>
  <LineAnnotation color="#33ff33" from="0.4 .5 1.4" to="0.4 0.5 5.6" alwaysOnTop={true} thickness="0.05"/>
  <LineAnnotation color="#33ff33" from="0.4 0.5 5.6" to="1 0.5 5.6" alwaysOnTop={true} thickness="0.05"/>

  <LineAnnotation color="#33ff33" from="3 0.5 3.6" to="1.6 0.5 3.6" alwaysOnTop={true} thickness="0.05"/>
  <LineAnnotation color="#33ff33" from="1.6 0.5 3.6" to="1.6 0.5 5" alwaysOnTop={true} thickness="0.05"/>

  <IsometricCamera yaw="90" pitch="90" />

</GameScene>

## Self-organizing network

A network without <ItemLink id="controller" /> is a self-organizing network and can support up to 8 devices occupying channels. If more than 8 devices occupy the channel, the network will fail. You can remove the device or add <ItemLink id="controller" /> to solve the problem.

Different from a network with a controller, [Smart Cables](../items-blocks-machines/cables.md) in a self-organizing network will display the number of channels occupied by the entire network, rather than the number of channels passing through the cable segment.

Each device in a self-organizing network will occupy 1 channel in the entire network, which is very different from <ItemLink id="controller" />'s behavior of allocating channels along the shortest path.

## design

As mentioned in the previous article [channel routing] (channels.md#channel-routing), it is recommended to design the network into a tree structure: dense cables are led from the controller, ordinary cables are led from the dense cables, and up to 8 [devices] (../ae2-mechanics/devices.md) are connected to the ordinary cables.

Here is a negative example:

Looking along the channel path,

1. After starting from the controller, the first driver encountered behaves the same as an ordinary cable, so the upper limit of channels is locked at 8.
However, there is no smart cable used here, so it is not possible to see how many channels are used. 8 channels remain.
2. The driver occupies 1 channel.
There are 7 channels left.
3. The terminal occupies 2 channels.
5 channels remain.
4. The interface on the right occupies 1 channel.
4 channels remain.
5. The sample provider occupies 1 channel.
3 channels remain.
6. The input bus on the right occupies 1 channel.
2 channels remain.
7. The sample supplier set used to supply the assembly room can only get 2 channels, and the remaining 2 are missing channels.

Overall, the problem mainly lies in the upper limit of the number of locked channels and the failure to consider the channel allocation method.

<GameScene zoom="4" interactive={true}>
  <ImportStructure src="../assets/assemblies/bad_network_structure.snbt" />

<LineAnnotation color="#33ff33" from="6.5 .5 1.5" to="6 .5 1.5" alwaysOnTop={true} thickness="0.4">
32 channels
</LineAnnotation>

<LineAnnotation color="#33ff33" from="6 .5 1.5" to="5.5 .5 1.5" alwaysOnTop={true} thickness="0.2">
8 channels
</LineAnnotation>

<LineAnnotation color="#33ff33" from="5.5 .5 1.5" to="5.5 1.5 1.5" alwaysOnTop={true} thickness="0.1">
2 channels
</LineAnnotation>

<LineAnnotation color="#33ff33" from="5.5 .5 1.5" to="5.5 .3 1.5" alwaysOnTop={true} thickness="0.071">
1 channel
</LineAnnotation>

<LineAnnotation color="#33ff33" from="5.5 1.5 1.5" to="5.5 2.5 1.5" alwaysOnTop={true} thickness="0.071">
1 channel
</LineAnnotation>

<LineAnnotation color="#33ff33" from="5.5 2.5 1.5" to="5.5 2.5 1.1" alwaysOnTop={true} thickness="0.071">
1 channel
</LineAnnotation>

<LineAnnotation color="#33ff33" from="5.5 .5 1.5" to="4.5 .5 1.5" alwaysOnTop={true} thickness="0.158">
5 channels
</LineAnnotation>

<LineAnnotation color="#33ff33" from="4.5 .5 1.5" to="4.5 .3 1.5" alwaysOnTop={true} thickness="0.071">
1 channel
</LineAnnotation>

<LineAnnotation color="#33ff33" from="4.5 .5 1.5" to="4.5 1.5 1.5" alwaysOnTop={true} thickness="0.071">
1 channel
</LineAnnotation>

<LineAnnotation color="#33ff33" from="4.5 .5 1.5" to="3.5 .5 1.5" alwaysOnTop={true} thickness="0.122">
3 channels
</LineAnnotation>

<LineAnnotation color="#33ff33" from="3.5 .5 1.5" to="3.5 2.5 1.5" alwaysOnTop={true} thickness="0.071">
1 channel
</LineAnnotation>

<LineAnnotation color="#33ff33" from="3.5 2.5 1.5" to="3.7 2.5 1.5" alwaysOnTop={true} thickness="0.071">
1 channel
</LineAnnotation>

<LineAnnotation color="#33ff33" from="3.5 .5 1.5" to="1.5 .5 1.5" alwaysOnTop={true} thickness="0.1">
2 channels
</LineAnnotation>

<LineAnnotation color="#33ff33" from="1.5 0.5 1.5" to="1.5 0.3 1.5" alwaysOnTop={true} thickness="0.071">
1 channel
</LineAnnotation>

<LineAnnotation color="#33ff33" from="1.5 0.5 1.5" to="0.5 0.5 1.5" alwaysOnTop={true} thickness="0.071">
1 channel
</LineAnnotation>

<LineAnnotation color="#33ff33" from="0.5 0.5 1.5" to="0.5 0.5 0.5" alwaysOnTop={true} thickness="0.071">
1 channel
</LineAnnotation>

<LineAnnotation color="#ff3333" from="0.5 1.5 1.5" to="0.5 1.3 1.5" alwaysOnTop={true} thickness="0.071">
No channel
</LineAnnotation>

<LineAnnotation color="#ff3333" from="1.5 1.5 0.5" to="1.5 1.3 0.5" alwaysOnTop={true} thickness="0.071">
No channel
</LineAnnotation>

  <IsometricCamera yaw="195" pitch="30" />
</GameScene>

---

Give another positive example:

<GameScene zoom="2.5" interactive={true}>
  <ImportStructure src="../assets/assemblies/treelike_network_structure.snbt" />

    <BoxAnnotation color="#dddddd" min="6.9 0 4.9" max="9.1 4 7.1" thickness="0.05">
Note that the sample providers come in sets of 8.
    </BoxAnnotation>

    <BoxAnnotation color="#dddddd" min="5 4 4" max="8 5 5" thickness="0.05">
Dense cables are required at the joint between two channels that are fully occupied by ordinary cables.
    </BoxAnnotation>

    <BoxAnnotation color="#dddddd" min="5 0 13" max="8 1 14" thickness="0.05">
Different cable colors prevent adjacent cables from connecting to each other.
    </BoxAnnotation>


  <IsometricCamera yaw="315" pitch="30" />
</GameScene>

## Channel mode

Minecraft 1.18 version of AE2 10.0.0 introduces new options to change the behavior of AE2 channels. There are new options (`channels`) to control in the general section of the configuration file, and administrators can also use in-game commands to change modes directly in the game. The change command is `/ae2 channelmode <模式>`, and the command to display the current mode is `/ae2 channelmode`. If the mode change is made in-game, all networks will reset and immediately switch to the new mode.

This reintroduces and improves the options from Minecraft 1.12; making it a better option for players who want a slightly more relaxed gaming experience but don't want to completely remove the channel mechanic.

The list of modes available in configuration files and commands is as follows.

| Settings | Description |
| ---------- | ------------------------------------------------------------------------------------------------------------- |
| `default` | This guide describes standard channel capacities for cables and ad hoc networks |
| `x2` | All channel capacity doubled (16 for ordinary cables, 64 for dense cables, 16 for self-organizing network) |
| `x3` | Triple the capacity of all channels (24 common cables, 96 dense cables, 24 self-organizing networks) |
| `x4` | All channel capacity quadruples (32 for ordinary cables, 128 for dense cables, 32 for self-organizing networks) |
| `infinite` | Removes all channel restrictions. The controller still reduces energy consumption *significantly*. At this time, the smart cable has only two states: completely closed (no channel is transmitted) and fully open (several channels are transmitted). |