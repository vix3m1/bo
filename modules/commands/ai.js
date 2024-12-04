const { Hercai } = require('hercai');
const herc = new Hercai();

module.exports.config = {
  name: 'ai',
  version: '1.1.0',
  aliases: ["gpt3"],
  hasPermssion: 0,
  credits: 'Yan Maglinte | Liane Cagara',
  description: 'An AI command using Hercai API!',
  usePrefix: false,
  allowPrefix: true,
  commandCategory: 'ai',
  usages: 'Ai [prompt]',
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args, box }) {
  const prompt = args.join(' ');
    // Available Models: "v3", "v3-32k", "turbo", "turbo-16k", "gemini"
    if (!prompt) {
      box.react('❓');
     return box.reply('Please specify a message!');
      
    } 
  await new Promise(async (resolve,rej) => {
   const info = await box.reply(`Fetching answer...`);
      box.react('⏱️');
    herc.question({ model: 'v3-32k', content: prompt }).then(async res => {
      
          
      api.unsendMessage(info.messageID)

      resolve(box.reply(res.reply))
      
    }).catch(e => {
      box.reply("[!] An error occured.")
      rej(e)
    })
      
    })
    
  
};
