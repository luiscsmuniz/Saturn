const i18n = require("../util/i18n");
const discordTTS = require('discord-tts');

module.exports = {
  name: "say",
  description: i18n.__("ping.description"),
  execute(message, args, client) {
    const broadcast = client.voice.createBroadcast();
    const channelId = message.member.voice.channelID;
    const channel = client.channels.cache.get(channelId);
    channel.join().then(connection => {
        broadcast.play(discordTTS.getVoiceStream(args.join(' ')));
        const dispatcher = connection.play(broadcast);
    });
  }
};
