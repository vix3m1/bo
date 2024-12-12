module.exports = {
  config: {
    name: "rant",
    usePrefix: true,
    commandCategory: "general"
  },
  run: function({api,box,args}) {
    const inp = args.join(" ").split("|");
    const user = inp[0];
    const rant = inp[1];
    if(!user || !rant) {
      return box.reply("[!] Usage: .rant <user> | <rant>");
    }

    const post = `[RANT] — ${user}\n\nMSG: ${rant}`
    
    api.createPost(post).then(() => {
      return box.reply("[INFO] Rant successfully posted.")
    }).catch(e => {
      console.error(e)
      return box.reply("[!] An error occured.")
    })
  }
}