const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();


module.exports = {
    name : "do",
    description : "crée une carte dans #build-a-faire",
    execute(message, args){
        args = args.filter(arg => arg != "");
        message.client.channels.cache.get("791360455431290900").send(new Discord.MessageEmbed()
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
        client.on('messageReactionAdd', (messageReaction, user)=>{
            if(messageReaction.emoji.name=='✅'){
                message.send("ça marche ouesh");
            }

        });

    },
   
    //ajouter commanditaire, commande pour y accèder (quand validation de fin de map?),

};