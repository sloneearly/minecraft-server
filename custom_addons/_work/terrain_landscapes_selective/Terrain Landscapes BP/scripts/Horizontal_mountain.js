import { TerrainModule } from "./Module.js";
import { fbm2d } from "./Lib.js";

export default class HorizontalMountain extends TerrainModule {
  constructor() {
    super("horizontal_mountain", 1.2);
  }

  sample(x, z, config) {
    const ridge = fbm2d(x * 0.0015, z * 0.015, 5, 2.5, 0.4, config.seedOffset);
    const base = fbm2d(x * 0.004, z * 0.004, 6, 2.0, 0.5, config.seedOffset);
    const height = config.seaLevel + 20 + 40 * base + 80 * ridge;
    return {
      height: Math.floor(height),
      surface: config.grassBlock
    };
  }
}