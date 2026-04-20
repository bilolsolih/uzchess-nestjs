import { Injectable } from '@nestjs/common';
import { Book } from '@/features/library/entities/book.entity';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '@/core/repositories/base.repository';

@Injectable()
export class BookRepository extends BaseRepository<Book> {
  constructor(
    protected config: ConfigService,
    @InjectRepository(Book)
    protected repo: Repository<Book>,
  ) {
    super();
  }
}