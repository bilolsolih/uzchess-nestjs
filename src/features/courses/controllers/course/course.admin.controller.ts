import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
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
import { CurrentUser } from '@/core/decorators/current-user.decorator';
import type { JwtPayload } from '@/core/jwt-payload.interface';

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
  async getAll(@CurrentUser() user: JwtPayload) {
    return await this.service.getAll(user);
  }

  @Patch(':id')
  async updateOne(@Param('id', ParseIntPipe) id: number) {

  }
}