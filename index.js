const fs = require('fs');
const Discord = require("discord.js");
const { userInfo } = require('os');
const { description } = require('./commands/do');
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
                if(msg.author.bot && e.d.channel_id == '746484079138046052' && e.d.user_id !== '791359596304007199' ){    //a changer
                    switch (e.d.emoji.name){
                        case '✅' :
                            const embed = new Discord.MessageEmbed(msg.embeds[0]).setColor('#32a836');  
                            msg.edit(embed);
                            msg.reactions.removeAll();
                            break;

                        case '🕑' :
                            let titre = "";
                            let desc = "";
                            let deadline = "";
                            let args = [];
                            let compteur = false;
                            client.on('message', message => {
                                if(!message.author.bot && message.channel.id == '746484079138046052' && !compteur){
                                    compteur = true;
                                    deadline = message.content;
                                    titre = msg.embeds[0].titre;
                                    desc = msg.embeds[0].description;
                                    args= [titre,desc,deadline,msg.embeds[0].fields[1].value,msg.embeds[0].fields[2].value,msg.embeds[0].fields[3].value];
                                    client.commands.get('do').execute(msg, args);
                                    message.delete();
                                    msg.delete();
                                }
                            });
                            break;
                        
                        case '🛠️' :
                            let titre2 = "";
                            let desc2 = "";
                            let builders = "";
                            let args2 = [];
                            let compteur2 = false;
                            client.on('message', message => {
                                if(!message.author.bot && message.channel.id == '746484079138046052' && !compteur2){
                                    compteur2 = true;
                                    builders = message.content;
                                    titre2 = msg.embeds[0].titre;
                                    desc2 = msg.embeds[0].description;
                                    args2= [titre2,desc2,msg.embeds[0].fields[0].value,builders,msg.embeds[0].fields[2].value,msg.embeds[0].fields[3].value];
                                    client.commands.get('do').execute(msg, args2);
                                    message.delete();
                                    msg.delete();
                                    console.log(args2);
                                }
                            });
                            break;
                        
                        case '🏛️' :
                            let titre3 = "";
                            let desc3 = "";
                            let warp = "";
                            let args3 = [];
                            let compteur3 = false;
                            client.on('message', message => {
                                if(!message.author.bot && message.channel.id == '746484079138046052' && !compteur3){
                                    compteur3 = true;
                                    warp = message.content;
                                    titre3 = msg.embeds[0].titre;
                                    desc3 = msg.embeds[0].description;
                                    args3 = [titre3,desc3,msg.embeds[0].fields[0].value,msg.embeds[0].fields[1].value,msg.embeds[0].fields[2].value,warp];
                                    client.commands.get('modifDo').execute(msg, args3);
                                    message.delete();
                                    msg.delete();
                                }
                            });
                            break;
                                            // TITRE  -> description (#taverne) sans le "#"

                        default :
                            console.log('emoji non reconnu');
                        };
                    }
                });
            }
        });



client.on('error', console.error);

client.login(process.env.BOT_TOKEN);
//client.login(require("./config.json").BOT_TOKEN)
