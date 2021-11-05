const i18n = require("../util/i18n");
const Discord = require("discord.js");

module.exports = {
  name: "avatar",
  description: i18n.__("avatar.description"),
  execute(message) {
    const user = message.mentions.users.first() || message.author

    const avatarEmbed = new Discord.MessageEmbed()
        .setColor(0x333333)
        .setImage(user.displayAvatarURL({ dynamic : true }));

    message.channel.send(avatarEmbed);
  }
};
