const i18n = require("../util/i18n");
const Connect = require("../util/database");

const connect = new Connect

module.exports = {
  name: "prefix",
  description: i18n.__("prefix.description"),
  async execute(message, args) {
    if (message.member.hasPermission("ADMINISTRATOR") || message.member.roles.cache.some(role => role.name === '⚔️Mod')) {
      if (!args[0]) return message.channel.send(i18n.__('prefix.prefixIsNull'))

      if (await connect.insert(`${message.guild.id}_prefix`, args[0])) return message.channel.send(i18n.__('prefix.save'))
        
      return message.channel.send(i18n.__('errors.oops'))
    }

    return message.channel.send(i18n.__("errors.onlyMods"))
  }
};
