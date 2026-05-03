import { Dimension, ItemStack, EnchantmentType } from '@minecraft/server';
/**
  spawnLoot(loot: Object, location: Vector3): Entity[]
  Returns Entity[] - An entity array.

  loot: Object > a variable similar to JSON loot_tables.
  location: Vector3 > the location where the loot table will spawn.
*/
Dimension.prototype.spawnLoot = function(loot, location) {
    try {
        let randomChance = 0,
        weight = 100,
        spawnedItems = [];
        
        // Starts the loot table spawn, from the first pool
        for(const pool of loot.pools) {
            randomChance = Math.ceil(Math.random()*100);
            weight = pool?.weight ?? 100;
            // Skip if rolls does not exist
            if(!pool?.rolls) {
                console.error(`/'rolls/' is missing at pools[${loot.pools.indexOf(pool)}]`);
                continue;
            }
            if(randomChance <= weight) {
                let rolls = typeof pool.rolls === 'number' ? pool.rolls : typeof pool.rolls === 'object' ? Math.floor(Math.random()*(pool.rolls.max - pool.rolls.min + 1)) + pool.rolls.min : 1;
                rolls = rolls <= 0 ? 1 : rolls
                
                // Repeat the loot table according to the number of rolls
                for(let i = 0; i < rolls; i++) {
                    for(const entry of pool.entries) {
                        // The chance is calculated for each entry
                        randomChance = Math.ceil(Math.random()*100);
                        weight = entry?.weight ?? 100;
                        
                        if(randomChance <= weight) {
                            // Skip/Break if entry does not have an item (empty loot)
                            if(!entry?.item && entry?.stop) break;
                            if(!entry?.item) continue;
                            
                            // Gets the itemStack and count, skip if count <= 0.
                            const count = typeof entry.count === "number" ? entry.count : typeof entry.count === "object" ? Math.floor(Math.random()*(entry.count.max - entry.count.min +1)) + entry.count.min : 1;
                            if(count <= 0) continue;
                            const item = new ItemStack(`${entry.item}`, count);
                            
                            // Sets optional item parameters
                            item.setCanDestroy(entry?.canDestroy);
                            item.setCanPlaceOn(entry?.canPlaceOn);
                            item.nameTag = entry?.setName;
                            item.setLore(entry?.setLore);
                            
                            // set durability ?
                            if(entry?.setDurability && item?.getComponent('durability')) {
                                const durability = typeof entry.setDurability === 'number' ? entry.setDurability : typeof entry.setDurability === 'object' ? Math.floor(Math.random()*(entry.setDurability.max - entry.setDurability.min +1)) + entry.setDurability.min : 1,
                                maxDurability = item.getComponent('durability').maxDurability,
                                damage = durability - maxDurability;
                                item.getComponent('durability').damage += damage < 0 ? damage*-1 : damage
                            }
                            
                            // set enchantments ?
                            if(entry?.setEnchantments && item?.getComponent('enchantable')) {
                                for(const enchantment of entry.setEnchantments) {
                                    randomChance = Math.ceil(Math.random()*100);
                                    weight = enchantment?.weight ?? 100;
                                    if(randomChance <= weight) {
                                        const lvl = typeof enchantment.level === 'number' ? enchantment.level : typeof enchantment.level === 'object' ? Math.floor(Math.random()*(enchantment.level.max - enchantment.level.min +1)) + enchantment.level.min : 1;
                                        item.getComponent('enchantable').addEnchantment({ type: new EnchantmentType(`${enchantment.name}`), level: lvl });
                                        if(enchantment?.stop) break;
                                    }
                                }
                            }
                        
                            // set dynamic properties ?
                            if(entry?.setDynamicProperties && !item.isStackable) {
                                for(const property of entry.setDynamicProperties) {
                                    randomChance = Math.ceil(Math.random()*100);
                                    weight = property?.weight ?? 100;
                                    if(randomChance <= weight) {
                                        if(!property?.identifier) continue;
                                        const value = property?.value ?? null;
                                        item.setDynamicProperty(property.identifier, value);
                                        if(property?.stop) break;
                                    }
                                }
                            }
                        
                            // Spawns the item at the specified location.
                            spawnedItems.push(this.spawnItem(item, location));
                            if(entry?.stop) break;
                        }
                    }
                }
                if(pool?.stop) break;
            }
        }
        // Returns all spawned items in an entity array
        return spawnedItems;
    } catch (error) {
        console.error(error);
    }
}