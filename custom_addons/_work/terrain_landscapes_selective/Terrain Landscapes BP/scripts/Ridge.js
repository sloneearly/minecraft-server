import { TerrainModule } from "./Module.js";
import { noise2d } from "./Lib.js";

export default class Ridge extends TerrainModule {
  constructor() {
    super("ridge", 1.5);
  }

  sample(x, z, config) {
    let value = 0;
    let amp = 1.0;
    let freq = 0.006;
    for (let i = 0; i < 6; i++) {
      let n = Math.abs(noise2d(x * freq, z * freq, config.seedOffset + i * 1000));
      n = 1.0 - n;
      n = n * n;
      value += n * amp;
      amp *= 0.5;
      freq *= 2.2;
    }
    const height = config.seaLevel + 50 + 100 * value;
    return {
      height: Math.floor(height),
      surface: config.grassBlock
    };
  }
}