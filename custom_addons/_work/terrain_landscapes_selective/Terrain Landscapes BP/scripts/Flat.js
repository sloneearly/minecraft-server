import { TerrainModule } from "./Module.js";
import { fbm2d } from "./Lib.js";

export default class Flat extends TerrainModule {
  constructor() {
    super("flat", 3.0);
  }

  sample(x, z, config) {
    const height = config.baseHeight + 2 * fbm2d(x * 0.02, z * 0.02, 3, 2.5, 0.4, config.seedOffset);
    return {
      height: Math.floor(height),
      surface: config.grassBlock
    };
  }
}