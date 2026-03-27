import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationPublicService } from './services/user/authentication.public.service';
import { OtpCodePublicService } from './services/otp-code/otp-code.public.service';
import { jwtModuleConfig } from '@/configs/jwt-module.config';
import { AuthenticationPublicController } from './controllers/user/authentication.public.controller';

@Module({
  controllers: [AuthenticationPublicController],
  imports: [JwtModule.register(jwtModuleConfig)],
  providers: [AuthenticationPublicService, OtpCodePublicService],
})
export class AuthenticationModule {}
