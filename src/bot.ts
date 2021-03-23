import { ShardingManager } from 'discord.js';
import { config } from 'dotenv';
import { Error, Log } from './utils/logging';

config({ path: '../.env' });

export const startBot = () => {
  const manager = new ShardingManager('./main', { respawn: true, token: process.env.DISCORD_TOKEN as string });
  manager.spawn();
  manager.on('shardCreate', (shard) => {
    Log(`Shard ${shard.id} created.`);
    shard.on('disconnect', () => {
      Log(`Shard ${shard.id} disconnected. Replacing with new shard...`);
      shard.respawn();
    });

    shard.on('error', (err) => {
      Error(`An expected error occurred from Shard ${shard.id} ! Error name: ${err.name}\nError Message: ${err.message}`)
    });
    
    shard.on('message', (m) => {
      Log(`Received a message from Shard ${shard.id}. Message: ${m}`);
    });
    
  })
}