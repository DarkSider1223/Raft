const Discord = require("discord.js"); //discord.js v13
const { Client, Collection } = require("discord.js");
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require("@discordjs/voice");
const config = require(`./config.json`);
const ytdl = require("ytdl-core")

const Enmap = require("enmap");
// const client = new Discord.Client({
//     shards: "auto",
//     failIfNotExists: false, //add this for security!
//     allowedMentions: { parse: [ ], repliedUser: false },
//     intents: [ 
//         Discord.Intents.FLAGS.GUILDS,
//         Discord.Intents.FLAGS.GUILD_MEMBERS,
//         Discord.Intents.FLAGS.GUILD_MESSAGES,
//         Discord.Intents.FLAGS.GUILDS,
//         Discord.Intents.FLAGS.GUILD_VOICE_STATES
//     ],
// });

const client = new Client({
    intents: 32767,
});

module.exports = client;

client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");

require("./handler")(client);

const Channels = ["959489079341359128"];
client.settings = new Enmap({
    name: "NumberCounter",
});

client.login(process.env.token)

client.on("ready", async () => {
    console.log(`Logged in ${client.user.tag}`)
    //import our number counter!
    require("./numcounter")(client); // we pass in the client!
})

