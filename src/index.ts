import cluster from "cluster";
import { createServer } from "http";
import { router } from "./router/router";
import { balancer } from "./balancer/balancer";
import { getProcessStatus } from "./users/utils";
import "dotenv/config";

const DEFAULT_API_PORT = 4000;
const CLUSTER = "cluster";

const { CRUD_API_MODE } = process.env;
const PORT = Number(process.env.PORT || DEFAULT_API_PORT);

const isBalancer = CRUD_API_MODE === CLUSTER && cluster.isPrimary;
const processPort = Number(cluster.isPrimary ? PORT : process.env.workerPort);

export const server = createServer(
  isBalancer ? balancer(processPort) : router(processPort)
);

server.listen(processPort, () => {
  console.log(
    `${getProcessStatus()} #${process.pid} is running on port ${processPort}`
  );
});
