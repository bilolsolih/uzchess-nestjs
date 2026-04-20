import { Module } from '@nestjs/common';
import { AuthenticationPublicService } from './services/user/authentication.public.service';
import { OtpCodePublicService } from './services/otp-code/otp-code.public.service';
import { AuthenticationPublicController } from './controllers/user/authentication.public.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/features/authentication/entities/user.entity';
import { OtpCode } from '@/features/authentication/entities/otp-code.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, OtpCode])],
  controllers: [AuthenticationPublicController],
  providers: [AuthenticationPublicService, OtpCodePublicService],
})
export class AuthenticationModule {
}
