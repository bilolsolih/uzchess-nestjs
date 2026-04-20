import { BaseRepository } from '@/core/repositories/base.repository';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/features/authentication/entities/user.entity';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(
    protected readonly config: ConfigService,
    @InjectRepository(User)
    protected readonly repo: Repository<User>,
  ) {
    super();
  }
}