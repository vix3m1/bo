const axios = require("axios");

module.exports = {
  config: {
    name: "remini",
    usePrefix: false,
    allowPrefix: true,
    commandCategory: "tools"
  },
  run: async function({message,api,event}) {
    if(!event.messageReply || event.messageReply?.attachments?.length == 0) {
      return message.reply("Please reply to an image/photo.");
    };
    await message.react("🕑");
    
    try {
      const url = event.messageReply.attachments[0].url;
      const {data: result} = await axios.get(`https://hiroshi-api.onrender.com/image/upscale?url=${encodeURIComponent(url)}`);
      await message.react("✅")
      const {data: imgSt} = await axios.get(result, {responseType: "stream"});
      imgSt.path = Date.now() + ".png";
      return message.reply({body: "Here's an enhanced photo: ",attachment: imgSt})
    } catch (e) {
      await message.react("❌");
      return console.error(e)
    }
  }
}