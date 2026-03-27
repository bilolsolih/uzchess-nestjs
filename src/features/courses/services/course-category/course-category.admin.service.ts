import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CourseCategory } from '@/features/courses/entities/course-category.entity';
import {
  CourseCategoryCreateAdminDto,
  CourseCategoryListAdminDto,
  CourseCategoryUpdateAdminDto,
} from '@/features/courses/dtos/course-category';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CourseCategoryAdminService {
  async create(payload: CourseCategoryCreateAdminDto) {
    const courseCategory = CourseCategory.create(payload as CourseCategory);
    await CourseCategory.save(courseCategory);
    return courseCategory;
  }

  async updateOne(id: number, payload: CourseCategoryUpdateAdminDto) {
    const courseCategory = await CourseCategory.findOneBy({ id });
    if (!courseCategory) {
      throw new NotFoundException('CourseCategory with given id not found');
    }

    courseCategory.title = payload.title;
    await CourseCategory.save(courseCategory);
    return courseCategory;
  }


  async getAll() {
    const courseCategories = await CourseCategory.find();
    return plainToInstance(CourseCategoryListAdminDto, courseCategories);
  }

  async deleteOne(id: number) {
    const courseCategory = await CourseCategory.findOneBy({ id });
    if (!courseCategory) {
      throw new NotFoundException('CourseCategory with given id not found');
    }

    try {
      await CourseCategory.remove(courseCategory);
    } catch (exc) {
      throw new BadRequestException(`CourseCategory couldn't be deleted: ${exc}`);
    }
  }
}