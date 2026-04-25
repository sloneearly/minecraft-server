import { TerrainModule } from "./Module.js";
import { noise2d } from "./Lib.js";

export default class MesaSpike extends TerrainModule {
  constructor() {
    super("mesa_spike", 0.8);
  }

  sample(x, z, config) {
    const base_n = fbm2d(x * 0.015, z * 0.015, 5, 2.1, 0.48, config.seedOffset);
    const spike_n = Math.abs(noise2d(x * 0.1, z * 0.1, config.seedOffset + 6000));
    let height = config.seaLevel + 30 + 40 * base_n;
    height += 150 * (spike_n ** 5);
    return {
      height: Math.floor(height),
      surface: config.redSandBlock
    };
  }
}