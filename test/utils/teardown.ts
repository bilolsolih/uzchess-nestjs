import { INestApplication } from '@nestjs/common';
import { DataSource } from 'typeorm';
// e2e
// End to End
export async function teardownTestApp(app: INestApplication, dataSource: DataSource) {
  await dataSource.dropDatabase();
  await dataSource.destroy();
  await app.close();
}
