/**
 * An HTTP endpoint that acts as a webhook for Discord command event
 * @param {object} event
 * @returns {any} result
 */
module.exports = async (event, context) => {

  // Random Message Sender
  const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});


  // To add more answers for your command, simply add them to this list!
  let messagePrompts = [
    `❗ 0,0,0,0 = 0`,
    `❗ 0,0,0,+ = +1`,
    `❗ 0,0,+,+ = +2`,
    `❗ 0,+,+,+ = +3`,
    `❗ +,+,+,+ = +4`,
    `❗ 0,0,0,- = -1`,
    `❗ 0,0,-,- = -2`,
    `❗ 0,-,-,- = -3`,
    `❗ -,-,-,- = -4`,
    `❗ -,-,-,+ = -2`,
    `❗ -,-,+,+ = 0`,
    `❗ -,+,+,+ = +2`,

  ];

 {
    let messageChoice = Math.floor(Math.random() * messagePrompts.length);
    let message = messagePrompts[messageChoice];

    await lib.discord.channels['@0.0.6'].messages.create({
      channel_id: `${context.params.event.channel_id}`,
      content: `${message}`
    });
  }

};
