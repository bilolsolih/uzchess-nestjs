import { Injectable, NotFoundException } from '@nestjs/common';

import { plainToInstance } from 'class-transformer';
import { Course } from '@/features/courses/entities/course.entity';
import { CourseListPublicDto } from '@/features/courses/dtos/course/public/course.list.public.dto';
import { CourseDetailPublicDto } from '@/features/courses/dtos/course/public/course.detail.public.dto';
import { ConfigService } from '@nestjs/config';
import { CoursePublicFilters } from '@/features/courses/filters/course.public.filters';
import { CoursePublicRepository } from '@/features/courses/repositories/courses/course.public.repository';


@Injectable()
export class CoursePublicService {
  constructor(
    private readonly config: ConfigService,
    private readonly repo: CoursePublicRepository,
  ) {
  }

  async getAll(filters: CoursePublicFilters) {
    const courses = await this.repo.getAll(filters);

    const baseUrl = this.config.getOrThrow<string>('BASE_URL');
    for (const course of courses.data) {
      if (course.image) {
        course.image = baseUrl + '/' + course.image;
      }

      if (course.difficulty && course.difficulty.icon) {
        course.difficulty.icon = baseUrl + '/' + course.difficulty.icon;
      }
    }

    courses.data = plainToInstance(CourseListPublicDto, courses.data, { excludeExtraneousValues: true });
    return courses;
  }

  async getOne(id: number) {
    const course = await Course.findOne({
      relations: ['author', 'category', 'language', 'difficulty'],
      where: { id: id },
    });

    if (!course) {
      throw new NotFoundException('Course with given id not found');
    }

    if (course.image) {
      course.image = this.config.getOrThrow<string>('BASE_URL') + '/' + course.image;
    }

    if (course.difficulty && course.difficulty.icon) {
      course.difficulty.icon = this.config.getOrThrow<string>('BASE_URL') + '/' + course.difficulty.icon;
    }

    return plainToInstance(CourseDetailPublicDto, course, { excludeExtraneousValues: true });
  }
}