const ytdl = require('ytdl-core-discord');
const ytSearch = require('yt-search');

module.exports = {
  name: 'p',
  description: 'Joins and plays a video from youtube',
  async execute(message, args) {

    // check for requirements
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.channel.send('Join a voice channel and Lilith will come for you!');

    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT')) return message.channel.send('Please, no permissions no music');
    if (!permissions.has('SPEAK')) return message.channel.send('Please, no permissions no music');

    if (!args.length) return message.channel.send('Please give Lilith the video names or links \^o^/!');

    // start connecting
    const connection = await voiceChannel.join();

    const videoFinder = async (query) => {
      const videoResult = await ytSearch(query);

      return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
    }

    const video = await videoFinder(args.join(' '));

    if (video) {
      const stream = await ytdl(video.url);
      connection.play(stream, { type: 'opus' })
                .on('finish', () => {
                  console.log('finished');
                  voiceChannel.leave();
                });
      await message.reply(` ~ Now playing ***${video.title}*** ~`);
    } else {
      message.channel.send(`Oops! Lilith can't find the one you seek :(`);
    }
  }
}