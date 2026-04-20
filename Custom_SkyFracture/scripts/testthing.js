import { world, EquipmentSlot } from "@minecraft/server";

//////////////////////////////////////////////

// Weapon List
const weaponDamages = {
	"minecraft:diamond_sword": 8,
};

// Knockback strength - Default: 0.2
const riptide_kb = 1

//Backwards Hit Range - Default: -1
const backwardsRange = -1

//Backwards Hit Radius - Default: 2
const backwardsRadius = 2

//Backwards Hit Hight - Default: 1
const backwardsHight = 1

//Backwards Hit Sweeping Edge Amount - Default: 1
const backwardsHitAmount = 1

//////////////////////////////////////////////

world.afterEvents.itemUse.subscribe((event) => {
	const { source, itemStack } = event;
	if (!source || !itemStack) return;

	const typeId = itemStack.typeId;
	if (!(typeId in weaponDamages)) return;

	const commands = [
		`execute at @s positioned ^^1^3 run damage @e[r=5,type=arrow] 0 entity_attack entity @s`,
		`execute at @s positioned ^^1^3 run kill @e[r=5,type=snowball]`,
		`execute at @s positioned ^^1^3 run kill @e[r=5,type=egg]`,
		`execute at @s positioned ^^1^3 run damage @e[r=5,type=wind_charge_projectile] 0 entity_attack entity @s`,
		`execute at @s positioned ^^1^3 run kill @e[r=5,type=small_fireball]`,
		`execute at @s positioned ^^1^3 run damage @e[r=5,type=breeze_wind_charge_projectile] 0 entity_attack entity @s`,
		`execute at @s positioned ^^1^3 run kill @e[r=5,type=ender_pearl]`,
		`execute at @s positioned ^^1^3 run kill @e[r=5,type=thrown_trident]`,
		`execute at @s positioned ^^1^3 run kill @e[r=5,type=fireworks_rocket]`,
		`execute at @s positioned ^^1^3 run kill @e[r=5,type=splash_potion]`,
		`execute at @s positioned ^^1^3 run kill @e[r=5,type=lingering_potion]`,
		`execute at @s positioned ^^1^3 run kill @e[r=2,type=area_effect_cloud]`,
		`execute at @s positioned ^^1^3 run damage @e[r=5,type=dragon_fireball] 0 entity_attack entity @s`,
		`execute at @s positioned ^^1^3 run kill @e[r=5,family=projectile]`,
		`execute at @s positioned ^^1^3 run kill @e[r=5,family=inanimate,type=!item,type=!xp_orb,type=!boat,type=!armor_stand,type=!chest_boat,type=!chest_minecart,type=minecart,type=!tnt_minecart,type=!hopper_minecart,type=!command_block_minecart]`,
		`playanimation @s animation.double_sword_spin`
	];

	for (const cmd of commands) {
		try {
			source.runCommand(cmd);
		} catch (err) {

		}
	}
});

world.afterEvents.itemUse.subscribe((event) => {
	const { source, itemStack } = event;
	if (!source || !itemStack) return;

	if (!(itemStack.typeId in weaponDamages)) return;

	const block = source.dimension.getBlock(source.location);
	if (!block) return;

	const blockId = block.typeId;
	if (blockId !== "minecraft:water" && blockId !== "minecraft:lava") return;

	const viewDir = source.getViewDirection();
	const magnitude = Math.hypot(viewDir.x, viewDir.z);
	if (magnitude === 0) return;

	const knockbackX = viewDir.x / magnitude;
	const knockbackZ = viewDir.z / magnitude;

	try {
		source.applyKnockback(knockbackX, knockbackZ, riptide_kb, riptide_kb);
	} catch (e) {

	}
});

world.afterEvents.entityHitEntity.subscribe((event) => {
	const { damagingEntity } = event;
	if (!damagingEntity || damagingEntity.typeId !== "minecraft:player") return;

	const equippable = damagingEntity.getComponent("minecraft:equippable");
	if (!equippable) return;

	const handItem = equippable.getEquipment(EquipmentSlot.Mainhand);
	if (!handItem || !(handItem.typeId in weaponDamages)) return;

	const damage = weaponDamages[handItem.typeId];
	if (typeof damage !== "number") {
		return;
	}

	const cmd = `execute at @s positioned ^^${backwardsHight}^${backwardsRange} run damage @e[r=${backwardsRadius},c=${backwardsHitAmount},tag=!noDamage] ${damage} entity_attack entity @s`;

	try {
		damagingEntity.runCommand(`tag @s add noDamage`);
		damagingEntity.runCommand(cmd);
		damagingEntity.runCommand(`tag @s remove noDamage`);
	} catch (e) {

	}
})