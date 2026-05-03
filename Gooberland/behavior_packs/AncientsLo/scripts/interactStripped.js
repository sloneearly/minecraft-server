import { world, BlockPermutation, ItemStack, GameMode, system } from '@minecraft/server';

world.beforeEvents.itemUseOn.subscribe(eventData => {
    const player = eventData.source;
    const block = eventData.block;
    const equipment = player.getComponent('equippable');
    const selectedItem = equipment.getEquipment('Mainhand');

    if (!selectedItem?.hasTag('minecraft:is_axe')) return;

    if ( !block.hasTag("customStripped") ) return;

    const blockState = block.permutation.getState("minecraft:block_face");

    const strippedName = block.typeId + '_stripped'

    system.run( () => {

        if(block.permutation.getState("ancient:runic")){
            block.dimension.spawnLoot(ancientBark,block.location)
        }

        if (blockState) {
            const strippedLog = BlockPermutation.resolve(strippedName, {"minecraft:block_face": blockState});
                    
            block.setPermutation(strippedLog);
        }
    
        player.playSound('step.wood');
    
        if (player.matches({ gameMode: GameMode.creative }))return;
    
        const durability = selectedItem.getComponent('durability');
    
        if (durability && durability.damage < durability.maxDurability) {
            durability.damage++;
                    
            equipment.setEquipment('Mainhand', selectedItem);
        }
    
        if (durability && durability.damage >= durability.maxDurability) {
            player.playSound('random.break');
                    
            equipment.setEquipment('Mainhand', new ItemStack('minecraft:air', 1));
        }
    })



});

export const ancientBark = {
    pools: [
    {
        rolls: 1,
        entries: [
            {
                item: 'ancients:ancient_mystic_bark',
                count: { min: 1, max: 2 }
            }
        ]
    }
    ]
}