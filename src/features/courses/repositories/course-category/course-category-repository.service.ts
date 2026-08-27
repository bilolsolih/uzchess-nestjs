import { Injectable } from '@nestjs/common';
import { CourseCategory } from '@/features/courses/entities/course-category.entity';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '@/core/repositories/base.repository';
import {
  ICourseCategoryRepository,
} from '@/features/courses/services/course-category/course-category.admin.service';


@Injectable()
export class CourseCategoryRepository extends BaseRepository<CourseCategory> implements ICourseCategoryRepository {
  constructor(
    protected readonly config: ConfigService,
    @InjectRepository(CourseCategory)
    protected readonly repo: Repository<CourseCategory>,
  ) {
    super();
  }

  async getOneById(id: number) {
    return await this.repo.findOneBy({ id });
  }
}