import { Injectable, NotFoundException } from '@nestjs/common';
import { BookFilters } from '@/features/library/filters/book.filters';
import { BookRepository } from '@/features/library/repositories/book.repository';
import { plainToInstance } from 'class-transformer';
import { BookListAdminDto } from '@/features/library/dtos/book/admin/book.list.admin.dto';
import { BookDetailAdminDto } from '@/features/library/dtos/book/admin/book.detail.admin.dto';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '@/core/jwt-payload.interface';

@Injectable()
export class BookPublicService {
  constructor(
    private readonly repo: BookRepository,
    private readonly config: ConfigService,
  ) {
  }


  async getAll(filters: BookFilters, user: JwtPayload) {
    const result = user ? await this.repo.getAllWithLikes(user.id, filters) : await this.repo.getAll(filters);
    for (const book of result.data) {
      if (book.image)
        book.image = this.config.getOrThrow<string>('BASE_URL') + '/' + book.image;
    }
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
}