import { system, world } from "@minecraft/server";
import './spawn_loot/spawn_loot.js';

world.beforeEvents.playerBreakBlock.subscribe( (event) => {
    const block = event.block
    const item = event.itemStack
    if (!item) return;
    if (!item.hasTag("is_pickaxe")) return;

    if (block.typeId == "ancients:deepslate_rune") {
        system.run(() => {
            block.dimension.spawnLoot(ancientDeepslatet,block.center())  
        })  
    }
})

export const ancientDeepslatet = {
    pools: [
    {
        rolls: 1,
        entries: [
            {
                item: 'ancients:ancient_rune_fragment',
                count: { min: 1, max: 3 }
            }
        ]
    }
    ]
}