import 'dotenv/config';
import { DataSource } from 'typeorm';


const AppDataSource = new DataSource({
  type: 'postgres',
  url: 'postgresql://postgres:123@localhost:5432/uzchess2',
  synchronize: false,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  migrationsRun: true,
  migrationsTableName: '',
});
export default AppDataSource;