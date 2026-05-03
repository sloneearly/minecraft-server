import { world, system, BlockPermutation, ItemStack, GameMode } from "@minecraft/server";

export function damageItemDurability(entity, item, amount, itemSlot, OnHit) {
  if (!item) return;
  if (entity.typeId === "minecraft:player" && entity.getGameMode() === GameMode.Creative) return;
  const entityEquippable = entity.getComponent("minecraft:equippable");
  if (!entityEquippable) return;
  const selectedSlot = entityEquippable.getEquipmentSlot(itemSlot);
  if (!selectedSlot.hasItem()) return;
  const selectedItem = selectedSlot.getItem();
  const itemDurability = selectedItem.getComponent("minecraft:durability");
  if (!itemDurability) return;
  const itemEnchantable = selectedItem.getComponent("minecraft:enchantable");
  const unbreakingLevel = itemEnchantable?.getEnchantment("unbreaking")?.level;
  const damageChance = itemDurability.getDamageChance(unbreakingLevel) / 100;
  if (Math.random() > damageChance) return;
  if (OnHit === true && item.hasTag("ntk:is_need_durability_fixer")) {
    itemDurability.damage -= amount;
  }
  else {
    itemDurability.damage += amount;
  }
  if (itemDurability.damage >= itemDurability.maxDurability) {
    selectedSlot.setItem(undefined);
    entity.playSound("random.break", { pitch: 0.9, location: entity.location, volume: 1.0 });
  }
  else {
    selectedSlot.setItem(selectedItem);
  }
}
export function shootProjectile(projectileName, entity, soundEffect, soundPitch, soundVolume ) {
  let projectileEntity = entity.dimension.spawnEntity(projectileName, { x: entity.location.x + (entity.getViewDirection().x), y: entity.location.y + 1.5 + (entity.getViewDirection().y), z: entity.location.z + (entity.getViewDirection().z)});
  let projectileComponent = projectileEntity.getComponent("minecraft:projectile");
  let velocity = { x: entity.getViewDirection().x, y: entity.getViewDirection().y, z: entity.getViewDirection().z };
  projectileComponent.owner = entity;
  projectileComponent.shoot(velocity);
  entity.dimension.playSound(soundEffect, entity.location, { pitch: soundPitch ?? 1.0, volume: soundVolume ?? 1.0 });
  entity.playAnimation("animation.player.first_person.attack_rotation_item");
}
export function spawnItemStack(source, item, countMin, countMax) {
  const count = Math.floor(Math.random() * (countMax - countMin + 1)) + countMin;
  const newItem = new ItemStack (item, count);
  source.dimension.spawnItem(newItem, { x: source.location.x + 0.5, y: source.location.y + 1.0, z: source.location.z + 0.5 });
}
export function enhancerItem(source, enhancerItem, enhancerSlot, enhanceChance, enhanceValue, damageEnhancerDurability, enhancerDurabilityDamage) {
  const sourceEquippable = source.getComponent("equippable");
  let enhanceBaseValue = 0;
  let enhanceAmount = 0;
  if (sourceEquippable) {
    const enhancerItemSlot = sourceEquippable.getEquipmentSlot(enhancerSlot);
    const enhancerItemStack = enhancerItemSlot.getItem();
    if (enhancerItemStack === undefined || !enhancerItemStack.hasTag(enhancerItem)) {
      enhanceBaseValue = 0;
      enhanceAmount = 0;
      return enhanceAmount;
    }
    else if (enhancerItemStack.hasTag(enhancerItem)) {
      if (Math.random() * 100 <= enhanceChance) {
        enhanceAmount = enhanceBaseValue + enhanceValue;
        if (damageEnhancerDurability === true) {
          damageItemDurability(source, enhancerItemStack, enhancerDurabilityDamage, enhancerSlot, false);
        }
        return enhanceAmount;
      }
      else return enhanceAmount;
    }
  }
  else return enhanceAmount;
}
export function randomTeleport(entity, dimension, range) {
  function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const mobLocation = entity.location;
  let teleportation = false;
  let minRangeX = mobLocation.x - range;
  let maxRangeX = mobLocation.x + range;
  let minRangeY = Math.max(mobLocation.y - range, -62);
  let maxRangeY = Math.min(mobLocation.y + range, 319);
  let minRangeZ = mobLocation.z - range;
  let maxRangeZ = mobLocation.z + range;
  let validBlock = null;
  const attempts = (range * range * range);
  const isSafeAirOrWater = (block) => {
    return block.isAir || ["minecraft:water", "minecraft:flowing_water"].includes(block.typeId);
  };
  const isSolidGround = (block) => {
    return (
      !block.isAir &&
      !["minecraft:water", "minecraft:flowing_water", "minecraft:lava", "minecraft:flowing_lava"].includes(block.typeId)
    );
  };
  const teleportWithEffects = (entity, location) => {
    entity.teleport(location);
    entity.dimension.playSound("mob.endermen.portal", location, { pitch: 1.0, volume: 1.0 });
    entity.dimension.spawnParticle("ntk:teleportation_magic_particle", location);
  };
  for (let i = 0; i < attempts; i++) {
    let randomX = randomRange(minRangeX, maxRangeX);
    let randomY = randomRange(minRangeY, maxRangeY);
    let randomZ = randomRange(minRangeZ, maxRangeZ);
    let block = entity.dimension.getBlock({ x: randomX, y: randomY, z: randomZ });
    let blockBelow = block?.below();
    if (block && blockBelow && isSafeAirOrWater(block) && isSolidGround(blockBelow)) {
      validBlock = block;
      break;
    }
  }
  if (validBlock) {
    teleportWithEffects(entity, validBlock.bottomCenter());
    return;
  }
  let loopCondition = system.runInterval(() => {
    let startBlock = entity.dimension.getBlock({ x: mobLocation.x, y: mobLocation.y, z: mobLocation.z });
    if (startBlock) {
      let queue = [startBlock];
      let visited = new Set();
      visited.add(`${startBlock.x},${startBlock.y},${startBlock.z}`);
      while (queue.length > 0) {
        let currentBlock = queue.shift();
        let belowBlock = currentBlock.below();
        if (
          (currentBlock.isAir || ["minecraft:water", "minecraft:flowing_water"].includes(currentBlock.typeId)) &&
          currentBlock.y > -64 &&
          belowBlock &&
          isSolidGround(belowBlock)
        ) {
          teleportWithEffects(entity, currentBlock.bottomCenter());
          system.clearRun(loopCondition);
          return;
        }
        let neighbors = [currentBlock.above(), currentBlock.below()];
        for (let next of neighbors) {
          if (!next) continue;
          let key = `${next.x},${next.y},${next.z}`;
          if (!visited.has(key) && next.y > -64) {
            visited.add(key);
            queue.push(next);
          }
        }
      }
    }
    system.clearRun(loopCondition);
  }, 1);
}
