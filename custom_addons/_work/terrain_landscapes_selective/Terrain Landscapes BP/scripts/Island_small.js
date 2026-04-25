import { TerrainModule } from "./Module.js";
import { fbm2d } from "./Lib.js";

export default class IslandSmall extends TerrainModule {
  constructor() {
    super("island_small", 0.6);
  }

  sample(x, z, config) {
    const dist = Math.sqrt(x * x + z * z) * 0.01;
    const falloff = Math.max(0, 1 - dist * 2);
    const n = fbm2d(x * 0.015, z * 0.015, 5, 2.0, 0.5, config.seedOffset);
    let height = config.seaLevel - 10 + 30 * n * falloff;
    if (height < config.seaLevel) height = config.seaLevel - 5;
    return {
      height: Math.floor(height),
      surface: config.grassBlock
    };
  }
}