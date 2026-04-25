import { TerrainModule } from "./Module.js";
import { fbm2d } from "./Lib.js";

export default class Coast extends TerrainModule {
  constructor() {
    super("coast", 1.0);
  }

  sample(x, z, config) {
    const n = fbm2d(x * 0.02, z * 0.02, 5, 2.0, 0.5, config.seedOffset);
    let height = config.seaLevel - 5 + 15 * n;
    return {
      height: Math.floor(height),
      surface: config.grassBlock
    };
  }
}