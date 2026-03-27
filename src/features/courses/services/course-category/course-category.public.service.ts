import { Injectable } from '@nestjs/common';
import { CourseCategory } from '@/features/courses/entities/course-category.entity';
import { CourseCategoryListPublicDto } from '@/features/courses/dtos/course-category';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CourseCategoryPublicService {
  async getAll() {
    const courseCategories = await CourseCategory.find();
    return plainToInstance(CourseCategoryListPublicDto, courseCategories);
  }
}