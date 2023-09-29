const axios = require('axios');
const fs = require('fs');
const { MessageAttachment } = require('discord.js');

module.exports = {
  name: 'ai',
  description: 'Generate text using GPT-4.',
  async execute(message, args) {
    const prompt = args.join(' ');

    const id = message.author.id;
    const name = message.author.username;
    const b = 'repl';

    const apikey = `&name=${name}&id=${id}`; // don't modify this, it's important for 50 requests per day per user

    try {
      const res = await axios.get(`https://api.whahhh.${b}.co/test?prompt=${prompt}${apikey}`);
      const m = res.data.result;
      const av = res.data.av;
      const array = [{ id: id, tag: name }];
      const g = m.replace(/{name}/g, name);

      if (av) {
        const response = await axios.get(av, { responseType: 'stream' });
        const extension = av.split('.').pop();
        const path = `./cache/image.${extension}`;
        const writer = fs.createWriteStream(path);

        response.data.pipe(writer);

        writer.on('finish', () => {
          const attachment = new MessageAttachment(fs.createReadStream(path));
          message.channel.send({
            content: g,
            mentions: {
              users: array
            },
            files: [attachment]
          }).then(() => fs.unlinkSync(path));
        });
      } else {
        message.channel.send({
          content: g,
          mentions: {
            users: array
          }
        });
      }
    } catch (error) {
      console.error(error);
      message.channel.send('An error occurred while processing your request.');
    }
  },
};
