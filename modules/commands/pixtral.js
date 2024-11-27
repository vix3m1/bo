const axios = require("axios");

module.exports = {
  config: {
    name: "pixai",
    usePrefix: false,
    allowPrefix: true,
    commandCategory: "chatbots"
  },
  run: async function({api,box,event,args}) {
    const prompt = args.join(" ");
    if(!prompt) return box.reply("Usage:\n\npixai <prompt>\nYou can also reply to an image and execute the same command to ask about the picture.")
    const temp = await box.reply("🔎 | Searching...")
    try {
      
    
    if(event.type == "message_reply" && event.messageReply.attachments[0]) {
      console.log("IMAGE TRIGGERED")
      const url = event.messageReply.attachments[0].url;
      console.log(url)
      const {data: result} = await axios.get(`https://api.kenliejugarap.com/pixtral-paid/?question=${prompt}&image_url=${encodeURIComponent(url)}`);
      return api.editMessage(result.response, temp.messageID);
      
    } else {
      const {data: result} = await axios.get(`https://api.kenliejugarap.com/pixtral-paid/?question=${prompt}`);

      return api.editMessage(result.response, temp.messageID);
    }
      } catch (e) {
      console.error(e)
      return api.editMessage("An error occurred while fetching the response.", temp.messageID);
    }
  }
}