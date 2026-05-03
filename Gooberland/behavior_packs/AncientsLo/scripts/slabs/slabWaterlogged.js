
import { world, ItemStack, system, BlockPermutation } from '@minecraft/server';

world.beforeEvents.itemUseOn.subscribe(eventData => {
    const { itemStack: item, source: player, block, blockFace: face } = eventData;
    const pattern = /^ancients:.*_slab$/;

    if (!pattern.test(block.typeId)) return;

    if (item?.typeId === 'minecraft:water_bucket' && !block.permutation.getState('ancients:waterlogged') && !block.permutation.getState('ancients:double')) {
        const equipment = player.getComponent('equippable');
        const verticalHalf = block.permutation.getState('minecraft:vertical_half');
        const slabType = block.typeId.split(':')[1];
        const structureName = (verticalHalf === 'bottom') ? `mystructure:${slabType}_bottomSlab` : `mystructure:${slabType}_topSlab`;
        const { x, y, z } = block;

        system.run( () => {
            block.setPermutation(block.permutation.withState('ancients:waterlogged', true));
            world.structureManager.place(structureName, player.dimension, { x, y, z });
            player.playSound('bucket.empty_water');
            if (player.getGameMode() !== "creative") {
                equipment.setEquipment('Mainhand', new ItemStack('minecraft:bucket', 1));
            }
        })
        eventData.cancel = true
    }

});

