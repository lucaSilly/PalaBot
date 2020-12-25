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
    else if (command == "sum"){
        const numArgs = args.map(x => parseFloat(x));
        const sum = numArgs.reduce((counter,x) => counter += x);
        message.reply(`la réponse est ${sum}`);
    }


});

client.login(process.env.BOT_TOKEN);

