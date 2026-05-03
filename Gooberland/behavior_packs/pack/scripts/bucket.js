import { world, system, ItemStack, ItemTypes, BlockPermutation, EquipmentSlot } from "@minecraft/server";

function getMobName(mobTypeId) {
    const name = mobTypeId.split(':')[1].replace(/_/g, ' '); // Removes the prefix and replaces underscores with spaces
    return name
        .toLowerCase() // Converts the entire string to lowercase
        .split(' ') // Split the string into words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
        .join(' '); // Joins the words back into a string
}

function getBlockByFace(face, block) {
    const blocks = {
        'Down': block.below(),
        'Up': block.above(),
        'West': block.west(),
        'East': block.east(),
        'South': block.south(),
        'North': block.north()
    };
    return blocks[face];
};

world.beforeEvents.playerInteractWithEntity.subscribe(async eventData => {
    const entity = eventData.target;
    const player = eventData.player;
    const hand = player.getComponent("equippable").getEquipment(EquipmentSlot.Mainhand);
    if (!hand) return; // Checks if the item is in hand
    const lore = hand.getLore();
    system.run(() => {
        if (entity.typeId == "wypnt_bab:nautiling" && hand.typeId == "minecraft:water_bucket" && lore.length == 0) {
        	if (entity.matches({ excludeFamilies: ["inanimate"] })) {
            const newItem = new ItemStack(ItemTypes.get("wypnt_bab:nautiling_bucket"));
            const mobName = getMobName(entity.typeId); // Use the function to get the mob name
            const test = entity.id;
            newItem.setLore(["§fID: " + test, "§fMob: " + mobName]);
            
            entity.runCommand(`structure save ${entity.id}_mob_capture_device ${entity.location.x} ${entity.location.y} ${entity.location.z} ${entity.location.x} ${entity.location.y} ${entity.location.z} true disk false`);
            player.dimension.playSound("bucket.fill_fish", entity.location);
                entity.remove();
                player.getComponent("equippable").setEquipment(EquipmentSlot.Mainhand, newItem);
            }
        }
    });
});

let isCapturing = false;
system.beforeEvents.startup.subscribe(async initEvent => {
  initEvent.itemComponentRegistry.registerCustomComponent('wypnt_bab:nautiling_bucket_empty', {
    onUseOn(e) {
    	const player = e.source
    	const item = e.itemStack
    	const block = e.block;
    	const face = e.blockFace;
    	const nblock = getBlockByFace(face, block);
    	if (isCapturing) return;  // Avoids multiple execution
    isCapturing = true;
    try {
            if (item.getLore().length > 0) {
                let newItem = new ItemStack(ItemTypes?.get("minecraft:bucket"));
                player.dimension.runCommand(`structure load ${Number(item.getLore()[0].split("§fID: ")[1])}_mob_capture_device ${nblock.location.x} ${nblock.location.y} ${nblock.location.z}`);
                player.dimension.playSound("bucket.empty_fish", block.location);
                newItem.setLore([]);
                if (player.getGameMode() !== "Creative") {
                player.getComponent("equippable").setEquipment(EquipmentSlot.Mainhand, newItem);
                }
                nblock.setType('minecraft:flowing_water')
            } else {
                let newItem = new ItemStack(ItemTypes?.get("minecraft:bucket"));
                player.dimension.playSound("bucket.empty_fish", block.location);
            	player.dimension.runCommand(`summon wypnt_bab:nautiling ${nblock.location.x} ${nblock.location.y} ${nblock.location.z} ~ ~ minecraft:entity_spawned`);
            	nblock.setType('minecraft:flowing_water')
            	if (player.getGameMode() !== "Creative") {
                player.getComponent("equippable").setEquipment(EquipmentSlot.Mainhand, newItem);
                }
            	}
        } catch (error) {
            console.error("Error: ", error);
        } finally {
            isCapturing = false;
        }
    	}
  });
}) 