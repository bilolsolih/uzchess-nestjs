import { Module } from '@nestjs/common';
import { CourseCategoryAdminService } from './services/course-category/course-category.admin.service';
import { CourseCategoryPublicService } from './services/course-category/course-category.public.service';
import { CourseCategoryAdminController } from './controllers/course-category/course-category.admin.controller';
import { CourseCategoryPublicController } from './controllers/course-category/course-category.public.controller';


@Module({
  providers: [
    CourseCategoryAdminService,
    CourseCategoryPublicService,
  ],
  controllers: [
    CourseCategoryAdminController,
    CourseCategoryPublicController,
  ],
})
export class CoursesModule {
}
