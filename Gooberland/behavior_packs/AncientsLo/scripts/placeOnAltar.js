import { system, world, ItemStack } from "@minecraft/server";
import Timer from "./timer/timerClass.js";

world.beforeEvents.worldInitialize.subscribe((initEvent) => {
    initEvent.itemComponentRegistry.registerCustomComponent("ancients:place_on_altar", {
        onUseOn: (event) => {
            const block = event.block;
            const player = event.source;
            if (!block.hasTag("ancientAltar"))return;

            const entities = block.dimension.getEntitiesAtBlockLocation(block.center())

            let spawnItemAltar = true

            for (const entity of entities){
                if (entity.typeId == "ancients:pillar_item"){
                    spawnItemAltar = false
                }
            }

            if (!spawnItemAltar) return;

            const facing = event.blockFace

            const pillarItem = block.dimension.spawnEntity("ancients:pillar_item",{x:block.center().x, y: block.center().y + 0.4, z:block.center().z})
            const itemHolding = event.itemStack

            if (facing == "East" || facing == "West") pillarItem.setRotation({x:0,y:90})
            
            switch (itemHolding.typeId){
                case "ancients:ancient_rune":
                    pillarItem.triggerEvent("ancient_rune")
                    break;
            }
            removeItem(player,itemHolding);
            block.dimension.playSound("respawn_anchor.set_spawn",block.center(),{volume: 1.0})
        }
    });
});

world.beforeEvents.playerInteractWithBlock.subscribe( (event) => {
    if (!event.isFirstEvent)return;
    const player = event.player
    const block = event.block

    if (block.typeId != "ancients:ancient_forest_altar") return;

    const item = event.itemStack

    const entities = block.dimension.getEntities({maxDistance: 7,minDistance: 3 , location: block.center(), excludeTypes: ["minecraft:player"]})

    const facing = event.blockFace

    let isBark = false; let isRunicApple = false; let isRunicDustEssence = false; let isBottleOfRunicEssence = false; let isAncientRuneCharged = false
    let barkEntity = undefined;
    let runicDustCount = []; let ancientRuneCharged = [];
    

    for (const entity of entities){
        let whatItem = entity.getDynamicProperty("pillarItem")
        if (whatItem == "ancients:ancient_mystic_bark") {
            isBark = true
            barkEntity = entity
        }
        if (whatItem == "ancients:runic_apple") isRunicApple = true
        if (whatItem == "ancients:runic_essence") {
            isRunicDustEssence = true
            runicDustCount.push(entity)
        }
        if (whatItem == "ancients:bottle_of_runic_essence") isBottleOfRunicEssence = true
        if (whatItem == "ancients:ancient_rune_charged") {
            isAncientRuneCharged = true
            ancientRuneCharged.push(entity)
        }
    }

    if (block.permutation.getState("ancients:cooldown")) return;

    if (item && isBark && item.typeId == "minecraft:glowstone_dust") {
        let pillarItem = undefined;
        system.run(() => {
            removeItem(player,item)
            block.setPermutation(block.permutation.withState("ancients:cooldown", true))
            pillarItem = block.dimension.spawnEntity("ancients:pillar_item",{x:block.center().x, y: block.center().y + 0.4, z:block.center().z})
            if (facing == "East" || facing == "West") pillarItem.setRotation({x:0,y:90})
            pillarItem.triggerEvent("glowstone_dust")
            pillarItem.addEffect("levitation",100,{showParticles: false})
            block.dimension.playSound("block.end_portal_frame.fill",block.center(),{volume: 1.0})
            block.dimension.playSound("mob.evocation_illager.prepare_summon",block.center(),{volume: 1.0})
            barkEntity.setDynamicProperty("ancients:cooldown",true)
        })
        

        let timeHolder = Timer.set(7, "seconds");
        let intervalId = system.runInterval(() => {
            let isExpired = Timer.hasExpired(timeHolder);                
            let elapsed = Timer.elapsed(timeHolder);

            if (elapsed.seconds == 5) {
                pillarItem.triggerEvent("runic_essence_dust")
                pillarItem.dimension.spawnParticle("minecraft:knockback_roar_particle",pillarItem.location)
                pillarItem.triggerEvent("die")
                block.dimension.playSound("mob.evocation_illager.cast_spell",block.center(),{volume: 1.0})
                const Dust = new ItemStack("ancients:runic_essence",1);
                pillarItem.dimension.spawnItem(Dust,pillarItem.location)
            }

            if (elapsed.seconds < 5) {
                pillarItem.dimension.spawnParticle("ancients:active_pillar",pillarItem.location)
            }

            barkEntity.dimension.spawnParticle("ancients:active_pillar",barkEntity.location)

            if (isExpired) {
                barkEntity.triggerEvent("die")
                barkEntity.dimension.playSound("respawn_anchor.deplete",barkEntity.location,{volume: 1.0})
                const pillarBlock = barkEntity.dimension.getBlock(barkEntity.location)
                pillarBlock.setPermutation(pillarBlock.permutation.withState("ancients:powered", false))
                block.setPermutation(block.permutation.withState("ancients:cooldown", false))
                system.clearRun(intervalId)

            }
        }, 20);
    }
    if (item && isRunicDustEssence && item.typeId == "ancients:iron_amulet" && runicDustCount.length >= 4) {
        let pillarItem = undefined;
        system.run(() => {
            removeItem(player,item)
            block.setPermutation(block.permutation.withState("ancients:cooldown", true))
            pillarItem = block.dimension.spawnEntity("ancients:pillar_item",{x:block.center().x, y: block.center().y + 0.4, z:block.center().z})
            if (facing == "East" || facing == "West") pillarItem.setRotation({x:0,y:90})
            pillarItem.triggerEvent("iron_amulet")
            pillarItem.addEffect("levitation",100,{showParticles: false})
            block.dimension.playSound("block.end_portal_frame.fill",block.center(),{volume: 1.0})
            block.dimension.playSound("mob.evocation_illager.prepare_summon",block.center(),{volume: 1.0})
        })
        

        let timeHolder = Timer.set(7, "seconds");
        let intervalId = system.runInterval(() => {
            let isExpired = Timer.hasExpired(timeHolder);                
            let elapsed = Timer.elapsed(timeHolder);

            if (elapsed.seconds == 5) {
                pillarItem.dimension.spawnParticle("minecraft:knockback_roar_particle",pillarItem.location)
                pillarItem.triggerEvent("die")
                const Amulet = new ItemStack("ancients:iron_amulet_powered",1);
                Amulet.setLore(['§r§9Forest Vitality§r'])
                pillarItem.dimension.spawnItem(Amulet,pillarItem.location)
                block.dimension.playSound("mob.evocation_illager.cast_spell",block.center(),{volume: 1.0})
            }

            if (elapsed.seconds < 5) {
                pillarItem.dimension.spawnParticle("ancients:active_pillar",pillarItem.location)
            }

            for (let i = 0; i < 4; i++) {
                if (!runicDustCount[i].getDynamicProperty("ancients:cooldown"))runicDustCount[i].setDynamicProperty("ancients:cooldown",true)
                runicDustCount[i].dimension.spawnParticle("ancients:active_pillar",runicDustCount[i].location)
            }

            if (isExpired) {
                for (let i = 0; i < 4; i++) {
                    runicDustCount[i].triggerEvent("die")
                    runicDustCount[i].dimension.playSound("respawn_anchor.deplete",runicDustCount[i].location,{volume: 1.0})
                    const pillarBlock = runicDustCount[i].dimension.getBlock(runicDustCount[i].location)
                    pillarBlock.setPermutation(pillarBlock.permutation.withState("ancients:powered", false))
                }
                block.setPermutation(block.permutation.withState("ancients:cooldown", false))
                system.clearRun(intervalId)

            }
        }, 20);
    }
    if (item && isRunicDustEssence && item.typeId == "minecraft:golden_apple" && runicDustCount.length >= 8) {
        let pillarItem = undefined;
        system.run(() => {
            removeItem(player,item)
            block.setPermutation(block.permutation.withState("ancients:cooldown", true))
            pillarItem = block.dimension.spawnEntity("ancients:pillar_item",{x:block.center().x, y: block.center().y + 0.4, z:block.center().z})
            if (facing == "East" || facing == "West") pillarItem.setRotation({x:0,y:90})
            pillarItem.triggerEvent("golden_apple")
            pillarItem.addEffect("levitation",100,{showParticles: false})
            block.dimension.playSound("block.end_portal_frame.fill",block.center(),{volume: 1.0})
            block.dimension.playSound("mob.evocation_illager.prepare_summon",block.center(),{volume: 1.0})
        })
        

        let timeHolder = Timer.set(7, "seconds");
        let intervalId = system.runInterval(() => {
            let isExpired = Timer.hasExpired(timeHolder);                
            let elapsed = Timer.elapsed(timeHolder);

            if (elapsed.seconds == 5) {
                pillarItem.dimension.spawnParticle("minecraft:knockback_roar_particle",pillarItem.location)
                pillarItem.triggerEvent("die")
                const RunicApple = new ItemStack("ancients:runic_apple",1);
                pillarItem.dimension.spawnItem(RunicApple,pillarItem.location)
                block.dimension.playSound("mob.evocation_illager.cast_spell",block.center(),{volume: 1.0})
            }

            if (elapsed.seconds < 5) {
                pillarItem.dimension.spawnParticle("ancients:active_pillar",pillarItem.location)
            }

            for (let i = 0; i < 8; i++) {
                if (!runicDustCount[i].getDynamicProperty("ancients:cooldown"))runicDustCount[i].setDynamicProperty("ancients:cooldown",true)
                runicDustCount[i].dimension.spawnParticle("ancients:active_pillar",runicDustCount[i].location)
            }

            if (isExpired) {
                for (let i = 0; i < 8; i++) {
                    runicDustCount[i].triggerEvent("die")
                    runicDustCount[i].dimension.playSound("respawn_anchor.deplete",runicDustCount[i].location,{volume: 1.0})
                    const pillarBlock = runicDustCount[i].dimension.getBlock(runicDustCount[i].location)
                    pillarBlock.setPermutation(pillarBlock.permutation.withState("ancients:powered", false))
                }
                block.setPermutation(block.permutation.withState("ancients:cooldown", false))
                system.clearRun(intervalId)

            }
        }, 20);
    }
    if (item && isRunicDustEssence && item.typeId == "ancients:ancient_rune" && runicDustCount.length >= 4 && player.getDynamicProperty("ancients:runic")) {
        let pillarItem = undefined;
        system.run(() => {
            removeItem(player,item)
            block.setPermutation(block.permutation.withState("ancients:cooldown", true))
            pillarItem = block.dimension.spawnEntity("ancients:pillar_item",{x:block.center().x, y: block.center().y + 0.4, z:block.center().z})
            if (facing == "East" || facing == "West") pillarItem.setRotation({x:0,y:90})
            pillarItem.triggerEvent("ancient_rune")
            pillarItem.addEffect("levitation",100,{showParticles: false})
            block.dimension.playSound("block.end_portal_frame.fill",block.center(),{volume: 1.0})
            block.dimension.playSound("mob.evocation_illager.prepare_summon",block.center(),{volume: 1.0})
            
        })
        

        let timeHolder = Timer.set(7, "seconds");
        let intervalId = system.runInterval(() => {
            let isExpired = Timer.hasExpired(timeHolder);                
            let elapsed = Timer.elapsed(timeHolder);

            if (elapsed.seconds == 5) {
                pillarItem.dimension.spawnParticle("minecraft:knockback_roar_particle",pillarItem.location)
                pillarItem.triggerEvent("die")
                const Rune = new ItemStack("ancients:ancient_rune_charged",1);
                pillarItem.dimension.spawnItem(Rune,pillarItem.location)
                block.dimension.playSound("mob.evocation_illager.cast_spell",block.center(),{volume: 1.0})
                block.dimension.playSound("respawn_anchor.set_spawn",block.center(),{volume: 1.0})
            }

            if (elapsed.seconds < 5) {
                pillarItem.dimension.spawnParticle("ancients:active_pillar",pillarItem.location)
            }

            for (let i = 0; i < 4; i++) {
                if (!runicDustCount[i].getDynamicProperty("ancients:cooldown"))runicDustCount[i].setDynamicProperty("ancients:cooldown",true)
                runicDustCount[i].dimension.spawnParticle("ancients:active_pillar",runicDustCount[i].location)
            }

            if (isExpired) {
                for (let i = 0; i < 4; i++) {
                    runicDustCount[i].triggerEvent("die")
                    runicDustCount[i].dimension.playSound("respawn_anchor.deplete",runicDustCount[i].location,{volume: 1.0})
                    const pillarBlock = runicDustCount[i].dimension.getBlock(runicDustCount[i].location)
                    pillarBlock.setPermutation(pillarBlock.permutation.withState("ancients:powered", false))
                }
                block.setPermutation(block.permutation.withState("ancients:cooldown", false))
                
                system.clearRun(intervalId)

            }
        }, 20);
    }
    if (item && item.typeId == "ancients:runic_staff" && runicDustCount.length >= 4 && ancientRuneCharged.length >= 4 && player.getDynamicProperty("ancients:runic")) {
        let pillarItem = undefined;
        system.run(() => {
            removeItem(player,item)
            block.setPermutation(block.permutation.withState("ancients:cooldown", true))
            pillarItem = block.dimension.spawnEntity("ancients:pillar_item",{x:block.center().x, y: block.center().y + 0.7, z:block.center().z})
            if (facing == "East" || facing == "West") pillarItem.setRotation({x:0,y:90})
            pillarItem.triggerEvent("runic_staff")
            pillarItem.addEffect("levitation",100,{showParticles: false})
            block.dimension.playSound("block.end_portal_frame.fill",block.center(),{volume: 1.0})
            block.dimension.playSound("mob.evocation_illager.prepare_summon",block.center(),{volume: 1.0})
            
        })
        

        let timeHolder = Timer.set(7, "seconds");
        let intervalId = system.runInterval(() => {
            let isExpired = Timer.hasExpired(timeHolder);                
            let elapsed = Timer.elapsed(timeHolder);

            if (elapsed.seconds == 5) {
                pillarItem.dimension.spawnParticle("minecraft:knockback_roar_particle",pillarItem.location)
                pillarItem.triggerEvent("die")
                const Staff = new ItemStack("ancients:runic_staff_charged",1);
                Staff.setLore(['§r§9Forest Essence§r'])
                pillarItem.dimension.spawnItem(Staff,pillarItem.location)
                block.dimension.playSound("mob.evocation_illager.cast_spell",block.center(),{volume: 1.0})
                block.dimension.playSound("respawn_anchor.set_spawn",block.center(),{volume: 1.0})
            }

            if (elapsed.seconds < 5) {
                pillarItem.dimension.spawnParticle("ancients:active_pillar",pillarItem.location)
            }

            for (let i = 0; i < 4; i++) {
                if (!runicDustCount[i].getDynamicProperty("ancients:cooldown"))runicDustCount[i].setDynamicProperty("ancients:cooldown",true)
                if (!ancientRuneCharged[i].getDynamicProperty("ancients:cooldown"))ancientRuneCharged[i].setDynamicProperty("ancients:cooldown",true)
                runicDustCount[i].dimension.spawnParticle("ancients:active_pillar",runicDustCount[i].location)
                ancientRuneCharged[i].dimension.spawnParticle("ancients:active_pillar",ancientRuneCharged[i].location)
            }

            if (isExpired) {
                for (let i = 0; i < 4; i++) {
                    runicDustCount[i].triggerEvent("die")
                    runicDustCount[i].dimension.playSound("respawn_anchor.deplete",runicDustCount[i].location,{volume: 1.0})
                    ancientRuneCharged[i].triggerEvent("die")
                    ancientRuneCharged[i].dimension.playSound("respawn_anchor.deplete",ancientRuneCharged[i].location,{volume: 1.0})
                    const pillarBlock = runicDustCount[i].dimension.getBlock(runicDustCount[i].location)
                    pillarBlock.setPermutation(pillarBlock.permutation.withState("ancients:powered", false))
                    const pillarBlockSecond = ancientRuneCharged[i].dimension.getBlock(ancientRuneCharged[i].location)
                    pillarBlockSecond.setPermutation(pillarBlockSecond.permutation.withState("ancients:powered", false))
                }
                block.setPermutation(block.permutation.withState("ancients:cooldown", false))
                
                system.clearRun(intervalId)

            }
        }, 20);
    }

})


export function removeItem(player,item){
    const equipment = player.getComponent('equippable');

    if (player.getGameMode() !== "creative") {
        if (item.amount > 1) {
            item.amount -= 1;
            equipment.setEquipment('Mainhand', item);
        } else if (item.amount === 1) {
            equipment.setEquipment('Mainhand', undefined);
        }
    }
}

