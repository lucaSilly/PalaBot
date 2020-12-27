const fs = require('fs');
const Discord = require("discord.js");
const { userInfo } = require('os');
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

/*client.on('messageReactionAdd', (messageReaction, user)=>{
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

});*/

client.on('raw', e => {
    if(e.t === 'MESSAGE_REACTION_ADD'){
       if(e.d.user_id !== '791359596304007199' && (e.channel_id == '791360455431290900')){
           client.channels.cache.get('765515132192423936').send("ça marche");
       }

    }
    console.log(e);


});



client.on('error', console.error);

client.login(process.env.BOT_TOKEN);

