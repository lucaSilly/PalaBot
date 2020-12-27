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

client.on('raw', async event => {
	// `event.t` is the raw event name
	if (!events.hasOwnProperty(event.t)) return;

	const { d: data } = event;
	const user = client.users.get(data.user_id);
	const channel = client.channels.get(data.channel_id) || await user.createDM();

	// if the message is already in the cache, don't re-emit the event
	if (channel.messages.has(data.message_id)) return;

	// if you're on the master/v12 branch, use `channel.messages.fetch()`
	const message = await channel.fetchMessage(data.message_id);

	// custom emojis reactions are keyed in a `name:ID` format, while unicode emojis are keyed by names
	// if you're on the master/v12 branch, custom emojis reactions are keyed by their ID
	const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
	const reaction = message.reactions.get(emojiKey);

	client.emit(events[event.t], reaction, user);
});

client.on('messageReactionAdd', (reaction, user) => {
	console.log(`${user.username} reacted with "${reaction.emoji.name}".`);
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

/*client.on('raw', e => {
    if(e.t === 'MESSAGE_REACTION_ADD'){
        if(user.id !==client.id && e.){

        }

    }
    console.log(e);


});*/



client.on('error', console.error);

client.login(process.env.BOT_TOKEN);

