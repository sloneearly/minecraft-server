// Main.js - Kết hợp hệ thống Terrain Generator và Terrain Editor
import { world, system } from "@minecraft/server";

// ================================
// PHẦN 1: HỆ THỐNG TERRAIN EDITOR
// ================================
const { Vector3, BoundingBox, TerrainUtils } = require('./Vectorabs.js');

class TerrainExpander {
    constructor() {
        this.operations = [];
        this.isProcessing = false;
        this.currentOperation = null;
    }
    
    // Mở rộng địa hình theo nhiều hướng
    expandTerrain(world, center, radius, options = {}) {
        if (this.isProcessing) {
            console.warn("Đang xử lý thao tác trước đó!");
            return false;
        }
        
        const defaultOptions = {
            targetHeight: null,
            smoothEdges: true,
            fillLiquid: true,
            preserveTrees: true,
            blockType: "minecraft:grass_block",
            layerBlock: "minecraft:dirt"
        };
        
        options = { ...defaultOptions, ...options };
        
        this.currentOperation = {
            type: "expand",
            center: center,
            radius: radius,
            options: options,
            status: "preparing",
            progress: 0
        };
        
        this.operations.push(this.currentOperation);
        this.isProcessing = true;
        
        // Xử lý bất đồng bộ để không lag game
        this.processExpansionAsync(world, center, radius, options);
        
        return true;
    }
    
    async processExpansionAsync(world, center, radius, options) {
        try {
            this.currentOperation.status = "calculating";
            console.log(`Bắt đầu mở rộng địa hình tại ${center.toString()} với bán kính ${radius}`);
            
            // Tính toán khu vực
            const minX = center.x - radius;
            const maxX = center.x + radius;
            const minZ = center.z - radius;
            const maxZ = center.z + radius;
            
            const totalBlocks = (maxX - minX + 1) * (maxZ - minZ + 1);
            let processedBlocks = 0;
            
            // Xác định độ cao mục tiêu
            let targetHeight = options.targetHeight;
            if (!targetHeight) {
                targetHeight = TerrainUtils.getAverageHeight(world, center.x, center.z, Math.min(radius, 10));
                console.log(`Độ cao mục tiêu tự động: ${targetHeight}`);
            }
            
            // Danh sách block cần bảo tồn
            const preserveBlocks = [
                "minecraft:oak_log", "minecraft:spruce_log", "minecraft:birch_log",
                "minecraft:jungle_log", "minecraft:acacia_log", "minecraft:dark_oak_log",
                "minecraft:oak_leaves", "minecraft:spruce_leaves", "minecraft:birch_leaves",
                "minecraft:jungle_leaves", "minecraft:acacia_leaves", "minecraft:dark_oak_leaves"
            ];
            
            this.currentOperation.status = "expanding";
            
            // Xử lý từng cột
            for (let x = minX; x <= maxX; x++) {
                for (let z = minZ; z <= maxZ; z++) {
                    // Tính khoảng cách để làm mịn cạnh
                    const distance = Math.sqrt((x - center.x)**2 + (z - center.z)**2);
                    
                    if (distance <= radius) {
                        // Xác định độ cao cho vị trí này
                        let currentTargetHeight = targetHeight;
                        
                        if (options.smoothEdges && distance > radius - 3) {
                            // Làm mịn cạnh
                            const edgeFactor = 1 - ((distance - (radius - 3)) / 3);
                            const currentHeight = TerrainUtils.getHeightAt(world, x, z);
                            currentTargetHeight = Math.floor(
                                currentHeight + (targetHeight - currentHeight) * edgeFactor
                            );
                        }
                        
                        // Xử lý cột địa hình
                        this.processTerrainColumn(world, x, z, currentTargetHeight, options, preserveBlocks);
                    }
                    
                    processedBlocks++;
                    this.currentOperation.progress = processedBlocks / totalBlocks;
                    
                    // Chia nhỏ để không lag game
                    if (processedBlocks % 100 === 0) {
                        await this.delay(0);
                    }
                }
            }
            
            // Làm mịn địa hình nếu cần
            if (options.smoothEdges) {
                await this.smoothTerrain(world, minX, maxX, minZ, maxZ, targetHeight, radius);
            }
            
            this.currentOperation.status = "completed";
            this.currentOperation.progress = 1;
            console.log(`Hoàn thành mở rộng địa hình!`);
            
        } catch (error) {
            console.error(`Lỗi khi mở rộng địa hình: ${error}`);
            this.currentOperation.status = "failed";
            this.currentOperation.error = error.message;
        } finally {
            this.isProcessing = false;
        }
    }
    
    processTerrainColumn(world, x, z, targetHeight, options, preserveBlocks) {
        const currentHeight = TerrainUtils.getHeightAt(world, x, z);
        
        if (currentHeight < targetHeight) {
            // Cần nâng cao địa hình
            for (let y = currentHeight + 1; y <= targetHeight; y++) {
                // Kiểm tra block hiện tại
                const existingBlock = world.getBlock(x, y, z);
                
                if (existingBlock && options.preserveTrees && 
                    preserveBlocks.includes(existingBlock.type)) {
                    continue; // Bỏ qua cây
                }
                
                // Kiểm tra chất lỏng
                if (options.fillLiquid && (
                    TerrainUtils.isInWater(world, x, y, z) || 
                    TerrainUtils.isInLava(world, x, y, z)
                )) {
                    world.setBlock(x, y, z, "minecraft:cobblestone");
                    continue;
                }
                
                // Đặt block
                if (y === targetHeight) {
                    world.setBlock(x, y, z, options.blockType);
                } else if (y >= targetHeight - 3) {
                    world.setBlock(x, y, z, options.layerBlock);
                } else {
                    world.setBlock(x, y, z, "minecraft:stone");
                }
            }
        } else if (currentHeight > targetHeight) {
            // Cần hạ thấp địa hình
            for (let y = currentHeight; y > targetHeight; y--) {
                const existingBlock = world.getBlock(x, y, z);
                
                if (existingBlock && options.preserveTrees && 
                    preserveBlocks.includes(existingBlock.type)) {
                    continue; // Bỏ qua cây
                }
                
                world.setBlock(x, y, z, "minecraft:air");
            }
            
            // Đặt block bề mặt
            world.setBlock(x, targetHeight, z, options.blockType);
        }
        
        // Thêm lớp dưới bề mặt
        for (let y = targetHeight - 1; y >= targetHeight - 3; y--) {
            if (!world.getBlock(x, y, z) || 
                world.getBlock(x, y, z).type === "minecraft:air") {
                world.setBlock(x, y, z, options.layerBlock);
            }
        }
    }
    
    async smoothTerrain(world, minX, maxX, minZ, maxZ, baseHeight, radius) {
        console.log("Đang làm mịn địa hình...");
        
        const smoothingPasses = 2;
        
        for (let pass = 0; pass < smoothingPasses; pass++) {
            const heightMap = {};
            
            // Tạo bản đồ độ cao
            for (let x = minX; x <= maxX; x++) {
                for (let z = minZ; z <= maxZ; z++) {
                    const key = `${x},${z}`;
                    heightMap[key] = TerrainUtils.getHeightAt(world, x, z);
                }
            }
            
            // Làm mịn
            for (let x = minX + 1; x < maxX; x++) {
                for (let z = minZ + 1; z < maxZ; z++) {
                    const distance = Math.sqrt((x - (minX + maxX)/2)**2 + (z - (minZ + maxZ)/2)**2);
                    
                    if (distance <= radius) {
                        // Tính độ cao trung bình xung quanh
                        let total = 0;
                        let count = 0;
                        
                        for (let dx = -1; dx <= 1; dx++) {
                            for (let dz = -1; dz <= 1; dz++) {
                                const neighborKey = `${x + dx},${z + dz}`;
                                if (heightMap[neighborKey] !== undefined) {
                                    total += heightMap[neighborKey];
                                    count++;
                                }
                            }
                        }
                        
                        const avgHeight = Math.floor(total / count);
                        const currentHeight = heightMap[`${x},${z}`];
                        
                        // Điều chỉnh nếu chênh lệch lớn
                        if (Math.abs(currentHeight - avgHeight) > 2) {
                            this.adjustTerrainColumn(world, x, z, avgHeight);
                        }
                    }
                    
                    if ((x * z) % 50 === 0) {
                        await this.delay(0);
                    }
                }
            }
        }
    }
    
    adjustTerrainColumn(world, x, z, targetHeight) {
        const currentHeight = TerrainUtils.getHeightAt(world, x, z);
        
        if (currentHeight < targetHeight) {
            // Thêm block
            for (let y = currentHeight + 1; y <= targetHeight; y++) {
                if (y === targetHeight) {
                    world.setBlock(x, y, z, "minecraft:grass_block");
                } else if (y >= targetHeight - 2) {
                    world.setBlock(x, y, z, "minecraft:dirt");
                }
            }
        } else if (currentHeight > targetHeight) {
            // Xóa block
            for (let y = currentHeight; y > targetHeight; y--) {
                world.setBlock(x, y, z, "minecraft:air");
            }
            world.setBlock(x, targetHeight, z, "minecraft:grass_block");
        }
    }
    
    // Làm phẳng địa hình trong khu vực
    flattenArea(world, pos1, pos2, options = {}) {
        if (this.isProcessing) {
            console.warn("Đang xử lý thao tác trước đó!");
            return false;
        }
        
        const defaultOptions = {
            targetHeight: null,
            fillMode: "average", // "average", "lowest", "highest", "custom"
            customHeight: 64,
            removeTrees: false,
            fillWater: true,
            surfaceBlock: "minecraft:grass_block"
        };
        
        options = { ...defaultOptions, ...options };
        
        const area = new BoundingBox(pos1, pos2);
        const center = area.getCenter();
        const size = area.getSize();
        const radius = Math.max(size.x, size.z) / 2;
        
        this.currentOperation = {
            type: "flatten",
            area: area,
            options: options,
            status: "preparing",
            progress: 0
        };
        
        this.operations.push(this.currentOperation);
        this.isProcessing = true;
        
        this.processFlatteningAsync(world, area, options);
        
        return true;
    }
    
    async processFlatteningAsync(world, area, options) {
        try {
            this.currentOperation.status = "calculating";
            
            const min = area.min;
            const max = area.max;
            
            // Tính độ cao mục tiêu
            let targetHeight = options.targetHeight;
            
            if (!targetHeight) {
                if (options.fillMode === "average") {
                    targetHeight = this.calculateAverageHeight(world, min, max);
                } else if (options.fillMode === "lowest") {
                    targetHeight = this.calculateLowestHeight(world, min, max);
                } else if (options.fillMode === "highest") {
                    targetHeight = this.calculateHighestHeight(world, min, max);
                } else {
                    targetHeight = options.customHeight;
                }
            }
            
            console.log(`Làm phẳng khu vực từ ${min.toString()} đến ${max.toString()}`);
            console.log(`Độ cao mục tiêu: ${targetHeight}`);
            
            const totalBlocks = (max.x - min.x + 1) * (max.z - min.z + 1);
            let processedBlocks = 0;
            
            this.currentOperation.status = "flattening";
            
            // Xử lý từng cột
            for (let x = min.x; x <= max.x; x++) {
                for (let z = min.z; z <= max.z; z++) {
                    // Làm phẳng cột
                    this.flattenColumn(world, x, z, targetHeight, options);
                    
                    processedBlocks++;
                    this.currentOperation.progress = processedBlocks / totalBlocks;
                    
                    if (processedBlocks % 100 === 0) {
                        await this.delay(0);
                    }
                }
            }
            
            // Làm mịn biên
            await this.smoothAreaEdges(world, area, targetHeight);
            
            this.currentOperation.status = "completed";
            this.currentOperation.progress = 1;
            console.log(`Hoàn thành làm phẳng địa hình!`);
            
        } catch (error) {
            console.error(`Lỗi khi làm phẳng địa hình: ${error}`);
            this.currentOperation.status = "failed";
            this.currentOperation.error = error.message;
        } finally {
            this.isProcessing = false;
        }
    }
    
    flattenColumn(world, x, z, targetHeight, options) {
        const currentHeight = TerrainUtils.getHeightAt(world, x, z);
        
        if (currentHeight < targetHeight) {
            // Đổ đầy
            for (let y = currentHeight + 1; y <= targetHeight; y++) {
                // Kiểm tra chất lỏng
                if (options.fillWater && TerrainUtils.isInWater(world, x, y, z)) {
                    world.setBlock(x, y, z, "minecraft:dirt");
                    continue;
                }
                
                // Đặt block
                if (y === targetHeight) {
                    world.setBlock(x, y, z, options.surfaceBlock);
                } else if (y >= targetHeight - 3) {
                    world.setBlock(x, y, z, "minecraft:dirt");
                } else {
                    world.setBlock(x, y, z, "minecraft:stone");
                }
            }
        } else if (currentHeight > targetHeight) {
            // Đào xuống
            for (let y = currentHeight; y > targetHeight; y--) {
                const block = world.getBlock(x, y, z);
                
                // Kiểm tra có nên xóa cây không
                if (options.removeTrees || !this.isTreeBlock(block)) {
                    world.setBlock(x, y, z, "minecraft:air");
                }
            }
            
            // Đặt bề mặt
            world.setBlock(x, targetHeight, z, options.surfaceBlock);
        }
        
        // Thêm lớp đất bên dưới
        for (let y = targetHeight - 1; y >= targetHeight - 3; y--) {
            if (!world.getBlock(x, y, z) || 
                world.getBlock(x, y, z).type === "minecraft:air") {
                world.setBlock(x, y, z, "minecraft:dirt");
            }
        }
    }
    
    calculateAverageHeight(world, min, max) {
        let totalHeight = 0;
        let count = 0;
        
        for (let x = min.x; x <= max.x; x += 2) {
            for (let z = min.z; z <= max.z; z += 2) {
                totalHeight += TerrainUtils.getHeightAt(world, x, z);
                count++;
            }
        }
        
        return count > 0 ? Math.floor(totalHeight / count) : 64;
    }
    
    calculateLowestHeight(world, min, max) {
        let lowest = 320;
        
        for (let x = min.x; x <= max.x; x += 2) {
            for (let z = min.z; z <= max.z; z += 2) {
                const height = TerrainUtils.getHeightAt(world, x, z);
                if (height < lowest) {
                    lowest = height;
                }
            }
        }
        
        return lowest !== 320 ? lowest : 64;
    }
    
    calculateHighestHeight(world, min, max) {
        let highest = -64;
        
        for (let x = min.x; x <= max.x; x += 2) {
            for (let z = min.z; z <= max.z; z += 2) {
                const height = TerrainUtils.getHeightAt(world, x, z);
                if (height > highest) {
                    highest = height;
                }
            }
        }
        
        return highest !== -64 ? highest : 64;
    }
    
    async smoothAreaEdges(world, area, targetHeight) {
        const min = area.min;
        const max = area.max;
        
        // Làm mịn các cạnh
        for (let x = min.x - 2; x <= max.x + 2; x++) {
            for (let z = min.z - 2; z <= max.z + 2; z++) {
                const isInside = area.contains(new Vector3(x, targetHeight, z));
                const isNearEdge = 
                    (x >= min.x - 2 && x <= max.x + 2 && z >= min.z - 2 && z <= max.z + 2) &&
                    !isInside;
                
                if (isNearEdge) {
                    const distanceToEdge = this.getDistanceToEdge(x, z, min, max);
                    if (distanceToEdge < 2) {
                        const edgeHeight = this.getInterpolatedHeight(world, x, z, area, targetHeight);
                        this.flattenColumn(world, x, z, edgeHeight, {
                            surfaceBlock: "minecraft:grass_block",
                            fillWater: true,
                            removeTrees: false
                        });
                    }
                }
                
                if ((x * z) % 50 === 0) {
                    await this.delay(0);
                }
            }
        }
    }
    
    getDistanceToEdge(x, z, min, max) {
        const distX = Math.min(Math.abs(x - min.x), Math.abs(x - max.x));
        const distZ = Math.min(Math.abs(z - min.z), Math.abs(z - max.z));
        return Math.min(distX, distZ);
    }
    
    getInterpolatedHeight(world, x, z, area, targetHeight) {
        const currentHeight = TerrainUtils.getHeightAt(world, x, z);
        const distance = this.getDistanceToEdge(x, z, area.min, area.max);
        
        if (distance <= 0) return targetHeight;
        if (distance >= 2) return currentHeight;
        
        const factor = distance / 2;
        return Math.floor(currentHeight * factor + targetHeight * (1 - factor));
    }
    
    isTreeBlock(block) {
        if (!block) return false;
        
        const treeBlocks = [
            "minecraft:oak_log", "minecraft:spruce_log", "minecraft:birch_log",
            "minecraft:jungle_log", "minecraft:acacia_log", "minecraft:dark_oak_log",
            "minecraft:oak_leaves", "minecraft:spruce_leaves", "minecraft:birch_leaves",
            "minecraft:jungle_leaves", "minecraft:acacia_leaves", "minecraft:dark_oak_leaves"
        ];
        
        return treeBlocks.includes(block.type);
    }
    
    // ================================
    // THÊM CÁC TÍNH NĂNG TỪ FILE THỨ HAI
    // ================================
    
    createCrater(x, y, z, radius = 15, depth = 10) {
        const center = new Vector3(x, y, z);
        const world = this.getDimension("overworld");
        
        for (let dx = -radius; dx <= radius; dx++) {
            for (let dz = -radius; dz <= radius; dz++) {
                const distance = Math.sqrt(dx*dx + dz*dz);
                if (distance <= radius) {
                    const currentX = x + dx;
                    const currentZ = z + dz;
                    
                    // Tính độ sâu dựa trên khoảng cách từ tâm
                    const craterDepth = depth * (1 - distance/radius);
                    
                    // Đào crater
                    for (let dy = 0; dy < craterDepth; dy++) {
                        const currentY = y - dy;
                        world.setBlock(currentX, currentY, currentZ, "minecraft:air");
                    }
                    
                    // Tạo sườn crater
                    if (distance > radius - 3) {
                        const slopeY = y - Math.floor(craterDepth * 0.7);
                        world.setBlock(currentX, slopeY, currentZ, "minecraft:stone");
                    }
                }
            }
        }
        
        console.log(`Đã tạo crater tại ${x}, ${y}, ${z}`);
    }
    
    createValley(x, y, z, length = 50, width = 15, depth = 8) {
        const world = this.getDimension("overworld");
        
        for (let l = 0; l < length; l++) {
            for (let w = -width; w <= width; w++) {
                const currentX = x + w;
                const currentZ = z + l;
                
                // Tính độ sâu dựa trên vị trí ngang
                const valleyDepth = depth * (1 - Math.abs(w)/width);
                
                // Đào valley
                for (let d = 0; d < valleyDepth; d++) {
                    const currentY = y - d;
                    world.setBlock(currentX, currentY, currentZ, "minecraft:air");
                }
                
                // Thêm nước nếu đủ sâu
                if (valleyDepth > 3) {
                    world.setBlock(currentX, y - valleyDepth + 1, currentZ, "minecraft:water");
                }
            }
        }
        
        console.log(`Đã tạo valley tại ${x}, ${y}, ${z}`);
    }
    
    createCanyon(x, y, z, length = 100, width = 10, depth = 20) {
        const world = this.getDimension("overworld");
        
        // Tạo canyon với các tầng địa chất khác nhau
        const layers = [
            { block: "minecraft:grass_block", depth: 1 },
            { block: "minecraft:dirt", depth: 3 },
            { block: "minecraft:stone", depth: 5 },
            { block: "minecraft:cobblestone", depth: 3 },
            { block: "minecraft:andesite", depth: 8 }
        ];
        
        for (let l = 0; l < length; l++) {
            // Tạo hình dạng canyon uốn lượn
            const canyonWidth = width + Math.sin(l * 0.1) * 5;
            
            for (let w = -canyonWidth; w <= canyonWidth; w++) {
                const currentX = x + w;
                const currentZ = z + l;
                
                // Tính độ sâu dựa trên vị trí ngang (sâu hơn ở giữa)
                const normalizedWidth = Math.abs(w) / canyonWidth;
                const canyonDepth = depth * (1 - normalizedWidth * 0.5);
                
                let currentDepth = 0;
                
                // Tạo các tầng địa chất
                for (const layer of layers) {
                    for (let d = 0; d < layer.depth && currentDepth < canyonDepth; d++, currentDepth++) {
                        const currentY = y - currentDepth;
                        world.setBlock(currentX, currentY, currentZ, layer.block);
                    }
                }
                
                // Xóa block để tạo khoảng trống cho canyon
                for (let d = 0; d < canyonDepth; d++) {
                    const currentY = y - d;
                    world.setBlock(currentX, currentY, currentZ, "minecraft:air");
                }
                
                // Thêm nước ở đáy canyon
                if (canyonDepth > 10) {
                    world.setBlock(currentX, y - canyonDepth + 1, currentZ, "minecraft:water");
                }
            }
            
            // Tạo cầu bắc ngang canyon
            if (l % 30 === 0) {
                this.createCanyonBridge(x, y, z + l, canyonWidth);
            }
        }
        
        console.log(`Đã tạo canyon tại ${x}, ${y}, ${z}`);
    }
    
    createCanyonBridge(x, y, z, width) {
        const world = this.getDimension("overworld");
        const bridgeLength = 5;
        
        for (let l = 0; l < bridgeLength; l++) {
            for (let w = -width; w <= width; w++) {
                const currentX = x + w;
                const currentZ = z + l;
                
                // Tạo mặt cầu
                world.setBlock(currentX, y + 3, currentZ, "minecraft:oak_planks");
                
                // Tạo trụ cầu
                if (Math.abs(w) === width || l === 0 || l === bridgeLength - 1) {
                    for (let h = 1; h <= 3; h++) {
                        world.setBlock(currentX, y + h, currentZ, "minecraft:oak_log");
                    }
                }
            }
        }
    }
    
    createBonesTrench(x, y, z, length = 40, width = 8, depth = 12) {
        const world = this.getDimension("overworld");
        
        for (let l = 0; l < length; l++) {
            for (let w = -width; w <= width; w++) {
                const currentX = x + w;
                const currentZ = z + l;
                
                // Tính độ sâu
                const trenchDepth = depth * (1 - Math.abs(w)/(width * 1.5));
                
                // Đào trench
                for (let d = 0; d < trenchDepth; d++) {
                    const currentY = y - d;
                    world.setBlock(currentX, currentY, currentZ, "minecraft:air");
                }
                
                // Rải xương và hộp sọ
                if (trenchDepth > 5 && Math.random() < 0.1) {
                    if (Math.random() < 0.3) {
                        world.setBlock(currentX, y - trenchDepth + 1, currentZ, "minecraft:skeleton_skull");
                    } else {
                        world.setBlock(currentX, y - trenchDepth + 1, currentZ, "minecraft:bone_block");
                    }
                }
                
                // Thêm rêu và đá cuội
                if (trenchDepth > 3) {
                    if (Math.random() < 0.2) {
                        world.setBlock(currentX, y - trenchDepth + 2, currentZ, "minecraft:mossy_cobblestone");
                    }
                    if (Math.random() < 0.1) {
                        world.setBlock(currentX, y - trenchDepth + 1, currentZ, "minecraft:vine");
                    }
                }
            }
        }
        
        console.log(`Đã tạo bones trench tại ${x}, ${y}, ${z}`);
    }
    
    createSkullMountain(x, y, z, size = 25) {
        const world = this.getDimension("overworld");
        
        // Tạo hình dạng núi cơ bản
        for (let dx = -size; dx <= size; dx++) {
            for (let dz = -size; dz <= size; dz++) {
                const distance = Math.sqrt(dx*dx + dz*dz);
                if (distance <= size) {
                    // Tính chiều cao dựa trên khoảng cách
                    const height = Math.floor((size - distance) * 1.5);
                    
                    for (let h = 0; h < height; h++) {
                        const currentX = x + dx;
                        const currentY = y + h;
                        const currentZ = z + dz;
                        
                        // Sử dụng đá để tạo núi
                        world.setBlock(currentX, currentY, currentZ, "minecraft:stone");
                    }
                }
            }
        }
        
        // Tạo hình hộp sọ trên đỉnh
        const skullY = y + Math.floor(size * 1.2);
        
        // Tạo mắt
        world.setBlock(x - 3, skullY, z, "minecraft:black_concrete");
        world.setBlock(x + 3, skullY, z, "minecraft:black_concrete");
        
        // Tạo mũi
        world.setBlock(x, skullY - 2, z, "minecraft:black_concrete");
        
        // Tạo miệng
        for (let mx = -2; mx <= 2; mx++) {
            world.setBlock(x + mx, skullY - 4, z, "minecraft:black_concrete");
        }
        
        // Thêm các chi tiết xương xung quanh
        for (let angle = 0; angle < 360; angle += 45) {
            const rad = angle * Math.PI / 180;
            const boneX = x + Math.floor(Math.cos(rad) * (size - 5));
            const boneZ = z + Math.floor(Math.sin(rad) * (size - 5));
            const boneY = y + Math.floor(size * 0.8);
            
            // Tạo cột xương
            for (let h = 0; h < 5; h++) {
                world.setBlock(boneX, boneY + h, boneZ, "minecraft:bone_block");
            }
        }
        
        console.log(`Đã tạo skull mountain tại ${x}, ${y}, ${z}`);
    }
    
    getDimension(name) {
        return world.getDimension(name);
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    getStatus() {
        if (!this.currentOperation) {
            return { isProcessing: false };
        }
        
        return {
            isProcessing: this.isProcessing,
            operation: this.currentOperation.type,
            status: this.currentOperation.status,
            progress: Math.floor(this.currentOperation.progress * 100),
            error: this.currentOperation.error
        };
    }
    
    cancelCurrentOperation() {
        if (this.isProcessing) {
            this.isProcessing = false;
            this.currentOperation.status = "cancelled";
            console.log("Đã hủy thao tác hiện tại");
            return true;
        }
        return false;
    }
}

// ================================
// PHẦN 2: HỆ THỐNG TERRAIN GENERATOR
// ================================
import { Generator } from "./terrain/generator.js";
import { config } from "./Config.js";
import { fbm2d, getTerrainIndex } from "./Lib.js";
import { initScoreboards, currentSeed, currentScale } from "./configB.js";
import { handleCommands } from "./modules/commands.js";
import { loadTerrain } from "./modules/loader.js";

// Import tất cả các terrain classes
import Flat from "./Flat.js";
import Rolling from "./Rolling.js";
import Highland from "./Highland.js";
import Ridge from "./Ridge.js";
import Peak from "./Peak.js";
import Foothills from "./Foothills.js";
import Cliff from "./Cliff.js";
import Plateau from "./Plateau.js";
import Valley from "./Valley.js";
import Basin from "./Basin.js";
import Canyon from "./Canyon.js";
import RiverShallow from "./River_shallow.js";
import RiverDeep from "./River_deep.js";
import RiverWide from "./River_wide.js";
import Hills from "./Hills.js";
import LowHills from "./Low_hills.js";
import SteepHills from "./Steep_hills.js";
import IslandSmall from "./Island_small.js";
import IslandLarge from "./Island_large.js";
import Archipelago from "./Archipelago.js";
import Coast from "./Coast.js";
import CoastRocky from "./Coast_rocky.js";
import CoastCliff from "./Coast_cliff.js";
import Snowfield from "./Snowfield.js";
import IceField from "./Ice_field.js";
import Alpine from "./Alpine.js";
import VerticalMountain from "./Vertical_mountain.js";
import HorizontalMountain from "./Horizontal_mountain.js";
import MountainLake from "./Mountain_lake.js";
import Lake from "./Lake.js";
import Waterfall from "./Waterfall.js";
import Spike from "./Spike.js";
import MesaPlateau from "./Mesa_plateau.js";
import MesaCliff from "./Mesa_cliff.js";
import MesaCanyon from "./Mesa_canyon.js";
import MesaValley from "./Mesa_valley.js";
import MesaPillars from "./Mesa_pillars.js";
import MesaRidges from "./Mesa_ridges.js";
import MesaBasins from "./Mesa_basins.js";
import MesaTerraces from "./Mesa_terraces.js";
import MesaOverhang from "./Mesa_overhang.js";
import MesaSpike from "./Mesa_spike.js";

const generator = new Generator();
const terrainExpander = new TerrainExpander();

// Giới hạn chiều cao cho hệ thống Overworld+ 
const HEIGHT_LIMIT = 320;
const LOWER_LIMIT = -64;

// ================================
// PHẦN 3: HỆ THỐNG COMMANDS TÍCH HỢP
// ================================

// Hàm tiện ích để sử dụng từ command cho Terrain Editor
function setupTerrainEditorCommands(expander) {
    const commands = {
        expand: {
            description: "Mở rộng địa hình xung quanh vị trí",
            usage: "/expand <radius> [height] [options]",
            execute: (sender, args) => {
                if (args.length < 1) {
                    sender.sendMessage("§cUsage: /expand <radius> [height] [options]");
                    sender.sendMessage("§eOptions: -notrees, -noliquid, -nosmooth");
                    return;
                }
                
                const radius = parseInt(args[0]);
                if (isNaN(radius) || radius < 1 || radius > 100) {
                    sender.sendMessage("§cBán kính phải từ 1 đến 100!");
                    return;
                }
                
                const center = new Vector3(
                    Math.floor(sender.location.x),
                    Math.floor(sender.location.y),
                    Math.floor(sender.location.z)
                );
                
                const options = {};
                
                if (args[1] && !isNaN(parseInt(args[1]))) {
                    options.targetHeight = parseInt(args[1]);
                }
                
                if (args.includes("-notrees")) {
                    options.preserveTrees = false;
                }
                
                if (args.includes("-noliquid")) {
                    options.fillLiquid = false;
                }
                
                if (args.includes("-nosmooth")) {
                    options.smoothEdges = false;
                }
                
                const success = expander.expandTerrain(sender.dimension, center, radius, options);
                
                if (success) {
                    sender.sendMessage(`§aĐang mở rộng địa hình với bán kính ${radius}...`);
                    sender.sendMessage("§7Sử dụng /terrainstatus để xem tiến độ");
                } else {
                    sender.sendMessage("§cKhông thể bắt đầu thao tác!");
                }
            }
        },
        
        flatten: {
            description: "Làm phẳng khu vực",
            usage: "/flatten <radius> [mode] [height]",
            execute: (sender, args) => {
                if (args.length < 1) {
                    sender.sendMessage("§cUsage: /flatten <radius> [mode] [height]");
                    sender.sendMessage("§eModes: average, lowest, highest, custom");
                    sender.sendMessage("§eOptions: -removetrees");
                    return;
                }
                
                const radius = parseInt(args[0]);
                if (isNaN(radius) || radius < 1 || radius > 50) {
                    sender.sendMessage("§cBán kính phải từ 1 đến 50!");
                    return;
                }
                
                const center = new Vector3(
                    Math.floor(sender.location.x),
                    Math.floor(sender.location.y),
                    Math.floor(sender.location.z)
                );
                
                const pos1 = new Vector3(
                    center.x - radius,
                    -64,
                    center.z - radius
                );
                
                const pos2 = new Vector3(
                    center.x + radius,
                    320,
                    center.z + radius
                );
                
                const options = {
                    fillMode: args[1] || "average"
                };
                
                if (options.fillMode === "custom" && args[2]) {
                    options.customHeight = parseInt(args[2]);
                }
                
                if (args.includes("-removetrees")) {
                    options.removeTrees = true;
                }
                
                const success = expander.flattenArea(sender.dimension, pos1, pos2, options);
                
                if (success) {
                    sender.sendMessage(`§aĐang làm phẳng khu vực với bán kính ${radius}...`);
                    sender.sendMessage("§7Sử dụng /terrainstatus để xem tiến độ");
                } else {
                    sender.sendMessage("§cKhông thể bắt đầu thao tác!");
                }
            }
        },
        
        // ================================
        // THÊM CÁC COMMANDS TỪ FILE THỨ HAI
        // ================================
        
        crater: {
            description: "Tạo miệng núi lửa/hố thiên thạch",
            usage: "/crater [radius] [depth]",
            execute: (sender, args) => {
                const radius = args[0] ? parseInt(args[0]) : 15;
                const depth = args[1] ? parseInt(args[1]) : 10;
                
                const x = Math.floor(sender.location.x);
                const y = Math.floor(sender.location.y);
                const z = Math.floor(sender.location.z);
                
                terrainExpander.createCrater(x, y, z, radius, depth);
                sender.sendMessage(`§aĐang tạo crater với bán kính ${radius} và độ sâu ${depth}...`);
            }
        },
        
        valley: {
            description: "Tạo thung lũng",
            usage: "/valley [length] [width] [depth]",
            execute: (sender, args) => {
                const length = args[0] ? parseInt(args[0]) : 50;
                const width = args[1] ? parseInt(args[1]) : 15;
                const depth = args[2] ? parseInt(args[2]) : 8;
                
                const x = Math.floor(sender.location.x);
                const y = Math.floor(sender.location.y);
                const z = Math.floor(sender.location.z);
                
                terrainExpander.createValley(x, y, z, length, width, depth);
                sender.sendMessage(`§aĐang tạo valley dài ${length}, rộng ${width}, sâu ${depth}...`);
            }
        },
        
        canyon: {
            description: "Tạo hẻm núi",
            usage: "/canyon [length] [width] [depth]",
            execute: (sender, args) => {
                const length = args[0] ? parseInt(args[0]) : 100;
                const width = args[1] ? parseInt(args[1]) : 10;
                const depth = args[2] ? parseInt(args[2]) : 20;
                
                const x = Math.floor(sender.location.x);
                const y = Math.floor(sender.location.y);
                const z = Math.floor(sender.location.z);
                
                terrainExpander.createCanyon(x, y, z, length, width, depth);
                sender.sendMessage(`§aĐang tạo canyon dài ${length}, rộng ${width}, sâu ${depth}...`);
            }
        },
        
        bonestrench: {
            description: "Tạo hào xương",
            usage: "/bonestrench [length] [width] [depth]",
            execute: (sender, args) => {
                const length = args[0] ? parseInt(args[0]) : 40;
                const width = args[1] ? parseInt(args[1]) : 8;
                const depth = args[2] ? parseInt(args[2]) : 12;
                
                const x = Math.floor(sender.location.x);
                const y = Math.floor(sender.location.y);
                const z = Math.floor(sender.location.z);
                
                terrainExpander.createBonesTrench(x, y, z, length, width, depth);
                sender.sendMessage(`§aĐang tạo bones trench dài ${length}, rộng ${width}, sâu ${depth}...`);
            }
        },
        
        skullmountain: {
            description: "Tạo núi hình hộp sọ",
            usage: "/skullmountain [size]",
            execute: (sender, args) => {
                const size = args[0] ? parseInt(args[0]) : 25;
                
                const x = Math.floor(sender.location.x);
                const y = Math.floor(sender.location.y);
                const z = Math.floor(sender.location.z);
                
                terrainExpander.createSkullMountain(x, y, z, size);
                sender.sendMessage(`§aĐang tạo skull mountain với kích thước ${size}...`);
            }
        },
        
        specialall: {
            description: "Tạo tất cả địa hình đặc biệt",
            usage: "/specialall [offset]",
            execute: (sender, args) => {
                const offset = args[0] ? parseInt(args[0]) : 50;
                const x = Math.floor(sender.location.x);
                const y = Math.floor(sender.location.y);
                const z = Math.floor(sender.location.z);
                
                // Tạo tất cả các loại địa hình xung quanh
                terrainExpander.createCrater(x, y, z);
                terrainExpander.createValley(x + offset, y, z);
                terrainExpander.createCanyon(x, y, z + offset);
                terrainExpander.createBonesTrench(x - offset, y, z);
                terrainExpander.createSkullMountain(x, y, z - offset);
                
                sender.sendMessage(`§aĐã tạo tất cả địa hình đặc biệt với offset ${offset}!`);
            }
        },
        
        terrainstatus: {
            description: "Xem trạng thái thao tác địa hình",
            execute: (sender) => {
                const status = expander.getStatus();
                
                if (!status.isProcessing) {
                    sender.sendMessage("§aKhông có thao tác địa hình nào đang chạy.");
                } else {
                    sender.sendMessage(`§e=== Trạng thái thao tác ===`);
                    sender.sendMessage(`§fLoại: §a${status.operation}`);
                    sender.sendMessage(`§fTrạng thái: §a${status.status}`);
                    sender.sendMessage(`§fTiến độ: §a${status.progress}%`);
                    
                    if (status.error) {
                        sender.sendMessage(`§cLỗi: ${status.error}`);
                    }
                }
            }
        },
        
        cancelterrain: {
            description: "Hủy thao tác địa hình hiện tại",
            execute: (sender) => {
                const cancelled = expander.cancelCurrentOperation();
                if (cancelled) {
                    sender.sendMessage("§aĐã hủy thao tác địa hình!");
                } else {
                    sender.sendMessage("§cKhông có thao tác nào để hủy!");
                }
            }
        }
    };
    
    return commands;
}

// ================================
// PHẦN 4: KHỞI TẠO HỆ THỐNG
// ================================

initScoreboards();

world.afterEvents.worldInitialize.subscribe(() => {
    config.seedOffset = config.seed * 0.0001;

    // Khởi tạo danh sách terrain types
    globalThis.terrains = [
        new Flat(), new Rolling(), new Hills(), new LowHills(),
        new Highland(), new Foothills(), new Alpine(),
        new Ridge(), new Peak(), new SteepHills(),
        new Cliff(), new Plateau(), new Valley(), new Basin(),
        new Canyon(), new RiverShallow(), new RiverDeep(), new RiverWide(),
        new IslandSmall(), new IslandLarge(), new Archipelago(),
        new Coast(), new CoastRocky(), new CoastCliff(),
        new Snowfield(), new IceField(),
        new VerticalMountain(), new HorizontalMountain(),
        new MountainLake(), new Lake(), new Waterfall(), new Spike()
    ];

    globalThis.mesaTerrains = [
        new MesaPlateau(), new MesaCliff(), new MesaCanyon(),
        new MesaValley(), new MesaPillars(), new MesaRidges(),
        new MesaBasins(), new MesaTerraces(), new MesaOverhang(),
        new MesaSpike()
    ];

    console.log("§a[TerrainGen] Đã khởi động hệ thống Terrain Generator!");
    console.log("§a[TerrainEditor] Đã khởi động hệ thống Terrain Editor!");
    
    // Thông báo cho người chơi khi tham gia
    world.afterEvents.playerJoin.subscribe((event) => {
        event.player.sendMessage("§aTerrain Improvement System đã sẵn sàng!");
        event.player.sendMessage("§eGõ /terrainhelp để xem tất cả commands!");
    });
});

// ================================
// PHẦN 5: HỆ THỐNG CHUYỂN CHIỀU KHÔNG GIAN
// ================================
system.runInterval(() => {
    for (const player of world.getPlayers()) {
        const pos = player.location;
        const dim = player.dimension.id;

        // Lên quá cao → chuyển sang Overworld+
        if (dim === "minecraft:overworld" && pos.y > HEIGHT_LIMIT) {
            player.teleport(
                { x: pos.x, y: 100, z: pos.z },
                { dimension: world.getDimension("feber:overworld_plus") }
            );
            player.sendMessage("§b[Overworld+] Bạn đã vượt giới hạn thế giới!");
        }

        // Xuống quá thấp → quay lại Overworld
        if (dim === "feber:overworld_plus" && pos.y < LOWER_LIMIT) {
            player.teleport(
                { x: pos.x, y: 300, z: pos.z },
                { dimension: world.getDimension("minecraft:overworld") }
            );
            player.sendMessage("§a[Overworld] Bạn đã quay về thế giới gốc!");
        }
    }
}, 20);

// ================================
// PHẦN 6: TỰ ĐỘNG GENERATE CHUNK
// ================================
system.runInterval(() => {
    for (const player of world.getPlayers()) {
        const dim = player.dimension;
        const loc = player.location;
        const chunkX = Math.floor(loc.x / 16);
        const chunkZ = Math.floor(loc.z / 16);

        for (let dx = -1; dx <= 1; dx++) {
            for (let dz = -1; dz <= 1; dz++) {
                const cX = chunkX + dx;
                const cZ = chunkZ + dz;
                const biomeLoc = { x: cX * 16 + 8, y: 64, z: cZ * 16 + 8 };
                const biome = dim.getBiome(biomeLoc);
                const biomeName = biome?.getTag("minecraft:biome_name") || "minecraft:plains";

                generator.generateChunk(dim, cX, cZ, biomeName);
            }
        }
    }
}, 40);

// ================================
// PHẦN 7: HỆ THỐNG COMMANDS TÍCH HỢP
// ================================
world.afterEvents.chatSend.subscribe((event) => {
    const msg = event.message.trim();
    const sender = event.sender;

    // Xử lý commands Terrain Editor
    const terrainCommands = setupTerrainEditorCommands(terrainExpander);
    
    // Mở rộng địa hình
    if (msg.startsWith("/expand ")) {
        event.cancel = true;
        const args = msg.slice(8).trim().split(/\s+/);
        if (terrainCommands.expand && terrainCommands.expand.execute) {
            terrainCommands.expand.execute(sender, args);
        }
        return;
    }
    
    // Làm phẳng địa hình
    if (msg.startsWith("/flatten ")) {
        event.cancel = true;
        const args = msg.slice(9).trim().split(/\s+/);
        if (terrainCommands.flatten && terrainCommands.flatten.execute) {
            terrainCommands.flatten.execute(sender, args);
        }
        return;
    }
    
    // Tạo crater
    if (msg.startsWith("/crater")) {
        event.cancel = true;
        const args = msg.slice(7).trim().split(/\s+/);
        if (terrainCommands.crater && terrainCommands.crater.execute) {
            terrainCommands.crater.execute(sender, args);
        }
        return;
    }
    
    // Tạo valley
    if (msg.startsWith("/valley")) {
        event.cancel = true;
        const args = msg.slice(7).trim().split(/\s+/);
        if (terrainCommands.valley && terrainCommands.valley.execute) {
            terrainCommands.valley.execute(sender, args);
        }
        return;
    }
    
    // Tạo canyon
    if (msg.startsWith("/canyon")) {
        event.cancel = true;
        const args = msg.slice(7).trim().split(/\s+/);
        if (terrainCommands.canyon && terrainCommands.canyon.execute) {
            terrainCommands.canyon.execute(sender, args);
        }
        return;
    }
    
    // Tạo bones trench
    if (msg.startsWith("/bonestrench")) {
        event.cancel = true;
        const args = msg.slice(12).trim().split(/\s+/);
        if (terrainCommands.bonestrench && terrainCommands.bonestrench.execute) {
            terrainCommands.bonestrench.execute(sender, args);
        }
        return;
    }
    
    // Tạo skull mountain
    if (msg.startsWith("/skullmountain")) {
        event.cancel = true;
        const args = msg.slice(14).trim().split(/\s+/);
        if (terrainCommands.skullmountain && terrainCommands.skullmountain.execute) {
            terrainCommands.skullmountain.execute(sender, args);
        }
        return;
    }
    
    // Tạo tất cả địa hình đặc biệt
    if (msg.startsWith("/specialall")) {
        event.cancel = true;
        const args = msg.slice(11).trim().split(/\s+/);
        if (terrainCommands.specialall && terrainCommands.specialall.execute) {
            terrainCommands.specialall.execute(sender, args);
        }
        return;
    }
    
    // Xem trạng thái
    if (msg === "/terrainstatus") {
        event.cancel = true;
        if (terrainCommands.terrainstatus && terrainCommands.terrainstatus.execute) {
            terrainCommands.terrainstatus.execute(sender);
        }
        return;
    }
    
    // Hủy thao tác
    if (msg === "/cancelterrain") {
        event.cancel = true;
        if (terrainCommands.cancelterrain && terrainCommands.cancelterrain.execute) {
            terrainCommands.cancelterrain.execute(sender);
        }
        return;
    }

    // Xử lý commands Terrain Generator
    if (msg.startsWith(".")) {
        event.cancel = true;
        handleCommands(msg.slice(1).split(" "), sender);
        return;
    }

    if (!msg.startsWith("/terrain ")) return;
    event.cancel = true;
    if (!sender.hasTag("op")) return;

    const args = msg.slice(9).trim().split(/\s+/);
    const type = (args[0] || "blend").toLowerCase();
    let cx = Math.floor(sender.location.x);
    let cz = Math.floor(sender.location.z);
    let size = parseInt(args[3]) || config.defaultSize;
    if (!isNaN(parseInt(args[1]))) cx = parseInt(args[1]);
    if (!isNaN(parseInt(args[2]))) cz = parseInt(args[2]);
    if (size > 512 || size < 1) return;

    const dim = sender.dimension;
    const half = Math.floor(size / 2);
    const positions = [];
    const isBlend = type === "blend";
    const isMesaType = type.startsWith("mesa_");

    const activeTerrains = isMesaType ? globalThis.mesaTerrains : globalThis.terrains;

    for (let dx = -half; dx <= half; dx++) {
        for (let dz = -half; dz <= half; dz++) {
            const lx = cx + dx;
            const lz = cz + dz;
            let sample;
            if (isBlend) {
                const idx = getTerrainIndex(lx, lz, activeTerrains, config);
                sample = activeTerrains[idx].sample(lx, lz, config);
            } else {
                const mod = activeTerrains.find(t => t.name.toLowerCase() === type);
                if (!mod) return;
                sample = mod.sample(lx, lz, config);
            }
            positions.push({ x: lx, z: lz, sample });
        }
    }

    const queue = positions;
    const total = size * size;
    processBatch(dim, queue, total, isMesaType);
});

// ================================
// PHẦN 8: CÁC HÀM HỖ TRỢ GENERATE
// ================================
async function genColumn(dim, x, z, sample, isMesa = false) {
    const { height: rawHeight, surface, waterTop } = sample;
    let h = Math.max(config.minY + 1, Math.floor(rawHeight));

    dim.setBlock({ x, y: config.minY, z }, config.bedrockBlock);

    const stoneTop = Math.min(h - 4, config.maxY);
    if (stoneTop > config.minY) {
        if (isMesa) {
            const layerIndex = Math.floor((h + config.seedOffset * 100) % config.terracottaColors.length);
            const terracotta = config.terracottaColors[layerIndex];
            await dim.fillBlocks({ x, y: config.minY + 1, z }, { x, y: stoneTop, z }, terracotta);
        } else {
            await dim.fillBlocks({ x, y: config.minY + 1, z }, { x, y: stoneTop, z }, config.stoneBlock);
        }
    }

    const dirtBottom = Math.max(config.minY, h - 3);
    if (h - 1 >= dirtBottom) {
        await dim.fillBlocks({ x, y: dirtBottom, z }, { x, y: h - 1, z }, config.dirtBlock);
    }

    dim.setBlock({ x, y: h, z }, isMesa ? config.redSandBlock : surface);

    if (h < config.seaLevel) {
        await dim.fillBlocks({ x, y: h + 1, z }, { x, y: config.seaLevel, z }, isMesa ? config.redSandstoneBlock : config.waterBlock);
    }

    if (waterTop !== null && waterTop > h) {
        const waterBottom = h + 1;
        await dim.fillBlocks({ x, y: waterBottom, z }, { x, y: Math.floor(waterTop), z }, config.waterBlock);
    }
}

async function processBatch(dim, queue, total, isMesa) {
    if (queue.length === 0) return;
    const batch = queue.splice(0, config.batchSize);
    await Promise.all(batch.map(p => genColumn(dim, p.x, p.z, p.sample, isMesa)));
    system.runTimeout(() => processBatch(dim, queue, total, isMesa), 1);
}

// ================================
// PHẦN 9: HỆ THỐNG LOAD TERRAIN ENTITY
// ================================
system.runInterval(async () => {
    const dims = ["overworld", "nether", "the_end"];
    for (const id of dims) {
        const dim = world.getDimension(id);
        const ents = dim.getEntities({ tags: ["gen.chunk"] });
        for (const e of ents) {
            if (e.nameTag === "gen.chunk") {
                const {x, z} = e.location;
                const terrain = await loadTerrain(id);
                terrain.generateChunk(e, x, z);
                e.remove();
            }
        }
    }
}, 1);

// ================================
// PHẦN 10: HỆ THỐNG HELP COMMAND
// ================================
world.afterEvents.chatSend.subscribe((event) => {
    const msg = event.message.trim();
    
    if (msg === "/terrainhelp" || msg === "/thelp") {
        event.cancel = true;
        const player = event.sender;
        
        player.sendMessage("§e=== HỆ THỐNG TERRAIN - TRỢ GIÚP ===");
        
        player.sendMessage("§a§l1. TERRAIN GENERATOR (OP):");
        player.sendMessage("§f/terrain blend <cx> <cz> <size> - Tạo địa hình hỗn hợp");
        player.sendMessage("§f/terrain <type> <cx> <cz> <size> - Tạo địa hình cụ thể");
        player.sendMessage("§f.help - Xem tất cả commands generator");
        
        player.sendMessage("§a§l2. TERRAIN EDITOR CƠ BẢN:");
        player.sendMessage("§f/expand <radius> [height] [options] - Mở rộng địa hình");
        player.sendMessage("§f/flatten <radius> [mode] [height] - Làm phẳng khu vực");
        
        player.sendMessage("§a§l3. ĐỊA HÌNH ĐẶC BIỆT:");
        player.sendMessage("§f/crater [radius] [depth] - Tạo miệng núi lửa");
        player.sendMessage("§f/valley [length] [width] [depth] - Tạo thung lũng");
        player.sendMessage("§f/canyon [length] [width] [depth] - Tạo hẻm núi");
        player.sendMessage("§f/bonestrench [length] [width] [depth] - Tạo hào xương");
        player.sendMessage("§f/skullmountain [size] - Tạo núi hình hộp sọ");
        player.sendMessage("§f/specialall [offset] - Tạo tất cả địa hình đặc biệt");
        
        player.sendMessage("§a§l4. QUẢN LÝ:");
        player.sendMessage("§f/terrainstatus - Xem trạng thái thao tác");
        player.sendMessage("§f/cancelterrain - Hủy thao tác hiện tại");
        
        player.sendMessage("§a§l5. CÁC TUỲ CHỌN:");
        player.sendMessage("§f-expand: -notrees, -noliquid, -nosmooth");
        player.sendMessage("§f-flatten: -removetrees");
        player.sendMessage("§fModes: average, lowest, highest, custom");
        
        player.sendMessage("§7§lGhi chú: Sử dụng . để bắt đầu generator commands (OP only)");
        player.sendMessage("§7§lVí dụ: .generate mountain 0 0 50");
    }
});

// ================================
// PHẦN 11: HỆ THỐNG THÔNG BÁO
// ================================
world.afterEvents.playerSpawn.subscribe((event) => {
    const player = event.player;
    if (event.initialSpawn) {
        // Gửi thông báo chào mừng lần đầu vào game
        system.runTimeout(() => {
            player.sendMessage("§e====================================");
            player.sendMessage("§aChào mừng đến với Terrain Improvement System!");
            player.sendMessage("§fHệ thống cải tiến địa hình đã sẵn sàng.");
            player.sendMessage("§fSử dụng §a/terrainhelp §fđể xem tất cả commands.");
            player.sendMessage("§e====================================");
        }, 40); // Chờ 2 giây trước khi hiển thị
    }
});

// Export các module cần thiết
module.exports = {
    TerrainExpander: terrainExpander,
    generator: generator
};