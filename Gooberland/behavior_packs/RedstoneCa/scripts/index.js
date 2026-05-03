var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var _a;
import { world, TicksPerSecond, system, EntityInventoryComponent, EntityEquippableComponent, GameMode, GameRule, EquipmentSlot, EntityComponentTypes, ItemStack, EntityMarkVariantComponent, Entity, Player, BlockVolume, EntityDamageCause, MolangVariableMap, ItemLockMode } from "@minecraft/server";
import { ActionFormData, ModalFormData, MessageFormData } from "@minecraft/server-ui";
const PROJECT_VERSION = "1.0.0";
const DEBUG_MODE_ENABLED = false;
const DEBUG_VERBOSE = false;
const PROJECT_NAMESPACE = "wan_redcave";
/* @__PURE__ */ new Set([]);
const sendInfoLog = (message, value = {}, verbose = false) => {
  try {
    if (!DEBUG_MODE_ENABLED) return;
    if (!DEBUG_VERBOSE && verbose) return;
    world.sendMessage(`**INFO** ${message}. ${JSON.stringify(value)}`);
  } catch (error) {
  }
};
const randomChance = (chance) => {
  if (typeof chance === "number") {
    if (chance === 1) return true;
    return Math.random() < chance;
  }
  const [min, max] = chance;
  return Math.random() < Math.random() * (max - min) + min;
};
const secondsToTicks = (seconds) => {
  return Math.round(TicksPerSecond * seconds);
};
var MinecraftBiomeTypes = ((MinecraftBiomeTypes2) => {
  MinecraftBiomeTypes2["BambooJungle"] = "minecraft:bamboo_jungle";
  MinecraftBiomeTypes2["BambooJungleHills"] = "minecraft:bamboo_jungle_hills";
  MinecraftBiomeTypes2["BasaltDeltas"] = "minecraft:basalt_deltas";
  MinecraftBiomeTypes2["Beach"] = "minecraft:beach";
  MinecraftBiomeTypes2["BirchForest"] = "minecraft:birch_forest";
  MinecraftBiomeTypes2["BirchForestHills"] = "minecraft:birch_forest_hills";
  MinecraftBiomeTypes2["BirchForestHillsMutated"] = "minecraft:birch_forest_hills_mutated";
  MinecraftBiomeTypes2["BirchForestMutated"] = "minecraft:birch_forest_mutated";
  MinecraftBiomeTypes2["CherryGrove"] = "minecraft:cherry_grove";
  MinecraftBiomeTypes2["ColdBeach"] = "minecraft:cold_beach";
  MinecraftBiomeTypes2["ColdOcean"] = "minecraft:cold_ocean";
  MinecraftBiomeTypes2["ColdTaiga"] = "minecraft:cold_taiga";
  MinecraftBiomeTypes2["ColdTaigaHills"] = "minecraft:cold_taiga_hills";
  MinecraftBiomeTypes2["ColdTaigaMutated"] = "minecraft:cold_taiga_mutated";
  MinecraftBiomeTypes2["CrimsonForest"] = "minecraft:crimson_forest";
  MinecraftBiomeTypes2["DeepColdOcean"] = "minecraft:deep_cold_ocean";
  MinecraftBiomeTypes2["DeepDark"] = "minecraft:deep_dark";
  MinecraftBiomeTypes2["DeepFrozenOcean"] = "minecraft:deep_frozen_ocean";
  MinecraftBiomeTypes2["DeepLukewarmOcean"] = "minecraft:deep_lukewarm_ocean";
  MinecraftBiomeTypes2["DeepOcean"] = "minecraft:deep_ocean";
  MinecraftBiomeTypes2["DeepWarmOcean"] = "minecraft:deep_warm_ocean";
  MinecraftBiomeTypes2["Desert"] = "minecraft:desert";
  MinecraftBiomeTypes2["DesertHills"] = "minecraft:desert_hills";
  MinecraftBiomeTypes2["DesertMutated"] = "minecraft:desert_mutated";
  MinecraftBiomeTypes2["DripstoneCaves"] = "minecraft:dripstone_caves";
  MinecraftBiomeTypes2["ExtremeHills"] = "minecraft:extreme_hills";
  MinecraftBiomeTypes2["ExtremeHillsEdge"] = "minecraft:extreme_hills_edge";
  MinecraftBiomeTypes2["ExtremeHillsMutated"] = "minecraft:extreme_hills_mutated";
  MinecraftBiomeTypes2["ExtremeHillsPlusTrees"] = "minecraft:extreme_hills_plus_trees";
  MinecraftBiomeTypes2["ExtremeHillsPlusTreesMutated"] = "minecraft:extreme_hills_plus_trees_mutated";
  MinecraftBiomeTypes2["FlowerForest"] = "minecraft:flower_forest";
  MinecraftBiomeTypes2["Forest"] = "minecraft:forest";
  MinecraftBiomeTypes2["ForestHills"] = "minecraft:forest_hills";
  MinecraftBiomeTypes2["FrozenOcean"] = "minecraft:frozen_ocean";
  MinecraftBiomeTypes2["FrozenPeaks"] = "minecraft:frozen_peaks";
  MinecraftBiomeTypes2["FrozenRiver"] = "minecraft:frozen_river";
  MinecraftBiomeTypes2["Grove"] = "minecraft:grove";
  MinecraftBiomeTypes2["Hell"] = "minecraft:hell";
  MinecraftBiomeTypes2["IceMountains"] = "minecraft:ice_mountains";
  MinecraftBiomeTypes2["IcePlains"] = "minecraft:ice_plains";
  MinecraftBiomeTypes2["IcePlainsSpikes"] = "minecraft:ice_plains_spikes";
  MinecraftBiomeTypes2["JaggedPeaks"] = "minecraft:jagged_peaks";
  MinecraftBiomeTypes2["Jungle"] = "minecraft:jungle";
  MinecraftBiomeTypes2["JungleEdge"] = "minecraft:jungle_edge";
  MinecraftBiomeTypes2["JungleEdgeMutated"] = "minecraft:jungle_edge_mutated";
  MinecraftBiomeTypes2["JungleHills"] = "minecraft:jungle_hills";
  MinecraftBiomeTypes2["JungleMutated"] = "minecraft:jungle_mutated";
  MinecraftBiomeTypes2["LegacyFrozenOcean"] = "minecraft:legacy_frozen_ocean";
  MinecraftBiomeTypes2["LukewarmOcean"] = "minecraft:lukewarm_ocean";
  MinecraftBiomeTypes2["LushCaves"] = "minecraft:lush_caves";
  MinecraftBiomeTypes2["MangroveSwamp"] = "minecraft:mangrove_swamp";
  MinecraftBiomeTypes2["Meadow"] = "minecraft:meadow";
  MinecraftBiomeTypes2["MegaTaiga"] = "minecraft:mega_taiga";
  MinecraftBiomeTypes2["MegaTaigaHills"] = "minecraft:mega_taiga_hills";
  MinecraftBiomeTypes2["Mesa"] = "minecraft:mesa";
  MinecraftBiomeTypes2["MesaBryce"] = "minecraft:mesa_bryce";
  MinecraftBiomeTypes2["MesaPlateau"] = "minecraft:mesa_plateau";
  MinecraftBiomeTypes2["MesaPlateauMutated"] = "minecraft:mesa_plateau_mutated";
  MinecraftBiomeTypes2["MesaPlateauStone"] = "minecraft:mesa_plateau_stone";
  MinecraftBiomeTypes2["MesaPlateauStoneMutated"] = "minecraft:mesa_plateau_stone_mutated";
  MinecraftBiomeTypes2["MushroomIsland"] = "minecraft:mushroom_island";
  MinecraftBiomeTypes2["MushroomIslandShore"] = "minecraft:mushroom_island_shore";
  MinecraftBiomeTypes2["Ocean"] = "minecraft:ocean";
  MinecraftBiomeTypes2["PaleGarden"] = "minecraft:pale_garden";
  MinecraftBiomeTypes2["Plains"] = "minecraft:plains";
  MinecraftBiomeTypes2["RedwoodTaigaHillsMutated"] = "minecraft:redwood_taiga_hills_mutated";
  MinecraftBiomeTypes2["RedwoodTaigaMutated"] = "minecraft:redwood_taiga_mutated";
  MinecraftBiomeTypes2["River"] = "minecraft:river";
  MinecraftBiomeTypes2["RoofedForest"] = "minecraft:roofed_forest";
  MinecraftBiomeTypes2["RoofedForestMutated"] = "minecraft:roofed_forest_mutated";
  MinecraftBiomeTypes2["Savanna"] = "minecraft:savanna";
  MinecraftBiomeTypes2["SavannaMutated"] = "minecraft:savanna_mutated";
  MinecraftBiomeTypes2["SavannaPlateau"] = "minecraft:savanna_plateau";
  MinecraftBiomeTypes2["SavannaPlateauMutated"] = "minecraft:savanna_plateau_mutated";
  MinecraftBiomeTypes2["SnowySlopes"] = "minecraft:snowy_slopes";
  MinecraftBiomeTypes2["SoulsandValley"] = "minecraft:soulsand_valley";
  MinecraftBiomeTypes2["StoneBeach"] = "minecraft:stone_beach";
  MinecraftBiomeTypes2["StonyPeaks"] = "minecraft:stony_peaks";
  MinecraftBiomeTypes2["SunflowerPlains"] = "minecraft:sunflower_plains";
  MinecraftBiomeTypes2["Swampland"] = "minecraft:swampland";
  MinecraftBiomeTypes2["SwamplandMutated"] = "minecraft:swampland_mutated";
  MinecraftBiomeTypes2["Taiga"] = "minecraft:taiga";
  MinecraftBiomeTypes2["TaigaHills"] = "minecraft:taiga_hills";
  MinecraftBiomeTypes2["TaigaMutated"] = "minecraft:taiga_mutated";
  MinecraftBiomeTypes2["TheEnd"] = "minecraft:the_end";
  MinecraftBiomeTypes2["WarmOcean"] = "minecraft:warm_ocean";
  MinecraftBiomeTypes2["WarpedForest"] = "minecraft:warped_forest";
  return MinecraftBiomeTypes2;
})(MinecraftBiomeTypes || {});
var MinecraftBlockTypes = ((MinecraftBlockTypes2) => {
  MinecraftBlockTypes2["AcaciaButton"] = "minecraft:acacia_button";
  MinecraftBlockTypes2["AcaciaDoor"] = "minecraft:acacia_door";
  MinecraftBlockTypes2["AcaciaDoubleSlab"] = "minecraft:acacia_double_slab";
  MinecraftBlockTypes2["AcaciaFence"] = "minecraft:acacia_fence";
  MinecraftBlockTypes2["AcaciaFenceGate"] = "minecraft:acacia_fence_gate";
  MinecraftBlockTypes2["AcaciaHangingSign"] = "minecraft:acacia_hanging_sign";
  MinecraftBlockTypes2["AcaciaLeaves"] = "minecraft:acacia_leaves";
  MinecraftBlockTypes2["AcaciaLog"] = "minecraft:acacia_log";
  MinecraftBlockTypes2["AcaciaPlanks"] = "minecraft:acacia_planks";
  MinecraftBlockTypes2["AcaciaPressurePlate"] = "minecraft:acacia_pressure_plate";
  MinecraftBlockTypes2["AcaciaSapling"] = "minecraft:acacia_sapling";
  MinecraftBlockTypes2["AcaciaShelf"] = "minecraft:acacia_shelf";
  MinecraftBlockTypes2["AcaciaSlab"] = "minecraft:acacia_slab";
  MinecraftBlockTypes2["AcaciaStairs"] = "minecraft:acacia_stairs";
  MinecraftBlockTypes2["AcaciaStandingSign"] = "minecraft:acacia_standing_sign";
  MinecraftBlockTypes2["AcaciaTrapdoor"] = "minecraft:acacia_trapdoor";
  MinecraftBlockTypes2["AcaciaWallSign"] = "minecraft:acacia_wall_sign";
  MinecraftBlockTypes2["AcaciaWood"] = "minecraft:acacia_wood";
  MinecraftBlockTypes2["ActivatorRail"] = "minecraft:activator_rail";
  MinecraftBlockTypes2["Air"] = "minecraft:air";
  MinecraftBlockTypes2["Allium"] = "minecraft:allium";
  MinecraftBlockTypes2["Allow"] = "minecraft:allow";
  MinecraftBlockTypes2["AmethystBlock"] = "minecraft:amethyst_block";
  MinecraftBlockTypes2["AmethystCluster"] = "minecraft:amethyst_cluster";
  MinecraftBlockTypes2["AncientDebris"] = "minecraft:ancient_debris";
  MinecraftBlockTypes2["Andesite"] = "minecraft:andesite";
  MinecraftBlockTypes2["AndesiteDoubleSlab"] = "minecraft:andesite_double_slab";
  MinecraftBlockTypes2["AndesiteSlab"] = "minecraft:andesite_slab";
  MinecraftBlockTypes2["AndesiteStairs"] = "minecraft:andesite_stairs";
  MinecraftBlockTypes2["AndesiteWall"] = "minecraft:andesite_wall";
  MinecraftBlockTypes2["Anvil"] = "minecraft:anvil";
  MinecraftBlockTypes2["Azalea"] = "minecraft:azalea";
  MinecraftBlockTypes2["AzaleaLeaves"] = "minecraft:azalea_leaves";
  MinecraftBlockTypes2["AzaleaLeavesFlowered"] = "minecraft:azalea_leaves_flowered";
  MinecraftBlockTypes2["AzureBluet"] = "minecraft:azure_bluet";
  MinecraftBlockTypes2["Bamboo"] = "minecraft:bamboo";
  MinecraftBlockTypes2["BambooBlock"] = "minecraft:bamboo_block";
  MinecraftBlockTypes2["BambooButton"] = "minecraft:bamboo_button";
  MinecraftBlockTypes2["BambooDoor"] = "minecraft:bamboo_door";
  MinecraftBlockTypes2["BambooDoubleSlab"] = "minecraft:bamboo_double_slab";
  MinecraftBlockTypes2["BambooFence"] = "minecraft:bamboo_fence";
  MinecraftBlockTypes2["BambooFenceGate"] = "minecraft:bamboo_fence_gate";
  MinecraftBlockTypes2["BambooHangingSign"] = "minecraft:bamboo_hanging_sign";
  MinecraftBlockTypes2["BambooMosaic"] = "minecraft:bamboo_mosaic";
  MinecraftBlockTypes2["BambooMosaicDoubleSlab"] = "minecraft:bamboo_mosaic_double_slab";
  MinecraftBlockTypes2["BambooMosaicSlab"] = "minecraft:bamboo_mosaic_slab";
  MinecraftBlockTypes2["BambooMosaicStairs"] = "minecraft:bamboo_mosaic_stairs";
  MinecraftBlockTypes2["BambooPlanks"] = "minecraft:bamboo_planks";
  MinecraftBlockTypes2["BambooPressurePlate"] = "minecraft:bamboo_pressure_plate";
  MinecraftBlockTypes2["BambooSapling"] = "minecraft:bamboo_sapling";
  MinecraftBlockTypes2["BambooShelf"] = "minecraft:bamboo_shelf";
  MinecraftBlockTypes2["BambooSlab"] = "minecraft:bamboo_slab";
  MinecraftBlockTypes2["BambooStairs"] = "minecraft:bamboo_stairs";
  MinecraftBlockTypes2["BambooStandingSign"] = "minecraft:bamboo_standing_sign";
  MinecraftBlockTypes2["BambooTrapdoor"] = "minecraft:bamboo_trapdoor";
  MinecraftBlockTypes2["BambooWallSign"] = "minecraft:bamboo_wall_sign";
  MinecraftBlockTypes2["Barrel"] = "minecraft:barrel";
  MinecraftBlockTypes2["Barrier"] = "minecraft:barrier";
  MinecraftBlockTypes2["Basalt"] = "minecraft:basalt";
  MinecraftBlockTypes2["Beacon"] = "minecraft:beacon";
  MinecraftBlockTypes2["Bed"] = "minecraft:bed";
  MinecraftBlockTypes2["Bedrock"] = "minecraft:bedrock";
  MinecraftBlockTypes2["BeeNest"] = "minecraft:bee_nest";
  MinecraftBlockTypes2["Beehive"] = "minecraft:beehive";
  MinecraftBlockTypes2["Beetroot"] = "minecraft:beetroot";
  MinecraftBlockTypes2["Bell"] = "minecraft:bell";
  MinecraftBlockTypes2["BigDripleaf"] = "minecraft:big_dripleaf";
  MinecraftBlockTypes2["BirchButton"] = "minecraft:birch_button";
  MinecraftBlockTypes2["BirchDoor"] = "minecraft:birch_door";
  MinecraftBlockTypes2["BirchDoubleSlab"] = "minecraft:birch_double_slab";
  MinecraftBlockTypes2["BirchFence"] = "minecraft:birch_fence";
  MinecraftBlockTypes2["BirchFenceGate"] = "minecraft:birch_fence_gate";
  MinecraftBlockTypes2["BirchHangingSign"] = "minecraft:birch_hanging_sign";
  MinecraftBlockTypes2["BirchLeaves"] = "minecraft:birch_leaves";
  MinecraftBlockTypes2["BirchLog"] = "minecraft:birch_log";
  MinecraftBlockTypes2["BirchPlanks"] = "minecraft:birch_planks";
  MinecraftBlockTypes2["BirchPressurePlate"] = "minecraft:birch_pressure_plate";
  MinecraftBlockTypes2["BirchSapling"] = "minecraft:birch_sapling";
  MinecraftBlockTypes2["BirchShelf"] = "minecraft:birch_shelf";
  MinecraftBlockTypes2["BirchSlab"] = "minecraft:birch_slab";
  MinecraftBlockTypes2["BirchStairs"] = "minecraft:birch_stairs";
  MinecraftBlockTypes2["BirchStandingSign"] = "minecraft:birch_standing_sign";
  MinecraftBlockTypes2["BirchTrapdoor"] = "minecraft:birch_trapdoor";
  MinecraftBlockTypes2["BirchWallSign"] = "minecraft:birch_wall_sign";
  MinecraftBlockTypes2["BirchWood"] = "minecraft:birch_wood";
  MinecraftBlockTypes2["BlackCandle"] = "minecraft:black_candle";
  MinecraftBlockTypes2["BlackCandleCake"] = "minecraft:black_candle_cake";
  MinecraftBlockTypes2["BlackCarpet"] = "minecraft:black_carpet";
  MinecraftBlockTypes2["BlackConcrete"] = "minecraft:black_concrete";
  MinecraftBlockTypes2["BlackConcretePowder"] = "minecraft:black_concrete_powder";
  MinecraftBlockTypes2["BlackGlazedTerracotta"] = "minecraft:black_glazed_terracotta";
  MinecraftBlockTypes2["BlackShulkerBox"] = "minecraft:black_shulker_box";
  MinecraftBlockTypes2["BlackStainedGlass"] = "minecraft:black_stained_glass";
  MinecraftBlockTypes2["BlackStainedGlassPane"] = "minecraft:black_stained_glass_pane";
  MinecraftBlockTypes2["BlackTerracotta"] = "minecraft:black_terracotta";
  MinecraftBlockTypes2["BlackWool"] = "minecraft:black_wool";
  MinecraftBlockTypes2["Blackstone"] = "minecraft:blackstone";
  MinecraftBlockTypes2["BlackstoneDoubleSlab"] = "minecraft:blackstone_double_slab";
  MinecraftBlockTypes2["BlackstoneSlab"] = "minecraft:blackstone_slab";
  MinecraftBlockTypes2["BlackstoneStairs"] = "minecraft:blackstone_stairs";
  MinecraftBlockTypes2["BlackstoneWall"] = "minecraft:blackstone_wall";
  MinecraftBlockTypes2["BlastFurnace"] = "minecraft:blast_furnace";
  MinecraftBlockTypes2["BlueCandle"] = "minecraft:blue_candle";
  MinecraftBlockTypes2["BlueCandleCake"] = "minecraft:blue_candle_cake";
  MinecraftBlockTypes2["BlueCarpet"] = "minecraft:blue_carpet";
  MinecraftBlockTypes2["BlueConcrete"] = "minecraft:blue_concrete";
  MinecraftBlockTypes2["BlueConcretePowder"] = "minecraft:blue_concrete_powder";
  MinecraftBlockTypes2["BlueGlazedTerracotta"] = "minecraft:blue_glazed_terracotta";
  MinecraftBlockTypes2["BlueIce"] = "minecraft:blue_ice";
  MinecraftBlockTypes2["BlueOrchid"] = "minecraft:blue_orchid";
  MinecraftBlockTypes2["BlueShulkerBox"] = "minecraft:blue_shulker_box";
  MinecraftBlockTypes2["BlueStainedGlass"] = "minecraft:blue_stained_glass";
  MinecraftBlockTypes2["BlueStainedGlassPane"] = "minecraft:blue_stained_glass_pane";
  MinecraftBlockTypes2["BlueTerracotta"] = "minecraft:blue_terracotta";
  MinecraftBlockTypes2["BlueWool"] = "minecraft:blue_wool";
  MinecraftBlockTypes2["BoneBlock"] = "minecraft:bone_block";
  MinecraftBlockTypes2["Bookshelf"] = "minecraft:bookshelf";
  MinecraftBlockTypes2["BorderBlock"] = "minecraft:border_block";
  MinecraftBlockTypes2["BrainCoral"] = "minecraft:brain_coral";
  MinecraftBlockTypes2["BrainCoralBlock"] = "minecraft:brain_coral_block";
  MinecraftBlockTypes2["BrainCoralFan"] = "minecraft:brain_coral_fan";
  MinecraftBlockTypes2["BrainCoralWallFan"] = "minecraft:brain_coral_wall_fan";
  MinecraftBlockTypes2["BrewingStand"] = "minecraft:brewing_stand";
  MinecraftBlockTypes2["BrickBlock"] = "minecraft:brick_block";
  MinecraftBlockTypes2["BrickDoubleSlab"] = "minecraft:brick_double_slab";
  MinecraftBlockTypes2["BrickSlab"] = "minecraft:brick_slab";
  MinecraftBlockTypes2["BrickStairs"] = "minecraft:brick_stairs";
  MinecraftBlockTypes2["BrickWall"] = "minecraft:brick_wall";
  MinecraftBlockTypes2["BrownCandle"] = "minecraft:brown_candle";
  MinecraftBlockTypes2["BrownCandleCake"] = "minecraft:brown_candle_cake";
  MinecraftBlockTypes2["BrownCarpet"] = "minecraft:brown_carpet";
  MinecraftBlockTypes2["BrownConcrete"] = "minecraft:brown_concrete";
  MinecraftBlockTypes2["BrownConcretePowder"] = "minecraft:brown_concrete_powder";
  MinecraftBlockTypes2["BrownGlazedTerracotta"] = "minecraft:brown_glazed_terracotta";
  MinecraftBlockTypes2["BrownMushroom"] = "minecraft:brown_mushroom";
  MinecraftBlockTypes2["BrownMushroomBlock"] = "minecraft:brown_mushroom_block";
  MinecraftBlockTypes2["BrownShulkerBox"] = "minecraft:brown_shulker_box";
  MinecraftBlockTypes2["BrownStainedGlass"] = "minecraft:brown_stained_glass";
  MinecraftBlockTypes2["BrownStainedGlassPane"] = "minecraft:brown_stained_glass_pane";
  MinecraftBlockTypes2["BrownTerracotta"] = "minecraft:brown_terracotta";
  MinecraftBlockTypes2["BrownWool"] = "minecraft:brown_wool";
  MinecraftBlockTypes2["BubbleColumn"] = "minecraft:bubble_column";
  MinecraftBlockTypes2["BubbleCoral"] = "minecraft:bubble_coral";
  MinecraftBlockTypes2["BubbleCoralBlock"] = "minecraft:bubble_coral_block";
  MinecraftBlockTypes2["BubbleCoralFan"] = "minecraft:bubble_coral_fan";
  MinecraftBlockTypes2["BubbleCoralWallFan"] = "minecraft:bubble_coral_wall_fan";
  MinecraftBlockTypes2["BuddingAmethyst"] = "minecraft:budding_amethyst";
  MinecraftBlockTypes2["Bush"] = "minecraft:bush";
  MinecraftBlockTypes2["Cactus"] = "minecraft:cactus";
  MinecraftBlockTypes2["CactusFlower"] = "minecraft:cactus_flower";
  MinecraftBlockTypes2["Cake"] = "minecraft:cake";
  MinecraftBlockTypes2["Calcite"] = "minecraft:calcite";
  MinecraftBlockTypes2["CalibratedSculkSensor"] = "minecraft:calibrated_sculk_sensor";
  MinecraftBlockTypes2["Camera"] = "minecraft:camera";
  MinecraftBlockTypes2["Campfire"] = "minecraft:campfire";
  MinecraftBlockTypes2["Candle"] = "minecraft:candle";
  MinecraftBlockTypes2["CandleCake"] = "minecraft:candle_cake";
  MinecraftBlockTypes2["Carrots"] = "minecraft:carrots";
  MinecraftBlockTypes2["CartographyTable"] = "minecraft:cartography_table";
  MinecraftBlockTypes2["CarvedPumpkin"] = "minecraft:carved_pumpkin";
  MinecraftBlockTypes2["Cauldron"] = "minecraft:cauldron";
  MinecraftBlockTypes2["CaveVines"] = "minecraft:cave_vines";
  MinecraftBlockTypes2["CaveVinesBodyWithBerries"] = "minecraft:cave_vines_body_with_berries";
  MinecraftBlockTypes2["CaveVinesHeadWithBerries"] = "minecraft:cave_vines_head_with_berries";
  MinecraftBlockTypes2["ChainCommandBlock"] = "minecraft:chain_command_block";
  MinecraftBlockTypes2["ChemicalHeat"] = "minecraft:chemical_heat";
  MinecraftBlockTypes2["CherryButton"] = "minecraft:cherry_button";
  MinecraftBlockTypes2["CherryDoor"] = "minecraft:cherry_door";
  MinecraftBlockTypes2["CherryDoubleSlab"] = "minecraft:cherry_double_slab";
  MinecraftBlockTypes2["CherryFence"] = "minecraft:cherry_fence";
  MinecraftBlockTypes2["CherryFenceGate"] = "minecraft:cherry_fence_gate";
  MinecraftBlockTypes2["CherryHangingSign"] = "minecraft:cherry_hanging_sign";
  MinecraftBlockTypes2["CherryLeaves"] = "minecraft:cherry_leaves";
  MinecraftBlockTypes2["CherryLog"] = "minecraft:cherry_log";
  MinecraftBlockTypes2["CherryPlanks"] = "minecraft:cherry_planks";
  MinecraftBlockTypes2["CherryPressurePlate"] = "minecraft:cherry_pressure_plate";
  MinecraftBlockTypes2["CherrySapling"] = "minecraft:cherry_sapling";
  MinecraftBlockTypes2["CherryShelf"] = "minecraft:cherry_shelf";
  MinecraftBlockTypes2["CherrySlab"] = "minecraft:cherry_slab";
  MinecraftBlockTypes2["CherryStairs"] = "minecraft:cherry_stairs";
  MinecraftBlockTypes2["CherryStandingSign"] = "minecraft:cherry_standing_sign";
  MinecraftBlockTypes2["CherryTrapdoor"] = "minecraft:cherry_trapdoor";
  MinecraftBlockTypes2["CherryWallSign"] = "minecraft:cherry_wall_sign";
  MinecraftBlockTypes2["CherryWood"] = "minecraft:cherry_wood";
  MinecraftBlockTypes2["Chest"] = "minecraft:chest";
  MinecraftBlockTypes2["ChippedAnvil"] = "minecraft:chipped_anvil";
  MinecraftBlockTypes2["ChiseledBookshelf"] = "minecraft:chiseled_bookshelf";
  MinecraftBlockTypes2["ChiseledCopper"] = "minecraft:chiseled_copper";
  MinecraftBlockTypes2["ChiseledDeepslate"] = "minecraft:chiseled_deepslate";
  MinecraftBlockTypes2["ChiseledNetherBricks"] = "minecraft:chiseled_nether_bricks";
  MinecraftBlockTypes2["ChiseledPolishedBlackstone"] = "minecraft:chiseled_polished_blackstone";
  MinecraftBlockTypes2["ChiseledQuartzBlock"] = "minecraft:chiseled_quartz_block";
  MinecraftBlockTypes2["ChiseledRedSandstone"] = "minecraft:chiseled_red_sandstone";
  MinecraftBlockTypes2["ChiseledResinBricks"] = "minecraft:chiseled_resin_bricks";
  MinecraftBlockTypes2["ChiseledSandstone"] = "minecraft:chiseled_sandstone";
  MinecraftBlockTypes2["ChiseledStoneBricks"] = "minecraft:chiseled_stone_bricks";
  MinecraftBlockTypes2["ChiseledTuff"] = "minecraft:chiseled_tuff";
  MinecraftBlockTypes2["ChiseledTuffBricks"] = "minecraft:chiseled_tuff_bricks";
  MinecraftBlockTypes2["ChorusFlower"] = "minecraft:chorus_flower";
  MinecraftBlockTypes2["ChorusPlant"] = "minecraft:chorus_plant";
  MinecraftBlockTypes2["Clay"] = "minecraft:clay";
  MinecraftBlockTypes2["ClosedEyeblossom"] = "minecraft:closed_eyeblossom";
  MinecraftBlockTypes2["CoalBlock"] = "minecraft:coal_block";
  MinecraftBlockTypes2["CoalOre"] = "minecraft:coal_ore";
  MinecraftBlockTypes2["CoarseDirt"] = "minecraft:coarse_dirt";
  MinecraftBlockTypes2["CobbledDeepslate"] = "minecraft:cobbled_deepslate";
  MinecraftBlockTypes2["CobbledDeepslateDoubleSlab"] = "minecraft:cobbled_deepslate_double_slab";
  MinecraftBlockTypes2["CobbledDeepslateSlab"] = "minecraft:cobbled_deepslate_slab";
  MinecraftBlockTypes2["CobbledDeepslateStairs"] = "minecraft:cobbled_deepslate_stairs";
  MinecraftBlockTypes2["CobbledDeepslateWall"] = "minecraft:cobbled_deepslate_wall";
  MinecraftBlockTypes2["Cobblestone"] = "minecraft:cobblestone";
  MinecraftBlockTypes2["CobblestoneDoubleSlab"] = "minecraft:cobblestone_double_slab";
  MinecraftBlockTypes2["CobblestoneSlab"] = "minecraft:cobblestone_slab";
  MinecraftBlockTypes2["CobblestoneWall"] = "minecraft:cobblestone_wall";
  MinecraftBlockTypes2["Cocoa"] = "minecraft:cocoa";
  MinecraftBlockTypes2["ColoredTorchBlue"] = "minecraft:colored_torch_blue";
  MinecraftBlockTypes2["ColoredTorchGreen"] = "minecraft:colored_torch_green";
  MinecraftBlockTypes2["ColoredTorchPurple"] = "minecraft:colored_torch_purple";
  MinecraftBlockTypes2["ColoredTorchRed"] = "minecraft:colored_torch_red";
  MinecraftBlockTypes2["CommandBlock"] = "minecraft:command_block";
  MinecraftBlockTypes2["Composter"] = "minecraft:composter";
  MinecraftBlockTypes2["CompoundCreator"] = "minecraft:compound_creator";
  MinecraftBlockTypes2["Conduit"] = "minecraft:conduit";
  MinecraftBlockTypes2["CopperBars"] = "minecraft:copper_bars";
  MinecraftBlockTypes2["CopperBlock"] = "minecraft:copper_block";
  MinecraftBlockTypes2["CopperBulb"] = "minecraft:copper_bulb";
  MinecraftBlockTypes2["CopperChain"] = "minecraft:copper_chain";
  MinecraftBlockTypes2["CopperChest"] = "minecraft:copper_chest";
  MinecraftBlockTypes2["CopperDoor"] = "minecraft:copper_door";
  MinecraftBlockTypes2["CopperGolemStatue"] = "minecraft:copper_golem_statue";
  MinecraftBlockTypes2["CopperGrate"] = "minecraft:copper_grate";
  MinecraftBlockTypes2["CopperLantern"] = "minecraft:copper_lantern";
  MinecraftBlockTypes2["CopperOre"] = "minecraft:copper_ore";
  MinecraftBlockTypes2["CopperTorch"] = "minecraft:copper_torch";
  MinecraftBlockTypes2["CopperTrapdoor"] = "minecraft:copper_trapdoor";
  MinecraftBlockTypes2["Cornflower"] = "minecraft:cornflower";
  MinecraftBlockTypes2["CrackedDeepslateBricks"] = "minecraft:cracked_deepslate_bricks";
  MinecraftBlockTypes2["CrackedDeepslateTiles"] = "minecraft:cracked_deepslate_tiles";
  MinecraftBlockTypes2["CrackedNetherBricks"] = "minecraft:cracked_nether_bricks";
  MinecraftBlockTypes2["CrackedPolishedBlackstoneBricks"] = "minecraft:cracked_polished_blackstone_bricks";
  MinecraftBlockTypes2["CrackedStoneBricks"] = "minecraft:cracked_stone_bricks";
  MinecraftBlockTypes2["Crafter"] = "minecraft:crafter";
  MinecraftBlockTypes2["CraftingTable"] = "minecraft:crafting_table";
  MinecraftBlockTypes2["CreakingHeart"] = "minecraft:creaking_heart";
  MinecraftBlockTypes2["CreeperHead"] = "minecraft:creeper_head";
  MinecraftBlockTypes2["CrimsonButton"] = "minecraft:crimson_button";
  MinecraftBlockTypes2["CrimsonDoor"] = "minecraft:crimson_door";
  MinecraftBlockTypes2["CrimsonDoubleSlab"] = "minecraft:crimson_double_slab";
  MinecraftBlockTypes2["CrimsonFence"] = "minecraft:crimson_fence";
  MinecraftBlockTypes2["CrimsonFenceGate"] = "minecraft:crimson_fence_gate";
  MinecraftBlockTypes2["CrimsonFungus"] = "minecraft:crimson_fungus";
  MinecraftBlockTypes2["CrimsonHangingSign"] = "minecraft:crimson_hanging_sign";
  MinecraftBlockTypes2["CrimsonHyphae"] = "minecraft:crimson_hyphae";
  MinecraftBlockTypes2["CrimsonNylium"] = "minecraft:crimson_nylium";
  MinecraftBlockTypes2["CrimsonPlanks"] = "minecraft:crimson_planks";
  MinecraftBlockTypes2["CrimsonPressurePlate"] = "minecraft:crimson_pressure_plate";
  MinecraftBlockTypes2["CrimsonRoots"] = "minecraft:crimson_roots";
  MinecraftBlockTypes2["CrimsonShelf"] = "minecraft:crimson_shelf";
  MinecraftBlockTypes2["CrimsonSlab"] = "minecraft:crimson_slab";
  MinecraftBlockTypes2["CrimsonStairs"] = "minecraft:crimson_stairs";
  MinecraftBlockTypes2["CrimsonStandingSign"] = "minecraft:crimson_standing_sign";
  MinecraftBlockTypes2["CrimsonStem"] = "minecraft:crimson_stem";
  MinecraftBlockTypes2["CrimsonTrapdoor"] = "minecraft:crimson_trapdoor";
  MinecraftBlockTypes2["CrimsonWallSign"] = "minecraft:crimson_wall_sign";
  MinecraftBlockTypes2["CryingObsidian"] = "minecraft:crying_obsidian";
  MinecraftBlockTypes2["CutCopper"] = "minecraft:cut_copper";
  MinecraftBlockTypes2["CutCopperSlab"] = "minecraft:cut_copper_slab";
  MinecraftBlockTypes2["CutCopperStairs"] = "minecraft:cut_copper_stairs";
  MinecraftBlockTypes2["CutRedSandstone"] = "minecraft:cut_red_sandstone";
  MinecraftBlockTypes2["CutRedSandstoneDoubleSlab"] = "minecraft:cut_red_sandstone_double_slab";
  MinecraftBlockTypes2["CutRedSandstoneSlab"] = "minecraft:cut_red_sandstone_slab";
  MinecraftBlockTypes2["CutSandstone"] = "minecraft:cut_sandstone";
  MinecraftBlockTypes2["CutSandstoneDoubleSlab"] = "minecraft:cut_sandstone_double_slab";
  MinecraftBlockTypes2["CutSandstoneSlab"] = "minecraft:cut_sandstone_slab";
  MinecraftBlockTypes2["CyanCandle"] = "minecraft:cyan_candle";
  MinecraftBlockTypes2["CyanCandleCake"] = "minecraft:cyan_candle_cake";
  MinecraftBlockTypes2["CyanCarpet"] = "minecraft:cyan_carpet";
  MinecraftBlockTypes2["CyanConcrete"] = "minecraft:cyan_concrete";
  MinecraftBlockTypes2["CyanConcretePowder"] = "minecraft:cyan_concrete_powder";
  MinecraftBlockTypes2["CyanGlazedTerracotta"] = "minecraft:cyan_glazed_terracotta";
  MinecraftBlockTypes2["CyanShulkerBox"] = "minecraft:cyan_shulker_box";
  MinecraftBlockTypes2["CyanStainedGlass"] = "minecraft:cyan_stained_glass";
  MinecraftBlockTypes2["CyanStainedGlassPane"] = "minecraft:cyan_stained_glass_pane";
  MinecraftBlockTypes2["CyanTerracotta"] = "minecraft:cyan_terracotta";
  MinecraftBlockTypes2["CyanWool"] = "minecraft:cyan_wool";
  MinecraftBlockTypes2["DamagedAnvil"] = "minecraft:damaged_anvil";
  MinecraftBlockTypes2["Dandelion"] = "minecraft:dandelion";
  MinecraftBlockTypes2["DarkOakButton"] = "minecraft:dark_oak_button";
  MinecraftBlockTypes2["DarkOakDoor"] = "minecraft:dark_oak_door";
  MinecraftBlockTypes2["DarkOakDoubleSlab"] = "minecraft:dark_oak_double_slab";
  MinecraftBlockTypes2["DarkOakFence"] = "minecraft:dark_oak_fence";
  MinecraftBlockTypes2["DarkOakFenceGate"] = "minecraft:dark_oak_fence_gate";
  MinecraftBlockTypes2["DarkOakHangingSign"] = "minecraft:dark_oak_hanging_sign";
  MinecraftBlockTypes2["DarkOakLeaves"] = "minecraft:dark_oak_leaves";
  MinecraftBlockTypes2["DarkOakLog"] = "minecraft:dark_oak_log";
  MinecraftBlockTypes2["DarkOakPlanks"] = "minecraft:dark_oak_planks";
  MinecraftBlockTypes2["DarkOakPressurePlate"] = "minecraft:dark_oak_pressure_plate";
  MinecraftBlockTypes2["DarkOakSapling"] = "minecraft:dark_oak_sapling";
  MinecraftBlockTypes2["DarkOakShelf"] = "minecraft:dark_oak_shelf";
  MinecraftBlockTypes2["DarkOakSlab"] = "minecraft:dark_oak_slab";
  MinecraftBlockTypes2["DarkOakStairs"] = "minecraft:dark_oak_stairs";
  MinecraftBlockTypes2["DarkOakTrapdoor"] = "minecraft:dark_oak_trapdoor";
  MinecraftBlockTypes2["DarkOakWood"] = "minecraft:dark_oak_wood";
  MinecraftBlockTypes2["DarkPrismarine"] = "minecraft:dark_prismarine";
  MinecraftBlockTypes2["DarkPrismarineDoubleSlab"] = "minecraft:dark_prismarine_double_slab";
  MinecraftBlockTypes2["DarkPrismarineSlab"] = "minecraft:dark_prismarine_slab";
  MinecraftBlockTypes2["DarkPrismarineStairs"] = "minecraft:dark_prismarine_stairs";
  MinecraftBlockTypes2["DarkoakStandingSign"] = "minecraft:darkoak_standing_sign";
  MinecraftBlockTypes2["DarkoakWallSign"] = "minecraft:darkoak_wall_sign";
  MinecraftBlockTypes2["DaylightDetector"] = "minecraft:daylight_detector";
  MinecraftBlockTypes2["DaylightDetectorInverted"] = "minecraft:daylight_detector_inverted";
  MinecraftBlockTypes2["DeadBrainCoral"] = "minecraft:dead_brain_coral";
  MinecraftBlockTypes2["DeadBrainCoralBlock"] = "minecraft:dead_brain_coral_block";
  MinecraftBlockTypes2["DeadBrainCoralFan"] = "minecraft:dead_brain_coral_fan";
  MinecraftBlockTypes2["DeadBrainCoralWallFan"] = "minecraft:dead_brain_coral_wall_fan";
  MinecraftBlockTypes2["DeadBubbleCoral"] = "minecraft:dead_bubble_coral";
  MinecraftBlockTypes2["DeadBubbleCoralBlock"] = "minecraft:dead_bubble_coral_block";
  MinecraftBlockTypes2["DeadBubbleCoralFan"] = "minecraft:dead_bubble_coral_fan";
  MinecraftBlockTypes2["DeadBubbleCoralWallFan"] = "minecraft:dead_bubble_coral_wall_fan";
  MinecraftBlockTypes2["DeadFireCoral"] = "minecraft:dead_fire_coral";
  MinecraftBlockTypes2["DeadFireCoralBlock"] = "minecraft:dead_fire_coral_block";
  MinecraftBlockTypes2["DeadFireCoralFan"] = "minecraft:dead_fire_coral_fan";
  MinecraftBlockTypes2["DeadFireCoralWallFan"] = "minecraft:dead_fire_coral_wall_fan";
  MinecraftBlockTypes2["DeadHornCoral"] = "minecraft:dead_horn_coral";
  MinecraftBlockTypes2["DeadHornCoralBlock"] = "minecraft:dead_horn_coral_block";
  MinecraftBlockTypes2["DeadHornCoralFan"] = "minecraft:dead_horn_coral_fan";
  MinecraftBlockTypes2["DeadHornCoralWallFan"] = "minecraft:dead_horn_coral_wall_fan";
  MinecraftBlockTypes2["DeadTubeCoral"] = "minecraft:dead_tube_coral";
  MinecraftBlockTypes2["DeadTubeCoralBlock"] = "minecraft:dead_tube_coral_block";
  MinecraftBlockTypes2["DeadTubeCoralFan"] = "minecraft:dead_tube_coral_fan";
  MinecraftBlockTypes2["DeadTubeCoralWallFan"] = "minecraft:dead_tube_coral_wall_fan";
  MinecraftBlockTypes2["Deadbush"] = "minecraft:deadbush";
  MinecraftBlockTypes2["DecoratedPot"] = "minecraft:decorated_pot";
  MinecraftBlockTypes2["Deepslate"] = "minecraft:deepslate";
  MinecraftBlockTypes2["DeepslateBrickDoubleSlab"] = "minecraft:deepslate_brick_double_slab";
  MinecraftBlockTypes2["DeepslateBrickSlab"] = "minecraft:deepslate_brick_slab";
  MinecraftBlockTypes2["DeepslateBrickStairs"] = "minecraft:deepslate_brick_stairs";
  MinecraftBlockTypes2["DeepslateBrickWall"] = "minecraft:deepslate_brick_wall";
  MinecraftBlockTypes2["DeepslateBricks"] = "minecraft:deepslate_bricks";
  MinecraftBlockTypes2["DeepslateCoalOre"] = "minecraft:deepslate_coal_ore";
  MinecraftBlockTypes2["DeepslateCopperOre"] = "minecraft:deepslate_copper_ore";
  MinecraftBlockTypes2["DeepslateDiamondOre"] = "minecraft:deepslate_diamond_ore";
  MinecraftBlockTypes2["DeepslateEmeraldOre"] = "minecraft:deepslate_emerald_ore";
  MinecraftBlockTypes2["DeepslateGoldOre"] = "minecraft:deepslate_gold_ore";
  MinecraftBlockTypes2["DeepslateIronOre"] = "minecraft:deepslate_iron_ore";
  MinecraftBlockTypes2["DeepslateLapisOre"] = "minecraft:deepslate_lapis_ore";
  MinecraftBlockTypes2["DeepslateRedstoneOre"] = "minecraft:deepslate_redstone_ore";
  MinecraftBlockTypes2["DeepslateTileDoubleSlab"] = "minecraft:deepslate_tile_double_slab";
  MinecraftBlockTypes2["DeepslateTileSlab"] = "minecraft:deepslate_tile_slab";
  MinecraftBlockTypes2["DeepslateTileStairs"] = "minecraft:deepslate_tile_stairs";
  MinecraftBlockTypes2["DeepslateTileWall"] = "minecraft:deepslate_tile_wall";
  MinecraftBlockTypes2["DeepslateTiles"] = "minecraft:deepslate_tiles";
  MinecraftBlockTypes2["Deny"] = "minecraft:deny";
  MinecraftBlockTypes2["DetectorRail"] = "minecraft:detector_rail";
  MinecraftBlockTypes2["DiamondBlock"] = "minecraft:diamond_block";
  MinecraftBlockTypes2["DiamondOre"] = "minecraft:diamond_ore";
  MinecraftBlockTypes2["Diorite"] = "minecraft:diorite";
  MinecraftBlockTypes2["DioriteDoubleSlab"] = "minecraft:diorite_double_slab";
  MinecraftBlockTypes2["DioriteSlab"] = "minecraft:diorite_slab";
  MinecraftBlockTypes2["DioriteStairs"] = "minecraft:diorite_stairs";
  MinecraftBlockTypes2["DioriteWall"] = "minecraft:diorite_wall";
  MinecraftBlockTypes2["Dirt"] = "minecraft:dirt";
  MinecraftBlockTypes2["DirtWithRoots"] = "minecraft:dirt_with_roots";
  MinecraftBlockTypes2["Dispenser"] = "minecraft:dispenser";
  MinecraftBlockTypes2["DoubleCutCopperSlab"] = "minecraft:double_cut_copper_slab";
  MinecraftBlockTypes2["DragonEgg"] = "minecraft:dragon_egg";
  MinecraftBlockTypes2["DragonHead"] = "minecraft:dragon_head";
  MinecraftBlockTypes2["DriedGhast"] = "minecraft:dried_ghast";
  MinecraftBlockTypes2["DriedKelpBlock"] = "minecraft:dried_kelp_block";
  MinecraftBlockTypes2["DripstoneBlock"] = "minecraft:dripstone_block";
  MinecraftBlockTypes2["Dropper"] = "minecraft:dropper";
  MinecraftBlockTypes2["Element0"] = "minecraft:element_0";
  MinecraftBlockTypes2["Element1"] = "minecraft:element_1";
  MinecraftBlockTypes2["Element10"] = "minecraft:element_10";
  MinecraftBlockTypes2["Element100"] = "minecraft:element_100";
  MinecraftBlockTypes2["Element101"] = "minecraft:element_101";
  MinecraftBlockTypes2["Element102"] = "minecraft:element_102";
  MinecraftBlockTypes2["Element103"] = "minecraft:element_103";
  MinecraftBlockTypes2["Element104"] = "minecraft:element_104";
  MinecraftBlockTypes2["Element105"] = "minecraft:element_105";
  MinecraftBlockTypes2["Element106"] = "minecraft:element_106";
  MinecraftBlockTypes2["Element107"] = "minecraft:element_107";
  MinecraftBlockTypes2["Element108"] = "minecraft:element_108";
  MinecraftBlockTypes2["Element109"] = "minecraft:element_109";
  MinecraftBlockTypes2["Element11"] = "minecraft:element_11";
  MinecraftBlockTypes2["Element110"] = "minecraft:element_110";
  MinecraftBlockTypes2["Element111"] = "minecraft:element_111";
  MinecraftBlockTypes2["Element112"] = "minecraft:element_112";
  MinecraftBlockTypes2["Element113"] = "minecraft:element_113";
  MinecraftBlockTypes2["Element114"] = "minecraft:element_114";
  MinecraftBlockTypes2["Element115"] = "minecraft:element_115";
  MinecraftBlockTypes2["Element116"] = "minecraft:element_116";
  MinecraftBlockTypes2["Element117"] = "minecraft:element_117";
  MinecraftBlockTypes2["Element118"] = "minecraft:element_118";
  MinecraftBlockTypes2["Element12"] = "minecraft:element_12";
  MinecraftBlockTypes2["Element13"] = "minecraft:element_13";
  MinecraftBlockTypes2["Element14"] = "minecraft:element_14";
  MinecraftBlockTypes2["Element15"] = "minecraft:element_15";
  MinecraftBlockTypes2["Element16"] = "minecraft:element_16";
  MinecraftBlockTypes2["Element17"] = "minecraft:element_17";
  MinecraftBlockTypes2["Element18"] = "minecraft:element_18";
  MinecraftBlockTypes2["Element19"] = "minecraft:element_19";
  MinecraftBlockTypes2["Element2"] = "minecraft:element_2";
  MinecraftBlockTypes2["Element20"] = "minecraft:element_20";
  MinecraftBlockTypes2["Element21"] = "minecraft:element_21";
  MinecraftBlockTypes2["Element22"] = "minecraft:element_22";
  MinecraftBlockTypes2["Element23"] = "minecraft:element_23";
  MinecraftBlockTypes2["Element24"] = "minecraft:element_24";
  MinecraftBlockTypes2["Element25"] = "minecraft:element_25";
  MinecraftBlockTypes2["Element26"] = "minecraft:element_26";
  MinecraftBlockTypes2["Element27"] = "minecraft:element_27";
  MinecraftBlockTypes2["Element28"] = "minecraft:element_28";
  MinecraftBlockTypes2["Element29"] = "minecraft:element_29";
  MinecraftBlockTypes2["Element3"] = "minecraft:element_3";
  MinecraftBlockTypes2["Element30"] = "minecraft:element_30";
  MinecraftBlockTypes2["Element31"] = "minecraft:element_31";
  MinecraftBlockTypes2["Element32"] = "minecraft:element_32";
  MinecraftBlockTypes2["Element33"] = "minecraft:element_33";
  MinecraftBlockTypes2["Element34"] = "minecraft:element_34";
  MinecraftBlockTypes2["Element35"] = "minecraft:element_35";
  MinecraftBlockTypes2["Element36"] = "minecraft:element_36";
  MinecraftBlockTypes2["Element37"] = "minecraft:element_37";
  MinecraftBlockTypes2["Element38"] = "minecraft:element_38";
  MinecraftBlockTypes2["Element39"] = "minecraft:element_39";
  MinecraftBlockTypes2["Element4"] = "minecraft:element_4";
  MinecraftBlockTypes2["Element40"] = "minecraft:element_40";
  MinecraftBlockTypes2["Element41"] = "minecraft:element_41";
  MinecraftBlockTypes2["Element42"] = "minecraft:element_42";
  MinecraftBlockTypes2["Element43"] = "minecraft:element_43";
  MinecraftBlockTypes2["Element44"] = "minecraft:element_44";
  MinecraftBlockTypes2["Element45"] = "minecraft:element_45";
  MinecraftBlockTypes2["Element46"] = "minecraft:element_46";
  MinecraftBlockTypes2["Element47"] = "minecraft:element_47";
  MinecraftBlockTypes2["Element48"] = "minecraft:element_48";
  MinecraftBlockTypes2["Element49"] = "minecraft:element_49";
  MinecraftBlockTypes2["Element5"] = "minecraft:element_5";
  MinecraftBlockTypes2["Element50"] = "minecraft:element_50";
  MinecraftBlockTypes2["Element51"] = "minecraft:element_51";
  MinecraftBlockTypes2["Element52"] = "minecraft:element_52";
  MinecraftBlockTypes2["Element53"] = "minecraft:element_53";
  MinecraftBlockTypes2["Element54"] = "minecraft:element_54";
  MinecraftBlockTypes2["Element55"] = "minecraft:element_55";
  MinecraftBlockTypes2["Element56"] = "minecraft:element_56";
  MinecraftBlockTypes2["Element57"] = "minecraft:element_57";
  MinecraftBlockTypes2["Element58"] = "minecraft:element_58";
  MinecraftBlockTypes2["Element59"] = "minecraft:element_59";
  MinecraftBlockTypes2["Element6"] = "minecraft:element_6";
  MinecraftBlockTypes2["Element60"] = "minecraft:element_60";
  MinecraftBlockTypes2["Element61"] = "minecraft:element_61";
  MinecraftBlockTypes2["Element62"] = "minecraft:element_62";
  MinecraftBlockTypes2["Element63"] = "minecraft:element_63";
  MinecraftBlockTypes2["Element64"] = "minecraft:element_64";
  MinecraftBlockTypes2["Element65"] = "minecraft:element_65";
  MinecraftBlockTypes2["Element66"] = "minecraft:element_66";
  MinecraftBlockTypes2["Element67"] = "minecraft:element_67";
  MinecraftBlockTypes2["Element68"] = "minecraft:element_68";
  MinecraftBlockTypes2["Element69"] = "minecraft:element_69";
  MinecraftBlockTypes2["Element7"] = "minecraft:element_7";
  MinecraftBlockTypes2["Element70"] = "minecraft:element_70";
  MinecraftBlockTypes2["Element71"] = "minecraft:element_71";
  MinecraftBlockTypes2["Element72"] = "minecraft:element_72";
  MinecraftBlockTypes2["Element73"] = "minecraft:element_73";
  MinecraftBlockTypes2["Element74"] = "minecraft:element_74";
  MinecraftBlockTypes2["Element75"] = "minecraft:element_75";
  MinecraftBlockTypes2["Element76"] = "minecraft:element_76";
  MinecraftBlockTypes2["Element77"] = "minecraft:element_77";
  MinecraftBlockTypes2["Element78"] = "minecraft:element_78";
  MinecraftBlockTypes2["Element79"] = "minecraft:element_79";
  MinecraftBlockTypes2["Element8"] = "minecraft:element_8";
  MinecraftBlockTypes2["Element80"] = "minecraft:element_80";
  MinecraftBlockTypes2["Element81"] = "minecraft:element_81";
  MinecraftBlockTypes2["Element82"] = "minecraft:element_82";
  MinecraftBlockTypes2["Element83"] = "minecraft:element_83";
  MinecraftBlockTypes2["Element84"] = "minecraft:element_84";
  MinecraftBlockTypes2["Element85"] = "minecraft:element_85";
  MinecraftBlockTypes2["Element86"] = "minecraft:element_86";
  MinecraftBlockTypes2["Element87"] = "minecraft:element_87";
  MinecraftBlockTypes2["Element88"] = "minecraft:element_88";
  MinecraftBlockTypes2["Element89"] = "minecraft:element_89";
  MinecraftBlockTypes2["Element9"] = "minecraft:element_9";
  MinecraftBlockTypes2["Element90"] = "minecraft:element_90";
  MinecraftBlockTypes2["Element91"] = "minecraft:element_91";
  MinecraftBlockTypes2["Element92"] = "minecraft:element_92";
  MinecraftBlockTypes2["Element93"] = "minecraft:element_93";
  MinecraftBlockTypes2["Element94"] = "minecraft:element_94";
  MinecraftBlockTypes2["Element95"] = "minecraft:element_95";
  MinecraftBlockTypes2["Element96"] = "minecraft:element_96";
  MinecraftBlockTypes2["Element97"] = "minecraft:element_97";
  MinecraftBlockTypes2["Element98"] = "minecraft:element_98";
  MinecraftBlockTypes2["Element99"] = "minecraft:element_99";
  MinecraftBlockTypes2["ElementConstructor"] = "minecraft:element_constructor";
  MinecraftBlockTypes2["EmeraldBlock"] = "minecraft:emerald_block";
  MinecraftBlockTypes2["EmeraldOre"] = "minecraft:emerald_ore";
  MinecraftBlockTypes2["EnchantingTable"] = "minecraft:enchanting_table";
  MinecraftBlockTypes2["EndBrickStairs"] = "minecraft:end_brick_stairs";
  MinecraftBlockTypes2["EndBricks"] = "minecraft:end_bricks";
  MinecraftBlockTypes2["EndPortal"] = "minecraft:end_portal";
  MinecraftBlockTypes2["EndPortalFrame"] = "minecraft:end_portal_frame";
  MinecraftBlockTypes2["EndRod"] = "minecraft:end_rod";
  MinecraftBlockTypes2["EndStone"] = "minecraft:end_stone";
  MinecraftBlockTypes2["EndStoneBrickDoubleSlab"] = "minecraft:end_stone_brick_double_slab";
  MinecraftBlockTypes2["EndStoneBrickSlab"] = "minecraft:end_stone_brick_slab";
  MinecraftBlockTypes2["EndStoneBrickWall"] = "minecraft:end_stone_brick_wall";
  MinecraftBlockTypes2["EnderChest"] = "minecraft:ender_chest";
  MinecraftBlockTypes2["ExposedChiseledCopper"] = "minecraft:exposed_chiseled_copper";
  MinecraftBlockTypes2["ExposedCopper"] = "minecraft:exposed_copper";
  MinecraftBlockTypes2["ExposedCopperBars"] = "minecraft:exposed_copper_bars";
  MinecraftBlockTypes2["ExposedCopperBulb"] = "minecraft:exposed_copper_bulb";
  MinecraftBlockTypes2["ExposedCopperChain"] = "minecraft:exposed_copper_chain";
  MinecraftBlockTypes2["ExposedCopperChest"] = "minecraft:exposed_copper_chest";
  MinecraftBlockTypes2["ExposedCopperDoor"] = "minecraft:exposed_copper_door";
  MinecraftBlockTypes2["ExposedCopperGolemStatue"] = "minecraft:exposed_copper_golem_statue";
  MinecraftBlockTypes2["ExposedCopperGrate"] = "minecraft:exposed_copper_grate";
  MinecraftBlockTypes2["ExposedCopperLantern"] = "minecraft:exposed_copper_lantern";
  MinecraftBlockTypes2["ExposedCopperTrapdoor"] = "minecraft:exposed_copper_trapdoor";
  MinecraftBlockTypes2["ExposedCutCopper"] = "minecraft:exposed_cut_copper";
  MinecraftBlockTypes2["ExposedCutCopperSlab"] = "minecraft:exposed_cut_copper_slab";
  MinecraftBlockTypes2["ExposedCutCopperStairs"] = "minecraft:exposed_cut_copper_stairs";
  MinecraftBlockTypes2["ExposedDoubleCutCopperSlab"] = "minecraft:exposed_double_cut_copper_slab";
  MinecraftBlockTypes2["ExposedLightningRod"] = "minecraft:exposed_lightning_rod";
  MinecraftBlockTypes2["Farmland"] = "minecraft:farmland";
  MinecraftBlockTypes2["FenceGate"] = "minecraft:fence_gate";
  MinecraftBlockTypes2["Fern"] = "minecraft:fern";
  MinecraftBlockTypes2["Fire"] = "minecraft:fire";
  MinecraftBlockTypes2["FireCoral"] = "minecraft:fire_coral";
  MinecraftBlockTypes2["FireCoralBlock"] = "minecraft:fire_coral_block";
  MinecraftBlockTypes2["FireCoralFan"] = "minecraft:fire_coral_fan";
  MinecraftBlockTypes2["FireCoralWallFan"] = "minecraft:fire_coral_wall_fan";
  MinecraftBlockTypes2["FireflyBush"] = "minecraft:firefly_bush";
  MinecraftBlockTypes2["FletchingTable"] = "minecraft:fletching_table";
  MinecraftBlockTypes2["FlowerPot"] = "minecraft:flower_pot";
  MinecraftBlockTypes2["FloweringAzalea"] = "minecraft:flowering_azalea";
  MinecraftBlockTypes2["FlowingLava"] = "minecraft:flowing_lava";
  MinecraftBlockTypes2["FlowingWater"] = "minecraft:flowing_water";
  MinecraftBlockTypes2["Frame"] = "minecraft:frame";
  MinecraftBlockTypes2["FrogSpawn"] = "minecraft:frog_spawn";
  MinecraftBlockTypes2["FrostedIce"] = "minecraft:frosted_ice";
  MinecraftBlockTypes2["Furnace"] = "minecraft:furnace";
  MinecraftBlockTypes2["GildedBlackstone"] = "minecraft:gilded_blackstone";
  MinecraftBlockTypes2["Glass"] = "minecraft:glass";
  MinecraftBlockTypes2["GlassPane"] = "minecraft:glass_pane";
  MinecraftBlockTypes2["GlowFrame"] = "minecraft:glow_frame";
  MinecraftBlockTypes2["GlowLichen"] = "minecraft:glow_lichen";
  MinecraftBlockTypes2["Glowstone"] = "minecraft:glowstone";
  MinecraftBlockTypes2["GoldBlock"] = "minecraft:gold_block";
  MinecraftBlockTypes2["GoldOre"] = "minecraft:gold_ore";
  MinecraftBlockTypes2["GoldenRail"] = "minecraft:golden_rail";
  MinecraftBlockTypes2["Granite"] = "minecraft:granite";
  MinecraftBlockTypes2["GraniteDoubleSlab"] = "minecraft:granite_double_slab";
  MinecraftBlockTypes2["GraniteSlab"] = "minecraft:granite_slab";
  MinecraftBlockTypes2["GraniteStairs"] = "minecraft:granite_stairs";
  MinecraftBlockTypes2["GraniteWall"] = "minecraft:granite_wall";
  MinecraftBlockTypes2["GrassBlock"] = "minecraft:grass_block";
  MinecraftBlockTypes2["GrassPath"] = "minecraft:grass_path";
  MinecraftBlockTypes2["Gravel"] = "minecraft:gravel";
  MinecraftBlockTypes2["GrayCandle"] = "minecraft:gray_candle";
  MinecraftBlockTypes2["GrayCandleCake"] = "minecraft:gray_candle_cake";
  MinecraftBlockTypes2["GrayCarpet"] = "minecraft:gray_carpet";
  MinecraftBlockTypes2["GrayConcrete"] = "minecraft:gray_concrete";
  MinecraftBlockTypes2["GrayConcretePowder"] = "minecraft:gray_concrete_powder";
  MinecraftBlockTypes2["GrayGlazedTerracotta"] = "minecraft:gray_glazed_terracotta";
  MinecraftBlockTypes2["GrayShulkerBox"] = "minecraft:gray_shulker_box";
  MinecraftBlockTypes2["GrayStainedGlass"] = "minecraft:gray_stained_glass";
  MinecraftBlockTypes2["GrayStainedGlassPane"] = "minecraft:gray_stained_glass_pane";
  MinecraftBlockTypes2["GrayTerracotta"] = "minecraft:gray_terracotta";
  MinecraftBlockTypes2["GrayWool"] = "minecraft:gray_wool";
  MinecraftBlockTypes2["GreenCandle"] = "minecraft:green_candle";
  MinecraftBlockTypes2["GreenCandleCake"] = "minecraft:green_candle_cake";
  MinecraftBlockTypes2["GreenCarpet"] = "minecraft:green_carpet";
  MinecraftBlockTypes2["GreenConcrete"] = "minecraft:green_concrete";
  MinecraftBlockTypes2["GreenConcretePowder"] = "minecraft:green_concrete_powder";
  MinecraftBlockTypes2["GreenGlazedTerracotta"] = "minecraft:green_glazed_terracotta";
  MinecraftBlockTypes2["GreenShulkerBox"] = "minecraft:green_shulker_box";
  MinecraftBlockTypes2["GreenStainedGlass"] = "minecraft:green_stained_glass";
  MinecraftBlockTypes2["GreenStainedGlassPane"] = "minecraft:green_stained_glass_pane";
  MinecraftBlockTypes2["GreenTerracotta"] = "minecraft:green_terracotta";
  MinecraftBlockTypes2["GreenWool"] = "minecraft:green_wool";
  MinecraftBlockTypes2["Grindstone"] = "minecraft:grindstone";
  MinecraftBlockTypes2["HangingRoots"] = "minecraft:hanging_roots";
  MinecraftBlockTypes2["HardBlackStainedGlass"] = "minecraft:hard_black_stained_glass";
  MinecraftBlockTypes2["HardBlackStainedGlassPane"] = "minecraft:hard_black_stained_glass_pane";
  MinecraftBlockTypes2["HardBlueStainedGlass"] = "minecraft:hard_blue_stained_glass";
  MinecraftBlockTypes2["HardBlueStainedGlassPane"] = "minecraft:hard_blue_stained_glass_pane";
  MinecraftBlockTypes2["HardBrownStainedGlass"] = "minecraft:hard_brown_stained_glass";
  MinecraftBlockTypes2["HardBrownStainedGlassPane"] = "minecraft:hard_brown_stained_glass_pane";
  MinecraftBlockTypes2["HardCyanStainedGlass"] = "minecraft:hard_cyan_stained_glass";
  MinecraftBlockTypes2["HardCyanStainedGlassPane"] = "minecraft:hard_cyan_stained_glass_pane";
  MinecraftBlockTypes2["HardGlass"] = "minecraft:hard_glass";
  MinecraftBlockTypes2["HardGlassPane"] = "minecraft:hard_glass_pane";
  MinecraftBlockTypes2["HardGrayStainedGlass"] = "minecraft:hard_gray_stained_glass";
  MinecraftBlockTypes2["HardGrayStainedGlassPane"] = "minecraft:hard_gray_stained_glass_pane";
  MinecraftBlockTypes2["HardGreenStainedGlass"] = "minecraft:hard_green_stained_glass";
  MinecraftBlockTypes2["HardGreenStainedGlassPane"] = "minecraft:hard_green_stained_glass_pane";
  MinecraftBlockTypes2["HardLightBlueStainedGlass"] = "minecraft:hard_light_blue_stained_glass";
  MinecraftBlockTypes2["HardLightBlueStainedGlassPane"] = "minecraft:hard_light_blue_stained_glass_pane";
  MinecraftBlockTypes2["HardLightGrayStainedGlass"] = "minecraft:hard_light_gray_stained_glass";
  MinecraftBlockTypes2["HardLightGrayStainedGlassPane"] = "minecraft:hard_light_gray_stained_glass_pane";
  MinecraftBlockTypes2["HardLimeStainedGlass"] = "minecraft:hard_lime_stained_glass";
  MinecraftBlockTypes2["HardLimeStainedGlassPane"] = "minecraft:hard_lime_stained_glass_pane";
  MinecraftBlockTypes2["HardMagentaStainedGlass"] = "minecraft:hard_magenta_stained_glass";
  MinecraftBlockTypes2["HardMagentaStainedGlassPane"] = "minecraft:hard_magenta_stained_glass_pane";
  MinecraftBlockTypes2["HardOrangeStainedGlass"] = "minecraft:hard_orange_stained_glass";
  MinecraftBlockTypes2["HardOrangeStainedGlassPane"] = "minecraft:hard_orange_stained_glass_pane";
  MinecraftBlockTypes2["HardPinkStainedGlass"] = "minecraft:hard_pink_stained_glass";
  MinecraftBlockTypes2["HardPinkStainedGlassPane"] = "minecraft:hard_pink_stained_glass_pane";
  MinecraftBlockTypes2["HardPurpleStainedGlass"] = "minecraft:hard_purple_stained_glass";
  MinecraftBlockTypes2["HardPurpleStainedGlassPane"] = "minecraft:hard_purple_stained_glass_pane";
  MinecraftBlockTypes2["HardRedStainedGlass"] = "minecraft:hard_red_stained_glass";
  MinecraftBlockTypes2["HardRedStainedGlassPane"] = "minecraft:hard_red_stained_glass_pane";
  MinecraftBlockTypes2["HardWhiteStainedGlass"] = "minecraft:hard_white_stained_glass";
  MinecraftBlockTypes2["HardWhiteStainedGlassPane"] = "minecraft:hard_white_stained_glass_pane";
  MinecraftBlockTypes2["HardYellowStainedGlass"] = "minecraft:hard_yellow_stained_glass";
  MinecraftBlockTypes2["HardYellowStainedGlassPane"] = "minecraft:hard_yellow_stained_glass_pane";
  MinecraftBlockTypes2["HardenedClay"] = "minecraft:hardened_clay";
  MinecraftBlockTypes2["HayBlock"] = "minecraft:hay_block";
  MinecraftBlockTypes2["HeavyCore"] = "minecraft:heavy_core";
  MinecraftBlockTypes2["HeavyWeightedPressurePlate"] = "minecraft:heavy_weighted_pressure_plate";
  MinecraftBlockTypes2["HoneyBlock"] = "minecraft:honey_block";
  MinecraftBlockTypes2["HoneycombBlock"] = "minecraft:honeycomb_block";
  MinecraftBlockTypes2["Hopper"] = "minecraft:hopper";
  MinecraftBlockTypes2["HornCoral"] = "minecraft:horn_coral";
  MinecraftBlockTypes2["HornCoralBlock"] = "minecraft:horn_coral_block";
  MinecraftBlockTypes2["HornCoralFan"] = "minecraft:horn_coral_fan";
  MinecraftBlockTypes2["HornCoralWallFan"] = "minecraft:horn_coral_wall_fan";
  MinecraftBlockTypes2["Ice"] = "minecraft:ice";
  MinecraftBlockTypes2["InfestedChiseledStoneBricks"] = "minecraft:infested_chiseled_stone_bricks";
  MinecraftBlockTypes2["InfestedCobblestone"] = "minecraft:infested_cobblestone";
  MinecraftBlockTypes2["InfestedCrackedStoneBricks"] = "minecraft:infested_cracked_stone_bricks";
  MinecraftBlockTypes2["InfestedDeepslate"] = "minecraft:infested_deepslate";
  MinecraftBlockTypes2["InfestedMossyStoneBricks"] = "minecraft:infested_mossy_stone_bricks";
  MinecraftBlockTypes2["InfestedStone"] = "minecraft:infested_stone";
  MinecraftBlockTypes2["InfestedStoneBricks"] = "minecraft:infested_stone_bricks";
  MinecraftBlockTypes2["IronBars"] = "minecraft:iron_bars";
  MinecraftBlockTypes2["IronBlock"] = "minecraft:iron_block";
  MinecraftBlockTypes2["IronChain"] = "minecraft:iron_chain";
  MinecraftBlockTypes2["IronDoor"] = "minecraft:iron_door";
  MinecraftBlockTypes2["IronOre"] = "minecraft:iron_ore";
  MinecraftBlockTypes2["IronTrapdoor"] = "minecraft:iron_trapdoor";
  MinecraftBlockTypes2["Jigsaw"] = "minecraft:jigsaw";
  MinecraftBlockTypes2["Jukebox"] = "minecraft:jukebox";
  MinecraftBlockTypes2["JungleButton"] = "minecraft:jungle_button";
  MinecraftBlockTypes2["JungleDoor"] = "minecraft:jungle_door";
  MinecraftBlockTypes2["JungleDoubleSlab"] = "minecraft:jungle_double_slab";
  MinecraftBlockTypes2["JungleFence"] = "minecraft:jungle_fence";
  MinecraftBlockTypes2["JungleFenceGate"] = "minecraft:jungle_fence_gate";
  MinecraftBlockTypes2["JungleHangingSign"] = "minecraft:jungle_hanging_sign";
  MinecraftBlockTypes2["JungleLeaves"] = "minecraft:jungle_leaves";
  MinecraftBlockTypes2["JungleLog"] = "minecraft:jungle_log";
  MinecraftBlockTypes2["JunglePlanks"] = "minecraft:jungle_planks";
  MinecraftBlockTypes2["JunglePressurePlate"] = "minecraft:jungle_pressure_plate";
  MinecraftBlockTypes2["JungleSapling"] = "minecraft:jungle_sapling";
  MinecraftBlockTypes2["JungleShelf"] = "minecraft:jungle_shelf";
  MinecraftBlockTypes2["JungleSlab"] = "minecraft:jungle_slab";
  MinecraftBlockTypes2["JungleStairs"] = "minecraft:jungle_stairs";
  MinecraftBlockTypes2["JungleStandingSign"] = "minecraft:jungle_standing_sign";
  MinecraftBlockTypes2["JungleTrapdoor"] = "minecraft:jungle_trapdoor";
  MinecraftBlockTypes2["JungleWallSign"] = "minecraft:jungle_wall_sign";
  MinecraftBlockTypes2["JungleWood"] = "minecraft:jungle_wood";
  MinecraftBlockTypes2["Kelp"] = "minecraft:kelp";
  MinecraftBlockTypes2["LabTable"] = "minecraft:lab_table";
  MinecraftBlockTypes2["Ladder"] = "minecraft:ladder";
  MinecraftBlockTypes2["Lantern"] = "minecraft:lantern";
  MinecraftBlockTypes2["LapisBlock"] = "minecraft:lapis_block";
  MinecraftBlockTypes2["LapisOre"] = "minecraft:lapis_ore";
  MinecraftBlockTypes2["LargeAmethystBud"] = "minecraft:large_amethyst_bud";
  MinecraftBlockTypes2["LargeFern"] = "minecraft:large_fern";
  MinecraftBlockTypes2["Lava"] = "minecraft:lava";
  MinecraftBlockTypes2["LeafLitter"] = "minecraft:leaf_litter";
  MinecraftBlockTypes2["Lectern"] = "minecraft:lectern";
  MinecraftBlockTypes2["Lever"] = "minecraft:lever";
  MinecraftBlockTypes2["LightBlock0"] = "minecraft:light_block_0";
  MinecraftBlockTypes2["LightBlock1"] = "minecraft:light_block_1";
  MinecraftBlockTypes2["LightBlock10"] = "minecraft:light_block_10";
  MinecraftBlockTypes2["LightBlock11"] = "minecraft:light_block_11";
  MinecraftBlockTypes2["LightBlock12"] = "minecraft:light_block_12";
  MinecraftBlockTypes2["LightBlock13"] = "minecraft:light_block_13";
  MinecraftBlockTypes2["LightBlock14"] = "minecraft:light_block_14";
  MinecraftBlockTypes2["LightBlock15"] = "minecraft:light_block_15";
  MinecraftBlockTypes2["LightBlock2"] = "minecraft:light_block_2";
  MinecraftBlockTypes2["LightBlock3"] = "minecraft:light_block_3";
  MinecraftBlockTypes2["LightBlock4"] = "minecraft:light_block_4";
  MinecraftBlockTypes2["LightBlock5"] = "minecraft:light_block_5";
  MinecraftBlockTypes2["LightBlock6"] = "minecraft:light_block_6";
  MinecraftBlockTypes2["LightBlock7"] = "minecraft:light_block_7";
  MinecraftBlockTypes2["LightBlock8"] = "minecraft:light_block_8";
  MinecraftBlockTypes2["LightBlock9"] = "minecraft:light_block_9";
  MinecraftBlockTypes2["LightBlueCandle"] = "minecraft:light_blue_candle";
  MinecraftBlockTypes2["LightBlueCandleCake"] = "minecraft:light_blue_candle_cake";
  MinecraftBlockTypes2["LightBlueCarpet"] = "minecraft:light_blue_carpet";
  MinecraftBlockTypes2["LightBlueConcrete"] = "minecraft:light_blue_concrete";
  MinecraftBlockTypes2["LightBlueConcretePowder"] = "minecraft:light_blue_concrete_powder";
  MinecraftBlockTypes2["LightBlueGlazedTerracotta"] = "minecraft:light_blue_glazed_terracotta";
  MinecraftBlockTypes2["LightBlueShulkerBox"] = "minecraft:light_blue_shulker_box";
  MinecraftBlockTypes2["LightBlueStainedGlass"] = "minecraft:light_blue_stained_glass";
  MinecraftBlockTypes2["LightBlueStainedGlassPane"] = "minecraft:light_blue_stained_glass_pane";
  MinecraftBlockTypes2["LightBlueTerracotta"] = "minecraft:light_blue_terracotta";
  MinecraftBlockTypes2["LightBlueWool"] = "minecraft:light_blue_wool";
  MinecraftBlockTypes2["LightGrayCandle"] = "minecraft:light_gray_candle";
  MinecraftBlockTypes2["LightGrayCandleCake"] = "minecraft:light_gray_candle_cake";
  MinecraftBlockTypes2["LightGrayCarpet"] = "minecraft:light_gray_carpet";
  MinecraftBlockTypes2["LightGrayConcrete"] = "minecraft:light_gray_concrete";
  MinecraftBlockTypes2["LightGrayConcretePowder"] = "minecraft:light_gray_concrete_powder";
  MinecraftBlockTypes2["LightGrayShulkerBox"] = "minecraft:light_gray_shulker_box";
  MinecraftBlockTypes2["LightGrayStainedGlass"] = "minecraft:light_gray_stained_glass";
  MinecraftBlockTypes2["LightGrayStainedGlassPane"] = "minecraft:light_gray_stained_glass_pane";
  MinecraftBlockTypes2["LightGrayTerracotta"] = "minecraft:light_gray_terracotta";
  MinecraftBlockTypes2["LightGrayWool"] = "minecraft:light_gray_wool";
  MinecraftBlockTypes2["LightWeightedPressurePlate"] = "minecraft:light_weighted_pressure_plate";
  MinecraftBlockTypes2["LightningRod"] = "minecraft:lightning_rod";
  MinecraftBlockTypes2["Lilac"] = "minecraft:lilac";
  MinecraftBlockTypes2["LilyOfTheValley"] = "minecraft:lily_of_the_valley";
  MinecraftBlockTypes2["LimeCandle"] = "minecraft:lime_candle";
  MinecraftBlockTypes2["LimeCandleCake"] = "minecraft:lime_candle_cake";
  MinecraftBlockTypes2["LimeCarpet"] = "minecraft:lime_carpet";
  MinecraftBlockTypes2["LimeConcrete"] = "minecraft:lime_concrete";
  MinecraftBlockTypes2["LimeConcretePowder"] = "minecraft:lime_concrete_powder";
  MinecraftBlockTypes2["LimeGlazedTerracotta"] = "minecraft:lime_glazed_terracotta";
  MinecraftBlockTypes2["LimeShulkerBox"] = "minecraft:lime_shulker_box";
  MinecraftBlockTypes2["LimeStainedGlass"] = "minecraft:lime_stained_glass";
  MinecraftBlockTypes2["LimeStainedGlassPane"] = "minecraft:lime_stained_glass_pane";
  MinecraftBlockTypes2["LimeTerracotta"] = "minecraft:lime_terracotta";
  MinecraftBlockTypes2["LimeWool"] = "minecraft:lime_wool";
  MinecraftBlockTypes2["LitBlastFurnace"] = "minecraft:lit_blast_furnace";
  MinecraftBlockTypes2["LitDeepslateRedstoneOre"] = "minecraft:lit_deepslate_redstone_ore";
  MinecraftBlockTypes2["LitFurnace"] = "minecraft:lit_furnace";
  MinecraftBlockTypes2["LitPumpkin"] = "minecraft:lit_pumpkin";
  MinecraftBlockTypes2["LitRedstoneLamp"] = "minecraft:lit_redstone_lamp";
  MinecraftBlockTypes2["LitRedstoneOre"] = "minecraft:lit_redstone_ore";
  MinecraftBlockTypes2["LitSmoker"] = "minecraft:lit_smoker";
  MinecraftBlockTypes2["Lodestone"] = "minecraft:lodestone";
  MinecraftBlockTypes2["Loom"] = "minecraft:loom";
  MinecraftBlockTypes2["MagentaCandle"] = "minecraft:magenta_candle";
  MinecraftBlockTypes2["MagentaCandleCake"] = "minecraft:magenta_candle_cake";
  MinecraftBlockTypes2["MagentaCarpet"] = "minecraft:magenta_carpet";
  MinecraftBlockTypes2["MagentaConcrete"] = "minecraft:magenta_concrete";
  MinecraftBlockTypes2["MagentaConcretePowder"] = "minecraft:magenta_concrete_powder";
  MinecraftBlockTypes2["MagentaGlazedTerracotta"] = "minecraft:magenta_glazed_terracotta";
  MinecraftBlockTypes2["MagentaShulkerBox"] = "minecraft:magenta_shulker_box";
  MinecraftBlockTypes2["MagentaStainedGlass"] = "minecraft:magenta_stained_glass";
  MinecraftBlockTypes2["MagentaStainedGlassPane"] = "minecraft:magenta_stained_glass_pane";
  MinecraftBlockTypes2["MagentaTerracotta"] = "minecraft:magenta_terracotta";
  MinecraftBlockTypes2["MagentaWool"] = "minecraft:magenta_wool";
  MinecraftBlockTypes2["Magma"] = "minecraft:magma";
  MinecraftBlockTypes2["MangroveButton"] = "minecraft:mangrove_button";
  MinecraftBlockTypes2["MangroveDoor"] = "minecraft:mangrove_door";
  MinecraftBlockTypes2["MangroveDoubleSlab"] = "minecraft:mangrove_double_slab";
  MinecraftBlockTypes2["MangroveFence"] = "minecraft:mangrove_fence";
  MinecraftBlockTypes2["MangroveFenceGate"] = "minecraft:mangrove_fence_gate";
  MinecraftBlockTypes2["MangroveHangingSign"] = "minecraft:mangrove_hanging_sign";
  MinecraftBlockTypes2["MangroveLeaves"] = "minecraft:mangrove_leaves";
  MinecraftBlockTypes2["MangroveLog"] = "minecraft:mangrove_log";
  MinecraftBlockTypes2["MangrovePlanks"] = "minecraft:mangrove_planks";
  MinecraftBlockTypes2["MangrovePressurePlate"] = "minecraft:mangrove_pressure_plate";
  MinecraftBlockTypes2["MangrovePropagule"] = "minecraft:mangrove_propagule";
  MinecraftBlockTypes2["MangroveRoots"] = "minecraft:mangrove_roots";
  MinecraftBlockTypes2["MangroveShelf"] = "minecraft:mangrove_shelf";
  MinecraftBlockTypes2["MangroveSlab"] = "minecraft:mangrove_slab";
  MinecraftBlockTypes2["MangroveStairs"] = "minecraft:mangrove_stairs";
  MinecraftBlockTypes2["MangroveStandingSign"] = "minecraft:mangrove_standing_sign";
  MinecraftBlockTypes2["MangroveTrapdoor"] = "minecraft:mangrove_trapdoor";
  MinecraftBlockTypes2["MangroveWallSign"] = "minecraft:mangrove_wall_sign";
  MinecraftBlockTypes2["MangroveWood"] = "minecraft:mangrove_wood";
  MinecraftBlockTypes2["MaterialReducer"] = "minecraft:material_reducer";
  MinecraftBlockTypes2["MediumAmethystBud"] = "minecraft:medium_amethyst_bud";
  MinecraftBlockTypes2["MelonBlock"] = "minecraft:melon_block";
  MinecraftBlockTypes2["MelonStem"] = "minecraft:melon_stem";
  MinecraftBlockTypes2["MobSpawner"] = "minecraft:mob_spawner";
  MinecraftBlockTypes2["MossBlock"] = "minecraft:moss_block";
  MinecraftBlockTypes2["MossCarpet"] = "minecraft:moss_carpet";
  MinecraftBlockTypes2["MossyCobblestone"] = "minecraft:mossy_cobblestone";
  MinecraftBlockTypes2["MossyCobblestoneDoubleSlab"] = "minecraft:mossy_cobblestone_double_slab";
  MinecraftBlockTypes2["MossyCobblestoneSlab"] = "minecraft:mossy_cobblestone_slab";
  MinecraftBlockTypes2["MossyCobblestoneStairs"] = "minecraft:mossy_cobblestone_stairs";
  MinecraftBlockTypes2["MossyCobblestoneWall"] = "minecraft:mossy_cobblestone_wall";
  MinecraftBlockTypes2["MossyStoneBrickDoubleSlab"] = "minecraft:mossy_stone_brick_double_slab";
  MinecraftBlockTypes2["MossyStoneBrickSlab"] = "minecraft:mossy_stone_brick_slab";
  MinecraftBlockTypes2["MossyStoneBrickStairs"] = "minecraft:mossy_stone_brick_stairs";
  MinecraftBlockTypes2["MossyStoneBrickWall"] = "minecraft:mossy_stone_brick_wall";
  MinecraftBlockTypes2["MossyStoneBricks"] = "minecraft:mossy_stone_bricks";
  MinecraftBlockTypes2["Mud"] = "minecraft:mud";
  MinecraftBlockTypes2["MudBrickDoubleSlab"] = "minecraft:mud_brick_double_slab";
  MinecraftBlockTypes2["MudBrickSlab"] = "minecraft:mud_brick_slab";
  MinecraftBlockTypes2["MudBrickStairs"] = "minecraft:mud_brick_stairs";
  MinecraftBlockTypes2["MudBrickWall"] = "minecraft:mud_brick_wall";
  MinecraftBlockTypes2["MudBricks"] = "minecraft:mud_bricks";
  MinecraftBlockTypes2["MuddyMangroveRoots"] = "minecraft:muddy_mangrove_roots";
  MinecraftBlockTypes2["MushroomStem"] = "minecraft:mushroom_stem";
  MinecraftBlockTypes2["Mycelium"] = "minecraft:mycelium";
  MinecraftBlockTypes2["NetherBrick"] = "minecraft:nether_brick";
  MinecraftBlockTypes2["NetherBrickDoubleSlab"] = "minecraft:nether_brick_double_slab";
  MinecraftBlockTypes2["NetherBrickFence"] = "minecraft:nether_brick_fence";
  MinecraftBlockTypes2["NetherBrickSlab"] = "minecraft:nether_brick_slab";
  MinecraftBlockTypes2["NetherBrickStairs"] = "minecraft:nether_brick_stairs";
  MinecraftBlockTypes2["NetherBrickWall"] = "minecraft:nether_brick_wall";
  MinecraftBlockTypes2["NetherGoldOre"] = "minecraft:nether_gold_ore";
  MinecraftBlockTypes2["NetherSprouts"] = "minecraft:nether_sprouts";
  MinecraftBlockTypes2["NetherWart"] = "minecraft:nether_wart";
  MinecraftBlockTypes2["NetherWartBlock"] = "minecraft:nether_wart_block";
  MinecraftBlockTypes2["NetheriteBlock"] = "minecraft:netherite_block";
  MinecraftBlockTypes2["Netherrack"] = "minecraft:netherrack";
  MinecraftBlockTypes2["NormalStoneDoubleSlab"] = "minecraft:normal_stone_double_slab";
  MinecraftBlockTypes2["NormalStoneSlab"] = "minecraft:normal_stone_slab";
  MinecraftBlockTypes2["NormalStoneStairs"] = "minecraft:normal_stone_stairs";
  MinecraftBlockTypes2["Noteblock"] = "minecraft:noteblock";
  MinecraftBlockTypes2["OakDoubleSlab"] = "minecraft:oak_double_slab";
  MinecraftBlockTypes2["OakFence"] = "minecraft:oak_fence";
  MinecraftBlockTypes2["OakHangingSign"] = "minecraft:oak_hanging_sign";
  MinecraftBlockTypes2["OakLeaves"] = "minecraft:oak_leaves";
  MinecraftBlockTypes2["OakLog"] = "minecraft:oak_log";
  MinecraftBlockTypes2["OakPlanks"] = "minecraft:oak_planks";
  MinecraftBlockTypes2["OakSapling"] = "minecraft:oak_sapling";
  MinecraftBlockTypes2["OakShelf"] = "minecraft:oak_shelf";
  MinecraftBlockTypes2["OakSlab"] = "minecraft:oak_slab";
  MinecraftBlockTypes2["OakStairs"] = "minecraft:oak_stairs";
  MinecraftBlockTypes2["OakWood"] = "minecraft:oak_wood";
  MinecraftBlockTypes2["Observer"] = "minecraft:observer";
  MinecraftBlockTypes2["Obsidian"] = "minecraft:obsidian";
  MinecraftBlockTypes2["OchreFroglight"] = "minecraft:ochre_froglight";
  MinecraftBlockTypes2["OpenEyeblossom"] = "minecraft:open_eyeblossom";
  MinecraftBlockTypes2["OrangeCandle"] = "minecraft:orange_candle";
  MinecraftBlockTypes2["OrangeCandleCake"] = "minecraft:orange_candle_cake";
  MinecraftBlockTypes2["OrangeCarpet"] = "minecraft:orange_carpet";
  MinecraftBlockTypes2["OrangeConcrete"] = "minecraft:orange_concrete";
  MinecraftBlockTypes2["OrangeConcretePowder"] = "minecraft:orange_concrete_powder";
  MinecraftBlockTypes2["OrangeGlazedTerracotta"] = "minecraft:orange_glazed_terracotta";
  MinecraftBlockTypes2["OrangeShulkerBox"] = "minecraft:orange_shulker_box";
  MinecraftBlockTypes2["OrangeStainedGlass"] = "minecraft:orange_stained_glass";
  MinecraftBlockTypes2["OrangeStainedGlassPane"] = "minecraft:orange_stained_glass_pane";
  MinecraftBlockTypes2["OrangeTerracotta"] = "minecraft:orange_terracotta";
  MinecraftBlockTypes2["OrangeTulip"] = "minecraft:orange_tulip";
  MinecraftBlockTypes2["OrangeWool"] = "minecraft:orange_wool";
  MinecraftBlockTypes2["OxeyeDaisy"] = "minecraft:oxeye_daisy";
  MinecraftBlockTypes2["OxidizedChiseledCopper"] = "minecraft:oxidized_chiseled_copper";
  MinecraftBlockTypes2["OxidizedCopper"] = "minecraft:oxidized_copper";
  MinecraftBlockTypes2["OxidizedCopperBars"] = "minecraft:oxidized_copper_bars";
  MinecraftBlockTypes2["OxidizedCopperBulb"] = "minecraft:oxidized_copper_bulb";
  MinecraftBlockTypes2["OxidizedCopperChain"] = "minecraft:oxidized_copper_chain";
  MinecraftBlockTypes2["OxidizedCopperChest"] = "minecraft:oxidized_copper_chest";
  MinecraftBlockTypes2["OxidizedCopperDoor"] = "minecraft:oxidized_copper_door";
  MinecraftBlockTypes2["OxidizedCopperGolemStatue"] = "minecraft:oxidized_copper_golem_statue";
  MinecraftBlockTypes2["OxidizedCopperGrate"] = "minecraft:oxidized_copper_grate";
  MinecraftBlockTypes2["OxidizedCopperLantern"] = "minecraft:oxidized_copper_lantern";
  MinecraftBlockTypes2["OxidizedCopperTrapdoor"] = "minecraft:oxidized_copper_trapdoor";
  MinecraftBlockTypes2["OxidizedCutCopper"] = "minecraft:oxidized_cut_copper";
  MinecraftBlockTypes2["OxidizedCutCopperSlab"] = "minecraft:oxidized_cut_copper_slab";
  MinecraftBlockTypes2["OxidizedCutCopperStairs"] = "minecraft:oxidized_cut_copper_stairs";
  MinecraftBlockTypes2["OxidizedDoubleCutCopperSlab"] = "minecraft:oxidized_double_cut_copper_slab";
  MinecraftBlockTypes2["OxidizedLightningRod"] = "minecraft:oxidized_lightning_rod";
  MinecraftBlockTypes2["PackedIce"] = "minecraft:packed_ice";
  MinecraftBlockTypes2["PackedMud"] = "minecraft:packed_mud";
  MinecraftBlockTypes2["PaleHangingMoss"] = "minecraft:pale_hanging_moss";
  MinecraftBlockTypes2["PaleMossBlock"] = "minecraft:pale_moss_block";
  MinecraftBlockTypes2["PaleMossCarpet"] = "minecraft:pale_moss_carpet";
  MinecraftBlockTypes2["PaleOakButton"] = "minecraft:pale_oak_button";
  MinecraftBlockTypes2["PaleOakDoor"] = "minecraft:pale_oak_door";
  MinecraftBlockTypes2["PaleOakDoubleSlab"] = "minecraft:pale_oak_double_slab";
  MinecraftBlockTypes2["PaleOakFence"] = "minecraft:pale_oak_fence";
  MinecraftBlockTypes2["PaleOakFenceGate"] = "minecraft:pale_oak_fence_gate";
  MinecraftBlockTypes2["PaleOakHangingSign"] = "minecraft:pale_oak_hanging_sign";
  MinecraftBlockTypes2["PaleOakLeaves"] = "minecraft:pale_oak_leaves";
  MinecraftBlockTypes2["PaleOakLog"] = "minecraft:pale_oak_log";
  MinecraftBlockTypes2["PaleOakPlanks"] = "minecraft:pale_oak_planks";
  MinecraftBlockTypes2["PaleOakPressurePlate"] = "minecraft:pale_oak_pressure_plate";
  MinecraftBlockTypes2["PaleOakSapling"] = "minecraft:pale_oak_sapling";
  MinecraftBlockTypes2["PaleOakShelf"] = "minecraft:pale_oak_shelf";
  MinecraftBlockTypes2["PaleOakSlab"] = "minecraft:pale_oak_slab";
  MinecraftBlockTypes2["PaleOakStairs"] = "minecraft:pale_oak_stairs";
  MinecraftBlockTypes2["PaleOakStandingSign"] = "minecraft:pale_oak_standing_sign";
  MinecraftBlockTypes2["PaleOakTrapdoor"] = "minecraft:pale_oak_trapdoor";
  MinecraftBlockTypes2["PaleOakWallSign"] = "minecraft:pale_oak_wall_sign";
  MinecraftBlockTypes2["PaleOakWood"] = "minecraft:pale_oak_wood";
  MinecraftBlockTypes2["PearlescentFroglight"] = "minecraft:pearlescent_froglight";
  MinecraftBlockTypes2["Peony"] = "minecraft:peony";
  MinecraftBlockTypes2["PetrifiedOakDoubleSlab"] = "minecraft:petrified_oak_double_slab";
  MinecraftBlockTypes2["PetrifiedOakSlab"] = "minecraft:petrified_oak_slab";
  MinecraftBlockTypes2["PiglinHead"] = "minecraft:piglin_head";
  MinecraftBlockTypes2["PinkCandle"] = "minecraft:pink_candle";
  MinecraftBlockTypes2["PinkCandleCake"] = "minecraft:pink_candle_cake";
  MinecraftBlockTypes2["PinkCarpet"] = "minecraft:pink_carpet";
  MinecraftBlockTypes2["PinkConcrete"] = "minecraft:pink_concrete";
  MinecraftBlockTypes2["PinkConcretePowder"] = "minecraft:pink_concrete_powder";
  MinecraftBlockTypes2["PinkGlazedTerracotta"] = "minecraft:pink_glazed_terracotta";
  MinecraftBlockTypes2["PinkPetals"] = "minecraft:pink_petals";
  MinecraftBlockTypes2["PinkShulkerBox"] = "minecraft:pink_shulker_box";
  MinecraftBlockTypes2["PinkStainedGlass"] = "minecraft:pink_stained_glass";
  MinecraftBlockTypes2["PinkStainedGlassPane"] = "minecraft:pink_stained_glass_pane";
  MinecraftBlockTypes2["PinkTerracotta"] = "minecraft:pink_terracotta";
  MinecraftBlockTypes2["PinkTulip"] = "minecraft:pink_tulip";
  MinecraftBlockTypes2["PinkWool"] = "minecraft:pink_wool";
  MinecraftBlockTypes2["Piston"] = "minecraft:piston";
  MinecraftBlockTypes2["PistonArmCollision"] = "minecraft:piston_arm_collision";
  MinecraftBlockTypes2["PitcherCrop"] = "minecraft:pitcher_crop";
  MinecraftBlockTypes2["PitcherPlant"] = "minecraft:pitcher_plant";
  MinecraftBlockTypes2["PlayerHead"] = "minecraft:player_head";
  MinecraftBlockTypes2["Podzol"] = "minecraft:podzol";
  MinecraftBlockTypes2["PointedDripstone"] = "minecraft:pointed_dripstone";
  MinecraftBlockTypes2["PolishedAndesite"] = "minecraft:polished_andesite";
  MinecraftBlockTypes2["PolishedAndesiteDoubleSlab"] = "minecraft:polished_andesite_double_slab";
  MinecraftBlockTypes2["PolishedAndesiteSlab"] = "minecraft:polished_andesite_slab";
  MinecraftBlockTypes2["PolishedAndesiteStairs"] = "minecraft:polished_andesite_stairs";
  MinecraftBlockTypes2["PolishedBasalt"] = "minecraft:polished_basalt";
  MinecraftBlockTypes2["PolishedBlackstone"] = "minecraft:polished_blackstone";
  MinecraftBlockTypes2["PolishedBlackstoneBrickDoubleSlab"] = "minecraft:polished_blackstone_brick_double_slab";
  MinecraftBlockTypes2["PolishedBlackstoneBrickSlab"] = "minecraft:polished_blackstone_brick_slab";
  MinecraftBlockTypes2["PolishedBlackstoneBrickStairs"] = "minecraft:polished_blackstone_brick_stairs";
  MinecraftBlockTypes2["PolishedBlackstoneBrickWall"] = "minecraft:polished_blackstone_brick_wall";
  MinecraftBlockTypes2["PolishedBlackstoneBricks"] = "minecraft:polished_blackstone_bricks";
  MinecraftBlockTypes2["PolishedBlackstoneButton"] = "minecraft:polished_blackstone_button";
  MinecraftBlockTypes2["PolishedBlackstoneDoubleSlab"] = "minecraft:polished_blackstone_double_slab";
  MinecraftBlockTypes2["PolishedBlackstonePressurePlate"] = "minecraft:polished_blackstone_pressure_plate";
  MinecraftBlockTypes2["PolishedBlackstoneSlab"] = "minecraft:polished_blackstone_slab";
  MinecraftBlockTypes2["PolishedBlackstoneStairs"] = "minecraft:polished_blackstone_stairs";
  MinecraftBlockTypes2["PolishedBlackstoneWall"] = "minecraft:polished_blackstone_wall";
  MinecraftBlockTypes2["PolishedDeepslate"] = "minecraft:polished_deepslate";
  MinecraftBlockTypes2["PolishedDeepslateDoubleSlab"] = "minecraft:polished_deepslate_double_slab";
  MinecraftBlockTypes2["PolishedDeepslateSlab"] = "minecraft:polished_deepslate_slab";
  MinecraftBlockTypes2["PolishedDeepslateStairs"] = "minecraft:polished_deepslate_stairs";
  MinecraftBlockTypes2["PolishedDeepslateWall"] = "minecraft:polished_deepslate_wall";
  MinecraftBlockTypes2["PolishedDiorite"] = "minecraft:polished_diorite";
  MinecraftBlockTypes2["PolishedDioriteDoubleSlab"] = "minecraft:polished_diorite_double_slab";
  MinecraftBlockTypes2["PolishedDioriteSlab"] = "minecraft:polished_diorite_slab";
  MinecraftBlockTypes2["PolishedDioriteStairs"] = "minecraft:polished_diorite_stairs";
  MinecraftBlockTypes2["PolishedGranite"] = "minecraft:polished_granite";
  MinecraftBlockTypes2["PolishedGraniteDoubleSlab"] = "minecraft:polished_granite_double_slab";
  MinecraftBlockTypes2["PolishedGraniteSlab"] = "minecraft:polished_granite_slab";
  MinecraftBlockTypes2["PolishedGraniteStairs"] = "minecraft:polished_granite_stairs";
  MinecraftBlockTypes2["PolishedTuff"] = "minecraft:polished_tuff";
  MinecraftBlockTypes2["PolishedTuffDoubleSlab"] = "minecraft:polished_tuff_double_slab";
  MinecraftBlockTypes2["PolishedTuffSlab"] = "minecraft:polished_tuff_slab";
  MinecraftBlockTypes2["PolishedTuffStairs"] = "minecraft:polished_tuff_stairs";
  MinecraftBlockTypes2["PolishedTuffWall"] = "minecraft:polished_tuff_wall";
  MinecraftBlockTypes2["Poppy"] = "minecraft:poppy";
  MinecraftBlockTypes2["Portal"] = "minecraft:portal";
  MinecraftBlockTypes2["Potatoes"] = "minecraft:potatoes";
  MinecraftBlockTypes2["PowderSnow"] = "minecraft:powder_snow";
  MinecraftBlockTypes2["PoweredComparator"] = "minecraft:powered_comparator";
  MinecraftBlockTypes2["PoweredRepeater"] = "minecraft:powered_repeater";
  MinecraftBlockTypes2["Prismarine"] = "minecraft:prismarine";
  MinecraftBlockTypes2["PrismarineBrickDoubleSlab"] = "minecraft:prismarine_brick_double_slab";
  MinecraftBlockTypes2["PrismarineBrickSlab"] = "minecraft:prismarine_brick_slab";
  MinecraftBlockTypes2["PrismarineBricks"] = "minecraft:prismarine_bricks";
  MinecraftBlockTypes2["PrismarineBricksStairs"] = "minecraft:prismarine_bricks_stairs";
  MinecraftBlockTypes2["PrismarineDoubleSlab"] = "minecraft:prismarine_double_slab";
  MinecraftBlockTypes2["PrismarineSlab"] = "minecraft:prismarine_slab";
  MinecraftBlockTypes2["PrismarineStairs"] = "minecraft:prismarine_stairs";
  MinecraftBlockTypes2["PrismarineWall"] = "minecraft:prismarine_wall";
  MinecraftBlockTypes2["Pumpkin"] = "minecraft:pumpkin";
  MinecraftBlockTypes2["PumpkinStem"] = "minecraft:pumpkin_stem";
  MinecraftBlockTypes2["PurpleCandle"] = "minecraft:purple_candle";
  MinecraftBlockTypes2["PurpleCandleCake"] = "minecraft:purple_candle_cake";
  MinecraftBlockTypes2["PurpleCarpet"] = "minecraft:purple_carpet";
  MinecraftBlockTypes2["PurpleConcrete"] = "minecraft:purple_concrete";
  MinecraftBlockTypes2["PurpleConcretePowder"] = "minecraft:purple_concrete_powder";
  MinecraftBlockTypes2["PurpleGlazedTerracotta"] = "minecraft:purple_glazed_terracotta";
  MinecraftBlockTypes2["PurpleShulkerBox"] = "minecraft:purple_shulker_box";
  MinecraftBlockTypes2["PurpleStainedGlass"] = "minecraft:purple_stained_glass";
  MinecraftBlockTypes2["PurpleStainedGlassPane"] = "minecraft:purple_stained_glass_pane";
  MinecraftBlockTypes2["PurpleTerracotta"] = "minecraft:purple_terracotta";
  MinecraftBlockTypes2["PurpleWool"] = "minecraft:purple_wool";
  MinecraftBlockTypes2["PurpurBlock"] = "minecraft:purpur_block";
  MinecraftBlockTypes2["PurpurDoubleSlab"] = "minecraft:purpur_double_slab";
  MinecraftBlockTypes2["PurpurPillar"] = "minecraft:purpur_pillar";
  MinecraftBlockTypes2["PurpurSlab"] = "minecraft:purpur_slab";
  MinecraftBlockTypes2["PurpurStairs"] = "minecraft:purpur_stairs";
  MinecraftBlockTypes2["QuartzBlock"] = "minecraft:quartz_block";
  MinecraftBlockTypes2["QuartzBricks"] = "minecraft:quartz_bricks";
  MinecraftBlockTypes2["QuartzDoubleSlab"] = "minecraft:quartz_double_slab";
  MinecraftBlockTypes2["QuartzOre"] = "minecraft:quartz_ore";
  MinecraftBlockTypes2["QuartzPillar"] = "minecraft:quartz_pillar";
  MinecraftBlockTypes2["QuartzSlab"] = "minecraft:quartz_slab";
  MinecraftBlockTypes2["QuartzStairs"] = "minecraft:quartz_stairs";
  MinecraftBlockTypes2["Rail"] = "minecraft:rail";
  MinecraftBlockTypes2["RawCopperBlock"] = "minecraft:raw_copper_block";
  MinecraftBlockTypes2["RawGoldBlock"] = "minecraft:raw_gold_block";
  MinecraftBlockTypes2["RawIronBlock"] = "minecraft:raw_iron_block";
  MinecraftBlockTypes2["RedCandle"] = "minecraft:red_candle";
  MinecraftBlockTypes2["RedCandleCake"] = "minecraft:red_candle_cake";
  MinecraftBlockTypes2["RedCarpet"] = "minecraft:red_carpet";
  MinecraftBlockTypes2["RedConcrete"] = "minecraft:red_concrete";
  MinecraftBlockTypes2["RedConcretePowder"] = "minecraft:red_concrete_powder";
  MinecraftBlockTypes2["RedGlazedTerracotta"] = "minecraft:red_glazed_terracotta";
  MinecraftBlockTypes2["RedMushroom"] = "minecraft:red_mushroom";
  MinecraftBlockTypes2["RedMushroomBlock"] = "minecraft:red_mushroom_block";
  MinecraftBlockTypes2["RedNetherBrick"] = "minecraft:red_nether_brick";
  MinecraftBlockTypes2["RedNetherBrickDoubleSlab"] = "minecraft:red_nether_brick_double_slab";
  MinecraftBlockTypes2["RedNetherBrickSlab"] = "minecraft:red_nether_brick_slab";
  MinecraftBlockTypes2["RedNetherBrickStairs"] = "minecraft:red_nether_brick_stairs";
  MinecraftBlockTypes2["RedNetherBrickWall"] = "minecraft:red_nether_brick_wall";
  MinecraftBlockTypes2["RedSand"] = "minecraft:red_sand";
  MinecraftBlockTypes2["RedSandstone"] = "minecraft:red_sandstone";
  MinecraftBlockTypes2["RedSandstoneDoubleSlab"] = "minecraft:red_sandstone_double_slab";
  MinecraftBlockTypes2["RedSandstoneSlab"] = "minecraft:red_sandstone_slab";
  MinecraftBlockTypes2["RedSandstoneStairs"] = "minecraft:red_sandstone_stairs";
  MinecraftBlockTypes2["RedSandstoneWall"] = "minecraft:red_sandstone_wall";
  MinecraftBlockTypes2["RedShulkerBox"] = "minecraft:red_shulker_box";
  MinecraftBlockTypes2["RedStainedGlass"] = "minecraft:red_stained_glass";
  MinecraftBlockTypes2["RedStainedGlassPane"] = "minecraft:red_stained_glass_pane";
  MinecraftBlockTypes2["RedTerracotta"] = "minecraft:red_terracotta";
  MinecraftBlockTypes2["RedTulip"] = "minecraft:red_tulip";
  MinecraftBlockTypes2["RedWool"] = "minecraft:red_wool";
  MinecraftBlockTypes2["RedstoneBlock"] = "minecraft:redstone_block";
  MinecraftBlockTypes2["RedstoneLamp"] = "minecraft:redstone_lamp";
  MinecraftBlockTypes2["RedstoneOre"] = "minecraft:redstone_ore";
  MinecraftBlockTypes2["RedstoneTorch"] = "minecraft:redstone_torch";
  MinecraftBlockTypes2["RedstoneWire"] = "minecraft:redstone_wire";
  MinecraftBlockTypes2["Reeds"] = "minecraft:reeds";
  MinecraftBlockTypes2["ReinforcedDeepslate"] = "minecraft:reinforced_deepslate";
  MinecraftBlockTypes2["RepeatingCommandBlock"] = "minecraft:repeating_command_block";
  MinecraftBlockTypes2["ResinBlock"] = "minecraft:resin_block";
  MinecraftBlockTypes2["ResinBrickDoubleSlab"] = "minecraft:resin_brick_double_slab";
  MinecraftBlockTypes2["ResinBrickSlab"] = "minecraft:resin_brick_slab";
  MinecraftBlockTypes2["ResinBrickStairs"] = "minecraft:resin_brick_stairs";
  MinecraftBlockTypes2["ResinBrickWall"] = "minecraft:resin_brick_wall";
  MinecraftBlockTypes2["ResinBricks"] = "minecraft:resin_bricks";
  MinecraftBlockTypes2["ResinClump"] = "minecraft:resin_clump";
  MinecraftBlockTypes2["RespawnAnchor"] = "minecraft:respawn_anchor";
  MinecraftBlockTypes2["RoseBush"] = "minecraft:rose_bush";
  MinecraftBlockTypes2["Sand"] = "minecraft:sand";
  MinecraftBlockTypes2["Sandstone"] = "minecraft:sandstone";
  MinecraftBlockTypes2["SandstoneDoubleSlab"] = "minecraft:sandstone_double_slab";
  MinecraftBlockTypes2["SandstoneSlab"] = "minecraft:sandstone_slab";
  MinecraftBlockTypes2["SandstoneStairs"] = "minecraft:sandstone_stairs";
  MinecraftBlockTypes2["SandstoneWall"] = "minecraft:sandstone_wall";
  MinecraftBlockTypes2["Scaffolding"] = "minecraft:scaffolding";
  MinecraftBlockTypes2["Sculk"] = "minecraft:sculk";
  MinecraftBlockTypes2["SculkCatalyst"] = "minecraft:sculk_catalyst";
  MinecraftBlockTypes2["SculkSensor"] = "minecraft:sculk_sensor";
  MinecraftBlockTypes2["SculkShrieker"] = "minecraft:sculk_shrieker";
  MinecraftBlockTypes2["SculkVein"] = "minecraft:sculk_vein";
  MinecraftBlockTypes2["SeaLantern"] = "minecraft:sea_lantern";
  MinecraftBlockTypes2["SeaPickle"] = "minecraft:sea_pickle";
  MinecraftBlockTypes2["Seagrass"] = "minecraft:seagrass";
  MinecraftBlockTypes2["ShortDryGrass"] = "minecraft:short_dry_grass";
  MinecraftBlockTypes2["ShortGrass"] = "minecraft:short_grass";
  MinecraftBlockTypes2["Shroomlight"] = "minecraft:shroomlight";
  MinecraftBlockTypes2["SilverGlazedTerracotta"] = "minecraft:silver_glazed_terracotta";
  MinecraftBlockTypes2["SkeletonSkull"] = "minecraft:skeleton_skull";
  MinecraftBlockTypes2["Slime"] = "minecraft:slime";
  MinecraftBlockTypes2["SmallAmethystBud"] = "minecraft:small_amethyst_bud";
  MinecraftBlockTypes2["SmallDripleafBlock"] = "minecraft:small_dripleaf_block";
  MinecraftBlockTypes2["SmithingTable"] = "minecraft:smithing_table";
  MinecraftBlockTypes2["Smoker"] = "minecraft:smoker";
  MinecraftBlockTypes2["SmoothBasalt"] = "minecraft:smooth_basalt";
  MinecraftBlockTypes2["SmoothQuartz"] = "minecraft:smooth_quartz";
  MinecraftBlockTypes2["SmoothQuartzDoubleSlab"] = "minecraft:smooth_quartz_double_slab";
  MinecraftBlockTypes2["SmoothQuartzSlab"] = "minecraft:smooth_quartz_slab";
  MinecraftBlockTypes2["SmoothQuartzStairs"] = "minecraft:smooth_quartz_stairs";
  MinecraftBlockTypes2["SmoothRedSandstone"] = "minecraft:smooth_red_sandstone";
  MinecraftBlockTypes2["SmoothRedSandstoneDoubleSlab"] = "minecraft:smooth_red_sandstone_double_slab";
  MinecraftBlockTypes2["SmoothRedSandstoneSlab"] = "minecraft:smooth_red_sandstone_slab";
  MinecraftBlockTypes2["SmoothRedSandstoneStairs"] = "minecraft:smooth_red_sandstone_stairs";
  MinecraftBlockTypes2["SmoothSandstone"] = "minecraft:smooth_sandstone";
  MinecraftBlockTypes2["SmoothSandstoneDoubleSlab"] = "minecraft:smooth_sandstone_double_slab";
  MinecraftBlockTypes2["SmoothSandstoneSlab"] = "minecraft:smooth_sandstone_slab";
  MinecraftBlockTypes2["SmoothSandstoneStairs"] = "minecraft:smooth_sandstone_stairs";
  MinecraftBlockTypes2["SmoothStone"] = "minecraft:smooth_stone";
  MinecraftBlockTypes2["SmoothStoneDoubleSlab"] = "minecraft:smooth_stone_double_slab";
  MinecraftBlockTypes2["SmoothStoneSlab"] = "minecraft:smooth_stone_slab";
  MinecraftBlockTypes2["SnifferEgg"] = "minecraft:sniffer_egg";
  MinecraftBlockTypes2["Snow"] = "minecraft:snow";
  MinecraftBlockTypes2["SnowLayer"] = "minecraft:snow_layer";
  MinecraftBlockTypes2["SoulCampfire"] = "minecraft:soul_campfire";
  MinecraftBlockTypes2["SoulFire"] = "minecraft:soul_fire";
  MinecraftBlockTypes2["SoulLantern"] = "minecraft:soul_lantern";
  MinecraftBlockTypes2["SoulSand"] = "minecraft:soul_sand";
  MinecraftBlockTypes2["SoulSoil"] = "minecraft:soul_soil";
  MinecraftBlockTypes2["SoulTorch"] = "minecraft:soul_torch";
  MinecraftBlockTypes2["Sponge"] = "minecraft:sponge";
  MinecraftBlockTypes2["SporeBlossom"] = "minecraft:spore_blossom";
  MinecraftBlockTypes2["SpruceButton"] = "minecraft:spruce_button";
  MinecraftBlockTypes2["SpruceDoor"] = "minecraft:spruce_door";
  MinecraftBlockTypes2["SpruceDoubleSlab"] = "minecraft:spruce_double_slab";
  MinecraftBlockTypes2["SpruceFence"] = "minecraft:spruce_fence";
  MinecraftBlockTypes2["SpruceFenceGate"] = "minecraft:spruce_fence_gate";
  MinecraftBlockTypes2["SpruceHangingSign"] = "minecraft:spruce_hanging_sign";
  MinecraftBlockTypes2["SpruceLeaves"] = "minecraft:spruce_leaves";
  MinecraftBlockTypes2["SpruceLog"] = "minecraft:spruce_log";
  MinecraftBlockTypes2["SprucePlanks"] = "minecraft:spruce_planks";
  MinecraftBlockTypes2["SprucePressurePlate"] = "minecraft:spruce_pressure_plate";
  MinecraftBlockTypes2["SpruceSapling"] = "minecraft:spruce_sapling";
  MinecraftBlockTypes2["SpruceShelf"] = "minecraft:spruce_shelf";
  MinecraftBlockTypes2["SpruceSlab"] = "minecraft:spruce_slab";
  MinecraftBlockTypes2["SpruceStairs"] = "minecraft:spruce_stairs";
  MinecraftBlockTypes2["SpruceStandingSign"] = "minecraft:spruce_standing_sign";
  MinecraftBlockTypes2["SpruceTrapdoor"] = "minecraft:spruce_trapdoor";
  MinecraftBlockTypes2["SpruceWallSign"] = "minecraft:spruce_wall_sign";
  MinecraftBlockTypes2["SpruceWood"] = "minecraft:spruce_wood";
  MinecraftBlockTypes2["StandingBanner"] = "minecraft:standing_banner";
  MinecraftBlockTypes2["StandingSign"] = "minecraft:standing_sign";
  MinecraftBlockTypes2["StickyPiston"] = "minecraft:sticky_piston";
  MinecraftBlockTypes2["StickyPistonArmCollision"] = "minecraft:sticky_piston_arm_collision";
  MinecraftBlockTypes2["Stone"] = "minecraft:stone";
  MinecraftBlockTypes2["StoneBrickDoubleSlab"] = "minecraft:stone_brick_double_slab";
  MinecraftBlockTypes2["StoneBrickSlab"] = "minecraft:stone_brick_slab";
  MinecraftBlockTypes2["StoneBrickStairs"] = "minecraft:stone_brick_stairs";
  MinecraftBlockTypes2["StoneBrickWall"] = "minecraft:stone_brick_wall";
  MinecraftBlockTypes2["StoneBricks"] = "minecraft:stone_bricks";
  MinecraftBlockTypes2["StoneButton"] = "minecraft:stone_button";
  MinecraftBlockTypes2["StonePressurePlate"] = "minecraft:stone_pressure_plate";
  MinecraftBlockTypes2["StoneStairs"] = "minecraft:stone_stairs";
  MinecraftBlockTypes2["StonecutterBlock"] = "minecraft:stonecutter_block";
  MinecraftBlockTypes2["StrippedAcaciaLog"] = "minecraft:stripped_acacia_log";
  MinecraftBlockTypes2["StrippedAcaciaWood"] = "minecraft:stripped_acacia_wood";
  MinecraftBlockTypes2["StrippedBambooBlock"] = "minecraft:stripped_bamboo_block";
  MinecraftBlockTypes2["StrippedBirchLog"] = "minecraft:stripped_birch_log";
  MinecraftBlockTypes2["StrippedBirchWood"] = "minecraft:stripped_birch_wood";
  MinecraftBlockTypes2["StrippedCherryLog"] = "minecraft:stripped_cherry_log";
  MinecraftBlockTypes2["StrippedCherryWood"] = "minecraft:stripped_cherry_wood";
  MinecraftBlockTypes2["StrippedCrimsonHyphae"] = "minecraft:stripped_crimson_hyphae";
  MinecraftBlockTypes2["StrippedCrimsonStem"] = "minecraft:stripped_crimson_stem";
  MinecraftBlockTypes2["StrippedDarkOakLog"] = "minecraft:stripped_dark_oak_log";
  MinecraftBlockTypes2["StrippedDarkOakWood"] = "minecraft:stripped_dark_oak_wood";
  MinecraftBlockTypes2["StrippedJungleLog"] = "minecraft:stripped_jungle_log";
  MinecraftBlockTypes2["StrippedJungleWood"] = "minecraft:stripped_jungle_wood";
  MinecraftBlockTypes2["StrippedMangroveLog"] = "minecraft:stripped_mangrove_log";
  MinecraftBlockTypes2["StrippedMangroveWood"] = "minecraft:stripped_mangrove_wood";
  MinecraftBlockTypes2["StrippedOakLog"] = "minecraft:stripped_oak_log";
  MinecraftBlockTypes2["StrippedOakWood"] = "minecraft:stripped_oak_wood";
  MinecraftBlockTypes2["StrippedPaleOakLog"] = "minecraft:stripped_pale_oak_log";
  MinecraftBlockTypes2["StrippedPaleOakWood"] = "minecraft:stripped_pale_oak_wood";
  MinecraftBlockTypes2["StrippedSpruceLog"] = "minecraft:stripped_spruce_log";
  MinecraftBlockTypes2["StrippedSpruceWood"] = "minecraft:stripped_spruce_wood";
  MinecraftBlockTypes2["StrippedWarpedHyphae"] = "minecraft:stripped_warped_hyphae";
  MinecraftBlockTypes2["StrippedWarpedStem"] = "minecraft:stripped_warped_stem";
  MinecraftBlockTypes2["StructureBlock"] = "minecraft:structure_block";
  MinecraftBlockTypes2["StructureVoid"] = "minecraft:structure_void";
  MinecraftBlockTypes2["Sunflower"] = "minecraft:sunflower";
  MinecraftBlockTypes2["SuspiciousGravel"] = "minecraft:suspicious_gravel";
  MinecraftBlockTypes2["SuspiciousSand"] = "minecraft:suspicious_sand";
  MinecraftBlockTypes2["SweetBerryBush"] = "minecraft:sweet_berry_bush";
  MinecraftBlockTypes2["TallDryGrass"] = "minecraft:tall_dry_grass";
  MinecraftBlockTypes2["TallGrass"] = "minecraft:tall_grass";
  MinecraftBlockTypes2["Target"] = "minecraft:target";
  MinecraftBlockTypes2["TintedGlass"] = "minecraft:tinted_glass";
  MinecraftBlockTypes2["Tnt"] = "minecraft:tnt";
  MinecraftBlockTypes2["Torch"] = "minecraft:torch";
  MinecraftBlockTypes2["Torchflower"] = "minecraft:torchflower";
  MinecraftBlockTypes2["TorchflowerCrop"] = "minecraft:torchflower_crop";
  MinecraftBlockTypes2["Trapdoor"] = "minecraft:trapdoor";
  MinecraftBlockTypes2["TrappedChest"] = "minecraft:trapped_chest";
  MinecraftBlockTypes2["TrialSpawner"] = "minecraft:trial_spawner";
  MinecraftBlockTypes2["TripWire"] = "minecraft:trip_wire";
  MinecraftBlockTypes2["TripwireHook"] = "minecraft:tripwire_hook";
  MinecraftBlockTypes2["TubeCoral"] = "minecraft:tube_coral";
  MinecraftBlockTypes2["TubeCoralBlock"] = "minecraft:tube_coral_block";
  MinecraftBlockTypes2["TubeCoralFan"] = "minecraft:tube_coral_fan";
  MinecraftBlockTypes2["TubeCoralWallFan"] = "minecraft:tube_coral_wall_fan";
  MinecraftBlockTypes2["Tuff"] = "minecraft:tuff";
  MinecraftBlockTypes2["TuffBrickDoubleSlab"] = "minecraft:tuff_brick_double_slab";
  MinecraftBlockTypes2["TuffBrickSlab"] = "minecraft:tuff_brick_slab";
  MinecraftBlockTypes2["TuffBrickStairs"] = "minecraft:tuff_brick_stairs";
  MinecraftBlockTypes2["TuffBrickWall"] = "minecraft:tuff_brick_wall";
  MinecraftBlockTypes2["TuffBricks"] = "minecraft:tuff_bricks";
  MinecraftBlockTypes2["TuffDoubleSlab"] = "minecraft:tuff_double_slab";
  MinecraftBlockTypes2["TuffSlab"] = "minecraft:tuff_slab";
  MinecraftBlockTypes2["TuffStairs"] = "minecraft:tuff_stairs";
  MinecraftBlockTypes2["TuffWall"] = "minecraft:tuff_wall";
  MinecraftBlockTypes2["TurtleEgg"] = "minecraft:turtle_egg";
  MinecraftBlockTypes2["TwistingVines"] = "minecraft:twisting_vines";
  MinecraftBlockTypes2["UnderwaterTnt"] = "minecraft:underwater_tnt";
  MinecraftBlockTypes2["UnderwaterTorch"] = "minecraft:underwater_torch";
  MinecraftBlockTypes2["UndyedShulkerBox"] = "minecraft:undyed_shulker_box";
  MinecraftBlockTypes2["Unknown"] = "minecraft:unknown";
  MinecraftBlockTypes2["UnlitRedstoneTorch"] = "minecraft:unlit_redstone_torch";
  MinecraftBlockTypes2["UnpoweredComparator"] = "minecraft:unpowered_comparator";
  MinecraftBlockTypes2["UnpoweredRepeater"] = "minecraft:unpowered_repeater";
  MinecraftBlockTypes2["Vault"] = "minecraft:vault";
  MinecraftBlockTypes2["VerdantFroglight"] = "minecraft:verdant_froglight";
  MinecraftBlockTypes2["Vine"] = "minecraft:vine";
  MinecraftBlockTypes2["WallBanner"] = "minecraft:wall_banner";
  MinecraftBlockTypes2["WallSign"] = "minecraft:wall_sign";
  MinecraftBlockTypes2["WarpedButton"] = "minecraft:warped_button";
  MinecraftBlockTypes2["WarpedDoor"] = "minecraft:warped_door";
  MinecraftBlockTypes2["WarpedDoubleSlab"] = "minecraft:warped_double_slab";
  MinecraftBlockTypes2["WarpedFence"] = "minecraft:warped_fence";
  MinecraftBlockTypes2["WarpedFenceGate"] = "minecraft:warped_fence_gate";
  MinecraftBlockTypes2["WarpedFungus"] = "minecraft:warped_fungus";
  MinecraftBlockTypes2["WarpedHangingSign"] = "minecraft:warped_hanging_sign";
  MinecraftBlockTypes2["WarpedHyphae"] = "minecraft:warped_hyphae";
  MinecraftBlockTypes2["WarpedNylium"] = "minecraft:warped_nylium";
  MinecraftBlockTypes2["WarpedPlanks"] = "minecraft:warped_planks";
  MinecraftBlockTypes2["WarpedPressurePlate"] = "minecraft:warped_pressure_plate";
  MinecraftBlockTypes2["WarpedRoots"] = "minecraft:warped_roots";
  MinecraftBlockTypes2["WarpedShelf"] = "minecraft:warped_shelf";
  MinecraftBlockTypes2["WarpedSlab"] = "minecraft:warped_slab";
  MinecraftBlockTypes2["WarpedStairs"] = "minecraft:warped_stairs";
  MinecraftBlockTypes2["WarpedStandingSign"] = "minecraft:warped_standing_sign";
  MinecraftBlockTypes2["WarpedStem"] = "minecraft:warped_stem";
  MinecraftBlockTypes2["WarpedTrapdoor"] = "minecraft:warped_trapdoor";
  MinecraftBlockTypes2["WarpedWallSign"] = "minecraft:warped_wall_sign";
  MinecraftBlockTypes2["WarpedWartBlock"] = "minecraft:warped_wart_block";
  MinecraftBlockTypes2["Water"] = "minecraft:water";
  MinecraftBlockTypes2["Waterlily"] = "minecraft:waterlily";
  MinecraftBlockTypes2["WaxedChiseledCopper"] = "minecraft:waxed_chiseled_copper";
  MinecraftBlockTypes2["WaxedCopper"] = "minecraft:waxed_copper";
  MinecraftBlockTypes2["WaxedCopperBars"] = "minecraft:waxed_copper_bars";
  MinecraftBlockTypes2["WaxedCopperBulb"] = "minecraft:waxed_copper_bulb";
  MinecraftBlockTypes2["WaxedCopperChain"] = "minecraft:waxed_copper_chain";
  MinecraftBlockTypes2["WaxedCopperChest"] = "minecraft:waxed_copper_chest";
  MinecraftBlockTypes2["WaxedCopperDoor"] = "minecraft:waxed_copper_door";
  MinecraftBlockTypes2["WaxedCopperGolemStatue"] = "minecraft:waxed_copper_golem_statue";
  MinecraftBlockTypes2["WaxedCopperGrate"] = "minecraft:waxed_copper_grate";
  MinecraftBlockTypes2["WaxedCopperLantern"] = "minecraft:waxed_copper_lantern";
  MinecraftBlockTypes2["WaxedCopperTrapdoor"] = "minecraft:waxed_copper_trapdoor";
  MinecraftBlockTypes2["WaxedCutCopper"] = "minecraft:waxed_cut_copper";
  MinecraftBlockTypes2["WaxedCutCopperSlab"] = "minecraft:waxed_cut_copper_slab";
  MinecraftBlockTypes2["WaxedCutCopperStairs"] = "minecraft:waxed_cut_copper_stairs";
  MinecraftBlockTypes2["WaxedDoubleCutCopperSlab"] = "minecraft:waxed_double_cut_copper_slab";
  MinecraftBlockTypes2["WaxedExposedChiseledCopper"] = "minecraft:waxed_exposed_chiseled_copper";
  MinecraftBlockTypes2["WaxedExposedCopper"] = "minecraft:waxed_exposed_copper";
  MinecraftBlockTypes2["WaxedExposedCopperBars"] = "minecraft:waxed_exposed_copper_bars";
  MinecraftBlockTypes2["WaxedExposedCopperBulb"] = "minecraft:waxed_exposed_copper_bulb";
  MinecraftBlockTypes2["WaxedExposedCopperChain"] = "minecraft:waxed_exposed_copper_chain";
  MinecraftBlockTypes2["WaxedExposedCopperChest"] = "minecraft:waxed_exposed_copper_chest";
  MinecraftBlockTypes2["WaxedExposedCopperDoor"] = "minecraft:waxed_exposed_copper_door";
  MinecraftBlockTypes2["WaxedExposedCopperGolemStatue"] = "minecraft:waxed_exposed_copper_golem_statue";
  MinecraftBlockTypes2["WaxedExposedCopperGrate"] = "minecraft:waxed_exposed_copper_grate";
  MinecraftBlockTypes2["WaxedExposedCopperLantern"] = "minecraft:waxed_exposed_copper_lantern";
  MinecraftBlockTypes2["WaxedExposedCopperTrapdoor"] = "minecraft:waxed_exposed_copper_trapdoor";
  MinecraftBlockTypes2["WaxedExposedCutCopper"] = "minecraft:waxed_exposed_cut_copper";
  MinecraftBlockTypes2["WaxedExposedCutCopperSlab"] = "minecraft:waxed_exposed_cut_copper_slab";
  MinecraftBlockTypes2["WaxedExposedCutCopperStairs"] = "minecraft:waxed_exposed_cut_copper_stairs";
  MinecraftBlockTypes2["WaxedExposedDoubleCutCopperSlab"] = "minecraft:waxed_exposed_double_cut_copper_slab";
  MinecraftBlockTypes2["WaxedExposedLightningRod"] = "minecraft:waxed_exposed_lightning_rod";
  MinecraftBlockTypes2["WaxedLightningRod"] = "minecraft:waxed_lightning_rod";
  MinecraftBlockTypes2["WaxedOxidizedChiseledCopper"] = "minecraft:waxed_oxidized_chiseled_copper";
  MinecraftBlockTypes2["WaxedOxidizedCopper"] = "minecraft:waxed_oxidized_copper";
  MinecraftBlockTypes2["WaxedOxidizedCopperBars"] = "minecraft:waxed_oxidized_copper_bars";
  MinecraftBlockTypes2["WaxedOxidizedCopperBulb"] = "minecraft:waxed_oxidized_copper_bulb";
  MinecraftBlockTypes2["WaxedOxidizedCopperChain"] = "minecraft:waxed_oxidized_copper_chain";
  MinecraftBlockTypes2["WaxedOxidizedCopperChest"] = "minecraft:waxed_oxidized_copper_chest";
  MinecraftBlockTypes2["WaxedOxidizedCopperDoor"] = "minecraft:waxed_oxidized_copper_door";
  MinecraftBlockTypes2["WaxedOxidizedCopperGolemStatue"] = "minecraft:waxed_oxidized_copper_golem_statue";
  MinecraftBlockTypes2["WaxedOxidizedCopperGrate"] = "minecraft:waxed_oxidized_copper_grate";
  MinecraftBlockTypes2["WaxedOxidizedCopperLantern"] = "minecraft:waxed_oxidized_copper_lantern";
  MinecraftBlockTypes2["WaxedOxidizedCopperTrapdoor"] = "minecraft:waxed_oxidized_copper_trapdoor";
  MinecraftBlockTypes2["WaxedOxidizedCutCopper"] = "minecraft:waxed_oxidized_cut_copper";
  MinecraftBlockTypes2["WaxedOxidizedCutCopperSlab"] = "minecraft:waxed_oxidized_cut_copper_slab";
  MinecraftBlockTypes2["WaxedOxidizedCutCopperStairs"] = "minecraft:waxed_oxidized_cut_copper_stairs";
  MinecraftBlockTypes2["WaxedOxidizedDoubleCutCopperSlab"] = "minecraft:waxed_oxidized_double_cut_copper_slab";
  MinecraftBlockTypes2["WaxedOxidizedLightningRod"] = "minecraft:waxed_oxidized_lightning_rod";
  MinecraftBlockTypes2["WaxedWeatheredChiseledCopper"] = "minecraft:waxed_weathered_chiseled_copper";
  MinecraftBlockTypes2["WaxedWeatheredCopper"] = "minecraft:waxed_weathered_copper";
  MinecraftBlockTypes2["WaxedWeatheredCopperBars"] = "minecraft:waxed_weathered_copper_bars";
  MinecraftBlockTypes2["WaxedWeatheredCopperBulb"] = "minecraft:waxed_weathered_copper_bulb";
  MinecraftBlockTypes2["WaxedWeatheredCopperChain"] = "minecraft:waxed_weathered_copper_chain";
  MinecraftBlockTypes2["WaxedWeatheredCopperChest"] = "minecraft:waxed_weathered_copper_chest";
  MinecraftBlockTypes2["WaxedWeatheredCopperDoor"] = "minecraft:waxed_weathered_copper_door";
  MinecraftBlockTypes2["WaxedWeatheredCopperGolemStatue"] = "minecraft:waxed_weathered_copper_golem_statue";
  MinecraftBlockTypes2["WaxedWeatheredCopperGrate"] = "minecraft:waxed_weathered_copper_grate";
  MinecraftBlockTypes2["WaxedWeatheredCopperLantern"] = "minecraft:waxed_weathered_copper_lantern";
  MinecraftBlockTypes2["WaxedWeatheredCopperTrapdoor"] = "minecraft:waxed_weathered_copper_trapdoor";
  MinecraftBlockTypes2["WaxedWeatheredCutCopper"] = "minecraft:waxed_weathered_cut_copper";
  MinecraftBlockTypes2["WaxedWeatheredCutCopperSlab"] = "minecraft:waxed_weathered_cut_copper_slab";
  MinecraftBlockTypes2["WaxedWeatheredCutCopperStairs"] = "minecraft:waxed_weathered_cut_copper_stairs";
  MinecraftBlockTypes2["WaxedWeatheredDoubleCutCopperSlab"] = "minecraft:waxed_weathered_double_cut_copper_slab";
  MinecraftBlockTypes2["WaxedWeatheredLightningRod"] = "minecraft:waxed_weathered_lightning_rod";
  MinecraftBlockTypes2["WeatheredChiseledCopper"] = "minecraft:weathered_chiseled_copper";
  MinecraftBlockTypes2["WeatheredCopper"] = "minecraft:weathered_copper";
  MinecraftBlockTypes2["WeatheredCopperBars"] = "minecraft:weathered_copper_bars";
  MinecraftBlockTypes2["WeatheredCopperBulb"] = "minecraft:weathered_copper_bulb";
  MinecraftBlockTypes2["WeatheredCopperChain"] = "minecraft:weathered_copper_chain";
  MinecraftBlockTypes2["WeatheredCopperChest"] = "minecraft:weathered_copper_chest";
  MinecraftBlockTypes2["WeatheredCopperDoor"] = "minecraft:weathered_copper_door";
  MinecraftBlockTypes2["WeatheredCopperGolemStatue"] = "minecraft:weathered_copper_golem_statue";
  MinecraftBlockTypes2["WeatheredCopperGrate"] = "minecraft:weathered_copper_grate";
  MinecraftBlockTypes2["WeatheredCopperLantern"] = "minecraft:weathered_copper_lantern";
  MinecraftBlockTypes2["WeatheredCopperTrapdoor"] = "minecraft:weathered_copper_trapdoor";
  MinecraftBlockTypes2["WeatheredCutCopper"] = "minecraft:weathered_cut_copper";
  MinecraftBlockTypes2["WeatheredCutCopperSlab"] = "minecraft:weathered_cut_copper_slab";
  MinecraftBlockTypes2["WeatheredCutCopperStairs"] = "minecraft:weathered_cut_copper_stairs";
  MinecraftBlockTypes2["WeatheredDoubleCutCopperSlab"] = "minecraft:weathered_double_cut_copper_slab";
  MinecraftBlockTypes2["WeatheredLightningRod"] = "minecraft:weathered_lightning_rod";
  MinecraftBlockTypes2["Web"] = "minecraft:web";
  MinecraftBlockTypes2["WeepingVines"] = "minecraft:weeping_vines";
  MinecraftBlockTypes2["WetSponge"] = "minecraft:wet_sponge";
  MinecraftBlockTypes2["Wheat"] = "minecraft:wheat";
  MinecraftBlockTypes2["WhiteCandle"] = "minecraft:white_candle";
  MinecraftBlockTypes2["WhiteCandleCake"] = "minecraft:white_candle_cake";
  MinecraftBlockTypes2["WhiteCarpet"] = "minecraft:white_carpet";
  MinecraftBlockTypes2["WhiteConcrete"] = "minecraft:white_concrete";
  MinecraftBlockTypes2["WhiteConcretePowder"] = "minecraft:white_concrete_powder";
  MinecraftBlockTypes2["WhiteGlazedTerracotta"] = "minecraft:white_glazed_terracotta";
  MinecraftBlockTypes2["WhiteShulkerBox"] = "minecraft:white_shulker_box";
  MinecraftBlockTypes2["WhiteStainedGlass"] = "minecraft:white_stained_glass";
  MinecraftBlockTypes2["WhiteStainedGlassPane"] = "minecraft:white_stained_glass_pane";
  MinecraftBlockTypes2["WhiteTerracotta"] = "minecraft:white_terracotta";
  MinecraftBlockTypes2["WhiteTulip"] = "minecraft:white_tulip";
  MinecraftBlockTypes2["WhiteWool"] = "minecraft:white_wool";
  MinecraftBlockTypes2["Wildflowers"] = "minecraft:wildflowers";
  MinecraftBlockTypes2["WitherRose"] = "minecraft:wither_rose";
  MinecraftBlockTypes2["WitherSkeletonSkull"] = "minecraft:wither_skeleton_skull";
  MinecraftBlockTypes2["WoodenButton"] = "minecraft:wooden_button";
  MinecraftBlockTypes2["WoodenDoor"] = "minecraft:wooden_door";
  MinecraftBlockTypes2["WoodenPressurePlate"] = "minecraft:wooden_pressure_plate";
  MinecraftBlockTypes2["YellowCandle"] = "minecraft:yellow_candle";
  MinecraftBlockTypes2["YellowCandleCake"] = "minecraft:yellow_candle_cake";
  MinecraftBlockTypes2["YellowCarpet"] = "minecraft:yellow_carpet";
  MinecraftBlockTypes2["YellowConcrete"] = "minecraft:yellow_concrete";
  MinecraftBlockTypes2["YellowConcretePowder"] = "minecraft:yellow_concrete_powder";
  MinecraftBlockTypes2["YellowGlazedTerracotta"] = "minecraft:yellow_glazed_terracotta";
  MinecraftBlockTypes2["YellowShulkerBox"] = "minecraft:yellow_shulker_box";
  MinecraftBlockTypes2["YellowStainedGlass"] = "minecraft:yellow_stained_glass";
  MinecraftBlockTypes2["YellowStainedGlassPane"] = "minecraft:yellow_stained_glass_pane";
  MinecraftBlockTypes2["YellowTerracotta"] = "minecraft:yellow_terracotta";
  MinecraftBlockTypes2["YellowWool"] = "minecraft:yellow_wool";
  MinecraftBlockTypes2["ZombieHead"] = "minecraft:zombie_head";
  return MinecraftBlockTypes2;
})(MinecraftBlockTypes || {});
var MinecraftCameraPresetsTypes = ((MinecraftCameraPresetsTypes2) => {
  MinecraftCameraPresetsTypes2["ControlSchemeCamera"] = "minecraft:control_scheme_camera";
  MinecraftCameraPresetsTypes2["FirstPerson"] = "minecraft:first_person";
  MinecraftCameraPresetsTypes2["FixedBoom"] = "minecraft:fixed_boom";
  MinecraftCameraPresetsTypes2["FollowOrbit"] = "minecraft:follow_orbit";
  MinecraftCameraPresetsTypes2["Free"] = "minecraft:free";
  MinecraftCameraPresetsTypes2["ThirdPerson"] = "minecraft:third_person";
  MinecraftCameraPresetsTypes2["ThirdPersonFront"] = "minecraft:third_person_front";
  return MinecraftCameraPresetsTypes2;
})(MinecraftCameraPresetsTypes || {});
var MinecraftCooldownCategoryTypes = ((MinecraftCooldownCategoryTypes2) => {
  MinecraftCooldownCategoryTypes2["Chorusfruit"] = "minecraft:chorusfruit";
  MinecraftCooldownCategoryTypes2["EnderPearl"] = "minecraft:ender_pearl";
  MinecraftCooldownCategoryTypes2["GoatHorn"] = "minecraft:goat_horn";
  MinecraftCooldownCategoryTypes2["Shield"] = "minecraft:shield";
  MinecraftCooldownCategoryTypes2["Spear"] = "minecraft:spear";
  MinecraftCooldownCategoryTypes2["WindCharge"] = "minecraft:wind_charge";
  return MinecraftCooldownCategoryTypes2;
})(MinecraftCooldownCategoryTypes || {});
var MinecraftDimensionTypes = ((MinecraftDimensionTypes2) => {
  MinecraftDimensionTypes2["Nether"] = "minecraft:nether";
  MinecraftDimensionTypes2["Overworld"] = "minecraft:overworld";
  MinecraftDimensionTypes2["TheEnd"] = "minecraft:the_end";
  return MinecraftDimensionTypes2;
})(MinecraftDimensionTypes || {});
var MinecraftEffectTypes = ((MinecraftEffectTypes2) => {
  MinecraftEffectTypes2["Absorption"] = "minecraft:absorption";
  MinecraftEffectTypes2["BadOmen"] = "minecraft:bad_omen";
  MinecraftEffectTypes2["Blindness"] = "minecraft:blindness";
  MinecraftEffectTypes2["BreathOfTheNautilus"] = "minecraft:breath_of_the_nautilus";
  MinecraftEffectTypes2["ConduitPower"] = "minecraft:conduit_power";
  MinecraftEffectTypes2["Darkness"] = "minecraft:darkness";
  MinecraftEffectTypes2["FatalPoison"] = "minecraft:fatal_poison";
  MinecraftEffectTypes2["FireResistance"] = "minecraft:fire_resistance";
  MinecraftEffectTypes2["Haste"] = "minecraft:haste";
  MinecraftEffectTypes2["HealthBoost"] = "minecraft:health_boost";
  MinecraftEffectTypes2["Hunger"] = "minecraft:hunger";
  MinecraftEffectTypes2["Infested"] = "minecraft:infested";
  MinecraftEffectTypes2["InstantDamage"] = "minecraft:instant_damage";
  MinecraftEffectTypes2["InstantHealth"] = "minecraft:instant_health";
  MinecraftEffectTypes2["Invisibility"] = "minecraft:invisibility";
  MinecraftEffectTypes2["JumpBoost"] = "minecraft:jump_boost";
  MinecraftEffectTypes2["Levitation"] = "minecraft:levitation";
  MinecraftEffectTypes2["MiningFatigue"] = "minecraft:mining_fatigue";
  MinecraftEffectTypes2["Nausea"] = "minecraft:nausea";
  MinecraftEffectTypes2["NightVision"] = "minecraft:night_vision";
  MinecraftEffectTypes2["Oozing"] = "minecraft:oozing";
  MinecraftEffectTypes2["Poison"] = "minecraft:poison";
  MinecraftEffectTypes2["RaidOmen"] = "minecraft:raid_omen";
  MinecraftEffectTypes2["Regeneration"] = "minecraft:regeneration";
  MinecraftEffectTypes2["Resistance"] = "minecraft:resistance";
  MinecraftEffectTypes2["Saturation"] = "minecraft:saturation";
  MinecraftEffectTypes2["SlowFalling"] = "minecraft:slow_falling";
  MinecraftEffectTypes2["Slowness"] = "minecraft:slowness";
  MinecraftEffectTypes2["Speed"] = "minecraft:speed";
  MinecraftEffectTypes2["Strength"] = "minecraft:strength";
  MinecraftEffectTypes2["TrialOmen"] = "minecraft:trial_omen";
  MinecraftEffectTypes2["VillageHero"] = "minecraft:village_hero";
  MinecraftEffectTypes2["WaterBreathing"] = "minecraft:water_breathing";
  MinecraftEffectTypes2["Weakness"] = "minecraft:weakness";
  MinecraftEffectTypes2["Weaving"] = "minecraft:weaving";
  MinecraftEffectTypes2["WindCharged"] = "minecraft:wind_charged";
  MinecraftEffectTypes2["Wither"] = "minecraft:wither";
  return MinecraftEffectTypes2;
})(MinecraftEffectTypes || {});
var MinecraftEnchantmentTypes = ((MinecraftEnchantmentTypes2) => {
  MinecraftEnchantmentTypes2["AquaAffinity"] = "minecraft:aqua_affinity";
  MinecraftEnchantmentTypes2["BaneOfArthropods"] = "minecraft:bane_of_arthropods";
  MinecraftEnchantmentTypes2["Binding"] = "minecraft:binding";
  MinecraftEnchantmentTypes2["BlastProtection"] = "minecraft:blast_protection";
  MinecraftEnchantmentTypes2["BowInfinity"] = "minecraft:infinity";
  MinecraftEnchantmentTypes2["Breach"] = "minecraft:breach";
  MinecraftEnchantmentTypes2["Channeling"] = "minecraft:channeling";
  MinecraftEnchantmentTypes2["Density"] = "minecraft:density";
  MinecraftEnchantmentTypes2["DepthStrider"] = "minecraft:depth_strider";
  MinecraftEnchantmentTypes2["Efficiency"] = "minecraft:efficiency";
  MinecraftEnchantmentTypes2["FeatherFalling"] = "minecraft:feather_falling";
  MinecraftEnchantmentTypes2["FireAspect"] = "minecraft:fire_aspect";
  MinecraftEnchantmentTypes2["FireProtection"] = "minecraft:fire_protection";
  MinecraftEnchantmentTypes2["Flame"] = "minecraft:flame";
  MinecraftEnchantmentTypes2["Fortune"] = "minecraft:fortune";
  MinecraftEnchantmentTypes2["FrostWalker"] = "minecraft:frost_walker";
  MinecraftEnchantmentTypes2["Impaling"] = "minecraft:impaling";
  MinecraftEnchantmentTypes2["Knockback"] = "minecraft:knockback";
  MinecraftEnchantmentTypes2["Looting"] = "minecraft:looting";
  MinecraftEnchantmentTypes2["Loyalty"] = "minecraft:loyalty";
  MinecraftEnchantmentTypes2["LuckOfTheSea"] = "minecraft:luck_of_the_sea";
  MinecraftEnchantmentTypes2["Lunge"] = "minecraft:lunge";
  MinecraftEnchantmentTypes2["Lure"] = "minecraft:lure";
  MinecraftEnchantmentTypes2["Mending"] = "minecraft:mending";
  MinecraftEnchantmentTypes2["Multishot"] = "minecraft:multishot";
  MinecraftEnchantmentTypes2["Piercing"] = "minecraft:piercing";
  MinecraftEnchantmentTypes2["Power"] = "minecraft:power";
  MinecraftEnchantmentTypes2["ProjectileProtection"] = "minecraft:projectile_protection";
  MinecraftEnchantmentTypes2["Protection"] = "minecraft:protection";
  MinecraftEnchantmentTypes2["Punch"] = "minecraft:punch";
  MinecraftEnchantmentTypes2["QuickCharge"] = "minecraft:quick_charge";
  MinecraftEnchantmentTypes2["Respiration"] = "minecraft:respiration";
  MinecraftEnchantmentTypes2["Riptide"] = "minecraft:riptide";
  MinecraftEnchantmentTypes2["Sharpness"] = "minecraft:sharpness";
  MinecraftEnchantmentTypes2["SilkTouch"] = "minecraft:silk_touch";
  MinecraftEnchantmentTypes2["Smite"] = "minecraft:smite";
  MinecraftEnchantmentTypes2["SoulSpeed"] = "minecraft:soul_speed";
  MinecraftEnchantmentTypes2["SwiftSneak"] = "minecraft:swift_sneak";
  MinecraftEnchantmentTypes2["Thorns"] = "minecraft:thorns";
  MinecraftEnchantmentTypes2["Unbreaking"] = "minecraft:unbreaking";
  MinecraftEnchantmentTypes2["Vanishing"] = "minecraft:vanishing";
  MinecraftEnchantmentTypes2["WindBurst"] = "minecraft:wind_burst";
  return MinecraftEnchantmentTypes2;
})(MinecraftEnchantmentTypes || {});
var MinecraftEntityTypes = ((MinecraftEntityTypes2) => {
  MinecraftEntityTypes2["Agent"] = "minecraft:agent";
  MinecraftEntityTypes2["Allay"] = "minecraft:allay";
  MinecraftEntityTypes2["AreaEffectCloud"] = "minecraft:area_effect_cloud";
  MinecraftEntityTypes2["Armadillo"] = "minecraft:armadillo";
  MinecraftEntityTypes2["ArmorStand"] = "minecraft:armor_stand";
  MinecraftEntityTypes2["Arrow"] = "minecraft:arrow";
  MinecraftEntityTypes2["Axolotl"] = "minecraft:axolotl";
  MinecraftEntityTypes2["Bat"] = "minecraft:bat";
  MinecraftEntityTypes2["Bee"] = "minecraft:bee";
  MinecraftEntityTypes2["Blaze"] = "minecraft:blaze";
  MinecraftEntityTypes2["Boat"] = "minecraft:boat";
  MinecraftEntityTypes2["Bogged"] = "minecraft:bogged";
  MinecraftEntityTypes2["Breeze"] = "minecraft:breeze";
  MinecraftEntityTypes2["BreezeWindChargeProjectile"] = "minecraft:breeze_wind_charge_projectile";
  MinecraftEntityTypes2["Camel"] = "minecraft:camel";
  MinecraftEntityTypes2["CamelHusk"] = "minecraft:camel_husk";
  MinecraftEntityTypes2["Cat"] = "minecraft:cat";
  MinecraftEntityTypes2["CaveSpider"] = "minecraft:cave_spider";
  MinecraftEntityTypes2["ChestBoat"] = "minecraft:chest_boat";
  MinecraftEntityTypes2["ChestMinecart"] = "minecraft:chest_minecart";
  MinecraftEntityTypes2["Chicken"] = "minecraft:chicken";
  MinecraftEntityTypes2["Cod"] = "minecraft:cod";
  MinecraftEntityTypes2["CommandBlockMinecart"] = "minecraft:command_block_minecart";
  MinecraftEntityTypes2["CopperGolem"] = "minecraft:copper_golem";
  MinecraftEntityTypes2["Cow"] = "minecraft:cow";
  MinecraftEntityTypes2["Creaking"] = "minecraft:creaking";
  MinecraftEntityTypes2["Creeper"] = "minecraft:creeper";
  MinecraftEntityTypes2["Dolphin"] = "minecraft:dolphin";
  MinecraftEntityTypes2["Donkey"] = "minecraft:donkey";
  MinecraftEntityTypes2["DragonFireball"] = "minecraft:dragon_fireball";
  MinecraftEntityTypes2["Drowned"] = "minecraft:drowned";
  MinecraftEntityTypes2["Egg"] = "minecraft:egg";
  MinecraftEntityTypes2["ElderGuardian"] = "minecraft:elder_guardian";
  MinecraftEntityTypes2["EnderCrystal"] = "minecraft:ender_crystal";
  MinecraftEntityTypes2["EnderDragon"] = "minecraft:ender_dragon";
  MinecraftEntityTypes2["EnderPearl"] = "minecraft:ender_pearl";
  MinecraftEntityTypes2["Enderman"] = "minecraft:enderman";
  MinecraftEntityTypes2["Endermite"] = "minecraft:endermite";
  MinecraftEntityTypes2["EvocationIllager"] = "minecraft:evocation_illager";
  MinecraftEntityTypes2["EyeOfEnderSignal"] = "minecraft:eye_of_ender_signal";
  MinecraftEntityTypes2["Fireball"] = "minecraft:fireball";
  MinecraftEntityTypes2["FireworksRocket"] = "minecraft:fireworks_rocket";
  MinecraftEntityTypes2["FishingHook"] = "minecraft:fishing_hook";
  MinecraftEntityTypes2["Fox"] = "minecraft:fox";
  MinecraftEntityTypes2["Frog"] = "minecraft:frog";
  MinecraftEntityTypes2["Ghast"] = "minecraft:ghast";
  MinecraftEntityTypes2["GlowSquid"] = "minecraft:glow_squid";
  MinecraftEntityTypes2["Goat"] = "minecraft:goat";
  MinecraftEntityTypes2["Guardian"] = "minecraft:guardian";
  MinecraftEntityTypes2["HappyGhast"] = "minecraft:happy_ghast";
  MinecraftEntityTypes2["Hoglin"] = "minecraft:hoglin";
  MinecraftEntityTypes2["HopperMinecart"] = "minecraft:hopper_minecart";
  MinecraftEntityTypes2["Horse"] = "minecraft:horse";
  MinecraftEntityTypes2["Husk"] = "minecraft:husk";
  MinecraftEntityTypes2["IronGolem"] = "minecraft:iron_golem";
  MinecraftEntityTypes2["LightningBolt"] = "minecraft:lightning_bolt";
  MinecraftEntityTypes2["LingeringPotion"] = "minecraft:lingering_potion";
  MinecraftEntityTypes2["Llama"] = "minecraft:llama";
  MinecraftEntityTypes2["LlamaSpit"] = "minecraft:llama_spit";
  MinecraftEntityTypes2["MagmaCube"] = "minecraft:magma_cube";
  MinecraftEntityTypes2["Minecart"] = "minecraft:minecart";
  MinecraftEntityTypes2["Mooshroom"] = "minecraft:mooshroom";
  MinecraftEntityTypes2["Mule"] = "minecraft:mule";
  MinecraftEntityTypes2["Nautilus"] = "minecraft:nautilus";
  MinecraftEntityTypes2["Npc"] = "minecraft:npc";
  MinecraftEntityTypes2["Ocelot"] = "minecraft:ocelot";
  MinecraftEntityTypes2["OminousItemSpawner"] = "minecraft:ominous_item_spawner";
  MinecraftEntityTypes2["Panda"] = "minecraft:panda";
  MinecraftEntityTypes2["Parched"] = "minecraft:parched";
  MinecraftEntityTypes2["Parrot"] = "minecraft:parrot";
  MinecraftEntityTypes2["Phantom"] = "minecraft:phantom";
  MinecraftEntityTypes2["Pig"] = "minecraft:pig";
  MinecraftEntityTypes2["Piglin"] = "minecraft:piglin";
  MinecraftEntityTypes2["PiglinBrute"] = "minecraft:piglin_brute";
  MinecraftEntityTypes2["Pillager"] = "minecraft:pillager";
  MinecraftEntityTypes2["Player"] = "minecraft:player";
  MinecraftEntityTypes2["PolarBear"] = "minecraft:polar_bear";
  MinecraftEntityTypes2["Pufferfish"] = "minecraft:pufferfish";
  MinecraftEntityTypes2["Rabbit"] = "minecraft:rabbit";
  MinecraftEntityTypes2["Ravager"] = "minecraft:ravager";
  MinecraftEntityTypes2["Salmon"] = "minecraft:salmon";
  MinecraftEntityTypes2["Sheep"] = "minecraft:sheep";
  MinecraftEntityTypes2["Shulker"] = "minecraft:shulker";
  MinecraftEntityTypes2["ShulkerBullet"] = "minecraft:shulker_bullet";
  MinecraftEntityTypes2["Silverfish"] = "minecraft:silverfish";
  MinecraftEntityTypes2["Skeleton"] = "minecraft:skeleton";
  MinecraftEntityTypes2["SkeletonHorse"] = "minecraft:skeleton_horse";
  MinecraftEntityTypes2["Slime"] = "minecraft:slime";
  MinecraftEntityTypes2["SmallFireball"] = "minecraft:small_fireball";
  MinecraftEntityTypes2["Sniffer"] = "minecraft:sniffer";
  MinecraftEntityTypes2["SnowGolem"] = "minecraft:snow_golem";
  MinecraftEntityTypes2["Snowball"] = "minecraft:snowball";
  MinecraftEntityTypes2["Spider"] = "minecraft:spider";
  MinecraftEntityTypes2["SplashPotion"] = "minecraft:splash_potion";
  MinecraftEntityTypes2["Squid"] = "minecraft:squid";
  MinecraftEntityTypes2["Stray"] = "minecraft:stray";
  MinecraftEntityTypes2["Strider"] = "minecraft:strider";
  MinecraftEntityTypes2["Tadpole"] = "minecraft:tadpole";
  MinecraftEntityTypes2["ThrownTrident"] = "minecraft:thrown_trident";
  MinecraftEntityTypes2["Tnt"] = "minecraft:tnt";
  MinecraftEntityTypes2["TntMinecart"] = "minecraft:tnt_minecart";
  MinecraftEntityTypes2["TraderLlama"] = "minecraft:trader_llama";
  MinecraftEntityTypes2["TripodCamera"] = "minecraft:tripod_camera";
  MinecraftEntityTypes2["Tropicalfish"] = "minecraft:tropicalfish";
  MinecraftEntityTypes2["Turtle"] = "minecraft:turtle";
  MinecraftEntityTypes2["Vex"] = "minecraft:vex";
  MinecraftEntityTypes2["Villager"] = "minecraft:villager";
  MinecraftEntityTypes2["VillagerV2"] = "minecraft:villager_v2";
  MinecraftEntityTypes2["Vindicator"] = "minecraft:vindicator";
  MinecraftEntityTypes2["WanderingTrader"] = "minecraft:wandering_trader";
  MinecraftEntityTypes2["Warden"] = "minecraft:warden";
  MinecraftEntityTypes2["WindChargeProjectile"] = "minecraft:wind_charge_projectile";
  MinecraftEntityTypes2["Witch"] = "minecraft:witch";
  MinecraftEntityTypes2["Wither"] = "minecraft:wither";
  MinecraftEntityTypes2["WitherSkeleton"] = "minecraft:wither_skeleton";
  MinecraftEntityTypes2["WitherSkull"] = "minecraft:wither_skull";
  MinecraftEntityTypes2["WitherSkullDangerous"] = "minecraft:wither_skull_dangerous";
  MinecraftEntityTypes2["Wolf"] = "minecraft:wolf";
  MinecraftEntityTypes2["XpBottle"] = "minecraft:xp_bottle";
  MinecraftEntityTypes2["XpOrb"] = "minecraft:xp_orb";
  MinecraftEntityTypes2["Zoglin"] = "minecraft:zoglin";
  MinecraftEntityTypes2["Zombie"] = "minecraft:zombie";
  MinecraftEntityTypes2["ZombieHorse"] = "minecraft:zombie_horse";
  MinecraftEntityTypes2["ZombieNautilus"] = "minecraft:zombie_nautilus";
  MinecraftEntityTypes2["ZombiePigman"] = "minecraft:zombie_pigman";
  MinecraftEntityTypes2["ZombieVillager"] = "minecraft:zombie_villager";
  MinecraftEntityTypes2["ZombieVillagerV2"] = "minecraft:zombie_villager_v2";
  return MinecraftEntityTypes2;
})(MinecraftEntityTypes || {});
var MinecraftFeatureTypes = ((MinecraftFeatureTypes2) => {
  MinecraftFeatureTypes2["AncientCity"] = "minecraft:ancient_city";
  MinecraftFeatureTypes2["BastionRemnant"] = "minecraft:bastion_remnant";
  MinecraftFeatureTypes2["BuriedTreasure"] = "minecraft:buried_treasure";
  MinecraftFeatureTypes2["EndCity"] = "minecraft:end_city";
  MinecraftFeatureTypes2["Fortress"] = "minecraft:fortress";
  MinecraftFeatureTypes2["Mansion"] = "minecraft:mansion";
  MinecraftFeatureTypes2["Mineshaft"] = "minecraft:mineshaft";
  MinecraftFeatureTypes2["Monument"] = "minecraft:monument";
  MinecraftFeatureTypes2["PillagerOutpost"] = "minecraft:pillager_outpost";
  MinecraftFeatureTypes2["RuinedPortal"] = "minecraft:ruined_portal";
  MinecraftFeatureTypes2["Ruins"] = "minecraft:ruins";
  MinecraftFeatureTypes2["Shipwreck"] = "minecraft:shipwreck";
  MinecraftFeatureTypes2["Stronghold"] = "minecraft:stronghold";
  MinecraftFeatureTypes2["Temple"] = "minecraft:temple";
  MinecraftFeatureTypes2["TrailRuins"] = "minecraft:trail_ruins";
  MinecraftFeatureTypes2["TrialChambers"] = "minecraft:trial_chambers";
  MinecraftFeatureTypes2["Village"] = "minecraft:village";
  return MinecraftFeatureTypes2;
})(MinecraftFeatureTypes || {});
var MinecraftItemTypes = ((MinecraftItemTypes2) => {
  MinecraftItemTypes2["AcaciaBoat"] = "minecraft:acacia_boat";
  MinecraftItemTypes2["AcaciaButton"] = "minecraft:acacia_button";
  MinecraftItemTypes2["AcaciaChestBoat"] = "minecraft:acacia_chest_boat";
  MinecraftItemTypes2["AcaciaDoor"] = "minecraft:acacia_door";
  MinecraftItemTypes2["AcaciaFence"] = "minecraft:acacia_fence";
  MinecraftItemTypes2["AcaciaFenceGate"] = "minecraft:acacia_fence_gate";
  MinecraftItemTypes2["AcaciaHangingSign"] = "minecraft:acacia_hanging_sign";
  MinecraftItemTypes2["AcaciaLeaves"] = "minecraft:acacia_leaves";
  MinecraftItemTypes2["AcaciaLog"] = "minecraft:acacia_log";
  MinecraftItemTypes2["AcaciaPlanks"] = "minecraft:acacia_planks";
  MinecraftItemTypes2["AcaciaPressurePlate"] = "minecraft:acacia_pressure_plate";
  MinecraftItemTypes2["AcaciaSapling"] = "minecraft:acacia_sapling";
  MinecraftItemTypes2["AcaciaShelf"] = "minecraft:acacia_shelf";
  MinecraftItemTypes2["AcaciaSign"] = "minecraft:acacia_sign";
  MinecraftItemTypes2["AcaciaSlab"] = "minecraft:acacia_slab";
  MinecraftItemTypes2["AcaciaStairs"] = "minecraft:acacia_stairs";
  MinecraftItemTypes2["AcaciaTrapdoor"] = "minecraft:acacia_trapdoor";
  MinecraftItemTypes2["AcaciaWood"] = "minecraft:acacia_wood";
  MinecraftItemTypes2["ActivatorRail"] = "minecraft:activator_rail";
  MinecraftItemTypes2["AllaySpawnEgg"] = "minecraft:allay_spawn_egg";
  MinecraftItemTypes2["Allium"] = "minecraft:allium";
  MinecraftItemTypes2["Allow"] = "minecraft:allow";
  MinecraftItemTypes2["AmethystBlock"] = "minecraft:amethyst_block";
  MinecraftItemTypes2["AmethystCluster"] = "minecraft:amethyst_cluster";
  MinecraftItemTypes2["AmethystShard"] = "minecraft:amethyst_shard";
  MinecraftItemTypes2["AncientDebris"] = "minecraft:ancient_debris";
  MinecraftItemTypes2["Andesite"] = "minecraft:andesite";
  MinecraftItemTypes2["AndesiteSlab"] = "minecraft:andesite_slab";
  MinecraftItemTypes2["AndesiteStairs"] = "minecraft:andesite_stairs";
  MinecraftItemTypes2["AndesiteWall"] = "minecraft:andesite_wall";
  MinecraftItemTypes2["AnglerPotterySherd"] = "minecraft:angler_pottery_sherd";
  MinecraftItemTypes2["Anvil"] = "minecraft:anvil";
  MinecraftItemTypes2["Apple"] = "minecraft:apple";
  MinecraftItemTypes2["ArcherPotterySherd"] = "minecraft:archer_pottery_sherd";
  MinecraftItemTypes2["ArmadilloScute"] = "minecraft:armadillo_scute";
  MinecraftItemTypes2["ArmadilloSpawnEgg"] = "minecraft:armadillo_spawn_egg";
  MinecraftItemTypes2["ArmorStand"] = "minecraft:armor_stand";
  MinecraftItemTypes2["ArmsUpPotterySherd"] = "minecraft:arms_up_pottery_sherd";
  MinecraftItemTypes2["Arrow"] = "minecraft:arrow";
  MinecraftItemTypes2["AxolotlBucket"] = "minecraft:axolotl_bucket";
  MinecraftItemTypes2["AxolotlSpawnEgg"] = "minecraft:axolotl_spawn_egg";
  MinecraftItemTypes2["Azalea"] = "minecraft:azalea";
  MinecraftItemTypes2["AzaleaLeaves"] = "minecraft:azalea_leaves";
  MinecraftItemTypes2["AzaleaLeavesFlowered"] = "minecraft:azalea_leaves_flowered";
  MinecraftItemTypes2["AzureBluet"] = "minecraft:azure_bluet";
  MinecraftItemTypes2["BakedPotato"] = "minecraft:baked_potato";
  MinecraftItemTypes2["Bamboo"] = "minecraft:bamboo";
  MinecraftItemTypes2["BambooBlock"] = "minecraft:bamboo_block";
  MinecraftItemTypes2["BambooButton"] = "minecraft:bamboo_button";
  MinecraftItemTypes2["BambooChestRaft"] = "minecraft:bamboo_chest_raft";
  MinecraftItemTypes2["BambooDoor"] = "minecraft:bamboo_door";
  MinecraftItemTypes2["BambooFence"] = "minecraft:bamboo_fence";
  MinecraftItemTypes2["BambooFenceGate"] = "minecraft:bamboo_fence_gate";
  MinecraftItemTypes2["BambooHangingSign"] = "minecraft:bamboo_hanging_sign";
  MinecraftItemTypes2["BambooMosaic"] = "minecraft:bamboo_mosaic";
  MinecraftItemTypes2["BambooMosaicSlab"] = "minecraft:bamboo_mosaic_slab";
  MinecraftItemTypes2["BambooMosaicStairs"] = "minecraft:bamboo_mosaic_stairs";
  MinecraftItemTypes2["BambooPlanks"] = "minecraft:bamboo_planks";
  MinecraftItemTypes2["BambooPressurePlate"] = "minecraft:bamboo_pressure_plate";
  MinecraftItemTypes2["BambooRaft"] = "minecraft:bamboo_raft";
  MinecraftItemTypes2["BambooShelf"] = "minecraft:bamboo_shelf";
  MinecraftItemTypes2["BambooSign"] = "minecraft:bamboo_sign";
  MinecraftItemTypes2["BambooSlab"] = "minecraft:bamboo_slab";
  MinecraftItemTypes2["BambooStairs"] = "minecraft:bamboo_stairs";
  MinecraftItemTypes2["BambooTrapdoor"] = "minecraft:bamboo_trapdoor";
  MinecraftItemTypes2["Banner"] = "minecraft:banner";
  MinecraftItemTypes2["Barrel"] = "minecraft:barrel";
  MinecraftItemTypes2["Barrier"] = "minecraft:barrier";
  MinecraftItemTypes2["Basalt"] = "minecraft:basalt";
  MinecraftItemTypes2["BatSpawnEgg"] = "minecraft:bat_spawn_egg";
  MinecraftItemTypes2["Beacon"] = "minecraft:beacon";
  MinecraftItemTypes2["Bed"] = "minecraft:bed";
  MinecraftItemTypes2["Bedrock"] = "minecraft:bedrock";
  MinecraftItemTypes2["BeeNest"] = "minecraft:bee_nest";
  MinecraftItemTypes2["BeeSpawnEgg"] = "minecraft:bee_spawn_egg";
  MinecraftItemTypes2["Beef"] = "minecraft:beef";
  MinecraftItemTypes2["Beehive"] = "minecraft:beehive";
  MinecraftItemTypes2["Beetroot"] = "minecraft:beetroot";
  MinecraftItemTypes2["BeetrootSeeds"] = "minecraft:beetroot_seeds";
  MinecraftItemTypes2["BeetrootSoup"] = "minecraft:beetroot_soup";
  MinecraftItemTypes2["Bell"] = "minecraft:bell";
  MinecraftItemTypes2["BigDripleaf"] = "minecraft:big_dripleaf";
  MinecraftItemTypes2["BirchBoat"] = "minecraft:birch_boat";
  MinecraftItemTypes2["BirchButton"] = "minecraft:birch_button";
  MinecraftItemTypes2["BirchChestBoat"] = "minecraft:birch_chest_boat";
  MinecraftItemTypes2["BirchDoor"] = "minecraft:birch_door";
  MinecraftItemTypes2["BirchFence"] = "minecraft:birch_fence";
  MinecraftItemTypes2["BirchFenceGate"] = "minecraft:birch_fence_gate";
  MinecraftItemTypes2["BirchHangingSign"] = "minecraft:birch_hanging_sign";
  MinecraftItemTypes2["BirchLeaves"] = "minecraft:birch_leaves";
  MinecraftItemTypes2["BirchLog"] = "minecraft:birch_log";
  MinecraftItemTypes2["BirchPlanks"] = "minecraft:birch_planks";
  MinecraftItemTypes2["BirchPressurePlate"] = "minecraft:birch_pressure_plate";
  MinecraftItemTypes2["BirchSapling"] = "minecraft:birch_sapling";
  MinecraftItemTypes2["BirchShelf"] = "minecraft:birch_shelf";
  MinecraftItemTypes2["BirchSign"] = "minecraft:birch_sign";
  MinecraftItemTypes2["BirchSlab"] = "minecraft:birch_slab";
  MinecraftItemTypes2["BirchStairs"] = "minecraft:birch_stairs";
  MinecraftItemTypes2["BirchTrapdoor"] = "minecraft:birch_trapdoor";
  MinecraftItemTypes2["BirchWood"] = "minecraft:birch_wood";
  MinecraftItemTypes2["BlackBundle"] = "minecraft:black_bundle";
  MinecraftItemTypes2["BlackCandle"] = "minecraft:black_candle";
  MinecraftItemTypes2["BlackCarpet"] = "minecraft:black_carpet";
  MinecraftItemTypes2["BlackConcrete"] = "minecraft:black_concrete";
  MinecraftItemTypes2["BlackConcretePowder"] = "minecraft:black_concrete_powder";
  MinecraftItemTypes2["BlackDye"] = "minecraft:black_dye";
  MinecraftItemTypes2["BlackGlazedTerracotta"] = "minecraft:black_glazed_terracotta";
  MinecraftItemTypes2["BlackHarness"] = "minecraft:black_harness";
  MinecraftItemTypes2["BlackShulkerBox"] = "minecraft:black_shulker_box";
  MinecraftItemTypes2["BlackStainedGlass"] = "minecraft:black_stained_glass";
  MinecraftItemTypes2["BlackStainedGlassPane"] = "minecraft:black_stained_glass_pane";
  MinecraftItemTypes2["BlackTerracotta"] = "minecraft:black_terracotta";
  MinecraftItemTypes2["BlackWool"] = "minecraft:black_wool";
  MinecraftItemTypes2["Blackstone"] = "minecraft:blackstone";
  MinecraftItemTypes2["BlackstoneSlab"] = "minecraft:blackstone_slab";
  MinecraftItemTypes2["BlackstoneStairs"] = "minecraft:blackstone_stairs";
  MinecraftItemTypes2["BlackstoneWall"] = "minecraft:blackstone_wall";
  MinecraftItemTypes2["BladePotterySherd"] = "minecraft:blade_pottery_sherd";
  MinecraftItemTypes2["BlastFurnace"] = "minecraft:blast_furnace";
  MinecraftItemTypes2["BlazePowder"] = "minecraft:blaze_powder";
  MinecraftItemTypes2["BlazeRod"] = "minecraft:blaze_rod";
  MinecraftItemTypes2["BlazeSpawnEgg"] = "minecraft:blaze_spawn_egg";
  MinecraftItemTypes2["BlueBundle"] = "minecraft:blue_bundle";
  MinecraftItemTypes2["BlueCandle"] = "minecraft:blue_candle";
  MinecraftItemTypes2["BlueCarpet"] = "minecraft:blue_carpet";
  MinecraftItemTypes2["BlueConcrete"] = "minecraft:blue_concrete";
  MinecraftItemTypes2["BlueConcretePowder"] = "minecraft:blue_concrete_powder";
  MinecraftItemTypes2["BlueDye"] = "minecraft:blue_dye";
  MinecraftItemTypes2["BlueEgg"] = "minecraft:blue_egg";
  MinecraftItemTypes2["BlueGlazedTerracotta"] = "minecraft:blue_glazed_terracotta";
  MinecraftItemTypes2["BlueHarness"] = "minecraft:blue_harness";
  MinecraftItemTypes2["BlueIce"] = "minecraft:blue_ice";
  MinecraftItemTypes2["BlueOrchid"] = "minecraft:blue_orchid";
  MinecraftItemTypes2["BlueShulkerBox"] = "minecraft:blue_shulker_box";
  MinecraftItemTypes2["BlueStainedGlass"] = "minecraft:blue_stained_glass";
  MinecraftItemTypes2["BlueStainedGlassPane"] = "minecraft:blue_stained_glass_pane";
  MinecraftItemTypes2["BlueTerracotta"] = "minecraft:blue_terracotta";
  MinecraftItemTypes2["BlueWool"] = "minecraft:blue_wool";
  MinecraftItemTypes2["BoggedSpawnEgg"] = "minecraft:bogged_spawn_egg";
  MinecraftItemTypes2["BoltArmorTrimSmithingTemplate"] = "minecraft:bolt_armor_trim_smithing_template";
  MinecraftItemTypes2["Bone"] = "minecraft:bone";
  MinecraftItemTypes2["BoneBlock"] = "minecraft:bone_block";
  MinecraftItemTypes2["BoneMeal"] = "minecraft:bone_meal";
  MinecraftItemTypes2["Book"] = "minecraft:book";
  MinecraftItemTypes2["Bookshelf"] = "minecraft:bookshelf";
  MinecraftItemTypes2["BorderBlock"] = "minecraft:border_block";
  MinecraftItemTypes2["BordureIndentedBannerPattern"] = "minecraft:bordure_indented_banner_pattern";
  MinecraftItemTypes2["Bow"] = "minecraft:bow";
  MinecraftItemTypes2["Bowl"] = "minecraft:bowl";
  MinecraftItemTypes2["BrainCoral"] = "minecraft:brain_coral";
  MinecraftItemTypes2["BrainCoralBlock"] = "minecraft:brain_coral_block";
  MinecraftItemTypes2["BrainCoralFan"] = "minecraft:brain_coral_fan";
  MinecraftItemTypes2["Bread"] = "minecraft:bread";
  MinecraftItemTypes2["BreezeRod"] = "minecraft:breeze_rod";
  MinecraftItemTypes2["BreezeSpawnEgg"] = "minecraft:breeze_spawn_egg";
  MinecraftItemTypes2["BrewerPotterySherd"] = "minecraft:brewer_pottery_sherd";
  MinecraftItemTypes2["BrewingStand"] = "minecraft:brewing_stand";
  MinecraftItemTypes2["Brick"] = "minecraft:brick";
  MinecraftItemTypes2["BrickBlock"] = "minecraft:brick_block";
  MinecraftItemTypes2["BrickSlab"] = "minecraft:brick_slab";
  MinecraftItemTypes2["BrickStairs"] = "minecraft:brick_stairs";
  MinecraftItemTypes2["BrickWall"] = "minecraft:brick_wall";
  MinecraftItemTypes2["BrownBundle"] = "minecraft:brown_bundle";
  MinecraftItemTypes2["BrownCandle"] = "minecraft:brown_candle";
  MinecraftItemTypes2["BrownCarpet"] = "minecraft:brown_carpet";
  MinecraftItemTypes2["BrownConcrete"] = "minecraft:brown_concrete";
  MinecraftItemTypes2["BrownConcretePowder"] = "minecraft:brown_concrete_powder";
  MinecraftItemTypes2["BrownDye"] = "minecraft:brown_dye";
  MinecraftItemTypes2["BrownEgg"] = "minecraft:brown_egg";
  MinecraftItemTypes2["BrownGlazedTerracotta"] = "minecraft:brown_glazed_terracotta";
  MinecraftItemTypes2["BrownHarness"] = "minecraft:brown_harness";
  MinecraftItemTypes2["BrownMushroom"] = "minecraft:brown_mushroom";
  MinecraftItemTypes2["BrownMushroomBlock"] = "minecraft:brown_mushroom_block";
  MinecraftItemTypes2["BrownShulkerBox"] = "minecraft:brown_shulker_box";
  MinecraftItemTypes2["BrownStainedGlass"] = "minecraft:brown_stained_glass";
  MinecraftItemTypes2["BrownStainedGlassPane"] = "minecraft:brown_stained_glass_pane";
  MinecraftItemTypes2["BrownTerracotta"] = "minecraft:brown_terracotta";
  MinecraftItemTypes2["BrownWool"] = "minecraft:brown_wool";
  MinecraftItemTypes2["Brush"] = "minecraft:brush";
  MinecraftItemTypes2["BubbleCoral"] = "minecraft:bubble_coral";
  MinecraftItemTypes2["BubbleCoralBlock"] = "minecraft:bubble_coral_block";
  MinecraftItemTypes2["BubbleCoralFan"] = "minecraft:bubble_coral_fan";
  MinecraftItemTypes2["Bucket"] = "minecraft:bucket";
  MinecraftItemTypes2["BuddingAmethyst"] = "minecraft:budding_amethyst";
  MinecraftItemTypes2["Bundle"] = "minecraft:bundle";
  MinecraftItemTypes2["BurnPotterySherd"] = "minecraft:burn_pottery_sherd";
  MinecraftItemTypes2["Bush"] = "minecraft:bush";
  MinecraftItemTypes2["Cactus"] = "minecraft:cactus";
  MinecraftItemTypes2["CactusFlower"] = "minecraft:cactus_flower";
  MinecraftItemTypes2["Cake"] = "minecraft:cake";
  MinecraftItemTypes2["Calcite"] = "minecraft:calcite";
  MinecraftItemTypes2["CalibratedSculkSensor"] = "minecraft:calibrated_sculk_sensor";
  MinecraftItemTypes2["CamelHuskSpawnEgg"] = "minecraft:camel_husk_spawn_egg";
  MinecraftItemTypes2["CamelSpawnEgg"] = "minecraft:camel_spawn_egg";
  MinecraftItemTypes2["Campfire"] = "minecraft:campfire";
  MinecraftItemTypes2["Candle"] = "minecraft:candle";
  MinecraftItemTypes2["Carrot"] = "minecraft:carrot";
  MinecraftItemTypes2["CarrotOnAStick"] = "minecraft:carrot_on_a_stick";
  MinecraftItemTypes2["CartographyTable"] = "minecraft:cartography_table";
  MinecraftItemTypes2["CarvedPumpkin"] = "minecraft:carved_pumpkin";
  MinecraftItemTypes2["CatSpawnEgg"] = "minecraft:cat_spawn_egg";
  MinecraftItemTypes2["Cauldron"] = "minecraft:cauldron";
  MinecraftItemTypes2["CaveSpiderSpawnEgg"] = "minecraft:cave_spider_spawn_egg";
  MinecraftItemTypes2["ChainCommandBlock"] = "minecraft:chain_command_block";
  MinecraftItemTypes2["ChainmailBoots"] = "minecraft:chainmail_boots";
  MinecraftItemTypes2["ChainmailChestplate"] = "minecraft:chainmail_chestplate";
  MinecraftItemTypes2["ChainmailHelmet"] = "minecraft:chainmail_helmet";
  MinecraftItemTypes2["ChainmailLeggings"] = "minecraft:chainmail_leggings";
  MinecraftItemTypes2["Charcoal"] = "minecraft:charcoal";
  MinecraftItemTypes2["CherryBoat"] = "minecraft:cherry_boat";
  MinecraftItemTypes2["CherryButton"] = "minecraft:cherry_button";
  MinecraftItemTypes2["CherryChestBoat"] = "minecraft:cherry_chest_boat";
  MinecraftItemTypes2["CherryDoor"] = "minecraft:cherry_door";
  MinecraftItemTypes2["CherryFence"] = "minecraft:cherry_fence";
  MinecraftItemTypes2["CherryFenceGate"] = "minecraft:cherry_fence_gate";
  MinecraftItemTypes2["CherryHangingSign"] = "minecraft:cherry_hanging_sign";
  MinecraftItemTypes2["CherryLeaves"] = "minecraft:cherry_leaves";
  MinecraftItemTypes2["CherryLog"] = "minecraft:cherry_log";
  MinecraftItemTypes2["CherryPlanks"] = "minecraft:cherry_planks";
  MinecraftItemTypes2["CherryPressurePlate"] = "minecraft:cherry_pressure_plate";
  MinecraftItemTypes2["CherrySapling"] = "minecraft:cherry_sapling";
  MinecraftItemTypes2["CherryShelf"] = "minecraft:cherry_shelf";
  MinecraftItemTypes2["CherrySign"] = "minecraft:cherry_sign";
  MinecraftItemTypes2["CherrySlab"] = "minecraft:cherry_slab";
  MinecraftItemTypes2["CherryStairs"] = "minecraft:cherry_stairs";
  MinecraftItemTypes2["CherryTrapdoor"] = "minecraft:cherry_trapdoor";
  MinecraftItemTypes2["CherryWood"] = "minecraft:cherry_wood";
  MinecraftItemTypes2["Chest"] = "minecraft:chest";
  MinecraftItemTypes2["ChestMinecart"] = "minecraft:chest_minecart";
  MinecraftItemTypes2["Chicken"] = "minecraft:chicken";
  MinecraftItemTypes2["ChickenSpawnEgg"] = "minecraft:chicken_spawn_egg";
  MinecraftItemTypes2["ChippedAnvil"] = "minecraft:chipped_anvil";
  MinecraftItemTypes2["ChiseledBookshelf"] = "minecraft:chiseled_bookshelf";
  MinecraftItemTypes2["ChiseledCopper"] = "minecraft:chiseled_copper";
  MinecraftItemTypes2["ChiseledDeepslate"] = "minecraft:chiseled_deepslate";
  MinecraftItemTypes2["ChiseledNetherBricks"] = "minecraft:chiseled_nether_bricks";
  MinecraftItemTypes2["ChiseledPolishedBlackstone"] = "minecraft:chiseled_polished_blackstone";
  MinecraftItemTypes2["ChiseledQuartzBlock"] = "minecraft:chiseled_quartz_block";
  MinecraftItemTypes2["ChiseledRedSandstone"] = "minecraft:chiseled_red_sandstone";
  MinecraftItemTypes2["ChiseledResinBricks"] = "minecraft:chiseled_resin_bricks";
  MinecraftItemTypes2["ChiseledSandstone"] = "minecraft:chiseled_sandstone";
  MinecraftItemTypes2["ChiseledStoneBricks"] = "minecraft:chiseled_stone_bricks";
  MinecraftItemTypes2["ChiseledTuff"] = "minecraft:chiseled_tuff";
  MinecraftItemTypes2["ChiseledTuffBricks"] = "minecraft:chiseled_tuff_bricks";
  MinecraftItemTypes2["ChorusFlower"] = "minecraft:chorus_flower";
  MinecraftItemTypes2["ChorusFruit"] = "minecraft:chorus_fruit";
  MinecraftItemTypes2["ChorusPlant"] = "minecraft:chorus_plant";
  MinecraftItemTypes2["Clay"] = "minecraft:clay";
  MinecraftItemTypes2["ClayBall"] = "minecraft:clay_ball";
  MinecraftItemTypes2["Clock"] = "minecraft:clock";
  MinecraftItemTypes2["ClosedEyeblossom"] = "minecraft:closed_eyeblossom";
  MinecraftItemTypes2["Coal"] = "minecraft:coal";
  MinecraftItemTypes2["CoalBlock"] = "minecraft:coal_block";
  MinecraftItemTypes2["CoalOre"] = "minecraft:coal_ore";
  MinecraftItemTypes2["CoarseDirt"] = "minecraft:coarse_dirt";
  MinecraftItemTypes2["CoastArmorTrimSmithingTemplate"] = "minecraft:coast_armor_trim_smithing_template";
  MinecraftItemTypes2["CobbledDeepslate"] = "minecraft:cobbled_deepslate";
  MinecraftItemTypes2["CobbledDeepslateSlab"] = "minecraft:cobbled_deepslate_slab";
  MinecraftItemTypes2["CobbledDeepslateStairs"] = "minecraft:cobbled_deepslate_stairs";
  MinecraftItemTypes2["CobbledDeepslateWall"] = "minecraft:cobbled_deepslate_wall";
  MinecraftItemTypes2["Cobblestone"] = "minecraft:cobblestone";
  MinecraftItemTypes2["CobblestoneSlab"] = "minecraft:cobblestone_slab";
  MinecraftItemTypes2["CobblestoneWall"] = "minecraft:cobblestone_wall";
  MinecraftItemTypes2["CocoaBeans"] = "minecraft:cocoa_beans";
  MinecraftItemTypes2["Cod"] = "minecraft:cod";
  MinecraftItemTypes2["CodBucket"] = "minecraft:cod_bucket";
  MinecraftItemTypes2["CodSpawnEgg"] = "minecraft:cod_spawn_egg";
  MinecraftItemTypes2["CommandBlock"] = "minecraft:command_block";
  MinecraftItemTypes2["CommandBlockMinecart"] = "minecraft:command_block_minecart";
  MinecraftItemTypes2["Comparator"] = "minecraft:comparator";
  MinecraftItemTypes2["Compass"] = "minecraft:compass";
  MinecraftItemTypes2["Composter"] = "minecraft:composter";
  MinecraftItemTypes2["Conduit"] = "minecraft:conduit";
  MinecraftItemTypes2["CookedBeef"] = "minecraft:cooked_beef";
  MinecraftItemTypes2["CookedChicken"] = "minecraft:cooked_chicken";
  MinecraftItemTypes2["CookedCod"] = "minecraft:cooked_cod";
  MinecraftItemTypes2["CookedMutton"] = "minecraft:cooked_mutton";
  MinecraftItemTypes2["CookedPorkchop"] = "minecraft:cooked_porkchop";
  MinecraftItemTypes2["CookedRabbit"] = "minecraft:cooked_rabbit";
  MinecraftItemTypes2["CookedSalmon"] = "minecraft:cooked_salmon";
  MinecraftItemTypes2["Cookie"] = "minecraft:cookie";
  MinecraftItemTypes2["CopperAxe"] = "minecraft:copper_axe";
  MinecraftItemTypes2["CopperBars"] = "minecraft:copper_bars";
  MinecraftItemTypes2["CopperBlock"] = "minecraft:copper_block";
  MinecraftItemTypes2["CopperBoots"] = "minecraft:copper_boots";
  MinecraftItemTypes2["CopperBulb"] = "minecraft:copper_bulb";
  MinecraftItemTypes2["CopperChain"] = "minecraft:copper_chain";
  MinecraftItemTypes2["CopperChest"] = "minecraft:copper_chest";
  MinecraftItemTypes2["CopperChestplate"] = "minecraft:copper_chestplate";
  MinecraftItemTypes2["CopperDoor"] = "minecraft:copper_door";
  MinecraftItemTypes2["CopperGolemSpawnEgg"] = "minecraft:copper_golem_spawn_egg";
  MinecraftItemTypes2["CopperGolemStatue"] = "minecraft:copper_golem_statue";
  MinecraftItemTypes2["CopperGrate"] = "minecraft:copper_grate";
  MinecraftItemTypes2["CopperHelmet"] = "minecraft:copper_helmet";
  MinecraftItemTypes2["CopperHoe"] = "minecraft:copper_hoe";
  MinecraftItemTypes2["CopperHorseArmor"] = "minecraft:copper_horse_armor";
  MinecraftItemTypes2["CopperIngot"] = "minecraft:copper_ingot";
  MinecraftItemTypes2["CopperLantern"] = "minecraft:copper_lantern";
  MinecraftItemTypes2["CopperLeggings"] = "minecraft:copper_leggings";
  MinecraftItemTypes2["CopperNautilusArmor"] = "minecraft:copper_nautilus_armor";
  MinecraftItemTypes2["CopperNugget"] = "minecraft:copper_nugget";
  MinecraftItemTypes2["CopperOre"] = "minecraft:copper_ore";
  MinecraftItemTypes2["CopperPickaxe"] = "minecraft:copper_pickaxe";
  MinecraftItemTypes2["CopperShovel"] = "minecraft:copper_shovel";
  MinecraftItemTypes2["CopperSpear"] = "minecraft:copper_spear";
  MinecraftItemTypes2["CopperSword"] = "minecraft:copper_sword";
  MinecraftItemTypes2["CopperTorch"] = "minecraft:copper_torch";
  MinecraftItemTypes2["CopperTrapdoor"] = "minecraft:copper_trapdoor";
  MinecraftItemTypes2["Cornflower"] = "minecraft:cornflower";
  MinecraftItemTypes2["CowSpawnEgg"] = "minecraft:cow_spawn_egg";
  MinecraftItemTypes2["CrackedDeepslateBricks"] = "minecraft:cracked_deepslate_bricks";
  MinecraftItemTypes2["CrackedDeepslateTiles"] = "minecraft:cracked_deepslate_tiles";
  MinecraftItemTypes2["CrackedNetherBricks"] = "minecraft:cracked_nether_bricks";
  MinecraftItemTypes2["CrackedPolishedBlackstoneBricks"] = "minecraft:cracked_polished_blackstone_bricks";
  MinecraftItemTypes2["CrackedStoneBricks"] = "minecraft:cracked_stone_bricks";
  MinecraftItemTypes2["Crafter"] = "minecraft:crafter";
  MinecraftItemTypes2["CraftingTable"] = "minecraft:crafting_table";
  MinecraftItemTypes2["CreakingHeart"] = "minecraft:creaking_heart";
  MinecraftItemTypes2["CreakingSpawnEgg"] = "minecraft:creaking_spawn_egg";
  MinecraftItemTypes2["CreeperBannerPattern"] = "minecraft:creeper_banner_pattern";
  MinecraftItemTypes2["CreeperHead"] = "minecraft:creeper_head";
  MinecraftItemTypes2["CreeperSpawnEgg"] = "minecraft:creeper_spawn_egg";
  MinecraftItemTypes2["CrimsonButton"] = "minecraft:crimson_button";
  MinecraftItemTypes2["CrimsonDoor"] = "minecraft:crimson_door";
  MinecraftItemTypes2["CrimsonFence"] = "minecraft:crimson_fence";
  MinecraftItemTypes2["CrimsonFenceGate"] = "minecraft:crimson_fence_gate";
  MinecraftItemTypes2["CrimsonFungus"] = "minecraft:crimson_fungus";
  MinecraftItemTypes2["CrimsonHangingSign"] = "minecraft:crimson_hanging_sign";
  MinecraftItemTypes2["CrimsonHyphae"] = "minecraft:crimson_hyphae";
  MinecraftItemTypes2["CrimsonNylium"] = "minecraft:crimson_nylium";
  MinecraftItemTypes2["CrimsonPlanks"] = "minecraft:crimson_planks";
  MinecraftItemTypes2["CrimsonPressurePlate"] = "minecraft:crimson_pressure_plate";
  MinecraftItemTypes2["CrimsonRoots"] = "minecraft:crimson_roots";
  MinecraftItemTypes2["CrimsonShelf"] = "minecraft:crimson_shelf";
  MinecraftItemTypes2["CrimsonSign"] = "minecraft:crimson_sign";
  MinecraftItemTypes2["CrimsonSlab"] = "minecraft:crimson_slab";
  MinecraftItemTypes2["CrimsonStairs"] = "minecraft:crimson_stairs";
  MinecraftItemTypes2["CrimsonStem"] = "minecraft:crimson_stem";
  MinecraftItemTypes2["CrimsonTrapdoor"] = "minecraft:crimson_trapdoor";
  MinecraftItemTypes2["Crossbow"] = "minecraft:crossbow";
  MinecraftItemTypes2["CryingObsidian"] = "minecraft:crying_obsidian";
  MinecraftItemTypes2["CutCopper"] = "minecraft:cut_copper";
  MinecraftItemTypes2["CutCopperSlab"] = "minecraft:cut_copper_slab";
  MinecraftItemTypes2["CutCopperStairs"] = "minecraft:cut_copper_stairs";
  MinecraftItemTypes2["CutRedSandstone"] = "minecraft:cut_red_sandstone";
  MinecraftItemTypes2["CutRedSandstoneSlab"] = "minecraft:cut_red_sandstone_slab";
  MinecraftItemTypes2["CutSandstone"] = "minecraft:cut_sandstone";
  MinecraftItemTypes2["CutSandstoneSlab"] = "minecraft:cut_sandstone_slab";
  MinecraftItemTypes2["CyanBundle"] = "minecraft:cyan_bundle";
  MinecraftItemTypes2["CyanCandle"] = "minecraft:cyan_candle";
  MinecraftItemTypes2["CyanCarpet"] = "minecraft:cyan_carpet";
  MinecraftItemTypes2["CyanConcrete"] = "minecraft:cyan_concrete";
  MinecraftItemTypes2["CyanConcretePowder"] = "minecraft:cyan_concrete_powder";
  MinecraftItemTypes2["CyanDye"] = "minecraft:cyan_dye";
  MinecraftItemTypes2["CyanGlazedTerracotta"] = "minecraft:cyan_glazed_terracotta";
  MinecraftItemTypes2["CyanHarness"] = "minecraft:cyan_harness";
  MinecraftItemTypes2["CyanShulkerBox"] = "minecraft:cyan_shulker_box";
  MinecraftItemTypes2["CyanStainedGlass"] = "minecraft:cyan_stained_glass";
  MinecraftItemTypes2["CyanStainedGlassPane"] = "minecraft:cyan_stained_glass_pane";
  MinecraftItemTypes2["CyanTerracotta"] = "minecraft:cyan_terracotta";
  MinecraftItemTypes2["CyanWool"] = "minecraft:cyan_wool";
  MinecraftItemTypes2["DamagedAnvil"] = "minecraft:damaged_anvil";
  MinecraftItemTypes2["Dandelion"] = "minecraft:dandelion";
  MinecraftItemTypes2["DangerPotterySherd"] = "minecraft:danger_pottery_sherd";
  MinecraftItemTypes2["DarkOakBoat"] = "minecraft:dark_oak_boat";
  MinecraftItemTypes2["DarkOakButton"] = "minecraft:dark_oak_button";
  MinecraftItemTypes2["DarkOakChestBoat"] = "minecraft:dark_oak_chest_boat";
  MinecraftItemTypes2["DarkOakDoor"] = "minecraft:dark_oak_door";
  MinecraftItemTypes2["DarkOakFence"] = "minecraft:dark_oak_fence";
  MinecraftItemTypes2["DarkOakFenceGate"] = "minecraft:dark_oak_fence_gate";
  MinecraftItemTypes2["DarkOakHangingSign"] = "minecraft:dark_oak_hanging_sign";
  MinecraftItemTypes2["DarkOakLeaves"] = "minecraft:dark_oak_leaves";
  MinecraftItemTypes2["DarkOakLog"] = "minecraft:dark_oak_log";
  MinecraftItemTypes2["DarkOakPlanks"] = "minecraft:dark_oak_planks";
  MinecraftItemTypes2["DarkOakPressurePlate"] = "minecraft:dark_oak_pressure_plate";
  MinecraftItemTypes2["DarkOakSapling"] = "minecraft:dark_oak_sapling";
  MinecraftItemTypes2["DarkOakShelf"] = "minecraft:dark_oak_shelf";
  MinecraftItemTypes2["DarkOakSign"] = "minecraft:dark_oak_sign";
  MinecraftItemTypes2["DarkOakSlab"] = "minecraft:dark_oak_slab";
  MinecraftItemTypes2["DarkOakStairs"] = "minecraft:dark_oak_stairs";
  MinecraftItemTypes2["DarkOakTrapdoor"] = "minecraft:dark_oak_trapdoor";
  MinecraftItemTypes2["DarkOakWood"] = "minecraft:dark_oak_wood";
  MinecraftItemTypes2["DarkPrismarine"] = "minecraft:dark_prismarine";
  MinecraftItemTypes2["DarkPrismarineSlab"] = "minecraft:dark_prismarine_slab";
  MinecraftItemTypes2["DarkPrismarineStairs"] = "minecraft:dark_prismarine_stairs";
  MinecraftItemTypes2["DaylightDetector"] = "minecraft:daylight_detector";
  MinecraftItemTypes2["DeadBrainCoral"] = "minecraft:dead_brain_coral";
  MinecraftItemTypes2["DeadBrainCoralBlock"] = "minecraft:dead_brain_coral_block";
  MinecraftItemTypes2["DeadBrainCoralFan"] = "minecraft:dead_brain_coral_fan";
  MinecraftItemTypes2["DeadBubbleCoral"] = "minecraft:dead_bubble_coral";
  MinecraftItemTypes2["DeadBubbleCoralBlock"] = "minecraft:dead_bubble_coral_block";
  MinecraftItemTypes2["DeadBubbleCoralFan"] = "minecraft:dead_bubble_coral_fan";
  MinecraftItemTypes2["DeadFireCoral"] = "minecraft:dead_fire_coral";
  MinecraftItemTypes2["DeadFireCoralBlock"] = "minecraft:dead_fire_coral_block";
  MinecraftItemTypes2["DeadFireCoralFan"] = "minecraft:dead_fire_coral_fan";
  MinecraftItemTypes2["DeadHornCoral"] = "minecraft:dead_horn_coral";
  MinecraftItemTypes2["DeadHornCoralBlock"] = "minecraft:dead_horn_coral_block";
  MinecraftItemTypes2["DeadHornCoralFan"] = "minecraft:dead_horn_coral_fan";
  MinecraftItemTypes2["DeadTubeCoral"] = "minecraft:dead_tube_coral";
  MinecraftItemTypes2["DeadTubeCoralBlock"] = "minecraft:dead_tube_coral_block";
  MinecraftItemTypes2["DeadTubeCoralFan"] = "minecraft:dead_tube_coral_fan";
  MinecraftItemTypes2["Deadbush"] = "minecraft:deadbush";
  MinecraftItemTypes2["DecoratedPot"] = "minecraft:decorated_pot";
  MinecraftItemTypes2["Deepslate"] = "minecraft:deepslate";
  MinecraftItemTypes2["DeepslateBrickSlab"] = "minecraft:deepslate_brick_slab";
  MinecraftItemTypes2["DeepslateBrickStairs"] = "minecraft:deepslate_brick_stairs";
  MinecraftItemTypes2["DeepslateBrickWall"] = "minecraft:deepslate_brick_wall";
  MinecraftItemTypes2["DeepslateBricks"] = "minecraft:deepslate_bricks";
  MinecraftItemTypes2["DeepslateCoalOre"] = "minecraft:deepslate_coal_ore";
  MinecraftItemTypes2["DeepslateCopperOre"] = "minecraft:deepslate_copper_ore";
  MinecraftItemTypes2["DeepslateDiamondOre"] = "minecraft:deepslate_diamond_ore";
  MinecraftItemTypes2["DeepslateEmeraldOre"] = "minecraft:deepslate_emerald_ore";
  MinecraftItemTypes2["DeepslateGoldOre"] = "minecraft:deepslate_gold_ore";
  MinecraftItemTypes2["DeepslateIronOre"] = "minecraft:deepslate_iron_ore";
  MinecraftItemTypes2["DeepslateLapisOre"] = "minecraft:deepslate_lapis_ore";
  MinecraftItemTypes2["DeepslateRedstoneOre"] = "minecraft:deepslate_redstone_ore";
  MinecraftItemTypes2["DeepslateTileSlab"] = "minecraft:deepslate_tile_slab";
  MinecraftItemTypes2["DeepslateTileStairs"] = "minecraft:deepslate_tile_stairs";
  MinecraftItemTypes2["DeepslateTileWall"] = "minecraft:deepslate_tile_wall";
  MinecraftItemTypes2["DeepslateTiles"] = "minecraft:deepslate_tiles";
  MinecraftItemTypes2["Deny"] = "minecraft:deny";
  MinecraftItemTypes2["DetectorRail"] = "minecraft:detector_rail";
  MinecraftItemTypes2["Diamond"] = "minecraft:diamond";
  MinecraftItemTypes2["DiamondAxe"] = "minecraft:diamond_axe";
  MinecraftItemTypes2["DiamondBlock"] = "minecraft:diamond_block";
  MinecraftItemTypes2["DiamondBoots"] = "minecraft:diamond_boots";
  MinecraftItemTypes2["DiamondChestplate"] = "minecraft:diamond_chestplate";
  MinecraftItemTypes2["DiamondHelmet"] = "minecraft:diamond_helmet";
  MinecraftItemTypes2["DiamondHoe"] = "minecraft:diamond_hoe";
  MinecraftItemTypes2["DiamondHorseArmor"] = "minecraft:diamond_horse_armor";
  MinecraftItemTypes2["DiamondLeggings"] = "minecraft:diamond_leggings";
  MinecraftItemTypes2["DiamondNautilusArmor"] = "minecraft:diamond_nautilus_armor";
  MinecraftItemTypes2["DiamondOre"] = "minecraft:diamond_ore";
  MinecraftItemTypes2["DiamondPickaxe"] = "minecraft:diamond_pickaxe";
  MinecraftItemTypes2["DiamondShovel"] = "minecraft:diamond_shovel";
  MinecraftItemTypes2["DiamondSpear"] = "minecraft:diamond_spear";
  MinecraftItemTypes2["DiamondSword"] = "minecraft:diamond_sword";
  MinecraftItemTypes2["Diorite"] = "minecraft:diorite";
  MinecraftItemTypes2["DioriteSlab"] = "minecraft:diorite_slab";
  MinecraftItemTypes2["DioriteStairs"] = "minecraft:diorite_stairs";
  MinecraftItemTypes2["DioriteWall"] = "minecraft:diorite_wall";
  MinecraftItemTypes2["Dirt"] = "minecraft:dirt";
  MinecraftItemTypes2["DirtWithRoots"] = "minecraft:dirt_with_roots";
  MinecraftItemTypes2["DiscFragment5"] = "minecraft:disc_fragment_5";
  MinecraftItemTypes2["Dispenser"] = "minecraft:dispenser";
  MinecraftItemTypes2["DolphinSpawnEgg"] = "minecraft:dolphin_spawn_egg";
  MinecraftItemTypes2["DonkeySpawnEgg"] = "minecraft:donkey_spawn_egg";
  MinecraftItemTypes2["DragonBreath"] = "minecraft:dragon_breath";
  MinecraftItemTypes2["DragonEgg"] = "minecraft:dragon_egg";
  MinecraftItemTypes2["DragonHead"] = "minecraft:dragon_head";
  MinecraftItemTypes2["DriedGhast"] = "minecraft:dried_ghast";
  MinecraftItemTypes2["DriedKelp"] = "minecraft:dried_kelp";
  MinecraftItemTypes2["DriedKelpBlock"] = "minecraft:dried_kelp_block";
  MinecraftItemTypes2["DripstoneBlock"] = "minecraft:dripstone_block";
  MinecraftItemTypes2["Dropper"] = "minecraft:dropper";
  MinecraftItemTypes2["DrownedSpawnEgg"] = "minecraft:drowned_spawn_egg";
  MinecraftItemTypes2["DuneArmorTrimSmithingTemplate"] = "minecraft:dune_armor_trim_smithing_template";
  MinecraftItemTypes2["EchoShard"] = "minecraft:echo_shard";
  MinecraftItemTypes2["Egg"] = "minecraft:egg";
  MinecraftItemTypes2["ElderGuardianSpawnEgg"] = "minecraft:elder_guardian_spawn_egg";
  MinecraftItemTypes2["Elytra"] = "minecraft:elytra";
  MinecraftItemTypes2["Emerald"] = "minecraft:emerald";
  MinecraftItemTypes2["EmeraldBlock"] = "minecraft:emerald_block";
  MinecraftItemTypes2["EmeraldOre"] = "minecraft:emerald_ore";
  MinecraftItemTypes2["EmptyMap"] = "minecraft:empty_map";
  MinecraftItemTypes2["EnchantedBook"] = "minecraft:enchanted_book";
  MinecraftItemTypes2["EnchantedGoldenApple"] = "minecraft:enchanted_golden_apple";
  MinecraftItemTypes2["EnchantingTable"] = "minecraft:enchanting_table";
  MinecraftItemTypes2["EndBrickStairs"] = "minecraft:end_brick_stairs";
  MinecraftItemTypes2["EndBricks"] = "minecraft:end_bricks";
  MinecraftItemTypes2["EndCrystal"] = "minecraft:end_crystal";
  MinecraftItemTypes2["EndPortalFrame"] = "minecraft:end_portal_frame";
  MinecraftItemTypes2["EndRod"] = "minecraft:end_rod";
  MinecraftItemTypes2["EndStone"] = "minecraft:end_stone";
  MinecraftItemTypes2["EndStoneBrickSlab"] = "minecraft:end_stone_brick_slab";
  MinecraftItemTypes2["EndStoneBrickWall"] = "minecraft:end_stone_brick_wall";
  MinecraftItemTypes2["EnderChest"] = "minecraft:ender_chest";
  MinecraftItemTypes2["EnderDragonSpawnEgg"] = "minecraft:ender_dragon_spawn_egg";
  MinecraftItemTypes2["EnderEye"] = "minecraft:ender_eye";
  MinecraftItemTypes2["EnderPearl"] = "minecraft:ender_pearl";
  MinecraftItemTypes2["EndermanSpawnEgg"] = "minecraft:enderman_spawn_egg";
  MinecraftItemTypes2["EndermiteSpawnEgg"] = "minecraft:endermite_spawn_egg";
  MinecraftItemTypes2["EvokerSpawnEgg"] = "minecraft:evoker_spawn_egg";
  MinecraftItemTypes2["ExperienceBottle"] = "minecraft:experience_bottle";
  MinecraftItemTypes2["ExplorerPotterySherd"] = "minecraft:explorer_pottery_sherd";
  MinecraftItemTypes2["ExposedChiseledCopper"] = "minecraft:exposed_chiseled_copper";
  MinecraftItemTypes2["ExposedCopper"] = "minecraft:exposed_copper";
  MinecraftItemTypes2["ExposedCopperBars"] = "minecraft:exposed_copper_bars";
  MinecraftItemTypes2["ExposedCopperBulb"] = "minecraft:exposed_copper_bulb";
  MinecraftItemTypes2["ExposedCopperChain"] = "minecraft:exposed_copper_chain";
  MinecraftItemTypes2["ExposedCopperChest"] = "minecraft:exposed_copper_chest";
  MinecraftItemTypes2["ExposedCopperDoor"] = "minecraft:exposed_copper_door";
  MinecraftItemTypes2["ExposedCopperGolemStatue"] = "minecraft:exposed_copper_golem_statue";
  MinecraftItemTypes2["ExposedCopperGrate"] = "minecraft:exposed_copper_grate";
  MinecraftItemTypes2["ExposedCopperLantern"] = "minecraft:exposed_copper_lantern";
  MinecraftItemTypes2["ExposedCopperTrapdoor"] = "minecraft:exposed_copper_trapdoor";
  MinecraftItemTypes2["ExposedCutCopper"] = "minecraft:exposed_cut_copper";
  MinecraftItemTypes2["ExposedCutCopperSlab"] = "minecraft:exposed_cut_copper_slab";
  MinecraftItemTypes2["ExposedCutCopperStairs"] = "minecraft:exposed_cut_copper_stairs";
  MinecraftItemTypes2["ExposedLightningRod"] = "minecraft:exposed_lightning_rod";
  MinecraftItemTypes2["EyeArmorTrimSmithingTemplate"] = "minecraft:eye_armor_trim_smithing_template";
  MinecraftItemTypes2["Farmland"] = "minecraft:farmland";
  MinecraftItemTypes2["Feather"] = "minecraft:feather";
  MinecraftItemTypes2["FenceGate"] = "minecraft:fence_gate";
  MinecraftItemTypes2["FermentedSpiderEye"] = "minecraft:fermented_spider_eye";
  MinecraftItemTypes2["Fern"] = "minecraft:fern";
  MinecraftItemTypes2["FieldMasonedBannerPattern"] = "minecraft:field_masoned_banner_pattern";
  MinecraftItemTypes2["FilledMap"] = "minecraft:filled_map";
  MinecraftItemTypes2["FireCharge"] = "minecraft:fire_charge";
  MinecraftItemTypes2["FireCoral"] = "minecraft:fire_coral";
  MinecraftItemTypes2["FireCoralBlock"] = "minecraft:fire_coral_block";
  MinecraftItemTypes2["FireCoralFan"] = "minecraft:fire_coral_fan";
  MinecraftItemTypes2["FireflyBush"] = "minecraft:firefly_bush";
  MinecraftItemTypes2["FireworkRocket"] = "minecraft:firework_rocket";
  MinecraftItemTypes2["FireworkStar"] = "minecraft:firework_star";
  MinecraftItemTypes2["FishingRod"] = "minecraft:fishing_rod";
  MinecraftItemTypes2["FletchingTable"] = "minecraft:fletching_table";
  MinecraftItemTypes2["Flint"] = "minecraft:flint";
  MinecraftItemTypes2["FlintAndSteel"] = "minecraft:flint_and_steel";
  MinecraftItemTypes2["FlowArmorTrimSmithingTemplate"] = "minecraft:flow_armor_trim_smithing_template";
  MinecraftItemTypes2["FlowBannerPattern"] = "minecraft:flow_banner_pattern";
  MinecraftItemTypes2["FlowPotterySherd"] = "minecraft:flow_pottery_sherd";
  MinecraftItemTypes2["FlowerBannerPattern"] = "minecraft:flower_banner_pattern";
  MinecraftItemTypes2["FlowerPot"] = "minecraft:flower_pot";
  MinecraftItemTypes2["FloweringAzalea"] = "minecraft:flowering_azalea";
  MinecraftItemTypes2["FoxSpawnEgg"] = "minecraft:fox_spawn_egg";
  MinecraftItemTypes2["Frame"] = "minecraft:frame";
  MinecraftItemTypes2["FriendPotterySherd"] = "minecraft:friend_pottery_sherd";
  MinecraftItemTypes2["FrogSpawn"] = "minecraft:frog_spawn";
  MinecraftItemTypes2["FrogSpawnEgg"] = "minecraft:frog_spawn_egg";
  MinecraftItemTypes2["FrostedIce"] = "minecraft:frosted_ice";
  MinecraftItemTypes2["Furnace"] = "minecraft:furnace";
  MinecraftItemTypes2["GhastSpawnEgg"] = "minecraft:ghast_spawn_egg";
  MinecraftItemTypes2["GhastTear"] = "minecraft:ghast_tear";
  MinecraftItemTypes2["GildedBlackstone"] = "minecraft:gilded_blackstone";
  MinecraftItemTypes2["Glass"] = "minecraft:glass";
  MinecraftItemTypes2["GlassBottle"] = "minecraft:glass_bottle";
  MinecraftItemTypes2["GlassPane"] = "minecraft:glass_pane";
  MinecraftItemTypes2["GlisteringMelonSlice"] = "minecraft:glistering_melon_slice";
  MinecraftItemTypes2["GlobeBannerPattern"] = "minecraft:globe_banner_pattern";
  MinecraftItemTypes2["GlowBerries"] = "minecraft:glow_berries";
  MinecraftItemTypes2["GlowFrame"] = "minecraft:glow_frame";
  MinecraftItemTypes2["GlowInkSac"] = "minecraft:glow_ink_sac";
  MinecraftItemTypes2["GlowLichen"] = "minecraft:glow_lichen";
  MinecraftItemTypes2["GlowSquidSpawnEgg"] = "minecraft:glow_squid_spawn_egg";
  MinecraftItemTypes2["Glowstone"] = "minecraft:glowstone";
  MinecraftItemTypes2["GlowstoneDust"] = "minecraft:glowstone_dust";
  MinecraftItemTypes2["GoatHorn"] = "minecraft:goat_horn";
  MinecraftItemTypes2["GoatSpawnEgg"] = "minecraft:goat_spawn_egg";
  MinecraftItemTypes2["GoldBlock"] = "minecraft:gold_block";
  MinecraftItemTypes2["GoldIngot"] = "minecraft:gold_ingot";
  MinecraftItemTypes2["GoldNugget"] = "minecraft:gold_nugget";
  MinecraftItemTypes2["GoldOre"] = "minecraft:gold_ore";
  MinecraftItemTypes2["GoldenApple"] = "minecraft:golden_apple";
  MinecraftItemTypes2["GoldenAxe"] = "minecraft:golden_axe";
  MinecraftItemTypes2["GoldenBoots"] = "minecraft:golden_boots";
  MinecraftItemTypes2["GoldenCarrot"] = "minecraft:golden_carrot";
  MinecraftItemTypes2["GoldenChestplate"] = "minecraft:golden_chestplate";
  MinecraftItemTypes2["GoldenHelmet"] = "minecraft:golden_helmet";
  MinecraftItemTypes2["GoldenHoe"] = "minecraft:golden_hoe";
  MinecraftItemTypes2["GoldenHorseArmor"] = "minecraft:golden_horse_armor";
  MinecraftItemTypes2["GoldenLeggings"] = "minecraft:golden_leggings";
  MinecraftItemTypes2["GoldenNautilusArmor"] = "minecraft:golden_nautilus_armor";
  MinecraftItemTypes2["GoldenPickaxe"] = "minecraft:golden_pickaxe";
  MinecraftItemTypes2["GoldenRail"] = "minecraft:golden_rail";
  MinecraftItemTypes2["GoldenShovel"] = "minecraft:golden_shovel";
  MinecraftItemTypes2["GoldenSpear"] = "minecraft:golden_spear";
  MinecraftItemTypes2["GoldenSword"] = "minecraft:golden_sword";
  MinecraftItemTypes2["Granite"] = "minecraft:granite";
  MinecraftItemTypes2["GraniteSlab"] = "minecraft:granite_slab";
  MinecraftItemTypes2["GraniteStairs"] = "minecraft:granite_stairs";
  MinecraftItemTypes2["GraniteWall"] = "minecraft:granite_wall";
  MinecraftItemTypes2["GrassBlock"] = "minecraft:grass_block";
  MinecraftItemTypes2["GrassPath"] = "minecraft:grass_path";
  MinecraftItemTypes2["Gravel"] = "minecraft:gravel";
  MinecraftItemTypes2["GrayBundle"] = "minecraft:gray_bundle";
  MinecraftItemTypes2["GrayCandle"] = "minecraft:gray_candle";
  MinecraftItemTypes2["GrayCarpet"] = "minecraft:gray_carpet";
  MinecraftItemTypes2["GrayConcrete"] = "minecraft:gray_concrete";
  MinecraftItemTypes2["GrayConcretePowder"] = "minecraft:gray_concrete_powder";
  MinecraftItemTypes2["GrayDye"] = "minecraft:gray_dye";
  MinecraftItemTypes2["GrayGlazedTerracotta"] = "minecraft:gray_glazed_terracotta";
  MinecraftItemTypes2["GrayHarness"] = "minecraft:gray_harness";
  MinecraftItemTypes2["GrayShulkerBox"] = "minecraft:gray_shulker_box";
  MinecraftItemTypes2["GrayStainedGlass"] = "minecraft:gray_stained_glass";
  MinecraftItemTypes2["GrayStainedGlassPane"] = "minecraft:gray_stained_glass_pane";
  MinecraftItemTypes2["GrayTerracotta"] = "minecraft:gray_terracotta";
  MinecraftItemTypes2["GrayWool"] = "minecraft:gray_wool";
  MinecraftItemTypes2["GreenBundle"] = "minecraft:green_bundle";
  MinecraftItemTypes2["GreenCandle"] = "minecraft:green_candle";
  MinecraftItemTypes2["GreenCarpet"] = "minecraft:green_carpet";
  MinecraftItemTypes2["GreenConcrete"] = "minecraft:green_concrete";
  MinecraftItemTypes2["GreenConcretePowder"] = "minecraft:green_concrete_powder";
  MinecraftItemTypes2["GreenDye"] = "minecraft:green_dye";
  MinecraftItemTypes2["GreenGlazedTerracotta"] = "minecraft:green_glazed_terracotta";
  MinecraftItemTypes2["GreenHarness"] = "minecraft:green_harness";
  MinecraftItemTypes2["GreenShulkerBox"] = "minecraft:green_shulker_box";
  MinecraftItemTypes2["GreenStainedGlass"] = "minecraft:green_stained_glass";
  MinecraftItemTypes2["GreenStainedGlassPane"] = "minecraft:green_stained_glass_pane";
  MinecraftItemTypes2["GreenTerracotta"] = "minecraft:green_terracotta";
  MinecraftItemTypes2["GreenWool"] = "minecraft:green_wool";
  MinecraftItemTypes2["Grindstone"] = "minecraft:grindstone";
  MinecraftItemTypes2["GuardianSpawnEgg"] = "minecraft:guardian_spawn_egg";
  MinecraftItemTypes2["Gunpowder"] = "minecraft:gunpowder";
  MinecraftItemTypes2["GusterBannerPattern"] = "minecraft:guster_banner_pattern";
  MinecraftItemTypes2["GusterPotterySherd"] = "minecraft:guster_pottery_sherd";
  MinecraftItemTypes2["HangingRoots"] = "minecraft:hanging_roots";
  MinecraftItemTypes2["HappyGhastSpawnEgg"] = "minecraft:happy_ghast_spawn_egg";
  MinecraftItemTypes2["HardenedClay"] = "minecraft:hardened_clay";
  MinecraftItemTypes2["HayBlock"] = "minecraft:hay_block";
  MinecraftItemTypes2["HeartOfTheSea"] = "minecraft:heart_of_the_sea";
  MinecraftItemTypes2["HeartPotterySherd"] = "minecraft:heart_pottery_sherd";
  MinecraftItemTypes2["HeartbreakPotterySherd"] = "minecraft:heartbreak_pottery_sherd";
  MinecraftItemTypes2["HeavyCore"] = "minecraft:heavy_core";
  MinecraftItemTypes2["HeavyWeightedPressurePlate"] = "minecraft:heavy_weighted_pressure_plate";
  MinecraftItemTypes2["HoglinSpawnEgg"] = "minecraft:hoglin_spawn_egg";
  MinecraftItemTypes2["HoneyBlock"] = "minecraft:honey_block";
  MinecraftItemTypes2["HoneyBottle"] = "minecraft:honey_bottle";
  MinecraftItemTypes2["Honeycomb"] = "minecraft:honeycomb";
  MinecraftItemTypes2["HoneycombBlock"] = "minecraft:honeycomb_block";
  MinecraftItemTypes2["Hopper"] = "minecraft:hopper";
  MinecraftItemTypes2["HopperMinecart"] = "minecraft:hopper_minecart";
  MinecraftItemTypes2["HornCoral"] = "minecraft:horn_coral";
  MinecraftItemTypes2["HornCoralBlock"] = "minecraft:horn_coral_block";
  MinecraftItemTypes2["HornCoralFan"] = "minecraft:horn_coral_fan";
  MinecraftItemTypes2["HorseSpawnEgg"] = "minecraft:horse_spawn_egg";
  MinecraftItemTypes2["HostArmorTrimSmithingTemplate"] = "minecraft:host_armor_trim_smithing_template";
  MinecraftItemTypes2["HowlPotterySherd"] = "minecraft:howl_pottery_sherd";
  MinecraftItemTypes2["HuskSpawnEgg"] = "minecraft:husk_spawn_egg";
  MinecraftItemTypes2["Ice"] = "minecraft:ice";
  MinecraftItemTypes2["InfestedChiseledStoneBricks"] = "minecraft:infested_chiseled_stone_bricks";
  MinecraftItemTypes2["InfestedCobblestone"] = "minecraft:infested_cobblestone";
  MinecraftItemTypes2["InfestedCrackedStoneBricks"] = "minecraft:infested_cracked_stone_bricks";
  MinecraftItemTypes2["InfestedDeepslate"] = "minecraft:infested_deepslate";
  MinecraftItemTypes2["InfestedMossyStoneBricks"] = "minecraft:infested_mossy_stone_bricks";
  MinecraftItemTypes2["InfestedStone"] = "minecraft:infested_stone";
  MinecraftItemTypes2["InfestedStoneBricks"] = "minecraft:infested_stone_bricks";
  MinecraftItemTypes2["InkSac"] = "minecraft:ink_sac";
  MinecraftItemTypes2["IronAxe"] = "minecraft:iron_axe";
  MinecraftItemTypes2["IronBars"] = "minecraft:iron_bars";
  MinecraftItemTypes2["IronBlock"] = "minecraft:iron_block";
  MinecraftItemTypes2["IronBoots"] = "minecraft:iron_boots";
  MinecraftItemTypes2["IronChain"] = "minecraft:iron_chain";
  MinecraftItemTypes2["IronChestplate"] = "minecraft:iron_chestplate";
  MinecraftItemTypes2["IronDoor"] = "minecraft:iron_door";
  MinecraftItemTypes2["IronGolemSpawnEgg"] = "minecraft:iron_golem_spawn_egg";
  MinecraftItemTypes2["IronHelmet"] = "minecraft:iron_helmet";
  MinecraftItemTypes2["IronHoe"] = "minecraft:iron_hoe";
  MinecraftItemTypes2["IronHorseArmor"] = "minecraft:iron_horse_armor";
  MinecraftItemTypes2["IronIngot"] = "minecraft:iron_ingot";
  MinecraftItemTypes2["IronLeggings"] = "minecraft:iron_leggings";
  MinecraftItemTypes2["IronNautilusArmor"] = "minecraft:iron_nautilus_armor";
  MinecraftItemTypes2["IronNugget"] = "minecraft:iron_nugget";
  MinecraftItemTypes2["IronOre"] = "minecraft:iron_ore";
  MinecraftItemTypes2["IronPickaxe"] = "minecraft:iron_pickaxe";
  MinecraftItemTypes2["IronShovel"] = "minecraft:iron_shovel";
  MinecraftItemTypes2["IronSpear"] = "minecraft:iron_spear";
  MinecraftItemTypes2["IronSword"] = "minecraft:iron_sword";
  MinecraftItemTypes2["IronTrapdoor"] = "minecraft:iron_trapdoor";
  MinecraftItemTypes2["Jigsaw"] = "minecraft:jigsaw";
  MinecraftItemTypes2["Jukebox"] = "minecraft:jukebox";
  MinecraftItemTypes2["JungleBoat"] = "minecraft:jungle_boat";
  MinecraftItemTypes2["JungleButton"] = "minecraft:jungle_button";
  MinecraftItemTypes2["JungleChestBoat"] = "minecraft:jungle_chest_boat";
  MinecraftItemTypes2["JungleDoor"] = "minecraft:jungle_door";
  MinecraftItemTypes2["JungleFence"] = "minecraft:jungle_fence";
  MinecraftItemTypes2["JungleFenceGate"] = "minecraft:jungle_fence_gate";
  MinecraftItemTypes2["JungleHangingSign"] = "minecraft:jungle_hanging_sign";
  MinecraftItemTypes2["JungleLeaves"] = "minecraft:jungle_leaves";
  MinecraftItemTypes2["JungleLog"] = "minecraft:jungle_log";
  MinecraftItemTypes2["JunglePlanks"] = "minecraft:jungle_planks";
  MinecraftItemTypes2["JunglePressurePlate"] = "minecraft:jungle_pressure_plate";
  MinecraftItemTypes2["JungleSapling"] = "minecraft:jungle_sapling";
  MinecraftItemTypes2["JungleShelf"] = "minecraft:jungle_shelf";
  MinecraftItemTypes2["JungleSign"] = "minecraft:jungle_sign";
  MinecraftItemTypes2["JungleSlab"] = "minecraft:jungle_slab";
  MinecraftItemTypes2["JungleStairs"] = "minecraft:jungle_stairs";
  MinecraftItemTypes2["JungleTrapdoor"] = "minecraft:jungle_trapdoor";
  MinecraftItemTypes2["JungleWood"] = "minecraft:jungle_wood";
  MinecraftItemTypes2["Kelp"] = "minecraft:kelp";
  MinecraftItemTypes2["Ladder"] = "minecraft:ladder";
  MinecraftItemTypes2["Lantern"] = "minecraft:lantern";
  MinecraftItemTypes2["LapisBlock"] = "minecraft:lapis_block";
  MinecraftItemTypes2["LapisLazuli"] = "minecraft:lapis_lazuli";
  MinecraftItemTypes2["LapisOre"] = "minecraft:lapis_ore";
  MinecraftItemTypes2["LargeAmethystBud"] = "minecraft:large_amethyst_bud";
  MinecraftItemTypes2["LargeFern"] = "minecraft:large_fern";
  MinecraftItemTypes2["LavaBucket"] = "minecraft:lava_bucket";
  MinecraftItemTypes2["Lead"] = "minecraft:lead";
  MinecraftItemTypes2["LeafLitter"] = "minecraft:leaf_litter";
  MinecraftItemTypes2["Leather"] = "minecraft:leather";
  MinecraftItemTypes2["LeatherBoots"] = "minecraft:leather_boots";
  MinecraftItemTypes2["LeatherChestplate"] = "minecraft:leather_chestplate";
  MinecraftItemTypes2["LeatherHelmet"] = "minecraft:leather_helmet";
  MinecraftItemTypes2["LeatherHorseArmor"] = "minecraft:leather_horse_armor";
  MinecraftItemTypes2["LeatherLeggings"] = "minecraft:leather_leggings";
  MinecraftItemTypes2["Lectern"] = "minecraft:lectern";
  MinecraftItemTypes2["Lever"] = "minecraft:lever";
  MinecraftItemTypes2["LightBlock0"] = "minecraft:light_block_0";
  MinecraftItemTypes2["LightBlock1"] = "minecraft:light_block_1";
  MinecraftItemTypes2["LightBlock10"] = "minecraft:light_block_10";
  MinecraftItemTypes2["LightBlock11"] = "minecraft:light_block_11";
  MinecraftItemTypes2["LightBlock12"] = "minecraft:light_block_12";
  MinecraftItemTypes2["LightBlock13"] = "minecraft:light_block_13";
  MinecraftItemTypes2["LightBlock14"] = "minecraft:light_block_14";
  MinecraftItemTypes2["LightBlock15"] = "minecraft:light_block_15";
  MinecraftItemTypes2["LightBlock2"] = "minecraft:light_block_2";
  MinecraftItemTypes2["LightBlock3"] = "minecraft:light_block_3";
  MinecraftItemTypes2["LightBlock4"] = "minecraft:light_block_4";
  MinecraftItemTypes2["LightBlock5"] = "minecraft:light_block_5";
  MinecraftItemTypes2["LightBlock6"] = "minecraft:light_block_6";
  MinecraftItemTypes2["LightBlock7"] = "minecraft:light_block_7";
  MinecraftItemTypes2["LightBlock8"] = "minecraft:light_block_8";
  MinecraftItemTypes2["LightBlock9"] = "minecraft:light_block_9";
  MinecraftItemTypes2["LightBlueBundle"] = "minecraft:light_blue_bundle";
  MinecraftItemTypes2["LightBlueCandle"] = "minecraft:light_blue_candle";
  MinecraftItemTypes2["LightBlueCarpet"] = "minecraft:light_blue_carpet";
  MinecraftItemTypes2["LightBlueConcrete"] = "minecraft:light_blue_concrete";
  MinecraftItemTypes2["LightBlueConcretePowder"] = "minecraft:light_blue_concrete_powder";
  MinecraftItemTypes2["LightBlueDye"] = "minecraft:light_blue_dye";
  MinecraftItemTypes2["LightBlueGlazedTerracotta"] = "minecraft:light_blue_glazed_terracotta";
  MinecraftItemTypes2["LightBlueHarness"] = "minecraft:light_blue_harness";
  MinecraftItemTypes2["LightBlueShulkerBox"] = "minecraft:light_blue_shulker_box";
  MinecraftItemTypes2["LightBlueStainedGlass"] = "minecraft:light_blue_stained_glass";
  MinecraftItemTypes2["LightBlueStainedGlassPane"] = "minecraft:light_blue_stained_glass_pane";
  MinecraftItemTypes2["LightBlueTerracotta"] = "minecraft:light_blue_terracotta";
  MinecraftItemTypes2["LightBlueWool"] = "minecraft:light_blue_wool";
  MinecraftItemTypes2["LightGrayBundle"] = "minecraft:light_gray_bundle";
  MinecraftItemTypes2["LightGrayCandle"] = "minecraft:light_gray_candle";
  MinecraftItemTypes2["LightGrayCarpet"] = "minecraft:light_gray_carpet";
  MinecraftItemTypes2["LightGrayConcrete"] = "minecraft:light_gray_concrete";
  MinecraftItemTypes2["LightGrayConcretePowder"] = "minecraft:light_gray_concrete_powder";
  MinecraftItemTypes2["LightGrayDye"] = "minecraft:light_gray_dye";
  MinecraftItemTypes2["LightGrayHarness"] = "minecraft:light_gray_harness";
  MinecraftItemTypes2["LightGrayShulkerBox"] = "minecraft:light_gray_shulker_box";
  MinecraftItemTypes2["LightGrayStainedGlass"] = "minecraft:light_gray_stained_glass";
  MinecraftItemTypes2["LightGrayStainedGlassPane"] = "minecraft:light_gray_stained_glass_pane";
  MinecraftItemTypes2["LightGrayTerracotta"] = "minecraft:light_gray_terracotta";
  MinecraftItemTypes2["LightGrayWool"] = "minecraft:light_gray_wool";
  MinecraftItemTypes2["LightWeightedPressurePlate"] = "minecraft:light_weighted_pressure_plate";
  MinecraftItemTypes2["LightningRod"] = "minecraft:lightning_rod";
  MinecraftItemTypes2["Lilac"] = "minecraft:lilac";
  MinecraftItemTypes2["LilyOfTheValley"] = "minecraft:lily_of_the_valley";
  MinecraftItemTypes2["LimeBundle"] = "minecraft:lime_bundle";
  MinecraftItemTypes2["LimeCandle"] = "minecraft:lime_candle";
  MinecraftItemTypes2["LimeCarpet"] = "minecraft:lime_carpet";
  MinecraftItemTypes2["LimeConcrete"] = "minecraft:lime_concrete";
  MinecraftItemTypes2["LimeConcretePowder"] = "minecraft:lime_concrete_powder";
  MinecraftItemTypes2["LimeDye"] = "minecraft:lime_dye";
  MinecraftItemTypes2["LimeGlazedTerracotta"] = "minecraft:lime_glazed_terracotta";
  MinecraftItemTypes2["LimeHarness"] = "minecraft:lime_harness";
  MinecraftItemTypes2["LimeShulkerBox"] = "minecraft:lime_shulker_box";
  MinecraftItemTypes2["LimeStainedGlass"] = "minecraft:lime_stained_glass";
  MinecraftItemTypes2["LimeStainedGlassPane"] = "minecraft:lime_stained_glass_pane";
  MinecraftItemTypes2["LimeTerracotta"] = "minecraft:lime_terracotta";
  MinecraftItemTypes2["LimeWool"] = "minecraft:lime_wool";
  MinecraftItemTypes2["LingeringPotion"] = "minecraft:lingering_potion";
  MinecraftItemTypes2["LitPumpkin"] = "minecraft:lit_pumpkin";
  MinecraftItemTypes2["LlamaSpawnEgg"] = "minecraft:llama_spawn_egg";
  MinecraftItemTypes2["Lodestone"] = "minecraft:lodestone";
  MinecraftItemTypes2["LodestoneCompass"] = "minecraft:lodestone_compass";
  MinecraftItemTypes2["Loom"] = "minecraft:loom";
  MinecraftItemTypes2["Mace"] = "minecraft:mace";
  MinecraftItemTypes2["MagentaBundle"] = "minecraft:magenta_bundle";
  MinecraftItemTypes2["MagentaCandle"] = "minecraft:magenta_candle";
  MinecraftItemTypes2["MagentaCarpet"] = "minecraft:magenta_carpet";
  MinecraftItemTypes2["MagentaConcrete"] = "minecraft:magenta_concrete";
  MinecraftItemTypes2["MagentaConcretePowder"] = "minecraft:magenta_concrete_powder";
  MinecraftItemTypes2["MagentaDye"] = "minecraft:magenta_dye";
  MinecraftItemTypes2["MagentaGlazedTerracotta"] = "minecraft:magenta_glazed_terracotta";
  MinecraftItemTypes2["MagentaHarness"] = "minecraft:magenta_harness";
  MinecraftItemTypes2["MagentaShulkerBox"] = "minecraft:magenta_shulker_box";
  MinecraftItemTypes2["MagentaStainedGlass"] = "minecraft:magenta_stained_glass";
  MinecraftItemTypes2["MagentaStainedGlassPane"] = "minecraft:magenta_stained_glass_pane";
  MinecraftItemTypes2["MagentaTerracotta"] = "minecraft:magenta_terracotta";
  MinecraftItemTypes2["MagentaWool"] = "minecraft:magenta_wool";
  MinecraftItemTypes2["Magma"] = "minecraft:magma";
  MinecraftItemTypes2["MagmaCream"] = "minecraft:magma_cream";
  MinecraftItemTypes2["MagmaCubeSpawnEgg"] = "minecraft:magma_cube_spawn_egg";
  MinecraftItemTypes2["MangroveBoat"] = "minecraft:mangrove_boat";
  MinecraftItemTypes2["MangroveButton"] = "minecraft:mangrove_button";
  MinecraftItemTypes2["MangroveChestBoat"] = "minecraft:mangrove_chest_boat";
  MinecraftItemTypes2["MangroveDoor"] = "minecraft:mangrove_door";
  MinecraftItemTypes2["MangroveFence"] = "minecraft:mangrove_fence";
  MinecraftItemTypes2["MangroveFenceGate"] = "minecraft:mangrove_fence_gate";
  MinecraftItemTypes2["MangroveHangingSign"] = "minecraft:mangrove_hanging_sign";
  MinecraftItemTypes2["MangroveLeaves"] = "minecraft:mangrove_leaves";
  MinecraftItemTypes2["MangroveLog"] = "minecraft:mangrove_log";
  MinecraftItemTypes2["MangrovePlanks"] = "minecraft:mangrove_planks";
  MinecraftItemTypes2["MangrovePressurePlate"] = "minecraft:mangrove_pressure_plate";
  MinecraftItemTypes2["MangrovePropagule"] = "minecraft:mangrove_propagule";
  MinecraftItemTypes2["MangroveRoots"] = "minecraft:mangrove_roots";
  MinecraftItemTypes2["MangroveShelf"] = "minecraft:mangrove_shelf";
  MinecraftItemTypes2["MangroveSign"] = "minecraft:mangrove_sign";
  MinecraftItemTypes2["MangroveSlab"] = "minecraft:mangrove_slab";
  MinecraftItemTypes2["MangroveStairs"] = "minecraft:mangrove_stairs";
  MinecraftItemTypes2["MangroveTrapdoor"] = "minecraft:mangrove_trapdoor";
  MinecraftItemTypes2["MangroveWood"] = "minecraft:mangrove_wood";
  MinecraftItemTypes2["MediumAmethystBud"] = "minecraft:medium_amethyst_bud";
  MinecraftItemTypes2["MelonBlock"] = "minecraft:melon_block";
  MinecraftItemTypes2["MelonSeeds"] = "minecraft:melon_seeds";
  MinecraftItemTypes2["MelonSlice"] = "minecraft:melon_slice";
  MinecraftItemTypes2["MilkBucket"] = "minecraft:milk_bucket";
  MinecraftItemTypes2["Minecart"] = "minecraft:minecart";
  MinecraftItemTypes2["MinerPotterySherd"] = "minecraft:miner_pottery_sherd";
  MinecraftItemTypes2["MobSpawner"] = "minecraft:mob_spawner";
  MinecraftItemTypes2["MojangBannerPattern"] = "minecraft:mojang_banner_pattern";
  MinecraftItemTypes2["MooshroomSpawnEgg"] = "minecraft:mooshroom_spawn_egg";
  MinecraftItemTypes2["MossBlock"] = "minecraft:moss_block";
  MinecraftItemTypes2["MossCarpet"] = "minecraft:moss_carpet";
  MinecraftItemTypes2["MossyCobblestone"] = "minecraft:mossy_cobblestone";
  MinecraftItemTypes2["MossyCobblestoneSlab"] = "minecraft:mossy_cobblestone_slab";
  MinecraftItemTypes2["MossyCobblestoneStairs"] = "minecraft:mossy_cobblestone_stairs";
  MinecraftItemTypes2["MossyCobblestoneWall"] = "minecraft:mossy_cobblestone_wall";
  MinecraftItemTypes2["MossyStoneBrickSlab"] = "minecraft:mossy_stone_brick_slab";
  MinecraftItemTypes2["MossyStoneBrickStairs"] = "minecraft:mossy_stone_brick_stairs";
  MinecraftItemTypes2["MossyStoneBrickWall"] = "minecraft:mossy_stone_brick_wall";
  MinecraftItemTypes2["MossyStoneBricks"] = "minecraft:mossy_stone_bricks";
  MinecraftItemTypes2["MournerPotterySherd"] = "minecraft:mourner_pottery_sherd";
  MinecraftItemTypes2["Mud"] = "minecraft:mud";
  MinecraftItemTypes2["MudBrickSlab"] = "minecraft:mud_brick_slab";
  MinecraftItemTypes2["MudBrickStairs"] = "minecraft:mud_brick_stairs";
  MinecraftItemTypes2["MudBrickWall"] = "minecraft:mud_brick_wall";
  MinecraftItemTypes2["MudBricks"] = "minecraft:mud_bricks";
  MinecraftItemTypes2["MuddyMangroveRoots"] = "minecraft:muddy_mangrove_roots";
  MinecraftItemTypes2["MuleSpawnEgg"] = "minecraft:mule_spawn_egg";
  MinecraftItemTypes2["MushroomStem"] = "minecraft:mushroom_stem";
  MinecraftItemTypes2["MushroomStew"] = "minecraft:mushroom_stew";
  MinecraftItemTypes2["MusicDisc11"] = "minecraft:music_disc_11";
  MinecraftItemTypes2["MusicDisc13"] = "minecraft:music_disc_13";
  MinecraftItemTypes2["MusicDisc5"] = "minecraft:music_disc_5";
  MinecraftItemTypes2["MusicDiscBlocks"] = "minecraft:music_disc_blocks";
  MinecraftItemTypes2["MusicDiscCat"] = "minecraft:music_disc_cat";
  MinecraftItemTypes2["MusicDiscChirp"] = "minecraft:music_disc_chirp";
  MinecraftItemTypes2["MusicDiscCreator"] = "minecraft:music_disc_creator";
  MinecraftItemTypes2["MusicDiscCreatorMusicBox"] = "minecraft:music_disc_creator_music_box";
  MinecraftItemTypes2["MusicDiscFar"] = "minecraft:music_disc_far";
  MinecraftItemTypes2["MusicDiscLavaChicken"] = "minecraft:music_disc_lava_chicken";
  MinecraftItemTypes2["MusicDiscMall"] = "minecraft:music_disc_mall";
  MinecraftItemTypes2["MusicDiscMellohi"] = "minecraft:music_disc_mellohi";
  MinecraftItemTypes2["MusicDiscOtherside"] = "minecraft:music_disc_otherside";
  MinecraftItemTypes2["MusicDiscPigstep"] = "minecraft:music_disc_pigstep";
  MinecraftItemTypes2["MusicDiscPrecipice"] = "minecraft:music_disc_precipice";
  MinecraftItemTypes2["MusicDiscRelic"] = "minecraft:music_disc_relic";
  MinecraftItemTypes2["MusicDiscStal"] = "minecraft:music_disc_stal";
  MinecraftItemTypes2["MusicDiscStrad"] = "minecraft:music_disc_strad";
  MinecraftItemTypes2["MusicDiscTears"] = "minecraft:music_disc_tears";
  MinecraftItemTypes2["MusicDiscWait"] = "minecraft:music_disc_wait";
  MinecraftItemTypes2["MusicDiscWard"] = "minecraft:music_disc_ward";
  MinecraftItemTypes2["Mutton"] = "minecraft:mutton";
  MinecraftItemTypes2["Mycelium"] = "minecraft:mycelium";
  MinecraftItemTypes2["NameTag"] = "minecraft:name_tag";
  MinecraftItemTypes2["NautilusShell"] = "minecraft:nautilus_shell";
  MinecraftItemTypes2["NautilusSpawnEgg"] = "minecraft:nautilus_spawn_egg";
  MinecraftItemTypes2["NetherBrick"] = "minecraft:nether_brick";
  MinecraftItemTypes2["NetherBrickFence"] = "minecraft:nether_brick_fence";
  MinecraftItemTypes2["NetherBrickSlab"] = "minecraft:nether_brick_slab";
  MinecraftItemTypes2["NetherBrickStairs"] = "minecraft:nether_brick_stairs";
  MinecraftItemTypes2["NetherBrickWall"] = "minecraft:nether_brick_wall";
  MinecraftItemTypes2["NetherGoldOre"] = "minecraft:nether_gold_ore";
  MinecraftItemTypes2["NetherSprouts"] = "minecraft:nether_sprouts";
  MinecraftItemTypes2["NetherStar"] = "minecraft:nether_star";
  MinecraftItemTypes2["NetherWart"] = "minecraft:nether_wart";
  MinecraftItemTypes2["NetherWartBlock"] = "minecraft:nether_wart_block";
  MinecraftItemTypes2["Netherbrick"] = "minecraft:netherbrick";
  MinecraftItemTypes2["NetheriteAxe"] = "minecraft:netherite_axe";
  MinecraftItemTypes2["NetheriteBlock"] = "minecraft:netherite_block";
  MinecraftItemTypes2["NetheriteBoots"] = "minecraft:netherite_boots";
  MinecraftItemTypes2["NetheriteChestplate"] = "minecraft:netherite_chestplate";
  MinecraftItemTypes2["NetheriteHelmet"] = "minecraft:netherite_helmet";
  MinecraftItemTypes2["NetheriteHoe"] = "minecraft:netherite_hoe";
  MinecraftItemTypes2["NetheriteHorseArmor"] = "minecraft:netherite_horse_armor";
  MinecraftItemTypes2["NetheriteIngot"] = "minecraft:netherite_ingot";
  MinecraftItemTypes2["NetheriteLeggings"] = "minecraft:netherite_leggings";
  MinecraftItemTypes2["NetheriteNautilusArmor"] = "minecraft:netherite_nautilus_armor";
  MinecraftItemTypes2["NetheritePickaxe"] = "minecraft:netherite_pickaxe";
  MinecraftItemTypes2["NetheriteScrap"] = "minecraft:netherite_scrap";
  MinecraftItemTypes2["NetheriteShovel"] = "minecraft:netherite_shovel";
  MinecraftItemTypes2["NetheriteSpear"] = "minecraft:netherite_spear";
  MinecraftItemTypes2["NetheriteSword"] = "minecraft:netherite_sword";
  MinecraftItemTypes2["NetheriteUpgradeSmithingTemplate"] = "minecraft:netherite_upgrade_smithing_template";
  MinecraftItemTypes2["Netherrack"] = "minecraft:netherrack";
  MinecraftItemTypes2["NormalStoneSlab"] = "minecraft:normal_stone_slab";
  MinecraftItemTypes2["NormalStoneStairs"] = "minecraft:normal_stone_stairs";
  MinecraftItemTypes2["Noteblock"] = "minecraft:noteblock";
  MinecraftItemTypes2["OakBoat"] = "minecraft:oak_boat";
  MinecraftItemTypes2["OakChestBoat"] = "minecraft:oak_chest_boat";
  MinecraftItemTypes2["OakFence"] = "minecraft:oak_fence";
  MinecraftItemTypes2["OakHangingSign"] = "minecraft:oak_hanging_sign";
  MinecraftItemTypes2["OakLeaves"] = "minecraft:oak_leaves";
  MinecraftItemTypes2["OakLog"] = "minecraft:oak_log";
  MinecraftItemTypes2["OakPlanks"] = "minecraft:oak_planks";
  MinecraftItemTypes2["OakSapling"] = "minecraft:oak_sapling";
  MinecraftItemTypes2["OakShelf"] = "minecraft:oak_shelf";
  MinecraftItemTypes2["OakSign"] = "minecraft:oak_sign";
  MinecraftItemTypes2["OakSlab"] = "minecraft:oak_slab";
  MinecraftItemTypes2["OakStairs"] = "minecraft:oak_stairs";
  MinecraftItemTypes2["OakWood"] = "minecraft:oak_wood";
  MinecraftItemTypes2["Observer"] = "minecraft:observer";
  MinecraftItemTypes2["Obsidian"] = "minecraft:obsidian";
  MinecraftItemTypes2["OcelotSpawnEgg"] = "minecraft:ocelot_spawn_egg";
  MinecraftItemTypes2["OchreFroglight"] = "minecraft:ochre_froglight";
  MinecraftItemTypes2["OminousBottle"] = "minecraft:ominous_bottle";
  MinecraftItemTypes2["OminousTrialKey"] = "minecraft:ominous_trial_key";
  MinecraftItemTypes2["OpenEyeblossom"] = "minecraft:open_eyeblossom";
  MinecraftItemTypes2["OrangeBundle"] = "minecraft:orange_bundle";
  MinecraftItemTypes2["OrangeCandle"] = "minecraft:orange_candle";
  MinecraftItemTypes2["OrangeCarpet"] = "minecraft:orange_carpet";
  MinecraftItemTypes2["OrangeConcrete"] = "minecraft:orange_concrete";
  MinecraftItemTypes2["OrangeConcretePowder"] = "minecraft:orange_concrete_powder";
  MinecraftItemTypes2["OrangeDye"] = "minecraft:orange_dye";
  MinecraftItemTypes2["OrangeGlazedTerracotta"] = "minecraft:orange_glazed_terracotta";
  MinecraftItemTypes2["OrangeHarness"] = "minecraft:orange_harness";
  MinecraftItemTypes2["OrangeShulkerBox"] = "minecraft:orange_shulker_box";
  MinecraftItemTypes2["OrangeStainedGlass"] = "minecraft:orange_stained_glass";
  MinecraftItemTypes2["OrangeStainedGlassPane"] = "minecraft:orange_stained_glass_pane";
  MinecraftItemTypes2["OrangeTerracotta"] = "minecraft:orange_terracotta";
  MinecraftItemTypes2["OrangeTulip"] = "minecraft:orange_tulip";
  MinecraftItemTypes2["OrangeWool"] = "minecraft:orange_wool";
  MinecraftItemTypes2["OxeyeDaisy"] = "minecraft:oxeye_daisy";
  MinecraftItemTypes2["OxidizedChiseledCopper"] = "minecraft:oxidized_chiseled_copper";
  MinecraftItemTypes2["OxidizedCopper"] = "minecraft:oxidized_copper";
  MinecraftItemTypes2["OxidizedCopperBars"] = "minecraft:oxidized_copper_bars";
  MinecraftItemTypes2["OxidizedCopperBulb"] = "minecraft:oxidized_copper_bulb";
  MinecraftItemTypes2["OxidizedCopperChain"] = "minecraft:oxidized_copper_chain";
  MinecraftItemTypes2["OxidizedCopperChest"] = "minecraft:oxidized_copper_chest";
  MinecraftItemTypes2["OxidizedCopperDoor"] = "minecraft:oxidized_copper_door";
  MinecraftItemTypes2["OxidizedCopperGolemStatue"] = "minecraft:oxidized_copper_golem_statue";
  MinecraftItemTypes2["OxidizedCopperGrate"] = "minecraft:oxidized_copper_grate";
  MinecraftItemTypes2["OxidizedCopperLantern"] = "minecraft:oxidized_copper_lantern";
  MinecraftItemTypes2["OxidizedCopperTrapdoor"] = "minecraft:oxidized_copper_trapdoor";
  MinecraftItemTypes2["OxidizedCutCopper"] = "minecraft:oxidized_cut_copper";
  MinecraftItemTypes2["OxidizedCutCopperSlab"] = "minecraft:oxidized_cut_copper_slab";
  MinecraftItemTypes2["OxidizedCutCopperStairs"] = "minecraft:oxidized_cut_copper_stairs";
  MinecraftItemTypes2["OxidizedLightningRod"] = "minecraft:oxidized_lightning_rod";
  MinecraftItemTypes2["PackedIce"] = "minecraft:packed_ice";
  MinecraftItemTypes2["PackedMud"] = "minecraft:packed_mud";
  MinecraftItemTypes2["Painting"] = "minecraft:painting";
  MinecraftItemTypes2["PaleHangingMoss"] = "minecraft:pale_hanging_moss";
  MinecraftItemTypes2["PaleMossBlock"] = "minecraft:pale_moss_block";
  MinecraftItemTypes2["PaleMossCarpet"] = "minecraft:pale_moss_carpet";
  MinecraftItemTypes2["PaleOakBoat"] = "minecraft:pale_oak_boat";
  MinecraftItemTypes2["PaleOakButton"] = "minecraft:pale_oak_button";
  MinecraftItemTypes2["PaleOakChestBoat"] = "minecraft:pale_oak_chest_boat";
  MinecraftItemTypes2["PaleOakDoor"] = "minecraft:pale_oak_door";
  MinecraftItemTypes2["PaleOakFence"] = "minecraft:pale_oak_fence";
  MinecraftItemTypes2["PaleOakFenceGate"] = "minecraft:pale_oak_fence_gate";
  MinecraftItemTypes2["PaleOakHangingSign"] = "minecraft:pale_oak_hanging_sign";
  MinecraftItemTypes2["PaleOakLeaves"] = "minecraft:pale_oak_leaves";
  MinecraftItemTypes2["PaleOakLog"] = "minecraft:pale_oak_log";
  MinecraftItemTypes2["PaleOakPlanks"] = "minecraft:pale_oak_planks";
  MinecraftItemTypes2["PaleOakPressurePlate"] = "minecraft:pale_oak_pressure_plate";
  MinecraftItemTypes2["PaleOakSapling"] = "minecraft:pale_oak_sapling";
  MinecraftItemTypes2["PaleOakShelf"] = "minecraft:pale_oak_shelf";
  MinecraftItemTypes2["PaleOakSign"] = "minecraft:pale_oak_sign";
  MinecraftItemTypes2["PaleOakSlab"] = "minecraft:pale_oak_slab";
  MinecraftItemTypes2["PaleOakStairs"] = "minecraft:pale_oak_stairs";
  MinecraftItemTypes2["PaleOakTrapdoor"] = "minecraft:pale_oak_trapdoor";
  MinecraftItemTypes2["PaleOakWood"] = "minecraft:pale_oak_wood";
  MinecraftItemTypes2["PandaSpawnEgg"] = "minecraft:panda_spawn_egg";
  MinecraftItemTypes2["Paper"] = "minecraft:paper";
  MinecraftItemTypes2["ParchedSpawnEgg"] = "minecraft:parched_spawn_egg";
  MinecraftItemTypes2["ParrotSpawnEgg"] = "minecraft:parrot_spawn_egg";
  MinecraftItemTypes2["PearlescentFroglight"] = "minecraft:pearlescent_froglight";
  MinecraftItemTypes2["Peony"] = "minecraft:peony";
  MinecraftItemTypes2["PetrifiedOakSlab"] = "minecraft:petrified_oak_slab";
  MinecraftItemTypes2["PhantomMembrane"] = "minecraft:phantom_membrane";
  MinecraftItemTypes2["PhantomSpawnEgg"] = "minecraft:phantom_spawn_egg";
  MinecraftItemTypes2["PigSpawnEgg"] = "minecraft:pig_spawn_egg";
  MinecraftItemTypes2["PiglinBannerPattern"] = "minecraft:piglin_banner_pattern";
  MinecraftItemTypes2["PiglinBruteSpawnEgg"] = "minecraft:piglin_brute_spawn_egg";
  MinecraftItemTypes2["PiglinHead"] = "minecraft:piglin_head";
  MinecraftItemTypes2["PiglinSpawnEgg"] = "minecraft:piglin_spawn_egg";
  MinecraftItemTypes2["PillagerSpawnEgg"] = "minecraft:pillager_spawn_egg";
  MinecraftItemTypes2["PinkBundle"] = "minecraft:pink_bundle";
  MinecraftItemTypes2["PinkCandle"] = "minecraft:pink_candle";
  MinecraftItemTypes2["PinkCarpet"] = "minecraft:pink_carpet";
  MinecraftItemTypes2["PinkConcrete"] = "minecraft:pink_concrete";
  MinecraftItemTypes2["PinkConcretePowder"] = "minecraft:pink_concrete_powder";
  MinecraftItemTypes2["PinkDye"] = "minecraft:pink_dye";
  MinecraftItemTypes2["PinkGlazedTerracotta"] = "minecraft:pink_glazed_terracotta";
  MinecraftItemTypes2["PinkHarness"] = "minecraft:pink_harness";
  MinecraftItemTypes2["PinkPetals"] = "minecraft:pink_petals";
  MinecraftItemTypes2["PinkShulkerBox"] = "minecraft:pink_shulker_box";
  MinecraftItemTypes2["PinkStainedGlass"] = "minecraft:pink_stained_glass";
  MinecraftItemTypes2["PinkStainedGlassPane"] = "minecraft:pink_stained_glass_pane";
  MinecraftItemTypes2["PinkTerracotta"] = "minecraft:pink_terracotta";
  MinecraftItemTypes2["PinkTulip"] = "minecraft:pink_tulip";
  MinecraftItemTypes2["PinkWool"] = "minecraft:pink_wool";
  MinecraftItemTypes2["Piston"] = "minecraft:piston";
  MinecraftItemTypes2["PitcherPlant"] = "minecraft:pitcher_plant";
  MinecraftItemTypes2["PitcherPod"] = "minecraft:pitcher_pod";
  MinecraftItemTypes2["PlayerHead"] = "minecraft:player_head";
  MinecraftItemTypes2["PlentyPotterySherd"] = "minecraft:plenty_pottery_sherd";
  MinecraftItemTypes2["Podzol"] = "minecraft:podzol";
  MinecraftItemTypes2["PointedDripstone"] = "minecraft:pointed_dripstone";
  MinecraftItemTypes2["PoisonousPotato"] = "minecraft:poisonous_potato";
  MinecraftItemTypes2["PolarBearSpawnEgg"] = "minecraft:polar_bear_spawn_egg";
  MinecraftItemTypes2["PolishedAndesite"] = "minecraft:polished_andesite";
  MinecraftItemTypes2["PolishedAndesiteSlab"] = "minecraft:polished_andesite_slab";
  MinecraftItemTypes2["PolishedAndesiteStairs"] = "minecraft:polished_andesite_stairs";
  MinecraftItemTypes2["PolishedBasalt"] = "minecraft:polished_basalt";
  MinecraftItemTypes2["PolishedBlackstone"] = "minecraft:polished_blackstone";
  MinecraftItemTypes2["PolishedBlackstoneBrickSlab"] = "minecraft:polished_blackstone_brick_slab";
  MinecraftItemTypes2["PolishedBlackstoneBrickStairs"] = "minecraft:polished_blackstone_brick_stairs";
  MinecraftItemTypes2["PolishedBlackstoneBrickWall"] = "minecraft:polished_blackstone_brick_wall";
  MinecraftItemTypes2["PolishedBlackstoneBricks"] = "minecraft:polished_blackstone_bricks";
  MinecraftItemTypes2["PolishedBlackstoneButton"] = "minecraft:polished_blackstone_button";
  MinecraftItemTypes2["PolishedBlackstonePressurePlate"] = "minecraft:polished_blackstone_pressure_plate";
  MinecraftItemTypes2["PolishedBlackstoneSlab"] = "minecraft:polished_blackstone_slab";
  MinecraftItemTypes2["PolishedBlackstoneStairs"] = "minecraft:polished_blackstone_stairs";
  MinecraftItemTypes2["PolishedBlackstoneWall"] = "minecraft:polished_blackstone_wall";
  MinecraftItemTypes2["PolishedDeepslate"] = "minecraft:polished_deepslate";
  MinecraftItemTypes2["PolishedDeepslateSlab"] = "minecraft:polished_deepslate_slab";
  MinecraftItemTypes2["PolishedDeepslateStairs"] = "minecraft:polished_deepslate_stairs";
  MinecraftItemTypes2["PolishedDeepslateWall"] = "minecraft:polished_deepslate_wall";
  MinecraftItemTypes2["PolishedDiorite"] = "minecraft:polished_diorite";
  MinecraftItemTypes2["PolishedDioriteSlab"] = "minecraft:polished_diorite_slab";
  MinecraftItemTypes2["PolishedDioriteStairs"] = "minecraft:polished_diorite_stairs";
  MinecraftItemTypes2["PolishedGranite"] = "minecraft:polished_granite";
  MinecraftItemTypes2["PolishedGraniteSlab"] = "minecraft:polished_granite_slab";
  MinecraftItemTypes2["PolishedGraniteStairs"] = "minecraft:polished_granite_stairs";
  MinecraftItemTypes2["PolishedTuff"] = "minecraft:polished_tuff";
  MinecraftItemTypes2["PolishedTuffSlab"] = "minecraft:polished_tuff_slab";
  MinecraftItemTypes2["PolishedTuffStairs"] = "minecraft:polished_tuff_stairs";
  MinecraftItemTypes2["PolishedTuffWall"] = "minecraft:polished_tuff_wall";
  MinecraftItemTypes2["PoppedChorusFruit"] = "minecraft:popped_chorus_fruit";
  MinecraftItemTypes2["Poppy"] = "minecraft:poppy";
  MinecraftItemTypes2["Porkchop"] = "minecraft:porkchop";
  MinecraftItemTypes2["Potato"] = "minecraft:potato";
  MinecraftItemTypes2["Potion"] = "minecraft:potion";
  MinecraftItemTypes2["PowderSnowBucket"] = "minecraft:powder_snow_bucket";
  MinecraftItemTypes2["Prismarine"] = "minecraft:prismarine";
  MinecraftItemTypes2["PrismarineBrickSlab"] = "minecraft:prismarine_brick_slab";
  MinecraftItemTypes2["PrismarineBricks"] = "minecraft:prismarine_bricks";
  MinecraftItemTypes2["PrismarineBricksStairs"] = "minecraft:prismarine_bricks_stairs";
  MinecraftItemTypes2["PrismarineCrystals"] = "minecraft:prismarine_crystals";
  MinecraftItemTypes2["PrismarineShard"] = "minecraft:prismarine_shard";
  MinecraftItemTypes2["PrismarineSlab"] = "minecraft:prismarine_slab";
  MinecraftItemTypes2["PrismarineStairs"] = "minecraft:prismarine_stairs";
  MinecraftItemTypes2["PrismarineWall"] = "minecraft:prismarine_wall";
  MinecraftItemTypes2["PrizePotterySherd"] = "minecraft:prize_pottery_sherd";
  MinecraftItemTypes2["Pufferfish"] = "minecraft:pufferfish";
  MinecraftItemTypes2["PufferfishBucket"] = "minecraft:pufferfish_bucket";
  MinecraftItemTypes2["PufferfishSpawnEgg"] = "minecraft:pufferfish_spawn_egg";
  MinecraftItemTypes2["Pumpkin"] = "minecraft:pumpkin";
  MinecraftItemTypes2["PumpkinPie"] = "minecraft:pumpkin_pie";
  MinecraftItemTypes2["PumpkinSeeds"] = "minecraft:pumpkin_seeds";
  MinecraftItemTypes2["PurpleBundle"] = "minecraft:purple_bundle";
  MinecraftItemTypes2["PurpleCandle"] = "minecraft:purple_candle";
  MinecraftItemTypes2["PurpleCarpet"] = "minecraft:purple_carpet";
  MinecraftItemTypes2["PurpleConcrete"] = "minecraft:purple_concrete";
  MinecraftItemTypes2["PurpleConcretePowder"] = "minecraft:purple_concrete_powder";
  MinecraftItemTypes2["PurpleDye"] = "minecraft:purple_dye";
  MinecraftItemTypes2["PurpleGlazedTerracotta"] = "minecraft:purple_glazed_terracotta";
  MinecraftItemTypes2["PurpleHarness"] = "minecraft:purple_harness";
  MinecraftItemTypes2["PurpleShulkerBox"] = "minecraft:purple_shulker_box";
  MinecraftItemTypes2["PurpleStainedGlass"] = "minecraft:purple_stained_glass";
  MinecraftItemTypes2["PurpleStainedGlassPane"] = "minecraft:purple_stained_glass_pane";
  MinecraftItemTypes2["PurpleTerracotta"] = "minecraft:purple_terracotta";
  MinecraftItemTypes2["PurpleWool"] = "minecraft:purple_wool";
  MinecraftItemTypes2["PurpurBlock"] = "minecraft:purpur_block";
  MinecraftItemTypes2["PurpurPillar"] = "minecraft:purpur_pillar";
  MinecraftItemTypes2["PurpurSlab"] = "minecraft:purpur_slab";
  MinecraftItemTypes2["PurpurStairs"] = "minecraft:purpur_stairs";
  MinecraftItemTypes2["Quartz"] = "minecraft:quartz";
  MinecraftItemTypes2["QuartzBlock"] = "minecraft:quartz_block";
  MinecraftItemTypes2["QuartzBricks"] = "minecraft:quartz_bricks";
  MinecraftItemTypes2["QuartzOre"] = "minecraft:quartz_ore";
  MinecraftItemTypes2["QuartzPillar"] = "minecraft:quartz_pillar";
  MinecraftItemTypes2["QuartzSlab"] = "minecraft:quartz_slab";
  MinecraftItemTypes2["QuartzStairs"] = "minecraft:quartz_stairs";
  MinecraftItemTypes2["Rabbit"] = "minecraft:rabbit";
  MinecraftItemTypes2["RabbitFoot"] = "minecraft:rabbit_foot";
  MinecraftItemTypes2["RabbitHide"] = "minecraft:rabbit_hide";
  MinecraftItemTypes2["RabbitSpawnEgg"] = "minecraft:rabbit_spawn_egg";
  MinecraftItemTypes2["RabbitStew"] = "minecraft:rabbit_stew";
  MinecraftItemTypes2["Rail"] = "minecraft:rail";
  MinecraftItemTypes2["RaiserArmorTrimSmithingTemplate"] = "minecraft:raiser_armor_trim_smithing_template";
  MinecraftItemTypes2["RavagerSpawnEgg"] = "minecraft:ravager_spawn_egg";
  MinecraftItemTypes2["RawCopper"] = "minecraft:raw_copper";
  MinecraftItemTypes2["RawCopperBlock"] = "minecraft:raw_copper_block";
  MinecraftItemTypes2["RawGold"] = "minecraft:raw_gold";
  MinecraftItemTypes2["RawGoldBlock"] = "minecraft:raw_gold_block";
  MinecraftItemTypes2["RawIron"] = "minecraft:raw_iron";
  MinecraftItemTypes2["RawIronBlock"] = "minecraft:raw_iron_block";
  MinecraftItemTypes2["RecoveryCompass"] = "minecraft:recovery_compass";
  MinecraftItemTypes2["RedBundle"] = "minecraft:red_bundle";
  MinecraftItemTypes2["RedCandle"] = "minecraft:red_candle";
  MinecraftItemTypes2["RedCarpet"] = "minecraft:red_carpet";
  MinecraftItemTypes2["RedConcrete"] = "minecraft:red_concrete";
  MinecraftItemTypes2["RedConcretePowder"] = "minecraft:red_concrete_powder";
  MinecraftItemTypes2["RedDye"] = "minecraft:red_dye";
  MinecraftItemTypes2["RedGlazedTerracotta"] = "minecraft:red_glazed_terracotta";
  MinecraftItemTypes2["RedHarness"] = "minecraft:red_harness";
  MinecraftItemTypes2["RedMushroom"] = "minecraft:red_mushroom";
  MinecraftItemTypes2["RedMushroomBlock"] = "minecraft:red_mushroom_block";
  MinecraftItemTypes2["RedNetherBrick"] = "minecraft:red_nether_brick";
  MinecraftItemTypes2["RedNetherBrickSlab"] = "minecraft:red_nether_brick_slab";
  MinecraftItemTypes2["RedNetherBrickStairs"] = "minecraft:red_nether_brick_stairs";
  MinecraftItemTypes2["RedNetherBrickWall"] = "minecraft:red_nether_brick_wall";
  MinecraftItemTypes2["RedSand"] = "minecraft:red_sand";
  MinecraftItemTypes2["RedSandstone"] = "minecraft:red_sandstone";
  MinecraftItemTypes2["RedSandstoneSlab"] = "minecraft:red_sandstone_slab";
  MinecraftItemTypes2["RedSandstoneStairs"] = "minecraft:red_sandstone_stairs";
  MinecraftItemTypes2["RedSandstoneWall"] = "minecraft:red_sandstone_wall";
  MinecraftItemTypes2["RedShulkerBox"] = "minecraft:red_shulker_box";
  MinecraftItemTypes2["RedStainedGlass"] = "minecraft:red_stained_glass";
  MinecraftItemTypes2["RedStainedGlassPane"] = "minecraft:red_stained_glass_pane";
  MinecraftItemTypes2["RedTerracotta"] = "minecraft:red_terracotta";
  MinecraftItemTypes2["RedTulip"] = "minecraft:red_tulip";
  MinecraftItemTypes2["RedWool"] = "minecraft:red_wool";
  MinecraftItemTypes2["Redstone"] = "minecraft:redstone";
  MinecraftItemTypes2["RedstoneBlock"] = "minecraft:redstone_block";
  MinecraftItemTypes2["RedstoneLamp"] = "minecraft:redstone_lamp";
  MinecraftItemTypes2["RedstoneOre"] = "minecraft:redstone_ore";
  MinecraftItemTypes2["RedstoneTorch"] = "minecraft:redstone_torch";
  MinecraftItemTypes2["ReinforcedDeepslate"] = "minecraft:reinforced_deepslate";
  MinecraftItemTypes2["Repeater"] = "minecraft:repeater";
  MinecraftItemTypes2["RepeatingCommandBlock"] = "minecraft:repeating_command_block";
  MinecraftItemTypes2["ResinBlock"] = "minecraft:resin_block";
  MinecraftItemTypes2["ResinBrick"] = "minecraft:resin_brick";
  MinecraftItemTypes2["ResinBrickSlab"] = "minecraft:resin_brick_slab";
  MinecraftItemTypes2["ResinBrickStairs"] = "minecraft:resin_brick_stairs";
  MinecraftItemTypes2["ResinBrickWall"] = "minecraft:resin_brick_wall";
  MinecraftItemTypes2["ResinBricks"] = "minecraft:resin_bricks";
  MinecraftItemTypes2["ResinClump"] = "minecraft:resin_clump";
  MinecraftItemTypes2["RespawnAnchor"] = "minecraft:respawn_anchor";
  MinecraftItemTypes2["RibArmorTrimSmithingTemplate"] = "minecraft:rib_armor_trim_smithing_template";
  MinecraftItemTypes2["RoseBush"] = "minecraft:rose_bush";
  MinecraftItemTypes2["RottenFlesh"] = "minecraft:rotten_flesh";
  MinecraftItemTypes2["Saddle"] = "minecraft:saddle";
  MinecraftItemTypes2["Salmon"] = "minecraft:salmon";
  MinecraftItemTypes2["SalmonBucket"] = "minecraft:salmon_bucket";
  MinecraftItemTypes2["SalmonSpawnEgg"] = "minecraft:salmon_spawn_egg";
  MinecraftItemTypes2["Sand"] = "minecraft:sand";
  MinecraftItemTypes2["Sandstone"] = "minecraft:sandstone";
  MinecraftItemTypes2["SandstoneSlab"] = "minecraft:sandstone_slab";
  MinecraftItemTypes2["SandstoneStairs"] = "minecraft:sandstone_stairs";
  MinecraftItemTypes2["SandstoneWall"] = "minecraft:sandstone_wall";
  MinecraftItemTypes2["Scaffolding"] = "minecraft:scaffolding";
  MinecraftItemTypes2["ScrapePotterySherd"] = "minecraft:scrape_pottery_sherd";
  MinecraftItemTypes2["Sculk"] = "minecraft:sculk";
  MinecraftItemTypes2["SculkCatalyst"] = "minecraft:sculk_catalyst";
  MinecraftItemTypes2["SculkSensor"] = "minecraft:sculk_sensor";
  MinecraftItemTypes2["SculkShrieker"] = "minecraft:sculk_shrieker";
  MinecraftItemTypes2["SculkVein"] = "minecraft:sculk_vein";
  MinecraftItemTypes2["SeaLantern"] = "minecraft:sea_lantern";
  MinecraftItemTypes2["SeaPickle"] = "minecraft:sea_pickle";
  MinecraftItemTypes2["Seagrass"] = "minecraft:seagrass";
  MinecraftItemTypes2["SentryArmorTrimSmithingTemplate"] = "minecraft:sentry_armor_trim_smithing_template";
  MinecraftItemTypes2["ShaperArmorTrimSmithingTemplate"] = "minecraft:shaper_armor_trim_smithing_template";
  MinecraftItemTypes2["SheafPotterySherd"] = "minecraft:sheaf_pottery_sherd";
  MinecraftItemTypes2["Shears"] = "minecraft:shears";
  MinecraftItemTypes2["SheepSpawnEgg"] = "minecraft:sheep_spawn_egg";
  MinecraftItemTypes2["ShelterPotterySherd"] = "minecraft:shelter_pottery_sherd";
  MinecraftItemTypes2["Shield"] = "minecraft:shield";
  MinecraftItemTypes2["ShortDryGrass"] = "minecraft:short_dry_grass";
  MinecraftItemTypes2["ShortGrass"] = "minecraft:short_grass";
  MinecraftItemTypes2["Shroomlight"] = "minecraft:shroomlight";
  MinecraftItemTypes2["ShulkerShell"] = "minecraft:shulker_shell";
  MinecraftItemTypes2["ShulkerSpawnEgg"] = "minecraft:shulker_spawn_egg";
  MinecraftItemTypes2["SilenceArmorTrimSmithingTemplate"] = "minecraft:silence_armor_trim_smithing_template";
  MinecraftItemTypes2["SilverGlazedTerracotta"] = "minecraft:silver_glazed_terracotta";
  MinecraftItemTypes2["SilverfishSpawnEgg"] = "minecraft:silverfish_spawn_egg";
  MinecraftItemTypes2["SkeletonHorseSpawnEgg"] = "minecraft:skeleton_horse_spawn_egg";
  MinecraftItemTypes2["SkeletonSkull"] = "minecraft:skeleton_skull";
  MinecraftItemTypes2["SkeletonSpawnEgg"] = "minecraft:skeleton_spawn_egg";
  MinecraftItemTypes2["SkullBannerPattern"] = "minecraft:skull_banner_pattern";
  MinecraftItemTypes2["SkullPotterySherd"] = "minecraft:skull_pottery_sherd";
  MinecraftItemTypes2["Slime"] = "minecraft:slime";
  MinecraftItemTypes2["SlimeBall"] = "minecraft:slime_ball";
  MinecraftItemTypes2["SlimeSpawnEgg"] = "minecraft:slime_spawn_egg";
  MinecraftItemTypes2["SmallAmethystBud"] = "minecraft:small_amethyst_bud";
  MinecraftItemTypes2["SmallDripleafBlock"] = "minecraft:small_dripleaf_block";
  MinecraftItemTypes2["SmithingTable"] = "minecraft:smithing_table";
  MinecraftItemTypes2["Smoker"] = "minecraft:smoker";
  MinecraftItemTypes2["SmoothBasalt"] = "minecraft:smooth_basalt";
  MinecraftItemTypes2["SmoothQuartz"] = "minecraft:smooth_quartz";
  MinecraftItemTypes2["SmoothQuartzSlab"] = "minecraft:smooth_quartz_slab";
  MinecraftItemTypes2["SmoothQuartzStairs"] = "minecraft:smooth_quartz_stairs";
  MinecraftItemTypes2["SmoothRedSandstone"] = "minecraft:smooth_red_sandstone";
  MinecraftItemTypes2["SmoothRedSandstoneSlab"] = "minecraft:smooth_red_sandstone_slab";
  MinecraftItemTypes2["SmoothRedSandstoneStairs"] = "minecraft:smooth_red_sandstone_stairs";
  MinecraftItemTypes2["SmoothSandstone"] = "minecraft:smooth_sandstone";
  MinecraftItemTypes2["SmoothSandstoneSlab"] = "minecraft:smooth_sandstone_slab";
  MinecraftItemTypes2["SmoothSandstoneStairs"] = "minecraft:smooth_sandstone_stairs";
  MinecraftItemTypes2["SmoothStone"] = "minecraft:smooth_stone";
  MinecraftItemTypes2["SmoothStoneSlab"] = "minecraft:smooth_stone_slab";
  MinecraftItemTypes2["SnifferEgg"] = "minecraft:sniffer_egg";
  MinecraftItemTypes2["SnifferSpawnEgg"] = "minecraft:sniffer_spawn_egg";
  MinecraftItemTypes2["SnortPotterySherd"] = "minecraft:snort_pottery_sherd";
  MinecraftItemTypes2["SnoutArmorTrimSmithingTemplate"] = "minecraft:snout_armor_trim_smithing_template";
  MinecraftItemTypes2["Snow"] = "minecraft:snow";
  MinecraftItemTypes2["SnowGolemSpawnEgg"] = "minecraft:snow_golem_spawn_egg";
  MinecraftItemTypes2["SnowLayer"] = "minecraft:snow_layer";
  MinecraftItemTypes2["Snowball"] = "minecraft:snowball";
  MinecraftItemTypes2["SoulCampfire"] = "minecraft:soul_campfire";
  MinecraftItemTypes2["SoulLantern"] = "minecraft:soul_lantern";
  MinecraftItemTypes2["SoulSand"] = "minecraft:soul_sand";
  MinecraftItemTypes2["SoulSoil"] = "minecraft:soul_soil";
  MinecraftItemTypes2["SoulTorch"] = "minecraft:soul_torch";
  MinecraftItemTypes2["SpiderEye"] = "minecraft:spider_eye";
  MinecraftItemTypes2["SpiderSpawnEgg"] = "minecraft:spider_spawn_egg";
  MinecraftItemTypes2["SpireArmorTrimSmithingTemplate"] = "minecraft:spire_armor_trim_smithing_template";
  MinecraftItemTypes2["SplashPotion"] = "minecraft:splash_potion";
  MinecraftItemTypes2["Sponge"] = "minecraft:sponge";
  MinecraftItemTypes2["SporeBlossom"] = "minecraft:spore_blossom";
  MinecraftItemTypes2["SpruceBoat"] = "minecraft:spruce_boat";
  MinecraftItemTypes2["SpruceButton"] = "minecraft:spruce_button";
  MinecraftItemTypes2["SpruceChestBoat"] = "minecraft:spruce_chest_boat";
  MinecraftItemTypes2["SpruceDoor"] = "minecraft:spruce_door";
  MinecraftItemTypes2["SpruceFence"] = "minecraft:spruce_fence";
  MinecraftItemTypes2["SpruceFenceGate"] = "minecraft:spruce_fence_gate";
  MinecraftItemTypes2["SpruceHangingSign"] = "minecraft:spruce_hanging_sign";
  MinecraftItemTypes2["SpruceLeaves"] = "minecraft:spruce_leaves";
  MinecraftItemTypes2["SpruceLog"] = "minecraft:spruce_log";
  MinecraftItemTypes2["SprucePlanks"] = "minecraft:spruce_planks";
  MinecraftItemTypes2["SprucePressurePlate"] = "minecraft:spruce_pressure_plate";
  MinecraftItemTypes2["SpruceSapling"] = "minecraft:spruce_sapling";
  MinecraftItemTypes2["SpruceShelf"] = "minecraft:spruce_shelf";
  MinecraftItemTypes2["SpruceSign"] = "minecraft:spruce_sign";
  MinecraftItemTypes2["SpruceSlab"] = "minecraft:spruce_slab";
  MinecraftItemTypes2["SpruceStairs"] = "minecraft:spruce_stairs";
  MinecraftItemTypes2["SpruceTrapdoor"] = "minecraft:spruce_trapdoor";
  MinecraftItemTypes2["SpruceWood"] = "minecraft:spruce_wood";
  MinecraftItemTypes2["Spyglass"] = "minecraft:spyglass";
  MinecraftItemTypes2["SquidSpawnEgg"] = "minecraft:squid_spawn_egg";
  MinecraftItemTypes2["Stick"] = "minecraft:stick";
  MinecraftItemTypes2["StickyPiston"] = "minecraft:sticky_piston";
  MinecraftItemTypes2["Stone"] = "minecraft:stone";
  MinecraftItemTypes2["StoneAxe"] = "minecraft:stone_axe";
  MinecraftItemTypes2["StoneBrickSlab"] = "minecraft:stone_brick_slab";
  MinecraftItemTypes2["StoneBrickStairs"] = "minecraft:stone_brick_stairs";
  MinecraftItemTypes2["StoneBrickWall"] = "minecraft:stone_brick_wall";
  MinecraftItemTypes2["StoneBricks"] = "minecraft:stone_bricks";
  MinecraftItemTypes2["StoneButton"] = "minecraft:stone_button";
  MinecraftItemTypes2["StoneHoe"] = "minecraft:stone_hoe";
  MinecraftItemTypes2["StonePickaxe"] = "minecraft:stone_pickaxe";
  MinecraftItemTypes2["StonePressurePlate"] = "minecraft:stone_pressure_plate";
  MinecraftItemTypes2["StoneShovel"] = "minecraft:stone_shovel";
  MinecraftItemTypes2["StoneSpear"] = "minecraft:stone_spear";
  MinecraftItemTypes2["StoneStairs"] = "minecraft:stone_stairs";
  MinecraftItemTypes2["StoneSword"] = "minecraft:stone_sword";
  MinecraftItemTypes2["StonecutterBlock"] = "minecraft:stonecutter_block";
  MinecraftItemTypes2["StraySpawnEgg"] = "minecraft:stray_spawn_egg";
  MinecraftItemTypes2["StriderSpawnEgg"] = "minecraft:strider_spawn_egg";
  MinecraftItemTypes2["String"] = "minecraft:string";
  MinecraftItemTypes2["StrippedAcaciaLog"] = "minecraft:stripped_acacia_log";
  MinecraftItemTypes2["StrippedAcaciaWood"] = "minecraft:stripped_acacia_wood";
  MinecraftItemTypes2["StrippedBambooBlock"] = "minecraft:stripped_bamboo_block";
  MinecraftItemTypes2["StrippedBirchLog"] = "minecraft:stripped_birch_log";
  MinecraftItemTypes2["StrippedBirchWood"] = "minecraft:stripped_birch_wood";
  MinecraftItemTypes2["StrippedCherryLog"] = "minecraft:stripped_cherry_log";
  MinecraftItemTypes2["StrippedCherryWood"] = "minecraft:stripped_cherry_wood";
  MinecraftItemTypes2["StrippedCrimsonHyphae"] = "minecraft:stripped_crimson_hyphae";
  MinecraftItemTypes2["StrippedCrimsonStem"] = "minecraft:stripped_crimson_stem";
  MinecraftItemTypes2["StrippedDarkOakLog"] = "minecraft:stripped_dark_oak_log";
  MinecraftItemTypes2["StrippedDarkOakWood"] = "minecraft:stripped_dark_oak_wood";
  MinecraftItemTypes2["StrippedJungleLog"] = "minecraft:stripped_jungle_log";
  MinecraftItemTypes2["StrippedJungleWood"] = "minecraft:stripped_jungle_wood";
  MinecraftItemTypes2["StrippedMangroveLog"] = "minecraft:stripped_mangrove_log";
  MinecraftItemTypes2["StrippedMangroveWood"] = "minecraft:stripped_mangrove_wood";
  MinecraftItemTypes2["StrippedOakLog"] = "minecraft:stripped_oak_log";
  MinecraftItemTypes2["StrippedOakWood"] = "minecraft:stripped_oak_wood";
  MinecraftItemTypes2["StrippedPaleOakLog"] = "minecraft:stripped_pale_oak_log";
  MinecraftItemTypes2["StrippedPaleOakWood"] = "minecraft:stripped_pale_oak_wood";
  MinecraftItemTypes2["StrippedSpruceLog"] = "minecraft:stripped_spruce_log";
  MinecraftItemTypes2["StrippedSpruceWood"] = "minecraft:stripped_spruce_wood";
  MinecraftItemTypes2["StrippedWarpedHyphae"] = "minecraft:stripped_warped_hyphae";
  MinecraftItemTypes2["StrippedWarpedStem"] = "minecraft:stripped_warped_stem";
  MinecraftItemTypes2["StructureBlock"] = "minecraft:structure_block";
  MinecraftItemTypes2["StructureVoid"] = "minecraft:structure_void";
  MinecraftItemTypes2["Sugar"] = "minecraft:sugar";
  MinecraftItemTypes2["SugarCane"] = "minecraft:sugar_cane";
  MinecraftItemTypes2["Sunflower"] = "minecraft:sunflower";
  MinecraftItemTypes2["SuspiciousGravel"] = "minecraft:suspicious_gravel";
  MinecraftItemTypes2["SuspiciousSand"] = "minecraft:suspicious_sand";
  MinecraftItemTypes2["SuspiciousStew"] = "minecraft:suspicious_stew";
  MinecraftItemTypes2["SweetBerries"] = "minecraft:sweet_berries";
  MinecraftItemTypes2["TadpoleBucket"] = "minecraft:tadpole_bucket";
  MinecraftItemTypes2["TadpoleSpawnEgg"] = "minecraft:tadpole_spawn_egg";
  MinecraftItemTypes2["TallDryGrass"] = "minecraft:tall_dry_grass";
  MinecraftItemTypes2["TallGrass"] = "minecraft:tall_grass";
  MinecraftItemTypes2["Target"] = "minecraft:target";
  MinecraftItemTypes2["TideArmorTrimSmithingTemplate"] = "minecraft:tide_armor_trim_smithing_template";
  MinecraftItemTypes2["TintedGlass"] = "minecraft:tinted_glass";
  MinecraftItemTypes2["Tnt"] = "minecraft:tnt";
  MinecraftItemTypes2["TntMinecart"] = "minecraft:tnt_minecart";
  MinecraftItemTypes2["Torch"] = "minecraft:torch";
  MinecraftItemTypes2["Torchflower"] = "minecraft:torchflower";
  MinecraftItemTypes2["TorchflowerSeeds"] = "minecraft:torchflower_seeds";
  MinecraftItemTypes2["TotemOfUndying"] = "minecraft:totem_of_undying";
  MinecraftItemTypes2["TraderLlamaSpawnEgg"] = "minecraft:trader_llama_spawn_egg";
  MinecraftItemTypes2["Trapdoor"] = "minecraft:trapdoor";
  MinecraftItemTypes2["TrappedChest"] = "minecraft:trapped_chest";
  MinecraftItemTypes2["TrialKey"] = "minecraft:trial_key";
  MinecraftItemTypes2["TrialSpawner"] = "minecraft:trial_spawner";
  MinecraftItemTypes2["Trident"] = "minecraft:trident";
  MinecraftItemTypes2["TripwireHook"] = "minecraft:tripwire_hook";
  MinecraftItemTypes2["TropicalFish"] = "minecraft:tropical_fish";
  MinecraftItemTypes2["TropicalFishBucket"] = "minecraft:tropical_fish_bucket";
  MinecraftItemTypes2["TropicalFishSpawnEgg"] = "minecraft:tropical_fish_spawn_egg";
  MinecraftItemTypes2["TubeCoral"] = "minecraft:tube_coral";
  MinecraftItemTypes2["TubeCoralBlock"] = "minecraft:tube_coral_block";
  MinecraftItemTypes2["TubeCoralFan"] = "minecraft:tube_coral_fan";
  MinecraftItemTypes2["Tuff"] = "minecraft:tuff";
  MinecraftItemTypes2["TuffBrickSlab"] = "minecraft:tuff_brick_slab";
  MinecraftItemTypes2["TuffBrickStairs"] = "minecraft:tuff_brick_stairs";
  MinecraftItemTypes2["TuffBrickWall"] = "minecraft:tuff_brick_wall";
  MinecraftItemTypes2["TuffBricks"] = "minecraft:tuff_bricks";
  MinecraftItemTypes2["TuffSlab"] = "minecraft:tuff_slab";
  MinecraftItemTypes2["TuffStairs"] = "minecraft:tuff_stairs";
  MinecraftItemTypes2["TuffWall"] = "minecraft:tuff_wall";
  MinecraftItemTypes2["TurtleEgg"] = "minecraft:turtle_egg";
  MinecraftItemTypes2["TurtleHelmet"] = "minecraft:turtle_helmet";
  MinecraftItemTypes2["TurtleScute"] = "minecraft:turtle_scute";
  MinecraftItemTypes2["TurtleSpawnEgg"] = "minecraft:turtle_spawn_egg";
  MinecraftItemTypes2["TwistingVines"] = "minecraft:twisting_vines";
  MinecraftItemTypes2["UndyedShulkerBox"] = "minecraft:undyed_shulker_box";
  MinecraftItemTypes2["Vault"] = "minecraft:vault";
  MinecraftItemTypes2["VerdantFroglight"] = "minecraft:verdant_froglight";
  MinecraftItemTypes2["VexArmorTrimSmithingTemplate"] = "minecraft:vex_armor_trim_smithing_template";
  MinecraftItemTypes2["VexSpawnEgg"] = "minecraft:vex_spawn_egg";
  MinecraftItemTypes2["VillagerSpawnEgg"] = "minecraft:villager_spawn_egg";
  MinecraftItemTypes2["VindicatorSpawnEgg"] = "minecraft:vindicator_spawn_egg";
  MinecraftItemTypes2["Vine"] = "minecraft:vine";
  MinecraftItemTypes2["WanderingTraderSpawnEgg"] = "minecraft:wandering_trader_spawn_egg";
  MinecraftItemTypes2["WardArmorTrimSmithingTemplate"] = "minecraft:ward_armor_trim_smithing_template";
  MinecraftItemTypes2["WardenSpawnEgg"] = "minecraft:warden_spawn_egg";
  MinecraftItemTypes2["WarpedButton"] = "minecraft:warped_button";
  MinecraftItemTypes2["WarpedDoor"] = "minecraft:warped_door";
  MinecraftItemTypes2["WarpedFence"] = "minecraft:warped_fence";
  MinecraftItemTypes2["WarpedFenceGate"] = "minecraft:warped_fence_gate";
  MinecraftItemTypes2["WarpedFungus"] = "minecraft:warped_fungus";
  MinecraftItemTypes2["WarpedFungusOnAStick"] = "minecraft:warped_fungus_on_a_stick";
  MinecraftItemTypes2["WarpedHangingSign"] = "minecraft:warped_hanging_sign";
  MinecraftItemTypes2["WarpedHyphae"] = "minecraft:warped_hyphae";
  MinecraftItemTypes2["WarpedNylium"] = "minecraft:warped_nylium";
  MinecraftItemTypes2["WarpedPlanks"] = "minecraft:warped_planks";
  MinecraftItemTypes2["WarpedPressurePlate"] = "minecraft:warped_pressure_plate";
  MinecraftItemTypes2["WarpedRoots"] = "minecraft:warped_roots";
  MinecraftItemTypes2["WarpedShelf"] = "minecraft:warped_shelf";
  MinecraftItemTypes2["WarpedSign"] = "minecraft:warped_sign";
  MinecraftItemTypes2["WarpedSlab"] = "minecraft:warped_slab";
  MinecraftItemTypes2["WarpedStairs"] = "minecraft:warped_stairs";
  MinecraftItemTypes2["WarpedStem"] = "minecraft:warped_stem";
  MinecraftItemTypes2["WarpedTrapdoor"] = "minecraft:warped_trapdoor";
  MinecraftItemTypes2["WarpedWartBlock"] = "minecraft:warped_wart_block";
  MinecraftItemTypes2["WaterBucket"] = "minecraft:water_bucket";
  MinecraftItemTypes2["Waterlily"] = "minecraft:waterlily";
  MinecraftItemTypes2["WaxedChiseledCopper"] = "minecraft:waxed_chiseled_copper";
  MinecraftItemTypes2["WaxedCopper"] = "minecraft:waxed_copper";
  MinecraftItemTypes2["WaxedCopperBars"] = "minecraft:waxed_copper_bars";
  MinecraftItemTypes2["WaxedCopperBulb"] = "minecraft:waxed_copper_bulb";
  MinecraftItemTypes2["WaxedCopperChain"] = "minecraft:waxed_copper_chain";
  MinecraftItemTypes2["WaxedCopperChest"] = "minecraft:waxed_copper_chest";
  MinecraftItemTypes2["WaxedCopperDoor"] = "minecraft:waxed_copper_door";
  MinecraftItemTypes2["WaxedCopperGolemStatue"] = "minecraft:waxed_copper_golem_statue";
  MinecraftItemTypes2["WaxedCopperGrate"] = "minecraft:waxed_copper_grate";
  MinecraftItemTypes2["WaxedCopperLantern"] = "minecraft:waxed_copper_lantern";
  MinecraftItemTypes2["WaxedCopperTrapdoor"] = "minecraft:waxed_copper_trapdoor";
  MinecraftItemTypes2["WaxedCutCopper"] = "minecraft:waxed_cut_copper";
  MinecraftItemTypes2["WaxedCutCopperSlab"] = "minecraft:waxed_cut_copper_slab";
  MinecraftItemTypes2["WaxedCutCopperStairs"] = "minecraft:waxed_cut_copper_stairs";
  MinecraftItemTypes2["WaxedExposedChiseledCopper"] = "minecraft:waxed_exposed_chiseled_copper";
  MinecraftItemTypes2["WaxedExposedCopper"] = "minecraft:waxed_exposed_copper";
  MinecraftItemTypes2["WaxedExposedCopperBars"] = "minecraft:waxed_exposed_copper_bars";
  MinecraftItemTypes2["WaxedExposedCopperBulb"] = "minecraft:waxed_exposed_copper_bulb";
  MinecraftItemTypes2["WaxedExposedCopperChain"] = "minecraft:waxed_exposed_copper_chain";
  MinecraftItemTypes2["WaxedExposedCopperChest"] = "minecraft:waxed_exposed_copper_chest";
  MinecraftItemTypes2["WaxedExposedCopperDoor"] = "minecraft:waxed_exposed_copper_door";
  MinecraftItemTypes2["WaxedExposedCopperGolemStatue"] = "minecraft:waxed_exposed_copper_golem_statue";
  MinecraftItemTypes2["WaxedExposedCopperGrate"] = "minecraft:waxed_exposed_copper_grate";
  MinecraftItemTypes2["WaxedExposedCopperLantern"] = "minecraft:waxed_exposed_copper_lantern";
  MinecraftItemTypes2["WaxedExposedCopperTrapdoor"] = "minecraft:waxed_exposed_copper_trapdoor";
  MinecraftItemTypes2["WaxedExposedCutCopper"] = "minecraft:waxed_exposed_cut_copper";
  MinecraftItemTypes2["WaxedExposedCutCopperSlab"] = "minecraft:waxed_exposed_cut_copper_slab";
  MinecraftItemTypes2["WaxedExposedCutCopperStairs"] = "minecraft:waxed_exposed_cut_copper_stairs";
  MinecraftItemTypes2["WaxedExposedLightningRod"] = "minecraft:waxed_exposed_lightning_rod";
  MinecraftItemTypes2["WaxedLightningRod"] = "minecraft:waxed_lightning_rod";
  MinecraftItemTypes2["WaxedOxidizedChiseledCopper"] = "minecraft:waxed_oxidized_chiseled_copper";
  MinecraftItemTypes2["WaxedOxidizedCopper"] = "minecraft:waxed_oxidized_copper";
  MinecraftItemTypes2["WaxedOxidizedCopperBars"] = "minecraft:waxed_oxidized_copper_bars";
  MinecraftItemTypes2["WaxedOxidizedCopperBulb"] = "minecraft:waxed_oxidized_copper_bulb";
  MinecraftItemTypes2["WaxedOxidizedCopperChain"] = "minecraft:waxed_oxidized_copper_chain";
  MinecraftItemTypes2["WaxedOxidizedCopperChest"] = "minecraft:waxed_oxidized_copper_chest";
  MinecraftItemTypes2["WaxedOxidizedCopperDoor"] = "minecraft:waxed_oxidized_copper_door";
  MinecraftItemTypes2["WaxedOxidizedCopperGolemStatue"] = "minecraft:waxed_oxidized_copper_golem_statue";
  MinecraftItemTypes2["WaxedOxidizedCopperGrate"] = "minecraft:waxed_oxidized_copper_grate";
  MinecraftItemTypes2["WaxedOxidizedCopperLantern"] = "minecraft:waxed_oxidized_copper_lantern";
  MinecraftItemTypes2["WaxedOxidizedCopperTrapdoor"] = "minecraft:waxed_oxidized_copper_trapdoor";
  MinecraftItemTypes2["WaxedOxidizedCutCopper"] = "minecraft:waxed_oxidized_cut_copper";
  MinecraftItemTypes2["WaxedOxidizedCutCopperSlab"] = "minecraft:waxed_oxidized_cut_copper_slab";
  MinecraftItemTypes2["WaxedOxidizedCutCopperStairs"] = "minecraft:waxed_oxidized_cut_copper_stairs";
  MinecraftItemTypes2["WaxedOxidizedLightningRod"] = "minecraft:waxed_oxidized_lightning_rod";
  MinecraftItemTypes2["WaxedWeatheredChiseledCopper"] = "minecraft:waxed_weathered_chiseled_copper";
  MinecraftItemTypes2["WaxedWeatheredCopper"] = "minecraft:waxed_weathered_copper";
  MinecraftItemTypes2["WaxedWeatheredCopperBars"] = "minecraft:waxed_weathered_copper_bars";
  MinecraftItemTypes2["WaxedWeatheredCopperBulb"] = "minecraft:waxed_weathered_copper_bulb";
  MinecraftItemTypes2["WaxedWeatheredCopperChain"] = "minecraft:waxed_weathered_copper_chain";
  MinecraftItemTypes2["WaxedWeatheredCopperChest"] = "minecraft:waxed_weathered_copper_chest";
  MinecraftItemTypes2["WaxedWeatheredCopperDoor"] = "minecraft:waxed_weathered_copper_door";
  MinecraftItemTypes2["WaxedWeatheredCopperGolemStatue"] = "minecraft:waxed_weathered_copper_golem_statue";
  MinecraftItemTypes2["WaxedWeatheredCopperGrate"] = "minecraft:waxed_weathered_copper_grate";
  MinecraftItemTypes2["WaxedWeatheredCopperLantern"] = "minecraft:waxed_weathered_copper_lantern";
  MinecraftItemTypes2["WaxedWeatheredCopperTrapdoor"] = "minecraft:waxed_weathered_copper_trapdoor";
  MinecraftItemTypes2["WaxedWeatheredCutCopper"] = "minecraft:waxed_weathered_cut_copper";
  MinecraftItemTypes2["WaxedWeatheredCutCopperSlab"] = "minecraft:waxed_weathered_cut_copper_slab";
  MinecraftItemTypes2["WaxedWeatheredCutCopperStairs"] = "minecraft:waxed_weathered_cut_copper_stairs";
  MinecraftItemTypes2["WaxedWeatheredLightningRod"] = "minecraft:waxed_weathered_lightning_rod";
  MinecraftItemTypes2["WayfinderArmorTrimSmithingTemplate"] = "minecraft:wayfinder_armor_trim_smithing_template";
  MinecraftItemTypes2["WeatheredChiseledCopper"] = "minecraft:weathered_chiseled_copper";
  MinecraftItemTypes2["WeatheredCopper"] = "minecraft:weathered_copper";
  MinecraftItemTypes2["WeatheredCopperBars"] = "minecraft:weathered_copper_bars";
  MinecraftItemTypes2["WeatheredCopperBulb"] = "minecraft:weathered_copper_bulb";
  MinecraftItemTypes2["WeatheredCopperChain"] = "minecraft:weathered_copper_chain";
  MinecraftItemTypes2["WeatheredCopperChest"] = "minecraft:weathered_copper_chest";
  MinecraftItemTypes2["WeatheredCopperDoor"] = "minecraft:weathered_copper_door";
  MinecraftItemTypes2["WeatheredCopperGolemStatue"] = "minecraft:weathered_copper_golem_statue";
  MinecraftItemTypes2["WeatheredCopperGrate"] = "minecraft:weathered_copper_grate";
  MinecraftItemTypes2["WeatheredCopperLantern"] = "minecraft:weathered_copper_lantern";
  MinecraftItemTypes2["WeatheredCopperTrapdoor"] = "minecraft:weathered_copper_trapdoor";
  MinecraftItemTypes2["WeatheredCutCopper"] = "minecraft:weathered_cut_copper";
  MinecraftItemTypes2["WeatheredCutCopperSlab"] = "minecraft:weathered_cut_copper_slab";
  MinecraftItemTypes2["WeatheredCutCopperStairs"] = "minecraft:weathered_cut_copper_stairs";
  MinecraftItemTypes2["WeatheredLightningRod"] = "minecraft:weathered_lightning_rod";
  MinecraftItemTypes2["Web"] = "minecraft:web";
  MinecraftItemTypes2["WeepingVines"] = "minecraft:weeping_vines";
  MinecraftItemTypes2["WetSponge"] = "minecraft:wet_sponge";
  MinecraftItemTypes2["Wheat"] = "minecraft:wheat";
  MinecraftItemTypes2["WheatSeeds"] = "minecraft:wheat_seeds";
  MinecraftItemTypes2["WhiteBundle"] = "minecraft:white_bundle";
  MinecraftItemTypes2["WhiteCandle"] = "minecraft:white_candle";
  MinecraftItemTypes2["WhiteCarpet"] = "minecraft:white_carpet";
  MinecraftItemTypes2["WhiteConcrete"] = "minecraft:white_concrete";
  MinecraftItemTypes2["WhiteConcretePowder"] = "minecraft:white_concrete_powder";
  MinecraftItemTypes2["WhiteDye"] = "minecraft:white_dye";
  MinecraftItemTypes2["WhiteGlazedTerracotta"] = "minecraft:white_glazed_terracotta";
  MinecraftItemTypes2["WhiteHarness"] = "minecraft:white_harness";
  MinecraftItemTypes2["WhiteShulkerBox"] = "minecraft:white_shulker_box";
  MinecraftItemTypes2["WhiteStainedGlass"] = "minecraft:white_stained_glass";
  MinecraftItemTypes2["WhiteStainedGlassPane"] = "minecraft:white_stained_glass_pane";
  MinecraftItemTypes2["WhiteTerracotta"] = "minecraft:white_terracotta";
  MinecraftItemTypes2["WhiteTulip"] = "minecraft:white_tulip";
  MinecraftItemTypes2["WhiteWool"] = "minecraft:white_wool";
  MinecraftItemTypes2["WildArmorTrimSmithingTemplate"] = "minecraft:wild_armor_trim_smithing_template";
  MinecraftItemTypes2["Wildflowers"] = "minecraft:wildflowers";
  MinecraftItemTypes2["WindCharge"] = "minecraft:wind_charge";
  MinecraftItemTypes2["WitchSpawnEgg"] = "minecraft:witch_spawn_egg";
  MinecraftItemTypes2["WitherRose"] = "minecraft:wither_rose";
  MinecraftItemTypes2["WitherSkeletonSkull"] = "minecraft:wither_skeleton_skull";
  MinecraftItemTypes2["WitherSkeletonSpawnEgg"] = "minecraft:wither_skeleton_spawn_egg";
  MinecraftItemTypes2["WitherSpawnEgg"] = "minecraft:wither_spawn_egg";
  MinecraftItemTypes2["WolfArmor"] = "minecraft:wolf_armor";
  MinecraftItemTypes2["WolfSpawnEgg"] = "minecraft:wolf_spawn_egg";
  MinecraftItemTypes2["WoodenAxe"] = "minecraft:wooden_axe";
  MinecraftItemTypes2["WoodenButton"] = "minecraft:wooden_button";
  MinecraftItemTypes2["WoodenDoor"] = "minecraft:wooden_door";
  MinecraftItemTypes2["WoodenHoe"] = "minecraft:wooden_hoe";
  MinecraftItemTypes2["WoodenPickaxe"] = "minecraft:wooden_pickaxe";
  MinecraftItemTypes2["WoodenPressurePlate"] = "minecraft:wooden_pressure_plate";
  MinecraftItemTypes2["WoodenShovel"] = "minecraft:wooden_shovel";
  MinecraftItemTypes2["WoodenSpear"] = "minecraft:wooden_spear";
  MinecraftItemTypes2["WoodenSword"] = "minecraft:wooden_sword";
  MinecraftItemTypes2["WritableBook"] = "minecraft:writable_book";
  MinecraftItemTypes2["YellowBundle"] = "minecraft:yellow_bundle";
  MinecraftItemTypes2["YellowCandle"] = "minecraft:yellow_candle";
  MinecraftItemTypes2["YellowCarpet"] = "minecraft:yellow_carpet";
  MinecraftItemTypes2["YellowConcrete"] = "minecraft:yellow_concrete";
  MinecraftItemTypes2["YellowConcretePowder"] = "minecraft:yellow_concrete_powder";
  MinecraftItemTypes2["YellowDye"] = "minecraft:yellow_dye";
  MinecraftItemTypes2["YellowGlazedTerracotta"] = "minecraft:yellow_glazed_terracotta";
  MinecraftItemTypes2["YellowHarness"] = "minecraft:yellow_harness";
  MinecraftItemTypes2["YellowShulkerBox"] = "minecraft:yellow_shulker_box";
  MinecraftItemTypes2["YellowStainedGlass"] = "minecraft:yellow_stained_glass";
  MinecraftItemTypes2["YellowStainedGlassPane"] = "minecraft:yellow_stained_glass_pane";
  MinecraftItemTypes2["YellowTerracotta"] = "minecraft:yellow_terracotta";
  MinecraftItemTypes2["YellowWool"] = "minecraft:yellow_wool";
  MinecraftItemTypes2["ZoglinSpawnEgg"] = "minecraft:zoglin_spawn_egg";
  MinecraftItemTypes2["ZombieHead"] = "minecraft:zombie_head";
  MinecraftItemTypes2["ZombieHorseSpawnEgg"] = "minecraft:zombie_horse_spawn_egg";
  MinecraftItemTypes2["ZombieNautilusSpawnEgg"] = "minecraft:zombie_nautilus_spawn_egg";
  MinecraftItemTypes2["ZombiePigmanSpawnEgg"] = "minecraft:zombie_pigman_spawn_egg";
  MinecraftItemTypes2["ZombieSpawnEgg"] = "minecraft:zombie_spawn_egg";
  MinecraftItemTypes2["ZombieVillagerSpawnEgg"] = "minecraft:zombie_villager_spawn_egg";
  return MinecraftItemTypes2;
})(MinecraftItemTypes || {});
var MinecraftPotionDeliveryTypes = ((MinecraftPotionDeliveryTypes2) => {
  MinecraftPotionDeliveryTypes2["Consume"] = "Consume";
  MinecraftPotionDeliveryTypes2["ThrownLingering"] = "ThrownLingering";
  MinecraftPotionDeliveryTypes2["ThrownSplash"] = "ThrownSplash";
  return MinecraftPotionDeliveryTypes2;
})(MinecraftPotionDeliveryTypes || {});
var MinecraftPotionEffectTypes = ((MinecraftPotionEffectTypes2) => {
  MinecraftPotionEffectTypes2["Awkward"] = "minecraft:awkward";
  MinecraftPotionEffectTypes2["FireResistance"] = "minecraft:fire_resistance";
  MinecraftPotionEffectTypes2["Harming"] = "minecraft:harming";
  MinecraftPotionEffectTypes2["Healing"] = "minecraft:healing";
  MinecraftPotionEffectTypes2["Infested"] = "minecraft:infested";
  MinecraftPotionEffectTypes2["Invisibility"] = "minecraft:invisibility";
  MinecraftPotionEffectTypes2["Leaping"] = "minecraft:leaping";
  MinecraftPotionEffectTypes2["LongFireResistance"] = "minecraft:long_fire_resistance";
  MinecraftPotionEffectTypes2["LongInvisibility"] = "minecraft:long_invisibility";
  MinecraftPotionEffectTypes2["LongLeaping"] = "minecraft:long_leaping";
  MinecraftPotionEffectTypes2["LongMundane"] = "minecraft:long_mundane";
  MinecraftPotionEffectTypes2["LongNightvision"] = "minecraft:long_nightvision";
  MinecraftPotionEffectTypes2["LongPoison"] = "minecraft:long_poison";
  MinecraftPotionEffectTypes2["LongRegeneration"] = "minecraft:long_regeneration";
  MinecraftPotionEffectTypes2["LongSlowFalling"] = "minecraft:long_slow_falling";
  MinecraftPotionEffectTypes2["LongSlowness"] = "minecraft:long_slowness";
  MinecraftPotionEffectTypes2["LongStrength"] = "minecraft:long_strength";
  MinecraftPotionEffectTypes2["LongSwiftness"] = "minecraft:long_swiftness";
  MinecraftPotionEffectTypes2["LongTurtleMaster"] = "minecraft:long_turtle_master";
  MinecraftPotionEffectTypes2["LongWaterBreathing"] = "minecraft:long_water_breathing";
  MinecraftPotionEffectTypes2["LongWeakness"] = "minecraft:long_weakness";
  MinecraftPotionEffectTypes2["Mundane"] = "minecraft:mundane";
  MinecraftPotionEffectTypes2["Nightvision"] = "minecraft:nightvision";
  MinecraftPotionEffectTypes2["Oozing"] = "minecraft:oozing";
  MinecraftPotionEffectTypes2["Poison"] = "minecraft:poison";
  MinecraftPotionEffectTypes2["Regeneration"] = "minecraft:regeneration";
  MinecraftPotionEffectTypes2["SlowFalling"] = "minecraft:slow_falling";
  MinecraftPotionEffectTypes2["Slowness"] = "minecraft:slowness";
  MinecraftPotionEffectTypes2["Strength"] = "minecraft:strength";
  MinecraftPotionEffectTypes2["StrongHarming"] = "minecraft:strong_harming";
  MinecraftPotionEffectTypes2["StrongHealing"] = "minecraft:strong_healing";
  MinecraftPotionEffectTypes2["StrongLeaping"] = "minecraft:strong_leaping";
  MinecraftPotionEffectTypes2["StrongPoison"] = "minecraft:strong_poison";
  MinecraftPotionEffectTypes2["StrongRegeneration"] = "minecraft:strong_regeneration";
  MinecraftPotionEffectTypes2["StrongSlowness"] = "minecraft:strong_slowness";
  MinecraftPotionEffectTypes2["StrongStrength"] = "minecraft:strong_strength";
  MinecraftPotionEffectTypes2["StrongSwiftness"] = "minecraft:strong_swiftness";
  MinecraftPotionEffectTypes2["StrongTurtleMaster"] = "minecraft:strong_turtle_master";
  MinecraftPotionEffectTypes2["Swiftness"] = "minecraft:swiftness";
  MinecraftPotionEffectTypes2["Thick"] = "minecraft:thick";
  MinecraftPotionEffectTypes2["TurtleMaster"] = "minecraft:turtle_master";
  MinecraftPotionEffectTypes2["Water"] = "minecraft:water";
  MinecraftPotionEffectTypes2["WaterBreathing"] = "minecraft:water_breathing";
  MinecraftPotionEffectTypes2["Weakness"] = "minecraft:weakness";
  MinecraftPotionEffectTypes2["Weaving"] = "minecraft:weaving";
  MinecraftPotionEffectTypes2["WindCharged"] = "minecraft:wind_charged";
  MinecraftPotionEffectTypes2["Wither"] = "minecraft:wither";
  return MinecraftPotionEffectTypes2;
})(MinecraftPotionEffectTypes || {});
class BaseEntity {
  onSessionLoad(entity) {
  }
  onHurtSelf(entity, damagingSource, damageCause, damageAmount) {
  }
  onHurtOther(entity, damagedEntity, damageCause, damageAmount) {
  }
  onHitByEntity(entity, damagingEntity) {
  }
  onHitBlock(entity, block) {
  }
  onProjectileHitEntity(source, entity, hitVector, target) {
  }
  onProjectileHitBlock(sorce, entity, hitVector, block, blockHitFace) {
  }
  onCommandReceived(entity, command, message, initiator) {
  }
  onPlayerInteract(entity, player, beforeItemStack, itemStack) {
  }
  onSpawn(entity) {
  }
  onDie(entity, damageSource) {
  }
  onRemove(entity) {
  }
  onTick(entity, currentTick) {
  }
}
const DEFAULT_ENTITY_TICK_INTERVAL = 2;
const createEntityRegistry = (entities) => {
  const registry = /* @__PURE__ */ new Map();
  for (const Entity2 of entities) {
    const identifiers = Array.isArray(Entity2.identifier) ? Entity2.identifier : [Entity2.identifier];
    identifiers.forEach((identifier) => {
      registry.set(identifier, [Entity2, new Entity2()]);
    });
  }
  return registry;
};
const initializeEntityRegistry = (entities) => {
  const entityRegistry = createEntityRegistry(entities);
  const getEntityFromRegistry = (typeId) => {
    const entityClass = entityRegistry.get(typeId);
    if (!entityClass) {
      return {
        Entity: void 0,
        instance: void 0
      };
    }
    const [Entity2, instance] = entityClass;
    return {
      Entity: Entity2,
      instance
    };
  };
  return {
    entityRegistry,
    getEntityFromRegistry
  };
};
const registerEntities = (entities) => {
  const state = {
    sessionLoadedEntities: /* @__PURE__ */ new Set()
  };
  const { getEntityFromRegistry } = initializeEntityRegistry(entities);
  system.beforeEvents.startup.subscribe(() => {
    world.afterEvents.entitySpawn.subscribe((event) => {
      var _a2;
      const { Entity: EntityClass, instance } = getEntityFromRegistry(event.entity.typeId);
      if (!EntityClass || !instance) return;
      (_a2 = instance.onSpawn) == null ? void 0 : _a2.call(instance, event.entity);
    });
    world.afterEvents.entityDie.subscribe((event) => {
      var _a2;
      const { Entity: EntityClass, instance } = getEntityFromRegistry(event.deadEntity.typeId);
      if (!EntityClass || !instance) return;
      (_a2 = instance.onDie) == null ? void 0 : _a2.call(instance, event.deadEntity, event.damageSource);
    });
    world.beforeEvents.entityRemove.subscribe((event) => {
      var _a2;
      const { Entity: EntityClass, instance } = getEntityFromRegistry(event.removedEntity.typeId);
      if (!EntityClass || !instance) return;
      (_a2 = instance.onRemove) == null ? void 0 : _a2.call(instance, event.removedEntity);
    });
    world.afterEvents.entityHurt.subscribe((event) => {
      var _a2, _b;
      const { Entity: hurtEntityClass, instance: hurtInstance } = getEntityFromRegistry(event.hurtEntity.typeId);
      if (!!hurtEntityClass && !!hurtInstance) {
        (_a2 = hurtInstance.onHurtSelf) == null ? void 0 : _a2.call(hurtInstance, event.hurtEntity, event.damageSource ?? null, event.damageSource.cause, event.damage);
      }
      const damagingEntity = event.damageSource.damagingEntity;
      if (damagingEntity) {
        const { Entity: damageEntityClass, instance: damageInstance } = getEntityFromRegistry(damagingEntity.typeId);
        if (!!damageEntityClass && !!damageInstance) {
          (_b = damageInstance.onHurtOther) == null ? void 0 : _b.call(damageInstance, damagingEntity, event.hurtEntity, event.damageSource.cause, event.damage);
        }
      }
    });
    world.afterEvents.projectileHitEntity.subscribe((event) => {
      var _a2;
      const { Entity: EntityClass, instance } = getEntityFromRegistry(event.projectile.typeId);
      if (!EntityClass || !instance) return;
      const hitEntity = event.getEntityHit().entity;
      if (hitEntity) {
        (_a2 = instance.onProjectileHitEntity) == null ? void 0 : _a2.call(instance, event.source, event.projectile, event.hitVector, hitEntity);
      }
    });
    world.afterEvents.projectileHitBlock.subscribe((event) => {
      var _a2;
      const { Entity: EntityClass, instance } = getEntityFromRegistry(event.projectile.typeId);
      if (!EntityClass || !instance) return;
      (_a2 = instance.onProjectileHitBlock) == null ? void 0 : _a2.call(instance, event.source, event.projectile, event.hitVector, event.getBlockHit().block, event.getBlockHit().face);
    });
    world.afterEvents.entityHitEntity.subscribe((event) => {
      var _a2;
      const { Entity: EntityClass, instance } = getEntityFromRegistry(event.hitEntity.typeId);
      if (!EntityClass || !instance) return;
      (_a2 = instance.onHitByEntity) == null ? void 0 : _a2.call(instance, event.hitEntity, event.damagingEntity);
    });
    world.afterEvents.playerInteractWithEntity.subscribe((event) => {
      var _a2;
      const { Entity: EntityClass, instance } = getEntityFromRegistry(event.target.typeId);
      if (!EntityClass || !instance) return;
      (_a2 = instance.onPlayerInteract) == null ? void 0 : _a2.call(instance, event.target, event.player, event.beforeItemStack ?? null, event.itemStack ?? null);
    });
    system.afterEvents.scriptEventReceive.subscribe((event) => {
      var _a2;
      if (!event.sourceEntity) return;
      const { Entity: EntityClass, instance } = getEntityFromRegistry(event.sourceEntity.typeId);
      const hasInstance = !!EntityClass && !!instance;
      if (hasInstance) {
        (_a2 = instance.onCommandReceived) == null ? void 0 : _a2.call(instance, event.sourceEntity, event.id, event.message, event.initiator);
      }
    });
  });
  const shouldPollEntities = entities.some((Entity2) => !!Entity2.prototype.onTick);
  if (shouldPollEntities) {
    system.runInterval(() => {
      const allPlayerDimensions = new Set(world.getAllPlayers().map((player) => player.dimension.id));
      [...allPlayerDimensions].forEach((dimensionId) => {
        const dimension = world.getDimension(dimensionId);
        if (!dimension) return;
        const dimensionEntities = dimension.getEntities({
          excludeTypes: [MinecraftEntityTypes.Player]
        });
        dimensionEntities.forEach((entity) => {
          var _a2, _b;
          const { Entity: EntityClass, instance } = getEntityFromRegistry(entity.typeId);
          if (!EntityClass || !instance) return;
          if (!state.sessionLoadedEntities.has(entity.id)) {
            (_a2 = instance.onSessionLoad) == null ? void 0 : _a2.call(instance, entity);
            state.sessionLoadedEntities.add(entity.id);
          }
          (_b = instance.onTick) == null ? void 0 : _b.call(instance, entity, system.currentTick);
        });
      });
    }, DEFAULT_ENTITY_TICK_INTERVAL);
  }
};
const getPlayerById = (playerId) => {
  return world.getAllPlayers().find((player) => player.id === playerId);
};
const getDistanceSquaredBetweenTwoVectors = (vectorOne, vectorTwo) => {
  const x = vectorOne.x - vectorTwo.x;
  const y = vectorOne.y - vectorTwo.y;
  const z = vectorOne.z - vectorTwo.z;
  return x * x + y * y + z * z;
};
const getDistanceBetweenTwoVectors = (vectorOne, vectorTwo) => {
  return Math.sqrt(getDistanceSquaredBetweenTwoVectors(vectorOne, vectorTwo));
};
class BaseBlock {
  onPlayerPlace(block, dimension, player) {
  }
  onPlayerBreak(block, dimension, player, cancel) {
  }
  onPlace(block, dimension, previousBlock) {
  }
  onBreak(block, dimension, destructionSource, permutation, entitySource) {
  }
  onBeforeItemUseOn(block, itemStack, player, cancel) {
  }
  onItemUseOn(block, itemStack, player) {
  }
  /**
   * Requires the `PROJECT_NAMESPACE:on_entity_fall_on` custom component to be added to the block.
   */
  onEntityFallOn(block, entity, fallDistance) {
  }
  /**
   * Requires the `PROJECT_NAMESPACE:on_player_interact` custom component to be added to the block.
   */
  onPlayerInteract(block, player, face) {
  }
  /**
   * Requires the `PROJECT_NAMESPACE:on_step_on` custom component to be added to the block.
   */
  onStepOn(block, entity) {
  }
  /**
   * Requires the `PROJECT_NAMESPACE:on_step_off` custom component to be added to the block.
   */
  onStepOff(block, entity) {
  }
  /**
   * Requires the `PROJECT_NAMESPACE:on_random_tick` custom component to be added to the block.
   */
  onRandomTick(block) {
  }
  /**
   * Requires the `PROJECT_NAMESPACE:on_tick` custom component to be added to the block.
   */
  onTick(block) {
  }
}
const createBlockRegistry = (blocks) => {
  const registry = new Map(blocks.map((Block) => [Block.identifier, [Block, new Block()]]));
  return registry;
};
const initializeBlockRegistry = (blocks) => {
  const blockRegistry = createBlockRegistry(blocks);
  const getBlockFromRegistry = (block) => {
    var _a2;
    const itemClass = (_a2 = [...blockRegistry.entries()].find(([typeId]) => block.typeId === typeId)) == null ? void 0 : _a2[1];
    if (!itemClass) {
      return {
        Block: void 0,
        instance: void 0
      };
    }
    const [Block, instance] = itemClass;
    return {
      Block,
      instance
    };
  };
  return {
    blockRegistry,
    getBlockFromRegistry
  };
};
const registerBlocks = (blocks, config = {}) => {
  const { getBlockFromRegistry } = initializeBlockRegistry(blocks);
  const subscribeToEntityFallOn = (initEvent) => {
    initEvent.blockComponentRegistry.registerCustomComponent(`${PROJECT_NAMESPACE}:${"on_entity_fall_on"}`, {
      onEntityFallOn: (event) => {
        var _a2;
        const { Block: BlockClass, instance } = getBlockFromRegistry(event.block);
        if (!BlockClass || !instance) return;
        (_a2 = instance.onEntityFallOn) == null ? void 0 : _a2.call(instance, event.block, event.entity, event.fallDistance);
      }
    });
  };
  const subscribeToPlayerInteract = (initEvent) => {
    initEvent.blockComponentRegistry.registerCustomComponent(`${PROJECT_NAMESPACE}:${"on_player_interact"}`, {
      onPlayerInteract: (event) => {
        var _a2;
        const { Block: BlockClass, instance } = getBlockFromRegistry(event.block);
        if (!BlockClass || !instance) return;
        (_a2 = instance.onPlayerInteract) == null ? void 0 : _a2.call(instance, event.block, event.player, event.face);
      }
    });
  };
  const subscribeToStepOn = (initEvent) => {
    initEvent.blockComponentRegistry.registerCustomComponent(`${PROJECT_NAMESPACE}:${"on_step_on"}`, {
      onStepOn: (event) => {
        var _a2;
        const { Block: BlockClass, instance } = getBlockFromRegistry(event.block);
        if (!BlockClass || !instance) return;
        (_a2 = instance.onStepOn) == null ? void 0 : _a2.call(instance, event.block, event.entity);
      }
    });
  };
  const subscribeToStepOff = (initEvent) => {
    initEvent.blockComponentRegistry.registerCustomComponent(`${PROJECT_NAMESPACE}:${"on_step_off"}`, {
      onStepOff: (event) => {
        var _a2;
        const { Block: BlockClass, instance } = getBlockFromRegistry(event.block);
        if (!BlockClass || !instance) return;
        (_a2 = instance.onStepOff) == null ? void 0 : _a2.call(instance, event.block, event.entity);
      }
    });
  };
  const subscribeToRandomTick = (initEvent) => {
    initEvent.blockComponentRegistry.registerCustomComponent(`${PROJECT_NAMESPACE}:${"on_random_tick"}`, {
      onRandomTick: (event) => {
        var _a2;
        const { Block: BlockClass, instance } = getBlockFromRegistry(event.block);
        if (!BlockClass || !instance) return;
        (_a2 = instance.onRandomTick) == null ? void 0 : _a2.call(instance, event.block);
      }
    });
  };
  const subscribeToTick = (initEvent) => {
    initEvent.blockComponentRegistry.registerCustomComponent(`${PROJECT_NAMESPACE}:${"on_tick"}`, {
      onTick: (event) => {
        var _a2;
        const { Block: BlockClass, instance } = getBlockFromRegistry(event.block);
        if (!BlockClass || !instance) return;
        (_a2 = instance.onTick) == null ? void 0 : _a2.call(instance, event.block);
      }
    });
  };
  const subscribeToPlace = (initEvent) => {
    initEvent.blockComponentRegistry.registerCustomComponent(`${PROJECT_NAMESPACE}:${"on_place"}`, {
      onPlace: (event) => {
        var _a2;
        const { Block: BlockClass, instance } = getBlockFromRegistry(event.block);
        if (!BlockClass || !instance) return;
        (_a2 = instance.onPlace) == null ? void 0 : _a2.call(instance, event.block, event.dimension, event.previousBlock);
      }
    });
  };
  const subscribeToBreak = (initEvent) => {
    initEvent.blockComponentRegistry.registerCustomComponent(`${PROJECT_NAMESPACE}:${"on_break"}`, {
      onBreak: (event) => {
        var _a2;
        const { Block: BlockClass, instance } = getBlockFromRegistry(event.block);
        if (!BlockClass || !instance) return;
        (_a2 = instance.onBreak) == null ? void 0 : _a2.call(instance, event.block, event.dimension, event.blockDestructionSource, event.brokenBlockPermutation, event.entitySource);
      }
    });
  };
  const blockCapabilities = config.capabilities ?? [];
  if (blockCapabilities.length > 0) {
    system.beforeEvents.startup.subscribe((initEvent) => {
      blockCapabilities.forEach((capability) => {
        switch (capability) {
          case "on_entity_fall_on":
            subscribeToEntityFallOn(initEvent);
            break;
          case "on_player_interact":
            subscribeToPlayerInteract(initEvent);
            break;
          case "on_step_on":
            subscribeToStepOn(initEvent);
            break;
          case "on_step_off":
            subscribeToStepOff(initEvent);
            break;
          case "on_random_tick":
            subscribeToRandomTick(initEvent);
            break;
          case "on_tick":
            subscribeToTick(initEvent);
            break;
          case "on_place":
            subscribeToPlace(initEvent);
            break;
          case "on_break":
            subscribeToBreak(initEvent);
            break;
        }
      });
    });
  }
  world.afterEvents.worldLoad.subscribe(() => {
    world.afterEvents.playerPlaceBlock.subscribe((event) => {
      var _a2;
      const { Block: BlockClass, instance } = getBlockFromRegistry(event.block);
      if (!BlockClass || !instance) return;
      (_a2 = instance.onPlayerPlace) == null ? void 0 : _a2.call(instance, event.block, event.dimension, event.player);
    });
    world.beforeEvents.playerBreakBlock.subscribe((event) => {
      var _a2;
      const { Block: BlockClass, instance } = getBlockFromRegistry(event.block);
      if (!BlockClass || !instance) return;
      const cancelFn = () => {
        event.cancel = true;
      };
      (_a2 = instance.onPlayerBreak) == null ? void 0 : _a2.call(instance, event.block, event.dimension, event.player, cancelFn);
    });
    world.beforeEvents.playerInteractWithBlock.subscribe((event) => {
      var _a2;
      const { Block: BlockClass, instance } = getBlockFromRegistry(event.block);
      if (!BlockClass || !instance || event.itemStack == void 0) return;
      const handleCancel = () => {
        event.cancel = true;
      };
      (_a2 = instance.onBeforeItemUseOn) == null ? void 0 : _a2.call(instance, event.block, event.itemStack, event.player, handleCancel);
    });
    world.afterEvents.playerInteractWithBlock.subscribe((event) => {
      var _a2;
      const { Block: BlockClass, instance } = getBlockFromRegistry(event.block);
      if (!BlockClass || !instance || event.itemStack == void 0) return;
      (_a2 = instance.onItemUseOn) == null ? void 0 : _a2.call(instance, event.block, event.itemStack, event.player);
    });
  });
};
const getEntityInventory = (entity) => {
  return entity.getComponent(EntityInventoryComponent.componentId);
};
const getEquipmentAtSlot = (entity, slot) => {
  const entityEquippableComponent = entity.getComponent(EntityEquippableComponent.componentId);
  if (!entityEquippableComponent) return null;
  return entityEquippableComponent.getEquipment(slot);
};
const isInventoryFull = (entity) => {
  const entityInventory = getEntityInventory(entity);
  if (!(entityInventory == null ? void 0 : entityInventory.container)) return false;
  return entityInventory.container.emptySlotsCount === 0;
};
const giveItemToEntity = (entity, itemStack) => {
  const entityInventory = getEntityInventory(entity);
  if (!(entityInventory == null ? void 0 : entityInventory.container)) return;
  if (isInventoryFull(entity)) {
    entity.dimension.spawnItem(itemStack, entity.location);
    sendInfoLog(`Entity inventory is full. Dropped ${itemStack.amount} ${itemStack.typeId} at entity location`);
  } else {
    entityInventory.container.addItem(itemStack);
    sendInfoLog(`Gave ${itemStack.amount} ${itemStack.typeId} to entity`);
  }
};
const db = (field, context = world) => {
  const prefix = `${PROJECT_NAMESPACE}.${field}.`;
  const find = (id) => {
    return context.getDynamicProperty(`${prefix}${id}`);
  };
  const has = (id) => {
    return find(id) !== void 0;
  };
  const save = (id, value) => {
    context.setDynamicProperty(`${prefix}${id}`, value);
  };
  const remove = (id) => {
    context.setDynamicProperty(`${prefix}${id}`, void 0);
  };
  const flush = () => {
    context.getDynamicPropertyIds().forEach((id) => {
      if (id.startsWith(prefix)) {
        context.setDynamicProperty(id, void 0);
      }
    });
  };
  const all = () => {
    const ids = context.getDynamicPropertyIds().filter((id) => id.startsWith(prefix));
    const result = /* @__PURE__ */ new Map();
    ids.forEach((id) => {
      const recordId = id.replace(prefix, "");
      const value = find(recordId);
      if (value !== void 0) {
        result.set(recordId, value);
      }
    });
    return result;
  };
  const keys = () => {
    return [...all().keys()];
  };
  const empty = () => {
    return keys().length === 0;
  };
  return {
    find,
    has,
    save,
    remove,
    all,
    flush,
    keys,
    empty
  };
};
const jsonDB = (field, context = world) => {
  const database = db(field, context);
  const find = (id) => {
    const json = database.find(id);
    if (json) {
      return JSON.parse(json);
    }
  };
  const save = (id, value, merge = true) => {
    if (merge) {
      const current = find(id) ?? {};
      database.save(id, JSON.stringify({
        ...current,
        ...value
      }));
    } else {
      database.save(id, JSON.stringify(value));
    }
  };
  const remove = (id) => {
    database.remove(id);
  };
  const all = () => {
    const result = /* @__PURE__ */ new Map();
    database.all().forEach((json, id) => {
      result.set(id, JSON.parse(json));
    });
    return result;
  };
  const flush = () => {
    database.flush();
  };
  return {
    find,
    save,
    remove,
    all,
    flush
  };
};
var GameType = /* @__PURE__ */ ((GameType2) => {
  GameType2[GameType2["AddOn"] = 0] = "AddOn";
  GameType2[GameType2["WorldAdventure"] = 1] = "WorldAdventure";
  return GameType2;
})(GameType || {});
const GAME_RULES_WORLD_ADVENTURE = /* @__PURE__ */ new Map([
  [GameRule.DoDayLightCycle, false],
  [GameRule.DoEntityDrops, false],
  [GameRule.DoFireTick, false],
  [GameRule.DoImmediateRespawn, false],
  [GameRule.DoLimitedCrafting, true],
  [GameRule.DoMobLoot, true],
  [GameRule.DoMobSpawning, false],
  [GameRule.DoTileDrops, false],
  [GameRule.DoWeatherCycle, false],
  [GameRule.DrowningDamage, true],
  [GameRule.FallDamage, true],
  [GameRule.FireDamage, true],
  [GameRule.FreezeDamage, true],
  [GameRule.KeepInventory, true],
  [GameRule.MobGriefing, false],
  [GameRule.NaturalRegeneration, true],
  [GameRule.ProjectilesCanBreakBlocks, true],
  [GameRule.Pvp, true],
  [GameRule.RecipesUnlock, false],
  [GameRule.RespawnBlocksExplode, false],
  [GameRule.ShowBorderEffect, false],
  [GameRule.ShowCoordinates, false],
  [GameRule.ShowDeathMessages, true],
  [GameRule.ShowRecipeMessages, false],
  [GameRule.TntExplodes, true]
]);
const setGameRule = (gameRule, value) => {
  world.getDimension("overworld").runCommand(`gamerule ${gameRule} ${value}`);
};
const ensureGameRules = (gameRules) => {
  for (const [gameRule, value] of gameRules) {
    const isGameRuleChanged = world.gameRules[gameRule] !== value;
    if (isGameRuleChanged) {
      setGameRule(gameRule, value);
    }
  }
  world.afterEvents.gameRuleChange.subscribe((event) => {
    if (!gameRules.has(event.rule)) return;
    const gameRuleValue = gameRules.get(event.rule);
    const isGameRuleChanged = gameRuleValue !== event.value;
    if (isGameRuleChanged) {
      setGameRule(event.rule, gameRuleValue);
    }
  });
};
const ensureGameMode = (gameMode) => {
  world.afterEvents.playerSpawn.subscribe((event) => {
    if (event.initialSpawn) {
      event.player.setGameMode(gameMode);
    }
  });
  world.beforeEvents.playerGameModeChange.subscribe((event) => {
    const isToGameModeChanged = event.toGameMode !== gameMode;
    if (isToGameModeChanged) {
      event.cancel = true;
    }
  });
};
const setGameRules = (gameType) => {
  switch (gameType) {
    case 1:
      ensureGameMode(GameMode.Adventure);
      ensureGameRules(GAME_RULES_WORLD_ADVENTURE);
      break;
  }
};
const isWorldSetup = () => {
  return db("setup").has("world");
};
const setWorldSetup = () => {
  db("setup").save("world", true);
};
const isPlayerSetup = (player) => {
  return player.hasTag(`${PROJECT_NAMESPACE}:player_setup`);
};
const setPlayerSetup = (player) => {
  player.addTag(`${PROJECT_NAMESPACE}:player_setup`);
};
const VERSION_UPDATE_MESSAGE_TIMEOUT = secondsToTicks(5);
const setPlayerProjectVersion = (player) => {
  const newVersion = PROJECT_VERSION;
  const projectVersionPropertyKey = `${PROJECT_NAMESPACE}_project_version`;
  const oldVersion = player.getDynamicProperty(projectVersionPropertyKey) ?? null;
  if (oldVersion === null) {
    player.setDynamicProperty(projectVersionPropertyKey, newVersion);
    return {
      oldVersion: newVersion,
      newVersion,
      hasVersionUpdated: false
    };
  }
  const hasVersionUpdated = oldVersion !== newVersion;
  if (hasVersionUpdated) {
    player.setDynamicProperty(projectVersionPropertyKey, newVersion);
  }
  return {
    oldVersion,
    newVersion,
    hasVersionUpdated
  };
};
const getVersionKey = (version) => {
  return version.split(".").map((versionPart) => versionPart).join("");
};
const startGame = (config, onReady) => {
  setGameRules(config.gameType);
  world.afterEvents.playerSpawn.subscribe((event) => {
    if (event.initialSpawn) {
      if (config.onSetupPlayer && !isPlayerSetup(event.player)) {
        try {
          config.onSetupPlayer(event.player);
        } catch (error) {
          sendInfoLog(`Failed to setup player ${event.player.name} with error: ${error}`);
        }
        setPlayerSetup(event.player);
      }
      try {
        const { oldVersion, newVersion, hasVersionUpdated } = setPlayerProjectVersion(event.player);
        if (hasVersionUpdated && config.onVersionUpdate) {
          system.runTimeout(() => {
            if (config.onVersionUpdate && event.player) {
              config.onVersionUpdate(event.player, oldVersion, newVersion, getVersionKey(newVersion));
            }
          }, VERSION_UPDATE_MESSAGE_TIMEOUT);
        }
      } catch (error) {
        sendInfoLog(`Failed to set player project version for ${event.player.name} with error: ${error}`);
      }
    }
  });
  world.afterEvents.worldLoad.subscribe(() => {
    if (isWorldSetup()) {
      onReady(false);
    } else {
      onReady(true);
      setWorldSetup();
    }
  });
};
const _BaseItem = class _BaseItem {
  constructor() {
    this.playerEventLastAt = /* @__PURE__ */ new Map();
  }
};
_BaseItem.offhandEquipDisableItems = [];
let BaseItem = _BaseItem;
const EVENT_COOLDOWN_DURATION = secondsToTicks(0.5);
const EMPTY_SLOT_ITEM_ID = "minecraft:air";
const TAG_DEFER_ALLOW = `${PROJECT_NAMESPACE}:defer_to_offhand`;
const playerPreviousEquippedItemDb = (player) => db("u_previous_equipped_item", player);
const playerItemHistoryDb = (player) => db("u_item_history", player);
const createItemRegistry = (items) => {
  const registry = /* @__PURE__ */ new Map();
  for (const Item of items) {
    const identifiers = Array.isArray(Item.identifier) ? Item.identifier : [Item.identifier];
    identifiers.forEach((identifier) => {
      registry.set(identifier, [Item, new Item()]);
    });
  }
  return registry;
};
const initializeItemRegistry = (items) => {
  const itemRegistry = createItemRegistry(items);
  const getItemFromRegistry = (typeId) => {
    if (!typeId) {
      sendInfoLog("Item is air", {}, true);
      return {
        Item: void 0,
        instance: void 0
      };
    }
    const itemClass = itemRegistry.get(typeId);
    if (!itemClass) {
      sendInfoLog(`Item with typeId ${typeId} not found in registry`, {}, true);
      return {
        Item: void 0,
        instance: void 0
      };
    }
    const [Item, instance] = itemClass;
    return {
      Item,
      instance
    };
  };
  const setPlayerEventCooldown = (instance, player, method) => {
    var _a2;
    if (!instance.playerEventLastAt.has(player.id)) {
      instance.playerEventLastAt.set(player.id, /* @__PURE__ */ new Map());
    }
    (_a2 = instance.playerEventLastAt.get(player.id)) == null ? void 0 : _a2.set(method, system.currentTick);
  };
  const isPlayerEventCooldownActive = (instance, player, method) => {
    var _a2;
    const lastEventAt = (_a2 = instance.playerEventLastAt.get(player.id)) == null ? void 0 : _a2.get(method);
    return lastEventAt && system.currentTick - lastEventAt < EVENT_COOLDOWN_DURATION;
  };
  const shouldDeferEventToOffhand = (player) => {
    const mainhandItem = getEquipmentAtSlot(player, EquipmentSlot.Mainhand);
    if (!mainhandItem) return true;
    return mainhandItem.getTags().includes(TAG_DEFER_ALLOW);
  };
  const handleItemEvent = (event, method, hasCooldown = false) => {
    var _a2;
    const { Item: MainhandItem, instance: mainhandInstance } = getItemFromRegistry((_a2 = event.itemStack) == null ? void 0 : _a2.typeId);
    const actor = event.source ?? event.player;
    const isValidMainhandItem = !!MainhandItem && !!mainhandInstance;
    if (isValidMainhandItem) {
      const mainhandMethod = mainhandInstance[method];
      if (!mainhandMethod || typeof mainhandMethod !== "function") {
        sendInfoLog(`Mainhand method ${method} not found on instance`, {}, true);
        return;
      }
      if (hasCooldown) {
        if (isPlayerEventCooldownActive(mainhandInstance, actor, method)) return;
        setPlayerEventCooldown(mainhandInstance, actor, method);
      }
      mainhandMethod.call(mainhandInstance, event, EquipmentSlot.Mainhand);
    } else if (shouldDeferEventToOffhand(actor)) {
      const offhandItem = getEquipmentAtSlot(actor, EquipmentSlot.Offhand);
      if (!offhandItem) return;
      const { Item: OffhandItem, instance: offhandInstance } = getItemFromRegistry(offhandItem.typeId);
      if (!OffhandItem || !offhandInstance) {
        sendInfoLog(`Offhand item instance not found for typeId ${offhandItem.typeId}`, {}, true);
        return;
      }
      const offhandMethod = offhandInstance[method];
      if (!offhandMethod || typeof offhandMethod !== "function") {
        sendInfoLog(`Offhand method ${method} not found on instance`, {}, true);
        return;
      }
      if (hasCooldown) {
        if (isPlayerEventCooldownActive(offhandInstance, actor, method)) return;
        setPlayerEventCooldown(offhandInstance, actor, method);
      }
      offhandMethod.call(offhandInstance, event, EquipmentSlot.Offhand);
    }
  };
  const handleLeaveWorldForSlot = (player, equipmentSlot) => {
    var _a2;
    const playerEquipmentForSlot = getEquipmentAtSlot(player, equipmentSlot);
    const currentEquipmentForSlot = (playerEquipmentForSlot == null ? void 0 : playerEquipmentForSlot.typeId) ?? EMPTY_SLOT_ITEM_ID;
    const { instance: slotInstance } = getItemFromRegistry(currentEquipmentForSlot);
    (_a2 = slotInstance == null ? void 0 : slotInstance.onLeaveWorld) == null ? void 0 : _a2.call(slotInstance, player);
  };
  world.afterEvents.itemCompleteUse.subscribe((event) => {
    handleItemEvent(event, "onCompleteUse");
  });
  world.afterEvents.itemReleaseUse.subscribe((event) => {
    handleItemEvent(event, "onReleaseUse");
  });
  world.afterEvents.itemStartUse.subscribe((event) => {
    handleItemEvent(event, "onStartUse");
  });
  world.afterEvents.itemStartUseOn.subscribe((event) => {
    handleItemEvent(event, "onStartUseOn");
  });
  world.afterEvents.itemStopUse.subscribe((event) => {
    handleItemEvent(event, "onStopUse");
  });
  world.afterEvents.itemStopUseOn.subscribe((event) => {
    handleItemEvent(event, "onStopUseOn");
  });
  world.afterEvents.itemUse.subscribe((event) => {
    handleItemEvent(event, "onUse");
  });
  world.afterEvents.playerInteractWithBlock.subscribe((event) => {
    handleItemEvent(event, "playerInteractWithBlock");
  });
  world.afterEvents.playerInteractWithEntity.subscribe((event) => {
    handleItemEvent(event, "playerInteractWithEntity");
  });
  world.beforeEvents.itemUse.subscribe((event) => {
    handleItemEvent(event, "onUseBefore");
  });
  world.beforeEvents.playerLeave.subscribe((event) => {
    handleLeaveWorldForSlot(event.player, EquipmentSlot.Mainhand);
    handleLeaveWorldForSlot(event.player, EquipmentSlot.Offhand);
  });
  world.beforeEvents.playerInteractWithBlock.subscribe((event) => {
    handleItemEvent(event, "playerInteractWithBlockBefore", true);
  });
  world.beforeEvents.playerInteractWithEntity.subscribe((event) => {
    handleItemEvent(event, "playerInteractWithEntityBefore", true);
  });
  world.afterEvents.entityHitEntity.subscribe((event) => {
    var _a2;
    const isDamagingEntityPlayer = event.damagingEntity.typeId === "minecraft:player";
    if (!isDamagingEntityPlayer) return;
    const player = getPlayerById(event.damagingEntity.id);
    if (!player) return;
    const mainhandItem = getEquipmentAtSlot(player, EquipmentSlot.Mainhand);
    if (!mainhandItem) return;
    const { Item, instance } = getItemFromRegistry(mainhandItem.typeId);
    if (!Item || !instance) return;
    (_a2 = instance.onHitEntity) == null ? void 0 : _a2.call(instance, player, event.hitEntity);
  });
  world.afterEvents.playerHotbarSelectedSlotChange.subscribe((event) => {
    const player = event.player;
    handleEquipForSlot(player, EquipmentSlot.Mainhand);
    handleEquipForSlot(player, EquipmentSlot.Offhand);
  });
  world.afterEvents.entityHitBlock.subscribe((event) => {
    var _a2;
    const isDamagingEntityPlayer = event.damagingEntity.typeId === "minecraft:player";
    if (!isDamagingEntityPlayer) return;
    const player = getPlayerById(event.damagingEntity.id);
    if (!player) return;
    const mainhandItem = getEquipmentAtSlot(player, EquipmentSlot.Mainhand);
    if (!mainhandItem) return;
    const { Item, instance } = getItemFromRegistry(mainhandItem.typeId);
    if (!Item || !instance) return;
    (_a2 = instance.onHitBlock) == null ? void 0 : _a2.call(instance, player, event.hitBlock, event.hitBlockPermutation, event.blockFace);
  });
  const doesItemExistInHistory = (player, typeId) => {
    return !!playerItemHistoryDb(player).find(typeId);
  };
  const handleEquipForSlot = (player, equipmentSlot) => {
    var _a2, _b, _c;
    const playerEquipmentForSlot = getEquipmentAtSlot(player, equipmentSlot);
    const currentEquipmentForSlot = (playerEquipmentForSlot == null ? void 0 : playerEquipmentForSlot.typeId) ?? EMPTY_SLOT_ITEM_ID;
    const previousEquipmentForSlot = playerPreviousEquippedItemDb(player).find(equipmentSlot) ?? EMPTY_SLOT_ITEM_ID;
    const isItemForPlayerUnchanged = currentEquipmentForSlot === previousEquipmentForSlot;
    if (isItemForPlayerUnchanged) return;
    if (previousEquipmentForSlot && previousEquipmentForSlot !== EMPTY_SLOT_ITEM_ID) {
      const { instance: itemInstance } = getItemFromRegistry(previousEquipmentForSlot);
      (_a2 = itemInstance == null ? void 0 : itemInstance.onUnequip) == null ? void 0 : _a2.call(itemInstance, player, equipmentSlot);
    }
    if (currentEquipmentForSlot && currentEquipmentForSlot !== EMPTY_SLOT_ITEM_ID) {
      const { instance: slotInstance } = getItemFromRegistry(currentEquipmentForSlot);
      (_b = slotInstance == null ? void 0 : slotInstance.onEquip) == null ? void 0 : _b.call(slotInstance, player, equipmentSlot, playerEquipmentForSlot);
    }
    playerPreviousEquippedItemDb(player).save(equipmentSlot, currentEquipmentForSlot ?? EMPTY_SLOT_ITEM_ID);
    if (!doesItemExistInHistory(player, currentEquipmentForSlot)) {
      const { instance: itemInstance } = getItemFromRegistry(currentEquipmentForSlot);
      (_c = itemInstance == null ? void 0 : itemInstance.onEquipFirstTime) == null ? void 0 : _c.call(itemInstance, player);
      playerItemHistoryDb(player).save(currentEquipmentForSlot, true);
    }
  };
};
const registerItems = (items) => {
  world.afterEvents.playerSpawn.subscribe((event) => {
    if (event.initialSpawn) {
      playerPreviousEquippedItemDb(event.player).flush();
    }
  });
  system.beforeEvents.startup.subscribe(() => {
    initializeItemRegistry(items);
  });
};
var EntityType = /* @__PURE__ */ ((EntityType2) => {
  EntityType2["WanRedcaveBiomeChecker"] = "wan_redcave:biome_checker";
  EntityType2["WanRedcaveFireballSpit"] = "wan_redcave:fireball_spit";
  EntityType2["WanRedcaveFlyingDrone"] = "wan_redcave:flying_drone";
  EntityType2["WanRedcaveLaserProjectile"] = "wan_redcave:laser_projectile";
  EntityType2["WanRedcaveLittleTyrant"] = "wan_redcave:little_tyrant";
  EntityType2["WanRedcaveRedstoneCrawler"] = "wan_redcave:redstone_crawler";
  EntityType2["WanRedcaveRedstoneCreeper"] = "wan_redcave:redstone_creeper";
  EntityType2["WanRedcaveRedstoneHound"] = "wan_redcave:redstone_hound";
  EntityType2["WanRedcaveRedstoneLongleg"] = "wan_redcave:redstone_longleg";
  EntityType2["WanRedcaveRedstoneTyrant"] = "wan_redcave:redstone_tyrant";
  EntityType2["WanRedcaveRedstoneWing"] = "wan_redcave:redstone_wing";
  return EntityType2;
})(EntityType || {});
var BlockType = /* @__PURE__ */ ((BlockType2) => {
  BlockType2["WanRedcaveAutofarmerT1"] = "wan_redcave:autofarmer_t1";
  BlockType2["WanRedcaveAutofarmerT2"] = "wan_redcave:autofarmer_t2";
  BlockType2["WanRedcaveBlueNetworkCore"] = "wan_redcave:blue_network_core";
  BlockType2["WanRedcaveCrusherT1"] = "wan_redcave:crusher_t1";
  BlockType2["WanRedcaveCrusherT2"] = "wan_redcave:crusher_t2";
  BlockType2["WanRedcaveElectricOvenT1"] = "wan_redcave:electric_oven_t1";
  BlockType2["WanRedcaveElectricOvenT2"] = "wan_redcave:electric_oven_t2";
  BlockType2["WanRedcaveGeneratorT1"] = "wan_redcave:generator_t1";
  BlockType2["WanRedcaveGeneratorT2"] = "wan_redcave:generator_t2";
  BlockType2["WanRedcaveHematite"] = "wan_redcave:hematite";
  BlockType2["WanRedcaveHematiteRedstoneInclusion"] = "wan_redcave:hematite_redstone_inclusion";
  BlockType2["WanRedcaveHematiteRedstoneOre"] = "wan_redcave:hematite_redstone_ore";
  BlockType2["WanRedcaveHematiteStalactite"] = "wan_redcave:hematite_stalactite";
  BlockType2["WanRedcaveHematiteStalactiteTip"] = "wan_redcave:hematite_stalactite_tip";
  BlockType2["WanRedcaveHematiteStalagmite"] = "wan_redcave:hematite_stalagmite";
  BlockType2["WanRedcaveHematiteStalagmiteTip"] = "wan_redcave:hematite_stalagmite_tip";
  BlockType2["WanRedcaveMagnetite"] = "wan_redcave:magnetite";
  BlockType2["WanRedcaveMagnetiteRedlightCurve"] = "wan_redcave:magnetite_redlight_curve";
  BlockType2["WanRedcaveMagnetiteRedlightHorizontal"] = "wan_redcave:magnetite_redlight_horizontal";
  BlockType2["WanRedcaveMagnetiteRedlightIntersection"] = "wan_redcave:magnetite_redlight_intersection";
  BlockType2["WanRedcaveMagnetiteRedlightPerpendicular"] = "wan_redcave:magnetite_redlight_perpendicular";
  BlockType2["WanRedcaveMagnetiteRedlightVertical"] = "wan_redcave:magnetite_redlight_vertical";
  BlockType2["WanRedcaveMagnetiteRedstoneInclusion"] = "wan_redcave:magnetite_redstone_inclusion";
  BlockType2["WanRedcaveMagnetiteRedstoneOre"] = "wan_redcave:magnetite_redstone_ore";
  BlockType2["WanRedcaveMagnetiteSoil"] = "wan_redcave:magnetite_soil";
  BlockType2["WanRedcaveNetworkAccessPanel"] = "wan_redcave:network_access_panel";
  BlockType2["WanRedcavePolishedMagnetite"] = "wan_redcave:polished_magnetite";
  BlockType2["WanRedcavePureRedstone"] = "wan_redcave:pure_redstone_block";
  BlockType2["WanRedcavePureRedstoneCluster"] = "wan_redcave:pure_redstone_cluster";
  BlockType2["WanRedcavePureRedstoneLargeBud"] = "wan_redcave:pure_redstone_large_bud";
  BlockType2["WanRedcavePureRedstoneMediumBud"] = "wan_redcave:pure_redstone_medium_bud";
  BlockType2["WanRedcavePureRedstoneSmallBud"] = "wan_redcave:pure_redstone_small_bud";
  BlockType2["WanRedcaveQuarry"] = "wan_redcave:quarry";
  BlockType2["WanRedcaveRedNetworkCore"] = "wan_redcave:red_network_core";
  BlockType2["WanRedcaveRedstoneDrip"] = "wan_redcave:redstone_drip";
  BlockType2["WanRedcaveRedstoneGlass"] = "wan_redcave:redstone_glass";
  BlockType2["WanRedcaveRedstoneGrowthShort"] = "wan_redcave:redstone_growth_short";
  BlockType2["WanRedcaveRedstoneGrowthTall"] = "wan_redcave:redstone_growth_tall";
  BlockType2["WanRedcaveRedstoneSprout"] = "wan_redcave:redstone_sprout";
  BlockType2["WanRedcaveWirelessHopper"] = "wan_redcave:wireless_hopper";
  return BlockType2;
})(BlockType || {});
var ItemType = /* @__PURE__ */ ((ItemType2) => {
  ItemType2["WanRedcaveBlasterOffT2"] = "wan_redcave:blaster_off_t2";
  ItemType2["WanRedcaveBlasterOnT2"] = "wan_redcave:blaster_on_t2";
  ItemType2["WanRedcaveBlasterT1"] = "wan_redcave:blaster_t1";
  ItemType2["WanRedcaveBluestone"] = "wan_redcave:bluestone";
  ItemType2["WanRedcaveBluestoneChip"] = "wan_redcave:bluestone_chip";
  ItemType2["WanRedcaveDroneCapsule"] = "wan_redcave:drone_capsule";
  ItemType2["WanRedcaveElectricDrillT1"] = "wan_redcave:electric_drill_t1";
  ItemType2["WanRedcaveElectricDrillT2"] = "wan_redcave:electric_drill_t2";
  ItemType2["WanRedcaveGuideBook"] = "wan_redcave:guide_book";
  ItemType2["WanRedcaveHolographicTouchpad"] = "wan_redcave:holographic_touchpad";
  ItemType2["WanRedcaveMagnetiteIngot"] = "wan_redcave:magnetite_ingot";
  ItemType2["WanRedcaveMagnetiteShard"] = "wan_redcave:magnetite_shard";
  ItemType2["WanRedcavePortableGeneratorT1"] = "wan_redcave:portable_generator_t1";
  ItemType2["WanRedcavePortableGeneratorT2"] = "wan_redcave:portable_generator_t2";
  ItemType2["WanRedcavePureRedstone"] = "wan_redcave:pure_redstone";
  ItemType2["WanRedcaveRedstoneChip"] = "wan_redcave:redstone_chip";
  ItemType2["WanRedcaveRedstoneHeart"] = "wan_redcave:redstone_heart";
  ItemType2["WanRedcaveTechBootsT1"] = "wan_redcave:tech_boots_t1";
  ItemType2["WanRedcaveTechBootsT2"] = "wan_redcave:tech_boots_t2";
  ItemType2["WanRedcaveTechChestplateT1"] = "wan_redcave:tech_chestplate_t1";
  ItemType2["WanRedcaveTechChestplateT2"] = "wan_redcave:tech_chestplate_t2";
  ItemType2["WanRedcaveTechHelmetT1"] = "wan_redcave:tech_helmet_t1";
  ItemType2["WanRedcaveTechHelmetT2"] = "wan_redcave:tech_helmet_t2";
  ItemType2["WanRedcaveTechLeggingsT1"] = "wan_redcave:tech_leggings_t1";
  ItemType2["WanRedcaveTechLeggingsT2"] = "wan_redcave:tech_leggings_t2";
  ItemType2["WanRedcaveTechShieldT1"] = "wan_redcave:tech_shield_t1";
  ItemType2["WanRedcaveTechShieldT2"] = "wan_redcave:tech_shield_t2";
  ItemType2["WanRedcaveTechSwordT1"] = "wan_redcave:tech_sword_t1";
  ItemType2["WanRedcaveTechSwordT2"] = "wan_redcave:tech_sword_t2";
  ItemType2["WanRedcaveTechsuitControlT1"] = "wan_redcave:techsuit_control_t1";
  ItemType2["WanRedcaveTechsuitControlT2"] = "wan_redcave:techsuit_control_t2";
  return ItemType2;
})(ItemType || {});
var Family = /* @__PURE__ */ ((Family2) => {
  Family2["Inanimate"] = "inanimate";
  Family2["Mob"] = "mob";
  Family2["Monster"] = "monster";
  Family2["WanRedcaveFlyingDrone"] = "wan_redcave:flying_drone";
  Family2["WanRedcaveLittleTyrant"] = "wan_redcave:little_tyrant";
  Family2["WanRedcavePet"] = "wan_redcave:pet";
  Family2["WanRedcaveRedstoneCrawler"] = "wan_redcave:redstone_crawler";
  Family2["WanRedcaveRedstoneCreeper"] = "wan_redcave:redstone_creeper";
  Family2["WanRedcaveRedstoneHound"] = "wan_redcave:redstone_hound";
  Family2["WanRedcaveRedstoneLongleg"] = "wan_redcave:redstone_longleg";
  Family2["WanRedcaveRedstoneTyrant"] = "wan_redcave:redstone_tyrant";
  Family2["WanRedcaveRedstoneWing"] = "wan_redcave:redstone_wing";
  Family2["WanRedcaveRobot"] = "wan_redcave:robot";
  return Family2;
})(Family || {});
var EntityEvent = /* @__PURE__ */ ((EntityEvent2) => {
  EntityEvent2["WanRedcaveDefault"] = "event:public:wan_redcave:default";
  EntityEvent2["WanRedcaveHostileOn"] = "event:public:wan_redcave:hostile_on";
  EntityEvent2["WanRedcaveOff"] = "event:public:wan_redcave:off";
  EntityEvent2["WanRedcavePacificOn"] = "event:public:wan_redcave:pacific_on";
  EntityEvent2["WanRedcavePickup"] = "event:public:wan_redcave:pickup";
  EntityEvent2["WanRedcaveSit"] = "event:public:wan_redcave:sit";
  EntityEvent2["WanRedcaveUnsit"] = "event:public:wan_redcave:unsit";
  EntityEvent2["WanRedcaveShooting"] = "event:public:wan_redcave:shooting";
  EntityEvent2["WanRedcaveChooseAttack"] = "event:public:wan_redcave:choose_attack";
  EntityEvent2["WanRedcaveDespawn"] = "event:public:wan_redcave:despawn";
  EntityEvent2["WanRedcaveGetTarget"] = "event:public:wan_redcave:get_target";
  EntityEvent2["WanRedcavePostBite"] = "event:public:wan_redcave:post_bite";
  EntityEvent2["WanRedcavePostJump"] = "event:public:wan_redcave:post_jump";
  EntityEvent2["WanRedcavePostMelee"] = "event:public:wan_redcave:post_melee";
  EntityEvent2["WanRedcavePostSaw"] = "event:public:wan_redcave:post_saw";
  EntityEvent2["WanRedcavePostShootLaser"] = "event:public:wan_redcave:post_shoot_laser";
  EntityEvent2["WanRedcavePostCharge"] = "event:public:wan_redcave:post_charge";
  EntityEvent2["WanRedcavePostEat"] = "event:public:wan_redcave:post_eat";
  EntityEvent2["WanRedcavePostSmash"] = "event:public:wan_redcave:post_smash";
  EntityEvent2["WanRedcavePostSpit"] = "event:public:wan_redcave:post_spit";
  EntityEvent2["WanRedcavePostSwing"] = "event:public:wan_redcave:post_swing";
  EntityEvent2["WanRedcavePostLaser"] = "event:public:wan_redcave:post_laser";
  EntityEvent2["WanRedcavePostShoot"] = "event:public:wan_redcave:post_shoot";
  return EntityEvent2;
})(EntityEvent || {});
var EntityProperty = /* @__PURE__ */ ((EntityProperty2) => {
  EntityProperty2["WanRedcaveInBiome"] = "wan_redcave:in_biome";
  EntityProperty2["WanRedcaveHomeX"] = "wan_redcave:home_x";
  EntityProperty2["WanRedcaveHomeY"] = "wan_redcave:home_y";
  EntityProperty2["WanRedcaveHomeZ"] = "wan_redcave:home_z";
  EntityProperty2["WanRedcaveDxBack"] = "wan_redcave:dx_back";
  EntityProperty2["WanRedcaveDxFront"] = "wan_redcave:dx_front";
  EntityProperty2["WanRedcaveDxMid"] = "wan_redcave:dx_mid";
  EntityProperty2["WanRedcaveSxBack"] = "wan_redcave:sx_back";
  EntityProperty2["WanRedcaveSxFront"] = "wan_redcave:sx_front";
  EntityProperty2["WanRedcaveSxMid"] = "wan_redcave:sx_mid";
  EntityProperty2["WanRedcaveLaserLength"] = "wan_redcave:laser_length";
  EntityProperty2["WanRedcaveLaserPitch"] = "wan_redcave:laser_pitch";
  EntityProperty2["WanRedcaveCharge"] = "wan_redcave:charge";
  EntityProperty2["WanRedcaveEatAvailable"] = "wan_redcave:eat_available";
  EntityProperty2["WanRedcaveSmashAvailable"] = "wan_redcave:smash_available";
  return EntityProperty2;
})(EntityProperty || {});
var Particle = /* @__PURE__ */ ((Particle2) => {
  Particle2["WanRedcaveRedstoneCave1"] = "wan_redcave:redstone_cave.1";
  Particle2["WanRedcaveMachineArrow1"] = "wan_redcave:machine_arrow.1";
  Particle2["WanRedcaveTyrantRoar1"] = "wan_redcave:tyrant.roar.1";
  Particle2["WanRedcaveTyrantRoar2"] = "wan_redcave:tyrant.roar.2";
  Particle2["WanRedcaveTyrantRoar3"] = "wan_redcave:tyrant.roar.3";
  Particle2["WanRedcaveTyrantRoar4"] = "wan_redcave:tyrant.roar.4";
  Particle2["WanRedcaveTyrantStep1"] = "wan_redcave:tyrant.step.1";
  Particle2["WanRedcaveRedstoneWingTrailBlue1"] = "wan_redcave:redstone_wing.trail_blue.1";
  Particle2["WanRedcaveRedstoneWingTrailRed1"] = "wan_redcave:redstone_wing.trail_red.1";
  return Particle2;
})(Particle || {});
var ScriptEventWanRedcaveFlyingDroneMessages = /* @__PURE__ */ ((ScriptEventWanRedcaveFlyingDroneMessages2) => {
  ScriptEventWanRedcaveFlyingDroneMessages2["Off"] = "off";
  return ScriptEventWanRedcaveFlyingDroneMessages2;
})(ScriptEventWanRedcaveFlyingDroneMessages || {});
var ScriptEventWanRedcaveRedstoneCrawlerMessages = /* @__PURE__ */ ((ScriptEventWanRedcaveRedstoneCrawlerMessages2) => {
  ScriptEventWanRedcaveRedstoneCrawlerMessages2["Off"] = "off";
  ScriptEventWanRedcaveRedstoneCrawlerMessages2["Bite"] = "bite";
  ScriptEventWanRedcaveRedstoneCrawlerMessages2["Jump"] = "jump";
  return ScriptEventWanRedcaveRedstoneCrawlerMessages2;
})(ScriptEventWanRedcaveRedstoneCrawlerMessages || {});
var ScriptEventWanRedcaveRedstoneCreeperMessages = /* @__PURE__ */ ((ScriptEventWanRedcaveRedstoneCreeperMessages2) => {
  ScriptEventWanRedcaveRedstoneCreeperMessages2["Off"] = "off";
  ScriptEventWanRedcaveRedstoneCreeperMessages2["Melee"] = "melee";
  return ScriptEventWanRedcaveRedstoneCreeperMessages2;
})(ScriptEventWanRedcaveRedstoneCreeperMessages || {});
var ScriptEventWanRedcaveRedstoneHoundMessages = /* @__PURE__ */ ((ScriptEventWanRedcaveRedstoneHoundMessages2) => {
  ScriptEventWanRedcaveRedstoneHoundMessages2["Off"] = "off";
  ScriptEventWanRedcaveRedstoneHoundMessages2["Bite"] = "bite";
  ScriptEventWanRedcaveRedstoneHoundMessages2["Saw"] = "saw";
  ScriptEventWanRedcaveRedstoneHoundMessages2["ShootLaser"] = "shoot_laser";
  return ScriptEventWanRedcaveRedstoneHoundMessages2;
})(ScriptEventWanRedcaveRedstoneHoundMessages || {});
var ScriptEventWanRedcaveRedstoneLonglegMessages = /* @__PURE__ */ ((ScriptEventWanRedcaveRedstoneLonglegMessages2) => {
  ScriptEventWanRedcaveRedstoneLonglegMessages2["Off"] = "off";
  ScriptEventWanRedcaveRedstoneLonglegMessages2["Charge"] = "charge";
  return ScriptEventWanRedcaveRedstoneLonglegMessages2;
})(ScriptEventWanRedcaveRedstoneLonglegMessages || {});
var ScriptEventWanRedcaveRedstoneTyrantMessages = /* @__PURE__ */ ((ScriptEventWanRedcaveRedstoneTyrantMessages2) => {
  ScriptEventWanRedcaveRedstoneTyrantMessages2["Bite"] = "bite";
  ScriptEventWanRedcaveRedstoneTyrantMessages2["Swing"] = "swing";
  ScriptEventWanRedcaveRedstoneTyrantMessages2["Smash"] = "smash";
  ScriptEventWanRedcaveRedstoneTyrantMessages2["Eat"] = "eat";
  ScriptEventWanRedcaveRedstoneTyrantMessages2["Spit"] = "spit";
  ScriptEventWanRedcaveRedstoneTyrantMessages2["Death"] = "death";
  return ScriptEventWanRedcaveRedstoneTyrantMessages2;
})(ScriptEventWanRedcaveRedstoneTyrantMessages || {});
var ScriptEventWanRedcaveRedstoneWingMessages = /* @__PURE__ */ ((ScriptEventWanRedcaveRedstoneWingMessages2) => {
  ScriptEventWanRedcaveRedstoneWingMessages2["Off"] = "off";
  ScriptEventWanRedcaveRedstoneWingMessages2["Shoot"] = "shoot";
  ScriptEventWanRedcaveRedstoneWingMessages2["Laser"] = "laser";
  return ScriptEventWanRedcaveRedstoneWingMessages2;
})(ScriptEventWanRedcaveRedstoneWingMessages || {});
var BlockState = /* @__PURE__ */ ((BlockState2) => {
  BlockState2["WanRedcaveStatus"] = "wan_redcave:status";
  return BlockState2;
})(BlockState || {});
var WanRedcaveStatus = /* @__PURE__ */ ((WanRedcaveStatus2) => {
  WanRedcaveStatus2["Offline"] = "offline";
  WanRedcaveStatus2["OnlineUnpowered"] = "online_unpowered";
  WanRedcaveStatus2["OnlinePowered"] = "online_powered";
  WanRedcaveStatus2["OnlineNoLinks"] = "online_no_links";
  WanRedcaveStatus2["OnlineNoInput"] = "online_no_input";
  WanRedcaveStatus2["OnlineNoOutput"] = "online_no_output";
  WanRedcaveStatus2["Working"] = "working";
  return WanRedcaveStatus2;
})(WanRedcaveStatus || {});
const MachinesDB = jsonDB("machines");
const networkCoresDB = jsonDB("networkCores");
const ENERGYCONFIG = {
  diameter: 50,
  generators: {
    [BlockType.WanRedcaveGeneratorT1]: { energyPerTick: 2 },
    [BlockType.WanRedcaveGeneratorT2]: { energyPerTick: 10 }
  },
  portableGenerators: {
    [ItemType.WanRedcavePortableGeneratorT1]: { maxEnergy: 3 },
    [ItemType.WanRedcavePortableGeneratorT2]: { maxEnergy: 15 }
  },
  armors: {
    [ItemType.WanRedcaveTechsuitControlT1]: { cost: 4 },
    [ItemType.WanRedcaveTechsuitControlT2]: { cost: 13 }
  },
  items: {
    [ItemType.WanRedcaveElectricDrillT1]: { cost: 2 },
    [ItemType.WanRedcaveElectricDrillT2]: { cost: 8 },
    [ItemType.WanRedcaveBlasterT1]: { cost: 4 },
    [ItemType.WanRedcaveBlasterOnT2]: { cost: 14 },
    [ItemType.WanRedcaveBlasterOffT2]: { cost: 14 },
    [ItemType.WanRedcaveTechSwordT1]: { cost: 8 },
    [ItemType.WanRedcaveTechSwordT2]: { cost: 10 },
    [ItemType.WanRedcaveTechShieldT1]: { cost: 8 },
    [ItemType.WanRedcaveTechShieldT2]: { cost: 10 }
  },
  entities: {
    [EntityType.WanRedcaveFlyingDrone]: { cost: 4 },
    [EntityType.WanRedcaveLittleTyrant]: { cost: 20 },
    [EntityType.WanRedcaveRedstoneCrawler]: { cost: 12 },
    [EntityType.WanRedcaveRedstoneCreeper]: { cost: 3 },
    [EntityType.WanRedcaveRedstoneHound]: { cost: 8 },
    [EntityType.WanRedcaveRedstoneLongleg]: { cost: 4 },
    [EntityType.WanRedcaveRedstoneWing]: { cost: 3 }
  }
};
const Machines = [
  {
    id: "network_access_panel",
    displayName: "Network Access Panel",
    type: "accessPane",
    tier: 1,
    ticksPerProcess: 0,
    efficiencyBonus: 0,
    energyCost: 1,
    blockId: BlockType.WanRedcaveNetworkAccessPanel
  },
  {
    id: "crusher_tier1",
    displayName: "Ore Crusher I",
    type: "crusher",
    tier: 1,
    ticksPerProcess: secondsToTicks(10),
    // 10 seconds
    efficiencyBonus: 0,
    energyCost: 6,
    blockId: BlockType.WanRedcaveCrusherT1
  },
  {
    id: "crusher_tier2",
    displayName: "Ore Crusher II",
    type: "crusher",
    tier: 2,
    ticksPerProcess: secondsToTicks(5),
    // 5 seconds
    efficiencyBonus: 2,
    energyCost: 12,
    blockId: BlockType.WanRedcaveCrusherT2
  },
  {
    id: "electric_oven_tier1",
    displayName: "Electric Oven I",
    type: "electricOven",
    tier: 1,
    ticksPerProcess: secondsToTicks(10),
    // 10 seconds 
    efficiencyBonus: 0.05,
    energyCost: 2,
    blockId: BlockType.WanRedcaveElectricOvenT1
  },
  {
    id: "electric_oven_tier2",
    displayName: "Electric Oven II",
    type: "electricOven",
    tier: 2,
    ticksPerProcess: secondsToTicks(5),
    efficiencyBonus: 0.25,
    energyCost: 10,
    blockId: BlockType.WanRedcaveElectricOvenT2
  },
  {
    id: "wireless_hopper",
    displayName: "Wireless Hopper",
    type: "wirelessHopper",
    tier: 1,
    ticksPerProcess: secondsToTicks(1),
    efficiencyBonus: 0,
    energyCost: 2,
    blockId: BlockType.WanRedcaveWirelessHopper
  },
  {
    id: "auto_farmer_tier1",
    displayName: "Auto Farmer I",
    type: "autoFarmer",
    tier: 1,
    ticksPerProcess: secondsToTicks(30),
    // 30 seconds per generation
    efficiencyBonus: 0,
    energyCost: 5,
    blockId: BlockType.WanRedcaveAutofarmerT1
  },
  {
    id: "auto_farmer_tier2",
    displayName: "Auto Farmer II",
    type: "autoFarmer",
    tier: 2,
    ticksPerProcess: secondsToTicks(2),
    // 2 seconds check interval
    efficiencyBonus: 0,
    energyCost: 11,
    blockId: BlockType.WanRedcaveAutofarmerT2
  },
  {
    id: "quarry",
    displayName: "Quarry",
    type: "quarry",
    tier: 2,
    ticksPerProcess: secondsToTicks(1),
    efficiencyBonus: 0,
    energyCost: 15,
    blockId: BlockType.WanRedcaveQuarry
  }
];
function getDefinitionByBlockId(blockId) {
  return Machines.find((def) => def.blockId === blockId);
}
const RecipeRegistry = {
  // =========================================================================
  // --- CRUSHER RECIPES: Increasing raw yield and breaking down materials ---
  // =========================================================================
  crusher: [
    // --- 1. ORES: Increased Yield from Crushing (Gives Raw/Dust form) ---
    // Iron Ore
    { input: MinecraftBlockTypes.IronOre, output: MinecraftItemTypes.RawIron, minAmount: 2, maxAmount: 4 },
    { input: MinecraftBlockTypes.DeepslateIronOre, output: MinecraftItemTypes.RawIron, minAmount: 2, maxAmount: 4 },
    { input: MinecraftItemTypes.RawIron, output: MinecraftItemTypes.IronNugget, minAmount: 2, maxAmount: 4 },
    // Crushing Raw to Nugget
    // Gold Ore
    { input: MinecraftBlockTypes.GoldOre, output: MinecraftItemTypes.RawGold, minAmount: 2, maxAmount: 4 },
    { input: MinecraftBlockTypes.DeepslateGoldOre, output: MinecraftItemTypes.RawGold, minAmount: 2, maxAmount: 4 },
    { input: MinecraftBlockTypes.NetherGoldOre, output: MinecraftItemTypes.GoldNugget, minAmount: 4, maxAmount: 9 },
    { input: MinecraftItemTypes.RawGold, output: MinecraftItemTypes.GoldNugget, minAmount: 2, maxAmount: 4 },
    // Crushing Raw to Nugget
    // Copper Ore 
    { input: MinecraftBlockTypes.CopperOre, output: MinecraftItemTypes.RawCopper, minAmount: 3, maxAmount: 5 },
    { input: MinecraftBlockTypes.DeepslateCopperOre, output: MinecraftItemTypes.RawCopper, minAmount: 3, maxAmount: 5 },
    { input: MinecraftItemTypes.RawCopper, output: MinecraftItemTypes.GoldNugget, minAmount: 2, maxAmount: 4 },
    // Gems/Dusts
    { input: MinecraftBlockTypes.CoalOre, output: MinecraftItemTypes.Coal, minAmount: 2, maxAmount: 5 },
    { input: MinecraftBlockTypes.DeepslateCoalOre, output: MinecraftItemTypes.Coal, minAmount: 2, maxAmount: 5 },
    { input: MinecraftBlockTypes.DiamondOre, output: MinecraftItemTypes.Diamond, minAmount: 2, maxAmount: 5 },
    { input: MinecraftBlockTypes.DeepslateDiamondOre, output: MinecraftItemTypes.Diamond, minAmount: 2, maxAmount: 5 },
    { input: MinecraftBlockTypes.EmeraldOre, output: MinecraftItemTypes.Emerald, minAmount: 2, maxAmount: 5 },
    { input: MinecraftBlockTypes.DeepslateEmeraldOre, output: MinecraftItemTypes.Emerald, minAmount: 2, maxAmount: 5 },
    { input: MinecraftBlockTypes.LapisOre, output: MinecraftItemTypes.LapisLazuli, minAmount: 6, maxAmount: 12 },
    { input: MinecraftBlockTypes.DeepslateLapisOre, output: MinecraftItemTypes.LapisLazuli, minAmount: 6, maxAmount: 12 },
    { input: MinecraftBlockTypes.RedstoneOre, output: MinecraftItemTypes.Redstone, minAmount: 6, maxAmount: 12 },
    { input: MinecraftBlockTypes.DeepslateRedstoneOre, output: MinecraftItemTypes.Redstone, minAmount: 6, maxAmount: 12 },
    { input: MinecraftBlockTypes.QuartzOre, output: MinecraftItemTypes.Quartz, minAmount: 2, maxAmount: 5 },
    // Ancient Debris (High Yield)
    { input: MinecraftBlockTypes.AncientDebris, output: MinecraftItemTypes.NetheriteScrap, minAmount: 1, maxAmount: 3 },
    // --- 2. BASE MATERIALS: Crushing down to lower quality ---
    { input: MinecraftBlockTypes.Cobblestone, output: MinecraftItemTypes.Gravel, amount: 1 },
    { input: MinecraftItemTypes.Gravel, output: MinecraftItemTypes.Sand, amount: 1 },
    { input: MinecraftItemTypes.Sand, output: MinecraftItemTypes.ClayBall, amount: 1 },
    // Fancy Stone Crushing (breaking down composite stones)
    { input: MinecraftBlockTypes.Diorite, output: MinecraftBlockTypes.Cobblestone, amount: 1 },
    { input: MinecraftBlockTypes.Andesite, output: MinecraftBlockTypes.Cobblestone, amount: 1 },
    { input: MinecraftBlockTypes.Granite, output: MinecraftBlockTypes.Cobblestone, amount: 1 },
    // Concrete Crushing (breaks back into powder)
    { input: MinecraftBlockTypes.WhiteConcrete, output: MinecraftBlockTypes.WhiteConcretePowder, minAmount: 4, maxAmount: 4 },
    { input: MinecraftBlockTypes.OrangeConcrete, output: MinecraftBlockTypes.OrangeConcretePowder, minAmount: 4, maxAmount: 4 },
    { input: MinecraftBlockTypes.MagentaConcrete, output: MinecraftBlockTypes.MagentaConcretePowder, minAmount: 4, maxAmount: 4 },
    { input: MinecraftBlockTypes.LightBlueConcrete, output: MinecraftBlockTypes.LightBlueConcretePowder, minAmount: 4, maxAmount: 4 },
    { input: MinecraftBlockTypes.YellowConcrete, output: MinecraftBlockTypes.YellowConcretePowder, minAmount: 4, maxAmount: 4 },
    { input: MinecraftBlockTypes.LimeConcrete, output: MinecraftBlockTypes.LimeConcretePowder, minAmount: 4, maxAmount: 4 },
    { input: MinecraftBlockTypes.PinkConcrete, output: MinecraftBlockTypes.PinkConcretePowder, minAmount: 4, maxAmount: 4 },
    { input: MinecraftBlockTypes.GrayConcrete, output: MinecraftBlockTypes.GrayConcretePowder, minAmount: 4, maxAmount: 4 },
    { input: MinecraftBlockTypes.LightGrayConcrete, output: MinecraftBlockTypes.LightGrayConcretePowder, minAmount: 4, maxAmount: 4 },
    { input: MinecraftBlockTypes.CyanConcrete, output: MinecraftBlockTypes.CyanConcretePowder, minAmount: 4, maxAmount: 4 },
    { input: MinecraftBlockTypes.PurpleConcrete, output: MinecraftBlockTypes.PurpleConcretePowder, minAmount: 4, maxAmount: 4 },
    { input: MinecraftBlockTypes.BlueConcrete, output: MinecraftBlockTypes.BlueConcretePowder, minAmount: 4, maxAmount: 4 },
    { input: MinecraftBlockTypes.BrownConcrete, output: MinecraftBlockTypes.BrownConcretePowder, minAmount: 4, maxAmount: 4 },
    { input: MinecraftBlockTypes.GreenConcrete, output: MinecraftBlockTypes.GreenConcretePowder, minAmount: 4, maxAmount: 4 },
    { input: MinecraftBlockTypes.RedConcrete, output: MinecraftBlockTypes.RedConcretePowder, minAmount: 4, maxAmount: 4 },
    { input: MinecraftBlockTypes.BlackConcrete, output: MinecraftBlockTypes.BlackConcretePowder, minAmount: 4, maxAmount: 4 },
    // --- 3. NETHER & END: Specialized Crushing ---
    { input: MinecraftBlockTypes.Netherrack, output: MinecraftItemTypes.Gravel, amount: 1 },
    { input: MinecraftBlockTypes.Blackstone, output: MinecraftItemTypes.Gravel, amount: 1 },
    { input: MinecraftBlockTypes.Magma, output: MinecraftBlockTypes.Netherrack, amount: 1 },
    { input: MinecraftBlockTypes.EndStone, output: MinecraftBlockTypes.EndStone, minAmount: 1, maxAmount: 2 },
    // Extra yield on End Stone
    // --- 4. ORGANIC/MOB DROPS: Powdering ---
    { input: MinecraftBlockTypes.BoneBlock, output: MinecraftItemTypes.BoneMeal, minAmount: 6, maxAmount: 9 },
    { input: MinecraftItemTypes.BlazeRod, output: MinecraftItemTypes.BlazePowder, minAmount: 3, maxAmount: 5 },
    // --- 5. MISCELLANEOUS ---
    { input: BlockType.WanRedcavePolishedMagnetite, output: ItemType.WanRedcaveMagnetiteShard, minAmount: 2, maxAmount: 4 }
  ],
  // =========================================================================
  // --- ELECTRIC OVEN RECIPES: Faster Smelting and Cooking ---
  // =========================================================================
  electricOven: [
    // --- 1. ORES: Smelting to Ingots/Scrap ---
    { input: MinecraftItemTypes.RawIron, output: MinecraftItemTypes.IronIngot, amount: 1 },
    { input: MinecraftBlockTypes.IronOre, output: MinecraftItemTypes.IronIngot, amount: 1 },
    { input: MinecraftBlockTypes.DeepslateIronOre, output: MinecraftItemTypes.IronIngot, amount: 1 },
    { input: MinecraftItemTypes.RawGold, output: MinecraftItemTypes.GoldIngot, amount: 1 },
    { input: MinecraftBlockTypes.GoldOre, output: MinecraftItemTypes.GoldIngot, amount: 1 },
    { input: MinecraftBlockTypes.DeepslateGoldOre, output: MinecraftItemTypes.GoldIngot, amount: 1 },
    { input: MinecraftBlockTypes.NetherGoldOre, output: MinecraftItemTypes.GoldNugget, amount: 1 },
    { input: MinecraftItemTypes.RawCopper, output: MinecraftItemTypes.CopperIngot, amount: 1 },
    { input: MinecraftBlockTypes.CopperOre, output: MinecraftItemTypes.CopperIngot, amount: 1 },
    { input: MinecraftBlockTypes.DeepslateCopperOre, output: MinecraftItemTypes.CopperIngot, amount: 1 },
    // Ancient Debris 
    { input: MinecraftBlockTypes.AncientDebris, output: MinecraftItemTypes.NetheriteScrap, amount: 1 },
    // --- 2. BUILDING MATERIALS: Stone, Glass, Bricks ---
    { input: MinecraftBlockTypes.Cobblestone, output: MinecraftBlockTypes.Stone, amount: 1 },
    { input: MinecraftBlockTypes.Stone, output: MinecraftBlockTypes.SmoothStone, amount: 1 },
    { input: MinecraftBlockTypes.CobbledDeepslate, output: MinecraftBlockTypes.Deepslate, amount: 1 },
    { input: MinecraftItemTypes.Sand, output: MinecraftBlockTypes.Glass, amount: 1 },
    { input: MinecraftItemTypes.RedSand, output: MinecraftBlockTypes.Glass, amount: 1 },
    { input: MinecraftBlockTypes.Sandstone, output: MinecraftBlockTypes.SmoothSandstone, amount: 1 },
    { input: MinecraftBlockTypes.RedSandstone, output: MinecraftBlockTypes.SmoothRedSandstone, amount: 1 },
    { input: MinecraftBlockTypes.QuartzBlock, output: MinecraftBlockTypes.SmoothQuartz, amount: 1 },
    // Clay/Bricks 
    { input: MinecraftItemTypes.ClayBall, output: MinecraftItemTypes.Brick, amount: 1 },
    { input: MinecraftBlockTypes.Clay, output: MinecraftBlockTypes.HardenedClay, amount: 1 },
    { input: MinecraftBlockTypes.Netherrack, output: MinecraftBlockTypes.NetherBrick, amount: 1 },
    // --- 3. WOOD & DYES ---
    // Wood/Charcoal 
    { input: MinecraftBlockTypes.OakLog, output: MinecraftItemTypes.Charcoal, amount: 1 },
    { input: MinecraftBlockTypes.SpruceLog, output: MinecraftItemTypes.Charcoal, amount: 1 },
    { input: MinecraftBlockTypes.BirchLog, output: MinecraftItemTypes.Charcoal, amount: 1 },
    { input: MinecraftBlockTypes.JungleLog, output: MinecraftItemTypes.Charcoal, amount: 1 },
    { input: MinecraftBlockTypes.AcaciaLog, output: MinecraftItemTypes.Charcoal, amount: 1 },
    { input: MinecraftBlockTypes.DarkOakLog, output: MinecraftItemTypes.Charcoal, amount: 1 },
    { input: MinecraftBlockTypes.MangroveLog, output: MinecraftItemTypes.Charcoal, amount: 1 },
    { input: MinecraftBlockTypes.CherryLog, output: MinecraftItemTypes.Charcoal, amount: 1 },
    // Dye 
    { input: MinecraftItemTypes.Cactus, output: MinecraftItemTypes.GreenDye, amount: 1 },
    { input: MinecraftItemTypes.SeaPickle, output: MinecraftItemTypes.LimeDye, amount: 1 },
    // --- 4. FOOD: Cooking ---
    { input: MinecraftItemTypes.Beef, output: MinecraftItemTypes.CookedBeef, amount: 1 },
    { input: MinecraftItemTypes.Porkchop, output: MinecraftItemTypes.CookedPorkchop, amount: 1 },
    { input: MinecraftItemTypes.Chicken, output: MinecraftItemTypes.CookedChicken, amount: 1 },
    { input: MinecraftItemTypes.Mutton, output: MinecraftItemTypes.CookedMutton, amount: 1 },
    { input: MinecraftItemTypes.Rabbit, output: MinecraftItemTypes.CookedRabbit, amount: 1 },
    { input: MinecraftItemTypes.Cod, output: MinecraftItemTypes.CookedCod, amount: 1 },
    { input: MinecraftItemTypes.Salmon, output: MinecraftItemTypes.CookedSalmon, amount: 1 },
    { input: MinecraftItemTypes.Potato, output: MinecraftItemTypes.BakedPotato, amount: 1 },
    { input: MinecraftItemTypes.Kelp, output: MinecraftItemTypes.DriedKelp, amount: 1 },
    // --- 5. MISCELLANEOUS ---
    // Sponge 
    { input: MinecraftBlockTypes.WetSponge, output: MinecraftItemTypes.Sponge, amount: 1 }
  ]
};
const ITEM_DB_KEY$1 = "wan_redcave:item_db";
const MAX_PROPERTY_SIZE$1 = 32e3;
const _ItemDB = class _ItemDB {
  // -------------------------------------------------------------------------
  // --- REGISTRATION & LOOKUP ---
  // -------------------------------------------------------------------------
  /**
    * Registers an item ID and returns its numeric ID.
    * If already registered, returns the existing ID.
    */
  static register(itemId) {
    const existingId = _ItemDB.itemToId.get(itemId);
    if (existingId !== void 0) {
      return existingId;
    }
    const newId = _ItemDB.idToItem.length;
    _ItemDB.idToItem.push(itemId);
    _ItemDB.itemToId.set(itemId, newId);
    return newId;
  }
  /**
    * Gets the string ID of the item from a numeric ID.
    */
  static getItemById(id) {
    return _ItemDB.idToItem[id];
  }
  /**
    * Gets the numeric ID from a string item ID.
    * Auto-registers the item if not found.
    */
  static getIdByItem(item) {
    return _ItemDB.itemToId.get(item) ?? _ItemDB.register(item);
  }
  /**
    * Returns a list of all registered items with their numeric IDs.
    */
  static getAll() {
    return _ItemDB.idToItem.map((itemId, id) => ({ id, itemId }));
  }
  // -------------------------------------------------------------------------
  // --- PERSISTENCE (EXPORT/IMPORT) ---
  // -------------------------------------------------------------------------
  /**
    * Exports the registry data as a string array (list of item IDs).
    */
  static export() {
    return [..._ItemDB.idToItem];
  }
  /**
    * Imports data into the registry, clearing existing entries.
    */
  static import(data) {
    _ItemDB.idToItem = [];
    _ItemDB.itemToId.clear();
    data.forEach((itemId) => _ItemDB.register(itemId));
  }
  /**
    * Saves the entire item database to the world's dynamic properties.
    */
  static saveToWorld() {
    try {
      const dataArray = _ItemDB.export();
      const jsonString = JSON.stringify(dataArray);
      if (jsonString.length > MAX_PROPERTY_SIZE$1) {
        console.error(`[ItemDB] Data size (${jsonString.length}) exceeds safe limit (${MAX_PROPERTY_SIZE$1}). Data might be truncated.`);
      }
      world.setDynamicProperty(ITEM_DB_KEY$1, jsonString);
    } catch (error) {
      console.error("[ItemDB] Failed to save:", error);
    }
  }
  /**
    * Loads the item database from the world's dynamic properties.
    * If loading fails or data is missing, performs pre-registration.
    */
  static loadFromWorld() {
    try {
      const dataString = world.getDynamicProperty(ITEM_DB_KEY$1);
      if (!dataString) {
        _ItemDB.preRegisterCommonItems();
        return;
      }
      const dataArray = JSON.parse(dataString);
      _ItemDB.import(dataArray);
      _ItemDB.preRegisterCommonItems();
    } catch (error) {
      console.error("[ItemDB] Failed to load:", error);
      _ItemDB.preRegisterCommonItems();
    }
  }
  // -------------------------------------------------------------------------
  // --- INITIALIZATION ---
  // -------------------------------------------------------------------------
  /**
    * Pre-registers common items (like the touchpad) and all items found 
    * in the RecipeRegistry to ensure they have stable IDs immediately.
    */
  static preRegisterCommonItems() {
    const itemsToRegister = /* @__PURE__ */ new Set();
    for (const machineType in RecipeRegistry) {
      const recipes = RecipeRegistry[machineType];
      for (const recipe of recipes) {
        itemsToRegister.add(recipe.input);
        itemsToRegister.add(recipe.output);
      }
    }
    itemsToRegister.add(ItemType.WanRedcaveHolographicTouchpad);
    itemsToRegister.forEach((itemId) => _ItemDB.register(itemId));
  }
};
// Maps numeric ID (index) to string item ID
__publicField(_ItemDB, "idToItem", []);
// Maps string item ID to numeric ID
__publicField(_ItemDB, "itemToId", /* @__PURE__ */ new Map());
let ItemDB = _ItemDB;
var Utility;
((Utility2) => {
  function notify(player, message, type = "info") {
    const color = type === "error" ? "§c" : type === "success" ? "§a" : "§e";
    player.sendMessage(`§7[${color}Machine§7]§r ${message}`);
    try {
      let sound;
      switch (type) {
        case "error":
          sound = "mob.villager.no";
          break;
        case "success":
          sound = "random.orb";
          break;
        case "info":
        default:
          sound = "random.click";
          break;
      }
      player.playSound(sound);
    } catch {
    }
  }
  Utility2.notify = notify;
  function consumeItem(player, itemDbId) {
    const itemId = ItemDB.getItemById(itemDbId);
    if (!itemId) return false;
    const invComponent = player.getComponent(EntityComponentTypes.Inventory);
    if (!invComponent) return false;
    const container = invComponent.container;
    if (!container) return false;
    for (let i = 0; i < container.size; i++) {
      const item = container.getItem(i);
      if (item && item.typeId === itemId) {
        item.amount -= 1;
        if (item.amount <= 0) {
          container.setItem(i, void 0);
        } else {
          container.setItem(i, item);
        }
        return true;
      }
    }
    return false;
  }
  Utility2.consumeItem = consumeItem;
  function getItemInMainhand(player) {
    const inventory = player.getComponent(EntityComponentTypes.Inventory);
    if (!inventory) return void 0;
    const container = inventory.container;
    if (!container) return void 0;
    const slot = player.selectedSlotIndex;
    if (slot < 0 || slot >= container.size) return void 0;
    return container.getItem(slot);
  }
  Utility2.getItemInMainhand = getItemInMainhand;
  function isItemPowered(itemStack) {
    const powered = itemStack.getDynamicProperty("wan_redcave:powered");
    return powered ?? false;
  }
  Utility2.isItemPowered = isItemPowered;
  function blockToLocation(block) {
    return {
      x: block.x,
      y: block.y,
      z: block.z,
      dimensionId: block.dimension.id
    };
  }
  Utility2.blockToLocation = blockToLocation;
  function getBlockAt(loc) {
    try {
      const dimension = world.getDimension(loc.dimensionId);
      const block = dimension.getBlock({ x: loc.x, y: loc.y, z: loc.z });
      return block ?? void 0;
    } catch {
      return void 0;
    }
  }
  Utility2.getBlockAt = getBlockAt;
  function getContainerAt(loc) {
    try {
      const block = getBlockAt(loc);
      if (!block) return void 0;
      const invComponent = block.getComponent(EntityComponentTypes.Inventory);
      if (!invComponent) return void 0;
      return invComponent.container;
    } catch {
      return void 0;
    }
  }
  Utility2.getContainerAt = getContainerAt;
  function isBlockValid(loc) {
    const block = getBlockAt(loc);
    if (!block) return false;
    return block.typeId !== "minecraft:air";
  }
  Utility2.isBlockValid = isBlockValid;
  function isValidContainer(block) {
    const containerTypes = [
      MinecraftBlockTypes.Chest,
      MinecraftBlockTypes.Barrel,
      MinecraftBlockTypes.Hopper,
      MinecraftBlockTypes.Dropper,
      MinecraftBlockTypes.Dispenser,
      MinecraftBlockTypes.TrappedChest
    ];
    return containerTypes.includes(block.typeId) || block.getComponent(EntityComponentTypes.Inventory) !== void 0;
  }
  Utility2.isValidContainer = isValidContainer;
  function normalizeDimensionLocation(loc) {
    let dimId;
    if (!loc.dimension) {
      dimId = "minecraft:overworld";
    } else if (typeof loc.dimension === "string") {
      dimId = loc.dimension;
    } else if ("id" in loc.dimension && typeof loc.dimension.id === "string") {
      dimId = loc.dimension.id;
    } else {
      dimId = loc.dimension.id;
    }
    return {
      x: loc.x,
      y: loc.y,
      z: loc.z,
      dimension: world.getDimension(dimId)
    };
  }
  Utility2.normalizeDimensionLocation = normalizeDimensionLocation;
  function locationsEqual2(a, b) {
    return a.x === b.x && a.y === b.y && a.z === b.z && a.dimensionId === b.dimensionId;
  }
  Utility2.locationsEqual = locationsEqual2;
  function formatLocation(loc) {
    const dimensionName = loc.dimensionId.split(":")[1] ?? loc.dimensionId;
    return `(${loc.x}, ${loc.y}, ${loc.z}) in ${dimensionName}`;
  }
  Utility2.formatLocation = formatLocation;
  function generateMachineId(typeId) {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1e4);
    return `${typeId}-${timestamp}-${random}`;
  }
  Utility2.generateMachineId = generateMachineId;
  function safeJsonParse(json, fallback) {
    try {
      return JSON.parse(json);
    } catch {
      return fallback;
    }
  }
  Utility2.safeJsonParse = safeJsonParse;
})(Utility || (Utility = {}));
function getPlayerGenerators(player) {
  var _a2;
  const inv = (_a2 = player.getComponent("minecraft:inventory")) == null ? void 0 : _a2.container;
  if (!inv) return [];
  const generators = [];
  for (let i = 0; i < inv.size; i++) {
    const item = inv.getItem(i);
    if (item && ENERGYCONFIG.portableGenerators[item.typeId]) generators.push(item);
  }
  return generators;
}
function getTotalGeneratorEnergy(player) {
  const gens = getPlayerGenerators(player);
  let totalEnergy = 0;
  for (const gen of gens) totalEnergy += ENERGYCONFIG.portableGenerators[gen.typeId].maxEnergy;
  return totalEnergy;
}
function distributePortableEnergy(player) {
  var _a2, _b, _c, _d, _e, _f;
  const totalEnergy = getTotalGeneratorEnergy(player);
  let remainingEnergy = totalEnergy;
  const inv = (_a2 = player.getComponent("minecraft:inventory")) == null ? void 0 : _a2.container;
  const equip = player.getComponent(EntityEquippableComponent.componentId);
  if (inv) {
    for (let i = 0; i < inv.size; i++) {
      const item = inv.getItem(i);
      if (!item) continue;
      const cost = ((_b = ENERGYCONFIG.armors[item.typeId]) == null ? void 0 : _b.cost) ?? 0;
      if (cost === 0) continue;
      const hasPower = remainingEnergy >= cost;
      const currentPower = item.getDynamicProperty("wan_redcave:powered") === true;
      if (hasPower !== currentPower) {
        const updatedItem = item.clone();
        updatedItem.setDynamicProperty("wan_redcave:powered", hasPower);
        inv.setItem(i, updatedItem);
      }
      if (hasPower) {
        remainingEnergy -= cost;
      }
    }
  }
  const main = equip == null ? void 0 : equip.getEquipment(EquipmentSlot.Mainhand);
  if (main && Object.keys(ENERGYCONFIG.items).includes(main.typeId)) {
    const cost = ENERGYCONFIG.items[main.typeId].cost ?? 0;
    if (cost && remainingEnergy >= cost) {
      remainingEnergy -= cost;
      handlePower(player, main, true);
      if (main.typeId == ItemType.WanRedcaveBlasterOffT2) {
        equip == null ? void 0 : equip.setEquipment(EquipmentSlot.Mainhand, new ItemStack(ItemType.WanRedcaveBlasterOnT2));
      }
    } else {
      handlePower(player, main, false);
      if (main.typeId == ItemType.WanRedcaveBlasterOnT2) {
        equip == null ? void 0 : equip.setEquipment(EquipmentSlot.Mainhand, new ItemStack(ItemType.WanRedcaveBlasterOffT2));
      }
    }
  }
  const petEntities = player.dimension.getEntities({ families: [Family.WanRedcavePet], location: player.location, maxDistance: 40 });
  for (const pet of petEntities) {
    if (((_c = pet.getComponent(EntityMarkVariantComponent.componentId)) == null ? void 0 : _c.value) !== 2 && ((_d = pet.getComponent(EntityMarkVariantComponent.componentId)) == null ? void 0 : _d.value) !== 3) continue;
    const cost = ((_e = ENERGYCONFIG.entities[pet.typeId]) == null ? void 0 : _e.cost) ?? 0;
    if (cost === 0) continue;
    if (remainingEnergy >= cost) {
      remainingEnergy -= cost;
      poweredRobot.set(pet.id, { dimension: pet.dimension, x: pet.location.x, y: pet.location.y, z: pet.location.z });
    } else break;
  }
  const entities = player.dimension.getEntities({ families: [Family.WanRedcaveRobot], location: player.location, maxDistance: 40 });
  for (const entity of entities) {
    const cost = ((_f = ENERGYCONFIG.entities[entity.typeId]) == null ? void 0 : _f.cost) ?? 0;
    if (cost === 0) continue;
    if (remainingEnergy >= cost) {
      remainingEnergy -= cost;
      poweredRobot.set(entity.id, { dimension: player.dimension, x: player.location.x, y: player.location.y, z: player.location.z });
    } else break;
  }
}
function handlePower(player, itemStack, type) {
  var _a2;
  if (itemStack.getDynamicProperty("wan_redcave:powered") == type) return;
  itemStack.setDynamicProperty("wan_redcave:powered", type);
  const inv = (_a2 = player.getComponent(EntityInventoryComponent.componentId)) == null ? void 0 : _a2.container;
  inv == null ? void 0 : inv.setItem(player.selectedSlotIndex, itemStack);
}
const _Vector = class _Vector {
  constructor(x = 0, y = 0, z = 0) {
    __publicField(this, "x");
    __publicField(this, "y");
    __publicField(this, "z");
    this.x = Number(x);
    this.y = Number(y);
    this.z = Number(z);
  }
  static abs(vec) {
    return new _Vector(Math.abs(vec.x), Math.abs(vec.y), Math.abs(vec.z));
  }
  static magnitude(vec) {
    return Math.sqrt(vec.x * vec.x + vec.y * vec.y + vec.z * vec.z);
  }
  static magnitude2D(vec) {
    return Math.sqrt(vec.x * vec.x + vec.z * vec.z);
  }
  static normalize(vec) {
    const length = _Vector.magnitude(vec);
    return new _Vector(vec.x / length, vec.y / length, vec.z / length);
  }
  static cross(a, b) {
    return new _Vector(
      a.y * b.z - a.z * b.y,
      a.z * b.x - a.x * b.z,
      a.x * b.y - a.y * b.x
    );
  }
  static dot(a, b) {
    return a.x * b.x + a.y * b.y + a.z * b.z;
  }
  static angleBetween(a, b) {
    return Math.acos(_Vector.dot(a, b) / (_Vector.magnitude(a) * _Vector.magnitude(b)));
  }
  static subtract(a, b) {
    return new _Vector(a.x - b.x, a.y - b.y, a.z - b.z);
  }
  static add(a, b) {
    return new _Vector(a.x + b.x, a.y + b.y, a.z + b.z);
  }
  static multiply(vec, num) {
    if (typeof num === "number") {
      return new _Vector(vec.x * num, vec.y * num, vec.z * num);
    } else {
      return new _Vector(vec.x * num.x, vec.y * num.y, vec.z * num.z);
    }
  }
  static random(corner1, corner2) {
    const minX = Math.min(corner1.x, corner2.x);
    const maxX = Math.max(corner1.x, corner2.x);
    const minY = Math.min(corner1.y, corner2.y);
    const maxY = Math.max(corner1.y, corner2.y);
    const minZ = Math.min(corner1.z, corner2.z);
    const maxZ = Math.max(corner1.z, corner2.z);
    const randomX = Math.random() * (maxX - minX) + minX;
    const randomY = Math.random() * (maxY - minY) + minY;
    const randomZ = Math.random() * (maxZ - minZ) + minZ;
    return new _Vector(randomX, randomY, randomZ);
  }
  static floor(vec) {
    return new _Vector(Math.floor(vec.x), Math.floor(vec.y), Math.floor(vec.z));
  }
  static projection(a, b) {
    const scalar = _Vector.dot(a, b) / (b.x * b.x + b.y * b.y + b.z * b.z);
    return _Vector.multiply(b, scalar);
  }
  static rejection(a, b) {
    return _Vector.subtract(a, _Vector.projection(a, b));
  }
  static reflect(v, n) {
    return _Vector.subtract(v, _Vector.multiply(n, 2 * _Vector.dot(v, n)));
  }
  static lerp(a, b, t) {
    return _Vector.add(_Vector.multiply(a, 1 - t), _Vector.multiply(b, t));
  }
  static distance(a, b) {
    return _Vector.magnitude(_Vector.subtract(a, b));
  }
  static distanceSqr(a, b) {
    return _Vector.dot(_Vector.subtract(a, b), _Vector.subtract(a, b));
  }
  static from(object) {
    if (Array.isArray(object)) {
      return new _Vector(object[0], object[1], object[2]);
    }
    const { x = 0, y = 0, z = 0 } = object ?? {};
    return new _Vector(x, y, z);
  }
  static sort(vec1, vec2) {
    const [x1, x2] = vec1.x < vec2.x ? [vec1.x, vec2.x] : [vec2.x, vec1.x];
    const [y1, y2] = vec1.y < vec2.y ? [vec1.y, vec2.y] : [vec2.y, vec1.y];
    const [z1, z2] = vec1.z < vec2.z ? [vec1.z, vec2.z] : [vec2.z, vec1.z];
    return [new _Vector(x1, y1, z1), new _Vector(x2, y2, z2)];
  }
  distance(vec) {
    return _Vector.distance(this, vec);
  }
  lerp(vec, t) {
    return _Vector.lerp(this, vec, t);
  }
  projection(vec) {
    return _Vector.projection(this, vec);
  }
  reflect(vec) {
    return _Vector.reflect(this, vec);
  }
  rejection(vec) {
    return _Vector.rejection(this, vec);
  }
  cross(vec) {
    return _Vector.cross(this, vec);
  }
  dot(vec) {
    return _Vector.dot(this, vec);
  }
  floor() {
    return _Vector.floor(this);
  }
  add(vec) {
    return _Vector.add(this, vec);
  }
  subtract(vec) {
    return _Vector.subtract(this, vec);
  }
  multiply(num) {
    return _Vector.multiply(this, num);
  }
  random(corner1, corner2) {
    return _Vector.random(corner1, corner2);
  }
  get length() {
    return _Vector.magnitude(this);
  }
  get normalized() {
    return _Vector.normalize(this);
  }
  toString() {
    return `<${this.x}, ${this.y}, ${this.z}>`;
  }
};
__publicField(_Vector, "up", new _Vector(0, 1, 0));
__publicField(_Vector, "down", new _Vector(0, -1, 0));
__publicField(_Vector, "right", new _Vector(1, 0, 0));
__publicField(_Vector, "left", new _Vector(-1, 0, 0));
__publicField(_Vector, "forward", new _Vector(0, 0, 1));
__publicField(_Vector, "backward", new _Vector(0, 0, -1));
__publicField(_Vector, "zero", new _Vector(0, 0, 0));
let Vector = _Vector;
class Shield {
  /**
      * @param player The player involved.
      * @param attacker The entity that is attacking the player.
      * @returns True if the player is blocking with a shield.
      */
  static isBlocking(player, attacker) {
    const player_dir = player.getViewDirection();
    let angle;
    if (attacker instanceof Entity) {
      const player_to_attacker = Vector.subtract(attacker.location, player.location);
      angle = Vector.angleBetween(player_dir, player_to_attacker);
    } else {
      angle = Vector.angleBetween(player_dir, attacker);
    }
    if (angle > 0.785398) return false;
    return hasShieldInInv(player) && player.isSneaking && player.getItemCooldown("minecraft:shield") <= 0;
  }
  static simulateHitShield(player) {
    player.runCommand("playsound item.shield.block @s");
  }
  /**
      * Sets the shield cooldown time.
      * 
      * @param player The player involved
      * @param cooldown Duration in ticks of the shield cooldown.
      */
  static disableShield(player, cooldown) {
    player.startItemCooldown("minecraft:shield", cooldown);
  }
}
function hasShieldInInv(player) {
  var _a2, _b;
  const equipment = player.getComponent(EntityComponentTypes.Equippable);
  const itemMainhand = (_a2 = equipment == null ? void 0 : equipment.getEquipmentSlot(EquipmentSlot.Mainhand)) == null ? void 0 : _a2.getItem();
  const itemOffhand = (_b = equipment == null ? void 0 : equipment.getEquipmentSlot(EquipmentSlot.Offhand)) == null ? void 0 : _b.getItem();
  const isMainhandShield = (itemMainhand == null ? void 0 : itemMainhand.typeId) === "minecraft:shield";
  const isOffhandShield = (itemOffhand == null ? void 0 : itemOffhand.typeId) === "minecraft:shield";
  return isMainhandShield || isOffhandShield;
}
const _RedstoneTyrant = class _RedstoneTyrant extends BaseEntity {
  onCommandReceived(entity, command, message, initiator) {
    if (command == _RedstoneTyrant.identifier) {
      switch (message) {
        case ScriptEventWanRedcaveRedstoneTyrantMessages.Bite:
          RedstoneTyrantEngine.bite(entity);
          break;
        case ScriptEventWanRedcaveRedstoneTyrantMessages.Swing:
          RedstoneTyrantEngine.swing(entity);
          break;
        case ScriptEventWanRedcaveRedstoneTyrantMessages.Smash:
          RedstoneTyrantEngine.smash(entity);
          break;
        case ScriptEventWanRedcaveRedstoneTyrantMessages.Eat:
          RedstoneTyrantEngine.eat(entity);
          break;
        case ScriptEventWanRedcaveRedstoneTyrantMessages.Spit:
          RedstoneTyrantEngine.spit(entity);
          break;
        case ScriptEventWanRedcaveRedstoneTyrantMessages.Death:
          RedstoneTyrantEngine.death(entity);
          break;
      }
    }
  }
  onSessionLoad(entity) {
    if (entity.isValid)
      entity.setProperty(EntityProperty.WanRedcaveCharge, false);
  }
  onTick(entity) {
    if (system.currentTick % 1200 <= 1) {
      entity.setProperty(EntityProperty.WanRedcaveEatAvailable, true);
    } else if ((system.currentTick + 600) % 1200 <= 1) {
      entity.setProperty(EntityProperty.WanRedcaveSmashAvailable, true);
    }
  }
  onRemove(entity) {
    RedstoneTyrantEngine.remove(entity);
  }
};
__publicField(_RedstoneTyrant, "identifier", EntityType.WanRedcaveRedstoneTyrant);
let RedstoneTyrant = _RedstoneTyrant;
class RedstoneTyrantEngine {
  static bite(entity) {
    this.withValidTarget(entity, (entity2, target) => {
      entity2.triggerEvent(EntityEvent.WanRedcavePostBite);
      system.runTimeout(() => {
        this.enforceLookAt(entity2, target);
        system.runTimeout(() => this.areaAttack(
          entity2,
          target,
          /*distance=*/
          5,
          /*radius=*/
          7,
          /*damage=*/
          10,
          /*knockback=*/
          5,
          /*blocking_knockback=*/
          2,
          /*camera_shake=*/
          false
        ), 10);
      }, this.bite_cooldown);
    });
  }
  static swing(entity) {
    this.withValidTarget(entity, (entity2, target) => {
      entity2.triggerEvent(EntityEvent.WanRedcavePostSwing);
      system.runTimeout(() => {
        this.enforceLookAt(entity2, target);
        system.runTimeout(() => this.areaAttack(
          entity2,
          target,
          /*distance=*/
          6,
          /*radius=*/
          12,
          /*damage=*/
          10,
          /*knockback=*/
          9,
          /*blocking_knockback=*/
          5,
          /*camera_shake=*/
          true
        ), 10);
      }, this.swing_cooldown);
    });
  }
  static smash(entity) {
    this.withValidTarget(entity, (entity2, target) => {
      entity2.triggerEvent(EntityEvent.WanRedcavePostSmash);
      system.runTimeout(() => {
        this.enforceLookAt(entity2, target);
        this.areaAttack(
          entity2,
          target,
          /*distance=*/
          0,
          /*radius=*/
          24,
          /*damage=*/
          20,
          /*knockback=*/
          9,
          /*blocking_knockback=*/
          5,
          /*camera_shake=*/
          true,
          (entity3) => {
            if (entity3 instanceof Player) {
              Shield.disableShield(entity3, 60);
            }
          }
        );
      }, this.smash_cooldown);
      system.runTimeout(() => {
        const activatedRobots = this.activatedRobotsByTyrant.get(entity2.id) || /* @__PURE__ */ new Set();
        for (const ent of entity2.dimension.getEntities({
          minDistance: 0,
          location: entity2.location,
          maxDistance: 16,
          families: [Family.WanRedcaveRobot]
        })) {
          if (!ent.isValid) continue;
          activatedRobots.add(ent.id);
        }
        this.activatedRobotsByTyrant.set(entity2.id, activatedRobots);
        checkForTyrants();
        this.checkHomeNextTick = true;
      }, 75);
    });
  }
  static eat(entity) {
    entity.triggerEvent(EntityEvent.WanRedcavePostEat);
    system.runTimeout(() => {
      entity.setProperty(EntityProperty.WanRedcaveCharge, true);
      system.runTimeout(() => {
        if (entity.isValid) {
          entity.setProperty(EntityProperty.WanRedcaveCharge, false);
          this.emitCloud(entity);
        }
      }, 300);
    }, 50);
  }
  static death(entity) {
    var _a2;
    (_a2 = entity.getComponent(EntityComponentTypes.Health)) == null ? void 0 : _a2.setCurrentValue(1);
  }
  static remove(entity) {
    const dimension = entity.dimension;
    const pos = entity.location;
    system.run(() => {
      for (let i = 0; i < 50; i++) {
        dimension.spawnEntity(MinecraftEntityTypes.XpOrb, pos);
      }
      dimension.spawnItem(new ItemStack(ItemType.WanRedcaveRedstoneHeart), pos);
      dimension.spawnItem(new ItemStack(ItemType.WanRedcaveRedstoneChip, 1 + Math.floor(Math.random() * 4)), pos);
      dimension.spawnItem(new ItemStack(ItemType.WanRedcaveMagnetiteIngot, 1 + Math.floor(Math.random() * 6)), pos);
      dimension.spawnItem(new ItemStack(ItemType.WanRedcavePureRedstone, 1 + Math.floor(Math.random() * 2)), pos);
    });
  }
  static emitCloud(entity) {
  }
  static spit(entity) {
    this.withValidTarget(entity, (entity2, target) => {
      entity2.triggerEvent(EntityEvent.WanRedcavePostSpit);
      if (!entity2.isValid || !target.isValid) return;
      this.enforceLookAt(entity2, target);
      const offset = { x: 0, y: 6.5, z: 7 };
      system.runTimeout(() => {
        if (!entity2.isValid || !target.isValid) return;
        this.throwProjectileToTarget(entity2, target, EntityType.WanRedcaveFireballSpit, offset);
      }, 24);
      system.runTimeout(() => {
        if (!entity2.isValid || !target.isValid) return;
        this.throwProjectileToTarget(entity2, target, EntityType.WanRedcaveFireballSpit, offset);
      }, 31);
      system.runTimeout(() => {
        if (!entity2.isValid || !target.isValid) return;
        this.throwProjectileToTarget(entity2, target, EntityType.WanRedcaveFireballSpit, offset);
      }, 36);
      system.runTimeout(() => {
        if (!entity2.isValid || !target.isValid) return;
        this.throwProjectileToTarget(entity2, target, EntityType.WanRedcaveFireballSpit, offset);
      }, 43);
      system.runTimeout(() => {
        if (!entity2.isValid || !target.isValid) return;
        this.throwProjectileToTarget(entity2, target, EntityType.WanRedcaveFireballSpit, offset);
      }, 49);
      system.runTimeout(() => {
        if (!entity2.isValid || !target.isValid) return;
        this.throwProjectileToTarget(entity2, target, EntityType.WanRedcaveFireballSpit, offset);
      }, 56);
      system.runTimeout(() => {
        if (!entity2.isValid || !target.isValid) return;
        this.throwProjectileToTarget(entity2, target, EntityType.WanRedcaveFireballSpit, offset);
      }, 63);
    });
  }
  static areaAttack(entity, target, distance, radius, damage, knockback, blocking_knockback, camera_shake, forEachEntityCallback) {
    var _a2;
    if (!entity.isValid || ((_a2 = entity.getComponent(EntityComponentTypes.Variant)) == null ? void 0 : _a2.value) == this.death_variant || !target.isValid) return;
    const dir = Vector.normalize(Vector.subtract(target.location, entity.location));
    const rot = Math.atan2(-dir.x, dir.z) * (180 / Math.PI);
    entity.setRotation({ x: 0, y: rot });
    for (const ent of entity.dimension.getEntities({
      // get all the entities in front of the entity
      minDistance: 0,
      location: Vector.add(entity.location, Vector.multiply(dir, distance)),
      maxDistance: radius,
      excludeFamilies: this.excluded_families
    })) {
      if (!ent.isValid) continue;
      if (ent instanceof Player) {
        if (forEachEntityCallback) forEachEntityCallback(ent);
        if (camera_shake) entity.runCommand("/camerashake add " + ent.name + " 1 2");
        if (Shield.isBlocking(ent, entity)) {
          ent.applyKnockback({ x: dir.x * blocking_knockback, z: dir.z * blocking_knockback }, blocking_knockback * 0.08);
          continue;
        }
      }
      try {
        ent.applyDamage(damage);
        ent.applyKnockback({ x: dir.x * knockback, z: dir.z * knockback }, knockback * 0.08);
      } catch {
      }
    }
  }
  static throwProjectileToTarget(entity, target, projectile, ownerOffset) {
    var _a2;
    const yaw = entity.getRotation().y * (Math.PI / 180);
    const rotatedOffset = {
      x: ownerOffset.x * Math.cos(yaw) - ownerOffset.z * Math.sin(yaw),
      y: ownerOffset.y,
      z: ownerOffset.x * Math.sin(yaw) + ownerOffset.z * Math.cos(yaw)
    };
    const from = Vector.add(entity.location, rotatedOffset);
    const to = Vector.add(target.location, { x: 0, y: Vector.distance(entity.location, target.location) / 4 - 3, z: 0 });
    const dir = Vector.normalize(Vector.subtract(to, from));
    const projectileEntity = entity.dimension.spawnEntity(projectile, from);
    (_a2 = projectileEntity.getComponent(EntityComponentTypes.Projectile)) == null ? void 0 : _a2.shoot(Vector.multiply(dir, 2.5), {
      uncertainty: 0
    });
    entity.dimension.createExplosion(target.location, 1.5, { breaksBlocks: true });
  }
  static pushEntityAway(entity, target, horizontalForce, verticalForce) {
    const dir = {
      x: target.location.x - entity.location.x,
      z: target.location.z - entity.location.z
    };
    const length = Math.sqrt(dir.x * dir.x + dir.z * dir.z);
    if (length !== 0) {
      dir.x /= length;
      dir.z /= length;
    }
    const horizontalDir = Vector.multiply({ x: dir.x, y: 0, z: dir.z }, horizontalForce);
    target.applyKnockback(horizontalDir, verticalForce);
  }
  static enforceLookAt(entity, target) {
    const pre_dir = Vector.subtract(target.location, entity.location);
    const pre_yaw = Math.atan2(-pre_dir.x, pre_dir.z) * (180 / Math.PI);
    entity.setRotation({ x: 0, y: pre_yaw });
  }
  static withValidTarget(entity, callback) {
    var _a2;
    if (!entity.isValid || ((_a2 = entity.getComponent(EntityComponentTypes.Variant)) == null ? void 0 : _a2.value) == this.death_variant) return;
    (async () => {
      var _a3;
      const target = await this.getTarget(entity);
      if (!entity.isValid || ((_a3 = entity.getComponent(EntityComponentTypes.Variant)) == null ? void 0 : _a3.value) == this.death_variant) return;
      if (target) {
        callback(entity, target);
      } else {
        entity.triggerEvent(this.choose_attack);
      }
    })();
  }
  static getTarget(entity) {
    let resolved = false;
    return new Promise((resolve) => {
      entity.triggerEvent(EntityEvent.WanRedcaveGetTarget);
      const ev = system.afterEvents.scriptEventReceive.subscribe((data) => {
        if (data.id === "wan_redcave:get_target") {
          resolved = true;
          system.afterEvents.scriptEventReceive.unsubscribe(ev);
          resolve(data.sourceEntity);
          return;
        }
      });
      system.runTimeout(() => {
        system.afterEvents.scriptEventReceive.unsubscribe(ev);
        if (!resolved) resolve(null);
      }, 20);
    });
  }
}
__publicField(RedstoneTyrantEngine, "death_variant", 10);
__publicField(RedstoneTyrantEngine, "bite_cooldown", 0);
// ticks TO DO
__publicField(RedstoneTyrantEngine, "swing_cooldown", 25);
// ticks
__publicField(RedstoneTyrantEngine, "smash_cooldown", 26);
// ticks
__publicField(RedstoneTyrantEngine, "choose_attack", EntityEvent.WanRedcaveChooseAttack);
__publicField(RedstoneTyrantEngine, "excluded_families", [Family.WanRedcaveRedstoneTyrant, Family.WanRedcaveRobot]);
__publicField(RedstoneTyrantEngine, "checkHomeNextTick", false);
// used to instantly check for home next tick after smashing
__publicField(RedstoneTyrantEngine, "activatedRobotsByTyrant", /* @__PURE__ */ new Map());
const MACHINES_KEY = "wan_redcave:machines";
const ITEM_DB_KEY = "wan_redcave:item_db";
const MAX_PROPERTY_SIZE = 32e3;
const _MachineRegistry = class _MachineRegistry {
  // -------------------------------------------------------------------------
  // --- INITIALIZATION & METADATA ---
  // -------------------------------------------------------------------------
  /**
      * Initializes the registry by setting the required factory function.
      */
  static initialize(factory) {
    _MachineRegistry.factory = factory;
  }
  /**
      * Public entry point to start the loading process.
      */
  static loadAndStart() {
    _MachineRegistry.loadFromWorld();
  }
  /**
      * Registers metadata for a new machine type.
      */
  static registerType(info) {
    _MachineRegistry.typeRegistry.set(info.typeId, info);
  }
  /**
      * Retrieves all registered machine type metadata.
      */
  static getTypes() {
    return Array.from(_MachineRegistry.typeRegistry.values());
  }
  // -------------------------------------------------------------------------
  // --- LOOKUP & INSTANCE MANAGEMENT ---
  // -------------------------------------------------------------------------
  /**
      * Gets a machine instance by its unique ID.
      */
  static get(id) {
    return _MachineRegistry.machines.get(id);
  }
  /**
      * Gets all active machine instances.
      */
  static getAll() {
    return Array.from(_MachineRegistry.machines.values());
  }
  /**
      * Finds a machine instance located at the specified coordinates.
      */
  static findByLocation(location) {
    for (const machine of _MachineRegistry.machines.values()) {
      if (machine.location.x === location.x && machine.location.y === location.y && machine.location.z === location.z && machine.location.dimensionId === location.dimensionId) {
        return machine;
      }
    }
    return void 0;
  }
  /**
      * Finds a machine instance that is linked to the specified container location, 
      * either as input or output.
      * @returns The found MachineBase instance or undefined.
      */
  static findByLinkedContainer(location) {
    var _a2, _b;
    const locationsEqual2 = (loc1, loc2) => {
      if (!loc1 || !loc2) return false;
      return loc1.x === loc2.x && loc1.y === loc2.y && loc1.z === loc2.z && loc1.dimensionId === loc2.dimensionId;
    };
    for (const machine of _MachineRegistry.machines.values()) {
      if (locationsEqual2(machine.input, location) || locationsEqual2(machine.output, location)) {
        return machine;
      }
      if (Array.isArray(machine.input) && machine.input.some((loc) => locationsEqual2(loc, location))) {
        return machine;
      }
      if (Array.isArray(machine.output) && machine.output.some((loc) => locationsEqual2(loc, location))) {
        return machine;
      }
      if (((_a2 = machine.hasInputLink) == null ? void 0 : _a2.call(machine, location)) || ((_b = machine.hasOutputLink) == null ? void 0 : _b.call(machine, location))) {
        return machine;
      }
    }
    return void 0;
  }
  /**
      * Adds a new machine instance to the registry and triggers a world save.
      */
  static add(machine) {
    _MachineRegistry.machines.set(machine.id, machine);
    _MachineRegistry.saveToWorld();
  }
  /**
      * Removes a machine instance by ID and triggers a world save.
      */
  static remove(id) {
    const machine = _MachineRegistry.machines.get(id);
    if (machine) {
      _MachineRegistry.machines.delete(id);
      _MachineRegistry.saveToWorld();
    }
  }
  /**
      * Removes a machine instance located at the specified location and triggers a world save.
      * @returns True if a machine was found and removed.
      */
  static removeAtLocation(location) {
    const machine = _MachineRegistry.findByLocation(location);
    if (machine) {
      _MachineRegistry.remove(machine.id);
      return true;
    }
    return false;
  }
  // -------------------------------------------------------------------------
  // --- PERSISTENCE (SAVE/LOAD) ---
  // -------------------------------------------------------------------------
  /**
      * Serializes all machine data and the ItemDB to the world's dynamic properties.
      */
  static saveToWorld() {
    try {
      const dataArray = [];
      for (const machine of _MachineRegistry.machines.values()) {
        dataArray.push(machine.serialize());
      }
      const jsonString = JSON.stringify(dataArray);
      if (jsonString.length > MAX_PROPERTY_SIZE) {
        console.error(`[MachineRegistry] Data too large: ${jsonString.length} bytes. Check MAX_PROPERTY_SIZE.`);
        return;
      }
      world.setDynamicProperty(MACHINES_KEY, jsonString);
      ItemDB.saveToWorld();
    } catch (error) {
      console.error("[MachineRegistry] Save failed:", error);
    }
  }
  /**
      * Loads all machine data and the ItemDB from the world's dynamic properties.
      * Reconstructs MachineBase instances using the provided factory.
      */
  static loadFromWorld() {
    if (!_MachineRegistry.factory) {
      console.error("[MachineRegistry] Factory not set! Cannot reconstruct machines.");
      ItemDB.loadFromWorld();
      return;
    }
    try {
      const dataString = world.getDynamicProperty(MACHINES_KEY);
      if (!dataString) {
        ItemDB.loadFromWorld();
        return;
      }
      const dataArray = JSON.parse(dataString);
      _MachineRegistry.machines.clear();
      for (const data of dataArray) {
        const machine = _MachineRegistry.factory(data);
        if (machine) {
          _MachineRegistry.machines.set(machine.id, machine);
        }
      }
      ItemDB.loadFromWorld();
    } catch (error) {
      console.error("[MachineRegistry] Load failed:", error);
      ItemDB.loadFromWorld();
    }
  }
  // -------------------------------------------------------------------------
  // --- UTILITIES & MAINTENANCE ---
  // -------------------------------------------------------------------------
  /**
      * Iterates through all machines and removes those whose corresponding block no longer exists in the world.
      * @returns The count of machines removed.
      */
  static cleanup() {
    let removed = 0;
    const toRemove = [];
    for (const machine of _MachineRegistry.machines.values()) {
      if (!machine.exists()) {
        toRemove.push(machine.id);
        removed++;
      }
    }
    for (const id of toRemove) {
      _MachineRegistry.machines.delete(id);
    }
    return removed;
  }
  /**
      * Clears all machine data, ItemDB data, and player-specific pending link properties.
      * Use with caution as this resets the entire mod data.
      */
  static reset(player) {
    _MachineRegistry.machines.clear();
    world.setDynamicProperty(MACHINES_KEY, "[]");
    world.setDynamicProperty(ITEM_DB_KEY, "[]");
    try {
      for (const p of world.getPlayers()) {
        system.run(() => {
          p.setDynamicProperty("wan_redcave:pending_link", void 0);
        });
      }
      if (player) {
        player.sendMessage("§aNetwork data reset successfully.");
      }
    } catch (e) {
      console.error("[MachineRegistry] Reset failed:", e);
    }
  }
};
// Machine instances currently active in memory
__publicField(_MachineRegistry, "machines", /* @__PURE__ */ new Map());
// Factory function required for reconstructing machines after loading
__publicField(_MachineRegistry, "factory");
// Metadata for machine types (used for UI, etc.)
__publicField(_MachineRegistry, "typeRegistry", /* @__PURE__ */ new Map());
let MachineRegistry = _MachineRegistry;
const isSamePosition = (a, b) => a.x === b.x && a.y === b.y && a.z === b.z && a.dimension.id === b.dimension.id;
function isWithinCube$1(pos, center, range) {
  if (pos.dimension.id !== center.dimension.id) return false;
  const distance = getDistanceBetweenTwoVectors(
    { x: pos.x + 0.5, y: pos.y + 0.5, z: pos.z + 0.5 },
    { x: center.x + 0.5, y: center.y + 0.5, z: center.z + 0.5 }
  );
  return distance <= range;
}
const overlapsNetworkCores = (pos, networkCores) => networkCores == null ? void 0 : networkCores.find((a) => isWithinCube$1(pos, a.loc, ENERGYCONFIG.diameter));
const findNearbyNetworkCore = (pos, networkCores) => networkCores == null ? void 0 : networkCores.find((a) => isWithinCube$1(pos, a.loc, ENERGYCONFIG.diameter / 2));
const setNetworkCoreEnergy = (networkCore2, energy) => {
  networkCore2.energy = energy;
};
function getMachineEnergyCost(typeId) {
  const definition = Machines.find((m) => m.blockId === typeId);
  return (definition == null ? void 0 : definition.energyCost) ?? 0;
}
function handlePlaceNetworkCore(player, block) {
  const networkCores = networkCoresDB.find("networkCores") ?? [];
  const blockPos = { dimension: block.dimension, ...block.location };
  if (overlapsNetworkCores(blockPos, networkCores)) {
    block.setType("minecraft:air");
    if (player.getGameMode() !== GameMode.Creative) {
      giveItemToEntity(player, new ItemStack(BlockType.WanRedcaveBlueNetworkCore, 1));
    }
    player.sendMessage("§cYou cannot place an NetworkCore too close to another one!");
    return;
  }
  networkCores.push({ loc: blockPos, energy: 0 });
  networkCoresDB.save("networkCores", networkCores, false);
}
function handleBreakNetworkCore(player, block) {
  const networkCores = networkCoresDB.find("networkCores") ?? [];
  const blockPos = { dimension: block.dimension, ...block.location };
  const updatedNetworkCores = networkCores.filter((a) => !isSamePosition(a.loc, blockPos));
  networkCoresDB.save("networkCores", updatedNetworkCores, false);
}
function handlePlaceMachine(player, block) {
  const isMachine = block.getTags().includes("wan_redcave:machine");
  if (isMachine) return;
  const isGenerator = block.getTags().includes("wan_redcave:generator");
  const key = isGenerator ? "generators" : "machines";
  const data = MachinesDB.find(key) ?? { machines: [], generators: [] };
  const list = key === "machines" ? data.machines : data.generators;
  const blockPos = { dimension: block.dimension, ...block.location };
  if (!list.some((pos) => isSamePosition(pos.location, blockPos))) {
    list.push({ location: blockPos, active: false });
    MachinesDB.save(key, { [key]: list });
  }
}
function handleBreakMachine(player, block) {
  const isMachine = block.getTags().includes("wan_redcave:machine");
  if (isMachine) return;
  const key = isMachine ? "machines" : "generators";
  const data = MachinesDB.find(key) ?? { machines: [], generators: [] };
  const list = key === "machines" ? data.machines : data.generators;
  const blockPos = { dimension: block.dimension, ...block.location };
  const updatedList = list.filter((pos) => !isSamePosition(pos.location, blockPos));
  MachinesDB.save(key, { [key]: updatedList });
}
function checkGhostMachines() {
  for (const key of ["machines", "generators"]) {
    const machinesData = MachinesDB.find(key) ?? { [key]: [] };
    const machines = machinesData[key];
    var mark = false;
    for (let i = machines.length - 1; i >= 0; i--) {
      const machine = machines[i];
      try {
        const b = world.getDimension(machine.location.dimension.id).getBlock(machine.location);
        if (!b) continue;
        if (!(b.getTags().includes("wan_redcave:machine") || b.getTags().includes("wan_redcave:generator"))) {
          machines.splice(i, 1);
          mark = true;
        }
      } catch {
      }
    }
    if (mark) MachinesDB.save(key, { [key]: machines });
  }
  const networkCores = networkCoresDB.find("networkCores") ?? [];
  var mark = false;
  for (let i = networkCores.length - 1; i >= 0; i--) {
    const core = networkCores[i];
    try {
      const b = world.getDimension(core.loc.dimension.id).getBlock(core.loc);
      if (!b) continue;
      if (b.typeId != BlockType.WanRedcaveBlueNetworkCore) {
        networkCores.splice(i, 1);
        mark = true;
      }
    } catch {
    }
  }
  if (mark) networkCoresDB.save("networkCores", networkCores, false);
}
function distributeEnergyToConsumers() {
  var _a2, _b;
  const networkCoresRaw = networkCoresDB.find("networkCores") ?? [];
  const machinesRaw = ((_a2 = MachinesDB.find("machines")) == null ? void 0 : _a2.machines) ?? [];
  const networkCores = networkCoresRaw.map((a) => ({ ...a, loc: Utility.normalizeDimensionLocation(a.loc) }));
  const machines = machinesRaw.map((m) => ({ ...m, location: Utility.normalizeDimensionLocation(m.location) }));
  const complexMachines = MachineRegistry.getAll().filter((m) => {
    const block = m.getBlock();
    return block == null ? void 0 : block.getTags().includes("wan_redcave:machine");
  });
  for (const machine of complexMachines) {
    const machineBlock = machine.getBlock();
    if (!machineBlock) {
      machine.setNetworkStatus(false);
      machine.stop();
      continue;
    }
    const machineLocation = {
      x: machineBlock.location.x,
      y: machineBlock.location.y,
      z: machineBlock.location.z,
      dimension: machineBlock.dimension
    };
    const nearbyNetworkCore = findNearbyNetworkCore(machineLocation, networkCores);
    const inNetwork = nearbyNetworkCore !== void 0;
    machine.setNetworkStatus(inNetwork);
    const cost = getMachineEnergyCost(machineBlock.typeId);
    if (cost === 0) {
      if (inNetwork) {
        machine.start();
        machine.forceVisualUpdate();
      } else {
        machine.stop();
        machine.forceVisualUpdate();
      }
    } else {
      if (!inNetwork) {
        machine.stop();
        machine.forceVisualUpdate();
      }
    }
  }
  for (const machine of machines) {
    deactivateMachine(machine);
  }
  poweredRobot.clear();
  poweredRobotHostile.clear();
  for (const networkCore2 of networkCores) {
    networkCore2.usedEnergy = 0;
    const nearbyLegacyMachines = machines.filter((pos) => isWithinCube$1(pos.location, networkCore2.loc, ENERGYCONFIG.diameter / 2)).map((m) => ({
      type: "legacy_machine",
      location: m.location,
      ref: m
    }));
    const nearbyComplexMachines = complexMachines.filter((m) => {
      const machineBlock = m.getBlock();
      if (!machineBlock) return false;
      const cost = getMachineEnergyCost(machineBlock.typeId);
      if (cost === 0) return false;
      if (machineBlock.dimension.id !== networkCore2.loc.dimension.id) return false;
      const machineLocation = {
        ...m.location,
        dimension: machineBlock.dimension
      };
      return isWithinCube$1(machineLocation, networkCore2.loc, ENERGYCONFIG.diameter / 2);
    }).map((m) => ({
      type: "machine",
      // We use .getTags() here, so we must safely get the block location/dimension
      location: { ...m.location, dimension: m.getBlock().dimension },
      ref: m
    }));
    let nearbyRobots = [];
    try {
      nearbyRobots = networkCore2.loc.dimension.getEntities({ families: ["wan_redcave:robot"] }).filter((robot) => isWithinCube$1({ dimension: robot.dimension, ...robot.location }, networkCore2.loc, ENERGYCONFIG.diameter / 2)).map((robot) => ({
        type: "robot",
        entity: robot
      }));
    } catch (e) {
    }
    const consumers = [...nearbyComplexMachines, ...nearbyLegacyMachines, ...nearbyRobots];
    consumers.sort((a, b) => {
      const aLoc = a.type === "robot" ? { ...a.entity.location, dimension: a.entity.dimension } : a.location;
      const bLoc = b.type === "robot" ? { ...b.entity.location, dimension: b.entity.dimension } : b.location;
      return getDistanceBetweenTwoVectors(aLoc, networkCore2.loc) - getDistanceBetweenTwoVectors(bLoc, networkCore2.loc);
    });
    for (const consumer of consumers) {
      let cost = 0;
      let block;
      if (consumer.type === "machine" || consumer.type === "legacy_machine") {
        try {
          block = consumer.type === "machine" ? consumer.ref.getBlock() : consumer.location.dimension.getBlock(consumer.location);
        } catch (e) {
          continue;
        }
        if (!block) continue;
        cost = getMachineEnergyCost(block.typeId);
      } else if (consumer.type === "robot") {
        cost = ((_b = ENERGYCONFIG.entities[consumer.entity.typeId]) == null ? void 0 : _b.cost) ?? 0;
      }
      if ((networkCore2.usedEnergy ?? 0) + cost > networkCore2.energy) {
        if (consumer.type === "machine") {
          consumer.ref.stop();
          consumer.ref.forceVisualUpdate();
        } else if (consumer.type === "legacy_machine") deactivateMachine(consumer.ref);
        else deactivateRobot(consumer.entity);
        continue;
      }
      networkCore2.usedEnergy = (networkCore2.usedEnergy ?? 0) + cost;
      if (consumer.type === "machine") {
        consumer.ref.start();
        consumer.ref.forceVisualUpdate();
      } else if (consumer.type === "legacy_machine") activateMachine(consumer.ref);
      else powerRobot(consumer.entity, networkCore2.loc);
    }
  }
  checkForTyrants();
  networkCoresDB.save("NetworkCores", networkCores.map(({ usedEnergy, ...rest }) => rest), false);
  MachinesDB.save("machines", { machines }, false);
}
function distributeEnergyFromGenerators() {
  var _a2;
  const networkCoresRaw = networkCoresDB.find("networkCores") ?? [];
  const generatorsRaw = ((_a2 = MachinesDB.find("generators")) == null ? void 0 : _a2.generators) ?? [];
  const networkCores = networkCoresRaw.map((a) => ({
    ...a,
    loc: Utility.normalizeDimensionLocation(a.loc)
  }));
  const generators = generatorsRaw.map((g) => ({
    ...g,
    location: Utility.normalizeDimensionLocation(g.location)
  }));
  networkCores.forEach((a) => setNetworkCoreEnergy(a, 0));
  for (const genPos of generators) {
    const networkCore2 = findNearbyNetworkCore(genPos.location, networkCores);
    if (!networkCore2) continue;
    const block = genPos.location.dimension.getBlock(genPos.location);
    if (!block || !ENERGYCONFIG.generators[block.typeId]) continue;
    const energy = ENERGYCONFIG.generators[block.typeId].energyPerTick;
    setNetworkCoreEnergy(networkCore2, (networkCore2.energy ?? 0) + energy);
  }
  networkCoresDB.save("networkCores", networkCores, false);
}
system.runInterval(() => {
  distributeEnergyFromGenerators();
  distributeEnergyToConsumers();
  for (const player of world.getPlayers()) {
    distributePortableEnergy(player);
  }
  checkGhostMachines();
}, 1);
function activateMachine(machine) {
  machine.active = true;
}
function deactivateMachine(machine) {
  machine.active = false;
}
const poweredRobot = /* @__PURE__ */ new Map();
function powerRobot(entity, location) {
  poweredRobot.set(entity.id, location);
}
function deactivateRobot(entity) {
}
const poweredRobotHostile = /* @__PURE__ */ new Map();
function checkForTyrants() {
  for (const [robotId, activatedRobots] of RedstoneTyrantEngine.activatedRobotsByTyrant) {
    const robotEntity = world.getEntity(robotId);
    if (!robotEntity || !robotEntity.isValid) {
      RedstoneTyrantEngine.activatedRobotsByTyrant.delete(robotId);
      continue;
    }
    for (const tyrantId of activatedRobots) {
      poweredRobotHostile.set(tyrantId, robotEntity.location);
    }
  }
}
class NetworkCore extends BaseBlock {
  onPlayerPlace(block, dimension, player) {
    handlePlaceNetworkCore(player, block);
  }
  onPlayerBreak(block, dimension, player, cancel) {
    handleBreakNetworkCore(player, block);
  }
}
__publicField(NetworkCore, "identifier", BlockType.WanRedcaveBlueNetworkCore);
class GeneratorTier1 extends BaseBlock {
  onPlayerPlace(block, dimension, player) {
    handlePlaceMachine(player, block);
  }
  onPlayerBreak(block, dimension, player, cancel) {
    handleBreakMachine(player, block);
  }
}
__publicField(GeneratorTier1, "identifier", BlockType.WanRedcaveGeneratorT1);
class GeneratorTier2 extends BaseBlock {
  onPlayerPlace(block, dimension, player) {
    handlePlaceMachine(player, block);
  }
  onPlayerBreak(block, dimension, player, cancel) {
    handleBreakMachine(player, block);
  }
}
__publicField(GeneratorTier2, "identifier", BlockType.WanRedcaveGeneratorT2);
class NetworkCoreHostile extends BaseBlock {
  onPlayerBreak(block, dimension, player, cancel) {
    if (Math.random() < 0.3) {
      const view = player.getViewDirection();
      const offsetX = -view.x * 20;
      const offsetZ = -view.z * 20;
      const spawnPos = {
        x: player.location.x + offsetX,
        y: player.location.y,
        z: player.location.z + offsetZ
      };
      system.run(() => {
        dimension.spawnEntity(EntityType.WanRedcaveRedstoneTyrant, spawnPos);
      });
    }
  }
}
__publicField(NetworkCoreHostile, "identifier", BlockType.WanRedcaveRedNetworkCore);
registerBlocks([
  NetworkCore,
  GeneratorTier1,
  GeneratorTier2,
  NetworkCoreHostile
]);
class FireballSpit extends BaseEntity {
  onProjectileHitBlock(sorce, entity, hitVector, block, blockHitFace) {
    system.runTimeout(() => {
      if (entity.isValid)
        entity.remove();
    }, 10);
  }
  onProjectileHitEntity(source, entity, hitVector, target) {
    system.runTimeout(() => {
      if (entity.isValid)
        entity.remove();
    }, 10);
  }
}
__publicField(FireballSpit, "identifier", EntityType.WanRedcaveFireballSpit);
class HomeManager {
  /**
   * Checks if the entity has a valid home and manages home state
   */
  static checkHome(entity, config) {
    var _a2;
    if (!entity.isValid) return;
    const homeY = entity.getProperty(config.homeYProperty) ?? -64;
    if (homeY == -64) {
      this.searchForHome(entity, config);
    } else {
      const homeX = entity.getProperty(config.homeXProperty) ?? 0;
      const homeZ = entity.getProperty(config.homeZProperty) ?? 0;
      const home = { x: homeX, y: homeY, z: homeZ };
      try {
        const block = entity.dimension.getBlock(home);
        const mark = (_a2 = entity.getComponent(EntityComponentTypes.MarkVariant)) == null ? void 0 : _a2.value;
        if (!block) return;
        if (mark == 1 && block.typeId != BlockType.WanRedcaveRedNetworkCore && !poweredRobotHostile.get(entity.id) || mark == 3 && !poweredRobot.get(entity.id)) {
          this.removeHome(entity, config);
          this.searchForHome(entity, config);
          return;
        }
      } catch {
      }
    }
  }
  /**
   * Searches for a suitable home for the entity
   */
  static searchForHome(entity, config) {
    var _a2;
    if (!entity.isValid) return;
    const mark = (_a2 = entity.getComponent(EntityComponentTypes.MarkVariant)) == null ? void 0 : _a2.value;
    const origin = entity.location;
    const radius = 16;
    if (config.hasHostileMode !== false) {
      for (const block of entity.dimension.getBlocks(
        new BlockVolume(
          { x: origin.x - radius, y: origin.y - radius, z: origin.z - radius },
          { x: origin.x + radius, y: origin.y + radius, z: origin.z + radius }
        ),
        {
          includeTypes: [BlockType.WanRedcaveRedNetworkCore]
          // hostile home
        },
        true
      ).getBlockLocationIterator()) {
        const b = entity.dimension.getBlock(block);
        if (b) this.setHome(entity, b, config);
        if (mark == 2 || mark == 3 || mark == 0) {
          entity.triggerEvent(config.hostileOnEvent);
        }
        return;
      }
      const tyrant = poweredRobotHostile.get(entity.id);
      if (tyrant) {
        try {
          const b = entity.dimension.getBlock({ x: tyrant.x, y: tyrant.y, z: tyrant.z });
          if (b) this.setHome(entity, b, config);
          if (mark == 2 || mark == 3 || mark == 0) {
            entity.triggerEvent(config.hostileOnEvent);
          }
        } catch {
        }
        return;
      }
    }
    const home = poweredRobot.get(entity.id);
    if (home) {
      if (mark == 0) {
        if (config.useKillForDespawn) {
          entity.remove();
        } else {
          entity.triggerEvent(config.despawnEvent);
        }
        return;
      }
      if (config.pacificForAllMarks || mark == 2 || mark == 1) {
        entity.triggerEvent(config.pacificOnEvent);
      }
      if (config.onPacificHomeFound) {
        system.runTimeout(() => {
          try {
            const b = entity.dimension.getBlock({ x: home.x, y: home.y, z: home.z });
            if (!b) return;
            this.setHome(entity, b, config);
            config.onPacificHomeFound(entity, b);
          } catch {
          }
        }, 5);
      } else {
        try {
          const b = entity.dimension.getBlock({ x: home.x, y: home.y, z: home.z });
          if (b) this.setHome(entity, b, config);
        } catch {
        }
      }
      return;
    }
    if (config.hasHostileMode === false) {
      entity.triggerEvent(config.offEvent);
    } else {
      if (mark == 0) {
        entity.triggerEvent(config.despawnEvent);
      } else {
        entity.triggerEvent(config.offEvent);
      }
    }
  }
  /**
   * Removes the home from the entity
   */
  static removeHome(entity, config) {
    if (!entity.isValid) return;
    entity.setProperty(config.homeXProperty, 0);
    entity.setProperty(config.homeYProperty, -64);
    entity.setProperty(config.homeZProperty, 0);
  }
  /**
   * Sets the home for the entity to the specified block
   */
  static setHome(entity, block, config) {
    if (!entity.isValid) return;
    entity.setProperty(config.homeXProperty, block.location.x);
    entity.setProperty(config.homeYProperty, block.location.y);
    entity.setProperty(config.homeZProperty, block.location.z);
  }
  /**
   * Gets the owner of a home block (nearest player within 24 blocks)
   */
  static getHomeOwner(block) {
    for (const entity of block.dimension.getEntities({
      location: block.location,
      maxDistance: 24,
      type: "minecraft:player"
    })) {
      if (entity instanceof Player) {
        return entity;
      }
    }
    return null;
  }
}
class BaseEntityEngine {
  static meleeAttack(entity, target, cooldown, range, damage, knockback) {
    const direction = Vector.multiply(Vector.normalize(Vector.subtract(target.location, entity.location)), 0.5);
    entity.applyImpulse(direction);
    this.enforceLookAt(entity, target);
    system.runTimeout(() => {
      if (!entity.isValid || !target.isValid) return;
      this.enforceLookAt(entity, target);
      if (Vector.distanceSqr(entity.location, target.location) > range || !this.hasLineOfSight(entity, target)) {
        entity.triggerEvent(this.choose_attack);
        return;
      }
      const dir = Vector.normalize(Vector.subtract(target.location, entity.location));
      if (target instanceof Player) {
        if (Shield.isBlocking(target, entity)) {
          target.applyKnockback({ x: dir.x * this.blocking_knockback, z: dir.z * this.blocking_knockback }, this.blocking_knockback * 0.08);
          return;
        }
      }
      try {
        target.applyDamage(damage);
        target.applyKnockback({ x: dir.x * knockback, z: dir.z * knockback }, knockback * 0.08);
      } catch {
      }
    }, cooldown);
  }
  static chargeAttack(entity, target, cooldown, duration, range, damage, knockback) {
    this.enforceLookAt(entity, target);
    system.runTimeout(() => {
      if (!entity.isValid || !target.isValid) return;
      this.enforceLookAt(entity, target);
      const intervalId2 = system.runInterval(() => {
        if (!entity.isValid || !target.isValid) {
          system.clearRun(intervalId2);
          return;
        }
        this.enforceLookAt(entity, target);
        const dir = Vector.multiply(Vector.normalize(Vector.subtract(target.location, entity.location)), 0.7);
        entity.applyImpulse(dir);
        entity.dimension.getEntities({ location: entity.location, maxDistance: range, excludeFamilies: [Family.WanRedcaveRobot] }).forEach((nearbyEntity) => {
          if (!nearbyEntity.isValid) return;
          try {
            nearbyEntity.applyDamage(damage);
            nearbyEntity.applyKnockback({ x: dir.x * knockback, z: dir.z * knockback }, knockback * 0.08);
          } catch {
          }
        });
      }, 5);
      system.runTimeout(() => {
        system.clearRun(intervalId2);
        if (!entity.isValid || !target.isValid) return;
        entity.triggerEvent(this.choose_attack);
      }, duration);
    }, cooldown);
  }
  static jumpAttack(entity, target, cooldown, range, damage, knockback) {
    const pre_dir = calculatePreImpulse(entity.location, target.location);
    const pre_yaw = Math.atan2(pre_dir.x, -pre_dir.z) * (180 / Math.PI);
    entity.setRotation({ x: 0, y: pre_yaw });
    entity.applyImpulse(pre_dir);
    system.runTimeout(() => {
      if (!entity.isValid || !target.isValid) return;
      const velocity = calculateImpulse(entity.location, target.location);
      const yaw = Math.atan2(-velocity.x, velocity.z) * (180 / Math.PI);
      entity.applyImpulse(velocity);
      entity.setRotation({ x: 0, y: yaw });
      const tick = 2 * velocity.y / 0.08;
      system.runTimeout(() => {
        if (!entity.isValid) return;
        entity.triggerEvent(EntityEvent.WanRedcaveChooseAttack);
        entity.dimension.getPlayers({ location: entity.location, maxDistance: range }).forEach((ent) => {
          const dir = Vector.multiply(Vector.normalize(Vector.subtract(target.location, entity.location)), knockback);
          dir.y = 0;
          ent.applyDamage(damage);
          ent.applyKnockback(dir, 0.8);
        });
      }, tick);
    }, cooldown);
  }
  static laserAttack(entity, target, cooldown, range, damage, knockback, reset = false) {
    this.enforceLookAt(entity, target);
    system.runTimeout(() => {
      if (!entity.isValid || !target.isValid) return;
      if (Vector.distanceSqr(entity.location, target.location) > range || !this.hasLineOfSight(entity, target)) {
        entity.triggerEvent(this.choose_attack);
        return;
      }
      this.enforceLookAt(entity, target);
      const distance = Vector.subtract(target.location, entity.location);
      const pitch = (180 + Math.asin(distance.y / Vector.magnitude(distance)) * (180 / Math.PI)) % 360;
      let length = Vector.magnitude(distance) * 18;
      if (length > this.max_laser_lenght)
        length = this.max_laser_lenght;
      entity.setProperty(EntityProperty.WanRedcaveLaserLength, length);
      entity.setProperty(EntityProperty.WanRedcaveLaserPitch, pitch);
      const dir = Vector.normalize(distance);
      if (target instanceof Player) {
        if (Shield.isBlocking(target, entity)) {
          return;
        }
      }
      try {
        target.applyDamage(damage);
        target.applyKnockback({ x: dir.x * knockback, z: dir.z * knockback }, knockback * 0.08);
      } catch {
      }
      if (!reset) return;
      system.runTimeout(() => {
        if (!entity.isValid) return;
        const pitch2 = (180 + Math.asin(distance.y / Vector.magnitude(distance)) * (180 / Math.PI)) % 360;
        entity.setProperty(EntityProperty.WanRedcaveLaserLength, 0);
        entity.setProperty(EntityProperty.WanRedcaveLaserPitch, pitch2);
        if (!target.isValid) return;
        this.enforceLookAt(entity, target);
      }, 3);
    }, cooldown);
  }
  static enforceLookAt(entity, target) {
    const pre_dir = Vector.subtract(target.location, entity.location);
    const pre_yaw = Math.atan2(-pre_dir.x, pre_dir.z) * (180 / Math.PI);
    entity.setRotation({ x: 0, y: pre_yaw });
  }
  static hasLineOfSight(entity, target) {
    const from = Vector.add(entity.location, { x: 0, y: 1.5, z: 0 });
    const to = Vector.add(target.location, { x: 0, y: 1.5, z: 0 });
    const ray = entity.dimension.getBlockFromRay(from, Vector.subtract(to, from), {
      maxDistance: Vector.magnitude(Vector.subtract(to, from)),
      includePassableBlocks: false,
      includeLiquidBlocks: false
    });
    return ray == null;
  }
  static withValidTarget(entity, callback) {
    if (!entity.isValid) return;
    (async () => {
      var _a2;
      const target = await this.getTarget(entity);
      if (!entity.isValid) return;
      if (target) {
        callback(entity, target);
      } else {
        if (((_a2 = entity.getComponent(EntityComponentTypes.MarkVariant)) == null ? void 0 : _a2.value) === 2) return;
        entity.triggerEvent(this.choose_attack);
      }
    })();
  }
  static getTarget(entity) {
    let resolved = false;
    return new Promise((resolve) => {
      entity.triggerEvent(EntityEvent.WanRedcaveGetTarget);
      const ev = system.afterEvents.scriptEventReceive.subscribe((data) => {
        if (data.id === "wan_redcave:get_target") {
          resolved = true;
          system.afterEvents.scriptEventReceive.unsubscribe(ev);
          resolve(data.sourceEntity);
          return;
        }
      });
      system.runTimeout(() => {
        system.afterEvents.scriptEventReceive.unsubscribe(ev);
        if (!resolved) resolve(null);
      }, 20);
    });
  }
}
__publicField(BaseEntityEngine, "choose_attack", EntityEvent.WanRedcaveChooseAttack);
__publicField(BaseEntityEngine, "blocking_knockback", 1);
__publicField(BaseEntityEngine, "max_laser_lenght", 500);
class BaseRobotEngine extends BaseEntityEngine {
  static checkHome(entity) {
    HomeManager.checkHome(entity, this.homeConfig);
  }
  static searchForHome(entity) {
    HomeManager.searchForHome(entity, this.homeConfig);
  }
  static removeHome(entity) {
    HomeManager.removeHome(entity, this.homeConfig);
  }
  static setHome(entity, block) {
    HomeManager.setHome(entity, block, this.homeConfig);
  }
  static off(entity) {
    entity.clearVelocity();
    entity.applyImpulse({ x: 0, y: -1, z: 0 });
  }
}
__publicField(BaseRobotEngine, "homeConfig");
function calculatePreImpulse(A, B) {
  const dx = B.x - A.x;
  const dz = B.z - A.z;
  const distance = Math.sqrt(dx * dx + dz * dz);
  const vx = -(dx / distance);
  const vz = -(dz / distance);
  return { x: vx, y: 0.2, z: vz };
}
function calculateImpulse(A, B) {
  const dx = B.x - A.x;
  const dy = B.y - A.y;
  const dz = B.z - A.z;
  const vx = dx / 7;
  const vz = dz / 7;
  const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
  const dy2 = dy > 0 ? dy : 0;
  const vy = (dy2 + 0.375 * distance) / 7;
  return { x: vx, y: vy, z: vz };
}
const _RedstoneCrawler = class _RedstoneCrawler extends BaseEntity {
  onCommandReceived(entity, command, message, initiator) {
    if (command == _RedstoneCrawler.identifier) {
      switch (message) {
        case ScriptEventWanRedcaveRedstoneCrawlerMessages.Bite:
          RedstoneCrawlerEngine.bite(entity);
          break;
        case ScriptEventWanRedcaveRedstoneCrawlerMessages.Jump:
          RedstoneCrawlerEngine.jump(entity);
          break;
        case ScriptEventWanRedcaveRedstoneCrawlerMessages.Off:
          RedstoneCrawlerEngine.off(entity);
          break;
      }
    }
  }
  onSpawn(entity) {
    if (!entity.isValid) return;
    RedstoneCrawlerEngine.searchForHome(entity);
  }
  onPlayerInteract(entity, player, beforeItemStack, itemStack) {
    var _a2;
    if (!player.isSneaking) return;
    if (((_a2 = entity.getComponent(EntityComponentTypes.Variant)) == null ? void 0 : _a2.value) == 7) {
      system.run(() => {
        entity.triggerEvent(EntityEvent.WanRedcaveUnsit);
      });
    } else {
      system.run(() => {
        entity.triggerEvent(EntityEvent.WanRedcaveSit);
      });
    }
  }
  onTick(entity) {
    if (!entity.isValid) return;
    if (system.currentTick % 100 <= 1 || RedstoneTyrantEngine.checkHomeNextTick)
      RedstoneCrawlerEngine.checkHome(entity);
    if (system.currentTick % 8 <= 1) {
      checkFoot(entity, EntityProperty.WanRedcaveDxFront, { x: 30, y: 0, z: -14 });
      checkFoot(entity, EntityProperty.WanRedcaveDxMid, { x: 34, y: 0, z: 11 });
      checkFoot(entity, EntityProperty.WanRedcaveDxBack, { x: 21, y: 0, z: 34 });
      checkFoot(entity, EntityProperty.WanRedcaveSxFront, { x: -30, y: 0, z: -14 });
      checkFoot(entity, EntityProperty.WanRedcaveSxMid, { x: -34, y: 0, z: 11 });
      checkFoot(entity, EntityProperty.WanRedcaveSxBack, { x: -21, y: 0, z: 34 });
    }
  }
};
__publicField(_RedstoneCrawler, "identifier", EntityType.WanRedcaveRedstoneCrawler);
let RedstoneCrawler = _RedstoneCrawler;
class RedstoneCrawlerEngine extends BaseRobotEngine {
  static bite(entity) {
    this.withValidTarget(entity, (entity2, target) => {
      entity2.triggerEvent(EntityEvent.WanRedcavePostBite);
      this.meleeAttack(entity2, target, this.bite_cooldown, this.bite_range, this.bite_damage, this.bite_knockback);
    });
  }
  static jump(entity) {
    this.withValidTarget(entity, (entity2, target) => {
      entity2.triggerEvent(EntityEvent.WanRedcavePostJump);
      this.jumpAttack(entity2, target, this.jump_cooldown, this.jump_range, this.jump_damage, this.jump_knockback);
    });
  }
}
__publicField(RedstoneCrawlerEngine, "bite_cooldown", 9);
__publicField(RedstoneCrawlerEngine, "bite_range", 16);
__publicField(RedstoneCrawlerEngine, "bite_damage", 6);
__publicField(RedstoneCrawlerEngine, "bite_knockback", 3);
__publicField(RedstoneCrawlerEngine, "jump_cooldown", 8);
__publicField(RedstoneCrawlerEngine, "jump_range", 8);
__publicField(RedstoneCrawlerEngine, "jump_damage", 8);
__publicField(RedstoneCrawlerEngine, "jump_knockback", 2);
__publicField(RedstoneCrawlerEngine, "homeConfig", {
  homeXProperty: EntityProperty.WanRedcaveHomeX,
  homeYProperty: EntityProperty.WanRedcaveHomeY,
  homeZProperty: EntityProperty.WanRedcaveHomeZ,
  hostileOnEvent: EntityEvent.WanRedcaveHostileOn,
  pacificOnEvent: EntityEvent.WanRedcavePacificOn,
  offEvent: EntityEvent.WanRedcaveOff,
  despawnEvent: EntityEvent.WanRedcaveDespawn,
  onPacificHomeFound: (entity, homeBlock) => {
    var _a2;
    const owner = HomeManager.getHomeOwner(homeBlock);
    if (owner) (_a2 = entity.getComponent(EntityComponentTypes.Tameable)) == null ? void 0 : _a2.tame(owner);
  }
});
function checkFoot(entity, id, pos) {
  const propertyValue = entity.getProperty(id);
  const current_y = typeof propertyValue === "number" ? propertyValue / 16 : 0;
  const block = entity.dimension.getBlock(Vector.add(Vector.add(entity.location, Vector.multiply(rotateY(pos, entity.getRotation().y), 1 / 16)), { x: 0, y: current_y, z: 0 }));
  if (block && block.typeId == MinecraftBlockTypes.Air) {
    const blockBelow = entity.dimension.getBlock(Vector.add(Vector.add(entity.location, Vector.multiply(rotateY(pos, entity.getRotation().y), 1 / 16)), { x: 0, y: current_y - 6 / 16, z: 0 }));
    if (blockBelow && blockBelow.typeId != MinecraftBlockTypes.Air) {
      return;
    }
    entity.setProperty(id, Math.max(current_y * 16 - 6, -24));
  }
  if (block && block.typeId != MinecraftBlockTypes.Air) {
    entity.setProperty(id, Math.min(current_y * 16 + 6, 24));
  }
}
function rotateY(point, angle) {
  const rad = angle * (Math.PI / 180);
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  return {
    x: -(point.x * cos - point.z * sin),
    y: point.y,
    z: -(point.x * sin + point.z * cos)
  };
}
const _RedstoneCreeer = class _RedstoneCreeer extends BaseEntity {
  onCommandReceived(entity, command, message, initiator) {
    if (command == _RedstoneCreeer.identifier) {
      switch (message) {
        case ScriptEventWanRedcaveRedstoneCreeperMessages.Melee:
          RedstoneHoundEngine$1.melee(entity);
          break;
      }
    }
  }
  onSpawn(entity) {
    if (!entity.isValid) return;
    RedstoneHoundEngine$1.searchForHome(entity);
  }
  onTick(entity) {
    if (!entity.isValid) return;
    if (system.currentTick % 100 <= 1 || RedstoneTyrantEngine.checkHomeNextTick) {
      RedstoneHoundEngine$1.checkHome(entity);
    }
  }
};
__publicField(_RedstoneCreeer, "identifier", EntityType.WanRedcaveRedstoneCreeper);
let RedstoneCreeer = _RedstoneCreeer;
let RedstoneHoundEngine$1 = (_a = class extends BaseRobotEngine {
  static melee(entity) {
    if (!entity.isValid) return;
    this.withValidTarget(entity, (entity2, target) => {
      this.meleeAttack(entity2, target, this.melee_cooldown, this.melee_range, this.melee_damage, this.melee_knockback);
    });
  }
}, __publicField(_a, "melee_cooldown", 12), // ticks
__publicField(_a, "melee_range", 16), __publicField(_a, "melee_damage", 5), __publicField(_a, "melee_knockback", 3), __publicField(_a, "homeConfig", {
  homeXProperty: EntityProperty.WanRedcaveHomeX,
  homeYProperty: EntityProperty.WanRedcaveHomeY,
  homeZProperty: EntityProperty.WanRedcaveHomeZ,
  hostileOnEvent: EntityEvent.WanRedcaveHostileOn,
  pacificOnEvent: EntityEvent.WanRedcavePacificOn,
  offEvent: EntityEvent.WanRedcaveOff,
  despawnEvent: EntityEvent.WanRedcaveDespawn
}), _a);
const _RedstoneHound = class _RedstoneHound extends BaseEntity {
  onCommandReceived(entity, command, message, initiator) {
    if (command == _RedstoneHound.identifier) {
      switch (message) {
        case ScriptEventWanRedcaveRedstoneHoundMessages.Bite:
          RedstoneHoundEngine.bite(entity);
          break;
        case ScriptEventWanRedcaveRedstoneHoundMessages.Saw:
          RedstoneHoundEngine.saw(entity);
          break;
        case ScriptEventWanRedcaveRedstoneHoundMessages.ShootLaser:
          RedstoneHoundEngine.shoot_laser(entity);
          break;
        case ScriptEventWanRedcaveRedstoneHoundMessages.Off:
          RedstoneHoundEngine.off(entity);
          break;
      }
    }
  }
  onSpawn(entity) {
    if (!entity.isValid) return;
    RedstoneHoundEngine.searchForHome(entity);
  }
  onPlayerInteract(entity, player, beforeItemStack, itemStack) {
    var _a2;
    if (!player.isSneaking) return;
    if (((_a2 = entity.getComponent(EntityComponentTypes.Variant)) == null ? void 0 : _a2.value) == 7) {
      system.run(() => {
        entity.triggerEvent(EntityEvent.WanRedcaveUnsit);
      });
    } else {
      system.run(() => {
        entity.triggerEvent(EntityEvent.WanRedcaveSit);
      });
    }
  }
  onTick(entity) {
    if (!entity.isValid) return;
    if (system.currentTick % 100 <= 1 || RedstoneTyrantEngine.checkHomeNextTick) {
      RedstoneHoundEngine.checkHome(entity);
    }
  }
};
__publicField(_RedstoneHound, "identifier", EntityType.WanRedcaveRedstoneHound);
let RedstoneHound = _RedstoneHound;
class RedstoneHoundEngine extends BaseRobotEngine {
  static bite(entity) {
    this.withValidTarget(entity, (entity2, target) => {
      entity2.triggerEvent(EntityEvent.WanRedcavePostBite);
      this.meleeAttack(entity2, target, this.bite_cooldown, this.bite_range, this.bite_damage, this.bite_knockback);
    });
  }
  static saw(entity) {
    this.withValidTarget(entity, (entity2, target) => {
      entity2.triggerEvent(EntityEvent.WanRedcavePostSaw);
      this.meleeAttack(entity2, target, this.saw_cooldown, this.saw_range, this.saw_damage, this.saw_knockback);
    });
  }
  static shoot_laser(entity) {
    this.withValidTarget(entity, (entity2, target) => {
      entity2.triggerEvent(EntityEvent.WanRedcavePostShootLaser);
      entity2.setProperty(EntityProperty.WanRedcaveLaserLength, 0);
      entity2.setProperty(EntityProperty.WanRedcaveLaserPitch, 180);
      this.laserAttack(entity2, target, this.laser_cooldown, this.laser_range, this.laser_damage, this.laser_knockback);
    });
  }
}
__publicField(RedstoneHoundEngine, "bite_cooldown", 9);
__publicField(RedstoneHoundEngine, "bite_range", 16);
__publicField(RedstoneHoundEngine, "bite_damage", 6);
__publicField(RedstoneHoundEngine, "bite_knockback", 3);
__publicField(RedstoneHoundEngine, "saw_cooldown", 6);
__publicField(RedstoneHoundEngine, "saw_range", 16);
__publicField(RedstoneHoundEngine, "saw_damage", 8);
__publicField(RedstoneHoundEngine, "saw_knockback", 1);
__publicField(RedstoneHoundEngine, "laser_cooldown", 8);
__publicField(RedstoneHoundEngine, "laser_range", 1024);
__publicField(RedstoneHoundEngine, "laser_damage", 4);
__publicField(RedstoneHoundEngine, "laser_knockback", 1);
__publicField(RedstoneHoundEngine, "homeConfig", {
  homeXProperty: EntityProperty.WanRedcaveHomeX,
  homeYProperty: EntityProperty.WanRedcaveHomeY,
  homeZProperty: EntityProperty.WanRedcaveHomeZ,
  hostileOnEvent: EntityEvent.WanRedcaveHostileOn,
  pacificOnEvent: EntityEvent.WanRedcavePacificOn,
  offEvent: EntityEvent.WanRedcaveOff,
  despawnEvent: EntityEvent.WanRedcaveDespawn,
  onPacificHomeFound: (entity, homeBlock) => {
    var _a2;
    const owner = HomeManager.getHomeOwner(homeBlock);
    if (owner) (_a2 = entity.getComponent(EntityComponentTypes.Tameable)) == null ? void 0 : _a2.tame(owner);
  }
});
const _RedstoneLongleg = class _RedstoneLongleg extends BaseEntity {
  onCommandReceived(entity, command, message, initiator) {
    if (command == _RedstoneLongleg.identifier) {
      switch (message) {
        case ScriptEventWanRedcaveRedstoneLonglegMessages.Charge:
          RedstoneLonglegEngine.charge(entity);
          break;
        case ScriptEventWanRedcaveRedstoneLonglegMessages.Off:
          RedstoneLonglegEngine.off(entity);
          break;
      }
    }
  }
  onSpawn(entity) {
    if (!entity.isValid) return;
    RedstoneLonglegEngine.searchForHome(entity);
  }
  onTick(entity) {
    if (!entity.isValid) return;
    if (system.currentTick % 100 <= 1 || RedstoneTyrantEngine.checkHomeNextTick) {
      RedstoneLonglegEngine.checkHome(entity);
    }
  }
};
__publicField(_RedstoneLongleg, "identifier", EntityType.WanRedcaveRedstoneLongleg);
let RedstoneLongleg = _RedstoneLongleg;
class RedstoneLonglegEngine extends BaseRobotEngine {
  static charge(entity) {
    this.withValidTarget(entity, (entity2, target) => {
      entity2.triggerEvent(EntityEvent.WanRedcavePostCharge);
      this.chargeAttack(entity2, target, this.charge_cooldown, this.charge_duration, this.charge_range, this.charge_damage, this.charge_knockback);
    });
  }
}
__publicField(RedstoneLonglegEngine, "charge_cooldown", 26);
__publicField(RedstoneLonglegEngine, "charge_duration", 40);
__publicField(RedstoneLonglegEngine, "charge_range", 3);
__publicField(RedstoneLonglegEngine, "charge_damage", 4);
__publicField(RedstoneLonglegEngine, "charge_knockback", 5);
__publicField(RedstoneLonglegEngine, "homeConfig", {
  homeXProperty: EntityProperty.WanRedcaveHomeX,
  homeYProperty: EntityProperty.WanRedcaveHomeY,
  homeZProperty: EntityProperty.WanRedcaveHomeZ,
  hostileOnEvent: EntityEvent.WanRedcaveHostileOn,
  pacificOnEvent: EntityEvent.WanRedcavePacificOn,
  offEvent: EntityEvent.WanRedcaveOff,
  despawnEvent: EntityEvent.WanRedcaveDespawn
});
const _RedstoneWing = class _RedstoneWing extends BaseEntity {
  onCommandReceived(entity, command, message, initiator) {
    if (command == _RedstoneWing.identifier) {
      switch (message) {
        case ScriptEventWanRedcaveRedstoneWingMessages.Shoot:
          RedstoneWingEngine.shoot(entity);
          break;
        case ScriptEventWanRedcaveRedstoneWingMessages.Laser:
          RedstoneWingEngine.laser(entity);
          break;
        case ScriptEventWanRedcaveRedstoneWingMessages.Off:
          RedstoneWingEngine.off(entity);
          break;
      }
    }
  }
  onSpawn(entity) {
    if (!entity.isValid) return;
    RedstoneWingEngine.searchForHome(entity);
  }
  onTick(entity) {
    if (!entity.isValid) return;
    if (system.currentTick % 100 <= 1 || RedstoneTyrantEngine.checkHomeNextTick) {
      RedstoneWingEngine.checkHome(entity);
    }
  }
};
__publicField(_RedstoneWing, "identifier", EntityType.WanRedcaveRedstoneWing);
let RedstoneWing = _RedstoneWing;
class RedstoneWingEngine extends BaseRobotEngine {
  static shoot(entity) {
    this.withValidTarget(entity, (entity2, target) => {
      entity2.triggerEvent(EntityEvent.WanRedcavePostShoot);
      const dir = Vector.multiply(Vector.normalize(Vector.subtract(target.location, entity2.location)), 0.5);
      entity2.applyImpulse(dir);
      this.meleeAttack(entity2, target, this.shoot_cooldown, this.shoot_range, this.shoot_damage, this.shoot_knockback);
    });
  }
  static laser(entity) {
    entity.setProperty(EntityProperty.WanRedcaveLaserLength, 0);
    this.withValidTarget(entity, (entity2, target) => {
      this.enforceLookAt(entity2, target);
      system.runTimeout(() => {
        if (!entity2.isValid || !target.isValid) return;
        entity2.triggerEvent(EntityEvent.WanRedcavePostLaser);
        const distance = Vector.subtract(target.location, entity2.location);
        entity2.setProperty(EntityProperty.WanRedcaveLaserLength, 0);
        entity2.setProperty(EntityProperty.WanRedcaveLaserPitch, (180 + Math.asin(distance.y / Vector.magnitude(distance)) * (180 / Math.PI)) % 360);
        this.laserAttack(entity2, target, this.shoot_cooldown, this.laser_range, this.laser_damage, this.laser_knockback, true);
        system.runTimeout(() => {
          if (!entity2.isValid || !target.isValid) return;
          this.enforceLookAt(entity2, target);
        }, this.shoot_cooldown / 2);
      }, 20);
    });
  }
}
__publicField(RedstoneWingEngine, "shoot_cooldown", 5);
__publicField(RedstoneWingEngine, "shoot_range", 25);
__publicField(RedstoneWingEngine, "shoot_damage", 5);
__publicField(RedstoneWingEngine, "shoot_knockback", 2);
__publicField(RedstoneWingEngine, "laser_range", 1024);
__publicField(RedstoneWingEngine, "laser_damage", 2);
__publicField(RedstoneWingEngine, "laser_knockback", 1);
__publicField(RedstoneWingEngine, "homeConfig", {
  homeXProperty: EntityProperty.WanRedcaveHomeX,
  homeYProperty: EntityProperty.WanRedcaveHomeY,
  homeZProperty: EntityProperty.WanRedcaveHomeZ,
  hostileOnEvent: EntityEvent.WanRedcaveHostileOn,
  pacificOnEvent: EntityEvent.WanRedcavePacificOn,
  offEvent: EntityEvent.WanRedcaveOff,
  despawnEvent: EntityEvent.WanRedcaveDespawn,
  useKillForDespawn: true
});
const _FlyingDrone = class _FlyingDrone extends BaseEntity {
  onCommandReceived(entity, command, message, initiator) {
    if (command == _FlyingDrone.identifier) {
      switch (message) {
        case ScriptEventWanRedcaveFlyingDroneMessages.Off:
          FlyingDroneEngine.off(entity);
          break;
      }
    }
  }
  onSpawn(entity) {
    if (!entity.isValid) return;
    entity.nameTag = "§bFlying Drone";
    FlyingDroneEngine.searchForHome(entity);
  }
  onPlayerInteract(entity, player, beforeItemStack, itemStack) {
    var _a2;
    if (!player.isSneaking) return;
    if (((_a2 = entity.getComponent(EntityComponentTypes.Variant)) == null ? void 0 : _a2.value) == 6) {
      system.run(() => {
        entity.triggerEvent(EntityEvent.WanRedcaveUnsit);
      });
    } else {
      system.run(() => {
        entity.triggerEvent(EntityEvent.WanRedcaveSit);
      });
    }
  }
  onTick(entity) {
    if (!entity.isValid) return;
    if (system.currentTick % 100 <= 1)
      FlyingDroneEngine.checkHome(entity);
    if (system.currentTick % 5 <= 1) {
      const v = entity.getComponent(EntityComponentTypes.MarkVariant);
      if ((v == null ? void 0 : v.value) == 2)
        entity.applyImpulse({ x: 0, y: -0.5, z: 0 });
      else {
        const v2 = entity.getComponent(EntityComponentTypes.Variant);
        if ((v2 == null ? void 0 : v2.value) == 6)
          entity.applyImpulse({ x: 0, y: -0.5, z: 0 });
      }
    }
  }
};
__publicField(_FlyingDrone, "identifier", EntityType.WanRedcaveFlyingDrone);
let FlyingDrone = _FlyingDrone;
class FlyingDroneEngine extends BaseRobotEngine {
}
__publicField(FlyingDroneEngine, "homeConfig", {
  homeXProperty: EntityProperty.WanRedcaveHomeX,
  homeYProperty: EntityProperty.WanRedcaveHomeY,
  homeZProperty: EntityProperty.WanRedcaveHomeZ,
  hostileOnEvent: "",
  // Not used
  pacificOnEvent: EntityEvent.WanRedcavePacificOn,
  offEvent: EntityEvent.WanRedcaveOff,
  despawnEvent: "",
  // Not used
  hasHostileMode: false,
  pacificForAllMarks: true,
  onPacificHomeFound: (entity, homeBlock) => {
    var _a2;
    const owner = HomeManager.getHomeOwner(homeBlock);
    if (owner) (_a2 = entity.getComponent(EntityComponentTypes.Tameable)) == null ? void 0 : _a2.tame(owner);
  }
});
class LittleTyrant extends BaseEntity {
  onSpawn(entity) {
    if (!entity.isValid) return;
    LittleTyrantEngine.searchForHome(entity);
  }
  onPlayerInteract(entity, player, beforeItemStack, itemStack) {
    var _a2;
    if (((_a2 = entity.getComponent(EntityComponentTypes.Variant)) == null ? void 0 : _a2.value) == 6) {
      system.run(() => {
        entity.triggerEvent(EntityEvent.WanRedcaveUnsit);
      });
    } else {
      if (!player.isSneaking) return;
      system.run(() => {
        entity.triggerEvent(EntityEvent.WanRedcaveSit);
      });
    }
  }
  /** @todo */
  //override onHitByEntity(entity: Entity, attacker: Entity): void {
  //	if(!entity.isValid || !attacker.isValid) return;
  //	LittleTyrantEngine.shoot(entity, attacker);
  //}
  onTick(entity) {
    if (!entity.isValid) return;
    if (system.currentTick % 100 <= 1) {
      LittleTyrantEngine.checkHome(entity);
    }
  }
}
__publicField(LittleTyrant, "identifier", EntityType.WanRedcaveLittleTyrant);
class LittleTyrantEngine extends BaseRobotEngine {
  static shoot(entity, attacker) {
    var _a2, _b;
    if (attacker.typeId == MinecraftEntityTypes.Player) {
      if (((_a2 = attacker.getComponent(EntityComponentTypes.Riding)) == null ? void 0 : _a2.entityRidingOn) == entity) {
        if (((_b = entity.getComponent(EntityComponentTypes.Variant)) == null ? void 0 : _b.value) == 3) return;
        entity.triggerEvent(EntityEvent.WanRedcaveShooting);
        system.runTimeout(() => {
          if (!entity.isValid || !attacker.isValid) return;
          this.throwProjectile(entity, attacker);
        }, 24);
        system.runTimeout(() => {
          if (!entity.isValid || !attacker.isValid) return;
          this.throwProjectile(entity, attacker);
        }, 31);
        system.runTimeout(() => {
          if (!entity.isValid || !attacker.isValid) return;
          this.throwProjectile(entity, attacker);
        }, 36);
        system.runTimeout(() => {
          if (!entity.isValid || !attacker.isValid) return;
          this.throwProjectile(entity, attacker);
        }, 43);
        system.runTimeout(() => {
          if (!entity.isValid || !attacker.isValid) return;
          this.throwProjectile(entity, attacker);
        }, 49);
        system.runTimeout(() => {
          if (!entity.isValid || !attacker.isValid) return;
          this.throwProjectile(entity, attacker);
        }, 56);
        system.runTimeout(() => {
          if (!entity.isValid || !attacker.isValid) return;
          this.throwProjectile(entity, attacker);
        }, 63);
      }
    }
  }
  static throwProjectile(entity, player) {
    var _a2;
    const yaw = entity.getRotation().y * (Math.PI / 180);
    const ownerOffset = { x: 0, y: 2.5, z: 4 };
    const projectile = EntityType.WanRedcaveFireballSpit;
    const rotatedOffset = {
      x: ownerOffset.x * Math.cos(yaw) - ownerOffset.z * Math.sin(yaw),
      y: ownerOffset.y,
      z: ownerOffset.x * Math.sin(yaw) + ownerOffset.z * Math.cos(yaw)
    };
    const dir = {
      x: player.getViewDirection().x,
      y: player.getViewDirection().y,
      z: player.getViewDirection().z
    };
    const from = Vector.add(entity.location, rotatedOffset);
    const projectileEntity = entity.dimension.spawnEntity(projectile, from);
    (_a2 = projectileEntity.getComponent(EntityComponentTypes.Projectile)) == null ? void 0 : _a2.shoot(Vector.multiply(dir, 2.5), {
      uncertainty: 0
    });
    this.enforceLookAt(entity, player);
  }
}
__publicField(LittleTyrantEngine, "homeConfig", {
  homeXProperty: EntityProperty.WanRedcaveHomeX,
  homeYProperty: EntityProperty.WanRedcaveHomeY,
  homeZProperty: EntityProperty.WanRedcaveHomeZ,
  hostileOnEvent: "",
  // Not used
  pacificOnEvent: EntityEvent.WanRedcavePacificOn,
  offEvent: EntityEvent.WanRedcaveOff,
  despawnEvent: "",
  // Not used
  hasHostileMode: false,
  pacificForAllMarks: true,
  onPacificHomeFound: (entity, homeBlock) => {
    var _a2;
    const owner = HomeManager.getHomeOwner(homeBlock);
    if (owner) (_a2 = entity.getComponent(EntityComponentTypes.Tameable)) == null ? void 0 : _a2.tame(owner);
  }
});
__publicField(LittleTyrantEngine, "FIREBALL_PASS", []);
registerEntities([
  FireballSpit,
  RedstoneCrawler,
  RedstoneCreeer,
  RedstoneHound,
  RedstoneLongleg,
  RedstoneTyrant,
  RedstoneWing,
  FlyingDrone,
  LittleTyrant
]);
const _TechSword = class _TechSword extends BaseItem {
  onUse(event) {
    if (event.itemStack.typeId == _TechSword.identifier[0])
      TechSwordEngine.handleTechSwordT1Use(event);
    else
      TechSwordEngine.handleTechSwordT2Use(event);
  }
  onEquip(player, equipmentSlot, itemStack) {
    TechSwordEngine.handleTechSwordEquip(player, itemStack);
  }
  onUnequip(player, equipmentSlot) {
    TechSwordEngine.handleTechSwordUnequip(player);
  }
};
__publicField(_TechSword, "identifier", [ItemType.WanRedcaveTechSwordT1, ItemType.WanRedcaveTechSwordT2]);
let TechSword = _TechSword;
const _TechSwordEngine = class _TechSwordEngine {
  /**
      * Handles the slash (shockwave) by advancing a virtual point over time.
      * @param player - The player using the sword.
      */
  static spawnSlashEffect(player) {
    const dir = player.getViewDirection();
    const dimension = player.dimension;
    let currentLocation = player.getHeadLocation();
    let currentDistance = 0;
    const hitEntities = /* @__PURE__ */ new Map();
    const intervalId2 = system.runInterval(() => {
      if (currentDistance >= this.slashDistance) {
        system.clearRun(intervalId2);
        return;
      }
      currentLocation = Vector.add(currentLocation, Vector.multiply(dir, this.slashVelocity));
      currentDistance += this.slashVelocity;
      dimension.spawnParticle(this.wardenParticle, currentLocation);
      const entitiesToHit = dimension.getEntities({ location: currentLocation, maxDistance: this.slashRadius, excludeTypes: [player.typeId, "minecraft:item"] });
      for (const entity of entitiesToHit) {
        if (!hitEntities.has(entity.id)) {
          entity.applyDamage(this.slashDamage, { damagingEntity: player, cause: EntityDamageCause.magic });
          hitEntities.set(entity.id, true);
        }
      }
    }, 1);
  }
  /**
      * Handles the charging logic and HUD update. Called externally every tick by the central loop.
      * @param player - The player holding the item.
      * @param itemStack - The item stack held.
      */
  static updateTechSword(player, itemStack) {
    const powered = Utility.isItemPowered(itemStack);
    let currentCharge = player.getDynamicProperty(this.chargeProperty) ?? 0;
    if (powered && currentCharge < this.chargeTimeTicks) {
      currentCharge = Math.min(this.chargeTimeTicks, currentCharge + 1);
      player.setDynamicProperty(this.chargeProperty, currentCharge);
    } else if (!powered) {
      player.setDynamicProperty(this.chargeProperty, 0);
    }
    const hudBarData = { ...this.actionbarDataBase, current: currentCharge };
    player.onScreenDisplay.setActionBar(createActionBar("Tech Sword", "Charge", powered, hudBarData));
  }
  /**
      * Logic for TechSword.onUse event.
      */
  static handleTechSwordT1Use(event) {
    const itemStack = event.itemStack;
    const player = event.source;
    const powered = Utility.isItemPowered(itemStack);
    const currentCharge = player.getDynamicProperty(this.chargeProperty) ?? 0;
    if (!powered) {
      const hudBarData = { ...this.actionbarDataBase, current: 0 };
      player.onScreenDisplay.setActionBar(createActionBar(
        "Tech Sword",
        "Charge",
        false,
        hudBarData
      ));
      return;
    }
    if (currentCharge >= this.chargeTimeTicks) {
      this.spawnSlashEffect(player);
      player.setDynamicProperty(this.chargeProperty, 0);
      this.updateTechSword(player, itemStack);
    }
  }
  static handleTechSwordT2Use(event) {
    const player = event.source;
    this.spawnSlashEffect(player);
  }
  /**
      * Logic for TechSword.onEquip event.
      */
  static handleTechSwordEquip(player, itemStack) {
    player.setDynamicProperty(this.chargeProperty, 0);
    player.setDynamicProperty(ACTIVE_HUD_ITEM_ID_PROPERTY, itemStack.typeId);
  }
  /**
      * Logic for TechSword.onUnequip event.
      */
  static handleTechSwordUnequip(player) {
    player.onScreenDisplay.setActionBar("");
    player.setDynamicProperty(this.chargeProperty, void 0);
    player.setDynamicProperty(ACTIVE_HUD_ITEM_ID_PROPERTY, void 0);
  }
};
// --- Configuration ---
__publicField(_TechSwordEngine, "slashDamage", 10);
__publicField(_TechSwordEngine, "slashDistance", 10);
__publicField(_TechSwordEngine, "slashVelocity", 1.5);
__publicField(_TechSwordEngine, "slashRadius", 2.5);
__publicField(_TechSwordEngine, "wardenParticle", "minecraft:sonic_explosion");
__publicField(_TechSwordEngine, "chargeTimeTicks", secondsToTicks(5));
__publicField(_TechSwordEngine, "chargeProperty", "wan_redcave:tech_sword_charge");
__publicField(_TechSwordEngine, "actionbarDataBase", {
  max: _TechSwordEngine.chargeTimeTicks,
  width: 10,
  readyColor: "§b",
  // Cyan for ready
  chargingColor: "§6",
  // Gold for charging
  emptyColor: "§8"
  // Dark Gray for empty
});
let TechSwordEngine = _TechSwordEngine;
const ACTIVE_HUD_ITEM_ID_PROPERTY = "wan_redcave:active_hud_item_id";
const DRILL_DATA_BASE = {
  max: 100,
  width: 10,
  readyColor: "§6",
  // Full Heat
  chargingColor: "§6",
  // Gold for charging
  emptyColor: "§8"
  // Dark Gray for empty
};
function createActionBar(itemName, barLabel, isPowered, bar, optionalModeName) {
  const BAR_SYMBOL = "█";
  const clamped = Math.max(0, Math.min(bar.current, bar.max));
  const frac = clamped / bar.max;
  const filled = Math.round(frac * bar.width);
  const empty = bar.width - filled;
  const percentage = Math.floor(frac * 100).toString().padStart(3, "0");
  const powerStatus = isPowered ? "§aON" : "§cOFF";
  const barColor = bar.current >= bar.max ? bar.readyColor : bar.chargingColor;
  const line1 = `§7${itemName} Status:§r ${powerStatus}`;
  const chargeBar = `${barColor}${BAR_SYMBOL.repeat(filled)}${bar.emptyColor}${BAR_SYMBOL.repeat(empty)} §7${percentage}%`;
  const line2 = `${barLabel}: ${chargeBar}`;
  const modeLine = optionalModeName ? `
Mode: §f${optionalModeName}` : "";
  if (!isPowered) {
    return `§7${itemName} Status:§r §cOFF`;
  }
  return `${line1}
${line2}${modeLine}`;
}
function startGlobalHUDLoop(tickFrequency) {
  system.runInterval(() => {
    for (const player of world.getPlayers()) {
      const activeItemId = player.getDynamicProperty(ACTIVE_HUD_ITEM_ID_PROPERTY);
      if (!activeItemId) {
        continue;
      }
      const equip = player.getComponent("minecraft:equippable");
      const mainhandItem = equip == null ? void 0 : equip.getEquipment(EquipmentSlot.Mainhand);
      if (!mainhandItem || mainhandItem.typeId !== activeItemId) {
        player.onScreenDisplay.setActionBar("");
        player.setDynamicProperty(ACTIVE_HUD_ITEM_ID_PROPERTY, void 0);
        continue;
      }
      switch (activeItemId) {
        case ItemType.WanRedcaveTechSwordT1:
        case ItemType.WanRedcaveTechSwordT2:
          TechSwordEngine.updateTechSword(player, mainhandItem);
          break;
        default:
          player.onScreenDisplay.setActionBar("");
          player.setDynamicProperty(ACTIVE_HUD_ITEM_ID_PROPERTY, void 0);
          break;
      }
    }
  }, tickFrequency);
}
const BLASTER_DATA_BASE = {
  max: 100,
  width: 10,
  readyColor: "§6",
  // Full Heat
  chargingColor: "§6",
  // Gold for charging
  emptyColor: "§8"
  // Dark Gray for empty
};
system.runInterval(() => {
  var _a2;
  for (const player of world.getPlayers()) {
    BlasterEngine.coolDown(player, ItemType.WanRedcaveBlasterT1);
    BlasterEngine.coolDown(player, ItemType.WanRedcaveBlasterOnT2);
    const item = (_a2 = player.getComponent("minecraft:equippable")) == null ? void 0 : _a2.getEquipment(EquipmentSlot.Mainhand);
    if (item && (item.typeId == ItemType.WanRedcaveBlasterT1 || item.typeId == ItemType.WanRedcaveBlasterOnT2 || item.typeId == ItemType.WanRedcaveBlasterOffT2)) {
      BlasterEngine.displayOverheat(player, item);
      if (player.wan_redcave_animation == true) continue;
      player.wan_redcave_animation = true;
      player.playAnimation("animation.wan_redcave.blaster.script.hold");
    } else {
      if (player.wan_redcave_animation == false) continue;
      player.wan_redcave_animation = false;
      player.playAnimation("animation.humanoid.bob");
    }
  }
});
const intervalId = /* @__PURE__ */ new Map();
class BlasterT1 extends BaseItem {
  onUse(event, equipmentSlot) {
    const powered = Utility.isItemPowered(event.itemStack);
    if (!powered) return;
    const heat = event.source.getDynamicProperty(`${event.itemStack.typeId}heat`) ?? 0;
    const overheated = event.source.getDynamicProperty(`${event.itemStack.typeId}overheated`) ?? false;
    const isInCooldown = event.source.getItemCooldown("wan_redcave:basic_blaster");
    if (isInCooldown) return;
    const exponentialFactor = 1.06;
    const newHeat = Math.min((heat + 5) ** exponentialFactor, 105);
    event.source.setDynamicProperty(`${event.itemStack.typeId}heat`, Math.min(newHeat, 105));
    if (overheated || newHeat >= 100) {
      event.source.setDynamicProperty(`${event.itemStack.typeId}overheated`, true);
      return;
    }
    event.source.startItemCooldown("wan_redcave:blaster_tier1", 10);
    BlasterEngine.shoot(event.source);
  }
}
__publicField(BlasterT1, "identifier", ItemType.WanRedcaveBlasterT1);
class BlasterT2 extends BaseItem {
  onStartUse(event, equipmentSlot) {
    function use() {
      const powered = Utility.isItemPowered(event.itemStack);
      if (!powered) return system.clearRun(id);
      const heat = event.source.getDynamicProperty(`${event.itemStack.typeId}heat`) ?? 0;
      const exponentialFactor = 1.03;
      const newHeat = Math.min((heat + 5) ** exponentialFactor, 105);
      event.source.setDynamicProperty(`${event.itemStack.typeId}heat`, Math.min(newHeat, 105));
      const overheated = event.source.getDynamicProperty(`${event.itemStack.typeId}overheated`) ?? false;
      if (overheated || heat >= 100) {
        event.source.startItemCooldown("wan_redcave:blaster_tier2", 6 * 20);
        event.source.setDynamicProperty(`${event.itemStack.typeId}overheated`, true);
        system.clearRun(id);
        return;
      }
      BlasterEngine.holdShoot(event.source, 7);
    }
    const id = system.runInterval(() => {
      use();
    }, 10);
    use();
    intervalId.set(event.source.id, id);
  }
  onStopUse(event, equipmentSlot) {
    const id = intervalId.get(event.source.id);
    if (id) system.clearRun(id);
  }
}
__publicField(BlasterT2, "identifier", [ItemType.WanRedcaveBlasterOnT2, ItemType.WanRedcaveBlasterOffT2]);
class BlasterEngine {
  static shoot(player, strength = 2.5) {
    const dir = player.getViewDirection();
    const loc = Vector.add(player.getHeadLocation(), Vector.multiply(dir, 2));
    const proj = player.dimension.spawnEntity(EntityType.WanRedcaveLaserProjectile, loc);
    proj.applyImpulse(Vector.multiply(dir, strength));
  }
  static holdShoot(player, damage) {
    var _a2;
    const entity = (_a2 = player.getEntitiesFromViewDirection({ maxDistance: 10 })[0]) == null ? void 0 : _a2.entity;
    if (!entity) return;
    entity.applyDamage(damage, { damagingEntity: player, cause: EntityDamageCause.magic });
  }
  static displayOverheat(player, itemStack) {
    const heat = player.getDynamicProperty(`${itemStack.typeId}heat`) ?? 0;
    const powered = Utility.isItemPowered(itemStack);
    const hudBarData = { ...BLASTER_DATA_BASE, current: heat };
    player.onScreenDisplay.setActionBar(createActionBar(
      "Blaster",
      "Heat",
      powered,
      hudBarData
    ));
  }
  static coolDown(player, itemId) {
    let heat = player.getDynamicProperty(`${itemId}heat`) ?? 0;
    const overheated = player.getDynamicProperty(`${itemId}overheated`) ?? false;
    if (overheated && heat <= 50) {
      player.setDynamicProperty(`${itemId}overheated`, false);
    }
    if (heat > 0) {
      heat = Math.max(0, heat - 0.25);
      if (overheated) heat -= 0.4;
      player.setDynamicProperty(`${itemId}heat`, heat);
    }
  }
}
const DRILL_CONFIGS = {
  "wan_redcave:electric_drill_t1": {
    availableModes: [0, 2],
    maxEnergy: 1e3,
    mineableCategories: ["ores", "deepslateOres", "stone", "stoneVariants", "basicNether", "basicEnd"]
  },
  "wan_redcave:electric_drill_t2": {
    availableModes: [0, 1, 2, 3],
    maxEnergy: 1e3,
    mineableCategories: "all"
  }
};
const DRILL_MODE_TYPES = [
  {
    name: "1x1 §8(Single Block)",
    heat: 5
  },
  {
    name: "1x3x5 §8(Tunnel)",
    heat: 13
  },
  {
    name: "3x3 §8(Cube)",
    heat: 11
  },
  {
    name: "5x5 §8(Large Cube)",
    heat: 17
  }
];
const MINEABLE_BLOCKS = {
  ores: [
    MinecraftBlockTypes.CoalOre,
    MinecraftBlockTypes.IronOre,
    MinecraftBlockTypes.GoldOre,
    MinecraftBlockTypes.DiamondOre,
    MinecraftBlockTypes.EmeraldOre,
    MinecraftBlockTypes.RedstoneOre,
    MinecraftBlockTypes.LapisOre,
    MinecraftBlockTypes.CopperOre,
    MinecraftBlockTypes.QuartzOre,
    MinecraftBlockTypes.NetherGoldOre
  ],
  // Deepslate variants of Overworld ores
  deepslateOres: [
    MinecraftBlockTypes.DeepslateCoalOre,
    MinecraftBlockTypes.DeepslateIronOre,
    MinecraftBlockTypes.DeepslateGoldOre,
    MinecraftBlockTypes.DeepslateDiamondOre,
    MinecraftBlockTypes.DeepslateEmeraldOre,
    MinecraftBlockTypes.DeepslateRedstoneOre,
    MinecraftBlockTypes.DeepslateLapisOre,
    MinecraftBlockTypes.DeepslateCopperOre
  ],
  // Standard underground stone blocks
  stone: [
    MinecraftBlockTypes.Stone,
    MinecraftBlockTypes.Cobblestone,
    MinecraftBlockTypes.Deepslate,
    MinecraftBlockTypes.CobbledDeepslate,
    MinecraftBlockTypes.SmoothStone,
    MinecraftBlockTypes.InfestedStone,
    MinecraftBlockTypes.InfestedCobblestone,
    MinecraftBlockTypes.InfestedDeepslate
  ],
  // Stone variants found underground
  stoneVariants: [
    MinecraftBlockTypes.Granite,
    MinecraftBlockTypes.Diorite,
    MinecraftBlockTypes.Andesite,
    MinecraftBlockTypes.PolishedGranite,
    MinecraftBlockTypes.PolishedDiorite,
    MinecraftBlockTypes.PolishedAndesite,
    MinecraftBlockTypes.Tuff,
    MinecraftBlockTypes.Calcite,
    MinecraftBlockTypes.DripstoneBlock
  ],
  // Basic block of the Nether dimension
  basicNether: [
    MinecraftBlockTypes.Netherrack
  ],
  // Basic block of the End dimension
  basicEnd: [
    MinecraftBlockTypes.EndStone
  ]
};
class DrillModeManager {
  static getDrillMaxEnergy(drillTypeId) {
    var _a2;
    return ((_a2 = DRILL_CONFIGS[drillTypeId]) == null ? void 0 : _a2.maxEnergy) || 1e3;
  }
  static getAvailableModes(drillTypeId) {
    var _a2;
    return ((_a2 = DRILL_CONFIGS[drillTypeId]) == null ? void 0 : _a2.availableModes) || [];
  }
  static getDrillModeProperty(drillTypeId) {
    return `drill:mode:${drillTypeId}`;
  }
  static getCurrentMode(player, drillTypeId) {
    const modeProperty = this.getDrillModeProperty(drillTypeId);
    const availableModes = this.getAvailableModes(drillTypeId);
    const mode = player.getDynamicProperty(modeProperty);
    return typeof mode === "number" ? mode : availableModes[0];
  }
  static setCurrentMode(player, drillTypeId, mode) {
    const modeProperty = this.getDrillModeProperty(drillTypeId);
    player.setDynamicProperty(modeProperty, mode);
  }
  static initializePlayerProperties(player, drillTypeId) {
    const availableModes = this.getAvailableModes(drillTypeId);
    const modeProperty = this.getDrillModeProperty(drillTypeId);
    if (player.getDynamicProperty(modeProperty) === void 0) {
      player.setDynamicProperty(modeProperty, availableModes[0] || 0);
    }
    if (player.getDynamicProperty("wan_redcave:powered") === void 0) {
      player.setDynamicProperty("wan_redcave:powered", 0);
    }
  }
  static getAllMineableBlocks() {
    return Object.values(MINEABLE_BLOCKS).flat();
  }
  static getMineableBlocksByCategories(categories) {
    if (categories === "all") {
      return this.getAllMineableBlocks();
    }
    const blocks = [];
    for (const category of categories) {
      const categoryBlocks = MINEABLE_BLOCKS[category];
      if (categoryBlocks) {
        blocks.push(...categoryBlocks);
      }
    }
    return blocks;
  }
  static determineDirection(player) {
    const rotation = player.getRotation();
    const isFacingVertical = Math.abs(rotation.x) > 60;
    if (isFacingVertical) {
      return "vertical";
    } else {
      const facingAngle = (rotation.y % 360 + 360) % 360;
      const isFacingNorthSouth = facingAngle >= 315 || facingAngle < 45 || facingAngle >= 135 && facingAngle < 225;
      return isFacingNorthSouth ? "north-south" : "east-west";
    }
  }
  static determineSpecificDirection(player) {
    const rotation = player.getRotation();
    const isFacingVertical = Math.abs(rotation.x) > 60;
    if (isFacingVertical) {
      return rotation.x < -60 ? "up" : "down";
    } else {
      const facingAngle = (rotation.y % 360 + 360) % 360;
      if (facingAngle >= 315 || facingAngle < 45) {
        return "north";
      } else if (facingAngle >= 45 && facingAngle < 135) {
        return "east";
      } else if (facingAngle >= 135 && facingAngle < 225) {
        return "south";
      } else {
        return "west";
      }
    }
  }
}
class DrillBatchMiner {
  constructor(blocks, dimension, player = null) {
    __publicField(this, "blocks");
    __publicField(this, "dimension");
    __publicField(this, "player");
    __publicField(this, "blockCount");
    this.blocks = blocks || [];
    this.dimension = dimension;
    this.player = player;
    this.blockCount = 0;
  }
  mine() {
    this.mineAllBlocks();
  }
  mineAllBlocks() {
    const sortedBlocks = this.blocks.sort((a, b) => b.location.y - a.location.y);
    for (const block of sortedBlocks) {
      try {
        if (this.player) {
          breakBlock(this.dimension, block.location, this.player);
        }
        this.blockCount++;
      } catch (error) {
      }
    }
  }
}
function breakBlock(dimension, location, player) {
  try {
    spawnBreakParticles(dimension, location);
    dimension.runCommand(`setblock ${location.x} ${location.y} ${location.z} air destroy`);
  } catch (e) {
    player.sendMessage(`Error breaking block: ${e.message}`);
  }
}
function spawnBreakParticles(dimension, location) {
  try {
    if (Math.random() > 0.4) return;
    const particlePos = {
      x: location.x + 0.5,
      y: location.y + 0.5,
      z: location.z + 0.5
    };
    dimension.spawnParticle("minecraft:egg_destroy_emitter", particlePos);
    dimension.spawnParticle("minecraft:lava_particle", particlePos);
    dimension.spawnParticle("minecraft:critical_hit_emitter", particlePos);
  } catch (error) {
  }
}
class Heat {
  static getHeat(player) {
    const heat = player.getDynamicProperty("wan_redcave:drillHeat");
    return typeof heat === "number" ? heat : 0;
  }
  static setHeat(player, amount) {
    const clampedHeat = Math.max(0, Math.min(this.maxHeat, amount));
    player.setDynamicProperty("wan_redcave:drillHeat", clampedHeat);
  }
  static addHeat(player, mode) {
    const currentHeat = this.getHeat(player);
    const heatToAdd = DRILL_MODE_TYPES[mode].heat;
    const newHeat = currentHeat + heatToAdd;
    this.setHeat(player, newHeat);
    if (newHeat >= this.maxHeat)
      player.setDynamicProperty("wan_redcave:drillWasOverheated", true);
  }
  static isOverheated(player) {
    const wasOverheated = player.getDynamicProperty("wan_redcave:drillWasOverheated");
    if (!wasOverheated)
      return false;
    const heat = this.getHeat(player);
    if (heat < this.cooldownThreshold) {
      player.setDynamicProperty("wan_redcave:drillWasOverheated", false);
      return false;
    }
    return true;
  }
  static setHeatCooldown(player) {
    const currentHeat = this.getHeat(player);
    if (currentHeat > 0)
      this.setHeat(player, currentHeat - this.coolingRate);
  }
  static getHeatPercentage(player) {
    return Math.round(this.getHeat(player) / this.maxHeat * 100);
  }
}
__publicField(Heat, "coolingRate", 2);
__publicField(Heat, "maxHeat", 100);
__publicField(Heat, "cooldownThreshold", 30);
class Drill extends BaseItem {
  onUse(event, equipmentSlot) {
    const { source: player, itemStack } = event;
    DrillModeManager.initializePlayerProperties(player, itemStack.typeId);
    if (!player.isSneaking) {
      const availableModes = DrillModeManager.getAvailableModes(itemStack.typeId);
      const currentMode = DrillModeManager.getCurrentMode(player, itemStack.typeId);
      const currentIndex = availableModes.indexOf(currentMode);
      const nextIndex = (currentIndex + 1) % availableModes.length;
      const nextMode = availableModes[nextIndex];
      DrillModeManager.setCurrentMode(player, itemStack.typeId, nextMode);
    }
  }
}
__publicField(Drill, "identifier", [ItemType.WanRedcaveElectricDrillT1, ItemType.WanRedcaveElectricDrillT2]);
class DrillEngine {
  // ============================================================================
  // DRILL ENGINE
  // ============================================================================
  static runEngine(player) {
    return system.runInterval(() => {
      Heat.setHeatCooldown(player);
      this.updateActionbar(player);
    }, 10);
  }
  static playerBreakBlock(player, item, block) {
    DrillModeManager.initializePlayerProperties(player, item.typeId);
    const powered = Utility.isItemPowered(item);
    if (!powered) return;
    const currentMode = DrillModeManager.getCurrentMode(player, item.typeId);
    const availableModes = DrillModeManager.getAvailableModes(item.typeId);
    if (!availableModes.includes(currentMode)) {
      player.sendMessage({ translate: "wan_redcave:drill.msg.mode_unsupported", with: [DRILL_MODE_TYPES[currentMode].name] });
      system.run(() => {
        player.playSound("note.bass");
      });
      return;
    }
    if (currentMode === 1) {
      const specificDirection = DrillModeManager.determineSpecificDirection(player);
      if (specificDirection === "up" || specificDirection === "down") {
        player.sendMessage({ translate: "wan_redcave:drill.msg.mode_tunnel_horizontal" });
        system.run(() => player.playSound("note.bass"));
        return;
      }
    }
    if (Heat.isOverheated(player)) {
      player.sendMessage({ translate: "wan_redcave:drill.msg.overheated" });
      system.run(() => player.playSound("fire.ignite"));
      return;
    }
    const dimension = block.dimension;
    const blockLocation = { ...block.location };
    const drillTypeId = item.typeId;
    const blockType = block.typeId;
    system.run(() => {
      try {
        switch (currentMode) {
          case 0:
            if (this.isBlockMineable(blockType, drillTypeId)) {
              breakBlock(dimension, blockLocation, player);
              Heat.addHeat(player, currentMode);
            } else if (!block.isAir) {
              player.sendMessage({ translate: "wan_redcave:drill.msg.block_unsupported" });
              player.playSound("note.bass");
              return false;
            }
            break;
          case 1:
            if (this.isBlockMineable(blockType, drillTypeId)) {
              this.handle1x3x5Break(player, block, dimension, drillTypeId);
              Heat.addHeat(player, currentMode);
            } else if (!block.isAir) {
              player.sendMessage({ translate: "wan_redcave:drill.msg.block_unsupported" });
              player.playSound("note.bass");
              return false;
            }
            break;
          case 2:
            if (this.isBlockMineable(blockType, drillTypeId)) {
              this.handle3x3break(player, block, dimension, drillTypeId);
              Heat.addHeat(player, currentMode);
            } else if (!block.isAir) {
              player.sendMessage({ translate: "wan_redcave:drill.msg.block_unsupported" });
              player.playSound("note.bass");
              return false;
            }
            break;
          case 3:
            if (this.isBlockMineable(blockType, drillTypeId)) {
              this.handle5x5Break(player, block, dimension, drillTypeId);
              Heat.addHeat(player, currentMode);
            } else if (!block.isAir) {
              player.sendMessage({ translate: "wan_redcave:drill.msg.block_unsupported" });
              player.playSound("note.bass");
              return false;
            }
            break;
        }
        this.updateActionbar(player);
      } catch {
      }
    });
  }
  // ============================================================================
  // DRILL ACTIONBAR
  // ============================================================================
  static updateActionbar(player) {
    try {
      const item = Utility.getItemInMainhand(player);
      if (!item || !Drill.identifier.includes(item.typeId)) return;
      const powered = Utility.isItemPowered(item);
      const currentMode = DrillModeManager.getCurrentMode(player, item.typeId);
      const modeName = DRILL_MODE_TYPES[currentMode].name;
      const hudBarData = { ...DRILL_DATA_BASE, current: Heat.getHeat(player) };
      player.onScreenDisplay.setActionBar(createActionBar(
        "Drill",
        "Heat",
        powered,
        hudBarData,
        modeName
      ));
    } catch {
    }
  }
  // ============================================================================
  // DRILL MINING HANDLERS
  // ============================================================================
  static isBlockMineable(blockType, drillTypeId) {
    if (!blockType || blockType == MinecraftBlockTypes.Air || blockType === MinecraftBlockTypes.Bedrock) return false;
    if (blockType.includes("_leaves")) return false;
    const config = DRILL_CONFIGS[drillTypeId];
    if (!config) return false;
    if (config.mineableCategories === "all")
      return true;
    const mineableBlocks = DrillModeManager.getMineableBlocksByCategories(config.mineableCategories);
    return mineableBlocks.includes(blockType);
  }
  static handleAreaMining(player, initialBlock, dimension, drillTypeId, patternGenerator) {
    const pattern = patternGenerator(player);
    const blocksToMine = [];
    for (const offset of pattern) {
      const location = {
        x: initialBlock.location.x + offset.x,
        y: initialBlock.location.y + offset.y,
        z: initialBlock.location.z + offset.z
      };
      const currentBlock = dimension.getBlock(location);
      if (!currentBlock || !this.isBlockMineable(currentBlock.typeId, drillTypeId)) continue;
      blocksToMine.push(currentBlock);
    }
    if (blocksToMine.length === 0) return;
    const batchMiner = new DrillBatchMiner(blocksToMine, dimension, player);
    batchMiner.mine();
  }
  static handle1x3x5Break(player, initialBlock, dimension, drillTypeId) {
    this.handleAreaMining(player, initialBlock, dimension, drillTypeId, (p) => this.generate1x3x5Pattern(DrillModeManager.determineSpecificDirection(p)));
  }
  static handle3x3break(player, initialBlock, dimension, drillTypeId) {
    this.handleAreaMining(player, initialBlock, dimension, drillTypeId, (p) => this.generate3x3Pattern(DrillModeManager.determineDirection(p)));
  }
  static handle5x5Break(player, initialBlock, dimension, drillTypeId) {
    this.handleAreaMining(player, initialBlock, dimension, drillTypeId, (p) => this.generate5x5Pattern(DrillModeManager.determineDirection(p)));
  }
  static generate3x3Pattern(direction) {
    const pattern = [];
    for (let a = -1; a <= 1; a++) {
      for (let b = -1; b <= 1; b++) {
        if (direction === "north-south") {
          pattern.push({ x: a, y: b, z: 0 });
        } else if (direction === "east-west") {
          pattern.push({ x: 0, y: a, z: b });
        } else if (direction === "vertical") {
          pattern.push({ x: a, y: 0, z: b });
        }
      }
    }
    return this.removeDuplicates(pattern);
  }
  static generate1x3x5Pattern(specificDirection) {
    const pattern = [];
    for (let y = -1; y <= 1; y++) {
      if (specificDirection === "north") {
        for (let z = 0; z <= 4; z++) {
          pattern.push({ x: 0, y, z });
        }
      } else if (specificDirection === "south") {
        for (let z = 0; z >= -4; z--) {
          pattern.push({ x: 0, y, z });
        }
      } else if (specificDirection === "east") {
        for (let x = 0; x >= -4; x--) {
          pattern.push({ x, y, z: 0 });
        }
      } else if (specificDirection === "west") {
        for (let x = 0; x <= 4; x++) {
          pattern.push({ x, y, z: 0 });
        }
      }
    }
    return this.removeDuplicates(pattern);
  }
  static generate5x5Pattern(direction) {
    const pattern = [];
    for (let a = -2; a <= 2; a++) {
      for (let b = -2; b <= 2; b++) {
        if (direction === "north-south") {
          pattern.push({ x: a, y: b, z: 0 });
        } else if (direction === "east-west") {
          pattern.push({ x: 0, y: a, z: b });
        } else if (direction === "vertical") {
          pattern.push({ x: a, y: 0, z: b });
        }
      }
    }
    return this.removeDuplicates(pattern);
  }
  static removeDuplicates(pattern) {
    const uniquePositions = /* @__PURE__ */ new Map();
    for (const pos of pattern) {
      const key = `${pos.x},${pos.y},${pos.z}`;
      uniquePositions.set(key, pos);
    }
    return Array.from(uniquePositions.values());
  }
}
const Icons$1 = {
  // Main categories
  energy: "textures/wan/redcave/ui/buttons/generator_t1",
  biome: "textures/ui/mashup_world",
  machines: "textures/wan/redcave/ui/buttons/electric_oven_t1",
  items: "textures/wan/redcave/items/tools/blaster_t1",
  // Machine categories
  smelting: "textures/wan/redcave/ui/buttons/electric_oven_t1",
  crushing: "textures/wan/redcave/ui/buttons/crusher_t1",
  transfer: "textures/wan/redcave/ui/buttons/wireless_hopper",
  farming: "textures/wan/redcave/ui/buttons/autofarmer_t1",
  mining: "textures/wan/redcave/ui/buttons/quarry",
  // Smelting machines
  electricOvenT1: "textures/wan/redcave/ui/buttons/electric_oven_t1",
  electricOvenT2: "textures/wan/redcave/ui/buttons/electric_oven_t2",
  // Crushing machines
  crusherT1: "textures/wan/redcave/ui/buttons/crusher_t1",
  crusherT2: "textures/wan/redcave/ui/buttons/crusher_t2",
  // Farming machines
  autoFarmerT1: "textures/wan/redcave/ui/buttons/autofarmer_t1",
  autoFarmerT2: "textures/wan/redcave/ui/buttons/autofarmer_t2",
  // Items
  drillT1: "textures/wan/redcave/items/tools/electric_drill_t1",
  drillT2: "textures/wan/redcave/items/tools/electric_drill_t2",
  blasterT1: "textures/wan/redcave/items/tools/blaster_t1",
  blasterT2: "textures/wan/redcave/items/tools/blaster_t2",
  techsuitT1: "textures/wan/redcave/items/armors/tech_helmet_t1",
  techsuitT2: "textures/wan/redcave/items/armors/tech_helmet_t2",
  touchpad: "textures/wan/redcave/items/holographic_touchpad",
  //Entities
  redstoneTyrant: "textures/wan/redcave/ui/buttons/redstone_tyrant",
  redstoneCrawler: "textures/wan/redcave/ui/buttons/redstone_crawler",
  redstoneHound: "textures/wan/redcave/ui/buttons/redstone_hound",
  redstoneCreeper: "textures/wan/redcave/ui/buttons/redstone_creeper",
  redstoneLongleg: "textures/wan/redcave/ui/buttons/redstone_longleg",
  redstoneWing: "textures/wan/redcave/ui/buttons/redstone_wing",
  littleTyrant: "textures/wan/redcave/ui/buttons/little_tyrant",
  flyingDrone: "textures/wan/redcave/ui/buttons/flying_drone",
  // Energy
  generatorT1: "textures/wan/redcave/ui/buttons/generator_t1",
  portableGeneratorT1: "textures/wan/redcave/items/portable_generator_t1",
  networkCore: "textures/wan/redcave/ui/buttons/network_core"
};
class RedstoneCaveGuidebook extends BaseItem {
  onUse(event, equipmentSlot) {
    const player = event.source;
    openMainMenu(player);
  }
}
__publicField(RedstoneCaveGuidebook, "identifier", ItemType.WanRedcaveGuideBook);
function openMainMenu(player) {
  const form = new ActionFormData();
  form.title("§l§4Redstone Cave Guidebook§r");
  form.body([
    "§l§6About This Addon:§r",
    "Introducing a brand-new cave biome, featuring unique Redstone ores and crystals with a strikingly geometric look. You'll also encounter themed mobs, adding a tech-infused challenge to your exploration. These new resources unlock the ability to craft powerful machines and tools!",
    "",
    "§7Select a category to learn more:"
  ].join("\n"));
  form.button("§lEnergy System§r\n§8Power & Networks", Icons$1.energy);
  form.button("§lBiomes§r\n§8Dimensions & Worlds", Icons$1.biome);
  form.button("§lMachines§r\n§8Automation & Processing", Icons$1.machines);
  form.button("§lEntities§r\n§8Mobs & Creatures", Icons$1.redstoneCreeper);
  form.button("§lItems§r\n§8Tools & Equipment", Icons$1.items);
  form.show(player).then((response) => {
    if (response.canceled || response.selection === void 0) return;
    switch (response.selection) {
      case 0:
        openEnergySystemMenu(player);
        break;
      case 1:
        openBiomesMenu(player);
        break;
      case 2:
        openMachinesMenu(player);
        break;
      case 3:
        openEntitiesMenu(player);
        break;
      case 4:
        openItemsMenu(player);
        break;
    }
  });
}
function openEnergySystemMenu(player) {
  const form = new ActionFormData();
  form.title("§l§eEnergy System§r");
  form.body([
    "§7The Redstone Cave addon features a wireless",
    "§7energy distribution system based on §bNetwork Cores§7.",
    "",
    "§l§6How It Works:§r",
    "§81. Place a §bNetwork Core§8 to create a network",
    "§82. Add §aGenerators§8 within 25 blocks range",
    "§83. Connect §eMachines§8 within the same range",
    "§84. Energy is distributed automatically!",
    "",
    "§l§6Network Range:§r",
    "§8Diameter: §f50 blocks§8 (25 block radius)",
    "",
    "§l§6Energy Units:§r",
    "§8Measured in §eRE §8(Redstone Energy)",
    "§8Each generator produces RE",
    "§8Each machine consumes RE"
  ].join("\n"));
  form.button("§lGenerators§r\n§8Energy Production", Icons$1.generatorT1);
  form.button("§lNetwork Cores§r\n§8Network Management", Icons$1.networkCore);
  form.button("§lPortable Generators§r\n§8Personal Power", Icons$1.portableGeneratorT1);
  form.button("§8Back", "textures/wan/redcave/ui/buttons/back");
  form.show(player).then((response) => {
    if (response.canceled || response.selection === void 0) return;
    switch (response.selection) {
      case 0:
        openGeneratorsInfo(player);
        break;
      case 1:
        openNetworkCoresInfo(player);
        break;
      case 2:
        openPortableGeneratorsInfo(player);
        break;
      case 3:
        openMainMenu(player);
        break;
    }
  });
}
function openGeneratorsInfo(player) {
  const form = new ActionFormData();
  form.title("§l§aGenerators§r");
  form.body([
    "§7Generators produce energy for your network.",
    "§7Place them near a Network Core to start producing!",
    "",
    "§l§6Generator Tier I§r",
    "§8Production: §e2 RE",
    "§8Range: §f25 blocks §8from Network Core",
    "",
    "§l§6Generator Tier II§r",
    "§8Production: §e10 RE",
    "§8Range: §f25 blocks §8from Network Core",
    "",
    "§l§cTip:§r",
    "§8Multiple generators can be connected",
    "§8to the same Network Core!"
  ].join("\n"));
  form.button("§8Back", "textures/wan/redcave/ui/buttons/back");
  form.show(player).then((response) => {
    if (!response.canceled) openEnergySystemMenu(player);
  });
}
function openNetworkCoresInfo(player) {
  const form = new ActionFormData();
  form.title("§l§bNetwork Cores§r");
  form.body([
    "§7Network Cores are the heart of your power grid.",
    "§7They manage energy distribution to all connected devices.",
    "",
    "§l§6Network Core (Blue)§r",
    "§8Range: §f50 blocks diameter",
    "§8Function: §7Manages energy for machines",
    "§8Connects: §aGenerators §7& §eMachines",
    "",
    "§l§6Network Core (Hostile)§r",
    "§8Range: §f50 blocks diameter",
    "§8Function: §7Powers hostile robots",
    "§8Special: §c30% chance to spawn Redstone Tyrant",
    "",
    "§l§cWarning:§r",
    "§8Network Cores cannot overlap!",
    "§8Keep them at least 50 blocks apart."
  ].join("\n"));
  form.button("§8Back", "textures/wan/redcave/ui/buttons/back");
  form.show(player).then((response) => {
    if (!response.canceled) openEnergySystemMenu(player);
  });
}
function openPortableGeneratorsInfo(player) {
  const form = new ActionFormData();
  form.title("§l§ePortable Generators§r");
  form.body([
    "§7Portable power sources for personal equipment.",
    "§7Keep them in your inventory to power tools and armor!",
    "",
    "§l§6Portable Generator Tier I§r",
    "§8Capacity: §e3 RE",
    "",
    "§l§6Portable Generator Tier II§r",
    "§8Capacity: §e15 RE",
    "",
    "§l§6How They Work:§r",
    "§8- Keep in your inventory",
    "§8- Automatically powers equipped items",
    "§8- Powers drills, blasters, and techsuit",
    "§8- Higher tier = more power capacity",
    "",
    "§l§cNote:§r",
    "§8You need a portable generator to use:",
    "§8- Electric Drills (any tier)",
    "§8- Blasters (any tier)",
    "§8- Techsuit armor abilities",
    "",
    "§l§6Energy Distribution:§r",
    "§8Priority order: Armor > Tools > Pets",
    "§8If capacity is insufficient, items won't work!"
  ].join("\n"));
  form.button("§8Back", "textures/wan/redcave/ui/buttons/back");
  form.show(player).then((response) => {
    if (!response.canceled) openEnergySystemMenu(player);
  });
}
function openBiomesMenu(player) {
  const form = new ActionFormData();
  form.title("§l§2Biomes§r");
  form.body("§7Explore the unique biomes of the Redstone Cave dimension:");
  form.button("§lRedstone Plains§r\n§8Surface Biome", Icons$1.biome);
  form.button("§lRedstone Cave§r\n§8Underground Biome", Icons$1.biome);
  form.button("§8Back", "textures/wan/redcave/ui/buttons/back");
  form.show(player).then((response) => {
    if (response.canceled || response.selection === void 0) return;
    switch (response.selection) {
      case 0:
        openRedstonePlainsInfo(player);
        break;
      case 1:
        openRedstoneCaveInfo(player);
        break;
      case 2:
        openMainMenu(player);
        break;
    }
  });
}
function openRedstonePlainsInfo(player) {
  const form = new ActionFormData();
  form.title("§l§cRedstone Plains§r");
  form.body([
    "§7A mysterious surface biome covered in red fog.",
    "§7Similar to vanilla plains but with unique structures.",
    "",
    "§l§6Features:§r",
    "§8- Black cube structures with particle effects",
    "§8- Red atmospheric fog",
    "§8- Flat terrain similar to vanilla plains",
    "§8- Gateway to the Redstone Cave below",
    "",
    "§l§6Dangers:§r",
    "§8- Hostile entities may spawn",
    "§8- Mysterious structures contain surprises",
    "",
    "§l§6Resources:§r",
    "§8- Entry point to underground caves",
    "§8- Unique building materials"
  ].join("\n"));
  form.button("§8Back", "textures/wan/redcave/ui/buttons/back");
  form.show(player).then((response) => {
    if (!response.canceled) openBiomesMenu(player);
  });
}
function openRedstoneCaveInfo(player) {
  const form = new ActionFormData();
  form.title("§l§4Redstone Cave§r");
  form.body([
    "§7A brand-new underground biome designed for",
    "§7CurseForge ModJam 2025's futuristic theme!",
    "",
    "§l§6What Makes It Special:§r",
    "§8- Unique Redstone ores with geometric design",
    "§8- Striking Redstone crystal formations",
    "§8- Tech-infused themed mobs",
    "§8- Enhanced by Vibrant Visuals effect",
    "§8- Pure black stone cave walls",
    "",
    "§l§6Gameplay Shift:§r",
    "§8This biome unlocks classic technical mod gameplay!",
    "§8Mine unique resources to craft:",
    "§8- Powerful automated machines",
    "§8- Advanced tools and equipment",
    "§8- Jetpacks and powered armor",
    "§8- Auto-farmers and quarries",
    "",
    "§l§6Visual Experience:§r",
    "§8Every element leverages Vibrant Visuals",
    "§8for striking visual intensity and atmosphere",
    "",
    "§l§6Resources:§r",
    "§8- Magnetite Ore (unique to this biome)",
    "§8- Geometric Redstone Crystals",
    "§8- Tech-themed building materials"
  ].join("\n"));
  form.button("§8Back", "textures/wan/redcave/ui/buttons/back");
  form.show(player).then((response) => {
    if (!response.canceled) openBiomesMenu(player);
  });
}
function openMachinesMenu(player) {
  const form = new ActionFormData();
  form.title("§l§6Machines§r");
  form.body([
    "§7Automate your resource processing with",
    "§7powerful machines powered by your network!",
    "",
    "§l§cNote:§r",
    "§8All machines must be:",
    "§8- Within range of a Network Core",
    "§8- Powered by Generators",
    "§8- Linked to containers (Input/Output)"
  ].join("\n"));
  form.button("§lSmelting§r\n§8Electric Ovens", Icons$1.smelting);
  form.button("§lCrushing§r\n§8Ore Crushers", Icons$1.crushing);
  form.button("§lTransfer§r\n§8Wireless Hoppers", Icons$1.transfer);
  form.button("§lFarming§r\n§8Auto Farmers", Icons$1.farming);
  form.button("§lMining§r\n§8Quarries", Icons$1.mining);
  form.button("§8Back", "textures/wan/redcave/ui/buttons/back");
  form.show(player).then((response) => {
    if (response.canceled || response.selection === void 0) return;
    switch (response.selection) {
      case 0:
        openSmeltingMachines(player);
        break;
      case 1:
        openCrushingMachines(player);
        break;
      case 2:
        openTransferMachines(player);
        break;
      case 3:
        openFarmingMachines(player);
        break;
      case 4:
        openMiningMachines(player);
        break;
      case 5:
        openMainMenu(player);
        break;
    }
  });
}
function openSmeltingMachines(player) {
  const form = new ActionFormData();
  form.title("§l§eSmelting Machines§r");
  form.body("§7Fast and efficient ore smelting!");
  form.button("§lElectric Oven Tier I§r\n§82 RE", Icons$1.electricOvenT1);
  form.button("§lElectric Oven Tier II§r\n§810 RE", Icons$1.electricOvenT2);
  form.button("§8Back", "textures/wan/redcave/ui/buttons/back");
  form.show(player).then((response) => {
    if (response.canceled || response.selection === void 0) return;
    switch (response.selection) {
      case 0:
        showMachineDetails(player, {
          name: "Electric Oven Tier I",
          tier: 1,
          energyCost: 2,
          processTime: "10 seconds",
          efficiency: "0% bonus",
          description: "Basic electric smelting machine. Processes ores and raw materials into refined products.",
          features: [
            "Faster than vanilla furnace",
            "No fuel required",
            "Network-powered operation",
            "Whitelist filter support"
          ],
          backCallback: () => openSmeltingMachines(player)
        });
        break;
      case 1:
        showMachineDetails(player, {
          name: "Electric Oven Tier II",
          tier: 2,
          energyCost: 10,
          processTime: "5 seconds",
          efficiency: "25% bonus output",
          description: "Advanced electric smelting machine. Double speed with chance for bonus output!",
          features: [
            "2x faster than Tier I",
            "25% chance for extra item",
            "Network-powered operation",
            "Whitelist filter support"
          ],
          backCallback: () => openSmeltingMachines(player)
        });
        break;
      case 2:
        openMachinesMenu(player);
        break;
    }
  });
}
function openCrushingMachines(player) {
  const form = new ActionFormData();
  form.title("§l§7Crushing Machines§r");
  form.body("§7Increase ore yields and process materials!");
  form.button("§lOre Crusher Tier I§r\n§86 RE", Icons$1.crusherT1);
  form.button("§lOre Crusher Tier II§r\n§812 RE", Icons$1.crusherT2);
  form.button("§8Back", "textures/wan/redcave/ui/buttons/back");
  form.show(player).then((response) => {
    if (response.canceled || response.selection === void 0) return;
    switch (response.selection) {
      case 0:
        showMachineDetails(player, {
          name: "Ore Crusher Tier I",
          tier: 1,
          energyCost: 6,
          processTime: "10 seconds",
          efficiency: "0% bonus",
          description: "Basic ore crushing machine. Increases raw material yield from ores.",
          features: [
            "2-4x output from ores",
            "Breaks down materials",
            "Network-powered operation",
            "Whitelist filter support"
          ],
          backCallback: () => openCrushingMachines(player)
        });
        break;
      case 1:
        showMachineDetails(player, {
          name: "Ore Crusher Tier II",
          tier: 2,
          energyCost: 12,
          processTime: "5 seconds",
          efficiency: "200% bonus",
          description: "Advanced ore crushing machine. Maximum efficiency with extreme speed!",
          features: [
            "2x faster than Tier I",
            "Triple output multiplier",
            "Network-powered operation",
            "Whitelist filter support"
          ],
          backCallback: () => openCrushingMachines(player)
        });
        break;
      case 2:
        openMachinesMenu(player);
        break;
    }
  });
}
function openTransferMachines(player) {
  const form = new ActionFormData();
  form.title("§l§bTransfer Machines§r");
  form.body("§7Wireless item transportation!");
  form.button("§lWireless Hopper§r\n§82 RE", Icons$1.transfer);
  form.button("§8Back", "textures/wan/redcave/ui/buttons/back");
  form.show(player).then((response) => {
    if (response.canceled || response.selection === void 0) return;
    switch (response.selection) {
      case 0:
        showMachineDetails(player, {
          name: "Wireless Hopper",
          tier: 1,
          energyCost: 2,
          processTime: "0.5 seconds per item",
          efficiency: "N/A",
          description: "Advanced wireless item transfer system with multiple link support and individual filters.",
          features: [
            "Up to 5 input containers",
            "Up to 5 output containers",
            "Individual filter per link",
            "Minimum amount settings",
            "Round-robin distribution"
          ],
          backCallback: () => openTransferMachines(player)
        });
        break;
      case 1:
        openMachinesMenu(player);
        break;
    }
  });
}
function openFarmingMachines(player) {
  const form = new ActionFormData();
  form.title("§l§aFarming Machines§r");
  form.body("§7Automated crop harvesting!");
  form.button("§lAuto Farmer Tier I§r\n§85 RE", Icons$1.autoFarmerT1);
  form.button("§lAuto Farmer Tier II§r\n§811 RE", Icons$1.autoFarmerT2);
  form.button("§8Back", "textures/wan/redcave/ui/buttons/back");
  form.show(player).then((response) => {
    if (response.canceled || response.selection === void 0) return;
    switch (response.selection) {
      case 0:
        showMachineDetails(player, {
          name: "Auto Farmer Tier I",
          tier: 1,
          energyCost: 5,
          processTime: "30 seconds",
          efficiency: "N/A",
          description: "Basic automated farming. Generates crops periodically without needing planted seeds.",
          features: [
            "Select one crop type",
            "Generates 1-3 items per cycle",
            "No farmland required",
            "Output to linked container"
          ],
          backCallback: () => openFarmingMachines(player)
        });
        break;
      case 1:
        showMachineDetails(player, {
          name: "Auto Farmer Tier II",
          tier: 2,
          energyCost: 11,
          processTime: "2 seconds",
          efficiency: "N/A",
          description: "Advanced area farming. Harvests real crops in an 11x11 area automatically!",
          features: [
            "11x11 harvest area",
            "Harvests actual planted crops",
            "Crop whitelist filter",
            "Particle perimeter display",
            "Auto-replants crops"
          ],
          backCallback: () => openFarmingMachines(player)
        });
        break;
      case 2:
        openMachinesMenu(player);
        break;
    }
  });
}
function openMiningMachines(player) {
  const form = new ActionFormData();
  form.title("§l§7Mining Machines§r");
  form.body("§7Automated resource extraction!");
  form.button("§lQuarry Tier II§r\n§815 RE", Icons$1.mining);
  form.button("§8Back", "textures/wan/redcave/ui/buttons/back");
  form.show(player).then((response) => {
    if (response.canceled || response.selection === void 0) return;
    switch (response.selection) {
      case 0:
        showMachineDetails(player, {
          name: "Quarry Tier II",
          tier: 2,
          energyCost: 15,
          processTime: "2 seconds per block",
          efficiency: "N/A",
          description: "Massive automated mining machine. Digs an 8x8 area down to bedrock!",
          features: [
            "8x8 mining area",
            "32 blocks deep",
            "Directional placement",
            "Toggle on/off",
            "Particle perimeter",
            "Layer-by-layer mining"
          ],
          backCallback: () => openMiningMachines(player)
        });
        break;
      case 1:
        openMachinesMenu(player);
        break;
    }
  });
}
function showMachineDetails(player, config) {
  const form = new ActionFormData();
  form.title(`§l${config.name}§r`);
  const bodyLines = [
    `§7${config.description}`,
    "",
    "§l§6Statistics:§r",
    `§8Tier: §f${config.tier}`,
    `§8Energy Cost: §e${config.energyCost} RE`,
    `§8Process Time: §f${config.processTime}`,
    `§8Efficiency: §f${config.efficiency}`,
    "",
    "§l§6Features:§r"
  ];
  config.features.forEach((feature) => {
    bodyLines.push(`§8- ${feature}`);
  });
  form.body(bodyLines.join("\n"));
  form.button("§8Back", "textures/wan/redcave/ui/buttons/back");
  form.show(player).then((response) => {
    if (!response.canceled) config.backCallback();
  });
}
function openEntitiesMenu(player) {
  const form = new ActionFormData();
  form.title("§l§4Entities§r");
  form.body([
    "§7Mechanical entities powered by redstone energy.",
    "§7Some are hostile, others can be tamed!",
    "",
    "§l§6Entity Types:§r",
    "§8- §cHostile§8 - Requires Hostile Network Core",
    "§8- §aPeaceful§8 - Requires Normal Network Core",
    "§8- §bTameable§8 - Can be tamed by players"
  ].join("\n"));
  form.button("§lRedstone Tyrant§r\n§cBoss Entity", Icons$1.redstoneTyrant);
  form.button("§lRedstone Crawler§r\n§cJump Attacker", Icons$1.redstoneCrawler);
  form.button("§lRedstonw Hound§r\n§cGround Attacker", Icons$1.redstoneHound);
  form.button("§lRedstone Creeper§r\n§cExplosive Melee", Icons$1.redstoneCreeper);
  form.button("§lRedstone Lonleg§r\n§cCharge Melee", Icons$1.redstoneLongleg);
  form.button("§lRedstone Wing§r\n§cFlying Attacker", Icons$1.redstoneWing);
  form.button("§lLittle Tyrant§r\n§bTameable Pet", Icons$1.littleTyrant);
  form.button("§lFlying Drone§r\n§bTameable Support", Icons$1.flyingDrone);
  form.button("§8Back", "textures/wan/redcave/ui/buttons/back");
  form.show(player).then((response) => {
    if (response.canceled || response.selection === void 0) return;
    switch (response.selection) {
      case 0:
        showEntityDetails(player, {
          name: "Redstone Tyrant",
          type: "§cHostile Boss",
          energyCost: "N/A (Self-powered)",
          health: "High",
          damage: "Very High",
          description: "A massive mechanical tyrant. The ultimate challenge of the Redstone Cave!",
          abilities: [
            "Bite - Melee area attack",
            "Swing - Wide area knockback",
            "Smash - Ground pound AOE",
            "Spit - Ranged fireball barrage",
            "Eat - Charges up special attack",
            "Activates nearby robots"
          ],
          spawning: "30% chance when breaking Hostile Network Core",
          behavior: "Aggressive targeting, multiple attack patterns",
          backCallback: () => openEntitiesMenu(player)
        });
        break;
      case 1:
        showEntityDetails(player, {
          name: "Redstone Crawler",
          type: "§cHostile Ground / §bTameable / §eMountable",
          energyCost: "12 RE",
          health: "Medium-High",
          damage: "High",
          description: "Aggressive mechanical spider. Can be tamed if powered by peaceful network!",
          abilities: [
            "Bite - Fast melee attack",
            "Jump - Leaps toward the target, dealing damage on landing",
            "Shield blocking detection"
          ],
          spawning: "Spawns near Hostile Network Cores, tameable near peaceful cores",
          behavior: "Aggressive melee hybrid, becomes loyal when tamed",
          backCallback: () => openEntitiesMenu(player)
        });
        break;
      case 2:
        showEntityDetails(player, {
          name: "Redstone Hound",
          type: "§cHostile Ground / §bTameable",
          energyCost: "8 RE",
          health: "Medium-High",
          damage: "High",
          description: "Aggressive mechanical hound. Can be tamed if powered by peaceful network!",
          abilities: [
            "Bite - Fast melee attack",
            "Saw - Spinning blade attack",
            "Laser - Long-range beam",
            "Shield blocking detection"
          ],
          spawning: "Spawns near Hostile Network Cores, tameable near peaceful cores",
          behavior: "Aggressive melee/ranged hybrid, becomes loyal when tamed",
          backCallback: () => openEntitiesMenu(player)
        });
        break;
      case 3:
        showEntityDetails(player, {
          name: "Redstone Creeper",
          type: "§cHostile Melee",
          energyCost: "3 RE",
          health: "Low-Medium",
          damage: "High",
          description: "Mechanical explosive unit with powerful melee strikes.",
          abilities: [
            "Melee - Strong single-target damage",
            "Knockback attacks",
            "Shield blocking detection"
          ],
          spawning: "Spawns near Hostile Network Cores",
          behavior: "Rushes targets for melee combat",
          backCallback: () => openEntitiesMenu(player)
        });
        break;
      case 4:
        showEntityDetails(player, {
          name: "Redstone Longleg",
          type: "§cHostile Melee",
          energyCost: "4 RE",
          health: "Low-Medium",
          damage: "Medium",
          description: "A slow basic mob that transforms into a high-speed bolide when attacking.",
          abilities: [
            "Charge - Rushes toward the target from a distance",
            "Knockback attacks",
            "Shield blocking detection"
          ],
          spawning: "Spawns near Hostile Network Cores",
          behavior: "Charge targets for melee combat",
          backCallback: () => openEntitiesMenu(player)
        });
        break;
      case 5:
        showEntityDetails(player, {
          name: "Redstone Wing",
          type: "§cHostile Flying",
          energyCost: "4 RE",
          health: "Medium",
          damage: "Medium",
          description: "Fast flying combat drone with ranged attacks.",
          abilities: [
            "Shoot - Rapid projectile attack",
            "Laser - Precision beam weapon",
            "Flight - Aerial mobility"
          ],
          spawning: "Spawns near Hostile Network Cores",
          behavior: "Maintains distance, uses ranged attacks",
          backCallback: () => openEntitiesMenu(player)
        });
        break;
      case 6:
        showEntityDetails(player, {
          name: "Little Tyrant",
          type: "§bTameable Pet / §eMountable",
          energyCost: "20 RE",
          health: "Medium",
          damage: "Medium (Player-controlled)",
          description: "A smaller version of the Redstone Tyrant. Can be ridden and used in combat!",
          abilities: [
            "Rideable mount",
            "Fireball barrage (when ridden)",
            "Player-controlled combat",
            "Must be near Network Core"
          ],
          spawning: "Found near peaceful Network Cores, automatically tames nearby player",
          behavior: "Follows owner, allows mounting for combat",
          backCallback: () => openEntitiesMenu(player)
        });
        break;
      case 7:
        showEntityDetails(player, {
          name: "Flying Drone",
          type: "§bTameable Pet",
          energyCost: "4 RE",
          health: "Low",
          damage: "None",
          description: "Peaceful utility drone for exploration and support.",
          abilities: [
            "Flight - Aerial movement",
            "Follows owner",
            "Peaceful behavior",
            "Must be near Network Core"
          ],
          spawning: "Found near peaceful Network Cores, automatically tames nearby player",
          behavior: "Follows owner peacefully, no combat",
          backCallback: () => openEntitiesMenu(player)
        });
        break;
      case 8:
        openMainMenu(player);
        break;
    }
  });
}
function showEntityDetails(player, config) {
  const form = new ActionFormData();
  form.title(`§l${config.name}§r`);
  const bodyLines = [
    `§7${config.description}`,
    "",
    "§l§6Type:§r",
    `§8${config.type}`,
    "",
    "§l§6Statistics:§r",
    `§8Energy Cost: §e${config.energyCost}`,
    `§8Health: §c${config.health}`,
    `§8Damage: §4${config.damage}`,
    "",
    "§l§6Abilities:§r"
  ];
  config.abilities.forEach((ability) => {
    bodyLines.push(`§8- ${ability}`);
  });
  bodyLines.push("");
  bodyLines.push("§l§6Spawning:§r");
  bodyLines.push(`§8${config.spawning}`);
  bodyLines.push("");
  bodyLines.push("§l§6Behavior:§r");
  bodyLines.push(`§8${config.behavior}`);
  form.body(bodyLines.join("\n"));
  form.button("§8Back", "textures/wan/redcave/ui/buttons/back");
  form.show(player).then((response) => {
    if (!response.canceled) config.backCallback();
  });
}
function openItemsMenu(player) {
  const form = new ActionFormData();
  form.title("§l§bItems§r");
  form.body([
    "§7Advanced tools and equipment for",
    "§7exploration, combat, and automation.",
    "",
    "§l§6Item Categories:§r",
    "§8- §bDrills§8 - Mining tools with multiple modes",
    "§8- §cBlasters§8 - Energy weapons",
    "§8- §eTechsuit§8 - Powered armor with abilities",
    "§8- §fHolographic Touchpad§8 - Machine management"
  ].join("\n"));
  form.button("§lElectric Drills§r\n§8Advanced Mining", Icons$1.drillT1);
  form.button("§lBlasters§r\n§8Energy Weapons", Icons$1.blasterT1);
  form.button("§lTechsuit§r\n§8Powered Armor", Icons$1.techsuitT1);
  form.button("§lHolographic Touchpad§r\n§8Machine Control", Icons$1.touchpad);
  form.button("§8Back", "textures/wan/redcave/ui/buttons/back");
  form.show(player).then((response) => {
    if (response.canceled || response.selection === void 0) return;
    switch (response.selection) {
      case 0:
        openDrillsMenu(player);
        break;
      case 1:
        openBlastersMenu(player);
        break;
      case 2:
        openTechsuitMenu(player);
        break;
      case 3:
        openTouchpadInfo(player);
        break;
      case 4:
        openMainMenu(player);
        break;
    }
  });
}
function openDrillsMenu(player) {
  const form = new ActionFormData();
  form.title("§l§7Electric Drills§r");
  form.body("§7Powerful mining tools with multiple modes!");
  form.button("§lElectric Drill Tier I§r\n§82 RE consumption", Icons$1.drillT1);
  form.button("§lElectric Drill Tier II§r\n§88 RE consumption", Icons$1.drillT2);
  form.button("§8Back", "textures/wan/redcave/ui/buttons/back");
  form.show(player).then((response) => {
    if (response.canceled || response.selection === void 0) return;
    switch (response.selection) {
      case 0:
        showItemDetails(player, {
          name: "Electric Drill Tier I",
          category: "Mining Tool",
          energyCost: "2 RE per use",
          description: "Entry-level electric mining drill with two mining modes.",
          features: [
            "§l§61x1 Mode§r - Single block mining",
            "§l§63x3 Mode§r - 3x3 area mining",
            "Heat system prevents overuse",
            "Must be powered by portable generator",
            "Can mine ores, stone, and basic materials"
          ],
          usage: [
            "Right-click to switch modes",
            "Monitor heat bar to avoid overheating",
            "Carry a Portable Generator for power"
          ],
          backCallback: () => openDrillsMenu(player)
        });
        break;
      case 1:
        showItemDetails(player, {
          name: "Electric Drill Tier II",
          category: "Mining Tool",
          energyCost: "8 RE per use",
          description: "Advanced electric drill with all mining modes unlocked!",
          features: [
            "§l§61x1 Mode§r - Single block mining",
            "§l§61x3x5 Mode§r - Tunnel mining (horizontal only)",
            "§l§63x3 Mode§r - 3x3 area mining",
            "§l§65x5 Mode§r - 5x5 area mining",
            "Heat system prevents overuse",
            "Must be powered by portable generator",
            "Can mine ALL blocks (except bedrock)"
          ],
          usage: [
            "Right-click to cycle through modes",
            "Monitor heat bar carefully",
            "1x3x5 mode cannot be used vertically"
          ],
          backCallback: () => openDrillsMenu(player)
        });
        break;
      case 2:
        openItemsMenu(player);
        break;
    }
  });
}
function openBlastersMenu(player) {
  const form = new ActionFormData();
  form.title("§l§cBlasters§r");
  form.body("§7Energy-powered ranged weapons!");
  form.button("§lBlaster Tier I§r\n§84 RE per shot", Icons$1.blasterT1);
  form.button("§lBlaster Tier II§r\n§814 RE per shot", Icons$1.blasterT2);
  form.button("§8Back", "textures/wan/redcave/ui/buttons/back");
  form.show(player).then((response) => {
    if (response.canceled || response.selection === void 0) return;
    switch (response.selection) {
      case 0:
        showItemDetails(player, {
          name: "Blaster Tier I",
          category: "Weapon",
          energyCost: "4 RE per shot",
          description: "Basic energy blaster with projectile mode.",
          features: [
            "Fires energy projectiles",
            "Medium damage per shot",
            "Heat buildup system",
            "10 tick cooldown between shots",
            "Overheats at 100% heat",
            "Must be powered by portable generator"
          ],
          usage: [
            "Right-click to shoot",
            "Monitor heat bar",
            "Wait for cooldown to prevent overheating",
            "Overheat = 6 second lockout"
          ],
          backCallback: () => openBlastersMenu(player)
        });
        break;
      case 1:
        showItemDetails(player, {
          name: "Blaster Tier II",
          category: "Weapon",
          energyCost: "14 RE while firing",
          description: "Advanced continuous beam blaster with sustained fire mode!",
          features: [
            "Hold to fire continuous beam",
            "2 damage per 0.5 seconds",
            "Heat buildup while firing",
            "Overheats at 100% heat",
            "Auto-stops when overheated",
            "Must be powered by portable generator"
          ],
          usage: [
            "Hold right-click to fire beam",
            "Release to stop firing",
            "Monitor heat carefully",
            "Overheat = 6 second lockout"
          ],
          backCallback: () => openBlastersMenu(player)
        });
        break;
      case 2:
        openItemsMenu(player);
        break;
    }
  });
}
function openTechsuitMenu(player) {
  const form = new ActionFormData();
  form.title("§l§eTechsuit§r");
  form.body([
    "§7Powered armor sets with special abilities!",
    "§7Each piece consumes energy while worn.",
    "",
    "§l§cRequirement:§r",
    "§8Carry a Portable Generator in your inventory!"
  ].join("\n"));
  form.button("§lTechsuit Tier I§r\n§86 RE total", Icons$1.techsuitT1);
  form.button("§lTechsuit Tier II§r\n§813 RE total", Icons$1.techsuitT2);
  form.button("§8Back", "textures/wan/redcave/ui/buttons/back");
  form.show(player).then((response) => {
    if (response.canceled || response.selection === void 0) return;
    switch (response.selection) {
      case 0:
        showItemDetails(player, {
          name: "Techsuit Tier I",
          category: "Armor Set",
          energyCost: "6 RE total (1+3+1+1)",
          description: "Basic powered armor with three utility abilities.",
          features: [
            "§l§bMagnetic Field§r - Attracts nearby items",
            "§l§9Aqualungs§r - Water breathing + conduit power",
            "§l§eSuperbooster§r - Speed boost + dash ability",
            "Full set required for abilities",
            "Use Techsuit Controller to toggle powers",
            "Must carry Portable Generator"
          ],
          usage: [
            "Equip full armor set",
            "Right-click with Techsuit Controller",
            "Toggle abilities on/off",
            "Dash: Sprint + Jump while boosting"
          ],
          backCallback: () => openTechsuitMenu(player)
        });
        break;
      case 1:
        showItemDetails(player, {
          name: "Techsuit Tier II",
          category: "Armor Set",
          energyCost: "13 RE total (3+4+3+3)",
          description: "Advanced powered armor with six powerful abilities!",
          features: [
            "§l§bMagnetic Field§r - Attracts nearby items",
            "§l§9Aqualungs§r - Water breathing + conduit power",
            "§l§eSuperbooster§r - Speed boost + dash ability",
            "§l§fFlight Jetpack§r - Creative-like flight",
            "§l§8Night Visor§r - Night vision",
            "§l§dEnergy Shield§r - Deflects projectiles",
            "Full set required for abilities",
            "Use Techsuit Controller to toggle powers",
            "Must carry Portable Generator"
          ],
          usage: [
            "Equip full armor set",
            "Right-click with Techsuit Controller",
            "Toggle abilities individually",
            "Flight: Jump + Sneak in air"
          ],
          backCallback: () => openTechsuitMenu(player)
        });
        break;
      case 2:
        openItemsMenu(player);
        break;
    }
  });
}
function openTouchpadInfo(player) {
  const form = new ActionFormData();
  form.title("§l§fHolographic Touchpad§r");
  form.body([
    "§7The essential tool for managing your",
    "§7machine network and automation systems.",
    "",
    "§l§6Features:§r",
    "§8- Configure machines remotely",
    "§8- Link containers to machines",
    "§8- View network status",
    "§8- Manage filters and whitelists",
    "§8- Access network overview",
    "",
    "§l§6Usage:§r",
    "§8- §fRight-click on machine§8 - Open config",
    "§8- §fRight-click on container§8 - Link machine",
    "§8- §fRight-click in air§8 - Network overview",
    "§8- §fSneak + Right-click§8 - Cancel linking",
    "",
    "§l§6Linking Process:§r",
    "§81. Right-click machine to start linking",
    "§82. Click input container",
    "§83. Click output container",
    "§84. Done!",
    "",
    "§l§cTip:§r",
    "§8Sneak + Click on a linked container",
    "§8to see which machine it's connected to!"
  ].join("\n"));
  form.button("§8Back", "textures/wan/redcave/ui/buttons/back");
  form.show(player).then((response) => {
    if (!response.canceled) openItemsMenu(player);
  });
}
function showItemDetails(player, config) {
  const form = new ActionFormData();
  form.title(`§l${config.name}§r`);
  const bodyLines = [
    `§7${config.description}`,
    "",
    "§l§6Category:§r",
    `§8${config.category}`,
    "",
    "§l§6Energy Cost:§r",
    `§8${config.energyCost}`,
    "",
    "§l§6Features:§r"
  ];
  config.features.forEach((feature) => {
    bodyLines.push(`§8- ${feature}`);
  });
  bodyLines.push("");
  bodyLines.push("§l§6How to Use:§r");
  config.usage.forEach((usage) => {
    bodyLines.push(`§8- ${usage}`);
  });
  form.body(bodyLines.join("\n"));
  form.button("§8Back", "textures/wan/redcave/ui/buttons/back");
  form.show(player).then((response) => {
    if (!response.canceled) config.backCallback();
  });
}
var Linking;
((Linking2) => {
  function setInput(machine, location) {
    machine.input = location;
    MachineRegistry.saveToWorld();
  }
  Linking2.setInput = setInput;
  function setOutput(machine, location) {
    machine.output = location;
    MachineRegistry.saveToWorld();
  }
  Linking2.setOutput = setOutput;
  function clearLinks(machine, clearInput, clearOutput) {
    if (clearInput) {
      machine.input = void 0;
    }
    if (clearOutput) {
      machine.output = void 0;
    }
    MachineRegistry.saveToWorld();
  }
  Linking2.clearLinks = clearLinks;
  function validateMachineLinks(machine) {
    const validation = machine.validateLinks();
    let linksChanged = false;
    if (!validation.inputValid && machine.input) {
      machine.input = void 0;
      linksChanged = true;
    }
    if (!validation.outputValid && machine.output) {
      machine.output = void 0;
      linksChanged = true;
    }
    if (linksChanged) {
      MachineRegistry.saveToWorld();
    }
  }
  Linking2.validateMachineLinks = validateMachineLinks;
  function hasCompleteLinks(machine) {
    return machine.input !== void 0 && machine.output !== void 0;
  }
  Linking2.hasCompleteLinks = hasCompleteLinks;
  function getLinkStatus(machine) {
    const inputStatus = machine.input ? "§aLinked§r" : "§cNot Linked§r";
    const outputStatus = machine.output ? "§aLinked§r" : "§cNot Linked§r";
    return `§fInput: ${inputStatus} §r| §fOutput: ${outputStatus}`;
  }
  Linking2.getLinkStatus = getLinkStatus;
})(Linking || (Linking = {}));
var UIHelpers;
((UIHelpers2) => {
  function showActionForm(player, title, body, buttons, callback, backCallback) {
    const form = new ActionFormData();
    form.title(title);
    form.body(body);
    for (const button of buttons) form.button(button.text, button.iconPath);
    const backButtonAdded = !!backCallback;
    if (backButtonAdded) form.button("§8Back", "textures/wan/redcave/ui/buttons/back");
    form.show(player).then((response) => {
      if (response.canceled) {
        return;
      }
      if (response.selection === void 0) return;
      if (backButtonAdded && response.selection === buttons.length) {
        backCallback();
        return;
      }
      callback(response.selection);
    });
  }
  UIHelpers2.showActionForm = showActionForm;
  function showModalForm(player, title, controls, callback, backCallback) {
    const form = new ModalFormData();
    form.title(title);
    for (const control of controls) {
      switch (control.type) {
        case "textField":
          form.textField(control.label, control.defaultValue ?? "");
          break;
        case "dropdown":
          form.dropdown(control.label, control.options ?? [], { defaultValueIndex: control.defaultValue ?? 0 });
          break;
        case "toggle":
          form.toggle(control.label, { defaultValue: control.defaultValue ?? false });
          break;
        case "slider":
          const sliderOptions = control.options;
          form.slider(control.label, (sliderOptions == null ? void 0 : sliderOptions.min) ?? 0, (sliderOptions == null ? void 0 : sliderOptions.max) ?? 100, { defaultValue: control.defaultValue ?? (sliderOptions == null ? void 0 : sliderOptions.min) ?? 0 });
          break;
      }
    }
    form.show(player).then((response) => {
      if (response.canceled) {
        return;
      }
    });
  }
  UIHelpers2.showModalForm = showModalForm;
  function showConfirmDialog(player, title, message, callback, backCallback) {
    const form = new MessageFormData();
    form.title(title);
    form.body(message);
    form.button1("§aYes");
    form.button2("§cNo");
    form.show(player).then((response) => {
      if (!response.canceled) {
        callback(response.selection === 0);
      } else {
        return;
      }
    });
  }
  UIHelpers2.showConfirmDialog = showConfirmDialog;
  function showInfoDialog(player, title, message, callback, backCallback) {
    const form = new MessageFormData();
    form.title(title);
    form.body(message);
    if (backCallback) {
      form.button1("§8Back");
    } else {
      form.button1("§aOkay");
    }
    form.show(player).then((response) => {
      if (!response.canceled) {
        if (backCallback) {
          backCallback();
        } else if (callback) {
          callback();
        }
      } else {
        return;
      }
    });
  }
  UIHelpers2.showInfoDialog = showInfoDialog;
})(UIHelpers || (UIHelpers = {}));
var MachineIOType = /* @__PURE__ */ ((MachineIOType2) => {
  MachineIOType2["INPUT_OUTPUT"] = "input_output";
  MachineIOType2["OUTPUT_ONLY"] = "output_only";
  MachineIOType2["CUSTOM"] = "custom";
  return MachineIOType2;
})(MachineIOType || {});
class MachineBase {
  // -------------------------------------------------------------------------
  // --- CONSTRUCTOR ---
  // -------------------------------------------------------------------------
  constructor(data) {
    // -------------------------------------------------------------------------
    // --- PERSISTENT FIELDS (PUBLIC) ---
    // -------------------------------------------------------------------------
    __publicField(this, "id");
    __publicField(this, "typeId");
    __publicField(this, "location");
    __publicField(this, "name");
    __publicField(this, "whitelist");
    __publicField(this, "input");
    // Container link(s) for input
    __publicField(this, "output");
    // Container link(s) for output
    __publicField(this, "config");
    __publicField(this, "lastProcessedItem");
    __publicField(this, "processingTicks", 0);
    __publicField(this, "processingItemId");
    __publicField(this, "processingOutputId");
    __publicField(this, "processingOutputAmount");
    // Internal State Fields (Protected/Private)
    __publicField(this, "_isInNetwork", false);
    __publicField(this, "_visualState", WanRedcaveStatus.Offline);
    __publicField(this, "_isRunning", false);
    __publicField(this, "_workingBufferTicks", 0);
    // Buffer to keep visual state "Working" for a moment
    // Stores the initial data payload to persist unknown fields via spread operator
    __publicField(this, "_initialData");
    this.id = data.id;
    this.typeId = data.typeId;
    this.location = data.location;
    this.name = data.name;
    this.whitelist = data.whitelist ?? [];
    this.input = data.input;
    this.output = data.output;
    this.config = data.config;
    this.lastProcessedItem = data.lastProcessedItem === 0 ? void 0 : data.lastProcessedItem;
    this.processingTicks = data.processingTicks ?? 0;
    this.processingItemId = data.processingItemId;
    this.processingOutputId = data.processingOutputId;
    this.processingOutputAmount = data.processingOutputAmount;
    this._initialData = data;
  }
  // -------------------------------------------------------------------------
  // --- DATA HANDLING & PERSISTENCE (PUBLIC API) ---
  // -------------------------------------------------------------------------
  /**
    * Loads extended data from save. Implemented by subclasses.
    */
  loadFromData(data) {
  }
  /**
    * Converts the current machine instance state into a serializable MachineData object.
    * This method saves all common MachineBase properties and is called by subclasses via super.serialize().
    */
  serialize() {
    return {
      // Spread initial data to preserve fields unknown to MachineBase (e.g., Quarry-specific fields)
      ...this._initialData,
      id: this.id,
      typeId: this.typeId,
      location: this.location,
      name: this.name,
      whitelist: this.whitelist,
      input: this.input,
      output: this.output,
      // Ensure config is present for persistence
      config: this.config ?? { baseInputId: 0, resultId: 0, energyCost: 0 },
      lastProcessedItem: this.lastProcessedItem ?? 0,
      processingTicks: this.processingTicks,
      processingItemId: this.processingItemId,
      processingOutputId: this.processingOutputId,
      processingOutputAmount: this.processingOutputAmount
    };
  }
  /**
    * Triggers the persistence mechanism to save all machine data to the world.
    */
  save() {
    MachineRegistry.saveToWorld();
  }
  // -------------------------------------------------------------------------
  // --- CORE TICK LOGIC ---
  // -------------------------------------------------------------------------
  /**
    * Main tick loop executed every game tick. Handles validation, state checks, and calls the abstract `processTick`.
    */
  tick() {
    const block = this.getBlock();
    if (!block) return;
    if (block.typeId !== this.typeId) {
      MachineRegistry.remove(this.id);
      return;
    }
    this.checkAndCorrectLinks();
    const ioType = this.getIOType();
    const hasInput = this.input && (Array.isArray(this.input) ? this.input.length > 0 : true);
    const hasOutput = this.output && (Array.isArray(this.output) ? this.output.length > 0 : true);
    if (!this._isInNetwork) {
      this.clearProcessing();
      this.computeAndApplyVisualState(this._isInNetwork, false, false);
      return;
    }
    if (!this.getIsRunning()) {
      this.clearProcessing();
      this.computeAndApplyVisualState(this._isInNetwork, false, false);
      return;
    }
    if (ioType !== "custom") {
      let linksMissing = false;
      if (ioType === "input_output") {
        if (!hasInput || !hasOutput) {
          linksMissing = true;
        }
      } else if (ioType === "output_only") {
        if (!hasOutput) {
          linksMissing = true;
        }
      }
      if (linksMissing) {
        this.clearProcessing();
        this.computeAndApplyVisualState(this._isInNetwork, true, false);
        return;
      }
    }
    try {
      this.processTick();
    } catch (error) {
      console.error(`[Machine ${this.id}] Process error:`, error);
    }
    const powered = this.getIsRunning();
    const inNetwork = this._isInNetwork;
    const working = this.determineWorkingFlag();
    this.computeAndApplyVisualState(inNetwork, powered, working);
  }
  // -------------------------------------------------------------------------
  // --- CONTROL & STATUS (PUBLIC API) ---
  // -------------------------------------------------------------------------
  /**
   * Starts the machine's internal processing flag.
   */
  start() {
    this._isRunning = true;
  }
  /**
   * Stops the machine's internal processing flag.
   */
  stop() {
    this._isRunning = false;
  }
  /**
   * Returns the current running state of the machine (i.e., should it try to process).
   */
  getIsRunning() {
    return this._isRunning;
  }
  /**
  * Forces an immediate visual state update without waiting for the next tick.
  * Called by the energy distribution system when power status changes.
  */
  forceVisualUpdate() {
    const working = this.determineWorkingFlag();
    this.computeAndApplyVisualState(this._isInNetwork, this._isRunning, working);
  }
  /**
   * Temporarily sets the machine to "working" state for visual feedback.
   */
  startWorking() {
    this._workingBufferTicks = 60;
  }
  /**
   * Stops the temporary working state.
   */
  stopWorking() {
    this._workingBufferTicks = 0;
  }
  /**
   * Returns the I/O capability type of this machine.
   * Can be overridden by subclasses (e.g., Quarry might be OUTPUT_ONLY).
   */
  getIOType() {
    return "input_output";
  }
  /**
   * Updates the machine's network connectivity status.
   * @param inNetwork True if the machine is connected to a power network.
   */
  setNetworkStatus(inNetwork) {
    this._isInNetwork = inNetwork;
  }
  /**
   * Checks if the machine is currently in the middle of a processing cycle.
   */
  isProcessing() {
    return this.processingItemId !== void 0;
  }
  // -------------------------------------------------------------------------
  // --- BLOCK UTILITIES ---
  // -------------------------------------------------------------------------
  /**
   * Retrieves the actual Minecraft Block instance at the machine's location.
   */
  getBlock() {
    return Utility.getBlockAt(this.location);
  }
  /**
   * Checks if the machine's block still exists in the world.
   */
  exists() {
    const block = this.getBlock();
    if (!block) return false;
    return block.typeId === this.typeId;
  }
  /**
   * Checks if linked container blocks still exist and are valid.
   */
  validateLinks() {
    const isLocationValid = (loc) => {
      if (!loc) return true;
      if (Array.isArray(loc)) {
        return loc.every((l) => Utility.isBlockValid(l));
      }
      return Utility.isBlockValid(loc);
    };
    return {
      inputValid: isLocationValid(this.input),
      outputValid: isLocationValid(this.output)
    };
  }
  // -------------------------------------------------------------------------
  // --- PROTECTED/INTERNAL PROCESSING METHODS ---
  // -------------------------------------------------------------------------
  /**
   * Sets the initial state for a new processing cycle.
   */
  startProcessing(inputId, outputId, outputAmount) {
    this.processingTicks = 0;
    this.processingItemId = inputId;
    this.processingOutputId = outputId;
    this.processingOutputAmount = outputAmount;
  }
  /**
   * Clears all processing state variables.
   */
  clearProcessing() {
    if (this.processingItemId) ;
    this.processingTicks = 0;
    this.processingItemId = void 0;
    this.processingOutputId = void 0;
    this.processingOutputAmount = void 0;
  }
  /**
   * Increments the processing tick count and checks if the process is complete.
   * @returns True if processing is complete.
   */
  advanceProgress(ticksPerProcess) {
    this.processingTicks++;
    return this.processingTicks >= ticksPerProcess;
  }
  // -------------------------------------------------------------------------
  // --- LINK CORRECTION & VISUAL STATE (INTERNAL LOGIC) ---
  // -------------------------------------------------------------------------
  /**
   * Checks if linked containers still exist and removes invalid links, then saves.
   */
  checkAndCorrectLinks() {
    if (this.getIOType() === "custom") {
      return;
    }
    let linksChanged = false;
    const isLinkKept = (loc) => {
      const block = Utility.getBlockAt(loc);
      if (!block) return true;
      return Utility.getContainerAt(loc) !== void 0;
    };
    const checkAndCorrect = (link, ioType) => {
      if (!link) return void 0;
      if (Array.isArray(link)) {
        const validLinks = link.filter((l) => isLinkKept(l));
        if (validLinks.length !== link.length) {
          linksChanged = true;
        }
        return validLinks.length > 0 ? validLinks : void 0;
      } else {
        if (!isLinkKept(link)) {
          linksChanged = true;
          return void 0;
        }
        return link;
      }
    };
    this.input = checkAndCorrect(this.input);
    this.output = checkAndCorrect(this.output);
    if (linksChanged) {
      this.save();
    }
  }
  /**
   * Determines the visual "Working" flag, using a short buffer to avoid flickering.
   */
  determineWorkingFlag() {
    const actuallyWorking = this.isProcessing();
    if (actuallyWorking) {
      this._workingBufferTicks = 3;
      return true;
    }
    if (this._workingBufferTicks > 0) {
      this._workingBufferTicks--;
      return true;
    }
    return false;
  }
  /**
   * Computes the new visual state based on network, power, working, and link status.
   */
  computeAndApplyVisualState(inNetwork, powered, working) {
    let newState = WanRedcaveStatus.Offline;
    if (!inNetwork) {
      newState = WanRedcaveStatus.Offline;
    } else if (!powered) {
      newState = WanRedcaveStatus.OnlineUnpowered;
    } else {
      const ioType = this.getIOType();
      const hasInput = this.input && (Array.isArray(this.input) ? this.input.length > 0 : true);
      const hasOutput = this.output && (Array.isArray(this.output) ? this.output.length > 0 : true);
      if (working) {
        newState = WanRedcaveStatus.Working;
      } else {
        if (ioType === "input_output") {
          if (!hasInput && !hasOutput) {
            newState = WanRedcaveStatus.OnlineNoLinks;
          } else if (!hasInput) {
            newState = WanRedcaveStatus.OnlineNoInput;
          } else if (!hasOutput) {
            newState = WanRedcaveStatus.OnlineNoOutput;
          } else {
            newState = WanRedcaveStatus.OnlinePowered;
          }
        } else if (ioType === "output_only") {
          if (!hasOutput) {
            newState = WanRedcaveStatus.OnlineNoOutput;
          } else {
            newState = WanRedcaveStatus.OnlinePowered;
          }
        } else {
          newState = WanRedcaveStatus.OnlinePowered;
        }
      }
    }
    if (newState !== this._visualState) {
      this._visualState = newState;
      this.updateVisualState();
    }
  }
  /**
   * Applies the current visual state to the corresponding Minecraft block permutation.
   */
  updateVisualState() {
    const block = this.getBlock();
    if (!block) return;
    try {
      const key = BlockState.WanRedcaveStatus;
      const value = this._visualState;
      const newPerm = block.permutation.withState(key, value);
      block.setPermutation(newPerm);
    } catch (e) {
    }
  }
  getBaseData() {
    return this._initialData;
  }
}
function formatDimensionLocation(loc) {
  var _a2;
  const dimId = (((_a2 = loc.dimension) == null ? void 0 : _a2.id) ?? MinecraftDimensionTypes.Overworld).toString().replace("minecraft:", "");
  return `§7[${loc.x}, ${loc.y}, ${loc.z}]§r (${dimId})`;
}
function isWithinCube(pos, center, range) {
  if (pos.dimension.id !== center.dimension.id) return false;
  const distance = getDistanceBetweenTwoVectors(
    { x: pos.x + 0.5, y: pos.y + 0.5, z: pos.z + 0.5 },
    { x: center.x + 0.5, y: center.y + 0.5, z: center.z + 0.5 }
  );
  return distance <= range;
}
const findNearbynetworkCore = (pos, networkCores) => networkCores == null ? void 0 : networkCores.find((a) => isWithinCube(pos, Utility.normalizeDimensionLocation(a.loc), ENERGYCONFIG.diameter / 2));
function hasRequiredOutputLink(machine) {
  const ioType = machine.getIOType();
  if (ioType !== MachineIOType.OUTPUT_ONLY) {
    return true;
  }
  return !!machine.output && (Array.isArray(machine.output) ? machine.output.length > 0 : true);
}
function processGeneratorFornetworkCore(genPos, networkCoresRaw, networkStatsMap, globals) {
  var _a2;
  const normalizedLoc = Utility.normalizeDimensionLocation(genPos.location);
  if (!normalizedLoc.dimension) return;
  const networkCore2 = findNearbynetworkCore(normalizedLoc, networkCoresRaw ?? []);
  if (!networkCore2) return;
  const networkCoreKey = `${networkCore2.loc.dimension.id}:${networkCore2.loc.x},${networkCore2.loc.y},${networkCore2.loc.z}`;
  const stats = networkStatsMap[networkCoreKey];
  if (!stats) return;
  try {
    const block = normalizedLoc.dimension.getBlock(normalizedLoc);
    if (!block || !ENERGYCONFIG.generators[block.typeId]) return;
    const typeId = block.typeId;
    const energy = ENERGYCONFIG.generators[typeId].energyPerTick;
    stats.totalSlots += energy;
    stats.generators.count++;
    stats.generators.totalOutput += energy;
    (_a2 = stats.generators.byType)[typeId] ?? (_a2[typeId] = { count: 0, output: 0 });
    stats.generators.byType[typeId].count++;
    stats.generators.byType[typeId].output += energy;
    globals.totalSlots += energy;
    globals.totalGenerators++;
  } catch {
  }
}
function processMachineFornetworkCore(typeId, cost, location, isPowered, networkCoresRaw, networkStatsMap, globals) {
  var _a2;
  const networkCore2 = findNearbynetworkCore(location, networkCoresRaw ?? []);
  if (!networkCore2) return;
  const networkCoreKey = `${networkCore2.loc.dimension.id}:${networkCore2.loc.x},${networkCore2.loc.y},${networkCore2.loc.z}`;
  const stats = networkStatsMap[networkCoreKey];
  if (!stats) return;
  stats.reservedSlots += cost;
  stats.machines.inRange++;
  globals.totalReserved += cost;
  globals.totalMachines++;
  if (isPowered) {
    stats.machines.powered++;
    globals.totalPowered++;
  } else {
    stats.machines.unpowered++;
  }
  (_a2 = stats.machines.byType)[typeId] ?? (_a2[typeId] = { total: 0, powered: 0, slotsRequired: 0 });
  stats.machines.byType[typeId].total++;
  if (isPowered) stats.machines.byType[typeId].powered++;
  stats.machines.byType[typeId].slotsRequired += cost;
}
function getEnergyNetworkStats() {
  var _a2, _b, _c, _d;
  const networkCoresRaw = networkCoresDB.find("networkCores") ?? [];
  const generatorsRaw = ((_a2 = MachinesDB.find("generators")) == null ? void 0 : _a2.generators) ?? [];
  const legacyMachinesRaw = ((_b = MachinesDB.find("machines")) == null ? void 0 : _b.machines) ?? [];
  const complexMachines = MachineRegistry.getAll();
  const networkCores = networkCoresRaw.map((a) => ({ ...a, loc: Utility.normalizeDimensionLocation(a.loc) }));
  const networkStatsMap = {};
  networkCores.forEach((networkCore2) => {
    const key = `${networkCore2.loc.dimension.id}:${networkCore2.loc.x},${networkCore2.loc.y},${networkCore2.loc.z}`;
    networkStatsMap[key] = {
      networkCoreLocation: formatDimensionLocation(networkCore2.loc),
      totalSlots: 0,
      reservedSlots: 0,
      availableSlots: 0,
      generators: { count: 0, totalOutput: 0, byType: {} },
      machines: { inRange: 0, powered: 0, unpowered: 0, byType: {} }
    };
  });
  const globals = { totalSlots: 0, totalReserved: 0, totalGenerators: 0, totalMachines: 0, totalPowered: 0 };
  for (const genPos of generatorsRaw) processGeneratorFornetworkCore(genPos, networkCoresRaw, networkStatsMap, globals);
  for (const machine of legacyMachinesRaw) {
    try {
      const loc = Utility.normalizeDimensionLocation(machine.location);
      const block = loc.dimension.getBlock(loc);
      if (!block) continue;
      const typeId = block.typeId;
      const cost = ((_c = Machines.find((m) => m.blockId === typeId)) == null ? void 0 : _c.energyCost) ?? 0;
      processMachineFornetworkCore(typeId, cost, loc, machine.active, networkCoresRaw, networkStatsMap, globals);
    } catch {
    }
  }
  for (const machine of complexMachines) {
    try {
      const block = machine.getBlock();
      if (!block) continue;
      const machineLoc = {
        x: block.location.x,
        y: block.location.y,
        z: block.location.z,
        dimension: block.dimension
      };
      const typeId = block.typeId;
      const cost = ((_d = Machines.find((m) => m.blockId === typeId)) == null ? void 0 : _d.energyCost) ?? 0;
      processMachineFornetworkCore(typeId, cost, machineLoc, machine.getIsRunning(), networkCoresRaw, networkStatsMap, globals);
    } catch {
    }
  }
  const networks = Object.values(networkStatsMap).map((n) => {
    n.availableSlots = n.totalSlots - n.reservedSlots;
    return n;
  });
  return {
    totalNetworks: networks.length,
    networks: networks.sort((a, b) => a.networkCoreLocation.localeCompare(b.networkCoreLocation)),
    // Sort for consistent UI
    summary: { ...globals }
  };
}
function findMachineNetwork(machineLocation) {
  const networkCoresRaw = networkCoresDB.find("networkCores") ?? [];
  const normalizedLoc = Utility.normalizeDimensionLocation(machineLocation);
  const covering = findNearbynetworkCore(normalizedLoc, networkCoresRaw);
  if (!covering) return null;
  const allStats = getEnergyNetworkStats();
  return allStats.networks.find((n) => n.networkCoreLocation === formatDimensionLocation(covering.loc)) ?? null;
}
function getMachineEnergyStatus(machine) {
  const isComplex = machine.getIsRunning !== void 0;
  let locationForCheck;
  let isCurrentlyRunning = false;
  let machineInstance = null;
  if (isComplex) {
    const m = machine;
    machineInstance = m;
    isCurrentlyRunning = m.getIsRunning();
    try {
      const block = m.getBlock();
      if (!block) return { isInNetwork: false, isPowered: false, reason: "out_of_network" };
      locationForCheck = { x: block.location.x, y: block.location.y, z: block.location.z, dimension: block.dimension };
    } catch {
      return { isInNetwork: false, isPowered: false, reason: "out_of_network" };
    }
  } else {
    const m = machine;
    locationForCheck = Utility.normalizeDimensionLocation(m.location);
    isCurrentlyRunning = m.active ?? false;
  }
  const network = findMachineNetwork(locationForCheck);
  if (!network) return { isInNetwork: false, isPowered: false, reason: "out_of_network" };
  if (isCurrentlyRunning) return { isInNetwork: true, isPowered: true, reason: "none" };
  if (network.totalSlots === 0) return { isInNetwork: true, isPowered: false, reason: "no_generators" };
  if (machineInstance && !hasRequiredOutputLink(machineInstance)) {
    return { isInNetwork: true, isPowered: false, reason: "missing_links" };
  }
  return { isInNetwork: true, isPowered: false, reason: "network_saturated" };
}
var MachineCategory = /* @__PURE__ */ ((MachineCategory2) => {
  MachineCategory2["SMELTING"] = "Smelting";
  MachineCategory2["CRUSHING"] = "Crushing";
  MachineCategory2["TRANSFER"] = "Transfer";
  MachineCategory2["FARMING"] = "Farming";
  MachineCategory2["MINING"] = "Mining";
  MachineCategory2["NETWORKACCESSPANEL"] = "Network Access Panel";
  return MachineCategory2;
})(MachineCategory || {});
const UISounds = {
  success: "random.orb",
  remove: "random.break"
};
function playUISound(player, sound) {
  try {
    player.playSound(sound);
  } catch (e) {
  }
}
const Icons = {
  add: "textures/wan/redcave/ui/buttons/add",
  back: "textures/wan/redcave/ui/buttons/back",
  category: "textures/wan/redcave/ui/buttons/crusher_t1",
  cleanup: "textures/wan/redcave/ui/buttons/clean_up",
  default: "textures/wan/redcave/ui/buttons/unpowered",
  edit: "textures/wan/redcave/ui/buttons/rename",
  filter: "textures/wan/redcave/ui/buttons/filter",
  info: "textures/wan/redcave/ui/buttons/info",
  link: "textures/wan/redcave/ui/buttons/links_and_filters",
  linkInput: "textures/wan/redcave/ui/buttons/input_arrow",
  linkOutput: "textures/wan/redcave/ui/buttons/output_arrow",
  powered: "textures/wan/redcave/ui/buttons/network_info",
  recipe: "textures/wan/redcave/ui/buttons/icon_recipe_item",
  remove: "textures/wan/redcave/ui/buttons/unpowered",
  search: "textures/wan/redcave/ui/buttons/magnifying_glass",
  stats: "textures/wan/redcave/ui/buttons/network_info",
  statusOff: "textures/wan/redcave/ui/buttons/unlinked",
  statusOn: "textures/wan/redcave/ui/buttons/linked",
  statusOutOfNetwork: "textures/wan/redcave/ui/buttons/no_network",
  statusUnlinked: "textures/wan/redcave/ui/buttons/no_links",
  transfer: "textures/wan/redcave/ui/buttons/input_and_output",
  trash: "textures/wan/redcave/ui/buttons/trash",
  whitelist: "textures/wan/redcave/ui/buttons/filter",
  smelting: "textures/wan/redcave/ui/buttons/electric_oven_t1",
  crushing: "textures/wan/redcave/ui/buttons/crusher_t1",
  farming: "textures/wan/redcave/ui/buttons/autofarmer_t1",
  mining: "textures/wan/redcave/ui/buttons/quarry",
  power: "textures/wan/redcave/ui/buttons/generator_t1",
  transfer_category: "textures/wan/redcave/ui/buttons/wireless_hopper",
  network_access_panel: "textures/wan/redcave/ui/buttons/network_access_panel",
  network: "textures/wan/redcave/ui/buttons/network_core",
  wheat: "textures/items/wheat",
  carrots: "textures/items/carrot",
  potatoes: "textures/items/potato",
  beetroots: "textures/items/beetroot",
  netherWart: "textures/items/nether_wart",
  pumpkin: "textures/blocks/pumpkin_side",
  melon: "textures/blocks/melon_side"
};
const Messages = {
  powered: "POWERED",
  unpowered: "UNPOWERED",
  working: "WORKING",
  outOfNetwork: "OUT OF NETWORK",
  noGenerators: "No Generators",
  networkOverload: "Network Overload",
  missingOutputLink: "Missing Output Link",
  linked: "Linked",
  notLinked: "Not Linked",
  linkRemoved: "Link Removed!",
  linkRenamed: "Link renamed!",
  machineRenamed: "Machine renamed to:",
  machineDestroyed: "Machine has been destroyed",
  whitelistActive: "Whitelist ACTIVE:",
  whitelistDisabled: "Whitelist DISABLED: All valid input items are allowed.",
  filterUpdated: "Filter updated!",
  filterCleared: "All filters cleared!",
  noItemsSelected: "No items selected",
  quarryStarted: "Quarry STARTED",
  quarryStopped: "Quarry STOPPED",
  particlesEnabled: "Particles ENABLED",
  particlesDisabled: "Particles DISABLED",
  selectContainer: (type) => `Click on a container for ${type}.`,
  cleanupComplete: (count) => count > 0 ? `Removed ${count} invalid machine(s) from the registry.` : "No invalid machines found."
};
const FormTitles = {
  machineInfo: "Machine Info",
  renameMachine: "Rename Machine",
  whitelist: "Whitelist",
  destroyMachine: "Destroy Machine",
  quarryControls: "Quarry Controls",
  wirelessHopper: "Wireless Hopper",
  inputLinks: "Input Links",
  outputLinks: "Output Links",
  renameLink: "Rename Link",
  itemFilter: "Item Filter",
  searchItems: "Search Items",
  networkManagement: "Network Management",
  cleanupComplete: "Cleanup Complete",
  energyNetworkInfo: "Energy Network Info",
  autoFarmerTier1: "Auto Farmer - Select Crop",
  autoFarmerTier2: "Auto Farmer II - Settings",
  autoFarmerWhitelist: "Crop Whitelist - Toggle"
};
const ButtonConfigs = {
  mainMenu: {
    destroy: { text: "Destroy Machine", iconPath: Icons.trash }
  },
  infoSubmenu: {
    networkStatus: { text: "Network Status", iconPath: Icons.powered },
    machineInfo: { text: "Machine Info", iconPath: Icons.info },
    rename: { text: "Rename Machine", iconPath: Icons.edit }
  },
  linksSubmenu: {
    manageLinks: { text: "Manage Links", iconPath: Icons.link },
    configureWhitelist: { text: "Configure Whitelist", iconPath: Icons.filter }
  },
  linking: {
    startLinking: { text: "Start Linking Mode", iconPath: Icons.link },
    removeInput: { text: "Remove Input Link", iconPath: Icons.remove },
    removeOutput: { text: "Remove Output Link", iconPath: Icons.remove }
  },
  wirelessHopper: {
    manageInputs: (count) => ({
      text: `Manage Input Links (${count}/5)`,
      iconPath: Icons.linkInput
    }),
    manageOutputs: (count) => ({
      text: `Manage Output Links (${count}/5)`,
      iconPath: Icons.linkOutput
    }),
    addInput: { text: "+ Add New Input Link", iconPath: Icons.add },
    addOutput: { text: "+ Add New Output Link", iconPath: Icons.add },
    configureFilter: (count) => ({
      text: `Configure Filter (${count} items)`,
      iconPath: Icons.filter
    }),
    renameLink: { text: "Rename Link", iconPath: Icons.edit },
    removeLink: { text: "Remove Link", iconPath: Icons.trash },
    clearFilters: (count) => ({
      text: `Clear ALL ${count} Filters`,
      iconPath: Icons.remove
    }),
    searchItem: { text: "Search Item", iconPath: Icons.search },
    seeFullList: { text: "See Full List", iconPath: Icons.filter }
  },
  network: {
    energyInfo: { text: "Energy Network Info", iconPath: Icons.powered },
    cleanup: { text: "Cleanup Invalid Machines", iconPath: Icons.cleanup }
  },
  special: {
    quarryControls: { text: "Quarry Controls", iconPath: Icons.mining },
    farmerConfig: { text: "Farmer Configuration", iconPath: Icons.farming }
  }
};
const Descriptions = {
  machineStatus: (powerStatus) => `Status: ${powerStatus}`,
  wirelessHopperMain: (inputCount, outputCount) => [
    "Configure multiple input and output",
    "containers with individual filters.",
    "",
    `Input Links: ${inputCount}/5`,
    `Output Links: ${outputCount}/5`
  ].join("\n"),
  wirelessHopperLinks: (count, max, isInput) => [
    `${isInput ? "Input" : "Output"} Links: ${count}/${max}`,
    "",
    "Select a link to configure its filter",
    "and minimum transfer amounts."
  ].join("\n"),
  linkConfig: (locStr, filterCount, isInput) => [
    `Location: ${locStr}`,
    `Filter: ${filterCount} items`,
    "",
    "Configure what items can be",
    `transferred ${isInput ? "from" : "to"} this container.`
  ].join("\n"),
  filterMenu: (filterCount) => [
    `Active Filters: ${filterCount} items`,
    "",
    "Use search to quickly find items,",
    "or browse the full item list."
  ].join("\n"),
  destroyMachineWarning: (machineName) => `Are you sure you want to destroy ${machineName}?

This will remove the machine from the registry and clear all links.

You will still need to break the physical block.`,
  removeLinkWarning: (linkName, type) => `Are you sure you want to remove:
${linkName}?

This will clear all filters and settings.`,
  linkManagement: (status) => status,
  linkManagementOutputOnly: (status) => status
};
const FormBodies = {
  autoFarmerTier1Body: "Select a crop to farm:",
  autoFarmerWhitelistBody: (isEnabled) => {
    return isEnabled ? "Whitelist is §aENABLED§r. Only selected crops will be harvested. Select a crop to toggle it." : "Whitelist is §eDISABLED§r. All crops will be harvested. Select a crop to enable the whitelist.";
  },
  autoFarmerWhitelistStatus: (count) => {
    if (count === 0) {
      return "§eDISABLED (All Crops)";
    }
    return `§aENABLED (${count} crop${count === 1 ? "" : "s"})`;
  }
};
function getCropIcon(displayName) {
  const lower = displayName.toLowerCase();
  if (lower.includes("wheat")) return "wheat";
  if (lower.includes("carrot")) return "carrots";
  if (lower.includes("potato")) return "potatoes";
  if (lower.includes("beetroot")) return "beetroots";
  if (lower.includes("nether wart")) return "netherWart";
  if (lower.includes("pumpkin")) return "pumpkin";
  if (lower.includes("melon")) return "melon";
  return "farming";
}
function formatLinkStatusForUI(fullStatusString, isOutputOnly) {
  const colorLinked = "§a";
  const colorNotLinked = "§c";
  const colorReset = "§r";
  const cleanString = fullStatusString.replace(/§[0-9a-fklmnor]/gi, "");
  const findAndColorStatus = (statusType) => {
    const lowerClean = cleanString.toLowerCase();
    const pattern = new RegExp(`${statusType}:\\s*(not\\s+linked|linked)`, "i");
    const match = lowerClean.match(pattern);
    const isLinked = match && match[1] && !match[1].includes("not");
    const color = isLinked ? colorLinked : colorNotLinked;
    const status = isLinked ? Messages.linked : Messages.notLinked;
    return `${color}${status}${colorReset}`;
  };
  const inputStatus = findAndColorStatus("input");
  const outputStatus = findAndColorStatus("output");
  const title = "§lLink Status:§r\n";
  if (isOutputOnly) {
    return `${title}Output Link: ${outputStatus}`;
  }
  return `${title}Input Link: ${inputStatus} | Output Link: ${outputStatus}`;
}
const HOPPER_CONFIG = {
  MAX_INPUT_LINKS: 5,
  MAX_OUTPUT_LINKS: 5,
  TRANSFER_COOLDOWN: 10,
  // 10 ticks = 0.5 seconds (vanilla hopper is 8 ticks = 0.4s)
  ITEMS_PER_TRANSFER: 1
  // Transfer 1 item at a time (vanilla behavior)
};
class ItemCategories {
  /**
   * Internal method to compute or retrieve the full list of all valid filterable items from cache.
   * This heavy operation is performed only once to avoid tick timeouts.
   */
  static getFullFilterableList() {
    if (this.cachedAllFilterableItems) {
      return this.cachedAllFilterableItems;
    }
    const allValidItems = Object.values(MinecraftItemTypes).filter(
      (item) => !this.EXCLUDED_ITEMS.includes(item)
    );
    this.cachedAllFilterableItems = allValidItems;
    return allValidItems;
  }
  /**
   * Filters all valid items by a search query and supports paging.
   * @param query The string to search for (case-insensitive).
   * @param page The 0-based index of the page.
   * @param itemsPerPage The number of items per page.
   * @returns An object containing the current page of items and the total count.
   */
  static searchItems(query, page = 0, itemsPerPage = this.DEFAULT_ITEMS_PER_PAGE) {
    const fullList = this.getFullFilterableList();
    const lowerQuery = query.toLowerCase().trim();
    const filteredList = lowerQuery === "" ? fullList : fullList.filter(
      (itemTypeId) => itemTypeId.toLowerCase().includes(lowerQuery)
    );
    const totalCount = filteredList.length;
    const start = page * itemsPerPage;
    const pagedItems = filteredList.slice(start, start + itemsPerPage);
    return { items: pagedItems, totalCount };
  }
}
// Static cache for the full list of all valid, filterable items.
__publicField(ItemCategories, "cachedAllFilterableItems", null);
__publicField(ItemCategories, "DEFAULT_ITEMS_PER_PAGE", 50);
__publicField(ItemCategories, "EXCLUDED_ITEMS", [
  // Technical Blocks
  MinecraftBlockTypes.CommandBlock,
  MinecraftBlockTypes.ChainCommandBlock,
  MinecraftBlockTypes.RepeatingCommandBlock,
  MinecraftBlockTypes.StructureBlock,
  MinecraftBlockTypes.StructureVoid,
  MinecraftBlockTypes.Barrier,
  // List of light blocks
  MinecraftBlockTypes.LightBlock0,
  MinecraftBlockTypes.LightBlock1,
  MinecraftBlockTypes.LightBlock2,
  MinecraftBlockTypes.LightBlock3,
  MinecraftBlockTypes.LightBlock4,
  MinecraftBlockTypes.LightBlock5,
  MinecraftBlockTypes.LightBlock6,
  MinecraftBlockTypes.LightBlock7,
  MinecraftBlockTypes.LightBlock8,
  MinecraftBlockTypes.LightBlock9,
  MinecraftBlockTypes.LightBlock10,
  MinecraftBlockTypes.LightBlock11,
  MinecraftBlockTypes.LightBlock12,
  MinecraftBlockTypes.LightBlock13,
  MinecraftBlockTypes.LightBlock14,
  MinecraftBlockTypes.LightBlock15,
  MinecraftBlockTypes.Jigsaw,
  MinecraftBlockTypes.BorderBlock,
  MinecraftBlockTypes.MobSpawner,
  MinecraftBlockTypes.Bedrock,
  MinecraftBlockTypes.Air,
  // Legacy/Unobtainable Items
  MinecraftItemTypes.PetrifiedOakSlab,
  MinecraftItemTypes.ZombieHead,
  MinecraftItemTypes.SkeletonSkull,
  MinecraftItemTypes.WitherSkeletonSkull,
  MinecraftItemTypes.CreeperHead,
  MinecraftItemTypes.DragonHead,
  MinecraftBlockTypes.EndPortal,
  MinecraftBlockTypes.PistonArmCollision,
  MinecraftBlockTypes.Water,
  MinecraftBlockTypes.Lava,
  MinecraftBlockTypes.Fire
]);
class WirelessHopper extends MachineBase {
  //Indicates if a transfer just occurred
  // =========================================================================
  // LIFECYCLE & DATA SERIALIZATION
  // =========================================================================
  /**
   * Initializes the WirelessHopper machine.
   * @param data The machine's saved data.
   */
  constructor(data) {
    super(data);
    // Link management
    __publicField(this, "inputLinks", []);
    __publicField(this, "outputLinks", []);
    // Transfer state
    __publicField(this, "lastOutputIndex", 0);
    // Round-robin distribution tracker
    __publicField(this, "transferCooldown", 0);
    // Ticks remaining before next transfer
    __publicField(this, "isTransferring", false);
    this.inputLinks = data.inputLinks ?? [];
    this.outputLinks = data.outputLinks ?? [];
    this.lastOutputIndex = data.lastOutputIndex ?? 0;
    this.transferCooldown = 0;
  }
  /**
   * Serializes the current state of the machine.
   * @returns The data structure for saving.
   */
  serialize() {
    const base = super.serialize();
    return {
      ...base,
      inputLinks: this.inputLinks,
      outputLinks: this.outputLinks,
      lastOutputIndex: this.lastOutputIndex
    };
  }
  // =========================================================================
  // MACHINE BEHAVIOR OVERRIDES
  // =========================================================================
  /**
   * Wireless Hopper uses custom link management (not base class input/output).
   */
  getIOType() {
    return MachineIOType.CUSTOM;
  }
  /**
   * Validate custom link arrays instead of base input/output.
   */
  validateLinks() {
    const validateLinkArray = (links) => {
      if (links.length === 0) return false;
      return links.every((link) => Utility.isBlockValid(link.location));
    };
    return {
      inputValid: validateLinkArray(this.inputLinks),
      outputValid: validateLinkArray(this.outputLinks)
    };
  }
  /**
  * Override to signal "working" state when actively transferring items.
  */
  isProcessing() {
    return this.isTransferring;
  }
  // =========================================================================
  // LINK MANAGEMENT API
  // =========================================================================
  /** Creates a default hopper link object. */
  createDefaultLink(index, isInput) {
    return {
      location: {},
      // location is set by caller
      whitelist: [],
      minAmounts: {},
      name: `${isInput ? "Input" : "Output"} ${index + 1}`
    };
  }
  /** Adds a new input link to a container location. */
  addInputLink(location) {
    if (this.inputLinks.length >= HOPPER_CONFIG.MAX_INPUT_LINKS) {
      return false;
    }
    const newLink = this.createDefaultLink(this.inputLinks.length, true);
    newLink.location = location;
    this.inputLinks.push(newLink);
    return true;
  }
  /** Adds a new output link to a container location. */
  addOutputLink(location) {
    if (this.outputLinks.length >= HOPPER_CONFIG.MAX_OUTPUT_LINKS) {
      return false;
    }
    const newLink = this.createDefaultLink(this.outputLinks.length, false);
    newLink.location = location;
    this.outputLinks.push(newLink);
    return true;
  }
  /** Removes an input link by index. */
  removeInputLink(index) {
    if (index >= 0 && index < this.inputLinks.length) {
      this.inputLinks.splice(index, 1);
    }
  }
  /** Removes an output link by index. */
  removeOutputLink(index) {
    if (index >= 0 && index < this.outputLinks.length) {
      this.outputLinks.splice(index, 1);
    }
  }
  /** Updates a specific input or output link configuration. */
  updateLink(isInput, index, updates) {
    const links = isInput ? this.inputLinks : this.outputLinks;
    if (index >= 0 && index < links.length) {
      links[index] = { ...links[index], ...updates };
    }
  }
  // =========================================================================
  // CORE PROCESSING LOGIC
  // =========================================================================
  /**
   * Executes the machine's primary logic on each tick.
   */
  processTick() {
    if (!this.getIsRunning()) {
      this.isTransferring = false;
      return;
    }
    const linksRemoved = this.cleanupInvalidLinks();
    if (linksRemoved.input + linksRemoved.output > 0) {
      this.save();
    }
    if (this.inputLinks.length === 0 || this.outputLinks.length === 0) return;
    if (this.transferCooldown > 0) {
      this.transferCooldown--;
      return;
    }
    this.transferCooldown = HOPPER_CONFIG.TRANSFER_COOLDOWN;
    const inputContainers = this.getContainersFromLinks(this.inputLinks);
    const outputContainers = this.getContainersFromLinks(this.outputLinks);
    if (inputContainers.length === 0 || outputContainers.length === 0) return;
    this.performTransfer(inputContainers, outputContainers);
  }
  // =========================================================================
  // TRANSFER LOGIC - INTERNAL
  // =========================================================================
  /**
   * Removes links where the linked container no longer exists.
   * @returns The number of input and output links removed.
   */
  cleanupInvalidLinks() {
    const validateAndFilter = (links) => {
      const originalCount = links.length;
      const validLinks = links.filter((link) => {
        const container = Utility.getContainerAt(link.location);
        return container !== void 0;
      });
      return [validLinks, originalCount - validLinks.length];
    };
    const [newInputLinks, inputRemoved] = validateAndFilter(this.inputLinks);
    const [newOutputLinks, outputRemoved] = validateAndFilter(this.outputLinks);
    this.inputLinks = newInputLinks;
    this.outputLinks = newOutputLinks;
    return { input: inputRemoved, output: outputRemoved };
  }
  /**
   * Get containers from link array, filtering out invalid ones.
   */
  getContainersFromLinks(links) {
    const result = [];
    for (const link of links) {
      const container = Utility.getContainerAt(link.location);
      if (container) {
        result.push({ container, link });
      }
    }
    return result;
  }
  /**
   * Main transfer logic - iterate through all input containers and slots.
   */
  performTransfer(inputs, outputs) {
    this.isTransferring = false;
    for (const { container: inputContainer, link: inputLink } of inputs) {
      for (let slot = 0; slot < inputContainer.size; slot++) {
        const item = inputContainer.getItem(slot);
        if (!item) continue;
        const itemId = ItemDB.getIdByItem(item.typeId);
        const inputWhitelist = inputLink.whitelist;
        if (inputWhitelist.length > 0 && !inputWhitelist.includes(itemId)) {
          continue;
        }
        const minToKeep = inputLink.minAmounts[itemId] ?? 0;
        const availableToTransfer = item.amount - minToKeep;
        if (availableToTransfer < HOPPER_CONFIG.ITEMS_PER_TRANSFER) {
          continue;
        }
        const transferred = this.transferItemToOutputs(
          item,
          inputContainer,
          slot,
          outputs
        );
        if (transferred) {
          this.isTransferring = true;
          return;
        }
      }
    }
  }
  /**
   * Transfer item to output containers using round-robin distribution.
   * Transfers only ITEMS_PER_TRANSFER items at a time.
   */
  transferItemToOutputs(item, inputContainer, inputSlot, outputs) {
    const itemId = ItemDB.getIdByItem(item.typeId);
    const startIndex = this.lastOutputIndex;
    let attempts = 0;
    while (attempts < outputs.length) {
      const currentIndex = (startIndex + attempts) % outputs.length;
      const { container: outputContainer, link: outputLink } = outputs[currentIndex];
      if (outputLink.whitelist.length > 0 && !outputLink.whitelist.includes(itemId)) {
        attempts++;
        continue;
      }
      const maxAllowed = outputLink.minAmounts[itemId] ?? Infinity;
      const currentAmount = this.countItemInContainer(outputContainer, item.typeId);
      if (currentAmount >= maxAllowed) {
        attempts++;
        continue;
      }
      const success = this.tryTransferToContainer(
        item,
        inputContainer,
        inputSlot,
        outputContainer,
        maxAllowed - currentAmount
        // Pass remaining space before hitting limit
      );
      if (success) {
        this.lastOutputIndex = (currentIndex + 1) % outputs.length;
        return true;
      }
      attempts++;
    }
    return false;
  }
  /**
   * Counts total amount of a specific item in a container.
   */
  countItemInContainer(container, itemTypeId) {
    let total = 0;
    for (let i = 0; i < container.size; i++) {
      const item = container.getItem(i);
      if (item && item.typeId === itemTypeId) {
        total += item.amount;
      }
    }
    return total;
  }
  /**
   * Attempt to transfer items from input slot to output container.
   * Returns true if at least 1 item was transferred.
   * @param maxTransfer Maximum number of items that can be transferred (respects output limit)
   */
  tryTransferToContainer(item, inputContainer, inputSlot, outputContainer, maxTransfer = Infinity) {
    const transferAmount = Math.min(
      HOPPER_CONFIG.ITEMS_PER_TRANSFER,
      item.amount,
      maxTransfer
      // Respect output container limit
    );
    if (transferAmount <= 0) return false;
    for (let outSlot = 0; outSlot < outputContainer.size; outSlot++) {
      const targetItem = outputContainer.getItem(outSlot);
      if (!targetItem) {
        const newStack = item.clone();
        newStack.amount = transferAmount;
        outputContainer.setItem(outSlot, newStack);
        if (item.amount === transferAmount) {
          inputContainer.setItem(inputSlot, void 0);
        } else {
          item.amount -= transferAmount;
          inputContainer.setItem(inputSlot, item);
        }
        return true;
      }
      if (targetItem.typeId === item.typeId) {
        const maxStack = targetItem.maxAmount;
        const spaceAvailable = maxStack - targetItem.amount;
        if (spaceAvailable > 0) {
          const amountToAdd = Math.min(transferAmount, spaceAvailable);
          targetItem.amount += amountToAdd;
          outputContainer.setItem(outSlot, targetItem);
          if (item.amount === amountToAdd) {
            inputContainer.setItem(inputSlot, void 0);
          } else {
            item.amount -= amountToAdd;
            inputContainer.setItem(inputSlot, item);
          }
          return true;
        }
      }
    }
    return false;
  }
  /**
  * Checks if the given location is registered as an input link.
  * @param location The MachineLocation to check.
  * @returns True if the link exists.
  */
  hasInputLink(location) {
    if (!this.inputLinks) return false;
    return this.inputLinks.some((link) => Utility.locationsEqual(link.location, location));
  }
  /**
   * Checks if the given location is registered as an output link.
   * @param location The MachineLocation to check.
   * @returns True if the link exists.
   */
  hasOutputLink(location) {
    if (!this.outputLinks) return false;
    return this.outputLinks.some((link) => Utility.locationsEqual(link.location, location));
  }
}
class MachineFormBuilder {
  constructor(player) {
    __publicField(this, "title", "");
    __publicField(this, "description", []);
    __publicField(this, "buttons", []);
    __publicField(this, "backCallback");
    this.player = player;
  }
  /**
   * Set the form title
   */
  setTitle(title) {
    this.title = title;
    return this;
  }
  /**
   * Add a line to the description
   */
  addDescription(line) {
    this.description.push(line);
    return this;
  }
  /**
   * It adds more lines to the description
   */
  addDescriptions(lines) {
    this.description.push(...lines);
    return this;
  }
  /**
   * Adds a button with action
   */
  addButton(button, action) {
    this.buttons.push({ button, action });
    return this;
  }
  /**
   * Adds a button conditionally
   */
  addButtonIf(condition, button, action) {
    if (condition) {
      this.addButton(button, action);
    }
    return this;
  }
  /**
   * Adds standard buttons for machines
   */
  addStandardMachineButtons(machine, config, callbacks) {
    if (config.customButtons) {
      config.customButtons.forEach(({ button, action }) => {
        this.addButton(button, action);
      });
    }
    if (config.showNetworkStatus && callbacks.onNetworkStatus) {
      this.addButton(ButtonConfigs.infoSubmenu.networkStatus, callbacks.onNetworkStatus);
    }
    if (config.showManageLinks && callbacks.onManageLinks) {
      this.addButton(ButtonConfigs.linksSubmenu.manageLinks, callbacks.onManageLinks);
    }
    if (config.showWhitelist && callbacks.onWhitelist) {
      this.addButton(ButtonConfigs.linksSubmenu.configureWhitelist, callbacks.onWhitelist);
    }
    if (config.showRename && callbacks.onRename) {
      this.addButton(ButtonConfigs.infoSubmenu.rename, callbacks.onRename);
    }
    if (config.showInfo && callbacks.onInfo) {
      this.addButton(ButtonConfigs.infoSubmenu.machineInfo, callbacks.onInfo);
    }
    if (config.showDestroy && callbacks.onDestroy) {
      this.addButton(ButtonConfigs.mainMenu.destroy, callbacks.onDestroy);
    }
    return this;
  }
  /**
   * Set the callback for the back button
   */
  setBackCallback(callback) {
    this.backCallback = callback;
    return this;
  }
  /**
   * Constructs and displays the form
   */
  show() {
    const buttons = this.buttons.map((ba) => ba.button);
    const body = this.description.join("\n");
    UIHelpers.showActionForm(
      this.player,
      this.title,
      body,
      buttons,
      (selection) => {
        var _a2;
        (_a2 = this.buttons[selection]) == null ? void 0 : _a2.action();
      },
      this.backCallback
    );
  }
  /**
  * Wraps all button actions with a callback that runs before each action
  */
  wrapAllActions(wrapper) {
    this.buttons = this.buttons.map((btnAction) => ({
      button: btnAction.button,
      action: () => {
        wrapper(btnAction.action);
      }
    }));
    return this;
  }
  /**
   * Wraps the back callback with additional logic
   */
  wrapBackCallback(wrapper) {
    const original = this.backCallback;
    this.backCallback = () => wrapper(original);
    return this;
  }
}
class LinkManagementFormBuilder {
  constructor(player) {
    __publicField(this, "links", []);
    __publicField(this, "maxLinks", 5);
    __publicField(this, "isInput", true);
    __publicField(this, "onAddLinkCallback");
    __publicField(this, "onSelectLinkCallback");
    __publicField(this, "backCallback");
    this.player = player;
  }
  /**
   * Set whether to handle input or output links
   */
  setLinkType(isInput) {
    this.isInput = isInput;
    return this;
  }
  /**
   * Set the maximum number of links
   */
  setMaxLinks(max) {
    this.maxLinks = max;
    return this;
  }
  /**
   * Add a link to the list
   */
  addLink(name, location, filterCount) {
    this.links.push({ name, location, filterCount });
    return this;
  }
  /**
   * Set the callback to add a new link
   */
  onAdd(callback) {
    this.onAddLinkCallback = callback;
    return this;
  }
  /**
   * Set the callback to select an existing link
   */
  onSelectLink(callback) {
    this.onSelectLinkCallback = callback;
    return this;
  }
  /**
   * Set the callback for the back button
   */
  setBackCallback(callback) {
    this.backCallback = callback;
    return this;
  }
  /**
   * Constructs and displays the form
   */
  show() {
    const buttons = [
      this.isInput ? ButtonConfigs.wirelessHopper.addInput : ButtonConfigs.wirelessHopper.addOutput
    ];
    this.links.forEach((link, index) => {
      const locStr = `§8(${link.location.x}, ${link.location.y}, ${link.location.z})`;
      const filterText = link.filterCount > 0 ? `§eFilter: ${link.filterCount}` : "§7No Filter";
      buttons.push({
        text: `§f${link.name || `${this.isInput ? "Input" : "Output"} ${index + 1}`}
§8${locStr} §7| ${filterText}`,
        iconPath: this.isInput ? Icons.linkInput : Icons.linkOutput
      });
    });
    const description = Descriptions.wirelessHopperLinks(
      this.links.length,
      this.maxLinks,
      this.isInput
    );
    const title = this.isInput ? FormTitles.inputLinks : FormTitles.outputLinks;
    UIHelpers.showActionForm(
      this.player,
      title,
      description,
      buttons,
      (selection) => {
        if (selection === 0 && this.onAddLinkCallback) {
          this.onAddLinkCallback();
        } else if (this.onSelectLinkCallback) {
          this.onSelectLinkCallback(selection - 1);
        }
      },
      this.backCallback
    );
  }
}
function showRemoveLinkConfirmation(player, linkName, isInput, onConfirm, onCancel) {
  const type = isInput ? "Input" : "Output";
  const displayName = linkName || type;
  UIHelpers.showConfirmDialog(
    player,
    "§cRemove Link",
    Descriptions.removeLinkWarning(displayName, type),
    (confirmed) => {
      if (confirmed) {
        onConfirm();
      } else {
        onCancel();
      }
    },
    onCancel
  );
}
function showDestroyMachineConfirmation(player, machineName, onConfirm, onCancel) {
  UIHelpers.showConfirmDialog(
    player,
    FormTitles.destroyMachine,
    Descriptions.destroyMachineWarning(machineName),
    (confirmed) => {
      if (confirmed) {
        onConfirm();
      } else {
        onCancel();
      }
    },
    onCancel
  );
}
function getReadableItemName(itemId) {
  const rawId = ItemDB.getItemById(itemId) || "Unknown Item";
  return rawId.replace("minecraft:", "").replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}
const _WirelessHopperFormBuilder = class _WirelessHopperFormBuilder {
  constructor(player, machine, onBackToMachine) {
    this.player = player;
    this.machine = machine;
    this.onBackToMachine = onBackToMachine;
  }
  // ========================================================================
  // MAIN FORM
  // ========================================================================
  /**
   * Show main Wireless Hopper configuration form
   */
  showMainForm() {
    const inputCount = this.machine.inputLinks.length;
    const outputCount = this.machine.outputLinks.length;
    const builder = new MachineFormBuilder(this.player).setTitle(FormTitles.wirelessHopper).addDescription(Descriptions.wirelessHopperMain(inputCount, outputCount)).setBackCallback(this.onBackToMachine);
    const inputButton = ButtonConfigs.wirelessHopper.manageInputs(inputCount);
    builder.addButton(inputButton, () => {
      this.showLinkManagement(true);
    });
    const outputButton = ButtonConfigs.wirelessHopper.manageOutputs(outputCount);
    builder.addButton(outputButton, () => {
      this.showLinkManagement(false);
    });
    builder.show();
  }
  // ========================================================================
  // LINK MANAGEMENT (INPUT/OUTPUT)
  // ========================================================================
  /**
   * Show link management form (unified for input/output)
   */
  showLinkManagement(isInput) {
    const links = isInput ? this.machine.inputLinks : this.machine.outputLinks;
    const builder = new LinkManagementFormBuilder(this.player).setLinkType(isInput).setMaxLinks(5).onAdd(() => this.startLinkingMode(isInput)).onSelectLink((index) => this.showLinkConfig(isInput, index)).setBackCallback(() => this.showMainForm());
    links.forEach((link) => {
      builder.addLink(link.name || "", link.location, link.whitelist.length);
    });
    builder.show();
  }
  /**
   * Start linking mode for adding new link
   */
  startLinkingMode(isInput) {
    this.player.setDynamicProperty(
      "wan_redcave:pending_hopper_link",
      JSON.stringify({
        machineId: this.machine.id,
        isInput
      })
    );
    const type = isInput ? "Input" : "Output";
    Utility.notify(this.player, Messages.selectContainer(type), "info");
  }
  // ========================================================================
  // LINK CONFIGURATION
  // ========================================================================
  /**
   * Show configuration form for a specific link
   */
  showLinkConfig(isInput, linkIndex) {
    const links = isInput ? this.machine.inputLinks : this.machine.outputLinks;
    const link = links[linkIndex];
    if (!link) return;
    const back = () => this.showLinkManagement(isInput);
    const loc = link.location;
    const locStr = `§8(${loc.x}, ${loc.y}, ${loc.z})`;
    const filterCount = link.whitelist.length;
    const builder = new MachineFormBuilder(this.player).setTitle(`§l${link.name || (isInput ? "Input Link" : "Output Link")}`).addDescription(Descriptions.linkConfig(locStr, filterCount, isInput)).setBackCallback(back);
    builder.addButton(
      ButtonConfigs.wirelessHopper.configureFilter(filterCount),
      () => {
        this.showFilterMenu(isInput, linkIndex);
      }
    );
    builder.addButton(
      ButtonConfigs.wirelessHopper.renameLink,
      () => this.showRenameLink(isInput, linkIndex)
    );
    builder.addButton(
      ButtonConfigs.wirelessHopper.removeLink,
      () => this.confirmRemoveLink(isInput, linkIndex)
    );
    builder.show();
  }
  /**
   * Show rename link form
   */
  showRenameLink(isInput, linkIndex) {
    const links = isInput ? this.machine.inputLinks : this.machine.outputLinks;
    const link = links[linkIndex];
    const back = () => this.showLinkConfig(isInput, linkIndex);
    const form = new ModalFormData().title(FormTitles.renameLink).textField("§8Link Name:", "e.g. Cobblestone Storage", { defaultValue: link.name || "" });
    form.show(this.player).then((response) => {
      var _a2, _b;
      if (response.canceled) {
        back();
        return;
      }
      const newName = (_b = (_a2 = response.formValues) == null ? void 0 : _a2[0]) == null ? void 0 : _b.trim();
      if (newName) {
        this.machine.updateLink(isInput, linkIndex, { name: newName });
        MachineRegistry.saveToWorld();
        Utility.notify(this.player, Messages.linkRenamed, "success");
      }
      back();
    });
  }
  /**
   * Confirm link removal
   */
  confirmRemoveLink(isInput, linkIndex) {
    const links = isInput ? this.machine.inputLinks : this.machine.outputLinks;
    const link = links[linkIndex];
    const type = isInput ? "Input" : "Output";
    const back = () => this.showLinkManagement(isInput);
    showRemoveLinkConfirmation(
      this.player,
      link.name || `${type} ${linkIndex + 1}`,
      isInput,
      () => {
        if (isInput) {
          this.machine.removeInputLink(linkIndex);
        } else {
          this.machine.removeOutputLink(linkIndex);
        }
        MachineRegistry.saveToWorld();
        Utility.notify(this.player, Messages.linkRemoved, "success");
        back();
      },
      back
    );
  }
  // ========================================================================
  // FILTER MENU
  // ========================================================================
  /**
   * Show filter main menu (3 options: Clear, Search, Full List)
   */
  showFilterMenu(isInput, linkIndex) {
    const links = isInput ? this.machine.inputLinks : this.machine.outputLinks;
    const link = links[linkIndex];
    const backToConfig = () => this.showLinkConfig(isInput, linkIndex);
    const filterCount = link.whitelist.length;
    const builder = new MachineFormBuilder(this.player).setTitle(FormTitles.itemFilter).addDescription(Descriptions.filterMenu(filterCount)).setBackCallback(backToConfig);
    if (filterCount > 0) {
      builder.addButton(
        ButtonConfigs.wirelessHopper.clearFilters(filterCount),
        () => {
          this.machine.updateLink(isInput, linkIndex, { whitelist: [], minAmounts: {} });
          MachineRegistry.saveToWorld();
          Utility.notify(this.player, Messages.filterCleared, "success");
          this.showFilterMenu(isInput, linkIndex);
        }
      );
    }
    builder.addButton(
      ButtonConfigs.wirelessHopper.searchItem,
      () => this.showSearchPrompt(isInput, linkIndex)
    );
    builder.addButton(
      ButtonConfigs.wirelessHopper.seeFullList,
      () => this.showItemList(isInput, linkIndex, "", 0)
    );
    builder.show();
  }
  /**
   * Show search prompt
   */
  showSearchPrompt(isInput, linkIndex) {
    const form = new ModalFormData().title(FormTitles.searchItems).textField("§8Item Name:", "e.g. 'stone', 'redstone'", { defaultValue: "" });
    form.show(this.player).then((response) => {
      var _a2;
      if (!response.canceled && response.formValues) {
        const query = ((_a2 = response.formValues[0]) == null ? void 0 : _a2.trim()) || "";
        if (query) {
          this.showItemList(isInput, linkIndex, query, 0);
        } else {
          this.showFilterMenu(isInput, linkIndex);
        }
      } else {
        this.showFilterMenu(isInput, linkIndex);
      }
    });
  }
  // ========================================================================
  // ITEM LIST (WITH PAGINATION)
  // ========================================================================
  /**
   * Show paginated item list with toggles and min amount sliders
   */
  showItemList(isInput, linkIndex, query, page) {
    const links = isInput ? this.machine.inputLinks : this.machine.outputLinks;
    const link = links[linkIndex];
    const back = () => this.showFilterMenu(isInput, linkIndex);
    const { items: pagedItems, totalCount } = ItemCategories.searchItems(
      query,
      page,
      _WirelessHopperFormBuilder.ITEMS_PER_PAGE
    );
    const totalPages = Math.ceil(totalCount / _WirelessHopperFormBuilder.ITEMS_PER_PAGE);
    if (totalCount === 0) {
      Utility.notify(this.player, `§cNo items found for "${query}"`, "error");
      back();
      return;
    }
    const startItem = page * _WirelessHopperFormBuilder.ITEMS_PER_PAGE + 1;
    const endItem = Math.min(startItem + _WirelessHopperFormBuilder.ITEMS_PER_PAGE - 1, totalCount);
    const pageInfo = `Page ${page + 1}/${totalPages} | Items ${startItem}-${endItem} of ${totalCount}`;
    const title = query ? `§lSearch: ${query}
§8${pageInfo}` : `§lAll Items
§8${pageInfo}`;
    const form = new ModalFormData().title(title);
    let pageSliderIndex = null;
    if (totalPages > 1) {
      form.slider(`§7Jump to Page (1-${totalPages}):`, 1, totalPages, { defaultValue: page + 1 });
      pageSliderIndex = 0;
    }
    const itemsData = [];
    let currentIndex = pageSliderIndex !== null ? 1 : 0;
    pagedItems.forEach((itemTypeId) => {
      const itemId = ItemDB.getIdByItem(itemTypeId);
      const isSelected = link.whitelist.includes(itemId);
      const displayName = getReadableItemName(itemId);
      const currentMin = link.minAmounts[itemId] ?? 1;
      const toggleIndex = currentIndex++;
      const sliderIndex = currentIndex++;
      itemsData.push({
        numericId: itemId,
        displayName,
        toggleIndex,
        sliderIndex
      });
      form.toggle(`§f${displayName}`, { defaultValue: isSelected });
      form.slider("§8  └─ Min Amount:", 1, 64, { defaultValue: currentMin });
    });
    form.show(this.player).then((response) => {
      if (response.canceled) {
        back();
        return;
      }
      const formValues = response.formValues;
      if (pageSliderIndex !== null) {
        const newPageValue = formValues[pageSliderIndex];
        if (newPageValue !== page + 1) {
          this.showItemList(isInput, linkIndex, query, newPageValue - 1);
          return;
        }
      }
      const newWhitelist = [];
      const newMinAmounts = {};
      itemsData.forEach((item) => {
        const isEnabled = formValues[item.toggleIndex];
        const minAmount = formValues[item.sliderIndex];
        if (isEnabled) {
          newWhitelist.push(item.numericId);
          newMinAmounts[item.numericId] = minAmount;
        }
      });
      const existingWhitelist = link.whitelist.filter((id) => {
        return !itemsData.some((item) => item.numericId === id);
      });
      const existingMinAmounts = { ...link.minAmounts };
      itemsData.forEach((item) => {
        delete existingMinAmounts[item.numericId];
      });
      const finalWhitelist = [...existingWhitelist, ...newWhitelist];
      const finalMinAmounts = { ...existingMinAmounts, ...newMinAmounts };
      this.machine.updateLink(isInput, linkIndex, {
        whitelist: finalWhitelist,
        minAmounts: finalMinAmounts
      });
      MachineRegistry.saveToWorld();
      const count = finalWhitelist.length;
      if (count > 0) {
        Utility.notify(this.player, `${Messages.filterUpdated} §7(${count} items)`, "success");
      }
      this.showItemList(isInput, linkIndex, query, page);
    });
  }
};
__publicField(_WirelessHopperFormBuilder, "ITEMS_PER_PAGE", 30);
let WirelessHopperFormBuilder = _WirelessHopperFormBuilder;
function isWirelessHopper(machine) {
  return machine.typeId === BlockType.WanRedcaveWirelessHopper;
}
function openWirelessHopperForm(player, machine, onBackToMachine) {
  const builder = new WirelessHopperFormBuilder(player, machine, onBackToMachine);
  builder.showMainForm();
}
const CropRegistry = {
  wheat: {
    id: "wheat",
    displayName: "Wheat",
    blockType: MinecraftBlockTypes.Wheat,
    outputItem: MinecraftItemTypes.Wheat,
    minAmount: 1,
    maxAmount: 3,
    maxGrowthStage: 7,
    growthStateName: "growth"
  },
  carrots: {
    id: "carrots",
    displayName: "Carrots",
    blockType: MinecraftBlockTypes.Carrots,
    outputItem: MinecraftItemTypes.Carrot,
    minAmount: 1,
    maxAmount: 3,
    maxGrowthStage: 7,
    growthStateName: "growth"
  },
  potatoes: {
    id: "potatoes",
    displayName: "Potatoes",
    blockType: MinecraftBlockTypes.Potatoes,
    outputItem: MinecraftItemTypes.Potato,
    minAmount: 1,
    maxAmount: 3,
    maxGrowthStage: 7,
    growthStateName: "growth"
  },
  beetroots: {
    id: "beetroots",
    displayName: "Beetroots",
    blockType: MinecraftBlockTypes.Beetroot,
    outputItem: MinecraftItemTypes.Beetroot,
    minAmount: 1,
    maxAmount: 3,
    maxGrowthStage: 7,
    growthStateName: "growth"
  },
  netherWart: {
    id: "netherWart",
    displayName: "Nether Wart",
    blockType: MinecraftBlockTypes.NetherWart,
    outputItem: MinecraftItemTypes.NetherWart,
    minAmount: 1,
    maxAmount: 3,
    maxGrowthStage: 3,
    growthStateName: "age"
  },
  melon: {
    id: "melon",
    displayName: "Melon",
    blockType: MinecraftBlockTypes.MelonBlock,
    outputItem: MinecraftItemTypes.MelonBlock,
    minAmount: 1,
    maxAmount: 1,
    maxGrowthStage: 7,
    growthStateName: "age"
  },
  pumpkin: {
    id: "pumpkin",
    displayName: "Pumpkin",
    blockType: MinecraftItemTypes.Pumpkin,
    outputItem: MinecraftItemTypes.Pumpkin,
    minAmount: 1,
    maxAmount: 1,
    maxGrowthStage: 7,
    growthStateName: "age"
  }
};
function getAllCropIds() {
  return Object.keys(CropRegistry);
}
function getCropById(id) {
  return CropRegistry[id];
}
function getCropByBlockType(blockTypeId) {
  return Object.values(CropRegistry).find((c) => c.blockType === blockTypeId);
}
function openAutoFarmerForm(player, machine, onBack) {
  const cropIds = getAllCropIds();
  const currentCrop = machine.selectedCrop;
  const form = new ActionFormData();
  form.title(FormTitles.autoFarmerTier1).body(FormBodies.autoFarmerTier1Body);
  for (const id of cropIds) {
    const def = getCropById(id);
    const displayName = def ? def.displayName : id;
    const isSelected = id === currentCrop;
    const label = isSelected ? `§a[X]§r ${displayName}` : displayName;
    const iconKey = getCropIcon(displayName);
    const iconPath = Icons[iconKey];
    form.button(label, iconPath);
  }
  form.show(player).then((res) => {
    var _a2;
    if (res.canceled || res.selection === void 0) {
      onBack();
      return;
    }
    const selectedCropId = cropIds[res.selection];
    machine.updateSelectedCrop(selectedCropId);
    player.sendMessage(`§aSelected: ${((_a2 = getCropById(selectedCropId)) == null ? void 0 : _a2.displayName) || selectedCropId}`);
    onBack();
  });
}
function openAutoFarmerWhitelist(player, machine, onBack) {
  const allCropIds = getAllCropIds();
  const currentWhitelist = machine.cropWhitelist;
  const isWhitelistEnabled = currentWhitelist.length > 0;
  const form = new ActionFormData();
  form.title(FormTitles.autoFarmerWhitelist).body(FormBodies.autoFarmerWhitelistBody(isWhitelistEnabled));
  const cropInfo = [];
  for (const id of allCropIds) {
    const def = getCropById(id);
    if (!def) continue;
    const numericId = ItemDB.getIdByItem(def.outputItem);
    if (numericId === -1) continue;
    cropInfo.push({ id, numericId, displayName: def.displayName });
    const isWhitelisted = currentWhitelist.includes(numericId);
    const status = isWhitelisted ? "§aON" : "§cOFF";
    const iconKey = getCropIcon(def.displayName);
    const iconPath = Icons[iconKey];
    form.button(`${def.displayName}: ${status}`, iconPath);
  }
  form.button("§8Back");
  form.show(player).then((res) => {
    if (res.canceled) {
      onBack();
      return;
    }
    const idx = res.selection;
    if (idx === void 0 || idx === allCropIds.length) {
      onBack();
      return;
    }
    const selectedCrop = cropInfo[idx];
    if (!selectedCrop) {
      onBack();
      return;
    }
    const numericIdToToggle = selectedCrop.numericId;
    const name = selectedCrop.displayName;
    const newWhitelist = [...currentWhitelist];
    const existingIndex = newWhitelist.indexOf(numericIdToToggle);
    if (existingIndex > -1) {
      newWhitelist.splice(existingIndex, 1);
      player.sendMessage(`§cRemoved ${name} from Whitelist.`);
    } else {
      newWhitelist.push(numericIdToToggle);
      player.sendMessage(`§aAdded ${name} to Whitelist.`);
    }
    machine.updateWhitelist(newWhitelist);
    openAutoFarmerWhitelist(player, machine, onBack);
  });
}
function isOutputOnlyMachine(machine) {
  return machine.typeId === BlockType.WanRedcaveQuarry || machine.typeId === BlockType.WanRedcaveAutofarmerT1 || machine.typeId === BlockType.WanRedcaveAutofarmerT2;
}
function getDetailedLinkStatus(machine) {
  const isOutputOnly = isOutputOnlyMachine(machine);
  return {
    hasInput: isOutputOnly ? true : !!machine.input,
    hasOutput: !!machine.output,
    isOutputOnly
  };
}
function getMachineNetworkStatus(machine) {
  const energyStatus = getMachineEnergyStatus(machine);
  const isOutputOnly = isOutputOnlyMachine(machine);
  const linkStatus = getDetailedLinkStatus(machine);
  if (!energyStatus.isInNetwork) {
    return {
      color: "§c",
      text: "OUT OF NETWORK",
      iconPath: Icons.statusOutOfNetwork
    };
  }
  if (isOutputOnly) {
    if (!linkStatus.hasOutput) {
      return {
        color: "§e",
        text: "ON - NO OUTPUT",
        iconPath: Icons.statusUnlinked
      };
    }
  } else {
    const missingInput = !linkStatus.hasInput;
    const missingOutput = !linkStatus.hasOutput;
    if (missingInput || missingOutput) {
      return {
        color: "§e",
        text: "ON - NO INPUT/OUTPUT",
        iconPath: Icons.statusUnlinked
      };
    }
  }
  if (!energyStatus.isPowered) {
    return {
      color: "§c",
      text: "OFF - NO POWERS",
      iconPath: Icons.statusOff
    };
  }
  return {
    color: "§a",
    text: "ON",
    iconPath: Icons.statusOn
  };
}
class RecipeProcessor {
  // -------------------------------------------------------------------------
  // --- RECIPE LOOKUP ---
  // -------------------------------------------------------------------------
  /**
    * Finds a matching recipe for the given machine type and input item ID.
    */
  static findRecipe(machineDef, inputItemId) {
    const recipes = RecipeRegistry[machineDef.type] ?? [];
    return recipes.find((r) => r.input === inputItemId) ?? null;
  }
  /**
    * Returns all valid item IDs that can be used as input for a machine type.
    */
  static getValidInputItems(machineType) {
    const recipes = RecipeRegistry[machineType] ?? [];
    const inputItems = /* @__PURE__ */ new Set();
    for (const recipe of recipes) {
      inputItems.add(recipe.input);
    }
    return Array.from(inputItems);
  }
  // -------------------------------------------------------------------------
  // --- INPUT CONSUMPTION AND PROCESSING START ---
  // -------------------------------------------------------------------------
  /**
    * Iterates through the input container, finds a processable item, consumes one unit, 
    * calculates the output amount, and returns the processing details.
    * * @returns Recipe details including output amount, or null if no item was processed.
    */
  static consumeAndStartProcess(machine, machineDef, inputContainer) {
    if (!inputContainer) return null;
    for (let i = 0; i < inputContainer.size; i++) {
      const slot = inputContainer.getItem(i);
      if (!slot || slot.amount < 1) continue;
      const inputItemId = slot.typeId;
      const inputNumericId = ItemDB.getIdByItem(inputItemId);
      if (machine.whitelist.length > 0) {
        if (!machine.whitelist.includes(inputNumericId)) continue;
      }
      const recipe = this.findRecipe(machineDef, inputItemId);
      if (!recipe) continue;
      let baseOutput;
      if (recipe.amount !== void 0) {
        baseOutput = recipe.amount;
      } else if (recipe.minAmount !== void 0 && recipe.maxAmount !== void 0) {
        baseOutput = Math.floor(
          Math.random() * (recipe.maxAmount - recipe.minAmount + 1)
        ) + recipe.minAmount;
      } else {
        console.error(`[RecipeProcessor] Recipe output definition is incomplete for: ${recipe.output}`);
        continue;
      }
      let finalOutput = baseOutput;
      const bonusChance = machineDef.efficiencyBonus - 1;
      if (bonusChance > 0 && finalOutput > 0) {
        if (randomChance(bonusChance)) {
          finalOutput += 1;
        }
      }
      if (finalOutput < 1 && baseOutput < 1) {
        continue;
      }
      const consumedItemId = slot.typeId;
      const currentAmount = slot.amount;
      const newAmount = currentAmount - 1;
      if (newAmount <= 0) {
        inputContainer.setItem(i, void 0);
      } else {
        try {
          const remainingStack = new ItemStack(slot.typeId, newAmount);
          inputContainer.setItem(i, remainingStack);
        } catch (e) {
          console.error(`[RecipeProcessor] Failed to set remaining item stack: ${slot.typeId} x${newAmount}`, e);
          return null;
        }
      }
      return {
        inputId: consumedItemId,
        outputId: recipe.output,
        // Ensure output is an integer before sending to processing cycle
        outputAmount: Math.floor(finalOutput)
      };
    }
    return null;
  }
  // -------------------------------------------------------------------------
  // --- OUTPUT RESULT -------------------------------------------------------
  /**
    * Outputs the processed result to container.
    * @returns true if successful, false if output container is full or error occurred.
    */
  static outputResult(outputId, outputAmount, outputContainer) {
    if (!outputContainer) return false;
    if (outputAmount < 1 || outputAmount > 255 || !Number.isInteger(outputAmount)) {
      console.error(`[RecipeProcessor] Output amount is invalid or not an integer: ${outputAmount}`);
      return false;
    }
    try {
      const outStack = new ItemStack(outputId, outputAmount);
      const remainingItems = outputContainer.addItem(outStack);
      return !remainingItems;
    } catch (e) {
      console.error(`[RecipeProcessor] Failed to output item ${outputId} x${outputAmount}:`, e);
      return false;
    }
  }
}
function isQuarry(machine) {
  return machine.typeId === BlockType.WanRedcaveQuarry;
}
function isAutoFarmer(machine) {
  return machine.typeId === BlockType.WanRedcaveAutofarmerT1 || machine.typeId === BlockType.WanRedcaveAutofarmerT2;
}
function getContainerTypeName(location) {
  const block = Utility.getBlockAt(location);
  if (!block) return "Unknown";
  const typeId = block.typeId;
  const name = typeId.replace("minecraft:", "").replace(/_/g, " ");
  return name.charAt(0).toUpperCase() + name.slice(1);
}
function openLinksAndNetworkForm(player, machine) {
  const rawLinkStatus = Linking.getLinkStatus(machine);
  const isOutputOnly = isOutputOnlyMachine(machine);
  const canHaveInput = !isOutputOnly;
  const hasInput = !!machine.input && canHaveInput;
  const hasOutput = !!machine.output;
  const linkStatusText = formatLinkStatusForUI(rawLinkStatus, isOutputOnly);
  const builder = new MachineFormBuilder(player).setTitle("§lLinks").addDescription(linkStatusText).setBackCallback(() => openMachineConfigForm(player, machine));
  builder.addButton(ButtonConfigs.linking.startLinking, () => {
    const allowsInputLink = canHaveInput && !hasInput;
    const allowsOutputLink = !hasOutput;
    player.setDynamicProperty(
      "wan_redcave:pending_link",
      JSON.stringify({
        machineId: machine.id,
        hasInput: allowsInputLink,
        hasOutput: allowsOutputLink
      })
    );
    let nextStep = "";
    if (isOutputOnly) {
      nextStep = !hasOutput ? "Output" : "Output (replace)";
    } else {
      if (allowsInputLink && allowsOutputLink) {
        nextStep = "Input or Output";
      } else if (allowsInputLink) {
        nextStep = "Input";
      } else if (allowsOutputLink) {
        nextStep = "Output (replace)";
      } else {
        nextStep = "Output (replace)";
      }
    }
    Utility.notify(player, Messages.selectContainer(nextStep), "info");
  });
  if (hasInput) {
    builder.addButton(ButtonConfigs.linking.removeInput, () => {
      Linking.clearLinks(machine, true, false);
      Utility.notify(player, Messages.linkRemoved, "success");
      openLinksAndNetworkForm(player, machine);
    });
  }
  if (hasOutput) {
    builder.addButton(ButtonConfigs.linking.removeOutput, () => {
      Linking.clearLinks(machine, false, true);
      Utility.notify(player, Messages.linkRemoved, "success");
      openLinksAndNetworkForm(player, machine);
    });
  }
  builder.show();
}
function openMachineInfoForm(player, machine) {
  const machineDef = Machines.find((m) => m.blockId === machine.typeId);
  const energySlots = (machineDef == null ? void 0 : machineDef.energyCost) ?? 0;
  const status = getMachineEnergyStatus(machine);
  const network = findMachineNetwork(machine.location);
  const lines = [];
  lines.push("§l§s=== MACHINE STATUS ===§r");
  let statusText = "";
  if (!status.isInNetwork) {
    statusText = "§c" + Messages.outOfNetwork + "§r";
  } else if (!status.isPowered) {
    statusText = "§c" + Messages.unpowered + "§r";
  } else {
    statusText = "§a" + Messages.powered + "§r";
  }
  if (machine.isProcessing()) {
    statusText += " §7| §e" + Messages.working;
  }
  lines.push(`Status: ${statusText}`);
  lines.push(`Energy Required: §f${energySlots} RE`);
  lines.push("");
  lines.push("§l§s=== CONNECTIONS ===§r");
  const isOutputOnly = isOutputOnlyMachine(machine);
  if (!isOutputOnly && machine.input) {
    const inputLoc = Array.isArray(machine.input) ? machine.input[0] : machine.input;
    const inputType = getContainerTypeName(inputLoc);
    const inputPos = `§8(${Math.floor(inputLoc.x)}, ${Math.floor(inputLoc.y)}, ${Math.floor(inputLoc.z)})§r`;
    lines.push(`Input: ${inputType} ${inputPos}`);
  } else if (!isOutputOnly) {
    lines.push("Input: §cNot Connected");
  }
  if (machine.output) {
    const outputLoc = Array.isArray(machine.output) ? machine.output[0] : machine.output;
    const outputType = getContainerTypeName(outputLoc);
    const outputPos = `§8(${Math.floor(outputLoc.x)}, ${Math.floor(outputLoc.y)}, ${Math.floor(outputLoc.z)})§r`;
    lines.push(`Output: ${outputType} ${outputPos}`);
  } else {
    lines.push("Output: §cNot Connected");
  }
  lines.push("");
  lines.push("§l§s=== NETWORK ===§r");
  if (network) {
    const coreLoc = network.networkCoreLocation;
    lines.push(`Core Location: §8${coreLoc}`);
  } else {
    lines.push("Core Location: §cNo Network");
  }
  lines.push("");
  lines.push("§l§s=== DESCRIPTION ===§r");
  if (machineDef) {
    const tierText = machineDef.tier > 1 ? ` (Tier ${machineDef.tier})` : "";
    lines.push(`§f${machineDef.displayName}${tierText}`);
    lines.push(`§7Processes items using §f${energySlots} RE§7.`);
    if (machineDef.efficiencyBonus > 0) {
      const bonusPercent = Math.floor(machineDef.efficiencyBonus * 100);
      lines.push(`§7Efficiency Bonus: §a+${bonusPercent}%`);
    }
  } else {
    lines.push("§7No description available.");
  }
  const body = lines.join("\n");
  UIHelpers.showInfoDialog(
    player,
    FormTitles.machineInfo,
    body,
    () => openMachineConfigForm(player, machine)
    // Back callback
  );
}
function openWhitelistForm(player, machine) {
  const machineDef = Machines.find((m) => m.blockId === machine.typeId);
  if (!machineDef) {
    return Utility.notify(player, "§cMachine definition not found for Whitelist.", "error");
  }
  const validInputIds = RecipeProcessor.getValidInputItems(
    machineDef.type
  );
  const numericIds = validInputIds.map((id) => ItemDB.register(id));
  const itemsData = numericIds.map((n) => ({
    numericId: n,
    name: ItemDB.getItemById(n).replace("minecraft:", "").replace(/_/g, " ")
  }));
  itemsData.sort((a, b) => a.name.localeCompare(b.name));
  const formElements = itemsData.map((item) => ({
    type: "toggle",
    label: item.name,
    defaultValue: machine.whitelist.includes(item.numericId)
  }));
  UIHelpers.showModalForm(
    player,
    `§l${machine.name} ${FormTitles.whitelist}`,
    formElements,
    (values) => {
      const newWhitelist = [];
      values.forEach((v, i) => {
        if (v) newWhitelist.push(itemsData[i].numericId);
      });
      machine.whitelist = newWhitelist;
      MachineRegistry.saveToWorld();
      const message = newWhitelist.length > 0 ? `${Messages.whitelistActive} ${newWhitelist.length} items selected.` : Messages.whitelistDisabled;
      const type = newWhitelist.length > 0 ? "success" : "error";
      Utility.notify(player, message, type);
      openMachineConfigForm(player, machine);
    },
    () => openMachineConfigForm(player, machine)
  );
}
function openRenameForm(player, machine) {
  const form = new ModalFormData().title(FormTitles.renameMachine).textField("New Name", machine.name, { defaultValue: machine.name });
  form.show(player).then((response) => {
    if (!response.canceled && response.formValues) {
      const newName = response.formValues[0].trim();
      if (newName.length > 0) {
        machine.name = newName;
        MachineRegistry.saveToWorld();
        Utility.notify(player, `${Messages.machineRenamed} ${newName}`, "success");
      }
    }
    openMachineConfigForm(player, machine);
  });
}
function openQuarryForm(player, machine) {
  const back = () => openMachineConfigForm(player, machine);
  const active = machine.active;
  const showPerimeter = machine.showPerimeter;
  const buttons = [
    { text: `Quarry Active (Currently: ${active ? "§aRunning" : "§7Idle"})` },
    { text: `Show Perimeter Particles (Currently: ${showPerimeter ? "§aON" : "§7OFF"})` }
  ];
  UIHelpers.showActionForm(
    player,
    `§l${machine.name} ${FormTitles.quarryControls}`,
    "Toggle Quarry settings",
    buttons,
    (selection) => {
      if (selection === 0) {
        machine.toggleActive();
        Utility.notify(
          player,
          machine.active ? Messages.quarryStarted : Messages.quarryStopped,
          "success"
        );
        return openQuarryForm(player, machine);
      }
      if (selection === 1) {
        machine.showPerimeter = !machine.showPerimeter;
        Utility.notify(
          player,
          machine.showPerimeter ? Messages.particlesEnabled : Messages.particlesDisabled,
          "info"
        );
        return openQuarryForm(player, machine);
      }
    },
    back
  );
}
function openAutoFarmerTier2Menu(player, machine) {
  const whitelistCount = machine.cropWhitelist.length;
  const whitelistStatus = whitelistCount > 0 ? `§aENABLED (${whitelistCount} crops)` : "§eDISABLED (All Crops)";
  const buttons = [
    { text: `Crop Whitelist: ${whitelistStatus}`, iconPath: Icons.filter },
    { text: `Perimeter: ${machine.showPerimeter ? "§aON" : "§cOFF"}`, iconPath: Icons.info }
  ];
  UIHelpers.showActionForm(
    player,
    FormTitles.autoFarmerTier2,
    "Tier 2 settings",
    buttons,
    (selection) => {
      if (selection === 0) {
        openAutoFarmerWhitelist(player, machine, () => openAutoFarmerTier2Menu(player, machine));
      } else if (selection === 1) {
        machine.updateShowPerimeter(!machine.showPerimeter);
        const perimeterStatus = machine.showPerimeter ? "enabled" : "disabled";
        player.sendMessage(`§ePerimeter particles ${perimeterStatus}`);
        openAutoFarmerTier2Menu(player, machine);
      }
    },
    () => openMachineConfigForm(player, machine)
  );
}
function openMachineConfigForm(player, machine) {
  if ("updateRuntimeState" in machine && typeof machine.updateRuntimeState === "function") {
    machine.updateRuntimeState();
  }
  const status = getMachineEnergyStatus(machine);
  if (!status.isInNetwork) {
    Utility.notify(player, "§cMissing Network Core", "error");
    return;
  }
  const machineDef = Machines.find((m) => m.blockId === machine.typeId);
  const energyRequired = (machineDef == null ? void 0 : machineDef.energyCost) ?? 0;
  const networkStats = findMachineNetwork(machine.location);
  if (!networkStats) {
    Utility.notify(player, "§cMissing Network Core", "error");
    return;
  }
  if (networkStats.totalSlots === 0) {
    Utility.notify(player, "§cNo generators in network!", "error");
    return;
  }
  if (networkStats.totalSlots < energyRequired) {
    const missingRE = energyRequired - networkStats.totalSlots;
    Utility.notify(player, `§cAdd §e${missingRE} RE§c more generator capacity to meet this machine's requirement!`, "error");
    return;
  }
  const availableForThisMachine = calculateAvailableEnergyAtDistance(machine, networkStats);
  if (availableForThisMachine < energyRequired) {
    const missingRE = energyRequired - availableForThisMachine;
    Utility.notify(
      player,
      `§cMissing §e${missingRE} RE§c! Network overloaded by closer machines!`,
      "error"
    );
    return;
  }
  if (isWirelessHopper(machine)) {
    const hopper = machine;
    openWirelessHopperForm(player, hopper, () => openMachineConfigForm(player, machine));
    return;
  }
  const isOutputOnly = isOutputOnlyMachine(machine);
  const hasInput = !!machine.input;
  const hasOutput = !!machine.output;
  const hasCompleteLinks = isOutputOnly ? hasOutput : hasInput && hasOutput;
  const powerDisplay = machine.isProcessing() ? "§a" + Messages.powered + " §7| §e" + Messages.working : "§a" + Messages.powered;
  if (!hasCompleteLinks) {
    const builder2 = new MachineFormBuilder(player).setTitle(`§l${machine.name}`).addDescription(`Status: ${powerDisplay}`);
    builder2.addButton(
      { text: "§eLinks (Required)", iconPath: Icons.link },
      () => openLinksAndNetworkForm(player, machine)
    );
    builder2.show();
    return;
  }
  const builder = new MachineFormBuilder(player).setTitle(`§l${machine.name}`).addDescription(`Status: ${powerDisplay}`);
  if (isQuarry(machine)) {
    builder.addButton(ButtonConfigs.special.quarryControls, () => {
      openQuarryForm(player, machine);
    });
  }
  if (isAutoFarmer(machine)) {
    builder.addButton(ButtonConfigs.special.farmerConfig, () => {
      if (machine.tier === 1) {
        openAutoFarmerForm(player, machine, () => openMachineConfigForm(player, machine));
      } else {
        openAutoFarmerTier2Menu(player, machine);
      }
    });
  }
  builder.addButton(
    { text: "Links", iconPath: Icons.powered },
    () => openLinksAndNetworkForm(player, machine)
  );
  if (machine.typeId === "crusher" || machine.typeId === "electricOven") {
    const whitelistCount = machine.whitelist.length;
    builder.addButton(
      {
        text: `Whitelist (${whitelistCount} items)`,
        iconPath: Icons.filter
      },
      () => openWhitelistForm(player, machine)
    );
  }
  builder.addButton(ButtonConfigs.infoSubmenu.rename, () => {
    openRenameForm(player, machine);
  });
  builder.addButton(
    { text: "View Machine Info", iconPath: Icons.info },
    () => openMachineInfoForm(player, machine)
  );
  builder.addButton(ButtonConfigs.mainMenu.destroy, () => {
    showDestroyMachineConfirmation(
      player,
      machine.name,
      () => {
        MachineRegistry.remove(machine.id);
        Utility.notify(player, Messages.machineDestroyed, "success");
        playUISound(player, UISounds.remove);
      },
      () => openMachineConfigForm(player, machine)
    );
  });
  builder.show();
}
function calculateAvailableEnergyAtDistance(machine, networkStats) {
  const allMachines = MachineRegistry.getAll().filter((m) => {
    const machineNetwork = findMachineNetwork(m.location);
    return (machineNetwork == null ? void 0 : machineNetwork.networkCoreLocation) === networkStats.networkCoreLocation;
  });
  const coreLocStr = networkStats.networkCoreLocation;
  const match = coreLocStr.match(/\[([^\]]+)\]/);
  if (!match) return networkStats.totalSlots;
  const [x, y, z] = match[1].split(",").map((s) => parseInt(s.trim()));
  const machineBlock = machine.getBlock();
  if (!machineBlock) return 0;
  const coreLocation = { x, y, z };
  let energyUsed = 0;
  const totalEnergy = networkStats.totalSlots;
  const sortedMachines = allMachines.map((m) => {
    const block = m.getBlock();
    if (!block) return null;
    const loc = { x: block.location.x, y: block.location.y, z: block.location.z };
    const distance = Math.sqrt(
      Math.pow(loc.x - coreLocation.x, 2) + Math.pow(loc.y - coreLocation.y, 2) + Math.pow(loc.z - coreLocation.z, 2)
    );
    const def = Machines.find((d) => d.blockId === m.typeId);
    const cost = (def == null ? void 0 : def.energyCost) ?? 0;
    return { machine: m, distance, cost };
  }).filter((m) => m !== null).sort((a, b) => a.distance - b.distance);
  for (const { machine: m, cost } of sortedMachines) {
    if (cost === 0) continue;
    if (m.id === machine.id) {
      return totalEnergy - energyUsed;
    }
    if (energyUsed + cost > totalEnergy) {
      continue;
    }
    energyUsed += cost;
  }
  return totalEnergy - energyUsed;
}
function cleanupInvalidMachines(player, backCallback) {
  const removed = MachineRegistry.cleanup();
  const message = Messages.cleanupComplete(removed);
  UIHelpers.showInfoDialog(player, FormTitles.cleanupComplete, message, backCallback);
  if (removed > 0) {
    playUISound(player, UISounds.success);
  }
}
function showEnergyNetworkInfo(player, networkLocation, backCallback) {
  var _a2, _b;
  const network = findMachineNetwork(networkLocation);
  if (!network) {
    UIHelpers.showInfoDialog(
      player,
      FormTitles.energyNetworkInfo,
      "§cNo network found at this location.",
      backCallback
    );
    return;
  }
  const allMachines = MachineRegistry.getAll().filter((m) => {
    const machineNetwork = findMachineNetwork(m.location);
    return (machineNetwork == null ? void 0 : machineNetwork.networkCoreLocation) === network.networkCoreLocation;
  });
  const lines = [];
  lines.push("§l§s=== NETWORK CORE ===§r");
  const coreLocParts = network.networkCoreLocation.split(",").map((s) => s.trim());
  if (coreLocParts.length >= 3) {
    lines.push(`Location: §f${coreLocParts[0]}, ${coreLocParts[1]}, ${coreLocParts[2]}`);
  } else {
    lines.push(`Location: §f${network.networkCoreLocation}`);
  }
  lines.push("");
  lines.push("§l§s=== POWER STATISTICS ===§r");
  lines.push(`Total Capacity: §f${network.totalSlots} RE§r`);
  lines.push(`Used Energy: §c${network.reservedSlots} RE§r`);
  lines.push(`Available Energy: §a${network.availableSlots} RE§r`);
  const usagePercent = network.totalSlots > 0 ? Math.floor(network.reservedSlots / network.totalSlots * 100) : 0;
  lines.push(`Usage: §e${usagePercent} percent§r`);
  lines.push("");
  lines.push(`§l§s=== GENERATORS (${network.generators.count}) ===§r`);
  if (network.generators.count > 0) {
    const generatorsRaw = ((_a2 = MachinesDB.find("generators")) == null ? void 0 : _a2.generators) ?? [];
    const generators = generatorsRaw.map((g) => ({
      location: Utility.normalizeDimensionLocation(g.location),
      typeId: ""
      // Will be filled from block
    }));
    const coreLocParts2 = network.networkCoreLocation.split(",").map((s) => s.trim());
    ((_b = coreLocParts2[3]) == null ? void 0 : _b.replace(/[()]/g, "").trim()) || "overworld";
    const nearbyGenerators = [];
    for (const gen of generators) {
      try {
        const block = gen.location.dimension.getBlock(gen.location);
        if (!block || !ENERGYCONFIG.generators[block.typeId]) continue;
        const networkCore = findMachineNetwork(gen.location);
        if ((networkCore == null ? void 0 : networkCore.networkCoreLocation) === network.networkCoreLocation) {
          nearbyGenerators.push({
            typeId: block.typeId,
            location: gen.location
          });
        }
      } catch {
      }
    }
    if (nearbyGenerators.length > 0) {
      const generatorsByType = {};
      for (const gen of nearbyGenerators) {
        if (!generatorsByType[gen.typeId]) {
          generatorsByType[gen.typeId] = [];
        }
        generatorsByType[gen.typeId].push(gen.location);
      }
      for (const [genType, locations] of Object.entries(generatorsByType)) {
        const shortName = genType.split(":").pop() || genType;
        const prettyName = shortName.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
        const data = network.generators.byType[genType];
        const outputPerGen = data ? data.output / data.count : 0;
        for (const loc of locations) {
          const pos = `${Math.floor(loc.x)}, ${Math.floor(loc.y)}, ${Math.floor(loc.z)}`;
          lines.push(`§f${prettyName} §8(${pos}) §8| Output: §a${outputPerGen} RE§r`);
        }
      }
    } else {
      lines.push("§7None in range");
    }
  } else {
    lines.push("§7None");
  }
  lines.push("");
  lines.push("§l§s=== MACHINES ===§r");
  const normalMachines = allMachines.filter((m) => {
    return m.typeId !== BlockType.WanRedcaveNetworkAccessPanel && m.typeId !== BlockType.WanRedcaveWirelessHopper && !network.generators.byType[m.typeId];
  });
  if (normalMachines.length > 0) {
    const machinesByType = {};
    for (const m of normalMachines) {
      const typeInfo = MachineRegistry.getTypes().find((t) => t.typeId === m.typeId);
      const typeName = (typeInfo == null ? void 0 : typeInfo.category) || "Other";
      if (!machinesByType[typeName]) {
        machinesByType[typeName] = [];
      }
      machinesByType[typeName].push(m);
    }
    for (const [typeName, machines] of Object.entries(machinesByType)) {
      const count = machines.length;
      lines.push(`§f${typeName} (${count})`);
      for (const m of machines) {
        const loc = m.location;
        const pos = `${Math.floor(loc.x)}, ${Math.floor(loc.y)}, ${Math.floor(loc.z)}`;
        const status = getMachineNetworkStatus(m);
        const onOffStatus = status.text === "ON" ? "§a[ON]" : "§c[OFF]";
        const hasInput = !!m.input;
        const hasOutput = !!m.output;
        const isOutputOnly = m.typeId === BlockType.WanRedcaveQuarry || m.typeId === BlockType.WanRedcaveAutofarmerT1 || m.typeId === BlockType.WanRedcaveAutofarmerT2;
        let linkStatus = "";
        if (!isOutputOnly) {
          linkStatus += hasInput ? "§aIN" : "§cIN";
          linkStatus += " ";
        }
        linkStatus += hasOutput ? "§aOUT" : "§cOUT";
        lines.push(`  §8- ${m.name} ${onOffStatus} ${linkStatus} §7(${pos})`);
      }
    }
  } else {
    lines.push("§7None");
  }
  UIHelpers.showInfoDialog(player, FormTitles.energyNetworkInfo, lines.join("\n"), backCallback);
}
function showAllMachinesList(player, machines, networkLocation) {
  if (machines.length === 0) {
    UIHelpers.showInfoDialog(
      player,
      FormTitles.networkManagement,
      "No machines found in this network."
    );
    return;
  }
  const sortedMachines = [...machines].sort((a, b) => {
    const statusA = getMachineNetworkStatus(a);
    const statusB = getMachineNetworkStatus(b);
    const getPriority = (text) => {
      if (text === "ON") return 4;
      if (text.startsWith("ON -")) return 3;
      if (text === "OFF") return 2;
      return 1;
    };
    const priorityA = getPriority(statusA.text);
    const priorityB = getPriority(statusB.text);
    if (priorityA !== priorityB) {
      return priorityB - priorityA;
    }
    return a.name.localeCompare(b.name);
  });
  const buttons = sortedMachines.map((m) => {
    const status = getMachineNetworkStatus(m);
    return {
      text: `§f${m.name}
${status.color}${status.text}`,
      iconPath: status.iconPath
    };
  });
  const backToMenu = () => openMachineFilterForm(player, networkLocation);
  UIHelpers.showActionForm(
    player,
    "§lAll Network Machines",
    `§8Total: §f${machines.length}
§8Select a machine to configure:`,
    buttons,
    (selection) => {
      openMachineConfigForm(player, sortedMachines[selection]);
    },
    backToMenu
  );
}
function openMachineFilterForm(player, networkLocation) {
  const location = networkLocation ?? player.location;
  const network = findMachineNetwork(location);
  const allMachines = network ? MachineRegistry.getAll().filter((m) => {
    const machineNetwork = findMachineNetwork(m.location);
    return (machineNetwork == null ? void 0 : machineNetwork.networkCoreLocation) === network.networkCoreLocation && m.typeId !== BlockType.WanRedcaveNetworkAccessPanel && m.typeId !== BlockType.WanRedcaveWirelessHopper;
  }) : [];
  const accessPanelLocation = networkLocation ? typeof networkLocation === "object" && "dimensionId" in networkLocation ? networkLocation : { ...networkLocation, dimensionId: player.dimension.id } : { ...player.location, dimensionId: player.dimension.id };
  const stopWorking = () => {
    const machine = MachineRegistry.findByLocation(accessPanelLocation);
    if (machine && machine.typeId === BlockType.WanRedcaveNetworkAccessPanel) {
      machine.stopWorking();
      machine.forceVisualUpdate();
    }
  };
  if (allMachines.length === 0) {
    UIHelpers.showInfoDialog(
      player,
      FormTitles.networkManagement,
      "No machines found in this network.",
      () => stopWorking()
    );
    return;
  }
  const builder = new MachineFormBuilder(player).setTitle(FormTitles.networkManagement).addDescription(`§8Network Machines: §f${allMachines.length}`);
  builder.addButton(ButtonConfigs.network.energyInfo, () => {
    showEnergyNetworkInfo(player, location, () => openMachineFilterForm(player, location));
  });
  builder.addButton(
    { text: `All Machines (${allMachines.length})`, iconPath: Icons.category },
    () => {
      showAllMachinesList(player, allMachines, location);
    }
  );
  builder.addButton(ButtonConfigs.network.cleanup, () => {
    cleanupInvalidMachines(player, () => openMachineFilterForm(player, location));
  });
  builder.wrapAllActions((original) => {
    stopWorking();
    original();
  }).show();
}
ItemType.WanRedcaveHolographicTouchpad;
const PENDING_LINK_KEY$1 = "wan_redcave:pending_link";
const COOLDOWN_KEY = "wan_redcave:touchpad_cooldown";
const FORM_OPENED_FLAG = "wan_redcave:form_opened_flag";
const COOLDOWN_TICKS = 5;
class HolographicTouchpad extends BaseItem {
  onUse(event, equipmentSlot) {
    HolographicTouchpadEngine.onUse(event.source);
  }
}
__publicField(HolographicTouchpad, "identifier", ItemType.WanRedcaveHolographicTouchpad);
class HolographicTouchpadEngine {
  /**
   * Handles item use (e.g., clicking in air or on non-interactive blocks) while holding the touchpad.
   */
  static onUse(player) {
    const pendingState = getPendingLinkState$1(player);
    if (player.getDynamicProperty(FORM_OPENED_FLAG)) {
      return;
    }
    if (player.isSneaking && pendingState) {
      clearPendingLink$1(player);
      Utility.notify(player, "§c[LINKING] Linking cancelled.", "error");
      player.playSound("random.break");
      return;
    }
    if (!pendingState) {
      openMachineFilterForm(player);
    }
  }
  /**
   * Handles interaction with a block (machine or container) while holding the touchpad.
   */
  static onInteract(player, block) {
    var _a2, _b;
    (_b = (_a2 = player.getComponent(EntityComponentTypes.Inventory)) == null ? void 0 : _a2.container) == null ? void 0 : _b.getItem(player.selectedSlotIndex);
    if (isOnCooldown$1(player))
      return false;
    setCooldown$1(player);
    const pendingState = getPendingLinkState$1(player);
    const isMachineBlock = block.hasTag("wan_redcave:machine");
    if (pendingState) {
      system.run(() => {
        this.handleLinkingClick(player, block, pendingState);
      });
      return true;
    }
    if (isMachineBlock) {
      system.run(() => {
        const machine = MachineRegistry.findByLocation(Utility.blockToLocation(block));
        if (machine) {
          openMachineConfigForm(player, machine);
          player.setDynamicProperty(FORM_OPENED_FLAG, true);
          system.runTimeout(() => {
            player.setDynamicProperty(FORM_OPENED_FLAG, void 0);
          }, 1);
        } else {
          Utility.notify(player, "§cMachine data not found.", "error");
        }
      });
      return true;
    }
    return false;
  }
  /**
  	* Handles the logic for setting machine input/output links when clicking a container block.
  	*/
  static handleLinkingClick(player, block, state) {
    const machine = MachineRegistry.get(state.machineId);
    if (!machine) {
      Utility.notify(player, "§cMachine not found.", "error");
      clearPendingLink$1(player);
      player.playSound("random.break");
      return;
    }
    if (!Utility.isValidContainer(block)) {
      Utility.notify(player, "§cMust be a container!", "error");
      player.playSound("random.break");
      return;
    }
    const location = Utility.blockToLocation(block);
    if (!machine.input) {
      Linking.setInput(machine, location);
      if (machine.output) {
        Utility.notify(player, "§aInput linked! Linking complete.", "success");
        player.playSound("random.orb");
        clearPendingLink$1(player);
        return;
      }
      Utility.notify(player, "§aInput linked! §7Click output container.", "success");
      player.playSound("random.click");
      state.hasInput = true;
      player.setDynamicProperty(PENDING_LINK_KEY$1, JSON.stringify(state));
    } else if (!machine.output) {
      Linking.setOutput(machine, location);
      Utility.notify(player, "§aOutput linked! Linking complete.", "success");
      player.playSound("random.orb");
      clearPendingLink$1(player);
    } else {
      Linking.setInput(machine, location);
      Utility.notify(player, "§aInput replaced! Linking complete.", "success");
      player.playSound("random.orb");
      clearPendingLink$1(player);
    }
  }
}
function getPendingLinkState$1(player) {
  const raw = player.getDynamicProperty(PENDING_LINK_KEY$1);
  if (typeof raw !== "string") return void 0;
  try {
    return JSON.parse(raw);
  } catch {
    return void 0;
  }
}
function clearPendingLink$1(player) {
  player.setDynamicProperty(PENDING_LINK_KEY$1, void 0);
}
function isOnCooldown$1(player) {
  const cooldown = player.getDynamicProperty(COOLDOWN_KEY);
  if (!cooldown) return false;
  const currentTick = system.currentTick;
  return currentTick < cooldown;
}
function setCooldown$1(player) {
  const currentTick = system.currentTick;
  player.setDynamicProperty(COOLDOWN_KEY, currentTick + COOLDOWN_TICKS);
}
registerItems([
  BlasterT1,
  BlasterT2,
  Drill,
  RedstoneCaveGuidebook,
  HolographicTouchpad,
  TechSword
]);
function isInBiome(player) {
  return new Promise((resolve) => {
    try {
      const entity = player.dimension.spawnEntity(EntityType.WanRedcaveBiomeChecker, player.location);
      system.runTimeout(() => {
        const inBiome = entity.getProperty(EntityProperty.WanRedcaveInBiome);
        entity.remove();
        resolve(inBiome);
      }, 2);
    } catch {
      resolve(false);
    }
  });
}
async function biomeEmitter(player) {
  const inBiome = await isInBiome(player);
  if (!inBiome) return;
  player.spawnParticle(Particle.WanRedcaveRedstoneCave1, player.location);
  player.spawnParticle(Particle.WanRedcaveRedstoneCave1, player.location);
  player.spawnParticle(Particle.WanRedcaveRedstoneCave1, player.location);
}
system.runInterval(() => {
  for (const player of world.getPlayers()) {
    biomeEmitter(player);
  }
}, 20);
world.afterEvents.playerHotbarSelectedSlotChange.subscribe(({ player, itemStack }) => {
  let interval = 0;
  switch (itemStack == null ? void 0 : itemStack.typeId) {
    case ItemType.WanRedcaveElectricDrillT1:
    case ItemType.WanRedcaveElectricDrillT2:
      interval = DrillEngine.runEngine(player);
      break;
    default:
      system.clearRun(interval);
      break;
  }
});
world.beforeEvents.playerBreakBlock.subscribe(({ player, block, cancel }) => {
  const item = Utility.getItemInMainhand(player);
  if (!item) return;
  switch (item.typeId) {
    case ItemType.WanRedcaveElectricDrillT1:
    case ItemType.WanRedcaveElectricDrillT2:
      DrillEngine.playerBreakBlock(player, item, block);
      break;
  }
});
const spawnEggIdentifiers = [
  "wan_redcave:redstone_creeper_spawn_egg",
  "wan_redcave:redstone_wing_spawn_egg",
  "wan_redcave:redstone_hound_spawn_egg",
  "wan_redcave:redstone_crawler_spawn_egg",
  "wan_redcave:redstone_longleg_spawn_egg"
];
world.afterEvents.playerInteractWithBlock.subscribe((event) => {
  const item = event.beforeItemStack;
  if (item && spawnEggIdentifiers.includes(item.typeId)) {
    const block = event.block;
    const radius = 16;
    const volume = new BlockVolume(
      { x: block.location.x - radius, y: block.location.y - radius, z: block.location.z - radius },
      { x: block.location.x + radius, y: block.location.y + radius, z: block.location.z + radius }
    );
    for (const b of block.dimension.getBlocks(volume, { includeTypes: [BlockType.WanRedcaveRedNetworkCore] }, true).getBlockLocationIterator()) {
      return;
    }
    const location = block.location;
    location.y += 1;
    block.dimension.spawnEntity(item.typeId.replace("_spawn_egg", ""), location, { spawnEvent: EntityEvent.WanRedcaveOff });
  }
});
const EMITTER_LIFETIME_TICKS = 20;
const INTERACTION_COOLDOWN_KEY = "wan_redcave:block_interaction_cooldown";
const ITEM_ID_TOUCHPAD = ItemType.WanRedcaveHolographicTouchpad;
const PENDING_LINK_KEY = "wan_redcave:pending_link";
const PARTICLE_RADIUS = 0.6;
const PARTICLE_COLORS = {
  INPUT_R: 0.2,
  INPUT_G: 0.6,
  INPUT_B: 1,
  OUTPUT_R: 1,
  OUTPUT_G: 0.3,
  OUTPUT_B: 0.2,
  ALPHA: 0.8
};
const CONFIG = {
  particles: {
    type: Particle.WanRedcaveMachineArrow1,
    enabled: true
  },
  linking: {
    particleDurationTicks: 60,
    particleIntervalTicks: 2
  },
  sneakView: {
    durationTicks: 60,
    intervalTicks: 2
  },
  cooldown: {
    interactionTicks: 5,
    particleViewTicks: 60
  },
  messages: {
    machineNotFound: "§cMachine data not found.",
    linkingMachineNotFound: "§c[LINKING] Machine not found. Cancelled.",
    linkingInvalidContainer: "§c[LINKING] Must click a container block (e.g., Chest).",
    linkingInputConnected: "§a[LINKING] Input connected. Linking complete!",
    linkingInputConnectedWaitOutput: "§a[LINKING] Input connected. §7Now click the output container.",
    linkingOutputConnected: "§a[LINKING] Output connected. Linking complete!",
    linkingOutputOnly: "§a[LINKING] Output connected. Linking complete!",
    linkingInputReplaced: "§e[LINKING] Input replaced. Linking complete!",
    linkingOutputReplaced: "§e[LINKING] Output replaced. Linking complete!",
    hopperInvalidMachine: "§c[LINKING] Invalid machine type.",
    hopperInputAdded: "§a[LINKING] Input link added!",
    hopperInputMaxed: "§c[LINKING] Maximum input links reached (5/5).",
    hopperOutputAdded: "§a[LINKING] Output link added!",
    hopperOutputMaxed: "§c[LINKING] Maximum output links reached (5/5)."
  }
};
function isOnCooldown(player) {
  const cooldown = player.getDynamicProperty(INTERACTION_COOLDOWN_KEY);
  if (!cooldown) return false;
  return system.currentTick < cooldown;
}
function setCooldown(player, ticks) {
  const cooldownTicks = ticks ?? CONFIG.cooldown.interactionTicks;
  player.setDynamicProperty(INTERACTION_COOLDOWN_KEY, system.currentTick + cooldownTicks);
}
function getPendingLinkState(player) {
  const raw = player.getDynamicProperty(PENDING_LINK_KEY);
  if (typeof raw !== "string") return void 0;
  try {
    return JSON.parse(raw);
  } catch {
    return void 0;
  }
}
function clearPendingLink(player) {
  player.setDynamicProperty(PENDING_LINK_KEY, void 0);
}
function getDistance(source, destination) {
  const dx = destination.x - source.x;
  const dy = destination.y - source.y;
  const dz = destination.z - source.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}
function getNormalizedDirection(source, destination) {
  const delta = {
    x: destination.x - source.x,
    y: destination.y - source.y,
    z: destination.z - source.z
  };
  const distance = Math.sqrt(delta.x * delta.x + delta.y * delta.y + delta.z * delta.z);
  if (distance === 0) return { x: 0, y: 0, z: 1 };
  return {
    x: delta.x / distance,
    y: delta.y / distance,
    z: delta.z / distance
  };
}
function spawnParticleWithColor(dimension, position, molangMap) {
  try {
    dimension.spawnParticle(CONFIG.particles.type, position, molangMap);
  } catch (e) {
    console.warn("Error spawning particles:", e);
  }
}
function spawnParticleLine(source, destination, isInput, invertDirection = false) {
  try {
    const dimension = world.getDimension("overworld");
    const distance = getDistance(source, destination);
    const rawDirection = getNormalizedDirection(source, destination);
    const direction = invertDirection ? { x: -rawDirection.x, y: -rawDirection.y, z: -rawDirection.z } : rawDirection;
    const startPos = source;
    const endPos = destination;
    const numSegments = Math.max(1, Math.round(distance));
    const molang = new MolangVariableMap();
    molang.setFloat("variable.v_x", direction.x);
    molang.setFloat("variable.v_y", direction.y);
    molang.setFloat("variable.v_z", direction.z);
    molang.setFloat("variable.radius", PARTICLE_RADIUS);
    if (isInput) {
      molang.setFloat("r", PARTICLE_COLORS.INPUT_R);
      molang.setFloat("g", PARTICLE_COLORS.INPUT_G);
      molang.setFloat("b", PARTICLE_COLORS.INPUT_B);
    } else {
      molang.setFloat("r", PARTICLE_COLORS.OUTPUT_R);
      molang.setFloat("g", PARTICLE_COLORS.OUTPUT_G);
      molang.setFloat("b", PARTICLE_COLORS.OUTPUT_B);
    }
    molang.setFloat("a", PARTICLE_COLORS.ALPHA);
    for (let i = 1; i < numSegments; i++) {
      const t = Math.min(1, (i + 0.5) / numSegments);
      const pos = {
        x: startPos.x + (endPos.x - startPos.x) * t,
        y: startPos.y + 0.5 + (endPos.y - startPos.y) * t,
        z: startPos.z + (endPos.z - startPos.z) * t
      };
      spawnParticleWithColor(dimension, pos, molang);
    }
  } catch (e) {
    console.warn("Error spawning particle line:", e);
  }
}
function locationsEqual(loc1, loc2) {
  if (!loc1 || !loc2) return false;
  return loc1.x === loc2.x && loc1.y === loc2.y && loc1.z === loc2.z;
}
function spawnParticlesForDuration(source, destination, isInput, invertDirection = false) {
  const duration = CONFIG.linking.particleDurationTicks;
  const interval = EMITTER_LIFETIME_TICKS;
  let ticksElapsed = 0;
  spawnParticleLine(source, destination, isInput, invertDirection);
  const intervalId2 = system.runInterval(() => {
    ticksElapsed += interval;
    if (ticksElapsed >= duration) {
      system.clearRun(intervalId2);
      return;
    }
    spawnParticleLine(source, destination, isInput, invertDirection);
  }, interval);
}
function showMachineLinks(machine, focusLocation) {
  const machineLocation = machine.location;
  const machinePos = {
    x: machineLocation.x + 0.5,
    y: machineLocation.y - 0.5,
    z: machineLocation.z + 0.5
  };
  const showAll = !focusLocation;
  const isHopperMachine = isWirelessHopper(machine);
  const targetLoc = focusLocation ? { x: focusLocation.x, y: focusLocation.y, z: focusLocation.z } : null;
  const duration = CONFIG.sneakView.durationTicks;
  const interval = EMITTER_LIFETIME_TICKS;
  let ticksElapsed = 0;
  const drawLink = (linkLoc, isInput) => {
    let isTarget = showAll;
    if (!showAll) {
      if (targetLoc !== null) {
        isTarget = locationsEqual(linkLoc, targetLoc);
      } else isTarget = false;
    }
    if (isTarget) {
      const linkPos = {
        x: linkLoc.x + 0.5,
        y: linkLoc.y - 0.5,
        z: linkLoc.z + 0.5
      };
      if (isInput) spawnParticleLine(machinePos, linkPos, true, false);
      else spawnParticleLine(linkPos, machinePos, false, false);
    }
    return isTarget && !showAll;
  };
  system.run(() => {
    var _a2, _b;
    if (!isHopperMachine || showAll) {
      if (machine.input && !Array.isArray(machine.input)) {
        if (drawLink(machine.input, true)) return;
      }
      if (Array.isArray(machine.input)) {
        for (const inputLoc of machine.input) if (drawLink(inputLoc, true)) return;
      }
      if (machine.output && !Array.isArray(machine.output)) {
        if (drawLink(machine.output, false)) return;
      }
      if (Array.isArray(machine.output)) {
        for (const outputLoc of machine.output) if (drawLink(outputLoc, false)) return;
      }
      if (showAll && isHopperMachine) {
        const hopperMachine = machine;
        const customInputs = hopperMachine.inputLinks || [];
        const customOutputs = hopperMachine.outputLinks || [];
        for (const inputLink of customInputs) if (drawLink(inputLink.location, true)) return;
        for (const outputLink of customOutputs) if (drawLink(outputLink.location, false)) return;
      }
    }
    if (!showAll && focusLocation) {
      const hopperMachine = machine;
      if ((_a2 = hopperMachine.hasInputLink) == null ? void 0 : _a2.call(hopperMachine, focusLocation)) {
        const linkPos = {
          x: focusLocation.x + 0.5,
          y: focusLocation.y - 0.5,
          z: focusLocation.z + 0.5
        };
        spawnParticleLine(machinePos, linkPos, true, false);
        return;
      }
      if ((_b = hopperMachine.hasOutputLink) == null ? void 0 : _b.call(hopperMachine, focusLocation)) {
        const linkPos = {
          x: focusLocation.x + 0.5,
          y: focusLocation.y - 0.5,
          z: focusLocation.z + 0.5
        };
        spawnParticleLine(linkPos, machinePos, false, false);
        return;
      }
    }
  });
  const intervalId2 = system.runInterval(() => {
    ticksElapsed += interval;
    if (ticksElapsed >= duration) {
      system.clearRun(intervalId2);
      return;
    }
    system.run(() => {
      var _a2, _b;
      if (!isHopperMachine || showAll) {
        if (machine.input && !Array.isArray(machine.input)) {
          if (drawLink(machine.input, true)) return;
        }
        if (Array.isArray(machine.input)) {
          for (const inputLoc of machine.input) if (drawLink(inputLoc, true)) return;
        }
        if (machine.output && !Array.isArray(machine.output)) {
          if (drawLink(machine.output, false)) return;
        }
        if (Array.isArray(machine.output)) {
          for (const outputLoc of machine.output) if (drawLink(outputLoc, false)) return;
        }
        if (showAll && isHopperMachine) {
          const hopperMachine = machine;
          const customInputs = hopperMachine.inputLinks || [];
          const customOutputs = hopperMachine.outputLinks || [];
          for (const inputLink of customInputs) if (drawLink(inputLink.location, true)) return;
          for (const outputLink of customOutputs) if (drawLink(outputLink.location, false)) return;
        }
      }
      if (!showAll && focusLocation) {
        const hopperMachine = machine;
        if ((_a2 = hopperMachine.hasInputLink) == null ? void 0 : _a2.call(hopperMachine, focusLocation)) {
          const linkPos = {
            x: focusLocation.x + 0.5,
            y: focusLocation.y - 0.5,
            z: focusLocation.z + 0.5
          };
          spawnParticleLine(machinePos, linkPos, true, false);
          return;
        }
        if ((_b = hopperMachine.hasOutputLink) == null ? void 0 : _b.call(hopperMachine, focusLocation)) {
          const linkPos = {
            x: focusLocation.x + 0.5,
            y: focusLocation.y - 0.5,
            z: focusLocation.z + 0.5
          };
          spawnParticleLine(linkPos, machinePos, false, false);
          return;
        }
      }
    });
  }, interval);
}
function getNetworkInfoString(network) {
  if (!network) {
    return "§7No network found";
  }
  network.totalSlots ?? 0;
  network.reservedSlots ?? 0;
  network.availableSlots ?? 0;
  return "";
}
function showMachineInfo(player, machine, block) {
  const location = machine.location;
  const network = findMachineNetwork(location);
  let actionBarMessage = getNetworkInfoString(network);
  const infoLines = [];
  const machineDefinition = Machines.find((m) => m.blockId === block.typeId);
  if (machineDefinition) {
    const cost = machineDefinition.energyCost;
    const costLine = `§rThis Machine: §e${cost} RE`;
    infoLines.push(costLine);
  } else {
    infoLines.push("§7Machine cost N/A");
  }
  let hasLinks = false;
  const isHopper = isWirelessHopper(machine);
  if (machine.input && !Array.isArray(machine.input)) {
    hasLinks = true;
  } else if (machine.output && !Array.isArray(machine.output)) {
    hasLinks = true;
  } else if (Array.isArray(machine.input) && machine.input.length > 0) {
    hasLinks = true;
  } else if (Array.isArray(machine.output) && machine.output.length > 0) {
    hasLinks = true;
  }
  if (isHopper) {
    const hopperMachine = machine;
    const customInputs = hopperMachine.inputLinks || [];
    const customOutputs = hopperMachine.outputLinks || [];
    if (customInputs.length > 0 || customOutputs.length > 0) {
      hasLinks = true;
    }
  }
  let linkMessage;
  if (hasLinks) {
    const inputCount = (Array.isArray(machine.input) ? machine.input.length : machine.input ? 1 : 0) + (isHopper ? (machine.inputLinks || []).length : 0);
    const outputCount = (Array.isArray(machine.output) ? machine.output.length : machine.output ? 1 : 0) + (isHopper ? (machine.outputLinks || []).length : 0);
    linkMessage = isHopper ? `§rLinks: §bI:${inputCount} O:${outputCount}` : "§rLinks: §bInput/Output Detected";
    showMachineLinks(machine);
  } else {
    linkMessage = "§7No IO links found";
  }
  infoLines.push(linkMessage);
  let finalMessageLines = [];
  if (infoLines.length >= 2) {
    finalMessageLines.push(infoLines[infoLines.length - 2]);
    finalMessageLines.push(infoLines[infoLines.length - 1]);
  } else {
    finalMessageLines = infoLines;
  }
  actionBarMessage = finalMessageLines.join("\n");
  player.onScreenDisplay.setActionBar(actionBarMessage);
}
function showGeneratorOrCoreInfo(player, block) {
  const location = Utility.blockToLocation(block);
  findMachineNetwork(location);
  let productionLine = "§7Production N/A";
  const linkLine = "§7No IO links";
  const generatorConfig = ENERGYCONFIG.generators[block.typeId];
  if (generatorConfig) {
    const production = generatorConfig.energyPerTick;
    productionLine = `§rThis Generator: §a+${production} RE`;
  }
  const actionBarMessage = `${productionLine}
${linkLine}`;
  player.onScreenDisplay.setActionBar(actionBarMessage);
}
function handleLinkingClick(player, block, state) {
  var _a2;
  const machine = MachineRegistry.get(state.machineId);
  if (!machine) {
    Utility.notify(player, CONFIG.messages.linkingMachineNotFound, "error");
    clearPendingLink(player);
    player.playSound("random.break");
    return;
  }
  if (!Utility.isValidContainer(block)) {
    Utility.notify(player, CONFIG.messages.linkingInvalidContainer, "error");
    player.playSound("random.break");
    return;
  }
  const location = Utility.blockToLocation(block);
  location.dimensionId = block.dimension.id;
  let linkCompleted = false;
  const machinePos = {
    x: machine.location.x + 0.5,
    y: machine.location.y - 0.5,
    z: machine.location.z + 0.5
  };
  const linkPos = {
    x: location.x + 0.5,
    y: location.y - 0.5,
    z: location.z + 0.5
  };
  const machineIOType = (_a2 = machine.getIOType) == null ? void 0 : _a2.call(machine);
  const isOutputOnly = machineIOType === "output_only";
  if (isOutputOnly) {
    Linking.setOutput(machine, location);
    Utility.notify(player, CONFIG.messages.linkingOutputOnly, "success");
    linkCompleted = true;
    player.playSound("random.orb");
    {
      system.run(() => spawnParticlesForDuration(linkPos, machinePos, false, false));
    }
  } else {
    if (!machine.input && state.hasInput) {
      Linking.setInput(machine, location);
      system.run(() => spawnParticlesForDuration(machinePos, linkPos, true, false));
      if (machine.output || !state.hasOutput) {
        Utility.notify(player, CONFIG.messages.linkingInputConnected, "success");
        linkCompleted = true;
        player.playSound("random.orb");
      } else {
        Utility.notify(player, CONFIG.messages.linkingInputConnectedWaitOutput, "success");
        player.playSound("random.click");
      }
    } else if (!machine.output && state.hasOutput) {
      Linking.setOutput(machine, location);
      system.run(() => spawnParticlesForDuration(linkPos, machinePos, false, false));
      Utility.notify(player, CONFIG.messages.linkingOutputConnected, "success");
      linkCompleted = true;
      player.playSound("random.orb");
    } else {
      if (state.hasInput) {
        Linking.setInput(machine, location);
        system.run(() => spawnParticlesForDuration(machinePos, linkPos, true, false));
        Utility.notify(player, CONFIG.messages.linkingInputReplaced, "success");
      } else {
        Linking.setOutput(machine, location);
        system.run(() => spawnParticlesForDuration(linkPos, machinePos, false, false));
        Utility.notify(player, CONFIG.messages.linkingOutputReplaced, "success");
      }
      linkCompleted = true;
      player.playSound("random.orb");
    }
  }
  if (linkCompleted) clearPendingLink(player);
}
function handleHopperLinkingClick(player, block) {
  const rawState = player.getDynamicProperty("wan_redcave:pending_hopper_link");
  if (!rawState || typeof rawState !== "string") return false;
  const state = JSON.parse(rawState);
  const machine = MachineRegistry.get(state.machineId);
  if (!machine) {
    Utility.notify(player, CONFIG.messages.linkingMachineNotFound, "error");
    player.setDynamicProperty("wan_redcave:pending_hopper_link", void 0);
    return true;
  }
  const isHopperMachine = isWirelessHopper(machine);
  if (!isHopperMachine) {
    Utility.notify(player, CONFIG.messages.hopperInvalidMachine, "error");
    player.setDynamicProperty("wan_redcave:pending_hopper_link", void 0);
    return true;
  }
  if (!Utility.isValidContainer(block)) {
    Utility.notify(player, CONFIG.messages.linkingInvalidContainer, "error");
    return true;
  }
  const location = Utility.blockToLocation(block);
  location.dimensionId = block.dimension.id;
  const machinePos = {
    x: machine.location.x + 0.5,
    y: machine.location.y - 0.5,
    z: machine.location.z + 0.5
  };
  const linkPos = {
    x: location.x + 0.5,
    y: location.y - 0.5,
    z: location.z + 0.5
  };
  let success = false;
  const hopperMachine = machine;
  if (state.isInput) {
    success = hopperMachine.addInputLink(location);
    if (success) Utility.notify(player, CONFIG.messages.hopperInputAdded, "success");
    else Utility.notify(player, CONFIG.messages.hopperInputMaxed, "error");
  } else {
    success = hopperMachine.addOutputLink(location);
    if (success) Utility.notify(player, CONFIG.messages.hopperOutputAdded, "success");
    else Utility.notify(player, CONFIG.messages.hopperOutputMaxed, "error");
  }
  if (success) {
    MachineRegistry.saveToWorld();
    {
      if (state.isInput) system.run(() => spawnParticlesForDuration(machinePos, linkPos, true, false));
      else system.run(() => spawnParticlesForDuration(linkPos, machinePos, false, false));
    }
  }
  player.setDynamicProperty("wan_redcave:pending_hopper_link", void 0);
  return true;
}
world.beforeEvents.playerInteractWithBlock.subscribe((event) => {
  var _a2, _b, _c, _d;
  const { player, block } = event;
  const itemStack = (_b = (_a2 = player.getComponent(EntityComponentTypes.Inventory)) == null ? void 0 : _a2.container) == null ? void 0 : _b.getItem(player.selectedSlotIndex);
  if (itemStack && itemStack.typeId === ITEM_ID_TOUCHPAD) return;
  const isMachine = block.hasTag("wan_redcave:machine");
  const isAccessPanel = block.typeId === BlockType.WanRedcaveNetworkAccessPanel;
  const NETWORK_CORES = [
    BlockType.WanRedcaveBlueNetworkCore,
    BlockType.WanRedcaveGeneratorT1,
    BlockType.WanRedcaveGeneratorT2
  ];
  const isNetworkCore = NETWORK_CORES.includes(block.typeId);
  const isContainer = Utility.isValidContainer(block);
  const pendingState = getPendingLinkState(player);
  const isSneaking = player.isSneaking;
  if (handleHopperLinkingClick(player, block)) {
    event.cancel = true;
    return;
  }
  if (pendingState && isContainer) {
    event.cancel = true;
    if (isOnCooldown(player)) return;
    setCooldown(player);
    system.run(() => handleLinkingClick(player, block, pendingState));
    return;
  }
  if (isNetworkCore && isSneaking) {
    event.cancel = true;
    if (isOnCooldown(player)) return;
    setCooldown(player, CONFIG.cooldown.particleViewTicks);
    system.run(() => {
      showGeneratorOrCoreInfo(player, block);
    });
    return;
  }
  if (!isMachine && !isAccessPanel && !isNetworkCore) {
    if (isContainer && isSneaking) {
      const location = Utility.blockToLocation(block);
      let machine = MachineRegistry.findByLinkedContainer(location);
      if (!machine) {
        for (const m of MachineRegistry.machines.values()) {
          if (isWirelessHopper(m)) {
            const machineLocation = {
              x: location.x,
              y: location.y,
              z: location.z,
              dimensionId: block.dimension.id
            };
            const hopperMachine = m;
            if (((_c = hopperMachine.hasInputLink) == null ? void 0 : _c.call(hopperMachine, machineLocation)) || ((_d = hopperMachine.hasOutputLink) == null ? void 0 : _d.call(hopperMachine, machineLocation))) {
              machine = m;
              break;
            }
          }
        }
      }
      if (machine) {
        event.cancel = true;
        if (isOnCooldown(player)) return;
        setCooldown(player, CONFIG.cooldown.particleViewTicks);
        const focusLocation = {
          x: location.x,
          y: location.y,
          z: location.z,
          dimensionId: block.dimension.id
        };
        system.run(() => showMachineLinks(machine, focusLocation));
        return;
      }
    }
    return;
  }
  if (isOnCooldown(player)) {
    event.cancel = true;
    return;
  }
  setCooldown(player);
  event.cancel = true;
  system.run(() => {
    if (isAccessPanel) {
      const machine = MachineRegistry.findByLocation(Utility.blockToLocation(block));
      if (machine) {
        machine.startWorking();
        machine.forceVisualUpdate();
      }
      openMachineFilterForm(player, block);
    } else if (isMachine) {
      const machine = MachineRegistry.findByLocation(Utility.blockToLocation(block));
      if (!machine) {
        Utility.notify(player, CONFIG.messages.machineNotFound, "error");
        return;
      }
      if (isSneaking) {
        setCooldown(player, CONFIG.cooldown.particleViewTicks);
        showMachineInfo(player, machine, block);
      } else {
        openMachineConfigForm(player, machine);
      }
    }
  });
});
class ProcessingMachine extends MachineBase {
  /**
   * Executes the core processing logic for one tick.
   */
  processTick() {
    if (!this.getIsRunning()) {
      this.clearProcessing();
      return;
    }
    const block = this.getBlock();
    if (!block) return;
    const def = getDefinitionByBlockId(block.typeId);
    if (!def) return;
    const inputLoc = Array.isArray(this.input) ? this.input[0] : this.input;
    const outputLoc = Array.isArray(this.output) ? this.output[0] : this.output;
    const inputContainer = inputLoc ? Utility.getContainerAt(inputLoc) : null;
    const outputContainer = outputLoc ? Utility.getContainerAt(outputLoc) : null;
    const hasInput = !!inputContainer;
    const hasOutput = !!outputContainer;
    if (!hasInput || !hasOutput) {
      this.clearProcessing();
      return;
    }
    if (this.isProcessing()) {
      const completed = this.advanceProgress(def.ticksPerProcess);
      if (completed) {
        if (this.processingOutputAmount === void 0 || this.processingOutputAmount < 1) {
          this.clearProcessing();
          return;
        }
        const success = RecipeProcessor.outputResult(
          this.processingOutputId,
          this.processingOutputAmount,
          outputContainer
        );
        if (success) {
          this.lastProcessedItem = ItemDB.getIdByItem(this.processingItemId);
          this.clearProcessing();
        } else {
          this.processingTicks--;
        }
      }
      return;
    }
    const consumeResult = RecipeProcessor.consumeAndStartProcess(this, def, inputContainer);
    if (consumeResult) {
      this.startProcessing(
        consumeResult.inputId,
        consumeResult.outputId,
        consumeResult.outputAmount
      );
    }
  }
}
class ElectricOven extends ProcessingMachine {
}
class Crusher extends ProcessingMachine {
}
const TIER2_RANGE = 5;
const PERIMETER_PARTICLE_TYPE = "minecraft:endrod";
const PARTICLE_UPDATE_RATE = 5;
class AutoFarmer extends MachineBase {
  constructor(data) {
    super(data);
    __publicField(this, "processingCooldown", 0);
    __publicField(this, "particleCooldown", 0);
    this.processingCooldown = data.processingCooldown ?? 0;
    this.particleCooldown = data.particleCooldown ?? 0;
  }
  // --- Persistent Data Management ---
  get farmerData() {
    const base = this.getBaseData();
    if (!base.selectedCrop) base.selectedCrop = "wheat";
    if (base.showPerimeter === void 0) base.showPerimeter = false;
    if (!base.cropWhitelist) base.cropWhitelist = [];
    return base;
  }
  serialize() {
    const s = super.serialize();
    return {
      ...s,
      selectedCrop: this.farmerData.selectedCrop,
      showPerimeter: this.farmerData.showPerimeter,
      cropWhitelist: this.farmerData.cropWhitelist,
      processingCooldown: this.processingCooldown,
      particleCooldown: this.particleCooldown
    };
  }
  // --- Tier and IO ---
  get tier() {
    var _a2;
    return ((_a2 = getDefinitionByBlockId(this.typeId)) == null ? void 0 : _a2.tier) ?? 1;
  }
  isTier2() {
    return this.tier === 2;
  }
  getIOType() {
    return MachineIOType.OUTPUT_ONLY;
  }
  getIsRunning() {
    return super.getIsRunning() && this.output !== void 0;
  }
  // --- Getters/Setters ---
  get selectedCrop() {
    return this.farmerData.selectedCrop ?? "wheat";
  }
  updateSelectedCrop(cropId) {
    this.farmerData.selectedCrop = cropId;
    this.save();
  }
  get cropWhitelist() {
    var _a2;
    return ((_a2 = this.farmerData.cropWhitelist) == null ? void 0 : _a2.filter((n) => typeof n === "number")) ?? [];
  }
  updateWhitelist(list) {
    this.farmerData.cropWhitelist = list;
    this.save();
  }
  get showPerimeter() {
    return this.farmerData.showPerimeter ?? false;
  }
  updateShowPerimeter(value) {
    this.farmerData.showPerimeter = value;
    this.save();
  }
  get enableAcceleration() {
    return false;
  }
  updateAcceleration(_value) {
  }
  // --- Tick Processing ---
  get ticksPerCycle() {
    var _a2;
    return ((_a2 = getDefinitionByBlockId(this.typeId)) == null ? void 0 : _a2.ticksPerProcess) ?? 600;
  }
  processTick() {
    if (!this.getIsRunning()) {
      this.particleCooldown = 0;
      this.processingCooldown = 0;
      return;
    }
    const block = this.getBlock();
    if (!block) return;
    if (this.tier === 2 && this.showPerimeter) {
      if (--this.particleCooldown <= 0) {
        this.showOutline(block.dimension, block);
        this.particleCooldown = PARTICLE_UPDATE_RATE;
      }
    } else {
      this.particleCooldown = 0;
    }
    if (--this.processingCooldown > 0) return;
    this.processingCooldown = this.ticksPerCycle;
    if (this.tier === 1) this.processTier1();
    else this.processTier2(block);
  }
  determineWorkingFlag() {
    return this.processingCooldown > 0;
  }
  // --- Tier 1 Implementation ---
  processTier1() {
    const cropDef = getCropById(this.selectedCrop);
    if (!cropDef) return;
    const amount = Math.floor(Math.random() * (cropDef.maxAmount - cropDef.minAmount + 1)) + cropDef.minAmount;
    const itemStack = new ItemStack(cropDef.outputItem, amount);
    this.tryOutputItem(itemStack);
  }
  // --- Tier 2 Implementation ---
  processTier2(block) {
    const { x, y, z } = block.location;
    const dim = block.dimension;
    for (let dx = -TIER2_RANGE; dx <= TIER2_RANGE; dx++) {
      for (let dz = -TIER2_RANGE; dz <= TIER2_RANGE; dz++) {
        const cropBlock = dim.getBlock({ x: x + dx, y, z: z + dz });
        if (!cropBlock) continue;
        const type = cropBlock.typeId;
        const cropDef = getCropByBlockType(type);
        if (!cropDef) continue;
        if (cropDef.id === "melon" || cropDef.id === "pumpkin") {
          this.handleCropBlock(cropBlock, cropDef);
          continue;
        }
        const permutation = cropBlock.permutation;
        const growth = permutation.getState("growth") ?? permutation.getState("age");
        if (!growth || growth < cropDef.maxGrowthStage) continue;
        this.handleCropBlock(cropBlock, cropDef);
      }
    }
  }
  handleCropBlock(block, cropDef) {
    const whitelist = this.cropWhitelist;
    if (whitelist.length > 0) {
      const outputNumericId = ItemDB.getIdByItem(cropDef.outputItem);
      if (!whitelist.includes(outputNumericId)) {
        return;
      }
    }
    if (cropDef.id === "melon" || cropDef.id === "pumpkin") {
      const amount2 = Math.floor(Math.random() * (cropDef.maxAmount - cropDef.minAmount + 1)) + cropDef.minAmount;
      const itemStack2 = new ItemStack(cropDef.outputItem, amount2);
      const success2 = this.tryOutputItem(itemStack2);
      if (success2) {
        try {
          block.setType("minecraft:air");
          block.dimension.spawnParticle("minecraft:happy_villager", { x: block.x + 0.5, y: block.y + 0.5, z: block.z + 0.5 });
        } catch {
        }
      }
      return;
    }
    const growthState = block.permutation.getState(cropDef.growthStateName);
    if (typeof growthState !== "number") return;
    if (growthState < cropDef.maxGrowthStage) return;
    const amount = Math.floor(Math.random() * (cropDef.maxAmount - cropDef.minAmount + 1)) + cropDef.minAmount;
    const itemStack = new ItemStack(cropDef.outputItem, amount);
    const success = this.tryOutputItem(itemStack);
    if (success) {
      try {
        block.setPermutation(block.permutation.withState(cropDef.growthStateName, 0));
        block.dimension.spawnParticle("minecraft:happy_villager", { x: block.x + 0.5, y: block.y + 0.5, z: block.z + 0.5 });
      } catch {
      }
    }
  }
  // --- Utility Methods ---
  tryOutputItem(itemStack) {
    const outputLoc = Array.isArray(this.output) ? this.output[0] : this.output;
    if (!outputLoc) return false;
    const container = Utility.getContainerAt(outputLoc);
    if (!container) return false;
    try {
      const remaining = container.addItem(itemStack);
      return !remaining || remaining.amount === 0;
    } catch {
      return false;
    }
  }
  // --- Utility Methods ---
  showOutline(dim, block) {
    const origin = block.location;
    const range = TIER2_RANGE;
    const side = range * 2 + 1;
    const y = origin.y + 0.5;
    const minX = origin.x - range;
    const maxX = origin.x + range + 1;
    const minZ = origin.z - range;
    const maxZ = origin.z + range + 1;
    const particles = [];
    for (let i = 0; i < side; i++) {
      particles.push({ x: minX, y, z: minZ + i + 0.5 });
      particles.push({ x: maxX, y, z: minZ + i + 0.5 });
      particles.push({ x: minX + i + 0.5, y, z: minZ });
      particles.push({ x: minX + i + 0.5, y, z: maxZ });
    }
    for (const loc of particles) {
      dim.spawnParticle(PERIMETER_PARTICLE_TYPE, {
        x: loc.x + (Math.random() * 0.1 - 0.05),
        y: loc.y + (Math.random() * 0.1 - 0.05),
        z: loc.z + (Math.random() * 0.1 - 0.05)
      });
    }
  }
}
const QUARRY_CONFIG = {
  AREA_SIZE: 8,
  // Width/length of the area (X and Z)
  MAX_DEPTH: 32,
  // How deep it can dig (Y)
  TICKS_PER_BLOCK: 40,
  // Ticks between blocks mined
  PARTICLE_UPDATE_RATE: 5,
  // How often (in ticks) to update the perimeter particles
  PARTICLE_TYPE: "minecraft:endrod",
  // Particle used for the perimeter outline
  MINING_MODE: "layered"
  // 'layered' = digs layer by layer, 'random' = random position
};
const QUARRY_HALFSIDE = QUARRY_CONFIG.AREA_SIZE / 2;
class Quarry extends MachineBase {
  constructor(data) {
    super(data);
    __publicField(this, "cooldown", 0);
    __publicField(this, "particleCooldown", 0);
    this.cooldown = data.cooldown ?? 0;
    this.particleCooldown = data.particleCooldown ?? 0;
  }
  /** Returns the underlying data cast as QuarryData for easier access. */
  get quarryData() {
    return this.getBaseData();
  }
  // -------------------------------------------------------------------------
  // --- PERSISTENCE OVERRIDE ---
  // -------------------------------------------------------------------------
  /**
   * Overrides base method to include Quarry-specific state fields for saving.
   */
  serialize() {
    const baseData = super.serialize();
    return {
      ...baseData,
      active: this.quarryData.active,
      showOutline: this.quarryData.showOutline,
      currentY: this.quarryData.currentY,
      currentX: this.quarryData.currentX,
      currentZ: this.quarryData.currentZ,
      cooldown: this.cooldown,
      particleCooldown: this.particleCooldown
    };
  }
  // -------------------------------------------------------------------------
  // --- PROPERTIES & TOGGLES ---
  // -------------------------------------------------------------------------
  setActive(value) {
    this.quarryData.active = value;
    this.save();
  }
  setShowPerimeter(value) {
    this.quarryData.showOutline = value;
    this.save();
  }
  /** Active state of the Quarry */
  get active() {
    return this.quarryData.active ?? false;
  }
  /** Toggles the active mining state. */
  toggleActive() {
    this.quarryData.active = !this.active;
    if (this.active && this.quarryData.currentY === void 0) {
      const block = this.getBlock();
      if (block) {
        this.quarryData.currentY = block.location.y;
        this.quarryData.currentX = 0;
        this.quarryData.currentZ = 0;
      }
    }
    this.save();
  }
  /** Perimeter particle toggle */
  get showPerimeter() {
    return this.quarryData.showOutline ?? true;
  }
  set showPerimeter(value) {
    this.quarryData.showOutline = value;
    this.save();
  }
  /** Quarry is an output-only machine, it does not require an input link. */
  getIOType() {
    return MachineIOType.OUTPUT_ONLY;
  }
  // -------------------------------------------------------------------------
  // --- MAIN TICK LOGIC ---
  // -------------------------------------------------------------------------
  /**
  * Get block facing direction
  */
  getBlockDirection(block) {
    const directionState = block.permutation.getState("minecraft:cardinal_direction");
    if (typeof directionState === "string") {
      switch (directionState) {
        case "north":
          return "north";
        case "south":
          return "south";
        case "east":
          return "east";
        case "west":
          return "west";
        case "up":
        case "down":
          return "north";
        default:
          return "north";
      }
    }
    return "north";
  }
  /**
  * Calculate mining bounds based on block direction
  */
  calculateMiningBounds(origin, direction) {
    const size = QUARRY_CONFIG.AREA_SIZE;
    const half = QUARRY_HALFSIDE;
    switch (direction) {
      case "north":
        return {
          minX: origin.x - half,
          maxX: origin.x + half - 1,
          minZ: origin.z - size,
          maxZ: origin.z - 1
        };
      case "south":
        return {
          minX: origin.x - half,
          maxX: origin.x + half - 1,
          minZ: origin.z + 1,
          maxZ: origin.z + size
        };
      case "east":
        return {
          minX: origin.x + 1,
          maxX: origin.x + size,
          minZ: origin.z - half,
          maxZ: origin.z + half - 1
        };
      case "west":
        return {
          minX: origin.x - size,
          maxX: origin.x - 1,
          minZ: origin.z - half,
          maxZ: origin.z + half - 1
        };
    }
  }
  /** Main tick processing */
  processTick() {
    const block = this.getBlock();
    if (!block) return;
    const dim = block.dimension;
    if (this.showPerimeter) {
      this.particleCooldown--;
      if (this.particleCooldown <= 0) {
        try {
          this.showOutline(dim, block);
          this.particleCooldown = QUARRY_CONFIG.PARTICLE_UPDATE_RATE;
        } catch (error) {
          this.particleCooldown = QUARRY_CONFIG.PARTICLE_UPDATE_RATE;
        }
      }
    }
    if (!this.active || !this.getIsRunning()) {
      this.clearProcessing();
      this.cooldown = 0;
      return;
    }
    if (this.cooldown-- > 0) return;
    this.cooldown = QUARRY_CONFIG.TICKS_PER_BLOCK;
    if (!this.output) return;
    this.performMining(block, dim);
  }
  // -------------------------------------------------------------------------
  // --- MINING LOGIC ---
  // -------------------------------------------------------------------------
  /**
  * Performs mining of a single block.
  */
  performMining(block, dim) {
    const origin = block.location;
    const direction = this.getBlockDirection(block);
    const bounds = this.calculateMiningBounds(origin, direction);
    let targetLoc;
    {
      targetLoc = this.getNextLayeredPosition(origin, bounds.minX, bounds.maxX, bounds.minZ, bounds.maxZ);
    }
    let target;
    try {
      target = dim.getBlock(targetLoc);
    } catch (error) {
      this.cooldown = 0;
      return;
    }
    if (!target) return;
    if (this.shouldSkipBlock(target)) {
      this.save();
      this.cooldown = 0;
      return;
    }
    const itemStack = target.getItemStack(1);
    if (!itemStack) return;
    const outputLoc = Array.isArray(this.output) ? this.output[0] : this.output;
    if (!outputLoc) return;
    const container = Utility.getContainerAt(outputLoc);
    if (!container) return;
    const remainingItem = container.addItem(itemStack);
    if (remainingItem && remainingItem.amount > 0) {
      return;
    }
    target.setType(MinecraftBlockTypes.Air);
    dim.playSound("dig.stone", target.location);
    this.save();
  }
  /**
   * Gets the next position in layered mining mode.
   */
  getNextLayeredPosition(origin, minX, maxX, minZ, maxZ) {
    if (this.quarryData.currentY === void 0) {
      this.quarryData.currentY = origin.y;
      this.quarryData.currentX = 0;
      this.quarryData.currentZ = 0;
    }
    const xIndex = this.quarryData.currentX ?? 0;
    const zIndex = this.quarryData.currentZ ?? 0;
    const y = this.quarryData.currentY ?? origin.y;
    const currentX = minX + xIndex;
    const currentZ = minZ + zIndex;
    this.quarryData.currentZ = zIndex + 1;
    if (currentZ >= maxZ) {
      this.quarryData.currentZ = 0;
      this.quarryData.currentX = xIndex + 1;
    }
    if (currentX >= maxX && currentZ >= maxZ) {
      this.quarryData.currentX = 0;
      this.quarryData.currentZ = 0;
      this.quarryData.currentY = y - 1;
    }
    if (y < origin.y - QUARRY_CONFIG.MAX_DEPTH) {
      this.quarryData.currentY = origin.y;
      this.quarryData.currentX = 0;
      this.quarryData.currentZ = 0;
    }
    return { x: currentX, y, z: currentZ };
  }
  /**
   * Gets a random position in the mining area.
   */
  getRandomPosition(minX, maxX, minZ, maxZ, originY) {
    const x = Math.floor(Math.random() * QUARRY_CONFIG.AREA_SIZE) + minX;
    const z = Math.floor(Math.random() * QUARRY_CONFIG.AREA_SIZE) + minZ;
    const y = originY - Math.floor(Math.random() * QUARRY_CONFIG.MAX_DEPTH);
    return { x, y, z };
  }
  /**
   * Determines if a block should be skipped for mining.
   */
  shouldSkipBlock(block) {
    const typeId = block.typeId;
    return typeId === "minecraft:air" || typeId.includes("bedrock") || typeId === this.typeId || typeId.includes("barrier") || typeId.includes("command_block");
  }
  // -------------------------------------------------------------------------
  // --- VISUALS & DEBUG ---
  // -------------------------------------------------------------------------
  /**
   * Shows the perimeter outline of the 16x16 mining area using particles.
   */
  showOutline(dim, block) {
    const origin = block.location;
    const direction = this.getBlockDirection(block);
    const bounds = this.calculateMiningBounds(origin, direction);
    const y = origin.y + 0.5;
    const particles = [];
    const xRange = bounds.maxX - bounds.minX + 1;
    const zRange = bounds.maxZ - bounds.minZ + 1;
    for (let i = 0; i <= xRange; i++) {
      particles.push({ x: bounds.minX + i, y, z: bounds.minZ + 0.5 });
      particles.push({ x: bounds.minX + i, y, z: bounds.maxZ + 0.5 });
    }
    for (let i = 0; i <= zRange; i++) {
      particles.push({ x: bounds.minX + 0.5, y, z: bounds.minZ + i });
      particles.push({ x: bounds.maxX + 0.5, y, z: bounds.minZ + i });
    }
    for (const loc of particles) {
      dim.spawnParticle(QUARRY_CONFIG.PARTICLE_TYPE, {
        x: loc.x + (Math.random() * 0.1 - 0.05),
        y: loc.y + (Math.random() * 0.1 - 0.05),
        z: loc.z + (Math.random() * 0.1 - 0.05)
      });
    }
  }
  /**
   * Reset mining position to the Quarry's Y level.
   */
  resetMiningPosition() {
    const block = this.getBlock();
    if (block) {
      this.quarryData.currentY = block.location.y;
      this.quarryData.currentX = 0;
      this.quarryData.currentZ = 0;
      this.save();
    }
  }
  /**
   * Override to determine working state based on active status and cooldown.
   */
  determineWorkingFlag() {
    return this.active && this.cooldown > 0;
  }
}
class AccessPanel extends MachineBase {
  processTick() {
  }
  getIOType() {
    return MachineIOType.CUSTOM;
  }
}
const MACHINE_MAP = {
  [BlockType.WanRedcaveElectricOvenT1]: ElectricOven,
  [BlockType.WanRedcaveElectricOvenT2]: ElectricOven,
  [BlockType.WanRedcaveCrusherT1]: Crusher,
  [BlockType.WanRedcaveCrusherT2]: Crusher,
  [BlockType.WanRedcaveWirelessHopper]: WirelessHopper,
  [BlockType.WanRedcaveAutofarmerT1]: AutoFarmer,
  [BlockType.WanRedcaveAutofarmerT2]: AutoFarmer,
  [BlockType.WanRedcaveQuarry]: Quarry,
  [BlockType.WanRedcaveNetworkAccessPanel]: AccessPanel
};
const machineFactory = (data) => {
  const MachineClass = MACHINE_MAP[data.typeId];
  if (MachineClass) {
    return new MachineClass(data);
  }
  return void 0;
};
function startMachineTickLoop() {
  system.runInterval(() => {
    const machines = MachineRegistry.getAll();
    for (const machine of machines) {
      machine.tick();
    }
  }, 1);
}
world.afterEvents.playerPlaceBlock.subscribe((event) => {
  var _a2;
  const block = event.block;
  const player = event.player;
  const isAccessPanel = block.typeId === BlockType.WanRedcaveNetworkAccessPanel;
  if (!block.hasTag("wan_redcave:machine") && !isAccessPanel) return;
  const typeId = block.typeId;
  let tierRange = 0;
  let isActive = false;
  const energyCost = 0;
  if (typeId === BlockType.WanRedcaveAutofarmerT2) {
    tierRange = 5;
  } else if (typeId === BlockType.WanRedcaveAutofarmerT1) {
    tierRange = 0;
  }
  if (typeId === BlockType.WanRedcaveQuarry) {
    isActive = false;
  }
  const machineData = {
    id: Utility.generateMachineId(typeId),
    typeId,
    location: Utility.blockToLocation(block),
    name: ((_a2 = typeId.split(":").pop()) == null ? void 0 : _a2.replace(/_/g, " ")) ?? "Machine",
    whitelist: [],
    config: {
      baseInputId: 0,
      resultId: 0,
      energyCost,
      tierRange
      // Initial tier range for AutoFarmer
    },
    processingTicks: 0,
    // Quarry specific state initialization
    active: isActive,
    miningX: 0,
    miningZ: 0,
    miningY: 0,
    // Starts at the block level and goes down (origin.y - miningY)
    selectedCrop: void 0,
    showPerimeter: false,
    cropWhitelist: []
  };
  const machine = machineFactory(machineData);
  if (machine) {
    MachineRegistry.add(machine);
    Utility.notify(player, `§aNew machine placed: §e${machine.name}`, "success");
    player.playSound("random.orb");
  } else {
    Utility.notify(player, "§cFailed to create machine! (Type not recognized by factory)", "error");
  }
});
world.afterEvents.playerBreakBlock.subscribe((event) => {
  const block = event.block;
  const player = event.player;
  const location = Utility.blockToLocation(block);
  const machine = MachineRegistry.findByLocation(location);
  if (!machine) {
    return;
  }
  MachineRegistry.remove(machine.id);
  Utility.notify(player, `§cMachine removed: §e${machine.name}`, "info");
  player.playSound("random.break");
});
system.afterEvents.scriptEventReceive.subscribe((event) => {
  const player = event.sourceEntity instanceof Player ? event.sourceEntity : void 0;
  if (event.id === "wan_redcave:reset_machines") {
    MachineRegistry.reset(player);
    return;
  }
  if (event.id === "wan_redcave:cleanup") {
    const removed = MachineRegistry.cleanup();
    const msg = `§aCleanup complete: removed ${removed} invalid machine(s)`;
    if (player) {
      Utility.notify(player, msg, "success");
    } else {
      world.sendMessage(`§7[§eSystem§7]§r ${msg}`);
    }
    return;
  }
  if (event.id === "wan_redcave:list_machines") {
    const machines = MachineRegistry.getAll();
    if (machines.length === 0) {
      const msg = "§7No machines found.";
      if (player) player.sendMessage(msg);
      else world.sendMessage(msg);
      return;
    }
    const lines = [
      `§7[§eRedCave§7]§r Machine List (${machines.length} total):`,
      ...machines.map(
        (m, i) => `§7${i + 1}. §f${m.name} §7(${m.typeId.split(":").pop()}) ${m.getIsRunning() ? "§a[ON]" : "§c[OFF]"}§r`
      )
    ];
    if (player) lines.forEach((line) => player.sendMessage(line));
    else lines.forEach((line) => world.sendMessage(line));
  }
});
const AllMachineRegistrations = [
  {
    typeId: BlockType.WanRedcaveElectricOvenT1,
    category: MachineCategory.SMELTING,
    icon: "textures/wan/redcave/ui/buttons/electric_oven_tier1"
  },
  {
    typeId: BlockType.WanRedcaveElectricOvenT2,
    category: MachineCategory.SMELTING,
    icon: "textures/wan/redcave/ui/buttons/electric_oven_tier2"
  },
  {
    typeId: BlockType.WanRedcaveCrusherT1,
    category: MachineCategory.CRUSHING,
    icon: "textures/wan/redcave/ui/buttons/crusher_tier1"
  },
  {
    typeId: BlockType.WanRedcaveCrusherT2,
    category: MachineCategory.CRUSHING,
    icon: "textures/wan/redcave/ui/buttons/crusher_tier2"
  },
  {
    typeId: BlockType.WanRedcaveWirelessHopper,
    category: MachineCategory.TRANSFER,
    icon: "textures/wan/redcave/ui/buttons/wireless_hopper"
  },
  {
    typeId: BlockType.WanRedcaveAutofarmerT1,
    category: MachineCategory.FARMING,
    icon: "textures/wan/redcave/ui/buttons/autofarmer_tier1"
  },
  {
    typeId: BlockType.WanRedcaveAutofarmerT2,
    category: MachineCategory.FARMING,
    icon: "textures/wan/redcave/ui/buttons/autofarmer_tier2"
  },
  {
    typeId: BlockType.WanRedcaveQuarry,
    category: MachineCategory.MINING,
    icon: "textures/wan/redcave/ui/buttons/quarry_tier2"
  },
  {
    typeId: BlockType.WanRedcaveNetworkAccessPanel,
    category: MachineCategory.NETWORKACCESSPANEL,
    icon: "textures/wan/redcave/ui/buttons/network_access_panel"
  }
];
function registerAllMachines(registry) {
  AllMachineRegistrations.forEach((def) => registry.registerType(def));
}
const SLOT_MAP = {
  head: EquipmentSlot.Head,
  chest: EquipmentSlot.Chest,
  legs: EquipmentSlot.Legs,
  feet: EquipmentSlot.Feet
};
class ArmorManager {
  constructor(armorKey, pieces) {
    this.armorKey = armorKey;
    this.pieces = pieces;
  }
  /**
    * Equips the full armor set on the player
    */
  enable(player) {
    if (player.getDynamicProperty(this.armorKey)) return;
    const eq = player.getComponent(EntityComponentTypes.Equippable);
    if (!eq) return;
    for (const [slotName, itemId] of Object.entries(this.pieces)) {
      const slot = SLOT_MAP[slotName];
      const currentItem = eq.getEquipment(slot);
      if (currentItem) {
        eq.setEquipment(slot);
        player.dimension.spawnItem(currentItem, player.location);
      }
      const newItem = new ItemStack(itemId, 1);
      newItem.lockMode = ItemLockMode.slot;
      eq.setEquipment(slot, newItem);
    }
    player.setDynamicProperty(this.armorKey, true);
  }
  /**
    * Removes the full armor set from the player
    */
  disable(player) {
    if (!player.getDynamicProperty(this.armorKey)) return;
    const eq = player.getComponent(EntityComponentTypes.Equippable);
    if (!eq) return;
    for (const slotName of Object.keys(this.pieces)) {
      const slot = SLOT_MAP[slotName];
      eq.setEquipment(slot);
    }
    player.setDynamicProperty(this.armorKey, false);
  }
  /**
    * Checks if the armor is currently enabled
    */
  isEnabled(player) {
    return player.getDynamicProperty(this.armorKey) || false;
  }
  /**
    * Detects if player is wearing armor from another tier
    */
  detectOtherTierArmor(player) {
    const eq = player.getComponent(EntityComponentTypes.Equippable);
    if (!eq) return false;
    for (const slot of Object.values(SLOT_MAP)) {
      const item = eq.getEquipment(slot);
      if (item && item.typeId.startsWith("wan_redcave:") && !Object.values(this.pieces).includes(item.typeId)) {
        return true;
      }
    }
    return false;
  }
}
const CONFIG_KEY = "wan_redcave:techsuit_config";
function getConfig(player, key, defaultValue = false) {
  const value = player.getDynamicProperty(CONFIG_KEY + ":" + key);
  return value !== void 0 ? value : defaultValue;
}
function setConfig(player, key, value) {
  player.setDynamicProperty(CONFIG_KEY + ":" + key, value);
  return value;
}
function toggleConfig(player, key, defaultValue = false) {
  const current = getConfig(player, key, defaultValue);
  const next = !current;
  setConfig(player, key, next);
  return next;
}
function sendActionBarTranslate(player, message) {
  const rawMessage = { translate: message };
  player.onScreenDisplay.setActionBar(rawMessage);
}
function sendActionBarTranslateArgs(player, message, ...params) {
  const rawMessage = { translate: message, with: params.map(String) };
  player.onScreenDisplay.setActionBar(rawMessage);
}
class Power {
  constructor(key) {
    this.key = key;
  }
  toggle(player) {
    toggleConfig(player, this.key, false);
  }
  getEnabled(player) {
    return getConfig(player, this.key, false);
  }
  setEnabled(player, value) {
    setConfig(player, this.key, value);
  }
}
const _MagnetPower = class _MagnetPower extends Power {
  constructor() {
    super("wan_redcave:magnet");
    this.initializeTick();
  }
  static getInstance() {
    if (!_MagnetPower.instance) {
      _MagnetPower.instance = new _MagnetPower();
    }
    return _MagnetPower.instance;
  }
  enable(player) {
    this.setEnabled(player, true);
  }
  disable(player) {
    this.setEnabled(player, false);
  }
  tick(player) {
  }
  initializeTick() {
    system.runInterval(() => {
      for (const player of world.getPlayers()) {
        if (!this.getEnabled(player)) continue;
        const items = player.dimension.getEntities({
          type: "item",
          location: player.location,
          maxDistance: 6
        });
        for (const item of items) {
          try {
            const velocity = {
              x: (player.location.x - item.location.x) * 0.25,
              y: (player.location.y + 1 - item.location.y) * 0.25,
              z: (player.location.z - item.location.z) * 0.25
            };
            item.applyImpulse(velocity);
          } catch {
          }
        }
      }
    }, 10);
  }
};
__publicField(_MagnetPower, "instance");
let MagnetPower = _MagnetPower;
const _AquaLungsPower = class _AquaLungsPower extends Power {
  constructor() {
    super("wan_redcave:aqualungs");
  }
  enable(player) {
    this.setEnabled(player, true);
    system.run(() => {
      player.addTag(_AquaLungsPower.TAG);
    });
  }
  disable(player) {
    this.setEnabled(player, false);
    system.run(() => {
      player.removeTag(_AquaLungsPower.TAG);
    });
  }
  toggle(player) {
    const on = toggleConfig(player, this.key, false);
    if (on) {
      system.run(() => {
        player.addTag(_AquaLungsPower.TAG);
      });
    } else {
      system.run(() => {
        player.removeTag(_AquaLungsPower.TAG);
      });
    }
  }
  tick(player) {
    if (!this.getEnabled(player)) return;
    try {
      player.addEffect(MinecraftEffectTypes.WaterBreathing, 60, { amplifier: 0, showParticles: false });
      player.addEffect(MinecraftEffectTypes.ConduitPower, 60, { amplifier: 0, showParticles: false });
    } catch {
    }
  }
};
__publicField(_AquaLungsPower, "TAG", "wan_redcave:aqualungs");
let AquaLungsPower = _AquaLungsPower;
const _SuperboosterPower = class _SuperboosterPower extends Power {
  constructor() {
    super("wan_redcave:superbooster");
    __publicField(this, "playerStates", /* @__PURE__ */ new Map());
  }
  enable(player) {
    this.setEnabled(player, true);
    system.run(() => player.addTag(_SuperboosterPower.TAG));
    const now = system.currentTick;
    this.playerStates.set(player.id, { state: "ready", cooldownEnd: now, readyAnnounced: true });
  }
  disable(player) {
    this.setEnabled(player, false);
    system.run(() => player.removeTag(_SuperboosterPower.TAG));
    this.playerStates.delete(player.id);
  }
  toggle(player) {
    const on = toggleConfig(player, this.key, false);
    if (on) this.enable(player);
    else this.disable(player);
  }
  tick(player) {
    if (!this.getEnabled(player)) return;
    try {
      player.addEffect(MinecraftEffectTypes.Speed, 40, { amplifier: 0, showParticles: false });
    } catch {
    }
    const now = system.currentTick;
    const st = this.ensureState(player);
    if (st.state === "ready") {
      if (player.isSprinting && player.isJumping) {
        st.state = "cooldown";
        st.cooldownEnd = now + _SuperboosterPower.COOLDOWN;
        st.readyAnnounced = false;
        try {
          const dir = player.getViewDirection();
          const impulse = { x: dir.x * _SuperboosterPower.POWER, y: 0.1, z: dir.z * _SuperboosterPower.POWER };
          const pos = player.location;
          player.dimension.spawnParticle("minecraft:wind_explosion_emitter", { x: pos.x, y: pos.y - 1, z: pos.z });
          player.playSound("wind_charge.burst");
          player.applyImpulse(impulse);
        } catch {
        }
        const remainingSec = (_SuperboosterPower.COOLDOWN / 20).toFixed(1);
        sendActionBarTranslateArgs(player, "wan_redcave:techsuit.power.dash_cooldown", remainingSec);
        return;
      }
      return;
    }
    if (st.state === "cooldown") {
      const remainingTicks = st.cooldownEnd - now;
      if (remainingTicks > 0) {
        const remainingSec = (remainingTicks / 20).toFixed(1);
        sendActionBarTranslateArgs(player, "wan_redcave:techsuit.power.dash_cooldown", remainingSec);
      } else {
        if (!st.readyAnnounced) {
          sendActionBarTranslate(player, "wan_redcave:techsuit.power.dash_ready");
          try {
            player.playSound("note.bell");
          } catch {
          }
          st.readyAnnounced = true;
        }
        st.state = "ready";
      }
    }
  }
  ensureState(player) {
    if (!this.playerStates.has(player.id)) {
      this.playerStates.set(player.id, { state: "ready", cooldownEnd: 0, readyAnnounced: true });
    }
    return this.playerStates.get(player.id);
  }
};
__publicField(_SuperboosterPower, "TAG", "wan_redcave:superbooster");
__publicField(_SuperboosterPower, "COOLDOWN", 60);
__publicField(_SuperboosterPower, "POWER", 1);
let SuperboosterPower = _SuperboosterPower;
const _FlightJetpackPower = class _FlightJetpackPower extends Power {
  constructor() {
    super("wan_redcave:flightjetpack");
  }
  enable(player) {
    this.setEnabled(player, true);
    try {
      system.run(() => {
        player.dimension.spawnParticle("minecraft:small_soul_fire_flame", player.location);
      });
    } catch {
    }
  }
  disable(player) {
    this.setEnabled(player, false);
    system.run(() => player.removeTag(_FlightJetpackPower.FLY_TAG));
  }
  toggle(player) {
    const on = toggleConfig(player, this.key, false);
    if (!on) {
      system.run(() => player.removeTag(_FlightJetpackPower.FLY_TAG));
    }
  }
  tick(player) {
    if (!this.getEnabled(player)) return;
    if (!player.isOnGround) {
      try {
        player.addEffect(MinecraftEffectTypes.SlowFalling, 40, { amplifier: 0, showParticles: false });
      } catch {
      }
    }
    if ((player.isJumping || player.isSneaking) && !player.isOnGround) {
      system.run(() => player.addTag(_FlightJetpackPower.FLY_TAG));
      const dir = player.getViewDirection();
      let vy = 0;
      if (player.isJumping) vy = _FlightJetpackPower.VERTICAL_SPEED;
      else if (player.isSneaking) vy = -0.072 * 0.25;
      let speedMultiplier = _FlightJetpackPower.HORIZONTAL_SPEED;
      if (player.isSprinting) speedMultiplier *= _FlightJetpackPower.SPRINT_MULTIPLIER;
      const vx = dir.x * speedMultiplier;
      const vz = dir.z * speedMultiplier;
      try {
        player.applyImpulse({ x: vx, y: vy, z: vz });
      } catch {
      }
    } else if (player.hasTag(_FlightJetpackPower.FLY_TAG)) {
      system.run(() => player.removeTag(_FlightJetpackPower.FLY_TAG));
    }
    if (player.hasTag(_FlightJetpackPower.FLY_TAG) && !player.isSneaking) {
      try {
        const pos = player.location;
        const yaw = player.getRotation().y * (Math.PI / 180);
        const backOffset = -0.3;
        const height = 1.3;
        const sideOffset = 0.26;
        const baseX = pos.x - Math.sin(yaw) * backOffset;
        const baseZ = pos.z + Math.cos(yaw) * backOffset;
        const leftX = baseX - Math.cos(yaw) * sideOffset;
        const leftZ = baseZ - Math.sin(yaw) * sideOffset;
        const rightX = baseX + Math.cos(yaw) * sideOffset;
        const rightZ = baseZ + Math.sin(yaw) * sideOffset;
        system.runTimeout(() => {
          player.dimension.spawnParticle("minecraft:small_soul_fire_flame", { x: leftX, y: pos.y + height, z: leftZ });
          player.dimension.spawnParticle("minecraft:small_soul_fire_flame", { x: rightX, y: pos.y + height, z: rightZ });
        }, 1);
      } catch {
      }
    }
  }
};
__publicField(_FlightJetpackPower, "VERTICAL_SPEED", 0.072);
__publicField(_FlightJetpackPower, "HORIZONTAL_SPEED", 0.015);
__publicField(_FlightJetpackPower, "SPRINT_MULTIPLIER", 1.25);
__publicField(_FlightJetpackPower, "FLY_TAG", "wan_redcave:is_flying");
let FlightJetpackPower = _FlightJetpackPower;
const _NightVisorPower = class _NightVisorPower extends Power {
  constructor() {
    super("wan_redcave:nightvisor");
  }
  enable(player) {
    this.setEnabled(player, true);
    system.run(() => {
      player.addTag(_NightVisorPower.TAG);
    });
  }
  disable(player) {
    this.setEnabled(player, false);
    system.run(() => {
      player.removeTag(_NightVisorPower.TAG);
    });
  }
  toggle(player) {
    const on = toggleConfig(player, this.key, false);
    if (on) {
      system.run(() => {
        player.addTag(_NightVisorPower.TAG);
      });
    } else {
      system.run(() => {
        player.removeTag(_NightVisorPower.TAG);
      });
    }
  }
  tick(player) {
    if (!this.getEnabled(player)) return;
    try {
      player.addEffect(MinecraftEffectTypes.NightVision, 600, { amplifier: 0, showParticles: false });
    } catch {
    }
  }
};
__publicField(_NightVisorPower, "TAG", "wan_redcave:nightvisor");
let NightVisorPower = _NightVisorPower;
const _EnergyShieldPower = class _EnergyShieldPower extends Power {
  constructor() {
    super("wan_redcave:energyshield");
  }
  enable(player) {
    this.setEnabled(player, true);
  }
  disable(player) {
    this.setEnabled(player, false);
  }
  tick(player) {
    if (!this.getEnabled(player)) return;
    const pos = player.location;
    for (const { type, radius } of _EnergyShieldPower.PROJECTILE_TYPES) {
      const projectiles = player.dimension.getEntities({
        type,
        location: pos,
        maxDistance: radius
      });
      for (const proj of projectiles) {
        const lastIt = proj.getDynamicProperty("wan_redcave:last_it");
        if (lastIt === player.id) continue;
        player.dimension.spawnParticle("minecraft:critical_hit_emitter", proj.location);
        try {
          const velocity = proj.getVelocity();
          const bounced = {
            x: -velocity.x * 1.5,
            y: Math.abs(velocity.y) * 0.5,
            z: -velocity.z * 1.5
          };
          proj.applyImpulse(bounced);
          proj.setDynamicProperty("wan_redcave:last_it", player.id);
        } catch {
        }
      }
    }
  }
};
__publicField(_EnergyShieldPower, "PROJECTILE_TYPES", [
  { type: "minecraft:arrow", radius: 2 },
  { type: "minecraft:snowball", radius: 2 },
  { type: "minecraft:small_fireball", radius: 4 },
  { type: "minecraft:fireball", radius: 4 }
]);
let EnergyShieldPower = _EnergyShieldPower;
const PowerRegistry = {
  magnet: MagnetPower.getInstance(),
  aqualungs: new AquaLungsPower(),
  superbooster: new SuperboosterPower(),
  flightjetpack: new FlightJetpackPower(),
  nightvisor: new NightVisorPower(),
  energyshield: new EnergyShieldPower()
};
const ACTIVE_TAG = "wan_redcave:techsuit_active";
const TECHSUIT_PREFIX = "wan_redcave:techsuit_t";
function hasControllerPower(player, controllerType) {
  var _a2;
  const inv = (_a2 = player.getComponent(EntityComponentTypes.Inventory)) == null ? void 0 : _a2.container;
  if (!inv) return false;
  for (let i = 0; i < inv.size; i++) {
    const item = inv.getItem(i);
    if (item && item.typeId === controllerType) {
      return item.getDynamicProperty("wan_redcave:powered") === true;
    }
  }
  return false;
}
function safeGetEquipment(player, slot) {
  var _a2;
  try {
    return (_a2 = player.getComponent(EntityComponentTypes.Equippable)) == null ? void 0 : _a2.getEquipment(slot);
  } catch {
    return void 0;
  }
}
function hasFullSet(player, pieces) {
  const slots = [
    ["head", EquipmentSlot.Head],
    ["chest", EquipmentSlot.Chest],
    ["legs", EquipmentSlot.Legs],
    ["feet", EquipmentSlot.Feet]
  ];
  return slots.every(([key, slot]) => {
    const item = safeGetEquipment(player, slot);
    return item && item.typeId === pieces[key];
  });
}
function removeTechSuitTags(player) {
  for (const tag of player.getTags()) {
    if (tag.startsWith(TECHSUIT_PREFIX)) player.removeTag(tag);
  }
}
class TechSuitTier {
  constructor(config, powerButtons) {
    __publicField(this, "armorManager");
    this.config = config;
    this.powerButtons = powerButtons;
    this.armorManager = new ArmorManager(config.dynKey, config.pieces);
  }
  /**
   * Opens the UI for this tier
   */
  openUI(player) {
    if (!hasControllerPower(player, this.config.controller)) {
      player.sendMessage({ rawtext: [{ translate: "wan_redcave:techsuit.ui.no_power" }] });
      player.playSound("mob.villager.no");
      return;
    }
    const armorOn = this.armorManager.isEnabled(player);
    if (this.armorManager.detectOtherTierArmor(player)) {
      player.sendMessage({ rawtext: [{ translate: "wan_redcave:techsuit.ui.disable_other_armor" }] });
      player.playSound("mob.villager.no");
      return;
    }
    const form = new ActionFormData();
    form.title({ translate: `wan_redcave:techsuit.ui.title_t${this.config.tier === 1 ? "1" : "2"}` });
    form.body({ translate: `wan_redcave:techsuit.ui.manage_power_t${this.config.tier === 1 ? "1" : "2"}` });
    const configKeyMap = {
      superbooster: "wan_redcave:superbooster",
      magneticfield: "wan_redcave:magnet",
      aqualungs: "wan_redcave:aqualungs",
      flightjetpack: "wan_redcave:flightjetpack",
      nightvisor: "wan_redcave:nightvisor",
      energyshield: "wan_redcave:energyshield"
    };
    const buttons = [
      ...this.powerButtons.map((btn) => {
        const configKey = configKeyMap[btn.key] || `wan_redcave:${btn.key}`;
        return {
          ...btn,
          state: getConfig(player, configKey, false),
          isArmor: false,
          configKey
        };
      }),
      {
        key: `armor_t${this.config.tier === 1 ? "1" : "2"}`,
        icon: `textures/wan/redcave/items/armors/tech_helmet_t${this.config.tier}`,
        state: armorOn,
        isArmor: true,
        configKey: ""
      }
    ];
    buttons.forEach((btn) => {
      form.button(
        {
          rawtext: [
            { translate: `wan_redcave:techsuit.power.${btn.key}` },
            { text: "\n" },
            { translate: "wan_redcave:techsuit.ui.status" },
            { text: ": " },
            { translate: btn.state ? "wan_redcave:techsuit.ui.on" : "wan_redcave:techsuit.ui.off" }
          ]
        },
        btn.icon
      );
    });
    form.show(player).then((response) => {
      if (response.canceled) return;
      const selection = buttons[response.selection];
      if (!selection) return;
      if (selection.isArmor) {
        if (armorOn) {
          this.armorManager.disable(player);
        } else {
          this.armorManager.enable(player);
        }
        return;
      }
      if (!armorOn) {
        player.sendMessage({ rawtext: [{ translate: "wan_redcave:techsuit.ui.require_fullset" }] });
        return;
      }
      const powerResult = this.getPowerByKey(selection.key);
      if (powerResult) {
        const { power, configKey } = powerResult;
        power.toggle(player);
        const newState = getConfig(player, configKey, false);
        player.sendMessage({
          rawtext: [
            { translate: `wan_redcave:techsuit.power.${selection.key}` },
            { text: " " },
            { translate: "wan_redcave:techsuit.ui.is_now" },
            { text: " " },
            { translate: newState ? "wan_redcave:techsuit.ui.enabled" : "wan_redcave:techsuit.ui.disabled" }
          ]
        });
      }
    });
  }
  /**
   * Gets a power instance by its key and returns the power with its config key
   */
  getPowerByKey(key) {
    const powerMap = {
      superbooster: { powerKey: "superbooster", configKey: "wan_redcave:superbooster" },
      magneticfield: { powerKey: "magnet", configKey: "wan_redcave:magnet" },
      aqualungs: { powerKey: "aqualungs", configKey: "wan_redcave:aqualungs" },
      flightjetpack: { powerKey: "flightjetpack", configKey: "wan_redcave:flightjetpack" },
      nightvisor: { powerKey: "nightvisor", configKey: "wan_redcave:nightvisor" },
      energyshield: { powerKey: "energyshield", configKey: "wan_redcave:energyshield" }
    };
    const mapped = powerMap[key];
    return mapped ? { power: PowerRegistry[mapped.powerKey], configKey: mapped.configKey } : void 0;
  }
}
const tier1 = new TechSuitTier(
  {
    tier: 1,
    dynKey: "wan_redcave:tieronearmor",
    tag: "wan_redcave:techsuit_tier1",
    controller: ItemType.WanRedcaveTechsuitControlT1,
    pieces: {
      head: ItemType.WanRedcaveTechHelmetT1,
      chest: ItemType.WanRedcaveTechChestplateT1,
      legs: ItemType.WanRedcaveTechLeggingsT1,
      feet: ItemType.WanRedcaveTechBootsT1
    },
    powerKeys: ["magnet", "aqualungs", "superbooster"]
  },
  [
    { key: "superbooster", icon: "textures/wan/redcave/ui/techsuit/super_booster" },
    { key: "magneticfield", icon: "textures/wan/redcave/ui/techsuit/magnet" },
    { key: "aqualungs", icon: "textures/wan/redcave/ui/techsuit/aqua_lungs" }
  ]
);
const tier2 = new TechSuitTier(
  {
    tier: 2,
    dynKey: "wan_redcave:tiertwoarmor",
    tag: "wan_redcave:techsuit_tier2",
    controller: ItemType.WanRedcaveTechsuitControlT2,
    pieces: {
      head: ItemType.WanRedcaveTechHelmetT2,
      chest: ItemType.WanRedcaveTechChestplateT2,
      legs: ItemType.WanRedcaveTechLeggingsT2,
      feet: ItemType.WanRedcaveTechBootsT2
    },
    powerKeys: ["magnet", "aqualungs", "flightjetpack", "nightvisor", "superbooster", "energyshield"]
  },
  [
    { key: "superbooster", icon: "textures/wan/redcave/ui/techsuit/super_booster" },
    { key: "magneticfield", icon: "textures/wan/redcave/ui/techsuit/magnet" },
    { key: "aqualungs", icon: "textures/wan/redcave/ui/techsuit/aqua_lungs" },
    { key: "flightjetpack", icon: "textures/wan/redcave/ui/techsuit/flight_jetpack" },
    { key: "nightvisor", icon: "textures/wan/redcave/ui/techsuit/night_visor" },
    { key: "energyshield", icon: "textures/wan/redcave/ui/techsuit/energy_shield" }
  ]
);
const tiers = [tier1, tier2];
system.runInterval(() => {
  for (const player of world.getPlayers()) {
    const equippedSet = tiers.find((tier) => hasFullSet(player, tier.config.pieces));
    const activeSetTag = player.getTags().find((tag) => tag.startsWith(TECHSUIT_PREFIX));
    if (equippedSet && activeSetTag !== equippedSet.config.tag) {
      removeTechSuitTags(player);
      player.addTag(equippedSet.config.tag);
      player.addTag(ACTIVE_TAG);
      sendActionBarTranslate(player, "wan_redcave:techsuit.ui.activated");
    }
    if (!equippedSet && player.hasTag(ACTIVE_TAG)) {
      player.removeTag(ACTIVE_TAG);
      if (activeSetTag) player.removeTag(activeSetTag);
      sendActionBarTranslate(player, "wan_redcave:techsuit.ui.deactivated");
      for (const power of Object.values(PowerRegistry)) {
        power.disable(player);
      }
    }
    for (const tier of tiers) {
      const armorEnabled = tier.armorManager.isEnabled(player);
      const inventory = player.getComponent(EntityComponentTypes.Inventory);
      if (!(inventory == null ? void 0 : inventory.container)) continue;
      for (let i = 0; i < inventory.inventorySize; i++) {
        const item = inventory.container.getItem(i);
        if (!item || item.typeId !== tier.config.controller) continue;
        const shouldBeLocked = armorEnabled;
        const isLocked = item.lockMode === ItemLockMode.inventory;
        if (shouldBeLocked && !isLocked) {
          const lockedItem = item.clone();
          lockedItem.lockMode = ItemLockMode.inventory;
          inventory.container.setItem(i, lockedItem);
        } else if (!shouldBeLocked && isLocked) {
          const unlockedItem = item.clone();
          unlockedItem.lockMode = ItemLockMode.none;
          inventory.container.setItem(i, unlockedItem);
        }
      }
    }
    if (equippedSet) {
      for (const powerKey of equippedSet.config.powerKeys) {
        const power = PowerRegistry[powerKey];
        if (power) {
          power.tick(player);
        }
      }
    }
  }
}, 1);
world.afterEvents.itemUse.subscribe((e) => {
  const player = e.source;
  const item = e.itemStack;
  const tier = tiers.find((t) => t.config.controller === item.typeId);
  if (tier) {
    tier.openUI(player);
  }
});
world.afterEvents.entityDie.subscribe((e) => {
  const deadPlayer = e.deadEntity;
  if (!deadPlayer || deadPlayer.typeId !== MinecraftEntityTypes.Player) return;
  const player = deadPlayer;
  const dim = player.dimension;
  for (const tier of tiers) {
    if (!player.getDynamicProperty(tier.config.dynKey)) continue;
    const armorIds = Object.values(tier.config.pieces);
    const items = dim.getEntities({
      type: "minecraft:item",
      location: player.location,
      maxDistance: 16
    });
    for (const item of items) {
      const itemComp = item.getComponent(EntityComponentTypes.Item);
      const stack = itemComp == null ? void 0 : itemComp.itemStack;
      if (stack && armorIds.includes(stack.typeId)) {
        item.kill();
      }
    }
    player.setDynamicProperty(tier.config.dynKey, false);
  }
});
startGame({
  gameType: GameType.AddOn,
  onSetupPlayer: (player) => {
    giveItemToEntity(player, new ItemStack(ItemType.WanRedcaveGuideBook, 1));
  }
}, () => {
  world.gameRules.showTags = false;
  system.runTimeout(() => {
    ItemDB.preRegisterCommonItems();
    registerAllMachines(MachineRegistry);
    MachineRegistry.initialize(machineFactory);
    MachineRegistry.loadAndStart();
    startMachineTickLoop();
  }, 100);
});
const HUD_UPDATE_FREQUENCY = 1;
startGlobalHUDLoop(HUD_UPDATE_FREQUENCY);
