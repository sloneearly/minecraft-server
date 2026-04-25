import { TerrainModule } from "./Module.js";
import { fbm2d } from "./Lib.js";

export default class CoastRocky extends TerrainModule {
  constructor() {
    super("coast_rocky", 0.8);
  }

  sample(x, z, config) {
    const n = fbm2d(x * 0.025, z * 0.025, 5, 2.1, 0.48, config.seedOffset);
    let height = config.seaLevel - 8 + 25 * n;
    const surface = height > config.seaLevel ? config.stoneBlock : config.grassBlock;
    return {
      height: Math.floor(height),
      surface
    };
  }
}