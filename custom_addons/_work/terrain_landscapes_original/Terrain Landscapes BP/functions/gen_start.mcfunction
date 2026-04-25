# Tạo scoreboard cần thiết (an toàn nếu đã tồn tại)
scoreboard objectives add terrie.seed dummy
scoreboard objectives add terrie.scale dummy
scoreboard objectives add gen.time dummy

# Đặt giá trị mặc định nếu chưa có
execute unless score value terrie.seed matches -2147483648..2147483647 run scoreboard players set value terrie.seed 12345
execute unless score value terrie.scale matches 0..2 run scoreboard players set value terrie.scale 1

# Xóa hết gen.chunk cũ (tránh lỗi khi reload world)
kill @e[name=gen.chunk,type=armor_stand]

# Summon gen.chunk đầu tiên tại vị trí người chơi gần nhất (ở độ cao an toàn)
execute as @a[limit=1] at @s run summon armor_stand ~ -59 ~ {Tags:["gen.chunk"],NoAI:1b,Invisible:1b,Marker:1b,NoGravity:1b}

# Đặt gold_block đánh dấu chunk gốc
execute as @e[name=gen.chunk,type=armor_stand,limit=1] at @s run setblock ~~-1~ gold_block
execute as @e[name=gen.chunk,type=armor_stand,limit=1] at @s run setblock ~~2~ glass keep

# Reset thời gian cho chunk gốc
scoreboard players set @e[name=gen.chunk,type=armor_stand] gen.time 0

# Thông báo cho người chơi
tellraw @a {"rawtext":[{"text":"§a[Terrie] §rTerrain generation đã khởi động!\n§7Dùng §f.gen §7để test nhanh, hoặc di chuyển để tự động gen.\n§7Seed hiện tại: "},{"score":{"name":"value","objective":"terrie.seed"}},{"text":"\n§7Scale: "},{"selector":"@e[name=gen.chunk,limit=1]"}]}

# Phát âm thanh vui tai khi khởi động thành công
execute as @a at @s run playsound note.pling @s ~ ~ ~ 1 1.2