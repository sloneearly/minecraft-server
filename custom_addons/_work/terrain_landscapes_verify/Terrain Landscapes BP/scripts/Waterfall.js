import { TerrainModule } from "./Module.js";
import { fbm2d } from "./Lib.js";

export default class Waterfall extends TerrainModule {
  constructor() {
    super("waterfall", 0.8);
  }

  sample(x, z, config) {
    const base_n = fbm2d(x * 0.007, z * 0.007, 6, 2.0, 0.5, config.seedOffset);
    let height = config.seaLevel + 35 + 75 * base_n;
    const peak_n = fbm2d(x * 0.04, z * 0.04, 5, 2.3, 0.4, config.seedOffset + 5000);
    let waterTop = null;
    if (peak_n > 0.82) {
      waterTop = height + 2;
    }
    return {
      height: Math.floor(height),
      surface: config.grassBlock,
      waterTop
    };
  }
}