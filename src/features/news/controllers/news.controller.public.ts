import { Controller, Get, Param, ParseIntPipe, Req } from '@nestjs/common';
import type { Request } from 'express';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { NewsServicePublic } from '../services/news.service.public';
import { NewsListDtoPublic } from '../dtos/news/public/news.list.dto.public';
import { NewsDetailDtoPublic } from '../dtos/news/public/news.detail.dto.public';
import getFullPath from '../../../core/utils/get-full-path';

@ApiTags('News - Public')
@Controller('public/news')
export class NewsControllerPublic {
  constructor(private readonly service: NewsServicePublic) {}

  @Get()
  @ApiOkResponse({ type: () => NewsListDtoPublic, isArray: true })
  async findAll(@Req() req: Request): Promise<NewsListDtoPublic[]> {
    const news = await this.service.findAll();
    news.forEach((item) => (item.image = getFullPath(req, item.image)));
    return news;
  }

  @Get(':id')
  @ApiOkResponse({ type: () => NewsDetailDtoPublic, isArray: true })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<NewsDetailDtoPublic> {
    return await this.service.findOne(id);
  }
}
