import { Controller, Get, Param, ParseIntPipe, Query, Req } from '@nestjs/common';
import type { Request } from 'express';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { NewsServicePublic } from '../services/news.service.public';
import { NewsListDtoPublic } from '../dtos/news/public/news.list.dto.public';
import { NewsDetailDtoPublic } from '../dtos/news/public/news.detail.dto.public';
import getFullPath from '@/core/utils/get-full-path';
import { NewsFilters } from '@/features/news/filters/news.filters';

@ApiTags('News - Public')
@Controller('public/news')
export class NewsControllerPublic {
  constructor(private readonly service: NewsServicePublic) {
  }

  @Get()
  @ApiOkResponse({ type: () => NewsListDtoPublic, isArray: true })
  async getAll(@Req() req: Request, @Query() filters: NewsFilters) {
    const news = await this.service.getAll(filters);
    news.forEach((item) => (item.image = getFullPath(req, item.image)));
    return news;
  }

  @Get(':id')
  @ApiOkResponse({ type: () => NewsDetailDtoPublic, isArray: true })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.getOne(id);
  }
}
