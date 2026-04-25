import { noise } from "../../lib/noise.js";
import { config } from "./configB.js";
import { multiNoise } from "../../lib/utils.js";
import { carveComplexCaves } from "../../lib/caves.js";

const flowers = ["poppy","dandelion","blue_orchid","allium","azure_bluet","red_tulip","orange_tulip","white_tulip","pink_tulip","oxeye_daisy","cornflower","lily_of_the_valley"];

const placeTree = (e, type, i, j, y) => {
    e.runCommand(`fill ~${i} ~${y} ~${j} ~${i} ~${y+7} ~${j} ${type}_log keep`);
    e.runCommand(`fill ~${i-2} ~${y+5} ~${j-2} ~${i+2} ~${y+8} ~${j+2} ${type}_leaves keep`);
};

export const generateChunk = (entity, chunkX, chunkZ) => {
    const px = Math.floor(chunkX);
    const pz = Math.floor(chunkZ);

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const x = px + i;
            const z = pz + j;
            const h = Math.floor(multiNoise(x, z, config.scales) * config.heightMultiplier) + config.baseHeight;

            entity.runCommand(`fill ~${i} ~ ~${j} ~${i} ~${h-3} ~${j} ${config.mainBlock}`);

            const biome = noise((x+2893)/config.biomeScale, (z+932)/config.biomeScale);
            if (biome >= config.biomeThreshold) {
                entity.runCommand(`fill ~${i} ~${h-2} ~${j} ~${i} ~${h+1} ~${j} ${config.dirtBlock}`);
                entity.runCommand(`setblock ~${i} ~${h+2} ~${j} ${config.grassBlock}`);
                if (Math.random() < config.tallgrassDensity) entity.runCommand(`setblock ~${i} ~${h+3} ~${j} tallgrass keep`);
                if (Math.random() < config.flowerDensity) entity.runCommand(`setblock ~${i} ~${h+3} ~${j} ${flowers[Math.floor(Math.random()*flowers.length)]} keep`);
                if (Math.random() < config.treeDensity.oak) placeTree(entity, "oak", i, j, h+3);
            } else {
                entity.runCommand(`fill ~${i} ~${h-2} ~${j} ~${i} ~${h+1} ~${j} ${config.sandstoneBlock}`);
                entity.runCommand(`setblock ~${i} ~${h+2} ~${j} ${config.sandBlock}`);
            }
        }
    }

    entity.runCommand(`fill ~ ~ ~7 ~7 ~${config.oceanLevel} ~7 water keep`);
    carveComplexCaves(entity, chunkX, chunkZ, "overworld");
};