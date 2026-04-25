import { TerrainModule } from "./Module.js";
import { fbm2d } from "./Lib.js";

export default class Valley extends TerrainModule {
  constructor() {
    super("valley", 1.4);
  }

  sample(x, z, config) {
    const n = fbm2d(x * 0.009, z * 0.009, 5, 2.1, 0.5, config.seedOffset);
    let height = config.seaLevel + 10 + 30 * n;
    height = config.seaLevel + Math.pow(height - config.seaLevel, 0.6);
    return {
      height: Math.floor(height),
      surface: config.grassBlock
    };
  }
}