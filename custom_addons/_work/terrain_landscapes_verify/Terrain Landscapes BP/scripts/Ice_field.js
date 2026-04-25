import { TerrainModule } from "./Module.js";
import { fbm2d } from "./Lib.js";

export default class IceField extends TerrainModule {
  constructor() {
    super("ice_field", 0.4);
  }

  sample(x, z, config) {
    const n = fbm2d(x * 0.009, z * 0.009, 7, 2.0, 0.45, config.seedOffset);
    const height = config.seaLevel + 150 + 100 * n;
    return {
      height: Math.floor(height),
      surface: config.snowBlock
    };
  }
}