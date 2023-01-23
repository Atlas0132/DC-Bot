// A Ban Command.

//READ THIS: THIS CODE GIVES AN ERROR BUT IT STILL WORKS
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

if (context.params.event.content.startsWith(`${process.env.PREFIX}ban`)) {
  let mentions = context.params.event.mentions;
  let mention = mentions[0];
  let reason = context.params.event.content.split(' ').slice(2).join(" ")
  let canban = false;
  let guild = await lib.discord.guilds['@0.1.0'].retrieve({
    guild_id: `${context.params.event.guild_id}`
  });
  
  if (guild.owner_id === context.params.event.author.id) {
    canban = true;
  } else {
    let roles = await lib.discord.guilds['@0.1.0'].roles.list({
      guild_id: `${context.params.event.guild_id}`
    });

    roles = roles.filter((role) => {
      return context.params.event.member.roles.indexOf(role.id) > -1
    });

    for (let i = 0; i < roles.length ; i++) {
      let role = roles[i]
      canban = (role.permissions & (1 << 3)) === (1 << 3) || 
                (role.permissions & (1 << 2)) === (1 << 2);

      if (canban) {
        break;
      }
    }
  }

  if (canban) {
    try { // The messages + Ban Commands
      let result = await lib.discord.guilds['@0.1.0'].bans.create({
        user_id: `${mention.id}`,
        guild_id: `${context.params.event.guild_id}`,
        delete_message_days: 7,
        reason: `🔨  Ban Hammer Has Spoken!`
        });
      
      let createdMessage = await lib.discord.channels['@0.1.0'].messages.create({
        channel_id: `${context.params.event.channel_id}`,
        "content": "",
        "tts": false,
        "embed": {
          "type": "rich",
          "title": "🔨 Ban Case",
          "description": "",
          "color": 0x00FFFF,
          "fields": [
            {
              "name": "\u200B",
              "value": `Member: <@!${mention.id}> `
            },
            {
              "name": "\u200B",
              "value": `Reason: **${reason}**`
            },
          ]
        }
      });
    } catch (e) {
      console.log(e);
      await lib.discord.channels['@0.1.0'].messages.create({
        channel_id: `${context.params.event.channel_id}`,
        content: `❌ Can't ban this user, make sure they are not the Owner or I have perms.`,
      }); 
    }
  } else {
    await lib.discord.channels['@0.1.0'].messages.create({
      channel_id: `${context.params.event.channel_id}`,
      content: `❌ You can't use this.`,
    });
  }
}$