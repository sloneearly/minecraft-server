import { TerrainModule } from "./Module.js";
import { fbm2d } from "./Lib.js";

export default class RiverDeep extends TerrainModule {
  constructor() {
    super("river_deep", 0.9);
  }

  sample(x, z, config) {
    const n = fbm2d(x * 0.012, z * 0.012, 5, 2.1, 0.48, config.seedOffset);
    let height = config.seaLevel + 10 + 20 * n;
    const river = fbm2d(x * 0.006, z * 0.006, 4, 2.0, 0.55, config.seedOffset + 7000);
    if (river < 0.3) height -= 20;
    return {
      height: Math.floor(height),
      surface: config.grassBlock
    };
  }
}