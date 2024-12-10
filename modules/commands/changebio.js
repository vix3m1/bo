module.exports = {
  config: {
    name: "bio",
    hasPermission: 2,
    usePrefix: true,
    commandCategory: "admin"
  },
  run: async function({api, args,box}) {
    const b = args.join(" ");
    if(!b) return box.reply("Please enter a bio.")

    await api.changeBio(b)
    return box.reply("Successfully changed the bio.")
  }
}