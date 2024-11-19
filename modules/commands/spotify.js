const axios = require("axios");

module.exports = {
  config: {
    name: "spotify",
    aliases: ["sp"],
    usePrefix: false,
    allowPrefix: true,
    commandCategory: "media"
  },
  run: async function({args,box,api}) {
    const query = args.join(" ");
    if(! query ) return box.reply("Usage: [spotify | sp ] <query>");
    try {
    const {data} = await axios.get(`https://hiroshi-api.onrender.com/tiktok/spotify?search=${query}`);

      const {data: imageStrm} = await axios.get(data[0].image, {responseType: "stream"});
      const {data: audioStrm} = await axios.get(data[0].download, {responseType: "stream"});

      imageStrm.path = "image.jpg";
      audioStrm.path = "music.mp3";

      const temp = await box.reply({attachment: imageStrm});

      return api.sendMessage({attachment: audioStrm}, temp.threadID, temp.messageID);
      
    } catch(e) {
      console.error(e)
    }
  }
}