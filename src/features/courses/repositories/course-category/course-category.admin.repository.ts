import { Injectable } from '@nestjs/common';
import { CourseCategory } from '@/features/courses/entities/course-category.entity';
import { PaginationFilters } from '@/features/common/filters/pagination.filters';
import { ConfigService } from '@nestjs/config';
import { PaginatedResult } from '@/features/common/dtos/paginated-result.dto';

@Injectable()
export class CourseCategoryAdminRepository {
  constructor(private readonly config: ConfigService) {
  }

  async create(courseCategory: CourseCategory) {
    await CourseCategory.save(courseCategory);
    return courseCategory;
  }

  async getOneById(id: number) {
    return await CourseCategory.findOneBy({ id });
  }

  async getAll(filters: PaginationFilters) {
    const take = filters.size ?? this.config.getOrThrow<number>('DEFAULT_SIZE');
    const currentPage = filters.page ?? this.config.getOrThrow<number>('DEFAULT_PAGE');
    const skip = (currentPage - 1) * take;

    const totalCount = await CourseCategory.count();
    const totalPages = Math.ceil(totalCount / take);
    const previousPage = currentPage > 1 ? currentPage - 1 : null;
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;

    const data = await CourseCategory.find({ take: take, skip: skip });
    return { totalPages, totalCount, previousPage, currentPage, nextPage, data } as PaginatedResult;
  }

  async save(courseCategory: CourseCategory) {
    return await CourseCategory.save(courseCategory);
  }
}