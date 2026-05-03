gamerule commandblockoutput false
summon zombie
summon zombie
summon zombie
summon zombie
summon zombie
replaceitem entity @e[type=zombie,r=1.3] slot.armor.head 0 iron_helmet
replaceitem entity @e[type=zombie,r=1.3] slot.armor.chest 0 iron_chestplate
replaceitem entity @e[type=zombie,r=1.3] slot.armor.legs 0 iron_leggings
replaceitem entity @e[type=zombie,r=1.3] slot.armor.feet 0 iron_boots
replaceitem entity @e[type=zombie,r=1.3] slot.weapon.mainhand 0 iron_sword
enchant @e[r=1.3,type=zombie] sharpness 5
setblock ~~~ air
effect @e[type=zombie,r=1.3] health_boost 100000 3 true
effect @e[type=zombie,r=1.3] resistance 100000 1 true
effect @e[type=zombie,r=1.3] instant_damage 1 255 true