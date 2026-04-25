import { multiNoise } from "../../lib/utils.js";
import { config } from "./configB.js";
import { carveComplexCaves } from "../../lib/caves.js";

export const generateChunk = (entity, chunkX, chunkZ) => {
    const px = Math.floor(chunkX);
    const pz = Math.floor(chunkZ);
    const isCentral = Math.abs(px) < 32 && Math.abs(pz) < 32;

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const x = px + i;
            const z = pz + j;
            const h = Math.floor(multiNoise(x, z, config.scales) * config.heightMultiplier) + config.baseHeight;

            const size = isCentral ? 15 : Math.random() < 0.2 ? 10 : 0;
            if (size > 0) {
                entity.runCommand(`fill ~${i-size} ~${h} ~${j-size} ~${i+size} ~${h+5} ~${j+size} ${config.mainBlock} keep`);
            }
        }
    }

    carveComplexCaves(entity, chunkX, chunkZ, "the_end");
};