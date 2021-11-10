const i18n = require("../util/i18n");

module.exports = {
  name: "fireworks",
  cooldown: 10,
  aliases: ['fogos', 'fw'],
  description: i18n.__("fireworks.description"),
  execute(message) {
    message.channel.send("PAPAPUPU🎆🎇PAPUL🎆🎇🎇🎆FIIILLLPUUUUUPOWPOWPOWPOW🎇🎇🎇🎆🎆🎆PAPAPA🎇🎆🎇🎆🎇🎆🎇🎆🎇TATATATATAFIIIIILLLFIIIIILLLLFIIIIIIILLLPOOOWWWWWW🎇🎆🎇🎆🎇🎆🎇🎇🎆🎇🎆🎇🎆🎇🎆🎇PAPAPAPAPUPUPUPUPU🎉🎉🎉🎊🎊🎊🎉🎉🎉")
  }
};
