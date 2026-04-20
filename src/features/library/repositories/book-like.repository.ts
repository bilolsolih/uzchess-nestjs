import { Injectable } from '@nestjs/common';
import { BookLike } from '@/features/library/entities/book-like.entity';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '@/core/repositories/base.repository';

@Injectable()
export class BookLikeRepository extends BaseRepository<BookLike> {
  constructor(
    protected config: ConfigService,
    @InjectRepository(BookLike)
    protected repo: Repository<BookLike>,
  ) {
    super();
  }
}