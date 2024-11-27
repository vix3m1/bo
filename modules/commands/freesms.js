const axios = require("axios");

module.exports = {
  config: {
    name: "freesms",
    author: "Renz, API By Kenlie",
    usePrefix: false,
    allowPrefix: true,
    commandCategory: "misc",
    cooldown: 15
  },
  run: async function({api,box,args}) {
    const input = args.join(" ").split("|");
    const number = input[0]?.trim()
    const message = input[1].toString();
    if(!number || !message) return box.reply("Usage: freesms <number> | <your_sms>");
    
    
    try {
      const {data} = await axios.get(`https://api.kenliejugarap.com/freesmslbc/?number=${number}&message=${message}`)
      return box.reply(`${data.response}\n\nSpecial thanks for Kenlie for the API.`)
    } catch (e) {
      console.error(e)
      return box.reply("An error occured while sending your SMS. Maybe try again?");
    }
  }
}