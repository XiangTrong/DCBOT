const { MessageAttachment, MessageEmbed } = require('discord.js');

module.exports = {
  name: 'banner',
  description: 'Display the user\'s banner',
  async execute(message, args) {
    let user;

    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else {
      user = message.author;
    }

    if (user.bot) {
      return message.reply('Bots do not have banners.');
    }

    try {
      await user.fetch();

      if (!user.bannerURL()) {
        return message.reply('I couldn\'t find a banner for this user.');
      }

      const bannerURL = user.bannerURL({ format: 'png', size: 4096 });

      const attachment = new MessageAttachment(bannerURL);

      const embed = new MessageEmbed()
        .setTitle(`${user.username}'s Banner`)
        .setColor(0x7289DA)
        .setDescription(`Here is the banner for ${user.username}:`)
        .setImage(`attachment://${user.id}.png`);

      message.channel.send({ embeds: [embed], files: [attachment] });
    } catch (error) {
      console.error(error);
      message.reply('There was an error while fetching the user\'s banner.');
    }
  },
};
