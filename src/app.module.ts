import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/type-orm.config';
import { LibraryModule } from './features/library/library.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './core/guards/roles.guard';
import { AuthenticationModule } from './features/authentication/authentication.module';
import { AuthenticationGuard } from './core/guards/authentication.guard';
import { NewsModule } from './features/news/news.module';
import { CommonModule } from '@/features/common/common.module';
import { CoursesModule } from '@/features/courses/courses.module';

@Module({
  providers: [
    { provide: APP_GUARD, useClass: AuthenticationGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthenticationModule,
    CoursesModule,
    LibraryModule,
    NewsModule,
    CommonModule,
  ],
})
export class AppModule {
}
