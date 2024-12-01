const axios = require("axios");

module.exports = {
  config: {
    name: "imaginev1",
    usePrefix: false,
    allowPrefix: true,
    commandCategory: "ai"
  },
  run: async function({message,args}) {
    const prompt = args.join(" ");
    if(!prompt) return message.reply("Usage: imaginev1 <prompt>");
    await message.react("🕑")
    try {
      const {data: imgSt} = await axios.get("https://api.kenliejugarap.com/any-dark/?width=1024&height=1024&prompt=" + prompt, {responseType: "stream"});
      
      imgSt.path = Date.now() + ".jpg";
      await message.react("✅")
      return message.reply({body: prompt, attachment: imgSt});
    } catch (e) {
      console.error(e)
      await message.react("❌")
      return message.reply("An error occured. Try again later.");
    }
  }
}