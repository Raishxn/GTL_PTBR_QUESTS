---
navigation:
  parent: items-blocks-machines/items-blocks-machines-index.md
title: processor
  icon: logic_processor
  position: 010
categories:
- misc ingredients blocks
item_ids:
- ae2:logic_processor
- ae2:calculation_processor
- ae2:engineering_processor
- ae2:printed_silicon
- ae2:printed_logic_processor
- ae2:printed_calculation_processor
- ae2:printed_engineering_processor
- ae2:silicon
---

# processor

<Row>
  <ItemImage id="logic_processor" scale="4" />

  <ItemImage id="calculation_processor" scale="4" />

  <ItemImage id="engineering_processor" scale="4" />
</Row>

The processor is one of the basic building blocks of AE2[devices](../ae2-mechanics/devices.md) and machines. They are also your first big automation challenges. There are three processors, made of gold, <ItemLink id="certus_quartz_crystal" />, and diamond. Can be crafted in <ItemLink id="inscriber" /> with [presses.md] and via a multi-step synthesis process (usually via a series of presses and pipes with filters).

## Production steps

<Column gap="5">

1. Collect/manufacture required materials: silicon, red stone, gold, <ItemLink id="certus_quartz_crystal" />, diamond.

  <RecipeFor id="silicon" />

  <br />

2. Imprint the intermediate product circuit board

  <Row>
    <RecipeFor id="printed_silicon" />

    <RecipeFor id="printed_logic_processor" />
  </Row>

  <Row>
    <RecipeFor id="printed_calculation_processor" />

    <RecipeFor id="printed_engineering_processor" />
  </Row>

  <br />

3. Final assembly steps

  <Row>
    <RecipeFor id="logic_processor" />

    <RecipeFor id="calculation_processor" />
  </Row>

  <RecipeFor id="engineering_processor" />
</Column>
