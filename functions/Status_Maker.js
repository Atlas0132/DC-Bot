// How Does This Status Maker Work?
// You need to make your Status
// There Are 4 Statuses (Watching,Listening,Playing,Streaming) And 4 Personal Status (Do Not Disturb,Idle,Online,Invisible)
// At Invisible, bot will contiune working but will show offline.
// If you make it Streaming, you need to provide a URL so it can redirect to there.


const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

// Set a streaming status. If a twitch URL is provided it will show up as a button
await lib.discord.users['@0.1.0'].me.status.update({
  activity_name: `GUVENLIK`, // Activity name, REQUIRED
  activity_type: 'LISTENING', // Available Activity Types: Watching, Listening,Playing,Streaming.
  url: '', //Set this if you make activity type STREAMING
  status: 'DND', // Available Statuses: Do Not Disturb(Set To DND If you want to make this) , Idle, Online, Invisible.
});


// Fun Fact: This was a idea when I found library was TOO LAGGY so I made this!











                                                                                                            // After making your status, smash RUN button here.