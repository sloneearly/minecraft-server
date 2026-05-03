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

export function decreaseItemStack(entity, item, decreaseAmount, itemSlot) {
  if (!item) return;
  const entityEquippable = entity.getComponent("minecraft:equippable");
  if (!entityEquippable) return;
  if (entity.typeId === "minecraft:player" && entity.getGameMode() === GameMode.Creative) return;
  if (item.amount <= decreaseAmount) {
    entityEquippable.setEquipment(itemSlot, undefined);
  }
  else {
    const newItem = item.clone();
    newItem.amount -= decreaseAmount;
    entityEquippable.setEquipment(itemSlot, newItem);
  }
}

export function dropsOnFortuneChance(entity, block, item, dropItemType, baseChance, countMin, countMax, levelIChance, levelIIChance, levelIIIChance, dropXP, xpAmount) {
  if (!entity || entity.getGameMode() === GameMode.Creative) return;
  const dropLocation = {
    x: block.location.x + 0.5,
    y: block.location.y + 0.5,
    z: block.location.z + 0.5,
  };
  let baseCount = Math.floor(Math.random() * (countMax - countMin + 1)) + countMin;
  let fortuneChance = 0.0;
  if (item !== undefined) {
    const itemEnchantable = item.getComponent("enchantable");
    if (itemEnchantable) {
      const silkTouch = itemEnchantable.getEnchantment("silk_touch");
      if (silkTouch) return;
      const fortune = itemEnchantable.getEnchantment("fortune");
      if (fortune) {
        switch (fortune.level) {
          case 1: fortuneChance = levelIChance; break;
          case 2: fortuneChance = levelIIChance; break;
          case 3: fortuneChance = levelIIIChance; break;
          default: fortuneChance = 0.0; break;
        }
      }
    }
  }
  const totalChance = baseChance + fortuneChance;
  const decimalChance = totalChance / 100;
  const addedCount = Math.trunc(decimalChance);
  const totalCount = (addedCount + (Math.random() <= decimalChance - addedCount ? 1 : 0)) * 1;
  const finalCount = totalCount >= 1 ? totalCount + (baseCount - 1) : 0;
  if (finalCount > 0) {
    const droppedItem = new ItemStack(dropItemType, finalCount);
    block.dimension.spawnItem(droppedItem, dropLocation);
    if (dropXP === true) {
      for (let i = 0; i < xpAmount; i++) {
        block.dimension.spawnEntity("minecraft:xp_orb", dropLocation);
      }
    }
  }
}

export function removeAttachedFoliage(item, block, foliageItem, amount) {
  const spawnNewItem = new ItemStack (foliageItem, amount);
  let randomChance = Math.random();
  if (item.getComponent("enchantable").hasEnchantment("silk_touch")) {
    block.dimension.spawnItem(spawnNewItem, { x: block.location.x + 0.5, y: block.location.y + 1.0, z: block.location.z + 0.5 });
  }
  else if (item.getComponent("enchantable").hasEnchantment("fortune")) {
    if (item.getComponent("enchantable").getEnchantment("fortune").level == 1) {
      if (randomChance <= 0.5) {
        block.dimension.spawnItem(spawnNewItem, { x: block.location.x + 0.5, y: block.location.y + 1.0, z: block.location.z + 0.5 });
      }
    }
    if (item.getComponent("enchantable").getEnchantment("fortune").level == 2) {
      if (randomChance <= 0.75) {
        block.dimension.spawnItem(spawnNewItem, { x: block.location.x + 0.5, y: block.location.y + 1.0, z: block.location.z + 0.5 });
      }
    }
    if (item.getComponent("enchantable").getEnchantment("fortune").level == 3) {
      if (randomChance <= 1.0) {
        block.dimension.spawnItem(spawnNewItem, { x: block.location.x + 0.5, y: block.location.y + 1.0, z: block.location.z + 0.5 });
      }
    }
  }
  else {
    if (randomChance <= 0.25) {
      block.dimension.spawnItem(spawnNewItem, { x: block.location.x + 0.5, y: block.location.y + 1.0, z: block.location.z + 0.5 });
    }
    else return;
  }
}

export function spawnItemStack(source, item, countMin, countMax) {
  const count = Math.floor(Math.random() * (countMax - countMin + 1)) + countMin;
  const newItem = new ItemStack (item, count);
  source.dimension.spawnItem(newItem, { x: source.location.x + 0.5, y: source.location.y + 1.0, z: source.location.z + 0.5 });
}
