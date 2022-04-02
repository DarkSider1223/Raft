
const { Message, Client } = require("discord.js");

mmodule.exports = {
    name: "ping",
    aliases: ['p'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
		let afk = client.get(`afk_${message.guild.id}_${message.author.id}`);

		if (afk) {
			client.set(`afk_${message.author.id}`, false);

			message.reply(`YOUR AFK HAS BEEN REMOVED`);
		} else {
			let reason = args.join('');
			if (!reason) reason = 'Not Provided';

			client.set(`op_${message.guild.id}_${message.author.id}`, reason);
			client.set(`afk_${message.guild.id}_${message.author.id}`, true);
			client.set(
				`date_${message.guild.id}_${message.author.id}`,
				Date.now()
			);

			message.member.setNickname(`▪AFK▪︎ ${message.member.username}`);

			message.reply(`YOU ARE NOW AFK - ${reason}`);
		}
	}
};