import { TerrainModule } from "./Module.js";
import { noise2d } from "./Lib.js";

export default class MesaRidges extends TerrainModule {
  constructor() {
    super("mesa_ridges", 1.4);
  }

  sample(x, z, config) {
    let value = 0;
    let amp = 1.0;
    let freq = 0.007;
    for (let i = 0; i < 6; i++) {
      let n = Math.abs(noise2d(x * freq, z * freq, config.seedOffset + i * 4000));
      n = 1.0 - n;
      value += n * amp;
      amp *= 0.5;
      freq *= 2.2;
    }
    const height = config.seaLevel + 45 + 90 * value;
    return {
      height: Math.floor(height),
      surface: config.redSandBlock
    };
  }
}