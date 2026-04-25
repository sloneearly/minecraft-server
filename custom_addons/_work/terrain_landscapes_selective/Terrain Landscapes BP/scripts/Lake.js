import { TerrainModule } from "./Module.js";
import { fbm2d } from "./Lib.js";

export default class Lake extends TerrainModule {
  constructor() {
    super("lake", 1.8);
  }

  sample(x, z, config) {
    const n = fbm2d(x * 0.01, z * 0.01, 5, 2.2, 0.45, config.seedOffset);
    let height = config.seaLevel + 8 + 15 * n;
    const valley = fbm2d(x * 0.004, z * 0.004, 3, 2.0, 0.6, config.seedOffset + 2000);
    if (valley < 0.3) {
      height = Math.max(config.seaLevel - 5, config.seaLevel - 2 - 10 * (0.3 - valley));
    }
    return {
      height: Math.floor(height),
      surface: config.grassBlock
    };
  }
}