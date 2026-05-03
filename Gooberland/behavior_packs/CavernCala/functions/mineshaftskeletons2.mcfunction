gamerule commandblockoutput false
summon skeleton
summon skeleton
summon skeleton
summon skeleton
summon skeleton
replaceitem entity @e[type=skeleton,r=1.3] slot.armor.head 0 golden_helmet
replaceitem entity @e[type=skeleton,r=1.3] slot.armor.chest 0 golden_chestplate
replaceitem entity @e[type=skeleton,r=1.3] slot.armor.legs 0 golden_leggings
replaceitem entity @e[type=skeleton,r=1.3] slot.armor.feet 0 golden_boots
enchant @e[r=1.3,type=skeleton] power 4
setblock ~~~ air
effect @e[type=skeleton,r=1.3] health_boost 100000 3 true
effect @e[type=skeleton,r=1.3] resistance 100000 1 true
effect @e[type=skeleton,r=1.3] instant_damage 1 255 true