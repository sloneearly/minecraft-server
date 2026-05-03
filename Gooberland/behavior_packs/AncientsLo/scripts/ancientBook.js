import { world } from "@minecraft/server";
import {ActionFormData } from "@minecraft/server-ui";

export const chapterMap = {
    "§r§7- The Runic Essence": 1,
    "§r§7- The Amulet": 2,
    "§r§7- The Runic Apple": 3,
    "§r§7- The Ancestral Rune": 4,
    "§r§7- The Runic Staff": 5,
    "§r§7- Captured Essence": 6,
    "§r§7- The Mask": 7
  };

world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.itemComponentRegistry.registerCustomComponent("ancient:open_book", {
        onUse: e => {
            const player = e.source;
            const item = e.itemStack;

            let bookLore = item.getLore()
            const chapters = new Array(7).fill("book.ancients.notfound");;
            
            bookLore.forEach(chapter => {
                const chapterNumber = chapterMap[chapter];
                if (chapterNumber) {
                    
                    chapters[chapterNumber - 1] = `book.ancients.chapter${chapterNumber}`;
                }
              });
              
            openAncientBook(player,chapters);
        }
    });
});

export function openAncientBook(player,chapters){

    const customUi = new ActionFormData()
     .title("book.ancients.entry")
     .button(chapters[0], "textures/items/runic_essence_dust.png")
     .button(chapters[1], "textures/items/iron_amulet_powered.png")
     .button(chapters[2], "textures/items/runic_apple.png")
     .button(chapters[3], "textures/items/ancient_rune.png")
     .button(chapters[4], "textures/items/runic_staff.png")
     .button(chapters[5], "textures/items/runic_essence.png")
     .button(chapters[6], "textures/items/ancient_mask.png")

    customUi.show(player).then(response => {
        if (response.canceled) return;
        const data = AncientData[response.selection] || {};
        
        let firstPageText = data.firstPageText || "None";
        let firstImage = data.firstImage || "textures/ui/almanac_photos/notfound";

        openAncientChapter(firstPageText,firstImage,player,chapters)
    });
}

export function openAncientChapter(firstPageText,firstImage,player,chapters){
    player.playSound("item.book.page_turn")
    const chapterUi = new ActionFormData()
        .title("book.ancients.entry.chapter")
        .button(firstPageText, firstImage)
    chapterUi.show(player).then(response => {
        if (response.canceled) return;
        player.playSound("item.book.page_turn")
        openAncientBook(player,chapters)
    });
}

export const AncientData = {
    0: {
        firstPageText: "book.ancients.chapter1.text",
        firstImage: "textures/ui/chapter1.png"
    },
    1: {
        firstPageText: "book.ancients.chapter2.text",
        firstImage: "textures/ui/chapter2.png"
    },
    2: {
        firstPageText: "book.ancients.chapter3.text",
        firstImage: "textures/ui/chapter3.png"
    },
    3: {
        firstPageText: "book.ancients.chapter4.text",
        firstImage: "textures/ui/chapter4.png"
    },
    4: {
        firstPageText: "book.ancients.chapter5.text",
        firstImage: "textures/ui/chapter5.png"
    },
    5: {
        firstPageText: "book.ancients.chapter6.text",
        firstImage: "textures/ui/chapter6.png"
    },
    6: {
        firstPageText: "book.ancients.chapter7.text",
        firstImage: "textures/ui/chapter7.png"
    }
}