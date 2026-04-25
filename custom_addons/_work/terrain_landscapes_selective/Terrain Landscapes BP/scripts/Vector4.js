export class Vector4 {
    constructor(x = 0, y = 0, z = 0, w = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    
    static fromArray(arr) {
        return new Vector4(arr[0], arr[1], arr[2], arr[3]);
    }
    
    toArray() {
        return [this.x, this.y, this.z, this.w];
    }
    
    clone() {
        return new Vector4(this.x, this.y, this.z, this.w);
    }
    
    add(other) {
        return new Vector4(
            this.x + other.x,
            this.y + other.y,
            this.z + other.z,
            this.w + other.w
        );
    }
    
    subtract(other) {
        return new Vector4(
            this.x - other.x,
            this.y - other.y,
            this.z - other.z,
            this.w - other.w
        );
    }
    
    multiply(scalar) {
        return new Vector4(
            this.x * scalar,
            this.y * scalar,
            this.z * scalar,
            this.w * scalar
        );
    }
    
    distanceTo(other) {
        return Math.sqrt(
            Math.pow(this.x - other.x, 2) +
            Math.pow(this.y - other.y, 2) +
            Math.pow(this.z - other.z, 2)
        );
    }
}