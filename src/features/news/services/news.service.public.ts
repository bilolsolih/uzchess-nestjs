import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { News } from '../entities/news.entity';
import { NewsListDtoPublic } from '../dtos/news/public/news.list.dto.public';
import { NewsDetailDtoPublic } from '../dtos/news/public/news.detail.dto.public';
import { NewsFilters } from '@/features/news/filters/news.filters';
import { FindOptionsWhere, ILike } from 'typeorm';
import { PaginatedResult } from '@/features/common/dtos/paginated-result.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NewsServicePublic {
  constructor(private readonly config: ConfigService) {
  }

  async getAll(filters: NewsFilters) {
    let whereOptions: FindOptionsWhere<News> = {};
    const take = filters.size ?? this.config.getOrThrow<number>('DEFAULT_SIZE');
    const currentPage = filters.page ?? this.config.getOrThrow<number>('DEFAULT_PAGE');
    const skip = (currentPage - 1) * take;

    if (filters.search) {
      whereOptions.title = ILike(`%${filters.search}%`);
    }

    const totalCount = await News.countBy(whereOptions);
    const totalPages = Math.ceil(totalCount / take);
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;

    let news = await News.find({ where: whereOptions, skip: skip, take: take });
    const data = plainToInstance(NewsListDtoPublic, news, { excludeExtraneousValues: true });
    return { totalPages, currentPage, nextPage, totalCount, data } as PaginatedResult;
  }

  async getOne(id: number) {
    let news = await News.findOneBy({ id });
    if (!news) {
      throw new NotFoundException();
    }
    if (news.image) {
      news.image = this.config.getOrThrow<string>('BASE_URL') + '/' + news.image;
    }
    let data = plainToInstance(NewsDetailDtoPublic, news, { excludeExtraneousValues: true });
    return data;
  }
}