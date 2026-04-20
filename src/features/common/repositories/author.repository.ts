import { BaseRepository } from '@/core/repositories/base.repository';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from '@/features/common/entities/author.entity';


@Injectable()
export class AuthorRepository extends BaseRepository<Author> {
  constructor(
    protected readonly config: ConfigService,
    @InjectRepository(Author)
    protected readonly repo: Repository<Author>,
  ) {
    super();
  }
}