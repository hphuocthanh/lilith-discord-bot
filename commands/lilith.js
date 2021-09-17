module.exports = {
	name: 'lilith',
  description: 'sends the github repo with embeds',
  execute(message, args, MessageEmbed) {
    const newEmbed = new MessageEmbed()
                            .setColor('blue')
                            .setTitle('About Lilith')
                            .setURL('https://github.com/hphuocthanh/music-discord-bot')
                            .setDescription('Lilith is still growing >.<')
                            // .addFields(
                            //   {name: 'Hi', value: 'be gentle to me'}
                            // )
                            .setImage('https://lh3.googleusercontent.com/pw/AM-JKLUoztCVZOT8q9KVk3cfrTei_zsRPvKgjZ5IXjd0xpIBMatGExMWJ114WQFTWbOu7ebDHCT1vdHZWSGEtD5CiFM_su1kTkfkVIzs9eYM1Kwj29FiLLJYRfDng2bbSKOR_mlV4aROwbuEySi_7eNweO7F=s240-no?authuser=0')
                            .setFooter('Please be gentle to me');
                            
    message.channel.send(newEmbed);
  }
};