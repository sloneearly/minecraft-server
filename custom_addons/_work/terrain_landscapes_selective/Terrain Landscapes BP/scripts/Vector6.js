import { Vector4 } from './Vector4.js';

export class Vector6 extends Vector4 {
    constructor(x = 0, y = 0, z = 0, w = 0, u = 0, v = 0) {
        super(x, y, z, w);
        this.u = u;
        this.v = v;
    }
    
    static fromArray(arr) {
        return new Vector6(arr[0], arr[1], arr[2], arr[3], arr[4], arr[5]);
    }
    
    toArray() {
        return [this.x, this.y, this.z, this.w, this.u, this.v];
    }
    
    clone() {
        return new Vector6(this.x, this.y, this.z, this.w, this.u, this.v);
    }
    
    add(other) {
        return new Vector6(
            this.x + other.x,
            this.y + other.y,
            this.z + other.z,
            this.w + other.w,
            this.u + other.u,
            this.v + other.v
        );
    }
    
    subtract(other) {
        return new Vector6(
            this.x - other.x,
            this.y - other.y,
            this.z - other.z,
            this.w - other.w,
            this.u - other.u,
            this.v - other.v
        );
    }
    
    multiply(scalar) {
        return new Vector6(
            this.x * scalar,
            this.y * scalar,
            this.z * scalar,
            this.w * scalar,
            this.u * scalar,
            this.v * scalar
        );
    }
    
    getPosition() {
        return { x: this.x, y: this.y, z: this.z };
    }
    
    getRotation() {
        return { x: this.u, y: this.v, z: this.w };
    }
}