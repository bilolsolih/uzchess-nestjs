import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BookCategoryCreateCommand } from '@/features/library/commands/book-category/book-category-create.command';
import { BookCategoryRepository } from '@/features/library/repositories/book-category.repository';
import { BookCategory } from '@/features/library/entities/book-category.entity';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(BookCategoryCreateCommand)
export class BookCategoryCreateHandler implements ICommandHandler<BookCategoryCreateCommand> {
  constructor(private readonly repo: BookCategoryRepository) {
  }

  async execute(command: BookCategoryCreateCommand) {
    let alreadyExists = await this.repo.existsByTitle(command.payload.title);
    if (alreadyExists) {
      throw new BadRequestException('Already exists');
    }

    let newBookCategory = command.payload as BookCategory;
    return await this.repo.save(newBookCategory);
  }
}