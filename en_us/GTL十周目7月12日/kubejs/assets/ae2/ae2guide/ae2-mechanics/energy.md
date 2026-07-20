---
navigation:
  parent: ae2-mechanics/ae2-mechanics-index.md
title: energy
  icon: energy_cell
---

# energy

Networks require energy to function. There is an energy library in the network, [Device](../ae2-mechanics/devices.md) can directly obtain energy from it, and <ItemLink id="vibration_chamber" />, <ItemLink id="energy_acceptor" /> (and <ItemLink id="controller" />) can input energy into it. Hold <ItemLink id="network_tool" /> and right-click anywhere on the network or right-click the controller of the network to view energy statistics. This network-wide storage and distribution means that there is no upper limit to the speed of energy transmission. Devices can consume as much energy as they want, and energy receivers can receive energy at nearly unlimited speeds. The only limit is the capacity of the energy storage.

## Receive energy

<Row>
  <BlockImage id="energy_acceptor" scale="4" />

  <GameScene zoom="4" background="transparent">
  <ImportStructure src="../assets/blocks/cable_energy_acceptor.snbt" />
  </GameScene>

  <BlockImage id="controller" p:state="online" scale="4" />

  <BlockImage id="vibration_chamber" p:active="true" scale="4" />
</Row>

AE2 does not use Forge Energy (Forge side) or TechReborn Energy (Fabric side) internally, but converts them into its own unit, AE. This conversion is one-way. Energy conversion can be done via <ItemLink id="energy_acceptor" /> and <ItemLink id="controller" />, but it is better to provide [channels](../ae2-mechanics/channels.md) on all sides of the controller. You can also use <ItemLink id="vibration_chamber" /> to produce energy, but AE2 still works better with technology modules that have stronger production capabilities.

This shows that when laying out base energy infrastructure, it is more recommended to treat the AE2 network as an entire multi-block structure.

The conversion ratio between Forge Energy and Techreborn Energy is:

*   2 FE = 1 AE（Forge）
*   1 E  = 2 AE（Fabric）

## Energy Storage

<Row>
  <BlockImage id="energy_cell" scale="4" p:fullness="4" />

  <BlockImage id="dense_energy_cell" scale="4" p:fullness="4" />

  <BlockImage id="creative_energy_cell" scale="4" />
</Row>

For obvious reasons, a network cannot consume or receive more energy than its energy capacity in a single game moment. If a network can only store 800AE, each of its [devices](../ae2-mechanics/devices.md) cannot use more than 800AE energy (even if the energy is full), and the energy receiver cannot receive more than 800AE energy (even if the energy is empty) per game moment.

This also explains some of the network's strange behavior. For example, someone built a small network of just energy receivers, drives, terminals, and some equipment, and then put an entire inventory of cobblestone into it. The energy required to place all cobblestones simultaneously in a single game tick exceeds the network's energy capacity, so only a portion of the cobblestones can be deposited, and the network will run out of energy and restart.

**Energy components can be added to solve the above problems. **

Each cable, device, and component in the network has its own energy buffer of 25AE.

<ItemLink id="controller" /> has a small amount of energy cache: 8000AE.

<ItemLink id="energy_cell" /> can store 200kAE, which can easily handle the energy spikes of ordinary networks; usually, one per network is enough.

<ItemLink id="dense_energy_cell" /> can store 1.6MAE, which is suitable for running the network without energy supply and processing huge instantaneous energy consumption of large [spatial storage](spatial-io.md).

<ItemLink id="creative_energy_cell" /> is a creative mode item used for testing and provides none! limit! able! quantity!
