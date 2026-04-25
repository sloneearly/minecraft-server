import { TerrainModule } from "./Module.js";
import { noise2d } from "./Lib.js";

export default class CoastCliff extends TerrainModule {
  constructor() {
    super("coast_cliff", 0.7);
  }

  sample(x, z, config) {
    let value = 0;
    let amp = 1.0;
    let freq = 0.015;
    for (let i = 0; i < 5; i++) {
      let n = Math.abs(noise2d(x * freq, z * freq, config.seedOffset + i * 5000));
      n = 1.0 - n;
      value += n * amp;
      amp *= 0.6;
      freq *= 2.4;
    }
    const height = config.seaLevel + 30 + 70 * value;
    return {
      height: Math.floor(height),
      surface: config.stoneBlock
    };
  }
}