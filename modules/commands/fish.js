const fs = require("fs");
const {join} = require("path")
function saveData(data) {
  return fs.writeFileSync(join(__dirname, "fish.json"), JSON.stringify(data, null, 2));
}

const fishes = [
  { name: "goldfish", rarity: 5 },
  { name: "trout", rarity: 3 },
  { name: "salmon", rarity: 2 },
  { name: "shark", rarity: 1 },
];

function getRandomFish() {
  const totalRarity = fishes.reduce((sum, fish) => sum + fish.rarity, 0);
  const randomNum = Math.floor(Math.random() * totalRarity);
  let cumulativeRarity = 0;

  for (const fish of fishes) {
    cumulativeRarity += fish.rarity;
    if (randomNum < cumulativeRarity) {
      return fish.name;
    }
  }
}

module.exports = {
  config: {
    name: "fish",
    usePrefix: true,
    commandCategory: "games"
  },
  run: function({ box, args, api, event }) {
    const fishData = require("./fish.json");
    if (!fishData[event.senderID]) {
      fishData[event.senderID] = {
        balance: 100,
        inventory: {
          Bait: 5,
        }
      };
    }
    const userData = fishData[event.senderID];
    const action = args[0]?.toLowerCase();
    if (!action) return box.reply("[!] • No action provided.");

    switch (action) {
      case "sell":
      case "-sl": {
        const priceRange = {
          goldfish: {
            min: 35,
            max: 80
          },
          trout: {
            min: 25,
            max: 50
          },
          salmon: {
            min: 15,
            max: 45,
            
          },
          shark: {
            min: 10,
            max: 40
          }
        }
        const itemToSell = args[1]?.toLowerCase();
        if(!itemToSell) {
          return box.reply("[!] • Invalid item to sell. Recheck if there's a typo.");
        }
        if(!priceRange[itemToSell]){
         return box.reply("[!] • You're trying to sell an item that doesn't exist.")
        }
        if(!userData.inventory[itemToSell]) {
          return box.reply("[!] • You don't have any of that item to sell.");
        }
        const price = Math.floor(Math.random() * (priceRange[itemToSell].max - priceRange[itemToSell].min + 1));
        userData.inventory[itemToSell]--;
        userData.balance += price;
        saveData(fishData)
        
        break;
      }
      case "shop":
      case "-sh": {
        const shopItems = {
          bait: 15,
          fishing_rod: 50
        }
        if(!args[1]) {
          box.reply(`[🛒] • Shop \nYour Balance: ${userData.balance}\n\n[🪤] — Bait: $${shopItems.bait} (Bait)\n\n[❓] • Use .fish shop <item> to buy an item.`);
        }
      if(args[1]?.toLowerCase() == "buy") {
      const item = args[2]?.toLowerCase();
        if(!shopItems[item]) {
          return box.reply("[!] • Invalid item. Check again if it has a typo.");
          
        }
        if(userData.balance < shopItems[item]) {
          return box.reply("[!] • You do not have enough balance to make this purchase!")
        }
        userData.balance -= shopItems[item];
        userData.inventory[item] = (userData.inventory[item] || 0) + 1;
        box.reply("Successfully bought " + item)
        saveData(fishData)
      }
        break;
      }
      case "inv":
      case "-i": {
        const userInventory = userData.inventory;
        const cleanInventory = Object.keys(userInventory).filter(i => userInventory[i] > 0).map(k => k.toLowerCase());
      
        const items = cleanInventory.map(key => `• ${key.charAt(0).toUpperCase() + key.slice(1)} × ${userInventory[key.charAt(0).toUpperCase() + key.slice(1)]}`);
        box.reply(`[i] • Your Inventory:\n\n${items.join("\n")}`);
        break;
      }
      case "start":
      case "-s": {
        if (userData.inventory.bait < 1) {
          return box.reply("[!] • You do not have enough baits!");
        }
        
        userData.inventory.bait -= 1;  
        const caughtFish = getRandomFish();
        
        // Update user's fish collection
        if (!userData.inventory[caughtFish]) {
          userData.inventory[caughtFish] = 0;
        }
        userData.inventory[caughtFish] += 1;

        saveData(fishData); // Save the updated data

        box.reply(`Started Fishing...\n\nYou caught a ${caughtFish}!`);
        break;
      }
      default: {
        box.reply("[!] • Unknown action.");
      }
    }
  }
}