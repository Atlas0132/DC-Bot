const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const axios = require('axios');

if (context.params.event.content.startsWith('tokat')) {
  const image = await axios('https://api.waifu.pics/sfw/slap').then((res) =>
    res.data ? res.data.url : null
  );

  if (!image)
    return lib.discord.channels['@0.2.0'].messages.create({
      content: `Oops sorry , something is wrong`,
      channel_id: context.params.event.channel_id,
    });

  await lib.discord.channels['@0.2.0'].messages.create({
    content: ``,
    channel_id: context.params.event.channel_id,
    embed: {
      image: {url: image},
      color: 0xffc0cb,
    },
  });
}
