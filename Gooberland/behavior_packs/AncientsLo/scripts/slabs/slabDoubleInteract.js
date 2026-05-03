import { world, ItemStack, system, BlockPermutation } from '@minecraft/server';

world.beforeEvents.itemUseOn.subscribe(eventData => {
    const { itemStack: item, source: player, block, blockFace: face } = eventData;
    const equipment = player.getComponent('equippable');
    const pattern = /^ancients:.*_slab$/;

    if (!pattern.test(item.typeId) || block.typeId != item.typeId) return;

    if (block.permutation.getState('ancients:double') ? true : false) return;

    const verticalHalf = block.permutation.getState('minecraft:vertical_half');

    if (face == 'Up' && verticalHalf == 'bottom' || face == 'Down' && verticalHalf == 'top') {
        system.run( () => {
            block.setPermutation(BlockPermutation.resolve(item.typeId, {"ancients:double": true, "ancients:waterlogged": false}));
        })
    }
    else return;

    const soundId = block.hasTag("wood") ? "use.wood" : "use.stone";


    system.run( () => {
        block.dimension.playSound(soundId,block.center(),{
            pitch: 1,
            volume: 10.0,
        })
        if (player.getGameMode() !== "creative") {
            if (item.amount > 1) {
                item.amount -= 1;
                equipment.setEquipment('Mainhand', item);
            } else if (item.amount === 1) {
                equipment.setEquipment('Mainhand', undefined);
            }
        }
    })

    eventData.cancel = true

});