import { TerrainModule } from "./Module.js";
import { noise2d } from "./Lib.js";

export default class MesaOverhang extends TerrainModule {
  constructor() {
    super("mesa_overhang", 0.9);
  }

  sample(x, z, config) {
    let value = 0;
    let amp = 1.0;
    let freq = 0.03;
    for (let i = 0; i < 5; i++) {
      let n = Math.abs(noise2d(x * freq, z * freq, config.seedOffset + i * 5000));
      n = 1.0 - n;
      value += n * amp;
      amp *= 0.65;
      freq *= 2.8;
    }
    const base = fbm2d(x * 0.005, z * 0.005, 5, 2.0, 0.5, config.seedOffset);
    const height = config.seaLevel + 60 + 80 * base + 50 * value;
    return {
      height: Math.floor(height),
      surface: config.redSandBlock
    };
  }
}