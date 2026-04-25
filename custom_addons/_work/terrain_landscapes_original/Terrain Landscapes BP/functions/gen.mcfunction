# Di chuyển armor_stand về đúng vị trí chunk (đề phòng lệch)
execute as @e[name=gen.chunk,type=armor_stand] at @s run tp @s ~ ~ ~

# Đánh dấu chunk đã gen bằng gold_block dưới đất và glass trên mặt
execute as @e[name=gen.chunk,type=armor_stand] at @s run setblock ~~-1~ gold_block
execute as @e[name=gen.chunk,type=armor_stand] at @s run setblock ~~2~ glass keep

# Nếu trên đầu entity không phải air/water → chunk đã có người/build → kill để tránh gen đè
execute as @e[name=gen.chunk,type=armor_stand] at @s unless block ~~~ air unless block ~~~ flowing_water unless block ~~~ water run kill @s

# Tăng thời gian sống cho các gen.chunk gần player nhất
execute as @a at @s positioned ~ -59 ~ run scoreboard players add @e[name=gen.chunk,type=armor_stand,distance=..96,limit=1,sort=nearest] gen.time 1

# Khi gen.time đạt 2 → mở rộng 4 hướng nếu chưa có gold_block
execute as @e[name=gen.chunk,type=armor_stand,scores={gen.time=2}] at @s if block ~~~8 air unless block ~~-1~8 gold_block run summon armor_stand ~~~8 ~ ~ {Tags:["gen.chunk"],NoAI:1b,Invisible:1b,Marker:1b}
execute as @e[name=gen.chunk,type=armor_stand,scores={gen.time=2}] at @s if block ~~~-8 air unless block ~~-1~-8 gold_block run summon armor_stand ~~~-8 ~ ~ {Tags:["gen.chunk"],NoAI:1b,Invisible:1b,Marker:1b}
execute as @e[name=gen.chunk,type=armor_stand,scores={gen.time=2}] at @s if block ~8~~ air unless block ~8~-1~ gold_block run summon armor_stand ~8~~ ~ ~ {Tags:["gen.chunk"],NoAI:1b,Invisible:1b,Marker:1b}
execute as @e[name=gen.chunk,type=armor_stand,scores={gen.time=2}] at @s if block ~-8~~ air unless block ~-8~-1~ gold_block run summon armor_stand ~-8~~ ~ ~ {Tags:["gen.chunk"],NoAI:1b,Invisible:1b,Marker:1b}

# Đánh dấu các chunk đã sẵn sàng để script JS xử lý
execute as @a at @s positioned ~ -59 ~ run tag @e[name=gen.chunk,type=armor_stand,distance=..96,scores={gen.time=2..},limit=20] add gen.chunky

# Dọn item thừa (cactus, sea pickle rơi) gần player để tránh lag và lỗi visual
execute as @a at @s run kill @e[type=item,nbt={Item:{id:"minecraft:cactus"}},distance=16..48]
execute as @a at @s run kill @e[type=item,nbt={Item:{id:"minecraft:sea_pickle"}},distance=16..48]

# Chặn nước/lava tràn lên trời (tránh leak khi gen núi cao)
execute as @e[name=gen.chunk,type=armor_stand] at @s run fill ~7 ~100 ~7 ~-7 ~128 ~-7 barrier replace water
execute as @e[name=gen.chunk,type=armor_stand] at @s run fill ~7 ~100 ~7 ~-7 ~128 ~-7 barrier replace flowing_water
execute as @e[name=gen.chunk,type=armor_stand] at @s run fill ~7 ~100 ~7 ~-7 ~128 ~-7 barrier replace lava
execute as @e[name=gen.chunk,type=armor_stand] at @s run fill ~7 ~100 ~7 ~-7 ~128 ~-7 barrier replace flowing_lava