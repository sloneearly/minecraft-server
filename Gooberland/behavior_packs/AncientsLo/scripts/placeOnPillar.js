import { system, world, ItemStack } from "@minecraft/server";
import { removeItem } from "./placeOnAltar";
import Timer from "./timer/timerClass.js";

world.beforeEvents.worldInitialize.subscribe((initEvent) => {
    initEvent.itemComponentRegistry.registerCustomComponent("ancients:place_on_pillar", {
        onUseOn: (event) => {
            const block = event.block;
            const player = event.source;
            if (!block.hasTag("ancientPillar"))return;

            const blockPerm = block.permutation.getState("ancients:type")

            if (blockPerm != "top") return;

            const entities = block.dimension.getEntitiesAtBlockLocation(block.center())

            let spawnItemPillar = true

            for (const entity of entities){
                if (entity.typeId == "ancients:pillar_item"){
                    spawnItemPillar = false
                }
            }

            if (!spawnItemPillar) return;

            const facing = event.blockFace

            const pillarItem = block.dimension.spawnEntity("ancients:pillar_item",{x:block.center().x, y: block.center().y + 0.4, z:block.center().z})
            const itemHolding = event.itemStack

            if (facing == "East" || facing == "West") pillarItem.setRotation({x:0,y:90})
            
            
            switch (itemHolding.typeId){
                case "ancients:ancient_mystic_bark":
                    pillarItem.triggerEvent("ancient_bark")
                    break;
                case "ancients:runic_apple":
                    pillarItem.triggerEvent("runic_apple")
                    break;
                case "ancients:bottle_of_runic_essence":
                    pillarItem.triggerEvent("runic_essence")
                    break;
                case "ancients:runic_essence":
                    pillarItem.triggerEvent("runic_essence_dust")
                    break;
                case "ancients:ancient_rune_charged":
                    pillarItem.triggerEvent("ancient_rune_charged")
                    break;
                case "ancients:forest_guardian_mask_item":
                    pillarItem.triggerEvent("forest_guardian_mask")
                    pillarItem.setDynamicProperty("isRunic",true)
                    break;
            }

            removeItem(player,itemHolding);

            pillarItem.setDynamicProperty("pillarItem",itemHolding.typeId)
            

            block.setPermutation(block.permutation.withState("ancients:powered", true))
            block.dimension.playSound("respawn_anchor.charge",block.center(),{volume: 1.0})
        }
    });
    initEvent.blockComponentRegistry.registerCustomComponent("ancients:spawn_mask", {
        onTick: (event) => {
            const block = event.block;

            const isHolder = block.permutation.getState("ancients:mask_holder")

            if (!isHolder) return;

            const blockPerm = block.permutation.getState("ancients:type")

            if (blockPerm != "top") return;
            
            const entities = block.dimension.getEntitiesAtBlockLocation(block.center())

            let spawnItemPillar = true

            for (const entity of entities){
                if (entity.typeId == "ancients:pillar_item"){
                    spawnItemPillar = false
                }
            }

            if (!spawnItemPillar) return;

            const pillarItem = block.dimension.spawnEntity("ancients:pillar_item",{x:block.center().x, y: block.center().y + 0.4, z:block.center().z})
            pillarItem.triggerEvent("forest_guardian_mask")
            pillarItem.setDynamicProperty("isRunic",true)
            block.setPermutation(block.permutation.withState("ancients:mask_holder", false))

            
        }
    });
    initEvent.itemComponentRegistry.registerCustomComponent("ancients:forest_guardian_mask", {
        onUse: (event) => {
            const player = event.source
            const item = event.itemStack
            const Mask = new ItemStack("ancients:forest_guardian_mask",1);
            const equipment = player.getComponent('equippable');
            equipment.setEquipment('Mainhand', Mask);

            
        }
    });
});

world.beforeEvents.playerInteractWithBlock.subscribe( (event) => {
    if (!event.isFirstEvent)return;
    const block = event.block
    const player = event.player
    if (block.hasTag("ancientPillar") && block.permutation.getState("ancients:powered") && block.permutation.getState("ancients:type") == "top" ) {
        const entities = block.dimension.getEntitiesAtBlockLocation(block.center())

        for (const entity of entities){
            if (entity.typeId == "ancients:pillar_item" && entity.getDynamicProperty("isRunic") && !player.getDynamicProperty("ancients:runic_plus")){
                player.sendMessage("§e[D]§r You are not worthy to wear the mask")
                return;
            }
            else if (entity.getDynamicProperty("isRunic") && player.getDynamicProperty("ancients:runic_plus")){
                player.sendMessage("§a[A]§r The time has come...")

                system.run(() => {
                    entity.addEffect("levitation",100,{showParticles: false})
                    block.dimension.playSound("mob.evocation_illager.prepare_summon",block.center(),{volume: 1.0})
                })


                let timeHolder = Timer.set(7, "seconds");
                let intervalId = system.runInterval(() => {
                    let isExpired = Timer.hasExpired(timeHolder);                
                    let elapsed = Timer.elapsed(timeHolder);
        
                    if (elapsed.seconds == 5) {
                        entity.dimension.spawnParticle("minecraft:knockback_roar_particle",entity.location)
                        entity.triggerEvent("die")
                        const Mask = new ItemStack("ancients:forest_guardian_mask",1);
                        //Mask.setLore(['§r§5When Equipped:','§r§9Improves uses and damage of the Runic Staff'])
                        entity.dimension.spawnItem(Mask,entity.location)
                        block.dimension.playSound("mob.evocation_illager.cast_spell",block.center(),{volume: 1.0})
                        block.dimension.playSound("respawn_anchor.set_spawn",block.center(),{volume: 1.0})
                    }
        
                    if (elapsed.seconds < 5) {
                        entity.dimension.spawnParticle("ancients:active_pillar",entity.location)
                    }
        
                    if (isExpired) {
                        block.setPermutation(block.permutation.withState("ancients:powered", false))
                        
                        system.clearRun(intervalId)
        
                    }
                }, 20);                
            }
            if (entity.typeId == "ancients:pillar_item" && !entity.getDynamicProperty("isRunic") && !entity.getDynamicProperty("ancients:cooldown")){
                
                system.run(() => {
                    entity.triggerEvent("block_on_break")
                    block.setPermutation(block.permutation.withState("ancients:powered",false))
                    block.dimension.playSound("respawn_anchor.deplete",block.center(),{volume: 1.0})
                })
                
            }
            if (entity.getDynamicProperty("ancients:cooldown")){
                player.sendMessage("§e[D]§r You cannot interrupt the transformation")
            }
        }        
    }
})

world.beforeEvents.playerBreakBlock.subscribe( (event) => {
    const block = event.block
    const player = event.player
    if (block.hasTag("ancientPillar") && block.permutation.getState("ancients:powered") && block.permutation.getState("ancients:type") == "top" ) {
        const entities = block.dimension.getEntitiesAtBlockLocation(block.center())

        for (const entity of entities){
            if (entity.getDynamicProperty("isRunic") && !player.getDynamicProperty("ancients:runic_plus")){
                player.sendMessage("§e[D]§r You don't have the strength to wear the mask.")
                event.cancel = true
                return;
            }
            if (entity.getDynamicProperty("ancients:cooldown")){
                player.sendMessage("§e[D]§r You cannot interrupt the transformation")
                event.cancel = true
                return;
            }
        }        
    }
})