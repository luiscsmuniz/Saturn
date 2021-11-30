const fetch = require('node-fetch')
const i18n = require("../util/i18n");
const { RANDOM_PHRASHES_API } = require("../util/Util");

module.exports = {
  name: "randomphrase",
  aliases: ["rp"],
  description: i18n.__("randomphrase.description"),
  async execute(message, args, client) {
    try {
      const person = message.guild.members.cache.random().user
      const user = args[0] && client.users.cache.has(args[0].substr(3).slice(0, -1)) ? args[0] : person.username

      const response = await fetch(`${RANDOM_PHRASHES_API}/random-phrase`)
      const data = await response.json()


      const sendMessage = await message.reply(data.phrase.replace(':user', user))

      if (data.phrase === 'VAI VAI MALVADÃO') {
        sendMessage.react('<a:wig1Jam:865604609569587210>')
      } else if (data.phrase === 'saúde nossa Santa Burrito!') {
        sendMessage.react('<:burrito:846508858067124235>')
      } else {
        sendMessage.react('✅')
        sendMessage.react('❌');
      }
      
      return
    } catch(e) {
      console.log(e)
      return message.channel.send(i18n.__('errors.oops'))
    }
  }
};
