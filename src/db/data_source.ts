import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { entities } from '../domains/entities';

dotenv.config();

export const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  // entities: [__dirname + '/../domains/entities/*.entity.{js,ts}'], // これだとエラーになる
  entities: entities,
  migrations: [__dirname + '/migrations/*.{js,ts}'],
  synchronize: false,
  logging: process.env.MYSQL_DATABASE === 'production' ? false : true,
});
