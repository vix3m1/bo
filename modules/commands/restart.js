module.exports = {
  config: {
    name: "restart",
    usePrefix: true,
    hasPermission: 2,
    commandCategory: "system"
  },
  run: async function({box}) {
   await box.reply("Restarting...");
    process.exit(1).then(() => {
      box.send("Bot restarted.")
    })
  }
}