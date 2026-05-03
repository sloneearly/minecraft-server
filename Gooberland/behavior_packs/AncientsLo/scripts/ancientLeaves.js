import { world } from '@minecraft/server';
import './spawn_loot/spawn_loot.js';

export const allowedLogs = [
    'ancients:ancient_log', 'ancients:ancient_log_stripped'
];

export const ancientTreeloot = {
    pools: [
    {
        rolls: 2,
        entries: [
            {
                item: 'ancients:ancient_sapling',
                count: { min: 0, max: 1 },
                weight: 3
            },
            {
                item: 'minecraft:stick',
                count: { min: 0, max: 1 },
                weight: 2
            }
        ]
    }
    ]
}

export const leavesLoot = {
    "ancients:ancient_leaves": {
        lootTable: ancientTreeloot
    }
}


world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('ancients:on_random_tick', {
        onRandomTick(e) {
            const { block } = e;
            const { x, y, z } = block.location;

            const isDecaying = block.permutation.getState('ancients:decay');
            const isPlacedByPlayer = block.permutation.getState('ancients:placed');

            if (isPlacedByPlayer) return;
            if (isDecaying) {
                const isLogNear = checkForLogsAroundLeaves(block);
                if (!isLogNear){
                    const elegibleLoot = leavesLoot[block.typeId].lootTable;

                    block.dimension.runCommandAsync(`setblock ${x} ${y} ${z} air`);

                    block.dimension.spawnLoot(elegibleLoot,block.location)
                    checkAndDecayLeavesAround(block)
                }
                else block.setPermutation(block.permutation.withState('ancients:decay', false));
                
                return;
            }

        },
        beforeOnPlayerPlace: e => {
            const { player, block, face, permutationToPlace, dimension } = e;
            e.permutationToPlace = permutationToPlace.withState('ancients:placed', true);
        },
        onPlayerDestroy: e => {
            const { player, block, dimension, destroyedBlockPermutation } = e;
            const elegibleLoot = leavesLoot[destroyedBlockPermutation.type.id].lootTable;
            block.dimension.spawnLoot(elegibleLoot,block.location)
        },
    });
});

world.afterEvents.playerBreakBlock.subscribe(eventData => {
    const brokenBlockPerm = eventData.brokenBlockPermutation;
    const block = eventData.block;

    // Verifica si el bloque eliminado es un tronco
    if (allowedLogs.includes(brokenBlockPerm.type.id)) {
        const doDecay = checkForLogsAround(block);

        if (!doDecay)checkAndDecayLeavesAround(block);
        
    }
});



export function checkAndDecayLeavesAround(block) {
    const adjacentBlocks = [
        block.north(),
        block.south(),
        block.east(),
        block.west(),
        block.above(),
        block.below()
    ];

    for (const adjacentBlock of adjacentBlocks) {
        if (adjacentBlock && adjacentBlock.hasTag("leaves")) {
            adjacentBlock.setPermutation(adjacentBlock.permutation.withState('ancients:decay', true));
        }
    }
}

export function checkForLogsAround(block) {
    const adjacentBlocks = [
        block.north(),
        block.south(),
        block.east(),
        block.west(),
        block.above(),
        block.below()
    ];

    let isLogNear = false

    for (const adjacentBlock of adjacentBlocks) {
        if (adjacentBlock && adjacentBlock.hasTag("log")) {
            isLogNear = true
        }
    }

    return isLogNear;
}

export function checkForLogsAroundLeaves(block) {
    const adjacentBlocks = [
        block.north(),
        block.north().east(),
        block.north().west(),
        block.south(),
        block.south().east(),
        block.south().west(),
        block.east(),
        block.west(),
        block.above(),
        block.below(),
        block.north(2),
        block.north(2).east(),
        block.north(2).west(),
        block.south(2),
        block.south(2).east(),
        block.south(2).west(),
        block.east(2),
        block.east(2).north(),
        block.east(2).south(),
        block.west(2),
        block.west(2).north(),
        block.west(2).south(),
    ];

    let isLogNear = false

    for (const adjacentBlock of adjacentBlocks) {
        if (adjacentBlock && adjacentBlock.hasTag("log")) {
            isLogNear = true
        }
    }

    return isLogNear;
}


