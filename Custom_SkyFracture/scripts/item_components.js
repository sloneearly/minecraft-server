import { world, EquipmentSlot, BlockTypes } from "@minecraft/server"



world.afterEvents.itemUse.subscribe(data => {
    const {itemStack: item, source: player} = data;
    if(item.typeId !== 'item:cryo_bridge_staff') return;
    const cooldown = item.getComponent('cooldown');
    const remainingCooldown = cooldown?.getCooldownTicksRemaining(player);
    if(remainingCooldown === 0) {
        cooldown.startCooldown(player); 
        player.runCommandAsync("function cryobridgestaff");
    }
    else {
        player.onScreenDisplay.setActionBar('Item on Cooldown');
    }
});


world.afterEvents.itemUse.subscribe(
    (data) => {
        const player = data.source
        const item = data.itemStack
        if (item.typeId ===
            "item:weather_radar") {
            player.runCommandAsync("summon item:weather_radar")
        }
    })


world.afterEvents.itemCompleteUse.subscribe(
    (data) => {
        const player = data.source
        const item = data.itemStack
        if (item.typeId ===
            "food:lunar_starfruit") {
            player.runCommandAsync("summon item:lunar_starfruit")
        }
    })


world.afterEvents.itemCompleteUse.subscribe(
    (data) => {
        const player = data.source
        const item = data.itemStack
        if (item.typeId ===
            "item:sunlight") {
            player.runCommandAsync("time set day")
        }
    })


world.afterEvents.itemCompleteUse.subscribe(
    (data) => {
        const player = data.source
        const item = data.itemStack
        if (item.typeId ===
            "item:cloud_in_a_bottle") {
            player.runCommandAsync("function cloudbottle")
        }
    })


world.afterEvents.itemCompleteUse.subscribe(
    (data) => {
        const player = data.source
        const item = data.itemStack
        if (item.typeId ===
            "item:combustion_potion") {
            player.runCommandAsync("summon mechanic:combustion_blast")
        }
    })


world.afterEvents.itemCompleteUse.subscribe(
    (data) => {
        const player = data.source
        const item = data.itemStack
        if (item.typeId ===
            "item:stormshock_potion") {
            player.runCommandAsync("summon lightning_bolt")
        }
    })


world.afterEvents.itemCompleteUse.subscribe(
    (data) => {
        const player = data.source
        const item = data.itemStack
        if (item.typeId ===
            "item:cryocore_potion") {
            player.runCommandAsync("function cryocore")
        }
    })


world.afterEvents.itemCompleteUse.subscribe(
    (data) => {
        const player = data.source
        const item = data.itemStack
        if (item.typeId ===
            "item:moonlight") {
            player.runCommandAsync("time set night")
        }
    })


world.afterEvents.itemCompleteUse.subscribe(
    (data) => {
        const player = data.source
        const item = data.itemStack
        if (item.typeId ===
            "item:enchanted_droplet") {
            player.runCommandAsync("weather rain")
        }
    })


world.afterEvents.itemCompleteUse.subscribe(
    (data) => {
        const player = data.source
        const item = data.itemStack
        if (item.typeId ===
            "food:solar_starfruit") {
            player.runCommandAsync("summon item:solar_starfruit")
        }
    })


world.afterEvents.itemCompleteUse.subscribe(
    (data) => {
        const player = data.source
        const item = data.itemStack
        if (item.typeId ===
            "food:enchanted_solar_starfruit") {
            player.runCommandAsync("summon item:enchanted_solar_starfruit")
        }
    })


world.afterEvents.itemCompleteUse.subscribe(
    (data) => {
        const player = data.source
        const item = data.itemStack
        if (item.typeId ===
            "item:solar_potion") {
            player.runCommandAsync("summon item:solar_potion")
        }
    })


world.afterEvents.itemCompleteUse.subscribe(
    (data) => {
        const player = data.source
        const item = data.itemStack
        if (item.typeId ===
            "food:enchanted_lunar_starfruit") {
            player.runCommandAsync("summon item:enchanted_lunar_starfruit")
        }
    })


world.afterEvents.itemCompleteUse.subscribe(
    (data) => {
        const player = data.source
        const item = data.itemStack
        if (item.typeId ===
            "item:lunar_potion") {
            player.runCommandAsync("summon item:lunar_potion")
        }
    })
