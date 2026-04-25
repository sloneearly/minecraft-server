import { world } from "@minecraft/server";

export const handleCommands = (args, sender) => {
    const cmd = args[0]?.toLowerCase();

    if (cmd === "gen") {
        const dim = world.getDimension("overworld");
        dim.runCommandAsync("setblock 0 -60 0 gold_block");
        dim.runCommandAsync("summon armor_stand 0 -59 0 ~ ~ \"gen.chunk\"");
        dim.runCommandAsync("tag @e[name=\"gen.chunk\"] add gen.chunk");
        sender.teleport({x:0,y:80,z:0}, {dimension: dim});
        return;
    }

    if (cmd === "seed" && !isNaN(Number(args[1]))) {
        world.scoreboard.getObjective("terrie.seed").setScore("value", Number(args[1]));
        sender.runCommand(`tellraw @s {"rawtext":[{"text":"Seed set to ${args[1]}"}]}`);
        return;
    }

    if (cmd === "terrain") {
        const scale = ["small","medium","large"].includes(args[2]?.toLowerCase()) ? args[2].toLowerCase() : "medium";
        world.scoreboard.getObjective("terrie.scale").setScore("value", scale);
        sender.runCommand(`tellraw @s {"rawtext":[{"text":"Terrain scale: ${scale}"}]}`);
    }
};