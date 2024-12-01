module.exports = {
  config: {
    name: "restart",
    usePrefix: true,
    hasPermission: 2,
    commandCategory: "system"
  },
  run: async function({message}) {
   await message.reply("Restarting...");
    process.exit(1).then(() => {
      message.send("Bot restarted.")
    })
  }
}