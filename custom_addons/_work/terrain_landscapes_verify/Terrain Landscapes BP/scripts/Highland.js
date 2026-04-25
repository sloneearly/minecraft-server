import { TerrainModule } from "./Module.js";
import { fbm2d } from "./Lib.js";

export default class Highland extends TerrainModule {
  constructor() {
    super("highland", 2.0);
  }

  sample(x, z, config) {
    const n = fbm2d(x * 0.008, z * 0.008, 6, 2.1, 0.48, config.seedOffset);
    const height = config.seaLevel + 40 + 60 * n;
    const surface = height > 140 ? config.snowBlock : config.grassBlock;
    return {
      height: Math.floor(height),
      surface
    };
  }
}