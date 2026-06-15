---
navigation:
  parent: example-setups/example-setups-index.md
title: Processor Automation
  icon: logic_processor
---

# Automated production processor

There are many ways to automate [Processors](../items-blocks-machines/processors.md), one of which is as follows.

This general design can also be completed with any kind of logistics pipes, conduits, pipes or other similar things with different names, which only require that these pipes can be equipped with filtration.

![Flowchart](../assets/diagrams/processor_flow_diagram.png)

The following are implementation details using only AE2, using the ["pipe" subnet](pipe-subnet.md).

Please note that this facility uses <ItemLink id="pattern_provider" />, which means it needs to be used in conjunction with your [Automatic Synthesis](../ae2-mechanics/autocrafting.md) facility. If a separate automated processor is required, the pattern feeder should be replaced with a barrel and the material placed directly into the barrel above.

This design can also be used in previous AE2 versions, because even if <ItemLink id="inscriber" /> is face-sensitive, the pipeline subnetwork can still input or output the correct face.

## Lessons from Boilerplate Coding

Often, the required [template](../items-blocks-machines/patterns.md) does not match the one seen in JEI, or the recipe output when the + button is pressed. In the case of this section, JEI will output 2 templates, one for manufacturing the circuit board and the other for the final assembly steps, and the first template will contain a [press template](../items-blocks-machines/presses.md). Clearly not what we needed and it doesn't fit the functionality of the facility. What we need is a sample, input raw materials and then output the printed processor. While the imprint template is already in the imprinter, the template should not contain it.

---

<GameScene zoom="4" interactive={true}>
  <ImportStructure src="../assets/assemblies/processor_automation.snbt" />

  <BoxAnnotation color="#dddddd" min="5 1 0" max="6 2 1" thickness=".05">
(1) Template provider: Default configuration, equipped with relevant processing templates.

        <Row>
![Logic template](../assets/diagrams/logic_pattern_small.png)
![Calculation template](../assets/diagrams/calculation_pattern_small.png)
![Engineering Pattern](../assets/diagrams/engineering_pattern_small.png)
        </Row>
  </BoxAnnotation>

  <BoxAnnotation color="#dddddd" min="4.7 2 0" max="5 3 1" thickness=".05">
(2) Storage bus #1: Default configuration.
  </BoxAnnotation>

  <BoxAnnotation color="#dddddd" min="4 1 0" max="4.3 2 1" thickness=".05">
(3) Output bus #1: filter silicon, equipped with 2 accelerator cards.
        <Row><ItemImage id="silicon" scale="2" /> <ItemImage id="speed_card" scale="2" /></Row>
  </BoxAnnotation>

  <BoxAnnotation color="#dddddd" min="4 4 0" max="4.3 3 1" thickness=".05">
(4) Output bus #2: Filter gold ingot, equipped with 2 accelerator cards.
        <Row><ItemImage id="minecraft:gold_ingot" scale="2" /> <ItemImage id="speed_card" scale="2" /></Row>
  </BoxAnnotation>

  <BoxAnnotation color="#dddddd" min="4 5 0" max="4.3 4 1" thickness=".05">
(5) Output bus #3: filtered by Sethus quartz crystal, equipped with 2 accelerator cards.
        <Row><ItemImage id="certus_quartz_crystal" scale="2" /> <ItemImage id="speed_card" scale="2" /></Row>
  </BoxAnnotation>

  <BoxAnnotation color="#dddddd" min="4 6 0" max="4.3 5 1" thickness=".05">
(6) Output bus #4: filter diamond, equipped with 2 accelerator cards.
        <Row><ItemImage id="minecraft:diamond" scale="2" /> <ItemImage id="speed_card" scale="2" /></Row>
  </BoxAnnotation>

  <BoxAnnotation color="#dddddd" min="2.3 3 0" max="2 2 1" thickness=".05">
(7) Output bus #5: Filtered redstone powder, equipped with 2 accelerator cards.
        <Row><ItemImage id="minecraft:redstone" scale="2" /> <ItemImage id="speed_card" scale="2" /></Row>
  </BoxAnnotation>

  <BoxAnnotation color="#dddddd" min="4 1 0" max="3 2 1" thickness=".05">
(8) Imprinter #1: Default configuration. Comes with silicon imprinted template and 4 accelerator cards.
        <Row><ItemImage id="silicon_press" scale="2" /> <ItemImage id="speed_card" scale="2" /></Row>
  </BoxAnnotation>

  <BoxAnnotation color="#dddddd" min="4 3 0" max="3 4 1" thickness=".05">
(9) Imprinter #2: Default configuration. Comes with logic imprint template and 4 accelerator cards.
        <Row><ItemImage id="logic_processor_press" scale="2" /> <ItemImage id="speed_card" scale="2" /></Row>
  </BoxAnnotation>

  <BoxAnnotation color="#dddddd" min="4 4 0" max="3 5 1" thickness=".05">
(10) Imprinter #3: Default configuration. Comes with calculation imprint template and 4 accelerator cards.
        <Row><ItemImage id="calculation_processor_press" scale="2" /> <ItemImage id="speed_card" scale="2" /></Row>
  </BoxAnnotation>

  <BoxAnnotation color="#dddddd" min="4 5 0" max="3 6 1" thickness=".05">
(11) Imprinter #4: Default configuration. Comes with engineering stamping template and 4 accelerator cards.
        <Row><ItemImage id="engineering_processor_press" scale="2" /> <ItemImage id="speed_card" scale="2" /></Row>
  </BoxAnnotation>

  <BoxAnnotation color="#dddddd" min="2 2 0" max="1 3 1" thickness=".05">
(12) Imprinter #5: Default configuration. Equipped with 4 accelerator cards.
        <ItemImage id="speed_card" scale="2" />
  </BoxAnnotation>

  <BoxAnnotation color="#dddddd" min="2.7 2 0" max="3 1 1" thickness=".05">
(13) Input bus #1: Default configuration, equipped with 2 accelerator cards.
        <ItemImage id="speed_card" scale="2" />
  </BoxAnnotation>

  <BoxAnnotation color="#dddddd" min="2.7 4 0" max="3 3 1" thickness=".05">
(14) Input bus #2: Default configuration, equipped with 2 accelerator cards.
        <ItemImage id="speed_card" scale="2" />
  </BoxAnnotation>

  <BoxAnnotation color="#dddddd" min="2.7 5 0" max="3 4 1" thickness=".05">
(15) Input bus #3: Default configuration, equipped with 2 accelerator cards.
        <ItemImage id="speed_card" scale="2" />
  </BoxAnnotation>

  <BoxAnnotation color="#dddddd" min="2.7 6 0" max="3 5 1" thickness=".05">
(16) Input bus #4: Default configuration, equipped with 2 accelerator cards.
        <ItemImage id="speed_card" scale="2" />
  </BoxAnnotation>

  <BoxAnnotation color="#dddddd" min="2 3 0" max="1 3.3 1" thickness=".05">
(17) Storage bus #2: Default configuration.
  </BoxAnnotation>

  <BoxAnnotation color="#dddddd" min="2 1.7 0" max="1 2 1" thickness=".05">
(18) Storage bus #3: Default configuration.
  </BoxAnnotation>

  <BoxAnnotation color="#dddddd" min="1 2 0" max="0.7 3 1" thickness=".05">
(19) Input bus #5: Default configuration, equipped with 2 accelerator cards.
        <ItemImage id="speed_card" scale="2" />
  </BoxAnnotation>

  <BoxAnnotation color="#dddddd" min="5 0.7 0" max="6 1 1" thickness=".05">
(20) Storage bus #4: Default configuration.
  </BoxAnnotation>

<BoxAnnotation color="#dddddd" min="3.3 2.7 0.3" max="3.7 3 0.7" thickness=".05">
Quartz fiber can power all three imprinters, which function like cables and can transmit energy.
  </BoxAnnotation>

<DiamondAnnotation pos="7 1.5 0.5" color="#00ff00">
to main network
    </DiamondAnnotation>

  <IsometricCamera yaw="185" pitch="5" />
</GameScene>

## Configuration

* <ItemLink id="pattern_provider" />(1) is in default configuration with corresponding <ItemLink id="processing_pattern" /> installed.
Note that such templates need to be processed directly from raw materials into complete processors and **should** not contain [press templates](../items-blocks-machines/presses.md).

![Logic Pattern](../assets/diagrams/logic_pattern.png)
![Calculation Pattern](../assets/diagrams/calculation_pattern.png)
![Engineering Pattern](../assets/diagrams/engineering_pattern.png)

* <ItemLink id="storage_bus" /> (2, 17, 18, 20) are in default configuration.
* <ItemLink id="export_bus" /> (3-7) is set to filter corresponding materials. Both contain 2 sheets of <ItemLink id="speed_card" />.
    <Row>
      <ItemImage id="silicon" scale="2" />
      <ItemImage id="minecraft:gold_ingot" scale="2" />
      <ItemImage id="certus_quartz_crystal" scale="2" />
      <ItemImage id="minecraft:diamond" scale="2" />
      <ItemImage id="minecraft:redstone" scale="2" />
    </Row>
* <ItemLink id="import_bus" /> (13-16, 19) are in default configuration. Both contain 2 sheets of <ItemLink id="speed_card" />.
* <ItemLink id="inscriber" /> is in default configuration. Equipped with the corresponding [pressing template](../items-blocks-machines/presses.md) and 4 sheets of <ItemLink id="speed_card" />.
   <Row>
     <ItemImage id="silicon_press" scale="2" />
     <ItemImage id="logic_processor_press" scale="2" />
     <ItemImage id="calculation_processor_press" scale="2" />
     <ItemImage id="engineering_processor_press" scale="2" />
   </Row>

## Working principle

1. <ItemLink id="pattern_provider" /> Store materials in wooden barrels.
2. The first [Pipe Subnet] (pipe-subnet.md) (orange) extracts silicon, redstone powder, and the materials of the corresponding imprinter (gold ingots, Sethus quartz crystal, diamonds) from the barrel and stores them in the corresponding <ItemLink id="inscriber" />.
3. The first four <ItemLink id="inscriber" /> make <ItemLink id="printed_silicon" />, <ItemLink id="printed_logic_processor" />, <ItemLink id="printed_calculation_processor" />, and <ItemLink id="printed_engineering_processor" />.
4. The second and third [pipe-subnet.md] (green) take the circuit boards and silicon boards out of the first four <ItemLink id="inscriber" /> and put them into the fifth and final process <ItemLink id="inscriber" />.
5. The fifth <ItemLink id="inscriber" /> assembly [processor](../items-blocks-machines/processors.md).
6. The fourth [pipe-subnet.md] (purple) feeds the processor to the template provider and back to the main network.