exports.canModifyQueue = (member) => member.voice.channelID === member.guild.voice.channelID;

let config;

try {
  config = require("../config.json");
} catch (error) {
  config = null;
}

exports.TOKEN = config ? config.TOKEN : process.env.TOKEN;
exports.RANDOM_PHRASHES_API = config ? config.RANDOM_PHRASHES_API : process.env.RANDOM_PHRASHES_API;
exports.BOT_IMAGE = config ? config.BOT_IMAGE : process.env.BOT_IMAGE;
exports.WEBHOOKTOKEN = config ? config.WEBHOOKTOKEN : process.env.WEBHOOKTOKEN;
exports.WEBHOOKID = config ? config.WEBHOOKID : process.env.WEBHOOKID;
exports.BOTNAME = config ? config.BOTNAME : process.env.BOTNAME;
exports.PREFIX = (config ? config.PREFIX : process.env.PREFIX) || "/";
exports.LOCALE = (config ? config.LOCALE : process.env.LOCALE) || "en";

