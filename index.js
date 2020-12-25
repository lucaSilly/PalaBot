const Discord = require("discord.js");
const client = new Discord.Client();

const prefix = "!";

client.on("ready", () =>{
    console.log("Judy lance la DS");
});

client.on("message",function(message){
    if (message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (command == "ping"){
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`pong! ${timeTaken}ms`);
        
        
    }


});

client.login(process.env.BOT_TOKEN);

