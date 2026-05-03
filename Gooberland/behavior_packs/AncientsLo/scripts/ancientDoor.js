import { BlockPermutation, world,system } from "@minecraft/server";
import Timer from "./timer/timerClass.js";

world.beforeEvents.worldInitialize.subscribe((initEvent) => {
    initEvent.blockComponentRegistry.registerCustomComponent("ancients:door_components", {
        beforeOnPlayerPlace: e => {
            const { player, block, face, permutationToPlace, dimension } = e;
            if(!block.above().isAir || block.above().hasTag("ancients:isSolid")){
                e.cancel = true
                return;
            }

            const permDirection = permutationToPlace.getState("minecraft:cardinal_direction");

            let isDouble = false

            let directions = [
                { dir: () => block.north(), growStage: 8 },
                { dir: () => block.east(), growStage: 5 },
                { dir: () => block.south(), growStage: 7 },
                { dir: () => block.west(), growStage: 6 }
            ];
                
            directions.sort(() => Math.random() - 0.5);
            
                
            for (let direction of directions) {
                if (direction.dir().hasTag("door")){
                    if (direction.dir().permutation.getState("minecraft:cardinal_direction") == permDirection && direction.dir().permutation.getState("ancient:double") != true) {
                        isDouble = true
                        break;
                    }
                }
                
            }   

            block.above().setPermutation(BlockPermutation.resolve(permutationToPlace.type.id,{"minecraft:cardinal_direction":permDirection,"ancient:type":'upper',"ancient:double":isDouble}))
            e.permutationToPlace = permutationToPlace.withState('ancient:double', isDouble);
            // Your code here
        },
        onPlayerInteract: (event) => {
            const { player, block, dimension, face, faceLocation } = event;
            const isBottom = block.permutation.getState("ancient:type") == 'bottom' ? true : false
            const interact = block.permutation.getState("ancient:interact")
            const soundId = !interact == true ? "open.wooden_door" : "close.wooden_door"

            block.setPermutation(block.permutation.withState("ancient:interact",!interact))

            player.dimension.runCommandAsync(`playsound ${soundId} @a ${block.x} ${block.y} ${block.z}`)

            if(isBottom){
                block.above().setPermutation(block.above().permutation.withState("ancient:interact",!interact))
            }
            else block.below().setPermutation(block.below().permutation.withState("ancient:interact",!interact))
            
        },
    });
});

world.beforeEvents.playerBreakBlock.subscribe(eventData => {
    const block = eventData.block;

    if (!block.hasTag("door"))return;

    const typePerm = block.permutation.getState("ancient:type")

    system.run( () => {
        if (typePerm == "bottom")
            block.above().setType("minecraft:air");
        else{
            block.below().setType("minecraft:air");
        }
    })
})

world.afterEvents.pressurePlatePush.subscribe(eventData => {
    const block = eventData.block;

    ["north", "east", "south", "west"].forEach(direction => {
        handleDoorInteraction(() => block[direction](), true);
    });


})

world.afterEvents.pressurePlatePop.subscribe(eventData => {
    const block = eventData.block;

    ["north", "east", "south", "west"].forEach(direction => {
        handleDoorInteraction(() => block[direction](), false);
    });

})

world.afterEvents.buttonPush.subscribe(eventData => {
    const block = eventData.block;

    handleButtonDoorInteraction(block,true);

    let timer = Timer.set(1, "seconds");

    let intervalId = system.runInterval(() => {
        let isExpired = Timer.hasExpired(timer);     

        if (isExpired) {
            handleButtonDoorInteraction(block,false);
            system.clearRun(intervalId);
        }
    }, 15);

})

world.afterEvents.leverAction.subscribe(eventData => {
    const block = eventData.block;
    const leverToggle = block.permutation.getState("open_bit")

    handleButtonDoorInteraction(block,leverToggle);

})

world.afterEvents.playerBreakBlock.subscribe(eventData => {
    const block = eventData.block;
    const brokenBlock = eventData.brokenBlockPermutation
    if (brokenBlock.type.id == "minecraft:lever"){
        const leverToggle = brokenBlock.getState("open_bit")
        if (leverToggle == true)handleButtonDoorInteraction(block,!leverToggle);
        
    }

})



export function handleDoorInteraction(directionFunc, shouldOpen) {
    const adjacentBlock = directionFunc();
    
    if (adjacentBlock.hasTag("door")) {
        const interact = adjacentBlock.permutation.getState("ancient:interact");
        const isBottom = adjacentBlock.permutation.getState("ancient:type") === "bottom";
        const soundId = shouldOpen ? "open.wooden_door" : "close.wooden_door";
        
        if (interact !== shouldOpen) {
            const targetBlock = isBottom ? adjacentBlock.above() : adjacentBlock.below();
            
            adjacentBlock.setPermutation(adjacentBlock.permutation.withState("ancient:interact", shouldOpen));
            targetBlock.setPermutation(targetBlock.permutation.withState("ancient:interact", shouldOpen));

            adjacentBlock.dimension.runCommandAsync(`playsound ${soundId} @a ${adjacentBlock.x} ${adjacentBlock.y} ${adjacentBlock.z}`);
        }
    }
}

export function handleButtonDoorInteraction(block,shouldOpen) {
    const corners = {
        northeast: () => block.north().east(),
        northwest: () => block.north().west(),
        southeast: () => block.south().east(),
        southwest: () => block.south().west()
    };
    
    ["north", "east", "south", "west"].forEach(direction => {
        handleDoorInteraction(() => block[direction](), shouldOpen);
    });

    Object.values(corners).forEach(cornerFunc => {
        handleDoorInteraction(cornerFunc, shouldOpen);
    });
}

