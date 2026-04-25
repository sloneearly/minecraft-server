import { TerrainModule } from "./Module.js";
import { noise2d } from "./Lib.js";

export default class Cliff extends TerrainModule {
  constructor() {
    super("cliff", 1.0);
  }

  sample(x, z, config) {
    let value = 0;
    let amp = 1.0;
    let freq = 0.012;
    for (let i = 0; i < 5; i++) {
      let n = Math.abs(noise2d(x * freq, z * freq, config.seedOffset + i * 3000));
      n = 1.0 - n;
      value += n * amp;
      amp *= 0.6;
      freq *= 2.5;
    }
    const height = config.seaLevel + 60 + 110 * Math.pow(value, 2.5);
    return {
      height: Math.floor(height),
      surface: config.stoneBlock
    };
  }
}