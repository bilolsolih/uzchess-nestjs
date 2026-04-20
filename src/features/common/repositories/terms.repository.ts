import { BaseRepository } from '@/core/repositories/base.repository';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Terms } from '@/features/common/entities/terms.entity';


@Injectable()
export class TermsRepository extends BaseRepository<Terms> {
  constructor(
    protected readonly config: ConfigService,
    @InjectRepository(Terms)
    protected readonly repo: Repository<Terms>,
  ) {
    super();
  }
}