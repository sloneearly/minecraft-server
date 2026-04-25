export class Size {
    public width: number;
    public height: number;
    public depth: number;

    constructor(width: number = 1, height: number = 1, depth: number = 1) {
        this.width = width;
        this.height = height;
        this.depth = depth;
    }

    static fromArray(arr: number[]): Size {
        return new Size(arr[0], arr[1], arr[2]);
    }

    toArray(): number[] {
        return [this.width, this.height, this.depth];
    }

    clone(): Size {
        return new Size(this.width, this.height, this.depth);
    }

    multiply(scalar: number): Size {
        return new Size(
            this.width * scalar,
            this.height * scalar,
            this.depth * scalar
        );
    }

    divide(scalar: number): Size {
        return new Size(
            this.width / scalar,
            this.height / scalar,
            this.depth / scalar
        );
    }

    add(other: Size): Size {
        return new Size(
            this.width + other.width,
            this.height + other.height,
            this.depth + other.depth
        );
    }

    subtract(other: Size): Size {
        return new Size(
            this.width - other.width,
            this.height - other.height,
            this.depth - other.depth
        );
    }

    getVolume(): number {
        return this.width * this.height * this.depth;
    }

    getSurfaceArea(): number {
        return 2 * (
            this.width * this.height +
            this.width * this.depth +
            this.height * this.depth
        );
    }

    isEqual(other: Size): boolean {
        return (
            this.width === other.width &&
            this.height === other.height &&
            this.depth === other.depth
        );
    }

    toString(): string {
        return `${this.width}x${this.height}x${this.depth}`;
    }

    getRandomPointInside(): { x: number; y: number; z: number } {
        return {
            x: (Math.random() - 0.5) * this.width,
            y: (Math.random() - 0.5) * this.height,
            z: (Math.random() - 0.5) * this.depth
        };
    }

    scaleUniform(factor: number): Size {
        return this.multiply(factor);
    }

    fitToBounds(maxWidth: number, maxHeight: number, maxDepth: number): Size {
        const scale = Math.min(
            maxWidth / this.width,
            maxHeight / this.height,
            maxDepth / this.depth
        );
        
        return this.multiply(scale);
    }
}