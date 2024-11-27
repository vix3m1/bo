const axios = require("axios");

module.exports = {
  config: {
    name: "remini",
    usePrefix: false,
    allowPrefix: true,
    commandCategory: "tools"
  },
  run: async function({box,api,event}) {
    if(!event.messageReply || event.messageReply?.attachments?.length == 0) {
      return box.reply("Please reply to an image/photo.");
    };
    await box.react("🕑");
    
    try {
      const url = event.messageReply.attachments[0].url;
      const {data: result} = await axios.get(`https://hiroshi-api.onrender.com/image/upscale?url=${encodeURIComponent(url)}`);
      await box.react("✅")
      const {data: imgSt} = await axios.get(result, {responseType: "stream"});
      imgSt.path = Date.now() + ".png";
      return box.reply({body: "Here's an enhanced photo: ",attachment: imgSt})
    } catch (e) {
      await box.react("❌");
      return console.error(e)
    }
  }
}