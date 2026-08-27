import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post, Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { NewsCreateDtoAdmin } from '@/features/news/presentation/dtos/news/admin/news.create.dto.admin';
import { NewsListDtoAdmin } from '@/features/news/presentation/dtos/news/admin/news.list.dto.admin';
import { NewsUpdateDtoAdmin } from '@/features/news/presentation/dtos/news/admin/news.update.dto.admin';
import { NewsDetailDtoAdmin } from '@/features/news/presentation/dtos/news/admin/news.detail.dto.admin';
import { Roles } from '@/core/decorators/roles.decorator';
import { Role } from '@/core/enums/role.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageOptions } from '@/configs/multer.configs';
import { NewsFilters } from '@/features/news/presentation/filters/news.filters';
import { NewsServiceAdmin } from '@/features/news/application/services/news/news.service.admin';

@Controller('admin/news')
@Roles(Role.Admin, Role.SuperAdmin)
@ApiTags('News - Admin')
@ApiBearerAuth()
export class NewsControllerAdmin {
  constructor(private readonly service: NewsServiceAdmin) {
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { storage: storageOptions }))
  async create(@Body() payload: NewsCreateDtoAdmin, @UploadedFile() image: Express.Multer.File) {
    return await this.service.create(payload, image);
  }

  @Get()
  @ApiOkResponse({ type: () => NewsListDtoAdmin, isArray: true })
  async getAll(@Query() filters: NewsFilters) {
    return await this.service.getAll(filters);
  }

  @Get(':id')
  @ApiOkResponse({ type: () => NewsDetailDtoAdmin })
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<NewsDetailDtoAdmin> {
    return await this.service.getOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() payload: NewsUpdateDtoAdmin) {
    return await this.service.update(id, payload);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.service.delete(id);
  }

}