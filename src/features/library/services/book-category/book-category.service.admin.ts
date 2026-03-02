import { BookCategoryCreateDtoAdmin } from '../../dtos/book-category/admin/book-category.create.dto.admin';
import { BookCategory } from '../../entities/book-category.entity';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { BookCategoryUpdateDtoAdmin } from '../../dtos/book-category/admin/book-category.update.dto.admin';
import { Not } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { BookCategoryListDtoAdmin } from '../../dtos/book-category/admin/book-category.list.dto.admin';

@Injectable()
export class BookCategoryServiceAdmin {
  async create(payload: BookCategoryCreateDtoAdmin): Promise<BookCategory> {
    let alreadyExists = await BookCategory.countBy({ title: payload.title });
    if (alreadyExists) {
      throw new BadRequestException('Already exists');
    }

    let newBookCategory = BookCategory.create(payload as BookCategory);
    await BookCategory.save(newBookCategory);
    return newBookCategory;
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

  async findAll(): Promise<BookCategoryListDtoAdmin[]> {
    let bookCategories = await BookCategory.find();
    let data = plainToInstance(BookCategoryListDtoAdmin, bookCategories, { excludeExtraneousValues: true });
    return data;
  }

  async delete(id: number): Promise<undefined> {
    let bookCategory = await BookCategory.findOneBy({ id });
    if (!bookCategory) {
      throw new NotFoundException('Does not exist');
    }

    await BookCategory.remove(bookCategory);
  }
}
