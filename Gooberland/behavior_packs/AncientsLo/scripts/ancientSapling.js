import { world, GameMode } from '@minecraft/server';

world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('ancients:bone_meal', {
        onPlayerInteract(e) {
            const { block, player } = e;

            const equipment = player.getComponent('equippable');
            const selectedItem = equipment.getEquipment('Mainhand');

            if (selectedItem && (selectedItem.typeId === 'minecraft:bone_meal')) {

                block.dimension.spawnParticle('minecraft:crop_growth_emitter', block.center());
                block.dimension.playSound("item.bone_meal.use", block.center());

                if (player.matches({ gameMode: GameMode.survival })) {
                    if (selectedItem.amount > 1) {
                        selectedItem.amount -= 1;
                        equipment.setEquipment('Mainhand', selectedItem);
                    } else {
                        equipment.setEquipment('Mainhand', undefined);
                    }
                }

                let random = Math.random()

                if(random > 0.7 && random < 0.85 || player.matches({ gameMode: GameMode.creative })) {
                    const treeType = trees[block.typeId]
                    normalTreeDesing(block,treeType.log,treeType.leave)
                }
            }
        },
        onRandomTick: e => {
            const { block, dimension } = e;
            for (let y = 1; y <= 5; y++){
                if(block.above(y).isSolid || block.above(y).hasTag("ancients:isSolid")){
                    return
                }
            }

            let random = Math.random()

            if(random > 0.7 && random < 0.85) {
                const treeType = trees[block.typeId]
                normalTreeDesing(block,treeType.log,treeType.leave)
            }
        },
    });
});


export function normalTreeDesing(block, log, leave) {
    const { x, y, z } = block.location;
    const dimension = block.dimension;
    
    dimension.runCommandAsync(`setblock ${x} ${y} ${z} air replace`);
    dimension.runCommandAsync(`fill ${x} ${y-1} ${z} ${x} ${y-1} ${z} dirt replace grass`);

    dimension.runCommandAsync(`fill ${x} ${y} ${z} ${x} ${y+4} ${z} ${log} replace air`);

    dimension.runCommandAsync(`fill ${x+2} ${y+2} ${z+2} ${x-2} ${y+2} ${z-2} ${leave} replace air`);
    dimension.runCommandAsync(`fill ${x+2} ${y+3} ${z+2} ${x-2} ${y+3} ${z-2} ${leave} replace air`);

    dimension.runCommandAsync(`fill ${x+2} ${y+2} ${z+2} ${x+2} ${y+2} ${z+2} air replace ${leave}`);
    dimension.runCommandAsync(`fill ${x-2} ${y+2} ${z-2} ${x-2} ${y+2} ${z-2} air replace ${leave}`);
    dimension.runCommandAsync(`fill ${x+2} ${y+2} ${z-2} ${x+2} ${y+2} ${z-2} air replace ${leave}`);
    dimension.runCommandAsync(`fill ${x-2} ${y+2} ${z+2} ${x-2} ${y+2} ${z+2} air replace ${leave}`);

    dimension.runCommandAsync(`fill ${x+1} ${y+4} ${z+1} ${x-1} ${y+4} ${z-1} ${leave} replace air`);
    dimension.runCommandAsync(`fill ${x+1} ${y+4} ${z-1} ${x+1} ${y+4} ${z-1} air replace ${leave}`);
    dimension.runCommandAsync(`fill ${x-1} ${y+4} ${z+1} ${x-1} ${y+4} ${z+1} air replace ${leave}`);

    dimension.runCommandAsync(`fill ${x+1} ${y+5} ${z+1} ${x-1} ${y+5} ${z-1} ${leave} replace air`);
    dimension.runCommandAsync(`fill ${x+1} ${y+5} ${z+1} ${x+1} ${y+5} ${z+1} air replace ${leave}`);
    dimension.runCommandAsync(`fill ${x-1} ${y+5} ${z-1} ${x-1} ${y+5} ${z-1} air replace ${leave}`);
    dimension.runCommandAsync(`fill ${x+1} ${y+5} ${z-1} ${x+1} ${y+5} ${z-1} air replace ${leave}`);
    dimension.runCommandAsync(`fill ${x-1} ${y+5} ${z+1} ${x-1} ${y+5} ${z+1} air replace ${leave}`);

    dimension.runCommandAsync(`fill ${x+2} ${y+2} ${z-2} ${x+2} ${y+2} ${z-2} air replace ${leave}`);
}

export const trees = {
    "ancients:ancient_sapling": {
        log: "ancients:ancient_log",
        leave: "ancients:ancient_leaves"
    }
}
