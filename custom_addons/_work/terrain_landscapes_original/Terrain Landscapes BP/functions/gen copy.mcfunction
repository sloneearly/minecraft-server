# Di chuyển armor_stand về đúng vị trí
execute as @e[name=gen.chunk,type=armor_stand] at @s run tp @s ~ ~ ~

# Đánh dấu chunk
execute as @e[name=gen.chunk,type=armor_stand] at @s run setblock ~~-1~ gold_block
execute as @e[name=gen.chunk,type=armor_stand] at @s run setblock ~~2~ glass keep

# Kill nếu vị trí không hợp lệ
execute as @e[name=gen.chunk,type=armor_stand] at @s unless block ~~~ air unless block ~~~ flowing_water unless block ~~~ water run kill @s

# Theo dõi player đang di chuyển không (dùng motion hoặc sneak để detect - cần setup riêng)
# Giả sử đã có tag "isMoving" được set bởi function khác

# Tăng thời gian: nếu player đang di chuyển nhanh → ưu tiên gen xa hơn
execute as @a[tag=isMoving] at @s positioned ~ -59 ~ run scoreboard players add @e[name=gen.chunk,type=armor_stand,distance=..128,limit=1,sort=nearest] gen.time 1
execute as @a[tag=!isMoving] at @s positioned ~ -59 ~ run scoreboard players add @e[name=gen.chunk,type=armor_stand,distance=..96,limit=1,sort=nearest] gen.time 1

# Mở rộng 4 hướng khi gen.time = 2
execute as @e[name=gen.chunk,type=armor_stand,scores={gen.time=2}] at @s if block ~~~8 air unless block ~~-1~8 gold_block run summon armor_stand ~~~8 ~ ~ {Tags:["gen.chunk"],NoAI:1b,Invisible:1b,Marker:1b}
execute as @e[name=gen.chunk,type=armor_stand,scores={gen.time=2}] at @s if block ~~~-8 air unless block ~~-1~-8 gold_block run summon armor_stand ~~~-8 ~ ~ {Tags:["gen.chunk"],NoAI:1b,Invisible:1b,Marker:1b}
execute as @e[name=gen.chunk,type=armor_stand,scores={gen.time=2}] at @s if block ~8~~ air unless block ~8~-1~ gold_block run summon armor_stand ~8~~ ~ ~ {Tags:["gen.chunk"],NoAI:1b,Invisible:1b,Marker:1b}
execute as @e[name=gen.chunk,type=armor_stand,scores={gen.time=2}] at @s if block ~-8~~ air unless block ~-8~-1~ gold_block run summon armor_stand ~-8~~ ~ ~ {Tags:["gen.chunk"],NoAI:1b,Invisible:1b,Marker:1b}

# Tag ready cho JS script - xa hơn nếu player di chuyển nhanh
execute as @a[tag=isMoving] at @s positioned ~ -59 ~ run tag @e[name=gen.chunk,type=armor_stand,distance=..128,scores={gen.time=2..},limit=30] add gen.chunky
execute as @a[tag=!isMoving] at @s positioned ~ -59 ~ run tag @e[name=gen.chunk,type=armor_stand,distance=..96,scores={gen.time=2..},limit=20] add gen.chunky

# Dọn item chỉ khi player di chuyển (tránh kill nhầm khi đứng yên)
execute as @a[tag=isMoving] at @s run kill @e[type=item,nbt={Item:{id:"minecraft:cactus"}},distance=16..64]
execute as @a[tag=isMoving] at @s run kill @e[type=item,nbt={Item:{id:"minecraft:sea_pickle"}},distance=16..64]

# Chặn nước/lava tràn lên cao
execute as @e[name=gen.chunk,type=armor_stand] at @s run fill ~8 ~100 ~8 ~-8 ~128 ~-8 barrier replace water
execute as @e[name=gen.chunk,type=armor_stand] at @s run fill ~8 ~100 ~8 ~-8 ~128 ~-8 barrier replace flowing_water
execute as @e[name=gen.chunk,type=armor_stand] at @s run fill ~8 ~100 ~8 ~-8 ~128 ~-8 barrier replace lava
execute as @e[name=gen.chunk,type=armor_stand] at @s run fill ~8 ~100 ~8 ~-8 ~128 ~-8 barrier replace flowing_lava