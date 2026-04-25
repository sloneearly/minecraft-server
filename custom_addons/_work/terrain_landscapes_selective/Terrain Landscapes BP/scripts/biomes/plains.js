import { BiomeBase } from "./base.js";

export class PlainsBiome extends BiomeBase {
    constructor(noise) {
        super(noise);
        this.subType = Math.floor(Math.random() * 13); 
    }

    generate(dimension, chunkX, chunkZ) {
        const startX = chunkX * 16;
        const startZ = chunkZ * 16;

        for (let x = 0; x < 16; x++) {
            for (let z = 0; z < 16; z++) {
                const wx = startX + x;
                const wz = startZ + z;
                const height = this.noise.getHeight(wx, wz);

                for (let y = -64; y <= height; y++) {
                    if (this.subType === 7 && this.noise.getCaveNoise(wx, y, wz) > 0.65) continue;

                    if (y < height - 5) dimension.setBlockType({x: wx, y, z: wz}, "minecraft:stone");
                    else if (y < height) dimension.setBlockType({x: wx, y, z: wz}, "minecraft:dirt");
                }
                dimension.setBlockType({x: wx, y: height, z: wz}, "minecraft:grass_block");
            }
        }
        const centerX = startX + 8;
        const centerZ = startZ + 8;

        switch (this.subType) {
            case 0: this.generateMountainLake(dimension, centerX, centerZ, 120); break;
            case 1: this.generateWheatFarm(dimension, startX, startZ, 64); break;
            case 2: this.generateMixedFarm(dimension, startX, startZ, 64); break;
            case 3: this.generatePotatoFarm(dimension, startX, startZ, 64); break;
            case 4: this.generateTerraceMountain(dimension, centerX, centerZ); break;
            case 6: this.generateRiverMountain(dimension, centerX, centerZ, 110); break;
            case 7: this.addCaveDecor(dimension, centerX, centerZ); break;
            case 8: this.generateSmallHills(dimension, startX, startZ); break;
    case 9: this.generateDeepCanyon(dimension, centerX, centerZ); break;
    case 10: this.generateVolcanoLavaRiver(dimension, centerX, centerZ); break;
}
        }
    }
}