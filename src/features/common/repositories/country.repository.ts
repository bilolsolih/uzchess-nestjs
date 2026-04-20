import { BaseRepository } from '@/core/repositories/base.repository';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from '@/features/common/entities/country.entity';


@Injectable()
export class CountryRepository extends BaseRepository<Country> {
  constructor(
    protected readonly config: ConfigService,
    @InjectRepository(Country)
    protected readonly repo: Repository<Country>,
  ) {
    super();
  }
}