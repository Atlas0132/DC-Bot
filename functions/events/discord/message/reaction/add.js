// authenticates you with the API standard library
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let validMessage = '889015287922450482'; // Change this to match the message ID you want to track

let validRoles = {  // You can add more then 3 roles if needed, just copy one of the lines and edit as needed.
  '🎭': '889003121936834611',
  '🎮': '889002573296697354', 
  '🖥️': '889003567946551306', 
  '🍴': '889003692488007690',
  '🎨': '889003732153552987',
  '🎧': '889003771835863070',
  '🎤': '889003830266716220',
  '⚛️': '889003617447739393',
  '🛠️': '889004029701681172',
  '💉': '889004080339484672',
  '🎬': '889004147402235925',

};

let validRole = validRoles[context.params.event.emoji.name];

if (context.params.event.message_id === validMessage && validRole) { // This will check the role, then add it to the user.
  await lib.discord.guilds['@0.1.0'].members.roles.update({
    role_id: `${validRole}`,
    user_id: `${context.params.event.user_id}`,
    guild_id: `${context.params.event.guild_id}`
  });
}