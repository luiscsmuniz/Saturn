const express = require('express')
const bodyParser = require("body-parser")
const Discord = require("discord.js");
const { BOT_IMAGE, WEBHOOKID, WEBHOOKTOKEN, BOTNAME } = require('./util/Util')
const cron = require('node-cron');

const app = express()

app.use(express.static(__dirname + '/public'))

app.all('/', (req, res) => {
  res.send('BOT Ok')
})

app.use(bodyParser.json())

cron.schedule('30 8 * * *', () => {
  const goodMorning = [
    'Bom dia grupo <:wigRleule:876415513524318218>',
    'Bom dia! O sol já nasceu lá na fazendinha :sun_with_face: :cow:',
    '<a:bomdia:902498856678359040>',
    'Bom dia porra!!!',
  ]

  const webhookClient = new Discord.WebhookClient(WEBHOOKID, WEBHOOKTOKEN);

  webhookClient.send(goodMorning[Math.floor(Math.random()*goodMorning.length)], {
      username: BOTNAME,
      avatarURL: BOT_IMAGE,
    });
}, {
  scheduled: true,
  timezone: "America/Sao_Paulo"
});

function keepAlive() {
  app.listen(3000, () => {
    console.log("Server is ready.")
  })
}

module.exports = keepAlive