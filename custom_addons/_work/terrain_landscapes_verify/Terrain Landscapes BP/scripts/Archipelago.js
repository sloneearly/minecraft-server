import { TerrainModule } from "./Module.js";
import { fbm2d } from "./Lib.js";

export default class Archipelago extends TerrainModule {
  constructor() {
    super("archipelago", 0.5);
  }

  sample(x, z, config) {
    const n = fbm2d(x * 0.03, z * 0.03, 4, 2.5, 0.4, config.seedOffset);
    const island = Math.max(0, n - 0.6) * 5;
    const height = config.seaLevel - 15 + 40 * island;
    return {
      height: Math.floor(height),
      surface: config.grassBlock
    };
  }
}