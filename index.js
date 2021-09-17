// Require the necessary discord.js classes
const fs = require('fs');
const { Client, Collection, MessageEmbed } = require('discord.js');
const { token } = require('./config.json');

const prefix = '!';

// Create a new client instance
const client = new Client();

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log(`Ready! Logged in as ${client.user.tag}`);
});

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) {
    return;
  }

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'lilith') {
    client.commands.get('lilith').execute(message, args, MessageEmbed);
  } else if (command === 'p') {
    client.commands.get('p').execute(message, args);
  }
})

// Login to Discord with your client's token
client.login(token);