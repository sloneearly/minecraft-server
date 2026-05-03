import { world, BlockPermutation, ItemStack, GameMode, system } from '@minecraft/server';


world.beforeEvents.worldInitialize.subscribe((initEvent) => {
    initEvent.blockComponentRegistry.registerCustomComponent("ancients:fence_gate_place", {
        beforeOnPlayerPlace: e => {
            const { player, block, face, permutationToPlace, dimension } = e;
            e.permutationToPlace = permutationToPlace.withState('ancient:placed_bit', 1);
        },
        onPlayerInteract: e => {
            const { player, block, dimension, face, faceLocation } = e;
            // Your code here
            // Toggle the 'kai:open' state between false and true and determine the sound effect to play
            const currentState = block.permutation.getState('ancient:open');
            const newOpenState = !currentState;
            const sound = newOpenState ? 'open.fence_gate' : 'close.fence_gate';

            // Determine the new cardinal direction based on the player's rotation
            const rotationAngle = player.getRotation().y;
            const newCardinalDirection = getNewCardinalDirection(block.permutation.getState('minecraft:cardinal_direction'), rotationAngle);

            // Update the block's permutation with the new states
            const newPermutation = BlockPermutation.resolve(block.typeId, {
                ...block.permutation.getAllStates(),
                'ancient:open': newOpenState,
                'minecraft:cardinal_direction': newCardinalDirection
            });

            // Apply the new permutation and play the sound
            block.setPermutation(newPermutation);
            block.dimension.playSound(sound, block.location);
        },
    });
});

export function getNewCardinalDirection(currentDirection, angle) {
    const direction = directionDisplay(angle);
    if (['north', 'south'].includes(currentDirection)) {
        return direction.includes('south') ? 'south' : 'north';
    } else {
        return direction.includes('west') ? 'east' : 'west';
    }
}

// Function to calculate the direction a player is looking at
export function directionDisplay(angle) {
    if (Math.abs(angle) > 112.5) return 'north';
    if (Math.abs(angle) < 67.5) return 'south';
    if (angle < 157.5 && angle > 22.5) return 'west';
    if (angle > -157.5 && angle < -22.5) return 'east';
    return '';
}