import { world, system, BlockPermutation, GameMode } from "@minecraft/server";
import { decreaseItemStack } from "../ntk_functions.js";

world.beforeEvents.playerInteractWithBlock.subscribe(event => {
  const player = event.player;
  const itemStack = event.itemStack;
  const block = event.block;
  const blockAllState = block.permutation.getAllStates();
  const strippedWoods = [
    "ntk:stripped_corrupted_oak_log",
    "ntk:stripped_corrupted_oak_wood",
    "ntk:stripped_mossy_willow_log",
    "ntk:stripped_mossy_willow_wood",
    "ntk:stripped_overgrown_jungle_log",
    "ntk:stripped_overgrown_jungle_wood"
  ]
  if (itemStack === undefined) return;
  if (strippedWoods.includes(block.typeId)) {
    if (itemStack.typeId === "minecraft:bone_meal" || itemStack.hasTag("ntk:bone_meal")) {
      system.run(() => {
        decreaseItemStack(player, itemStack, 1, "Mainhand", false);
        block.dimension.playSound("item.bone_meal.use", block.location, { pitch: 1.0, volume: 1.0 });
        block.dimension.spawnParticle("ntk:barked_2_particle", { x: block.location.x, y: block.location.y, z: block.location.z });
        if (block.permutation.matches("ntk:stripped_corrupted_oak_log")) {
          block.setPermutation(BlockPermutation.resolve("ntk:corrupted_oak_log", blockAllState ));
          return;
        }
        if (block.permutation.matches("ntk:stripped_corrupted_oak_wood")) {
          block.setPermutation(BlockPermutation.resolve("ntk:corrupted_oak_wood", blockAllState ));
          return;
        }
        if (block.permutation.matches("ntk:stripped_mossy_willow_log")) {
          block.setPermutation(BlockPermutation.resolve("ntk:mossy_willow_log", blockAllState ));
          return;
        }
        if (block.permutation.matches("ntk:stripped_mossy_willow_wood")) {
          block.setPermutation(BlockPermutation.resolve("ntk:mossy_willow_wood", blockAllState ));
          return;
        }
        if (block.permutation.matches("ntk:stripped_overgrown_jungle_log")) {
          block.setPermutation(BlockPermutation.resolve("ntk:overgrown_jungle_log", blockAllState ));
          return;
        }
        if (block.permutation.matches("ntk:stripped_overgrown_jungle_wood")) {
          block.setPermutation(BlockPermutation.resolve("ntk:overgrown_jungle_wood", blockAllState ));
          return;
        }
      });
    }
    else return;
  }
  else return;
});
