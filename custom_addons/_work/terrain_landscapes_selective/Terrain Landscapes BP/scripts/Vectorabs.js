// Vectorabs.js - Thư viện toán học và vector cho Minecraft
class Vector3 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    
    add(other) {
        return new Vector3(this.x + other.x, this.y + other.y, this.z + other.z);
    }
    
    subtract(other) {
        return new Vector3(this.x - other.x, this.y - other.y, this.z - other.z);
    }
    
    multiply(scalar) {
        return new Vector3(this.x * scalar, this.y * scalar, this.z * scalar);
    }
    
    distanceTo(other) {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        const dz = this.z - other.z;
        return Math.sqrt(dx*dx + dy*dy + dz*dz);
    }
    
    length() {
        return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
    }
    
    normalize() {
        const len = this.length();
        if (len === 0) return new Vector3(0, 0, 0);
        return new Vector3(this.x/len, this.y/len, this.z/len);
    }
    
    toString() {
        return `(${this.x}, ${this.y}, ${this.z})`;
    }
    
    static fromString(str) {
        const match = str.match(/\((-?\d+), (-?\d+), (-?\d+)\)/);
        if (match) {
            return new Vector3(parseInt(match[1]), parseInt(match[2]), parseInt(match[3]));
        }
        return new Vector3(0, 0, 0);
    }
}

class BoundingBox {
    constructor(min, max) {
        this.min = new Vector3(
            Math.min(min.x, max.x),
            Math.min(min.y, max.y),
            Math.min(min.z, max.z)
        );
        this.max = new Vector3(
            Math.max(min.x, max.x),
            Math.max(min.y, max.y),
            Math.max(min.z, max.z)
        );
    }
    
    getCenter() {
        return new Vector3(
            (this.min.x + this.max.x) / 2,
            (this.min.y + this.max.y) / 2,
            (this.min.z + this.max.z) / 2
        );
    }
    
    getSize() {
        return new Vector3(
            this.max.x - this.min.x + 1,
            this.max.y - this.min.y + 1,
            this.max.z - this.min.z + 1
        );
    }
    
    contains(pos) {
        return pos.x >= this.min.x && pos.x <= this.max.x &&
               pos.y >= this.min.y && pos.y <= this.max.y &&
               pos.z >= this.min.z && pos.z <= this.max.z;
    }
    
    expand(amount) {
        return new BoundingBox(
            new Vector3(this.min.x - amount, this.min.y - amount, this.min.z - amount),
            new Vector3(this.max.x + amount, this.max.y + amount, this.max.z + amount)
        );
    }
    
    toString() {
        return `Min: ${this.min.toString()}, Max: ${this.max.toString()}`;
    }
}

class TerrainUtils {
    static getHeightAt(world, x, z) {
        // Lấy độ cao tại vị trí x,z
        for (let y = 320; y >= -64; y--) {
            const block = world.getBlock(x, y, z);
            if (block && block.type !== "minecraft:air") {
                return y;
            }
        }
        return -64;
    }
    
    static getAverageHeight(world, centerX, centerZ, radius) {
        let totalHeight = 0;
        let count = 0;
        
        for (let x = centerX - radius; x <= centerX + radius; x++) {
            for (let z = centerZ - radius; z <= centerZ + radius; z++) {
                totalHeight += this.getHeightAt(world, x, z);
                count++;
            }
        }
        
        return count > 0 ? Math.floor(totalHeight / count) : -64;
    }
    
    static isInWater(world, x, y, z) {
        const block = world.getBlock(x, y, z);
        return block && (
            block.type === "minecraft:water" || 
            block.type === "minecraft:flowing_water"
        );
    }
    
    static isInLava(world, x, y, z) {
        const block = world.getBlock(x, y, z);
        return block && (
            block.type === "minecraft:lava" || 
            block.type === "minecraft:flowing_lava"
        );
    }
}

module.exports = {
    Vector3,
    BoundingBox,
    TerrainUtils
};