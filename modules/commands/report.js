module.exports = {
  config: {
    name: "report",
    usePrefix: true,
    commandCategory: "assistance"
  },
  run: async function({api,args,event,box}) {
    const {ADMINBOT} = require("../../config.json");
    const f = args.join(" ");
    if(!f) return box.reply("No report provided.");
       const [{o0}] = await api.getUserInfoV5(event.senderID)

    await new Promise((res, rej) => {
      ADMINBOT.forEach(async admin => {
        api.sendMessage(`[!] REPORT FROM ${o0.data.messaging_actors[0].name.toUpperCase()}\n\nMessage: ${f}`, admin).then(res).catch(rej)
      })

      return box.reply("Report was sent to admins.")
    })
    
  }
}