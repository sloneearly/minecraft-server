import { TerrainModule } from "./Module.js";
import { fbm2d } from "./Lib.js";

export default class IslandLarge extends TerrainModule {
  constructor() {
    super("island_large", 0.7);
  }

  sample(x, z, config) {
    const dist = Math.sqrt(x * x + z * z) * 0.005;
    const falloff = Math.max(0, 1 - dist);
    const n = fbm2d(x * 0.01, z * 0.01, 6, 2.0, 0.5, config.seedOffset);
    let height = config.seaLevel + 20 * n * falloff;
    return {
      height: Math.floor(height),
      surface: config.grassBlock
    };
  }
}