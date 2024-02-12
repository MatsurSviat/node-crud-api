import { PORT, CLUSTER, CPUS, DB_PORT } from '@/config/server';

import { createServer, printStartMessage, printStartMessageChild } from '@/lib/server';
import { createSharedDBServer, printStartMessageDB } from '@/lib/db';
import { printColorMessage } from '@/lib/colors';
import cluster from 'cluster';
import { balancer, printBalancerMessage } from '@/lib/balancer';

if (!CLUSTER) {
  createSharedDBServer().listen(DB_PORT, () => printStartMessageDB(DB_PORT));
  createServer().listen(PORT, () => printStartMessage(PORT));
}

if (CLUSTER) {
  if (cluster.isPrimary) {
    createSharedDBServer().listen(DB_PORT, () => printStartMessageDB(DB_PORT));

    new Array(CPUS)
      .fill(0)
      .map((_, i) => i)
      .forEach((i) => {
        cluster.fork({ CHILD_PORT: PORT + 1 + i });
      });

    cluster.on('exit', (server) => {
      printColorMessage({ color: 'cyan', message: `Child server ${server.id} is finished` });
    });

    balancer(PORT, CPUS).listen(PORT, () => printBalancerMessage(PORT));
  }

  if (cluster.isWorker) {
    const childPort = Number(process.env.CHILD_PORT);
    createServer().listen(childPort, () => printStartMessageChild(childPort));
  }
}
