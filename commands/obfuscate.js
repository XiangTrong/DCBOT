const UglifyJS = require('uglify-js');

module.exports = {
  config: {
    name: 'obfuscate',
    description: 'Obfuscate JavaScript code',
    usage: '.obfuscate [code]',
    example: '.obfuscate function add(a, b) { return a + b; }',
  },
  execute: async ({ api, event, args }) => {
    if (!args || args.length === 0) {
      api.sendMessage('Please provide JavaScript code to obfuscate.', event.threadID, event.messageID);
      return;
    }

    const codeToObfuscate = args.join(' ');

    try {
      const obfuscatedCode = UglifyJS.minify(codeToObfuscate).code;
      api.sendMessage(`Obfuscated code:\n\`\`\`${obfuscatedCode}\`\`\``, event.threadID, event.messageID);
    } catch (error) {
      console.error(error);
      api.sendMessage('An error occurred while obfuscating the code.', event.threadID, event.messageID);
    }
  },
};
