import { world, ItemStack, GameMode } from '@minecraft/server';

const toolTypeIds = [
    'sword:titanium_pickaxe',
    'sword:titanium_axe',
    'sword:titanium_shovel',
    'sword:titanium_hoe',
    'tool:cobalt_pickaxe',
    'tool:cobalt_axe',
    'tool:cobalt_shovel',
    'tool:cobalt_hoe',
    'tool:palladium_pickaxe',
    'tool:palladium_axe',
    'tool:palladium_shovel',
    'tool:palladium_hoe',
    'tool:rose_gold_pickaxe',
    'tool:rose_gold_axe',
    'tool:rose_gold_shovel',
    'tool:rose_gold_hoe',
    'tool:aetherium_pickaxe',
    'tool:aetherium_axe',
    'tool:aetherium_shovel',
    'tool:aetherium_hoe',
    'tool:jasper_pickaxe',
    'tool:jasper_axe',
    'tool:jasper_shovel',
    'tool:jasper_hoe',
    'tool:kyanite_pickaxe',
    'tool:kyanite_axe',
    'tool:kyanite_shovel',
    'tool:kyanite_hoe',
    'tool:staballoy_pickaxe',
    'tool:staballoy_axe',
    'tool:staballoy_shovel',
    'tool:staballoy_hoe',
    'tool:magnet_pickaxe',
    'tool:magnet_axe',
    'tool:magnet_shovel',
    'tool:magnet_hoe',
    'tool:drill'
];
const weaponTypeIds = [
    'sword:copper_sword',
    'sword:titanium_sword'
];

world.afterEvents.playerBreakBlock.subscribe(evd => {
    const { player, itemStackBeforeBreak: itemUsed } = evd;

    // This returns if itemUsed is undefined or if the player is in Creative.
    if (!itemUsed || player.matches({ gameMode: GameMode.creative })) return;

    if (toolTypeIds.includes(itemUsed.typeId) || weaponTypeIds.includes(itemUsed.typeId)) {
        // This retrieves the player's equippable component.
        const playerEquippableComp = player.getComponent("equippable");

        // This returns if playerEquippableComp is undefined.
        if (!playerEquippableComp) return;

        // This retrieves the enchantable component of the item.
        const itemEnchantmentComp = itemUsed.getComponent("minecraft:enchantable");
        const unbreakingLevel = itemEnchantmentComp?.getEnchantment("unbreaking")?.level ?? 0;

        // Calculates the chance of an item breaking based on its unbreaking level. This is the vanilla unbreaking formula.
        const breakChance = 100 / (unbreakingLevel + 1);
        // Generates a random chance value between 0 and 100.
        const randomizeChance = Math.random() * 100;

        // This returns if breakChance is less than randomizeChance.
        if (breakChance < randomizeChance) return;

        // This retrieves the durability component of the item.
        const itemUsedDurabilityComp = itemUsed.getComponent("durability");

        // This returns if itemUsedDurabilityComp is undefined.
        if (!itemUsedDurabilityComp) return;

        let durabilityModifier = 0;
        if (toolTypeIds.includes(itemUsed.typeId)) {
            // If the item is a tool, then it will set the durability modifier to 1.
            durabilityModifier = 1;
        } else {
            // If the item is a weapon, then it will set the durability modifier to 2.
            durabilityModifier = 2;
        }

        // This will set the new durability value.
        itemUsedDurabilityComp.damage += durabilityModifier;

        // Declares and checks if the item is out of durability
        const maxDurability = itemUsedDurabilityComp.maxDurability
        const currentDamage = itemUsedDurabilityComp.damage
        if (currentDamage >= maxDurability) {

            // If the item is out of durability, plays the item breaking sound and removes the item
            player.playSound('random.break', { pitch: 1, location: player.location, volume: 1 })
            playerEquippableComp.setEquipment("Mainhand", new ItemStack('minecraft:air', 1));
        }
        else if (currentDamage < maxDurability) {

            // This sets the item in the player's selected slot.
            playerEquippableComp.setEquipment("Mainhand", itemUsed);
        }
    }
})