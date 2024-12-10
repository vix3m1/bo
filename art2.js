const axios = require("axios");

module.exports = {

  config: {

    name: "create",

    commandCategory: "image",

    usePrefix: true

  },

  run: async function({box,args}) {

    const p = args.join(" ");

    if(!p) return box.reply(`Usage: ${global.config.PREFIX}art2 <prompt>`)

    

    try {

      const {data:st}= await axios.get(`https://api.joshweb.click/api/art?prompt=${p}`, {responseType: "stream"});

      return box.reply({attachment: st})

    } catch (e) {

      console.error(e)

      return box.reply("Failed!")

    }

  }

}