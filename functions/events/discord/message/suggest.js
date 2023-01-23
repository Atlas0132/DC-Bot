// A simple suggestion command!
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
let event = context.params.event
if (event.content.startsWith(`teklif`)) {
  let user = await lib.discord.users['@0.0.6'].retrieve({
    user_id: event.author.id,
  });
  let text = event.content.split(` `);
  let suggestion = text.slice(1).join(` `);
  if (!suggestion) {
    await lib.discord.channels['@0.1.0'].messages.create({
      channel_id: event.channel_id,
      content: `Ne teklif etmek istiyorsan teklif yazıp boşluk bırakıp yaz lütfen?`,
    });
  } else {
    await lib.discord.channels['@0.1.0'].messages.destroy({
      channel_id: event.channel_id,
      message_id: event.id,
    });
    let suggest = await lib.discord.channels['@0.1.0'].messages.create({
      channel_id: `915365946728783933`,
      content: ``,
      embed: {
        title: `${user.username} Teklif Ediyor:`,
        type: 'rich',
        color: 0x00aa00,
        description: suggestion,
      },
    });
    await lib.discord.channels['@0.1.0'].messages.reactions.create({
      emoji: '👍', // required
      message_id: suggest.id, // required
      channel_id: `915365946728783933`, // required
    });
    await lib.discord.channels['@0.1.0'].messages.reactions.create({
      emoji: '👎', // required
      message_id: suggest.id, // required
      channel_id: `915365946728783933`, // required
    });
  }
}