const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();


module.exports = {
    name : "do",
    description : "crée une carte dans #build-a-faire",
    execute(message, args){
        args = args.filter(arg => arg != "");
        message.client.channels.cache.get("746484079138046052").send(new Discord.MessageEmbed() //A MODIFIER 
        .setColor('#D94A2E')
        .setTitle(message.channel.name)
        .setDescription(message.guild.channels.cache.get(message.channel.id))
        .addField("Deadline : ", args[1])
        .addField("Builders :", args[2], true)
        .addField("Commanditaire :", args[3], true)
        .addField("Emplacement :", args[4])
        .setTimestamp()
        .setFooter("| Palabuild - Build à faire",'https://i.imgur.com/07vjqlZ.jpg')
        ).then( async msg => {
            await msg.react('✅');
            await msg.react('🕑');
            await msg.react('🛠️');
            await msg.react('🏛️');
        });
    console.log(message);
    message.delete();
    
    },

    
   


};