import { Command } from '@nestjs/cqrs';
import { BookCategoryCreateDtoAdmin } from '@/features/library/dtos/book-category/admin/book-category.create.dto.admin';
import { BookCategory } from '@/features/library/entities/book-category.entity';

export class BookCategoryCreateCommand extends Command<BookCategory> {
  constructor(public readonly payload: BookCategoryCreateDtoAdmin) {
    super();
  }
}