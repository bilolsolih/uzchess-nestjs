import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationService } from './services/authentication.service';
import { OtpCodeService } from './services/otp-code.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: {
        expiresIn: '3h',
      },
    }),
  ],
  providers: [AuthenticationService, OtpCodeService],
})
export class AuthenticationModule {}
