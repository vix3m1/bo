const axios = require("axios");

module.exports = {
  config: {
    name: "pin",
    usePrefix: false,
    allowPrefix: true,
    commandCategory: "media"
  },
  run: async function({box,args}) {
    const i = args.join(" ").split("-");
    const q = i[0];
    const n = parseInt(i[1]) || 5
    if(n > 10 || n < 1) {
      return box.reply("Invalid amount of images.")
    }
    if(!q) return box.reply("[ ! ] Usage: pin Spongebob -10\n\nThe max number of images supported is 10.")
    await box.react("🕑")
    try {
        const {data:{data: result}}= await axios.get(`https://hiroshi-api.onrender.com/image/pinterest?search=${q}`)
      
      const imgArr = []
       for(let i = 0; i < n; i++) {
         const {data: imgSt} = await axios.get(result[i], {responseType: "stream"});
         imgArr.push(imgSt);
       }
    await box.react("")
    return box.reply({attachment: imgArr})
    } catch (e) {
       console.error(e)
return box.reply("[!] An error occured.")
    }
    
  }
}