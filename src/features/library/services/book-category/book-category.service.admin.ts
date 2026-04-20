import { BookCategoryCreateDtoAdmin } from '../../dtos/book-category/admin/book-category.create.dto.admin';
import { BookCategory } from '../../entities/book-category.entity';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { BookCategoryUpdateDtoAdmin } from '../../dtos/book-category/admin/book-category.update.dto.admin';
import { Not } from 'typeorm';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { BookCategoryCreateCommand } from '@/features/library/commands/book-category/book-category-create.command';
import { PaginationFilters } from '@/features/common/filters/pagination.filters';
import { BookCategoryGetAllQuery } from '@/features/library/queries/book-category/book-category.get-all.query';

@Injectable()
export class BookCategoryServiceAdmin {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async create(payload: BookCategoryCreateDtoAdmin){
    return await this.commandBus.execute(new BookCategoryCreateCommand(payload));
  }

  async update(id: number, payload: BookCategoryUpdateDtoAdmin): Promise<BookCategory> {
    let bookCategory = await BookCategory.findOneBy({ id });
    if (!bookCategory) {
      throw new NotFoundException('Does not exist');
    }

    let alreadyExists = await BookCategory.countBy({ id: Not(id), title: payload.title });
    if (alreadyExists) {
      throw new BadRequestException('Already exists');
    }

    bookCategory.title = payload.title;
    await BookCategory.save(bookCategory);
    return bookCategory;
  }

  async getAll(filters: PaginationFilters){
    return await this.queryBus.execute(new BookCategoryGetAllQuery(filters));
  }

  async delete(id: number): Promise<undefined> {
    let bookCategory = await BookCategory.findOneBy({ id });
    if (!bookCategory) {
      throw new NotFoundException('Does not exist');
    }

    await BookCategory.remove(bookCategory);
  }
}
