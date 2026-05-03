import { world } from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe((initEvent) => {
    initEvent.blockComponentRegistry.registerCustomComponent("ancients:interact", {
        beforeOnPlayerPlace: e => {
            const { player, block, face, permutationToPlace, dimension } = e;
            if (block.above().hasTag("ancientPillar") && block.below().hasTag("ancientPillar")){
                e.permutationToPlace = e.permutationToPlace.withState("ancients:type","mid")
            }
            if (block.below().hasTag("ancientPillar") && !block.above().hasTag("ancientPillar")){
                e.permutationToPlace = e.permutationToPlace.withState("ancients:type","top")
            }
            if (block.above().hasTag("ancientPillar") && !block.above(2).hasTag("ancientPillar"))block.above().setPermutation(block.above().permutation.withState("ancients:type","top"))
            if (block.below().hasTag("ancientPillar") && block.below(2).hasTag("ancientPillar"))block.below().setPermutation(block.below().permutation.withState("ancients:type","mid"))
            if (block.above().hasTag("ancientPillar") && block.above(2).hasTag("ancientPillar"))block.above().setPermutation(block.above().permutation.withState("ancients:type","mid"))   
            
        },
        onPlayerDestroy: e => {
            const { player, block, dimension, destroyedBlockPermutation } = e;
            if (block.above().hasTag("ancientPillar") && block.above(2).hasTag("ancientPillar"))block.above().setPermutation(block.above().permutation.withState("ancients:type","bottom"))
            if (block.below().hasTag("ancientPillar") && block.below(2).hasTag("ancientPillar"))block.below().setPermutation(block.below().permutation.withState("ancients:type","top"))
            if (destroyedBlockPermutation.getState("ancients:powered") == true && destroyedBlockPermutation.getState("ancients:type") == "top")block.below().setPermutation(block.below().permutation.withState("ancients:powered", false))
        },
        onTick: e => {
            const { block, dimension } = e;

            if(!block.above().hasTag("ancientPillar")) return;

            const isTop = block.permutation.getState("ancients:type") === "top" ? true : false
            if (isTop) return;

            const isPowered = block.above().permutation.getState("ancients:powered")
            if (isPowered)block.setPermutation(block.permutation.withState("ancients:powered", true))
            else {
                block.setPermutation(block.permutation.withState("ancients:powered", false))
            }
        },
    });
});