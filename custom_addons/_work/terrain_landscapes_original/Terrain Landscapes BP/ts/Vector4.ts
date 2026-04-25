export class Vector4 {
    public x: number;
    public y: number;
    public z: number;
    public w: number;

    constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    static fromArray(arr: number[]): Vector4 {
        return new Vector4(arr[0], arr[1], arr[2], arr[3]);
    }

    toArray(): number[] {
        return [this.x, this.y, this.z, this.w];
    }

    clone(): Vector4 {
        return new Vector4(this.x, this.y, this.z, this.w);
    }

    add(other: Vector4): Vector4 {
        return new Vector4(
            this.x + other.x,
            this.y + other.y,
            this.z + other.z,
            this.w + other.w
        );
    }

    subtract(other: Vector4): Vector4 {
        return new Vector4(
            this.x - other.x,
            this.y - other.y,
            this.z - other.z,
            this.w - other.w
        );
    }

    multiply(scalar: number): Vector4 {
        return new Vector4(
            this.x * scalar,
            this.y * scalar,
            this.z * scalar,
            this.w * scalar
        );
    }

    distanceTo(other: Vector4): number {
        return Math.sqrt(
            Math.pow(this.x - other.x, 2) +
            Math.pow(this.y - other.y, 2) +
            Math.pow(this.z - other.z, 2)
        );
    }

    equals(other: Vector4): boolean {
        return (
            this.x === other.x &&
            this.y === other.y &&
            this.z === other.z &&
            this.w === other.w
        );
    }

    toString(): string {
        return `(${this.x}, ${this.y}, ${this.z}, ${this.w})`;
    }
}