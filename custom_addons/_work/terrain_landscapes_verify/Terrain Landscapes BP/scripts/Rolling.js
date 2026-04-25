import { TerrainModule } from "./Module.js";
import { fbm2d } from "./Lib.js";

export default class Rolling extends TerrainModule {
  constructor() {
    super("rolling", 3.5);
  }

  sample(x, z, config) {
    const n = fbm2d(x * 0.015, z * 0.015, 5, 2.0, 0.5, config.seedOffset);
    const height = config.baseHeight + 12 * n;
    return {
      height: Math.floor(height),
      surface: config.grassBlock
    };
  }
}