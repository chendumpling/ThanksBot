const Discord = require('discord.js');
const ids = require(`../ids.json`);

function showForumCommands(prefix, msg){
    const embedMsg = new Discord.MessageEmbed()
	.setColor(ids.transparentColor) 
	.setTitle('Help Forum Commands')
    .setDescription(`Type \`${prefix}help c\` to commands for other channels`)
    .addField(`\`${prefix}q <your question>\``, 'Creates new thread to discuss your question', false)
    .addField(`\`${prefix}thanks <user>\``, 'Thanks a single user and gives them points', false)
    .addField(`\`${prefix}thanks <user1> <user2> <user3>\``, 'Thanks multiple users and gives them points', false)
    .addField(`\`${prefix}rankup\``, 'Ranks you up if you have enough points.', false)
    .addField(`\`${prefix}points\``, 'Shows how many points you have.', false)
    .addField(`\`${prefix}points <user>\``, 'Shows a user\'s points and amount needed for the next rank', false)
    .addField(`\`${prefix}about\``, 'Shows info about this bot', false);
    msg.channel.send({embeds: [embedMsg]});
}

function showWeeklyCommands(prefix, msg){
    const embedMsg = new Discord.MessageEmbed()
	.setColor(ids.transparentColor) 
	.setTitle('Weekly Submission Commands')
    .setDescription(`Type \`${prefix}help c\` to commands for other channels`)
    .addField(`\`${prefix}w submit <link/file>\``, 'Submit weekly', false)
    .addField(`\`${prefix}w info\``, 'Check deadline', false)
    .addField(`\`${prefix}w profile\``, 'View your profile', false)
    .addField(`\`${prefix}w profile <user>\``, 'View someone else\'s profile', false);
    msg.channel.send({embeds: [embedMsg]});
}

function showBotInfo(msg){
    const embedMsg = new Discord.MessageEmbed()
    .setColor(ids.transparentColor)
    .setTitle('Github Repository')
    .setURL('https://github.com/chendumpling/FretBot')
    .setDescription(ids.botName + ' "Fragile Remains of the Eternal ThankBot" is a multipurpose Javascript Discord bot whose purpose is to encourage discussion in a discord server by facilitating an organized environment and by managing databases to store and retrieve information.')
    .addField('Developer', 'Robert Chen', false);
    msg.channel.send({embeds: [embedMsg]});
}

function whichCommand(bot, prefix, msg){
    let weekly = bot.channels.cache.get(ids.weeklyChannel);
    let helpForum = bot.channels.cache.get(ids.helpForumChannel);
    const embedMsg = new Discord.MessageEmbed()
	.setColor(ids.incorrectUsageColor) 
	.setTitle('Commands')
    .addField(`\`${prefix}help f\``, `Shows commands for ${helpForum}`, false)
    .addField(`\`${prefix}help w\``, `Shows commands for ${weekly}`, false)
    .addField(`\`${prefix}help i\``, `Shows info about ${ids.botName}`, false)
    msg.channel.send({embeds: [embedMsg]});
}

module.exports = {
    name: 'help',
    description: "this command shows embeds for user commands",
    execute (bot, prefix, msg, args){

        // arg was passed
        if(args.length === 1){

            // -help f
            // -help forums
            // -help forum
            if(args[0] === "f" || args[0] === "forums" || args[0] === "forum"){
                showForumCommands(prefix, msg);
            }

            // -help w
            // -help weeklies
            // -help weekly
            if(args[0] === "w" || args[0] === "weeklies" || args[0] === "weekly"){
                showWeeklyCommands(prefix, msg);
            }

            // -help i
            // -help info
            if(args[0] === "i" || args[0] === "info"){
                showBotInfo(msg);
            }

            // -help c
            // -help commands
            if(args[0] === "c" || args[0] === "commands"){
                whichCommand(bot, prefix, msg);
            }
        }
        // -help (inside Help Forum)
        else if(msg.channel.id === ids.helpForumChannel){
            showForumCommands(prefix, msg);
        }
        // -help (inside Weekly Submissions)
        // -help (inside Help Forum)
        else if(msg.channel.id === ids.weeklyChannel){
            showWeeklyCommands(prefix, msg);
        }
        else {
            whichCommand(bot, prefix, msg);
        }
    }
}