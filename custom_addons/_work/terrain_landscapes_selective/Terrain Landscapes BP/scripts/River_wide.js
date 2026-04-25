import { TerrainModule } from "./Module.js";
import { fbm2d } from "./Lib.js";

export default class RiverWide extends TerrainModule {
  constructor() {
    super("river_wide", 1.0);
  }

  sample(x, z, config) {
    const n = fbm2d(x * 0.008, z * 0.008, 6, 2.0, 0.5, config.seedOffset);
    let height = config.seaLevel + 8 + 18 * n;
    const river = fbm2d(x * 0.003, z * 0.003, 3, 2.5, 0.4, config.seedOffset + 8000);
    if (river < 0.35) height = Math.max(config.seaLevel - 5, height - 15);
    return {
      height: Math.floor(height),
      surface: config.grassBlock
    };
  }
}