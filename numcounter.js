const config = require("./config.json");
const Discord = require("discord.js")
//Export this file!
module.exports = client => {

    client.on("messageCreate", async (message) => {

        if(!message.guild || message.guild.available === false || message.author.bot) return;
        let { prefix } = config; 

        if(message.content.startsWith(prefix)){
            let args = message.content.slice(prefix.length).trim().split(" ");
            let cmd = args.shift()?.toLowerCase();

            if(cmd && cmd.length > 0){
                switch(cmd){

                    case "setup": {
                        
                        let channel = message.mentions.channels.first();
                        if(!channel) return message.reply(`Try this: \`${prefix}setup #Channel\``);

                        client.settings.set(message.guild.id, {
                            counter: channel.id, 
                            counternum: 0,
                            counterauthor: "",
                        })
                        message.reply("👍 **SUCCESSFULLY SETUP THE NUMBER COUNTER!**")
                    }break;
                }
            }
        }

        client.settings.ensure(message.guild.id, {
            counter: " ", 
            counternum: 0,
            counterauthor: "",
        })
        if(message.channel.id == client.settings.get(message.guild.id, "counter")){
            let count = client.settings.get(message.guild.id, "counternum") 
            let counterauthorId = client.settings.get(message.guild.id, "counterauthor") 
            if(isNaN(count)){
                client.settings.set(message.guild.id, 0, "counternum"); 
                count = 0;
            }

            if(message.author.id == counterauthorId){
                await message.reply(":clock1: **Please wait for your turn!**").then(msg=>{
                    setTimeout(()=>{
                        msg.delete().catch(() => {}); 
                    }, 3000 )
                })
                return message.delete().catch(() => {});
            }
           
            if(!message.content || isNaN(message.content)){
                await message.reply(":x: **Please only use a __real__ Number!**").then(msg=>{
                    setTimeout(()=>{
                        msg.delete().catch(() => {});
                    }, 3000 )
                })
                
                return message.delete().catch(() => {});
            }
        
            if(parseInt(message.content) !== count + 1){
                await message.reply(`:x: **This is not the right Number!** ||Tipp: \`${count}\` was it before...||`).then(msg=>{
                    setTimeout(()=>{
                        msg.delete().catch(() => {}); 
                    }, 3000 )
                })
                return message.delete().catch(() => {});
            }
            client.settings.inc(message.guild.id, "counternum"); 
            client.settings.set(message.guild.id, message.author.id, "counterauthor"); 

            message.react("👍").catch(() => {}); 
        }
    })
}