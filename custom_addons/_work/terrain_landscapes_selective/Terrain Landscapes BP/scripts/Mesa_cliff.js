import { TerrainModule } from "./Module.js";
import { noise2d } from "./Lib.js";

export default class MesaCliff extends TerrainModule {
  constructor() {
    super("mesa_cliff", 1.5);
  }

  sample(x, z, config) {
    let value = 0;
    let amp = 1.0;
    let freq = 0.01;
    for (let i = 0; i < 6; i++) {
      let n = Math.abs(noise2d(x * freq, z * freq, config.seedOffset + i * 1000));
      n = 1.0 - n;
      value += n * amp;
      amp *= 0.55;
      freq *= 2.4;
    }
    const height = config.seaLevel + 40 + 100 * value;
    return {
      height: Math.floor(height),
      surface: config.redSandBlock
    };
  }
}