import { TerrainModule } from "./Module.js";
import { fbm2d } from "./Lib.js";

export default class Hills extends TerrainModule {
  constructor() {
    super("hills", 2.8);
  }

  sample(x, z, config) {
    const n = fbm2d(x * 0.018, z * 0.018, 5, 2.0, 0.5, config.seedOffset);
    const height = config.baseHeight + 25 * n;
    return {
      height: Math.floor(height),
      surface: config.grassBlock
    };
  }
}