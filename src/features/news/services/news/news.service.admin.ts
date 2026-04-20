import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { NewsCreateDtoAdmin } from '../../dtos/news/admin/news.create.dto.admin';
import { News } from '../../entities/news.entity';
import { NewsUpdateDtoAdmin } from '../../dtos/news/admin/news.update.dto.admin';
import { NewsListDtoAdmin } from '../../dtos/news/admin/news.list.dto.admin';
import { NewsDetailDtoAdmin } from '../../dtos/news/admin/news.detail.dto.admin';
import { NewsAdminRepository } from '@/features/news/repositories/news/news.admin.repository';
import { NewsFilters } from '@/features/news/filters/news.filters';

@Injectable()
export class NewsServiceAdmin {
  constructor(private readonly repo: NewsAdminRepository) {
  }

  async create(payload: NewsCreateDtoAdmin, image: Express.Multer.File) {
    let newNews = { ...payload, image: image.path } as News;
    return await this.repo.save(newNews);
  }

  async update(id: number, payload: NewsUpdateDtoAdmin) {
    let news = await this.repo.getOneById(id);
    if (!news) {
      throw new NotFoundException('Does not exist');
    }

    Object.assign(
      news,
      Object.fromEntries(Object.entries(payload).filter(([key, value]) => value != null)),
    );
    return await this.repo.save(news);
  }

  async getAll(filters: NewsFilters) {
    let news = await this.repo.getAll(filters);

    news.data = plainToInstance(NewsListDtoAdmin, news.data, { excludeExtraneousValues: true });
    return news;
  }

  async getOne(id: number) {
    let news = await this.repo.getOneById(id);
    if (!news) {
      throw new NotFoundException('News with given id not found');
    }
    return plainToInstance(NewsDetailDtoAdmin, news, { excludeExtraneousValues: true });
  }

  async delete(id: number) {
    let news = await this.repo.getOneById(id);
    if (!news) {
      throw new NotFoundException('Does not exist');
    }

    return await this.repo.delete(news);
  }
}