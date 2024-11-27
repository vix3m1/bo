const axios = require("axios");

module.exports = {
  config: {
    name: "ai2",
    author: "Renz",
    usePrefix: false,
    allowPrefix: true,
    commandCategory: "chatbots"
    
  },
  run: async function({api,box,args,event}) {
    const prompt= args.join();
    if(!prompt) return box.reply("Usage: ai2 <prompt>");
    const temp = await box.reply("🔎 | Searching...");
    try {
      const {data:{response}}= await axios.get(`https://the-useless-api.vercel.app/gpt?prompt=${prompt}&uid=${event.senderID}`);
      return api.editMessage(response, temp.messageID);
    } catch (e) {
    return  api.editMessage("An error occurred while fetching the response.", temp.messageID);
    }
  }
}