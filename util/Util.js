exports.canModifyQueue = (member) => member.voice.channelID === member.guild.voice.channelID;

let config;

try {
  config = require("../config.json");
} catch (error) {
  config = null;
}

exports.TOKEN = config ? config.TOKEN : process.env.TOKEN;
exports.PREFIX = (config ? config.PREFIX : process.env.PREFIX) || "/";
exports.LOCALE = (config ? config.LOCALE : process.env.LOCALE) || "en";
