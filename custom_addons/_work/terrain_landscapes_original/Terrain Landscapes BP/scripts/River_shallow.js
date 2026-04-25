import { TerrainModule } from "./Module.js";
import { fbm2d } from "./Lib.js";

export default class RiverShallow extends TerrainModule {
  constructor() {
    super("river_shallow", 1.1);
  }

  sample(x, z, config) {
    const n = fbm2d(x * 0.01, z * 0.01, 5, 2.2, 0.45, config.seedOffset);
    let height = config.seaLevel + 5 + 15 * n;
    const river = fbm2d(x * 0.005, z * 0.005, 3, 2.0, 0.6, config.seedOffset + 6000);
    if (river < 0.25) height -= 8;
    return {
      height: Math.floor(height),
      surface: config.grassBlock
    };
  }
}