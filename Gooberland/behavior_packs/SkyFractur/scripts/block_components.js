import { world, ItemStack} from '@minecraft/server';


world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('test:random_lightning', {
        onRandomTick(e) {
            e.block.dimension.spawnEntity(("mob:random_lightning"), e.block.center());
        }
    });
});


world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('test:meteor_rod', {
        onRandomTick(e) {
            e.block.dimension.spawnEntity(("mob:meteor_rod"), e.block.center());
        }
    });
});


world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('test:shattering_block', {
        onStepOn(e) {
            e.block.setType("minecraft:air");
        }
    });
});


world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('test:crop_growth_sf', {
        onRandomTick(e) {
            e.block.dimension.spawnEntity(("mob:crop_growth_sf"), e.block.center());
        }
    });
});


world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('test:solar_soul_forge', {
        onTick(e) {
            e.block.dimension.spawnEntity(("mob:solar_soul_forge"), e.block.center());
        }
    });
});


world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('test:space_crystal', {
        onTick(e) {
            e.block.dimension.spawnEntity(("mob:space_crystal"), e.block.center());
        }
    });
});


world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('test:despawn', {
        onTick(e) {
            e.block.setType("minecraft:air");
        }
    });
});


world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('test:chocolate_cake_layer_1', {
        onPlayerInteract(e) {
            e.block.setType("block:chocolate_cake_1");
            e.block.dimension.spawnItem(new ItemStack("food:chocolate_cake_slice"), e.block.center());
        }
    });
});


world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('test:chocolate_cake_layer_2', {
        onPlayerInteract(e) {
            e.block.setType("block:chocolate_cake_2");
            e.block.dimension.spawnItem(new ItemStack("food:chocolate_cake_slice"), e.block.center());
        }
    });
});


world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('test:chocolate_cake_layer_3', {
        onPlayerInteract(e) {
            e.block.setType("block:chocolate_cake_3");
            e.block.dimension.spawnItem(new ItemStack("food:chocolate_cake_slice"), e.block.center());
        }
    });
});

world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('test:chocolate_cake_layer_4', {
        onPlayerInteract(e) {
            e.block.setType("block:chocolate_cake_4");
            e.block.dimension.spawnItem(new ItemStack("food:chocolate_cake_slice"), e.block.center());
        }
    });
});

world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('test:chocolate_cake_layer_5', {
        onPlayerInteract(e) {
            e.block.setType("block:chocolate_cake_5");
            e.block.dimension.spawnItem(new ItemStack("food:chocolate_cake_slice"), e.block.center());
        }
    });
});

world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('test:chocolate_cake_layer_6', {
        onPlayerInteract(e) {
            e.block.setType("block:chocolate_cake_6");
            e.block.dimension.spawnItem(new ItemStack("food:chocolate_cake_slice"), e.block.center());
        }
    });
});

world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('test:chocolate_cake_layer_7', {
        onPlayerInteract(e) {
            e.block.setType("minecraft:air");
            e.block.dimension.spawnItem(new ItemStack("food:chocolate_cake_slice"), e.block.center());
        }
    });
});


world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('test:cloud_cake_layer_1', {
        onPlayerInteract(e) {
            e.block.setType("block:cloud_cake_1");
            e.block.dimension.spawnItem(new ItemStack("food:cloud_cake_slice"), e.block.center());
        }
    });
});


world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('test:cloud_cake_layer_2', {
        onPlayerInteract(e) {
            e.block.setType("block:cloud_cake_2");
            e.block.dimension.spawnItem(new ItemStack("food:cloud_cake_slice"), e.block.center());
        }
    });
});


world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('test:cloud_cake_layer_3', {
        onPlayerInteract(e) {
            e.block.setType("block:cloud_cake_3");
            e.block.dimension.spawnItem(new ItemStack("food:cloud_cake_slice"), e.block.center());
        }
    });
});

world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('test:cloud_cake_layer_4', {
        onPlayerInteract(e) {
            e.block.setType("block:cloud_cake_4");
            e.block.dimension.spawnItem(new ItemStack("food:cloud_cake_slice"), e.block.center());
        }
    });
});

world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('test:cloud_cake_layer_5', {
        onPlayerInteract(e) {
            e.block.setType("block:cloud_cake_5");
            e.block.dimension.spawnItem(new ItemStack("food:cloud_cake_slice"), e.block.center());
        }
    });
});

world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('test:cloud_cake_layer_6', {
        onPlayerInteract(e) {
            e.block.setType("block:cloud_cake_6");
            e.block.dimension.spawnItem(new ItemStack("food:cloud_cake_slice"), e.block.center());
        }
    });
});

world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('test:cloud_cake_layer_7', {
        onPlayerInteract(e) {
            e.block.setType("minecraft:air");
            e.block.dimension.spawnItem(new ItemStack("food:cloud_cake_slice"), e.block.center());
        }
    });
});
