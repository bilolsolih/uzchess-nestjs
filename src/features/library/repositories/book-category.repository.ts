import { Injectable } from '@nestjs/common';
import { BookCategory } from '@/features/library/entities/book-category.entity';
import { ConfigService } from '@nestjs/config';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '@/core/repositories/base.repository';

@Injectable()
export class BookCategoryRepository extends BaseRepository<BookCategory> {
  constructor(
    protected config: ConfigService,
    @InjectRepository(BookCategory)
    protected repo: Repository<BookCategory>,
  ) {
    super();
  }

  async existsByTitle(title: string){
    return await this.repo.countBy({title: ILike(title)});
  }
}