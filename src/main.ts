import { Client } from 'discord.js';
import { config } from 'dotenv';
import { Log } from './utils/logging';
import jwt from 'jsonwebtoken';

config({ path: '../.env' });

const client = new Client();

client.on('ready', () => {
  Log(`Minerva Captcha Bot is ready!`)
  Log(`Logged in as ${client.user?.username}${client.user?.discriminator} ID: ${client.user?.id}`);
  client.user?.setPresence({ activity: { type: 'WATCHING', name: 'Minerva Bot' } });
});

client.on('guildMemberAdd', (m) => {
  m.send(`Welcome to ${m.guild.name}, to verify, click on this link: \nhttps://${process.env.DOMAIN_NAME}/verify?session=${jwt.sign({ discordId: m.id, guild: m.guild.id }, process.env.SECRET as string)}`)
});

client.login(process.env.DISCORD_TOKEN as string);

export default client;