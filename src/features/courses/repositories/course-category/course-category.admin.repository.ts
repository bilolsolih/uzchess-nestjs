import { Injectable } from '@nestjs/common';
import { CourseCategory } from '@/features/courses/entities/course-category.entity';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '@/core/repositories/base.repository';


@Injectable()
export class CourseCategoryAdminRepository extends BaseRepository<CourseCategory> {
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