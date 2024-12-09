const { exec } = require('child_process');

module.exports.config = {
    name: "shell",
    aliases: ["sh"],
    version: "1.0",
    credits: "Dipto",
    hasPermssion: 2,
    description: "Execute shell commands",
    commandCategory: "system",
    guide: "<command>",
    coolDowns: 5,
    usePrefix: true
};

module.exports.run = async ({ box, args }) => {

    //if (!admin.includes(event.from.id)) { 
      //  return message.reply("You do not have permission to execute shell commands.");
   // }

    if (!args.length) {
        return box.reply("Please provide a command to execute.");
    }
    const command = args.join(' ');

    exec(command, (error, stdout, stderr) => {
        if (error) {
            return box.reply(`Error executing command: ${error.message}`);
        }
        if (stderr) {
            return box.reply(`Shell Error: ${stderr}`);
        }


 const output = stdout || "Command executed successfully with no output.";
        box.reply(`${output}`);
    });
};