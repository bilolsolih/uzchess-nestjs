import { Module } from '@nestjs/common';
import { BookCategoryAdminController } from './controllers/book-category/book-category.admin.controller';
import { BookCategoryAdminService } from './services/book-category/book-category-admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '@/features/library/entities/book.entity';
import { BookCategoryCreateHandler } from '@/features/library/handlers/book-category/book-category.create.handler';
import { BookCategoryRepository } from '@/features/library/repositories/book-category.repository';
import { BookCategoryGetAllHandler } from '@/features/library/handlers/book-category/book-category.get-all.handler';
import { BookCategory } from '@/features/library/entities/book-category.entity';
import { BookAdminService } from '@/features/library/services/book/book.admin.service';
import { BookPublicService } from '@/features/library/services/book/book.public.service';
import { BookPublicController } from '@/features/library/controllers/book/book.public.controller';
import { BookRepository } from '@/features/library/repositories/book.repository';
import { CommonModule } from '@/features/common/common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book, BookCategory]),
    CommonModule,
  ],
  controllers: [
    BookPublicController,
    BookCategoryAdminController,
  ],
  providers: [
    BookRepository,
    BookAdminService,
    BookPublicService,
    BookCategoryRepository,
    BookCategoryAdminService,
    BookCategoryCreateHandler,
    BookCategoryGetAllHandler],
  exports: [BookCategoryAdminService],
})
export class LibraryModule {
}
