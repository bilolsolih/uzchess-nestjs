import { Controller, Get, Res } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CourseCategoryListPublicDto } from '@/features/courses/dtos/course-category';
import { CourseCategoryPublicService } from '../../services/course-category/course-category.public.service';
import type { Response } from 'express';

@ApiTags('CourseCategory - Public')
@Controller('public/course-category')
export class CourseCategoryPublicController {
  constructor(private service: CourseCategoryPublicService) {
  }

  @Get()
  @ApiOkResponse({ type: () => CourseCategoryListPublicDto, isArray: true })
  async getAll(@Res({passthrough: true}) res: Response) {
    return await this.service.getAll();

    // setTimeout(async () => {
    //   const data = await this.service.getAll();
    //   res.status(200).json(data);
    // }, 2000);
  }
}