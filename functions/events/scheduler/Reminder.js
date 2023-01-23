const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

// READ THIS PLEASE
// You can always change the time that you want to start it! 
// Just click on Scheduler - Once every x minutes and set it whenever your bot want to say it!
// Dont forget that this might finish your monthly limit fast!

await lib.discord.channels['@0.1.1'].messages.create({
  "channel_id": `841739714637594678`, // Put here the channel ID you want to
  "content": "",
  "tts": false,
  "components": [
    {
      "type": 1,
      "components": [
        {
          "style": 3,
          "label": "Yes, I already did!",
          "custom_id": "row_0_button_0",
          "disabled": false,
          "type": 2
        },
        {
          "style": 4,
          "label": "No, I don't feel like joining.",
          "custom_id": "row_0_button_1",
          "disabled": false,
          "type": 2
        }
      ]
    }
  ],
  "embed": {
    "type": "rich",
    "title": "Reminder",
    "description": "Hey everyone! Do not forget to join to the giveaway!",
    "color": 0x00FFFF
  }
});