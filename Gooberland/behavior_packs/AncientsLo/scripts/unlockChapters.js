import { ItemStack, system, TicksPerSecond, world } from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe((initEvent) => {
    initEvent.itemComponentRegistry.registerCustomComponent("ancient:unlock_chapters", {
        onUse: (event) => {
            const source = event.source;
            const item = event.itemStack;
            const equippable = source.getComponent("equippable")
            const offHandSlot = equippable.getEquipmentSlot("Offhand")
            const offHandItem =offHandSlot.getItem()

            if (!offHandItem || offHandItem.typeId != "ancients:ancient_book") {
                source.sendMessage("§e[D]§r Use the scroll with the Ancient Book in the offhand")
                source.playSound("item.book.put")
                return;
            }

            let bookLore = offHandItem.getLore()

            const chooseChapter = selectChapter(chapters)

            if (bookLore.join("\n").includes(chooseChapter)){
                source.sendMessage(`§e[D]§r The Ancient Book already have §p${chooseChapter}§r chapter.`)
                source.playSound("item.book.put")
            }
            else{
                source.sendMessage(`§a[A]§r Successfully added §p${chooseChapter}§r chapter.`)
                bookLore.push("§r§7" + chooseChapter)
                offHandItem.setLore(bookLore)
                equippable.setEquipment('Offhand', offHandItem);
                source.playSound("item.book.page_turn")
            }

            if (item.amount == 1){
                equippable.setEquipment('Mainhand', undefined);
            }
            else{
                item.amount -= 1
                equippable.setEquipment('Mainhand', item);
            }
            
        }
    });
});


export const chapters = [
    { string: '- The Runic Essence', weight: 60 },
    { string: '- The Amulet', weight: 10 },
    { string: '- The Runic Apple', weight: 7 },
    { string: '- The Ancestral Rune', weight: 6 },
    { string: '- The Runic Staff', weight: 5 },
    { string: '- Captured Essence', weight: 4 },
    { string: '- The Mask', weight: 3 }
  ];

export function selectChapter(chapters) {
  const weight = chapters.reduce((sum, chapter) => sum + chapter.weight, 0);

  let random = Math.random() * weight;

  for (let i = 0; i < chapters.length; i++) {
    if (random < chapters[i].weight) {
      return chapters[i].string;
    }
    random -= chapters[i].weight;
  }
}