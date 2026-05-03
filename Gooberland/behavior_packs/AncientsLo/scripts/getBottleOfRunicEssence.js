import { system, world, ItemStack } from "@minecraft/server";

world.beforeEvents.playerInteractWithEntity.subscribe( (event) => {
    const player = event.player
    const entity = event.target
    const item = event.itemStack

    const hasRunicEffect = entity.getDynamicProperty("ancients:runic")

    if (!hasRunicEffect) return;
    
    const equipment = player.getComponent('equippable');

    if (item && item.typeId == "minecraft:glass_bottle") {
        system.run(() => {
            const newItem = new ItemStack("ancients:bottle_of_runic_essence", 1);
            newItem.setLore(['§r§7Runic (0:40)§r\n','§r§5When Applied:','§r§9Allows advanced transformations in the Altar'])
            if (item.amount == 1){
                equipment.setEquipment('Mainhand', newItem);
            }
            else{
                item.amount -= 1
                player.getComponent("inventory").container.addItem(newItem)
                equipment.setEquipment('Mainhand', item);
            }
            player.dimension.playSound("bottle.dragonbreath",player.location,{volume: 0.5})
            entity.setDynamicProperty("ancients:runic",false)
        })
        
    }
})