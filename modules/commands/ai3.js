const axios = require("axios");

module.exports = {
 config: {
   name: "ai3",
   commandCategory: "ai",
   usePrefix: false,
   allowPrefix: true
 },
 run: async function({box,event, args,api}) {
  const p = args.join(" ");
  if(!p) return box.reply("Usage: ai3 <prompt>")
  const t = await box.reply("🔎 | Searching...");
  try {
   const {data:{response}} = await axios.get(`https://ace-rest-api.onrender.com/api/mixtral-8b?q=${p}`)
   
   return api.editMessage(t.messageID, result)
  } catch(e){ 
   console.error(e)
   return api.editMessage(t.messageID, "An error occured while trying to fetch the ai.")
  }
 }
}