const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'help',
  description: 'List available commands.',
  execute(message, args, client) {
    const prefix = '.'
    const commandList = [
      {
        name: 'ai',
        description: '.ai [question]',
      },
      {
        name: 'banner',
        description: 'it will display user Banner.',
      },
      {
        name: 'kpop',
        description: 'it Generates Kpop video.',
      },
      {
        name: 'pinterest',
        description: '.pinterest [keyword] - [usage]',
      },
      {
        name: 'header',
        description: '.header [url]',
      },
      {
        name: 'sim',
        description: '.sim [message]',
      },
    ];

    const helpEmbed = new MessageEmbed()
      .setTitle('Available Commands')
      .setThumbnail('https://media.discordapp.net/attachments/1119939924729282640/1122530940028207185/New_Project_4_Trim.gif')
      .setColor(0x7289DA) 
      //.setThumbnail(client.user.displayAvatarURL()) 
      .setFooter('Nudosontop!')
      .setTimestamp(); 

    
    commandList.forEach((command) => {
      helpEmbed.addField(`**${prefix}${command.name}**`, command.description);
    });

    message.channel.send({ embeds: [helpEmbed] });
  },
};
