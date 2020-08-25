require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const mongoose = require('mongoose');

const { saveSwear, sendHelp, getSwearInfo } = require('./functions');

//global mongo connection
mongoose.connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });
  mongoose.Promise = global.Promise;
  //const db = mongoose.connection;


client.login(process.env.DISCORD_TOKEN);

//begin discord client
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
   
client.on('message', async msg => {
    if (msg.author.bot) return;
    //tagged bot
    if(msg.content.includes('<@!745112015152087233>') && msg.content.toUpperCase().includes('/HELP')){
        console.log('/help')
        var helpMsg = await sendHelp();
        msg.reply(helpMsg);
    }
    else if(msg.content.includes('<@!745112015152087233>') && msg.content.toUpperCase().includes('/STATS')){
        console.log('/stats')
        var swearStats = await getSwearInfo(msg.author.id);
        var swearStatsRes = `\r\nTotal Swear Count: ${swearStats.totalSwearCount} \r\n`;
        if(swearStats.totalSwearCount <= 0){
            swearStatsRes += `You are such a saint, but I find this very unbelievable!`;
        }   
        else{
            swearStatsRes += `Your most commonly used swear word is ${swearStats.commonlyUsed}!\r\n`;
            swearStatsRes += `Watch your language!`;
        }
        msg.reply(swearStatsRes);
    }
    else if(msg.content.includes('<@!745112015152087233>')){
        console.log('not found')
        var helpMsg = await sendHelp();
        msg.reply("Command Not Found.  " + helpMsg);
    }
    else{
        //default
        console.log('default: save swear')
        saveSwear(msg);
    }
    
});
   
 
