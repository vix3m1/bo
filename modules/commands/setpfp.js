const axios = require("axios");

module.exports = {
  config: {
    name: "setpfp",
    usePrefix: true,
    commandCategory: "admin",
    hasPermission: 2,
    dependencies: {
      "is-url": ""
    }
  },
  run: async function({api,box,args,event}) {
    const isUrl = require("is-url");
    try {
    if(event.type == "message_reply" && event.messageReply.attachments.length > 0) {
      const url = event.messageReply.attachments[0].url;
    const {data:st} = await axios.get(url, {responseType: "stream"})
      return api.changeAvatar(st, (e) => {
        if(e) throw e

        return box.reply(" Succesfully changed the bot's profile!")
      })
    } else if(args[0] && isUrl(args[0])) {
     const {data:st} = await axios.get(args[0], {responseType: "stream"})
      return api.changeAvatar(st, (e) => {
        if(e) throw e
        return box.reply(" Succesfully changed the bot's profile!")
      })
    } else {
      return box.reply("You must provide a url or reply to an image.")
    }
    } catch(e) {
      console.error(e)
      return box.reply("An error occurrd while updating the bot's profile.")
    }
  }
}