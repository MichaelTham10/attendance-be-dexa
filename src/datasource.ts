import { config } from 'dotenv';
config();

import { DataSource } from 'typeorm';
import { Attendance } from './entities/Attendance';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5433,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Attendance],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});