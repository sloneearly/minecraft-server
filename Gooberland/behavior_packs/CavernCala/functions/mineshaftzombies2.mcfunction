gamerule commandblockoutput false
summon zombie
summon zombie
summon zombie
summon zombie
summon zombie
replaceitem entity @e[type=zombie,r=1.3] slot.armor.head 0 golden_helmet
replaceitem entity @e[type=zombie,r=1.3] slot.armor.chest 0 golden_chestplate
replaceitem entity @e[type=zombie,r=1.3] slot.armor.legs 0 golden_leggings
replaceitem entity @e[type=zombie,r=1.3] slot.armor.feet 0 golden_boots
replaceitem entity @e[type=zombie,r=1.3] slot.weapon.mainhand 0 golden_sword
enchant @e[r=1.3,type=zombie] sharpness 4
enchant @e[r=1.3,type=zombie] fire_aspect 1
setblock ~~~ air
effect @e[type=zombie,r=1.3] health_boost 100000 3 true
effect @e[type=zombie,r=1.3] resistance 100000 1 true
effect @e[type=zombie,r=1.3] instant_damage 1 255 true