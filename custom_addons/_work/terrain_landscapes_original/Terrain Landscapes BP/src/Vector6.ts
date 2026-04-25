import { Vector4 } from './Vector4';

export class Vector6 extends Vector4 {
    public u: number;
    public v: number;

    constructor(
        x: number = 0,
        y: number = 0,
        z: number = 0,
        w: number = 0,
        u: number = 0,
        v: number = 0
    ) {
        super(x, y, z, w);
        this.u = u;
        this.v = v;
    }

    static fromArray(arr: number[]): Vector6 {
        return new Vector6(arr[0], arr[1], arr[2], arr[3], arr[4], arr[5]);
    }

    toArray(): number[] {
        return [this.x, this.y, this.z, this.w, this.u, this.v];
    }

    clone(): Vector6 {
        return new Vector6(this.x, this.y, this.z, this.w, this.u, this.v);
    }

    add(other: Vector6): Vector6 {
        return new Vector6(
            this.x + other.x,
            this.y + other.y,
            this.z + other.z,
            this.w + other.w,
            this.u + other.u,
            this.v + other.v
        );
    }

    subtract(other: Vector6): Vector6 {
        return new Vector6(
            this.x - other.x,
            this.y - other.y,
            this.z - other.z,
            this.w - other.w,
            this.u - other.u,
            this.v - other.v
        );
    }

    multiply(scalar: number): Vector6 {
        return new Vector6(
            this.x * scalar,
            this.y * scalar,
            this.z * scalar,
            this.w * scalar,
            this.u * scalar,
            this.v * scalar
        );
    }

    getPosition(): { x: number; y: number; z: number } {
        return { x: this.x, y: this.y, z: this.z };
    }

    getRotation(): { x: number; y: number; z: number } {
        return { x: this.u, y: this.v, z: this.w };
    }

    equals(other: Vector6): boolean {
        return (
            super.equals(other) &&
            this.u === other.u &&
            this.v === other.v
        );
    }

    toString(): string {
        return `(${this.x}, ${this.y}, ${this.z}, ${this.w}, ${this.u}, ${this.v})`;
    }
}