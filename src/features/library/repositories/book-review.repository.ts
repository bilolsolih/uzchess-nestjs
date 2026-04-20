import { Injectable } from '@nestjs/common';
import { BookReview } from '@/features/library/entities/book-review.entity';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '@/core/repositories/base.repository';

@Injectable()
export class BookReviewRepository extends BaseRepository<BookReview> {
  constructor(
    protected config: ConfigService,
    @InjectRepository(BookReview)
    protected repo: Repository<BookReview>,
  ) {
    super();
  }
}