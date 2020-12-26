const Discord = require('discord.js');

module.exports = {
    name : "do",
    description : "crée une carte dans #build-a-faire",
    execute(message, args){
        args = args.filter(arg => arg != "");
        message.channel.send(new Discord.MessageEmbed()
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