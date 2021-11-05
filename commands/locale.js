const i18n = require("../util/i18n");
const Connect = require("../util/database");

const connect = new Connect

module.exports = {
  name: "locale",
  description: i18n.__("locale.description"),
  async execute(message, args) {
    if (message.member.hasPermission("ADMINISTRATOR")) {
      const locales = ['en', 'pt_br']

      if (args.length === 0) return message.channel.send(i18n.__('locale.localeIsNull'))
      if (!locales.includes(args[0])) return message.channel.send(i18n.__('locale.invalidLocale'))


      if (await connect.insert(`${message.guild.id}_locale`, args[0])) {
        i18n.setLocale(args[0])
        return message.channel.send(i18n.__('locale.save'))
      }
        
      return message.channel.send(i18n.__('errors.oops'))
    }

    return message.channel.send(i18n.__("errors.onlyAdmin"))
  }
};
