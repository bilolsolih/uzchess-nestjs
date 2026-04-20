import { Injectable } from '@nestjs/common';
import { Course } from '@/features/courses/entities/course.entity';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '@/core/repositories/base.repository';

@Injectable()
export class CourseAdminRepository extends BaseRepository<Course> {
  constructor(
    protected readonly config: ConfigService,
    @InjectRepository(Course)
    protected readonly repo: Repository<Course>,
  ) {
    super();
  }
}