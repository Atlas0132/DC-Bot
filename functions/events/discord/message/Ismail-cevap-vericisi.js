// A Code That Responds When You Say That Word.
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let messageContent = [
  `Dilara aslında şirin bir ork <@!${context.params.event.author.id}>!`,
  '',
  ``,
  ''
];

// Only respond to messages containing the word "hi", "hey", "hello", or "sup"
if (context.params.event.content.match(/\bork\b/i)) { //The Word(s) you will add that which words will bot respond. 
  await lib.discord.channels['@0.0.6'].messages.create({ // Try changing the words!
    channel_id: context.params.event.channel_id,
    content: messageContent.join('\n'),
    message_reference: {
      message_id: context.params.event.id
    }
  });
}