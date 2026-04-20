import { Module } from '@nestjs/common';
import { BookCategoryControllerAdmin } from './controllers/book-category/book-category.controller.admin';
import { BookCategoryServiceAdmin } from './services/book-category/book-category.service.admin';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '@/features/library/entities/book.entity';
import { BookCategoryCreateHandler } from '@/features/library/handlers/book-category/book-category.create.handler';
import { BookCategoryRepository } from '@/features/library/repositories/book-category.repository';
import { BookCategoryGetAllHandler } from '@/features/library/handlers/book-category/book-category.get-all.handler';
import { BookCategory } from '@/features/library/entities/book-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, BookCategory])],
  controllers: [BookCategoryControllerAdmin],
  providers: [
    BookCategoryRepository,
    BookCategoryServiceAdmin,
    BookCategoryCreateHandler,
    BookCategoryGetAllHandler,  ],
  exports: [BookCategoryServiceAdmin],
})
export class LibraryModule {
}
