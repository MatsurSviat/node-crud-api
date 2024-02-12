import 'dotenv/config';
import { cpus } from 'os';

export const PORT = Number(process.env.PORT) || 4000;
export const DB_PORT = Number(process.env.DB_PORT) || 3000;
export const CLUSTER = process.env.CLUSTER === 'multi';
export const CPUS = cpus().length - 1;
