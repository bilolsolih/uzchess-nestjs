import { Injectable, NotFoundException } from '@nestjs/common';
import { BookFilters } from '@/features/library/filters/book.filters';
import { BookRepository } from '@/features/library/repositories/book.repository';
import { plainToInstance } from 'class-transformer';
import { BookListAdminDto } from '@/features/library/dtos/book/admin/book.list.admin.dto';
import { BookCreateAdminDto } from '@/features/library/dtos/book/admin/book.create.admin.dto';
import { Book } from '@/features/library/entities/book.entity';
import { AuthorRepository } from '@/features/common/repositories/author.repository';
import { DifficultyRepository } from '@/features/common/repositories/difficulty.repository';
import { LanguageRepository } from '@/features/common/repositories/language.repository';
import { BookCategoryRepository } from '@/features/library/repositories/book-category.repository';
import { BookDetailAdminDto } from '@/features/library/dtos/book/admin/book.detail.admin.dto';

@Injectable()
export class BookAdminService {
  constructor(
    private readonly repo: BookRepository,
    private readonly authorRepo: AuthorRepository,
    private readonly bookCategoryRepo: BookCategoryRepository,
    private readonly difficultyRepo: DifficultyRepository,
    private readonly languageRepo: LanguageRepository,
  ) {
  }

  async create(payload: BookCreateAdminDto, image?: Express.Multer.File) {
    const newBook = payload as Book;

    try {
      const bookCategoryExists = await this.bookCategoryRepo.getOneById(newBook.categoryId);
      if (!bookCategoryExists) {
        throw new NotFoundException('BookCategory with given id not found');
      }

      const authorExists = await this.authorRepo.getOneById(newBook.authorId);
      if (!authorExists) {
        throw new NotFoundException('Author with given id not found');
      }

      const difficultyExists = await this.difficultyRepo.getOneById(newBook.difficultyId);
      if (!difficultyExists) {
        throw new NotFoundException('Difficulty with given id not found');
      }

      const languageExists = await this.languageRepo.getOneById(payload.languageId);
      if (!languageExists) {
        throw new NotFoundException('Language with given id not found');
      }

      // TODO: if book creation fails, the image, which is already created and saved in uploads folder must be removed
      // TODO: need to wrap with a transaction
      if (image) {
        newBook.image = image.path;
      }

      return await this.repo.save(newBook);
    } catch (exc) {
      console.log('Something really bad happened');
      throw exc;
    }
  }

  async getAll(filters: BookFilters) {
    const result = await this.repo.getAll(filters);
    result.data = plainToInstance(BookListAdminDto, result.data, { excludeExtraneousValues: true });
    return result;
  }

  async getOne(id: number) {
    const book = await this.repo.getOneById(id);
    if (!book) {
      throw new NotFoundException('Book with given id not found');
    }

    return plainToInstance(BookDetailAdminDto, book, { excludeExtraneousValues: true });
  }

  async delete(id: number) {
    const book = await this.repo.getOneById(id);
    if (!book) {
      throw new NotFoundException('Book with given id not found');
    }

    return await this.repo.delete(book);
  }
}