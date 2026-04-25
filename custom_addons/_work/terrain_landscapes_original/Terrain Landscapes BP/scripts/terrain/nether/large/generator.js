import { multiNoise } from "../../lib/utils.js";
import { config } from "./configB.js";
import { carveComplexCaves } from "../../lib/caves.js";

export const generateChunk = (entity, chunkX, chunkZ) => {
    const px = Math.floor(chunkX);
    const pz = Math.floor(chunkZ);

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const x = px + i;
            const z = pz + j;
            const h = Math.floor(multiNoise(x, z, config.scales) * config.heightMultiplier) + config.baseHeight;

            entity.runCommand(`fill ~${i} ~ ~${j} ~${i} ~${h} ~${j} ${config.mainBlock}`);
        }
    }

    entity.runCommand(`fill ~ ~ ~7 ~7 ~${config.lavaLevel} ~7 lava keep`);
    carveComplexCaves(entity, chunkX, chunkZ, "nether");
};