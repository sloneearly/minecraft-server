import { noise } from "./noise.js";

export const randRange = (min, max) => Math.random() * (max - min) + min;

export const multiNoise = (x, z, scales) => scales.reduce((sum, s) => sum + noise(x / s, z / s), 0) / scales.length;