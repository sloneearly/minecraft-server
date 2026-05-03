import { system, world, Player } from "@minecraft/server";

// Player method for climb
Player.prototype.climb = function () {
    const block = this.dimension.getBlock(this.location);
    if (!block?.hasTag("halo:can_climb")) return; // add halo:can_climb tag to ur block, u can change it if u want
    const effect = this.isJumping ? "levitation" : "slow_falling";
    this.addEffect(effect, 5, {
        amplifier: 2,
        showParticles: false,
    });

    if (this.isSneaking && !this.isJumping) {
        this.applyKnockback(0, 0, 0, 0.02);
    }
};

system.runInterval(() => {
    for (const player of world.getPlayers()) {
        player.climb(); // Calling the method
    }
});