const axios = require("axios");

module.exports = {
  config: {
    name: "imaginev1",
    usePrefix: false,
    allowPrefix: true,
    commandCategory: "ai"
  },
  run: async function({box,args}) {
    const prompt = args.join(" ");
    if(!prompt) return box.reply("Usage: imaginev1 <prompt>");
    await box.react("🕑")
    try {
      const {data: imgSt} = await axios.get("https://api.kenliejugarap.com/any-dark/?width=1024&height=1024&prompt=" + prompt, {responseType: "stream"});
      
      imgSt.path = Date.now() + ".jpg";
      await box.react("✅")
      return box.reply({body: prompt, attachment: imgSt});
    } catch (e) {
      console.error(e)
      await box.react("❌")
      return box.reply("An error occured. Try again later.");
    }
  }
}