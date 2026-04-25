import { noise } from "./noise.js";
import { randRange } from "./utils.js";

const caveNoise3D = (x, y, z, scale, oct = 1) => noise(x / scale * oct, y / scale * oct, z / scale * oct);

const isInCave = (x, y, z, cfg) => {
    let v = caveNoise3D(x, y, z, cfg.largeScale) + caveNoise3D(x, y, z, cfg.largeScale, 2) * 0.5;
    v += caveNoise3D(x, y, z, cfg.mediumScale) * 0.8;
    v += caveNoise3D(x, y, z, cfg.smallScale) * 0.4;
    v += Math.sin((y + 20) / 40 * Math.PI) * 0.3;
    return v < cfg.threshold;
};

const createCavern = (entity, cx, cy, cz, radius) => {
    for (let dx = -radius; dx <= radius; dx++)
        for (let dy = -radius / 2; dy <= radius; dy++)
            for (let dz = -radius; dz <= radius; dz++)
                if (dx*dx + dy*dy*3 + dz*dz < radius*radius)
                    entity.runCommand(`setblock ~${cx+dx} ~${cy+dy} ~${cz+dz} air replace stone`);
};

export const carveComplexCaves = (entity, chunkX, chunkZ, dim = "overworld") => {
    const posX = Math.floor(chunkX);
    const posZ = Math.floor(chunkZ);

    const cfg = dim === "nether" ? {
        threshold: 0.1, largeScale: 70, mediumScale: 30, smallScale: 12,
        yMin: 10, yMax: 100, fluid: "lava", ores: ["ancient_debris","nether_quartz_ore"]
    } : dim === "the_end" ? {
        threshold: 0.15, largeScale: 50, mediumScale: 20, smallScale: 8,
        yMin: 30, yMax: 90, fluid: "air", ores: []
    } : {
        threshold: 0.08, largeScale: 60, mediumScale: 25, smallScale: 10,
        yMin: -50, yMax: 80, fluid: "water", ores: ["coal_ore","iron_ore","gold_ore","diamond_ore"]
    };

    for (let i = -4; i < 12; i++)
        for (let j = -4; j < 12; j++)
            for (let y = cfg.yMin; y < cfg.yMax; y += 3) {
                if (isInCave(posX + i, y, posZ + j, cfg)) {
                    entity.runCommand(`fill ~${i} ~${y-3} ~${j} ~${i} ~${y+8} ~${j} air replace stone`);
                    entity.runCommand(`fill ~${i} ~${y-3} ~${j} ~${i} ~${y+8} ~${j} air replace dirt`);

                    if (y < (dim === "nether" ? 35 : 0) && Math.random() < 0.2)
                        entity.runCommand(`fill ~${i-4} ~${y-2} ~${j-4} ~${i+4} ~${y-1} ~${j+4} ${cfg.fluid} replace air`);

                    if (Math.random() < 0.1 && cfg.ores.length)
                        entity.runCommand(`setblock ~${i} ~${y} ~${j} ${cfg.ores[Math.floor(Math.random()*cfg.ores.length)]} replace stone`);
                }
            }

    if (Math.random() < 0.4) {
        const cx = Math.floor(randRange(0,7));
        const cy = Math.floor(randRange(cfg.yMin+20, cfg.yMax-10));
        const cz = Math.floor(randRange(0,7));
        createCavern(entity, cx, cy, cz, Math.floor(randRange(8,15)));
    }
};