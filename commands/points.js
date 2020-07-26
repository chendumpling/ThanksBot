const Discord = require('discord.js');
const mongoose = require('mongoose');
const secrets = require(`../secrets.json`);
const pointsAdd = require("../models/addPoints.js");
mongoose.connect(secrets.Mongo, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

function howManyPoints(thisUser, cb) {

    pointsAdd.findOne({userid: thisUser}, (err, pointdata) => {
        if(err) 
            return cb(err, null);
        if(pointdata)
            return cb(null, pointdata.points);
        else
            return cb(null, null);
    })
}

module.exports = {
    name: 'points',
    description: "this command shows how many points a user has",
    execute (msg){

        //if command doesnt have any arguments "-points"
        howManyPoints(msg.author, (err, points) => {
            if(err)
                console.log(err);
            else if(points){
                const embedMsg = new Discord.MessageEmbed()
                .setColor('#36393F')
                .setDescription(`${msg.author}, you have **${(points)}** points.`);
                msg.channel.send(embedMsg);
            }
            else
                msg.channel.send(`${msg.author}, you do not have any points! Please contribute by answering questions to get started.`);
        })


        //if command has arguments "-points @user"

        //more than one argument (show correct usage)

        //Only one argument and it's a mention
            //Do stuff

    }
}