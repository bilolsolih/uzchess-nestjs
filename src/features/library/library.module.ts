import { Module } from '@nestjs/common';
import { BookCategoryControllerAdmin } from './controllers/book-category/book-category.controller.admin';
import { BookCategoryServiceAdmin } from './services/book-category/book-category.service.admin';

@Module({
  controllers: [BookCategoryControllerAdmin],
  providers: [BookCategoryServiceAdmin],
  exports: [BookCategoryServiceAdmin],
})
export class LibraryModule {}
