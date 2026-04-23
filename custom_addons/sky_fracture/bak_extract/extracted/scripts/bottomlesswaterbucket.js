import { world } from "@minecraft/server";


world.beforeEvents.itemUseOn.subscribe((event) => {

    if (event.itemStack.typeId === "item:bottomless_water_bucket") {
      
        

        if(event.blockFace=="Up"){
            event.source.runCommandAsync("execute positioned "+ event.block.location.x+ " "+ (event.block.location.y)+ " "+ event.block.location.z+ " run fill ~ ~1 ~ ~ ~ ~ flowing_water replace air");                                  
        }      
        
        if(event.blockFace=="Down"){
            event.source.runCommandAsync("execute positioned "+ event.block.location.x+ " "+ (event.block.location.y)+ " "+ event.block.location.z+ " run fill ~ ~-1 ~ ~ ~ ~ flowing_water replace air");
        }  
        
        if(event.blockFace=="North"){
            event.source.runCommandAsync("execute positioned "+ event.block.location.x+ " "+ (event.block.location.y)+ " "+ event.block.location.z+ " run fill ~ ~ ~-1 ~ ~ ~-1 flowing_water replace air");
        }  

        if(event.blockFace=="South"){
            event.source.runCommandAsync("execute positioned "+ event.block.location.x+ " "+ (event.block.location.y)+ " "+ event.block.location.z+ " run fill ~ ~ ~1 ~ ~ ~1 flowing_water replace air");
        }  

        if(event.blockFace=="East"){
            event.source.runCommandAsync("execute positioned "+ event.block.location.x+ " "+ (event.block.location.y)+ " "+ event.block.location.z+ " run fill ~1 ~ ~ ~1 ~ ~ flowing_water replace air");
        }  

        if(event.blockFace=="West"){
            event.source.runCommandAsync("execute positioned "+ event.block.location.x+ " "+ (event.block.location.y)+ " "+ event.block.location.z+ " run fill ~-1 ~ ~ ~-1 ~ ~ flowing_water replace air");
        }  
    }
    if (event.itemStack.typeId === "item:bottomless_water_bucket") {
      
        

        if(event.blockFace=="Up"){
            event.source.runCommandAsync("execute positioned "+ event.block.location.x+ " "+ (event.block.location.y)+ " "+ event.block.location.z+ " run fill ~ ~1 ~ ~ ~ ~ flowing_water replace water");                                  
        }      
        
        if(event.blockFace=="Down"){
            event.source.runCommandAsync("execute positioned "+ event.block.location.x+ " "+ (event.block.location.y)+ " "+ event.block.location.z+ " run fill ~ ~-1 ~ ~ ~ ~ flowing_water replace water");
        }  
        
        if(event.blockFace=="North"){
            event.source.runCommandAsync("execute positioned "+ event.block.location.x+ " "+ (event.block.location.y)+ " "+ event.block.location.z+ " run fill ~ ~ ~-1 ~ ~ ~-1 flowing_water replace water");
        }  

        if(event.blockFace=="South"){
            event.source.runCommandAsync("execute positioned "+ event.block.location.x+ " "+ (event.block.location.y)+ " "+ event.block.location.z+ " run fill ~ ~ ~1 ~ ~ ~1 flowing_water replace water");
        }  

        if(event.blockFace=="East"){
            event.source.runCommandAsync("execute positioned "+ event.block.location.x+ " "+ (event.block.location.y)+ " "+ event.block.location.z+ " run fill ~1 ~ ~ ~1 ~ ~ flowing_water replace water");
        }  

        if(event.blockFace=="West"){
            event.source.runCommandAsync("execute positioned "+ event.block.location.x+ " "+ (event.block.location.y)+ " "+ event.block.location.z+ " run fill ~-1 ~ ~ ~-1 ~ ~ flowing_water replace water");
        }  
    }
});