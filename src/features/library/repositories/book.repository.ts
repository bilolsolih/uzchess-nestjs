import { Injectable } from '@nestjs/common';
import { Book } from '@/features/library/entities/book.entity';
import { ConfigService } from '@nestjs/config';
import { FindOptionsWhere, MoreThanOrEqual, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '@/core/repositories/base.repository';
import { BookFilters } from '@/features/library/filters/book.filters';
import { PaginatedResult } from '@/features/common/dtos/paginated-result.dto';

@Injectable()
export class BookRepository extends BaseRepository<Book> {
  constructor(
    protected config: ConfigService,
    @InjectRepository(Book)
    protected repo: Repository<Book>,
  ) {
    super();
  }

  async getAllWithLikes(userId: number, filters: BookFilters) {
    const take = filters.size ?? this.config.getOrThrow<number>('DEFAULT_SIZE');
    const currentPage = filters.page ?? this.config.getOrThrow<number>('DEFAULT_PAGE');
    const skip = (currentPage - 1) * take;

    const whereOptions: FindOptionsWhere<Book> = {};
    if (filters.categoryId)
      whereOptions.categoryId = filters.categoryId;

    if (filters.difficultyId)
      whereOptions.difficultyId = filters.difficultyId;

    if (filters.languageId)
      whereOptions.languageId = filters.languageId;

    if (filters.rating)
      whereOptions.rating = MoreThanOrEqual(filters.rating);

    const totalCount = await this.repo.count({ where: whereOptions });
    const totalPages = Math.ceil(totalCount / take);

    const previousPage = currentPage > 1 ? currentPage - 1 : null;
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;
    const data = await this.repo.createQueryBuilder('books')
      .leftJoinAndSelect('books.likes', 'l', 'l.userId = :userId', { userId })
      .where(whereOptions ? whereOptions as object : '')
      .skip(skip)
      .take(take)
      .getMany() as Book[];

    return { totalCount, totalPages, previousPage, currentPage, nextPage, data } as PaginatedResult;
  }
}