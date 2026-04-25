export class Clone {
    constructor(system) {
        this.system = system;
    }
    
    cloneArea(fromX1, fromY1, fromZ1, fromX2, fromY2, fromZ2, toX, toY, toZ) {
        const width = Math.abs(fromX2 - fromX1) + 1;
        const height = Math.abs(fromY2 - fromY1) + 1;
        const depth = Math.abs(fromZ2 - fromZ1) + 1;
        
        const blocks = [];
        
        // Lấy tất cả block từ vùng nguồn
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                for (let z = 0; z < depth; z++) {
                    const sourceX = Math.min(fromX1, fromX2) + x;
                    const sourceY = Math.min(fromY1, fromY2) + y;
                    const sourceZ = Math.min(fromZ1, fromZ2) + z;
                    
                    const blockType = this.getBlock(sourceX, sourceY, sourceZ);
                    blocks.push({
                        x, y, z,
                        type: blockType
                    });
                }
            }
        }
        
        // Đặt block vào vùng đích
        blocks.forEach(block => {
            const targetX = toX + block.x;
            const targetY = toY + block.y;
            const targetZ = toZ + block.z;
            
            this.setBlock(targetX, targetY, targetZ, block.type);
        });
        
        return {
            width,
            height,
            depth,
            blockCount: blocks.length
        };
    }
    
    getBlock(x, y, z) {
        // Sử dụng Support class để lấy block
        const support = new (require('./Support.js').Support)(this.system);
        return support.getBlock(x, y, z);
    }
    
    setBlock(x, y, z, blockType) {
        // Sử dụng Support class để đặt block
        const support = new (require('./Support.js').Support)(this.system);
        support.setBlock(x, y, z, blockType);
    }
    
    mirrorClone(fromX1, fromY1, fromZ1, fromX2, fromY2, fromZ2, toX, toY, toZ, axis = 'x') {
        const result = this.cloneArea(fromX1, fromY1, fromZ1, fromX2, fromY2, fromZ2, toX, toY, toZ);
        
        // Tạo mirror
        const width = result.width;
        const height = result.height;
        const depth = result.depth;
        
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                for (let z = 0; z < depth; z++) {
                    const sourceX = toX + x;
                    const sourceY = toY + y;
                    const sourceZ = toZ + z;
                    
                    let targetX, targetY, targetZ;
                    
                    switch(axis) {
                        case 'x':
                            targetX = toX + (width - 1 - x);
                            targetY = toY + y;
                            targetZ = toZ + z;
                            break;
                        case 'y':
                            targetX = toX + x;
                            targetY = toY + (height - 1 - y);
                            targetZ = toZ + z;
                            break;
                        case 'z':
                            targetX = toX + x;
                            targetY = toY + y;
                            targetZ = toZ + (depth - 1 - z);
                            break;
                    }
                    
                    const blockType = this.getBlock(sourceX, sourceY, sourceZ);
                    this.setBlock(targetX, targetY, targetZ, blockType);
                }
            }
        }
        
        return result;
    }
}