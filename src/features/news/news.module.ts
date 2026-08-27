import { Module } from '@nestjs/common';
import { NewsServiceAdmin } from '@/features/news/application/services/news/news.service.admin';
import { NewsControllerAdmin } from '@/features/news/presentation/controllers/news.controller.admin';
import { NewsServicePublic } from '@/features/news/application/services/news/news.service.public';
import { NewsControllerPublic } from '@/features/news/presentation/controllers/news.controller.public';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from '@/features/news/data/entities/news.entity';
import { NewsRepository } from '@/features/news/data/repositories/news/news.repository';
import { INewsRepository } from '@/features/news/application/repositories/news.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([News])],
  providers: [
    NewsServiceAdmin,
    NewsServicePublic,
    { provide: INewsRepository, useClass: NewsRepository },
  ],
  controllers: [NewsControllerAdmin, NewsControllerPublic],
})
export class NewsModule {
}