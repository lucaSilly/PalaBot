const { execute } = require("./ping")

const Discord = require('discord.js');

module.exports = {
    name : "do",
    description : "crée une carte dans #build-a-faire",
    execute(message, args){
        args = args.filter(arg => arg != "");
        message.channel.send(new Discord.MessageEmbed()
        .setColor('#D94A2E')
        .setTitle(args[0])
        .setDescription(args[1]+ " ")
        .addField("Deadline : ", args[2])
        .addField("Builders :", args[3])
        .setTimestamp()
        .setFooter("Palabuild",'https://i.imgur.com/wSTFkRM.png')
        );
        embedMessage.react(':white_check_mark:')
            .then(()=> message.react(':clock10:'))
            .then(() => message.react(':heavy_plus_sign:'))
            .catch(() => console.error("une réaction ne charge pas"));



    },
   

};