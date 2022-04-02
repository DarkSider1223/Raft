const Discord = require("discord.js"); //discord.js v13
const config = require(`./config.json`);

const Enmap = require("enmap");
const client = new Discord.Client({
    shards: "auto",
    failIfNotExists: false, //add this for security!
    allowedMentions: { parse: [ ], repliedUser: false },
    intents: [ 
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
    ],
});
client.settings = new Enmap({
    name: "NumberCounter",
});

client.login(process.env.token)

client.on("ready", () => {
    console.log(`Logged in ${client.user.tag}`)
    //import our number counter!
    require("./numcounter")(client); // we pass in the client!
})