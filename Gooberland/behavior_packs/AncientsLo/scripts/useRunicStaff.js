import { ItemStack, system, TicksPerSecond, world } from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe((initEvent) => {
    initEvent.itemComponentRegistry.registerCustomComponent("ancients:use_runic_staff", {
        onUse: (event) => {
            const player = event.source;
            const item = event.itemStack;
            const equippable = player.getComponent("equippable")
            const helmet = equippable.getEquipmentSlot("Head")
            let durabilityDamage = 2
            let monsterDamage = 1
            let hasMask = false
            let sneakSpellCooldown = 3
            if (helmet.getItem() && helmet.getItem().typeId == "ancients:forest_guardian_mask") {
                durabilityDamage = 1
                monsterDamage = 2
                hasMask = true
            }

            if (item.getLore().join("\n").includes("Forest Essence")) {
                if (player.isSneaking){
                    player.startItemCooldown("staff", TicksPerSecond * sneakSpellCooldown);
                    const entities = player.dimension.getEntities({maxDistance: 10,minDistance: 1 , location: player.location, families: ["monster"]})
                    let timeHolder = Timer.set(10, "seconds");
                    for (const entity of entities){
                        entity.setDynamicProperty("ancients:runic", true)
                    } 
                    let intervalId = system.runInterval(() => {
                        let isExpired = Timer.hasExpired(timeHolder);                
                        for (const entity of entities){
                            if(entity.isValid()){
                                entity.dimension.spawnParticle("ancients:active_pillar",{x:entity.location.x, y: entity.location.y + 0.5, z:entity.location.z})
                                entity.applyDamage(monsterDamage,{cause: "magic", damagingEntity: player})
                            }
                        } 
                        if (isExpired) {
                            for (const entity of entities){
                                if(entity.isValid()){
                                    entity.setDynamicProperty("ancients:runic", false)
                                }
                            } 
                            system.clearRun(intervalId)
                        }
                    }, 20);
                    for (const entity of entities){
                        entity.dimension.spawnParticle("ancients:active_pillar",entity.location)
                    } 
                    player.dimension.playSound("mob.evocation_illager.prepare_attack",player.location,{volume: 1.0})
                }
                else{
                    player.startItemCooldown("staff", 0);
                    let viewVector = player.getViewDirection();
                    const playerRotation = player.getRotation();
                    if (playerRotation.x > 30)
                        viewVector = {
                            x: viewVector.x * 3,
                            y: viewVector.y * 3,
                            z: viewVector.z * 3
                        };
                    const spawnLoc = {
                        x: player.getHeadLocation().x + viewVector.x,
                        y: player.getHeadLocation().y + viewVector.y,
                        z: player.getHeadLocation().z + viewVector.z
                    };
                    const projectile = player.dimension.spawnEntity("ancients:runic_orbe", spawnLoc);
                    projectile.setRotation({ 'x': -playerRotation.x, 'y': -playerRotation.y });
                    const viewVectorVelocity = {
                        x: viewVector.x * 3,
                        y: viewVector.y * 3,
                        z: viewVector.z * 3
                    };
                    projectile.applyImpulse(viewVectorVelocity);
                }

                const durability = item.getComponent("durability");
                durability.damage += durabilityDamage;
                if (durability.damage >= 200){
                    equippable.setEquipment("Mainhand", new ItemStack("ancients:runic_staff",1))
                    player.dimension.playSound("random.break",player.location,{volume: 1.0})
                }
                else equippable.setEquipment("Mainhand",item)
                
                player.dimension.spawnParticle("minecraft:knockback_roar_particle",player.location)
                player.dimension.playSound("mob.evocation_illager.cast_spell",player.location,{volume: 0.5})
            }
            else{
                player.sendMessage("This staff does not have any ability. Use the forest altar.")
                player.startItemCooldown("staff", 1);
            }
            
        }
    });
});