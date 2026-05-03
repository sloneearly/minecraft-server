import {
    EntityComponentTypes,
    system,
    world
  } from "@minecraft/server";
  system.runInterval(() => {
    const players = world.getAllPlayers();
    players.forEach((player) => {
      const playerInventory = player.getComponent(EntityComponentTypes.Inventory);
      const playerContainer = playerInventory.container;
      if (playerContainer !== void 0) {
        const selectedContainerSlot = playerContainer.getSlot(player.selectedSlotIndex);
        const selectedItem = selectedContainerSlot.getItem();
        if (selectedItem?.typeId === "tt:mazo_basalt") {
          player.runCommand(`/effect @p fire_resistance 10 0 true`);
        }
        if (selectedItem?.typeId === "tt:mazo_basalt") {
          player.runCommand(`/particle minecraft:trial_spawner_detection ~-0.5 ~-1 ~-0.5`);
        }
        if (selectedItem?.typeId === "tt:mazo_soul") {
          player.runCommand(`/particle minecraft:trial_spawner_detection_ominous ~-0.5 ~-1 ~-0.5`);
        }
        if (selectedItem?.typeId === "tt:mazo_soul") {
          player.runCommand(`/effect @p slow_falling 10 0 true`);
        }
        if (selectedItem?.typeId === "tt:mazo_carmesi") {
          player.runCommand(`/particle tt:red_hammer ~-0.5 ~ ~-0.5`);
        }
        if (selectedItem?.typeId === "tt:mazo_carmesi") {
          player.runCommand(`/effect @p strength 10 0 true`);
        }
        if (selectedItem?.typeId === "tt:mazo_twisted") {
          player.runCommand(`/particle tt:twisted_hammer ~-0.5 ~-1 ~-0.5`);
        }
        if (selectedItem?.typeId === "tt:mazo_twisted") {
          player.runCommand(`/effect @p haste 10 0 true`);
        }


      }
    });
  }, 60);