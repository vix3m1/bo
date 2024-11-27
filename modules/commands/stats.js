const ms = require("enhanced-ms");

module.exports = {
  config: {
    name: "stats",
    usePrefix: true,
    commandCategory: "system",
  },
  run: function({box}) {
    box.reply(`The bot is running since:\n${ms(process.uptime() * 1000)}`)
  }
}