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
import { jwtModuleConfig } from '@/configs/jwt-module.config';
import { JwtModule } from '@nestjs/jwt';
import { ChatModule } from '@/features/chat/chat.module';
import { ConfigModule } from '@nestjs/config';
import { configModuleOptions } from '@/configs/env.config';
import { CqrsModule } from '@nestjs/cqrs';
import { MatchesModule } from '@/features/matches/matches.module';
import { CacheModule } from '@nestjs/cache-manager';
import { ScheduleModule } from '@nestjs/schedule';
import { CronsService } from '@/features/common/services/crons.service';


@Module({
  providers: [
    { provide: APP_GUARD, useClass: AuthenticationGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    CronsService,
  ],
  imports: [
    ScheduleModule.forRoot(),
    CqrsModule.forRoot(),
    JwtModule.register(jwtModuleConfig),
    TypeOrmModule.forRoot(typeOrmConfig),
    ConfigModule.forRoot(configModuleOptions),
    CacheModule.register({
      isGlobal: true,
      ttl: 1000 * 60 * 5,
    }),
    AuthenticationModule,
    CoursesModule,
    LibraryModule,
    NewsModule,
    CommonModule,
    ChatModule,
    MatchesModule,
  ],
})
export class AppModule {
}
