const axios = require('axios');
const fs = require('fs-extra');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'pinterest',
  description: 'Search for Pinterest images and send them to the channel.',
  async execute(message, args) {
    const input = args.join(' ');

    const match = input.match(/(.+) - (\d+)/);
    if (!match) {
      return message.reply('Please enter the search query in the format: `pinterest keyword - number`.');
    }

    const keySearchs = match[1].trim();
    const numberSearch = parseInt(match[2]) || 6;

    
    const processingEmbed = new MessageEmbed()
      .setDescription('Searching for Pinterest images...')
      .setColor(0xffcc00); // Yellow color

    const processingMessage = await message.channel.send({ embeds: [processingEmbed] });
    try {
      const res = await axios.get(`https://api-dien.kira1011.repl.co/pinterest?search=${encodeURIComponent(keySearchs)}`);
      const data = res.data.data;
      const imgData = [];

      for (let i = 0; i < numberSearch && i < data.length; i++) {
        const path = `./cache/${i + 1}.jpg`;
        const getDown = await axios.get(data[i], { responseType: 'arraybuffer' });
        fs.writeFileSync(path, Buffer.from(getDown.data, 'utf-8'));
        imgData.push(fs.createReadStream(path));
      }

      message.channel.send({
        files: imgData,
        content: `${numberSearch} Search results for keyword: ${keySearchs}`,
      });

      for (let i = 1; i <= numberSearch; i++) {
        fs.unlinkSync(`${i}.jpg`);
      }
    } catch (error) {
      console.error(error);
      processingMessage.delete();
      //message.reply('An error occurred while fetching Pinterest images.');
    }
  },
};
