import { Vector4 } from './Vector4.js';
import { Support } from './Support.js';

export class TerrainGenerator {
    constructor(system) {
        this.system = system;
        this.support = new Support(system);
    }
    
    // Tạo hố bom
    createCrater(centerX, centerY, centerZ, radius = 15, depth = 10) {
        for (let x = -radius; x <= radius; x++) {
            for (let z = -radius; z <= radius; z++) {
                const distance = Math.sqrt(x*x + z*z);
                if (distance <= radius) {
                    const depthMultiplier = 1 - (distance / radius);
                    const craterDepth = depth * depthMultiplier;
                    
                    for (let y = 0; y >= -craterDepth; y--) {
                        const posX = Math.floor(centerX + x);
                        const posY = Math.floor(centerY + y);
                        const posZ = Math.floor(centerZ + z);
                        
                        if (y === -Math.floor(craterDepth)) {
                            // Đáy hố
                            this.support.setBlock(posX, posY, posZ, "minecraft:obsidian");
                        } else {
                            // Thành hố
                            this.support.setBlock(posX, posY, posZ, "minecraft:stone");
                        }
                    }
                    
                    // Thêm hiệu ứng cháy xung quanh
                    if (distance >= radius - 2 && distance <= radius) {
                        this.support.setBlock(
                            Math.floor(centerX + x),
                            Math.floor(centerY),
                            Math.floor(centerZ + z),
                            "minecraft:fire"
                        );
                    }
                }
            }
        }
        
        // Thêm vật phẩm trong hố bom
        this.support.spawnEntity(
            "minecraft:tnt",
            centerX,
            centerY - depth + 2,
            centerZ
        );
    }
    
    // Tạo thung lũng
    createValley(startX, startY, startZ, length = 30, width = 10, depth = 8) {
        for (let l = 0; l < length; l++) {
            for (let w = -width; w <= width; w++) {
                const valleyWidth = width * Math.sin(l / length * Math.PI);
                
                if (Math.abs(w) <= valleyWidth) {
                    const valleyDepth = depth * (1 - Math.abs(w) / valleyWidth);
                    
                    for (let d = 0; d >= -valleyDepth; d--) {
                        const posX = Math.floor(startX + l);
                        const posY = Math.floor(startY + d);
                        const posZ = Math.floor(startZ + w);
                        
                        if (d === -Math.floor(valleyDepth)) {
                            // Đáy thung lũng
                            this.support.setBlock(posX, posY, posZ, "minecraft:grass_path");
                        } else if (d === -Math.floor(valleyDepth) + 1) {
                            // Lớp đất
                            this.support.setBlock(posX, posY, posZ, "minecraft:dirt");
                        } else {
                            // Không khí
                            this.support.setBlock(posX, posY, posZ, "minecraft:air");
                        }
                    }
                    
                    // Thêm nước ở đáy
                    if (Math.abs(w) <= 2) {
                        this.support.setBlock(
                            Math.floor(startX + l),
                            Math.floor(startY - valleyDepth + 1),
                            Math.floor(startZ + w),
                            "minecraft:water"
                        );
                    }
                }
            }
        }
    }
    
    // Tạo khe nứt
    createCanyon(centerX, centerY, centerZ, length = 40, width = 5, depth = 20) {
        for (let l = 0; l < length; l++) {
            const currentWidth = width * (0.8 + 0.2 * Math.sin(l / 10));
            
            for (let w = -currentWidth; w <= currentWidth; w++) {
                for (let d = 0; d >= -depth; d--) {
                    const posX = Math.floor(centerX + l);
                    const posY = Math.floor(centerY + d);
                    const posZ = Math.floor(centerZ + w);
                    
                    if (d >= -depth + 3) {
                        // Thành khe nứt
                        this.support.setBlock(posX, posY, posZ, "minecraft:stone");
                    } else if (d === -depth + 2) {
                        // Lớp quặng
                        this.support.setBlock(posX, posY, posZ, "minecraft:iron_ore");
                    } else {
                        // Đáy khe nứt
                        this.support.setBlock(posX, posY, posZ, "minecraft:cobblestone");
                    }
                }
            }
        }
        
        // Thêm thang ở một bên
        for (let y = 0; y > -depth + 5; y--) {
            this.support.setBlock(
                Math.floor(centerX + 5),
                Math.floor(centerY + y),
                Math.floor(centerZ - width - 1),
                "minecraft:ladder"
            );
        }
    }
    
    // Tạo rãnh xương
    createBonesTrench(centerX, centerY, centerZ, length = 25, width = 8) {
        for (let l = 0; l < length; l++) {
            for (let w = -width; w <= width; w++) {
                // Đào rãnh
                for (let y = 0; y >= -5; y--) {
                    const posX = Math.floor(centerX + l);
                    const posY = Math.floor(centerY + y);
                    const posZ = Math.floor(centerZ + w);
                    
                    if (y === -5) {
                        // Đáy rãnh với xương
                        if (Math.random() > 0.7) {
                            this.support.setBlock(posX, posY, posZ, "minecraft:bone_block");
                        } else {
                            this.support.setBlock(posX, posY, posZ, "minecraft:soul_sand");
                        }
                    } else {
                        this.support.setBlock(posX, posY, posZ, "minecraft:air");
                    }
                }
                
                // Thêm xương ngẫu nhiên
                if (Math.random() > 0.8) {
                    this.support.spawnEntity(
                        "minecraft:item",
                        centerX + l,
                        centerY - 4,
                        centerZ + w,
                        { item: "minecraft:bone", count: Math.floor(Math.random() * 3) + 1 }
                    );
                }
                
                // Thêm đầu lâu
                if (Math.random() > 0.9) {
                    this.support.setBlock(
                        Math.floor(centerX + l),
                        Math.floor(centerY - 4),
                        Math.floor(centerZ + w),
                        "minecraft:skull"
                    );
                }
            }
        }
        
        // Thêm mob xương
        for (let i = 0; i < 3; i++) {
            this.support.spawnEntity(
                "minecraft:skeleton",
                centerX + Math.random() * length,
                centerY - 3,
                centerZ + (Math.random() - 0.5) * width * 2
            );
        }
    }
    
    // Tạo núi hình đầu lâu
    createSkullMountain(centerX, centerY, centerZ, size = 20) {
        // Tạo thân núi
        for (let x = -size; x <= size; x++) {
            for (let z = -size; z <= size; z++) {
                const distance = Math.sqrt(x*x + z*z);
                if (distance <= size) {
                    const height = Math.floor((1 - distance/size) * size * 1.5);
                    
                    for (let y = 0; y <= height; y++) {
                        const posX = Math.floor(centerX + x);
                        const posY = Math.floor(centerY + y);
                        const posZ = Math.floor(centerZ + z);
                        
                        this.support.setBlock(posX, posY, posZ, "minecraft:stone");
                    }
                }
            }
        }
        
        // Tạo hình đầu lâu
        const skullSize = size * 0.6;
        
        // Mắt trái
        this.createSkullEye(centerX - skullSize/3, centerY + skullSize, centerZ, skullSize/4);
        
        // Mắt phải
        this.createSkullEye(centerX + skullSize/3, centerY + skullSize, centerZ, skullSize/4);
        
        // Miệng
        for (let x = -skullSize/2; x <= skullSize/2; x++) {
            for (let z = -skullSize/8; z <= skullSize/8; z++) {
                if (Math.abs(x) >= skullSize/3) {
                    const posX = Math.floor(centerX + x);
                    const posY = Math.floor(centerY + skullSize * 0.7);
                    const posZ = Math.floor(centerZ + z);
                    
                    this.support.setBlock(posX, posY, posZ, "minecraft:air");
                    this.support.setBlock(posX, posY - 1, posZ, "minecraft:obsidian");
                }
            }
        }
        
        // Thêm hang động bên trong
        this.support.setBlock(centerX, centerY + 5, centerZ, "minecraft:air");
        this.support.setBlock(centerX, centerY + 4, centerZ, "minecraft:chest");
        
        // Thêm kho báu
        const chestData = {
            items: [
                {
                    item: "minecraft:diamond",
                    count: 3
                },
                {
                    item: "minecraft:gold_ingot",
                    count: 5
                }
            ]
        };
        this.support.setBlockData(centerX, centerY + 4, centerZ, chestData);
    }
    
    createSkullEye(eyeX, eyeY, eyeZ, radius) {
        for (let x = -radius; x <= radius; x++) {
            for (let y = -radius; y <= radius; y++) {
                for (let z = -radius; z <= radius; z++) {
                    const distance = Math.sqrt(x*x + y*y + z*z);
                    if (distance <= radius) {
                        const posX = Math.floor(eyeX + x);
                        const posY = Math.floor(eyeY + y);
                        const posZ = Math.floor(eyeZ + z);
                        
                        if (distance <= radius * 0.7) {
                            this.support.setBlock(posX, posY, posZ, "minecraft:air");
                        } else if (distance <= radius) {
                            this.support.setBlock(posX, posY, posZ, "minecraft:obsidian");
                        }
                    }
                }
            }
        }
        
        // Thêm lửa trong mắt
        this.support.setBlock(eyeX, eyeY, eyeZ, "minecraft:fire");
    }
}