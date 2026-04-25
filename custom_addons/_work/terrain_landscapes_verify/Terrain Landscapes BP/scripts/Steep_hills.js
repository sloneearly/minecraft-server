import { TerrainModule } from "./Module.js";
import { fbm2d } from "./Lib.js";

export default class SteepHills extends TerrainModule {
  constructor() {
    super("steep_hills", 1.6);
  }

  sample(x, z, config) {
    const n = fbm2d(x * 0.02, z * 0.02, 6, 2.1, 0.45, config.seedOffset);
    const height = config.baseHeight + 35 * Math.pow(n, 1.5);
    return {
      height: Math.floor(height),
      surface: config.grassBlock
    };
  }
}