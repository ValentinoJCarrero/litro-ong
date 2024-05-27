import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvconfig } from 'dotenv';
import { registerAs } from '@nestjs/config';

dotenvconfig({ path: '.env' });

const config = {
  type: 'postgres',
  database: `${process.env.DB_NAME}`,
  host: `${process.env.DB_HOST}`,
  port: parseInt(`${process.env.DB_PORT}`, 10),
  username: `${process.env.DB_USERNAME}`,
  password: `${process.env.DB_PASSWORD}`,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: true,
  logging: true,
  dropSchema: true,
  // ssl: process.env.SSL,
  timezone: 'America/Argentina/Cordoba',
};

export default registerAs(`dbConfig`, () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
