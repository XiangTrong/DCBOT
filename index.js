const { Client, Intents } = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const TOKEN = '';
const PREFIX = '.';

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith(PREFIX)) {
    const [commandName, ...args] = message.content.slice(PREFIX.length).trim().split(/\s+/);

    console.log(`\x1b[36m[Command Received]\x1b[0m: ${PREFIX}${commandName}`);
    
    const commandPath = path.join(__dirname, 'commands', `${commandName}.js`);
    if (fs.existsSync(commandPath)) {
      try {
        const command = require(commandPath);
        await command.execute(message, args);
      } catch (error) {
        console.error(error);
        message.reply('An error occurred while executing the command.');
      }
    } else {
      message.reply('Command not found.');
    }
  }
});

client.login(TOKEN);
