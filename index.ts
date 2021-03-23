import cluster from 'cluster';
import { cpus } from 'os';
import { startBot } from './src/bot';
import { Log } from './src/utils/logging';

(() => {
  if (cluster.isMaster) {
    startBot();
    for (let i = 0; i < cpus().length; i++) {
      cluster.fork();
    }
    cluster.on('online', (worker) => {
      Log(`Worker ${worker.id} is online.`)
    });
    cluster.on('exit', (worker) => {
      Log(`Worker ${worker.id} killed itself. Replacing with new worker...`);
      cluster.fork();
    });
    
    cluster.setupMaster({
      exec: './src/master',
      args: ['--use', 'http'],
      silent: true,
    })
    
  }
})();