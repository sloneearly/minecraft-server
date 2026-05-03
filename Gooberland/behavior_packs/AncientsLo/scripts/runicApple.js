import { world, system } from "@minecraft/server";
import Timer from "./timer/timerClass";

world.beforeEvents.worldInitialize.subscribe(initEvent => {
    initEvent.itemComponentRegistry.registerCustomComponent('ancients:runic_apple', {
      onConsume: e =>  {
        const source = e.source
        source.addEffect('regeneration', 400, {amplifier: 1});
        source.addEffect('absorption', 2400, {amplifier: 1});
        source.addEffect('resistance', 1200);
        source.addEffect('fire_resistance', 1200);

      }
    });
});

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.itemComponentRegistry.registerCustomComponent('ancients:runic_effect', {
    onConsume: e =>  {
      const source = e.source

      source.setDynamicProperty("ancients:runic",true)

      console.warn(e.itemStack.nameTag)

      let timeHolder = Timer.set(40, "seconds");
      let intervalId = system.runInterval(() => {
          let isExpired = Timer.hasExpired(timeHolder);                
          source.dimension.spawnParticle("ancients:active_pillar",{x: source.location.x, y: source.location.y +0.5, z: source.location.z})
          if (isExpired) {
              system.clearRun(intervalId)
              source.setDynamicProperty("ancients:runic",false)
          }
      }, 10);

    }
  });
  initEvent.itemComponentRegistry.registerCustomComponent('ancients:runic_plus_effect', {
    onConsume: e =>  {
      const source = e.source

      source.setDynamicProperty("ancients:runic_plus",true)

      let timeHolder = Timer.set(40, "seconds");
      let intervalId = system.runInterval(() => {
          let isExpired = Timer.hasExpired(timeHolder);                
          source.dimension.spawnParticle("ancients:active_pillar",{x: source.location.x, y: source.location.y +0.5, z: source.location.z})
          if (isExpired) {
              system.clearRun(intervalId)
              source.setDynamicProperty("ancients:runic_plus",false)
          }
      }, 10);

    }
  });
});

