const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

// This is another template for embed command!

module.exports = async (event, context) => {
if (event.content.startsWith(`${process.env.PREFIX}embed`)) { // The Command
await lib.discord.channels['@0.0.3'].messages.create({
      channel_id: `${event.channel_id}`,
      content: [
      `The response.` // The response 
    ].join('\n'),
    embed: {
      title: 'Title',
      type: 'rich',
      color: 0xFFFF00 , // Yellow Hex Code, Google 'Hex Codes' if you want to change this
      description: `The message
The message line 2`,  // You can make multiple lines like this!
      fields: [{
        name: 'Another Message In The Embed',
        value: [
          'Another value',
        ].join('\n')
      }]
    },
    tts: false // Keep this off if you dont want to make the discord read the message bot says. If you set it to true, Bot need 'Send TTS Messages' Perms. 
  });
}
}