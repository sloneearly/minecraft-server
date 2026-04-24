# Disabled Addons

These addons were disabled due to confirmed crash or severe lag causes.

---

## More Events Remastered v1.1.1.mcaddon
**Why disabled: CRASH — nighttime blood moon + tornado events**
- Blood moon event fires at night, subscribes to all entityHurt events, and runs particle effects every 2 ticks (10x/second per player)
- Tornado event calls `tickingarea add` with a 128x128 block radius — forces that entire area to stay loaded indefinitely
- Meteor shower spawns entities via `runInterval` continuously
- Multiple `runInterval` callbacks stack up during simultaneous events
- All of this triggers or escalates at nighttime → crash

---

## Herobrine Lurking (1.3.0).mcaddon
**Why disabled: SEVERE LAG — overwrites all vanilla passive mobs with hostile AI**
- Replaces chicken, cow, pig, sheep, bee, and villager entity definitions
- Every replaced mob gets `minecraft:nearest_attackable_target` (AI pathfinding search every tick)
- These are the most common passive mobs in any world — multiplying AI cost by all of them causes massive TPS drop
- Most visible at night when mob counts are high

---

## medieval monsters addon.mcaddon (ORIGINAL)
**Why disabled: replaced by fixed version in custom_addons/mob_overhauls/**
- Original has a critical spawn bug: ALL four monsters (amphisbaena, blemmyae, sea_monk, tarasconus) use `min_size: 100, max_size: 1` with `weight: 200`
- `min_size > max_size` causes undefined behavior — likely attempts to spawn 100 monsters per spawn attempt
- **Use `custom_addons/mob_overhauls/medieval_monsters_MODIFIED.mcaddon` instead** (spawn rules corrected)
