import { Noise } from "../module/noise.js";
import { PlainsBiome } from "../biomes/plains.js";
import { SavannaBiome } from "../biomes/savanna.js";
import { SnowyBiome } from "../biomes/snowy.js";

const noise = new Noise(12345);

const handlers = {
    "minecraft:plains": new PlainsBiome(noise),
    "minecraft:savanna": new SavannaBiome(noise),
    "minecraft:snowy_plains": new SnowyBiome(noise)
};

export class Generator {
    generateChunk(dimension, chunkX, chunkZ, biomeName) {
        const handler = handlers[biomeName] || handlers["minecraft:plains"];
        handler.generate(dimension, chunkX, chunkZ);
    }
}