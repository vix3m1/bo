const axios = require("axios");
const fs = require("fs");
const {join} = require("path");

module.exports = {
  config: {
    name: "ash",
    commandCategory: "ai",
    usePrefix: true
  },
  handleEvent: async function({event,box,api}) {
    const config = require(join(__dirname, "ash.json"));
    if(config[event.threadID]?.ashley && !event.body.startsWith(".")) {
      const {data} = await axios.get(`https://markdevs-last-api-2epw.onrender.com/api/ashley?query=${encodeURIComponent(event.body.split(" ").slice(1).join(" "))}`)

      return box.reply(data.result)
    }
  },
  run: async function({api,box,args,event}) {
        const config = require(join(__dirname, "ash.json"));
    if(!config[event.threadID]) {
      config[event.threadID] = {
        ashley: false
      }
    }
    fs.writeFileSync(join(__dirname, "ash.json"), JSON.stringify(config,null,2))
    const opt = args[0]
    if(!opt){
      return box.reply(`Usage: ${global.config.PREFIX} [on|off]`)
    }
    switch(opt.toLowerCase()) {
      case 'on': {
        config[event.threadID].ashley = true;

       fs.writeFileSync(join(__dirname, "ash.json"), JSON.stringify(config,null,2));
        box.reply("Ashley is now active.")
        break;
        
      }
      case 'off': {
        if(!config[event.threadID].ashley) {
          return box.reply("Ashley is not active.")
        }
        config[event.threadID].ashley = false;
        fs.writeFileSync(join(__dirname, "ash.json"), JSON.stringify(config,null,2));
        box.reply("Ashley is now inactive.")
        return
      }
    }
  }
}