module.exports = {
    name : "ping",
    description: "test",
    execute(message, args){
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`pong! ${timeTaken}ms`);

    },
};