import { Module } from '@nestjs/common';
import { AuthenticationPublicService } from './services/user/authentication.public.service';
import { OtpCodePublicService } from './services/otp-code/otp-code.public.service';
import { AuthenticationPublicController } from './controllers/user/authentication.public.controller';

@Module({
  controllers: [AuthenticationPublicController],
  providers: [AuthenticationPublicService, OtpCodePublicService],
})
export class AuthenticationModule {
}
