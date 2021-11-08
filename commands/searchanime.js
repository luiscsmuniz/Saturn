const i18n = require("../util/i18n");
const { parse } = require ('node-html-parser');
const fetch = require('node-fetch')
const Discord = require("discord.js");
const { BOT_IMAGE } = require("../util/Util");

module.exports = {
  name: "searchanime",
  aliases: ["sa"],
  description: i18n.__("searchanime.description"),
  async execute(message, args) {
    const response = await fetch(`https://animesonline.org/?s=${args.join(' ')}`)

    const data = await response.text()

    const root = parse(data, {
      lowerCaseTagName: false,
      comment: false,
      blockTextElements: {
        script: false,
        noscript: true,
        style: true,	
        pre: true		
      }
    })

    const object = root.querySelectorAll('.details').filter((item, index) => index < 10).map((item, index) => {
      const divItems = parse(item.innerHTML)

      return {
        a: divItems.querySelector('a').rawAttributes,
        title: divItems.querySelector('a').text || '',
        imdb: divItems.querySelector('.rating') && divItems.querySelector('.rating').text ? divItems.querySelector('.rating').text : i18n.__('common.noInformation'),
        year: divItems.querySelector('.year').text || '',
        description: divItems.querySelector('p').text || '',
      }
    })

    if (object.length === 0) return message.channel.send(i18n.__('errors.oops'))

    const animeEmbed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle(i18n.__('searchanime.embedDescription'))
      .setURL('')
      .addFields(object.map((item, index) => ({
        name: `#${index + 1} - ${item.title}`,
        value: `
        url: ${item.a.href}
        IMDb: ${item.imdb}
        ${i18n.__('common.year')}: ${item.year}
        ${i18n.__('common.description')}: ${item.description}
        `,
      })))
      .setTimestamp()
      .setFooter(message.client.user.username, BOT_IMAGE);

    return message.channel.send(animeEmbed)
  }
};
