import { TerrainModule } from "./Module.js";
import { fbm2d } from "./Lib.js";

export default class MesaPlateau extends TerrainModule {
  constructor() {
    super("mesa_plateau", 2.0);
  }

  sample(x, z, config) {
    const n = fbm2d(x * 0.006, z * 0.006, 5, 2.0, 0.5, config.seedOffset);
    const height = config.seaLevel + 60 + 80 * n;
    const flattened = Math.round(height / 15) * 15;
    return {
      height: Math.floor(flattened),
      surface: config.redSandBlock
    };
  }
}