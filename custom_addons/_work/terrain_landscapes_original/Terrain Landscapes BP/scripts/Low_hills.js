import { TerrainModule } from "./Module.js";
import { fbm2d } from "./Lib.js";

export default class LowHills extends TerrainModule {
  constructor() {
    super("low_hills", 3.2);
  }

  sample(x, z, config) {
    const n = fbm2d(x * 0.025, z * 0.025, 4, 2.0, 0.55, config.seedOffset);
    const height = config.baseHeight + 8 * n;
    return {
      height: Math.floor(height),
      surface: config.grassBlock
    };
  }
}