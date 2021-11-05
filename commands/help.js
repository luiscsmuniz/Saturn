const { MessageEmbed } = require("discord.js");
const i18n = require("../util/i18n");
const Connect = require("../util/database");

const connect = new Connect

module.exports = {
  name: "help",
  aliases: ["h"],
  description: i18n.__("help.description"),
  async execute(message) {
    let commands = message.client.commands.array();
    let prefix = await connect.show(`${message.guild.id}_prefix`)

    console.log(commands)

    let helpEmbed = new MessageEmbed()
      .setTitle(i18n.__mf("help.embedTitle", { botname: message.client.user.username }))
      .setDescription(i18n.__("help.embedDescription"))
      .setColor("#F8AA2A");

    commands.forEach((cmd) => {
      helpEmbed.addField(
        `**${prefix || message.client.prefix}${cmd.name} ${cmd.aliases ? `(${cmd.aliases})` : ""}**`,
        `${i18n.__(`${cmd.name}.description`)}`,
        true
      );
    });

    helpEmbed.setTimestamp();

    return message.channel.send(helpEmbed).catch(console.error);
  }
};
