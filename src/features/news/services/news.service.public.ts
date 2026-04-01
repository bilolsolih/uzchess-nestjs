import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { News } from '../entities/news.entity';
import { NewsListDtoPublic } from '../dtos/news/public/news.list.dto.public';
import { NewsDetailDtoPublic } from '../dtos/news/public/news.detail.dto.public';
import { NewsFilters } from '@/features/news/filters/news.filters';
import { FindOptionsWhere, ILike } from 'typeorm';

@Injectable()
export class NewsServicePublic {
  async getAll(filters: NewsFilters): Promise<NewsListDtoPublic[]> {
    let whereOptions: FindOptionsWhere<News> = {};
    if (filters.search) {
      whereOptions.title = ILike(`%${filters.search}%`);
    }
    let news = await News.find({ where: whereOptions });
    return plainToInstance(NewsListDtoPublic, news, { excludeExtraneousValues: true });
  }

  async getOne(id: number): Promise<NewsDetailDtoPublic> {
    let news = await News.findOneBy({ id });
    let data = plainToInstance(NewsDetailDtoPublic, news, { excludeExtraneousValues: true });
    return data;
  }
}