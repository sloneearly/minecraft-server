import { TerrainModule } from "./Module.js";
import { fbm2d } from "./Lib.js";

export default class Plateau extends TerrainModule {
  constructor() {
    super("plateau", 1.3);
  }

  sample(x, z, config) {
    const n = fbm2d(x * 0.006, z * 0.006, 6, 2.0, 0.5, config.seedOffset);
    let height = config.seaLevel + 50 + 80 * n;
    height = Math.round(height / 20) * 20;
    const surface = height > 160 ? config.snowBlock : config.grassBlock;
    return {
      height: Math.floor(height),
      surface
    };
  }
}