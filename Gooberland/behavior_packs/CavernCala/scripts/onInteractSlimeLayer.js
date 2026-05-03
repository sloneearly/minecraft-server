// Import necessary modules from Minecraft server API
import { world } from '@minecraft/server';

// Subscribe to the 'worldInitialize' event to register custom components
world.beforeEvents.worldInitialize.subscribe(eventData => {
    // Register a custom component named kai:on_interact for interacting with the block
    eventData.blockComponentRegistry.registerCustomComponent('kai:on_interact_slime_layer', {
        onPlayerInteract(e) {
            const { block, player } = e;
            const equipment = player.getComponent('equippable');
            const selectedItem = equipment.getEquipment('Mainhand');
            if (selectedItem && selectedItem.typeId === 'block:top_slime') {
                const permutation = block.permutation;
                const currentLayerLevel = permutation.getState('kai:layer_level');

                // Check if the layer level is less than or equal to 6
                if (currentLayerLevel <= 6) {
                    // Prevent default block placement behavior
                    e.cancel = true;

                    // Increase the kai:layer_level state by 1
                    const newLayerLevel = currentLayerLevel + 1;

                    // Create a new permutation with the updated kai:layer_level state
                    const newPermutation = permutation.withState('kai:layer_level', newLayerLevel);

                    // Set the block's permutation to the new permutation
                    block.setPermutation(newPermutation);

                    // Reduce one 'kai:top_snow' item from the player's inventory if not in creative mode
                    if (player.getGameMode() !== "creative") {
                        if (selectedItem.amount > 1) {
                            selectedItem.amount -= 1;
                            equipment.setEquipment('Mainhand', selectedItem);
                        } else {
                            equipment.setEquipment('Mainhand', undefined); // Clear the slot if only 1 item left
                        }
                    }
                }
            }
        }
    });
});