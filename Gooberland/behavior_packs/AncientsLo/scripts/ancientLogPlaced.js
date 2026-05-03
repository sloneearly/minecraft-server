import { world, BlockPermutation, ItemStack } from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe((initEvent) => {
    initEvent.blockComponentRegistry.registerCustomComponent("ancients:runicPlace", {
        beforeOnPlayerPlace: e => {
            const { player, block, face, permutationToPlace, dimension } = e
            if (player.getGameMode() == "creative") return;
            e.permutationToPlace = e.permutationToPlace.withState("ancient:player_place",true)
        },
        onPlace: e => {
            const { block, dimension, previousBlock } = e;
            if (block.permutation.getState("ancient:player_place")) return;

            const random = Math.random() * 100
            if (random < 20) {
                block.setPermutation(block.permutation.withState("ancient:runic", true));
            }
        },
        onTick: e => {
            const { block, dimension } = e;
            const isPlacedByPlayer = block.permutation.getState("ancient:player_place");
            if (isPlacedByPlayer) return;
            if (block.typeId == "minecraft:air") return;
            const random = Math.random() * 100
            if (random > 10) return;
            block.setPermutation(block.permutation.withState("ancient:runic", true));
            block.setPermutation(block.permutation.withState("ancient:player_place", true));
        }


    });
});

