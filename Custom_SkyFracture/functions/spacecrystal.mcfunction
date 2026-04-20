execute as @s run execute at @p[r=64] run function burnouttorch
effect @a[r=64] slow_falling 3 0 true
title @p[r=64,hasitem={item=helmet:oxygen_mask,quantity=0,location=slot.armor.head}] actionbar You need an "Oxygen Mask" to survive here
execute as @p[r=64,hasitem={item=helmet:oxygen_mask,quantity=0,location=slot.armor.head}] run damage @s 1 drowning