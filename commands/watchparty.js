const fetch = require('node-fetch')
const i18n = require("../util/i18n");

const wpurl = "https://www.watchparty.me"

module.exports = {
  name: "watchparty",
  aliases: ["wp"],
  cooldown: 15,
  description: i18n.__("watchparty.description"),
  async execute(message, args, client) {
    try {
      const response = await fetch(`${wpurl}/createRoom`, {
        method: 'POST',
      })
      const data = await response.json()
      return message.channel.send(i18n.__mf('watchparty.room', { url: `${wpurl}/#${data.name}` })) 
    } catch(e) {
      console.log(e)
      return message.channel.send(i18n.__('errors.oops'))
    }
  }
};
