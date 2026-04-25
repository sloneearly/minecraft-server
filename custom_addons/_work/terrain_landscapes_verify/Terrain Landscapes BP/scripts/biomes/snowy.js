// scripts/biomes/snowy.js - Snowy Plains Biome HOÀN CHỈNH
// Đặc điểm: Đồng bằng lượn sóng thấp + tuyết, ice patches

import { BiomeBase } from "./base.js";

export class SnowyBiome extends BiomeBase {
    constructor(noise) {
        super(noise);
    }

    generate(dimension, chunkX, chunkZ) {
        const startX = chunkX * 16;
        const startZ = chunkZ * 16;

        // Base terrain: Low wavy + snow
        for (let x = 0; x < 16; x++) {
            for (let z = 0; z < 16; z++) {
                const wx = startX + x;
                const wz = startZ + z;
                const baseHeight = 58 + this.noise.getHeight(wx, wz) * 0.3;  // Thấp hơn
                const wavyHeight = baseHeight + this.noise.wavy(wx * 1.5, wz * 1.5, 6); // Lượn sóng mạnh

                for (let y = -64; y <= wavyHeight; y++) {
                    if (y < wavyHeight - 3) {
                        dimension.setBlockType({x: wx, y, z: wz}, "minecraft:stone");
                    } else {
                        dimension.setBlockType({x: wx, y, z: wz}, "minecraft:snow_block");
                    }
                }
                dimension.setBlockType({x: wx, y: wavyHeight, z: wz}, "minecraft:snowy_grass_block");
                dimension.setBlockType({x: wx, y: wavyHeight + 1, z: wz}, "minecraft:snow_layer");

                // Ice patches random (frozen ponds)
                if (Math.random() < 0.15) {
                    dimension.setBlockType({x: wx, y: wavyHeight, z: wz}, "minecraft:ice");
                }
            }
        }

        // Optional: Thêm pine trees hoặc igloo nhỏ nếu muốn mở rộng
    }
}