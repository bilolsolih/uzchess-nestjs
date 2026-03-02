import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/type-orm.config';
import { LibraryModule } from './features/library/library.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './core/guards/roles.guard';

@Module({
  providers: [{ provide: APP_GUARD, useClass: RolesGuard }],
  imports: [TypeOrmModule.forRoot(typeOrmConfig), LibraryModule],
})
export class AppModule {}
