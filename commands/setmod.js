const i18n = require("../util/i18n");
const Connect = require("../util/database");

const connect = new Connect

module.exports = {
  name: "setmod",
  description: i18n.__("setmod.description"),
  async execute(message, args) {
    if (message.member.hasPermission("ADMINISTRATOR")) {
      if (args.length === 0) return message.channel.send(i18n.__('setmod.modIsNull'))

      const validRole = (id) => {
        role = message.guild.roles.cache.find(role => role.id === id)

        return !!role
      }

      mods = args.map(item => item.replace('<@&', '').replace('>', '')).filter(item => validRole(item))

      if (await connect.insert(`${message.guild.id}_mods`, mods)) return message.channel.send(i18n.__('setmod.save'))
        
      return message.channel.send(i18n.__('errors.oops'))
    }

    return message.channel.send(i18n.__("errors.onlyAdmin"))
  }
};
