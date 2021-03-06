const Discord = require("discord.js");
const util = require("../../util");
const { ping } = require("minecraft-protocol");

module.exports = {
  args: true,
  name: "checkip",
  aliases: ["checkserverip", "check"],
  description: "Checks if an Aternos-IP is free to use.",

  async execute(message, args, client) {
    function removeColorsFromString(text) {
      // Removing minecraft colors from strings, because console can`t read it and it will look crazy.
      return text.replace(/§./g, "");
    }

    let ip = args[0].match(/^(\w+)(?:\.aternos\.me)?$/i);
    if (!ip) {
      await message.reply(`\`${args}\` is not a valid Aternos server IP or name.`);
      return;
    }
    ip = ip[1];
    if (ip.length > 20) {
      await message.reply(`Aternos IPs can only be 20 characters long, please try a shorter one. Yours is ${ip.length-20} ${(ip.length-20) === 1 ? "character" : "characters"} too long.`);
      return;
    }

    const embed = new Discord.MessageEmbed()
    const test = await ping({ host: `${ip}.aternos.me` });
    if (test.version.name === "⚠ Error") {
      embed.setDescription(`**${ip}.aternos.me** is free to use!\nTo use it as your server address, head to **[the options of your server](https://aternos.org/options)**`)
      embed.setColor(util.color.green)
    } else {
      embed.setDescription(`It seems a server with the IP **${ip}.aternos.me** already exists!`)
      embed.setColor(util.color.red)
    }

    await message.reply({ embeds: [embed] });
  },
};
