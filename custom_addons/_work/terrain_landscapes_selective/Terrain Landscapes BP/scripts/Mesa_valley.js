import { TerrainModule } from "./Module.js";
import { fbm2d } from "./Lib.js";

export default class MesaValley extends TerrainModule {
  constructor() {
    super("mesa_valley", 1.3);
  }

  sample(x, z, config) {
    const n = fbm2d(x * 0.009, z * 0.009, 5, 2.1, 0.5, config.seedOffset);
    let height = config.seaLevel + 30 + 40 * n;
    height = Math.max(config.seaLevel + 10, height - 50 * (1 - n));
    return {
      height: Math.floor(height),
      surface: config.redSandBlock
    };
  }
}