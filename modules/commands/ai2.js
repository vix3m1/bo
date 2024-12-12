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
      console.log(temp)
      const {data:{result}}= await axios.get(`https://ace-rest-api.onrender.com/api/NVIDIA-Nemotron?q=${prompt}&id=${event.senderID}`);
      return box.edit(result, temp.messageID);
    } catch (e) {
    return  box.edit("An error occurred while fetching the response.", temp.messageID);
    }
  }
}