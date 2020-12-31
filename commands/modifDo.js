const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();


module.exports = {
    name : "modifDo",
    description : "crée une carte dans #build-a-faire",
    execute(message, args){
        args = args.filter(arg => arg != "");
        console.log(args);
        message.client.channels.cache.get("746484079138046052").send(new Discord.MessageEmbed() //A MODIFIER 
        .setColor('#D94A2E')
        .setTitle(args[0])
        .setDescription(args[1])
        .addField("Deadline : ", args[2])
        .addField("Builders :", args[3], true)
        .addField("Commanditaire :", args[4], true)
        .addField("Emplacement :", args[5])
        .setTimestamp()
        .setFooter("| Palabuild - Build à faire",'https://i.imgur.com/07vjqlZ.jpg')
        ).then( async msg => {
            await msg.react('✅');
            await msg.react('🕑');
            await msg.react('🛠️');
            await msg.react('🏛️');
        });
    message.delete();
    
    },

    
   


};