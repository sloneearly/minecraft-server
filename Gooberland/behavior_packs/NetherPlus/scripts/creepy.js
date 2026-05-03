import {
    EntityComponentTypes,
    system,
    world
  } from "@minecraft/server";

system.listenForEvent("minecraft:entity_exploded", (eventData) => {
    const explosionPosition = eventData.data.position;
    const creeperIdentifier = "minecraft:creeper";

    // Verifica si la explosión fue causada por un creeper
    if (eventData.data.entity.identifier === creeperIdentifier) {
        // Genera el bloque en la ubicación de la explosión del creeper
        const blockPosition = { 
            x: explosionPosition.x,
            y: explosionPosition.y,
            z: explosionPosition.z
        };
        const blockEventData = system.createEventData("minecraft:place_block");
        blockEventData.data = {
            block_type: "minecraft:diamond_block", // Cambia el tipo de bloque según tu preferencia
            block_position: blockPosition
        };
        system.broadcastEvent("minecraft:place_block", blockEventData);
    }
});