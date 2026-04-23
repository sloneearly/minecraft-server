import { world, system } from "@minecraft/server";

system.run(() => {
    const overworld = world.getDimension("overworld");

    try {
        overworld.runCommandAsync("gamerule commandblockoutput false");
        console.warn("[SVS] commandblockoutput establecido en false automáticamente.");
    } catch (e) {
        console.warn("[SVS] Error al establecer gamerule:", e);
    }
});
