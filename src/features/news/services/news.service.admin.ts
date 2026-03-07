import {Injectable, NotFoundException} from '@nestjs/common';
import {plainToInstance} from 'class-transformer';
import {NewsCreateDtoAdmin} from '../dtos/news/admin/news.create.dto.admin';
import {News} from '../entities/news.entity';
import {NewsUpdateDtoAdmin} from '../dtos/news/admin/news.update.dto.admin';
import {NewsListDtoAdmin} from '../dtos/news/admin/news.list.dto.admin';

@Injectable()
export class NewsServiceAdmin {
  async create(payload: NewsCreateDtoAdmin): Promise<News> {
    let newNews = News.create(payload);
    await News.save(newNews);
    return newNews;
  }

  async update(id: number, payload: NewsUpdateDtoAdmin): Promise<News> {
    let news = await News.findOneBy({id});
    if (!news) {
      throw new NotFoundException('Does not exist');
    }

    Object.assign(
      news,
      Object.fromEntries(Object.entries(payload).filter(([key, value]) => value != null))
    )
    await News.save(news);
    return news;
  }

  async findAll(): Promise<NewsListDtoAdmin[]> {
    let news = await News.find();
    let data = plainToInstance(NewsListDtoAdmin, news, {excludeExtraneousValues: true});
    return data;
  }

  async delete(id: number): Promise<undefined> {
    let news = await News.findOneBy({id});
    if (!news) {
      throw new NotFoundException('Does not exist');
    }

    await News.remove(news);
  }
}