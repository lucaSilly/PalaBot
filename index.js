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

client.on('raw', e => {
    if(e.t === 'MESSAGE_REACTION_ADD'){
            client.channels.cache.get(e.d.channel_id).messages.fetch(e.d.message_id).then(msg => {
                //MESSAGE BUILD - A - FAIRE
                if(msg.author.bot && e.d.channel_id == '791360455431290900' && e.d.user_id !== '791359596304007199' ){    //a changer
                    switch (e.d.emoji.name){
                        case '✅' :
                            const embed = new Discord.MessageEmbed(msg.embeds[0]).setColor('#32a836');  
                            msg.edit(embed);
                            msg.reactions.removeAll();
                            break;

                        case '🕑' :
                            let deadline = "";
                            let args = [];
                            let compteur = false;
                            client.on('message', message => {
                                if(!message.author.bot && e.d.channel_id == '791360455431290900' && !compteur){
                                    compteur = true;
                                    deadline = message.content;
                                    args= [msg.embeds[0].description,deadline,msg.embeds[0].fields[1].value+" lui"];
                                    client.commands.get('do').execute(msg, args);
                                    message.delete();
                                    msg.delete();
                                }
                            });
                            break;
                        
                        case '🛠️' :
                            break;

                        default :
                            console.log('emoji non reconnu');
                        };
                    }
                });
            }
        });



client.on('error', console.error);

//client.login(process.env.BOT_TOKEN);
client.login(require("./config.json").BOT_TOKEN)
