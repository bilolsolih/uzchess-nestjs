import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { News } from '@/features/news/data/entities/news.entity';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NewsFilters } from '@/features/news/presentation/filters/news.filters';
import { BaseRepository } from '@/core/repositories/base.repository';
import { INewsRepository } from '@/features/news/application/repositories/news.repository.interface';

@Injectable()
export class NewsRepository extends BaseRepository<News> implements INewsRepository{
  constructor(
    protected readonly config: ConfigService,
    @InjectRepository(News)
    protected readonly repo: Repository<News>,
  ) {
    super();
  }

  public async getAll(filters: NewsFilters) {
    const whereOptions: FindOptionsWhere<News> = {};

    if (filters.search) {
      whereOptions.title = ILike(`%${filters.search}%`);
    }
    return await super.getAll(filters, whereOptions);
  }
}