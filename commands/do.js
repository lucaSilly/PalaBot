const { execute } = require("./ping")

const Discord = require('discord.js');

module.exports = {
    name : "do",
    description : "crée une carte dans #build-a-faire",
    execute(message, args){
        const toDo = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(args[1])
    
    Discord.Channel.send(toDo);

    },

};