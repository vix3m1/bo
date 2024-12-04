const a = require('axios');
const tinyurl = require('tinyurl');
const baseApiUrl = async () => {
  const base = await a.get(
    `https://raw.githubusercontent.com/Blankid018/D1PT0/main/baseApiUrl.json`,
  );
  return base.data.api;
};

module.exports = {
  config: {
    name: "upscaleai",
    aliases: ["4k", "upscale"],
    version: "1.0",
    credits: "JARiF||Romim",
    permission: 0,
    description: "Upscale your image.",
    commandCategory: "utilities",
    prefix: true,
    usePrefix: true,
    dependencies: {
      "tinyurl": ""
    }
  },

  run: async ({  args, event, api }) => {
    let imageUrl;

    if (event.type === "message_reply") {
      const replyAttachment = event.messageReply.attachments[0];

      if (["photo", "sticker"].includes(replyAttachment?.type)) {
        imageUrl = replyAttachment.url;
      } else {
        return api.sendMessage(
          { body: "❌ | Reply must be an image." },
          event.threadID,event.messageID
        );
      }
    } else if (args[0]?.match(/(https?:\/\/.*\.(?:png|jpg|jpeg))/g)) {
      imageUrl = args[0];
    } else {
      return api.sendMessage({ body: "❌ | Reply to an image." }, event.threadID,event.messageID);
    }

    try {
      const url = await tinyurl.shorten(imageUrl);
      const k = await a.get(`${await baseApiUrl()}/4k?imageUrl=${url}`);

      api.sendMessage("✅ | Please wait...",event.threadID,event.messageID);

      const resultUrl = k.data.dipto;

      api.sendMessage({ body: "✅ | Image Upscaled.", attachment: (await a.get(resultUrl,{responseType: 'stream'})).data },event.threadID,event.messageID);
    } catch (error) {
      api.sendMessage("❌ | Error: " + error.message,event.threadID,event.messageID);
    }
  }
};