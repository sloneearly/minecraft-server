import { system, BlockPermutation } from "@minecraft/server";
import { decreaseItemStack } from "../ntk_functions.js";

const ItemPottedOnUseOnComponent = {
  onUseOn({ block, blockFace, faceLocation, itemStack,  source, usedOnBlockPermutation }, { params }) {
    for (const child of params) {
      const eventChance = child.event_chance ?? 100.0;
      const itemName = child.item_name;
      const itemSlot = child.item_slot ?? "Mainhand";
      const potType = child.pot_type ?? "minecraft:flower_pot";
      const pottedPlant = child.potted_plant ?? false;
      const decreaseItem = child.decrease_item ?? false;
      const decreaseItemChance = child.decrease_item_chance ?? 100.0;
      const particleEffect = child.particle_effect ?? false;
      const particleOffsetX = child.particle_offset_x ?? 0.0;
      const particleOffsetY = child.particle_offset_y ?? 0.0;
      const particleOffsetZ = child.particle_offset_z ?? 0.0;
      const soundEffect = child.sound_effect ?? false;
      const soundPitchMin = child.sound_pitch_min ?? 1.0;
      const soundPitchMax = child.sound_pitch_max ?? 1.0;
      const soundVolume = child.sound_volume ?? 1.0;
      if (Math.random() * 100 <= eventChance) {
        if (itemStack.typeId === itemName) {
          const soundPitch = Math.random() * (soundPitchMax - soundPitchMin) + soundPitchMin;
          if (block.typeId === potType) {
            if (decreaseItem !== false) {
              if (Math.random() * 100 <= decreaseItemChance) {
                decreaseItemStack(source, itemStack, decreaseItem, itemSlot);
              }
            }
            if (pottedPlant !== false) {
              block.setPermutation(BlockPermutation.resolve(pottedPlant));
            }
            if (particleEffect !== false) {
              block.dimension.spawnParticle(particleEffect, { x: source.location.x + particleOffsetX, y: source.location.y + particleOffsetY, z: source.location.z + particleOffsetZ });
            }
            if (soundEffect !== false) {
              block.dimension.playSound(soundEffect, source.location, { pitch: soundPitch, volume: soundVolume });
            }
            return;
          }
        }
      }
    }
  },
};
system.beforeEvents.startup.subscribe(({ itemComponentRegistry }) => {
  itemComponentRegistry.registerCustomComponent(
    "ntk:potted_on_use_on",
    ItemPottedOnUseOnComponent
  );
});
