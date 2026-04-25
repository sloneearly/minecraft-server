import { world } from "@minecraft/server";

export let currentSeed = 0;
export let currentScale = "medium";

export const initScoreboards = () => {
    try { world.scoreboard.addObjective("terrie.seed", "Seed"); } catch {}
    try { world.scoreboard.addObjective("terrie.scale", "Scale"); } catch {}

    const seedObj = world.scoreboard.getObjective("terrie.seed");
    const scaleObj = world.scoreboard.getObjective("terrie.scale");

    currentSeed = seedObj?.getScore("value") ?? 0;
    currentScale = ["small","medium","large"].includes(scaleObj?.getScore("value")) ? scaleObj.getScore("value") : "medium";
};