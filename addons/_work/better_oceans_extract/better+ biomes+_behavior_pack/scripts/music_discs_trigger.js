import { system, world } from '@minecraft/server';

const musicDiscs = new Map([["pa:old_music_bisc","§6old Music Disc"]]);

let playingJukeboxes = new Map();
let lastestPlayingPosition = new Map();

const DYNAMIC_PROPERTY_ID = "jukebox_states";

let soundParticle = new Map();

function saveJukeboxStates() {
    const dataToSave = Array.from(playingJukeboxes.entries());
    const jsonString = JSON.stringify(dataToSave);
    world.setDynamicProperty(DYNAMIC_PROPERTY_ID, jsonString);
}

function loadJukeboxStates() {
    const jsonString = world.getDynamicProperty(DYNAMIC_PROPERTY_ID);
    if (typeof jsonString === 'string') {
        const loadedData = JSON.parse(jsonString);
        playingJukeboxes.clear();
        for (const [locationKey, recordId] of loadedData) {
            playingJukeboxes.set(locationKey, recordId);
        }
    }
}

system.run(loadJukeboxStates);

function stopSound(player, locationKey) {
    system.run(function () {
        if (playingJukeboxes.has(locationKey)) {
            const soundId = playingJukeboxes.get(locationKey);
            
            if (lastestPlayingPosition.has(soundId)) {
                const lastestPosition = lastestPlayingPosition.get(soundId);
                if (lastestPosition === locationKey) {
                    lastestPlayingPosition.delete(soundId);
                    player.runCommand(`stopsound @a ${soundId}`);
                }
            }
        }

        playingJukeboxes.delete(locationKey);
        if (soundParticle.has(locationKey)) {
            const intervalCommand = soundParticle.get(locationKey);
            system.clearRun(intervalCommand);
        }
        saveJukeboxStates();
    });
}

world.beforeEvents.playerInteractWithBlock.subscribe(evd => {
    const { player, itemStack, block } = evd;
    const { x, y, z } = block.location;
    const locationKey = `${x},${y},${z}`;

    if (!block.permutation.matches('minecraft:jukebox')) return;

    if (playingJukeboxes.has(locationKey)) {
        stopSound(player, locationKey);
        return;
    }

    if (itemStack) {
        if (musicDiscs.has(itemStack.typeId)) {
            system.run(function () {
                const soundId = `record.${itemStack.typeId.replace(':', '_')}`;

                playingJukeboxes.set(locationKey, soundId);
                saveJukeboxStates();

                player.runCommand(`title @a[r=10] actionbar §dNow playing: ${musicDiscs.get(itemStack.typeId)}`);

                const soundParticleCommand = system.runInterval(() => {
                    player.runCommand(`particle pa:custom_note_particle ${x} ${y + 1.2} ${z}`);
                }, 20);
                
                soundParticle.set(locationKey, soundParticleCommand);
                lastestPlayingPosition.set(soundId, locationKey);
                
                block.dimension.playSound(soundId, block.location);
            });
            return;
        } else if (itemStack.hasTag("minecraft:music_disc")) {
            playingJukeboxes.set(locationKey, itemStack.typeId);
            saveJukeboxStates();
            return;
        }
    }
});

world.beforeEvents.playerBreakBlock.subscribe((event) => {
    const { player, block } = event;
    const { x, y, z } = block.location;
    const locationKey = `${x},${y},${z}`;

    if (playingJukeboxes.has(locationKey)) {
        stopSound(player, locationKey);
        return;
    }
})

