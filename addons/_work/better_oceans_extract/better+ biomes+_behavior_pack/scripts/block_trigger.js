import { system, world, BlockPermutation, Direction } from '@minecraft/server';
import { decrementStack, getOppositeDirection, DirectionType, cardinalSides, randomFunction, shouldConnect, safeUpdateStairShape } from './utils/helper';
import { directionToVector3 } from './utils/math';

system.beforeEvents.startup.subscribe(initEvent => {
  initEvent.blockComponentRegistry.registerCustomComponent('pa_ant_housep:trigger', {
  onPlayerBreak: e => { e.player.runCommand("function summonant1");
e.player.runCommand("function summonant2"); },
onTick: e => { const { x, y, z } = e.block.location;
e.dimension.runCommand(`execute positioned ${x} ${y} ${z} run function summonant1`);
e.dimension.runCommand(`execute positioned ${x} ${y} ${z} run function summonant2`); },
onPlace: e => { const { x, y, z } = e.block.location; },
onRandomTick: e => { const { x, y, z } = e.block.location;
e.dimension.runCommand(`execute positioned ${x} ${y} ${z} run function summonant1`);
e.dimension.runCommand(`execute positioned ${x} ${y} ${z} run function summonant2`); },
});

initEvent.blockComponentRegistry.registerCustomComponent('pa_ant_house:trigger', {
  onPlayerBreak: e => { const equippable = e.player.getComponent("minecraft:equippable");
    if (!equippable) return;

    const mainhand = equippable.getEquipmentSlot("Mainhand");
    if (!mainhand.hasItem()) return;

    const itemTags = mainhand.getTags();
    const toolTags = ["minecraft:is_pickaxe"];

    if (toolTags.length > 0 && !itemTags.some(item => toolTags.includes(item))) return;
    
    e.dimension.runCommand(`execute positioned ${x} ${y} ${z} run loot spawn ~~~ loot "blocks/pa_ant_house"`);
e.player.runCommand("function summonant1");
e.player.runCommand("function summonant2"); },
onTick: e => { const { x, y, z } = e.block.location;
e.dimension.runCommand(`execute positioned ${x} ${y} ${z} run function summonant1`);
e.dimension.runCommand(`execute positioned ${x} ${y} ${z} run function summonant2`); },
onPlace: e => { const { x, y, z } = e.block.location; },
onRandomTick: e => { const { x, y, z } = e.block.location;
e.dimension.runCommand(`execute positioned ${x} ${y} ${z} run function summonant1`);
e.dimension.runCommand(`execute positioned ${x} ${y} ${z} run function summonant2`); },
onPlayerInteract: e => { e.player.runCommand("function summonant1");
e.player.runCommand("function summonant2"); },
onEntityFallOn: e => { e.entity.runCommand("function summonant1");
e.entity.runCommand("function summonant2"); },
});

initEvent.blockComponentRegistry.registerCustomComponent('pa_big_hirch_sapling:trigger', {
  onPlayerBreak: e => { const equippable = e.player.getComponent("minecraft:equippable");
    if (!equippable) return;

    const mainhand = equippable.getEquipmentSlot("Mainhand");
    if (!mainhand.hasItem()) return;

    const itemTags = mainhand.getTags();
    const toolTags = ["minecraft:is_pickaxe"];

    if (toolTags.length > 0 && !itemTags.some(item => toolTags.includes(item))) return;
    
    e.dimension.runCommand(`execute positioned ${x} ${y} ${z} run loot spawn ~~~ loot "blocks/pa_big_hirch_sapling"`); },
onPlace: e => { const { x, y, z } = e.block.location; },
onRandomTick: e => { const { x, y, z } = e.block.location;
const { block, dimension } = e;

block.setType('minecraft:air');
dimension.placeFeature("pa:mega_spruce_tree_feateneurewjwjjwjwkweeedd", block.location);
 },
onPlayerInteract: e => { const { block, dimension, player } = e;

if (!player) return;

const equippable = player.getComponent("minecraft:equippable");
if (!equippable) return;

const mainhand = equippable.getEquipmentSlot("Mainhand");
if (!mainhand.hasItem() || mainhand.typeId !== "minecraft:bone_meal")
    return;

if (mainhand.amount > 1) mainhand.amount--;
else mainhand.setItem(undefined);

block.setType('minecraft:air');
dimension.placeFeature("pa:mega_spruce_tree_feateneurewjwjjwjwkweeedd", block.location);

const effectLocation = block.center();
dimension.playSound("item.bone_meal.use", effectLocation);
dimension.spawnParticle(
    "minecraft:crop_growth_emitter",
    effectLocation
);
 },
});

initEvent.blockComponentRegistry.registerCustomComponent('pa_blue_mushroom_block:trigger', {
  onPlace: e => { const { x, y, z } = e.block.location; },
});

initEvent.blockComponentRegistry.registerCustomComponent('pa_blue_mushroom_log:trigger', {
  onPlace: e => { const { x, y, z } = e.block.location; },
});

initEvent.blockComponentRegistry.registerCustomComponent('pa_buddydirtblock:trigger', {
  onPlayerBreak: e => { const equippable = e.player.getComponent("minecraft:equippable");
    if (!equippable) return;

    const mainhand = equippable.getEquipmentSlot("Mainhand");
    if (!mainhand.hasItem()) return;

    const itemTags = mainhand.getTags();
    const toolTags = ["minecraft:is_pickaxe"];

    if (toolTags.length > 0 && !itemTags.some(item => toolTags.includes(item))) return;
    
    e.dimension.runCommand(`execute positioned ${x} ${y} ${z} run loot spawn ~~~ loot "blocks/pa_buddydirtblock"`); },
onPlace: e => { const { x, y, z } = e.block.location; },
});

initEvent.blockComponentRegistry.registerCustomComponent('pa_blue_mushroom_sapling:trigger', {
  onPlayerBreak: e => { const equippable = e.player.getComponent("minecraft:equippable");
    if (!equippable) return;

    const mainhand = equippable.getEquipmentSlot("Mainhand");
    if (!mainhand.hasItem()) return;

    const itemTags = mainhand.getTags();
    const toolTags = ["minecraft:is_pickaxe"];

    if (toolTags.length > 0 && !itemTags.some(item => toolTags.includes(item))) return;
    
    e.dimension.runCommand(`execute positioned ${x} ${y} ${z} run loot spawn ~~~ loot "blocks/pa_blue_mushroom_sapling"`); },
onPlace: e => { const { x, y, z } = e.block.location; },
onRandomTick: e => { const { x, y, z } = e.block.location;
const { block, dimension } = e;

block.setType('minecraft:air');
dimension.placeFeature("pa:savanna_tree_featureb47ea94888b94d9997b340a1e40afbd6", block.location);
 },
onPlayerInteract: e => { const { block, dimension, player } = e;

if (!player) return;

const equippable = player.getComponent("minecraft:equippable");
if (!equippable) return;

const mainhand = equippable.getEquipmentSlot("Mainhand");
if (!mainhand.hasItem() || mainhand.typeId !== "minecraft:bone_meal")
    return;

if (mainhand.amount > 1) mainhand.amount--;
else mainhand.setItem(undefined);

block.setType('minecraft:air');
dimension.placeFeature("pa:savanna_tree_featureb47ea94888b94d9997b340a1e40afbd6", block.location);

const effectLocation = block.center();
dimension.playSound("item.bone_meal.use", effectLocation);
dimension.spawnParticle(
    "minecraft:crop_growth_emitter",
    effectLocation
);
 },
});

initEvent.blockComponentRegistry.registerCustomComponent('pa_coconutblockblock:trigger', {
  onPlace: e => { const { x, y, z } = e.block.location; },
});

initEvent.blockComponentRegistry.registerCustomComponent('pa_coconut_tree_sapling:trigger', {
  onPlace: e => { const { x, y, z } = e.block.location; },
onRandomTick: e => { const { x, y, z } = e.block.location;
const { block, dimension } = e;

block.setType('minecraft:air');
dimension.placeFeature("pa:coconut_tree", block.location);
 },
onPlayerInteract: e => { const { block, dimension, player } = e;

if (!player) return;

const equippable = player.getComponent("minecraft:equippable");
if (!equippable) return;

const mainhand = equippable.getEquipmentSlot("Mainhand");
if (!mainhand.hasItem() || mainhand.typeId !== "minecraft:bone_meal")
    return;

if (mainhand.amount > 1) mainhand.amount--;
else mainhand.setItem(undefined);

block.setType('minecraft:air');
dimension.placeFeature("pa:coconut_tree", block.location);

const effectLocation = block.center();
dimension.playSound("item.bone_meal.use", effectLocation);
dimension.spawnParticle(
    "minecraft:crop_growth_emitter",
    effectLocation
);
 },
});

initEvent.blockComponentRegistry.registerCustomComponent('pa_dogwood_planks_slab:trigger', {
  onPlace: e => { const { x, y, z } = e.block.location; },
beforeOnPlayerPlace: e => { let playerEquipment = e.player.getComponent('equippable').getEquipment('Mainhand');
if (playerEquipment === undefined) return;

let face = getOppositeDirection(e.face);
let blockToCheck = e.block.offset(directionToVector3(face));

const blockStateDouble = 'pa:is_double';
const blockStateHalf = 'minecraft:vertical_half';

if (blockToCheck.permutation.getState(blockStateDouble)) return;
if (blockToCheck.typeId !== playerEquipment.typeId) return;

if (face === 'Up' || face === 'Down') {
  const state = blockToCheck.permutation.getState(blockStateHalf);
  if ((face === 'Up' && state === 'top') || (face === 'Down' && state === 'bottom')) {
    e.cancel = true;

    system.run(() => {
      blockToCheck.dimension.playSound("use.stone", blockToCheck.location, { pitch: 0.8, volume: 1.0 });

      blockToCheck.setPermutation(BlockPermutation.resolve(blockToCheck.typeId, { [blockStateDouble]: true }));

      decrementStack(e.player);
    });
  }
}
 },
});

initEvent.blockComponentRegistry.registerCustomComponent('pa_dogwood_planks_stair:trigger', {
  onPlace: e => { const { x, y, z } = e.block.location;
e.dimension.playSound("normal", e.block.location, { pitch: 0.8, volume: 1.0 }); },
beforeOnPlayerPlace: e => { let face = e.permutationToPlace.getState('minecraft:cardinal_direction');
let half = e.permutationToPlace.getState('minecraft:vertical_half');
let blockPermutation = e.permutationToPlace;
let blockToCheck;

switch (face) {
  case 'north':
    {
      for (const direction of DirectionType.HORIZONTAL) {
        blockToCheck = e.block.offset(directionToVector3(direction));
        if (blockToCheck.typeId !== blockPermutation.type.id) continue;

        const blockToCheckHalf = blockToCheck.permutation.getState('minecraft:vertical_half');
        if (blockToCheckHalf !== half) continue;

        const blockToCheckDirection = blockToCheck.permutation.getState('minecraft:cardinal_direction');

        switch (direction) {
          case Direction.North:
            if (blockToCheckDirection === 'west') blockPermutation = blockPermutation.withState('pa:shape', 'outer_left');
            if (blockToCheckDirection === 'east') blockPermutation = blockPermutation.withState('pa:shape', 'outer_right');
            break;
          case Direction.South:
            if (blockToCheckDirection === 'east') blockPermutation = blockPermutation.withState('pa:shape', 'inner_left');
            if (blockToCheckDirection === 'west') blockPermutation = blockPermutation.withState('pa:shape', 'inner_right');
            break;
          case Direction.East:
            if (blockToCheckDirection === 'east') safeUpdateStairShape(blockToCheck, 'inner_right');;
            if (blockToCheckDirection === 'west') safeUpdateStairShape(blockToCheck, 'outer_right');
            break;
          case Direction.West:
            if (blockToCheckDirection === 'west') safeUpdateStairShape(blockToCheck, 'inner_left');
            if (blockToCheckDirection === 'east') safeUpdateStairShape(blockToCheck, 'outer_left');
            break;
          default:
            break;
        }
      }
    }
    break;
  case 'south':
    {
      blockPermutation = blockPermutation.withState('pa:south', true);
      for (const direction of DirectionType.HORIZONTAL) {
        blockToCheck = e.block.offset(directionToVector3(direction));
        if (blockToCheck.typeId !== blockPermutation.type.id) continue;

        const blockToCheckHalf = blockToCheck.permutation.getState('minecraft:vertical_half');
        if (blockToCheckHalf !== half) continue;

        const blockToCheckDirection = blockToCheck.permutation.getState('minecraft:cardinal_direction');

        switch (direction) {
          case Direction.North:
            if (blockToCheckDirection === 'west') blockPermutation = blockPermutation.withState('pa:shape', 'inner_left');
            if (blockToCheckDirection === 'east') blockPermutation = blockPermutation.withState('pa:shape', 'inner_right');
            break;
          case Direction.South:
            if (blockToCheckDirection === 'east') blockPermutation = blockPermutation.withState('pa:shape', 'outer_left');
            if (blockToCheckDirection === 'west') blockPermutation = blockPermutation.withState('pa:shape', 'outer_right');
            break;
          case Direction.East:
            if (blockToCheckDirection === 'east') safeUpdateStairShape(blockToCheck, 'inner_left');
            if (blockToCheckDirection === 'west') safeUpdateStairShape(blockToCheck, 'outer_left');
            break;
          case Direction.West:
            if (blockToCheckDirection === 'west') safeUpdateStairShape(blockToCheck, 'inner_right');
            if (blockToCheckDirection === 'east') safeUpdateStairShape(blockToCheck, 'outer_right');
            break;
          default:
            break;
        }
      }
    }
    break;
  case 'east':
    {
      for (const direction of DirectionType.HORIZONTAL) {
        blockToCheck = e.block.offset(directionToVector3(direction));
        if (blockToCheck.typeId !== blockPermutation.type.id) continue;

        const blockToCheckHalf = blockToCheck.permutation.getState('minecraft:vertical_half');
        if (blockToCheckHalf !== half) continue;

        const blockToCheckDirection = blockToCheck.permutation.getState('minecraft:cardinal_direction');

        switch (direction) {
          case Direction.East:
            if (blockToCheckDirection === 'north') blockPermutation = blockPermutation.withState('pa:shape', 'outer_left');
            if (blockToCheckDirection === 'south') blockPermutation = blockPermutation.withState('pa:shape', 'outer_right');
            break;
          case Direction.West:
            if (blockToCheckDirection === 'south') blockPermutation = blockPermutation.withState('pa:shape', 'inner_left');
            if (blockToCheckDirection === 'north') blockPermutation = blockPermutation.withState('pa:shape', 'inner_right');
            break;
          case Direction.North:
            if (blockToCheckDirection === 'north') safeUpdateStairShape(blockToCheck, 'inner_left');
            if (blockToCheckDirection === 'south') safeUpdateStairShape(blockToCheck, 'outer_left');
            break;
          case Direction.South:
            if (blockToCheckDirection === 'north') safeUpdateStairShape(blockToCheck, 'outer_right');
            if (blockToCheckDirection === 'south') safeUpdateStairShape(blockToCheck, 'inner_right');
            break;
          default:
            break;
        }
      }
    }
    break;
  case 'west':
    {
      for (const direction of DirectionType.HORIZONTAL) {
        blockToCheck = e.block.offset(directionToVector3(direction));
        if (blockToCheck.typeId !== blockPermutation.type.id) continue;

        const blockToCheckHalf = blockToCheck.permutation.getState('minecraft:vertical_half');
        if (blockToCheckHalf !== half) continue;

        const blockToCheckDirection = blockToCheck.permutation.getState('minecraft:cardinal_direction');

        switch (direction) {
          case Direction.East:
            if (blockToCheckDirection === 'north') blockPermutation = blockPermutation.withState('pa:shape', 'inner_left');
            if (blockToCheckDirection === 'south') blockPermutation = blockPermutation.withState('pa:shape', 'inner_right');
            break;
          case Direction.West:
            if (blockToCheckDirection === 'south') blockPermutation = blockPermutation.withState('pa:shape', 'outer_left');
            if (blockToCheckDirection === 'north') blockPermutation = blockPermutation.withState('pa:shape', 'outer_right');
            break;
          case Direction.North:
            if (blockToCheckDirection === 'north') safeUpdateStairShape(blockToCheck, 'inner_right');
            if (blockToCheckDirection === 'south') safeUpdateStairShape(blockToCheck, 'outer_right');
            break;
          case Direction.South:
            if (blockToCheckDirection === 'north') safeUpdateStairShape(blockToCheck, 'outer_left');
            if (blockToCheckDirection === 'south') safeUpdateStairShape(blockToCheck, 'inner_left');
            break;
          default:
            break;
        }
      }
    }
    break;
  default:
    break;
}
e.permutationToPlace = blockPermutation;
 },
});

initEvent.blockComponentRegistry.registerCustomComponent('pa_dogwood_planks_stair_fence:trigger', {
  onPlayerBreak: e => { for (const direction of DirectionType.HORIZONTAL) {
  const directionOpposite = getOppositeDirection(direction);
  const blockToCheck = e.block.offset(directionToVector3(directionOpposite));

  try {
    blockToCheck.setPermutation(blockToCheck.permutation.withState(`pa:${direction.toLowerCase()}`, false));
  } catch (error) { }
}
 },
onPlace: e => { const { x, y, z } = e.block.location;
for (const direction of DirectionType.HORIZONTAL) {
  const directionOpposite = getOppositeDirection(direction);
  const blockToCheck = e.block.offset(directionToVector3(directionOpposite));

  try {
    if (shouldConnect(blockToCheck)) blockToCheck.setPermutation(blockToCheck.permutation.withState(`pa:${direction.toLowerCase()}`, true));
  } catch (error) { }
}
 },
beforeOnPlayerPlace: e => { e.permutationToPlace = e.permutationToPlace.withState("pa:in_world", true);

for (const direction of DirectionType.HORIZONTAL) {
  const directionOpposite = getOppositeDirection(direction);
  const blockToCheck = e.block.offset(directionToVector3(directionOpposite));

  const canConnect = shouldConnect(blockToCheck);
  e.permutationToPlace = e.permutationToPlace.withState(`pa:${directionOpposite.toLowerCase()}`, canConnect);
}
 },
});

initEvent.blockComponentRegistry.registerCustomComponent('pa_dogwood_planks_door:trigger', {
  onPlace: e => { const { x, y, z } = e.block.location;
const block = e.block;
const aboveBlock = block.above();

const part = block.permutation.getState('pa:part');

if (part === 'lower') {
  const upperPermutation = block.permutation.withState('pa:part', 'upper');
  
  aboveBlock.setPermutation(upperPermutation);
}
 },
onPlayerInteract: e => { const { block } = e;
const isOpen = block.permutation.getState('pa:is_open');

const getHalfDoor = () => {
  switch (block.permutation.getState('pa:part')) {
    case 'lower': return block.above();
    case 'upper': return block.below();
  }
}
const halfDoor = getHalfDoor();

block.setPermutation(block.permutation.withState('pa:is_open', !isOpen));
block.dimension.playSound(isOpen ? 'random.door_close' : 'random.door_open', block.location, { pitch: 1.0, volume: 0.4 });
if (halfDoor?.permutation.matches(block.typeId)) {
  halfDoor.setPermutation(halfDoor.permutation.withState('pa:is_open', !isOpen));
}
 },
beforeOnPlayerPlace: e => { const { block, permutationToPlace } = e;

let face = getOppositeDirection(e.face);

const aboveBlock = block.above();
const canBePlace = aboveBlock.isAir || aboveBlock.isLiquid || face === 'Down';

if (canBePlace) {
  const hasSideDoor = (sideBlock) => {
    return sideBlock.matches(permutationToPlace.type.id, {
      ...sideBlock.permutation.getAllStates(),
      'pa:part': 'lower'
    });
  }

  const cardinalDirection = permutationToPlace.getState('minecraft:cardinal_direction');
  const sides = cardinalSides[cardinalDirection];
  const leftBlock = block[sides.left]();
  const rightBlock = block[sides.right]();
  const isSideDoor = hasSideDoor(leftBlock) && !hasSideDoor(rightBlock);
  const hasRightBlock = rightBlock.isSolid || rightBlock.above().isSolid;
  const doorStates = {
    'minecraft:cardinal_direction': cardinalDirection,
    'pa:side': isSideDoor || hasRightBlock ? 'right' : 'left',
    'pa:part': 'lower',
    'pa:is_open': false
  }

  const doorPermutation = BlockPermutation.resolve(permutationToPlace.type.id, doorStates);

  e.permutationToPlace = doorPermutation;
}
else {
  e.cancel = true;
}
 },
});

initEvent.blockComponentRegistry.registerCustomComponent('pa_dogwood_sapling:trigger', {
  onPlayerBreak: e => { const equippable = e.player.getComponent("minecraft:equippable");
    if (!equippable) return;

    const mainhand = equippable.getEquipmentSlot("Mainhand");
    if (!mainhand.hasItem()) return;

    const itemTags = mainhand.getTags();
    const toolTags = ["minecraft:is_pickaxe"];

    if (toolTags.length > 0 && !itemTags.some(item => toolTags.includes(item))) return;
    
    e.dimension.runCommand(`execute positioned ${x} ${y} ${z} run loot spawn ~~~ loot "blocks/pa_dogwood_sapling"`); },
onPlace: e => { const { x, y, z } = e.block.location; },
onRandomTick: e => { const { x, y, z } = e.block.location;
const { block, dimension } = e;

block.setType('minecraft:air');
dimension.placeFeature("pa:savanna_tree_featurennwj", block.location);
 },
onPlayerInteract: e => { const { block, dimension, player } = e;

if (!player) return;

const equippable = player.getComponent("minecraft:equippable");
if (!equippable) return;

const mainhand = equippable.getEquipmentSlot("Mainhand");
if (!mainhand.hasItem() || mainhand.typeId !== "minecraft:bone_meal")
    return;

if (mainhand.amount > 1) mainhand.amount--;
else mainhand.setItem(undefined);

block.setType('minecraft:air');
dimension.placeFeature("pa:savanna_tree_featurennwj", block.location);

const effectLocation = block.center();
dimension.playSound("item.bone_meal.use", effectLocation);
dimension.spawnParticle(
    "minecraft:crop_growth_emitter",
    effectLocation
);
 },
});

initEvent.blockComponentRegistry.registerCustomComponent('pa_dogwoodleafs:trigger', {
  onPlace: e => { const { x, y, z } = e.block.location; },
});

initEvent.blockComponentRegistry.registerCustomComponent('pa_dogwoodlog:trigger', {
  onPlace: e => { const { x, y, z } = e.block.location; },
});

initEvent.blockComponentRegistry.registerCustomComponent('pa_ender_block:trigger', {
  onPlace: e => { const { x, y, z } = e.block.location; },
});

initEvent.blockComponentRegistry.registerCustomComponent('pa_dogwoodplanks:trigger', {
  onPlace: e => { const { x, y, z } = e.block.location; },
});

initEvent.blockComponentRegistry.registerCustomComponent('pa_ender_ore:trigger', {
  onPlayerBreak: e => { const equippable = e.player.getComponent("minecraft:equippable");
    if (!equippable) return;

    const mainhand = equippable.getEquipmentSlot("Mainhand");
    if (!mainhand.hasItem()) return;

    const itemTags = mainhand.getTags();
    const toolTags = ["minecraft:is_pickaxe"];

    if (toolTags.length > 0 && !itemTags.some(item => toolTags.includes(item))) return;
    
    e.dimension.runCommand(`execute positioned ${x} ${y} ${z} run loot spawn ~~~ loot "blocks/pa_ender_ore"`); },
onPlace: e => { const { x, y, z } = e.block.location; },
});

initEvent.blockComponentRegistry.registerCustomComponent('pa_gold_jasmine:trigger', {
  onPlayerBreak: e => { const equippable = e.player.getComponent("minecraft:equippable");
    if (!equippable) return;

    const mainhand = equippable.getEquipmentSlot("Mainhand");
    if (!mainhand.hasItem()) return;

    const itemTags = mainhand.getTags();
    const toolTags = ["minecraft:is_pickaxe"];

    if (toolTags.length > 0 && !itemTags.some(item => toolTags.includes(item))) return;
    
    e.dimension.runCommand(`execute positioned ${x} ${y} ${z} run loot spawn ~~~ loot "blocks/pa_gold_jasmine"`); },
onPlace: e => { const { x, y, z } = e.block.location; },
onRandomTick: e => { const { x, y, z } = e.block.location;
const growth = e.block.permutation.getState("pa:growth");

if (growth >= 1) return;

const growthChance = 1 / 3;
if (Math.random() > growthChance) return;

const effectLocation = e.block.center();
            
e.dimension.spawnParticle("minecraft:crop_growth_emitter", effectLocation);
e.block.setPermutation(e.block.permutation.withState("pa:growth", growth + 1));
 },
onPlayerInteract: e => { if (!e.player) return;

const equippable = e.player.getComponent("minecraft:equippable");
if (!equippable) return;

const mainhand = equippable.getEquipmentSlot("Mainhand");
if (!mainhand.hasItem() || mainhand.typeId !== "minecraft:bone_meal")
    return;

let growth = e.block.permutation.getState("pa:growth");

if (growth >= 1) return;

growth += 1;
e.block.setPermutation(e.block.permutation.withState("pa:growth", growth));

if (mainhand.amount > 1) mainhand.amount--;
else mainhand.setItem(undefined);

const effectLocation = e.block.center();
e.dimension.playSound("item.bone_meal.use", effectLocation);
e.dimension.spawnParticle("minecraft:crop_growth_emitter", effectLocation);
 },
});

initEvent.blockComponentRegistry.registerCustomComponent('pa_eye_blossom_bush:trigger', {
  onPlayerBreak: e => { const equippable = e.player.getComponent("minecraft:equippable");
    if (!equippable) return;

    const mainhand = equippable.getEquipmentSlot("Mainhand");
    if (!mainhand.hasItem()) return;

    const itemTags = mainhand.getTags();
    const toolTags = ["minecraft:is_pickaxe"];

    if (toolTags.length > 0 && !itemTags.some(item => toolTags.includes(item))) return;
    
    e.dimension.runCommand(`execute positioned ${x} ${y} ${z} run loot spawn ~~~ loot "blocks/pa_eye_blossom_bush"`); },
onPlace: e => { const { x, y, z } = e.block.location; },
onRandomTick: e => { const { x, y, z } = e.block.location;
const growth = e.block.permutation.getState("pa:growth");

if (growth >= 6) return;

const growthChance = 1 / 3;
if (Math.random() > growthChance) return;

const effectLocation = e.block.center();
            
e.dimension.spawnParticle("minecraft:crop_growth_emitter", effectLocation);
e.block.setPermutation(e.block.permutation.withState("pa:growth", growth + 1));
 },
onPlayerInteract: e => { if (!e.player) return;

const equippable = e.player.getComponent("minecraft:equippable");
if (!equippable) return;

const mainhand = equippable.getEquipmentSlot("Mainhand");
if (!mainhand.hasItem() || mainhand.typeId !== "minecraft:bone_meal")
    return;

let growth = e.block.permutation.getState("pa:growth");

if (growth >= 6) return;

growth += 1;
e.block.setPermutation(e.block.permutation.withState("pa:growth", growth));

if (mainhand.amount > 1) mainhand.amount--;
else mainhand.setItem(undefined);

const effectLocation = e.block.center();
e.dimension.playSound("item.bone_meal.use", effectLocation);
e.dimension.spawnParticle("minecraft:crop_growth_emitter", effectLocation);
 },
});

initEvent.blockComponentRegistry.registerCustomComponent('pa_icewoodlog:trigger', {
  onPlace: e => { const { x, y, z } = e.block.location; },
});

initEvent.blockComponentRegistry.registerCustomComponent('pa_jasmine:trigger', {
  onPlayerBreak: e => { const equippable = e.player.getComponent("minecraft:equippable");
    if (!equippable) return;

    const mainhand = equippable.getEquipmentSlot("Mainhand");
    if (!mainhand.hasItem()) return;

    const itemTags = mainhand.getTags();
    const toolTags = ["minecraft:is_pickaxe"];

    if (toolTags.length > 0 && !itemTags.some(item => toolTags.includes(item))) return;
    
    e.dimension.runCommand(`execute positioned ${x} ${y} ${z} run loot spawn ~~~ loot "blocks/pa_jasmine"`); },
onPlace: e => { const { x, y, z } = e.block.location; },
onRandomTick: e => { const { x, y, z } = e.block.location;
const growth = e.block.permutation.getState("pa:growth");

if (growth >= 1) return;

const growthChance = 1 / 3;
if (Math.random() > growthChance) return;

const effectLocation = e.block.center();
            
e.dimension.spawnParticle("minecraft:crop_growth_emitter", effectLocation);
e.block.setPermutation(e.block.permutation.withState("pa:growth", growth + 1));
 },
onPlayerInteract: e => { if (!e.player) return;

const equippable = e.player.getComponent("minecraft:equippable");
if (!equippable) return;

const mainhand = equippable.getEquipmentSlot("Mainhand");
if (!mainhand.hasItem() || mainhand.typeId !== "minecraft:bone_meal")
    return;

let growth = e.block.permutation.getState("pa:growth");

if (growth >= 1) return;

growth += 1;
e.block.setPermutation(e.block.permutation.withState("pa:growth", growth));

if (mainhand.amount > 1) mainhand.amount--;
else mainhand.setItem(undefined);

const effectLocation = e.block.center();
e.dimension.playSound("item.bone_meal.use", effectLocation);
e.dimension.spawnParticle("minecraft:crop_growth_emitter", effectLocation);
 },
});

initEvent.blockComponentRegistry.registerCustomComponent('pa_lavender:trigger', {
  onPlayerBreak: e => { const equippable = e.player.getComponent("minecraft:equippable");
    if (!equippable) return;

    const mainhand = equippable.getEquipmentSlot("Mainhand");
    if (!mainhand.hasItem()) return;

    const itemTags = mainhand.getTags();
    const toolTags = ["minecraft:is_pickaxe"];

    if (toolTags.length > 0 && !itemTags.some(item => toolTags.includes(item))) return;
    
    e.dimension.runCommand(`execute positioned ${x} ${y} ${z} run loot spawn ~~~ loot "blocks/pa_lavender"`); },
onPlace: e => { const { x, y, z } = e.block.location; },
onRandomTick: e => { const { x, y, z } = e.block.location;
const growth = e.block.permutation.getState("pa:growth");

if (growth >= 1) return;

const growthChance = 1 / 3;
if (Math.random() > growthChance) return;

const effectLocation = e.block.center();
            
e.dimension.spawnParticle("minecraft:crop_growth_emitter", effectLocation);
e.block.setPermutation(e.block.permutation.withState("pa:growth", growth + 1));
 },
onPlayerInteract: e => { if (!e.player) return;

const equippable = e.player.getComponent("minecraft:equippable");
if (!equippable) return;

const mainhand = equippable.getEquipmentSlot("Mainhand");
if (!mainhand.hasItem() || mainhand.typeId !== "minecraft:bone_meal")
    return;

let growth = e.block.permutation.getState("pa:growth");

if (growth >= 1) return;

growth += 1;
e.block.setPermutation(e.block.permutation.withState("pa:growth", growth));

if (mainhand.amount > 1) mainhand.amount--;
else mainhand.setItem(undefined);

const effectLocation = e.block.center();
e.dimension.playSound("item.bone_meal.use", effectLocation);
e.dimension.spawnParticle("minecraft:crop_growth_emitter", effectLocation);
 },
});

initEvent.blockComponentRegistry.registerCustomComponent('pa_lavender1:trigger', {
  onPlayerBreak: e => { const equippable = e.player.getComponent("minecraft:equippable");
    if (!equippable) return;

    const mainhand = equippable.getEquipmentSlot("Mainhand");
    if (!mainhand.hasItem()) return;

    const itemTags = mainhand.getTags();
    const toolTags = ["minecraft:is_pickaxe"];

    if (toolTags.length > 0 && !itemTags.some(item => toolTags.includes(item))) return;
    
    e.dimension.runCommand(`execute positioned ${x} ${y} ${z} run loot spawn ~~~ loot "blocks/pa_lavender1"`); },
onPlace: e => { const { x, y, z } = e.block.location; },
onRandomTick: e => { const { x, y, z } = e.block.location;
const growth = e.block.permutation.getState("pa:growth");

if (growth >= 3) return;

const growthChance = 1 / 3;
if (Math.random() > growthChance) return;

const effectLocation = e.block.center();
            
e.dimension.spawnParticle("minecraft:crop_growth_emitter", effectLocation);
e.block.setPermutation(e.block.permutation.withState("pa:growth", growth + 1));
 },
onPlayerInteract: e => { if (!e.player) return;

const equippable = e.player.getComponent("minecraft:equippable");
if (!equippable) return;

const mainhand = equippable.getEquipmentSlot("Mainhand");
if (!mainhand.hasItem() || mainhand.typeId !== "minecraft:bone_meal")
    return;

let growth = e.block.permutation.getState("pa:growth");

if (growth >= 3) return;

growth += 1;
e.block.setPermutation(e.block.permutation.withState("pa:growth", growth));

if (mainhand.amount > 1) mainhand.amount--;
else mainhand.setItem(undefined);

const effectLocation = e.block.center();
e.dimension.playSound("item.bone_meal.use", effectLocation);
e.dimension.spawnParticle("minecraft:crop_growth_emitter", effectLocation);
 },
});

initEvent.blockComponentRegistry.registerCustomComponent('pa_lumi_lily:trigger', {
  onPlace: e => { const { x, y, z } = e.block.location; },
onRandomTick: e => { const { x, y, z } = e.block.location;
const growth = e.block.permutation.getState("pa:growth");

if (growth >= 1) return;

const growthChance = 1 / 3;
if (Math.random() > growthChance) return;

const effectLocation = e.block.center();
            
e.dimension.spawnParticle("minecraft:crop_growth_emitter", effectLocation);
e.block.setPermutation(e.block.permutation.withState("pa:growth", growth + 1));
 },
onPlayerInteract: e => { if (!e.player) return;

const equippable = e.player.getComponent("minecraft:equippable");
if (!equippable) return;

const mainhand = equippable.getEquipmentSlot("Mainhand");
if (!mainhand.hasItem() || mainhand.typeId !== "minecraft:bone_meal")
    return;

let growth = e.block.permutation.getState("pa:growth");

if (growth >= 1) return;

growth += 1;
e.block.setPermutation(e.block.permutation.withState("pa:growth", growth));

if (mainhand.amount > 1) mainhand.amount--;
else mainhand.setItem(undefined);

const effectLocation = e.block.center();
e.dimension.playSound("item.bone_meal.use", effectLocation);
e.dimension.spawnParticle("minecraft:crop_growth_emitter", effectLocation);
 },
});

initEvent.blockComponentRegistry.registerCustomComponent('pa_lilac_flower:trigger', {
  onPlayerBreak: e => { const equippable = e.player.getComponent("minecraft:equippable");
    if (!equippable) return;

    const mainhand = equippable.getEquipmentSlot("Mainhand");
    if (!mainhand.hasItem()) return;

    const itemTags = mainhand.getTags();
    const toolTags = ["minecraft:is_pickaxe"];

    if (toolTags.length > 0 && !itemTags.some(item => toolTags.includes(item))) return;
    
    e.dimension.runCommand(`execute positioned ${x} ${y} ${z} run loot spawn ~~~ loot "blocks/pa_lilac_flower"`); },
onPlace: e => { const { x, y, z } = e.block.location; },
onRandomTick: e => { const { x, y, z } = e.block.location;
const growth = e.block.permutation.getState("pa:growth");

if (growth >= 1) return;

const growthChance = 1 / 3;
if (Math.random() > growthChance) return;

const effectLocation = e.block.center();
            
e.dimension.spawnParticle("minecraft:crop_growth_emitter", effectLocation);
e.block.setPermutation(e.block.permutation.withState("pa:growth", growth + 1));
 },
onPlayerInteract: e => { if (!e.player) return;

const equippable = e.player.getComponent("minecraft:equippable");
if (!equippable) return;

const mainhand = equippable.getEquipmentSlot("Mainhand");
if (!mainhand.hasItem() || mainhand.typeId !== "minecraft:bone_meal")
    return;

let growth = e.block.permutation.getState("pa:growth");

if (growth >= 1) return;

growth += 1;
e.block.setPermutation(e.block.permutation.withState("pa:growth", growth));

if (mainhand.amount > 1) mainhand.amount--;
else mainhand.setItem(undefined);

const effectLocation = e.block.center();
e.dimension.playSound("item.bone_meal.use", effectLocation);
e.dimension.spawnParticle("minecraft:crop_growth_emitter", effectLocation);
 },
});

initEvent.blockComponentRegistry.registerCustomComponent('pa_lilies:trigger', {
  onPlayerBreak: e => { const equippable = e.player.getComponent("minecraft:equippable");
    if (!equippable) return;

    const mainhand = equippable.getEquipmentSlot("Mainhand");
    if (!mainhand.hasItem()) return;

    const itemTags = mainhand.getTags();
    const toolTags = ["minecraft:is_pickaxe"];

    if (toolTags.length > 0 && !itemTags.some(item => toolTags.includes(item))) return;
    
    e.dimension.runCommand(`execute positioned ${x} ${y} ${z} run loot spawn ~~~ loot "blocks/pa_lilies"`); },
onPlace: e => { const { x, y, z } = e.block.location; },
onRandomTick: e => { const { x, y, z } = e.block.location;
const growth = e.block.permutation.getState("pa:growth");

if (growth >= 1) return;

const growthChance = 1 / 3;
if (Math.random() > growthChance) return;

const effectLocation = e.block.center();
            
e.dimension.spawnParticle("minecraft:crop_growth_emitter", effectLocation);
e.block.setPermutation(e.block.permutation.withState("pa:growth", growth + 1));
 },
onPlayerInteract: e => { if (!e.player) return;

const equippable = e.player.getComponent("minecraft:equippable");
if (!equippable) return;

const mainhand = equippable.getEquipmentSlot("Mainhand");
if (!mainhand.hasItem() || mainhand.typeId !== "minecraft:bone_meal")
    return;

let growth = e.block.permutation.getState("pa:growth");

if (growth >= 1) return;

growth += 1;
e.block.setPermutation(e.block.permutation.withState("pa:growth", growth));

if (mainhand.amount > 1) mainhand.amount--;
else mainhand.setItem(undefined);

const effectLocation = e.block.center();
e.dimension.playSound("item.bone_meal.use", effectLocation);
e.dimension.spawnParticle("minecraft:crop_growth_emitter", effectLocation);
 },
});

initEvent.blockComponentRegistry.registerCustomComponent('pa_muddydeepsand:trigger', {
  onPlace: e => { const { x, y, z } = e.block.location; },
});

initEvent.blockComponentRegistry.registerCustomComponent('pa_onion_crop:trigger', {
  onPlayerBreak: e => { const equippable = e.player.getComponent("minecraft:equippable");
    if (!equippable) return;

    const mainhand = equippable.getEquipmentSlot("Mainhand");
    if (!mainhand.hasItem()) return;

    const itemTags = mainhand.getTags();
    const toolTags = ["minecraft:is_pickaxe"];

    if (toolTags.length > 0 && !itemTags.some(item => toolTags.includes(item))) return;
    
    e.dimension.runCommand(`execute positioned ${x} ${y} ${z} run loot spawn ~~~ loot "blocks/pa_onion_crop"`); },
onPlace: e => { const { x, y, z } = e.block.location; },
onRandomTick: e => { const { x, y, z } = e.block.location;
const growth = e.block.permutation.getState("pa:growth");

if (growth >= 6) return;

const growthChance = 1 / 3;
if (Math.random() > growthChance) return;

const effectLocation = e.block.center();
            
e.dimension.spawnParticle("minecraft:crop_growth_emitter", effectLocation);
e.block.setPermutation(e.block.permutation.withState("pa:growth", growth + 1));
 },
onPlayerInteract: e => { if (!e.player) return;

const equippable = e.player.getComponent("minecraft:equippable");
if (!equippable) return;

const mainhand = equippable.getEquipmentSlot("Mainhand");
if (!mainhand.hasItem() || mainhand.typeId !== "minecraft:bone_meal")
    return;

let growth = e.block.permutation.getState("pa:growth");

if (growth >= 6) return;

growth += 1;
e.block.setPermutation(e.block.permutation.withState("pa:growth", growth));

if (mainhand.amount > 1) mainhand.amount--;
else mainhand.setItem(undefined);

const effectLocation = e.block.center();
e.dimension.playSound("item.bone_meal.use", effectLocation);
e.dimension.spawnParticle("minecraft:crop_growth_emitter", effectLocation);
 },
});

initEvent.blockComponentRegistry.registerCustomComponent('pa_redrobinhouse:trigger', {
  onPlayerBreak: e => { e.player.runCommand("function redrobin");
e.player.runCommand("function redrobin1"); },
onPlace: e => { const { x, y, z } = e.block.location; },
onRandomTick: e => { const { x, y, z } = e.block.location;
e.dimension.runCommand(`execute positioned ${x} ${y} ${z} run function redrobin`);
e.dimension.runCommand(`execute positioned ${x} ${y} ${z} run function redrobin1`); },
});

initEvent.blockComponentRegistry.registerCustomComponent('pa_rosebush:trigger', {
  onPlayerBreak: e => { const equippable = e.player.getComponent("minecraft:equippable");
    if (!equippable) return;

    const mainhand = equippable.getEquipmentSlot("Mainhand");
    if (!mainhand.hasItem()) return;

    const itemTags = mainhand.getTags();
    const toolTags = ["minecraft:is_pickaxe"];

    if (toolTags.length > 0 && !itemTags.some(item => toolTags.includes(item))) return;
    
    e.dimension.runCommand(`execute positioned ${x} ${y} ${z} run loot spawn ~~~ loot "blocks/pa_rosebush"`); },
onPlace: e => { const { x, y, z } = e.block.location; },
onRandomTick: e => { const { x, y, z } = e.block.location;
const growth = e.block.permutation.getState("pa:growth");

if (growth >= 1) return;

const growthChance = 1 / 3;
if (Math.random() > growthChance) return;

const effectLocation = e.block.center();
            
e.dimension.spawnParticle("minecraft:crop_growth_emitter", effectLocation);
e.block.setPermutation(e.block.permutation.withState("pa:growth", growth + 1));
 },
onPlayerInteract: e => { if (!e.player) return;

const equippable = e.player.getComponent("minecraft:equippable");
if (!equippable) return;

const mainhand = equippable.getEquipmentSlot("Mainhand");
if (!mainhand.hasItem() || mainhand.typeId !== "minecraft:bone_meal")
    return;

let growth = e.block.permutation.getState("pa:growth");

if (growth >= 1) return;

growth += 1;
e.block.setPermutation(e.block.permutation.withState("pa:growth", growth));

if (mainhand.amount > 1) mainhand.amount--;
else mainhand.setItem(undefined);

const effectLocation = e.block.center();
e.dimension.playSound("item.bone_meal.use", effectLocation);
e.dimension.spawnParticle("minecraft:crop_growth_emitter", effectLocation);
 },
});

initEvent.blockComponentRegistry.registerCustomComponent('pa_roses_bush:trigger', {
  onPlayerBreak: e => { const equippable = e.player.getComponent("minecraft:equippable");
    if (!equippable) return;

    const mainhand = equippable.getEquipmentSlot("Mainhand");
    if (!mainhand.hasItem()) return;

    const itemTags = mainhand.getTags();
    const toolTags = ["minecraft:is_pickaxe"];

    if (toolTags.length > 0 && !itemTags.some(item => toolTags.includes(item))) return;
    
    e.dimension.runCommand(`execute positioned ${x} ${y} ${z} run loot spawn ~~~ loot "blocks/pa_roses_bush"`); },
onPlace: e => { const { x, y, z } = e.block.location; },
onRandomTick: e => { const { x, y, z } = e.block.location;
const growth = e.block.permutation.getState("pa:growth");

if (growth >= 1) return;

const growthChance = 1 / 3;
if (Math.random() > growthChance) return;

const effectLocation = e.block.center();
            
e.dimension.spawnParticle("minecraft:crop_growth_emitter", effectLocation);
e.block.setPermutation(e.block.permutation.withState("pa:growth", growth + 1));
 },
onPlayerInteract: e => { if (!e.player) return;

const equippable = e.player.getComponent("minecraft:equippable");
if (!equippable) return;

const mainhand = equippable.getEquipmentSlot("Mainhand");
if (!mainhand.hasItem() || mainhand.typeId !== "minecraft:bone_meal")
    return;

let growth = e.block.permutation.getState("pa:growth");

if (growth >= 1) return;

growth += 1;
e.block.setPermutation(e.block.permutation.withState("pa:growth", growth));

if (mainhand.amount > 1) mainhand.amount--;
else mainhand.setItem(undefined);

const effectLocation = e.block.center();
e.dimension.playSound("item.bone_meal.use", effectLocation);
e.dimension.spawnParticle("minecraft:crop_growth_emitter", effectLocation);
 },
});

initEvent.blockComponentRegistry.registerCustomComponent('pa_weeping_willow_leafs:trigger', {
  onPlace: e => { const { x, y, z } = e.block.location; },
});

initEvent.blockComponentRegistry.registerCustomComponent('pa_super_netherblock:trigger', {
  onPlace: e => { const { x, y, z } = e.block.location; },
});

initEvent.blockComponentRegistry.registerCustomComponent('pa_tall_wheat:trigger', {
  onPlayerBreak: e => { const equippable = e.player.getComponent("minecraft:equippable");
    if (!equippable) return;

    const mainhand = equippable.getEquipmentSlot("Mainhand");
    if (!mainhand.hasItem()) return;

    const itemTags = mainhand.getTags();
    const toolTags = ["minecraft:is_pickaxe"];

    if (toolTags.length > 0 && !itemTags.some(item => toolTags.includes(item))) return;
    
    e.dimension.runCommand(`execute positioned ${x} ${y} ${z} run loot spawn ~~~ loot "blocks/pa_tall_wheat"`); },
onPlace: e => { const { x, y, z } = e.block.location; },
onRandomTick: e => { const { x, y, z } = e.block.location;
const growth = e.block.permutation.getState("pa:growth");

if (growth >= 1) return;

const growthChance = 1 / 3;
if (Math.random() > growthChance) return;

const effectLocation = e.block.center();
            
e.dimension.spawnParticle("minecraft:crop_growth_emitter", effectLocation);
e.block.setPermutation(e.block.permutation.withState("pa:growth", growth + 1));
 },
onPlayerInteract: e => { if (!e.player) return;

const equippable = e.player.getComponent("minecraft:equippable");
if (!equippable) return;

const mainhand = equippable.getEquipmentSlot("Mainhand");
if (!mainhand.hasItem() || mainhand.typeId !== "minecraft:bone_meal")
    return;

let growth = e.block.permutation.getState("pa:growth");

if (growth >= 1) return;

growth += 1;
e.block.setPermutation(e.block.permutation.withState("pa:growth", growth));

if (mainhand.amount > 1) mainhand.amount--;
else mainhand.setItem(undefined);

const effectLocation = e.block.center();
e.dimension.playSound("item.bone_meal.use", effectLocation);
e.dimension.spawnParticle("minecraft:crop_growth_emitter", effectLocation);
 },
});

initEvent.blockComponentRegistry.registerCustomComponent('pa_tall_wheat1:trigger', {
  onPlace: e => { const { x, y, z } = e.block.location; },
onRandomTick: e => { const { x, y, z } = e.block.location;
const growth = e.block.permutation.getState("pa:growth");

if (growth >= 6) return;

const growthChance = 1 / 3;
if (Math.random() > growthChance) return;

const effectLocation = e.block.center();
            
e.dimension.spawnParticle("minecraft:crop_growth_emitter", effectLocation);
e.block.setPermutation(e.block.permutation.withState("pa:growth", growth + 1));
 },
onPlayerInteract: e => { if (!e.player) return;

const equippable = e.player.getComponent("minecraft:equippable");
if (!equippable) return;

const mainhand = equippable.getEquipmentSlot("Mainhand");
if (!mainhand.hasItem() || mainhand.typeId !== "minecraft:bone_meal")
    return;

let growth = e.block.permutation.getState("pa:growth");

if (growth >= 6) return;

growth += 1;
e.block.setPermutation(e.block.permutation.withState("pa:growth", growth));

if (mainhand.amount > 1) mainhand.amount--;
else mainhand.setItem(undefined);

const effectLocation = e.block.center();
e.dimension.playSound("item.bone_meal.use", effectLocation);
e.dimension.spawnParticle("minecraft:crop_growth_emitter", effectLocation);
 },
});

initEvent.blockComponentRegistry.registerCustomComponent('pa_weeping_willow_log:trigger', {
  onPlace: e => { const { x, y, z } = e.block.location; },
});

initEvent.blockComponentRegistry.registerCustomComponent('pa_weeping_willow_planks:trigger', {
  onPlace: e => { const { x, y, z } = e.block.location; },
});

initEvent.blockComponentRegistry.registerCustomComponent('pa_weeping_willow_planks_slab:trigger', {
  onPlace: e => { const { x, y, z } = e.block.location; },
beforeOnPlayerPlace: e => { let playerEquipment = e.player.getComponent('equippable').getEquipment('Mainhand');
if (playerEquipment === undefined) return;

let face = getOppositeDirection(e.face);
let blockToCheck = e.block.offset(directionToVector3(face));

const blockStateDouble = 'pa:is_double';
const blockStateHalf = 'minecraft:vertical_half';

if (blockToCheck.permutation.getState(blockStateDouble)) return;
if (blockToCheck.typeId !== playerEquipment.typeId) return;

if (face === 'Up' || face === 'Down') {
  const state = blockToCheck.permutation.getState(blockStateHalf);
  if ((face === 'Up' && state === 'top') || (face === 'Down' && state === 'bottom')) {
    e.cancel = true;

    system.run(() => {
      blockToCheck.dimension.playSound("use.stone", blockToCheck.location, { pitch: 0.8, volume: 1.0 });

      blockToCheck.setPermutation(BlockPermutation.resolve(blockToCheck.typeId, { [blockStateDouble]: true }));

      decrementStack(e.player);
    });
  }
}
 },
});

initEvent.blockComponentRegistry.registerCustomComponent('pa_weeping_willow_planks_stair:trigger', {
  onPlace: e => { const { x, y, z } = e.block.location;
e.dimension.playSound("normal", e.block.location, { pitch: 0.8, volume: 1.0 }); },
beforeOnPlayerPlace: e => { let face = e.permutationToPlace.getState('minecraft:cardinal_direction');
let half = e.permutationToPlace.getState('minecraft:vertical_half');
let blockPermutation = e.permutationToPlace;
let blockToCheck;

switch (face) {
  case 'north':
    {
      for (const direction of DirectionType.HORIZONTAL) {
        blockToCheck = e.block.offset(directionToVector3(direction));
        if (blockToCheck.typeId !== blockPermutation.type.id) continue;

        const blockToCheckHalf = blockToCheck.permutation.getState('minecraft:vertical_half');
        if (blockToCheckHalf !== half) continue;

        const blockToCheckDirection = blockToCheck.permutation.getState('minecraft:cardinal_direction');

        switch (direction) {
          case Direction.North:
            if (blockToCheckDirection === 'west') blockPermutation = blockPermutation.withState('pa:shape', 'outer_left');
            if (blockToCheckDirection === 'east') blockPermutation = blockPermutation.withState('pa:shape', 'outer_right');
            break;
          case Direction.South:
            if (blockToCheckDirection === 'east') blockPermutation = blockPermutation.withState('pa:shape', 'inner_left');
            if (blockToCheckDirection === 'west') blockPermutation = blockPermutation.withState('pa:shape', 'inner_right');
            break;
          case Direction.East:
            if (blockToCheckDirection === 'east') safeUpdateStairShape(blockToCheck, 'inner_right');;
            if (blockToCheckDirection === 'west') safeUpdateStairShape(blockToCheck, 'outer_right');
            break;
          case Direction.West:
            if (blockToCheckDirection === 'west') safeUpdateStairShape(blockToCheck, 'inner_left');
            if (blockToCheckDirection === 'east') safeUpdateStairShape(blockToCheck, 'outer_left');
            break;
          default:
            break;
        }
      }
    }
    break;
  case 'south':
    {
      blockPermutation = blockPermutation.withState('pa:south', true);
      for (const direction of DirectionType.HORIZONTAL) {
        blockToCheck = e.block.offset(directionToVector3(direction));
        if (blockToCheck.typeId !== blockPermutation.type.id) continue;

        const blockToCheckHalf = blockToCheck.permutation.getState('minecraft:vertical_half');
        if (blockToCheckHalf !== half) continue;

        const blockToCheckDirection = blockToCheck.permutation.getState('minecraft:cardinal_direction');

        switch (direction) {
          case Direction.North:
            if (blockToCheckDirection === 'west') blockPermutation = blockPermutation.withState('pa:shape', 'inner_left');
            if (blockToCheckDirection === 'east') blockPermutation = blockPermutation.withState('pa:shape', 'inner_right');
            break;
          case Direction.South:
            if (blockToCheckDirection === 'east') blockPermutation = blockPermutation.withState('pa:shape', 'outer_left');
            if (blockToCheckDirection === 'west') blockPermutation = blockPermutation.withState('pa:shape', 'outer_right');
            break;
          case Direction.East:
            if (blockToCheckDirection === 'east') safeUpdateStairShape(blockToCheck, 'inner_left');
            if (blockToCheckDirection === 'west') safeUpdateStairShape(blockToCheck, 'outer_left');
            break;
          case Direction.West:
            if (blockToCheckDirection === 'west') safeUpdateStairShape(blockToCheck, 'inner_right');
            if (blockToCheckDirection === 'east') safeUpdateStairShape(blockToCheck, 'outer_right');
            break;
          default:
            break;
        }
      }
    }
    break;
  case 'east':
    {
      for (const direction of DirectionType.HORIZONTAL) {
        blockToCheck = e.block.offset(directionToVector3(direction));
        if (blockToCheck.typeId !== blockPermutation.type.id) continue;

        const blockToCheckHalf = blockToCheck.permutation.getState('minecraft:vertical_half');
        if (blockToCheckHalf !== half) continue;

        const blockToCheckDirection = blockToCheck.permutation.getState('minecraft:cardinal_direction');

        switch (direction) {
          case Direction.East:
            if (blockToCheckDirection === 'north') blockPermutation = blockPermutation.withState('pa:shape', 'outer_left');
            if (blockToCheckDirection === 'south') blockPermutation = blockPermutation.withState('pa:shape', 'outer_right');
            break;
          case Direction.West:
            if (blockToCheckDirection === 'south') blockPermutation = blockPermutation.withState('pa:shape', 'inner_left');
            if (blockToCheckDirection === 'north') blockPermutation = blockPermutation.withState('pa:shape', 'inner_right');
            break;
          case Direction.North:
            if (blockToCheckDirection === 'north') safeUpdateStairShape(blockToCheck, 'inner_left');
            if (blockToCheckDirection === 'south') safeUpdateStairShape(blockToCheck, 'outer_left');
            break;
          case Direction.South:
            if (blockToCheckDirection === 'north') safeUpdateStairShape(blockToCheck, 'outer_right');
            if (blockToCheckDirection === 'south') safeUpdateStairShape(blockToCheck, 'inner_right');
            break;
          default:
            break;
        }
      }
    }
    break;
  case 'west':
    {
      for (const direction of DirectionType.HORIZONTAL) {
        blockToCheck = e.block.offset(directionToVector3(direction));
        if (blockToCheck.typeId !== blockPermutation.type.id) continue;

        const blockToCheckHalf = blockToCheck.permutation.getState('minecraft:vertical_half');
        if (blockToCheckHalf !== half) continue;

        const blockToCheckDirection = blockToCheck.permutation.getState('minecraft:cardinal_direction');

        switch (direction) {
          case Direction.East:
            if (blockToCheckDirection === 'north') blockPermutation = blockPermutation.withState('pa:shape', 'inner_left');
            if (blockToCheckDirection === 'south') blockPermutation = blockPermutation.withState('pa:shape', 'inner_right');
            break;
          case Direction.West:
            if (blockToCheckDirection === 'south') blockPermutation = blockPermutation.withState('pa:shape', 'outer_left');
            if (blockToCheckDirection === 'north') blockPermutation = blockPermutation.withState('pa:shape', 'outer_right');
            break;
          case Direction.North:
            if (blockToCheckDirection === 'north') safeUpdateStairShape(blockToCheck, 'inner_right');
            if (blockToCheckDirection === 'south') safeUpdateStairShape(blockToCheck, 'outer_right');
            break;
          case Direction.South:
            if (blockToCheckDirection === 'north') safeUpdateStairShape(blockToCheck, 'outer_left');
            if (blockToCheckDirection === 'south') safeUpdateStairShape(blockToCheck, 'inner_left');
            break;
          default:
            break;
        }
      }
    }
    break;
  default:
    break;
}
e.permutationToPlace = blockPermutation;
 },
});

initEvent.blockComponentRegistry.registerCustomComponent('pa_weepingwillow_planks_stair_fence:trigger', {
  onPlayerBreak: e => { for (const direction of DirectionType.HORIZONTAL) {
  const directionOpposite = getOppositeDirection(direction);
  const blockToCheck = e.block.offset(directionToVector3(directionOpposite));

  try {
    blockToCheck.setPermutation(blockToCheck.permutation.withState(`pa:${direction.toLowerCase()}`, false));
  } catch (error) { }
}
 },
onPlace: e => { const { x, y, z } = e.block.location;
for (const direction of DirectionType.HORIZONTAL) {
  const directionOpposite = getOppositeDirection(direction);
  const blockToCheck = e.block.offset(directionToVector3(directionOpposite));

  try {
    if (shouldConnect(blockToCheck)) blockToCheck.setPermutation(blockToCheck.permutation.withState(`pa:${direction.toLowerCase()}`, true));
  } catch (error) { }
}
 },
beforeOnPlayerPlace: e => { e.permutationToPlace = e.permutationToPlace.withState("pa:in_world", true);

for (const direction of DirectionType.HORIZONTAL) {
  const directionOpposite = getOppositeDirection(direction);
  const blockToCheck = e.block.offset(directionToVector3(directionOpposite));

  const canConnect = shouldConnect(blockToCheck);
  e.permutationToPlace = e.permutationToPlace.withState(`pa:${directionOpposite.toLowerCase()}`, canConnect);
}
 },
});

initEvent.blockComponentRegistry.registerCustomComponent('pa_weeping_willow_planks_door:trigger', {
  onPlace: e => { const { x, y, z } = e.block.location;
const block = e.block;
const aboveBlock = block.above();

const part = block.permutation.getState('pa:part');

if (part === 'lower') {
  const upperPermutation = block.permutation.withState('pa:part', 'upper');
  
  aboveBlock.setPermutation(upperPermutation);
}
 },
onPlayerInteract: e => { const { block } = e;
const isOpen = block.permutation.getState('pa:is_open');

const getHalfDoor = () => {
  switch (block.permutation.getState('pa:part')) {
    case 'lower': return block.above();
    case 'upper': return block.below();
  }
}
const halfDoor = getHalfDoor();

block.setPermutation(block.permutation.withState('pa:is_open', !isOpen));
block.dimension.playSound(isOpen ? 'random.door_close' : 'random.door_open', block.location, { pitch: 1.0, volume: 0.4 });
if (halfDoor?.permutation.matches(block.typeId)) {
  halfDoor.setPermutation(halfDoor.permutation.withState('pa:is_open', !isOpen));
}
 },
beforeOnPlayerPlace: e => { const { block, permutationToPlace } = e;

let face = getOppositeDirection(e.face);

const aboveBlock = block.above();
const canBePlace = aboveBlock.isAir || aboveBlock.isLiquid || face === 'Down';

if (canBePlace) {
  const hasSideDoor = (sideBlock) => {
    return sideBlock.matches(permutationToPlace.type.id, {
      ...sideBlock.permutation.getAllStates(),
      'pa:part': 'lower'
    });
  }

  const cardinalDirection = permutationToPlace.getState('minecraft:cardinal_direction');
  const sides = cardinalSides[cardinalDirection];
  const leftBlock = block[sides.left]();
  const rightBlock = block[sides.right]();
  const isSideDoor = hasSideDoor(leftBlock) && !hasSideDoor(rightBlock);
  const hasRightBlock = rightBlock.isSolid || rightBlock.above().isSolid;
  const doorStates = {
    'minecraft:cardinal_direction': cardinalDirection,
    'pa:side': isSideDoor || hasRightBlock ? 'right' : 'left',
    'pa:part': 'lower',
    'pa:is_open': false
  }

  const doorPermutation = BlockPermutation.resolve(permutationToPlace.type.id, doorStates);

  e.permutationToPlace = doorPermutation;
}
else {
  e.cancel = true;
}
 },
});

initEvent.blockComponentRegistry.registerCustomComponent('pa_weeping_willow_sapling:trigger', {
  onPlayerBreak: e => { const equippable = e.player.getComponent("minecraft:equippable");
    if (!equippable) return;

    const mainhand = equippable.getEquipmentSlot("Mainhand");
    if (!mainhand.hasItem()) return;

    const itemTags = mainhand.getTags();
    const toolTags = ["minecraft:is_pickaxe"];

    if (toolTags.length > 0 && !itemTags.some(item => toolTags.includes(item))) return;
    
    e.dimension.runCommand(`execute positioned ${x} ${y} ${z} run loot spawn ~~~ loot "blocks/pa_weeping_willow_sapling"`); },
onPlace: e => { const { x, y, z } = e.block.location; },
onRandomTick: e => { const { x, y, z } = e.block.location;
const { block, dimension } = e;

block.setType('minecraft:air');
dimension.placeFeature("pa:weeping_willows_tree", block.location);
 },
onPlayerInteract: e => { const { block, dimension, player } = e;

if (!player) return;

const equippable = player.getComponent("minecraft:equippable");
if (!equippable) return;

const mainhand = equippable.getEquipmentSlot("Mainhand");
if (!mainhand.hasItem() || mainhand.typeId !== "minecraft:bone_meal")
    return;

if (mainhand.amount > 1) mainhand.amount--;
else mainhand.setItem(undefined);

block.setType('minecraft:air');
dimension.placeFeature("pa:weeping_willows_tree", block.location);

const effectLocation = block.center();
dimension.playSound("item.bone_meal.use", effectLocation);
dimension.spawnParticle(
    "minecraft:crop_growth_emitter",
    effectLocation
);
 },
});

initEvent.blockComponentRegistry.registerCustomComponent('pa_wild_onion:trigger', {
  onPlayerBreak: e => { const equippable = e.player.getComponent("minecraft:equippable");
    if (!equippable) return;

    const mainhand = equippable.getEquipmentSlot("Mainhand");
    if (!mainhand.hasItem()) return;

    const itemTags = mainhand.getTags();
    const toolTags = ["minecraft:is_pickaxe"];

    if (toolTags.length > 0 && !itemTags.some(item => toolTags.includes(item))) return;
    
    e.dimension.runCommand(`execute positioned ${x} ${y} ${z} run loot spawn ~~~ loot "blocks/pa_wild_onion"`); },
onPlace: e => { const { x, y, z } = e.block.location; },
onRandomTick: e => { const { x, y, z } = e.block.location;
const growth = e.block.permutation.getState("pa:growth");

if (growth >= 5) return;

const growthChance = 1 / 3;
if (Math.random() > growthChance) return;

const effectLocation = e.block.center();
            
e.dimension.spawnParticle("minecraft:crop_growth_emitter", effectLocation);
e.block.setPermutation(e.block.permutation.withState("pa:growth", growth + 1));
 },
onPlayerInteract: e => { if (!e.player) return;

const equippable = e.player.getComponent("minecraft:equippable");
if (!equippable) return;

const mainhand = equippable.getEquipmentSlot("Mainhand");
if (!mainhand.hasItem() || mainhand.typeId !== "minecraft:bone_meal")
    return;

let growth = e.block.permutation.getState("pa:growth");

if (growth >= 5) return;

growth += 1;
e.block.setPermutation(e.block.permutation.withState("pa:growth", growth));

if (mainhand.amount > 1) mainhand.amount--;
else mainhand.setItem(undefined);

const effectLocation = e.block.center();
e.dimension.playSound("item.bone_meal.use", effectLocation);
e.dimension.spawnParticle("minecraft:crop_growth_emitter", effectLocation);
 },
});

initEvent.blockComponentRegistry.registerCustomComponent('pa_zombie_slime:trigger', {
  onPlace: e => { const { x, y, z } = e.block.location; },
});

});
