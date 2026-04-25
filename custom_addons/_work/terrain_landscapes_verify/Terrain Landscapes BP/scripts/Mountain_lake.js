import { TerrainModule } from "./Module.js";
import { fbm2d } from "./Lib.js";

export default class MountainLake extends TerrainModule {
  constructor() {
    super("mountain_lake", 1.0);
  }

  sample(x, z, config) {
    const mountain_n = fbm2d(x * 0.0055, z * 0.0055, 7, 2.1, 0.47, config.seedOffset);
    let height = config.seaLevel + 28 + 82 * mountain_n;
    const lake_n = fbm2d(x * 0.025, z * 0.025, 4, 2.0, 0.55, config.seedOffset + 3000);
    let waterTop = null;
    if (lake_n > 0.7 && height > 118) {
      height = 118;
      waterTop = 122;
    }
    return {
      height: Math.floor(height),
      surface: config.stoneBlock,
      waterTop
    };
  }
}