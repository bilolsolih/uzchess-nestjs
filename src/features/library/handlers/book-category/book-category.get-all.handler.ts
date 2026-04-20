import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BookCategoryGetAllQuery } from '@/features/library/queries/book-category/book-category.get-all.query';
import { BookCategoryRepository } from '@/features/library/repositories/book-category.repository';

@QueryHandler(BookCategoryGetAllQuery)
export class BookCategoryGetAllHandler implements IQueryHandler<BookCategoryGetAllQuery> {
  constructor(private readonly repo: BookCategoryRepository) {
  }

  async execute(query: BookCategoryGetAllQuery) {
    return await this.repo.getAll(query.filters);
  }
}