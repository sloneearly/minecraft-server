import { world } from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe((initEvent) => {
    initEvent.blockComponentRegistry.registerCustomComponent("ancients:stair", {
        beforeOnPlayerPlace: e => {
            const { player, block, face, permutationToPlace, dimension } = e;
            e.permutationToPlace = permutationToPlace.withState('ancients:item', true);
            // Your code here
        },
    });
});