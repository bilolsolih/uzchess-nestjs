import {Injectable} from '@nestjs/common';
import {plainToInstance} from 'class-transformer';
import {News} from '../entities/news.entity';
import {NewsListDtoPublic} from '../dtos/news/public/news.list.dto.public';
import {NewsDetailDtoPublic} from '../dtos/news/public/news.detail.dto.public';
import getFullPath from '../../../core/utils/get-full-path';

@Injectable()
export class NewsServicePublic {
  async findAll(): Promise<NewsListDtoPublic[]> {
    let news = await News.find();
    let data = plainToInstance(NewsListDtoPublic, news, {excludeExtraneousValues: true});
    return data;
  }

  async findOne(id: number): Promise<NewsDetailDtoPublic> {
    let news = await News.findOneBy({id});
    let data = plainToInstance(NewsDetailDtoPublic, news, {excludeExtraneousValues: true});
    return data;
  }
}