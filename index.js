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
    for(const channelId of Channels){
        joinChannel(channelId);
        //wait 500ms        
        await new Promise(res => setTimeout(() => res(2), 500))
    }

    function joinChannel(channelId) {
        client.channels.fetch(channelId).then(channel => {
            //JOIN THE VC AND PLAY AUDIO
            const VoiceConnection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator
            });
            //use a: direct mp3 link / file / const ytdl = require("ytdl-core"); ytdl("https://youtu.be/dQw4w9WgXcQ")
            const resource = createAudioResource(ytdl("https://www.youtube.com/watch?v=QnL5P0tFkwM", {
                filter: "audioonly",
                fmt: "mp3",
                encoderArgs: ['-af', 'bass=g=10']
            }), {
                inlineVolume: true
            });
            resource.volume.setVolume(0.2);
            const player = createAudioPlayer()
            VoiceConnection.subscribe(player);
            player.play(resource);
            player.on("idle", () => {
                try{
                    player.stop()
                } catch (e) { }
                try{
                    VoiceConnection.destroy()
                } catch (e) { }
                joinChannel(channel.id)
            })
        }).catch(console.error)
    }
    console.log(`Logged in ${client.user.tag}`)
    //import our number counter!
    require("./numcounter")(client); // we pass in the client!
})

client.on("voiceStateUpdate", async (oldState, newState) => {
    if(newState.channelId && newState.channel.type === "GUILD_STAGE_VOICE" && newState.guild.me.voice.suppress) {
        try{
            await newState.guild.me.voice.setSuppressed(false)
        }catch (e) {

        }
    }
})