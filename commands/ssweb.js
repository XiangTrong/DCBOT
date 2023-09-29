const axios = require('axios');
const fs = require('fs-extra');
const { MessageAttachment } = require('discord.js');

module.exports = {
  name: 'ssweb',
  description: 'Take a screenshot of a website and send it as an image or video.',
  usage: '<vid/img> <url>',
  cooldown: 5,
  args: true,
  execute(message, args) {
    const { threadID, messageID } = message;
    const [screenshotType, url] = args;

    if (!['vid', 'img'].includes(screenshotType) || !url) {
    return message.reply(`Wrong format!\n\nExample: ssweb <vid or img> <url>\nssweb vid github.com`);
    }

    const takeScreenshot = async () => {
      try {
        let response;
        let fileExtension;
        let path;

        if (screenshotType === 'vid') {
          response = await axios.get(`https://shot.screenshotapi.net/screenshot?token=SCAAVTH-AMKM99P-PD20T27-J3RG4FH&url=${url}&output=json&file_type=gif&wait_for_event=load&scrolling_screenshot=true`);
          fileExtension = 'mp4';
          path = `./commands/cache/web.${fileExtension}`;
        } else if (screenshotType === 'img') {
          response = await axios.get(`https://shot.screenshotapi.net/screenshot?token=SCAAVTH-AMKM99P-PD20T27-J3RG4FH&url=${url}`);
          fileExtension = 'png';
          path = `./commands/cache/web.${fileExtension}`;
        }

        const screenshotData = await axios.get(response.data.screenshot, { responseType: 'arraybuffer' });
        fs.writeFileSync(path, Buffer.from(screenshotData.data, 'utf-8'));

        message.channel.send({
          content: 'Success!',
          files: [new MessageAttachment(path)],
        });

        fs.unlinkSync(path);
      } catch (error) {
        console.error(error);
        message.reply('An error occurred while taking the screenshot. Please try again later.');
      }
    };

    takeScreenshot();
  },
};
