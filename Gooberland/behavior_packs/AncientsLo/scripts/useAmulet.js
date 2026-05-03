import { ItemStack, system, TicksPerSecond, world } from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe((initEvent) => {
    initEvent.itemComponentRegistry.registerCustomComponent("ancients:use_amulet", {
        onUse: (event) => {
            const source = event.source;
            const item = event.itemStack;
            const equippable = source.getComponent("equippable")
            if (item.getLore().join("\n").includes("Forest Vitality")) {
                source.startItemCooldown("amulet", TicksPerSecond * 60);
                source.addEffect("regeneration", 200, { amplifier: 1 });
                const durability = item.getComponent("durability");
                durability.damage++;
                if (durability.damage >= 5){
                    equippable.setEquipment("Mainhand", new ItemStack("ancients:iron_amulet",1))
                }
                else equippable.setEquipment("Mainhand",item)
                
                source.dimension.spawnParticle("minecraft:knockback_roar_particle",source.location)
                source.dimension.playSound("mob.evocation_illager.cast_spell",source.location,{volume: 1.0})
            }
            else {
                source.sendMessage("This amulet does not have any ability. Use the forest altar."); 
                source.startItemCooldown("amulet", 1);
            }
            
            
            
            
        }
    });
});