const axios = require("axios");

module.exports = {
  config: {
    name: "lm",
    usePrefix: false,
    allowPrefix: true,
    commandCategory: "ai"
  },
  run: async function({box,args,event,api}) {
    const p = args.join(" ");
    if(!p) return box.reply("[!] Usage: lm <prompt>");
    const t = await box.reply("[ FETCHING ]")
    try {
       const {data:{response}} = await axios.get(`https://ace-rest-api.onrender.com/api/llama?prompt=${p}&id=${event.senderID}`)

      return api.editMessage(response, t.messageID)
    } catch (e) {
       console.error(e)
      return api.editMessage("[!] An unknown error occurred.", t.messageID)
    }
    
  }
}