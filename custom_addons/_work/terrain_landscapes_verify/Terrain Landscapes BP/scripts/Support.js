export class Support {
    constructor(system) {
        this.system = system;
    }
    
    setBlock(x, y, z, blockType) {
        try {
            const blockEvent = this.system.createEventData("minecraft:block_event");
            blockEvent.data.position = { x, y, z };
            blockEvent.data.block_type = blockType;
            this.system.broadcastEvent("minecraft:block_event", blockEvent);
        } catch (error) {
            console.error(`Error setting block at ${x}, ${y}, ${z}:`, error);
        }
    }
    
    setBlockData(x, y, z, data) {
        try {
            const blockEvent = this.system.createEventData("minecraft:block_event");
            blockEvent.data.position = { x, y, z };
            blockEvent.data.data = data;
            this.system.broadcastEvent("minecraft:block_event", blockEvent);
        } catch (error) {
            console.error(`Error setting block data at ${x}, ${y}, ${z}:`, error);
        }
    }
    
    spawnEntity(entityType, x, y, z, extraData = {}) {
        try {
            const spawnEvent = this.system.createEventData("minecraft:spawn_entity");
            spawnEvent.data.entity_type = entityType;
            spawnEvent.data.position = { x, y, z };
            spawnEvent.data.extra_data = extraData;
            this.system.broadcastEvent("minecraft:spawn_entity", spawnEvent);
        } catch (error) {
            console.error(`Error spawning entity at ${x}, ${y}, ${z}:`, error);
        }
    }
    
    getBlock(x, y, z) {
        try {
            const queryEvent = this.system.createEventData("minecraft:block_query");
            queryEvent.data.position = { x, y, z };
            const result = this.system.broadcastEvent("minecraft:block_query", queryEvent);
            return result?.data?.block_type || "minecraft:air";
        } catch (error) {
            console.error(`Error getting block at ${x}, ${y}, ${z}:`, error);
            return "minecraft:air";
        }
    }
    
    executeCommand(command) {
        try {
            const commandEvent = this.system.createEventData("minecraft:execute_command");
            commandEvent.data.command = command;
            this.system.broadcastEvent("minecraft:execute_command", commandEvent);
        } catch (error) {
            console.error(`Error executing command: ${command}`, error);
        }
    }
}