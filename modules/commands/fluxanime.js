const axios = require("axios");

module.exports = {
  config: {
    name:"fluxv1",
    commandCategory: "ai",
    usePrefix: true
  },
  run: async function({box,args}) {
    const prompt = args.join(" ");
    if(!prompt) return box.reply("Usage: .fluxv1 <prompt>");
    try {
      const {data: imgSt} = await axios.get(`https://api.kenliejugarap.com/flux-anime-v2/?prompt=${prompt}`, {responseType: "stream"});
      imgSt.path = Date.now() + ".jpg";
      box.reply({body: prompt, attachment: imgSt})
    } catch (e) {
      console.error(e)
      return box.reply("An error occured. Try again later");
    }
  }
}