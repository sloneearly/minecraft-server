import { world, BlockPermutation, ItemStack, GameMode, system } from '@minecraft/server';

world.afterEvents.playerBreakBlock.subscribe(eventData => {
    const player = eventData.player;
    const brokenBlock = eventData.brokenBlockPermutation;
    const block = eventData.block

    if (block.north().hasTag("ancients:fence")) block.north().setPermutation(block.north().permutation.withState("ancient:south", false));
    if (block.south().hasTag("ancients:fence")) block.south().setPermutation(block.south().permutation.withState("ancient:north", false));
    if (block.east().hasTag("ancients:fence")) block.east().setPermutation(block.east().permutation.withState("ancient:west", false));
    if (block.west().hasTag("ancients:fence")) block.west().setPermutation(block.west().permutation.withState("ancient:east", false));

});

world.afterEvents.playerPlaceBlock.subscribe(eventData => {
    const block = eventData.block

    const allowedBlock = !excludeBlocksArrayFence.includes(block?.typeId);


    if (!allowedBlock) return;

    if (block.north().hasTag("ancients:fence")) block.north().setPermutation(block.north().permutation.withState("ancient:south", true));
    if (block.south().hasTag("ancients:fence")) block.south().setPermutation(block.south().permutation.withState("ancient:north", true));
    if (block.east().hasTag("ancients:fence")) block.east().setPermutation(block.east().permutation.withState("ancient:west", true));
    if (block.west().hasTag("ancients:fence")) block.west().setPermutation(block.west().permutation.withState("ancient:east", true));

});

world.beforeEvents.worldInitialize.subscribe((initEvent) => {
    initEvent.blockComponentRegistry.registerCustomComponent("ancients:fence_place", {
        beforeOnPlayerPlace: e => {
            const { player, block, face, permutationToPlace, dimension } = e;

            const north = block.north();
            const east = block.east();
            const south = block.south();
            const west = block.west();

            const northConnects = !excludeBlocksArrayFence.includes(north?.typeId);
            const eastConnects = !excludeBlocksArrayFence.includes(east?.typeId);
            const southConnects = !excludeBlocksArrayFence.includes(south?.typeId);
            const westConnects = !excludeBlocksArrayFence.includes(west?.typeId);
            
            if (north.hasTag("ancients:fence")) north.setPermutation(north.permutation.withState("ancient:south", true));
            if (south.hasTag("ancients:fence")) south.setPermutation(south.permutation.withState("ancient:north", true));
            if (east.hasTag("ancients:fence")) east.setPermutation(east.permutation.withState("ancient:west", true));
            if (west.hasTag("ancients:fence")) west.setPermutation(west.permutation.withState("ancient:east", true));

            e.permutationToPlace = BlockPermutation.resolve(permutationToPlace.type.id, {"ancient:placed_bit": 1, "ancient:north": northConnects ? true : false, "ancient:south": southConnects ? true : false, "ancient:east": eastConnects ? true : false, "ancient:west": westConnects ? true : false});
        },
    });
});


export const excludeBlocksArrayFence = [
    'minecraft:air',
    'minecraft:wooden_door', 
    'minecraft:iron_door', 
    'minecraft:acacia_door', 
    'minecraft:birch_door', 
    'minecraft:crimson_door', 
    'minecraft:dark_oak_door', 
    'minecraft:jungle_door', 
    'minecraft:oak_door', 
    'minecraft:spruce_door', 
    'minecraft:warped_door', 
    'minecraft:mangrove_door',
    'minecraft:cherry_door',
    'minecraft:bamboo_door',
    'minecraft:iron_trapdoor', 
    'minecraft:acacia_trapdoor', 
    'minecraft:birch_trapdoor', 
    'minecraft:crimson_trapdoor', 
    'minecraft:dark_oak_trapdoor', 
    'minecraft:jungle_trapdoor', 
    'minecraft:oak_trapdoor', 
    'minecraft:spruce_trapdoor', 
    'minecraft:warped_trapdoor',
    'minecraft:mangrove_trapdoor',
    'minecraft:cherry_trapdoor',
    'minecraft:bamboo_trapdoor',
    'minecraft:trapdoor', 
    'minecraft:glass',
    'minecraft:glass_pane',
    'minecraft:soul_campfire',
    'minecraft:campfire',
    'ancients:ancient_forest_pillar',
    'ancients:ancient_forest_pillar_mossy',
    'ancients:ancient_forest_pillar_cracked'
];