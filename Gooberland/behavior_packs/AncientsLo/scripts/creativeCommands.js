import { world, ItemStack, system } from '@minecraft/server';

world.beforeEvents.chatSend.subscribe((eventData) => {
	const player = eventData.sender;
    if (eventData.message.includes("!ancients")) {
        eventData.cancel = true;
        if (player.getGameMode() != "creative") {
            player.sendMessage("§e[D]§r Creative Mode Required")
            system.run(() => {
                player.playSound("block.false_permissions")
            })
            return;
        }
    }
	switch (eventData.message) {
		case '!ancients get book':
			eventData.cancel = true;
            system.run(() => {
                const book = new ItemStack("ancients:ancient_book",1);
                book.setLore(["§r§7- The Runic Essence", "§r§7- The Amulet", "§r§7- The Runic Apple", "§r§7- The Ancestral Rune", "§r§7- The Runic Staff", "§r§7- Captured Essence", "§r§7- The Mask"])
                player.getComponent("inventory").container.addItem(book)
                player.sendMessage("§a[A]§r Ancient Book Unlocked added")
                player.playSound("random.pop")
            })
			break;
        case '!ancients get runic_staff':
			eventData.cancel = true;
            system.run(() => {
                const staff = new ItemStack("ancients:runic_staff_charged",1);
                staff.setLore(["§r§9Forest Essence§r"])
                player.getComponent("inventory").container.addItem(staff)
                player.sendMessage("§a[A]§r Runic Staff added")
                player.playSound("random.pop")
            })
			break;
        case '!ancients get iron_amulet_charged':
			eventData.cancel = true;
            system.run(() => {
                const staff = new ItemStack("ancients:iron_amulet_powered",1);
                staff.setLore(["§r§9Forest Vitality§r"])
                player.getComponent("inventory").container.addItem(staff)
                player.sendMessage("§a[A]§r Iron Amulet Charged added")
                player.playSound("random.pop")
            })
			break;
		default: break;
	}
});