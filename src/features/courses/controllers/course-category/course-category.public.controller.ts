import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CourseCategoryListPublicDto } from '@/features/courses/dtos/course-category';
import { CourseCategoryPublicService } from '../../services/course-category/course-category.public.service';

@ApiTags('CourseCategory - Public')
@Controller('public/course-category')
export class CourseCategoryPublicController {
  constructor(private service: CourseCategoryPublicService) {
  }

  @Get()
  @ApiOkResponse({ type: () => CourseCategoryListPublicDto, isArray: true })
  async getAll() {
    return await this.service.getAll();
  }
}