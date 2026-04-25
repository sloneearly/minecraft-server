import { TerrainModule } from "./Module.js";
import { fbm2d, noise2d } from "./Lib.js";

export default class Canyon extends TerrainModule {
  constructor() {
    super("canyon", 0.9);
  }

  sample(x, z, config) {
    let value = 0;
    let amp = 1.0;
    let freq = 0.02;
    for (let i = 0; i < 4; i++) {
      let n = Math.abs(noise2d(x * freq, z * freq, config.seedOffset + i * 4000));
      n = 1.0 - n;
      value += n * amp;
      amp *= 0.7;
      freq *= 3.0;
    }
    const base = fbm2d(x * 0.005, z * 0.005, 5, 2.0, 0.5, config.seedOffset);
    let height = config.seaLevel + 40 + 80 * base - 120 * Math.pow(value, 3);
    return {
      height: Math.floor(height),
      surface: config.stoneBlock
    };
  }
}