const i18n = require("../util/i18n");
const Discord = require("discord.js");
const { BOT_IMAGE } = require("../util/Util");
const Connect = require("../util/database");

const connect = new Connect

module.exports = {
  name: "raffle",
  description: i18n.__("raffle.description"),
  async execute(message, args) {
    mods = await connect.show(`${message.guild.id}_mods`) || []

    if (message.member.hasPermission("ADMINISTRATOR") || message.member.roles.cache.some(role => mods.includes(role.id))) {
    const time = args[0]
    const prize = args.filter(item => item != args[0]).join(' ')

    if (!time || !Number.isInteger(parseInt(time))) return message.channel.send(i18n.__("errors.invalidCommand"))

    if (!prize) return message.channel.send(i18n.__("raffle.prizeIsNull"))
  
    const helpEmbed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle(i18n.__("raffle.title"))
      .setURL('')
      .setDescription(i18n.__mf("raffle.embedDescription", { prize }))
      .setTimestamp()
      .setFooter(i18n.__mf("messages.expiresIn", { time, unitOfTime: i18n.__('unitOfTime.seconds')}), BOT_IMAGE)

    message.channel.send('@everyone')

    const giveAway = await message.channel.send(helpEmbed)

    giveAway.react('🎟️')

    setTimeout(async () => {
      await message.channel.send(i18n.__("raffle.expiredTime"))
      
      setTimeout(() => {
        if (giveAway.reactions.cache.get('🎟️').count < 2) return message.channel.send(i18n.__("raffle.noParticipantsFound"))
        let winner = giveAway.reactions.cache.get('🎟️').users.cache.random().id

        while(winner === giveAway.author.id) {
          winner = giveAway.reactions.cache.get('🎟️').users.cache.random().id
        }

        return message.channel.send(i18n.__mf("raffle.winner", { winner: `<@${winner}>` }))
      }, 1000)
    }, time*1000)

    return
  }
  
  return message.channel.send(i18n.__("errors.onlyMods"))
  }
};
