const fetch = require('node-fetch')
const FormData = require('form-data');
const i18n = require("../util/i18n");
const { RANDOM_PHRASHES_API } = require("../util/Util");

module.exports = {
  name: "rpcreate",
  aliases: ["rpc"],
  description: i18n.__("rpcreate.description"),
  async execute(message, args, client) {
    if (message.member.hasPermission("ADMINISTRATOR") || message.member.roles.cache.some(role => mods.includes(role.id))) {
      if (args.length === 0) {
        return message.channel.send(i18n.__('rpcreate.phraseIsNull'))
      }

      formData = new FormData();
      formData.append('phrase', args.join(' '));
      formData.append('user', message.author.tag);

      const response = await fetch(`${process.env.RANDOM_PHRASES_API}/create-phrase`, {
        cache: "no-store",
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (data) {
        return message.channel.send(i18n.__('rpcreate.save'))
      }

      return message.channel.send(i18n.__('errors.oops'))
    }

    return message.channel.send(
      "",
    )
  }
};
