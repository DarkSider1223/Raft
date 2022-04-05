// const {
//     Message,
//     Client,
//     MessageEmbed,
//     MessageActionRow,
//     MessageSelectMenu,
//     CommandInteraction
// } = require("discord.js");


// module.exports = {
//     name: "help",
//     description:"lol",
//     type: 'CHAT_INPUT',
    
//     /**
//      *
//      * @param {Client} client
//      * @param {Message} message
//      * @param {CommandInteraction} interaction
//      * @param {String[]} args
//      */
//     run: async (client, message, interaction, args) => {
//         const emojis ={
//             info:'ℹ️',
//             moderation:'🔨',
//             test:'🧪',
//         }
//         const directories = [...new Set(client.commands.map(cmd => cmd.directory)), ];

//         const formatString = (str) => `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;

//         const categories = directories.map((dir) => {
//             const getCommands = client.commands.filter(
//                 (cmd) => cmd.directory === dir
//             ).map((cmd) => {
//                 return {
//                     name: cmd.name || 'There is no Name',
//                     description: cmd.description || 'There is no description for this command',
//                 }
//             })

//             return {
//                 directory: formatString(dir),
//                 commands: getCommands,
//             }
//         })

//         const embed = new MessageEmbed().setDescription(
//             "Please chosse a category in the dropdown menu"
//         );

//         const components = (state) => [
//             new MessageActionRow().addComponents(
//                 new MessageSelectMenu()
//                 .setCustomId("help-menu")
//                 .setPlaceholder('Please Select a category')
//                 .setDisabled(state)
//                 .addOptions(
//                     categories.map((cmd) => {
//                         return {
//                             label: cmd.directory,
//                             value: cmd.directory.toLowerCase(),
//                             description: `Commands from ${cmd.directory} category`,
//                             emoji: emojis[cmd.directory.toLowerCase()] || null
//                         }
//                     })
//                 )
//             )
//         ]

//         const initialMessage = await interaction.reply({
//             embeds: [embed],
//             components: components(false),
//         });

//         const filter = (interactions) => interactions.user.id === message.author.id;

//         const collector = interactions.channel.createMessageComponentCollector({
//             filter,
//             componentType: 'SELECT_MENU',
//             // time: 5000
//         })

//         collector.on('collect', (interactions) => {
//             const [
//                 directory
//              ] = interactions.values;
//             const category = categories.find(
//                 (x) => x.directory.toLowerCase() === directory
//             )

//             const categoryEmbed = new MessageEmbed()
//             .setTitle(
//                     `${directory} commands`
//                 )
//                 .setDescription("Here are the list of commands")
//                 .addFields(
//                     category.commands.map((cmd) => {
//                         return {
//                             name: `\`${cmd.name}\``,
//                             value: cmd.description,
//                             inline: true,
//                         }
//                     })
//                 )

//             interaction.update({
//                 embeds: [categoryEmbed]
//             })
//         })

//         collector.on("end", () => {
//             initialMessage.edit({
//                 components: components(true)
//             });
//         })
//     },


// };