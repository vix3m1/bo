const axios = require("axios");

module.exports = {
  config: {
    name: "sxdl",
    usePrefix: true,
    commandCategory: "image",
    cooldowns: 10
  },
  run: async function({box,args}) {
    const p = args.join(" ");
    if(!p) return box.reply("[!] No prompt provided")
    try {
       const {data: im} = await axios.get(`https://ace-rest-api.onrender.com/api/SD3.5?prompt=${p}`, {responseType: "stream"});

      return box.reply({attachment: im})
    } catch (e) {
       console.error(e)
      return box.reply("[!] An error occurred.")
    }
    
  }
}