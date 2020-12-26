const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();


module.exports = {
    name : "do",
    description : "crée une carte dans #build-a-faire",
    execute(message, args){
        args = args.filter(arg => arg != "");
        client.channels.cache.get("746484079138046052").send(new Discord.MessageEmbed()
        .setColor('#D94A2E')
        .setTitle(message.channel.name)
        .setDescription(args[1]+ " ")
        .addField("Deadline : ", args[2])
        .addField("Builders :", args[3])
        .setTimestamp()
        .setFooter("Palabuild",'https://i.imgur.com/07vjqlZ.jpg')
        ).then( async msg => {
            await msg.react('✅');
            await msg.react('🕑')
            await msg.react('➕')
        });

    },
   

};