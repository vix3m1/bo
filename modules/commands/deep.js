const {get} = require("axios");

module.exports = {
  config: {
    name: "aic",
    commandCategory: "ai",
    usePrefix: false,
    allowPrefix: true
  },
  run: async function({box,api,args,event}) {
    const p = args.join(" ");
    if(!p) return box.reply("Usage: aic <prompt>");
    const t = await box.reply("🔎 | Analyzing...")
  try {
     const {data} = get(`https://api.joshweb.click/ai/deepseek-coder?q=${p}&uid=${event.senderID}`);
    return api.editMessage(t.messageID, data.result)
  } catch (e) {
     console.error(e)
    return api.editMessage(t.messageID, "An error occured. Try again.\n\nError: " + e.response || e.data.response || e.data)
  }
}
}