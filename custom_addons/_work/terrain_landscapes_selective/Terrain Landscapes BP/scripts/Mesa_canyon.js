import { TerrainModule } from "./Module.js";
import { fbm2d } from "./Lib.js";

export default class MesaCanyon extends TerrainModule {
  constructor() {
    super("mesa_canyon", 1.2);
  }

  sample(x, z, config) {
    const base = fbm2d(x * 0.008, z * 0.008, 5, 2.0, 0.5, config.seedOffset);
    const carve = fbm2d(x * 0.025, z * 0.025, 4, 2.5, 0.4, config.seedOffset + 2000);
    let height = config.seaLevel + 50 + 70 * base;
    if (carve < 0.35) height -= 80;
    return {
      height: Math.floor(height),
      surface: config.redSandBlock
    };
  }
}