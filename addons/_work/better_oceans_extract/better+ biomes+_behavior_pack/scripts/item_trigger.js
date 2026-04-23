import { system, world } from '@minecraft/server';
import { decrementStack, getOppositeDirection, DirectionType, cardinalSides, randomFunction } from './utils/helper';
import { directionToVector3 } from './utils/math';

system.beforeEvents.startup.subscribe(initEvent => { initEvent.itemComponentRegistry.registerCustomComponent('pa_crackopencoconut:trigger', {
  onConsume: e => {
  e.source.removeEffect("minecraft:weakness");
e.source.removeEffect("minecraft:slow_falling");
e.source.removeEffect("minecraft:slowness");
e.source.removeEffect("minecraft:regeneration");
e.source.removeEffect("minecraft:speed");
e.source.removeEffect("minecraft:strength");
e.source.removeEffect("minecraft:saturation");
e.source.removeEffect("minecraft:resistance");
e.source.removeEffect("minecraft:poison");
e.source.removeEffect("minecraft:nausea");
e.source.removeEffect("minecraft:levitation");
e.source.removeEffect("minecraft:mining_fatigue");
e.source.removeEffect("minecraft:night_vision");
e.source.removeEffect("minecraft:jump_boost");
e.source.removeEffect("minecraft:invisibility");
e.source.removeEffect("minecraft:wither");
e.source.removeEffect("minecraft:water_breathing");
e.source.removeEffect("minecraft:instant_health");
e.source.removeEffect("minecraft:instant_damage");
e.source.removeEffect("minecraft:hunger");
e.source.removeEffect("minecraft:village_hero");
e.source.removeEffect("minecraft:health_boost");
e.source.removeEffect("minecraft:haste");
e.source.removeEffect("minecraft:fire_resistance");
e.source.removeEffect("minecraft:fatal_poison");
e.source.removeEffect("minecraft:conduit_power");
e.source.removeEffect("minecraft:blindness");
e.source.removeEffect("minecraft:bad_omen");
e.source.removeEffect("minecraft:absorption");
  
},

  
});

initEvent.itemComponentRegistry.registerCustomComponent('pa_ender_cookie:trigger', {
  onConsume: e => {
  e.source.addEffect("minecraft:haste", 600, {amplifier: 1});
e.source.addEffect("minecraft:levitation", 40, {amplifier: 1});
e.source.addEffect("minecraft:night_vision", 40, {amplifier: 1});
e.source.addEffect("minecraft:saturation", 600, {amplifier: 3});
e.source.removeEffect("minecraft:blindness");
e.source.removeEffect("minecraft:slow_falling");
e.source.removeEffect("minecraft:mining_fatigue");
e.source.removeEffect("minecraft:slowness");
e.source.removeEffect("minecraft:poison");
e.source.removeEffect("minecraft:nausea");
e.source.removeEffect("minecraft:wither");
e.source.removeEffect("minecraft:weakness");
  
},

  
});

initEvent.itemComponentRegistry.registerCustomComponent('pa_jasmine_wine:trigger', {
  onConsume: e => {
  e.source.addEffect("minecraft:village_hero", 20000, {amplifier: 1});
e.source.addEffect("minecraft:instant_health", 1000, {amplifier: 1});
e.source.addEffect("minecraft:night_vision", 20000, {amplifier: 1});
e.source.addEffect("minecraft:slow_falling", 20000, {amplifier: 1});
  
},

  
});

initEvent.itemComponentRegistry.registerCustomComponent('pa_lavender_wine:trigger', {
  onConsume: e => {
  e.source.addEffect("minecraft:nausea", 200, {amplifier: 10});
e.source.addEffect("minecraft:speed", 200, {amplifier: 1});
  
},

  
});

initEvent.itemComponentRegistry.registerCustomComponent('pa_lumi_lily_wine:trigger', {
  onConsume: e => {
  e.source.addEffect("minecraft:village_hero", 20000, {amplifier: 1});
e.source.addEffect("minecraft:instant_health", 1000, {amplifier: 1});
e.source.addEffect("minecraft:night_vision", 20000, {amplifier: 1});
e.source.addEffect("minecraft:slow_falling", 20000, {amplifier: 1});
  
},

  
});

initEvent.itemComponentRegistry.registerCustomComponent('pa_onion_wine:trigger', {
  onConsume: e => {
  e.source.addEffect("minecraft:nausea", 400, {amplifier: 1});
  
},

  
});

initEvent.itemComponentRegistry.registerCustomComponent('pa_rose_wine:trigger', {
  onConsume: e => {
  e.source.addEffect("minecraft:fatal_poison", 600, {amplifier: 1});
e.source.addEffect("minecraft:instant_health", 600, {amplifier: 1});
e.source.addEffect("minecraft:poison", 600, {amplifier: 1});
  
},

  
});
 });

