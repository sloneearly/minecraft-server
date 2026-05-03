// scripts/shepherdsCrook.ts
import {
  world,
  EntityComponentTypes
} from "@minecraft/server";

// scripts/utils.ts
import { EquipmentSlot } from "@minecraft/server";
var Utils = class _Utils {
  static diceRoll(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  static damageItem(player) {
    const equipment = player.getComponent("minecraft:equippable");
    if (equipment) {
      const mainhand = equipment.getEquipment(EquipmentSlot.Mainhand);
      if (mainhand) {
        const durability = mainhand.getComponent("minecraft:durability");
        if (durability) {
          durability.damage += _Utils.diceRoll(0, 1);
          if (durability.damage >= durability.maxDurability) {
            player.playSound("random.break");
            equipment.setEquipment(EquipmentSlot.Mainhand, void 0);
          } else {
            equipment.setEquipment(EquipmentSlot.Mainhand, mainhand);
          }
        }
      }
    }
  }
  static getEntityPlayerIsLookingAt(player, maxRange = 5, coneAngle = 15) {
    const eyeLocation = player.getHeadLocation();
    const viewVector = player.getViewDirection();
    const entities = player.dimension.getEntities({
      location: eyeLocation,
      maxDistance: maxRange,
      excludeTypes: ["minecraft:player"]
    });
    const coneThreshold = Math.cos(coneAngle * Math.PI / 180);
    let closestEntity = null;
    let closestDistance = maxRange;
    for (const entity of entities) {
      const collisionBox = entity.getComponent("minecraft:collision_box");
      const entityHeight = collisionBox?.height ?? 1.8;
      const samplePoints = [0.1, 0.5, 0.9].map((t) => ({
        x: entity.location.x,
        y: entity.location.y + entityHeight * t,
        z: entity.location.z
      }));
      let bestAlignment = -Infinity;
      let bestDist = Infinity;
      for (const point of samplePoints) {
        const toPoint = {
          x: point.x - eyeLocation.x,
          y: point.y - eyeLocation.y,
          z: point.z - eyeLocation.z
        };
        const dist = Math.sqrt(toPoint.x ** 2 + toPoint.y ** 2 + toPoint.z ** 2);
        const dot = toPoint.x * viewVector.x + toPoint.y * viewVector.y + toPoint.z * viewVector.z;
        const alignment = dot / (dist || 1);
        if (alignment > bestAlignment) {
          bestAlignment = alignment;
          bestDist = dist;
        }
      }
      if (bestAlignment >= coneThreshold && bestDist < closestDistance) {
        closestEntity = entity;
        closestDistance = bestDist;
      }
    }
    return closestEntity;
  }
};

// scripts/shepherdsCrook.ts
var ShepherdsCrookUse = class {
  constructor() {
    this.allowedTypes = [
      "minecraft:sheep",
      "minecraft:pig",
      "minecraft:cow",
      "minecraft:chicken",
      "minecraft:goat",
      "minecraft:mooshroom"
    ];
    this.onUse = this.onUse.bind(this);
  }
  onUse(e) {
    if (e) {
      const source = e.source;
      if (e.itemStack?.typeId == "vf_sc:shepherds_crook") {
        let mob = Utils.getEntityPlayerIsLookingAt(e.source);
        if (mob) {
          if (this.allowedTypes.includes(mob.typeId)) {
            mob.teleport({ x: source.location.x, y: source.location.y, z: source.location.z });
          }
        }
        source.playAnimation("animation.player.first_person.use_crook");
        source.playSound("item.shepherds_crook.swing");
      }
    }
  }
};
function initShepherdsCrookAttack() {
  world.afterEvents.entityHitEntity.subscribe((e) => {
    let playId = e.damagingEntity.id;
    if (e.damagingEntity.typeId == "minecraft:player") {
      for (const player of world.getPlayers()) {
        if (player.id == playId) {
          const inventory = player.getComponent("inventory");
          if (inventory) {
            const selectedItem = inventory.container?.getItem(player.selectedSlotIndex);
            if (selectedItem?.typeId == "vf_sc:shepherds_crook") {
              const target = e.hitEntity;
              const health = target.getComponent(EntityComponentTypes.Health);
              health?.setCurrentValue(health.currentValue + 2);
              const playerLoc = player.location;
              const targetLoc = target.location;
              const dx = targetLoc.x - playerLoc.x;
              const dz = targetLoc.z - playerLoc.z;
              const dirX = dx === 0 ? 0 : dx > 0 ? 1 : -1;
              const dirZ = dz === 0 ? 0 : dz > 0 ? 1 : -1;
              const distance = 3;
              target.clearVelocity();
              target.teleport({
                x: targetLoc.x + dirX * distance,
                y: targetLoc.y,
                z: targetLoc.z + dirZ * distance
              });
            }
          }
        }
      }
    }
  });
}
function initUse() {
  world.beforeEvents.worldInitialize.subscribe((initEvent) => {
    initEvent.itemComponentRegistry.registerCustomComponent("vf_sc:use", new ShepherdsCrookUse());
  });
  initShepherdsCrookAttack();
}

// scripts/sickle.ts
import { world as world2, system, ItemStack, EquipmentSlot as EquipmentSlot2 } from "@minecraft/server";
var processedBlocks = /* @__PURE__ */ new Map();
var COOLDOWN_TICKS = 2;
function initSickle() {
  world2.beforeEvents.playerBreakBlock.subscribe((e) => {
    if (e.block.typeId === "minecraft:wheat") {
      const equipment = e.player.getComponent("minecraft:equippable");
      if (!equipment) {
        return;
      }
      const mainhand = equipment.getEquipment(EquipmentSlot2.Mainhand);
      if (mainhand && mainhand.typeId == "vf_sc:sickle") {
        const blockKey = `${e.block.location.x},${e.block.location.y},${e.block.location.z}`;
        const currentTick = system.currentTick;
        const lastProcessed = processedBlocks.get(blockKey);
        if (lastProcessed && currentTick - lastProcessed < COOLDOWN_TICKS) {
          e.cancel = true;
          return;
        }
        const growthState = e.block.permutation.getState("growth");
        if (growthState === 7) {
          processedBlocks.set(blockKey, currentTick);
          e.cancel = true;
          system.run(() => {
            e.player.playSound("dig.grass");
            e.player.spawnParticle("minecraft:crop_growth_emitter", e.block.location);
            e.dimension.spawnItem(new ItemStack("minecraft:wheat"), {
              x: e.block.location.x + 0.5,
              y: e.block.location.y + 0.5,
              z: e.block.location.z + 0.5
            });
            const enchantable = mainhand.getComponent("minecraft:enchantable");
            if (enchantable) {
              if (enchantable.hasEnchantment("fortune")) {
                const fortuneLevel = enchantable.getEnchantment("fortune")?.level ?? 0;
                if (fortuneLevel > 0) {
                  for (let i = 0; i < fortuneLevel; i++) {
                    if (Utils.diceRoll(1, 100) <= 33) {
                      e.dimension.spawnItem(new ItemStack("minecraft:wheat"), {
                        x: e.block.location.x + 0.5,
                        y: e.block.location.y + 0.5,
                        z: e.block.location.z + 0.5
                      });
                    }
                  }
                }
              }
              if (enchantable.hasEnchantment("unbreaking")) {
                const unbreakingLevel = enchantable.getEnchantment("unbreaking")?.level ?? 0;
                const damageChance = 100 / (unbreakingLevel + 1);
                if (Utils.diceRoll(1, 100) <= damageChance) {
                  Utils.damageItem(e.player);
                }
              } else {
                Utils.damageItem(e.player);
              }
            }
            e.block.setPermutation(e.block.permutation.withState("growth", 2));
            system.runTimeout(() => {
              processedBlocks.delete(blockKey);
            }, 20);
          });
        } else {
          e.cancel = true;
        }
      }
    }
  });
}

// scripts/farmersHat.ts
import { world as world3, system as system2, EquipmentSlot as EquipmentSlot3 } from "@minecraft/server";
function initFarmersHat() {
  system2.runInterval(() => {
    for (const player of world3.getAllPlayers()) {
      const helmet = player.getComponent("equippable")?.getEquipment(EquipmentSlot3.Head);
      if (helmet?.typeId === "vf_sc:farmers_hat") {
        player.addEffect("speed", 30, { showParticles: false });
        player.addEffect("haste", 30, { showParticles: false });
      }
    }
  }, 20);
}

// scripts/wateringCan.ts
import {
  world as world4,
  ItemStack as ItemStack2,
  EquipmentSlot as EquipmentSlot4
} from "@minecraft/server";
var wateringCanUse = class {
  constructor() {
    // Crops that can be watered
    this.waterableCrops = [
      "minecraft:wheat",
      "minecraft:carrots",
      "minecraft:potatoes",
      "minecraft:beetroot",
      "minecraft:pumpkin_stem",
      "minecraft:melon_stem",
      "minecraft:sweet_berry_bush"
    ];
    // Saplings that can be watered
    this.waterableSaplings = [
      "minecraft:oak_sapling",
      "minecraft:spruce_sapling",
      "minecraft:birch_sapling",
      "minecraft:jungle_sapling",
      "minecraft:acacia_sapling",
      "minecraft:dark_oak_sapling",
      "minecraft:cherry_sapling",
      "minecraft:mangrove_propagule",
      "minecraft:azalea",
      "minecraft:flowering_azalea"
    ];
    this.onUse = this.onUse.bind(this);
  }
  onUse(e) {
    if (e) {
      if (e.itemStack?.typeId === "vf_sc:watering_can") {
        this.onEmptyCanUse(e);
      } else {
        this.onFullCanUse(e);
      }
    }
  }
  onFullCanUse(e) {
    if (e.source.getBlockFromViewDirection()?.block) {
      const blockInfo = e.source.getBlockFromViewDirection({
        includeLiquidBlocks: true,
        includePassableBlocks: true
      });
      const block = blockInfo?.block;
      if (block && this.waterableSaplings.includes(block.typeId)) {
        this.waterSapling(block, e.source);
        this.emptyWateringCan(e.source);
      } else if (block && this.waterableCrops.includes(block.typeId)) {
        this.waterCrop(block, e.source);
        this.emptyWateringCan(e.source);
        const farmlandBlock = block.below();
        if (farmlandBlock) {
          if (block.below()?.typeId === "minecraft:farmland") {
            this.moistenSoil(farmlandBlock);
          }
        }
      } else if (block && block.typeId === "minecraft:farmland") {
        this.moistenSoil(block);
        this.emptyWateringCan(e.source);
      }
    }
  }
  onEmptyCanUse(e) {
    const blockInfo = e.source.getBlockFromViewDirection({
      includeLiquidBlocks: true,
      includePassableBlocks: true
    });
    if (blockInfo?.block.typeId === "minecraft:water") {
      this.fillWateringCan(e.source);
    }
  }
  moistenSoil(block) {
    this.spawnWaterParticlesAtBlock(block);
    block.setPermutation(block.permutation.withState("moisturized_amount", 7));
  }
  spawnWaterParticlesAtBlock(block) {
    block.dimension.spawnParticle("minecraft:water_splash_particle", {
      x: block.location.x + 0.5,
      y: block.location.y + 0.5,
      z: block.location.z + 0.5
    });
  }
  getMaxGrowthForBlock(blockType) {
    switch (blockType) {
      case "minecraft:wheat":
      case "minecraft:carrots":
      case "minecraft:potatoes":
      case "minecraft:pumpkin_stem":
      case "minecraft:melon_stem":
        return 7;
      case "minecraft:beetroot":
        return 7;
      case "minecraft:sweet_berry_bush":
        return 3;
      default:
        return 7;
    }
  }
  waterCrop(block, player) {
    const growthState = block.permutation.getState("growth");
    if (growthState !== null && typeof growthState === "number") {
      const maxGrowth = this.getMaxGrowthForBlock(block.typeId);
      if (growthState < maxGrowth) {
        if (Utils.diceRoll(1, 100) <= 60) {
          block.setPermutation(block.permutation.withState("growth", growthState + 1));
          block.dimension.spawnParticle("minecraft:crop_growth_emitter", {
            x: block.location.x + 0.5,
            y: block.location.y + 0.5,
            z: block.location.z + 0.5
          });
          player.playSound("block.beehive.drip");
          return true;
        } else {
          this.spawnWaterParticlesAtBlock(block);
          player.playSound("block.beehive.drip");
          return true;
        }
      }
    }
    return false;
  }
  waterSapling(block, player) {
    const stage = block.permutation.getState("age_bit");
    if (stage !== null && stage !== void 0 && typeof stage === "boolean" && stage === false) {
      if (Utils.diceRoll(1, 100) <= 60) {
        block.setPermutation(block.permutation.withState("age_bit", true));
        block.dimension.spawnParticle("minecraft:crop_growth_emitter", {
          x: block.location.x + 0.5,
          y: block.location.y + 0.5,
          z: block.location.z + 0.5
        });
        player.playSound("block.beehive.drip");
        return true;
      } else {
        this.spawnWaterParticlesAtBlock(block);
        player.playSound("block.beehive.drip");
        return true;
      }
    }
    return false;
  }
  emptyWateringCan(player) {
    const equipment = player.getComponent("minecraft:equippable");
    if (!equipment) return;
    const mainhand = equipment.getEquipment(EquipmentSlot4.Mainhand);
    if (!mainhand || mainhand.typeId !== "vf_sc:watering_can_filled") return;
    const filledCan = new ItemStack2("vf_sc:watering_can", 1);
    equipment.setEquipment(EquipmentSlot4.Mainhand, filledCan);
    player.playSound("bucket.fill_water");
  }
  fillWateringCan(player) {
    const equipment = player.getComponent("minecraft:equippable");
    if (!equipment) return;
    const mainhand = equipment.getEquipment(EquipmentSlot4.Mainhand);
    if (!mainhand || mainhand.typeId !== "vf_sc:watering_can") return;
    const filledCan = new ItemStack2("vf_sc:watering_can_filled", 1);
    equipment.setEquipment(EquipmentSlot4.Mainhand, filledCan);
    player.playSound("bucket.fill_water");
  }
};
function initWateringCan() {
  world4.beforeEvents.worldInitialize.subscribe((initEvent) => {
    initEvent.itemComponentRegistry.registerCustomComponent("vf_sc:watering_can_use", new wateringCanUse());
  });
}

// scripts/Capturecrate.ts
import {
  world as world5,
  ItemStack as ItemStack3,
  EquipmentSlot as EquipmentSlot5,
  system as system3
} from "@minecraft/server";
var RELEASE_COOLDOWN_TICKS = 20;
var CaptureCrateUse = class {
  constructor() {
    this.allowedTypes = [
      "minecraft:chicken",
      "minecraft:cat",
      "minecraft:rabbit",
      "minecraft:frog",
      "minecraft:parrot",
      "minecraft:ocelot"
    ];
    this.allowedAsBabies = [
      "minecraft:turtle",
      "minecraft:goat",
      "minecraft:mooshroom",
      "minecraft:wolf",
      "minecraft:sheep",
      "minecraft:pig",
      "minecraft:cow",
      "minecraft:armadillo",
      "minecraft:fox"
    ];
    this.onUse = this.onUse.bind(this);
    this.onBlockPlaced = this.onBlockPlaced.bind(this);
  }
  onUse(e) {
    const item = e.itemStack;
    if (!item) return;
    const source = e.source;
    source.playAnimation("animation.player.first_person.use_crook");
    if (source.typeId !== "minecraft:player") return;
    const player = source;
    const inventory = player.getComponent("minecraft:inventory")?.container;
    if (!inventory) return;
    const slot = player.selectedSlotIndex;
    if (item.getDynamicProperty("hasMob") === true) {
      this.fail(player, "\xA7cThis Capture Crate already contains a mob!");
      return;
    }
    const hitEntity = Utils.getEntityPlayerIsLookingAt(player);
    if (!hitEntity) {
      return;
    }
    if (hitEntity.hasComponent("minecraft:tameable")) {
      const tameableComponent = hitEntity.getComponent("minecraft:tameable");
      if (tameableComponent && tameableComponent.isTamed) {
        if (tameableComponent.tamedToPlayerId != player.id) {
          this.fail(player, "\xA7cthis is not your pet.");
          return;
        }
      }
    }
    if (this.allowedTypes.includes(hitEntity.typeId)) {
      this.captureMob(item, player, hitEntity, inventory, slot);
      hitEntity.remove();
      return;
    }
    let isBaby = false;
    if (hitEntity.hasComponent("minecraft:sheep_baby") || hitEntity.hasComponent("minecraft:is_baby")) {
      isBaby = true;
    }
    if (this.allowedAsBabies.includes(hitEntity.typeId) && isBaby) {
      this.captureMob(item, player, hitEntity, inventory, slot);
      hitEntity.remove();
      return;
    }
  }
  // when we capture the mob
  captureMob(item, player, hitEntity, inventory, slot) {
    item.setDynamicProperty("hasMob", true);
    item.setDynamicProperty("entityType", hitEntity.typeId);
    let nameTag = "";
    if (hitEntity.nameTag?.length) {
      nameTag = hitEntity.nameTag;
      item.setDynamicProperty("nameTag", nameTag);
      item.setLore(["Captured Mob:", nameTag]);
    } else {
      item.setLore(["Captured Mob:", hitEntity.typeId.split(":")[1]]);
    }
    item.setDynamicProperty("captureTick", system3.currentTick);
    let isBaby = false;
    if (hitEntity.hasComponent("minecraft:sheep_baby") || hitEntity.hasComponent("minecraft:is_baby")) {
      isBaby = true;
    }
    item.setDynamicProperty("isBaby", isBaby);
    const climateVariant = hitEntity.getProperty("minecraft:climate_variant");
    if (climateVariant) {
      item.setDynamicProperty("climateVariant", climateVariant.toString());
    }
    const soundVariant = hitEntity.getProperty("minecraft:sound_variant");
    if (soundVariant) {
      item.setDynamicProperty("SoundVariant", soundVariant.toString());
    }
    if (hitEntity?.hasComponent("minecraft:variant")) {
      let variant = hitEntity?.getComponent("minecraft:variant");
      if (variant) {
        item.setDynamicProperty("variant", variant.value.toString());
      }
    }
    if (hitEntity.typeId === "minecraft:sheep") {
      let color = hitEntity?.getComponent("minecraft:color");
      let variant = 0;
      if (color) {
        variant = color.value;
      }
      if (variant !== void 0) {
        item.setDynamicProperty("variant", variant.toString());
        if (variant) {
          item.setDynamicProperty("variant", variant.toString());
        }
      }
    }
    if (hitEntity.hasComponent("is_tamed") || hitEntity.hasComponent("minecraft:is_tamed")) {
      if (hitEntity.typeId === "minecraft:cat" || hitEntity.typeId === "minecraft:wolf") {
        let collarColor = hitEntity?.getComponent("minecraft:color");
        if (collarColor) {
          item.setDynamicProperty("collarColour", collarColor.value.toString());
        }
      }
      if (hitEntity.hasComponent("minecraft:health")) {
        const health = hitEntity.getComponent("minecraft:health");
        item.setDynamicProperty("health", health.currentValue.toString());
      }
      item.setDynamicProperty("tame", "true");
      item.setDynamicProperty("tamedTo", player.id);
    }
    inventory.setItem(slot, item);
    this.playAnimalSound(hitEntity.typeId, player);
    player.playSound("block.shelf.break");
    player.playAnimation("animation.crate.use_swing");
  }
  onBlockPlaced(e) {
    if (e.itemStack.typeId !== "vf_sc:capture_crate") return;
    const player = e.source;
    e.cancel = true;
    system3.runTimeout(() => {
      this.spawnMob(player);
    }, 1);
  }
  spawnMob(player) {
    const equipment = player.getComponent("minecraft:equippable");
    if (!equipment) return;
    const mainhand = equipment.getEquipment(EquipmentSlot5.Mainhand);
    if (!mainhand) return;
    if (mainhand.getDynamicProperty("hasMob") !== true) return;
    const captureTick = mainhand.getDynamicProperty("captureTick");
    if (typeof captureTick === "number") {
      const ticksSinceCapture = system3.currentTick - captureTick;
      if (ticksSinceCapture < RELEASE_COOLDOWN_TICKS) {
        const remaining = Math.ceil((RELEASE_COOLDOWN_TICKS - ticksSinceCapture) / 20);
        this.fail(player, `\xA7cPlease wait ${remaining}s before releasing.`);
        return;
      }
    }
    const entityType = mainhand.getDynamicProperty("entityType");
    const isBaby = mainhand.getDynamicProperty("isBaby");
    let hasVarient = false;
    let variant = "";
    let hasClimate = false;
    let climate = "temperate";
    let hasSound = false;
    let sound = "default";
    let isTame = false;
    let hasNameTag = false;
    let nameTag = "";
    let tamedTo = "";
    let collarColour = "0";
    let hasCollar = false;
    let health = 0;
    if (mainhand.getDynamicProperty("variant")) {
      hasVarient = true;
      variant = mainhand.getDynamicProperty("variant");
    }
    if (mainhand.getDynamicProperty("health")) {
      health = mainhand.getDynamicProperty("health");
    }
    if (mainhand.getDynamicProperty("climateVariant")) {
      hasClimate = true;
      climate = mainhand.getDynamicProperty("climateVariant");
    }
    if (entityType === "minecraft:cat" || entityType === "minecraft:wolf") {
      hasCollar = true;
      collarColour = mainhand.getDynamicProperty("collarColour");
    }
    if (mainhand.getDynamicProperty("tame")) {
      isTame = true;
      tamedTo = mainhand.getDynamicProperty("tamedTo");
      if (player.id !== tamedTo) {
        this.fail(player, "\xA7cYou can only release mobs that are tamed to you!");
        return;
      }
    }
    if (mainhand.getDynamicProperty("soundVariant")) {
      hasSound = true;
      sound = mainhand.getDynamicProperty("soundVariant");
    }
    if (mainhand.getDynamicProperty("variant")) {
      hasVarient = true;
      variant = mainhand.getDynamicProperty("variant");
    }
    if (mainhand.getDynamicProperty("nameTag")) {
      hasNameTag = true;
      nameTag = mainhand.getDynamicProperty("nameTag");
    }
    if (!entityType) {
      this.fail(player, "\xA7cNo entity stored in this crate!");
      return;
    }
    const inventory = player.getComponent("minecraft:inventory")?.container;
    if (!inventory) return;
    const slot = player.selectedSlotIndex;
    inventory.setItem(slot, new ItemStack3("vf_sc:capture_crate", 1));
    const viewDirection = player.getViewDirection();
    const spawnDistance = 2;
    let spawnPos = {
      x: player.location.x + viewDirection.x * spawnDistance,
      y: player.location.y,
      z: player.location.z + viewDirection.z * spawnDistance
    };
    const dimension = player.dimension;
    const blockAtPos = dimension.getBlock({
      x: Math.floor(spawnPos.x),
      y: Math.floor(spawnPos.y),
      z: Math.floor(spawnPos.z)
    });
    const blockAbove = dimension.getBlock({
      x: Math.floor(spawnPos.x),
      y: Math.floor(spawnPos.y) + 1,
      z: Math.floor(spawnPos.z)
    });
    if (blockAtPos?.typeId !== "minecraft:air" || blockAbove?.typeId !== "minecraft:air") {
      let foundSafe = false;
      for (let yOffset = 1; yOffset <= 5; yOffset++) {
        const checkBlock = dimension.getBlock({
          x: Math.floor(spawnPos.x),
          y: Math.floor(spawnPos.y) + yOffset,
          z: Math.floor(spawnPos.z)
        });
        const checkBlockAbove = dimension.getBlock({
          x: Math.floor(spawnPos.x),
          y: Math.floor(spawnPos.y) + yOffset + 1,
          z: Math.floor(spawnPos.z)
        });
        if (checkBlock?.typeId === "minecraft:air" && checkBlockAbove?.typeId === "minecraft:air") {
          spawnPos.y += yOffset;
          foundSafe = true;
          break;
        }
      }
      if (!foundSafe) {
        this.fail(player, "\xA7cNo safe location to spawn mob!");
        const inventory2 = player.getComponent("minecraft:inventory")?.container;
        if (inventory2) {
          const slot2 = player.selectedSlotIndex;
          inventory2.setItem(slot2, mainhand);
        }
        return;
      }
    }
    const mob = dimension.spawnEntity(entityType, spawnPos);
    this.playAnimalSound(entityType, player);
    player.playSound("block.shelf.break");
    if (!mob) {
      this.fail(player, "\xA7cFailed to spawn mob!");
      return;
    }
    if (entityType === "minecraft:sheep") {
      this.handleSheep(mob, variant);
    } else {
      if (hasVarient) {
        this.handleVarient(mob, variant);
      }
    }
    if (hasClimate) {
      mob.setProperty("minecraft:climate_variant", climate);
    }
    if (hasSound) {
      mob.setProperty("minecraft:sound_variant", sound);
    }
    if (hasNameTag) {
      const newNameTag = new ItemStack3("minecraft:name_tag", 1);
      newNameTag.nameTag = nameTag;
      const inventory2 = player.getComponent("inventory");
      if (inventory2 && inventory2.container) {
        inventory2.container.addItem(newNameTag);
      }
    }
    if (entityType === "minecraft:parrot") {
      if (isTame) {
        if (player.id != tamedTo) {
          this.fail(player, "you can only use crates that contain a mob tamed to you");
          return;
        }
        mob.triggerEvent("minecraft:spawn_tame");
        system3.runTimeout(() => {
          const tameableComponent = mob.getComponent("minecraft:tameable");
          if (tameableComponent) {
            tameableComponent.tame(player);
          } else {
          }
        }, 5);
      }
    } else {
      if (isTame) {
        if (player.id != tamedTo) {
          this.fail(player, "you can only use crates that contain a mob tamed to you");
          return;
        }
        mob.triggerEvent("minecraft:on_tame");
        const tameableComponent = mob.getComponent("minecraft:tameable");
        if (tameableComponent) {
          tameableComponent.tame(player);
        }
        if (hasCollar) {
          system3.runTimeout(() => {
            let collar = mob?.getComponent("minecraft:color");
            if (collar) {
              collar.value = parseInt(collarColour);
            }
          }, 5);
        }
      }
    }
    if (isBaby) {
      if (mob.typeId === "minecraft:wolf") {
        mob.triggerEvent("minecraft:spawn_wild_baby");
      } else {
        mob.triggerEvent("minecraft:entity_born");
      }
    } else {
      mob.triggerEvent("minecraft:entity_grow_up");
    }
    if (health > 0) {
      const healthComponent = mob.getComponent("minecraft:health");
      const max = healthComponent.effectiveMax;
      healthComponent.setCurrentValue(Math.min(health, max));
    }
  }
  fail(player, text) {
    player.playSound("game.player.attack.nodamage");
  }
  handleVarient(mob, varient) {
    if (mob.typeId === "minecraft:mooshroom") {
      if (varient == "0") {
        mob.triggerEvent("minecraft:become_red");
      } else {
        mob.triggerEvent("minecraft:become_brown");
      }
    } else {
      mob.triggerEvent("vf_rm_var");
      mob.triggerEvent("vf_set_var_" + varient);
    }
  }
  handleSheep(mob, varient) {
    const en = mob.getComponent("minecraft:color");
    en.value = parseInt(varient);
  }
  playAnimalSound(type, source) {
    let soundToPlay = "mob.sheep.say";
    switch (type) {
      case "minecraft:chicken":
        soundToPlay = "mob.chicken.say";
        break;
      case "minecraft:pig":
        soundToPlay = "mob.pig.say";
        break;
      case "minecraft:turtle":
        soundToPlay = "mob.turtle.ambient";
        break;
      case "minecraft:goat":
        soundToPlay = "mob.goat.ambient";
        break;
      case "minecraft:mooshroom":
        soundToPlay = "mob.cow.say";
        break;
      case "minecraft:cow":
        soundToPlay = "mob.cow.say";
        break;
      case "minecraft:sheep":
        soundToPlay = "mob.sheep.say";
        break;
      case "minecraft:armadillo":
        soundToPlay = "mob.armadillo.ambient";
        break;
      case "minecraft:fox":
        soundToPlay = "mob.fox.ambient";
        break;
      case "minecraft:wolf":
        soundToPlay = "mob.wolf.bark";
        break;
      case "minecraft:cat":
        soundToPlay = "mob.cat.meow";
        break;
      case "minecraft:rabbit":
        soundToPlay = "mob.rabbit.hurt";
        break;
      case "minecraft:frog":
        soundToPlay = "mob.frog.ambient";
        break;
      case "minecraft:parrot":
        soundToPlay = "mob.parrot.hurt";
        break;
      case "minecraft:ocelot":
        soundToPlay = "mob.ocelot.idle";
        break;
      default:
        soundToPlay = "mob.chicken.say";
    }
    source.playSound(soundToPlay);
  }
};
function initCaptureCrate() {
  const handler = new CaptureCrateUse();
  world5.beforeEvents.worldInitialize.subscribe((initEvent) => {
    initEvent.itemComponentRegistry.registerCustomComponent("vf_sc:capture_crate_use", handler);
  });
  world5.beforeEvents.itemUseOn.subscribe(handler.onBlockPlaced);
}

// scripts/sheepColorFix.ts
import { world as world6 } from "@minecraft/server";
function initSheepColorFix() {
  world6.afterEvents.entitySpawn.subscribe((event) => {
    const entity = event.entity;
    if (entity.typeId !== "minecraft:sheep") return;
    if (!entity.hasComponent("minecraft:is_baby")) return;
    if (entity.hasComponent("minecraft:color")) return;
    const nearbyEntities = entity.dimension.getEntities({
      location: entity.location,
      maxDistance: 10,
      // Search within 10 blocks
      type: "minecraft:sheep"
    });
    let parentSheep = null;
    for (const nearbyEntity of nearbyEntities) {
      if (nearbyEntity.id === entity.id) continue;
      if (nearbyEntity.hasComponent("minecraft:is_baby")) continue;
      if (nearbyEntity.hasComponent("minecraft:color")) {
        parentSheep = nearbyEntity;
        break;
      }
    }
    if (parentSheep) {
      const colorComp = parentSheep.getComponent("minecraft:color");
      if (colorComp && colorComp.value !== void 0) {
        const colorValue = colorComp.value;
        const colorEvents = {
          0: "minecraft:sheep_white",
          1: "minecraft:sheep_orange",
          2: "minecraft:sheep_magenta",
          3: "minecraft:sheep_light_blue",
          4: "minecraft:sheep_yellow",
          5: "minecraft:sheep_lime",
          6: "minecraft:sheep_pink",
          7: "minecraft:sheep_gray",
          8: "minecraft:sheep_light_gray",
          9: "minecraft:sheep_cyan",
          10: "minecraft:sheep_purple",
          11: "minecraft:sheep_blue",
          12: "minecraft:sheep_brown",
          13: "minecraft:sheep_green",
          14: "minecraft:sheep_red",
          15: "minecraft:sheep_black"
        };
        const eventName = colorEvents[colorValue];
        if (eventName) {
          entity.triggerEvent(eventName);
        }
      }
    } else {
      entity.triggerEvent("minecraft:sheep_white");
    }
  });
}

// scripts/catVariantFix.ts
import { world as world7 } from "@minecraft/server";
function initCatVariantFix() {
  world7.afterEvents.entitySpawn.subscribe((event) => {
    const entity = event.entity;
    if (entity.typeId !== "minecraft:cat") return;
    if (!entity.hasComponent("minecraft:is_baby")) return;
    if (entity.hasComponent("minecraft:variant")) return;
    const nearbyEntities = entity.dimension.getEntities({
      location: entity.location,
      maxDistance: 10,
      type: "minecraft:cat"
    });
    let parentCat = null;
    for (const nearbyEntity of nearbyEntities) {
      if (nearbyEntity.id === entity.id) continue;
      if (nearbyEntity.hasComponent("minecraft:is_baby")) continue;
      if (nearbyEntity.hasComponent("minecraft:variant")) {
        parentCat = nearbyEntity;
        break;
      }
    }
    const variantEvents = {
      0: "vf_set_var_0",
      // white
      1: "vf_set_var_1",
      // tuxedo
      2: "vf_set_var_2",
      // red
      3: "vf_set_var_3",
      // siamese
      4: "vf_set_var_4",
      // british
      5: "vf_set_var_5",
      // calico
      6: "vf_set_var_6",
      // persian
      7: "vf_set_var_7",
      // ragdoll
      8: "vf_set_var_8",
      // tabby
      9: "vf_set_var_9",
      // black
      10: "vf_set_var_10"
      // jellie
    };
    if (parentCat) {
      const variantComp = parentCat.getComponent("minecraft:variant");
      if (variantComp !== void 0) {
        const eventName = variantEvents[variantComp.value];
        if (eventName) {
          entity.triggerEvent(eventName);
        }
      }
    } else {
      entity.triggerEvent("vf_set_var_0");
    }
  });
}

// scripts/wolfVariantFix.ts
import { world as world8 } from "@minecraft/server";
function initWolfVariantFix() {
  world8.afterEvents.entitySpawn.subscribe((event) => {
    const entity = event.entity;
    if (entity.typeId !== "minecraft:wolf") return;
    if (!entity.hasComponent("minecraft:is_baby")) return;
    if (entity.hasComponent("minecraft:variant")) return;
    const nearbyEntities = entity.dimension.getEntities({
      location: entity.location,
      maxDistance: 10,
      type: "minecraft:wolf"
    });
    let parentWolf = null;
    for (const nearbyEntity of nearbyEntities) {
      if (nearbyEntity.id === entity.id) continue;
      if (nearbyEntity.hasComponent("minecraft:is_baby")) continue;
      if (nearbyEntity.hasComponent("minecraft:variant")) {
        parentWolf = nearbyEntity;
        break;
      }
    }
    const variantEvents = {
      0: "vf_set_var_0",
      // pale
      1: "vf_set_var_1",
      // ashen
      2: "vf_set_var_2",
      // black
      3: "vf_set_var_3",
      // chestnut
      4: "vf_set_var_4",
      // rusty
      5: "vf_set_var_5",
      // snowy
      6: "vf_set_var_6",
      // spotted
      7: "vf_set_var_7",
      // striped
      8: "vf_set_var_8"
      // woods
    };
    if (parentWolf) {
      const variantComp = parentWolf.getComponent("minecraft:variant");
      if (variantComp !== void 0) {
        const eventName = variantEvents[variantComp.value];
        if (eventName) {
          entity.triggerEvent(eventName);
        }
      }
    } else {
      entity.triggerEvent("vf_set_var_0");
    }
  });
}

// scripts/main.ts
function init() {
  initUse();
  initSickle();
  initFarmersHat();
  initWateringCan();
  initCaptureCrate();
  initSheepColorFix();
  initCatVariantFix();
  initWolfVariantFix();
}
init();

//# sourceMappingURL=../debug/main.js.map
