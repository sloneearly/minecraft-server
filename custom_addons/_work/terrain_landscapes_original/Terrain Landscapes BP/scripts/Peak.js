import { TerrainModule } from "./Module.js";
import { noise2d } from "./Lib.js";

export default class Peak extends TerrainModule {
  constructor() {
    super("peak", 1.2);
  }

  sample(x, z, config) {
    let value = 0;
    let amp = 1.0;
    let freq = 0.005;
    for (let i = 0; i < 7; i++) {
      let n = Math.abs(noise2d(x * freq, z * freq, config.seedOffset + i * 2000));
      n = 1.0 - n;
      n = n * n * n;
      value += n * amp;
      amp *= 0.45;
      freq *= 2.3;
    }
    const height = config.seaLevel + 80 + 140 * Math.pow(value, 1.8);
    const surface = height > 200 ? config.snowBlock : config.stoneBlock;
    return {
      height: Math.floor(height),
      surface
    };
  }
}