const axios = require("axios");

module.exports = {
  config: {
    name: "shoti",
    usePrefix: true,
    commandCategory: "media"
  },
  run: async function({box}) {
    await box.react("🕑")
    try {
      const {data: result} = await axios.get("https://hiroshi-api.onrender.com/video/eabab");
      const {data: vidSt} = await axios.get(result.link, {responseType: "stream"});
      await box.react("✅")
      vidSt.path = Date.now() + ".mp4";
      return box.reply({body: `Title: ${result.title}\nUsername: ${result.username}`, attachment: vidSt});
    } catch (e) {
     return await box.react("❌")
    }
  }
}