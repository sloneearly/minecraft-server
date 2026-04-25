import { TerrainModule } from "./Module.js";
import { fbm2d } from "./Lib.js";

export default class Foothills extends TerrainModule {
  constructor() {
    super("foothills", 1.8);
  }

  sample(x, z, config) {
    const base = fbm2d(x * 0.01, z * 0.01, 5, 2.0, 0.5, config.seedOffset);
    const detail = fbm2d(x * 0.03, z * 0.03, 4, 2.2, 0.45, config.seedOffset + 1000);
    const height = config.seaLevel + 25 + 50 * base + 20 * detail;
    return {
      height: Math.floor(height),
      surface: config.grassBlock
    };
  }
}