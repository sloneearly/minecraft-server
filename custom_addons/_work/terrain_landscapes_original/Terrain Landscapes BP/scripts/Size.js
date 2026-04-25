export class Size {
    constructor(width = 1, height = 1, depth = 1) {
        this.width = width;
        this.height = height;
        this.depth = depth;
    }
    
    static fromArray(arr) {
        return new Size(arr[0], arr[1], arr[2]);
    }
    
    toArray() {
        return [this.width, this.height, this.depth];
    }
    
    clone() {
        return new Size(this.width, this.height, this.depth);
    }
    
    multiply(scalar) {
        return new Size(
            this.width * scalar,
            this.height * scalar,
            this.depth * scalar
        );
    }
    
    divide(scalar) {
        return new Size(
            this.width / scalar,
            this.height / scalar,
            this.depth / scalar
        );
    }
    
    add(other) {
        return new Size(
            this.width + other.width,
            this.height + other.height,
            this.depth + other.depth
        );
    }
    
    subtract(other) {
        return new Size(
            this.width - other.width,
            this.height - other.height,
            this.depth - other.depth
        );
    }
    
    getVolume() {
        return this.width * this.height * this.depth;
    }
    
    getSurfaceArea() {
        return 2 * (
            this.width * this.height +
            this.width * this.depth +
            this.height * this.depth
        );
    }
    
    isEqual(other) {
        return (
            this.width === other.width &&
            this.height === other.height &&
            this.depth === other.depth
        );
    }
    
    toString() {
        return `${this.width}x${this.height}x${this.depth}`;
    }
    
    // Phương thức tiện ích cho terrain generation
    getRandomPointInside() {
        return {
            x: (Math.random() - 0.5) * this.width,
            y: (Math.random() - 0.5) * this.height,
            z: (Math.random() - 0.5) * this.depth
        };
    }
    
    scaleUniform(factor) {
        return this.multiply(factor);
    }
    
    fitToBounds(maxWidth, maxHeight, maxDepth) {
        const scale = Math.min(
            maxWidth / this.width,
            maxHeight / this.height,
            maxDepth / this.depth
        );
        
        return this.multiply(scale);
    }
}