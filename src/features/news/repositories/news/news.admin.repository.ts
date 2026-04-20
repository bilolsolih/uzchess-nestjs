import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { News } from '@/features/news/entities/news.entity';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NewsFilters } from '@/features/news/filters/news.filters';
import { BaseRepository } from '@/core/repositories/base.repository';

@Injectable()
export class NewsAdminRepository extends BaseRepository<News> {
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