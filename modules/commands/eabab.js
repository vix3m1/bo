const axios = require("axios");

module.exports = {
  config: {
    name: "eabab",
    usePrefix: true,
    commandCategory: "entertainment"
  },
  run: async function({message}) {
    await message.react("🕑")
    try {
      const {data: result} = await axios.get("https://hiroshi-api.onrender.com/video/eabab");
      const {data: vidSt} = await axios.get(result.link, {responseType: "stream"});
      await message.react("✅")
      vidSt.path = Date.now() + ".mp4";
      return message.reply({body: `Title: ${result.title}\nUsername: ${result.username}`, attachment: vidSt});
    } catch (e) {
      await message.react("❌")
    }
  }
}