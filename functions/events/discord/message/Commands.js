//Bunch Of Premade Commands That You Can Edit Later.
// Note: If you delete the ${process.env.PREFIX} you wont be able to change the prefix manually, you have to edit them 1 by 1.
// READ THIS PLEASE: NOT EVERY ERROR WILL MAKE BROKE YOUR CODE, SO DO NOT TRY TO FIX EVERY CODE PLEASE. LIKE AT THIS CODE IT WILL DEFINITELY GIVE AN ERROR SAYING MISSING ACCESS, BUT IT WILL STILL WORK.
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN}); 

module.exports = async (event, context) => {
  
let guild = await lib.discord.guilds['@0.0.2'].retrieve({
  guild_id: context.params.event.guild_id,
  with_counts: true
});

let message = context.params.event.content;

if (message.startsWith(`${process.env.PREFIX}help`)) {    //A Premade Help Command
  await lib.discord.channels['@0.0.6'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `Hello <@!${context.params.event.author.id}>! 
Welcome To **${guild.name}** and there are **${guild.approximate_member_count}** people!
*You can edit this as much as you want*`
  });
}

if (message.startsWith(`${process.env.PREFIX}command1`)) { //The Command
  await lib.discord.channels['@0.0.6'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `response 1` //The Response
  });
}

if (message.startsWith(`${process.env.PREFIX}command2`)) {
  await lib.discord.channels['@0.0.6'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `response 2
    Multi laned response, can put infinity sentences like THIS`
  });
}

if (message.startsWith(`${process.env.PREFIX}command3`)) {
  await lib.discord.channels['@0.0.6'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `response 3`
  });
}

if (message.startsWith(`${process.env.PREFIX}command4`)) {
  await lib.discord.channels['@0.0.6'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `response 4`
  });
}
}