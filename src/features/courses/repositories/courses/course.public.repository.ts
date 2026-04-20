import { Injectable } from '@nestjs/common';

import { Course } from '@/features/courses/entities/course.entity';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CoursePublicFilters } from '@/features/courses/filters/course.public.filters';
import { BaseRepository } from '@/core/repositories/base.repository';

@Injectable()
export class CoursePublicRepository extends BaseRepository<Course> {
  constructor(
    protected readonly config: ConfigService,
    @InjectRepository(Course)
    protected readonly repo: Repository<Course>,
  ) {
    super();
  }

  async getAll(filters: CoursePublicFilters) {
    const whereOptions: FindOptionsWhere<Course> = {};
    if (filters.search) {
      whereOptions.title = ILike(`%${filters.search}%`);
    }

    return await super.getAll(filters, whereOptions);
  }
}