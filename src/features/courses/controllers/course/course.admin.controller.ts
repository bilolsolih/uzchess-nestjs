import type { Request } from 'express';

import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '@/core/decorators/roles.decorator';
import { Role } from '@/core/enums/role.enum';
import { CourseAdminService } from '@/features/courses/services/course/course.admin.service';
import { CourseCreateAdminDto } from '@/features/courses/dtos/course/admin/course.create.admin.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageOptions } from '@/configs/multer.configs';
import { CourseListAdminDto } from '@/features/courses/dtos/course/admin/course.list.admin.dto';

@ApiTags('Course - Admin')
@ApiBearerAuth()
@Controller('admin/course')
@Roles(Role.Admin, Role.SuperAdmin)
export class CourseAdminController {
  constructor(private readonly service: CourseAdminService) {
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { storage: storageOptions }))
  async create(@UploadedFile() image: Express.Multer.File, @Body() payload: CourseCreateAdminDto) {
    return await this.service.create(payload, image);
  }

  @Get()
  @ApiOkResponse({ type: () => CourseListAdminDto, isArray: true })
  async getAll(@Req() request: Request) {
    let userId = undefined;
    // @ts-ignore
    if (request.user) {
      // @ts-ignore
      userId = request.user.id;
    }
    return await this.service.getAll(userId);
  }

  @Patch(':id')
  async updateOne(@Param('id', ParseIntPipe) id: number) {

  }
}