import { TerrainModule } from "./Module.js";
import { noise2d } from "./Lib.js";

export default class MesaPillars extends TerrainModule {
  constructor() {
    super("mesa_pillars", 1.0);
  }

  sample(x, z, config) {
    let value = 0;
    let amp = 1.0;
    let freq = 0.04;
    for (let i = 0; i < 5; i++) {
      let n = Math.abs(noise2d(x * freq, z * freq, config.seedOffset + i * 3000));
      n = 1.0 - n;
      n = n ** 4;
      value += n * amp;
      amp *= 0.6;
      freq *= 3.0;
    }
    const base = fbm2d(x * 0.01, z * 0.01, 4, 2.0, 0.5, config.seedOffset);
    const height = config.seaLevel + 20 + 50 * base + 120 * value;
    return {
      height: Math.floor(height),
      surface: config.redSandBlock
    };
  }
}