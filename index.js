const fs = require('fs');
const Discord = require("discord.js");
const client = new Discord.Client();
client.commands = new Discord.Collection();

const prefix = "!";



const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on("ready", () =>{
    console.log("Judy lance la DS");
});

/*client.on("message",function(message){
    if (message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (command == "ping"){
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`pong! ${timeTaken}ms`);
    }
   
    


});*/

client.on('error', console.error);

client.login(process.env.BOT_TOKEN);

