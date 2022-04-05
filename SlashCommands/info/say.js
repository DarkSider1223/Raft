// const { Client, CommandInteraction } = require("discord.js");
// const { SlashCommandBuilder } = require("@discordjs/builders")

// module.exports = {
//     name: "say",
//     description: "echo your message",
//     options: [
//         {
//             name: "message",
//             description: "message that you want to echo",
//             type: "STRING",
//             required: true,
//         },
//     ],
//     options: [
//         {
//             name: "target",
//             description: "messget to be sent to",
//             type: "USER",
//             required: false,
//         },
//     ],
    
//     /**
//      *
//      * @param {Client} client
//      * @param {CommandInteraction} interaction
//      * @param {String[]} args
//      */
//     run: async (client, interaction, args) => {
//         // const volumePercentage = interaction.options.getInteger("percentage");
//         const messageToSend = interaction.options.getString("message");
//         const user = interaction.options.getUser('target')
//         if (user) {
//             user.send({ content: messageToSend });
//             interaction.followUp({ content: `I sent the message to the ${user.tag}`})
//         } else {
//             interaction.followUp({ content: messageToSend})
//         }

//     },
// };