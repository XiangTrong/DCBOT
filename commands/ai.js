const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'gptgo',
  description: 'Generate an AI Response using GPTGO',
  async execute(message, args) {
    if (!args[0]) {
      return message.reply('Please provide a message to generate a response.');
    }

    const content = encodeURIComponent(args.join(' '));

    
    const processingEmbed = new MessageEmbed()
      .setDescription('Processing...')
      .setColor(0xffcc00); // Yellow color

    const processingMessage = await message.channel.send({ embeds: [processingEmbed] });

    try {
      const response = await axios.get(`${content}`);
      const respond = response.data.response;

      if (response.data.error) {
      
        const errorEmbed = new MessageEmbed()
          .setDescription(`Error: ${response.data.error}`)
          .setColor(0xff0000); 
        await processingMessage.edit({ embeds: [errorEmbed] });
      } else {
        
        const responseEmbed = new MessageEmbed()
          .setTitle('AI Response')
          .setDescription(respond)
          .setColor(0x7289DA); 
        

        await processingMessage.edit({ embeds: [responseEmbed] });
      }
    } catch (error) {
      console.error(error);

      
      const errorEmbed = new MessageEmbed()
        .setDescription('An error occurred while fetching the data.')
        .setColor(0xff0000); 

      await processingMessage.edit({ embeds: [errorEmbed] });
    }
  },
};
