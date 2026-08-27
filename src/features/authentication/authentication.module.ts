import { Module } from '@nestjs/common';
import { AuthenticationPublicService } from './services/user/authentication.public.service';
import { OtpCodePublicService } from './services/otp-code/otp-code.public.service';
import { AuthenticationPublicController } from './controllers/user/authentication.public.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/features/authentication/entities/user.entity';
import { OtpCode } from '@/features/authentication/entities/otp-code.entity';
import { AuthenticationAdminController } from '@/features/authentication/controllers/user/authentication.admin.controller';
import { AuthenticationAdminService } from '@/features/authentication/services/user/authentication.admin.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, OtpCode])],
  controllers: [
    AuthenticationAdminController,
    AuthenticationPublicController,

  ],
  providers: [
    AuthenticationAdminService,
    AuthenticationPublicService,
    OtpCodePublicService,
  ],
})
export class AuthenticationModule {
}
