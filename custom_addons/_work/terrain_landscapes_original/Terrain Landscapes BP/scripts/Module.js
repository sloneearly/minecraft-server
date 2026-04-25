export class TerrainModule {
  constructor(name, weight = 1.0) {
    this.name = name;
    this.weight = weight;
  }

  sample(x, z, config) {
    return {
      height: config.baseHeight,
      surface: config.grassBlock,
      waterTop: null
    };
  }
}