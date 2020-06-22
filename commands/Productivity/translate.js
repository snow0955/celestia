// The translate command uses the "@k3rn31p4nic/google-translate-api" module, 
// which is sourced from https://github.com/TheBastionBot/Bastion
// Credit to module owner: https://github.com/k3rn31p4nic

const Command = require('../../base/Command.js');
const { RichEmbed } = require('discord.js');
const translate = require('@k3rn31p4nic/google-translate-api');

class Translate extends Command {
  constructor(client) {
    super(client, {
      name: "translate",
      description: "Translates a specific text. A language (e.g. English, German, French, etc.) must be added to specify a language to translate to.",
      category: "Productivity",
      usage: "translate <Language> <Text>"
    });
  }

  async run(message, args, level, settings) {
    if (args.length < 2) {
      return message.reply("Command Usage: `translate <Language> <Text>`")
    }

    const result = await translate(args.slice(1).join(' '), { to: args[0] });

    const embed = new RichEmbed()
      .setColor('RANDOM')
      .setDescription(result.text)
      .setFooter(`Translation from ${result.from.language.iso.toUpperCase()} to ${args[0].toUpperCase()}`);
    message.channel.send({ embed });
  }
}

module.exports = Translate;