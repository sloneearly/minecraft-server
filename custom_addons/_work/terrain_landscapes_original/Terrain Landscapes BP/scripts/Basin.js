import { TerrainModule } from "./Module.js";
import { fbm2d } from "./Lib.js";

export default class Basin extends TerrainModule {
  constructor() {
    super("basin", 1.2);
  }

  sample(x, z, config) {
    const n = fbm2d(x * 0.007, z * 0.007, 4, 2.0, 0.55, config.seedOffset);
    let height = config.seaLevel - 10 + 25 * n;
    return {
      height: Math.floor(height),
      surface: config.grassBlock
    };
  }
}