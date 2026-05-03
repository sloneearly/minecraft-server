import { system, world, BlockPermutation } from '@minecraft/server';
import { decrementStack, getOppositeDirection, DirectionType, cardinalSides } from './utils/helper';
import { directionToVector3 } from './utils/math';

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.blockComponentRegistry.registerCustomComponent('block_cactus_trapdoor:trigger', {
  onPlayerInteract: e => { const isOpen = e.block.permutation.getState("pa:open");
const sound = isOpen ? "close.wooden_trapdoor" : "open.wooden_trapdoor";

e.block.setPermutation(e.block.permutation.withState("pa:open", !isOpen));

e.dimension.playSound(sound, e.block.center(), {
  pitch: 0.9,
  volume: 0.9,
});
 },
});

initEvent.blockComponentRegistry.registerCustomComponent('block_cactus_door:trigger', {
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
  }

  const doorPermutation = BlockPermutation.resolve(permutationToPlace.type.id, doorStates);

  e.permutationToPlace = doorPermutation.withState('pa:part', 'lower');
  aboveBlock.setPermutation(doorPermutation.withState('pa:part', 'upper'));
}
else {
  e.cancel = true;
}
 },
});

});
