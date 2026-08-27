import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CourseCategory } from '@/features/courses/entities/course-category.entity';
import {
  CourseCategoryCreateAdminDto,
  CourseCategoryListAdminDto,
  CourseCategoryUpdateAdminDto,
} from '@/features/courses/dtos/course-category';
import { plainToInstance } from 'class-transformer';
import { PaginationFilters } from '@/features/common/filters/pagination.filters';
import { PaginatedResult } from '@/features/common/dtos/paginated-result.dto';

export abstract class IBaseRepository {
  abstract save(entity: CourseCategory): Promise<CourseCategory>;

  abstract getAll(filters: PaginationFilters): Promise<PaginatedResult>;

  abstract delete(courseCategory: CourseCategory): Promise<void>;
}


export abstract class ICourseCategoryRepository extends IBaseRepository {
  abstract getOneById(id: number): Promise<CourseCategory | null>;
}


@Injectable()
export class CourseCategoryAdminService {
  constructor(private readonly repo: ICourseCategoryRepository) {
  }

  async create(payload: CourseCategoryCreateAdminDto) {
    const courseCategory = payload as CourseCategory;
    return await this.repo.save(courseCategory);
  }

  async updateOne(id: number, payload: CourseCategoryUpdateAdminDto) {
    const courseCategory = await this.repo.getOneById(id);
    if (!courseCategory) {
      throw new NotFoundException('CourseCategory with given id not found');
    }

    courseCategory.title = payload.title;
    return await this.repo.save(courseCategory);
  }

  async getAll(filters: PaginationFilters) {
    const result = await this.repo.getAll(filters);
    result.data = plainToInstance(CourseCategoryListAdminDto, result.data);
    return result;
  }

  async deleteOne(id: number) {
    const courseCategory = await this.repo.getOneById(id);
    if (!courseCategory) {
      throw new NotFoundException('CourseCategory with given id not found');
    }

    try {
      await this.repo.delete(courseCategory);
    } catch (exc) {
      throw new BadRequestException(`CourseCategory couldn't be deleted: ${exc}`);
    }
  }
}