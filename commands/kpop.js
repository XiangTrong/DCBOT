const fs = require('fs');
const axios = require('axios');
const request = require('request');

module.exports = {
  name: 'kpop',
  description: 'Send a random video.',
  async execute(message) {
    const cacheDir = __dirname + '/cache';
    const videoFilePath = cacheDir + '/video.mp4';

    // Ensure the cache directory exists
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir);
    }

    axios
      .get('https://apivideo.saikidesu-support.repl.co/tiktok?apikey=opa')
      .then(async (res) => {
        const videoUrl = res.data.url;

        const callback = function () {
          message.reply('Sending random video...');
          message.channel.send({ files: [videoFilePath] });
        };

        request(videoUrl).pipe(fs.createWriteStream(videoFilePath)).on('close', callback);
      })
      .catch((error) => {
        console.error(error);
        message.reply('An error occurred while fetching the video.');
      });
  },
};

