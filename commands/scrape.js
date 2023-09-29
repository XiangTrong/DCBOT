const axios = require('axios');
const fs = require('fs');
const { MessageAttachment } = require('discord.js');

module.exports = {
  name: 'scrape',
  description: 'Scrape HTML data from a website.',
  execute(message, args) {
    const apiKey = 'dc3fc7bc7dc540a7b1df7827fe205360';
    const url = args[0];

    if (!url) {
      return message.reply('Please provide a URL to scrape.');
    }

    const processingMessage = async () => {
      const processingGIFUrl = 'https://drive.google.com/uc?export=download&id=1Im1nktqQ59ErykI7Rg-01UpKm7E951NJ';
      const processingGIF = await axios.get(processingGIFUrl, { responseType: 'stream' });
      return message.reply({
        content: 'Processing your request. Scraping...',
        files: [new MessageAttachment(processingGIF.data, 'processing.gif')],
      });
    };

    processingMessage().then(async (msg) => {
      try {
        const response = await axios.get(`https://scrape.abstractapi.com/v1/?api_key=${apiKey}&url=${encodeURIComponent(url)}`);
        const { status, data } = response;

        if (status === 200) {
          const limitedResult = data.substring(0, 19000);
          const filename = 'scraped_data.txt';
          fs.writeFileSync(filename, data);

          msg.edit(`Here's the scraped data:\n\n${limitedResult}...\n\n𝗡𝗢𝗧𝗘: The scraped data is too long to send in a single message. The character limit for sending messages on Discord is 2000 characters.\n\nTo view the full result, please download the attached txt file.`, {
            files: [new MessageAttachment(filename)],
          });

          fs.unlinkSync(filename);
        } else {
          msg.edit('Failed to scrape the URL. Please check the URL or try again later.');
        }
      } catch (error) {
        console.error(error);
        msg.edit('An error occurred while scraping the URL. Please try again later.');
      }
    });
  },
};
