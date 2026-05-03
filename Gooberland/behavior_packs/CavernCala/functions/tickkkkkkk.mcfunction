execute at @r run summon mechanic:biome_ambience_cc ~~-7~
fog @a[tag=!cave] pop cave
tag @a remove cave
fog @a[tag=!jasper_caves] pop jasper_caves
tag @a remove jasper_caves
fog @a[tag=!kyanite_caves] pop kyanite_caves
tag @a remove kyanite_caves
fog @a[tag=!amethyst_caves] pop amethyst_caves
tag @a remove amethyst_caves
fog @a[tag=!aetherium_caves] pop aetherium_caves
tag @a remove aetherium_caves
fog @a[tag=!glowing_caves] pop glowing_caves
tag @a remove glowing_caves
fog @a[tag=!glowing_mushroom_caves] pop glowing_mushroom_caves
tag @a remove glowing_mushroom_caves
fog @a[tag=!horrid_caves] pop horrid_caves
tag @a remove horrid_caves
fog @a[tag=!slime_caves] pop slime_caves
tag @a remove slime_caves
fog @a[tag=!sodalite_caves] pop sodalite_caves
tag @a remove sodalite_caves
 
 
 
 
 
execute as @a[hasitem={item=helmet:energized_mining_helmet,location=slot.armor.head}] at @s run fill ~~~ ~~~ block:light_cc replace air
execute as @a[hasitem={item=helmet:energized_mining_helmet,location=slot.armor.head,quantity=0}] at @s[hasitem={item=helmet:energized_mining_helmet,location=slot.armor.head,quantity=0}] at @s[hasitem={item=helmet:energized_mining_helmet,location=slot.armor.head,quantity=0}] run fill ~~~ ~~~ air[] replace block:light_cc
execute as @a at @s positioned ~~3~ run fill ~4~-2~4 ~-2~~-4 air replace block:light_cc
execute as @a at @s positioned ~~-3~ run fill ~4~2~4 ~-2~~-4 air replace block:light_cc
execute as @a at @s positioned ~~~3 run fill ~2~2~2 ~-2~-2~-2 air replace block:light_cc
execute as @a at @s positioned ~~~-3 run fill ~2~2~2 ~-2~-2~-2 air replace block:light_cc
execute as @a at @s positioned ~3~~ run fill ~2~2~2 ~-2~-2~-2 air replace block:light_cc
execute as @a at @s positioned ~-3~~ run fill ~2~2~2 ~-2~-2~-2 air replace block:light_cc


execute as @a[hasitem=[{item=helmet:exodium_helmet,location=slot.armor.head},{item=chestplate:exodium_chestplate,location=slot.armor.chest},{item=leggings:exodium_leggings,location=slot.armor.legs},{item=boots:exodium_boots,location=slot.armor.feet}]] run execute at @s run function exodiumarmor
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 