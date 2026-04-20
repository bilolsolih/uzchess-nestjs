import { Module } from '@nestjs/common';
import { NewsServiceAdmin } from './services/news/news.service.admin';
import { NewsControllerAdmin } from './controllers/news.controller.admin';
import { NewsServicePublic } from './services/news/news.service.public';
import { NewsControllerPublic } from './controllers/news.controller.public';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from '@/features/news/entities/news.entity';
import { NewsAdminRepository } from '@/features/news/repositories/news/news.admin.repository';

@Module({
  imports: [TypeOrmModule.forFeature([News])],
  providers: [
    NewsServiceAdmin,
    NewsServicePublic,
    NewsAdminRepository,
  ],
  controllers: [NewsControllerAdmin, NewsControllerPublic],
})
export class NewsModule {
}