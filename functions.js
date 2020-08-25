const { setSwear } = require('./mongo/setSwear');
const swearWords = require('./swearWords');
const { getSwear } = require('./mongo/getSwear');

async function mode(array)
{
    if(array.length == 0)
        return null;
    var modeMap = {};
    var maxEl = array[0], maxCount = 1;
    for(var i = 0; i < array.length; i++)
    {
        var el = array[i];
        if(modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;  
        if(modeMap[el] > maxCount)
        {
            maxEl = el;
            maxCount = modeMap[el];
        }
    }
    return maxEl;
}

const sendHelp = async () => {
    var helpInfo = "Please use the following commands: \r\n";
    helpInfo += "\r\n";
    helpInfo+= "/stats   -this will return your current swear stats \r\n";
    return helpInfo;
}

const saveSwear = async (msg) => {
    var msgArr = msg.content.toUpperCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g," ").split(" ");
    var swearObj = {
        _id: null,
        userId: msg.author.id,
        msg: msg.content,
        swearWords: [],
        swearCount: 0       
    };

    for(var word of msgArr){
        var found = swearWords.find(w => word.toUpperCase().includes(w.toUpperCase()))
        if(found){
            //msg.reply('awwwwww, you said a bad word!');
            swearObj.swearCount = swearObj.swearCount + 1;
            swearObj.swearWords.push(found);
        }
    }

    if (swearObj.swearCount > 0) {
        //msg.reply(`awwwwww, you said ${foundBadWord} bad word${(foundBadWord > 1) ? "s" : ""}!`);
        setSwear(swearObj);
    }
}

const getSwearInfo = async (userId) => {
    var userSwearDocs = await getSwear(userId);
    var wordArr = [];
    userSwearDocs.map(x => {
        wordArr = wordArr.concat(x.swearWords);
    });
var test = await mode(wordArr);
console.log(test)
    return {
        totalSwearCount: (userSwearDocs.length > 0) ? userSwearDocs.map(doc => doc.swearCount).reduce((prev, next) => prev + next) : 0,
        commonlyUsed: (userSwearDocs.length > 0) ? await mode(wordArr) : "none"
    };
}

module.exports = Object.assign({}, {saveSwear, sendHelp, getSwearInfo});