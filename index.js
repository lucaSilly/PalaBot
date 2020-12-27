const fs = require('fs');
const Discord = require("discord.js");
const client = new Discord.Client();
client.commands = new Discord.Collection();

const prefix = "$";



const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on("ready", () =>{
    console.log("Judy lance la DS");
    client.channels.cache.get("791360455431290900").send("Bot démarré! :white_check_mark:");
    let guild = bot.guilds.cache.find(guild => guild.id == guildID);
    let channel = await guild.channels.cache.find(ch => ch.id == channelID)

    // You can set any limit you want, for performance I used a low number
    channel.messages.fetch({ limit: 10 })
        .then(async messages => {
            messages.forEach(async message => {

                if (message.partial) await message.fetch();
                if (!message.guild) return;

                for (let reactionObj of message.reactions.cache) {
                    for (let reaction of reactionObj) {
                        if (typeof reaction == "string") continue;
                        if (reaction.emoji.id != emojiID) continue;
                        reaction.users.fetch()
                            .then(async users => {
                                users.forEach(async user => {
                                    if (user.bot) return;
                                    console.log("Adding role")
                                    await reaction.message.guild.members.cache.get(user.id).roles.add(roleID)
                                })
                            })
                    }
                }

            });
        })
        .catch(console.error);
});

client.on('message', message => {
    if (message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    if(!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(message, args);
    }   
    catch (error) {
        console.error(error);
        console.log('Erreur dans la commande')
    }

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
        let deadline = "";
        let args = [];
        let compteur = false;
        client.on('message', msg => {
            if (msg.author.bot) return;
            if (msg.channel.id != '791360455431290900') return; //A MODIFIER
            if (compteur) return;
            compteur = true;
            deadline = msg.content
            args= [messageReaction.message.embeds[0].description,deadline,messageReaction.message.embeds[0].fields[1].value+" lui"];
            client.commands.get('do').execute(messageReaction.message, args)
            messageReaction.message.delete();
            console.log("test");
            
        });
        
        
       
        

    }

});



client.on('error', console.error);

client.login(process.env.BOT_TOKEN);

