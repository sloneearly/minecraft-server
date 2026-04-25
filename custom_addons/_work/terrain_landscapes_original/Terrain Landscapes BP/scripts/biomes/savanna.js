import { BiomeBase } from "./base.js";

export class SavannaBiome extends BiomeBase {
    constructor(noise) {
        super(noise);
        this.subType = Math.floor(Math.random() * 13); // 0-3
    }

    generate(dimension, chunkX, chunkZ) {
        const startX = chunkX * 16;
        const startZ = chunkZ * 16;
        
        for (let x = 0; x < 16; x++) {
            for (let z = 0; z < 16; z++) {
                const wx = startX + x;
                const wz = startZ + z;
                const baseHeight = this.noise.getHeight(wx, wz);
                const wavyHeight = baseHeight + this.noise.wavy(wx, wz, 12); 

                for (let y = -64; y <= wavyHeight; y++) {
                    if (y < wavyHeight - 4) {
                        dimension.setBlockType({x: wx, y, z: wz}, "minecraft:stone");
                    } else {
                        dimension.setBlockType({x: wx, y, z: wz}, "minecraft:coarse_dirt");
                    }
                }
                dimension.setBlockType({x: wx, y: wavyHeight, z: wz}, 
                    Math.random() > 0.7 ? "minecraft:sand" : "minecraft:grass_block"
                );
            }
        }

        const centerX = startX + 8;
        const centerZ = startZ + 8;

        switch (this.subType) {
            case 1: this.generateMountainLake(dimension, centerX, centerZ, 110); break;
            case 2: this.generateRiverMountain(dimension, centerX, centerZ, 105); break;
            case 3: this.generateSmallHills(dimension, startX, startZ); break;
    case 4: this.generateDeepCanyon(dimension, centerX, centerZ); break;
    case 5: this.generateVolcanoLavaRiver(dimension, centerX, centerZ); break;
    case 6: this.generateDesertOasis(dimension, centerX, centerZ); break; 
        }
    }

    generateMountainLake(dimension, centerX, centerZ, peakHeight) {
        for (let r = 0; r < 35; r++) {  
            for (let a = 0; a < 360; a += 12) {
                const x = centerX + Math.cos(a * Math.PI / 180) * r;
                const z = centerZ + Math.sin(a * Math.PI / 180) * r;
                const h = peakHeight - r * 0.85;
                dimension.fillBlocks(
                    {x: Math.floor(x), y: 75, z: Math.floor(z)},
                    {x: Math.floor(x), y: h, z: Math.floor(z)},
                    "minecraft:stone"
                );
            }
        }
        dimension.fillBlocks(
            {x: centerX-3, y: peakHeight-3, z: centerZ-3},
            {x: centerX+3, y: peakHeight-1, z: centerZ+3},
            "minecraft:water"
        );
        for (let i = 0; i < 20; i++) {
            const rx = centerX - 3 + Math.random() * 6;
            const rz = centerZ - 3 + Math.random() * 6;
            const block = Math.random() > 0.5 ? "minecraft:seagrass" : "minecraft:kelp";
            dimension.setBlockType({x: Math.floor(rx), y: peakHeight-3, z: Math.floor(rz)}, block);
        }
    }

    generateRiverMountain(dimension, centerX, centerZ, peakHeight) {
        for (let r = 0; r < 30; r++) {
            for (let a = 0; a < 360; a += 10) {
                const x = centerX + Math.cos(a * Math.PI / 180) * r * 0.7;
                const z = centerZ + Math.sin(a * Math.PI / 180) * r * 0.7;
                const h = peakHeight - r * 0.9;
                dimension.fillBlocks(
                    {x: Math.floor(x), y: 70, z: Math.floor(z)},
                    {x: Math.floor(x), y: h, z: Math.floor(z)},
                    "minecraft:stone"
                );
            }
        }
        const riverRadius = 35;
        for (let a = 0; a < 360; a += 6) {
            const rx = centerX + Math.cos(a * Math.PI / 180) * riverRadius;
            const rz = centerZ + Math.sin(a * Math.PI / 180) * riverRadius;
            for (let w = -2; w <= 2; w++) {
                const wx = rx + Math.cos((a + 90) * Math.PI / 180) * w;
                const wz = rz + Math.sin((a + 90) * Math.PI / 180) * w;
                dimension.fillBlocks(
                    {x: Math.floor(wx), y: 63, z: Math.floor(wz)},
                    {x: Math.floor(wx), y: 66, z: Math.floor(wz)},
                    "minecraft:water"
                );
                dimension.setBlockType({x: Math.floor(wx), y: 62, z: Math.floor(wz)}, "minecraft:sand");
            }
        }
    }

    generateSmallHills(dimension, startX, startZ) {
        for (let i = 0; i < 10; i++) {  
            const hx = startX + Math.random() * 16;
            const hz = startZ + Math.random() * 16;
            const hillHeight = 68 + this.noise.getHillNoise(hx, hz);
            const hillR = 2.5 + Math.random() * 2.5;
            for (let r = 0; r < hillR; r++) {
                for (let a = 0; a < 360; a += 20) {
                    const ux = hx + Math.cos(a * Math.PI / 180) * r;
                    const uz = hz + Math.sin(a * Math.PI / 180) * r;
                    const uh = hillHeight - r * 1.1;
                    dimension.fillBlocks(
                        {x: Math.floor(ux), y: 63, z: Math.floor(uz)},
                        {x: Math.floor(ux), y: uh, z: Math.floor(uz)},
                        "minecraft:coarse_dirt"
                    );
                    dimension.setBlockType({x: Math.floor(ux), y: uh, z: Math.floor(uz)}, "minecraft:grass_block");
                }
            }
        }
        
generateDeepCanyon(dimension, centerX, centerZ, depth = 45) {
    for (let wx = centerX - 5; wx <= centerX + 5; wx++) {
        for (let wz = centerZ - 5; wz <= centerZ + 5; wz++) {
            for (let wy = 25 - depth; wy <= 25; wy++) {
                dimension.setBlockType({x: wx, y: wy, z: wz}, "minecraft:air");
            }
            dimension.setBlockType({x: wx, y: 25, z: wz}, "minecraft:cobblestone");
            if (Math.random() < 0.2) dimension.setBlockType({x: wx, y: 30, z: wz}, "minecraft:mossy_cobblestone");
            if (Math.random() < 0.1) dimension.setBlockType({x: wx, y: 20, z: wz}, "minecraft:diamond_ore");
        }
    }
    dimension.fillBlocks(
        {x: centerX, y: 25 - depth + 10, z: centerZ},
        {x: centerX, y: 25, z: centerZ},
        "minecraft:water"
    );
    for (let i = 0; i < 40; i++) {
        const vx = centerX + (Math.random() - 0.5) * 10;
        const vz = centerZ + (Math.random() - 0.5) * 10;
        const vy = 25 + Math.random() * 10;
        dimension.setBlockType({x: Math.floor(vx), y: Math.floor(vy), z: Math.floor(vz)}, "minecraft:vine");
    }
}

generateVolcanoLavaRiver(dimension, centerX, centerZ, peakHeight = 130) {
    for (let r = 0; r < 45; r++) {
        for (let a = 0; a < 360; a += 8) {
            const rad = a * Math.PI / 180;
            const x = centerX + Math.cos(rad) * r;
            const z = centerZ + Math.sin(rad) * r;
            const h = peakHeight - r * 0.7;
            dimension.fillBlocks(
                {x: Math.floor(x), y: 80, z: Math.floor(z)},
                {x: Math.floor(x), y: h, z: Math.floor(z)},
                Math.random() > 0.5 ? "minecraft:basalt" : "minecraft:andesite"
            );
        }
    }
    dimension.fillBlocks(
        {x: centerX-4, y: peakHeight-5, z: centerZ-4},
        {x: centerX+3, y: peakHeight-1, z: centerZ+3},
        "minecraft:lava"
    );
    const riverRadius = 45;
    for (let a = 0; a < 360; a += 5) {
        const rad = a * Math.PI / 180;
        const rx = centerX + Math.cos(rad) * riverRadius;
        const rz = centerZ + Math.sin(rad) * riverRadius;
        for (let w = -2; w <= 2; w++) {
            const wx = rx + Math.cos(rad + Math.PI / 2) * w; 
            const wz = rz + Math.sin(rad + Math.PI / 2) * w;
            dimension.fillBlocks(
                {x: Math.floor(wx), y: 65, z: Math.floor(wz)},
                {x: Math.floor(wx), y: 68, z: Math.floor(wz)},
                "minecraft:lava"
            );
            dimension.setBlockType({x: Math.floor(wx), y: 64, z: Math.floor(wz)}, "minecraft:netherrack");
        }
    }
}

generateDesertOasis(dimension, centerX, centerZ) {
    dimension.fillBlocks(
        {x: centerX-6, y: 64, z: centerZ-6},
        {x: centerX+5, y: 67, z: centerZ+5},
        "minecraft:water"
    );
    for (let r = 0; r < 20; r++) {
        for (let a = 0; a < 360; a += 10) {
            const rad = a * Math.PI / 180;
            const x = centerX + Math.cos(rad) * r;
            const z = centerZ + Math.sin(rad) * r;
            dimension.setBlockType({x: Math.floor(x), y: 64, z: Math.floor(z)}, "minecraft:sand");
        }
    }
    for (let i = 0; i < 6; i++) {
        const tx = centerX + (Math.random() - 0.5) * 12;
        const tz = centerZ + (Math.random() - 0.5) * 12;
        dimension.fillBlocks(
            {x: Math.floor(tx), y: 68, z: Math.floor(tz)},
            {x: Math.floor(tx), y: 74, z: Math.floor(tz)},
            "minecraft:acacia_log"
        );
        dimension.fillBlocks(
            {x: Math.floor(tx)-2, y: 75, z: Math.floor(tz)-2},
            {x: Math.floor(tx)+2, y: 77, z: Math.floor(tz)+2},
            "minecraft:acacia_leaves"
        );
    }
    for (let i = 0; i < 50; i++) {
        const vx = centerX + (Math.random() - 0.5) * 12;
        const vz = centerZ + (Math.random() - 0.5) * 12;
        if (Math.random() < 0.6) {
            dimension.setBlockType({x: Math.floor(vx), y: 68, z: Math.floor(vz)}, "minecraft:vine");
        } else {
            dimension.setBlockType({x: Math.floor(vx), y: 67, z: Math.floor(vz)}, "minecraft:sugar_cane");
        }
    }
}
    }
}