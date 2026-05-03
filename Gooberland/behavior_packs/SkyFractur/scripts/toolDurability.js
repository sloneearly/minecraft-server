import { world, ItemStack, GameMode } from '@minecraft/server';

const toolTypeIds = [
    'tool:meteorite_pickaxe',
    'tool:meteorite_axe',
    'tool:meteorite_shovel',
    'tool:meteorite_hoe',
    'tool:starlite_pickaxe',
    'tool:starlite_axe',
    'tool:starlite_shovel',
    'tool:starlite_hoe',
    'tool:aquamarine_pickaxe',
    'tool:aquamarine_axe',
    'tool:aquamarine_shovel',
    'tool:aquamarine_hoe',
    'tool:moonstone_pickaxe',
    'tool:moonstone_axe',
    'tool:moonstone_shovel',
    'tool:moonstone_hoe',
    'tool:solar_pickaxe',
    'tool:solar_axe',
    'tool:solar_shovel',
    'tool:solar_hoe',
    'tool:luminite_pickaxe',
    'tool:luminite_axe',
    'tool:luminite_shovel',
    'tool:luminite_hoe',
    'tool:lunar_pickaxe',
    'tool:lunar_axe',
    'tool:lunar_shovel',
    'tool:lunar_hoe',
    'tool:comet_pickaxe',
    'tool:comet_axe',
    'tool:comet_shovel',
    'tool:comet_hoe'
];
const weaponTypeIds = [
    'sword:obsidian_sword',
    'sword:emerald_sword',
    'sword:ruby_sword'
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