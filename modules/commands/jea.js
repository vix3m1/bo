const axios = require("axios");

module.exports = {
  config: {
    name: "jea",
    usePrefix: false,
    allowPrefix: true,
    commandCategory: "ai"
  },
  run: async function({api,box,args}) {
    const p = args.join(" ");
    if(!p) return box.reply("[!] Usage: jea <prompt>");
    const t = await box.reply("•••");
    try {
       const {data:{content}} = await axios.get("https://ace-rest-api.onrender.com/api/jea?question="+p);
      
      return api.editMessage(content, t.messageID)
    } catch (e) {
       console.error(e)
      return api.editMessage("[!] An error occurred.", t.messageID)
    }
    
  }
}