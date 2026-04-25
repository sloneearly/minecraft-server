import { TerrainModule } from "./Module.js";
import { fbm2d } from "./Lib.js";

export default class Snowfield extends TerrainModule {
  constructor() {
    super("snowfield", 0.6);
  }

  sample(x, z, config) {
    const n = fbm2d(x * 0.01, z * 0.01, 6, 2.0, 0.5, config.seedOffset);
    const height = config.seaLevel + 100 + 80 * n;
    return {
      height: Math.floor(height),
      surface: config.snowBlock
    };
  }
}