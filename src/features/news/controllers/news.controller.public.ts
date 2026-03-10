import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import {NewsServiceAdmin} from '../services/news.service.admin';
import {ApiBearerAuth, ApiConsumes, ApiOkResponse, ApiTags} from '@nestjs/swagger';
import {NewsCreateDtoAdmin} from '../dtos/news/admin/news.create.dto.admin';
import {NewsListDtoAdmin} from '../dtos/news/admin/news.list.dto.admin';
import {NewsUpdateDtoAdmin} from '../dtos/news/admin/news.update.dto.admin';
import {NewsDetailDtoAdmin} from '../dtos/news/admin/news.detail.dto.admin';
import {Roles} from '../../../core/decorators/roles.decorator';
import {Role} from '../../../core/enums/role.enum';
import {FileInterceptor} from '@nestjs/platform-express';
import {NewsServicePublic} from '../services/news.service.public';
import {NewsListDtoPublic} from '../dtos/news/public/news.list.dto.public';
import {NewsDetailDtoPublic} from '../dtos/news/public/news.detail.dto.public';

@ApiTags("News - Public")
@Controller('public/news')
export class NewsControllerPublic {
  constructor(private readonly service: NewsServicePublic) {
  }
  @Get()
  @ApiOkResponse({type: () => NewsListDtoPublic, isArray: true})
  async findAll(): Promise<NewsListDtoPublic[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  @ApiOkResponse({type: () => NewsDetailDtoPublic, isArray: true})
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<NewsDetailDtoPublic> {
    return await this.service.findOne(id);
  }
}