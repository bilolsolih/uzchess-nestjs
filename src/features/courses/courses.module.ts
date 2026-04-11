import { Module } from '@nestjs/common';
import { CourseCategoryAdminService } from './services/course-category/course-category.admin.service';
import { CourseCategoryPublicService } from './services/course-category/course-category.public.service';
import { CourseCategoryAdminController } from './controllers/course-category/course-category.admin.controller';
import { CourseCategoryPublicController } from './controllers/course-category/course-category.public.controller';
import { CourseLikePublicService } from '@/features/courses/services/course-like/course-like.public.service';
import {
  CourseLikePublicController,
} from '@/features/courses/controllers/course-like/public/course-like.public.controller';
import { CourseAdminService } from '@/features/courses/services/course/course.admin.service';
import { CoursePublicService } from '@/features/courses/services/course/course.public.service';
import { CourseAdminController } from '@/features/courses/controllers/course/course.admin.controller';
import { CoursePublicController } from '@/features/courses/controllers/course/course.public.controller';


@Module({
  providers: [
    CourseCategoryAdminService,
    CourseCategoryPublicService,
    CourseAdminService,
    CoursePublicService,
    CourseLikePublicService,
  ],
  controllers: [
    CourseCategoryAdminController,
    CourseCategoryPublicController,
    CourseAdminController,
    CoursePublicController,
    CourseLikePublicController,
  ],
})
export class CoursesModule {
}
