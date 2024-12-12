const axios = require("axios");

module.exports = {
  config: {
    name: "anivid",
    usePrefix: true,
    commandCategory: "media"
  },
  run: async function({box}) {
    await box.react("🕑")
   try {
      const {data} = await axios.get("https://ace-rest-api.onrender.com/api/animevid");
     
     const {data:vid} = await axios.get(data.playUrl, {responseType: "stream"});
     await box.react("")
     return box.reply({attachment: vid});
   } catch (e) {
      console.log(data)
     return box.reply("[!] An error occurred.")
   }
   
  }
}