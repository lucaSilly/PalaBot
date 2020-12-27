const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();


module.exports = {
    name : "do",
    description : "crée une carte dans #build-a-faire",
    execute(message, args){
        args = args.filter(arg => arg != "");
        message.client.channels.cache.get("791360455431290900").send(new Discord.MessageEmbed() //A MODIFIER 
        .setColor('#D94A2E')
        .setTitle(message.channel.name)
        .setDescription(args[0]+ " ")
        .addField("Deadline : ", args[1])
        .addField("Builders :", args[2])
        .setTimestamp()
        .setFooter("| Palabuild - Build à faire",'https://i.imgur.com/07vjqlZ.jpg')
        ).then( async msg => {
            await msg.react('✅');
            await msg.react('🕑')
            await msg.react('➕')
        });

        client.on('messageReactionAdd', (messageReaction, user)=>{
            if(user.id == client.user.id) return;
            if(!messageReaction.message.author.bot) return;
            if(messageReaction.message.channel != '791360455431290900') return; //A MODIFIER
        
            if(messageReaction.emoji.name=='✅'){
                const embed = new Discord.MessageEmbed(messageReaction.message.embeds[0]).setColor('#32a836');
                messageReaction.message.edit(embed);
                messageReaction.message.reactions.removeAll().catch(error => console.error('failed to clear reactions:',console.error));
            }
            else if(messageReaction.emoji.name=='🕑'){
                const args= [messageReaction.message.embeds[0].description,'pourquoi pas',messageReaction.message.embeds[0].fields[1].value+" lui"];
                client.commands.get('do').execute(messageReaction.message, args)
                messageReaction.message.delete();
                
        
            }
        
        })
       
    },

    
   
    //ajouter commanditaire, commande pour y accèder (quand validation de fin de map?),

};