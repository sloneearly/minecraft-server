import { TerrainModule } from "./Module.js";
import { fbm2d } from "./Lib.js";

export default class Spike extends TerrainModule {
  constructor() {
    super("spike", 0.5);
  }

  sample(x, z, config) {
    const base_n = fbm2d(x * 0.012, z * 0.012, 5, 2.1, 0.48, config.seedOffset);
    const spike_n = fbm2d(x * 0.12, z * 0.12, 6, 2.5, 0.35, config.seedOffset + 10000);
    let height = config.seaLevel + 15 + 20 * base_n;
    height += 140 * Math.pow(spike_n, 5);
    return {
      height: Math.floor(height),
      surface: config.grassBlock
    };
  }
}