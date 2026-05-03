import { world, system, GameMode, ItemStack, EntityComponentTypes, ItemComponentTypes, EquipmentSlot } from '@minecraft/server';


const unbreakableBlocks = new Set([
    "minecraft:air", "minecraft:bedrock", "minecraft:end_portal_frame",
    "minecraft:barrier", "minecraft:mob_spawner", "minecraft:trial_spawner",
    "minecraft:vault", "minecraft:portal", "minecraft:end_portal",
    "minecraft:allow", "minecraft:deny", "minecraft:border_block",
    "minecraft:structure_void", "minecraft:budding_amethyst", "minecraft:reinforced_deepslate",
    "minecraft:command_block", "minecraft:chain_command_block", "minecraft:repeating_command_block",
    "minecraft:light_block_0", "minecraft:light_block_1", "minecraft:light_block_2", 
    "minecraft:light_block_3", "minecraft:light_block_4", "minecraft:light_block_5",
    "minecraft:light_block_6", "minecraft:light_block_7", "minecraft:light_block_8", 
    "minecraft:light_block_9", "minecraft:light_block_10", "minecraft:light_block_11",
    "minecraft:light_block_12", "minecraft:light_block_13", "minecraft:light_block_14",
    "minecraft:light_block_15", "minecraft:water", "minecraft:lava",
    "minecraft:flowing_water", "minecraft:flowing_lava",
    //Container blocks should get skipped, because items inside the container are not retained
    "minecraft:chest", "minecraft:trapped_chest", "minecraft:barrel",
    "minecraft:lectern", "minecraft:chiseled_bookshelf", "minecraft:dispenser", 
    "minecraft:dropper", "minecraft:hopper", "minecraft:crafter"
]);

//Calculates the amount of broken blocks, and drops loot
world.beforeEvents.worldInitialize.subscribe(({ itemComponentRegistry}) => {
    itemComponentRegistry.registerCustomComponent(
        "test:hammer_time", { //Change "lolko:3x3_tool" to your own custom component name
            onMineBlock ({itemStack, source, block}) {
                //source.playSound('random.explode', {pitch:0.6, location: source.location, volume: 1}); //Sound effect
                let blockCount = 0;
                for (let dx = -1; dx <= 1; dx++) {
                    for (let dy = -1; dy <= 1; dy++) {
                        for (let dz = -1; dz <= 1; dz++) {
                            if (dx === 0 && dy === 0 && dz === 0) continue; //Searches all blocks in a 3x3 area around the broken block
                
                            const neighbor = block.offset({ x: dx, y: dy, z: dz });
                            if (unbreakableBlocks.has(neighbor.typeId)) continue;
                            //if (!neighbor.hasTag('minecraft:is_shovel_item_destructible')) continue; //You can also define to only target certain block tag
                            blockCount = blockCount + 1; //Adds +1 to the blockCount if the block is not skipped
                            source.runCommand(`execute as @s run loot spawn ${neighbor.location.x} ${neighbor.location.y} ${neighbor.location.z} mine ${neighbor.location.x} ${neighbor.location.y} ${neighbor.location.z} mainhand`);
                            neighbor.setType('air');
                        }
                    }
                }
                damageItem(itemStack, source, blockCount); //Deal durability damage to the item based off count of total broken blocks
            }
        });
});

//Deal durability damage to your tool
function damageItem(itemStack, source, damageAmount) {
    system.run(() => {
        if (source.matches({ gameMode: GameMode.creative})) return; //Deal no damage if player is in creative
        if (!itemStack) return;
        const enchantable = itemStack.getComponent("minecraft:enchantable");
        let damageChance;
        if (enchantable) {
        const unbreaking = enchantable.getEnchantment("unbreaking")?.level ?? 0;
        damageChance = 100 / (unbreaking + 1);
        } else damageChance = 100;
        const damage = damageAmount === undefined ? 0 : damageAmount;

        if (damageChance < Math.random() * 100) return;
        const durability = itemStack.getComponent(ItemComponentTypes.Durability);
        if (!durability) return;
        const durabilityLimit = (durability.damage + damage) - durability.maxDurability;
        if (durabilityLimit < 0) {
            durability.damage += damage;
        } else durability.damage = durability.maxDurability;
        handleItemBreak(durability, source, itemStack);    
    });
};

//Handles item breaking
function handleItemBreak(durability, source, itemStack) {
    const equippable = source.getComponent(EntityComponentTypes.Equippable);
    if (durability.damage >= durability.maxDurability) {
        source.playSound('random.break', {pitch:1, location: source.location, volume: 1});
        if (equippable) {
            equippable.setEquipment(EquipmentSlot.Mainhand, new ItemStack("minecraft:air"));
        }
    } else if (equippable) {
        equippable.setEquipment(EquipmentSlot.Mainhand, itemStack);
    }
};