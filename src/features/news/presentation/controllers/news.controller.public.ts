import { Controller, Get, Param, ParseIntPipe, Query, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { NewsDetailDtoPublic } from '@/features/news/presentation/dtos/news/public/news.detail.dto.public';
import getFullPath from '@/core/utils/get-full-path';
import { NewsFilters } from '@/features/news/presentation/filters/news.filters';
import { PaginatedResultDto } from '@/features/common/dtos/paginated-result.dto';
import { NewsListDtoPublic } from '@/features/news/presentation/dtos/news/public/news.list.dto.public';
import { NewsServicePublic } from '@/features/news/application/services/news/news.service.public';

@ApiTags('News - Public')
@Controller('public/news')
export class NewsControllerPublic {
  constructor(private readonly service: NewsServicePublic) {
  }

  @Get()
  @ApiOkResponse({ type: () => PaginatedResultDto(NewsListDtoPublic) })
  async getAll(@Req() req: Request, @Query() filters: NewsFilters) {
    const result = await this.service.getAll(filters);
    // @ts-ignore
    result.data.forEach((item) => (item.image = getFullPath(req, item.image)));
    return result;
    // setTimeout(() => res.json(result), 3000);
  }

  @Get(':id')
  @ApiOkResponse({ type: NewsDetailDtoPublic })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.getOne(id);
  }
}
