import { Injectable } from '@nestjs/common';

import { plainToInstance } from 'class-transformer';
import { Course } from '@/features/courses/entities/course.entity';
import { CourseListPublicDto } from '@/features/courses/dtos/course/public/course.list.public.dto';

@Injectable()
export class CoursePublicService {
  async getAll() {
    const courses = await Course.find({ relations: ['author', 'category', 'language', 'difficulty'] });
    return plainToInstance(CourseListPublicDto, courses);
  }
}