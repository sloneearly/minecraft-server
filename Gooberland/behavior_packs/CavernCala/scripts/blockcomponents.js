import { world, ItemStack} from '@minecraft/server';


world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('test:amethyst', {
        onRandomTick(e) {
            e.block.dimension.spawnEntity(("mob:amethyst"), e.block.center());
        }
    });
});


world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('test:molten_magma_campfire', {
        onRandomTick(e) {
            e.block.dimension.spawnEntity(("mob:molten_magma_campfire"), e.block.center());
        }
    });
});


world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('test:ancient_soul_forge', {
        onTick(e) {
            e.block.dimension.spawnEntity(("mob:ancient_soul_forge"), e.block.center());
        }
    });
});


world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('test:glimmered_end_stone', {
        onTick(e) {
            e.block.setType("minecraft:end_stone");
        }
    });
});


world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('test:glimmered_netherrack', {
        onTick(e) {
            e.block.setType("minecraft:netherrack");
        }
    });
});


world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('test:glimmered_deepslate', {
        onTick(e) {
            e.block.setType("minecraft:deepslate");
        }
    });
});


world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('test:glimmered_stone', {
        onTick(e) {
            e.block.setType("minecraft:stone");
        }
    });
});


world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('test:light_block', {
        onTick(e) {
            e.block.setType("minecraft:air");
        }
    });
});

world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('test:jasper', {
        onRandomTick(e) {
            e.block.dimension.spawnEntity(("mob:jasper"), e.block.center());
        }
    });
});

world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('test:mimic_interact', {
        onPlayerInteract(e) {
            e.block.dimension.spawnEntity(("mob:mimic_spawner"), e.block.center());
        }
    });
});

world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('test:uranium_ore', {
        onRandomTick(e) {
            e.block.dimension.spawnEntity(("mob:uranium_ore"), e.block.center());
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
    eventData.blockComponentRegistry.registerCustomComponent('test:kyanite', {
        onRandomTick(e) {
            e.block.dimension.spawnEntity(("mob:kyanite"), e.block.center());
        }
    });
});

world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('test:aether_magnet', {
        onRandomTick(e) {
            e.block.dimension.spawnEntity(("mob:aether_magnet"), e.block.center());
        }
    });
});


world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('test:spider_egg_step_on', {
        onStepOn(e) {
            e.block.dimension.spawnEntity(("mob:spider_egg"), e.block.center());
        }
    });
});


world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('test:spider_egg_destroy', {
        onPlayerDestroy(e) {
            e.block.dimension.spawnEntity(("mob:spider_egg"), e.block.center());
        }
    });
});


world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('test:molten_magma', {
        onStepOn(e) {
            e.block.setType("minecraft:flowing_lava");
        }
    });
});


world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('test:auto_drill_up', {
        onTick(e) {
            e.block.dimension.spawnEntity(("mechanic:auto_drill_up"), e.block.center());
        }
    });
});


world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('test:auto_drill_down', {
        onTick(e) {
            e.block.dimension.spawnEntity(("mechanic:auto_drill_down"), e.block.center());
        }
    });
});


world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('test:auto_drill_north', {
        onTick(e) {
            e.block.dimension.spawnEntity(("mechanic:auto_drill_north"), e.block.center());
        }
    });
});


world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('test:auto_drill_south', {
        onTick(e) {
            e.block.dimension.spawnEntity(("mechanic:auto_drill_south"), e.block.center());
        }
    });
});


world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('test:auto_drill_east', {
        onTick(e) {
            e.block.dimension.spawnEntity(("mechanic:auto_drill_east"), e.block.center());
        }
    });
});


world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('test:auto_drill_west', {
        onTick(e) {
            e.block.dimension.spawnEntity(("mechanic:auto_drill_west"), e.block.center());
        }
    });
});