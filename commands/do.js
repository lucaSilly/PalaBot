const { execute } = require("./ping")

const Discord = require('discord.js');

module.exports = {
    name : "do",
    description : "crée une carte dans #build-a-faire",
    execute(message, args){
        message.channel.send(new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(args[0])
        .setDescription(args[1]+" ")
        .addField("Deadline : ", args[2])
        .addField("Builders :", args[3])
        
        );


    },
   

};