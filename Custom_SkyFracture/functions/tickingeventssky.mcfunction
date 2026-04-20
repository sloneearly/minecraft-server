execute as @a run execute at @s if block ~~1~ air run summon mechanic:biome_ambience_sf ^^^-2.5
execute as @r run execute at @s if block ~~1~ air run summon mechanic:sky_fog ~~5.5~0.3
fog @a[tag=!clouds] pop clouds
tag @a remove clouds
fog @a[tag=!hurricane] pop hurricane
tag @a remove hurricane
fog @a[tag=!sunspots] pop sunspots
tag @a remove sunspots
fog @a[tag=!stellarspace] pop stellarspace
tag @a remove stellarspace
fog @a[tag=!cryoisland] pop cryoisland
tag @a remove cryoisland
fog @a[tag=!moonisland] pop moonisland
tag @a remove moonisland
fog @a[tag=!astrageldon] pop astrageldon
tag @a remove astrageldon
tag @a[hasitem={item=helmet:oxygen_mask,quantity=1,location=slot.armor.head}] remove cantbreathe
effect @a [hasitem={item=item:chrono_band,quantity=1,location=slot.weapon.offhand}] clear slow_falling
execute as @a[hasitem=[{item=helmet:comet_helmet,location=slot.armor.head},{item=chestplate:comet_chestplate,location=slot.armor.chest},{item=leggings:comet_leggings,location=slot.armor.legs},{item=boots:comet_boots,location=slot.armor.feet}]] run execute at @s run function cometarmor