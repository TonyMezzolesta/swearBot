require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

client.login(process.env.DISCORD_TOKEN);

//begin discord client
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
   
client.on('message', msg => {
if (msg.content === 'ping') {
    msg.reply('pong');
}
});
   
 