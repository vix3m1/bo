const axios = require("axios");

module.exports = {

  config: {

    name: "findl",

    usePrefix: true,

    commandCategory: "utilities"

  },

  run: async function({box,api,args}) {

    const q = args.join(" ");

    if(!q) return box.reply(`Usage: ${global.config.PREFIX}${this.config.name} <query>`);

    const t = await box.reply("🔎 | Searching...");

    try {

      const {data:resp} = await axios.get(`https://api.joshweb.click/search/lyrics?q=${q}`);
        
        if(resp.error) {

            throw {
                status: false,
                e: resp.error
                }
            }



      return api.editMessage(t.messageID, resp.result.lyrics?.trim());

      r

    } catch (e) {
        
        if(e.e && !e.status) {
            return api.editMessage(t.messageID, "404 | No song found matching that lyrics.")
            }

      await api.editMessage(t.messageID, "An error occured while fetching the result.")

      return console.error(e)

    }

  }

}