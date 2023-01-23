const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
//create a database with the following columns (case sensitive):
//ID, Username, Level, Points. You can also refer to the googlesheets template:
//https://docs.google.com/spreadsheets/d/1MtxpE5nogVypBQy79iPQ2Y45Q_7thvvGP08dYeDUrYQ/template/preview
let database = await lib.googlesheets.query['@0.3.0'].select({
  range: `A:D`,
  bounds: 'FULL_RANGE',
  where: [
    {
      ID__icontains: `${context.params.event.author.id}`,
    },
  ],
  limit: {
    count: 0,
    offset: 0,
  },
});
let initialLevel = 0;
let points = 10;
let level = 0;
if (database.rows.length !== 0) {
  initialLevel = database.rows[0].fields['Level'];
  points = parseInt(database.rows[0].fields['Points']) + parseInt(10);
  level = Math.floor(points / 50);
}
let timeout = await lib.utils.kv['@0.1.16'].get({
  key: `timeout`,
  defaultValue: false,
});

let badWordList = process.env.UNWANTED_WORDS.split(', ').join('|');
let badWordsRegex = new RegExp(badWordList, 'gi');
let roleloc = null;
let roleid = null;
let role = null;
console.log(context.params.event.content.match(badWordsRegex));
if (!context.params.event.content.match(badWordsRegex)) {
  if (!timeout) {
    if (database.rows.length === 0) {
      await lib.googlesheets.query['@0.3.0'].insert({
        range: `A:D`,
        fieldsets: [
          {
            ID: `${context.params.event.author.id}`,
            Username: `${context.params.event.author.username}`,
            Level: `0`,
            Points: `10`,
          },
        ],
      });
    } else {
      await lib.googlesheets.query['@0.3.0'].update({
        spreadsheetId: process.env.SPREADSHEET_ID,
        range: `A:D`,
        bounds: 'FULL_RANGE',
        where: [
          {
            ID__icontains: `${context.params.event.author.id}`,
          },
        ],
        limit: {
          count: 0,
          offset: 0,
        },
        fields: {
          Username: `${context.params.event.author.username}`,
          Level: level,
          Points: points,
        },
      });
      if (level > initialLevel) {
        await lib.discord.channels['@0.1.0'].messages.create({
          channel_id: context.params.event.channel_id,
          content: `Seviye atladın sevimli şey seni: **${level}**`,
        });
      }
      await lib.utils.kv['@0.1.16'].set({
        key: `timeout`,
        value: true,
        ttl: 5,
      });
    }
  }
}
//if you would like, you can change the prefix of the following prefix command
if (context.params.event.content.startsWith('-level')) {
  if (database.rows.length === 0) {
    await lib.discord.channels['@0.1.1'].messages.create({
      channel_id: `${context.params.event.channel_id}`,
      content: '',
      tts: false,
      embed: {
        type: 'rich',
        title: `${context.params.event.author.username}#${context.params.event.author.discriminator}'s  Level:`,
        description: '',
        color: 0x9b21ff,
        fields: [
          {
            name: 'Level:',
            value: '0',
          },
          {
            name: 'Points:',
            value: '10',
          },
        ],
      },
    });
  } else {
    await lib.discord.channels['@0.1.1'].messages.create({
      channel_id: `${context.params.event.channel_id}`,
      content: '',
      tts: false,
      embed: {
        type: 'rich',
        title: `${context.params.event.author.username}#${context.params.event.author.discriminator}'s  Level:`,
        description: '',
        color: 0x9b21ff,
        fields: [
          {
            name: 'Level:',
            value: level,
          },
          {
            name: 'Points:',
            value: points,
          },
        ],
      },
    });
  }
}

//autorole part
let roles = process.env.LEVEL_ROLE_IDS.split(', ');
let lev10 = roles[0];
let lev25 = roles[1];
let lev50 = roles[2];
if (points === 500) {
  await lib.discord.guilds['@0.1.0'].members.roles.update({
    role_id: `${lev10}`,
    user_id: `${context.params.event.author.id}`,
    guild_id: `${context.params.event.guild_id}`,
  });
}
if (points === 1250) {
  await lib.discord.guilds['@0.1.0'].members.roles.update({
    role_id: `${lev25}`,
    user_id: `${context.params.event.author.id}`,
    guild_id: `${context.params.event.guild_id}`,
  });
}
if (points === 2500) {
  await lib.discord.guilds['@0.1.0'].members.roles.update({
    role_id: `${lev50}`,
    user_id: `${context.params.event.author.id}`,
    guild_id: `${context.params.event.guild_id}`,
  });
}
