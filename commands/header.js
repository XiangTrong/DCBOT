const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'headers',
  description: 'Displays the headers of a web page, including P3P.',
  async execute(message, args) {
    // Check if the user provided a URL as an argument
    if (args.length === 0) {
      return message.reply('Please provide a URL to view the headers.');
    }

    const url = args[0];

    try {
      const response = await axios.head(url);
      const headers = response.headers;

     
      const embed = new MessageEmbed()
        .setTitle(`Headers for ${url}`)
        .setColor(0x7289DA); 

      
      const addHeaderField = (name) => {
        const value = headers[name.toLowerCase()];
        if (value !== undefined) {
          embed.addField(name, value);
        } else {
          embed.addField(name, 'Not found');
        }
      };

      addHeaderField('Content-Security-Policy');
      addHeaderField('Content-Type');
      addHeaderField('X-XSS-Protection');
      addHeaderField('X-Frame-Options');
      addHeaderField('Transfer-Encoding');
      addHeaderField('Expires');
      addHeaderField('Cache-Control');
      addHeaderField('Set-Cookie');
      addHeaderField('Alt-Svc');

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      message.reply('An error occurred while fetching the headers.');
    }
  },
};
