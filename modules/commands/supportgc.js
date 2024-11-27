module.exports = {
  config: {
    name: "supportgc",
    commandCategory: "assistance",
  },
  run: async function({box,api,event}) {
    try {
      const user = event.senderID;
      
      await api.addUserToGroup(user, "8431545870306624", async (e) => {
        if(e){ 
          
          await box.reply("An error occured while adding you to the group. Try looking at your message requests or spams.");
          throw new Error(e)
             }
      })
    } catch (e) {
      return console.error(e)
    }
  }
}