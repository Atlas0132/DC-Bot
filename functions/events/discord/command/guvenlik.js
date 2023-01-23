// A Kick Command
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

 {
  let mentions = context.params.event.mentions;
  let mention = mentions[0];
  let reason = context.params.event.content.split(' ').slice(2).join(" ")
  let canKick = false;
  let guild = await lib.discord.guilds['@0.1.0'].retrieve({
    guild_id: `${context.params.event.guild_id}`
  });
  
  if (guild.owner_id === context.params.event.author.id) {
    canKick = true;
  } else {
    let roles = await lib.discord.guilds['@0.1.0'].roles.list({
      guild_id: `${context.params.event.guild_id}`
    });
    
    roles = roles.filter((role) => {
      return context.params.event.member.roles.indexOf(role.id) > -1
    });
    
    for (let i = 0; i < roles.length ; i++) {
      let role = roles[i]
      canKick = (role.permissions & (1 << 3)) === (1 << 3) || 
                (role.permissions & (1 << 1)) === (1 << 1);
      
      if (canKick) {
        break;
      }
    }
  }
                // The messages 
  if (canKick) {
    try {
     let result = await lib.discord.guilds['@0.1.0'].members.destroy({
        user_id: `${mention.id}`,
        guild_id: `${context.params.event.guild_id}`,
      });
      
      let createdMessage = await lib.discord.channels['@0.1.0'].messages.create({
        channel_id: `${context.params.event.channel_id}`,
        "content": "",
          "tts": false,
          "embed": {
            "type": "rich",
            "title": "ಠ_ಠ BİZ BURADA DENSİZLERİ SEVMEYİZ",
            "description": "",
            "color": 0x00FFFF,
            "fields": [
              {
                "name": "\u200B",
                "value": `Kullanıcı: <@!${mention.id}> `
              },
              {
                "name": "\u200B",
                "value": `Her şey yolunda sayın balo sakinleri eğlencenize devam edebilirsiniz.`
              }
            ]
          }
      }); 
    } catch (e) {
      console.log(e)
      await lib.discord.channels['@0.1.0'].messages.create({
        channel_id: `${context.params.event.channel_id}`,
        content: `❌  I couldn't remove that user. Make sure I have perms or they are not the Owner.`,
      }); 
    }
  } else {
    await lib.discord.channels['@0.1.0'].messages.create({
      channel_id: `${context.params.event.channel_id}`,
      content: `❌  You cannot use this.`,
    });
  }
}