const axios = require("axios");

module.exports = {
  name: "sim",
  description: "Simsimi",
  execute(message, args) {
    try {
      let messageContent = args.join(" ");
      if (!messageContent) {
        return message.reply("Please provide a message.");
      }

      axios.get(`https://api.heckerman06.repl.co/api/other/simsimi?message=${encodeURIComponent(messageContent)}&lang=ph`)
        .then((response) => {
          const respond = response.data.message;
          message.channel.send(respond);
        })
        .catch((error) => {
          console.error("An error occurred:", error);
          message.reply("Oops! Something went wrong.");
        });
    } catch (error) {
      console.error("An error occurred:", error);
      message.reply("Oops! Something went wrong.");
    }
  },
};
