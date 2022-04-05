const { Client, CommandInteraction } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    ...new SlashCommandBuilder()
    .setName('echo')
    .setDescription("echo your message")
    .addStringOption((option) => option
    .setName('message')
    .setDescription("message that you want to echo")
    .setRequired(true)
    )
    .addUserOption((option) => option 
    .setName("target")
    .setDescription("messget to be sent to")
    .setRequired(false)
    ),
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const messageToSend = interaction.options.getString("message");
        const user = interaction.options.getUser('target')
        if (user) {
            user.send({ content: messageToSend });
            interaction.followUp({ content: `I sent the message to the ${user.tag}`})
        } else {
            interaction.followUp({ content: messageToSend})
        }

    },
};