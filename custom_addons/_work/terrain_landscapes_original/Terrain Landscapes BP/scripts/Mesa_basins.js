import { TerrainModule } from "./Module.js";
import { fbm2d } from "./Lib.js";

export default class MesaBasins extends TerrainModule {
  constructor() {
    super("mesa_basins", 1.1);
  }

  sample(x, z, config) {
    const n = fbm2d(x * 0.012, z * 0.012, 5, 2.0, 0.55, config.seedOffset);
    let height = config.seaLevel + 25 + 35 * n;
    height -= 60 * (1 - n);
    return {
      height: Math.floor(height),
      surface: config.redSandBlock
    };
  }
}