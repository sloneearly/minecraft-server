import { TerrainModule } from "./Module.js";
import { fbm2d } from "./Lib.js";

export default class Alpine extends TerrainModule {
  constructor() {
    super("alpine", 1.5);
  }

  sample(x, z, config) {
    const n = fbm2d(x * 0.005, z * 0.005, 8, 2.0, 0.5, config.seedOffset);
    const height = config.seaLevel + 30 + 90 * n;
    const surface = height > 180 ? config.snowBlock : config.grassBlock;
    return {
      height: Math.floor(height),
      surface
    };
  }
}