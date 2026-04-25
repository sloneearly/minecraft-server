import { currentSeed, currentScale } from "../configB.js";
import { noiseSeed } from "../lib/noise.js";

const cache = new Map();

export const loadTerrain = async dimId => {
    const key = `${dimId}/${currentScale}`;
    if (cache.has(key)) return cache.get(key);

    noiseSeed(currentSeed);

    try {
        const cfg = await import(`../terrain/${dimId}/${currentScale}/config.js`);
        const gen = await import(`../terrain/${dimId}/${currentScale}/generator.js`);
        const terrain = { config: cfg.config, generateChunk: gen.generateChunk };
        cache.set(key, terrain);
        return terrain;
    } catch {
        const cfg = await import(`../terrain/${dimId}/medium/config.js`);
        const gen = await import(`../terrain/${dimId}/medium/generator.js`);
        const terrain = { config: cfg.config, generateChunk: gen.generateChunk };
        cache.set(key, terrain);
        return terrain;
    }
};