import { BaseRepository } from '@/core/repositories/base.repository';
import { OtpCode } from '@/features/authentication/entities/otp-code.entity';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OtpCodeRepository extends BaseRepository<OtpCode> {
  constructor(
    protected readonly config: ConfigService,
    @InjectRepository(OtpCode)
    protected readonly repo: Repository<OtpCode>,
  ) {
    super();
  }
}