// Another Code, But Responds When You Mention It.

const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let messageResponse = await lib.discord.channels['@0.0.6'].messages.create({
  channel_id: `${context.params.event.channel_id}`,
  content: [
    `Hey <@!${context.params.event.author.id}>! Balo nasıl gidiyor?`,
    `Güvenliği çağırdın ama sanırım sana yardımcı olamam Atlas'a bir sor bakalım sana yardımcı olur mu?!`
  ].join('\n'),

});

return messageResponse;
