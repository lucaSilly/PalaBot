const { execute } = require("./ping")

const Discord = require('discord.js');

module.exports = {
    name : "do",
    description : "crée une carte dans #build-a-faire",
    execute(message, args){
        message.channel.send(new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(args[0])
        .addField("Deadline : ", args[1])
        .addField("\u200B","\u200B")
        .addField("Builders :", args[2])
        
        );


    },
   

};