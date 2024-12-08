const axios = require("axios");

module.exports = {
  config: {
    name: "ai2",
    author: "Renz",
    usePrefix: false,
    allowPrefix: true,
    commandCategory: "ai"
    
  },
  run: async function({api,box,args,event}) {
    const prompt= args.join();
    if(!prompt) return box.reply("Usage: ai2 <prompt>");
    const temp = await box.reply("🔎 | Searching...");
    try {
      const {data:{response}}= await axios.get(`https://the-useless-api.vercel.app/gpt?prompt=${prompt}&uid=${event.senderID}`);
      return box.edit(response, temp.boxID);
    } catch (e) {
    return  box.edit("An error occurred while fetching the response.", temp.boxID);
    }
  }
}