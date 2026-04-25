function vec2(x, y) {
  return { x, y };
}

function dot(a, b) {
  return a.x * b.x + a.y * b.y;
}

function fract(n) {
  return n - Math.floor(n);
}

function fade(t) {
  return t * t * (3 - 2 * t);
}

function mix(a, b, t) {
  return a + t * (b - a);
}

export function random2d(st, seedOffset = 0) {
  const angle = dot(st, vec2(12.9898, 78.233)) + seedOffset;
  return fract(Math.sin(angle) * 43758.5453123);
}

export function noise2d(x, z, seedOffset = 0) {
  const st = vec2(x, z);
  const i = vec2(Math.floor(st.x), Math.floor(st.y));
  const f = vec2(fract(st.x), fract(st.y));
  const u = vec2(fade(f.x), fade(f.y));

  const a = random2d(i, seedOffset);
  const b = random2d(vec2(i.x + 1, i.y), seedOffset);
  const c = random2d(vec2(i.x, i.y + 1), seedOffset);
  const d = random2d(vec2(i.x + 1, i.y + 1), seedOffset);

  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

export function fbm2d(x, z, octaves = 6, lacunarity = 2.0, gain = 0.5, seedOffset = 0) {
  let value = 0.0;
  let amplitude = 0.5;
  let frequency = 1.0;
  for (let i = 0; i < octaves; i++) {
    value += amplitude * noise2d(x * frequency, z * frequency, seedOffset);
    frequency *= lacunarity;
    amplitude *= gain;
  }
  return value;
}

export function getTerrainIndex(x, z, terrains, config) {
  let totalWeight = 0;
  for (let t of terrains) totalWeight += t.weight;
  let pickVal = fbm2d(x * config.biomeScale, z * config.biomeScale, 4, 2.0, 0.5, config.seedOffset);
  let pick = pickVal * totalWeight;
  let cumulative = 0;
  for (let i = 0; i < terrains.length; i++) {
    cumulative += terrains[i].weight;
    if (pick <= cumulative) return i;
  }
  return 0;
}