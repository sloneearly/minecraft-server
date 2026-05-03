import { world, system } from
    "@minecraft/server"


world.afterEvents.itemUse.subscribe(data => {
    const {itemStack: item, source: player} = data;
    if(item.typeId !== 'item:stone_energizer') return;
    const cooldown = item.getComponent('cooldown');
    const remainingCooldown = cooldown?.getCooldownTicksRemaining(player);
    if(remainingCooldown === 0) {
        cooldown.startCooldown(player); 
        player.runCommand("function energizerfire");
    }
    else {
        player.onScreenDisplay.setActionBar('Item On Cooldown');
    }
});


world.afterEvents.itemUse.subscribe(data => {
    const {itemStack: item, source: player} = data;
    if(item.typeId !== 'item:magnet') return;
    const cooldown = item.getComponent('cooldown');
    const remainingCooldown = cooldown?.getCooldownTicksRemaining(player);
    if(remainingCooldown === 0) {
        cooldown.startCooldown(player); 
        player.runCommand("tp @e[type=item,r=30] @s");
    }
    else {
        player.onScreenDisplay.setActionBar('Item On Cooldown');
    }
});


world.afterEvents.itemUse.subscribe(data => {
    const {itemStack: item, source: player} = data;
    if(item.typeId !== 'sword:heros_sword') return;
    const cooldown = item.getComponent('cooldown');
    const remainingCooldown = cooldown?.getCooldownTicksRemaining(player);
    if(remainingCooldown === 0) {
        cooldown.startCooldown(player); 
        player.runCommand("function herossword");
    }
    else {
        player.onScreenDisplay.setActionBar('Item On Cooldown');
    }
});


world.afterEvents.itemUse.subscribe(data => {
    const {itemStack: item, source: player} = data;
    if(item.typeId !== 'item:enchanted_magnet') return;
    const cooldown = item.getComponent('cooldown');
    const remainingCooldown = cooldown?.getCooldownTicksRemaining(player);
    if(remainingCooldown === 0) {
        cooldown.startCooldown(player); 
        player.runCommand("function magnet");
    }
    else {
        player.onScreenDisplay.setActionBar('Item On Cooldown');
    }
});



world.afterEvents.itemCompleteUse.subscribe(
    (data) => {
        const player = data.source
        const item = data.itemStack
        if (item.typeId ===
            "item:mustard_gas_bottle") {
            player.runCommandAsync("kill @s")
        }
    })


world.afterEvents.itemCompleteUse.subscribe(
    (data) => {
        const player = data.source
        const item = data.itemStack
        if (item.typeId ===
            "item:aether_potion") {
            player.runCommandAsync("function aetherpotion")
        }
    })


world.afterEvents.itemCompleteUse.subscribe(
    (data) => {
        const player = data.source
        const item = data.itemStack
        if (item.typeId ===
            "item:mining_potion") {
            player.runCommandAsync("function miningpotion")
        }
    })


world.afterEvents.itemUse.subscribe(
    (data) => {
        const player = data.source
        const item = data.itemStack
        if (item.typeId ===
            "item:trumpet") {
            player.runCommandAsync("function trumpet")
        }
    })


world.afterEvents.itemUse.subscribe(
    (data) => {
        const player = data.source
        const item = data.itemStack
        if (item.typeId ===
            "item:titanium_clarinet") {
            player.runCommandAsync("function clarinet")
        }
    })


world.afterEvents.itemCompleteUse.subscribe(
    (data) => {
        const player = data.source
        const item = data.itemStack
        if (item.typeId ===
            "food:aether_fruit") {
            player.runCommandAsync("effect @s slow_falling 15 0")
        }
    })


world.afterEvents.itemUse.subscribe(
    (data) => {
        const player = data.source
        const item = data.itemStack
        if (item.typeId ===
            "item:cobalt_gong") {
            player.runCommandAsync("function gong")
        }
    })


world.afterEvents.itemUse.subscribe(
    (data) => {
        const player = data.source
        const item = data.itemStack
        if (item.typeId ===
            "item:staballoy_drum") {
            player.runCommandAsync("function drum")
        }
    })




world.afterEvents.itemUse.subscribe(
    (data) => {
        const player = data.source
        const item = data.itemStack
        if (item.typeId ===
            "item:rose_gold_harmonica") {
            player.runCommandAsync("function harmonica")
        }
    })


world.afterEvents.itemUse.subscribe(
    (data) => {
        const player = data.source
        const item = data.itemStack
        if (item.typeId ===
            "item:platinum_harp") {
            player.runCommandAsync("function harp")
        }
    })


world.afterEvents.itemUse.subscribe(
    (data) => {
        const player = data.source
        const item = data.itemStack
        if (item.typeId ===
            "item:trumpet") {
            player.runCommandAsync("function trumpet")
        }
    })


world.afterEvents.itemUse.subscribe(
    (data) => {
        const player = data.source
        const item = data.itemStack
        if (item.typeId ===
            "item:whistle") {
            player.runCommandAsync("function whistle")
        }
    })


world.afterEvents.itemUse.subscribe(
    (data) => {
        const player = data.source
        const item = data.itemStack
        if (item.typeId ===
            "item:copper_bell") {
            player.runCommandAsync("function cowbell")
        }
    })


world.afterEvents.itemUse.subscribe(
    (data) => {
        const player = data.source
        const item = data.itemStack
        if (item.typeId ===
            "item:exodium_guitar") {
            player.runCommandAsync("function guitar")
        }
    })

world.afterEvents.itemCompleteUse.subscribe(
    (data) => {
        const player = data.source
        const item = data.itemStack
        if (item.typeId ===
            "food:rose_gold_apple") {
            player.runCommandAsync("function rosegoldapple")
        }
    })


world.afterEvents.playerBreakBlock.subscribe((e) => {
    try {
        if (e.itemStackBeforeBreak.typeId != "tool:magnet_pickaxe") return
        const block = e.block
        const dimension = block.dimension
        dimension.runCommand(`execute positioned ${block.location.x} ${block.location.y} ${block.location.z} run tp @e[type=item,r=1.5] @p`)
    } catch (e) { }
})


world.afterEvents.playerBreakBlock.subscribe((e) => {
    try {
        if (e.itemStackBeforeBreak.typeId != "tool:magnet_axe") return
        const block = e.block
        const dimension = block.dimension
        dimension.runCommand(`execute positioned ${block.location.x} ${block.location.y} ${block.location.z} run tp @e[type=item,r=1.5] @p`)
    } catch (e) { }
})


world.afterEvents.playerBreakBlock.subscribe((e) => {
    try {
        if (e.itemStackBeforeBreak.typeId != "tool:magnet_shovel") return
        const block = e.block
        const dimension = block.dimension
        dimension.runCommand(`execute positioned ${block.location.x} ${block.location.y} ${block.location.z} run tp @e[type=item,r=1.5] @p`)
    } catch (e) { }
})


world.afterEvents.playerBreakBlock.subscribe((e) => {
    try {
        if (e.itemStackBeforeBreak.typeId != "tool:magnet_hoe") return
        const block = e.block
        const dimension = block.dimension
        dimension.runCommand(`execute positioned ${block.location.x} ${block.location.y} ${block.location.z} run tp @e[type=item,r=1.5] @p`)
    } catch (e) { }
})


world.afterEvents.itemUse.subscribe((e) => {
    const itemStack = e.itemStack
    if (itemStack.typeId != "minecraft:flint_and_steel") return
    const player = e.source
    const block = player.getBlockFromViewDirection({ maxDistance: 10 }).block
    if (block.typeId != "block:red_firework_fountain") return
    player.runCommand(`execute positioned ${block.location.x} ${block.location.y} ${block.location.z} run function redfireworkfountain`)
})


world.afterEvents.itemUse.subscribe((e) => {
    const itemStack = e.itemStack
    if (itemStack.typeId != "minecraft:flint_and_steel") return
    const player = e.source
    const block = player.getBlockFromViewDirection({ maxDistance: 10 }).block
    if (block.typeId != "block:orange_firework_fountain") return
    player.runCommand(`execute positioned ${block.location.x} ${block.location.y} ${block.location.z} run function orangefireworkfountain`)
})


world.afterEvents.itemUse.subscribe((e) => {
    const itemStack = e.itemStack
    if (itemStack.typeId != "minecraft:flint_and_steel") return
    const player = e.source
    const block = player.getBlockFromViewDirection({ maxDistance: 10 }).block
    if (block.typeId != "block:yellow_firework_fountain") return
    player.runCommand(`execute positioned ${block.location.x} ${block.location.y} ${block.location.z} run function yellowfireworkfountain`)
})


world.afterEvents.itemUse.subscribe((e) => {
    const itemStack = e.itemStack
    if (itemStack.typeId != "minecraft:flint_and_steel") return
    const player = e.source
    const block = player.getBlockFromViewDirection({ maxDistance: 10 }).block
    if (block.typeId != "block:lime_firework_fountain") return
    player.runCommand(`execute positioned ${block.location.x} ${block.location.y} ${block.location.z} run function limefireworkfountain`)
})


world.afterEvents.itemUse.subscribe((e) => {
    const itemStack = e.itemStack
    if (itemStack.typeId != "minecraft:flint_and_steel") return
    const player = e.source
    const block = player.getBlockFromViewDirection({ maxDistance: 10 }).block
    if (block.typeId != "block:cyan_firework_fountain") return
    player.runCommand(`execute positioned ${block.location.x} ${block.location.y} ${block.location.z} run function cyanfireworkfountain`)
})


world.afterEvents.itemUse.subscribe((e) => {
    const itemStack = e.itemStack
    if (itemStack.typeId != "minecraft:flint_and_steel") return
    const player = e.source
    const block = player.getBlockFromViewDirection({ maxDistance: 10 }).block
    if (block.typeId != "block:light_blue_firework_fountain") return
    player.runCommand(`execute positioned ${block.location.x} ${block.location.y} ${block.location.z} run function lightbluefireworkfountain`)
})


world.afterEvents.itemUse.subscribe((e) => {
    const itemStack = e.itemStack
    if (itemStack.typeId != "minecraft:flint_and_steel") return
    const player = e.source
    const block = player.getBlockFromViewDirection({ maxDistance: 10 }).block
    if (block.typeId != "block:blue_firework_fountain") return
    player.runCommand(`execute positioned ${block.location.x} ${block.location.y} ${block.location.z} run function bluefireworkfountain`)
})


world.afterEvents.itemUse.subscribe((e) => {
    const itemStack = e.itemStack
    if (itemStack.typeId != "minecraft:flint_and_steel") return
    const player = e.source
    const block = player.getBlockFromViewDirection({ maxDistance: 10 }).block
    if (block.typeId != "block:magenta_firework_fountain") return
    player.runCommand(`execute positioned ${block.location.x} ${block.location.y} ${block.location.z} run function magentafireworkfountain`)
})


world.afterEvents.itemUse.subscribe((e) => {
    const itemStack = e.itemStack
    if (itemStack.typeId != "minecraft:flint_and_steel") return
    const player = e.source
    const block = player.getBlockFromViewDirection({ maxDistance: 10 }).block
    if (block.typeId != "block:purple_firework_fountain") return
    player.runCommand(`execute positioned ${block.location.x} ${block.location.y} ${block.location.z} run function purplefireworkfountain`)
})


world.afterEvents.itemUse.subscribe((e) => {
    const itemStack = e.itemStack
    if (itemStack.typeId != "minecraft:flint_and_steel") return
    const player = e.source
    const block = player.getBlockFromViewDirection({ maxDistance: 10 }).block
    if (block.typeId != "block:pink_firework_fountain") return
    player.runCommand(`execute positioned ${block.location.x} ${block.location.y} ${block.location.z} run function pinkfireworkfountain`)
})


world.afterEvents.itemUse.subscribe((e) => {
    const itemStack = e.itemStack
    if (itemStack.typeId != "minecraft:flint_and_steel") return
    const player = e.source
    const block = player.getBlockFromViewDirection({ maxDistance: 10 }).block
    if (block.typeId != "block:white_firework_fountain") return
    player.runCommand(`execute positioned ${block.location.x} ${block.location.y} ${block.location.z} run function whitefireworkfountain`)
})


world.afterEvents.itemUse.subscribe((e) => {
    const itemStack = e.itemStack
    if (itemStack.typeId != "minecraft:flint_and_steel") return
    const player = e.source
    const block = player.getBlockFromViewDirection({ maxDistance: 10 }).block
    if (block.typeId != "block:super_tnt") return
    player.runCommand(`execute positioned ${block.location.x} ${block.location.y} ${block.location.z} run function supertnt`)
})


world.afterEvents.itemUse.subscribe((e) => {
    const itemStack = e.itemStack
    if (itemStack.typeId != "minecraft:flint_and_steel") return
    const player = e.source
    const block = player.getBlockFromViewDirection({ maxDistance: 10 }).block
    if (block.typeId != "block:formidi_bomb") return
    player.runCommand(`execute positioned ${block.location.x} ${block.location.y} ${block.location.z} run function formidibomb`)
})


world.afterEvents.playerBreakBlock.subscribe((e) => {
    try {
        if (e.itemStackBeforeBreak.typeId != "tool:heros_pickaxe") return
        const block = e.block
        const dimension = block.dimension
        dimension.runCommand(`execute positioned ${block.location.x} ${block.location.y} ${block.location.z} run summon xp_orb`)
    } catch (e) { }
})