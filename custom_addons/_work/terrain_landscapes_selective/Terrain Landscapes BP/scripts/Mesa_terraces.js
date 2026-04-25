import { TerrainModule } from "./Module.js";
import { fbm2d } from "./Lib.js";

export default class MesaTerraces extends TerrainModule {
  constructor() {
    super("mesa_terraces", 1.3);
  }

  sample(x, z, config) {
    const n = fbm2d(x * 0.008, z * 0.008, 6, 2.0, 0.5, config.seedOffset);
    let height = config.seaLevel + 50 + 70 * n;
    height = Math.round(height / 10) * 10;
    return {
      height: Math.floor(height),
      surface: config.redSandBlock
    };
  }
}