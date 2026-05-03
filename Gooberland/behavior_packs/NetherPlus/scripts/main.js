// data/gametests/src/Functions/ItemSelect/index.ts

import './hammer';
import {
  EntityComponentTypes,
  system,
  world
} from "@minecraft/server";
system.runInterval(() => {
  const players = world.getAllPlayers();

  players.forEach(player => {
    const Head = player.getComponent('equippable').getEquipment('Head')?.typeId;
    const Chest = player.getComponent('equippable').getEquipment('Chest')?.typeId;
    const Legs = player.getComponent('equippable').getEquipment('Legs')?.typeId;
    const Feet = player.getComponent('equippable').getEquipment('Feet')?.typeId;
    let message; 
//Casco
    if (Head === 'tt:crimson_helmet') {
      player.runCommandAsync(`/effect @p health_boost 5 0 true`)
    } if (Head === 'tt:crimson_helmet') {
      player.runCommandAsync(`/particle tt:glare_particle ~ ~1 ~`)
    }
//Pecho    
    if (Chest === 'tt:crimson_chestplate') {
      player.runCommandAsync(`/damage @e[r=3,type=!player,type=!allay,type=!cat,type=!wolf,type=!axolotl,type=!villager,type=!bee,type=!item] 1`)
    } if (Chest === 'tt:crimson_chestplate') {
      player.runCommandAsync(`/effect @p regeneration 4 0 true`)
    }
//Piernas    
    if (Legs === 'tt:crimson_leggings') {
      player.runCommandAsync(`/effect @a resistance 4 1 true`)
    }
//Botas    
    if (Feet === 'tt:crimson_boots') {
      player.runCommandAsync(`/effect @p fire_resistance 4 0 true`)
    }
  });
}, 30);