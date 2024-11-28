const fs = require("fs");
const {join} = require("path")
function saveData(data) {
  return fs.writeFileSync(join(__dirname, "fish.json"), JSON.stringify(data, null, 2));
}

const fishes = [
  { name: "Goldfish", rarity: 5 },
  { name: "Trout", rarity: 3 },
  { name: "Salmon", rarity: 2 },
  { name: "Shark", rarity: 1 },
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
          bait: 5
        }
      };
    }
    const userData = fishData[event.senderID];
    const action = args[0]?.toLowerCase();
    if (!action) return box.reply("[!] • No action provided.");

    switch (action) {
      case "inv":
      case "-i": {
        const userInventory = userData.inventory;
        const cleanInventory = Object.keys(userInventory).filter(i => userInventory[i] > 0)
        console.log(cleanInventory)
        const items = cleanInventory.map(key => `• ${key} × ${userInventory[key]}`);
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