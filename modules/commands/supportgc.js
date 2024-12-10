module.exports = {
  config: {
    name: "supportgc",
    usePrefix: true,
    commandCategory: "assistance",
  },
  run: async function({box,api,event,args}) {
    const {join} = require("path");
    const fs = require("fs");
    
    const conf = require(join(__dirname, "..", "..", "config.json"));
    
    try {
      const opt = args[0];
      
      if(opt?.toLowerCase() == "set" && conf.ADMINBOT.includes(event.senderID)) {
        const tid = args[1];
      if(!tid) return box.reply("No threadID provided to set.")
        conf.adminGroup = args[1];
        await box.reply("Successfully set admin group to: "+ tid);
        return fs.writeFileSync(join(__dirname, "..", "..", "config.json"), JSON.stringify(conf,null,2));
      }
      
      const user = event.senderID;
      
      await api.addUserToGroup(user, conf.adminGroup, async (e) => {
        if(e){ 
          
          await box.reply("An error occured while adding you to the group. Try looking at your message requests or spams.");
          throw new Error(e)
             }
      })
    } catch (e) {
      await box.reply("An error occured.")
      return console.error(e)
    }
  }
}