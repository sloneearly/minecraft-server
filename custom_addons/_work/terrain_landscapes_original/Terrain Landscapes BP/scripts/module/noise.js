export class Noise {
    constructor(seed) { this.seed = seed; }

    simpleNoise(x, y = 0, z = 0) {
        const n = Math.sin(x * 12.9898 + y * 78.233 + z * 37.719) * 43758.5453;
        return (Math.sin(n) + 1) / 2; // 0 → 1
    }

    getHeight(x, z) {
        let h = 0, amp = 1, freq = 0.008;
        for (let i = 0; i < 4; i++) {
            h += this.simpleNoise(x * freq, 0, z * freq) * amp;
            amp *= 0.5; freq *= 2;
        }
        return Math.floor(h * 50 + 64); 
    }

    wavy(x, z, amplitude = 8) {
        return Math.sin(x * 0.02) * Math.cos(z * 0.02) * amplitude;
    }

    getCaveNoise(x, y, z) {
        let cave = 0, amp = 1, freq = 0.05;
        for (let i = 0; i < 3; i++) {
            cave += this.simpleNoise(x * freq, y * freq, z * freq) * amp;
            amp *= 0.6; freq *= 2.5;
        }
        return (cave + 1) / 2; 
    }

    getHillNoise(x, z) {
        return this.simpleNoise(x * 0.03, 0, z * 0.03) * 15; 
    }
}