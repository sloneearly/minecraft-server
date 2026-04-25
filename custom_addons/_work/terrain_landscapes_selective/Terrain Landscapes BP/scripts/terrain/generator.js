import { Noise } from "../module/noise.js";
import { PlainsBiome } from "../biomes/plains.js";
import { SavannaBiome } from "../biomes/savanna.js";

const noise = new Noise(12345);

const handlers = {
    "terrain:extreme_plains": new PlainsBiome(noise),
    "terrain:extreme_savanna": new SavannaBiome(noise)
};

export class Generator {
    generateChunk(dimension, chunkX, chunkZ, biomeName) {
        const handler = handlers[biomeName];
        if (!handler) {
            return false;
        }

        handler.generate(dimension, chunkX, chunkZ);
        return true;
    }
}
